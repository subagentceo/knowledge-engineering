# Context

The `context` object describes where an action has taken place, and includes any relevant information you may need to customise what appears on the `card`.

You will receive a `context` object as part of a request from Intercom, but depending on the webhook and the location where it is triggered, not all of this context information is available.

Webhooks can be hit from Messenger Web context, Messenger SDK context, Inbox context, or Messages context:

![](/assets/d555d86-context_object_matrix.36a348c84fc9f18a7ae217dc1399ea724bf8f9120b7d7b2cae49cba44e31aa34.71a4f21c.png)

| Key | Type | Description |
|  --- | --- | --- |
| location | string | This can be either 'conversation', 'home', or 'message', depending on where the action took place. |
| locale | string | The default end-user language of the Messenger. Use to localise Messenger App content. |
| conversation_id | integer | Only present if the app was added to a conversation. |
| messenger_action_colour | string | The messengers action colour. Use in Sheets and Icons to make a Messenger App experience feel part of the host Messenger. |
| messenger_background_colour | string | The messengers background colour. Use in Sheets and Icons to make a Messenger App experience feel part of the host Messenger. |
| referrer | string | The current page URL of the end-user. |


```json
{
  conversation_id: 4294967297,
  locale: 'en', 
  location: 'conversation',
  messenger_action_color: '#333333',
  messenger_background_color: '#333333',
  referrer: 'https://intercom.com/'
}
```

```json
{
  locale: 'en', 
  location: 'home',
  messenger_action_color: '#333333',
  messenger_background_color: '#333333',
  referrer: 'https://intercom.com/'
}
```

```json
{
  "locale": 'en',
  "location": 'message',
  "messenger_action_color": '#f06192',
  "messenger_background_color": '#00acc1'
}
```