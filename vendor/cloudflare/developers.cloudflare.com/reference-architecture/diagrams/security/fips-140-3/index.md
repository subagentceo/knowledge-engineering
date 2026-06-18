---
title: FIPS 140 level 3 compliance with Cloudflare Application Services
description: This document outlines a reference architecture for achieving Federal Information Processing Standard (FIPS) 140 Level 3 compliance using Cloudflare's Application Services.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# FIPS 140 level 3 compliance with Cloudflare Application Services

**Last reviewed:**  over 1 year ago 

## Introduction

This document outlines a reference architecture for achieving Federal Information Processing Standard (FIPS) 140 Level 3 compliance using Cloudflare's Application Services. FIPS 140 is a U.S. government standard that specifies security requirements for cryptographic modules protecting sensitive information in computer and telecommunication systems.

FIPS 140 defines four security levels, with Level 3 being the most stringent for non-military applications. It mandates physical tamper-resistance to prevent unauthorized access to cryptographic keys and critical security parameters. This includes measures like robust enclosures, tamper-evident seals, and identity-based authentication.

Achieving FIPS 140 compliance, particularly Level 3, is crucial for organizations handling sensitive data, especially those in regulated industries like:

* **Government**: Federal agencies and contractors processing sensitive government information.
* **Healthcare**: Organizations handling protected health information (PHI) under HIPAA.
* **Financial** Services: Institutions dealing with financial transactions and customer data.
* **Defense**: Contractors working on defense projects requiring stringent security measures.

FIPS 140 compliance demonstrates a strong commitment to data security, builds trust with customers and partners, and ensures adherence to regulatory requirements. This reference architecture provides a comprehensive guide to leveraging Cloudflare's robust security features to meet these stringent standards.

## FIPS 140-3 levels

Organizations use the FIPS 140-3 standard to ensure that the hardware they select meets specific security requirements. The FIPS certification standard defines four increasing, qualitative levels of security.

* [ Level 1 ](#tab-panel-9963)
* [ Level 2 ](#tab-panel-9964)
* [ Level 3 ](#tab-panel-9965)
* [ Level 4 ](#tab-panel-9966)

Requires production-grade equipment and externally tested algorithms.

Adds requirements for physical tamper-evidence and role-based authentication.

Adds requirements for physical tamper-resistance and identity-based authentication. There must also be physical or logical separation between the interfaces by which critical security parameters enter and leave the module. Private keys can only enter or leave in encrypted form. Level 3 also requires the module to detect and react to out-of-range voltage or temperature (environmental failure protection, or EFP), or alternatively undergo environmental failure testing (EFT).

This level makes the physical security requirements more stringent, requiring the ability to be tamper-active, erasing the contents of the device if it detects various forms of environmental attack. EFP and protection against fault injection is required as well as multi-factor authentication.

## Key components

* **Cloudflare Keyless SSL**: A service that allows organizations to use Cloudflare's SSL/TLS protection while keeping their private keys securely stored in their own infrastructure, ensuring private keys remain under their control and never leave their premises, while still benefiting from Cloudflare's DDoS protection and performance optimization features.
* **Cloudflare Tunnel**: Provides a secure, encrypted connection between Cloudflare's global network and the private infrastructure hosting CloudHSM, protecting data in transit.
* **Hardware Security module**: A FIPS 140 Level 3 compliant HSM that securely manages cryptographic keys. Cloudflare supports a handful of HSMs, including AWS CloudHSM, Azure Key Vault, and Google Cloud KMS.

## Architecture overview

The architecture diagram below illustrates the key components and data flow for achieving FIPS 140 Level 3 compliance with Cloudflare Application Services and all its required components.

flowchart TB
  User((User/Client)) --> |1.SNI = keyless.example.com| CF[Cloudflare Edge Network]

  subgraph CF [Cloudflare Edge]
      KeylessSSL[Keyless SSL Service]
  end

  subgraph Private[Private Infrastructure]
      Tunnel[Cloudflare Tunnel]
      HSM[Hardware Security Module]
  		KeylessModule[Keyless Module]
  end

  Tunnel -->|2.Establish tunnel| KeylessSSL
  KeylessSSL -->|3.Keyless operation required| Tunnel
  Tunnel -->|4.Forward to HSM| KeylessModule
  KeylessModule -->|5.Key Operations via PKCS11| HSM

  classDef cloudflare fill:#F6821F,stroke:#fff,stroke-width:2px,color:#fff
  classDef aws fill:#232F3E,stroke:#fff,stroke-width:2px,color:#fff
  classDef default fill:#fff,stroke:#000,stroke-width:2px, color:#000

  class CF,KeylessSSL,Tunnel,KeylessModule cloudflare
  class HSM aws
  class User default

1. **User/Client**: Initiates an HTTPS request to a domain protected by Cloudflare. The Server Name Indication (SNI) extension in the request specifies the domain name like, for example, `keyless.example.com`. That domain is mapped to a certificate declared as [keyless](https://developers.cloudflare.com/ssl/keyless-ssl/), which means that only the public is being imported to Cloudflare, but a keyless listener is also declared, for subsequent key operations.
2. **Cloudflare secure tunnel establishment**: The Cloudflare [tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) component is used to establish a secure and reliable connection with Cloudflare's global network. Only outgoing traffic is leaving the perimeter and the traffic can be narrowed down by a firewall. That secure connectivity will be used as a secured overlay for the key operations.
3. **Key Operations**: Cloudflare [SSL](https://developers.cloudflare.com/ssl/)detects that a keyless operation is necessary and then sends all the key operations towards the keyless module installed on the private infrastructure. All the traffic is flowing through the previously established secured tunnel.
4. **Keyless Module**: The [keyless module](https://developers.cloudflare.com/ssl/keyless-ssl/configuration/cloudflare-tunnel/#install) is responsible for forwarding the key operations to the Hardware Security Module (HSM) for cryptographic operations. The keyless module is a software component that acts as a proxy between Cloudflare and the HSM, ensuring that the private key never leaves the HSM.
5. **Key operations via PKCS11**: The HSM performs cryptographic operations using the private key stored securely within the HSM. The HSM is a tamper-resistant device that securely manages cryptographic keys and performs cryptographic operations, ensuring the highest level of security for sensitive data.

## Further reading

* [Cloudflare Keyless SSL](https://developers.cloudflare.com/ssl/keyless-ssl)
* [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)
* [Keyless SSL with secured Tunnel](https://developers.cloudflare.com/ssl/keyless-ssl/configuration/cloudflare-tunnel/)
* Supported HSMs:  
   * [ AWS cloud HSM ](https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/aws-cloud-hsm/) :  Learn how to use Keyless SSL with AWS CloudHSM.  
   * [ Azure Dedicated HSM ](https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/azure-dedicated-hsm/) :  Learn how to use Keyless SSL with Azure Dedicated HSM.  
   * [ Azure Managed HSM ](https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/azure-managed-hsm/) :  This tutorial uses Microsoft Azure's Managed HSM to deploy a VM with the Keyless SSL daemon. Follow these instructions to deploy your keyless server.  
   * [ Configuration ](https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/configuration/) :  Configure the key server to work with hardware security modules.  
   * [ Entrust nShield Connect ](https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/entrust-nshield-connect/) :  Learn how to use Keyless SSL with Entrust nShield Connect.  
   * [ Fortanix Data Security Manager ](https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/fortanix-dsm/) :  Configure Keyless SSL with Fortanix Data Security Manager.  
   * [ Google Cloud HSM ](https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/google-cloud-hsm/) :  Learn how to use Keyless SSL with Google Cloud HSM.  
   * [ IBM Cloud HSM ](https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/ibm-cloud-hsm/) :  Learn how to use Keyless SSL with IBM Cloud HSM.  
   * [ SoftHSMv2 ](https://developers.cloudflare.com/ssl/keyless-ssl/hardware-security-modules/softhsmv2/) :  Learn how to use Keyless SSL with SoftHSMv2\.

```

```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/security/fips-140-3/#page","headline":"FIPS 140 level 3 compliance with Cloudflare Application Services · Cloudflare Reference Architecture docs","description":"This document outlines a reference architecture for achieving Federal Information Processing Standard (FIPS) 140 Level 3 compliance using Cloudflare's Application Services.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/security/fips-140-3/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/security/","name":"Security"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/security/fips-140-3/","name":"FIPS 140 level 3 compliance with Cloudflare Application Services"}}]}
```
