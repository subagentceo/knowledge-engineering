# Using WhatsApp Business Accounts with Twilio

## Types of WhatsApp and Meta Business Accounts

WhatsApp offers three types of products for different user needs:

* WhatsApp Consumer app, with over 2 billion users globally
* WhatsApp Business app, generally used by small businesses and micro businesses
* WhatsApp Business Platform, previously known as the WhatsApp Business API or WhatsApp API

Twilio offers access to the WhatsApp Business Platform. To use the WhatsApp Business Platform with Twilio's APIs, each business or brand must have a Meta Business Manager. The Meta Business Manager is used by Meta to verify the company's identity. Using the Meta Business Manager, companies can have a WhatsApp Business Account (WABA) created. Within the WABA, businesses can register phone numbers with WhatsApp, which Twilio calls "WhatsApp senders."

## Types of WhatsApp Business Accounts

Your business designation in the WhatsApp ecosystem determines how your business appears to users. The following table describes the two types of Business Accounts:

| **Name**                        | **Description**                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Business Account                | By default, any account using the WhatsApp Business Platform or WhatsApp Business App is a business account. WhatsApp verifies authenticity of a brand for every account on the WhatsApp Business Platform. If the account has completed Business Verification, the name of the business is visible even if the user hasn't added the business to their address book. |
| Official Business Account (OBA) | WhatsApp has performed an additional level of vetting to provide a branded profile on the WhatsApp application. Reserved for a few globally recognized enterprises, chosen at the discretion of WhatsApp. An official business account is designated by WhatsApp with a green checkmark badge.                                                                        |

Official business account approval is done at the sole and full discretion of WhatsApp. Generally, Meta reserves Official Business Accounts for internationally recognized brands. Being verified on Facebook or Instagram does not help your business to become an Official Business Account (OBA). OBA designations are evaluated by WhatsApp per *WhatsApp sender*. This means that a company with multiple WhatsApp senders may have some senders that achieve OBA status, while others may not.

## How Business Accounts appear to WhatsApp users

By default, when you create your WhatsApp sender, your account will be a Business Account.

You can help customers learn more about your company by filling out your business information, such as your business website, address, and hours of operation. These fields can be updated in the Twilio Console.

> \[!NOTE]
>
> WhatsApp rolled out updates to how Business Accounts are displayed across their system starting January 15, 2024. If the guidance provided below doesn't match your experience, then these updates may not have been rolled out yet to your WhatsApp Sender or region. Twilio can't control where WhatsApp displays your display name in the consumer app.

For companies that have yet to complete Business Verification, the WhatsApp sender's Display Name ("Perspective Coffee" in the example below) is only displayed in small text next to the phone number on the contacts view (left-hand image) for the business name. In the one-on-one chat view (right-hand image) or in the chat list view, only the phone number is displayed.

![whatsapp\_business\_account\_screenshot.](https://docs-resources.prod.twilio.com/c12f0690fee04ea3768fb7dcc9da4a109704057c9fa2f272e1a04d6e6922b69c.jpg)

Once the Meta Business Verification has been completed and the Meta Business Manager is verified, the chat list and chat thread will then show the WhatsApp sender's Display Name ("Twilio" in the example below).

| ![Chats screen with Twilio appointment reminder for July 21 at 3 PM and Verify code 343529.](https://docs-resources.prod.twilio.com/15663fecc1f44b1e0c2cac7cb9828473a0852e07e1b91d3fb62052c87e7d4807.png) | ![WhatsApp Sandbox Chat Thread showing an appointment reminder for July 21 at 3 PM with options to Confirm or Cancel.](https://docs-resources.prod.twilio.com/6eb3fd335e5df335a1b47151ca4a74b46ae3f8bda8cd57f978ef8c08dfa42820.jpg) |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

The phone number is only shown when the user taps the Display Name on the top to open the "Business Info" screen shown below.

![Twilio business info screen with logo, phone number, WhatsApp API details, email, and links for contact creation.](https://docs-resources.prod.twilio.com/6f15e6f2d1ad7efea3a23b6f3467e7f6d4ecb7035ec106ee20f7f791e543c2e7.jpg)

## How Official Business Accounts appear to WhatsApp users

If your WhatsApp sender has been approved by WhatsApp as an Official Business Account, then a green checkmark will be displayed next to your WhatsApp sender's Display Name. In the example below, "Verify" is an Official Business Account.

| ![Chats screen with Twilio appointment reminder for July 21 at 3 PM and Verify code 343529.](https://docs-resources.prod.twilio.com/15663fecc1f44b1e0c2cac7cb9828473a0852e07e1b91d3fb62052c87e7d4807.png) | ![WhatsApp Verify Chat Thread Screenshot.](https://docs-resources.prod.twilio.com/68e4dd89f714668593136cc443ff69dcd7c90bff99ac1da257814ad3e9418fe3.jpg) |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |

Similar to Business Accounts that have completed Meta Business Verification, the phone number is only shown in a specific view. When the user taps the Display Name at the top, the "Business Info" screen opens and displays the phone number.

![WhatsApp Business Info Screenshot (OBA).](https://docs-resources.prod.twilio.com/26dd32139a777adb7376b481ff1fde7d7a71e8e6347c9d8d4d4a890ca0722851.jpg)

## Benefits of WhatsApp Official Business Accounts

A WhatsApp Official Business Account provides enhanced features and credibility for your business. The following list describes the key benefits:

* Verified account badge: A green checkmark in the chat header that shows users your business is verified
* Known sender status, which enables clickable embedded links

## Applying for a WhatsApp Official Business Account

Approval for a WhatsApp Official Business Account (OBA) requires articles, blog posts, or independent reviews that show the business is well-known and recognized by consumers. Approval is not guaranteed and is subject to approval by WhatsApp. WhatsApp does not disclose their criteria for approving Official Business Accounts.

> \[!NOTE]
>
> **Accounts that use [self sign-up](/docs/whatsapp/self-sign-up)** to register phone numbers on the WhatsApp Business Platform **should follow [these instructions](https://help.twilio.com/hc/en-us/articles/13755712105499-How-to-apply-for-a-WhatsApp-Official-Business-Account) to apply for OBA**, since you have access to your WABA.
