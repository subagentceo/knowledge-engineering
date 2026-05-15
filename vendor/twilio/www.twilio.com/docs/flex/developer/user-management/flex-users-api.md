# Flex Users API (public beta)

> \[!IMPORTANT]
>
> The Flex Users API is currently available as a public beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by an SLA.

## Flex User resource

A Flex User acts as the parent entity for a TaskRouter Worker and an Insights User. When a Flex User is provisioned, the corresponding TaskRouter Worker is automatically created. If Flex Insights is enabled, an Insights User is automatically created as well.
When the Flex User is deprovisioned, the associated TaskRouter Worker and Insights User (if applicable) are removed, and the Flex User itself is deactivated.

> \[!NOTE]
>
> When you manually create a TaskRouter Worker using the TaskRouter API, it isn't associated with a Flex User. Flex User provisioning occurs only through the [Flex provisioning API](#provision-a-flex-user) that's documented here or through just-in-time (JIT) provisioning when the user first signs in to Flex using SSO.

## List Flex Users

### Path parameters

| Name                             | Type   | Description                                              | PII?    |
| -------------------------------- | ------ | -------------------------------------------------------- | ------- |
| InstanceSid <br />**(required)** | String | A 34-character string that identifies the Flex instance. | Not PII |

Your Flex instance is the container that holds your Flex resources. You can find your Flex instance SID in Console on the [Flex overview](https://console.twilio.com/us1/develop/flex/overview) page.

### Query parameters

| Name      | Type                    | Description                         | PII?    |
| --------- | ----------------------- | ----------------------------------- | ------- |
| PageSize  | Integer or null \<=1000 | Page size. The default value is 50. | Not PII |
| PageToken | Integer or null         | Page token for pagination.          | Not PII |

### Flex User response schema

| Schema name       | Type           | Description                                                                                                                        | PII?                                                                                          |
| ----------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| flex\_user\_sid   | String         | Unique ID that identifies this resource.                                                                                           | Not PII                                                                                       |
| account\_sid      | String         | Unique ID of the account.                                                                                                          | Not PII                                                                                       |
| instance\_sid     | String         | Unique ID of the Flex instance.                                                                                                    | Not PII                                                                                       |
| team\_sid         | String         | Unique ID of the team that the user is a member of.                                                                                | Not PII                                                                                       |
| worker\_sid       | String or null | Unique ID of the TaskRouter worker associated with this user.                                                                      | Not PII                                                                                       |
| workspace\_sid    | String or null | Unique ID of the TaskRouter workspace of the Flex instance.                                                                        | Not PII                                                                                       |
| username          | String         | Human-readable unique string to identify the user.                                                                                 | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| full\_name        | String         | Human-readable name of this user.                                                                                                  | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| email             | String         | Email address of this user.                                                                                                        | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| roles             | List           | An array of Flex roles to be assigned to the user. Valid roles include agent, supervisor, and admin.                               | Not PII                                                                                       |
| created\_date     | String         | Date that this resource was created.                                                                                               | Not PII                                                                                       |
| updated\_date     | String         | Date that this resource was updated.                                                                                               | Not PII                                                                                       |
| version           | Integer        | The current iteration, incrementing with each update to reflect changes.                                                           | Not PII                                                                                       |
| deactivated       | Boolean        | Whether the user is deactivated. The associated TaskRouter Worker and Flex Insights User are deleted when the user is deactivated. | Not PII                                                                                       |
| deactivated\_date | String         | Date this resource was deactivated, either through SCIM or the `/Deprovision` API.                                                 | Not PII                                                                                       |

### Example request and response

**`GET` request**

```bash
curl -X GET "https://flex-api.twilio.com/v1/Instances/{InstanceSid}/Users" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

**Response**

```json
{
  "users": [
    {
      "account_sid": "AC00000000000000000000000000000000",
      "created_date": "2025-04-22T05:18:13Z",
      "deactivated": true,
      "deactivated_date": "2025-10-17T17:10:18Z",
      "email": "jane@example.com",
      "flex_team_sid": "Q000000000000000000000000000000000",
      "flex_user_sid": "FU00000000000000000000000000000001",
      "full_name": "Jane Doe",
      "instance_sid": "GO00000000000000000000000000000000",
      "locale": null,
      "roles": [
        "agent"
      ],
      "updated_date": "2025-10-17T17:10:15Z",
      "username": "Jane",
      "version": 24895,
      "worker_sid": null,
      "workspace_sid": "WS00000000000000000000000000000000"
    },
    {
      "account_sid": "AC00000000000000000000000000000000",
      "created_date": "2025-01-29T14:57:56Z",
      "deactivated": false,
      "deactivated_date": null,
      "email": "foo@example.com",
      "flex_team_sid": "Q000000000000000000000000000000000",
      "flex_user_sid": "FU00000000000000000000000000000002",
      "full_name": "Foo Bar",
      "instance_sid": "GO00000000000000000000000000000000",
      "locale": null,
      "roles": [
        "admin"
      ],
      "updated_date": "2025-03-04T16:17:57Z",
      "username": "foo133",
      "version": 2,
      "worker_sid": "WK00000000000000000000000000000000",
      "workspace_sid": "WC00000000000000000000000000000000"
    }
  ],
  "meta": {
    "first_page_url": "https://flex-api.twilio.com/v1/Instances/GO00000000000000000000000000000000/Users?PageSize=50&Page=0",
    "key": "users",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://flex-api.twilio.com/v1/Instances/GO00000000000000000000000000000000/Users?PageSize=50&Page=0"
  }
}
```

## Provision a Flex user

Available in the v4 API path or later.

Use the `POST` method on the user's `/Provision` endpoint to create or update a Flex User along with its associated entities, such as the TaskRouter Worker and Insights User.
The API is idempotent, meaning that repeated requests with the same data will not create duplicate resources.

### Request body parameters

`Encoding type:application/json`

### Path parameters

| Name                             | Type   | Description                                              | PII?    |
| -------------------------------- | ------ | -------------------------------------------------------- | ------- |
| InstanceSid <br />**(required)** | String | A 34-character string that identifies the Flex instance. | Not PII |

### Request schema

| Schema name                     | Type                          | Description                                                                                          | PII                                                                                           |
| ------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| username <br />**(required)**   | String \[1 .. 256] characters | A unique string that identifies the user, such as an email address.                                  | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| roles <br />**(required)**      | List                          | An array of Flex roles to be assigned to the user. Valid roles include agent, supervisor, and admin. | Not PII                                                                                       |
| full\_name <br />**(required)** | String \[1 .. 256] characters | The full name of the user.                                                                           | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| email <br />**(required)**      | String \[1 .. 256] characters | The email of the user.                                                                               | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| worker <br />**(required)**     | Object                        | JSON blob with optional TaskRouter Worker routing attributes. Can be empty `{}`.                     | Not PII                                                                                       |

The username value is assigned as the `friendly_name` of the corresponding TaskRouter Worker.

### Example request and response

**`POST` request**

```bash
curl -X POST "https://flex-api.twilio.com/v4/Instances/{InstanceSid}/Users/Provision" \
-u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN" \
-H "Content-Type: application/json" \
--data-raw '{
"username": "my.unique.username",
"email": "my.unique.username@acme.com",
"full_name": "Foo Bar",
"roles": ["agent"],
"worker" : {
    "attributes" : {
        "channel.voice.capacity" : 10,
        "language": "english, spanish",
        "more.stringarray" : "more,more2"
    }
}
}'
```

**Response**

```json
{
"account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
"flex_user_sid": "FUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
"instance_sid": "GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
"username": "my.unique.username",
"email": "my.unique.username@acme.com",
"full_name": "Foo Bar",
"flex_team_sid": "QO00000000000000000000000000000000",
"roles": [
"agent"
],
"locale": "string",
"worker": {
"worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
"workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
},
"deactivated": false,
"created_date": "2019-08-24T14:15:22Z",
"updated_date": "2019-08-24T14:15:22Z",
"deactivated_date": null,
"version": 1
}
```

## Deprovision a Flex user

Available in the v4 API path or later.

Deactivate a Flex user and delete associated TaskRouter worker a `POST` request to the `/Deprovision` endpoint.

### Request body parameters

`Encoding type:application/json`

### Path parameters

| Name                             | Type   | Description                                             | PII?    |
| -------------------------------- | ------ | ------------------------------------------------------- | ------- |
| InstanceSid <br />**(required)** | String | A 34-character string that identifies the Flex instance | Not PII |

### Request schema

| Schema name                          | Type   | Description                                  | PII?    |
| ------------------------------------ | ------ | -------------------------------------------- | ------- |
| flex\_user\_sid <br />**(required)** | String | The unique ID that identifies this resource. | Not PII |

### Example request and response

**`POST` request**

```bash

curl -x POST 'http://flex-api.twilio.com/v4/Instances/{InstanceSid}/Users/Deprovision' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
{
  "flex_user_sid": "FU00000000000000000000000000000000"
}
```

**Response**

```json
204
```

## Get Flex user by username

Available in the v4 API path or later.

Fetch a Flex user by username. The response returns 0 or 1 results.

### Path parameters

| Name                              | Type   | Description                                              | PII?    |
| --------------------------------- | ------ | -------------------------------------------------------- | ------- |
| InstanceSid <br /> **(required)** | String | A 34-character string that identifies the Flex instance. | Not PII |

Your Flex instance is the container that holds your Flex resources. You can find your Flex instance SID in Console on the [Flex overview](https://console.twilio.com/us1/develop/flex/overview) page.

### Query parameters

| Name                         | Type   | Description                         | PII?                                                                                          |
| ---------------------------- | ------ | ----------------------------------- | --------------------------------------------------------------------------------------------- |
| Username<br />**(required)** | String | Username of the Flex user to fetch. | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |

### Example request and response

**`GET` request**

```bash
curl -X GET "https://flex-api.twilio.com/v4/Instances/{InstanceSid}/Users?Username=Jane" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

**Response**

```json
{
  "account_sid": "AC00000000000000000000000000000000",
  "instance_sid": "GO00000000000000000000000000000000",
  "users": [
    {
      "account_sid": "AC00000000000000000000000000000000",
      "created_date": "2025-10-23T15:05:27Z",
      "deactivated": false,
      "deactivated_date": null,
      "email": "jane@example.com",
      "flex_team_sid": "QO00000000000000000000000000000000",
      "flex_user_sid": "FU00000000000000000000000000000000",
      "full_name": "Jane Doe",
      "instance_sid": "GO00000000000000000000000000000000",
      "locale": null,
      "roles": [
        "agent"
      ],
      "updated_date": "2025-10-23T15:20:47Z",
      "username": "Jane",
      "version": 5,
      "workspace_sid": "WS00000000000000000000000000000000"
    }
  ],
  "meta": {
    "direct_token": true,
    "list_key": "users",
    "next_token": null,
    "page_size": 50,
    "previous_token": null
  }
}
```

## Get Flex user by Flex user SID

Available in the v4 API path or later.

Fetch a Flex user by user SID. The response returns 0 or 1 results.

### Path parameters

| Name                             | Type   | Description                                              | PII?    |
| -------------------------------- | ------ | -------------------------------------------------------- | ------- |
| InstanceSid <br />**(required)** | String | A 34-character string that identifies the Flex instance. | Not PII |
| FlexUserSid <br />**(required)** | String | Unique ID of the Flex user to fetch.                     | Not PII |

### Example request and response

**`GET` request**

```bash
curl -X GET "https://flex-api.twilio.com/v4/Instances/{InstanceSid}/Users/{FlexUserSid}" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

**Response**

```json
{
  "account_sid": "AC00000000000000000000000000000000",
  "created_date": "2025-04-22T05:18:13Z",
  "deactivated": false,
  "deactivated_date": null,
  "email": "jane@example.com",
  "flex_team_sid": "Q000000000000000000000000000000000",
  "flex_user_sid": "FU00000000000000000000000000000001",
  "full_name": "Jane Doe",
  "instance_sid": "GO00000000000000000000000000000000",
  "locale": null,
  "roles": [
    "agent"
  ],
  "updated_date": "2025-10-17T17:10:15Z",
  "username": "Jane",
  "version": 24895,
  "worker_sid": "WK00000000000000000000000000000000",
  "workspace_sid": "WS00000000000000000000000000000000"
}
```
