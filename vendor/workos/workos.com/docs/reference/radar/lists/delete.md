# Radar lists

Radar supports explicitly blocking and allowing attempts based on attempt attributes. You can manage these lists via the Radar list management APIs

## Remove an entry from a Radar list

Remove an entry from a Radar list.

#### Request

## Add an entry to a Radar list

Add an entry to a Radar list.

#### Request

### DELETE /radar/lists/{type}/{action}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | "ip_address" \| "domain" \| "email" \| ... | Yes | The type of the Radar list |
| `action` | "block" \| "allow" | Yes | The action of the Radar list |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### POST /radar/lists/{type}/{action}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | "ip_address" \| "domain" \| "email" \| ... | Yes | The type of the Radar list |
| `action` | "block" \| "allow" | Yes | The action of the Radar list |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `message` | string | A message indicating the entry already exists. |