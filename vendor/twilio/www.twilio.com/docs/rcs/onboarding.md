# Get started with branded RCS messaging

Unlike [Short Message Service (SMS)][sms], [Multimedia Messaging Service (MMS)][mms], or [Rich Communication Services (RCS)][rcs] between users, RCS business messaging doesn't send messages through a phone number. An RCS Sender, or RCS agent, sends RCS messages.

Messages sent from different RCS Senders display in separate conversation threads, similar to SMS or MMS messages sent from different phone numbers.

In this tutorial, you'll set up and configure [branded RCS messages][]:

1. [Create an RCS Sender][] and send test messages
2. [Register your RCS Sender][compliance]
3. [Update Messaging Service configuration][]

To learn more about RCS, see [RCS Business Messaging][].

## Limitations

* Only certain [countries](/docs/rcs/regional) support RCS messaging.
* You can't create or onboard RCS Senders programmatically at scale.

## Prerequisites

Complete these tasks before configuring RCS:

1. [Sign up for Twilio][].
2. Upgrade to a [paid Twilio account][].
3. [Set up Messaging Services][] with a phone number for SMS or MMS.
   * [Not all phone numbers can receive RCS messages][].
   * Messaging Services send messages using SMS or MMS when RCS messages fail or carriers don't support them.

## Set up RCS messaging

Follow these steps to set up and configure RCS messaging with Twilio.

To complete the setup process, allow four to six weeks or longer if you plan to launch in multiple regions.

### Create an RCS sender

## Console

1. Log in to the [Twilio Console][1c-console].
2. Go to **RCS** > [**Senders**][1c-rcs-senders].\
   The **RCS Senders** page appears.
3. Click **Create RCS Sender**.
4. Enter the name of your sender in the **Sender display name** box.
   > \[!NOTE]
   >
   > When creating multiple RCS Senders for the same brand (for example, "Owl Homes"),
   > use unique display names for each Sender so users can tell them apart in
   > their Messaging app. (for example, "Owl Homes Support" and "Owl Homes Promotion").
   > Carriers typically don't approve RCS Senders with the same display name and logo.
5. Review the terms and conditions. If you accept them, select **I acknowledge and agree to the foregoing terms and conditions**.
6. Click **Continue**. The **Create Sender: Public details** page appears.
7. Provide the following data. Twilio RCS requires values for all of these fields. Carriers in some countries have [Special Considerations][] regarding a Sender's public display.

   | Field                | Description                                                     | Requirements                                                                                                                                                                    | Devices      |
   | -------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
   | Display name         | Name shown to users                                             | Unique per RCS Sender                                                                                                                                                           | iOS, Android |
   | Description          | Brief summary of sender including how users interact with it    | Doesn't support HTML, JSON, Unix commands, or escaped characters.                                                                                                               | iOS, Android |
   | Logo image           | Brand logo in conversations                                     | JPEG, JPG, or PNG image, 224 x 224 pixels, max size 50kB, accessible from a public URL                                                                                          | iOS, Android |
   | Banner image         | Banner at top of conversation                                   | JPEG, JPG, or PNG image, 1140 x 448 pixels, max size 200 kB, accessible from a public URL                                                                                       | Android      |
   | Accent color         | Color of certain elements displayed                             | Can match brand colors. Use a [minimum contrast ratio of 4.5 to 1][contrast] compared to white. Enter a [HTML color code][hexcolor] or click the color icon and choose a color. | Android      |
   | Contact details      | One or more labeled phone numbers, email addresses, or websites | Requires at least one phone number or email address. Format phone numbers as [E.164][e164].                                                                                     | iOS, Android |
   | Privacy policy URL   | Link to brand privacy policy                                    | May need to be accessible in country's official language.                                                                                                                       | iOS, Android |
   | Terms of service URL | Link to brand terms of service                                  | May need to be accessible in country's official language.                                                                                                                       | iOS, Android |
8. Click **Next**. The **Create Sender: Try it out** page appears along with a banner that states **You have successfully updated the sender.**

## Legacy Console

1. Log in to the [Twilio Console][tw-console].
2. Go to **Explore Products** > **Programmable Communications** > **RCS**.\
   The [**RCS Senders** page][rcs-senders] appears.
3. Click **Create RCS Sender**.
4. Enter the name of your sender in the **Sender display name** box.
   > \[!NOTE]
   >
   > When creating multiple RCS Senders for the same brand (for example, "Owl Homes"),
   > use unique display names for each Sender so users can tell them apart in
   > their Messaging app. (for example, "Owl Homes Support" and "Owl Homes Promotion").
   > Carriers typically don't approve RCS Senders with the same display name and logo.
5. Review the terms and conditions. If you accept them, select **I acknowledge and agree to the foregoing terms and conditions**.
6. Click **Continue**. The **Create Sender: Public details** page appears.
7. Provide the following data. Twilio RCS requires values for all of these fields. Carriers in some countries have [Special Considerations][] regarding a Sender's public display.

   | Field                | Description                                                     | Requirements                                                                                                                                                                    | Devices      |
   | -------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
   | Display name         | Name shown to users                                             | Unique per RCS Sender                                                                                                                                                           | iOS, Android |
   | Description          | Brief summary of sender including how users interact with it    | Doesn't support HTML, JSON, Unix commands, or escaped characters.                                                                                                               | iOS, Android |
   | Logo image           | Brand logo in conversations                                     | JPEG, JPG, or PNG image, 224 x 224 pixels, max size 50kB, accessible from a public URL                                                                                          | iOS, Android |
   | Banner image         | Banner at top of conversation                                   | JPEG, JPG, or PNG image, 1140 x 448 pixels, max size 200 kB, accessible from a public URL                                                                                       | Android      |
   | Accent color         | Color of certain elements displayed                             | Can match brand colors. Use a [minimum contrast ratio of 4.5 to 1][contrast] compared to white. Enter a [HTML color code][hexcolor] or click the color icon and choose a color. | Android      |
   | Contact details      | One or more labeled phone numbers, email addresses, or websites | Requires at least one phone number or email address. Format phone numbers as [E.164][e164].                                                                                     | iOS, Android |
   | Privacy policy URL   | Link to brand privacy policy                                    | May need to be accessible in country's official language.                                                                                                                       | iOS, Android |
   | Terms of service URL | Link to brand terms of service                                  | May need to be accessible in country's official language.                                                                                                                       | iOS, Android |
8. Click **Next**. The **Create Sender: Try it out** page appears along with a banner that states **You have successfully updated the sender.**

### Try out the RCS sender

1. Click **Add device to test this sender**.
   * If you don't want to configure your Sender for incoming messages, click **Done**.
2. Enter your phone number in [E.164][e164] format in the box.
3. Click **Invite**.
4. The **RBM Tester Management** Sender sends a test RCS message to your phone.
5. To accept the invite, tap **Make me a tester** on your phone.
   Your phone displays this message:

   > You have been confirmed as a tester of the RBM agent: \<Display Name>.
6. The modal changes to **Send test message** and displays the following message:

   > **The owner of \<PHONE\_NUMBER> has accepted the tester invitation for this sender. The invite was sent to their SMS inbox.**

   Select the checkbox next to this message.
7. To send another test RCS message, enter a message in the **Your message** box.
8. Click **Send**.
9. Check your phone again. It should receive a message from the **Display name** you provided with the text of the message you wrote.
10. The **Send test message** modal refreshes and provides you a chance to send another message.
    * To send another message, write a message into the box then click **Send**.
    * To stop sending test messages, click **Cancel**. The modal closes.
11. If you don't want to add another test device, click **Done**. A congratulations page appears with next steps.
    * To submit your compliance page, click **Go to Compliance Registration tab** and skip to [**Register for compliance**][compliance].
    * To view your sender, click **View Sender**.

### Configure incoming message handling

To configure your app to accept inbound messages, complete the following procedure.

1. Click the **Configuration** tab.
2. On this tab, provide the following details:

   | Field                                  | Description                                                                                          | Values                                  |
   | -------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------- |
   | **Webhook URL for incoming messages**  | App endpoint that receives incoming messages.                                                        | Valid URL following [RFC 1808][rfc1808] |
   | **Incoming webhook method**            | HTTP method used to reach the incoming webhook URL.                                                  | `POST`, `PUT`                           |
   | **Fallback URL for incoming messages** | App endpoint targeted when the incoming messages URL can't be reached or a runtime exception occurs. | Valid URL following [RFC 1808][rfc1808] |
   | **Fallback webhook method**            | HTTP method used to reach the fallback webhook URL.                                                  | `POST`, `PUT`                           |
   | **Status callback URL**                | App endpoint that displays the delivery status.                                                      | Valid URL following [RFC 1808][rfc1808] |
   | **Status callback method**             | HTTP method used to reach the status callback URL.                                                   | `POST`, `PUT`                           |
   | **Assigned Messaging Service**         | Messaging service that your app uses.                                                                |                                         |
3. To finish creating the RCS Sender, click **Save configuration**.
   * To continue to edit and refine the RCS Sender, click **View Sender**.
   * To explore RCS, send RCS messages to phone numbers added as test devices, click the **Test** tab.
   * Before you may message phone numbers *not* added to your Sender as a test device, carriers must approve the RCS Sender. To submit your RCS Sender for approval, click [**Compliance registration** tab][compliance].

### Register your RCS Sender

If you haven't added the required data on the **Public details** page, the Twilio Console displays the following message and blocks further actions:

> **Your sender cannot be sent for approval**. Complete all required sender profile fields here to continue

Compliance registration requires data about your business. The details depend on where you register your RCS Sender.

## Non-US company

* Authorized representative contact details
* Descriptions of your opt-in and opt-out policies
* Opt-in policy images hosted on a publicly accessible URL.
* Description of your use case
* Video that shows the use case in action hosted on a publicly accessible URL

## US company

* Authorized representative contact details
* Descriptions of your opt-in and opt-out policies
* Opt-in policy images hosted on a publicly accessible URL.
* Description of your use case
* Video that shows the use case in action hosted on a publicly accessible URL
* US Business Registration ID
  * US companies provide your Employer Identification Number (EIN).
  * Non-US companies provide your Foreign Tax Identification Number (FTIN).
* Stock exchange and stock symbol for publicly traded companies
* Business address
* Brand contact mobile phone number
* Website traffic details
* Current SMS phone number and traffic details
* Sample messages and campaign details

When you have this data at hand, start the following procedures:

#### Select recipient countries

1. Click **Add countries**. The **Add countries** modal appears.
2. From the **Select destination countries for your RCS Sender** menu, select the countries in which you want to register your RCS sender.

   #### View the list of available countries

   * Austria
   * Belgium
   * Czech Republic
   * Denmark
   * Finland/Aland Islands
   * France
   * Germany
   * Ireland
   * Italy
   * Mexico
   * Netherlands
   * Norway
   * Poland
   * Portugal
   * Romania
   * Slovakia
   * Sweden
   * United Kingdom
   * United States

   If you choose **United States**, the modal adds information on the additional annual and submission fees involved with registering an RCS sender in the US. Twilio doesn't charge these fees. They come from the companies that verify your brand and submit your compliance registration.

   * To continue, click **I understand and agree to pay the above US RCS onboarding fees.**
3. If you approve of the list, click **Save countries**. The **Add countries** modal closes. A banner displays **You have successfully updated the sender.**
4. The **RCS Sender compliance** page displays the list of countries that you chose.
   * The first row lists all non-US countries or **Global requirement** if you didn't select any non-US countries.
     * The Registration name column displays **Google Registration** with the **What will I need?** link to an explanation of required data. If you click that link, the **What will you need to complete Google RCS registration?** panel appears and explains what data you need to provide. To close this panel, click ✖.
     * All of these countries display in the **Country** column.
     * The **Status** column displays **Not Started**.
     * The **Price** column displays the price associated with registration in US dollars (USD).
     * The **Actions** column displays a **Start** button and a trash can button so you can remove selected countries.
   * The second row displays the US in its own row.
     * The Registration name column displays **US Registration** with the **What will I need?** link to an explanation of required data. If you click that link, the **What will I need to complete US RCS registration?** panel appears and explains what data you need to provide. To close this panel, click ✖.

#### Register an RCS Sender with Google

If you didn't choose any country other than the US, you still must complete this section.

1. Click **Start** for the Google registration. The **Basic information** page appears.
2. Enter a human-readable label in the **General RCS registration friendly name**. This value can't exceed 64 characters.
3. Click **Next**. The **All countries are required to submit Google RCS registration.** page appears. It includes the same content as the **What will you need to complete Google RCS registration?** panel.
4. Click **Start**. The **Authorized representative** page appears.
5. Enter responses about the individual your company wants to register as its representative into the following fields.

   | Field                | Expected value                                                                             |
   | -------------------- | ------------------------------------------------------------------------------------------ |
   | First name           | The given name of your representative                                                      |
   | Last name            | The surname of your representative                                                         |
   | Email                | An RFC 5322 compliant email address of your representative                                 |
   | Business title       | The position your representative holds at your organization.                               |
   | Business website URL | The publicly available URL of your organization that holds some tie to your business name. |
6. Click **Next**. The **Describe your opt-in and opt-out policies for this sender** page appears.
7. Enter responses about how you get consumer consent for your RCS messaging.

   | Field                     | Character limit | Expected value                                                                                                                                                          | Example                                                                                                                                     |
   | ------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
   | Agent access instructions | 1,000           | A description of how reviewers of this registration can test the RCS sender.                                                                                            | *We offer a website where reviewers can invite and add phone numbers.*                                                                      |
   | Opt-in description        | 1,000           | A description of how consumers opt-in to receiving messages.                                                                                                            | *Consumers get offered the option to sign up at checkout.*                                                                                  |
   | Opt-in policy image URL   |                 | A publicly available URL that provides either a screenshot of the opt-in page, a web page where the consumer opts in, or a document that explains how consumers opt-in. | *https://example.com/userprefs*                                                                                                             |
   | Opt-out description       |                 | The message sent to a consumer from this sender when they opt out.                                                                                                      | *You've successfully unsubscribed from Acme, Inc. texts. You will no longer receive messages from this number. Reply START to resubscribe.* |
8. Click **Next**. The **Describe your messaging use case** page appears.
9. Enter responses to carrier-required data about both you and your messages.

   | Field                                            | Character limit | Expected value                                                                                                                                                                                      |
   | ------------------------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | What triggers messages to be sent to recipients? | 1,000           | Description of actions that trigger messages to consumers including timing of the first message sent to the consumer, consistent timing of messages, and the type of actions that trigger messages. |
   | Use case description                             | 1,000           | Description of how the RCS Sender interacts with consumers, including primary, common interactions and the secondary, possible interactions.                                                        |
   | Use case video URL                               |                 | A publicly available URL to a video that shows your core sender functionality and opt-out capabilities. This is for review purposes only.                                                           |
10. Click **Next**. The **Notification settings** page appears.
11. Enter responses about who and how you get updates on your RCS sender registration status.

    | Field               | Necessity | Expected value                                                                                                                      |
    | ------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
    | Notification email  | Required  | An RFC 5322 compliant email address. The email address you provided as part of your **Public details**. You can change the address. |
    | Status callback URL | Optional  | A publicly available URL that serves as an endpoint for a webhook.                                                                  |
12. Click **Next**. The **Review and submit** page appears.
13. Check the values you provided.
    * If they appear correct, click **Submit registration**. The **Thanks for completing your Google RCS registration!** page appears. Click **Finish**.
    * If they need correction, click **Back** until the relevant page displays and make your changes.
14. Your next steps depend on needing to get RCS sender approval for US recipients.
    * If you also need to get RCS sender approval with the US, continue to the next section.
    * If you don't need to get RCS sender approval with the US, continue to [Await RCS sender approval][].

#### Register an RCS Sender with the US

If you didn't choose any country other than the US, you still must complete the [previous section][register-google].

1. Click **Start** for the **US registration**.
2. Enter a human-readable label in the **US RCS registration friendly name**. This value can't exceed 64 characters.
3. Click **Next**. The **United States carriers require additional details to register your sender.** page appears. It includes the same content as the **What will I need to complete US RCS registration?** panel.
4. Click **Start**. The **Business information** page appears.
5. Enter responses about your company into the following fields.

   | Field                                 | Expected value                                                                                                                                                        |
   | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Legal business name                   | The Legal Company Name as stated on your IRS CP 575 EIN Confirmation Letter (US entities), or the name as registered with your local tax authority (non-US entities). |
   | Company type                          | The type of business that matches your business: Government, Nonprofit corporation, Private corporation, Public corporation, or Sole Proprietorship.                  |
   | Business registration issuing country | Leave this as **United States**.                                                                                                                                      |
   | Business registration number          | The US EIN or FTIN under which your business was registered.                                                                                                          |
   | Business industry                     | The industry that most closely matches that of the business.                                                                                                          |
   | Brand contact phone number            | A single phone number written in the [E.164][e164] format.                                                                                                            |

   #### View the list of industries

   * Agriculture
   * Communication
   * Construction
   * Education
   * Energy
   * Entertainment
   * Financial
   * Gambling
   * Government
   * Healthcare
   * Hospitality
   * Human resources
   * Insurance
   * Legal
   * Manufacturing
   * Nonprofit
   * Political
   * Postal
   * Professional
   * Real estate
   * Retail
   * Technology
   * Transportation
6. Click **Next**. The **Business address** page appears.
7. Enter your legal address associated with your business registration number into the field.
   * As you start typing, address options start displaying. Choose from the list or continue typing until you find your address.
8. Click **Next**. The **Details about your RCS use case traffic.** page appears.
9. Enter responses to the current and expected website traffic related to SMS, shortcode, and RCS messaging. All fields require a value, even if you don't use shortcodes at present. If that's the case, write `NONE`.

   | Field                                                               | Expected value                                                                                                        |
   | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
   | Monthly organic website traffic                                     | The monthly visits to the website associated with your use case expressed as an integer.                              |
   | Does this use case have existing short code traffic?                | Yes or No                                                                                                             |
   | Provide the existing short code associated with this use case       | A comma-separated list of shortcodes associated with your use case.                                                   |
   | Estimated monthly traffic volume for the existing short code number | The monthly visits to the website from the existing shortcodes associated with your use case expressed as an integer. |
   | Expected monthly RCS sender traffic volume                          | The expected monthly visits to the website from the RCS associated with your use case expressed as an integer.        |
10. Click **Next**. The **Details about your RCS campaign.** page appears.
11. Enter responses that describe your RCS campaign and how it handles opt-in, opt-out, and other informative messages.

    | Field                               | Character limit | Expected value                                                                                                                  | Example                                                                                                                                                          |
    | ----------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | Campaign description                | 1,000           | A clear and comprehensive overview of the campaign's objectives and interactions the consumer would experience after opting in. | *This campaign will send updates on scheduled moves, confirmations, real-time alerts, responses to inquiries, and special offers on moving or storage services.* |
    | Message flow and opt-in description | 1,000           | The step-by-step procedure that explains how consumers opt-in to messaging for this RCS Sender.                                 | *Consumer visits a page on our website. They complete a form. They select a checkbox declaring they consent to these RCS messages. They click submit.*           |
    | Help sample message                 |                 | An example of a message returned when the consumer sends a `HELP` command.                                                      | *We're sorry that you're having difficulties. To check your balance, press `1`. To pause your next shipment, press `2`. To have a rep call you, press `3`.*      |
    | Stop sample message                 |                 | An example of a message returned when the consumer sends a `STOP` command.                                                      | *You have been removed from our messages. Send `START` to restart messages.*                                                                                     |
    | Message service type                |                 | The single reason that you started this message campaign.                                                                       | See list that follows this table.                                                                                                                                |

    #### View the list of message service types

    * Account notification
    * Age gated content
    * Business operations
    * Conversational messaging
    * Delivery notification
    * Donation pledge
    * Education
    * Emergency alerts
    * Fraud alerts
    * Loan arrangement
    * Machine to machine
    * On behalf of carrier
    * Platform free trial
    * Political
    * Promotional marketing
    * Public service announcements
    * Security alerts
    * Social media
    * Sole proprietorship
    * Sweepstakes and contest
    * Two-factor authentication
    * Voting and polling
12. Click the **I acknowledge that my privacy policy clearly states we do not share text messaging consent information with third parties.** box.
13. Click the **I acknowledge that my Terms of Service include the following:** box.
14. Review the [CTIA handbook guidelines][ctia], then click the **I acknowledge that I have reviewed the CTIA handbook guidelines and this RCS Sender is in compliance with its requirements.** box.
15. Click **Next**. The **Notification settings** page appears.
16. Enter responses about who and how you get updates on your RCS Sender registration status.

    | Field               | Necessity | Expected value                                                                                                                      |
    | ------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
    | Notification email  | Required  | An RFC 5322 compliant email address. The email address you provided as part of your **Public details**. You can change the address. |
    | Status callback URL | Optional  | A publicly available URL that serves as an endpoint for a webhook.                                                                  |
17. Click **Next**. The **Review and submit** page appears.
18. Review the values you provided.
    * If they appear correct, click **Submit registration**. The **Thanks for completing your US RCS registration!** page appears. Click **Finish**.
    * If they need correction, click **Back** until the relevant page displays and make your changes.

#### Await RCS sender approval

Monitor your RCS Sender approval status.

* During the approval process, the RCS Sender displays an icon in the **Pending Review** column of the Senders table.
* Approval timelines vary by carrier.
* At any point you can reply to the initial support ticket to get an update.
* When one carrier goes live or receives approval in a given country, you can start using this RCS Sender in production.

### Update Messaging Service configuration

## Console

1. Add the RCS Sender to a Messaging Service.

   Once at least one carrier has approved, configure the RCS Sender for production use:

   1. Go to the [Messaging Services page in the Twilio Console][1c-tc-msg-svc].
   2. Choose from two options:
      * Go to the RCS Sender's **Configuration** tab and assign it to a Messaging Service.
      * Go to your Messaging Service's **Sender Pool** tab and add the RCS Sender.
2. Set up **Advanced Opt-Out** handling for the RCS Sender:
   1. Go to the [Messaging Services page in the Twilio Console][1c-tc-msg-svc].
   2. Click your Messaging Service and select **Opt-Out Management** from the sidebar.
   3. Configure opt-out keywords and responses in the local language of your target regions.
   4. Click **Enable Advanced Opt-Out**.

## Legacy Console

1. Add the RCS Sender to a Messaging Service.

   Once at least one carrier has approved, configure the RCS Sender for production use:

   1. Go to the [Messaging Services page in the Twilio Console][tc-msg-svc].
   2. Choose from two options:
      * Go to the RCS Sender's **Configuration** tab and assign it to a Messaging Service.
      * Go to your Messaging Service's **Sender Pool** tab and add the RCS Sender.
2. Set up **Advanced Opt-Out** handling for the RCS Sender:
   1. Go to the [Messaging Services page in the Twilio Console][tc-msg-svc].
   2. Click your Messaging Service and select **Opt-Out Management** from the sidebar.
   3. Configure opt-out keywords and responses in the local language of your target regions.
   4. Click **Enable Advanced Opt-Out**.

To learn more about Advanced Opt-Out, see [Customize users' opt-in and opt-out experience with Advanced Opt-Out][].

## Send and receive branded RCS messages

To learn how to send and receive branded RCS messages using the [Messages resource][], see [Send and receive branded RCS messages][].

You can also use Twilio Studio to send and receive RCS messages. To learn how to connect a Flow for inbound messaging and use the Studio API for outbound messaging, see [Use RCS messaging with Studio][].

## Stop using RCS

To stop using RCS, you can either send messages through a different messaging service or remove the RCS Sender from the Messaging Service.

### Remove RCS Sender from Messaging Service

To remove the RCS Sender from the Messaging Services:

## Console

1. Log in to the [Twilio Console][1c-console].
2. Go to **Messaging** > [**Services**][1c-services].
3. Select the Messaging Service associated with the RCS Sender.
4. Click **Sender Pool** in the sidebar.
5. Click **Remove**. This deletes the RCS Sender from the Messaging Service.

## Legacy Console

1. Log in to the [Twilio Console][tw-console].
2. Go to **Messaging** > [**Services**][].
3. Select the Messaging Service associated with the RCS Sender.
4. Click **Sender Pool** in the sidebar.
5. Click **Remove**. This deletes the RCS Sender from the Messaging Service.

### Remove Messaging Service from RCS Sender

To remove the Messaging Service from the RCS Sender:

## Console

1. Log in to the [Twilio Console][1c-console].
2. Go to **RCS** > [**Senders**][1c-rcs-senders].\
   The **RCS Senders** page appears.
3. Click the RCS Sender you want to change.
4. Click the **Configuration** tab.
5. Set the Messaging Service to `None`.
6. Click **Save Configuration**.

## Legacy Console

1. Log in to the [Twilio Console][tw-console].
2. Go to **Explore Products** > **Programmable Communications** > **RCS** > **Senders**.\
   The [**RCS Senders** page][rcs-senders] appears.
3. Click the RCS Sender you want to change.
4. Click the **Configuration** tab.
5. Set the Messaging Service to `None`.
6. Click **Save Configuration**.

[**Services**]: https://console.twilio.com/us1/develop/sms/services

[Await RCS sender approval]: #await-rcs-sender-approval

[branded RCS messages]: /docs/rcs/send-an-rcs-message

[compliance]: #register-your-rcs-sender

[contrast]: https://webaim.org/resources/contrastchecker/

[Create an RCS Sender]: #create-an-rcs-sender

[ctia]: https://api.ctia.org/wp-content/uploads/2024/01/CTIA-Short-Code-Monitoring-Handbook-v1.9-FINAL.pdf

[Customize users' opt-in and opt-out experience with Advanced Opt-Out]: /docs/messaging/tutorials/advanced-opt-out

[e164]: /docs/glossary/what-e164

[hexcolor]: https://www.color-hex.com/

[Messages resource]: /docs/messaging/api/message-resource

[mms]: /docs/glossary/what-is-mms

[Not all phone numbers can receive RCS messages]: https://help.twilio.com/articles/29603387805979

[paid Twilio account]: https://help.twilio.com/articles/223183208

[RCS Business Messaging]: /docs/rcs

[rcs-senders]: https://console.twilio.com/us1/develop/rcs/senders

[rcs]: /docs/rcs

[register-google]: #register-an-rcs-sender-with-google

[rfc1808]: https://datatracker.ietf.org/doc/html/rfc1808

[Send and receive branded RCS messages]: /docs/rcs/send-an-rcs-message

[Set up Messaging Services]: /docs/messaging/tutorials/send-messages-with-messaging-services

[Sign up for Twilio]: https://www.twilio.com/try-twilio

[sms]: /docs/glossary/what-is-an-sms-short-message-service

[Special Considerations]: /docs/rcs/regional

[tc-msg-svc]: https://console.twilio.com/us1/develop/sms/services

[tw-console]: https://console.twilio.com

[1c-console]: https://1console.twilio.com

[1c-rcs-senders]: https://1console.twilio.com/us1/develop/rcs/senders

[1c-tc-msg-svc]: https://1console.twilio.com/us1/develop/sms/services

[1c-services]: https://1console.twilio.com/us1/develop/sms/services

[Update Messaging Service configuration]: #update-messaging-service-configuration

[Use RCS messaging with Studio]: /docs/studio/tutorials/use-rcs-with-studio

[numbers-senders]: https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/rcs
