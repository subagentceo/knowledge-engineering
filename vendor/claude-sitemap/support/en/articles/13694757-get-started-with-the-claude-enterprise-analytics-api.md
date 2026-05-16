The Analytics API gives Enterprise plan Primary Owners programmatic access to engagement, adoption, usage, and cost data for their organization. Use it to build internal dashboards, track adoption trends, reconcile spend against your monthly bill, and feed Claude data into your existing reporting tools.

The Analytics API is available on Enterprise plans. Primary Owners can generate API keys to get started.

## How is this different from the analytics dashboard and Compliance API?

All three options give you different views into your organization's data:

The **Analytics dashboard** (accessed via **[Analytics](https://claude.ai/analytics/activity)**) shows visualized usage data in the product. It's the right tool for day-to-day monitoring when you don't need to integrate data elsewhere.

The **Analytics API** returns the same aggregated metrics, but programmatically — so you can pull them into BI tools, map them against org charts, automate reporting workflows, and reconcile cost data against internal records. Engagement and adoption data is aggregated per organization, per day. Usage and cost data is available with finer-grained per-user and time-bucketed breakdowns.

The **Compliance API** is for governance and auditing use cases. It gives you access to individual user actions, raw activity events, and conversation content. If you need aggregated engagement metrics for dashboards, rather than raw events for auditing, use the Analytics API.

---

## Get started

To access the Analytics API, you need Primary Owner access to your Enterprise organization.

Follow these steps:

1. Navigate to **[Analytics > API keys](http://claude.ai/analytics/api-keys)**.

2. Find the **Access** toggle under **Analytics API** and toggle it on.

3. Click “+ Create key” to generate a new API key. Keep this key private—treat it like a password.

4. Use the key with the `x-api-key` header in your requests.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2053687376/dac20c85f3d3fcab64c98fee0d1c/c0af2448-7bfb-4d10-b474-025cb4f04f59?expires=1778907600&amp;signature=6133671cda41a600c82778900dbe4421cd059f5143b1bf76ac7600a064f8942d&amp;req=diAiFc92moJYX%2FMW1HO4zUxhx6VM2qyJ2G8yJDINvfT3xHR9m%2B9sCZUAHVUe%0AapteXjJUn2U3PzMjPe4%3D%0A)

For full authentication details, endpoint references, and code examples, refer to our **[Claude Enterprise Analytics API reference guide](https://support.claude.com/en/articles/13703965-claude-enterprise-analytics-api-reference-guide)**.

---

## What data is available?

The Analytics API includes nine endpoints across two categories.

### Engagement and adoption

These endpoints return aggregated engagement metrics, per organization, per day. Data is available for up to the past 90 days (not before January 1, 2026).

- **User activity:** Per-user engagement metrics across Claude surfaces. Includes conversation counts, messages sent, projects created, files uploaded, artifacts created, skills used, connectors used, Claude Code metrics like commits, pull requests, and lines of code, and Cowork metrics like sessions started, tool actions, dispatch turns, and skill and connector invocations.

- **Activity summary:** Organization-wide daily, weekly, and monthly active user counts across Claude, Claude Code, and Cowork, along with seat utilization and pending invite counts. Supports date ranges up to 31 days per request.

- **Chat project usage:** Conversation and user counts broken down by project, for Claude projects.

- **Skill usage:** How many users are using each skill, with breakdowns for Claude, Claude Code, and Cowork sessions separately.

- **Connector usage:** Which connectors your organization is using and how many unique users have used each one, with breakdowns for Claude, Claude Code, and Cowork sessions separately.

### Usage and cost

**Note:** Cost and usage endpoints apply to usage-based Enterprise plans. For seat-based Enterprise plans, these endpoints will reflect extra usage only.

These endpoints (available now in beta) return token usage and USD cost data across Claude surfaces. Use them to track usage between monthly invoices, reconcile Anthropic billing against internal cost centers, and inform spend limits based on actual user behavior.

- **Per-user token usage:** Users ranked by token usage across a date range, with optional breakdowns by product, model, context window, inference region, or speed.

- **Per-user cost:** Users ranked by USD spend across a date range, with optional breakdowns by product, model, cost type (tokens, web search, code execution), or token type.

- **Token usage over time:** Token usage bucketed by minute, hour, or day, optionally broken down by product, model, context window, inference region, or speed.

- **Cost over time:** USD cost bucketed by minute, hour, or day, with the same grouping options plus cost type and token type.

Data is refreshed every four hours, and may take up to 24 hours. Values can be revised for up to 30 days as late events reconcile, so for invoicing-grade totals, query dates at least 30 days in the past.

---

## Data limits

Engagement and adoption endpoints return data for a single date or date range. **Data is only available after January 1, 2026**, and for dates more than three days ago.

Usage and cost endpoints let you query up to a 31-day window, going back as far as 365 days from today. For invoicing-grade totals, query dates at least 30 days in the past so late events have time to reconcile.

The API has a default rate limit of 60 requests per minute. If this doesn't meet your organization's needs, reach out to your Anthropic Contact or our **[Sales team](https://claude.com/contact-sales)**.

**Important:** If you are using Claude Code via **[Amazon Bedrock](https://support.claude.com/en/collections/4078537-amazon-bedrock)**, the Analytics API will not return data related to Claude Code.