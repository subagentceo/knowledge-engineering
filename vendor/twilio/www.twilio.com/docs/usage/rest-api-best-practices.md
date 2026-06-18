# API best practices

In this guide, you'll find best practices for working with the Twilio API.

## Secure your API traffic

* Use HTTPS/TLS connection for all communications with the Twilio API. For development and testing, you can use HTTP for callbacks.
* Use certificates from a Certificate Authority (CA), such as [Let's Encrypt](https://letsencrypt.org). Twilio doesn't support self-signed certificates.
* Use TLS cipher suites to encrypt data in transit. Check [TLS cipher suites for TwiML requests and status callbacks](https://help.twilio.com/articles/360002288554).
* Enable SSL certificate validation for webhooks in the Twilio Console, on the [General Settings](https://console.twilio.com/us1/account/manage-account/general-settings) page.

For more information, see [Security](/docs/usage/security) and [Webhooks security](/docs/usage/webhooks/webhooks-security).

> \[!NOTE]
>
> Some products have further requirements for security and encryption. Check the product documentation for details.

## Control access to your accounts

To authenticate requests to the Twilio APIs, Twilio supports HTTP Basic authentication. Use your API key and secret as your credentials. When a key is compromised or no longer used, revoke it to prevent unauthorized access.

**Note**: If your application receives incoming webhooks from Twilio and you [validate the signature on those incoming requests](/docs/usage/security#validating-requests), use your Account SID and Auth Token for signature validation.

Learn more about [Twilio API authentication](/docs/usage/requests-to-twilio).

## Avoid unnecessary fetching

* If you make frequent `GET` requests for the same resource, consider using [webhooks](/docs/usage/webhooks/getting-started-twilio-webhooks) for the resource instead. Webhooks allow Twilio to send updates to your servers when a resource changes, so you can avoid polling the API and reduce your request volume.
* If you often retrieve the same data from Twilio, consider moving that data to your own servers and deleting it from Twilio when no longer needed. This helps reduce costs and supports privacy, security, and compliance best practices.

> \[!NOTE]
>
> If you need to delete data that Twilio is storing on your behalf, such as old voice recordings, delete the data at non-peak hours and at a controlled rate. This helps prevent interference with other important requests you're making to the Twilio API.

## Know your rate limits

Review the rate limits for the Twilio products you use. Most Twilio products have rate limits to ensure fair usage and quality experience for all customers using the Twilio platform.

### Retry with exponential backoff

To ensure deliverability during usage spikes, we recommend implementing retries with exponential backoff.

* **For API requests to Twilio**: During periods of high usage (such as marketing campaigns or business events), you might exceed your account's concurrency limits and receive a `429 Too Many Requests` response. This means that the request wasn't processed and you can safely retry. Learn more about [429 Too Many Requests](https://help.twilio.com/articles/360044308153).
* **For Twilio API responses to your servers**: If your servers are under high load, you might need to implement retries on callbacks. Learn more about [Webhooks: Connection Overrides](/docs/usage/webhooks/webhooks-connection-overrides).

### Monitor your usage

Monitor the following API response headers to understand your account's usage and performance:

* `Twilio-Concurrent-Requests`: The current number of concurrent requests for your account. Subaccount requests don't roll up to the primary account. This count includes requests that receive a `429 Too Many Requests`.
* `Twilio-Request-Duration`: The time it took for the request to be completed within the Twilio platform. This measures the period from when the request reached Twilio's edge to when the response was sent back to your server. It doesn't include the network time between Twilio servers and your servers.

The more concurrent requests or requests per second you send, the more likely you're to receive a `429 Too Many Requests` response from certain endpoints. If you expect a spike in traffic or sustained high usage, consider slowing down your requests temporarily.

Subscribe to the [Twilio status](https://status.twilio.com/) page for any ongoing incidents that might affect your API requests.

## Specify global edge location and processing region

You can specify the edge location and processing region for your API traffic. Learn more about [edge Locations](/docs/global-infrastructure/understanding-edge-locations).

## Troubleshoot and maintain your integration

* Check the Twilio API responses for headers that can help you debug issues. When you need to contact Twilio Support, provide the unique request ID from the `Twilio-Request-Id` header.
* Use the [Debugging webhook](/docs/usage/troubleshooting/debugging-event-webhooks) to send warnings or errors directly to your servers.
* If you encounter SDK errors, test the same API request with `curl`. If the request succeeds with `curl`, the issue is likely in your SDK code. If the error persists with both methods,  [contact Support](https://help.twilio.com/).
* Update your SDKs at least once a quarter to ensure you have the latest features and bug fixes.
