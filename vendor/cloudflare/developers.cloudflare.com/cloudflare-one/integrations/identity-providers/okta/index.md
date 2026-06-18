---
title: Okta
description: Integrate Okta as an identity provider for Cloudflare One.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Okta

Okta provides cloud software that helps companies manage and secure user authentication to modern applications, and helps developers build identity controls into applications, website web services, and devices. You can integrate Okta with Cloudflare One and build rules based on user identity and group membership. Cloudflare One supports Okta integrations using either the OIDC (default) or [SAML](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/okta-saml/) protocol.

Additionally, you can configure Okta to use risk information from Cloudflare One [user risk scores](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/risk-score/) to create SSO-level policies. For more information, refer to [Send risk score to Okta](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/risk-score/#send-risk-score-to-okta).

## Prerequisites

* A [Zero Trust Organization](https://developers.cloudflare.com/cloudflare-one/setup/) with any subscription tier (including Free)
* A [Cloudflare One administrator role](https://developers.cloudflare.com/cloudflare-one/roles-permissions/) with `Access Edit` permissions

## Supported features

* **SP-initiated SSO**: When a user goes to an Access application, Access redirects them to sign in with Okta.
* **SCIM provisioning**: Synchronize Okta groups and automatically deprovision users. SCIM currently requires a separate [custom OIDC application](#synchronize-users-and-groups).

## Set up Okta as an OIDC provider (Okta App Catalog)

Active Directory limitation

The Okta App Catalog template does not support synchronizing [Active Directory groups ↗](https://help.okta.com/en-us/Content/Topics/Directory/ad-agent-import-groups.htm). If you would like to build policies using AD groups, use the Okta [OIDC app integration](#set-up-okta-as-an-oidc-provider-custom-app-integration) or [SAML app integration](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/okta-saml/).

To set up the Okta integration using the Okta Integration Network (OIN) App Catalog:

1. Log in to your Okta admin dashboard.
2. Go to **Applications** \> **Applications**.
3. Select **Browse App Catalog**.
4. Search for `Cloudflare` and select the **Cloudflare One** app.
5. Select **Add integration**.
6. In **Application label**, enter a name for the application (for example, `Cloudflare Access`).
7. In **Team domain**, enter your Cloudflare Zero Trust team name (only the subdomain prefix, do not include `.cloudflareaccess.com`):  
```  
<your-team-name>  
```  
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.
8. In the **Sign On** tab, copy the **Client ID** and **Client secret** and paste these into `App ID` and `Client secret`.
9. Copy your Okta Account URL (without the `-admin` value) and copy it into the Cloudflare Okta setup field.

## Set up Okta as an OIDC provider (Custom App Integration)

1. Log in to your Okta admin dashboard and go to **Applications** \> **Applications**.
2. Select **Create App Integration**.
3. For the **Sign-in method**, select **OIDC - OpenID Connect**.  
![Creating an OIDC application in Okta](https://developers.cloudflare.com/_astro/okta-1.BlGKmCip_Z24dx2X.webp)
4. For the **Application type**, select **Web Application**. Select **Next**.
5. Enter any name for the application. In the **Sign-in redirect URIs** field, enter the following URL:  
```  
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback  
```  
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.
6. Choose the desired **Assignment** option and select **Save**.
7. From the application view, go to the **Sign On** tab.
8. Scroll down to **Token claims** and select **Show legacy configuration** \> **Edit**.  
![Configuring the Groups claim filter in Okta](https://developers.cloudflare.com/_astro/okta-2.DrNQXWIc_ZCGOg7.webp)
9. Set **Groups claim filter** to _Matches regex_ and its value to `.*`.

Token claim expressions

* Groups managed outside of Okta (for example, Microsoft Entra ID or Google groups) may require different regex values. For more information, refer to the Okta documentation on [Groups Claims ↗](https://support.okta.com/help/s/article/Why-isnt-my-Groups-claim-returning-Active-Directory-groups) and [OpenID Connect Claims ↗](https://support.okta.com/help/s/article/Can-we-retrieve-both-Active-Directory-and-Okta-groups-in-OpenID-Connect-claims).
* To configure more complex expressions, refer to Okta's [token claims documentation ↗](https://help.okta.com/okta%5Fhelp.htm?type=oie&locale=en&id=federated-claims-overview).

1. In the **General** tab, copy the **Client ID** and **Client secret**.  
![Finding your Client credentials in Okta](https://developers.cloudflare.com/_astro/okta-3.BzGr0OXt_293BnQ.webp)
1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Under **Your identity providers**, select **Add new identity provider**. Select **Okta** as your identity provider.
3. Fill in the following information:  
   * **Name**: Name your identity provider.  
   * **App ID**: Enter your Okta client ID.  
   * **Client secret**: Enter your Okta client secret.  
   * **Okta account URL**: Enter your [Okta domain ↗](https://developer.okta.com/docs/guides/find-your-domain/main/), for example `https://my-company.okta.com`.
4. (Optional) Create an Okta API token and enter it in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) under **Zero Trust** \> **Integrations** \> **Identity providers** (the token can be read-only). This will prevent your Okta groups from failing if you have more than 100 groups.
5. (Optional) To configure [custom OIDC claims](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#custom-oidc-claims):  
   1. In Okta, create a [custom authorization server ↗](https://developer.okta.com/docs/guides/customize-authz-server/main/) and ensure that the `groups` scope is enabled.  
   2. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), enter the **Authorization Server ID** obtained from Okta.  
   3. Under **Optional configurations**, enter the claims that you wish to add to your users' identity.
6. (Optional) Enable [Proof of Key Exchange (PKCE) ↗](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.
7. Select **Save**.

To [test](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/#test-idps-in-cloudflare-one) that your connection is working, select **Test**.

## Synchronize users and groups

The Okta integration allows you to synchronize IdP groups and automatically deprovision users using [SCIM](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/). To enable SCIM provisioning between Access and Okta, you need two separate app integrations in Okta:

* The OIDC application you created when adding Okta as an identity provider. You can create this application via the [Okta App Catalog](#set-up-okta-as-an-oidc-provider-okta-app-catalog) or via a [Custom App Integration](#set-up-okta-as-an-oidc-provider-custom-app-integration).
* A second Okta application of type **SCIM 2.0 Test App (Header Auth)**. This is technically a SAML app but is responsible for sending user and group info via SCIM.

Note

If you would like to only maintain one Okta app instance, Okta does support SAML and SCIM within the same application. Create a [generic SAML integration](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/) and configure those values in the **Sign-On** field of your Okta SCIM application.

### 1\. Enable SCIM in Cloudflare One

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Find the Okta integration and select **Edit**.
3. Turn on **Enable SCIM**
4. (Optional) Configure the following settings:
* **Enable user deprovisioning**: [Revoke a user's active session](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#per-user) when they are removed from the SCIM application in Okta. This will invalidate all active Access sessions and prompt for reauthentication for any [Cloudflare One Client session policies](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/).
* **Remove user seat on deprovision**: [Remove a user's seat](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/) from your Cloudflare One account when they are removed from the SCIM application in Okta.
* **SCIM identity update behavior**: Choose what happens in Cloudflare One when the user's identity updates in Okta.  
   * _Automatic identity updates_: Automatically update the [User Registry identity](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/users/) when Okta sends an updated identity or group membership through SCIM. This identity is used for Gateway policies and Cloudflare One Client [device profiles](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/); Access will read the user's updated identity when they reauthenticate.  
   * _Group membership change reauthentication_: [Revoke a user's active session](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#per-user) when their group membership changes in Okta. This will invalidate all active Access sessions and prompt for reauthentication for any [Cloudflare One Client session policies](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/). Access will read the user's updated group membership when they reauthenticate.  
   * _No action_: Update the user's identity the next time they reauthenticate to Access or the Cloudflare One Client.
1. Select **Regenerate Secret**. Copy the **SCIM Endpoint** and **SCIM Secret**. You will need to enter these values into Okta.
2. Select **Save**.

The SCIM secret never expires, but you can manually regenerate the secret at any time.

### 2\. Configure SCIM in Okta

1. On your Okta admin dashboard, go to **Applications** \> **Applications**.
2. Select **Browse App Catalog**.
3. Search for `SCIM Header Auth` and select **SCIM 2.0 Test App (Header Auth)**.
4. Select **Add Integration**.
5. On the **General Settings** tab, name your application and select **Next**.
6. On the **Sign-on Options** tab, ensure that **SAML 2.0** is selected.
7. Under **Credential Details**, set **Application username format** to either _Okta Username_ or _Email_. This value will be used for the SCIM `userName` attribute.  
Note  
The `userName` attribute must match the user's email address in Cloudflare One.
8. Select **Done** to create the integration.
9. On the **Provisioning** tab, select **Configure API Integration**.
10. Select **Enable API integration**.
11. In the **Base URL** field, enter the **SCIM Endpoint** obtained from Cloudflare One.
12. In the **API Token** field, enter the **SCIM Secret** obtained from Cloudflare One.  
![Enter SCIM values into Okta](https://developers.cloudflare.com/_astro/enter-scim-values.CxQEosHF_1P1ybq.webp)
13. Select **Test API Credentials** to ensure that the credentials were entered correctly. Select **Save**.
14. On the **Provisioning** tab, select **Edit** and enable:  
   * **Create Users**  
   * **Update User Attributes**  
   * **Deactivate Users**  
![Configure provisioning settings in Okta](https://developers.cloudflare.com/_astro/enable-provisioning.CUZPrFdg_1mHfaq.webp)
15. In the **Assignments** tab, add the users you want to synchronize with Cloudflare Access. You can add users in batches by assigning a group. If a user is removed from the application assignment via a either direct user assignment or removed from the group that was assigned to the app, this will trigger a deprovisioning event from Okta to Cloudflare.
16. In the **Push Groups** tab, add the Okta groups you want to synchronize with Cloudflare Access. These groups will display in the Access policy builder and are the group memberships that will be added and removed upon membership change in Okta.  
Note  
Groups in this SCIM app Push Groups integration should match the groups in your base [OIDC app integration](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/okta/#set-up-okta-as-an-oidc-provider). Because SCIM group membership updates will overwrite any groups in a user's identity, assigning the same groups to each app ensures consistent policy evaluation.

To verify the integration, select **View Logs** in the Okta SCIM application.

To check if user identities were updated in Cloudflare One, view your [SCIM provisioning logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/scim-logs/).

Note

New users must first [register the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) or authenticate to an Access application before SCIM provisioning can begin.

## Example API Configuration

```

{

  "config": {

    "client_id": "<your client id>",

    "client_secret": "<your client secret>",

    "okta_account": "https://dev-abc123.oktapreview.com"

  },

  "type": "okta",

  "name": "my example idp"

}


```

## Troubleshooting

### Failed to fetch user/group information from the identity

If you see the error `Failed to fetch user/group information from the identity`, double-check your Okta configuration:

* If you have more than 100 Okta groups, ensure you include the API token.
* The request may be blocked by the [ThreatInsights feature ↗](https://help.okta.com/en/prod/Content/Topics/Security/threat-insight/ti-index.htm) within Okta.

### Access login fails due to Okta Enhanced Dynamic Zone

If Okta's [Enhanced Dynamic Zone ↗](https://help.okta.com/oie/en-us/content/topics/security/network/network-zones.htm) (`DefaultEnhancedDynamicZone`) is active with `ALL_ANONYMIZERS` enabled, Okta may block requests from Cloudflare IP addresses. This causes Access logins to fail with the error `Failed to fetch user/group information from the identity provider`.

In the Okta system logs, this appears as:

```

Blocked request from IP: <BLOCKED_IP>, IPServiceCategory: WARP_VPN


```

This setting is configured in the Okta admin panel under **Security** \> **Network**.

To resolve this, either:

* [Unblock the false positives ↗](https://help.okta.com/oie/en-us/content/topics/security/network/unblock-false-positives.htm) by adding [Cloudflare's IP ranges ↗](https://www.cloudflare.com/ips/) to the **DefaultExemptIpZone** (IP exempt list) in Okta's network zone configuration.
* Deactivate the `DefaultEnhancedDynamicZone` in Okta's network zone configuration.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/okta/#page","headline":"Okta · Cloudflare One docs","description":"Integrate Okta as an identity provider for Cloudflare One.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/okta/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Okta","SCIM"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/okta/","name":"Okta"}}]}
```
