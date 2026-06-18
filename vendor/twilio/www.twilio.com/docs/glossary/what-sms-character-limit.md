# How long can a message be?

The number of characters that a service can transmit varies according to the service protocol and character encoding.

| Messaging service                           | Character encoding                                             | Characters per byte | Characters per<br />one segment message | Characters per<br />multi-segment message | Maximum length<br />of concatenated message |
| ------------------------------------------- | -------------------------------------------------------------- | ------------------- | --------------------------------------- | ----------------------------------------- | ------------------------------------------- |
| [*Short Message Service* (SMS)][SMS]        | [Global System for Mobile Communications-7-bit (GSM-7)][GSM-7] | 1                   | 160                                     | 153                                       | 1,600                                       |
|                                             | [Universal Coded Character Set–2 byte (UCS-2)][UCS-2]          | 2                   | 70                                      | 67                                        | 700                                         |
| [*Rich Communications Services* (RCS)][RCS] | [Unicode Transformation Format–8-bit][UTF-8].                  | 1 to 4              | 160                                     | 153                                       | 1,600                                       |

## SMS message length and character encoding

SMS lets devices send and receive brief text messages. The designers intended for SMS to "fit in-between" other signalling protocols. The [Global System for Mobile Communications (GSM) 03.38 recommendation][GSM_03] limited a single SMS message to 140 bytes in length. This equals 1,120 bits or 160 7-bit characters. The [Short Message Peer-to-Peer protocol (SMPP)][SMPP] later codified SMS.

### Messages with characters outside the GSM-7 range

GSM-7 encompasses 128 different characters. GSM-7 isn't the same as the ASCII character set common to most North American computing devices.

To include characters from extended Latin or non-Latin scripts requires the two-byte Universal Coded Character Set (UCS-2) encoding. If your message includes a UCS-2 character like an emoji or a Chinese hanzi, SMS switches to the UCS-2 encoding. This reduces the character length limit of the message to 70 characters: 140 bytes divided by two-bytes per character.

> \[!NOTE]
>
> Your text editor changes `"` to `“`: a "curly" or "smart" quotation mark. Your message includes a UCS-2 encoded character. This reduces the single message character limit from 160 to 70. If the message exceeds 70 characters, it splits the message into two or more messages with 67 characters each.

### Messages longer than 160 bytes

To send longer SMS messages, the mobile infrastructure uses *Message concatenation*. SMS splits messages longer than 160 characters into parts called [*segments*][blog-segment], then are re-assembled when they received. Segmented SMS messages transmit 153 characters of data and seven-characters of metadata called a [User Data Header][]. This header contains the instructions for reassembling segments into messages. The recipient's device re-assembles the segments into the original message. GSM-7 messages contain 153 alphanumeric characters. UCS-2 encoded messages contain 67 [Unicode][] characters. As an exception, toll-free multi-segment SMS messages sent to the US or Canada support 152 characters per segment for GSM-7 messages and 66 for UCS-2 messages.

> \[!NOTE]
>
> SMS transmits a 161-character, GSM-7 encoded message as two segments: one with 153 characters and a second with eight characters.

## Twilio Smart Encoding and messaging costs

The Twilio platform supports long messages up to 1,600 characters across all Programmable Messaging channels, including SMS.

Twilio bills SMS per message segment sent. A message of 140 characters that includes one non-GSM character gets split into two segments. To avoid the cost of a second message segment, remove that UCS-2 character.

To assist in reducing messaging costs, turn on the Twilio Smart Encoding feature. This feature replaces certain [non-GSM characters with equivalent GSM characters][smart-enc-charlist] on your behalf.

> \[!NOTE]
>
> The GSM-7 encoding doesn't include curly quotation marks (`“”`). Twilio Smart Encoding replaces them with straight quotation marks (`""`).

* To improve deliverability and user experience, Twilio recommends keeping SMS messages under 320 characters. To learn why, see [this Twilio Help Center article][].
* To check messages for character length and cost, use the [Twilio Message Segment calculator][segment-calculator] before you send them. This tool flags any characters that force sending the message with UCS-2 encoding. With this information, you can decide if you want to remove those characters and reduce the cost per message.
* To check the character encoding of any Twilio SMS message sent from your account, view the message in your Twilio Console logs.

## RCS message length and character encoding

Rich Communications Services (RCS) use [Unicode Transformation Format (UTF) 8-bit][UTF-8] character encoding. UTF-8 natively supports Unicode characters like emojis and non-English characters. When sent over SMS using UCS-2 encoding, these characters increase segment counts. As defined, [RCS][] sends messages up to 1,600 characters in length to a device without segmentation.

The carriers define the RCS ecosystem and therefore support two region-specific billing models for text-only RCS messages.

* Delivery to US recipients gets billed for each 160 UTF-8 character segment, like SMS.
* Delivery to international recipients gets billed for each message.

[GSM_03]: https://en.wikipedia.org/wiki/GSM_03.38

[GSM-7]: /docs/glossary/what-is-gsm-7-character-encoding

[RCS]: /docs/rcs/send-an-rcs-message

[segment-calculator]: https://twiliodeved.github.io/message-segment-calculator

[smart-enc-charlist]: /docs/messaging/services/smart-encoding-char-list

[SMPP]: https://en.wikipedia.org/wiki/Short_Message_Peer-to-Peer

[SMS]: /docs/glossary/what-is-an-sms-short-message-service

[this Twilio Help Center article]: https://help.twilio.com/hc/en-us/articles/360033806753-Maximum-Message-Length-with-Twilio-Programmable-Messaging

[UCS-2]: /docs/glossary/what-is-ucs-2-character-encoding

[UTF-8]: /docs/glossary/what-utf-8

[Unicode]: https://home.unicode.org

[blog-segment]: https://www.twilio.com/blog/what-the-heck-is-a-segment-html

[User Data Header]: https://en.wikipedia.org/wiki/User_Data_Header
