# Create and Update Tags

```curl
$ curl https://api.intercom.io/tags \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json' \\\n-H 'Content-Type: application/json' -d'\n{\n  \"name\": \"Independent\"\n}'
```

```curl
HTTP/1.1 200 Ok\n\n{\n  \"type\": \"tag\",\n  \"name\": \"Independent\",\n  \"id\": \"17513\"\n}
```

```ruby
intercom.tags.tag(name: 'Independent', users: [{ id: \"42ea2f1b93891f6a99000427\" }])
```

```php
<?php\n$intercom->tags->tag([\"name\" => \"php-tag\"]);\n?>
```

```java
Tag t = new Tag().setName(\"Independent\");\nt = Tag.create(t);
```

```curl
$ curl https://api.intercom.io/tags \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json' \\\n-H 'Content-Type: application/json' -d'\n{\n  \"id\": \"17513\",\n  \"name\": \"Independent\"\n}'
```

```curl
HTTP/1.1 200 Ok\n\n{\n  \"type\": \"tag\",\n  \"name\": \"Independent\",\n  \"id\": \"17513\"\n}
```

```ruby
intercom.tags.tag(name: 'Independent', users: [ { id: \"42ea2f1b93891f6a99000427\" } ])
```

```php
<?php\n$intercom->tags->tag([\"id\" => \"1160078\", \"name\" => \"php-tag-new\"]);\n?>
```

```java
tag.setName(\"independent\");\nTag.update(tag);
```

You can create a new tag by submitting a `POST` to `https://api.intercom.io/tags` along with a `name` for the tag. The tag name may contain whitespace and punctuation.

If the same tag name is sent multiple times, only one tag will be created for that name - this lets you avoid checking if a tag exists first.

Tag names are case insensitive - 'MyTag' and 'mytag' will result in a single tag being created.

A tag's name can also be updated by posting a tag to `https://api.intercom.io/tags`. The submitted tag object will contain the `id` of the tag to update and a new name for the tag. A successful request will update the name value for that tag and return the updated tag in the response.

### Attributes

| Attribute | Required | Description |
|  --- | --- | --- |
| name | Yes | The name of the tag, which will be created if not found, or the new name for the tag if this is an update request. |
| id | Yes for update | The id of tag to updates. |


### Returns

The newly created or updated tag object containing its `name` and `id` fields.