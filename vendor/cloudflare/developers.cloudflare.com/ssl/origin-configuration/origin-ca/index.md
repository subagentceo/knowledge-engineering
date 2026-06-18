---
title: Cloudflare origin CA
description: Encrypt traffic between Cloudflare and your origin web server and reduce origin bandwidth consumption.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare origin CA

If your origin only receives traffic from proxied records, use Cloudflare origin CA certificates to encrypt traffic between Cloudflare and your origin web server and reduce bandwidth consumption. Once deployed, these certificates are compatible with [Strict SSL mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/).

For more background information on origin CA certificates, refer to the [introductory blog post ↗](https://blog.cloudflare.com/cloudflare-ca-encryption-origin/).

API Access required

Users who do not have [**API Access** ↗](https://dash.cloudflare.com/?to=/:account/members) will receive an error while trying to create or revoke an origin CA certificate. Refer to [Troubleshooting](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/troubleshooting/#this-zone-is-either-not-part-of-your-account-or-you-do-not-have-access-to-it) for guidance.

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | Yes | Yes      | Yes        | Yes |

Note

Using Cloudflare origin CA certificates does not prevent you from using [delegated DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/).

Known limitation

Cloudflare does not currently send expiration notifications for origin CA certificates. If you rely on long-lived origin CA certificates, track their expiration in your own certificate inventory or monitoring system.

---

## Deploy an Origin CA certificate

### 1\. Create an Origin CA certificate

To create an Origin CA certificate in the dashboard:

1. Go to the **Origin Server** page.  
[ Go to **Origin Server** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/origin)
2. On the **Origin Certificates** tab, select **Create Certificate**.
3. Choose either:  
   * **Generate private key and CSR with Cloudflare**: Private key type can be RSA or ECC.  
   * **Use my private key and CSR**: Paste the Certificate Signing Request into the text field.
4. List the [hostnames (including wildcards)](#hostname-and-wildcard-coverage) the certificate should protect with SSL encryption. The zone apex and first level wildcard hostname are included by default.
5. Choose a **Certificate Validity** period.
6. Select **Create**.
7. Choose the **Key Format**:  
   * Servers using OpenSSL — like Apache and NGINX — generally expect PEM files (Base64-encoded ASCII), but also work with binary DER files.  
   * Servers using Windows and Apache Tomcat require PKCS#7 (a `.p7b` file).
8. Copy the signed **Origin Certificate** and **Private Key** into separate files. For security reasons, you cannot see the **Private Key** after you exit this screen.
9. Select **OK**.

Note

For details about working with certificates programmatically, refer to [API calls](#api-calls).

### 2\. Install Origin CA certificate on origin server

To add an Origin CA certificate to your origin web server

1. Upload the Origin CA certificate (created in [Step 1](#1-create-an-origin-ca-certificate)) to your origin web server.
2. Update your web server configuration:
* [Apache httpd ↗](https://www.digicert.com/kb/csr-ssl-installation/apache-openssl.htm)
* [GoDaddy Hosting ↗](https://www.digitalcandy.agency/website-tips/cloudflare-origin-ca-free-ssl-installation-on-godaddy/)
* [Microsoft IIS 7 ↗](https://knowledge.digicert.com/tutorials/iis7-create-csr-install-ssl-certificate)
* [Microsoft IIS 8 and 8.5 ↗](https://knowledge.digicert.com/tutorials/iis-8-create-csr-install-ssl-certificate)
* [Microsoft IIS 10 ↗](https://www.digicert.com/kb/csr-creation-ssl-installation-iis-10.htm)
* [NGINX ↗](https://www.digicert.com/kb/csr-ssl-installation/nginx-openssl.htm)
* [Apache Tomcat ↗](https://knowledge.digicert.com/tutorials/tomcat-install-your-ssl-certificate-on-a-tomcat-server)
* [Amazon Web Services ↗](https://knowledge.digicert.com/tutorials/amazon-aws-create-csr-install-ssl-certificate)
* [Apache cPanel ↗](https://www.digicert.com/kb/ssl-certificate-installation-apache-cpanel.htm)
* [Ubuntu Server with Apache2 ↗](https://www.digicert.com/kb/csr-ssl-installation/ubuntu-server-with-apache2-openssl.htm#ssl%5Fcertificate%5Finstall)

Note

If you do not see your server in the list above, search the [DigiCert documentation ↗](https://www.digicert.com/search-results) or contact your hosting provider, web admin, or server vendor.

1. (Required for some) Upload the [Cloudflare CA root certificate](#cloudflare-origin-ca-root-certificate) to your origin server. This can also be referred to as the certificate chain.
2. Enable SSL and port `443` at your origin web server.

### 3\. Change SSL/TLS mode

After you have installed the Origin CA certificate on your origin web server, update the SSL/TLS encryption mode for your application.

If all your origin hosts are protected by Origin CA certificates or publicly trusted certificates:

1. Go to the **SSL/TLS** overview page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls)
2. For **SSL/TLS encryption mode**, select **Full (strict)**.

If you have origin hosts that are not protected by certificates, set the **SSL/TLS encryption** mode for a specific application to **Full (strict)** by using a [Page Rule](https://developers.cloudflare.com/rules/page-rules/).

Warning

Site visitors may see untrusted certificate errors if you [pause Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/pause-cloudflare/) or disable proxying on subdomains that use Cloudflare origin CA certificates. These certificates only encrypt traffic between Cloudflare and your origin server, not traffic from client browsers to your origin.

## Revoke an Origin CA certificate

If you misplace your key material or do not want a certificate to be trusted, you may want to revoke your certificate. You cannot undo this process.

To prevent visitors from seeing warnings about an insecure certificate, you may want to set your [SSL/TLS encryption](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) to **Full** or **Flexible** before revoking your certificate. Do this globally via the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls) or for a specific hostname via a [Page Rule](https://developers.cloudflare.com/rules/page-rules/).

To revoke a certificate:

1. Go to the **Origin Server** page.  
[ Go to **Origin Server** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/origin)
2. On the **Origin Certificates** tab, choose a certificate.
3. Select **Revoke**.

## Additional details

### Cloudflare Origin CA root certificate

Some origin web servers require upload of the Cloudflare Origin CA root certificate or certificate chain. Use the following links to download either an ECC or an RSA version and upload to your origin web server:

* [Cloudflare Origin ECC PEM](https://developers.cloudflare.com/ssl/static/origin%5Fca%5Fecc%5Froot.pem) (do not use with Apache cPanel)
* [Cloudflare Origin RSA PEM](https://developers.cloudflare.com/ssl/static/origin%5Fca%5Frsa%5Froot.pem)

### Hostname and wildcard coverage

Certificates may be generated with up to 200 individual Subject Alternative Names (SANs). A SAN can take the form of a fully-qualified domain name (`www.example.com`) or a wildcard (`*.example.com`). You cannot use IP addresses as SANs on Cloudflare origin CA certificates.

Wildcards may only cover one level, but can be used multiple times on the same certificate for broader coverage (for example, `*.example.com` and `*.secure.example.com` may co-exist).

## API calls

To automate processes involving Origin CA certificates, use the following API calls. To authenticate, use an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with **Permissions** that include `Zone`\-`SSL and Certificates`\-`Edit`.

| Operation                                                                                                        | Method | Endpoint                           |
| ---------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------- |
| [List certificates](https://developers.cloudflare.com/api/resources/origin%5Fca%5Fcertificates/methods/list/)    | GET    | certificates?zone\_id=<<ZONE\_ID>> |
| [Create certificate](https://developers.cloudflare.com/api/resources/origin%5Fca%5Fcertificates/methods/create/) | POST   | certificates                       |
| [Get certificate](https://developers.cloudflare.com/api/resources/origin%5Fca%5Fcertificates/methods/get/)       | GET    | certificates/<<ID>>                |
| [Revoke certificate](https://developers.cloudflare.com/api/resources/origin%5Fca%5Fcertificates/methods/delete/) | DELETE | certificates/<<ID>>                |

## Troubleshooting

If you find `NET::ERR_CERT_AUTHORITY_INVALID` or other issues after setting up Cloudflare origin CA, refer to [troubleshooting](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/troubleshooting/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/#page","headline":"Cloudflare origin CA · Cloudflare SSL/TLS docs","description":"Encrypt traffic between Cloudflare and your origin web server and reduce origin bandwidth consumption.","url":"https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/origin-configuration/","name":"Origin server"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/origin-configuration/origin-ca/","name":"Cloudflare origin CA"}}]}
```
