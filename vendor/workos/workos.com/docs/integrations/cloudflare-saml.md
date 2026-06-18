# Cloudflare

## Introduction

Each SSO Identity Provider requires specific information to create and configure a new [Connection](https://workos.com/docs/glossary/connection). Often, the information required to create a Connection will differ by Identity Provider.

To create a Cloudflare SAML Connection, you'll need to manually enter the SSO URL, [IdP Entity ID](https://workos.com/docs/glossary/idp-uri-entity-id), and X.509 Certificate obtained from your Cloudflare instance. Instructions on where to obtain these will be covered in this guide.

***

## What WorkOS provides

The first thing you'll need to do is create a new Cloudflare SAML connection in your [WorkOS Dashboard](https://dashboard.workos.com/). Start by logging in to your WorkOS dashboard and browse to the "Organizations" tab on the left hand navigation bar.

Select the organization you'd like to configure a Cloudflare SAML Connection for, and from the dropdown menu select "Add Connection".

![A screenshot showing how to add an SSO connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/685a5cfc-14f2-44b9-95de-3b6af1c1b4b1.png?auto=format\&fit=clip\&q=50)

Select "Cloudflare SAML" as the Identity Provider and give the Connection a descriptive name. Once this is filled out, click "Create Connection".

![A screenshot showing how to create a Cloudflare SAML Connection.](https://images.workoscdn.com/images/bb5d99c0-0f69-4ef6-b67d-654dd2311745.png?auto=format\&fit=clip\&q=50)

WorkOS provides the [ACS URL](https://workos.com/docs/glossary/acs-url) and the [SP Entity ID](https://workos.com/docs/glossary/sp-entity-id). These are available in your Connection's Settings in the Developer Dashboard.

![A screenshot showing where to find the Service Provider details in the WorkOS Dashboard.](https://images.workoscdn.com/images/bea6f73d-6dae-452b-be22-f22861c9497c.png?auto=format\&fit=clip\&q=50)

The ACS URL is the location an Identity Provider redirects its authentication response to. In Cloudflare's case, it needs to be set by the organization when configuring the application in the Cloudflare instance.

The SP Entity ID is a URI used to identify the issuer of a SAML request. In this case, the entity ID is used to communicate that WorkOS will be the party performing SAML requests to the organization's Cloudflare instance.

***

## What you'll need

Cloudflare SAML is a unique integration in that it sits between WorkOS and the Identity Provider. This allows for additional rules to be configured, but also means there are two connections that need to be made. The first necessary connection is between Cloudflare and the IdP, and the second connection is between WorkOS and Cloudflare.

***

## (1) Connect Cloudflare with your Identity Provider

First, create the connection between Cloudflare and the Identity Provider. Cloudflare Access allows you to connect with any IdP that supports a SAML 2.0 connection. Follow the [documentation from Cloudflare](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/generic-saml) to configure a SAML application connection between Cloudflare and your IdP.

The one deviation from the Cloudflare documentation is that the SAML attributes must include `email`, `firstName`, `lastName`, and `id`. Email is included by default as the "Email attribute name", but you will need to add the other three as SAML attributes.

When setting up the connection, be sure to enter `email`, `firstName`, `lastName`, and `id` as SAML attributes.

![A screenshot showing how to configure SAML attributes in Cloudflare Access.](https://images.workoscdn.com/images/57473539-2c40-4c16-b59b-471cbdce1764.png?auto=format\&fit=clip\&q=50)

Save the connection and then click the "Test" button. When successful, you will see a success screen including your `saml_attributes` that have been added.

![A screenshot showing a successful test of Cloudflare Access.](https://images.workoscdn.com/images/bd575c26-8d01-4e12-8e7e-70198da3e33d.png?auto=format\&fit=clip\&q=50)

***

## (2) Add an Application in Cloudflare Access

Next, create the connection between Cloudflare and WorkOS. From the Cloudflare Zero Trust dashboard Access menu, select "Applications", then "Add an application".

![A screenshot showing where to add an application in Cloudflare Access.](https://images.workoscdn.com/images/ae6525fa-194c-44f5-a20b-f6ea14667ec2.png?auto=format\&fit=clip\&q=50)

Select "SaaS" for the type of application.

![A screenshot highlighting the SaaS application type in Cloudflare.](https://images.workoscdn.com/images/9202ac92-d1b7-4ad7-9c2d-486528e8edcb.png?auto=format\&fit=clip\&q=50)

Copy the ACS URL and Entity ID from the Connection Settings in your WorkOS Dashboard.

![A screenshot showing where to find the Service Provider details in the WorkOS Dashboard.](https://images.workoscdn.com/images/bea6f73d-6dae-452b-be22-f22861c9497c.png?auto=format\&fit=clip\&q=50)

Select the name of your application from the dropdown menu. If your application is not listed, type the name to save it.

Paste the ACS URL and SP Entity ID to the corresponding fields in Cloudflare. Then select the Name ID Format that you would like to use for this application. For this example we'll use Unique ID.

![A screenshot showing where to input Service Provider details into the Cloudflare application.](https://images.workoscdn.com/images/2417371c-2a7d-41e7-a98b-295461e1741f.png?auto=format\&fit=clip\&q=50)

***

## (3) Configure Attribute Mapping

Now, Configure the attribute statements. WorkOS requires that `email`, `firstName`, `lastName`, and `id` be included. Cloudflare automatically sends `id` and `email`, so you only need to add `firstName` and `lastName`. These attributes were configured in Step 1, and the mapped values are the same here.

Add `firstName` and `lastName` to both the right and left sides of the SAML attribute statements.

![A screenshot showing where to configure Cloudflare attribute mapping.](https://images.workoscdn.com/images/6d0a7e54-e912-4cb7-8688-427d595d30e6.png?auto=format\&fit=clip\&q=50)

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To return this information, add a new attribute statement with `groups` as the "Name" and map it to the "IdP attribute" for `groups`, as shown in the example below.

![A screenshot showing how to configure a groups attribute in Cloudflare.](https://images.workoscdn.com/images/659df99d-79b9-4fd4-bcec-69b337504cfe.png?auto=format\&fit=clip\&q=50)

#### Resolving groups attribute issues

If you're having issues getting the `groups` attribute to come through, it's possible that Cloudflare is sending it as a nested structure, specifically an array of group objects rather than plain strings.

WorkOS expects `groups` to be a top-level attribute where each value is a simple string, such as the group name or ID.

To resolve this, go to the **Advanced Settings** section of your Cloudflare Access application and define a [JSONata transformation](https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/saas-apps/generic-saml-saas/#jsonata-transforms) to map the structured `groups` attribute into the expected format.

For example, to extract the `name` from each group object, use the following transformation: `$ ~> | $ | { "groups": groups.name } |`

![A screenshot showing JSONata transform applied to the groups attribute](https://images.workoscdn.com/images/3be403b4-26a1-40b6-a64e-3503f6f69a21.png?auto=format\&fit=clip\&q=50)

This will transform an input like:

```json
{
  "groups": [
    { "name": "Engineering", "id": "abc123" },
    { "name": "Finance", "id": "def456" }
  ]
}
```

Into the expected format:

```json
{
  "groups": ["Engineering", "Finance"]
}
```

You may also use groups.id if you prefer to map group IDs instead.

> Finish role assignment set-up by navigating to the SSO connection page in the *Organization* section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

***

## (4) Finish SSO Application Configuration

Select the Identity Provider that you are using from the list. In this example we are using an Okta SAML connection.

![A screenshot highlighting where to select the Identity Provider in the Cloudflare application.](https://images.workoscdn.com/images/0f4ea850-5111-4659-a67f-8887cde842dd.png?auto=format\&fit=clip\&q=50)

Configure at least one policy and one rule, then click next. For this example the Policy sets the session length to 30 minutes for everyone.

![A screenshot showing where to configure policy and rules for the Cloudflare application.](https://images.workoscdn.com/images/c6141486-5b88-47e5-88d8-161294698ece.png?auto=format\&fit=clip\&q=50)

***

## (5) Copy Connection Credentials

The SSO endpoint, Entity ID, and Public key (X.509 certificate) all will be entered in the Connection details in the [WorkOS Dashboard](https://dashboard.workos.com/). The SSO endpoint and Entity ID can be entered as-is, but the Public Key needs to be formatted as an X.509 certificate.

![A screenshot showing where to copy the connection credentials from the Cloudflare dashboard.](https://images.workoscdn.com/images/81f19129-0b22-4f78-b238-e9b087a3a52b.png?auto=format\&fit=clip\&q=50)

To format the Public Key, copy the value to a text editor and add the following header and footer to the Public Key. Ensure there are no spaces above or below the Key value, then save with the file extension ".cert".

```shell title="Certificate format"
-----BEGIN CERTIFICATE-----
<PUBLIC KEY VALUE>
-----END CERTIFICATE-----
```

The format of the file should look like this when you're finished.

```shell title="Completed Certificate Format"
-----BEGIN CERTIFICATE-----
MIIDUTCCAjmgAwIBAgIRAN557boQ2ZxW4Ww08cZYK2IwDQYJKoZIhvcNAQELBQAw
YjELMAkGA1UEBhMCVVMxDjAMxxxxxAgTBVRleGFzMQ8wDQYDVQQHEwZBdXN0aW4x
EzARBgNVBAoTCkNsb3VkZmxhcmUxHTAbBgNVBAMTFGNsb3VkZmxhcmVhY2Nlc3Mu
Y29tMB4XDTxxxxxwMjE5MzMxM1oXDTMyMDIwMjE5MzMxM1owYjELMAkGA1UEBhMC
VVMxDjAMBgNVBAgTBVRleGFzMQ8wDQYDVQQHEwZBdXN0aW4xEzARBgNVBAoTCkNs
b3VkZmxhcmUxHTAbBgNVBAMTFGNsb3VkZmxxxxxhY2Nlc3MuY29tMIIBIjANBgkq
hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA49p6jXzk65DeG4DI2NgW0UOOJrd+9qYS
OCuBYq/e4IqSeqchsm1JDY9MjB6xmiw+urC1qWuj0MS4dwAJQwiGFbCGDh5m4FAF
mZm5VaMkW5Q+MG5zXRfeLmhvLuT0XVBcDlkwPC3k28/moKi1KlwPcujLF43+rf2d
8Rm6ZNCJgfVzRxxxxxPd5NGpNlEZ0ViPXM1gsO15/1Iginevv+xKqRTx0vMsNLWJ
BwWLAAqm5b6U9XQefwy9lPqPywFwCuZEMXwI9Rpm0f2xmOK56EudtdSkQ1JtSgYX
x9rf/97NfP8wI2x1IncQtwdWNdW5cvxMqYU/Za6WZvjNCnpFQGXLJQIDAQABowIw
ADANBgkqhkiG9w0BAQsFAAOCAQEARZ0h2ZeNXSme0EbQeJfEFOX+mj9rPkHIJFfQ
G7+dRG6DwDubxG56TsvUINcJX8O5C6oQ0T6dRutO/jG5LxJqmCz5wLUTA/6/YLDk
95gbYyJ/yfLm4sd6DEoXzWSld+EZ5b86pxFnvR/+cPY2tcSghQ+moZKR5THwHLsZ
hie2Pr6UVvuS5D9BC4ijR+cPyB5r4qliI9C1p8phuZctoX9dPpFY+UwkWgUDx9sz
UXFJsqueoibxfVqh4Jzdw+2XH6xN3WvTdJN4Sh1fqEpBeOxxxxxlRrCAJiMnLtG6
QgHF9ZnNRbIFcUHF/lyWY3oxcvgeUwEnE5QVVbdoMMGKKgffbQ==
-----END CERTIFICATE-----
```

***

## (6) Provide Connection Credentials

Navigate to the Connection in your Developer Dashboard. Enter the SSO endpoint in the [IdP SSO URL](https://workos.com/docs/glossary/idp-sso-url) field and enter the "Access Entity ID or Issuer" value into the "IdP URI (Entity ID)" field.

Upload the file that you saved for the X.509 certificate to the "Add an X.509 Certificate" field. Click Save Configuration.

![A screenshot showing where upload the Metadata configuration details.](https://images.workoscdn.com/images/2d149107-fbc3-4e09-a644-b68dc5ff151b.png?auto=format\&fit=clip\&q=50)

Your Connection will then be Active and good to go!
