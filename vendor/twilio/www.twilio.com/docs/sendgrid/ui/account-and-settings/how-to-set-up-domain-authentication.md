# Configure domain authentication

When configuring your Twilio SendGrid account, set up domain authentication. Domain authentication verifies the legitimacy of your email servers, messages, and sending addresses.
To configure authentication, you add specific [Domain Name System (DNS)][dns] resource records to your domain.

After you add these DNS records on your domain, these records make the following assertions on behalf of your domain:

1. You own the domain that sent the email message.
2. You permitted the sending email server to send email on behalf of the domain.
3. You verified the identity of the email sender.
4. You validated that no one tampered with the email message in transit.

#### If you don't understand DNS, click to view DNS concepts

To determine which hostnames in a domain point to which IP addresses, the DNS checks each domain's records.

**For example**: DNS translates the hostname for an email server that humans can remember, like `email.example.com`, to an IP address.

## Types of DNS resource records

DNS manages different types of *resource records*. Each domain must include at least one of these records.

| Type                                                                                              | Description             | Defining RFC        | Function                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------- | ----------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `A`                                                                                               | IPv4 address            | [RFC 1035][rfc1035] | Returns a 32-bit IPv4 address.                                                                                                                                                                                                     |
| `AAAA`                                                                                            | IPv6 address            | [RFC 3596][rfc3596] | Returns a 128-bit IPv6 address.                                                                                                                                                                                                    |
| `CNAME`                                                                                           | [Canonical Name][cname] | [RFC 1035][rfc1035] | Stores an alias of one domain pointing to another domain.                                                                                                                                                                          |
| `MX`                                                                                              | [Mail Exchange][mx]     | [RFC 1035][rfc1035] | Lists the servers that accept email for the domain.                                                                                                                                                                                |
| `TXT`                                                                                             | [Arbitrary Text][txt]   | [RFC 1035][rfc1035] | Stores data for [*Sender Policy Framework* (SPF)][p-spf],<br />[*DomainKeys Identified Mail* (DKIM)][p-dkim],<br />[*Domain-based Message Authentication, Reporting & Conformance* (DMARC)][p-dmarc], and other text-based values. |
| Your DNS provider manages your DNS records so you can set and remove DNS entries for your domain. |                         |                     |                                                                                                                                                                                                                                    |

To learn more, see the [Guide to Understanding DNS Record Types][dns-record-types].

## Email authentication using DNS

Authenticating email through DNS uses three types of authentication: SPF, DKIM, and DMARC. Each authentication method gets stored as a separate DNS `TXT` record:

| Auth type | TXT record contents                          | Purpose                                                                                                                                                                                               |
| --------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [SPF][]   | List of IP addresses                         | Limits which IP addresses can send email of behalf of your domain. The receiving email server compares the email sending server IP address to the IP address list stored in the SPF record.           |
| [DKIM][]  | Encryption key and algorithms                | Provides the public encryption key that can create a comparison signature based on the message content. The receiving email server compares its generated signature to the one in the message header. |
| [DMARC][] | Policy to apply to messages that fail checks | Instructs the receiving email server how to handle email messages that don't pass SPF, DKIM, or DMARC checks.                                                                                         |

## DNS resource records that Twilio SendGrid generates

To configure your domain to support authentication, Twilio SendGrid generates four DNS resource records. These four records point to where receiving email servers can check for [SPF][], [DKIM][], and [DMARC][] values. The records generated depend upon your automated security setting.

* If you turn on automated security, Twilio creates and maintains SPF, DKIM, and DMARC records on your behalf. If your DNS provider doesn't accept underscores in `CNAME` records, you can't use **Automated Security**. By default, Twilio SendGrid turns on automated security.
* If you turn off automated security, Twilio provides values for your `MX` server and the [SPF][], [DKIM][], and [DMARC][] values. This then becomes your responsibility to enter those values into your DNS server and change them when needed.

To understand the specific values that Automated Security generated based on your choice, click the related tab that follows:

## Automated security ON

If you turned on **Use automated security**, the first step on the **Install DNS Records** page displays four DNS resource records.

* One `CNAME` record that points mail from your branded URL to the Twilio SendGrid email service and supports SPF and DKIM.
  * Twilio SendGrid can create and update your SPF and DKIM records on your behalf.
  * **Example**: If you purchase a dedicated IP address, Twilio SendGrid adds that IP address to your SPF record to your domain.
* Two `CNAME` records that point servers that support [link branding][link-branding].
  * To route click and open tracking statistics to your Twilio SendGrid account, Twilio SendGrid requires this `CNAME` record.
* One `TXT` record that provides the DMARC record.

#### View an example of DNS records created with automated security ON

| Type    | Host                        | Value                                           | Purpose   |
| ------- | --------------------------- | ----------------------------------------------- | --------- |
| `CNAME` | `em[0000].example.com`      | `[u00000000].[wl000].sendgrid.net`              | [SPF][]   |
| `CNAME` | `s1._domainkey.example.com` | `s1.domainkey.[u00000000].[wl000].sendgrid.net` | [DKIM][]  |
| `CNAME` | `s2._domainkey.example.com` | `s2.domainkey.[u00000000].[wl000].sendgrid.net` | [DKIM][]  |
| `TXT`   | `_dmarc.example.com`        | `v=DMARC1; p=none;`                             | [DMARC][] |

## Automated security OFF

If you turned off **Use automated security**, the first step on the **Install DNS Records** page displays four DNS resource records.

* One `MX` record that redirects mail from your branded URL to the Twilio SendGrid email service.
  * This record creates a [`return-path`][return-path] email header that contains an email address separate from your original sending address.
  * The `return-path` address tells email servers where to send feedback such as delayed bounces and unsubscribes.
* Three `TXT` records that provide the SPF, DKIM, and DMARC records.
  * These records provide the values for your DKIM, SPF, and DMARC configurations.
  * Add these Twilio SendGrid-generated `TXT` records to your domain.
  * Whenever you change to your email configuration, you need to update the `TXT` records on your domain
  * **Example**: When you add an IP address to your account, update your SPF `TXT` record with the IP address to prevent email delivery issues.

#### View an example of DNS records created with automated security OFF

| Type  | Host                        | Value                              | Purpose     |
| ----- | --------------------------- | ---------------------------------- | ----------- |
| `MX`  | `em[0000].example.com`      | `mx.sendgrid.net.`                 | \[Email]\[] |
| `TXT` | `em[0000].example.com`      | `v=spf1 include:sendgrid.net ~all` | [SPF][]     |
| `TXT` | `m1._domainkey.example.com` | `k=rsa; t=s; p=MIG...`             | [DKIM][]    |
| `TXT` | `_dmarc.example.com`        | `v=DMARC1; p=none;`                | [DMARC][]   |

## Set up domain authentication

Twilio SendGrid integrates domain authentication into its domain setup procedure. Domain authentication offers the following benefits:

* It removes tagline `via sendgrid.net` (or `via eu.sendgrid.net` for Regional customers) after the *from* address in your email messages.
* It improves the trust in the legitimacy of your messages for both receiving email servers and human recipients. This improves your chance of reaching an inbox instead of a spam folder.

> \[!NOTE]
>
> Each user may have a maximum of 3,000 authenticated domains and 3,000 link brandings. The limit applies to each individual *user* and *subuser*: each Subuser belonging to a parent account may have its own 3,000 authenticated domains and 3,000 link brandings.

### Complete the prerequisites

Domain authentication requires changes to your DNS records. Complete the following activities before continuing with this tutorial:

* Identify your domain provider.
* Confirm who has access or permission to change DNS records with your provider.
* To use EU-pinned domains or link branding, your account must be on the Email API Pro (or higher) plan or the Marketing Campaigns Advanced (or higher) plan. Learn more about [how to send Emails with Twilio SendGrid on EU servers][eu-email].

### Choose your setup option

Twilio offers two options for domain authentication from the [**Sender Authentication**][sender-auth] page:

## Automated Setup

Have Twilio SendGrid configure it for you.
Twilio SendGrid supports [Domain Connect][] with [GoDaddy][]. Before starting this procedure, log in to your GoDaddy account and permit Twilio SendGrid to configure your DNS changes.

> \[!NOTE]
>
> Twilio SendGrid only supports automated setup under three conditions:
>
> 1. GoDaddy hosts the domains.
> 2. You left automated security turned on.
> 3. You're not using Link Branding.

1. In the Twilio SendGrid console, select **Settings** > [**Sender Authentication**][sender-auth].
2. In the **Domain Authentication** section, click **Get Started**. The **Authenticate Your Domain** page appears.
3. From the **Authenticate Your Domain** page, select your DNS host from the **Which Domain Name Server (DNS) host do you use?** dropdown.
   You can select **I'm not sure** or **Other Host (Not Listed)** if necessary.
4. To use branded links, toggle **Would you also like to brand the links for this domain?** to **Yes**.

   If you choose **No**, you can add Link Branding later.

   To learn more about link branding, see [How to Set up Link Branding][link-branding].
5. Click **Next**.
6. In the **Domain You Send From** box, type the domain you want to authenticate.

   * This domain would appear in the *from* address of your messages.
   * Type only your root domain `<domain-name.top-level-domain>`.
   * Omit any subdomains or protocols like `www` or `http://www`.
   * You can only send email messages from this domain specified. Subdomains don't inherit authentication permissions from their parent domain.

   **For example**: To send messages from addresses like `orders@example.com`, type `example.com`.
7. Click [**Advanced Settings**](#advanced-settings).
   1. Check [**Use automated security**][use-automated-security].
      * Leave **Use automated security** checked.
      * When checked, Twilio SendGrid handles the signing of your DKIM and the authentication of your SPF with `CNAME` records.
   2. If you want to override the return path, check [**Use custom return path**][use-a-custom-return-path].
      * This `return-path` informs receiving email servers where to route delayed bounces and unsubscribes.
      * The **Return Path** box appears.
      * Type a custom domain into the **Return Path** box.
   3. If another service uses a DKIM selector of `s`, check [**Use a custom DKIM selector**][use-a-custom-dkim-selector].
      * The **DKIM Selector** box appears.
      * Type a set of three characters in this box.
   4. If you need to limit your domain to the European Union, check **Make domain EU-pinned**.
      * Regional email users must pin their domain to the EU region.
8. Select the **Advanced Settings** appropriate for your needs.
9. Click **Next**. The **Install DNS Records** page appears.
10. If Twilio SendGrid can finish the Domain Authentication process, the **Automatic Setup** tab appears.
    * If not, the **Manual Setup** tab appears.

[sender-auth]: https://app.sendgrid.com/settings/sender_auth

[link-branding]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-link-branding

[use-automated-security]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication#use-automated-security

[use-a-custom-return-path]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication#use-a-custom-return-path

[use-a-custom-dkim-selector]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication#use-a-custom-dkim-selector

11. From the **Automated Setup** tab, click **Connect**.
12. A modal titled **Connect GoDaddy to Twilio SendGrid for this domain** appears.
13. Log in to your GoDaddy account and connect to your domain.
14. Twilio SendGrid tries to verify your DNS records.
    * If GoDaddy verification succeeds, the modal closes. The Twilio SendGrid console displays a success message.
    * If GoDaddy verification fails, close this modal.
      * Click **Verify** again in 48 hours. DNS changes can take up to 48 hours to apply.
      * If Domain Authentication hasn't been verified after 48 hours, contact [Twilio SendGrid support][sg-support].

## Manual Setup

Configure the changes yourself.

1. In the Twilio SendGrid console, select **Settings** > [**Sender Authentication**][sender-auth].
2. In the **Domain Authentication** section, click **Get Started**. The **Authenticate Your Domain** page appears.
3. From the **Authenticate Your Domain** page, select your DNS host from the **Which Domain Name Server (DNS) host do you use?** dropdown.
   You can select **I'm not sure** or **Other Host (Not Listed)** if necessary.
4. To use branded links, toggle **Would you also like to brand the links for this domain?** to **Yes**.

   If you choose **No**, you can add Link Branding later.

   To learn more about link branding, see [How to Set up Link Branding][link-branding].
5. Click **Next**.
6. In the **Domain You Send From** box, type the domain you want to authenticate.

   * This domain would appear in the *from* address of your messages.
   * Type only your root domain `<domain-name.top-level-domain>`.
   * Omit any subdomains or protocols like `www` or `http://www`.
   * You can only send email messages from this domain specified. Subdomains don't inherit authentication permissions from their parent domain.

   **For example**: To send messages from addresses like `orders@example.com`, type `example.com`.
7. Click [**Advanced Settings**](#advanced-settings).
   1. Check [**Use automated security**][use-automated-security].
      * Leave **Use automated security** checked.
      * When checked, Twilio SendGrid handles the signing of your DKIM and the authentication of your SPF with `CNAME` records.
   2. If you want to override the return path, check [**Use custom return path**][use-a-custom-return-path].
      * This `return-path` informs receiving email servers where to route delayed bounces and unsubscribes.
      * The **Return Path** box appears.
      * Type a custom domain into the **Return Path** box.
   3. If another service uses a DKIM selector of `s`, check [**Use a custom DKIM selector**][use-a-custom-dkim-selector].
      * The **DKIM Selector** box appears.
      * Type a set of three characters in this box.
   4. If you need to limit your domain to the European Union, check **Make domain EU-pinned**.
      * Regional email users must pin their domain to the EU region.
8. Select the **Advanced Settings** appropriate for your needs.
9. Click **Next**. The **Install DNS Records** page appears.
10. If Twilio SendGrid can finish the Domain Authentication process, the **Automatic Setup** tab appears.
    * If not, the **Manual Setup** tab appears.

[sender-auth]: https://app.sendgrid.com/settings/sender_auth

[link-branding]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-link-branding

[use-automated-security]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication#use-automated-security

[use-a-custom-return-path]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication#use-a-custom-return-path

[use-a-custom-dkim-selector]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication#use-a-custom-dkim-selector

11. The **Manual Setup** tab displays the [DNS records for your DNS host provider][sg-dns].
    * If you turned on **Use automated security**, the first step on the **Install DNS Records** page displays four DNS resource records:
      * One `CNAME` record that points mail from your branded URL to the Twilio SendGrid email service.
      * Two `CNAME` records that point to support [link branding][link-branding].
      * One `TXT` record that provides the DMARC record.
    * If you turned off **Use automated security**, the first step on the **Install DNS Records** page displays four DNS resource records:
      * One `MX` record that redirects mail from your branded URL to the Twilio SendGrid email service.
      * Three `TXT` records that provide the SPF, DKIM, and DMARC records.
12. To add the records displayed, follow the instructions for your DNS provider.
13. After adding the DNS records to your domain, return to the Twilio SendGrid console and click **Verify**.
    * DNS verification can take *up to 48 hours after upload*. To find if verification completed, return to this page.
    * If verification succeeded, you should see the records.
    * If only Twilio SendGrid verified half of your records, wait. It's also possible that you entered one of your records incorrectly.
    * If you need help, see [Troubleshooting Sender Authentication][sender-auth-ts].
14. Any time that you send an email with a `from` address where the domain matches your authenticated domain, Twilio SendGrid applies that domain to your email. If you want to update the domain from which you send email, update your Domain Authentication.

> \[!WARNING]
>
> Major DNS providers like GoDaddy, Amazon Route 53, and Namecheap append your domain to any DNS records you add. Consider this scenario:
>
> 1. Twilio SendGrid gives you a `CNAME` value of `em123.example.com`.
> 2. You enter this value as a `CNAME` value in your DNS provider.
> 3. The provider appends your domain, `example.com`, to your `CNAME` value.
> 4. The provider stores a DNS `CNAME` record of `em123.example.com.example.com`.
>
> *This `CNAME` entry fails verification.*
>
> If you see this incorrect `CNAME` value, type only the *hostname* value into your DNS provider `CNAME` field. In this example, the host value is `em123`. The DNS provider should store this as a DNS `CNAME` record of `em123.example.com`.

## Advanced settings

During domain authentication setup, the second **Authenticate Your Domain** page includes a dropdown menu labeled **Advanced Settings**. The following section explains each of these settings.

### Use automated security

*Automated security* differs from *automatic setup*.

Automated security defaults to **On**.

If your DNS provider doesn't accept underscores in `CNAME` records, turn off **Automated Security**.

* When turned *on*, automated security provides the following features:
  * Twilio SendGrid can manage the signing of your DKIM and the authentication of your SPF with `CNAME` records.
  * You can add a dedicated IP address or update your account updating your DNS records.
* When turned *off*, you accept responsibility for the following tasks:
  * Adding the generated `MX` and `TXT` records.
  * Making any changes to these records when needed.

To learn more about how this works, see [Twilio SendGrid DNS records][sg-dns].

### Use a custom return path

When you configure domain authentication, Twilio SendGrid creates a subdomain for your domain to handle bounce and unsubscribe notices. This subdomain consists of four random alphanumeric characters. Receiving email servers then send bounce and unsubscribe notices to an email address with that subdomain and your domain.

If you require a specific label for this subdomain, build a custom `return-path`:

1. Select **Use a custom return path**.
2. Type alphanumeric characters for your preferred subdomain.

The **Install DNS Records** page displays your chosen subdomain as a `CNAME` record pointing to `sendgrid.net`.

> \[!WARNING]
>
> If your custom return path `CNAME` record matches an existing DNS `CNAME` record, your added record overwrites the existing record. This impacts existing DNS resolution. Before adding `CNAME` records, check the existing DNS `CNAME` records on your domain.

### Use a custom link subdomain

When you configure [link branding][link-branding], Twilio SendGrid generates subdomains for the domain that handle link traffic. This subdomain consists of random alphanumeric characters. Your email message that include links point to this subdomain instead of `sendgrid.net`.

If you require a specific label for this subdomain, build a custom link subdomain:

1. Select **Use a custom link subdomain**.
2. Type alphanumeric characters for your preferred subdomain.

The **Install DNS Records** page displays your chosen subdomain as a `CNAME` record pointing to `sendgrid.net`.

> \[!WARNING]
>
> If your custom return path `CNAME` record matches an existing DNS `CNAME` record, your added record overwrites the existing record. This impacts existing DNS resolution. Before adding `CNAME` records, check the existing DNS `CNAME` records on your domain.

### Use a custom DKIM selector

You might set a custom DKIM selector for one of two reasons:

1. You want to authenticate a single domain multiple times.
2. Another service uses the Twilio SendGrid DKIM selector, `s`.

To set a custom DKIM selector, add the custom selector to the domain as a custom subdomain.

1. Select **Use a custom DKIM selector**.
2. Type three letters or numbers that create a custom subdomain.
   * If you don't provide your own subdomain, Twilio SendGrid creates one for you.
   * Type three characters different from your original selection.
     **For example**: you could use `org` or `001`.

## Migrate from legacy domain authentication

You can't change any domains authenticated before 2015. To change such a domain, delete it, then recreate it as an authenticated domain.

## Additional resources

* [Troubleshooting Sender Authentication][sender-auth-ts]
* [How to set up link branding][link-branding]
* [How to set up reverse DNS][reverse-dns]
* [Configuring Sign in with Apple][apple-signin]

[apple-signin]: /docs/sendgrid/ui/account-and-settings/configuring-sign-in-with-apple

[cname]: /docs/sendgrid/glossary/cname

[dmarc]: /docs/sendgrid/ui/sending-email/dmarc

[dns-record-types]: https://dnsmadeeasy.com/resources/guide-to-understanding-dns-record-types

[dns]: /docs/sendgrid/glossary/dns

[Domain Connect]: https://www.domainconnect.org

[eu-email]: https://www.twilio.com/en-us/blog/send-emails-in-eu

[GoDaddy]: https://www.godaddy.com

[link-branding]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-link-branding

[mx]: /docs/sendgrid/glossary/mx-record

[p-dkim]: #DKIM

[p-dmarc]: #DMARC

[p-spf]: #SPF

[return-path]: https://www.twilio.com/en-us/blog/insights/what-is-return-path

[reverse-dns]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-reverse-dns

[rfc1035]: https://datatracker.ietf.org/doc/html/rfc1035

[rfc3596]: https://datatracker.ietf.org/doc/html/rfc3596

[sender-auth-ts]: /docs/sendgrid/ui/account-and-settings/troubleshooting-sender-authentication

[sender-auth]: https://app.sendgrid.com/settings/sender_auth

[sg-dns]: #dns-resource-records-that-twilio-sendgrid-generates

[sg-support]: https://support.sendgrid.com/hc/en-us

[txt]: https://en.wikipedia.org/wiki/TXT_record

[spf]: /docs/sendgrid/ui/sending-email/verify-sender-with-spf

[dkim]: /docs/sendgrid/ui/account-and-settings/dkim-records
