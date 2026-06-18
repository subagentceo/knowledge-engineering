# Validate: Is this actually fraud?

The first step in any response is confirming the "flavor" of the activity. Whether you were alerted by Twilio, noticed a billing spike, or heard from a concerned teammate, you need to quickly distinguish between legitimate usage and malicious intent.

## Types of fraud activity \[#types-of-fraud-activity]

Twilio provides self-service log data to help you investigate some of the most common fraud activity patterns. Most incidents fall into one of these four categories:

* **[SMS Pumping](https://www.twilio.com/en-us/use-cases/fraud-prevention?tab=1_3):** An automated AIT attack where threat actors mostly exploit your signup or OTP flows to send high volumes of messages to phone numbers they control.
* **[Voice Toll Fraud](https://www.twilio.com/docs/glossary/what-is-toll-fraud):** Similar to SMS Pumping AIT, threat actors use your voice integration to trigger high-cost, unauthorized international calls.
* **[Account Takeover (ATO)](https://www.twilio.com/en-us/use-cases/fraud-prevention?tab=1_4):** A direct breach where a threat actor steals or guesses your credentials, API keys, or Auth Tokens to gain full control of your Twilio account.
* **[Vishing & Smishing](https://www.twilio.com/en-us/blog/insights/best-practices/smishing-sms-phishing):** A threat actor uses your Twilio numbers to impersonate brands or authorities, tricking end-users into revealing sensitive data (such as usernames, passwords, credit card numbers, or other personal data).

While Twilio provides platform-level telemetry and usage signals, visibility into the business logic and intent behind your specific services, campaigns, and integrated applications is inherently limited. As a result, investigations often require combining Twilio-provided data with your organization's internal logs and context to fully understand the underlying activity.

Even if an automated attack triggers an artificial inflation of traffic on our end, it's on you to identify the root cause within your own stack. We see the traffic; you see the intent. Key activities that live outside of Twilio's direct line of sight include:

* **[Promotion abuse](https://www.twilio.com/en-us/use-cases/fraud-prevention?tab=1_2):** When bots or bad actors exploit sign-up bonuses, referral credits, or marketing discounts in ways that violate the spirit of the promotion, resulting in financial loss or operational disruption for a business.
* **[Impersonation](https://www.twilio.com/en-us/use-cases/fraud-prevention?tab=1_1):** Deceptive tactics where an attacker pretends to be you, a company representative, or a trusted authority to harvest data or money.
* **[SIM Swap Fraud](https://www.twilio.com/en-us/blog/sim-swap-fraud):** This occurs when a threat actor tricks a carrier into porting a victim's number to a new SIM.
* **[Bot Attacks](https://www.twilio.com/en-us/use-cases/fraud-prevention?tab=1_5):** Fraudulent activities carried out by automated software programs ("bots") that mimic human behavior to exploit, abuse, or defraud online systems and services.

## ATO vs. non-ATO \[#ato-vs-non-ato]

Fraud-related activity on your Twilio account can occur with or without an Account Takeover (ATO).

In some cases, a threat actor does not need to compromise your account to cause harm. For example, SMS pumping can occur without an ATO. However, when an ATO does occur, the impact can be more severe. With access to credentials such as passwords, Auth Tokens, or API keys, a threat actor may be able to bypass existing security protocols, including rate limiting or CAPTCHA protections.

In ATO scenarios, attackers can also leverage your account's established reputation. For example, phone numbers you own may be used as senders for fraudulent traffic, increasing both customer impact and financial exposure.

In Twilio terms, fraud generally falls into one of two categories:

### Attacks on your account (no ATO required) \[#attacks-on-your-account]

Designed to steal money directly from you by exploiting your Twilio account and its balance. You are the primary victim, and the threat actor's goal is to get a share of the generated revenue while sticking you with the bill.

### Attacks using your account (ATO involved) \[#attacks-using-your-account]

Happens after your account has been compromised. The threat actor's goal is to use your account's resources and reputation as a weapon to attack other people and/or drive up your bill, bypassing whatever front-door security controls you may have in place.

Even when fraud appears to occur without account compromise, always evaluate for indicators of ATO as part of your investigation.

## Quick indicator checks \[#quick-indicator-checks]

If you are unsure whether you're experiencing fraud, there are several behaviors your organization can check to validate potential abuse. The three most common indicators Twilio sees across customer investigations include:

### Traffic and billing spikes \[#traffic-and-billing-spikes]

Look for sudden, unexpected increases in your Twilio usage or billing. These spikes may appear as sharp increases in voice call minutes, SMS messages sent, or Verify API requests. As part of your validation process, review both billing data and correlated usage metrics to determine whether the increase aligns with legitimate activity or indicates potential fraud.

If you suspect a billing spike has occurred in the past 30 days:

1. Log into the Twilio Console and navigate to **Monitor > Insights > Billing Usage**.
2. Check for spending spikes by service. Spend is broken down by SMS, Voice, and overall spend.

Due to the possibility of [delayed billing](https://help.twilio.com/articles/223135487-How-Twilio-billing-works#h_01FHXS7QMAPDGSSZ4G4ECBQC3B), we recommend customers investigate spikes in usage as well:

1. For call volume over time, navigate to **Monitor > Insights > Voice > Calls**.
2. For incoming and outgoing message volumes over time, navigate to **Monitor > Insights > Messages**.
3. (Optional) If [SMS Pumping Protection](https://www.twilio.com/docs/messaging/features/sms-pumping-protection-programmable-messaging) is enabled, go to **Monitor > Insights > Messaging Intelligence** to view AI-powered alerts for anomalies such as SMS pumping based on your historical usage trends.

> **Note:** To increase the time range for voice call volume insights, upgrade to [Voice Insights Advanced](https://www.twilio.com/docs/voice/voice-insights/advanced-features).

### Traffic to or from unexpected locations \[#traffic-to-unexpected-locations]

Messages or calls sent to countries where you don't normally conduct business is another common indicator of fraud. In many cases, threat actors will target [high-cost or premium-rate numbers](https://www.twilio.com/docs/glossary/what-is-toll-fraud) associated with specific international locations to maximize financial impact.

In addition to traffic patterns, review Twilio Console and API activity for access originating from the same unexpected or high-risk locations. Correlated anomalies across traffic, usage, and account activity may indicate account compromise or coordinated abuse.

**To see an overview of the volume of messages by country:**

1. Log into the Twilio Console and navigate to **Monitor > Insights > Messages**.
2. Click on the **Delivery & Errors** tab.
3. Set the breakdown to **Total Messages**.
4. For message direction, you will most likely want to have **Outgoing** selected to look for SMS pumping.
5. Scroll down to the section titled **Outgoing Messages by Top 20 Destination Countries**. Look for high volume from any countries that look suspicious.
6. If you are using Twilio Verify and Verify Fraud Guard, navigate to **Monitor > Insights > Verify > Fraud**.
7. The [Verify SMS Fraud Insights](https://www.twilio.com/en-us/changelog/verify-fraud-insights-for-automatic-sms-fraud-detection-is-in-public-beta) dashboard will show you fraud that was detected by Fraud Guard and provide easy-to-digest visualizations on country and performance trends such as conversion rates.

**To see an overview of the volume of voice calls by countries not common to your business:**

1. Log into the Twilio Console and navigate to **Monitor > Insights > Voice > Calls**.
2. (Optional) If you have [Voice Insights Advanced](https://www.twilio.com/docs/voice/voice-insights/advanced-features), select the appropriate time range for the suspected events by clicking **Time range**.
3. Select **More filters**.
4. Under **To phone number attributes**, click on the dropdown under **To country code**. Select all country codes associated with countries that are not historically business relevant.
5. Under **Calls**, observe if there is a significant increase in total calls over time. In addition, check **Average length of call (ALOC)**, as consistently short calls can also indicate fraud.
6. (Optional) If you are supporting a Twilio Verify Voice channel service, navigate to **Monitor > Logs > Verify**. Sort by **Country** and **Date/time range**.

**To see an overview of API or Console activity from a specific IP address and perform a geo lookup:**

1. Log into the Twilio Console and navigate to **Monitor > Insights > Audit**.
2. Click **Audit Events Log**.
3. Under **Source IP**, check for [administrative activity](#ato-and-unexpected-admin-activities), including new user session creation, from unrecognized IP addresses.
4. To check the country of origin for a suspicious IP address, use a free lookup service such as those that can be found at [ipinfo.io](https://ipinfo.io).

### ATO and unexpected administrative activities \[#ato-and-unexpected-admin-activities]

The following administrative actions are high-risk indicators of ATO and should be treated as suspicious unless explicitly authorized:

* Creation of new API keys
* Modifications to geo-blocking rules
* Changes to account-level settings

If any of these actions are unexpected, they may indicate account compromise. Use the steps below to review recent administrative activity and validate whether the changes were legitimate:

1. Log into the Twilio Console and navigate to **Monitor > Insights > Audit**.
2. Click **Audit Events Log**.
3. Under **Event Type**, high-risk administrative events should be evaluated by your organization for legitimacy, such as `account-api-keys.created`, `account-api-keys.updated`, `voice-geographic-permissions.updated`, and `application.created`.

## Specific indicator checks \[#specific-indicator-checks]

Once you have confirmed that fraudulent activity is occurring, identify the specific fraud type involved so you can take the appropriate containment and remediation actions. The sections below outline common fraud patterns and the key indicators to use when narrowing down the type of abuse you may be experiencing.

### Common fraud \[#common-fraud]

This category includes direct abuse of the Twilio platform. Because this activity occurs within Twilio systems, Twilio may be able to provide logs and telemetry that offer more direct visibility to support your investigation.

| Fraud/Abuse Type                | Key Indicators                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Where to Check                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **SMS Pumping (Messaging AIT)** | • Immediate increase in messaging volume and billing.; • High volume of messages to high-risk countries or countries that don't correlate with a marketing campaign or other known event. ; • High message volumes from new accounts or subaccounts, typically less than 7 days old. Messages sent to sequential or similar phone numbers. ; • High volume of form requests from a single IP or small IP range.\*; • Drastic drop in your OTP conversion rates (many sends, few successes).; • Alerts from Verify Fraud Guard or [Programmable SMS Pumping Protection](https://www.twilio.com/docs/messaging/features/messaging-insights/sms-pumping-protection-insights) that it has detected and blocked suspicious traffic.                                                                                                                                                                                                                                                                                                                                                                             | • [Messaging Insights](https://console.twilio.com/us1/monitor/insights/sms?frameUrl=%2Fconsole%2Fsms%2Finsights%2Fdelivery%3Fx-target-region%3Dus1\&q=tabKey%3Doverview); • [Programmable Messaging Logs](/docs/usage/fraud-response-guide/analyze#programmable-messaging-logs); • [Billing Usage Insights](https://console.twilio.com/us1/monitor/insights/billing); • [Messaging Intelligence](https://console.twilio.com/us1/monitor/insights/intelligent-alerts?q=timeRangeFilterPreset%3DPAST_D_7%26tabKey%3Dalert); • [Verify Logs](https://console.twilio.com/us1/monitor/logs/verify-logs); • [Verify Fraud Guard](https://www.twilio.com/docs/verify/preventing-toll-fraud/sms-fraud-guard); \*For non-ATO, end-user service logs. |
| **Toll Fraud (Voice AIT)**      | • Sudden, unexplained spike in voice minute costs.; • High volume of calls to premium-rate or unusual international numbers.; • Unusually long call durations (threat actors may keep the line open).; • A high number of simultaneous calls.; • Thousands of very short-duration calls are made.; • Calls originating from a single user account or IP address.\*; • Calls originating from your account at odd hours (e.g., 3:30 AM).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | • [Programmable Voice Logs](/docs/usage/fraud-response-guide/analyze#programmable-voice-logs); • [Voice Calls](https://console.twilio.com/us1/monitor/insights/voice/calls?q=c3RhcnRkYXRldGltZT03ZA%3D%3D); • [Billing Usage Insights](https://console.twilio.com/us1/monitor/insights/billing); \*For non-ATO, end-user service logs.                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Account Takeover (ATO)**      | • Logins or API activity from new or unrecognized IP addresses or locations.; • Sudden appearance of any other fraud indicators (like vishing/smishing or pumping).; • Password reset or email change alerts you didn't initiate.; • New API keys created or permissions modified without your knowledge.; • Auth Token created without your knowledge, or your primary Auth Token has been "promoted" or reset.; • Security settings changed (e.g., usage triggers, geo-permissions).; • You receive reports that your Twilio numbers are sending spam or vishing/smishing links (e.g., fake bank login pages) to end-users.; • You find your Account SID or Auth Token publicly visible in code repositories, app configurations, wiki pages, logs, etc.; • Follow the instructions [here](https://help.twilio.com/articles/360021347073-Proactive-Steps-for-Customers-Experiencing-Account-Takeover) for how to look up if your credentials have been exposed on GitHub.; • Tools such as [Trufflehog](https://github.com/trufflesecurity/trufflehog) can look for secrets in places beyond code repos. | • [Audit Insights](https://console.twilio.com/us1/monitor/insights/audit); • [Billing Usage Insights](https://console.twilio.com/us1/monitor/insights/billing)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Vishing & Smishing**          | • High volume of identical outbound messages containing URLs (especially shorteners), callback numbers, or other call-to-action requests.; • Messages create a false sense of urgency (e.g., "Account Locked").; • A sudden spike in delivery errors, especially **Error 30007**, which can indicate filtered messages due to a carrier violation.; • A high number of "STOP" SMS replies from recipients.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | • [Programmable Messaging Logs](/docs/usage/fraud-response-guide/analyze#programmable-messaging-logs); • [Messaging Insights](https://console.twilio.com/us1/monitor/insights/sms?frameUrl=%2Fconsole%2Fsms%2Finsights%2Fdelivery%3Fx-target-region%3Dus1\&q=tabKey%3Doverview); • [Billing Usage Insights](https://console.twilio.com/us1/monitor/insights/billing); • [Messaging Intelligence](https://console.twilio.com/us1/monitor/insights/intelligent-alerts?q=timeRangeFilterPreset%3DPAST_D_7%26tabKey%3Dalert); • [Programmable Voice Logs](/docs/usage/fraud-response-guide/analyze#programmable-voice-logs); • [Voice Calls](https://console.twilio.com/us1/monitor/insights/voice/calls?q=c3RhcnRkYXRldGltZT03ZA%3D%3D)        |

### Related Activity

The following activities are often associated with AIT and vishing/smishing. While Twilio provides some native tools to support detection, investigations in these cases will primarily rely on your organization's internal logs for user identity, authentication, and engagement activity.

Because Twilio has limited visibility into customer-integrated systems, your internal monitoring and telemetry will be the primary sources of truth when validating these threats.

| Related Activity    | Key Indicators                                                                                                                                                                                                                                                                                                                                                           | Where to Check                                                                                                                                                                                                                                                                                                                           |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Promotion Abuse** | • High velocity of new account signups in a short time.; • New user accounts have "gibberish" or fake-looking names/emails.; • Signups using VoIP or disposable numbers (detectable with Twilio Lookup).; • Zero post-signup engagement (user gets the credit and disappears).; • Unusual spikes in message volume, especially for verification or promotional messages. | • [Messaging Insights](https://console.twilio.com/us1/monitor/insights/sms?frameUrl=%2Fconsole%2Fsms%2Finsights%2Fdelivery%3Fx-target-region%3Dus1\&q=tabKey%3Doverview); • [Lookup Identity Match](https://www.twilio.com/docs/lookup/v2-api/identity-match); • [Audit Insights](https://console.twilio.com/us1/monitor/insights/audit) |
| **SIM Swap Fraud**  | • Your customer reports they can no longer make calls or send texts, or that they have lost phone service entirely.; • A user contacts support, reporting they are not receiving OTPs and see unauthorized account activity.; • Lookup API call with the **sim\_swap** package shows a recent swap date (e.g., within the last 24-72 hours) before you send an OTP.      | • [Lookup SIM Swap](https://www.twilio.com/docs/lookup/lookup-sim-swap); • [Verify Logs](https://console.twilio.com/us1/monitor/logs/verify-logs)                                                                                                                                                                                        |
| **Impersonation**   | • Lookup API identifies the signup phone number line type as **voip** or **landline** instead of **mobile**.; • Lookup API with **identity\_match** shows a mismatch between the provided name and the phone number's registered owner.                                                                                                                                  | • [Lookup Line Type Intelligence](https://www.twilio.com/docs/lookup/v2-api/line-type-intelligence); • [Lookup Identity Match](https://www.twilio.com/docs/lookup/v2-api/identity-match); • [Verify Logs](https://console.twilio.com/us1/monitor/logs/verify-logs)                                                                       |
| **Bot Attacks**     | • A very high request velocity to your **Send OTP** or **Verify** endpoint.; • Inhumanly fast form submission (e.g., \< 3 seconds from page load to submit).; • A high volume of requests that fail your CAPTCHA or "honeypot" field checks.; • Low overall conversion rate (many requests, few successful verifications).                                               | • [Lookup Line Type Intelligence](https://www.twilio.com/docs/lookup/v2-api/line-type-intelligence); • [Lookup Identity Match](https://www.twilio.com/docs/lookup/v2-api/identity-match); • [Verify Logs](https://console.twilio.com/us1/monitor/logs/verify-logs)                                                                       |

## Next steps \[#next-steps]

If you have confirmed ATO involvement or other types of fraud and abuse, we recommend that you immediately take steps to eliminate any remaining paths for access and further abuse by proceeding with the actions outlined in the [Contain](/docs/usage/fraud-response-guide/contain) phase.

If you require additional assistance from Twilio Support, either to perform administrative actions or to support the investigation, proceed to the [Engage](/docs/usage/fraud-response-guide/engage) phase.
