# Preventing Fraud in Verify

One of the challenges of operating globally is the increased exposure to fraud. There are two types of attacks we commonly see in phone verification or two-factor authentication (2FA) flows.

1. SMS pumping
2. International Revenue Sharing Fraud (IRSF) also known as "Toll Fraud"

Both attacks cause **inflated traffic to your app** with the intent to make money and *not* to steal information. While the specific ways attackers monetize these types of fraud is different, the strategies you can implement to reduce fraud are similar.

![Fraudster exploits phone verification to generate revenue with mobile network operator.](https://docs-resources.prod.twilio.com/4698da79a6a62a13c26a6b5227a52dd28041ad26c5daf7d7c30405d551d0ae7a.png)

> \[!CAUTION]
>
> Customer participation is essential to successfully defend against fraud. Our [Verify](/docs/verify) product includes comprehensive built-in fraud detection and mitigation mechanisms. However, no provider-side solution can guarantee 100% effectiveness against sophisticated attackers.

## What is SMS pumping?

SMS pumping fraud happens when fraudsters take advantage of a phone number input field to receive a one-time passcode, an app download link, or anything else via SMS. The messages are sent to a range of numbers controlled by a specific [mobile network operator](https://en.wikipedia.org/wiki/Mobile_network_operator) (MNO) and the fraudsters get a share of the generated revenue.

See the [SMS Pumping Fraud glossary entry](/docs/glossary/what-is-sms-pumping-fraud) for more information.

## What is toll fraud?

Toll fraud, also known as International Revenue Sharing Fraud (IRSF), happens when an application is exploited to generate a high volume of voice calls to the fraudster's own international premium rate numbers. The victim of the toll fraud bears the entire financial responsibility for each minute of the call.

See the [Toll Fraud glossary entry](/docs/glossary/what-is-toll-fraud) for more information.

## Recommended actions for preventing fraud

### Enable Verify SMS Fraud Guard

Twilio recommends enabling the [SMS fraud guard](/docs/verify/preventing-toll-fraud/sms-fraud-guard) on your account. When enabled, this feature will block the transmission of suspicious and likely fraudulent SMS messages preventing unnecessary charges to your account.

### Disable unused channels

If you don't plan to allow any calls, you can disable that channel by selecting the Service on the [Console](https://www.twilio.com/console/verify/services/), selecting the Voice tab, and disabling the channel.

### Implement exponential delays between verification retry requests

Similar to rate limits, implementing exponential delays between requests to the same phone number is one way to prevent rapid sending. Learn more about our [recommendations for retry logic for SMS 2FA in this blog post](https://www.twilio.com/blog/best-practices-retry-logic-sms-2fa).

![Verification code entry screen with options to text a new code or receive a call.](https://docs-resources.prod.twilio.com/0bb5d28033f54e2981a1f0973cb85f35d26e25e8e576019f741c65ca0bb9b11c.png)

### Set rate limits

Add [Service Rate Limits](/docs/verify/api/service-rate-limits) for your Verification Service.

Make sure your app will not send more than 1 message per X seconds to the same [mobile number range or prefix.](https://en.wikipedia.org/wiki/List_of_mobile_telephone_prefixes_by_country) Implement rate limits by user, IP, or device identifier. You can use a CDN like Cloudflare or implement modules in your web server like [Nginx](https://docs.nginx.com/nginx/admin-guide/security-controls/controlling-access-proxied-http/) and [Apache](https://httpd.apache.org/docs/2.4/mod/mod_ratelimit.html) for basic rate limiting.

Rate limits may not prevent fraud but can slow the attackers down enough that they decide it's not worth it to go after your app.

### Detect bots and refresh your user experience to prevent them

Libraries like [botd](https://github.com/fingerprintjs/botd) or CAPTCHAs can help detect and deter bot traffic. Small changes to your user experience like ensuring that your users confirm their email address before enrolling in 2FA introduce a small amount of friction for legitimate users but can deter automated scripts and bots.

Learn more about [best practices for phone verification and 2FA](/docs/verify/developer-best-practices).

### Look up the phone number before sending

Use [Carrier Lookup](/docs/lookup/v2-api) to get the line type of a number then only send SMS to mobile numbers. You can also use this API request to determine the carrier and block carriers that may be (knowingly or not) causing inflated traffic. Learn more about how to [build a carrier block list with Lookup in this blog post](https://www.twilio.com/blog/carrier-block-list-lookup-fraud-prevention).

### Monitor one-time passcode (OTP) conversion rates and create alerts

Create internal monitors for conversion rate of verifications (i.e `number of OTPs validated by end users` / `number of OTPs sent to end users`). If you notice this rate start to drop, especially in an unexpected country, trigger an alert for manual review.

You can also [configure a usage trigger](https://help.twilio.com/hc/en-us/articles/223132387-Protect-your-Twilio-project-from-Fraud-with-Usage-Triggers) on your Twilio account to alert you when your usage goes above a certain threshold.

### Analyze IP and detect VPNs

Analyze IP location, IP owner (ISP/proxy/TOR/cloud provider, etc), and IP against the bad reputation list. Block TOR/Cloud Providers/proxies/bad IPs.

While there are legitimate use cases for VPNs, attackers will likely use one to bypass simple I.P. address blocking and this is a signal that something might be awry. There are a lot of solutions for [VPN detection](https://www.google.com/search?q=vpn+detection) out there to choose from.

### Implement geographic permissions to restrict destination countries

Review your [Verify Geographic Permissions](https://console.twilio.com/us1/develop/verify/geopermissions) and disable all countries that you do not plan to send messages to.

You can also [build a programmatic allow list or block list based on the country codes](https://www.twilio.com/blog/allow-list-country-code-lookup) of the phone number with our free Lookup formatting API.

If you have data on the number of verifications you'd expect per day in a given country, you can set rate limits on groups of countries, allowing relaxed rate limits in countries where you expect legitimate users, and more restricted rate limits in all other countries.

## What to do if you suspect fraud on your Twilio account

Email [fraud@twilio.com](mailto:fraud@twilio.com) if you are facing messaging abuse. Please include the following details in your message:

```text
Account SID: 
Product Type: 
Date/time Range: 
To/Recipient Country: 
Workspace SID: 
Description of Activity:
```

## What's next?

Here are some more resources for account security that you might enjoy:

* [Everything You Need to Know About Toll Fraud](https://www.twilio.com/blog/how-to-protect-your-account-from-toll-fraud-with-voice-dialing-geo-permissions-html)
* [Best practices for phone number validation during new user enrollment](https://www.twilio.com/blog/best-practices-phone-number-validation-user-enrollment)
* [Best practices for managing retry logic with SMS 2FA](https://www.twilio.com/blog/best-practices-retry-logic-sms-2fa)
* [Developer best practices for user verification](/docs/verify/developer-best-practices)
* [Anti-Fraud Developer Guide](/docs/usage/anti-fraud-developer-guide)
* [Send an SMS OTP in 5 minutes](/docs/verify/api)
