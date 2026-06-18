# What is Personally Identifiable Information (PII)?

Any data with sufficient specificity to locate, identify, or contact a single person.

*Personally Identifiable Information* (PII), or personal data, includes information such as phone numbers, national ID numbers, or email addresses. It covers any data that someone can use, either on its own or combined with other data, to contact, identify, or locate a specific person.

## What makes data PII

As businesses increase the collection and storage of individuals' data, individuals and regulators want greater transparency about how these businesses use and safeguard that data. This led to various jurisdictions passing legislation that limits the use, distribution, and accessibility of PII, while requiring businesses to seek consent in collecting data and securing it after collection.

PII is a legal, rather than technical, concept. Legislation around PII varies across different jurisdictions. These include:

* Global privacy laws: [GDPR][] in the European Union
* Industry laws: [HIPAA][] and [PCI][] in the United States
* State or provincial laws: [CCPA][], [CPRA][], [CalOPPA][]
* Regional data breach laws

These and other regulations define PII in their contexts, so PII definitions differ by use case. **For example**: IP addresses might or might not be considered PII, depending on the jurisdiction or your use case.

## How Twilio manages PII

Twilio treats customer data management as a serious matter. To keep your data safe and secure, Twilio employs software, configurations, processes, and guidelines for managing data. Inside Twilio systems, PII gets managed in different ways.

* Twilio wants you to know what data it manages as PII in its systems.
* Twilio provides a [Data Protection Addendum][]. This extends the specification of your legal relationship with Twilio and clarifies how Twilio manages data on your behalf.
* European users should explore the Twilio [GDPR Program][]. This clarifies how Twilio manages data where some or all of your data might originate in Europe.

> \[!WARNING]
>
> The recipient of the message or call could be European. The GDPR protects European recipients, not only European senders or numbers.

To remove or encrypt PII, Twilio offers features that [redact phone numbers][redaction], [message body contents][redaction], and [encrypt call recordings][encrypt-rec].

### Properties marked as PII

Twilio manages API properties marked as PII in its API documentation. Twilio implements appropriate technical and organizational security controls as appropriate to the risk associated with that data.

> \[!NOTE]
>
> Unless they act on your behalf or have a legitimate business need, Twilio employees can't view your PII data. This includes tasks like debugging a problem for you.

When Twilio needs data for statistical analysis, reporting, and capacity planning, Twilio anonymizes or removes values with PII first. Twilio treats values like names, your end users' phone numbers, or voice call and chat transcriptions as containing PII. Twilio manages the phone numbers that you rent, whether a long code or short code, differently from non-Twilio numbers. Twilio owns the rented phone numbers.

For each property marked as PII, Twilio also marks it with a Minimum Time to Live (MTL), expressed in days. This specifies how many days after creation Twilio systems store that data for carrier reconciliation, tax management, or other required business purpose. Outside of the MTL, Twilio applies deletion API requests immediately. The deleted data could remain in backups and other interconnected systems for up to 30 days.

> \[!NOTE]
>
> If a resource has MTL of 90 days, and you delete it on day 1 after creation, information will be completely gone 91 days after creation, because of the MTL. If you delete it on day 90, it will be gone by day 120, taking 30 days.

If you have special retention requirements, contact the Twilio [support team][] or your success manager for potential options.

### PII data management when you part ways with Twilio

When you leave Twilio following a reasonable grace period, Twilio anonymizes or removes all PII data from its systems within 30 days, or longer if the MTL exceeds 30 days.

In addition to the MTL, Twilio may also retain PII for specific regulatory, mitigation, legal, or investigative concerns. These include, but are not limited to:

* Detecting, preventing, and investigating spam, fraudulent activity, and network exploits and abuse
* Litigation, law enforcement requests, or government investigations

### Properties marked "Not PII"

Twilio stores properties marked with "Not PII".

* Twilio might use these for counting or other operations as Twilio runs its systems.
* Twilio can't redact or remove most of these properties.
* You might be able to control the data in these properties in some instances
* You should never place PII in properties marked "Not PII".
* Twilio doesn't treat this data as PII, and its value may be visible to Twilio employees, stored long-term, and may continue to be stored after you've left Twilio's platform.

If you need to put PII in these properties, contact [Twilio Support][support team] for data management alternatives.

## Related resources

To better understand data privacy at Twilio, see these resources:

* Read more about [what Twilio is doing to protect your data][]
* Familiarize yourself with the [Twilio privacy policy][]
* Read about [Twilio and the General Data Protection Regulation (GDPR)][]

[Data Protection Addendum]: https://pages.twilio.com/gdpr?_ga=2.8188849.2078322519.1518531943-1503646178.1513100296

[GDPR Program]: https://www.twilio.com/gdpr

[redaction]: https://www.twilio.com/blog/protect-customer-privacy-with-redaction

[encrypt-rec]: https://www.twilio.com/blog/introducing-call-recording-encryption-html

[what Twilio is doing to protect your data]: https://www.twilio.com/blog/twilio-is-doing-to-protect-your-data-html

[Twilio privacy policy]: /legal/privacy

[Twilio and the General Data Protection Regulation (GDPR)]: https://help.twilio.com/hc/en-us/articles/115012662988-Twilio-and-the-General-Data-Protection-Regulation-GDPR-

[GDPR]: https://en.wikipedia.org/wiki/General_Data_Protection_Regulation

[HIPAA]: https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act

[PCI]: https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard

[CCPA]: https://en.wikipedia.org/wiki/California_Consumer_Privacy_Act

[CPRA]: https://en.wikipedia.org/wiki/2020_California_Proposition_24

[CalOPPA]: https://en.wikipedia.org/wiki/Online_Privacy_Protection_Act

[support team]: https://help.twilio.com
