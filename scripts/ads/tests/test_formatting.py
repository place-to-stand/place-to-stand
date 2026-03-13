import os
import sys
from datetime import date

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from formatting import date_range_clause, format_cost, format_ctr, format_cpc


def test_date_range_7_days():
    start, end = date_range_clause(7, today=date(2026, 3, 13))
    assert start == "2026-03-06"
    assert end == "2026-03-13"


def test_date_range_30_days():
    start, end = date_range_clause(30, today=date(2026, 3, 13))
    assert start == "2026-02-11"
    assert end == "2026-03-13"


def test_format_cost_micros():
    assert format_cost(1_500_000) == "$1.50"
    assert format_cost(0) == "$0.00"
    assert format_cost(123_456_789) == "$123.46"


def test_format_ctr():
    assert format_ctr(0.038) == "3.8%"
    assert format_ctr(0.0) == "0.0%"
    assert format_ctr(0.1234) == "12.3%"


def test_format_cpc():
    assert format_cpc(2_500_000) == "$2.50"
    assert format_cpc(0) == "$0.00"
