"""Copy management: parse variant data, validate RSA copy, read/write copy files."""

import json
import os
import re
from datetime import datetime, timezone

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
LANDING_PAGES_PATH = os.path.join(REPO_ROOT, "src", "lib", "landing-pages.ts")
COPY_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "copy")
GUIDE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "copy_guide.txt")
BASE_URL = "https://placetostandagency.com"


def parse_variant(ts_path: str, slug: str) -> dict | None:
    """Parse a variant object from landing-pages.ts by slug.

    Returns dict with keys: slug, audience, headline, subheadline, ctaLabel,
    outcomeBullets, painPoints, differentiators. Returns None if not found or file missing.
    """
    if not os.path.exists(ts_path):
        return None

    with open(ts_path) as f:
        content = f.read()

    pattern = re.compile(
        r"\{\s*\n\s*slug:\s*'" + re.escape(slug) + r"'",
        re.MULTILINE,
    )
    match = pattern.search(content)
    if not match:
        return None

    start = match.start()

    depth = 0
    end = start
    for i in range(start, len(content)):
        if content[i] == '{':
            depth += 1
        elif content[i] == '}':
            depth -= 1
            if depth == 0:
                end = i + 1
                break

    block = content[start:end]

    def extract_string(field: str) -> str:
        m = re.search(rf"{field}:\s*'([^']*)'", block)
        if not m:
            m = re.search(rf'{field}:\s*"([^"]*)"', block)
        return m.group(1) if m else ""

    def extract_string_array(field: str) -> list[str]:
        m = re.search(rf"{field}:\s*\[(.*?)\]", block, re.DOTALL)
        if not m:
            return []
        items_block = m.group(1)
        return re.findall(r"'([^']*)'", items_block)

    return {
        "slug": slug,
        "audience": extract_string("audience"),
        "headline": extract_string("headline"),
        "subheadline": extract_string("subheadline"),
        "ctaLabel": extract_string("ctaLabel"),
        "outcomeBullets": extract_string_array("outcomeBullets"),
        "painPoints": extract_string_array("painPoints"),
        "differentiators": extract_string_array("differentiators"),
    }


def get_all_slugs(ts_path: str) -> list[str]:
    """Return all variant slugs from landing-pages.ts."""
    if not os.path.exists(ts_path):
        return []
    with open(ts_path) as f:
        content = f.read()
    return re.findall(r"slug:\s*'([^']*)'", content)


def load_guide(guide_path: str = GUIDE_PATH) -> str:
    """Load the prompt guide template. Returns hardcoded default if file missing."""
    if os.path.exists(guide_path):
        with open(guide_path) as f:
            return f.read()

    return """Generate Google Ads Responsive Search Ad copy for the variant above.

Requirements:
- 15 headlines (max 30 characters each, strictly enforced)
- 4 descriptions (max 90 characters each, strictly enforced)
- 5 alternative headlines to swap in (max 30 characters each)
- 2 alternative descriptions to swap in (max 90 characters each)

Creative direction:
- Use the variant's pain points, differentiators, and audience as source material
- Match the tone of the existing headline and subheadline
- Include at least one headline with a number or stat
- Include at least one headline as a question
- CTA descriptions should reference booking a call
- Vary headline approaches: benefit, pain, question, urgency, social proof

Output as JSON:
{
  "headlines": ["...", ...],        // exactly 15
  "descriptions": ["...", ...],     // exactly 4
  "alt_headlines": ["...", ...],    // exactly 5
  "alt_descriptions": ["...", ...]  // exactly 2
}"""


def format_variant_output(variant: dict, guide_text: str) -> str:
    """Format variant data + guide into the display output."""
    slug = variant["slug"]
    lines = [
        f"── VARIANT: {slug} ───────────────────────────",
        f"Audience:   {variant['audience']}",
        f"Headline:   {variant['headline']}",
        f"Subhead:    {variant['subheadline']}",
        f"CTA:        {variant['ctaLabel']}",
        f"Final URL:  {BASE_URL}/book-a-call/{slug}",
        "",
        "Pain Points:",
    ]
    for p in variant.get("painPoints", []):
        lines.append(f"  • {p}")
    lines.append("")
    lines.append("Differentiators:")
    for d in variant.get("differentiators", []):
        lines.append(f"  • {d}")
    lines.append("")
    lines.append("Outcomes:")
    for o in variant.get("outcomeBullets", []):
        lines.append(f"  • {o}")
    lines.append("")
    lines.append("── GENERATION GUIDE ──────────────────────────────")
    lines.append(guide_text)
    lines.append("──────────────────────────────────────────────────")
    return "\n".join(lines)


# RSA field specs: (field_name, expected_count, max_chars)
RSA_FIELDS = [
    ("headlines", 15, 30),
    ("descriptions", 4, 90),
    ("alt_headlines", 5, 30),
    ("alt_descriptions", 2, 90),
]


def validate_copy(copy: dict) -> list[str]:
    """Validate RSA copy against character limits and counts.

    Returns list of error strings. Empty list means valid.
    """
    errors = []
    for field, expected_count, max_chars in RSA_FIELDS:
        if field not in copy:
            errors.append(f"Missing field: {field}")
            continue
        items = copy[field]
        if len(items) != expected_count:
            errors.append(f"{field}: expected {expected_count} items, got {len(items)}")
        for i, item in enumerate(items):
            if len(item) > max_chars:
                errors.append(f"{field}[{i}]: {len(item)} chars (max {max_chars}) — \"{item}\"")
    return errors


def save_copy(copy_dir: str, variant: str, copy: dict, activate: bool) -> int:
    """Save ad copy to a versioned JSON file. Returns the version number."""
    os.makedirs(copy_dir, exist_ok=True)
    file_path = os.path.join(copy_dir, f"{variant}.json")

    if os.path.exists(file_path):
        with open(file_path) as f:
            data = json.load(f)
    else:
        data = {
            "variant": variant,
            "final_url": f"{BASE_URL}/book-a-call/{variant}",
            "versions": [],
        }

    if activate:
        for v in data["versions"]:
            if v["status"] == "active":
                v["status"] = "archived"

    version_num = len(data["versions"]) + 1
    data["versions"].append({
        "version": version_num,
        "created": datetime.now(timezone.utc).isoformat(),
        "status": "active" if activate else "draft",
        "headlines": copy["headlines"],
        "descriptions": copy["descriptions"],
        "alt_headlines": copy["alt_headlines"],
        "alt_descriptions": copy["alt_descriptions"],
    })

    with open(file_path, "w") as f:
        json.dump(data, f, indent=2)

    return version_num


def load_copy(copy_dir: str, variant: str) -> dict | None:
    """Load copy file for a variant. Returns None if not found."""
    file_path = os.path.join(copy_dir, f"{variant}.json")
    if not os.path.exists(file_path):
        return None
    with open(file_path) as f:
        return json.load(f)


def get_active_version(copy_data: dict) -> dict | None:
    """Return the active version from copy data, or None."""
    for v in copy_data.get("versions", []):
        if v["status"] == "active":
            return v
    return None


def list_copies(copy_dir: str) -> list[dict]:
    """List all saved copy files with summary info."""
    if not os.path.exists(copy_dir):
        return []

    result = []
    for filename in sorted(os.listdir(copy_dir)):
        if not filename.endswith(".json"):
            continue
        file_path = os.path.join(copy_dir, filename)
        with open(file_path) as f:
            data = json.load(f)

        active = get_active_version(data)
        versions = data.get("versions", [])
        last_updated = versions[-1]["created"] if versions else "N/A"

        result.append({
            "variant": data["variant"],
            "total_versions": len(versions),
            "active_version": active["version"] if active else None,
            "last_updated": last_updated,
        })

    return result
