# Connect your Segment space (Public Beta)

> \[!IMPORTANT]
>
> Unified Profiles is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Unified Profiles is not a HIPAA Eligible Service or PCI compliant and should not be used in workflows that are subject to HIPAA or PCI.

## Overview

A Segment workspace is your top-level Twilio Segment account. A Unify space is a container inside your Segment workspace that contains configuration of data sources, identifiers, and traits, and includes your customer profiles data.

To get started, you must set up an existing Segment Unify space to use with Unified Profiles. If you're a new Segment Unify customer and need to create a new workspace, start with [Segment's documentation](/docs/segment/unified-profiles/create-a-workspace/).

> \[!NOTE]
>
> For setup help or to file a ticket, [contact our support team](https://help.twilio.com/).

## Connect an existing Segment space with Unified Profiles

Use the following steps to set up an existing Segment space to use with Unified Profiles:

1. From Twilio Console, navigate to **Explore products** > **Unified Profiles** > **Overview**.
2. Click **Use existing Segment Unify workspace**.<br />
   If you don't have an existing space, click **Contact sales** to get started with Segment Unify.
3. Set up your Unified Profiles connection:
   1. In the **Connection friendly name** field, enter the name that you want to use for this connection.
   2. In **Segment Unify space ID**, enter the ID of the Segment space you want to connect.<br />
      You can find the space ID in Segment at **Unify** > **YOUR\_SPACE\_NAME** > **Unify settings**, on the **API access** tab.
   3. In **Profile API access token**, enter the token you generated in the Segment Unify API access settings (the same location where you found the space ID).<br />
      Segment only shows you the Profile API access token once after you generate it, so make sure to store it safely. If you had an access token but lost it, generate a new one.
   4. Select **Allow Unified Profiles to write events to Segment**. This acknowledgment allows:
      * Flex to store contact center events on your Segment space.
      * Studio to update profiles with the Update Profile Traits Widget.
   5. Click **Connect**.

You can then use Unified Profiles to activate your profiles with the following use cases:

* Empower your agents with user data with [Unified Profiles in Flex](/docs/flex/admin-guide/setup/unified-profiles).
* Improve call routing and customize experiences with your [Studio flows](/docs/flex/admin-guide/setup/configure-pre-agent-workflow-with-studio/).

## Troubleshooting: reconnect a deleted Twilio source to Unified Profiles

Your Twilio source is an essential part of your Unified Profiles workspace and is automatically connected during setup. If you delete this source, you'll need to recreate it and update the write key stored in Twilio.

> \[!WARNING]
>
> Your source must be named `twilio-unified-profiles` to work correctly. If this name changes, you must rename it back to `twilio-unified-profiles` in your Segment workspace.

Use the following steps to recreate a deleted source.

From your [Segment workspace](https://app.segment.com/goto-my-workspace/overview/):

1. Navigate to **Connections** > **Sources**.
2. Click **+ Add source**.
3. Select the **Java** source from the catalog.
4. Name the source `twilio-unified-profiles`.
5. Click **Add Source**.
6. Copy the source write key.
7. Navigate to **Unify** > **Unify settings**, and select the **Profiles sources** tab.
8. Click **Connect source**.
9. Select your newly added source and click **Connect source**.

From the Twilio Console:

1. Navigate to **Flex** > **Contact center settings** > **Unified Profiles**.
2. Next to **Flex source write key**, click **Update key**.
3. Paste the source write key and click **Save**.
