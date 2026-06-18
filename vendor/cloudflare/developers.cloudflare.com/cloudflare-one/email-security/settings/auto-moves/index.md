---
title: Auto-move events
description: Auto-move events in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Auto-move events

Auto-moves allow you to automatically move emails out of your inbox based on a [disposition](https://developers.cloudflare.com/cloudflare-one/email-security/reference/dispositions-and-attributes/) that Email security assigns to each message (for example, malicious, spam, or spoof).

Use auto-moves to enforce email security policy without relying on end users to identify and act on threats themselves. After you configure auto-moves, Email security handles flagged messages according to the action you choose for each disposition.

To configure auto-move events:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **Settings**.
4. Select **Moves**.
5. Under **Auto-moves**, select **Configure**.
6. For each disposition (malicious, spam, bulk, suspicious, spoof), choose what happens to matching emails:  
   * **Soft delete - user recoverable**: Moves the message to the user's **Recoverable Items - Deleted** folder. The user can still find and restore the message. This option is only available for Microsoft 365 customers. Refer to [Microsoft 365 Exchange data deletion ↗](https://learn.microsoft.com/en-us/compliance/assurance/assurance-exchange-online-data-deletion) for more information.  
   * **Hard delete - admin recoverable**: Removes the message from the user's inbox entirely. Only an administrator can recover it.  
   * **Move to trash**: Moves the message to the user's trash or deleted items folder. This option is only available for Google Workspace users.  
   * **Move to junk**: Moves the message to the user's junk or spam folder.  
   * **No action**: Leaves the message where it is. Email security still records the disposition, but does not move the message.
7. Select **Save**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/#page","headline":"Auto-move events · Cloudflare One docs","description":"Auto-move events in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/settings/","name":"Settings"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/settings/auto-moves/","name":"Auto-move events"}}]}
```
