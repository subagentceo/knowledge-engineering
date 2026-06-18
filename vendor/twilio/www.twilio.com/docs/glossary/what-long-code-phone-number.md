# What is a Long Code?

A long code number is a standard phone number used to send and receive voice calls and SMS messages. Phone numbers are typically called "long codes" (10-digit numbers in many countries) when comparing them with SMS short codes (5-6 digit numbers).

For example, compare the following numbers in [national](https://en.wikipedia.org/wiki/National_conventions_for_writing_telephone_numbers) and [E.164](/docs/glossary/what-e164) formats.

| **Number**     | **Type**                     |
| -------------- | ---------------------------- |
| 894546         | Short Code (spells "TWILIO") |
| (415) 555-2671 | US long code National        |
| +14155552671   | US long code E.164           |
| 020 7183 8750  | UK long code National        |
| +442071838750  | UK long code E.164           |

Twilio allows you to get long codes numbers on-demand for [local, national, mobile, and toll-free](https://www.twilio.com/en-us/phone-numbers) in 50+ countries. You can programmatically [search for available phone numbers via API](/docs/phone-numbers/api/availablephonenumber-resource) and [purchase numbers via API](/docs/phone-numbers/api/incomingphonenumber-resource). Or [log in to find and purchase phone numbers](https://www.twilio.com/console/phone-numbers) via the Twilio Console.

Short codes are carrier approved to send A2P SMS and thus require carrier approval (typically an 8-12 week process). Twilio manages the carrier approval process for you for [US, UK, and Canadian short codes](https://www.twilio.com/en-us/messaging/channels/sms/short-codes).

To learn more about the differences, see [what is the difference between short codes and long codes](https://help.twilio.com/hc/en-us/articles/223134587-Why-use-a-short-code-instead-of-a-long-code-)?
