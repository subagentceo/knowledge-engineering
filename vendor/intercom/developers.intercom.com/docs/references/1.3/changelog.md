# Changelog (v1.3)

For changes that have been updated across all version, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

## Introducing Canvas Kit

Say hello to a quicker and easier way to build contextual and action-oriented apps embedded into Intercom's UI. With the launch of Canvas Kit, you keep all the capabilities of embedding apps in the Messenger, and gain:

- **Capabilities for embedding apps in Inbox** - you can now build apps for the conversation details within Intercom's Inbox product. [Take a look at our revamped Canvas Kit guides to understand just how easy it is.](/docs/canvas-kit)
- **New Components** - to make it easy to display data and input larger voucher, we've launched [Data Table](/docs/references/1.3/canvas-kit/presentationcomponents/data-table) and [Text Area](/docs/references/1.3/canvas-kit/presentationcomponents/data-table) components.
- **Canvas Kit Builder** - preview the JSON of your app to see what it will look like and how people can interact with it. The Builder is embedded throughout the docs but can also [be accessed here](https://app.intercom.io/a/canvas-kit-builder).


## Removing the users object from Canvas Kit request payloads

Instead of sending a `users` object within Canvas Kit requests, we now send a `customer` object instead. This returns exactly the same payload but also includes leads.

## Removing the app_id key from Canvas Kit request payloads

Instead of sending an `app_id` key within Canvas Kit requests, we now send a `workspace` key instead. This returns exactly the same information as the value.

## Adding an author object to Conversation payloads

We now return an `author` object within Conversation and Conversation Part objects sent throughout our REST API responses and Canvas Kit requests. This will contain the `name` and `email` of the message's author.

## Preventing null for unsubscribed_from_emails

The API will now return an error if `unsubscribed_from_emails` is set to `null` for User requests.