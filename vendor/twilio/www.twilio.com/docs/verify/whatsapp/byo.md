# Bring Your Own WhatsApp Sender

## Summary

You can bring your own WhatsApp Sender to enable Twilio Verify WhatsApp. This feature complies with Meta policy and improves your end-user experience.

## What do you need to know?

A WhatsApp Sender is a phone number associated with a [WhatsApp Business Account (WABA)](https://developers.facebook.com/docs/whatsapp/overview/business-accounts/).

![WhatsApp sender setup page with business verification steps and sender details table.](https://docs-resources.prod.twilio.com/b3edc84d8b6ef079ac6b1f7d80b83ed1fd9178e89ebf72a51392eb286da5a389.png)

Twilio Verify sends all WhatsApp messages via WhatsApp Senders managed and owned by customers. As a result, end-users receive improved [Authentication Template messages](/docs/verify/verification-templates#whatsapp-authentication-templates) from your own brand that feature a Copy Code button and are pre-defined by Meta:

| Old Behavior                                                                                                                                                                           | New Behavior                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **WhatsApp Sender Name:** Verify<br />**Message body:** "legacy" authentication template                                                                                               | **WhatsApp Sender Name:** Customer Brand or Phone Number<br />**Message body:** Authentication template with Copy Code button                 |
| ![WhatsApp message with verification code 797011, expires in 10 minutes.](https://docs-resources.prod.twilio.com/69437d2297a5aee5ded5d0eb6319d7ac9b6bd5c26dbaac27cdde4866fdf7123f.png) | ![verify whatsapp new behavior.](https://docs-resources.prod.twilio.com/2fea84a4acbdad53f6830882cbe996204a84fe904fff2c92530ded8f46096e81.png) |

PSD2 templates, such as "Use 123456 to approve your ACME transaction of $1.00 to John Doe" are no longer supported (this is a rare use case).

A business that does not meet Meta's [commerce policy](https://www.whatsapp.com/legal/commerce-policy), such as cryptocurrency businesses, will not be able to create a WhatsApp Sender, and as a result won't be able to continue sending WhatsApp messages via Twilio Verify.

## Why does Meta require customers to use their own Sender?

These changes were initiated by Meta to safeguard their ecosystem as WhatsApp API traffic continues to grow and are being applied to all providers of WhatsApp messaging, not just Twilio Verify. Specifically, the requirements that OTPs be delivered by [Authentication Templates](https://developers.facebook.com/docs/whatsapp/business-management-api/authentication-templates/) and that a business must send from their own WABA in order to comply with the [WhatsApp Business Messaging Policy](https://www.whatsapp.com/legal/business-policy/).

Besides complying with Meta policy changes, there are two benefits to your end-users. The first is that Authentication Templates contain a Copy Code button for your users to easily copy/paste the OTP into your app. The second is that your OTP messages will now come from your own brand (instead of a generic "Verify") creating a branded and consistent end-user experience with other WA messages you might be sending.

## What do you need to do?

Complete the steps below to bring your own WhatsApp Sender to Verify WhatsApp:

Estimated time: Creating a WhatsApp Sender should take you about 1 hour. Meta's business verification process, however, may take an average of 1-2 weeks.

1. Login to Twilio Console for the account used for Verify WhatsApp.
2. Check if you already have an existing WhatsApp Sender by navigating to [Messaging>Senders>WhatsApp Senders](https://console.twilio.com/us1/develop/sms/senders/whatsapp-senders).

   1. A WhatsApp Sender is a special phone number associated with a WhatsApp Business Account (WABA) that is enabled to send WhatsApp messages.
   2. If you are ok with using existing WhatsApp Sender/s for sending OTP messages, skip the next step. It's best practice to send OTP messages from a different WhatsApp Sender than marketing messages that recipients may block.
3. Create your own WABA and associate a phone number by following the steps in [self-sign up with WhatsApp](/docs/whatsapp/self-sign-up).

   1. If you are unable to create your own WhatsApp Sender due to a Meta commerce policy violation, switch to an alternative messaging channel like Verify SMS.
4. Create or use an existing [Messaging Service](https://console.twilio.com/us1/service/sms/create) to assign your newly created Sender.
5. Provide Twilio the Messaging Service SID, which starts with the letters "MG", that you want Verify WhatsApp to use by selecting it. Navigate to your [Verify Service Configuration](https://console.twilio.com/us1/develop/verify/services) > Select the Verify Service > Go to the WhatsApp tab.
6. Review how [Authentication Templates](/docs/verify/verification-templates#whatsapp-authentication-templates) will be created and how to manage the [Messaging Limits](https://developers.facebook.com/docs/whatsapp/messaging-limits/) for your WhatsApp Senders.
   1. If you previously submitted your WhatsApp Sender or Messaging Service SID via the Google Form by the March 1st, 2024 deadline, your Senders will be fully migrated and ready to use by March 31st, 2024.
   2. Customers shall be responsible for maintaining the [Quality rating and Messaging limits](https://developers.facebook.com/docs/whatsapp/messaging-limits/) for their WhatsApp Senders after April 1st, 2024.
7. If you want to send PSD2 messages or any other message that does not fit the Authentication Template format, switch to Twilio's Programmable Messaging API.

## How do I know if my Verify WhatsApp is correctly set up?

Any errors with your Verify WhatsApp set up such as those related to exceeding Sender Messaging limits [error code: 63018](/docs/api/errors/63018) or missing Verify Messaging Services [error code: 63008](/docs/api/errors/63008) will be exposed to you directly via API error responses.
