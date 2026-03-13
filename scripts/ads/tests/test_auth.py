import os
import sys
import json
import pytest
from unittest.mock import patch, MagicMock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from auth import get_google_ads_client


def test_missing_credentials_file_raises(tmp_path):
    """Should raise FileNotFoundError with actionable message."""
    with pytest.raises(FileNotFoundError, match="credentials"):
        get_google_ads_client(
            developer_token="test",
            customer_id="123",
            credentials_path=str(tmp_path / "nonexistent.json"),
            token_path=str(tmp_path / ".token.json"),
        )


@patch("auth.InstalledAppFlow")
@patch("auth.GoogleAdsClient")
def test_first_run_opens_browser(mock_client_cls, mock_flow_cls, tmp_path):
    """First run with no cached token should trigger OAuth browser flow."""
    creds_path = tmp_path / ".credentials.json"
    creds_path.write_text(json.dumps({"installed": {"client_id": "x", "client_secret": "y"}}))
    token_path = tmp_path / ".token.json"

    mock_creds = MagicMock()
    mock_creds.valid = True
    mock_creds.to_json.return_value = '{"token": "fake"}'
    mock_flow_cls.from_client_secrets_file.return_value.run_local_server.return_value = mock_creds

    get_google_ads_client(
        developer_token="test",
        customer_id="123",
        credentials_path=str(creds_path),
        token_path=str(token_path),
    )

    mock_flow_cls.from_client_secrets_file.assert_called_once()
    assert token_path.exists()


@patch("auth.Credentials")
@patch("auth.GoogleAdsClient")
def test_cached_token_skips_browser(mock_client_cls, mock_creds_cls, tmp_path):
    """With a valid cached token, should not open browser."""
    creds_path = tmp_path / ".credentials.json"
    creds_path.write_text(json.dumps({"installed": {"client_id": "x", "client_secret": "y"}}))
    token_path = tmp_path / ".token.json"
    token_path.write_text('{"token": "cached"}')

    mock_creds = MagicMock()
    mock_creds.valid = True
    mock_creds_cls.from_authorized_user_info.return_value = mock_creds

    get_google_ads_client(
        developer_token="test",
        customer_id="123",
        credentials_path=str(creds_path),
        token_path=str(token_path),
    )

    mock_creds_cls.from_authorized_user_info.assert_called_once()
