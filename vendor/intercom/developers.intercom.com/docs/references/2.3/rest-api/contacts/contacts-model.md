# The Contact Model

The Contacts API is a central place to gather all information and take actions on your contacts (ie. users and leads), such as fetching, searching, creating, updating, and deleting.

The Contact Model provides details on these contacts within Intercom, and will specify whether they are a `user` or `lead` through the `role` attribute.

## Example Contact Object

### JSON

```json
{
  "type": "contact",
  "id": "5ba682d23d7cf92bef87bfd4",
  "workspace_id": "ecahpwf5",
  "external_id": "25",
  "role": "user",
  "email": "email@example.com",
  "email_domain": "example.com",
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
  "opted_out_subscription_types": {
    "type": "list",
    "data": [
      {
        "id": "1",
        "type": "subscription",
        "url": "/subscription_types/1"
      }
    ],
    "url": "/contacts/5ba682d23d7cf92bef87bfd4/subscriptions",
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

### Contact Object Keys and Descriptions

| Key | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `contact`. |
| id | String | The unique identifier for the contact which is given by Intercom. |
| workspace_id | String | The id of the workspace which the contact belongs to. |
| external_id | String | A unique identifier for the contact which is given to Intercom. |
| role | String | The role of the contact - `user` or `lead`. |
| email | String | The contact's email. |
| email_domain | String | The contact's email domain. |
| phone | String | The contact's phone. |
| name | String | The contact's name. |
| avatar | String | An image URL containing the avatar of a contact. |
| owner_id | Integer | The id of an admin that has been assigned account ownership of the contact. |
| social_profiles | List | A list of social profiles associated to the contact. |
| has_hard_bounced | Boolean | Whether the contact has had an email sent to them hard bounce. |
| marked_email_as_spam | Boolean | Whether the contact has marked an email sent to them as spam. |
| unsubscribed_from_emails | Boolean | Whether the contact is unsubscribed from emails. |
| created_at | Date (Unix timestamp in seconds) | The time when the contact was created. |
| updated_at | Date (Unix timestamp in seconds) | The time when the contact was last updated. |
| signed_up_at | Date (Unix timestamp in seconds) | The time specified for when a contact signed up. |
| last_seen_at | Date (Unix timestamp in seconds) | The time when the contact was last seen, either where the Intercom Messenger was installed or when specified manually. |
| last_replied_at | Date (Unix timestamp in seconds) | The time when the contact last messaged in. |
| last_contacted_at | Date (Unix timestamp in seconds) | The time when the contact was last messaged. |
| last_email_opened_at | Date (Unix timestamp in seconds) | The time when the contact last opened an email. |
| last_email_clicked_at | Date (Unix timestamp in seconds) | The time when the contact last clicked a link in an email. |
| language_override | String | A preferred language setting for the contact, used by the Intercom Messenger even if their browser settings change. |
| browser | String | The name of the browser which the contact is using. |
| browser_version | String | The version of the browser which the contact is using. |
| browser_language | String | The language set by the browser which the contact is using. |
| os | String | The operating system which the contact is using. |
| location | Object | An object showing location details of the contact. |
| android_app_name | String | The name of the Android app which the contact is using. |
| android_app_version | String | The version of the Android app which the contact is using. |
| android_device | String | The Android device which the contact is using. |
| android_os_version | String | The version of the Android OS which the contact is using. |
| android_sdk_version | String | The version of the Android SDK which the contact is using. |
| android_last_seen_at | Date (Unix timestamp in seconds) | The last time the contact used the Android app. |
| ios_app_name | String | The name of the iOS app which the contact is using. |
| ios_app_version | String | The version of the iOS app which the contact is using. |
| ios_device | String | The iOS device which the contact is using. |
| ios_os_version | String | The version of iOS which the contact is using. |
| ios_sdk_version | String | The version of the iOS SDK which the contact is using. |
| ios_last_seen_at | Date (Unix timestamp in seconds) | The last time the contact used the iOS app. |
| custom_attributes | Object | The custom attributes which are set for the contact. |
| tags | Addressable List | The tags which have been added to the contact. |
| notes | Addressable List | The notes which have been added to the contact. |
| companies | Addressable List | The companies which the contact belongs to. |


### Location Object

| Key | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `location`. |
| country | String | The country where the contact is. |
| region | String | A subdivision of the country which the contact is in (ie. state, province, county, territory, etc). |
| city | String | The city where the contact is. |


### Social Profile Object

| Key | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `social_profile`. |
| name | String | The name of the service (ie. Twitter, Facebook, etc). |
| url | String | The profile page for the contact on the service. |


### Addressable List

| Key | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `list`. |
| data | Array | An array of Addressable Objects.  Maximum of 10. |
| url | String | The URL where the full list can be accessed (ie. `/contacts/1234/companies`). |
| total_count | Integer | The total amount of records. |
| has_more | Boolean | Whether there's more Addressable Objects to be viewed. If `true`, use the  `url` to view all. |


### Addressable Object

| Key | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `company`, `note`, `tag`. |
| id | String | The id of the object. |
| url | String | The URL where the object in question can be accessed (ie. `/companies/45678`). |