# Changelog (v2.7)

For changes that have been updated across all version, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

Breaking Changes
This version of the API includes [breaking changes](/docs/build-an-integration/learn-more/rest-apis/api-changelog#about-breaking-changes-in-the-intercom-api). They are listed below.

### Introducing the News API

You can now share important product updates, announcements and more, directly in the Messenger through our API. Get started [here](https://developers.intercom.com/docs/references/2.7/rest-api/api.intercom.io/News/).

### New Company Webhook Topics

We added new [webhook](/docs/references/2.7/webhooks/webhook-models) topics that fire when a company is deleted or updated.

### New Contact Subscribed Webhook Topic

We added a new [webhook](/docs/references/2.7/webhooks/webhook-models) topic that fires when a contact resubscribes to receive emails

## Breaking Changes

### Conversation Search Associated Custom Object Data

Associated Custom Object data is included in conversation search responses

### Changed Contact Unsubscribed Webhook Topic Payload

Added the [subscription_types](https://developers.intercom.com/docs/references/2.7/rest-api/api.intercom.io/Subscription-Types/subscription_type/) object to the contact.unsubscribed [webhook](/docs/references/2.7/webhooks/webhook-models) topic payload.
Previously only the contact object was included.