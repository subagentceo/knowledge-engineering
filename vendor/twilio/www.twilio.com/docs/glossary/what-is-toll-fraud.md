# What is Toll Fraud?

Toll fraud, also known as International Revenue Sharing Fraud (IRSF), happens when an application is exploited to generate a high volume of voice calls to the fraudster's own international premium rate numbers. The victim of the toll fraud bears the entire financial responsibility for each minute of the call.

Toll fraud commonly exploits applications with phone verification or two-factor authentication flows. This type of fraud continues to grow and has led to billions of dollars of annual revenue loss globally.

## How does a toll fraud attack happen?

Toll fraud is carried out by well-coordinated teams of criminals distributed around the globe. It exists across 200+ countries, all phone number types, and wide price ranges. The creation and reselling of number ranges is very dynamic - every week there are more than 10,000 new IRSF ranges being advertised.

Here are the steps fraudsters take to complete a toll fraud attack:

1. Fraudsters gain access to a PBX (Private Branch Exchange) or app that lets them place outbound calls.
2. Fraudsters place short duration calls to test numbers, provided by the international premium rate resellers, to find holes not blocked by the chain of telecom carriers.
3. Once a test number can be reached, fraudsters purchase an international premium rate number from the reseller.
4. Within 30 minutes, the attacker will create dozens of concurrent calls to the number(s) they just purchased.
5. The terminating carrier pays the fraudster according to a revenue sharing agreement.
6. The victim of the attack is required by law to cover the telecom charges carried out on their account.

## Fight toll fraud with Twilio

There is no single solution to completely prevent toll fraud, so combating it requires a multi-pronged approach.

* **Usage Triggers** : [Usage Triggers](/docs/usage/api/usage-trigger) can be used to monitor the number of calls or minutes each day and alert you of abnormal patterns. It is important to continuously monitor your account and subaccount usage for any unwanted abuse.
* **Voice Geographic Permissions** : On the [Voice Geographic Permissions](https://www.twilio.com/console/voice/settings/geo-permissions/high-risk) Console page, navigate to the High-Risk tab and de-select any countries that have a checkbox enabled if you do not need to call these destinations. See [Protect your account with Voice Dialing Geographic Permissions](/docs/sip-trunking/voice-dialing-geographic-permissions) for more information.

## Related content

* [How to protect your account from toll fraud with Voice Dialing Geo Permissions](https://www.twilio.com/blog/how-to-protect-your-account-from-toll-fraud-with-voice-dialing-geo-permissions-html)
* [Anti-Fraud Developer's Guide](/docs/usage/anti-fraud-developer-guide)
