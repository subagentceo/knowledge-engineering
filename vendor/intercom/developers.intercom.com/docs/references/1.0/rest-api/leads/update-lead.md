# Update Lead

## Example Request

```curl
$ curl https://api.intercom.io/contacts \\\n-XPOST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json' \\\n-H 'Content-Type: application/json' -d '\n{\n  \"id\": \"5811f6bbe6b4704ddfa84ac0\",\n  \"user_id\": \"77177570-cf5d-4f1a-bc75-75202af47d4f\",\n  \"phone\": \"123987456\",\n  \"email\": \"obrien@truth.org\",\n  \"name\": \"OBrien\",\n  \"last_seen_user_agent\": \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9\",\n  \"custom_attributes\": {\n    \"paid_subscriber\" : true,\n    \"monthly_spend\": 155.5,\n    \"team_mates\": 9\n  }\n}'
```

```curl
HTTP/1.1 200 OK\n{\n    \"type\": \"contact\",\n    \"id\": \"5811f6bbe6b4704ddfa84ac0\",\n    \"user_id\": \"77177570-cf5d-4f1a-bc75-75202af47d4f\",\n    \"anonymous\": true,\n    \"email\": \"obrien@truth.org\",\n    \"phone\": \"00353875551234\",\n    \"name\": \"OBrien\",\n    \"pseudonym\": \"Lime Camel from Dublin\",\n    \"avatar\": {\n        \"type\": \"avatar\",\n        \"image_url\": null\n    },\n    \"app_id\": \"ja43hiec\",\n    \"companies\": {\n        \"type\": \"company.list\",\n        \"companies\": []\n    },\n    \"location_data\": {\n        \"type\": \"location_data\",\n        \"city_name\": \"Mukilteo\",\n        \"continent_code\": \"NA\",\n        \"country_name\": \"United States\",\n        \"latitude\": 47.913,\n        \"longitude\": -122.3042,\n        \"postal_code\": \"98275\",\n        \"region_name\": \"Washington\",\n        \"timezone\": \"America/Los_Angeles\",\n        \"country_code\": \"USA\"\n    },\n    \"last_request_at\": 1477660267,\n    \"last_seen_ip\": null,\n    \"created_at\": 1477572283,\n    \"remote_created_at\": null,\n    \"signed_up_at\": null,\n    \"updated_at\": 1480068674,\n    \"session_count\": 0,\n    \"social_profiles\": {\n        \"type\": \"social_profile.list\",\n        \"social_profiles\": []\n    },\n    \"unsubscribed_from_emails\": false,\n    \"user_agent_data\": \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9\",\n    \"tags\": {\n        \"type\": \"tag.list\",\n        \"tags\": []\n    },\n    \"segments\": {\n        \"type\": \"segment.list\",\n        \"segments\": []\n    },\n    \"custom_attributes\": {\n        \"paid_subscriber\": true,\n        \"monthly_spend\": 155.5,\n        \"team_mates\": 9\n    }\n}\n# contact response
```

```ruby
contact.name = \"Joe Example\"\nintercom.contacts.save(contact)
```

```java
contact.setName(\"Joe Example\");\nContact updated = Contact.update(contact);
```

```php
<?php\n$intercom->leads->create([\n    \"id\" => \"596f6b60d797879302bd7ac1\",\n    \"phone\" => \"5552345657\"\n]);\n?>
```

Sending a POST request to `/contacts` and passing identifiers (user_id or id) in the body will result in an update of an existing Lead.

It is not possible to uniquely identify a Lead for an update with an email address.