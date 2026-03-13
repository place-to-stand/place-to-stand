"""Smoke tests — verify CLI wiring without live API calls."""

import os
import sys
import subprocess

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))


def test_cli_help_exits_zero():
    """ads-cli.py --help should exit 0."""
    result = subprocess.run(
        [sys.executable, os.path.join(os.path.dirname(__file__), '..', 'ads-cli.py'), "--help"],
        capture_output=True, text=True,
    )
    assert result.returncode == 0
    assert "Google Ads" in result.stdout or "ads-cli" in result.stdout


def test_cli_report_help():
    result = subprocess.run(
        [sys.executable, os.path.join(os.path.dirname(__file__), '..', 'ads-cli.py'), "report", "--help"],
        capture_output=True, text=True,
    )
    assert result.returncode == 0
    assert "--days" in result.stdout


def test_cli_funnel_report_help():
    result = subprocess.run(
        [sys.executable, os.path.join(os.path.dirname(__file__), '..', 'ads-cli.py'), "funnel", "report", "--help"],
        capture_output=True, text=True,
    )
    assert result.returncode == 0
    assert "--days" in result.stdout


def test_all_imports():
    """Verify all modules import without error."""
    import config
    import auth
    import google_ads
    import posthog_api
    import cli
    import formatting
