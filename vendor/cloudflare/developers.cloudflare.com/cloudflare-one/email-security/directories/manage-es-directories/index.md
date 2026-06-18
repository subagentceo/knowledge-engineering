---
title: Manage Email security directories
description: Manage Email security directories in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage Email security directories

You can manage your Email security directory by editing and deleting added users.

Registered users

The Email security directory contains registered users only. A registered user is a user added to the [impersonation registry](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/impersonation-registry/).

To modify or delete users in the Email security directory:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Email security** \> **Directories**.
2. Select **Email security Directory**.

## Add a user

To manually add a user to the Email security directory:

1. On the sidebar, go to **Settings** \> **Impersonation registry** \> **View**.
2. Select **Add a user**:
* Choose **Manual input** as the **Input method**.
* Under **User info**, enter the **Display name**.
* Under **User email**, enter the **Email addresses**.
1. Select **Save**.

To view users you manually added:

1. Go to **Directories**.
2. Select **Email security Directory**.
3. Any manually added user will be displayed under the table as **REGISTERED**.

## Edit a user

To edit a user in the Email security directory:

1. Select the user you want to edit.
2. Select the three dots > **Edit**.
3. Enter a user name and/or email.
4. Select **Save**.

## Delete a user

To delete a user from the Email security directory:

1. Select the user you want to delete.
2. Select the three dots > **Delete**.
3. Read the pop-up message, and then select **Delete user**.

To delete multiple users from the registry at once:

1. Select the users you want to delete.
2. Select the **Action** dropdown list > **Delete**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/directories/manage-es-directories/#page","headline":"Manage Email security directories · Cloudflare One docs","description":"Manage Email security directories in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/directories/manage-es-directories/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/directories/","name":"Directories"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/directories/manage-es-directories/","name":"Manage Email security directories"}}]}
```
