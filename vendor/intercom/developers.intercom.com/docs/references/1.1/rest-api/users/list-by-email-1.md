# List by Email

## List Users by Email

```curl
$ curl https://api.intercom.io/users?email=test@test.com \
-H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
-H 'Accept: application/json' \
-H 'Intercom-Version: 1.1'
```

```curl
HTTP/1.1 200 OK

{
    "limited": false,
    "pages": {
        "next": null,
        "page": 1,
        "per_page": 50,
        "total_pages": 1,
        "type": "pages"
    },
    "total_count": 3,
    "type": "user.list",
    "users": [
        {
            "anonymous": false,
            "app_id": "fyq3wodw",
            "created_at": 1506339558,
            "custom_attributes": {},
            "do_not_track": null,
            "email": "test@test.com",
            "has_hard_bounced": false,
            "id": "45c8eae6fac10f5584e7508e",
            "last_request_at": 1529737920,
            "last_seen_ip": "78.144.182.179",
            ....
            ....
        },
        {
            "anonymous": true,
            "app_id": "fyq3wodw",
            "created_at": 1503488750,
            "custom_attributes": {},
            "do_not_track": null,
            "email": "test@test.com",
            "has_hard_bounced": false,
            "id": "5123d6aeeda850883ed8ba7c2",
            "last_request_at": 1503488749,
            ....
            ....
        },
        {
            "anonymous": false,
            "app_id": "fyq3wodw",
            "created_at": 1494940172,
            "custom_attributes": {},
            "do_not_track": null,
            "email": "test@test.com",
            "has_hard_bounced": false,
            "id": "789afa0cb781d52fd3044ecc",
            "last_request_at": 1494940211,
            ....
            ....
        }
    ]
}
```

```ruby
{
    "limited": false,
    "pages": {
        "next": null,
        "page": 1,
        "per_page": 50,
        "total_pages": 0,
        "type": "pages"
    },
    "total_count": 0,
    "type": "user.list",
    "users": []
}
```

You can list users by email to find all users with the same email address.

### Request Parameters

You can optionally request the result page size and which page to fetch as follows -

| Parameter | Required | Description |
|  --- | --- | --- |
| page | no | what page of results to fetch *defaults to first page*. |
| per_page | no | how many results per page *defaults to 50*, *max is 60*. |


### Returns

A pageable list of users **and** contacts. (This functionality has been changed in version 1.2 to return users only. See [Changelog](https://developers.intercom.com/build-an-integration/v1.0/docs/api-changelog) for more detail) The user list contains a `pages` object that indicates if more users exist via the `next` field, whose value is a URL that can be used to fetch the next page. If the `next` field is not present, that indicates there are no further users in the list.