---
title: AWS cloud HSM
description: Learn how to use Keyless SSL with AWS CloudHSM.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# AWS cloud HSM

Note

This example imports an existing key pair, but you may prefer to [generate your key on the HSM ↗](https://docs.aws.amazon.com/cloudhsm/latest/userguide/manage-keys.html).

---

## Before you start

Make sure you have:

* Provisioned an [AWS CloudHSM cluster ↗](https://docs.aws.amazon.com/cloudhsm/latest/userguide/getting-started.html) .
* Installed the [appropriate software library for PKCS#11 ↗](https://docs.aws.amazon.com/cloudhsm/latest/userguide/pkcs11-library-install.html).

---

## 1\. Import the public and private key to the HSM

Before importing the public key, extract it from the certificate provided by your CA. Place the contents of your private key in `privkey.pem` and then run the following (replacing certificate.pem with your actual certificate) to populate `pubkey.pm`.

```

keyserver$ openssl x509 -pubkey -noout -in certificate.pem > pubkey.pem


```

Log in to the CloudHSM using a previously created [crypto user ↗](https://docs.aws.amazon.com/cloudhsm/latest/userguide/hsm-users.html#crypto-user) (CU) account and generate a key encryption key that will be used to import your private key.

```

keyserver$ /opt/cloudhsm/bin/key_mgmt_util

Command: loginHSM -u CU -s patrick -p donahue

Command: genSymKey -t 31 -s 16 -sess -l import-wrapping-key

...

Symmetric Key Created.  Key Handle: 658

...


```

Referencing the key handle returned above, import the private and public key and then log out of the HSM:

```

Command: importPrivateKey -f privkey.pem -l mykey -id 1 -w 658

...

Cfm3WrapHostKey returned: 0x00 : HSM Return: SUCCESS

Cfm3CreateUnwrapTemplate returned: 0x00 : HSM Return: SUCCESS

Cfm3UnWrapKey returned: 0x00 : HSM Return: SUCCESS

...

Private Key Unwrapped.  Key Handle: 658


Command: importPubKey -f pubkey.pem -l mykey -id 1

Cfm3CreatePublicKey returned: 0x00 : HSM Return: SUCCESS

...

Public Key Handle: 941


Command: logoutHSM

Command: exit


```

---

## 2\. Modify the gokeyless config file and restart the service

Now that the keys are in place, we need to modify the configuration file that the key server will read on startup. Change the `object=mykey` and `pin-value=username:password` values to match the key label you provided and CU user you created.

Open `/etc/keyless/gokeyless.yaml` and immediately after:

YAML

```

private_key_stores:

  - dir: /etc/keyless/keys


```

add:

YAML

```

- uri: pkcs11:token=cavium;object=mykey?module-path=/opt/cloudhsm/lib/libcloudhsm_pkcs11_standard.so&pin-value=patrick:donahue&max-sessions=1


```

With the config file saved, restart `gokeyless` and verify it started successfully.

Terminal window

```

sudo systemctl restart gokeyless.service

sudo systemctl status gokeyless.service -l


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/aws-cloud-hsm/#page","headline":"AWS cloud HSM · Cloudflare SSL/TLS docs","description":"Learn how to use Keyless SSL with AWS CloudHSM.","url":"https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/aws-cloud-hsm/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AWS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/keyless-ssl/","name":"Keyless SSL"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/keyless-ssl/hardware-security-modules/","name":"Hardware security modules"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/keyless-ssl/hardware-security-modules/aws-cloud-hsm/","name":"AWS cloud HSM"}}]}
```
