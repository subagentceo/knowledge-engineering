---
title: AV scanning
description: How AV scanning works in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# AV scanning

Cloudflare Gateway can scan files for malware as users upload or download them. Anti-virus (AV) scanning runs inline — Gateway inspects files as they pass through the proxy and blocks any file that contains a known malicious payload.

In addition to AV scanning, Gateway can quarantine previously unseen files into a sandbox to detect zero-day threats not yet in anti-virus databases. For more information, refer to [File sandboxing](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/file-sandboxing/).

## Get started

To turn on AV scanning:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Traffic settings**.
2. In **Policy settings**, turn on **Scan files for malware**.
3. Choose whether to scan files for malicious payloads during uploads, downloads, or both. You can also block requests containing [non-scannable files](#non-scannable-files).
4. (Optional) Turn on **Display AV block notification for Cloudflare One Client** to send [block notifications](#cloudflare-one-client-block-notifications) to users connected to Gateway with the Cloudflare One Client when AV inspection blocks a file.

When a request is blocked due to the presence of malware, Gateway will log the match as a Block decision in your [HTTP logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/#http-logs).

### Cloudflare One Client block notifications

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/plans/zero-trust-services/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Traffic and DNS mode Traffic only mode                                                                                             | Enterprise                                                                  |

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ✅            | 2024.1.159.0           |
| macOS    | ✅            | 2024.1.160.0           |
| Linux    | ❌            |                        |
| iOS      | ✅            | 1.7                    |
| Android  | ✅            | 1.4                    |
| ChromeOS | ✅            | 1.4                    |

Turn on **Display AV block notification for Cloudflare One Client** to display notifications for Gateway block events. Blocked users will receive an operating system notification from the Cloudflare One Client with a custom message you set. If you do not set a custom message, the Cloudflare One Client will display a default message. Custom messages must be 100 characters or less. The Cloudflare One Client will only display one notification per minute.

Upon selecting the notification, the Cloudflare One Client will direct your users to the [Gateway block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/) you have configured. Optionally, you can direct users to a custom URL, such as an internal support form.

When you turn on **Send policy context**, Gateway will append details of the matching request to the redirected URL as a query string. Not every context field will be included. Potential policy context fields include:

Policy context fields

| Field                 | Definition                                                                                                                                       | Example                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| User email            | Email of the user that made the query.                                                                                                           | &cf\_user\_email=user@example.com                                    |
| Site URL              | Full URL of the original HTTP request or domain name in DNS query.                                                                               | &cf\_site\_uri=https%3A%2F%2Fmalware.testcategory.com%2F             |
| URL category          | [Domain categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/) of the URL to be redirected.           | &cf\_request\_categories=New%20Domains,Newly%20Seen%20Domains        |
| Original HTTP referer | For HTTP traffic, the original HTTP referer header of the HTTP request.                                                                          | &cf\_referer=https%3A%2F%2Fexample.com%2F                            |
| Rule ID               | ID of the Gateway policy that matched the request.                                                                                               | &cf\_rule\_id=6d48997c-a1ec-4b16-b42e-d43ab4d071d1                   |
| Source IP             | Source IP address of the device that matched the policy.                                                                                         | &cf\_source\_ip=203.0.113.5                                          |
| Device ID             | UUID of the device that matched the policy.                                                                                                      | &cf\_device\_id=6d48997c-a1ec-4b16-b42e-d43ab4d071d1                 |
| Application names     | Name of the application the redirected domain corresponds to, if any.                                                                            | &cf\_application\_name=Salesforce                                    |
| Filter                | The traffic type filter that triggered the block.                                                                                                | &cf\_filter=http, &cf\_filter=dns, &cf\_filter=av, or &cf\_filter=l4 |
| Account ID            | [Cloudflare account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) of the associated Zero Trust account. | &cf\_account\_id=d57c3de47a013c03ca7e237dd3e61d7d                    |
| Query ID              | ID of the DNS query for which the redirect took effect.                                                                                          | &cf\_query\_id=f8dc6fd3-a7a5-44dd-8b77-08430bb4fac3                  |
| Connection ID         | ID of the proxy connection for which the redirect took effect.                                                                                   | &cf\_connection\_id=f8dc6fd3-a7a5-44dd-8b77-08430bb4fac3             |
| Request ID            | ID of the HTTP request for which the redirect took effect.                                                                                       | &cf\_request\_id=f8dc6fd3-a7a5-44dd-8b77-08430bb4fac3                |

Ensure that your operating system allows notifications for the Cloudflare One Client. Your device may not display notifications if focus, do not disturb, or screen sharing settings are turned on. To turn on client notifications on macOS devices running DisplayLink software, you may have to allow system notifications when mirroring your display. For more information, refer to the [macOS documentation ↗](https://support.apple.com/guide/mac-help/change-notifications-settings-mh40583/mac).

## File scan criteria

If AV scanning is turned on, Gateway uses the following criteria (in order) to detect and scan files. The first match triggers a scan:

1. The `Content-Disposition` HTTP header is set to `Attachment`.
2. The byte signature of the request or response body matches a known file type:  
   * **Executable** (for example, `.exe`, `.bat`, `.dll`, and `.wasm`)  
   * **Documents** (for example, `.doc`, `.docx`, `.pdf`, `.ppt`, and `.xls`)  
   * **Compressed** (for example, `.7z`, `.gz`, `.zip`, and `.rar`)
3. The file name in the `Content-Disposition` header contains a file extension matching one of the above categories.

If none of these conditions match, Gateway falls back to the origin's `Content-Type` header. Gateway will not scan files it determines to be image, video, or audio files. All other files default to being scanned.

## Opt content out from scanning

When an admin turns on AV scanning for uploads and/or downloads, Gateway will scan every supported file. Admins can selectively choose to disable scanning using HTTP policies. All [HTTP selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#selectors) can opt HTTP traffic out from AV scanning using the **Do Not Scan** action. When traffic matches a Do Not Scan policy, nothing is scanned, regardless of file size or whether the file type is supported or not. For example, to prevent AV scanning of files uploaded to or downloaded from `example.com`, you can create the following policy:

| Selector | Operator      | Value       | Action      |
| -------- | ------------- | ----------- | ----------- |
| Hostname | matches regex | example.com | Do Not Scan |

Opting out of AV scanning applies to uploads and/or downloads of files, matching your account's global AV scanning setting. For example, if you have configured Gateway to globally scan uploads only, then opting out of AV scanning will only apply to uploads.

## Compatibility

### Supported compressed file types

In addition to standard object files like PDFs, Zero Trust supports AV scanning for the following archive types:

Supported compressed file types

* 7-Zip
* 7-Zip SFX
* ACE
* ACE SFX
* AutoHotkey
* AutoIt
* BASE64
* BZ2
* CHM Help Files
* CPIO SVR4
* Chrome Extension (CRX) Package Format
* eXtensible ARchive format (XAR)
* GZIP compressed files
* ISO 9660
* Inno Setup
* Indigo Rose Setup Factory
* Java ARchive
* LZH/LHA
* MacBinary
* MIME base64
* MSCOMPRESS
* Microsoft CAB
* Microsoft TNEF
* NSIS Nullsoft Installer
* Office Legacy XML
* PGP signed message, document, etc.
* RPM
* RAR
* SAPCar
* Self-extracting ARJ
* Self-extracting CA
* Self-extracting LZH/LHA
* Self-extracting RAR
* Self-extracting ZIP
* Smart Install Maker
* TAR
* UUE and XXE compressed files
* Windows Imaging File (WIM)
* XE compressed files (UUE and XXE)
* XZ file format
* ZIP
* ZOO

Gateway cannot scan [certain archive files](#non-scannable-files) regardless of file type, such as large or encrypted files.

### Non-scannable files

Gateway cannot scan all files for malware. When Gateway encounters a non-scannable file, you can configure AV scanning to either fail open (allow the file to pass through unscanned) or fail closed (deny the file transfer).

Gateway cannot scan requests containing the following files:

* Files larger than:  
   * 15 MB on Free plans  
   * 25 MB on Pay-as-you-go plans  
   * 100 MB on Enterprise plans
* PGP encrypted files
* Password protected archives
* Archives with more than three recursion levels
* Archives with more than 300 files

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/antivirus-scanning/#page","headline":"AV scanning · Cloudflare One docs","description":"How AV scanning works in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/antivirus-scanning/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/http-policies/","name":"HTTP policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/http-policies/antivirus-scanning/","name":"AV scanning"}}]}
```
