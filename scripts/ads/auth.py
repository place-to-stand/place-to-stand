"""OAuth2 authentication for Google Ads API."""

import json
import os

from google.ads.googleads.client import GoogleAdsClient
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/adwords"]


def get_google_ads_client(
    developer_token: str,
    customer_id: str,
    credentials_path: str | None = None,
    token_path: str | None = None,
) -> GoogleAdsClient:
    """Return an authenticated GoogleAdsClient."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    if credentials_path is None:
        credentials_path = os.path.join(script_dir, ".credentials.json")
    if token_path is None:
        token_path = os.path.join(script_dir, ".token.json")

    if not os.path.exists(credentials_path):
        raise FileNotFoundError(
            f"OAuth2 credentials file not found at {credentials_path}. "
            "See docs/superpowers/specs/2026-03-13-ads-funnel-cli-design.md § Prerequisites"
        )

    creds = None

    if os.path.exists(token_path):
        with open(token_path) as f:
            token_data = json.load(f)
        creds = Credentials.from_authorized_user_info(token_data, SCOPES)

    if creds and not creds.valid:
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            creds = None

    if not creds:
        flow = InstalledAppFlow.from_client_secrets_file(credentials_path, SCOPES)
        creds = flow.run_local_server(port=0)

    with open(token_path, "w") as f:
        f.write(str(creds.to_json()))

    return GoogleAdsClient(
        credentials=creds,
        developer_token=developer_token,
        login_customer_id=customer_id,
    )
