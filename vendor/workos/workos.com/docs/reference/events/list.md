# Events

Events represent activity that has occurred within WorkOS or within third-party identity and directory providers. They are used to keep your app in sync with WorkOS data.
For more details on consuming events in your app, check out the [data syncing](https://workos.com/docs/events/data-syncing) guide.

Refer to the [Events](https://workos.com/docs/events) page for a full list of events that WorkOS emits.

## List events

List events for the current environment.

#### Request

#### Response

### event

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "event" | Yes | Distinguishes the Event object. |
| `id` | string | Yes | Unique identifier for the Event. |
| `event` | string | Yes | The type of event that occurred. |
| `data` | object | Yes | The event payload. |
| `created_at` | string | Yes | An ISO 8601 timestamp. |
| `context` | object | No | Additional context about the event. |

### GET /events

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. For example, if you make a list request and receive 100 objects, ending with `"obj_123"`, your subsequent call can include `before="obj_123"` to fetch a new batch of objects before `"obj_123"`. |
| `after` | string | No | Pagination cursor to receive records after a provided event ID. Mutually exclusive with the `range_start` parameter. |
| `limit` | integer | No | Maximum number of records to return. Accepts values between `1` and `100`. Default is `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Supported values are `"asc"` (ascending), `"desc"` (descending), and `"normal"` (descending with reversed cursor semantics where `before` fetches older records and `after` fetches newer records). Defaults to `desc`. |
| `events` | string[] | No | Filter to only return events of particular types. |
| `range_start` | string | No | ISO 8601 formatted date range start for a stream of events. Can be provided without `range_end` to fetch all events since `range_start`. Mutually exclusive with the `after` parameter. |
| `range_end` | string | No | ISO 8601 formatted date range end for a stream of events. |
| `organization_id` | string | No | Filter to only return events belonging only to specific Organizations. User events (e.g user.created) will not be Organization specific. |