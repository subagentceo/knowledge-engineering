# Changelog (v1.2)

For changes that have been updated across all version, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

## Removing personally identifiable information (PII) from our API & Webhooks

Across our API & Webhooks, we will no longer return the `last_seen_ip`, `location_data.longitude`, `location_data.latitude`, and `user_agent_data` for users, leads, and visitors. This is part of an effort to keep customers data secure and uphold the availability of Intercom across services that require such information to not be exposed.

## View activity logs for admins through our API

You can now get a log of activities taken by all admins in an app through our API. Simply send a GET request to `https://api.intercom.io/admins/activity_logs`. [You can see request, params, and responses on our reference](/docs/references/1.2/rest-api/admins/view-admin-activity-logs).

## Set waiting since attribute to null for admin replies

In previous versions of our API, the value of the `waiting_since` attribute on the [Conversation model](/docs/references/1.2/rest-api/conversations/conversation-model) is set to 2000 years in the future if the last reply is from an admin. This change sets the value of `waiting_since` to `null` instead.

## List users by email returns users only

Previously, the list users by email endpoint returned a list of users and contacts. It will now return users only.

## Allow contacts to be viewed/listed by phone

Previously, the you could list contacts by email only. Now you can also list them by phone.

## New Conversations Part Redacted Webhook

There is a new webhook which fires when a conversation part is redacted.

## New Conversations Rating Added Webhook

There is a new webhook which fires when a rating is added to a conversation.