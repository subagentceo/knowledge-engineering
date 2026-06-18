---
title: Gradual rollouts
description: Provide static asset routing solutions for gradual Worker deployments.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Gradual rollouts

[Gradual deployments](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/) route requests to different Worker versions based on configured percentages. When your Worker serves static assets, this per-request routing can cause asset reference mismatches that result in 404 errors and broken user experiences.

Modern JavaScript frameworks commonly generate fingerprinted asset filenames during builds. For example, when you build a React application with Vite, your assets might look like:

```

dist/

├── index.html

├── assets/

│   ├── index-a1b2c3d4.js    # Main bundle with content hash

│   ├── index-e5f6g7h8.css   # Styles with content hash

│   └── logo-i9j0k1l2.svg    # Images with content hash


```

During a gradual rollout between two versions of your application, you might have:

**Version A (old build):**

* `index.html` references `assets/index-a1b2c3d4.js`
* `assets/index-a1b2c3d4.js` exists

**Version B (new build):**

* `index.html` references `assets/index-m3n4o5p6.js`
* `assets/index-m3n4o5p6.js` exists

If a user's initial request for `/` goes to Version A, they'll receive HTML that references `index-a1b2c3d4.js`. However, when their browser then requests `/assets/index-a1b2c3d4.js`, that request might be routed to Version B, which only contains `index-m3n4o5p6.js`, resulting in a 404 error.

This issue affects applications built with any framework that fingerprints assets, including:

* **React** (Create React App, Next.js, Vite)
* **Vue** (Vue CLI, Nuxt.js, Vite)
* **Angular** (Angular CLI)
* **Svelte** (SvelteKit, Vite)
* **Static site generators** that optimize asset loading

## Preventing asset mismatches with version affinity

[Version affinity](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/#version-affinity) ensures all requests from the same user are handled by the same Worker version, preventing asset reference mismatches entirely. You can configure this using [Transform Rules](https://developers.cloudflare.com/rules/transform/request-header-modification/) to automatically set the `Cloudflare-Workers-Version-Key` header.

### Session-based affinity

For applications with user sessions, use session identifiers:

Text in **Expression Editor**:

```

http.cookie contains "session_id"


```

Selected operation under **Modify request header**: _Set dynamic_

**Header name**: `Cloudflare-Workers-Version-Key`

**Value**: `http.request.cookies["session_id"][0]`

### User-based affinity

For authenticated applications, use user identifiers stored in cookies or headers:

Text in **Expression Editor**:

```

http.cookie contains "user_id"


```

Selected operation under **Modify request header**: _Set dynamic_

**Header name**: `Cloudflare-Workers-Version-Key`

**Value**: `http.request.cookies["user_id"][0]`

## Testing and monitoring

Before rolling out to production, verify that your version affinity setup works correctly:

Terminal window

```

# Test with version affinity - both requests should hit the same version

curl -H "Cookie: session_id=test123" https://your-worker.example.com/

curl -H "Cookie: session_id=test123" https://your-worker.example.com/assets/index.js


```

During gradual rollouts, monitor your Worker's analytics for increased 404 response rates, especially for asset files (`.js`, `.css`, `.png`). Use [Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) or [Logpush](https://developers.cloudflare.com/workers/observability/logs/logpush/) to track these metrics and catch asset mismatch issues early.

## Best practices

When deploying applications with fingerprinted assets using gradual rollouts:

* Use version affinity (preferably session-based) to ensure consistent asset loading
* Test asset loading using version overrides before increasing rollout percentages
* Monitor 404 rates during deployments to catch issues quickly
* Have rollback procedures ready in case asset problems arise
* Choose session-based or user-based affinity depending on your application's authentication model

With proper version affinity configuration, you can safely perform gradual deployments of applications that use modern build tools and asset optimization without worrying about broken user experiences from missing assets.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/routing/advanced/gradual-rollouts/#page","headline":"Gradual rollouts · Cloudflare Workers docs","description":"Provide static asset routing solutions for gradual Worker deployments.","url":"https://developers.cloudflare.com/workers/static-assets/routing/advanced/gradual-rollouts/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/static-assets/","name":"Static Assets"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/static-assets/routing/","name":"Routing"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/static-assets/routing/advanced/","name":"Advanced"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/static-assets/routing/advanced/gradual-rollouts/","name":"Gradual rollouts"}}]}
```
