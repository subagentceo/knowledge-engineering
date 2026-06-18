# Update Lead

## Example Request

```curl
$ curl https://api.intercom.io/contacts \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' -d '
{
  "id": "5811f6bbe6b4704ddfa84ac0",
  "user_id": "77177570-cf5d-4f1a-bc75-75202af47d4f",
  "phone": "123987456",
  "email": "obrien@truth.org",
  "name": "OBrien",
  "custom_attributes": {
    "paid_subscriber" : true,
    "monthly_spend": 155.5,
    "team_mates": 9
  }
}'
```

```ruby
contact.name = "Joe Example"
intercom.contacts.save(contact)
```

```java
contact.setName("Joe Example");
Contact updated = Contact.update(contact);
```

```php
<?php
$intercom->leads->create([
    "id" => "596f6b60d797879302bd7ac1",
    "phone" => "5552345657"
]);
?>
```

```curl
HTTP/1.1 200 OK
{
    "type": "contact",
    "id": "5811f6bbe6b4704ddfa84ac0",
    "user_id": "77177570-cf5d-4f1a-bc75-75202af47d4f",
    "anonymous": true,
    "email": "obrien@truth.org",
    "phone": "00353875551234",
    "name": "OBrien",
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
# contact response
```

Sending a POST request to `/contacts` and passing identifiers (user_id or id) in the body will result in an update of an existing Lead.

It is not possible to uniquely identify a Lead for an update with an email address.