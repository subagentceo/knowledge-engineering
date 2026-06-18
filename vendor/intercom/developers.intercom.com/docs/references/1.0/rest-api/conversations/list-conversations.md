# List Conversations

## List Open Conversations for a Particular Admin

```curl
$ curl \
"https://api.intercom.io/conversations?type=admin&admin_id=25&open=true" \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK

{
    "type": "conversation.list",
    "pages": {
        "type": "pages",
        "next": "https://api.intercom.io/conversations?per_page=20&page=2",
        "page": 1,
        "per_page": 20,
        "total_pages": 40
    },
    "conversations": [
        {
            "type": "conversation",
            "id": "13257844375",
            "created_at": 1507709579,
            "updated_at": 1507709579,
            "waiting_since": 1507709579,
            "snoozed_until": null,
            "user": {
                "type": "user",
                "id": "5813655e889f1c9e64a1155b"
            },
            "customers": [
                {
                    "type": "user",
                    "id": "5813655e889f1c9e64a1155b"
                }
            ],
            "assignee": {
                "type": "nobody_admin",
                "id": null
            },
            "conversation_message": {
                "type": "conversation_message",
                "id": "139303349",
                "subject": "",
                "body": "<p>test msg</p>",
                "author": {
                    "type": "user",
                    "id": "5813655e889f1c9e64a1155b"
                },
                "attachments": [],
                "url": "https://test.com/index.html"
            },
            "open": true,
            "state": "open",
            "read": true
        },
	      ...
	      ...
    ]
}
```

```ruby
intercom.conversations.find_all(:type => 'admin', :id => 25, :open => true)
```

```php
<?php
$intercom->conversations->getConversations([
    "type" => "admin",
    "admin_id" => "891290",
    "open" => false
]);
?>
```

```java
Map<String, String> params = Maps.newHashMap();
params.put("type", "admin");
params.put("admin_id", "1");
ConversationCollection conversations = Conversation.list(params);
while (conversations.hasNext()) {
  Conversation conversation = conversations.next();
}
```

Conversation lists do not contain a `conversation_parts` or `tags` Object, for brevity. The part list for an individual conversation can be fetched when retrieving the conversation itself.

### All Conversations

To fetch a list of all conversations send a `GET` request to `https://api.intercom.io/conversations` with no parameters. A Conversation List object is returned.

Conversations can be sorted with the following parameters:

| Parameter | Required | Description |
|  --- | --- | --- |
| order | no | `asc` or `desc`. Return the conversations in ascending or descending order. *defaults to desc* **unless** an incorrect value is used i.e. not `asc` or `desc`. In these cases we do not throw an error and return the list in *asc* order. |
| sort | no | what field to sort the results by. Valid values: `created_at`, `updated_at`, `waiting_since`.  *defaults to updated_at*. |


Where'd my conversations go?
When sorting by `waiting_since`, not all conversations are returned. If a teammate was the last person to reply, or the conversation is closed then those conversations will not show up on this list. This is to ensure you have an easy way of identifying and prioritizing those customers who have been waiting longest.

Ordering and sorting with filters
It should be noted that the format for ordering and sorting is different when listing conversations for customers and admins as opposed to listing all conversations (i.e. without any filters). When you are using filters such as admin/customers '***order***' refers to the fields you want to order the list by and '***sort***' refers to whether you want it sorted asc or desc. The reverse is true when listing conversation without any filtering

### Conversations by Admin

You can send the following parameters to view a single Admin's conversations -

| Parameter | Required | Description |
|  --- | --- | --- |
| type | yes | The type of entity to query for. Value must be `admin` for admin queries. |
| admin_id | yes | The id for the Admin whose conversations to retrieve.  To retrieve all unassigned conversations, set the id to be 'nobody'. |
| open | no | Boolean, when true fetches just open conversations, when false just closed conversations |
| display_as | no | Set to `plaintext` to retrieve conversation messages in plain text |
| pages | no | Optional. A pagination object, which may be empty, indicating no further conversations to fetch. |
| order | no | what field to sort the results by. Valid values: `created_at`, `updated_at`, `waiting_since`.  *defaults to updated_at*. |
| sort | no | `asc` or `desc`. Return the conversations in ascending or descending order. *defaults to desc*. |


### Conversations by Customers

You can send the following parameters to view a single Customer's conversations -

| Parameter | Required | Description |
|  --- | --- | --- |
| type | yes | The type of entity to query for. Value must be `user`. |
| intercom_user_id | one of | The id of the User whose conversations to retrieve |
| user_id | one of | Your user_id for the user |
| email | one of | Your email for the user |
| unread | no | Boolean, when true fetches just unread conversations |
| display_as | no | Set to `plaintext` to retrieve conversation messages in plain text |
| pages | no | Optional. A pagination object, which may be empty, indicating no further conversations to fetch. |
| order | no | what field to sort the results by. Valid values: `created_at`, `updated_at`.  *defaults to updated_at*. |
| sort | no | `asc` or `desc`. Return the conversations in ascending or descending order. *defaults to desc*. |


Listing leads using type 'user'
If you want to list lead conversations you will need to set the type to 'user' and use the 'intercom_user_id' as the identifier. It will not work with 'user_id' or type contact for example.

When querying the conversations for a particular User, we carry out message matching for that User and your existing Auto Messages, at most once per 15 minutes.