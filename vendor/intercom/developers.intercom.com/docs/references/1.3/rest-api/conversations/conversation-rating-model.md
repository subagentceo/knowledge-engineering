# Conversation Rating Model

## Example Conversation Part Object

```json
    \"conversation_rating\": {\n        \"rating\": null,\n        \"remark\": null,\n        \"created_at\": null,\n        \"customer\": {\n            \"type\": null,\n            \"id\": null\n        },\n        \"teammate\": {\n            \"type\": null,\n            \"id\": null\n        }\n    }
```

A conversation rating contains information relating to a customer's satisfaction with their interaction with your team. For more info on conversation ratings please see [**here**](https://docs.intercom.com/responding-to-users-and-visitors/see-your-team-s-progress/measure-customer-satisfaction-with-conversation-ratings)

### Conversation Rating Object

| Attribute | Type | Description |
|  --- | --- | --- |
| rating | integer | The rating, between 1 and 5, for the conversation |
| remark | string | An optional field to add a remark to correspond to the number rating |
| created_at | timestamp | The time the rating was requested in the conversation being rated |
| customer | object | An object containing the ID and type of the customer (e.g. it could be a user or lead) |
| teammate | object | An object containing the ID and type of the Intercom teammate associated with the conversation when it was rated |


### Customer Object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | A conversation can be rated by either a user or a lead. This will default to null when there is no rating on a conversation. |
| id | string | The Intercom ID of the customer rating the conversation. This defaults to null. |


### Teammate Object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Currently this will always be of type admin. It will be null by default if the conversation has not been rated |
| id | string | This is the ID of the teammate being rated. This will default to null. |