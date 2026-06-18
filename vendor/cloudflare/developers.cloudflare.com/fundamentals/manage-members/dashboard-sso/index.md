---
title: Set up dashboard SSO
description: Configure single sign-on (SSO) for the Cloudflare dashboard using your identity provider to enforce authenticated access for your email domain.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up dashboard SSO

Cloudflare offers single sign-on (SSO) for all customers who log in with a custom email domain. By creating a Cloudflare SSO connector, you can enforce SSO to the Cloudflare dashboard with the identity provider (IdP) of your choice. SSO will be enforced for every user in your email domain.

## Availability

Cloudflare Dashboard SSO is available for free to all plans.

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | Yes | Yes      | Yes        | Yes |

## Prerequisites

1. You must control your email domain and be able to add a TXT record to verify this.  
   * Public email providers such as `@gmail.com` are not allowed.  
   * Every user with that email domain must be an employee in your organization. For example, university domains such as `@harvard.edu` are not allowed because they include student emails.
2. You must be a super administrator and be able to access the Cloudflare API.
3. A Cloudflare Zero Trust organization with any subscription tier (including Free) must be created. To set up a Cloudflare Zero Trust organization, refer to [Create a Cloudflare Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/setup/#2-create-a-zero-trust-organization).

## 1\. Set up an IdP

Add an IdP to Cloudflare Zero Trust by following [our detailed instructions](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/).

Once you configure your IdP, make sure you also [test your IdP](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/#test-idps-in-cloudflare-one).

## 2\. Register your domain with Cloudflare for SSO

Warning

You must create an [Account API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the role `SSO Connector Edit` and store it securely. This acts as a backup plan, allowing you to disable SSO via the API if you are accidentally locked out, such as due to changes in your IdP configuration later.

* [ Dashboard ](#tab-panel-8587)
* [ API ](#tab-panel-8588)

1. Once you have configured an IdP in Cloudflare One, go to the **Members** page to manage SSO connectors.
[ Go to **Members** ](https://dash.cloudflare.com/?to=/:account/members)
1. If step 1 was successful, a button to add a new SSO domain will be present. Select the button to begin the process of adding a new SSO domain.

![Screenshot of the SSO connector create modal](https://developers.cloudflare.com/_astro/create_modal.UuyGmCgI_ZLWxQJ.webp)

1. Enter your email domain and select **Create** to move to the verification step.

Note

Some top level domains, such as `.edu`, are prohibited from being used as SSO domains.

Using a command line terminal where you have already set the environment variable `CLOUDFLARE_API_TOKEN` to a user or account API token which has the `SSO Connector Edit` permission, run the following command to create an SSO connector. Replace `{account_id}` with your account ID, and `{domain}` with your email domain.

cURL command

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/sso_connectors" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{"email_domain":"{domain}"}'


```

```

{

  "success": true,

  "errors": [],

  "messages": [],

  "result": {

    "id": "c3ebcba5c20b42f73e111110d0be67d",

    "enabled": false,

    "email_domain": "cool.cats",

    "verification": {

      "code": "cloudflare_dashboard_sso=111111111",

      "status": "pending"

    },

    "created_on": "2025-09-05T20:35:34Z"

  }

}


```

## 3\. Verify domain ownership

* [ Dashboard ](#tab-panel-8589)
* [ API ](#tab-panel-8590)

If you are unable to change your DNS records right away, the option to verify later is available. The verification process can be manually triggered from the actions menu for that connector in the list.

![Screenshot of the SSO connector create modal](https://developers.cloudflare.com/_astro/verify_modal.DVxZpDs__Z27Ilnd.webp)

Copy the verification code and create a TXT record in your DNS configuration with that value. The record must include all of the text including the `cloudflare_dashboard_sso=` prefix.

Cloudflare will automatically poll this DNS record until it is found or a timeout is reached within two days.

If the verification process fails due to timeout, you can manually reinitiate the polling by selecting **Begin verification** in the actions menu for that connector in the list.

Copy the verification code (for example `cloudflare_dashboard_sso=1111111`) and create a `TXT` record in your DNS configuration with that value. To test that the DNS record was correctly configured, you can use the `dig` command to query your email domain:

Terminal window

```

dig cool.cats TXT +short


```

```

"cloudflare_dashboard_sso=111111111"


```

The `TXT` record must include the `cloudflare_dashboard_sso=` prefix along with the numerical code.

Cloudflare will automatically poll this DNS record until it is found or a timeout is reached within two days. If verification fails due to timeout, you may manually reinitiate the polling by running the following command:

cURL command

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/sso_connectors/{sso_connector_id}/begin_verification" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

Once the verification process has completed or timed out, you will receive an email notification with the verification result.

## 4\. Enable dashboard SSO

Warning

Enabling Cloudflare Dashboard SSO for an email domain (for example, `@mycompany.com`) will apply globally to all users with that domain, regardless of which accounts those users have access to. All users will be required to authenticate via the specified identity provider, including users registered on Cloudflare prior to the domain being configured for SSO.

Once the verification process has completed and successfully verified domain ownership, you may enable the connector.

Domains that are associated with an already enabled connector belonging to a different account may not be enabled on a new account until disabled on the old account.

* [ Dashboard ](#tab-panel-8591)
* [ API ](#tab-panel-8592)

Enable the connector by selecting **Enable** in the Actions menu for that connector in the list.

![Screenshot of the SSO connector enable button](https://developers.cloudflare.com/_astro/verified_domain.B1SGjH_l_1biz1k.webp)

Enable the connector by running the following — again, replacing the `{account_id}` value with your account ID, and additionally replacing the `{sso_connector_id}` with the value you obtained from the `id` field in the response to the previous call.

cURL command

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/sso_connectors/{sso_connector_id}" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{"enabled": true}'


```

## Test your IdP before enforcement

Before enabling SSO for your domain, verify that your identity provider is configured correctly:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Find your IdP and select **Test**.
3. Confirm that the test returns a successful authentication result.

If the test fails, review your IdP configuration against the [identity provider setup instructions](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) before enabling the SSO connector.

### Troubleshoot IdP errors

If you encounter errors during IdP setup or testing, provide the following when [contacting support](https://developers.cloudflare.com/support/contacting-cloudflare-support/):

1. The error message returned by the IdP test.
2. A sanitized [HAR file](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#generate-a-har-file) captured while running the IdP test from the dashboard.

## Limitations

Cloudflare dashboard SSO does not support:

* Users with plus-addressed emails, such as `example+2@domain.com`. If you have users like this added to your Cloudflare organization, they will be unable to login with SSO.
* Adding a separate email-based policy to the Zero Trust SSO application that does not match your SSO domain policy.
* Multiple Zero Trust domain policies. If another domain policy is required, you can create another SSO connector. This will create a second policy for that new domain in your SSO application.
* Deleting the auto-generated Zero Trust `allow email domain` policy. If this policy is deleted, your organization's administrators cannot access the Cloudflare dashboard.

## IdP-initiated SSO

IdP-initiated login is supported for Cloudflare dashboard SSO, with configuration available via your identity provider (IdP).

A step-by-step guide is currently available for Okta, and similar configurations are possible with other identity providers that support custom SSO endpoints.

### Okta

Configure an identity provider (IdP)-initiated single sign-on (SSO) session using Cloudflare Zero Trust and Okta.

#### Prerequisites

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications** \> select your **SSO App**.
2. Select **Configure** to access the application settings.
3. In the **Basic Information** section, copy the **SSO Endpoint URL** and **Access Entity ID or Issuer**. You will need these values for your IdP setup.

#### Configure Okta as the IdP

1. Log in to your [Okta Admin Dashboard ↗](https://login.okta.com/) and go to **Applications** \> **Applications**.
2. Select **Create App Integration** to start a new SAML integration to handle the IdP-initiated SSO flow. Note that this is a second, distinct Cloudflare-Okta integration, created separately from the [IdP integration with Zero Trust](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/).
3. In the pop-up, select **SAML 2.0** and select **Next**.
4. Enter a name for the app and select **Next**.
5. In the **Single Sign-On URL** field, paste the **SSO Endpoint URL** [you copied earlier](https://developers.cloudflare.com/fundamentals/manage-members/dashboard-sso/#prerequisites-1).
6. In the **Audience URI (SP Entity ID)** field, paste the **Access Entity ID or Issuer** [you copied earlier](https://developers.cloudflare.com/fundamentals/manage-members/dashboard-sso/#prerequisites-1).
7. Set the **Name ID Format** to **EmailAddress**.
8. Set the **Application Username** to **Email**.
9. Select **Next** \> **Finish** to save the integration.
10. Test the integration by going to your Okta User Dashboard, locating the new app tile, and selecting it to verify the SSO flow.

**(Optional) Enforce single IdP login with instant authentication**

If you use only one IdP (for example, Okta) for Cloudflare SSO and want users to skip the identity provider selection prompt:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications** \> select your **SSO App**.
2. Go to **Authentication**.
3. Disable **Accept all available identity providers** and ensure only Okta is selected as the login method.
4. Enable **Apply instant authentication** to allow users to skip identity provider selection.

## Bypass dashboard SSO

This section describes how to restore access to the Cloudflare dashboard in case you are unable to login with SSO.

### Option 1: Add a backup IdP

If there is an issue with your SSO IdP provider, you can add an alternate IdP using the API. The following example shows how to add [Cloudflare One-time PIN](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/) as a login method:

1. [Add](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/identity%5Fproviders/methods/create/) one-time PIN login:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Organizations, Identity Providers, and Groups Write`  
Add an Access identity provider  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/identity_providers" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "type": "onetimepin",  
    "config": {}  
  }'  
```
2. [Get](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/applications/methods/list/) the `id` of the `dash_sso` Access application. You can use [jq ↗](https://jqlang.github.io/jq/download/) to quickly find the correct application:  
cURL command  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps" \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  | jq '.result[] | select(.type == "dash_sso")'  
```

```

   {

     "id": "3537a672-e4d8-4d89-aab9-26cb622918a1",

     "uid": "3537a672-e4d8-4d89-aab9-26cb622918a1",

     "type": "dash_sso",

     "name": "SSO App"

     // ...

   }


```

1. Using the `id` obtained above, [update](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/applications/methods/update/) **SSO App** to accept all identity providers. To avoid overwriting your existing configuration, the PUT request body should contain all fields returned by the previous GET request.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Apps and Policies Write`  
Update an Access application  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps/3537a672-e4d8-4d89-aab9-26cb622918a1" \  
  --request PUT \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "id": "3537a672-e4d8-4d89-aab9-26cb622918a1",  
    "uid": "3537a672-e4d8-4d89-aab9-26cb622918a1",  
    "type": "dash_sso",  
    "name": "SSO App",  
    "allowed_idps": []  
  }'  
```

Users will now have the option to log in using a one-time PIN.

### Option 2: Disable dashboard SSO

Warning

Before disabling SSO, make sure you have access to your Cloudflare user email. This will allow you to reset your password in case you get logged out of the Cloudflare dashboard.

* [ Dashboard ](#tab-panel-8583)
* [ API ](#tab-panel-8584)

1. Navigate to the **Members** page.
[ Go to **Members** ](https://dash.cloudflare.com/?to=/:account/members)
1. Go to **Settings**.
2. Select the actions menu for the SSO connector in the list and select **Disable**.
3. Type the domain of the connector and click confirm to complete the disable action.

The following API calls will disable SSO enforcement for an account. This action can only be performed by API tokens with the `SSO connectors edit` role or Super Administrators.

1. Get your SSO connector `id`:  
cURL command  
```  
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/sso_connectors" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```

```

   {

     "result": [

       {

         "id": "d616ac82cc7f87153112d75a711c5c3c",

         "email_domain": "cool.cats",

         "enabled": true

         // ...

       }

     ],

     "success": true,

     "errors": [],

     "messages": []

   }


```

1. Disable the SSO connector:  
cURL command  
```  
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/sso_connectors/{connector_id}" \  
  --request PATCH \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "enabled": false  
  }'  
```

```

   {

     "result": [

       {

         "id": "d616ac82cc7f87153112d75a711c5c3c",

         "email_domain": "cool.cats",

         "enabled": false

         // ...

       }

     ],

     "success": true,

     "errors": [],

     "messages": []

   }


```

Users can now log in using their Cloudflare account email and password. If a user does not have a password, they can use the [forgot password](https://developers.cloudflare.com/fundamentals/user-profiles/change-password-or-email/#forgot-your-password) method on the login page to create one.

## Change your Zero Trust team name

Cloudflare does not allow you to change your team name while a SSO connector is created. To change your team name, you must disable and delete your SSO connector(s).

* [ Dashboard ](#tab-panel-8585)
* [ API ](#tab-panel-8586)

1. Navigate to the **Members** page.
[ Go to **Members** ](https://dash.cloudflare.com/?to=/:account/members)
1. Go to **Settings**.
2. Disable all SSO connectors.
3. Delete all SSO connectors.

1. Get all SSO connectors for your account.  
cURL command  
```  
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/sso_connectors" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```
2. Disable any active SSO connectors using the `id` of each connector from the previous step.  
cURL command  
```  
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/sso_connectors/{connector_id}" \  
  --request PATCH \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "enabled": false  
  }'  
```
3. Delete all SSO connectors using the `id` of each connector from the previous step.  
cURL command  
```  
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/sso_connectors/{connector_id}" \  
  --request DELETE \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Custom pages**.
2. Under **Team domain**, select **Edit** to enter the new team name. Select **Save**.
3. In your identity provider, update your Cloudflare integration with the new team name. For example, if you are using a SAML IdP, you will need to update the Single Sign-on URL and Entity ID to `https://<new-team-name>.cloudflareaccess.com/cdn-cgi/access/callback`.
4. Recreate any deleted SSO connectors using the steps in [Register your domain with Cloudflare for SSO](https://developers.cloudflare.com/fundamentals/manage-members/dashboard-sso/#2-register-your-domain-with-cloudflare-for-sso).
5. Follow the verification and enable steps after recreating the SSO connectors.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/manage-members/dashboard-sso/#page","headline":"Set up dashboard SSO · Cloudflare Fundamentals docs","description":"Configure single sign-on (SSO) for the Cloudflare dashboard using your identity provider to enforce authenticated access for your email domain.","url":"https://developers.cloudflare.com/fundamentals/manage-members/dashboard-sso/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSO"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/manage-members/","name":"Members and permissions"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/manage-members/dashboard-sso/","name":"Set up dashboard SSO"}}]}
```
