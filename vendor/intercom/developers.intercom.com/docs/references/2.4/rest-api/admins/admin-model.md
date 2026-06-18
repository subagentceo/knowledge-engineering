# The admin model

## Example Object

```json
{
    "type": "admin",
    "id": "493881",
    "name": "Joe Example",
    "email": "email@example.com",
    "job_title": "Example Associate",
    "away_mode_enabled": false,
    "away_mode_reassign": false,
    "has_inbox_seat": true,
    "team_ids": [
        814865
    ],
    "avatar": "https://picsum.photos/200/300"
}
```

Admins are the teammate accounts that have access to a workspace.

### Admin Object

| Key | Type | Description |
|  --- | --- | --- |
| type | string | Value is `admin`. |
| id | string | The id of the admin |
| name | string | The name of the admin |
| email | string | The email address of the admin |
| job_title | string | The job title of the admin |
| away_mode_enabled | boolean | Identifies if this admin is currently set in away mode. |
| away_mode_reassign | boolean | Identifies if this admin is set to automatically reassign new conversations to the apps default inbox. |
| has_inbox_seat | boolean | Identifies if a teammate has a paid inbox seat to restrict/allow features that require them |
| team_ids | list | This is a list of teams id's that you are part of |
| avatar | url | Image for the associated team or teammate |


Information on `has_inbox_seat`
As inbox seats are a new feature with our new pricing plans, **customers not migrated to our new pricing will have `has_inbox_seat` set to `true`**.

**We only check if the teammate making the API call has seats**, not the app itself, nor all admins within the app.

**If an admin `has_inbox_seats` set to `false`, then certain calls will fail**, such as:

- [Setting an admin to have away mode and/or to reassign conversations](/docs/references/2.4/rest-api/admins/set-admin-away-mode)
- [Assigning a conversation to an admin or a team](/docs/references/2.4/rest-api/conversations/reply-to-a-conversation)
- [Adding or removing another customer to a group conversation](/docs/references/2.4/rest-api/conversations/adding-to-group-conversations-as-admin)


If it fails, we let the developer know by **returning a 403 Forbidden error, alongside a clarifying error code/message** such as the one below.

## Errors for admins without inbox seats

### JSON

```json
{
  "type": "error.list",
  "request_id": "0002miv9og586ig3aln0",
  "errors": [
    {
      "code": "action_forbidden",
      "message": "This admin does not have Inbox access permissions"
    }
  ]
}
```