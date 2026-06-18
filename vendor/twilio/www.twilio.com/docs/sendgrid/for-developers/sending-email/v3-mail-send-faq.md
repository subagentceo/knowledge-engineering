# v3 Mail Send FAQ

## What is the v3 Mail Send endpoint?

The [v3 Mail Send endpoint](/docs/sendgrid/api-reference/mail-send/mail-send) is the latest version of SendGrid's Web API endpoint that allows you to send email by making an HTTP request. The introduction of the v3 Mail Send endpoint signifies the completion of our RESTful Web API v3.

If you're looking for one of the other methods that you can use to send mail through SendGrid, please see our [SMTP](/docs/sendgrid/for-developers/sending-email/getting-started-smtp/), [Marketing Campaigns](/docs/sendgrid/ui/sending-email/how-to-send-email-with-marketing-campaigns/) feature, or [Web API v2](/docs/sendgrid/v2-api/mail).

## Do I have to have a certain type of account to use the v3 Mail Send endpoint?

The v3 Mail Send endpoint is available on all SendGrid pricing plans. The same plan based limitations on the volume of email you may send still apply to the v3 Mail Send endpoint. For more information, please visit our [Pricing Page](https://sendgrid.com/pricing).

## I'm currently using the v2 Mail Send endpoint. Should I switch to v3?

The v3 Mail Send endpoint offers many improvements over the v2 endpoint, and we highly encourage all users to migrate their email programs from the v2 to the v3 endpoint. While you may not notice any significant changes in the functionality offered by the v3 mail send endpoint, you will find it to be significantly easier to use. The v3 Mail Send endpoint offers a more comprehensive and consistent [JSON schema](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/requests#making-a-request), intuitive validation with more in depth [error messages](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/errors#response-codes), and complete coverage across all [7 of our supported libraries](/docs/sendgrid/for-developers/sending-email/libraries/).

## How do I migrate from V2 to V3?

If you are currently using the v2 Mail Send endpoint, we have provided some [helpful instructions](/docs/sendgrid/for-developers/sending-email/migrating-from-v2-to-v3-mail-send/) on how to migrate from sending mail over the Web API v2 to the Web API v3.

## What's the difference between sending mail via SMTP and the Web API?

Sending email via the [SMTP-Relay](/docs/sendgrid/for-developers/sending-email/getting-started-smtp/) is a way to integrate your existing SMTP code with SendGrid's email functionality. You modify your SMTP configuration to point to SendGrid's SMTP server and your email will be routed through SendGrid's SMTP-Relay. You may then specify special instructions for how you would like SendGrid to handle your email by means of the [X-SMTPAPI header](/docs/sendgrid/for-developers/sending-email/building-an-x-smtpapi-header/).

The Web API, on the other hand, requires you to make an HTTP request to an endpoint in SendGrid's API. Previously, SendGrid has only offered an email sending endpoint in the Web API v2, but now you can use the RESTful Web API v3 to send your email. Make an `HTTP POST` request to `https://api.sendgrid.com/v3/mail/send` with the data for your email included in a JSON payload. For more information, please visit our [v3 Mail Send documentation](/docs/sendgrid/api-reference/mail-send/mail-send).

[Learn more in this overview of sending email with the Web API vs. SMTP](/docs/sendgrid/for-developers/sending-email/web-api-vs-smtp).

## Can I send marketing email over the v3 Mail Send endpoint?

You can send any type of email (transactional or marketing) over the v3 Mail Send endpoint. However, we recommend you take a look at our [Marketing Campaigns](/docs/sendgrid/ui/sending-email/how-to-send-email-with-marketing-campaigns/) for a more robust marketing feature set (including segmentation and templates).

## Are there limits on how often I can send email and how many recipients I can send to?

There are rate limits on how frequently you can call the v3 Mail Send endpoint. Currently, you may make up to 10,000 requests per second to our endpoint. Each email you send may include up to 1000 recipients. For more information on other limitations, and how this may impact your integration, please visit our [v3 Mail Send overview](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/rate-limits).

## Why did you remove the x-smtpapi parameter? Can I still change my mail settings, tracking settings, and unique arguments?

Everything that could be accomplished by using the x-smtpapi parameter in the v2 Mail Send endpoint can still be done with the v3 endpoint. While the v2 Mail Send endpoint required you to include a separate block of JSON for various mail settings within the single x-smtpapi parameter, the v3 endpoint payload structure includes each setting as a separate parameter. This allows for a quicker and more consistent integration and helps with validation and debugging.

## Where can I find more information about the v3 Mail Send endpoint?

For more general information about the v3 Mail Send endpoint, please visit the [v3 Mail Send Overview](/docs/sendgrid/api-reference). Below, you will find links to more in depth information about the endpoint.

## Additional Resources

* [v3 Mail Send Overview](/docs/sendgrid/api-reference/mail-send/mail-send)
* [SandBox Mode](/docs/sendgrid/for-developers/sending-email/sandbox-mode/)
* [Errors](/docs/sendgrid/api-reference/mail-send/errors)
* [Personalizations](/docs/sendgrid/for-developers/sending-email/personalizations/)
* [Examples for Common Use Cases](/docs/sendgrid/for-developers/sending-email/curl-examples/)
* [How to Migrate from V2 to V3 Mail Send](/docs/sendgrid/for-developers/sending-email/migrating-from-v2-to-v3-mail-send/)
