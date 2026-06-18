---
title: HTTP filtering
description: HTTP filtering in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# HTTP filtering

Secure Web Gateway allows you to inspect HTTP traffic and control which websites users can visit. DNS filtering can only block or allow entire domains (for example, all of `dropbox.com`). HTTP filtering goes deeper — it inspects full URLs and request content, so you can block a specific page like `dropbox.com/shared-folder`, scan file uploads for sensitive data, or enforce acceptable use policies based on what users are actually doing on a site.

Note

For a more detailed guide to filtering HTTP requests and other traffic for your organization, refer to the [Secure your Internet traffic and SaaS apps](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/concepts/) implementation guide.

## 1\. Connect to Gateway

HTTP filtering requires three components working together: the Cloudflare One Client routes device traffic through Cloudflare, a root certificate lets Gateway decrypt HTTPS traffic so it can inspect URLs and content, and the Gateway proxy enables Gateway to intercept and evaluate HTTP requests. Without the certificate, Gateway can only see the domain name — not the full URL or request body.

To filter HTTP requests from a device:

1. [Install the Cloudflare root certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) on your device.
2. [Install the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on your device.
3. In the Cloudflare One Client Settings, log in to your organization's Cloudflare One instance.
4. [Enable the Gateway proxy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/#turn-on-the-gateway-proxy) for TCP. Optionally, enable the UDP proxy to also inspect QUIC traffic on port 443 — this covers HTTP/3, a newer protocol some browsers use by default.
5. To inspect HTTPS traffic, [enable TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/#turn-on-tls-decryption). TLS decryption allows Gateway to read encrypted requests. Without it, Gateway can see that a user visited `example.com` but not which specific page or what they uploaded.
6. (Optional) To scan file uploads and downloads for malware, [enable anti-virus scanning](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/antivirus-scanning/).

## 2\. Verify device connectivity

To verify your device is connected to Cloudflare One and traffic is flowing through Gateway:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Traffic settings**.
2. Under **Log traffic activity**, enable activity logging for all HTTP logs.
3. On your device, open a browser and go to any website.
4. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights** \> **Logs** \> **HTTP**.
5. Make sure HTTP requests from your device appear.

After creating your first HTTP policy in the next step, you can test it by visiting a URL that your policy should block and confirming the request is denied.

## 3\. Create your first HTTP policy

An HTTP policy defines which requests to match (for example, uploads to file-sharing sites) and the action to take (for example, block).

To create a new HTTP policy:

* [ Dashboard ](#tab-panel-7608)
* [ API ](#tab-panel-7609)

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

## 4\. Add optional policies

Refer to our list of [common HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/common-policies) for other policies you may want to create. Common additions include blocking file downloads by type, isolating risky websites in a [remote browser](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/), and adding Do Not Inspect rules for applications that break under TLS decryption (for example, apps that use certificate pinning to enforce their own certificates). Do Not Inspect rules tell Gateway to skip decryption for specific destinations so those applications continue to work.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/http/#page","headline":"Set up HTTP filtering · Cloudflare One docs","description":"HTTP filtering in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/http/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/get-started/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/get-started/http/","name":"HTTP filtering"}}]}
```
