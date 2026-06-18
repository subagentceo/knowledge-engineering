---
title: Discover and secure your API endpoints (Free, Pro, and Business)
description: Block API abuse, restrict unauthorized access, and monitor endpoint traffic using layered Cloudflare security features.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Discover and secure your API endpoints (Free, Pro, and Business)

Once your API is in production and receiving traffic, you need to decide which endpoints to protect first, what restrictions to apply, and how to monitor for abuse without blocking legitimate clients. This guide walks through that process in five stages: inventory your endpoints, enforce encrypted connections, restrict access to expected traffic patterns, block automated abuse, and monitor the results.

The core workflow uses [Cloudflare Application Security](https://developers.cloudflare.com/waf/) (also known as Web Application Firewall or WAF) features, [SSL/TLS](https://developers.cloudflare.com/ssl/) settings, and [bot detection](https://developers.cloudflare.com/bots/), all available on Free, Pro, and Business plans. Enterprise callouts cover [API Shield](https://developers.cloudflare.com/api-shield/) capabilities for teams that need schema validation, JSON Web Token (JWT) validation, and sequence analysis.

Note

Most procedures in this guide are configured per domain or [zone](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones). Select your domain in the Cloudflare dashboard before starting. 

## Know what you are exposing

Before configuring any security rules, build an inventory of your API endpoints. Without a complete list, you cannot target protections at the right paths or detect when an unknown endpoint starts receiving traffic.

### Audit your API surface manually

1. Review your application's routing configuration and list every endpoint with its HTTP method and expected parameters.  
AI-assisted endpoint discovery  
Consider using an AI agent to analyze the API routes exposed in your codebase and then generate an OpenAPI schema from the findings.
2. Categorize each endpoint by access level (public, authenticated, internal). Prioritize endpoints that accept file uploads, process payments, or return sensitive data.  
| Access level      | Description                       | Example endpoints          |  
| ----------------- | --------------------------------- | -------------------------- |  
| **Public**        | No authentication required        | /api/status, /api/products |  
| **Authenticated** | Require a token or session        | /api/account, /api/orders  |  
| **Internal**      | Should not be publicly accessible | /api/admin, /api/debug     |
3. Record the inventory in a spreadsheet or OpenAPI schema file for reference when writing rule expressions in later sections. If you already have an OpenAPI specification, you can use it directly with API Shield's schema validation (covered in the Enterprise callout below).

API Shield Endpoint Discovery (Enterprise)

API Shield can automatically discover API endpoints by analyzing your traffic patterns, surfacing endpoints you may not know are being called. This includes abandoned or undocumented endpoints (also known as shadow APIs) that may be unpatched and unmonitored. For more information, refer to [API Discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/).

## Enforce HTTPS for all API traffic

API requests carry credentials, tokens, and response data that attackers can intercept over unencrypted connections. Some API clients silently downgrade to HTTP if the server accepts it, sending sensitive data in plaintext. Enforcing HTTPS at the edge prevents this.

### Set your SSL/TLS encryption mode

Set your encryption mode to **Full (Strict)** to encrypt traffic between visitors and Cloudflare and between Cloudflare and your origin server. This mode requires a valid certificate on your origin.

1. In the Cloudflare dashboard, go to the SSL/TLS **Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls)
2. For **SSL/TLS encryption**, select **Full (Strict)**.

For more information on encryption modes and their requirements, refer to [SSL/TLS encryption modes](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/).

### Turn on Always Use HTTPS

[Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/) redirects all HTTP requests to HTTPS for every subdomain and host in your application. This prevents clients from accidentally sending API requests over unencrypted connections.

Note

If only some parts of your application support HTTPS, do not turn on Always Use HTTPS. Use a [single redirect](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/) to redirect specific API paths instead. Refer to [Redirect admin area requests to HTTPS](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-admin-https/) for an example.

1. In the Cloudflare dashboard, go to the SSL/TLS **Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls)
2. Verify that your [SSL/TLS encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/off/) is not set to **Off**. The Always Use HTTPS option is not visible when encryption is off.
3. Go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
4. Turn on **Always Use HTTPS**.

### Set minimum TLS version to 1.2

Since APIs can carry sensitive information, like credentials and tokens, you want to select an appropriate minimum TLS version with this in mind.

TLS 1.0 and 1.1 have known vulnerabilities. Setting the minimum to TLS 1.2 rejects connections from clients using older protocols.

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **Minimum TLS Version**, select **TLS 1.2**.

For more information, refer to [Minimum TLS Version](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/).

### Disable Automatic HTTPS Rewrites for API-only domains

[Automatic HTTPS Rewrites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites/) changes HTTP links to HTTPS within HTML responses. For API endpoints that return JSON or other non-HTML content, this rewriting is unnecessary and can cause unexpected behavior if API clients follow rewritten URLs. If your domain serves only API traffic, turn off this setting.

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. Turn off **Automatic HTTPS Rewrites**.

Note

If your domain serves both a website and an API, keep Automatic HTTPS Rewrites on for the website. The rewriting only applies to HTML responses, so JSON API responses are not affected.

## Restrict access to your API endpoints

Legitimate API clients send predictable request patterns: specific HTTP methods, expected headers like `Content-Type: application/json`, and requests to documented paths. Application Security [custom rules](https://developers.cloudflare.com/waf/custom-rules/) let you block traffic that deviates from these patterns. [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) cap request volume per client to prevent abuse.

### Block requests missing expected headers

API clients typically include a `Content-Type` header and may include an `Authorization` header or a custom API key header. Requests to your API paths that lack these headers are not from your expected clients.

The following custom security rule blocks requests to `/api/` paths that are missing a `Content-Type` header. Adjust the path and header checks to match your API.

* [  New dashboard ](#tab-panel-11039)
* [ Old dashboard ](#tab-panel-11040)

1. In the Cloudflare dashboard, go to **Security** \> **Security rules**.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** \> **Custom rules**.
3. Define the rule name. For example, `Block API requests missing Content-Type`.
4. In the expression editor, enter:  
```  
(starts_with(http.request.uri.path, "/api/") and not len(http.request.headers["content-type"][0]) > 0)  
```
5. For **Choose action**, select **Block**.
6. Select **Deploy**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Custom rules**.
3. Select **Create rule**.
4. Define the rule name. For example, `Block API requests missing Content-Type`.
5. In the expression editor, enter:  
```  
(starts_with(http.request.uri.path, "/api/") and not len(http.request.headers["content-type"][0]) > 0)  
```
6. For **Choose action**, select **Block**.
7. Select **Deploy**.

### Restrict HTTP methods per endpoint

If your `/api/users` endpoint only accepts `GET` and `POST` requests, block all other HTTP methods on that path. This prevents attackers from probing with `PUT`, `DELETE`, or `PATCH` requests against endpoints that do not support them.

* [  New dashboard ](#tab-panel-11041)
* [ Old dashboard ](#tab-panel-11042)

1. In the Cloudflare dashboard, go to **Security** \> **Security rules**.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** \> **Custom rules**.
3. Define the rule name. For example, `Block unexpected methods on /api/users`.
4. In the expression editor, enter:  
```  
(http.request.uri.path eq "/api/users" and http.request.method ne "GET" and http.request.method ne "POST")  
```  
Adjust the path and allowed methods to match your endpoint.
5. For **Choose action**, select **Block**.
6. Select **Deploy**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Custom rules**
3. Select **Create rule**.
4. Define the rule name. For example, `Block unexpected methods on /api/users`.
5. In the expression editor, enter:  
```  
(http.request.uri.path eq "/api/users" and http.request.method ne "GET" and http.request.method ne "POST")  
```  
Adjust the path and allowed methods to match your endpoint.
6. For **Choose action**, select **Block**.
7. Select **Deploy**.

Repeat this pattern for each endpoint with restricted methods. You can combine multiple paths into a single rule using [or operators](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#logical-operators) if they share the same allowed methods.

Tip

Instead of manually creating rules for each endpoint, consider creating a single [fallthrough custom rule](https://developers.cloudflare.com/api-shield/security/schema-validation/#add-validation-by-adding-a-fallthrough-rule). You need to:

1. Add your API endpoints to Endpoint Management [from a schema](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#add-endpoints-from-schema-validation) or [manually](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/#add-endpoints-manually).
2. Create a fallthrough rule that blocks requests that do not match a saved endpoint in [Endpoint Management](https://developers.cloudflare.com/api-shield/management-and-monitoring/endpoint-management/).

### Rate limit API endpoints

API endpoints receive more targeted abuse than web pages because attackers can call them at machine speed without rendering a browser. Rate limiting caps the number of requests a single client can send within a time window.

Create separate rate limiting rules for authenticated and unauthenticated endpoints. Unauthenticated endpoints (login, registration, password reset) need tighter limits because they are primary targets for [credential stuffing](https://developers.cloudflare.com/waf/detections/leaked-credentials/) and brute force attacks.

The following example limits requests to `/api/auth/login` to 10 per minute per IP address. Adjust the path, request threshold, and period for your endpoints.

* [  New dashboard ](#tab-panel-11045)
* [ Old dashboard ](#tab-panel-11046)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** \> **Rate limiting rules**.
3. Enter a descriptive name. For example, `Rate limit login endpoint`.
4. In the **Field** drop-down, select **URI Path**. Set **Operator** to **equals** and **Value** to `/api/auth/login`.
5. Under **With the same characteristics**, add **IP**.
6. Under **When rate exceeds**, set **Requests** to `10` and **Period** to **1 minute**.
7. Under **Then take action**, select **Block**.
8. Set the **Duration** (mitigation timeout) to **1 minute**.
9. Select **Deploy**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and zone.
2. Go to **Security** \> **WAF** \> **Rate limiting rules**.
3. Select **Create rule**.
4. Enter a descriptive name. For example, `Rate limit login endpoint`.
5. In the **Field** drop-down, select **URI Path**. Set **Operator** to **equals** and **Value** to `/api/auth/login`.
6. Under **With the same characteristics**, add **IP**.
7. Under **When rate exceeds**, set **Requests** to `10` and **Period** to **1 minute**.
8. Under **Then take action**, select **Block**.
9. Set the **Duration** (mitigation timeout) to **1 minute**.
10. Select **Deploy**.

For more information on rate limiting parameters and counting characteristics, refer to [Rate limiting parameters](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/).

Note

Rate limiting rules may allow a small number of excess requests before enforcement starts, due to counter propagation delays across data centers. For more information, refer to [Request rate calculation](https://developers.cloudflare.com/waf/rate-limiting-rules/request-rate/).

For an API-specific example using an API key as a counting characteristic, refer to [Rate limiting rule examples](https://developers.cloudflare.com/waf/rate-limiting-rules/use-cases/#example-2).

Schema Validation and JWT Validation (Enterprise)

API Shield can validate incoming requests against your OpenAPI schema, blocking requests with unexpected parameters, methods, or content types before they reach your origin. Upload your schema or let Cloudflare learn it from your traffic. For more information, refer to [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/).

API Shield can also validate JSON Web Tokens (JWTs) at the edge, rejecting expired, tampered, or invalid tokens before requests reach your origin. This requires adding your JWT issuer's public keys and creating a validation rule. For more information, refer to [JSON Web Tokens validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

## Protect against automated API abuse

Bots call API endpoints at machine speed without browser overhead. Common automated attacks against APIs include credential stuffing against authentication endpoints, data scraping through listing endpoints, and inventory manipulation through cart or checkout endpoints.

### Turn on Bot Fight Mode (Free)

Note

If you are on a Cloudflare Pro or Business plan, go to the [next section](#create-exception-rules-for-legitimate-bot-clients-pro-business). You will configure Super Bot Fight Mode later.

Bot Fight Mode challenges requests that match known bot patterns. It applies to your entire domain and is available on all plans at no additional cost.

* [  New dashboard ](#tab-panel-11051)
* [ Old dashboard ](#tab-panel-11052)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **Bot fight mode**.
4. Turn **Bot fight mode** on.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Security** \> **Bots**.
3. For **Bot Fight Mode**, select **On**.

Bot Fight Mode may interfere with legitimate automated traffic to your API, such as monitoring tools, CI/CD pipelines, or partner integrations. If you have legitimate bot clients, create an exception rule before turning on Bot Fight Mode (see the next section).

For more information on Bot Fight Mode behavior and limitations, refer to [Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/).

### Create exception rules for legitimate bot clients (Pro, Business)

If your API receives traffic from known automated clients (monitoring services, partner APIs, CI/CD systems), create a [custom security rule with the _Skip_ action](https://developers.cloudflare.com/waf/custom-rules/skip/) to exclude them from bot protections. Create the exception rule before turning on Super Bot Fight Mode in the next section.

* [  New dashboard ](#tab-panel-11043)
* [ Old dashboard ](#tab-panel-11044)

1. In the Cloudflare dashboard, go to **Security** \> **Security rules**.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** \> **Custom rules**.
3. Define the rule name. For example, `Skip bot protections for monitoring service`.
4. Build an expression that matches your known bot traffic. For example, to skip protections for requests from a specific IP range with a known User-Agent:  
```  
(ip.src in {203.0.113.0/24} and http.user_agent contains "MonitoringBot")  
```  
Replace the IP range and User-Agent with values that match your legitimate bot clients.
5. For **Choose action**, select _Skip_ and then select **All Super Bot Fight Mode rules**.
6. Select **Deploy**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Custom rules**
3. Select **Create rule**.
4. Define the rule name. For example, `Skip bot protections for monitoring service`.
5. Build an expression that matches your known bot traffic. For example, to skip protections for requests from a specific IP range with a known User-Agent:  
```  
(ip.src in {203.0.113.0/24} and http.user_agent contains "MonitoringBot")  
```  
Replace the IP range and User-Agent with values that match your legitimate bot clients.
6. For **Choose action**, select _Skip_ and then select **All Super Bot Fight Mode rules**.
7. Select **Deploy**.

Note

Place exception rules above (before) enforcement rules in your rule list. Cloudflare evaluates custom rules in order, and the first matching rule with a terminating action stops evaluation. For more information, refer to [Rule execution order](https://developers.cloudflare.com/waf/concepts/#rule-execution-order).

### Configure Super Bot Fight Mode (Pro, Business)

[Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) provides granular controls that apply across your domain, allowing you to apply different actions to different bot types.

Note

If you are upgrading from Bot Fight Mode to Super Bot Fight Mode, you must disable Bot Fight Mode in your Bot settings.

* Old dashboard: **Security** \> **Bots**, and select **Configure Bot Fight Mode**.
* New dashboard: **Security** \> **Settings**. Filter by **Bot traffic** and turn **Bot fight mode** off.

To configure Super Bot Fight Mode:

* [  New dashboard ](#tab-panel-11053)
* [ Old dashboard ](#tab-panel-11054)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **Super Bot fight mode**.
4. Turn **Super Bot fight mode** on.
5. Choose how your domain should respond to various types of traffic by selecting the associated edit icon:  
   * For more details on verified bots, refer to [Verified Bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/).  
   * For more details on supported file types, refer to [Static resource protection](https://developers.cloudflare.com/bots/additional-configurations/static-resources/).  
   * For more details on invisible code injection, refer to [JavaScript detections](https://developers.cloudflare.com/bots/additional-configurations/javascript-detections/).  
   * For more details on WordPress optimization, refer to [Super Bot Fight Mode for WordPress](https://developers.cloudflare.com/bots/troubleshooting/wordpress-loopback-issue/).

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Security** \> **Bots**.
3. Select **Configure Super Bot Fight Mode**.
4. Choose how your domain should respond to various types of traffic:  
   * For more details on verified bots, refer to [Verified Bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/).  
   * For more details on supported file types, refer to [Static resource protection](https://developers.cloudflare.com/bots/additional-configurations/static-resources/).  
   * For more details on invisible code injection, refer to [JavaScript detections](https://developers.cloudflare.com/bots/additional-configurations/javascript-detections/).  
   * For more details on WordPress optimization, refer to [Super Bot Fight Mode for WordPress](https://developers.cloudflare.com/bots/troubleshooting/wordpress-loopback-issue/).

With Super Bot Fight Mode, you can configure different actions for different bot types:

* Block or allow verified bots
* Configure a separate action (allow, block, or challenge) for **Definitely automated traffic** ([bot score](https://developers.cloudflare.com/bots/concepts/bot-score/) of 1)
* On Business plans and above: Configure a separate action for **Likely automated traffic** (bot score of 2-29)

Super Bot Fight Mode applies domain-wide and does not support path-specific rules. If you need to apply different bot thresholds to different API paths, you need a [Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/) subscription (Enterprise).

Bot score in custom rules (Enterprise)

With a Bot Management subscription, you can write custom rules using `cf.bot_management.score` to set path-specific thresholds. For example, block requests with a bot score below 30 on `/api/auth` paths while allowing all scores on other API paths. For more information, refer to [Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/).

### Detect leaked credentials on login endpoints

Application Security [leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) checks incoming requests for username and password combinations that appeared in known data breaches. Use this detection to rate limit or challenge requests containing compromised credentials on your authentication endpoints.

Note

Access to the `cf.waf.credential_check.username_and_password_leaked` field (User and Password Leaked) requires a Pro plan or above. If you are on a Free plan, use the `cf.waf.credential_check.password_leaked` field (Password Leaked) instead, which indicates whether the password detected in the request was previously leaked.

The following rate limiting rule limits requests that contain a previously leaked username and password combination to 5 per minute per IP:

| Setting                  | Value                                                    |
| ------------------------ | -------------------------------------------------------- |
| Expression               | cf.waf.credential\_check.username\_and\_password\_leaked |
| Counting characteristics | IP                                                       |
| Requests per period      | 5 requests / 1 minute                                    |
| Action                   | Block                                                    |

For the full expression including account takeover (ATO) detection IDs, refer to [Example mitigation rules](https://developers.cloudflare.com/waf/detections/leaked-credentials/examples/).

Sequence Analytics and sequence mitigation custom rules (Enterprise)

API Shield tracks the order of API endpoint requests over time, grouping important user journeys (sequences) across your API. Sequences with high precedence scores indicate requests that are likely to occur together in order. Anomalous sequences may indicate automated abuse, such as a bot that calls `/auth`, then `/account`, then `/transfer` in rapid succession. For more information, refer to [Sequence Analytics](https://developers.cloudflare.com/api-shield/security/sequence-analytics/).

Enterprise users with a Fraud Detection subscription can also create [sequence mitigation custom rules](https://developers.cloudflare.com/api-shield/security/sequence-mitigation/custom-rules/) to mitigate invalid sequences of API calls.

## Monitor your API traffic

After deploying your security rules, review the results to identify false positives and tune your thresholds. False positives (legitimate clients being blocked) and false negatives (abuse getting through) both require adjustments.

### Review Security Events for API paths

[Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) shows every request that your rules matched, including the action taken and the rule that triggered it. Filter by your API path prefix to see what Cloudflare is blocking and why.

* [  New dashboard ](#tab-panel-11047)
* [ Old dashboard ](#tab-panel-11048)

1. In the Cloudflare dashboard, go to the **Analytics** page.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
2. Select the **Events** tab.
3. Add a filter for **URI Path** starts with `/api/`.
4. Review the events. Look for legitimate clients that are being blocked (false positives). Common indicators of false positives:  
   * Requests from known partner IP addresses  
   * Requests with valid API keys or authorization headers  
   * Requests from monitoring services with known User-Agent strings

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and zone.
2. Go to **Security** \> **Events**.
3. Add a filter for **URI Path** starts with `/api/`.
4. Review the events. Look for legitimate clients that are being blocked (false positives). Common indicators of false positives:  
   * Requests from known partner IP addresses  
   * Requests with valid API keys or authorization headers  
   * Requests from monitoring services with known User-Agent strings

If you find false positives, update your custom rules to exclude the affected traffic. Refer to the [exception rule procedure](#create-exception-rules-for-legitimate-bot-clients-pro-business) in an earlier section.

### Tune rate limiting thresholds

Rate limiting thresholds that are too tight block legitimate clients. Thresholds that are too loose allow abuse. Review rate limiting events in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) to find the right balance.

* [  New dashboard ](#tab-panel-11049)
* [ Old dashboard ](#tab-panel-11050)

1. In the Cloudflare dashboard, go to the **Analytics** page.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
2. Select the **Events** tab.
3. Filter by **Action** equals **Block** and **Service** equals **Rate limiting**.
4. Check whether blocked requests come from legitimate clients or abusive traffic.
5. If legitimate clients are being rate limited, edit the relevant rate limiting rule to increase the request threshold or widen the time period for the affected rule.
6. If abusive traffic is getting through, lower the rule threshold or narrow the time period.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and zone.
2. Go to **Security** \> **Events**.
3. Filter by **Action** equals **Block** and **Service** equals **Rate limiting**.
4. Check whether blocked requests come from legitimate clients or abusive traffic.
5. If legitimate clients are being rate limited, edit the relevant rate limiting rule to increase the request threshold or widen the time period for the affected rule.
6. If abusive traffic is getting through, lower the rule threshold or narrow the time period.

Security Analytics rate analysis requires an Enterprise plan

Enterprise customers can use the **Request rate analysis** tab in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) to visualize request rate distributions and the **Log** action to observe rule matches without taking action. On other plans, estimate thresholds based on your expected traffic patterns. Refer to [Find an appropriate rate limit](https://developers.cloudflare.com/waf/rate-limiting-rules/find-rate-limit/) for the full methodology.

### Set up notifications for security event spikes

Cloudflare Notifications can alert you when security event volume exceeds a threshold, indicating a potential attack or a misconfigured rule.

1. In the Cloudflare dashboard, go to the **Notifications** page.  
[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications)
2. Select **Add**.
3. Filter by **WAF** and select **Security Events Alert**.
4. Define a name for the notification and the delivery method (email, webhook, or PagerDuty).
5. Next, configure the domains for which you want to receive notifications. You can also filter events by a targeted action (for example, **Block** or **Skip**).
6. Select **Create**.

For the full list of available notification types, refer to [Available notifications](https://developers.cloudflare.com/notifications/notification-available/).

Advanced security events notifications (Enterprise)

Enterprise customers have access to the [Advanced Security Events Alert](https://developers.cloudflare.com/waf/reference/alerts/) notification type, which includes an additional filter for the app security services the alert should monitor.

## Related resources

**Application Security**

* [Custom rules](https://developers.cloudflare.com/waf/custom-rules/) — Create rules based on request attributes to block, challenge, or skip specific security features for targeted traffic
* [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) — Define request rate thresholds per client and choose enforcement actions
* [Rate limiting best practices](https://developers.cloudflare.com/waf/rate-limiting-rules/best-practices/) — Common rate limiting patterns for credential stuffing, API protection, and GraphQL
* [Rate limiting rule examples](https://developers.cloudflare.com/waf/rate-limiting-rules/use-cases/) — Example rules with expressions for login pages, API keys, and complexity-based limiting
* [Security features interoperability](https://developers.cloudflare.com/waf/feature-interoperability/) — How custom rules, rate limiting rules, Super Bot Fight Mode, and Managed Rules interact
* [Leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) — Detect requests containing credentials from known data breaches
* [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) — Review matched requests and rule actions

**Bots**

* [Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) — Automatic challenge for requests matching known bot patterns (Free plan)
* [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) — Granular bot controls including verified bot allowlisting (Pro, Business, Enterprise)
* [Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/) — Bot score, detection IDs, and custom rule templates (Enterprise)
* [Bot Management variables](https://developers.cloudflare.com/bots/reference/bot-management-variables/) — Fields available in rule expressions for bot detection (Enterprise)

**SSL/TLS**

* [Get started with SSL/TLS](https://developers.cloudflare.com/ssl/get-started/) — Edge certificates, encryption modes, and HTTPS enforcement
* [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/) — Redirect all HTTP requests to HTTPS
* [Minimum TLS Version](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/) — Reject connections using older TLS protocols

**API Shield (Enterprise)**

* [API Shield overview](https://developers.cloudflare.com/api-shield/) — Discovery, schema validation, JWT validation, and sequence analytics for API security
* [Get started with API Shield](https://developers.cloudflare.com/api-shield/get-started/) — Onboarding flow from session identifiers through schema validation
* [API Discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/) — Automatic endpoint discovery from traffic analysis
* [Schema validation](https://developers.cloudflare.com/api-shield/security/schema-validation/) — Validate incoming requests against your OpenAPI schema
* [JWT validation](https://developers.cloudflare.com/api-shield/security/jwt-validation/) — Verify JSON Web Tokens at the edge
* [Sequence Analytics](https://developers.cloudflare.com/api-shield/security/sequence-analytics/) — Track and analyze API request sequences
* [Volumetric Abuse Detection](https://developers.cloudflare.com/api-shield/security/volumetric-abuse-detection/) — Per-session, per-endpoint adaptive rate limiting
* [Authentication Posture](https://developers.cloudflare.com/api-shield/security/authentication-posture/) — helps users identify authentication misconfigurations for APIs and alerts of their presence
* [BOLA vulnerability detection](https://developers.cloudflare.com/api-shield/security/bola-vulnerability-detection/) — Detect endpoints at risk of Broken Object Level Authorization (BOLA) attacks
* [Vulnerability Scanner](https://developers.cloudflare.com/api-shield/security/vulnerability-scanner/) — Test your API endpoints for common vulnerabilities

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/solutions/discover-secure-api-endpoints/#page","headline":"Discover and secure your API endpoints (Free, Pro, and Business) · Cloudflare use cases","description":"Block API abuse, restrict unauthorized access, and monitor endpoint traffic using layered Cloudflare security features.","url":"https://developers.cloudflare.com/use-cases/solutions/discover-secure-api-endpoints/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API","Security"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/solutions/","name":"Solution guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/solutions/discover-secure-api-endpoints/","name":"Discover and secure your API endpoints (Free, Pro, and Business)"}}]}
```
