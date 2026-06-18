# Fin Custom Helpdesk API

The Fin Custom Helpdesk API allows you to integrate your custom helpdesk with Fin through a standardized set of API endpoints and webhooks.

Note that the names of the endpoints are set by the custom helpdesk's API. They do not need to conform to the names given in this API spec (e.g. `create_message`).

## **FAQ**

**Q: Can POST be used for all API requests instead of GET?**

**A:** Yes. All endpoints now support POST requests.

**Q: Must field names use snake_case or can camelCase be used?**

**A:** snake_case is required. The format of the responses outlined in the documentation must be followed, including the snake_case key names. Intercom cannot support different naming conventions for different customers.

---

## **Message & Idempotency**

**Q: Does create_message API provide a unique message ID for idempotency?**

**A:** Yes. An `object_id` field is available on all `create` type requests: `create_message`, `create_conversation`, and `create_user`. This represents the ID of the object in the Intercom system.

**Q: Do message APIs support attachments?**

**A:** Yes, attachments are supported. The format of attachments is outlined in the Messages section of the API docs.

Messages can contain:
- Text body only (no attachments)
- Attachments only (no text body - body can be null or empty string)
- Both text body and attachments

However, a message cannot be completely empty - it must have either a body or at least one attachment.

**Q: What HTML is supported in message content?**

**A:** The following HTML tags are supported in the Message object:

- Paragraphs: `<p>`
- Headings: `<h1>`, `<h2>` (note: h3-h6 appear as h2)
- Text formatting: `<b>` (bold), `<i>` (italic)
- Links: `<a>`
- Images: `<img>` (can be linked)
- Line breaks: `<br>`
- Code blocks: `<code>`
- Lists: `<ul>` (unordered), `<ol>` (ordered)

Example HTML:

```html
<!-- Headings (h1–h6) -->
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>

<!-- Paragraphs with inline formatting and link -->
<p>
  Normal paragraph with <a href="https://example.com">a link</a>, <b>bold</b>,
  <i>italic</i>, and a line break<br />right here.
</p>

<!-- Image and linked image -->
<img src="https://placehold.co/600x400/png" alt="Example image" />
<a href="https://example.com"
  ><img src="https://placehold.co/200x120/png" alt="Linked image"
/></a>

<!-- Lists: unordered, ordered-->
<ul>
  <li>Unordered item 1</li>
  <li>Unordered item 2</li>
</ul>

<ol>
  <li>Ordered item 1</li>
  <li>Ordered item 2</li>
</ol>

<!-- Code block -->
<code> console.log('hello world!'); </code>
```

---

## **Agent & Conversation Management**

**Q: Does the get_agent API need conversation ID parameters?**

**A:** No. `get_agent` is only used during initial Fin configuration to select which agent represents Fin in the external system. You can return a single hardcoded bot agent here.

**Q: How will Intercom inform us that a human agent needs to join a conversation?**

**A:** Intercom sends an `update_conversation` call with `assignee_id` set to null.

---

## **Attributes & Data Structure**

**Q: Are conversation-level attributes separate from user attributes?**

**A:** Yes. Structure is:

```json
{
  "conversation": {
    "attributes": {
      // conversation-specific data like locale, topic, sentiment, order_id
    },
    "user": {
      "id": "...",
      "type": "end-user",
      "name": "...",
      "attributes": {
        // user-specific custom attributes
      }
    }
  }
}
```

**Q: When EndUser attributes change, will update_conversation be called?**

**A:** Yes. Conversation and user state is synchronized on each inbound/outbound event (new messages, user data updates via workflows, for example an Email Collector step, etc.).

---

## **Request Verification**

**Q: How do I verify that incoming requests are genuine?**

**A:** We provide two extra headers on our requests to your servers:
- `X-Fin-Request-Timestamp` - This is the timestamp of the request (in seconds since epoch). You may use this to reject requests that are too old.
- `X-Fin-Signature` - This is the SHA256 HMAC signature of `{timestamp}:{request_body}`. You may use this to verify the authenticity of the request from us.

Note as there is no body for GET requests, we instead sign: `{timestamp}:{request_params_sorted_alphabetically}`.

The HMAC key used to validate the signature is found in your deployment settings.

---

## **Connecting Fin to your endpoints**

**1** - Navigate to the Deploy > Fin Messenger section in your Fin Workspace.

<a href="/static/images/standalone-chd-1.png" target="_blank"><img src="/static/images/standalone-chd-1.png" alt="standalone-chd-1" /></a>

**2** - You can give your integration a name to identify it. We will support multiple different connections later (e.g. for multiple different sub-brands you may have)

Please note that "Channel type" is currently static with the value "Fin messenger". We will support other channel types at a later time.

Make note of the *Identifier* value you are given here. This is the identifer you must use in your webhooks back to the Fin system.

**3** - Configure your API endpoint URLs. What these endpoints are for and the request/response format is described in the rest of these docs.

<a href="/static/images/standalone-chd-3.png" target="_blank"><img src="/static/images/standalone-chd-3.png" alt="standalone-chd-3" /></a>

**4** - Set up authentication for your endpoints. By default we use OAuth for this. Choose the "OAuth token settings" option and configure the OAuth connection with your server.

Note, you may whitelist Intercom's IP address ranges based on the [documentation here](https://developers.intercom.com/docs/webhooks#which-ip-addresses-should-i-add-to-my-allowlist-for-intercom-webhooks)

<a href="/static/images/standalone-chd-4.png" target="_blank"><img src="/static/images/standalone-chd-4.png" alt="standalone-chd-4" /></a>

<a href="/static/images/standalone-chd-5.png" target="_blank"><img src="/static/images/standalone-chd-5.png" alt="standalone-chd-5" /></a>

**5** - Note the webhook secret generated for you. This must be provided in the X-Webhook-Key header in webhook requests to the Fin system.

<a href="/static/images/standalone-chd-6.png" target="_blank"><img src="/static/images/standalone-chd-6.png" alt="standalone-chd-6" /></a>

**6** - Choose a agent from your system to attribute Fin's replies to.

When Fin generate a response for the customer, we will use the ID of the agent chosen here when creating messages in your system.

<a href="/static/images/standalone-chd-7.png" target="_blank"><img src="/static/images/standalone-chd-7.png" alt="standalone-chd-7" /></a>

**7** - Finally, when you've configured your workflow and installed the Fin Messenger you're ready to activate Fin.

<a href="/static/images/standalone-chd-8.png" target="_blank"><img src="/static/images/standalone-chd-8.png" alt="standalone-chd-8" /></a>


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

[Fin Custom Helpdesk API](https://developers.intercom.com/_bundle/docs/guides/fin-custom-helpdesk/api-posts-only.yaml)

## Users

Manage end-users in your helpdesk system

### Get User

 - [POST /get_user](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api-posts-only/users/getuser.md): Retrieve an end-user by their ID.

Used to load an end-user from the customer's system. We will call this during synchronization to get the latest data about the end-user to drive the Fin workflows and tasks correctly.
If using the Fin messenger with a logged in and verified end-user, we will load the end- user when they start a new conversation.

### Update User

 - [POST /update_user](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api-posts-only/users/updateuser.md): Update an end-user by their ID.

### Create User

 - [POST /create_user](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api-posts-only/users/createuser.md): When an end-user starts a conversation in the Fin Messenger and there is no information about them in the third party we request a new record be created.

## Agents

Manage agents in your helpdesk system

### Get Agents

 - [POST /get_agents](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api-posts-only/agents/getagents.md): The customer must choose an Agent from within their own system to act as Fin.

When we tell the customer about responses from Fin, the author ID will be the agent chosen to act as Fin.

## Conversations

Manage conversations between end-users and agents

### Get Conversation

 - [POST /get_conversation](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api-posts-only/conversations/getconversation.md): Used to load a known conversation from the customer's system. Used during ongoing synchronizations.

### Update Conversation

 - [POST /update_conversation](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api-posts-only/conversations/updateconversation.md): Called at the end of a synchronization run to push the latest derived data into the Customer's system.

### Create Conversation

 - [POST /create_conversation](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api-posts-only/conversations/createconversation.md): Called when a new conversation has been created via the Fin Messenger.
Note we provide the initial message from the conversation as we know many help desks require this to be provided when creating a conversation.
The response requires both the conversation object and the message object so that these can be mapped correctly to their Fin equivalents.

## Messages

Manage messages within conversations

### Get Messages

 - [POST /get_messages](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api-posts-only/messages/getmessages.md): Called during synchronization to pull in the messages from the conversation in your system.
Messages which have already been synchronized will be ignored. New messages will be pulled into Fin's version of the Conversation.

### Create Message

 - [POST /create_message](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api-posts-only/messages/createmessage.md): Used during synchronization to push new messages into your helpdesk. These messages may come from either the end-user or Fin.
Note that the author of the Fin messages will be the agent selected to represent Fin on initial setup of the integration.

## Webhooks

Notify Fin when conversations change

### Notify Fin of Conversation Events

 - [POST /custom_helpdesk_conversation_event/{integration_id}](https://developers.intercom.com/docs/guides/fin-custom-helpdesk/api-posts-only/webhooks/customhelpdeskconversationevent.md): This endpoint handles two distinct use cases depending on whether an event_type is provided:

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

