---
title: Historical (2024)
description: Changes to WAF managed rulesets done in 2024.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Historical (2024)

* [Managed ruleset updates](#managed-ruleset-updates)
* [General updates](#general-updates)

## Managed ruleset updates

| Ruleset                         | Rule ID     | Legacy Rule ID   | Description                                                                                                        | Change Date           | Old Action | New Action |
| ------------------------------- | ----------- | ---------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------- | ---------- | ---------- |
| Cloudflare Specials             | ...6bc398e9 | 100675           | Adobe ColdFusion - Auth Bypass - CVE:CVE-2023-38205                                                                | 2024-10-21            | Log        | Block      |
| Cloudflare Specials             | ...710cc526 | 100676           | Palo Alto Networks - Auth Bypass - CVE:CVE-2024-5910                                                               | 2024-10-21            | Log        | Block      |
| Cloudflare Specials             | ...04f7d36a | 100677           | SolarWinds - Auth Bypass - CVE:CVE-2024-28987                                                                      | 2024-10-21            | Log        | Block      |
| Cloudflare Specials             | ...2e49c1d8 | 100673           | GoAnywhere - Remote Code Execution - CVE:CVE-2023-0669                                                             | 2024-10-14            | Log        | Block      |
| Cloudflare Specials             | ...168ef44c | 100669           | Apache HugeGraph-Server - Remote Code Execution - CVE:CVE-2024-27348                                               | 2024-10-07            | Log        | Block      |
| Cloudflare Specials             | ...91e9ba51 | 100672           | Ivanti Virtual Traffic Manager - Auth Bypass - CVE:CVE-2024-7593                                                   | 2024-10-07            | Log        | Block      |
| Cloudflare Specials             | ...eb60e909 | 100670           | Junos - Remote Code Execution - CVE:CVE-2023-36844                                                                 | 2024-10-07            | Log        | Block      |
| Cloudflare Specials             | ...84938aa0 | 100671           | Microsoft SQL Server - Remote Code Execution - CVE:CVE-2020-0618                                                   | 2024-10-07            | Log        | Block      |
| Cloudflare Specials             | ...2f26b3a7 | 100581           | Joomla - Information Disclosure - CVE:CVE-2023-23752                                                               | 2024-10-07            | Log        | Block      |
| Cloudflare Specials             | ...11020996 | 100668           | Progress Software WhatsUp Gold - Information Disclosure - CVE:CVE-2024-6670                                        | 2024-10-01            | Log        | Block      |
| Cloudflare Specials             | ...8480ea8f | N/A              | Anomaly:Body - Large 2                                                                                             | 2024-09-16            | N/A        | Disabled   |
| Cloudflare Specials             | ...a24f08b7 | 100526           | VMware vCenter - CVE:CVE-2022-22954, CVE:CVE-2022-22948                                                            | 2024-09-03            | N/A        | Block      |
| Cloudflare Specials             | ...1a48569a | 100667           | Authentik - Auth Bypass - CVE:CVE-2024-42490                                                                       | Emergency, 2024-08-20 | N/A        | Block      |
| Cloudflare Specials             | ...f3f42616 | 100666           | Apache OFBiz - Remote Code Execution - CVE:CVE-2024-32113                                                          | 2024-08-19            | Log        | Block      |
| Cloudflare Specials             | ...71eefd6f | 100665           | Zoho ManageEngine - Remote Code Execution - CVE:CVE-2023-29084                                                     | 2024-08-19            | Log        | Block      |
| Cloudflare Specials             | ...89011f18 | 100664           | Automation Anywhere - SSRF - CVE:CVE-2024-6922                                                                     | 2024-08-05            | Log        | Block      |
| Cloudflare Specials             | ...740bce9a | 100663           | WSO2 - Dangerous File Upload - CVE:CVE-2022-29464                                                                  | 2024-08-05            | Log        | Block      |
| Cloudflare Specials             | ...77c07fce | 100662           | ServiceNow - Input Validation - CVE:CVE-2024-4879, CVE:CVE-2024-5178, CVE:CVE-2024-5217                            | 2024-08-05            | Log        | Block      |
| Cloudflare Specials             | ...daa4b037 | 100659           | Common Payloads for Server-side Template Injection - Base64                                                        | 2024-07-29            | N/A        | Disabled   |
| Cloudflare Specials             | ...4816b26f | 100559A          | Prototype Pollution - Common Payloads - Base64                                                                     | 2024-07-29            | N/A        | Disabled   |
| Cloudflare Specials             | ...818d6040 | 100660           | Server-side Includes - Common Payloads - Base64                                                                    | 2024-07-29            | N/A        | Disabled   |
| Cloudflare Specials             | ...3defc179 | 100661           | SQLi - Common Payloads - Base64                                                                                    | 2024-07-29            | N/A        | Disabled   |
| Cloudflare Specials             | ...f2cc4e84 | 100524           | Java - Remote Code Execution                                                                                       | 2024-07-29            | Block      | Disabled   |
| Cloudflare Specials             | ...f2cc4e84 | 100524           | Java - Remote Code Execution                                                                                       | 2024-07-24            | Log        | Block      |
| Cloudflare Specials             | ...a28a42c4 | 100659           | Common Payloads for Server-side Template Injection                                                                 | 2024-07-24            | N/A        | Disabled   |
| Cloudflare Specials             | ...fa595c5b | 100533A          | Generic Payloads NoSQL Injection Base64 Beta                                                                       | 2024-07-24            | N/A        | Disabled   |
| Cloudflare Specials             | ...f8c3c472 | 100533A          | Generic Payloads NoSQL Injection                                                                                   | 2024-07-24            | N/A        | Disabled   |
| Cloudflare Specials             | ...1b5ca35e | 100644           | Generic Payloads XSS Base64 Beta                                                                                   | 2024-07-24            | N/A        | Disabled   |
| Cloudflare Specials             | ...8d4b794c | 100644           | Generic Payloads XSS                                                                                               | 2024-07-24            | N/A        | Disabled   |
| Cloudflare Specials             | ...e0713e9f | 100642           | LDAP Injection Base64 Beta                                                                                         | 2024-07-24            | N/A        | Disabled   |
| Cloudflare Specials             | ...48f6a9cf | 100642           | LDAP Injection                                                                                                     | 2024-07-24            | N/A        | Disabled   |
| Cloudflare Specials             | ...433e5b3d | 100559A          | Prototype Pollution - Common Payloads                                                                              | 2024-07-24            | N/A        | Disabled   |
| Cloudflare Specials             | ...1a3e21e4 | 100645           | Remote Code Execution - Generic Payloads                                                                           | 2024-07-24            | N/A        | Disabled   |
| Cloudflare Specials             | ...ea67490b | 100660           | Server-Side Includes - Common Payloads                                                                             | 2024-07-24            | N/A        | Disabled   |
| Cloudflare Specials             | ...1e676265 | 100661           | SQLi - Common Payloads                                                                                             | 2024-07-24            | N/A        | Disabled   |
| Cloudflare Specials             | ...6fa67018 | 100658           | Apache OFBiz - SSRF - CVE:CVE-2023-50968                                                                           | 2024-07-17            | Log        | Block      |
| Cloudflare Specials             | ...f2f0224b | 100657           | JEECG - Deserialization - CVE:CVE-2023-49442                                                                       | 2024-07-17            | Log        | Block      |
| Cloudflare Specials             | ...34780914 | 100532           | Vulnerability scanner activity                                                                                     | 2024-07-17            | Log        | Block      |
| Cloudflare Specials             | ...a0c03e6f | 100654           | Telerik Report Server - Auth Bypass - CVE:CVE-2024-4358, CVE:CVE-2024-1800                                         | 2024-07-10            | Log        | Block      |
| Cloudflare Specials             | ...ff9f8ca6 | 100655           | Rejetto HTTP File Server - Remote Code Execution - CVE:CVE-2024-23692                                              | 2024-07-10            | Log        | Block      |
| Cloudflare Specials             | ...85c293eb | 100647           | pgAdmin - Remote Code Execution - CVE:CVE-2024-3116                                                                | 2024-07-10            | Log        | Block      |
| Cloudflare Specials             | ...b57f700d | 100656           | MoveIT - Auth Bypass - CVE:CVE-2024-5806                                                                           | 2024-07-10            | Log        | Block      |
| Cloudflare Specials             | ...afae3d67 | 100079A          | Java - Deserialization - 2                                                                                         | 2024-07-10            | Log        | Block      |
| Cloudflare Specials             | ...98760cfd | 100648           | Groovy - Remote Code Execution                                                                                     | 2024-07-10            | Log        | Block      |
| Cloudflare Specials             | ...69fe1e0d | 100700           | Apache SSRF vulnerability CVE-2021-40438                                                                           | 2024-07-10            | Log        | Block      |
| Cloudflare Specials             | ...1a9fccda | 100652           | PHP CGI - Information Disclosure - CVE:CVE-2024-4577                                                               | Emergency, 2024-06-18 | N/A        | Block      |
| Cloudflare Specials             | ...2b931b04 | 100653           | Veeam Backup Enterprise Manager - Information Disclosure - CVE:CVE-2024-29849                                      | Emergency, 2024-06-18 | N/A        | Block      |
| Cloudflare Specials             | ...00a71dce | 100651           | Atlassian Confluence - Remote Code Execution - CVE:CVE-2024-21683                                                  | Emergency, 2024-06-06 | N/A        | Block      |
| Cloudflare Specials             | ...b1df0e15 | 100650           | Check Point Security - Information Disclosure - CVE:CVE-2024-24919                                                 | Emergency, 2024-05-30 | N/A        | Block      |
| Cloudflare Specials             | ...92b2cc05 | 100649           | FortiSIEM - Remote Code Execution - CVE:CVE-2024-23108, CVE:CVE-2023-34992                                         | Emergency, 2024-05-29 | N/A        | Block      |
| Cloudflare Specials             | ...96ca9284 | N/A              | Generic Payloads XSS Base64 2 Beta                                                                                 | 2024-05-21            | N/A        | Disabled   |
| Cloudflare Specials             | ...fa595c5b | N/A              | Generic Payloads NoSQL Injection Base64 Beta                                                                       | 2024-05-14            | N/A        | Disabled   |
| Cloudflare Specials             | ...e0713e9f | N/A              | LDAP Injection Base64 Beta                                                                                         | 2024-05-14            | N/A        | Disabled   |
| Cloudflare Specials             | ...cad90fb3 | N/A              | NoSQL - Injection Base64 2 Beta                                                                                    | 2024-05-14            | N/A        | Disabled   |
| Cloudflare Specials             | ...1b5ca35e | N/A              | Generic Payloads XSS Base64 Beta                                                                                   | 2024-05-08            | N/A        | Disabled   |
| Cloudflare Specials             | ...34780914 | 100532           | Vulnerability scanner activity                                                                                     | 2024-05-06            | N/A        | Block      |
| Cloudflare Specials             | ...2753531e | 100533           | NoSQL - Injection                                                                                                  | 2024-05-06            | N/A        | Block      |
| Sensitive Data Disclosure (SDD) | ...17bd5326 | N/A              | Malaysian Phone Number                                                                                             | 2024-04-24            | N/A        | Disabled   |
| Sensitive Data Disclosure (SDD) | ...3172838f | N/A              | Malaysia Identification Card Number                                                                                | 2024-04-24            | N/A        | Disabled   |
| Cloudflare Specials             | ...27e67a11 | N/A              | Vulnerability scanner activity 3 Base64 Beta                                                                       | 2024-04-24            | N/A        | Disabled   |
| Cloudflare Specials             | ...9cb76af3 | N/A              | Default Windows User - Directory Traversal Base64 Beta                                                             | 2024-04-24            | N/A        | Disabled   |
| Cloudflare Specials             | ...fa595c5b | N/A              | Generic Payloads NoSQL Injection Base64 Beta                                                                       | 2024-04-24            | N/A        | Disabled   |
| Cloudflare Specials             | ...cad90fb3 | N/A              | NoSQL - Injection Base64 2 Beta                                                                                    | 2024-04-24            | N/A        | Disabled   |
| Cloudflare Specials             | ...e0713e9f | N/A              | LDAP Injection Base64 Beta                                                                                         | 2024-04-24            | N/A        | Disabled   |
| Cloudflare Specials             | ...1a3e21e4 | 100645           | Remote Code Execution - Generic Payloads                                                                           | 2024-04-22            | N/A        | Disabled   |
| Cloudflare Specials             | ...f8c3c472 | 100533A          | Generic Payloads NoSQL Injection                                                                                   | 2024-04-22            | N/A        | Disabled   |
| Cloudflare Specials             | ...8d4b794c | 100644           | Generic Payloads XSS                                                                                               | 2024-04-22            | N/A        | Disabled   |
| Cloudflare Specials             | ...e31d972a | 100007C\_BETA    | Command Injection - Common Attack Commands BetaUpdated detection logic.                                            | 2024-04-22            | N/A        | Disabled   |
| Cloudflare Specials             | ...7f3009d1 | 100643           | Default Windows User - Directory TraversalUpdated detection logic.                                                 | 2024-04-22            | N/A        | Disabled   |
| Cloudflare Specials             | ...48f6a9cf | 100642           | LDAP InjectionUpdated detection logic.                                                                             | 2024-04-22            | N/A        | Disabled   |
| Cloudflare Specials             | ...dd908124 | 100532C          | Vulnerability scanner activity 3Updated detection logic.                                                           | 2024-04-22            | N/A        | Disabled   |
| Cloudflare Specials             | ...851d2f71 | 100007C          | Command Injection - Common Attack Commands                                                                         | Emergency, 2024-04-16 | N/A        | Block      |
| Cloudflare Specials             | ...be099a1f | 100045C          | Anomaly:URL:Path - Multiple Slashes, Relative Paths, CR, LF or NULL 2                                              | 2024-04-15            | N/A        | Disabled   |
| Cloudflare Specials             | ...e31d972a | 100007C\_BETA    | Command Injection - Common Attack Commands Beta                                                                    | 2024-04-15            | N/A        | Disabled   |
| Cloudflare Specials             | ...7f3009d1 | 100643           | Default Windows User - Directory Traversal                                                                         | 2024-04-15            | N/A        | Disabled   |
| Cloudflare Specials             | ...cf419cda | 100088E          | Generic XXE Attack                                                                                                 | 2024-04-15            | N/A        | Disabled   |
| Cloudflare Specials             | ...56c53382 | 100088D          | Generic XXE Attack 2                                                                                               | 2024-04-15            | N/A        | Disabled   |
| Cloudflare Specials             | ...af00f61d | 100536A          | GraphQL Introspection                                                                                              | 2024-04-15            | N/A        | Disabled   |
| Cloudflare Specials             | ...a41e5b67 | 100536B          | GraphQL SSRF                                                                                                       | 2024-04-15            | N/A        | Disabled   |
| Cloudflare Specials             | ...48f6a9cf | 100642           | LDAP Injection                                                                                                     | 2024-04-15            | N/A        | Disabled   |
| Cloudflare Specials             | ...dd908124 | 100532C          | Vulnerability scanner activity 3                                                                                   | 2024-04-15            | N/A        | Disabled   |
| Cloudflare Specials             | ...49621813 | 100632           | Nginx - File Inclusion                                                                                             | 2024-04-08            | N/A        | Disabled   |
| Cloudflare Specials             | ...7dc64fb6 | 100633           | PHP - File Inclusion                                                                                               | 2024-04-08            | N/A        | Disabled   |
| Cloudflare Specials             | ...7eac8439 | 100634           | Generic Database - File Inclusion                                                                                  | 2024-04-08            | N/A        | Disabled   |
| Cloudflare Specials             | ...a0ccf665 | 100635           | Generic Log - File Inclusion                                                                                       | 2024-04-08            | N/A        | Disabled   |
| Cloudflare Specials             | ...e485e537 | 100636           | Generic Webservers - File Inclusion                                                                                | 2024-04-08            | N/A        | Disabled   |
| Cloudflare Specials             | ...1813c52d | 100637           | Generic Home Directory - File Inclusion                                                                            | 2024-04-08            | N/A        | Disabled   |
| Cloudflare Specials             | ...241fb0cb | 100638           | Generic System Process - File Inclusion                                                                            | 2024-04-08            | N/A        | Disabled   |
| Cloudflare Specials             | ...d03cd48f | 100639           | Command Injection                                                                                                  | 2024-04-08            | N/A        | Disabled   |
| Cloudflare Specials             | ...e367ad17 | 100640           | Generic System - File Inclusion                                                                                    | 2024-04-08            | N/A        | Disabled   |
| Cloudflare Specials             | ...a8f03d2d | 100641           | Apache - File Inclusion                                                                                            | 2024-04-08            | N/A        | Disabled   |
| Cloudflare Specials             | ...2bed8cdd | 100629           | JetBrains TeamCity - Auth Bypass, Remote Code Execution - CVE:CVE-2024-27198, CVE:CVE-2024-27199                   | 2024-03-18            | N/A        | Block      |
| Cloudflare Specials             | ...1ef425a5 | 100630           | Apache OFBiz - Auth Bypass, Remote Code Execution - CVE:CVE-2023-49070, CVE:CVE-2023-51467                         | 2024-03-18            | N/A        | Block      |
| Cloudflare Specials             | ...dc6877e2 | 100627           | Wordpress:Plugin:Bricks Builder Theme - Command Injection - CVE:CVE-2024-25600                                     | 2024-03-11            | N/A        | Block      |
| Cloudflare Specials             | ...ae685218 | 100628           | ConnectWise - Auth Bypass                                                                                          | 2024-03-11            | N/A        | Block      |
| Cloudflare Specials             | ...aa290ad9 | 100135D          | XSS - JS On Events                                                                                                 | 2024-03-04            | N/A        | Block      |
| Cloudflare Specials             | ...1d870399 | 100546           | XSS - HTML Encoding                                                                                                | 2024-02-26            | N/A        | Block      |
| Cloudflare Specials             | ...9a5581d0 | 100622B, 100622C | Ivanti - Command Injection - CVE:CVE-2023-46805, CVE:CVE-2024-21887, CVE:CVE-2024-22024                            | 2024-02-20            | N/A        | Block      |
| Cloudflare Specials             | ...d0b325aa | N/A              | Microsoft ASP.NET - Code Injection - Function response.write                                                       | 2024-02-20            | N/A        | Block      |
| Cloudflare Specials             | ...1b138b3e | N/A              | NoSQL, MongoDB - SQLi - Comparison                                                                                 | 2024-02-20            | N/A        | Block      |
| Cloudflare Specials             | ...8f66903c | N/A              | NoSQL, MongoDB - SQLi - Expression                                                                                 | 2024-02-20            | N/A        | Block      |
| Cloudflare Specials             | ...2d2e031c | N/A              | PHP - Code Injection                                                                                               | 2024-02-20            | N/A        | Disabled   |
| Cloudflare Specials             | ...824b817c | N/A              | PHP, vBulletin, jQuery File Upload - Code Injection, Dangerous File Upload - CVE:CVE-2018-9206, CVE:CVE-2019-17132 | 2024-02-20            | N/A        | Block      |
| Cloudflare Specials             | ...901523c0 | 100625           | Jenkins - Information Disclosure - CVE:CVE-2024-23897                                                              | 2024-02-12            | N/A        | Block      |
| Cloudflare Specials             | ...d5e015dd | 100514           | Log4j Headers                                                                                                      | 2024-02-12            | N/A        | Block      |
| Cloudflare Specials             | ...dc29b753 | 100515B          | Log4j Body Obfuscation                                                                                             | 2024-02-12            | N/A        | Block      |
| Cloudflare Specials             | ...52d6027b | 100624           | GoAnywhere - Auth Bypass - CVE:CVE-2024-0204                                                                       | 2024-02-05            | N/A        | Block      |
| Cloudflare Specials             | ...f89ab164 | 100626,100626A   | Anomaly:Header:Content-Type - Multiple                                                                             | 2024-02-05            | N/A        | Disabled   |
| Cloudflare Specials             | ...7736c63c | N/A              | AngularJS - XSS                                                                                                    | 2024-02-05            | N/A        | Block      |
| Cloudflare Specials             | ...a02344cb | N/A              | Apache HTTP Server - Server-Side Includes                                                                          | 2024-02-05            | N/A        | Disabled   |
| Cloudflare Specials             | ...af52d528 | N/A              | Command Injection - CVE:CVE-2014-6271                                                                              | 2024-02-05            | N/A        | Block      |
| Cloudflare Specials             | ...b090ba9a | N/A              | Command Injection - Nslookup                                                                                       | 2024-02-05            | N/A        | Block      |
| Cloudflare Specials             | ...d5a14a5e | N/A              | Microsoft ASP.NET - Code Injection                                                                                 | 2024-02-05            | N/A        | Disabled   |
| Cloudflare Specials             | ...da07a922 | 100623           | Atlassian Confluence - Template Injection - CVE:CVE-2023-22527                                                     | Emergency, 2024-01-22 | N/A        | Block      |
| Cloudflare Specials             | ...34ab53c5 | 100622           | Ivanti - Auth Bypass, Command Injection - CVE:CVE-2023-46805, CVE:CVE-2024-21887                                   | Emergency, 2024-01-17 | N/A        | Block      |
| Cloudflare Specials             | ...38906cff | 100620           | Microsoft ASP.NET - Remote Code Execution - CVE:CVE-2023-35813                                                     | 2024-01-16            | N/A        | Block      |
| Cloudflare Specials             | ...84f664a9 | 100619           | Liferay - Remote Code Execution - CVE:CVE-2020-7961                                                                | 2024-01-16            | N/A        | Block      |
| Cloudflare Specials             | ...7d29ec39 | 100618           | pfSense - Remote Code Execution - CVE:CVE-2023-42326                                                               | 2024-01-16            | N/A        | Block      |
| Cloudflare Specials             | ...9016ef33 | 100621           | Clerk - Auth Bypass                                                                                                | 2024-01-16            | N/A        | Disabled   |
| Cloudflare Specials             | ...53c7ccde | 100612           | SnakeYAML - CVE:CVE-2022-1471                                                                                      | 2024-01-04            | N/A        | Block      |

## General updates

### 2024-12-18

**Improved VPN Managed List**

Customers can now effectively manage incoming traffic identified as originating from VPN IPs. Customers with compliance restrictions can now ensure compliance with local laws and regulations. Customers with CDN restrictions can use the improved VPN Managed List to prevent unauthorized access from users attempting to bypass geographical restrictions. With the new VPN Managed List enhancements, customers can improve their overall security posture to reduce exposure to unwanted or malicious traffic.

### 2024-12-10

**Change the order of list items in IP Lists (for API and Terraform users)**

Due to changes in the API implementation, the order of list items in an IP list obtained via API or Terraform may change, which may cause Terraform to detect a change in Terraform state. To fix this issue, resync the Terraform state or upgrade the version of your Terraform Cloudflare provider to [version 4.44.0 ↗](https://github.com/cloudflare/terraform-provider-cloudflare/releases/tag/v4.44.0) or later.

### 2024-11-14

**Security Events pagination**

Fixed an issue with pagination in Security Events' sampled logs where some pages were missing data. Also removed the total count from the events log as these are only sampled logs.

### 2024-11-04

**New table in Security Analytics and Security Events**

Switched to a new, more responsive table in Security Analytics and Security Events.

### 2024-08-29

**Fixed occasional attack score mismatches**

Fixed an issue causing score mismatches between the global [WAF attack score](https://developers.cloudflare.com/waf/detections/attack-score/) and subscores. In certain cases, subscores were higher (not an attack) than expected while the global attack score was lower than expected (attack), leading to false positives.

### 2024-05-23

**Improved detection capabilities**

[WAF attack score](https://developers.cloudflare.com/waf/detections/attack-score/) now automatically detects and decodes Base64 and JavaScript (Unicode escape sequences) in HTTP requests. This update is available for all customers with access to WAF attack score (Business customers with access to a single field and Enterprise customers).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/change-log/historical-2024/#page","headline":"Historical (2024) · Cloudflare Web Application Firewall (WAF) docs","description":"Changes to WAF managed rulesets done in 2024.","url":"https://developers.cloudflare.com/waf/change-log/historical-2024/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/change-log/","name":"WAF changelog overview"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/change-log/historical-2024/","name":"Historical (2024)"}}]}
```
