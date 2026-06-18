# Create Lead

## Example Request

```curl
$ curl https://api.intercom.io/contacts \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json' \\\n-H 'Content-Type: application/json' -d '\n{\n  \"phone\": \"123987456\",\n  \"email\": \"joe@example.com\",\n  \"name\": \"Joe Example\"\n}'\n\n
```

```curl
HTTP/1.1 200 OK\n\n# lead response\n\n{\n    \"type\": \"contact\",\n    \"id\": \"5811f6bbe6b4704ddfa84ac0\",\n    \"user_id\": \"77177570-cf5d-4f1a-bc75-75202af47d4f\",\n    \"anonymous\": true,\n    \"email\": \"joe@example.com\",\n    \"phone\": \"00353875551234\",\n    \"name\": \"Joe Example\",\n    \"pseudonym\": \"Lime Camel from Dublin\",\n    \"avatar\": {\n        \"type\": \"avatar\",\n        \"image_url\": null\n    },\n    \"app_id\": \"ja43hiec\",\n    \"companies\": {\n        \"type\": \"company.list\",\n        \"companies\": []\n    },\n    \"location_data\": {\n        \"type\": \"location_data\",\n        \"city_name\": \"Mukilteo\",\n        \"continent_code\": \"NA\",\n        \"country_name\": \"United States\",\n        \"postal_code\": \"98275\",\n        \"region_name\": \"Washington\",\n        \"timezone\": \"America/Los_Angeles\",\n        \"country_code\": \"USA\"\n    },\n    \"last_request_at\": 1477660267,\n    \"created_at\": 1477572283,\n    \"remote_created_at\": null,\n    \"signed_up_at\": null,\n    \"updated_at\": 1480067287,\n    \"session_count\": 0,\n    \"social_profiles\": {\n        \"type\": \"social_profile.list\",\n        \"social_profiles\": []\n    },\n    \"unsubscribed_from_emails\": false,\n    \"tags\": {\n        \"type\": \"tag.list\",\n        \"tags\": []\n    },\n    \"utm_campaign\": null,\n    \"utm_content\": null,\n    \"utm_medium\": null,\n    \"utm_source\": null,\n    \"utm_term\": null,\n    \"segments\": {\n        \"type\": \"segment.list\",\n        \"segments\": []\n    },\n    \"custom_attributes\": {\n        \"paid_subscriber\": true,\n        \"monthly_spend\": 155.5,\n        \"team_mates\": 9\n    }\n}
```

```ruby
intercom.contacts.create(:email => \"joe@example.com\")
```

```java
import static io.intercom.api.CustomAttribute.*;\n\nContact contact = new Contact()\n    .setEmail(\"joe@example.com\");\ncontact = Contact.create(contact);
```

```php
<?php\n$intercom->leads->create([\"email\" => \"socrates@phil.com\"]);\n?>
```

Leads can be created via a `POST` method to `https://api.intercom.io/contacts`, which accepts a JSON object describing the lead.

No identifying information is required to create a Lead, Intercom assigns a `user_id` to each new Lead. Indeed, it is not possible to assign these through the API - to work with self-assigned user_ids, use the [Users resource](/docs/references/1.2/rest-api/users/users).

Contrary to Users, `signed_up_at` and sessions are not available for Leads. Otherwise, attributes to update on a Lead are the same as for a User.

Note that as with Users, user agent data is submitted as `last_seen_user_agent`.