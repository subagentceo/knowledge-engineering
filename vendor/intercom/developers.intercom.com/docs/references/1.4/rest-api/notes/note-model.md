# Note Model

## Example Object

```json
{\n  \"type\": \"note\",\n  \"id\": \"16\",\n  \"created_at\": 1389913941,\n  \"body\": \"<p>Text for my note</p>\",\n  \"author\": {\n    \"type\": \"admin\",\n    \"id\": \"21\",\n    \"name\": \"Jayne Cobb\",\n    \"email\": \"jayne@example.com\",\n    \"companies\": []\n  },\n  \"user\": {\n    \"type\": \"user\",\n    \"id\": \"5310d8e8598c9a0b24000005\"\n  }\n}
```

### Note Object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'note'* |
| id | string | The id representing the note |
| created_at | timestamp | The time the note was created |
| user | User | The user the note was created about |
| body | string | The body text of the note. |
| author | Admin | Optional. Represents the Admin that created the note |