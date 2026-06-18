# miniOrange

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

To create a miniOrange SAML Connection, you'll need an IdP Metadata URL.

Start by logging in to your WorkOS dashboard and browse to the "Organizations" tab on the left hand navigation bar.

Select the organization you'd like to configure a miniOrange SAML Connection for, and select "Manually Configure Connection" under "Identity Provider".

![A screenshot showing the Manual Configure Connection option in the WorkOS Dashboard.](https://images.workoscdn.com/images/24066931-e200-4e59-9996-3e28738a5b48.png?auto=format\&fit=clip\&q=50)

Select "miniOrange SAML" from the Identity Provider dropdown, enter a descriptive name for the connection, and then select the "Create Connection" button.

![A screenshot showing a miniOrange connection being created in the WorkOS Dashboard.](https://images.workoscdn.com/images/08437cb1-adc7-422e-83d9-4886cba0ece3.png?auto=format\&fit=clip\&q=50)

***

## What WorkOS provides

WorkOS provides the [ACS URL](https://workos.com/docs/glossary/acs-url), [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id) and [SP Metadata URL](https://workos.com/docs/glossary/sp-metadata). They're readily available in your Connection Settings in the [WorkOS Dashboard](https://dashboard.workos.com/). For this configuration, you should only need to use the SP Metadata URL, but other fields are provided should you choose to do a more manual configuration.

![A screenshot showing the Service Provider Details provided by WorkOS for a miniOrange connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/0cf5969a-7cc5-4646-89bb-b19a7c54ec60.png?auto=format\&fit=clip\&q=50)

***

## What you'll need

Next, provide the IdP Metadata URL. Normally, this information will come from the organization's IT Management team when they set up your application's SAML 2.0 configuration in their miniOrange admin dashboard. But, should that not be the case during your setup, the next steps will show you how to obtain it.

***

## (1) Select or create your application

Log in to [miniOrange](https://login.xecurify.com/moas/login), go to the admin dashboard and select "Apps" on the left side navigation. If your application is already created, select it from the list of applications and move to Step 2. Otherwise, select "Add Application".

![A screenshot showing where to select Add Application in the miniOrange dashboard.](https://images.workoscdn.com/images/d7abb7b9-41ad-4a8a-80e9-9f13fbfe7cc0.png?auto=format\&fit=clip\&q=50)

Under "SAML/WS-FED", select "Create App".

![A screenshot showing where to select Create App in the miniOrange dashboard.](https://images.workoscdn.com/images/036c42e8-fe89-4699-8149-878fa27cc3bb.png?auto=format\&fit=clip\&q=50)

Search for "custom" in the search box and select "Custom SAML App".

![A screenshot showing where to select Custom SAML App in the miniOrange dashboard.](https://images.workoscdn.com/images/7b5b3d54-f81b-4c72-a883-8d02f72c742e.png?auto=format\&fit=clip\&q=50)

***

## (2) Initial SAML Application Setup

Under the "Basic Settings" tab of the SAML app, select "Import SP Metadata".

![A screenshot highlighting the "Import SP Metadata" button in the miniOrange Dashboard.](https://images.workoscdn.com/images/e162dc6c-3b87-4811-935f-99c6625ac45a.png?auto=format\&fit=clip\&q=50)

Give the SAML app a descriptive name under "App Name". Under "SP Metadata", select "URL" and input the SP Metadata URL from your SSO Connection settings in the WorkOS Dashboard. Then, hit "Import".

![A screenshot showing how to enter an App name and input a metadata URL in the miniOrange dashboard.](https://images.workoscdn.com/images/fe57d767-efc5-4e64-8a11-cd3b1d939eb5.png?auto=format\&fit=clip\&q=50)

Make sure that you have the "Sign Assertion" field toggled on.

![A screenshot showing the "Sign Assertion" toggle activated in the miniOrange dashboard.](https://images.workoscdn.com/images/3100fed7-3173-4679-8151-2f30da20a062.png?auto=format\&fit=clip\&q=50)

Select "Next".

![A screenshot highlighting the "Next" button in the miniOrange dashboard.](https://images.workoscdn.com/images/91e21543-19e0-4c50-b9e9-dd5f954ef4b7.png?auto=format\&fit=clip\&q=50)

***

## (3) Configure SAML Application

Under the "Attribute Mapping" section of the SAML app, select "Add Attribute".

![A screenshot showing where to select "Add Attribute" in the miniOrange dashboard.](https://images.workoscdn.com/images/d72f5337-e2ee-412e-b3b4-153e4e406526.png?auto=format\&fit=clip\&q=50)

Map the following four attributes as shown below, and the select "Save".

- `id` → `Username`
- `email` → `E-Mail Address`
- `firstName` → `First Name`
- `lastName` → `Last Name`

![A screenshot showing how to input user attribute mapping in the miniOrange dashboard.](https://images.workoscdn.com/images/66a87e11-ce03-4426-b7b1-044a2c8e9f9a.png?auto=format\&fit=clip\&q=50)

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, follow the guidance below.

On your SAML app's Settings page, scroll down to "Attributes" and add a new attribute. Set the attribute's name to `groups` and map it to the "User Groups" field. Click "Save".

![A screenshot showing how to add a groups attribute in the miniOrange dashboard.](https://images.workoscdn.com/images/6ca4414d-fc41-455c-812f-353eb4e77459.png?auto=format\&fit=clip\&q=50)

> Finish role assignment set-up by navigating to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

***

## (4) Upload Metadata URL

Back on the "Apps" tab of the miniOrange Dashboard, click "Select" next to the app you've created. From the dropdown, select "Metadata".

![A screenshot highlighting where to select "Metadata" in the miniOrange dashboard.](https://images.workoscdn.com/images/39c6b33f-f3f3-4728-a70d-27672ae2e9f7.png?auto=format\&fit=clip\&q=50)

Under the "Information required to set miniOrange as IdP" section, click the icon next to "Metadata URL" to copy it to your clipboard.

![A screenshot showing where to copy the Metadata URL in the miniOrange dashboard.](https://images.workoscdn.com/images/42746ff9-c33a-4c14-85c0-273cb5a1939d.png?auto=format\&fit=clip\&q=50)

In the Connection settings in the WorkOS Dashboard, click "Edit Metadata Configuration".

![A screenshot highlighting the "Edit Metadata Configuration" button in a Connection details view in the WorkOS Dashboard.](https://images.workoscdn.com/images/5ad0b7db-f33a-4a06-acf5-83809feaa2ad?auto=format\&fit=clip\&q=50)

Paste the Metadata URL from miniOrange into the "Metadata URL" field and select "Save Metadata Configuration".

![A screenshot showing how to input the Metadata URL into the Connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/13ae3b21-964f-471b-972f-f5fc2b570ccd.png?auto=format\&fit=clip\&q=50)

Your Connection will then be linked and good to go!
