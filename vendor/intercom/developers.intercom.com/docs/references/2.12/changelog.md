# Changelog (v2.12)

For changes that have been updated across all version, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

Breaking Changes
This version of the API includes [breaking changes](/docs/build-an-integration/learn-more/rest-apis/api-changelog#about-breaking-changes-in-the-intercom-api). They are listed below.

## Breaking Changes

### Custom States for Tickets

#### Getting Ticket states

There is a new ticket state object within a [Ticket object](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tickets/ticket) that provides additional details about a custom ticket state. This new object includes the unique ID for the custom state, the internal and external labels, and the category that the state is associated with.

```
  "ticket_state": {
    "id": "88",
    "category": "waiting_on_customer",
    "internal_label": "waiting on customer",
    "external_label": "waiting on customer"
  }
```

details
summary
See the new custom states when you retrieve a Ticket
#### Ticket states with Ticket Types

Each state is associated with a Ticket Type, so you may now also see all of the ticket states available for a [Ticket Type in the object](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tickets/ticket_type).

```
"ticket_states": {
  "type": "list",
  "data": [
    {
      "id": "88",
      "category": "waiting_on_customer",
      "internal_label": "waiting on customer",
      "external_label": "waiting on customer"
    },
    {
      "id": "89",
      "category": "reopened",
      "internal_label": "re-opened",
      "external_label": "re-opened"
    }
  ]
}
```

details
summary
See custom states available for a Ticket Type
Response includes breaking change
The previous structure of Ticket states were individual fields within the response. The new response includes an object called `ticket_state` that contains all the details about the custom Ticket state. Using this may break previous implementations and will need to be refactored to utilize the new `ticket_state` object.

#### Ticket states API

You can use the new [Ticket states API](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ticket-states) to see all the Ticket states that exist in your workspace.

details
summary
See all Ticket states for your workspace
### Updating Ticket states

You have the option of [updating a Ticket state](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tickets/updateticket#tickets/updateticket/t=request&path=ticket_state_id) via the API using the `ticket_state_id`.

To update the ticket state you must supply a valid `ticket_state_id` that is associated with the Ticket Type that the ticket falls under. If you supply an invalid ID, you will get a `400` error:

```json
{
  "type": "error.list",
  "request_id": "cde97e83-57ce-42bf-8d00-d8e34e9fd0ac",
  "errors": [
    {
      "code": "ticket_state_id_invalid",
      "message": "Ticket state id is not valid or is not associated with the ticket type"
    }
  ]
}
```

Try out updating a Ticket state using `ticket_state_id`.

details
summary
See the new custom states when you retrieve a Ticket
Body includes breaking change
The `state` field has been deprecated from the request body in Unstable and will be deprecated in future versions. You will need to update to using `ticket_state_id`.

### Run Assignment rules have been removed

Run assignment rules have been removed from the API in this version and all following versions. The API will be deprecated completely in December 2026.

### Admins can now reply to conversations with quick replies

The reply to a conversation endpoint now allows admins to reply to conversations with quick replies. When a user clicks on one of the given options, a `comment` conversation part will be created that includes metadata linking back to the quick reply option chosen.

## Backwards Compatible Changes

### New AI Content APIs

The [AI Content APIs](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/AI-Content) are a new addition to allow you to get content into [Fin](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/AI-Content/external_pages_list/) and [Content Import Sources](https://developers.intercom.com/docs/references/rest-api/api.intercom.io//AI-Content/content_import_sources_list/) for your Fin Content Library.

You can specify whether your content should be available for use by AI Agent or AI Copilot using the `ai_agent_availability` and `ai_copilot_availability` settings in the AI Content API when you create or update an external page. Enable use by setting them to `true` or disable by setting to `false`.

### Push notification enabled available as contact attribute

The `enabled_push_messaging` field is now available on the [Contact object](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/contact). This field indicates whether the contact has enabled push messaging.

For more information on push messages and notifications see this [help center article](https://www.intercom.com/help/en/articles/3292847-get-started-with-mobile-push).