# Updating the Last Seen Time

## Example Update for Last Seen Time

```curl
$ curl https://api.intercom.io/users \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json' \\\n-H 'Content-Type: application/json' -d '\n{\n  \"user_id\": \"25\",\n  \"last_request_at\": 1480076371\n}'
```

```curl
{\n    \"type\": \"user\",\n    \"id\": \"5714dd359a3fd47136000001\",\n    \"user_id\": \"25\",\n    \"anonymous\": false,\n    \"email\": \"email@example.com\",\n    \"phone\": \"555671243\",\n    \"name\": \"Joe Example\",\n    \"pseudonym\": null,\n    \"avatar\": {\n        \"type\": \"avatar\",\n        \"image_url\": \"https://secure.gravatar.com/avatar/0c3c17fd49f45c43f482730782b36d36?s=24&d=identicon\"\n    },\n    \"app_id\": \"ja43hiec\",\n    \"companies\": {\n        \"type\": \"company.list\",\n        \"companies\": [\n            {\n                \"type\": \"company\",\n                \"company_id\": \"366\",\n                \"id\": \"574854e3ecd0c547ae0000e4\",\n                \"name\": \"Serenity\"\n            }\n        ]\n    },\n    \"location_data\": {\n        ...\n    },\n    \"last_request_at\": 1480076371,\n    \"last_seen_ip\": \"1.2.3.4\",\n    \"created_at\": 1460985141,\n    \"remote_created_at\": 1392731331,\n    \"signed_up_at\": 1392731331,\n    \"updated_at\": 1480076399,\n    \"session_count\": 0,\n    \"social_profiles\": {\n        \"type\": \"social_profile.list\",\n        \"social_profiles\": [\n         ...\n        ]\n    },\n    \"unsubscribed_from_emails\": false,\n    \"user_agent_data\": \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9\",\n    \"tags\": {\n        \"type\": \"tag.list\",\n        \"tags\": []\n    },\n    \"segments\": {\n        \"type\": \"segment.list\",\n        \"segments\": []\n    },\n    \"custom_attributes\": {\n        \"paid_subscriber\": true,\n        \"monthly_spend\": 155.5,\n        \"team_mates\": 9,\n        \"last_order_at\": 1475569818\n    }\n}
```

```ruby
intercom.users.create(:user_id => '25', :last_request_at => Time.now)
```

```php
<?php\n$intercom->users->create([\n    \"user_id\" => \"550\",\n    \"email\" => \"plato@phil.com\",\n    \"last_request_at\" => (time() - (2*24*60*60)) #2 days ago\n]);\n?>
```

```java
user.setUpdateLastRequestAt(true);\nUser.update(user);
```

To update the last time the user was seen in your App, send the time in the `last_request_at` field in a user update request. You can also send `update_last_request_at: true` to tell the API to update the last request time to the time of your call (in UTC).