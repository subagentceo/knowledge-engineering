# View a Lead

## Example ID Request

```curl
$ curl \\\nhttps://api.intercom.io/contacts/5811f6bbe6b4704ddfa84ac0 \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'\n\nor \n\n$ curl \\\n-s https://api.intercom.io/contacts?user_id=77177570-cf5d-4f1a-bc75-75202af47d4f \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK\n\n{\n    \"type\": \"contact\",\n    \"id\": \"5811f6bbe6b4704ddfa84ac0\",\n    \"user_id\": \"77177570-cf5d-4f1a-bc75-75202af47d4f\",\n    \"anonymous\": true,\n    \"email\": \"obrien@truth.org\",\n    \"phone\": \"00353875551234\",\n    \"name\": \"O&#39;Brien\",\n    \"pseudonym\": \"Lime Camel from Dublin\",\n  ...\n}\n# NB: Full Lead objects are returned
```

```ruby
contact = intercom.contacts.find(:id => \"530370b477ad7120001d\")\ncontact = intercom.contacts.find(:user_id => \"8a88a590-e1c3-41e2-a502-e0649dbf721c\")
```

```java
Contact contact = Contact.findByID(\"530370b477ad7120001d\");\ncontact = Contact.findByUserID(\"8a88a590-e1c3-41e2-a502-e0649dbf721c\");
```

```php
<?php\n$lead = $intercom->leads->getLead(\"596f6b60d797879302bd7ac1\");\nprint_r($lead->email);\n?>\n\nor\n<?php\n// Rememebr that user_ids for leads are \n// generated automatically so look different \n// from the user_ids you manually create for users\n$lead = $intercom->leads->\n    getLead(\"\", [\"user_id\" => \"ce12a681-e3d4-4a17-bbde-fe85e04ca3ef\"]);\nprint_r($lead);\n?>\n
```

Leads can be looked up individually via their `id`, with a `user_id` parameter, or with a `phone` parameter.

user_id for leads
Remember that for leads the user_id will be automatically generated so it will look something like '8a88a590-e1c3-41e2-a502-e0649dbf721c'. (Note that this user_id is not retained when converting a lead to a user) For users the user_id is manually set so it will generally appear more like a regular number series e.g. '234'.