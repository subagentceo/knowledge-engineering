# Try out Twilio Email

To see how Twilio Email works, you can try it out with just a few clicks. You'll be able to send and receive your first emails within a few minutes.

As you send emails, you'll be able to see the API request and response that Twilio uses. You can build using our Email API reference, knowing that everything you create can easily transfer to a fully featured account when you upgrade.

For details about trial free units, restrictions, the 30-day expiration, and post-upgrade free units, see [Twilio trial account](/docs/usage/trials).

To get started, go to the [Twilio Console](https://1console.twilio.com/) and click **Email**. Under **Popular channels**, locate **Transactional Email** and click **Try out Email**.

During your Email trial:

* You'll send emails to yourself (the email address you set up for your account)
* Emails are sent from a Twilio trial email address
* You'll choose a message from a few plain-text email body examples, such as an order delivery notification or an appointment reminder. You won't be able to write your own email.

When you're ready, you can upgrade your account to authenticate your own domain and gain access to all Email functionality.

At any time, click **Logs** to view Email logs or **Free units tracker** to see how many emails you have left in your trial. Email logs in trial may take up to 5 minutes to show up.

## Send a trial email

On the **Send an email** page, follow the on-screen instructions to configure settings and send your message.

Note that the API request and response for your message appear on the page.

## Using the Email API

During your trial, you can use the Email API with some limitations and key differences. The simplest way to build during your trial is to copy your request from the code block on the **Try out Email** page in the Console, then make adjustments as needed.

You can build in your trial environment, then upgrade to a fully featured account when you're ready. Once trial limitations no longer apply and you have authenticated your own domain, you can create your own custom email body content and set additional parameters that were not supported in your trial.

### Send an email

During your trial, you can only use or change the following parameters:

* `to`: (Required) The recipient's email address.
* `body`: (Required) Must specify one of the following Twilio templates shown in the **Try out Email** page in the Console: order confirmation, appointment reminder, or security alert.
