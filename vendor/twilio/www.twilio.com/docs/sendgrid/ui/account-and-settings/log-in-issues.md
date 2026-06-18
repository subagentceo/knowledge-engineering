# Troubleshooting account login issues

There are a number of reasons why you may find yourself unable to log into your account. This article aims to explain these reasons as well as offer steps to get you back in action.

> \[!NOTE]
>
> If you are a [Unified Login](/docs/sendgrid/ui/account-and-settings/twilio-login-overview) user, use your Twilio credentials to log in to your SendGrid account.

## You haven't confirmed your email address

Did you just sign up? If you don't verify your email address we never create your account, so be sure to check your registration email and click on the link we send!

Confirming your email address is essential for the Unified Login process to work seamlessly across Twilio and SendGrid. Users who have already confirmed their email address with Twilio won't need to verify it separately for SendGrid.

## Check with other users

You may have at some point shared your credentials with someone else/another department, check with them to make sure they haven't changed anything. Also consider implementing [Teammates](/docs/sendgrid/ui/account-and-settings/teammates/) to set different levels of permissions.

## Reset your password

If you need to reset your SendGrid password, use the reset password link from the login screen to start the reset process via email.

> \[!WARNING]
>
> Changing your password can break existing API and SMTP integrations you have in production, so be sure to update your password wherever else it is used after resetting.

## If you forgot your username

In the event that you forget your username, you can reset it by filling out [this SendGrid support form](https://support.sendgrid.com/hc/en-us/requests/new#forgot-username).

## Bad username/password

Usually received via the API, this error means SendGrid doesn't recognize one or both of the **api\_user** and **api\_key** parameters that you've passed in an API request.

## Billing terminated

On the last week of each month, SendGrid terminates accounts with outstanding unpaid balances from the previous month's bill run. *Terminated accounts cannot be accessed and cannot send mail.*

SendGrid sends out several warning emails in the course of a month if an account fails to pay on time, so you should have ample warning before termination. However, if you believe your account has been terminated due to non-payment, please get in touch with [Support](https://support.sendgrid.com).

## Account banned

When an account is banned, it is permanently canceled. Access to the account is blocked and no further requests to SendGrid are accepted.

A banned account is not allowed back on SendGrid in the future. If the account had dedicated IPs, they are removed. Related sub-users are also banned.

SendGrid rarely reinstates banned accounts, but if you would like to discuss it, *please respond to the email you received regarding the ban.*

> \[!NOTE]
>
> Support cannot assist in reactivation of banned accounts.
