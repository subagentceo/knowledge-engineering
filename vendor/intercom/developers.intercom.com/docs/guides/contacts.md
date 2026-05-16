# Contacts

Contacts represent your **leads** and **users** in Intercom. You can manage contacts with a role of `lead` or `user` with the [Contacts API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/contact/).

## What's the difference between a visitor, lead, or user?

Any unknown visitor to your site who’s not logged in and has no conversation history with you is considered a visitor.

As soon as a visitor starts a conversation with you, or replies to an outbound message, they become a lead. A lead becomes a user when they sign up to your product, or log into an existing account.

Managing visitors with the API
If you need to take actions such as updating, retrieving, deleting, or converting a visitor you can do so using the [Visitors API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Visitors/updateVisitor/).

With the Intercom Messenger installed, you can start collecting contact data immediately. You can merge a contact with a role of `lead` into `user` [with the API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/MergeContact/) as long as you have the `id` values for both.

## How can I identify a contact?

Contacts are assigned two identifiers, an `external_id` that you define and an Intercom assigned `id`.

In order to [get](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/ShowContact/), [update](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/UpdateContact/), or [delete](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/DeleteContact/) a Contact, you will need to have access to the Intercom assigned `id` value.

## What are custom attributes?

[Data Attributes](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Data-Attributes/data_attribute/) are metadata used to describe your contact model. There is a list of standard attributes collected automatically by Intercom, but you can set your own with custom attributes to aggregate more data about your users.

You can create a custom attribute for your Contacts by using the [Data Attributes API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Data-Attributes/createDataAttribute/) and specifying `contact` as the model.

## What is a segment?

A segment is a group of contacts defined by rules (or filters) that you set. You can create segments for every key group of contacts you'd like to send a message to - for example:

- Contacts who have yet to take action
- Contacts based in a certain geographic area
- Contacts who signed up less than 7 days ago


You will need to update a contact's segments in the Intercom UI. However, you can use the [Segments API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Segments/segment/) to [list all segments](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Segments/listSegments/). You can use the Segments API to [list segments attached to a contact](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Segments/listSegmentsForAContact/) or alternatively can use the [Contacts API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/listSegmentsForAContact/).

## What's next?

- Import your existing contacts into Intercom by [following this guide](/docs/guides/tickets/import-contacts)
- [Create a new contact](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/CreateContact/) using the API
- Use the API to [merge a lead and a user](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/MergeContact/)