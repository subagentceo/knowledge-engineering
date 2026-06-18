---
title: Cloudflare OWASP Core Ruleset
description: Configure the Cloudflare OWASP Core Ruleset for your zone.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare OWASP Core Ruleset

The Cloudflare OWASP Core Ruleset is Cloudflare's implementation of the [OWASP ModSecurity Core Rule Set ↗](https://owasp.org/www-project-modsecurity-core-rule-set/) (CRS) version 3.3.0.

The Cloudflare OWASP Core Ruleset is designed to work as a single entity to calculate a [threat score](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#request-threat-score) and execute an action based on that score. When a rule in the ruleset matches a request, the threat score increases according to the rule score. If the final threat score is greater than the configured [score threshold](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#score-threshold), Cloudflare executes the action configured in the last rule of the ruleset.

Warning

The Cloudflare OWASP Core Ruleset is prone to false positives and offers only marginal benefits when added on top of Cloudflare Managed Ruleset and WAF attack score. If you decide to deploy this managed ruleset, you will need to monitor and adjust its settings based on your traffic to prevent false positives.

## OWASP Top 10 versus Cloudflare Rulesets

The Cloudflare OWASP Core Ruleset is Cloudflare's implementation of the OWASP ModSecurity Core Rule Set version 3.3.0, which is different from the [OWASP Top 10 ↗](https://owasp.org/www-project-top-ten/).

The [OWASP Top 10 ↗](https://owasp.org/www-project-top-ten/) is a list of the most severe application security risks, designed to raise awareness among practitioners and developers. While some risks can be addressed by a web application firewall, others require different solutions or must be mitigated during application development. Specifically:

* Cryptographic Failures
* Insecure Design
* Identification and Authentication Failures
* Security Logging and Monitoring Failures

These risks depend more on how the application is built or how the entire monitoring pipeline is set up.

### Cloudflare products versus OWASP Top 10

While both the Cloudflare Managed Ruleset and OWASP CRS aim to mitigate several categories of the OWASP Top 10, their approaches differ. OWASP CRS v3.3 is a generalized, "scoring-based" open-source ruleset that often requires manual tuning. In contrast, the Cloudflare Managed Ruleset is a proprietary, signature-heavy engine backed by Cloudflare's massive global threat intelligence. Furthermore, Cloudflare rapidly deploys protections for new CVEs through its managed ruleset, whereas the OWASP CRS remains relatively static.

The following table outlines how Cloudflare products map to the OWASP categories.

| OWASP Top 10 category          | OWASP Core Rule Set (v3.3)                                                                           | Cloudflare Managed Ruleset                                                                                                                               | Other Cloudflare products                                                                                                                                                                     |
| ------------------------------ | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A01: Broken Access Control     | Targets Path Traversal (930XXX) and App Defect detection (for example, .env, .git access).           | Uses proprietary signatures for Insecure Direct Object References and Directory Traversal.                                                               | Security Rules are used for granular IP/Geo/ASN enforcement.                                                                                                                                  |
| A02: Cryptographic Failures    | N/A                                                                                                  | N/A                                                                                                                                                      | The Cloudflare platform provides platform-level controls for HTTP Strict Transport Security, Minimum TLS versions, and automated certificate management. Post-quantum encryption ready.       |
| A03: Injection (SQLi, XSS)     | Comprehensive: Uses Regex-based scoring for SQLi (942XXX), XSS (941XXX), and RCE (932XXX).           | Combines fast signature matching with Attack Score to catch highly obfuscated payloads. Smart decoding pre-processing is applied to prevent obfuscation. | The ML-based Cloudflare Attack Score complements managed rulesets by detecting attack variations and bypasses.                                                                                |
| A04: Insecure Design           | N/A                                                                                                  | N/A                                                                                                                                                      | API Schema Validation helps mitigate protocol enforcement that might stem from poor design (for example HTTP Method enforcement)                                                              |
| A05: Security Misconfiguration | Detects directory indexing, default error messages, and protocol violations via 920XXX.              | Includes a broad suite of Managed Rules for hardening specific CMS platforms (such as WordPress and Magento) against known misconfigs.                   |                                                                                                                                                                                               |
| A06: Outdated Components       | General rules may catch exploits, but it does not maintain a database of specific software versions. | Proactive Virtual Patching for newly discovered CVEs (for example, Log4Shell, React2Shell) often deployed within minutes or hours of disclosure.         | The ML-based Cloudflare Attack Score complements managed rulesets by detecting attack variations and bypasses.                                                                                |
| A07: Identification & Auth     | N/A                                                                                                  | N/A                                                                                                                                                      | Leaked Credential Check, Bot Management and Account Abuse Protection are designed to stop automated stuffing attacks and other auth-based vulnerabilities.                                    |
| A08: Software & Data Integrity | Dedicated rules for Insecure Deserialization (944XXX) and PHP injection.                             | Signatures for common serialization exploits and supply chain attack patterns (for example, SolarWinds/Mimecast).                                        | Cloudflare Client-side security monitors scripts, connections, and cookies loaded by your website visitors                                                                                    |
| A09: Logging & Monitoring      | N/A                                                                                                  | N/A                                                                                                                                                      | The Cloudflare platform offers integrated dashboard with real-time analytics, Logpush to SIEMs, and automated anomaly alerting. LogExplorer is Cloudflare's observability and forensics tool. |
| A10: SSRF                      | Rules (934XXX) block requests to internal IPs and cloud metadata services (AWS, Azure, GCP).         | Identifies SSRF signatures and allows users to easily block outbound requests to sensitive metadata endpoints.                                           | \-                                                                                                                                                                                            |

## Resources

* [ Concepts ](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/)
* [ OWASP evaluation example ](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/example/)
* [ Configure in the dashboard ](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/configure-dashboard/)
* [ Configure via API ](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/configure-api/)
* [ Configure in Terraform ](https://developers.cloudflare.com/terraform/additional-configurations/waf-managed-rulesets/#configure-the-owasp-paranoia-level-score-threshold-and-action)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/#page","headline":"Cloudflare OWASP Core Ruleset · Cloudflare Web Application Firewall (WAF) docs","description":"Configure the Cloudflare OWASP Core Ruleset for your zone.","url":"https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/reference/","name":"Rulesets reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/managed-rules/reference/owasp-core-ruleset/","name":"Cloudflare OWASP Core Ruleset"}}]}
```
