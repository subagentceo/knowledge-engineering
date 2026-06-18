# Regulatory Compliance REST APIs

> \[!NOTE]
>
> The Compliance Embeddable is a new offering that allows independent software vendors (ISVs) to onboard their end customers without integrating with the Regulatory Compliance API. By integrating the Compliance Embeddable into your website as an iframe component, you can enable self-service Regulatory Compliance Bundle submission. [Learn more about the Compliance Embeddable and sign up for the pilot.](https://docs.google.com/document/d/e/2PACX-1vTIMOIAzZ4iPatouQzlIWZQtuiKKF9sX6jfzXzvet1WzIYCKK1xiMucpihzYgqBb-Qg4rZ8tpKUiURm/pub)

## Resources

The following resources are available with the v2 Regulatory Compliance platform.

### Bundles Resource

[Bundles Resource API Doc](/docs/phone-numbers/regulatory/api/bundles)

The Twilio Bundles REST API allows you to create empty Regulatory Bundle containers. The Regulatory Bundles are [Item Assignments](/docs/phone-numbers/regulatory/api/item-assignments) of [End-Users](/docs/phone-numbers/regulatory/api/end-users) and [Supporting Documents](/docs/phone-numbers/regulatory/api/supporting-documents) for regulatory compliance.

Depending on the configuration of the bundle, the bundle is being assessed against a [Regulation](/docs/phone-numbers/regulatory/api/regulations) (e.g., Germany local phone numbers for a business). Different [Regulations](/docs/phone-numbers/regulatory/api/regulations) need [Item Assignments](/docs/phone-numbers/regulatory/api/item-assignments) combinations of [End-User Types](/docs/phone-numbers/regulatory/api/end-user-types) and [Supporting Document Types](/docs/phone-numbers/regulatory/api/supporting-document-types).

### Bundle Copies Resource

[Bundle Copies API Doc](/docs/phone-numbers/regulatory/api/copies-resource)

When [Regulations](/docs/phone-numbers/regulatory/api/regulations) are updated, customers and end-users are directed to begin updating their compliance information. To begin updating Bundles that are marked as information update required, the first step is to create a Bundle Copy to begin updating the relevant information. Once the new information has been approved, the next step is to [replace the original Bundle Items](/docs/phone-numbers/regulatory/api/replace-items-resource). For more detailed information, please refer to the [compliance information update API getting started guide](/docs/phone-numbers/regulatory/getting-started/api-getting-started-compliance-information-update).

### Bundle Clones Resource

[Bundle Clones API Doc](/docs/phone-numbers/regulatory/api/clones-resource)

### Bundle Replace Items Resource

[Bundle Replace Items API Doc](/docs/phone-numbers/regulatory/api/replace-items-resource)

When [Regulations](/docs/phone-numbers/regulatory/api/regulations) are updated, customers and end-users are directed to begin updating their compliance information. After creating a Bundle Copy and submitting the updated Bundles that are marked as information update required and the Bundle Copy being approved, Once the new information has been approved, the next step is to replace the original Bundle Items. For more detailed information, please refer to the [compliance information update API getting started guide](/docs/phone-numbers/regulatory/getting-started/api-getting-started-compliance-information-update)

### End-Users Resource

[End-Users Resource API Doc](/docs/phone-numbers/regulatory/api/end-users)

The Twilio End-User REST API allows you to create End-Users to follow [Regulations](/docs/phone-numbers/regulatory/api/regulations). The End-User is the entity that answers the phone call or receives the message of a phone number. An entity can be either an `individual` or a `business`. You can find more information about the possible End-Users by referencing [End-User Type resource](/docs/phone-numbers/regulatory/api/end-user-types).

You will [Assign Items](/docs/phone-numbers/regulatory/api/item-assignments) to an End-User of a [Regulatory Bundle](/docs/phone-numbers/regulatory/api/bundles) with [Supporting Documents](/docs/phone-numbers/regulatory/api/supporting-documents). For applications that manage many End-Users, you will need to ensure that you assign the End-User instance to the correct Bundle instance to be in compliance with regulations.

### End-Users Type Resource

[End-User Types Resource API Doc](/docs/phone-numbers/regulatory/api/end-user-types)

The Twilio End-User Type resource of Twilio's Regulatory Compliance API informs you which type of end-user you can create and what the values are. Once you know which end-user type you want to create and the required values, you will create using the [End-User resource](/docs/phone-numbers/regulatory/api/end-users). Each End-User Type has a different set of values required to be compliant.

You will [Assign Items](/docs/phone-numbers/regulatory/api/item-assignments) to an End-User of a [Regulatory Bundle](/docs/phone-numbers/regulatory/api/bundles) with [Supporting Documents](/docs/phone-numbers/regulatory/api/supporting-documents). For applications that manage many End-Users, you will need to ensure that you assign the End-User instance to the correct Bundle instance to be in compliance with regulations.

### Supporting Documents Resource

[Supporting Documents Resource API Doc](/docs/phone-numbers/regulatory/api/supporting-documents)

The Supporting Documents resource of Twilio's Regulatory Compliance APIs allows you to create new Supporting Documents with metadata to fulfill [Regulations](/docs/phone-numbers/regulatory/api/regulations). Each [Supporting Document Type](/docs/phone-numbers/regulatory/api/supporting-document-types) may need different information to be compliant, so be sure to pass all of the correct values when creating a new Supporting Document Type.

A collection of Supporting Documents [Assigned as Items](/docs/phone-numbers/regulatory/api/item-assignments) to a [Regulatory Bundle](/docs/phone-numbers/regulatory/api/bundles) along with an [End-User](/docs/phone-numbers/regulatory/api/end-users) satisfies a [Regulation](https://www.twilio.com/en-us/guidelines/regulatory).

### Supporting Document Types Resource

[Supporting Document Types Resource API Doc](/docs/phone-numbers/regulatory/api/supporting-document-types)

The Supporting Document Type resource of Twilio's Regulatory Compliance API informs you which type of document you create and what the values are. You will then create a new [Supporting Document](/docs/phone-numbers/regulatory/api/supporting-documents) with the correct type and values.

Each [Supporting Document Type](/docs/phone-numbers/regulatory/api/supporting-document-types) may need different information to be compliant. Supporting Documents [Assigned as Items](/docs/phone-numbers/regulatory/api/item-assignments) to a [Regulatory Bundle](/docs/phone-numbers/regulatory/api/bundles) along with an [End-User](/docs/phone-numbers/regulatory/api/end-users) satisfy a [Regulation](https://www.twilio.com/en-us/guidelines/regulatory).

### Item Assignments Resource

[Item Assignments Resource API Doc](/docs/phone-numbers/regulatory/api/item-assignments)

The Twilio Item Assignments REST API allows you to assign [End-Users](/docs/phone-numbers/regulatory/api/end-users) and [Supporting Documents](/docs/phone-numbers/regulatory/api/supporting-documents) to [Regulatory Bundles](/docs/phone-numbers/regulatory/api/bundles).

The configuration of the Regulatory Bundle must pass a [Regulation](/docs/phone-numbers/regulatory/api/regulations) (e.g., *Germany* *local* phone numbers for a *business*). Different [Regulations](/docs/phone-numbers/regulatory/api/regulations) need [Item Assignments](/docs/phone-numbers/regulatory/api/item-assignments) combinations of [End-User Types](/docs/phone-numbers/regulatory/api/end-user-types) and [Supporting Document Types](/docs/phone-numbers/regulatory/api/supporting-document-types).

With the correct items assigned to the [Regulatory Bundle](/docs/phone-numbers/regulatory/api/bundles), you can *submit* the bundle by changing its status. After submission, the Twilio regulatory reviewers will review the Regulatory Bundle.

### Regulations Resource

[Regulations Resource API Doc](/docs/phone-numbers/regulatory/api/regulations)

The Twilio Regulatory Compliance REST API allows you to view and understand Regulations. Regulations are requirements based on [End-Users](/docs/phone-numbers/regulatory/api/end-users) and [Supporting Documents](/docs/phone-numbers/regulatory/api/supporting-documents) set for by each country's government. A Regulation dictates the [Regulatory Bundles](/docs/phone-numbers/regulatory/api/bundles) composition of [Item Assignments](/docs/phone-numbers/regulatory/api/item-assignments).

***Note:*** Regulations can and do change. Please make sure not to hardcode any regulation within your application. The Regulation resource is for you to call and populate the values required for regulatory compliance.

### Evaluations

[Evaluations Resource API Doc](/docs/phone-numbers/regulatory/api/evaluations)

The Evaluations Resource allows developers to understand *what* failed and *why* when a Regulatory Bundle is submitted to be evaluated against a [Regulation](/docs/phone-numbers/regulatory/api/regulations). The synchronous request will provide error codes and instant feedback to fix the Regulatory Bundle.
