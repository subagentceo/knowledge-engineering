---
title: Limits and Instance Types
description: Available Container instance types and account-level limits for memory, vCPU, disk, and image storage.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limits and Instance Types

## Instance Types

The memory, vCPU, and disk space for Containers are set through instance types. You can use one of six predefined instance types or configure a [custom instance type](#custom-instance-types).

| Instance Type | vCPU | Memory  | Disk  |
| ------------- | ---- | ------- | ----- |
| lite          | 1/16 | 256 MiB | 2 GB  |
| basic         | 1/4  | 1 GiB   | 4 GB  |
| standard-1    | 1/2  | 4 GiB   | 8 GB  |
| standard-2    | 1    | 6 GiB   | 12 GB |
| standard-3    | 2    | 8 GiB   | 16 GB |
| standard-4    | 4    | 12 GiB  | 20 GB |

These are specified using the [instance\_type property](https://developers.cloudflare.com/workers/wrangler/configuration/#containers) in your Worker's Wrangler configuration file.

Note

The `dev` and `standard` instance types are preserved for backward compatibility and are aliases for `lite` and `standard-1`, respectively.

### Custom Instance Types

In addition to the predefined instance types, you can configure custom instance types by specifying `vcpu`, `memory_mib`, and `disk_mb` values. See the [Wrangler configuration documentation](https://developers.cloudflare.com/workers/wrangler/configuration/#custom-instance-types) for configuration details.

Custom instance types have the following constraints:

| Resource             | Limit                              |
| -------------------- | ---------------------------------- |
| Minimum vCPU         | 1                                  |
| Maximum vCPU         | 4                                  |
| Maximum Memory       | 12 GiB                             |
| Maximum Disk         | 20 GB                              |
| Memory to vCPU ratio | Minimum 3 GiB memory per vCPU      |
| Disk to Memory ratio | Maximum 2 GB disk per 1 GiB memory |

For workloads requiring less than 1 vCPU, use the predefined instance types such as `lite` or `basic`.

If you need larger instance sizes or higher account-level limits, contact your account team, file a support ticket, or fill out [this form ↗](https://forms.gle/CscdaEGuw5Hb6H2s7).

## Account limits

The following limits apply per account:

| Resource                        | Limit                                          |
| ------------------------------- | ---------------------------------------------- |
| Concurrent memory               | 6 TiB                                          |
| Concurrent vCPU                 | 1,500                                          |
| Concurrent disk                 | 30 TB                                          |
| Image size                      | Same as [instance disk space](#instance-types) |
| Total image storage per account | 50 GB [1](#user-content-fn-1)                  |

## Footnotes

1. Delete container images with `wrangler containers delete` to free up space. If you delete a container image and then [roll back](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/rollbacks/) your Worker to a previous version, this version may no longer work. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/platform-details/limits/#page","headline":"Limits and Instance Types · Cloudflare Containers docs","description":"Available Container instance types and account-level limits for memory, vCPU, disk, and image storage.","url":"https://developers.cloudflare.com/containers/platform-details/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/platform-details/","name":"Platform Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/containers/platform-details/limits/","name":"Limits and Instance Types"}}]}
```
