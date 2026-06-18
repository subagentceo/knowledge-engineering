# Programmable Messaging

## Programmable Messaging

Send messages to customers across preferred channels like SMS, MMS, RCS, and WhatsApp with one API.

## Tutorial

```js !sample
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({ from: '+15557122661', body: 'Ahoy, world!', to: '+15558675310' })
  .then(message => console.log(message.sid));
```

1. Buy a Twilio phone number or port your phone number to Twilio.
2. Send a message using the Programmable Messaging REST API.
3. Twilio sends the "Ahoy, world!" text message to the recipient.

Tutorial code output: "Ahoy, world!"

[Find more examples](/docs/messaging/quickstart)

## SMS and MMS

Send and receive text and media messages programmatically. SMS messages don't require an app or an internet connection and have the highest open rates.

Build an app in minutes that sends your first SMS with Twilio.

* [Send your first SMS using code](/docs/messaging/quickstart)
* [Send your first SMS without using code](/docs/messaging/quickstart/no-code-sms-studio-quickstart)

### Find your use case

* [Appointment scheduling and reminders](/docs/messaging/tutorials/appointment-reminders)
* [Authentication & security](https://www.twilio.com/en-us/blog/sms-2fa-otp-5-minutes)
* [Order updates and delivery notifications](https://www.twilio.com/en-us/blog/developers/community/real-time-sms-order-notifications-magento-twilio-php)

### API reference

* [Create a new message](/docs/messaging/api/message-resource#create-a-message-resource)
* [Return a list of messages](/docs/messaging/api/message-resource#read-multiple-message-resources)
* [Delete a message](/docs/messaging/api/message-resource#delete-a-message-resource)
* [More Message resource actions](/docs/messaging/api/message-resource)
* [Media subresource actions for MMS](/docs/messaging/api/media-resource)

### Go further with SMS and MMS

* Comply with [A2P 10DLC](/docs/messaging/compliance/a2p-10dlc) and [TFN verification](/docs/messaging/compliance/toll-free/console-onboarding)
* Simplify scaling and get more features with [Messaging Services](https://www.twilio.com/docs/messaging/services)
* [Reuse messaging templates](/docs/content/create-templates-with-the-content-template-builder)
* [Prevent fraud](/docs/messaging/guides/preventing-messaging-fraud)

## RCS

Send text and media messages from your brand—not from a phone number—programmatically. RCS supports rich content (like [cards](/docs/content/twiliocard) or [carousels](/docs/content/carousel)), read receipts, and more.

* [Get started with RCS](/docs/rcs/onboarding)

### Find your use case

* [Marketing and promotions](/docs/rcs/onboarding#send-an-rcs-message)
* Feedback and surveys

### API reference

* [Create a new message](/docs/messaging/api/message-resource#create-a-message-resource)
* [Return a list of messages](/docs/messaging/api/message-resource#read-multiple-message-resources)
* [Delete a message](/docs/messaging/api/message-resource#delete-a-message-resource)
* [More Message resource actions](/docs/messaging/api/message-resource)
* [Media subresource actions](/docs/messaging/api/media-resource)
* [Rich content API](/docs/content/content-api-resources)

### Go further with RCS

* Simplify scaling and get more features with [Messaging Services](https://www.twilio.com/docs/messaging/services)
* [Reuse messaging templates](/docs/content/create-templates-with-the-content-template-builder)

## WhatsApp

Send and receive WhatsApp messages programmatically. WhatsApp supports more content types than SMS and allows end-to-end encryption.

* [Get started with WhatsApp](/docs/whatsapp/quickstart)

### Find your use case

* [Marketing and promotions](/docs/whatsapp/tutorial/send-and-receive-media-messages-twilio-api-whatsapp)
* [Customer support and chatbots](https://www.twilio.com/en-us/blog/ai-chatbot-whatsapp-python-twilio-openai)
* [Receipts and account updates](/docs/whatsapp/tutorial/send-whatsapp-notification-messages-templates)
* [Feedback and surveys](https://www.twilio.com/en-us/blog/create-whatsapp-survey-using-twilio-cakephp)

### API reference

* [Create a new message](/docs/messaging/api/message-resource#create-a-message-resource)
* [Return a list of messages](/docs/messaging/api/message-resource#read-multiple-message-resources)
* [Delete a message](/docs/messaging/api/message-resource#delete-a-message-resource)
* [More Message resource actions](/docs/messaging/api/message-resource)
* [Media subresource actions](/docs/messaging/api/media-resource)
* [Rich content API](/docs/content/content-api-resources)

### Go further with WhatsApp

* Simplify scaling and get more features with [Messaging Services](https://www.twilio.com/docs/messaging/services)
* [Reuse messaging templates](/docs/content/create-templates-with-the-content-template-builder)

## Facebook Messenger (public beta)

Send and receive Facebook Messenger messages programmatically. Facebook Messenger supports more content types, persistent conversations, and can cost less for high-volume messaging than SMS.

* [Get started with Facebook Messenger (public beta)](/docs/messaging/channels/facebook-messenger)

### Find your use case

* [Click-to-message marketing and promotions](/docs/messaging/channels/facebook-messenger)
* [Customer support and chatbots](https://www.twilio.com/en-us/blog/developers/tutorials/integrations/how-to-build-an-ai-chatbot-with-facebook-messenger--openai--and-)

### API reference

* [Create a new message](/docs/messaging/api/message-resource#create-a-message-resource)
* [Return a list of messages](/docs/messaging/api/message-resource#read-multiple-message-resources)
* [Delete a message](/docs/messaging/api/message-resource#delete-a-message-resource)
* [More Message resource actions](/docs/messaging/api/message-resource)
* [Media subresource actions](/docs/messaging/api/media-resource)
* [Rich content API](/docs/content/content-api-resources)

### Go further with Facebook Messenger

* [Reuse messaging templates](/docs/content/create-templates-with-the-content-template-builder)

https://www.youtube.com/watch?v=i9TBrFsKYjU

## Related Products

Verify, Conversations, and Flex are tailored toward specific use cases. Looking to build data-driven customer experiences? Check out Twilio Engage.

### Verify

Fight fraud and protect user accounts. Verify users via SMS, Silent Network Auth, voice, WhatsApp, TOTP, push, Silent Device Approval, and email.

[Product Docs](/docs/verify)

### Conversations

Build conversational messaging on multiple channels—web chat, WhatsApp, and SMS.

[Product Docs](/docs/conversations-classic)

### Studio

Twilio's no-code/low-code application builder. Build your messaging app in your browser.

[Product Docs](/docs/studio)

### Flex

Build your digital engagement center for sales and customer support teams.

[Product Docs](/docs/flex)

### Engage

Personalize your customer interactions on every channel from a unified, data-first multichannel marketing solution.

[Product Docs](https://www.segment.com/product/twilio-engage)
