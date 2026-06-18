# Changelog (v2.0)

For changes that have been updated across all version, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

Breaking Changes
This version of the API includes [breaking changes](/docs/build-an-integration/learn-more/rest-apis/api-changelog#about-breaking-changes-in-the-intercom-api).

Major changes include:

- Users API & Leads API are deprecated and replaced with Contacts API.
- Custom Data Attributes can only be created through the Data Attributes API. If you want to update a contact with an attribute that does not exist yet then you must create it through the Data Attributes API and update the contact afterwards.


## Contact, Conversation & Data Attribute APIs

We're excited to share that we've now launched a major update to our API - giving you more powerful, contextual, and intuitive access to your data:

- **A new, strictly RESTful Contacts API** that combines users and leads — collectively known as "contacts" — and enables you to [search for the exact contacts you need](/docs/references/2.0/rest-api/contacts/search-for-contacts) by filtering using any combination of fields, like location or a custom NPS score. Plus, the API [exposes new attributes](/docs/references/2.0/rest-api/contacts/contacts-model), like `last_contacted` and `browser_version`, and uses [cursor-based pagination](/docs/build-an-integration/learn-more/rest-apis/pagination-cursor) to give you access to all of your contacts without restrictions.
- **An updated Conversations API** that enables you to [tag conversations directly](/docs/references/2.0/rest-api/tags/attach-a-tag-to-a-conversation), [search and retrieve conversations](/docs/references/2.0/rest-api/conversations/search-for-conversations) by any combination of fields, and [access more granular attributes](/docs/references/2.0/rest-api/conversations/conversation-model), like timestamps and out-of-the-box metrics such as `time_to_first_response` and `median_time_to_reply`.
- **A new Data Attributes API** that lets you [create](/docs/references/2.0/rest-api/data-attributes/create-data-attributes) and [update](/docs/references/2.0/rest-api/data-attributes/update-data-attributes) custom data attributes, set a label and description for each, and build a dropdown list of [defined attribute options](/docs/references/2.0/rest-api/data-attributes/data-attribute-model). This means your app users can more easily leverage data when targeting and communicating with customers and leads.