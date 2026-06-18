# Changelog (v2.9)

For changes that have been updated across all version, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

### Reply to conversations with Quick Replies

We added the ability to reply to conversations with Quick Replies. The [Reply to a conversation endpoint](https://developers.intercom.com/intercom-api-reference/v0/reference/reply-to-a-conversation) now allows admins to reply to conversations with quick replies. When a user clicks on one of the given options, a `comment` conversation part will be created that includes metadata linking back to the quick reply option chosen.

### New Company Webhook Topics

We added new [webhook](/docs/references/2.9/webhooks/webhook-models#company-topics) topics that fire when a company is deleted or updated.

### New Contact Subscribed Webhook Topic

We added a new [webhook](/docs/references/2.9/webhooks/webhook-models#contact-topics) topic that fires when a contact resubscribes to receive emails

### New Ticket Webhook Topics

We added a set of new [ticket webhook](/docs/references/2.9/webhooks/webhook-models#ticket-topics) topics:

- Ticket state updated topic that fires when a ticket state is updated
- Ticket created topic that fires when a ticket is created
- Ticket note created topic that fires when a note is added to the ticket
- Team/Admin assigned topic that fires when an team/admin is assigned to an open ticket
- Ticket contact attached/detached topics that fire when a contact is attached or detached to/from an open ticket.
- Ticket attribute updated that fires when any attribute on the ticket changed.
- Ticket admin replied that fires when a teammate reply to a ticket.
- Ticket contact replied that fires when a contact(user/lead) reply to a ticket.


### New Tickets API

Tickets API is a work in progress and we are actively working on adding and updating endpoints. We currently support [creating](https://developers.intercom.com/docs/references/2.9/rest-api/api.intercom.io/Tickets/createTicket/), [retrieving](https://developers.intercom.com/docs/references/2.9/rest-api/api.intercom.io/Tickets/getTicket/) and [updating](https://developers.intercom.com/docs/references/2.9/rest-api/api.intercom.io/Tickets/updateTicket/) Tickets via API. We have also added full support for creating, retrieving and updating ticket types and type attributes via the [Tickets Types API](https://developers.intercom.com/docs/references/2.9/rest-api/api.intercom.io/Ticket-Types/) and the [Ticket Type Attributes API](https://developers.intercom.com/docs/references/2.9/rest-api/api.intercom.io/Ticket-Type-Attributes/).

Feel free to submit your feedback on the Tickets API via the Messenger in the bottom right, we’d love to hear from you!

Breaking Changes
This version of the API includes [breaking changes](/docs/build-an-integration/learn-more/rest-apis/api-changelog#about-breaking-changes-in-the-intercom-api). They are listed below.

### Conversation Search Associated Custom Object Data

Associated Custom Object data is included in conversation search responses

### Changed Contact Unsubscribed Webhook Topic Payload

Added the [subscription_types](https://developers.intercom.com/docs/references/2.9/webhooks/webhook-models/#subscription-topics) object to the contact.unsubscribed [webhook](https://developers.intercom.com/docs/references/2.9/webhooks/webhook-models/#subscription-topics) topic payload.
Previously only the contact object was included.

Because the contact object is now nested in data.item.contact, this is a breaking change.

### Conversation actions will no longer be fired if it's a ticket

Conversation actions (conversation.admin.replied, conversation.user.replied, conversation.admin.opened, conversation.admin.closed, conversation.admin.snoozed, conversation.admin.unsnoozed, conversation.priority.updated, conversation.rating.added, conversation.admin.assigned, conversation.admin.open.assigned and conversation.admin.noted) will no longer be fired when it is a ticket