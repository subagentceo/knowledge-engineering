# PingFederate SAML

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

To create a PingFederate SAML Connection, you'll need the Identity Provider metadata that is available from your PingFederate instance.

***

## What WorkOS provides

WorkOS provides the [ACS URL](https://workos.com/docs/glossary/acs-url) and [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id). It's readily available in your Connection Settings in the [WorkOS Dashboard](https://dashboard.workos.com/get-started).

![A screenshot showing where to find the ACS URL and SP Entity ID in the WorkOS Dashboard.](https://images.workoscdn.com/images/f0528e51-bb50-438c-b837-f355af202b60.png?auto=format\&fit=clip\&q=50)

The ACS URL is the location an Identity Provider redirects its authentication response to. In PingFederate's case, the ACS URL needs to be set by the organization when configuring your application in their PingFederate instance.

Specifically, the ACS URL needs to be set as the "Endpoint URL" when defining the Protocol Settings in the SP Connection for WorkOS.

![A screenshot showing where the ACS URL needs to be set in the PingFederate settings.](https://images.workoscdn.com/images/7c626b2d-59be-489f-9890-4758e287dfbb.png?auto=format\&fit=clip\&q=50)

The SP Entity ID is a URI used to identify the issuer of a SAML request, response, or assertion. In this case, the entity ID is used to communicate to that WorkOS will be the party performing SAML requests to the organization's PingFederate instance.

Specifically, the SP Entity ID needs to be set as the "Partner's Entity ID (Connection ID)" when defining the General Info Settings in the SP Connection for WorkOS.

![A screenshot showing where to set the SP Entity ID in the PingFederate settings.](https://images.workoscdn.com/images/09d9fda5-5f4f-4920-ab96-951e0a44d158.png?auto=format\&fit=clip\&q=50)

***

## What you'll need

In order to integrate you'll need the PingFederate IdP metadata.

Normally, this information will come from the organization's IT Management team when they set up your application's SAML 2.0 configuration in their PingFederate admin dashboard. However, that should not be the case during your setup. Here's how to obtain them:

***

## (1) Log In and Select Your Application

Log in to your PingFederate instance, go to the admin dashboard, select "Applications" at the top, and select the "SP Connections" menu option.

![A screenshot showing where to find the SP Connections section in the PingFederate admin dashboard.](https://images.workoscdn.com/images/6b0049f8-faf1-45d5-b352-58215cfc3f4a.png?auto=format\&fit=clip\&q=50)

***

## (2) Obtain Identity Provider Metadata

On the SP Connection list, find your WorkOS SAML 2.0 connection. Click on the "Select Action" menu and then select "Export Metadata" to download the IdP metadata.

![A screenshot showing where to download the IdP metadata file in PingFederate.](https://images.workoscdn.com/images/6fece896-4310-40fc-9b40-be471f5ea85b.png?auto=format\&fit=clip\&q=50)

Keep in mind where the file was saved, as we'll be later uploading it to configure the Connection.

***

## (3) Configure Attribute Mapping

In the SP Connections dashboard, click into your desired connection. From there, click into the "Activation & Summary" tab, then click "Attribute Contract". You will need to add `id`, `email`, `firstName`, and `lastName` as attributes. Once configured, click "Next".

![A screenshot showing where to configure attribute mapping in PingFederate.](https://images.workoscdn.com/images/c6568ddb-76f4-4da1-80c4-d0964ae469dc.png?auto=format\&fit=clip\&q=50)

You will now need to configure an Authentication Policy Contract. To do so, click "Map New Authentication Policy", then click "Manage Policy Contracts" and "Create New Contract". Name your contract, then go to the next step and add the same four attributes we configured above. Continue through the steps, then click "Save".

![A screenshot showing where to extend the Authentication Policy Contract in PingFederate.](https://images.workoscdn.com/images/c6fb23be-81b2-4415-9fb5-655e58e60490.png?auto=format\&fit=clip\&q=50)

On the "Authentication Policy Mapping" page, select the Authentication Policy Contract you just made and click "Next". In the "Attribute Contract Fulfillment" tab, How you map values to the attributes listed above may differ based on how your PingFederate instance is set up. Below is an example of mapped values from both an Authentication Policy Contract and an LDAP directory. From there, save your settings on the "Summary" tab to lock in the configuration.

![A screenshot showing an example of Authentication Policy Mappings in PingFederate.](https://images.workoscdn.com/images/2141c568-0821-4aa1-899c-3fca01ecf596.png?auto=format\&fit=clip\&q=50)

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, follow the guidance below.

Navigate back to the "Attribute Contact" page and define a `groups` attribute.

![A screenshot showing where to define a groups attribute in PingFederate.](https://images.workoscdn.com/images/0aa645c4-a588-4044-aaab-a57f3e546bdc.png?auto=format\&fit=clip\&q=50)

Then, navigate to the "Attribute Contract Fulfillment" page and map the new `groups` attribute to the data in your provider that includes group memberships, such as the `isMemberOf` LDAP attribute in the example below.

![A screenshot showing a mapped groups attribute in the Attribute Contract Fulfillment area in PingFederate.](https://images.workoscdn.com/images/6115e8ae-c34e-4131-9d94-e6adfd94e9c1.png?auto=format\&fit=clip\&q=50)

> Finish role assignment set-up by navigating to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

***

## (4) Upload Metadata File

In the connection settings of the WorkOS Dashboard, click "Edit Metadata Configuration".

![A screenshot showing where to edit the Metadata Configuration in the WorkOS Dashboard.](https://images.workoscdn.com/images/2b0764f7-e045-435d-a7ed-05283f7432ac.png?auto=format\&fit=clip\&q=50)

In the modal, upload the PingFederate Metadata file and then select "Save Metadata Configuration". Once the file is uploaded into WorkOS, your connection will then be linked and good to go!

![A screenshot showing where to upload the Metadata file in the WorkOS Dashboard.](https://images.workoscdn.com/images/5145a2f5-63d4-43c6-97a5-c86819d0c94b.png?auto=format\&fit=clip\&q=50)
