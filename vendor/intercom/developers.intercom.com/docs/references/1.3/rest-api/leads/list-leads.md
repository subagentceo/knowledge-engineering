# List Leads

## List all Leads

## List all Leads

```curl
$ curl https://api.intercom.io/contacts \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json'
```

```http
HTTP/1.1 200 OK\n\n{\n  \"type\": \"contact.list\",\n  \"total_count\": 105,\n  \"contacts\": [\n    {\n      \"type\": \"contact\",\n      \"id\": \"530370b477ad7120001d\",\n       ...\n     },\n     ...\n   ],\n  \"pages\": {\n    \"next\": \"https://api.intercom.io/contacts?per_page=50&page=2\",\n    \"page\": 1,\n    \"per_page\": 50,\n    \"total_pages\": 3\n  }\n}\n\n# NB: Full Contact objects are returned
```

```ruby
intercom.contacts.all.each { ... }
```

```php
<?php\n$leads= $intercom->leads->getLeads([]);\nforeach ($leads->contacts as $lead) {\n    print_r($lead->id);\n    echo \"\\n\";\n}\n?>
```

```java
ContactCollection contacts = Contact.list();\n\n// get first page...\nList<Contact> items = contacts.getPageItems();\n\n// ...or iterate over all pages\nwhile (contacts.hasNext()) {\n    out.println(contacts.next().getID());\n}
```

You can fetch a list of all leads. The lead list is sorted by the `created_at` field and by default is ordered descending, most recently created first. Apart from sorting, the same parameters for the [User list](#list-users) apply here.

## List Leads by Email

## List by Email

```curl
$ curl https://api.intercom.io/contacts?email=obrien@truth.org \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```http
HTTP/1.1 200 OK

{
    "type": "contact.list",
    "pages": {
        "type": "pages",
        "next": null,
        "page": 1,
        "per_page": 50,
        "total_pages": 1
    },
    "contacts": [
        {
            "type": "contact",
            "id": "5811f6bbe6b4704ddfa84ac0",
            "user_id": "77177570-cf5d-4f1a-bc75-75202af47d4f",
            "anonymous": true,
            "email": "obrien@truth.org",
            "phone": "00353875551234",
            "name": "O&#39;Brien",
            "pseudonym": "Lime Camel from Dublin",
            "avatar": {
                "type": "avatar",
                "image_url": null
            },
            "app_id": "ja43hiec",
            "companies": {
                "type": "company.list",
                "companies": []
            },
            "location_data": {
                "type": "location_data",
                "city_name": "Mukilteo",
                "continent_code": "NA",
                "country_name": "United States",
                "latitude": 47.913,
                "longitude": -122.3042,
                "postal_code": "98275",
                "region_name": "Washington",
                "timezone": "America/Los_Angeles",
                "country_code": "USA"
            },
            "last_request_at": 1477660267,
            "last_seen_ip": "1.2.3.4",
            "created_at": 1477572283,
            "remote_created_at": null,
            "signed_up_at": null,
            "updated_at": 1480068674,
            "session_count": 0,
            "social_profiles": {
                "type": "social_profile.list",
                "social_profiles": []
            },
            "unsubscribed_from_emails": false,
            "user_agent_data": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9",
            "tags": {
                "type": "tag.list",
                "tags": []
            },
            "segments": {
                "type": "segment.list",
                "segments": []
            },
            "custom_attributes": {
                "paid_subscriber": true,
                "monthly_spend": 155.5,
                "team_mates": 9
            }
        }
    ],
    "total_count": 1,
    "limited": false
}
```

```ruby
contacts = intercom.contacts.find_all(email: "joe@example.com")
```

```java
ContactCollection contacts = Contact.listByEmail("joe@example.com");

// get first page...
List<Contact> items = contacts.getPageItems();

// ...or iterate over all pages
while (contacts.hasNext()) {
    out.println(contacts.next().getID());
}
```

```php
<?php
$leads= $intercom->leads->getLeads(['email' => 'socrates@phil.com']);
foreach ($leads->contacts as $lead) {
    print_r($lead->id);
    echo "\n";
}?>
```

You can fetch Leads with a given email by querying the leads resource with an `email` parameter.

## List Leads by Phone

## List by Phone

```curl
$ curl \\\nhttps://api.intercom.io/contacts?phone=00353875551234 \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK\n\n{\n    \"type\": \"contact.list\",\n    \"pages\": {\n        \"type\": \"pages\",\n        \"next\": null,\n        \"page\": 1,\n        \"per_page\": 50,\n        \"total_pages\": 1\n    },\n    \"contacts\": [\n        {\n            \"type\": \"contact\",\n            \"id\": \"5811f6bbe6b4704ddfa84ac0\",\n            \"user_id\": \"77177570-cf5d-4f1a-bc75-75202af47d4f\",\n            \"anonymous\": true,\n            \"email\": \"obrien@truth.org\",\n            \"phone\": \"00353875551234\",\n            \"name\": \"O&#39;Brien\",\n            \"pseudonym\": \"Lime Camel from Dublin\",\n            \"avatar\": {\n                \"type\": \"avatar\",\n                \"image_url\": null\n            },\n            \"app_id\": \"ja43hiec\",\n            \"companies\": {\n                \"type\": \"company.list\",\n                \"companies\": []\n            },\n            \"location_data\": {\n                \"type\": \"location_data\",\n                \"city_name\": \"Mukilteo\",\n                \"continent_code\": \"NA\",\n                \"country_name\": \"United States\",\n                \"latitude\": 47.913,\n                \"longitude\": -122.3042,\n                \"postal_code\": \"98275\",\n                \"region_name\": \"Washington\",\n                \"timezone\": \"America/Los_Angeles\",\n                \"country_code\": \"USA\"\n            },\n            \"last_request_at\": 1477660267,\n            \"last_seen_ip\": \"1.2.3.4\",\n            \"created_at\": 1477572283,\n            \"remote_created_at\": null,\n            \"signed_up_at\": null,\n            \"updated_at\": 1480068674,\n            \"session_count\": 0,\n            \"social_profiles\": {\n                \"type\": \"social_profile.list\",\n                \"social_profiles\": []\n            },\n            \"unsubscribed_from_emails\": false,\n            \"user_agent_data\": \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9\",\n            \"tags\": {\n                \"type\": \"tag.list\",\n                \"tags\": []\n            },\n            \"segments\": {\n                \"type\": \"segment.list\",\n                \"segments\": []\n            },\n            \"custom_attributes\": {\n                \"paid_subscriber\": true,\n                \"monthly_spend\": 155.5,\n                \"team_mates\": 9\n            }\n        }\n    ],\n    \"total_count\": 1,\n    \"limited\": false\n}
```

You can fetch Leads with a given phone number by querying the leads resource with a `phone` parameter.