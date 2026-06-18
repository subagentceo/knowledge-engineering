# Sync data using the events API

## What you'll build

In this guide, we will walk you through what you will need to integrate with the [events API](https://workos.com/docs/reference/events):

- Create a *cursor* for use with the events API
- Update your cursor
- Choose a cursor if you lose yours
- Handle event replay in your app

## Before getting started

To get the most out of this guide, you'll need:

- A [WorkOS account](https://dashboard.workos.com/)
- An [SSO](https://workos.com/docs/sso/1-add-sso-to-your-app) or [directory](https://workos.com/docs/directory-sync/quick-start/1-create-a-new-directory-connection) connection configured in order to generate events

***

## (1) Integrate the events API SDK

WorkOS offers native SDKs in several popular programming languages. Choose a language below to see instructions in your app's language.

### Set secrets

To make calls to WorkOS, provide the API key and, in some cases, the client ID. Store these values as managed secrets, such as `WORKOS_API_KEY` and `WORKOS_CLIENT_ID`, and pass them to the SDKs either as environment variables or directly in your app's configuration based on your preferences.

```plain title="Environment variables"
WORKOS_API_KEY='sk_example_123456789'
WORKOS_CLIENT_ID='client_123456789'
```

> The code examples use your staging API keys when [signed in](https://dashboard.workos.com)

***

## (2) Start consuming events

Your app can start consuming events once it integrates the WorkOS SDK. The first thing to do is to pick a starting place in the data set.

### Keep a cursor

A *cursor* is a bookmark to track your app's position in the events list. The very first call to the events API won't have a cursor. Subsequent requests to WorkOS should include the updated cursor using the `after` parameter. You will need to update and store your cursor after processing an event.

### Avoid overwriting newer data

To avoid repeating an update, store the `updated_at` timestamp provided by WorkOS for each object. Extract this tag from the data object in the event. If the `updated_at` timestamp in the event is newer, update the local state with the latest event data. Otherwise, you can skip processing that event.

***

## (3) Select event types

Determine the [event types](https://workos.com/docs/events) you want to consume. Choose the relevant event types that align with your app's functionality and integration with WorkOS.

#### List events

Retrieve events from the API using cursor pagination. To fetch the next set of events, provide the ID of the latest processed event in the `after` parameter.

***

## (4) Handle event replay

In some cases, it may be necessary to go back in time and "replay" the events. When designing your app logic to handle events replay it is important to design your event handling logic in a way that can safely accommodate it without undesired effects.

To achieve this, focus on separating your app's data handlers from transactional business logic like sending emails, communicating to 3rd party APIs, etc. By implementing separate data handling, you can replay events without side effects.

WorkOS recommends processing events synchronously, handling them in the order they occurred.

> The events API returns events up to 90 days old. You can query for up to 30 days of events per request.

### If your app stops processing events

When resuming event processing, you have two options to pick up where you left off:

- **Using the latest known cursor:** Retrieve the most recent cursor that was successfully processed and use it as the starting point for event resumption.
- **Using a timestamp:** Alternatively, you can make an API call with the `range_start` parameter and then use the cursor. Utilize the `updated_at` timestamp to prevent overwrites.

***

## Scaling recommendations

### Single consumer

WorkOS recommends that your app starts with a single worker. Process events in a separate thread or process from your app's main execution thread. Deploying a single worker responsible for handling events simplifies and streamlines event consumption.

This approach ensures serial event processing. After completing the processing of events on the current page, request the next page of events to maintain progress.

### Parallel processing

For onboarding large organizations, divide events into independent queues for parallel processing when calling the events API from a single worker.

Concurrently processing events from different organizations is safe, but for consistency and integrity, it is recommended to sequentially process events within a single organization.

***

## Migrating from webhooks

You can migrate to the events API if you already use webhooks. To migrate, start querying the events API using the `range_start` parameter that corresponds to the time you'd want to start syncing from. The event IDs passed in webhook bodies are the same as those returned by the events API.
