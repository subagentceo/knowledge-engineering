---
title: Project Cybersafe Schools
description: Project Cybersafe Schools provides eligible schools with free Cloudflare Email Security and Gateway products to meet CIPA requirements.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Project Cybersafe Schools

Project Cybersafe Schools grants eligible schools with free access to Cloudflare's [Email security](https://developers.cloudflare.com/email-security/) and [Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) products.

## School Eligibility

This program is only available to eligible school districts. To be eligible, Project Cybersafe School participants must be:

* K-12 public school districts located in the United States.
* Up to 2,500 students in the district.

## Children’s Internet Protection Act (CIPA)

The [Children's Internet Protection Act (CIPA) ↗](https://www.fcc.gov/sites/default/files/childrens%5Finternet%5Fprotection%5Fact%5Fcipa.pdf) is a federal law enacted by the United States Congress to address concerns about children's access to inappropriate or harmful content over the Internet. CIPA requires K-12 schools and libraries that receive certain federal funding to implement Internet safety measures to protect minors from harmful online content.

The law aims to prevent students from accessing explicit, obscene, or otherwise harmful material. It also emphasizes the use of technology protection measures, including DNS filtering, to safeguard against Internet threats such as ransomware, phishing sites, and other potentially harmful content.

### CIPA Requirements

CIPA mandates that K-12 schools and libraries adopt Internet safety policies that include measures to block or filter access to specific categories of content. These categories encompass a wide range of topics that could be harmful or inappropriate for minors. Compliance with these requirements helps ensure that students' online experiences are safer and more secure.

### Configuration

To facilitate compliance with CIPA requirements, administrators can [enable a single filtering policy option](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/common-policies/#turn-on-cipa-filter). This includes applying the required filter categories to block access to unwanted or harmful online content.

Note

It is important to note that while our recommended CIPA compliance rule covers the essential filter categories, CIPA is designed to be flexible, allowing administrators to adjust filtering policies based on local standards and requirements.

Administrators should carefully assess their specific location and userbase to determine if additional categories may need to be added or modified to ensure comprehensive protection.

Cloudflare’s recommended CIPA rule blocks the following content subcategories:

* Adult Themes
* Alcohol
* Anonymizer
* Brand Embedding
* Child Abuse
* Command and Control & Botnet
* Cryptomining
* DGA Domains
* DNS Tunneling
* Drugs
* Gambling
* Hacking
* Malware
* Militancy, Hate & Extremism
* Nudity
* P2P
* Phishing
* Pornography
* Private IP Address
* Profanity
* Questionable Activities
* School Cheating
* Spam
* Spyware
* Tobacco
* Violence
* Weapons

Review the [domain categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/) for more information.

### Onboarding Guide

For a comprehensive guide, refer to the [Project Cybersafe Schools Learning Path](https://developers.cloudflare.com/learning-paths/cybersafe/concepts/), which takes you step by step through the technical concepts, creating an account, onboarding your traffic, and enabling the CIPA filters.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cybersafe/#page","headline":"Project Cybersafe Schools · Cloudflare Fundamentals docs","description":"Project Cybersafe Schools provides eligible schools with free Cloudflare Email Security and Gateway products to meet CIPA requirements.","url":"https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cybersafe/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/policies-compliances/","name":"Policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/reference/policies-compliances/cybersafe/","name":"Project Cybersafe Schools"}}]}
```
