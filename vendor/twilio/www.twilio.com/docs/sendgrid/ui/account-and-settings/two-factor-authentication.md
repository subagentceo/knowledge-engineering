# Two-factor authentication

> \[!NOTE]
>
> If you're using Twilio [Unified Login][], [update your *Two-Factor Authentication*][] (TFA) in the [Twilio Console][]. These tutorials apply only to Twilio SendGrid users who haven't moved to Unified Login.

To better secure your Twilio SendGrid account, TFA, or *Multi-Factor Authentication* (MFA). It adds another layer to authentication beyond a simple username and password. Twilio SendGrid implements TFA through a code sent in an SMS message or an authentication app.

> \[!CAUTION]
>
> After a user enables TFA, Twilio SendGrid doesn't accept Basic authentication (username and password) for API calls. To use TFA, you must authenticate with an API key. To learn more, see [Authentication][].

## Configure TFA

Before setting up TFA, ensure you have access to your account email address. You can do this by visiting your [Account Details][] and reviewing your email address under **Your Account** > **Personal Info**.

If you need to update your email address, click the pencil icon to update to an email address you can access, send a confirmation email, and visit your inbox to confirm your email address by clicking the link in the email address change confirmation email.

Once you have confirmed access to your account email address, you may choose from two different verification methods when using two-factor authentication:

1. Enter a code sent to your mobile phone that Twilio SendGrid generates.
2. Adding an authentication app.

To authenticate with SMS, you need mobile service or you can't log into your account.

To set up two-factor authentication:

1. Go to **Settings** > **Two-Factor Authentication**. The **Two-Factor Authentication** page appears.
   It includes an overview of your TFA settings and settings that you have created for credentialed users.
2. Click **Add Two-Factor Authentication**.
3. Select text messages (SMS) as your means of authentication.
4. Enter your **country code** and **phone number**.

Using the same steps, Subusers and [Teammates][] must create their TFA settings in their account.

## Use TFA

After you create a setting for TFA, log in. If you opt to receive a text message with your authentication token, look for the text message and enter the code that you receive.

Once set up, security-restricted actions in your Twilio SendGrid account require TFA. These include logging in or changing your TFA settings. When prompted, enter the 7-digit token sent to your device, or your authentication app generates.

## Add multiple users to your account with TFA

To provide secure access to multiple users of your account, create [Teammates][] and enable TFA for each Teammate.

## Disable TFA

To disable or delete a TFA setting:

1. Go to **Settings**, and click **Two-Factor Authentication**.
2. Find the setting you would like to delete.
3. Click the **action menu**, and then select **Delete**.
4. Enter the 7 digit code you receive via text or authentication app into the field.
5. Click **Delete**.

## Recover account access after TFA lock out

If you find that you've lost access to your account as a result of TFA, contact [Twilio SendGrid Support][ts-support].

[Authentication]: /docs/sendgrid/for-developers/sending-email/authentication

[Twilio Console]: https://console.twilio.com

[Unified Login]: /docs/sendgrid/ui/account-and-settings/twilio-login-overview

[update your *Two-Factor Authentication*]: https://help.twilio.com/articles/223136347-Change-the-Two-Factor-Authentication-2FA-Phone-Number-on-your-Twilio-Account

[Account Details]: https://app.sendgrid.com/account/details

[Teammates]: /docs/sendgrid/ui/account-and-settings/teammates

[ts-support]: https://support.sendgrid.com/hc
