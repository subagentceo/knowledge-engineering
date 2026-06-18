# Add and authenticate email domains

> \[!WARNING]
>
> Email in Twilio Flex is not a HIPAA Eligible Service and should not be used in workflows that are subject to HIPAA.

To prove that you own the domains you will use for Flex, you must add and [authenticate your email domains](https://docs.sendgrid.com/glossary/domain-authentication) in Twilio using the following steps.

Before you begin, ensure that you know who your domain provider is and that you have the ability to add [CNAME](https://docs.sendgrid.com/ui/account-and-settings/how-to-set-up-domain-authentication#cname) and [MX](https://docs.sendgrid.com/ui/account-and-settings/how-to-set-up-domain-authentication#mx) records through your domain provider's website. If you're not sure who your domain provider is or if you don't have the right permissions to add these records, contact your website administrator for help with this procedure.

Each email domain must be authenticated for only one SendGrid account that is linked to your Flex account.

1. From **Channels > Email**, click **Authenticate domain**.
   ![Twilio SendGrid account connected with option to authenticate a domain.](https://docs-resources.prod.twilio.com/bfe884aae2f9507af0611997d2a4e1716ed0905550a8c5ae685a58ce9d9940e1.png)
2. In the **Domain name** box, enter the subdomain (if you use one) and base URL of your domain. Then, click **Authenticate.**
3. Validate your domain by adding DNS records through your domain provider's website:
   1. From your domain provider's website, navigate to the DNS records page.
   2. Add a CNAME record for each row in the Twilio **DNS records** table. Copy the host name and value from the table by clicking the copy icons in the Twilio **DNS records** table.
4. From your domain provider's website, add an MX record to process incoming email:

   1. On your domain provider's website, navigate to the MX records page.
   2. Create a new MX record for the subdomain to process incoming email. For example: `subdomain.example.com`. This hostname should be used exclusively to parse your incoming email. *Warning: Do not change the existing MX record for your domain. If you do, you will no longer receive email.*
   3. Assign the new MX record a priority of 10 and point it to this address: `mx.sendgrid.net`. If there is no field for priority, type 10 before the address. For example: `10 mx.sendgrid.net`. Your entry should look similar to this:

   ![MX record setup with subdomain, priority 10, and server mx.sendgrid.net.](https://docs-resources.prod.twilio.com/d7acf152e46acea7d80cb5e855b3f5cd74806145fe6ab84f10cc6e02c5506716.png)
5. After adding an MX record, return to the Flex **DNS records** page. Select **I've added these records to my domain provider page** and then click **Verify**.
   Your domain won't be successfully verified until the changes to your domain provider take effect. It typically takes an hour or less. You can leave this page, then come back to this step later and try again.

   When the verification is successful, the status of each CNAME record changes to **Verified**. If verification is not successful and you need help, see [Troubleshooting sender authentication](https://docs.sendgrid.com/ui/account-and-settings/troubleshooting-sender-authentication).
6. When you've completed these steps successfully, the status of your domain on **Channels > Email** changes to **Verified**.
   ![Twilio SendGrid account connected with one verified domain and prompt to create an email address.](https://docs-resources.prod.twilio.com/6a4167e92403413246e6b8bd6e41590bdb9bd4900f5cee78388ee1f666959dc7.png)

[\< Email index page](/docs/flex/email)
