# List Conversations

## List Open Conversations for a Particular Admin

```curl
$ curl \\\n\"https://api.intercom.io/conversations?type=admin&admin_id=25&open=true\" \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK\n\n{\n  \"type\": \"conversation.list\",\n  \"conversations\": [\n    {\n      \"assignee\": {\n        \"id\": null,\n        \"type\": \"nobody_admin\"\n       },\n       \"conversation_message\": {\n         \"attachments\": [],\n         \"author\": {\n           \"id\": \"814865\",\n           \"type\": \"admin\"\n         },\n       \"body\": \"<p>Hi \\ud83d\\ude00 We hope you enjoy the example app. To get started just copy and paste some code into the JS editor. Let us know if you think this is useful? <br></p>\",\n       \"delivered_as\": \"automated\",\n       \"id\": \"55951247\",\n       \"subject\": \"\",\n       \"type\": \"conversation\",\n       \"url\": null\n     },\n     \"created_at\": 1543370554,\n     \"customer_first_reply\": {\n       \"created_at\": 1543370575,\n       \"type\": \"conversation\",\n       \"url\": \"https://s.codepen.io/boomerang/iFrameKey-fd6a7a17-5f52-3b6d-c3f6-8acc206fd174/index.html\"\n     },\n     \"customers\": [\n       {\n         \"id\": \"5bfdf73a1e1f0a940ef89995\",\n         \"type\": \"lead\"\n       }\n     ],\n     \"id\": \"19774381531\",\n     \"open\": true,\n     \"read\": true,\n     \"sent_at\": 1543370554,\n     \"snoozed_until\": null,\n     \"state\": \"open\",\n     \"tags\": {\n       \"type\": \"tag.list\",\n       \"tags\": [\n         {\n            \"type\": \"tag\",\n            \"id\": \"1\",\n            \"name\": \"a tag\",\n            \"applied_at\": 1542820819,\n            \"applied_by\": {\n              \"type\": \"admin\",\n              \"id\": \"54\"\n            }\n          },\n          {\n            \"type\": \"tag\",\n            \"id\": \"1\",\n            \"name\": \"a tag\",\n            \"applied_at\": 1542969954,\n            \"applied_by\": {\n              \"type\": \"admin\",\n              \"id\": \"54\"\n            }\n          }\n        ]\n      },\n      \"type\": \"conversation\",\n      \"updated_at\": 1543370587,\n      \"user\": {\n        \"id\": \"5bfdf73a1e1f0a940ef89995\",\n        \"type\": \"lead\"\n      },\n      \"waiting_since\": 1543370575\n    }\n  ],\n  \"pages\": {\n    \"next\": \"https://api.intercom.io/conversations?per_page=20&page=2\",\n    \"page\": 1,\n    \"per_page\": 20,\n    \"total_pages\": 77,\n    \"type\": \"pages\"\n  }\n}
```

```ruby
intercom.conversations.find_all(:type => 'admin', :id => 25, :open => true)
```

```php
<?php\n$intercom->conversations->getConversations([\n    \"type\" => \"admin\",\n    \"admin_id\" => \"891290\",\n    \"open\" => false\n]);\n?>
```

```java
Map<String, String> params = Maps.newHashMap();\nparams.put(\"type\", \"admin\");\nparams.put(\"admin_id\", \"1\");\nConversationCollection conversations = Conversation.list(params);\nwhile (conversations.hasNext()) {\n  Conversation conversation = conversations.next();\n}
```

Conversation lists do not contain `conversation_parts` for brevity. The part list for an individual conversation can be fetched when retrieving the conversation itself.

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

### Returns

A Conversation List object is returned with an array of Conversation objects. These will include a list of tags as Tag objects, with two additional attributes:

| Attribute | Type | Description |
|  --- | --- | --- |
| applied_at | UNIX Timestamp | The date and time when the tag was applied to the conversation. |
| applied_by | Object | Contains the `id` of the `admin` that applied the tag. |