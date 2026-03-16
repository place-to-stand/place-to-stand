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
