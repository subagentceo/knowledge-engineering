---
title: Changelog
description: Review recent changes to Cloudflare One.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/cloudflare-one.xml) 

## 2026-06-11

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**Define custom topics for AI prompt protection**   

You can now define custom topics for AI prompt protection. Predefined [AI prompt topics](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#ai-prompt-topics) cover common content and intent categories such as PII, source code, and jailbreak attempts. Custom topics let you detect unique or proprietary concepts that are not included in predefined categories.

You describe a custom topic in natural language, and Cloudflare DLP detects whether a prompt matches that topic based on context rather than specific keywords. For example, a topic that describes confidential merger discussions matches a prompt that paraphrases the deal, even when the prompt never uses the word merger or names the companies involved. To detect literal values such as internal codenames or product identifiers, use a [custom wordlist or pattern entry](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#custom-wordlist-datasets) instead.

Custom topics run through the same [application granular controls](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#granular-controls) path as predefined AI prompt topics. Custom topics are available for ChatGPT, Google Gemini, Perplexity, and Claude.

#### Create a custom AI prompt topic

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Data loss prevention** \> **Detection entries**.
2. Select **AI prompt topics**, then select **Custom Prompt Topic**.
3. Describe the topic in natural language. Be specific about the concept you want to detect. For example, describe unreleased product roadmap details or confidential customer contract terms.
4. Add this detection entry to an existing DLP profile, or [create a new DLP profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/#build-a-custom-profile).
5. Use the profile in a Gateway HTTP policy to log or block prompts that match the topic.

Note

Write the description as a concept to classify, not a list of keywords. For example, describe "internal financial forecasts and unreleased revenue figures" rather than listing specific document names.

For more information, refer to [AI prompt topics](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#ai-prompt-topics).

## 2026-06-05

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)[ Cloudflare Mesh ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/)[ Workers VPC ](https://developers.cloudflare.com/workers-vpc/) 

  
**Filter Workers' public Internet traffic using Gateway policies**   

Workers using a [VPC Network](https://developers.cloudflare.com/workers-vpc/configuration/vpc-networks/) binding with `network_id: "cf1:network"` now egress to public Internet destinations through [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/). This means your existing Zero Trust traffic policies — DNS, HTTP, Network, and egress — extend to traffic that originates from your Workers, the same way they do for WARP users today.

1. [Worker](https://developers.cloudflare.com/workers/)  
Calls `env.EGRESS.fetch()`
2. [VPC binding](https://developers.cloudflare.com/workers-vpc/) ↓
3. [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/)  
Bind via [cf1:network](https://developers.cloudflare.com/workers-vpc/configuration/vpc-networks/)
4. ↓
5. [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)  
Policies applied:  
[ DNS ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/)[ HTTP ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/)[ Network ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/)
6. ↓
7. ↗ Public Internet  
Any public hostname or IP
[ Gateway logs DNS HTTP Network ](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/) 

What you get by default:

* **Visibility.** Worker egress shows up in Gateway [DNS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/), [HTTP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/), and [Network](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) logs alongside your other traffic, so you can audit what your Workers are calling and when.
* **Enforcement.** Any existing Gateway policy whose selectors match a Worker request will apply — including allow / block lists, DNS category filtering, and HTTP destination rules. If you have already blocked a category for your workforce, your Workers inherit that block.

* [  wrangler.jsonc ](#tab-panel-7176)
* [  wrangler.toml ](#tab-panel-7177)

JSONC

```

{

  "vpc_networks": [

    {

      "binding": "EGRESS",

      "network_id": "cf1:network",

      "remote": true,

    },

  ],

}


```

TOML

```

[[vpc_networks]]

binding = "EGRESS"

network_id = "cf1:network"

remote = true


```

* [  JavaScript ](#tab-panel-7178)
* [  TypeScript ](#tab-panel-7179)

JavaScript

```

// Egress to a public destination — subject to your Gateway policies and logged

const response = await env.EGRESS.fetch("https://api.example.com/data");


```

TypeScript

```

// Egress to a public destination — subject to your Gateway policies and logged

const response = await env.EGRESS.fetch("https://api.example.com/data");


```

For configuration options, refer to [VPC Networks](https://developers.cloudflare.com/workers-vpc/configuration/vpc-networks/). For policy authoring, refer to [Cloudflare Gateway traffic policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/).

## 2026-06-04

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Share identity providers across accounts with IdP federation**   

Cloudflare Access now supports [IdP federation](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/idp-federation/), which allows organizations to share a single identity provider across multiple Cloudflare accounts.

Instead of configuring the same IdP (for example, Okta or Entra ID) separately in every account, you configure it once in a source account and share it with the other accounts in your organization. Each recipient account gets a read-only IdP connection that routes authentication back to the source account through a bridge — a hidden application in the source account that brokers the cross-account login. End users sign in with their existing IdP credentials, and each account's Access policies evaluate the resulting identity just like any other IdP login.

Key capabilities:

* **One IdP, many accounts** — Configure your IdP once and share it with all accounts in your organization.
* **Lifecycle management** — As accounts join or leave your Cloudflare organization, their IdP connections are provisioned and removed automatically — no manual cleanup required.
* **Immutable recipient connections** — IdP connections in recipient accounts cannot be accidentally modified or deleted.

To get started, refer to [IdP federation](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/idp-federation/).

## 2026-06-03

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**SAML assertion encryption for identity providers**   

Cloudflare Access now supports SAML assertion encryption for identity provider integrations. When turned on, your identity provider encrypts SAML assertions using a Cloudflare-managed certificate before sending them through the user's browser. Only Access can decrypt these assertions, protecting sensitive identity data even after TLS termination.

Without encryption, SAML assertions are transmitted in plaintext and could be visible to browser extensions or client-side malware.

![SAML encryption toggle in the identity provider configuration](https://developers.cloudflare.com/_astro/saml-encryption.J5jmiYv8_ZkhXFT.webp) 

SAML encryption includes built-in certificate lifecycle management:

* **Automatic certificate generation**: Access generates an encryption certificate when you turn on SAML encryption for an identity provider.
* **Certificate rotation**: Rotate certificates without downtime. The previous certificate remains valid until expiration, giving you time to update your IdP.
* **PEM export**: Copy the certificate in PEM format for manual upload to your IdP, or point your IdP to the SAML metadata endpoint for automatic retrieval.

To get started, refer to [Encrypt SAML assertions](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/#encrypt-saml-assertions).

## 2026-06-02

[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**Cisco IOS XE**   

The Cisco IOS XE third-party integration guide for Cloudflare WAN has been updated to include:

* Post Quantum Cryptography (PQC)
* Policy-Based Routing (PBR)
* IP Service Level Agreement (IP SLA)

This link will take you directly to the updated [Cisco IOS XE](https://developers.cloudflare.com/cloudflare-wan/configuration/third-party/cisco-ios-xe/) guide.

## 2026-05-29

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**Cloudflare One Client for macOS (version 2026.5.1155.1)**   

A new Beta release for the macOS Cloudflare One Client is now available on the [beta releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/).

This release introduces the new Cloudflare One Client UI for macOS! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Additional Changes and improvements**

* The client now applies DNS search suffixes configured in your [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles) / [network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies). Administrators can push a list of DNS search domains that the client appends to single-label queries, alongside any system-configured suffixes. See [DNS search suffixes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#dns-search-suffixes) for details.
* Administrators can now control which virtual networks (VNETs) are available to which users via WARP device profile settings in the Zero Trust dashboard. Previously, every VNET in the organization was visible to every device; you can now scope the VNET picker per profile so users only see the networks relevant to them. See [VNET availability](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#vnet-availability) for details.
* Added a local-file signal source for Emergency Disconnect. In addition to the existing HTTPS polling mechanism, administrators can now configure WARP to monitor for a file on disk; the presence of the file triggers an emergency disconnect even if both Cloudflare and your own infrastructure are unreachable. Either signal being asserted triggers disconnect; both must be cleared for normal operation to resume.
* Added new warp-cli debug commands for interactive connection diagnosis. See [Extra debug logging](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/#extra-debug-logging) for details.
* The local DNS proxy now supports DNSSEC passthrough. DNSSEC-signed responses are forwarded to the application intact (including DO/AD bits and RRSIG records), so applications that validate DNSSEC locally — including resolvers and the dig/drill tooling — work correctly through the client.
* Added a new MDM format for organization-wide settings, including a cleaner way to configure the compliance environment (e.g. FedRAMP). The previous per-configuration approach still works, but the new format is now recommended. See the updated [Cloudflare One MDM documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#organization%5Fconfigs) for details.
* Client Certificate device-posture checks now support template variables (e.g. `${serial_number}`, `${device_uuid}`) in the Subject Alternative Name field, matching what the documentation has always claimed. Previously only the Common Name field accepted variables, which broke posture rules that pinned identity to a SAN entry.
* Fixed the in-client captive-portal browser rendering a blank "Success" page on some airline Wi-Fi networks (United inflight Wi-Fi was the reported case). The browser now reliably loads the airline's real portal page so users can complete sign-in from inside the client instead of having to open a separate browser.
* Fixed an issue in proxy mode where hostnames containing underscores (e.g. ai\_app.com) were rejected, breaking apps that depend on such hostnames (notably ChatGPT sandbox apps). The local proxy now accepts underscore-containing hostnames in CONNECT requests.

**Known issues**

* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of split tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.

## 2026-05-29

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**Cloudflare One Client for Windows (version 2026.5.1155.1)**   

A new Beta release for the Windows Cloudflare One Client is now available on the [beta releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/).

This release introduces the new Cloudflare One Client UI for Windows! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Additional Changes and improvements**

* The client now applies DNS search suffixes configured in your [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles) / [network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies). Administrators can push a list of DNS search domains that the client appends to single-label queries, alongside any system-configured suffixes. See [DNS search suffixes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#dns-search-suffixes) for details.
* Administrators can now control which virtual networks (VNETs) are available to which users via WARP device profile settings in the Zero Trust dashboard. Previously, every VNET in the organization was visible to every device; you can now scope the VNET picker per profile so users only see the networks relevant to them. See [VNET availability](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#vnet-availability) for details.
* Added mandatory authentication. When enabled via MDM, the Cloudflare One Client blocks all Internet traffic from the moment the machine boots until the user authenticates, closing the visibility gap on newly deployed devices and during re-authentication. See the [announcement blog](https://blog.cloudflare.com/mandatory-authentication-mfa/) and [documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-no-auth-no-internet/) for details.
* Added a local-file signal source for Emergency Disconnect. In addition to the existing HTTPS polling mechanism, administrators can now configure WARP to monitor for a file on disk; the presence of the file triggers an emergency disconnect even if both Cloudflare and your own infrastructure are unreachable. Either signal being asserted triggers disconnect; both must be cleared for normal operation to resume.
* Added new warp-cli debug commands for interactive connection diagnosis. See [Extra debug logging](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/#extra-debug-logging) for details.
* The local DNS proxy now supports DNSSEC passthrough. DNSSEC-signed responses are forwarded to the application intact (including DO/AD bits and RRSIG records), so applications that validate DNSSEC locally — including resolvers and the dig/drill tooling — work correctly through the client.
* Added a new MDM format for organization-wide settings, including a cleaner way to configure the compliance environment (e.g. FedRAMP). The previous per-configuration approach still works, but the new format is now recommended. See the updated [Cloudflare One MDM documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#organization%5Fconfigs) for details.
* Client Certificate device-posture checks now support template variables (e.g. `${serial_number}`, `${device_uuid}`) in the Subject Alternative Name field, matching what the documentation has always claimed. Previously only the Common Name field accepted variables, which broke posture rules that pinned identity to a SAN entry.
* The UseWebView2 registry value (HKLM\\SOFTWARE\\Cloudflare\\CloudflareWARP\\UseWebView2 = y) is once again honored by the new GUI for authentication, so administrators who prefer the embedded WebView2 browser for sign-in can opt back in. This setting was effectively ignored in the previous release; the default browser was always used. This key is now also honored for re-authentications.
* Fixed a crash in the authentication browser when navigating to a site that prompts for browser permissions (microphone, camera, notifications, etc.). The same fix had previously landed for the captive-portal browser; this extends it to the auth browser.
* Fixed an issue in proxy mode where hostnames containing underscores (e.g. ai\_app.com) were rejected, breaking apps that depend on such hostnames (notably ChatGPT sandbox apps). The local proxy now accepts underscore-containing hostnames in CONNECT requests.

**Known issues**

* An error indicating that Microsoft Edge can't read and write to its data directory may be displayed during captive portal login; this error is benign and can be dismissed.
* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of Split Tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.
* Windows ARM may prompt the user to close running applications while trying to install this version. Simply click “Ok” with the default highlighted option.
* DNS resolution may be broken when the following conditions are all true:  
   * The client is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while the client is connected.  
   To work around this issue, please reconnect the client by selecting "disconnect" and then "connect" in the client user interface.

## 2026-05-28

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Tool and prompt aliases for MCP server portals**   

When you connect third-party MCP servers through [MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/), you have no control over how the server author named tools or wrote descriptions. Unclear names make it harder for AI agents to select the right tool and harder for users to understand what is available.

You can now [rename tools and prompts](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/#rename-tools-and-prompts-with-aliases) and rewrite their descriptions directly on the portal, without modifying the upstream server. For example, a tool named `super_cool_tool` can become `search_customer_records` with a description tailored to your organization.

![Edit tool modal showing name and description fields for an MCP server tool](https://developers.cloudflare.com/_astro/portal-edit-tool-modal.DrxORhBl_Z1NtRnj.webp) 

Modified tools display a **Modified** label in the tools list so administrators can see which tools have been customized at a glance.

![Tools authorized list showing a modified label on a renamed tool](https://developers.cloudflare.com/_astro/portal-tools-authorized-modified.B674Xvip_12xxcK.webp) 

Aliases override the metadata that MCP clients receive. You can set them at two levels:

* **Per portal**: Applies only within a specific portal. Takes precedence over server-level aliases.
* **Per server**: Applies across all portals that use the server.

You can reset an alias at any time to restore the original upstream name.

For more information, refer to [Tool and prompt aliases](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/#rename-tools-and-prompts-with-aliases).

## 2026-05-28

[ Cloudflare Mesh ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**High availability replica management for Cloudflare Mesh**   

The [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) dashboard now shows per-replica details for [high availability](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/high-availability/) nodes. You can see which replica is active, view each replica's Mesh IP and connection details, and manually trigger failover — all from the node detail page.

![Mesh HA replica tabs showing active and passive replicas with per-replica Mesh IPs and a manual failover option](https://developers.cloudflare.com/_astro/mesh-ha-replicas.Dvf1GMmQ_Z2i6nGi.webp) 

#### What's new

* **Replica tabs** on the node detail page — switch between replicas to see each one's Mesh IP, edge data center, origin IP, platform, version, and uptime.
* **Active/passive badges** identify which replica is currently routing traffic.
* **Manual failover** — promote a passive replica to active with a single click. The previous active replica switches to standby.
* **HA badge** in the overview table identifies nodes running multiple replicas.
* **Active replica IP** shown in the overview table — the dashboard now resolves which replica is active and displays the correct Mesh IP.

#### Manual failover

To manually promote a passive replica:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/mesh), go to **Networking** \> **Mesh**.
2. Select an HA-enabled node.
3. Select the passive replica tab.
4. Select **Promote to active** and confirm.

Traffic reroutes to the promoted replica immediately. Refer to [High availability](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/high-availability/) for details on failover behavior.

## 2026-05-27

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Write regex using natural language in Cloudflare One**   

[Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) policy selectors which support regular expressions can now be authored in the dashboard using natural language. When building a [policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/expression-syntax/) with a regex-based selector (like `matches regex`), you can describe what you want to match in plain English and the Cloudflare Agent will generate and validate a corresponding regular expression.

![Write policy regex using natural language](https://developers.cloudflare.com/_astro/gateway-regex-ai-generation.CtJ0S6FS_Z1WVe4K.webp) 

To get started, select a regex-compatible selector in the [Gateway policy builder](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) and select the icon. You'll see an input field for natural language, such as "any URL starting with /api/v1" or ".com, .net, and .app hosts which contain `gooogle` in the host."

You can also use the tool to explain existing regular expressions. If a policy already contains a regex pattern, you can instantly generate a plain-language description.

A built-in feedback mechanism allows you to rate each interaction to help improve output quality over time.

For more information, refer to [Cloudflare One firewall policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) and expect to see the same functionality supported soon in [Data loss prevention profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/).

## 2026-05-27

[ Cloudflare Tunnel ](https://developers.cloudflare.com/tunnel/)[ Cloudflare Tunnel for SASE ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) 

  
**Cloudflare Tunnel now runs connectivity pre-checks at startup**   

Starting with [cloudflared version 2026.5.2 ↗](https://github.com/cloudflare/cloudflared/releases), [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/) automates the entire [connectivity pre-checks workflow](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/connectivity-prechecks/) directly inside the binary. Previously, customers had to install `dig` and `netcat` and run those commands by hand to verify their environment. Now `cloudflared` does it natively at startup — and surfaces actionable remediation when something is blocked.

![cloudflared connectivity pre-checks output](https://developers.cloudflare.com/_astro/cloudflared-connectivity-prechecks.DRwN6tGe_c1XGu.webp) 

On every `cloudflared tunnel run` (and `cloudflared tunnel diag`), the binary now natively checks:

* **DNS resolution** — `region1.v2.argotunnel.com` and `region2.v2.argotunnel.com` resolve to valid Cloudflare IPs.
* **Transport connectivity** — outbound `UDP (QUIC)` and `TCP (HTTP/2)` on port `7844`.
* **Management API** — outbound `TCP/443` to `api.cloudflare.com` for software updates.

Results are printed in a scannable CLI table with three states:

* ✅ **Pass** — the check succeeded.
* ⚠️ **Warn** — a non-blocking issue, for example the Management API is unreachable so automatic updates will not work, but the tunnel will still come up.
* ❌ **Fail** — a blocking issue, with a specific remediation hint (for example, `Allow outbound UDP on port 7844`).

If DNS is unresolvable, or **both** UDP and TCP fail on port 7844, `cloudflared` exits early with the failure rather than looping on opaque `failed to dial` errors.

Pre-checks now run automatically on every start, which also catches regressions like overnight firewall policy changes — no need to remember to rerun the troubleshooting guide.

To get the new behavior, upgrade `cloudflared` to version `2026.5.2` or later. For more details, refer to the [Connectivity pre-checks documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/connectivity-prechecks/).

## 2026-05-26

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**Cloudflare One Client for macOS (version 2026.4.1390.0)**   

A new GA release for the macOS Cloudflare One Client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release introduces the new Cloudflare One Client UI for macOS! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Additional Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.
* Fixed a proxy mode connection stall issue.

**Known issues**

* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of split tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.

## 2026-05-26

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**Cloudflare One Client for Windows (version 2026.4.1390.0)**   

A new GA release for the Windows Cloudflare One Client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release introduces the new Cloudflare One Client UI for Windows! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Additional Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.
* Fixed a proxy mode connection stall issue.

**Known issues**

* Registration authentication for devices via the integrated WebView2 browser is unavailable in this version as a temporary measure. As a result, the client will utilize the default browser on the device to complete the authentication process.
* An error indicating that Microsoft Edge can't read and write to its data directory may be displayed during captive portal login; this error is benign and can be dismissed.
* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of Split Tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.
* Windows ARM may prompt the user to close running applications while trying to install this version. Simply click “Ok” with the default highlighted option.
* DNS resolution may be broken when the following conditions are all true:  
   * The client is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while the client is connected.  
   To work around this issue, please reconnect the client by selecting "disconnect" and then "connect" in the client user interface.

## 2026-05-26

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**Cloudflare One Client for Linux (version 2026.4.1390.0)**   

A new GA release for the Linux Cloudflare One Client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release introduces the new Cloudflare One Client UI for Linux! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.
* Official support for RHEL 9 has been added for Cloudflare Mesh nodes. To install the RHEL 9 package, the Extra Packages for Enterprise Linux (EPEL) repository must be active, as it contains dependencies required for the tray icon and captive portal webview.
* Fixed a proxy mode connection stall issue.

**Known issues**

* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of split tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.

## 2026-05-21

[ Cloudflare Fundamentals ](https://developers.cloudflare.com/fundamentals/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Cloudflare Tunnel for SASE ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)[ Cloudflare Tunnel ](https://developers.cloudflare.com/tunnel/)[ Cloudflare Mesh ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) 

  
**Granular permissions for Cloudflare Tunnel and Cloudflare Mesh**   

You can now scope Cloudflare permissions to individual [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/) instances and [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) nodes. Administrators can delegate access to specific Tunnels or Mesh nodes without granting account-wide control over private networking.

#### What is new

When you [add a member](https://developers.cloudflare.com/fundamentals/manage-members/manage/) or create a [permission policy](https://developers.cloudflare.com/fundamentals/manage-members/policies/), the resource picker now lists [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/) instances and [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) nodes as scopable resource types. You can:

* Grant a read-only role on a single Cloudflare Tunnel instance to a support operator for log streaming and diagnostics — without exposing other Tunnels or destructive actions.
* Grant a write role on a specific Cloudflare Mesh node to an application team — without giving them access to the rest of your private network.
* Scope a single policy to one or many Tunnels and Mesh nodes at once.

#### How it works

Granular permissions are a parallel layer to existing account-level roles — they do not replace them.

* **Existing account-level roles continue to work.** A member with `Cloudflare Access` or `Cloudflare Zero Trust` retains write access to every Tunnel and Mesh node in the account. This ensures backward compatibility for existing automation and tokens.
* **Granular permissions are additive.** For any API request on a specific Tunnel or Mesh node, access is granted if the principal has **either** the account-level role **or** a granular permission for that resource.
* **Resource enumeration is authorization-aware.** Listing endpoints (`GET /accounts/{id}/cfd_tunnel`, `GET /accounts/{id}/warp_connector`) return only the resources the principal has at least read access to.

#### Get started

* Configure [granular permissions for Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/advanced/granular-permissions/).
* Configure [granular permissions for Cloudflare Tunnel and Cloudflare Mesh in Cloudflare One](https://developers.cloudflare.com/cloudflare-one/networks/connectors/granular-permissions/).
* Review the [resource-scoped roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/#resource-scoped-roles) on the Cloudflare role reference.

## 2026-05-19

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Cloudflare as identity provider and account membership selector**   

Cloudflare Access now supports using Cloudflare itself as an [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/cloudflare/). If you publish an Access application and select Cloudflare as the login method, users can sign in with their existing Cloudflare account — no one-time PINs, no third-party IdP configuration, and no shared email inboxes. Authentication is backed by Cloudflare's own account security (including multi-factor authentication), making it both simpler to set up and more secure than OTP-based login for most use cases.

Cloudflare is now the **default identity provider for all newly created Zero Trust accounts**, replacing One-time PIN.

This also enables two new capabilities:

* **Cloudflare Account Member selector** — A new [policy selector](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#cloudflare-access-selectors) that matches users based on their membership in a Cloudflare account. You can target the current account or specify a different account ID for cross-account access scenarios.
* **Restrict to account members** — An identity provider configuration option that limits authentication to users who are members of your Cloudflare account.

To get started, add Cloudflare as an [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/cloudflare/) in your Zero Trust settings.

## 2026-05-19

[ CASB ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/) 

  
**CASB adds support for Claude Compliance API**   

[Cloudflare CASB](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/anthropic/) now integrates with the [Claude Compliance API ↗](https://support.claude.com/en/articles/13015708-access-the-compliance-api). This enhancement gives security teams visibility into Claude usage patterns, admin activity, and compliance-relevant events across their organization.

The Claude Compliance API provides structured access to audit logs and administrative actions within Claude Enterprise and Claude Platform. Cloudflare CASB ingests this data to surface security findings that help organizations enhance their security posture and enforce AI governance.

#### Key capabilities

Starting today, security teams can scan for security findings across the following assets:

* **Public projects** — Projects set to public visibility
* **Project attachment** — Files and documents added to projects that violate DLP policies
* **Chat files** — User-uploaded and provider-generated files that violate DLP policies
* **Chat messages** — User prompts and provider responses that violate DLP policies
* **Artifacts** — Provider-generated documents and files that violate DLP policies

#### Learn more

This [integration](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/anthropic/) is available to all Cloudflare One customers. New Cloudflare customers can sign up and start with their first two integrations for free. Existing customers can enable the integration directly in the dashboard. The integration begins scanning immediately and surfaces findings in the dashboard within minutes.

## 2026-05-18

[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/)[ Magic Transit ](https://developers.cloudflare.com/magic-transit/) 

  
**Network Analytics support for Unified Routing**   

[Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/) is now fully supported for accounts using [Unified Routing](https://developers.cloudflare.com/cloudflare-wan/reference/traffic-steering/#unified-routing-mode-beta) mode. Traffic that traverses Unified Routing onramps and offramps is now visible in Network Analytics with the same dimensions and filters as traffic on the standard data plane.

This closes a parity gap for customers who had moved tunnels onto Unified Routing and lost visibility into their dataplane traffic in the Network Analytics dashboard. No configuration change is required — analytics data is collected automatically for all accounts with Unified Routing enabled.

For the remaining beta limitations, refer to [Traffic steering beta limitations](https://developers.cloudflare.com/cloudflare-wan/reference/traffic-steering/#beta-limitations).

## 2026-05-12

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Refreshed Access login page**   

The [Access login page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-login-page/) and [one-time password (OTP)](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/) page now feature a refreshed design that improves visual consistency, user trust, and mobile responsiveness.

**Before:**

![Screenshot of the previous Access login page](https://developers.cloudflare.com/_astro/access-login-old.CwNVkCQH_Z187ARH.webp) 

**After:**

![Screenshot of the updated Access login page](https://developers.cloudflare.com/_astro/access-login-new.Y7WUfg9G_1QeY33.webp) 

The updated login experience includes:

* **Unified authentication card** \- All sign-in options (identity provider buttons, email input, OTP) now appear in a single card with consistent styling, replacing the previous multi-section layout.
* **Consistent button styling** \- Identity provider buttons use a uniform size and layout for easier scanning and selection.
* **Better mobile experience** \- Responsive layout improvements ensure the login page renders correctly on phones and tablets.
* **Dark mode support** \- The login page now supports dark mode.

## 2026-05-12

[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/)[ Magic Transit ](https://developers.cloudflare.com/magic-transit/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**New accounts assigned a single IPv4 anycast address**   

New Magic Transit and Cloudflare WAN accounts are now assigned a single IPv4 anycast address by default.

Cloudflare handles failures on its network automatically by advertising your endpoint IP from multiple nodes across many globally distributed data centers. To handle failures on your network, configure two tunnels from separate routers.

To request additional anycast IP addresses for your account, contact your account team.

For tunnel configuration guidance, refer to [Configure tunnel endpoints](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/) for Cloudflare WAN or [Configure tunnel endpoints](https://developers.cloudflare.com/magic-transit/how-to/configure-tunnel-endpoints/) for Magic Transit.

## 2026-05-12

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Create Gateway firewall policies with natural language**   

Cloudflare Gateway now supports natural language policy creation for [DNS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/), [HTTP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/), and [Network](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) firewall policies. Administrators can describe the outcome they want in plain language, and Cloudflare will generate a complete policy rule that populates the policy builder form.

![Create with AI button on the Gateway firewall policies page](https://developers.cloudflare.com/_astro/gateway-create-with-ai.BYG07coh_1T38Vz.webp) 

To create a policy with natural language, select **Create with AI** on any Gateway firewall policy tab. Choose a policy type, describe what the policy should do, and a fully configured rule will appear in the policy builder for review. You can edit any field before saving, or re-generate with a different prompt.

The generated policy incorporates your account context - including lists, DLP profiles, applications, and device posture checks - so that references to your existing resources resolve automatically.

A built-in feedback mechanism allows you to rate each generated policy and provide optional comments, which Cloudflare uses to improve output quality over time.

For more information, refer to [Gateway firewall policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/).

## 2026-05-11

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**Cloudflare One Client for Windows (version 2026.4.1350.0)**   

A new GA release for the Windows Cloudflare One Client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release introduces the new Cloudflare One Client UI for Windows! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Additional Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.

**Known issues**

* Registration authentication for devices via the integrated WebView2 browser is unavailable in this version as a temporary measure. As a result, the client will utilize the default browser on the device to complete the authentication process.
* An error indicating that Microsoft Edge can't read and write to its data directory may be displayed during captive portal login; this error is benign and can be dismissed.
* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of Split Tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.
* Windows ARM may prompt the user to close running applications while trying to install this version. Simply click “Ok” with the default highlighted option.
* DNS resolution may be broken when the following conditions are all true:  
   * The client is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while the client is connected.  
   To work around this issue, please reconnect the client by selecting "disconnect" and then "connect" in the client user interface.

## 2026-05-11

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**Cloudflare One Client for macOS (version 2026.4.1350.0)**   

A new GA release for the macOS Cloudflare One Client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release introduces the new Cloudflare One Client UI for macOS! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Additional Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.

**Known issues**

* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of split tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.

## 2026-05-11

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**Cloudflare One Client for Linux (version 2026.4.1350.0)**   

A new GA release for the Linux Cloudflare One Client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release introduces the new Cloudflare One Client UI for Linux! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.
* Official support for RHEL 9 has been added for Cloudflare Mesh nodes. To install the RHEL 9 package, the Extra Packages for Enterprise Linux (EPEL) repository must be active, as it contains dependencies required for the tray icon and captive portal webview.

**Known issues**

* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of split tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.

## 2026-05-11

[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/)[ Magic Transit ](https://developers.cloudflare.com/magic-transit/) 

  
**NAT-T support for IKE on UDP port 500**   

Cloudflare IPsec now supports the standard NAT traversal (NAT-T) flow, where IKE begins on UDP port `500` and switches to UDP port `4500` after NAT is detected.

Previously, devices behind NAT had to be configured to initiate IKE on UDP port `4500` directly. Devices that started on UDP port `500` could not complete the IKE handshake when NAT was in the path. This required custom configuration on devices such as VeloCloud SD-WAN edges, Cisco IOS-XE routers, and Juniper SRX firewalls, and was not possible on every platform.

What changed:

* Devices behind NAT can now initiate IKE on either UDP port `500` or UDP port `4500`.
* Devices that start IKE on UDP port `500` and switch to UDP port `4500` after NAT detection now complete the handshake successfully.
* No configuration change is required on Cloudflare. The change is available for all IPsec tunnels on Cloudflare WAN and Magic Transit.

This change does not affect existing tunnels:

* Tunnels using UDP port `500` with no NAT detected continue to operate as before.
* Tunnels configured to start IKE on UDP port `4500` continue to operate as before.
* NAT detection logic is unchanged.

For configuration details, refer to [GRE and IPsec tunnels](https://developers.cloudflare.com/cloudflare-wan/reference/gre-ipsec-tunnels/).

## 2026-05-07

[ Cloudflare One Appliance ](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Custom DHCP options on Cloudflare One Appliance**   

When the Cloudflare One Appliance is acting as the DHCP server for a LAN, you can now configure custom DHCP options on the leases it issues. This unlocks workflows such as PXE / iPXE boot, VoIP phone provisioning, and vendor-specific client configuration.

Each option is defined by `option_number`, `value`, and one of four value types: `text`, `integer`, `hex`, or `ip`. Configurations are validated on the appliance before being applied — invalid configurations are rejected and the underlying error is returned to the API caller, so a bad option will not disrupt the live DHCP service.

For details, refer to [DHCP server options](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-options/).

## 2026-05-07

[ Cloudflare One Appliance ](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Source-based breakout and prioritization on Cloudflare One Appliance**   

Breakout and traffic prioritization rules on the Cloudflare One Appliance can now match by **source** in addition to destination application. You can pin breakout or priority behavior to:

* A source LAN interface — VLANs attached to that LAN are included automatically.
* A source IP address, range, or CIDR block.

This is the natural way to break out a guest VLAN to the local Internet, or to prioritize traffic from a specific subnet, without enumerating destination applications.

For details, refer to [Breakout traffic](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/application-based-policies/breakout-traffic/#breakout-by-source).

## 2026-05-07

[ Cloudflare One Appliance ](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Self-serve provisioning of Cloudflare One Virtual Appliance via API**   

You can now create, rotate, and delete Cloudflare One Virtual Appliance instances and their license keys directly via the API and Terraform.

* Create a virtual appliance and receive a license key: `POST /accounts/{account_id}/magic/connectors` with `device.provision_license: true`.
* Rotate the license key for an existing virtual appliance: `PATCH /accounts/{account_id}/magic/connectors/{connector_id}` with `provision_license: true`. The previous key is immediately and irrevocably revoked.
* Delete a virtual appliance to release the associated licensed device.

The license key is returned in the response only once, at create or rotate time. Copy and store it securely.

For details, refer to [Configure a Cloudflare One Virtual Appliance](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/configure-virtual-appliance/).

## 2026-05-06

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Cloudy Summaries in PhishNet O365**   

PhishNet users can now access **Cloudy summaries** directly within the email investigation experience. When reviewing a message in PhishNet, users will see an AI-generated summary that provides additional context and key details about the email.

These summaries help users quickly understand the nature of a message without needing to manually parse through headers, body content, and detection signals. Cloudy surfaces the most relevant information so users can make faster, more informed decisions about suspicious emails.

**These summaries are not trained on customer data.** They are generated using the outputs of our existing detection models and analysis systems.

This feature is available for PhishNet with Office 365\. Support for Gmail will be available by the end of the quarter.

## 2026-05-06

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**IPv6 CIDR routes for Cloudflare Mesh**   

[Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) nodes now support IPv6 CIDR routes. You can advertise both IPv4 and IPv6 subnets through your Mesh nodes, making IPv6-only or dual-stack private networks reachable from any enrolled device.

![IPv6 CIDR routes on a Mesh node in the Cloudflare dashboard](https://developers.cloudflare.com/_astro/mesh-ipv6-routes.CC-jlZkw_Z16Puzf.webp) 

To add an IPv6 route, follow the same steps as [adding an IPv4 route](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/#add-a-route) — enter the IPv6 CIDR (for example, `fd00::/64`) when configuring the route in the [dashboard ↗](https://dash.cloudflare.com/?to=/:account/mesh) or via the API.

## 2026-04-30

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Post-quantum IPsec interoperability with third-party devices**   

Cloudflare IPsec now supports post-quantum key agreement with compatible third-party devices. [Cisco ↗](https://www.cisco.com/) and [Fortinet ↗](https://www.fortinet.com/) are the first third-party vendors validated to interoperate with Cloudflare IPsec using ML-KEM (Module-Lattice-Based Key-Encapsulation Mechanism).

Post-quantum IPsec uses [RFC 9370 ↗](https://datatracker.ietf.org/doc/rfc9370/) and [draft-ietf-ipsecme-ikev2-mlkem ↗](https://datatracker.ietf.org/doc/draft-ietf-ipsecme-ikev2-mlkem/) to negotiate hybrid key agreement during the IKEv2 `IKE_INTERMEDIATE` phase. This combines classical Diffie-Hellman (Group 20) with ML-KEM-768 or ML-KEM-1024 to protect against [harvest-now, decrypt-later ↗](https://en.wikipedia.org/wiki/Harvest%5Fnow,%5Fdecrypt%5Flater) attacks.

Key details:

* Compatible with Cisco 8000 Series Secure Routers with IOS XR Release 26.1.1 and Fortinet FortiOS 7.6.6 and later.
* Uses ML-KEM-768 or ML-KEM-1024 as an additional Key Exchange to DH Group 20.
* Follows RFC 9370 and draft-ietf-ipsecme-ikev2-mlkem standards.
* No additional licensing required.

Post-quantum IPsec with third-party devices is now generally available with confirmed interoperability for the platforms listed above. Cloudflare intends to support interoperability with more vendors as they build out support for draft-ietf-ipsecme-ikev2-mlkem. Contact your account team to discuss support for additional vendors.

For supported key exchange methods and the list of validated platforms, refer to [GRE and IPsec tunnels](https://developers.cloudflare.com/cloudflare-wan/reference/gre-ipsec-tunnels/#tested-third-party-vendor-interoperability).

## 2026-04-30

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**Classify sensitive content with Data Classification**   

Cloudflare DLP now includes **Data Classification**, which lets administrators organize and label sensitive content using labels, templates, and reusable data classes.

With Data Classification, administrators can define labels such as sensitivity schemas and levels, and data tag groups and tags. Administrators can also build from Cloudflare-managed templates and create reusable data classes that combine detection entries, other data classes, sensitivity levels, and data tags.

You can then use those classifications in custom DLP profiles to identify the severity of sensitive content, understand where it exists, and apply that logic consistently across DLP profiles.

For more information, refer to [Data Classification](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/).

## 2026-04-30

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**New predefined detection entries are available**   

Cloudflare DLP now includes new predefined detection entries.

The expanded catalog includes detections for specific credential types, webhooks, addresses, tax identifiers, national IDs, financial data, and crypto wallets.

Examples include `GitHub PAT`, `OpenAI API Key`, `Slack Webhook`, `Discord Webhook`, `US Physical Address`, and `Bitcoin Wallet`.

For the full list, refer to [Predefined detection entries](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/predefined-detection-entries/).

## 2026-04-29

[ Digital Experience Monitoring ](https://developers.cloudflare.com/cloudflare-one/insights/dex/) 

  
**Digital experience tests to authenticated resources and enhanced configuration**   

[Digital experience tests](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/) now support testing applications protected by Cloudflare Access or third-party authentication. All authentication secrets are managed via [Cloudflare Secret Store](https://developers.cloudflare.com/secrets-store/).

Digital experience tests also have enhanced configuration options including:

* New HTTP methods (DELETE, PATCH, POST, PUT)
* Secret Store headers, custom plain text headers, and custom request bodies
* Advanced settings: follow redirects, response bodies, response headers, and allow untrusted certificates
![Digital experience test configuration for Cloudflare Access applications](https://developers.cloudflare.com/_astro/dex_test_auth_config.CD3G3zb__o7m7g.webp)![Digital experience enhanced test configuration](https://developers.cloudflare.com/_astro/dex_test_enhanced_config.Nsv7Vcob_ppxh5.webp) 

## 2026-04-29

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Gateway Authorization Proxy and hosted PAC files are now generally available**   

The [Gateway Authorization Proxy](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#authorization-endpoint) and [hosted PAC files](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#create-a-hosted-pac-file) are now generally available for all plan types.

Authorization proxy endpoints add an identity-aware option alongside the existing [source IP proxy endpoints](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#source-ip-endpoint), using [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) authentication to verify who a user is before applying Gateway filtering — without installing the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/). Cloudflare-hosted PAC files let you create and distribute PAC files directly from Cloudflare One on Cloudflare's global network.

These features are ideal for environments where deploying a device client is not an option, such as virtual desktops (VDI) or compliance-restricted endpoints.

To get started, refer to the [proxy endpoints documentation](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/).

## 2026-04-28

[ Digital Experience Monitoring ](https://developers.cloudflare.com/cloudflare-one/insights/dex/) 

  
**Internet outage notifications for devices**   

[Digital Experience](https://developers.cloudflare.com/cloudflare-one/insights/dex/) will display a dashboard notification when an Internet outage or traffic anomaly may impact a [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) device based on its geographic location or network connection.

This Internet outage and traffic anomaly data is pulled from [Cloudflare Radar ↗](https://radar.cloudflare.com/). All Internet outage and traffic anomaly observations can be viewed in the [Radar Outage Center ↗](https://radar.cloudflare.com/outage-center).

![Digital Experience Monitoring dashboard notification for Internet outage impacting Cloudflare One Client devices](https://developers.cloudflare.com/_astro/dex_radar_ux_notification.CpdrUVYA_ZSzgIe.webp)![Digital Experience Monitoring dashboard analytics for Internet outage impacting Cloudflare One Client devices](https://developers.cloudflare.com/_astro/dex_radar_analytics.GaPxWM6C_2jLyzS.webp) 

## 2026-04-28

[ Digital Experience Monitoring ](https://developers.cloudflare.com/cloudflare-one/insights/dex/) 

  
**Cloudflare One Client speed tests**   

IT teams can now remotely run speed tests from the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) to Cloudflare's network edge.

Each speed test includes the following metrics:

* Internet speed: download and upload throughput
* Latency: download, upload, unloaded latency, and jitter
* Network quality score: video streaming, webchat/real-time communication (RTC)

In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights** \> **Digital experience** \> **Diagnostics** and select **Run diagnostics** to use the feature today.

![Cloudflare One client speed test result](https://developers.cloudflare.com/_astro/dex_speed_test.DukupcRs_gXUVw.webp) 

## 2026-04-28

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**Create and manage DLP detection entries outside of profiles**   

You can now create, view, and manage DLP detection entries outside of profiles.

Detection entries are no longer hidden inside individual profiles. Administrators can manage detection entries directly from the **Detection entries** section and use them in custom DLP profiles.

For more information, refer to [Configure detection entries](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/).

## 2026-04-28

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**Detect PII records with a new predefined DLP profile**   

Cloudflare DLP now includes a new predefined profile designed to detect PII records that contain multiple types of personal data: **Personally Identifiable Information (PII) Record**.

Most predefined and custom DLP profiles match when any enabled detection entry matches. The **Personally Identifiable Information (PII) Record** profile is different. It only matches when at least three unique detection entries are found in close proximity, which reduces false positives from standalone values that may not represent a real PII record.

Detection entries included in the profile:

* AU Passport Number
* American Express Card Number
* Diners Club Card Number
* US Driver's License Number
* Email Address
* Full Name
* US Mailing Address
* Mastercard Card Number
* US Individual Tax Identification Number (ITIN)
* US Passport Number
* US Phone Number
* Union Pay Card Number
* United States SSN Numeric Detection
* Visa Card Number

For more information, refer to [predefined DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/).

## 2026-04-24

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**Network Session Logs now available for all on-ramps**   

[Zero Trust Network Session Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero%5Ftrust%5Fnetwork%5Fsessions/) are now generated for all traffic proxied through Cloudflare Gateway, regardless of on-ramp type. This includes traffic from [proxy endpoints (PAC files)](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/) and [Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) egress — on-ramps that previously did not generate session logs.

Customers who already consume the `zero_trust_network_sessions` dataset via [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/) or [Log Explorer](https://developers.cloudflare.com/log-explorer/) may see increased log volume if they use these on-ramps.

For field definitions, refer to [Zero Trust Network Session Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero%5Ftrust%5Fnetwork%5Fsessions/). For traffic analysis, refer to [Network session analytics](https://developers.cloudflare.com/cloudflare-one/insights/analytics/network-sessions/).

## 2026-04-23

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**AAGUID restrictions and AMR matching for Access independent MFA**   

[Independent MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/) in Cloudflare Access now supports two additional organization-level controls:

* **[Restrict authenticators by AAGUID](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/#restrict-authenticators-by-aaguid)** — Limit enrollment to a specific set of WebAuthn authenticators using their [AAGUID ↗](https://fidoalliance.org/specs/fido-v2.0-id-20180227/fido-registry-v2.0-id-20180227.html#authenticator-attestation-guid). This is useful for organizations that require FIPS-validated security keys or company-issued hardware. AAGUIDs are managed through a new [List](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/) type.
* **[AMR matching](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/#use-identity-provider-mfa)** — Skip the independent MFA prompt when the identity provider has already performed an equivalent MFA. Access reads the `amr` claim defined in [RFC 8176 ↗](https://datatracker.ietf.org/doc/html/rfc8176) and matches supported values such as `hwk`, `otp`, and `fpt` to the authenticator types allowed on the application or policy. This prevents users from having to complete MFA twice when their identity provider already enforces it.

To get started, refer to [Independent MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/).

## 2026-04-21

[ Cloudflare Network Firewall ](https://developers.cloudflare.com/cloudflare-network-firewall/)[ Magic Transit ](https://developers.cloudflare.com/magic-transit/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Country rules supported in Unified Routing**   

[Cloudflare Advanced Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/) Country rules are now supported for accounts using [Unified Routing](https://developers.cloudflare.com/cloudflare-wan/reference/traffic-steering/#unified-routing-mode-beta) mode. This feature requires a Cloudflare Advanced Network Firewall subscription.

You can create firewall rules that match traffic based on source or destination country to enforce geographic access policies across your network.

This is the first of the Cloudflare Advanced Network Firewall features to become available in Unified Routing. Support for additional features - IP Lists, ASN Lists, Threat Intel Lists, IDS, Rate Limiting, SIP, and Managed Rulesets - is planned.

For the full list of current beta limitations, refer to [Traffic steering beta limitations](https://developers.cloudflare.com/cloudflare-wan/reference/traffic-steering/#beta-limitations).

## 2026-04-20

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Network session analytics dashboard**   

The new [Network session analytics](https://developers.cloudflare.com/cloudflare-one/insights/analytics/network-sessions/) dashboard is now available in Cloudflare One. This dashboard provides visibility into your network traffic patterns, helping you understand how traffic flows through your Cloudflare One infrastructure.

![Cloudflare One Network Session Analytics](https://developers.cloudflare.com/_astro/cf1-network-session-analytics.Gl90hEcp_MuWRb.webp) 

#### What you can do with Network session analytics

* **Analyze geographic distribution**: View a world map showing where your network traffic originates, with a list of top locations by session count.
* **Monitor key metrics**: Track session count, total bytes transferred, and unique users.
* **Identify connection issues**: Analyze connection close reasons to troubleshoot network problems.
* **Review protocol usage**: See which network protocols (TCP, UDP, ICMP) are most used.

#### Dashboard features

* **Summary metrics**: Session count, bytes total, and unique users
* **Traffic by location**: World map visualization and location list with top traffic sources
* **Top protocols**: Breakdown of TCP, UDP, ICMP, and ICMPv6 traffic
* **Connection close reasons**: Insights into why sessions terminated (client closed, origin closed, timeouts, errors)

#### How to access

1. Log in to [Cloudflare One ↗](https://dash.cloudflare.com).
2. Go to **Zero Trust** \> **Insights** \> **Dashboards**.
3. Select **Network session analytics**.

For more information, refer to the [Network session analytics documentation](https://developers.cloudflare.com/cloudflare-one/insights/analytics/network-sessions/).

## 2026-04-17

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Homepage and sign-out for MCP server portals**   

[MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) display a homepage when users visit the portal domain in a browser.

![MCP server portal homepage showing connection status and setup instructions](https://developers.cloudflare.com/_astro/portals-homepage-disconnected.BHbOwayQ_Z1G37WD.webp) 

The homepage shows:

* The portal name and organization branding
* The MCP endpoint URL with a copy button
* Per-client connection instructions for Claude Desktop, Workers AI Playground, OpenCode, Windsurf, and other MCP clients

Authenticated users see their email address and a **Sign out** button. Selecting **Sign out** revokes all portal-level OAuth grants, deletes upstream server OAuth states, and redirects through Cloudflare Access logout. A confirmation page shows a summary of the revoked sessions.

For more information, refer to [MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/#portal-homepage).

## 2026-04-15

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Independent MFA for Access applications**   

Cloudflare Access now supports independent multi-factor authentication (MFA), allowing you to enforce MFA requirements without relying on your identity provider (IdP). With per-application and per-policy configuration, you can enforce stricter authentication methods like hardware security keys on sensitive applications without requiring them across your entire organization. This reduces the risk of MFA fatigue for your broader user population while adding additional security where it matters most.

This feature also addresses common gaps in IdP-based MFA, such as inconsistent MFA policies across different identity providers or the need for additional security layers beyond what the IdP provides.

Independent MFA supports the following authenticator types:

* **Authenticator application** — Time-based one-time passwords (TOTP) using apps like Google Authenticator, Microsoft Authenticator, or Authy.
* **Security key** — Hardware security keys such as YubiKeys.
* **Biometrics** — Built-in device authenticators including Apple Touch ID, Apple Face ID, and Windows Hello.

Note

Infrastructure applications do not yet support independent MFA.

#### Configuration levels

You can configure MFA requirements at three levels:

| Level            | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| **Organization** | Enforce MFA by default for all applications in your account.   |
| **Application**  | Require or turn off MFA for a specific application.            |
| **Policy**       | Require or turn off MFA for users who match a specific policy. |

Settings at lower levels (policy) override settings at higher levels (organization), giving you granular control over MFA enforcement.

#### User enrollment

Users enroll their authenticators through the [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/). To help with onboarding, administrators can share a direct enrollment link: `<your-team-name>.cloudflareaccess.com/AddMfaDevice`.

To get started with Independent MFA, refer to [Independent MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/).

## 2026-04-15

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**New, streamlined creation experience for Access Applications and Gateway Policies**   

The Cloudflare One dashboard now features redesigned builders for two core workflows: creating Gateway policies and configuring self-hosted Access applications.

#### Gateway rule builder

The Gateway rule builder now features a redesigned user experience, bringing it in line with the Access policy builder experience. Improvements include:

* **Streamlined UX** with clearer states and improved user interactions
* **Wirefilter editing** for viewing and editing Gateway rules directly from wirefilter expressions
* **Preview state** to review the impact of your policy in a simple graphic
![New Gateway rule builder](https://developers.cloudflare.com/_astro/gateway-rule-builder.BxvzsN8s_Z2q9xKY.webp) 

For more information, refer to [Traffic policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/).

#### Access application builder for self-hosted apps

The self-hosted Access application builder now offers a simplified creation workflow with fewer steps from setup to save. Improvements include:

* **New application selection experience** that makes choosing the right application type before you begin easier.
* **Streamlined creation flow** with fewer clicks to build and save an application
* **Inline policy creation** for building Access policies directly within the application creation flow
* **Preview state** to understand how your policies enforce user access before saving
![New Access application builder](https://developers.cloudflare.com/_astro/access-application-builder.B__yqGin_Z2pRlHk.webp) 

For more information, refer to [self-hosted applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/).

## 2026-04-15

[ Digital Experience Monitoring ](https://developers.cloudflare.com/cloudflare-one/insights/dex/) 

  
**Last seen timestamp for Cloudflare One Client devices is more consistent**   

The last seen timestamp for [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) devices is now more consistent across the dashboard. IT teams will see more consistent information about the most recent client event between a device and Cloudflare's network.

## 2026-04-14

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**DLP account-level settings**   

**Account-level DLP settings are now available** in Cloudflare One. You can now configure advanced DLP settings at the account level, including OCR, AI context analysis, and payload masking. This provides consistent enforcement across all DLP profiles and simplifies configuration management.

Key changes:

* **Consistent enforcement**: Settings configured at the account level apply to all DLP profiles
* **Simplified migration**: Settings enabled on any profile are automatically migrated to account level
* **Deprecation notice**: Profile-level advanced settings will be deprecated in a future release

**Migration details:**

During the migration period, if a setting is enabled on any profile, it will automatically be enabled at the account level. This means profiles that previously had a setting disabled may now have it enabled if another profile in the account had it enabled.

Settings are evaluated using OR logic - a setting is enabled if it is turned on at either the account level or the profile level. However, profile-level settings cannot be enabled when the account-level setting is off.

For more details, refer to the [DLP settings documentation](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-settings/).

## 2026-04-14

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**Introducing Cloudflare Mesh**   

[Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) is now available ([blog post ↗](https://blog.cloudflare.com/mesh/)). Mesh connects your services and devices with post-quantum encrypted networking, allowing you to route traffic privately between servers, laptops, and phones over TCP, UDP, and ICMP.

![Cloudflare Mesh network map showing nodes and devices connected through Cloudflare](https://developers.cloudflare.com/_astro/mesh-network-map.CED6jNHK_ZlOsym.webp) 

#### What Cloudflare Mesh does

* Assigns a private [Mesh IP](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/#mesh-ips) to every enrolled device and node.
* Enables any participant to reach any other participant by IP — including client-to-client, without deploying any infrastructure.
* Supports [CIDR routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/) for subnet routing through Mesh nodes.
* Supports [high availability](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/high-availability/) with active-passive replicas for nodes with routes.
* All traffic flows through Cloudflare, so [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/), [device posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/), and access rules apply to every connection.

#### What changed

* **WARP Connector** is now **Cloudflare Mesh**. Existing WARP Connectors are now called mesh nodes. All existing deployments continue to work — no migration required.
* **Peer-to-peer connectivity** is now called **Mesh connectivity** and is part of the Cloudflare Mesh documentation.
* **Mesh node limit** increased from 10 to **50 per account**.
* New [dashboard experience ↗](https://dash.cloudflare.com/?to=/:account/mesh) at **Networking** \> **Mesh** with an interactive network map, node management, route configuration, diagnostics, and a setup wizard.

#### Get started

Refer to the [Cloudflare Mesh documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) to set up your first Mesh network.

## 2026-04-14

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**Detect Cloudflare API tokens with DLP**   

The **Credentials and Secrets** DLP profile now includes three new predefined entries for detecting Cloudflare API credentials:

| Entry name                         | Token prefix | Detects                   |
| ---------------------------------- | ------------ | ------------------------- |
| Cloudflare User API Key            | cfk\_        | User-scoped API keys      |
| Cloudflare User API Token          | cfut\_       | User-scoped API tokens    |
| Cloudflare Account Owned API Token | cfat\_       | Account-scoped API tokens |

These detections target the new [Cloudflare API credential format](https://developers.cloudflare.com/fundamentals/api/get-started/token-formats/), which uses a structured prefix and a CRC32 checksum suffix. The identifiable prefix makes it possible to detect leaked credentials with high confidence and low false positive rates — no surrounding context such as `Authorization: Bearer` headers is required.

Credentials generated before this format change will not be matched by these entries.

#### How to enable Cloudflare API token detections

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **DLP** \> **DLP Profiles**.
2. Select the **Credentials and Secrets** profile.
3. Turn on one or more of the new Cloudflare API token entries.
4. Use the profile in a Gateway HTTP policy to log or block traffic containing these credentials.

Example policy:

| Selector    | Operator | Value                     | Action |
| ----------- | -------- | ------------------------- | ------ |
| DLP Profile | in       | _Credentials and Secrets_ | Block  |

You can also enable individual entries to scope detection to specific credential types — for example, enabling **Account Owned API Token** detection without enabling **User API Key** detection.

For more information, refer to [predefined DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/).

## 2026-04-14

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**Configure how sensitive data appears in DLP payload logs**   

You can now configure how sensitive data matches are displayed in your DLP payload match logs — giving your incident response team the context they need to validate alerts without compromising your security posture.

To get started, go to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), select **Zero Trust** \> **Data loss prevention** \> **DLP settings** and find the **Payload log masking** card.

Previously, all DLP payload logs used a single masking mode that obscured matched data entirely and hid the original character count, making it difficult to distinguish true positives from false positives. This update introduces three options:

* **Full Mask (default):** Masks the match while preserving character count and visual formatting (for example, `***-**-****` for a Social Security Number). This is an improvement over the previous default, which did not preserve character count.
* **Partial Mask:** Reveals 25% of the matched content while masking the remainder (for example, `***-**-6789`).
* **Clear Text:** Stores the full, unmasked violation for deep investigation (for example, `123-45-6789`).

**Important:** The masking level you select is applied at detection time, before the payload is encrypted. This means the chosen format is what your team will see after decrypting the log with your private key — the existing encryption workflow is unchanged.

**Applies to all enabled detections:** When a masking level other than Full Mask is selected, it applies to all sensitive data matches found within a payload window — not just the match that triggered the policy. Any data matched by your enabled DLP detection entries will be masked at the selected level.

For more information, refer to [DLP logging options](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#log-the-payload-of-matched-rules).

## 2026-04-10

[ Browser Isolation ](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) 

  
**Canvas Remoting optimizes performance for productivity applications**   

Remote Browser Isolation now supports **Canvas Remoting**, improving performance for HTML5 Canvas applications by sending vector draw commands instead of rasterized bitmaps.

#### Key improvements

* **10x bandwidth reduction:** Microsoft Word and other Office apps use 90% less bandwidth
* **Smooth performance:** Google Sheets maintains consistent 30fps rendering
* **Responsive terminals:** Web-based development environments and AI notebooks work in real-time
* **Zero configuration:** Enabled by default for all Browser Isolation customers

#### How it works

Instead of sending rasterized bitmaps for every Canvas update, Browser Isolation now:

1. Captures Canvas draw commands at the source
2. Converts them to lightweight vector instructions
3. Renders Canvas content on the client

This reduces bandwidth from hundreds of kilobytes per second to tens of kilobytes per second.

#### Managing Canvas Remoting

To temporarily disable for troubleshooting:

* Right-click the isolated webpage background
* Select **Disable Canvas Remoting**
* Re-enable the same way by selecting **Enable Canvas Remoting**

#### Limitations

Currently supports 2D Canvas contexts only. WebGL and 3D graphics applications continue using bitmap rendering. For more information, refer to [Canvas Remoting](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/canvas-remoting/).

## 2026-04-09

[ CASB ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/) 

  
**Send CASB posture finding instances with webhooks**   

You can now use **CASB webhooks** in Cloudflare One to send posture finding instances to external systems such as chat platforms, ticketing systems, SIEMs, SOAR tools, and custom automation services.

This gives security teams a simple way to route CASB posture findings into the tools and workflows they already use for triage and response.

To get started, go to **Integrations** \> **Webhooks** in the Cloudflare One dashboard to create a webhook destination. After you configure a webhook, open a posture finding instance and select **Send webhook** to send it.

#### Key capabilities

* **Flexible authentication** — Configure destinations using **None**, **Basic Auth**, **Bearer Auth**, **Static Headers**, or **HMAC-Signing**.
* **Built-in testing** — Use **Test delivery** to send a test request before sending a live finding instance.
* **Posture finding workflows** — Send posture finding instances directly from the finding details workflow in **Cloud & SaaS findings**.
* **HTTPS destinations** — Configure webhook destinations with public `https://` URLs.

#### Learn more

* Configure [CASB webhooks](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/webhooks/) in Cloudflare.
* Learn how to [manage findings](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/) in Cloudflare.

CASB webhooks are now available in Cloudflare One.

## 2026-04-08

[ Risk Score ](https://developers.cloudflare.com/cloudflare-one/insights/risk-score/) 

  
**User risk scoring for high risk browsing activity**   

Cloudflare One's **User Risk Scoring** now incorporates direct signals from **Gateway DNS traffic patterns**. This update allows security teams to automatically elevate a user's risk score when they visit high-risk or malicious domains, providing a more holistic view of internal threats.

#### Why this matters

Browsing activity is a primary indicator of potential compromise. By tying Gateway DNS logs to specific users, administrators can now flag individuals interacting with:

* **Security threats**: Domains associated with malware, phishing, or command-and-control (C2) centers.
* **High-risk content**: Categories such as questionable content or violence that may violate corporate compliance.

Even if a Gateway policy is set to **Block** the traffic, the interaction is still captured as a "hit" to ensure the user's risk profile reflects the attempted activity.

#### New risk behaviors

Two new behaviors are now available in the dashboard:

* **Suspicious Security Domain Visited**: Triggers when a user visits a domain in the security threats or security risk categories.
* **High risk domain visited**: Triggers when a user visits domains categorized as questionable content, violence, or CIPA.

To learn more and get started, refer to the [User Risk Scoring documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/risk-score/).

## 2026-04-07

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**Cloudflare One Client for Windows (version 2026.3.851.0)**   

A new GA release for the Windows Cloudflare One Client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes and improvements.

The next stable release for Windows will introduce the new Cloudflare One Client UI, providing a cleaner and more intuitive design as well as easier access to common actions and information.

**Changes and improvements**

* Fixed an issue causing Windows client tunnel interface initialization failure which prevented clients from establishing a tunnel for connection.
* Consumer-only CLI commands are now clearly distinguished from Zero Trust commands.
* Added detailed QUIC connection metrics to diagnostic logs for better troubleshooting.
* Added monitoring for tunnel statistics collection timeouts.
* Switched tunnel congestion control algorithm for local proxy mode to Cubic for improved reliability across platforms.
* Fixed packet capture failing on tunnel interface when the tunnel interface is renamed by SCCM VPN boundary support.
* Fixed unnecessary registration deletion caused by RDP connections in multi-user mode.
* Fixed increased tunnel interface start-up time due to a race between duplicate address detection (DAD) and disabling NetBT.
* Fixed tunnel failing to connect when the system DNS search list contains unexpected characters.
* Empty MDM files are now rejected instead of being incorrectly accepted as a single MDM config.
* Fixed an issue in local proxy mode where the client could become unresponsive due to upstream connection timeouts.
* Fixed an issue where the emergency disconnect status of a prior organization persisted after a switch to a different organization.
* Fixed initiating managed network detections checks when no network is available, which caused device profile flapping.
* Fixed an issue where degraded Windows Management Instrumentation (WMI) state could put the client in a failed connection state loop during initialization.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 version KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution. This warning will be omitted from future release notes. This Windows update was released in July 2025.
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later. This warning will be omitted from future release notes. This Microsoft Security Intelligence update was released in May 2025.
* DNS resolution may be broken when the following conditions are all true:  
   * The client is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while the client is connected.  
To work around this issue, reconnect the client by selecting **Disconnect** and then **Connect** in the client user interface.

## 2026-04-07

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**User Submission Triage Status Tracking**   

Cloudflare Email security now supports **Triage Status Tracking for User Submissions**. This enhancement gives SOC teams a streamlined way to track, manage, and prioritize user-submitted emails directly within the Cloudflare One dashboard.

* The User Submissions table now includes a **Status** column with three states: **Unreviewed** (new submissions awaiting triage), **Reviewed** (submissions assessed by the SOC team), and **Escalated** (submissions escalated to team submissions for further investigation). Analysts can quickly update statuses and filter the table to focus on what needs attention.
* SOC teams can now organize their triage workflows, avoid duplicate reviews, and make sure critical threats get escalated for deeper investigation—bringing order to the chaos of high-volume submission management.

Triage Status Tracking is **automatically available** for all Email security customers using the user submissions feature. No additional configuration is required; customers just need to make sure user submissions are being sent to their user submission aliases.

This applies to all Email security packages:

* **Advantage**
* **Enterprise**
* **Enterprise + PhishGuard**

## 2026-04-07

[ Cloudflare One Appliance ](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Link aggregation (LACP) support for Cloudflare One Appliance**   

Cloudflare One Appliance now supports Link Aggregation Control Protocol (LACP), allowing you to bundle up to six physical LAN ports into a single logical interface. Link aggregation increases available bandwidth and eliminates single points of failure on the LAN side of the appliance.

This feature is available in beta on physical appliance hardware with the latest OS. No entitlement is required.

To configure a Link Aggregation Group, refer to [Configure link aggregation groups](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/link-aggregation/).

## 2026-04-06

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**DANE Support for MX Deployments**   

Cloudflare Email Security now supports DANE (DNS-based Authentication of Named Entities) for MX deployments. This enhancement strengthens email transport security by enabling DNSSEC-backed certificate verification for our regional MX records.

* Regional MX hostnames now publish DANE TLSA records backed by DNSSEC, enabling DANE-capable SMTP senders to cryptographically validate certificate identities before establishing TLS connections—moving beyond opportunistic encryption to verified encrypted delivery.
* DANE support is automatically available for all customers using regional MX deployments. No additional configuration is required; DANE-capable mail infrastructure will automatically validate MX certificates using the published records.

This applies to all Email Security packages:

* **Advantage**
* **Enterprise**
* **Enterprise + PhishGuard**

## 2026-04-06

[ Cloudflare Fundamentals ](https://developers.cloudflare.com/fundamentals/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Organizations is now in public beta for enterprises**   

We're announcing the public beta of **Organizations** for enterprise customers, a new top-level Cloudflare container that lets Cloudflare customers manage multiple accounts, members, analytics, and shared policies from one centralized location.

**What's New**

**Organizations \[BETA\]**: [Organizations](https://developers.cloudflare.com/fundamentals/organizations/) are a new top-level container for centrally managing multiple accounts. Each Organization supports up to 500 accounts and 5000 zones, giving larger teams a single place to administer resources at scale.

**Self-serve onboarding**: Enterprise customers can [create an Organization](https://developers.cloudflare.com/fundamentals/organizations/setup/) in the dashboard and assign accounts where they are already Super Administrators.

**Centralized Account Management**: At launch, every Organization member has the Organization Super Admin role. Organization Super Admins can invite other users and manage any child account under the Organization implicitly.**Shared policies**: Share [WAF](https://developers.cloudflare.com/waf/custom-rules/) or [Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/tiered-policies/organizations/) policies across multiple accounts within your Organization to simplify centralized policy management.**Implicit access**: Members of an Organization automatically receive Super Administrator permissions across child accounts, removing the need for explicit membership on each account. Additional Org-level roles will be available over the course of the year.

**Unified analytics**: View, filter, and download aggregate HTTP analytics across all Organization child accounts from a single dashboard for centralized visibility into traffic patterns and security events.

**Terraform provider support**: Manage Organizations with infrastructure as code from day one. Provision organizations, assign accounts, and configure settings programmatically with the [Cloudflare Terraform provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/organization).

**Shared policies**: Share [WAF](https://developers.cloudflare.com/waf/custom-rules/) or [Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) policies across multiple accounts within your Organization to simplify centralized policy management.

Note

Organizations is in Public Beta. You must have an Enterprise account to create an organization, but once created, you can add accounts of any plan type where you are a Super Administrator.

For more info:

* [Get started with Organizations](https://developers.cloudflare.com/fundamentals/organizations/)
* [Set up your Organization](https://developers.cloudflare.com/fundamentals/organizations/setup/)
* [Review limitations](https://developers.cloudflare.com/fundamentals/organizations/limitations/)

## 2026-04-02

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**Cloudflare One Client for macOS (version 2026.3.846.0)**   

A new GA release for the macOS Cloudflare One Client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes and improvements.

The next stable release for macOS will introduce the new Cloudflare One Client UI, providing a cleaner and more intuitive design as well as easier access to common actions and information.

**Changes and improvements**

* Empty MDM files are now rejected instead of being incorrectly accepted as a single MDM config.
* Fixed an issue in local proxy mode where the client could become unresponsive due to upstream connection timeouts.
* Fixed an issue where the emergency disconnect status of a prior organization persisted after a switch to a different organization.
* Consumer-only CLI commands are now clearly distinguished from Zero Trust commands.
* Added detailed QUIC connection metrics to diagnostic logs for better troubleshooting.
* Added monitoring for tunnel statistics collection timeouts.
* Switched tunnel congestion control algorithm for local proxy mode to Cubic for improved reliability across platforms.
* Fixed initiating managed network detections checks when no network is available, which caused device profile flapping.

## 2026-04-02

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**Cloudflare One Client for Linux (version 2026.3.846.0)**   

A new GA release for the Linux Cloudflare One Client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes and improvements.

The next stable release for Linux will introduce the new Cloudflare One Client UI, providing a cleaner and more intuitive design as well as easier access to common actions and information.

**Changes and improvements**

* Empty MDM files are now rejected instead of being incorrectly accepted as a single MDM config.
* Fixed an issue in local proxy mode where the client could become unresponsive due to upstream connection timeouts.
* Fixed an issue where the emergency disconnect status of a prior organization persisted after a switch to a different organization.
* Consumer-only CLI commands are now clearly distinguished from Zero Trust commands.
* Added detailed QUIC connection metrics to diagnostic logs for better troubleshooting.
* Added monitoring for tunnel statistics collection timeouts.
* Switched tunnel congestion control algorithm for local proxy mode to Cubic for improved reliability across platforms.
* Fixed initiating managed network detections checks when no network is available, which caused device profile flapping.

## 2026-04-02

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Session management for MCP server portals**   

[MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) support in-session management of upstream MCP server connections. Users can return to the server selection page at any time to enable or disable servers, reauthenticate, or change which data a server has access to — all without leaving their MCP client.

To return to the server selection page, ask your AI agent with a prompt like "take me back to the server selection page." The portal responds with an authorization URL via [MCP elicitation ↗](https://modelcontextprotocol.io/specification/2025-03-26/server/elicitation) that you open in your browser:

```

https://<subdomain>.<domain>/authorize?elicitationId=<ELICITATION_ID>


```

From the server selection page you can:

* **Enable or disable servers** — Toggle individual upstream MCP servers on or off. Disabling a server removes its tools from the active session, which reduces context window usage.
* **Log out and reauthenticate** — Log out of a server and log back in to change which data the server has access to, or to reauthenticate with different permissions.

Users can also enable or disable a server inline by asking their AI agent directly, for example "enable the wiki server" or "disable my Jira server."

The portal also automatically prompts connected users to authorize new servers when an admin adds them to the portal. This requires the use of [managed OAuth](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/managed-oauth/#enable-managed-oauth-on-an-mcp-server-portal).

For more information, refer to [Manage portal sessions](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/#manage-portal-sessions).

## 2026-04-01

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/)[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Logs UI refresh**   

Access authentication logs and Gateway activity logs (DNS, Network, and HTTP) now feature a refreshed user interface that gives you more flexibility when viewing and analyzing your logs.

![Screenshot of the new logs UI showing DNS query logs with customizable columns and filtering options](https://developers.cloudflare.com/_astro/cf1-new-logs-ui.DxF4x0l-_mRSyH.webp) 

The updated UI includes:

* **Filter by field** \- Select any field value to add it as a filter and narrow down your results.
* **Customizable fields** \- Choose which fields to display in the log table. Querying for fewer fields improves log loading performance.
* **View details** \- Select a timestamp to view the full details of a log entry.
* **Switch to classic view** \- Return to the previous log viewer interface if needed.

For more information, refer to [Access authentication logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/access-authentication-logs/) and [Gateway activity logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/).

## 2026-03-26

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Code mode for MCP server portals**   

[MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) support [code mode](https://developers.cloudflare.com/agents/model-context-protocol/protocol/codemode/), a technique that reduces context window usage by replacing individual tool definitions with a single code execution tool. Code mode is turned on by default on all portals.

To turn it off, edit the portal in **Access controls** \> **AI controls** and turn off **Code mode** under **Basic information**.

When code mode is active, the portal exposes a single `code` tool instead of listing every tool from every upstream MCP server. The connected AI agent writes JavaScript that calls typed `codemode.*` methods for each upstream tool. The generated code runs in an isolated [Dynamic Worker](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/) environment, keeping authentication credentials and environment variables out of the model context.

To use code mode, append `?codemode=search_and_execute` to your portal URL when connecting from an MCP client:

```

https://<subdomain>.<domain>/mcp?codemode=search_and_execute


```

For more information, refer to [code mode](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/#code-mode).

## 2026-03-26

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Context optimization for MCP server portals**   

[MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) support two context optimization options that reduce how many tokens tool definitions consume in the model's context window. Both options are activated by appending the `optimize_context` query parameter to the portal URL.

#### `minimize_tools`

Strips tool descriptions and input schemas from all upstream tools, leaving only their names. The portal exposes a special `query` tool that agents use to retrieve full definitions on demand. This provides up to 5x savings in token usage.

```

https://<subdomain>.<domain>/mcp?optimize_context=minimize_tools


```

#### `search_and_execute`

Hides all upstream tools and exposes only two tools: `query` and `execute`. The `query` tool searches and retrieves tool definitions. The `execute` tool runs the upstream tools in an isolated [Dynamic Worker](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/) environment. This reduces the initial token cost to a small constant, regardless of how many tools are available through the portal.

```

https://<subdomain>.<domain>/mcp?optimize_context=search_and_execute


```

For more information, refer to [Optimize context](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/#optimize-context).

## 2026-03-26

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**Streaming ZIP file scanning removes per-file size limits**   

DLP now processes ZIP files using a streaming handler that scans archive contents element-by-element as data arrives. This removes previous file size limitations and improves memory efficiency when scanning large archives.

Microsoft Office documents (DOCX, XLSX, PPTX) also benefit from this improvement, as they use ZIP as a container format.

This improvement is automatic — no configuration changes are required.

## 2026-03-25

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**Detect and sanitize HAR files**   

HTTP Archive (HAR) files are used by engineering and support teams to capture and share web traffic logs for troubleshooting. However, these files routinely contain highly sensitive data — including session cookies, authorization headers, and other credentials — that can pose a significant risk if uploaded to third-party services without being reviewed or cleaned first.

Gateway now includes a predefined DLP profile called **Unsanitized HAR** that detects HAR files in HTTP traffic. You can use this profile in a Gateway HTTP policy to either block HAR file uploads entirely or redirect users to a sanitization tool before allowing the upload to proceed.

#### How to configure a HAR file policy

In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall Policies** \> **HTTP** and create a new HTTP policy using the **DLP Profile** selector:

| Selector    | Operator | Value             | Action |
| ----------- | -------- | ----------------- | ------ |
| DLP Profile | in       | _Unsanitized HAR_ |        |

Then choose one of the following actions:

* **Block**: Prevents the upload of any HAR file that has not been sanitized by Cloudflare's sanitizer. Use this for strict environments where HAR file sharing must be disallowed entirely.
* **Block** with **Gateway Redirect**: Intercepts the upload and redirects the user to `https://har-sanitizer.pages.dev/`, where they can sanitize the file. Once sanitized, the user can re-upload the clean file and proceed with their workflow.

#### Sanitized HAR recognition

HAR files processed by the Cloudflare HAR sanitizer receive a tamper-evident sanitized marker. DLP recognizes this marker and will not re-trigger the policy on a file that has already been sanitized and has not been modified since. If a previously sanitized file is edited, it will be treated as unsanitized and flagged again.

#### Visibility in Gateway logs

Gateway logs will reflect whether a detected HAR file was classified as **Unsanitized** or **Sanitized**, giving your security team full visibility into HAR file activity across your organization.

For more information, refer to [predefined DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/).

## 2026-03-24

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**OIDC Claims filtering now available in Gateway Firewall, Resolver, and Egress policies**   

Cloudflare Gateway now supports [OIDC Claims](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/#oidc-claims) as a selector in Firewall, Resolver, and Egress policies. Administrators can use custom OIDC claims from their identity provider to build fine-grained, identity-based traffic policies across all Gateway policy types.

With this update, you can:

* Filter traffic in [DNS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/), [HTTP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/), and [Network](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) firewall policies based on OIDC claim values.
* Apply custom [resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) to route DNS queries to specific resolvers depending on a user's OIDC claims.
* Control [egress policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/) to assign dedicated egress IPs based on OIDC claim attributes.

For example, you can create a policy that routes traffic differently for users with `department=engineering` in their OIDC claims, or restrict access to certain destinations based on a user's role claim.

To get started, configure [custom OIDC claims](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#custom-oidc-claims) on your identity provider and use the **OIDC Claims** selector in the Gateway policy builder.

For more information, refer to [Identity-based policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/).

## 2026-03-20

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Managed OAuth for Cloudflare Access**   

Cloudflare Access supports managed OAuth, which allows non-browser clients — such as CLIs, AI agents, SDKs, and scripts — to authenticate with Access-protected applications using a standard OAuth 2.0 authorization code flow.

Previously, non-browser clients that attempted to access a protected application received a `302` redirect to a login page they could not complete. The established workaround was `cloudflared access curl`, which required installing additional tooling.

With managed OAuth, clients instead receive a `401` response with a `WWW-Authenticate` header that points to Access's OAuth discovery endpoints ([RFC 8414 ↗](https://datatracker.ietf.org/doc/html/rfc8414) and [RFC 9728 ↗](https://datatracker.ietf.org/doc/html/rfc9728)). The client opens the end user's browser to the Access login page. The end user authenticates with their identity provider, and the client receives an OAuth access token for subsequent requests.

Access enforces the same policies as a browser login; the OAuth layer is a new transport mechanism, not a separate authentication path.

Managed OAuth can be enabled on any self-hosted Access application or [MCP server portal](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/). It is opt-in for existing applications to avoid interfering with those that run their own OAuth servers and rely on their own `WWW-Authenticate` headers.

Note

For MCP server portals, managed OAuth is enabled by default on new portals. It remains opt-in for self-hosted applications.

To enable managed OAuth, go to **Zero Trust** \> **Access controls** \> **Applications**, edit the application, and turn on **Managed OAuth** under **Advanced settings**.

You can also enable it via the API by setting `oauth_configuration.enabled` to `true` on the [Access applications endpoint](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/applications/methods/update/).

![Managed OAuth settings in the Cloudflare dashboard](https://developers.cloudflare.com/_astro/managed-oauth.BirLnBpy_Zjg97R.webp) 

For setup instructions, refer to [Enable managed OAuth](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/managed-oauth/).

## 2026-03-20

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Route MCP server portal traffic through Cloudflare Gateway**   

[MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) can now route traffic through [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) for richer HTTP request logging and data loss prevention (DLP) scanning.

When Gateway routing is turned on, portal traffic appears in your [Gateway HTTP logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/). You can create [Gateway HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) with [DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/) to detect and block sensitive data sent to upstream MCP servers.

Note

DLP [AI prompt profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/#ai-prompt) do not apply to MCP server portal traffic.

To enable Gateway routing, go to **Access controls** \> **AI controls**, edit the portal, and turn on **Route traffic through Cloudflare Gateway** under **Basic information**.

![Route MCP server portal traffic through Cloudflare Gateway](https://developers.cloudflare.com/_astro/portal-route-through-gateway.0KMUAXBm_Z1B5rry.webp) 

For more details, refer to [Route traffic through Gateway](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/#route-portal-traffic-through-gateway).

## 2026-03-20

[ Cloudflare Tunnel ](https://developers.cloudflare.com/tunnel/)[ Cloudflare Tunnel for SASE ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) 

  
**Stream logs from multiple replicas of Cloudflare Tunnel simultaneously**   

In the Cloudflare One dashboard, the overview page for a specific Cloudflare Tunnel now shows all [replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/) of that tunnel and supports streaming logs from multiple replicas at once.

![View replicas and stream logs from multiple connectors](https://developers.cloudflare.com/_astro/tunnel-multiconn.DEOEaLlu_ZDxArh.webp) 

Previously, you could only stream logs from one replica at a time. With this update:

* **Replicas on the tunnel overview** — All active replicas for the selected tunnel now appear on that tunnel's overview page under **Connectors**. Select any replica to stream its logs.
* **Multi-connector log streaming** — Stream logs from multiple replicas simultaneously, making it easier to correlate events across your infrastructure during debugging or incident response. To try it out, log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/) and go to **Networks** \> **Connectors** \> **Cloudflare Tunnels**. Select **View logs** next to the tunnel you want to monitor.

For more information, refer to [Tunnel log streams](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/) and [Deploy replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/deploy-replicas/).

## 2026-03-15

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Unlimited result paging in Investigations**   

Investigations now support unlimited result paging in both the dashboard and the API, removing the previous 1,000-record cap. Security teams can page through complete result sets when searching across large mail volumes, giving SOC analysts and automated workflows deeper visibility for forensics and threat hunting.

In the dashboard, infinite paging is now supported in the Investigations view. The 1,000-record ceiling has been removed, so you can navigate through the full result set directly in the UI. The [Investigations API](https://developers.cloudflare.com/api/resources/email%5Fsecurity/subresources/investigate/methods/list) now returns up to 10,000 records per page (up from 1,000), with no cap on total result volume across pages.

For high-volume use cases, we recommend:

* **[Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/email-security-logs/) to a SIEM** for full-fidelity datasets and long-term retention.
* **SOAR playbooks** against the async bulk action API for large-scale remediation. Bulk actions initiated from the dashboard remain capped at 1,000 messages per action.
* **The Investigations API** for report exports larger than 1,000 results, which is the dashboard download cap.

This applies to all Email Security packages:

* **Advantage**
* **Enterprise**
* **Enterprise + PhishGuard**

## 2026-03-10

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for macOS (version 2026.3.566.1)**   

A new Beta release for the macOS WARP client is now available on the [beta releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/).

This release contains minor fixes and introduces a brand new visual style for the client interface. The new Cloudflare One Client interface changes connectivity management from a toggle to a button and brings useful connectivity settings to the home screen. The redesign also introduces a collapsible navigation bar. When expanded, more client information can be accessed including connectivity, settings, and device profile information. If you have any feedback or questions, visit the [Cloudflare Community forum](https://community.cloudflare.com/t/introducing-the-new-cloudflare-one-client-interface/901362) and let us know.

**Changes and improvements**

* Empty MDM files are now rejected instead of being incorrectly accepted as a single MDM config.
* Fixed an issue in proxy mode where the client could become unresponsive due to upstream connection timeouts.
* Fixed emergency disconnect state from a previous organization incorrectly persisting after switching organizations.
* Consumer-only CLI commands are now clearly distinguished from Zero Trust commands.
* Added detailed QUIC connection metrics to diagnostic logs for better troubleshooting.
* Added monitoring for tunnel statistics collection timeouts.
* Switched tunnel congestion control algorithm to Cubic for improved reliability across platforms.
* Fixed initiating managed network detection checks when no network is available, which caused device profile flapping.

**Known issues**

* The client may become stuck in a `Connecting` state. To resolve this issue, reconnect the client by selecting **Disconnect** and then **Connect** in the client user interface. Alternatively, change the client's operation mode.
* The client may display an empty white screen upon the device waking from sleep. To resolve this issue, exit and then open the client to re-launch it.
* Canceling login during a single MDM configuration setup results in an empty page with no way to resume authentication. To work around this issue, exit and relaunch the client.

## 2026-03-10

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Windows (version 2026.3.566.1)**   

A new Beta release for the Windows WARP client is now available on the [beta releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/).

This release contains minor fixes and introduces a brand new visual style for the client interface. The new Cloudflare One Client interface changes connectivity management from a toggle to a button and brings useful connectivity settings to the home screen. The redesign also introduces a collapsible navigation bar. When expanded, more client information can be accessed including connectivity, settings, and device profile information. If you have any feedback or questions, visit the [Cloudflare Community forum](https://community.cloudflare.com/t/introducing-the-new-cloudflare-one-client-interface/901362) and let us know.

**Changes and improvements**

* Consumer-only CLI commands are now clearly distinguished from Zero Trust commands.
* Added detailed QUIC connection metrics to diagnostic logs for better troubleshooting.
* Added monitoring for tunnel statistics collection timeouts.
* Switched tunnel congestion control algorithm to Cubic for improved reliability across platforms.
* Fixed packet capture failing on tunnel interface when the tunnel interface is renamed by SCCM VPN boundary support.
* Fixed unnecessary registration deletion caused by RDP connections in multi-user mode.
* Fixed increased tunnel interface start-up time due to a race between duplicate address detection (DAD) and disabling NetBT.
* Fixed tunnel failing to connect when the system DNS search list contains unexpected characters.
* Empty MDM files are now rejected instead of being incorrectly accepted as a single MDM config.
* Fixed an issue in proxy mode where the client could become unresponsive due to upstream connection timeouts.
* Fixed emergency disconnect state from a previous organization incorrectly persisting after switching organizations.
* Fixed initiating managed network detection checks when no network is available, which caused device profile flapping.

**Known issues**

* The client may unexpectedly terminate during captive portal login. To work around this issue, use a web browser to authenticate with the captive portal and then re-launch the client.
* An error indicating that Microsoft Edge can't read and write to its data directory may be displayed during captive portal login; this error is benign and can be dismissed.
* The client may become stuck in a `Connecting` state. To resolve this issue, reconnect the client by selecting **Disconnect** and then **Connect** in the client user interface. Alternatively, change the client's operation mode.
* The client may display an empty white screen upon the device waking from sleep. To resolve this issue, exit and then open the client to re-launch it.
* Canceling login during a single MDM configuration setup results in an empty page with no way to resume authentication. To work around this issue, exit and relaunch the client.
* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 version KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later. This warning will be omitted from future release notes. This Microsoft Security Intelligence update was released in May 2025.
* DNS resolution may be broken when the following conditions are all true:  
   * The client is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while the client is connected. To work around this issue, reconnect the client by selecting **Disconnect** and then **Connect** in the client user interface.

## 2026-03-04

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**User risk score selector in Access policies**   

You can now use [user risk scores](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/risk-score/) in your [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/). The new **User Risk Score** selector allows you to create Access policies that respond to user behavior patterns detected by Cloudflare's risk scoring system, including impossible travel, high DLP policy matches, and more.

For more information, refer to [Use risk scores in Access policies](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/risk-score/#use-risk-scores-in-access-policies).

## 2026-03-04

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Gateway Authorization Proxy and hosted PAC files (open beta)**   

The [Gateway Authorization Proxy](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#authorization-endpoint) and [PAC file hosting](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#create-a-hosted-pac-file) are now in open beta for all plan types.

Previously, [proxy endpoints](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#source-ip-endpoint) relied on static source IP addresses to authorize traffic, providing no user-level identity in logs or policies. The new authorization proxy replaces IP-based authorization with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) authentication, verifying who a user is before applying Gateway filtering without installing the WARP client.

This is ideal for environments where you cannot deploy a device client, such as virtual desktops (VDI), mergers and acquisitions, or compliance-restricted endpoints.

#### Key capabilities

* **Identity-aware proxy traffic** — Users authenticate through your identity provider (Okta, Microsoft Entra ID, Google Workspace, and others) via Cloudflare Access. Logs now show exactly which user accessed which site, and you can write [identity-based policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/) like "only the Finance team can access this accounting tool."
* **Multiple identity providers** — Display one or multiple login methods simultaneously, giving flexibility for organizations managing users across different identity systems.
* **Cloudflare-hosted PAC files** — Create and host [PAC files](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#create-a-hosted-pac-file) directly in Cloudflare One with pre-configured templates for Okta and Azure, hosted at `https://pac.cloudflare-gateway.com/<account-id>/<slug>` on Cloudflare's global network.
* **Simplified billing** — Each user occupies a seat, exactly like they do with the Cloudflare One Client. No new metrics to track.

#### Get started

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Networks** \> **Resolvers & Proxies** \> **Proxy endpoints**.
2. [Create an authorization proxy endpoint](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#authorization-endpoint) and configure Access policies.
3. [Create a hosted PAC file](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#create-a-hosted-pac-file) or write your own.
4. [Configure browsers](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#3b-configure-browser-to-use-pac-file) to use the PAC file URL.
5. [Install the Cloudflare certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) for HTTPS inspection.

For more details, refer to the [proxy endpoints documentation](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/) and the [announcement blog post ↗](https://blog.cloudflare.com/gateway-authorization-proxy-identity-aware-policies/).

## 2026-03-02

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**Copy Cloudflare One resources as JSON or POST requests**   

You can now copy Cloudflare One resources as JSON or as a ready-to-use API POST request directly from the dashboard. This makes it simple to transition workflows into API calls, automation scripts, or infrastructure-as-code pipelines.

To use this feature, click the overflow menu (⋮) on any supported resource and select **Copy as JSON** or **Copy as POST request**. The copied output includes only the fields present on your resource, giving you a clean and minimal starting point for your own API calls.

Initially supported resources:

* Access applications
* Access policies
* Gateway policies
* Resolver policies
* Service tokens
* Identity providers

We will continue to add support for more resources throughout 2026.

## 2026-03-01

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Clipboard controls for browser-based RDP**   

You can now configure clipboard controls for browser-based RDP with Cloudflare Access. Clipboard controls allow administrators to restrict whether users can copy or paste text between their local machine and the remote Windows server.

![Enable users to copy and paste content from their local machine to remote RDP sessions in the Cloudflare One dashboard](https://developers.cloudflare.com/_astro/rdp-clipboard-controls.B0ZmliDb_Z1Ne5yg.webp) 

This feature is useful for organizations that support bring-your-own-device (BYOD) policies or third-party contractors using unmanaged devices. By restricting clipboard access, you can prevent sensitive data from being transferred out of the remote session to a user's personal device.

#### Configuration options

Clipboard controls are configured per policy within your Access application. For each policy, you can independently allow or deny:

* **Copy from local client to remote RDP session** — Users can copy/paste text from their local machine into the browser-based RDP session.
* **Copy from remote RDP session to local client** — Users can copy/paste text from the browser-based RDP session to their local machine.

By default, both directions are denied for new policies. For existing Access applications created before this feature was available, clipboard access remains enabled to preserve backwards compatibility.

When a user attempts a restricted clipboard action, the clipboard content is replaced with an error message informing them that the action is not allowed.

For more information, refer to [Clipboard controls for browser-based RDP](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-browser/#clipboard-controls).

## 2026-02-27

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Export MCP server portal logs with Logpush**   

Availability

Only available on Enterprise plans.

[MCP server portals](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) now supports [Logpush](https://developers.cloudflare.com/logs/logpush/) integration. You can automatically export MCP server portal activity logs to third-party storage destinations or security information and event management (SIEM) tools for analysis and auditing.

#### Available log fields

The MCP server portal logs dataset includes fields such as:

* `Datetime` — Timestamp of the request
* `PortalID` / `PortalAUD` — Portal identifiers
* `ServerID` / `ServerURL` — Upstream MCP server details
* `Method` — JSON-RPC method (for example, `tools/call`, `prompts/get`, `resources/read`)
* `ToolCallName` / `PromptGetName` / `ResourceReadURI` — Method-specific identifiers
* `UserID` / `UserEmail` — Authenticated user information
* `Success` / `Error` — Request outcome
* `ServerResponseDurationMs` — Response time from upstream server

For the complete field reference, refer to [MCP portal logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/mcp%5Fportal%5Flogs/).

#### Set up Logpush

To configure Logpush for MCP server portal logs, refer to [Logpush integration](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/).

Note

MCP server portals is currently in beta.

## 2026-02-27

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**New protocols added for Gateway Protocol Detection (Beta)**   

Gateway [Protocol Detection](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/) now supports seven additional protocols in beta:

| Protocol     | Notes                                              |
| ------------ | -------------------------------------------------- |
| IMAP         | Internet Message Access Protocol — email retrieval |
| POP3         | Post Office Protocol v3 — email retrieval          |
| SMTP         | Simple Mail Transfer Protocol — email sending      |
| MYSQL        | MySQL database wire protocol                       |
| RSYNC-DAEMON | rsync daemon protocol                              |
| LDAP         | Lightweight Directory Access Protocol              |
| NTP          | Network Time Protocol                              |

These protocols join the existing set of detected protocols (HTTP, HTTP2, SSH, TLS, DCERPC, MQTT, and TPKT) and can be used with the _Detected Protocol_ selector in [Network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) to identify and filter traffic based on the application-layer protocol, without relying on port-based identification.

If protocol detection is enabled on your account, these protocols will automatically be logged when detected in your Gateway network traffic.

For more information on using Protocol Detection, refer to the [Protocol detection documentation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/).

## 2026-02-24

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Windows (version 2026.1.150.0)**   

A new GA release for the Windows WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes, improvements, and new features.

**Changes and improvements**

* Improvements to [multi-user mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-multiuser/). Fixed an issue where when switching from a pre-login registration to a user registration, Mobile Device Management (MDM) configuration association could be lost.
* Added a new feature to [manage NetBIOS over TCP/IP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#netbios-over-tcpip) functionality on the Windows client. NetBIOS over TCP/IP on the Windows client is now disabled by default and can be enabled in [device profile settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/).
* Fixed an issue causing failure of the [local network exclusion](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion) feature when configured with a timeout of `0`.
* Improvement for the Windows [client certificate posture check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/client-certificate/) to ensure logged results are from checks that run once users log in.
* Improvement for more accurate reporting of device colocation information in the Cloudflare One dashboard.
* Fixed an issue where misconfigured DEX HTTP tests prevented new registrations.
* Fixed an issue causing DNS requests to fail with clients in Traffic and DNS mode.
* Improved service shutdown behavior in cases where the daemon is unresponsive.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

## 2026-02-24

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for macOS (version 2026.1.150.0)**   

A new GA release for the macOS WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes and improvements.

**Changes and improvements**

* Fixed an issue causing failure of the [local network exclusion](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion) feature when configured with a timeout of `0`.
* Improvement for more accurate reporting of device colocation information in the Cloudflare One dashboard.
* Fixed an issue with DNS server configuration failures that caused tunnel connection delays.
* Fixed an issue where misconfigured DEX HTTP tests prevented new registrations.
* Fixed an issue causing DNS requests to fail with clients in Traffic and DNS mode.

## 2026-02-24

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Linux (version 2026.1.150.0)**   

A new GA release for the Linux WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes and improvements.

WARP client version 2025.8.779.0 introduced an updated public key for Linux packages. The public key must be updated if it was installed before September 12, 2025 to ensure the repository remains functional after December 4, 2025\. Instructions to make this update are available at [pkg.cloudflareclient.com](https://pkg.cloudflareclient.com).

**Changes and improvements**

* Fixed an issue causing failure of the [local network exclusion](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion) feature when configured with a timeout of `0`.
* Improvement for more accurate reporting of device colocation information in the Cloudflare One dashboard.
* Fixed an issue where misconfigured DEX HTTP tests prevented new registrations.
* Fixed issues causing DNS requests to fail with clients in Traffic and DNS mode or DNS only mode.

## 2026-02-20

[ CASB ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/) 

  
**Understand CASB findings instantly with Cloudy Summaries**   

You can now easily understand your SaaS security posture findings and why they were detected with **Cloudy Summaries in CASB**. This feature integrates Cloudflare's Cloudy AI directly into your CASB Posture Findings to automatically generate clear, plain-language summaries of complex security misconfigurations, third-party app risks, and data exposures.

This allows security teams and IT administrators to drastically reduce triage time by immediately understanding the context, potential impact, and necessary remediation steps for any given finding—without needing to be an expert in every connected SaaS application.

To view a summary, simply navigate to your Posture Findings in the Cloudflare One dashboard (under **Cloud and SaaS findings**) and open the finding details of a specific instance of a Finding.

Cloudy Summaries are supported on all available integrations, including Microsoft 365, Google Workspace, Salesforce, GitHub, AWS, Slack, and Dropbox. See the full list of supported integrations [here](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/).

#### Key capabilities

* **Contextual explanations** — Quickly understand the specifics of a finding with plain-language summaries detailing exactly what was detected, from publicly shared sensitive files to risky third-party app scopes.
* **Clear risk assessment** — Instantly grasp the potential security impact of the finding, such as data breach risks, unauthorized account access, or email spoofing vulnerabilities.
* **Actionable guidance** — Get clear recommendations and next steps on how to effectively remediate the issue and secure your environment.
* **Built-in feedback** — Help improve future AI summarization accuracy by submitting feedback directly using the thumbs-up and thumbs-down buttons.

#### Learn more

* Learn more about managing [CASB Posture Findings](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/) in Cloudflare.

Cloudy Summaries in CASB are available to all Cloudflare CASB users today.

## 2026-02-20

[ Cloudflare Tunnel ](https://developers.cloudflare.com/tunnel/)[ Cloudflare Tunnel for SASE ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) 

  
**Manage Cloudflare Tunnel directly from the main Cloudflare Dashboard**   

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) is now available in the main Cloudflare Dashboard at [Networking > Tunnels ↗](https://dash.cloudflare.com/?to=/:account/tunnels), bringing first-class Tunnel management to developers using Tunnel for securing origin servers.

![Manage Tunnels in the Core Dashboard](https://developers.cloudflare.com/_astro/tunnel-core-dashboard.BGPqaHfo_Pi6HO.webp) 

This new experience provides everything you need to manage Tunnels for [public applications](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/), including:

* **Full Tunnel lifecycle management**: Create, configure, delete, and monitor all your Tunnels in one place.
* **Native integrations**: View Tunnels by name when configuring [DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) and [Workers VPC](https://developers.cloudflare.com/workers-vpc/) — no more copy-pasting UUIDs.
* **Real-time visibility**: Monitor [replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/) and Tunnel [health status](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/common-errors/#tunnel-status) directly in the dashboard.
* **Routing map**: Manage all ingress routes for your Tunnel, including [public applications](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/), [private hostnames](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/), [private CIDRs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/), and [Workers VPC services](https://developers.cloudflare.com/workers-vpc/), from a single interactive interface.

#### Choose the right dashboard for your use case

**Core Dashboard**: Navigate to [Networking > Tunnels ↗](https://dash.cloudflare.com/?to=/:account/tunnels) to manage Tunnels for:

* Securing origin servers and [public applications](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/) with CDN, WAF, Load Balancing, and DDoS protection
* Connecting [Workers to private services](https://developers.cloudflare.com/workers-vpc/) via Workers VPC

**Cloudflare One Dashboard**: Navigate to [Zero Trust > Networks > Connectors ↗](https://one.dash.cloudflare.com/?to=/:account/networks/connectors) to manage Tunnels for:

* Securing your public applications with [Zero Trust access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/)
* Connecting users to [private applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/)
* Building a [private mesh network](https://developers.cloudflare.com/reference-architecture/architectures/sase/#connecting-networks)

Both dashboards provide complete Tunnel management capabilities — choose based on your primary workflow.

#### Get started

New to Tunnel? Learn how to [get started with Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/) or explore advanced use cases like [securing SSH servers](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/) or [running Tunnels in Kubernetes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/kubernetes/).

## 2026-02-19

[ Digital Experience Monitoring ](https://developers.cloudflare.com/cloudflare-one/insights/dex/) 

  
**DEX Supports EU Customer Metadata Boundary**   

[Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) provides visibility into [WARP](https://developers.cloudflare.com/warp-client/) device connectivity and performance to any internal or external application.

Now, all DEX logs are fully compatible with Cloudflare's [Customer Metadata Boundary](https://developers.cloudflare.com/data-localization/metadata-boundary/) (CMB) setting for the 'EU' (European Union), which ensures that DEX logs will not be stored outside the 'EU' when the option is configured.

If a Cloudflare One customer using DEX enables CMB 'EU', they will not see any DEX data in the Cloudflare One dashboard. Customers can ingest DEX data via [LogPush](https://developers.cloudflare.com/logs/logpush/), and build their own analytics and dashboards.

If a customer enables CMB in their account, they will see the following message in the Digital Experience dashboard: "DEX data is unavailable because Customer Metadata Boundary configuration is on. Use Cloudflare LogPush to export DEX datasets."

![Digital Experience Monitoring message when Customer Metadata Boundary for the EU is enabled](https://developers.cloudflare.com/_astro/dex_supports_cmb.6YOLXjHN_ZJh3uv.webp) 

## 2026-02-17

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Streamlined clientless browser isolation for private applications**   

A new **Allow clientless access** setting makes it easier to connect users without a device client to internal applications, without using public DNS.

![Allow clientless access setting in the Cloudflare One dashboard](https://developers.cloudflare.com/_astro/allow-clientless-access.BHKwQuVt_1mLRiX.webp) 

Previously, to provide clientless access to a private hostname or IP without a [published application](https://developers.cloudflare.com/cloudflare-one/networks/routes/add-routes/#add-a-published-application-route), you had to create a separate [bookmark application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/bookmarks/) pointing to a prefixed [Clientless Web Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/) URL (for example, `https://<your-teamname>.cloudflareaccess.com/browser/https://10.0.0.1/`). This bookmark was visible to all users in the App Launcher, regardless of whether they had access to the underlying application.

Now, you can manage clientless access directly within your [private self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/). When **Allow clientless access** is turned on, users who pass your Access application policies will see a tile in their App Launcher pointing to the prefixed URL. Users must have [remote browser permissions](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/) to open the link.

## 2026-02-17

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Policies for bookmark applications**   

You can now assign [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) to [bookmark applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/bookmarks/). This lets you control which users see a bookmark in the [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/) based on identity, device posture, and other policy rules.

Previously, bookmark applications were visible to all users in your organization. With policy support, you can now:

* **Tailor the App Launcher to each user** — Users only see the applications they have access to, reducing clutter and preventing accidental clicks on irrelevant resources.
* **Restrict visibility of sensitive bookmarks** — Limit who can view bookmarks to internal tools or partner resources based on group membership, identity provider, or device posture.

Bookmarks support all [Access policy configurations](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) except purpose justification, temporary authentication, and application isolation. If no policy is assigned, the bookmark remains visible to all users (maintaining backwards compatibility).

For more information, refer to [Add bookmarks](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/bookmarks/).

## 2026-02-17

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/)[ Cloudflare Network Firewall ](https://developers.cloudflare.com/cloudflare-network-firewall/)[ Network Flow ](https://developers.cloudflare.com/network-flow/) 

  
**Cloudflare One Product Name Updates**   

We are updating naming related to some of our Networking products to better clarify their place in the Zero Trust and Secure Access Service Edge (SASE) journey.

We are retiring some older brand names in favor of names that describe exactly what the products do within your network. We are doing this to help customers build better, clearer mental models for comprehensive SASE architecture delivered on Cloudflare.

#### What's changing

* **Magic WAN** → **Cloudflare WAN**
* **Magic WAN IPsec** → **Cloudflare IPsec**
* **Magic WAN GRE** → **Cloudflare GRE**
* **Magic WAN Connector** → **Cloudflare One Appliance**
* **Magic Firewall** → **Cloudflare Network Firewall**
* **Magic Network Monitoring** → **Network Flow**
* **Magic Cloud Networking** → **Cloudflare One Multi-cloud Networking**

**No action is required by you** — all functionality, existing configurations, and billing will remain exactly the same.

For more information, visit the [Cloudflare One documentation](https://developers.cloudflare.com/cloudflare-one/).

## 2026-02-13

[ Cloudflare Fundamentals ](https://developers.cloudflare.com/fundamentals/)[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Fine-grained permissions for Access policies and service tokens**   

Fine-grained permissions for **Access policies** and **Access service tokens** are available. These new resource-scoped roles expand the existing RBAC model, enabling administrators to grant permissions scoped to individual resources.

#### New roles

* **Cloudflare Access policy admin**: Can edit a specific [Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) in an account.
* **Cloudflare Access service token admin**: Can edit a specific [Access service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) in an account.

These roles complement the existing resource-scoped roles for Access applications, identity providers, and infrastructure targets.

For more information:

* [Resource-scoped roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/#resource-scoped-roles)
* [Role scopes](https://developers.cloudflare.com/fundamentals/manage-members/scope/)

Note

Resource-scoped roles is currently in beta.

## 2026-02-12

[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Anycast IPs displayed on the dashboard**   

Cloudflare WAN now displays your Anycast IP addresses directly in the dashboard when you configure IPsec or GRE tunnels.

Previously, customers received their Anycast IPs during onboarding or had to retrieve them with an API call. The dashboard now pre-loads these addresses, reducing setup friction and preventing configuration errors.

No action is required. All Cloudflare WAN customers can see their Anycast IPs in the tunnel configuration form automatically.

For more information, refer to [Configure tunnel endpoints](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/).

## 2026-02-11

[ Cloudflare One Appliance ](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Post-quantum encryption support for Cloudflare One Appliance**   

Cloudflare One Appliance version 2026.2.0 adds [post-quantum encryption](https://developers.cloudflare.com/ssl/post-quantum-cryptography/) support using hybrid ML-KEM (Module-Lattice-Based Key-Encapsulation Mechanism).

The appliance now uses TLS 1.3 with hybrid ML-KEM for its connection to the Cloudflare edge. During the TLS handshake, the appliance and the edge share a symmetric secret over the TLS connection and inject it into the ESP layer of IPsec. This protects IPsec data plane traffic against harvest-now, decrypt-later attacks.

This upgrade deploys automatically to all appliances during their configured interrupt windows with no manual action required.

For more information, refer to [Cloudflare One Appliance](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/).

## 2026-02-02

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Improved Accessibility and Search for Monitoring**   

We have updated the Monitoring page to provide a more streamlined and insightful experience for administrators, improving both data visualization and dashboard accessibility.

* **Enhanced Visual Layout**: Optimized contrast and the introduction of stacked bar charts for clearer data visualization and trend analysis.![visual-example](https://developers.cloudflare.com/_astro/monitoring-bar-charts.Bi-4BuXC_xiAlF.webp)
* **Improved Accessibility & Usability**:  
   * **Widget Search**: Added search functionality to multiple widgets, including Policies, Submitters, and Impersonation.  
   * **Actionable UI**: All available actions are now accessible via dedicated buttons.  
   * **State Indicators**: Improved UI states to clearly communicate loading, empty datasets, and error conditions.![buttons-example](https://developers.cloudflare.com/_astro/monitoring-buttons.DORPJvP__1JBNhu.webp)
* **Granular Data Breakdowns**: New views for dispositions by month, malicious email details, link actions, and impersonations.![monthly-example](https://developers.cloudflare.com/_astro/monitoring-monthly-dispositions.CYuI5d9y_ZSVir3.webp)

This applies to all Email Security packages:

* **Advantage**
* **Enterprise**
* **Enterprise + PhishGuard**

## 2026-01-30

[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/)[ Magic Transit ](https://developers.cloudflare.com/magic-transit/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**BGP over GRE and IPsec tunnels**   

Magic WAN and Magic Transit customers can use the Cloudflare dashboard to configure and manage BGP peering between their networks and their Magic routing table when using IPsec and GRE tunnel on-ramps (beta).

Using BGP peering allows customers to:

* Automate the process of adding or removing networks and subnets.
* Take advantage of failure detection and session recovery features.

With this functionality, customers can:

* Establish an eBGP session between their devices and the Magic WAN / Magic Transit service when connected via IPsec and GRE tunnel on-ramps.
* Secure the session by MD5 authentication to prevent misconfigurations.
* Exchange routes dynamically between their devices and their Magic routing table.

For configuration details, refer to:

* [Configure BGP routes for Magic WAN](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-routes/#configure-bgp-routes)
* [Configure BGP routes for Magic Transit](https://developers.cloudflare.com/magic-transit/how-to/configure-routes/#configure-bgp-routes)

## 2026-01-27

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Windows (version 2026.1.89.1)**   

A new Beta release for the Windows WARP client is now available on the [beta releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/).

This release contains minor fixes, improvements, and new features.

**Changes and improvements**

* Improvements to [multi-user mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-multiuser/). Fixed an issue where when switching from a pre-login registration to a user registration, Mobile Device Management (MDM) configuration association could be lost.
* Added a new feature to [manage NetBIOS over TCP/IP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#netbios-over-tcpip) functionality on the Windows client. NetBIOS over TCP/IP on the Windows client is now disabled by default and can be enabled in [device profile settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/).
* Fixed an issue causing failure of the [local network exclusion](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion) feature when configured with a timeout of `0`.
* Improvement for the Windows [client certificate posture check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/client-certificate/) to ensure logged results are from checks that run once users log in.
* Improvement for more accurate reporting of device colocation information in the Cloudflare One dashboard.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

## 2026-01-27

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for macOS (version 2026.1.89.1)**   

A new Beta release for the macOS WARP client is now available on the [beta releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/).

This release contains minor fixes and improvements.

**Changes and improvements**

* Fixed an issue causing failure of the [local network exclusion](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion) feature when configured with a timeout of `0`.
* Improvement for more accurate reporting of device colocation information in the Cloudflare One dashboard.

## 2026-01-27

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Configure Cloudflare source IPs (beta)**   

Cloudflare source IPs are the IP addresses used by Cloudflare services (such as Load Balancing, Gateway, and Browser Isolation) when sending traffic to your private networks.

For customers using legacy mode routing, traffic to private networks is sourced from public Cloudflare IPs, which may cause IP conflicts. For customers using Unified Routing mode (beta), traffic to private networks is sourced from dedicated, non-Internet-routable private IPv4 range to ensure:

* Symmetric routing over private network connections
* Proper firewall state preservation
* Private traffic stays on secure paths

Key details:

* **IPv4**: Sourced from `100.64.0.0/12` by default, configurable to any `/12` CIDR
* **IPv6**: Sourced from `2606:4700:cf1:5000::/64` (not configurable)
* **Affected connectors**: GRE, IPsec, CNI, WARP Connector, and WARP Client (Cloudflare Tunnel is not affected)

Configuring Cloudflare source IPs requires Unified Routing (beta) and the `Cloudflare One Networks Write` permission.

For configuration details, refer to [Configure Cloudflare source IPs](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-cloudflare-source-ips/).

## 2026-01-22

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Require Access protection for zones**   

You can now require Cloudflare Access protection for all hostnames in your account. When enabled, traffic to any hostname that does not have a matching Access application is automatically blocked.

This deny-by-default approach prevents accidental exposure of internal resources to the public Internet. If a developer deploys a new application or creates a DNS record without configuring an Access application, the traffic is blocked rather than exposed.

![Require Cloudflare Access protection in the dashboard](https://developers.cloudflare.com/_astro/require-cloudflare-access-protection.BAUmTYOs_ZxNecb.webp) 

#### How it works

* **Blocked by default**: Traffic to all hostnames in the account is blocked unless an Access application exists for that hostname.
* **Explicit access required**: To allow traffic, create an Access application with an Allow or Bypass policy.
* **Hostname exemptions**: You can exempt specific hostnames from this requirement.

To turn on this feature, refer to [Require Access protection](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/require-access-protection/).

## 2026-01-22

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**New granular API token permissions for Cloudflare Access**   

Three new API token permissions are available for Cloudflare Access, giving you finer-grained control when building automations and integrations:

* **Access: Organizations Revoke** — Grants the ability to [revoke user sessions](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#revoke-user-sessions) in a Zero Trust organization. Use this permission when you need a token that can terminate active sessions without broader write access to organization settings.
* **Access: Population Read** — Grants read access to the [SCIM users and groups](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/) synced from an identity provider to Cloudflare Access. Use this permission for tokens that only need to read synced user and group data.
* **Access: Population Write** — Grants write access to the [SCIM users and groups](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/) synced from an identity provider to Cloudflare Access. Use this permission for tokens that need to create or modify synced user and group data.

These permissions are scoped at the account level and can be combined with existing Access permissions.

For a full list of available permissions, refer to [API token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/).

## 2026-01-15

[ Magic Transit ](https://developers.cloudflare.com/magic-transit/)[ Cloudflare Network Firewall ](https://developers.cloudflare.com/cloudflare-network-firewall/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/)[ Network Flow ](https://developers.cloudflare.com/network-flow/) 

  
**Network Services navigation update**   

The Network Services menu structure in Cloudflare's dashboard has been updated to reflect solutions and capabilities instead of product names. This will make it easier for you to find what you need and better reflects how our services work together.

Your existing configurations will remain the same, and you will have access to all of the same features and functionality.

The changes visible in your dashboard may vary based on the products you use. Overall, changes relate to [Magic Transit ↗](https://developers.cloudflare.com/magic-transit/), [Magic WAN ↗](https://developers.cloudflare.com/magic-wan/), and [Magic Firewall ↗](https://developers.cloudflare.com/cloudflare-network-firewall/).

**Summary of changes:**

* A new **Overview** page provides access to the most common tasks across Magic Transit and Magic WAN.
* Product names have been removed from top-level navigation.
* Magic Transit and Magic WAN configuration is now organized under **Routes** and **Connectors**. For example, you will find IP Prefixes under **Routes**, and your GRE/IPsec Tunnels under **Connectors.**
* Magic Firewall policies are now called **Firewall Policies.**
* Magic WAN Connectors and Connector On-Ramps are now referenced in the dashboard as **Appliances** and **Appliance profiles.** They can be found under **Connectors > Appliances.**
* Network analytics, network health, and real-time analytics are now available under **Insights.**
* Packet Captures are found under **Insights > Diagnostics.**
* You can manage your Sites from **Insights > Network health.**
* You can find Magic Network Monitoring under **Insights > Network flow**.

If you would like to provide feedback, complete [this form ↗](https://forms.gle/htWyjRsTjw1usdis5). You can also find these details in the January 7, 2026 email titled **\[FYI\] Upcoming Network Services Dashboard Navigation Update**.

![Networking Navigation](https://developers.cloudflare.com/_astro/networking-overview-and-navigation.CeMgEFaZ_Z20HKl.webp) 

## 2026-01-15

[ Risk Score ](https://developers.cloudflare.com/cloudflare-one/insights/risk-score/) 

  
**Support for CrowdStrike device scores in User Risk Scoring**   

Cloudflare One has expanded its \[User Risk Scoring\] (/cloudflare-one/insights/risk-score/) capabilities by introducing two new behaviors for organizations using the \[CrowdStrike integration\] (/cloudflare-one/integrations/service-providers/crowdstrike/).

Administrators can now automatically escalate the risk score of a user if their device matches specific CrowdStrike Zero Trust Assessment (ZTA) score ranges. This allows for more granular security policies that respond dynamically to the health of the endpoint.

New risk behaviors The following risk scoring behaviors are now available:

* CrowdStrike low device score: Automatically increases a user's risk score when the connected device reports a "Low" score from CrowdStrike.
* CrowdStrike medium device score: Automatically increases a user's risk score when the connected device reports a "Medium" score from CrowdStrike.

These scores are derived from \[CrowdStrike device posture attributes\] (/cloudflare-one/integrations/service-providers/crowdstrike/#device-posture-attributes), including OS signals and sensor configurations.

## 2026-01-15

[ Cloudflare Tunnel ](https://developers.cloudflare.com/tunnel/)[ Cloudflare Tunnel for SASE ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) 

  
**Verify WARP Connector connectivity with a simple ping**   

We have made it easier to validate connectivity when deploying [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) as part of your [software-defined private network](https://developers.cloudflare.com/reference-architecture/architectures/sase/#connecting-networks).

You can now `ping` the WARP Connector host directly on its LAN IP address immediately after installation. This provides a fast, familiar way to confirm that the Connector is online and reachable within your network before testing access to downstream services.

Starting with [version 2025.10.186.0](https://developers.cloudflare.com/changelog/2026-01-13-warp-linux-ga/), WARP Connector responds to traffic addressed to its own LAN IP, giving you immediate visibility into Connector reachability.

Learn more about deploying [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) and building private network connectivity with [Cloudflare One](https://developers.cloudflare.com/cloudflare-one/).

## 2026-01-13

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Windows (version 2025.10.186.0)**   

A new GA release for the Windows WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes, improvements, and new features. New features include the ability to manage WARP client connectivity for all devices in your fleet using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect), and a new WARP client device posture check for [Antivirus](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/antivirus/).

**Changes and improvements**

* Added a new feature to manage WARP client connectivity for all devices using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect). This feature allows administrators to send a global signal from an on-premises HTTPS endpoint that force disconnects or reconnects all WARP clients in an account based on configuration set on the endpoint.
* Fixed an issue that caused occasional audio degradation and increased CPU usage on Windows by optimizing route configurations for large [domain-based split tunnel rules](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#domain-based-split-tunnels).
* The [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) feature has been fixed for devices running WARP client version 2025.4.929.0 and newer. Previously, these devices could experience failures with Local Domain Fallback unless a fallback server was explicitly configured. This configuration is no longer a requirement for the feature to function correctly.
* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) now supports transparent HTTP proxying in addition to CONNECT-based proxying.
* Fixed an issue where sending large messages to the daemon by Inter-Process Communication (IPC) could cause the daemon to fail and result in service interruptions.
* Added support for a new WARP client device posture check for [Antivirus](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/antivirus/). The check confirms the presence of an antivirus program on a Windows device with the option to check if the antivirus is up to date.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

## 2026-01-13

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for macOS (version 2025.10.186.0)**   

A new GA release for the macOS WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes, improvements, and new features, including the ability to manage WARP client connectivity for all devices in your fleet using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect).

**Changes and improvements**

* The [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) feature has been fixed for devices running WARP client version 2025.4.929.0 and newer. Previously, these devices could experience failures with Local Domain Fallback unless a fallback server was explicitly configured. This configuration is no longer a requirement for the feature to function correctly.
* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) now supports transparent HTTP proxying in addition to CONNECT-based proxying.
* Added a new feature to manage WARP client connectivity for all devices using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect). This feature allows administrators to send a global signal from an on-premises HTTPS endpoint that force disconnects or reconnects all WARP clients in an account based on configuration set on the endpoint.

## 2026-01-13

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Linux (version 2025.10.186.0)**   

A new GA release for the Linux WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes, improvements, and new features, including the ability to manage WARP client connectivity for all devices in your fleet using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect).

WARP client version 2025.8.779.0 introduced an updated public key for Linux packages. The public key must be updated if it was installed before September 12, 2025 to ensure the repository remains functional after December 4, 2025\. Instructions to make this update are available at [pkg.cloudflareclient.com](https://pkg.cloudflareclient.com).

**Changes and improvements**

* The [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) feature has been fixed for devices running WARP client version 2025.4.929.0 and newer. Previously, these devices could experience failures with Local Domain Fallback unless a fallback server was explicitly configured. This configuration is no longer a requirement for the feature to function correctly.
* Linux [disk encryption posture check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/disk-encryption/) now supports non-filesystem encryption types like `dm-crypt`.
* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) now supports transparent HTTP proxying in addition to CONNECT-based proxying.
* Fixed an issue where the GUI becomes unresponsive when the **Re-Authenticate in browser** button is clicked.
* Added a new feature to manage WARP client connectivity for all devices using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect). This feature allows administrators to send a global signal from an on-premises HTTPS endpoint that force disconnects or reconnects all WARP clients in an account based on configuration set on the endpoint.

## 2026-01-12

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Enhanced visibility for post-delivery actions**   

The Action Log now provides enriched data for post-delivery actions to improve troubleshooting. In addition to success confirmations, failed actions now display the targeted Destination folder and a specific failure reason within the Activity field.

Note

Error messages will vary depending on whether you are using Google Workspace or Microsoft 365.

![failure-log-example](https://developers.cloudflare.com/_astro/enhanced-visibility-post-delivery-actions.BNiyPtJU_GFx2V.webp) 

This update allows you to see the full lifecycle of a failed action. For instance, if an administrator tries to move an email that has already been deleted or moved manually, the log will now show the multiple retry attempts and the specific destination error.

This applies to all Email Security packages:

* **Enterprise**
* **Enterprise + PhishGuard**

## 2026-01-08

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Cloudflare admin activity logs capture creation of DNS over HTTP (DoH) users**   

Cloudflare [admin activity logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/) now capture each time a [DNS over HTTP (DoH) user](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/dns-over-https/) is created.

These logs can be viewed from the [Cloudflare One dashboard ↗](https://one.dash.cloudflare.com/), pulled via the [Cloudflare API](https://developers.cloudflare.com/api/), and exported through [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/).

## 2025-12-31

[ Cloudflare One Appliance ](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Breakout traffic visibility via NetFlow**   

Magic WAN Connector now exports NetFlow data for breakout traffic to Magic Network Monitoring (MNM), providing visibility into traffic that bypasses Cloudflare's security filtering.

This feature allows you to:

* Monitor breakout traffic statistics in the Cloudflare dashboard.
* View traffic patterns for applications configured to bypass Cloudflare.
* Maintain visibility across all traffic passing through your Magic WAN Connector.

For more information, refer to [NetFlow statistics](https://developers.cloudflare.com/cloudflare-wan/analytics/netflow-analytics/).

## 2025-12-17

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**Shadow IT - domain level SaaS analytics**   

Zero Trust has again upgraded its **Shadow IT analytics**, providing you with unprecedented visibility into your organizations use of SaaS tools. With this dashboard, you can review who is using an application and volumes of data transfer to the application.

With this update, you can review data transfer metrics at the domain level, rather than just the application level, providing more granular insight into your data transfer patterns.

![New Domain Level Metrics](https://developers.cloudflare.com/_astro/shadow-it-domain.DoZnGAtf_Z1mHw4r.webp) 

These metrics can be filtered by all available filters on the dashboard, including user, application, or content category.

Both the analytics and policies are accessible in the Cloudflare [Zero Trust dashboard ↗](https://one.dash.cloudflare.com/), empowering organizations with better visibility and control.

## 2025-12-16

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**New duplicate action for supported Cloudflare One resources**   

You can now duplicate specific Cloudflare One resources with a single click from the dashboard.

Initially supported resources:

* Access Applications
* Access Policies
* Gateway Policies

To try this out, simply click on the overflow menu (⋮) from the resource table and click _Duplicate_. We will continue to add the Duplicate action for resources throughout 2026.

## 2025-12-09

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Windows (version 2025.10.118.1)**   

A new Beta release for the Windows WARP client is now available on the [beta releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/).

This release contains minor fixes and improvements.

**Changes and improvements**

* The [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) feature has been fixed for devices running WARP client version 2025.4.929.0 and newer. Previously, these devices could experience failures with Local Domain Fallback unless a fallback server was explicitly configured. This configuration is no longer a requirement for the feature to function correctly.
* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) now supports transparent HTTP proxying in addition to CONNECT-based proxying.
* Fixed an issue where sending large messages to the WARP daemon by Inter-Process Communication (IPC) could cause WARP to crash and result in service interruptions.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

## 2025-12-09

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for macOS (version 2025.10.118.1)**   

A new Beta release for the macOS WARP client is now available on the [beta releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/).

This release contains minor fixes and improvements.

**Changes and improvements**

* The [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) feature has been fixed for devices running WARP client version 2025.4.929.0 and newer. Previously, these devices could experience failures with Local Domain Fallback unless a fallback server was explicitly configured. This configuration is no longer a requirement for the feature to function correctly.
* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) now supports transparent HTTP proxying in addition to CONNECT-based proxying.

## 2025-12-03

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Reclassifications to Submissions**   

We have updated the terminology “Reclassify” and “Reclassifications” to “Submit” and “Submissions” respectively. This update more accurately reflects the outcome of providing these items to Cloudflare.

Submissions are leveraged to tune future variants of campaigns. To respect data sanctity, providing a submission does not change the original disposition of the emails submitted.

![nav_example](https://developers.cloudflare.com/_astro/reclassification-submission.B6nL5Hw7_Z2qliyJ.webp) 

This applies to all Email Security packages:

* **Advantage**
* **Enterprise**
* **Enterprise + PhishGuard**

## 2025-11-18

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Adjustment to Final Disposition Column**   

#### Adjustment to Final Disposition column

#### The **Final Disposition** column in **Submissions** \> **Team Submissions** tab is changing for non-Phishguard customers.

#### What's Changing

* Column will be called **Status** instead of **Final Disposition**
* Column status values will now be: **Submitted**, **Accepted** or **Rejected**.

#### Next Steps

We will listen carefully to your feedback and continue to find comprehensive ways to communicate updates on your submissions. Your submissions will continue to be addressed at an even greater rate than before, fuelling faster and more accurate email security improvement.

## 2025-11-17

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**New Cloudflare One Navigation and Product Experience**   

The Zero Trust dashboard and navigation is receiving significant and exciting updates. The dashboard is being restructured to better support common tasks and workflows, and various pages have been moved and consolidated.

There is a new guided experience on login detailing the changes, and you can use the Zero Trust dashboard search to find product pages by both their new and old names, as well as your created resources. To replay the guided experience, you can find it in Overview > Get Started.

![Cloudflare One Dash Changes](https://developers.cloudflare.com/_astro/cf1-dash-changes.Uk_Y-2V-_ZUKoJR.webp) 

Notable changes

* Product names have been removed from many top-level navigation items to help bring clarity to what they help you accomplish. For example, you can find Gateway policies under ‘Traffic policies' and CASB findings under ‘Cloud & SaaS findings.'
* You can view all analytics, logs, and real-time monitoring tools from ‘Insights.'
* ‘Networks' better maps the ways that your corporate network interacts with Cloudflare. Some pages like Tunnels, are now a tab rather than a full page as part of these changes. You can find them at Networks > Connectors.
* Settings are now located closer to the tools and resources they impact. For example, this means you'll find your WARP configurations at Team & Resources > Devices.
![New Cloudflare One Navigation](https://developers.cloudflare.com/_astro/new-cf1-navigation.B7-E-9CV_18BSsx.webp) 

No changes to our API endpoint structure or to any backend services have been made as part of this effort.

## 2025-11-14

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Generate Cloudflare Access SSH certificate authority (CA) directly from the Cloudflare dashboard**   

SSH with [Cloudflare Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/) allows you to use short-lived SSH certificates to eliminate SSH key management and reduce security risks associated with lost or stolen keys.

Previously, users had to generate this certificate by using the [Cloudflare API ↗](https://developers.cloudflare.com/api/) directly. With this update, you can now create and manage this certificate in the [Cloudflare One dashboard ↗](https://one.dash.cloudflare.com) from the **Access controls** \> **Service credentials** page.

![Navigate to Access controls and then Service credentials to see where you can generate an SSH CA](https://developers.cloudflare.com/_astro/SSH-CA-generation.DYa9RnX1_ZKuDAo.webp) 

For more details, refer to [Generate a Cloudflare SSH CA](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/#generate-a-cloudflare-ssh-ca).

## 2025-11-14

[ CASB ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/) 

  
**New SaaS Security weekly digests with API CASB**   

You can now stay on top of your SaaS security posture with the new **CASB Weekly Digest** notification. This opt-in email digest is delivered to your inbox every Monday morning and provides a high-level summary of your organization's Cloudflare API CASB findings from the previous week.

This allows security teams and IT administrators to get proactive, at-a-glance visibility into new risks and integration health without having to log in to the dashboard.

To opt in, navigate to **Manage Account** \> **Notifications** in the Cloudflare dashboard to configure the **CASB Weekly Digest** alert type.

#### Key capabilities

* **At-a-glance summary** — Review new high/critical findings, most frequent finding types, and new content exposures from the past 7 days.
* **Integration health** — Instantly see the status of all your connected SaaS integrations (Healthy, Unhealthy, or Paused) to spot API connection issues.
* **Proactive alerting** — The digest is sent automatically to all subscribed users every Monday morning.
* **Easy to configure** — Users can opt in by enabling the notification in the Cloudflare dashboard under **Manage Account** \> **Notifications**.

#### Learn more

* Configure [notification preferences](https://developers.cloudflare.com/notifications/) in Cloudflare.

The CASB Weekly Digest notification is available to all Cloudflare users today.

## 2025-11-12

[ Digital Experience Monitoring ](https://developers.cloudflare.com/cloudflare-one/insights/dex/) 

  
**DEX Logpush jobs**   

[Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) provides visibility into WARP device metrics, connectivity, and network performance across your Cloudflare SASE deployment.

We've released four new WARP and DEX device data sets that can be exported via [Cloudflare Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/). These Logpush data sets can be exported to R2, a cloud bucket, or a SIEM to build a customized logging and analytics experience.

1. [DEX Application Tests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dex%5Fapplication%5Ftests/)
2. [DEX Device State Events](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dex%5Fdevice%5Fstate%5Fevents/)
3. [WARP Config Changes](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/warp%5Fconfig%5Fchanges/)
4. [WARP Toggle Changes](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/warp%5Ftoggle%5Fchanges/)

To create a new DEX or WARP Logpush job, customers can go to the account level of the Cloudflare dashboard > Analytics & Logs > Logpush to get started.

![DEX logpush job creation dashboard](https://developers.cloudflare.com/_astro/dex_logpush_datasets.CtCk36pX_Z1tuyHu.webp) 

## 2025-11-11

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Windows (version 2025.9.558.0)**   

A new GA release for the Windows WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes, improvements, and new features including [Path Maximum Transmission Unit Discovery (PMTUD)](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery). When PMTUD is enabled, the client will dynamically adjust packet sizing to optimize connection performance. There is also a new connection status message in the GUI to inform users that the local network connection may be unstable. This will make it easier to diagnose connectivity issues.

**Changes and improvements**

* Fixed an inconsistency with [Global WARP override](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#disconnect-warp-on-all-devices) settings in multi-user environments when switching between users.
* The GUI now displays the health of the tunnel and DNS connections by showing a connection status message when the network may be unstable. This will make it easier to diagnose connectivity issues.
* Fixed an issue where deleting a registration was erroneously reported as having failed.
* Path Maximum Transmission Unit Discovery (PMTUD) may now be used to discover the effective MTU of the connection. This allows the WARP client to improve connectivity optimized for each network. PMTUD is disabled by default. To enable it, refer to the [PMTUD documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery).
* Improvements for the [OS version](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/os-version/) WARP client check. Windows Updated Build Revision (UBR) numbers can now be checked by the client to ensure devices have required security patches and features installed.
* The WARP client now supports Windows 11 ARM-based machines. For information on known limitations, refer to the [Known limitations page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/known-limitations/#cloudflare-one-client-disconnected-on-windows-arm).

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

## 2025-11-11

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for macOS (version 2025.9.558.0)**   

A new GA release for the macOS WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes, improvements, and new features including [Path Maximum Transmission Unit Discovery (PMTUD)](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery). When PMTUD is enabled, the client will dynamically adjust packet sizing to optimize connection performance. There is also a new connection status message in the GUI to inform users that the local network connection may be unstable. This will make it easier to diagnose connectivity issues.

**Changes and improvements**

* The GUI now displays the health of the tunnel and DNS connections by showing a connection status message when the network may be unstable. This will make it easier to diagnose connectivity issues.
* Fixed an issue where deleting a registration was erroneously reported as having failed.
* Path Maximum Transmission Unit Discovery (PMTUD) may now be used to discover the effective MTU of the connection. This allows the WARP client to improve connectivity optimized for each network. PMTUD is disabled by default. To enable it, refer to the [PMTUD documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery).

**Known issues**

* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

## 2025-11-11

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Linux (version 2025.9.558.0)**   

A new GA release for the Linux WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes, improvements, and new features including [Path Maximum Transmission Unit Discovery (PMTUD)](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery). When PMTUD is enabled, the client will dynamically adjust packet sizing to optimize connection performance. There is also a new connection status message in the GUI to inform users that the local network connection may be unstable. This will make it easier to diagnose connectivity issues.

WARP client version 2025.8.779.0 introduced an updated public key for Linux packages. The public key must be updated if it was installed before September 12, 2025 to ensure the repository remains functional after December 4, 2025\. Instructions to make this update are available at [pkg.cloudflareclient.com](https://pkg.cloudflareclient.com/).

**Changes and improvements**

* The GUI now displays the health of the tunnel and DNS connections by showing a connection status message when the network may be unstable. This will make it easier to diagnose connectivity issues.
* Fixed an issue where deleting a registration was erroneously reported as having failed.
* Path Maximum Transmission Unit Discovery (PMTUD) may now be used to discover the effective MTU of the connection. This allows the WARP client to improve connectivity optimized for each network. PMTUD is disabled by default. To enable it, refer to the [PMTUD documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery).

## 2025-11-11

[ Cloudflare Tunnel ](https://developers.cloudflare.com/tunnel/)[ Cloudflare Tunnel for SASE ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) 

  
**cloudflared proxy-dns command will be removed starting February 2, 2026**   

Starting February 2, 2026, the `cloudflared proxy-dns` command will be removed from all new `cloudflared` [releases](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/).

This change is being made to enhance security and address a potential vulnerability in an underlying DNS library. This vulnerability is specific to the `proxy-dns` command and does not affect any other `cloudflared` features, such as the core [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) service.

The `proxy-dns` command, which runs a client-side [DNS-over-HTTPS (DoH)](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/) proxy, has been an officially undocumented feature for several years. This functionality is fully and securely supported by our actively developed products.

Versions of `cloudflared` released before this date will not be affected and will continue to operate. However, note that our [official support policy](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/#deprecated-releases) for any `cloudflared` release is one year from its release date.

#### Migration paths

We strongly advise users of this undocumented feature to migrate to one of the following officially supported solutions before February 2, 2026, to continue benefiting from secure [DNS-over-HTTPS](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/).

#### End-user devices

The preferred method for enabling DNS-over-HTTPS on user devices is the [Cloudflare WARP client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/). The WARP client automatically secures and proxies all DNS traffic from your device, integrating it with your organization's [Zero Trust policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) and [posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/).

#### Servers, routers, and IoT devices

For scenarios where installing a client on every device is not possible (such as servers, routers, or IoT devices), we recommend using the [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/).

Instead of running `cloudflared proxy-dns` on a machine, you can install the WARP Connector on a single Linux host within your private network. This connector will act as a gateway, securely routing all DNS and network traffic from your [entire subnet](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/) to Cloudflare for [filtering and logging](https://developers.cloudflare.com/cloudflare-one/traffic-policies/).

## 2025-11-06

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Automatic Return Routing (Beta)**   

Magic WAN now supports Automatic Return Routing (ARR), allowing customers to configure Magic on-ramps (IPsec/GRE/CNI) to learn the return path for traffic flows without requiring static routes.

Key benefits:

* **Route-less mode**: Static or dynamic routes are optional when using ARR.
* **Overlapping IP space support**: Traffic originating from customer sites can use overlapping private IP ranges.
* **Symmetric routing**: Return traffic is guaranteed to use the same connection as the original on-ramp.

This feature is currently in beta and requires the new Unified Routing mode (beta).

For configuration details, refer to [Configure Automatic Return Routing](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-routes/#configure-automatic-return-routing-beta).

## 2025-11-06

[ Cloudflare One Appliance ](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Designate WAN link for breakout traffic**   

Magic WAN Connector now allows you to designate a specific WAN port for breakout traffic, giving you deterministic control over the egress path for latency-sensitive applications.

With this feature, you can:

* Pin breakout traffic for specific applications to a preferred WAN port.
* Ensure critical traffic (such as Zoom or Teams) always uses your fastest or most reliable connection.
* Benefit from automatic failover to standard WAN port priority if the preferred port goes down.

This is useful for organizations with multiple ISP uplinks who need predictable egress behavior for performance-sensitive traffic.

For configuration details, refer to [Designate WAN ports for breakout apps](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/application-based-policies/breakout-traffic/#designate-wan-ports-for-breakout-apps).

## 2025-11-06

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Applications to be remapped to the new categories**   

We have previously added new application categories to better reflect their content and improve HTTP traffic management: refer to [Changelog](https://developers.cloudflare.com/cloudflare-one/changelog/gateway/#2025-10-28). While the new categories are live now, we want to ensure you have ample time to review and adjust any existing rules you have configured against old categories. The remapping of existing applications into these new categories will be completed by January 30, 2026\. This timeline allows you a dedicated period to:

* Review the new category structure.
* Identify any policies you have that target the older categories.
* Adjust your rules to reference the new, more precise categories before the old mappings change. Once the applications have been fully remapped by January 30, 2026, you might observe some changes in the traffic being mitigated or allowed by your existing policies. We encourage you to use the intervening time to prepare for a smooth transition.

**Applications being remappedd**

| Application Name                | Existing Category | New Category                 |
| ------------------------------- | ----------------- | ---------------------------- |
| Google Photos                   | File Sharing      | Photography & Graphic Design |
| Flickr                          | File Sharing      | Photography & Graphic Design |
| ADP                             | Human Resources   | Business                     |
| Greenhouse                      | Human Resources   | Business                     |
| myCigna                         | Human Resources   | Health & Fitness             |
| UnitedHealthcare                | Human Resources   | Health & Fitness             |
| ZipRecruiter                    | Human Resources   | Business                     |
| Amazon Business                 | Human Resources   | Business                     |
| Jobcenter                       | Human Resources   | Business                     |
| Jobsuche                        | Human Resources   | Business                     |
| Zenjob                          | Human Resources   | Business                     |
| DocuSign                        | Legal             | Business                     |
| Postident                       | Legal             | Business                     |
| Adobe Creative Cloud            | Productivity      | Photography & Graphic Design |
| Airtable                        | Productivity      | Development                  |
| Autodesk Fusion360              | Productivity      | IT Management                |
| Coursera                        | Productivity      | Education                    |
| Microsoft Power BI              | Productivity      | Business                     |
| Tableau                         | Productivity      | Business                     |
| Duolingo                        | Productivity      | Education                    |
| Adobe Reader                    | Productivity      | Business                     |
| AnpiReport                      | Productivity      | Travel                       |
| ビズリーチ                           | Productivity      | Business                     |
| doda (デューダ)                     | Productivity      | Business                     |
| 求人ボックス                          | Productivity      | Business                     |
| マイナビ2026                        | Productivity      | Business                     |
| Power Apps                      | Productivity      | Business                     |
| RECRUIT AGENT                   | Productivity      | Business                     |
| シフトボード                          | Productivity      | Business                     |
| スタンバイ                           | Productivity      | Business                     |
| Doctolib                        | Productivity      | Health & Fitness             |
| Miro                            | Productivity      | Photography & Graphic Design |
| MyFitnessPal                    | Productivity      | Health & Fitness             |
| Sentry Mobile                   | Productivity      | Travel                       |
| Slido                           | Productivity      | Photography & Graphic Design |
| Arista Networks                 | Productivity      | IT Management                |
| Atlassian                       | Productivity      | Business                     |
| CoderPad                        | Productivity      | Business                     |
| eAgreements                     | Productivity      | Business                     |
| Vmware                          | Productivity      | IT Management                |
| Vmware Vcenter                  | Productivity      | IT Management                |
| AWS Skill Builder               | Productivity      | Education                    |
| Microsoft Office 365 (GCC)      | Productivity      | Business                     |
| Microsoft Exchange Online (GCC) | Productivity      | Business                     |
| Canva                           | Sales & Marketing | Photography & Graphic Design |
| Instacart                       | Shopping          | Food & Drink                 |
| Wawa                            | Shopping          | Food & Drink                 |
| McDonald's                      | Shopping          | Food & Drink                 |
| Vrbo                            | Shopping          | Travel                       |
| American Airlines               | Shopping          | Travel                       |
| Booking.com                     | Shopping          | Travel                       |
| Ticketmaster                    | Shopping          | Entertainment & Events       |
| Airbnb                          | Shopping          | Travel                       |
| DoorDash                        | Shopping          | Food & Drink                 |
| Expedia                         | Shopping          | Travel                       |
| EasyPark                        | Shopping          | Travel                       |
| UEFA Tickets                    | Shopping          | Entertainment & Events       |
| DHL Express                     | Shopping          | Business                     |
| UPS                             | Shopping          | Business                     |

For more information on creating HTTP policies, refer to [Applications and app types](https://developers.cloudflare.com/cloudflare-one/traffic-policies/application-app-types/).

## 2025-10-28

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Access private hostname applications support all ports/protocols**   

[Cloudflare Access for private hostname applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/) can now secure traffic on all ports and protocols.

Previously, applying Zero Trust policies to private applications required the application to use HTTPS on port `443` and support Server Name Indicator (SNI).

This update removes that limitation. As long as the application is reachable via a Cloudflare off-ramp, you can now enforce your critical security controls — like single sign-on (SSO), MFA, device posture, and variable session lengths — to any private application. This allows you to extend Zero Trust security to services like SSH, RDP, internal databases, and other non-HTTPS applications.

![Example private application on non-443 port](https://developers.cloudflare.com/_astro/internal_private_app_any_port.DNXnEy0u_2rybRJ.webp) 

For example, you can now create a self-hosted application in Access for `ssh.testapp.local` running on port `22`. You can then build a policy that only allows engineers in your organization to connect after they pass an SSO/MFA check and are using a corporate device.

This feature is generally available across all plans.

## 2025-10-28

[ CASB ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/) 

  
**CASB introduces new granular roles**   

Cloudflare CASB (Cloud Access Security Broker) now supports two new granular roles to provide more precise access control for your security teams:

* **Cloudflare CASB Read:** Provides read-only access to view CASB findings and dashboards. This role is ideal for security analysts, compliance auditors, or team members who need visibility without modification rights.
* **Cloudflare CASB:** Provides full administrative access to configure and manage all aspects of the CASB product.

These new roles help you better enforce the principle of least privilege. You can now grant specific members access to CASB security findings without assigning them broader permissions, such as the **Super Administrator** or **Administrator** roles.

To enable [Data Loss Prevention (DLP)](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/), scans in CASB, account members will need the **Cloudflare Zero Trust** role.

You can find these new roles when inviting members or creating API tokens in the Cloudflare dashboard under **Manage Account** \> **Members**.

To learn more about managing roles and permissions, refer to the [Manage account members and roles documentation](https://developers.cloudflare.com/fundamentals/manage-members/roles/).

## 2025-10-28

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**New Application Categories added for HTTP Traffic Management**   

To give you precision and flexibility while creating policies to block unwanted traffic, we are introducing new, more granular application categories in the Gateway product.

We have added the following categories to provide more precise organization and allow for finer-grained policy creation, designed around how users interact with different types of applications:

* Business
* Education
* Entertainment & Events
* Food & Drink
* Health & Fitness
* Lifestyle
* Navigation
* Photography & Graphic Design
* Travel

The new categories are live now, but we are providing a transition period for existing applications to be fully remapped to these new categories.

The full remapping will be completed by January 30, 2026.

We encourage you to use this time to:

* Review the new category structure.
* Identify and adjust any existing HTTP policies that reference older categories to ensure a smooth transition.

For more information on creating HTTP policies, refer to [Applications and app types](https://developers.cloudflare.com/cloudflare-one/traffic-policies/application-app-types/).

## 2025-10-20

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Schedule DNS policies from the UI**   

Admins can now create [scheduled DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/timed-policies/) directly from the Zero Trust dashboard, without using the API. You can configure policies to be active during specific, recurring times, such as blocking social media during business hours or gaming sites on school nights.

* **Preset Schedules**: Use built-in templates for common scenarios like Business Hours, School Days, Weekends, and more.
* **Custom Schedules**: Define your own schedule with specific days and up to three non-overlapping time ranges per day.
* **Timezone Control**: Choose to enforce a schedule in a specific timezone (for example, US Eastern) or based on the local time of each user.
* **Combined with Duration**: Policies can have both a schedule and a duration. If both are set, the duration's expiration takes precedence.

You can see the flow in the demo GIF:

![Schedule DNS policies demo](https://developers.cloudflare.com/_astro/gateway-dns-scheduled-policies-ui.Cf4l1OTE_Z9szVM.webp) 

This update makes time-based DNS policies accessible to all Gateway customers, removing the technical barrier of the API.

## 2025-10-17

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**On-Demand Security Report**   

You can now generate on-demand security reports directly from the Cloudflare dashboard. This new feature provides a comprehensive overview of your email security posture, making it easier than ever to demonstrate the value of Cloudflare’s Email security to executives and other decision makers.

These reports offer several key benefits:

* **Executive Summary:** Quickly view the performance of Email security with a high-level executive summary.
* **Actionable Insights:** Dive deep into trend data, breakdowns of threat types, and analysis of top targets to identify and address vulnerabilities.
* **Configuration Transparency:** Gain a clear view of your policy, submission, and domain configurations to ensure optimal setup.
* **Account Takeover Risks:** Get a snapshot of your M365 risky users (requires a Microsoft Entra ID P2 license and [M365 SaaS integration ↗](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/)).
![Report](https://developers.cloudflare.com/_astro/report.CbkPa8Jt_Z1xMpIx.webp) 

This feature is available across the following Email security packages:

* **Advantage**
* **Enterprise**
* **Enterprise + PhishGuard**

## 2025-10-16

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Windows (version 2025.9.173.1)**   

A new Beta release for the Windows WARP client is now available on the [beta releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/).

This release contains minor fixes, improvements, and new features including Path Maximum Transmission Unit Discovery (PMTUD). With PMTUD enabled, the client will dynamically adjust packet sizing to optimize connection performance. There is also a new connection status message in the GUI to inform users that the local network connection may be unstable. This will make it easier to debug connectivity issues.

**Changes and improvements**

* Improvements for [Windows multi-user](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-multiuser/) to maintain the [Global WARP override](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#disconnect-warp-on-all-devices) state when switching between users.
* The GUI now displays the health of the tunnel and DNS connections by showing a connection status message when the network may be unstable. This will make it easier to debug connectivity issues.
* Deleting registrations no longer returns an error when succeeding.
* Path Maximum Transmission Unit Discovery (PMTUD) is now used to discover the effective MTU of the connection. This allows the client to improve connection performance optimized for the current network.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

## 2025-10-16

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for macOS (version 2025.9.173.1)**   

A new Beta release for the macOS WARP client is now available on the [beta releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/).

This release contains minor fixes, improvements, and new features including Path Maximum Transmission Unit Discovery (PMTUD). With PMTUD enabled, the client will dynamically adjust packet sizing to optimize connection performance. There is also a new connection status message in the GUI to inform users that the local network connection may be unstable. This will make it easier to debug connectivity issues.

**Changes and improvements**

* The GUI now displays the health of the tunnel and DNS connections by showing a connection status message when the network may be unstable. This will make it easier to debug connectivity issues.
* Deleting registrations no longer returns an error when succeeding.
* Path Maximum Transmission Unit Discovery (PMTUD) is now used to discover the effective MTU of the connection. This allows the client to improve connection performance optimized for the current network.

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

## 2025-10-10

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**New domain categories added**   

We have added three new domain categories under the Technology parent category, to better reflect online content and improve DNS filtering.

**New categories added**

| Parent ID | Parent Name | Category ID | Category Name       |
| --------- | ----------- | ----------- | ------------------- |
| 26        | Technology  | 194         | Keep Awake Software |
| 26        | Technology  | 192         | Remote Access       |
| 26        | Technology  | 193         | Shareware/Freeware  |

Refer to [Gateway domain categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/) to learn more.

## 2025-10-07

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Linux (version 2025.8.779.0)**   

A new GA release for the Linux WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains significant fixes and improvements including an updated public key for Linux packages. The public key must be updated if it was installed before September 12, 2025 to ensure the repository remains functional after December 4, 2025\. Instructions to make this update are available at [pkg.cloudflareclient.com](https://pkg.cloudflareclient.com/).

**Changes and improvements**

* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) has been enhanced for even faster resolution. Proxy mode now supports SOCKS4, SOCK5, and HTTP CONNECT over an L4 tunnel with custom congestion control optimizations instead of the previous L3 tunnel to Cloudflare's network. This has more than doubled Proxy mode throughput in lab speed testing, by an order of magnitude in some cases.
* The MASQUE protocol is now the only protocol that can use [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode). If you previously configured a device profile to use Proxy mode with Wireguard, you will need to select a new WARP mode or switch to the MASQUE protocol. Otherwise, all devices matching the profile will lose connectivity.

**Known issues**

* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

## 2025-10-07

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Windows (version 2025.8.779.0)**   

A new GA release for the Windows WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains significant fixes and improvements.

**Changes and improvements**

* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) has been enhanced for even faster resolution. Proxy mode now supports SOCKS4, SOCK5, and HTTP CONNECT over an L4 tunnel with custom congestion control optimizations instead of the previous L3 tunnel to Cloudflare's network. This has more than doubled Proxy mode throughput in lab speed testing, by an order of magnitude in some cases.
* The MASQUE protocol is now the only protocol that can use [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode). If you previously configured a device profile to use Proxy mode with Wireguard, you will need to select a new WARP mode or switch to the MASQUE protocol. Otherwise, all devices matching the profile will lose connectivity.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

## 2025-10-07

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for macOS (version 2025.8.779.0)**   

A new GA release for the macOS WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains significant fixes and improvements.

**Changes and improvements**

* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) has been enhanced for even faster resolution. Proxy mode now supports SOCKS4, SOCK5, and HTTP CONNECT over an L4 tunnel with custom congestion control optimizations instead of the previous L3 tunnel to Cloudflare's network. This has more than doubled Proxy mode throughput in lab speed testing, by an order of magnitude in some cases.
* The MASQUE protocol is now the only protocol that can use [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode). If you previously configured a device profile to use Proxy mode with Wireguard, you will need to select a new WARP mode or switch to the MASQUE protocol. Otherwise, all devices matching the profile will lose connectivity.

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

## 2025-10-02

[ Cloudflare Fundamentals ](https://developers.cloudflare.com/fundamentals/)[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Fine-grained Permissioning for Access for Apps, IdPs, & Targets now in Public Beta**   

Fine-grained permissions for **Access Applications, Identity Providers (IdPs), and Targets** is now available in Public Beta. This expands our RBAC model beyond account & zone-scoped roles, enabling administrators to grant permissions scoped to individual resources.

#### What's New

* **[Access Applications ↗](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/)**: Grant admin permissions to specific Access Applications.
* **[Identity Providers ↗](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/)**: Grant admin permissions to individual Identity Providers.
* **[Targets ↗](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/#1-add-a-target)**: Grant admin rights to specific Targets
![Updated Permissions Policy UX](https://developers.cloudflare.com/_astro/2025-10-01-fine-grained-permissioning-ux.BWVmQsVF_Z1p4MJh.webp) 

Note 

During the public beta, members must also be assigned an account-scoped, read only role to view resources in the dashboard. This restriction will be lifted in a future release.

* **Account Read Only** plus a fine-grained permission for a specific App, IdP, or Target
* **Cloudflare Zero Trust Read Only** plus fine-grained permission for a specific App, IdP, or Target

For more info:

* [Get started with Cloudflare Permissioning](https://developers.cloudflare.com/fundamentals/manage-members/roles/)
* [Manage Member Permissioning via the UI & API](https://developers.cloudflare.com/fundamentals/manage-members/manage)

## 2025-10-01

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**Expanded File Type Controls for Executables and Disk Images**   

You can now enhance your security posture by blocking additional application installer and disk image file types with Cloudflare Gateway. Preventing the download of unauthorized software packages is a critical step in securing endpoints from malware and unwanted applications.

We have expanded Gateway's file type controls to include:

* Apple Disk Image (dmg)
* Microsoft Software Installer (msix, appx)
* Apple Software Package (pkg)

You can find these new options within the [_Upload File Types_ and _Download File Types_ selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#download-and-upload-file-types) when creating or editing an HTTP policy. The file types are categorized as follows:

* **System**: _Apple Disk Image (dmg)_
* **Executable**: _Microsoft Software Installer (msix)_, _Microsoft Software Installer (appx)_, _Apple Software Package (pkg)_

To ensure these file types are blocked effectively, please note the following behaviors:

* DMG: Due to their file structure, DMG files are blocked at the very end of the transfer. A user's download may appear to progress but will fail at the last moment, preventing the browser from saving the file.
* MSIX: To comprehensively block Microsoft Software Installers, you should also include the file type _Unscannable_. MSIX files larger than 100 MB are identified as Unscannable ZIP files during inspection.

To get started, go to your HTTP policies in Zero Trust. For a full list of file types, refer to [supported file types](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#supported-file-types).

## 2025-09-30

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Windows (version 2025.7.176.0)**   

A new GA release for the Windows WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes and improvements.

**Changes and improvements**

* MASQUE is now the default [tunnel protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol) for all new WARP device profiles.
* Improvement to limit idle connections in [Gateway with DoH mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#dns-only-mode) to avoid unnecessary resource usage that can lead to DoH requests not resolving.
* Improvement to maintain TCP connections to reduce interruptions in long-lived connections such as RDP or SSH.
* Improvements to maintain [Global WARP override](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#disconnect-warp-on-all-devices) settings when [switching between organizations](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/switch-organizations/#switch-organizations-in-the-cloudflare-one-client).
* Improvements to maintain client connectivity during network changes.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

## 2025-09-30

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for macOS (version 2025.7.176.0)**   

A new GA release for the macOS WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes and improvements.

**Changes and improvements**

* Fixed a bug preventing the `warp-diag captive-portal` command from running successfully due to the client not parsing SSID on macOS.
* Improvements to maintain [Global WARP override](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#disconnect-warp-on-all-devices) settings when [switching between organizations](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/switch-organizations/#switch-organizations-in-the-cloudflare-one-client).
* MASQUE is now the default [tunnel protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol) for all new WARP device profiles.
* Improvement to limit idle connections in [Gateway with DoH mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#dns-only-mode) to avoid unnecessary resource usage that can lead to DoH requests not resolving.
* Improvements to maintain client connectivity during network changes.
* The WARP client now supports macOS Tahoe (version 26.0).

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

## 2025-09-30

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Linux (version 2025.7.176.0)**   

A new GA release for the Linux WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes and improvements including an updated public key for Linux packages. The public key must be updated if it was installed before September 12, 2025 to ensure the repository remains functional after December 4, 2025\. Instructions to make this update are available at [pkg.cloudflareclient.com](https://pkg.cloudflareclient.com/).

**Changes and improvements**

* MASQUE is now the default [tunnel protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol) for all new WARP device profiles.
* Improvement to limit idle connections in [Gateway with DoH mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#dns-only-mode) to avoid unnecessary resource usage that can lead to DoH requests not resolving.
* Improvements to maintain [Global WARP override](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#disconnect-warp-on-all-devices) settings when [switching between organizations](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/switch-organizations/#switch-organizations-in-the-cloudflare-one-client).
* Improvements to maintain client connectivity during network changes.

**Known issues**

* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

## 2025-09-30

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Application granular controls for operations in SaaS applications**   

Gateway users can now apply granular controls to their file sharing and AI chat applications through [HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies).

The new feature offers two methods of controlling SaaS applications:

* **Application Controls** are curated groupings of Operations which provide an easy way for users to achieve a specific outcome. Application Controls may include _Upload_, _Download_, _Prompt_, _Voice_, and _Share_ depending on the application.
* **Operations** are controls aligned to the most granular action a user can take. This provides a fine-grained approach to enforcing policy and generally aligns to the SaaS providers API specifications in naming and function.

Get started using [Application Granular Controls](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/granular-controls) and refer to the list of [supported applications](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/granular-controls/#compatible-applications).

## 2025-09-25

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**Refine DLP Scans with New Body Phase Selector**   

You can now more precisely control your HTTP DLP policies by specifying whether to scan the request or response body, helping to reduce false positives and target specific data flows.

In the Gateway HTTP policy builder, you will find a new selector called _Body Phase_. This allows you to define the direction of traffic the DLP engine will inspect:

* _Request Body_: Scans data sent from a user's machine to an upstream service. This is ideal for monitoring data uploads, form submissions, or other user-initiated data exfiltration attempts.
* _Response Body_: Scans data sent to a user's machine from an upstream service. Use this to inspect file downloads and website content for sensitive data.

For example, consider a policy that blocks Social Security Numbers (SSNs). Previously, this policy might trigger when a user visits a website that contains example SSNs in its content (the response body). Now, by setting the **Body Phase** to _Request Body_, the policy will only trigger if the user attempts to upload or submit an SSN, ignoring the content of the web page itself.

All policies without this selector will continue to scan both request and response bodies to ensure continued protection.

For more information, refer to [Gateway HTTP policy selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#body-phase).

## 2025-09-23

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Invalid Submissions Feedback**   

Email security relies on your submissions to continuously improve our detection models. However, we often receive submissions in formats that cannot be ingested, such as incomplete EMLs, screenshots, or text files.

To ensure all customer feedback is actionable, we have launched two new features to manage invalid submissions sent to our team and user [submission aliases](https://developers.cloudflare.com/cloudflare-one/email-security/settings/phish-submissions/submission-addresses/):

* **Email Notifications:** We now automatically notify users by email when they provide an invalid submission, educating them on the correct format. To disable notifications, go to **[Settings ↗](https://one.dash.cloudflare.com/?to=/:account/email-security/settings)** \> **Invalid submission emails** and turn the feature off.
![EmailSec-Invalid-Submissions-Toggle](https://developers.cloudflare.com/_astro/EmailSec-Invalid-Submissions-Toggle.DXjbR6aX_ZsxWGB.webp) 
* **Invalid Submission dashboard:** You can quickly identify which users need education to provide valid submissions so Cloudflare can provide continuous protection.
![EmailSec-Invalid-Submissions-Dashboard](https://developers.cloudflare.com/_astro/EmailSec-Invalid-Submissions-Dashboard.zuf1on2n_2gjnGS.webp) 

Learn more about this feature on [invalid submissions](https://developers.cloudflare.com/cloudflare-one/email-security/submissions/invalid-submissions/).

This feature is available across these Email security packages:

* **Advantage**
* **Enterprise**
* **Enterprise + PhishGuard**

## 2025-09-22

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Access Remote Desktop Protocol (RDP) destinations securely from your browser — now generally available!**   

[Browser-based RDP](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-browser/) with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) is now generally available for all Cloudflare customers. It enables secure, remote Windows server access without VPNs or RDP clients.

Since we announced our [open beta](https://developers.cloudflare.com/changelog/access/#2025-06-30), we've made a few improvements:

* Support for targets with IPv6.
* Support for [Magic WAN](https://developers.cloudflare.com/cloudflare-wan/) and [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) as on-ramps.
* More robust error messaging on the login page to help you if you encounter an issue.
* Worldwide keyboard support. Whether your day-to-day is in Portuguese, Chinese, or something in between, your browser-based RDP experience will look and feel exactly like you are using a desktop RDP client.
* Cleaned up some other miscellaneous issues, including but not limited to enhanced support for Entra ID accounts and support for usernames with spaces, quotes, and special characters.

As a refresher, here are some benefits browser-based RDP provides:

* **Control how users authenticate to internal RDP resources** with single sign-on (SSO), multi-factor authentication (MFA), and granular access policies.
* **Record who is accessing which servers and when** to support regulatory compliance requirements and to gain greater visibility in the event of a security event.
* **Eliminate the need to install and manage software on user devices**. You will only need a web browser.
* **Reduce your attack surface** by keeping your RDP servers off the public Internet and protecting them from common threats like credential stuffing or brute-force attacks.
![Example of a browser-based RDP Access application](https://developers.cloudflare.com/_astro/browser-based-rdp-access-app.BNXce1JL_1TDoUX.webp) 

To get started, refer to [Connect to RDP in a browser](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-browser/).

## 2025-09-18

[ Cloudflare Tunnel ](https://developers.cloudflare.com/tunnel/)[ Cloudflare Tunnel for SASE ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) 

  
**Connect and secure any private or public app by hostname, not IP — with hostname routing for Cloudflare Tunnel**   

You can now route private traffic to [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) based on a hostname or domain, moving beyond the limitations of IP-based routing. This new capability is **free for all Cloudflare One customers**.

Previously, Tunnel routes could only be defined by IP address or [CIDR range](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/). This created a challenge for modern applications with dynamic or ephemeral IP addresses, often forcing administrators to maintain complex and brittle IP lists.

![Hostname-based routing in Cloudflare Tunnel](https://developers.cloudflare.com/_astro/tunnel-hostname-routing.DSi8MP_7_Z1E6Ym4.webp) 

**What’s new:**

* **Hostname & Domain Routing**: Create routes for individual hostnames (e.g., `payroll.acme.local`) or entire domains (e.g., `*.acme.local`) and direct their traffic to a specific Tunnel.
* **Simplified Zero Trust Policies**: Build resilient policies in Cloudflare Access and Gateway using stable hostnames, making it dramatically easier to apply per-resource authorization for your private applications.
* **Precise Egress Control**: Route traffic for public hostnames (e.g., `bank.example.com`) through a specific Tunnel to enforce a dedicated source IP, solving the IP allowlist problem for third-party services.
* **No More IP Lists**: This feature makes the workaround of maintaining dynamic IP Lists for Tunnel connections obsolete.

Get started in the Tunnels section of the Zero Trust dashboard with your first [private hostname](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/) or [public hostname](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/egress-cloudflared/) route.

Learn more in our [blog post ↗](https://blog.cloudflare.com/tunnel-hostname-routing/).

## 2025-09-16

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**New AI-Enabled Search for Zero Trust Dashboard**   

Zero Trust Dashboard has a brand new, AI-powered search functionality. You can search your account by resources (applications, policies, device profiles, settings, etc.), pages, products, and more.

![Example search results in the Zero Trust dashboard](https://developers.cloudflare.com/_astro/searchexample.Di8yS8ju_1GmPhw.webp) 

**Ask Cloudy** — You can also ask Cloudy, our AI agent, questions about Cloudflare Zero Trust. Cloudy is trained on our developer documentation and implementation guides, so it can tell you how to configure functionality, best practices, and can make recommendations.

Cloudy can then stay open with you as you move between pages to build configuration or answer more questions.

**Find Recents** — Recent searches and Cloudy questions also have a new tab under Zero Trust Overview.

## 2025-09-11

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Regional Email Processing for Germany, India, or Australia**   

We’re excited to announce that Email security customers can now choose their preferred mail processing location directly from the UI when onboarding a domain. This feature is available for the following onboarding methods: **MX**, **BCC**, and **Journaling**.

#### What’s new

Customers can now select where their email is processed. The following regions are supported:

* **Germany**
* **India**
* **Australia**

Global processing remains the default option, providing flexibility to meet both compliance requirements or operational preferences.

#### How to use it

When onboarding a domain with MX, BCC, or Journaling:

1. Select the desired processing location (Germany, India, or Australia).
2. The UI will display updated processing addresses specific to that region.
3. For MX onboarding, if your domain is managed by Cloudflare, you can automatically update MX records directly from the UI.

#### Availability

This feature is available across these Email security packages:

* **Advantage**
* **Enterprise**
* **Enterprise + PhishGuard**

#### What’s next

We’re expanding the list of processing locations to match our [Data Localization Suite (DLS)](https://developers.cloudflare.com/data-localization/) footprint, giving customers the broadest set of regional options in the market without the complexity of self-hosting.

## 2025-09-11

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/)[ Cloudflare Tunnel for SASE ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) 

  
**DNS filtering for private network onramps**   

[Magic WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-gateway/#dns-filtering) and [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/#dns-filtering) users can now securely route their DNS traffic to the Gateway resolver without exposing traffic to the public Internet.

Routing DNS traffic to the Gateway resolver allows DNS resolution and filtering for traffic coming from private networks while preserving source internal IP visibility. This ensures Magic WAN users have full integration with our Cloudflare One features, including [Internal DNS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/#internal-dns) and [hostname-based policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#selector-prerequisites).

To configure DNS filtering, change your Magic WAN or WARP Connector DNS settings to use Cloudflare's shared resolver IPs, `172.64.36.1` and `172.64.36.2`. Once you configure DNS resolution and filtering, you can use _Source Internal IP_ as a traffic selector in your [resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) for routing private DNS traffic to your [Internal DNS](https://developers.cloudflare.com/dns/internal-dns/).

## 2025-09-10

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Windows (version 2025.7.106.1)**   

A new Beta release for the Windows WARP client is now available on the [beta releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/).

This release contains minor fixes and improvements including enhancements to [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) for even faster resolution. The MASQUE protocol is now the only protocol that can use Proxy mode. If you previously configured a device profile to use Proxy mode with Wireguard, you will need to select a new [WARP mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) or all devices matching the profile will lose connectivity.

**Changes and improvements**

* Enhancements to [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) for even faster resolution. The MASQUE protocol is now the only protocol that can use Proxy mode. If you previously configured a device profile to use Proxy mode with Wireguard, you will need to select a new [WARP mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) or all devices matching the profile will lose connectivity.
* Improvement to keep TCP connections up the first time WARP connects on devices so that remote desktop sessions (such as RDP or SSH) continue to work.
* Improvements to maintain Global WARP Override settings when switching between organization configurations.
* The [MASQUE protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol) is now the default protocol for all new WARP device profiles.
* Improvement to limit idle connections in DoH mode to avoid unnecessary resource usage that can lead to DoH requests not resolving.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about Win32/ClickFix.ABA being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

## 2025-09-10

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for macOS (version 2025.7.106.1)**   

A new Beta release for the macOS WARP client is now available on the [beta releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/).

This release contains minor fixes and improvements including enhancements to [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) for even faster resolution. The MASQUE protocol is now the only protocol that can use Proxy mode. If you previously configured a device profile to use Proxy mode with Wireguard, you will need to select a new [WARP mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) or all devices matching the profile will lose connectivity.

**Changes and improvements**

* Enhancements to [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) for even faster resolution. The MASQUE protocol is now the only protocol that can use Proxy mode. If you previously configured a device profile to use Proxy mode with Wireguard, you will need to select a new [WARP mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) or all devices matching the profile will lose connectivity.
* Fixed a bug preventing the `warp-diag captive-portal` command from running successfully due to the client not parsing SSID on macOS.
* Improvements to maintain Global WARP Override settings when switching between organization configurations.
* The [MASQUE protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol) is now the default protocol for all new WARP device profiles.
* Improvement to limit idle connections in DoH mode to avoid unnecessary resource usage that can lead to DoH requests not resolving.

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

## 2025-09-08

[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Custom IKE ID for IPsec Tunnels**   

Now, Magic WAN customers can configure a custom IKE ID for their IPsec tunnels. Customers that are using Magic WAN and a VeloCloud SD-WAN device together can utilize this new feature to create a high availability configuration.

This feature is available via API only. Customers can read the Magic WAN documentation to learn more about the [Custom IKE ID feature and the API call to configure it](https://developers.cloudflare.com/cloudflare-wan/configuration/common-settings/custom-ike-id-ipsec/).

## 2025-09-05

[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Bidirectional tunnel health checks are compatible with all Magic on-ramps**   

All bidirectional tunnel health check return packets are accepted by any Magic on-ramp.

Previously, when a Magic tunnel had a bidirectional health check configured, the bidirectional health check would pass when the return packets came back to Cloudflare over the same tunnel that was traversed by the forward packets.

There are SD-WAN devices, like VeloCloud, that do not offer controls to steer traffic over one tunnel versus another in a high availability tunnel configuration.

Now, when a Magic tunnel has a bidirectional health check configured, the bidirectional health check will pass when the return packet traverses over any tunnel in a high availability configuration.

## 2025-09-02

[ Cloudflare Tunnel ](https://developers.cloudflare.com/tunnel/)[ Cloudflare Tunnel for SASE ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) 

  
**Cloudflare Tunnel and Networks API will no longer return deleted resources by default starting December 1, 2025**   

Starting **December 1, 2025**, list endpoints for the [Cloudflare Tunnel API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/) and [Zero Trust Networks API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/) will no longer return deleted tunnels, routes, subnets and virtual networks by default. This change makes the API behavior more intuitive by only returning active resources unless otherwise specified.

No action is required if you already explicitly set `is_deleted=false` or if you only need to list active resources.

This change affects the following API endpoints:

* List all tunnels: [GET /accounts/{account\_id}/tunnels](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/methods/list/)
* List [Cloudflare Tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/): [GET /accounts/{account\_id}/cfd\_tunnel](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/cloudflared/methods/list/)
* List [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) tunnels: [GET /accounts/{account\_id}/warp\_connector](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/warp%5Fconnector/methods/list/)
* List tunnel routes: [GET /accounts/{account\_id}/teamnet/routes](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/routes/methods/list/)
* List subnets: [GET /accounts/{account\_id}/zerotrust/subnets](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/subnets/methods/list/)
* List virtual networks: [GET /accounts/{account\_id}/teamnet/virtual\_networks](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/virtual%5Fnetworks/methods/list/)

#### What is changing?

The default behavior of the `is_deleted` query parameter will be updated.

| Scenario                         | Previous behavior (before December 1, 2025)                                | New behavior (from December 1, 2025)                                  |
| -------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| is\_deleted parameter is omitted | Returns **active & deleted** tunnels, routes, subnets and virtual networks | Returns **only active** tunnels, routes, subnets and virtual networks |

#### Action required

If you need to retrieve deleted (or all) resources, please update your API calls to explicitly include the `is_deleted` parameter before **December 1, 2025**.

To get a list of only deleted resources, you must now explicitly add the `is_deleted=true` query parameter to your request:

Terminal window

```

# Example: Get ONLY deleted Tunnels

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tunnels?is_deleted=true" \

     -H "Authorization: Bearer $API_TOKEN"


# Example: Get ONLY deleted Virtual Networks

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/virtual_networks?is_deleted=true" \

     -H "Authorization: Bearer $API_TOKEN"


```

Following this change, retrieving a complete list of both active and deleted resources will require two separate API calls: one to get active items (by omitting the parameter or using `is_deleted=false`) and one to get deleted items (`is_deleted=true`).

#### Why we’re making this change

This update is based on user feedback and aims to:

* **Create a more intuitive default:** Aligning with common API design principles where list operations return only active resources by default.
* **Reduce unexpected results:** Prevents users from accidentally operating on deleted resources that were returned unexpectedly.
* **Improve performance:** For most users, the default query result will now be smaller and more relevant.

To learn more, please visit the [Cloudflare Tunnel API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/) and [Zero Trust Networks API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/) documentation.

## 2025-09-01

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Updated Email security roles**   

To provide more granular controls, we refined the [existing roles](https://developers.cloudflare.com/cloudflare-one/roles-permissions/#email-security-roles) for Email security and launched a new Email security role as well.

All Email security roles no longer have read or write access to any of the other Zero Trust products:

* **Email Configuration Admin**
* **Email Integration Admin**
* **Email security Read Only**
* **Email security Analyst**
* **Email security Policy Admin**
* **Email security Reporting**

To configure [Data Loss Prevention (DLP)](https://developers.cloudflare.com/cloudflare-one/email-security/outbound-dlp/) or [Remote Browser Isolation (RBI)](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/#set-up-clientless-web-isolation), you now need to be an admin for the Zero Trust dashboard with the **Cloudflare Zero Trust** role.

Also through customer feedback, we have created a new additive role to allow **Email security Analyst** to create, edit, and delete Email security policies, without needing to provide access via the **Email Configuration Admin** role. This role is called **Email security Policy Admin**, which can read all settings, but has write access to [allow policies](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/allow-policies/), [trusted domains](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/trusted-domains/), and [blocked senders](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/blocked-senders/).

This feature is available across these Email security packages:

* **Advantage**
* **Enterprise**
* **Enterprise + PhishGuard**

## 2025-08-29

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**Cloudflare One WARP Diagnostic AI Analyzer**   

We're excited to share a new AI feature, the [WARP diagnostic analyzer ↗](https://blog.cloudflare.com/AI-troubleshoot-warp-and-network-connectivity-issues/), to help you troubleshoot and resolve WARP connectivity issues faster. This beta feature is now available in the [Cloudflare One dashboard ↗](https://dash.cloudflare.com/one/) to all users. The AI analyzer makes it easier for you to identify the root cause of client connectivity issues by parsing [remote captures](https://developers.cloudflare.com/cloudflare-one/insights/dex/diagnostics/client-packet-capture/#start-a-remote-capture) of [WARP diagnostic logs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/#warp-diag-logs). The WARP diagnostic analyzer provides a summary of impact that may be experienced on the device, lists notable events that may contribute to performance issues, and recommended troubleshooting steps and articles to help you resolve these issues. Refer to [WARP diagnostics analyzer (beta)](https://developers.cloudflare.com/cloudflare-one/insights/dex/diagnostics/client-packet-capture/#diagnostics-analyzer-beta) to learn more about how to maximize using the WARP diagnostic analyzer to troubleshoot the WARP client.

## 2025-08-29

[ Digital Experience Monitoring ](https://developers.cloudflare.com/cloudflare-one/insights/dex/) 

  
**DEX MCP Server**   

[Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) provides visibility into device connectivity and performance across your Cloudflare SASE deployment.

We've released an MCP server [(Model Context Protocol) ↗](https://cloudflare.com/learning/ai/what-is-model-context-protocol-mcp/) for DEX.

The DEX MCP server is an AI tool that allows customers to ask a question like, "Show me the connectivity and performance metrics for the device used by carly‌@acme.com", and receive an answer that contains data from the DEX API.

Any Cloudflare One customer using a Free, Pay-as-you-go, or Enterprise account can access the DEX MCP Server. This feature is available to everyone.

Customers can test the new DEX MCP server in less than one minute. To learn more, read the [DEX MCP server documentation](https://developers.cloudflare.com/cloudflare-one/insights/dex/dex-mcp-server/).

## 2025-08-27

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**Shadow IT - SaaS analytics dashboard**   

Zero Trust has significantly upgraded its **Shadow IT analytics**, providing you with unprecedented visibility into your organizations use of SaaS tools. With this dashboard, you can review who is using an application and volumes of data transfer to the application.

You can review these metrics against application type, such as Artificial Intelligence or Social Media. You can also mark applications with an approval status, including **Unreviewed**, **In Review**, **Approved**, and **Unapproved** designating how they can be used in your organization.

![Cloudflare One Analytics Dashboards](https://developers.cloudflare.com/_astro/shadow-it-analytics.BLNnG72w_Z1vDznE.webp) 

These application statuses can also be used in Gateway HTTP policies, so you can block, isolate, limit uploads and downloads, and more based on the application status.

Both the analytics and policies are accessible in the Cloudflare [Zero Trust dashboard ↗](https://one.dash.cloudflare.com/), empowering organizations with better visibility and control.

## 2025-08-26

[ CASB ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/) 

  
**New CASB integrations for ChatGPT, Claude, and Gemini**   

[Cloudflare CASB ↗](https://www.cloudflare.com/zero-trust/products/casb/) now supports three of the most widely used GenAI platforms — **OpenAI ChatGPT**, **Anthropic Claude**, and **Google Gemini**. These API-based integrations give security teams agentless visibility into posture, data, and compliance risks across their organization’s use of generative AI.

![Cloudflare CASB showing selection of new findings for ChatGPT, Claude, and Gemini integrations.](https://developers.cloudflare.com/_astro/casb-ai-integrations-preview.B-zsSA1P_Z1wlfJX.webp) 

#### Key capabilities

* **Agentless connections** — connect ChatGPT, Claude, and Gemini tenants via API; no endpoint software required
* **Posture management** — detect insecure settings and misconfigurations that could lead to data exposure
* **DLP detection** — identify sensitive data in uploaded chat attachments or files
* **GenAI-specific insights** — surface risks unique to each provider’s capabilities

#### Learn more

* [ChatGPT integration docs ↗](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/openai/)
* [Claude integration docs ↗](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/anthropic/)
* [Gemini integration docs ↗](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/gemini/)

These integrations are available to all Cloudflare One customers today.

## 2025-08-26

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Manage and restrict access to internal MCP servers with Cloudflare Access**   

You can now control who within your organization has access to internal MCP servers, by putting internal MCP servers behind [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/).

[Self-hosted applications](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/linked-apps/) in Cloudflare Access now support OAuth for MCP server authentication. This allows Cloudflare to delegate access from any self-hosted application to an MCP server via OAuth. The OAuth access token authorizes the MCP server to make requests to your self-hosted applications on behalf of the authorized user, using that user's specific permissions and scopes.

For example, if you have an MCP server designed for internal use within your organization, you can configure Access policies to ensure that only authorized users can access it, regardless of which MCP client they use. Support for internal, self-hosted MCP servers also works with MCP server portals, allowing you to provide a single MCP endpoint for multiple MCP servers. For more on MCP server portals, read the [blog post ↗](https://blog.cloudflare.com/zero-trust-mcp-server-portals/) on the Cloudflare Blog.

## 2025-08-26

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**MCP server portals**   
![MCP server portal](https://developers.cloudflare.com/_astro/mcp-server-portal.BOKqTCoI_ZXYCcF.webp) 

An [MCP server portal](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/mcp-portals/) centralizes multiple Model Context Protocol (MCP) servers onto a single HTTP endpoint. Key benefits include:

* **Streamlined access to multiple MCP servers**: MCP server portals support both unauthenticated MCP servers as well as MCP servers secured using any third-party or custom OAuth provider. Users log in to the portal URL through Cloudflare Access and are prompted to authenticate separately to each server that requires OAuth.
* **Customized tools per portal**: Admins can tailor an MCP portal to a particular use case by choosing the specific tools and prompt templates that they want to make available to users through the portal. This allows users to access a curated set of tools and prompts — the less external context exposed to the AI model, the better the AI responses tend to be.
* **Observability**: Once the user's AI agent is connected to the portal, Cloudflare Access logs the individual requests made using the tools in the portal.

This is available in an open beta for all customers across all plans! For more information check out our [blog ↗](https://blog.cloudflare.com/zero-trust-mcp-server-portals/) for this release.

## 2025-08-25

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**New DLP topic based detection entries for AI prompt protection**   

You now have access to a comprehensive suite of capabilities to secure your organization's use of generative AI. AI prompt protection introduces four key features that work together to provide deep visibility and granular control.

1. **Prompt Detection for AI Applications**

DLP can now natively detect and inspect user prompts submitted to popular AI applications, including **Google Gemini**, **ChatGPT**, **Claude**, and **Perplexity**.

1. **Prompt Analysis and Topic Classification**

Our DLP engine performs deep analysis on each prompt, applying [topic classification](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#ai-prompt-topics). These topics are grouped into two evaluation categories:

* **Content:** PII, Source Code, Credentials and Secrets, Financial Information, and Customer Data.
* **Intent:** Jailbreak attempts, requests for malicious code, or attempts to extract PII.

To help you apply these topics quickly, we have also released five new predefined profiles (for example, AI Prompt: AI Security, AI Prompt: PII) that bundle these new topics.

![DLP](https://developers.cloudflare.com/_astro/ai-prompt-detection-entry.4QmdkAuv_Z14HtSJ.webp) 
1. **Granular Guardrails**  
You can now build guardrails using Gateway HTTP policies with [application granular controls](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#granular-controls). Apply a DLP profile containing an [AI prompt topic detection](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#ai-prompt-topics) to individual AI applications (for example, `ChatGPT`) and specific user actions (for example, `SendPrompt`) to block sensitive prompts.  
![DLP](https://developers.cloudflare.com/_astro/ai-prompt-policy.CF3H2rbK_2muoEC.webp)
2. **Full Prompt Logging**  
To aid in incident investigation, an optional setting in your Gateway policy allows you to [capture prompt logs](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#log-generative-ai-prompt-content) to store the full interaction of prompts that trigger a policy match. To make investigations easier, logs can be filtered by `conversation_id`, allowing you to reconstruct the full context of an interaction that led to a policy violation.  
![DLP](https://developers.cloudflare.com/_astro/ai-prompt-log.ywQDc5qN_2v6nax.webp)

AI prompt protection is now available in open beta. To learn more about it, read the [blog ↗](https://blog.cloudflare.com/ai-prompt-protection/#closing-the-loop-logging) or refer to [AI prompt topics](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#ai-prompt-topics).

## 2025-08-21

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Windows (version 2025.6.1400.0)**   

A new GA release for the Windows WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains a hotfix for pre-login for multi-user for the 2025.6.1135.0 release.

**Changes and improvements**

* Fixes an issue where new pre-login registrations were not being properly created.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about Win32/ClickFix.ABA being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, please reconnect the WARP client by toggling off and back on.

## 2025-08-21

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Gateway BYOIP Dedicated Egress IPs now available.**   

Enterprise Gateway users can now use Bring Your Own IP (BYOIP) for dedicated egress IPs.

Admins can now onboard and use their own IPv4 or IPv6 prefixes to egress traffic from Cloudflare, delivering greater control, flexibility, and compliance for network traffic.

Get started by following the [BYOIP onboarding process](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/#bring-your-own-ip-address-byoip). Once your IPs are onboarded, go to **Gateway** \> **Egress policies** and select or create an egress policy. In **Select an egress IP**, choose _Use dedicated egress IPs (Cloudflare or BYOIP)_, then select your BYOIP address from the dropdown menu.

![Screenshot of a dropdown menu adding a BYOIP IPv4 address as a dedicated egress IP in a Gateway egress policy](https://developers.cloudflare.com/_astro/Gateway-byoip-dedicated-egress-ips.D0pzLAbV_8yK6N.webp) 

For more information, refer to [BYOIP for dedicated egress IPs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/#bring-your-own-ip-address-byoip).

## 2025-08-19

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Windows (version 2025.6.1335.0)**   

A new GA release for the Windows WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes and improvements.

**Changes and improvements**

* Improvements to better manage multi-user pre-login registrations.
* Fixed an issue preventing devices from reaching split-tunneled traffic even when WARP was disconnected.
* Fix to prevent WARP from re-enabling its firewall rules after a user-initiated disconnect.
* Improvement for faster client connectivity on high-latency captive portal networks.
* Fixed an issue where recursive CNAME records could cause intermittent WARP connectivity issues.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 version KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

## 2025-08-19

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for macOS (version 2025.6.1335.0)**   

A new GA release for the macOS WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes and improvements.

**Changes and improvements**

* Fixed an issue preventing devices from reaching split-tunneled traffic even when WARP was disconnected.
* Fix to prevent WARP from re-enabling its firewall rules after a user-initiated disconnect.
* Improvement for faster client connectivity on high-latency captive portal networks.
* Fixed an issue where recursive CNAME records could cause intermittent WARP connectivity issues.

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

## 2025-08-19

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Linux (version 2025.6.1335.0)**   

A new GA release for the Linux WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes and improvements.

**Changes and improvements**

* Fixed an issue preventing devices from reaching split-tunneled traffic even when WARP was disconnected.
* Fix to prevent WARP from re-enabling its firewall rules after a user-initiated disconnect.
* Improvement for faster client connectivity on high-latency captive portal networks.
* Fixed an issue where recursive CNAME records could cause intermittent WARP connectivity issues.

**Known issues**

* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

## 2025-08-15

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**SFTP support for SSH with Cloudflare Access for Infrastructure**   

[SSH with Cloudflare Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/) now supports SFTP. It is compatible with SFTP clients, such as Cyberduck.

## 2025-08-14

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Cloudflare Access Logging supports the Customer Metadata Boundary (CMB)**   

Cloudflare Access logs now support the [Customer Metadata Boundary (CMB)](https://developers.cloudflare.com/data-localization/metadata-boundary/). If you have configured the CMB for your account, all Access logging will respect that configuration.

Note

For EU CMB customers, the logs will not be stored by Access and will appear as empty in the dashboard. EU CMB customers should utilize [Logpush](https://developers.cloudflare.com/logs/logpush/) to retain their Access logging, if desired.

## 2025-08-07

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Expanded Email Link Isolation**   

When you deploy MX or Inline, not only can you apply email link isolation to suspicious links in all emails (including benign), you can now also apply email link isolation to all links of a specified disposition. This provides more flexibility in controlling user actions within emails.

For example, you may want to deliver suspicious messages but isolate the links found within them so that users who choose to interact with the links will not accidentally expose your organization to threats. This means your end users are more secure than ever before.

![Expanded Email Link Isolation Configuration](https://developers.cloudflare.com/_astro/expanded-link-actions.DziIg6E8_1Sx0Ar.webp) 

To isolate all links within a message based on the disposition, select **Settings** \> **Link Actions** \> **View** and select **Configure**. As with other other links you isolate, an interstitial will be provided to warn users that this site has been isolated and the link will be recrawled live to evaluate if there are any changes in our threat intel. Learn more about this feature on [Configure link actions ↗](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/configure-link-actions/).

This feature is available across these Email security packages:

* **Enterprise**
* **Enterprise + PhishGuard**

## 2025-07-31

[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Terraform V5 support for tunnels and routes**   

The Cloudflare Terraform provider resources for Cloudflare WAN tunnels and routes now support Terraform provider version 5\. Customers using infrastructure-as-code workflows can manage their tunnel and route configuration with the latest provider version.

For more information, refer to the [Cloudflare Terraform provider documentation ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs).

## 2025-07-30

[ Magic Transit ](https://developers.cloudflare.com/magic-transit/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Magic Transit and Magic WAN health check data is fully compatible with the CMB EU setting.**   

Today, we are excited to announce that all Magic Transit and Magic WAN customers with CMB EU ([Customer Metadata Boundary - Europe](https://developers.cloudflare.com/data-localization/metadata-boundary/)) enabled in their account will be able to access GRE, IPsec, and CNI health check and traffic volume data in the Cloudflare dashboard and via API.

This ensures that all Magic Transit and Magic WAN customers with CMB EU enabled will be able to access all Magic Transit and Magic WAN features.

Specifically, these two GraphQL endpoints are now compatible with CMB EU:

* `magicTransitTunnelHealthChecksAdaptiveGroups`
* `magicTransitTunnelTrafficAdaptiveGroups`

## 2025-07-28

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Scam domain category introduced under Security Threats**   

We have introduced a new Security Threat category called **Scam**. Relevant domains are marked with the Scam category. Scam typically refers to fraudulent websites and schemes designed to trick victims into giving away money or personal information.

**New category added**

| Parent ID | Parent Name      | Category ID | Category Name |
| --------- | ---------------- | ----------- | ------------- |
| 21        | Security Threats | 191         | Scam          |

Refer to [Gateway domain categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/) to learn more.

## 2025-07-24

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Windows (version 2025.6.824.1)**   

A new Beta release for the Windows WARP client is now available on the [beta releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/).

This release contains minor fixes and improvements.

**Changes and improvements**

* Improvements to better manage multi-user pre-login registrations.
* Fixed an issue preventing devices from reaching split-tunneled traffic even when WARP was disconnected.
* Fix to prevent WARP from re-enabling its firewall rules after a user-initiated disconnect.
* Improvement to managed network detection checks for faster switching between managed networks.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 version KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with `KB5055523` installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

## 2025-07-24

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for macOS (version 2025.6.824.1)**   

A new Beta release for the macOS WARP client is now available on the [beta releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/).

This release contains minor fixes and improvements.

**Changes and improvements**

* Fixed an issue preventing devices from reaching split-tunneled traffic even when WARP was disconnected.
* Fix to prevent WARP from re-enabling its firewall rules after a user-initiated disconnect.
* Improvement to managed network detection checks for faster switching between managed networks.

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

## 2025-07-24

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Gateway HTTP Filtering on all ports available in open BETA**   

[Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) can now apply [HTTP filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) to all proxied HTTP requests, not just traffic on standard HTTP (`80`) and HTTPS (`443`) ports. This means all requests can now be filtered by [A/V scanning](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/antivirus-scanning/), [file sandboxing](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/file-sandboxing/), [Data Loss Prevention (DLP)](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/#data-in-transit), and more.

You can turn this [setting](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/#inspect-on-all-ports) on by going to **Settings** \> **Network** \> **Firewall** and choosing _Inspect on all ports_.

![HTTP Inspection on all ports setting](https://developers.cloudflare.com/_astro/Gateway-Inspection-all-ports.CCmwX6D0_OoDoS.webp) 

To learn more, refer to [Inspect on all ports (Beta)](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/#inspect-on-all-ports).

## 2025-07-23

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Windows (version 2025.5.943.0)**   

A new GA release for the Windows WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes and improvements.

**Changes and improvements**

* WARP proxy mode now uses the operating system's DNS settings. Changes made to system DNS settings while in proxy mode require the client to be turned off then back on to take effect.
* Changes to the [SCCM VPN boundary support](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#sccm-vpn-boundary-support) feature to no longer restart the SMS Agent Host (`ccmexec.exe`) service.
* Fixed an issue affecting clients in Split Tunnel Include mode, where access to split-tunneled traffic was blocked after reconnecting the client.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 version KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with `KB5055523` installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

## 2025-07-23

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for macOS (version 2025.5.943.0)**   

A new GA release for the macOS WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes and improvements.

**Changes and improvements**

* WARP proxy mode now uses the operating system's DNS settings. Changes made to system DNS settings while in proxy mode require the client to be turned off then back on to take effect.
* Fixed an issue affecting clients in Split Tunnel Include mode, where access to split-tunneled traffic was blocked after reconnecting the client.
* For macOS deployments, the WARP client can now be managed using an `mdm.xml` file placed in `/Library/Application Support/Cloudflare/mdm.xml`. This new configuration option offers an alternative to the still supported method of deploying a managed plist through an MDM solution.

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

## 2025-07-23

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Linux (version 2025.5.943.0)**   

A new GA release for the Linux WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains minor fixes and improvements.

**Changes and improvements**

* WARP proxy mode now uses the operating system's DNS settings. Changes made to system DNS settings while in proxy mode require the client to be turned off then back on to take effect.
* Fixed an issue affecting clients in Split Tunnel Include mode, where access to split-tunneled traffic was blocked after reconnecting the client.

**Known issues**

* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

## 2025-07-22

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Google Bard Application replaced by Gemini**   

The **Google Bard** application (ID: 1198) has been deprecated and fully removed from the system. It has been replaced by the **Gemini** application (ID: 1340). Any existing Gateway policies that reference the old Google Bard application will no longer function. To ensure your policies continue to work as intended, you should update them to use the new Gemini application. We recommend replacing all instances of the deprecated Bard application with the new Gemini application in your Gateway policies. For more information about application policies, please see the [Cloudflare Gateway documentation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/application-app-types/).

## 2025-07-21

[ Cloudflare One Appliance ](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Virtual Cloudflare One Appliance with KVM support (open beta)**   

The KVM-based virtual Cloudflare One Appliance is now in open beta with official support for Proxmox VE.

Customers can deploy the virtual appliance on KVM hypervisors to connect branch or data center networks to Cloudflare WAN without dedicated hardware.

For setup instructions, refer to [Configure a virtual Cloudflare One Appliance](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/configure-virtual-appliance/).

## 2025-07-17

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**New detection entry type: Document Matching for DLP**   

You can now create [document-based](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#document-entries) detection entries in DLP by uploading example documents. Cloudflare will encrypt your documents and create a unique fingerprint of the file. This fingerprint is then used to identify similar documents or snippets within your organization's traffic and stored files.

![DLP](https://developers.cloudflare.com/_astro/document-match.CcN8pGgR_Z1e3PDm.webp) 

**Key features and benefits:**

* **Upload documents, forms, or templates:** Easily upload .docx and .txt files (up to 10 MB) that contain sensitive information you want to protect.
* **Granular control with similarity percentage:** Define a minimum similarity percentage (0-100%) that a document must meet to trigger a detection, reducing false positives.
* **Comprehensive coverage:** Apply these document-based detection entries in:  
   * **Gateway policies:** To inspect network traffic for sensitive documents as they are uploaded or shared.  
   * **CASB (Cloud Access Security Broker):** To scan files stored in cloud applications for sensitive documents at rest.
* **Identify sensitive data:** This new detection entry type is ideal for identifying sensitive data within completed forms, templates, or even small snippets of a larger document, helping you prevent data exfiltration and ensure compliance.

Once uploaded and processed, you can add this new document entry into a DLP profile and policies to enhance your data protection strategy.

## 2025-07-15

[ Cloudflare Tunnel ](https://developers.cloudflare.com/tunnel/)[ Cloudflare Tunnel for SASE ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) 

  
**Faster, more reliable UDP traffic for Cloudflare Tunnel**   

Your real-time applications running over [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) are now faster and more reliable. We've completely re-architected the way `cloudflared` proxies UDP traffic in order to isolate it from other traffic, ensuring latency-sensitive applications like private DNS are no longer slowed down by heavy TCP traffic (like file transfers) on the same Tunnel.

This is a foundational improvement to Cloudflare Tunnel, delivered automatically to all customers. There are no settings to configure — your UDP traffic is already flowing faster and more reliably.

**What’s new:**

* **Faster UDP performance**: We've significantly reduced the latency for establishing new UDP sessions, making applications like private DNS much more responsive.
* **Greater reliability for mixed traffic**: UDP packets are no longer affected by heavy TCP traffic, preventing timeouts and connection drops for your real-time services.

Learn more about running [TCP or UDP applications](https://developers.cloudflare.com/reference-architecture/architectures/sase/#connecting-applications) and [private networks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/) through [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/).

## 2025-07-10

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**New onboarding guides for Zero Trust**   

Use our brand new onboarding experience for Cloudflare Zero Trust. New and returning users can now engage with a **Get Started** tab with walkthroughs for setting up common use cases end-to-end.

![Zero Trust onboarding guides](https://developers.cloudflare.com/_astro/zt-onboarding-guides._18EfPbe_NEBk9.webp) 

There are eight brand new onboarding guides in total:

* Securely access a private network (sets up device client and Tunnel)
* Device-to-device / mesh networking (sets up and connects multiple device clients)
* Network to network connectivity (sets up and connects multiple WARP Connectors, makes reference to Magic WAN availability for Enterprise)
* Secure web traffic (sets up device client, Gateway, pre-reqs, and initial policies)
* Secure DNS for networks (sets up a new DNS location and Gateway policies)
* Clientless web access (sets up Access to a web app, Tunnel, and public hostname)
* Clientless SSH access (all the same + the web SSH experience)
* Clientless RDP access (all the same + RDP-in-browser)

Each flow walks the user through the steps to configure the essential elements, and provides a “more details” panel with additional contextual information about what the user will accomplish at the end, along with why the steps they take are important.

Try them out now in the [Zero Trust dashboard ↗](https://one.dash.cloudflare.com/?to=/:account/home)!

## 2025-07-07

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**Cloudy summaries for Access and Gateway Logs**   

Cloudy, Cloudflare's AI Agent, will now automatically summarize your [Access](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/access-authentication-logs/) and [Gateway](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/) block logs.

In the log itself, Cloudy will summarize what occurred and why. This will be helpful for quick troubleshooting and issue correlation.

![Cloudy AI summarizes a log](https://developers.cloudflare.com/_astro/cloudy-explanation.oFZR6cXa_Z2e1RtR.webp) 

If you have feedback about the Cloudy summary - good or bad - you can provide that right from the summary itself.

## 2025-07-07

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**New App Library for Zero Trust Dashboard**   

Cloudflare Zero Trust customers can use the App Library to get full visibility over the SaaS applications that they use in their Gateway policies, CASB integrations, and Access for SaaS applications.

**App Library**, found under **My Team**, makes information available about all Applications that can be used across the Zero Trust product suite.

![Zero Trust App Library](https://developers.cloudflare.com/_astro/app-library.D403GJ9j_1SfMgP.webp) 

You can use the App Library to see:

* How Applications are defined
* Where they are referenced in policies
* Whether they have Access for SaaS configured
* Review their CASB findings and integration status.

Within individual Applications, you can also track their usage across your organization, and better understand user behavior.

## 2025-07-01

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Access RDP securely from your browser — now in open beta**   

[Browser-based RDP](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-browser/) with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) is now available in open beta for all Cloudflare customers. It enables secure, remote Windows server access without VPNs or RDP clients.

With browser-based RDP, you can:

* **Control how users authenticate to internal RDP resources** with single sign-on (SSO), multi-factor authentication (MFA), and granular access policies.
* **Record who is accessing which servers and when** to support regulatory compliance requirements and to gain greater visibility in the event of a security event.
* **Eliminate the need to install and manage software on user devices**. You will only need a web browser.
* **Reduce your attack surface** by keeping your RDP servers off the public Internet and protecting them from common threats like credential stuffing or brute-force attacks.
![Example of a browsed-based RDP Access application](https://developers.cloudflare.com/_astro/browser-based-rdp-access-app.BNXce1JL_1TDoUX.webp) 

To get started, see [Connect to RDP in a browser](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-browser/).

## 2025-06-30

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Windows (version 2025.5.893.0)**   

A new GA release for the Windows WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains improvements and new exciting features, including [SCCM VPN boundary support](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#sccm-vpn-boundary-support) and [post-quantum cryptography](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#enable%5Fpost%5Fquantum). By tunneling your corporate network traffic over Cloudflare, you can now gain the immediate protection of post-quantum cryptography without needing to upgrade any of your individual corporate applications or systems.

**Changes and improvements**

* Fixed a device registration issue that caused WARP connection failures when changing networks.
* Captive portal improvements and fixes:  
   * Captive portal sign in notifications will now be sent through operating system notification services.  
   * Fix for firewall configuration issue affecting clients in DoH only mode.
* Improved the connectivity status message in the client GUI.
* Fixed a bug affecting clients in Gateway with DoH mode where the original DNS servers were not restored after disabling WARP.
* The WARP client now applies post-quantum cryptography end-to-end on enabled devices accessing resources behind a Cloudflare Tunnel. This feature can be [enabled by MDM](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#enable%5Fpost%5Fquantum).
* Improvement to handle client configuration changes made by an MDM while WARP is not running.
* Improvements for multi-user experience to better handle fast user switching and transitions from a pre-login to a logged-in state.
* Added a WARP client device posture check for SAN attributes to the [client certificate check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/client-certificate/).
* Fixed an issue affecting Split Tunnel Include mode, where traffic outside the tunnel was blocked when switching between Wi-Fi and Ethernet networks.
* Added [SCCM VPN boundary support](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#sccm-vpn-boundary-support) to device profile settings. With SCCM VPN boundary support enabled, operating systems will register WARP's local interface IP with the on-premise DNS server when reachable.
* Fix for an issue causing WARP connectivity to fail without full system reboot.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 version KB5060829](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices with `KB5055523` installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

## 2025-06-30

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for macOS (version 2025.5.893.0)**   

A new GA release for the macOS WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains improvements and new exciting features, including [post-quantum cryptography](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#enable%5Fpost%5Fquantum). By tunneling your corporate network traffic over Cloudflare, you can now gain the immediate protection of post-quantum cryptography without needing to upgrade any of your individual corporate applications or systems.

**Changes and improvements**

* Fixed an issue where WARP sometimes failed to automatically relaunch after updating.
* Fixed a device registration issue causing WARP connection failures when changing networks.
* Captive portal improvements and fixes:  
   * Captive portal sign in notifications will now be sent through operating system notification services.  
   * Fix for firewall configuration issue affecting clients in DoH only mode.
* Improved the connectivity status message in the client GUI.
* The WARP client now applies post-quantum cryptography end-to-end on enabled devices accessing resources behind a Cloudflare Tunnel. This feature can be [enabled by MDM](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#enable%5Fpost%5Fquantum).
* Improvement to handle client configuration changes made by an MDM while WARP is not running.
* Fixed an issue affecting Split Tunnel Include mode, where traffic outside the tunnel was blocked when switching between Wi-Fi and Ethernet networks.
* Improvement for WARP connectivity issues on macOS due to the operating system not accepting DNS server configurations.
* Added a WARP client device posture check for SAN attributes to the [client certificate check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/client-certificate/).

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.

## 2025-06-30

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**WARP client for Linux (version 2025.5.893.0)**   

A new GA release for the Linux WARP client is now available on the [stable releases downloads page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/).

This release contains improvements and new exciting features, including [post-quantum cryptography](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#enable%5Fpost%5Fquantum). By tunneling your corporate network traffic over Cloudflare, you can now gain the immediate protection of post-quantum cryptography without needing to upgrade any of your individual corporate applications or systems.

**Changes and improvements**

* Fixed a device registration issue causing WARP connection failures when changing networks.
* Captive portal improvements and fixes:  
   * Captive portal sign in notifications will now be sent through operating system notification services.  
   * Fix for firewall configuration issue affecting clients in DoH only mode.
* Improved the connectivity status message in the client GUI.
* The WARP client now applies post-quantum cryptography end-to-end on enabled devices accessing resources behind a Cloudflare Tunnel. This feature can be [enabled by MDM](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#enable%5Fpost%5Fquantum).
* Improvement to handle client configuration changes made by MDM while WARP is not running.
* Fixed an issue affecting Split Tunnel Include mode, where traffic outside the tunnel was blocked when switching between Wi-Fi and Ethernet networks.
* Added a WARP client device posture check for SAN attributes to the [client certificate check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/client-certificate/).

**Known issues**

* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

## 2025-06-30

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**Cloudflare One Agent for Android (version 2.4.2)**   

A new GA release for the Android Cloudflare One Agent is now available in the [Google Play Store ↗](https://play.google.com/store/apps/details?id=com.cloudflare.cloudflareoneagent). This release contains improvements and new exciting features, including [post-quantum cryptography](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#enable%5Fpost%5Fquantum). By tunneling your corporate network traffic over Cloudflare, you can now gain the immediate [protection of post-quantum cryptography ↗](https://blog.cloudflare.com/pq-2024/) without needing to upgrade any of your individual corporate applications or systems.

**Changes and improvements**

* QLogs are now disabled by default and can be enabled in the app by turning on **Enable qlogs** under **Settings** \> **Advanced** \> **Diagnostics** \> **Debug Logs**. The QLog setting from previous releases will no longer be respected.
* DNS over HTTPS traffic is now included in the WARP tunnel by default.
* The WARP client now applies [post-quantum cryptography ↗](https://blog.cloudflare.com/pq-2024/) end-to-end on enabled devices accessing resources behind a Cloudflare Tunnel. This feature can be enabled by [MDM](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#enable%5Fpost%5Fquantum).
* Fixed an issue that caused WARP connection failures on ChromeOS devices.

## 2025-06-30

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**Cloudflare One Agent for iOS (version 1.11)**   

A new GA release for the iOS Cloudflare One Agent is now available in the [iOS App Store ↗](https://apps.apple.com/us/app/cloudflare-one-agent/id6443476492). This release contains improvements and new exciting features, including [post-quantum cryptography](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#enable%5Fpost%5Fquantum). By tunneling your corporate network traffic over Cloudflare, you can now gain the immediate [protection of post-quantum cryptography ↗](https://blog.cloudflare.com/pq-2024/) without needing to upgrade any of your individual corporate applications or systems.

**Changes and improvements**

* QLogs are now disabled by default and can be enabled in the app by turning on **Enable qlogs** under **Settings** \> **Advanced** \> **Diagnostics** \> **Debug Logs**. The QLog setting from previous releases will no longer be respected.
* DNS over HTTPS traffic is now included in the WARP tunnel by default.
* The WARP client now applies [post-quantum cryptography ↗](https://blog.cloudflare.com/pq-2024/) end-to-end on enabled devices accessing resources behind a Cloudflare Tunnel. This feature can be enabled by [MDM](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#enable%5Fpost%5Fquantum).

## 2025-06-23

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/)[ CASB ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**Data Security Analytics in the Zero Trust dashboard**   

Zero Trust now includes **Data security analytics**, providing you with unprecedented visibility into your organization sensitive data.

The new dashboard includes:

* **Sensitive Data Movement Over Time:**  
   * See patterns and trends in how sensitive data moves across your environment. This helps understand where data is flowing and identify common paths.
* **Sensitive Data at Rest in SaaS & Cloud:**  
   * View an inventory of sensitive data stored within your corporate SaaS applications (for example, Google Drive, Microsoft 365) and cloud accounts (such as AWS S3).
* **DLP Policy Activity:**  
   * Identify which of your Data Loss Prevention (DLP) policies are being triggered most often.  
   * See which specific users are responsible for triggering DLP policies.
![Data Security Analytics](https://developers.cloudflare.com/_astro/cf1-data-security-analytics-v1.BGl6fYXl_H3N0P.webp) 

To access the new dashboard, log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/) and go to **Insights** on the sidebar.

## 2025-06-18

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Gateway will now evaluate Network policies before HTTP policies from July 14th, 2025**   

[Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) will now evaluate [Network (Layer 4) policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) **before** [HTTP (Layer 7) policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/). This change preserves your existing security posture and does not affect which traffic is filtered — but it may impact how notifications are displayed to end users.

This change will roll out progressively between **July 14–18, 2025**. If you use HTTP policies, we recommend reviewing your configuration ahead of rollout to ensure the user experience remains consistent.

#### Updated order of enforcement

**Previous order:**

1. DNS policies
2. HTTP policies
3. Network policies

**New order:**

1. DNS policies
2. **Network policies**
3. **HTTP policies**

#### Action required: Review your Gateway HTTP policies

This change may affect block notifications. For example:

* You have an **HTTP policy** to block `example.com` and display a block page.
* You also have a **Network policy** to block `example.com` silently (no client notification).

With the new order, the Network policy will trigger first — and the user will no longer see the HTTP block page.

To ensure users still receive a block notification, you can:

* Add a client notification to your Network policy, or
* Use only the HTTP policy for that domain.

---

#### Why we’re making this change

This update is based on user feedback and aims to:

* Create a more intuitive model by evaluating network-level policies before application-level policies.
* Minimize [526 connection errors](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-526/#error-526-in-the-zero-trust-context) by verifying the network path to an origin before attempting to establish a decrypted TLS connection.

---

To learn more, visit the [Gateway order of enforcement documentation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/).

## 2025-06-05

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**Cloudflare One Analytics Dashboards and Exportable Access Report**   

Cloudflare One now offers powerful new analytics dashboards to help customers easily discover available insights into their application access and network activity. These dashboards provide a centralized, intuitive view for understanding user behavior, application usage, and security posture.

!\[Cloudflare One Analytics Dashboards\](\~/assets/images/changelog/cloudflare-one/Analytics Dashboards.png)

Additionally, a new exportable access report is available, allowing customers to quickly view high-level metrics and trends in their application access. A **preview** of the report is shown below, with more to be found in the report:

![Cloudflare One Analytics Dashboards](https://developers.cloudflare.com/_astro/access-report.C744W7JR_2uzMcN.webp) 

Both features are accessible in the Cloudflare [Zero Trust dashboard ↗](https://one.dash.cloudflare.com/), empowering organizations with better visibility and control.

## 2025-05-29

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**New Gateway Analytics in the Cloudflare One Dashboard**   

Users can now access significant enhancements to Cloudflare Gateway analytics, providing you with unprecedented visibility into your organization's DNS queries, HTTP requests, and Network sessions. These powerful new dashboards enable you to go beyond raw logs and gain actionable insights into how your users are interacting with the Internet and your protected resources.

You can now visualize and explore:

* Patterns Over Time: Understand trends in traffic volume and blocked requests, helping you identify anomalies and plan for future capacity.
* Top Users & Destinations: Quickly pinpoint the most active users, enabling better policy enforcement and resource allocation.
* Actions Taken: See a clear breakdown of security actions applied by Gateway policies, such as blocks and allows, offering a comprehensive view of your security posture.
* Geographic Regions: Gain insight into the global distribution of your traffic.
![Gateway Analytics](https://developers.cloudflare.com/_astro/gateway-analytics.BdSwbIBb_1WTkQL.webp) 

To access the new overview, log in to your Cloudflare [Zero Trust dashboard ↗](https://one.dash.cloudflare.com/) and go to Analytics in the side navigation bar.

## 2025-05-27

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Gateway Protocol Detection Now Available for Pay-as-you-go and Free Plans**   

All Cloudflare One Gateway users can now use Protocol detection logging and filtering, including those on Pay-as-you-go and Free plans.

With Protocol Detection, admins can identify and enforce policies on traffic proxied through Gateway based on the underlying network protocol (for example, HTTP, TLS, or SSH), enabling more granular traffic control and security visibility no matter your plan tier.

This feature is available to enable in your account network settings for all accounts. For more information on using Protocol Detection, refer to the [Protocol detection documentation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/).

## 2025-05-18

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**New Applications Added to Zero Trust**   

42 new applications have been added for Zero Trust support within the Application Library and Gateway policy enforcement, giving you the ability to investigate or apply inline policies to these applications.

33 of the 42 applications are Artificial Intelligence applications. The others are Human Resources (2 applications), Development (2 applications), Productivity (2 applications), Sales & Marketing, Public Cloud, and Security.

To view all available applications, log in to your Cloudflare [Zero Trust dashboard ↗](https://one.dash.cloudflare.com/), navigate to the **App Library** under **My Team**.

For more information on creating Gateway policies, see our [Gateway policy documentation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/).

## 2025-05-16

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**New Access Analytics in the Cloudflare One Dashboard**   

A new Access Analytics dashboard is now available to all Cloudflare One customers. Customers can apply and combine multiple filters to dive into specific slices of their Access metrics. These filters include:

* Logins granted and denied
* Access events by type (SSO, Login, Logout)
* Application name (Salesforce, Jira, Slack, etc.)
* Identity provider (Okta, Google, Microsoft, onetimepin, etc.)
* Users (`chris@cloudflare.com`, `sally@cloudflare.com`, `rachel@cloudflare.com`, etc.)
* Countries (US, CA, UK, FR, BR, CN, etc.)
* Source IP address
* App type (self-hosted, Infrastructure, RDP, etc.)
![Access Analytics](https://developers.cloudflare.com/_astro/accessanalytics.DYXgwZCl_Z2PPi7.webp) 

To access the new overview, log in to your Cloudflare [Zero Trust dashboard ↗](https://one.dash.cloudflare.com/) and find Analytics in the side navigation bar.

## 2025-05-15

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Open email attachments with Browser Isolation**   

You can now safely open email attachments to view and investigate them.

What this means is that messages now have a **Attachments** section. Here, you can view processed attachments and their classifications (for example, _Malicious_, _Suspicious_, _Encrypted_). Next to each attachment, a **Browser Isolation** icon allows your team to safely open the file in a **clientless, isolated browser** with no risk to the analyst or your environment.

![Attachment-RBI](https://developers.cloudflare.com/_astro/Attachment-RBI.U9Dp8dJO_265xjw.webp) 

To use this feature, you must:

* Turn on **Allow users to open a remote browser without the device client** in your Zero Trust settings.
* Have **Browser Isolation (BISO)** seats assigned.

For more details, refer to our [setup guide](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/).

Some attachment types may not render in Browser Isolation. If there is a file type that you would like to be opened with Browser Isolation, reach out to your Cloudflare contact.

This feature is available across these Email security packages:

* **Advantage**
* **Enterprise**
* **Enterprise + PhishGuard**

## 2025-05-14

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Domain Categories improvements**   

**New categories added**

| Parent ID | Parent Name           | Category ID | Category Name                 |
| --------- | --------------------- | ----------- | ----------------------------- |
| 1         | Ads                   | 66          | Advertisements                |
| 3         | Business & Economy    | 185         | Personal Finance              |
| 3         | Business & Economy    | 186         | Brokerage & Investing         |
| 21        | Security Threats      | 187         | Compromised Domain            |
| 21        | Security Threats      | 188         | Potentially Unwanted Software |
| 6         | Education             | 189         | Reference                     |
| 9         | Government & Politics | 190         | Charity and Non-profit        |

**Changes to existing categories**

| Original Name | New Name                |
| ------------- | ----------------------- |
| Religion      | Religion & Spirituality |
| Government    | Government/Legal        |
| Redirect      | URL Alias/Redirect      |

Refer to [Gateway domain categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/) to learn more.

## 2025-05-13

[ Browser Isolation ](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) 

  
**SAML HTTP-POST bindings support for RBI**   

Remote Browser Isolation (RBI) now supports SAML HTTP-POST bindings, enabling seamless authentication for SSO-enabled applications that rely on POST-based SAML responses from Identity Providers (IdPs) within a Remote Browser Isolation session. This update resolves a previous limitation that caused `405` errors during login and improves compatibility with multi-factor authentication (MFA) flows.

With expanded support for major IdPs like Okta and Azure AD, this enhancement delivers a more consistent and user-friendly experience across authentication workflows. Learn how to [set up Remote Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/).

## 2025-05-13

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**New Applications Added for DNS Filtering**   

You can now create DNS policies to manage outbound traffic for an expanded list of applications. This update adds support for 273 new applications, giving you more control over your organization's outbound traffic.

With this update, you can:

* Create DNS policies for a wider range of applications
* Manage outbound traffic more effectively
* Improve your organization's security and compliance posture

For more information on creating DNS policies, see our [DNS policy documentation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/).

## 2025-05-12

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**Case Sensitive Custom Word Lists**   

You can now configure [custom word lists](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#custom-wordlist-datasets) to enforce case sensitivity. This setting supports flexibility where needed and aims to reduce false positives where letter casing is critical.

![dlp](https://developers.cloudflare.com/_astro/case-sesitive-cwl.MPuOc_3r_220dca.webp) 

## 2025-05-08

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Open email links with Browser Isolation**   

You can now safely open links in emails to view and investigate them.

![Open links with Browser Isolation](https://developers.cloudflare.com/_astro/investigate-links.pYbpGkt5_Z1DQRHU.webp) 

From **Investigation**, go to **View details**, and look for the **Links identified** section. Next to each link, the Cloudflare dashboard will display an **Open in Browser Isolation** icon which allows your team to safely open the link in a clientless, isolated browser with no risk to the analyst or your environment. Refer to [Open links](https://developers.cloudflare.com/cloudflare-one/email-security/investigation/search-email/#open-links) to learn more about this feature.

To use this feature, you must:

* Turn on **Allow users to open a remote browser without the device client** in your Zero Trust settings.
* Have **Browser Isolation (RBI)** seats assigned.

For more details, refer to our [setup guide](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/).

This feature is available across these Email security packages:

* **Advantage**
* **Enterprise**
* **Enterprise + PhishGuard**

## 2025-05-07

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**Send forensic copies to storage without DLP profiles**   

You can now [send DLP forensic copies](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#send-dlp-forensic-copies-to-logpush-destination) to third-party storage for any HTTP policy with an `Allow` or `Block` action, without needing to include a DLP profile. This change increases flexibility for data handling and forensic investigation use cases.

By default, Gateway will send all matched HTTP requests to your configured DLP Forensic Copy jobs.

![DLP](https://developers.cloudflare.com/_astro/forensic-copies-for-all.fxeFrCY4_Z1rCUy9.webp) 

## 2025-05-01

[ Browser Isolation ](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) 

  
**Browser Isolation Overview page for Zero Trust**   

A new **Browser Isolation Overview** page is now available in the Cloudflare Zero Trust dashboard. This centralized view simplifies the management of [Remote Browser Isolation (RBI)](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) deployments, providing:

* **Streamlined Onboarding:** Easily set up and manage isolation policies from one location.
* **Quick Testing:** Validate [clientless web application isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/) with ease.
* **Simplified Configuration:** Configure [isolated access applications](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/isolate-application/) and policies efficiently.
* **Centralized Monitoring:** Track aggregate usage and blocked actions.

This update consolidates previously disparate settings, accelerating deployment, improving visibility into isolation activity, and making it easier to ensure your protections are working effectively.

![Browser Isolation Overview](https://developers.cloudflare.com/_astro/browser-isolation-overview.Ljd5ax_O_Z1SURww.webp) 

To access the new overview, log in to your Cloudflare [Zero Trust dashboard ↗](https://one.dash.cloudflare.com/) and find Browser Isolation in the side navigation bar.

## 2025-04-30

[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/) 

  
**Dark Mode for Zero Trust Dashboard**   

The [Cloudflare Zero Trust dashboard ↗](https://one.dash.cloudflare.com/) now supports Cloudflare's native dark mode for all accounts and plan types.

Zero Trust Dashboard will automatically accept your user-level preferences for system settings, so if your Dashboard appearance is set to 'system' or 'dark', the Zero Trust dashboard will enter dark mode whenever the rest of your Cloudflare account does.

![Zero Trust dashboard supports dark mode](https://developers.cloudflare.com/_astro/dark-mode.DfLeS20d_Z2kTwNR.webp) 

* [ Zero Trust Dashboard ](#tab-panel-7174)
* [ Core Dashboard ](#tab-panel-7175)

To update your view preference in the Zero Trust dashboard:

1. Log into the [Zero Trust dashboard ↗](https://one.dash.cloudflare.com/).
2. Select your user icon.
3. Select **Dark Mode**.

To update your view preference in the Core dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com).
2. Go to **My Profile**
3. For **Appearance**, choose **Dark**.

## 2025-04-30

[ Cloudflare One Appliance ](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Cloudflare One Appliance supports multiple DNS server IPs**   

Cloudflare One Appliance DHCP server settings now support specifying multiple DNS server IP addresses in the DHCP pool.

Previously, customers could only configure a single DNS server per DHCP pool. With this update, you can specify multiple DNS servers to provide redundancy for clients at branch locations.

For configuration details, refer to [DHCP server](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-server/).

## 2025-04-28

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**FQDN Filtering For Gateway Egress Policies**   

Cloudflare One administrators can now control which egress IP is used based on a destination's fully qualified domain name (FDQN) within Gateway Egress policies.

* Host, Domain, Content Categories, and Application selectors are now available in the Gateway Egress policy builder in beta.
* During the beta period, you can use these selectors with traffic on-ramped to Gateway with the WARP client, proxy endpoints (commonly deployed with PAC files), or Cloudflare Browser Isolation.  
   * For WARP client support, additional configuration is required. For more information, refer to the [WARP client configuration documentation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#limitations).
![Egress by FQDN and Hostname](https://developers.cloudflare.com/_astro/Gateway-Egress-FQDN-Policy-preview.Civon5p8_Z2hcuQE.webp) 

This will help apply egress IPs to your users' traffic when an upstream application or network requires it, while the rest of their traffic can take the most performant egress path.

## 2025-04-21

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Access bulk policy tester**   

The [Access bulk policy tester](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/#test-all-policies-in-an-application) is now available in the Cloudflare Zero Trust dashboard. The bulk policy tester allows you to simulate Access policies against your entire user base before and after deploying any changes. The policy tester will simulate the configured policy against each user's last seen identity and device posture (if applicable).

![Example policy tester](https://developers.cloudflare.com/_astro/example-policy-tester.DCY8hQvx_2nxAfs.webp) 

## 2025-04-14

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**New predefined detection entry for ICD-11**   

You now have access to the World Health Organization (WHO) 2025 edition of the [International Classification of Diseases 11th Revision (ICD-11) ↗](https://www.who.int/news/item/14-02-2025-who-releases-2025-update-to-the-international-classification-of-diseases-%28icd-11%29) as a predefined detection entry. The new dataset can be found in the [Health Information](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/#health-information) predefined profile.

ICD-10 dataset remains available for use.

## 2025-04-11

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**HTTP redirect and custom block page redirect**   

You can now use more flexible redirect capabilities in Cloudflare One with Gateway.

* A new **Redirect** action is available in the HTTP policy builder, allowing admins to redirect users to any URL when their request matches a policy. You can choose to preserve the original URL and query string, and optionally include policy context via query parameters.
* For **Block** actions, admins can now configure a custom URL to display when access is denied. This block page redirect is set at the account level and can be overridden in DNS or HTTP policies. Policy context can also be passed along in the URL.

Learn more in our documentation for [HTTP Redirect](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#redirect) and [Block page redirect](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#redirect-to-a-block-page).

## 2025-04-09

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Cloudflare Zero Trust SCIM User and Group Provisioning Logs**   

[Cloudflare Zero Trust SCIM provisioning](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim) now has a full audit log of all create, update and delete event from any SCIM Enabled IdP. The [SCIM logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/scim-logs/) support filtering by IdP, Event type, Result and many more fields. This will help with debugging user and group update issues and questions.

SCIM logs can be found on the Zero Trust Dashboard under **Logs** \-> **SCIM provisioning**.

![Example SCIM Logs](https://developers.cloudflare.com/_astro/example-scim-log.Bv5Zqckh_BY26C.webp) 

## 2025-04-01

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**CASB and Email security**   

With Email security, you get two free CASB integrations.

Use one SaaS integration for Email security to sync with your directory of users, take actions on delivered emails, automatically provide EMLs for reclassification requests for clean emails, discover CASB findings and more.

With the other integration, you can have a separate SaaS integration for CASB findings for another SaaS provider.

Refer to [Add an integration](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/) to learn more about this feature.

![CASB-EmailSecurity](https://developers.cloudflare.com/_astro/CASB-EmailSecurity.B1wd9be2_PR5LD.webp) 

This feature is available across these Email security packages:

* **Enterprise**
* **Enterprise + PhishGuard**

## 2025-03-21

[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Secure DNS Locations Management User Role**   

We're excited to introduce the [**Cloudflare Zero Trust Secure DNS Locations Write role**](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/#secure-dns-locations), designed to provide DNS filtering customers with granular control over third-party access when configuring their Protective DNS (PDNS) solutions.

Many DNS filtering customers rely on external service partners to manage their DNS location endpoints. This role allows you to grant access to external parties to administer DNS locations without overprovisioning their permissions.

**Secure DNS Location Requirements:**

* Mandate usage of [Bring your own DNS resolver IP addresses ↗](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/#bring-your-own-dns-resolver-ip) if available on the account.
* Require source network filtering for IPv4/IPv6/DoT endpoints; token authentication or source network filtering for the DoH endpoint.

You can assign the new role via Cloudflare Dashboard (`Manage Accounts > Members`) or via API. For more information, refer to the [Secure DNS Locations documentation ↗](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/#secure-dns-locations).

## 2025-03-17

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**Cloudflare One Agent for Android (version 2.4)**   

A new GA release for the Android Cloudflare One Agent is now available in the [Google Play Store ↗](https://play.google.com/store/apps/details?id=com.cloudflare.cloudflareoneagent). This release includes a new feature allowing [team name insertion by URL](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/#enroll-using-a-url) during enrollment, as well as fixes and minor improvements.

**Changes and improvements**

* Improved in-app error messages.
* Improved mobile client login with support for [team name insertion by URL](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/#enroll-using-a-url).
* Fixed an issue preventing admin split tunnel settings taking priority for traffic from certain applications.

## 2025-03-17

[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**Cloudflare One Agent for iOS (version 1.10)**   

A new GA release for the iOS Cloudflare One Agent is now available in the [iOS App Store ↗](https://apps.apple.com/us/app/cloudflare-one-agent/id6443476492). This release includes a new feature allowing [team name insertion by URL](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/#enroll-using-a-url) during enrollment, as well as fixes and minor improvements.

**Changes and improvements**

* Improved in-app error messages.
* Improved mobile client login with support for [team name insertion by URL](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/#enroll-using-a-url).
* Bug fixes and performance improvements.

## 2025-03-13

[ Cloudflare Network Firewall ](https://developers.cloudflare.com/cloudflare-network-firewall/) 

  
**Cloudflare IP Ranges List**   

Magic Firewall now supports a new managed list of Cloudflare IP ranges. This list is available as an option when creating a Magic Firewall policy based on IP source/destination addresses. When selecting "is in list" or "is not in list", the option "**Cloudflare IP Ranges**" will appear in the dropdown menu.

This list is based on the IPs listed in the Cloudflare [IP ranges ↗](https://www.cloudflare.com/en-gb/ips/). Updates to this managed list are applied automatically.

![Cloudflare IPs Managed List](https://developers.cloudflare.com/_astro/cloudflare-ips.DetyOndL_10JG5B.webp) 

Note: IP Lists require a Cloudflare Advanced Network Firewall subscription. For more details about Cloudflare Network Firewall plans, refer to [Plans](https://developers.cloudflare.com/cloudflare-network-firewall/plans).

## 2025-03-07

[ Digital Experience Monitoring ](https://developers.cloudflare.com/cloudflare-one/insights/dex/) 

  
**Cloudflare One Agent now supports Endpoint Monitoring**   

[Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) provides visibility into device, network, and application performance across your Cloudflare SASE deployment. The latest release of the Cloudflare One agent (v2025.1.861) now includes device endpoint monitoring capabilities to provide deeper visibility into end-user device performance which can be analyzed directly from the dashboard.

Device health metrics are now automatically collected, allowing administrators to:

* View the last network a user was connected to
* Monitor CPU and RAM utilization on devices
* Identify resource-intensive processes running on endpoints
![Device endpoint monitoring dashboard](https://developers.cloudflare.com/_astro/cloudflare-one-agent-health-monitoring.XXtiRuOp_Z25TN9Q.webp) 

This feature complements existing DEX features like [synthetic application monitoring](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/) and [network path visualization](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/traceroute/), creating a comprehensive troubleshooting workflow that connects application performance with device state.

For more details refer to our [DEX](https://developers.cloudflare.com/cloudflare-one/insights/dex/) documentation.

## 2025-03-04

[ Browser Isolation ](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) 

  
**Gain visibility into user actions in Zero Trust Browser Isolation sessions**   

We're excited to announce that new logging capabilities for [Remote Browser Isolation (RBI)](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) through [Logpush](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/) are available in Beta starting today!

With these enhanced logs, administrators can gain visibility into end user behavior in the remote browser and track blocked data extraction attempts, along with the websites that triggered them, in an isolated session.

```

{

  "AccountID": "$ACCOUNT_ID",

  "Decision": "block",

  "DomainName": "www.example.com",

  "Timestamp": "2025-02-27T23:15:06Z",

  "Type": "copy",

  "UserID": "$USER_ID"

}


```

User Actions available:

* **Copy & Paste**
* **Downloads & Uploads**
* **Printing**

Learn more about how to get started with Logpush in our [documentation](https://developers.cloudflare.com/logs/logpush/).

## 2025-03-03

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**New SAML and OIDC Fields and SAML transforms for Access for SaaS**   

[Access for SaaS applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/) now include more configuration options to support a wider array of SaaS applications.

**SAML and OIDC Field Additions**

OIDC apps now include:

* Group Filtering via RegEx
* OIDC Claim mapping from an IdP
* OIDC token lifetime control
* Advanced OIDC auth flows including hybrid and implicit flows
![OIDC field additions](https://developers.cloudflare.com/_astro/oidc-claims.2di8l9Lv_ZrD1mx.webp) 

SAML apps now include improved SAML attribute mapping from an IdP.

![SAML field additions](https://developers.cloudflare.com/_astro/saml-attribute-statements.CW45j5Qi_1ydeSQ.webp) 

**SAML transformations**

SAML identities sent to Access applications can be fully customized using JSONata expressions. This allows admins to configure the precise identity SAML statement sent to a SaaS application.

![Configured SAML statement sent to application](https://developers.cloudflare.com/_astro/transformation-box.DyKn-DdN_2rtirg.webp) 

## 2025-03-01

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Use Logpush for Email security detections**   

You can now send detection logs to an endpoint of your choice with Cloudflare Logpush.

Filter logs matching specific criteria you have set and select from over 25 fields you want to send. When creating a new Logpush job, remember to select **Email security alerts** as the dataset.

![logpush-detections](https://developers.cloudflare.com/_astro/Logpush-Detections.Dc5tHta3_1PsIMk.webp) 

For more information, refer to [Enable detection logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/email-security-logs/#enable-detection-logs).

This feature is available across these Email security packages:

* **Enterprise**
* **Enterprise + PhishGuard**

## 2025-02-27

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Check status of Email security or Area 1**   

Concerns about performance for Email security or Area 1? You can now check the operational status of both on the [Cloudflare Status page ↗](https://www.cloudflarestatus.com/).

For Email security, look under **Cloudflare Sites and Services**.

* **Dashboard** is the dashboard for Cloudflare, including Email security
* **Email security (Zero Trust)** is the processing of email
* **API** are the Cloudflare endpoints, including the ones for Email security

For Area 1, under **Cloudflare Sites and Services**:

* **Area 1 - Dash** is the dashboard for Cloudflare, including Email security
* **Email security (Area1)** is the processing of email
* **Area 1 - API** are the Area 1 endpoints
![Status-page](https://developers.cloudflare.com/_astro/Status-Page.DcFJ1286_2qTtkN.webp) 

This feature is available across these Email security packages:

* **Advantage**
* **Enterprise**
* **Enterprise + PhishGuard**

## 2025-02-25

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Use DLP Assist for M365**   

Cloudflare Email security customers who have Microsoft 365 environments can quickly deploy an Email DLP (Data Loss Prevention) solution for free.

Simply deploy our add-in, create a DLP policy in Cloudflare, and configure Outlook to trigger behaviors like displaying a banner, alerting end users before sending, or preventing delivery entirely.

Refer to [Outbound Data Loss Prevention](https://developers.cloudflare.com/cloudflare-one/email-security/outbound-dlp/) to learn more about this feature.

In GUI alert:

![DLP-Alert](https://developers.cloudflare.com/_astro/DLP-Alert.5s-fbKn3_1xfB14.webp) 

Alert before sending:

![DLP-Pop-up](https://developers.cloudflare.com/_astro/DLP-Pop-up.0gkYy7o5_ZgIo8K.webp) 

Prevent delivery:

![DLP-Blocked](https://developers.cloudflare.com/_astro/DLP-Blocked.CmQkGrnM_ZewJi3.webp) 

This feature is available across these Email security packages:

* **Enterprise**
* **Enterprise + PhishGuard**

## 2025-02-14

[ Cloudflare One Appliance ](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/)[ Cloudflare One ](https://developers.cloudflare.com/cloudflare-one/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/) 

  
**Configure your Magic WAN Connector to connect via static IP assignment**   

You can now locally configure your [Magic WAN Connector](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/) to work in a static IP configuration.

This local method does not require having access to a DHCP Internet connection. However, it does require being comfortable with using tools to access the serial port on Magic WAN Connector as well as using a serial terminal client to access the Connector's environment.

For more details, refer to [WAN with a static IP address](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/configure-hardware-appliance/#bootstrap-via-serial-console).

## 2025-02-07

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Open email links with Security Center**   

You can now investigate links in emails with Cloudflare Security Center to generate a report containing a myriad of technical details: a phishing scan, SSL certificate data, HTTP request and response data, page performance data, DNS records, what technologies and libraries the page uses, and more.

![Open links in Security Center](https://developers.cloudflare.com/_astro/Open-Links-Security-Center.b-LJU4YB_2dBHq8.webp) 

From **Investigation**, go to **View details**, and look for the **Links identified** section. Select **Open in Security Center** next to each link. **Open in Security Center** allows your team to quickly generate a detailed report about the link with no risk to the analyst or your environment.

For more details, refer to [Open links](https://developers.cloudflare.com/cloudflare-one/email-security/investigation/search-email/#open-links).

This feature is available across these Email security packages:

* **Advantage**
* **Enterprise**
* **Enterprise + PhishGuard**

## 2025-02-03

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/)[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) 

  
**Block files that are password-protected, compressed, or otherwise unscannable.**   

Gateway HTTP policies can now block files that are password-protected, compressed, or otherwise unscannable.

These unscannable files are now matched with the [Download and Upload File Types traffic selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#download-and-upload-file-types) for HTTP policies:

* Password-protected Microsoft Office document
* Password-protected PDF
* Password-protected ZIP archive
* Unscannable ZIP archive

To get started inspecting and modifying behavior based on these and other rules, refer to [HTTP filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/http/).

## 2025-01-20

[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) 

  
**Detect source code leaks with Data Loss Prevention**   

You can now detect source code leaks with Data Loss Prevention (DLP) with predefined checks against common programming languages.

The following programming languages are validated with natural language processing (NLP).

* C
* C++
* C#
* Go
* Haskell
* Java
* JavaScript
* Lua
* Python
* R
* Rust
* Swift

DLP also supports confidence level for [source code profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/#source-code).

For more details, refer to [DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/).

## 2025-01-15

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Export SSH command logs with Access for Infrastructure using Logpush**   

Availability

Only available on Enterprise plans.

Cloudflare now allows you to send SSH command logs to storage destinations configured in [Logpush](https://developers.cloudflare.com/logs/logpush/), including third-party destinations. Once exported, analyze and audit the data as best fits your organization! For a list of available data fields, refer to the [SSH logs dataset](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/ssh%5Flogs/).

To set up a Logpush job, refer to [Logpush integration](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/).

## 2024-12-19

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Escalate user submissions**   

After you triage your users' submissions (that are machine reviewed), you can now escalate them to our team for reclassification (which are instead human reviewed). User submissions from the submission alias, PhishNet, and our API can all be escalated.

![Escalate](https://developers.cloudflare.com/_astro/Escalate.CwXPIyM3_ZxuRN6.webp) 

From **Reclassifications**, go to **User submissions**. Select the three dots next to any of the user submissions, then select **Escalate** to create a team request for reclassification. The Cloudflare dashboard will then show you the submissions on the **Team Submissions** tab.

Refer to [User submissions](https://developers.cloudflare.com/cloudflare-one/email-security/submissions/user-submissions/) to learn more about this feature.

This feature is available across these Email security packages:

* **Advantage**
* **Enterprise**
* **Enterprise + PhishGuard**

## 2024-12-19

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Increased transparency for phishing email submissions**   

You now have more transparency about team and user submissions for phishing emails through a **Reclassification** tab in the Zero Trust dashboard.

Reclassifications happen when users or admins [submit a phish](https://developers.cloudflare.com/cloudflare-one/email-security/settings/phish-submissions/) to Email security. Cloudflare reviews and - in some cases - reclassifies these emails based on improvements to our machine learning models.

This new tab increases your visibility into this process, allowing you to view what submissions you have made and what the outcomes of those submissions are.

![Use the Reclassification area to review submitted phishing emails](https://developers.cloudflare.com/_astro/reclassifications-tab.yDgtjG51_Z1TVbIE.webp) 

## 2024-12-19

[ Cloudflare Tunnel ](https://developers.cloudflare.com/tunnel/)[ Cloudflare Tunnel for SASE ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) 

  
**Troubleshoot tunnels with diagnostic logs**   

The latest `cloudflared` build [2024.12.2 ↗](https://github.com/cloudflare/cloudflared/releases/tag/2024.12.2) introduces the ability to collect all the diagnostic logs needed to troubleshoot a `cloudflared` instance.

A diagnostic report collects data from a single instance of `cloudflared` running on the local machine and outputs it to a `cloudflared-diag` file.

For more information, refer to [Diagnostic logs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/diag-logs/).

## 2024-12-17

[ Magic Transit ](https://developers.cloudflare.com/magic-transit/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/)[ Network Interconnect ](https://developers.cloudflare.com/network-interconnect/) 

  
**Establish BGP peering over Direct CNI circuits**   

Magic WAN and Magic Transit customers can use the Cloudflare dashboard to configure and manage BGP peering between their networks and their Magic routing table when using a Direct CNI on-ramp.

Using BGP peering allows customers to:

* Automate the process of adding or removing networks and subnets.
* Take advantage of failure detection and session recovery features.

With this functionality, customers can:

* Establish an eBGP session between their devices and the Magic WAN / Magic Transit service when connected via CNI.
* Secure the session by MD5 authentication to prevent misconfigurations.
* Exchange routes dynamically between their devices and their Magic routing table.

Refer to [Magic WAN BGP peering](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-routes/#configure-bgp-routes) or [Magic Transit BGP peering](https://developers.cloudflare.com/magic-transit/how-to/configure-routes/#configure-bgp-routes) to learn more about this feature and how to set it up.

## 2024-12-05

[ Multi-Cloud Networking ](https://developers.cloudflare.com/multi-cloud-networking/) 

  
**Generate customized terraform files for building cloud network on-ramps**   

You can now generate customized terraform files for building cloud network on-ramps to [Magic WAN](https://developers.cloudflare.com/cloudflare-wan/).

[Magic Cloud](https://developers.cloudflare.com/multi-cloud-networking/) can scan and discover existing network resources and generate the required terraform files to automate cloud resource deployment using their existing infrastructure-as-code workflows for cloud automation.

You might want to do this to:

* Review the proposed configuration for an on-ramp before deploying it with Cloudflare.
* Deploy the on-ramp using your own infrastructure-as-code pipeline instead of deploying it with Cloudflare.

For more details, refer to [Set up with Terraform](https://developers.cloudflare.com/multi-cloud-networking/cloud-on-ramps/#set-up-with-terraform).

## 2024-11-22

[ CASB ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/) 

  
**Find security misconfigurations in your AWS cloud environment**   

You can now use CASB to find security misconfigurations in your AWS cloud environment using [Data Loss Prevention](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/).

You can also [connect your AWS compute account](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/aws-s3/#compute-account) to extract and scan your S3 buckets for sensitive data while avoiding egress fees. CASB will scan any objects that exist in the bucket at the time of configuration.

To connect a compute account to your AWS integration:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Cloud & SaaS findings** \> **Integrations**.
2. Find and select your AWS integration.
3. Select **Open connection instructions**.
4. Follow the instructions provided to connect a new compute account.
5. Select **Refresh**.

## 2024-11-21

[ Browser Isolation ](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) 

  
**Improved non-English keyboard support**   

You can now type in languages that use diacritics (like á or ç) and character-based scripts (such as Chinese, Japanese, and Korean) directly within the remote browser. The isolated browser now properly recognizes non-English keyboard input, eliminating the need to copy and paste content from a local browser or device.

## 2024-11-07

[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/) 

  
**Use Logpush for Email security user actions**   

You can now send user action logs for Email security to an endpoint of your choice with Cloudflare Logpush.

Filter logs matching specific criteria you have set or select from multiple fields you want to send. For all users, we will log the date and time, user ID, IP address, details about the message they accessed, and what actions they took.

When creating a new Logpush job, remember to select **Audit logs** as the dataset and filter by:

* **Field**: `"ResourceType"`
* **Operator**: `"starts with"`
* **Value**: `"email_security"`.
![Logpush-user-actions](https://developers.cloudflare.com/_astro/Logpush-User-Actions.D14fWgmq_CYM35.webp) 

For more information, refer to [Enable user action logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/email-security-logs/#enable-user-action-logs).

This feature is available across all Email security packages:

* **Enterprise**
* **Enterprise + PhishGuard**

## 2024-10-02

[ Cloudflare Network Firewall ](https://developers.cloudflare.com/cloudflare-network-firewall/) 

  
**Search for custom rules using rule name and/or ID**   

The Magic Firewall dashboard now allows you to search custom rules using the rule name and/or ID.

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account.
2. Go to **Analytics & Logs** \> **Network Analytics**.
3. Select **Magic Firewall**.
4. Add a filter for **Rule ID**.
![Search for firewall rules with rule IDs](https://developers.cloudflare.com/_astro/search-with-rule-id.DJgzqgKk_2jJ9x8.webp) 

Additionally, the rule ID URL link has been added to Network Analytics.

## 2024-10-01

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) 

  
**Eliminate long-lived credentials and enhance SSH security with Cloudflare Access for Infrastructure**   

Organizations can now eliminate long-lived credentials from their SSH setup and enable strong multi-factor authentication for SSH access, similar to other Access applications, all while generating access and command logs.

SSH with [Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/) uses short-lived SSH certificates from Cloudflare, eliminating SSH key management and reducing the security risks associated with lost or stolen keys. It also leverages a common deployment model for Cloudflare One customers: [WARP-to-Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-device-client/).

SSH with Access for Infrastructure enables you to:

* **Author fine-grained policy** to control who may access your SSH servers, including specific ports, protocols, and SSH users.
* **Monitor infrastructure access** with Access and SSH command logs, supporting regulatory compliance and providing visibility in case of security breach.
* **Preserve your end users' workflows.** SSH with Access for Infrastructure supports native SSH clients and does not require any modifications to users’ SSH configs.
![Example of an infrastructure Access application](https://developers.cloudflare.com/_astro/infrastructure-app.BhpJOgxs_Z1M0wLH.webp) 

To get started, refer to [SSH with Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/).

## 2024-06-17

[ Risk Score ](https://developers.cloudflare.com/cloudflare-one/insights/risk-score/) 

  
**Exchange user risk scores with Okta**   

Beyond the controls in [Zero Trust](https://developers.cloudflare.com/cloudflare-one/), you can now [exchange user risk scores](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/risk-score/#send-risk-score-to-okta) with Okta to inform SSO-level policies.

First, configure Cloudflare One to send user risk scores to Okta.

1. Set up the [Okta SSO integration](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/okta/).
2. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
3. In **Your identity providers**, locate your Okta integration and select **Edit**.
4. Turn on **Send risk score to Okta**.
5. Select **Save**.
6. Upon saving, Cloudflare One will display the well-known URL for your organization. Copy the value.

Next, configure Okta to receive your risk scores.

1. On your Okta admin dashboard, go to **Security** \> **Device Integrations**.
2. Go to **Receive shared signals**, then select **Create stream**.
3. Name your integration. In **Set up integration with**, choose _Well-known URL_.
4. In **Well-known URL**, enter the well-known URL value provided by Cloudflare One.
5. Select **Create**.

## 2024-06-16

[ Access ](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/)[ Browser Isolation ](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/)[ CASB ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/)[ Cloudflare Tunnel for SASE ](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)[ Digital Experience Monitoring ](https://developers.cloudflare.com/cloudflare-one/insights/dex/)[ Data Loss Prevention ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/)[ Email security ](https://developers.cloudflare.com/cloudflare-one/email-security/)[ Gateway ](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)[ Multi-Cloud Networking ](https://developers.cloudflare.com/multi-cloud-networking/)[ Cloudflare Network Firewall ](https://developers.cloudflare.com/cloudflare-network-firewall/)[ Network Flow ](https://developers.cloudflare.com/network-flow/)[ Magic Transit ](https://developers.cloudflare.com/magic-transit/)[ Cloudflare WAN ](https://developers.cloudflare.com/cloudflare-wan/)[ Network Interconnect ](https://developers.cloudflare.com/network-interconnect/)[ Risk Score ](https://developers.cloudflare.com/cloudflare-one/insights/risk-score/)[ Cloudflare One Client ](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) 

  
**Explore product updates for Cloudflare One**   

Welcome to your new home for product updates on [Cloudflare One](https://developers.cloudflare.com/cloudflare-one/).

Our [new changelog](https://developers.cloudflare.com/changelog/) lets you read about changes in much more depth, offering in-depth examples, images, code samples, and even gifs.

If you are looking for older product updates, refer to the following locations.

Older product updates

* [Access](https://developers.cloudflare.com/cloudflare-one/changelog/access/)
* [Browser Isolation](https://developers.cloudflare.com/cloudflare-one/changelog/browser-isolation/)
* [CASB](https://developers.cloudflare.com/cloudflare-one/changelog/casb/)
* [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/changelog/tunnel/)
* [Data Loss Prevention](https://developers.cloudflare.com/cloudflare-one/changelog/dlp/)
* [Digital Experience Monitoring](https://developers.cloudflare.com/cloudflare-one/changelog/dex/)
* [Email security](https://developers.cloudflare.com/cloudflare-one/changelog/email-security/)
* [Gateway](https://developers.cloudflare.com/cloudflare-one/changelog/gateway/)
* [Multi-Cloud Networking](https://developers.cloudflare.com/multi-cloud-networking/changelog/)
* [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/changelog/)
* [Magic Network Monitoring](https://developers.cloudflare.com/network-flow/changelog/)
* [Magic Transit](https://developers.cloudflare.com/magic-transit/changelog/)
* [Magic WAN](https://developers.cloudflare.com/cloudflare-wan/changelog/)
* [Network Interconnect](https://developers.cloudflare.com/network-interconnect/changelog/)
* [Risk score](https://developers.cloudflare.com/cloudflare-one/changelog/risk-score/)
* [Cloudflare One Client](https://developers.cloudflare.com/changelog/cloudflare-one-client/)

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/cloudflare-one/changelog/#page","headline":"Changelog · Cloudflare One docs","description":"Review recent changes to Cloudflare One.","url":"https://developers.cloudflare.com/cloudflare-one/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/changelog/","name":"Changelog"}}]}
```
