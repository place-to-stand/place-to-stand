"""Google Ads GAQL query builders and row parsers."""


def build_report_query(start_date: str, end_date: str) -> str:
    return f"""
        SELECT
            campaign.name,
            campaign.status,
            metrics.impressions,
            metrics.clicks,
            metrics.ctr,
            metrics.average_cpc,
            metrics.cost_micros,
            metrics.conversions
        FROM campaign
        WHERE segments.date BETWEEN '{start_date}' AND '{end_date}'
        ORDER BY metrics.impressions DESC
    """.strip()


def build_variants_query(start_date: str, end_date: str) -> str:
    return f"""
        SELECT
            landing_page_view.unexpanded_final_url,
            metrics.impressions,
            metrics.clicks,
            metrics.ctr,
            metrics.average_cpc,
            metrics.cost_micros
        FROM landing_page_view
        WHERE segments.date BETWEEN '{start_date}' AND '{end_date}'
        ORDER BY metrics.clicks DESC
    """.strip()


def build_status_queries(today: str) -> tuple[str, str]:
    today_query = f"""
        SELECT
            customer.descriptive_name,
            customer.id,
            metrics.impressions,
            metrics.clicks,
            metrics.cost_micros
        FROM customer
        WHERE segments.date = '{today}'
    """.strip()

    campaigns_query = """
        SELECT campaign.name
        FROM campaign
        WHERE campaign.status = 'ENABLED'
    """.strip()

    return today_query, campaigns_query


def parse_campaign_row(row) -> dict:
    """Extract fields from a Google Ads campaign report row."""
    return {
        "campaign": row.campaign.name,
        "status": row.campaign.status.name,
        "impressions": row.metrics.impressions,
        "clicks": row.metrics.clicks,
        "ctr": row.metrics.ctr,
        "average_cpc": row.metrics.average_cpc,
        "cost_micros": row.metrics.cost_micros,
        "conversions": row.metrics.conversions,
    }


def parse_variant_row(row) -> dict:
    """Extract fields from a Google Ads landing page view row."""
    return {
        "url": row.landing_page_view.unexpanded_final_url,
        "impressions": row.metrics.impressions,
        "clicks": row.metrics.clicks,
        "ctr": row.metrics.ctr,
        "average_cpc": row.metrics.average_cpc,
        "cost_micros": row.metrics.cost_micros,
    }
