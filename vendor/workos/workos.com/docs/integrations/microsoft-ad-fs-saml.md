# Microsoft AD FS SAML

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

To create an AD FS SAML Connection, you'll need two pieces of information: an [SP Metadata](https://workos.com/docs/glossary/sp-metadata) file and an IdP Metadata URL.

***

## (1) Configure a Relying Party Trust

Open the AD FS Management console.

![A screenshot showing the AD FS Management Console.](https://images.workoscdn.com/images/39b62cf2-a830-4cfc-b057-1717cec6e870.png?auto=format\&fit=clip\&q=50\&w=1200)

Click "Relying Party Trusts" on the left sidebar. Click "Add Relying Party Trust..." on the right sidebar to open the "AD FS Relying Party Trust Wizard".

![A screenshot showing where to add the AD FS Relying Party Trust.](https://images.workoscdn.com/images/b99f15c0-ac9d-4cd4-bd78-38f00cd3cfee.png?auto=format\&fit=clip\&q=50\&w=1200)

Select "Claims aware" and then "Start".

![A screenshot showing where to select claims in the AD FS Relying Party Trust Wizard.](https://images.workoscdn.com/images/1aaf2490-580f-4930-91b4-258326b751c3.png?auto=format\&fit=clip\&q=50\&w=1200)

Download the provided Metadata file from WorkOS by heading to the SP Metadata link in the Dashboard. Select "Import data about the relying party from a file" then select the SP Metadata file you downloaded, and click "Next".

![A screenshot showing where to import the WorkOS Metadata File.](https://images.workoscdn.com/images/9cf7ee4f-09d8-4dcc-ab92-29732ca3c691.png?auto=format\&fit=clip\&q=50\&w=1200)

Select "Permit everyone" and then "Next".

![A screenshot showing where to configure access control permissions in the AD FS Relying Party Trust Wizard.](https://images.workoscdn.com/images/94d90815-ef73-4cf5-9a8e-9b85108163d3.png?auto=format\&fit=clip\&q=50\&w=1200)

***

## (2) Choose Access Policy

Click the "Endpoints" tab and confirm that the "SAML Assertion Consumer Endpoints" matches the SAML Assertion Consumer Endpoint `https://auth.workos.com/sso/saml/acs/:id` and click "Next".

![A screenshot showing where to check the ACS URL in AD FS.](https://images.workoscdn.com/images/c0c58966-3656-4079-b9c4-1ed01e2d2412.png?auto=format\&fit=clip\&q=50\&w=1200)

Select "Configure claims issuance policy for this application" and "Close".

![A screenshot showing where to configure the AD FS claims.](https://images.workoscdn.com/images/a786ee79-750e-464f-ad4c-bdf685a7aec0.png?auto=format\&fit=clip\&q=50\&w=1200)

***

## (3) Configure Claims Issuance Policy

Click "Add Rule" in the "Edit Claims Issuance Policy" window.

![A screenshot showing where to add a rule in the Edit Claims Issuance Policy window.](https://images.workoscdn.com/images/b0ce3aa1-5a5c-498a-8b40-f9297ed03a29.png?auto=format\&fit=clip\&q=50\&w=1200)

Select "Send LDAP Attributes as Claims" and then "Next".

![A screenshot showing where to select a rule template in the Transform Claim Rule Wizard.](https://images.workoscdn.com/images/753196aa-ebd0-4456-a961-4faacbfddbd2.png?auto=format\&fit=clip\&q=50)

Submit "Attributes" as "Claim rule name", then select "Active Directory" as "Attribute Store", and configure the following attribute mappings. Then click "OK".

- `E-Mail-Addresses` → `E-Mail Address`
- `Given-Name` → `Given Name`
- `Surname` → `Surname`
- `User-Principal-Name` → `UPN`

![A screenshot showing where to map attributes in the Transform Claim Rule Wizard.](https://images.workoscdn.com/images/e835b332-47de-43e5-a34d-0031395dee9c.png?auto=format\&fit=clip\&q=50)

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information in the attribute statement, follow the guidance below.

Select "Group" as the "Outgoing Claim Type" and map an LDAP Attribute to send groups. For example, to send all groups, map the "Token-Groups - Unqualified Names" attribute.

![A screenshot showing how to map the Group claim.](https://images.workoscdn.com/images/72de6a78-46cc-4499-8ef6-f7c05fa0a087.png?auto=format\&fit=clip\&q=50)

> Finish role assignment set-up by navigating to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

***

## (4) Upload Metadata URL

Next you will want to obtain the Metadata URL from your AD FS server. AD FS publishes its metadata to a standard URL by default: `https://SERVER/federationmetadata/2007-06/federationmetadata.xml` where "SERVER" is your federation service FQDN. You can also find your ADFS Federation Metadata URL through the AD FS Management in "AD FS → Service → Endpoints" and navigate to the Metadata section.

![A screenshot showing where to find the AD FS Metadata URL.](https://images.workoscdn.com/images/f9c91a23-847c-4032-9bbb-888d071db27d.png?auto=format\&fit=clip\&q=50)

Once you have obtained the Metadata URL you will then navigate to the connection settings in WorkOS, click "Edit Metadata configuration", and upload the Metadata URL.

![A screenshot showing where to upload the AD FS Metadata URL in the WorkOS Dashboard.](https://images.workoscdn.com/images/0ab739ca-8edd-436d-b6a6-4efe3cf598fc.png?auto=format\&fit=clip\&q=50)

Once uploaded the connection will be verified and linked!
