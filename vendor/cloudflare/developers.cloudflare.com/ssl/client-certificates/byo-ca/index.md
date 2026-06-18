---
title: Bring your own CA for mTLS
description: Cloudflare mTLS now supports client certificates that have not been issued by Cloudflare CA. Learn how you can bring your own CA and use it with Cloudflare mTLS.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bring your own CA for mTLS

This page explains how you can manage client certificates that have not been issued by Cloudflare CA. For a broader overview, refer to the [mTLS at Cloudflare learning path](https://developers.cloudflare.com/learning-paths/mtls/concepts/).

Bring your own CA (BYOCA) is especially useful if you already have mTLS implemented and [client certificates are already installed](https://developers.cloudflare.com/ssl/client-certificates/#how-it-works) on devices.

## Availability

* This feature is only available on Enterprise accounts.
* Each Enterprise account can upload up to five CAs. This quota does not apply to CAs uploaded through [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/).
* The CA certificate quota is shared across [API Shield](https://developers.cloudflare.com/api-shield/security/mtls/configure/), [Workers mTLS](https://developers.cloudflare.com/workers/runtime-apis/bindings/mtls/), and [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/).
* To increase this quota, contact your account team.

Note

If you exceed the CA certificate quota, the API returns error `1489` with the message "Hit maximum CA cert allocation." Contact your account team to request a quota increase.

## CA certificate requirements

When you upload your CA, Cloudflare validates the certificate according to certain requirements.

* The CA certificate can be from a publicly trusted CA or self-signed.
* In the certificate `Basic Constraints`, the attribute `CA` must be set to `TRUE`.
* The certificate must use one of the signature algorithms listed below:  
Allowed signature algorithms  
`x509.SHA1WithRSA`  
`x509.SHA256WithRSA`  
`x509.SHA384WithRSA`  
`x509.SHA512WithRSA`  
`x509.ECDSAWithSHA1`  
`x509.ECDSAWithSHA256`  
`x509.ECDSAWithSHA384`  
`x509.ECDSAWithSHA512`

Note

Uploading the CA private key is only required if you wish to use [Zero Trust's block page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/custom-certificate/). To upload your own CA with the private key, use the [Upload mTLS certificate](https://developers.cloudflare.com/api/resources/mtls%5Fcertificates/methods/create/) endpoint.

## Set up mTLS with your CA

* [ Dashboard ](#tab-panel-10572)
* [ API ](#tab-panel-10573)

1. In the Cloudflare dashboard, go to the **Client Certificates** page.  
[ Go to **Client Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/client-certificates)
2. Select **Add Certificate**.
3. In the **Certificate Authority** dropdown, select **Bring your own CA**.
4. Upload your CA certificate file (PEM encoded) and enter a name for the CA.
5. Select **Continue**.
6. On the **Associate Hostnames** page, enter the hostname that should use this CA for mTLS validation and select **Add** for each one. You can also skip this step and associate hostnames later.
7. Select **Save** to confirm.

1. Use the [Upload mTLS certificate endpoint](https://developers.cloudflare.com/api/resources/mtls%5Fcertificates/methods/create/) to upload the CA root certificate.
* `ca` boolean required  
   * Set to `true` to indicate that the certificate is a CA certificate.
* `certificates` string required  
   * Insert content from the `.pem` file associated with the CA certificate, formatted as a single string with `\n` replacing the line breaks.
* `name` string optional  
   * Indicate a unique name for your CA certificate.
* `private_key` string optional  
   * Insert content from the `.pem` file associated with the private key for the certificate, formatted as a single string with `\n` replacing the line breaks.
1. Take note of the certificate ID (`id`) that is returned in the API response.
2. Use the [Replace Hostname Associations endpoint](https://developers.cloudflare.com/api/resources/certificate%5Fauthorities/subresources/hostname%5Fassociations/methods/update/) to enable mTLS in each hostname that should use the CA for mTLS validation. Use the following parameters:
* `hostnames` array required  
   * List the hostnames that will be using the CA for client certificate validation.  
   Warning  
   Submitting an empty array will remove all hostname associations.
* `mtls_certificate_id` string required  
   * Indicate the certificate ID obtained from the previous step.  
   Warning  
   If no `mtls_certificate_id` is provided, the action will be performed against the [Cloudflare-managed CA](https://developers.cloudflare.com/ssl/client-certificates/).
1. (Optional) Make a [GET request](#list-ca-hostname-associations) to confirm the CA hostname associations.

After uploading the CA and associating hostnames, create a custom rule to enforce client certificate validation. You can do this [via the dashboard](https://developers.cloudflare.com/learning-paths/mtls/mtls-app-security/#3-validate-the-client-certificate-in-the-waf) or [via API](https://developers.cloudflare.com/waf/custom-rules/create-api/).

```

  "expression": "(http.host in {\"<HOSTNAME_1>\" \"<HOSTNAME_2>\"} and not cf.tls_client_auth.cert_verified)",

  "action": "block"


```

Note

When using [CNAME records](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#cname), enforce mTLS on the specific hostname where it should be checked. It is not enough to have it set on the CNAME target.

### Multiple CAs for one hostname

There can be multiple CAs (Cloudflare-managed or BYOCA) associated with the same hostname. For BYOCA certificates, the most recently deployed certificate will be prioritized.

If you wish to remove the association from the Cloudflare-managed certificate and only use your BYOCA certificate(s):

* [ Dashboard ](#tab-panel-10578)
* [ API ](#tab-panel-10579)

1. In the Cloudflare dashboard, go to the **Client Certificates** page.  
[ Go to **Client Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/client-certificates)
2. On the **Hosts** section under **Cloudflare-issued Client Certificates**, select **Edit**.
3. Select the cross next to the hostname you want to remove.
4. Select **Save** to confirm.

1. [List the hostname associations](https://developers.cloudflare.com/api/resources/certificate%5Fauthorities/subresources/hostname%5Fassociations/methods/get/) **without** the `mtls_certificate_id` parameter.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `SSL and Certificates Write`
* `SSL and Certificates Read`

List Hostname Associations

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/certificate_authorities/hostname_associations" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

1. Copy the `hostnames` array returned by the API and update it, removing the hostname that should no longer use the Cloudflare-managed CA.
2. Use the [Replace Hostname Associations endpoint](https://developers.cloudflare.com/api/resources/certificate%5Fauthorities/subresources/hostname%5Fassociations/methods/update/) **without** the `mtls_certificate_id` parameter to perform the action against the Cloudflare-managed CA. For `hostnames` use the list from the previous step.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `SSL and Certificates Write`

Replace Hostname Associations

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/certificate_authorities/hostname_associations" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "hostnames": [

        "<UPDATED_HOSTNAME_ASSOCIATIONS>"

    ]

  }'


```

## Delete an uploaded CA

If you want to remove a CA that you have previously uploaded, you must first remove any hostname associations that it has.

* [ Dashboard ](#tab-panel-10574)
* [ API ](#tab-panel-10575)

1. In the Cloudflare dashboard, go to the **Client Certificates** page.  
[ Go to **Client Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/client-certificates)
2. Select the **BYOCA** tab.
3. Find the CA you want to delete and select the three dots next to it.
4. Remove all associated hostnames first, if any exist.
5. Select the delete option and confirm.

1. Make a request to the [Replace Hostname Associations endpoint](https://developers.cloudflare.com/api/resources/certificate%5Fauthorities/subresources/hostname%5Fassociations/methods/update/), with an empty array for `hostnames` and specifying your CA certificate ID in `mtls_certificate_id`:

```

  "hostnames": [],

  "mtls_certificate_id": "<CERTIFICATE_ID>"


```

1. Use the [Delete mTLS certificate endpoint](https://developers.cloudflare.com/api/resources/mtls%5Fcertificates/methods/delete/) to delete the certificate.

## List CA hostname associations

* [ Dashboard ](#tab-panel-10576)
* [ API ](#tab-panel-10577)

1. In the Cloudflare dashboard, go to the **Client Certificates** page.  
[ Go to **Client Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/client-certificates)
2. Select the **BYOCA** tab.
3. Find the CA you want to inspect and select the three dots next to it.
4. Select **Edit hostnames**. The **Certificate Details** panel displays the associated hostnames.

Use the [List Hostname Associations endpoint](https://developers.cloudflare.com/api/resources/certificate%5Fauthorities/subresources/hostname%5Fassociations/methods/get/) with the `mtls_certificate_id` query parameter set to the certificate ID of the uploaded CA.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `SSL and Certificates Write`
* `SSL and Certificates Read`

List Hostname Associations

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/certificate_authorities/hostname_associations?mtls_certificate_id=ID_FROM_STEP_2" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/client-certificates/byo-ca/#page","headline":"Bring your own CA for mTLS · Cloudflare SSL/TLS docs","description":"Cloudflare mTLS now supports client certificates that have not been issued by Cloudflare CA. Learn how you can bring your own CA and use it with Cloudflare mTLS.","url":"https://developers.cloudflare.com/ssl/client-certificates/byo-ca/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["mTLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/client-certificates/","name":"Client certificates (mTLS)"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/client-certificates/byo-ca/","name":"Bring your own CA for mTLS"}}]}
```
