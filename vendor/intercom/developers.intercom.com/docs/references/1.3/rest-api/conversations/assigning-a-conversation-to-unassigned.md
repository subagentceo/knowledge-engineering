# Assigning a Conversation to Unassigned

You can assign a conversation to be unassigned when you reply to a conversation. You should do this if you do not want the conversation to remain in your own inbox. This will allow other people pick up the conversation when the user replies to it

## Assign to Unassigned

```curl
#Assign converstion to unassigned
curl https://api.intercom.io/conversations/6167678340/reply \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json' \
-H 'Content-Type:application/json' -d'
{
  "body": "Reassigning to no-one!",
  "type": "admin",
  "admin_id": "1234",
  "assignee_id": "0",
  "message_type": "assignment"
}'
```

```text
#Assign converstion to unassigned  
intercom.conversations.reply({
  :id => '10289052666', 
  :type => 'admin',
  :admin_id => "1234",
  :assignee_id => 0,
  :message_type => 'assignment', 
  :body => 'reassigning to no-one!'
})
```

```php
<?php
$intercom->conversations->replyToConversation("10957850396", [
    "intercom_user_id" => "5977303470ab497b1babb9ef",
    "body" => "Reassigning to no-one, i.e. unassigned", // appears as note
    "type" => "admin",
    "admin_id" => "814860",
    "message_type" => "assignment",
    "assignee_id" => "0" 
]);
?>
```

## Assigning a conversation to another teammate

You can also assign a conversation to another admin. Just use the admin ID of the person you want to assign the conversation to instead of '0'. You `POST` body should look something like this:

### Assign to a teammate

```json
{\n  \"body\": \"Reassigning to someone else\",\n  \"type\": \"admin\",\n  \"admin_id\": \"814860\",\n  \"assignee_id\": \"530165\",\n  \"message_type\": \"assignment\"\n}
```

Assign to a team
Remember you can also assign a conversation to a team. Just replace the admin ID with the [team ID](https://developers.intercom.com/intercom-api-reference/reference#list-teams)