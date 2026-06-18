# Login.gov OpenID Connect

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

> Note: [Login.gov](http://login.gov/) is used for government agencies. You will need to go through Login.gov to obtain a test account and get your application cleared for production. Please reference [Login.gov's developer documentation](https://developers.login.gov/testing/) for more information.

To create a Login.gov OpenID Connect (OIDC) Connection, you'll need four pieces of information: a [Redirect URI](https://workos.com/docs/glossary/redirect-uri), a Public Certificate, a [Client ID](https://workos.com/docs/glossary/client-id), and a Discovery Endpoint.

Start by logging in to your WorkOS dashboard and browse to the "Organizations" tab on the left-hand navigation bar.

Select the organization you'd like to configure a Login.gov OIDC Connection for, and select "Manually Configure Connection" under "Identity Provider".

![A screenshot showing where to find "Manually Configure Connection" in the WorkOS Dashboard.](https://images.workoscdn.com/images/32e5ff2f-4756-48ab-8c01-9ea6c04a0162.png?auto=format\&fit=clip\&q=50)

Select "Login.gov OpenID Connect" from the Identity Provider dropdown, enter a descriptive name for the connection, and then select the "Create Connection" button.

![A screenshot showing "Create Connection" details in the WorkOS Dashboard.](https://images.workoscdn.com/images/59b7ae81-487d-4e3b-a1d7-d6e293452d1b.png?auto=format\&fit=clip\&q=50)

***

## What WorkOS provides

WorkOS provides the Redirect URI and the Public Certificate. They are readily available in your Connection Settings in the [WorkOS Dashboard](https://dashboard.workos.com/get-started).

![A screenshot showing where to find the Redirect URI and Public Certificate in the WorkOS Dashboard.](https://images.workoscdn.com/images/cabe8cea-016e-4070-abe9-43b19b86699d.png?auto=format\&fit=clip\&q=50)

The Redirect URI is the location Login.gov redirects its authentication and token responses to, and the Public Certificate is used by Login.gov to verify the signed request from WorkOS.

Specifically, the Redirect URI will need to be set as one of the "Redirect URIs" and the Public Certificate will need to be set as one of the "Public Certificates" in the Login.gov application settings:

![A screenshot showing where to upload the Public Certificate and Redirect URI within the Login.gov dashboard.](https://images.workoscdn.com/images/2c615ec0-e266-492f-a32b-07d55c04b0ad.png)

## What you'll need

In order to integrate you'll need the [Client ID](https://workos.com/docs/glossary/client-id) and the Discovery Endpoint.

Normally, this information will come from the organization's IT Management team when they set up your application's Login.gov OpenID Connect configuration in their Identity Provider admin dashboard. But, should that not be the case during your setup, here's how to obtain them.

***

## (1) Access the Login.gov Developer Sandbox

Login to your [Login.gov sandbox dashboard](https://dashboard.int.identitysandbox.gov), and select "Apps" from the top menu.

![A screenshot showing the Login.gov sandbox dashboard and how to select the App menu option.](https://images.workoscdn.com/images/21a33031-818d-4b44-8646-648a45fc4e5a.png)

> Note: Login.gov is used exclusively by government agencies. If you don't have dashboard access for your Sandbox account, please reach out to the government agency you're working with to get access to their sandbox dashboard. Please reference [Login.gov's developer documentation](https://developers.login.gov/testing/) for more information.

***

## (2) Select or create your application

If your application is already created, select it from the list of applications and move to Step 4. If you haven't created an application, select "Create a new test app."

![A screenshot showing where to find the "Create a new test app" button in Login.gov "My app" listing.](https://images.workoscdn.com/images/96e14854-9acc-4ddd-8339-4312b80f7883.png)

***

## (3) Application Setup

On the New test app page, select "Yes" under the Production configuration setting. Then, add an App name, Friendly name, and Description for the app. Next, assign an agency team to this client.

![A screenshot showing where to select "Yes" under the Production configuration setting as well as the add an App name, Friendly name, Description, and Team for the Login.gov app during setup.](https://images.workoscdn.com/images/ac9a9962-4058-4876-8fd8-4542f2b93711.png)

Select "OpenID Connect Private Key JWT" as the Authentication protocol. Select the appropriate Level of Service, Default Authentication Assurance Level (AAL), and Attribute bundle for your application.

![A screenshot showing where to setup the Application protocol, Level of Service, Default Authentication Assurance Level, and Attributes Bundle during Login.gov application setup.](https://images.workoscdn.com/images/42b994de-61ac-4856-b954-12503cc3e45f.png)

Next, you'll need to define an Issuer - something like `urn:gov:gsa:openidconnect.profiles:sp:sso:agency_name:app_name` - replacing your agency and app name. Then, upload a logo and the public certificate file you downloaded from the WorkOS dashboard.

![A screenshot showing where to set the Issuer and upload a Logo and Public Certificate during Login.gov application setup.](https://images.workoscdn.com/images/f20e0870-1ec9-41d4-be5c-76103d177400.png)

Finally, you'll need to add the Redirect URIs. The first one you'll need to add is the Redirect URI you copied from the WorkOS Dashboard. You'll also need to add the [Redirect URI for your application](https://workos.com/docs/sso/redirect-uris). There is a Content Security Policy (CSP) check from Login.gov, so all URIs that could potentially be redirected to the authentication flow should be listed here.

![A screenshot showing where to upload the Redirect URI during Login.gov application setup.](https://images.workoscdn.com/images/2fd99552-43e3-4a74-b211-97619af4f7de.png)

Scroll down to the bottom of the page and select "Create test app" to finish the setup.

***

## (4) Provide the Client ID and Discovery Endpoint

Enter the Issuer you created in the previous step as the Client ID in the WorkOS Dashboard. Additionally, add the discovery endpoint, which for production accounts in Login.gov is: `https://secure.login.gov/.well-known/openid-configuration`.

Click "Update connection".

![A screenshot showing where to add the Client ID and Discovery Endpoint and Update Connection within the WorkOS Dashboard.](https://images.workoscdn.com/images/986718f3-0007-4894-9bd2-29892ff955d5.png?auto=format\&fit=clip\&q=50)

***

## (5) Request Production Deployment

Please follow the [Login.gov docs to request a production deployment](https://developers.login.gov/production/) and finish your Login.gov application.
