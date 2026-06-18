# Delete a Lead

## Example ID Delete Request

```curl
$ curl \\\nhttps://api.intercom.io/contacts/5811f6bbe6b4704ddfa84ac0 \\\n-X DELETE \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 Ok\n\n{\n    \"type\": \"contact\",\n    \"id\": \"5811f6bbe6b4704ddfa84ac0\",\n    \"user_id\": \"77177570-cf5d-4f1a-bc75-75202af47d4f\",\n    \"anonymous\": true,\n    \"email\": \"obrien@truth.org\",\n    \"phone\": \"00353875551234\",\n    \"name\": \"O&#39;Brien\",\n    \"pseudonym\": \"Lime Camel from Dublin\",\n  ...\n}\n# NB: Full Contact objects are returned
```

```ruby
contact = intercom.contacts.find(:id => \"530370b477ad7120001d\")\nintercom.contacts.delete(contact)
```

```java
Contact user = new Contact().setId(\"530370b477ad7120001d\");\nContact.delete(contact);
```

```php
<?php\n$intercom->leads->deleteLead(\"596f6c41a43a45f05de3275f\");\n?>
```

Leads can be deleted via their `id`, or with a `user_id` parameter.