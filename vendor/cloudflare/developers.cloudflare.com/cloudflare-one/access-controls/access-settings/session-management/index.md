---
title: Session management
description: Session management in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Session management

A user session determines how long a user can access an Access application without re-authenticating.

## Session durations

When a user logs in to an application protected by Access, Access validates their identity against your Access policies and generates two signed JSON Web Tokens (JWTs):

| Token                                                                                                                                                | Description                                                                                                          | Expiration                                                                                                                               | Storage                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Global session token                                                                                                                                 | Stores the user's identity from the IdP and provides single sign-on (SSO) functionality for all Access applications. | [Global session duration](#global-session-duration)                                                                                      | Your Cloudflare team domain                      |
| [Application token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/) | Allows the user to access a specific Access application.                                                             | [Policy session duration](#policy-session-duration), which defaults to the [application session duration](#application-session-duration) | The hostname protected by the Access application |

The user can access the application for the entire duration of the application token's lifecycle. When the application token expires, Cloudflare will automatically issue a new application token if the global token is still valid (and the user's identity still passes your Access policies). If the global token has also expired, the user will be prompted to re-authenticate with the IdP.

The global token expiration is usually set to equal or exceed the application token expiration. Setting a longer global token provides a more secure way to allow for longer user sessions, since the global token cannot be used to directly access an application.

In summary, Access checks sessions from most specific to least specific:

1. **[Client session](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/)** (if enabled) — Overrides all other durations. The user re-authenticates when this expires.
2. **[Policy session](#policy-session-duration)** — Controls access to a specific application for users matching a specific policy.
3. **[Application session](#application-session-duration)** — The default policy session duration for all policies in the application.
4. **[Global session](#global-session-duration)** — Controls how often the user must log in to the IdP across all applications.

Refer to the [Order of enforcement](#order-of-enforcement) flowchart for a visual representation.

Note

Access and the Cloudflare One Client will evaluate identity based on a user's last-known state. If a user authenticates via your Identity Provider, but later authenticates with a different method (such as One-Time PIN), Access will no longer evaluate the user's Identity Provider group memberships. Identity Provider group memberships are created and managed by the IdP and group membership data can only persist in an IdP-based authentication.

### Global session duration

The global session duration determines how often Cloudflare Access prompts the user to log in to their identity provider. You can set a global session duration between 15 minutes and one month. The default value is 24 hours.

To set the global session duration:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Access settings**.
2. Under **Set your global session duration**, select **Edit**,
3. Select the desired timeout duration from the dropdown menu.
4. Select **Save**.

The user will be required to re-authenticate with the IdP after this period of time.

### Policy session duration

The policy session duration determines how long the user can access a self-hosted Access application. When the user's session expires, Access rechecks their stored user identity against the application's Access policies.

By default, the policy session duration is equal to the [application session duration](#application-session-duration). To configure more granular permissions for specific users, you can change the policy session duration to a value ranging from immediate timeout to one month. For example, you may wish to set the application session duration to seven days for engineers, but set a policy session duration to 24 hours for contractors.

To set the policy session duration:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Policies**.
2. Choose a policy and select **Configure**.
3. Select a **Session Duration** from the dropdown menu.
4. Save the policy.

Users who match this policy will be issued an application token with this expiration time.

### Application session duration

The application session duration is the default [policy session duration](#policy-session-duration) for all policies in an Access application. Available session durations range from immediate timeout to one month. The default value is 24 hours.

To set the application session duration:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Choose an application and select **Configure**.
3. Select a **Session Duration** from the dropdown menu.
4. Save the application.

Users who match a policy configured with a _Same as application session timeout_ duration will be issued an application token with this expiration time.

#### SaaS applications

Application session durations only control the front door to a SaaS app; Access does not control how long the user can stay in the SaaS app itself. For example, if the user logs out of the SaaS app and then comes back to it, a valid Access application token allows them to re-authenticate without another login. The SaaS app issues its own authorization cookie that manages the user's session within the app.

#### SSH, RDP, and VNC

Cloudflare does not control the length of an active SSH, VNC, or RDP session. [Application session durations](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/) determine the window in which a user can initiate a new connection or refresh an existing one.

### Cloudflare One Client session duration

When [Authenticate with Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/#configure-client-sessions-in-access) is enabled for an Access application, the Cloudflare One Client session duration takes precedence over all other session durations (application, policy, and global). As long as the Cloudflare One Client session is valid and the user is running the Cloudflare One Client, the user will not be prompted to re-authenticate with the IdP — even if the global session has expired.

### MFA session duration

If you use [independent multi-factor authentication (MFA)](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/), the MFA session duration determines how long a user can log in to Cloudflare Access without being prompted for MFA. The MFA session is independent of the global, policy, and application session durations. When logging in to an Access app with [MFA enabled](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/#configure-independent-mfa-for-an-application), users must complete an MFA challenge if their last MFA authentication falls outside the configured session duration. After authenticating with their identity provider, users are prompted for MFA. The [CF\_Device cookie](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/#cf%5Fdevice) ensures both authentication steps occur on the same device. MFA session durations do not affect how long a user has access to the application (that is controlled by the [application token](#session-durations)).

### Order of enforcement

The following flowchart illustrates how Access enforces user sessions for a self-hosted application.

flowchart TB
    %% Accessibility
    accTitle: Access session durations
    accDescr: Flowchart describing the order of enforcement for Access sessions

    %% In with user traffic
    start["User goes to Access application"]
    start--"Authenticate with Cloudflare One Client enabled" -->warpsession[Device client session expired?]
    start-- "Authenticate with Cloudflare One Client disabled" --> policysession[Policy session expired?]

		warpsession--"Yes"-->idp[Prompt to log in to IdP]
		warpsession--"No"-->accessgranted[Access granted]

		policysession--"Yes"-->globalsession[Global session expired?]
		policysession--"No"-->accessgranted

		globalsession--"Yes"-->idp
		globalsession--"No"-->refreshtoken[Check identity against Access policies]
		refreshtoken-->accessgranted
		idp-->refreshtoken


## Revoke user sessions

Access provides two options for revoking user sessions: per-application and per-user.

### Per-Application

To immediately terminate all active sessions for a specific application:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Locate the application for which you would like to revoke active sessions and select **Configure**.
3. Select **Revoke existing tokens**.

Unless there are changes to rules in the policy, users can start a new session if their profile in your identity provider is still active.

### Per-User

Access can immediately revoke a single user session across all applications in your account. However, if the user's identity profile is still active, they can generate a new session.

If you want to permanently revoke a user's access:

1. Disable their account in your identity provider so that they cannot authenticate.
2. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Users**.
3. Select the checkbox next to the user you want to revoke.
4. Select **Action** \> **Revoke**.

The user will no longer be able to log in to any application protected by Access. The user will still count towards your seat subscription until you [remove the user](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management) from your account.

### Subsequent Logins

When administrators revoke a user's Cloudflare Access token, that user will not be able to log in again for up to 1 minute. If they attempt to do so, Cloudflare Access will display an error.

## Log out as a user

To log out of Access, the end user can visit either of the following URLs:

* `<your-application-domain>/cdn-cgi/access/logout`
* `<your-team-name>.cloudflareaccess.com/cdn-cgi/access/logout`

This action [revokes the user's session](#per-user) across all applications. Access will immediately clear the authorization cookie from the user's browser, and all previously issued tokens will stop being accepted in 20-30 seconds. The only difference between these two URLs is which domain the authorization cookie is deleted from. For example, going to `<your-application-domain>/cdn-cgi/access/logout` will remove the application cookie and make the logout action feel more instantaneous.

You can use these URLs to create custom logout buttons or links directly within your application.

Note

At this time, end users cannot log themselves out on a per-application basis.

## AJAX

Pages that rely heavily on AJAX or single-page applications can block sub-requests due to an expired Access token without prompting the user to re-authenticate.

You can configure Access to provide a `401` response on sub-requests with an expired session token. We recommend using this response code to either force a page refresh or to display a message to the user that their session has expired.

In order to receive a `401` for an expired session, add the following header to all AJAX requests:

`X-Requested-With: XMLHttpRequest`

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#page","headline":"Session management · Cloudflare One docs","description":"Session management in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JSON web token (JWT)","Authentication"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/access-settings/","name":"Access settings"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/access-settings/session-management/","name":"Session management"}}]}
```
