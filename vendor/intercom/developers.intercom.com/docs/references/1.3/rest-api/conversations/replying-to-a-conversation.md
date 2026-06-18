# Replying to a Conversation

## Reply with and Without Attachments

```curl
# Reply without attachment\n$ curl 'https://api.intercom.io/conversations/{conversation_id}/reply' \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json' \\\n-H 'Content-Type:application/json' -d'\n{\n  \"intercom_user_id\": \"536e564f316c83104c000020\",\n  \"body\": \"Thanks again :)\",\n  \"type\": \"user\",\n  \"message_type\": \"comment\"\n}'\n\n\n\n# Reply with attachment\n$ curl https://api.intercom.io/conversations/{conversation_id}/reply \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json' \\\n-H 'Content-Type:application/json' -d'\n{\n  \"intercom_user_id\": \"536e564f316c83104c000020\",\n  \"body\": \"Thanks again :)\",\n  \"type\": \"user\",\n  \"message_type\": \"comment\",\n  \"attachment_urls\": [\"http://www.example.com/attachment.jpg\"]\n}
```

```curl
HTTP/1.1 200 OK\n\n{\n    \"type\": \"conversation\",\n    \"id\": \"{conversation_id}\",\n    # ...\n}\n# NB: Full Conversation Object returned
```

```ruby
#Reply without attachment\nintercom.conversations.reply(:id => conversation.id, :type => 'user', \n  :email => 'bob@example.com', :message_type => 'comment', :body => 'foo')\n\n#Reply with attachment\nintercom.conversations.reply(:id => conversation.id, :type => 'user', \n  :email => 'bob@example.com', :message_type => 'comment', \n  :body => 'foo', :attachment_urls => [\"http://www.example.com/attachment.jpg\"])
```

```php
<?php\n//Reply without attachment\n$intercom->conversations->replyToConversation(\"10957850396\", [\n    \"intercom_user_id\" => \"5977303470ab497b1babb9ef\",\n    \"body\" => \"Thinking: the talking of the soul with itself\",\n    \"type\" => \"user\",\n    \"message_type\" => \"comment\"\n]);\n\n\n//Reply with attachment\n$intercom->conversations->replyToConversation(\"10957850396\", [\n  \"intercom_user_id\" => \"5977303470ab497b1babb9ef\",\n  \"body\" => \"Thinking: the talking of the soul with itself\",\n  \"type\" => \"user\",\n  \"message_type\" => \"comment\",\n  \"attachment_urls\" => [\"http://www.example.com/attachment.jpg\"]\n]);\n?>
```

```java
User user = new User().setId(\"5310d8e8598c9a0b24000005\");\nUserReply userReply = new UserReply(user);\nuserReply.setBody(\"Mighty fine shindig\");\n\nConversation.reply(\"66\", userReply);\n\nAdmin admin = new Admin().setId(\"1\");\nAdminReply adminReply = new AdminReply(admin);\nadminReply.setBody(\"These apples are healthsome\");\n\nConversation.reply(\"66\", adminReply);
```

## Reply with a note

```curl
# You can replay with a note also and use some HTML formatting such as bold, italics, and lists\ncurl 'https://api.intercom.io/conversations/{conversation_id}/reply' \\\n-X POST \\\n-H 'Authorization: Bearer <Your access token>' \\\n-H 'Accept: application/json' \\\n-H 'Content-Type: application/json' \\\n{\n  \"admin_id\": \"814860\",\n  \"body\": \"<html> <body>  <h2>An Unordered HTML List</h2>  <ul>   <li>Coffee</li>   <li>Tea</li>   <li>Milk</li> </ul>    <h2>An Ordered HTML List</h2>  <ol>   <li>Coffee</li>   <li>Tea</li>   <li>Milk</li> </ol>   </body> </html>\",\n  \"type\": \"admin\",\n  \"message_type\": \"note\"\n}\n
```

```text
HTTP/1.1 200 OK\n\n{\n    \"type\": \"conversation\",\n    \"id\": \"{conversation_id}\",\n    # ...\n}\n# NB: Full Conversation Object returned
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