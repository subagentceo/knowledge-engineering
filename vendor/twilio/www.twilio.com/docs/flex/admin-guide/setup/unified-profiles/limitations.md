# Known issues and limitations in Unified Profiles in Flex (Public Beta)

> \[!IMPORTANT]
>
> Unified Profiles in Flex is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a Twilio SLA.

> \[!WARNING]
>
> Unified Profiles in Flex is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex or Segment workflows that are subject to HIPAA or PCI.

> \[!NOTE]
>
> Use this page for Unified Profiles information that's Flex-specific, or [refer to the Unified Profiles docs](/docs/unified-profiles/) for a more comprehensive guide.

* If your Segment data uses a phone number format other than E.164, work with your Twilio account team to define conversion rules from E.164. Phone numbers in Flex use E.164 format, so to perform a successful search, you must convert phone numbers from E.164 to the formats used by your data in Segment or have your data sources transform phone numbers in E.164 format when sending data to Segment. Typically, Segment uses the same phone number format as your CRM or data warehouse.
* For all Flex UI versions prior to 2.8.0, [customer header and profile search](/docs/flex/admin-guide/setup/unified-profiles/setup/configure-ui/header-search) settings are read-only.
* In the [customer details UI component](/docs/flex/admin-guide/setup/unified-profiles/setup/configure-ui/customer-details), when you create a recent activity group, spaces are not allowed in the **Group name** field. Also note that the **Group name** that you add in Console doesn't match the recent activity widget name that's displayed in Flex UI.
* Your Flex source is an essential part of your Unified Profiles workspace and is automatically connected during setup. You should not delete or rename this source. If your Flex source gets deleted, you'll need to [use these steps](/docs/flex/admin-guide/setup/unified-profiles/segment-space#troubleshooting-re-connect-a-deleted-flex-source-to-unified-profiles) to reconnect it in your Segment workspace.
* For Flex UI to perform automatic lookup, you must set the [task channel](/docs/flex/admin-guide/core-concepts/routing#task-channels) in TaskRouter to **Chat** (for SMS), **Voice**, or **Email**. In [Console](https://console.twilio.com/), navigate to **TaskRouter** > **Workspaces** > **Tasks** to set a task channel. Automatic lookup is not performed for tasks with other task channel values.
* To display customer highlights and enable automatic customer search in Flex UI versions prior to 2.9.2, you must add the [Set up the Search for a Profile widget](/docs/studio/widget-library/search-for-a-profile) to your Studio Flows for the channels that you use with Unified Profiles data.
* For all Flex UI versions prior to 2.13, the [Agent Automation plugin's](https://flex-plugins-library.twilio.com/plugins/plibo-agent-automation) auto-accept task feature prevents Unified Profiles in Flex from performing an automatic profile lookup. To use Unified Profiles in Flex with the Agent Automation plugin, upgrade your Flex UI version to 2.13 or later.

## Common Unified Profiles sync errors

This section contains common sync errors that might occur, along with some recommended steps you can take to troubleshoot.

### Salesforce sync errors

If you're using Salesforce, you can check the sync status for any errors that might have occurred during the sync.

1. Navigate to **Connections** > **Sources**, and select your Salesforce source.

* You'll see sync history in the **Overview** tab.

2. Select the most recent failed sync.
3. On the side panel, click **Errors** to see more detail.

One common error you might encounter here is related to reauthorizing your connection due to invalid or expired credentials.

To reauthorize your connection:

1. From your Salesforce source, navigate to **Settings** > **Connections**.
2. Click **Reauthorize** to update your credentials.

> \[!WARNING]
>
> Segment syncs with Salesforce immediately after you connect it to your Unified Profiles workspace. This initial sync can take up to 72 hours. After Segment completes the initial sync with Salesforce, Segment initiates a sync with Salesforce every three hours.

### Data warehouse sync errors

If you're using a data warehouse as a source, use the following steps to view sync status and errors:

1. In your Segment workspace, navigate to **Connections** > **Sources** and select your data warehouse.
2. From the **Models** tab, select your model.
3. Locate the Mappings section, and select your mapping.

* This opens a side panel where you'll see sync history and status.

4. Select a sync to view sync details, status, and results. If a sync has failed, you can view why it failed along with any recommended next steps in the error message.

> \[!WARNING]
>
> Note that Segment's initial sync with your data warehouse can take up to 24 hours to complete.

### Using the Profile explorer

Use the Profile explorer to view all user data, including event history, traits, and identifiers. To view your Profile explorer, navigate to **Unify** > **Profile explorer** in your Segment workspace.

If you don't see data in your Profile explorer, here are a few things to keep in mind:

* Once you've connected and enabled your source, it will take several minutes before you start seeing the profiles appear in the Profile explorer.
* If you're using a web or mobile source, check the debugger to make sure data is flowing from your sources.

To check your debugger:

1. Click **Connections** > **Sources**.
2. Find and select your source.
3. Click **Debugger**, and confirm events are flowing through your source.
