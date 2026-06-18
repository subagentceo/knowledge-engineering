# Outbound - Receiving SIP from Twilio

## Overview

Twilio's Programmable Voice SIP product enables your advanced voice applications to initiate SIP sessions from the Twilio cloud towards your existing SIP communications infrastructure using [TwiML](/docs/voice/twiml) and/or the [REST](/docs/usage/api) APIs.

![Twilio SIP flow from inbound call to customer SIP network via internet or private connections.](https://docs-resources.prod.twilio.com/2fd6e2abda4679fda6dcde77d66b2a571fda08f95fbcb51937d64a62ff13d985.png)

## How it works

With Programmable Voice SIP, there are a couple of ways to connect your Twilio application to your SIP communications infrastructure.

1. Your application can use Twilio's [REST](/docs/usage/api) APIs to initiate a new SIP call towards your SIP communications infrastructure
2. An inbound PSTN or SIP call can invoke your application which can respond using the [\<Sip>](/docs/voice/twiml/sip) noun of the [\<Dial>](/docs/voice/twiml/dial) verb, to establish a call with your SIP endpoint.

```bash
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Sip>sip:jack@example.com</Sip>
  </Dial>
</Response>
```

## Getting Started

To start receiving SIP from Twilio towards your communications infrastructure, there is one major step you need to follow:

### Allow Twilio's SIP IP addresses and media ports in your system

To ensure that your communications infrastructure doesn't block communication, you must update your allowed list of IP Addresses. See [here](/docs/voice/api/sip-interface#ip-addresses) for details.

Now that Twilio's IPs are allowed in your system, your Twilio app can begin sending SIP traffic to your SIP communications infrastructure. If you are new to Twilio, it's best to start out with [\<Sip>](/docs/voice/twiml/sip) noun of the [\<Dial>](/docs/voice/twiml/dial) for your first app. See [here](/docs/voice/twiml/sip) for details.

## Advanced Features

### SIP Custom Headers

Twilio allows you to send custom SIP headers as part of the outgoing initial INVITE request.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Sip>sip:jack@example.com?x-myotherheader=bar</Sip>
    </Dial>
</Response>
```

You can also send multiple param & value pairs as part of the same header, as well as combine multiple headers by separating them with `&amp;` between each. For example,

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Sip>sip:+14158675309@your.domain?X-customName=Bob%2CShield%2BTitle%2DManager&amp;X-otherHeader=true</Sip>
    </Dial>
</Response>
```

Twilio allows you to pass the custom header as part of [Dial action URL](/docs/voice/twiml/dial#action) or the [call screening URL](/docs/voice/twiml/sip#attributes-url). On a successful call setup (when a `200 OK` SIP response is returned) any **X-headers** in the `200 OK` message are posted in the format SipHeader\_X-headername=headervalue and in the final SIP response message (any 4xx or 5xx message or the final BYE/200) are posted in the format DialSipHeader\_X-headername=headervalue.

### UUI (User-to-User Information) Header

In order to pass the contextual information of the caller, customers use UUI (User-to-User Information) header in SIP request messages. Twilio allows you to pass UUI header as part of [\<Sip>](/docs/voice/twiml/sip) request.

Note: For non X-headers like UUI [action](/docs/voice/twiml/dial#action) and [call screening URL](/docs/voice/twiml/sip#attributes-url) are **not** supported.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Sip>sip:jack@example.com?User-to-User=123456789%3Bencoding%3Dhex&amp;x-myotherheader=bar</Sip>
    </Dial>
</Response>
```

UUI headers can also send *with "X-"* prefix. See below...

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Sip>sip:jack@example.com?X-User-to-User=123456789%3Bencoding%3Dhex&amp;x-myotherheader=bar</Sip>
    </Dial>
</Response>
```

### Other supported standard SIP headers

In order to pass other contextual information, Twilio allows you to pass the following standard SIP headers as part of an outbound SIP call:

* `Remote-Party-ID`
* `P-Preferred-Identity`
* `P-Called-Party-ID`

Note: For these headers, action and call screening URL are not supported.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Sip>sip:bob@example.com?x-foo%3Dbar&amp;User-To-User=foobar&amp;Remote-Party-ID=%3Csip%3Afoo%40example.com%3E%3Bparty%3Dcalling&amp;P-Preferred-Identity=%3Csip%3Afoo%40example.com%3E&amp;P-Called-Party-ID=%3Csip%3Afoo%40example.com%3E</Sip>
    </Dial>
</Response>
```

### The `edge` Parameter \[#SIP-URI-edge]

To specify the geographic edge from which Twilio will send SIP-out traffic towards your communication infrastructure, you must include the `edge` parameter in your SIP URI. For example, if the `edge=frankfurt` parameter is included in your SIP URI, Twilio will send the SIP traffic from the Frankfurt, Germany edge:

```bash
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Sip>sip:alice@example.com;edge=frankfurt</Sip>
    </Dial>
</Response>
```

| Edge      | Location                |
| :-------- | :---------------------- |
| ashburn   | North America Virginia  |
| san-jose  | North America Oregon    |
| dublin    | Europe Ireland          |
| frankfurt | Europe Frankfurt        |
| singapore | Asia Pacific Singapore  |
| tokyo     | Asia Pacific Tokyo      |
| sao-paulo | South America São Paulo |
| sydney    | Asia Pacific Sydney     |

> \[!NOTE]
>
> You can find the [legacy region list here](/docs/global-infrastructure/edge-locations/legacy-regions).
>
> eg: `<Sip>sip:alice@example.com;region=de1</Sip>`

If the `edge` parameter is not specified, Twilio will send SIP-out traffic from the North America, Virginia edge.

Notes:

* You must make sure you allow the [IP addresses](/docs/voice/api/sip-interface#ip-addresses) of the Twilio edge for SIP signaling and RTP media traffic.
* The `edge` parameter is not supported when calling SIP registered endpoints, the parameter will be ignored if present. SIP-out traffic will always be sent from the Twilio edge the SIP endpoint registered with.
