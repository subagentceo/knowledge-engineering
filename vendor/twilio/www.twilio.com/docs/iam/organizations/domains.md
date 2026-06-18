# Domains

To invite your employees to the organization with their company email addresses, associate your organization with one or more internet domains that you own. Domain association also lets you treat ownership of one of your company email addresses as a sign of trust.

Before you can add a domain with your organization, you must verify that you own it. Twilio Console's [**Domains**](https://1console.twilio.com/organization/settings/domains/list) page lists both any added domains and those undergoing verification. By default, Twilio limits each organization to 100 domains. To increase this limit, contact [support][].

## Add a domain

To associate your organization with a specific domain:

> \[!WARNING]
>
> Common domains like Gmail or Hotmail can't be verified in Twilio's organizations. You can't invite users to an organization with an unverified domain.

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to the [**Domains**](https://1console.twilio.com/organization/settings/domains/list) page.
2. Click **Add Domain**.
3. On the **Add Domain** page, enter your company's domain name.
4. On the **Choose verification method** page, select a verification method: **DNS**, **HTTPS**, **I am not sure which option to use**.

### DNS

The **Verify your domain using the DNS method** section appears with a `twilio-domain-verification=` followed by 32-hexadecimal digits.

1. Copy the `twilio-domain-verification=` value.
2. Go to your [DNS][] provider.
3. Following your DNS provider instructions, create a DNS record with the following values:

   | Parameter | Value                                                    |
   | --------- | -------------------------------------------------------- |
   | Type      | `TXT`                                                    |
   | Name      | `_twilio`                                                |
   | Value     | `twilio-domain-verification=<32-hexadecimal-characters>` |
   | TTL       | `3600`                                                   |
4. Click **Check verification**.

After you click the button, Twilio checks your DNS record. DNS propagation can take up to 72 hours. Twilio might not mark your domain as verified straight away.

### HTTPS

The **Verify your domain using the HTML method** section appears.

1. Click **Download HTML file**. The verification file downloads to your computer.
2. Upload the verification file to the root public directory of your website.\
   To check for the file after uploading, click the link displayed on the **Verify Domain** page.
3. Click **Check verification**.

After you click the button, Twilio checks your uploaded file.

### I am not sure which option to use

The **Verify your domain through your IT Team** section appears.

1. Copy the email message displayed.
2. Paste the email message into your email client.
3. Send the message to your IT team. The message notes that you can provide an HTML file.\
   If your IT team requests that file, follow the directions in the **HTTPS** tab.
4. Click **Check verification**.

## Legacy Console

1. Log in to the [Twilio Admin Console][].
2. Click [**Domains**][].
3. Click **Add Domain**. The **Verify Domain** page appears.
4. In **Step 1: Add Domain**, enter your company's domain name.
5. Click **Save & continue**. The **Step 2: Verify Domain** section appears.
6. Choose a domain verification method: **DNS**, **HTTPS**, or **I am not sure which option to use**.

### DNS

1. Click **Save & continue**. The **Step 3: Verify your domain using the DNS method** section appears with a `twilio-domain-verification=` followed by 32-hexadecimal digits.
2. Click the copy button for this value.
3. Go to your [DNS][] provider.
4. Following your DNS provider instructions, create a DNS record with the following values:

   | Parameter | Value                                                    |
   | --------- | -------------------------------------------------------- |
   | Type      | `TXT`                                                    |
   | Name      | `_twilio`                                                |
   | Value     | `twilio-domain-verification=<32-hexadecimal-characters>` |
   | TTL       | `3600`                                                   |
5. Click **Verify domain**.

After you click the button, Twilio checks your DNS record. DNS propagation can take up to 72 hours. Twilio might not mark your domain as verified straight away.

### HTTPS

1. Click **Save & continue**. The **Step 3: Verify your domain using the HTML method** section appears.
2. Click **Download HTML file**. The verification file downloads to your computer.
3. Upload the verification file to the root public directory of your website.\
   To check for the file after uploading, click the link displayed on **Verify Domain** page.
4. Click **Verify domain**.

After you click the button, Twilio checks your uploaded file.

### I am not sure which option to use

1. Click **Save & continue**. The **Step 3: Verify your domain through your IT Team** section appears.
2. Copy the email message displayed.
3. Paste the email message into your email client.
4. Send the message to your IT team. The message notes that you can provide an HTML file.\
   If your IT team requests that file, follow the directions in the **HTTPS** tab.
5. Click **Verify domain**.

## Confirm continued ownership

To confirm your continued ownership, Twilio re-checks the file upload or DNS data every 24 hours.

* If the token gets altered or removed, an organization's Owner or Administrator has 30 days to re-validate the domain before Twilio deletes it from the organization.
* Until Twilio re-validates the domain, you can't add users that use email addresses from that domain.
* If your domain remains unvalidated for more than 30 days, Twilio removes any managed users added to the organization. After validating the domain, add the managed users back to the organization.

## Delete a domain

To remove a domain from your organization:

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to the [**Domains**](https://1console.twilio.com/organization/settings/domains/list) page.
2. Click `⋮` (action menu) and click **Delete** for the domain you want to delete.
3. Check all acknowledgment boxes and click **Delete**.

## Legacy Console

1. Log in to the [Twilio Admin Console][].
2. Click [**Domains**][].
3. Click **Delete Domain** under the **Actions** column for the domain you want to delete.

## Verify a domain in more than one organization

In some situations, organizations might keep different business units as separate Twilio organizations. To enable these units to access organization-level functionalities, Twilio allows more than one Twilio organization to verify the same internet domain. Twilio calls a domain a *multi-verified domain*.

Organizations with a multi-verified domain can:

1. Verify the same domain in more than one organization. Up to 20 organizations can use the same domain.
2. Manage users and respective accounts in each Twilio organization without dependencies from other organizations with the same domain.
3. Enforce single sign-on for their specific set of users.

Organizations with multi-verified domain can't:

1. Apply the organization settings with get users to auto-join or join through invitation only settings.
2. Bulk import users without invitation.

Only one organization at a time can manage a user or account.

When one organization verifies the previously verified domain, Twilio notifies all organizations and disables the previous functionalities. If you want to verify your company's internet domain in more than one organization, contact [support][].

## User Import

To learn how to bulk import existing Twilio users from your verified domain into your organization, see [Import Users][].

[**Domains**]: https://www.twilio.com/console/admin/domains

[Import Users]: /docs/iam/organizations/managed-users#import-users

[support]: https://www.twilio.com/console/support/tickets/create

[Twilio Admin Console]: https://admin.twilio.com

[TXT]: https://en.wikipedia.org/wiki/TXT_record

[dns]: /docs/sendgrid/glossary/dns
