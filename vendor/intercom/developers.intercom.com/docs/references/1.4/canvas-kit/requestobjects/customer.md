# Customer

## Description

The customer object provides information on the Intercom customer. You can see more about this on the [User Model page of our API Reference](https://developers.intercom.com/intercom-api-reference/reference#user-model).

## Example Object

```json
{
  customer: {
    "type": "user",
    "id": "530370b477ad7120001d",
    "user_id": "25",
    "email": "email@example.com",
    "phone": "+1123456789",
    "name": "Joe Example",
    "updated_at": 1392734388,
    "unsubscribed_from_emails": false,
    "last_request_at": 1397574667,
    "signed_up_at": 1392731331,
    "created_at": 1392734388,
    "session_count": 179,
    "pseudonym": null,
    "anonymous": false,
    "referrer": "https://example.org",
    "utm_campaign": null,
    "utm_content": null,
    "utm_medium": null,
    "utm_source": null,
    "utm_term": null,
    "custom_attributes": {
      "paid_subscriber" : true,
      "monthly_spend": 155.5,
      "team_mates": 1
    },
    "avatar": {
      "type":"avatar",
      "image_url": "https://example.org/128Wash.jpg"
    },
    "location_data": {
      "type": "location_data",
      "city_name": "Dublin",
      "continent_code": "EU",
      "country_code": "IRL",
      "country_name": "Ireland",
      "postal_code": null,
      "region_name": "Dublin",
      "timezone": "Europe/Dublin"
    },
    "social_profiles": {
      "type":"social_profile.list",
      "social_profiles": [
        {
          "name": "Twitter",
          "id": "1235d3213",
          "username": "th1sland",
          "url": "http://twitter.com/th1sland"
        }
      ]
    },
    "companies": {
      "type": "company.list",
      "companies": [
        {
          "id" : "530370b477ad7120001e"
        }
      ]
    },
    "segments": {
      "type": "segment.list",
      "segments": [
        {
          "id" : "5310d8e7598c9a0b24000002"
        }
      ]
    },
    "tags": {
      "type": "tag.list",
      "tags": [
        {
          "id": "202"
        }
      ]
    }
  }
}
```