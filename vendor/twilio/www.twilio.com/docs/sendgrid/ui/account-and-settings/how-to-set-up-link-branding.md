# How to set up link branding

Email link branding allows all click-tracked links and open-tracked images in your emails to originate from your domain instead of from `sendgrid.net`.

* To determine whether the email message looks trustworthy enough to deliver, spam filters and inbox providers look at the links within email messages.
* To determine whether filters and providers can trust the links, they use the [reputation score][ers] of the root domain.

Link labeling helps email deliverability as you don't rely on click tracking going through a domain that you don't control.

## Prerequisites

Setting up link branding requires changes to your DNS records. Before you proceed, do the following:

* Identify your domain provider.
* Confirm who has access or permission to change DNS records with your provider.
* Add a TLS certificate to the domain or subdomain that serves your links.
* To use EU-pinned domains or link branding, your account must be on the Email API Pro (or higher) plan or the Marketing Campaigns Advanced (or higher) plan. Learn more about [how to send Emails with Twilio SendGrid on EU servers][eu-email].

> \[!NOTE]
>
> When you [set up your domain authentication][domain-auth], you can also set up link branding.

## Set up link branding

To set up and verify link branding:

1. Log in to the Twilio SendGrid console.
2. Go to [**Settings** > **Sender Authentication**][sender-auth]. The **Sender Authentication** page appears.
3. Go to **Link Branding** section, click **Brand Your Links**. The **Brand Your Links** page appears.
4. From the **Which Domain Name Server (DNS) host do you use?** dropdown menu, select your domain service provider.
5. Click **Next**. The **Create a Branded Link** page appears.
6. Type the domain from which you plan to send email messages in the **Domain You Send From** box.
   * Type the domain that you want your links and images to use in this box.
   * Only enter the name of your root domain and not a specific hostname like `www` or `http://www`. - This domain must match the domain of your from address on the emails you sending.
     For example: To brand with the domain `example.sendgrid.com`, set the link branding domain to be `sendgrid.com`.
7. Click **Advanced Settings**.
   * To create a custom subdomain:
     1. Select **Use a custom link subdomain**. The **Return Path** box appears.
     2. Type the label for your custom domain into this box. If you don't provide a label, Twilio SendGrid creates one for you.
   * To assign this link branding to a subuser:
     1. Select **Assign to a subuser**. The **Subuser** dropdown menu appears.
     2. Select a subuser from the menu.
   * To limit your domain to the European Union, check **Make link EU-pinned**.
     * EU email subusers must pin their domain to the EU region.
8. Click **Next**. The **Install DNS Records** page appears.
9. Add all the [Canonical Name (CNAME)][cname] records on this screen to your [DNS][] host.
10. The **Manual Setup** tab displays the DNS records for your DNS host provider.
    * This table includes two pairs of CNAME records: the CNAME hostname in the **Host** column and the domain to which that CNAME must point in the **Points To** column.
    * If you want to set a custom subdomain for the first of these records, return to the **Create a Branded Link** page and add a custom link subdomain.
11. To add the records displayed, follow the instructions for your DNS provider.
12. After adding the DNS records to your domain, return to the Twilio SendGrid console.
13. Select **I've added these records**.
14. Click **Verify**.
    * If verification succeeded, you should see the records.
    * If only Twilio SendGrid verified half of your records, wait. It's also possible that you entered one of your records incorrectly.
    * If you need help, see [Troubleshooting Sender Authentication][sender-auth-ts].
15. Any time that you send an email with a `from` address where the domain matches your branded link domain, Twilio SendGrid applies that domain to your email. If you want to update the domain from which you send email, update your branded link.

Links and images in your email messages appear to originate from your custom domain. To update the domain that appears in the links in your email, update your link branding.

> \[!NOTE]
>
> DNS verification can take up to 48 hours after upload. To find if verification completed, to the [Sender authentication page][] and click **Verify**.
>
> If you click verify, and only half of your CNAME records verify, this usually means that you need to wait a bit longer. It's also possible that you entered one of your records in incorrectly. To get additional help troubleshooting, see [Sender authentication troubleshooting][sender-auth-ts].

## Domain provider considerations

### GoDaddy

GoDaddy appends your domain to added DNS records. This results in a CNAME record incompatible with link branding.

**For example**: If you entered `url1234.example.com` as a CNAME entry, GoDaddy would store this value as `url1234.example.com.example.com`.

To match the expected result given in the previous example, change your CNAME values to resemble the following entries:

| Hostname that Twilio SendGrid expects | Enter GoDaddy DNS CNAME value as |
| ------------------------------------- | -------------------------------- |
| `url1234.example.com`                 | `url1234`                        |
| `1234567.example.com`                 | `1234567`                        |

Don't change the value for the **Points to** field.

### CloudFlare

When configuring CNAME records in CloudFlare, set **CNAME Flattening** to **Flatten CNAME at root** on **DNS settings** page.

## Migrating from legacy link branding

You can't change any branded link created before 2015. To change or update it, delete the branded link and recreate it using an [authenticated domain][domain-auth].

## Additional resources

* [How to set up domain authentication][domain-auth]
* [How to set up reverse DNS][]
* [Troubleshooting][sender-auth-ts]

[cname]: /docs/sendgrid/glossary/cname

[dns]: /docs/sendgrid/glossary/dns

[How to set up reverse DNS]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-reverse-dns

[Sender authentication page]: https://app.sendgrid.com/settings/sender_auth

[sender-auth]: https://app.sendgrid.com/settings/sender_auth

[domain-auth]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication

[eu-email]: https://www.twilio.com/en-us/blog/send-emails-in-eu

[sender-auth-ts]: /docs/sendgrid/ui/account-and-settings/troubleshooting-sender-authentication

[ers]: /docs/sendgrid/glossary/email-reputation-score
