---
title: Any Hostname (Enterprise only)
description: Allow Turnstile widgets on any hostname with Enterprise plans.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Any Hostname (Enterprise only)

The Any Hostname feature removes the requirement to specify hostnames during widget creation, allowing widgets to function on any domain.

By default, hostname validation is a security feature that prevents unauthorized use of your widgets. The Any Hostname entitlement removes this restriction, making the hostname field optional during widget creation.

When enabled, widgets can be created without the required hostname specification and used on any domain without pre-configuration. Hostname validation protection is also removed.

## Implementation

To reduce security risks when using Any Hostname, monitor widget usage through [Turnstile Analytics](https://developers.cloudflare.com/turnstile/turnstile-analytics/) to identify unexpected patterns, implement server-side validation with hostname checking in your application code, and use `action` and `cData` parameters to track widget usage sources and identify where widgets are being deployed.

When using the Any Hostname feature, it is essential to implement additional validation in your server-side code to maintain security controls. Always validate the `hostname` field in Siteverify responses.

Example response

```

async function validateTurnstileWithHostname(token, expectedHostnames = []) {

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {

    method: 'POST',

    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify({

      secret: process.env.TURNSTILE_SECRET,

      response: token

    })

  });


  const result = await response.json();


  if (!result.success) {

    return { valid: false, error: 'Token validation failed' };

  }


  // Additional hostname validation when using Any Hostname

  if (expectedHostnames.length > 0 && !expectedHostnames.includes(result.hostname)) {

    return {

      valid: false,

      error: 'Hostname not in allowed list',

      hostname: result.hostname

    };

  }


  return { valid: true, data: result };

}


```

You should regularly review Turnstile Analytics for unexpected usage patterns and monitor the hostname field in Siteverify responses. You can set up alerts for widget usage on unexpected domains.

Use `action` and `cData` parameters to track widget usage sources.

```

<!-- Widget with tracking information -->

<div class="cf-turnstile"

     data-sitekey="your-site-key"

     data-action="customer-portal"

     data-cdata="tenant-123"></div>


```

---

## Use cases

The Any Hostname feature is particularly valuable for customers with:

* Large domain portfolios with many domains to manage individually.
* Dynamic subdomain creation and frequently create subdomains or customer-specific domains.
* Multi-tenant applications such as SaaS platforms serving multiple customer domains.
* Development environments that test across various staging and development domains.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/additional-configuration/hostname-management/any-hostname/#page","headline":"Any Hostname (Enterprise only) · Cloudflare Turnstile docs","description":"Allow Turnstile widgets on any hostname with Enterprise plans.","url":"https://developers.cloudflare.com/turnstile/additional-configuration/hostname-management/any-hostname/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/additional-configuration/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/additional-configuration/hostname-management/","name":"Hostname management"}},{"@type":"ListItem","position":5,"item":{"@id":"/turnstile/additional-configuration/hostname-management/any-hostname/","name":"Any Hostname (Enterprise only)"}}]}
```
