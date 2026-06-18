---
title: Integrate Microsoft MCAS with Cloudflare Zero Trust
description: With an MCAS API call, you can manage a URL category that contains the blocked URLs. Use the output to create a Hostname List that can be used by Gateway HTTP policies to block them.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Integrate Microsoft MCAS with Cloudflare Zero Trust

**Last reviewed:**  almost 5 years ago 

Many security teams rely on Microsoft MCAS (Microsoft Cloud App Security), Microsoft's CASB solution, to identify and block threats on the Internet, as well as allow or block access to cloud applications. This tutorial covers how to integrate MCAS with Cloudflare Zero Trust, and create Gateway HTTP policies to ensure visibility and control over data.

Microsoft provides an MCAS API endpoint to allow queries to see which applications have been marked as blocked or allowed. With an MCAS API call, you can manage a URL category that contains the blocked URLs returned by the API query, and use the output to create a Hostname List that can be used by Gateway HTTP policies to block them.

**Time to complete:**

20 minutes

## Basic configuration

In your Microsoft account, you first need to create an API token and URL endpoint to use to query the URLs blocked by MCAS. Follow the guide for [Managing API tokens for Microsoft Cloud App Security ↗](https://learn.microsoft.com/defender-cloud-apps/api-authentication) to generate a new API token and a custom API URL for the API endpoint.

## Using the API to query banned applications

Once you have the API token and API URL, use curl to get the list of banned applications from Microsoft MCAS:

Terminal window

```

curl -v "https://<MCAS API URL>/api/discovery_block_scripts/?format=120&type=banned" -H "Authorization: Token <API token>"


```

This will return a list of banned hostnames. In this case, Angie's List is the banned application.

![Banned hostnames](https://developers.cloudflare.com/_astro/mcas-domains.CtUPNlL__5tMjF.webp) 

### Processing the output

As you can see, the banned hostnames are preceded by a `.`. To use this output for a Zero Trust List, we need to do some text processing.

1. Run the curl API call and direct the output to a file, in this case `mcas.txt`:  
Terminal window  
```  
curl -v "https://<MCAS API URL>/api/discovery_block_scripts/?format=120&type=banned" -H "Authorization: Token <API token>" > mcas.txt  
```
2. Remove the leading `.`, for example by running `sed` from the CLI:  
Terminal window  
```  
sed -i 's/^.//' mcas.txt  
```
3. This will give you the list of hostnames without leading `.`.
4. Replace the file's `.txt` extension with `.csv`. The file can now be imported into Cloudflare Zero Trust as a Hostname list.

## Using the API to query allowed applications

If you would like to get a list of all of the MCAS allowed applications, you can use the same API query, but instead of using `type=banned`, use `type=allowed`. This will return a much larger list.

Terminal window

```

curl -v "https://<MCAS API URL>/api/discovery_block_scripts/?format=120&type=allowed" -H "Authorization: Token <API token>"


```

## Adding a hostname list in Cloudflare One

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Reusable components** \> **Lists**
2. Select **Upload CSV**. Even though the hostname list is not in CSV format, it will work with no issues.
3. Add a name for the list, specify _Hostnames_ as the list type, and give it a description.
4. Drag and drop your MCAS output file created via the API call, or you can select **Select a file**.
5. Select **Create**. You will see the list of hostnames that have been added to the list.
6. Save the list.

Your list is now ready to be referenced by Gateway HTTP policies.

## Creating an HTTP policy

1. Go to **Traffic policies** \> **Traffic policies** \> **HTTP**.
2. Select **Add a policy**.
3. Create the following policy.  
| Selector | Operator | Value                 | Action |  
| -------- | -------- | --------------------- | ------ |  
| Host     | in list  | <NEW\_HOSTNAME\_LIST> | Block  |

Now when trying to visit one of the MCAS defined sites, the user will be blocked.

![Access Restricted](https://developers.cloudflare.com/_astro/mcas-block-page.Bgzcx6ig_ZPxsLe.webp) 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/integrate-microsoft-mcas-teams/#page","headline":"Integrate Microsoft MCAS with Cloudflare Zero Trust · Cloudflare One docs","description":"With an MCAS API call, you can manage a URL category that contains the blocked URLs. Use the output to create a Hostname List that can be used by Gateway HTTP policies to block them.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/integrate-microsoft-mcas-teams/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/integrate-microsoft-mcas-teams/","name":"Integrate Microsoft MCAS with Cloudflare Zero Trust"}}]}
```
