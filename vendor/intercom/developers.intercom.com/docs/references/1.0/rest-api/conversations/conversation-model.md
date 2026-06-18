# Conversation Model

## Example Conversation Object

```json
{
  "type": "conversation",
  "id": "147",
  "created_at": 1400850973,
  "updated_at": 1400857494,
  "waiting_since": 1400857494,
  "snoozed_until": null,
  "conversation_message": {
    "type": "conversation_message",
    "subject": "",
    "body": "<p>Hi Alice,</p><p> We noticed you using our Product,  do you have any questions?</p> <p>- Jane</p>",
    "author": {
      "type": "admin",
      "id": "25"
    },
    "attachments": [
      {
        "name": "signature",
        "url": "http://example.org/signature.jpg"
      }
    ]
  },
  "user": {
    "type": "user",
    "id": "536e564f316c83104c000020"
  },
  "customers": [
    {
      "type": "user",
      "id": "58ff3f670f14ab4f1aa83750"
    }
  ],
  "assignee": {
    "type": "admin",
    "id": "25"
  },
  "open": true,
  "state": "open",
  "read": true,
  "conversation_parts": {
    "type": "conversation_part.list",
    "conversation_parts": [
      //... List of conversation parts
    ],
    "total_count": 1
  },
  "conversation_rating": {
    "rating": null,
    "remark": null,
    "created_at": null,
    "customer": {
        "type": null,
        "id": null
    },
    "teammate": {
        "type": null,
        "id": null
    }
  }
  "tags": { "type": 'tag.list', "tags": [] } 
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
| waiting_since | timestamp | The last time a customer responded to an admin.  In other words, the time a customer started waiting for a response. |
| snoozed_until | timestamp | If set this is the time in the future when this conversation will be marked as open.  i.e. it will be in a snoozed state until this time. |
| conversation_message | Message | The message that started the conversation rendered for presentation. |
| user | User | The user the conversation concerns. |
| customers | List of customers objects | The list of customers (users or leads) involved in this conversation.  This will only contain one customer unless more were added via the group conversation feature. |
| assignee | Admin | The admin the conversation is currently assigned to.  Note `nobody_admin` indicates the conversation is assigned to *Nobody*. |
| conversation_parts | Object | A conversation part object with a list of conversation parts. |
| open | Boolean | Indicates whether a conversation is open (true) or closed (false). |
| state | String | Can be set to "open", "closed" or "snoozed". |
| read | Boolean | Indicates whether a conversation has been read. |
| tags | List | A list of tags associated with the conversation. |
| total_count | Integer | The number of conversation parts in this conversation. |
| conversation_rating | object | A conversation rating object which contains information on the rating and/or remark added by a customer and the admin assigned to the conversation. |


waiting_since 2000 years in the future?
Waiting since lets you identify how long a customer has been waiting for a response. This time, however, is not always relevant. For example, when the last person to respond was an admin, or the conversation was closed after a user response (e.g. "thanks, bye"). In these cases we will set the date to 2000 years in the future.

### Message Object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | This includes **conversation**, **push**, **facebook**, **twitter** and **email**. |
| id | string | The id representing the message. |
| subject | string | Optional. The message subject.  For Twitter, this will show a generic message regarding why the subject is obscured. |
| body | string | The message body, which may contain HTML.  For Twitter, this will show a generic message regarding why the body is obscured. |
| author | Admin | The type of individual that sent the message (`user`, `lead`, `admin` or `team`) and their related `id`.  For Twitter, this will be blank. |
| attachments | List | A list of attachments for the part. |
| url | string | The URL where the conversation was started.  For Twitter, Email, and Bots, this will be blank. |


### Customers object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | This can be either a `user` or a `lead`. |
| id | String | The ID for the `user` or `lead`. |