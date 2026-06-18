# List by Phone

## Example Request

```curl
$ curl \\\nhttps://api.intercom.io/contacts?phone=00353875551234 \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```curl
{\n    \"type\": \"contact.list\",\n    \"pages\": {\n        \"type\": \"pages\",\n        \"next\": null,\n        \"page\": 1,\n        \"per_page\": 50,\n        \"total_pages\": 1\n    },\n    \"contacts\": [\n        {\n            \"type\": \"contact\",\n            \"id\": \"5811f6bbe6b4704ddfa84ac0\",\n            \"user_id\": \"77177570-cf5d-4f1a-bc75-75202af47d4f\",\n            \"anonymous\": true,\n            \"email\": \"obrien@truth.org\",\n            \"phone\": \"00353875551234\",\n            \"name\": \"O&#39;Brien\",\n            \"pseudonym\": \"Lime Camel from Dublin\",\n            \"avatar\": {\n                \"type\": \"avatar\",\n                \"image_url\": null\n            },\n            \"app_id\": \"ja43hiec\",\n            \"companies\": {\n                \"type\": \"company.list\",\n                \"companies\": []\n            },\n            \"location_data\": {\n                \"type\": \"location_data\",\n                \"city_name\": \"Mukilteo\",\n                \"continent_code\": \"NA\",\n                \"country_name\": \"United States\",\n                \"latitude\": 47.913,\n                \"longitude\": -122.3042,\n                \"postal_code\": \"98275\",\n                \"region_name\": \"Washington\",\n                \"timezone\": \"America/Los_Angeles\",\n                \"country_code\": \"USA\"\n            },\n            \"last_request_at\": 1477660267,\n            \"last_seen_ip\": \"1.2.3.4\",\n            \"created_at\": 1477572283,\n            \"remote_created_at\": null,\n            \"signed_up_at\": null,\n            \"updated_at\": 1480068674,\n            \"session_count\": 0,\n            \"social_profiles\": {\n                \"type\": \"social_profile.list\",\n                \"social_profiles\": []\n            },\n            \"unsubscribed_from_emails\": false,\n            \"user_agent_data\": \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9\",\n            \"tags\": {\n                \"type\": \"tag.list\",\n                \"tags\": []\n            },\n            \"segments\": {\n                \"type\": \"segment.list\",\n                \"segments\": []\n            },\n            \"custom_attributes\": {\n                \"paid_subscriber\": true,\n                \"monthly_spend\": 155.5,\n                \"team_mates\": 9\n            }\n        }\n    ],\n    \"total_count\": 1,\n    \"limited\": false\n}
```

```ruby
contacts = intercom.contacts.find_all(email: \"joe@example.com\")
```

```java
ContactCollection contacts = Contact.listByEmail(\"joe@example.com\");\n\n// get first page...\nList<Contact> items = contacts.getPageItems();\n\n// ...or iterate over all pages\nwhile (contacts.hasNext()) {\n    out.println(contacts.next().getID());\n}
```

```php
<?php\n$leads= $intercom->leads->getLeads(['email' => 'socrates@phil.com']);\nforeach ($leads->contacts as $lead) {\n    print_r($lead->id);\n    echo \"\\n\";\n}?>
```

You can fetch all Leads with a given phone number by querying the leads resource with a `phone` parameter.