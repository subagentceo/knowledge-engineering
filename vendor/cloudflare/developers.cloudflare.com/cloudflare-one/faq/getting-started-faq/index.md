---
title: Getting started with Cloudflare Zero Trust FAQ
description: Review FAQs about getting started with Cloudflare Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Getting started with Cloudflare Zero Trust FAQ

[❮ Back to FAQ](https://developers.cloudflare.com/cloudflare-one/faq/)

## How do I sign up for Cloudflare Zero Trust?

You can sign up today on the [Cloudflare dashboard ↗](https://dash.cloudflare.com/). Go to **Zero Trust**, choose a team name and a payment plan, and start protecting your network in just a few minutes.

## What is a team domain/team name?

Your team domain is a unique subdomain assigned to your Cloudflare account, for example, `<your-team-name>.cloudflareaccess.com`. [Setting up a team domain](https://developers.cloudflare.com/cloudflare-one/setup/#2-create-a-zero-trust-organization) is an essential step in your Zero Trust configuration. This is where your users will find the apps you have secured behind Cloudflare Zero Trust — displayed in the [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/) — and will be able to make login requests to them. The customizable portion of your team domain is called **team name**. You can view your team name and team domain in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) under **Zero Trust** \> **Settings**.

| team name      | team domain                           |
| -------------- | ------------------------------------- |
| your-team-name | <your-team-name>.cloudflareaccess.com |

You can change your team name at any time, unless you have the Cloudflare dashboard SSO feature enabled on your account. If Cloudflare dashboard SSO is enabled, you must [turn off SSO](https://developers.cloudflare.com/fundamentals/manage-members/dashboard-sso/#change-your-zero-trust-team-name) before changing your team name.

When you change your team name, the old name becomes available for other accounts to claim. However, if you delete your entire Zero Trust organization, any team name it used is permanently reserved and cannot be reused by any account — including your own.

Warning

If you change your team name, you need to update your organization's identity providers (IdPs) and the Cloudflare One Client to reflect the new team name in order to avoid any mismatch errors.

### How do I transfer a team name to another account?

If you want to move a team name from one Cloudflare account to another (for example, migrating from a personal account to a company account), you can do so as long as the source Zero Trust organization still exists:

1. In the source account, go to **Settings** and change the team name to a temporary value (for example, `mycompany-old`).
2. In the destination account, go to **Settings** and set the team name to the desired value.

Warning

Do not delete the Zero Trust organization on the source account before changing the team name. If the organization is deleted, the team name is permanently locked and no account will be able to claim it.

### Why is my old team name is still showing up on the Login page and App Launcher?

After changing your team name, you will need to check your Block page, Login page, and App Launcher settings to make sure the new team name is reflected.

To verify that your team name change is successfully rendering on the Block page, Login page and App Launcher:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Custom pages** \> **Team name and domain**.
2. Find the **Account Gateway block page** and **Access login page** sections, then select **Manage** next to the page you would like to review first.
3. Review that the value in **Your Organization's name** matches your new team name.
4. If the desired name is not already displayed, change the value to your desired team name and select **Save**.
5. Check both pages (**Account Gateway block page** and **Access login page** to set **Your Organization's name** as your desired team name.

The App Launcher will display the same team name set on the Access login page, so you do not need to update the **Your Organization's name** field in the App Launcher page.

## How do I change my subscription plan?

To make changes to your subscription, visit the Billing section under **Zero Trust** \> **Settings** in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/). You can change or cancel your subscription at any time. Just remember - if you downgrade your plan during a billing cycle, your downgraded pricing will apply in the next billing cycle. If you upgrade during a billing cycle, you will be billed for the upgraded plan at the moment you select it.

## How are active seats measured?

Cloudflare Zero Trust subscriptions consist of seats that users in your account consume. When users authenticate to an application or enroll their agent into the Cloudflare One Client, they count against one of your active seats. Seats can be added, removed, or revoked at **Settings** \> **Cloudflare One plan**. If all seats are currently consumed, you must first remove users before decreasing your purchased seat count.

### Removing users

User seats can be removed for Access and Gateway at **Team & Resources** \> **Users** \> **Your users**. Removing a user will have consequences both on Access and on Gateway:

* **Access**: All active sessions for that user will be invalidated. A user will be able to log back into an application unless you create an [Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) to block future logins from that user.
* **Gateway**: All active devices for that user will be logged out of your Zero Trust organization, which stops all filtering and routing via the Cloudflare One Client. A user will be able to re-enroll their device unless you create a [device enrollment policy](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/) to block them.

Warning

The Remove action will remove a user's seat, but it will not permanently revoke their ability to authenticate. To permanently disable a user's ability to authenticate, you must modify the policies that allow them to reach a given application or enroll a device in the Cloudflare One Client.

### Revoking users

The Revoke action will terminate active sessions and log out active devices, but will not remove the user's consumption of an active seat.

## How do I know if my network is protected behind Cloudflare Zero Trust?

You can visit the [Zero Trust help page ↗](https://help.one.cloudflare.com/). This page will give you an overview of your network details, as well as an overview of the categories that are being blocked and/or allowed.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/faq/getting-started-faq/#page","headline":"Getting started with Cloudflare Zero Trust FAQ · Cloudflare One docs","description":"Review FAQs about getting started with Cloudflare Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/faq/getting-started-faq/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/faq/","name":"FAQ"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/faq/getting-started-faq/","name":"Getting started with Cloudflare Zero Trust FAQ"}}]}
```
