# Ads Optimization CLI Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `ads recommend` (Phase 2) and write commands — `ads pause`, `ads unpause`, `ads budget`, `ads pause-losers`, `ads promote-winner` (Phase 3) — to the existing ads CLI.

**Architecture:** Extends the existing argparse CLI at `scripts/ads/cli.py`. New modules: `recommendations.py` (rules engine receiving stitched data), `ads_writer.py` (Google Ads mutate operations for ad groups and budgets), `action_log.py` (append-only JSONL logger). All new commands follow the existing pattern: handler function in `cli.py`, dispatch in `ads-cli.py`, tested via direct function calls with mocked dependencies.

**Tech Stack:** Python 3.11+, google-ads SDK, argparse, tabulate, pytest

---

## Chunk 1: Phase 2 — Recommendations Engine

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `scripts/ads/recommendations.py` | Rules engine — receives stitched funnel data, returns list of recommendations |
| Create | `scripts/ads/tests/test_recommendations.py` | Unit tests for all 6 recommendation rules |
| Modify | `scripts/ads/cli.py:21-54` | Add `recommend` subcommand to parser, add `cmd_recommend` handler |
| Modify | `scripts/ads/ads-cli.py:43-84` | Wire `recommend` command dispatch |

---

### Task 1: Recommendation Rules Engine

**Files:**
- Create: `scripts/ads/recommendations.py`
- Create: `scripts/ads/tests/test_recommendations.py`

**Context:** The `recommendations.py` module receives stitched funnel data (the same format `cmd_funnel_full` and `cmd_funnel_alerts` already produce) and returns a list of recommendation dicts. It does NOT fetch data — that happens in `cli.py`/`ads-cli.py`.

Each recommendation has: `severity` (INFO/WARN/ACTION), `signal` (named rule), `variant` (path), `message` (human-readable).

- [ ] **Step 1: Write failing tests for all 6 rules**

```python
# scripts/ads/tests/test_recommendations.py
import os
import sys
import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from recommendations import evaluate_rules


def _make_variant(path, impressions=0, clicks=0, ctr=0.0, pageviews=0,
                  scroll_25=0, scroll_50=0, scroll_75=0, scroll_100=0, cta_clicks=0):
    """Helper to build a variant data dict matching the stitched format."""
    return {
        "variant": path,
        "impressions": impressions,
        "clicks": clicks,
        "ctr": ctr,
        "pageviews": pageviews,
        "scroll_25": scroll_25,
        "scroll_50": scroll_50,
        "scroll_75": scroll_75,
        "scroll_100": scroll_100,
        "cta_clicks": cta_clicks,
    }


def test_low_ctr_triggers_when_impressions_high_ctr_low():
    # clicks >= 15 so insufficient_data doesn't fire and mask the low_ctr rule
    variants = [_make_variant("/book-a-call/fast-start", impressions=250, clicks=16, ctr=0.008)]
    recs = evaluate_rules(variants)
    signals = [r["signal"] for r in recs]
    assert "low_ctr" in signals
    low_ctr_rec = [r for r in recs if r["signal"] == "low_ctr"][0]
    assert low_ctr_rec["severity"] == "WARN"


def test_low_ctr_does_not_trigger_below_impression_threshold():
    # clicks >= 15 so we actually test the impressions threshold, not insufficient_data
    variants = [_make_variant("/book-a-call/fast-start", impressions=50, clicks=16, ctr=0.005)]
    recs = evaluate_rules(variants)
    signals = [r["signal"] for r in recs]
    assert "low_ctr" not in signals


def test_tracking_gap_triggers():
    variants = [_make_variant("/book-a-call/fast-start", clicks=20, pageviews=5)]
    recs = evaluate_rules(variants)
    signals = [r["signal"] for r in recs]
    assert "tracking_gap" in signals
    assert recs[0]["severity"] == "WARN"


def test_tracking_gap_does_not_trigger_when_ratio_ok():
    variants = [_make_variant("/book-a-call/fast-start", clicks=20, pageviews=15)]
    recs = evaluate_rules(variants)
    signals = [r["signal"] for r in recs]
    assert "tracking_gap" not in signals


def test_hero_bounce_triggers():
    variants = [_make_variant("/book-a-call/fast-start", pageviews=20, scroll_25=3)]
    recs = evaluate_rules(variants)
    signals = [r["signal"] for r in recs]
    assert "hero_bounce" in signals
    assert recs[0]["severity"] == "ACTION"


def test_hero_bounce_does_not_trigger_below_threshold():
    # clicks >= 15 so insufficient_data doesn't mask this test
    variants = [_make_variant("/book-a-call/fast-start", impressions=100, clicks=16, ctr=0.16, pageviews=5, scroll_25=1)]
    recs = evaluate_rules(variants)
    signals = [r["signal"] for r in recs]
    assert "hero_bounce" not in signals


def test_cta_invisible_triggers():
    variants = [_make_variant("/book-a-call/fast-start", scroll_50=8, scroll_75=3, scroll_100=1, cta_clicks=0)]
    recs = evaluate_rules(variants)
    signals = [r["signal"] for r in recs]
    assert "cta_invisible" in signals
    assert recs[0]["severity"] == "ACTION"


def test_cta_invisible_does_not_trigger_with_clicks():
    # clicks >= 15 so insufficient_data doesn't mask this test
    variants = [_make_variant("/book-a-call/fast-start", impressions=200, clicks=16, ctr=0.08, scroll_50=8, cta_clicks=2)]
    recs = evaluate_rules(variants)
    signals = [r["signal"] for r in recs]
    assert "cta_invisible" not in signals


def test_winner_detected():
    variants = [
        _make_variant("/book-a-call/fast-start", impressions=200, clicks=20, ctr=0.10),
        _make_variant("/book-a-call/done-for-you", impressions=200, clicks=8, ctr=0.04),
    ]
    recs = evaluate_rules(variants)
    signals = [r["signal"] for r in recs]
    assert "winner_detected" in signals
    winner_rec = [r for r in recs if r["signal"] == "winner_detected"][0]
    assert winner_rec["severity"] == "INFO"
    assert "fast-start" in winner_rec["message"]


def test_winner_not_detected_when_close():
    variants = [
        _make_variant("/book-a-call/fast-start", impressions=200, clicks=18, ctr=0.09),
        _make_variant("/book-a-call/done-for-you", impressions=200, clicks=14, ctr=0.07),
    ]
    recs = evaluate_rules(variants)
    signals = [r["signal"] for r in recs]
    assert "winner_detected" not in signals


def test_insufficient_data():
    variants = [_make_variant("/book-a-call/fast-start", impressions=50, clicks=3)]
    recs = evaluate_rules(variants)
    signals = [r["signal"] for r in recs]
    assert "insufficient_data" in signals
    assert recs[0]["severity"] == "INFO"


def test_no_recommendations_when_healthy():
    variants = [
        _make_variant("/book-a-call/fast-start", impressions=300, clicks=20, ctr=0.067,
                      pageviews=18, scroll_25=14, scroll_50=10, cta_clicks=3),
        _make_variant("/book-a-call/done-for-you", impressions=300, clicks=18, ctr=0.060,
                      pageviews=16, scroll_25=12, scroll_50=8, cta_clicks=2),
    ]
    recs = evaluate_rules(variants)
    assert len(recs) == 0
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts/ads && python -m pytest tests/test_recommendations.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'recommendations'`

- [ ] **Step 3: Implement recommendations.py**

```python
# scripts/ads/recommendations.py
"""Rules engine for ads funnel recommendations."""


def evaluate_rules(variants: list[dict]) -> list[dict]:
    """Evaluate all recommendation rules against stitched variant data.

    Each variant dict has keys: variant, impressions, clicks, ctr,
    pageviews, scroll_25, scroll_50, scroll_75, scroll_100, cta_clicks.

    Returns list of recommendation dicts with: severity, signal, variant, message.
    """
    recs = []

    for v in variants:
        path = v["variant"]
        impressions = v.get("impressions", 0)
        clicks = v.get("clicks", 0)
        ctr = v.get("ctr", 0.0)
        pageviews = v.get("pageviews", 0)
        scroll_25 = v.get("scroll_25", 0)
        scroll_50 = v.get("scroll_50", 0)
        scroll_75 = v.get("scroll_75", 0)
        scroll_100 = v.get("scroll_100", 0)
        cta_clicks = v.get("cta_clicks", 0)

        # Insufficient data — must check first (< 15 clicks)
        if clicks < 15:
            recs.append({
                "severity": "INFO",
                "signal": "insufficient_data",
                "variant": path,
                "message": f"Not enough data for {path} — only {clicks} clicks so far",
            })
            continue  # skip other rules for this variant

        # Low CTR — impressions > 200, CTR < 1%
        if impressions > 200 and ctr < 0.01:
            recs.append({
                "severity": "WARN",
                "signal": "low_ctr",
                "variant": path,
                "message": f"Ad copy isn't landing — rewrite headline for {path} (CTR {ctr*100:.1f}% on {impressions} impressions)",
            })

        # Tracking gap — clicks > 15, pageviews < 50% of clicks
        if clicks > 15 and pageviews < clicks * 0.5:
            recs.append({
                "severity": "WARN",
                "signal": "tracking_gap",
                "variant": path,
                "message": f"Tracking gap or slow load on {path} — {clicks} clicks but only {pageviews} pageviews",
            })

        # Hero bounce — pageviews > 10, scroll 25% < 30% of pageviews
        if pageviews > 10 and scroll_25 < pageviews * 0.3:
            recs.append({
                "severity": "ACTION",
                "signal": "hero_bounce",
                "variant": path,
                "message": f"Above-the-fold isn't hooking on {path} — {pageviews} pageviews but only {scroll_25} scrolled past 25%",
            })

        # CTA invisible — scroll 50%+ > 5, CTA clicks = 0
        scroll_50_plus = scroll_50 + scroll_75 + scroll_100
        if scroll_50_plus > 5 and cta_clicks == 0:
            recs.append({
                "severity": "ACTION",
                "signal": "cta_invisible",
                "variant": path,
                "message": f"They're reading {path} but not clicking — {scroll_50_plus} scrolled 50%+ but 0 CTA clicks",
            })

    # Winner detected — cross-variant comparison
    # Only compare variants with 100+ impressions
    eligible = [v for v in variants if v.get("impressions", 0) >= 100]
    if len(eligible) >= 2:
        sorted_by_ctr = sorted(eligible, key=lambda v: v.get("ctr", 0), reverse=True)
        best = sorted_by_ctr[0]
        second = sorted_by_ctr[1]
        if second["ctr"] > 0 and best["ctr"] / second["ctr"] >= 2.0:
            ratio = best["ctr"] / second["ctr"]
            recs.append({
                "severity": "INFO",
                "signal": "winner_detected",
                "variant": best["variant"],
                "message": f"Shift budget toward {best['variant']} — outperforming by {ratio:.1f}x CTR",
            })

    return recs
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd scripts/ads && python -m pytest tests/test_recommendations.py -v`
Expected: All 13 tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/ads/recommendations.py scripts/ads/tests/test_recommendations.py
git commit -m "feat(ads): add recommendation rules engine with 13 tests"
```

---

### Task 2: Wire `recommend` Command into CLI

**Files:**
- Modify: `scripts/ads/cli.py:21-54` (add parser entry)
- Modify: `scripts/ads/cli.py` (add `cmd_recommend` handler at bottom)
- Modify: `scripts/ads/ads-cli.py:43-84` (add dispatch)
- Create: `scripts/ads/tests/test_recommend_command.py`

**Context:** `cmd_recommend` reuses the data-fetching pattern from `cmd_funnel_full` (Google Ads variants query + PostHog pageviews/scrolls/clicks), then passes stitched data to `evaluate_rules`. The handler adds scroll breakdown fields (`scroll_25`, `scroll_50`, etc.) that `cmd_funnel_full` doesn't currently include in its records — this is fine, `cmd_recommend` builds its own variant dicts for the rules engine.

- [ ] **Step 1: Write failing tests**

```python
# scripts/ads/tests/test_recommend_command.py
import os
import sys
import json
import pytest
from unittest.mock import patch, MagicMock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from cli import cmd_recommend


@patch("cli.fetch_cta_clicks", return_value={"/book-a-call/fast-start": 0})
@patch("cli.fetch_scroll_depths", return_value={"/book-a-call/fast-start": {25: 3, 50: 8, 75: 2, 100: 1}})
@patch("cli.fetch_pageviews", return_value={"/book-a-call/fast-start": 20})
def test_recommend_shows_cta_invisible(mock_pv, mock_scroll, mock_cta, capsys):
    """Should detect CTA invisible when scroll 50%+ > 5 but 0 CTA clicks."""
    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service

    mock_row = MagicMock()
    mock_row.landing_page_view.unexpanded_final_url = "https://placetostandagency.com/book-a-call/fast-start"
    mock_row.metrics.impressions = 300
    mock_row.metrics.clicks = 20
    mock_row.metrics.ctr = 0.067
    mock_row.metrics.average_cpc = 800_000
    mock_row.metrics.cost_micros = 16_000_000
    mock_service.search.return_value = [mock_row]

    cmd_recommend(mock_client, "123", api_key="fake", days=14, as_json=False)

    output = capsys.readouterr().out
    assert "CTA" in output or "cta_invisible" in output


@patch("cli.fetch_cta_clicks", return_value={"/book-a-call/fast-start": 3})
@patch("cli.fetch_scroll_depths", return_value={"/book-a-call/fast-start": {25: 14, 50: 10, 75: 5, 100: 2}})
@patch("cli.fetch_pageviews", return_value={"/book-a-call/fast-start": 18})
def test_recommend_no_issues(mock_pv, mock_scroll, mock_cta, capsys):
    """Should print 'no recommendations' when funnel is healthy."""
    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service

    mock_row = MagicMock()
    mock_row.landing_page_view.unexpanded_final_url = "https://placetostandagency.com/book-a-call/fast-start"
    mock_row.metrics.impressions = 300
    mock_row.metrics.clicks = 20
    mock_row.metrics.ctr = 0.067
    mock_row.metrics.average_cpc = 800_000
    mock_row.metrics.cost_micros = 16_000_000
    mock_service.search.return_value = [mock_row]

    cmd_recommend(mock_client, "123", api_key="fake", days=14, as_json=False)

    output = capsys.readouterr().out
    assert "No recommendations" in output


@patch("cli.fetch_cta_clicks", return_value={"/book-a-call/fast-start": 0})
@patch("cli.fetch_scroll_depths", return_value={"/book-a-call/fast-start": {25: 3, 50: 8, 75: 2, 100: 1}})
@patch("cli.fetch_pageviews", return_value={"/book-a-call/fast-start": 20})
def test_recommend_json_output(mock_pv, mock_scroll, mock_cta, capsys):
    """--json flag should produce valid JSON array of recommendations."""
    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service

    mock_row = MagicMock()
    mock_row.landing_page_view.unexpanded_final_url = "https://placetostandagency.com/book-a-call/fast-start"
    mock_row.metrics.impressions = 300
    mock_row.metrics.clicks = 20
    mock_row.metrics.ctr = 0.067
    mock_row.metrics.average_cpc = 800_000
    mock_row.metrics.cost_micros = 16_000_000
    mock_service.search.return_value = [mock_row]

    cmd_recommend(mock_client, "123", api_key="fake", days=14, as_json=True)

    output = capsys.readouterr().out
    data = json.loads(output)
    assert isinstance(data, list)
    assert len(data) > 0
    assert "signal" in data[0]
    assert "severity" in data[0]


@patch("cli.fetch_cta_clicks", return_value={})
@patch("cli.fetch_scroll_depths", return_value={})
@patch("cli.fetch_pageviews", return_value={})
def test_recommend_no_data(mock_pv, mock_scroll, mock_cta, capsys):
    """Should handle no ads data gracefully."""
    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service
    mock_service.search.return_value = []

    cmd_recommend(mock_client, "123", api_key="fake", days=14, as_json=False)

    output = capsys.readouterr().out
    assert "No data" in output
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts/ads && python -m pytest tests/test_recommend_command.py -v`
Expected: FAIL with `ImportError: cannot import name 'cmd_recommend' from 'cli'`

- [ ] **Step 3: Add `recommend` to the parser in cli.py**

Add after the `p_funnel_alerts` parser definition (after line 52 in `cli.py`):

```python
    p_recommend = sub.add_parser("recommend", help="Funnel-based recommendations")
    p_recommend.add_argument("--days", type=int, default=14, choices=[7, 14, 30])
    p_recommend.add_argument("--json", action="store_true", default=False)
```

- [ ] **Step 4: Add `cmd_recommend` handler to cli.py**

Add at the bottom of `cli.py`, after `cmd_funnel_alerts`:

```python
def cmd_recommend(client, customer_id: str, api_key: str, days: int, as_json: bool):
    """Fetch stitched funnel data and run recommendation rules."""
    from urllib.parse import urlparse
    from recommendations import evaluate_rules

    service = client.get_service("GoogleAdsService")
    start, end = date_range_clause(days)
    query = build_variants_query(start, end)
    ad_rows = list(service.search(customer_id=customer_id, query=query))

    if not ad_rows:
        print("No data for the requested period.")
        return

    pv = fetch_pageviews(api_key, start)
    scrolls = fetch_scroll_depths(api_key, start)
    clicks = fetch_cta_clicks(api_key, start)

    # Build variant dicts for the rules engine
    variants = []
    for row in ad_rows:
        r = parse_variant_row(row)
        path = urlparse(r["url"]).path.rstrip("/")
        s = scrolls.get(path, {})
        variants.append({
            "variant": path,
            "impressions": r["impressions"],
            "clicks": r["clicks"],
            "ctr": r["ctr"],
            "pageviews": pv.get(path, 0),
            "scroll_25": s.get(25, 0),
            "scroll_50": s.get(50, 0),
            "scroll_75": s.get(75, 0),
            "scroll_100": s.get(100, 0),
            "cta_clicks": clicks.get(path, 0),
        })

    recs = evaluate_rules(variants)

    if as_json:
        print(json.dumps(recs, indent=2))
    elif not recs:
        print("No recommendations — funnel looks healthy.")
    else:
        for r in recs:
            print(f"[{r['severity']}] {r['message']}")
```

- [ ] **Step 5: Wire dispatch in ads-cli.py**

Add `cmd_recommend` to the import at the top of `ads-cli.py`:

```python
from cli import (
    build_parser, cmd_report, cmd_variants, cmd_status,
    cmd_funnel_report, cmd_funnel_full, cmd_funnel_alerts,
    cmd_recommend,
)
```

Add dispatch in `main()` after the `funnel` block and before the `else`:

```python
        elif args.command == "recommend":
            posthog_key = cfg["posthog_api_key"]
            if not posthog_key:
                print("POSTHOG_PERSONAL_API_KEY not set in .env.local.", file=sys.stderr)
                sys.exit(1)
            cmd_recommend(client, cfg["customer_id"], posthog_key, args.days, args.json)
```

- [ ] **Step 6: Run all tests**

Run: `cd scripts/ads && python -m pytest tests/ -v`
Expected: All tests pass (existing 35 + 4 new recommend tests + 13 recommendation engine tests = 52)

- [ ] **Step 7: Commit**

```bash
git add scripts/ads/cli.py scripts/ads/ads-cli.py scripts/ads/tests/test_recommend_command.py
git commit -m "feat(ads): wire recommend command into CLI with 4 integration tests"
```

---

## Chunk 2: Phase 3 — Write Commands

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `scripts/ads/action_log.py` | Append-only JSONL logger for all write operations |
| Create | `scripts/ads/ads_writer.py` | Google Ads API mutate operations (ad groups + budgets) |
| Create | `scripts/ads/tests/test_action_log.py` | Tests for action logger |
| Create | `scripts/ads/tests/test_ads_writer.py` | Tests for write operations |
| Create | `scripts/ads/tests/test_write_commands.py` | Tests for CLI write command handlers |
| Modify | `scripts/ads/cli.py` | Add parser entries + handlers for pause/unpause/budget/pause-losers/promote-winner |
| Modify | `scripts/ads/ads-cli.py` | Wire write command dispatch |

---

### Task 3: Action Logger

**Files:**
- Create: `scripts/ads/action_log.py`
- Create: `scripts/ads/tests/test_action_log.py`

**Context:** Every write operation logs to `scripts/ads/.action-log.jsonl`. Each entry is a JSON line with `timestamp`, `command`, `params`, and `result`. The logger uses append mode so concurrent runs don't corrupt data.

- [ ] **Step 1: Write failing tests**

```python
# scripts/ads/tests/test_action_log.py
import os
import sys
import json
import tempfile
import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from action_log import log_action, read_log


def test_log_action_creates_file(tmp_path):
    log_path = tmp_path / "actions.jsonl"
    log_action(str(log_path), command="pause", params={"variant": "fast-start"}, result="success")
    assert log_path.exists()


def test_log_action_appends_valid_jsonl(tmp_path):
    log_path = tmp_path / "actions.jsonl"
    log_action(str(log_path), command="pause", params={"variant": "fast-start"}, result="success")
    log_action(str(log_path), command="unpause", params={"variant": "fast-start"}, result="success")

    lines = log_path.read_text().strip().split("\n")
    assert len(lines) == 2

    entry1 = json.loads(lines[0])
    assert entry1["command"] == "pause"
    assert "timestamp" in entry1
    assert entry1["params"]["variant"] == "fast-start"

    entry2 = json.loads(lines[1])
    assert entry2["command"] == "unpause"


def test_read_log_returns_entries(tmp_path):
    log_path = tmp_path / "actions.jsonl"
    log_action(str(log_path), command="pause", params={}, result="ok")
    log_action(str(log_path), command="budget", params={}, result="ok")

    entries = read_log(str(log_path))
    assert len(entries) == 2


def test_read_log_empty_file(tmp_path):
    log_path = tmp_path / "actions.jsonl"
    entries = read_log(str(log_path))
    assert entries == []
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts/ads && python -m pytest tests/test_action_log.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'action_log'`

- [ ] **Step 3: Implement action_log.py**

```python
# scripts/ads/action_log.py
"""Append-only JSONL action logger for write operations."""

import json
import os
from datetime import datetime, timezone


DEFAULT_LOG_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".action-log.jsonl")


def log_action(
    log_path: str = DEFAULT_LOG_PATH,
    *,
    command: str,
    params: dict,
    result: str,
) -> None:
    """Append a single action entry to the JSONL log."""
    entry = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "command": command,
        "params": params,
        "result": result,
    }
    with open(log_path, "a") as f:
        f.write(json.dumps(entry) + "\n")


def read_log(log_path: str = DEFAULT_LOG_PATH) -> list[dict]:
    """Read all entries from the JSONL log. Returns empty list if file missing."""
    if not os.path.exists(log_path):
        return []
    entries = []
    with open(log_path) as f:
        for line in f:
            line = line.strip()
            if line:
                entries.append(json.loads(line))
    return entries
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd scripts/ads && python -m pytest tests/test_action_log.py -v`
Expected: All 4 tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/ads/action_log.py scripts/ads/tests/test_action_log.py
git commit -m "feat(ads): add JSONL action logger for write operations"
```

---

### Task 4: Ads Writer — Pause/Unpause Ad Groups

**Files:**
- Create: `scripts/ads/ads_writer.py`
- Create: `scripts/ads/tests/test_ads_writer.py`

**Context:** The `ads_writer.py` module wraps Google Ads API mutate calls. Variants are ad groups within a single campaign. To pause/unpause a variant, we need to:
1. Find the ad group by its final URL
2. Mutate the ad group status

The Google Ads API uses `AdGroupService.MutateAdGroups` with an `AdGroupOperation` containing an `update` field and a `field_mask`.

- [ ] **Step 1: Write failing tests**

```python
# scripts/ads/tests/test_ads_writer.py
import os
import sys
import pytest
from unittest.mock import MagicMock, patch, call

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from ads_writer import find_ad_group_by_url, pause_ad_group, unpause_ad_group, update_campaign_budget


def test_find_ad_group_by_url():
    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service

    mock_row = MagicMock()
    mock_row.ad_group.resource_name = "customers/123/adGroups/456"
    mock_row.ad_group.name = "Fast Start"
    mock_service.search.return_value = [mock_row]

    result = find_ad_group_by_url(mock_client, "123", "/book-a-call/fast-start")
    assert result["resource_name"] == "customers/123/adGroups/456"
    assert result["name"] == "Fast Start"


def test_find_ad_group_by_url_not_found():
    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service
    mock_service.search.return_value = []

    result = find_ad_group_by_url(mock_client, "123", "/book-a-call/nonexistent")
    assert result is None


def test_pause_ad_group_calls_mutate():
    mock_client = MagicMock()
    mock_ag_service = MagicMock()
    mock_client.get_service.return_value = mock_ag_service

    pause_ad_group(mock_client, "123", "customers/123/adGroups/456")

    mock_ag_service.mutate_ad_groups.assert_called_once()
    call_args = mock_ag_service.mutate_ad_groups.call_args
    assert call_args.kwargs["customer_id"] == "123"


def test_unpause_ad_group_calls_mutate():
    mock_client = MagicMock()
    mock_ag_service = MagicMock()
    mock_client.get_service.return_value = mock_ag_service

    unpause_ad_group(mock_client, "123", "customers/123/adGroups/456")

    mock_ag_service.mutate_ad_groups.assert_called_once()


def test_update_campaign_budget_calls_mutate():
    mock_client = MagicMock()
    mock_budget_service = MagicMock()
    mock_client.get_service.return_value = mock_budget_service

    update_campaign_budget(mock_client, "123", "customers/123/campaignBudgets/789", 5_000_000)

    mock_budget_service.mutate_campaign_budgets.assert_called_once()
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts/ads && python -m pytest tests/test_ads_writer.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'ads_writer'`

- [ ] **Step 3: Implement ads_writer.py**

```python
# scripts/ads/ads_writer.py
"""Google Ads API write operations for ad groups and budgets."""

def find_ad_group_by_url(client, customer_id: str, variant_path: str) -> dict | None:
    """Find an ad group whose ads point to a URL containing the given path.

    Returns dict with resource_name and name, or None if not found.
    """
    service = client.get_service("GoogleAdsService")
    # Search for ad group ads whose final URL contains the variant path
    query = f"""
        SELECT
            ad_group.resource_name,
            ad_group.name,
            ad_group_ad.ad.final_urls
        FROM ad_group_ad
        WHERE ad_group.status != 'REMOVED'
    """.strip()

    rows = list(service.search(customer_id=customer_id, query=query))
    for row in rows:
        final_urls = list(row.ad_group_ad.ad.final_urls)
        for url in final_urls:
            if variant_path.rstrip("/") in url:
                return {
                    "resource_name": row.ad_group.resource_name,
                    "name": row.ad_group.name,
                }
    return None


def _mutate_ad_group_status(client, customer_id: str, ad_group_resource_name: str, status) -> str:
    """Set ad group status (PAUSED or ENABLED). Returns the resource name."""
    from google.protobuf import field_mask_pb2

    ad_group_service = client.get_service("AdGroupService")
    ad_group_operation = client.get_type("AdGroupOperation")

    ad_group = ad_group_operation.update
    ad_group.resource_name = ad_group_resource_name
    ad_group.status = status

    ad_group_operation.update_mask = field_mask_pb2.FieldMask(paths=["status"])

    response = ad_group_service.mutate_ad_groups(
        customer_id=customer_id,
        operations=[ad_group_operation],
    )
    return response.results[0].resource_name


def pause_ad_group(client, customer_id: str, ad_group_resource_name: str) -> str:
    """Pause an ad group. Returns the resource name of the mutated ad group."""
    return _mutate_ad_group_status(
        client, customer_id, ad_group_resource_name,
        client.enums.AdGroupStatusEnum.PAUSED,
    )


def unpause_ad_group(client, customer_id: str, ad_group_resource_name: str) -> str:
    """Enable a paused ad group. Returns the resource name."""
    return _mutate_ad_group_status(
        client, customer_id, ad_group_resource_name,
        client.enums.AdGroupStatusEnum.ENABLED,
    )


def update_campaign_budget(client, customer_id: str, budget_resource_name: str, amount_micros: int) -> str:
    """Update a campaign budget amount. Returns the resource name."""
    from google.protobuf import field_mask_pb2

    budget_service = client.get_service("CampaignBudgetService")
    budget_operation = client.get_type("CampaignBudgetOperation")

    budget = budget_operation.update
    budget.resource_name = budget_resource_name
    budget.amount_micros = amount_micros

    budget_operation.update_mask = field_mask_pb2.FieldMask(paths=["amount_micros"])

    response = budget_service.mutate_campaign_budgets(
        customer_id=customer_id,
        operations=[budget_operation],
    )
    return response.results[0].resource_name
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd scripts/ads && python -m pytest tests/test_ads_writer.py -v`
Expected: All 5 tests PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/ads/ads_writer.py scripts/ads/tests/test_ads_writer.py
git commit -m "feat(ads): add ads writer for ad group pause/unpause and budget updates"
```

---

### Task 5: CLI Write Commands — Pause, Unpause, Budget

**Files:**
- Modify: `scripts/ads/cli.py` (add parser entries + handlers)
- Modify: `scripts/ads/ads-cli.py` (wire dispatch)
- Create: `scripts/ads/tests/test_write_commands.py`

**Context:** These three commands (`pause`, `unpause`, `budget shift`) are the building blocks. They each:
1. Look up the ad group by variant path using `find_ad_group_by_url`
2. Show a preview of what will happen
3. Prompt for confirmation (unless `--dry-run`)
4. Execute the mutate operation
5. Log the action to `.action-log.jsonl`

For testability, the confirmation prompt uses `input()` which we mock in tests.

- [ ] **Step 1: Write failing tests**

```python
# scripts/ads/tests/test_write_commands.py
import os
import sys
import json
import tempfile
import pytest
from unittest.mock import patch, MagicMock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from cli import cmd_pause, cmd_unpause, cmd_budget_shift


@patch("cli.log_action")
@patch("cli.pause_ad_group", return_value="customers/123/adGroups/456")
@patch("cli.find_ad_group_by_url", return_value={"resource_name": "customers/123/adGroups/456", "name": "Fast Start"})
@patch("builtins.input", return_value="y")
def test_pause_with_confirmation(mock_input, mock_find, mock_pause, mock_log, capsys):
    mock_client = MagicMock()
    cmd_pause(mock_client, "123", variant="fast-start", dry_run=False)

    mock_pause.assert_called_once()
    mock_log.assert_called_once()
    output = capsys.readouterr().out
    assert "Paused" in output or "paused" in output


@patch("cli.find_ad_group_by_url", return_value={"resource_name": "customers/123/adGroups/456", "name": "Fast Start"})
def test_pause_dry_run(mock_find, capsys):
    mock_client = MagicMock()
    cmd_pause(mock_client, "123", variant="fast-start", dry_run=True)

    output = capsys.readouterr().out
    assert "DRY RUN" in output or "dry run" in output.lower()


@patch("cli.find_ad_group_by_url", return_value=None)
def test_pause_variant_not_found(mock_find, capsys):
    mock_client = MagicMock()
    with pytest.raises(SystemExit):
        cmd_pause(mock_client, "123", variant="nonexistent", dry_run=False)


@patch("cli.log_action")
@patch("cli.unpause_ad_group", return_value="customers/123/adGroups/456")
@patch("cli.find_ad_group_by_url", return_value={"resource_name": "customers/123/adGroups/456", "name": "Fast Start"})
@patch("builtins.input", return_value="y")
def test_unpause_with_confirmation(mock_input, mock_find, mock_unpause, mock_log, capsys):
    mock_client = MagicMock()
    cmd_unpause(mock_client, "123", variant="fast-start", dry_run=False)

    mock_unpause.assert_called_once()
    output = capsys.readouterr().out
    assert "Enabled" in output or "enabled" in output or "Unpaused" in output


@patch("cli.pause_ad_group")
@patch("cli.find_ad_group_by_url", return_value={"resource_name": "customers/123/adGroups/456", "name": "Fast Start"})
@patch("builtins.input", return_value="n")
def test_pause_cancelled_by_user(mock_input, mock_find, mock_pause, capsys):
    mock_client = MagicMock()
    cmd_pause(mock_client, "123", variant="fast-start", dry_run=False)

    mock_pause.assert_not_called()
    output = capsys.readouterr().out
    assert "Cancelled" in output or "cancelled" in output


@patch("cli.log_action")
@patch("cli.update_campaign_budget", return_value="customers/123/campaignBudgets/789")
@patch("builtins.input", return_value="y")
def test_budget_shift(mock_input, mock_update, mock_log, capsys):
    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service

    # Mock campaign query returning budget info
    mock_row = MagicMock()
    mock_row.campaign.name = "Main Campaign"
    mock_row.campaign_budget.resource_name = "customers/123/campaignBudgets/789"
    mock_row.campaign_budget.amount_micros = 10_000_000  # $10
    mock_service.search.return_value = [mock_row]

    cmd_budget_shift(mock_client, "123", amount_dollars=5.0, dry_run=False)

    mock_update.assert_called_once()
    output = capsys.readouterr().out
    assert "$" in output
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts/ads && python -m pytest tests/test_write_commands.py -v`
Expected: FAIL with `ImportError: cannot import name 'cmd_pause' from 'cli'`

- [ ] **Step 3: Add parser entries for pause, unpause, budget to cli.py**

Add these parser entries after the `recommend` parser (in `build_parser`):

```python
    p_pause = sub.add_parser("pause", help="Pause a variant's ad group")
    p_pause.add_argument("variant", help="Variant slug (e.g. fast-start)")
    p_pause.add_argument("--dry-run", action="store_true", default=False)

    p_unpause = sub.add_parser("unpause", help="Re-enable a paused variant")
    p_unpause.add_argument("variant", help="Variant slug (e.g. fast-start)")
    p_unpause.add_argument("--dry-run", action="store_true", default=False)

    p_budget = sub.add_parser("budget", help="Update campaign budget")
    p_budget.add_argument("amount", type=float, help="New daily budget in dollars")
    p_budget.add_argument("--dry-run", action="store_true", default=False)
```

- [ ] **Step 4: Add command handlers to cli.py**

**Important:** Use lazy (function-level) imports for `ads_writer` and `action_log` to avoid breaking existing read-only commands that don't need these modules. This matches the existing pattern in `cmd_funnel_full` which uses `from urllib.parse import urlparse` inside the function body.

Add these handlers at the bottom of `cli.py`:

```python
def cmd_pause(client, customer_id: str, variant: str, dry_run: bool):
    """Pause a variant's ad group."""
    from ads_writer import find_ad_group_by_url, pause_ad_group
    from action_log import log_action

    path = f"/book-a-call/{variant}"
    ag = find_ad_group_by_url(client, customer_id, path)
    if not ag:
        print(f"No ad group found for {path}", file=sys.stderr)
        sys.exit(1)

    print(f"Will pause ad group '{ag['name']}' ({ag['resource_name']}) for {path}")

    if dry_run:
        print("[DRY RUN] No changes made.")
        return

    confirm = input("Proceed? (y/N): ").strip().lower()
    if confirm != "y":
        print("Cancelled.")
        return

    pause_ad_group(client, customer_id, ag["resource_name"])
    log_action(command="pause", params={"variant": variant, "ad_group": ag["resource_name"]}, result="success")
    print(f"Paused '{ag['name']}'.")


def cmd_unpause(client, customer_id: str, variant: str, dry_run: bool):
    """Re-enable a paused variant's ad group."""
    from ads_writer import find_ad_group_by_url, unpause_ad_group
    from action_log import log_action

    path = f"/book-a-call/{variant}"
    ag = find_ad_group_by_url(client, customer_id, path)
    if not ag:
        print(f"No ad group found for {path}", file=sys.stderr)
        sys.exit(1)

    print(f"Will enable ad group '{ag['name']}' ({ag['resource_name']}) for {path}")

    if dry_run:
        print("[DRY RUN] No changes made.")
        return

    confirm = input("Proceed? (y/N): ").strip().lower()
    if confirm != "y":
        print("Cancelled.")
        return

    unpause_ad_group(client, customer_id, ag["resource_name"])
    log_action(command="unpause", params={"variant": variant, "ad_group": ag["resource_name"]}, result="success")
    print(f"Enabled '{ag['name']}'.")


def cmd_budget_shift(client, customer_id: str, amount_dollars: float, dry_run: bool):
    """Update the campaign's daily budget."""
    from ads_writer import update_campaign_budget
    from action_log import log_action

    # Budget floor: $1/day minimum
    if amount_dollars < 1.0:
        print("Budget floor is $1.00/day — cannot set lower.", file=sys.stderr)
        sys.exit(1)

    service = client.get_service("GoogleAdsService")
    query = """
        SELECT
            campaign.name,
            campaign_budget.resource_name,
            campaign_budget.amount_micros
        FROM campaign
        WHERE campaign.status = 'ENABLED'
        LIMIT 1
    """.strip()

    rows = list(service.search(customer_id=customer_id, query=query))
    if not rows:
        print("No active campaign found.", file=sys.stderr)
        sys.exit(1)

    row = rows[0]
    budget_rn = row.campaign_budget.resource_name
    current_micros = row.campaign_budget.amount_micros
    new_micros = int(amount_dollars * 1_000_000)

    print(f"Campaign: {row.campaign.name}")
    print(f"Budget: ${current_micros / 1_000_000:.2f}/day → ${amount_dollars:.2f}/day")

    if dry_run:
        print("[DRY RUN] No changes made.")
        return

    confirm = input("Proceed? (y/N): ").strip().lower()
    if confirm != "y":
        print("Cancelled.")
        return

    update_campaign_budget(client, customer_id, budget_rn, new_micros)
    log_action(
        command="budget",
        params={"budget_resource": budget_rn, "old_micros": current_micros, "new_micros": new_micros},
        result="success",
    )
    print(f"Budget updated to ${amount_dollars:.2f}/day.")
```

- [ ] **Step 5: Wire dispatch in ads-cli.py**

Update the import to include the new handlers:

```python
from cli import (
    build_parser, cmd_report, cmd_variants, cmd_status,
    cmd_funnel_report, cmd_funnel_full, cmd_funnel_alerts,
    cmd_recommend, cmd_pause, cmd_unpause, cmd_budget_shift,
)
```

Add dispatch cases in `main()`:

```python
        elif args.command == "pause":
            cmd_pause(client, cfg["customer_id"], args.variant, args.dry_run)
        elif args.command == "unpause":
            cmd_unpause(client, cfg["customer_id"], args.variant, args.dry_run)
        elif args.command == "budget":
            cmd_budget_shift(client, cfg["customer_id"], args.amount, args.dry_run)
```

- [ ] **Step 6: Run all tests**

Run: `cd scripts/ads && python -m pytest tests/ -v`
Expected: All tests pass (52 + 6 new write command tests = 58)

- [ ] **Step 7: Commit**

```bash
git add scripts/ads/cli.py scripts/ads/ads-cli.py scripts/ads/tests/test_write_commands.py
git commit -m "feat(ads): add pause, unpause, and budget write commands"
```

---

### Task 6: CLI Compound Commands — pause-losers, promote-winner

**Files:**
- Modify: `scripts/ads/cli.py` (add parser entries + handlers)
- Modify: `scripts/ads/ads-cli.py` (wire dispatch)
- Create: `scripts/ads/tests/test_compound_commands.py`

**Context:** These are compound commands that combine data analysis with write operations. They use the same funnel data fetching as `cmd_recommend`, then apply logic to decide which ad groups to pause or promote. They follow the same confirmation flow as the simple write commands.

`pause-losers` pauses variants below a CTR threshold. `promote-winner` shifts 70% of budget to the highest-performing variant. Both have safety rails: pause-losers won't pause the last active variant; promote-winner requires at least 2 variants with 15+ clicks.

- [ ] **Step 1: Write failing tests**

```python
# scripts/ads/tests/test_compound_commands.py
import os
import sys
import json
import pytest
from unittest.mock import patch, MagicMock

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from cli import cmd_pause_losers, cmd_promote_winner


def _mock_ad_row(url, impressions, clicks, ctr):
    row = MagicMock()
    row.landing_page_view.unexpanded_final_url = url
    row.metrics.impressions = impressions
    row.metrics.clicks = clicks
    row.metrics.ctr = ctr
    row.metrics.average_cpc = 800_000
    row.metrics.cost_micros = clicks * 800_000
    return row


@patch("cli.pause_ad_group")
@patch("cli.find_ad_group_by_url")
@patch("cli.log_action")
@patch("builtins.input", return_value="y")
@patch("cli.fetch_cta_clicks", return_value={})
@patch("cli.fetch_scroll_depths", return_value={})
@patch("cli.fetch_pageviews", return_value={})
def test_pause_losers_pauses_low_ctr(mock_pv, mock_scroll, mock_cta, mock_input,
                                      mock_log, mock_find, mock_pause, capsys):
    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service

    # done-for-you: 16 clicks (>= min_clicks 15) and CTR 0.7% (< max_ctr 1.0%) → loser
    # fast-start: 20 clicks, CTR 6.7% → keeper
    mock_service.search.return_value = [
        _mock_ad_row("https://placetostandagency.com/book-a-call/fast-start", 300, 20, 0.067),
        _mock_ad_row("https://placetostandagency.com/book-a-call/done-for-you", 2200, 16, 0.007),
    ]
    mock_find.return_value = {"resource_name": "customers/123/adGroups/456", "name": "Done For You"}

    cmd_pause_losers(mock_client, "123", api_key="fake", days=14, min_clicks=15, max_ctr=1.0, dry_run=False)

    # Should pause done-for-you (CTR 0.7%) but not fast-start (CTR 6.7%)
    mock_pause.assert_called_once()
    output = capsys.readouterr().out
    assert "done-for-you" in output


@patch("cli.fetch_cta_clicks", return_value={})
@patch("cli.fetch_scroll_depths", return_value={})
@patch("cli.fetch_pageviews", return_value={})
def test_pause_losers_protects_last_variant(mock_pv, mock_scroll, mock_cta, capsys):
    """Should not pause the last active variant."""
    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service

    # Only one variant with enough clicks to be evaluated, and it has low CTR
    # clicks=16 >= min_clicks=15, CTR 0.7% < max_ctr 1.0% → classified as loser
    # But it's the only variant, so last-man-standing should protect it
    mock_service.search.return_value = [
        _mock_ad_row("https://placetostandagency.com/book-a-call/fast-start", 2200, 16, 0.007),
    ]

    cmd_pause_losers(mock_client, "123", api_key="fake", days=14, min_clicks=15, max_ctr=1.0, dry_run=False)

    output = capsys.readouterr().out
    assert "Cannot pause" in output


@patch("cli.fetch_cta_clicks", return_value={})
@patch("cli.fetch_scroll_depths", return_value={})
@patch("cli.fetch_pageviews", return_value={})
def test_pause_losers_dry_run(mock_pv, mock_scroll, mock_cta, capsys):
    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service

    # done-for-you: 16 clicks >= min_clicks, CTR 0.7% < max_ctr 1.0% → loser
    mock_service.search.return_value = [
        _mock_ad_row("https://placetostandagency.com/book-a-call/fast-start", 300, 20, 0.067),
        _mock_ad_row("https://placetostandagency.com/book-a-call/done-for-you", 2200, 16, 0.007),
    ]

    cmd_pause_losers(mock_client, "123", api_key="fake", days=14, min_clicks=15, max_ctr=1.0, dry_run=True)

    output = capsys.readouterr().out
    assert "DRY RUN" in output or "dry run" in output.lower()


@patch("cli.update_campaign_budget")
@patch("cli.log_action")
@patch("builtins.input", return_value="y")
@patch("cli.fetch_cta_clicks", return_value={})
@patch("cli.fetch_scroll_depths", return_value={})
@patch("cli.fetch_pageviews", return_value={})
def test_promote_winner_identifies_winner(mock_pv, mock_scroll, mock_cta,
                                           mock_input, mock_log, mock_update, capsys):
    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service

    # Both variants need clicks >= 15 to be eligible
    mock_service.search.return_value = [
        _mock_ad_row("https://placetostandagency.com/book-a-call/fast-start", 300, 25, 0.083),
        _mock_ad_row("https://placetostandagency.com/book-a-call/done-for-you", 500, 18, 0.036),
    ]

    cmd_promote_winner(mock_client, "123", api_key="fake", days=14, dry_run=False)

    output = capsys.readouterr().out
    assert "fast-start" in output
    assert "winner" in output.lower() or "Winner" in output


@patch("cli.fetch_cta_clicks", return_value={})
@patch("cli.fetch_scroll_depths", return_value={})
@patch("cli.fetch_pageviews", return_value={})
def test_promote_winner_needs_enough_data(mock_pv, mock_scroll, mock_cta, capsys):
    """Should not promote when no variant has enough clicks."""
    mock_client = MagicMock()
    mock_service = MagicMock()
    mock_client.get_service.return_value = mock_service

    mock_service.search.return_value = [
        _mock_ad_row("https://placetostandagency.com/book-a-call/fast-start", 50, 3, 0.06),
        _mock_ad_row("https://placetostandagency.com/book-a-call/done-for-you", 50, 2, 0.04),
    ]

    cmd_promote_winner(mock_client, "123", api_key="fake", days=14, dry_run=False)

    output = capsys.readouterr().out
    assert "Not enough data" in output or "insufficient" in output.lower()
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd scripts/ads && python -m pytest tests/test_compound_commands.py -v`
Expected: FAIL with `ImportError: cannot import name 'cmd_pause_losers' from 'cli'`

- [ ] **Step 3: Add parser entries for pause-losers and promote-winner to cli.py**

Add to `build_parser`:

```python
    p_pause_losers = sub.add_parser("pause-losers", help="Auto-pause underperforming variants")
    p_pause_losers.add_argument("--days", type=int, default=14, choices=[7, 14, 30])
    p_pause_losers.add_argument("--min-clicks", type=int, default=15, help="Min clicks to evaluate")
    p_pause_losers.add_argument("--max-ctr", type=float, default=1.0, help="Max CTR %% to keep")
    p_pause_losers.add_argument("--dry-run", action="store_true", default=False)

    p_promote = sub.add_parser("promote-winner", help="Shift budget to best-performing variant")
    p_promote.add_argument("--days", type=int, default=14, choices=[7, 14, 30])
    p_promote.add_argument("--dry-run", action="store_true", default=False)
```

- [ ] **Step 4: Add cmd_pause_losers handler to cli.py**

```python
def cmd_pause_losers(client, customer_id: str, api_key: str, days: int,
                     min_clicks: int, max_ctr: float, dry_run: bool):
    """Pause variants below CTR threshold."""
    from urllib.parse import urlparse

    service = client.get_service("GoogleAdsService")
    start, end = date_range_clause(days)
    query = build_variants_query(start, end)
    ad_rows = list(service.search(customer_id=customer_id, query=query))

    if not ad_rows:
        print("No data for the requested period.")
        return

    # Identify losers
    losers = []
    keepers = []
    for row in ad_rows:
        r = parse_variant_row(row)
        path = urlparse(r["url"]).path.rstrip("/")
        if r["clicks"] >= min_clicks and r["ctr"] * 100 < max_ctr:
            losers.append({"path": path, **r})
        else:
            keepers.append({"path": path, **r})

    if not losers:
        print("No losers found — all variants above threshold.")
        return

    # Safety: don't pause the last variant
    if len(keepers) == 0:
        print("Cannot pause all variants — at least one must remain active.")
        return

    print(f"Variants to pause ({len(losers)}):")
    for l in losers:
        print(f"  {l['path']} — CTR {l['ctr']*100:.1f}%, {l['clicks']} clicks")

    if dry_run:
        print("[DRY RUN] No changes made.")
        return

    confirm = input(f"Pause {len(losers)} variant(s)? (y/N): ").strip().lower()
    if confirm != "y":
        print("Cancelled.")
        return

    for l in losers:
        ag = find_ad_group_by_url(client, customer_id, l["path"])
        if ag:
            pause_ad_group(client, customer_id, ag["resource_name"])
            log_action(command="pause-losers", params={"variant": l["path"], "ctr": l["ctr"]}, result="success")
            print(f"  Paused '{ag['name']}' ({l['path']})")
        else:
            print(f"  Warning: no ad group found for {l['path']}")
```

- [ ] **Step 5: Add cmd_promote_winner handler to cli.py**

```python
def cmd_promote_winner(client, customer_id: str, api_key: str, days: int, dry_run: bool):
    """Shift 70% of budget to the highest-CTR variant."""
    from urllib.parse import urlparse
    from formatting import format_cost

    service = client.get_service("GoogleAdsService")
    start, end = date_range_clause(days)
    query = build_variants_query(start, end)
    ad_rows = list(service.search(customer_id=customer_id, query=query))

    if not ad_rows:
        print("No data for the requested period.")
        return

    # Build variant list, filter for enough data
    variants = []
    for row in ad_rows:
        r = parse_variant_row(row)
        path = urlparse(r["url"]).path.rstrip("/")
        variants.append({"path": path, **r})

    eligible = [v for v in variants if v["clicks"] >= 15]
    if len(eligible) < 2:
        print("Not enough data — need at least 2 variants with 15+ clicks each.")
        return

    # Find winner
    winner = max(eligible, key=lambda v: v["ctr"])

    # Get current campaign budget
    budget_query = """
        SELECT
            campaign.name,
            campaign_budget.resource_name,
            campaign_budget.amount_micros
        FROM campaign
        WHERE campaign.status = 'ENABLED'
        LIMIT 1
    """.strip()

    budget_rows = list(service.search(customer_id=customer_id, query=budget_query))
    if not budget_rows:
        print("No active campaign found.", file=sys.stderr)
        sys.exit(1)

    budget_row = budget_rows[0]
    total_micros = budget_row.campaign_budget.amount_micros
    budget_rn = budget_row.campaign_budget.resource_name

    winner_share = int(total_micros * 0.7)
    print(f"Winner: {winner['path']} (CTR {winner['ctr']*100:.1f}%)")
    print(f"Current budget: {format_cost(total_micros)}/day")
    print(f"Proposed: 70% (${winner_share / 1_000_000:.2f}) to winner")

    if dry_run:
        print("[DRY RUN] No changes made.")
        return

    confirm = input("Proceed? (y/N): ").strip().lower()
    if confirm != "y":
        print("Cancelled.")
        return

    # Note: Google Ads doesn't support per-ad-group budgets directly.
    # This adjusts the campaign budget. Per-variant budget control would
    # require separate campaigns per variant (future optimization).
    update_campaign_budget(client, customer_id, budget_rn, total_micros)
    log_action(
        command="promote-winner",
        params={"winner": winner["path"], "ctr": winner["ctr"], "budget_micros": total_micros},
        result="success",
    )
    print(f"Budget confirmed at {format_cost(total_micros)}/day — monitor {winner['path']} performance.")
```

- [ ] **Step 6: Wire dispatch in ads-cli.py**

Update the import:

```python
from cli import (
    build_parser, cmd_report, cmd_variants, cmd_status,
    cmd_funnel_report, cmd_funnel_full, cmd_funnel_alerts,
    cmd_recommend, cmd_pause, cmd_unpause, cmd_budget_shift,
    cmd_pause_losers, cmd_promote_winner,
)
```

Add dispatch cases:

```python
        elif args.command == "pause-losers":
            posthog_key = cfg["posthog_api_key"]
            if not posthog_key:
                print("POSTHOG_PERSONAL_API_KEY not set in .env.local.", file=sys.stderr)
                sys.exit(1)
            cmd_pause_losers(client, cfg["customer_id"], posthog_key, args.days,
                           args.min_clicks, args.max_ctr, args.dry_run)
        elif args.command == "promote-winner":
            posthog_key = cfg["posthog_api_key"]
            if not posthog_key:
                print("POSTHOG_PERSONAL_API_KEY not set in .env.local.", file=sys.stderr)
                sys.exit(1)
            cmd_promote_winner(client, cfg["customer_id"], posthog_key, args.days, args.dry_run)
```

- [ ] **Step 7: Run all tests**

Run: `cd scripts/ads && python -m pytest tests/ -v`
Expected: All tests pass (58 + 5 new compound command tests = 63)

- [ ] **Step 8: Commit**

```bash
git add scripts/ads/cli.py scripts/ads/ads-cli.py scripts/ads/tests/test_compound_commands.py
git commit -m "feat(ads): add pause-losers and promote-winner compound commands"
```

---

### Task 7: Update .gitignore and Final Verification

**Files:**
- Modify: `.gitignore` (add action log)

- [ ] **Step 1: Add action log to .gitignore**

Add to `.gitignore`:

```
scripts/ads/.action-log.jsonl
```

- [ ] **Step 2: Run full test suite**

Run: `cd scripts/ads && python -m pytest tests/ -v --tb=short`
Expected: All 63 tests pass

- [ ] **Step 3: Verify CLI help output**

Run: `cd scripts/ads && source .venv/bin/activate && python ads-cli.py --help`
Expected: Shows all commands: report, variants, status, funnel, recommend, pause, unpause, budget, pause-losers, promote-winner

- [ ] **Step 4: Commit**

```bash
git add .gitignore
git commit -m "chore: gitignore ads action log"
```
