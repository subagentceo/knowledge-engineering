# CyberArk SAML

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

To create a CyberArk SAML Connection, you'll need the Identity Provider metadata that is available from your CyberArk instance.

***

## What WorkOS provides

The first thing you'll need to do is create a new CyberArk SAML connection in your [WorkOS dashboard](https://dashboard.workos.com/). Start by logging in to your WorkOS dashboard and browse to the "Organizations" tab on the left hand navigation bar.

Select the organization you'd like to configure a CyberArk SAML Connection for, and then click "Manually Configure Connection".

![A screenshot showing where to select "Manually Configure Connection" in the WorkOS dashboard.](https://images.workoscdn.com/images/72c85573-ffe7-4be4-8fe1-2ea60db0c77a.png?auto=format\&fit=clip\&q=50)

Select "CyberArk SAML" as the Identity Provider, give the Connection a descriptive name, and click "Create Connection".

![A screenshot showing the "Create Connection" modal in the WorkOS dashboard.](https://images.workoscdn.com/images/d5ef1aab-8d6d-47ff-9af8-ae237ed31440.png?auto=format\&fit=clip\&q=50)

WorkOS provides the [ACS URL](https://workos.com/docs/glossary/acs-url) and [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id). They are readily available in your Connection Settings in the [WorkOS dashboard](https://dashboard.workos.com/).

![A screenshot showing where to locate the "ACS URL" and "SP Entity ID" in the WorkOS dashboard.](https://images.workoscdn.com/images/d443909c-712a-4084-9ac8-2b47f560a6fa.png?auto=format\&fit=clip\&q=50)

The ACS URL is the location an Identity Provider redirects its authentication response to. In CyberArk's case, it needs to be set by the organization when configuring your application in their CyberArk instance.

The SP Entity ID is a URI used to identify the issuer of a SAML request and the audience of a SAML response. In this case, the SP Entity ID is used to communicate that WorkOS will be the party performing SAML requests to the organization's CyberArk instance, and that WorkOS is the intended audience of the SAML responses from the CyberArk instance.

Specifically, the ACS URL will need to be set as the "Assertion Consumer Service (ACS) URL", and the SP Entity ID will need to be set as the "SP Entity Id / Issuer / Audience", in the "Service Provider Configuration" section of the "Trust" tab in the SAML App.

![A screenshot showing where to input the WorkOS ACS URL and SP Entity ID in the "SP Entity ID" and "ACS URL" fields in the CyberArk dashboard.](https://images.workoscdn.com/images/bb1b0fe6-0e13-4c45-8bfd-fd0b4d9dc028.png?auto=format\&fit=clip\&q=50)

***

## What you'll need

Next, provide the Identity Provider metadata.

Normally, this information will come from the organization's IT Management team when they set up your application's SAML configuration in their CyberArk Identity Admin Portal. If that's not the case during your setup, the following steps describe how to get the necessary information.

***

## (1) Log in

Log in to the [CyberArk Identity Admin Portal](https://pod0.idaptive.app/my) and select "Web Apps" from the left-side navigation.

![A screenshot showing where to select 'Web Apps" in the CyberArk dashboard.](https://images.workoscdn.com/images/1e496ecf-4948-4161-8d0e-7dd085d1cc74.png?auto=format\&fit=clip\&q=50)

***

## (2) Select or create your application

If your application is already created, select it from the list of applications and move to Step 4. If you haven't created a SAML application in CyberArk, select "Add Web Apps".

![A screenshot showing where to select "Add Web Apps" in the CyberArk dashboard.](https://images.workoscdn.com/images/034f7256-e5d1-40bf-a258-4532ba462966.png?auto=format\&fit=clip\&q=50)

Select the "Custom" tab and then click to add "SAML".

![A screenshot showing how to select the "SAML" web application type in the CyberArk dashboard.](https://images.workoscdn.com/images/48709bed-91f5-4549-8fec-3766ca10b5ee.png?auto=format\&fit=clip\&q=50)

Select "Yes" to begin setting up the SAML App.

![A screenshot indicating to select "Yes" in the confirmation to add the new application in the CyberArk dashboard.](https://images.workoscdn.com/images/2877ea73-3e8b-4370-9dd2-b3a64ea8990a.png?auto=format\&fit=clip\&q=50)

***

## (3) Initial SAML Application Setup

Enter a descriptive App Name and Description, then click "Save".

![A screenshot showing how to populate the "Name" and "Description" fields in the CyberArk dashboard.](https://images.workoscdn.com/images/bb5bf913-edae-4286-9a72-20eaa12ca1e7.png?auto=format\&fit=clip\&q=50)

Next, navigate to the "Trust" tab and enter the SP Entity ID from the Connection Settings into "SP Entity Id / Issuer / Audience" and the ACS URL from the Connection Settings into "Assertion Consumer Service (ACS) URL" in the "Service Provider Configuration" section of the "Trust" tab in the SAML App.

> IMPORTANT: Be sure to check "Both" under "Sign Response or Assertion?".

![A screenshot showing where to input the WorkOS ACS URL and SP Entity ID in the "SP Entity ID" and "ACS URL" fields in the CyberArk dashboard.](https://images.workoscdn.com/images/bb1b0fe6-0e13-4c45-8bfd-fd0b4d9dc028.png?auto=format\&fit=clip\&q=50)

***

## (4) Configure Attribute Mapping

Select the "SAML Response" tab and use the "Add" button to add the following key-value pairs. Then, click "Save".

- `id` → `LoginUser.Uuid`
- `email` → `LoginUser.Email`
- `firstName` → `LoginUser.FirstName`
- `lastName` → `LoginUser.LastName`

![A screenshot showing the "SAML Response" tab successfully configured in the CyberArk dashboard.](https://images.workoscdn.com/images/63c47f86-6205-4c23-b4b2-1c2950d94fe7.png?auto=format\&fit=clip\&q=50)

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, first add a new attribute in the "SAML Response" tab. In the "Attribute Name" column, input `groups`, and map it to the "Attribute Value" for a user's group membership, such as `LoginUser.GroupNames`, as shown in the example below.

![A screenshot showing the groups attribute successfully configured in CyberArk.](https://images.workoscdn.com/images/e5b30513-3915-46a3-b876-650898f8f288.png?auto=format\&fit=clip\&q=50)

Once your SAML app is configured to return groups, navigate to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

***

## (5) Add Users to SAML Application

To give users permission to authenticate via this SAML app, you will need to assign individual users and/or groups of users to the CyberArk SAML app.

Click on the "Permissions" tab, and select "Add".

![A screenshot showing where to select "Add" in the "Permissions" tab of the application in the CyberArk dashboard.](https://images.workoscdn.com/images/473838e4-cf5f-4feb-a577-f167ac907f01.png?auto=format\&fit=clip\&q=50)

Search for the individual user(s) and/or group(s) that you would like to assign to the app, and check the box next to them. Click "Add" when you are finished. Once users have been successfully added, you should also notice the "Status" of your CyberArk SAML app change to "Deployed".

![A screenshot showing the selection of a user to add to the SAML application in the CyberArk dashboard.](https://images.workoscdn.com/images/a09d23b6-5eb7-4fdf-999b-fff77159d43c.png?auto=format\&fit=clip\&q=50)

***

## (6) Copy Metadata

On the "Trust" tab of the SAML App, go to the "Service Provider Configuration Section" and select "Metadata". Then click on "Copy URL" button to copy the Metadata URL. This URL will get entered in the WorkOS dashboard in the next step.

![A screenshot showing where to obtain the "Metadata URL" in the CyberArk dashboard.](https://images.workoscdn.com/images/5da3432f-1105-44f1-9433-d1002d1c832d.png?auto=format\&fit=clip\&q=50)

***

## (7) Provide Metadata

Finally, select "Edit Metadata Configuration" and input the Metadata URL in your WorkOS Connection Settings. Your Connection will then be verified and good to go!

![A screenshot showing where to select "Edit Metadata Configuration" in the "Identity Provider Configuration" in the WorkOS dashboard.](https://images.workoscdn.com/images/bedce7fc-3dcd-468d-ab31-1e65f8f14cb9.png?auto=format\&fit=clip\&q=50)
