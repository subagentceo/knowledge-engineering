# Debugging Common Issues with SMS

There are several common issues users run into when sending or receiving SMS messages. This guide outlines a few of the most common problems and provides troubleshooting tips:

* [My message wasn't delivered](#my-message-wasnt-delivered)
* [I'm not receiving SMS messages on my Twilio phone number](#im-not-receiving-sms-messages-on-my-twilio-phone-number)
* [From/To pairs violating blocked sender rules](#fromto-pairs-violating-blocked-sender-rules)
* [Why do I encounter duplicate messages?](#why-do-i-encounter-duplicate-messages)

## My message wasn't delivered

There are several ways to troubleshoot an undelivered SMS message.

1. Check your [Messaging logs](https://console.twilio.com/us1/monitor/logs/sms) for a record of the SMS request. If you don't see a record of your message at all, the message likely encountered an error in your application or potentially with Twilio's API:

   * You can look at your [error logs](/docs/messaging/guides/debugging-tools#error-logs) to see what error was caught, if any.
2. If the SMS isn't in your logs and your application code is generating an error:
   * You can find some [sample requests for sending SMS messages](/docs/messaging/quickstart) in your language of choice in our documentation. These sample requests can help isolate any syntax issues that may have cropped up in your code.
3. If you can't find the SMS in your logs and you received an error from Twilio:
   * If you received a `4XX` response from Twilio's API, Twilio encountered a problem and wasn't able to send the message. You can look up the code you received [in this list of errors](/docs/api/errors).
4. If the message is marked `Undelivered` or `Failed` in the Twilio logs:
   * In this case, Twilio received a delivery receipt from one of our carriers indicating that the message wasn't delivered. This can happen for [several reasons](/docs/messaging/api/message-resource), including [carrier content filtering](https://help.twilio.com/hc/en-us/articles/223181708-Can-my-Twilio-SMS-messages-be-blacklisted-as-spam-) or the availability of the destination phone.

[Read more in the Troubleshooting Undelivered Twilio SMS Messages support article.](https://help.twilio.com/hc/en-us/articles/223181868-Troubleshooting-Undelivered-Twilio-SMS-Messages)

## I'm not receiving SMS messages on my Twilio phone number

There are several questions you should ask if messages aren't reaching your Twilio number:

1. Is your Twilio number SMS-enabled? Does it have a [webhook](/docs/glossary/what-is-a-webhook) configured?
   * Log in to your Twilio account and go to the [My Inventory page](hhttps://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory).
   * Any number that shows the SMS icon can send and receive SMS messages:

     ![Table showing SMS and MMS capable phone numbers in Seattle, WA with monthly fee and buy option.](https://docs-resources.prod.twilio.com/6ef7c612e17d53cb5afdb25a803d28795a4939e809f3d473bfbe1e2af1f4ae60.png)
   * If there is no icon under **SMS**, your Twilio number does not have SMS capabilities. Click on **[Buy a Number](https://www.twilio.com/console/phone-numbers/search)** to purchase an SMS-enabled Twilio number.
   * Messages are showing up in the Twilio Console under [Programmable Messaging Logs](https://console.twilio.com/us1/monitor/logs/sms). To send these incoming messages to your application, you need to set up a webhook (a way for your application to receive real-time data) on the receiving number, WhatsApp sender, or messaging service. Alternatively, you can use [Event Streams](/docs/events) (a Twilio API for streaming data into your existing systems) for incoming messages. Refer to the following resources to get started:
     * [Incoming message webhook](/docs/usage/webhooks/messaging-webhooks#incoming-message-webhook)
     * [Register WhatsApp Senders using self sign-up](/docs/whatsapp/self-sign-up)
     * [Register WhatsApp Senders via API](/docs/whatsapp/register-senders-using-api)
     * [Event Streams webhook quickstart](/docs/events/webhook-quickstart)
2. Are you expecting to receive SMS messages from international numbers?
   * Some international carriers aren't able to successfully pass off SMS messages to Twilio's network. Because of this, Twilio cannot guarantee that international messages will always be received.
   * If you're receiving domestic but not international SMS messages, we recommend contacting the international sending carrier.
3. Are you roaming or off your network?
   * Twilio can't guarantee the deliverability of SMS messages from roaming phone numbers. Twilio doesn't have the ability to determine whether or not the phone number you are sending messages from is roaming at the time.
4. Are you expecting to receive SMS messages from a short code?
   * You can now configure long code numbers on your Twilio account to receive messages from short codes.
   * Your account must have a Twilio number from the same country as the short code from which you expect to receive messages. Short code numbers are always country-specific and can only communicate with numbers from the same country.
   * [Contact Twilio Support](https://help.twilio.com) to have this option enabled on your account. It's important to note that even when enabled, we can't always guarantee the deliverability of these incoming messages due to factors outside Twilio's control.

## From/To pairs violating blocked sender rules

When sending messages, you may see a response from Twilio about the message's `From/To` pair violating delivery rules. The Twilio API returns this message if you attempt to send an SMS or MMS to a recipient who has previously replied `STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, or `QUIT` to your Twilio number. You won't be charged for this send attempt.

When a user opts out of receiving communications from a phone number that belongs to a Messaging Service, they're also opted out of all messages sent from that particular Messaging Service.

If you want to send messages to a recipient who has opted out this way, they must first text `START` or `YES` to your Twilio number to opt in again.

## Why do I encounter duplicate messages?

The best way to begin debugging duplicate message issues is to review your [Messaging logs](/docs/messaging/guides/debugging-tools). You should look for a record of the message in question, as well as other messages that are duplicates sent within seconds of each other.

If you find duplicate messages sent within a few seconds of each other in your logs, it means that Twilio sent multiple messages to the carrier. This almost always means that Twilio received multiple `POST` requests from your application. Check the HTTP request logs on your server to examine the requests you sent to Twilio.

It's extremely rare for Twilio's system to create a duplicate message without receiving a `POST` from your application. If you've checked your server logs and only see one request to Twilio, let us know by [contacting support](https://www.twilio.com/help/contact) with the SIDs of the duplicated messages.

If you find only one message in your logs, it means that Twilio sent just one message to the carrier and the duplication happened within the carrier's system. Users with all types of phones do occasionally receive duplicate messages. This is often a safeguard that carriers implement when they suspect there may have been a service disruption. Duplicate messages may also occur when the recipient is roaming.

If duplicate messages occur for an extended time and with several different recipient carriers, please let us know by collecting the message records of the duplicated messages and [contacting support](https://www.twilio.com/help/contact).
