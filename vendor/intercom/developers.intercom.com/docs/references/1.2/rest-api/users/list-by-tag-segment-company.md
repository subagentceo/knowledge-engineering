# List by Tag, Segment, Company

## Example Tag Request

```curl
$ curl https://api.intercom.io/users?tag_id=3142 \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```ruby
intercom.users.find_all({ :tag_id => '30126' })
```

```php
<?php
$user = $intercom->users->getUsers(["tag_id" => '730128']);
print_r($user->users[0]->email);
echo "\n";
?>
```

```java
Map<String, String> params = Maps.newHashMap();
params.put("tag_id", "30126");
UserCollection users = User.list(params);
while (users.hasNext()) {
    out.println(users.next().getId());
}
```

## Example Segment Request

```curl
$ curl https://api.intercom.io/users?segment_id=5926 \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK\n\n{\n  \"type\": \"user.list\",\n  \"total_count\": 105,\n  \"users\": [\n    {\n      \"type\": \"user\",\n      \"id\": \"530370b477ad7120001d\",\n       ...\n     },\n     ...\n  ],\n  \"pages\": {\n    \"next\": \"https://api.intercom.io/users?tag_id=3142&per_page=50&page=2\",\n    \"page\": 1,\n    \"per_page\": 50,\n    \"total_pages\": 3\n  }\n}\n\n# NB: Full User objects are returned
```

```ruby
intercom.users.find_all({ :segment_id => '30126' })
```

```php
<?php\n$user = $intercom->users->getUsers([\"segment_id\" => '58135df83917e42135b2ea29']);\nprint_r($user->users[0]->id);\necho \"\\n\";\n?>
```

```java
Map<String, String> params = Maps.newHashMap();\nparams.put(\"segment_id\", \"30126\");\nUserCollection users = User.list(params);\nwhile (users.hasNext()) {\n    out.println(users.next().getId());\n}
```

You can fetch segmented users/leads by querying the users resource with a `segment_id` parameter, indicating the `id` of the segment to query with.

To fetch tagged users/leads, you can use a `tag_id` parameter to indicate the `id` of the tag. For information on tagging users see the section [Tag or Untag Users, Companies & Leads (Contacts)](https://developers.intercom.com/docs/references/1.2/rest-api/tags/tag-or-untag-users-companies-leads-contacts/).

Note that you can not combine tag and segment parameters in the same request.

To list users belonging to a company, you can use the companies API. See the section [List Company Users](https://developers.intercom.com/docs/references/1.2/rest-api/companies/list-company-users/) for details.

### Request Parameters

| Parameter | Required | Description |
|  --- | --- | --- |
| tag_id | no | The `id` of the tag to filter by. |
| segment_id | no | The `id` of the segment to filter by. |


### Returns

A pageable list of users and leads.

Like a plain company list, the result contains a `pages` object that indicates if more users exist via the `next` field.