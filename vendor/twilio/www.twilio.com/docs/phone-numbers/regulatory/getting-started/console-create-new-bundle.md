# Console: Getting Started with Phone Number Regulatory Compliance

Use the [Twilio Console](https://twilio.com/console) to provision phone numbers legally. This ensures that:

* Your phone numbers aren't at risk of getting revoked.
* You can operate your business' communications locally.

For answers to common questions, see [Phone Number Regulatory FAQ](/docs/phone-numbers/regulatory/faq).

## Quickstart

Follow these steps to get started with Phone Number Regulatory Compliance:

1. Review the Phone Numbers Regulatory Compliance Guidelines for your region.
2. Collect the required documentation from end-users.
3. Log in to the Twilio Console.
4. In the Console navigation, select **Phone Numbers** > **Regulatory Compliance**.
5. Create a Regulatory Bundle and submit it for review.
6. Wait for Twilio to review the Regulatory Bundle.
7. After Twilio approves the Regulatory Bundle, assign it to the relevant phone numbers.
8. Wait for Twilio to review the Regulatory Bundle assigned to phone number(s) — the review process will take up to 3 business days.

### Step 1: Go to the Phone Numbers Regulatory Compliance Guidelines

First, go to the [Phone Number Regulatory Requirements for Customers](https://www.twilio.com/en-us/guidelines/regulatory) to see what local regulators require.

Let's say we own a chain of pizza shops. We need to make sure all of our German Local phone numbers are compliant. We're going to select Germany from the dropdown.

![Dropdown showing Germany under Regulatory Requirements by Country.](https://docs-resources.prod.twilio.com/bd6736614c1f3ce962f71dd4b3eade54355c787dd0e816955244677e88f26917.png)

After selecting Germany from the dropdown and finding Local Business phone numbers for a business, we can find the regulation we need to follow. The regulation has a list of required information with accompanied Supporting Documents and a proof requirement.

![Table showing business requirements: name and address with proof of identity and local address documentation.](https://docs-resources.prod.twilio.com/b9cd0f9709e0707e91de90944338d12d04ebaaee7a95314662fc0cf18c0da7ff.png)

### Step 2: Collect documentation from the end users

Next, you'll need to collect the required information with accompanying Supporting Documents from the end-user.

**Note**: There is a limit to how old the supporting documents can be. See our FAQ for more information: [Is there a limit on how old supporting documentation can be?](/docs/phone-numbers/regulatory/faq#q-is-there-a-limit-on-how-old-supporting-documentation-can-be)

End-users are the people who will answer the phone call or receive the message.

In this scenario, we are the End-Users who will provision German Local phone numbers for our business purposes. No one but us will answer the phone.

We'll collect an excerpt from the commercial register (called a Handelsregisterauszug in Germany) showing the local address.

![List of information and documentation required.](https://docs-resources.prod.twilio.com/eb4f94a9b30efc2988ac963e77a39859c74d844ce8a11eaf09d3b955e2c3c6ee.png)

### Step 3: Log into the Twilio Console

[Log in to your account](https://www.twilio.com/console)

### Step 4: Go to Phone Numbers > Regulatory Compliance

In the left-hand navigation panel of the Console, click to expand the **Phone Numbers** option. Then click on **Regulatory Compliance**.

![Navigation menu with Phone Numbers section expanded to Regulatory Compliance.](https://docs-resources.prod.twilio.com/981842d2c111ef283433a2efef5dce3cb5256811ee724f496e9eb80a9751ff3f.jpg)

Next, click on **Bundles** to access your existing Regulatory Bundles or to create a new Bundle:

![Twilio Console page for creating a new regulatory bundle with instructions and filter options.](https://docs-resources.prod.twilio.com/0ddcb49f1ee81bda6058d8fc4c83503931064afabca552956d11bcb94d8abc86.jpg)

For a one-click shortcut to the Bundles section of the Console, click on this link: [https://www.twilio.com/console/phone-numbers/regulatory-compliance/bundles](https://www.twilio.com/console/phone-numbers/regulatory-compliance/bundles)

### Step 5: Create a Regulatory Bundle and submit it for review

On the Bundles page, click on the **Create a Regulatory Bundle** button.

In this scenario, we want to make sure all of our German Local phone numbers for our example pizza chain business are compliant. We'll select **Germany** as the *Phone Number's Country* and **Local** as the *Type of Phone Number*.

![Select Germany and local type for phone number compliance.](https://docs-resources.prod.twilio.com/54b06489840390055e5d316cdc503b06a5d45af45cf55100fd1ee9638642e470.jpg)

Select **Business** as the end user.

![Select Business as the end user for Germany local phone numbers.](https://docs-resources.prod.twilio.com/5ea51129530a6b031aecd9d7a6f720acef20844518efa6570a1ea39186c9c44c.jpg)

Once you click the **Next** button at the end of the second section, Twilio saves a *Draft* of your Regulatory Bundle. Go through each step within the form. When you're ready, click on the button that says **Submit for review**.

#### Deleting Regulatory Bundle drafts

Regulatory Bundles in **Draft** status can be deleted from your account. To delete a Bundle draft, click the *Delete Regulatory Bundle* button at the bottom of the Bundle instance page. You will need to confirm that you're sure you want to delete this Bundle draft.

Deleting a Regulatory Bundle will unassign any End-Users and Supporting Documents associated with the Bundle. However, these objects will not be deleted. Once you click the **Delete** button, the Regulatory Bundle will be deleted immediately. You will not be able to undo this action.

### Step 6: Wait for Twilio to review the Regulatory Bundle

When you submit your Regulatory Bundle, Twilio validates that all information conforms to local regulatory guidelines.

**Note**: The review process generally takes up to three business days, but in some regions it might take several weeks.

### Step 7: Assign the Regulatory Bundle to phone numbers after approval

Twilio will email you when the status of the Regulatory Bundle has changed to **Approved**.

Within the Twilio Console, go to the **Regulatory Information** tab of the Phone Number that you want to make compliant. Select the Bundle or Address you would like to assign to the phone number.

Only approved Bundles that match the phone number type appear in the drop-down list. You can't map a Bundle in **Rejected** or **Pending Review** status to a phone number.

In this example, we'll assign the Regulatory Bundle that fulfills regulatory requirements for German Local phone number for Business purposes to a German Local phone number.

![Phone number +441483663945 mapped to Pizza Shop #8, status compliant with local regulations.](https://docs-resources.prod.twilio.com/b20d69bbbc7f5cdb7418aa05f6cb2d7699c73d1546ec4d3abafbc87b348827ef.png)

#### Examples of Regulatory Bundle and phone number mappings

In the following example, we assign the Regulatory Bundle that fulfills the regulatory requirements for an Australia Mobile phone number for Individual purposes to an Australian Mobile phone number.

![Regulatory bundle mapping for phone number +61412340755 with compliant status.](https://docs-resources.prod.twilio.com/a8b35f96f1f79072fff75b5e70cc31c366b1d1984afa07c43ac6f18be26768cb.png)

![Interface for mapping phone number +61412340755 to Australian address for regulatory compliance.](https://docs-resources.prod.twilio.com/bb15ae972d93e012237d91a9c69f719decfab5b01e1c979abb6d8068cfba2dc1.png)

The following table shows the possible combinations of requirements, Regulatory Bundles, and addresses.

| **Requirements**                                    | **What you need to do**                                                    |
| --------------------------------------------------- | -------------------------------------------------------------------------- |
| Regulatory Bundle Requirement & Address Requirement | You need to assign the phone number to a Regulatory Bundle and an Address. |
| Regulatory Bundle Requirement only                  | You need to assign the phone number to a Regulatory Bundle *only*.         |
| Address Requirement only                            | You need to assign the phone number to an Address *only*.                  |

### Step 8: Wait for Twilio to review the Regulatory Bundle assigned to phone numbers

When you assign your Regulatory Bundle to a phone number and save it, Twilio sets the status to [*Pending Review*](/docs/phone-numbers/regulatory/getting-started/console-regulatory-compliance-report#criteria-for-regulatory-compliance-mappings) and reviews your submission. The review process generally takes up to three business days, but in some regions it might take several weeks.

You can change the Bundle or Address SID that the phone number is mapped to at any time.

> \[!WARNING]
>
> Changing a phone number mapping restarts the review process.

The following table describes the possible status values and what actions you need to take:

| Status                 | What it means                                                                                                                                                                          | What you need to do                                                                                                       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Pending Review         | Twilio is reviewing the Regulatory Bundle that is assigned to phone numbers to verify that it meets [local regulatory guidelines](https://www.twilio.com/en-us/guidelines/regulatory). | Nothing. Twilio will email you when the status of the Regulatory Bundle changes.                                          |
| Compliant              | Twilio has reviewed the Regulatory Bundle and its assignment to phone numbers. Twilio verified that it complies with local regulatory guidelines.                                      | Nothing. You've successfully created a Regulatory Bundle and assigned it to phone numbers.                                |
| Not Compliant          | Twilio has reviewed the Regulatory Bundle and its assignment to phone numbers. Twilio determined that it doesn't comply with local regulatory guidelines.                              | [Fix the non-compliant assignments](/docs/phone-numbers/regulatory/getting-started/console-regulatory-compliance-report). |
| Provisionally Approved | Any phone numbers that only require an Address will be *Provisionally Approved*.                                                                                                       | Nothing.                                                                                                                  |
