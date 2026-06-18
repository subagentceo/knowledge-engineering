# Convert a Lead

## Example Lead Convert Request

```curl
$ curl \\\nhttps://api.intercom.io/contacts/convert \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json' \\\n-H 'Content-Type: application/json' -d '\n{\n  \"contact\": {\n    \"user_id\": \"8a88a590-e1c3-41e2-a502-e0649dbf721c\"\n  },\n  \"user\": {\n    \"email\": \"joe@example.com\"\n  }\n}'
```

```curl
HTTP/1.1 200 Ok\n\n{\n  \"type\": \"user\",\n  \"email\": \"joe@example.com\"\n}\n# NB: Full User objects are returned
```

```ruby
intercom.contacts.convert(contact, user)
```

```php
<?php\n$response = $intercom->leads->convertLead([\n    \"contact\" => [\n        \"user_id\" => \"8a88a590-e1c3-41e2-a502-e0649dbf721c\"\n    ],\n    \"user\" => [\n        \"email\" => \"joe@example.com\"\n    ]\n]);\nprint_r($response)\n?>
```

```java
User converted = Contact.convert(contact, user);
```

Leads can be converted to Users. This is done by passing both Lead and User identifiers. If the User exists, then the Lead will be merged into it, the Lead deleted and the User returned. If the User does not exist, the Lead will be converted to a User, with the User identifiers replacing it's Lead identifiers.

Identifiers (id, user_id, email) from Leads are never added onto Users with a *merge*.

A Lead's email, but not user_id is retained when converting a Lead to a new User.