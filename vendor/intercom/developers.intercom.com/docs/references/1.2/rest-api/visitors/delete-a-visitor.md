# Delete a visitor

## Example ID Delete Request

```curl
$ curl \\\nhttps://api.intercom.io/visitors/5321a20f72cdbb4192000013 \\\n-X DELETE \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 Ok\n\n{\n  \"type\": \"visitor\",\n  \"id\": \"530370b477ad7120001d\",\n  \"user_id\": \"8a88a590-e1c3-41e2-a502-e0649dbf721c\"\n  ...\n}\n# NB: Full Visitor objects are returned
```