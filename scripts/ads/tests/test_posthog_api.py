import os
import sys
import json
import pytest
from unittest.mock import patch, MagicMock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from posthog_api import fetch_pageviews, fetch_scroll_depths, fetch_cta_clicks, aggregate_by_path


def _mock_response(events):
    """Create a mock requests.Response with paginated results."""
    resp = MagicMock()
    resp.status_code = 200
    resp.json.return_value = {"results": events, "next": None}
    resp.raise_for_status = MagicMock()
    return resp


@patch("posthog_api.requests.get")
def test_fetch_pageviews_groups_by_path(mock_get):
    events = [
        {"properties": {"$pathname": "/book-a-call/fast-start"}},
        {"properties": {"$pathname": "/book-a-call/fast-start"}},
        {"properties": {"$pathname": "/book-a-call/profit-focus"}},
    ]
    mock_get.return_value = _mock_response(events)

    result = fetch_pageviews("fake-key", "2026-03-06")
    assert result["/book-a-call/fast-start"] == 2
    assert result["/book-a-call/profit-focus"] == 1


@patch("posthog_api.requests.get")
def test_fetch_scroll_depths(mock_get):
    events = [
        {"properties": {"path": "/book-a-call/fast-start", "depth": 25}},
        {"properties": {"path": "/book-a-call/fast-start", "depth": 50}},
        {"properties": {"path": "/book-a-call/fast-start", "depth": 25}},
    ]
    mock_get.return_value = _mock_response(events)

    result = fetch_scroll_depths("fake-key", "2026-03-06")
    assert result["/book-a-call/fast-start"][25] == 2
    assert result["/book-a-call/fast-start"][50] == 1


@patch("posthog_api.requests.get")
def test_fetch_cta_clicks(mock_get):
    events = [
        {"properties": {"$pathname": "/book-a-call/fast-start", "tag_name": "a"}},
        {"properties": {"$pathname": "/book-a-call/fast-start", "tag_name": "a"}},
    ]
    mock_get.return_value = _mock_response(events)

    result = fetch_cta_clicks("fake-key", "2026-03-06")
    assert result["/book-a-call/fast-start"] == 2


def test_aggregate_by_path():
    pageviews = {"/book-a-call/fast-start": 10, "/book-a-call/profit-focus": 5}
    scrolls = {
        "/book-a-call/fast-start": {25: 8, 50: 6, 75: 3, 100: 1},
        "/book-a-call/profit-focus": {25: 4, 50: 2, 75: 0, 100: 0},
    }
    clicks = {"/book-a-call/fast-start": 2, "/book-a-call/profit-focus": 0}

    rows = aggregate_by_path(pageviews, scrolls, clicks)
    assert len(rows) == 2

    fast = next(r for r in rows if r["path"] == "/book-a-call/fast-start")
    assert fast["pageviews"] == 10
    assert fast["scroll_50"] == 6
    assert fast["cta_clicks"] == 2
    assert fast["dropoff"] == "80.0%"  # (10-2)/10
