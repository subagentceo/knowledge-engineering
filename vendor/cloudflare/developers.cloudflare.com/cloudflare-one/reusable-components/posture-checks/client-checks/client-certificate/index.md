---
title: Client certificate
description: Client certificate in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Client certificate

The Client Certificate device posture attribute checks if the device has a valid client certificate signed by a trusted certificate. The trusted certificate is uploaded to Cloudflare and specified as part of the posture check rule. The client certificate posture check can be used in Gateway and Access policies to ensure that the user is connecting from a managed device.

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| All modes                                                                                                                          | All plans                                                       |

| System   | Availability | Minimum client version1 |
| -------- | ------------ | ----------------------- |
| Windows  | ✅            | 2024.6.415.0            |
| macOS    | ✅            | 2024.6.416.0            |
| Linux    | ✅            | 2024.6.497.0            |
| iOS      | ❌            |                         |
| Android  | ❌            |                         |
| ChromeOS | ❌            |                         |

1 Client certificate checks that ran on an earlier Cloudflare One Client version will continue to work. To configure a new certificate check, update the Cloudflare One Client to the versions listed above.

## Prerequisites

* A CA that issues client certificates for your devices. The Cloudflare One Client does not evaluate the certificate trust chain; this needs to be the issuing certificate.  
Upload the signing certificate that issued the client certificate  
When uploading a certificate to use in posture checks, Cloudflare does not differentiate between root and intermediate certificates. You must upload the actual signing certificate - the one that directly signed the client certificate.  
If you upload a different certificate, even if it exists higher up in the trust chain (for example, the root that issued the signing certificate), the posture check will fail.
* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device.
* A client certificate is [installed and trusted](#configure-the-client-certificate-check) on the device.

Note

To generate a sample root CA for testing, refer to [Generate mTLS certificates](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/#generate-mtls-certificates).

## Configure the client certificate check

1. Use the [Upload mTLS certificate endpoint](https://developers.cloudflare.com/api/resources/mtls%5Fcertificates/methods/create/) to upload the certificate and private key to Cloudflare. The certificate must be a signing certificate, formatted as a single string with `\n` replacing the line breaks. The private key is only required if you are using this custom certificate for Gateway HTTPS inspection.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Account: SSL and Certificates Write`  
Upload mTLS certificate  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mtls_certificates" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "example_ca_cert",  
    "certificates": "-----BEGIN CERTIFICATE-----\nXXXXX\n-----END CERTIFICATE-----",  
    "private_key": "-----BEGIN PRIVATE KEY-----\nXXXXX\n-----END PRIVATE KEY-----",  
    "ca": true  
  }'  
```  
The response will return a UUID for the certificate. For example:  
```  
{  
  "success": true,  
  "errors": [],  
  "messages": [],  
  "result": {  
    "id": "2458ce5a-0c35-4c7f-82c7-8e9487d3ff60",  
    "name": "example_ca_cert",  
    "issuer": "O=Example Inc.,L=California,ST=San Francisco,C=US",  
    "signature": "SHA256WithRSA",  
    ...  
  }  
}  
```
2. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Posture checks**.
3. Go to **Cloudflare One Client checks** and select **Add a check**.
4. Select **Client certificate**.
5. You will be prompted for the following information:  
   1. **Name**: Enter a unique name for this device posture check.  
   2. **Operating system**: Select your operating system.  
   3. **OS locations**: Specify the location(s) where the client certificate is installed.  
   Windows  
         * Local machine trust store  
         * User trust store  
   macOS  
         * System keychain  
   Linux  
         * NSSDB (`/etc/pki/nssdb`) - To search a custom location, enter the absolute file path(s) to the certificate and private key (for example`/usr/local/mycompany/certs/client.pem` and`/usr/local/mycompany/certs/client_key.pem`). The certificate and private key must be in `PEM` format. They can either be in two different files or the same file.  
   4. **Certificate ID**: Enter the UUID of the signing certificate.  
   5. **Common name**: (Optional) To check for a Common Name (CN) on the client certificate, enter a string with optional `${serial_number}` and `${hostname}` variables (for example, `${serial_number}_mycompany`). The Cloudflare One Client will search for an exact, case-insensitive match. If you do not specify a common name, the Cloudflare One Client will ignore the common name field on the certificate.  
   6. **Check for Extended Key Usage**: (Optional) Check whether the client certificate has one or more attributes set. Supported values are **Client authentication** (`1.3.6.1.5.5.7.3.2`) and/or **Email** (`1.3.6.1.5.5.7.3.4`).  
   7. **Check for private key**: (Recommended) When enabled, WARP checks that the device has a private key associated with the client certificate.  
   8. **Subject Alternative Name**: (Optional) To check for a Subject Alternative Name (SAN) on the client certificate, enter a string with optional `${serial_number}` and `${hostname}` variables (for example, `${serial_number}_mycompany`). The Cloudflare One Client will search for an exact, case-insensitive match. You can add multiple SANs to the posture check — a certificate only needs to match one SAN for the check to pass.
6. Select **Save**.

Next, go to **Insights** \> **Logs** \> **Posture logs** and verify that the client certificate check is returning the expected results.

## Troubleshooting

You can use the following commands to check if a client certificate is properly installed and trusted on the device.

* [ Windows ](#tab-panel-7413)
* [ macOS ](#tab-panel-7414)
* [ Linux ](#tab-panel-7415)

1. Open a PowerShell window.
2. To search the local machine trust store for a certificate with a specific common name, run the following command:

PowerShell

```

Get-ChildItem Cert:\LocalMachine\My\ | where{$_.Subject -like "*<COMMON_NAME>*"}


```

1. To search the user trust store for a certificate with a specific common name, run the following command:

PowerShell

```

Get-ChildItem Cert:\CurrentUser\My\ | where{$_.Subject -like "*<COMMON_NAME>*"}


```

1. Open Terminal.
2. To search System Keychain for a certificate with a specific common name, run the following command:

Terminal window

```

/usr/bin/security find-certificate -c "<COMMON_NAME>" -p /Library/Keychains/System.keychain


```

1. Open Terminal.
2. To list all client certificates in NSSDB, run the following command:

Terminal window

```

certutil -L -d /etc/pki/nssdb


```

```

Certificate Nickname                                         Trust Attributes

                                                             SSL,S/MIME,JAR/XPI


meow                                                         CTu,Cu,Cu

noPrivateKey                                                 CT,,


```

1. Open your desired certificate using its certificate nickname. The common name will appear in the line `Subject: "CN=123456.mycompany"`.

Terminal window

```

certutil -L -d /etc/pki/nssdb -n meow


```

```

Certificate:

    Data:

        Version: 3 (0x2)

        Serial Number: 236 (0xec)

        Signature Algorithm: PKCS #1 SHA-256 With RSA Encryption

        Issuer: "CN=123456.mycompany"

        Validity:

            Not Before: Tue Jul 02 17:20:40 2024

            Not After : Sun Jul 02 17:20:40 2034

        Subject: "CN=123456.mycompany"

        Subject Public Key Info:

            Public Key Algorithm: PKCS #1 RSA Encryption

            RSA Public Key:

                Modulus:

                    <redacted>

                Exponent: 65537 (0x10001)

    Signature Algorithm: PKCS #1 SHA-256 With RSA Encryption

    Signature:

        <redacted>

    Fingerprint (SHA-256):

        <redacted>

    Fingerprint (SHA1):

        <redacted>


    Mozilla-CA-Policy: false (attribute missing)

    Certificate Trust Flags:

        SSL Flags:

            Valid CA

            Trusted CA

            User

            Trusted Client CA

        Email Flags:

            Valid CA

            Trusted CA

            User

        Object Signing Flags:

            Valid CA

            Trusted CA

            User


```

For the posture check to pass, a certificate must appear in the output that validates against the uploaded signing certificate.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/client-certificate/#page","headline":"Client certificate · Cloudflare One docs","description":"Client certificate in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/client-certificate/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Posture","mTLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/","name":"Posture checks"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/","name":"Cloudflare One Client checks"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/client-certificate/","name":"Client certificate"}}]}
```
