"""Argparse CLI definition and command handlers for ads-cli."""

import argparse
import json
import sys
from datetime import date

from tabulate import tabulate

from formatting import date_range_clause, format_cost, format_ctr, format_cpc
from google_ads import (
    build_report_query,
    build_variants_query,
    build_status_queries,
    parse_campaign_row,
    parse_variant_row,
)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="ads-cli",
        description="Google Ads + PostHog funnel reporting CLI",
    )
    sub = parser.add_subparsers(dest="command", required=True)

    p_report = sub.add_parser("report", help="Campaign performance report")
    p_report.add_argument("--days", type=int, default=7, choices=[7, 14, 30])
    p_report.add_argument("--json", action="store_true", default=False)

    p_variants = sub.add_parser("variants", help="Performance by landing page URL")
    p_variants.add_argument("--days", type=int, default=7, choices=[7, 14, 30])
    p_variants.add_argument("--json", action="store_true", default=False)

    p_status = sub.add_parser("status", help="Quick health check")
    p_status.add_argument("--json", action="store_true", default=False)

    return parser


def cmd_report(client, customer_id: str, days: int, as_json: bool):
    service = client.get_service("GoogleAdsService")
    start, end = date_range_clause(days)
    query = build_report_query(start, end)
    rows = list(service.search(customer_id=customer_id, query=query))

    if not rows:
        print("No data for the requested period.")
        return

    records = []
    for row in rows:
        r = parse_campaign_row(row)
        records.append({
            "campaign": r["campaign"],
            "status": r["status"],
            "impressions": r["impressions"],
            "clicks": r["clicks"],
            "ctr": format_ctr(r["ctr"]),
            "avg_cpc": format_cpc(r["average_cpc"]),
            "cost": format_cost(r["cost_micros"]),
            "conversions": r["conversions"],
        })

    if as_json:
        print(json.dumps(records, indent=2))
    else:
        print(tabulate(records, headers="keys", tablefmt="simple"))


def cmd_variants(client, customer_id: str, days: int, as_json: bool):
    service = client.get_service("GoogleAdsService")
    start, end = date_range_clause(days)
    query = build_variants_query(start, end)
    rows = list(service.search(customer_id=customer_id, query=query))

    if not rows:
        print("No data for the requested period.")
        return

    records = []
    for row in rows:
        r = parse_variant_row(row)
        records.append({
            "url": r["url"],
            "impressions": r["impressions"],
            "clicks": r["clicks"],
            "ctr": format_ctr(r["ctr"]),
            "avg_cpc": format_cpc(r["average_cpc"]),
            "cost": format_cost(r["cost_micros"]),
        })

    if as_json:
        print(json.dumps(records, indent=2))
    else:
        print(tabulate(records, headers="keys", tablefmt="simple"))


def cmd_status(client, customer_id: str, as_json: bool):
    service = client.get_service("GoogleAdsService")
    today_str = date.today().isoformat()
    today_q, campaigns_q = build_status_queries(today_str)

    today_rows = list(service.search(customer_id=customer_id, query=today_q))
    campaign_rows = list(service.search(customer_id=customer_id, query=campaigns_q))

    if not today_rows:
        print("No data for today.")
        return

    row = today_rows[0]
    account_name = row.customer.descriptive_name
    account_id = row.customer.id
    impressions = row.metrics.impressions
    clicks = row.metrics.clicks
    cost = format_cost(row.metrics.cost_micros)
    active_count = len(campaign_rows)
    running = impressions > 0

    result = {
        "account": account_name,
        "account_id": str(account_id),
        "active_campaigns": active_count,
        "today_impressions": impressions,
        "today_clicks": clicks,
        "today_cost": cost,
        "status": "running" if running else "no_activity",
    }

    if as_json:
        print(json.dumps(result, indent=2))
    else:
        indicator = "✓ Ads are running" if running else "✗ No activity today"
        print(f"Account:    {account_name} ({account_id})")
        print(f"Campaigns:  {active_count} active")
        print(f"Today:      {impressions:,} impressions · {clicks:,} clicks · {cost}")
        print(f"Status:     {indicator}")
