#!/usr/bin/env python3
"""Ads Funnel CLI — Google Ads + PostHog reporting tool.

Usage:
    python scripts/ads/ads-cli.py status
    python scripts/ads/ads-cli.py report --days 7
    python scripts/ads/ads-cli.py variants --days 30
"""

import sys

from cli import build_parser, cmd_report, cmd_variants, cmd_status
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
        else:
            parser.print_help()
            sys.exit(1)
    except Exception as e:
        print(f"API error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
