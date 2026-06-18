---
title: Seat management
description: Seat management in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Seat management

Cloudflare One subscriptions consist of seats that active users in your account consume. Active users are added to Cloudflare One through any [authentication event](#authentication-events).

The amount of seats available in your Cloudflare One account depends on the amount of users you purchase. If you want to increase the number of seats available, you will have to purchase more users. Learn more about adding and removing seats from your account in the [Cloudflare One FAQ](https://developers.cloudflare.com/cloudflare-one/faq/getting-started-faq/#how-do-i-change-my-subscription-plan).

## Authentication events

A user consumes a seat when they perform an authentication event. For Access, this is any Cloudflare Access authentication event, such as a login to the [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/) or an application. For Gateway, this is when any devices associated with the user connect to Cloudflare One within the [specified period](#enable-seat-expiration).

If either one of these events occurs, that user's identity is added as an Active user to Cloudflare One and consumes one seat from your plan. The user will occupy and consume a single seat regardless of the number of applications accessed or login events from their user account. Once the total amount of seats in the subscription has been consumed, additional users who attempt to log in are blocked.

A user who authenticates will hold their seat until you [remove the user](#remove-a-user) from your account. By default, inactive users will not be [automatically removed](#enable-seat-expiration) from your account. You can remove a single user or all users at any time, and those users will immediately stop counting against the seat count defined in your subscription.

If you notice a number of accounts greater than the number of your users, you may need to configure an Access [bypass policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#bypass). Alternatively, you can use Access [service tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) to allow access to applications without consuming seats.

## Seat management and device registrations

[Removing a user](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/#remove-a-user) determines whether that user consumes a billable seat, but does not [prevent users from accessing resources](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/device-registration/#remove-user-access) behind Cloudflare Access.

Removing a user will delete all device registrations associated with the user. For more information about managing device registrations, refer to [Device registration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/device-registration/).

## Manage users

### Check number of seats used

To check the number of seats consumed by active users in your organization, log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **Zero Trust**. **Cloudflare One overview** will display the amount of seats consumed and the remaining amount available. For more details on your users, go to **Team & Resources** \> **Users**.

### Revoke a user

When you revoke a user, this action will terminate active sessions, but will not remove the user's consumption of an active seat.

To revoke a user from your Zero Trust Organization:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Users**.
2. Select the checkbox next to a user with an **Active** status in the **Seat usage** column.
3. Select **Action** \> **Revoke**.
4. Select **Revoke sessions**.

Revoked users can still log in if your policies allow them. To prevent a user from authenticating, you must remove them from your [device enrollment policies](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/) or from your Identity Provider (IdP).

### Remove a user

Removing a user from your Zero Trust Organization will free up the seat the user consumed. The user will still appear in your list of users.

To remove a user from your Zero Trust Organization:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Users**.
2. Select the checkbox next to a user with an **Active** status in the **Seat usage** column.
3. Select **Action** \> **Remove users**.
4. Select **Remove**.

The user will now show as **Inactive** and will no longer occupy a seat. If a user is removed but authenticates later, they will consume a seat again. To prevent a user from authenticating, you must remove them from your [device enrollment policies](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/) or from your Identity Provider (IdP).

To automate the removal of users who have not logged in or triggered a device enrollment in a specific amount of time, turn on [seat expiration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/#enable-seat-expiration) or utilize [SCIM](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/scim/) to remove users when they are deactivated in your identity provider.

User record persistence

You cannot delete or archive a user record. You can [remove a user](#remove-a-user) from a seat, but their user record will remain in your Zero Trust Organization. Inactive users do not count towards billing.

### Enable seat expiration

Cloudflare One can automatically remove any user who does not log in to an Access application or whose device does not show any Gateway activity for the specified period (between one month and one year). To determine if a user will be removed, Cloudflare looks for any authentication events and checks the **Last seen** value for all of the user's devices. If both of those are outside the expiration window, the user will be removed and will no longer count against your number of seats. This process occurs once daily for an account.

To enable user seat expiration:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Settings** \> **Admin controls**.
2. In **Remove inactive users from seats**, select **Edit**.
3. Select an inactivity time from the dropdown menu.
4. Select **Save**.

If a user is removed but authenticates later, they will consume a seat again.

For more information about removing a user for Access and Gateway, refer to the [FAQ](https://developers.cloudflare.com/cloudflare-one/faq/getting-started-faq/#removing-users).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/#page","headline":"Seat management · Cloudflare One docs","description":"Seat management in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/users/","name":"Users"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/users/seat-management/","name":"Seat management"}}]}
```
