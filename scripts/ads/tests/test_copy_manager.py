import os
import sys
import json
import pytest
import tempfile

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from copy_manager import parse_variant, format_variant_output, get_all_slugs, load_guide, validate_copy, save_copy, load_copy, list_copies


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


def _valid_copy():
    """Helper: returns copy data that passes all validation rules."""
    return {
        "headlines": [f"Headline {i:02d} here" for i in range(15)],
        "descriptions": [f"Description {i} that is valid and under ninety characters easily." for i in range(4)],
        "alt_headlines": [f"Alt headline {i}" for i in range(5)],
        "alt_descriptions": ["Alt description one is valid.", "Alt description two is valid."],
    }


def test_validate_copy_passes_valid():
    errors = validate_copy(_valid_copy())
    assert errors == []


def test_validate_copy_wrong_headline_count():
    copy = _valid_copy()
    copy["headlines"] = copy["headlines"][:10]
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
