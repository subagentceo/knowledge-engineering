# Create or Update User

## Create or Update Users

```curl
$ curl https://api.intercom.io/users \\-X POST \\-H 'Authorization:Bearer <Your access token>' \\-H 'Accept: application/json' \\-H 'Content-Type: application/json' -d '{  \"user_id\": \"25\",  \"email\": \"email@example.com\",  \"name\": \"Joe Example\",  \"phone\": \"555671243\",  \"signed_up_at\": 1392731331,  \"custom_attributes\": {    \"paid_subscriber\" : true,    \"monthly_spend\": 155.5,    \"team_mates\": 9,    \"last_order_at\":1475569818  },  \"companies\": [    {      \"company_id\" : \"366\",      \"name\" : \"Serenity\",      \"monthly_spend\" : 500    }  ]}
```

```curl
HTTP/1.1 200 OK #Example Response{    \"type\": \"user\",    \"id\": \"5714dd359a3fd47136000001\",    \"user_id\": \"25\",    \"anonymous\": false,    \"email\": \"email@example.com\",    \"phone\": \"555671243\",    \"name\": \"Joe Example\",    \"pseudonym\": null,    \"avatar\": {        \"type\": \"avatar\",        \"image_url\": \"https://secure.gravatar.com/avatar/0c3c17fd49f45c43f482730782b36d36?s=24&d=identicon\"    },    \"app_id\": \"ja43hiec\",    \"companies\": {        \"type\": \"company.list\",        \"companies\": [            {                \"type\": \"company\",                \"company_id\": \"366\",                \"id\": \"574854e3ecd0c547ae0000e4\",                \"name\": \"Serenity\"            }        ]    },    \"location_data\": {\t\t...    },    \"last_request_at\": null,    \"last_seen_ip\": \"1.2.3.4\",    \"created_at\": 1460985141,    \"remote_created_at\": 1392731331,    \"signed_up_at\": 1392731331,    \"updated_at\": 1480075457,    \"session_count\": 0,    \"social_profiles\": {        \"type\": \"social_profile.list\",        \"social_profiles\": [            ...        ]    },    \"unsubscribed_from_emails\": false,    \"user_agent_data\": \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9\",    \"tags\": {        \"type\": \"tag.list\",        \"tags\": []    },    \"segments\": {        \"type\": \"segment.list\",        \"segments\": []    },    \"custom_attributes\": {        \"paid_subscriber\": true,        \"monthly_spend\": 155.5,        \"team_mates\": 9,        \"last_order_at\": 1475569818    }}
```

```ruby
intercom.users.create(:user_id => '25', :email => \"email@example.com\")
```

```php
<?php$intercom->users->create([    \"user_id\" => \"25\",    \"email\" => \"email@example.com\",    \"name\" => \"Joe Example\",    \"phone\" => \"555671243\",    \"signed_up_at\" => 1392731331,    \"last_seen_ip\" => \"1.2.3.4\",    \"last_seen_user_agent\" => \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9\",    \"custom_attributes\" => [        \"paid_subscriber\"  => true,        \"monthly_spend\" => 155.5,        \"team_mates\" => 9,        \"last_order_at\" =>1475569818,    ],    \"companies\" => [        [            \"company_id\"  => \"366\",            \"name\"  => \"Serenity\",            \"monthly_spend\"  => 500        ],    ],]);?>
```

```java
import static io.intercom.api.CustomAttribute.*;User user = new User().setEmail(\"email@example.com\").setUserId(\"25\").addCustomAttribute(newStringAttribute(\"role\", \"sergeant\")).addCustomAttribute(newBooleanAttribute(\"browncoat\", true));user = User.create(user);
```

Users can be created or updated via a `POST` method to `https://api.intercom.io/users`, which accepts a JSON object describing the user.

Users not found via `email` or `user_id` will be created, and those that are found will be updated.

Note that the following lookup order applies when updating users - `id` then `user_id` then `email`, and results in the following logic -

- `id` is matched - the `user_id` and `email` will be updated if they are sent.
- `user_id` match - the `email` will be updated, the `id` is not updated.
- `email` match where no `user_id` set on the matching user - the `user_id` will be set to the value sent in the request, the `id` is not updated.
- `email` match where there is a `user_id` set on the matching user - a new unique record with new `id` will be created if a new value for `user_id` is sent in the request.


Note that email values are downcased after they have been submitted to our API.

### Attributes

The table below shows the fields you can create or update for a user -

| Parameter | Required | Description |
|  --- | --- | --- |
| user_id | Required if no email is supplied. | A unique string identifier for the user. It is required on creation if an email is not supplied. |
| email | Required if no user_id is supplied. | The user's email address. It is required on creation if a user_id is not supplied. |
| phone | no | The user's phone number. |
| id | no | The id may be used for user updates. |
| signed_up_at | no | The time the user signed up |
| name | no | The user's full name |
| custom_attributes | no | A hash of key/value pairs to represent custom data you want to attribute to a user.  The key must be an existing [Data Attribute](/docs/references/1.4/rest-api/data-attributes/data-attributes). |
| companies | no | Identifies the companies this user belongs to. |
| last_request_at | no | A UNIX timestamp (in seconds) representing the date the user last visited your application. |
| unsubscribed_from_emails | no | A boolean value representing the users unsubscribed status. *default value if not sent is false.* |
| update_last_request_at | no | A boolean value, which if true, instructs Intercom to update the users' last_request_at value to the current API service time in UTC. *default value if not sent is false.* |
| new_session | no | A boolean value, which if true, instructs Intercom to register the request as a session. |


In particular, please note that location data and social profiles are computed by the server and can not be updated via the API.

### Custom Attributes

The `custom_attributes` object allows you to send any information you wish about a user with the following restrictions:

- Field names can only contain alphanumeric characters, most currency symbols, and hyphens.
- Field names must not contain periods `.` or dollar `'&#36;'` characters.
- Field names must be no longer than 190 characters.
- Field values must be JSON Strings, Numbers or Booleans - Objects and Arrays will be rejected.
- String field values must be no longer than 255 characters.
- Maximum of 250 fields.


Custom attribute as date
You can send dates as custom attributes by sending a unix timestamp. If the name of your custom attribute ends with **_at** then we'll automatically treat it as a date, rather than a number. See **[here](https://docs.intercom.com/configure-intercom-for-your-product-or-site/customize-intercom-to-be-about-your-users/send-custom-user-attributes-to-intercom#custom-attributes-as-dates)** for more info

### Returns

A created or updated user object.

New user objects will be provided with an `id` field - this value cannot be created or edited by clients. Social profiles, location data and avatars are processed asynchronously, and may require a subsequent call to fetch their details.