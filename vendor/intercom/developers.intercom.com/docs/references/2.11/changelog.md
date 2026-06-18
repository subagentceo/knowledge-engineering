# Changelog (v2.11)

For changes that have been updated across all version, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

Breaking Changes
This version of the API includes [breaking changes](/docs/build-an-integration/learn-more/rest-apis/api-changelog#about-breaking-changes-in-the-intercom-api). They are listed below.

## Breaking Changes

## New messenger writable flag on Data Attributes

The Data Attribute model now includes the flag `messenger_writable`, which allows you to control if the Messenger can update a specific attribute via the [Messenger Javascript API](https://developers.intercom.com/installing-intercom/web/methods/). When the flag is set to `false` the attribute won't be writable.

If you need your attributes to be writable by the Messenger, pass `messenger_writable: true` when creating the attribute

```curl
curl -i -X POST \
  https://api.intercom.io/data_attributes \
  -H 'Authorization: Bearer <Your-Access-Token>' \
  -H 'Content-Type: application/json' \
  -H 'Intercom-Version: Preview' \
  -d '{
    "name": "version211",
    "model": "contact",
    "data_type": "string",
    "messenger_writable": true
  }'
```

You should then get a response that looks like the following:

```json
{
  "id": 9524852,
  "type": "data_attribute",
  "name": "version211",
  "full_name": "custom_attributes.version211",
  "label": "version211",
  "data_type": "string",
  "api_writable": true,
  "ui_writable": false,
  "messenger_writable": true,
  "custom": true,
  "archived": false,
  "admin_id": "6807982",
  "created_at": 1714738724,
  "updated_at": 1714738724,
  "model": "contact"
}
```

Then, in your JavaScript or Mobile SDK code, you can call the `update()` method with the ID of your attribute to attach it to the contact or company of the contact who is creating the message.

```javascript
Intercom("update", { version211: "howdy" });
```

Now in your Help Desk, you should see the data attribute attached to the contact.

Default Setting by Version
The flag is set to `false` by default in versions >= 2.11. On versions 2.10 and earlier, it is `true` by default.

## Set created_at field when creating a Conversation

The request body of the [Create a conversation endpoint](https://developers.intercom.com/docs/references/2.11/rest-api/api.intercom.io/conversations/createconversation) now accepts a UTC Unix epoch timestamp field created_at. If not provided, the current time will be used. This field is only recommneded for migrating past conversations from another source into Intercom.

## Backwards Compatible Changes

## AI Agent Conversation Metadata in Conversations

You can now access additional metadata for conversations where an AI Agent was involved as part of the [Conversations API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Conversations/searchConversations/) across versions 2.7 - 2.11. See more details in [unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes).

## Define your own created at values in Conversations

When you create or reply to a conversation via the API, you now have the option to define your own `created_at` timestamps. This is available across versions 2.9 - 2.11. See more details in [unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes).

## Add a company ID when you create a Ticket

Now when you create a Ticket, you can add the `company_id` that should be associated with the Ticket. This is available across versions 2.9 - 2.11. See more details in [unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes).

## Access Ticket states through the API

Now when you retrieve a Ticket, you can access the state visible internally and externally. See more details in [unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes).