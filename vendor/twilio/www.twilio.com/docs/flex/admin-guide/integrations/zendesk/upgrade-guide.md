# Upgrade Guide for Flex-Zendesk

## Upgrading Click-to-Dial to Native Outbound

If you have been using our Flex-Zendesk Integration, you might remember deploying [Functions](https://www.twilio.com/console/functions/overview) to your Account. The Functions-based click-to-dial implementation can now be moved to a [Native Outbound Dialing](https://www.twilio.com/blog/flex-programmable-dialpad-outbound-calling) implementation. This provides the following benefits:

* Take advantage of the increased stability and scale of the Flex platform
* Gain access to additional features as they are rolled out for Outbound Dialing

**Note**: If you are configuring the ZD plugin for the first time, then you will get the native implementation by default. You will not see the option to perform a migration, and you just need to ensure that the following prerequisites are satisfied.

**Prerequisites**

* Flex-UI needs to run on version >= 1.18.0
* [Enable Native Outbound Dialing](/docs/flex/admin-guide/setup/voice/dialpad/enable) on your Account

### Upgrade Steps

#### 1) Enable Native Outbound Dialing on your Account

Enable and configure the Flex Dialpad via the [Twilio console](https://www.twilio.com/console/flex/settings),

![Flex Dialpad settings with options for enabling dialpad, caller ID, task queue, workflow, and country.](https://docs-resources.prod.twilio.com/3d6688a67dea75e011a27318fad40b89cb18a5e54f8e12f3714d29bc78cfb8c0.png)

#### 2) Flex Admin setup

Navigate to the [Zendesk Integration](https://flex.twilio.com/admin/integrations/zendesk) in the Flex Admin:

* A 'Migrate' button will be visible within the Salesforce configuration page.
* Click 'Migrate'. This will update the integration to rely on the Flex Dialpad.
* After completing the migration, you will be unable to revert to the Functions-based approach.

![Zendesk integration page with migrate button highlighted for native click-to-dial feature.](https://docs-resources.prod.twilio.com/a89dbf30127d4dee380879f4e08b8987377a0f0824125f2c4ae668b87ef55448.png)

#### 3) Optional Steps

After completing the migration, we recommend taking the following steps to clean up your environment:

* The Twilio Functions related to the Salesforce integration are no longer needed and can be removed
* The TaskRouter Workflow filter for function-based click-to-dial is no longer needed. We recommend removing that filter.
* The outbound caller ID and voice recording option will no longer be configured within Flex Admin. You'll use the [Twilio console](https://www.twilio.com/console/flex/settings) instead.

## Upgrade to Generally Available version

> \[!NOTE]
>
> You are using the beta integration if you downloaded and deployed `plugin-flex-zendesk-integration` to your Flex Application yourself.

Upgrading from the beta release requires the following steps:

1. Make a note of entries in your `zdConfig.js` file - you will need these values when configuring the GA version of your Flex-Zendesk Integration
2. Navigate to **[Runtime>Assets](https://www.twilio.com/console/runtime/assets/public)** in your Twilio Console to delete the plugin (i.e. Beta version).
3. Delete the Functions created in the above steps by navigating to **[Runtime>Functions](https://www.twilio.com/console/runtime/functions/manage)**.
4. Follow the steps described in the **[Setup](/docs/flex/admin-guide/integrations/zendesk)**.

## \[Deprecated] Setting up Click-to-Dial using Functions

### Create Twilio Functions for Outbound Calling

Navigate to the [Flex-Zendesk integration template in the Twilio Console](https://www.twilio.com/console/runtime/functions/manage?template=flex-crm-integration) and click **Create**.

Close the window once the functions are created and visible in **[Runtime>Functions](https://www.twilio.com/console/runtime/functions/manage)**.

### Set up TaskRouter for Outbound Calling

You need to configure TaskRouter to ensure that we only route the call to the worker that clicked the phone number. To do this, you'll need to create a routing rule.

Navigate to [TaskRouter Workspace](https://www.twilio.com/console/taskrouter/workspaces) and go to the Workflow that you are using for the Outbound Call. Then, add a filter as shown in the following screenshot:

| ![OutboundFilter configuration showing matching tasks and workers with conditions and timeout settings.](https://docs-resources.prod.twilio.com/304add6ebf7f9d7f3cb63088fb69f98316bcd60cab46517afaae287656df2c59.png) |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
