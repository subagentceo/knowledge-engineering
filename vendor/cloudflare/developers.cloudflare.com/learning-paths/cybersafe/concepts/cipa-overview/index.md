---
title: Project Cybersafe Schools and CIPA
description: Learn about project cybersafe schools and cipa in this guide.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Project Cybersafe Schools and CIPA

Project Cybersafe Schools (PCS) grants eligible schools free access to Cloudflare’s Email security and Gateway products.

Like other under-resourced organizations, schools face cyber attacks from malicious actors that can impact schools’ ability to safely perform a basic function – teach children. Schools face email, phishing, and ransomware attacks that slow access and threaten leaks of confidential student data.

PCS will help support small K-12 public school districts, for free, by providing cloud email security to protect against a broad spectrum of threats including malware-less business email compromise, multichannel phishing, credential harvesting, and other targeted attacks. PCS will also protect against Internet threats with DNS filtering by preventing users from reaching unwanted or harmful online content like ransomware or phishing sites and can be deployed to comply with the Children’s Internet Protection Act (CIPA).

## Project Cybersafe Schools Eligibility

This program is only available to eligible school districts. To be eligible, Project Cybersafe School participants must be:

* K-12 public school districts located in the United States.
* Up to 2,500 students in the district.

Apply to [Project Cybersafe Schools ↗](https://www.cloudflare.com/lp/cybersafe-schools/).

## Children’s Internet Protection Act (CIPA)

The [Children's Internet Protection Act (CIPA) ↗](https://www.fcc.gov/sites/default/files/childrens%5Finternet%5Fprotection%5Fact%5Fcipa.pdf) is a federal law enacted by the United States Congress to address concerns about children's access to inappropriate or harmful content over the Internet. CIPA requires K-12 schools and libraries that receive certain federal funding to implement Internet safety measures to protect minors from harmful online content.

The law aims to prevent students from accessing explicit, obscene, or otherwise harmful material. It also emphasizes the use of technology protection measures, including DNS filtering, to safeguard against Internet threats such as ransomware, phishing sites, and other potentially harmful content.

### Requirements

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

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/cybersafe/concepts/cipa-overview/#page","headline":"Project Cybersafe Schools and CIPA · Cloudflare Learning Paths","description":"Learn about project cybersafe schools and cipa in this guide.","url":"https://developers.cloudflare.com/learning-paths/cybersafe/concepts/cipa-overview/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/cybersafe/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/cybersafe/concepts/cipa-overview/","name":"Project Cybersafe Schools and CIPA"}}]}
```
