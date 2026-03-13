"""PostHog REST API client for funnel data."""

from collections import defaultdict
from urllib.parse import urlencode
import json
import requests

POSTHOG_BASE = "https://us.posthog.com"


def _fetch_events(api_key: str, event: str, properties: list[dict], after: str) -> list[dict]:
    """Fetch all events matching filters, handling pagination."""
    params = {
        "event": event,
        "properties": json.dumps(properties),
        "after": after,
        "limit": 10000,
    }
    url = f"{POSTHOG_BASE}/api/projects/@current/events/?{urlencode(params)}"
    headers = {"Authorization": f"Bearer {api_key}"}

    all_events = []
    while url:
        resp = requests.get(url, headers=headers)
        resp.raise_for_status()
        data = resp.json()
        all_events.extend(data.get("results", []))
        url = data.get("next")

    return all_events


def fetch_pageviews(api_key: str, after: str) -> dict[str, int]:
    """Return {path: count} for /book-a-call/ pageviews."""
    props = [{"key": "$pathname", "value": "/book-a-call/", "operator": "icontains"}]
    events = _fetch_events(api_key, "$pageview", props, after)

    counts: dict[str, int] = defaultdict(int)
    for e in events:
        path = e.get("properties", {}).get("$pathname", "")
        if path:
            counts[path.rstrip("/")] += 1
    return dict(counts)


def fetch_scroll_depths(api_key: str, after: str) -> dict[str, dict[int, int]]:
    """Return {path: {depth: count}} for scroll_depth events."""
    props = [{"key": "path", "value": "/book-a-call/", "operator": "icontains"}]
    events = _fetch_events(api_key, "scroll_depth", props, after)

    counts: dict[str, dict[int, int]] = defaultdict(lambda: defaultdict(int))
    for e in events:
        p = e.get("properties", {})
        path = p.get("path", "").rstrip("/")
        depth = p.get("depth", 0)
        if path and depth:
            counts[path][depth] += 1
    return {k: dict(v) for k, v in counts.items()}


def fetch_cta_clicks(api_key: str, after: str) -> dict[str, int]:
    """Return {path: count} for CTA link clicks on /book-a-call/ pages."""
    props = [
        {"key": "$pathname", "value": "/book-a-call/", "operator": "icontains"},
        {"key": "tag_name", "value": "a", "operator": "exact"},
    ]
    events = _fetch_events(api_key, "$autocapture", props, after)

    counts: dict[str, int] = defaultdict(int)
    for e in events:
        path = e.get("properties", {}).get("$pathname", "").rstrip("/")
        if path:
            counts[path] += 1
    return dict(counts)


def aggregate_by_path(
    pageviews: dict[str, int],
    scrolls: dict[str, dict[int, int]],
    clicks: dict[str, int],
) -> list[dict]:
    """Combine all PostHog data into per-path rows for display."""
    all_paths = sorted(set(pageviews) | set(scrolls) | set(clicks))
    rows = []
    for path in all_paths:
        pv = pageviews.get(path, 0)
        s = scrolls.get(path, {})
        cta = clicks.get(path, 0)
        dropoff = f"{(pv - cta) / pv * 100:.1f}%" if pv > 0 else "N/A"
        rows.append({
            "path": path,
            "pageviews": pv,
            "scroll_25": s.get(25, 0),
            "scroll_50": s.get(50, 0),
            "scroll_75": s.get(75, 0),
            "scroll_100": s.get(100, 0),
            "cta_clicks": cta,
            "dropoff": dropoff,
        })
    return rows
