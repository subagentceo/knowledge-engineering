# SIP Registration

## What is SIP Registration?

SIP Endpoints are identified by their Address of Record (AOR). The AOR is a high level name that is assigned to a SIP entity without regard to the device or devices that names might use. The format for an AOR is as follows:

`sip:user@domain`

SIP endpoints are reachable via their location, which is identified by an IP address, port number and protocol. In order to receive calls, ultimately the caller needs to know the location of the callee, so that the call between the two endpoints can be connected. Since most SIP endpoints do not have a permanent, fixed, publicly-reachable IP address, they will need to register with a central server, or Registrar, so that they can receive incoming calls.

**SIP Registration** is the process of binding an endpoint's AOR with its location. The SIP Endpoint sends a SIP REGISTER request to a Registrar, containing its AOR, location, authentication and other information in the message. The registrar validates the request, and if allowed, stores the associated binding in the location service of the domain it handles. The registrar then acts as the front end to the location service for a SIP Domain, maintaining the location bindings of its endpoints.

Your Twilio Programmable Voice SIP Domain allows you to dynamically register your SIP Endpoint with Twilio, so you can make and receive calls globally. You may use this feature by enabling the SIP Registration option in your SIP Domain.

Learn how to:

* [Register your SIP Endpoint](#register-your-sip-endpoint)
* [Make calls with your registered SIP Endpoint](#making-calls-with-your-registered-sip-endpoint)
* [Receive calls on your registered SIP Endpoint](#receiving-calls-on-your-registered-sip-endpoint)
* [Configure your SIP Endpoint](#configure-your-sip-endpoint)

### Register your SIP Endpoint

Twilio's SIP Registrar is deployed per [Edge Location](/docs/global-infrastructure/edge-locations); the bindings stored in the SIP Registrar are shared between Edge Locations, so your locally-registered endpoints (those that are registered with a specified edge location) are globally reachable. You can register with any Edge Location, but typically you would register with the Edge Location which is physically closest to your device location, as this will give you the best performance and quality, due to reduced latency, jitter, and packet loss. You can also switch between Edge Locations if you like, for failover, changing locations, or other reasons.

When you configure your SIP device, you specify the SIP Domain URI, including the Twilio Edge Location with which you want to register.

`{domain-name}.sip.{edge-location}.twilio.com`

> \[!NOTE]
>
> If you do not specify an Edge Location in either your registration URI, or your outbound proxy URI, the registration will default to Twilio's Ashburn, VA, US datacenter.

Your SIP device may include configuration options for both a Registration Domain and an Outbound Proxy. If that is the case, we suggest using the Twilio Edge Location URI for the Outbound Proxy, and your SIP Domain URI for the Registration Domain.

For example, if your domain was named **mydomain**, and you wanted to register to our Sydney edge, you would configure your device as follows:

* **Registration Domain**: mydomain.sip.twilio.com
* **Outbound Proxy**: sip.sydney.twilio.com

If your SIP device doesn't use an Outbound Proxy in its configuration, then you should use the full **mydomain.sip.sydney.twilio.com** URI as the Registration Domain.

#### SIP Endpoint Registration Authentication

Your `REGISTER` request will be authenticated against user [Credential Lists](/docs/voice/api/sending-sip#credential-lists) that have been mapped to this SIP Domain.

The Username that is configured in the SIP Endpoint must exactly match a Username specified in a Credential List mapped to this SIP Domain for successful registration. Some SIP Endpoints refer to this field as the Username while others call it the Authorization ID or Authentication ID. The Password or Secret used should match the Password set for the same Credential.

#### SIP Endpoint REGISTER Expiry and Refresh Intervals

The SIP Endpoint needs to re-register in periodic intervals, otherwise the registration will expire and be removed from the location service. This is commonly configured using parameters called Expiration and/or Refresh Intervals, or similar, on most SIP Endpoints. These parameters and their default values vary per device.

You may want to reduce these intervals to a lower value than the defaults for resiliency reasons. The smallest Registration Expiration value that a SIP Endpoint can use when registering with Twilio is 600 seconds (10 minutes); if you set the value any lower, the `REGISTER` will fail with a SIP "423 Interval too brief" error. The largest Registration Expiration value Twilio will allow is one hour (3600 seconds); any requested values larger than this will be reduced to one hour as part of the `REGISTER` negotiation.

Additionally, you'll want to set a **Refresh** interval to occur before the **Expiration** interval you set, or you will risk your SIP Endpoint's registration expiring. You should set this to a value that is lower than the **Expiration** you set; a typical setting is one-half the value. For example, if you set your **Expiration** to 600 seconds, you would set your **Refresh** to something like 300 seconds.

If your device has only one parameter to cover both of these settings, then this is normally treated as an Expiration setting, and the Refresh setting is automatically deduced to be lower than that value in order to keep the registration from expiring.

### Limits

Make sure you're aware of the following Programmable Voice SIP Registration limits.

* There is a maximum of 100 SIP Domains allowed per Account.
* There is a maximum of 10 Active Endpoint registrations allowed per Address-of-Record (AOR); the 11th **active** registration attempt for the same AOR will be rejected.
* There is a maximum of 100 Credential Lists allowed per SIP Domain, with a maximum of 1000 users per list.
* The maximum number of Active Endpoint registrations allowed per SIP Domain is based on a combination of maximum Credential Lists per domain, maximum Credential List users per list, and maximum Active Endpoint registrations per AOR limits. If all configurations are maximized, 1 Million Active Endpoint registrations per SIP Domain are allowed.
* The maximum number of Active Endpoint registrations allowed per Account is based on combination of maximum SIP domains per Account, maximum Credential Lists per domain, maximum Credential List users per list, and maximum Active Endpoint registrations per AOR limits. If all configurations are maximized, 100 Million Active Endpoint registrations per account are allowed.

### Receiving calls on your registered SIP Endpoint

In order for your SIP Endpoint to receive calls from Twilio, you'll use the same TwiML or REST API calling methods you use today. See [receiving SIP from Twilio](/docs/voice/api/receiving-sip) for REST API & TwiML details.

Calling a registered SIP endpoint works the same as calling any other SIP URI, only you will now be using the AOR of your registered SIP Endpoint. Keep in mind that calls need to be initiated by your application, just like any other Programmable Voice SIP call.

When calling your registered SIP Endpoint, you should use the general SIP Domain URI, omitting the Edge Location from the URI, i.e.:

`{username}@{domain-name}.sip.twilio.com`

#### Configuring call handling

You can configure how your SIP Domain handles incoming calls using several methods:

* **Functions (Recommended)**: Serverless code execution with automatic scaling and built-in Twilio SDK
* **Webhooks**: Your own web application endpoint for full control
* **TwiML Bins**: Static or templated TwiML hosted by Twilio (shown in example below)
* **Studio Flows**: Visual, no-code call flow builder

For detailed setup instructions for each option, see [Call Control Configuration](/docs/voice/api/sending-sip#call-control-configuration).

#### Example using TwiML Bin

You could buy a Twilio phone number and when this number is called it will ring your SIP endpoints.

Steps:

1. Buy a Twilio [phone number](https://1console.twilio.com/go?to=/account/account/__account__/us1/senders-hub/list/phone-numbers/inventory) in the country/area-code you want. *The number must be provisioned in the same (sub)-account as the SIP Domain enabled for Registration*
2. Create a [TwiML Bin](https://www.twilio.com/console/dev-tools/twiml-bins) with the following. Replace the **myusername** and **mysipdomain** with your information.

```xml
<Response>
  <Dial>
    <Sip>myusername@mysipdomain.sip.twilio.com</Sip>
  </Dial>
</Response>
```

**myusername** and **mysipdomain** in the TwiML example above must match the username and domain name you used to register your SIP endpoint. If the device is not actively registered, the call will not complete, and you will receive a debugger alert.

When calling a Registered SIP AOR, Twilio will call all of the SIP Endpoints registered using that AOR in parallel across all edge locations, which means that all of those endpoints will ring simultaneously. For example, if you register the endpoints `maria@mysipdomain.sip.sydney.twilio.com`, `maria@mysipdomain.sip.tokyo.twilio.com`, and `maria@mysipdomain.sip.singapore.twilio.com`, a call to `maria@mysipdomain.sip.twilio.com` will send the call to each of the edge locations, and all three of those endpoints will ring simultaneously.

> \[!WARNING]
>
> For backwards compatibility, the `us1` and `us1-ix` regions are still allowed, but only when calling SIP Endpoints which are specifically registered to the Ashburn, VA, US datacenter (over public Internet or Twilio Interconnect, respectively). Any other region or edge specified when calling a registered SIP endpoint will return an error. It is **strongly suggested** that you adjust any legacy code to no longer use the regional domain when calling a registered SIP endpoint.

### Making calls with your registered SIP Endpoint

SIP calls from your registered Endpoint to your Twilio SIP Domain are treated just like any inbound SIP call received on that domain. After the INVITE is authenticated, Twilio will invoke the Voice URL configured on your SIP domain. See [sending SIP to Twilio](/docs/voice/api/sending-sip) for details.

Normally, your SIP Endpoint would send its `INVITE`s to the edge-specific domain that it registered with, but they can be sent to any Twilio Edge Location:

`{domain-name}.sip.{edge-location}.twilio.com`

#### Test your SIP Endpoint Voice connectivity with your SIP Domain

For example, you can configure your SIP Domain Voice URL with the following to verify connectivity with Twilio. It will say a brief message and play some music.

[http://demo.twilio.com/docs/voice.xml](http://demo.twilio.com/docs/voice.xml)

### How to Make Calls from SIP Endpoint to Public Telephone Network

In this section we summarize a few different ways you can bridge calls from your registered SIP Endpoint to the public telephone network using Programmable Voice.

#### Using Enhanced TwiML Bin Templates to Call a mobile/landline on the Public Telephone Network

Twilio has [Enhanced TwiML Bins Templates](https://www.twilio.com/blog/building-more-powerful-voice-applications-with-enhanced-twiml-bins-templates.html) which extracts the username from both the `From` and `To` SIP URIs in the `SIP INVITE` of the parent call leg that can be used to construct a dynamic TwiML response.

The example below shows how the To field of the child call leg is populated with the username of the SIP INVITEs To field of the parent call leg.

```xml
<Response>
  <Dial callerId="+14087998994">{{#e164}}{{To}}{{/e164}}</Dial>
</Response>
```

**Note 1**: When you dial a number using your SIP Endpoint it must be in E.164. (such as +14157012311 or +441562720212) The [Twilio Lookup tool](https://www.twilio.com/en-us/trusted-activation/lookup) is useful for determining international E.164 formats.

**Note 2**: The callerId must be a number verified on the [Twilio Console](https://www.twilio.com/console/phone-numbers/verified).

The next example takes it one step further by dynamically setting the callerId based on the SIP endpoint caller. Like in the previous example the caller must be an in E.164 format and must be verified on the Twilio Console.

```xml
<Response>
  <Dial callerId="{{#e164}}{{From}}{{/e164}}">{{#e164}}{{To}}{{/e164}}</Dial>
</Response>


```

The `From` field above corresponds to the username of the SIP URI found in the `From` field in the `SIP INVITE`. This username also corresponds to the username that the SIP Endpoint uses to authenticate itself that must be configured in the SIP Registration Credential List on the Console.

### Configure your SIP Endpoint

Twilio supports standard SIP Registration. The section below includes sample configuration guides to help you get started. There may be SIP Endpoints that don't behave per the standard and those are not supported.

The following Configuration Guides are intended to help you connect your SIP Endpoints to Twilio.

Be aware, due to the large number of versions, variations, add-ons, and options for many of these systems, the settings you see may differ from those shown in our Configuration Guides. As such, these documents are intended as general guidelines, rather than configuration templates. We assume you're familiar with your network, SIP infrastructure and how they work.

Twilio cannot provide direct support for third-party products; you should contact the manufacturer for your SIP Endpoint for assistance in configuring such products.

If you wish to share your SIP Endpoint configuration guide to help us improve this section for other users, kindly submit them or any corrections to the existing guides to `sip.interconnectionguides@twilio.com`.

> \[!NOTE]
>
> Twilio supports standard SIP Registration. The section below includes sample configuration guides to help you get started. There may be SIP Endpoints that don't behave per the standard and those are not supported.

* [BriaiPhoneEdition3.6.3CfgGuide.pdf](https://docs-resources.prod.twilio.com/documents/BriaiPhoneEdition3.6.3CfgGuideVer1_1.docx.pdf)
* [Bria4.4.4.0CfgGuide.pdf](https://docs-resources.prod.twilio.com/documents/Bria4.4.4.0CfgGuideVer1_1.docx.pdf)
* [GrandStreamGXP2130CfgGuide.pdf](https://docs-resources.prod.twilio.com/documents/GrandStreamGXP2130CfgGuide.pdf)
* [Obihai1022CfgGuide.pdf](https://docs-resources.prod.twilio.com/documents/Obihai1022CfgGuide.pdf)
* [PolycomSoundStationIP5000CfgGuide.pdf](https://docs-resources.prod.twilio.com/documents/PolycomSoundStation5000CfgGuide.pdf)
* [PolycomVVX400CfgGuide.pdf](https://docs-resources.prod.twilio.com/documents/PolycomVVX400CfgGuideVer1_0.docx.pdf)
* [Polycom VVX500 Configuration Guide](https://docs-resources.prod.twilio.com/documents/PolycomVVX500CfgGuideVer1_0.docx.pdf)
* [ZoiperiPhone3.6.1CfgGuide.pdf](https://docs-resources.prod.twilio.com/documents/ZoiperiPhone3.6.1CfgGuide.pdf)
* [Guide to Configuring Twilio for OBIHAI Phones](https://docs-resources.prod.twilio.com/documents/Give-Your-OBIHAI-Phone-Telephone-Connectivity.pdf)
* [Dolby Conference Phone](https://docs-resources.prod.twilio.com/documents/Registering_a_Dolby_Conference_Phone_to_Twilio_as_a_SIP_Device_January_2018.pdf)
