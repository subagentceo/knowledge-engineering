---
title: Troubleshooting
description: Troubleshoot issues with client certificates
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshooting

If your query returns an error even after configuring and embedding a client SSL certificate, check the following settings.

Note

Before troubleshooting, disable VPNs and proxies. These can interfere with the mTLS handshake.

---

## Check SSL/TLS handshake

On your terminal, use the following command to check whether an SSL/TLS connection can be established successfully between the client and the API endpoint.

Terminal window

```

curl --verbose --cert /path/to/certificate.pem --key /path/to/key.pem https://your-api-endpoint.com


```

If the SSL/TLS handshake cannot be completed, check whether the certificate and the private key are correct. If the handshake completes but requests are still blocked, confirm that Cloudflare is verifying the client certificate.

---

## Check mTLS hosts

Check whether [mTLS has been enabled](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls/) for the correct host. The host should match the API endpoint that you want to protect.

---

## Review mTLS rules

To review mTLS rules, consider the steps below. For further guidance refer to [Custom rules](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/).

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. On a specific rule, select **Edit**.
3. On that rule, check whether:  
   * The Expression Preview is correct.  
   * The hostname, if defined, matches your API endpoint. For example, for the API endpoint `api.trackers.ninja/time`, the rule should look like:  
   ```  
   (http.host in {"api.trackers.ninja"} and not cf.tls_client_auth.cert_verified)  
   ```
4. To edit the rule, either use the user interface or select **Edit expression**.

---

## Advanced debugging

You can use [Cloudflare Workers](https://developers.cloudflare.com/workers/) to debug client certificate validation failures.

1. Create a Worker to debug print [cf.properties](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties):  
JavaScript  
```  
export default {  
  async fetch(request, env, ctx) {  
    console.info({ message: JSON.stringify(request.cf, null, 2) });  
    return new Response(JSON.stringify(request.cf, null, 2))  
  }  
};  
```
2. Associate the Worker with the hostname where mTLS is enabled using a [Worker route](https://developers.cloudflare.com/workers/configuration/routing/routes/) or a [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
3. Make requests to the hostname and/or path configured, with and without sending the mTLS client certificate.
4. View your logs on the [Observability](https://developers.cloudflare.com/workers/observability/) dashboard and compare the responses against the expected values listed below.  
[ Go to **Observability** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages/observability)
* Valid certificate  
```  
"tlsClientAuth": {  
  "certPresented": "1",  
  "certVerified": "SUCCESS",  
},  
```
* Invalid certificate (for example, self-signed certificates)  
```  
"tlsClientAuth": {  
  "certPresented": "1",  
  "certVerified": "FAILED:self signed certificate",  
},  
```
* No certificate  
```  
"tlsClientAuth": {  
  "certPresented": "0",  
  "certVerified": "NONE",  
},  
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/client-certificates/troubleshooting/#page","headline":"Troubleshooting client certificates · Cloudflare SSL/TLS docs","description":"Troubleshoot issues with client certificates","url":"https://developers.cloudflare.com/ssl/client-certificates/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["mTLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/client-certificates/","name":"Client certificates (mTLS)"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/client-certificates/troubleshooting/","name":"Troubleshooting"}}]}
```
