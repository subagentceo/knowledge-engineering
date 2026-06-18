# Revenue recovery

Learn about automated recovery features that reduce and recover failed subscription payments.

Prevent lost revenue and reduce churn with Stripe’s revenue recovery features. These automated tools make sure you don’t lose revenue to failed payments or missed trial conversions. None of the features require you to write code, so you can start recovering revenue today.

> #### Recovering one-off invoices
> 
> This page describes recovery features for *subscriptions* (A Subscription represents the product details associated with the plan that your customer subscribes to. Allows you to charge the customer on a recurring basis) and other recurring revenue. Learn more about setting up [automatic collection](https://docs.stripe.com/invoicing/automatic-collection.md) and recovery for one-off *invoices* (A Subscription represents the product details associated with the plan that your customer subscribes to. Allows you to charge the customer on a recurring basis).

## Revenue recovery features

Stripe provides a full tool set to help you recover recurring revenue:

[Recovery analytics](https://docs.stripe.com/billing/revenue-recovery/recovery-analytics.md): Analyze subscription payment failure rates, recovery rates, and recent failed payments for top customers.

[Smart Retries](https://docs.stripe.com/billing/revenue-recovery/smart-retries.md): Automatically retry failed payments to prevent involuntary churn due to temporary issues.

[Email notifications](https://docs.stripe.com/billing/revenue-recovery/customer-emails.md): Automatically send emails to customers when a payment fails, a card expires, or a payment method requires an update.

[No code Automations](https://docs.stripe.com/billing/automations.md): Implement your own custom recovery logic without writing code.

[Automatic card updates](https://docs.stripe.com/payments/cards/overview.md#automatic-card-updates): Stripe automatically updates your customer’s card information when they get a new card number.

## Recurring revenue recovery options

Stripe recommends including the following recurring revenue recovery options in your integration. As you complete each item, check it off. Your browser’s cache stores the state of each checkbox so you can refer back to this page to see what you’ve completed so far.

- [ ] Set up failed payment retries
      Retrying failed payments is one of the most effective ways to recover revenue. It requires no manual intervention from you or the customer.

      You can set up Smart Retries and custom retry schedules in the Stripe Dashboard without writing any code. Smart Retries use data points to find the best time to retry the payment and are more effective than scheduled retries.

      - [Automate payment retries](https://docs.stripe.com/billing/revenue-recovery/smart-retries.md)

- [ ] Set up automatic customer emails
      Set up automated customer emails to notify customers of possible issues. You can enable these based on your business’s use cases. Many businesses use failed payment and 3D Secure emails to help customers immediately fix failing payments.

      - [Automate customer emails](https://docs.stripe.com/billing/revenue-recovery/customer-emails.md).

- [ ] Set up automations
      You can set up more automations for custom logic and revenue recovery without writing code, including workflows such as:

      - [Custom dunning flow for annual subscribers](https://docs.stripe.com/billing/automation-recipes.md#custom-dunning-flow)
      - [Notify your team when high value invoices are overdue](https://docs.stripe.com/billing/automation-recipes.md#invoice-overdue-notifications)
      - [Email a confirmation when a subscription is canceled](https://docs.stripe.com/billing/automation-recipes.md#subscription-cancellation-confirmation)

      - [Automation recipes](https://docs.stripe.com/billing/automation-recipes.md)
      - [Automations](https://docs.stripe.com/billing/automations.md)
