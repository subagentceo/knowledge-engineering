# HIPAA Accounts

> \[!NOTE]
>
> HIPAA Accounts require Twilio Security Edition or Enterprise Edition. Learn more about [Twilio Editions](/docs/iam/twilio-editions).

The Health Insurance Portability and Accountability Act (HIPAA) provides security and data privacy protections around access, use, and disclosure of protected health information (PHI). Businesses serving healthcare enterprises and organizations in the United States must comply with HIPAA regulations when processing PHI.

Twilio provides a path to HIPAA compliance through HIPAA Accounts, ensuring PHI in customer communications is processed according to HIPAA requirements.

## Setting up HIPAA Accounts

To use Twilio in a HIPAA-compliant workflow:

1. **Purchase an eligible Twilio Edition.** HIPAA Accounts are available with Security and Enterprise Editions. Contact the [Twilio Sales team](https://www.twilio.com/en-us/editions) to purchase.
2. **Execute a Business Associate Addendum (BAA).** Work with your Twilio account manager to sign a BAA to [Twilio's Terms of Service](https://www.twilio.com/en-us/legal/tos). Under HIPAA, companies that use a service provider to process PHI on their behalf must have a BAA in place.
3. **Architect your workflow for HIPAA.** Review the [Architecting for HIPAA on Twilio](https://twil.io/architecting-for-hipaa) guide to ensure your implementation meets compliance requirements.

> \[!WARNING]
>
> HIPAA compliance is a shared responsibility between you and Twilio. Signing a BAA alone does not make your application HIPAA-compliant. You must also follow the architecture guidelines and use only HIPAA-eligible services.

## HIPAA-eligible services

Twilio offers a set of products and services that are eligible for use in HIPAA-compliant workflows. For the current list of eligible services, see the [HIPAA Eligible Products and Services](https://twil.io/HIPAA-eligible-products-and-services) document.

All services that are HIPAA-eligible in the Twilio Console are also HIPAA-eligible in OneConsole.

> \[!NOTE]
>
> The HIPAA-eligible version of Twilio's products is the same as the non-HIPAA-eligible version. There is no separate product to enable. The difference is the BAA and how you architect your workflow.

## Twilio as a Business Associate

Under HIPAA, companies that use a service provider to process PHI on their behalf must put in place a Business Associate Agreement with that service provider. Twilio's BAA has been developed taking into account the specific products and services that Twilio offers.

To get a BAA in place with Twilio, contact your account manager or reach out to the [Twilio Sales team](https://www.twilio.com/en-us/editions).

## Compliance certifications

Twilio's compliance certifications, including HIPAA, are available for self-service download through the [Twilio Security Portal](https://security.twilio.com/).

## Resources

* [Architecting for HIPAA on Twilio](https://twil.io/architecting-for-hipaa)
* [HIPAA Eligible Products and Services](https://twil.io/HIPAA-eligible-products-and-services)
* [Twilio Security Portal](https://security.twilio.com/) — Self-service access to compliance certifications
* [Twilio Security](https://www.twilio.com/en-us/security)
* [Twilio Editions](https://www.twilio.com/en-us/editions)
