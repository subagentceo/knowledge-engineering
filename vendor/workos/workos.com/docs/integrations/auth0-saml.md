# Auth0

> Looking to migrate from Auth0 to WorkOS? Check out the [full migration guide](https://workos.com/docs/migrate/auth0).

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

To create a Auth0 SAML Connection, you'll need the Identity Provider metadata that is available from the organization's Auth0 instance.

Start by logging in to your WorkOS dashboard and browse to the "Organizations" tab on the left hand navigation bar.

Select the organization you'd like to configure an Auth0 SAML Connection for, and select "Manually Configure Connection" under "Identity Provider".

![A screenshot showing where to find "Manually Configure Connection" in the WorkOS Dashboard.](https://images.workoscdn.com/images/2c3eff01-e84c-4e65-9739-ae72facb9eaa.png?auto=format\&fit=clip\&q=50)

Select "Auth0 SAML" from the Identity Provider dropdown, enter a descriptive name for the connection, and then select the "Create Connection" button.

![A screenshot showing "Create Connection" details in the WorkOS Dashboard.](https://images.workoscdn.com/images/6e0f49c0-06fb-4a18-b805-31e3a10b27bb.png?auto=format\&fit=clip\&q=50)

***

## What WorkOS Provides

WorkOS provides the [ACS URL](https://workos.com/docs/glossary/acs-url) and [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id), which are readily available in your Connection Settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

![A screenshot showing where to find the ACS URL and SP Entity ID in the WorkOS Dashboard.](https://images.workoscdn.com/images/ec8cb8f8-b440-47d5-9a80-7b51ca9950bd.png?auto=format\&fit=clip\&q=50)

The ACS URL is the location an Identity Provider redirects its authentication response to. In Auth0's case, the ACS URL needs to be set by the organization when configuring your application in their Auth0 instance.

The SP Entity ID is a URI used to identify the issuer of a SAML request and the audience of a SAML response. In this case, the SP Entity ID is used to communicate that WorkOS will be the party performing SAML requests to the organization's Auth0 instance, and that WorkOS is the intended audience of the SAML responses from the Auth0 instance.

Specifically, the ACS URL will need to be set as the "Application Callback URL" on the SAML2 Web App Settings page found under the "Addons" tab in an Auth0 application. You will need to toggle on the SAML2 Web App for the settings modal to appear where you can add the ACS URL under the Application Callback URL input.

![A screenshot showing a toggle to turn on the SAML2 web app addon for Auth0 applications.](https://images.workoscdn.com/images/63ffadf6-ed3b-429d-a4a7-a5294b1a3a0d.png?auto=format\&fit=clip\&q=50)

![A screenshot showing where to set the ACS URL in the SAML2 web app settings for Auth0 applications.](https://images.workoscdn.com/images/294645cc-18d2-4969-a9ed-6ec69f2bca3d.png?auto=format\&fit=clip\&q=50)

The SP Entity ID will need to be set as the "audience" value in the Settings JSON object on the SAML2 Web App Settings page.

After the Application Callback URL and Audience have been added, scroll to the bottom and click "Enable".

![A screenshot showing where to set the SP Entity ID in the SAML2 web app settings for Auth0 applications.](https://images.workoscdn.com/images/4fd65ff7-6296-43d8-8e65-0bd528028f70.png?auto=format\&fit=clip\&q=50)

***

## What you'll need

In order to integrate you'll need the Auth0 IdP Metadata URL.

Normally, this information will come from the organization's IT Management team when they set up your application's SAML 2.0 configuration in their Auth0 admin dashboard. Here's how to obtain them:

***

## (1) Log In and Select Your Application

Log in to [Auth0](https://auth0.com/auth/login), go to the admin dashboard, select "Applications" in the sidebar, and then select the "Applications" menu option. Next, select your application from the list of applications.

![A screenshot showing where to find the web application in Auth0 Dashboard.](https://images.workoscdn.com/images/e4bb38d9-fa10-4caa-b097-05a8d83a4e2b.png?auto=format\&fit=clip\&q=50)

***

## (2) Obtain Identity Provider Metadata

On the application's Settings page, scroll down to the bottom and expand the "Advanced Settings" section. Select the "Endpoints" tab and copy the SAML Metadata URL. You'll need this in the next step.

![A screenshot of the IdP Metadata XML URL in the Auth0 Dashboard.](https://images.workoscdn.com/images/6288c6a6-ab57-4608-8a1e-872bbd7eb2bd.png?auto=format\&fit=clip\&q=50)

***

## (3) Upload Metadata URL

Finally, upload the SAML Metadata URL you saved earlier in your WorkOS Connection settings. Your Connection will then be linked and good to go!

![A screenshot showing where to place the Auth0 IdP Metadata URL in the WorkOS Dashboard.](https://images.workoscdn.com/images/f1cb1c5c-8554-48a5-89a1-31a42d356690.png?auto=format\&fit=clip\&q=50)
