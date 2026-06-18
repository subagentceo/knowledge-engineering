# Verification and two-factor authentication best practices

Verification is an essential first step in your online relationship with a user. By verifying that a new user is who they say they are, you can reduce spam and fraud on your site while ensuring the user's security.

Designing user verification involves more than just [picking the right verification channel](/docs/verify/authentication-channels). Twilio has supported thousands of customers rolling out verification and two-factor authentication (2FA) implementations. This guide will provide recommendations for each step of the user verification process, from collecting phone numbers to account recovery.

These recommendations are written with the [Twilio Verify API](/docs/verify) in mind but many will apply regardless of your verification provider.

> \[!NOTE]
>
> If you're ready to start building, [check out one of our Verify Quickstarts](/docs/verify/quickstarts), available in a variety of programming languages for a variety of verification channels.

## Understand the difference between verification and authentication

Verification and authentication are similar user experiences but have a few key differences in how you can design the user experience.

**Verification** happens when you first associate details with a customer account. This could be:

* At sign up
* When the user provides new contact information like an email address or phone number
* When the user associates a new device or browser with their account

**Authentication,** including two-factor authentication (2FA) or multi-factor authentication (MFA) happens during ongoing customer interactions like:

* At login
* During checkout or when making high value transactions
* On [customer service calls](https://www.twilio.com/blog/best-practices-security-inbound-contact-center)
* Account changes like resetting a password or updating an address

The [Twilio Verify API](/docs/verify) can be used to both verify and authenticate user identities and can be used for all of these customer interactions.

## Plan a user registration flow

### Balance speed with security

Like every security solution, you want to make sure that the friction you're adding isn't going to prevent the user from achieving their goals, whether that's signing up for your service or completing a transaction.

### Support multiple authentication channels

The Twilio Verify API supports:

* [SMS](/docs/verify/api/verification#code-start-a-verification-with-sms)
* [Voice](/docs/verify/api/verification#code-start-a-verification-with-voice)
* [Email](/docs/verify/email)
* [Push and Silent Device Approval](/docs/verify/push)
* Time-based one-time password ([TOTP](/docs/glossary/totp))
* [WhatsApp](/docs/verify/whatsapp)
* [Silent Network Auth](/docs/verify/sna)
* [Automatic Channel Detection](/docs/verify/automatic-channel-selection)

Each channel has different benefits. For example, [SMS](https://www.twilio.com/blog/sms-2fa-security) has the highest end user adoption while [TOTP](/docs/glossary/totp) is more secure and works offline. You might ask if [email-based 2FA is a good idea](https://www.twilio.com/blog/email-2fa-tradeoffs) (better than no 2FA!).

Most companies **support several verification channels** and then let their users decide. For example, GitHub supports TOTP, SMS, and security keys and [offers even more options for account recovery](https://docs.github.com/en/github/authenticating-to-github/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication-recovery-methods).

Read more about [tradeoffs between the different authentication channels](/docs/verify/authentication-channels) supported by the Verify API.

#### Should I use the SMS channel?

SMS offers less security than [TOTP](/docs/glossary/totp) or push authentications, but in many cases you should still leave it available as an authentication option. SMS support is built into all mobile phones and—without a separate application—tokens delivered by SMS will make it to your users. The user experience benefits of SMS still make it a popular choice for many companies. [Learn more about why SMS 2FA isn't going away.](https://www.twilio.com/blog/sms-2fa-security)

If the choice is between password-only authentication or password plus SMS, adding SMS is a clear winner.

#### Which channels are the most secure?

[Push and Silent Device Approval authentications](/docs/verify/push) are the most secure channel for 2FA because they are tied to a specific device and resistant to phishing.

Push also offers the ability to *deny* an authentication request, which can be used to detect fraud. Push authentications are also very convenient for your users. Instead of having to open a mobile application and navigate to your website's token, push authentications present an "Approve"/"Deny" dialog within easy reach.

Silent Device Approval authentications simplify this process even further by happening silently in the background without any user involvement. Push and Silent Device Approval can be embedded directly into your application with our Verify Client Libraries (SDKs) so it doesn't require the user to download an additional app.

#### Suggested account verification, security, and usage flow

For an example user registration flow with one time passcodes, smart retry logic, and voice channel fallback, [check out this Code Exchange project](https://www.twilio.com/code-exchange/sms-verification-retry-logic-voice-fallback).

### Let your customers pick the authentication channels they want to use

Allow customers to set authentication preferences and store those preferences for subsequent logins. This is a great way to delight your users and reduce frustrations during the authentication process. For example, landline users will want a voice call instead of an SMS. You could store preferences in your user database or use a third-party service like [Segment Personas](https://segment.com/product/personas/).

These channels can also be used for backup and account recovery (more on this below).

## Design your user experience for verification success

### Display complete contact information for initial user verification

For phone or email verification use cases (as opposed to ongoing login or two-factor authentication), display the complete identifier in the interface so the user can detect any typos during the registration process. You can also introduce an intermediate step that asks the user to confirm the phone number before you send the OTP in order to catch mistakes.

![One-time passcode input field with phone number and edit option.](https://docs-resources.prod.twilio.com/7bccc85ec35039d52d27ec99e02281ce6029dd3324e1eb6f2226a99623cb25e4.png)

### Think internationally for phone verification

Building international support for telephone numbers includes separating country code and phone number input fields in your form fields and storing phone numbers in the [standard E.164 format](/docs/glossary/what-e164).

If you're sending OTPs to countries that require pre-registration of sender IDs, [you'll need to complete this application](https://console.twilio.com/us1/develop/sms/senders/sender-ids/applications/create). [Learn more about international support for Alphanumeric Sender IDs](https://help.twilio.com/hc/en-us/articles/223133767-International-support-for-Alphanumeric-Sender-ID).

Learn [how to build international phone number input in HTML and JavaScript](https://www.twilio.com/blog/international-phone-number-input-html-javascript) on the Twilio Blog.

### Validate phone numbers before sending one-time passwords (OTPs)

This topic is covered in depth in our blog post on [best practices for phone number validation during new user enrollment](https://www.twilio.com/blog/best-practices-phone-number-validation-user-enrollment).

You can also use [Twilio's Lookup API to build an allow list of country codes](https://www.twilio.com/blog/allow-list-country-code-lookup) in order to filter sign ups to meet compliance requirements, reduce fraud, or otherwise control your onboarding pipeline.

![Form using intl-tel-input plugin to validate phone numbers and convert to E.164 format.](https://docs-resources.prod.twilio.com/df289d813091fca8346068d0cc8baefe272c136a9f2793acec58aa82406a1273.gif)

Here are a few additional resources on building phone number inputs and validating numbers at this stage:

1. [Quick Deploy: international telephone input](https://www.twilio.com/code-exchange/international-telephone-input) (seen above)
2. [How to Validate Phone Number Input in HTML and JavaScript](https://www.twilio.com/blog/validate-phone-number-input)

### Take advantage of HTML attributes to improve your users' 2FA experience

Look no further than the humble `<input>` element as a place to optimize the user experience. Learn more about[how to design your HTML attributes to support autocomplete and more in this blog post.](https://www.twilio.com/blog/html-attributes-two-factor-authentication-autocomplete)

### Use smart retry logic for delivering OTPs

To prevent abuse (and impatient users!) we always recommend building retry buffers into verification workflows. This helps prevent:

* Accidentally spamming a user with repeated text messages
* Hitting API rate limits
* [Toll fraud](/docs/verify/preventing-toll-fraud) or unnecessary spend

We suggest limiting verifications to **1 request / 30 seconds per phone number** with exponential backoff. Learn more in the blog post about [best practices for managing retry logic with SMS 2FA](https://www.twilio.com/blog/best-practices-retry-logic-sms-2fa) or check out this [Code Exchange project with an example retry logic flow](https://www.twilio.com/code-exchange/sms-verification-retry-logic-voice-fallback) seen below.

![SMS verification sent to partially obscured number, input code 123456 to verify.](https://docs-resources.prod.twilio.com/e5cdd4cea01ab035c1c743edcbc099290b36b4e4be35e5f0bcc2988e9018d802.png)

## Add account recovery options early

Think about what happens when a user no longer has access to an authentication channel like a forgotten password or lost phone. Register at least one additional way to authenticate a user at sign up so that you always have a backup. Common combinations include:

* Password + email
* Email + phone number
* Authenticator app (TOTP) + backup codes
* Push authentication + phone number

Then if you're supporting two-factor authentication (2FA), add a third channel. For more recommendations, [check out these slides on designing customer account recovery in a 2FA world](https://www.slideshare.net/KelleyRobinson1/identiverse-2020-account-recovery-with-2fa).

## Plan for verification and authentication after sign up

### Always verify each new contact method you're adding

Send a [one-time password](https://www.twilio.com/code-exchange/one-time-passcode-verification-otp) to a phone number or email address the first time a user provides it. This ensures that the user has control of the device or identity. For email, verifying a user's email address the first time they provide it is a best practice to reduce fraud, ensure deliverability, and maintain a good sending reputation. If the user is using your mobile application, register the device as a [factor to be used for Verify Push](/docs/verify/push).

**Wait until the information has been verified to store it in your database.** Alternatively, add a "verified" flag. This helps prevent typos or other unverified information from being connected to a user account.

If you don't care about verifying a piece of contact information, ask if you need to collect it at all.

### Mask phone numbers or other PII for ongoing authentication

Once the phone number has been verified the first time, subsequent uses should mask the phone number in order to prevent leaking PII. Unlike [during initial verification](/docs/verify/developer-best-practices#display-complete-contact-information-for-initial-user-verification), there is no option to edit a phone number for ongoing authentication in the example below. We recommend exposing 3 or 4 numbers and masking the rest like +1 (5\*\*) \*\*\*-\*\*67 or \*\*\*\*\*\*\*\*567.

![Input box with title Enter the code sent to your device and subtitle showing that an SMS verification was sent to a partially obscured phone number.](https://docs-resources.prod.twilio.com/983628f795d492e14c9c122d8cf4ed71843295287c39b7c4bb21087b877e1088.png)

### Incentivize two-factor authentication (2FA)

Offering 2FA doesn't help secure your customers if they don't opt in to the feature. Incentives can help users who feel burdened by the security investment.

[Learn more about how companies are incentivizing users to enable 2FA](https://www.twilio.com/blog/incentivize-2fa).

## Use the Twilio Verify API for comprehensive verification support

The [Verify API](/docs/verify/api) helps you quickly build trust with the users accessing your platform and focus on your business logic.

### Explore customization options

#### Choose the right token length

The API supports token lengths between 4 and 10 digits with a default of 6 digits. Longer verification codes have more combinations and are harder to guess or brute force. The API has robust rate limits that counter brute forcing attempts of any token length size. You can change the token length in the [Verify Service section of the Twilio Console](https://www.twilio.com/console/verify/services).

#### Customize the verification message

The Verify API supports a standard template. The English example is:

```bash
Your <App Name> verification code is: 123456
```

Verify will automatically resolve the template's locale based on phone number country code or fallback to English. Using this automatic resolution is highly recommended. If you still must override locale for the verification, use the `locale` parameter [for any of our dozens of supported languages.](/docs/verify/supported-languages)

You can also [provide a template](/docs/verify/api/verification#start-new-verification-with-a-predefined-template) to support use cases like do not share warnings, origin bound SMS codes, and your own verbiage.

#### Bring your own one-time passcode

If you already have token validation and generation logic and would like to keep those systems in place, you can do so. [We have a feature where you can use your own OTP](/docs/verify/api/customization-options) and still use our pre-screened message templates and localizations for both text and voice. [Contact Twilio Sales](https://www.twilio.com/en-us/help/sales) and we'll help you enable this option.

### Know the limits and timeouts

#### Token Validity Period

Once generated, tokens are valid for **10 minutes**. We are unable to change the timeout for token validity for your application. If your users make another request within the 10 minutes, they will receive the same token.

#### Rate limits

[Rate limits](/docs/verify/api/rate-limits-and-timeouts) are in place to help prevent fraud and protect your application and Twilio's servers. For example, we [limit send attempts](/docs/api/errors/60203) to the same entity (phone number or email). Our built-in rate limits are sufficient for most customers, but you can also [define your own rate limits](/docs/verify/api/programmable-rate-limits). In addition, this [blog post covers how to test and develop with the Verify API without getting rate limited.](https://www.twilio.com/blog/test-verify-no-rate-limits)

With the 10 minute timeout, the majority of the delay you'll see during verification will be user input and not API requests.

Check out [this document for more details about Twilio's REST API best practices and rate limits](/docs/usage/rest-api-best-practices).

### Limit SMS messages to one message segment to avoid extra cost

SMS messages sent with Programmable Messaging and Verify are priced per [message segment](/docs/glossary/what-sms-character-limit).

Character limits for message segments depend on the [types of characters used](/docs/glossary/what-is-gsm-7-character-encoding):

| Character set                                                                   | Character limit |
| ------------------------------------------------------------------------------- | --------------- |
| Contains only [GSM characters](/docs/glossary/what-is-gsm-7-character-encoding) | 160 characters  |
| Contains Non-GSM characters (e.g. ó and ¡)                                      | 70 characters   |

When a message doesn't fit into one segment, it's automatically broken into two or more segments and you'll be billed for all of those segments. Therefore we recommend constructing your OTP messages to fit into one segment or be aware when it's going to take more than one. Use [the segment calculator](https://twiliodeved.github.io/message-segment-calculator/) to confirm how many segments a message will result in.

#### Twilio Verify and message segments

The default, standard messages that Verify provides currently all fit within one message segment, except in the following circumstances:

* Messages sent in certain language locales, including: `pt`, `pt_BR`, `cs`, `el`
* [do\_not\_share\_warning\_enabled](/docs/verify/api/service)is set to `true.` When `true`, if appending the privacy warning results in a message that takes more than one segment, then the privacy warning won't be appended.
* [psd2\_enabled](/docs/verify/api/service) is set to `true`
* [Pre-approved or custom templates](/docs/verify/verification-templates) are used

In the case of these exceptions, your specific message *may* still fit within one message segment, depending on parameters that affect character length like [friendly\_name](/docs/verify/api/service), [code\_length](/docs/verify/api/service), [locale](/docs/verify/api/verification), and other customization options that you select. You can check how many message segments your message will use with the [Messaging Segment Calculator tool](https://twiliodeved.github.io/message-segment-calculator/).

### Prepare for the unexpected

#### Monitor verification conversion rates

Monitor based on geography to detect spikes in unchecked verifications that could indicate abuse or delivery issues.

#### Create Twilio account usage triggers

Get notified if something goes wrong or if abuse happens on your account with Twilio's usage triggers, available via the [API](/docs/usage/api/usage-trigger), [CLI](https://www.twilio.com/blog/trigger-usage-alert-twilio-cli), or [Twilio Console](https://console.twilio.com/?frameUrl=/console/usage/triggers).

#### Add error handling

Finally, leverage the Verify and Lookup [error dictionary](/docs/api/errors) to handle errors appropriately in the customer application.

## Still wondering about verification? We're happy to help

Now that you have all of the best practices, you can [send an SMS OTP in less than 5 minutes with the Verify API](https://www.twilio.com/blog/sms-2fa-otp-5-minutes) with Twilio's Code Exchange. Learn more about the parameters supported in the [API documentation](/docs/verify) or check out one of our [quickstarts](/docs/verify/quickstarts) in the language of your choice. If you have questions about your implementation, [please reach out](https://www.twilio.com/en-us/help/sales). Let's build something amazing.
