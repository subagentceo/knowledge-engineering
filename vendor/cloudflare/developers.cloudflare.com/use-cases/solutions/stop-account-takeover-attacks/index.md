---
title: Stop account takeover attacks (Free, Pro, and Business)
description: Block credential stuffing and brute force attacks on login endpoints using a layered defense.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Stop account takeover attacks (Free, Pro, and Business)

When your site has login pages, you need to decide how to verify that visitors are human, how aggressively to limit failed attempts, and which request patterns to block. This guide covers five stages: enforce HTTPS, turn on bot protection, add [Turnstile](https://developers.cloudflare.com/turnstile/) to your login form, create Application Security [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) and [custom rules](https://developers.cloudflare.com/waf/custom-rules/) for suspicious patterns, and monitor for ongoing attacks using [SSL/TLS](https://developers.cloudflare.com/ssl/) transport security and [Cloudflare bot solutions](https://developers.cloudflare.com/bots/). The core workflow covers features available on Free, Pro, and Business plans. Enterprise features such as leaked credentials custom detection locations and Bot Management custom rules are included as callouts.

Note

Most procedures in this guide are configured per domain or [zone](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones). Select your domain in the Cloudflare dashboard before starting. Turnstile is the exception: widgets are configured at the account level.

## Enforce HTTPS to protect credentials in transit

Credentials sent over plain HTTP are visible to anyone on the network path between the visitor and your origin server. Cloudflare [SSL/TLS](https://developers.cloudflare.com/ssl/) provides two settings that enforce HTTPS connections: [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/) and [HTTP Strict Transport Security (HSTS)](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/). For additional control over which encryption standards your domain accepts, refer to [Cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/).

### Turn on Always Use HTTPS

Always Use HTTPS redirects all visitor requests from `http` to `https` for all subdomains and hosts.

* [ Dashboard ](#tab-panel-11069)
* [ API ](#tab-panel-11070)

To enable **Always Use HTTPS** in the dashboard:

1. In the Cloudflare dashboard, go to the **SSL/TLS Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls)
2. Make sure that your [SSL/TLS encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/off/) is not set to **Off**. When you set your encryption mode to **Off**, the **Always Use HTTPS** option will not be visible in your Cloudflare dashboard.
3. Go to the [**Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates) page.
4. Turn on **Always Use HTTPS**.

To enable or disable **Always Use HTTPS** with the API:

1. Make sure that your [SSL/TLS encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/off/) **is not** set to **Off**.
2. Send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `always_use_https` as the setting name in the URI path, and the `value` parameter set to your desired setting (`"on"` or `"off"`).

Note

Cloudflare recommends not performing redirects at your origin web server, as this can cause [redirect loop errors](https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/).

Optional: HTTP Strict Transport Security (HSTS)

For additional transport hardening, consider enabling HTTP Strict Transport Security (HSTS). HSTS tells browsers to only connect over HTTPS, preventing downgrade attacks on the initial request. HSTS is irreversible for the configured Max Age duration. If you later disable HTTPS, your site becomes inaccessible until the Max Age expires. Review the [HSTS requirements](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/#requirements) before turning it on.

## Turn on bot protection

Cloudflare provides bot protection on all plans, with features that vary by plan tier. Turning on bot protection before configuring login-specific rules gives you a baseline filter against automated traffic across your entire domain.

### Bot Fight Mode (Free)

Bot Fight Mode challenges requests that match known bot patterns. It applies to all traffic on your domain and cannot be customized with exceptions or path-specific rules.

* [  New dashboard ](#tab-panel-11071)
* [ Old dashboard ](#tab-panel-11072)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **Bot fight mode**.
4. Turn **Bot fight mode** on.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Security** \> **Bots**.
3. For **Bot Fight Mode**, select **On**.

Note

Bot Fight Mode cannot be skipped by custom rules because it does not run inside the Ruleset Engine. If you need to exempt specific traffic (monitoring tools, partner APIs), upgrade to Super Bot Fight Mode on the Pro plan.

### Super Bot Fight Mode (Pro, Business, and Enterprise)

Super Bot Fight Mode identifies traffic matching patterns of known bots, can challenge or block bots, and offers protection for static resources. You configure a separate action for each bot grouping: **Definitely automated**, **Likely automated**, and **Verified bots**. You can also [configure exceptions](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/#configure-exceptions-to-super-bot-fight-mode) using Application Security [custom rules](https://developers.cloudflare.com/waf/custom-rules/) with the Skip action.

Note

If you are upgrading from Bot Fight Mode to Super Bot Fight Mode, you must disable Bot Fight Mode in your Bot settings.

* Old dashboard: **Security** \> **Bots**, and select **Configure Bot Fight Mode**.
* New dashboard: **Security** \> **Settings**. Filter by **Bot traffic** and turn **Bot fight mode** off.

* [  New dashboard ](#tab-panel-11073)
* [ Old dashboard ](#tab-panel-11074)

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

For login protection, the following are recommended starting values. Adjust based on your traffic patterns.

* **Definitely automated**: _Managed Challenge_. After reviewing Security Events to confirm the setting does not affect legitimate traffic, switch to _Block_.
* **Likely automated**: _Managed Challenge_.
* **Verified bots**: _Allow_.

Warning

If your organization also uses [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), keep **Definitely Automated** set to **Allow**. Otherwise, tunnels might fail with a `websocket: bad handshake` error.

[Custom rules](https://developers.cloudflare.com/waf/custom-rules/) are executed before Super Bot Fight Mode. To create exceptions for specific paths or traffic, create a custom rule with the [Skip action](https://developers.cloudflare.com/waf/custom-rules/skip/). The Skip action allows the request to bypass the Super Bot Fight Mode phase without terminating the request, enabling it to continue through the rest of the security stack.

## Protect your login form with Turnstile and rate limiting

Two tools protect login endpoints from automated abuse, and they cover different attack vectors:

* **[Turnstile](https://developers.cloudflare.com/turnstile/)** verifies that visitors are human without showing a CAPTCHA. It can be embedded into any website without sending traffic through Cloudflare. Use Turnstile to challenge automated form submissions.
* **Application Security [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/)** define rate limits for requests matching an expression and the action to perform when those limits are reached. Use rate limiting to protect login endpoints from abuse, such as brute-force attacks.

Both together provide the strongest coverage. Turnstile challenges automated submissions at the form level. Rate limiting catches high-volume attacks that bypass or do not encounter the form, such as direct `POST` requests to the endpoint.

### Add Turnstile to your login form

Implementing Turnstile involves three steps: create a widget, add the client-side snippet to your login form, and validate the token on your server. Turnstile supports multiple [rendering methods](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/) including explicit and implicit rendering. You can also [inject Turnstile into HTML using a Cloudflare Worker](https://developers.cloudflare.com/workers/examples/turnstile-html-rewriter/) if you do not control the login form source code.

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

Add the Turnstile script and widget container to your login form. Replace `<YOUR-SITE-KEY>` with the sitekey from the previous step.

```

<form id="login-form">

  <input type="text" id="username" placeholder="Username" required />

  <input type="password" id="password" placeholder="Password" autocomplete="off" required />

  <div class="cf-turnstile" data-sitekey="<YOUR-SITE-KEY>"></div>

  <button type="submit">Log in</button>

</form>


<script

  src="https://challenges.cloudflare.com/turnstile/v0/api.js"

  async

  defer

></script>


```

The widget renders inside the `div` and produces a token when the visitor passes the challenge. When the form is submitted, a `cf-turnstile-response` token is included in the form data.

#### 3\. Validate the token on your server

Before processing the form submission, send the token to the Turnstile siteverify endpoint to confirm the visitor passed the challenge.

server.js

```

const SECRET_KEY = "<YOUR-SECRET-KEY>";


async function validateTurnstile(token, remoteip) {

  try {

    const response = await fetch(

      "https://challenges.cloudflare.com/turnstile/v0/siteverify",

      {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          secret: SECRET_KEY,

          response: token,

          remoteip: remoteip,

        }),

      },

    );


    const result = await response.json();

    return result;

  } catch (error) {

    console.error("Turnstile validation error:", error);

    return { success: false, "error-codes": ["internal-error"] };

  }

}


```

Replace `"<YOUR-SECRET-KEY>"` with your Turnstile secret key. The endpoint returns a JSON object with a `success` field. Only process the form submission if `success` is `true`.

For additional fraud detection, Turnstile supports [Ephemeral IDs](https://developers.cloudflare.com/turnstile/tutorials/fraud-detection-with-ephemeral-ids/) that provide a unique, temporary identifier for each visitor session without storing personal data.

For the complete response format, error codes, and examples in other languages, refer to [Validate the token](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).

#### Test your implementation

Turnstile provides test site keys that return predictable results without contacting the Siteverify API.

* **Always passes**: Use site key `1x00000000000000000000AA` and secret key `1x0000000000000000000000000000000AA` to simulate a successful challenge.
* **Always blocks**: Use site key `2x00000000000000000000AB` and secret key `2x0000000000000000000000000000000AA` to simulate a failed challenge.
* **Forces interactive challenge**: Use site key `3x00000000000000000000FF` to test the interactive challenge flow.

For the full list of test keys and expected behaviors, refer to [Test your Turnstile implementation](https://developers.cloudflare.com/turnstile/troubleshooting/testing/).

### Rate limit your login endpoint

#### Create a rate limiting rule for your login endpoint

The following example creates a rate limiting rule that issues a Managed Challenge after more than five POST requests to your login path from the same IP within one minute. Start with Managed Challenge rather than Block. Managed Challenge allows legitimate users who trigger the limit to pass by completing a challenge, while blocking automated traffic that cannot solve it. After monitoring [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) to confirm the rule is not producing false positives, switch to Block. Adjust the path (`/login`), threshold, and period for your site.

Warning

Managed Challenge and other [challenge types](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/) require an HTML response to render. They do not work for non-HTML responses such as AJAX/XHR requests, which are common on login endpoints that use single-page applications (SPAs) or API-based authentication. If your login flow uses AJAX, consider using [Turnstile Pre-Clearance](https://developers.cloudflare.com/turnstile/additional-configuration/pre-clearance-support/) instead.

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** and choose **Rate limiting rules**.
3. Enter a name for the rule (for example, "Rate limit login endpoint").
4. Under **When incoming requests match**, select **Edit expression** and enter: `http.host eq "example.com" and http.request.uri.path eq "/login" and http.request.method eq "POST"`  
Replace \`example.com\` with your domain and \`/login\` with your login endpoint path.
5. Under **With the same characteristics**, verify that _IP_ is selected. On Free plans, this is preset to _IP_.
6. Under **When rate exceeds**, enter _5_ for **Requests** and select a value for **Period**. On Free plans, select _10 seconds_. Pro and above plans offer additional periods. For available values by plan, refer to [Rate limiting parameters](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/).
7. Under **Then take action**, select an action from the **Choose action** dropdown. On Free plans, select _Block_. On Pro and above, _Managed Challenge_ is recommended because it allows legitimate users who trigger the limit to pass by completing a challenge.
8. Under **For duration**, select a duration for the action. On Free plans, select _10 seconds_. Pro and above plans offer longer durations. This is how long the action applies after the rate limit is triggered.
9. Select **Deploy**.

Note

(Optional) To count only failed login attempts instead of all matching requests, Business plan and above users can add a separate counting expression under **Increment counter when**:

```

http.request.uri.path eq "/login" and http.request.method eq "POST" and http.response.code in {401 403}


```

This counts requests based on the response status code. Successful logins (200) do not increment the counter.

Advanced Rate Limiting (Enterprise)

Enterprise customers with Advanced Rate Limiting can rate limit by characteristics beyond IP address, which is useful when attackers distribute attempts across many IP addresses. For available characteristics and plan availability, refer to [Rate limiting parameters](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/).

#### Escalating rate limits for persistent attackers

For sites that experience sustained credential stuffing campaigns, consider deploying multiple rate limiting rules with increasing severity. The [Rate limiting best practices](https://developers.cloudflare.com/waf/rate-limiting-rules/best-practices/) page describes an escalating penalty pattern that uses three rules: a short-window rule for quick bursts, a medium-window rule for slower distributed attacks, and a long-window rule that blocks persistent attackers from the entire domain. The counting expressions use response status codes, so successful logins do not count against the limit. Refer to the best practices page for the recommended thresholds and expression syntax.

Note

These example rules require a Business plan or above because they use counting expressions that reference HTTP response codes.

## Add Application Security rules for suspicious login patterns

Application Security [custom rules](https://developers.cloudflare.com/waf/custom-rules/) and [traffic detections](https://developers.cloudflare.com/waf/detections/) give you additional signals beyond request rate to identify and act on suspicious login traffic. Detections populate request fields (such as leaked credential status and bot score) that your custom rules can then reference.

### Turn on leaked credentials detection

Leaked credentials detection scans incoming login requests for usernames and passwords that appear in known data breach databases. Cloudflare hashes credentials before comparison and does not store plaintext passwords. When a match is found, the detection populates fields you can use in custom rules and rate limiting rules.

The `cf.waf.credential_check.password_leaked` field is available on all plans.

Note

The `cf.waf.credential_check.username_and_password_leaked` field requires a Pro plan or above.

On Free plans, the leaked credentials detection is enabled by default, and no action is required. On paid plans, you can turn on the detection in the Cloudflare dashboard, via API, or using Terraform.

* [  New dashboard ](#tab-panel-11075)
* [ Old dashboard ](#tab-panel-11076)
* [ API ](#tab-panel-11077)
* [ Terraform ](#tab-panel-11078)

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Detection tools**.
3. Turn on **Leaked credential detection**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Settings**.
3. Under **Incoming traffic detections**, turn on **Leaked credentials**.

Use a `POST` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Account WAF Write`

Set Leaked Credential Checks Status

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/leaked-credential-checks" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "enabled": true

  }'


```

Use the `cloudflare_leaked_credential_check` resource to enable leaked credentials detection for a zone. For example:

```

resource "cloudflare_leaked_credential_check" "zone_lcc_example" {

  zone_id = var.cloudflare_zone_id

  enabled = true

}


```

After turning on the detection, your origin server can receive leaked credential status via the `Exposed-Credential-Check` request header. To forward this header, turn on the [Add leaked credentials checks header](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/#add-leaked-credentials-checks-header) managed transform. Your origin can then trigger a password reset for affected users.

Enterprise: Custom detection locations

If your application uses non-standard credential field names, Enterprise customers can configure [custom detection locations](https://developers.cloudflare.com/waf/detections/leaked-credentials/#custom-detection-locations) to tell Cloudflare where to find usernames and passwords in HTTP requests.

### Create a skip rule for legitimate automated traffic

Before deploying rules that challenge or block login traffic, create a skip rule that exempts known legitimate automated traffic. This prevents your monitoring tools, health checks, and partner integrations from being blocked by the rules that follow.

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** and choose **Custom rules**.
3. Enter a name for the rule (for example, "Skip login rules for known clients").
4. Select **Edit expression** and enter an expression that matches your legitimate automated traffic. For example, to skip verified bots and a specific monitoring service IP:  
```  
(cf.client.bot) or (ip.src eq 198.51.100.1)  
```  
Replace `198.51.100.1` with the IP address of your monitoring service. Add additional conditions for other known clients.
5. Under **Then take action**, select _Skip_. Under **WAF components to skip**, select the components that apply to your login protection rules (for example, **All remaining custom rules** and **All rate limiting rules**).
6. Select **Deploy**.
7. Under **Place at**, place the rule above your blocking and challenge rules. Custom rules execute in order, so the skip rule must come first.

For more information about the Skip action and available skip options, refer to [Skip action](https://developers.cloudflare.com/waf/custom-rules/skip/).

### Block requests with suspicious headers

Credential stuffing tools often send requests without standard browser headers or with known-bad User-Agent patterns. Create a custom rule that issues a Managed Challenge for POST requests to your login path where the User-Agent is empty. This targets direct POST requests from tools like `curl`, `python-requests`, or `undici` that do not set a User-Agent header.

Note

The Application Security Managed Ruleset includes rules for empty user-agents, but these are disabled by default and apply broadly. The custom rule below targets your login path specifically.

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** and choose **Custom rules**.
3. Enter a name for the rule (for example, "Challenge empty UA on login").
4. Select **Edit expression** and enter:  
```  
(http.request.uri.path eq "/login" and http.request.method eq "POST" and len(http.user_agent) eq 0)  
```  
Replace `/login` with your login endpoint path.
5. Under **Then take action**, select _Managed Challenge_.
6. Select **Deploy**.

### Create a rate limiting rule with leaked credentials

Combine rate limiting with leaked credentials detection to throttle login attempts that use known-compromised passwords. This rule issues a Managed Challenge when the same IP sends more than three requests with leaked passwords within one minute.

1. On the **Security rules** page, select **Create rule** and choose **Rate limiting rules**.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Enter a name for the rule (for example, "Rate limit leaked credentials").
3. Under **When incoming requests match**, enter the following expression:  
```  
http.request.uri.path eq "/login" and http.request.method eq "POST" and cf.waf.credential_check.password_leaked  
```  
Replace `/login` with your login endpoint path.
4. Under **With the same characteristics**, verify that _IP_ is selected. On Free plans, this is preset to _IP_.
5. Under **When rate exceeds**, enter _3_ for **Requests** and select a value for **Period**. On Free plans, select _10 seconds_.
6. Under **Then take action**, select an action. On Free plans, select _Block_. On Pro and above, _Managed Challenge_ is recommended.
7. Under **For duration**, select a duration for the action. On Free plans, select _10 seconds_.
8. Select **Deploy**.

Enterprise: Bot Management

Enterprise customers with Bot Management get additional tools for login protection:

* **Custom rules with bot scores**: combine `cf.bot_management.score` with login path matching for precise control. Refer to [Custom rules for bot protection](https://developers.cloudflare.com/bots/additional-configurations/custom-rules/).
* **Account takeover detections**: monitor suspicious login volume and failure rates using detection IDs in custom rules and rate limiting rules. Refer to [Account takeover detections](https://developers.cloudflare.com/bots/additional-configurations/detection-ids/account-takeover-detections/).
* **Account Abuse Protection** (Early Access): detect account fraud patterns beyond credential stuffing. Refer to [Account Abuse Protection](https://developers.cloudflare.com/bots/account-abuse-protection/).

## Monitor for ongoing compromise attempts

After deploying the rules and configurations from the previous sections, monitor your login endpoint to verify the rules are working and to detect new attack patterns.

### Review Security Events

[Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) shows requests that Cloudflare security products acted on or flagged, including blocks, challenges, and skips.

1. In the Cloudflare dashboard, go to the **Analytics** page.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
2. Select the **Events** tab.

Review the **Sampled logs** to inspect individual requests. Each log entry shows the action taken, the rule that triggered, the source IP, user agent, URI path, and country. Use the **Add filter** button to narrow results by action, source IP, ASN, or other fields.

Look for false positives — legitimate traffic that your rules incorrectly challenged or blocked. Common signs include:

* Requests from known monitoring services or payment processors appearing in blocked events
* High volumes of challenged requests from countries where you have real users
* Rate limiting rules triggering on legitimate users during peak traffic

If you see legitimate users being affected, adjust your rate limiting thresholds or add skip rules for specific IP ranges.

### Set up notifications for security event spikes (Business and Enterprise)

Set up a **Security Events Alert** notification to receive alerts when security event volume spikes, giving you early warning of a new attack campaign. This notification is in the **WAF** category of the [Notifications](https://developers.cloudflare.com/notifications/) page. For setup instructions, refer to [Create a notification](https://developers.cloudflare.com/notifications/get-started/). Enterprise customers can use **Advanced Security Events Alert** for more granular filtering.

### Review bot traffic patterns (Pro and above)

Bot traffic analytics show bot score distribution on your login endpoint over time. A sudden spike in low-score traffic (scores 1-29) on your login path is an early signal of a credential stuffing campaign.

Cloudflare classifies bot traffic into categories based on bot scores and verification status:

* **Verified bots**: Crawlers and services that Cloudflare has confirmed as legitimate, such as Googlebot, Bingbot, and uptime monitors. Cloudflare maintains a [verified bot list](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/policy/) with strict requirements.
* **Automated** (score 1): Cloudflare is quite certain the request is automated.
* **Likely automated** (scores 2-29): Probably a bot. This category and Automated are the primary targets for security rules, including scrapers, credential stuffing tools, and spam submitters.
* **Likely human** (scores 30-99): These requests appear to come from real users. Do not challenge or block this traffic.
1. In the Cloudflare dashboard, go to **Security** \> **Analytics** \> **Bot analysis**.
2. Review the traffic distribution across the bot score groupings above.

If you see sustained automated traffic reaching your login endpoint despite the rules deployed in this guide, review the [Security features interoperability](https://developers.cloudflare.com/waf/feature-interoperability/) page to verify your rules are executing in the expected order, and consider adjusting thresholds.

## Related resources

**Application Security**

* [Rate limiting best practices](https://developers.cloudflare.com/waf/rate-limiting-rules/best-practices/) — recommended patterns for login protection and credential stuffing
* [Custom rules](https://developers.cloudflare.com/waf/custom-rules/) — create rules using request fields including bot score and leaked credentials
* [Leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) — scan incoming requests for credentials from known data breaches
* [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) — review requests acted on by security products

**Cloudflare Bots**

* [Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) — free bot protection that challenges known bot patterns
* [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) — Pro and Business bot protection with configurable actions
* [Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/) — Enterprise bot protection with ML-powered scoring and custom rules

**Turnstile**

* [Get started with Turnstile](https://developers.cloudflare.com/turnstile/get-started/) — create widgets and implement client-side and server-side validation
* [Server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) — validate Turnstile tokens on your server
* [Turnstile Pre-Clearance](https://developers.cloudflare.com/turnstile/additional-configuration/pre-clearance-support/) — pre-clear visitors for SPA and AJAX login flows

**SSL/TLS**

* [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/) — redirect all HTTP requests to HTTPS
* [HTTP Strict Transport Security (HSTS)](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/) — prevent browser downgrade attacks with HSTS headers

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/solutions/stop-account-takeover-attacks/#page","headline":"Stop account takeover attacks (Free, Pro, and Business) · Cloudflare use cases","description":"Block credential stuffing and brute force attacks on login endpoints using a layered defense.","url":"https://developers.cloudflare.com/use-cases/solutions/stop-account-takeover-attacks/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/solutions/","name":"Solution guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/solutions/stop-account-takeover-attacks/","name":"Stop account takeover attacks (Free, Pro, and Business)"}}]}
```
