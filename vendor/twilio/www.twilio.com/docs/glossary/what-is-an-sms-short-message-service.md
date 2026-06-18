# What is an SMS?

The text messaging service that telephone, internet, and mobile devices use. First formalized in 1987, the [Global System for Mobile Communications (GSM)][gsm] standards included the *Short Message Service* (SMS) text-only standard. SMS can be understood as the service as a whole or as a single message.

The GSM agreed on the SMS standard in 1987 as [GSM 03.40][] and GSM 03.41. Neil Papworth of Vodafone sent the first text message over the Vodafone network on [December 3, 1992][1stsms]: `MERRY CHRISTMAS`.

The 160-byte limit came about because SMS needed to fit between existing telephony protocols. After it took off, the [Short Message Peer-to-Peer (SMPP) Protocol][smpp] codified this limit. This protocol transmits text messages between carriers.

## Multimedia messaging

SMS can't handle pictures, videos, or other multimedia attachments. To send attachments, the Open Mobile Alliance (OMA) published the [*Multimedia Messaging Service* (MMS)][mms] standard as [3GPP TS 23.140][] in 2002.

Once the destination carrier receives a multimedia message, the carrier sends an SMS asking the phone to download the content.

## Business case for SMS

Every year, SMS-capable devices send *trillions* of text messages between each other. An ecosystem grew around text messaging. With the popularity of SMS, business use cases grew up around texting. SMS boasts a *5x open rate* compared to email.

Businesses use text messaging for both [SMS Notifications][] and SMS Marketing. Combining the high open rates, universal receiving capability, and ubiquitous nature of compatible devices, SMS offers a strong communication channel with customers.

## Twilio SMS offerings

Twilio began with an [SMS API][sms-api]. To adapt the API for changing customer needs, Twilio scaled the service with the Twilio [Programmable SMS][]. To integrate text messaging capabilities into your web, mobile, or desktop apps, use this API.

![Diagram showing SMS sent from app to phone via Twilio API with HTTP request and response.](https://docs-resources.prod.twilio.com/36e61eb8840fc0d112b7c00333e6efedba7f6a690f0dbe637e469548a08295b6.png)

To send delivery or status updates to your business, [Twilio Notify][] can help you add SMS Notifications and other channels. To learn about other common use cases such as SMS Marketing to your business's repertoire, see the Twilio [Resource Center][] for solutions.

### Related topics

* [Appointment Reminders][]
* [SMS Marketing][]
* [SMS Quickstarts][]
* [Dispatch Notifications][]
* [GSM-7][]
* [SMS character limit][sms-limit]
* [UCS-2 Character Encoding][UCS-2]

[1stsms]: http://news.bbc.co.uk/2/hi/uk_news/2538083.stm

[3GPP TS 23.140]: https://portal.3gpp.org/desktopmodules/Specifications/SpecificationDetails.aspx?specificationId=794

[Appointment Reminders]: https://www.twilio.com/en-us/use-cases/contact-center/appointment-reminders

[Dispatch Notifications]: https://www.twilio.com/use-cases/dispatch-notifications

[GSM 03.40]: https://en.wikipedia.org/wiki/GSM_03.40

[GSM-7]: /docs/glossary/what-is-gsm-7-character-encoding

[gsm]: https://www.gsma.com

[mms]: /docs/glossary/what-is-mms

[Programmable SMS]: https://www.twilio.com/en-us/messaging/channels/sms

[Resource Center]: https://www.twilio.com/en-us/resource-center

[smpp]: https://smpp.org

[SMS Marketing]: https://www.twilio.com/en-us/solutions/text-marketing

[SMS Notifications]: /docs/glossary/what-are-sms-notifications

[SMS Quickstarts]: /docs/messaging/quickstart

[sms-api]: https://www.twilio.com/en-us/messaging/channels/sms

[sms-limit]: /docs/glossary/what-sms-character-limit

[Twilio Notify]: /docs/notify

[UCS-2]: /docs/glossary/what-is-ucs-2-character-encoding
