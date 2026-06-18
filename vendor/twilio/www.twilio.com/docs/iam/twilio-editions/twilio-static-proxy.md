# Static Proxy for Webhooks

> \[!NOTE]
>
> Static Proxy is available to Twilio Security Edition and Enterprise Edition customers. Learn more about [Twilio Editions](/docs/iam/twilio-editions).

Twilio Static Proxy routes all webhooks from Twilio to your servers through a fixed set of IP addresses. This gives you a predictable set of IPs to add to your firewall or security device allowlist, complementing existing Twilio security features like [signed requests](/docs/usage/security#validating-requests) and SSL/TLS.

While Twilio avoids changing the IPs on this list, addresses may change or be added as new infrastructure becomes available. This page serves as the living reference for the latest IP addresses.

## How to access

Static Proxy is available to customers who have purchased an eligible [Twilio Edition](https://www.twilio.com/en-us/editions). No additional configuration is required within the Twilio platform, but you need to update your firewall or security device to allowlist the IP addresses listed below.

## Scope of support

Static Proxy works for all Twilio products that use standard Webhook and Event Stream functionality. The following products are confirmed to support Static Proxy:

* Voice
* SMS TwiML requests
* Studio
* TaskRouter
* Functions

> \[!WARNING]
>
> There is limited support for egress traffic across other products (outside of Functions). The official scope of support is Twilio Webhooks and Event Streams.

## IP addresses and ranges

> \[!WARNING]
>
> Twilio reserves the right to add or remove IP addresses from which Twilio traffic originates. Customers will be notified of changes at least 7 days in advance.

| Twilio product              | IP addresses                                                    | IP ranges                   |
| :-------------------------- | :-------------------------------------------------------------- | :-------------------------- |
| Twilio Static Proxy         | `3.80.20.0/25`                                                  | 3.80.20.0 - 3.80.20.127     |
| Static Proxy - Europe (IE1) | `3.251.214.32/27`                                               | 3.251.214.32 - 3.251.214.63 |
| Static Proxy - APAC (AU1)   | `3.26.81.96/27`                                                 | 3.26.81.96 - 3.26.81.127    |
| Twilio Functions            | `3.212.20.92`, `54.166.90.175`, `54.185.42.91`, `54.189.94.240` | N/A                         |
| Twilio Event Streams        | `35.90.102.128/25`                                              | N/A                         |

## Change log

| Date       | Change              |
| :--------- | :------------------ |
| 2026-04-10 | Initial publication |
