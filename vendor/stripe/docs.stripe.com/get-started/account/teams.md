# Start a team

Learn how to invite and interact with team members.

Stripe logs the account activity of team members during the past 180 days. To review account activity information, go to [Security history](https://dashboard.stripe.com/settings/security_history) in the Dashboard.

To invite new team members:

1. Go to the [Team](https://dashboard.stripe.com/settings/team) tab in the Dashboard.
2. Click **Add member**.
3. Add one or more email addresses, separated by a space or comma. Adding users together allows you to assign them all the same roles and access simultaneously.
4. Select which roles to assign. Users can hold multiple roles within the same account. Review the [list of actions](https://docs.stripe.com/get-started/account/teams/roles.md) that each role can and can’t perform before assigning the role to a team member. Grant the lowest permission required by the user to perform their job.
5. After completing the role assignment for all the accounts, review the configuration, and click **Send invites** to email the specified users with the steps to accept the invitation.

Invites to your Stripe account expire after 10 days.

After a team member accepts their invite, you can edit their role at any time from your [Team](https://dashboard.stripe.com/settings/team) settings. To edit a team member’s role, click the overflow menu (⋯), then click **Edit**.

## Mention team members 

You can mention team members when you add a note to a payment. If you mention a team member, they receive an email notification with the note and a link to the associated payment.

## Receive email notifications 

You can configure email notifications under **Communication preferences** in your [Personal details](https://dashboard.stripe.com/settings/user) settings, and apply them on a per-user basis. If your team members also want to receive notifications, they must customize their own settings. Stripe sends email notifications to you when any of the following events occur:

- A successful payment is received.
- An [application fee](https://docs.stripe.com/connect/direct-charges.md#collect-fees) is collected from a connected account.
- A payment is [disputed](https://docs.stripe.com/disputes.md) by a customer.
- A payment is marked as [elevated risk](https://docs.stripe.com/radar/risk-evaluation.md#elevated-risk) by Stripe or a custom [Stripe Radar](https://docs.stripe.com/radar.md) rule.
- You’re mentioned in a note.
- A customer sends an incorrect amount to pay their [invoice](https://docs.stripe.com/invoicing.md).
- A [webhook](https://docs.stripe.com/webhooks.md) delivery fails.

For a full list of notification events, go to your **Communication preferences** under **Profile**.

### Automate email notifications

Use [Stripe Workflows](https://docs.stripe.com/workflows.md) to automate sending emails to your team. Workflows allows you to use a visual builder in the Stripe Dashboard to automate tasks that require multi-step processes that depend on conditional logic.

Workflows is also compatible with most Stripe products such as, but not limited to:

- [Online payments](https://docs.stripe.com/payments/online-payments.md)
- [Disputes](https://docs.stripe.com/disputes.md)
- [Invoicing](https://docs.stripe.com/invoicing.md)
- [Billing](https://docs.stripe.com/billing.md)
- [Radar](https://docs.stripe.com/radar.md)

To learn how it works, [set up a test workflow](https://docs.stripe.com/workflows/set-up.md) and review our [example use cases](https://docs.stripe.com/workflows/use-cases.md).

## See also

- [User roles](https://docs.stripe.com/get-started/account/teams/roles.md)
- [Single sign-on](https://docs.stripe.com/get-started/account/sso.md)
- [Manage access to your organization](https://docs.stripe.com/get-started/account/orgs/team.md)
