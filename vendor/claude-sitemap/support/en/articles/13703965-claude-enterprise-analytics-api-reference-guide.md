## Overview

The Claude Enterprise Analytics API gives your organization programmatic access to engagement, adoption, usage, and cost data across Claude surfaces within your Enterprise organization. Whether you're building internal dashboards for user activity, tracking adoption of projects, reconciling spend against your monthly bill, or informing spend limits, this API provides the metrics you need.

## Data aggregation

All data is aggregated **per organization, per day**. Each endpoint returns a snapshot for a single date that you specify. **Data for day (N-1) is run at 10:00:00 UTC time on day N**, and is available for querying three days after aggregation, to ensure accuracy of data.

If data is not available within the timeline above, this usually indicates a data pipeline failure that our team will need to investigate internally. We are usually aware of such problems, but please raise this to your CSM if you want a gut check, or suspect something else.

The cost and usage endpoints have a different freshness model. See **[Cost and usage endpoints](#h_1206b7d42a)** below for details.

## Enabling access

In order to mint new analytics API keys, you must be a Primary Owner within your Enterprise organization. You can do so by navigating to **[claude.ai/analytics/api-keys](http://claude.ai/analytics/api-keys)**.

Some more details that might be helpful:

- You can *enable/disable* access to the public API anytime. If you disable access by toggling the switch off, all requests will be denied.

- You’ll need a key with the `read:analytics` scope in order to access the API. You can create multiple keys for your organization, but rate limits apply at the *organization* level, not the *key* level. See the “Rate limiting” section below.

- As always, *we strongly recommend handling API keys securely*: *never* share these keys publicly - they are secret, and should be shared securely.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2053655566/6858d308d21c1d082cf67cdabd3b/19fadcdf-25f5-491d-a060-887da34b1082?expires=1781304300&amp;signature=363a41a366d52bf031f10c44d8b5557c9c4118222784f1e027d3ff211ad5b775&amp;req=diAiFc97mIRZX%2FMW1HO4zXfNT1gDchLYFbDaBcaxqj4ymkse0vTOdBxK9OeD%0AA%2B6s8YAWQpdIQCUokp8%3D%0A)

## Base URL

All requests are sent to:

```
https://api.anthropic.com/v1/organizations/analytics/
```

## Authentication

Every request requires an API key passed in the `x-api-key` header. Your API key must have the `read:analytics` scope. You can create and manage API keys from the claude.ai admin settings under the API Keys section.

**Example request headers:**

```
x-api-key: $YOUR_API_KEY
```

## Pagination

Several endpoints return paginated results. Pagination uses a cursor-based approach, where the response includes a `next_page` token you pass back in your next request to retrieve the following page of results.

Two optional parameters control pagination:

**limit** (integer): Number of records per page. Defaults to 20 for the /users endpoint and 100 for all other endpoints. For cost and usage endpoints, defaults vary by endpoint and bucket width — see **[Cost and usage endpoints](#h_1206b7d42a)** below. The maximum is 1000.

**page** (string): The opaque cursor token from the previous response's `next_page` field. Omit this on your first request.

When there are no more results, `next_page` will be `null` in the response.

**Important:** Do not change query parameters mid-sequence on cost and usage endpoints. Cursors are bound to the filters and date range that issued them. If you change `products[]`, `order_by`, `group_by[]`, the date range, or any filter and pass an old cursor, you'll get a 400 error.

## Error responses

All endpoints return standard HTTP error codes:

| **Code** | **Meaning** |
| --- | --- |
| 400 | A query parameter is invalid. Common causes include an invalid date, a date before 1/1/26 (first availability), a date that is today or in the future, or (on cost and usage endpoints) a page cursor that doesn't match current query parameters. |
| 401 | Missing or invalid API key (cost and usage endpoints). |
| 404 | The API key is missing, invalid, or does not have the `read:analytics` scope. |
| 410 | The page cursor is no longer valid. Restart pagination from the first page. |
| 429 | Rate limit exceeded. Too many requests. |
| 500 | Internal error (cost and usage endpoints). |
| 504 | Request timed out. |

## Rate limiting

We do have default rate limits in place that apply across all endpoints in this API. If that isn’t sufficient for your use case, we’d love to understand why. If necessary, we can adjust the rate limits for your organization—please reach out to your CSM.

---

## Engagement and adoption endpoints

### 1. List user activity

`GET /v1/organizations/analytics/users`

Returns per-user engagement metrics for a single day. Each item in the response represents one user and includes their activity counts across Claude (chat) and Claude Code.

**Query parameters**

| **Field** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| `date` | string | Yes | The date to retrieve metrics for, in YYYY-MM-DD format. |
| `limit` | integer | No | Number of records per page (default: 20, max: 1000). |
| `page` | string | No | Cursor token from a previous response's `next_page` field for retrieving the next page. |

**Response fields (per user)**

| **Field** | **Description** |
| --- | --- |
| `user.id` | Unique identifier for the user. |
| `user.email_address` | The user's email address. |
| `chat_metrics.distinct_conversation_count` | Number of distinct conversations, specifically within Claude.ai. |
| `chat_metrics.message_count` | Total messages sent, specifically within Claude.ai. |
| `chat_metrics.distinct_projects_created_count` | Number of distinct projects created, specifically within Claude.ai. |
| `chat_metrics.distinct_projects_used_count` | Number of distinct projects used, specifically within Claude.ai. |
| `chat_metrics.distinct_files_uploaded_count` | Number of distinct files uploaded, specifically within Claude.ai. |
| `chat_metrics.distinct_artifacts_created_count` | Number of distinct artifacts created, specifically within Claude.ai. |
| `chat_metrics.distinct_shared_artifacts_viewed_count` | Number of distinct shared artifacts viewed, specifically within Claude.ai. |
| `chat_metrics.thinking_message_count` | Number of thinking (extended) messages, specifically within Claude.ai. |
| `chat_metrics.distinct_skills_used_count` | Number of distinct skills used, specifically within Claude.ai. |
| `chat_metrics.connectors_used_count` | Total number of connectors invoked, specifically within Claude.ai. |
| `chat_metrics.shared_conversations_viewed_count` | Number of shared conversations viewed, specifically within Claude.ai. |
| `claude_code_metrics.core_metrics.commit_count` | Number of git commits made via Claude Code. |
| `claude_code_metrics.core_metrics.pull_request_count` | Number of pull requests created via Claude Code. |
| `claude_code_metrics.core_metrics.lines_of_code.added_count` | Total lines of code added. |
| `claude_code_metrics.core_metrics.lines_of_code.removed_count` | Total lines of code removed. |
| `claude_code_metrics.core_metrics.distinct_session_count` | Number of distinct Claude Code sessions. |
| `claude_code_metrics.tool_actions.edit_tool` | Accepted and rejected counts for the Edit tool. |
| `claude_code_metrics.tool_actions.multi_edit_tool` | Accepted and rejected counts for the Multi-Edit tool. |
| `claude_code_metrics.tool_actions.write_tool` | Accepted and rejected counts for the Write tool. |
| `claude_code_metrics.tool_actions.notebook_edit_tool` | Accepted and rejected counts for the Notebook Edit tool. |
| `web_search_count` | Total of web search tool invocations. This applies to both [claude.ai](http://claude.ai) and claude code usage within your organization. |

**Office Agent metrics (per user)**

Each user record also includes an `office_metrics` object with per-product breakdowns for Excel, PowerPoint, Word, and Outlook. This block is always present on every record—organizations without Office Agent usage see all-zero values rather than null.

The office_metrics object contains four keys: `excel`, `powerpoint`, `word`, and `outlook`. Each key contains the same six fields:

| **Field** | **Description** |
| --- | --- |
| `office_metrics.[product].distinct_session_count*` | Number of distinct Office Agent sessions. |
| `office_metrics.[product].message_count` | Number of messages sent (one per completed agent turn). |
| `office_metrics.[product].skills_used_count` | Total skill invocations. A single skill used five times counts as five. |
| `office_metrics.[product].distinct_skills_used_count` | Number of distinct skills used. |
| `office_metrics.[product].connectors_used_count` | Total connector invocations. A single connector used three times counts as three. |
| `office_metrics.[product].distinct_connectors_used_count` | Number of distinct connectors used. |

***Note:** Where `[product]` is one of `excel`, `powerpoint`, `word`, or `outlook`.

**Claude Cowork metrics (per user)**

Each user record also includes a `cowork_metrics` object with per-user Cowork engagement. This block is always present on every record—organizations without Cowork usage see all-zero values rather than null.

| **Field** | **Description** |
| --- | --- |
| `cowork_metrics.distinct_session_count` | Number of distinct Cowork sessions. |
| `cowork_metrics.message_count` | Total user messages sent in Cowork. |
| `cowork_metrics.action_count` | Successful tool calls (Bash, Read, Edit, etc.) |
| `cowork_metrics.dispatch_turn_count` | Completed agent turns in Dispatch (background agent) sessions. |
| `cowork_metrics.skills_used_count` | Total skill invocations. A single skill used five times counts as five. |
| `cowork_metrics.distinct_skills_used_count` | Number of distinct skills used. |
| `cowork_metrics.connectors_used_count` | Total connector invocations. A single connector used three times counts as three. |
| `cowork_metrics.distinct_connectors_used_count` | Number of distinct connectors used. |

**Example request**

```
curl -X GET "https://api.anthropic.com/v1/organizations/analytics/users?date=2025-01-01&limit=3"
   --header "x-api-key: $YOUR_API_KEY"
```

### 2. Activity summary

`GET /v1/organizations/analytics/summaries`

Returns a high-level summary of engagement and seat utilization **per-day** for your organization for a given date range. The response is a list of days with aggregated counts within the date range. Note that the maximum difference between `ending_date` and `starting_date` must be **31 days**, and there is a three-day delay in data availability. This is useful for tracking daily active users, weekly and monthly trends, and seat allocation at a glance.

**We define “active”** if any one of the following is true:

- The user sent at least one chat message on Claude (chat).

- The user had at least one Claude Code (local or remote) session associated with the C4E org, with tool use/git activity

- The user had at least one Claude Cowork session with tool use or message activity.

**Query parameters**

| **Field** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| `starting_date` | string | Yes | The starting date to retrieve data for, in YYYY-MM-DD format. There is a three-day delay in data availability, so the most recent data you can access is from three days ago. |
| `ending_date` | string | No | The optional ending date to retrieve data for, in YYYY-MM-DD format. This is *exclusive*. |

**Response fields**

| **Field** | **Description** |
| --- | --- |
| `starting_date` | First day for which metrics are aggregated, interpreted as a UTC date. There is a three-day delay in data availability, so the most recent data you can access is from three days ago. |
| `ending_date` | Last day (exclusive) for which metrics are aggregated, interpreted as a UTC date |
| `daily_active_user_count` | Number of users active on the specified date (based on token consumption). |
| `weekly_active_user_count` | Number of users active within the 7-day rolling window ending on the specified date. |
| `monthly_active_user_count` | Number of users active within the 30-day rolling window ending on the specified date. |
| `assigned_seat_count` | Total number of seats currently assigned in your organization. |
| `pending_invite_count` | Number of pending invitations that have not yet been accepted. |
| `cowork_daily_active_user_count` | Number of users with ≥1 Cowork session that day |
| `cowork_weekly_active_user_count` | Number of users with ≥1 Cowork session in a rolling 7-day period. |
| `cowork_monthly_active_user_count` | Number of users with ≥1 Cowork session in a rolling 30-day period. |

**Note:** The rolling windows for weekly and monthly counts look backward from the specified date (inclusive). If data is incomplete for some days within the window (for example, if the date is less than 30 days in the past), the monthly count may undercount activity.

**Example request**

```
curl -X GET "https://api.anthropic.com/v1/organizations/analytics/summaries?starting_date=2025-01-01"
   --header "x-api-key: $YOUR_API_KEY"
```

### 3. Chat project usage

`GET /v1/organizations/analytics/apps/chat/projects`

Returns usage data broken down by chat project for a given date. Projects are specific to Claude (chat), so this endpoint focuses on that surface. Each item shows the project name, how many unique users interacted with it, and the total number of conversations held in that project.

**Query parameters**

| **Field** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| `date` | string | Yes | The date to retrieve metrics for, in YYYY-MM-DD format. There is a three-day delay in data availability, so the most recent data you can access is from three days ago. |
| `limit` | integer | No | Number of records per page (default: 100, max: 1000). |
| `page` | string | No | Cursor token from a previous response's `next_page` field for retrieving the next page. |

**Response fields (per project)**

| **Field** | **Description** |
| --- | --- |
| `project_name` | The name of the project. |
| `project_id` | The tagged project id, i.e. “`claude_proj_{ID}`” |
| `distinct_user_count` | Number of unique users who used this project on the given date. |
| `distinct_conversation_count` | Number of conversations in this project on the given date. |
| `message_count` | Total number of messages sent within this project on the given date. |
| `created_at` | The project creation timestamp. |
| `created_by` | `{id, email_address}` of the user who created the project. |

**Example request**

```
curl -X GET "https://api.anthropic.com/v1/organizations/analytics/apps/chat/projects?date=2025-01-01&limit=50"
   --header "x-api-key: $YOUR_API_KEY"
```

### 4. Skill usage

`GET /v1/organizations/analytics/skills`

Returns skill usage data across both Claude (chat) and Claude Code within your organization for a given date. Each item represents a skill and shows how many unique users used it.

**Query parameters**

| **Field** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| `date` | string | Yes | The date to retrieve metrics for, in YYYY-MM-DD format. There is a three-day delay in data availability, so the most recent data you can access is from three days ago. |
| `limit` | integer | No | Number of records per page (default: 100, max: 1000). |
| `page` | string | No | Cursor token from a previous response's `next_page` field for retrieving the next page. |

**Response fields (per skill)**

| **Field** | **Description** |
| --- | --- |
| `skill_name` | The name of the skill. |
| `distinct_user_count` | Number of unique users who used this skill on the given date. |
| `chat_metrics.distinct_conversation_skill_used_count` | Number of distinct conversations in which the skill was used at least once, in chat. |
| `claude_code_metrics.distinct_session_skill_used_count` | Number of distinct remote sessions in which the skill was used at least once, in Claude Code. |

**Office Agent metrics (per skill)**

Each skill record also includes an `office_metrics` object that reports how many Office Agent sessions used the skill, broken down by product. This block is always present—organizations without Office Agent usage see all-zero values.

| **Field** | **Description** |
| --- | --- |
| `office_metrics.excel.distinct_session_skill_used_count` | Number of distinct Office Agent sessions in Excel in which this skill was used. |
| `office_metrics.powerpoint.distinct_session_skill_used_count` | Number of distinct Office Agent sessions in PowerPoint in which this skill was used. |
| `office_metrics.word.distinct_session_skill_used_count` | Number of distinct Office Agent sessions in Word in which this skill was used. |
| `office_metrics.outlook.distinct_session_skill_used_count` | Number of distinct Office Agent sessions in Outlook in which this skill was used. |

**Claude Cowork metrics (per skill)**

Each skill record also includes a `cowork_metrics` object that reports how many Cowork sessions used the skill. This block is always present—organizations without Cowork usage see all-zero values.

| `cowork_metrics.distinct_session_skill_used_count` | Number of distinct Cowork sessions in which this skill was used at least once. |
| --- | --- |

**Example request**

```
curl -X GET "https://api.anthropic.com/v1/organizations/analytics/skills?date=2025-01-01"
   --header "x-api-key: $YOUR_API_KEY"
```

### 5. Connector usage

`GET /v1/organizations/analytics/connectors`

Returns MCP/connector usage data across both Claude (chat) and Claude Code within your organization for a given date. Each item represents a connector and shows how many unique users used it. Connector names are normalized from various sources — for example, "Atlassian MCP server," "mcp-atlassian," and "atlassian_MCP" would all appear as "atlassian."

**Query parameters**

| **Field** | **Type** | **Required** | **Description** |
| --- | --- | --- | --- |
| `date` | string | Yes | The date to retrieve metrics for, in YYYY-MM-DD format. There is a three-day delay in data availability, so the most recent data you can access is from three days ago. |
| `limit` | integer | No | Number of records per page (default: 100, max: 1000). |
| `page` | string | No | Cursor token from a previous response's `next_page` field for retrieving the next page. |

**Response fields (per connector)**

| **Field** | **Description** |
| --- | --- |
| `connector_name` | The normalized name of the connector. |
| `distinct_user_count` | Number of unique users who used this connector on the given date. |
| `chat_metrics.distinct_conversation_connector_used_count` | Number of distinct conversations in which the connector was used at least once, in chat. |
| `claude_code_metrics.distinct_session_connector_used_count` | Number of distinct remote sessions in which the connector was used at least once, in Claude Code. |

**Office Agent metrics (per connector)**

Each connector record also includes an office_metrics object that reports how many Office Agent sessions used the connector, broken down by product. This block is always present—organizations without Office Agent usage see all-zero values.

| **Field** | **Description** |
| --- | --- |
| `office_metrics.excel.distinct_session_connector_used_count` | Number of distinct Office Agent sessions in Excel in which this connector was used. |
| `office_metrics.powerpoint.distinct_session_connector_used_count` | Number of distinct Office Agent sessions in PowerPoint in which this connector was used. |
| `office_metrics.word.distinct_session_connector_used_count` | Number of distinct Office Agent sessions in Word in which this connector was used. |
| `office_metrics.outlook.distinct_session_connector_used_count` | Number of distinct Office Agent sessions in Outlook in which this connector was used. |

**Claude Cowork metrics (per connector)**

Each connector record also includes a `cowork_metrics` object that reports how many Cowork sessions used the connector. This block is always present—organizations without Cowork usage see all-zero values.

| **Field** | **Description** |
| --- | --- |
| `cowork_metrics.distinct_session_connector_used_count` | Number of distinct Cowork sessions in which this connector was used at least once. |

**Example request**

```
curl -X GET "https://api.anthropic.com/v1/organizations/analytics/connectors?date=2025-01-01"
   --header "x-api-key: $YOUR_API_KEY"
```

---

## Cost and usage endpoints

**Note:** Cost and usage endpoints apply to usage-based Enterprise plans. For seat-based Enterprise plans, these endpoints will reflect usage credits only.

The cost and usage endpoints give your organization programmatic access to token and USD cost data for Claude (chat), Claude Code, Cowork, Office Agent, and Claude in Chrome.

There are four endpoints in two shapes:

| **Shape** | **Endpoints** | **Returns** |
| --- | --- | --- |
| **Per-user** (one row per user, sorted) | `user_usage_report`, `user_cost_report` | Users ranked by tokens or spend across a date range. |
| **Bucketed** (one row per time bucket, optionally grouped) | `usage_report`, `cost_report` | Usage or cost over time, broken down by product, model, or other dimensions. |

Use the **per-user** endpoints to answer "who are my top spenders?" Use the **bucketed** endpoints to answer "how is usage trending day over day, broken down by product?"

### Data freshness and finality

Data is typically available within four hours of the underlying usage, but may take up to 24 hours. Each response includes a `data_refreshed_at` timestamp indicating the export the response was served from; usage that occurred after that watermark is not yet reflected.

Values for a given date may be revised for up to 30 days as late events arrive and reconciliation runs. For invoicing-grade totals, query dates at least 30 days in the past.

When ending_at is omitted (the default is "now"), the response will include a tail of data **after** `data_refreshed_at` that is incomplete. For stable results across repeated calls, set `ending_at` to a value at or before a previously returned `data_refreshed_at`.

### Date range limits

`starting_at` may be up to **365 days** in the past, and a single query may span **at most 31 days** (`ending_at` - `starting_at`). To cover a longer period, issue multiple queries with adjacent windows. **No data is available prior to** **2026-01-01**.

### Pagination

All four cost and usage endpoints are paginated with an opaque cursor. The first request returns up to limit rows plus a `next_page` cursor; pass that cursor unchanged as the page parameter on the next request, and repeat until `has_more` is false.

Treat `next_page` as opaque: pass it back unchanged on the next request and send the same query parameters on every page. If a request returns 400 or 410 with a message about the page cursor, discard it and start again from the first page.

**Do not change query parameters mid-sequence.** Cursors are bound to the filters and date range that issued them. If you change `products[]`, `order_by`, `group_by[]`, the date range, or any filter and pass an old cursor, you'll get a 400 error.

### Serializing list parameters

List parameters use bracket notation: repeat the parameter name with [] for each value.

`products[]=chat&products[]=claude_code`

### The Actor object

Each per-user result row identifies the user who generated the usage.

```
{
  "type": "user_actor",
  "user_id": "user_01AbCdEfGh",
  "name": "Jane Smith",
  "email": "jane@example.com"
}
```

| **Field** | **Type** | **Description** |
| --- | --- | --- |
| `type` | string | Always "user_actor". |
| `user_id` | string | The user's ID. Same value accepted by `user_ids[]`. |
| `name` | string or null | The user's name. “Deleted User” if the user was deleted. |
| `email` | string or null | The user's email address. Null when user deleted. |
| `deleted` | boolean | True if the account has been deleted. |

### 6. Per-user token usage

`GET /v1/organizations/analytics/user_usage_report`

Returns per-user **token usage** across a date range, sorted by the chosen token metric.

**Query parameters**

| **Field** | **Type** | **Required** | **Default** | **Description** |
| --- | --- | --- | --- | --- |
| `starting_at` | RFC 3339 datetime | Yes | — | Start of range, inclusive. Floored to the start of the hour in UTC. Must be within the last 365 days. |
| `ending_at` | RFC 3339 datetime | No | now | End of range, exclusive. The range may span at most 31 days. |
| `products[]` | one or more of chat, claude_code, cowork, office_agent, claude_in_chrome,claude_design | No | all seat-based products | Seat-based product surfaces only. Repeat the parameter for multiple values. |
| `models[]` | string, max 100 entries | No | all | Filter to specific model names (e.g., `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-haiku-4-5-20251001`). |
| `user_ids[]` | string, max 100 entries | No | all | Filter to specific users. Useful for looking up a known set of users without paginating the whole organization. |
| `context_windows[]` | one or more of 0-200k, 200k-1M | No | all | Filter to specific context-window pricing tiers. Use `group_by[]=context_window` to break out per-tier values. |
| `inference_geos[]` | one or more of global, us, not_available | No | all | Filter to specific inference regions. not_available matches rows where the region is unset. Use `group_by[]=inference_geo` to break out per-region values. |
| `speeds[]` | one or more of fast, standard | No | all | Filter to fast or standard inference mode. Use `group_by[]=speed` to break out per-mode values. |
| `group_by[]` | one or more of product, model, context_window, inference_geo, speed | No | none | Break each user's row out by the given dimensions. With dimensions present, one user may span several rows. |
| `order_by` | total_tokens, output_tokens, uncached_input_tokens | No | total_tokens | Metric to sort by. |
| `exclude_deleted_users` | boolean | No | false | When true, rows for deleted users are omitted. |
| `order` | desc, asc | No | desc | Sort direction. |
| `limit` | integer 1–1000 | No | 20 | Rows per page. |
| `page` | opaque cursor string | No | — | The `next_page` value from a previous response. |

**Response fields**

| **Field** | **Description** |
| --- | --- |
| `organization_id` | ID of the organization the API key belongs to. |
| `data` | Array of entries, sorted by `order_by` in order direction. |
| `data[].actor` | The Actor object for the user who generated the usage. |
| `data[].product` | When `group_by[]` includes product, the product surface. Otherwise null. |
| `data[].model` | When `group_by[]` includes model, the model name. Otherwise null. |
| `data[].context_window` | When `group_by[]` includes `context_window`, the context tier (0-200k or 200k-1M). Otherwise null. |
| `data[].inference_geo` | When `group_by[]` includes `inference_geo`, the inference region. Otherwise null. |
| `data[].speed` | When `group_by[]` includes `speed: fast` or `standard`. Otherwise null. |
| `data[].uncached_input_tokens` | Input tokens that were not served from the prompt cache. |
| `data[].cache_creation.ephemeral_5m_input_tokens` | Tokens written to the 5-minute prompt cache. |
| `data[].cache_creation.ephemeral_1h_input_tokens` | Tokens written to the 1-hour prompt cache. |
| `data[].cache_read_input_tokens` | Input tokens served from the prompt cache. |
| `data[].output_tokens` | Output tokens generated. |
| `data[].total_tokens` | Sum of all token components above. The default `order_by=total_tokens` sorts on this value. |
| `data[].server_tool_use.web_search_requests` | Number of web search tool calls. |
| `data[].requests` | Number of API requests |
| `has_more` | Whether another page exists. |
| `next_page` | Opaque cursor for the next page; null when `has_more` is false. |
| `data_refreshed_at` | Timestamp of the data export this response was served from. |

**Example request**

```
curl "https://api.anthropic.com/v1/organizations/analytics/user_usage_report?starting_at=2026-03-01T00:00:00Z&products[]=claude_code&order_by=output_tokens&limit=20" \

--header "x-api-key: $YOUR_API_KEY"
```

### 7. Per-user cost

`GET /v1/organizations/analytics/user_cost_report`

Returns per-user **USD cost** across a date range, sorted by discounted or list-price amount.

**Query parameters**

Same as `user_usage_report`, with these differences:

| **Field** | **Type** | **Required** | **Default** | **Description** |
| --- | --- | --- | --- | --- |
| `order_by` | amount, list_amount | No | amount | Metric to sort by. |
| `group_by[]` | one or more of product, model, context_window, inference_geo, speed, cost_type, token_type | No | none | Break each user's row out by the given dimensions. `cost_type` returns one row per cost component (tokens, web search, code execution); `token_type` returns one row per token type. |

All other parameters (`starting_at`, `ending_at`, `products[]`, `models[]`, `user_ids[]`, `order`, `limit`, `page`) are identical.

**Response fields**

| **Field** | **Description** |
| --- | --- |
| `organization_id` | ID of the organization the API key belongs to. |
| `data` | Array of entries, sorted by `order_by` in order direction. |
| `data[].actor` | The Actor object for the user who generated the cost. |
| `data[].product, data[].model`, `data[].context_window`, `data[].inference_geo`, `data[].speed` | When the corresponding `group_by[]` value is set, the dimension value. Otherwise null. |
| `data[].currency` | Always "USD". |
| `data[].amount` | Amount in fractional cents —raw consumption cost after negotiated discounts. For example, "41280.000000" is $412.80. The value is summed across all products in the `products[]` filter. |
| `data[].list_amount` | List-price amount (pre-discount) in fractional cents, same format. |
| `data[].cost_type` | When `group_by[]` includes `cost_type:` one of `tokens`, `web_search`, `code_execution`. null when not set. |
| `data[].token_type` | When `group_by[]` includes `token_type:` one of `uncached_input_tokens`, `output_tokens`, `cache_read_input_tokens`, `cache_creation.ephemeral_5m_input_tokens`, `cache_creation.ephemeral_1h_input_tokens`. Only non-null on rows where `cost_type` is tokens. |
| `data[].requests` | Number of API requests |
| `has_more` | Whether another page exists. |
| `next_page` | Opaque cursor for the next page. |
| `data_refreshed_at` | Timestamp of the data export this response was served from. |

**Parsing amounts**

amount and list_amount are decimal strings denominated in cents. "41280.000000" represents 41,280 cents (US $412.80). To convert to dollars, parse as a decimal and divide by 100. Avoid binary floating-point parsing for values that may exceed several million dollars.

**Example request**

```
curl "https://api.anthropic.com/v1/organizations/analytics/user_cost_report?starting_at=2026-03-01T00:00:00Z&order_by=amount&limit=20" \

--header "x-api-key: $YOUR_API_KEY"
```

### 8. Token usage over time

`GET /v1/organizations/analytics/usage_report`

Returns **token usage over time**, bucketed by minute, hour, or day, optionally broken down by product, model, context window, inference region, or speed.

**Query parameters**

| **Field** | **Type** | **Required** | **Default** | **Description** |
| --- | --- | --- | --- | --- |
| `starting_at` | RFC 3339 datetime | Yes | — | Start of range, inclusive. Must be within the last 365 days. Floored to the nearest `bucket_width` boundary in UTC. |
| `ending_at` | RFC 3339 datetime | No | now | End of range, exclusive. The range may span at most 31 days. Floored to the nearest `bucket_width` boundary in UTC. |
| `bucket_width` | 1m, 1h, 1d | No | 1d | Time bucket granularity: minute, hour, or day. |
| `group_by[]` | one or more of product, model, context_window, inference_geo, speed | No | none | Dimensions to break down within each bucket. Omit for a single aggregate per bucket. |
| `products[]` | one or more of chat, claude_code, cowork, office_agent, claude_in_chrome,claude_design | No | all | Filter to specific product surfaces. |
| `models[]` | string, max 100 entries | No | all | Filter to specific model names. |
| `context_windows[]` | one or more of 0-200k, 200k-1M | No | all | Filter to specific context-window pricing tiers. Use `group_by[]=context_window` to break out per-tier values. |
| `inference_geos[]` | one or more of global, us, not_available | No | all | Filter to specific inference regions. `not_available` matches rows where the region is unset. Use `group_by[]=inference_geo` to break out per-region values. |
| `speeds[]` | one or more of fast, standard | No | all | Filter to fast or standard inference mode. |
| `user_ids[]` | string, max 100 entries | No | all | Filter to specific users. |
| `limit` | integer | No | varies | Buckets per page. Default and maximum vary by bucket_width: 1d → 7 (max 31); 1h → 24 (max 168); 1m → 60 (max 256). |
| `page` | opaque cursor string | No | — | The `next_page` value from a previous response. |

**Response fields**

| **Field** | **Description** |
| --- | --- |
| `organization_id` | ID of the organization the API key belongs to. |
| `data` | Array of entries, one per time bucket. |
| `data[].starting_at` | Bucket start. |
| `data[].ending_at` | Bucket end. |
| `data[].results` | Array of entries, one per group within the bucket. A single entry with all dimension fields null when `group_by[]` is omitted. |
| `data[].results[].product, .model, .context_window, .inference_geo, .speed` | When the corresponding `group_by[]` value is set, the dimension value. Otherwise null. |
| `data[].results[].uncached_input_tokens` | Input tokens that were not served from the prompt cache. |
| `data[].results[].cache_creation.ephemeral_5m_input_tokens` | Tokens written to the 5-minute prompt cache. |
| `data[].results[].cache_creation.ephemeral_1h_input_tokens` | Tokens written to the 1-hour prompt cache. |
| `data[].results[].cache_read_input_tokens` | Input tokens served from the prompt cache. |
| `data[].results[].output_tokens` | Output tokens generated. |
| `data[].results[].server_tool_use.web_search_requests` | Number of web search tool calls. |
| `has_more` | Whether more buckets exist. |
| `next_page` | Opaque cursor for the next page. |
| `data_refreshed_at` | Timestamp of the data export this response was served from. |

**Example request**

```
curl "https://api.anthropic.com/v1/organizations/analytics/usage_report?starting_at=2026-03-01T00:00:00Z&bucket_width=1d&group_by[]=product" \

--header "x-api-key: $YOUR_API_KEY"
```

### 9. Cost over time

`GET /v1/organizations/analytics/cost_report`

Returns **USD cost over time**, bucketed and grouped the same way as `usage_report`.

**Query parameters**

Same as `usage_report` (`bucket_width`, `group_by[]`, `filters`, `limit`, `page`). The `group_by[]` values additionally accept `cost_type` and `token_type` on this endpoint.

**Response fields**

| **Field** | **Description** |
| --- | --- |
| `organization_id` | ID of the organization the API key belongs to. |
| `data` | Array of entries, one per time bucket. |
| `data[].starting_at` | Bucket start. |
| `data[].ending_at` | Bucket end. |
| `data[].results` | Array of entries, one per group within the bucket. |
| `data[].results[].product, .model, .context_window, .inference_geo, .speed` | When the corresponding `group_by[]` value is set, the dimension value. Otherwise null. |
| `data[].results[].cost_type` | When `group_by[]` includes `cost_type: tokens`, `web_search`, or `code_execution`. null when not set. |
| `data[].results[].token_type` | When `group_by[]` includes `token_type:` one of the token types listed under endpoint 7. Cost endpoint only — `token_type` is rejected on `usage_report`. |
| `data[].results[].currency` | Always "USD". |
| `data[].results[].amount` | Amount in fractional cents — raw consumption cost after negotiated discounts. |
| `data[].results[].list_amount` | List-price amount (pre-discount) in fractional cents. |
| `has_more` | Whether more buckets exist. |
| `next_page` | Opaque cursor for the next page. |
| `data_refreshed_at` | Timestamp of the data export this response was served from. |

**Example request**

```
curl "https://api.anthropic.com/v1/organizations/analytics/cost_report?starting_at=2026-03-01T00:00:00Z&bucket_width=1d&group_by[]=model" \

--header "x-api-key: $YOUR_API_KEY"
```