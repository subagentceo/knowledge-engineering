# Conversation Model

## Example Conversation Object

```json
{
    "assignee": {
        "id": "814860",
        "type": "admin"
    },
    "conversation_message": {
        "attachments": [],
        "author": {
            "id": "5bc8f7421ae2d96695c18a",
            "type": "lead"
        },
        "body": "<p>Hi</p>",
        "delivered_as": "customer_initiated",
        "id": "269650473",
        "subject": "",
        "type": "conversation",
        "url": "https://intercom-survey-app.glitch.me/"
    },
    "conversation_parts": {
        "conversation_parts": [
            {
                "assigned_to": null,
                "attachments": [],
                "author": {
                    "id": "815309",
                    "type": "bot"
                },
                "body": "<p>Test_App typically replies in a few hours.</p>",
                "created_at": 1539897200,
                "external_id": null,
                "id": "2202737122",
                "notified_at": 1539897200,
                "part_type": "comment",
                "type": "conversation_part",
                "updated_at": 1539897200
            },
          #List of conversation parts...
        ],
        "total_count": 25,
        "type": "conversation_part.list"
    },
    "conversation_rating": {
        "created_at": null,
        "customer": {
            "id": null,
            "type": null
        },
        "rating": null,
        "remark": null,
        "teammate": {
            "id": null,
            "type": null
        }
    },
    "created_at": 1539897198,
    "customer_first_reply": {
        "created_at": 1539897198,
        "type": "conversation",
        "url": "https://intercom-survey-app.glitch.me/"
    },
    "customers": [
        {
            "id": "5bc8f7ae2d96695c18a",
            "type": "lead"
        }
    ],
    "id": "1911149811",
    "open": true,
    "read": true,
    "sent_at": 1539897198,
    "snoozed_until": null,
    "state": "open",
    "tags": {
        "tags": [],
        "type": "tag.list"
    },
    "type": "conversation",
    "updated_at": 1540393270,
    "user": {
        "id": "5bc8f7421ffae2d96695c18a",
        "type": "lead"
    },
    "waiting_since": 64654125776
}
```

```json
{
   "type":"conversation",
   "id":"1122334455",
   "created_at":1567693209,
   "updated_at":1568367881,
   "waiting_since":1568367881,
   "snoozed_until":null,
   "assignee":{
      "type":"admin",
      "id":"1223334"
   },
   "open":true,
   "state":"open",
   "read":true,
   "tags":{
      "type":"tag.list",
      "tags":[

      ]
   },
   "conversation_rating":{
      "rating":null,
      "remark":null,
      "created_at":null,
      "customer":{
         "type":null,
         "id":null
      },
      "teammate":{
         "type":null,
         "id":null
      }
   },
   "conversation_parts":{
      "type":"conversation_part.list",
      "conversation_parts":[
         {
            "type":"conversation_part",
            "id":"1223445555",
            "part_type":"comment",
            "body":"We've removed this part of the conversation to comply with Twitter's terms and conditions. You can view the complete conversation in Intercom.",
            "created_at":1567693273,
            "updated_at":1567693273,
            "notified_at":1567693273,
            "assigned_to":null,
             "author":{
               "type":"user",
               "id":"5310d8e7598c9a0b24000002",
               "name":"",
               "email":""
            },
            "attachments":[

            ],
            "external_id":null
         },
      ],
      "total_count":1
   },
   "customer_first_reply":{
      "created_at":1567693209,
      "type":"twitter",
      "url":""
   },
   "conversation_message":{
      "type":"twitter",
      "id":"409820079",
      "delivered_as":"customer_initiated",
      "subject":"We've removed this part of the conversation to comply with Twitter's terms and conditions. You can view the complete conversation in Intercom.",
      "body":"We've removed this part of the conversation to comply with Twitter's terms and conditions. You can view the complete conversation in Intercom.",
      "author":{
         "type":"user",
         "id":"5310d8e7598c9a0b24000002",
         "name":"",
         "email":""
      },
      "attachments":[

      ],
      "url":""
   },
   "customers":[
      {
         "type":"user",
         "id":"5310d8e7598c9a0b24000002"
      }
   ],
   "user":{
      "type":"user",
      "id":"5310d8e7598c9a0b24000002"
   }
}
```

A conversation lets you track and describe communications with your users. Each conversation contains the message that initiated the conversation, the user involved, the admin assigned to the conversation and a list of parts describing the conversation thread. The open or closed status of the conversation is also provided.

### Conversation Object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Always `conversation`. |
| id | string | The id representing the conversation. |
| created_at | timestamp | The time the conversation was created. |
| updated_at | timestamp | The last time the conversation was updated. |
| waiting_since | timestamp | The last time a customer responded to an admin.  In other words, the time a customer started waiting for a response. Set to `null` if last reply is from an admin. |
| snoozed_until | timestamp | If set this is the time in the future when this conversation will be marked as open.  i.e. it will be in a snoozed state until this time. |
| conversation_message | Message | The message that started the conversation rendered for presentation. |
| user | User | The user the conversation concerns. |
| customers | List of customers objects | The list of customers (users or leads) involved in this conversation.  This will only contain one customer unless more were added via the group conversation feature. |
| customer_first_reply | Object | An object containing information on the first users message. For a user initiated message this will represent the users original message. |
| assignee | Admin | The admin the conversation is currently assigned to.  Note `nobody_admin` indicates the conversation is assigned to *Nobody*. |
| conversation_parts | Object | A conversation part object with a list of conversation parts. |
| open | Boolean | Indicates whether a conversation is open (true) or closed (false). |
| state | String | Can be set to "open", "closed" or "snoozed". |
| read | Boolean | Indicates whether a conversation has been read. |
| tags | List | A list of tags associated with the conversation. |
| total_count | Integer | The number of conversation parts in this conversation. |
| conversation_rating | object | A conversation rating object which contains information on the rating and/or remark added by a customer and the admin assigned to the conversation. |


### Message Object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | This includes **conversation**, **push**, **facebook**, **twitter** and **email** |
| id | string | The id representing the message. |
| delivered_as | string | How was the message delivered by Intercom. The types of delivery are **customer_initiated**, **automated**, **campaigns_initiated**, **admin_initiated**, and **operator_initiated**. |
| subject | string | Optional. The message subject.  For Twitter, this will show a generic message regarding why the subject is obscured. |
| body | string | The message body, which may contain HTML.  For Twitter, this will show a generic message regarding why the body is obscured. |
| author | Admin | The type of individual that sent the message (`user`, `lead`, `admin` or `team`) and their related `id`.  For Twitter, this will be blank. |
| attachments | List | A list of attachments for the part. |
| url | string | The URL the User started a conversation on. (Note this will not be populated in some cases, e.g. for custom bots.) |


Note
Please note that URLs for User uploaded images & files have a 30 minute expiration. Once the expiration has passed, the link will no longer be valid and result in a 404. This means that if a URL is copied, and then reused elsewhere, it will continue to work until the expiry threshold. A new URL can be generated by fetching the conversation data again.

### Customers object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | This can be either a `user` or a `lead`. |
| id | String | The ID for the `user` or `lead`. |


### Customer First reply object

|  |  |  |
|  --- | --- | --- |
| Type | String | Over which channel did the first reply occur. Options include **conversation**, **push**, **facebook**, **twitter** and **email** . |
| URL | String | The URL where the first reply originated from  For Twitter and Email replies, this will be blank. |
| Created_at | Timestamp | The time the users messages was created. This is in unix timestamp format |


customer_first_reply set to null
If a user has not replied to an Intercom initiated message (e.g. auto messages, admin initiated messages, campaigns) then the customer_first_reply attribute will be null