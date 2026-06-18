# Anti-Fraud Developer's Guide

## Overview

Each year, tens of billions of dollars are lost to telecom fraud worldwide. To protect you Twilio has internal systems designed to proactively and automatically detect fraudulent uses of our communications platform.

When this occurs, we reach out to our affected customers immediately. However, the very nature of Twilio as a flexible and powerful programmable communication platform opens up the possibility of novel fraud tactics. Developers need to be aware of the forms of telecom fraud that exist and that their applications may be vulnerable to.

This document is intended to help Twilio developers build applications that prevent hackers and fraudsters from compromising your app and victimizing you. The way you develop your Twilio app, and how you manage your accounts, can prevent these tactics from being used.

In this document, we'll outline best practices, fraud scenarios, and anti-fraud practices for:

1. [Account-level protection](/docs/usage/anti-fraud-developer-guide#account-level-protection)
2. [Application-level protection](/docs/usage/anti-fraud-developer-guide#application-level-protection)
3. [SIP Trunking](/docs/usage/anti-fraud-developer-guide#sip-trunking)
4. [Programmable SMS](/docs/usage/anti-fraud-developer-guide#programmable-sms)
5. [Phone numbers](/docs/usage/anti-fraud-developer-guide#phone-numbers)
6. [What to do if you suspect fraud](/docs/usage/anti-fraud-developer-guide#if-you-suspect-fraud)

## Account-Level Protection

Fraudsters will take advantage of any lax security practices. So before writing your first line of code, there are many things you can do to lock down your Twilio account in the Twilio Console to prevent fraudulent use:

* **Use a password manager.** Such a tool allows you to generate complex passwords and store them safely, encrypted and ready to use when you need them. Although we cannot recommend a specific product, [here is an extensive list](https://en.wikipedia.org/wiki/List_of_password_managers) which we encourage you to investigate.
* **Enable two-factor authentication.** Two-factor authentication (2FA) determines the identity of a user by validating once by logging in, followed by validating a second time from their mobile device. This makes it much harder for a fraudster to compromise your account using stolen account credentials. In the Twilio Console, you can [configure your account to require 2FA](https://www.twilio.com/console/account/settings). When this is enabled, we will send you a verification code--a one-time token--via SMS. Without providing this code at login time, any login attempts to your account will fail.
* **Keep your auth token and API keys secret.** Anyone who has your account SID and your auth token can make an API request for your account. If you think your auth token or API key may be compromised, generate new ones. To learn how to change auth tokens and API keys, see [Auth Tokens and How to Change Them](https://help.twilio.com/hc/en-us/articles/223136027-Auth-Tokens-and-How-to-Change-Them) and [API Keys](/docs/iam/api-keys/key-resource-v2010).
  * To store and access your credentials with use environment variables, see [Store Your Twilio Credentials Securely](/docs/usage/secure-credentials).
  * To improve credential protection, use [Twilio OAuth apps](/docs/iam/oauth-apps/overview) and a Secrets Manager for the OAuth client credentials.
* **Disable outbound calling.** If your application only requires taking inbound calls--calls made by someone calling into your app--we recommend disabling outbound dialing permissions. This eliminates the risk of traffic pumping to expensive international routes (see Programmable Voice Fraud Scenarios below). Audit your [voice geographic permissions](https://www.twilio.com/console/voice/settings/geo-permissions) to restrict calling only to countries you expect to call, if any, and block all others. If your app needs to make outbound international calls, we recommend enabling only routes to destinations where you intend to have call traffic.
* **Disable outbound SMS.** Similarly, if your application does not need to send SMS messages, you can disable outbound SMS for your account in the Twilio Console by disabling [SMS geographic permissions](https://www.twilio.com/console/sms/settings/geo-permissions) globally.
* **Implement usage triggers.** [Usage triggers](https://help.twilio.com/hc/en-us/articles/223132387-Protect-your-Twilio-project-from-Fraud-with-Usage-Triggers) can be set to send a webhook to a callback URL you specify when predefined usage criteria are met. For example, you can suspend a subaccount in response to a usage trigger being fired for spending more than $30 per day or for long-duration calls. By notifying you of suspicious usage, this can help protect you against fraud.

## Application-Level Protection

Once your account is protected, you should ensure your application itself is protected. This section covers the types of fraud you might encounter, broken out by product, along with practices you can follow to prevent them from happening to you.

### Programmable Voice

The most common form of telecom fraud we see with our Programmable Voice products is [a form of toll fraud known as traffic pumping](/docs/verify/preventing-toll-fraud/sms-fraud-guard). These schemes, based on outbound calls placed from Twilio's platform through your account, direct call traffic to a high-cost destination that the fraudster owns, such as a premium rate number (PRN) obtained from an international carrier or number reseller.

The top 10 fraudulent destinations we see are:

1. Latvia
2. Lithuania
3. Serbia
4. Somalia
5. Congo
6. Pacific/Caribbean Islands
7. Chad
8. Gambia
9. Sierra Leone
10. Guinea

Typically, the call is answered with an automated voice recording intended to maintain a conversational pattern, or simply silence, to keep it from being recognized as fraudulent. The carrier (which may or may not be aware of the fraudulent usage) then shares the revenue generated by the calls to that number with the fraudster.

These charges are billed to the owner of the calling number — so if it's your number, you're the victim of the fraud. Fraudsters can use scripts and bots to generate a very high volume of traffic in just minutes. Charges are by the minute, so the longer the duration of each call, the more the fraudster will earn from it.

#### Fraud Scenarios

Application-level exploits for traffic pumping include:

* **Signup flow.** In this multitenancy scenario, a fraudster uses your app to create one or more Twilio subaccounts and get access through them to international dialing. They then place outbound calls through your account. Such calls may be generated by a script so that call volume and duration can be controlled by the fraudster automatically.
* **Account verification.** If you use Twilio to implement 2FA by employing voice verification, it might be exploited for traffic pumping. The attack is analogous to SQL injection. As with signup flow, scripts may be used to generate large amounts of call traffic.
* **Toll-free.** This happens when a fraudster pumps traffic to your toll-free number. By doing so, they may generate revenue from one or more of the carriers in the call path. This technique can also be used to harass you into giving up a particular vanity number (see TDoS below).

#### Anti-Fraud Practices

* **Form field validation.** For entered phone numbers, validate the field to ensure numbers to expensive routes can't be entered into your form. This can be prevented by filtering by country-calling code and call prefix.
* **Use Verify for 2FA.** Your users' login credentials can be compromised in several ways--for example, if they're written on a sticky note that someone else sees. As a developer, you have no control over that, and once compromised, a fraudster can use your application to commit fraud. However, if you implement 2FA in your app, user logins will require a second factor that a fraudster wouldn't have access to--your user's mobile device. Without that, the fraudster can't log in and commit fraud. To learn how, see our [Verify Quickstarts](/docs/verify/quickstarts).
* **Implement rate limiting.** Your app can control the rate of call requests you send to Twilio. For example, you can [use nginx to rate limit](https://www.howtoforge.com/rate-limiting-with-nginx), and [this Stack Overflow article](https://stackoverflow.com/questions/667508/whats-a-good-rate-limiting-algorithm) discusses how to implement a rate-limiting algorithm in Python. This can limit your exposure to fraud.

## SIP Trunking

If you're using our SIP Trunking product for your PBX, the most common forms of telecom fraud we see arise from PBX hacking. To conduct fraud, the fraudster must first hack into your PBX to gain access to it. For example, they can use tools that sweep the ports on your PBX and then exploit an open port to compromise your system. They may also be able to compromise your SIP credentials by getting them from the PBX. Other system vulnerabilities may be exploited as well.

### Fraud Scenarios \[#fraud-scenarios-2]

* **Basic call pumping.** Once your PBX is compromised, the fraudster can reconfigure it to gain control of outbound international dialing. This allows them to conduct traffic pumping originating from the PBX. Aside from the fact that the call traffic originates from your PBX rather than from your Twilio app, the fraud scenario resembles the Programmable Voice scenarios described above: the fraudster pumps call traffic via your Twilio account to a high-cost destination that they own.
* **Call forwarding.** Upon gaining access to the PBX, the fraudster configures call forwarding to an expensive destination. They then generate calls to the PBX, which are then automatically forwarded to the destination through your Twilio SIP trunk.
* **Multiple transfers.** This is a more sophisticated form of the call-forwarding attack. Here the call that was forwarded to the high-cost destination is then transferred by the PBX to a second high-cost destination. The connection is maintained by Twilio and billed to your account. The call may stay active for up to four hours before it is automatically disconnected. The fraudster may repeat this to generate hundreds or thousands of calls.
* **Man in the middle.** Voice calls use the [RTP protocol](https://en.wikipedia.org/wiki/Real-time_Transport_Protocol) for media. If the attacker gains control of a compromised machine, they may transparently stream a duplicate copy of the RTP stream for their own purposes.
* **Telephony denial of service (TDoS).** If you have a call center application, an attacker may pump a very large amount of traffic to your number, tying up the system and preventing you from receiving legitimate calls. This can result in a catastrophic loss of service.

### Anti-Fraud Practices \[#anti-fraud-practices-2]

The most critical anti-fraud practices you can take are to secure your PBX. We recommend:

* **Follow best practices for PBX security.** These include:
  * Change the default password. Fraudsters will try the most popular default PBX passwords.
  * Firewall your PBX. Use a software-based firewall, such as iptables, and close all unneeded ports. This can help prevent an attack from an internal private network. Additionally, use a hardware-based firewall to protect from public internet attacks by restricting ports and allowing specific IP addresses.
  * Always use HTTPS when managing your PBX. This prevents your data from being transferred in clear text.
* **Follow best practices for SIP security.** These are documented in detail in [this article](/docs/voice/api/sip-security), and include:

  * Use IP allow lists with SIP credentials. This prevents the use of your account for SIP trunking except from a designated list of IP addresses.
  * Enable TLS for SIP signaling. By encrypting your SIP traffic, you protect your data as it is transmitted.
  * Enable SRTP for media traffic. SRTP, with minimum payload overhead, ensures integrity protection for the entire RTP packet stream (so that a man in the middle attack can't succeed) as well as protection against replay of captured packets.
  * Secure application design, as described in the article.
* **Create SIP alert triggers.** You can use these triggers to alert you when users interact with your system in suspicious ways. (The full list of errors to trigger can be found [here](/docs/api/errors).) Triggers to help avoid SIP toll fraud include:

  * 32201: SIP: Source IP address not in ACL
  * 32202: SIP: Bad user credentials
  * 32203: SIP: Phone number blocked
* **Employ TDoS mitigation.** These products are designed to prevent service disruption from TDoS. Although we cannot recommend a specific product, there are many products available from multiple vendors.

## Programmable SMS

Although less common than voice-based telecom fraud, SMS fraud is real and your account may be exploited by fraudsters.

Here the primary kind of fraud is phishing. Phishing messages are bogus SMS messages that appear to be from the recipient's bank, a retail store or even a friend, they can appear to come from a trusted source (for example, "Important security alert about your Pay-pal account. Click here: http://bogusphishinglink"). They always include a call to action, such as a hyperlink or phone number, typically intended to bait the recipient to divulge their personal information. The hyperlink may be condensed using a URL shortener to make it impossible to know where it goes without tapping on it.

As the recipient is far more likely to respond to the call to action than from an email — and more quickly too, due to a perceived sense of urgency from the message itself--SMS phishing can be particularly effective. If a fraudster gains access to your account, they can send vast quantities of messages to their victims that are billed as usage to your account, and seem to originate from you. Your numbers may then be [blocked for spam](https://help.twilio.com/hc/en-us/articles/223181708-Can-my-Twilio-SMS-Messages-or-Numbers-be-Blocked-as-Spam-) by recipient carriers.

### Fraud Scenarios \[#fraud-scenarios-3]

* **Outbound phishing.** If your application gets hacked, it may be used to send outbound spam/phishing messages to their victims. Or, if (for example) your app allows users to enter an arbitrary number to send an arbitrary message, fraudsters can easily exploit this for phishing.
* **Inbound phishing.** If your app accepts inbound SMS, a fraudster can send in messages containing a hyperlink or phone number. If the hyperlink is visited by your message recipients or the phone number called, they may become victims.
* **SMS pumping.** Similar to Voice Toll Fraud, [SMS pumping fraud causes inflated traffic](/docs/verify/preventing-toll-fraud) and billing costs for your application.

### Anti-Fraud Practices \[#anti-fraud-practices-3]

* **Implement Verify 2FA in your login flow** (see "Use Verify for 2FA" above).
* **Enable Fraud Guard.** Fraud Guard limits your Verify application exposure to SMS pumping risk. Learn more about [how to enable Fraud Guard for your Verify service](/docs/verify/preventing-toll-fraud/sms-fraud-guard).
* **Implement rate limiting.** Just as you can rate limit calls, you can rate limit message traffic from your app. This is described above in the Programmable Voice anti-fraud practices.
* **Disallow messaging to arbitrary numbers.** Ensure your app doesn't allow users to enter an arbitrary number. If your app needs this capability, ensure no arbitrary messages can be sent to it.
* **Strip out hyperlinks and/or phone numbers from inbound messages.** This removes the call to action from the messaging, making it useless for phishing.

## Phone Numbers

The least common form of fraud we see — although it does happen — involves unauthorized port-aways of your Twilio phone numbers. This is also known as slamming.

### Fraud Scenarios \[#fraud-scenarios-4]

* **Slamming (internal).** In this scenario, a fraudster gains unauthorized access to your Twilio account to steal a high-value number that you have (e.g. a 212 number). The number is then ported away to another carrier, without your knowledge, and the fraudster can sell it to another party. This may cause a service outage with your application if it has any hardcoded dependencies on that number.
* **Slamming (external).** It is possible for a fraudster to port a number away without having access to a Twilio account. Here the fraudster informs the number-gaining carrier they want the number. If the fraudster can obtain (or spoof) a signed Letter of Authorization (LOA) from the gaining carrier and show that they are a registered user for that carrier, the port-away can be executed by that carrier. The carrier may be under no obligation to notify you or Twilio of the port-away.

### Anti-Fraud Practices \[#anti-fraud-practices-4]

* **Secure your account.** Ensuring your account is locked down will help prevent unauthorized access and port-aways. See "Account-Level Protection" above.
* **Avoid using hardcoded numbers.** Depending on your use case, there are several different ways to implement your application without hard dependencies on specific phone numbers. For example:
  * **SMS:** To send outbound SMS messages, use [Messaging Copilot](/docs/usage/api). Here, rather than sending a message out through a specific Twilio number, you send it through a Messaging Service you've defined that contains a pool of your numbers. If any number fails, your app can retry to use another number from the pool.
  * **Voice:** If your app makes outbound calls, you can use [TaskRouter](/docs/taskrouter) to manage a pool of numbers. For example, you can create a worker for each number in your pool. Then, when a call needs to be launched, create the task. When TaskRouter finds an available worker (a number) to use for the task, it is reserved and a webhook is generated to your system containing the worker's number. You then make the call with that number using the [Calls API](/docs/voice/api/call-resource). Once the reservation is accepted, the worker is then made available to free up the number for future calls. If your app determines that the call failed for one of the numbers, the worker for that number can be marked as idle, which removes it from the rotation, and then retry. (For more detail, see the [TaskRouter API Reference](/docs/taskrouter).)

## If You Suspect Fraud

If you think your account has been compromised, or that your account is being actively used by a fraudster, then as soon as possible, you should:

* **Contact us.** Twilio takes customer reports of fraudulent activity very seriously. If you suspect you have been attacked, contact [Twilio Customer Support](https://www.twilio.com/help/contact) immediately or contact the Twilio Fraud team at [fraud@twilio.com](mailto:fraud@twilio.com).
* **Suspend or close your account.** When an account is suspended, it can't be used to make or receive calls or SMS messages. A suspended account can be reactivated later if desired. You can also have your account closed permanently. To suspend or close your master account, [contact support](https://www.twilio.com/help/contact). If you have subaccounts, they can be [suspended or closed](https://help.twilio.com/hc/en-us/articles/223135987-Closing-a-Twilio-subaccount) from the API Explorer in the Console.
* **Change your password.** If you aren't able to suspend your account, you can block unauthorized user access by changing the password. If non-owner users have access to the account, their passwords should be changed too. [This article describes how.](https://help.twilio.com/hc/en-us/articles/223135907-Change-Your-Twilio-Password) We recommend using a strong password with uppercase, lowercase, numbers and special characters. Don't reuse this password for multiple services or websites. Note: Changing your password will prevent the fraudster from logging into the Console, but they can still use the API if they have your account SID and auth token. So:
* **Replace your auth token.** If the fraudster is using your account to make calls or send messages, the auth token is very likely compromised, and you should [replace it with a new one](https://help.twilio.com/hc/en-us/articles/223136027-Auth-Tokens-and-How-to-Change-Them). Anyone with the old auth token will no longer be able to make API requests.
* **Delete your API keys.** If you have minted any API keys using your original auth token, they should be invalidated or deleted. It is very unlikely a fraudster can gain access to your API keys, but it is possible. You can replace them with new API keys minted with your new auth token.
* **Block calls to your number.** If you are the victim of an inbound traffic pumping scheme, you are receiving unwanted voice calls. You can block those calls. See our help articles on "[How can I stop receiving phone calls?](https://help.twilio.com/hc/en-us/articles/223180548-How-Can-I-Stop-Receiving-or-Block-Incoming-Phone-Calls-)" and "[I'm receiving unwanted calls or SMS messages on my Twilio number. What can I do?](https://help.twilio.com/hc/en-us/articles/223135287-I-am-Receiving-Unwanted-Calls-or-SMS-messages-on-my-Twilio-number-What-can-I-do-)" for more information.
