# Using Proxy with Channels

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

Proxy is able to bridge communications with more than just phone numbers. [Channels](/docs/messaging/channels) can also be leveraged to reach more customers via messaging apps like WhatsApp and Facebook Messenger.

Let's say you are building a ride sharing application and you want to connect riders to customers. Some of the riders may prefer to use a messaging application over SMS. In order to do this we will need to set up one or more channels for use with Proxy.

## Step 1: Install the channel

The first step is to [install the channel in the console](/docs/messaging/channels). Follow the documentation for the channel that you have selected (e.g. WhatsApp, Facebook Messenger).

## Step 2: Configure your Proxy service

The next step is to set up a Proxy Service (if you don't already have one configured). Make sure to copy down the service SID (it will start with "KS" followed by 32 hexadecimal digits). You will also need the Account SID for your Twilio account, which you can find on your Console dashboard. After that is complete return to the channel configuration page and set the `Callback Url` to your proxy service:

**Example:** `https://webhooks.twilio.com/v1/Accounts/ACXXXXXXXXXXXXXXXX/Proxy/KSXXXXXXXXXXXXX/Webhooks/Message`&#x20;

![Callback URL field with example webhook URL in Twilio Console.](https://docs-resources.prod.twilio.com/27dfc077fdb56f09b4d82dbad79d9d414d47ba9060d4bceda163d1ae1ce1fc19.png)

To connect your rider with their driver you will follow all the same steps that you normally would using Proxy. The only difference will be that instead of using the rider's phone number as the "identifier" you will use the rider's message application id (e.g. `messenger:+1415XXXXXXX`) and specify your "from" channel identifier (e.g. your Facebook Messenger page ID, `messenger:{page-id}`) as the proxy identifier.

Now when the rider contacts your channel (e.g. Facebook Messenger page ID), their message will get forwarded directly to the driver and the driver will be able to message back to the customer's messaging application.
