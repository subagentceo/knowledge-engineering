# Set up outbound email

> \[!WARNING]
>
> Email in Twilio Flex is not a HIPAA Eligible Service and should not be used in workflows that are subject to HIPAA.

Flex currently supports *one* email address as the default for outbound email. This is the email address that is used in the Flex UI when an agent starts a new outbound conversation.

To configure your outbound email address:

1. Navigate to **Flex** > **Channel management** > **Email**.
2. Click **Outbound settings**.
3. Enter the following information:

   * **Default outbound address**: The email address that outbound emails are sent from.
   * **Default Workflow**: The workflow used to inherit some TaskRouter settings, such as task timeouts.
   * **Default Task Queue**: The queue that the outbound tasks will be associated with. The task queue is mainly used for reporting purposes within [Flex Insights](/docs/flex/end-user-guide/insights), as no routing takes place for outbound tasks.
4. Click **Apply**.

![Flex outbound email settings with default address, workflow, and task queue options.](https://docs-resources.prod.twilio.com/c2971b1dfe3fe736dceb98d2eb8868128e46ba01df9d453c36ed9e7ca6b9e2f7.png)

[\< Email index page](/docs/flex/email)
