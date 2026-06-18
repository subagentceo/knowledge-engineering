# What to know before sending international SMS messages

Using the Short Message Service (SMS) across national boundaries has more considerations than getting a phone number.

People and organizations use Twilio to send SMS messages. Carriers consider all SMS messages from Twilio to be *application-to-person* ([A2P][]), as your Twilio *app* sends messages to, and receives messages from, *people*. This behavior differs from *person-to-person* ([P2P][]). Carriers consider P2P as communications between two or more people. To compare A2P to P2P, see the [related Twilio Help article][help-a2p-p2p].

Countries and carriers subject A2P traffic to different rules. Depending on the country to which you send SMS messages, you need to consider four factors:

* What guidelines exist in the target country
* How you want to identify yourself to recipients
* What type of text you need to send
* What type of other media you need to send

## Target country guidelines

> \[!CAUTION]
>
> Make sure to comply with country regulations on phone numbers. Both Twilio and our customers must adhere to local country regulations. This often means you must provide adequate identity documentation to carriers or local regulators. Failure to do so creates a risk of disruption of service. Check the [regulatory guidelines][] for phone numbers in the countries you want to target.

Recipients of your SMS messages might span the world. The guidelines you need to follow in sending SMS messages depend on where your recipients got their device. Twilio refers to the country in which recipients live as the *target country*. You must follow any [A2P guidelines about SMS of the target country][country-sms]. These guidelines might affect the timing, content, and permissions of your SMS messages.

> \[!NOTE]
>
> * [France][sms-fr] and [India][sms-in] limit the times for sending promotional messages and require opt-in from message recipients.
> * [Japan][sms-jp] and [Saudi Arabia][sms-sa] filter out gambling-related or objectionable content.

## Sender identification

These guidelines also affect how [senders identify themselves to recipients][sender identity]. When only a physical device with an assigned phone number could send messages, the Sender ID was the same as the phone number. As senders cover a variety of devices and systems, the sender needs a Sender ID. Twilio refers to the country of the SMS sender as the *origin country*. A Sender ID takes three formats: a [long code][], a [short code][], or an [alphanumeric ID][alpha-id]. These formats vary in throughput capability, content type, and pricing.

Twilio offers the following Sender ID types:

### Long codes

These IDs send and display between 10 and 15 digits formatted per the [*International Telecommunication Union* (ITU)][itu] [E.164][] standard.

* Twilio provides these on demand for [local, national, mobile, and toll-free numbers][lc-numbers] in 190 countries.
* Use long codes for low-volume messaging, like anonymous chatting applications and customer service communications.
* Some countries refer to these IDs as ten-digit long codes (10DLC).

### Short codes

These IDs send and display between three and seven digits depending on the [origin country][sc-numbers].

* [Each country][sc-numbers] defines the length of the short codes it provides.
* [Not all countries][sc-numbers] support short codes, nor do they support short codes from one country to send to another country.
* Use short codes for high-volume, time-sensitive A2P messaging, such as two-factor authentication ([2FA][2fa]) notifications, reminders, and marketing communications.
* Carriers must approve short codes. This can take between 8 to 12 weeks with [setup, recurring, and per-message charges][sc-pricing].
* Twilio manages the carrier approval process for [US, UK, and Canadian short codes][sc-US-UK-Canadian-apply].

### Alphanumeric sender IDs

These IDs present as a maximum of 11 alphanumeric characters.

* Each target country can choose to accept this ID depending upon their regulations and 53 countries require ID registration.
* [Alphanumeric Sender IDs][alpha-id] can include:
  * Any digit 0 through 9
  * [all uppercase and lowercase non-diacritical alphabetical characters][ASCII letters]
  * spaces
  * some special characters: `+`, `-`, `&`, `_`. Some countries also support `.`.
* One hundred eighty-six countries support Alphanumeric Sender IDs.
* WhatsApp doesn't support Alphanumeric Sender IDs.
* Use Alphanumeric Sender IDs for low-volume, one-way messaging with branding.
* If you use an Alphanumeric Sender ID with a [Twilio Messaging Service][alpha-id], Twilio selects the Alphanumeric Sender ID when you send a message to a supported country.
* These Sender IDs differ from a [Caller ID Name (CNAM)][CNAM].
  * A CNAM determines what a voice call recipient sees on their device in place of a long code. The CNAM doesn't display for SMS messages.
  * An Alphanumeric Sender ID serves as the code itself. It isn't masking another number or code.

### Summary of Sender ID features

The following table outlines the support, throughput (in messages per second or Mps), registration requirements, timing, and general costs for the various Sender IDs.

| Sender ID type           | Country support             | Mps | Country registration | Application time | Cost               |
| ------------------------ | --------------------------- | --- | -------------------- | ---------------- | ------------------ |
| [long code][] or 10DLC   | US, Canada                  | 1   | [Yes][a2p-10dlc]     | 1 week           | [Low][lc-pricing]  |
| toll-free                | US, Canada                  | 3   | [Yes][tfv]           | 1 week           | Low                |
| [long code][]            | [190 countries][lc-numbers] | 10  | Varies               | Varies           | Varies             |
| [short code][]           | [14 countries][sc-numbers]  | 100 | Varies               | 8-12 weeks       | [High][sc-pricing] |
| [alphanumeric][alpha-id] | [186 countries][alphaids]   | 10  | Yes, in 53 countries | Up to 16 days    | Varies             |

## Text to data conversion

To display and transmit text characters, a technology needs to translate text into data. *Character encoding* covers how something determines how much data a text character needs and how the character gets translated. Some character encodings include only a few common characters while others provide as many as possible. The number of characters in an encoding is called a *character set*.

Twilio translates text characters into data using one of two standards: *Global System for Mobile* (GCM) communications and *Universal Coded Character Set* (UCS). GCM-7, the 7-bit character set for GCM, covers 128 of the common Latin-based characters. SMS, and Twilio, use GCM-7 as their default character encoding. UCS-2, the 16-bit character set, covers 65,535 characters including Chinese, Japanese, Korean, Hebrew, and Arabic characters among others. UCS-2 uses two bytes of data per character. When Twilio encounters a character not in the GCM-7 set, it changes the encoding of the entire message to UCS-2.

When SMS began, it limited messages to 140 bytes or 160 characters. To permit longer messages, SMS redefined messages as [message segments][msg-segment]. SMS could split the message when sent and recombine it when received. To split and recombine long SMS messages, Twilio uses [user data headers][]. These headers take six bytes per message.

Character encoding matters because Twilio bills per *message segment*, not per *message*.

| Encoding standard | Bits per character | Character set size | Characters per message segment |
| ----------------- | ------------------ | ------------------ | ------------------------------ |
| [GSM-7][gsm-7]    | 7                  | 128                | 153                            |
| [UCS-2][ucs-2]    | 16                 | 65,535             | 67                             |

## Multimedia support

Only the US and Canada support [Multimedia Messaging Service (MMS)][mms] messages. When sent to target countries that don't support MMS, the Twilio MMS Converter feature converts MMS to SMS. To turn off this feature, go to the [Twilio Console SMS Settings][console-settings-sms]. To let your recipient access the media, these SMS messages include a link in the message body.

## What's next

To start sending international SMS messages, figure out what type of message you want to send and to which audience. This *use case* helps you choose the best Twilio solution for sending global SMS.

### Prepare your SMS sender

1. Review legal considerations.
   * Review the [compliance concerns in your target countries][country-sms].
   * To reduce your exposure to fraud, review the Twilio [SMS Geo Permissions Guide][sms-geo].
2. Review your target country support for [long codes][lc-numbers], [short codes][sc-numbers], and [alphanumeric sender IDs][alpha-id].
3. Review the support in your target countries for [message concatenation, multimedia, two-way SMS, and UCS-2][country-sms].
4. Apply for your [long code][lc-apply], [short code][sc-apply], or [alphanumber sender ID][alpha-apply]. This may include additional regulatory paperwork to complete outside of Twilio.

### Review costs

1. Draft your SMS message.
2. Review how Twilio encodes and segments your SMS message using [this calculator][].
3. Review the [SMS pricing][lc-pricing] for the countries to which you plan to send messages.

### Prepare your message

1. Review how to use Twilio [Messaging Services][].
2. Review which mitigation features you need to send your message.
   * To have Twilio prioritize SMS delivery using short codes, add a short code to your [Messaging Service's sender pool][Messaging Service's sender pool].
   * If your target country doesn't support MMS, use the [MMS Converter feature][mms-converter] of the [Twilio Messaging Service][twilio-msg]. This feature converts MMS messages to SMS messages that contain a shortened URL to the full messages.

[2fa]: /docs/glossary/what-is-two-factor-authentication-2fa

[A2P]: /docs/glossary/what-a2p-sms-application-person-messaging

[alpha-id]: /docs/glossary/what-alphanumeric-sender-id

[alpha-apply]: https://www.twilio.com/en-us/blog/personalize-sms-alphanumeric-sender-id

[alphaids]: https://help.twilio.com/hc/en-us/articles/223133767-International-support-for-Alphanumeric-Sender-ID

[ASCII letters]: http://sticksandstones.kstrom.com/appen.html

[CNAM]: https://help.twilio.com/articles/360051670533-Getting-Started-with-CNAM-Caller-ID

[console-settings-sms]: https://www.twilio.com/console/sms/settings

[country-sms]: https://www.twilio.com/en-us/guidelines/sms

[E.164]: /docs/glossary/what-e164#twilio-docs-content-area

[sms-geo]: https://help.twilio.com/articles/223181108

[GSM-7]: /docs/glossary/what-is-gsm-7-character-encoding

[help-a2p-p2p]: https://help.twilio.com/articles/223133807-What-is-P2P-and-A2P-messaging-

[itu]: https://www.itu.int/

[lc-numbers]: https://www.twilio.com/en-us/phone-numbers

[lc-apply]: https://www.twilio.com/try-twilio

[lc-pricing]: https://www.twilio.com/en-us/sms/pricing/us

[long code]: /docs/glossary/what-long-code-phone-number

[Messaging Services]: /docs/messaging/services

[mms-converter]: /docs/messaging/services#mms-converter

[mms]: /docs/glossary/what-is-mms

[msg-segment]: https://www.twilio.com/blog/what-the-heck-is-a-segment.html

[P2P]: /docs/glossary/what-p2p-sms-person-person-messaging

[regulatory guidelines]: https://www.twilio.com/en-us/guidelines/regulatory

[sc-apply]: https://www.twilio.com/en-us/messaging/channels/sms/short-codes

[sc-numbers]: https://www.twilio.com/en-us/guidelines/short-code

[sc-pricing]: https://help.twilio.com/hc/en-us/articles/226460288-How-much-does-a-Short-Code-cost-

[sc-US-UK-Canadian-apply]: https://www.twilio.com/en-us/messaging/channels/sms/short-codes

[sender identity]: https://en.wikipedia.org/wiki/Mobile_marketing#Sender_ID

[short code]: /docs/glossary/what-is-a-short-code

[Messaging Service's sender pool]: /docs/messaging/services#sender-selection

[sms-fr]: https://www.twilio.com/en-us/guidelines/fr/sms

[sms-in]: https://www.twilio.com/en-us/guidelines/in/sms

[sms-jp]: https://www.twilio.com/en-us/guidelines/jp/sms

[sms-sa]: https://www.twilio.com/en-us/guidelines/sa/sms

[this calculator]: https://twiliodeved.github.io/message-segment-calculator/

[twilio-msg]: /docs/messaging/services

[UCS-2]: /docs/glossary/what-is-ucs-2-character-encoding

[user data headers]: https://en.wikipedia.org/wiki/Concatenated_SMS#Sending_a_concatenated_SMS_using_a_User_Data_Header

[tfv]: /docs/messaging/compliance/toll-free/console-onboarding

[a2p-10dlc]: /docs/messaging/compliance/a2p-10dlc
