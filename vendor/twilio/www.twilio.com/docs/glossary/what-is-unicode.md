# What is Unicode?

Unicode is an international character encoding standard that provides a unique number for every character across languages and scripts, making almost all characters accessible across platforms, programs, and devices.

## Unicode History

Before Unicode, there were hundreds of different character encodings for assigning letters and other characters to a number that could be read by a computer.

The limitations of this system meant that it couldn't encode enough characters to cover all of the world's languages, and could not, in fact, hold all letters, punctuation, and technical systems in common use. Conflicts between character encodings also meant that two encodings could use the same number for two different characters, or even multiple numbers for the same character. Any computer would need to support multiple encodings, and this system created a high risk of data corruption when data passed through different machines or between different encodings.

In October 1991, the [Unicode Consortium's goal](https://www.unicode.org/press/seachange.html) to "unify the many hundreds of conflicting ways to encode characters, replacing them with a single, universal standard" was realized with the publication of version 1.0 of the Unicode Standard.

## Unicode Basics

Unicode provides a unique number for every character including punctuation marks, mathematical symbols, technical symbols, arrows, and characters making up non-Latin alphabets such as Thai, Chinese, or Arabic script. Since its inception, Unicode has been adopted by all modern software providers, allowing the transportation of data through devices, applications, and platforms without corruption. It is now used in all major operating systems, browsers, search engines, laptops, smartphones, and across the internet.

Unicode is maintained by the [Unicode Consortium](https://en.wikipedia.org/wiki/Unicode_Consortium), a non-profit organization that exists to develop and promote the Unicode Standard. Changes to the Unicode Standard must be approved by both the consortium as well as the international standard [ISO/IEC 10646](https://en.wikipedia.org/wiki/Universal_Coded_Character_Set), ensuring that character assignments are kept in sync. The Unicode Standard and ISO/IEC 10646 support three encoding forms: `UTF-8`, `UTF-16`, and `UTF-32`. Each of these encoding forms uses a common repertoire of characters, and allow for encoding as many as a million characters.

## Unicode SMS Messages

"Unicode SMS" refers to SMS messages sent and received containing characters not found in the [GSM-7 character set](/docs/glossary/what-is-gsm-7-character-encoding). An SMS allows up to 160 characters from the GSM-7 character set (see more on the [SMS Character Limit](/docs/glossary/what-sms-character-limit)), which includes all Latin characters A-Z, digits 0-9, plus a few special characters. Unicode handles any known character but also takes up more SMS space than GSM's 7-bit binary code. Therefore, Unicode SMS messages are limited to 70 characters, and messages longer than this will be segmented. See more about [UCS-2 character encoding](/docs/glossary/what-is-ucs-2-character-encoding), used for SMS messages which aren't encoded in GSM-7.

## Handling Unicode with Twilio

By default, SMS messages sent with Twilio support Unicode via UCS-2 character encoding to accurately represent global languages as they're sent between different geographic locations and across carriers.

[Smart Encoding](/docs/messaging/services), built into Twilio's Messaging Copilot, can help you [avoid using Unicode characters that often go unnoticed](https://www.twilio.com/blog/copilot-just-got-even-smarter-announcing-smart-encoding-html) by checking for Unicode characters such as smart quotes or Unicode whitespaces and [replacing them with similar GSM-7 characters](/docs/messaging/services/smart-encoding-char-list).

Whether you're trying to avoid unintentional Unicode characters sneaking into your carefully crafted SMS messages or sending messages written in [Kanji](https://en.wikipedia.org/wiki/Kanji), Twilio SMS has you covered.

## More Information on Unicode Support and Twilio

* [Common SMS Problems: Unicode](https://www.twilio.com/blog/common-sms-problems-unicode-twilio-html)
* [Smart Encoding with Twilio's Messaging Copilot](https://www.twilio.com/blog/copilot-just-got-even-smarter-announcing-smart-encoding-html)
* [Twilio Messaging API](/docs/messaging/api)
* [Twilio SMS Features](https://www.twilio.com/en-us/messaging/channels/sms)
* [UCS-2 Character Encoding](/docs/glossary/what-is-ucs-2-character-encoding)
* [GSM-7 Character Encoding](/docs/glossary/what-is-gsm-7-character-encoding)
