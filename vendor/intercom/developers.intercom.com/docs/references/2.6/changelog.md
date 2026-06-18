# Changelog (v2.6)

For changes that have been updated across all version, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

## Content Stat Webhook Topics

We introduced [webhook topic support](/docs/references/2.6/webhooks/webhook-models) for all Outbound Message events across all content types in Intercom, such as Emails, Custom Bots, Surveys, and more.

## Admin Logged In / Logged Out Webhook Topics

We added new [webhooks](/docs/references/2.6/webhooks/webhook-models) that fire when an Admin logs into a workspace (through email/password, Google SSO, or SAML SSO) or logs out of a workspace (either through a manual logout or through session expiry if signed in with SAML SSO).

## New Contact Webhook Topics

We added several new [webhook topics](/docs/references/2.6/webhooks/webhook-models) for Contact events: updated (User), merged (User & Lead), deleted (User & Lead), archived (User & Lead), unarchived (User & Lead).

## New Conversation Contact Topics

We added new [webhooks](/docs/references/2.6/webhooks/webhook-models) that fire when a contact is attached to a conversation or detached from a conversation.

## Granular Subscribe Webhook Topic

We added a new [webhook topic](/docs/references/2.6/webhooks/webhook-models) that fires when a user subscribes to a specific subscription type.

## Company Contact Attached / Detached Webhook Topics

We added new [webhooks](/docs/references/2.6/webhooks/webhook-models) that fire when a contact is attached to a company or detached from a company.

## Create Conversation Payload Consistency

The [Create Conversation endpoint](/docs/references/2.6/rest-api/conversations/create-a-conversation) now expects `lead` and `user` in request payload. Previously this endpoint accepted values of `contact` and `user`.

## Improved Conversation List Pagination

The [list conversations endpoint](/docs/references/2.6/rest-api/conversations/list-conversations) now uses cursor based pagination instead of traditional pagination.

## More Granular Conversation Part Types

The [Conversation Part Type model](/docs/references/2.6/rest-api/conversations/conversation-model#conversation-part-object) now contains significantly more part types. Older API versions would log some part types simply as `comment`, now there is a lot more granularity.

## Refined Conversation delivered_as Attribute Field

Conversation Source object now differentiates admin-created tickets and conversations now appear as `admin_initiated` to distinguish them from automation. [More details](/docs/references/2.6/rest-api/conversations/conversation-model#source-object) about the different possible values have been exposed.

## Deleting Archived Contacts

The [Delete Contact endpoint](/docs/references/2.6/rest-api/contacts/delete-contact) now allows permanent deletion of archived contacts directly. Previously, when attempting to delete an archived contact via the API, the contact needed to be unarchived and then deleted. This is no longer necessary.

## Opted In Subscription Types on Contacts

We added a new field to the [Contact model](/docs/references/2.6/rest-api/contacts/contacts-model), that will show all the subscriptions that a contact has opted into.