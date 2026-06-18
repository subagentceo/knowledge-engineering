# Convert a Visitor to a User

**Example User Convert Request**

```curl
$ curl \\\nhttps://api.intercom.io/visitors/convert \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json' \\\n-H 'Content-Type: application/json' -d '\n{\n  \"visitor\": {\n    \"user_id\": \"8a88a590-e1c3-41e2-a502-e0649dbf721c\"\n  },\n  \"user\": {\n    \"email\": \"joe@example.com\"\n  },\n  \"type\": \"user\"\n}'\n
```

```curl
# NB: Full User objects are returned\n{\n  \"type\": \"lead\",\n  \"user_id\": \"8a88a590-e1c3-41e2-a502-e0649dbf721c\"\n}
```

Visitors can also be converted to Users. This is done by passing both Visitor and User identifiers and a type attribute set to 'user'.
If the User exists, then the Visitor will be merged into it, the Visitor deleted and the User returned. If the User does not exist, the Visitor will be converted to a User, with the User identifiers replacing it's Visitor identifiers.

Identifiers (id, user_id, email) from Visitors are never added onto Users with a *merge*.

A Visitor email, but not user_id is retained when converting a Visitor to a new User.