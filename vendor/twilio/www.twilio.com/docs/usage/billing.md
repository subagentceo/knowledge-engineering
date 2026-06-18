# Billing

Twilio provides tools to help you manage billing across your accounts — from viewing invoices and managing payment methods in the Console, to organizing multiple accounts under a single Billing Group for consolidated invoicing and shared pricing. You can also retrieve usage data programmatically through the Usage API to track costs in real time.

## Manage billing in the Console

To view and manage your billing settings, log in to the [Twilio Console](https://1console.twilio.com/) and navigate to **Admin** > **Account billing**. From there, you can:

* View your billing overview and current balance.
* Manage payment methods.
* View invoices and usage statements.
* Access your Billing Groups.

For general billing questions, payment information, and account management, see the [Twilio Help Center](https://help.twilio.com/articles/360038270333).

## Billing Groups

A **Billing Group** is a way to organize multiple Twilio accounts under a single billing entity. If your organization uses multiple Twilio accounts or subaccounts, Billing Groups let you consolidate everything into one place — with shared pricing, a single invoice, and unified payment methods.

Each Billing Group has a unique ID (beginning with `commerce_billingprofile_`) that you can use to retrieve usage data programmatically through the API.

For details on finding your Billing Group ID and using the Usage API, see [Billing Groups](/docs/usage/billing/billing-group).

## Related resources

* [Usage records API](/docs/usage/api/usage-record) — View your account's usage data.
* [Usage triggers API](/docs/usage/api/usage-trigger) — Set up alerts based on usage thresholds.
* [Twilio Help Center: Billing](https://help.twilio.com/articles/360038270333) — General billing FAQs, payment methods, and account management.
* [Billing Group ID: Consolidated Billing and Usage Analytics](https://help.twilio.com/articles/49506588886299-Twilio-Billing-Group-ID-A-Guide-to-Consolidated-Billing-and-Usage-Analytics) — Detailed guide to Billing Group IDs and the Usage API.
