---
title: Add user to the impersonation registry
description: Protect executives from BEC impersonation attacks.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add user to the impersonation registry

Attackers often try to impersonate executives within an organization when sending malicious emails (with requests about banking information, trade secrets, and more), which is known as a [Business Email Compromise (BEC) ↗](https://www.cloudflare.com/en-gb/learning/email-security/business-email-compromise-bec/) attack.

The impersonation registry protects against these attacks by looking for spoofs of known key users in an organization. Information about key users you either synced with your directory or entered manually in the dashboard is used by Email security to run enhanced scan techniques and find these spoofed emails.

To add a user to the impersonation registry:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **Settings** \> **Impersonation registry**.
4. Select **Add a user**.
5. Select **Input method**: Choose between **Manual input**, **Upload manual list**, and **Select from existing directories**:  
   * **Manual input**: Enter the following information:  
         * **User info**: enter a valid **Display name**.  
         * **User email**: Enter one of the following:  
                  * **Email address**: Enter all known email addresses, separated by a comma.  
                  * **Regular expressions**: Must be valid Java expressions.  
   * **Upload manual list**: You can upload a file no larger than 150 KB containing all variables of potential emails. The file must contain `Display_Name` and `Email`, and the first row must be the header row.  
   * **Select from existing directories**:  
         * **Select directory**: Select your directory.  
         * **Add users or groups**: Choose the users or groups you want to register.
6. Select **Save**.

For more information on how to edit and remove users, refer to [Impersonation Registry](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/impersonation-registry/#edit-users).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/impersonation-registry/#page","headline":"Add user to the impersonation registry · Cloudflare Learning Paths","description":"Protect executives from BEC impersonation attacks.","url":"https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/impersonation-registry/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-your-email/configure-email-security/","name":"Configure Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-your-email/configure-email-security/impersonation-registry/","name":"Add user to the impersonation registry"}}]}
```
