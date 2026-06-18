---
title: Enforce HTTPS and encrypt all traffic (Free, Pro, and Business)
description: Configure SSL/TLS encryption from edge to origin, redirect HTTP to HTTPS, and harden your HTTPS setup with HSTS and minimum TLS versions.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enforce HTTPS and encrypt all traffic (Free, Pro, and Business)

HTTPS on Cloudflare involves two separate connections: visitor to Cloudflare, and Cloudflare to your origin server. Both must be encrypted for end-to-end security. This guide walks through five stages:

1. Configure your SSL/TLS encryption mode.
2. Redirect all HTTP requests to HTTPS.
3. Harden your HTTPS setup with minimum TLS versions and HSTS.
4. Monitor third-party scripts on your pages.
5. Verify your configuration.

The core workflow is available on Free, Pro, and Business plans.

Note

Most procedures in this guide are configured per domain or [zone](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones). Select your domain in the Cloudflare dashboard before starting. Client-Side Security is the exception: it is configured at the account level.

## Configure your SSL/TLS encryption mode

Your SSL/TLS encryption mode controls how Cloudflare connects to your origin server. For end-to-end encryption, use **Full (strict)** — it encrypts both connections and verifies your origin certificate. For a detailed comparison of all available modes, refer to [Encryption modes](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/).

### Check your current mode

1. In the Cloudflare dashboard, go to the **SSL/TLS Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls)
2. Check the current encryption mode displayed on the page.  
   * If the mode is already **Full (strict)**, skip to [Redirect all HTTP requests to HTTPS](#redirect-all-http-requests-to-https).  
   * If the mode is not **Full (strict)**, continue below to install an origin certificate (if needed) and change the mode.

### Install a Cloudflare Origin CA certificate

If your origin server does not have a valid SSL certificate, install a free Cloudflare Origin CA certificate. Origin CA certificates are valid for up to 15 years and are trusted by Cloudflare, which means you can set your encryption mode to Full (strict) after installing one.

If your origin already has a valid certificate from a publicly trusted certificate authority, skip to [Set your encryption mode to Full (strict)](#set-your-encryption-mode-to-full-strict).

#### 1\. Create an Origin CA certificate

1. Go to the **Origin Server** page.  
[ Go to **Origin Server** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/origin)
2. On the **Origin Certificates** tab, select **Create Certificate**.
3. Choose either:  
   * **Generate private key and CSR with Cloudflare**: Private key type can be RSA or ECC.  
   * **Use my private key and CSR**: Paste your Certificate Signing Request (CSR) into the text field.
4. List the hostnames (including wildcards) the certificate should protect with SSL encryption. The zone apex and first level wildcard hostname are included by default.
5. Choose a **Certificate Validity** period.
6. Select **Create**.
7. Choose the **Key Format**:  
   * Servers using OpenSSL (such as Apache and NGINX) generally expect PEM files (Base64-encoded ASCII), but also work with binary DER files.  
   * Servers using Windows and Apache Tomcat require PKCS#7 (a `.p7b` file).
8. Copy the signed **Origin Certificate** and **Private Key** into separate files. For security reasons, you cannot see the **Private Key** after you exit this screen.
9. Select **OK**.

Note

For details about working with certificates programmatically, refer to [API calls](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/#api-calls).

#### 2\. Install the certificate on your origin server

1. Upload the Origin CA certificate to your origin web server.
2. Update your web server configuration to use the certificate. For server-specific installation instructions, refer to [Origin CA certificates](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/).
3. (Required for some servers) Upload the [Cloudflare CA root certificate](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/#cloudflare-origin-ca-root-certificate) to your origin server.
4. Enable SSL and port `443` at your origin web server.

Note

If you do not see your server listed, search the [DigiCert documentation ↗](https://www.digicert.com/search-results) or contact your hosting provider.

### Set your encryption mode to Full (strict)

After installing a valid certificate on your origin server, set the encryption mode to **Full (strict)** by following the steps below.

* [ Dashboard ](#tab-panel-11065)
* [ API ](#tab-panel-11066)

To change your encryption mode in the dashboard:

1. In the Cloudflare dashboard, go to the **SSL/TLS Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls)
2. Choose an encryption mode.

To adjust your encryption mode with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `ssl` as the setting name in the URI path, and the `value` parameter set to your desired setting (`off`, `flexible`, `full`, `strict`, or `origin_pull`).

Warning

If your site shows a [526 error](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-526/) after changing the encryption mode, your origin certificate may not meet the requirements for Full (strict). The certificate must be unexpired, issued by a trusted CA or Cloudflare Origin CA, and contain a Common Name (CN) or Subject Alternative Name (SAN) that matches your hostname. For redirect loop issues, refer to [ERR\_TOO\_MANY\_REDIRECTS](https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/).

## Redirect all HTTP requests to HTTPS

Even with an active edge certificate, visitors can still access resources over unsecured HTTP connections. Two settings work together to fix this:

1. Always Use HTTPS redirects HTTP requests to HTTPS
2. Automatic HTTPS Rewrites fixes mixed content references in your page HTML

### Turn on Always Use HTTPS

Always Use HTTPS redirects all HTTP requests to HTTPS before they reach your origin.

Note

If only some parts of your application can support HTTPS traffic, do not turn on Always Use HTTPS. Use a [single redirect](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/) to selectively redirect specific paths to HTTPS instead. Refer to [Redirect admin area requests to HTTPS](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-admin-https/) for an example.

* [ Dashboard ](#tab-panel-11055)
* [ API ](#tab-panel-11056)

1. In the Cloudflare dashboard, go to the **SSL/TLS Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls)
2. Make sure that your [SSL/TLS encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) is not set to **Off**. When the encryption mode is Off, the Always Use HTTPS option is not visible in the dashboard.
3. Go to the [**Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates) page.
4. Turn on **Always Use HTTPS**.

1. Make sure that your [SSL/TLS encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) is not set to **Off**.
2. Send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `always_use_https` as the setting name in the URI path, and the `value` parameter set to `"on"`.

### Turn on Automatic HTTPS Rewrites

Automatic HTTPS Rewrites prevents mixed content errors by rewriting HTTP resource URLs in your page HTML to HTTPS. This is useful for sites where you do not control all asset URLs, such as CMS-hosted content or embedded third-party resources.

* [ Dashboard ](#tab-panel-11057)
* [ API ](#tab-panel-11058)

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **Automatic HTTPS Rewrites**, switch the toggle to **On**.

Send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `automatic_https_rewrites` as the setting name in the URI path, and the `value` parameter set to `"on"`.

Note

Automatic HTTPS Rewrites does not rewrite all HTTP URLs. Some passive content (such as images) may not be rewritten, which can still cause mixed content warnings. For details on how rewrites work and troubleshooting, refer to [Automatic HTTPS Rewrites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites/) and [Mixed content errors](https://developers.cloudflare.com/ssl/troubleshooting/mixed-content-errors/).

## Harden your HTTPS configuration

After your encryption mode is set and HTTP traffic is redirected, strengthen your configuration by setting a minimum TLS version, turning on HTTP Strict Transport Security (HSTS), and turning on TLS 1.3.

### Set your minimum TLS version

TLS 1.0 and 1.1 have known vulnerabilities and are no longer considered secure. Setting the minimum TLS version to 1.2 blocks connections from clients using older protocols. For guidance on which version to choose, refer to [TLS protocols](https://developers.cloudflare.com/ssl/reference/protocols/).

* [ Dashboard ](#tab-panel-11059)
* [ API ](#tab-panel-11060)

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **Minimum TLS Version**, select **TLS 1.2**.

Send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `min_tls_version` as the setting name in the URI path, and the `value` parameter set to `"1.2"`.

Per-hostname minimum TLS version requires Advanced Certificate Manager

To set minimum TLS versions for individual hostnames instead of the entire zone, refer to [Per-hostname setup](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/#per-hostname). This requires an [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) subscription.

### Turn on TLS 1.3

TLS 1.3 provides faster handshakes and improved security over TLS 1.2.

* [ Dashboard ](#tab-panel-11061)
* [ API ](#tab-panel-11062)

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **TLS 1.3**, switch the toggle to **On**.

Send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `tls_1_3` as the setting name in the URI path, and the `value` parameter set to `"on"`. To also turn on 0-RTT (Zero Round Trip Time Resumption), set the value to `"zrt"`.

### Turn on HSTS

HTTP Strict Transport Security (HSTS) adds a response header that tells browsers to connect to your site over HTTPS only, even if a link or redirect tries to send them over HTTP. HSTS protects against protocol downgrade attacks.

Warning

Only turn on HSTS after your HTTPS configuration is fully working and tested. If you remove HTTPS before disabling HSTS or before waiting for the duration of the original **Max Age Header**, your website becomes inaccessible to visitors for the Max Age Header duration or until you re-enable HTTPS. Refer to [HTTP Strict Transport Security (HSTS)](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/) before configuring.

Before turning on HSTS, confirm these prerequisites:

* HTTPS is enabled and working on your domain.
* Your DNS records are set to [Proxied](https://developers.cloudflare.com/dns/proxy-status/).
* You are not redirecting HTTPS to HTTP anywhere.

* [ Dashboard ](#tab-panel-11063)
* [ API ](#tab-panel-11064)

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **HTTP Strict Transport Security (HSTS)**, select **Enable HSTS**.
3. Read the dialog and select **I understand**.
4. Select **Next**.
5. Configure the HSTS settings:  
   * **Max Age Header**: Choose a duration (start with 6 months, increase to 12 months after confirming stability).  
   * **Apply HSTS policy to subdomains (includeSubDomains)**: Turn on if all your subdomains support HTTPS. Subdomains without HTTPS become inaccessible when this is enabled.  
   * **Preload**: Turn on only after setting Max Age Header to 12 months. Preload inclusion prevents downgrade attacks on the first visit. Submit your domain at [hstspreload.org ↗](https://hstspreload.org) after turning on preload.  
   * **No-Sniff Header**: Sends the `X-Content-Type-Options: nosniff` header. Turn on to prevent browsers from MIME-type sniffing.
6. Select **Save**.

Send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `security_header` as the setting name in the URI path, and specify the `value` object that includes your HSTS settings.

### Review your cipher suites

Cloudflare's default cipher suites provide strong encryption for most sites. You do not need to change them unless a security audit or compliance requirement specifies particular cipher configurations.

For details on the default cipher suites and how to customize them, refer to [Cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/). For compliance-specific cipher configurations, refer to [Customize cipher suites via API](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/api/).

Custom cipher suites require Advanced Certificate Manager

Customizing cipher suites requires an [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) subscription. The default cipher suites are applied automatically on all plans.

## Monitor third-party scripts with client-side security

HTTPS encrypts data in transit, but third-party scripts loaded by your pages can still exfiltrate data from the browser. Client-side security monitors these scripts and alerts you to unexpected additions.

### Turn on script monitoring

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Client-side abuse**.
3. Turn on **Continuous script monitoring**.

### Review detected resources

After turning on monitoring, it may take some time for Cloudflare to generate a list of detected scripts on your domain.

1. In the Cloudflare dashboard, go to the **Web assets** page.  
[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Select the **Client-side resources** tab.
3. Review the list of detected scripts. Check for unknown or unexpected scripts from domains you do not recognize.

Depending on your Cloudflare plan, you may also be able to review connections made by scripts and check them for malicious activity. For setup details, refer to [Get started with client-side security](https://developers.cloudflare.com/client-side-security/get-started/).

Content security rules require Client-Side Security Advanced

To block scripts not on your approved list, you can create content security rules that define an allowlist. This requires the Client-Side Security Advanced add-on. Refer to [Content security rules](https://developers.cloudflare.com/client-side-security/rules/) for setup instructions.

## Verify your configuration

After completing the previous stages, verify that your HTTPS configuration works as expected.

### Use Automatic SSL/TLS

Cloudflare's Automatic SSL/TLS analyzes your origin server and selects the most secure encryption mode your origin supports. If your zone uses Automatic SSL/TLS (the default for new zones), Cloudflare adjusts the mode automatically and will not downgrade to a less secure mode if your origin certificate expires.

To check whether your zone uses Automatic SSL/TLS:

1. In the Cloudflare dashboard, go to the **SSL/TLS Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls)
2. Check whether **Automatic SSL/TLS** or **Custom SSL/TLS** is selected. If Custom is selected and you want Cloudflare to manage the mode automatically, select **Automatic SSL/TLS**.

Note

The SSL/TLS Recommender is deprecated in favor of Automatic SSL/TLS. If you previously used the Recommender, Automatic SSL/TLS replaces it. Refer to [SSL/TLS Recommender](https://developers.cloudflare.com/ssl/origin-configuration/ssl-tls-recommender/) for migration details.

### Test with external tools

Use [SSL Labs Server Test ↗](https://www.ssllabs.com/ssltest/) to verify your HTTPS configuration from outside the Cloudflare network. Enter your domain and review the report. An A or A+ grade indicates that your TLS configuration, certificate chain, and protocol support meet current security standards.

To test supported TLS versions, attempt a request to your website or application while specifying a TLS version.

For example, to test TLS 1.1, use the `curl` command below. Replace `www.example.com` with your Cloudflare domain and hostname.

Terminal window

```

curl https://www.example.com -svo /dev/null --tls-max 1.1


```

If the TLS version you are testing is blocked by Cloudflare, the TLS handshake is not completed and returns an error:

`* error:1400442E:SSL routines:CONNECT_CR_SRVR_HELLO:tlsv1 alert`

Note

Local VPN or a device security client may prevent insecure connections using legacy protocols like TLS 1.0\. Make sure to disable such network or security client before running the test on your device.

PCI DSS compliance

For PCI DSS compliance, TLS 1.2 is the minimum required version. Refer to [PCI compliance and vulnerabilities mitigation](https://developers.cloudflare.com/ssl/reference/compliance-and-vulnerabilities/) for details.

## Related resources

**SSL/TLS**

* [Get started with SSL/TLS](https://developers.cloudflare.com/ssl/get-started/) — onboarding guide for edge certificates, encryption modes, and HTTPS enforcement
* [Encryption modes](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) — detailed explanation of Off, Flexible, Full, and Full (strict) modes
* [Cloudflare Origin CA](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/) — create free origin certificates trusted by Cloudflare
* [Mixed content errors](https://developers.cloudflare.com/ssl/troubleshooting/mixed-content-errors/) — troubleshoot HTTP resources loaded on HTTPS pages
* [ERR\_TOO\_MANY\_REDIRECTS](https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/) — fix redirect loops caused by encryption mode misconfigurations

**Client-side security**

* [Get started with client-side security](https://developers.cloudflare.com/client-side-security/get-started/) — activate monitoring, review scripts, configure alerts, and create rules
* [Client-side security and PCI DSS compliance](https://developers.cloudflare.com/client-side-security/reference/pci-dss/) — how client-side security maps to PCI DSS v4 requirements

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/solutions/encrypt-all-keep-site-secure/#page","headline":"Enforce HTTPS and encrypt all traffic (Free, Pro, and Business) · Cloudflare use cases","description":"Configure SSL/TLS encryption from edge to origin, redirect HTTP to HTTPS, and harden your HTTPS setup with HSTS and minimum TLS versions.","url":"https://developers.cloudflare.com/use-cases/solutions/encrypt-all-keep-site-secure/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/solutions/","name":"Solution guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/solutions/encrypt-all-keep-site-secure/","name":"Enforce HTTPS and encrypt all traffic (Free, Pro, and Business)"}}]}
```
