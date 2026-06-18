---
title: Stop malicious bots while allowing legitimate traffic (Free, Pro, and Business)
description: Block malicious bots while allowing legitimate traffic using Bot Fight Mode, Turnstile, custom rules, and rate limiting on Free, Pro, and Business plans.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Stop malicious bots while allowing legitimate traffic (Free, Pro, and Business)

The right defense against malicious bot traffic depends on the traffic patterns on your site and your plan. This guide covers a layered approach using [Cloudflare Bots](https://developers.cloudflare.com/bots/), [Cloudflare Application Security](https://developers.cloudflare.com/waf/) (also known as Web Application Firewall or WAF), and [Turnstile](https://developers.cloudflare.com/turnstile/), from baseline protection to targeted custom rules. The core workflow uses features on Free, Pro, and Business plans, with callouts for Enterprise options.

Note

Most procedures in this guide are configured per domain or [zone](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones). Select your domain in the Cloudflare dashboard before starting. Turnstile is the exception: widgets are configured at the account level.

## Review your bot traffic

Before you change any bot settings, review your traffic data to understand what bots are doing on your site.

### Find your bot analytics

[Bot analytics](https://developers.cloudflare.com/bots/bot-analytics/) show you how much of your traffic is automated, which pages bots target, and how Cloudflare scores each request.

Bot Analytics requires a Business plan or above

Bot score distribution data and detailed bot analytics are available on Business and Enterprise plans. Free and Pro plan users can review basic security metrics through [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/). For full bot analytics capabilities, refer to [Bot Analytics](https://developers.cloudflare.com/bots/bot-analytics/).

* [  New dashboard ](#tab-panel-11079)
* [ Old dashboard ](#tab-panel-11080)

1. In the Cloudflare dashboard, go to the **Analytics** page.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
2. Select the **Bot analysis** tab.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login) and select your account and domain.
2. Go to **Security** \> **Bots**.

Review the following:

* **Bot score distribution chart**: Scores closer to 1 indicate automated traffic. Scores closer to 99 indicate human traffic.
* **Top requested paths**: Which endpoints receive the most bot traffic. Login pages, API endpoints, and checkout flows are common targets.
* **Traffic patterns**: Sudden spikes in low-score traffic, specific user agents appearing at high volume, or geographic concentration of requests can indicate bot activity worth investigating.

### Understand bot categories

Cloudflare classifies bot traffic into categories based on bot scores and verification status:

* **Verified bots**: Crawlers and services that Cloudflare has confirmed as legitimate, such as Googlebot, Bingbot, and uptime monitors. Cloudflare maintains a [verified bot list](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/policy/) with strict requirements.
* **Automated** (score 1): Cloudflare is quite certain the request is automated.
* **Likely automated** (scores 2-29): Probably a bot. This category and Automated are the primary targets for security rules, including scrapers, credential stuffing tools, and spam submitters.
* **Likely human** (scores 30-99): These requests appear to come from real users. Do not challenge or block this traffic.

## Block automated traffic with Bot Fight Mode

[Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) identifies requests that match known bot patterns and issues a computational challenge. It reduces automated traffic across your entire site without requiring you to write any rules.

### What Bot Fight Mode does

Bot Fight Mode is included with Free plans. When enabled, it:

* Identifies traffic matching patterns of known bots
* Issues computationally expensive challenges in response to these bots
* Protects entire domains without endpoint restrictions
* Cannot be customized, adjusted, or reconfigured via custom rules
* Cannot be bypassed with [custom rule](https://developers.cloudflare.com/waf/custom-rules/) Skip actions. If Bot Fight Mode challenges a request you want to allow, you can turn off Bot Fight Mode or upgrade to [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) for more granular control.

For more details, refer to [Bot Fight Mode considerations](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/#considerations).

### Turn on Bot Fight Mode (Free plan)

* [  New dashboard ](#tab-panel-11093)
* [ Old dashboard ](#tab-panel-11094)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **Bot fight mode**.
4. Turn **Bot fight mode** on.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Security** \> **Bots**.
3. For **Bot Fight Mode**, select **On**.

### Enable Super Bot Fight Mode (Pro, Business, and Enterprise)

Super Bot Fight Mode adds verified bot allowlisting, per-category actions, static resource protection, and JavaScript detections.

Note

If you are upgrading from Bot Fight Mode to Super Bot Fight Mode, you must disable Bot Fight Mode in your Bot settings.

* Old dashboard: **Security** \> **Bots**, and select **Configure Bot Fight Mode**.
* New dashboard: **Security** \> **Settings**. Filter by **Bot traffic** and turn **Bot fight mode** off.

* [  New dashboard ](#tab-panel-11095)
* [ Old dashboard ](#tab-panel-11096)

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

Plan availability

Super Bot Fight Mode is available on Pro, Business, and Enterprise plans. Free plan users can use Bot Fight Mode for baseline protection. Enterprise customers who need machine learning-based bot scoring and custom allow/block rules can add [Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/).

Warning

If your organization uses [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), keep **Definitely Automated** set to **Allow** in Super Bot Fight Mode. Otherwise, tunnels might fail with a `websocket: bad handshake` error.

## Protect forms from automated abuse

[Turnstile](https://developers.cloudflare.com/turnstile/) and Application Security [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) protect form endpoints in different ways and work best together.

### Turnstile versus rate limiting

Turnstile challenges suspected bots before they can submit a form (login, signup, contact, or checkout), without showing visitors a CAPTCHA. It can be embedded into any website without sending traffic through Cloudflare. Use Turnstile when you need to challenge automated form submissions.

Rate limiting allows you to define rate limits for requests matching an expression and the action to perform when those limits are reached. Use rate limiting to protect endpoints from abuse, such as brute-force attacks on a login page or excessive API calls from a single client.

Both together provide the strongest coverage. Turnstile challenges automated submissions at the form level. Rate limiting catches high-volume attacks that bypass or do not encounter the form, such as direct `POST` requests to the endpoint that skip the client-side widget.

### Add Turnstile to a form

Adding Turnstile involves three steps: create a widget, add the client-side snippet, and validate the token on your server.

#### 1\. Create a Turnstile widget

Turnstile is configured at the account level.

1. In the Cloudflare dashboard, go to the **Turnstile** page.  
[ Go to **Turnstile** ](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Select **Add widget**.
3. Fill out the required information:  
   * **Widget name**: A descriptive name for your widget.  
   * **Hostname management**: Domains where the widget will be used.  
   * **Widget mode**: Choose from Managed, Non-Interactive, or Invisible.
4. (Optional) Configure **Pre-clearance support** for single-page applications.
5. Select **Create** to save your widget.
6. Copy your sitekey and secret key, and store the secret key securely.

You need both the sitekey and secret key in the following steps.

#### 2\. Add the client-side snippet

Add the Turnstile script and widget container to your form HTML:

```

<script

  src="https://challenges.cloudflare.com/turnstile/v0/api.js"

  async

  defer

></script>


<form action="/submit" method="POST">

  <!-- Your existing form fields -->

  <div class="cf-turnstile" data-sitekey="<YOUR_SITE_KEY>"></div>

  <button type="submit">Submit</button>

</form>


```

Replace `<YOUR_SITE_KEY>` with the sitekey from the previous step. The widget renders inside the `div` and produces a token when the visitor passes the challenge.

#### 3\. Validate the token on your server

Before processing the form submission, send the token to the Turnstile siteverify endpoint to confirm the visitor passed the challenge:

Terminal window

```

curl https://challenges.cloudflare.com/turnstile/v0/siteverify \

  --header "Content-Type: application/json" \

  --data '{

  "secret": "<YOUR_SECRET_KEY>",

  "response": "<TURNSTILE_RESPONSE_TOKEN>"

}'


```

Replace `<YOUR_SECRET_KEY>` with your secret key and `<TURNSTILE_RESPONSE_TOKEN>` with the `cf-turnstile-response` value from the form submission. The endpoint returns a JSON object with a `success` field. Only process the form submission if `success` is `true`.

For complete integration details, refer to [Turnstile get started](https://developers.cloudflare.com/turnstile/get-started/).

### Limit request volume on form endpoints with rate limiting

For login endpoints, a tiered rate limiting approach works well alongside Turnstile. The following example from the [Rate limiting best practices](https://developers.cloudflare.com/waf/rate-limiting-rules/best-practices/) shows two rules that escalate the response based on the volume of failed attempts. Adjust the thresholds for your site's traffic patterns.

Tiered rate limiting rules require a Business plan or above

Rules that use counting expressions with response codes (such as counting only `401` and `403` responses) require a Business plan or above. On Free and Pro plans, you can create simpler rate limiting rules with IP-based counting. Refer to [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) for plan availability details.

**Short-window rule:** Challenge an IP that sends too many failed login requests in a short window.

* [  New dashboard ](#tab-panel-11083)
* [ Old dashboard ](#tab-panel-11084)

1. In the Cloudflare dashboard, go to **Security** \> **Security rules**.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** \> **Rate limiting rules**.
3. Enter a descriptive name in **Rule name**.
4. Under **If incoming requests match**, select **Edit expression** and enter: `http.request.uri.path eq "/login" and http.request.method eq "POST"`
5. Under **With the same characteristics**, select **IP**.
6. Enable **Use custom counting expression** and enter: `http.request.uri.path eq "/login" and http.request.method eq "POST" and http.response.code in {401 403}`
7. Under **When rate exceeds**, enter `4` requests per `1 minute`.
8. Under **Then take action**, select _Managed Challenge_.
9. Select **Deploy**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Rate limiting rules**.
3. Select **Create rule**.
4. Enter a descriptive name in **Rule name**.
5. Under **If incoming requests match**, select **Edit expression** and enter: `http.request.uri.path eq "/login" and http.request.method eq "POST"`
6. Under **With the same characteristics**, select **IP**.
7. Enable **Use custom counting expression** and enter: `http.request.uri.path eq "/login" and http.request.method eq "POST" and http.response.code in {401 403}`
8. Under **When rate exceeds**, enter `4` requests per `1 minute`.
9. Under **Then take action**, select _Managed Challenge_.
10. Select **Deploy**.

**Long-window rule:** Block an IP that accumulates failed login attempts over a longer period.

* [  New dashboard ](#tab-panel-11085)
* [ Old dashboard ](#tab-panel-11086)

1. In the Cloudflare dashboard, go to **Security** \> **Security rules**.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** \> **Rate limiting rules**.
3. Enter a descriptive name in **Rule name**.
4. Under **If incoming requests match**, select **Edit expression** and enter: `http.request.uri.path eq "/login" and http.request.method eq "POST"`
5. Under **With the same characteristics**, select **IP**.
6. Enable **Use custom counting expression** and enter: `http.request.uri.path eq "/login" and http.request.method eq "POST" and http.response.code in {401 403}`
7. Under **When rate exceeds**, enter `20` requests per `1 hour`.
8. Under **Then take action**, select _Block_ with a duration of `1 day`.
9. Select **Deploy**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Rate limiting rules**.
3. Select **Create rule**.
4. Enter a descriptive name in **Rule name**.
5. Under **If incoming requests match**, select **Edit expression** and enter: `http.request.uri.path eq "/login" and http.request.method eq "POST"`
6. Under **With the same characteristics**, select **IP**.
7. Enable **Use custom counting expression** and enter: `http.request.uri.path eq "/login" and http.request.method eq "POST" and http.response.code in {401 403}`
8. Under **When rate exceeds**, enter `20` requests per `1 hour`.
9. Under **Then take action**, select _Block_ with a duration of `1 day`.
10. Select **Deploy**.

This pattern uses a counting expression that only counts `POST` requests returning authentication failure codes. Legitimate users who log in successfully on the first attempt never trigger the rule. Review the results in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) to confirm the thresholds are not catching legitimate users.

For the full tiered credential stuffing example with three rules, refer to [Rate limiting best practices](https://developers.cloudflare.com/waf/rate-limiting-rules/best-practices/).

## Target bot patterns with custom rules and rate limiting

Application Security [custom rules](https://developers.cloudflare.com/waf/custom-rules/) and [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) let you target specific traffic patterns that built-in bot protection does not catch. Cloudflare separates detection (scoring traffic) from mitigation (acting on those scores). You write rules that reference detection signals to decide what action to take.

### Block requests with missing or suspicious headers

Legitimate browsers typically send headers like `User-Agent`, `Accept`, and `Accept-Language`. Many bots omit these headers or send non-browser values. A custom rule targeting requests with empty or suspicious headers catches bots that evade score-based detection.

Before creating custom rules, review the built-in bot settings in **Security** \> **Settings** (filter by _Bot traffic_). These settings handle common scenarios like blocking AI crawlers, challenging automated traffic, and allowing verified bots without requiring you to write expressions. For the full list of built-in settings, refer to [Challenge bad bots](https://developers.cloudflare.com/waf/custom-rules/use-cases/challenge-bad-bots/).

Plan availability

Built-in bot settings are part of [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) (Pro and above). On Free plans, only the Bot Fight Mode toggle is available. [Custom rules](https://developers.cloudflare.com/waf/custom-rules/#availability) are available on all plans, with the number of rules increasing on higher plans.

If the built-in settings do not cover your needs, create custom rules. Start by creating an exception for verified bots so they are protected before you deploy any blocking rules.

Navigate to custom rules, then create both rules:

* [  New dashboard ](#tab-panel-11087)
* [ Old dashboard ](#tab-panel-11088)

1. In the Cloudflare dashboard, go to **Security** \> **Security rules**.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** \> **Custom rules**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Custom rules**.
3. Select **Create rule**.

**First, create a verified bot exception:**

1. Enter a descriptive name in **Rule name**.
2. Under **When incoming requests match**, select **Edit expression** and enter: `(cf.client.bot)`
3. Under **Then take action**, select _Skip_ from the **Choose action** dropdown. Then select **All remaining custom rules**.
4. Under **Place at**, select _First_ from the **Select order** dropdown so this rule executes before any blocking rules.
5. Select **Deploy**.

This ensures verified bots (search engine crawlers, monitoring services) bypass your custom rules. If you have internal APIs, partner integrations, or monitoring tools that send automated traffic, create additional Skip rules for their IP addresses or user agents before deploying blocking rules. Review your expected automated traffic in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) to identify what to allowlist.

**Then, create a blocking rule:**

1. Select **Create rule**.
2. Enter a descriptive name in **Rule name**.
3. Under **When incoming requests match**, select **Edit expression** and enter: `(http.request.uri.path eq "/login" and http.request.method eq "POST")`
4. Under **Then take action**, select _Managed Challenge_ from the **Choose action** dropdown.
5. Under **Place at**, leave the **Select order** dropdown set to _Last_. This places the rule after the verified bot exception.
6. Select **Deploy**.
7. Review the results in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/). If the rule matches only bot traffic, edit the rule and change the action from _Managed Challenge_ to _Block_.

For additional custom rule options including the visual field builder, refer to [Create a custom rule in the dashboard](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/).

If your bot traffic is concentrated from countries where you have no real users, you can combine geographic filters with the rules above. Add `ip.src.country` to your expression to restrict the rule to specific regions. For examples, refer to [Block traffic by geographical location](https://developers.cloudflare.com/waf/custom-rules/use-cases/block-by-geographical-location/).

### Protect high-frequency paths with rate limiting

Beyond form endpoints, bots also target checkout flows, API endpoints, and other high-value paths. Rate limiting rules cap the number of requests a single client can make to these paths within a time window.

The following example creates a rate limiting rule for a checkout endpoint. Adjust the path, rate, and action for your site.

Rate limiting options vary by plan

Available periods, actions, and counting options vary by plan. The example below uses a 1-minute period with Managed Challenge. Refer to [Rate limiting rules availability](https://developers.cloudflare.com/waf/rate-limiting-rules/#availability) for your plan's options.

* [  New dashboard ](#tab-panel-11089)
* [ Old dashboard ](#tab-panel-11090)

1. In the Cloudflare dashboard, go to **Security** \> **Security rules**.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** \> **Rate limiting rules**.
3. Enter a descriptive name in **Rule name**.
4. Under **If incoming requests match**, select **Edit expression** and enter: `http.request.uri.path eq "/api/checkout" and http.request.method eq "POST"`
5. Under **With the same characteristics**, select **IP**.
6. Under **When rate exceeds**, enter `10` requests per `1 minute`.
7. Under **Then take action**, select _Managed Challenge_.
8. Select **Deploy**.
9. Review the results in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/). If the rule matches only bot traffic, edit the rule and change the action to _Block_ if needed.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Rate limiting rules**.
3. Select **Create rule**.
4. Enter a descriptive name in **Rule name**.
5. Under **If incoming requests match**, select **Edit expression** and enter: `http.request.uri.path eq "/api/checkout" and http.request.method eq "POST"`
6. Under **With the same characteristics**, select **IP**.
7. Under **When rate exceeds**, enter `10` requests per `1 minute`.
8. Under **Then take action**, select _Managed Challenge_.
9. Select **Deploy**.
10. Review the results in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/). If the rule matches only bot traffic, edit the rule and change the action to _Block_ if needed.

For additional patterns and thresholds, refer to [Rate limiting best practices](https://developers.cloudflare.com/waf/rate-limiting-rules/best-practices/).

Security Analytics rate analysis requires an Enterprise plan

Enterprise customers can use the **Request rate analysis** tab in Security Analytics to visualize request rate distributions and the **Log** action to observe rule matches without taking action. On other plans, estimate thresholds based on your expected traffic patterns. Refer to [Find an appropriate rate limit](https://developers.cloudflare.com/waf/rate-limiting-rules/find-rate-limit/) for the full methodology.

Enterprise Bot Management: bot score in custom rules

Enterprise customers with [Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/) can reference the `cf.bot_management.score` field in custom rule expressions for granular control over bot traffic. Bot Management assigns a score from 1 to 99 to each request, where lower scores indicate more automated behavior. Refer to [Bot scores](https://developers.cloudflare.com/bots/concepts/bot-score/) and [Bot Management variables](https://developers.cloudflare.com/bots/reference/bot-management-variables/) for details.

## Verify and tune your rules

After you deploy bot protection rules, use [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) to verify they are working as intended and adjust thresholds based on the results.

### Check Security Events

Security Events displays requests that Cloudflare security products acted on or flagged, including blocks, challenges, and flags.

* [  New dashboard ](#tab-panel-11081)
* [ Old dashboard ](#tab-panel-11082)

1. In the Cloudflare dashboard, go to the **Analytics** page.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
2. Select the **Events** tab.

1. In the Cloudflare dashboard, go to **Security** \> **Events**.

Review the **Sampled logs** to inspect individual requests. Each log entry shows the action taken, the rule that triggered, the source IP, user agent, URI path, and country. Available dashboard sections vary by plan. Refer to [Security Events availability](https://developers.cloudflare.com/waf/analytics/security-events/#availability) for your plan's features.

Look for false positives (legitimate traffic that your rules incorrectly challenged or blocked). Common signs include:

* Requests from known monitoring services or payment processors appearing in blocked events
* User agents matching legitimate browsers but receiving challenges
* High volumes of challenged requests from countries where you have real users

For rules using the Managed Challenge action, check the [challenge solve rate (CSR)](https://developers.cloudflare.com/cloudflare-challenges/reference/challenge-solve-rate/). A low CSR likely indicates the rule is effectively filtering automated traffic rather than legitimate users.

[Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) and [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) are aggressive by design. False positives are expected, especially in the first few days after turning them on. The key difference between the two is how you handle exceptions:

* **Bot Fight Mode** (Free) cannot be bypassed with custom rule Skip actions. You can turn off Bot Fight Mode or upgrade to Super Bot Fight Mode for more control.
* **Super Bot Fight Mode** (Pro and above) can be bypassed with custom rules using the Skip action, giving you more flexibility to create exceptions.

For more information on handling false positives, refer to [False positives](https://developers.cloudflare.com/bots/troubleshooting/false-positives/).

### Adjust your rules

After reviewing Security Events, adjust your rules based on the results.

**Scenario 1: Your monitoring tools or services are being blocked.**

Internal monitoring tools, health check services, or partner APIs appear in blocked events. The fix depends on which feature is blocking them:

* If [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) (Pro and above) is blocking the traffic, create a custom rule with a Skip action matching the tool IP address or user agent:  
   1. Go to the **Security rules** page.  
   [ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)  
   2. Select **Create rule** \> **Custom rules**.  
   3. Enter a descriptive name.  
   4. Under **When incoming requests match**, select **Edit expression** and enter: `(ip.src eq 192.0.2.1)` (replace with your tool's IP address).  
   5. Under **Then take action**, select _Skip_. Then select **All Super Bot Fight Mode rules**.  
   6. Select **Deploy**.
* If [Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) (Free) is blocking the traffic, turn off Bot Fight Mode or upgrade to [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) for granular exception rules.

For details on Skip action configuration, refer to [Configure a rule with the Skip action](https://developers.cloudflare.com/waf/custom-rules/skip/).

**Scenario 2: Malicious traffic is still getting through.**

Bot activity appears in Security Events that your current rules do not catch. Bots that stay under rate limits or evade single-signal rules require combining multiple signals. For example, to challenge `POST` requests to `/login` that are not from verified bots:

* [  New dashboard ](#tab-panel-11091)
* [ Old dashboard ](#tab-panel-11092)

1. In the Cloudflare dashboard, go to **Security** \> **Security rules**.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** \> **Custom rules**.
3. Enter a descriptive name.
4. Under **When incoming requests match**, select **Edit expression** and enter:  
```  
(http.request.uri.path eq "/login" and http.request.method eq "POST" and not cf.client.bot)  
```
5. Under **Then take action**, select _Managed Challenge_.
6. Select **Deploy**.
7. Review the results in Security Events. If the rule matches only bot traffic, change the action to _Block_.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Custom rules**.
3. Select **Create rule**.
4. Enter a descriptive name.
5. Under **When incoming requests match**, select **Edit expression** and enter:  
```  
(http.request.uri.path eq "/login" and http.request.method eq "POST" and not cf.client.bot)  
```
6. Under **Then take action**, select _Managed Challenge_.
7. Select **Deploy**.
8. Review the results in Security Events. If the rule matches only bot traffic, change the action to _Block_.

For more expression fields and examples, refer to [Custom rules use cases](https://developers.cloudflare.com/waf/custom-rules/use-cases/).

If bots are staying under your rate limiting thresholds, edit the rate limiting rule and reduce the request count or shorten the time window.

Note

Custom rules execute before Super Bot Fight Mode in the evaluation order. If a custom rule takes a terminating action (Block, Managed Challenge), the request does not reach Super Bot Fight Mode. Refer to [Security features interoperability](https://developers.cloudflare.com/waf/feature-interoperability/).

Enterprise Bot Management

Enterprise customers with [Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/) can tune rules using the `cf.bot_management.score` field for more granular control. Refer to [Bot Management variables](https://developers.cloudflare.com/bots/reference/bot-management-variables/) for available fields.

## Related resources

**Bots**

* [Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) — Baseline bot protection available on all plans
* [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) — Granular bot controls for Pro, Business, and Enterprise plans
* [Enterprise Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/) — Machine learning-based bot scoring and behavioral analysis
* [Bot Analytics](https://developers.cloudflare.com/bots/bot-analytics/) — Monitor bot traffic patterns across your domain

**Application Security**

* [Custom rules](https://developers.cloudflare.com/waf/custom-rules/) — Write targeted rules using traffic signals and bot scores
* [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) — Control request volume to protect endpoints from abuse
* [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) — Review and investigate mitigated requests

**Turnstile**

* [Turnstile](https://developers.cloudflare.com/turnstile/) — Free, privacy-preserving challenge for forms and user interactions

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/solutions/stop-malicious-bots/#page","headline":"Stop malicious bots while allowing legitimate traffic (Free, Pro, and Business) · Cloudflare use cases","description":"Block malicious bots while allowing legitimate traffic using Bot Fight Mode, Turnstile, custom rules, and rate limiting on Free, Pro, and Business plans.","url":"https://developers.cloudflare.com/use-cases/solutions/stop-malicious-bots/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/solutions/","name":"Solution guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/solutions/stop-malicious-bots/","name":"Stop malicious bots while allowing legitimate traffic (Free, Pro, and Business)"}}]}
```
