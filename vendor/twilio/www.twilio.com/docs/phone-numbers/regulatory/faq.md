# Phone Number Regulatory FAQ

To use phone numbers compliantly in many countries of the world, both Twilio and our customers must adhere to the local country regulations. Doing so often means that we must provide adequate identity documentation to the local regulator or carrier. If they don't provide this information, there is a high risk the local regulators or carriers will disconnect the phone number.

This list of Frequently Asked Questions (FAQ) will provide more details about regulations, what you need to do to stay compliant, and why.

For insights understanding bundle rejection reasons please see our helpful guide: [Understanding Regulatory Bundle Rejections](https://help.twilio.com/hc/en-us/articles/16066152436507-Understanding-Regulatory-Bundle-Rejections#h_01H3FMFG2M2FXJ13EWDREP09TT)

## Contents

* [General Phone Number Regulatory FAQ](/docs/phone-numbers/regulatory/faq#general-phone-number-regulatory-faq)
* [Privacy and Safety FAQ](/docs/phone-numbers/regulatory/faq#privacy-and-safety-faq)
* [Phone Number Use Case FAQ](/docs/phone-numbers/regulatory/faq#phone-number-use-case-faq)
* [Prefix Locality Matching FAQ](/docs/phone-numbers/regulatory/faq#prefix-locality-matching-faq)
* [Phone Numbers Console Regulatory FAQ](/docs/phone-numbers/regulatory/faq#phone-numbers-console-regulatory-faq)
* [Regulatory Compliance Communications FAQ](/docs/phone-numbers/regulatory/faq#regulatory-compliance-communications-faq)
* [V2 RC Platform FAQ](/docs/phone-numbers/regulatory/faq#v2-rc-platform-faq)
* [Update Compliance Information FAQ](/docs/phone-numbers/regulatory/faq#update-compliance-information-faq)
* [IncomingPhoneNumbers API FAQ](/docs/phone-numbers/regulatory/faq#incomingphonenumbers-api-faq)

## **General Phone Number Regulatory FAQ**

### **Q: How are phone number regulations changing and why?**

A: Many countries around the world have recently been increasing their scrutiny of how their phone numbers are used. This increased scrutiny is driven by various factors, including increased incidents of misuse and abuse of phone numbers, heightened national security concerns, and increased pressure on the supply of numbers.

As a result, various countries are updating their regulations or placing greater emphasis on the enforcement of existing regulations, including those requiring validation of who is actually using the phone number and exactly where that individual or business is located. In short, the intent of these regulations is to verify who is using the number and where they are.

Twilio, our customers, end users, and providers each have a role and a collective obligation to ensure numbers are assigned and used in a manner consistent with the intent of the regulations in the relevant country.

### **Q: Is this enforcement only impacting Twilio customers? Is it because there's spam and abuse on your platform?**

A: No. Twilio does not permit spam or abuse on our platform. Regulatory requirements are due to worldwide enforcement of existing and new regulations as nations seek to have better control over their national communications infrastructures. All communications companies, including Twilio, are subject to these regulations, and providers and end customers ignore such requirements at their peril. End-user phone numbers that do not comply are at risk of being disconnected due to national regulatory action without notice regardless of provider, a gamble to which Twilio does not subject its customers or itself.

### **Q: Other providers do not require address and identity information for my phone numbers. Why does Twilio?**

A: Many countries around the world have recently been increasing their scrutiny of how their phone numbers are used. We strongly believe all providers are being asked—or soon will be asked—to provide the same information Twilio requires. In every country, the regulations apply equally to all phone number providers. Twilio is in no way being singled out.

### **Q: Which countries are affected? What are the exact requirements?**

A: To help you comply with these regulations and minimize the risk of disruption to your phone numbers, Twilio maintains an up-to-date country-by-country guide of [phone number regulatory requirements](https://www.twilio.com/en-us/guidelines/regulatory). We urge our customers to provide the necessary information for each country to help ensure their service isn't interrupted or disconnected.

To understand these regulations, it's helpful to keep in mind the objective: Regulators want to know who is using the phone number and where they are located. It is therefore understandable that the regulations focus on the end user, the party actually using the phone number in question to make or receive calls. It also makes sense that regulators want the end user's name, address, proof of address, and/or an identity document, and that all the documents must match. For example, the name on a utility bill submitted as proof of address must exactly match the name on the submitted passport. In some instances, a local address is required, as indicated by country.

### **Q: I've been told to "map" my phone numbers to addresses and identity documents. What does this mean, and how do I do it?**

A: Phone numbers with regulatory requirements need to have certain information or documents associated with them, which is what we call "mapping". It lets us know which phone numbers go with which addresses and identity documents. You can find instructions on how to map a phone number to an address and document [here](/docs/phone-numbers/regulatory/getting-started/console-create-new-bundle).

### **Q: Is there a limit on how old supporting documentation can be?**

A: Yes, we require the date of any business registration to be in line with country requirements. If there is a country requirement that a piece of documentation be valid within a certain timeframe, it will be listed on the country requirement page. If there is no country requirement, we prefer documentation used to confirm an address and is not a government ID — such as utility bills, rent receipts, etc. — to be dated within three months of submission. We prefer other documentation to be dated within one year of submission, so we have the most up-to-date information for your company on file. Please check your country registry to obtain the most up-to-date documentation available to you.

### **Q: Can I reuse documents I've uploaded in the Console for previous Regulatory Bundles or do I need to upload them again?**

A: Yes, you can utilize identity and supporting documentation that you've already uploaded to create a new Regulatory Bundle. While creating a Regulatory Bundle, look for the option to **Select existing individual/business information**. Eligible options will be presented in a table: choose the desired option and click **Select & Save**. The same is true for the supporting documentation. When adding supporting documentation, you can click the **Select existing supporting document** option, and choose the desired document from the table. Only documents that meet the regulatory requirements will be presented.

If your supporting documentation is older than one year, new documentation will need to be uploaded.

### **Q: Can I use a P.O. Box or Virtual Address as my proof of local address?**

A: No, we are not able to accept a document with a P.O. Box or Virtual Address as a proof of a local address.

### **Q: Can I delete Regulatory Bundles?**

A: You can delete Regulatory Bundles in **Draft** state. Deleting a draft Regulatory Bundle will unassign any Supporting Documents and End-Users you have assigned to the draft Regulatory Bundle, but these objects will not be deleted.

### **Q: Can I delete Supporting Documents?**

A: Yes, you can delete Supporting Documents in **Draft** and **Rejected** states. You will not be able to delete a Supporting Document that is assigned to a Regulatory Bundle. When deleting a Supporting Document, note that Twilio retains data associated with the Supporting Document for legal, anti-fraud, or security purposes in accordance with applicable law. For more information, please visit our [Terms of Service](/en-us/legal/privacy#what-customer-account-data-twilio-processes-when-you-sign-up-for-and-log-into-a-twilio-account-and-why) and [Privacy Policy](/en-us/legal/privacy#how-long-we-store-your-customer-account-data) sections.

### **Q: Can I delete End-Users?**

Yes, you can delete End-Users that are not assigned to Regulatory Bundles. When you delete an End-User, you should note that Twilio retains data associated with the End-User for legal, anti-fraud, or security purposes in accordance with applicable law. For more information, please visit our [Terms of Service](/en-us/legal/privacy#what-customer-account-data-twilio-processes-when-you-sign-up-for-and-log-into-a-twilio-account-and-why) and [Privacy Policy](/en-us/legal/privacy#how-long-we-store-your-customer-account-data) sections.

### **Q: How long does it take Twilio to verify documents that have been submitted?**

A: We do our best to verify documents submitted within 24 business hours.

### **Q: What is Twilio doing to make regulatory compliance easier for me?**

A: We are investing heavily in automated systems to make compliance easier. We have brought a number of these systems online already and you'll see many improvements in the coming months that will make the process easier and faster. These systems will include intelligently determining and presenting regulatory requirements for each number-set up front, a new user experience, and improved APIs to help guide you through the processes required.

### **Q: How is Twilio handling privacy?**

A: Twilio takes privacy very seriously. Twilio must collect the data requested and we have legitimate interests for doing so, including regulatory obligations and fraud and abuse prevention. Accordingly, the collection of this data is lawful under privacy law. Although we must collect the data, we remain conscious that the data being collected is sensitive and we must treat it accordingly. The data is subject to the requirements of our [Binding Corporate Rules - Controller Policy](https://www.twilio.com/en-us/legal/bcr/controller), which provides for application of a GDPR-level of data protection regardless of where the data originates globally. And pursuant to our internal data protection risk impact assessment, the data is subject to more stringent handling requirements commensurate to the sensitivity level. Among other things, these requirements include limiting access to the data to only those staff members who must see it to perform their job functions, conducting privacy and security training with these staff members prior to permitting them to handle the data, and ensuring all data is stored securely.

### **Q: Where can I find the regulations underpinning Twilio's requirements page?**

A: Our requirements are a synthesis of multiple sources and therefore generally cannot be found verbatim in the local regulations. The sources we use are primarily the text of the regulations, direct conversations with regulators, the judgment and interpretation of Twilio's legal counsel, industry best practices, the standards of telephone carriers, and our experience in handling requests by government and law enforcement agencies.

### **Q: I need to retain my phone number in a country but do not meet the requirements. What should I do?**

A: If you cannot meet the requirements for a specific phone number type in a given country, we recommend you look at a different number type for that country. Countries often have multiple phone number types (for example, national vs. local), and different phone number types are set up for different uses and have different requirements. It may be that you are using a current phone number type that isn't appropriate for your situation; for example, local numbers are often meant for people with physical addresses in a specific region of a country. However, there is often another number type in the same country that is well suited to your situation. If that approach doesn't work, then you may have to use a phone number in another country where you meet the requirements. Please email your account rep or contact Twilio Support through the [Console](https://console.twilio.com/) or [Help Center](https://help.twilio.com) for assistance, if you cannot find a solution.

### **Q: I need to retain my current phone numbers in a country where I don't meet the regulatory requirements for any of the phone number types. I've tried everything you've outlined and there is no acceptable alternative. What do I do? What is Twilio doing to help me?**

A: We recognize that this is an exceedingly difficult situation for our customers. We want to assure you that we'll allow you to use your current phone numbers for as long as we reasonably can. We will only disconnect your phone numbers if there is no other legal option available.

We are also committed to helping you find a solution in the following ways:

* We are actively working to enable new number types in some countries.
* As the opportunities arise, we will advocate for changes to these regulations. We fundamentally believe that every country should offer a phone number type accessible to any international business that provides valuable services to the citizens of that country. We are, however, realistic about timelines. We recognize that the passage of new regulations may take time, and as a result, this approach is likely a longer-term solution.
* We are working on possible solutions that would make it easier for customers to comply with current regulations. For example, there are sometimes relatively inexpensive ways for you to set up a legal entity and/or a presence in a country. We are investigating where we can provide lightweight solutions to meet the requirements.

### **Q: Can I automate the Regulatory Compliance workflow for my company or my customers?**

A: Yes, by utilizing the [v2 Regulatory Compliance APIs](/docs/phone-numbers/regulatory/getting-started/create-new-bundle-public-rest-apis), you can build your own web portal for your customers to self-service manage their Regulatory Compliance.

### **Q: Our legal/authorized representative does not wish to provide a copy of their ID, which is required for the phone number type I am trying to provision. What options do I have?**

A: Your options vary by country. The first thing you should do is reference Twilio's [Regulatory Guidelines](https://www.twilio.com/en-us/guidelines/regulatory) to determine whether an alternative exists. For example, in France, if you do not wish to provide a copy of the proof of identity of the authorized representative of your company, you can execute a Power of Attorney signed by the authorized representative, and submit the identity of the individual who is identified on the Power of Attorney.

If you review the Regulatory Guidelines and still have questions about identity documents, you can contact your account representative, or reach out to Twilio Support through the [Console](https://console.twilio.com/) or [Help Center](https://help.twilio.com/hc/en-us/) for additional information.

### **Q: Can I set up a trial account with trial phone numbers that require regulatory information/documents even though I cannot provide any regulatory documentation?**

A: No, you cannot. Regulators and carriers expect phone numbers to be compliant from the time they begin to be in use. However, you should be able to select a phone number type in a country where you can meet the necessary regulatory requirements. If you are unable to determine what type of number this may be, you should contact your account representative or reach out to Twilio Support through the [Console](https://console.twilio.com/) or [Help Center](https://help.twilio.com/hc/en-us/) for additional information.

## **Privacy and Safety FAQ**

### **Q: What does Twilio do with my or my customer's sensitive personal data like a passport?**

A: Twilio takes its responsibility to safeguard your sensitive personal data very seriously. Accordingly, Twilio applies technical controls such as encryption, access logging and least privileged access when processing this data. In addition to technical controls, our staff undergoes training on the proper handling of this data. Twilio is committed to applying the highest standards of protection for personal data and accordingly has implemented [Binding Corporate Rules](https://www.twilio.com/en-us/legal/binding-corporate-rules). In addition, Twilio is [ISO 27001](https://www.twilio.com/en-us/security#certifications) certified.

### **Q: What support is provided around enabling emergency services in different countries?**

A: We recognize that certain phone number use cases in certain countries will require emergency services support for the provisioned phone numbers. Please contact Twilio Support through the [Console](https://console.twilio.com/) or [Help Center](https://help.twilio.com/hc/en-us/) for help prior to purchase if you need more information.

## **Phone Number Use Case FAQ**

### **Q: How do I determine the right phone number type for my use case?**

A: You should start by identifying the country where you want to provision the phone number. Then, you should review that country's [Regulatory Compliance](https://www.twilio.com/en-us/guidelines/regulatory) requirements and determine what numbers you are eligible to provision, based on your location and the documentation you have available to you. You can also review the [SMS and Voice guidelines](https://www.twilio.com/en-us/guidelines), which have additional information about usage. Additionally, you can contact your assigned account representative, who may be able to further assist you. Finally, you can take a short [training](https://www.twiliotraining.com/store/585648-international-phone-number-regulations#description) we developed to learn more about international regulatory compliance.

### **Q: Is there anything about how phone numbers are used in the country I want to provision a number that I need to know?**

A: Yes. Every country treats phone numbers differently, and in some cases a country has restrictions around how certain number types can be used. You can view country-specific considerations [here](https://www.twilio.com/en-us/guidelines), but this list may not be comprehensive. We strongly encourage our customers to review proposed use cases with qualified legal counsel to make sure that they comply with applicable laws. The following are some general best practices for SMS messaging, but you should seek counsel regarding your specific use case:

1. Get opt-in consent from each end user before sending any communication to them, in particular for marketing or other non-essential communications.
2. Only communicate during an end user's daytime hours unless it is urgent.
3. SMS campaigns should support HELP/STOP messages, and similar messages, in the end user's local language.
4. Do not contact end users on do-not-call or do-not-disturb registries.

## **Prefix Locality Matching FAQ**

### **Q: Why do I have to assign an address that matches the phone number's prefix locality?**

A: In some countries, regulators require that local and/or national numbers be affiliated with an address associated within the locality of the phone number's prefix. This goes back to the early days of telephony, when phone numbers were assigned specifically to an individual's home or business, and would change if the home or business location moved. While this is not the way that phone numbers typically work these days, we nonetheless must respect each jurisdiction's right to protect their local number blocks, and comply with these regulations.

## **Phone Numbers Console Regulatory FAQ**

### **Q: How do I use the Compliance Report in Console to determine which numbers are out of compliance?**

A: The Phone Numbers Regulatory Compliance Report displays all your regulated phone numbers, the overall compliance status, and a quick link to individually map each phone number.

Find the Compliance Report section under Regulatory Compliance in the Twilio Console. To start, use the provided filter to find the country and phone number type of interest to you. When you have made the desired selection, please click the Search button. You will see a list of Phone Numbers with their current compliance status: *Compliant*, *Not Compliant*, and *Pending Review: Provisionally Approved*.

For each number in this list, you can review the current compliance status and when needed, ***Map to Regulatory Bundle and Address*** following the provided link under the verification column.

You can learn more in the [Console: Regulatory Compliance Report Getting Started](/docs/phone-numbers/regulatory/getting-started/console-regulatory-compliance-report).

## **Regulatory Compliance Communications FAQ**

### **Q: Why are you emailing me again about regulatory compliance?**

A: In most cases, for one of two reasons:

1. There are phone numbers in your account that do not have appropriate identity information mapped to them.
2. We have received notification from a regulator or carrier of new regulatory requirements, and need to collect additional information from you.

Currently, the bulk of our regulatory compliance emails relate to 1. These are not new requirements, indeed, we have been informing our customers of these requirements for more than a year. To avoid receiving these emails from us going forward, please verify that *all* numbers in [countries with regulatory requirements posted](https://www.twilio.com/en-us/guidelines/regulatory) have valid identity information mapped to them, and have been marked as "compliant". You can check the status of your numbers by accessing your [Compliance Report](https://www.twilio.com/console/phone-numbers/compliance-report).

In the event of new regulatory or carrier requirements (2), we strive to give you the tools necessary to comply. To that end, you should expect that all communications from us regarding changes to regulations will clearly state:

1. What phone numbers are at-risk.
2. What the change requires.
3. How to provide the necessary information.
4. A clear deadline to come to compliance.

In some instances, you may also receive outreach from our Customer Support team and/or your account representative in order to further assist you in bringing your numbers into compliance.

### **Q: I received an email regarding compliance. Can you let me know what phone number and what document(s) I am missing?**

A: Yes. We are here to help. To determine which of your numbers is out of compliance, you can check your [Compliance Report](https://www.twilio.com/console/phone-numbers/compliance-report). You can also reach out to your account representative for additional assistance, or contact Twilio Support through the [Console](https://console.twilio.com/) or [Help Center](https://help.twilio.com/hc/en-us/) if you continue to have trouble.

## **V2 RC Platform FAQ**

### **Q: What do the v2 RC APIs provide in functionality?**

A: The v2 RC APIs provide the following new functionality:

* Request Regulations requirements via API for a given country, phone number type, and end-user type.
* Manage a library of uploaded End-User information, Supporting Documents, and Regulatory Bundles.
* Granular error handling of Regulations.
* Final API contract for Regulatory Compliance management (contract will not change moving forward).

### **Q: When will the new v2 RC APIs be available?**

A: The new v2 RC APIs are currently available for public use. For more information visit this [Table of Contents for API docs](/docs/phone-numbers/regulatory/api).

Q: What are the different RC objects?

A:

***Regulation:*** Bundle Requirements are the specific prerequisites to create a Bundle. These can be different depending on the context. For Regulatory Bundles, the **Requirement** is the Regulation, designated by the Regulation SID.

***Regulatory Bundle:*** A Regulatory Bundle is a container that groups the assignment of End-User, Use-Case Restrictions, Addresses, and Supporting Documents. The collection of these Item Assignments are used to pass a Regulatory Compliance regulation for number

***End-User:*** A collection of metadata representing the entity who will be communicating using one of our products.

***Supporting Document:*** A collection of metadata representing a document to support an End-User's information, address, or use-case.

***Address:*** A locality-based object that represents the location of an End-User.

### **Q: What are the different statuses?**

A:

#### **Regulatory Bundle**

* `Draft`
* `Pending Review`
* `In Review`
* `Twilio Approved`
* `Twilio Rejected`

#### **Supporting Document**

* `Draft`
* `Pending Review`
* `Approved`
* `Expired`
* `Rejected`

### **Q: What is the workflow for a Regulatory Bundle?**

A: You can view the workflow below or in the [v2 RC APIs Getting Started page](/docs/phone-numbers/regulatory/getting-started/create-new-bundle-public-rest-apis).

![Workflow showing stages from draft to third party accepted or rejected.](https://docs-resources.prod.twilio.com/c642d80494d4498def49e0069b511b7f19cb9b4538f61af663d23c9b4ff7953f.png)

### **Q: How does this impact me if I don't use the API but instead use Console?**

A: The Twilio Console experience also changed in December 2019 to help you get your numbers to compliance much easier. You will begin this process in the Phone Numbers > Regulatory Compliance section, where you will Create a Regulatory Bundle. Here you will define the country and phone number type you are getting ready to provision, and then follow each step in the creation process providing the required information and documentation. Before completing the Bundle creation process, each ISO country and number type requires different information and/or documents based on specific country regulations.

Once your Bundle has been created and verified, you can now provision phone numbers for the specific country and number type you created the Bundle for. Head to the Buy a Number section and follow the on-screen steps to map the new phone number to your Bundle.

### **Q: What is a Bundle SID?**

A: A BundleSID is an object that acts as a container to store metadata and to reference other objects that comply with a regulation. When a Bundle has been evaluated against a regulation and passed, the BundleSID can then be assigned to a phone number.

### **Q: What is the difference between Bundle SIDs and Identity SIDs?**

A: IdentitySIDs are from v1.0 and v1.5 Regulatory Compliance. Identity objects are simplistic to the old Regulatory Compliance platform and do not have the robust information architecture as the current v2.0 Regulatory Compliance platform. Any migrated IdentitySIDs have a reference to the newBundle SID and both are accepted during provisioning.

### **Q: Do I need a Bundle SID for each phone number type in every country where I have phone numbers? In some countries the requirements are the same for each bundle type, so do I need a Bundle SID for each phone number type or can I use the same Bundle SID?**

A: Yes, a Regulatory Bundle is required for every single regulation. To decrease the complexity, Supporting Documents and End-Users can be re-used for multiple Bundles.

### **Q: Can I assign passed Regulatory Bundles to phone numbers in bulk?**

A: No, you can not currently assign phone numbers in bulk to Regulatory Bundles. For high number assignment, it's best to use the `/IncomingPhoneNumbers` API.

### **Q: Can I assign Supporting Documents across accounts?**

A: No, Supporting Documents are account specific and cannot be shared across multiple accounts.

### **Q: Can I assign End-Users across multiple accounts?**

A: No, End-Users cannot be shared across multiple accounts.

### **Q: My Regulatory Bundle has been in "pending review" longer than 72 hours, what can I do?**

A: We strive to review all regulatory bundles within a 72-hour timeframe. In the event that your regulatory bundle is not reviewed within 72-hours, please contact Twilio Support through the [Console](https://console.twilio.com/) or [Help Center](https://help.twilio.com/hc/en-us/) and one of our support agents will assist you in getting your bundle reviewed.

## **Update Compliance Information FAQ**

### **Q: Why do my Regulatory Bundles have a valid\_until date despite being approved?**

Twilio is required to enforce every countries' communication compliance requirements to ensure the trust of Twilio's network inhibits any traffic to/from Twilio's network. In cases where you may need to update your compliance information due to newly enacted laws/carrier mandates, Twilio will need to update the [Regulations](/docs/phone-numbers/regulatory/api/regulations) resource to reflect the new expression of regulatory requirements.

### **Q: How will I know when there is a Regulation update?**

There are **three** ways Twilio will communicate with customers when a Regulation update has occurred. Only the email alias

1. Opt to manually poll the [Regulations Public API](/docs/phone-numbers/regulatory/api/regulations) and report any differences
2. Opt-in to a service that informs you when Twilio's Regulatory Compliance Changelog page updates (e.g., [Wachete](https://www.wachete.com/))
3. Opt-in to receive a request to webhook that is assigned to a [Regulatory Bundle](/docs/phone-numbers/regulatory/api/bundles) with a Regulation update that has been recently updated

Receive an email from the assigned alias of the [Regulatory Bundle](/docs/phone-numbers/regulatory/api/bundles)(s) with a Regulation update that has been recently updated

### **Q: How do I know a Regulatory Bundle needs to be updated?**

A new *valid\_until* field as of [March 10th, 2021](https://www.twilio.com/en-us/changelog/update-regulatory-bundles-when-action-is-required-using-console-or-public-api), displays the date when an *approved* Regulatory Bundle may still be used for new Phone Number provisioning. Once the *valid\_until* date expires, the Regulatory Bundle will move from *approved* to *rejected*. The Public API can filter the Regulatory Bundles List API by sending REQUEST while Console has a helpful filter located at the top of the page.

**Q: How do I update my compliance information?**

There are two getting started tutorials you can reference that will help you get started with both the [Public API](/docs/phone-numbers/regulatory/getting-started/api-getting-started-compliance-information-update) and the [Console](/docs/phone-numbers/regulatory/getting-started/console-getting-started-compliance-information-update) to update your compliance information of your Regulatory Bundles.

### **Q: When do I have to update my compliance information?**

Regulatory Bundle updates must be completed by the *`valid\_until`* date specified both in the status details column of the list page and the expiration date of the instance page.

### **Q: What happens if I don't update my compliance information?**

If you do not update your affected compliance information and the valid until date expires, the status of the Regulatory Bundle containing the out-of-date compliance information will move to a *rejected* state. Phone Numbers assigned to non-compliant information will be at risk of regulatory reclamation according to [Twilio's Phone Numbers Terms of Conditions](https://www.twilio.com/en-us/legal/service-country-specific-terms/phone-numbers).

### **Q: Can I still provision new Phone Numbers while my Regulatory Bundle has an *`valid_until`* date set?**

Yes, until the *`valid_until`* date expires, the Regulatory Bundle will be eligible for continued Phone Number provisioning.

### **Q: Which Regulatory Bundle statuses will be eligible for provisioning while I update my compliance information?**

Only Bundles that were previously approved are eligible to provision new Phone Numbers while updating compliance information. Any Regulatory Bundles that are in other statuses will be moved to the *`twilio-rejected`* status.

### **Q: How long will the `valid\_until` date be set?**

The *`valid\_until`* date is up to the discretion of the country's/carrier regulator or Twilio. There is no one standardized time as each Regulation update has its own nuance. Always reference the Bundle instance's *`valid\_until`* date parameter when prioritizing updates.

### **Q: How will I know what I need to do?**

After filtering the Console list page for all of the Regulatory bundles that require an update, click on a record to redirect to the instance page. Once within the Regulatory Bundle Instance page, an Evaluation displays what is missing/wrong from the current set of compliance information. Look for all the information missing notifications.

### **Q: What is the difference between Console and Public API?**

If a user initiates the update through Twilio's Console, Twilio will go through the steps of copying and lifecycle transition on behalf of the customer. If the user is a developer leveraging the Public APIs, it is the responsibility of the developer to create a Regulatory Bundle Copy, Transfer Item Assignments, and then `DELETE` the Regulatory Bundle Copy. For more information, please refer to the [Public API Update Compliance Information Getting Started](/docs/phone-numbers/regulatory/getting-started/api-getting-started-compliance-information-update).

## **IncomingPhoneNumbers API FAQ**

### **Q: Why have there been multiple changes to the IncomingPhoneNumbers provisioning API?**

A: The IncomingPhoneNumbers provisioning API was changed in September 2019 to make the Address parameter mandatory. Additionally, the API will be changed in February to require BundleSID. These changes are due to the increasing importance of regulatory compliance for phone numbers across the world. Many countries have recently been increasing their scrutiny of how their phone numbers are used. This increased scrutiny is driven by various factors, including increased incidents of misuse and abuse of phone numbers, heightened national security concerns, and increased pressure on the supply of numbers. As a result, various countries are updating their regulations or placing greater emphasis on the enforcement of existing regulations, including those requiring validation of who is actually using the phone number and exactly where that individual or business is located. Essentially the purpose of these regulations is to verify who is using the number and where they are. Twilio, our customers, end-users, and providers each have a role and a collective obligation to ensure numbers are assigned and used in a manner consistent with the intent of the regulations in the relevant country.

We decided to make these changes with our customers' best interests at heart as we monitor the regulatory compliance landscape. Twilio, our customers, end-users, and providers each have a role and a collective obligation to ensure numbers are assigned and used in a manner consistent with the intent of the regulations in the relevant country. Our goal is to avoid any of our customers being in jeopardy of losing a phone number due to noncompliance with phone number regulations. We understand that this change may be inconvenient and frustrating. Our goal is to protect your phone numbers within days of provisioning them by collecting the necessary information upfront through the API instead of asking our customers to react in a short time frame when a number is out of compliance.

### **Q: Will there be any more changes to the IncomingPhoneNumbers provisioning API?**

A: Yes, there are more changes that will be coming. One change will be every phone number that currently only requires a name and address will also require a Bundle with an Address assigned to a Supporting Document.
