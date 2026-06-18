---
title: Configure link actions
description: Configure link actions in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure link actions

You can configure how Email security handles links in emails.

Note

You can only configure link actions if you deploy Email security via [MX/Inline](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment/).

To configure link actions:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **Settings**, then go to **Detection settings** \> **Link actions** \> **View**.

You can configure **Link actions settings**, or **URL rewrite ignore patterns**.

## Link actions settings

To configure link actions, select **Configure**.

The dashboard will display **Open links evaluated as suspicious in a remote browser (Recommended)**. This option is turned on by default. Email security will also allow you to select message dispositions to open all the links for dispositioned emails in a remote browser.

Select one or more disposition, then select **Save**.

If **Open links evaluated as suspicious in a remote browser (Recommended)** is turned off, you can select **URL defang** or **No action** on each disposition. Select **Save** once you have completed the configuration.

When opening links, Email security will not allow you to:

* [Copy (from remote to client)](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/)
* [Paste (from client to remote)](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/)
* Use [keyboard](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/)
* [Print](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/)
* [Download files](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/)
* [Uploads files](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/)

## Add patterns for URLs

You can add patterns for URLs that should be rewritten.

1. Under **URL rewrite ignore patterns**, select **Add a pattern**.
2. Enter a valid IP, URL, or regular expression. You can enter up to 512 characters.
3. Select **Save**.

To edit a pattern, go to the pattern you want to edit, select the three dots, then **Edit**. Once you have finished modifying the URL patter, select **Save**.

To delete a pattern, go to the pattern you want to delete, select the three dots, then **Delete**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/configure-link-actions/#page","headline":"Configure link actions · Cloudflare One docs","description":"Configure link actions in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/configure-link-actions/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/settings/","name":"Settings"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/settings/detection-settings/","name":"Detection settings"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/email-security/settings/detection-settings/configure-link-actions/","name":"Configure link actions"}}]}
```
