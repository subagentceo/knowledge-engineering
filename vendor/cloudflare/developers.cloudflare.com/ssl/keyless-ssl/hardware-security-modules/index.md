---
title: Hardware security modules
description: Store private keys in hardware security modules for Keyless SSL.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Hardware security modules

In addition to private keys stored on disk, Keyless SSL supports keys stored in a Hardware Security Module (HSM) via the PKCS#11 standard. Keyless uses PKCS#11 for signing and decrypting payloads without having direct access to the private keys.

---

## Why use Keyless SSL with an HSM?

Hardware Security Modules (HSMs) facilitate a higher level of protection for your private keys over storing them directly on your key server. The primary responsibility of an HSM is safeguarding private keys and performing operations such as signing or encryption internally. In addition to access control, that means the physical device must offer some degree of tamper-resistance in order to be compliant with government or [industry regulations such as FIPS 140 ↗](https://csrc.nist.gov/pubs/fips/140-3/final).

Moreover, many HSMs are also capable of generating keys and producing cryptographically secure randomness. Some are purpose-built to perform cryptographic computations more efficiently.

---

## Communicating using PKCS#11

The key server communicates with HSMs via PKCS#11, so any HSM supporting the standard can be used with Keyless SSL.

### Initial configuration

For more details on initializing your PKCS#11 token, refer to [Configuration](https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/configuration/).

### Compatibility

Keyless SSL has interoperability with the following modules:

* [Entrust nShield Connect ↗](https://www.entrust.com/digital-security/hsm)
* [Gemalto SafeNet Luna ↗](https://cpl.thalesgroup.com/compliance/fips-common-criteria-validations)
* [SoftHSMv2 ↗](https://github.com/opendnssec/SoftHSMv2)
* [YubiKey Neo ↗](https://www.yubico.com/product/yubikey-neo/)

Also, the following cloud HSM offerings have been tested with Keyless SSL:

* [AWS CloudHSM](https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/aws-cloud-hsm/)
* [Azure Dedicated HSM](https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/azure-dedicated-hsm/)
* [Azure Managed HSM](https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/azure-managed-hsm/)
* [Fortanix DSM](https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/fortanix-dsm/)
* [IBM Cloud HSM](https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/ibm-cloud-hsm/)
* [Google Cloud HSM](https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/google-cloud-hsm/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/#page","headline":"Hardware security modules · Cloudflare SSL/TLS docs","description":"Store private keys in hardware security modules for Keyless SSL.","url":"https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/keyless-ssl/","name":"Keyless SSL"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/keyless-ssl/hardware-security-modules/","name":"Hardware security modules"}}]}
```
