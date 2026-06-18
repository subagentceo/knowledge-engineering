# What is Click-to-Call?

*Click-to-call*, sometimes called *click-to-talk* or *click-to-dial*, is a way to let people connect with a company representative by phone while they're browsing a website or in an app.

## Why Use Click-to-Call?

Your website or app may be full of useful information, but sometimes, your customers really just want to talk with a real, live person. Perhaps they want to know more about your product or service before they make the decision to buy, or maybe they have a support issue and don't want to wait around for email. Click-to-call creates a way for your customers to contact your sales and support teams right on your website.

![Flowchart of Twilio Click-to-Call process connecting a customer to service agents via API.](https://docs-resources.prod.twilio.com/932d52fec7e6d10df84bbdbf2a02cf31ae40d24ac5ee7173dcd2a2fc5180e7b3.jpg)

You may be wondering, "Do people really talk on the phone anymore?" The answer is, actually, yes!

Studies have shown that [88% of website visitors][] are more likely to contact your company if you provide a click-to-call button. And if they've taken the initiative to *talk* to you, chances are greatly increased they'll *buy* from you too.

The numbers really do speak for themselves. [Market research][] shows adding a click-to-call button can lead to a 200% increase in call-to-conversion rates. In addition to helping you increase sales and improve customer satisfaction, adding click-to-call functionality can help reduce negative impressions as well.

## How to Add Click-to-Call to Your Website or App

One way businesses can add a click-to-call system is through an [API][] like Twilio Voice. Twilio works with browsers built with JavaScript, Android, and iOS. Add-on features like [TaskRouter][] let you route calls to the best agent to provide an even better customer experience. There are two main ways click-to-call can work.

![Flowchart showing user entering phone number, website request to Twilio, and call initiation between user and agent.](https://docs-resources.prod.twilio.com/548ff321628b8e766e0acdb79f5e7689528b3bcb2f721f4faa96c888ef285eab.png)

### Within App or Browser

With one click, the user initiates a voice call directly from their browser or app. For example, [Airbnb][] created Voice Connect, a click-to-call application that lets hosts call potential guests by clicking a link on Airbnb's site or within the Airbnb app. With Voice Connect, hosts and guests connect using [masked numbers][], which allows them to keep their personal phone numbers private. Click-to-call uses [VoIP][] so the call connects over the internet rather than by phone.

### Receive a Call Back

A button, image, or text on the site or app lets the user enters a phone number and requests an immediate call back. While the call is being established, contextual information about the customer—such as their name, the page they're currently visiting, and any other relevant information the API can access—is passed to the representative on the call. The customer doesn't have to actually enter this information, the service knows it automatically. An HTTP request initiated by the web form initiates an outbound call to the user's phone number and the user gets their callback right away. This process allows users to receive highly personalized customer service, with the click of a button.

## Text or Voice?

Many companies choose to offer their customers both text chat and phone connection options, and find that the customer's device type affects their choice of channel. For example, Twilio customer [iAdvise finds that 70%][] of their customers opt for text chat when connecting to their site on desktop, while 30% choose voice calls. However, when customers are on mobile devices the percentages are reversed, with 70% of users selecting click-to-call to connect via voice and 30% choosing text chat.

## Click-to-Call Within a CRM

Another way that businesses use click-to-call is for sales and support agents working in a CRM. Twilio offers an integrated dialer that lets reps automatically place outbound calls with just one click. For example, with [Lightning Dialer in Salesforce][], one click calls a customer and opens their entire contextual record. Reps can take notes seamlessly, automatically log calls, drop pre-recorded voicemails, power through call lists, and more. This ability to "click" the phone number without manually entering it saves time, reduces errors, and increases agent efficiency.

## Get Started

Adding click-to-call to your website with a Twilio SDK is fast and can be accomplished in a matter of minutes. It's also affordable, with calls starting at a [very low cost per minute][]. And you always pay only for what you use—no monthly fees or sign-up costs.

Start with the [Add Click-to-Call documentation][]

[88% of website visitors]: https://www.flightmedia.co/blog/click-to-call

[Add Click-to-Call documentation]: /docs/voice/sdks/javascript/get-started

[Airbnb]: https://www.twilio.com/blog/airbnb-click-to-call-twilio-html

[API]: https://go.twilio.com/click-to-call

[iAdvise finds that 70%]: https://customers.twilio.com/846/iadvize

[Lightning Dialer in Salesforce]: https://www.twilio.com/blog/flex-contact-center-crm-integration

[Market research]: https://www.thinkwithgoogle.com/consumer-insights/click-to-call

[masked numbers]: /docs/proxy

[very low cost per minute]: https://www.twilio.com/en-us/pricing

[TaskRouter]: /docs/taskrouter

[VoIP]: /docs/glossary/what-is-voip
