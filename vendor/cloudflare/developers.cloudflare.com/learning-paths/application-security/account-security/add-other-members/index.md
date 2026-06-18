---
title: Add and manage other members
description: Add, edit, and manage Cloudflare account members.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add and manage other members

Learn how to add new account members, edit or revoke their permissions and access, and resend verifications emails.

Note

To manage account members, you must have a role of **Super Administrator** and have a [verified email address](https://developers.cloudflare.com/fundamentals/user-profiles/verify-email-address/).

## View account members

To manage account members, you must have a role of **Super Administrator** and have a [verified email address](https://developers.cloudflare.com/fundamentals/user-profiles/verify-email-address/).

* [ Dashboard ](#tab-panel-9021)
* [ API ](#tab-panel-9022)

To view members using the dashboard:

In the \[Cloudflare dashboard, go to the **Members** page.

[ Go to **Members** ](https://dash.cloudflare.com/?to=/:account/members) 

To view members using the API, send a [GET request](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/list/).

## Add account members

To manage account members, you must have a role of **Super Administrator** and have a [verified email address](https://developers.cloudflare.com/fundamentals/user-profiles/verify-email-address/).

* [ Dashboard ](#tab-panel-9023)
* [ API ](#tab-panel-9024)

To add a member to your account:

1. In the Cloudflare dashboard, go to the **Members** page.  
[ Go to **Members** ](https://dash.cloudflare.com/?to=/:account/members)
2. Select **Invite**.
3. Fill out the following information:  
   * **Invite members**: Enter one or more email addresses (if multiple, separate addresses with commas).  
   * **Scope**: Use a variety of fields to adjust the [scope](https://developers.cloudflare.com/fundamentals/manage-members/roles/) of your roles.  
   * **Roles**: Choose one or more [roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/) to assign your members.
4. Select **Continue to summary**.
5. Review the information, then select **Invite**.

Note

If a user already has an account with Cloudflare and you have an Enterprise account, you can also select **Skip email confirmation** to add them to your account without sending an email invitation.

To add a member using the API, send a [POST request](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/create/).

## Edit member permissions

To manage account members, you must have a role of **Super Administrator** and have a [verified email address](https://developers.cloudflare.com/fundamentals/user-profiles/verify-email-address/).

* [ Dashboard ](#tab-panel-9025)
* [ API ](#tab-panel-9026)

To edit member permissions using the dashboard:

1. In the Cloudflare dashboard, go to the **Members** page.  
[ Go to **Members** ](https://dash.cloudflare.com/?to=/:account/members)
2. Select a member record, then select **Edit**.
3. Update the scope and roles of their permissions.
4. Select **Continue to summary**.
5. Review the information, then select **Update**.

To edit member permissions using the API, get a [list of roles](https://developers.cloudflare.com/api/resources/accounts/subresources/roles/methods/list/) available for an account.

Then, send a [PUT request](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/update/) to edit their permissions.

Request

```

curl --request PUT \

  --url https://api.cloudflare.com/client/v4/accounts/{account_id}/members/{member_id} \

  --header 'Authorization: Bearer <API_TOKEN>' \

  --header 'Content-Type: application/json' \

  --data '{

    "roles": [

          {

              "id": "<ROLE_ID1>"

          },

          {

              "id": "<ROLE_ID2>"

          }

      ]

    }'


```

## Resend an invitation

If you invited a member to your account but they cannot find the invitation or the invitation expires, you can resend the invitation through the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login) and select your account[1](#user-content-fn-1).
2. Go to **Manage Account** \> **Members**.
3. Select a member record where their **Status** is **Invite Pending**.
4. Select **Resend invite**.

## Footnotes

1. To manage account members, you must have a role of **Super Administrator** and have a [verified email address](https://developers.cloudflare.com/fundamentals/user-profiles/verify-email-address/). [↩](#user-content-fnref-1)

## Remove account members

To manage account members, you must have a role of **Super Administrator** and have a [verified email address](https://developers.cloudflare.com/fundamentals/user-profiles/verify-email-address/).

* [ Dashboard ](#tab-panel-9027)
* [ API ](#tab-panel-9028)

To revoke a member's access to your account:

1. In the Cloudflare dashboard, go to the **Members** page.  
[ Go to **Members** ](https://dash.cloudflare.com/?to=/:account/members)
2. Locate an account member and expand their record.
3. Click **Revoke**.
4. Click **Yes, revoke access**.

To revoke a member's access to your account using the API, send a [DELETE request](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/delete/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/application-security/account-security/add-other-members/#page","headline":"Add and manage other members · Cloudflare Learning Paths","description":"Add, edit, and manage Cloudflare account members.","url":"https://developers.cloudflare.com/learning-paths/application-security/account-security/add-other-members/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/application-security/account-security/","name":"Account security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/application-security/account-security/add-other-members/","name":"Add and manage other members"}}]}
```
