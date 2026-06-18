# Confirm or update your customer identifier settings (Public Beta)

> \[!IMPORTANT]
>
> Unified Profiles is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Unified Profiles is not a HIPAA Eligible Service or PCI compliant and should not be used in workflows that are subject to HIPAA or PCI.

## Overview

Unified Profiles uses customer identifiers, such as user ID or phone number, to search for customer profiles and create or merge profiles when needed.

You can review customer identifiers and configure their display names for Unified Profiles in Twilio Console. Navigate to **Unified Profiles** > **Manage**, then click the **Identifiers** tab.

Once you've created identifiers, they will automatically appear on this page with default settings. Review these defaults and update the settings for the identifiers to ensure they make sense for your use case. You can [visit Segment's identity resolution docs](/docs/segment/unify/identity-resolution/) to learn more about how identifiers work.

## Review and update customer profile identifiers

Unified Profiles automatically searches for, creates, and merges customer profiles based on identifiers that are stored in Segment. You can configure the identifiers in Segment UI under **Unify** > **YOUR\_SPACE\_NAME** > **Unify settings**, on the **Identity resolution** tab.

For contact center use cases, we recommend starting with these identifiers:

* phone
* email
* user\_id
* anonymous\_id

If you know that your contact center needs to use different identifiers, you can choose from available identifiers when you configure your Unify space.

The screenshot below shows the **Identity resolution** page in Segment with these identifiers added. It also shows the priority, which is the order in which the identifiers are searched. You set the priority order when you add the identifiers in Segment.

![Recommended Segment identifiers for contact center use cases.](https://docs-resources.prod.twilio.com/67eb015a3b247cb8d1b6cc03fa3f253f30cfd82f82d77e0a24152f19da2c804e.png)

For Unified Profiles, you can review customer identifiers and edit their display names in Twilio Console. The display name defines how the identifier appears in the Flex agent UI and in Studio. By default, Unified Profiles sets identifier display names to match the identifier keys from Segment. We recommend updating display names to names that make sense to your users.

To update the display names for your identifiers:

1. From Twilio Console, navigate to **Unified Profiles** > **Manage**, then click the **Identifiers** tab.
2. Next to each identifier, click **Edit identifier**.
3. In **Display name**, enter a name that agents and builders can recognize, and then click **Save**.
