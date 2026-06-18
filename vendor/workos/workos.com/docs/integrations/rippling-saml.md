# Rippling SAML

## Introduction

Each SSO Identity Provider requires specific information to create and
configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create
a Connection will differ by Identity Provider.

To create a Rippling SAML Connection, you'll need the Identity Provider metadata that is available from creating an app within the Rippling instance.

Start by logging in to your WorkOS dashboard and browse to the "Organizations" tab on the left hand navigation bar.

Select the organization you wish to configure a Rippling SAML Connection for, and select "Manually Configure Connection" under "Identity Provider".

![A screenshot showing where to select "Manually Configure Connection" in the WorkOS dashboard.](https://images.workoscdn.com/images/8fb3c79a-f154-4e74-ac23-0330f36dbb62.png?auto=format\&fit=clip\&q=80)

Select "Rippling SAML" from the Identity Provider dropdown, enter a descriptive name for the connection, and then select the "Create Connection" button.

![A screenshot showing the "Create Connection" modal with options configured in the WorkOS dashboard.](https://images.workoscdn.com/images/75e3d01e-a653-4ab5-a460-caced555226f.png?auto=format\&fit=clip\&q=80)

***

## Introduction

WorkOS provides the [ACS URL](https://workos.com/docs/glossary/acs-url) and [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id). They're readily available in your Connection Settings in the [WorkOS Dashboard](https://dashboard.workos.com/)

![A screenshot showing the "ACS URL" and "SP Entity ID" in the WorkOS dashboard.](https://images.workoscdn.com/images/b1d10058-5f92-441f-8f3d-615983e93489.png?auto=format\&fit=clip\&q=80)

The ACS URL is the location an Identity Provider redirects its authentication response to.

The Entity ID is a URI used to identify the issuer of a SAML request, response, or assertion. In this case, the Entity ID is used to communicate that WorkOS will be the party performing SAML requests to the organization's Rippling instance.

***

## What you'll need

In order to integrate you'll need the Rippling IdP metadata.

Normally, this information will come from the organization's IT Management team when they set up your application's Rippling configuration. But, should that not be the case during your setup, here's how to obtain them.

***

## (1) Create A New SAML Application In Rippling

Log in to Rippling as an administrator and select "IT Management" then "Custom App" from the left-side navigation bar.

!["A screenshot showing where to select "Custom App" in the Rippling dashboard.](https://images.workoscdn.com/images/a56252d2-4e9a-4839-b540-0239b0360756.png?auto=format\&fit=clip\&q=80)

Select "Create New App" to begin creating a new SAML application.

![A screenshot showing where to select "Create New App" in the Rippling dashboard.](https://images.workoscdn.com/images/49a2345a-bacc-4332-ad2d-a43f4884279f.png?auto=format\&fit=clip\&q=80)

Give the app a descriptive name, select a category, and upload a logo file. Make sure to check the box for "Single Sign-On (SAML)", then click "Continue".

![A screenshot showing where to configure the new app's "Name", "Categories", and app type in the Rippling dashboard.](https://images.workoscdn.com/images/f2d7947a-81eb-459d-b823-a84fc2e031ed.png?auto=format\&fit=clip\&q=80)

Select the option confirming that you are the Application Admin. Rippling will display a new page with "SSO Setup Instructions" we will use in the next step.

![A screenshot showing the configuration of the "Who should install the SAML App?" setting in the Rippling dashboard.](https://images.workoscdn.com/images/2a71a48e-3765-4d85-8cb2-a0111ff2c28a.png?auto=format\&fit=clip\&q=80)

## (2) Download IdP Metadata From Rippling

Rippling will present the SSO Setup instructions which will include the [IdP Metadata](https://workos.com/docs/glossary/idp-metadata) XML file. Click to download the file from Rippling.

![A screenshot showing where to download the IdP Metadata in the Rippling dashboard.](https://images.workoscdn.com/images/b58647d3-283c-4151-b714-9b0c5c8c33b3.png?auto=format\&fit=clip\&q=80)

Save this file in a memorable place, as we will upload it to the WorkOS dashboard in a later step.

***

## (3) Enter Service Provider Details and Configure App Settings

Scrolling down on the SSO Setup Instructions, Rippling will request the ACS URL and Service Provider Entity ID.

Input the ACS URL and SP Entity ID from the WorkOS dashboard into the respective fields.

Once complete, click the "Move to Next Step Button".

![A screenshot showing where to input the WorkOS ACS URL and SP Entity ID in the Rippling dashboard.](https://images.workoscdn.com/images/482b6b5e-8c29-4675-8de9-a3bbe1240c3c.png?auto=format\&fit=clip\&q=80)

Select your desired Access Rules.

![A screenshot showing where to select SSO Access Rules in the Rippling dashboard.](https://images.workoscdn.com/images/f0833317-cb61-4b92-894d-c2c66a0d1af3.png?auto=format\&fit=clip\&q=80)

Select your desired Provision Time.

![A screenshot showing where to select Provision Time in the Rippling dashboard.](https://images.workoscdn.com/images/98f45313-64ab-4bc5-b1c9-aabfa4ef3478.png?auto=format\&fit=clip\&q=80)

Configure SSO for Admins if necessary.

![A screenshot showing where to configure Admin SSO in the Rippling dashboard.](https://images.workoscdn.com/images/9b5ac438-7bc6-4e76-92b5-db21ce8e79ba.png?auto=format\&fit=clip\&q=80)

Configure Group Attributes if necessary.

![A screenshot showing where to configure Group Attributes in the Rippling dashboard.](https://images.workoscdn.com/images/8c0b2600-a5b7-46df-80d1-347daff1840c.png?auto=format\&fit=clip\&q=80)

Verify your SSO integration if you want to test the connection.

![A screenshot showing where to verify an SSO connection in the Rippling dashboard.](https://images.workoscdn.com/images/0d1c0474-ae85-46a9-982b-0eec7f8ab4e0.png?auto=format\&fit=clip\&q=80)

Click "Visit the app". The application settings will be presented, here we will configure the SAML attribute mapping in the next step.

![A screenshot showing where to select "Visit the app" in the Rippling dashboard.](https://images.workoscdn.com/images/f67e94c8-99db-462c-943a-98e58c086fd6.png?auto=format\&fit=clip\&q=80)

***

## (4) Configure Attribute Mapping

Select the "Settings" tab then on the left navigation select "SAML Attributes" and use the "Create new" button. Add attributes as "Global attributes".

![A screenshot showing where to select "Create New" in the "SAML Attributes" in the Rippling dashboard.](https://images.workoscdn.com/images/8b900811-0089-4e56-a770-06bae8d097b6.png?auto=format\&fit=clip\&q=80)

Input the attributes as follows:

- `id` → `User's ID`
- `email` → `User's email address`
- `firstName` → `User's Legal first name`
- `lastName` → `User's Legal last name`

Here is a screenshot showing the proper final configuration:

![A screenshot showing the proper configuration of the "SAML Attributes" in the Rippling dashboard.](https://images.workoscdn.com/images/73bc17dc-fc0f-43f6-901f-a6bcd92caf17.png?auto=format\&fit=clip\&q=80)

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, follow the guidance below.

Create a new SAML attribute and select the "Group attribute" type. Click "Continue".

![A screenshot showing how to add a group attribute in the Rippling dashboard.](https://images.workoscdn.com/images/1d904a73-9e49-4e44-b0fe-e8a2bdb9203d.png?auto=format\&fit=clip\&q=80)

Enter `groups` for the "Group attribute name".

![A screenshot showing what to name a group attribute in the Rippling dashboard.](https://images.workoscdn.com/images/3bbab635-f5e1-48b0-b39f-11ec75669d68.png?auto=format\&fit=clip\&q=80)

Select the attribute values to map to the group attribute. The example below shows two values, "Admins" and "Engineers", that map to the "All Admins" user group and the "Engineering Department" user group, respectively.

![A screenshot showing how to map the group attribute for Admins in the Rippling dashboard.](https://images.workoscdn.com/images/5a113ba9-0874-4574-95ab-a7e462dd856a.png?auto=format\&fit=clip\&q=80)

> Finish role assignment set-up by navigating to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

***

## (5) Disable the 'InResponseTo' Field

In the "Settings" tab, on the left navigation select "Advanced SAML Settings" and use the "Edit" button to set "Disable 'InResponseTo' field in assertions for IdP initiated SSO" to true by checking the box to enable the setting.

![A screenshot showing where to enable the "Disable 'InResponseTo' field in assertions for IdP initiated SSO" setting in the Rippling dashboard.](https://images.workoscdn.com/images/46ec2824-7e3d-4b9f-93c1-56042e268477.png?auto=format\&fit=clip\&q=80)

The 'InResponseTo' field is primarily used for IdP-initiated SSO and enabling this setting allows WorkOS to accept both SP and IdP initiated SSO from Rippling.

Click the "Save" button to save this setting. In the next step, we will complete the integration by uploading the Metadata XML file to the WorkOS Dashboard.

***

## (6) Update Metadata File

Return to the Rippling connection in the WorkOS dashboard and select "Edit Metadata Configuration".

![A screenshot showing where to select "Edit Metadata Configuration" in the WorkOS dashboard.](https://images.workoscdn.com/images/418a58ed-1370-4243-8c93-400c5c19d0b0.png?auto=format\&fit=clip\&q=80)

Upload the XML metadata file from Rippling into the "Metadata File" field and select "Save Metadata Configuration".

![A screenshot showing where to select "Save Metadata Configuration" in the "XML File Metadata Configuration" modal in the WorkOS dashboard.](https://images.workoscdn.com/images/234fcc8b-e96a-4c66-8f7f-d2750ba337da.png?auto=format\&fit=clip\&q=80)

Your Connection will then be linked and good to go!
