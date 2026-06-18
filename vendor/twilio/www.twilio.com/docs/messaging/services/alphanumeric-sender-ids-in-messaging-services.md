# Alphanumeric Sender IDs in Messaging Services

## Feature Overview

[Alphanumeric Sender IDs](/docs/glossary/what-alphanumeric-sender-id) are used for branded one-way messaging. You can add an Alphanumeric Sender ID to the Sender Pool of your Messaging Service to enable this feature.

See [this overview document](/docs/messaging/services) on the benefits and features of using **Messaging Services** vs specifying individual phone number Senders for Messaging.

With Alphanumeric Senders, you can send your messages to customers from a customized, branded sender that you have added to your Messaging Service. Instead of using an [E.164](/docs/glossary/what-e164)-formatted Twilio phone number or Short Code for the From value, you can use a custom string such as your own business or organization name. Alphanumeric Sender IDs may be used at no additional cost when sending an SMS to [countries that support this feature](https://help.twilio.com/hc/en-us/articles/223133767-International-support-for-Alphanumeric-Sender-ID).

> \[!NOTE]
>
> NOTE: Support for sending messages from an Alphanumeric Sender depends on your destination (`To`) phone number and is not available everywhere. This feature is not available in the United States or Canada. See [this article for the full list of countries that support this feature](https://help.twilio.com/hc/en-us/articles/223133767-International-support-for-Alphanumeric-Sender-ID).

If you add an Alphanumeric Sender to your Twilio Messaging Service, Twilio will select the Alphanumeric Sender ID automatically when you send a message to a supported country, unless you also have a [short code number](https://help.twilio.com/hc/en-us/articles/223182068-What-is-a-Messaging-Short-Code-) in that same country.

## Benefits of messaging with Alphanumeric Sender ID

**Higher message deliverability**: In many countries, regulatory bodies are increasingly filtering illegitimate A2P SMS use cases to curb unwanted messaging. For every Alphanumeric Sender ID request, Twilio completes a rigorous due-diligence and registration process with the telecommunication carrier(s) in that country. Once this process is completed, Twilio handles fluctuating telecom logic, regulations, and carrier-specific rules to ensure your A2P messages reach their destination.\
**Improved brand recognition**: Because recipients see your name with every SMS sent, using a recognizable Alphanumeric Sender ID reinforces your branding.

**Increased open rates**: As cases of spam and fraud increase, being able to identify the sender is a key factor in whether recipients decide whether to open a message. If the sender is an international or unfamiliar number, the chance of the message being opened is next to none. With Alphanumeric Sender IDs, recipients immediately recognize the sender and know the message is legitimate. As a result, they are up to 80% more likely to open the message.\
**Alternative to 10DLC A2P messaging:** Alphanumeric Sender IDs can help circumvent the common challenges to A2P messaging as a high-throughput and low carrier filtering option. However, Alphanumeric Sender IDs are not available in the US or Canada.

* In most supported countries, customers can instantly provision an Alphanumeric Sender ID. These Alphanumeric Sender IDs are known as "dynamic."
* Some countries require pre-registration, which means the customer has to provide information and sometimes additional documents, resulting in additional vetting time before the Alphanumeric Sender ID can be used. These Alphanumeric Sender IDs are known as "pre-registered."

## Which countries support Alphanumeric Sender IDs?

You can find out which countries do and do not support Alphanumeric Sender IDs [on this page](https://help.twilio.com/hc/en-us/articles/223133767-International-support-for-Alphanumeric-Sender-ID). The document also indicates, for each country, whether an Alphanumeric Sender ID can be provisioned 'dynamically' or instantly, or whether **pre-registration** is required. In the latter cases, the link labeled "[Yes - Pre-Registration Required](https://1console.twilio.com/us1/develop/sms/senders/sender-id/new)" will take you to a form in the **Twilio Console** allowing you to initiate the pre-registration process for that country, including submission of any required documents. The country name itself will be a link taking you to the general SMS guidelines for that country.

## Limitations of Alphanumeric Sender IDs

As previously mentioned, Alphanumeric Sender IDs are not supported in some countries and some supported countries require pre-registration. Beyond this, be aware of the following further limitations:

* Alphanumeric Sender IDs are only supported for paid Twilio accounts; not for free trial accounts.
* Alphanumeric Sender IDs are only available for one-way outbound messages; recipients cannot reply directly to messages sent with Alphanumeric Senders (However, you can provide contact information in your message if you want recipients to respond).
* Some use cases are generally prohibited for Alphanumeric Sender messaging, just as they are using any other sender type (e.g., gambling, dating sites, adult content, spam, phishing, and any content that violates the law or infringes on intellectual property).
* In some countries, additional use cases are prohibited, which are noted in the [SMS Guidelines.](/en-us/guidelines/sms)

## Opt-In/Opt-Out Requirements

Users must specifically **opt in** to receive your messages and know how to **opt out** before you send your first message.

Note: Twilio's SMS **STOP** keyword does not work to automatically stop Alphanumeric Sender ID messaging. You must provide other instructions, such as writing a Support team, calling a Support phone line, or texting another phone number or code to allow users to opt out.

## Formatting Requirements

Alphanumeric Sender IDs can contain up to 11 characters, including upper- and lower-case letters, digits 0-9, and certain special characters. Find the detailed formatting requirements for Alphanumeric Sender IDs in [this Knowledge Base article](https://help.twilio.com/hc/en-us/articles/223133867-Using-Alphanumeric-Sender-ID-with-Messaging-Services).

> \[!NOTE]
>
> Note: In addition to the maximum length of 11 characters, some carriers may impose **minimum** length restrictions on Alphanumeric Sender IDs. This can result in your Alphanumeric Sender ID being modified or replaced by a generic sender ID, i.e. "unknown".

## How to add an Alphanumeric Sender ID

## Console

1. Access the [Programmable Messaging page in Console](https://1console.twilio.com/us1/develop/sms/settings/general).
2. Click **Settings**.
3. On the **General Messaging Settings** page, verify that **Alphanumeric Sender ID** is set to **Enabled**.

## Legacy Console

1. Access the [Programmable Messaging page in Console](https://www.twilio.com/console/sms/dashboard).
2. Click **Settings**.
3. On the **General Messaging Settings** page, verify that **Alphanumeric Sender ID** is set to **Enabled**.

Once you've verified that the status of this feature is Enabled, to add a specific new Alphanumeric Sender to a Messaging Service:

## Console

1. Go to your [Messaging Services in the Twilio Console](https://1console.twilio.com/us1/develop/sms/services).
2. Select the service you wish to add an Alpha Sender to.
3. Under the **Senders** section, click the **Add Senders IDs** button.
4. From the **Add Senders IDs** drop-down, select **Alpha Sender** and enter the alphanumeric sender ID that you want to add to the Sender Pool.

## Legacy Console

1. Go to your [Messaging Services in the Twilio Console](https://www.twilio.com/console/sms/services).
2. Select the service you wish to add an Alpha Sender to.
3. Under the **Senders** section, click the **Add Senders IDs** button.
4. From the **Add Senders IDs** drop-down, select **Alpha Sender** and enter the alphanumeric sender ID that you want to add to the Sender Pool.
