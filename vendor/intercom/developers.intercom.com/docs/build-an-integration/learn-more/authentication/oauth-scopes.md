# OAuth Scopes

When you configure OAuth you will need to define the OAuth scopes, and these will be reviewed when you [submit your app for approval](/docs/publish-to-the-app-store/review-publish-your-app). This guide will help you understand what OAuth scopes are, which ones are available, and how to choose them.

## What are OAuth scopes?

OAuth scopes, or permissions, let you specify exactly what types of data your app can access within an Intercom workspace and actions that it can take with the workspace's data.

You select OAuth scopes when you are configuring OAuth in your [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub).

![OAuth Scopes Settings in the Developer Hub](/assets/oauth_scopes.05d77d8eece6ec63dc550e3efb1bb927c7d066676c68d7795fc875226c01763e.71a4f21c.png)

## Why are OAuth scopes important?

OAuth scopes are important because they define the level of access your app has to specific pieces of customer data. For the security of our customers, Intercom ensures that public apps only access resources necessary to the functionality of the app.

It's important that you only specify the scopes you need to satisfy your use case and no more.

**Over-privileged scopes are the most common reason that apps are initially rejected in the approval process.**

It's also important to note that if you are using Canvas Kit for Messenger or Inbox apps, certain OAuth scopes are required by default.

Canvas Kit required scopes
If your app utilizes Canvas Kit, certain permissions are required by default due to the data your app will have access to. The following scopes will be automatically selected and cannot be deselected:

- Read and list users and companies
- Read conversations
- Read admins
- Gather App data


## Available OAuth scopes

The following scopes can be selected via checkboxes on your Authorization settings page in the Developer Hub:

### People & conversation data

| Standard scopes | Description |
|  --- | --- |
| Read and list users and companies | List and view all segments, users, companies, and tags |
| Read and write users | List all users and execute bulk actions |
| Write users and companies | Create and update users, companies, and tags |
| Read one user and one company | List and view a single user and company |
| Read tags | List all tags |
| Write tags | Create, update, use and delete tags |
| Read conversations | View conversations |
| Write conversations | Reply to, mark as read and close conversations |
| Delete conversations and metrics | Delete conversations and their metrics, cannot be recovered |
| Read events | List all events belonging to a user |
| Write events | Ability to submit events (i.e. user activity) |
| Read counts | Count users and companies with specified criteria |
| Write data attributes | Create and update custom data attributes |
| Export message data | Export engagement data for messages |
| Export content data | Export engagement data for content |
| Read content data | Create and update custom data attributes |
| Read tickets | View tickets |
| Write tickets | Create tickets |
| Read and write custom object instances | Create, read, update and delete custom object instances |
| Read status of jobs | Read status of jobs enqueued via the API |


### Workspace data

| Extended scopes | Description |
|  --- | --- |
| Read admins | List and view all admins |
| Read one admin | View a single admin |
| Update admins | Update away mode for admins |
| Read admin activity logs | List and view all admins and their activity |
| Read data when entered into the app | Gather data via Intercom Apps |
| Read and List news items and newsfeeds | List and view all News items and Newsfeeds |
| Read and Write news items and newsfeeds | Read, Update and Create news items and newsfeeds |
| Read and List articles | List and view all articles |
| Read and Write Articles | Read, Update and Create articles |
| Create phone call redirects | Create phone call redirects |
| Read and list news items and newsfeeds | List and view all News items and Newsfeeds |
| Read and write news items and newsfeeds | Read, update and create news items and newsfeeds |
| Read and write AI content | Create and update AI content |
| Read data connectors | Access data connectors, execution results and execution webhooks |
| Read and write data connectors | Configure data connectors and read execution results and execution webhooks |


## Webhook topics and OAuth scopes

**Webhook topics are related to corresponding OAuth permission scopes**.

For example, if you need to setup a webook to trigger when a user/lead is created then you will need to select the "Read and write users" permission scopes.

You will then be able to setup the webhook topics for your app which will fire for each workspace it is installed on.

See the guide on [setting up webhooks](/docs/webhooks/setting-up-webhooks) for more information on how to enable webhooks for your app.