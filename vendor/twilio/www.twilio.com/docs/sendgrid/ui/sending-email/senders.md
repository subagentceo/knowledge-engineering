# Senders

US, Canadian, and EU regulations require specifying a sender for email messages. This identifies where each email message you send originates.

Before you can edit or use your sender identity email address to schedule a Single Send or set an Automation, you must verify that email address. If you have an [authenticated domain][] and your sender email address matches that domain exactly, Twilio verifies your sender identity.

## What makes email sender metadata important

Accurate and trustworthy sender metadata ensure the success of your campaigns and maintaining a positive sender reputation. To build trust with your recipients and the intermediate checkpoints like spam filters and ISPs, complete the following tasks as you add senders:

* Configure your `From` name and email address for your sender.
* Validate that your sender metadata complies with local, regional, and national email regulations in both the sender's and recipient's locations.
* Set up your company's address and contact details for transparency and trustworthiness.

## Add a sender

You may create up to 100 unique senders.

To add a Sender:

1. Log in to the Twilio SendGrid console.
2. Go to **Marketing** > **Senders**. The **Sender Management** page appears.
3. Click **Create New Sender**. The **Add a Sender** panel appears.
4. Complete the fields in the panel.

   | Field               | Expected value                                                                                                                                                                                    |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | **From name**       | The name of the person or organization you want to send the email message.                                                                                                                        |
   | **From email**      | The email address of the person or organization you want to send the email message.                                                                                                               |
   | **Reply to email**  | The email address of the person, organization, or role to which you want replies sent.                                                                                                            |
   | **Company address** | The physical location of the organization on whose behalf you're sending email messages. This includes the **Company Address Line 2**, **City**, **State**, **Zip Code**, and **Country** fields. |
   | **Nickname**        | A human-readable label that identifies this sender for your reference. Twilio doesn't display this field to recipients.                                                                           |
5. Click **Save**.
6. Check the inbox of the email address that you entered.
7. To verify the Sender email, click the link in the email.
8. If you need to resend the verification email, click the ⋮ menu then **Resend Verification**.

Once you schedule a Single Send or set an Automation, you can't delete the sender identity associated with that Single Send or Automation.

## Add sender metadata to your email

The Twilio SendGrid pre-built email templates come with an Unsubscribe module that contains your Sender metadata.

For templates or emails that you build, use the following tags insert your sender identity metadata into your campaign or template content:

| Tag                  | Content                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------- |
| `{{Sender_Name}}`    | The name that represents the sending organization.                                          |
| `{{Sender_Address}}` | The physical street address where the sending organization operates.                        |
| `{{Sender_City}}`    | The city of the physical street address where the sending organization operates.            |
| `{{Sender_State}}`   | The state or region of the physical street address where the sending organization operates. |
| `{{Sender_Zip}}`     | The postal code of the physical street address where the sending organization operates.     |
| `{{Sender_Country}}` | The country of the physical street address where the sending organization operates.         |

To add tags to your email:

## Design editor

1. Click the **Build** tab.
2. Drag a Text module into your campaign body.
3. Navigate to the **Tags** tab.
4. Select the copy icon next to the tag you want to add to your campaign.
5. Paste the tag into your text module.

## Copy editor

1. Click the gear icon on the left to open the **Settings** bar.
2. Click the **Tags** tab.
3. Select the copy icon next to the tag you want to add to your campaign.
4. Paste the tag into your text module.

> \[!NOTE]
>
> To show your company name and full address in the footer of your email, Twilio SendGrid recommends adding the following custom field tags:
>
> ```html {title="HTML code for custom field tags"}
> <div>{{Sender_Name}}</div>
> <div>{{Sender_Address}}</div>
> <div>{{Sender_City}}, {{Sender_State} {{Sender_Zip}}</div>
> <div><%asm_group_unsubscribe_url%> | <%asm_preferences_url%></div>
> ```
>
> When you add these tags correctly, they should render as HTML as follows:
>
> ```html {title="Rendered HTML code using Twilio's address"}
> <div>Twilio</div>
> <div>101 Spear St, 5th Fl</div>
> <div>San Francisco, CA 94105</div>
> <div>Unsubscribe from this list | Manage Email Preferences</div>
> ```

## Additional resources

* [How to set up domain authentication][]
* [Troubleshooting Sender Authentication][]
* [Custom Fields][]

[How to set up domain authentication]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication

[Troubleshooting Sender Authentication]: /docs/sendgrid/ui/account-and-settings/troubleshooting-sender-authentication

[Custom Fields]: /docs/sendgrid/ui/managing-contacts/custom-fields

[authenticated domain]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication
