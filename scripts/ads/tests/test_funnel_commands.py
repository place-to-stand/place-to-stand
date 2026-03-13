import os
import sys
import json
import pytest
from unittest.mock import patch, MagicMock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from cli import cmd_funnel_report, cmd_funnel_full, cmd_funnel_alerts


@patch("cli.fetch_cta_clicks", return_value={"/book-a-call/fast-start": 2})
@patch("cli.fetch_scroll_depths", return_value={"/book-a-call/fast-start": {25: 8, 50: 6, 75: 3, 100: 1}})
@patch("cli.fetch_pageviews", return_value={"/book-a-call/fast-start": 10})
def test_funnel_report_json(mock_pv, mock_scroll, mock_cta, capsys):
    cmd_funnel_report(api_key="fake", days=7, as_json=True)
    output = capsys.readouterr().out
    data = json.loads(output)
    assert len(data) == 1
    assert data[0]["path"] == "/book-a-call/fast-start"
    assert data[0]["pageviews"] == 10


@patch("cli.fetch_cta_clicks", return_value={"/book-a-call/fast-start": 2})
@patch("cli.fetch_scroll_depths", return_value={"/book-a-call/fast-start": {25: 8, 50: 6, 75: 3, 100: 1}})
@patch("cli.fetch_pageviews", return_value={"/book-a-call/fast-start": 10})
def test_funnel_report_table(mock_pv, mock_scroll, mock_cta, capsys):
    cmd_funnel_report(api_key="fake", days=7, as_json=False)
    output = capsys.readouterr().out
    assert "/book-a-call/fast-start" in output


@patch("cli.fetch_cta_clicks", return_value={"/book-a-call/fast-start": 2})
@patch("cli.fetch_scroll_depths", return_value={"/book-a-call/fast-start": {25: 8, 50: 6, 75: 3, 100: 1}})
@patch("cli.fetch_pageviews", return_value={"/book-a-call/fast-start": 10})
def test_funnel_full_json(mock_pv, mock_scroll, mock_cta, capsys):
    """funnel full should stitch Ads + PostHog data into one table."""
    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service

    mock_row = MagicMock()
    mock_row.landing_page_view.unexpanded_final_url = "https://placetostandagency.com/book-a-call/fast-start"
    mock_row.metrics.impressions = 200
    mock_row.metrics.clicks = 15
    mock_row.metrics.ctr = 0.075
    mock_row.metrics.average_cpc = 800_000
    mock_row.metrics.cost_micros = 12_000_000
    mock_service.search.return_value = [mock_row]

    cmd_funnel_full(mock_client, "123", api_key="fake", days=7, as_json=True)

    output = capsys.readouterr().out
    data = json.loads(output)
    assert len(data) == 1
    assert data[0]["variant"] == "/book-a-call/fast-start"
    assert data[0]["impressions"] == 200
    assert data[0]["pageviews"] == 10
    assert data[0]["cta_clicks"] == 2


@patch("cli.fetch_cta_clicks", return_value={})
@patch("cli.fetch_scroll_depths", return_value={})
@patch("cli.fetch_pageviews", return_value={})
def test_funnel_full_no_data(mock_pv, mock_scroll, mock_cta, capsys):
    """funnel full with no ads data should print no-data message."""
    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service
    mock_service.search.return_value = []

    cmd_funnel_full(mock_client, "123", api_key="fake", days=7, as_json=False)

    output = capsys.readouterr().out
    assert "No data" in output


def test_funnel_alerts_tracking_broken(capsys):
    """Alert when ads have clicks but PostHog has no pageviews."""
    ads_data = {"/book-a-call/fast-start": {"impressions": 100, "clicks": 10, "ctr": 0.1}}
    posthog_pv = {}
    posthog_scroll = {}
    posthog_cta = {}

    cmd_funnel_alerts(ads_data, posthog_pv, posthog_scroll, posthog_cta)
    output = capsys.readouterr().out
    assert "Tracking broken" in output


def test_funnel_alerts_no_issues(capsys):
    """No alerts when everything looks healthy."""
    ads_data = {"/book-a-call/fast-start": {"impressions": 100, "clicks": 10, "ctr": 0.1}}
    posthog_pv = {"/book-a-call/fast-start": 8}
    posthog_scroll = {"/book-a-call/fast-start": {25: 6, 50: 4, 75: 2, 100: 1}}
    posthog_cta = {"/book-a-call/fast-start": 2}

    cmd_funnel_alerts(ads_data, posthog_pv, posthog_scroll, posthog_cta)
    output = capsys.readouterr().out
    assert "No alerts" in output
