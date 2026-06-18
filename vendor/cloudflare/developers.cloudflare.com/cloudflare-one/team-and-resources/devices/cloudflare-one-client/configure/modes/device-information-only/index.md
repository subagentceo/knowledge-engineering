---
title: Enable Posture only mode
description: Enable Posture only mode in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable Posture only mode

Feature availability

| System   | Availability |
| -------- | ------------ |
| Windows  | ✅            |
| macOS    | ✅            |
| Linux    | ✅            |
| iOS      | ✅            |
| Android  | ✅            |
| ChromeOS | ✅            |

Posture only mode allows you to enforce device posture rules when a user connects to your [self-hosted Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/). This mode relies on a client certificate generated from your account to establish trust between the Access application and the device.

## 1\. Turn on account settings

Using the API, enable client certificate provisioning for [your zone](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/):

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `SSL and Certificates Write`

Update device certificate provisioning status

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/devices/policy/certificates" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "enabled": true

  }'


```

## 2\. Configure the Cloudflare One Client

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles** \> **General profiles**.
2. Choose a [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) and select **Edit**.
3. For **Service mode**, select **Posture only mode**.
4. Select **Save profile**.
5. [Enroll your device](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) into your Zero Trust organization.  
When enrolled in Posture only mode, the Cloudflare One Client (formerly WARP) will automatically generate a client certificate and install the certificate on the device. This certificate is necessary to confirm the source of outgoing traffic.

## 3\. (Optional) Verify the client certificate

1. To view the client certificates installed on the device:  
   * [ Windows ](#tab-panel-7434)  
   * [ macOS ](#tab-panel-7435)  
   * [ Linux ](#tab-panel-7436)  
   * [ iOS ](#tab-panel-7437)  
   * [ Android ](#tab-panel-7438)  
   * [ ChromeOS ](#tab-panel-7439)  
   1. Open the **Start** menu and select **Run**.  
   2. Enter `certlm.msc`.  
   3. Go to **Personal** \> **Certificates**.  
   1. Open **Keychain Access**.  
   2. Go to **System** \> **My Certificates**.  
Open a terminal window and run the following command:  
Terminal window  
```  
$ certutil -L -d sql:/etc/pki/nssdb  
```  
Go to **Settings** \> **General** \> **About** \> **Certificate Trust Settings**.  
The location of the client certificate may vary depending on the Android device.  
   * **Samsung**: Go to **Settings** \> **Security** \> **Other security settings** \> **View security certificates**.  
   * **Google Pixel**: Go to **Security** \> **Advanced settings** \> **Encryption & credentials** \> **Credential storage**.  
Go to **Settings** \> **Apps** \> **Google Play Store** \> **Manage Android Preferences** \> **Security** \> **Credentials**.  
The client certificate name should match the **Device ID** in your Cloudflare One Client **Preferences**.
2. To verify the client certificate in your Cloudflare account:  
   1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), select the zone for which you enabled client certificates.  
   2. Go to **SSL/TLS** \> **Client Certificates**.  
The certificate name is the WARP enrollment **Device ID**.![Example client certificate in the Cloudflare dashboard](https://developers.cloudflare.com/_astro/device-information-only-cert.CBHcWmIc_Z1MHrng.webp)

## 4\. Enforce the client certificate

To block traffic from devices that do not have a valid client certificate:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **SSL/TLS** \> **Client Certificates**.
2. Under **Hosts**, select **Edit** and enter the hostname of your Access application (for example, `app.mycompany.com`). This enables mTLS authentication for the application.
3. Select **Create mTLS rule**.
4. Create a WAF custom rule that checks all requests to your application for a valid client certificate:  
| Field              | Operator | Value             | Logic | Action |  
| ------------------ | -------- | ----------------- | ----- | ------ |  
| Client Certificate | equals   | Off               | And   | Block  |  
| Hostname           | equals   | app.mycompany.com |       |        |
5. Select **Deploy**.

Posture only mode is now enabled on the device. To start enforcing device posture, set up a [WARP client check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/) and add a _Require_ device posture rule to your [Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/). When the device connects to the Access application for the first time, the browser will ask to use the client certificate installed by the Cloudflare One Client.

![Browser prompts for client
certificate](https://developers.cloudflare.com/_astro/device-information-only-browser.BARL_mBj_qzfAd.webp)

## Limitations

Posture only mode is not compatible with the [Windows pre-login](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-prelogin/) feature. The user must be logged into Windows because the Cloudflare One Client needs to [install a certificate](#3-optional-verify-the-client-certificate) in the user store.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/device-information-only/#page","headline":"Enable Posture only mode · Cloudflare One docs","description":"Enable Posture only mode in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/device-information-only/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Posture","mTLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/","name":"Configure the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/","name":"Client modes"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/device-information-only/","name":"Enable Posture only mode"}}]}
```
