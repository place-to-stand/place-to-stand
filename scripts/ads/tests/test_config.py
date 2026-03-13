import os
import pytest
from unittest.mock import patch

import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from config import load_config, MissingConfigError


def test_load_config_returns_all_keys(tmp_path):
    env_file = tmp_path / ".env.local"
    env_file.write_text(
        "GOOGLE_ADS_DEVELOPER_TOKEN=test-token\n"
        "GOOGLE_ADS_CUSTOMER_ID=1234567890\n"
        "POSTHOG_PERSONAL_API_KEY=phx_testkey\n"
    )
    cfg = load_config(str(env_file))
    assert cfg["developer_token"] == "test-token"
    assert cfg["customer_id"] == "1234567890"
    assert cfg["posthog_api_key"] == "phx_testkey"


def test_load_config_missing_ads_token_raises(tmp_path):
    env_file = tmp_path / ".env.local"
    env_file.write_text("GOOGLE_ADS_CUSTOMER_ID=1234567890\n")
    with pytest.raises(MissingConfigError, match="GOOGLE_ADS_DEVELOPER_TOKEN"):
        load_config(str(env_file))


def test_load_config_strips_quotes(tmp_path):
    env_file = tmp_path / ".env.local"
    env_file.write_text(
        'GOOGLE_ADS_DEVELOPER_TOKEN="quoted-token"\n'
        'GOOGLE_ADS_CUSTOMER_ID="1234567890"\n'
    )
    cfg = load_config(str(env_file))
    assert cfg["developer_token"] == "quoted-token"
