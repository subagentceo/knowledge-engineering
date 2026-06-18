# Replying to a Conversation

## Reply with and Without Attachments

```curl
# Reply without attachment
$ curl 'https://api.intercom.io/conversations/{conversation_id}/reply' \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json' \
-H 'Content-Type:application/json' -d'
{
  "intercom_user_id": "536e564f316c83104c000020",
  "body": "Thanks again :)",
  "type": "user",
  "message_type": "comment"
}'



# Reply with attachment
$ curl https://api.intercom.io/conversations/{conversation_id}/reply \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json' \
-H 'Content-Type:application/json' -d'
{
  "intercom_user_id": "536e564f316c83104c000020",
  "body": "Thanks again :)",
  "type": "user",
  "message_type": "comment",
  "attachment_urls": ["http://www.example.com/attachment.jpg"]
}
```

```curl
HTTP/1.1 200 OK

{
    "type": "conversation",
    "id": "{conversation_id}",
    # ...
}
# NB: Full Conversation Object returned
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

## Reply with a note

```curl
# You can replay with a note also and use some HTML formatting such as bold, italics, and lists
curl 'https://api.intercom.io/conversations/{conversation_id}/reply' \
-X POST \
-H 'Authorization: Bearer <Your access token>' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
{
  "admin_id": "814860",
  "body": "<html> <body>  <h2>An Unordered HTML List</h2>  <ul>   <li>Coffee</li>   <li>Tea</li>   <li>Milk</li> </ul>    <h2>An Ordered HTML List</h2>  <ol>   <li>Coffee</li>   <li>Tea</li>   <li>Milk</li> </ol>   </body> </html>",
  "type": "admin",
  "message_type": "note"
}
```

```text
HTTP/1.1 200 OK

{
    "type": "conversation",
    "id": "{conversation_id}",
    # ...
}
# NB: Full Conversation Object returned
```

### Arguments

For a User Reply:

| Argument | Required | Description |
|  --- | --- | --- |
| type | Yes | `user` |
| message_type | Yes | Must be `comment` |
| body | Yes | The text body of the comment |
| intercom_user_id | one of | The Intercom defined id representing the user |
| user_id | one of | The user id you have defined for the user |
| email | one of | The email you have defined for the user |
| attachment_urls | No | A list of URLs of (image only) files that will be added as attachments. You can include up to 5 attachments. |


or for an Admin Reply:

| Argument | Required | Description |
|  --- | --- | --- |
| type | Yes | `admin` |
| message_type | Yes | Must be `comment`, `assignment`, `open`, `close`, or `note` |
| admin_id | Yes | The id of the Admin who is authoring the comment |
| body | No | The text body of the comment. **Must be set for `comment` and `note`** |
| assignee_id | No | **Assignments only**: assigns the conversation to the given admin id. Note this must be "0" if you want to move it to unassigned |
| attachment_urls | No | A list of URLs of files that will be added as attachments. You can include up to 5 attachments.. |


Notes are not visible to the end user.

### Returns

A full Conversation object, with Conversation Parts.