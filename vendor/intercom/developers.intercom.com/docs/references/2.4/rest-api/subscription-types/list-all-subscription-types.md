# List all subscription types

## Example List Subscription Types Request

```curl
$ curl https://api.intercom.io/subscription_types \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json'
```

```http
HTTP/1.1 200 OK
{
  "type": "list",
  "data": [
    {
      "type": "subscription",
      "id": "1",
      "state": "live",
      "consent_type": "opt_out",
      "default_translation": {
        "name": "Announcements",
        "description": "Offers, product and feature announcements",
        "locale": "en"
      },
      "translations": [
        {
          "name": "Ankündigungen",
          "description": "Angebote, Produkt- und Funktionsankündigungen",
          "locale": "de"
        },
        {
          "name": "Announcements",
          "description": "Offers, product and feature announcements",
          "locale": "en"
        }
      ]
    },
    {
      "type": "subscription",
      "id": "2",
      "state": "live",
      "consent_type": "opt_out",
      "default_translation": {
        "name": "Newsletter",
        "description": "The latest news and updates, on a regular basis",
        "locale": "en"
      },
      "translations": [
        {
          "name": "Newsletter",
          "description": "Regelmäßig die neuesten Nachrichten und Updates",
          "locale": "de"
        },
        {
          "name": "Newsletter",
          "description": "The latest news and updates, on a regular basis",
          "locale": "en"
        }
      ]
    },
    {
      "type": "subscription",
      "id": "3",
      "state": "live",
      "consent_type": "opt_out",
      "default_translation": {
        "name": "Best practices",
        "description": "Tips, tricks and recommendations",
        "locale": "en"
      },
      "translations": [
        {
          "name": "Best Practices",
          "description": "Tipps, Tricks und Empfehlungen",
          "locale": "de"
        },
        {
          "name": "Best practices",
          "description": "Tips, tricks and recommendations",
          "locale": "en"
        }
      ]
    }
  ]
}
```

You can list all subscription types.

### Response

A list of subscription type objects.

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'list'* |
| data | array | A list of subscription type objects |