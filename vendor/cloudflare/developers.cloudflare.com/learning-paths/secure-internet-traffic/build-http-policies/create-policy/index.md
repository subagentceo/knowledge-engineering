---
title: Create your first HTTP policy
description: Build your first Gateway HTTP policy.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create your first HTTP policy

Now that you have considered which devices and applications TLS inspection should and should not apply to, it is time to create your first HTTP policy.

## Create your first policy

Use a standard naming convention when building all policies. Policy names should be unique across the Cloudflare account, follow the same structure, and be as descriptive as possible.

To create a new HTTP policy:

* [ Dashboard ](#tab-panel-9196)
* [ API ](#tab-panel-9197)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies**.
2. In the **HTTP** tab, select **Add a policy**.
3. Name the policy.
4. Under **Traffic**, build a logical expression that defines the traffic you want to allow or block.
5. Choose an **Action** to take when traffic matches the logical expression. For example, if you have configured TLS decryption, some applications that use [embedded certificates](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/#inspection-limitations) may not support HTTP inspection, such as some Google products. You can create a policy to bypass inspection for these applications:  
| Selector    | Operator | Value            | Action         |  
| ----------- | -------- | ---------------- | -------------- |  
| Application | in       | _Do Not Inspect_ | Do Not Inspect |  
Cloudflare also recommends adding a policy to block [known threats](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-categories) such as Command & Control, Botnet and Malware based on Cloudflare's threat intelligence:  
| Selector            | Operator | Value                | Action |  
| ------------------- | -------- | -------------------- | ------ |  
| Security Categories | in       | _All security risks_ | Block  |
6. Select **Create policy**.

1. [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:  
| Type    | Item       | Permission |  
| ------- | ---------- | ---------- |  
| Account | Zero Trust | Edit       |
2. (Optional) Configure your API environment variables to include your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and API token.
3. Send a `POST` request to the [Create a Zero Trust Gateway rule](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/rules/methods/create/) endpoint. For example, if you have configured TLS decryption, some applications that use [embedded certificates](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/#inspection-limitations) may not support HTTP inspection, such as some Google products. You can create a policy to bypass inspection for these applications:  
Create a Zero Trust Gateway rule  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "Do not inspect applications",  
    "description": "Bypass TLS decryption for unsupported applications",  
    "precedence": 0,  
    "enabled": true,  
    "action": "off",  
    "filters": [  
        "http"  
    ],  
    "traffic": "any(app.type.ids[*] in {16})",  
    "identity": "",  
    "device_posture": ""  
  }'  
```  
```  
{  
   "success": true,  
   "errors": [],  
   "messages": []  
}  
```  
The API will respond with a summary of the policy and the result of your request.  
Cloudflare also recommends adding a policy to block [known threats](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-categories) such as Command & Control, Botnet and Malware based on Cloudflare's threat intelligence:  
Create a Zero Trust Gateway rule  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "Block known risks",  
    "description": "Block all default Cloudflare HTTP security categories",  
    "precedence": 0,  
    "enabled": true,  
    "action": "block",  
    "filters": [  
        "http"  
    ],  
    "traffic": "any(http.request.uri.security_category[*] in {68 178 80 83 176 175 117 131 134 151 153})",  
    "identity": "",  
    "device_posture": ""  
  }'  
```

For more information, refer to [HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/).

## Order your policies

In most scenarios, Gateway evaluates HTTP policies in [top-down order](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/order-of-enforcement/) (like DNS policies). Because Do Not Inspect action policies are terminal actions, we recommend grouping them in logical order above all of your other policies because they will always functionally fire first regardless of where they are placed.

Once the Do Not Inspect policies are ordered correctly, Allow policies should follow, and the Allow policy descriptions should include any special considerations for Allow actions (such as header IDs, certificate mismatch handling, and non-isolate traffic).

Next, list your isolate and block policies. There may be scenarios in which you want to intermingle your block policies within your other policy outcomes. That is an acceptable approach, but you will need to ensure that you do not have overly permissive allows or overly restrictive block policies that will cause unintended effects.

## Test your policies

Before instituting blocks or other actions that would impact your users, first measure impact by setting the policy as an Allow action. Monitor your users' actions and look in your logs, sorting by that explicit policy, to see what traffic actions matched against it. If the activity is exactly what you would expect for the policy, you are probably safe to implement it as its intended action.

If your policy matches unexpected traffic flows or destinations (such as unintended users or device groups), review your policy to ensure it is not overly permissive or restrictive. If the policy design looks correct, determine whether other policies are matching before the intended policy. You can review the [order of enforcement](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/order-of-enforcement/) for Gateway policies to ensure all of your policies are working together as intended.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-http-policies/create-policy/#page","headline":"Create your first HTTP policy · Cloudflare Learning Paths","description":"Build your first Gateway HTTP policy.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-http-policies/create-policy/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/build-http-policies/","name":"Build HTTP security policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/build-http-policies/create-policy/","name":"Create your first HTTP policy"}}]}
```
