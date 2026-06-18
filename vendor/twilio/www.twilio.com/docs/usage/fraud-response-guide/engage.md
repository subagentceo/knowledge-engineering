# Engage: Contact Twilio Support

In many cases, [contacting Twilio Support](https://help.twilio.com/articles/360048500694-Contacting-Twilio-Support) is optional. Twilio may have already detected suspicious activity on your account and provided self-service remediation steps to you via email. If you receive a notification from Twilio directing you to follow a specific remediation workflow, follow the instructions provided to expedite resolution.

In some scenarios, Twilio may take reactive measures on your behalf to limit further risk. For example, accounts may be temporarily suspended in response to significant traffic spikes or suspected abuse. Because suspensions can occur for multiple reasons, it is critical to reply directly to the Support notification email and follow the instructions provided to support account review and reactivation.

## Account suspension \[#account-suspension]

When an account is suspended, it can't be used to make or receive calls or SMS messages. The following are all potentially fraud-related reasons for Twilio suspending your account(s):

### Violation of the [Acceptable Use Policy](https://www.twilio.com/legal/aup) (AUP) \[#aup-violation]

* Sending spam.
* Sending fraudulent, abusive, or illegal traffic.
* Use of Twilio for phishing, malware, or other malicious activities.
* Use of Twilio for [prohibited content](https://www.twilio.com/en-us/legal/messaging-policy?_gl=1%2Amhhivc%2A_gcl_aw%2AR0NMLjE3NjE5NDQ2MjkuQ2p3S0NBandwT2ZIQmhBeEVpd0FtMVN3RXIzVlV5bzZmN0NTUWxPVDFmLWdqYmJRWVhGTk5SWHNEWXRucjJtN3hNeWEwVmRNS3UzcFlCb0MyMTBRQXZEX0J3RQ..%2A_gcl_au%2AMTg2NzYzMjkzMi4xNzYxMTY5NDc3%2A_ga%2AOTU3NzQwMzkwLjE3Mzc0ODA1NDY.%2A_ga_RRP8K4M4F3%2AczE3NjIxOTY1MjgkbzIxOSRnMSR0MTc2MjE5NjUzNiRqNTIkbDAkaDA) (e.g., controlled substances, illicit content, illegal sweepstakes, etc.).
* Excessive consumer complaints or opt-outs.

### Directly fraudulent or abusive activity \[#directly-fraudulent-activity]

* Specific indicators of fraud or abuse-specific behaviors coming from accounts you own.
* Unusual spikes in usage that are determined to be fraudulent or could impact Twilio's platform.
* Suspected or confirmed account compromise.
* Use of Twilio to facilitate fraud, chargebacks, or abuse (e.g., spam, vishing/smishing).

### Non-payment or zero/negative balance \[#non-payment]

* If your account balance becomes negative or you have overdue payments, your account will be [automatically suspended](https://help.twilio.com/articles/223183248-What-happens-if-my-Twilio-balance-reaches-zero-) until payment is made.
* Twilio does not often suspend right at zero balance; instead, we monitor for negative [balance/delayed billing](https://help.twilio.com/articles/223135487#h_01FHXS7QMAPDGSSZ4G4ECBQC3B).
* This negative balance could be due to unauthorized service usage spikes, which can be caused by activity such as toll fraud.

### Security risks \[#security-risks]

* Any use of the services that threatens the confidentiality, integrity, or availability of Twilio's platform or other Twilio customers.
* Detection of compromised accounts or malicious activities (e.g., malware distribution, credential harvesting).

If Twilio suspends your account for any of these reasons, contact Twilio Support within 24 hours to initiate review and reactivation.

## Unsuspending/reactivating your account \[#reactivating-your-account]

A suspended account can be reactivated by Twilio Support but may require you to complete the following steps:

1. **(If first time ATO)** Complete account sanitization steps found in the [Contain](/docs/usage/fraud-response-guide/contain) phase. In some cases, you may need to provide an RCA report to Twilio. Support will need to confirm completion and sufficiency.
2. Settle up any negative payment balance on the affected account (if one exists).
3. **(If repeat ATO victim)** You will be required to provide an [RCA report](/docs/usage/fraud-response-guide/example-rca-summary-request-form) in addition to completing account sanitization. Support will need to confirm completion and sufficiency for both.

If you have questions about what is required for reactivation, contact Twilio Support for clarification. You are also responsible for keeping Support informed as you complete each step to avoid delays in the reactivation process.

If you choose to permanently close your account, contact Twilio Support to initiate the process for suspending or closing your master account. If you have subaccounts, they can be suspended or closed from the [Manage Subaccounts page](https://console.twilio.com/us1/account/manage-account/subaccounts) in the Twilio Console.

Keep in mind that closing an ATO'd account and opening a new account is not recommended unless the root cause has been fully identified and remediated. Closing and reopening a new account without addressing the underlying issue may result in repeat ATOs.

## General assistance \[#general-assistance]

Twilio takes fraudulent activity very seriously. While fraud prevention is a shared responsibility, we are here to help. If you suspect or have observed fraud-related activity, whether or not you have confirmed an attack, email our fraud team at [fraud@twilio.com](mailto:fraud@twilio.com). If you are a victim to fraud, have followed the [self-service guidance](https://www.twilio.com/docs/usage/anti-fraud-developer-guide) provided, and require additional remediation assistance, please contact Twilio Support.

[Support plans and response times vary by plan](https://www.twilio.com/en-us/support-plans?_gl=1*1dmhgib*_gcl_aw*R0NMLjE3NjEyNDQxMDQuQ2p3S0NBandwT2ZIQmhBeEVpd0FtMVN3RXIzVlV5bzZmN0NTUWxPVDFmLWdqYmJRWVhGTk5SWHNEWXRucjJtN3hNeWEwVmRNS3UzcFlCb0MyMTBRQXZEX0J3RQ..*_gcl_au*MTg2NzYzMjkzMi4xNzYxMTY5NDc3*_ga*OTU3NzQwMzkwLjE3Mzc0ODA1NDY.*_ga_RRP8K4M4F3*czE3NjE4NTU2NzQkbzIxMyRnMSR0MTc2MTg1NzYzMyRqMzQkbDAkaDA.). Customers with paid support plans can submit tickets directly through the [Twilio Help Center](https://help.twilio.com/) by selecting **Submit a ticket** in the left-hand column. Please submit your request from the account where the incident took place.

Customers without a paid support plan can submit a ticket using our Help Center Assistant by sending the message "I need more help - can I submit a ticket?". Additional details on contacting Twilio Support are available [here](https://help.twilio.com/articles/360048500694-Contacting-Twilio-Support).
