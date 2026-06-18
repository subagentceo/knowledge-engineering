# Build and test new features

Build and test new features using the Stripe developer tools.

Use the Stripe developer tools to integrate new features without interrupting your business operations or compromising customer data. This guide helps you:

- Test changes without affecting your live system using [Sandboxes](https://docs.stripe.com/sandboxes.md).
- Build and manage your integration with [Workbench](https://docs.stripe.com/workbench.md).
- Listen to key activities in your Stripe account to automate business processes with [event destinations](https://docs.stripe.com/event-destinations.md).

Imagine you’re a developer at Kavholm, a furniture company ready to introduce a [new payment method](https://docs.stripe.com/payments/payment-methods/integration-options.md). This payment method aims to position Kavholm as a market leader and improve customer satisfaction.

## Test with Sandboxes 

As you prepare to launch Kavholm’s new payment method, [set up a sandbox](https://docs.stripe.com/sandboxes/dashboard/manage.md#create-a-sandbox) for thorough testing and monitoring. This isolated environment lets you test features with Stripe functionality without affecting your live system. You can create multiple sandboxes without affecting other users on your account, allowing you to manage isolated environments for development and continuous integration tests. Additionally, you can:

- **Simulate payment scenarios**: Experiment with payment processes related to the new payment method without making actual transactions. Any settings you configure in your sandbox remain isolated to the testing environment and don’t impact your live account.
- **Choose a sandbox configuration**: Set up a pre-configured sandbox that mirrors some settings of your live account for realistic testing, or select a blank configuration to explore new settings. Learn more about [sandbox settings](https://docs.stripe.com/sandboxes/dashboard/sandbox-settings.md).

### Develop in a sandbox

To develop in a sandbox, consider using these features among other available options that might benefit your use case:

- **Team-based sandboxes**: Assign dedicated sandboxes for development teams to focus on specific areas of the payment method integration without interference.
- **Test APIs and webhooks**: Verify integration logic by testing API calls and webhook responses related to payment method events, such as `payment_intent.succeeded`.

### Collaborate with external partners

To collaborate with external partners, such as vendors, assign them the [sandbox user role](https://docs.stripe.com/sandboxes/dashboard/manage-access.md#manage-access) to provide controlled access for testing, ensuring that live data security isn’t compromised. This role is ideal for external partners and vendors, such as development agencies.

### Debugging and validation

To debug and validate your integration, use the following features:

- **Troubleshoot and fix bugs**: Debug payment method workflow issues by testing API calls or integration logic changes in the sandbox.
- **API key management**: Configure API keys for secure requests in the sandbox, avoiding key-related errors.

### Dedicated sandboxes

By organizing dedicated sandboxes for each testing scenario, you can simulate real-world conditions, monitor functionality, and debug integration issues without risking live operations.

For example, you can test all of the payment method functionality before it goes live, monitor integration performance continuously, and implement changes that you’ve vetted in an equivalent testing environment.

To get started, create a sandbox by navigating to the account picker menu in the Stripe Dashboard and selecting the **Create** button. Each sandbox must have a name and can copy settings from the live account to mirror actual conditions.

With dedicated sandboxes, you can test new features, such as the new payment method, through various stages such as development, integration testing, and user acceptance testing (UAT). This ensures that each stage receives thorough checks without impacting the production environment.

## Build and manage your integration with Workbench 

You can debug and manage your Stripe integration from your browser using Workbench directly in the [Dashboard](https://docs.stripe.com/workbench/overview.md#get-started).

Use the following views to manage the payment method feature:

- **Overview**:

  - Make sure the new payment method uses the latest and most secure API version.
  - Monitor API requests for payment method fee calculations to confirm they function as expected.
  - Identify integration errors related to the payment method.

- **Errors**:

  - Identify and categorize errors in payment method calculations or payment processing.
  - Track error frequency to understand impact and urgency.

- **Inspector**:

  - Analyze API object configurations and troubleshoot issues in real-time.

- **Logs**:

  - Filter API requests to make sure interactions align with expectations.

- **Events**:

  - Filter events to verify logistical triggers.
  - Review event payloads to confirm correct back-end processing.

- **Webhooks**:

  - Set up webhook endpoints or other destination types, such as Amazon EventBridge or Azure Event Grid, for real-time updates on payment method status and payment confirmations.

- **Shell and API Explorer**:

  - Simulate API requests and manage them using a command-line interface.

## Listen to real-time updates with event destinations 

At Kavholm, use event destinations to make sure all payment method features function as intended without affecting your live systems. Use event destinations to track real-time activities in your Stripe account, and to respond to critical events such as payment confirmations or subscription updates. You can:

- Send events to AWS through [Amazon EventBridge](https://docs.stripe.com/event-destinations/eventbridge.md), to Azure through [Azure Event Grid](https://docs.stripe.com/event-destinations/eventgrid.md), or to an [HTTPS endpoint through webhooks](https://docs.stripe.com/webhooks.md).
- Access real-time data using [thin or snapshot events](https://docs.stripe.com/event-destinations.md#events-overview).

### Testing

To simulate real-world conditions and evaluate the payment method’s performance before it goes live:

- Test the payment method feature in a sandbox by simulating Stripe-generated events.
- Set up test webhooks to observe event processing without impacting live customers.

### React to real-time updates

To track key events and maintain oversight of the payment method feature’s ongoing functionality:

- Configure event destinations to [aggregate and alert you on events](https://docs.stripe.com/event-destinations.md#event-permissions) such as `payment_intent.succeeded`. Event destinations support receiving alerts at a webhook endpoint, Amazon EventBridge, or Azure Event Grid.
- View payment event history to troubleshoot payment method processes and [track event deliveries](https://docs.stripe.com/event-destinations.md#event-retention). Use logs for debugging, especially when your focus is on event logs rather than API request logs.

### Debugging

To identify and resolve issues through real-time event analysis and ensure uninterrupted service for Kavholm’s customers:

- Quickly identify billing or payment method issues to alert your customers with specific event notifications.
- Use [thin events for real-time analysis](https://docs.stripe.com/event-destinations.md#thin-events) of payment method processing.

With event destinations, Kavholm tests, monitors, and debugs its new payment method while minimizing disruptions.

## See also

- [Sandboxes](https://docs.stripe.com/sandboxes.md)
- [Event Destinations](https://docs.stripe.com/event-destinations.md)
- [Workbench](https://docs.stripe.com/workbench.md)
- [Workbench use cases](https://docs.stripe.com/workbench/guides.md)
