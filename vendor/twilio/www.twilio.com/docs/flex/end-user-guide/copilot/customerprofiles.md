# View customer profiles with Unified Profiles (Public Beta)

> \[!IMPORTANT]
>
> Unified Profiles in Flex is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a Twilio SLA.

> \[!WARNING]
>
> Unified Profiles in Flex is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex or Segment workflows that are subject to HIPAA or PCI.

If your administrator has enabled the Unified Profiles feature for your Flex environment, you can view details about a customer that help you tailor your conversation to their needs.

When a customer calls or contacts you through Voice, SMS, WhatsApp, or Email channels (using [Flex Conversations](/docs/flex/admin-guide/core-concepts/conversations)), Flex automatically looks up the customer. If Flex finds a matching customer profile, it shows you the profile in the task. You can view the information before you accept a task and while you're working on it.

The information that appears is configured by your Flex administrator.

To unlink a customer profile from the current task, click the three-dots icon and select **Unlink customer**. Unlinking a profile from a task prevents the current task from being connected with a customer profile. You may want to do this if, for example, a customer calls in from a phone other than their own.

Note that while this unlinks the current task from the profile, it doesn't update the contact information for that profile in Flex.

## Details tab

The **Details** tab displays selected customer profile information. Your organization's administrator configures the types of information to show. This tab typically displays things like:

* Customer contact information
* Demographic information
* Preferences
* Recent web activity
* [Computed traits](/docs/segment/unify/traits/computed-traits/), such the top purchase category or lifetime customer value
* [Predictive traits](/docs/segment/unify/traits/predictions), such as likelihood to churn and predicted lifetime customer value

![Twilio Flex interface showing a call task with contact Joe Doe in Salesforce.](https://docs-resources.prod.twilio.com/6d2c4bedfc4a1d649597ec197981d3a5fb9d5b9563741e5dcea0118c8c0cb508.png)

## History tab

By default, the **History** tab shows all inbound Flex interactions, as well as outbound Voice calls. Additional interactions that your company tracks can also be included, such as when the customer placed an order or registered on your website. If you have enabled [Agent Copilot](/docs/flex/admin-guide/setup/copilot), wrap-up notes appear as well.

* You'll notice that additional details, such as the name of the agent assigned to the task, are available for interactions that occurred after Unified Profiles was enabled. Because this information is recorded by Unified Profiles, it's not available for interactions that happened before it was enabled.
  The same is true for call summaries: they only appear for interactions that happened after you enabled Agent Copilot.
* In this beta release, each interaction shows the name and queue of the agent who was assigned to that task, start time, and duration for calls. In future releases, more details and insights will be available.

![Agent Copilot and Unified Profiles with History tab.](https://docs-resources.prod.twilio.com/d003b5d5abe87091928966247dced139dc4e411a3944594cdc55c755e8baa52b.png)

Additional activities that your company tracks outside of Flex can also be included, such as activities from your company's website or mobile app. For example, you can configure Flex to show when the customer placed an order or registered on your website. You can also configure additional details for these events, such as what items were included in the order or which products were chosen during registration. Activities from outside of Flex appear with a star icon.
