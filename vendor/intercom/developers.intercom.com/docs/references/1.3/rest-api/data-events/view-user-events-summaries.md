# View User Event Summaries

## Get summary count of user events

```curl
$ curl 'https://api.intercom.io/events?type=user&user_id=314159&summary=true' \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json'
```

```curl
{\n    \"type\": \"event.summary\",\n    \"email\": \"test-user@example.com\",\n    \"intercom_user_id\": \"56e1e5d4a40df1cc57000101\",\n    \"user_id\": \"314159\",\n    \"events\": [\n        {\n            \"name\": \"updated-profile\",\n            \"first\": \"2016-03-18T10:05:15.000Z\",\n            \"last\": \"2016-03-18T13:28:38.000Z\",\n            \"count\": 5,\n            \"description\": null\n        },    \n        {\n            \"name\": \"purchased-item\",\n            \"first\": \"2016-09-30T11:39:06.000Z\",\n            \"last\": \"2016-09-30T11:39:06.000Z\",\n            \"count\": 4,\n            \"description\": null\n        },\n        {\n            \"name\": \"subscribed-for-demo\",\n            \"first\": \"2016-11-24T12:26:34.000Z\",\n            \"last\": \"2016-11-24T12:26:34.000Z\",\n            \"count\": 2,\n            \"description\": null\n        }\n    ]\n}
```

If you simply want to get a count of the number of different events associated with a user then you can use the 'summary=true' parameter of the events endpoint. This means you do not receive the full list of all users events and just the counts of the different events per user.