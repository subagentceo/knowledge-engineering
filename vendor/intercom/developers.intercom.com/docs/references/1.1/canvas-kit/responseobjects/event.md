# Event

The `event` object property enables Intercom to know more about the actions that were processed by your app, in the response to a `submit` or `submit-sheet` action.

```json
{
  event: {
  	type: "completed"
  }
}
```

| Key | Type | Description |
|  --- | --- | --- |
| type | string | The event type of the reported action. The only value currently accepted is `completed`. |