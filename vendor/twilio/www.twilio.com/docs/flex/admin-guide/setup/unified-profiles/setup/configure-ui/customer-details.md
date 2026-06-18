# Configure customer details (Public Beta)

> \[!IMPORTANT]
>
> Unified Profiles in Flex is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a Twilio SLA.

> \[!WARNING]
>
> Unified Profiles in Flex is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex or Segment workflows that are subject to HIPAA or PCI.

## Overview

Enable the customer details component to display selected customer profile information to your agents in Flex UI. This tab typically displays things like customer contact information, demographic information, purchasing preferences, and past behavior metrics.

By default, this component is disabled. If you want your agents to see this information, you must enable and configure this component. When enabled, this information appears to agents on the [Details tab](/docs/flex/end-user-guide/copilot/customerprofiles#details-tab):

![Flex UI showing Ana Smith's details tab with contact info, customer predictions, and preferences.](https://docs-resources.prod.twilio.com/2e8e6cba5cb045b3d47ebf9b4e02a3bcd7d2f90e846191d8d5de52acc82cfe5e.png)

When you enable this component, the customer header component is also enabled automatically (if it wasn't already enabled). You'll also have the option to turn on the [Unified Profiles container](/docs/flex/developer/unified-profiles-container).

Before you configure these settings, ensure that you have already configured [identifiers](/docs/flex/admin-guide/setup/unified-profiles/identifiers) and [traits](/docs/unified-profiles/traits).

## Create trait groups to display customer information to agents

To configure this component, add trait groups to organize the customer information that agents see. You can also rename trait groups and delete traits and trait groups.

The traits list only shows traits that are mapped in your Unified Profiles configuration. If you need to add traits that aren't on this list, [map them on the Unified Profiles page](/docs/unified-profiles/traits).

We recommend following these guidelines to help agents scan the list:

* Group similar information together and give the trait group a concise name.
* Organize groups and traits to put the most important information at the top.
* Be careful not to add too many traits or groups. As more information is added to the page, it becomes more challenging for agents to quickly find what they need.
* Periodically review your traits and trait groups. You may find that you need to add, remove, or update traits and trait groups as your organization and your customers change over time.

> \[!NOTE]
>
> Configure these settings in [Agent Copilot](/docs/flex/admin-guide/setup/copilot).
