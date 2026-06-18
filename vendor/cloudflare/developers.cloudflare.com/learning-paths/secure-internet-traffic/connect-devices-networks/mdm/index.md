---
title: MDM deployment
description: Deploy the device client via MDM.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# MDM deployment

Organizations can deploy the Cloudflare One Client (formerly WARP) automatically to their fleet of devices in a single operation. The Cloudflare One Client is compatible with the vast majority of managed deployment workflows, including [mobility management solutions](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/partners/) such as Intune or JAMF, or by executing an `.msi` file on desktop machines.

## MDM policy file

Refer to our [managed deployment instructions](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/) and create a `.plist`, `mdm.xml`, or `.msi` policy file based on your organization's software management tool.

[MDM parameters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/) that you specify in a local policy file will overrule any [device client settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/) configured in the dashboard.

 Therefore, we recommend that your policy file only contain the organization name and potentially the onboarding flag, [relying on the dashboard](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/device-profiles/) to configure the remaining device settings. 

```

<dict>

  <key>organization</key>

  <string>your-team-name</string>

  <key>onboarding</key>

  <false/>

</dict>


```

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), select **Zero Trust**.
2. On the onboarding screen, choose a team name. The team name is a unique, internal identifier for your Zero Trust organization. Users will enter this team name when they enroll their device manually, and it will be the subdomain for your App Launcher (as relevant). Your business name is the typical entry.  
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) by going to **Zero Trust** \> **Settings**.
3. Complete your onboarding by selecting a subscription plan and entering your payment details. If you chose the **Zero Trust Free plan**, this step is still needed but you will not be charged.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/connect-devices-networks/mdm/#page","headline":"MDM deployment · Cloudflare Learning Paths","description":"Deploy the device client via MDM.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/connect-devices-networks/mdm/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/connect-devices-networks/","name":"Connect devices and networks to Cloudflare"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/connect-devices-networks/mdm/","name":"MDM deployment"}}]}
```
