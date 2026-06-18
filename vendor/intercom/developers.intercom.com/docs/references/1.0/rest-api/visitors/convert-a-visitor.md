# Convert a Visitor to a Lead

## Example Lead Convert Request

```curl
$ curl \\\nhttps://api.intercom.io/visitors/convert \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json' \\\n-H 'Content-Type: application/json' -d '\n{\n  \"visitor\": {\n    \"user_id\": \"8a88a590-e1c3-41e2-a502-e0649dbf721c\"\n  },\n  \"type\": \"lead\"\n}'
```

```curl
HTTP/1.1 200 Ok\n\n{\n  \"type\": \"user\",\n  \"email\": \"joe@example.com\"\n}\n# NB: Full User objects are returned
```

Visitors can be converted to Leads. This is done by passing Visitor identifiers and a type attribute set to 'lead'.