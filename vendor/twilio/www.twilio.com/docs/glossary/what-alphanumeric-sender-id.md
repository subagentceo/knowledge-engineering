# Alphanumeric Sender ID

Your company name or brand displayed as the sender ID for one-way text messaging.

Alphanumeric Sender IDs must meet the following requirements:

* Send to [supported countries][country-support].
* Register the Sender ID when required.
* Limit length to 11 characters.
* Include both upper- and lowercase ASCII letters, the digits 0 through 9, and the space character.
* Include alphabetic characters. They can't be numbers only.

You can [add Alphanumeric Sender IDs to a Messaging Service][]. When you send SMS messages to a supported country, your Twilio Messaging Service sets your Alphanumeric Sender ID as the `From` parameter. When you send SMS messages to a country without Alphanumeric Sender ID support, Twilio uses a phone number from your messaging service.

To use Alphanumeric Sender IDs with your Messaging Service, turn on Alphanumeric Sender ID in the [SMS Settings][account-sms-settings] for your account.

## Related topics

* [Use Alphanumeric Sender ID with Messaging Services][support-article]
* [Getting Started with Alphanumeric Sender ID][get-started]

[country-support]: https://help.twilio.com/hc/en-us/articles/223133767-International-support-for-Alphanumeric-Sender-ID

[add Alphanumeric Sender IDs to a Messaging Service]: /docs/messaging/services

[account-sms-settings]: https://1console.twilio.com/go?to=/account/__account__/us1/sms/settings/general

[support-article]: https://help.twilio.com/hc/en-us/articles/223133867-Using-Alphanumeric-Sender-ID-with-Messaging-Services

[get-started]: https://help.twilio.com/hc/en-us/articles/223181348-Getting-started-with-Alphanumeric-Sender-ID
