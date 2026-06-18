# Known issues and limitations in Unified Profiles (Public Beta)

> \[!IMPORTANT]
>
> Unified Profiles is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Unified Profiles is not a HIPAA Eligible Service or PCI compliant and should not be used in workflows that are subject to HIPAA or PCI.

## Limitations

* If your Segment data uses a phone number format other than E.164, work with your Twilio account team to define conversion rules from E.164. Phone numbers in Flex use E.164 format, so to perform a successful search, you must convert phone numbers from E.164 to the formats used by your data in Segment or have your data sources transform phone numbers in W.164 format when sending data a to Segment. Typically, Segment uses the same phone number format as your CRM or data warehouse.

## Common Unified Profiles sync errors

This section contains common sync errors that might occur, along with some recommended steps you can take to troubleshoot.

### Salesforce sync errors

If you're using Salesforce, you can check the sync status for any errors that might have occurred during the sync.

1. Navigate to **Connections** > **Sources**, and select your Salesforce source.

* You'll see sync history in the **Overview** tab.

2. Select the most recent failed sync.
3. On the side panel, click on **Errors** to see more detail.

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
2. From the Models tab, select your model.
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
