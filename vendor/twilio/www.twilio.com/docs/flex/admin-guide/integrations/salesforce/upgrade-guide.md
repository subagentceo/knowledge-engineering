# Upgrade Guide for Flex-Salesforce

## Upgrading Click-to-Dial to Native Outbound

If you have been using our Flex-Salesforce Integration, you might remember deploying [Functions](https://www.twilio.com/console/functions/overview) to your Account. The Functions-based click-to-dial implementation can now be moved to a [Native Outbound Dialing](https://www.twilio.com/blog/flex-programmable-dialpad-outbound-calling) implementation. This provides the following benefits:

* Take advantage of the increased stability and scale of the Flex platform
* Gain access to additional features as they are rolled out for Outbound Dialing

> \[!NOTE]
>
> If you are configuring the SFDC plugin for the first time, then you will get
> the native implementation by default. You will not see the option to perform a
> migration, and you just need to ensure that the following prerequisites are
> satisfied.

### Prerequisites

* Flex UI needs to run on version >= 1.18.0
* [Enable Native Outbound Dialing](/docs/flex/admin-guide/setup/voice/dialpad/enable) on your Account

### Upgrade Steps

#### Step 1: Enable Native Outbound Dialing on your Account

Enable and configure the Flex Dialpad via the [Twilio console](https://www.twilio.com/console/flex/settings).

![Configure the Flex Dialpad.](https://docs-resources.prod.twilio.com/3d6688a67dea75e011a27318fad40b89cb18a5e54f8e12f3714d29bc78cfb8c0.png)

#### Step 2: Set up Flex Admin

Navigate to the [Salesforce Integration](https://flex.twilio.com/admin/integrations/salesforce) in the Flex Admin:

* A 'Migrate' button will be visible within the Salesforce configuration page.
* Click 'Migrate'. This will update the integration to rely on the Flex Dialpad.
* After completing the migration, you will be unable to revert to the Functions-based approach.

![Salesforce integration page with options to edit configuration and migrate click-to-dial.](https://docs-resources.prod.twilio.com/c6ab547260c92d674c4e2dd667cfb9da37e4fa68e27825c060a876e47292927d.png)

#### Step 3: Clean up your environment

After completing the migration, we recommend taking the following steps to clean up your environment:

* The Twilio Functions related to the Salesforce integration are no longer needed and can be removed
* The [TaskRouter Workflow filter](#set-up-taskrouter-for-outbound-calling) for function-based click-to-dial is no longer needed. We recommend removing that filter.
* The outbound caller ID and voice recording option will no longer be configured within Flex Admin. You'll use the [Twilio Console](https://www.twilio.com/console/flex/settings) instead.

## Upgrade to Generally Available version

> \[!NOTE]
>
> You are using the beta integration if you downloaded and deployed
> `plugin-flex-salesforce-integration` to your Flex Application yourself.

Upgrading from the beta release requires the following steps:

1. Make a note of entries in your `sfdcConfig.js` file - you will need these values when configuring the GA version of your Flex-Salesforce Integration
2. Navigate to **[Runtime>Assets](https://www.twilio.com/console/runtime/assets/public)** in your Twilio Console to delete the plugin (i.e. Beta version).
3. Delete the Functions created in the above steps by navigating to **[Runtime>Functions](https://www.twilio.com/console/runtime/functions/manage)**.
4. Follow the steps described in the **[Setup](/docs/flex/admin-guide/integrations/salesforce).**

## \[Deprecated] Setting up Click-to-Dial using Functions

### Create Twilio Functions for Outbound Calling

Navigate to the [Flex-Salesforce integration template in the Twilio console](https://www.twilio.com/console/runtime/functions/manage?template=flex-salesforce-integration) and click **Create**.

Close the window once the functions are created and visible in **[Runtime>Functions](https://www.twilio.com/console/runtime/functions/manage)**.

### Set up TaskRouter for Outbound Calling

To ensure that we only route calls to workers that click on phone numbers in Click-to-Dial scenarios, we need to create a routing rule.

Navigate to your [TaskRouter Workspace](https://www.twilio.com/console/taskrouter/workspaces) and select the Workflow you will use for outbound calls. Then, add a filter as shown in the following screenshot:

![OutboundFilter with task matching and worker routing settings for outbound calls.](https://docs-resources.prod.twilio.com/304add6ebf7f9d7f3cb63088fb69f98316bcd60cab46517afaae287656df2c59.png)

## \[Deprecated] Setup for the Beta Salesforce integration

If you deployed an older version of the Flex-Salesforce integration, you will need the following assets to repeat the setup process:

| Asset Type                                       | Asset Source(s)                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Flex-Salesforce Integration                      | [plugin-flex-salesforce-integration-0.3.0.js](https://media.twiliocdn.com/flex/integrations/plugin-flex-salesforce-integration-0.3.0.js)<br /><br />[plugin-flex-salesforce-integration-0.3.0.js.map](https://media.twiliocdn.com/flex/integrations/plugin-flex-salesforce-integration-0.3.0.js.map) |
| Call Center Definition File (Twilio-Hosted Flex) | [callCentreDefinition\_HostedFlex.xml](https://media.twiliocdn.com/flex/integrations/callCentreDefinition_HostedFlex.xml)                                                                                                                                                                            |
| Call Center Definition File (Self-Hosted Flex)   | [callCentreDefinition\_selfHost.xml](https://media.twiliocdn.com/flex/integrations/callCentreDefinition_selfHost.xml)                                                                                                                                                                                |
| Outbound Caller ID                               | [Phone Number](https://www.twilio.com/console/phone-numbers/incoming)                                                                                                                                                                                                                                |
| Flex-Salesforce Integration Configuration        | [sfdcConfig.js](https://media.twiliocdn.com/flex/integrations/sfdcConfig.js)                                                                                                                                                                                                                         |

**Note**: Instead of downloading the preceding assets, you can also directly point your implementation to the Asset Source paths mentioned.

By default, pointing your implementation to the source paths will sign you up for automatic updates - if you do not wish to subscribe to automatic updates, it's best to download the assets instead.

### Enable integrations with your Flex project

If any of the following applies to you, you will need to modify the *Flex-Salesforce Integration Configuration* file (`sfdcConfig.js`):

* You want to set up outbound dialing
* You want to use a global caller ID for agents who do not have a specified caller ID
* You have your own custom workflow that you'd like to use
* You have an existing customer channel that handles outbound voice calls

Your `sfdcConfig.js` file should look something like this:

```javascript
/*in Beta/GA, this will move to CRM configuration screens */
var sfdcConfig = {};

sfdcConfig.globalParams = {
  outboundWorkflowSid: "", //leave it empty,if using default Workflow
  outboundTaskChannel: "", //leave it empty,if using default Voice Channel
  SFDCBaseUrl: "https://someDomain-dev-ed--c.eu16.visual.force.com", // Your SFDC Org
};

sfdcConfig.agentParams = [];

// default Global Caller Id for outbound calls, when not specific caller Id has been
//defined for an agent in the worker attribute viz. callerId or below agentParams
window.sfdcConfig.defaultAgentParam = {
  outboundCallerId: "+447777777777",
};

// these are caller ids for various agents
//- you can use this setting here if not defining in worker attribute
sfdcConfig.agentParams["user1"] = {
  outboundCallerId: "+44777777777",
};

sfdcConfig.agentParams["user2"] = {
  outboundCallerId: "+44777777771",
};
```

Populate the relevant information in this file depending on your needs.
