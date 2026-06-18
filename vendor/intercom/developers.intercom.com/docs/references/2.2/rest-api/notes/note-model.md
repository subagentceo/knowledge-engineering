# The note model

## Example Note Object

```json
{\n  \"type\": \"note\",\n  \"id\": \"16\",\n  \"created_at\": 1389913941,\n  \"body\": \"<p>Text for my note</p>\",\n  \"author\": {\n    \"type\": \"admin\",\n    \"id\": \"21\",\n    \"name\": \"Jayne Cobb\",\n    \"email\": \"jayne@example.com\",\n    \"companies\": []\n  },\n  \"user\": {\n    \"type\": \"user\",\n    \"id\": \"5310d8e8598c9a0b24000005\"\n  }\n}
```

Notes allow you to annotate and comment on your contacts.

Companies and Conversations
Currently not possible to create notes for companies. Reach out if you want to submit a feature request, we take these into account.\n\nConversations notes are created via the Reply a conversations API.

### Note Object

| Key | Type | Description |
|  --- | --- | --- |
| type | String | *value is 'note'* |
| id | String | The id representing the note |
| created_at | Timestamp | The time the note was created |
| user | Object | The user the note was created about |
| body | String | The body text of the note. |
| author | Object | Optional. Represents the Admin that created the note |