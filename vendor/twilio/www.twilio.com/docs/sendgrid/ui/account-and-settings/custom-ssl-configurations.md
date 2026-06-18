# Add a Custom SSL Configuration

If you do not want to use [Content Delivery Networks](/docs/sendgrid/ui/sending-email/content-delivery-networks) (CDNs) when setting up a Secure Sockets Layer (SSL) for click and open tracking, you can set up a custom SSL configuration.

Before adding a custom SSL configuration, you need to set up [link branding](/docs/sendgrid/ui/account-and-settings/how-to-set-up-link-branding) on your account.

To add a custom SSL configuration:

1. Prepare a proxy to receive all inbound traffic at your link branded domain and forward it to `http://sendgrid.net` or `https://sendgrid.net`.
   * You can set up a proxy with services and tools such as [NGINX](https://www.nginx.com), [Amazon API Gateway](https://aws.amazon.com/api-gateway), and others.
2. Configure the proxy to use HTTP or HTTPS.
   * For HTTPS, you must provide your proxy with a valid SSL certificate for your link branded domain.
3. To forward traffic from an inbound email, you will need to set the [`Host HTTP header`](https://www.rfc-editor.org/rfc/rfc7230#section-5.4) with your link branded domain.
4. Point the CNAME record at your hosting provider to your proxy. For example, `CNAME mailing.example.com proxy.example.com`.

> \[!WARNING]
>
> Do **NOT** validate the DNS record more than once. After changing the CNAME a second time, the second validation attempt will fail, and the authentication will stop working.

[Contact Twilio SendGrid Support](https://support.sendgrid.com/hc/en-us) to enable SSL click and open tracking.

## Troubleshooting

When adding a custom SSL configuration, you may run into errors. The section below will help you troubleshoot some of the most common issues customers encounter.

### Wrong Link Error

If your links are producing the following error, you have likely validated the branded link more than once:

> Wrong Link

> You have clicked on an invalid link. Please make sure that you have typed the link correctly. If you are copying this link from a mail reader please ensure that you have copied all the lines in the link.

To fix the "Wrong Link" error, you must do the following:

1. Remove the records from your custom proxy and then reinstall the DNS records. Once this is done, click **Verify** *once*. If you click **Verify** more than once, your branded link will break.
2. Go to **Settings > Tracking** and enable click tracking.
