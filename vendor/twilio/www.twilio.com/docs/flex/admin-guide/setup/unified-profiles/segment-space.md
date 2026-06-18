# Connect your Segment space (Public Beta)

> \[!IMPORTANT]
>
> Unified Profiles is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Unified Profiles is not a HIPAA Eligible Service or PCI compliant and should not be used in workflows that are subject to HIPAA or PCI.

> \[!NOTE]
>
> Use this page for Unified Profiles information that's Flex-specific, or [refer to the Unified Profiles docs](/docs/unified-profiles/) for a more comprehensive guide, including troubleshooting steps.

## Overview

A Segment workspace is your top-level Twilio Segment account. A Segment space is a container inside your Segment workspace that contains configuration of data sources, identifiers, and traits, and includes your customer profiles data.

Use the steps in this article to connect your Segment space to Unified Profiles in Flex. During this process, you'll need to access the **Unify Settings** page in your Segment space to get the information needed to connect your Segment space.

> \[!NOTE]
>
> For setup help or to file a ticket, [contact our support team](https://help.twilio.com/).

## Connect an existing Segment space

To start using Unified Profiles with Flex, follow these steps to connect an existing Segment space:

1. Follow [Segment's instructions to set up your Unify space](/docs/segment/unified-profiles/connect-a-workspace/#step-1-set-up-your-unify-space). You only have to complete **Step 1: Set up your Unify space**. You can complete the other steps after connecting to Flex.
2. From Twilio Console, navigate to **Explore products** > **Flex** > **Contact center settings** > **Unified Profiles**.
3. Click **Use existing Segment Unify space**.
4. On the **Connect a Segment Unify space** page:
   1. In the **Connection friendly name** field, enter the name that you want to use for this connection.
   2. In **Segment Unify space ID**, enter the ID of the Segment space you want to connect.<br />
      You can find the space ID in Segment at **Unify** > **YOUR\_SPACE\_NAME** > **Unify settings**, on the **API access** tab.
   3. In **Profile API access token**, enter the token you generated in the Segment Unify API access settings (the same location where you found the space ID).<br />
      Segment only shows you the Profile API access token once after you generate it, so make sure to store it safely. If you had an access token but lost it, generate a new one.
   4. Select the checkbox indicating that you understand that the form creates a Twilio source in your Segment space and shares its write key with Twilio. This acknowledgement allows:
   * Flex to store contact center interaction events on your Segment space
   * Studio to update profiles with the [Update Profile Traits widget](/docs/studio/widget-library/update-profile-traits)
5. Click **Connect**.

When your space connects successfully, the **Manage Unified Profiles** page appears, and your **Twilio-to-Segment** connection status shows as **Connected**.

## Update your Studio Flows (for Flex UI 2.8.x or earlier)

If you're using Flex UI 2.8.x or earlier, you'll need to update your Studio Flows so Flex can search for profiles. This lets you use the contact information from customer interactions.

To update your Studio Flows:

1. From Twilio Console, navigate to **Flex** > **Contact center settings** > **Unified Profiles**.
2. Under **Getting started with Unified Profiles for Flex**, expand **Add Flex customer history**.
3. Click **Update Studio flows**.
4. On the **Flows** page, update each Flow used with Unified Profiles to add the [Search for a Profile](/docs/studio/widget-library/search-for-a-profile) widget.
5. When you're done, return to **Flex** > **Contact center settings** > **Unified Profiles**.
6. In the **Add Flex customer history** section, click **I've done this** to continue configuring Unified Profiles in Flex.
