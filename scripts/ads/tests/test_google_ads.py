import os
import sys
import pytest
from unittest.mock import MagicMock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from google_ads import build_report_query, build_variants_query, build_status_queries, parse_campaign_row


def test_build_report_query_contains_between():
    query = build_report_query("2026-03-06", "2026-03-13")
    assert "BETWEEN '2026-03-06' AND '2026-03-13'" in query
    assert "campaign.name" in query
    assert "metrics.cost_micros" in query


def test_build_variants_query():
    query = build_variants_query("2026-03-01", "2026-03-13")
    assert "landing_page_view" in query
    assert "BETWEEN" in query


def test_build_status_queries():
    today_q, campaigns_q = build_status_queries("2026-03-13")
    assert "customer.descriptive_name" in today_q
    assert "segments.date = '2026-03-13'" in today_q
    assert "campaign.status = 'ENABLED'" in campaigns_q


def test_parse_campaign_row():
    """parse_campaign_row should extract fields from a Google Ads row object."""
    row = MagicMock()
    row.campaign.name = "Test Campaign"
    row.campaign.status.name = "ENABLED"
    row.metrics.impressions = 1000
    row.metrics.clicks = 50
    row.metrics.ctr = 0.05
    row.metrics.average_cpc = 1_200_000
    row.metrics.cost_micros = 60_000_000
    row.metrics.conversions = 3.0

    result = parse_campaign_row(row)
    assert result["campaign"] == "Test Campaign"
    assert result["status"] == "ENABLED"
    assert result["impressions"] == 1000
    assert result["clicks"] == 50
    assert result["cost_micros"] == 60_000_000
