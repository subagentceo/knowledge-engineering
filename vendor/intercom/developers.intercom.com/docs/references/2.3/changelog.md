# Changelog (v2.3)

For changes that have been updated across all version, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

## Conversation Topic Information in Conversation Response

We've updated our Conversation API to support Conversation Topics as a read-only attribute.

- **See** top level Conversation Topic data related to conversations within any returned [Conversations Model](/docs/references/2.3/rest-api/conversations/conversation-model).


## Support for Conversation Data Attributes

We've updated both our Conversation and Data Attribute APIs to support the [addition of data attributes for conversations](https://www.intercom.com/help/en/articles/4323898-using-conversation-data-for-advanced-inbox-workflows).

- **See** data attributes associated to conversations within any returned [Conversations Model](/docs/references/2.3/rest-api/conversations/conversation-model).
- **Update** a conversation's data attribute values through the [Conversations API](/docs/references/2.3/rest-api/conversations/update-a-conversation).
- **List** all data attributes associated to conversations through the [Data Attributes API](/docs/references/2.3/rest-api/data-attributes/list-data-attributes) in order to understand which data attributes can be added to conversations.