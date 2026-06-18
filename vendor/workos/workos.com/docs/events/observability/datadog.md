# Stream events to Datadog

![WorkOS Datadog dashboard showing various metrics and graphs describing authentication events and user activity](https://images.workoscdn.com/images/9ec8c9ce-e087-4967-8b66-9311aaf13902.png?auto=format\&fit=clip\&q=50)

WorkOS supports real-time streaming of events to Datadog. By analyzing WorkOS activity directly in Datadog, you are able to:

- View trends in user sign-ins, user growth, new SSO connections and more.
- Debug customer issues related to sign-in, email verification, password resets and more.
- Generate reports of user activity per customer organization.
- Set alerts for unexpected activity, such as sudden spike in failed password attempts.

See all of the WorkOS events that stream to Datadog in the [event types](https://workos.com/docs/events) documentation.

***

## Introduction

Setting up real-time streaming of WorkOS events to Datadog only takes a few minutes and can be done in three simple steps.

***

## (1) Create a Datadog API key

First, create a new Datadog API key to give WorkOS permission to send event activity as logs to your Datadog account. While you can use an existing API key, WorkOS recommends creating a new key that will only be used for WorkOS event streaming.

1. Sign in to your [Datadog account](https://app.datadoghq.com/).
2. Navigate to the [Organization Settings → API Keys](https://app.datadoghq.com/organization-settings/api-keys) page.
3. Choose the **New Key** button
4. Enter a name for your new API key.
5. Choose the **Create Key** button.
   ![A screenshot showing how to create an API key in the Datadog dashboard.](https://images.workoscdn.com/images/d69f49e9-6e8b-444a-8736-0cc2db98cf72.png?auto=format\&fit=clip\&q=50)

***

## (2) Configure event streaming in WorkOS

The next step is to configure event streaming in the [WorkOS Dashboard](https://dashboard.workos.com/) using the Datadog API key that was created in the previous step.

1. Sign in to the [WorkOS Dashboard](https://dashboard.workos.com/).
2. Navigate to the **Events** page.
3. Choose the **Stream to Datadog** button.

![A screenshot showing how setup streaming events to Datadog in the WorkOS Dashboard.](https://images.workoscdn.com/images/0259f8e3-6fb2-4b3a-819a-f98d128c1c79.png?auto=format\&fit=clip\&q=50)

4. Enter the Datadog API key.
5. Select your Datadog region.
6. Choose the **Save Log Stream Details** button.

![A screenshot showing how to enter a Datadog API key in WorkOS Dashboard.](https://images.workoscdn.com/images/e1d4d7bb-e076-492f-971f-e116ffe2de0e.png?auto=format\&fit=clip\&q=50)

With event streaming configured, when new events occur, WorkOS will send the events to Datadog with the source `workos`.

***

## (3) Add the WorkOS Datadog dashboard

The final step is to add the WorkOS Datadog dashboard to your Datadog account.

1. Sign in to your [Datadog account](https://app.datadoghq.com/).
2. Navigate to the [Dashboard List](https://app.datadoghq.com/dashboard/lists) page.
3. Choose the **+ New Dashboard** button.

![A screenshot showing how to create a new dashboard in Datadog.](https://images.workoscdn.com/images/feee6689-2477-4711-bf0e-10c917cc02f7.png?auto=format\&fit=clip\&q=50)

4. Enter a dashboard name.
5. Choose the **New Dashboard** button.
6. In the new dashboard, choose the **Configure** button.
7. Download the [WorkOS Datadog dashboard JSON file](https://workos.com/docs/assets/workos-datadog-dashboard.json)
8. Scroll down in the context menu and choose **Import dashboard JSON**.
9. Upload the WorkOS Datadog dashboard JSON file downloaded in the previous step.

![A screenshot showing how to import a JSON definition of a Dashboard into Datadog.](https://images.workoscdn.com/images/3dc7f949-67ff-470e-84f1-8a5a8880114d.png?auto=format\&fit=clip\&q=50)
