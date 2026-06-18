# Singapore Sender ID Handling

When sending SMS messages to Singapore, Verify and Authy APIs will use one of five different [Alphanumeric Sender IDs](/docs/glossary/what-alphanumeric-sender-id) and message template combinations, depending on several customer-specific criteria and the time period.

* [Combination 1](#combination-1-sender-id-twverify-or-verify-and-customers-template-selection): Sender ID "**TWVerify**" or "**verify**" and customer's template selection.
* [Combination 2](#combination-2-customers-unregistered-sender-id-and-customers-template-selection): Customer's unregistered Sender ID and customer's template selection.
* [Combination 3](#combination-3-customers-registered-sender-id-and-customers-template-selection): Customer's registered Sender ID and customer's template selection.
* [Combination 4](#combination-4-sender-id-twverify-and-brandless-templates-only): Sender ID "**TWVerify**" and brandless templates only.
* [Combination 5](#combination-5-sender-id-likely-scam-and-customers-template-selection): Sender ID "**Likely-SCAM**" and customer's template selection.

Each of these combinations is explained in detail below.

## Combination 1: Sender ID "**TWVerify**" or "**verify**" and customer's template selection

Prior to January 26, 2023, this was the default combination and messages were sent with either a "**TWVerify**" or "**verify**" Sender ID. Customers have been able to select [any message template](/docs/verify/verification-templates).

On January 26, 2023, customers who previously used this combination, have not registered their own Sender ID (combination 3), and have been approved by [Twilio's Know Your Customers (KYC) process](#twilios-kyc-process-via-trust-hub-business-profile-approval), will automatically fallback to combination 4.

On January 30, 2023, customers who previously used this combination, have not registered their own Sender ID (combination 3), and **have not** been approved by Twilio's Know Your Customers (KYC) process, will automatically fallback to combination 5.

## Combination 2: Customer's unregistered Sender ID and customer's template selection

Prior to January 26, 2023, customers have able to optionally specify that a different Sender ID (e.g. "**ACME**") be used, instead of "**TWVerify**" or "**verify**". No registration required. Customers have been able to select [any message template](/docs/verify/verification-templates).

On January 26, 2023, customers who previously used this combination, have not registered their own Sender ID (combination 3), and have been approved by [Twilio's Know Your Customers (KYC) process](#twilios-kyc-process-via-trust-hub-business-profile-approval), will automatically fallback to combination 4.

On January 30, 2023, customers who previously used this combination, have not registered their own Sender ID (combination 3), and **have not** been approved by Twilio's KYC process, will automatically fallback to combination 5.

## Combination 3: Customer's registered Sender ID and customer's template selection

After January 26, 2023, due to new regulations, customers must [register](https://console.twilio.com/us1/develop/sms/senders/sender-ids/applications/create) their Sender ID. Otherwise, Verify and Authy will fallback to combination 4 or 5. We strongly recommend this option as it allows for the greatest customization of Sender ID and messages. However, we understand that it may not be feasible for some customers as registering a Sender ID in Singapore requires obtaining a Singapore UEN first.

Customers are able to select [any message template](/docs/verify/verification-templates).

## Combination 4: Sender ID "**TWVerify**" and brandless templates only

After January 26, 2023, customers who have not registered their own Sender ID (combination 3) and who have been approved by Twilio's Know Your Customer (KYC) process ([more below](#twilios-kyc-process-via-trust-hub-business-profile-approval)), will automatically fallback to "**TWVerify**" as a shared Sender ID that Twilio owns and a brandless template as described below. This is being done on customers' behalf to ensure uninterrupted OTP delivery/conversion in Singapore.

### Brandless templates

When Sender ID "**TWVerify**" is used, the message that is sent will be restricted to one of the following brandless templates.

| **Language locale**        | **Default**                              | **With "Do not share" option (configure in Console)**                                                                                               |
| -------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| English (en)               | *Your verification code is: XXXXXX*      | *Your verification code is: XXXXXX.* *Don't share this code with anyone; our employees will never ask for the code.*                                |
| Chinese (Mandarin) (zh-cn) | *您的验证代码是：XXXXXX*                         | *您的验证代码是：XXXXXX.请勿与任何人分享此代码；我们的员工绝不会要求您提供代码。*                                                                                                       |
| German (de)                | *Dein Sicherheitscode lautet: XXXXXX*    | *Dein Sicherheitscode lautet: XXXXXX. Geben Sie diesen Code nicht an andere weiter. Unsere Mitarbeiter werden Sie niemals nach diesem Code fragen.* |
| Spanish (es)               | *Su codigo de verificacion es: XXXXXX*   | *Su codigo de verificacion es: XXXXXX. No comparta este codigo con nadie. Nuestros empleados nunca se lo pediran.*                                  |
| French (fr)                | *Votre code de vérification est: XXXXXX* | *Votre code de vérification est: XXXXXX. Ne partagez pas ce code. Nos employés ne vous demanderont jamais votre code.*                              |
| Italian (it)               | *Il codice di verifica è: XXXXXX*        | *Il codice di verifica è: XXXXXX. Non condividere questo codice con nessuno; i nostri dipendenti non richiederanno mai il codice.*                  |

Based on real-world conversion data for Singapore, we have observed that not including the brand (friendly\_name) in the message and using TWVerify as the Sender ID does not result in a lower OTP conversion rate, compared to including the brand and using a brand-specific Sender ID. End-users are requesting the OTP message, so they are expecting it.

Unsupported language locales will default to English (en). More language locales may be supported in the future. PSD2 option is not supported. For more general information on templates, see [here](/docs/verify/verification-templates).

## Combination 5: Sender ID "**Likely-SCAM**" and customer's template selection

After January 30, 2023, customers who do not fit the criteria for combination 3 or 4 will have "**Likely-SCAM**" as the Sender ID. These messages also run the risk of being blocked entirely, without notice, from being sent to Singapore. This is being mandated by the Singapore regulator for all SMS vendors.

Customers are able to select [any message template](/docs/verify/verification-templates).

## Twilio's KYC process via Trust Hub Business Profile Approval

Twilio considers several criteria in its KYC process for allowing use of the "**TWVerify**" Sender ID. The main criteria is that the customer has an approved Business Profile in Twilio's Trust Hub for the account(s) that they are going to use the Verify or Authy API. You can create and request approval of a [Business Profile](https://console.twilio.com/us1/account/trust-hub/customer-profiles?frameUrl=%2Fconsole%2Ftrust-hub%2Fcustomer-profiles%3Fx-target-region%3Dus1) in the Twilio Console. You can select any "Business Registration ID Type". Once you have gotten a Business Profile approved, complete this [request form](https://forms.gle/S7nmc494ei6pEZDb9) to let our operations team know that you want to use "**TWVerify**" as the Sender ID (combination 4). Twilio reserves the right to modify its KYC process, including retroactively.

![Twilio console for editing primary business profile with fields for legal name, profile name, and business details.](https://docs-resources.prod.twilio.com/9230e5d3d87ad00411558ea51971a10a2777eeca7922d4b66288d9ef0767df4e.png)

> \[!NOTE]
>
> A [sub-account](https://help.twilio.com/hc/en-us/articles/223136587-What-is-a-Subaccount-) does not need to have its own approved Business Profile, so long as its parent account has an approved Business Profile.
