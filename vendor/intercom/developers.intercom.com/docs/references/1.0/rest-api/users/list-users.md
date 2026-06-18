# List Users

## List Users Example

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

You can fetch a list of users. The user list is sorted by the `created_at` field and by default is ordered descending, most recently created first.

### Request Parameters

You can optionally request the result page size and which page to fetch as follows -

| Parameter | Required | Description |
|  --- | --- | --- |
| page | no | what page of results to fetch *defaults to first page*. |
| per_page | no | how many results per page *defaults to 50*, *max is 60*. |
| order | no | `asc` or `desc`. Return the users in ascending or descending order. *defaults to desc*. |
| sort | no | what field to sort the results by. Valid values: `created_at`,  `last_request_at`,  `signed_up_at`,  `updated_at`, |
| created_since | no | limit results to users that were created in that last number of days. |


### Returns

A pageable list of users. The user list contains a `pages` object that indicates if more users exist via the `next` field, whose value is a URL that can be used to fetch the next page. If the `next` field is not present, that indicates there are no further users in the list.

When using the Users endpoint and the pages object to iterate through the returned users, there is a limit of 10,000 Users that can be returned. If you need to list or iterate on more than 10,000 Users, please use the [Scroll API](https://developers.intercom.io/reference#iterating-over-all-users).

A pageable list of users. The user list contains a `pages` object that indicates if more users exist via the `next` field, whose value is a URL that can be used to fetch the next page. If the `next` field is not present, that indicates there are no further users in the list.

When using the Users endpoint and the pages object to iterate through the returned users, there is a limit of 10,000 Users that can be returned. If you need to list or iterate on more than 10,000 Users, please use the [Scroll API](https://developers.intercom.io/reference#iterating-over-all-users).