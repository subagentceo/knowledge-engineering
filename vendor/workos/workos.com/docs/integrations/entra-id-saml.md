# Entra ID SAML (formerly Azure AD)

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). And often, the information required to create a Connection will differ by Identity Provider.

To create an Entra ID SAML Connection, you'll need the Identity Provider Metadata URL that is available from the organization's Entra ID instance.

***

## What WorkOS Provides

WorkOS provides the [ACS URL](https://workos.com/docs/glossary/acs-url) and [IdP URI (Entity ID)](https://workos.com/docs/glossary/idp-uri-entity-id). It's readily available in your Connection Settings in the [WorkOS Dashboard](https://dashboard.workos.com/get-started).

![A screenshot showing the ACS URL and Entity ID in the WorkOS dashboard.](https://images.workoscdn.com/images/5051f1e9-36dd-4032-b2db-873c9d26a7da.png?auto=format\&fit=clip\&q=50)

The ACS URL is the location an Identity Provider redirects its authentication response to. In Entra ID's case, it needs to be set by the organization when configuring your application in their Entra ID instance.

Specifically, the ACS URL will need to be set as the "Reply URL (Assertion Consumer Service URL)" in the "Basic SAML Configuration" step of the Entra ID "Set up Single Sign-On with SAML" wizard:

![A screenshot showing the location to place the WorkOS ACS URL in the Entra Dashboard.](https://images.workoscdn.com/images/61fa14dd-fa98-437b-8e99-5c0cec1c4b2b.png?auto=format\&fit=clip\&q=50)

The [Entity ID](https://workos.com/docs/glossary/idp-uri-entity-id) is a URI used to identify the issuer of a SAML request, response, or assertion. In this case, the entity ID is used to communicate that WorkOS will be the party performing SAML requests to the organization's Entra ID instance.

Specifically, the Entity ID will need to be set as the "Identifier (Entity ID)" in the "Basic SAML Configuration" step of the Entra ID "Set up Single Sign-On with SAML" wizard:

![A screenshot showing the location to place the WorkOS Entity ID in the Entra Dashboard.](https://images.workoscdn.com/images/96cbcf4e-705e-43e5-9cc3-7fd24f0be2a2.png?auto=format\&fit=clip\&q=50)

***

## What you'll need

In order to integrate you'll need the Entra ID IdP Metadata URL.

Normally, this information will come from the organization's IT Management team when they set up your application's SAML 2.0 configuration in their Entra admin dashboard. Here's how to obtain them:

***

## (1) Log in

Log in to the [Entra ID Active Directory Admin dashboard](https://portal.azure.com/). Select "Enterprise Applications" from the list of Entra services.

![A screenshot showing where to select "Enterprise Applications" in the Entra dashboard.](https://images.workoscdn.com/images/37f3b3d2-fcdb-4a5f-8d93-970ec0239446.png?auto=format\&fit=clip\&q=50)

***

## (2) Select or create your application

If your application is already created, select it from the list of Enterprise applications and move to Step 7.

![A screenshot showing where to select an existing application in the Entra dashboard.](https://images.workoscdn.com/images/a61ca1b9-4e06-4dc6-80de-eac3fea212cd.png?auto=format\&fit=clip\&q=50)

If you haven't created a SAML Application in Entra, select "New Application".

![A screenshot showing where to select "New Application" in the Entra dashboard.](https://images.workoscdn.com/images/3c26fec7-f77a-4757-8a04-6998ff7beb26.png?auto=format\&fit=clip\&q=50)

***

## (3) Initial SAML Application Setup

Select "Create your own application", then enter a descriptive app name. Under "What are you looking to do with your application?", select "Integrate any other application you don't find in the gallery (Non-gallery)", then select "Create".

![A screenshot showing where to input the name of the new application in the Entra dashboard.](https://images.workoscdn.com/images/9f998b1b-87b4-4f1d-a50c-0a17f8bb3f98.png?auto=format\&fit=clip\&q=50)

Select "Single Sign-On" from the "Manage" section in the left sidebar navigation menu, and then "SAML".

![A screenshot showing how to select "SAML" as the Single Sign-On method of the Entra application in the Entra dashboard.](https://images.workoscdn.com/images/f90c0d1a-ed45-4bee-b77f-dcf37a63a6bd.png?auto=format\&fit=clip\&q=50)

***

## (4) Configure SAML Application

Click the Edit icon in the top right corner of the first step "Basic SAML Configuration".

![A screenshot showing where to select "Edit" for the "Basic SAML Configuration" step in the Entra dashboard.](https://images.workoscdn.com/images/e7a4397c-8120-43c6-9b66-e6a2251cd5bd.png?auto=format\&fit=clip\&q=50)

Input the IdP URI (Entity ID) from your WorkOS Dashboard as the "Identifier (Entity ID)". Input the ACS URL from your WorkOS Dashboard as the "Reply URL (Assertion Consumer Service URL)".

![A screenshot showing where to input the WorkOS ACS URL and WorkOS Entity ID in the Entra dashboard.](https://images.workoscdn.com/images/dd406379-af79-44b5-8d5a-4076659258c8.png?auto=format\&fit=clip\&q=50)

***

## (5) Configure User Attributes and Claims

Click the Edit icon in the top right corner of the second step "Attributes & Claims".

![A screenshot showing where to select "Edit" for the "Attributes & Claims" step in the Entra dashboard.](https://images.workoscdn.com/images/6155597f-a4b8-4a3c-a7f3-a6e8d4e0865d.png?auto=format\&fit=clip\&q=50)

Make sure the following attribute mapping is set:

- `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress` → `user.mail`
- `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname` → `user.givenname`
- `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name` → `user.userprincipalname`
- `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname` → `user.surname`

Below is an example of how to format your claim within the Entra claim editor. Make sure the 'Namespace' value ends in `/claims`.

![A screenshot showing the "Manage Claim" configuration in the Entra dashboard.](https://images.workoscdn.com/images/93ec5d1b-9ecd-49f5-8d2a-a718b5ea58b2.png?auto=format\&fit=clip\&q=50)

![A screenshot showing the "Attribute & Claims" configuration in the Entra dashboard.](https://images.workoscdn.com/images/f41b5a7c-1842-4567-9f46-85caa7309176.png?auto=format\&fit=clip\&q=50)

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, follow the guidance below.

Select "Add a group claim" from the top menu. Next, select which groups you'd like to return in the Group Claims settings. For example, in Entra ID, you could select "Groups assigned to the application" to only send groups assigned to the SAML app. Finally, select "Save" once finished configuring the groups.

![A screenshot showing how to add a groups claim to your SAML app in the Entra dashboard.](https://images.workoscdn.com/images/4e33755c-945f-4164-873f-33482e3a2c43.png?auto=format\&fit=clip\&q=50)

> Finish role assignment set-up by navigating to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

***

## (6) Add Users to SAML Application

In order for your users or groups of users to be authenticated, you will need to assign them to your Entra ID SAML application. Select "Users and groups" from the "Manage" section of the navigation menu.

![A screenshot showing where to select "Users and groups" in the Entra dashboard.](https://images.workoscdn.com/images/7fe69c75-311e-409b-905a-dbd6b6087394.png?auto=format\&fit=clip\&q=50)

Select "Add user/group" from the top menu.

![A screenshot showing where to select "Add user/group" in the Entra dashboard.](https://images.workoscdn.com/images/817e4d3d-7470-4e20-b9f1-af74ea8adc73.png?auto=format\&fit=clip\&q=50)

Select "None selected" under the "Users and Groups". In the menu, select the users and groups of users that you want to add to the SAML application, and click "Select".

![A screenshot showing where to select "None Selected" under "Users and Groups" and add a user in the Entra dashboard.](https://images.workoscdn.com/images/85f005d7-3655-46ac-9554-77fda2c44747.png?auto=format\&fit=clip\&q=50)

Select "Assign" to add the selected users and groups of users to your SAML application.

![A screenshot showing where to select "Assign" in the Entra dashboard.](https://images.workoscdn.com/images/5420b145-6086-4141-b096-9ae9f6ea8529.png?auto=format\&fit=clip\&q=50)

***

## (7) Obtain Identity Provider Details

Select "Single Sign-On" from the "Manage" section in the left sidebar navigation menu.

Navigate down to Section 3 of the "Single Sign-On" page, to "SAML Signing Certificate". Copy the URL provided in "App Federation Metadata URL".

![A screenshot showing where to select the "App Federation Metadata URL" in the Entra dashboard.](https://images.workoscdn.com/images/c4ee0b27-ddd7-4aab-96c0-ced1019b4cd7.png?auto=format\&fit=clip\&q=50)

Next, within your connection settings under "Identity Provider Configuration", select "Edit Configuration" and enter the Entra metadata URL.

![A screenshot showing where to select "Edit Configuration" on the "SSO Connection" page in the WorkOS dashboard.](https://images.workoscdn.com/images/080cded6-eba5-41af-ab93-2845e464acb8.png?auto=format\&fit=clip\&q=50)

![A screenshot showing where to paste the Metadata URL on the "SSO Connection" page in the WorkOS dashboard.](https://images.workoscdn.com/images/28377a44-73d6-4617-84c8-be836e19862c.png?auto=format\&fit=clip\&q=50)

Your Connection will then be verified and good to go!

![A screenshot showing an active Entra SAML connection in the WorkOS dashboard.](https://images.workoscdn.com/images/e02c6b1e-7ab6-4cb0-a39d-c2255d8b5b6e.png?auto=format\&fit=clip\&q=50)
