# Flex Teams API (public beta)

The Flex Teams API resource contains code showing how to create, fetch (get), read (list), update, and delete teams in your Flex instance.

> \[!IMPORTANT]
>
> Teams, including the Flex Teams API, is currently available as a public beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by an SLA.

> \[!WARNING]
>
> Avoid using a person's name, home address, email, phone number, or other PII in the `FriendlyName` or `Description` fields. Instead, use some form of pseudonymized identifier.
>
> Learn more about how we process your data in our [privacy policy](https://www.twilio.com/legal/privacy).

## Teams resource

Flex Teams are configurable grouping structures applied to agents and supervisors to facilitate fine-grained access control policies based on group memberships.

This page describes the Flex Team API resource. Check out the additional documentation to [learn more about working with Flex Teams](/docs/flex/admin-guide/setup/teams).

## List Teams

To review your account's current Flex Team configuration, fetch the Team resource instance by making a `GET` request to the `/Teams` endpoint. The `/Teams` endpoint has a rate limit of 20 `GET` requests per second.

> \[!NOTE]
>
> By default, all Flex users in a Flex instance are automatically added to the default team. The default team is a system-generated team that cannot be deleted.

### Request body parameters

`Encoding type:application/x-www-form-urlencoded`

### Path parameters

| Name                       | Type   | Description                                                                               | PII?    |
| -------------------------- | ------ | ----------------------------------------------------------------------------------------- | ------- |
| InstanceSid **(required)** | String | A 34 character string that identifies the Flex related resource responsible for the team. | Not PII |

Your Flex instance is the container that holds your Flex resources. You can find your Flex instance SID in Console on the [Flex overview](https://console.twilio.com/us1/develop/flex/overview) page.

### Query parameters

| Name              | Type                    | Description                                                                                                                                                                                                                          | PII?    |
| ----------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| PageSize          | Integer or Null \<=1000 | The page size. The default value is 50.                                                                                                                                                                                              | Not PII |
| PageToken         | Integer or Null         | Page token for pagination.                                                                                                                                                                                                           | Not PII |
| Owner             | String or Null          | Team owner in `FlexUserSid` format. If not provided, will return all teams in the instance, otherwise will return teams owned by the owner.                                                                                          | Not PII |
| IncludeTransitive | Boolean or Null         | When listing teams for an owner, indicating **True** will include teams transitively owned by the owner. For example, if turned on, it will return all level 2 and level 1 teams under the level 3 team owner. The default is false. | Not PII |

### Team response schema

| Schema name       | Type            | Description                                                                                                                        | PII?                                                                                          |
| ----------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| team\_sid         | String          | The unique ID that identifies this resource.                                                                                       | Not PII                                                                                       |
| friendly\_name    | String          | The human-readable name of this team.                                                                                              | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| member\_count     | Integer         | Represents the total number of members.                                                                                            | Not PII                                                                                       |
| account\_sid      | String          | The unique ID of the account responsible for the team.                                                                             | Not PII                                                                                       |
| instance\_sid     | String          | The unique ID of the Flex related resources responsible for the team.                                                              | Not PII                                                                                       |
| date\_created     | String          | The date that this resource was created.                                                                                           | Not PII                                                                                       |
| date\_updated     | String          | The date that this resource was updated.                                                                                           | Not PII                                                                                       |
| version           | Integer         | Represents the current iteration of the team's configuration, incrementing with each update to reflect changes.                    | Not PII                                                                                       |
| level             | Integer or Null | Allows teams to be categorized into different hierarchical structures, enabling better organization and role-based access control. | Not PII                                                                                       |
| parent\_team\_sid | String or Null  | The unique ID that uniquely identifies the parent team of this resource.                                                           | Not PII                                                                                       |
| description       | String or Null  | Description of the team providing a brief summary of the team's purpose and focus.                                                 | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |

### Example request and response

**`GET` request**

```bash
curl -X GET "https://flex-api.twilio.com/v1/Instances/{InstanceSid}/Teams" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

**Response**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "instance_sid": "GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "teams": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "instance_sid": "GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "team_sid": "QO00000000000000000000000000000000",
      "friendly_name": "default",
      "member_count": 10,
      "description": "default team",
      "level": 1,
      "parent_team_sid": null,
      "date_created": "2024-08-01T22:10:40Z",
      "date_updated": "2024-08-01T22:10:40Z",
      "version": 1
    }
  ],
  "meta": {
    "key": "teams",
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://flex-api.twilio.com/v1/Instances/GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Teams?PageSize=50&Page=0",
    "url": "https://flex-api.twilio.com/v1/Instances/GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Teams?PageSize=50&Page=0",
    "next_page_url": null,
    "previous_page_url": null
  }
}
```

## Fetch a Team

Retrieve information about a specific team by making a `GET` request to the `/Teams` endpoint. The `/Teams` endpoint has a rate limit of 20 `GET` requests per second.

### Path parameters

| Name                       | Type   | Description                                                                               | PII?    |
| -------------------------- | ------ | ----------------------------------------------------------------------------------------- | ------- |
| InstanceSid **(required)** | String | A 34 character string that identifies the Flex related resource responsible for the team. | Not PII |
| TeamSid  **(required)**    | String | A 34 character string that uniquely identifies this resource.                             | Not PII |

### Schema

| Schema name       | Type            | Description                                                                                                     | PII?                                                                                          |
| ----------------- | --------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| team\_sid         | String          | The unique ID that uniquely identifies this resource.                                                           | Not PII                                                                                       |
| account\_sid      | String          | The unique ID of the account responsible for the team.                                                          | Not PII                                                                                       |
| instance\_sid     | String          | The unique ID of the Flex related resources responsible for the team.                                           | Not PII                                                                                       |
| friendly\_name    | String          | The human-readable name of this team.                                                                           | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| description       | String or Null  | Description of the team providing a brief summary of the team's purpose and focus.                              | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| level             | Integer or Null | Team level.                                                                                                     | Not PII                                                                                       |
| parent\_team\_sid | String or Null  | The unique ID that uniquely identifies the parent team of this resource.                                        | Not PII                                                                                       |
| member\_count     | Integer         | Represents the total number of members.                                                                         | Not PII                                                                                       |
| date\_created     | String          | The date that this resource was created.                                                                        | Not PII                                                                                       |
| date\_updated     | String          | The date that this resource was updated.                                                                        | Not PII                                                                                       |
| version           | Integer         | Represents the current iteration of the team's configuration, incrementing with each update to reflect changes. | Not PII                                                                                       |

### Example `GET` request and response

**`GET` request**

```bash
curl -X GET "https://flex-api.twilio.com/v1/Instances/{InstanceSid}/Teams/{TeamSid}" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN

```

**Response**

```json
{
  "team_sid": "QO00000000000000000000000000000000",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "instance_sid": "GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "default",
  "member_count": 10,
  "description": "default team",
  "level": 1,
  "parent_team_sid": "QO00000000000000000000000000000001",
  "date_created": "2024-08-01T22:10:40Z",
  "date_updated": "2024-08-01T22:10:40Z",
  "version": 1
}
```

## Fetch all Team Members for a Team

To review all team Members assigned to a team, fetch the Team resource instance by making a `GET` request to the `/Members` endpoint. The `/Members` endpoint has a rate limit of 20 `GET` requests per second.

### Path parameters

| Name                       | Type   | Description                                                                               | PII?    |
| -------------------------- | ------ | ----------------------------------------------------------------------------------------- | ------- |
| InstanceSid **(required)** | String | A 34 character string that identifies the Flex related resource responsible for the team. | Not PII |
| TeamSid  **(required)**    | String | A 34 character string that uniquely identifies this resource.                             | Not PII |

### Query parameters

| Name      | Type                    | Description                         | PII?    |
| --------- | ----------------------- | ----------------------------------- | ------- |
| PageSize  | Integer or Null \<=1000 | Page size. The default value is 50. | Not PII |
| PageToken | Integer or Null         | Page token for pagination.          | Not PII |

### Member array response schema

| Schema name     | Type           | Description                                                           | PII?                                                                                          |
| --------------- | -------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| flex\_user\_sid | String         | The unique ID of the Flex User.                                       | Not PII                                                                                       |
| account\_sid    | String         | The unique ID of the account responsible for the team.                | Not PII                                                                                       |
| instance\_sid   | String         | The unique ID of the Flex related resources responsible for the team. | Not PII                                                                                       |
| team\_sid       | String or Null | A 34 character string that uniquely identifies this resource.         | Not PII                                                                                       |
| friendly\_name  | String or Null | The human-readable name of the Flex user.                             | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| email           | String or Null | Uniquely identifies a team member user through their email address.   | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| worker\_sid     | String or Null | The SID of the Worker resource.                                       | Not PII                                                                                       |

### Example request and response

**`GET` request**

```bash
curl -X GET "https://flex-api.twilio.com/v1/Instances/{InstanceSid}/Teams/{TeamSid}/Members" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

**Response**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "instance_sid": "GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "members": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "instance_sid": "GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "team_sid": "QO00000000000000000000000000000000",
      "flex_user_sid": "FU00000000000000000000000000000000",
      "friendly_name": "userName",
      "email": "test@twilio.com",
      "worker_sid": "WK00000000000000000000000000000000"
    }
  ],
  "meta": {
    "list_key": "members",
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://flex-api.twilio.com/v1/Instances/GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Teams/QO00000000000000000000000000000000/Members?PageSize=50&Page=0",
    "url": "https://flex-api.twilio.com/v1/Instances/GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Teams/QO00000000000000000000000000000000/Members?PageSize=50&Page=0",
    "next_page_url": null,
    "previous_page_url": null
  }
}
```

## Fetch all Team Owners for a Team

To review all team owners assigned to a team, fetch the Team resource instance by making a `GET` request to the `/Owners` endpoint. The `/Owners` endpoint has a rate limit of 20 `GET` requests per second.

### Path parameters

| Name                       | Type   | Description                                                                               | PII?    |
| -------------------------- | ------ | ----------------------------------------------------------------------------------------- | ------- |
| InstanceSid **(required)** | String | A 34 character string that identifies the Flex related resource responsible for the team. | Not PII |
| TeamSid **(required)**     | String | A 34 character string that uniquely identifies this resource.                             | Not PII |

### Query parameters

| Name              | Type            | Description                                                                                                                                                                     | PII?    |
| ----------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| IncludeTransitive | Boolean or Null | Indicating **True** will include teams "transitively" owned by the owner. For example, if turned on, it will return all level 2 and level 1 teams under the level 3 team owner. | Not PII |

### Owner response array schema

| Schema name     | Type           | Description                                                           | PII                                                                                           |
| --------------- | -------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| flex\_user\_sid | String         | The unique ID of the Flex User.                                       | Not PII                                                                                       |
| account\_sid    | String         | The unique ID of the account responsible for the team.                | Not PII                                                                                       |
| instance\_sid   | String         | The unique ID of the Flex related resources responsible for the team. | Not PII                                                                                       |
| team\_sid       | String or Null | A 34 character string that uniquely identifies this resource.         | Not PII                                                                                       |
| friendly\_name  | String or Null | The human-readable name of the Flex user.                             | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| email           | String or Null | Uniquely identifies a team member user through their email address.   | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| worker\_sid     | String or Null | The SID of the Worker resource.                                       | Not PII                                                                                       |

### Example request and response

**`GET` request**

```bash
curl -X GET "https://flex-api.twilio.com/v1/Instances/{InstanceSid}/Teams/{TeamSid}/Owners" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

**Response**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "instance_sid": "GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "owners": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "instance_sid": "GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "team_sid": "QO00000000000000000000000000000000",
      "flex_user_sid": "FU00000000000000000000000000000000",
      "friendly_name": "userName",
      "email": "test@twilio.com",
      "worker_sid": "WK00000000000000000000000000000000"
    }
  ],
  "meta": {
    "direct_token": true,
    "key": "owners",
    "next_token": null,
    "page_token": null,
    "previous_token": null
  }
}
```

## Create a Team

To create a team, make a `POST` request to the `/Teams` endpoint.

> \[!NOTE]
>
> The Team API uses the `level` field to organize teams into a three-tiered hierarchy for better structure and access control. Level 3 represents the top-level hierarchy of groups containing only owners and serving as the parent for Level 2 groups of teams. Level 3 cannot have a parent team. Level 2, forms the middle tier, containing only owners and acting as the parent for Level 1 teams. Level 1, the "team" level, is the bottom tier where both members and owners reside.

### Request body parameters

`Encoding type:application/x-www-form-urlencoded`

### Path parameters

| Name                       | Type   | Description                                                                               | PII     |
| -------------------------- | ------ | ----------------------------------------------------------------------------------------- | ------- |
| InstanceSid **(required)** | String | A 34 character string that identifies the Flex related resource responsible for the team. | Not PII |

### Request schema

| Schema name                 | Type                           | Description                                                                                                                                        | PII                                                                                           |
| --------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| FriendlyName **(required)** | String \[1 .. 100] characters  | A descriptive string that you create to describe the team. Must be unique.                                                                         | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| Description                 | String \[1 .. 1000] characters | Description of the team providing a brief summary of the team's purpose and focus.                                                                 | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| Level                       | Integer \<int32> \[ 1 .. 3 ]   | Hierarchy level of the resource. Bottom level is 1. The middle level group of teams is 2 and the top level hierarchy of groups is 3. Default is 1. | Not PII                                                                                       |
| ParentTeamSid               | string                         | The unique  `sid` ID that identifies the parent team of this resource. Level 3 hierarchy cannot have a parent resource.                            | Not PII                                                                                       |

### Example request and response

**`POST` request**

```bash
curl -X POST "https://flex-api.twilio.com/v1/Instances/{InstanceSid}/Teams" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN

{
  "FriendlyName": "teamName",
  "Description": "description",
  "Level": 1,
  "ParentTeamSid": "QO00000000000000000000000000000001"
}
```

**Response**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "instance_sid": "GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "team_sid": "QO00000000000000000000000000000002",
  "friendly_name": "teamName",
  "member_count": 10,
  "description": "description",
  "level": 1,
  "parent_team_sid": "QO00000000000000000000000000000001",
  "date_created": "2024-08-01T22:10:40Z",
  "date_updated": "2024-08-01T22:10:40Z",
  "version": 1
}
```

## Update a Team

Update a team by making a `POST` request to the `/Teams` endpoint. The `/Teams` endpoint has a rate limit of 5 `POST` requests per second.

### Request body parameters

`Encoding type:application/x-www-form-urlencoded`

### Path parameters

| Name                       | Type   | Description                                                                               | PII?    |
| -------------------------- | ------ | ----------------------------------------------------------------------------------------- | ------- |
| InstanceSid **(required)** | String | A 34 character string that identifies the Flex related resource responsible for the team. | Not PII |
| TeamSid **(required)**     | String | A 34 character string that uniquely identifies this resource.                             | Not PII |

### Request schema

| Schema name                  | Type                          | Description                                                                     | PII?                                                                                          |
| ---------------------------- | ----------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| FriendlyName **(required)**  | String \[1 …100] characters   | A descriptive string that you create to describe the Flex Team. Must be unique. | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| Description **(required)**   | String \[0 … 1000] characters | A description for the team.                                                     | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| ParentTeamSid **(required)** | String                        | Parent team sid.                                                                | Not PII                                                                                       |

### Team response schema

| Schema name       | Type            | Description                                                                                                                        | PII                                                                                           |
| ----------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| team\_sid         | String          | The unique ID that uniquely identifies this resource.                                                                              | Not PII                                                                                       |
| account\_sid      | String          | The unique ID of the account responsible for the team.                                                                             | Not PII                                                                                       |
| instance\_sid     | String          | The unique ID of the Flex related resources responsible for the team.                                                              | Not PII                                                                                       |
| friendly\_name    | String          | The human-readable name of this team.                                                                                              | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| description       | String or Null  | Description of the team providing a brief summary of the team's purpose and focus.                                                 | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| level             | Integer or Null | Allows teams to be categorized into different hierarchical structures, enabling better organization and role-based access control. | Not PII                                                                                       |
| parent\_team\_sid | String or Null  | The unique ID that uniquely identifies the parent team of this resource.                                                           | Not PII                                                                                       |
| member\_count     | Integer         | Represents the total number of members.                                                                                            | Not PII                                                                                       |
| date\_created     | String          | The date that this resource was created.                                                                                           | Not PII                                                                                       |
| date\_updated     | String          | The date that this resource was updated.                                                                                           | Not PII                                                                                       |
| version           | Integer         | Represents the current iteration of the team's configuration, incrementing with each update to reflect changes.                    | Not PII                                                                                       |

### Example request and response

**`POST` request**

```bash
curl -X POST "https://flex-api.twilio.com/v1/Instances/{InstanceSid}/Teams/{TeamSid}" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN

{
  "FriendlyName": "newTeamName",
  "Description": "description",
  "ParentTeamSid": "QO00000000000000000000000000000001"
}

```

**Response**

```json
{
  "team_sid": "QO00000000000000000000000000000002",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "instance_sid": "GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "newTeamName",
  "member_count": 10,
  "description": "description",
  "level": 1,
  "parent_team_sid": "QO00000000000000000000000000000001",
  "date_created": "2024-08-01T22:10:40Z",
  "date_updated": "2024-08-01T22:10:40Z",
  "version": 1
}
```

## Add Owner to a Team

Add an Owner to a Team by making a `POST` request to the `/Owners` endpoint. The `/Owners` endpoint has a rate limit of 5 `POST` requests per second.

> \[!NOTE]
>
> Team owners are typically supervisors. Owners can be an owner of multiple teams. Owners can also be a member of a team. Limit of 500 owners per team.

### Request body parameters

`Encoding type:application/x-www-form-urlencoded`

### Path parameters

| Name                       | Type   | Description                                                                               | PII?    |
| -------------------------- | ------ | ----------------------------------------------------------------------------------------- | ------- |
| InstanceSid **(required)** | String | A 34 character string that identifies the Flex related resource responsible for the team. | Not PII |
| TeamSid **(required)**     | String | A 34 character string that uniquely identifies this resource.                             | Not PII |

### Schema

| Schema name                | Type   | Description                                               |
| -------------------------- | ------ | --------------------------------------------------------- |
| FlexUserSid **(required)** | String | User SID of the Flex user to add to the team as an owner. |

### Owner response schema

| Schema name     | Type           | Description                                                           | PII                                                                                           |
| --------------- | -------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| account\_sid    | String         | The unique ID of the account responsible for the team.                | Not PII                                                                                       |
| instance\_sid   | String         | The unique ID of the Flex related resources responsible for the team. | Not PII                                                                                       |
| flex\_user\_sid | String         | The unique ID of the Flex User.                                       | Not PII                                                                                       |
| team\_sid       | String or Null | A 34 character string that uniquely identifies this resource.         | Not PII                                                                                       |
| friendly\_name  | String or Null | The human-readable name of the Flex user.                             | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| email           | String or Null | Uniquely identifies a team member user through their email address.   | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| worker\_sid     | String or Null | The SID of the Worker resource.                                       | Not PII                                                                                       |

### Example request and response

**`POST` request**

```bash
curl -X POST "https://flex-api.twilio.com/v1/Instances/{InstanceSid}/Teams/{TeamSid}/Owners" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN

{
  "FlexUserSid": "FU00000000000000000000000000000000"
}
```

**Response**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "instance_sid": "GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "team_sid": "QO00000000000000000000000000000000",
  "flex_user_sid": "FU00000000000000000000000000000000",
  "friendly_name": "userName",
  "email": "test@twilio.com",
  "worker_sid": "WK00000000000000000000000000000000"
}

```

## Add Member to Team

Add a user as a Member to a Team by making a `POST` request to the `/Members` endpoint. The `/Members` endpoint has a rate limit of 20 `POST` requests per second.

> \[!NOTE]
>
> The `/Members` endpoint should be used to remove users from a team by reassigning them to another team, as there is no dedicated Delete Member API.

To remove members from a team:

* Assign them to a different team using the `/Members` endpoint.
* If the member should no longer belong to a specific team but is still a part of the organization, they can be moved back to the default team.

### Request body parameters

`Encoding type:application/x-www-form-urlencoded`

### Path parameters

| Name                       | Type   | Description                                                                               | PII?    |
| -------------------------- | ------ | ----------------------------------------------------------------------------------------- | ------- |
| InstanceSid **(required)** | String | A 34 character string that identifies the Flex related resource responsible for the team. | Not PII |
| TeamSid **(required)**     | String | A 34 character string that uniquely identifies this resource.                             | Not PII |

### Schema

| Schema name                | Type   | Description                  |
| -------------------------- | ------ | ---------------------------- |
| FlexUserSid **(required)** | String | Team member's Flex User SID. |

### Response schema

| Schema name     | Type           | Description                                                           | PII?                                                                                          |
| --------------- | -------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| account\_sid    | String         | The unique ID of the account responsible for the team.                | Not PII                                                                                       |
| instance\_sid   | String         | The unique ID of the Flex related resources responsible for the team. | Not PII                                                                                       |
| team\_sid       | String or Null | A 34 character string that uniquely identifies this resource.         | Not PII                                                                                       |
| flex\_user\_sid | String         | The unique ID of the Flex user.                                       | Not PII                                                                                       |
| friendly\_name  | String or Null | The human-readable name of the Flex user.                             | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| email           | String or Null | Uniquely identifies a team member user through their email address.   | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |

### Example `POST` request and response

**`POST` request**

```bash
curl -X POST "https://flex-api.twilio.com/v1/Instances/{InstanceSid}/Teams/{TeamSid}/Members" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN

{
  "FlexUserSid": "FU00000000000000000000000000000000"
}
```

**Response**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "instance_sid": "GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "team_sid": "QO00000000000000000000000000000000",
  "flex_user_sid": "FU00000000000000000000000000000000",
  "friendly_name": "userName",
  "email": "test@twilio.com",
  "worker_sid": "WK00000000000000000000000000000000"
}
```

## Delete Team Owner

Delete an Owner of a team by making a `DELETE` request to the `/Owners` endpoint. The `/Owners` endpoint has a rate limit of 5 `DELETE` requests per second.

### Request body parameters

`Encoding type:application/x-www-form-urlencoded`

### Path parameters

| Name                        | Type   | Description                                                                               | PII?    |
| --------------------------- | ------ | ----------------------------------------------------------------------------------------- | ------- |
| InstanceSid **(required)**  | String | A 34 character string that identifies the Flex related resource responsible for the team. | Not PII |
| TeamSid **(required)**      | String | A 34 character string that uniquely identifies this resource.                             | Not PII |
| FlexUserSid  **(required)** | String | The unique ID of the Flex User.                                                           | Not PII |

### Example `DELETE` request and response

**`Delete` request**

```bash
curl -X DELETE "https://flex-api.twilio.com/v1/Instances/{InstanceSid}/Teams/{TeamSid}/Owners/{FlexUserSid}" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN


```

**Response**

`204 Successfully deleted team owner.`

## Delete a Team

Delete a team by making a `DELETE` request to the `/Teams` endpoint. The `/Teams` endpoint has a rate limit of 5 `DELETE` requests per second.

### Request body parameters

`Encoding type:application/x-www-form-urlencoded`

### Path parameters

| Name                       | Type   | Description                                                                               | PII?    |
| -------------------------- | ------ | ----------------------------------------------------------------------------------------- | ------- |
| InstanceSid **(required)** | String | A 34 character string that identifies the Flex related resource responsible for the team. | Not PII |
| TeamSid **(required)**     | String | A 34 character string that uniquely identifies this resource.                             | Not PII |

### Example `DELETE` request and response

**`DELETE` request**

```bash
curl -X DELETE "https://flex-api.twilio.com/v1/Instances/{InstanceSid}/Teams/{TeamSid}" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

**Response**

`204 Successfully deleted.`

## Get Teams Context

Get teams context by making a `GET` request to the `/Context` endpoint. The `/Context` endpoint has a rate limit of 20 `GET` requests per second.

### Path parameters

| Name                       | Type   | Description                                                                               | PII?    |
| -------------------------- | ------ | ----------------------------------------------------------------------------------------- | ------- |
| InstanceSid **(required)** | String | A 34 character string that identifies the Flex related resource responsible for the team. | Not PII |

### Example `GET` request and response

**`GET` request**

```bash
curl -X GET "https://flex-api.twilio.com/v1/Instances/{InstanceSid}/Teams/Context" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN

```

**Response**

```json
{
  "team_setup_complete": true
}
```

## Set Team Context

Set team context by making a `POST` request to the `/Context` endpoint. The `/Context` endpoint has a rate limit of 5 `POST` requests per second.

### Path parameters

| Name                       | Type   | Description                                                                               | PII?    |
| -------------------------- | ------ | ----------------------------------------------------------------------------------------- | ------- |
| InstanceSid **(required)** | String | A 34 character string that identifies the Flex related resource responsible for the team. | Not PII |

### Schema

| Schema name                      | Type    | Description                                                                                                                                                |
| -------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TeamSetupComplete **(required)** | Boolean | Indicates team setup to be displayed in Flex UI. When set to **True**, controls whether Teams View is displayed in Flex. The default setting is **False**. |

### Example `POST` request and response

**`POST` request**

```bash
curl -X POST "https://flex-api.twilio.com/v1/Instances/{InstanceSid}/Teams/Context" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN

{
  "TeamSetupComplete": true
}
```

**Response**

```json
{
  "team_setup_complete": true
}
```
