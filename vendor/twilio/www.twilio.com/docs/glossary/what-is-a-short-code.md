# What's an SMS Short Code?

A numeric sender ID used for text messaging containing fewer digits than typical phone numbers.

[Short code numbers][sc-number] have between three and seven digits. This makes them shorter than their ten-digit long code counterparts. Short codes were designed for high-throughput, two-way messaging. Short codes support sending and receiving messages in both the [Short Message Service][sms] (SMS) and [Multimedia Messaging Service][mms] (MMS) formats.

Twilio offers short codes in a [number of countries][sc-supported].

## Short code use cases

If you plan to send more than 500 text messages a day from a [long code][], carriers might mark your messages as spam. To facilitate high volume and throughput of texts, carriers provide short code numbers. When you want to send thousands of messages, use short codes.

Developers use short codes for the following use cases:

* Marketing and promotions
* Alerts and notifications
* Two-factor authentication

## Short code costs

To use a short code, you pay a [setup charge][setup-cost], a [quarterly lease][lease-cost], and a [per-message cost][message-cost].

Each carrier sets their own charges for SMS and MMS messages, both incoming and outgoing. To send these messages, Twilio charges a very small additional fee.

## Obtain a short code from Twilio

You can [obtain a short code from Twilio][obtain-sc] or [migrate an existing one][migrate-sc].

[sc-supported]: https://www.twilio.com/en-us/guidelines/short-code

[lease-cost]: https://help.twilio.com/hc/en-us/articles/226460288-How-much-does-a-Short-Code-cost-#01FPSQ68RQRRMYSV0XA4W5PCMT

[long code]: /docs/glossary/what-long-code-phone-number

[message-cost]: https://www.twilio.com/en-us/sms/pricing/us

[migrate-sc]: https://help.twilio.com/hc/en-us/articles/223182268-Applying-to-migrate-your-short-code-to-Twilio

[obtain-sc]: /shortcode/guidance

[Reverse Numbers site]: https://reversenumbers.org/

[sc-number]: https://www.twilio.com/en-us/messaging/channels/sms/short-codes

[setup-cost]: https://help.twilio.com/hc/en-us/articles/226460288-How-much-does-a-Short-Code-cost-#01FPSQ68RPMBBNYQBRDF7PK61P

[short code lookup tool]: https://www.usshortcodes.com/find-short-code

[sms]: /docs/glossary/what-is-an-sms-short-message-service

[Telephone Wiki SMS page]: https://phone.fandom.com/wiki/SMS

[mms]: /docs/glossary/what-is-mms
