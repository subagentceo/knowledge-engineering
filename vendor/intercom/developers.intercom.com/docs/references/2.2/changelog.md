# Changelog (v2.2)

For changes that have been updated across all version, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

## View the title of a conversation

You can now see the added `title` of a conversation within all returned Conversation objects. This can only be added through the UI, or if a conversation was started via email whereby the subject will be the title. See our [Conversation API reference](/docs/references/2.2/rest-api/conversations/conversation-model) for the updated model.

## Redact a conversation part

You can now redact a conversation part or the source message of a conversation. See our [Conversation API reference](/docs/references/2.2/rest-api/conversations/redact-a-conversation-part) for further detail.

## List attached segments for contacts and companies

You can now fetch a list of segments associated to a contact or a company. See our [Contacts reference](/docs/references/2.2/rest-api/contacts/list-attached-segments) and [Companies reference](/docs/references/2.2/rest-api/companies/list-attached-segments-1) respectitvely to understand more.

## Installation Health Check Endpoint

There may be issues that result in your app running into a state where it no longer functions after (or during) installation. In order to alert users and encourage them to solve this, we provide a [Health Check](/docs/build-an-integration/learn-more/installation-health-check) which is designed to increase re-activation of your app and decrease any loss in retention.

Our Health Check webhook system sends a request every 24 hours to check on the health of your app. Instead of waiting these 24 hours, we now offer you the possibility to proactively notify us of when an app's state (for a given workspace) might have changed. See our [Health Check guide](/docs/build-an-integration/learn-more/installation-health-check#how-can-i-proactively-notify-you-if-i-find-the-state-has-changed) for more on how to make this call.

Breaking Changes
This version of the API includes [breaking changes](/docs/build-an-integration/learn-more/rest-apis/api-changelog#about-breaking-changes-in-the-intercom-api). They are listed below.

## Maintain conversation context with both team and admin assignees

We found that it was increasingly important for you to keep persistent context of where a conversation originated from - no matter how many people handled it previously. We also wanted to reduce compexity of identifying which conversations are owned by who, particularly when using the [Conversation Search endpoint](/docs/references/2.2/rest-api/conversations/search-for-conversations).

As a result, you can now [specify both a team and an admin as assignee's of a conversation](/docs/references/2.2/rest-api/conversations/assign-a-conversation). We show both an `admin_assignee_id` and a `team_assignee_id` in the conversation object. This replaces the `assignee` object and is therefore a breaking change. See more on the feature in our [Help Center](https://www.intercom.com/help/) and take a look at our [Conversation API reference](/docs/references/2.2/rest-api/conversations/conversation-model) for example objects.