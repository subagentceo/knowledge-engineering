# What is UCS-2 Character Encoding?

UCS-2 is a character encoding standard in which characters are represented by a fixed-length 16 bits (2 bytes). It is used as a fallback on many GSM networks when a message cannot be encoded using [GSM-7](/docs/glossary/what-is-gsm-7-character-encoding) or when a language requires more than 128 characters to be rendered.

## The Basics of UCS-2 Encoding and SMS Messages

UCS-2 and the other UCS standards are defined by the International Organization for Standardization (ISO) in ISO 10646. UCS-2 represents a possible maximum of 65,536 characters, or in [hexadecimals](https://en.wikipedia.org/wiki/Hexadecimal) from 0000h - FFFFh (2 bytes). The characters in UCS-2 [are synchronized](https://unicode.org/faq/unicode_iso.html) to the [Basic Multilingual Plane](https://unicode.org/roadmaps/bmp/) in Unicode.

*Character* is an overloaded term, so it is actually more correct to refer to [code points](https://en.wikipedia.org/wiki/Code_point). Code points allow abstraction from the *character* term, and are the atomic unit of storage of information in an encoding.

UCS-2 is a fixed-width encoding; each encoded code point will take exactly 2 bytes. As an SMS message is transmitted in 140 octets, a message which is encoded in UCS-2 has a maximum of 70 characters (really, code points): (140\*8) / (2\*8) = 70.

## How Twilio Encodes Your Messages

When sending SMS messages with Twilio, we'll automatically send messages in the most compact encoding possible. If you include *any* non [GSM-7](/docs/glossary/what-is-gsm-7-character-encoding) characters in your message body, we will automatically fall back to UCS-2 encoding (which will limit message bodies to 70 characters each). Additionally, Twilio prepends a [User Data Header](https://en.wikipedia.org/wiki/User_Data_Header) of 6 Bytes (this instructs the receiving device on how to assemble messages), leaving **153 GSM-7 characters** or **67 UCS-2 characters** for your message.

Note that this may cause more messages to be sent than you expect - a body with 152 GSM-7-compatible characters and a single Unicode character will be split into 3 messages when encoded in UCS-2. This will incur charges for 3 outgoing messages against your account.

### How Do I Check My Message Can Be Encoded in GSM-7?

[This page](https://twiliodeved.github.io/message-segment-calculator/) contains an interactive tool which can check if encoding your message in GSM-7 is possible, or if UCS-2 is needed.

### How Can I Avoid My Messages Being Split When I Expect Them to be in GSM-7?

Unfortunately, GSM-7 is not a supported character encoding in many text editors. Even setting encoding to ASCII (or US\_ASCII) will not guarantee that text you write will be limited to GSM-7. You can use the above linked tool to quickly check the number of segments - that is, total messages - some text will be divided into.

If you are writing in an editor with Unicode support you'll need to be particularly careful. Text editors designed for writing might automatically add angled smart quotes, non-standard spaces, or punctuation which looks similar to GSM-7 but is a different Unicode character. We've discussed a few of these issues [on our blog](https://www.twilio.com/blog/what-the-heck-is-a-segment-html).

### Why is UCS-2 Used on the GSM Networks when GSM-7 is the Default Alphabet?

In some languages, more than 128 symbols are commonly used, so a larger universe of potential characters is needed. UCS-2 has been implemented in many GSM networks and on many mobile devices, and is considered the de facto standard fallback.

### Is UCS-2 Encoding Obsolete?

By the Unicode standard, UCS-2 is an obsolete encoding because it wasn't designed to allow characters in the so-called [supplementary or 'astral' planes in Unicode](https://unicode.org/roadmaps/smp/). Plane 0, the Basic Multilingual Plane, contains character encodings for what are believed to be the most commonly used characters in modern languages. UCS-2 is limited to FFFFh [code points](https://en.wikipedia.org/wiki/Code_point), or 65,536 possible characters.

UTF-16 is the successor to UCS-2. And has the ability to address Base and 16 Supplementary planes, for a total maximum number of characters of 10FFFFh, or 1,114,112 code points.

## Ready to Try Twilio Programmable SMS and SMS - With GSM-7 and UCS-2 Support?

Sign up for a [free Twilio trial account today](https://www.twilio.com/try-twilio) - you'll have enough credit to explore the two major encodings we use, and a lot more.

## More Information on UCS-2 Encoding and Twilio

* [How much does it cost to send a message with more than 160 characters?](https://help.twilio.com/hc/en-us/articles/223133407-How-much-does-it-cost-to-send-a-message-with-more-than-160-characters-)
* [Why are my messages with Unicode being split?](https://help.twilio.com/hc/en-us/articles/223134307-Why-are-my-messages-with-unicode-being-split-)
* [What the heck is a segment?](https://www.twilio.com/blog/what-the-heck-is-a-segment-html)
* [Adventures in Unicode SMS](https://www.twilio.com/blog/adventures-unicode-sms)
* [Twilio REST API: Messages](/docs/messaging/api)
