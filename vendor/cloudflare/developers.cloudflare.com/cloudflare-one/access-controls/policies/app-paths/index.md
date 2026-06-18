---
title: Application paths
description: How Application paths works in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Application paths

Application paths define the URLs protected by an Access policy. When adding a self-hosted application to Access, you can choose to protect the entire website by entering its apex domain, or alternatively, protect specific subdomains and paths.

## Policy inheritance

Cloudflare Zero Trust allows you to create unique rules for parts of an application that share a root path. Imagine an example application is deployed at `dashboard.com/eng` that anyone on the engineering team should be able to access. However, a tool deployed at `dashboard.com/eng/exec` should only be accessed by the executive team.

When multiple rules are set for a common root path, the more specific rule takes precedence. For example, when setting rules for `dashboard.com/eng` and `dashboard.com/eng/exec` separately, the more specific rule for `dashboard.com/eng/exec` takes precedence, and no rule is inherited from `dashboard.com/eng`. If no separate, specific rule is set for `dashboard.com/eng/exec`, it will inherit any rules set for `dashboard.com/eng`.

## Wildcards

When you create an application for a specific subdomain or path, you can use asterisks (`*`) as wildcards. Wildcards allow you to extend the application you are creating to multiple subdomains or paths in a given apex domain.

### Examples

#### Match all subdomains of an apex domain

A wildcard in the **Subdomain** field only matches that specific subdomain level. It does not cover the apex domain or multiple levels of the subdomain. If you want to cover multiple subdomain levels, you can use multiple wildcards.

| Application    | Covers                             | Does not cover                  |
| -------------- | ---------------------------------- | ------------------------------- |
| \*.example.com | alpha.example.com beta.example.com | example.com foo.bar.example.com |

#### Match all paths of an apex domain

To protect an apex domain and all of the paths under it, leave the **Path** field empty. Alternatively, use a wildcard in the **Path** field.

| Application                    | Covers                                         | Does not cover    |
| ------------------------------ | ---------------------------------------------- | ----------------- |
| example.com  or example.com/\* | example.com example.com/alpha example.com/beta | alpha.example.com |

#### Match multi-level subdomains

Using a wildcard in the **Subdomain** field does not cover the parent subdomain nor the apex domain.

| Application         | Covers                                       | Does not cover               |
| ------------------- | -------------------------------------------- | ---------------------------- |
| \*.test.example.com | alpha.test.example.com beta.test.example.com | test.example.com example.com |

#### Partially match subdomains

Using a wildcard at the beginning or end of the **Subdomain** field does not cover multiple levels of the subdomain.

| Application        | Covers                                 | Does not cover        |
| ------------------ | -------------------------------------- | --------------------- |
| \*test.example.com | test.example.com alphatest.example.com | beta.test.example.com |

#### Match multi-level paths

Using a wildcard in the **Path** field does not cover the parent path nor the apex domain.

| Application          | Covers                                      | Does not cover                |
| -------------------- | ------------------------------------------- | ----------------------------- |
| example.com/alpha/\* | example.com/alpha/one example.com/alpha/two | example.com/alpha example.com |

#### Partially match paths

Using a wildcard in the middle of the **Path** field covers multiple segments of the URL.

| Application           | Covers                                                              |
| --------------------- | ------------------------------------------------------------------- |
| example.com/foo\*/bar | example.com/foo/bar example.com/food/bar example.com/food/stuff/bar |

### Limitations

* At most one wildcard in between each dot in the **Subdomain**. For example, `foo*bar*baz.example.com` is not allowed.
* At most one wildcard in between each slash in the **Path**. For example, `example.com/foo*bar*baz` is not allowed.

## Subdomain setups

[Subdomain setups](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/) allow you to manage a child domain separately from its parent domain. In Access application paths, your configured child domains will appear in the **Domain** dropdown menu. If you [split out a subdomain](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/) which already has an Access application, you will need to re-save the Access application to associate it with the new child domain.

## Unsupported URLs

### Port numbers

Port numbers are not supported in Access application paths. If a request includes a port number in the URL, Access will strip the port number and redirect the request to the default HTTP/HTTPS port.

### Query strings

Query strings (such as`?foo=bar`) are not supported in Access application paths.

### Anchor links

Since anchor links are processed by the browser and not the server, Access applications do not support `#` characters in the URL. For example, requests to `dashboard.com/#settings` will redirect to `dashboard.com`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/#page","headline":"Application paths · Cloudflare One docs","description":"How Application paths works in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/policies/","name":"Policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/policies/app-paths/","name":"Application paths"}}]}
```
