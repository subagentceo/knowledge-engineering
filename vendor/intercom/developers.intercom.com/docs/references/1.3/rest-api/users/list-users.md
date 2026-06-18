# List Users

## Overview

### Request Parameters

You can optionally request the result page size and which page to fetch as follows:

| Parameter | Required? | Works with... | Description |
|  --- | --- | --- | --- |
| page | no | All, Email, Phone | What page of results to fetch. *Defaults to first page*. |
| per_page | no | All, Email, Phone | How many results per page. *Defaults to 50*, *Max is 60*. |
| order | no | All | Returns the users in ascending or descending order. Valid values: `asc` or `desc`. *Defaults to desc*. |
| sort | no | All | What field to sort the results by. Valid values: `created_at`,  `last_request_at`,  `signed_up_at`,  `updated_at`. |
| created_since | no | All | Limits results to users that were created in that last number of days. |


### Returns

A pageable list of users. The user list contains a `pages` object that indicates if more users exist via the `next` field, whose value is a URL that can be used to fetch the next page. If the `next` field is not present, that indicates there are no further users in the list.

When using the Users endpoint and the pages object to iterate through the returned users, there is a limit of 10,000 Users that can be returned. If you need to list or iterate on more than 10,000 Users, please use the [Scroll API](https://developers.intercom.io/reference#iterating-over-all-users).

## List all Users

## List all Users

```curl
$ curl https://api.intercom.io/users \\-H 'Authorization:Bearer <Your access token>' \\-H 'Accept: application/json'
```

```curl
HTTP/1.1 200 OK{  \"type\": \"user.list\",  \"total_count\": 105,  \"users\": [    {      \"type\": \"user\",      \"id\": \"530370b477ad7120001d\",       ...     },     ...   ],  \"pages\": {    \"next\": \"https://api.intercom.io/users?per_page=50&page=2\",    \"page\": 1,    \"per_page\": 50,    \"total_pages\": 3  }}# NB: Full User objects are returned
```

```ruby
intercom.users.all.each { ... }
```

```php
<?php$intercom->users->getUsers([]);$users= $intercom->users->getUsers([]);foreach ($users->users as $user) {    print_r($user->id);    echo \"\\";}?>
```

```java
UserCollection users = User.list();// get first page...List<User> items = users.getPageItems();// ...or iterate over all pageswhile (users.hasNext()) {    out.println(users.next().getId());}
```

You can fetch a list of all users. The user list is sorted by the `created_at` field and by default is ordered descending, most recently created first.

## List Users by Email

## List by Email

```curl
$ curl https://api.intercom.io/users?email=test@test.com \
-H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
-H 'Accept: application/json'
```

```http
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

You can fetch Users with a given email by querying the users resource with an `email` parameter.

The `email` parameter value should be [url encoded](http://en.wikipedia.org/wiki/Percent-encoding) when sending.

## List Users by Phone

## List by Phone

```curl
$ curl https://api.intercom.io/users?phone=00353876543210 \
-H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
-H 'Accept: application/json'
```

```http
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
            "phone": "00353876543210"
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
            "phone": "00353876543210"
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
						"phone": "00353876543210"
            ....
            ....
        }
    ]
}
```

You can fetch Users with a given phone number by querying the users resource with a `phone` parameter.