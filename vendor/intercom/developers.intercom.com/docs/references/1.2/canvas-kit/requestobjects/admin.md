# Admin

The admin object provides information on the Intercom teammate.

```json
{
  admin: {
    type: "admin",
    id: "814860",
    name: "IntercomTest",
    email: "theadmin@example.com",
    job_title: "Existentialist",
    away_mode_enabled: false,
    away_mode_reassign: false,
    avatar: {
      image_url: "https://static.site.test.icon"
    },
    team_ids: [
      814865
    ]
  }
}
```

| Key | Type | Description |
|  --- | --- | --- |
| type | string | Value will always be 'admin'. |
| id | string | The id of the admin. |
| name | string | The name of the admin. |
| email | string | The email address of the admin. |
| job_title | string | The job title of the admin. |
| away_mode_enabled | boolean | Identifies if this admin is currently set in away mode. |
| away_mode_reassign | boolean | Identifies if this admin has currently set replies to assigned conversations to go automatically into the workspaces default inbox. |
| avatar | object | Contains an 'image_url' string attribute within. |
| team_ids | array[integer] | This is a list of teams id's that the admin is a part of. Only set if the type is 'admin'. |