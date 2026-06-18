# Quick Start

## What you'll build

In this guide, we'll take you from learning about Directory Sync and POC-ing all the way through to building production-ready features fully integrated with the WorkOS Directory Sync API.

This guide will show you how to:

1. Create a new directory in the WorkOS Dashboard
2. Add Directory Sync to your app and fetch directory resources
3. Use events to keep your app in sync with the directory changes

## Before getting started

To get the most out of this guide, you'll need:

- A [WorkOS account](https://dashboard.workos.com/)
- A directory from a directory provider that WorkOS supports

## API object definitions

[Directory](https://workos.com/docs/reference/directory-sync/directory)
: Stores info about an organization's user management system (i.e. directory provider).

[Directory user](https://workos.com/docs/reference/directory-sync/directory-user)
: Represents an organization user that is active in an organization's directory provider.

[Directory group](https://workos.com/docs/reference/directory-sync/directory-group)
: A collection of organization users within a directory, e.g. IT, database admins, HR.

> The WorkOS Directory Sync API exclusively uses read-only operations. We never mutate end-user directories.

***

## (1) Create a new directory connection

The first step to connecting with a directory is creating an organization in the [WorkOS Dashboard](https://dashboard.workos.com/). You will then be able to create a new [connection](https://workos.com/docs/glossary/connection) to the organization's directory. Let's start by creating one for development in your sandbox environment

Get provider-specific instructions by selecting the directory provider you want to test:

> You can view and copy the unique identifier for the directory connection on the directory page, once it has been set up. The id takes the form `directory_*`.

***

## (2) Add Directory Sync to your app

Let's integrate the Directory Sync API into your app to enable fetching directory resources programmatically.

### Install the WorkOS SDK

WorkOS offers native SDKs in several popular programming languages. Choose a language below to see instructions in your application's language.

### Set secrets

To make calls to WorkOS, provide the API key and, in some cases, the client ID. Store these values as managed secrets, such as `WORKOS_API_KEY` and `WORKOS_CLIENT_ID`, and pass them to the SDKs either as environment variables or directly in your app's configuration based on your preferences.

```plain title="Environment variables"
WORKOS_API_KEY='sk_example_123456789'
WORKOS_CLIENT_ID='client_123456789'
```

> The code examples use your staging API keys when [signed in](https://dashboard.workos.com).

### Fetch directory resources

Get the details of an existing directory user.

Example use case: pre-populate user attributes for new user accounts.

#### Get directory user

#### List directory users

Get directory users for a given directory or directory group.

Example use case: Build an onboarding experience that allows an admin to select who to invite and create accounts for.

#### List directory users

> Use the optional `limit`, `before`, and `after` parameters to paginate through results. See the [API Reference](https://workos.com/docs/reference/pagination) for details.

> **Note:** The `groups` property on the [Directory
> User](https://workos.com/docs/reference/directory-sync/directory-user) object is deprecated. Starting
> May 1, 2026, this property returns an empty array by default for newly created
> teams. **Existing teams currently depending on this property should migrate to
> the new access pattern for better throughput performance** — the property is
> unbounded by user, so users with many group memberships produce large, slow
> response payloads. To retrieve a user's group memberships, use the [Fetch user
> or group memberships](#fetch-user-or-group-memberships) patterns below.

#### Get directory group

Get the details of an existing directory group.

Example use case: Pre-populate team attributes for new organizations.

#### Get directory group

#### List directory groups

Get directory groups for a given directory or directory user.

Example use case: Build an onboarding experience that allows an admin to select which groups of employees to invite and create accounts for.

#### List directory groups

> Use the optional `limit`, `before`, and `after` parameters to paginate through results. See the [API Reference](https://workos.com/docs/reference/pagination) for details.

### Fetch user or group memberships

To fetch the relationship between a specific user and group, scope the list endpoints with a filter parameter. This pattern keeps response payloads bounded by the size of a single user or group, and is the recommended replacement for the deprecated `groups` field on the directory user object.

To list users that belong to a specific group, pass the `group` parameter to List directory users:

#### List directory users by group

To list groups a specific user belongs to, pass the `user` parameter to List directory groups:

#### List directory groups by user

***

## (3) Handle directory events

Actions performed in a WorkOS environment are represented by events. These can occur as a result of user-related actions, manually via the WorkOS dashboard, or via API calls. To keep your app in sync with the latest directory data, follow the corresponding guides:

- We recommend using our [events API](https://workos.com/docs/events/data-syncing/events-api) to sync data to your application. To learn more about other ways to sync data, see the [data syncing guide](https://workos.com/docs/events/data-syncing).
- Learn about the different types of events that you can receive. See [event types](https://workos.com/docs/events).
- Understand how directory events work. See the [understanding events guide](https://workos.com/docs/directory-sync/understanding-events).
- Optionally, stream events to Datadog. See the [observability guide](https://workos.com/docs/events/observability/datadog).
