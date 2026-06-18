# Okta SAML

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

To create an Okta Connection, you'll need three pieces of information: an [ACS URL](https://workos.com/docs/glossary/acs-url), an [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id), and an [IdP Metadata URL](https://workos.com/docs/glossary/idp-metadata).

Start by logging in to your WorkOS dashboard and browse to the "Organizations" tab on the left hand navigation bar.

Select the organization you'd like to configure an Okta Connection for, and select "Manually Configure Connection" under "Identity Provider".

![A screenshot showing where to find "Manually Configure Connection" in the WorkOS Dashboard.](https://images.workoscdn.com/images/9270090d-4f59-4b7b-95e9-1132a6bee872.png?auto=format\&fit=clip\&q=50)

Select "Okta SAML" from the Identity Provider dropdown, enter a descriptive name for the connection, and then select the "Create Connection" button.

![A screenshot showing "Create Connection" details in the WorkOS Dashboard.](https://images.workoscdn.com/images/287303da-4bbd-433b-bdd2-06f5002dd5ca.png?auto=format\&fit=clip\&q=50)

***

## What WorkOS provides

WorkOS provides the ACS URL and the SP Entity ID. It's readily available in your Connection Settings in the [WorkOS Dashboard](https://dashboard.workos.com/get-started).

![A screenshot showing where to find the ACS URL and SP Entity ID in the WorkOS Dashboard.](https://images.workoscdn.com/images/ad4ef355-6ea7-4e27-9762-91309c34dc2d.png?auto=format\&fit=clip\&q=50)

The ACS URL is the location an Identity Provider redirects its authentication response to. In Okta's case, it needs to be set by the organization when configuring your application in their Okta instance.

The SP Entity ID is a URI used to identify the issuer of a SAML request, response, or assertion. In this case, the entity ID is used to communicate that WorkOS will be the party performing SAML requests to the organization's Okta instance.

Specifically, the ACS URL will need to be set as the "Single Sign-On URL" and the SP Entity ID will need to be set as the "Audience URI (SP Entity ID)" in the "Configure SAML" step of the Okta "Edit SAML Integration" wizard:

![A screenshot showing where to place the WorkOS Single Sign-On URL and SP Entity ID in the Okta Dashboard.](https://images.workoscdn.com/images/52be9941-9e43-4f70-a65e-d4cd8883579c.png?auto=format\&fit=clip\&q=50)

## What you'll need

Next, provide the [IdP Metadata URL](https://workos.com/docs/glossary/idp-metadata). Normally, this information will come from the organization's IT Management team when they set up your application's SAML 2.0 configuration in their Okta admin dashboard. But, should that not be the case during your setup, the next steps will show you how to obtain it.

***

## (1) Log in

Log in to [Okta](https://login.okta.com), go to the admin dashboard, and select "Applications" in the navigation bar.

![A screenshot showing how to navigate to existing applications in the Okta Dashboard.](https://images.workoscdn.com/images/b4f8bd68-3265-4ef6-8916-1f9e7eb241a1.png?auto=format\&fit=clip\&q=50)

***

## (2) Select or create your application

If your application is already created, select it from the list of applications and move to Step 7.

![A screenshot showing existing applications in the Okta Dashboard.](https://images.workoscdn.com/images/f763ab3c-0ffc-49b7-8212-f988d0738e94.png?auto=format\&fit=clip\&q=50)

If you haven't created a SAML application in Okta, select "Create App Integration".

![A screenshot showing how to select "Create App Integration" in the Okta Dashboard.](https://images.workoscdn.com/images/cf63d4f1-3929-4426-a0df-959bbd06ce13.png?auto=format\&fit=clip\&q=50)

***

## (3) Initial SAML Application Setup

Select "Create New App", then select "SAML 2.0" as a Sign on method, then click "Next".

![A screenshot showing the sign-in method selection in the Okta Dashboard.](https://images.workoscdn.com/images/036519d9-1d5a-462f-8d36-e87b618a3e94.png?auto=format\&fit=clip\&q=50)

Enter a descriptive App name, then click "Next".

![A screenshot showing App name creation in the Okta Dashboard.](https://images.workoscdn.com/images/facbcbea-3ce0-421e-9725-e05e49bc056a.png?auto=format\&fit=clip\&q=50)

***

## (4) Configure SAML Application

Input the ACS URL from your WorkOS Dashboard as the "Single Sign-On URL" and input the SP Entity ID from your WorkOS Dashboard as the "Audience URI (SP Entity ID)".

![A screenshot showing where to place the WorkOS Single Sign-On URL and SP Entity ID in the Okta Dashboard.](https://images.workoscdn.com/images/52be9941-9e43-4f70-a65e-d4cd8883579c.png?auto=format\&fit=clip\&q=50)

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, follow the guidance below.

Scroll down to the Group Attribute Statements configuration. The Name should be set to `groups`, and you can define a filter to map the necessary Okta groups. To map all groups, filter by matching the regex `.*`, as shown in the screenshot below. You can preview the SAML Assertion to check that all attributes have been mapped correctly. Then, click "Next".

![A screenshot showing the "Groups Attribute Statement" configuration in the Okta Dashboard.](https://images.workoscdn.com/images/723c0734-a8cc-4903-a90d-273dfe282886.png?auto=format\&fit=clip\&q=50)

> Finish role assignment set-up by navigating to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

***

## (5) Submit Application Feedback

Select "I'm an Okta customer adding an internal app" from the options menu. Complete the form with any comments and select "Finish".

![A screenshot showing where to submit application feedback in the Okta Dashboard.](https://images.workoscdn.com/images/734d5229-1913-4cfb-b366-295104da4123.png?auto=format\&fit=clip\&q=50)

***

## (6) Add Users to SAML Application

To give users permission to authenticate via this SAML app, you will need to assign individual users and/or groups of users to the Okta app.

Click on the "Assignments" tab, and select either "Assign to People" or "Assign to Groups".

![A screenshot showing the Okta Application "Assignments" tab in the Okta Dashboard.](https://images.workoscdn.com/images/a8380fe9-9e90-48ff-b665-8313311c28d1.png?auto=format\&fit=clip\&q=50)

Find the individual user(s) and/or group(s) that you would like to assign to the app, and click "Assign" next to them. Click "Done" when you are finished.

![A screenshot showing the selecting of groups to add to the Application in the Okta Dashboard.](https://images.workoscdn.com/images/c4fddfdc-35b2-4a4f-9d84-1a7e94968d24.png?auto=format\&fit=clip\&q=50)

***

## (7) Upload Metadata URL

Click on the "Sign On" tab of the SAML app you just created.

Click the "Actions" dropdown for the correct certificate and select "View IdP Metadata."

![A screenshot showing the "View IdP Metadata" selection in the Okta Dashboard.](https://images.workoscdn.com/images/e98e855e-6733-4f6e-96da-5c993cebd21b.png?auto=format\&fit=clip\&q=50\&w=2048)

A separate tab will open. Copy the link in the browser.

![A screenshot of the IdP Metadata XML URL in the Okta Dashboard.](https://images.workoscdn.com/images/eab81ff3-8037-4cd6-94ef-b00962084ad0.png?auto=format\&fit=clip\&q=50)

Back in the WorkOS Dashboard, click on "Edit Metadata Configuration" in the "Identity Provider Configuration" section of the Connection. Input the Metadata URL and click "Save Metadata Configuration". Your Connection will then be linked and good to go!

![A screenshot showing where to place the Okta IdP Metadata URL in the WorkOS Dashboard.](https://images.workoscdn.com/images/a08a0c17-d510-4410-91cb-4477cfe310c8.png?auto=format\&fit=clip\&q=50)
