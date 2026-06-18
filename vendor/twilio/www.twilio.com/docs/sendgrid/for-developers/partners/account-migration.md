# Migrating from a partner account

If you are setting up a new account directly with SendGrid but have previously had an account through one of our partners, there are several things to keep in mind:

* Stop sending mail until you migrate to a new account
* Make sure to export data from your old account
* Clean up the data described here, so you can import it into your new account.

## Before you begin

* Pause sending email on your old account.
* Login to app.sendgrid.com with your current SendGrid username and password.

## Update sender authentication

You cannot export and import sender authentication data - you need to set this up manually in your new account after you delete the current authentication records from your [DNS](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication#dns-and-domain-setup) provider.

If you have a domain, link, and IP authentication set up, remove 5 CNAME or MX/TXT records and 1 A record from your domain's DNS. To verify the records delete from your DNS, go to the [Sender Authentication page](https://app.sendgrid.com/settings/sender_auth) in the UI and check the DNS column:

![DNS records showing email1.sendgrid.com pending, url6913.sendgrid.com failed, IP 168.245.78.213 pending.](https://docs-resources.prod.twilio.com/2193f559e391a9ead52fdc46282a53e53e7088547f8a585714f555db09984525.jpg)

To set up sender authentication in your new account, check out [Setting up domain authentication](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication), [Setting up reverse DNS](/docs/sendgrid/ui/account-and-settings/how-to-set-up-link-branding), and [Setting up link branding](/docs/sendgrid/ui/account-and-settings/how-to-set-up-link-branding).

## Migrate unsubscribes

To download your unsubscribes, on the [Global unsubscribes page](https://app.sendgrid.com/suppressions/global_unsubscribes), select the action menu, and then click **Download a CSV**.

To set up your unsubscribes in your new account, copy them into the UI by going to [Global](https://app.sendgrid.com/suppressions/global_unsubscribes) or [Group](https://app.sendgrid.com/suppressions/group_unsubscribes) Unsubscribes page, selecting the action menu and then adding them to the list. You can add them with the API by using the [Suppressions methods](/docs/sendgrid/api-reference/suppressions-global-suppressions/add-recipient-addresses-to-the-global-suppression-group)

## Migrate templates

From the [Marketing Campaigns templates](https://sendgrid.com/marketing_campaigns/ui/marketing_templates) and the [Transactional templates](https://sendgrid.com/dynamic_templates) pages in the UI, export the HTML of any templates you want to migrate.

To add your templates in the new account, navigate to either the [Marketing Campaigns templates](https://sendgrid.com/marketing_campaigns/ui/marketing_templates) or the [Transactional templates](https://sendgrid.com/dynamic_templates) page in the UI, create a new template, select to [use the code editor](/docs/sendgrid/ui/sending-email/editor), and paste the HTML of the exported template into the editor.

## Migrate Marketing Campaigns Contacts

From the [Marketing Campaigns contacts](https://sendgrid.com/marketing_campaigns/ui/contacts) page, click into your [Global All Contacts](https://sendgrid.com/marketing_campaigns/ui/all_contacts) list. Then export a CSV of your contacts.

To upload your contacts into your new account, from the [Contacts page](https://sendgrid.com/marketing_campaigns/ui/contacts), click **Add contacts** and then *Upload CSV*.

## Review existing API keys

If you are using the SendGrid API, double-check your accounts [list of API keys](https://app.sendgrid.com/settings/api_keys). API keys are not exportable, but it's good to make sure that you're aware of all the existing API keys in your account so that you can create new ones to match in your new account and update your integrations with the new API keys.

## Delete teammates

Teammate names have to be unique across SendGrid, so if you want to continue to use your teammate name, delete it from your original account to add it to your new account.

## Create new subusers

If you are using subusers, navigate to the [subusers page](https://app.sendgrid.com/settings/subusers) in the UI and click **Export data** to download all the information on your current subusers.

To add subusers to your new account, go to the [subusers page](https://app.sendgrid.com/settings/subusers) in the UI, and click **Create a new subuser**. Use the data from the exported CSV to create a new subuser.

## Migrate dedicated IPs

If you are using a dedicated IP, our support team can migrate your dedicated IP for you. Access support contact options by logging into [https://support.sendgrid.com](https://support.sendgrid.com). Provide us with: your current and new usernames, the IP addresses, and your preferred time for the IP transfer - we can migrate IPs between 7 am and 5 pm MST on Monday through Friday.

Be sure to set up reverse DNS and rewarm up your transferred IP before you start sending on it in your new account. You also need to reassign it to subusers if needed.

## Download statistics and email activity

On all the statistics pages and on the email activity page, click **Export CSV** to download your statistics for your records. Your new account cannot import this data.
