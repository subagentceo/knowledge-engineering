---
title: Client sessions
description: Client sessions in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Client sessions

Client sessions control how often users must re-authenticate with your identity provider (IdP) while using the Cloudflare One Client (formerly WARP). Unlike legacy VPNs, which enforce a single global session timeout, Cloudflare One allows you to set session timeouts per application or per policy. You can configure session timeouts for your [Access applications](#configure-warp-sessions-in-access) or as part of your [Gateway policies](#configure-warp-sessions-in-gateway).

When a user goes to a protected application or website, Cloudflare checks their device client session duration against the configured session timeout. If the session has expired, the user will be prompted to re-authenticate with the identity provider (IdP) used to enroll in the Cloudflare One Client.

![Cloudflare One Client prompts user to re-authenticate session.](https://developers.cloudflare.com/_astro/warp-reauthenticate-session.BjGtdKWz_18URJV.webp)

_Note: Labels in this image may reflect a previous product name._

A user's device client session duration resets to zero whenever they re-authenticate with the IdP, regardless of what triggered the authentication event.

## Prerequisites

Ensure that traffic can reach your IdP and `<your-team-name>.cloudflareaccess.com` through the Cloudflare One Client.

## Configure client sessions in Gateway

You can enforce device client session timeouts on any Gateway Network and HTTP policy that has an Allow action. If you do not specify a session timeout, the device client session will be unlimited by default.

Session timeouts have no impact on Gateway DNS policies. DNS policies remain active even when a user needs to re-authenticate.

To configure a session timeout for a Gateway policy:

* [ Dashboard ](#tab-panel-7420)
* [ Terraform (v5) ](#tab-panel-7421)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies**. Choose either **Network** or **HTTP**.
2. Add a policy and select the _Allow_ action. Alternatively, choose any existing _Allow_ policy.
3. Under **Step 4 - Configure policy settings**, select **Edit** next to **Enforce Cloudflare One Client session duration**.
4. Enter a session expiration time in `1h30m0s` format and save.
5. Save the policy.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. Choose a Network (`l4`) or HTTP (`http`) policy with an Allow action.
3. In the policy's [rule\_settings ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fgateway%5Fpolicy), use the `check_session` argument to enable and configure a session timeout:  
```  
resource "cloudflare_zero_trust_gateway_policy" "network_allow_wiki_IPs" {  
  name        = "Company Wiki Network policy"  
  enabled     = true  
  account_id  = var.cloudflare_account_id  
  description = "Managed by Terraform - Allow employees to access company wiki IPs."  
  precedence  = 103  
  action      = "allow"  
  filters     = ["l4"]  
  traffic     = "net.dst.ip in ${"$"}${cloudflare_zero_trust_list.wiki_IPs.id}"  
  identity    = "identity.email matches \".*@example.com\""  
  rule_settings = {  
    check_session = {  
      enforce = true  
      duration = "1h30m0s"  
    }  
  }  
}  
```

Session checks are now enabled for the application protected by this policy. Users can continue to reach applications outside of the policy definition.

Enforce a global timeout

To enforce a global reauthentication event, set each of your Network or HTTP policies to the same device client session duration.

## Configure client sessions in Access Beta

You can allow users to log in to Access applications using their device client session. **Authenticate with Cloudflare One Client** is only supported for Access applications protected by Allow or Block policies.

To configure device client sessions for Access applications:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Access settings**.
2. Enable **Authenticate with Cloudflare One Client**.
3. Under **Session duration**, choose a session timeout value. This timeout will apply to all Access applications that have **Authenticate with Cloudflare One Client** enabled.

Note

This timeout value does not apply to [device client session checks in Gateway policies](#configure-warp-sessions-in-gateway).

1. (Optional) To enable **Authenticate with Cloudflare One Client** by default for all existing and new applications, select **Apply to all Access applications**. You can override this default setting on a per-application basis when you [create](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/) or modify an Access application.
2. Select **Save**.

Users can now authenticate once with the Cloudflare One Client and have access to your Access applications for the configured period of time. The session timer resets when the user re-authenticates with the IdP used to enroll in the Cloudflare One Client.

## Force user interaction with IdP

If the user has an active browser session with the IdP, the Cloudflare One Client will use the existing browser cookies to re-authenticate and the user will not be prompted to re-enter their credentials. You can override this behavior to require explicit user interaction in the IdP.

### Supported IdPs

* [Microsoft Entra ID](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/entra-id/#force-user-interaction-during-warp-reauthentication)

## Manually reauthenticate

To manually refresh your Cloudflare Access session and update your group information from your identity provider (IdP), go to the following URL in your browser and fill in your [team name](https://developers.cloudflare.com/cloudflare-one/faq/getting-started-faq/#what-is-a-team-domainteam-name):

`https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/refresh-identity`

Reauthenticating resets your [session duration](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/) and fetches the latest group information from the organization's IdP.

## Limitations

* **Only one user per device** — If a device is already registered with User A, User B will not be able to log in on that device through the re-authentication flow. To switch the device registration to a different user, User A must first log out from Zero Trust (if [Allow device to leave organization](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-device-to-leave-organization) is enabled), or an admin can revoke the registration from **Team & Resources** \> **Devices**. User B can then properly [enroll](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/).
* **Active connections are not terminated** — Active sessions such as SSH and RDP will remain connected beyond the timeout limit.
* **Binding Cookie is not supported** \- **Authenticate with Cloudflare One Client** will not work for Access applications that have the [Binding Cookie](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/#binding-cookie) enabled.

## Related resources

* [Connectivity status](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/connectivity-status/) \- Learn about the status messages displayed by the Cloudflare One Client during its connection process, and understand each stage as the client establishes a secure tunnel to Cloudflare.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/#page","headline":"Client sessions · Cloudflare One docs","description":"Client sessions in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-06-04","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft Entra ID"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/","name":"Configure the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/","name":"Client sessions"}}]}
```
