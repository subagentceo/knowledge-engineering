# Twilio Editions

Twilio Editions offers advanced security, administration, and compliance features designed to protect your customer communications. This guide helps you understand these capabilities and implement them within your environment.

Use this guide to explore:

* **Feature capabilities**: Deep dive into individual access controls, auditing tools, and security functions.
* **Technical setup**: Step-by-step configurations required to activate and manage these features.
* **Purchasing**: How to add these capabilities to your Twilio account.

For an overview of which features are included in which packages, see [twilio.com/editions](https://www.twilio.com/en-us/editions).

## Features included in all Editions

### Single Sign-On (SSO)

> \[!NOTE]
>
> Single Sign-On is available to all Twilio Editions customers.

SSO is an industry-standard protocol that enables businesses building with Twilio to manage access to their Twilio accounts through their preferred Identity Provider (IdP). Twilio's SSO implementation is designed to interoperate with the vast majority of IdPs.

To use SSO after purchasing Editions:

1. Create an [Organization](/docs/iam/organizations).
2. Add each Twilio account into that Organization.
3. Configure SSO in your Organization settings.

For full setup instructions, see [Single Sign-On](/docs/iam/single-sign-on).

### Advanced Audit Insights

> \[!NOTE]
>
> Advanced Audit Insights is available to all Twilio Editions customers.

Effective monitoring and security require good Security Information and Event Management (SIEM) practices. Twilio offers Advanced Audit Insights to support this critical use case.

All Twilio customers have access to the Audit Events API. With an Editions purchase, Twilio extends log retention from 30 days to 400 days, which reduces the development effort required to fetch and store logs in a SIEM solution.

### Bulk Export Automation

> \[!NOTE]
>
> Bulk Export Automation is available to all Twilio Editions customers.

Many Twilio customers need to bring Twilio data into their environment to power internal reports. Twilio's Bulk Export API provides a solution. With Editions, you receive the added ability to schedule batch job exports through the Export Configuration.

## Features in Security and Enterprise Editions

### Conversational Intelligence Public Key Encryption

> \[!NOTE]
>
> This feature requires Security or Enterprise Editions.

Twilio Conversational Intelligence improves the quality of business-to-customer interactions through recommendations. Since customer conversation data is inherently sensitive, this offering encrypts personal data within customer conversations.

Once Security or Enterprise Editions have been purchased, see [Encrypting transcripts and operator results](/docs/conversation-intelligence-classic/encrypting-transcripts-and-operator-results) for setup instructions.

### Public Key Client Validation

> \[!NOTE]
>
> This feature requires Security or Enterprise Editions.

Public Key Client Validation (PKCV) provides a way to perform asymmetric API authentication. You can use this to meet unique compliance requirements relating to credentials management when using the Twilio platform.

Once Security or Enterprise Editions have been purchased, see the [PKCV developer docs](/docs/iam/pkcv/quickstart) for setup instructions.

### Public Key Encrypted Recordings

> \[!NOTE]
>
> This feature requires Security or Enterprise Editions.

Twilio Voice Intelligence makes it easy for businesses to issue voice calls to their customers. Since customer conversation data is inherently sensitive, Public Key Encrypted Recordings encrypts personal data within customer conversations.

Once Security or Enterprise Editions have been purchased, see [Encrypted Recordings](/docs/video/api/encrypted-recordings) for setup instructions.

> \[!WARNING]
>
> This feature is also available on a metered usage basis without an Editions purchase.

### Static Proxy for Webhooks

> \[!NOTE]
>
> This feature requires Security or Enterprise Editions.

Webhooks and Event Streams are common solutions for egressing data from Twilio into customer networks. Static proxy enables you to limit open ports to only known IP addresses coming from Twilio's network.

Upon purchase of Editions, you receive an email with guidance on Twilio's fixed IP ranges. There is no action required within the Twilio platform to enable this, but you need to configure your own platforms to allow the Twilio IP addresses.

### HIPAA Accounts

> \[!NOTE]
>
> This feature requires Security or Enterprise Editions.

Businesses serving healthcare enterprises and organizations in the United States must comply with US HIPAA regulations to protect Personal Health Information (PHI). With this offering, Twilio provides a path to HIPAA compliance through HIPAA accounts, ensuring PHI in customer communications is processed according to HIPAA's requirements.

To set up HIPAA accounts:

1. Work with your Twilio account manager to sign a Business Associate Addendum.
2. See [twilio.com/hipaa](https://www.twilio.com/en-us/hipaa) for information on Twilio's HIPAA Eligible services and architecting for HIPAA guidelines.

## Features in Enterprise Editions

### Interconnect VPN

> \[!NOTE]
>
> This feature requires Enterprise Editions.

Twilio bridges the internet into global telecommunications networks. These networks have various conventions for network-level security which Twilio facilitates through the Interconnect product.

With Enterprise Editions, you receive access to Twilio Interconnect VPN 10 Mbps in the country of your choosing.

> \[!WARNING]
>
> 100 Mbps connections, cross-connect, and third-party exchange are not included in Enterprise Editions. Standard rates apply.

### Advanced Billing Insights

> \[!NOTE]
>
> This feature requires Enterprise Editions.

Twilio's largest customers often face unique challenges in managing their Twilio spend across multiple use cases and development teams. Billing Insights provides a cross-account view on Twilio spend with the following capabilities:

* Billable item details, including total costs broken down by sub-account, product, recurring charges, and more
* Bucket details, credits, and promos information
* Custom filters and queries that you can save for quick reference

### Extended Data Access Policy

> \[!NOTE]
>
> This feature requires Enterprise Editions.

Managing data retention of personal data is critical in the modern regulatory landscape. Twilio enables every customer to configure data retention in Twilio's Messaging product line between 7 and 400 days through the Twilio Console. However, some customers have unique compliance use cases that call for extended data retention.

With this offering, you can extend data retention up to 9,999 days. Customers with retention periods beyond 400 days can access their data through Twilio's Bulk Export API.

Raise a request with [Twilio Support](https://help.twilio.com) for configuration once Enterprise Editions has been purchased.

### 99.99% SLA

> \[!NOTE]
>
> This feature requires Enterprise Editions.

For Enterprise Editions customers, Twilio commits to a higher level of service as defined in [Twilio's Service Level Agreement](https://www.twilio.com/en-us/legal/service-level-agreement). No additional steps are required beyond purchasing Enterprise Editions.

## Purchasing and deployment

To purchase any of the Twilio Editions packages, reach out to the [Twilio Sales team](https://www.twilio.com/en-us/editions).
