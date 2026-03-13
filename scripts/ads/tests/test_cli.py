import os
import sys
import json
import pytest
from unittest.mock import patch, MagicMock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))


def test_cli_report_json_output(capsys):
    """--json flag should produce valid JSON output."""
    from cli import build_parser, cmd_report

    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service

    mock_row = MagicMock()
    mock_row.campaign.name = "Test"
    mock_row.campaign.status.name = "ENABLED"
    mock_row.metrics.impressions = 100
    mock_row.metrics.clicks = 10
    mock_row.metrics.ctr = 0.1
    mock_row.metrics.average_cpc = 500_000
    mock_row.metrics.cost_micros = 5_000_000
    mock_row.metrics.conversions = 1.0
    mock_service.search.return_value = [mock_row]

    cmd_report(mock_client, "123", days=7, as_json=True)

    output = capsys.readouterr().out
    data = json.loads(output)
    assert len(data) == 1
    assert data[0]["campaign"] == "Test"
    assert data[0]["cost"] == "$5.00"


def test_cli_report_table_output(capsys):
    """Default output should be a formatted table."""
    from cli import cmd_report

    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service

    mock_row = MagicMock()
    mock_row.campaign.name = "Campaign A"
    mock_row.campaign.status.name = "ENABLED"
    mock_row.metrics.impressions = 500
    mock_row.metrics.clicks = 25
    mock_row.metrics.ctr = 0.05
    mock_row.metrics.average_cpc = 1_000_000
    mock_row.metrics.cost_micros = 25_000_000
    mock_row.metrics.conversions = 2.0
    mock_service.search.return_value = [mock_row]

    cmd_report(mock_client, "123", days=7, as_json=False)

    output = capsys.readouterr().out
    assert "Campaign A" in output
    assert "ENABLED" in output


def test_cli_no_data_message(capsys):
    """Empty result set should print 'No data' message."""
    from cli import cmd_report

    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service
    mock_service.search.return_value = []

    cmd_report(mock_client, "123", days=7, as_json=False)

    output = capsys.readouterr().out
    assert "No data" in output


def test_cli_status_json_output(capsys):
    """status --json should produce valid JSON with expected fields."""
    from cli import cmd_status

    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service

    mock_row = MagicMock()
    mock_row.customer.descriptive_name = "Place To Stand"
    mock_row.customer.id = 1234567890
    mock_row.metrics.impressions = 50
    mock_row.metrics.clicks = 5
    mock_row.metrics.cost_micros = 3_000_000
    mock_service.search.side_effect = [[mock_row], [MagicMock(), MagicMock()]]

    cmd_status(mock_client, "123", as_json=True)

    output = capsys.readouterr().out
    data = json.loads(output)
    assert data["account"] == "Place To Stand"
    assert data["active_campaigns"] == 2
    assert data["today_cost"] == "$3.00"
    assert data["status"] == "running"


def test_cli_status_table_output(capsys):
    """status table output should show account info and running indicator."""
    from cli import cmd_status

    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service

    mock_row = MagicMock()
    mock_row.customer.descriptive_name = "Place To Stand"
    mock_row.customer.id = 1234567890
    mock_row.metrics.impressions = 0
    mock_row.metrics.clicks = 0
    mock_row.metrics.cost_micros = 0
    mock_service.search.side_effect = [[mock_row], []]

    cmd_status(mock_client, "123", as_json=False)

    output = capsys.readouterr().out
    assert "Place To Stand" in output
    assert "No activity today" in output


def test_build_parser_subcommands():
    """Parser should accept report, variants, status subcommands."""
    from cli import build_parser

    parser = build_parser()

    args = parser.parse_args(["report", "--days", "14"])
    assert args.command == "report"
    assert args.days == 14

    args = parser.parse_args(["status"])
    assert args.command == "status"

    args = parser.parse_args(["variants", "--json"])
    assert args.command == "variants"
    assert args.json is True
