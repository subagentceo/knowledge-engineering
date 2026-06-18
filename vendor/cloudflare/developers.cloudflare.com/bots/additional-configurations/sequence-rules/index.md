---
title: Sequence rules
description: Detect and mitigate bot traffic based on cookie-based request sequences.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Sequence rules

[Sequence rules](https://developers.cloudflare.com/bots/additional-configurations/sequence-rules/) uses cookies to track the order of requests a user has made and the time between requests and makes them available via [Cloudflare Rules](https://developers.cloudflare.com/rules/). This allows you to write rules that match valid or invalid sequences. The specific cookies used to validate sequences are called sequence cookies.

`431` error

Too many concurrent requests to your zone may add cookies that create a header that is too large, causing a `431` error.

## Prerequisites

* Your account must have the Fraud Detection subscription.
* Each zone must configure the endpoints to track via Endpoint Management.

You can [build a sequence custom rule via the Cloudflare dashboard](#build-a-sequence-custom-rule-via-the-cloudflare-dashboard) or [using the API](#manage-sequence-rules-via-the-api).

---

## Availability

These sequence fields are available in:

* [Custom rules](https://developers.cloudflare.com/waf/custom-rules/) (`http_request_firewall_custom` phase)
* [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) (`http_request_ratelimit`)
* [Bulk Redirects](https://developers.cloudflare.com/workers/examples/bulk-redirects/) (`http_request_redirect`)
* [Request Header Transform Rules](https://developers.cloudflare.com/rules/transform/response-header-modification/) (`http_request_late_transform`)

| Field name                             | Description                                                                                                                                                                                                                                                                  | Example value                          |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| cf.sequence.current\_opString          | This field contains the ID of the operation that matches the current request. If the current request does not match any operations defined in Endpoint Management, it will be an empty string.                                                                               | c821cc00                               |
| cf.sequence.previous\_opsArray<String> | This field contains an array of the prior operation IDs in the sequence, ordered from most to least recent. It does not include the current request.  If an operation is repeated, it will appear multiple times in the sequence.                                            | \["f54dac32", "c821cc00", "a37dc89b"\] |
| cf.sequence.msec\_since\_opMap<Number> | This field contains a map where the keys are operation IDs and the values are the number of milliseconds since that operation has most recently occurred.  This does not include the current request or operation as it only factors in previous operations in the sequence. | {"f54dac32": 1000, "c821cc00": 2000}   |

---

## Build a sequence custom rule via the Cloudflare dashboard

* [  New dashboard ](#tab-panel-6832)
* [ Old dashboard ](#tab-panel-6833)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. To create a new empty rule, select **Create rule** \> **Custom rules**.
3. Enter a descriptive name for the rule in **Rule name**.
4. Under **When incoming requests match**, use the **Field** drop-down list to filter by **Sequences** and select from:  
   * Current Operation  
   * Previous Operations  
   * Elapsed time
5. Under **Value**, select the edit icon to use Builder and build a sequence on the side panel.
6. Under **Select a hostname for this sequence**, choose all or a specific hostname from the dropdown list. Optionally, you can use the search bar to search for a specific hostname.
7. From the **Methods** dropdown list, choose all methods or a specific request method.
8. Select the checkbox for each endpoint in the order that you want them to appear in the sequence.
9. Set the time to complete.
10. Select **Save**.
11. Under **Then take action**, select the rule action in the **Choose action** dropdown. For example, selecting _Block_ tells Cloudflare to refuse requests that match the conditions you specified.
12. (Optional) If you selected the _Block_ action, you can configure a custom response.
13. Under **Place at**, select the order of when the rule will fire.
14. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

Note

The fields in the custom rule are populated as a grouped sequence based on the values that you entered on Builder.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Custom rules**.
3. To create a new empty rule, select **Create rule**.
4. Enter a descriptive name for the rule in **Rule name**.
5. Under **When incoming requests match**, use the **Field** drop-down list and select:  
   * Current Operation  
   * Previous Operations  
   * Elapsed time
6. Under **Value**, build a sequence by selecting a hostname for the sequence.
7. Select the checkbox for each endpoint in the order that you want them to appear in the sequence.
8. Set the time to complete.
9. Select **Save**.
10. Under **Then take action**, select the rule action in the **Choose action** dropdown. For example, selecting _Block_ tells Cloudflare to refuse requests that match the conditions you specified.
11. (Optional) If you selected the _Block_ action, you can configure a custom response.
12. Under **Place at**, select the order of when the rule will fire.
13. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

---

## Manage sequence rules via the API

### Enable sequence rules

1. [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) if you do not already have one. The API token must include the _Zone_ \> _Fraud Detection_ \> _Edit_ permission. 2\. [Get the zone ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) for the zone(s) where you want to enable sequence rules. 3\. [Add the endpoints](https://developers.cloudflare.com/api-shield/management-and-monitoring/) that you want to track in your sequence rules using API Shield's Endpoint Management and make note of the short ID. 4\. Enable the sequence cookie by adding your API token and zone ID to the following API call.

Note

The short ID will not be visible until your account team has enabled this feature for you.

API call

```

curl --request PUT \

https://api.cloudflare.com/client/v4/zones/{zone_id}/fraud_detection/sequence_cookies \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{"enabled": true}'


```

1. Use the expression editor to write sequence or timing based rules via [custom rules](https://developers.cloudflare.com/waf/custom-rules/), [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/), or [transform rules](https://developers.cloudflare.com/rules/transform/). You can put these rules in log only mode to monitor.

Note

When you enable sequence rules, Cloudflare will start setting cookies for all requests that match your endpoints.

Once you have enabled sequence rules, the rules fields will be populated and you can now use the new fields in your rules.

### Disable sequence rules

Disabling sequence rules will stop the rules fields from being populated. If you still have rules deployed which depend on these fields, those rules may not behave as intended. Remove or disable any rules that rely on sequence fields before disabling sequence rules.

To disable sequence rules:

1. [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) if you do not already have one. The API token must include the _Zone_ \> _Fraud Detection_ \> _Edit_ permission. 2\. [Get the zone ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) for the zone(s) where you want to enable sequence rules. 3\. [Add the endpoints](https://developers.cloudflare.com/api-shield/management-and-monitoring/) that you want to track in your sequence rules using API Shield's Endpoint Management and make note of the short ID. 4\. Disable the sequence cookie using your API token, zone ID, and by setting `enabled` to `false` on the following API call.

Note

The short ID will not be visible until your account team has enabled this feature for you.

API call

```

curl --request PUT https://api.cloudflare.com/client/v4/zones/{zone_id}/fraud_detection/sequence_cookies \

--header "Authorization: Bearer <API_TOKEN>" \

--data '{"enabled": false}'


```

---

## Rules fields

Sequence rules introduces three new fields to Cloudflare Rules. All of these fields reference operations by their short ID. Accounts that have the Fraud Detection subscription can refer to the short ID by viewing the endpoint details via **API Shield** \> **Endpoint Management** in the Cloudflare dashboard. Accounts without Fraud Detection do not have access to this field.

Cloudflare only stores up to the 10 most recent operations in a sequence for up to one hour. If there are more than 10 operations in the sequence, older operations will be dropped and will not be included in the following fields. Similarly, if an operation happened more than one hour ago, it will also not be included in the following fields.

### Example rules

The customer must request endpoint A before endpoint B.

Valid sequence

```

cf.sequence.current_op eq "bbbbbbbb" and

any(cf.sequence.previous_ops[*] == "aaaaaaaa")


```

Invalid sequence

```

cf.sequence.current_op eq "bbbbbbbb" and

not any(cf.sequence.previous_ops[*] == "aaaaaaaa")


```

Customer must request endpoint A at least one second before endpoint B.

Valid sequence

```

cf.sequence.current_op eq "bbbbbbbb" and

cf.sequence.msec_since_op["aaaaaaaa"] ge 1000


```

Invalid sequence

```

cf.sequence.current_op eq "bbbbbbbb" and

not cf.sequence.msec_since_op["aaaaaaaa"] ge 1000


```

---

## Limitations

Cloudflare only supports HTTPS requests since our cookies set the `Secure` attribute.

---

## Availability

Sequence rules is currently in private beta. If you would like to be included in the beta, contact your account team.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/additional-configurations/sequence-rules/#page","headline":"Sequence rules · Cloudflare bot solutions docs","description":"Detect and mitigate bot traffic based on cookie-based request sequences.","url":"https://developers.cloudflare.com/bots/additional-configurations/sequence-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/additional-configurations/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/additional-configurations/sequence-rules/","name":"Sequence rules"}}]}
```
