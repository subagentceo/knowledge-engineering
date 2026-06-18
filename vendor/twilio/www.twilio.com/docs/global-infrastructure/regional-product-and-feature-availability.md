# Regional product availability

Twilio supports some products and features in [Twilio Regions](/docs/global-infrastructure/understanding-twilio-regions) outside the United States.

> \[!WARNING]
>
> Regions operate in isolation. If your application relies on Twilio products or features that aren't available in your target Region, those products and features won't work in that Region.

## Ireland (IE1) Region

This Region is located in Dublin.

Use the following products in the IE1 Region:

* [Programmable Voice][programmable-voice] (see list of unsupported APIs/features below)
* [Elastic SIP Trunking][elastic-sip-trunking] (see list of unsupported APIs/features below)
* [Programmable Messaging (SMS)][programmable-messaging]
* [SendGrid][sendgrid]
* [Segment][segment]
* [Conversations][conversations]: Chat
* [Lookup v2][lookup-v2]
  * [Verify Silent Network Auth][verify-auth]
* [Studio][studio] (Private Beta)
* [Functions and Assets][functions-and-assets]
* [TaskRouter][taskrouter] (Private Beta, see list of limitations below)

### Unsupported Voice features in IE1

The following Voice APIs and TwiML verbs or nouns *aren't yet supported* in IE1:

* [`<Connect><Room>`][connect-room]
* [`<Connect><VirtualAgent>`][connect-virtualagent]
* [`<Start><Siprec>`][start-siprec]
* [`<Dial><WhatsApp>`][dial-whatsapp]
* [Voice Insights Call Annotation API resource][voice-annotation]
* [SIP Trunk Phone Number API subresource][elastic-sip-phone]
* [Bulk Exports API resource][bulk-exports-api]

The following Voice features *aren't yet supported* in IE1:

* [BYOC Trunks][byoc-trunks] with static IP addresses
* [Verified Caller IDs][verified-cid]
* [Conversation Intelligence (classic)][conv-intel]
* [WhatsApp Business Calling][whatsapp-business-calling]

### Limitations to TaskRouter features in IE1

* [Historical Statistics][taskqueue-statistics] - TaskRouter workspaces in IE1 only support historical statistic for a duration of 31 days, compared with 35 days in the US1 region

### Voice SDK requirements

Twilio Voice SDKs require the following minimum SDK versions to function in IE1:

* iOS: 6.4.0
* Android: 6.1.0
* JavaScript: 2.1.0

## Australia (AU1) Region

This Region is located in Sydney.

Use the following products in the AU1 Region:

* [Programmable Voice][programmable-voice] (see list of unsupported APIs/features below)
* [Elastic SIP Trunking][elastic-sip-trunking] (see list of unsupported APIs/features below)

### Unsupported Voice features in AU1

The following APIs and TwiML verbs or nouns *aren't yet supported* in AU1:

* [`<Connect><Room>`][connect-room]
* [`<Connect><VirtualAgent>`][connect-virtualagent]
* [`<Start><Siprec>`][start-siprec]
* [`<Dial><WhatsApp>`][dial-whatsapp]
* [Voice Insights Call Annotation API resource][voice-annotation]
* [SIP Trunk Phone Number API subresource][elastic-sip-phone]
* [Bulk Exports API resource][bulk-exports-api]
* [Call UserDefinedMessage API resource][userdefinedmessage]

The following features *aren't yet supported* in AU1:

* [BYOC Trunks][byoc-trunks] with static IP addresses
* [Verified Caller IDs][verified-cid]
* [Conversation Intelligence (classic)][conv-intel]
* [WhatsApp Business Calling][whatsapp-business-calling]

### Voice SDK requirements

Twilio Voice SDKs require the following minimum SDK versions to function in AU1:

* iOS: 6.4.0
* Android: 6.1.0
* JavaScript: 2.1.0

[connect-room]: /docs/voice/twiml/connect/room

[connect-virtualagent]: /docs/voice/twiml/connect/virtualagent

[start-siprec]: /docs/voice/twiml/siprec

[bulk-exports-api]: /docs/usage/bulkexport

[byoc-trunks]: /docs/voice/bring-your-own-carrier-byoc

[verified-cid]: https://support.twilio.com/hc/en-us/articles/223180048-Adding-a-Verified-Phone-Number-or-Caller-ID-with-Twilio

[voice-annotation]: /docs/voice/voice-insights/api/call/call-annotation-resource

[conv-intel]: /docs/conversation-intelligence-classic

[elastic-sip-phone]: /docs/sip-trunking/api/phonenumber-resource

[userdefinedmessage]: /docs/voice/api/userdefinedmessage-resource

[programmable-voice]: /docs/voice

[elastic-sip-trunking]: /docs/sip-trunking

[functions-and-assets]: /docs/global-infrastructure/regional-support-functions-assets

[segment]: /docs/segment/guides/regional-segment

[sendgrid]: https://www.twilio.com/en-us/blog/send-emails-in-eu

[conversations]: /docs/global-infrastructure/conversations-api-with-twilio-regions

[lookup-v2]: /docs/lookup/using-lookup-with-twilio-regions

[verify-auth]: /docs/verify/using-verify-silent-network-auth-with-twilio-regions

[whatsapp-business-calling]: /docs/voice/whatsapp-business-calling

[dial-whatsapp]: /docs/voice/twiml/whatsapp

[programmable-messaging]: /docs/global-infrastructure/messaging-api-with-twilio-regions

[studio]: /docs/studio

[taskrouter]: /docs/taskrouter

[taskqueue-statistics]: /docs/taskrouter/api/taskqueue-statistics
