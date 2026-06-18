---
title: Tags
description: Tags in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Tags

You can label an Access application with up to 25 custom tags. End users can then filter the applications in their [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/) by their tags.

### Create a tag

To create a new tag:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Tags**.
2. Select **Add a tag**.
3. Enter up to 35 alphanumeric characters for the tag (for example, `Human Resources`) and select it in the dropdown menu.
4. Select **Save**.

You can now [add this tag](#tag-an-access-application) to an Access application.

### Tag an Access application

To add a tag to an existing Access application:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select an application and select **Configure**.
3. Go to **Additional settings**.
4. In the **Tags** dropdown, select the tags that you would like to assign to this application. The tag must be [created](#create-a-tag) before you can select it in the dropdown.
5. Select **Save**.

The tag will now appear on the application's App Launcher tile.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/tags/#page","headline":"Tags · Cloudflare One docs","description":"Tags in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/tags/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/tags/","name":"Tags"}}]}
```
