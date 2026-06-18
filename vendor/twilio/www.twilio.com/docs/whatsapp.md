# WhatsApp Business Platform with Twilio

## WhatsApp Business Platform with Twilio

Send and receive [WhatsApp](https://www.whatsapp.com/) messages using the [WhatsApp Business Platform](https://business.whatsapp.com/products/business-platform) and Twilio APIs. Build any use case for your business, such as support, notifications, verification, or personalized promotions.

[Get started now](#get-started-with-whatsapp)

## Tutorial

```js !sample
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
      .create({
        from: 'whatsapp:+14155238886',
        contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
        contentVariables: '{"1":"2025/7/15","2":"3:00p.m."}',
        to: 'whatsapp:+12345678901'
    })
    .then(message => console.log(message.sid))
```

1. Use the Twilio Sandbox for WhatsApp or register a WhatsApp sender.
2. Send a WhatsApp message using the Twilio Programmable Messaging API.
3. Twilio sends the WhatsApp message to the recipient.

Tutorial code output: "Your appointment is coming up on 2025/7/15 at 3:00p.m."

## Get started with WhatsApp

Build an application in minutes that sends your first WhatsApp message using the Twilio Programmable Messaging API. You can use the Twilio Sandbox for WhatsApp to prototype your application and test sending and receiving messages.

* [Send your first WhatsApp message](/docs/whatsapp/quickstart)
* [Guide to using the Twilio Sandbox for WhatsApp](/docs/whatsapp/sandbox)

## WhatsApp sender registration

A WhatsApp sender is a phone number associated with a [WhatsApp Business Account (WABA)](/docs/whatsapp/tutorial/whatsapp-business-account). To send WhatsApp messages under your own brand, you need to register a WhatsApp sender with Twilio.

* If you're a direct customer, register a WhatsApp sender using WhatsApp Self Sign-up.
* If you're an [Independent Software Vendor (ISV)](https://help.twilio.com/articles/4402930862747), register a WhatsApp sender through the WhatsApp Tech Provider Program.

- [WhatsApp Self-Sign up](/docs/whatsapp/self-sign-up)
- [WhatsApp Tech Provider Program](/docs/whatsapp/isv/tech-provider-program)

## Messaging options

### One-way messaging and notifications

With the [Twilio Programmable Messaging API](/docs/messaging), you can send one-way messages to your customers, such as notifications, alerts, and reminders.

## Sending One-Time-Passcodes (OTP)?

[Verify WhatsApp](/docs/verify/whatsapp)

WhatsApp is now a more cost-effective channel than SMS for sending OTPs in many regions. The [Verify WhatsApp API](/docs/verify/whatsapp) delivers OTPs across WhatsApp, SMS, RCS, and other channels to maximize conversion and reduce cost. The same OTP code is sent across all channels in a single verification session, simplifying code validation.

### Two-way conversational messaging

With the [Twilio Conversations API](/docs/conversations-classic/using-whatsapp-conversations), you can build conversational or back-and-forth messaging on WhatsApp. You can also build cross-channel customer experience across WhatsApp, SMS, MMS, and browser-based or mobile chat messages.

### Find your use case

* [WhatsApp notification messages with templates](/docs/whatsapp/tutorial/send-whatsapp-notification-messages-templates)
* [Marketing and promotions: Media messages](/docs/whatsapp/tutorial/send-and-receive-media-messages-twilio-api-whatsapp)
* [Customer support menu](/docs/studio/tutorials/customer-support-menu)
* [Customer support and chatbots](https://www.twilio.com//en-us/blog/ai-chatbot-whatsapp-python-twilio-openai)
* [Feedback and surveys](https://www.twilio.com/en-us/blog/create-whatsapp-survey-using-twilio-cakephp)

### API reference

* [Create a new message](/docs/messaging/api/message-resource#create-a-message-resource)
* [Return a list of messages](/docs/messaging/api/message-resource#read-multiple-message-resources)
* [Delete a message](/docs/messaging/api/message-resource#delete-a-message-resource)
* [More Message resource actions](/docs/messaging/api/message-resource)
* [Media subresource actions](/docs/messaging/api/media-resource)
* [Rich content API](/docs/content/content-api-resources)

### Learn more

* [Simplify scaling and get more features with Messaging Services](https://www.twilio.com/docs/messaging/services)
* [Key Concepts and terms](/docs/whatsapp/key-concepts)
* [Best Practices and FAQs](/docs/whatsapp/best-practices-and-faqs)
* [WhatsApp Business Accounts](/docs/whatsapp/tutorial/whatsapp-business-account)

## Related Products

### Messaging

Send and receive SMS/MMS/WhatsApp messages with the Twilio Programmable Messaging API.

[Product Docs](/docs/messaging)

### Verify

Fight fraud and protect user accounts. Verify users via SMS, Silent Network Auth, voice, WhatsApp, TOTP, push, Silent Device Approval, and email.

[Product Docs](/docs/verify)

### Conversations

Build conversational messaging on multiple channels: web chat, WhatsApp, and SMS

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
