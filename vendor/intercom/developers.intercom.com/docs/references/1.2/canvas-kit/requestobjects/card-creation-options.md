# Card Creation Options

The `card_creation_options` object is a JSON hash where you can add key-value pairs.

It's sent to the `initialize URL` to specify any data that had been inputted by teammates during the `configure` flow. This happens once you respond with the [results object](/docs/references/1.2/canvas-kit/responseobjects/results) at the end of the configure flow.

```json
{
  "card_creation_options": {
    "name": "data one",
     ... //Can be more than one pair
  }
}
```

```json
{
  card_creation_options: {
    <set of key-value pairs>
  },
  app_id: "<string id_code of the app using the card>",
  context: {<Context object>}
}
```