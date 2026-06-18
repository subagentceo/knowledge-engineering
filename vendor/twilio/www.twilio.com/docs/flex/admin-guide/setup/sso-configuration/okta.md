# Configure Okta IdP with Flex

## Overview

To set up Okta as your identity provider (IdP) for Flex, you need to create a SAML 2.0 integration in Okta and then configure Flex with those credentials.

> \[!NOTE]
>
> If you need to create a new Okta account to integrate with Flex, make sure you sign up for Okta's **Workforce Identity Cloud**.

## Create an application in Okta

**Tip**: If you can't finish your setup in one sitting, continue by navigating back to **Applications** > **Applications** in the Okta Admin Console and selecting your active application.

1. Follow [Okta's documentation to create a SAML app integration](https://help.okta.com/en-us/content/topics/apps/apps_app_integration_wizard_saml.htm).
2. On the **Create SAML Integration** page, enter the following general settings. Make sure to click **Show Advanced Settings** to access all the fields:

| General and advanced settings                                                                   | Values                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Single sign on URL                                                                              | **[Enhanced SSO configuration](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration)**: Copy this value from the **Set up your identity provider** page, which provides the specific value for your account. Your value will look similar to this: `https://login.flex.us1.twilio.com/login/callback?connection=JQxxxx`<br /><br />**[Legacy SSO configuration](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration)**: Replace ACxxxx with your real Twilio Account SID. `https://iam.twilio.com/v1/Accounts/ACxxxx/saml2` |
| Audience URI (SP Entity ID)                                                                     | **[Enhanced SSO configuration](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration)**: Copy this value from the **Set up your identity provider** page, which provides the specific value for your account. Your value will look similar to this: `urn:flex:JQxxxx`<br /><br />**[Legacy SSO configuration](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration)**: Replace ACxxxx with your real Twilio Account SID. `https://iam.twilio.com/v1/Accounts/ACxxxx/saml2/metadata`                                           |
| Default RelayState                                                                              | Leave blank.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Name ID format                                                                                  | Leave **Unspecified** selected, unless you are working with a specific format.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Application username                                                                            | This can be an email, Okta username, or another unique name.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Response                                                                                        | Click **Show Advanced Settings** and make sure **Signed** is selected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Assertion Signature                                                                             | Click **Show Advanced Settings** and make sure **Signed** is selected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Signature Algorithm, Digest Algorithm                                                           | Leave the default selections.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Assertion Encryption                                                                            | Select **Unencrypted**. Twilio doesn't currently support encryption.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Assertion Inline Hook, Authentication context class, Honor Force Authentication, SAML Issuer ID | Leave the default selections.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

![SAML settings form with fields for single sign on URL, audience URI, and options for name ID format.](https://docs-resources.prod.twilio.com/c20246ff1fbcde35c166731907703b8a1fd24a969ad5af21d64c9603de86d3be.png)

## Configure claims

Claims are key-value pairs that the identity provider asserts are true to the application. Flex uses these to determine the critical information about each Flex User.

> \[!WARNING]
>
> All the information the identity provider supplies to Twilio is stored inside Twilio TaskRouter Worker Attributes. Consider local regulations for storing data and only provide data relevant for Flex usage. Learn more about [Twilio's Privacy policy](https://www.twilio.com/en-us/legal/privacy).

1. In Okta, in the **Attribute Statements** section, add the following required claims. The values shown in the table below are only examples. Replace placeholders with values specific to your Okta implementation. Make sure the Okta user attribute you are using for the Flex roles is also populated.

| **Name**   | **Name format** | **Value**                                                                                 |
| ---------- | --------------- | ----------------------------------------------------------------------------------------- |
| full\_name | Basic           | `String.join(" ", user.firstName, user.lastName)` OR `${user.firstName} ${user.lastName}` |
| roles      | Basic           | `user.userType`                                                                           |
| email      | Basic           | `user.email`                                                                              |

You can optionally add the following attribute:

| **Name**   | **Name format** | **Value**         |
| ---------- | --------------- | ----------------- |
| image\_url | URI Reference   | `user.profileUrl` |

For a list of mandatory attributes and example values, see [Configuring SSO and IdP in Flex](/docs/flex/admin-guide/setup/sso-configuration).

With the setup described above, Okta passes the following attributes to Flex:

* full\_name
* image\_url (for use in the agent avatar)
* roles
* email

Preview the SAML assertion generated and validate your SAML settings. In this example, the ACL URL and entity ID values are shown using the placeholders `https://ACS_URL` and `https://entity_ID`, respectively.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<saml2:Assertion ID="id5838987467318981535749982" IssueInstant="2021-08-26T15:19:53.544Z" Version="2.0"
    xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">
    <saml2:Issuer Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity">http://www.okta.com/Issuer</saml2:Issuer>
    <saml2:Subject>
        <saml2:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified">userName</saml2:NameID>
        <saml2:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
            <saml2:SubjectConfirmationData NotOnOrAfter="2021-08-26T15:24:53.549Z" Recipient="https://ACS_URL"/>
        </saml2:SubjectConfirmation>
    </saml2:Subject>
    <saml2:Conditions NotBefore="2021-08-26T15:14:53.549Z" NotOnOrAfter="2021-08-26T15:24:53.549Z">
        <saml2:AudienceRestriction>
            <saml2:Audience>https://entity_ID</saml2:Audience>
        </saml2:AudienceRestriction>
    </saml2:Conditions>
    <saml2:AuthnStatement AuthnInstant="2021-08-26T15:19:53.544Z">
        <saml2:AuthnContext>
            <saml2:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport</saml2:AuthnContextClassRef>
        </saml2:AuthnContext>
    </saml2:AuthnStatement>
    <saml2:AttributeStatement>
        <saml2:Attribute Name="roles" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
            <saml2:AttributeValue
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.userType
            </saml2:AttributeValue>
        </saml2:Attribute>
        <saml2:Attribute Name="email" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
            <saml2:AttributeValue
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.email
            </saml2:AttributeValue>
        </saml2:Attribute>
        <saml2:Attribute Name="image_url" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri">
            <saml2:AttributeValue
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string">user.profileUrl
            </saml2:AttributeValue>
        </saml2:Attribute>
        <saml2:Attribute Name="full_name" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
            <saml2:AttributeValue
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xs:string"/>
            </saml2:Attribute>
        </saml2:AttributeStatement>
</saml2:Assertion>
```

## Copy your application details

You need the details of your Okta application to configure Flex to use this application.

To locate your Okta application details, refer to [Okta's documentation for managing signing certificates](https://help.okta.com/oie/en-us/content/topics/apps/manage-signing-certificates.htm).

## Configure Flex with your new SAML credentials

1. In Twilio Console, go to **Flex** > **Users and access** > [**Single sign-on (SSO)**](https://console.twilio.com/us1/develop/flex/users-and-access/single-sign-on).
2. Using the application details from the previous section, add the following information:

| **Twilio SSO field**     | **Okta field**                       |
| ------------------------ | ------------------------------------ |
| X.509 Certificate        | X.509 Certificate                    |
| Single Sign-on URL       | Identity Provider Single Sign-On URL |
| Identity Provider Issuer | Identity Provider Issuer             |

![Twilio Flex SSO setup with Okta, showing login link, SAML2 method, and certificate details.](https://docs-resources.prod.twilio.com/242aefadde6ec975a633b5bed7c792aeb99d6894a82268758c9eb3594ab1be30.png)

## Create your application users in Okta

### Add users

Follow Okta's documentation to [add users manually](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-add-users.htm), [import users from an app](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-import-users-app.htm), or [import users from a CSV file](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-import-users-csv.htm).

### Assign Flex roles to your users

Assign a Flex role to your Okta application users by leveraging the user attribute defined for the "roles" SAML claim.

> \[!NOTE]
>
> Want to learn more? See the documentation on [Identity Attributes](/docs/flex/admin-guide/setup/sso-configuration) for further information about naming Attributes and other possible Worker attributes. To assign WFO roles for Flex Insights, see [Flex Insights User Roles](/docs/flex/admin-guide/setup/sso-configuration/insights-user-roles).

To assign a role:

1. Navigate to **Directory** > **People**, select the user, and click the **Profile** tab.
2. In **Attributes**, edit the **User type** attribute to specify the roles that you want to assign to your Flex user. Available Flex roles are `agent`, `admin`, and `supervisor`. To assign multiple roles, use a comma-separated list.

After you define the roles for a user, Flex updates the Worker attributes with each successful SSO authentication.

## Assign users in the directory to your application

To assign users to your application in Okta, follow [Okta's documentation to assign app integrations](https://help.okta.com/en-us/content/topics/apps/apps-assign-applications.htm).

### Troubleshooting a "Flex application unassigned" error

The message "Sorry, you can't access Twilio Flex because you are not assigned this app in Okta" can appear if a user isn't properly assigned to the Okta app you created for Flex. Revisit the steps above to add them to your application.

## Test your SSO

To test your SSO setup:

1. Navigate to the Flex Console [**Single sign-on (SSO)** page](https://console.twilio.com/us1/develop/flex/users-and-access/single-sign-on).
2. Do one of the following:
   * Click **Login with SSO**.
   * Copy the login link and paste it into your browser address bar. This redirects you to the IdP login page.
3. Log in using the credentials of the test user. Depending on the user settings, the IdP may ask you to set your password. <br /><br />
   Once authentication completes, the IdP redirects you to the Flex UI. What you can see in the UI depends on the Flex roles set in the IdP user profile.
4. Validate the worker full name display in the Flex UI, or navigate to the Worker page in the [TaskRouter Dashboard](https://console.twilio.com/us1/develop/taskrouter/overview?frameUrl=%2Fconsole%2Ftaskrouter%2Fdashboard%3Fx-target-region%3Dus1) to review other attributes, like email and assigned roles.

## What's next?

See [Configuring SSO](/docs/flex/admin-guide/setup/sso-configuration) to learn more about:

* Initiating login from your IdP
* Logging in to a self-hosted domain
* Defining attributes for each identity
