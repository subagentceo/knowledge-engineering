# Conversation Part Model

## Example Conversation Part Object

```json
{
    "type": "conversation_part",
    "id": "4412",
    "part_type": "comment",
    "body": "<p>Hi Jane, it's all great thanks!</p>",
    "created_at": 1400857494,
    "updated_at": 1400857494,
    "notified_at": 1400857587,
    "assigned_to": null,
    "author": {
      "type": "user",
      "id": "536e564f316c83104c000020"
    },
    "attachments": []
}
```

```json
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
    "attachments": []
}
```

A conversation part describes an element of the conversation.

A conversation part has a html encoded body, an author, and may have an attachments list. Conversation parts have created, updated and notified timestamps. Each conversation part also has a part type - these types are described below.

### Conversation Part Object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Always `conversation_part`. |
| id | string | The id representing the conversation part. |
| part_type | string | The type of conversation part. |
| body | string | The message body, which may contain HTML.  For Twitter, this will show a generic message regarding why the body is obscured. |
| created_at | timestamp | The time the conversation part was created. |
| updated_at | timestamp | The last time the conversation part was updated. |
| notified_at | timestamp | The time the user was notified with the conversation part. |
| assigned_to | string | The id of the admin that was assigned the conversation by this conversation_part (`null` if there has been no change in assignment.) |
| author | User or Admin | The type of individual that sent the message (`user`, `admin` or `bot`) and their related `id`.  For Twitter, this will be blank. |
| attachments | List | A list of attachments for the part. |


### Conversation Part Types

| Type | Description |
|  --- | --- |
| comment | Standard reply from customer or admin to a conversation |
| note | A note created by an admin on the conversation. A note will only be viewable as an admin |
| note_and_reopen | Add a note and reopen the conversations in the one action |
| assignment | An assignment of the conversation to an admin, or *Nobody* |
| open | Identifies a conversation has been opened |
| close | Identifies a conversation has been closed |
| away_mode_assignment | Conversation has been assigned due to the admin being in away mode |
| participant_added | A participant has been added to a group conversation |
| participant_removed | A participant has been removed from a group conversation |
| conversation_rating_changed | A conversation rating has been changed, not this can only occur before the rating has been submitted. Once it has been submitted it cannot be changed |
| conversation_rating_remark_added | A conversation remark has been added to the converation |
| snoozed | A conversation has been snoozed |
| unsnoozed | A conversation has been unsnoozed |
| assign_and_unsnooze | Assign a conversation and unsnooze it in one action. |
| timer_unsnooze | Unsnooze a conversation after a set time |