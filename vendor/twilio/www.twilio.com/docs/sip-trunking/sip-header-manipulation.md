# SIP Header Manipulation

The expected format of phone numbers in SIP INVITE requests can sometimes differ between on-premise equipment and providers. For example, some private branch exchanges (PBXs) might send numbers in a format other than [E.164](/docs/glossary/what-e164), the format that Twilio requires. In order to address this issue, Twilio provides a feature called SIP Header Manipulation.

SIP Header Manipulation allows you to automatically modify the [user fields](/docs/glossary/sip-invites#sip-user) in a [SIP INVITE](/docs/glossary/sip-invites) for Elastic SIP Trunking termination and/or origination calls. (For Elastic SIP Trunking customers, user fields often contain phone numbers. This page will refer to phone numbers and user fields interchangeably.)

To access this feature in Twilio Console, go to **Products & services** > **Elastic SIP Trunking** > **Manage** > **[SIP Header manipulations](https://1console.twilio.com/go?to=/account/__account__/us1/sip-trunking/manage/header-manipulation)**. In the [legacy Console](https://www.twilio.com/console/sip-trunking/settings/header-manipulation), go to **Elastic SIP Trunking** > **Settings** > **SIP Header Manipulation**.

The following section will describe the main components of Manipulation Policies, the set of rules that describe if, how, and when a SIP header should be modified.

If you prefer, you can jump down to the [Create a Manipulation Policy section](#create-a-manipulation-policy) to view the steps for implementing this feature.

## Manipulation Policies

In order to manipulate phone numbers within SIP INVITEs, you will need to create a Manipulation Policy and assign it to one or more of your SIP Trunks.

Manipulation Policies consist of:

* A Friendly Name: a human-readable name for the Manipulation Policy
* A Policy SID: a unique identifier for the Manipulation Policy
* Request Rule(s): rules that define whether and how SIP INVITEs will be changed

You can check that your Manipulation Policy is working as expected by running a test on it in the Console.

The maximum number of Manipulation Policies per account is 1000. For each Trunk, you can assign one Manipulation Policy for termination and one for origination.

### Rules

Request Rules contain the logic that determines if and how an INVITE's headers should be manipulated.

* One or more Actions that define how a SIP INVITE will be manipulated (maximum 20 per Request Rule)
* Zero or more Conditions that determine whether or not the Action should be executed (maximum 20 per Request Rule)

#### Actions

An Action specifies which phone numbers ([user fields](/docs/glossary/sip-invites#sip-user)) you want to change and how you want to change them.

An Action is associated with a Request Rule, and a Request Rule can contain up to 20 Actions.

**What phone numbers to change**

When creating an Action, you will choose the phone numbers you want to modify when the Action executes.

Phone numbers (the [user fields in SIP URIs](/docs/glossary/sip-invites#sip-user)) tend to repeat across several SIP headers within a SIP message. This means that if you need to change a phone number/user in one SIP header, it's likely that it needs to change elsewhere. To minimize the work you need to do to manipulate phone numbers/users in SIP INVITEs, Twilio has grouped related URI user fields together into `To Number` fields and `From Number` fields.

`To Number` fields represent the user who will receive the INVITE:

* [To user](/docs/glossary/sip-invites#to-header)
* [Request-URI (RURI) user](/docs/glossary/sip-invites#request-uri)

`From Number` fields represent the user who initiated the INVITE:

* [From user](/docs/glossary/sip-invites#from-header)
* [P-Asserted-Identity (PAI) user](/docs/glossary/sip-invites#p-asserted-identity-header)
* [Remote-Party-ID (RPID) user](/docs/glossary/sip-invites#remote-party-id-rpid-header)
* [Contact user](/docs/glossary/sip-invites#contact-header)

When an Action is executed on `To Number` fields, the To header's user field will be manipulated first, then copied into the Request-URI's user field.

When an Action is executed on `From Number` fields the From header's user field will be manipulated first, then copied into the P-Asserted-Identity, Remote-Party-ID, and Contact headers' user fields.

**How to change the phone numbers**

After choosing which phone numbers to change, you will specify *how* the phone numbers should change by selecting an action (a text modification) and a value to be used with the text modification.

You can choose from the following text modification actions:

* `Add prefix`
* `Add suffix`
* `Remove prefix`
* `Remove suffix`
* `Remove number of prefix`
* `Remove number of suffix`
* `Replace with`

The Action's value is the value you want to use with the chosen action. Values are case-sensitive.

> \[!WARNING]
>
> There are restricted and reserved characters within each SIP field. Keep this in mind when defining values in your Actions.
>
> For SIP user fields, only the characters below are allowed. You can refer to [RFC 3261](https://datatracker.ietf.org/doc/html/rfc3261) for guidelines on what characters should be escaped for the user fields. Be sure to escape other special characters.
>
> | Allowed characters for SIP users                                                                                                            |
> | ------------------------------------------------------------------------------------------------------------------------------------------- |
> | A-Z \| a-z \| 0-9 \| "-" \| "." \| "\_" \| "\~" \| "!" \| "$" \| "&" \| "'" \| "(" \| ")" \| "\*" \| "+" \| "," \| ";" \| "=" \| "?" \| "/" |
> | And escaped versions of special characters                                                                                                  |

**Action Execution:**

* If a Request Rule does not contain Conditions, the Action(s) will be executed on every SIP INVITE.
* If a Request Rule does contain Conditions, the Conditions determine whether or not the Action(s) will be executed.
* Actions (if executed) are executed in the order they appear. The order can be modified.

#### Conditions

You can conditionally execute the Action(s) in a given Request Rule by defining a group of Conditions and an execution type that determines how to evaluate the Conditions.

The execution type can be:

* `If any of these conditions are met` (this is the default)
  * If any conditions in the list is true, the Action(s) will be executed.
  * If all of the conditions are false, the Action(s) will not be executed.
* `If all of these conditions are met`
  * All of the conditions must be true in order for the Action(s) to be executed.
  * If any of the conditions is found to be false, the Action(s) will not be executed.
* `If none of these conditions are met`
  * If all of the conditions are false, the Action(s) will be executed.
  * If any of the conditions are true, the Action(s) will not be executed.

Each Condition consists of:

1. A SIP header field to be evaluated
2. A logical operator
3. A value to be used when evaluating the SIP header field

The evaluation of Conditions is case-sensitive.

The order of the Conditions (as they appear in the Console) is the order in which they will be evaluated. You can, however, reorder or delete them.

**SIP header fields**

The SIP header fields that can be evaluated are listed below. Click on a header field or go to the [SIP INVITE Glossary page](/docs/glossary/sip-invites) to learn more.

* [Contact header](/docs/glossary/sip-invites#contact-header)

  * [Contact display name](/docs/glossary/sip-invites#contact-header)
  * [Contact URI](/docs/glossary/sip-invites#contact-header)
  * [Contact user](/docs/glossary/sip-invites#contact-header)
  * [Contact host](/docs/glossary/sip-invites#contact-header)
* [Diversion header](/docs/glossary/sip-invites#diversion-header)
* [Diversion display name](/docs/glossary/sip-invites#diversion-header)
* [Diversion URI](/docs/glossary/sip-invites#diversion-header)
* [Diversion user](/docs/glossary/sip-invites#diversion-header)
* [Diversion host](/docs/glossary/sip-invites#diversion-header)
* [From header](/docs/glossary/sip-invites#from-header)

  * [From display name](/docs/glossary/sip-invites#from-header)
  * [From URI](/docs/glossary/sip-invites#from-header)
  * [From user](/docs/glossary/sip-invites#from-header)
  * [From host](/docs/glossary/sip-invites#from-header)
* [P-Asserted-Identity header](/docs/glossary/sip-invites#p-asserted-identity-header)

  * [P-Asserted-Identity display name](/docs/glossary/sip-invites#p-asserted-identity-header)
  * [P-Asserted-Identity URI](/docs/glossary/sip-invites#p-asserted-identity-header)
  * [P-Asserted-Identity user](/docs/glossary/sip-invites#p-asserted-identity-header)
  * [P-Asserted-Identity host](/docs/glossary/sip-invites#p-asserted-identity-header)
* [P-Charge-Info header](/docs/glossary/sip-invites#p-charge-info-header)

  * [P-Charge-Info display name](/docs/glossary/sip-invites#p-charge-info-header)
  * [P-Charge-Info URI](/docs/glossary/sip-invites#p-charge-info-header)
  * [P-Charge-Info user](/docs/glossary/sip-invites#p-charge-info-header)
  * [P-Charge-Info host](/docs/glossary/sip-invites#p-charge-info-header)
* [Remote-Party-Id header](/docs/glossary/sip-invites#remote-party-id-rpid-header)

  * [Remote-Party-Id display name](/docs/glossary/sip-invites#remote-party-id-rpid-header)
  * [Remote-Party-Id URI](/docs/glossary/sip-invites#remote-party-id-rpid-header)
  * [Remote-Party-Id user](/docs/glossary/sip-invites#remote-party-id-rpid-header)
  * [Remote-Party-Id host](/docs/glossary/sip-invites#remote-party-id-rpid-header)
* [Request URI](/docs/glossary/sip-invites#request-uri)

  * [Request URI user](/docs/glossary/sip-invites#request-uri)
  * [Request URI host](/docs/glossary/sip-invites#request-uri)
* [To header](/docs/glossary/sip-invites#to-header)

  * [To display name](/docs/glossary/sip-invites#to-header)
  * [To URI](/docs/glossary/sip-invites#to-header)
  * [To user](/docs/glossary/sip-invites#to-header)
  * [To host](/docs/glossary/sip-invites#to-header)

**Logical operators**

The logical operators that can be used when creating a Condition are:

* `Equals`
* `Does not equal`
* `Starts with`
* `Does not start with`
* `Contains`
* `Does not contain`
* `Ends with`
* `Does not end with`

> \[!WARNING]
>
> Keep in mind that Twilio will evaluate the SIP header exactly as it is presented and will not encode or decode special characters when comparing the SIP header to the value you have set in your Condition.
>
> For example, if the SIP header contains the `example%40example.com` as the `To user`, and the value in your Condition contains `example@example.com`, Twilio will not equate these strings.
>
> You can refer to [RFC 3261](https://datatracker.ietf.org/doc/html/rfc3261) for guidelines on what characters should be escaped within each field type of the SIP header. Below is a summary of the characters allowed within each SIP field.
>
> | **SIP field type** | **Allowed characters**                                                                                                                                                                                                                           |
> | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
> | user               | A-Z \| a-z \| 0-9 \| "-" \| "." \| "\_" \| "\~" \| "!" \| "$" \| "&" \| "'" \| "(" \| ")" \| "\*" \| "+" \| "," \| ";" \| "=" \| "?" \| "/" And escaped versions of other special characters.                                                    |
> | host               | A-Z \| a-z \| 0-9 \| "-" \| "." \| ":" \| "\[" \| "]"                                                                                                                                                                                            |
> | URI                | A-Z \| a-z \| 0-9 \| "-" \| "." \| "\_" \| "\~" \| "!" \| "$" \| "&" \| "'" \| "(" \| ")" \| "\*" \| "+" \| "," \| ";" \| "=" \| ":" \| "\[" \| "]" \| "?" \| "#" \| "/" \| "@" \| "%" \| "\`" And escaped versions of other special characters. |
> | display name       | Ascii characters with decimal values of 0 to 253.                                                                                                                                                                                                |

## Create a Manipulation Policy

This section walks through creating an example Manipulation Policy in the Console.

First, open the SIP header manipulations page:

## Console

In Twilio Console, go to **Products & services** > **Elastic SIP Trunking** > **Manage** > **[SIP Header manipulations](https://1console.twilio.com/go?to=/account/__account__/us1/sip-trunking/manage/header-manipulation)**.

## Legacy Console

Log in to your [legacy Twilio Console](https://console.twilio.com). In the left-hand navigation pane, click **Elastic SIP Trunking > Settings > SIP Header Manipulations**.

1. On the "SIP header manipulations" page, click on the blue **Create a policy** button (in the top right corner).

   ![Manipulation policy details with Add request rule button highlighted.](https://docs-resources.prod.twilio.com/0d77f4ded9105e807d034f5fa35055c544eded43ed2d0ff6c1cb7b34b010acb6.png)
2. Give your new Manipulation Policy a Friendly Name that helps you remember what the policy does and click on the **Create** button.

   ![Header Manipulation - Provide a Friendly Name for the manipulation policy.](https://docs-resources.prod.twilio.com/6fc46ca2c5faf3a8c40ebc5c6fe3f64f2668c5ad7c764fecc02d6da486fb4875.png)
3. On the "Manipulation policy details" page, find the "Request rules" heading. Click on the **+ Add request rule** button to the right of the heading.

   ![Header Manipulation - Click on Add request rule button.](https://docs-resources.prod.twilio.com/e2ae9fd219b1fcd66572b89fbc6c842a0368a4e9758965d00ae68e695c792131.png)
4. On the **Add request rule** page, give the rule a name that helps you remember what it does (for example, when and how the rule should change a SIP header)

   ![Add request rule with 'Add +1 when needed' and highlighted 'Add condition' button.](https://docs-resources.prod.twilio.com/e3bcd07c41093733cf03326830d18d2d6d075c489b0c6b77a946c2a8c1f9be15.png)
5. Add Conditions (optional)

   * Under the "Conditions" heading, click on the **+ Add condition** button

     ![Header Manipulation - Click on Add Condition Button.](https://docs-resources.prod.twilio.com/243eb67b2c4718ab33e8b83bbf8c5ac3973df3919a72d9625c109a8dcf46d5e7.png)
   * Select an execution type
   * Choose the SIP header field that Twilio should evaluate
   * Select the operator and fill in the value to use with the operator

     ![SIP trunking condition: From user does not start with +1.](https://docs-resources.prod.twilio.com/b2c4d969626a39873193b315447bafb754820f204daae960428d67830ef503d5.png)
   * If necessary, click on the **+ Add another condition** button. Use the arrows to the right of the conditions to reorder them.
6. Add Actions

   * Select the SIP header field you want to modify (Either the "To number" fields or the "From number" fields)
   * Select the action and you want to be taken on the SIP header field you selected
   * Fill in the Value that will be used with the action you chose

     ![SIP header field 'From number' with action 'Add prefix' and value '+1'.](https://docs-resources.prod.twilio.com/34012e2cda7d98ddc4666ed64eff6719f8a9032aa73e78992b71d8f6555a90b4.png)
   * If necessary, click on the **+ Add another action** button. Use the arrows to the right of the actions to reorder them.
7. Click on the blue **Add rule** button to add the rule to your policy.

   ![SIP trunking rule setup with conditions and actions, highlighting Add rule button.](https://docs-resources.prod.twilio.com/24d28d6de5414b27e8550938713fc729be042e035e335a233954675e349f0a95.png)

   * If the rule saved successfully, you should now be back on the "Manipulation policy details" page.
8. Test the policy

   * On the "Manipulation policy details" page, find the "Test manipulation policy" heading.
   * You can either paste in your own SIP message in the SIP message input box, or you can click on the "Populate with example" button.

     ![SIP header manipulations table showing policy names and associated SIP trunks with TestTrunk highlighted.](https://docs-resources.prod.twilio.com/1ac70a1d92a68f055d2484a9aeaa6d98207fd4ce541336ad71dd38aba992d57c.png)
   * Edit the SIP message so that it has the issue you're trying to solve with your policy.
   * Click on the **Run test** button. The "Manipulation result" box will show you the results of applying your policy on the SIP message.
   * Verify that the expected changes were made and that no unexpected changes occurred. Edit the policy if necessary.
9. Save the policy by clicking the blue **Save policy** button at the bottom of the page.
10. Assign the policy to a Trunk

    * In the left navigation pane, navigate to **Elastic SIP Trunking > Manage > Trunks**.
    * Click on the name of the Trunk you want to apply the Manipulation Policy to.
    * You should now be on the "General Settings" Page. In the left hand navigation select either **Termination** or **Origination** (depending on which direction you want your Manipulation Policy to apply to).

      ![Configure SIP trunk header manipulation policy with region-specific CPS settings.](https://docs-resources.prod.twilio.com/656f00e2ab95984f097e75331568f3e6cca77cc73436180211629f176cdfd6ee.png)
    * Find the "Header Manipulation" heading and enter the Friendly Name of the Manipulation Policy you just created.

      ![Header Manipulation - Configure trunk with your Header Manipulation Policy.](https://docs-resources.prod.twilio.com/cd4d3a2e3751753829ecf6b8ef7b5ba0f53aa4295ae93e2d96fb5c20e4abed10.png)
    * Scroll to the bottom of the page and click on the blue **Save** button.

      ![Header Manipulation settings with options to format numbers and save trunk configuration.](https://docs-resources.prod.twilio.com/e19bb0ab8b935467439ea4152d94efc1034e3f3a95ac4b258a1a41037a8eaeb2.png)
11. Verify the policy has been applied.

    * Navigate to **Elastic SIP Trunking > Settings > SIP Header Manipulations**. The policy should now have an "Associated SIP trunk".

      ![Header Manipulation - Verify Associated SIP Trunks.](https://docs-resources.prod.twilio.com/49ea6b8ace8e7c2788d50bcd29968676dc9d47a7ed49428e8f67ec837ef38f92.png)

## Test a Manipulation Policy

After you create a Manipulation Policy, you can test it in the Console before using it in production.

1. In the Console, navigate to **Elastic SIP Trunking > Settings > SIP Header Manipulations** and click on the policy that you want to test.
2. On the "Manipulation policy details" page, find the "Test manipulation policy" heading.
3. You can either paste in your own SIP message in the SIP message input box, or you can click on the **Populate with example** button.
4. Edit the SIP message so that it has the issue you're trying to solve with your policy.
5. Click on the **Run test** button.
6. The "Manipulation result" box will show you the results of applying your policy on the SIP message. Verify that the expected changes were made and that no unexpected changes occurred.

## Delete a Manipulation Policy

If you want to delete a Manipulation Policy that is not associated with any SIP Trunks, complete the following steps:

1. Navigate to **Elastic SIP Trunking > Settings > SIP Header Manipulations**.
2. Click on the name of the Manipulation Policy you wish to delete.
3. On the "Manipulation policy details page", click on **Delete policy** (next to the **Cancel** button).

   ![SIP trunking manipulation policy details with delete policy option highlighted.](https://docs-resources.prod.twilio.com/d5f69818ed86f50832062f82f3a81bfad3353fbd838f4651d304e263e06262e2.png)
4. Verify that you want to delete the policy by clicking the red **Delete the policy** button on the modal that pops up.

If you want to delete a Manipulation Policy that is associated with a SIP Trunk, you must first remove the Manipulation Policy from the SIP Trunk before deleting.

1. Navigate to **Elastic SIP Trunking > Manage > Trunks**
2. Click on the name of the Trunk associated with a Manipulation Policy.
3. In the left navigation, click on either **Termination** or **Origination** (depending on the direction your Manipulation Policy was associated with).
4. On the "Origination" or "Termination" page, scroll down to the "Header Manipulation" section.
5. Change the Header Manipulations input box to `(no header manipulation)`.

   * ![Header Manipulation - Configure trunk with your Header Manipulation Policy.](https://docs-resources.prod.twilio.com/cd4d3a2e3751753829ecf6b8ef7b5ba0f53aa4295ae93e2d96fb5c20e4abed10.png)
6. Scroll down to the bottom of the page and click the blue **Save** button.
7. In the left navigation, click on the blue arrow next to the name of the SIP Trunk to be taken back to your "Elastic SIP Trunks" page.
8. Navigate to **Elastic SIP Trunking > Settings > SIP Header Manipulations**.
9. Click on the name of the Manipulation Policy you wish to delete.
10. On the "Manipulation policy details page", click on **Delete policy** (next to the **Cancel** button).

    ![SIP trunking manipulation policy details with delete policy option highlighted.](https://docs-resources.prod.twilio.com/d5f69818ed86f50832062f82f3a81bfad3353fbd838f4651d304e263e06262e2.png)
11. Verify that you want to delete the policy by clicking the red **Delete the policy** button on the modal that pops up.
