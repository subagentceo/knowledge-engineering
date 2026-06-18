# Dedicated IP addresses

## Overview

Twilio SendGrid can send emails from a shared pool of Internet Protocol (IP) addresses or from an IP address only your account can use. Twilio calls this a *dedicated* IP address. An IP address identifies the network address of a server using a unique numerical designation.

### Why you need dedicated IP addresses

#### Prevent messages flagged as spam

Once inbox providers start receiving your messages, they evaluate the legitimacy of the sending IP address. Part of how they determine this measure depends on the amount of messages that provider receives over time. If you send one million messages from an IP address unknown to an inbox provider risks having your messages treated as spam and blocked.

Trial and Essentials customers of Twilio SendGrid send their messages from groups of shared IP addresses. Twilio SendGrid groups your account with senders of similar reputation and deliverability. These shared IP addresses can change without notice if your reputation changes or if Twilio can improve deliverability through changes to the IP groups. If anyone who shares that IP address violates the inbox provider's reputation standards, your reputation changes as well and your messages throttled or blocked.

Twilio sets your daily message limits based on this [Reputation Score][rep-score].

With a dedicated IP address, *your* sending practices determine your Reputation Score.

#### Comply with European Union regulations

To send outbound emails in the European Union (EU), you need dedicated IP addresses based in the EU for [subusers pinned to the EU][eu-pinned-users].

[rep-score]: https://help.twilio.com/articles/10301756860571

[eu-pinned-users]: https://www.twilio.com/en-us/blog/send-emails-in-eu

### How many dedicated IP addresses do you need

* When your volume reaches 250,000 messages each month, allocate a minimum of two dedicated IP addresses.\
  Use one for your marketing email and another for your transactional emails.
* To preserve your reputation, allocate one dedicated IP address for every three to four million messages sent each day.
* To improve deliverability, you can group multiple dedicated IP addresses into [IP Pools][]. IP Pools require [linking a domain to your dedicated IP address][link-domain].

[link-domain]: #link-a-domain-to-your-dedicated-ip-address

For specific recommendations on the number of dedicated IP addresses, see this fact sheet on [IP allocation based on volume][warmup-schedule].

[IP Pools]: /docs/sendgrid/ui/account-and-settings/ip-pools

[warmup-schedule]: https://docs-resources.prod.twilio.com/documents/Generic_IP_Warmup_Schedule.pdf

## Acquire dedicated IP addresses

### Check the included dedicated IP address

Twilio allocates one dedicated IP address with the [Pro Email API][pro-plan] and [Advanced Marketing Campaigns][amc-plan] plans. To view any dedicated IP addresses attached to your account, open the Twilio SendGrid [Console](https://app.sendgrid.com/settings/ip_addresses).

[pro-plan]: https://sendgrid.com/en-us/pricing?tab=1_1

[amc-plan]: https://sendgrid.com/en-us/pricing?tab=1_2

### Purchase more dedicated IP addresses

With these paid plans, you can purchase more dedicated IP addresses.

* Each purchase allows you to allocate one more dedicated IP address for your account.
* Purchasing a dedicated IP address requires **Billing** or **Admin** permissions in the Twilio SendGrid console.
* Each additional dedicated IP address incurs an additional monthly charge.
* Using the Console, you may add one IP address to your account per month.
* To add more than one IP address per month, contact [Twilio SendGrid support][sg-support].

[sg-support]: https://support.sendgrid.com/hc/en-us/requests/new

## Allocate dedicated IP addresses

Once you purchase another dedicated IP address, you can add it to your account.

1. Go to **Settings** > **IP Addresses**.
   This page lists your dedicated IP addresses. IPs in warmup include a **warmup** label.
2. Click **Add an IP Address**.\
   The **Dedicated IP Address** page displays.
3. Select the region of IP addresses you would like to purchase.
   * When purchasing IP addresses to associate with EU subusers, select **EU** for this option.
   * You can only assign EU-region IP addresses to EU-region subusers.
4. In the **Additional Options**, choose from the following options.
   * **Use automated IP warmup**: SendGrid increases the amount of email sent over this IP address.
     * Best practices recommend [warming an IP address](/docs/sendgrid/concepts/reputation/warm-up-ip-addresses) over time before sending using that IP address.
     * When using automated warmup, you need at least one other warm IP address. This other IP address handles the overflow traffic from the IP address warming up.
   * **Allow my parent account to send mail using these IP addresses**: Your parent account can send over this IP. If you assign this IP to a subuser and want to allow only that subuser to send on this IP, clear this box.
   * **Allow my subusers to send mail using these IP addresses**: Select any subusers you would like to send on this IP address. For Regional EU sending, the region of the subuser and IP address must be EU.

## Link a domain to your dedicated IP address

Email addresses don't end with IP addresses. They end with domains. Map your domains to your dedicated IP addresses. Twilio SendGrid supports this feature at no additional cost.

To learn more about map your domains, see [How to set up reverse DNS](/docs/sendgrid/ui/account-and-settings/how-to-set-up-reverse-dns/).

## Warm up your dedicated IP Address

To help build your legitimacy or reputation, Twilio SendGrid recommends a ramping up of the messages you send each day for a specific period. This ramping up period is called *warming up* an IP address.

To learn more about warming up an IP Address, see [Warming up a dedicated IP](/docs/sendgrid/concepts/reputation/warm-up-ip-addresses).

## Assign a dedicated IP address to a subuser

This task requires a [subuser][add-subuser] and a [dedicated IP address][add-ip] you want to assign the subuser.

Only parent users can assign a dedicated IP address to a subuser. Assign the address when you [create the subuser][add-subuser] or later from the [**Subuser Management** page][subuser-management]

[subuser-management]: https://app.sendgrid.com/settings/subusers

[add-subuser]: /docs/sendgrid/ui/account-and-settings/subusers/#create-a-subuser

[add-ip]: #acquire-dedicated-ip-addresses

To assign a dedicated IP to an existing subuser. If the email traffic must be limited to the EU, set the subuser and the assigning email address to **EU**.

1. Go to **Settings** > **IP Addresses** in the Twilio SendGrid console.
2. Find the IP address to associate with your subuser.
3. Select this IP address and hover over the action menu.
4. Click the **Edit** (pencil) icon.
5. Click **Choose the Subusers** box.
6. To assign a subuser to your chosen IP address, click on the subusers from the dropdown menu.
   * To send email within the EU, set both the subuser region and IP address to **EU**.
7. Click **Save**.

## Monitor reputation of dedicated IP addresses

Twilio SendGrid doesn't offer dedicated IP address reputation monitoring as a service. You control the content sent and have the responsibility of monitoring and maintaining its reputation and listing status.

Monitoring your SendGrid Engagement Quality (SEQ) score maintains a strong sender reputation and ensures your emails reach recipients' inboxes. The SEQ score reflects how wanted and engaging your emails are, based on factors like open rates, bounce rates, spam complaints, and engagement recency.

By tracking your SEQ score, you can identify and address issues, such as high bounce or spam rates, that might harm your deliverability. A healthy SEQ score increases the likelihood of your emails being delivered and decreases mailbox providers flagging or throttling your email. This protects your brand's reputation and maximizes the impact of your email campaigns. You can monitor your SEQ score through the [SEQ API][].

The following third-party tools can assist you in maintaining your reputation:

* [Google Postmaster Tools](https://postmaster.google.com/)
* [Microsoft SNDS](https://postmaster.live.com/snds/index.aspx)
* [MX Toolbox](https://mxtoolbox.com/)

Twilio SendGrid offers [Expert Services](https://www.twilio.com/en-us/professional-services) to Pro and Premier accounts. These services can help with deliverability and onboarding. They include, but aren't limited to:

* Maintaining and improving domain and IP reputation
* Reviewing message content
* Configuring dedicated IP addresses
* Creating a custom IP warmup plan

## Additional resources

* [Warming up a dedicated IP](/docs/sendgrid/concepts/reputation/warm-up-ip-addresses)
* [API IP Access Management](/docs/sendgrid/ui/account-and-settings/ip-access-management/)
* [SendGrid billing information](/docs/sendgrid/ui/account-and-settings/billing/)

## Do you want expert help to get your email program started on the right foot?

[IMPLEMENTATION SERVICES](https://sendgrid.com/solutions/email-implementation/)

Save time and feel confident you are set up for long-term success with Email Implementation. Our experts will work as an extension of your team to ensure your email program is correctly set up and delivering value for your business.

[seq api]: /docs/sendgrid/api-reference/sendgrid-engagement-quality-api
