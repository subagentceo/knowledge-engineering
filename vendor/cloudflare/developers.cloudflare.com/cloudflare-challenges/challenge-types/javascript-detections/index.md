---
title: JavaScript Detections
description: Client-side JavaScript challenges that run on every request to identify automated traffic.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-challenges/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# JavaScript Detections

JavaScript Detections is a type of challenge separate from Cloudflare’s Challenge Pages or Turnstile. JavaScript Detections helps Cloudflare's [bot solutions](https://developers.cloudflare.com/bots/) identify automated requests.

While Challenge Pages and Turnstile rely on client-side signals to determine the authenticity of a request, Bot Management’s JavaScript Detections relies on client-side signals and runs on every single request made to your website.

## Process

JavaScript Detections is implemented on your website via a lightweight, invisible JavaScript code snippet that follows Cloudflare's [privacy standards ↗](https://www.cloudflare.com/privacypolicy/).

JavaScript is injected only in response to requests for HTML pages or page views, excluding AJAX calls. API and mobile application traffic is unaffected.

JavaScript Detections has a lifespan of 15 minutes. However, the code is injected again before the session expires. After page load, the script is deferred and utilizes a separate thread (where available) to ensure that performance impact is minimal. The snippets of JavaScript will contain a source pointing to the Challenge Platform, with paths that start with `/cdn-cgi/challenge-platform/…`

Once JavaScript Detections is injected on the HTML page, the visitor's browser will run the JavaScript code snippet and a `cf_clearance` cookie is issued to the visitor. The information in JavaScript Detections is stored in the `cf_clearance` cookie and is used to populate `js_detection.passed`.

* If the visitor is verified and a `cf_clearance` cookie is issued, it will contain the outcome: `cf.bot_management.js_detection.passed` \= `true`
* If the verification fails, the cookie will contain the outcome: `cf.bot_management.js_detection.passed` \= `false`

Note

The `cf_clearance` cookie cannot exceed the maximum size of 4096 bytes.

Warning

Enforcement against bots does **not** occur even if the cookie is flagged false.

You must enable JavaScript Detections and then create a custom WAF rule using the `cf.bot_management.js_detection.passed` field to block or challenge a failed request.

When the visitor encounters a WAF custom rule on your website, the rule will check the outcome of the `cf_clearance` cookie. The outcome of the `cf_clearance` cookie determines whether the request passes, or is blocked or challenged.

Refer to the steps below to enable and enforce JavaScript Detections.

## 1\. Enable JavaScript Detections

For Bot Fight Mode customers, [JavaScript Detections](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/javascript-detections/) is automatically enabled and cannot be disabled.

For Super Bot Fight Mode and Bot Management for Enterprise customers, [JavaScript Detections](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/javascript-detections/) is optional.

* [  New dashboard ](#tab-panel-7009)
* [ Old dashboard ](#tab-panel-7010)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Under your bot traffic plan configurations, select the edit icon for **JS detections** and turn **JavaScript Detections** on.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Bots**.
3. Select **Configure Bot Management**.
4. For **JavaScript Detections**, switch the toggle to **On**.

For more details on how to set up bot protection, refer to the [Bots documentation](https://developers.cloudflare.com/bots/get-started/).

## 2\. Enforce execution of JavaScript Detections

Once you enable JavaScript detections, you must use the `cf.bot_management.js_detection.passed` field to create [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/) (or the `request.cf.botManagement.jsDetection.passed` variable in [Workers](https://developers.cloudflare.com/workers/)).

When adding this field to WAF custom rules, it is used on endpoints expecting browser traffic (avoiding native mobile applications or websocket endpoints), after a user's first request to your application (Cloudflare needs at least one HTML request before injecting JavaScript detection), and with the Managed Challenge action, because there are legitimate reasons a user might not have passed a JavaScript Detection challenge (network issues, ad blockers, disabled JavaScript in browser, native mobile applications).

### Prerequisites

* You must have an [Enterprise Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/) subscription.
* You must have JavaScript Detections enabled on your zone.
* You must have [updated your Content Security Policy headers](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/javascript-detections/#if-you-have-a-content-security-policy-csp) for JavaScript detections.
* You must not run this field on websocket endpoints.
* You must use the field in a custom rules expression that expects only browser traffic.
* The action should always be a managed challenge in case a legitimate user has not received the challenge for network or browser reasons.
* The path specified in the rule builder should never be the first HTML page a user visits when browsing your site.

The `cf.bot_management.js_detection.passed` field should never be used in a WAF custom rule that matches a visitor's first request to a site. It is necessary to have at least one HTML request before Cloudflare can inject JavaScript detection.

* [ WAF rule example ](#tab-panel-7007)
* [ Workers example ](#tab-panel-7008)

```

(http.request.uri.path eq "/api/v4/user/create" and http.request.method eq "POST" and not cf.bot_management.verified_bot)

and (cf.bot_management.score lt 30 or !cf.bot_management.js_detection.passed)


```

JavaScript

```

"botManagement": {

"jsDetection": {

    "passed": false

}

}


```

Refer to the [WAF documentation](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) for more information on creating a custom rule.

## API

If you enable JavaScript Detections via the dashboard, Cloudflare will insert a script tag in all HTML pages served on your website. If you would prefer to limit where JavaScript Detections is served, you can do so with the JavaScript Detections API script.

The JavaScript Detections API allows you more granular control over when and where JavaScript Detections is injected on your website, as well as an option for callback handling (for logging or other additional actions).

You can explicitly add a script reference to `/cdn-cgi/challenge-platform/scripts/jsd/api.js` and your own code calling `window.cloudflare.jsd.executeOnce` on specific HTML pages of your website.

Warning

It is not recommended to combine both approaches (zone-wide toggle and the manual injection). If you want to selectively deploy JavaScript Detections only on certain pages, disable JavaScript Detections via the Cloudflare dashboard and use the JavaScript Detections API exclusively.

The following script must be added to every page that you wish to have JavaScript Detections enabled:

```

<script>


function jsdOnload(){

  window.cloudflare.jsd.executeOnce(

    {

      callback: function(result){

        console.log('jsd outcome', result);

      }

    }

  );

}

</script>

<script src="/cdn-cgi/challenge-platform/scripts/jsd/api.js?onload=jsdOnload" async>


```

Note

`result` \= `success` or `error` only refers to the execution of JavaScript Detections. It does not indicate whether a visitor is a human or a bot.

## Considerations

JavaScript Detections does not guarantee a specific bot score.

* If the JavaScript Detections injection or execution fails and `cf.bot_management.js_detection.passed` \= `false`, a separate Bot Management heuristic can still yield a `1` or higher bot score, independent of JavaScript Detections.
* If the JavaScript Detections passes, the final bot score may still be `1` due to other detection heuristics (for example, known malicious IP, signature detection, and more), resulting in `js_detection.passed` \= `true`, but `score` \= `1`.

## Limitations

### If you enabled Bot Management before June 2020

Customers who enabled Enterprise Bot Management before June 2020 do not have JavaScript Detections enabled by default (unless specifically requested). These customers can still enable the feature in the Cloudflare dashboard.

### If it is the first request to your website

The first request from a new client to your website or application will generally not have JavaScript Detections data (`cf.bot_management.js_detection.passed` \= `false`). This is because Cloudflare needs at least one HTML request before injecting JavaScript Detection and issuing the `cf_clearance` cookie.

Subsequent requests can include a `cf_clearance` cookie if JavaScript ran successfully.

### If you have a Content Security Policy (CSP)

If you have a Content Security Policy (CSP), you need to take additional steps to implement JavaScript Detections:

* Ensure that anything under `/cdn-cgi/challenge-platform/` is allowed. Your CSP should allow scripts served from your origin domain (`script-src self`).
* For `nonce` script tags:  
   * If your CSP uses a `nonce` for script tags, Cloudflare will add these nonces to the scripts it injects by parsing your CSP response header.  
   * If your CSP does not use `nonce` for script tags and **JavaScript Detections** is enabled, you may see a console error such as `Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-b123b8a70+4jEj+d6gWI9U6IilUJIrlnRJbRR/uQl2Jc='), or a nonce ('nonce-...') is required to enable inline execution.` We highly discourage the use of `unsafe-inline` and instead recommend the use CSP `nonces` in script tags which we parse and support in our CDN.

Warning

JavaScript Detections is not supported with `nonce` set via `<meta>` tags.

### If you have ETags

Enabling JavaScript Detections (JSD) will strip [ETags](https://developers.cloudflare.com/cache/reference/etag-headers/) from HTML responses where JSD is injected.

### If your origin sends a `no-transform` header

If the origin response includes a `Cache-Control: no-transform` directive, Cloudflare does not inject the JavaScript Detections script. The `cf.bot_management.js_detection.passed` field will show as `missing` for these requests.

To use JavaScript Detections, remove the `no-transform` directive from `Cache-Control` response headers on pages where you want JavaScript Detections to run. For more information, refer to [Cache-Control directives](https://developers.cloudflare.com/cache/concepts/cache-control/#interaction-with-other-cloudflare-features).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-challenges/challenge-types/javascript-detections/#page","headline":"JavaScript Detections · Cloudflare challenges docs","description":"Client-side JavaScript challenges that run on every request to identify automated traffic.","url":"https://developers.cloudflare.com/cloudflare-challenges/challenge-types/javascript-detections/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript","CSP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-challenges/","name":"Challenges"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-challenges/challenge-types/","name":"Available Challenges"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-challenges/challenge-types/javascript-detections/","name":"JavaScript Detections"}}]}
```
