# Consent and Opt-in Policy

Verify follows the [Twilio Messaging Policy](https://www.twilio.com/en-us/legal/messaging-policy#twilio-messaging-policy). Before you send an OTP (one-time password) message through Verify, you must obtain the recipient's opt-in consent. Treat any recipient who has not opted in as opted out by default. You must store evidence of each consent event and provide it to Twilio on request. For example: Include a notice in your application's sign-up or two-factor authentication (2FA) flow that states the user will receive an OTP message at the phone number they provide. Then record the timestamp of the user's confirmation.

## SMS and RCS messaging to the US and Canada

For SMS and RCS messaging to the United States and/or Canada, you must specifically display the following info in your app's user interface where your user requests the OTP:

1. **"Standard message and data rates may apply"** disclosure statement.
   1. Statement must be shown verbatim. The word "standard" may be omitted if you are only sending to the US, but not Canada.
2. **Terms and Conditions** or a link to the same.
   1. The Terms and Conditions should describe the text messaging program that the user is opting into, a statement that "\[standard] message and data rates may apply", customer care contact info, how to stop receiving messages info, and a statement that "carriers are not liable for delayed or undelivered messages."
   2. Sample text to include in Terms and Conditions: "By providing your phone number and opting into our text messaging program, you consent to receive a one-time transactional security code on your mobile device. Standard message and data rates may apply. For assistance, reply HELP to the number from which you received the message, or contact us at \[insert email or toll-free number]. To stop receiving messages, reply STOP at any time. Carriers are not liable for delayed or undelivered messages."
3. **Privacy Policy** or a link to the same.
   1. The Privacy Policy and the Terms and Conditions could be combined in the same document and share the same link, but the name of the shared link should clearly indicate that it is for both.
   2. Sample text: "Privacy Policy and Terms and Conditions."

Providing this information is required by the [CTIA Short Code Handbook](https://api.ctia.org/wp-content/uploads/2024/01/CTIA-Short-Code-Monitoring-Handbook-v1.9-FINAL.pdf) for two-factor authentication, and is subject to audits. Short Code messaging to US and Canada have the strictest consent rules, so following these instructions covers all SMS and RCS sender types used by Twilio Verify to send messages globally. The instructions provided above are tailored to the Twilio Verify use case of two-factor authentication. For general-purpose messaging consent info, please see [Industry Standards for opt-ins for US-Short-Codes](https://help.twilio.com/articles/223134707-Industry-Standards-for-opt-ins-for-US-Short-Codes). If you are bringing-your-own sender to Twilio Verify, you will also need to register your own sender first and configure its HELP/STOP responses appropriately.

For questions, chat with our [Help Center Assistant](https://help.twilio.com/).

## Example: Compliant OTP request user interface

![Compliant OTP request example - Enter phone number.](https://docs-resources.prod.twilio.com/76af64b57425755cef0b7469232b4a01f90d19d4e69ad06c82a980d621f4c512.png)
![Compliant OTP request example - Enter OTP code.](https://docs-resources.prod.twilio.com/4d2a948ef711a5d0175c6906faa9e9730c8c6f0d07074781c53a95ca8217a32e.png)
