# Tag or Untag Users, Companies & Leads (Contacts)

## Example Tag Request

```curl
$ curl https://api.intercom.io/tags \\\n-XPOST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json' \\\n-H 'Content-Type: application/json' -d'\n{\n  \"name\": \"Independent\",\n  \"users\": [\n    {\n      \"id\" : \"53427b7ecce5722303000003\"\n    },\n    {\n      \"user_id\" : \"22\"\n    },\n    {\n      \"email\" : \"a@b.com\"\n    }\n  ]\n}
```

```curl
HTTP/1.1 200 Ok\n\n{\n  \"type\": \"tag\",\n  \"name\": \"Independent\",\n  \"id\": \"17513\"\n}
```

```ruby
intercom.tags.tag(name: 'Independent', users: [{ id: \"42ea2f1b93891f6a99000427\" }, { email: \"foo@bar.com\" }])
```

```php
<?php\n# Note that you can use either id, user_id or email to tag a user.\n# You only need to use one per user, e.g. the below will tag\n# three users if each identifier is for a different, unique user\n$intercom->tags->tag([\n    \"name\" => \"VIPs\",\n    \"users\" => [\n        [\"id\" => \"5977e20941abfc5aae4552d1\"],\n        [\"user_id\" => \"12345\"],\n        [\"email\" => \"camus@phil.com\"]\n    ]\n]);\n?>
```

```java
User one = new User().setEmail(\"river@example.com\");\nUser two = new User().setEmail(\"simon@example.com\")\nList<User> users = Lists.newArrayList(one, two);\nTag.tag(tag, new UserCollection(users));
```

You can also tag users, companies, or leads (contacts) using a `POST` to `https://api.intercom.io/tags`. This lets you assign a tag to multiple users or companies at once. If the tag does not already exist it will be created for you.

Users can be tagged by supplying a `users` array. The array contains objects identifying users by their `id`, `email` or `user_id` fields.

Companies can be tagged by sending a `companies` array. The array contains objects identifying companies by their `id`or `company_id` fields.

Contacts/Leads can be tagged by supplying a `users` array. The array contains objects identifying leads by their `id` fields.

Companies and user tag directives cannot be mixed in the same request - a request will not process both company and user arrays.

We recommend tagging no more than 50 users at a time as larger amounts could result in a timeout.

**Example Untag Request**

```curl
$ curl https://api.intercom.io/tags \
-XPOST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' -d'
{
  "name": "Independent",
  "users": [
    {
      "id" : "53427b7ecce5722303000003",
      "untag": true
    },
    {
      "user_id" : "22"
    }
  ]
}
```

```ruby
intercom.tags.untag(name: 'blue', users: [{ id: "42ea2f1b93891f6a99000427" }])
```

```php
<?php
$intercom->tagUsers(array(
  "name" => "Independent",
  "users" => array(
    array("user_id" => "22", "untag" => true)
  )
));
?>
```

```java
User user = new User()
  .setEmail("simon@example.com")
  .untag();
List<User> users = Lists.newArrayList(user);
Tag.tag(tag, new UserCollection(users));
```

```curl
HTTP/1.1 200 Ok

{
  "type": "tag",
  "name": "Follow Up",
  "id": "17513"
}
```

To untag a company or user, each user or company object sent in the tagging request can be submitted with an `untag` field whose value is set to `true`.

Objects submitted with an `untag` field can be mixed with other objects being tagged. This allows tag and untag operations to be performed in a single request.

The default behaviour if `untag` is not suppled is to tag the object. Setting the `untag`value to `false` is the same as requesting the object be tagged.

### Attributes

| Attribute | Required | Description |
|  --- | --- | --- |
| name | required | The name of the tag, which will be created if not found. |
| users | optional | An array of objects identifying users. |
| companies | optional | An array of objects identifying companies. |


### Returns

The tag object containing its `name` and `id` fields.