---
title: Risk score
description: How Risk score works in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Risk score

Note

Only available on Enterprise plans.

Cloudflare One risk scoring detects user activity and behaviors that could introduce risk to your organization's systems and data. Risk scores add user and entity behavior analytics (UEBA) to the Cloudflare One platform.

## User risk scoring

Cloudflare One assigns a risk score of Low, Medium, or High based on detections of users' activities, posture, and settings. A user's score is equal to the highest-level risk behavior they trigger.

### View a user's risk score

To view a user's risk score:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Teams & Resources**.
2. Select **Users**.
3. Select **Risk score** \> **Risk scoring**.
4. Select a user's name to view their instances of risk behaviors, if any. You can select an instance of a risk behavior to view the log associated with the detection.

Users that have had their risk score [cleared](#clear-a-users-risk-score) will not appear in the table unless they trigger another risk behavior.

### Clear a user's risk score

If required, you can reset risk scores for specific users. Once reset, users will not appear in the associated risk table until they trigger another risk behavior.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Teams & Resources**.
2. Select **Risk score** \> **Risk scoring**.
3. Select the user you want to clear the risk score for.
4. In **User risk overview**, select **Reset user risk**.
5. Select **Confirm**.

### Send risk score to Okta

In addition to controls in Cloudflare One, Okta users can send risk scores to Okta to apply SSO-level policies.

First, configure Cloudflare One to send user risk scores to Okta.

1. Set up the [Okta SSO integration](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/okta/).
2. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
3. In **Your identity providers**, locate your Okta integration and select **Edit**.
4. Turn on **Send risk score to Okta**.
5. Select **Save**.
6. Upon saving, Cloudflare One will display the well-known URL for your organization. Copy the value.

Next, configure Okta to receive your risk scores.

1. On your Okta admin dashboard, go to **Security** \> **Device Integrations**.
2. Go to **Receive shared signals**, then select **Create stream**.
3. Name your integration. In **Set up integration with**, choose _Well-known URL_.
4. In **Well-known URL**, enter the well-known URL value provided by Cloudflare One.
5. Select **Create**.

For more information on configuring user risk score within Okta, refer to the [Okta documentation ↗](https://help.okta.com/oie/en-us/content/topics/itp/overview.htm).

While the Okta integration is turned on, Cloudflare One will send any user risk score updates to Okta, including score increases and resets. Score update events will appear in your [Access authentication logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/access-authentication-logs/).

## Predefined risk behaviors

By default, all predefined behaviors are disabled. When a behavior is enabled, Cloudflare One will continuously evaluate all users within the organization for the behavior. You can [change the risk level](#change-risk-behavior-risk-levels) for predefined behaviors if the default assignment does not suit your environment.

| Risk behavior                          | Requirements                                                                                                                                                                                                                                      | Description                                                                                                                                                                                                                                                                                                                                         | Evaluation timing                                                                                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Impossible travel                      | [A configured Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/)                                                                                                                       | User has a successful login from two different locations that they could not have traveled between in that period of time. Matches will appear in your [Access authentication logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/access-authentication-logs/).                                                     | Evaluated at each authentication and session-refresh event.                                                                                           |
| High number of DLP policies triggered  | [A configured DLP profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/)                                                                                                                                   | User has created a high number of DLP policy matches within a narrow frame of time. Matches will appear in your [Gateway activity logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/).                                                                                                               | Evaluated per-request in milliseconds.                                                                                                                |
| SentinelOne threat detected on machine | [SentinelOne service provider integration](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/sentinelone/)                                                                                                          | SentinelOne returns one or more configured [device posture attributes](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/sentinelone/#device-posture-attributes) for a user.                                                                                                                                          | Ingested via service-to-service API. Frequency is administrator-configurable during device posture setup to align with SentinelOne's API rate limits. |
| CrowdStrike Low ZTA security score     | [CrowdStrike integration](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/crowdstrike/)                                                                                                                           | A user's device reports a score between 0-50 for any CrowdStrike Zero Trust Assessment attribute (OS Score, Overall Score, or Sensor Config score). Refer to [CrowdStrike device posture attributes](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/crowdstrike/#device-posture-attributes) for more information.  | Ingested via service-to-service API. Frequency is administrator-configurable during device posture setup to align with CrowdStrike's API rate limits. |
| CrowdStrike Medium ZTA security score  | [CrowdStrike integration](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/crowdstrike/)                                                                                                                           | A user's device reports a score between 50-79 for any CrowdStrike Zero Trust Assessment attribute (OS Score, Overall Score, or Sensor Config score). Refer to [CrowdStrike device posture attributes](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/crowdstrike/#device-posture-attributes) for more information. | Ingested via service-to-service API. Frequency is administrator-configurable during device posture setup to align with CrowdStrike's API rate limits. |
| Interaction with Malicious File        | [Gateway AV scanning](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/antivirus-scanning/) or [File sandboxing](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/file-sandboxing/) | User uploads or downloads a file flagged as malicious by Gateway's AV scanner or file sandboxing. Risk is elevated even if the file is blocked.                                                                                                                                                                                                     | Evaluated per-request in milliseconds.                                                                                                                |
| Suspicious Security Domain Visited     | [Gateway DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/)                                                                                                                                           | User visits a domain categorized as a security risk or security threat. Refer to [domain categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/) for the full list. Risk is elevated even if the traffic is blocked.                                                                                      | Evaluated per-request in milliseconds.                                                                                                                |
| High Risk Domain Visited               | [Gateway DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/)                                                                                                                                           | User visits a domain categorized as questionable content, violence, or CIPA. Refer to [domain categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/) for the full list. Risk is elevated even if the traffic is blocked.                                                                                 | Evaluated per-request in milliseconds.                                                                                                                |

## Manage risk behaviors

To toggle risk behaviors, go to **Risk score** \> **Risk behaviors**.

### Enable risk behaviors

When a specific behavior is enabled, Cloudflare One will continuously monitor all users within the organization for any instances of that behavior.

If a user engages in an enabled risk behavior, their risk level is re-evaluated. Cloudflare One will update their risk score to the highest value between the current risk level and the risk level of the behavior they triggered.

### Disable risk behaviors

When a risk behavior is disabled, monitoring for future activity will cease. Previously detected risk behaviors will remain in the logs and associated with a user.

### Change risk behavior risk levels

You can change the risk level for a behavior at any time.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Teams & Resources**.
2. Go to **Users**.
3. Select **Risk score** \> **Risk behaviors**.
4. Select the risk behavior you want to modify.
5. In the drop-down menu, choose your desired risk level.
6. Select **Save**.

## Use risk scores in Access policies

You can use risk scores to control access to applications protected by [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/). This enables adaptive access control that responds to changes in user behavior.

To add a risk score requirement to an Access policy:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Policies**.
2. Create a new policy or select an existing policy to edit.
3. Add a rule with the _User Risk Score_ selector.
4. For **Value**, select the risk level threshold (Low, Medium, or High).
5. Save the policy.

### Example: Block high-risk users

To prevent users with elevated risk scores from accessing sensitive applications, create a policy with the following configuration:

| Action  | Rule type       | Selector         | Value        |
| ------- | --------------- | ---------------- | ------------ |
| Allow   | Include         | Emails ending in | @example.com |
| Exclude | User risk score | _High_           |              |

Users with a High risk score will be blocked, while users with Low or Medium scores can access the application.

For more information on Access policies, refer to [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/risk-score/#page","headline":"User risk score · Cloudflare One docs","description":"How Risk score works in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/risk-score/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Okta","SentinelOne"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/users/","name":"Users"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/users/risk-score/","name":"Risk score"}}]}
```
