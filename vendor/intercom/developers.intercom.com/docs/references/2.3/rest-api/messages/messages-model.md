# The message model

## Example Message Object

```json
{
    "type": "message",
    "id": "489373052",
    "created_at": 1539897198,
    "subject": "This is the subject - if it's an email",
    "body": "<p>Hello</p>",
    "message_type": "email"
}
```

Message are how you reach out to contacts in Intercom. They are created when an admin sends an outbound message to a contact.

### Message Object

| Key | Type | Description |
|  --- | --- | --- |
| type | String | Always `message`. |
| id | String | The id representing the message. |
| created_at | UNIX Timestamp | The time the conversation was created. |
| subject | String | The subject of the message.  Only present if `message_type: email`. |
| body | String | The message body, which may contain HTML. |
| message_type | String | The type of message that was sent. Can be `email`, `inapp`, `facebook` or `twitter`. |
| conversation_id | String | The associated conversation_id. Only returned when [creating a conversation](/docs/references/2.3/rest-api/conversations/create-a-conversation). |