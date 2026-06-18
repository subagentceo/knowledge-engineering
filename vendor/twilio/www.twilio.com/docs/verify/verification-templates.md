# Getting Started with Verification Templates

Templates are predefined and approved messages used to [send Verifications](/docs/verify/api/verification). An account can have multiple templates associated with it to accommodate various scenarios like user authentication, account validation, password resets, and more.

This guide explains the capabilities of each template type and how to use them with your Verify Service.

Verify offers four different types of templates to support your use cases. To see more details, click on the template type to jump to that section.

* **[Verify Default Template](#verify-default-template)** is used automatically if no actions are taken to use a pre-approved or custom template.
* **[Pre-approved Templates](#pre-approved-templates)** have a variety of message body options and are available for immediate use to all Verify customers.
* **[Custom Templates](#custom-templates)** have message bodies that are provided by the customer and are available on a case-by-case basis.
* **[WhatsApp Authentication Templates](/docs/verify/verification-templates#whatsapp-authentication-templates)** are used to send your OTP messages via WhatsApp.

> \[!NOTE]
>
> To learn about special restrictions for sending SMS, consult the issues on sending to [Singapore](/docs/verify/singapore) or [Canada](https://help.twilio.com/hc/en-us/articles/12387480513307-Why-was-my-friendly-name-not-included-in-the-Verify-SMS-).
> To use a template in China, [register the template with the account](https://help.twilio.com/articles/17024185400859).

## Verify Default template

The Verify Default template is used automatically if no actions are taken to use a pre-approved or custom template.

The message body in English is currently: `Your {Service Friendly Name} verification code is: {code}`. Message bodies are subject to change, as they are continuously optimized to maximize clarity and OTP conversion, while minimizing [message segment cost](https://www.twilio.com/blog/what-the-heck-is-a-segment.html) across languages.

| Feature              | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **How to Use**       | No action required. The Verify Default template is used automatically if a specific template is not selected when creating a new Verification and your Verify Service does not have a default pre-approved or custom template set.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Feature Maturity** | GA (General Availability) - all customers can use this feature without restriction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Channel Support**  | SMS, Voice, and WhatsApp channels can all send the Verify Default template.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Language Support** | [See Verify Supported Languages page](/docs/verify/supported-languages#pre-approved-templates).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Special Features** | - **Transactional PSD2/SCA compliant message format**: Enable the PSD2 compliant message format for the Verify Default template by navigating to [Twilio Console > Verify > Services](https://console.twilio.com/us1/develop/verify/services) page and selecting your Service. On the **Settings** page under the **General** tab and turning on **Transactional PSD2 compliant message**. <br /> - **"Do not share" warning message addendum**: Add a "Do not share" addendum to the Verify Default template by navigating to [Twilio Console > Verify > Services](https://console.twilio.com/us1/develop/verify/services) page and selecting your Service. On the **Settings** page under the **General** tab and turning on **"Do not share" warning message**. |

## Pre-approved templates

Pre-approved templates offer a variety of message body options beyond the Verify Default template, and are available for immediate use to all Verify customers.

There are three variables that can be used in pre-approved templates.

* `{{friendly_name}}`: Friendly name of your [Verification Service](/docs/verify/api/service)
* `{{code}}`: 4-10 digit one-time passcode
* `{{ttl}}`: Expiration time of the one-time passcode in minutes

| Feature              | Details                                                                                                                                                                                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **How to Use**       | Navigate to [Twilio Console > Verify > Services](https://console.twilio.com/us1/develop/verify/services) page and select your Verify Service. On the **Settings** page under the **General** tab, select a **Message body** under the **Template configuration** heading. |
| **Feature Maturity** | Public Beta - We're actively looking for early-adopter customers to try it out and give us feedback.                                                                                                                                                                      |
| **Channel Support**  | SMS and Voice channels have the ability to send pre-approved templates. Before you select a template, check to make sure it's supported by your preferred channel.                                                                                                        |
| **Language Support** | [See Verify Supported Languages page](/docs/verify/supported-languages#pre-approved-templates).                                                                                                                                                                           |

### Checking what channels a template supports via Twilio Console

* Navigate to [Twilio Console > Verify > Services](https://console.twilio.com/us1/develop/verify/services) page and select your Verify Service.
* On the **Settings** page under the **General** tab, select a **Message body** under the **Template configuration** heading.
* Check the **Message preview** section for the **SMS** and/or **Call** icons. The presence of these icons indicates that the selected template is supported by that channel.

### Checking what channels a template supports via API

* View available templates using the [Get a List of Available Templates endpoint](/docs/verify/api/templates#get-a-list-of-available-templates).
* Check the channels property of the template to see supported channels.

If you select a channel that the template doesn't support, or your Account doesn't have this feature enabled, the Verification will fall back to the Verify default template for the selected channel.

## Custom templates

Custom templates have a unique message body that is provided by the template requester and are available on a case-by-case basis.

[Read this support article](https://help.twilio.com/hc/en-us/articles/9960174409627-Is-it-Possible-to-Customize-the-Verification-Message-for-Verify-) to learn more about how to request a custom template if our other templates don't suit your business needs.

| Feature              | Details                                                                                                                                                                                                                                                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **How to Use**       | Once a custom template has been approved, created, and added to your Account, you can [select a custom template for an individual Verification](#how-to-set-a-template-for-an-individual-verification) or [make it the default for every Verification sent through a Verify Service](#how-to-set-a-default-template-for-a-verification-service). |
| **Feature Maturity** | Public Beta - We're actively looking for early-adopter customers to try it out and give us feedback.                                                                                                                                                                                                                                             |
| **Channel Support**  | SMS and Voice. If you select a channel that the template doesn't support, the Verification will fallback to the Verify Default template for the selected channel.                                                                                                                                                                                |
| **Language Support** | [See Verify Supported Languages page](/docs/verify/supported-languages#custom-templates).                                                                                                                                                                                                                                                        |
| **Special Features** | Custom templates can be used to support [SMS domain-bound codes with the WebOTP API](https://www.twilio.com/en-us/blog/domain-bound-sms-otps-verify). `123456 is your Example code.` `@example.com #123456`.                                                                                                                                     |

## How to set a template for an individual Verification

You can choose a specific pre-approved or custom template for an individual Verification sent using the Verify API:

* View available templates using the [Get a List of Available Templates endpoint](/docs/verify/api/templates#get-a-list-of-available-templates).
* Identify the `TemplateSid` of the template you want to use, it will be in the format `HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`.
* Create a new Verification using the [Start a New Verification endpoint](/docs/verify/api/verification#start-new-verification-with-a-predefined-template) with the desired `TemplateSid`.

## WhatsApp authentication templates

Effective March 1, 2024, all Verify WhatsApp OTP messages will switch to being sent via [Copy Code Authentication Templates](https://developers.facebook.com/docs/whatsapp/business-management-api/authentication-templates/copy-code-button-authentication-templates) that are pre-defined by Meta, instead of Verify Default Templates.

| Feature              | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **How to Use**       | Verify will auto-create Copy Code Authentication templates in 71 languages once you've [brought your own WhatsApp Sender](/docs/verify/whatsapp/byo) in the WhatsApp Settings for your Verify Service. Click on the `verify_auto_created` template under [Console > Messaging > Content Template Builder](https://console.twilio.com/us1/develop/sms/content-template-builder) to confirm WhatsApp approval status = Approved before issuing OTP messages via WhatsApp. Verify WhatsApp currently doesn't support the security disclaimer and expiration warning optional parameters for the Copy Code Authentication Templates. |
| **Feature Maturity** | Public Beta - We're actively [migrating customers](/docs/verify/whatsapp/byo) to bring their own WhatsApp Senders to continue using Twilio Verify WhatsApp.                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Channel Support**  | Your WhatsApp Authentication Templates will appear in [Console > Messaging > Content Template Builder](https://console.twilio.com/us1/develop/sms/content-template-builder). The English language template will be used as the default if the locale parameter value doesn't exist. Because Verify auto-creates these authentication templates on your behalf, don't duplicate or delete any template named `verify_auto_created`. If you attempt to send an OTP message via Verify WhatsApp verification to India, we will fall-back to using SMS as the selected channel.                                                      |
| **Language Support** | [See Verify Supported Languages page](/docs/verify/supported-languages#whatsapp-authentication-templates).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

Set a Template for an Individual Verification

```bash
curl -X POST https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Verifications \
--data-urlencode "To=+15017122661" \
--data-urlencode "Channel=sms" \
--data-urlencode "TemplateSid=HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "service_sid": "VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "to": "+15017122661",
  "channel": "sms",
  "status": "pending",
  "valid": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "lookup": {
    "carrier": {
      "error_code": null,
      "name": "Carrier Name",
      "mobile_country_code": "310",
      "mobile_network_code": "150",
      "type": "mobile"
    }
  },
  "amount": null,
  "payee": null,
  "send_code_attempts": [
    {
      "time": "2015-07-30T20:00:00Z",
      "channel": "SMS",
      "channel_id": null
    }
  ],
  "url": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Verifications/VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

## How to set a default template for a Verification Service

You can select a specific pre-approved or custom template as the default for a [Service](/docs/verify/api/service) that will be used for all SMS and Voice verifications (unless you explicitly override it). This can be done using either Twilio Console or the Verify API

### Setting a Service-level default template via Twilio Console

* Go to [**Twilio Console > Verify > Services**](https://console.twilio.com/us1/develop/verify/services) page and select your Verify Service.
* On the **Settings** page under the **General** tab, select your desired **Message body** under the **Template configuration** heading.
* **Save** the Service setting changes.

### Setting a Service-level default template via API

* View available templates using the [Get a List of Available Templates endpoint](/docs/verify/api/templates#get-a-list-of-available-templates).
* Identify the `TemplateSid` of the template you want to use, it will be in the format `HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`.

Use the [Create or Update a Service endpoint](/docs/verify/api) with the desired `DefaultTemplateSid`.

Create a Verification Service with a Default Template.

```bash
curl -X POST https://verify.twilio.com/v2/Services \
--data-urlencode "FriendlyName=My Verify Service" \
--data-urlencode "DefaultTemplateSid=HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "friendly_name": "My Verify Service",
  "code_length": 4,
  "lookup_enabled": false,
  "psd2_enabled": false,
  "skip_sms_to_landlines": false,
  "dtmf_input_required": false,
  "tts_name": "name",
  "do_not_share_warning_enabled": false,
  "custom_code_enabled": true,
  "push": {
    "include_date": true,
    "apn_credential_sid": "CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "fcm_credential_sid": null
  },
  "totp": {
    "issuer": "test-issuer",
    "time_step": 30,
    "code_length": 3,
    "skew": 2
  },
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "url": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "links": {
    "verification_checks": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/VerificationCheck",
    "verifications": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Verifications",
    "rate_limits": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/RateLimits",
    "messaging_configurations": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/MessagingConfigurations",
    "entities": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Entities",
    "webhooks": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Webhooks",
    "access_tokens": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/AccessTokens"
  }
}
```

Update a Verification Service to Use a Default Template.

```bash
curl -X POST https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
--data-urlencode "DefaultTemplateSid=HJXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "friendly_name": "name",
  "code_length": 7,
  "lookup_enabled": false,
  "psd2_enabled": false,
  "skip_sms_to_landlines": false,
  "dtmf_input_required": false,
  "tts_name": "name",
  "do_not_share_warning_enabled": false,
  "custom_code_enabled": true,
  "push": {
    "include_date": true,
    "apn_credential_sid": null,
    "fcm_credential_sid": "CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  },
  "totp": {
    "issuer": "test-issuer",
    "time_step": 30,
    "code_length": 3,
    "skew": 2
  },
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "url": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "links": {
    "verification_checks": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/VerificationCheck",
    "verifications": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Verifications",
    "rate_limits": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/RateLimits",
    "messaging_configurations": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/MessagingConfigurations",
    "entities": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Entities",
    "webhooks": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Webhooks",
    "access_tokens": "https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/AccessTokens"
  }
}
```

## Template override priority

The message [template](/docs/verify/api/templates) used for a Verification is defined with the following priority order, from first to last priority:

1. A `TemplateSid` provided in the [create Verification](/docs/verify/api/verification#start-new-verification) request.
2. A `DefaultTemplateSid` set for the [Verify Service](/docs/verify/api/service).
3. The Verify Default template.
