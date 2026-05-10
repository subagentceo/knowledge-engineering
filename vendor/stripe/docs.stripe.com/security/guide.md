# Integration security guide

Ensure PCI compliance and secure customer-server communications.

The [Payment Card Industry Data Security Standard](https://www.pcisecuritystandards.org/pci_security/) (PCI DSS) is the global security standard for all entities that store, process, or transmit cardholder or sensitive authentication data. PCI DSS sets a baseline level of protection for consumers and helps reduce fraud and data breaches across the entire payment ecosystem. Anyone involved with the processing, transmission, or storage of card data must comply with PCI DSS.

## Validate your PCI compliance 

PCI compliance is a shared responsibility and applies to both Stripe and your business:

- Stripe is certified annually by an independent PCI Qualified Security Assessor (QSA) as a [PCI Level 1](https://www.visa.com/splisting/searchGrsp.do?companyNameCriteria=stripe,%20inc) Service Provider meeting all PCI requirements.
- As a business accepting payments, you must do so in a PCI-compliant manner, and annually attest to this compliance.

Review the documentation requirements for your business in your [Dashboard](https://dashboard.stripe.com/settings/compliance/documents) and continue reading this guide to learn how Stripe can help you become PCI compliant.

## Use low risk integrations

Some business models require the intake of untokenized PANs on a payment page. If your business handles sensitive credit card data directly when accepting payments, you might be required to meet more than 300 security controls in PCI DSS. This might require you to purchase, implement, and maintain dedicated security software and hardware, and hire external auditors to support your annual assessment requirements.

Many business models don’t need to handle sensitive card data. You can instead use one of our low risk [payment integrations](https://docs.stripe.com/payments.md) to securely collect and transmit payment information directly to Stripe without it passing through your servers, reducing your PCI obligations.

### Out-of-scope card data that you can safely store 

Stripe returns non-sensitive card information in the response to a charge request. This includes the card type, the last four digits of the card, and the expiration date. This information isn’t subject to PCI compliance, so you can store any of these properties in your database. Additionally, you can store anything returned by our [API](https://docs.stripe.com/api.md).

## Use TLS and HTTPS 

TLS refers to the process of securely transmitting data between the client—the app or browser that your customer is using—and your server. The Secure Sockets Layer (SSL) protocol originally performed this, but is outdated and no longer secure. TLS replaced SSL, but the term *SSL* continues to be used colloquially when referring to TLS and its function to protect transmitted data.

Payment pages must use a recent version (TLS 1.2 or above) because it significantly reduces the risk of man-in-the-middle attacks for both you and your customers. TLS attempts to accomplish the following:

- Encrypt and verify the integrity of traffic between the client and your server.
- Verify that the client is communicating with the correct server. In practice, this usually means verifying that the owner of the domain and the owner of the server are the same entity. This helps prevent man-in-the-middle attacks. Without it, there’s no guarantee that you’re encrypting traffic to the right recipient.

Make sure any resources (for example, JavaScript, CSS, and images) are also served over TLS to avoid your customers seeing a [mixed content warning](https://web.dev/what-is-mixed-content/) in their browser.

Using TLS requires a *digital certificate*—a file issued by a certification authority (CA). Installing this certificate assures the client that it’s actually communicating with the server it expects to be talking to, and not an impostor. Obtain a digital certificate from a reputable certificate provider, such as:

- [Let’s Encrypt](https://letsencrypt.org/)
- [DigiCert](https://www.digicert.com/tls-ssl/basic-tls-ssl-certificates)
- [NameCheap](https://www.namecheap.com/security/ssl-certificates.aspx)

You can [test your integration](https://docs.stripe.com/testing.md) without using HTTPS if you need to, and enable it when you’re ready to accept live charges. However, all interactions between your server and Stripe must use HTTPS (that is, when using our libraries).

### Set up TLS 

To set up TLS:

1. Purchase a certificate from a suitable provider.
1. Configure your server to use the certificate. This step is complex, so follow the installation guide of the provider you use.

As TLS is a complex suite of cryptographic tools, it’s easy to miss a few details. We recommend using the [SSL Server Test](https://www.ssllabs.com/ssltest/) by Qualys SSL Labs to make sure you set up everything in a secure way.

## Security considerations 

Including JavaScript from other sites makes your security dependent on theirs and poses a security risk. If they’re ever compromised, an attacker could execute arbitrary code on your page. In practice, many sites use JavaScript for services like Google Analytics, even on secure pages. Nonetheless, we recommend trying to minimize it.

If you’re using *webhooks* (A webhook is a real-time push notification sent to your application as a JSON payload through HTTPS requests), use TLS for the endpoint to avoid traffic being intercepted and having notifications altered (sensitive information is never included in a webhook event). You must also [verify webhook signatures](https://docs.stripe.com/webhooks.md#verify-official-libraries) and [allowlist Stripe’s IP addresses](https://docs.stripe.com/ips.md) to ensure that every Stripe webhook you receive is sent exclusively by Stripe.

While complying with the Data Security Standards is important, it shouldn’t be where you stop thinking about security. Some good resources to learn about web security are:

- [OWASP](https://owasp.org/)
- [SANS](https://www.sans.org/reading-room/)
- [NIST](http://csrc.nist.gov/)

### Content Security Policy 

If you’ve deployed a *Content Security Policy* (Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection attacks), the full set of directives that Checkout, Connect embedded components, and Stripe.js require are:

#### Checkout

- `connect-src`, `https://checkout.stripe.com`
- `frame-src`, `https://checkout.stripe.com`
- `script-src`, `https://checkout.stripe.com`
- `img-src`, `https://*.stripe.com`

#### Connect embedded components

- `frame-src` `https://connect-js.stripe.com` `https://js.stripe.com`
- `img-src` `https://*.stripe.com`
- `script-src` `https://connect-js.stripe.com` `https://js.stripe.com`
- `style-src` `sha256-0hAheEzaMe6uXIKV4EehS9pu1am1lj/KnnzrOYqckXk=` (SHA of empty style element)

If you’re using a CSS file to load [web fonts](https://docs.stripe.com/connect/get-started-connect-embedded-components.md#fonts-object) for use with Connect embedded components, its URL must be allowed by your [connect-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/connect-src) CSP directive.

#### Stripe.js

- `connect-src`, `https://api.stripe.com`, `https://maps.googleapis.com`
- `frame-src`, `https://*.js.stripe.com`, `https://js.stripe.com`, `https://hooks.stripe.com`
- `script-src`, `https://*.js.stripe.com`, `https://js.stripe.com`, `https://maps.googleapis.com`

> Adding `*.js.stripe.com` allows Stripe.js to improve performance by starting frames on different origins, where possible.

If you’re using a CSS file to load [web fonts](https://docs.stripe.com/js.md#stripe_elements) for use with Elements, its URL must be allowed by your [connect-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/connect-src) CSP directive.

If you’re using a payment method with redirect functions (for example, cards that might require 3D Secure or iDeal), include `https://hooks.stripe.com` as a `frame-src` directive.

If you’re using the [Address Element](https://docs.stripe.com/elements/address-element.md) with your own Google Maps API key, include `https://maps.googleapis.com` as a connect-src and script-src directive. Refer to the [Google Maps API official guide](https://developers.google.com/maps/documentation/javascript/content-security-policy) for the most updated CSP requirement.

If you’re using [Trusted Types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/require-trusted-types-for), you must allow dynamic scripts to be loaded from `https://js.stripe.com` and `https://*.js.stripe.com`. You can use the following example [default policy](https://w3c.github.io/webappsec-trusted-types/dist/spec/#default-policy-hdr) to enable it:

```javascript
trustedTypes.createPolicy('default', {
  createScriptURL: (input) => {
    const stripeURL = /^https:\/\/([a-z0-9-]+\.)?js\.stripe\.com$/;
    const origin = new URL(input).origin;
    if (stripeURL.test(origin)) {
      return input;
    }
    return undefined;
  },
});
```

### Cross-origin isolation support 

Currently, we don’t support *Cross-origin isolated sites* (Cross-origin isolation is an opt-in security feature that helps prevent side-channel attacks by ensuring that a document loads in a unique, isolated browsing environment).

Cross-origin isolation requires support by all dependencies, and several key dependencies that enable our payment offerings don’t yet provide support for this feature.

## See also

- [PCI DSS compliance](https://stripe.com/guides/pci-compliance)
- [Best practices for managing secret API keys](https://docs.stripe.com/keys-best-practices.md)
- [Webhooks](https://docs.stripe.com/webhooks.md)
- [Declines and failed payments](https://docs.stripe.com/declines.md)
- [Disputes overview](https://docs.stripe.com/disputes.md)
