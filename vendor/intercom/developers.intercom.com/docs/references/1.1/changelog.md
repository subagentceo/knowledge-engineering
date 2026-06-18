# Changelog (v1.1)

For changes that have been updated across all version, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

Breaking Changes
This version of the API includes [breaking changes](/docs/build-an-integration/learn-more/rest-apis/api-changelog#about-breaking-changes-in-the-intercom-api). See below for details.

## Users endpoint - Find multiple users via email

Previously if you searched for a user via email it would return an error if more than one user existed with the email. It returned a user object. Now it will return the same list object as with [list users](/docs/references/1.1/rest-api/users/list-users).

### Find users via email

```curl
    curl https://api.intercom.io/users?email=test@test.com \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
    -H 'Accept: application/json' \
    -H 'Intercom-Version: 1.1'
```

### HTTP Response - one or more matches

```json
{
  "limited": false,
  "pages": {
    "next": null,
    "page": 1,
    "per_page": 50,
    "total_pages": 1,
    "type": "pages"
  },
  "total_count": 3,
  "type": "user.list",
  "users": [{
      "anonymous": false,
      "app_id": "fyq3wodw",
      "created_at": 1506339558,
      "custom_attributes": {},
      "do_not_track": null,
      "email": "test@test.com",
      "has_hard_bounced": false,
      "id": "45c8eae6fac10f5584e7508e",
      "last_request_at": 1529737920,
      "last_seen_ip": "78.144.182.179",
            ...
    },
    {
      "anonymous": true,
      "app_id": "fyq3wodw",
      "created_at": 1503488750,
      "custom_attributes": {},
      "do_not_track": null,
      "email": "test@test.com",
      "has_hard_bounced": false,
      "id": "5123d6aeeda850883ed8ba7c2",
      "last_request_at": 1503488749,
            ...
    },
    {
      "anonymous": false,
      "app_id": "fyq3wodw",
      "created_at": 1494940172,
      "custom_attributes": {},
      "do_not_track": null,
      "email": "test@test.com",
      "has_hard_bounced": false,
      "id": "789afa0cb781d52fd3044ecc",
      "last_request_at": 1494940211,
            ...
    }
  ]
}
```

### HTTP Response - No match

```json
{
  "limited": false,
  "pages": {
    "next": null,
    "page": 1,
    "per_page": 50,
    "total_pages": 0,
    "type": "pages"
  },
  "total_count": 0,
  "type": "user.list",
  "users": []
}
```

## Conversations endpoint - Adding more information for user's first reply

It is now possible to get more information about your users first response. Customer have asked for this feature so they can better understand key metrics which may help identify patterns around what encouraged your customers to reply to a particular message. Similarly, it will also allow you to prioritise messages based on whether they were delivered as `Auto-Messages`, `Bot messages` or `Manual Messages` for example.

The new information will be available in the conversation model object returned when you list your conversations. It will contain:

- Source URL - The URL for the page from where your customer replied. This will not be available in all cases, e.g. when a customer replies via email.
- Channel - The channel the replay occurred within e.g. via email, in a conversation or via a third-party integration such as Facebook or Instagram
- Created at time - The time the users response was created
- How was the original message delivered - Was it an `Auto-Message` or a `Campaigns Message` or a `Manual Message` for example.


> 👍 Conversation list
There is no change to how your list conversations. We have just added some new attributes to the conversation model returned.


### New or updated Attributes

The [conversation model](/docs/references/1.1/rest-api/conversations/conversation-model) will include the follow new attributes

| Attribute | Type | Description |
|  --- | --- | --- |
| `customer_first_reply` | Object | An object containing information on the first users message. For a user initiated message this will represent the users original message. |
| `type` | String | This has been updated and now includes `conversation`, `push`, `facebook`, `twitter` and `email` |
| `delivered_as` | String | How was the message delivered by Intercom. They types of delivery are `customer_initiated` , `automated` , `campaigns_initiated` , `admin_initiated` , and `operator_initiated`. |


### `delivered_as` message types explained

**customer_initiated** means this message was delivered as a **user initiated message**
**automated** means the message was delivered as either a **visitor auto message** or an **automated message**
**campaigns_initiated** means the message was delivered as a **campaigns message**
**operator_initiated** means the message was delivered as a **bot auto message**
**admin_initiated** means the message was delivered as an **admin initiated message**

### Customer First reply model

| Attribute | Type | Description |
|  --- | --- | --- |
| Channel | String | Over which channel did the first reply occur. Options include `conversation` , `push` , `facebook` , `twitter` and `email` |
| URL | String | The URL where the first reply originated from. In some cases, e.g. email replies this will be blank. |
| Created_at | String | The time the users messages was created. This is in unix timestamp format |


## "customer_first_reply" set to null

If a user has not replied to an Intercom initiated message (e.g. auto messages, admin initiated messages, campaigns) then the `customer_first_reply` attribute will be null

You still list conversations in the same way. The only change is there are some new attributes added as part of the conversation message.

### List conversations

```curl
  curl "https://api.intercom.io/conversations" \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Accept: application/json' \
  -H 'Intercom-Version: 1.1'
```

### New HTTP Response

```json
{
  "conversations": [
      {
          "assignee": {
              "id": null,
              "type": "nobody_admin"
          },
          "conversation_message": {
              "attachments": [],
              "author": {
                  "id": "5bd155b5d8b61587a0203f31",
                  "type": "lead"
              },
              "body": "<p>\ud83d\ude00</p>",
              "delivered_as": "customer_initiated",
              "id": "271978806",
              "subject": "",
              "type": "conversation",
              "url": "https://s.codepen.io/test/app"
          },
          "created_at": 1540449375,
          "customer_first_reply": null,
          "customers": [
              {
                  "id": "5bd112b5d8b61534a0203f12",
                  "type": "lead"
              }
          ],
          "first_action_at": 1540449375,
          "id": "19205537453",
          "last_action_at": 1540449378,
          "open": true,
          "read": true,
          "sent_at": 1540449378,
          "snoozed_until": null,
          "state": "open",
          "type": "conversation",
          "updated_at": 1540449379,
          "user": {
              "id": "5bd112b5d8b61534a0203f12",
              "type": "lead"
          },
          "waiting_since": 1540449375
      },
      ...
      ...
      ...
          ],
  "pages": {
      "next": "https://api.intercom.io/conversations?per_page=20&page=2",
      "page": 1,
      "per_page": 20,
      "total_pages": 76,
      "type": "pages"
  },
  "type": "conversation.list"
}
```

### Old HTTP Response

```json
{
  "conversations": [
      {
          "assignee": {
              "id": null,
              "type": "nobody_admin"
          },
          "conversation_message": {
              "attachments": [],
              "author": {
                  "id": "814865",
                  "type": "admin"
              },
              "body": "<p>Hi \ud83d\ude00 We hope you enjoy the example app. To get started just copy and paste some code into the JS editor. Let us know if you think this is useful? <br></p>",
              "id": "55951247",
              "subject": "",
              "type": "conversation_message",
              "url": null
          },
          "created_at": 1540314098,
          "customers": [
              {
                  "id": "1234bea776767676676bae2334",
                  "type": "lead"
              }
          ],
          "first_action_at": 1540314131,
          "id": "19179279317",
          "last_action_at": 1540314133,
          "open": true,
          "read": true,
          "sent_at": 1540314133,
          "snoozed_until": null,
          "state": "open",
          "type": "conversation",
          "updated_at": 1540314134,
          "user": {
              "id": "aa444f2314fe1334r345",
              "type": "lead"
          },
          "waiting_since": 1540314131
      },
      ...
      ...
          ],
  "pages": {
      "next": "https://api.intercom.io/conversations?per_page=20&page=2",
      "page": 1,
      "per_page": 20,
      "total_pages": 15,
      "type": "pages"
  },
  "type": "conversation.list"
}
```

## Conversations endpoint - Adding more information to tags

It is now possible to get more information about the conversation's tags when [both fetching one conversation](https://developers.intercom.com/intercom-api-reference/v1.1/reference/get-a-single-conversation) and [listing all conversations](https://developers.intercom.com/intercom-api-reference/v1.1/reference/list-conversations).

There's two new attributes you can see in the tag object of a conversation:

| Attribute | Type | Description |
|  --- | --- | --- |
| applied_at | UNIX Timestamp | The date and time when the tag was applied to the conversation. |
| applied_by | Object | Contains the `id` of the `admin` that applied the tag. |


## Messenger framework - `new_canvas` no longer accepted

During the beta launch of the Messenger framework we accepted both `new_canvas` and `canvas` as valid names for the `canvas` object returned to Intercom during the [request flows](https://developers.intercom.com/build-an-integration/v1.0/docs/request-flows). The `new_canvas` name is no longer accepted as a valid name for the `canvas` object.

## Messenger framework - Disable component option

This version includes the ability to disable certain messenger framework `components`. This allows you to prevent certain `components`, such as elements in a list, from being selected. This may occur when customers are signed up to certain packages and have restricted options for some categories. The `components` which you can now disable are:

- Input
- Button
- List + each list item
- Dropdown + each dropdown option
- Single Select + each single select option
For each of the above components it simply adds one optional boolean parameter which can be set to identify whether this `component` should be disabled or not


| Attribute | Type | Required | Description |
|  --- | --- | --- | --- |
| disabled | Boolean | No | 'true' indicates the component is disabled. This is set to 'false' by default. |


### Example disabled button

```json
{
  "type": "button",
  "id": "button-123",
  "label": "Submit form",
  "style": "secondary",
  "disabled": true,
  "action": {
    "type": "url",
    "url": "https://www.intercom.com/"
  }
}
```

### Example list with disabled element

```json
{
  "type": "list",
  "items": [
    {
      "type": "item",
      "id": "article-123",
      "title": "How to install the messenger",
      "subtitle": "An article explaining how to integrate Intercom",
      "image": "http://somesite.com/article.png",
      "image_width": 48,
      "image_height": 48,
      "roundedImage": false,
      "action": {
        "type": "submit"
      }
    },
    {
      "type": "item",
      "id": "article-133",
      "title": "How to un-install the messenger",
      "subtitle": "An article explaining how to uninstall Intercom integrations",
      "image": "http://somesite.com/article2.png",
      "image_width": 48,
      "image_height": 48,
      "roundedImage": false,
      "disabled": true,
      "action": {
        "type": "submit"
      }
    }
  ]
}
```

## New webhook topics

This version includes a number of new webhook topics to which you can now subscribe. The new topics are described in the table below. To find out more about webhooks and learn how to subscribe to these topics please see our [Setting up Webhooks](https://developers.intercom.com/build-an-integration/docs/setting-up-webhooks) page.

| Topic | Item Type | Description |
|  --- | --- | --- |
| conversation.admin.snoozed | Conversation | Subscribe to admin conversation snoozes |
| conversation.admin.unsnoozed | Conversation | Subscribe to admin conversation unsnoozes |
| contact.tag.created | ContactTag | Subscribe to leads being tagged. |
| contact.tag.deleted | ContactTag | Subscribe to leads being tagged. |