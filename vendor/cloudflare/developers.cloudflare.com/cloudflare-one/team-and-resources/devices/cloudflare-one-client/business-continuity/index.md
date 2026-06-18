---
title: Business Continuity Guide
description: Build a business continuity strategy for the Cloudflare One Client using available disconnection mechanisms and decision guidance for service degradation scenarios.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Business Continuity Guide

This guide helps you build business continuity strategies for the Cloudflare One Client by documenting available disconnection mechanisms and providing decision guidance for handling service degradation or infrastructure unavailability.

## Current resilience posture

The Cloudflare One Client operates on Cloudflare's globally distributed network with 300+ points of presence (PoPs) worldwide. Anycast routing automatically directs client connections to the nearest healthy PoP without manual intervention. The client maintains locally cached policies and continues enforcing security controls even when unable to reach Cloudflare's management systems.

For detailed architecture information, refer to the [Cloudflare One Client documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) and the [Cloudflare Network and Service Resilience Whitepaper ↗](https://cf-assets.www.cloudflare.com/slt3lc6tev37/7ad0dpR3YyqxMlikPfbBgn/020b7450909f03ccf3c7dcfb0e99fc2e/Resilience%5FWhitepaper.pdf).

## Fail-open vs. fail-closed decisions

Note

**Critical decision framework**

The Cloudflare One Client operates in **fail-closed mode by default**: if the client cannot reach Cloudflare, it remains connected and blocks traffic rather than failing open to unprotected Internet access. This protects your security posture but requires active decision-making during incidents.

**When to fail open** (Cloudflare One Client stops trying to connect and allows network connectivity without Cloudflare One Client protections):

* User productivity is critically impaired and business operations are at risk
* Emergency access to non-protected resources is required
* Forensic investigation requires raw traffic visibility

**When to fail closed** (Cloudflare One Client blocks network connectivity until it can re-establish a tunnel to Cloudflare):

* Cloudflare edge services are operational (traffic is processing normally)
* Only management dashboard is unavailable (policies continue enforcing)
* Regulatory/compliance requirements prohibit unfiltered Internet access
* Security incident requires maintaining visibility and control

The mechanisms below help you execute fail-open decisions when needed. Document your decision criteria in advance and ensure appropriate stakeholders have authorization to trigger disconnection.

## Customer impact and decision guidance

| Scenario                                                                                                                                                                                                                | Mechanism                                                                                                                                                                                                                                                                                                                                            | Guidance                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Prerequisites and limitations                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Complete unavailability during Cloudflare infrastructure outage**Example: Cloudflare management systems unreachable; Global Disconnection unavailable but users need Internet access to maintain business operations. | **[External Emergency Disconnect](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect)**A customer-hosted HTTPS endpoint that clients poll for disconnect signals, operating independently of Cloudflare infrastructure. | **Use when:** Cloudflare's management systems are unreachable but you need to disconnect clients to restore Internet access.**Guidance:** Pre-configure this mechanism before outages occur. During an incident, update your endpoint to return {"emergency\_disconnect": true}.**Expected outcome:** Clients disconnect within 1–2 polling intervals (configurable, default 60 seconds); users regain direct Internet access without security controls.                                                                                                                                                                                                                                               | **Prerequisites:**Customer-hosted HTTPS endpoint (IPv4/IPv6 address, not domain)SHA-256 fingerprint of TLS certificateMDM deployment for group-differentiated responses**Limitations:** **Not available on iOS, Android, or ChromeOS**Customer responsible for endpoint maintenance and certificate renewalNo Cloudflare logging of disconnect eventsSplit Tunnel configuration must not include the endpoint IP**Security impact:** Loss of all Zero Trust controls (same as Global Disconnection). |
| **Complete unavailability of client connectivity**Example: Client cannot establish secure tunnel; users unable to access protected applications or filtered Internet.                                                   | **Global Disconnection**Instantly disconnect all Cloudflare One Clients from the secure tunnel via Dashboard or API.                                                                                                                                                                                                                                 | **Use when:** You need immediate fleet-wide disconnection and Cloudflare's management systems are reachable.**Guidance:** Check the [Cloudflare status page](https://www.cloudflarestatus.com/) first. If Cloudflare infrastructure is experiencing issues, this mechanism may be unavailable — use [External Emergency Disconnect](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect) instead.**Expected outcome:** All clients disconnect within seconds; users have direct Internet access without filtering, threat protection, or private application connectivity. | **Prerequisites:**Dashboard or API accessAccount administrator permissions**Limitations:**Requires connectivity to Cloudflare's management systemsAccount-wide only (no group scoping)Unavailable during complete Cloudflare outages**Security impact:**Loss of web filtering and malware protectionLoss of data loss prevention (DLP) inspectionLoss of access to private applicationsUnencrypted DNS queries (potential privacy exposure)                                                          |
| **Individual device issue requiring immediate local override**Example: Single user locked out due to policy misconfiguration; client switch disabled but user needs emergency access.                                   | **Admin Override Codes**Time-limited, single-use codes allowing IT administrators to temporarily unlock client settings on a specific device.                                                                                                                                                                                                        | **Use when:** An individual device requires immediate attention. This is the only option for iOS and Android users when External Emergency Disconnect is unavailable.**Guidance:** Generate the code in the Dashboard, provide it to the user over a secure channel, and have the user enter it locally to temporarily bypass the locked switch.**Expected outcome:** Temporary local override allowing the user to disconnect the client for one hour.                                                                                                                                                                                                                                                | **Prerequisites:** **Lock client device switch** policy enabledDashboard access to generate codesDirect communication with the end user**Limitations:**One code per device per hourManual IT intervention requiredNot scalable for fleet-wide scenariosRequires staffed IT during incidents**Security impact:** Single device loses Zero Trust controls for one hour.                                                                                                                                |
| **Degraded performance impacting user productivity**Example: High latency through client tunnel; intermittent connection drops affecting work quality.                                                                  | **Graduated response strategy**Use a combination of mechanisms based on scope and severity. Use [Digital Experience (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) to determine scope and severity.                                                                                                                          | **Guidance by scope:** **Single device:** Admin Override Code → manual disconnect**Group or department:** External Emergency Disconnect with MDM-differentiated endpoints**Organization-wide:** Global Disconnection (if Cloudflare reachable) or External Emergency Disconnect**Decision factors:** Balance user productivity needs against security requirements. For regulated industries, consult your compliance team before disconnecting.**Expected outcome:** Restored user productivity with a documented security trade-off.                                                                                                                                                                 | **Prerequisites:**Documented decision criteria for fail-open vs. fail-closedPre-configured mechanisms before incidents occurClear authorization matrix**Limitations:**Each mechanism has different infrastructure dependenciesMobile platforms have limited options**Security impact:** Scope-dependent — refer to individual mechanism entries above.                                                                                                                                               |
| **Management dashboard unavailable, traffic processing normally**Example: Dashboard and API unreachable; edge services and client connections remain functional with cached policies.                                   | **No action required**Edge services continue operating using cached configurations. New configuration changes will be unavailable until management systems recover.                                                                                                                                                                                  | **Use when:** Cloudflare's management systems are unavailable but user traffic continues processing normally.**Guidance:** Monitor the [Cloudflare status page](https://www.cloudflarestatus.com/). No customer action is typically required — edge services enforce cached policies until management systems recover.**Expected outcome:** Existing configuration continues to apply; configuration changes resume when management systems recover.                                                                                                                                                                                                                                                   | **Prerequisites:**Monitoring of the Cloudflare status pageUnderstanding that traffic processing and management are separate systems**Limitations:**Cannot modify policies during the outageCannot trigger Global Disconnection from DashboardReal-time logs and analytics may be delayed**Security impact:** None — security controls remain active.                                                                                                                                                 |

Warning

**Mobile platform limitation**

External Emergency Disconnect is **not available on iOS, Android, or ChromeOS**. For mobile users during Cloudflare infrastructure outages when Global Disconnection is also unavailable, Admin Override Codes are the only option (requires individual IT intervention).

## Additional considerations

### Prerequisites to validate before incidents

* Turn on the Global Disconnection feature in the Dashboard.
* Configure an External Emergency Disconnect endpoint and upload the certificate fingerprint.
* Test all mechanisms in a non-production environment.
* Document fail-open vs. fail-closed decision criteria and create an authorization matrix.
* Validate that IT and Security staff have backup mechanisms to access critical infrastructure.
* Practice using backup mechanisms regularly across departments and geographies.

**Access and credentials needed during incidents:**

* Cloudflare Dashboard administrator access
* API token with device settings permissions (for programmatic control)
* MDM administrator credentials (for group-differentiated responses)

### Testing recommendations

* Use a dedicated test organization or tenant for initial validation.
* Test with a small pilot group before fleet-wide deployment.
* Conduct quarterly testing of all three disconnection mechanisms.
* Run an annual full business continuity exercise including decision-making scenarios.

**Common testing issues:**

* External Emergency Disconnect changes take 1–2 polling intervals to take effect (default 60 seconds).
* Split Tunnel **Include** mode automatically excludes emergency endpoint IPs.
* Certificate fingerprint changes require MDM re-deployment to all affected devices.

### Integration dependencies

When you disconnect the Cloudflare One Client, the following controls are affected:

* **Web filtering and threat protection:** DNS and HTTP policies stop enforcing; users have direct, unfiltered Internet access.
* **Data loss prevention (DLP):** Content inspection stops; sensitive data uploads and downloads occur without DLP controls.
* **Private application access:** Connectivity to applications protected by Cloudflare Tunnel is lost. Consider alternative access methods such as a direct VPN for critical applications.
* **Gateway logging and analytics:** No visibility into user traffic during disconnection.

### When to contact Cloudflare support

**Contact support immediately if:**

* A suspected Cloudflare infrastructure issue is affecting multiple customers.
* You are unable to access the Dashboard during a critical security incident.
* An External Emergency Disconnect misconfiguration has caused a fleet-wide stuck state.

**Information to provide when opening a ticket:**

* Account ID and organization name
* Affected device count and platform distribution
* Results of your Cloudflare status page check
* Client diagnostic logs (`warp-diag`)
* Timeline and troubleshooting steps already taken

## Related resources

| Resource                      | Link                                                                                                                                                                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Product documentation         | [Cloudflare One Client documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/)                                                                                      |
| API reference                 | [Zero Trust Devices Settings API ↗](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/devices/subresources/settings/)                                                                                  |
| Global Disconnection          | [Global Disconnection settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#disconnect-the-cloudflare-one-client-on-all-devices)                     |
| External Emergency Disconnect | [External Emergency Disconnect documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect) |
| Admin Override Codes          | [Admin Override Codes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-admin-override-codes)                                                       |
| MDM deployment                | [MDM Deployment Guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/)                                                                           |
| Terraform provider            | [Cloudflare Terraform Provider – Zero Trust Devices ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fsettings)                                                   |
| Status page                   | [cloudflarestatus.com ↗](https://www.cloudflarestatus.com/)                                                                                                                                                                    |
| Troubleshooting               | [Client Troubleshooting Guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/)                                                                             |
| Resilience Whitepaper         | [Cloudflare Network and Service Resilience Whitepaper ↗](https://cf-assets.www.cloudflare.com/slt3lc6tev37/7ad0dpR3YyqxMlikPfbBgn/020b7450909f03ccf3c7dcfb0e99fc2e/Resilience%5FWhitepaper.pdf)                                |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/business-continuity/#page","headline":"Business Continuity Guide · Cloudflare One docs","description":"Build a business continuity strategy for the Cloudflare One Client using available disconnection mechanisms and decision guidance for service degradation scenarios.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/business-continuity/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/business-continuity/","name":"Business Continuity Guide"}}]}
```
