---
title: File check
description: File check in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# File check

The File Check device posture attribute checks for the presence of a file on a device. You can create multiple file checks for each operating system you need to run it on, or if you need to check for multiple files.

## Prerequisites

* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device. For a list of supported modes and operating systems, refer to [Cloudflare One Client Checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/).

## Configure a file check

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Posture checks**.
2. Go to **Cloudflare One Client checks** and select **Add a check**.
3. Select **File Check**.
4. You will be prompted for the following information:  
   1. **Name**: Enter a unique name for this device posture check.  
   2. **Operating system**: Select your operating system.  
   3. **File Path**: Enter a file path (for example, `c:\my folder\myfile.exe`).  
   Environment variables  
   File paths can include environment variables to account for differences across devices. Environment variables are resolved in the context of the Cloudflare One Client daemon, not the logged-in user. Only variables available to the daemon process at runtime will work.  
         * **Windows**: Use `%VAR%` syntax. For example, `%PROGRAMFILES%\myfolder\myfile.exe`.  
         * **macOS/Linux**: Use `${VAR}` syntax. For example, `${RUNTIME_DIRECTORY}/myfolder/myfile`.  
   4. **Signing certificate thumbprint (recommended)**: Enter the [thumbprint](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/application-check/#determine-the-signing-thumbprint) of the publishing certificate used to sign the file. Adding this information will enable the check to ensure that the file was signed by the expected software developer.  
   5. **SHA-256 (optional)**: Enter the [SHA-256 value](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/application-check/#determine-the-sha-256-value) of the file. This is used to ensure the integrity of the file on the device.
5. Select **Save**.

Next, go to **Insights** \> **Logs** \> **Posture logs** and verify that the file check is returning the expected results.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/file-check/#page","headline":"File check · Cloudflare One docs","description":"File check in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/file-check/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Posture"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/","name":"Posture checks"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/","name":"Cloudflare One Client checks"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/file-check/","name":"File check"}}]}
```
