#!/usr/bin/env python3
"""Ads Funnel CLI — Google Ads + PostHog reporting tool.

Usage:
    python scripts/ads/ads-cli.py status
    python scripts/ads/ads-cli.py report --days 7
    python scripts/ads/ads-cli.py variants --days 30
"""

import sys

from cli import (
    build_parser, cmd_report, cmd_variants, cmd_status,
    cmd_funnel_report, cmd_funnel_full, cmd_funnel_alerts,
)
from config import load_config, MissingConfigError
from auth import get_google_ads_client


def main():
    parser = build_parser()
    args = parser.parse_args()

    try:
        cfg = load_config()
    except MissingConfigError as e:
        print(f"Configuration error: {e}", file=sys.stderr)
        sys.exit(1)

    try:
        client = get_google_ads_client(
            developer_token=cfg["developer_token"],
            customer_id=cfg["customer_id"],
        )
    except FileNotFoundError as e:
        print(f"Auth error: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Auth error: {e}", file=sys.stderr)
        print("Token may be expired — re-run to open browser login.", file=sys.stderr)
        sys.exit(1)

    try:
        if args.command == "report":
            cmd_report(client, cfg["customer_id"], args.days, args.json)
        elif args.command == "variants":
            cmd_variants(client, cfg["customer_id"], args.days, args.json)
        elif args.command == "status":
            cmd_status(client, cfg["customer_id"], args.json)
        elif args.command == "funnel":
            posthog_key = cfg["posthog_api_key"]
            if not posthog_key:
                print("POSTHOG_PERSONAL_API_KEY not set in .env.local.", file=sys.stderr)
                sys.exit(1)

            if args.funnel_command == "report":
                cmd_funnel_report(posthog_key, args.days, args.json)
            elif args.funnel_command == "full":
                cmd_funnel_full(client, cfg["customer_id"], posthog_key, args.days, args.json)
            elif args.funnel_command == "alerts":
                from urllib.parse import urlparse
                from formatting import date_range_clause
                from google_ads import build_variants_query, parse_variant_row
                from posthog_api import fetch_pageviews, fetch_scroll_depths, fetch_cta_clicks

                start, end = date_range_clause(args.days)
                service = client.get_service("GoogleAdsService")
                query = build_variants_query(start, end)
                ad_rows = list(service.search(customer_id=cfg["customer_id"], query=query))

                ads_data = {}
                for row in ad_rows:
                    r = parse_variant_row(row)
                    path = urlparse(r["url"]).path.rstrip("/")
                    ads_data[path] = r

                pv = fetch_pageviews(posthog_key, start)
                scrolls = fetch_scroll_depths(posthog_key, start)
                clicks = fetch_cta_clicks(posthog_key, start)

                cmd_funnel_alerts(ads_data, pv, scrolls, clicks)
        else:
            parser.print_help()
            sys.exit(1)
    except Exception as e:
        print(f"API error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
