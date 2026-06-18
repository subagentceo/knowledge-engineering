# Twilio Login Overview

> \[!NOTE]
>
> All Twilio SendGrid signups and teammates use [Twilio Login][twilio-login].
> Twilio Login manages all users of Twilio Comms, SendGrid, and Segment accounts.

[Twilio Login][twilio-login] lets you use your Twilio email, password, and authentication settings across Twilio Comms, Segment, and SendGrid.

## Use the Twilio Login navigation

This navigation bar displays a button with your Twilio SendGrid parent account name or subuser username.

![Twilio SendGrid logo with Production Email USA dropdown and Dashboard icon.](https://docs-resources.prod.twilio.com/9bb11fc791896748e54d24900ed882240417ee0a0e9424f56a0918e582ea08a4.png)

### When to use the Twilio Login navigation

This navigation bar allows two types of users certain capabilities:

* Admins can [impersonate subusers](/docs/sendgrid/ui/account-and-settings/subusers).
* Console users with multiple accounts can switch between accounts.

### What Twilio navigation covers

[Twilio Login][twilio-login] manages *part* of your Twilio SendGrid account details. The following table lists the administrative functions of the Twilio and SendGrid tools.

| Tool             |                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Administrative function                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Twilio Console   |                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Configure most of your user settings, like email, password, and two-factor authorization.                           |
| SendGrid Console |                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Manage the SendGrid account settings and teammates.                                                                 |
| Product Switcher | <svg role="img" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="ProductSwitcherIcon-109"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M1.4 1.4H9V9H1.4V1.4zm1.2 1.2v5.2h5.2V2.6H2.6zM11 1.4h7.6V9H11V1.4zm1.2 1.2v5.2h5.2V2.6h-5.2zM1.4 11H9v7.6H1.4V11zm1.2 1.2v5.2h5.2v-5.2H2.6zM11 11h7.6v7.6H11V11zm1.2 1.2v5.2h5.2v-5.2h-5.2z" /></svg> | Switch between Twilio Comms, Twilio SendGrid, and Twilio Segment. Click this icon, then select the desired product. |

To learn more, see [Getting Started with the Product Switcher][] in the Twilio Help Center.

## Migrate your SendGrid account to Twilio Login

Twilio Login lets you use one set of user credentials to log in to all Twilio products. All eligible, existing SendGrid users can enable Twilio Login.

> \[!WARNING]
>
> Linking your SendGrid account to Twilio Login deactivates your SendGrid login credentials.
> If you want to change the email used for your SendGrid or Twilio accounts, change them *before linking accounts*.

After you log in to SendGrid, the SendGrid Console displays a prompt.
This prompt offers two choices:

1. Link your Twilio login credentials.
2. Sign up as a Twilio user.

## Link existing SendGrid and Twilio accounts

Prior to linking your users, you *can* change your SendGrid or Twilio email address using the respective Consoles.

1. From the prompt, click **Login**.
2. Choose the same email address that you use for your SendGrid account.
   * You can link only *one* SendGrid account to *one* Twilio account. If you have multiple SendGrid accounts tied to the same email address:
     * If you set your SendGrid username to your email address, link that account first.
     * If you set none of your SendGrid usernames to your email address, choose the SendGrid account you wish to link to your Twilio user.
3. Complete the login.
   * This links your Twilio and SendGrid accounts.
   * The email address you used becomes your unique identifier.
   * You can't create additional SendGrid accounts with that email address.

## Create Twilio account then link to SendGrid

The Twilio sign up procedure involves completing a short form, then verifying the email address and phone number you associate with the Twilio account.

1. From the prompt, click **Create new Twilio user**.
   The [Twilio sign up page][twilio-signup] displays.
2. Complete the form displayed.
   * Enter your first name in the **First name** box.
   * Enter your last name in the **Last name** box.
   * Enter your email address in the **Email address** box.
   * Enter your password in the **Password** box.
   * Read the the Terms of Service and Privacy Notice documents, then select the Terms of Service and Privacy Notice checkbox.
   * Click **Continue**.
3. A prompt displays that asks you for the code you received at the email address you provided.
4. Enter the code you received in your email inbox into the **Enter verification code** box.
5. Click **Verify**.
6. Enter your phone number in the **Phone Number** box.
   * If this phone number can receive texts, click **Send code via SMS**.
   * If this phone number can receive only voice calls, click **Send code via voice call**.
7. Enter the code you received on your phone in the **Enter verification code** box.
8. Click **Verify**.
9. If successful, the **You're all verified!** page displays.
10. Copy or download your **Recovery code** or both.
11. Click **Continue**.

Once you link your Twilio and SendGrid users, your Twilio and SendGrid consoles only accept your Twilio login credentials.

## Manage account details

Teammates with admin privileges can change the account name at this point.

## Additional resources

If you run into any issues, consult the [SendGrid support team][].

To learn more, see [Account Details][].

[SendGrid support team]: https://support.sendgrid.com/

[Account Details]: /docs/sendgrid/ui/account-and-settings/account

[Getting Started with the Product Switcher]: https://help.twilio.com/articles/19652187501211-Getting-Started-with-the-Unified-Login-and-Product-Switcher

[twilio-login]: https://www.twilio.com/login

[twilio-signup]: https://www.twilio.com/en-us/try-twilio
