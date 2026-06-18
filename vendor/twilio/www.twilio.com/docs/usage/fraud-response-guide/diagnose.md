# Diagnose: Root Cause Analysis (RCA)

The goal of the Diagnose phase is to identify the underlying issues or vulnerabilities that contributed to the incident. Understanding how and why the activity occurred helps reduce the likelihood of recurrence and enables more effective long-term prevention. A thorough root cause analysis also helps Twilio Support assist with resolution, when applicable.

A complete RCA includes performing and documenting the following actions during your investigation:

* **Build a timeline:** Document when the suspicious activity was first detected, when it began, and when it ended. Include precise dates and timestamps wherever possible. We strongly recommend starting this during the Analyze phase.
* **Assess the impact:** Determine the scope of the incident. Consider whether the impact was financial, reputational, or operational, and whether any sensitive data may have been exposed.
* **Identify the root cause:** Identify how the activity occurred and what conditions allowed it to happen (for example, compromised credentials, misconfigured access, or insufficient controls).
* **Define preventative and corrective actions:** Document the medium and long-term measures you will implement to reduce the risk of similar incidents in the future.

At the end of your RCA, you should have a clear set of corrective actions that strengthen your security posture and reduce the risk of repeat (or similar) incidents.

> \[!WARNING]
>
> If your account is a repeat victim of fraud, Twilio may require submission of an RCA report before account reactivation.

## Build a Timeline \[#build-a-timeline]

As part of your RCA, create a detailed timeline that captures the full lifecycle of the incident. This includes when suspicious activity first occurred, when it was detected, and all actions taken in response (including any communication with Twilio).
Be sure to include timestamps for key milestones such as detection, containment (for example, revoked credentials, password resets, or account suspensions), recovery, and remediation. Finally, note when normal operations were fully restored.

Record this information as events occur to ensure accuracy:

**1. Identify relevant log sources:**\
Before digging into individual logs, you will need to determine the logs relevant to your investigation. This will depend on the nature of the attack. For each type of attack, review the table in the section Specific Indicator Checks.

**2. Gather Twilio logs:**\
Gather the relevant logs and usage reports, including message logs, call logs, Monitor logs for administrative changes, and any relevant subaccount activity (if applicable).

**3. Determine incident start and end times:**

* For AIT, identify the first spike in cost, voice traffic, or messaging volume.
* For ATO, look for the first unexpected administrative actions.
* For vishing/smishing, identify when the first suspicious call or message was sent.

**4. Correlate Twilio logs with application logs:**\
Twilio logs typically show when your application requested an action, not the originating user or IP address. Correlate Twilio timestamps, phone numbers, and request data with your internal application logs to complete the timeline.

**5. Document key events:**\
Evaluate the compiled set of logs and record dates and timestamps in UTC of significant events. These can include changes in account suspension and reactivation, changes in suspicious behavior, and notable interactions with Twilio Support. Also, preserve evidence such as screenshots and the exported logs for investigation and reporting. The following is an example timeline:

```bash
2026-01-10 14:00: First detectable spike in SMS traffic. Botnet begins targeting the /v1/send-otp endpoint using high-cost Mobile Country/Network Codes.
2026-01-10 14:15: Conversion rate for SMS OTPs drops from 75% to <2%. Rapid succession of requests from a narrow range of IP addresses, mainly cloud hosting providers.
2026-01-10 14:45: Twilio Monitor generates an "Urgent" alert for error code 30007 (Message filtered) and high volume in non-standard regions.
2026-01-10 15:10: Product team implements a temporary IP-based block on the offending traffic source. Traffic dips slightly but threat actor rotates to alternative proxies.
2026-01-10 15:45: Twilio fraud detects SMS pumping. The Twilio account is suspended to prevent further financial loss. All OUTBOUND SMS return error code 30002.
2026-01-10 16:00: We open a high priority ticket with Twilio Support to investigate the suspension and request traffic logs.
2026-01-10 18:30: Twilio Support confirms SMS fraud activity detection and provides a list of high risk prefixes (e.g., +242, +371) that caused the suspension.
2026-01-11 09:00: Product team updates geo permissions in the Twilio Console, disabling all countries not currently in active user base. Plan is to add CAPTCHA to sign-up flow.
2026-01-11 11:15: We provide evidence of remediation (rate limiting and geo blocking) to Twilio Support and request reactivation.
2026-01-11 13:45: Twilio fraud team reviews the fixes and reactivates the account. Sending capabilities are restored.
2026-01-11 14:00: Traffic returns to baseline levels. Conversion rates normalize to >70%.
```

## Assess the Impact \[#assess-the-impact]

Once you've assembled a timeline of what happened and when, assess the overall scope and impact of the incident. This includes operational, financial, customer, and reputational considerations.
As you evaluate impact, consider the following:

* Were any critical services disrupted? If so, for how long?
* How many customers were affected?
* Was personal data unintentionally disclosed? If yes, what type of data, how many individuals were impacted, and what are your obligations for notification to the affected parties as they align with privacy laws?
* How much did your Twilio usage and billing increase during the incident?
* What is the potential impact to your brand reputation and customer trust?
  Start by documenting the Twilio accounts, phone numbers, and services that were impacted.

### Account Takeover (ATO) \[#account-takeover-ato]

For ATO, focus on data exposure, financial impact, and reputational risk.
Determine whether customer data, such as call or message content and metadata, was accessed and estimate how many messages or recordings were involved. Customers can investigate ATO activity using Monitor Events, looking for event types such as:

* `bulkexports.created`
* `bulkexports.downloaded`
* `recording.accessed`
* `transcription.accessed`

These events can help determine whether voice or message content was downloaded or accessed. If the ATO coincided with artificially inflated traffic or vishing/smishing activity, follow the guidance in those sections to fully assess financial and reputational impact.

### Artificially Inflated Traffic (AIT) \[#artificially-inflated-traffic-ait]

For AIT, focus on identifying the volume of fraudulent calls or messages and their financial impact.
Start with Twilio usage records for financial impact, which can be found in the top-right corner of the Twilio Console under **Admin → Account Billing → Usage Summary**.
For SMS Pumping, estimate the percentage of traffic that was fraudulent by comparing conversion rates during normal operation (like OTP verification success rates) against rates observed during the incident.
For example:
If your normal OTP conversion rate is \~75% and it drops to \~2-3% during the incident, the difference can reasonably be attributed to fraudulent traffic.
If you're using Twilio Verify with Fraud Guard, use the Verify SMS Fraud Insights dashboard. Finally, to determine which receiving numbers may be premium-rate and associated with malicious behavior, you can use Twilio Lookup with Line Type Intelligence.

### Vishing/Smishing \[#vishing-smishing]

For vishing or smishing incidents, focus on reputational risk and customer security impact. [Bulk download messages](https://help.twilio.com/articles/223183588-Exporting-SMS-and-Call-Logs) sent during the incident timeframe and review the different fraudulent message variants. Determine:

* How many messages were successfully delivered
* The number of unique destination phone numbers impacted
* Whether the message content attempted to collect sensitive information (such as usernames, passwords, or payment details)
* Whether attackers impersonated your brand or trusted entities

These findings should directly inform your customer communications, as well as your corrective and preventative actions.

## Identify the Root Cause \[#identify-the-root-cause]

By building a timeline and assessing impact, you've established what happened. The next step is to understand how and why the fraudulent activity occurred.
Review the timeline to identify the initial point of compromise and the conditions that made it possible. For example, if credentials were exposed, consider how those credentials became accessible in the first place. The goal is to clearly identify the method of compromise and the underlying vulnerabilities that were exploited.
As part of Twilio's shared responsibility model, many fraud incidents stem from gaps or weaknesses within a customer's environment or application logic. Common root causes we observe include the following:

| Root cause                                      | Description                                                                                                                  | Example underlying vulnerabilities                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :---------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Credential exposure                             | Secrets such as Account SIDs, auth tokens, and API keys are leaked outside your organization and those who are need-to-know. | • Limited or no controls to prevent Twilio secrets such as Auth Tokens or API keys from ending up in public code repositories.; • Insufficient blocking of vishing, smishing, or phishing attempts for login credentials.                                                                                                                                                                                                                                 |
| Weak authentication                             | Poor authentication practices in place for logins, webhooks, and other services that require access.                         | • Not requiring multi-factor authentication.; • Weak username and password requirements.; • Insufficient blocking of excessive authentication attempts, allowing for credential stuffing.                                                                                                                                                                                                                                                                 |
| Unprotected public endpoints                    | Entry points to an application or database are accessible over the internet without specific security measures in place.     | • Lack of CAPTCHAs or general bot protection.; • Insufficient or lack of rate limiting for form submissions.; • Unauthenticated webhooks, such as those that don't [validate the X-Twilio-Signature header](https://www.twilio.com/docs/usage/webhooks/webhooks-security).; • Old, forgotten, or development endpoint instances with minimal security controls are exposed.                                                                               |
| Permissive geo blocking                         | Allowed usage of services from countries that are not typical for the business.                                              | • Not configuring appropriate limited settings for [SMS geo permissions](https://www.twilio.com/docs/messaging/guides/sms-geo-permissions) or [Voice Dialing geo permissions](https://www.twilio.com/docs/sip-trunking/voice-dialing-geographic-permissions), or Verify Geo Permissions.; • Fraud Guard not configured to the appropriate [protection level](https://www.twilio.com/docs/verify/preventing-toll-fraud/sms-fraud-guard#protection-levels). |
| Insufficient Know Your Customer (KYC) practices | Not sufficiently vetting the identity of the business and users interacting with the service.                                | • OTP not integrated into existing verification flow.; • Fraud Guard not configured to the appropriate protection level.; • [Lookup Line Type Intelligence](https://www.twilio.com/docs/lookup/v2-api/line-type-intelligence) not configured to check numbers before sending.; • Lack of a dedicated KYC platform for high risk applications.                                                                                                             |

### 5 Whys Walkthrough \[#5-whys-walkthrough]

One effective framework for conducting a RCA is the "5 Whys" technique. This approach helps teams move beyond surface-level symptoms and identify the underlying process, control, or knowledge gaps that allowed an incident to occur.
The goal is to ask 5 underlying "why" questions in succession to get to the core problems you need to tackle and should inform your preventative and corrective actions. It is up to your team to deliberate and determine what the 5 questions should be.

In the following example, we use the "5 Whys" technique to perform RCA in a hypothetical case of ATO:

**Scenario**:
A customer discovers that unauthorized messages were sent from phone numbers in their Twilio account.

**1. Why were unauthorized messages sent from the Twilio account?**\
Because the threat actor used a valid Twilio Auth Token to access the account and send messages.

**2. Why did the threat actor have access to a valid Twilio Auth Token?**\
Because the Auth Token was exposed publicly by our development team and discovered by the threat actor.

**3. Why was the Auth Token exposed publicly?**\
Because it was accidentally committed to our GitHub public code repository.

**4. Why was the Auth Token committed to a public repository?**\
Because the developer did not use environment variables or a .gitignore file to keep sensitive credentials out of our public repository.

**5. Why did the developer not use environment variables or .gitignore?**\
Because there was a lack of secure coding practices and insufficient training on handling secrets in source code.

**Outcome:**
The root cause is traced to insecure development practices and lack of awareness about protecting sensitive credentials. This leads to actionable steps such as:

* Educating developers on secure coding practices and secrets management.
* Implementing automated tools to scan for secrets before code is pushed.
* Rotating and revoking all potentially exposed Auth Tokens and API keys immediately.
* Enforcing usage of environment variables and .gitignore to prevent accidental exposure.

## Define Preventive and Corrective Actions \[#define-preventive-and-corrective-actions]

### Account Takeover (ATO) \[#account-takeover-ato-2]

Almost all ATOs are caused by Auth Token or API key compromise. For those cases, the root cause is a specific vulnerability on our customer's side of shared responsibility. These items can include vulnerabilities such as those found in integrated applications, open ports, secrets managers, or generally out-of-date third party services.

Use the following as a checklist to ensure the risk of a re-compromise of your account(s) is limited.

**Credential Exposure:** The threat actor used secrets such as Account SIDs in combination with auth tokens and API keys that were leaked outside your organization to gain access to your account.

* Implement additional controls including two-factor authentication, [restricted API key permissions](/docs/iam/api-keys/restricted-api-keys), a process to rotate credentials regularly, [secure storage of credentials](/docs/usage/secure-credentials), usage alerts, and a regular review of geographic permissions.
* Configure proactive and automatic rotation for Auth Tokens/API keys on a regular basis.
* Explore Twilio's security offerings, including [Twilio Editions](https://www.twilio.com/en-us/editions).
* [Create and integrate OAuth apps](/docs/iam/oauth-apps/overview) in the Twilio Console to enable short-lived credentials with limited access.
* Review Twilio's beta offerings such as [role-based access control (RBAC)](/docs/iam/access-control/overview).
* Set [ATO-specific](https://www.twilio.com/en-us/blog/developers/tutorials/building-blocks/monitor-alert-suspicious-activities-twilio-account) Console Alarms that monitor for activities such as API requests made with invalid Auth Tokens.
* Educate your team on security best practices and update internal policies.
* Change all API keys for different integrations used on your website (WordPress, Cpanel, Paypal, etc.).
* Secure your website by closing ports, removing unnecessary disclosed files, and ensuring that your website and its integrations are up-to-date.
* Check if you have any of the following applications integrated with your Twilio account: Twilioid, Agile CRM, TwiConnect. These applications have known vulnerabilities, and we recommend exploring alternative solutions if you are currently using them.
* Review the permissions structure of your entire website and ensure that none of your secrets are publicly visible in plain text.
* Conduct a thorough audit of how your web application(s) handle failure cases that may inadvertently reveal credentials.
* Perform penetration tests and vulnerability scanning on your website to identify potential security weaknesses.
* If you are using a Symfony or Laravel PHP integration, exercise caution when dumping the contents of the `$_SERVER` and `$_ENV` variables or outputting the `phpinfo()` contents, as this can expose sensitive information such as database credentials or API secrets. Ensure that the web profiler is never enabled in production as it can also expose environment variable values. For more information, refer to the [Symfony documentation](https://symfony.com/doc/current/configuration.html).

### Artificially Inflated Traffic (AIT) \[#ait-corrective-actions]

AIT is most often the result of customers not placing limits on public forms, allowing bots to exploit features in applications such as callbacks, dial outs, and OTP messages.

**"Click-to-Call" Abuse (Voice):** The threat actor submits a premium rate number into your web form that initiates callbacks.

* Add server-side validation by modifying your form logic to use regex to check input phone numbers. Only allow numbers matching the country codes you serve (e.g., only allow `+1...`).
* Do not initiate a call until the user verifies number ownership and that they are not a bot (e.g., via an OTP-style code and CAPTCHA).

**IVR Dial-Through (Voice):** The threat actor calls your support number and manipulates the menu to dial out to a premium number.

* Review your TwiML/Studio flows and look for the [`<Dial>`](https://www.twilio.com/docs/voice/twiml/dial) verb. Ensure that `<Dial>` never takes user input directly as the phone number to call.
  * Bad code: `<Dial><Play>Enter number</Play></Dial>` (Allows calling anyone).
  * Good code: Hardcode destinations or use a strict allow-list of phone numbers.
* If you cannot change code immediately, update the URL of the incoming phone number in the Twilio Console to a static TwiML bin that just says something like "System Maintenance" and hangs up (`<Response><Say>Maintenance</Say><Hangup/></Response>`).

**SMS Pumping / OTP Fraud (Messaging):** The threat actor is using a form you own to send many SMS messages to numbers they control.

* Depending on the type of service impacted ([SMS](/docs/messaging/guides/sms-geo-permissions), [Voice](https://help.twilio.com/articles/223180228-International-Voice-Dialing-Geographic-Permissions-Geo-Permissions-and-How-They-Work), or [Verify](/docs/verify/preventing-toll-fraud/verify-geo-permissions)), enable or review existing geo permissions to block outbound traffic to countries where you have no business.
* Consider using Twilio's fraud prevention features (for example, Verify Fraud Guard, SMS Pumping Protection).
* If you are unable to use Fraud Guard or SMS Pumping Protection, utilize our [SMS Pumping Risk Score API package](https://www.twilio.com/docs/lookup/v2-api/sms-pumping-risk).
* Set up alerts for usage spikes or abnormal patterns, including configuring [notifications for Intelligent Alerts for Twilio Messaging](/docs/messaging/features/intelligent-alerts#how-to-be-notified-of-intelligent-alerts).
* Remove the form from public access, or at minimum, temporarily hide the SMS input field.
* Consider implementing rate limiting. For example:
  * Limit requests to 1 per IP address per minute.
  * Limit requests to 1 per phone number per hour.
* Add reCaptcha or hCaptcha to the form if there is no similar bot protection in place.
* Use the Twilio Lookup API to check the `line_type` of the number before sending. Block VoIP or non-mobile numbers if possible.
* Monitor traffic and conversion rates regularly. Use [alarms](https://www.twilio.com/en-us/blog/developers/tutorials/building-blocks/monitor-alert-suspicious-activities-twilio-account#toc-heading-53706be5-552b-45f3-9ee6-54397576dc43) to monitor for indicators such as geo permissions related error codes.

### Vishing/Smishing \[#vishing-smishing-corrective-actions]

If your Twilio services are being used for vishing or smishing, you are likely dealing with either an ATO or application form abuse where a public-facing endpoint (like a signup or "contact us" form) is being exploited by bots. For ATO, follow the instructions in the Account Takeover (ATO) section. For form abuse, follow the items under SMS Pumping / OTP Fraud above. However, if your organization is an ISV and threat actors are creating new customer accounts to conduct this activity, this may likely be due to poor KYC practices.

**Poor KYC practices:** Failing to accurately verify a user's identity, business legitimacy, or intended use case, allowing the threat actors to use your Twilio services to conduct fraudulent activity.

* Utilize [Customer Profiles](https://www.twilio.com/docs/trust-hub/trusthub-rest-api/console-create-a-primary-customer-profile) within Twilio Trust Hub to register your customers and ensure creation of [Secondary Profiles](https://www.twilio.com/docs/trust-hub/trusthub-rest-api/console-create-a-secondary-customer-profile).
* Integrate the Twilio [Compliance Embeddable](https://www.twilio.com/en-us/changelog/launching-the-isv-kyc-embeddable-in-pilot-#:~:text=The%20embeddable%20can%20help%20streamline,its%20built%2Din%20validation%20capabilities) into your existing web application to register customers and meet compliance requirements. Streamline KYC processes via enabling self-service for your customers.
* Reevaluate your Twilio subaccount structure and consider using one Twilio subaccount per customer to isolate each customer.
* Require your customers who need to send messages in the US to [register their brand and campaigns for A2P 10DLC](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api). [Validate campaign info](https://help.twilio.com/articles/11847054539547-A2P-10DLC-Campaign-Approval-Requirements#h_01KGNGR2PEZGAB8911MRAHVKQ3) against additional information you may have on those customers.

For best practices related to other fraud scenarios that may not be covered here (such as PBX hacking and telephone slamming), refer to the [Anti-Fraud Developer's Guide](/docs/usage/anti-fraud-developer-guide).

## Document RCA \[#document-rca]

As you complete each of the steps in the Diagnose phase, document everything so that this can be used to create an [RCA summary document](/docs/usage/fraud-response-guide/example-rca-summary-request-form). Share your completed RCA document with Twilio's Fraud team and any relevant stakeholders. If you need further assistance or have questions about your RCA, request to be connected with a Twilio Support Specialist or the Fraud team.
