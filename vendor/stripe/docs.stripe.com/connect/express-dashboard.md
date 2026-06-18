# Express Dashboard

Learn about the features of the Express Dashboard.

The Express Dashboard is a user interface that’s available to your platform’s connected accounts. They can use the Express Dashboard to monitor their available balance, view upcoming *payouts* (A payout is the transfer of funds to an external account, usually a bank account, in the form of a deposit), view payments, manage disputes, issue refunds, and track their earnings in real time. This guide outlines the features of the Express Dashboard and how your connected accounts can access it.

## Express Dashboard features

The Express Dashboard displays the connected account’s balance transactions and net volume. You can [customize the features available to your connected accounts in the Express Dashboard](https://docs.stripe.com/connect/customize-express-dashboard.md#customize-features).

### Transactions list

The **Transactions** list displays a connected account’s balance transactions, including charges, transfers, and payouts. The **Transactions** list organizes each transaction by type, date, and amount. By default, it displays generic descriptions of charges and transfers, such as `Payment from {YOUR PLATFORM}`. To learn how to create custom descriptions, see [Customize the Express Dashboard](https://docs.stripe.com/connect/customize-express-dashboard.md).

### Earnings chart

The **Earnings** chart displays the net volume of the account’s charges and transfers over time. They can select different time intervals to view.

### Payments list

The [Payments list](https://docs.stripe.com/connect/express-dashboard/payments.md) displays a connected account’s payment history and details. After you enable the future refunds and disputes balance for connected accounts, they can proactively add money to this balance to avoid a negative balance and prevent business disruptions.

### Balance component

The balance component shows a connected account’s total balance, money on the way to the bank, money available soon, and the expected arrival date of the next payout. They can also update their payout schedule (manual vs. automatic) if you’ve enabled it, manually pay themselves out, and change their bank account. If you enable the future refunds and disputes balance, they can also proactively add money to this balance to avoid a negative balance and prevent business disruptions and chargebacks.

### Notification Banner

The notification banner renders and collects the currently due requirements. The notification banner also allows connected accounts to perform tasks, such as responding to risk interventions and compliance updates.

### Activity Hub

The activity hub displays notifications about activity such as upcoming payouts, account setting changes, refunds, and dispute payments.

### Account settings

You can view and update your connected account’s settings in your Account settings. Connected accounts can view and edit personal or business information, public information, and the bank accounts used for payouts. If **Close account** is enabled, connected accounts can also close their own account in the Express Dashboard.

To receive notifications when a connected account closes its own account, set up a webhook to listen for the appropriate event based on the API version you use:

- **Accounts v1**: Listen for the `account.application.deauthorized` event using a [Connect webhook](https://docs.stripe.com/connect/webhooks.md).
- **Accounts v2**: Listen for the `v2.core.account.closed` event using an [Account webhook](https://docs.stripe.com/event-destinations.md).

### View the task list

The task list shows a connected account’s outstanding tasks, such as confirming an email address. If **Collect eventually due requirements** is enabled, connected accounts also see a task that prompts them to submit any missing eventually due requirements.

## Accessing the Express Dashboard

There are two ways to access the Express Dashboard, login links and self-service. We recommend using login links.

### Platform login links 

You can generate single-use account-specific login links that redirect connected accounts from your platform application to the Express Dashboard login page. They then log into the Dashboard using SMS or email authentication.

To learn about using login links, see [Integrate the Express Dashboard in your platform](https://docs.stripe.com/connect/integrate-express-dashboard.md).

### Self-serve access 

Connected accounts can access the Express Dashboard by logging into [Stripe Express](https://connect.stripe.com/express_login) using their account email and an authentication code sent to their phone by SMS or to their email.

> Only live mode accounts can log into Stripe Express. For testing, use [login links](https://docs.stripe.com/connect/integrate-express-dashboard.md).

To learn more about self-serve access, see the [Stripe Express support article](https://support.stripe.com/express/questions/how-do-i-login-to-my-stripe-express-account).

## Supported browsers

The Express Dashboard supports the same browsers that the [full Stripe Dashboard supports](https://docs.stripe.com/dashboard/basics.md). Express users must access the Dashboard in a web browser, not in embedded web views inside mobile or desktop applications.

## See also

- [Integrate the Express Dashboard](https://docs.stripe.com/connect/integrate-express-dashboard.md)
- [Customize the Express Dashboard](https://docs.stripe.com/connect/customize-express-dashboard.md)
