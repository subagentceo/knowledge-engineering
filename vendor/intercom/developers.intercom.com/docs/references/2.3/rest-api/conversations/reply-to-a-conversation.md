# Reply to a conversation

## Example Request & Response (Contact Reply)

```curl
$ curl 'https://api.intercom.io/conversations/{id/last}/reply' \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json' \
-H 'Content-Type:application/json' -d 

{
  "message_type": "comment",
  "type": "user",
  "intercom_user_id": "536e564f316c83104c000020",
  "body": "Thanks again :)"
}
```

```curl
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
        "url": "https://intercom-survey-app.glitch.me/"
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
            "type": "admin",
          	"name": "Mark Strong",
          	"email": "mk@acmeinc.org"
        }
    ],
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
    "waiting_since": 64654125776
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
            "type": null,
            "name": null,
            "email": null
        }
    },
    "statistics": {
      "time_to_assignment": 2310,
      "time_to_admin_reply": 2408,
      "time_to_first_close": 4915 ,
      "time_to_last_close": 5125,
      "median_time_to_reply": 321,
      "first_contacat_reply_at": 1539897200,
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
}
```

```ruby
#Reply without attachment
intercom.conversations.reply(:id => conversation.id, :type => 'user', 
  :email => 'bob@example.com', :message_type => 'comment', :body => 'foo')

#Reply with attachment
intercom.conversations.reply(:id => conversation.id, :type => 'user', 
  :email => 'bob@example.com', :message_type => 'comment', 
  :body => 'foo', :attachment_urls => ["http://www.example.com/attachment.jpg"])
```

```php
<?php
//Reply without attachment
$intercom->conversations->replyToConversation("10957850396", [
    "intercom_user_id" => "5977303470ab497b1babb9ef",
    "body" => "Thinking: the talking of the soul with itself",
    "type" => "user",
    "message_type" => "comment"
]);


//Reply with attachment
$intercom->conversations->replyToConversation("10957850396", [
  "intercom_user_id" => "5977303470ab497b1babb9ef",
  "body" => "Thinking: the talking of the soul with itself",
  "type" => "user",
  "message_type" => "comment",
  "attachment_urls" => ["http://www.example.com/attachment.jpg"]
]);
?>
```

```java
User user = new User().setId("5310d8e8598c9a0b24000005");
UserReply userReply = new UserReply(user);
userReply.setBody("Mighty fine shindig");

Conversation.reply("66", userReply);

Admin admin = new Admin().setId("1");
AdminReply adminReply = new AdminReply(admin);
adminReply.setBody("These apples are healthsome");

Conversation.reply("66", adminReply);
```

## Example Request & Response (Admin Reply - Note)

```curl
$ curl 'https://api.intercom.io/conversations/{id/last}/reply' \\\n-X POST \\\n-H 'Authorization: Bearer <Your access token>' \\\n-H 'Accept: application/json' \\\n-H 'Content-Type: application/json' -d\n\n{\n  \"message_type\": \"note\",\n  \"type\": \"admin\",\n  \"admin_id\": \"814860\",\n  \"body\": \"<html> <body>  <h2>An Unordered HTML List</h2>  <ul>   <li>Coffee</li>   <li>Tea</li>   <li>Milk</li> </ul>    <h2>An Ordered HTML List</h2>  <ol>   <li>Coffee</li>   <li>Tea</li>   <li>Milk</li> </ol>   </body> </html>\"\n}
```

```text
HTTP/1.1 200 OK\n\n{\n    \"type\": \"conversation\",\n    \"id\": \"{conversation_id}\",\n    # ...\n}\n# NB: Full Conversation Object returned
```

You can reply to a conversation with a message from an admin or on behalf of a contact, or with a note for admins.

### Request Path Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | Yes, if not `last` | The identifier for the conversation as given by Intercom. |
| last | String | Yes, if no `id` | You can also reply to the most recent conversation on a workspace by specifying `last` as the string. |


### Request Body Parameters

For a reply sent on behalf a contact:

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| message_type | String | Yes | Always `comment`. |
| type | String | Yes | Always `user`. |
| body | String | Yes | The text body of the comment. |
| intercom_user_id | String | Yes, if no `user_id` or `email` | The identifier for the contact as given by Intercom. |
| user_id | String | Yes, if no `intercom_user_id` or `email` | The external_id you have defined for the contact. |
| email | String | Yes, if no `intercom_user_id` or `user_id` | The email you have defined for the user. |
| attachment_urls | Array of Strings | No | A list of image URLs that will be added as attachments. You can include up to 5 URLs. |


For a reply sent on behalf of an admin:

| Argument | Type | Required? | Description |
|  --- | --- | --- | --- |
| message_type | String | Yes | Accepts `comment` or `note`. |
| type | String | Yes | Always `admin`. |
| admin_id | String | Yes | The `id` of the admin who is authoring the comment. |
| body | String | Yes | The text body of the reply.  Notes accept some HTML formatting. |
| attachment_urls | Array of Strings | No | A list of URLs of files that will be added as attachments. You can include up to 5 attachments. |


### Response

This will return the [Conversation](/docs/references/2.3/rest-api/conversations/conversation-model) which was replied to.