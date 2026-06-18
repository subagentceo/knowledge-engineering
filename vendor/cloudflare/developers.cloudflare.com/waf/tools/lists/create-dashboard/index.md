---
title: Create a list in the dashboard
description: Create and manage lists in the Cloudflare dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a list in the dashboard

To create a list, follow these steps:

1. In the Cloudflare dashboard, go to the **Settings** page.  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. Go to **Lists**.
3. Select **Create new list**.
4. Enter a name for your list, observing the [list name guidelines](https://developers.cloudflare.com/waf/tools/lists/#list-names).
5. (Optional) Enter a description for the list, with a maximum length of 500 characters.
6. For **Content type**, select the [type of list](https://developers.cloudflare.com/waf/tools/lists/custom-lists/) you are creating.
7. Select **Create**.
8. Follow the instructions in the next section to add items to the list.

## Add items to a list

1. (Optional) If you wish to add items to an existing list:  
   1. Go to the **Settings** page.  
   [ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)  
   2. Go to **Lists**.  
   3. Select **Edit** next to the list you want to edit.
2. Select **Add items**.
3. To [add items to the list manually](#add-items-to-a-list-manually), use the available text inputs on the page.
4. To [add items using a CSV file](#add-items-using-a-csv-file), select **Upload CSV**.

Notes

Cloudflare will apply the following rules when you add items to an existing list (either manually or via CSV file):

* Do not remove any existing list items before updating/adding items.
* Update items that were already in the list.
* Add items that were not present in the list.

### Add items to a list manually

1. In the **Add items to list** page, enter values for the different fields (the exact fields depend on the list type).  
As you enter information into a text input, a new row of inputs displays below the current one. To delete any of the items that you have entered, select **X**.
2. Select **Add to list**.

### Add items using a CSV file

To add items to a list by uploading a CSV file:

1. In the **Add items to list** page, select **Upload CSV**.
2. Browse to the location of the CSV file, select the file, and then select **Open**. The displayed items in the page will include the items loaded from the CSV file.  
The exact CSV file format depends on the list type. Refer to [Custom list types](https://developers.cloudflare.com/waf/tools/lists/custom-lists/#custom-list-types) for details.
3. You can continue to edit the items in the list before adding them:  
   * To delete any of the items you have entered, select **X**.  
   * To add extra items manually, enter the information in the text inputs.
4. Select **Add to list**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/tools/lists/create-dashboard/#page","headline":"Create a list in the dashboard · Cloudflare Web Application Firewall (WAF) docs","description":"Create and manage lists in the Cloudflare dashboard.","url":"https://developers.cloudflare.com/waf/tools/lists/create-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/tools/","name":"Additional tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/tools/lists/","name":"Lists"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/tools/lists/create-dashboard/","name":"Create a list in the dashboard"}}]}
```
