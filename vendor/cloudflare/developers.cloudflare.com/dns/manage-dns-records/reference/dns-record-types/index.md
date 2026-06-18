---
title: DNS record types
description: DNS record types supported by Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DNS record types

This page provides information about some of the different types of DNS records that you can manage on Cloudflare. For guidance on how to add, edit, or delete DNS records, refer to [Manage DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).

Note

Each DNS record has a maximum wire format size of 4,096 bytes. Wire format refers to how a record is encoded when transmitted over the DNS protocol ([RFC 1035 ↗](https://www.rfc-editor.org/rfc/rfc1035.html#section-3.2.1)).

If you have multiple records with the same name and type, their combined content length must not exceed 8,192 characters.

---

## IP address resolution

At least one **IP address resolution** record is required for each domain on Cloudflare. These records are the only ones you can [proxy](https://developers.cloudflare.com/dns/proxy-status/) through Cloudflare.

### A and AAAA

[A and AAAA records ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-a-record/) map a domain name to one or multiple IPv4 or IPv6 address(es).

These records include the following fields:

* **Name**: A subdomain or the zone apex (`@`).  
   * The name must be composed of labels of 63 characters or less (`label1.label2.label3`), where the fully qualified domain name (`label1.label2.label3.example.com`) does not exceed 253 characters.  
   * DNS labels can contain any octet (byte value). However, for compatibility with hostnames and TLS certificates, it is recommended to use only letters, digits, and hyphens (LDH rule). This is not a DNS protocol requirement, meaning DNS will work even if you do not follow these conventions.  
   * There is no requirement to start with a letter or end with a letter or digit.  
   * Underscores are valid in DNS and commonly used for service records.
* **IPv4/IPv6 address**: Your origin server address (cannot be a [Cloudflare IP ↗](https://www.cloudflare.com/ips))

Note

Cloudflare uses the [canonical notation ↗](https://www.rfc-editor.org/rfc/rfc5952.html#section-4.2) to store DNS records. This means that an AAAA record with content `fe80::0:0:1` is stored and returned as `fe80::1`, for example.

Alternative notations of IPv4 addresses (`1.1` for `1.0.0.1`, for example) are not supported for A records.

* **TTL**: Time to live, which controls how long DNS resolvers should cache a response before revalidating it.  
   * If the **Proxy Status** is **Proxied**, this value defaults to **Auto**, which is 300 seconds.  
   * If the **Proxy Status** is **DNS Only**, you can customize the value.
* **Proxy status**: For more details, refer to [Proxied DNS records](https://developers.cloudflare.com/dns/proxy-status/).
* **Private network routing**: Some Enterprise customers also have access to [private network routing](https://developers.cloudflare.com/dns/private-origins/private-network-routing/). For `A` and `AAAA` records, this feature allows you to proxy HTTP/HTTPS traffic from public hostnames to origins in your private network.

#### Example API call

When creating A or AAAA records [using the API](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records):

* The `content` of the records is an IP address (IPv4 for A or IPv6 for AAAA).
* The `proxied` field affects the record's [proxy status](https://developers.cloudflare.com/dns/proxy-status/).

For field definitions, refer to the [API documentation](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) (visible once you select the record type under the request body specification).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Create DNS Record

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "type": "A",

    "name": "www.example.com",

    "content": "192.0.2.1",

    "ttl": 3600,

    "proxied": false

  }'


```

Response

```

{

  "result": {

    "id": "<ID>",

    "zone_id": "<ZONE_ID>",

    "zone_name": "example.com",

    "name": "www.example.com",

    "type": "A",

    "content": "192.0.2.1",

    "proxiable": true,

    "proxied": false,

    "ttl": 1,

    "locked": false,

    "meta": {

      "source": "primary"

    },

    "comment": null,

    "tags": [],

    "created_on": "2023-01-17T20:37:05.368097Z",

    "modified_on": "2023-01-17T20:37:05.368097Z"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

### CNAME

[CNAME records ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-cname-record/) map a domain name to another (canonical) domain name. They can be used to resolve other record types present on the target domain name.

These records include the following fields:

* **Name**: A subdomain or the zone apex (`@`).  
   * The name must be composed of labels of 63 characters or less (`label1.label2.label3`), where the fully qualified domain name (`label1.label2.label3.example.com`) does not exceed 253 characters.  
   * DNS labels can contain any octet (byte value). However, for compatibility with hostnames and TLS certificates, it is recommended to use only letters, digits, and hyphens (LDH rule). This is not a DNS protocol requirement, meaning DNS will work even if you do not follow these conventions.  
   * There is no requirement to start with a letter or end with a letter or digit.  
   * Underscores are valid in DNS and commonly used for service records.
\- **Target**: The hostname where traffic should be directed (`example.com`). - **TTL**: Time to live, which controls how long DNS resolvers should cache a response before revalidating it.

* If the **Proxy Status** is **Proxied**, this value defaults to **Auto**, which is 300 seconds. - If the **Proxy Status** is **DNS Only**, you can customize the value. - **Proxy status**: For more details, refer to [Proxied DNS records](https://developers.cloudflare.com/dns/proxy-status/).

#### Proxied CNAME records

Observe the following aspects, especially before changing a CNAME record from [proxied](https://developers.cloudflare.com/dns/proxy-status/) to DNS-only or vice versa:

* If a hostname is meant to proxy traffic, you can use CNAME records to point to other CNAME records (`www.example2.com` \--> `www.example1.com` \--> `www.example.com`), but the final record must point to a hostname with a valid IP address (and therefore a valid A or AAAA record). Also, queries for other record types on the same name are not supported.

Example

DNS management for **example.com**:

| Type  | Name | Content              | Proxy status |
| ----- | ---- | -------------------- | ------------ |
| CNAME | abc  | target.external.test | Proxied      |

DNS management for **external.test**:

| Type | Name   | Content            |
| ---- | ------ | ------------------ |
| A    | target | 192.0.2.1          |
| TXT  | target | "some TXT content" |

In this example, a query for TXT in `abc.example.com` will **not** return the TXT content in the target zone.

* Cloudflare uses a process called CNAME flattening to deliver better performance. This process supports a few features and can interact with [different setups that depend on CNAME records](https://developers.cloudflare.com/dns/cname-flattening/#aspects-to-keep-in-mind). Refer to the [CNAME flattening section](https://developers.cloudflare.com/dns/cname-flattening/) to learn more about this.
* If you encounter a CNAME record that you cannot proxy — usually associated with another CDN provider — a proxied version of that record will cause connectivity errors. Cloudflare is purposely preventing that record from being proxied to protect you from a misconfiguration. Refer to [proxying limitations](https://developers.cloudflare.com/dns/proxy-status/limitations/#proxy-eligibility) for details.

Note

Specific CNAME record values with traffic proxied through Cloudflare will enable O2O routing for the Shopify SaaS provider. Refer to the [Shopify provider guide](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/provider-guides/shopify/) for more information.

#### Example API call

When creating CNAME records [using the API](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records):

* The `content` of the records is a [fully qualified domain name ↗](https://en.wikipedia.org/wiki/Fully%5Fqualified%5Fdomain%5Fname).
* The `proxied` field affects the record's [proxy status](https://developers.cloudflare.com/dns/proxy-status/).

For field definitions, refer to the [API documentation](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) (visible once you select the record type under the request body specification).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Create DNS Record

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "type": "CNAME",

    "name": "www.example.com",

    "content": "www.another-example.com",

    "ttl": 3600,

    "proxied": false

  }'


```

Response

```

{

  "result": {

    "id": "<ID>",

    "zone_id": "<ZONE_ID>",

    "zone_name": "example.com",

    "name": "www.example.com",

    "type": "CNAME",

    "content": "www.another-example.com",

    "proxiable": true,

    "proxied": false,

    "ttl": 1,

    "locked": false,

    "meta": {

      "source": "primary"

    },

    "comment": null,

    "tags": [],

    "created_on": "2023-01-17T20:37:05.368097Z",

    "modified_on": "2023-01-17T20:37:05.368097Z"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

---

## Email authentication

These records are recommended regardless of whether your domain sends email messages. Creating [secure email records ↗](https://blog.cloudflare.com/tackling-email-spoofing/) can help protect your domain against email spoofing.

If your domain is not used to send email messages, learn more about creating recommended [restrictive records ↗](https://www.cloudflare.com/learning/dns/dns-records/protect-domains-without-email/).

### MX

A mail exchange (MX) record is required to deliver email to a mail server.

* [MX record syntax ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-mx-record/)
* [Create an MX record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/#send-and-receive-email)

For field definitions, refer to the [API documentation](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) (visible once you select the record type under the request body specification).

### DKIM

A DomainKeys Identified Mail (DKIM) record ensures email authenticity by cryptographically signing emails:

* [DKIM record syntax ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-dkim-record/)
* [Create a DKIM record](https://developers.cloudflare.com/dmarc-management/security-records/#create-security-records)

### SPF

A Sender Policy Framework (SPF) record lists authorized IP addresses and domains that can send email on behalf of your domain.

* [SPF record syntax ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-spf-record/)
* [Create an SPF record](https://developers.cloudflare.com/dmarc-management/security-records/#create-security-records)

### DMARC

A Domain-based Message Authentication Reporting and Conformance (DMARC) record helps generate aggregate reports about your email traffic and provide clear instructions for how email receivers should treat non-conforming emails.

* [DMARC record syntax ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-dmarc-record/)
* [Create a DMARC record](https://developers.cloudflare.com/dmarc-management/security-records/#create-security-records)

---

## Specialized records

### TXT

A [text (TXT) record ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-txt-record/) lets you enter text into the DNS system.

As the content of TXT records consist of one or more text strings delimited by double quotes (`"`), you might find a validation error if you add inconsistent quotation marks (for example, `"this` or `"these" ones"`). For new records, if you save your TXT content without any quotes, Cloudflare will automatically add double quotes. For details, refer to [What is a DNS TXT record ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-txt-record/).

At Cloudflare, TXT records are most commonly used to demonstrate domain ownership prior to issuing SSL/TLS certificates for [your domain](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/) or a [Cloudflare for SaaS domain](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/).

You could also use TXT to create email authentication records, but we recommend that you use our [Email security Wizard](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/#prevent-domain-spoofing) instead.

For field definitions, refer to the [API documentation](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) (visible once you select the record type under the request body specification).

### CAA

A [Certificate Authority Authorization (CAA) record](https://developers.cloudflare.com/ssl/edge-certificates/caa-records/) specifies which Certificate Authorities (CAs) are allowed to issue certificates for a domain.

For field definitions, refer to the [API documentation](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) (visible once you select the record type under the request body specification).

### SRV

A [service record (SRV) ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-srv-record/) specifies a host and port for specific services like voice over IP (VOIP), instant messaging, and more.

#### Example API call

For field definitions, refer to the [API documentation](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) (visible once you select the record type under the request body specification).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Create DNS Record

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "type": "SRV",

    "name": "_xmpp._tcp.example.com",

    "data": {

        "priority": 10,

        "weight": 5,

        "port": 5223,

        "target": "server.example.com"

    }

  }'


```

Response

```

{

  "result": {

    "id": "<ID>",

    "zone_id": "<ZONE_ID>",

    "zone_name": "example.com",

    "name": "_xmpp._tcp.example.com",

    "type": "SRV",

    "content": "5 5223 server.example.com",

    "priority": 10,

    "proxiable": false,

    "proxied": false,

    "ttl": 1,

    "locked": false,

    "data": {

      "port": 5223,

      "priority": 10,

      "target": "server.example.com",

      "weight": 5

    },

    "meta": {

      "auto_added": false,

      "managed_by_apps": false,

      "managed_by_argo_tunnel": false,

      "source": "primary"

    },

    "comment": null,

    "tags": [],

    "created_on": "2022-11-08T15:57:39.585977Z",

    "modified_on": "2022-11-08T15:57:39.585977Z"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

### SVCB and HTTPS

Service Binding (SVCB) and HTTPS Service (HTTPS) records allow you to provide a client with information about how it should connect to a server upfront, without the need of an initial plaintext HTTP connection.

If your domain has [HTTP/2 or HTTP/3 enabled](https://developers.cloudflare.com/speed/optimization/protocol/), [proxied DNS records](https://developers.cloudflare.com/dns/proxy-status/), and is also using [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/), Cloudflare automatically generates HTTPS records on the fly, to advertise to clients how they should connect to your server.

#### Proxied vs DNS-only names

For [proxied (orange cloud)](https://developers.cloudflare.com/dns/proxy-status/) names, Cloudflare synthesizes HTTPS records automatically when Universal SSL is enabled. Manually-added HTTPS records on proxied names are not served — Cloudflare uses the auto-generated records instead.

If you have disabled Universal SSL (for example, because you use [Advanced Certificates](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) exclusively), Cloudflare will not generate HTTPS records for proxied names.

For [DNS-only (grey cloud)](https://developers.cloudflare.com/dns/proxy-status/) names, you can manually add HTTPS records and Cloudflare will serve them. However, **all records with the same name must be DNS-only** for the manual HTTPS record to be served.

Example: Manual HTTPS records and proxy status

For Cloudflare to serve a manually-added HTTPS record, every record with the same name must be DNS-only (grey cloud).

**Will work** — All records with the same name are DNS-only:

| Type  | Name        | Content       | Proxy status |
| ----- | ----------- | ------------- | ------------ |
| A     | example.com | 192.0.2.1     | DNS only     |
| HTTPS | example.com | 1 . alpn="h3" | \-           |

The HTTPS record will be served because the A record is DNS-only.

**Will not work** — Mixed proxy status for the same name:

| Type  | Name        | Content       | Proxy status |
| ----- | ----------- | ------------- | ------------ |
| AAAA  | example.com | 2001:db8::1   | Proxied      |
| HTTPS | example.com | 1 . alpn="h3" | \-           |

The HTTPS record will **not** be served because the AAAA record with the same name is proxied.

For more details and context, refer to the [announcement blog post ↗](https://blog.cloudflare.com/speeding-up-https-and-http-3-negotiation-with-dns/) and [RFC 9460 ↗](https://www.rfc-editor.org/rfc/rfc9460.html).

For field definitions, refer to the [API documentation](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) (visible once you select the record type under the request body specification).

### PTR

A [pointer (PTR) record ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-ptr-record/) specifies the allowed hosts for a given IP address.

Within Cloudflare, PTR records are used for reverse DNS lookups and should preferably be added to [reverse zones](https://developers.cloudflare.com/dns/additional-options/reverse-zones/).

For field definitions, refer to the [API documentation](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) (visible once you select the record type under the request body specification).

### SOA

A start of authority (SOA) record stores information about your domain such as admin email address, when the domain was last updated, and more. Refer to [What is a DNS SOA record ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-soa-record/) for an example.

If you are using Cloudflare for your [authoritative DNS](https://developers.cloudflare.com/dns/zone-setups/full-setup/), you do not need to create an SOA record. Cloudflare creates this record automatically when you start using Cloudflare's authoritative nameservers.

With Enterprise accounts, you also have the option to change the SOA record values that Cloudflare will use:

* As a DNS zone default: Define the SOA record values that Cloudflare will use for all new zones added to your account. Refer to [Configure DNS zone defaults](https://developers.cloudflare.com/dns/additional-options/dns-zone-defaults/) for step-by-step guidance.
* For existing zones: Override the defaults or Cloudflare-generated values under **DNS record options** on the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page.

Refer to the following list for information about each SOA record field:

SOA record fields

* **`MNAME`**: The primary nameserver for the zone. Secondary nameservers receive zone updates from the nameserver specified in this field.
* **`RNAME`**: The email address of the administrator responsible for the zone.  
The `@` symbol is replaced by the first dot. If an email address contains a dot before `@`, this should be represented as `\.`.  
| Email                | RNAME                  |  
| -------------------- | ---------------------- |  
| john@example.com     | john.example.com       |  
| john.doe@example.com | john\\.doe.example.com |
* **`Serial`**: The serial number for the zone. Secondary nameservers initiate zone transfers if this number increases.
* **`Refresh`**: Time (in seconds) after which a secondary nameserver should query the primary for the `SOA` record, to detect zone changes. Only relevant if DNS NOTIFY ([RFC 1996 ↗](https://www.rfc-editor.org/rfc/rfc1996.html)) is not configured.  
| Default | Minimum | Maximum |  
| ------- | ------- | ------- |  
| 10000   | 600     | 86400   |
* **`Retry`**: Time (in seconds) after which a secondary nameserver should retry getting the serial number from the primary nameserver after a failed attempt. Any specified values must not be greater than `Refresh`.  
| Default | Minimum | Maximum |  
| ------- | ------- | ------- |  
| 2400    | 600     | 3600    |
* **`Expire`**: Time (in seconds) after which a secondary nameserver should stop answering queries for a zone if the primary does not respond. Any specified values must not be smaller than `Refresh`.  
| Default | Minimum | Maximum |  
| ------- | ------- | ------- |  
| 604800  | 86400   | 2419200 |
* **`Record TTL`**: The [time to live](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/) of the SOA record.  
| Default | Minimum | Maximum |  
| ------- | ------- | ------- |  
| 3600    | 1800    | 3600    |
* **`Minimum TTL`**: The TTL for caching negative responses. Refer to [RFC 2308 ↗](https://www.rfc-editor.org/rfc/rfc2308.html#section-4) for details.  
| Default | Minimum | Maximum |  
| ------- | ------- | ------- |  
| 1800    | 60      | 86400   |

Note

When you query the SOA record itself, the TTL in the response is the smaller of the `Record TTL` and the `Minimum TTL` values. For example, if `Record TTL` is `3600` and `Minimum TTL` is `1800`, the SOA record is returned with a TTL of `1800`.

### NS

A [nameserver (NS) record ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-ns-record/) indicates which server should be used for authoritative DNS.

You only need to add NS records to your DNS records table in Cloudflare when you are using [subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/) or [delegating subdomains outside of Cloudflare](https://developers.cloudflare.com/dns/manage-dns-records/how-to/subdomains-outside-cloudflare/).

For field definitions, refer to the [API documentation](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) (visible once you select the record type under the request body specification).

Note

Your assigned Cloudflare nameservers, custom nameservers, and their corresponding [nameserver TTLs](https://developers.cloudflare.com/dns/nameservers/nameserver-options/#nameserver-ttl) are controlled via dedicated sections on the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page. For details, refer to [Nameservers](https://developers.cloudflare.com/dns/nameservers/).

#### Limits

When creating NS records, there are limits on the number of nameservers that can be associated with a single delegation name.

According to DNS standards defined in [RFC 1912 ↗](https://www.rfc-editor.org/rfc/rfc1912.html), a delegation should not include more than seven nameserver names for the same delegation name.

To align with these standards and maintain platform stability:

* Cloudflare supports up to 10 NS records per delegation name, but the best practice is to keep the set at seven or fewer.
* Creating more than 10 NS records for the same name is not supported. Requests that exceed this limit may be rejected or fail validation.

Example

DNS management for **example.com**:

| Type | Name | Content               |
| ---- | ---- | --------------------- |
| NS   | blog | ns1.externalhost.com  |
| NS   | blog | ns2.externalhost.com  |
| NS   | blog | ns3.externalhost.com  |
| NS   | blog | ns4.externalhost.com  |
| NS   | blog | ns5.externalhost.com  |
| NS   | blog | ns6.externalhost.com  |
| NS   | blog | ns7.externalhost.com  |
| NS   | blog | ns8.externalhost.com  |
| NS   | blog | ns9.externalhost.com  |
| NS   | blog | ns10.externalhost.com |

In this example, Cloudflare would prevent you from adding another NS record for the delegation name `blog`.

### DS and DNSKEY

[DS and DNSKEY ↗](https://www.cloudflare.com/learning/dns/dns-records/dnskey-ds-records/) records help implement DNSSEC, which cryptographically signs DNS records to prevent domain spoofing.

Most Cloudflare domains do not need to add these records and should instead follow our [DNSSEC setup guide](https://developers.cloudflare.com/dns/dnssec/).

For field definitions, refer to the [API documentation](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) (visible once you select the record type under the request body specification).

### Other

Cloudflare also supports other record types that are less common, such as URI, NAPTR, and certificate-related record types (SSHFP, TLSA, SMIMEA, and CERT). Refer to our [blog post ↗](https://blog.cloudflare.com/additional-record-types-available-with-cloudflare-dns/) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#page","headline":"DNS record types · Cloudflare DNS docs","description":"DNS record types supported by Cloudflare.","url":"https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-02","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/manage-dns-records/","name":"DNS records"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/manage-dns-records/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/manage-dns-records/reference/dns-record-types/","name":"DNS record types"}}]}
```
