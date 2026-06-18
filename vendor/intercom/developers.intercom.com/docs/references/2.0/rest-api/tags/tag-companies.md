# Tag companies

## Example Request & Response

```curl
$ curl https://api.intercom.io/tags \
-XPOST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' -d'
{
  "name": "Independent",
  "companies": [
    {
      "id" : "53427b7ecce5722303000003"
    }
  ]
}
```

```curl
HTTP/1.1 200 Ok

{
  "type": "tag",
  "name": "Independent",
  "id": "17513"
}
```

```ruby
intercom.tags.tag(name: 'Independent', users: [{ id: "42ea2f1b93891f6a99000427" }, { email: "foo@bar.com" }])
```

```php
<?php
# Note that you can use either id, user_id or email to tag a user.
# You only need to use one per user, e.g. the below will tag
# three users if each identifier is for a different, unique user
$intercom->tags->tag([
    "name" => "VIPs",
    "users" => [
        ["id" => "5977e20941abfc5aae4552d1"],
        ["user_id" => "12345"],
        ["email" => "camus@phil.com"]
    ]
]);
?>
```

```java
User one = new User().setEmail("river@example.com");
User two = new User().setEmail("simon@example.com")
List<User> users = Lists.newArrayList(one, two);
Tag.tag(tag, new UserCollection(users));
```

You can tag a single or a list of companies.

### Request Body Parameters

| Parameters | Type | Required | Description |
|  --- | --- | --- | --- |
| name | String | Yes | The name of the tag, which will be created if not found. |
| companies | Object | Yes | An array of objects with the unique `id` or `company_id` of the company to be tagged. |


### Response

This will return a [Tag Model](/docs/references/2.0/rest-api/tags/tag-model) for the tag that was applied to the given company.### Response

This will return a [Tag Model](/docs/references/2.0/rest-api/tags/tag-model) for the tag that was applied to the given company.