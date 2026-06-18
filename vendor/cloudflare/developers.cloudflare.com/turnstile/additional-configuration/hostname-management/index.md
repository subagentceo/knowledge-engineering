---
title: Hostname management
description: Control which hostnames can serve your Turnstile widget.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Hostname management

Hostname management controls where your Turnstile widgets can be used by specifying which domains are authorized to load and execute your widgets. This security measure prevents unauthorized use of your widgets on domains that you do not control.

You can associate hostnames with your widget to control where it can be used via Hostname Management. Managing your hostnames ensures that Turnstile works seamlessly with your setup, whether you add standalone hostnames or leverage zones registered to your Cloudflare account.

---

## Hostname requirements

### Standard configuration

By default, every widget requires at least one hostname to be configured. You cannot create a widget without specifying at least one authorized hostname.

### Hostname format requirements

When adding hostnames, follow these requirements:

* The hostname must be fully qualified domain names (FQDNs): `example.com` or `subdomain.example.com`
* Wildcard characters (such as `*`) are not supported in the hostname field. However, adding a hostname automatically authorizes all of its subdomains.

Invalid formats

The following formats are not valid and will not be accepted:

* Schemes such as `http://example.com` or `https://example.com`
* Ports such as `example.com:443` or `subdomain.example.com:8080`
* Paths such as `example.com/path` or `subdomain.example.com/login`

### Subdomain behavior

When you add a hostname, the widget will work on that exact hostname and all of its subdomains. This means adding a root domain covers all subdomains beneath it, while adding a specific subdomain restricts the widget to only that subdomain and its children.

#### Example: Root domain

Adding `example.com` as a hostname will allow the widget to work on:

* `example.com`
* `www.example.com`
* `shop.example.com`
* `any.sub.example.com`

#### Example: Specific subdomain

Adding `www.example.com` as a hostname provides more restrictive control. The widget will work on:

* `www.example.com`
* `abc.www.example.com` (subdomains of the specified hostname)

However, it will **not** work on:

* `example.com` (parent domain)
* `dash.example.com` (sibling subdomain)
* `cloudflare.com` (unrelated domain)

Note

Use a specific subdomain when you want to restrict the widget to a narrower scope. For example, if you only want the widget on your checkout flow, add `checkout.example.com` rather than `example.com`.

## Add hostnames

* [ Dashboard ](#tab-panel-11008)
* [ API ](#tab-panel-11009)

Existing widget

1. In the Cloudflare dashboard, go to the **Turnstile** page.  
[ Go to **Turnstile** ](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Select an existing widget.
3. Go to **Settings**.
4. Under **Hostname Management**, select **Add Hostnames**.
5. Add a custom hostname or choose from an existing hostname.
6. Select **Add**.

New widget

1. In the Cloudflare dashboard, go to the **Turnstile** page.  
[ Go to **Turnstile** ](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Select **Add widget**.
3. In the hostname field, enter your domain(s).
4. If you have zones registered with Cloudflare, you can select from existing zones

cURL command

```

  curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$WIDGET_ID" \

  -H "Authorization: Bearer $API_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{

  "domains": ["example.com", "app.example.com", "api.example.com"]

  }'


```

---

## Limitations

Free users are entitled to a maximum of 10 hostnames per widget.

Enterprise customers can have up to 200 hostnames per widget.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/additional-configuration/hostname-management/#page","headline":"Hostname management · Cloudflare Turnstile docs","description":"Control which hostnames can serve your Turnstile widget.","url":"https://developers.cloudflare.com/turnstile/additional-configuration/hostname-management/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/additional-configuration/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/additional-configuration/hostname-management/","name":"Hostname management"}}]}
```
