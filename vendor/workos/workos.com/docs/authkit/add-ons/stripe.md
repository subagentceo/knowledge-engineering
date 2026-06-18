# Stripe

## Introduction

WorkOS provides two powerful Stripe integrations that help you manage billing and access control for your B2B application:

- **Stripe Entitlements**: Automatically provision access tokens with subscription-based entitlements from Stripe
- **Stripe Seat Sync**: Automatically sync organization member counts to Stripe billing meters for usage-based billing

Both features use [Stripe Connect](https://stripe.com/connect) to connect your WorkOS account to your Stripe account, allowing WorkOS to manage these integrations on your behalf.

***

## Connect to Stripe

To use either Stripe Entitlements or Stripe Seat Sync, you'll first need to connect your WorkOS account to Stripe using Stripe Connect.

Navigate to the *Authentication* section of the [WorkOS Dashboard](https://dashboard.workos.com/) and click *Add-ons*.

From that page, find the Stripe Add-on and click *Enable*.

![Authentication Add-ons page](https://images.workoscdn.com/images/75c987b7-d946-4e37-b46d-043fa994cfb4.png?auto=format\&fit=clip\&q=80)

This will open a Dialog to pick the Stripe features you would like to use. When clicking *Continue* you'll be directed to Stripe where you can approve the connection. Once that's complete, close the tab.

> WorkOS does not currently support connecting to a Stripe Sandbox account. Connect WorkOS to a standard Stripe account, and use Stripe's test mode for development and testing your integration.

![Stripe Dialog](https://images.workoscdn.com/images/5953bd10-b966-4b1f-8d9f-7cd490bc19d3.png?auto=format\&fit=clip\&q=80)

In the connection dialog, you can choose to enable one or both features:

- **Use Stripe entitlements**: Include entitlement data in access tokens
- **Sync organization seat counts**: Send member counts to Stripe billing meters

If you decide to disconnect your Stripe account later or toggle features on and off, you can do so from the same section. Click the *Manage* button to disable features or disconnect entirely.

***

## Set Stripe Customer IDs

To use either of these features, you'll need to set the Stripe customer ID on each WorkOS organization.

Once you have a WorkOS organization ID and a Stripe customer ID, you can set the Stripe customer ID for the organization. One way to handle this is to create a Stripe customer and then set the created Stripe customer ID on the WorkOS organization. This can be done via the WorkOS API or SDK. Here's an example using the SDK:

***

## Stripe Entitlements

Entitlements are a way to provision an account in your application with specific features or functionality based on the subscription plan a user is on. For example, you might have an "Enterprise" plan that allows users to access certain features like [Audit Logs](https://workos.com/docs/audit-logs), and a "Basic" plan that does not.

The WorkOS Entitlements integration makes it easy to get Stripe's entitlement information into your application without needing to listen to Stripe webhooks or explicitly track them in your application.

### Use the entitlements in your application

The access token will now include the `entitlements` claim, containing the user's entitlements. You can use this information to gate access to features in your application.

> Entitlements added mid-cycle will appear in the next Stripe billing cycle or when a new subscription is created, per Stripe's billing logic.

Entitlements will show up in the access token the next time the user logs in or the session is refreshed. You can manually [refresh the session](https://workos.com/docs/reference/authkit/authentication/refresh-token) after the user has completed their subscription purchase. Here's an example in Express:

***

## Stripe Seat Sync

Stripe Seat Sync automatically sends active organization member counts to Stripe as billing meter events under [Usage-based billing](https://docs.stripe.com/billing/subscriptions/usage-based), enabling usage-based billing based on the number of seats (members) in each organization.

### How it works

When Stripe Seat Sync is enabled:

- WorkOS creates a billing meter in your Stripe account called **"User Seat Count"** with the event name `workos_seat_count`
- Whenever a member is added, removed, deactivated, or activated from an organization, WorkOS automatically sends a meter event to Stripe with the updated seat count
- You can use this meter in Stripe to create usage-based pricing based on the number of active seats

The meter uses Stripe's ["last" aggregation method](https://docs.stripe.com/billing/subscriptions/usage-based/meters/configure), which means Stripe will bill based on the most recent seat count reported during each billing period.

### Using the seat count meter in Stripe

Once enabled, WorkOS will automatically send meter events to Stripe whenever organization memberships change. You can:

- View the meter events in your Stripe Dashboard under **Billing → Meters**
- Create pricing models that bill based on the `workos_seat_count` meter
- Use the meter in subscription items to charge customers based on their current seat count

The meter event includes:

- **Event name**: `workos_seat_count`
- **Customer ID**: The Stripe customer ID associated with the organization
- **Value**: The current number of active members in the organization

No additional code is required in your application—WorkOS handles all meter event reporting automatically as members join or leave organizations.
