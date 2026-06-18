# Changelog (v2.5)

For changes that have been updated across all version, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

## Export Message data through our API

You can use the API to export data for all messages sent in a given timeframe. This data will be valuable in analysing the performance of your messages or joining message engagement data with user data external to Intercom to attribute performance. [You can see the three operations you'll have to perform to retrieve this in our reference](/docs/references/2.5/rest-api/exports-content-stats/export-job-model).

## List Tag dependencies on deletion

If a tag has dependencies and cannot be deleted, we will now return an error message listing those dependent objects. Previously, we would have failed without listing dependencies. See the [Delete a tag](/docs/references/2.5/rest-api/tags/delete-a-tag) section in our reference for a sample response.

## Switch API

You can use the [Switch API](/docs/references/2.5/rest-api/switch-api/create-a-phone-switch) to deflect phone calls to the Intercom Messenger. Calling this endpoint will send an SMS with a link to the Messenger to the phone number specified.

## Conversation Webhook Refactor

With this change, we've updated the webhooks Conversation payloads to match the latest version of the conversation API model.

## Webhook payload & topics versioning

We have introduced versioning to webhook payloads and webhook topics.

## New Webhook Topics

- **Conversations Priority Updated:** A webhook which fires when the prority of a conversation is updated
- **Granular Unsubscribe:** A webhook which fires when a user unsubscribes from message subscription type
- **Admin Added to Workspace:** A webhook which fires when an admin being added to workspace
- **Admin Removed From Workspace:** A webhook which fires when an admin being removed to workspace
- **Admin Away Mode Updated:** A webhook which fires when an admins away mode updates


## New Contact Topics

Renamed all user/lead topics to start with a "contact." prefix. We have Versioned User/Lead Topics and Payloads to allowed us to easily update the Contact topics and payloads to more closely align with our current Contact model without breaking any existing apps. Additionaly we have added a new topic "contact.lead.updated" to enable customers and partners to subscribe to changes on leads

| Previous Topic Name | Topic | Item Type | Description |
|  --- | --- | --- | --- |
| user.deleted | contact.deleted | Contact | Subscribe to contact deletions |
| user.email.updated | contact.email.updated | Contact | Subscribe to contact email address being updated |
| contact.added_email | contact.lead.added_email | Contact | Subscribe to emails being added to leads |
| contact.created | contact.lead.created | Contact | Subscribe to lead creations |
| contact.signed_up | contact.lead.signed_up | Contact | Subscribe to leads converting to users |
| user.tag.created | contact.lead.tag.created | ContactTag | Subscribe to leads being tagged |
| user.tag.deleted | contact.lead.tag.deleted | ContactTag | Subscribe to leads being untagged |
| ✨!NEW!✨ | contact.lead.updated | Contact | Subscribe to lead updates |
| user.unsubscribed | contact.unsubscribed | Contact | Subscribe to contact unsubscriptions from email |
| user.unsubscribed_from_sms | contact.unsubscribed_from_sms | Contact | Subscribe to contact unsubscriptions from sms |
| user.created | contact.user.created | Contact | Subscribe to user creations |
| user.tag.created | contact.user.tag.created | ContactTag | Subscribe to users being tagged |
| user.tag.deleted | contact.user.tag.deleted | ContactTag | Subscribe to users being untagged |