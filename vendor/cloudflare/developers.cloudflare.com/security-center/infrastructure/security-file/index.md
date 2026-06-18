---
title: Set up your security.txt file
description: Manage your security.txt file via the dashboard or the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/security-center/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up your security.txt file

You can manage your [security.txt ↗](https://en.wikipedia.org/wiki/Security.txt) file via the dashboard or the [API](https://developers.cloudflare.com/api/resources/security%5Ftxt/).

Note

When using the API, the preferred languages field name is `preferred_languages` (snake\_case). For example: `"preferred_languages": "en, de"`.

To manage your security.txt file via the Cloudflare dashboard:

* [  New dashboard ](#tab-panel-10538)
* [ Old dashboard ](#tab-panel-10539)

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), select your account and domain.
2. Go to **Security** \> **Settings** and filter by **Web application exploits**.
3. Under **Security.txt** \> **Configurations**, select the edit icon.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), select your account and domain.
2. Go to **Security** \> **Settings**.
3. Next to **Enable Security.txt**, select **Edit Security.txt**.

From here, you can create and manage your `security.txt` file to provide the security research team with a standardized way to report vulnerabilities.

Fill in the following information:

* **(Required) Contact**: You can enter one of the following to contact you about security issues:  
   * An email address: The email address must start with `mailto:` (for example, `mailto:help@example.com`).  
   * A phone number: The phone number must start with `tel:` (for example, `tel:+1 1234567890`).  
   * A URL link: The URL link must start with `https://` (for example, `https://example.com`).  
Select **Add more** to add multiple contacts.
* **(Required) Expires at**: Enter the expiration date and time of the `security.txt` file.
* **Encryption**: A link to a key which security researchers can use to communicate with you.
* **Acknowledgements**: A link to your acknowledgements page.
* **Canonical**: Links to your `security.txt` file.
* **Hiring**: A link to your security-related job openings.
* **Policy**: A link to a policy describing what security researchers should do when searching for or reporting security issues.
* **Preferred languages**: A list of language codes that your security team speaks.

Once you have entered the necessary information, select **Save**.

To edit your security.txt file:

* Old dashboard: Select **Security** \> **Settings** \> **Edit Security.txt**.
* New security dashboard:  
   1. Go to **Security** \> **Settings** and filter by **Web application exploits**.  
   2. Under **Security.txt** \> **Configurations**, select the edit icon.

To download your security.txt file:

* Old dashboard: Select **Security** \> **Settings** \> **Download Security.txt**.
* New security dashboard:  
   1. Go to **Security** \> **Settings** and filter by **Web application exploits**.  
   2. Under **Security.txt** \> **Configurations**, select the download icon.

To delete your security.txt file:

* Old dashboard:  
   * Select **Security** \> **Settings** \> **Delete Security.txt**.
* New security dashboard:  
   1. Select **Security** \> **Settings** and filter by **Web application exploits**.  
   2. Under **Security.txt** \> **Configurations**, select the edit icon.  
   3. Select **Delete**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/security-center/infrastructure/security-file/#page","headline":"Set up your security.txt file · Cloudflare Security Center docs","description":"Manage your security.txt file via the dashboard or the API.","url":"https://developers.cloudflare.com/security-center/infrastructure/security-file/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/security-center/","name":"Security Center"}},{"@type":"ListItem","position":3,"item":{"@id":"/security-center/infrastructure/","name":"Infrastructure"}},{"@type":"ListItem","position":4,"item":{"@id":"/security-center/infrastructure/security-file/","name":"Set up your security.txt file"}}]}
```
