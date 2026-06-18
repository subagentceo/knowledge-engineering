# Salesforce SAML

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [connection](https://workos.com/docs/glossary/connection). And often, the information required to create a connection will differ by Identity Provider.

To create an Salesforce SAML connection, you'll need three pieces of information: an [ACS URL](https://workos.com/docs/glossary/acs-url), an [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id), and a [Metadata URL](https://workos.com/docs/glossary/idp-metadata).

***

## What WorkOS provides

WorkOS provides the ACS URL and SP Entity ID. It's readily available in your Connection Settings in the [WorkOS dashboard](https://dashboard.workos.com/).

![A screenshot showing where to find the ACS URL and SP Entity ID in the WorkOS dashboard.](https://images.workoscdn.com/images/134a9a2e-3409-4969-9048-01be960c7d93.png?auto=format\&fit=clip\&q=50)

The ACS URL is the location an Identity Provider redirects its authentication response to. In Salesforce's case, it needs to be set by the organization when configuring Salesforce as an Identity Provider.

The Entity ID is a URI used to identify the issuer of a SAML request, response, or assertion. In this case, the entity ID is used to communicate that WorkOS will be the party performing SAML requests to the organization's Salesforce instance.

Specifically, the ACS URL and SP Entity ID will need to be set in the Connected Apps setup in Salesforce.

![A screenshot showing where to place the WorkOS ACS URL and SP Entity ID in the Salesforce dashboard.](https://images.workoscdn.com/images/98390601-4c8a-42f4-9965-52ddcd28ff45.png?auto=format\&fit=clip\&q=50)

***

## What you'll need

In order to integrate you'll need the Salesforce Metadata URL. Normally, the this will come from the organization's IT Management team when they set up your application's SAML client in their Salesforce instance. But, should that not be the case during your setup, here's how to obtain it.

***

## (1) Generate Certificate

Log in to your Salesforce Account, click the Settings cog icon on the top right, and select "Setup".

Once in setup mode you can use the search bar to easily navigate around between settings pages. The first page to navigate to is the "Certificate and Key Management" page.

![A screenshot showing how to navigate to the "Certificate and Key Management" page in the Salesforce dashboard.](https://images.workoscdn.com/images/769b9580-ffc1-46d6-b382-4b5a83222dd8.png?auto=format\&fit=clip\&q=50)

Once in setup mode you can use the search bar to easily navigate around between settings pages. The first page to navigate to is the "Certificate and Key Management" page. If a key does not exist that you would like to use, click "Create Self-Signed Certificate" to generate a new one.

![A screenshot showing how to generate a Self-Signed Certificate in the Salesforce dashboard.](https://images.workoscdn.com/images/fc278a8b-3398-46ff-9a58-143dc127d0e6.png?auto=format\&fit=clip\&q=50)

Give the Certificate a meaningful label and unique name and select the Key Size you'd like to use. It's not necessary to have an Exportable Private Key, but if you are using a key-certificate store you can choose this option.

![A screenshot showing how to configure the Self-Signed Certificate details in the Salesforce dashboard.](https://images.workoscdn.com/images/936558fc-d9c3-4075-a139-3cea3d3854dc.png?auto=format\&fit=clip\&q=50)

***

## (2) Enable Salesforce as an IdP

From the setup search bar browse to the "Identity Provider" portal in Salesforce.

If it has not already been done, select "Enable Identity Provider".

![A screenshot showing how to enable Salesforce as an Identity Provider in the Salesforce dashboard.](https://images.workoscdn.com/images/f890533c-dd88-4b05-9cbe-e47b3a416906.png?auto=format\&fit=clip\&q=50)

You will need to select the correct certificate from the previous step.

![A screenshot showing how to select the SAML certificate for the Identity Provider setup in the Salesforce dashboard.](https://images.workoscdn.com/images/f332f289-dad3-491d-a1c3-67e14e381cfc.png?auto=format\&fit=clip\&q=50)

Additionally this page will display the Metadata URL. You will need to copy this URL and in a later step it will be uploaded into WorkOS.

![A screenshot showing where to copy the IdP Metadata URL from in the Salesforce dashboard.](https://images.workoscdn.com/images/e5088944-d7b5-4e3f-8072-d672bbd88f26.png?auto=format\&fit=clip\&q=50)

***

## (3) Configure SAML Application

Next from the setup search bar browse to the "App Manager" portal. Once here you will want to select the option for "New Connected App".

![A screenshot showing how to create a new Connected App in the Salesforce dashboard.](https://images.workoscdn.com/images/af73f2b9-6c91-4b45-87aa-b0e15a2d9a0d.png?auto=format\&fit=clip\&q=50)

Give the App and API a meaningful name and set a contact email that corresponds to who you'd reach out to for support should there be an issue. You can always opt to use `support@workos.com`.

![A screenshot showing how to configure the name and contact email for the new Connected App in the Salesforce dashboard.](https://images.workoscdn.com/images/03a48352-2825-4c6d-aa8d-bfb57f03159f.png?auto=format\&fit=clip\&q=50)

Scroll down further to the "Web App Settings" and check the box for "Enable SAML". Enter the Entity ID and ACS URL into their respective places within the Settings.

The "Subject Type" should be set to "User ID" and the "Name ID Format" should be set to `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`. The "Issuer" should populate correctly with your Salesforce subdomain. For the IdP Certificate, select the certificate that matches the one previously used when enabling the Identity Provider, and for the "Signing Algorithm for SAML Messages" choose "SHA256".

![A screenshot showing how to configure the Connected App's Web App Settings in the Salesforce Dashboard.](https://images.workoscdn.com/images/98390601-4c8a-42f4-9965-52ddcd28ff45.png?auto=format\&fit=clip\&q=50)

Save the configurations and you should now see the new Connected App listed under "App Manager".

***

## (4) Configure User Attributes and Claims

In the Setup search bar browse to the "Manage Connected Apps" portal. Click on your application and this will open the view where you can configure the attribute mapping, and later on the user profile access permissions.

![A screenshot showing how to open the configurations for the new Connected App in the Salesforce dashboard.](https://images.workoscdn.com/images/6d1dc5a0-d7a5-4e68-a596-5e69f0cb1d52.png?auto=format\&fit=clip\&q=50)

Viewing the app, scroll down to the "Custom Attributes" section and select "New".

![A screenshot showing how to create new Custom Attribute mapping in the Salesforce dashboard.](https://images.workoscdn.com/images/716f679d-907f-42b9-8024-ff74ecff82cc.png?auto=format\&fit=clip\&q=50)

Salesforce automatically includes email as an Attribute so we will need to add three fields:

- `id`
- `firstName`
- `lastName`

Configure the fields so the mapping matches the following:

![A screenshot showing how to configure SAML attribute mapping in the Salesforce dashboard.](https://images.workoscdn.com/images/0dfb70bf-744f-4021-ae20-c06ade8f792d.png?auto=format\&fit=clip\&q=50)

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, create a new custom attribute with a key of `groups`. Map this attribute to a value that contains a user's group membership or role information, such as `$UserRole.Name` in the example below.

![A screenshot showing where to add the groups attribute in the Salesforce dashboard.](https://images.workoscdn.com/images/0f2abfab-25c9-4ce4-aeb4-7f0f3fae8038.png?auto=format\&fit=clip\&q=50)

> Finish role assignment set-up by navigating to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

***

## (5) Manage Profiles With Application Access

Similarly, viewing the app, there is a "Manage Profiles" section for granting access to control who can log into the application. Select "Manage Profiles" and grant access to the appropriate profiles that should have access to the application in the "Application Profile Assignment" wizard. Select "Save" when complete.

![A screenshot showing how to configure the "Application Profile Assignments" in the Salesforce dashboard.](https://images.workoscdn.com/images/26cdf036-5428-4ccf-b320-f9d1e41250e2.png?auto=format\&fit=clip\&q=50)

Here is an example of a successfully configured "Connected Application" allowing access to anyone with an "End User" Profile.

![A screenshot showing the completed "Application Profile Assignments" in the Salesforce dashboard.](https://images.workoscdn.com/images/fdc0584a-1350-42d7-8816-c8255e307db6.png?auto=format\&fit=clip\&q=50)

***

## (6) Obtain Identity Provider Details

Finally, return to the WorkOS dashboard. Within your connection settings, select "Edit Metadata Configuration" under "Identity Provider Configuration" and provide the Metadata URL you obtained from Salesforce. Your connection will then be verified and good to go!

![A screenshot showing where to add the IdP Metadata URL in the WorkOS dashboard.](https://images.workoscdn.com/images/ff29bcdd-a7df-47d3-88fc-f001a3dae23d.png?auto=format\&fit=clip\&q=50)
