---
title: Account Abuse Protection (Early Access)
description: Detect and block automated abuse on login and registration endpoints.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Account Abuse Protection (Early Access)

Identify and mitigate attacks on your customer and user accounts.

Account abuse — bulk account creation and account takeover attacks — can cause financial losses and erode user trust. Fraud detection allows you to detect and mitigate these attacks among your traffic. You can use fraud signals to [update or create new rules](https://developers.cloudflare.com/waf/custom-rules/) for suspicious account activity, or pass signals to your origin to integrate into authentication and authorization systems.

## Availability

Account Abuse Protection is available in Early Access for any [Bot Management Enterprise](https://developers.cloudflare.com/bots/get-started/bot-management) customer. You can use these features at no additional cost for a limited period until they are generally available.

Contact your Cloudflare account team to request access.

---

## Concepts

### User ID

User ID is a cryptographically hashed, per-zone identifier that customers can use in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/), [Security Rules](https://developers.cloudflare.com/waf/custom-rules/), and [Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/). Hashed User IDs are created by encrypting the primary credentials your users provide, converting them into opaque identifiers unique to your zone. This allows traffic analysis while protecting user privacy. With access to hashed User ID, website owners can:

* Review which users have the most activity on your website.
* Find the details on a specific user's characteristics and activity patterns.
* Mitigate traffic based on the user, such as blocking a user with historically suspicious activity.
* Combine fields to see when accounts are being targeted with leaked credentials.
* Manage network patterns or signals associated with specific users.

Data privacy

User profiling was created with privacy in mind. Its design and engineering align with our privacy and compliance programs and contain technical controls that protect the privacy of users. Hashed User IDs are created by encrypting the primary credentials your users use to access your applications.

Other Cloudflare customers cannot access your user profiles. They are unique to your zone.

User ID is an opt-in feature that can be enabled in Security Settings.

To enable, edit, or disable the setting:

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Fraud**.
3. Go to **User ID**.
4. Turn **User ID** on or off.

### Ephemeral IDs

Customers using Cloudflare [Turnstile](https://developers.cloudflare.com/turnstile/) can utilize ephemeral IDs for Fraud detection.

Refer to [Fraud detection with ephemeral IDs](https://developers.cloudflare.com/turnstile/tutorials/fraud-detection-with-ephemeral-ids/) for more information.

### Account takeover detections

Cloudflare Bot Management includes dedicated detection IDs for account takeover attacks.

Refer to [Account takeover detections](https://developers.cloudflare.com/bots/additional-configurations/detection-ids/account-takeover-detections/) for more information.

Note

Account takeover (ATO) detections are not available for accounts using the [Data Localization Suite](https://developers.cloudflare.com/data-localization/) with [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/) in the EU region. ATO detections rely on zone logs to identify suspicious activity, and Cloudflare does not ingest logs for these accounts to comply with General Data Protection (GDPR).

---

## Get started

### Prerequisites

Fraud detection requires the following configurations and settings to be enabled to properly identify suspicious behavior.

#### Security Settings

* User ID: Cloudflare encrypts or hashes your user IDs to better understand typical user traffic patterns across your applications. Enabling Cloudflare to create hashed user ID mappings to your users will allow you to receive account takeover and bulk account creation detections.

#### Eligible traffic

Cloudflare automatically identifies certain login and sign up traffic on your applications and runs these detections without any additional configurations.

* Sign-ups: Cloudflare automatically monitors traffic on endpoints that match common sign up endpoints.
* Login: Cloudflare automatically monitors traffic on endpoints that match common login endpoints.

Verify that your endpoints are properly labeled to ensure Cloudflare can detect and monitor them correctly.

Login or sign up endpoints

Not all login or sign up endpoints are automatically detected.

Cloudflare evaluates and automatically detects your website or application's login or sign up endpoint, but non-traditional login or sign up endpoints may not be recognized.

For example, if you have a non-traditional login endpoint, you should label it with `cf-log-in` using the [endpoint labeling service](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-labels/). Once you have applied the `cf-log-in` label, Cloudflare will use the labeled endpoint for account takeover detection decisions.

Enhanced with leaked credential detections

Cloudflare also recommends enabling [Leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) to help identify compromised credentials across your users.

---

### Detections

Fraud detections focus on account abuse attacks such as account takeover, bulk account creation, and credential quality. These detections run on all eligible traffic and can be used across [Cloudflare Rules](https://developers.cloudflare.com/rules/) to log, challenge, and/or block requests to your sign up and login endpoints.

#### Account creation

Disposable Email Checks detect when users sign up with throwaway email addresses commonly used for promotion abuse and fake account creation. These disposable email services allow attackers to create thousands of unique accounts without maintaining real infrastructure.

You can use the following binary field as you build rules to enforce security preferences, choosing to block all disposable emails outright, or issue a [challenge](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/) to anyone attempting to create an account with a disposable email.

#### Suspicious emails

Cloudflare analyzes the components of an email used during sign up to help identify suspicious patterns. Refer to [prerequisites](#prerequisites) to ensure your traffic is eligible for detections.

Cloudflare does not store email addresses during this analysis. All detections processed without any storage or caching.

| Detection tag                         | Description                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cf.fraud\_detection.disposable\_email | Identifies emails with domains that are commonly found in lists of temporary or disposable email services.                                                                                                                                                                                                                                                                  |
| cf.fraud.email\_risk                  | Analyzes the randomness (entropy) of characters in an email username and top level domain. For example, a8xk2m9p@example.com has high entropy (very random characters), while john.smith@example.com has low entropy (recognizable pattern). High risk emails indicate high entropy, while medium and low risk emails indicate less randomness in the string of characters. |

---

### Mitigations

The following Fraud detection fields can be used in Security Rules to help identify and mitigate suspicious traffic.

#### Security Rules

The following fields can be used in new and existing Security Rules.

| Field                                  | Description                                                                                        | Values                                                                                                                                                                                                                                    |
| -------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cf.fraud\_detection.disposable\_domain | Flags whether a domain for a given email is included in a known list of temporary email providers. | True or False                                                                                                                                                                                                                             |
| cf.fraud.email\_risk                   | Measures risk of email based on randomness of characters in the username and domain.               | Low represents low risk due to reduced randomness and simple emails. Medium represents medium risk based on larger strings with slightly more randomness. High represents high risk based on larger and random character strings. Unknown |

#### Other rules

You can use Fraud detection data in Request Header [Transform Rules](https://developers.cloudflare.com/rules/transform/managed-transforms/) to pass information down to the origin.

#### LogPush

You can add Fraud detection fields to existing or new [LogPush](https://developers.cloudflare.com/logs/logpush/) jobs.

---

## Analytics

You can find Fraud data and detections in Security Analytics, where you can see top User IDs.

[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics) 

Fraud fields can be used as filters to identify suspicious patterns in your traffic.

The hashed User ID field within Security Analytics also provides Fraud customers with data that can help review detections and patterns per individual users rather than requests. You can review user level aggregations for IPs and IP counts, event types (login or sign up), locations, devices, and browsers.

A user level profile also provides a quick way to review the latest events associated with a user so that you can identify any anomalies and create a custom rule to log, block, or challenge that user.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/account-abuse-protection/#page","headline":"Account Abuse Protection (Early Access) · Cloudflare bot solutions docs","description":"Detect and block automated abuse on login and registration endpoints.","url":"https://developers.cloudflare.com/bots/account-abuse-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Account takeover"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/account-abuse-protection/","name":"Account Abuse Protection (Early Access)"}}]}
```
