---
title: Tunnel permissions
description: File and directory permissions required by cloudflared.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Tunnel permissions

Tunnel permissions determine who can run and manage a Cloudflare Tunnel. Two files control permissions for a locally-managed tunnel:

* **An account certificate** (`cert.pem`) is issued for a Cloudflare account when you login to `cloudflared`. Make sure you are intentional about the locations and machines you store this certificate on, as this certificate allows users to create, delete, and manage all tunnels for the account.
* **A tunnel credentials file** (`<TUNNEL-UUID>.json`) is issued for a tunnel when you create the tunnel. The credentials file only allows the user to run that specific tunnel, and do nothing else. Hence, as an admin, you can share tunnel credentials with users who will run the tunnel.

Refer to the table below for a comparison between the two files and the purposes for which they are intended.

| Account certificate     | Tunnel credential                                                                                          |                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **File name**           | cert.pem                                                                                                   | <TUNNEL-UUID>.json                                                                               |
| **Purpose**             | Authenticates your instance of cloudflared against your Cloudflare account                                 | Authenticates the tunnel it is associated with                                                   |
| **Scope**               | Account-wide                                                                                               | Tunnel-specific                                                                                  |
| **File type**           | .pem                                                                                                       | .json                                                                                            |
| **Stored in**           | [Default directory](https://developers.cloudflare.com/tunnel/faq/#default-cloudflared-directory)           | [Default directory](https://developers.cloudflare.com/tunnel/faq/#default-cloudflared-directory) |
| **Issued when running** | cloudflared tunnel login                                                                                   | cloudflared tunnel create <NAME>                                                                 |
| **Valid for**           | At least 10 years, and the service token it contains is valid until [revoked](#revoke-account-certificate) | Does not expire                                                                                  |
| **Needed to**           | Manage tunnels (for example, create, route, delete and list tunnels)                                       | Run a tunnel. Create a config file.                                                              |

## Tunnel ownership

Tunnel ownership is bound to the Cloudflare account for which the `cert.pem` file was issued upon authenticating `cloudflared`. If a user in a Cloudflare account creates a tunnel, any other user in the same account who has access to the `cert.pem` file for the account can delete, list, or otherwise manage tunnels within it.

## Revoke account certificate

Your account certificate (`cert.pem`) contains an API token which authorizes `cloudflared` to manage tunnels in your Cloudflare account. To revoke the account certificate, delete the API token associated with your tunnel:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **My Profile** \> **API Tokens**.
2. Find the **Cloudflare Tunnel API Token** or **Argo Tunnel API Token** for your zone and account.
3. Select the three dots > **Delete**.

Once this token is deleted, `cloudflared` can no longer use the old `cert.pem` file to read or edit tunnels in your account. To generate a new token and `cert.pem` file, run `cloudflared tunnel login`.

## Account-scoped roles

Minimum permissions needed to create, delete, and configure tunnels for an account:

* [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/roles-permissions/)

Additional permissions needed to [route traffic to a public hostname](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/) and to be able to perform `cloudflared login`:

* [DNS](https://developers.cloudflare.com/fundamentals/manage-members/roles/)
* [Load Balancer](https://developers.cloudflare.com/fundamentals/manage-members/roles/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/advanced/local-management/tunnel-permissions/#page","headline":"Tunnel permissions · Cloudflare Docs","description":"File and directory permissions required by cloudflared.","url":"https://developers.cloudflare.com/tunnel/advanced/local-management/tunnel-permissions/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":3,"item":{"@id":"/tunnel/advanced/","name":"Advanced"}},{"@type":"ListItem","position":4,"item":{"@id":"/tunnel/advanced/local-management/","name":"Locally-managed tunnels"}},{"@type":"ListItem","position":5,"item":{"@id":"/tunnel/advanced/local-management/tunnel-permissions/","name":"Tunnel permissions"}}]}
```
