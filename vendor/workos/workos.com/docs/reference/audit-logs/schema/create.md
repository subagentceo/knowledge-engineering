# Audit Log Schema

An object representing an Audit Log Schema.

## Create Schema

Creates a new Audit Log schema used to validate the payload of incoming Audit Log Events. If the `action` does not exist, it will also be created.

#### Request

## List Actions

Get a list of all Audit Log actions in the current environment.

#### Request

#### Response

## List Schemas

Get a list of all schemas for the Audit Logs action identified by `:name`.

#### Request

#### Response

### audit_log_schema

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "audit_log_schema" | Yes | Distinguishes the Audit Log Schema object. |
| `version` | number | Yes | The version of the schema. |
| `targets` | array | Yes | The list of targets for the schema. |
| `actor` | object | Yes | The metadata schema for the actor. |
| `metadata` | object | Yes | Additional data that should be associated with the event or entity. There is a limit of 50 keys. Key names can be up to 40 characters long, and values can be up to 500 characters long. |

### POST /audit_logs/actions/{actionName}/schemas

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `actionName` | string | Yes | The name of the Audit Log action. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `audit_log_schema` | object | Distinguishes the Audit Log Schema object. |

### GET /audit_logs/actions

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Defaults to `desc`. |

### GET /audit_logs/actions/{actionName}/schemas

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `actionName` | string | Yes | The name of the Audit Log action. |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Defaults to `desc`. |