"""Load environment variables from .env.local for the ads CLI."""

import os
from dotenv import dotenv_values


class MissingConfigError(Exception):
    pass


def load_config(env_path: str | None = None) -> dict:
    """Load and validate required env vars. Returns dict with normalized keys."""
    if env_path is None:
        repo_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        env_path = os.path.join(repo_root, ".env.local")

    values = dotenv_values(env_path)

    developer_token = values.get("GOOGLE_ADS_DEVELOPER_TOKEN", "")
    customer_id = values.get("GOOGLE_ADS_CUSTOMER_ID", "")

    if not developer_token:
        raise MissingConfigError(
            "GOOGLE_ADS_DEVELOPER_TOKEN not set in .env.local. "
            "See docs/superpowers/specs/2026-03-13-ads-funnel-cli-design.md § Prerequisites"
        )

    if not customer_id:
        raise MissingConfigError(
            "GOOGLE_ADS_CUSTOMER_ID not set in .env.local. "
            "See docs/superpowers/specs/2026-03-13-ads-funnel-cli-design.md § Prerequisites"
        )

    return {
        "developer_token": developer_token,
        "customer_id": customer_id,
        "posthog_api_key": values.get("POSTHOG_PERSONAL_API_KEY", ""),
    }
