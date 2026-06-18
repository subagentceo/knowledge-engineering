---
title: Import and export records
description: Import and export DNS records using zone files.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Import and export records

Use import and export to have more control over your DNS records and make processes like migrating a domain or bulk editing [record comments](https://developers.cloudflare.com/dns/manage-dns-records/reference/record-attributes/) easier.

## Import records

### Limits

* The zone file size limit is 256 KiB (262144 bytes).
* The API rate limit is three requests per minute per user.

### Format your zone file

Create a [BIND zone file ↗](https://en.wikipedia.org/wiki/Zone%5Ffile) for your domain. If you need help, use a [third-party tool ↗](https://pgl.yoyo.org/as/bind-zone-file-creator.php).

If you are using certain record types — for example, `CNAME`, `DNAME`, `MX`, `NS`, `PTR`, or `SRV` records — make sure that the **content** of those records contains fully qualified domain names ending in a trailing period (as in `example.com.`). For more details, refer to [RFC 1035 ↗](https://www.rfc-editor.org/rfc/rfc1035#section-5.1) or this [post on Stack Exchange ↗](https://superuser.com/questions/348282/fqdn-format-in-bind-zone#348284).

### Import zone file to Cloudflare

* [ Dashboard ](#tab-panel-8101)
* [ API ](#tab-panel-8102)

To import a zone file using the dashboard:

1. In the Cloudflare dashboard, go to the **DNS Records** page.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Select **Import and Export**.
3. For **Import DNS records**, select your [formatted file](#format-your-zone-file).
4. If you do not want [applicable records](https://developers.cloudflare.com/dns/proxy-status/) proxied, unselect **Proxy imported DNS records**.

To import records using the API, send a [POST request](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/import/) with a properly [formatted file](#format-your-zone-file).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Import DNS Records

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/import" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --form "file=@your_formatted_file.txt"


```

---

## Export records

You can also bulk export records from Cloudflare.

* [ Dashboard ](#tab-panel-8103)
* [ API ](#tab-panel-8104)

To export records using the dashboard:

1. In the Cloudflare dashboard, go to the **DNS Records** page.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Select **Import and Export**.
3. Select **Export**.

To export records using the API, send a [GET request](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/export/).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Read`
* `DNS Write`

Export DNS Records

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/export" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

---

## DNS record attributes

When exporting or importing a zone file, Cloudflare formats [comments and tags](https://developers.cloudflare.com/dns/manage-dns-records/reference/record-attributes/) using the following structure, appending the attributes as inline comment using the `;` character after each record in accordance with [RFC 1035 section 5 ↗](https://datatracker.ietf.org/doc/html/rfc1035#section-5-1):

| Combination           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Only tags**         | Tag names contain a [small set](https://developers.cloudflare.com/dns/manage-dns-records/reference/record-attributes/#tags) of characters.Additionally, tag values must be contained by a double quote (") if they contain ", \=, ,, or \\. When enclosed within double quotes ("), tag values are represented as JSON strings, so other quotes within the value can be escaped as \\".A tag with an empty value can be represented either as my-tag-name:"", my-tag-name:, or my-tag-name. |
| **Only a comment**    | Comments have [fewer limitations](https://developers.cloudflare.com/dns/manage-dns-records/reference/record-attributes/#comments) on characters, meaning that the comment is included verbatim.If the comment includes the string cf\_tags=, you need to include an additional  cf\_tags= at the end of the line.                                                                                                                                                                           |
| **Comment and tags**  | The zone file comment would be of the form ; <comment> cf\_tags=<tags>, as described above. Note the added space character before cf\_tags=.                                                                                                                                                                                                                                                                                                                                                |
| **Neither attribute** | The comment in the zone file may be empty or omitted entirely. Comments in the zone file that do not immediately follow a record are also ignored.                                                                                                                                                                                                                                                                                                                                          |

Example zone file

```

; Only tags

a.example.com.  60  IN  A   1.1.1.1 ;   cf_tags=awesome

b.example.com.  60  IN  A   1.1.1.1 ;   cf_tags=tag1,tag2:value2,tag3:"value,with,commas",tag4:"value with \"escaped\" quotation marks"


; Only a comment

c.example.com.  60  IN  A   1.1.1.1 ; just a comment without tags

d.example.com.  60  IN  A   1.1.1.1 ; this comment contains cf_tags= as text cf_tags=


; Comments and tags

e.example.com.  60  IN  A   1.1.1.1 ; simple example cf_tags=important,ticket:THIS-12345

f.example.com.  60  IN  A   1.1.1.1 ; this is the comment cf_tags=tag1:value1,tag2:value2,tag-without-value,another-tag-without-value,tag-with-quoted-value:"because of the comma, quotes are needed"


; Neither attribute

g.example.com.  60  IN  A   1.1.1.1


```

### Reserved cf- tags

When exporting and importing, special tags starting by `cf-` allow you to control specific Cloudflare configurations. On export, these tags are automatically added to reflect the current configuration for each record on your zone.

Records with cf- tags example

```

;; CNAME Records

a.cloudflaredocs.com.  1  IN  CNAME  example.com. ; cf_tags=test:1,cf-flatten-cname

b.cloudflaredocs.com.  1  IN  CNAME  example.com. ; cf_tags=cf-proxied:false

c.cloudflaredocs.com.  1  IN  CNAME  example.com. ; cf_tags=tag-without-value,cf-proxied:true


```

#### cf-proxied

On export, [proxied DNS records](https://developers.cloudflare.com/dns/proxy-status/) will present a tag `cf-proxied:true` while DNS-only records will have this tag set to `cf-proxied:false`.

When importing zone files, the value in the `cf-proxied` tag will take precedence in determining whether a record should be proxied. This means that:

* If the tag is present, its value will be considered for the respective record regardless of the **Proxy imported DNS records** option being selected (via dashboard), or the `proxied` parameter being generally set to `true` or `false` (via API).
* If the tag is absent, the proxied status will fall back to the general import option, meaning **Proxy imported DNS records** selected or not (via dashboard) or the `proxied` parameter set to `true` or `false` (via API).

#### cf-flatten-cname

If you are on a paid zone and want to use [Per-record CNAME flattening](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/#per-record), use the tag `cf-flatten-cname` next to each flattened CNAME record in your zone file. On export, this tag is automatically added to reflect the record configuration that you have on your zone.

## DNS zone file directives

A DNS zone file can be constructed using directives in addition to resource records (RRs). Directives start with `$` and are standardized - `$ORIGIN` and `$INCLUDE` are defined in [RFC 1035 ↗](https://www.rfc-editor.org/rfc/rfc1035#section-5.1), and `$TTL` is defined in [RFC 2308 ↗](https://www.rfc-editor.org/rfc/rfc2308). Additionally, BIND provides the [non-standard ↗](https://bind9.readthedocs.io/en/latest/chapter3.html#bind-primary-file-extension-the-generate-directive) `$GENERATE` directive.

Cloudflare supports `$ORIGIN`, `$TTL`, and `$GENERATE` directives.

`$INCLUDE` is not supported. When a zone file contains a `$INCLUDE` directive, Cloudflare responds with a parsing error `$INCLUDE directive not allowed`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/#page","headline":"Import and export records · Cloudflare DNS docs","description":"Import and export DNS records using zone files.","url":"https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/manage-dns-records/","name":"DNS records"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/manage-dns-records/how-to/","name":"How to"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/manage-dns-records/how-to/import-and-export/","name":"Import and export records"}}]}
```
