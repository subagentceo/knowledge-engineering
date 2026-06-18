# SMS Implementation & Compliance Checklists: 10DLC, Short Codes, and International Sender IDs - Iterable

## SMS Implementation & Compliance Checklists: 10DLC, Short Codes, and International Sender IDs

**Published by**

February 19, 2026

![](https://iterable.com/wp-content/uploads/2026/04/Light-14.png)

Launching SMS isn’t just about sending your first message. It requires registration, compliant opt-in flows, legal documentation, keyword configuration, and carrier approval — all before you go live.

As carriers increase scrutiny and regulations evolve, brands must approach SMS implementation with precision. A missed disclosure, an unchecked compliance box, or an incomplete keyword flow can delay approval or impact deliverability.

To simplify the process, we’ve created three comprehensive SMS implementation checklists covering:

*   U.S. 10-Digit Long Codes (10DLC)
*   U.S. & Canada Short Codes
*   International Alphanumeric Sender IDs

Each checklist walks through registration, compliance requirements, website readiness, and platform setup — so you can launch with confidence.

Below, we break down when to use each and what you need to know.

### U.S. 10-Digit Long Codes (10DLC) Checklist

A 10-Digit Long Code (10DLC) is a standard 10-digit phone number enabled for Application-to-Person (A2P) messaging in the United States. It is the most common path for brands implementing SMS in the U.S. because it supports two-way messaging and is designed for scalable, compliant business use.

10DLC requires brand and campaign registration to improve deliverability and ensure compliance with U.S. carrier regulations. While more streamlined than a Short Code application, these steps must be completed before sending SMS in the United States.

This checklist guides you through the setup of 10-Digit Long Codes (10DLC) for Application-to-Person (A2P) messaging in the United States:

#### 

#### Phase 1: A2P 10DLC Registration

**Brand Registration**

*   Provide your legal business name, address, EIN, and contact information. This information is used to verify your business identity.
*   Your ESP should collect the required documentation and submit it to the carrier or registration body on your behalf

**Campaign Use Case Registration**

*   Select the campaign use case that best matches your messaging intent (e.g., Marketing, Account Notifications, Customer Care, 2FA).
*   Provide a clear campaign description.
*   Submit at least two representative sample messages.
*   Describe your opt-in process exactly as it appears on your live website or application.

#### Phase 2: Website & Opt-In Compliance

Your public-facing opt-in method must be compliant before approval is granted. At the point of opt-in, you must include:

*   Program identification (consent is 1:1 and brand-specific)
*   Program description
*   Message frequency disclosure
*   The exact phrase: “Message and Data Rates May Apply”
*   Customer care contact information
*   Opt-out instructions (e.g., “Reply STOP to cancel”)
*   Links to SMS Terms of Service and Privacy Policy
*   Standalone SMS opt-in (separate from email or other channels)
*   Separate checkboxes for marketing and transactional use cases (make sure they are unchecked by default)
*   Explicit optional consent (not required for purchase)
*   All disclosures visible on the same page

Your SMS opt-in pop-up must also follow WCAG 2.1 Level AA accessibility standards, including keyboard navigation, screen reader compatibility, clear labels, and Esc key dismissal.

#### Phase 3: Platform Setup & Best Practices

**Iterable Project Configuration**

*   Create a dedicated Sender (Your ESP may handle setup).
*   Create a dedicated Message Channel for the 10DLC number.

**General Best Practices**

*   Clearly identify your brand in all messages.
*   Do not mix approved use cases.
*   Implement age-gating for 21+ programs.
*   For abandoned cart reminders in the U.S., use double opt-in and limit to one message per shopping event.

**For more resources on U.S. long codes, check out:**

The Campaign Registry (TCR): The official body that governs 10DLC registration. Their site provides information on best practices for brand and campaign registration.

Twilio – A2P 10DLC Onboarding Guide: An excellent, detailed guide from a major provider that walks through the entire registration and compliance process for 10DLC

### U.S. & Canada Short Codes Checklist

A Short Code is a 5–6 digit number designed for high-volume, business-critical SMS programs. Short Codes offer high throughput and strong brand recognition but require strict carrier review and approval in both the United States and Canada.

Short Codes are subject to strict carrier review and approval and are intended for high-volume or business-critical messaging programs. Completing each of the following phases is required to ensure compliance, protect deliverability, and avoid delays or rejections.

This checklist guides you through the end-to-end setup of Short Codes for A2P messaging in the United States and Canada:

#### 

#### Phase 1: Pre-Application Readiness (Website & Legal)

**Website & Call-to-Action (CTA)**

Your opt-in mechanism must be clear and compliant and must include:

*   Program identification (consent is brand-specific)
*   Program description
*   Message frequency
*   Fee disclosure (exact phrase): “Message and Data Rates May Apply.”
*   Customer care contact (phone number or email)
*   Opt-out instructions (e.g., “Reply STOP to cancel”)
*   Prominent links to SMS Terms and Privacy Policy
*   Standalone SMS consent (separate from email or other channels)
*   Separate checkboxes for marketing vs. transactional use cases
*   Optional consent (not required for purchase)
*   Unchecked checkbox by default
*   All disclosures on one page

Your SMS opt-in pop-up must also follow WCAG 2.1 Level AA accessibility standards, including keyboard navigation, screen reader compatibility, clear labels, and Esc key dismissal.

**SMS Terms of Service Must Include:**

*   Program name and description
*   Frequency disclosure
*   Fee disclosure:  “Message and Data Rates May Apply.” 
*   HELP instructions and customer care contact
*   STOP instructions
*   Disclosure: “Carriers are not liable for delayed or undelivered messages.” 
*   No user liability for number changes
*   Terms specific to the Short Code program (not bundled with email, etc.)

**Privacy Policy Must Include:**

*   No sharing/selling of PII for third-party marketing
*   Explicit exclusion of SMS opt-in data from being shared. For example:

_“All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties, excluding aggregators and providers of the Text Message services.”_

#### Phase 2: Mandatory Message Flows & Keyword Responses

**Opt-In Confirmation Message**

Sent immediately after subscription and must include:

*   Program name
*   Message frequency
*   Fee disclosure: “Message and data rates may apply.”
*   Instructions on how to get help (e.g., “Reply HELP for help”)
*   Instructions on how to opt out (e.g., “Reply STOP to cancel”)

Keep opt-in messages under 160 characters to avoid multi-part SMS.

**HELP Keyword Response**

Your Short Code must respond to the HELP keyword at all times and include:

*   Program name
*   Customer support contact (toll-free number or email)
*   Instructions on how to opt out (e.g., “Reply STOP to cancel”)
*   Fee disclosure: “Message and data rates may apply.”

**STOP Keyword Response**

Your Short Code must respond to the STOP keyword at all times and include:

*   Program name
*   Confirmation of unsubscription
*   Confirmation that no further messages will be sent.

For example: [Program Name]: _You are unsubscribed. No more messages will be sent. Reply HELP for help._

#### Phase 3: Special Use Cases & Country-Specific Rules

**Use Case Compliance**

*   21+ content requires a double opt-in age gate.
*   Abandoned cart reminders must be disclosed at opt-in, limited to one message per event, and require double opt-in in the U.S.
*   Multiple message types (e.g., marketing alerts and shipping notifications) require separate opt-ins.
*   No SHAFT content (Sex, Hate, Alcohol, Firearms, Tobacco), with limited alcohol exceptions under proper age-gating.

**Canada-Specific Requirements**

*   Double opt-in required for non-mobile sign-ups.
*   French keyword support required:
    *   STOP → ARRET
    *   HELP → AIDE
*   Complete Canadian Wireless Telecommunications Association (CWTA) registration
*   CTAs must not use urgency tools such as countdown clocks.

#### Phase 4: Application & Iterable Platform Setup

*   Confirm all live assets are compliant.
*   Provide a migration letter if transferring a Short Code.
*   Create Sender Profile (or have your ESP set it up for you)
*   Configure a dedicated Message Channel.
*   Build double opt-in workflow.
*   Test all keyword responses before live sends.

### International Alphanumeric Sender ID Checklist

An Alphanumeric Sender ID allows you to send SMS using your brand name instead of a phone number in supported international markets. This is commonly used for transactional or marketing messages outside the U.S. and Canada.

Critical Notes:

*   Alphanumeric Sender IDs support only one-way messaging.
*   Recipients cannot reply.
*   Not supported for A2P messaging in the U.S. or Canada.

This checklist guides you through the setup and compliant use of Alphanumeric Sender IDs for international messaging:

#### 

#### Phase 1: Country-Specific Rules & Registration

Before implementation:

*   Confirm support in target countries.
*   Ensure consent is collected in accordance with regional requirements (written, expressed consent recommended).
*   Review country-specific restrictions on industries or content.
*   Complete pre-registration if required (check with your ESP for necessary documentation).

#### Phase 2: Compliance for One-Way Messaging

Because recipients cannot reply STOP or HELP, every message must:

*   Include a clear and accessible opt-out method.
*   Include brand identification.
*   Provide free opt-out options such as:
    *   Subscription management link
    *   Support email
    *   Dedicated opt-out URL

Do not include keyword instructions such as “Reply STOP to cancel” or “Text HELP for help.”

#### Phase 3: Iterable Platform Setup

*   Create Sender Profile.
*   Create a dedicated Message Channel to isolate international sends.
*   Update all SMS templates with compliant opt-out language.
*   Best practice: Create a reusable Snippet in Iterable for compliant footer management.

**For more resources on international messaging, check out:**

Twilio – International SMS Guidelines (Country by Country): This is an essential resource for checking the specific rules, restrictions, and registration requirements for Alphanumeric Sender IDs in each country.

Twilio – Using Alphanumeric Sender ID: A general overview of how Alphanumeric Sender IDs work and their common use cases. 

### Mobile Compliance Is the First Step — Not the Final One

Whether you’re implementing 10DLC in the United States, applying for a Short Code in North America, or expanding internationally with Alphanumeric Sender IDs, successful SMS programs start with structure and compliance.

Registration, opt-in transparency, required disclosures, keyword workflows, and proper platform configuration aren’t optional — they’re foundational to protecting deliverability and launching with confidence.

_Once your SMS foundation is in place, the next step is building a mobile strategy that drives real engagement. Learn how to build a personalized, cross-channel mobile experience with our guide,_ **_How to Build a Mobile Marketing Strategy with SMS and WhatsApp_****_._**