# Phone Numbers

Twilio virtual phone numbers give you instant access to local, national, mobile, and toll-free phone numbers in over 100 countries for your voice call and messaging applications. Leverage local phone numbers for your customers to call and text, or use your own number.

Every phone number available through the Phone Numbers API goes through a rigorous screening process, including meticulous testing of network providers. This verifies that you and your customers don't receive unwanted calls and text messages meant for previous owners.

With the Phone Numbers APIs, you can [search for and buy](/docs/phone-numbers/api/availablephonenumber-resource) available Twilio phone numbers, [manage](/docs/phone-numbers/api/incomingphonenumber-resource) your Twilio numbers, port a phone number you own to Twilio, and more.

**Want to keep your existing phone number**? [Check if your number is portable](https://console.twilio.com/us1/develop/phone-numbers/port-host/portability-check) using the Console, or learn about [porting with the API](/docs/phone-numbers/port-in).

*Not a developer? Check out our [Phone Numbers product page](https://www.twilio.com/en-us/phone-numbers) for features, capabilities, and more information.*

## Alphanumeric sender IDs

Alphanumeric Sender IDs are a messaging feature that allows you to send SMS messages using a custom alphanumeric identifier instead of a phone number. This identifier can be up to 11 characters long and can include letters, numbers, and some special characters, making it perfect for brand recognition and professional messaging.

### Key benefits

* **Brand Recognition**: Use your company name or service identifier as the sender.
* **Professional Appearance**: Messages appear more official and trustworthy.
* **Global Reach**: Supported in many countries worldwide for international messaging.
* **No Two-way Messaging**: Alphanumeric sender IDs are designed for one-way messaging only.

### Availability and restrictions

Alphanumeric Sender ID support varies by country and mobile carrier. Some countries require pre-registration of sender IDs, while others have specific formatting requirements. Before implementing alphanumeric sender IDs in your application, check the country-specific messaging guidelines for your target markets.

### Getting started

To use alphanumeric sender IDs with Twilio:

1. Check country availability and requirements.
2. Register your sender ID if required by local regulations.
3. Configure your messaging service or use the Messaging API with your alphanumeric sender ID.
4. Test your implementation in supported markets.

For detailed implementation guidance, see the [Messaging documentation](/docs/messaging) and explore the messaging service configuration options. Learn more about [default sender ID configuration](/docs/phone-numbers/default-sender-id) for your messaging services.

> \[!NOTE]
>
> If you're an Australian Consumer customer, the [Twilio Critical Information Summary (CIS)](https://docs-resources.prod.twilio.com/documents/CriticalInformationSummaryTwilioPhoneNumbers.docx) is available.

> \[!WARNING]
>
> Several Phone Number products are in developer preview. Follow the links below to request early access:
>
> * [Global Phone Numbers Catalog API](https://www.twilio.com/en-us/phone-numbers)
> * [Hosted SMS](https://www.twilio.com/en-us/messaging/channels/sms)

## Explore the docs

Dive into API reference documentation, usage guides, and FAQs to get up and running with the Phone Numbers API:

* Search for and buy available numbers [in Twilio Console](/docs/numbers-and-senders/phone-number-senders) or by using the [AvailablePhoneNumber resource](/docs/phone-numbers/api/availablephonenumber-resource)
* [Manage your Twilio phone numbers using the IncomingPhoneNumber resource](/docs/phone-numbers/api/incomingphonenumber-resource)
* Read our recommended [best practices for phone number usage](/docs/phone-numbers/best-practices)

Get started with the Hosted Numbers API (developer preview):

* [Hosted SMS Quickstart](/docs/phone-numbers/hosted-numbers/quickstart)
* [Hosted Phone Numbers API reference](/docs/phone-numbers/hosted-numbers/hosted-numbers-api/hosted-number-order-resource)
* [FAQ](/docs/phone-numbers/hosted-numbers)

Check out the documentation for the Global Phone Numbers Catalog (in developer preview):

* [Global Phone Numbers Catalog overview](/docs/phone-numbers/global-catalog)
* [AvailableNumbers](/docs/phone-numbers/global-catalog/api/available-numbers)
* [FAQ](/docs/phone-numbers/global-catalog/faq)
