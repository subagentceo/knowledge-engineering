# Key Concepts and Terms for the WhatsApp Business Platform with Twilio

Using the [WhatsApp Business Platform with Twilio](https://www.twilio.com/en-us/messaging/channels/whatsapp), you can connect with users on WhatsApp through Twilio's APIs.

WhatsApp is a highly regulated channel, and getting started requires documentation and approval from Meta. This document covers the common key concepts and terms that you will encounter when you use the WhatsApp Business Platform with Twilio.

## Customer service windows

WhatsApp regulates when and how you can send messages to your end users. When an end user sends your business a WhatsApp message, that message starts a customer service window (also known as a 24-hour window) during which you can send free-form messages to the user. This customer service window lasts for 24 hours after the last inbound message you receive from a user.

Outside of a customer service window, you may only send a message using an approved template. Create and submit templates for WhatsApp approval using [Content Templates](content/overview). When you create a template, you'll get a unique Content SID, which you use in your application code to send messages outside of the customer service window.

From July 1, 2025, Utility template messages don't incur any Meta fees if you send them during a customer service window. Authentication and Marketing template messages continue to incur fees during the customer service window. For more information on how the customer service window affects WhatsApp pricing, see [Twilio's WhatsApp pricing FAQ](https://help.twilio.com/articles/360037672734-How-Much-Does-it-Cost-to-Send-and-Receive-WhatsApp-Messages-with-Twilio-).

## Message templates

In some cases, you need to use a message template to send WhatsApp messages. The following table summarizes when a message template is required, whether it needs WhatsApp approval, and example message types for each scenario:

| Customer service window | Message type                                                                         | Requires message templates? | Requires WhatsApp approval? | Examples                                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------ | --------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Active                  | Text                                                                                 | No                          | No                          | Plain text, formatted text (bold, italics, strikethrough, pre-formatted code)                                                                                       |
| Active                  | [Media](/docs/whatsapp/tutorial/send-and-receive-media-messages-twilio-api-whatsapp) | No                          | No                          | Images, audio, PDFs                                                                                                                                                 |
| Active                  | [Messages with rich features](/docs/whatsapp/message-features)                       | Yes                         | No                          | Buttons, lists, coupon codes, carousels <br />**Note**: Coupon codes and carousels always need WhatsApp approval, regardless of the customer service window status. |
| Inactive                | Any messages                                                                         | Yes                         | Yes                         | Appointment reminders, follow-ups after the 24-hour window                                                                                                          |

Message template examples:

* "Your appointment for `{{1}}` is `{{2}}`. Need to reschedule? Tap below to reply."
* "Your `{{1}}` delivery is on the way. It should arrive `{{2}}`. If you have any questions, reach out."

**Note**: The double-bracketed numbers are placeholders for your custom values. In your code, provide these values as key-value pairs. For example, if you use the Appointment Reminders template, `{"1":"2025/7/15","2":"3:00p.m."}` will show "Your appointment is coming up on 2025/7/15 at 3:00p.m.".

To create message templates and submit them for approval, use the [Content Template Builder or Content API](content/overview). For more information, see [Send WhatsApp notification messages with templates](/docs/whatsapp/tutorial/send-whatsapp-notification-messages-templates) and [Message template approval and statuses](/docs/whatsapp/tutorial/message-template-approvals-statuses).

The Twilio Sandbox for WhatsApp comes with pre-approved templates for testing purposes. For more information, see [Test WhatsApp messaging with the Sandbox](/docs/whatsapp/sandbox).

### Message template categories

WhatsApp requires you to classify message templates into one of three categories that determine pricing and approval requirements:

* **Authentication**: Authenticate users with one-time passcodes. Meta determines the body text, and you can't change it.
* **Utility**: Share important information related to a specific, agreed-upon transaction by confirming, suspending, or changing a transaction or subscription.
* **Marketing**: Send promotional offers, product announcements, and more to increase awareness and engagement. Meta classifies any template with a mix of utility and marketing content as a marketing template.

Meta bases its message fees on template categories and determines categories at its sole discretion. Any templates that don't result from an explicit end user request will likely be categorized as "Marketing".

Learn more about [Meta's template categorization](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization) and [WhatsApp pricing](https://www.twilio.com/en-us/whatsapp/pricing).

## WhatsApp Business Account (WABA)

A WhatsApp Business Account (WABA) is required to register a WhatsApp Sender and send and receive messages on WhatsApp using Twilio. All WhatsApp Senders and Templates must belong to a WABA.

**There is a one-to-one relationship between a Twilio account, subaccount, or project and a WABA.** In other words, you may only have one WABA in a Twilio account or subaccount, and each WABA should only be connected to a single Twilio account, subaccount, or project. This means that if you have multiple accounts, subaccounts, or projects, then you will need to have multiple WABAs.

WhatsApp does not limit how many WABAs a business can have.

## Meta Business Portfolio

> \[!NOTE]
>
> Meta Business Manager — sometimes referred to as Facebook Business Manager, Meta BM, or Meta Business Account — has been renamed to Business Portfolio by Meta. All terms refer to the same business entity within Meta's systems and IDs are consistent. We are in process of updating the Twilio documentation to use Meta's new term.

In order to have a WhatsApp Business Account (WABA), your business must have a [Meta Business Portfolio](https://business.facebook.com/). A Meta Business Portfolio allows organizations to organize and manage all of their business assets (e.g., Facebook pages, Instagram accounts, and WhatsApp Business accounts) together. It is a separate concept from the WhatsApp Business Account (WABA).

Consult [Meta's instructions for creating a Meta Business Portfolio account](https://www.facebook.com/business/help/1710077379203657?id=180505742745347). You may also do this when registering your first WhatsApp Sender using [WhatsApp Self Sign-up](/docs/whatsapp/self-sign-up).

Meta uses your Meta Portfolio to verify your business's identity through a process called "Business Verification."

## Twilio Sandbox for WhatsApp

The [Twilio Sandbox for WhatsApp](https://www.twilio.com/console/sms/whatsapp/learn) is a tool created by Twilio for you to prototype and test sending and receiving WhatsApp messages before you are fully set up with a WABA and Twilio WhatsApp sender number. You can read more in [our in-depth guide to getting started with the Twilio Sandbox for WhatsApp](/docs/whatsapp/sandbox) or [our step-by-step Quickstart to WhatsApp](/docs/whatsapp/quickstart).

## WhatsApp usernames

### Usernames for users

WhatsApp supports usernames for individual users. A username masks the user's phone number and lets the user interact with businesses through a Business-scoped User ID (BSUID). Twilio exposes this identifier in the Messaging API as `ExternalUserId`.

Meta automatically generates a BSUID for each combination of business portfolio (formerly called *Business Manager*) and user. If the user changes their phone number, Meta regenerates the BSUID. A BSUID can contain up to 128 alphanumeric characters, excluding the country code. All message webhooks include the BSUID, whether or not the user has turned on usernames.

Twilio maps the BSUID to the `ExternalUserId` field in the Messaging API. When relevant, Twilio also appends the BSUID to the existing `to` and `from` parameters.

Example `ExternalUserId` values:

```text
whatsapp:CC.1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T
whatsapp:CC.BSUID
```

In these examples, `CC` represents the two-letter country code, such as `US` for the United States or `BR` for Brazil.

The `to` and `from` parameters behave as follows:

* If a phone number is present, the `to` or `from` field contains only the phone number, and `ExternalUserId` contains the BSUID.
* If no phone number is present, Twilio populates the `to`, `from`, and `ExternalUserId` fields with the BSUID.

**Note**: Phone numbers are in E.164 format (for example, `whatsapp:+18005550100`).

Limitations on BSUIDs:

* All message types are supported except one-tap, zero-tap, and copy-code authentication templates, which require a phone number.
* A BSUID is valid only for the portfolio that generated it. If you operate multiple portfolios, a request that includes a BSUID from another portfolio fails.

### Messaging users with a phone number

If you continue to message users by phone number, your workflow is unchanged. Authentication messages also still require phone numbers.

### Event Streams

If you use Twilio Event Streams, make sure that you have upgraded to the latest version so that BSUID data appears.

### Retrieve BSUID data

Depending on how you handle inbound and outbound messages, BSUID data appears in the following fields:

| Interface     | Field names                              |
| ------------- | ---------------------------------------- |
| Webhooks      | `ExternalUserId`, `ParentExternalUserId` |
| Event Streams | `externalUserId`, `parentExternalUserId` |

**Note**: Twilio updates the `delivered` and `read` statuses for both webhooks and Event Streams. When available, pricing callbacks include the same status information.

### Parent BSUIDs

Meta assigns parent BSUIDs to portfolios that it manages directly. If your business is not Meta-managed or you do not meet Meta's eligibility requirements, skip this section.

If you need a parent BSUID, [contact Twilio Support](https://help.twilio.com/) and include **Parent BSUID Request** in the subject line.

To qualify for a parent BSUID, you must meet all of the following requirements. Meta may change these requirements at any time and might impose additional criteria.

* Each portfolio is business-verified.
* Each portfolio has a messaging limit of at least 100,000 messages in a 24-hour period.
* All portfolios are in good standing with no active policy violations.
* You link at least two business portfolios.

A regular BSUID applies to a single business portfolio. Any phone number in that portfolio can use the BSUID, but the identifier does not work with phone numbers in other portfolios. If you operate multiple portfolios, you cannot use a regular BSUID to identify the same user across all of them.

To remove this limitation, Meta provides parent BSUIDs for businesses with linked portfolios:

* A parent BSUID works across **all** linked portfolios.
* You can identify and message the same user from any business phone number in those portfolios.
* To confirm whether you can link portfolios, contact your Meta point of contact.\
  If your account is not Meta-managed, you do not have a Meta representative, or you do not meet the eligibility requirements listed above, this feature does not apply to you.

When portfolios are linked, parent BSUIDs appear in webhooks in the `ParentExternalUserId` field.\
The format matches a regular BSUID but inserts `ENT` between the country code and the identifier, for example:

```text
whatsapp:CC.ENT.BSUID
whatsapp:BR.ENT.1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T
```

You can use a parent BSUID anywhere you use a regular BSUID.\
Existing portfolio-scoped BSUIDs continue to work.

When a parent BSUID is present, Twilio uses it instead of a regular BSUID. If a parent BSUID is enabled for your portfolio, it appears in the `to` and `from` fields when no phone number is present.

**Note**: Contact books remain portfolio-scoped. If you link portfolios, add each user's phone number and BSUID to the contact book in every portfolio. Twilio and Meta do not sync contact data between portfolios.

### Test your integration

Twilio is releasing this capability in phases:

| Capability                               | Estimated availability           | What to test                                                                                                            |
| ---------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Inbound webhooks that include BSUID data | June 3                           | Verify that the `ExternalUserId` field is present in inbound webhooks and that your integration processes it correctly. |
| Outbound messaging that accepts a BSUID  | Based on Meta's rollout schedule | Send messages by supplying `ExternalUserId` instead of a phone number.                                                  |

To test:

1. After you start receiving inbound webhooks that contain `ExternalUserId`, update your inbound message handler to read this field.
2. When Meta enables outbound BSUID messaging for a country, pass the `ExternalUserId` value everywhere your integration currently expects a phone number. Until the rollout reaches your target region, continue supplying the phone number.
3. Verify that messages are delivered and that user identification functions as expected.

**Note**: Meta is rolling out outbound BSUID messaging in phases. For example, end-users in the United States are not expected to be rolled out until the early September GA. To test earlier, use a phone number from a country such as Algeria, Libya, Colombia, or Singapore that is included in the initial rollout period on July 7 or July 20. For the complete list of countries, see the rollout timeline below.

### Business usernames

A business can assign one username to each WhatsApp phone number. A phone number can have only one username, and no two phone numbers—consumer or business—can share the same username.

Business usernames must meet the following requirements:

* Contain only English letters (`a–z`), digits (`0–9`), periods (`.`), or underscores (`_`).
* Be 3–35 characters long.
* Include at least one letter.
* Not start or end with a period and not contain two consecutive periods.
* Not start with `www`.
* Not end with a domain suffix (for example, `.com`, `.org`).
* Be case-insensitive (`myID` and `myid` are equivalent) but treat `.` and `_` as distinct (`my.id` and `my_id` are different).

WhatsApp displays sender names in the chat window in the following priority order (highest to lowest):

1. Saved contact name
2. Verified business name or Official Business Account (OBA) name
3. Username
4. Phone number

### Rollout timeline

Meta will begin a phased rollout in early July 2026 and expects to complete the global rollout in early September 2026. Update your integration by June 2026 to remain compatible.

In late June 2026, Meta will inform users worldwide that they can request a username. Although the request flow will be available globally, the feature itself will be active only in the countries included in the initial rollout (see the table below). Meta plans to enable the feature worldwide in early September 2026.

### Countries in the initial rollout

This list is subject to change.

| Date    | Countries                                               |
| ------- | ------------------------------------------------------- |
| July 7  | Algeria, Azerbaijan, Ghana, Libya, Nepal                |
| July 20 | Colombia, Dominican Republic, Malaysia, Peru, Singapore |

### Prepare for usernames

Update your systems to store the new BSUID. Twilio returns the BSUID in the `to` and `from` parameters and in the `ExternalUserId` field.

Some WhatsApp messages might not include the user's phone number. If you receive only a BSUID, you still need a way to identify and communicate with that user. Store the BSUID with any existing identifiers so that you can map conversations correctly across your CRM, profile, or other data stores.

If you already have a phone number for a user, you can continue to use it. Treat the BSUID as an additional identifier for future interactions or for linking conversation history when a phone number isn't provided.

Onboarding and registration continue to use phone numbers. Usernames only affect the sender name displayed in WhatsApp, and they don't change onboarding or sender registration.

### Contact book

Meta has a feature that automatically stores WhatsApp user contact information (phone number and BSUID) when you exchange a message or call with that user.

After a contact is stored, the platform includes the user's phone number and BSUID in all webhook payloads and API responses, even if the user has enabled the WhatsApp usernames feature.

#### Data retention and opt-out

Meta retains contact book data until you either:

* Turn the feature off.
* Deactivate your Meta account.

Starting March 16, 2026, you can turn the contact book off in **Meta Business Suite** > **Business settings** > **Business info**. When you turn the feature off, Meta:

* Stops storing new user information.
* Deletes all previously stored user information.

If you turn the feature back on later, storage resumes, but deleted data isn't restored.

#### Limitations

* Contact books are scoped to business portfolios. If you use linked portfolios, each portfolio stores contact information independently. The data isn't shared or synchronized across portfolios.

For more information, see [Meta's documentation](https://developers.facebook.com/documentation/business-messaging/whatsapp/business-scoped-user-ids/#contact-book).

### Flex and Conversations (classic)

On July 7, 2026, Meta plans to let users in five countries turn on WhatsApp usernames: Algeria, Azerbaijan, Ghana, Libya, and Nepal. The following Twilio products can't receive WhatsApp messages from users who have a WhatsApp username:

* [Flex](/docs/flex)
* [Conversations (classic)](/docs/conversations-classic)

If you use Flex or Conversations (classic) to communicate with a user who might have a WhatsApp username, ask them to reach you through another channel.

One exception applies: if a user's phone number and Business-Scoped User ID (BSUID) are already paired in your Contact Book, you continue to receive their messages by phone number even after they adopt a username. To create this pairing, send an outbound message to users in the initial rollout countries before July 7, 2026.

### Where to find more information

For information from Meta, see the [Business-Scoped User IDs documentation](https://developers.facebook.com/documentation/business-messaging/whatsapp/business-scoped-user-ids/). For Twilio-specific updates, monitor this page.
