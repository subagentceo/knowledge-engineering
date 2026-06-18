# Choose the traits to use (Public Beta)

> \[!IMPORTANT]
>
> Unified Profiles is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Unified Profiles is not a HIPAA Eligible Service or PCI compliant and should not be used in workflows that are subject to HIPAA or PCI.

## Overview

Unified Profiles enables you to use customer traits to make important customer information available in Twilio. Using these details, you can:

* Personalize IVR flows and virtual agent conversations
* Let contact center agents personalize customer interactions while also working more efficiently

Before you configure traits in Unified Profiles, you must add them in your [Segment space](/docs/unified-profiles/segment-space).

Next, choose traits from your Segment space to make available to Unified Profiles.

You can configure and review traits from Twilio Console. Navigate to **Unified Profiles** > **Manage**, then click the **Traits** tab.

You can include the following trait types:

* **Custom traits**: Traits that are stored in your data source, like address or shoe size.
* **[Computed traits](/docs/segment/unify/traits/computed-traits)**: Calculations that are kept up-to-date over time, like total number of orders or lifetime revenue.
* **[Predictive traits](/docs/segment/unify/traits/predictions)**: Predictions powered by AI and machine learning about the likelihood that users will perform any event tracked in Segment. For example, you can identify users who are very likely to purchase, refer a friend, or use a promo code, or predict a user's lifetime value.

## Suggested traits

By default, we suggest a small number of basic traits, including name, phone number, email, and language. To start using these traits, click **Select trait key** for that row and then select the trait key from your Segment workspace that matches the suggested trait. Note that you can't change the display name for suggested traits.

These suggested traits give you a starting point for the traits that contact centers most commonly use. If any of these traits don't apply to your environment, click **More options** for that row and select **Remove suggested trait**. If you change your mind later, you can add it back by clicking **Add traits**, searching for that trait, and adding it.

## Additional traits

You can add as many traits as you want. Click **Add traits**, then select one or more trait keys from your Segment workspace. You can add multiple traits at once by selecting multiple checkboxes before clicking **Add selected traits**. After adding custom traits, update the **Display name** for each new trait in the list.
