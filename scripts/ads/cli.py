"""Argparse CLI definition and command handlers for ads-cli."""

import argparse
import json
import os
import sys
from datetime import date

from tabulate import tabulate

from formatting import date_range_clause, format_cost, format_ctr, format_cpc
from copy_manager import (
    parse_variant, get_all_slugs, load_guide, format_variant_output,
    validate_copy, save_copy, load_copy, get_active_version, list_copies,
    LANDING_PAGES_PATH, COPY_DIR,
)
from google_ads import (
    build_report_query,
    build_variants_query,
    build_status_queries,
    parse_campaign_row,
    parse_variant_row,
)
from posthog_api import fetch_pageviews, fetch_scroll_depths, fetch_cta_clicks, aggregate_by_path


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

    # funnel (Phase 2)
    p_funnel = sub.add_parser("funnel", help="PostHog funnel reports")
    funnel_sub = p_funnel.add_subparsers(dest="funnel_command", required=True)

    p_funnel_report = funnel_sub.add_parser("report", help="PostHog funnel data per variant")
    p_funnel_report.add_argument("--days", type=int, default=7, choices=[7, 14, 30])
    p_funnel_report.add_argument("--json", action="store_true", default=False)

    p_funnel_full = funnel_sub.add_parser("full", help="Stitched Ads + PostHog funnel")
    p_funnel_full.add_argument("--days", type=int, default=7, choices=[7, 14, 30])
    p_funnel_full.add_argument("--json", action="store_true", default=False)

    p_funnel_alerts = funnel_sub.add_parser("alerts", help="Funnel anomaly alerts")
    p_funnel_alerts.add_argument("--days", type=int, default=7, choices=[7, 14, 30])

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


def cmd_funnel_report(api_key: str, days: int, as_json: bool):
    start, _ = date_range_clause(days)
    pv = fetch_pageviews(api_key, start)
    scrolls = fetch_scroll_depths(api_key, start)
    clicks = fetch_cta_clicks(api_key, start)

    if not pv and not scrolls and not clicks:
        print("No data for the requested period.")
        return

    rows = aggregate_by_path(pv, scrolls, clicks)

    if as_json:
        print(json.dumps(rows, indent=2))
    else:
        print(tabulate(rows, headers="keys", tablefmt="simple"))


def cmd_funnel_full(client, customer_id: str, api_key: str, days: int, as_json: bool):
    """Stitch Google Ads + PostHog data into one table."""
    from urllib.parse import urlparse

    service = client.get_service("GoogleAdsService")
    start, end = date_range_clause(days)
    query = build_variants_query(start, end)
    ad_rows = list(service.search(customer_id=customer_id, query=query))

    pv = fetch_pageviews(api_key, start)
    scrolls = fetch_scroll_depths(api_key, start)
    clicks = fetch_cta_clicks(api_key, start)

    records = []
    for row in ad_rows:
        r = parse_variant_row(row)
        path = urlparse(r["url"]).path.rstrip("/")
        s = scrolls.get(path, {})
        scroll_50_plus = s.get(50, 0) + s.get(75, 0) + s.get(100, 0)
        page_count = pv.get(path, 0)
        cta = clicks.get(path, 0)

        click_to_view = f"{page_count / r['clicks'] * 100:.0f}%" if r["clicks"] > 0 else "N/A"
        view_to_cta = f"{cta / page_count * 100:.1f}%" if page_count > 0 else "N/A"

        records.append({
            "variant": path,
            "impressions": r["impressions"],
            "clicks": r["clicks"],
            "pageviews": page_count,
            "scroll_50+": scroll_50_plus,
            "cta_clicks": cta,
            "ctr": format_ctr(r["ctr"]),
            "click→view": click_to_view,
            "view→cta": view_to_cta,
        })

    if not records:
        print("No data for the requested period.")
        return

    if as_json:
        print(json.dumps(records, indent=2))
    else:
        print(tabulate(records, headers="keys", tablefmt="simple"))


def cmd_funnel_alerts(
    ads_data: dict[str, dict],
    posthog_pv: dict[str, int],
    posthog_scroll: dict[str, dict[int, int]],
    posthog_cta: dict[str, int],
):
    """Check for funnel anomalies and print alerts."""
    alerts = []

    for path, ad in ads_data.items():
        pv = posthog_pv.get(path, 0)
        s = posthog_scroll.get(path, {})
        cta = posthog_cta.get(path, 0)

        if ad.get("clicks", 0) > 0 and pv == 0:
            alerts.append(f"⚠ Tracking broken — {path}: {ad['clicks']} ad clicks but 0 pageviews")

        if ad.get("impressions", 0) > 100 and ad.get("ctr", 0) < 0.01:
            alerts.append(f"⚠ Low CTR — {path}: {ad['impressions']} impressions, CTR {ad['ctr']*100:.1f}%")

        if pv > 10 and s.get(25, 0) < pv * 0.2:
            alerts.append(f"⚠ Landing bounce — {path}: {pv} pageviews but only {s.get(25, 0)} scrolled past 25%")

        if s.get(50, 0) > 5 and cta == 0:
            alerts.append(f"⚠ CTA invisible — {path}: {s.get(50, 0)} scrolled 50%+ but 0 CTA clicks")

    if alerts:
        for a in alerts:
            print(a)
    else:
        print("No alerts — funnel looks healthy.")


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
