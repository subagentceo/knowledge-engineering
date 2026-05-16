# Set up Salesforce Service Cloud Voice (SCV) with Twilio

> \[!NOTE]
>
> Twilio for Salesforce Service Cloud Voice (SCV) is not a HIPAA Eligible Service or PCI compliant and should not be used in workflows that are subject to HIPAA or PCI.

## Overview

Follow this guide to set up [Salesforce Service Cloud Voice (SCV)](https://help.salesforce.com/s/articleView?id=service.voice_getting_to_know.htm\&type=5) with Twilio as the Partner Telephony Provider. This integration enables Salesforce service reps to make and receive calls in Salesforce using the capabilities of the Twilio platform.

The SCV integration currently supports the Voice channel.

## Features

Using SCV with Twilio, these features are available:

* Inbound calling using TaskRouter
* Outbound dialing using [Dialpad](/docs/flex/admin-guide/setup/voice/dialpad-configure) and Click-to-Dial
* Studio IVR
* [Real-time transcription](/docs/voice/twiml/transcription) using [Conversation Intelligence (classic)](/docs/conversation-intelligence-classic)
* Call recording and playback in Salesforce
* Omni-flow automation for voice call record creation
* Voice call record customization
* Supervisor barge-in and listen
* External Call Transfer

In addition, you can access this functionality from Twilio Console & Flex UI:

* [Real-time reporting and queue stats](/docs/flex/end-user-guide/real-time-reporting)
* [Historical reporting](/docs/flex/end-user-guide/insights) (if you use Flex Insights)

## Prerequisites

Before starting the setup process, make sure you have the following accounts:

* A Flex account
* An [Okta Workforce Identity developer account](https://developer.okta.com/signup/) or an account with another IdP that supports SAML 2.0.
* A [Salesforce Developer Edition](https://www.salesforce.com/form/developer-signup/?d=pb) account.

## Configure SSO for Salesforce and Flex

You need to set up single sign-on (SSO) both for your Flex account and your Salesforce account.

Follow the instructions in this section to use Salesforce or Okta as your identity provider (IdP).
You only need to follow the instructions for the IdP you choose. If you use an IdP other than Salesforce or Okta, your SSO configuration steps may differ from what's described in this document. In that case, follow the instructions documented for your IdP instead.

### Option 1: Set up Salesforce as your IdP

Follow the steps in [Configure SSO for Flex with Salesforce as IdP](/docs/flex/admin-guide/setup/sso-configuration/salesforce), making sure you do the following:

* Configure your Salesforce org as an IdP.
* Add Flex as a connected app in Salesforce.
* Check that your Salesforce users appear as agents in Flex after they log in to Flex using Salesforce as the IdP.

**Tip:** If you want to assign different roles to agents, you can [create a custom field in the Salesforce user object](https://help.salesforce.com/s/articleView?id=platform.adding_fields.htm\&type=5) (for example, a field named `Twilio_Role__c`) and then create a custom attribute with the same name as the **roles** value (for example, `$User.Twilio_Role__c`).

#### Configure Salesforce to assign user roles dynamically

If you want Salesforce to dynamically assign the user's role in the IdP based on their role in Twilio, create a custom field in the Salesforce **User** object to store the Twilio role.

1. In Salesforce, search for and select **Object Manager**.
2. Select the **User** object, click **Fields & Relationships**, then click **New**.
3. Create a field to store the user's role. For example, `Twilio_Role`.
4. Search for and select **Manage Connected Apps**.
5. Open the Flex connected app you created when you set up SSO and add a new custom attribute.
6. In **Key**, type `roles`.
7. In **Value**, insert the field you created to store the user's role. If you named the field `Twilio_Role`, you'll see the value formatted as `$User.Twilio_Role`.

This ensures that SSO takes the role value from the custom field on the User object.

### Option 2: Set up Okta as your IdP

#### Configure Salesforce to use Okta as the IdP

To see a video walkthrough of this process, refer to [Okta and Salesforce SAML SSO Integration](https://www.youtube.com/watch?v=jBVA2VwFm2k).

1. Log in to your Okta developer account and go to **Applications** > **Browse App Catalog**.
2. Select Salesforce, then click **Add Integration**.
3. Keep the default values, then click **Next**.
4. In the sign-on options, select **SAML 2.0**.
5. Click **View Setup instructions**, then follow the instructions to configure SSO in Salesforce.
6. To let Okta and Salesforce share users and groups, configure provisioning using the following Okta documentation:
   * [Enable Salesforce provisioning | Okta Classic Engine](https://help.okta.com/en-us/content/topics/provisioning/salesforce/sfdc-enable-provisioning.htm)
   * [Configure OAuth and REST integration | Okta Classic Engine](https://help.okta.com/en-us/content/topics/provisioning/salesforce/sfdc-configure-provisioning-rest.htm)
7. When you've completed the provisioning steps, assign users in Okta.
8. In Salesforce, in your organization, go to **Domains**, then select the SSO setting you created as the sign-in method. This enables Salesforce-initiated login.

#### Configure Flex to use Okta as the IdP

1. To complete the basic setup, follow the steps in [Configure Okta IdP with Flex](/docs/flex/admin-guide/setup/sso-configuration/okta).
2. In Okta, add agents to the Flex app and assign them Flex roles.
3. To test your configuration, log in to Flex as an agent and confirm you have the expected permissions.

**Tip**: Check your Okta configuration to confirm that the same user is assigned to both Salesforce and Flex.

#### Add Salesforce as a trusted origin in Okta

1. In Okta, go to the Admin Console.
2. Navigate to **Security** > **API** > **Trusted Origins**.
3. Add your Salesforce lightning org URL as a trusted origin.

## Enable Salesforce Service Cloud Voice

1. In Salesforce, go to the **Setup Home** page. You can access this page using the [Setup menu](https://help.salesforce.com/s/articleView?id=xcloud.basics_nav_setup.htm\&type=5).
2. Search for and select **Partner Telephony Setup**.
   The **Service Cloud Voice** page appears.
3. In the **Enable Service Cloud Voice** section, enable **Turn on Voice with Partner Telephony**.

## Configure Salesforce permissions

1. Add a permission set group. For instructions, follow the Salesforce documentation [Create a Permission Set Group](https://help.salesforce.com/s/articleView?id=platform.perm_set_groups_create.htm\&type=5).
2. Add the following permission sets to the group:
   * Contact Center Admin (Partner Telephony)
   * Contact Center Agent (Partner Telephony)
   * Partner Telephony Permission Set
     **Tip**: if you don't see Partner Telephony Permission Set as an option, try turning off Service Cloud Voice and turning it back on.

     After adding these permission sets, you can see them in your permission set group.
3. Return to the **Permission Set Groups** page and click **Manage Assignments** to assign this group to your users.

If you want to enable recording, an additional permission set is required. The steps to add this permission set are covered later in this document in the [Enable call recording](#enable-call-recording) section.

## Create credentials

For Salesforce to integrate with Twilio, you need to create both external and named credentials in your Salesforce org.

You can create an external credential that either uses your Twilio account credentials (account SID and auth token) or that uses an API key you generate in Twilio Console.

We recommend using a restricted API key because it's more secure, avoids using your auth token directly, and provides scoped access.

### Generate a Twilio restricted API key

1. Open Twilio Console.
2. On your account dashboard, in the **Account Info** section, click **Go to API Keys**.
3. On the **[API keys & tokens](https://console.twilio.com/us1/account/keys-credentials/api-keys)** page, click **Create API key**.
4. Set the **Key type** to **Restricted - Beta**.
5. In the **Permissions** section, in the **Product and associated resources** table, expand **Flex**, then select **`scv-certificate`**.
6. Click **Create**.
7. Copy the secret key and store it in a safe location. You'll need to enter its values in Salesforce.

### Create external credentials

1. From the Salesforce **Setup Home** page, search for and select **Named Credentials**.
2. Select the **External Credentials** tab.
3. Create a new credential for Twilio Flex, set the **Authentication Protocol** to **Basic Authentication**, then click **Save**.
4. Within your Twilio Flex external credential, go to the **Principals** section and create a new principal.
5. Set the **Username** and **Password** as follows:
   * If you generated an API key to use for your credentials, set the **Username** to the SID generated with your key and the **Password** to your secret.
   * If you want to directly use your Flex account credentials, set the **Username** to your Flex Account SID and the **Password** to your Flex Auth Token.
6. Click **Save**.

### Create named credentials

1. Return to the **Named Credentials** page.
2. Create a new named credential with the following values.
   | Field                          | Value                                                                     |
   | ------------------------------ | ------------------------------------------------------------------------- |
   | Label                          | Any recognizable label name.                                              |
   | Name                           | Set to **Twilio\_Flex**.                                                  |
   | URL                            | Set to [https://flex-api.twilio.com](https://flex-api.twilio.com).        |
   | Allowed Namespace for Callouts | Twilio\_Scv                                                               |
   | Authentication                 | Set to the External Credentials list for the credential you just created. |
3. Go to **Profiles**, then select the profile of your user. For example, System Administrator.
4. Go to the **Enabled External Credential Principal Access** section and click **Edit**.
5. Select the external credential you created and add it to **Enabled External Credential Principals**.

## Install Twilio Flex Partner Telephony package

1. In Salesforce, view the [TwilioScv installation package](https://login.salesforce.com/packaging/installPackage.apexp?p0=04tVr000000sbFVIAY).
2. Select **Install for All Users**.
3. Expand **Advanced Options**, then select **Compile only the Apex in the package**.

> \[!WARNING]
>
> When you install the package in a Production or Sandbox environment that already contains Apex classes, make sure to select Compile only the Apex in the package. If you use the default compilation option, the installer might detect conflicts and fail.

## Create and configure your Salesforce contact center

1. From the Salesforce **Setup Home** page, search for and select **Partner Telephony Contact Center**.
2. In the **Set Up Your Contact Center** section, next to **Create Your Contact Center**, click **New**.
3. In the **New Partner Contact Center for Voice** dialog:
   1. Select Twilio, then click **Next**.
   2. Enter the **Display Name** and **API Name**, then click **Next**.
   3. Enter the following information, then click **Next**:
      * In **Twilio Account Sid**, add your Flex Account Sid.
      * In **Twilio Instance Sid**, add your Flex Instance Sid.
      * Real Time Transcritpion is disabled by default. If you want to enable it, select **Enabled** in the dropdown.
   4. Select the **Named Credential** you created in the previous section.
   5. Click **Confirm and finish Contact Center creation**.

If you've successfully linked your Twilio account, you'll see that a **Disconnect Account** button has replaced the **Connect Account** button on the **Contact Center Details** page. If you still see **Connect Account**, your Twilio account was not linked correctly and you must try this process again.

If the **Salesforce Create Contact Center** page disappeared before you could select a named credential, go to the contact center you just created and click **Connect Account** to select the named credential.

**Note**: If setup fails, remove the Contact Center from Partner Telephony settings before uninstalling the Twilio package. This step prevents user interface errors.

## Configure contact center settings

1. Go to your newly created contact center and verify that the information is accurate.
2. Add your user to the contact center. For instructions, follow the Salesforce documentation [Manage Call Center Users](https://help.salesforce.com/s/articleView?id=service.cti_admin_manageagents.htm\&type=5).

**Tip**: If you previously set up a call center in your Salesforce org (for example, using [Salesforce Open CTI](https://help.salesforce.com/s/articleView?id=service.cloud_cti_api_overview.htm\&type=5)), you need to remove users from the call center before assigning them to your contact center. Salesforce users can only belong to one call center or contact center at a time.

## Configure Supervisor settings

Using SCV with Twilio provides the following supervisor functionality:

* Agents can flag a supervisor for help.
* Supervisors can listen in on a call.
* Supervisors can barge in on a call to provide assistance to the agent and customer.

To configure a supervisor user:

1. Assign the Contact Center Supervisor (Partner Telephony) permission set to a permissions set group. For instructions, see the Salesforce documentation [Create a Permission Set Group](https://help.salesforce.com/s/articleView?id=platform.perm_set_groups_create.htm\&type=5).
2. Assign that permission set group to users with the supervisor profile.

### Enable Omni Supervisor

Omni Supervisor provides an agent summary that allows supervisors to view all available agents. To learn more about Omni Supervisor features, see the Salesforce documentation [Set Up Omni Supervisor](https://help.salesforce.com/s/articleView?id=service.omnichannel_supervisor_intro.htm\&type=5). If your Flex account has Flex Insights enabled, supervisors can [view other metrics from the Flex dashboard](/docs/flex/end-user-guide/insights).

To enable Omni Supervisor for your SCV integration:

1. Search for and select **App Manager**, then find **Twilio for Service Cloud Voice**. This app was added when you installed the Twilio Partner Telephony package.
2. Click **Edit**.
3. In **App Settings**, click **Navigation Items**.
4. Add **Omni Supervisor** to your **Selected Items**, then click **Save**.

## Configure presence statuses

1. From the Salesforce **Setup Home** page, search for and select **Presence Statuses**.
2. Create a new status for each status that exists in your TaskRouter Activities. For example, Available and Offline. Creating the same statuses in Salesforce that you have in TaskRouter ensures that the user's status remains synced between Flex and Salesforce.
3. Go to **Users** > **Profiles**, then select the profile of your user. For example, System Administrator.
4. Find **Enabled Service Presence Status Access**, then click **Edit**.
5. Add your statuses to **Enabled Service Presence Statuses**.
6. Assign these statuses to profiles of users in the contact center.

## Add trusted URLs

1. From the Salesforce **Setup Home** page, search for and select **Trusted URLs**.
2. Add a trusted URL for the URL of the IdP used for your Flex instance. Make sure that you keep **CSP Context** as **All**.
3. In Twilio Console, go to **Flex** > **Users and Access** > **[Single Sign-On](https://console.twilio.com/us1/develop/flex/users-and-access/single-sign-on)**.
4. Edit your SSO configuration.
5. In the **Trusted URLs** field, add `https://assets.flex.twilio.com/assets/twilio-scv-sdk/prod/1.0.0/index.html`.
6. Click **Save**.

## Enable After Conversation Work (ACW) for Salesforce

If you want to use this feature, follow the Salesforce documentation [Configure After Conversation Work Time](https://help.salesforce.com/s/articleView?id=service.omnichannel_configure_after_conversation_work_time.htm\&language=en_US\&type=5).

## Test the contact center as an agent

1. Use SSO to log in to Salesforce as the agent user you configured earlier in the process.
2. Navigate to **Setup** > **App Launcher**, then select the Service Cloud Voice app.
3. After the app launches, verify the following:
   * You can see the omni-channel widget, which is a dialpad that appears on the left side of the screen.
   * The system uses SSO to automatically sign you in to Flex.
   * You can make or receive voice calls.
   * Calls you make to the configured Twilio number are routed to Service Cloud Voice and appear in the agent omni-channel widget in Salesforce.

**Tip**: Ensure that third-party cookies are enabled before testing in incognito mode or a new browser window.

## Passing IVR attributes to Salesforce

To pass IVR attributes from Studio to Salesforce, you must create a custom field in the Salesforce Voice Call object and map that field to attributes you add to the Send to Flex widget in your Studio Flow.

This section uses the example of passing the case ID to Salesforce. In your implementation, use a naming convention that suits your use case.

### Create a field in the Salesforce Voice Call object

Create a field to store the attributes passed from Studio. The Studio data must match your Salesforce field setup, so how you name this field also establishes how you'll name your Studio attributes.

1. From the Salesforce **Setup Home** page, search for **Voice Call** and select the result for the Object Manager.
2. Follow [Salesforce's instructions to create a custom field](https://help.salesforce.com/s/articleView?id=platform.adding_fields.htm\&type=5).
3. Make sure you set the **Data Type** to **Text**. This is required because Studio passes its attributes as a string.

The following screenshot shows an example field definition. Notice the **API Name** field. Whatever name you set for this field, you must use the same name when you create the field in your Studio attributes.

![Adding a new field to the Voice Call object in Salesforce.](https://docs-resources.prod.twilio.com/c5bae8de98b6df0148a259845f785b371717396fae3e1b33abcefcc2f7c490f2.png)

### Configure your Studio IVR

1. Identify or create the Studio Flow that gathers the custom input you want to send to Salesforce. If you need help creating a new Flow, see [How to build an IVR with Twilio Studio](/docs/studio/tutorials/how-to-build-an-ivr).
2. In your Flow, route your \[Gather Input on Call]/docs/studio/widget-library/gather-input-call) widget the [Send to Flex](/docs/studio/widget-library/send-flex) widget.
3. In the Send to Flex widget's **Attributes** section, add code to define the following:
   * The field name. This must be the same as the API Name from your Salesforce field.
   * The name of the widget in your Flow that gathers customer input. This is represented as MY\_WIDGET\_NAME in the following example:

```javascript
{
  "fieldName": {{widgets.MY_WIDGET_NAME}}
}
```

The following screenshot shows an example of the required Studio configuration. Notice how the Send to Flex widget's attributes reference both the Salesforce **API Name** and the name of the widget that collects the information to pass.

![Setting custom attributes in the Send to Flex widget.](https://docs-resources.prod.twilio.com/c3505015bdbe2f13c3958a208a2ef55299f129e018ae1cf2dbe336f7c9cd95fa.png)

## Make an outbound call

To make an outbound call, enable [Flex Dialpad](/docs/flex/admin-guide/setup/voice/dialpad-configure) and make sure you select a default caller ID.

## Call recording and transcription

### Enable call recording

To enable call recording in Flex:

1. In Twilio Console, go to **Flex** > **Channel management** > **[Voice](https://console.twilio.com/us1/develop/flex/channels/voice)**.
2. In the **Call Recording** section, select **Enabled**.

If you want agents to be able to pause and resume call recordings, follow these steps in Salesforce:

1. In your Salesforce org, return to your permission sets, and then clone the permission set assigned to your agents.
2. Edit the cloned permission set and enable the **Control Call Recording** permission.
3. Assign the updated permission set to your agents.

With call recording enabled, the recording is available for playback on the **Voice Call Record** page in Salesforce after a call ends. Playback includes full controls and supports variable playback speeds.

### Call transcription

Call transcription is available using [Twilio Conversation Intelligence (classic)](/docs/conversation-intelligence-classic). If you use Conversation Intelligence (classic) alongside your Salesforce integration, real-time transcription appears in the **Conversations** tab in Salesforce as soon as a call connects.

If you want to use Twilio Conversation Intelligence (classic) capabilities, such as Language Operators, to analyze SCV call transcriptions, create a new Intelligence Service with the unique name **scv-intelligence-service**.
All call transcriptions appear under **Conversation Intelligence (classic)** > **Transcripts** in the Twilio Console. If you want to add Language Operators, you can configure them within the **scv-intelligence-service** that you created.

> \[!WARNING]
>
> To delete a call transcript, you must both remove the data from your Salesforce instance and [delete the transcript from your Twilio account](/docs/voice/api/recording-transcription#delete-a-transcription).
