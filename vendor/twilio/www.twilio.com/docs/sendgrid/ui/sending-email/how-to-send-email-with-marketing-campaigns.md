# Prepare your email Marketing Campaign

> \[!NOTE]
>
> These tutorials cover the latest version of Marketing Campaigns. If you're using the legacy version of Marketing Campaigns, your experience might differ. To send email with the Twilio SendGrid Email API, see the [API reference][] or the [SMTP Reference][].

[API reference]: /docs/sendgrid/api-reference

[SMTP Reference]: /docs/sendgrid/for-developers/sending-email/getting-started-smtp

To send your email messages as part of a marketing campaign, you need five components:

1. Schedule: A verified timezone that enables email send scheduling.
2. Sender: A verified sending email address that identifies the sender.
3. Notifications: One or more email address that receive email progress notifications.
4. Recipients: A list of contacts that receive email messages.
5. Opt out: A way recipients can choose not to receive email messages.

## Verify your time zone

To guarantee notifications and scheduled email messages get delivered at the right time, verify your time zone.

1. Log in to the Twilio SendGrid console.
2. Go to **Settings** > [**Account Details**][account].
3. Check the **Timezone** value under **Your Account**.\
   If it appears incorrect:
   1. Click ✎ (pencil).
   2. Choose a different time zone from the **Time Zone** dropdown menu.
   3. Click **Save**.

## Add a sender

US, Canadian, and EU regulations require specifying a [sender][] in Marketing Campaigns. This identifies where each email message you send originates.

If your email domain doesn't match one of your [authenticated][] domains, [verify the **From email** email address][verify]. Twilio sends a verification email message to this email address.

## Add notification recipients

Notifications get sent for each of the following activities:

* Account Marketing Campaigns activity
* CSV upload summaries
* Sender verifications
* List or segment exports

By default, Twilio SendGrid sends these notifications to the email address you signed up with on your parent account.

To add more email addresses for receiving email notifications, see [Notifications][]. You can add up to 10 email addresses.

## Add contacts

Email messages need a sender *and* recipients. Twilio calls potential recipients *contacts*. As you wouldn't add contacts to a message one at a time, collect contacts into groups called *lists*.

To add contacts to lists, choose from one of the following four methods:

* [**CSV Upload**][]
* [**Signup Forms**][]
* [**Manually Adding a Contact**][]
* [**Contact Management APIs**][]

## Add an unsubscribe group

To provide your recipients with an alternative to opting out of *all* email messages that you send, create an [Unsubscribe Group][]. This lets recipients choose the kinds of email that they don't want.

## Additional resources

* [Send messages with Email API][]
* [Campaign Statistics][]
* [Get started with Automation][]

## Next steps

* [Create an email design][]
* [Choose a message editor][]

[Choose a message editor]: /docs/sendgrid/ui/sending-email/editor

[Create an email design]: /docs/sendgrid/ui/sending-email/working-with-marketing-campaigns-email-designs

[**Contact Management APIs**]: /docs/sendgrid/api-reference/contacts

[**CSV Upload**]: /docs/sendgrid/ui/managing-contacts/create-and-manage-contacts/#upload-a-csv

[**Manually Adding a Contact**]: /docs/sendgrid/ui/managing-contacts/create-and-manage-contacts#add-manually

[**Signup Forms**]: /docs/sendgrid/ui/managing-contacts/create-and-manage-contacts#create-a-signup-form

[account]: https://app.sendgrid.com/settings/account

[authenticated]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication

[Campaign Statistics]: /docs/sendgrid/ui/analytics-and-reporting/marketing-campaigns-stats

[Get started with Automation]: /docs/sendgrid/ui/sending-email/getting-started-with-automation

[IP Pools]: /docs/sendgrid/ui/account-and-settings/ip-pools

[notifications]: /docs/sendgrid/ui/account-and-settings/notifications

[sender]: /docs/sendgrid/ui/sending-email/senders

[Send messages with Email API]: /docs/sendgrid/for-developers/sending-email/api-getting-started

[tag]: /docs/sendgrid/ui/sending-email/create-and-manage-unsubscribe-groups

[Unsubscribe Group]: /docs/sendgrid/ui/sending-email/create-and-manage-unsubscribe-groups#create-an-unsubscribe-group

[verify]: /docs/sendgrid/ui/sending-email/sender-verification
