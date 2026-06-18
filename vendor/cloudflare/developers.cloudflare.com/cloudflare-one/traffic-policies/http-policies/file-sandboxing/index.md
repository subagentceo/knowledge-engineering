---
title: File sandboxing
description: How File sandboxing works in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# File sandboxing

Note

Available as an add-on to Zero Trust Enterprise plans. For more information, contact your account team.

In addition to [anti-virus (AV) scanning](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/antivirus-scanning/), Gateway can quarantine previously unseen files downloaded by your users into a sandbox and scan them for malware.

When a file download passes AV scanning without a malware detection, Gateway quarantines the file in the [sandbox](#sandbox-environment). If the file has not been downloaded before, Gateway monitors the file's behavior and compares it to known malware patterns. During this process, Gateway displays an interstitial page in the user's browser. If the sandbox does not detect malicious activity, Gateway releases the file and downloads it to the user's device. If the sandbox detects malicious activity, Gateway blocks the download. For any subsequent downloads of the same file, Gateway remembers and applies its previous allow/block decision.

Gateway will log any file sandbox decisions in your [HTTP logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/#http-logs).

flowchart TD
    A(["User starts file download"]) --> B["File sent to AV scanner"]
    B --> C["Malicious file detected?"]
    C -- Yes --> D["Download blocked"]
    C -- No --> G["File sent to sandbox"]
    G --> n1["First time file downloaded?"]
    K["Malicious activity detected?"] -- Yes --> N["Download blocked"]
    K -- No --> n3["Download allowed"]
    n2["Interstitial page displayed for user during scan"] --> n4["File activity monitored"]
    n1 -- Yes --> n2
    n4 --> K
    n1 -- No --> K

    B@{ shape: subproc}
    C@{ shape: hex}
    D@{ shape: terminal}
    n1@{ shape: hex}
    K@{ shape: hex}
    N@{ shape: terminal}
    n3@{ shape: terminal}
    n2@{ shape: display}
    n4@{ shape: rect}
    style D stroke:#D50000
    style N stroke:#D50000
    style n3 stroke:#00C853

## Get started

To begin quarantining downloaded files, turn on file sandboxing:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Traffic settings**.
2. In **Policy settings**, turn on **Open previously unseen files in a sandbox environment**.
3. (Optional) To block requests containing [non-scannable files](#non-scannable-files), select **Block requests for files that cannot be scanned**.

You can now create [Quarantine HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#quarantine) to determine what files to scan in the sandbox.

## Create test policy

To test if file sandboxing is working, you can create a Quarantine policy that matches the [Cloudflare Sandbox Test ↗](https://sandbox.cloudflaredemos.com/):

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies** \> **HTTP**.
2. Select **Add a policy**.
3. Add the following expression:  
| Selector | Operator | Value                       | Action     |  
| -------- | -------- | --------------------------- | ---------- |  
| Host     | is       | sandbox.cloudflaredemos.com | Quarantine |
4. In **Sandbox file types**, select _ZIP Archive (zip)_.
5. From a device [connected to your Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/), open a browser and go to the [Cloudflare Sandbox Test ↗](https://sandbox.cloudflaredemos.com/).
6. Select **Download Test File**.

Gateway will quarantine and scan the file, display an interstitial status page in the browser, then release the file for download.

## Sandbox environment

Gateway executes quarantined files in a sandboxed Windows operating system environment. Using machine learning, the sandbox compares how files of a certain type behave compared to how these files should behave. The sandbox detects file actions down to the kernel level and compares them against a real-time malware database. In addition, Gateway checks the sandbox's network activity for malicious behavior and data exfiltration.

## Compatibility

### Supported file types

File sandboxing supports scanning the following file types:

Supported sandboxing file types

* `.exe`
* `.pdf`
* `.doc`
* `.docm`
* `.docx`
* `.rtf`
* `.ppt`
* `.pptx`
* `.xls`
* `.xlsm`
* `.xlsx`
* `.zip`
* `.rar`

### Non-scannable files

Gateway cannot scan requests containing the following files:

* Files larger than 100 MB
* PGP encrypted files

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/file-sandboxing/#page","headline":"File sandboxing · Cloudflare One docs","description":"How File sandboxing works in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/file-sandboxing/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/http-policies/","name":"HTTP policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/http-policies/file-sandboxing/","name":"File sandboxing"}}]}
```
