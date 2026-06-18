---
title: Use Cloudflare Workers to create custom user coaching pages
description: Build custom user coaching pages with Workers.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use Cloudflare Workers to create custom user coaching pages

Cloudflare Workers are an easy method to stand up custom user coaching pages. The customs status pages can be handled dynamically based on the information that Gateway sends about a blocked request.

## Example

JavaScript

```

const COMPANY_NAME = "Your Company Inc.";

const APPROVED_TOOL_URL = "https://chat.yourcompany.com"; // Your sanctioned AI tool URL

const APPROVED_TOOL_NAME = "Corporate AI Assistant"; // The user-friendly name of your tool

const IT_HELPDESK_EMAIL = "it-security@yourcompany.com"; // Email for the "report a problem" button

const COMPANY_LOGO_URL = "Your_Logo.svg"; // A publicly accessible URL for your company logo. Replace with your own.


export default {

  async fetch(request) {

    // 1. Get the blocked URL from the query string passed by Gateway.

    const url = new URL(request.url);

    const blockedUrlParam = url.searchParams.get("blocked_url");


    // Decode and sanitize the blocked URL for display.

    let blockedHostname = "the requested site";

    let fullBlockedUrl = "an unapproved external tool";

    if (blockedUrlParam) {

      try {

        const decodedUrl = decodeURIComponent(blockedUrlParam);

        fullBlockedUrl = decodedUrl;

        blockedHostname = new URL(decodedUrl).hostname;

      } catch (e) {

        // If the URL is malformed, use the raw param safely.

        fullBlockedUrl = blockedUrlParam;

        blockedHostname = blockedUrlParam;

      }

    }


    // 2. Prepare the "Report a problem" mailto link.

    const mailtoSubject = `Business Justification for AI Tool: ${blockedHostname}`;

    const mailtoBody = `Hello IT/Security Team,


I was attempting to access the following website and was redirected to this coaching page:

${fullBlockedUrl}


My business justification for needing this specific tool is:

[**Please describe your business need here**]


Thank you,

[Your Name]`;


    const mailtoLink = `mailto:${IT_HELPDESK_EMAIL}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;


    // 3. Generate the full HTML page.

    const html = generateHTML(blockedHostname, mailtoLink);


    // 4. Return the HTML as a response.

    return new Response(html, {

      headers: {

        "Content-Type": "text/html;charset=UTF-8",

      },

    });

  },

};


/**

 * Generates the full HTML for the coaching page.

 * @param {string} blockedHostname - The hostname of the site the user tried to access.

 * @param {string} mailtoLink - The pre-built mailto link for reporting an issue.

 * @returns {string} - The complete HTML document as a string.

 */

function generateHTML(blockedHostname, mailtoLink) {

  // Using a template literal for easy-to-read HTML with embedded variables.

  return `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>AI Tool Usage Policy</title>

<style>

:root {

--primary-color: #00529B;

--secondary-color: #0078D4;

--background-color: #f4f6f8;

--text-color: #333;

--card-bg-color: #ffffff;

--button-primary-bg: #0078D4;

--button-primary-hover: #005a9e;

--button-secondary-bg: #e0e0e0;

--button-secondary-hover: #c7c7c7;

--button-text-color: #ffffff;

--button-secondary-text: #333;

}

body {

font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

background-color: var(--background-color);

color: var(--text-color);

margin: 0;

display: flex;

justify-content: center;

align-items: center;

min-height: 100vh;

padding: 20px;

box-sizing: border-box;

}

.container {

background-color: var(--card-bg-color);

border-radius: 8px;

box-shadow: 0 4px 12px rgba(0,0,0,0.1);

max-width: 600px;

width: 100%;

text-align: center;

padding: 40px;

border-top: 5px solid var(--primary-color);

box-sizing: border-box;

}

.logo {

max-width: 150px;

margin-bottom: 24px;

}

h1 {

color: var(--primary-color);

font-size: 24px;

margin-bottom: 16px;

}

p {

font-size: 16px;

line-height: 1.6;

margin-bottom: 24px;

}

.highlight {

font-weight: bold;

color: var(--text-color);

}

.button-container {

display: flex;

flex-direction: column;

gap: 12px;

margin-top: 32px;

}

@media (min-width: 600px) {

.button-container {

flex-direction: row;

justify-content: center;

}

}

.button {

display: inline-block;

padding: 12px 24px;

border-radius: 5px;

text-decoration: none;

font-weight: bold;

font-size: 16px;

transition: background-color 0.2s ease;

cursor: pointer;

border: none;

}

.button-primary {

background-color: var(--button-primary-bg);

color: var(--button-text-color);

}

.button-primary:hover {

background-color: var(--button-primary-hover);

}

.button-secondary {

background-color: var(--button-secondary-bg);

color: var(--button-secondary-text);

}

.button-secondary:hover {

background-color: var(--button-secondary-hover);

}

</style>

</head>

<body>

<div class="container">

<img src="https://developers.cloudflare.com/learning-paths/holistic-ai-security/appendix/workers-create-custom-coaching-pages/%3C/span%3E%3Cspan%20style="--0:#89DDFF;--1:#007474">${COMPANY_LOGO_URL}" alt="${COMPANY_NAME} Logo" class="logo">

<h1>Access to this AI Tool is Restricted</h1>

<p>

You were redirected to this page because your attempt to access <span class="highlight">${blockedHostname}</span>

was blocked by our company's security policy.

</p>

<p>

To protect our company's confidential data, intellectual property, and customer information, we must ensure that AI tools are used responsibly. Unapproved tools may pose risks related to data privacy, security, and licensing.

</p>

<p>

We encourage you to use our officially approved and secure solution, the

<span class="highlight">${APPROVED_TOOL_NAME}</span>, for your business needs.

</p>

<div class="button-container">

<a href="https://developers.cloudflare.com/learning-paths/holistic-ai-security/appendix/workers-create-custom-coaching-pages/%3C/span%3E%3Cspan%20style="--0:#89DDFF;--1:#007474">${mailtoLink}" class="button button-secondary">Report a Problem</a>

<a href="https://developers.cloudflare.com/learning-paths/holistic-ai-security/appendix/workers-create-custom-coaching-pages/%3C/span%3E%3Cspan%20style="--0:#89DDFF;--1:#007474">${APPROVED_TOOL_URL}" class="button button-primary">Use Approved Tool</a>

</div>

</div>

</body>

</html>

`;

}


```

If successful, your custom user coaching page will look like the image below. It will appear anytime a user attempts to access an unapproved AI tool.

![Example of a custom coaching page utilizing the code example above.](https://developers.cloudflare.com/_astro/custom-coaching-page.BN8XQVn6_ZKoGWg.webp) 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/holistic-ai-security/appendix/workers-create-custom-coaching-pages/#page","headline":"Use Cloudflare Workers to create custom user coaching pages · Cloudflare Learning Paths","description":"Build custom user coaching pages with Workers.","url":"https://developers.cloudflare.com/learning-paths/holistic-ai-security/appendix/workers-create-custom-coaching-pages/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/holistic-ai-security/appendix/","name":"Appendix"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/holistic-ai-security/appendix/workers-create-custom-coaching-pages/","name":"Use Cloudflare Workers to create custom user coaching pages"}}]}
```
