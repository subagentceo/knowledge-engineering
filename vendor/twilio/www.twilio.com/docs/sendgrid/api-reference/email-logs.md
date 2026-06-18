# Email Logs

The Email Logs API provides structured, event-level visibility into the lifecycle of every email sent through your email account. It enables you to search, filter, and retrieve event-level data to troubleshoot delivery issues and verify message outcomes in near real time.

## Key endpoints

* **Filter All Messages**: Retrieve stored messages with filtering (`POST` request)
* **Filter by Message ID**: Drill into event history for a specific message (`GET` request)

### Usage notes

* **Data Retention**: All email customers will have access to 30 days of email event history. There are no options to extend the data retention period beyond 30 days.
* **Compliance**: Regional data stores ensure that logs originating from EU subaccounts remain within EU-based infrastructure. Accessing or processing data from outside the original region could be treated as global processing and may risk internal compliance requirements.
* **Query Format**: The API accepts a JSON request body containing a query string. Queries are case-sensitive and must use valid field names and operators.
* **Pagination**: Pagination is not supported. Limit results using the limit parameter.

### Authentication

All endpoints require API Key authentication through the `Authorization: Bearer <API_KEY>` header.

### Response

Endpoints return JSON that contains message details and events. The API returns accurate and consistent data structures for downstream use, aligning with the Event Webhook data solution.

### Related docs

* [Filter All Messages](/docs/sendgrid/api-reference/email-logs/filter-all-messages)
* [Filter by Message ID](/docs/sendgrid/api-reference/email-logs/filter-messages-by-id)
* [Event Webhooks](/docs/sendgrid/api-reference/webhooks)
* [Email Statistics](/docs/sendgrid/api-reference/stats) (for aggregate data and reporting needs)
