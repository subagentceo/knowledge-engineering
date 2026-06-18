---
title: mTLS with Cloudflare Access
description: Implement mutual TLS authentication with Cloudflare.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# mTLS with Cloudflare Access

Note

This requires an active Enterprise [Account](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/) with Cloudflare Access enabled.

Setting up [mTLS](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/) with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) can help in cases where the customer:

* Already has existing Client Certificates on devices.
* Needs to protect Access applications with [Bring Your Own CA (BYOCA)](https://developers.cloudflare.com/ssl/client-certificates/byo-ca/).
* Needs to integrate with a Zero Trust solution.

## 1\. Create a CA

The CA certificate can be from a publicly trusted CA or self-signed.

In case you want to [create your own CA](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/#test-mtls-using-cloudflare-pki) from scratch, you can follow these example steps and adapt the information to your own needs:

1. Create a JSON file called `ca-csr.json`:

```

{

  "CN": "Cloudflare Access Testing CA",

  "key": {

    "algo": "rsa",

    "size": 4096

  },

  "names": [

    {

      "C": "US",

      "L": "LA",

      "O": "Access Testing",

      "OU": "CA",

      "ST": "California"

    }

  ]

}


```

1. Create a JSON file called `ca-config.json`:

```

{

  "signing": {

    "default": {

      "expiry": "8760h"

    },

    "profiles": {

      "server": {

        "usages": ["signing", "key encipherment", "server auth"],

        "expiry": "8760h"

      },

      "client": {

        "usages": ["signing", "key encipherment", "client auth"],

        "expiry": "8760h"

      }

    }

  }

}


```

1. Run the following [cfssl](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/#test-mtls-using-cloudflare-pki) command to generate the CA certificate `ca.pem`:

```

cfssl gencert -initca ca-csr.json | cfssljson -bare ca


```

## 2\. Create Client Certificates

1. In order to create the Client Certificates, you need to prepare the following JSON file called `client-csr.json`:

```

{

    "CN": "mtls-access.example.com",        # replace with your own hostname

    "hosts": ["mtls-access.example.com"],   # replace with your own hostname

    "key": {

      "algo": "rsa",

      "size": 4096

    },

    "names": [

      {

        "C": "US",

        "L": "Austin",

        "O": "Access",

        "OU": "Access Admins",

        "ST": "Texas"

      }

    ]

  }


```

1. Now you can run the following command to generate the Client Certificates, which will output the files `client.pem`, `client-key.pem` and `client.csr`:

Terminal window

```

cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=client client-csr.json | cfssljson -bare client


```

## 3\. Add mTLS CA certificate to Cloudflare Access

Follow the steps outlined in the [developer documentation](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/#add-mtls-authentication-to-your-access-configuration).

Using the example from Step 2: upload the `ca.pem` to your Cloudflare Access account via the [dashboard](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/#add-mtls-authentication-to-your-access-configuration) or [Cloudflare API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/certificates/methods/create/).

Do not forget to enter the fully-qualified domain names (FQDN / associated hostnames) that will use this CA certificate.

Customers can identify which client sends the Client Certificates by [forwarding client certificate headers](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/#forward-a-client-certificate) to the origin server. Customers can then store and use the certificate information such as Common Name (CN), Serial number, and other fields along with the device number to perform additional checks or logics.

Additionally, authenticated requests also send the `Cf-Access-Jwt-Assertion\` JWT header to the origin server. To decode the header value, you can use [jwt.io ↗](https://jwt.io/).

## 4\. Create the self-hosted applications

Finally, the hostname you want to protect with mTLS needs to be added as a [self-hosted app](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) in Cloudflare Access, defining an [Access Policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) which uses the action [Service Auth](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#service-auth) and the Selector _"Valid Certificate"_, or simply requiring an [IdP](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) authentication. You can also take advantage of extra requirements, such as the "Common Name" (CN), which expects the indicated hostname, and more [Selectors](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#selectors). Alternatively, one can also [extend ZTNA with external authorization and serverless computing](https://developers.cloudflare.com/reference-architecture/diagrams/sase/augment-access-with-serverless/).

## Demo

Note

Make sure that you are not using any VPN that could interfere with the certificates or TLS decryption.

With the Public and Private Client Certificates in the same directory, with this cURL command, we will gain access:

Terminal window

```

curl -IXGET --cert client.pem --key client-key.pem https://mtls-access.example.com/


```

```

HTTP/2 200

server: cloudflare


```

Without the certificates, we would see the following:

Terminal window

```

curl -I https://mtls-access.example.com/mtls-test


```

```

HTTP/2 401

server: cloudflare


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/mtls/mtls-cloudflare-access/#page","headline":"mTLS with Cloudflare Access · Cloudflare Learning Paths","description":"Implement mutual TLS authentication with Cloudflare.","url":"https://developers.cloudflare.com/learning-paths/mtls/mtls-cloudflare-access/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/mtls/mtls-cloudflare-access/","name":"mTLS with Cloudflare Access"}}]}
```
