# Ads Copy Generator Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `ads copy show/save/list` and `ads deploy` commands to the ads CLI for managing Google Ads RSA copy — extracting variant data, validating character limits, versioning saved copy, and scaffolding deployment.

**Architecture:** New module `copy_manager.py` handles all business logic (parsing `landing-pages.ts`, validating copy, reading/writing copy files). CLI handlers in `cli.py` call `copy_manager` functions. `ads-cli.py` restructured to defer Google Ads authentication so `copy` subcommands work without credentials. Prompt guide template stored as editable text file at `scripts/ads/copy_guide.txt`.

**Tech Stack:** Python 3.11+, argparse, json, re (for TS parsing), tabulate, pytest

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `scripts/ads/copy_manager.py` | Parse `landing-pages.ts`, format variant output, validate copy, read/write copy files, list copies |
| Create | `scripts/ads/copy_guide.txt` | Editable prompt guide template (checked in) |
| Create | `scripts/ads/tests/test_copy_manager.py` | Unit tests for copy_manager |
| Create | `scripts/ads/tests/test_copy_commands.py` | Integration tests for CLI copy + deploy handlers |
| Modify | `scripts/ads/cli.py` | Add `copy` subcommand group + `deploy` subcommand + handlers |
| Modify | `scripts/ads/ads-cli.py` | Defer auth, wire new command dispatch |
| Modify | `.gitignore` | Add `scripts/ads/copy/` |

---

## Chunk 1: Copy Manager + CLI Wiring

### Task 1: Variant Data Parser

**Files:**
- Create: `scripts/ads/copy_manager.py`
- Create: `scripts/ads/tests/test_copy_manager.py`

**Context:** `copy_manager.py` reads `src/lib/landing-pages.ts` and extracts a variant's structured data by slug. The TS file exports a `landingVariants` array where each element is an object with string fields (`slug`, `audience`, `headline`, `subheadline`, `ctaLabel`) and string array fields (`outcomeBullets`, `painPoints`, `differentiators`). We parse this with regex — find the object block for the given slug, then extract fields.

- [ ] **Step 1: Write failing tests for variant parsing**

```python
# scripts/ads/tests/test_copy_manager.py
import os
import sys
import json
import pytest
import tempfile

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from copy_manager import parse_variant, format_variant_output, get_all_slugs, load_guide


# Minimal TS content for testing (matches real structure)
SAMPLE_TS = """
export const landingVariants: LandingVariant[] = [
  {
    slug: 'fast-start',
    audience: 'For busy local business owners who need momentum this month',
    eyebrow: 'Variant A',
    headline: 'Launch a working growth system in 14 to 30 days.',
    subheadline: 'If leads are coming in but follow-up is slow, we build quickly.',
    outcomeBullets: [
      'Map your current lead flow',
      'Ship one high-impact workflow first',
    ],
    painPoints: [
      'New leads sit too long before someone responds',
      'You need results now, not another strategy deck',
    ],
    differentiators: [
      'You work directly with builders',
      'We implement practical systems first',
    ],
    ctaLabel: 'Book a call and get your 30-day fast-start plan',
  },
  {
    slug: 'done-for-you',
    audience: 'For owners who need execution without babysitting',
    eyebrow: 'Variant C',
    headline: 'You run the business. We build the workflow engine.',
    subheadline: 'If your team is stretched, we handle the build end-to-end.',
    outcomeBullets: [
      'Define the exact process to automate',
    ],
    painPoints: [
      'Execution stalls because no one has time',
    ],
    differentiators: [
      'Senior implementation support',
    ],
    ctaLabel: 'Book a call and get done-for-you workflow implementation',
  },
]
"""


def test_parse_variant_extracts_correct_slug(tmp_path):
    ts_file = tmp_path / "landing-pages.ts"
    ts_file.write_text(SAMPLE_TS)

    result = parse_variant(str(ts_file), "fast-start")
    assert result is not None
    assert result["slug"] == "fast-start"
    assert result["audience"] == "For busy local business owners who need momentum this month"
    assert result["headline"] == "Launch a working growth system in 14 to 30 days."
    assert "Map your current lead flow" in result["outcomeBullets"]
    assert len(result["painPoints"]) == 2
    assert len(result["differentiators"]) == 2


def test_parse_variant_second_slug(tmp_path):
    ts_file = tmp_path / "landing-pages.ts"
    ts_file.write_text(SAMPLE_TS)

    result = parse_variant(str(ts_file), "done-for-you")
    assert result is not None
    assert result["slug"] == "done-for-you"
    assert result["headline"] == "You run the business. We build the workflow engine."


def test_parse_variant_unknown_slug(tmp_path):
    ts_file = tmp_path / "landing-pages.ts"
    ts_file.write_text(SAMPLE_TS)

    result = parse_variant(str(ts_file), "nonexistent")
    assert result is None


def test_parse_variant_file_not_found():
    result = parse_variant("/nonexistent/path.ts", "fast-start")
    assert result is None


def test_get_all_slugs(tmp_path):
    ts_file = tmp_path / "landing-pages.ts"
    ts_file.write_text(SAMPLE_TS)

    slugs = get_all_slugs(str(ts_file))
    assert slugs == ["fast-start", "done-for-you"]


def test_get_all_slugs_file_not_found():
    slugs = get_all_slugs("/nonexistent/path.ts")
    assert slugs == []


def test_load_guide_from_file(tmp_path):
    guide_file = tmp_path / "guide.txt"
    guide_file.write_text("Custom guide content")
    result = load_guide(str(guide_file))
    assert result == "Custom guide content"


def test_load_guide_fallback_default():
    result = load_guide("/nonexistent/guide.txt")
    assert "15 headlines" in result
    assert "30 characters" in result
    assert "Output as JSON" in result


def test_format_variant_output(tmp_path):
    variant = {
        "slug": "fast-start",
        "audience": "For busy owners",
        "headline": "Launch fast.",
        "subheadline": "We build quickly.",
        "ctaLabel": "Book a call",
        "outcomeBullets": ["Map lead flow", "Ship workflow"],
        "painPoints": ["Leads sit too long"],
        "differentiators": ["Direct with builders"],
    }
    output = format_variant_output(variant, guide_text="GUIDE HERE")
    assert "fast-start" in output
    assert "For busy owners" in output
    assert "Leads sit too long" in output
    assert "GUIDE HERE" in output
    assert "placetostandagency.com/book-a-call/fast-start" in output
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts/ads && python -m pytest tests/test_copy_manager.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'copy_manager'`

**Note:** This step runs 9 tests (5 original + 4 new: `get_all_slugs` x2 + `load_guide` x2).

- [ ] **Step 3: Implement variant parser in copy_manager.py**

```python
# scripts/ads/copy_manager.py
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

    # Find the object block for this slug
    # Pattern: { ... slug: '<slug>', ... },
    # We find the opening { before the slug and the closing }, after it
    pattern = re.compile(
        r"\{\s*\n\s*slug:\s*'" + re.escape(slug) + r"'",
        re.MULTILINE,
    )
    match = pattern.search(content)
    if not match:
        return None

    # Find the start of this object (the { we matched)
    start = match.start()

    # Find the matching closing } by counting braces
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
            # Try double quotes
            m = re.search(rf'{field}:\s*"([^"]*)"', block)
        return m.group(1) if m else ""

    def extract_string_array(field: str) -> list[str]:
        # Find: field: [\n  'item1',\n  'item2',\n]
        m = re.search(rf"{field}:\s*\[(.*?)\]", block, re.DOTALL)
        if not m:
            return []
        items_block = m.group(1)
        # Extract all quoted strings
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
  "headlines": ["...", ...],
  "descriptions": ["...", ...],
  "alt_headlines": ["...", ...],
  "alt_descriptions": ["...", ...]
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd scripts/ads && python -m pytest tests/test_copy_manager.py -v`
Expected: All 9 tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/ads/copy_manager.py scripts/ads/tests/test_copy_manager.py
git commit -m "feat(ads): add variant data parser for ad copy generation"
```

---

### Task 2: Copy Validation and File I/O

**Files:**
- Modify: `scripts/ads/copy_manager.py`
- Modify: `scripts/ads/tests/test_copy_manager.py`

**Context:** Add functions to validate RSA copy against character limits, save versioned copy to JSON files, and list saved copies. The validation is strict: exact counts and character limits must pass before saving.

- [ ] **Step 1: Write failing tests for validation and file I/O**

Add to `scripts/ads/tests/test_copy_manager.py`:

```python
from copy_manager import validate_copy, save_copy, load_copy, list_copies


def _valid_copy():
    """Helper: returns copy data that passes all validation rules."""
    return {
        "headlines": [f"Headline {i:02d} here" for i in range(15)],  # 15 items, each < 30 chars
        "descriptions": [f"Description {i} that is valid and under ninety characters easily." for i in range(4)],
        "alt_headlines": [f"Alt headline {i}" for i in range(5)],
        "alt_descriptions": ["Alt description one is valid.", "Alt description two is valid."],
    }


def test_validate_copy_passes_valid():
    errors = validate_copy(_valid_copy())
    assert errors == []


def test_validate_copy_wrong_headline_count():
    copy = _valid_copy()
    copy["headlines"] = copy["headlines"][:10]  # only 10
    errors = validate_copy(copy)
    assert any("headlines" in e and "15" in e for e in errors)


def test_validate_copy_headline_too_long():
    copy = _valid_copy()
    copy["headlines"][0] = "This headline is way too long and exceeds the thirty character limit"
    errors = validate_copy(copy)
    assert any("headlines[0]" in e for e in errors)


def test_validate_copy_description_too_long():
    copy = _valid_copy()
    copy["descriptions"][0] = "x" * 91
    errors = validate_copy(copy)
    assert any("descriptions[0]" in e for e in errors)


def test_validate_copy_missing_field():
    copy = _valid_copy()
    del copy["alt_headlines"]
    errors = validate_copy(copy)
    assert any("alt_headlines" in e for e in errors)


def test_save_and_load_copy(tmp_path):
    copy = _valid_copy()
    copy_dir = tmp_path / "copy"
    save_copy(str(copy_dir), "fast-start", copy, activate=False)

    loaded = load_copy(str(copy_dir), "fast-start")
    assert loaded is not None
    assert loaded["variant"] == "fast-start"
    assert len(loaded["versions"]) == 1
    assert loaded["versions"][0]["status"] == "draft"
    assert loaded["versions"][0]["headlines"] == copy["headlines"]


def test_save_copy_appends_version(tmp_path):
    copy = _valid_copy()
    copy_dir = tmp_path / "copy"
    save_copy(str(copy_dir), "fast-start", copy, activate=False)
    save_copy(str(copy_dir), "fast-start", copy, activate=False)

    loaded = load_copy(str(copy_dir), "fast-start")
    assert len(loaded["versions"]) == 2
    assert loaded["versions"][1]["version"] == 2


def test_save_copy_activate(tmp_path):
    copy = _valid_copy()
    copy_dir = tmp_path / "copy"
    save_copy(str(copy_dir), "fast-start", copy, activate=True)

    loaded = load_copy(str(copy_dir), "fast-start")
    assert loaded["versions"][0]["status"] == "active"


def test_save_copy_activate_archives_previous(tmp_path):
    copy = _valid_copy()
    copy_dir = tmp_path / "copy"
    save_copy(str(copy_dir), "fast-start", copy, activate=True)
    save_copy(str(copy_dir), "fast-start", copy, activate=True)

    loaded = load_copy(str(copy_dir), "fast-start")
    assert loaded["versions"][0]["status"] == "archived"
    assert loaded["versions"][1]["status"] == "active"


def test_load_copy_not_found(tmp_path):
    result = load_copy(str(tmp_path / "copy"), "nonexistent")
    assert result is None


def test_list_copies(tmp_path):
    copy = _valid_copy()
    copy_dir = tmp_path / "copy"
    save_copy(str(copy_dir), "fast-start", copy, activate=True)
    save_copy(str(copy_dir), "done-for-you", copy, activate=False)

    result = list_copies(str(copy_dir))
    assert len(result) == 2
    slugs = [r["variant"] for r in result]
    assert "fast-start" in slugs
    assert "done-for-you" in slugs

    fs = [r for r in result if r["variant"] == "fast-start"][0]
    assert fs["total_versions"] == 1
    assert fs["active_version"] == 1

    dfy = [r for r in result if r["variant"] == "done-for-you"][0]
    assert dfy["active_version"] is None


def test_list_copies_empty(tmp_path):
    result = list_copies(str(tmp_path / "copy"))
    assert result == []
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts/ads && python -m pytest tests/test_copy_manager.py::test_validate_copy_passes_valid -v`
Expected: FAIL with `ImportError: cannot import name 'validate_copy'`

- [ ] **Step 3: Implement validation and file I/O in copy_manager.py**

Add to the bottom of `scripts/ads/copy_manager.py`:

```python
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

    # Archive previous active version if activating
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd scripts/ads && python -m pytest tests/test_copy_manager.py -v`
Expected: All 21 tests PASS (9 from Task 1 + 12 from Task 2)

- [ ] **Step 5: Commit**

```bash
git add scripts/ads/copy_manager.py scripts/ads/tests/test_copy_manager.py
git commit -m "feat(ads): add copy validation, versioned save/load, and list"
```

---

### Task 3: Prompt Guide Template

**Files:**
- Create: `scripts/ads/copy_guide.txt`

**Context:** The prompt guide is a checked-in text file that the CLI appends to variant output. It contains RSA constraints and creative direction for Claude Code to follow.

- [ ] **Step 1: Create the prompt guide file**

```text
Generate Google Ads Responsive Search Ad copy for the variant above.

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
}
```

- [ ] **Step 2: Commit**

```bash
git add scripts/ads/copy_guide.txt
git commit -m "feat(ads): add editable prompt guide template for ad copy generation"
```

---

### Task 4: CLI Commands — copy show, copy save, copy list

**Files:**
- Modify: `scripts/ads/cli.py` (add parser entries + handlers)
- Create: `scripts/ads/tests/test_copy_commands.py`

**Context:** The `copy` subcommand group follows the same pattern as `funnel` in the existing CLI. It uses `add_subparsers` with `dest="copy_command"`. Handlers call `copy_manager` functions and handle output formatting.

- [ ] **Step 1: Write failing tests**

```python
# scripts/ads/tests/test_copy_commands.py
import os
import sys
import json
import pytest
import tempfile
from unittest.mock import patch, MagicMock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

# Stub heavy dependencies before importing cli (they're top-level imports in cli.py
# but not needed for copy/deploy commands)
for mod in ["google_ads", "posthog_api", "google.ads.googleads.client"]:
    if mod not in sys.modules:
        sys.modules[mod] = MagicMock()

from cli import cmd_copy_show, cmd_copy_save, cmd_copy_list


SAMPLE_VARIANT = {
    "slug": "fast-start",
    "audience": "For busy owners",
    "headline": "Launch fast.",
    "subheadline": "We build quickly.",
    "ctaLabel": "Book a call",
    "outcomeBullets": ["Map lead flow"],
    "painPoints": ["Leads sit too long"],
    "differentiators": ["Direct with builders"],
}


@patch("cli.parse_variant", return_value=SAMPLE_VARIANT)
@patch("cli.load_guide", return_value="GUIDE TEXT")
def test_copy_show_outputs_variant(mock_guide, mock_parse, capsys):
    cmd_copy_show(variant="fast-start", as_json=False, ts_path="/fake/path.ts")

    output = capsys.readouterr().out
    assert "fast-start" in output
    assert "For busy owners" in output
    assert "GUIDE TEXT" in output
    assert "placetostandagency.com" in output


@patch("cli.parse_variant", return_value=SAMPLE_VARIANT)
def test_copy_show_json(mock_parse, capsys):
    cmd_copy_show(variant="fast-start", as_json=True, ts_path="/fake/path.ts")

    output = capsys.readouterr().out
    data = json.loads(output)
    assert data["slug"] == "fast-start"
    assert data["audience"] == "For busy owners"


@patch("cli.os.path.exists", return_value=True)
@patch("cli.parse_variant", return_value=None)
@patch("cli.get_all_slugs", return_value=["fast-start", "done-for-you"])
def test_copy_show_unknown_slug(mock_slugs, mock_parse, mock_exists, capsys):
    with pytest.raises(SystemExit):
        cmd_copy_show(variant="nonexistent", as_json=False, ts_path="/fake/path.ts")

    output = capsys.readouterr().err
    assert "nonexistent" in output or "fast-start" in output


@patch("cli.os.path.exists", return_value=False)
def test_copy_show_file_not_found(mock_exists, capsys):
    with pytest.raises(SystemExit):
        cmd_copy_show(variant="fast-start", as_json=False, ts_path="/nonexistent/landing-pages.ts")

    output = capsys.readouterr().err
    assert "not found" in output
    assert "/nonexistent/landing-pages.ts" in output


@patch("cli.validate_copy", return_value=[])
@patch("cli.save_copy", return_value=1)
def test_copy_save_valid(mock_save, mock_validate, capsys, tmp_path):
    copy = {
        "headlines": [f"H{i}" for i in range(15)],
        "descriptions": [f"D{i}" for i in range(4)],
        "alt_headlines": [f"AH{i}" for i in range(5)],
        "alt_descriptions": [f"AD{i}" for i in range(2)],
    }
    copy_file = tmp_path / "copy.json"
    copy_file.write_text(json.dumps(copy))

    cmd_copy_save(variant="fast-start", file_path=str(copy_file),
                  activate=False, copy_dir=str(tmp_path / "out"))

    mock_save.assert_called_once()
    output = capsys.readouterr().out
    assert "version" in output.lower() or "saved" in output.lower()


@patch("cli.validate_copy", return_value=["headlines[0]: 35 chars (max 30)"])
def test_copy_save_validation_fails(mock_validate, capsys, tmp_path):
    copy = {"headlines": [], "descriptions": [], "alt_headlines": [], "alt_descriptions": []}
    copy_file = tmp_path / "copy.json"
    copy_file.write_text(json.dumps(copy))

    with pytest.raises(SystemExit):
        cmd_copy_save(variant="fast-start", file_path=str(copy_file),
                      activate=False, copy_dir=str(tmp_path / "out"))


@patch("cli.list_copies")
def test_copy_list(mock_list, capsys):
    mock_list.return_value = [
        {"variant": "fast-start", "total_versions": 2, "active_version": 2, "last_updated": "2026-03-15T14:30:00Z"},
        {"variant": "done-for-you", "total_versions": 1, "active_version": None, "last_updated": "2026-03-15T10:00:00Z"},
    ]

    cmd_copy_list(copy_dir="/fake")

    output = capsys.readouterr().out
    assert "fast-start" in output
    assert "done-for-you" in output


@patch("cli.list_copies", return_value=[])
def test_copy_list_empty(mock_list, capsys):
    cmd_copy_list(copy_dir="/fake")

    output = capsys.readouterr().out
    assert "No saved" in output or "no copy" in output.lower()
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts/ads && python -m pytest tests/test_copy_commands.py -v`
Expected: FAIL with `ImportError: cannot import name 'cmd_copy_show' from 'cli'`

- [ ] **Step 3: Add parser entries to cli.py**

Add after the existing `funnel` subparser group in `build_parser()`:

```python
    # copy (ad copy management)
    p_copy = sub.add_parser("copy", help="Ad copy management")
    copy_sub = p_copy.add_subparsers(dest="copy_command", required=True)

    p_copy_show = copy_sub.add_parser("show", help="Show variant data + prompt guide")
    p_copy_show.add_argument("variant", help="Variant slug (e.g. fast-start)")
    p_copy_show.add_argument("--json", action="store_true", default=False)

    p_copy_save = copy_sub.add_parser("save", help="Save and validate ad copy")
    p_copy_save.add_argument("variant", help="Variant slug (e.g. fast-start)")
    p_copy_save.add_argument("--file", default=None, help="Path to JSON file with copy (reads stdin if omitted)")
    p_copy_save.add_argument("--activate", action="store_true", default=False)

    p_copy_list = copy_sub.add_parser("list", help="List saved ad copy")

    # deploy
    p_deploy = sub.add_parser("deploy", help="Deploy ad copy to Google Ads")
    p_deploy.add_argument("variant", help="Variant slug (e.g. fast-start)")
    p_deploy.add_argument("--dry-run", action="store_true", default=False)
```

- [ ] **Step 4: Add command handlers to cli.py**

Add these imports at the top of `cli.py` (these are local modules, safe to import at top level since `copy_manager.py` has no heavy dependencies):

```python
import os

from copy_manager import (
    parse_variant, get_all_slugs, load_guide, format_variant_output,
    validate_copy, save_copy, load_copy, get_active_version, list_copies,
    LANDING_PAGES_PATH, COPY_DIR,
)
```

Add these handlers at the bottom of `cli.py`:

```python
def cmd_copy_show(variant: str, as_json: bool, ts_path: str = LANDING_PAGES_PATH):
    """Show variant data + prompt guide for ad copy generation."""
    if not os.path.exists(ts_path):
        print(f"landing-pages.ts not found at {ts_path}", file=sys.stderr)
        sys.exit(1)

    data = parse_variant(ts_path, variant)
    if data is None:
        slugs = get_all_slugs(ts_path)
        print(f"Unknown variant '{variant}'. Available: {', '.join(slugs)}", file=sys.stderr)
        sys.exit(1)

    if as_json:
        print(json.dumps(data, indent=2))
    else:
        guide = load_guide()
        print(format_variant_output(data, guide))


def cmd_copy_save(variant: str, file_path: str | None, activate: bool, copy_dir: str = COPY_DIR):
    """Validate and save ad copy from a JSON file or stdin."""
    if file_path:
        with open(file_path) as f:
            copy = json.load(f)
    else:
        copy = json.load(sys.stdin)

    errors = validate_copy(copy)
    if errors:
        print("Validation failed:", file=sys.stderr)
        for e in errors:
            print(f"  {e}", file=sys.stderr)
        sys.exit(1)

    version = save_copy(copy_dir, variant, copy, activate)
    status = "active" if activate else "draft"
    print(f"Saved version {version} for '{variant}' (status: {status})")


def cmd_copy_list(copy_dir: str = COPY_DIR):
    """List all saved ad copy with version info."""
    copies = list_copies(copy_dir)
    if not copies:
        print("No saved copy. Run `ads copy save` first.")
        return

    records = []
    for c in copies:
        records.append({
            "variant": c["variant"],
            "versions": c["total_versions"],
            "active": c["active_version"] or "none",
            "last_updated": c["last_updated"],
        })
    print(tabulate(records, headers="keys", tablefmt="simple"))
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd scripts/ads && python -m pytest tests/test_copy_commands.py -v`
Expected: All 8 tests PASS (6 copy + 2 error handling)

- [ ] **Step 6: Commit**

```bash
git add scripts/ads/cli.py scripts/ads/tests/test_copy_commands.py
git commit -m "feat(ads): add copy show/save/list CLI commands"
```

---

### Task 5: Deploy Command (Scaffolded)

**Files:**
- Modify: `scripts/ads/cli.py` (add `cmd_deploy` handler)
- Modify: `scripts/ads/tests/test_copy_commands.py` (add deploy tests)

**Context:** The deploy command reads the active version from saved copy, previews it, and — until Basic Access is approved — prints a blocked message. It tries to import `find_ad_group_by_url` from `ads_writer.py` but handles `ImportError` gracefully since that module may not exist yet.

- [ ] **Step 1: Write failing tests**

Add to `scripts/ads/tests/test_copy_commands.py`:

```python
from cli import cmd_deploy


@patch("cli.load_copy")
@patch("cli.get_active_version")
def test_deploy_preview(mock_active, mock_load, capsys):
    mock_load.return_value = {"variant": "fast-start", "final_url": "https://placetostandagency.com/book-a-call/fast-start", "versions": []}
    mock_active.return_value = {
        "version": 1,
        "status": "active",
        "headlines": [f"Headline {i}" for i in range(15)],
        "descriptions": [f"Description {i}" for i in range(4)],
        "alt_headlines": [f"Alt {i}" for i in range(5)],
        "alt_descriptions": [f"Alt desc {i}" for i in range(2)],
    }

    cmd_deploy(variant="fast-start", dry_run=True, copy_dir="/fake", client=None, customer_id=None)

    output = capsys.readouterr().out
    assert "fast-start" in output
    assert "Headline 0" in output


@patch("cli.load_copy", return_value=None)
def test_deploy_no_copy(mock_load, capsys):
    with pytest.raises(SystemExit):
        cmd_deploy(variant="fast-start", dry_run=False, copy_dir="/fake", client=None, customer_id=None)

    output = capsys.readouterr().err
    assert "No saved copy" in output


@patch("cli.load_copy")
@patch("cli.get_active_version", return_value=None)
def test_deploy_no_active(mock_active, mock_load, capsys):
    mock_load.return_value = {"variant": "fast-start", "versions": []}

    with pytest.raises(SystemExit):
        cmd_deploy(variant="fast-start", dry_run=False, copy_dir="/fake", client=None, customer_id=None)

    output = capsys.readouterr().err
    assert "No active version" in output


@patch("cli.load_copy")
@patch("cli.get_active_version")
def test_deploy_no_ads_writer(mock_active, mock_load, capsys, monkeypatch):
    mock_load.return_value = {"variant": "fast-start", "final_url": "https://placetostandagency.com/book-a-call/fast-start", "versions": []}
    mock_active.return_value = {
        "version": 1, "status": "active",
        "headlines": [f"H{i}" for i in range(15)],
        "descriptions": [f"D{i}" for i in range(4)],
        "alt_headlines": [f"AH{i}" for i in range(5)],
        "alt_descriptions": [f"AD{i}" for i in range(2)],
    }
    # Make ads_writer import fail
    import builtins
    real_import = builtins.__import__
    def mock_import(name, *args, **kwargs):
        if name == "ads_writer":
            raise ImportError("No module named 'ads_writer'")
        return real_import(name, *args, **kwargs)
    monkeypatch.setattr(builtins, "__import__", mock_import)

    with pytest.raises(SystemExit):
        cmd_deploy(variant="fast-start", dry_run=False, copy_dir="/fake", client=None, customer_id=None)

    output = capsys.readouterr().err
    assert "ads_writer.py" in output
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts/ads && python -m pytest tests/test_copy_commands.py::test_deploy_preview -v`
Expected: FAIL with `ImportError: cannot import name 'cmd_deploy' from 'cli'`

- [ ] **Step 3: Add cmd_deploy handler to cli.py**

Add at the bottom of `cli.py`:

```python
def cmd_deploy(variant: str, dry_run: bool, copy_dir: str = COPY_DIR,
               client=None, customer_id: str = None):
    """Deploy ad copy to Google Ads (scaffolded — blocked until Basic Access)."""
    copy_data = load_copy(copy_dir, variant)
    if copy_data is None:
        print(f"No saved copy for '{variant}'. Run `ads copy save` first.", file=sys.stderr)
        sys.exit(1)

    active = get_active_version(copy_data)
    if active is None:
        print(f"No active version for '{variant}'. Run `ads copy save --activate` first.", file=sys.stderr)
        sys.exit(1)

    final_url = copy_data.get("final_url", f"https://placetostandagency.com/book-a-call/{variant}")

    # Preview
    print(f"── AD PREVIEW: {variant} ──────────────────────")
    print(f"Final URL: {final_url}")
    print(f"Version:   {active['version']} ({active['status']})")
    print()
    print("Headlines:")
    for i, h in enumerate(active["headlines"]):
        print(f"  {i+1:2d}. {h} ({len(h)} chars)")
    print()
    print("Descriptions:")
    for i, d in enumerate(active["descriptions"]):
        print(f"  {i+1}. {d} ({len(d)} chars)")
    print("──────────────────────────────────────────────────")

    if dry_run:
        print("[DRY RUN] Preview only.")
        return

    # Try to find the ad group (requires ads_writer.py from Phase 3)
    try:
        from ads_writer import find_ad_group_by_url
    except ImportError:
        print("Deploy requires ads_writer.py (Phase 3). Run the optimization plan first.", file=sys.stderr)
        sys.exit(1)

    # Blocked until Basic Access
    print()
    print("Deploy is blocked until Google Ads Basic Access is approved.")
    print("Use --dry-run to preview, or deploy manually from Google Ads console.")
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd scripts/ads && python -m pytest tests/test_copy_commands.py -v`
Expected: All 12 tests PASS (8 copy + 4 deploy)

- [ ] **Step 5: Commit**

```bash
git add scripts/ads/cli.py scripts/ads/tests/test_copy_commands.py
git commit -m "feat(ads): add scaffolded deploy command with ad preview"
```

---

### Task 6: Wire Commands in ads-cli.py + Deferred Auth

**Files:**
- Modify: `scripts/ads/ads-cli.py`

**Context:** The biggest change here is restructuring `main()` to defer Google Ads authentication. Currently it calls `load_config()` and `get_google_ads_client()` before any command dispatch. The `copy` subcommands don't need either. We restructure so auth only happens for commands that need it.

- [ ] **Step 1: Rewrite ads-cli.py with deferred auth**

```python
#!/usr/bin/env python3
"""Ads Funnel CLI — Google Ads + PostHog reporting tool.

Usage:
    python scripts/ads/ads-cli.py status
    python scripts/ads/ads-cli.py report --days 7
    python scripts/ads/ads-cli.py copy show fast-start
"""

import sys

from cli import (
    build_parser, cmd_report, cmd_variants, cmd_status,
    cmd_funnel_report, cmd_funnel_full, cmd_funnel_alerts,
    cmd_copy_show, cmd_copy_save, cmd_copy_list, cmd_deploy,
)


# Commands that require Google Ads authentication
ADS_AUTH_COMMANDS = {"report", "variants", "status", "funnel", "deploy", "recommend"}

# Commands that require PostHog API key
POSTHOG_COMMANDS = {"funnel"}


def _get_auth(args_command):
    """Load config and authenticate with Google Ads. Only called for commands that need it."""
    from config import load_config, MissingConfigError
    from auth import get_google_ads_client

    try:
        cfg = load_config()
    except MissingConfigError as e:
        print(f"Configuration error: {e}", file=sys.stderr)
        sys.exit(1)

    try:
        client = get_google_ads_client(
            developer_token=cfg["developer_token"],
            customer_id=cfg["customer_id"],
        )
    except FileNotFoundError as e:
        print(f"Auth error: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Auth error: {e}", file=sys.stderr)
        print("Token may be expired — re-run to open browser login.", file=sys.stderr)
        sys.exit(1)

    return cfg, client


def main():
    parser = build_parser()
    args = parser.parse_args()

    try:
        # ── Local-only commands (no auth needed) ──
        if args.command == "copy":
            if args.copy_command == "show":
                cmd_copy_show(args.variant, args.json)
            elif args.copy_command == "save":
                cmd_copy_save(args.variant, args.file, args.activate)
            elif args.copy_command == "list":
                cmd_copy_list()
            return

        # ── Commands that need Google Ads auth ──
        cfg, client = _get_auth(args.command)

        if args.command == "report":
            cmd_report(client, cfg["customer_id"], args.days, args.json)
        elif args.command == "variants":
            cmd_variants(client, cfg["customer_id"], args.days, args.json)
        elif args.command == "status":
            cmd_status(client, cfg["customer_id"], args.json)
        elif args.command == "funnel":
            posthog_key = cfg["posthog_api_key"]
            if not posthog_key:
                print("POSTHOG_PERSONAL_API_KEY not set in .env.local.", file=sys.stderr)
                sys.exit(1)

            if args.funnel_command == "report":
                cmd_funnel_report(posthog_key, args.days, args.json)
            elif args.funnel_command == "full":
                cmd_funnel_full(client, cfg["customer_id"], posthog_key, args.days, args.json)
            elif args.funnel_command == "alerts":
                from urllib.parse import urlparse
                from formatting import date_range_clause
                from google_ads import build_variants_query, parse_variant_row
                from posthog_api import fetch_pageviews, fetch_scroll_depths, fetch_cta_clicks

                start, end = date_range_clause(args.days)
                service = client.get_service("GoogleAdsService")
                query = build_variants_query(start, end)
                ad_rows = list(service.search(customer_id=cfg["customer_id"], query=query))

                ads_data = {}
                for row in ad_rows:
                    r = parse_variant_row(row)
                    path = urlparse(r["url"]).path.rstrip("/")
                    ads_data[path] = r

                pv = fetch_pageviews(posthog_key, start)
                scrolls = fetch_scroll_depths(posthog_key, start)
                clicks = fetch_cta_clicks(posthog_key, start)

                cmd_funnel_alerts(ads_data, pv, scrolls, clicks)

        elif args.command == "deploy":
            cmd_deploy(args.variant, args.dry_run, client=client, customer_id=cfg["customer_id"])
        else:
            parser.print_help()
            sys.exit(1)
    except Exception as e:
        print(f"API error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Run all tests**

Run: `cd scripts/ads && python -m pytest tests/ -v`
Expected: All tests pass (existing 35 + 21 copy_manager + 12 copy_commands = 68)

- [ ] **Step 3: Commit**

```bash
git add scripts/ads/ads-cli.py
git commit -m "refactor(ads): defer auth in ads-cli.py, wire copy + deploy commands"
```

---

### Task 7: Gitignore + Final Verification

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add copy directory to .gitignore**

Add to `.gitignore`:

```
scripts/ads/copy/
```

- [ ] **Step 2: Run full test suite**

Run: `cd scripts/ads && python -m pytest tests/ -v --tb=short`
Expected: All 68 tests pass

- [ ] **Step 3: Verify CLI help output**

Run: `cd scripts/ads && source .venv/bin/activate && python ads-cli.py copy --help`
Expected: Shows sub-subcommands: show, save, list

Run: `cd scripts/ads && python ads-cli.py deploy --help`
Expected: Shows variant positional arg and --dry-run flag

- [ ] **Step 4: Test copy show against real landing-pages.ts**

Run: `cd scripts/ads && source .venv/bin/activate && python ads-cli.py copy show fast-start`
Expected: Outputs variant data + prompt guide for fast-start

- [ ] **Step 5: Commit**

```bash
git add .gitignore
git commit -m "chore: gitignore ads copy directory"
```
