---
title: Turnstile widgets
description: Turnstile widget modes, sizes, and rendering behavior.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Turnstile widgets

A Turnstile widget defines how Turnstile behaves on your webpage. Each widget has a mode, a label, a sitekey, and a secret key. You can create multiple widgets with different configurations.

Turnstile is hosted under `challenges.cloudflare.com`. Your application will connect to this origin. If your site uses a [Content Security Policy](https://developers.cloudflare.com/turnstile/reference/content-security-policy/), you must allow connections to this domain.

## Widget components

Each widget gets its own unique sitekey and secret key pair, and options for configurations.

| Component      | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| Sitekey        | Public key used to invoke the Turnstile widget on your site. |
| Secret key     | Private key used for server-side token validation.           |
| Configurations | Mode, hostnames, appearance settings, and other options.     |

## Widget modes

The available modes for Turnstile widgets are **Managed**, **Non-Interactive**, and **Invisible**.

| Widget mode               | Description                                                                                                                     | Use case                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Managed** (recommended) | Automatically chooses between non-interactive or checkbox challenge based on visitor risk level. No images or text to decipher. | Simple setup with adaptive security. Balances protection and user experience. |
| **Non-Interactive**       | Displays visible widget with loading spinner. Runs challenges without requiring visitor interaction.                            | Minimize friction while showing verification is occurring.                    |
| **Invisible**             | Runs challenges completely in the background with no visible widget or loading indicators.                                      | Maximize visual experience with zero visible verification elements.           |

### Managed mode (recommended)

Managed mode is fully managed by Cloudflare. It automatically chooses the appropriate action based on client-side signals and risk levels. Cloudflare uses the information from the visitor to decide if an interactive challenge should be used.

Turnstile will only require interaction if a further check is necessary to verify that the visitor is human. When an interaction is required, the visitor will be prompted to select a box. There will be no images or text to decipher.

Managed mode is ideal for users who want a simple configuration without needing to fine-tune the widget's behavior.

### Non-Interactive mode

Visitors will see a widget with a loading spinner while the challenges run in their browsers. Unlike managed mode, visitors will never be required or prompted to interact with the widget.

Non-Interactive mode is ideal for users who want to prioritize visitor experience and do not want to add any friction on their website with a Turnstile interaction.

### Invisible mode

Invisible mode is similar to Non-Interactive mode where visitors will never interact with the Turnstile widget. Visitors will also not see a widget or any indication that an invisible browser challenge is in progress.

Invisible mode is ideal for users who want to prioritize visitor and visual experience on their website.

Link to Cloudflare's Turnstile Privacy Policy

As a condition of enabling invisible mode, you must reference Cloudflare's [Turnstile Privacy Addendum ↗](https://www.cloudflare.com/turnstile-privacy-policy/) in your own privacy policy.

---

## Widget customization

### Sizes

Widgets can be implemented in normal, flexible, or compact sizes.

Refer to [Widget configurations](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/) for detailed configuration options and code examples.

### Appearance and themes

Turnstile widgets support multiple appearance modes and themes to match your website's design.

Refer to [Widget configurations](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/) for implementation details.

---

## Widget states

flowchart LR
accTitle: Normal widget operation states
accDescr: This diagram details a Turnstile widget's normal operation states.
    A[<b>Loading</b><br /><small>Widget is processing the challenge.</small> ] --> B[<b>Interaction*</b><br /><small>Visitor needs to check the box. <br />*Managed mode only.</small>]
    B --> C[<b>Success</b><br /><small>The Challenge was completed successfully.</small>]

### Error states

| Type                            | Description                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unknown error                   | When an unknown error occurs during the challenge, visitors will encounter this widget state. Visitors can follow the troubleshooting guidelines from the widget or refresh the page to retry the challenge.                                                                                                                                          |
| Interaction timed out           | When the visitor is presented with a checkbox but does not interact with it for an extended period of time. The challenge must be reissued by reloading the page or the widget.                                                                                                                                                                       |
| Challenge timed out             | When the verification was completed but no further action has been taken, the challenge outcome will no longer be valid. For example, if a Turnstile widget is on a login page and the Turnstile successfully ran, but the visitor did not log in for an extended period of time, the challenge must be reissued by reloading the page or the widget. |
| Outdated or unsupported browser | Visitors with outdated browsers or unsupported browsers will encounter this widget state. Refer to [Supported browsers](https://developers.cloudflare.com/cloudflare-challenges/reference/supported-browsers/) for more information regarding supported browsers.                                                                                     |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/concepts/widget/#page","headline":"Turnstile widgets · Cloudflare Turnstile docs","description":"Turnstile widget modes, sizes, and rendering behavior.","url":"https://developers.cloudflare.com/turnstile/concepts/widget/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/concepts/widget/","name":"Turnstile widgets"}}]}
```
