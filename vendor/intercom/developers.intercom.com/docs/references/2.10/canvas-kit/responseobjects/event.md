# Event

## Description

The event object enables Intercom to know more about the actions that took place in your app. Currently, you can only tell us when an app's flow has been completed.

## Attributes

| Key | Type | Description |
|  --- | --- | --- |
| type | string | What action took place. The only value currently accepted is `completed`. |


## Example Object

```json
event: { "type": "completed" } // Optional. Recorded by Intercom.
```