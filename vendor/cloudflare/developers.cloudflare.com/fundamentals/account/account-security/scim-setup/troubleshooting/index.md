---
title: SCIM troubleshooting
description: Restore Super Administrator access and resolve common SCIM provisioning issues on your Cloudflare account.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SCIM troubleshooting

## Restore Super Administrator after group misconfiguration

If you have removed all Super Administrators mistakenly, you can restore the role to account member(s) using the Account API Token you created for SCIM provisioning.

First, fetch a list of account members and find the member ID for the user you want to restore Super Admin to via [list members](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/list/).

```

curl -X GET "https://api.cloudflare.com/client/v4/accounts/{account_id}/members" \

  -H "Authorization: Bearer YOUR_SCIM_AOT" \

  -H "Content-Type: application/json"


```

Then restore the Super Admin role to that member via [update member](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/update/)

```

curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account_id}/members/{member_id}" \

  -H "Authorization: Bearer YOUR_SCIM_AOT" \

  -H "Content-Type: application/json" \

  -d '{

    "roles": [

      {

        "id": "33666b9c79b9a5273fc7344ff42f953d"

      }

    ]

  }'


```

The value `33666b9c79b9a5273fc7344ff42f953d` is the role ID of Super Administrator.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/troubleshooting/#page","headline":"SCIM troubleshooting · Cloudflare Fundamentals docs","description":"Restore Super Administrator access and resolve common SCIM provisioning issues on your Cloudflare account.","url":"https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/account/","name":"Accounts"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/account/account-security/","name":"Account security"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/account/account-security/scim-setup/","name":"SCIM provisioning"}},{"@type":"ListItem","position":6,"item":{"@id":"/fundamentals/account/account-security/scim-setup/troubleshooting/","name":"SCIM troubleshooting"}}]}
```
