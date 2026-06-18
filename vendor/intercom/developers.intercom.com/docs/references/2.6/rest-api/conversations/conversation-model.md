# The Conversation model

## Example Conversation Object

```json
{
    "type": "conversation",
    "id": "1911149811",
    "created_at": 1539897198,
    "updated_at": 1540393270,
    "source": {
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
        "url": "https://intercom-survey-app.glitch.me/",
        "redacted": false
    },
    "contacts": [
        {
            "id": "5bc8f7ae2d96695c18a",
            "type": "lead"
        }
    ],
    "teammates": [
        {
            "id": "814860",
            "type": "admin"
        }
    ],
    "title": "Conversation Title",
    "admin_assignee_id": 814860,
    "team_assignee_id": 5017691,
    "custom_attributes": {
      "issue_type": "Billing",
      "priority": "High"
    },
    "topics": {
        "type": "topic.list",
        "topics": [
            {
                "type": "topic"
                "name": "Example Topic 1",
                "id": 839
            }
        ],
        "total_count": 1
    },
    "open": true,
    "state": "open",
    "read": true,
    "waiting_since": 64654125776,
    "snoozed_until": null,
    "tags": {
        "tags": [],
        "type": "tag.list",
    },
    "first_contact_reply": {
    	"created_at": 1539897198
    	"type": "conversation",
    	"url": "https://intercom-survey-app.glitch.me/"
    },
    "priority": "not_priority",
    "sla_applied": {
    	"sla_name": "VIP customer <5m",
      "sla_status": "missed",
    },
    "conversation_rating": {
        "created_at": null,
        "contact": {
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
    "statistics": {
      "time_to_assignment": 2310,
      "time_to_admin_reply": 2408,
      "time_to_first_close": 4915 ,
      "time_to_last_close": 5125,
      "median_time_to_reply": 321,
      "first_contact_reply_at": 1539897200,
      "first_assignment_at": 1539897200,
      "first_admin_reply_at": 1539897200,
      "first_close_at": 1539897200,
      "last_assignment_at": 1539897200,
      "last_assignment_admin_reply_at": 1539897200,
      "last_contact_reply_at": 1539897200,
      "last_admin_reply_at": 1539897200,
      "last_close_at": 1539897200,
      "last_closed_by": {
      	"type": "admin",
        "id": "325432652",
        "name": "Tom Smith",
        "email": "tom@example.com"
      },
      "count_reopens": 3,
      "count_assignments": 2,
      "count_conversation_parts": 67
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
                "updated_at": 1539897200,
                "redacted": false
            },
          #List of conversation parts...
        ],
        "total_count": 67,
        "type": "conversation_part.list"
    }    
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
   "admin_assignee_id": 814860,
   "team_assignee_id": 5017691,
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
            "attachments": [],
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

Conversations are how you can communicate with users in Intercom. They are created when a contact replies to an outbound message, or when one admin directly sends a message to a single contact.

### Conversation Object

| Key | Type | Description |
|  --- | --- | --- |
| type | String | Always `conversation`. |
| id | String | The id representing the conversation. |
| created_at | Timestamp | The time the conversation was created. |
| updated_at | Timestamp | The last time the conversation was updated. |
| source | Object | The Conversation Part that originated this conversation, which can be Contact, Admin, Campaign, Automated or Operator initiated. |
| contacts | List | The list of contacts (users or leads) involved in this conversation. This will only contain one customer unless more were added via the group conversation feature. |
| teammates | List | The list of teammates who participated in the conversation (wrote at least one conversation part). |
| title | String | The title given to the conversation. |
| admin_assignee_id | Integer | The id of the admin assigned to the conversation. If it's not assigned to an admin it will return null. |
| team_assignee_id | Integer | The id of the team assigned to the conversation. If it's not assigned to a team it will return null. |
| custom_attributes | Object | An object containing the different custom attributes associated to the conversation as key-value pairs. |
| open | Boolean | Indicates whether a conversation is open (true) or closed (false). |
| state | String | Can be set to "open", "closed" or "snoozed". |
| read | Boolean | Indicates whether a conversation has been read. |
| waiting_since | Timestamp | The last time a Contact responded to an Admin.In other words, the time a customer started waiting for a response. Set to `null` if last reply is from an Admin. |
| snoozed_until | Timestamp | If set this is the time in the future when this conversation will be marked as open. i.e. it will be in a snoozed state until this time. |
| tags | List | A list of tags objects associated with the conversation. |
| first_contact_reply | Object | An object containing information on the first users message. For a contact initiated message this will represent the users original message. |
| priority | String | If marked as priority, it will return `priority` or else `not_priority`. |
| sla_applied | Object | The SLA Applied object contains the details for which SLA has been applied to this conversation. |
| conversation_rating | Object | The Conversation Rating object which contains information on the rating and/or remark added by a Contact and the Admin assigned to the conversation. |
| statistics | Object | A Statistics object containing all information required for reporting, with timestamps and calculated metrics. |
| conversation_parts | List | A list of Conversation Part objects for each part message in the conversation. This is only returned when Retrieving a Conversation, and ignored when Listing all Conversations. There is a limit of 500 parts. |


### Source object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | This includes `conversation`, `push`, `facebook`, `twitter` and `email`. |
| id | String | The id representing the message. |
| delivered_as | String | The conversation's initiation type.Possible values are `customer_initiated`, `campaigns_initiated` (legacy campaigns), `operator_initiated` (Custom bot), `automated` (Series and other outbounds with dynamic audience message) and `admin_initiated` (fixed audience message, ticket initiated by an admin, group email). |
| subject | String | Optional. The message subject.For Twitter, this will show a generic message regarding why the subject is obscured. |
| body | String | The message body, which may contain HTML. For Twitter, this will show a generic message regarding why the body is obscured. |
| author | Object | The object who initiated the conversation, which can be a `Contact`, `Admin` or `Team`. Bots and campaigns send messages on behalf of Admins or Teams.For Twitter, this will be blank. |
| attachments | List | A list of attachments for the part. |
| url | String | The URL where the conversation was started.For Twitter, Email, and Bots, this will be blank. |
| redacted | Boolean | Whether or not the source message has been redacted. Only applicable for contact initiated messages. |


### Contact Object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | This can be either a `user` or a `lead`. |
| id | String | The ID for the `user` or `lead`. |


### Teammate Object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | Currently this will always be of type admin. Conversations not rated will return null. |
| id | String | The ID of the `Admin`. |


### First Contact Reply Object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | Over which channel did the first reply occur. Options include **conversation**, **push**, **facebook**, **twitter** and **email**. |
| url | String | The URL where the first reply originated from.For Twitter and Email replies, this will be blank. |
| created_at | Timestamp | The time the users messages was created. This is in unix timestamp format. |


### Conversation Rating Object

| Attribute | Type | Description |
|  --- | --- | --- |
| rating | Integer | The rating, between 1 and 5, for the conversation. |
| remark | String | An optional field to add a remark to correspond to the number rating. |
| created_at | Timestamp | The time the rating was requested in the conversation being rated. |
| contact | Object | An object containing the ID and type of the `Contact`. |
| teammate | Object | An object containing the ID and type of the Intercom teammate associated with the conversation when it was rated. |


### SLA Object

| Attribute | Type | Description |
|  --- | --- | --- |
| sla_name | String | The name of the SLA as given by the teammate when it was created. |
| sla_status | String | One of "hit", "missed", "cancelled", or "active". |


### Statistics Object

| Attribute | Type | Description |
|  --- | --- | --- |
| time_to_assignment | Integer | Duration until last assignment before first admin reply. In seconds. |
| time_to_admin_reply | Integer | Duration until first admin reply. Subtracts out of business hours. In seconds. |
| time_to_first_close | Integer | Duration until conversation was closed first time. Subtracts out of business hours. In seconds. |
| time_to_last_close | Integer | Duration until conversation was closed last time. Subtracts out of business hours. In seconds. |
| median_time_to_reply | Integer | Median based on all admin replies after a contact reply. Subtracts out of business hours. In seconds. |
| first_contact_reply_at | Timestamp | Time of first text conversation part from a contact. |
| first_assignment_at | Timestamp | Time of first assignment after `first_contact_reply_at`. |
| first_admin_reply_at | Timestamp | Time of first admin reply after `first_contact_reply_at`. |
| first_close_at | Timestamp | Time of first close after `first_contact_reply_at`. |
| last_assignment_at | Timestamp | Time of last assignment after `first_contact_reply_at`. |
| last_assignment_admin_reply_at | Timestamp | Time of first admin reply since most recent assignment. |
| last_contact_reply_at | Timestamp | Time of the last conversation part from a contact. |
| last_admin_reply_at | Timestamp | Time of the last conversation part from an admin. |
| last_close_at | Timestamp | Time of the last conversation close. |
| last_closed_by | Object | The last admin who closed the conversation. Returns a reference to an Admin object. |
| count_reopens | Integer | Number of reopens after `first_contact_reply_at`. |
| count_assignments | Integer | Number of assignments after `first_contact_reply_at`. |
| count_conversations_parts | Integer | Total number of conversation parts. |


### Conversation Part Object

> 🚧
Conversation Parts are not returned when listing or searching for all conversations, only when retrieving a single conversation. There is also a limit of 500 parts.


| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | Always `conversation_part`. |
| id | String | The id representing the conversation part. |
| part_type | String | The type of conversation part. |
| body | String | The message body, which may contain HTML.For Twitter, this will show a generic message regarding why the body is obscured. |
| created_at | Timestamp | The time the conversation part was created. |
| updated_at | Timestamp | The last time the conversation part was updated. |
| notified_at | Timestamp | The time the user was notified with the conversation part. |
| assigned_to | String | The id of the admin that was assigned the conversation by this conversation_part (`null` if there has been no change in assignment.) |
| author | String | The type of individual that sent the message (`user`, `admin` or `bot`) and their related `id`.For Twitter, this will be blank. |
| attachments | List | A list of attachments for the part. |
| redacted | Boolean | Whether or not a conversation part has been redacted. |


### Conversation Part Types

| Type | Description |
|  --- | --- |
| comment | Standard reply from customer or admin to a conversation. |
| note | A note created by an admin on the conversation. A note will only be viewable as an admin. |
| note_and_reopen | Add a note and reopen the conversations in the one action. |
| note_and_unsnooze | Add a note and unsnooze the conversations in the one action. |
| assignment | An assignment of the conversation to an admin, or *Nobody*. |
| assign_and_unsnooze | An assignment of the conversation to an admin, or *Nobody* and Unsnooze the conversation in one action |
| workflow_assignment | An inbox workflow has assigned a admin to a conversation. |
| open | Identifies a conversation has been opened. |
| close | Identifies a conversation has been closed. |
| away_mode_assignment | Conversation has been assigned due to the admin being in away mode. |
| participant_added | A participant has been added to a group conversation. |
| participant_removed | A participant has been removed from a group conversation. |
| conversation_rating_changed | A conversation rating has been changed, not this can only occur before the rating has been submitted. Once it has been submitted it cannot be changed. |
| conversation_rating_remark_added | A conversation remark has been added to the conversation. |
| snoozed | A conversation has been snoozed. |
| unsnoozed | A conversation has been unsnoozed. |
| assign_and_unsnooze | Assign a conversation and unsnooze it in one action. |
| timer_unsnooze | Unsnooze a conversation after a set time. |
| quick_reply | A quick reply from a customer. |
| custom_action_started | Highlights that a custom action has been triggered an specific conversation. |
| custom_action_finished | Highlights that a custom action has finished execution an specific conversation. |
| conversation_attribute_updated_by_user | Highlights that a conversation attribute was updated by the user. |
| conversation_attribute_updated_by_admin | Highlights that a conversation attribute was updated by an admin. |
| conversation_attribute_updated_by_workflow | Highlights that a conversation attribute was updated by an Inbox workflow. |
| conversation_sla_applied_by_rule | Highlights that a inbox rule has added an SLA to a conversation. |
| conversation_sla_applied_by_workflow | Highlights that a workflow has added an SLA to a conversation. |
| conversation_sla_removed | Highlights that a SLA has been removed from a conversation. |
| conversation_sla_target_missed | Highlights that a conversation has missed its SLA target. |
| user_became_idle | Operator did not receive a reply from the user in time. |
| priority_changed | The priority of the conversation has changed. |
| priority_changed_by_rule | An inbox rule has changed the priority of a conversation. |
| resolution_bot_found_no_answer | Resolution bot found no answer to the user's query. |
| conversation_tags_updated | Conversation tags have been updated. |
| attribute_collector | Operator has added an attribute collector. |
| attribute_collected | User has given Operator a response to the `attribute_collector` |