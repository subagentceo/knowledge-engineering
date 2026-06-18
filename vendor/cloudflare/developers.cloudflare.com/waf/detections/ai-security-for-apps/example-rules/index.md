---
title: Example mitigation rules
description: Example mitigation rules for AI Security for Apps detections.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Example mitigation rules

## Return a custom error when a user asks about violent or hateful content

A customer support chatbot should not engage with prompts about violent crimes or hate speech. This [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) blocks the request and returns a JSON response that your application can parse and display to the user.

* **When incoming requests match**:  
| Field                       | Operator | Value                        |  
| --------------------------- | -------- | ---------------------------- |  
| LLM Unsafe topic categories | is in    | S1: Violent Crimes S10: Hate |  
Expression when using the editor:  
`(any(cf.llm.prompt.unsafe_topic_categories[*] in {"S1" "S10"}))`
* **Action**: _Block_
* **With response type**: Custom JSON
* **Response body**:  
```  
{ "error": "content_policy", "message": "Your message could not be processed because it touches on a topic outside this assistant's scope. Please rephrase your question." }  
```

Your application can check for a non-200 response and display the `message` field to the user, keeping the experience conversational instead of showing a raw block page.

## Block prompt injection attempts from automated sources outside your country

This rule combines AI Security for Apps's [injection score](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/prompt-injection/) with [Bot Management](https://developers.cloudflare.com/bots/get-started/) and the request's country to focus on high-confidence attacks from automated sources. This layered approach significantly reduces false positives compared to using any single signal alone.

* **When incoming requests match**:  
Enter the following expression in the editor:  
`(cf.llm.prompt.injection_score lt 25 and cf.bot_management.score lt 10 and ip.geoip.country ne "US")`
* **Action**: _Block_

The rule targets requests that are simultaneously:

1. Likely prompt injection attempts (score below 25).
2. Coming from automated tooling, not a real browser (bot score below 10).
3. Originating from outside the US — adjust the country code to match where your users are.

Any single signal might produce false positives on its own. Together, they identify a pattern strongly associated with automated prompt injection attacks.

## Allow financial PII only from your internal network

A financial services application legitimately handles credit card and bank account numbers from internal agents, but should block those PII types from external users. This rule uses the request's [autonomous system number (ASN)](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.asnum/) to distinguish internal traffic from public traffic.

* **When incoming requests match**:  
Enter the following expression in the editor:  
`(any(cf.llm.prompt.pii_categories[*] in {"CREDIT_CARD" "US_BANK_NUMBER" "IBAN_CODE"}) and ip.src.asnum ne 13335)`  
Replace `13335` with your organization's ASN.
* **Action**: _Block_
* **With response type**: Custom JSON
* **Response body**:  
```  
{ "error": "pii_blocked", "message": "Financial account information cannot be submitted from external networks. If you are an internal agent, connect to the corporate network and try again." }  
```

Internal agents on your corporate network (identified by ASN) can submit financial PII to the AI assistant as part of their workflow, while external users are blocked. You could further refine this by combining with [Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) service tokens or [mTLS](https://developers.cloudflare.com/ssl/client-certificates/) for stronger identity verification.

## Handle block responses in your application

When a WAF rule blocks a request, Cloudflare sends the block response back to your application — not to the end user. Your application needs to handle that response and decide what to show. Without error handling, your users may see a raw HTML error page or a broken UI.

Here are two things you can do to keep the experience smooth.

### Set a fallback message

Define a friendly default message that your application displays whenever it receives a non-successful response. This works regardless of how the block rule is configured — including the default Cloudflare block page, which returns HTML that would otherwise break a JSON-based chat UI.

JavaScript

```

// Define a user-friendly fallback message. This is what the user will see

// any time the request is blocked or something unexpected happens.

const FALLBACK = "Sorry, I can't process that request. Please try rephrasing.";


const resp = await fetch("/api/chat", {

  method: "POST",

  headers: { "Content-Type": "application/json" },

  body: JSON.stringify({ prompt: userMessage }),

});


// If the response is not 2xx, show the fallback instead of trying to parse

// the body. This safely handles the default Cloudflare block page (which is

// HTML) without breaking your UI.

if (!resp.ok) {

  await resp.text(); // consume the body so the connection is released

  showError(FALLBACK);

  return;

}


const data = await resp.json();

showMessage(data.message);


```

### Display custom error messages from the WAF

For more control, configure your block rules with a [custom JSON response](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/#configure-a-custom-response-for-blocked-requests) — for example, `{ "message": "That question is outside this assistant's scope." }`. Your application can then parse the response and show the custom message when available, falling back to the default when it is not.

JavaScript

```

const FALLBACK = "Sorry, I can't process that request. Please try rephrasing.";


const resp = await fetch("/api/chat", {

  method: "POST",

  headers: { "Content-Type": "application/json" },

  body: JSON.stringify({ prompt: userMessage }),

});


if (!resp.ok) {

  // Check the content type to determine if the response contains a custom

  // JSON error from your WAF rule, or something else (like the default

  // Cloudflare HTML block page, or a DDoS / Bot Management challenge).

  const ct = (resp.headers.get("content-type") || "").toLowerCase();


  if (ct.includes("application/json")) {

    // The WAF returned your custom JSON response. Parse it and show the

    // message you configured in the rule. Fall back to the default if the

    // field is missing or empty.

    const data = await resp.json();

    showError(data.message || FALLBACK);

  } else {

    // The response is not JSON — most likely the default Cloudflare HTML

    // block page. Discard the body and show the friendly fallback.

    await resp.text();

    showError(FALLBACK);

  }

  return;

}


const data = await resp.json();

showMessage(data.message);


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/example-rules/#page","headline":"Example mitigation rules · Cloudflare Web Application Firewall (WAF) docs","description":"Example mitigation rules for AI Security for Apps detections.","url":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/example-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/ai-security-for-apps/","name":"AI Security for Apps"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/detections/ai-security-for-apps/example-rules/","name":"Example mitigation rules"}}]}
```
