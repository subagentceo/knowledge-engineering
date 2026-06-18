# Changelog (v2.10)

For changes that have been updated across all version, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

Breaking Changes
This version of the API includes [breaking changes](/docs/build-an-integration/learn-more/rest-apis/api-changelog#about-breaking-changes-in-the-intercom-api). They are listed below.

## Breaking Changes

### Help Centers no longer have `sections`

The `sections` endpoints have been removed. You can now use the `collections` endpoints to get all collections and their articles. If you previously had sections, they will be returned as collections.

### Article collections can now be multi-level

Previous to this version, article collections could only be one level deep. Now, you can have collections within collections. The `collections` endpoint now returns a `parent_id` attribute for each collection. If the collection has no parent, the `parent_id` will be `null`. You can also set the `parent_id` when creating or updating a collection.

## Backwards Compatible Changes

### Adding additional fields to the Company object in Webhooks

We've added the following fields to the [Company object](https://developers.intercom.com/docs/references/2.10/rest-api/api.intercom.io/Companies/company/) in [Webhooks](/docs/references/2.10/webhooks/webhook-models):

- `size`
- `website`
- `industry`
- `plan`


### Introducing the Articles Search endpoint

Using the new [Articles Search](https://developers.intercom.com/docs/references/2.10/rest-api/api.intercom.io/Articles/searchArticles/) endpoint, you can now search the text of Articles in your Help Center, and filter by state.

details
summary
Try Articles Search
### Introducing the Tickets Search endpoint

Using the new [Tickets Search](https://developers.intercom.com/docs/references/2.10/rest-api/api.intercom.io/Tickets/searchTickets/) endpoint, you can search for multiple tickets by the value of their attributes in order to fetch exactly which ones you want.

details
summary
Try Tickets Search
### Introducing the Ticket Tags endpoints

Using the [`/ticket/{ticket_id}/tags`](https://developers.intercom.com/docs/references/2.10/rest-api/api.intercom.io/Tickets/attachTagToTicket/) endpoint, you can now add and remove tags from tickets.

### Tickets now have a linked objects field

The [Tickets](https://developers.intercom.com/docs/references/2.10/rest-api/api.intercom.io/Tickets/ticket/) object now includes a [`linked_objects`](https://developers.intercom.com/docs/references/2.10/rest-api/api.intercom.io/Tickets/ticket/#path=linked_objects) field, which is list of objects that are linked to the ticket. These can be conversations or other tickets.

### Adding `open` and `snoozed_until` attributes to tickets.

[Tickets](https://developers.intercom.com/docs/references/2.10/rest-api/api.intercom.io/Tickets/ticket/) now have an `open` attribute, which is `true` if the ticket is open, and `false` if it is closed. Tickets also have a `snoozed_until` attribute, which is the date and time that the ticket is snoozed until, if it is snoozed. This is different from the ticket’s state.

### Add External ID to Contact

We now return the `external_id` for a [Contact](https://developers.intercom.com/docs/references/2.10/rest-api/api.intercom.io/Contacts/contact/) where one exists.

### Create comments on Tickets

You can now create comments on tickets using the [Reply to a ticket](https://developers.intercom.com/docs/references/2.10/rest-api/api.intercom.io/Tickets/replyTicket/) endpoint.

### Add Category to Tickets and Ticket Types

[Tickets](https://developers.intercom.com/docs/references/2.10/rest-api/api.intercom.io/Tickets/ticket/) now have one of three different [categories](https://www.intercom.com/help/en/articles/6436600-tickets-explained#h_a00c00cfec).

### Sharing tickets

Using the new `is_shared` attribute, you can now [share](https://developers.intercom.com/docs/references/2.10/rest-api/api.intercom.io/Tickets/updateTicket/#!t=request&path=is_shared) tickets with your customers via the API.

### Converting a conversation to a ticket

You can now use the API to [convert](https://developers.intercom.com/docs/references/2.10/rest-api/api.intercom.io/Conversations/convertConversationToTicket/) a Conversation to a Ticket

### Add Ticket ID to Ticket Response

The ticket model now includes the `ticket_id` attribute. This represents the Ticket ID that is visible in the Intercom user interface, and is distinct from the `id` of the ticket.

### Add `snooze_until` attribute to tickets.

The Tickets API now accepts a `snooze_until` attribute when updating a ticket. This allows you to snooze a ticket until a specific date and time.

### Add Admin activity log webhook

We've added a new webhook, [`admin.activity_log_event.created`](/docs/references/2.10/webhooks/webhook-models#admin-topics), which will be sent each time a new admin activity log is created.