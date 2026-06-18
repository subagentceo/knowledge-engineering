# Enable Email in Flex

> \[!WARNING]
>
> Email in Twilio Flex is not a HIPAA Eligible Service and should not be used in workflows that are subject to HIPAA.

To enable email as a channel, go to **Channels > Email** and select **Enable email**.

When you enable Email in Flex, a SendGrid account is automatically provisioned for you. Twilio uses SendGrid to send and receive emails within your Flex application.

![Enable email as a channel in Twilio Flex using SendGrid.](https://docs-resources.prod.twilio.com/256749fc6bba9693a07b804a562b3d47726a92aec97bb75f78033579ad279daf.png)

After you create your SendGrid account, you can authenticate your email domains on SendGrid.

> \[!NOTE]
>
> We recommend that you don't use the auto-provisioned SendGrid account for other production use cases.

Each Flex account can be linked to a single auto-provisioned SendGrid account.

If you need to unlink or delete a Twilio account from the auto-provisioned SendGrid account,[contact our support team](https://help.twilio.com) for help. You cannot perform this task on your own. If you delete your Flex account, your auto-provisioned SendGrid account is deleted as well.

[\< Email index page](/docs/flex/email)
