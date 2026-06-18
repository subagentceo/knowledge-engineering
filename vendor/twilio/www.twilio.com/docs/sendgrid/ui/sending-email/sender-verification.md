# Authenticate a single sender

To protect your sending reputation and to uphold legitimate sending behavior, Twilio requires that customers authenticate or verify their sender identities.

## Verify a sender

To verify the [identity][] of a single sender, add the sender's contact details, including their email address, in the Twilio SendGrid console.

1. Log in to the [Twilio SendGrid console][] if needed.
2. Go to **Settings** > [**Sender Authentication**][].
3. Under **Single Sender Verification**, click **Verify a Single Sender**. The [**Create a Sender**][] panel appears.
4. Fill in all of the fields displayed in the panel.

   | Field                  | Accepted value                                                                                                                        |
   | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
   | **From Name**          | A human-readable name displayed to your recipient when they receive their email.                                                      |
   | **From Email Address** | The email address displayed to your recipient that sent the email message. Twilio sends the verification email to this email address. |
   | **Reply To**           | The email message to which any replies go.                                                                                            |
   | **Company Address**    | The street address associated with your business' physical address.                                                                   |
   | **City**               | The locality that contains the mailing address associated with your business' physical address.                                       |
   | **State**              | The division of the country that contains the mailing address associated with your business' physical address.                        |
   | **Zip Code**           | The postal code that routes postal mail to the mailing address associated with your business' physical address.                       |
   | **Country**            | The country that contains the mailing address associated with your business' physical address.                                        |
   | **Nickname**           | A label that identifies your sender identity. Your recipients can't see this label.                                                   |

   If you don't receive a verification email after an hour, return to the Sender settings and confirm that the "From" email is a valid address.

   > \[!NOTE]
   >
   > If you enter an email address from some large inbox providers, Twilio displays a warning that you shouldn't use that email address. Messages from this domain might fail a DMARC check. To learn more about this warning, see the [DMARC page][].
5. Click **Create**.
6. Check the inbox of the email address in the **From Email Address** field.
7. Click the link in the email to verify the Sender address.

> \[!NOTE]
>
> If you configured an [authenticated domain][] in the Twilio SendGrid console and the domain of your sender email address matches that domain exactly, Twilio verifies your sender identity as a matter of course.

A page confirming the verification of your address displays.

## Resend a verification email

To resend the verification email, complete this procedure:

1. Log in to the [Twilio SendGrid console][] if needed.
2. Go to **Settings** > [**Sender Authentication**][].
3. Click ⋮ next to the desired email address to verify.
4. Select **Resend Verification**.
5. Twilio sends another confirmation email to the address you want to verify.

To add more addresses or make any changes to the address you just verified, click **Return to Single Sender Verification**.

[**Sender Authentication**]: https://app.sendgrid.com/settings/sender_auth

[**Create a Sender**]: https://app.sendgrid.com/settings/sender_auth/senders/new

[authenticated domain]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication

[DMARC page]: /docs/sendgrid/ui/sending-email/dmarc

[Twilio SendGrid console]: https://app.sendgrid.com/login

[identity]: /docs/sendgrid/for-developers/sending-email/sender-identity
