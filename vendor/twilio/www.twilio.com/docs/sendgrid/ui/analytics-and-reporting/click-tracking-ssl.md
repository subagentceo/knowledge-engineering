# Set up secure click tracking

> \[!WARNING]
>
> Most of this process occurs outside of Twilio. Twilio SendGrid support can help with the steps performed in your Twilio account. This guide provides setup options as examples only.

For domains it manages, Twilio SendGrid supports click and open tracking using Secure Sockets Layer (SSL) encryption.

To use SSL click and open tracking for an authenticated domain with branded links, you need [additional setup](docs/sendgrid/ui/account-and-settings/how-to-set-up-link-branding.mdx).

## Configuring SSL certificates and keys

To set up SSL for click and open tracking, provide Twilio SendGrid with a valid SSL certificate. For authenticated domains, Twilio SendGrid can't request or manage SSL certificates, as Twilio doesn't own the domain.

To configure SSL certificates, choose from the following two options:

1. Let a Content Delivery Network (CDN) service manage certificates and keys for your domain.
   CDN examples include [CloudFlare][], [Fastly][], or [KeyCDN][].
2. Set up your own [custom SSL configuration][].

Once you complete either configuration, contact [Twilio SendGrid Support][sg-support]. They activate SSL click and open tracking on your behalf. To access the resulting data, go to [Stats][sgc-activity] or [Activity Feed][sgc-stats] in the console or access the [Email Activity][sgapi-activity] or [Stats][sgapi-stats] API resources.

[sgc-activity]: https://app.sendgrid.com/email_activity

[sgapi-activity]: /docs/sendgrid/api-reference/email-activity/filter-all-messages

[CloudFlare]: /docs/sendgrid/ui/sending-email/content-delivery-networks/using-cloudflare-as-your-content-delivery-network-cdn

[sg-support]: https://support.sendgrid.com/hc/en-us

[custom SSL configuration]: /docs/sendgrid/ui/account-and-settings/custom-ssl-configurations/

[Fastly]: /docs/sendgrid/ui/sending-email/content-delivery-networks/using-fastly-as-your-content-delivery-network-cdn

[KeyCDN]: /docs/sendgrid/ui/sending-email/content-delivery-networks/using-keycdn-as-your-content-delivery-network-cdn

[sgapi-stats]: /docs/sendgrid/api-reference/stats/retrieve-global-email-statistics

[sgc-stats]: https://app.sendgrid.com/statistics
