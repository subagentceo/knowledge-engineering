Contact

## Description

The contact object provides information on the Intercom contact. You can see more about this on the [Contacts Model page of our API Reference](/docs/references/2.0/introduction).

## Example Object

```json
{
  "type": "contact",
  "id": "5ba682d23d7cf92bef87bfd4",
  "workspace_id": "ecahpwf5",
  "external_id": "25",
  "role": "user",
  "email": "email@example.com",
  "phone": "+1123456789",
  "name": "Joe Example",
  "avatar": "https://example.org/128Wash.jpg",
  "owner_id": 127,
  "social_profiles": {
    "type": "list",
    "data": [
      {
        "type": "social_profile",
        "name": "Twitter",
        "url": "http://twitter.com/th1sland"
      }
    ]
  },
  "has_hard_bounced": false,
  "marked_email_as_spam": false,
  "unsubscribed_from_emails": false,
  "created_at": 1571672154,
  "updated_at": 1571672158,
  "signed_up_at": 1571069751,
  "last_seen_at": 1571069751,
  "last_replied_at": 1571672158,
  "last_contacted_at": 1571672158,
  "last_email_opened_at": 1571673478,
  "last_email_clicked_at": 1571676789,
  "language_override": null,
  "browser": "chrome",
  "browser_version": "77.0.3865.90",
  "browser_language": "en",
  "os": "OS X 10.14.6",
  "location": {
    "type": "location",
    "country": "Ireland",
    "region": "Dublin",
    "city": "Dublin"
  },
  "android_app_name": null,
  "android_app_version": null,
  "android_device": null,
  "android_os_version": null,
  "android_sdk_version": null,
  "android_last_seen_at": null,
  "ios_app_name": null,
  "ios_app_version": null,
  "ios_device": null,
  "ios_os_version": null,
  "ios_sdk_version": null,
  "ios_last_seen_at": null,
  "custom_attributes": {
    "paid_subscriber": true,
    "monthly_spend": 155.5,
    "team_mates": 1
  },
  "tags": {
    "type": "list",
    "data": [
      {
        "type": "tag",
        "id": "2",
        "url": "/tags/2"
      },
      {
        "type": "tag",
        "id": "4",
        "url": "/tags/4"
      },
      {
        "type": "tag",
        "id": "5",
        "url": "/tags/5"
      }
    ],
    "url": "/contacts/5ba682d23d7cf92bef87bfd4/tags",
    "total_count": 3,
    "has_more": false
  },
  "notes": {
    "type": "list",
    "data": [
      {
        "type": "note",
        "id": "20114858",
        "url": "/notes/20114858"
      }
    ],
    "url": "/contacts/5ba682d23d7cf92bef87bfd4/notes",
    "total_count": 1,
    "has_more": false
  },
  "companies": {
    "type": "list",
    "data": [
      {
        "type": "company",
        "id": "5ba686093d7cf93552a3dc99",
        "url": "/companies/5ba686093d7cf93552a3dc99"
        
      },
      {
        "type": "company",
        "id": "5cee64a03d7cf90c51b36f19",
        "url": "/companies/5cee64a03d7cf90c51b36f19"
      },
      {
        "type": "company",
        "id": "5d7668883d7cf944dbc5c791",
        "url": "/companies/5d7668883d7cf944dbc5c791"
      }
    ],
    "url": "/contacts/5ba682d23d7cf92bef87bfd4/companies",
    "total_count": 3,
    "has_more": false
  }
}
```