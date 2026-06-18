# Customize your Flex-Salesforce Integration

The setup and configuration outlined in [Create your Flex-Salesforce Integration](/docs/flex/admin-guide/integrations/salesforce) and [Manage Flex-Salesforce Call Flows](/docs/flex/admin-guide/integrations/salesforce/call-flows) describe how to get up and running with the default behavior in mind. However, you might want to customize both this integration experience as well as call flows.

> \[!NOTE]
>
> Do you still need to set up your Flex-Salesforce Integration? Check out [our guide for configuring your Salesforce instance for Flex](/docs/flex/admin-guide/integrations/salesforce)!

In this guide, we will walk through how to customize the default call flow in your Flex-Salesforce integration by

1. Creating an IVR (Interactive Voice Response) to collect a case number from our caller
2. Looking up an existing case, or
3. Creating a new case from the caller's input if there is no pre-existing case

To accomplish this, we'll need to do the following:

1. Create a Studio flow to introduce IVR and collect a Case Number from the caller
2. Pass Salesforce's **Case** object to the Flex-Salesforce integration by using a custom Task attribute called `sfdcSearchString`
3. Re-configure the Salesforce Softphone layout to point to the **Case** Object

> \[!NOTE]
>
> Remember: Flex is a Programmable Application Platform, so you can customize Flex to any extent using the Flex Plugin Model, and those changes will be reflected in your Salesforce integration as well. The customizations in this guide refer to the enhancements in both the integration and the call flow itself.

## Create a Studio IVR flow

From your Twilio Console, [create a Studio flow](https://www.twilio.com/console/studio), or edit an existing studio flow by doing the following:

1. Add a Studio widget to `Gather input on a call` to collect user input for a given Case ID (if one exists). Let's call this widget `getInput`.
2. On the 'User Pressed Keys' transition, connect this widget to the `Send to Flex` widget.
3. Pass `{{widgets.getInput.Digits}}` to the `sfdcSearchString` task attribute, making sure that the default `type` and `name` attributes exist.
4. The final Studio Flow will look like this:

   ![Flowchart showing Flex IVR integration with Salesforce, including trigger, getInput, and SendCallToAgent steps.](https://docs-resources.prod.twilio.com/4b7dcc6886fcfb83a9edfa162c52ac4bf16253d62aa622e1b90fe58817f2f572.png)

## Configure the Softphone layout for the Case object

The way to tell Salesforce which object to use for Search and Screen Pop is through the Softphone layout.

We will configure the softphone layout to refer to the **Case** object instead of the default **Contact** object.

**For inbound calls:**

* Change the order of objects to move **Case** to the top

  ![Salesforce softphone layout with Case object moved to top of selections.](https://docs-resources.prod.twilio.com/4672841e4810bd9a648d154b1743cedccd1af937143f64a891a4f673d3c550f7.png)
* Change the Screen Pop settings to point to **Case** object:

  ![Softphone layout edit screen showing settings for case, contact, account, lead, and opportunity objects.](https://docs-resources.prod.twilio.com/b62df7cf248dd34d15904c986d54b51d7a7a836cdd59a9febcf204681f8edd07.png)

## Create a new matching record without Phone information

A Phone attribute is always sent from the Flex plugin to Salesforce when creating a new record. However, specific records like **Cases** are not linked to a given phone number.

Depending on your Softphone layout configuration, you can disable providing this information by adding an extra `sfdcIncludePhoneInPopToNewRecord` task attribute and setting that to `false`.

![Flowchart showing message triggers and configuration with highlighted attribute 'sfdcIncludePhoneInPopToNewRecord'.](https://docs-resources.prod.twilio.com/a7cbdc512952c68581ae45537cd7f46ce46ae8da11091d65cdcc1f5ad3d51f0c.jpg)

## Resulting Call Flow

Now, when a caller provides a Case ID using their keypad upon being prompted by the IVR, that Case ID is used to search for the case and render the Screen Pop to the relevant Case record.
