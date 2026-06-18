# What is an MMS?

MMS, short for *Multimedia Messaging Service*, is a standard way to send multimedia such as pictures, videos, and other attachments over text messaging channels.

## Send multimedia messages with MMS

MMS is an extension of the SMS ([Short Message Service](/docs/glossary/what-is-an-sms-short-message-service)) protocol, allowing the exchange of [text messages](https://en.wikipedia.org/wiki/Text_messages) exceeding 160 characters. Unlike SMS, which is text-only, MMS can deliver a variety of media. This media may include up to forty seconds of video, audio, one image, or a slideshow of multiple images. MMS requires a third-generation (3G) network to send large MMS messages (though smaller MMS messages may be transmitted over second generation networks using [GPRS](/docs/glossary/what-general-packet-radio-service-gprs)).

## How is an MMS message delivered?

When sending an MMS message, the sending device must encode the multimedia content, similar to sending a [MIME](https://en.wikipedia.org/wiki/MIME) message. The message then is forwarded to the carrier's MMSC (Multimedia Messaging Service Center), which is a [store and forward](https://en.wikipedia.org/wiki/Store_and_forward) server. The MMSC acts as a relay if the receiver is on a different carrier from the sender and forwards the MMS message to the MMSC of the receiving carrier.

On receipt of the MMS message by the recipient's MMSC, it determines whether the receiver's device is MMS capable (i.e. supports the standards for receiving MMS). Some MMSCs include conversion service that attempts to modify the content into a format suitable for the receiver. If the message's recipient does not have an MMS-capable device, the MMSC will often deliver the message to a web service. This way, the recipient can view the content from a browser after receiving the URL via an SMS message.

## Send MMS messages with Twilio

MMS with Twilio is currently supported in the US and Canada. Please see [our MMS page](https://www.twilio.com/en-us/messaging/channels/mms) for current information on Twilio's MMS offerings, including location availability.

Some benefits of sending MMS messages with Twilio:

* **Reach MMS-incompatible numbers -** By sending MMS messages with Twilio, your user's picture message automatically converts into an SMS with linked media.
* **Handle different carrier restrictions -** When you send an MMS with Twilio, we will automatically resize your MMS images to meet the receiving carrier's exact specifications.
* **Leverage bulk messaging -** Twilio offers support for 30 MMS per second with a Twilio [short code](/docs/glossary/what-is-a-short-code).

Check out our [documentation](/docs/messaging/quickstart) or this [blog post](https://www.twilio.com/blog/getting-started-with-twilio-mms-html) if you're eager to get started sending MMS messages with Twilio. Let's build something amazing.
