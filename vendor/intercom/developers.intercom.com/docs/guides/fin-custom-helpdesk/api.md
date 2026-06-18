# Fin Custom Helpdesk API

The Fin Custom Helpdesk API allows you to integrate your custom helpdesk with Fin through a standardized set of API endpoints and webhooks.


Version: 0.0.1

## Servers

Your Custom Helpdesk API (replace with your actual domain)
```
https://helpdesk.example.com/api/fin
```

## Security

### BearerAuth

OAuth2 access token configured in Fin Deployment UI

Type: oauth2

### WebhookSignature

Webhook key for the custom helpdesk integration. Obtained from Fin Deployment UI.


Type: apiKey
In: header
Name: X-Webhook-Key

## Download OpenAPI description

[Fin Custom Helpdesk API](https://developers.intercom.com/_bundle/docs/guides/fin-custom-helpdesk/api.yaml)

## Users

Manage end-users in your helpdesk system

### Get User

 - [GET /user](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api/users/getuser.md): Retrieve an end-user by their ID.

Used to load an end-user from the customer’s system. We will call this during synchronization to get the latest data about the end-user to drive the Fin workflows and tasks correctly.
If using the Fin messenger with a logged in and verified end-user, we will load the end- user when they start a new conversation.

### Update User

 - [PUT /user](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api/users/updateuser.md): Update an end-user by their ID.

### Create User

 - [POST /user](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api/users/createuser.md): When an end-user starts a conversation in the Fin Messenger and there is no information about them in the third party we request a new record be created.

## Agents

Manage agents in your helpdesk system

### Get Agents

 - [GET /agents](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api/agents/getagents.md): The customer must choose an Agent from within their own system to act as Fin.

When we tell the customer about responses from Fin, the author ID will be the agent chosen to act as Fin.

## Conversations

Manage conversations between end-users and agents

### Get Conversation

 - [GET /conversation](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api/conversations/getconversation.md): Used to load a known conversation from the customer's system. Used during ongoing synchronizations.

### Update Conversation

 - [PUT /conversation](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api/conversations/updateconversation.md): Called at the end of a synchronization run to push the latest derived data into the Customer’s system.

### Create Conversation

 - [POST /conversation](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api/conversations/createconversation.md): Called when a new conversation has been created via the Fin Messenger.
Note we provide the initial message from the conversation as we know many help desks require this to be provided when creating a conversation.
The response requires both the conversation object and the message object so that these can be mapped correctly to their Fin equivalents.

## Messages

Manage messages within conversations

### Get Messages

 - [GET /messages](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api/messages/getmessages.md): Called during synchronization to pull in the messages from the conversation in your system.
Messages which have already been synchronized will be ignored. New messages will be pulled into Fin’s version of the Conversation.

### Create Message

 - [POST /messages](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api/messages/createmessage.md): Used during synchronization to push new messages into your helpdesk. These messages may come from either the end-user or Fin.
Note that the author of the Fin messages will be the agent selected to represent Fin on initial setup of the integration.

## Webhooks

Notify Fin when conversations change

### Notify Fin of Conversation Events

 - [POST /custom_helpdesk_conversation_event/{integration_id}](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api/webhooks/customhelpdeskconversationevent.md): This endpoint handles two distinct use cases depending on whether an event_type is provided:

## 1. Conversation Synchronization (default behavior)

When you omit the event_type field, Fin will synchronize the conversation by pulling the latest data from your endpoints. Use this when:
- An agent sends a message
- The conversation state changes (status, assignee, etc.)
- Any other conversation data changes that Fin should know about

Example payload:
json
{
  "conversation_id": "conv_456"
}


## 2. Agent Typing Indicator

When you set event_type to agent_typing, Fin will display a typing indicator to the end-user in the Fin Messenger. No synchronization occurs - this is purely a real-time UI update.

Use this when an agent starts typing a response in your helpdesk. The typing indicator automatically dismisses after a few seconds.

Important: When using event_type: "agent_typing", the data.agent field is required and must include the agent's id, user_type, name, and email.

Example payload:
json
{
  "conversation_id": "conv_456",
  "event_type": "agent_typing",
  "data": {
    "agent": {
      "id": "agent_001",
      "user_type": "agent",
      "name": "Sarah Johnson",
      "email": "sarah.johnson@company.com"
    }
  }
}

