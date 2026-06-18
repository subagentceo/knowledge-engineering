# Changelog (v2.4)

For changes that have been updated across all version, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

## Fix for source.author.type field in case of auto message from a team

The source.author.type field in the [Conversation Model](/docs/references/2.4/rest-api/conversations/conversation-model) has been updated to have the value of "team" for cases where a conversation is started with an auto message from a team. Previously the value would be "admin" for this case.

## Add fields to the contact model

Add `location.country_code`, `location.continent_code`, `referrer`, `utm_campaign`, `utm_content`, `utm_medium`, `utm_source`, and `utm_term` to the [Contact Model](/docs/references/2.4/rest-api/contacts/contacts-model)

## Update companies

Update companies using [Update a Company](/docs/references/2.4/rest-api/companies/update-a-company)

## Fix conversation search using author name and email

Searching for conversation using the author's name or email with exact matches and special characters now returns the expected results.