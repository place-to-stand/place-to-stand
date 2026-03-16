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

from cli import cmd_copy_show, cmd_copy_save, cmd_copy_list, cmd_deploy


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


@patch("cli.os.path.exists", return_value=True)
@patch("cli.parse_variant", return_value=SAMPLE_VARIANT)
@patch("cli.load_guide", return_value="GUIDE TEXT")
def test_copy_show_outputs_variant(mock_guide, mock_parse, mock_exists, capsys):
    cmd_copy_show(variant="fast-start", as_json=False, ts_path="/fake/path.ts")

    output = capsys.readouterr().out
    assert "fast-start" in output
    assert "For busy owners" in output
    assert "GUIDE TEXT" in output
    assert "placetostandagency.com" in output


@patch("cli.os.path.exists", return_value=True)
@patch("cli.parse_variant", return_value=SAMPLE_VARIANT)
def test_copy_show_json(mock_parse, mock_exists, capsys):
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
