"""Date range and display formatting helpers for the ads CLI."""

from datetime import date, timedelta


def date_range_clause(days: int, today: date | None = None) -> tuple[str, str]:
    """Return (start_date, end_date) as YYYY-MM-DD strings for GAQL BETWEEN."""
    if today is None:
        today = date.today()
    start = today - timedelta(days=days)
    return start.isoformat(), today.isoformat()


def format_cost(micros: int) -> str:
    """Convert cost_micros to $X.XX string."""
    return f"${micros / 1_000_000:.2f}"


def format_ctr(fraction: float) -> str:
    """Convert CTR fraction (e.g. 0.038) to percentage string."""
    return f"{fraction * 100:.1f}%"


def format_cpc(micros: int) -> str:
    """Convert average_cpc micros to $X.XX string."""
    return f"${micros / 1_000_000:.2f}"
