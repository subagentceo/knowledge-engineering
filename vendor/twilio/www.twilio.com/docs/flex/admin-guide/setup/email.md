# Email in Flex for administrators

> \[!WARNING]
>
> Email in Twilio Flex is not a HIPAA Eligible Service and should not be used in workflows that are subject to HIPAA.

## How email works

Flex relies on Twilio SendGrid for sending and receiving email. When you set up email as a channel in Flex, Twilio automatically sets up a SendGrid account for you.

![Diagram showing email flow from agent via Twilio Flex and SendGrid to end-user.](https://docs-resources.prod.twilio.com/466030082ce7b835486ce583a87f235bc7a6c52ad8141a994d26a0b0300fce40.jpg)

## Email quota

Your Flex account may include a quota for the maximum number of emails that you can send. The quota applies to Named User and Active User Hours pricing models. If you go over your quota, your account will be charged per additional email.

For more information about Flex plans and pricing, see [How Does Twilio Flex Pricing Work?](https://help.twilio.com/hc/en-us/articles/360010715454-How-Does-Twilio-Flex-Pricing-Work-).

## Before you begin

To use Email in Flex, you must be using Flex UI version 2.5.0 or later.

## Next steps

This section walks you through the process of setting up Email in Flex. Complete the following steps:

1. [Prepare your Flex account for email](/docs/flex/admin-guide/setup/email/flex-account-preparation)
2. [Enable Email in Flex](/docs/flex/admin-guide/setup/email/enable-email-in-flex)
3. [Add and authenticate email domains](/docs/flex/admin-guide/setup/email/domains)
4. [Create email addresses](/docs/flex/admin-guide/setup/email/address-creation)
5. [Warm up an IP address for Email in Flex](/docs/flex/admin-guide/setup/email/warm-up-an-ip-address-for-email-in-flex)
6. [Set up outbound email](/docs/flex/admin-guide/setup/email/outbound)
7. [Configure the Leave option for email tasks](/docs/flex/admin-guide/setup/conversations/leave-and-pause-for-conversations)

[\< Email index page](/docs/flex/email)
