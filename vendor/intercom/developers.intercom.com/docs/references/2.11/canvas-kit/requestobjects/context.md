# Context

## Description

The context object provides additional details on where the app has been added (or is currently being used), what page the app is being used on, and information on the Messenger settings. This is in order for you give a fully customised experience based on the customers use case.

If the `location` is `conversation` then you will also be given a `conversation_id`. If you need to use details about the conversation, then you have to use the `conversation_id` to [make a call to our Conversations API and retrieve the conversation object](https://developers.intercom.com/intercom-api-reference/reference#get-a-single-conversation).

## Attributes

| Key | Type | Location | Description |
|  --- | --- | --- | --- |
| conversation_id | integer | Conversation | The id of the conversation where the app is added or being used. |
| location | string | Conversation, Messenger Home, Message, Operator | Where the app is added or the action took place. Can be either 'conversation', 'home', 'message', or 'operator'. |
| locale | string | Conversation, Messenger Home, Message, Operator | The default end-user language of the Messenger. Use to localise Messenger App content. |
| messenger_action_colour | string | Conversation, Messenger Home, Message, Operator | The messengers action colour. Use in Sheets and Icons to make a Messenger App experience feel part of the host Messenger. |
| messenger_background_colour | string | Conversation, Messenger Home, Message, Operator | The messengers background colour. Use in Sheets and Icons to make a Messenger App experience feel part of the host Messenger. |
| referrer | string | Conversation, Messenger Home, Message, Operator | The current page URL where the app is being used. |


## Example Objects

```json
{
  conversation_id: 4294967297,
  locale: "en", 
  location: "conversation",
  messenger_action_color: "#333333",
  messenger_background_color: "#333333",
  referrer: "https://intercom.com/"
}
```

```json
{
  locale: "en", 
  location: "conversation",
  messenger_action_color: "#333333",
  messenger_background_color: "#333333",
  referrer: "https://intercom.com/"
}
```