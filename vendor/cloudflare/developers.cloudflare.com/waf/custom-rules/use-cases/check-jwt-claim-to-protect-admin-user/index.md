---
title: Issue challenge for admin user in JWT claim based on attack score
description: Use JWT claims and attack scores to protect admin users.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Issue challenge for admin user in JWT claim based on attack score

Note

To use claims inside a JSON Web Token (JWT), you must first set up a [token validation configuration](https://developers.cloudflare.com/api-shield/security/jwt-validation/api/) in API Shield.

This example configures additional protection for requests with a JSON Web Token (JWT) with a user claim of `admin`, based on the request's [attack score](https://developers.cloudflare.com/waf/detections/attack-score/).

[Create a custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) that issues a Managed Challenge if the user claim in a JWT is `admin` and the attack score is below 40.

* **When incoming requests match**  
Use the expression editor:  
`(lookup_json_string(http.request.jwt.claims["<TOKEN_CONFIGURATION_ID>"][0], "user") eq "admin" and cf.waf.score < 40)`
* **Then take action**: _Managed Challenge_

In this example, `<TOKEN_CONFIGURATION_ID>` is your [token configuration ID](https://developers.cloudflare.com/api-shield/security/jwt-validation/api/) found in JWT Validation and `user` is the JWT claim.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/check-jwt-claim-to-protect-admin-user/#page","headline":"Issue challenge for admin user in JWT claim based on attack score · Cloudflare Web Application Firewall (WAF) docs","description":"Use JWT claims and attack scores to protect admin users.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/check-jwt-claim-to-protect-admin-user/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JSON web token (JWT)"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/use-cases/","name":"Common use cases"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/use-cases/check-jwt-claim-to-protect-admin-user/","name":"Issue challenge for admin user in JWT claim based on attack score"}}]}
```
