# General Data Protection Regulation of 2018

*Regulation*. European Union law that regulates the handling of personal data and outlines the rights individuals have regarding their data.

The General Data Protection Regulation (GDPR) regulates the handling of personal data and outlines the rights individuals have with regard to their data. The EU implemented this law on May 25, 2018.

It applies to any ["individual, company, or organization"][eu-stakeholder] that processes the data of a person in the EU. This applies to organizations in the EU or elsewhere.

## Purpose of the GDPR

The European Union views the protection of personal data as a fundamental right of [natural persons][]. The GDPR provides the following guidance:

* Establishes requirements of organizations that process data.
* Defines the rights of individuals to manage their data.
* Outlines penalties for those who violate these rights.

To better understand the GDPR, understand what qualifies as *personal data* and data *processing*.

### Personal data

*Personal data* can identify someone or be associated directly or indirectly with a living individual. This includes a person's name, driver's license number, location data, IP address, biometric data, and more.

### Processing

*Processing* encompasses most uses of personal data, including collection, storage, organization, alteration, destruction, and transmission. For all intents and purposes, the EU considers any use of personal data to be processing.

## Sender information

The GDPR requires you to obtain and document consent from recipients on your lists. Each individual recipient must opt into receiving emails. For example, they might sign up on a web site. You must maintain a record of the recipient having signed up. It also means that the recipient can *opt out* of receiving emails and the sender must honor their request. Have your opt out process consistent with your opt in process. Keep records of consent up to date. This prevents senders sending email messages to recipients who have opted out.

There are a number of different legal reasons for which your organization might be processing personal data. Some uses of data don't require consent. For example, you don't need a signatory's consent to retain their name and signature on a business contract. Email mailing list maintenance relies on obtaining consent from your recipients.

If your specific business purpose only needs an email address, only store the email address. The GDPR requires that you process only the data necessary for a legitimate business need and nothing more. All this processing should also be done securely with [Privacy by Design and by default][privacy-dd].

### Controllers and processors

Under the GDPR, an organization processing personal data acts as either a *controller* or a *processor*.

* A *controller* decides the how data gets used.
* A *processor* adds, updates, or removes data only on behalf of the controller.

**For example**: You maintain a large email marketing list and deliver promotions with Twilio Email.

* You serve as the controller. You set the business purpose and control the data.
* Twilio Email serves as your processor. Twilio Email processes that data on your behalf.

Many businesses act as both controllers and processors. To learn more about these distinctions, see [Chapter IV][] of the full GDPR legal text.

### Customer rights

The GDPR provides rights to natural persons. For this reason, your customers might request that their data updates or erasure in certain circumstances. If data subjects want to move their data to another service, they can. Their data should be provided to them in a common machine-readable format that other organizations can understand.
When communicating with individuals, they also have a right to receive that communication in plain and transparent language. To learn more about the rights of a data subject, see [Chapter III][] of the full GDPR text.

## Twilio and the GDPR

Twilio believes the GDPR moves in the right direction. Twilio values its customers' data. Twilio has [Privacy Shield][] certification and complies with GDPR. Twilio protects personal data throughout the entire processing chain. To learn more about the GDPR, see the [Twilio guide on General Data Protection Regulation][tw-gdpr].

[eu-stakeholder]: https://commission.europa.eu/law/law-topic/data-protection/reform/what-does-general-data-protection-regulation-gdpr-govern_en

[Chapter III]: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=uriserv:OJ.L_.2016.119.01.0001.01.ENG&toc=OJ:L:2016:119:FULL#d1e2161-1-1

[Chapter IV]: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=uriserv:OJ.L_.2016.119.01.0001.01.ENG&toc=OJ:L:2016:119:FULL#d1e3022-1-1

[privacy-dd]: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=uriserv:OJ.L_.2016.119.01.0001.01.ENG&toc=OJ:L:2016:119:FULL#d1e3022-1-1

[FAQ]: https://www.twilio.com/en-us/resource-center/general-data-protection-regulation-2#chapter-10-faqs

[tw-gdpr]: https://www.twilio.com/en-us/resource-center/general-data-protection-regulation-2

[natural persons]: https://en.wikipedia.org/wiki/Natural_person

[Privacy Shield]: https://www.privacyshield.gov/welcome
