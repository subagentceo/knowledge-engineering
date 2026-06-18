---
title: Generate a key pair
description: Generate a public/private key pair for payload logging encryption.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Generate a key pair

Generate a public/private key pair using the Cloudflare [matched-data-cli ↗](https://github.com/cloudflare/matched-data-cli) command-line tool. After generating a key pair, enter the generated public key in the payload logging configuration.

Do the following:

1. [Download ↗](https://github.com/cloudflare/matched-data-cli/releases) the `matched-data-cli` tool for your platform from the **Releases** page on GitHub, under **Assets**.
2. Extract the content of the downloaded `.tar.gz` file to a local folder.
3. Open a terminal and go to the local folder containing the `matched-data-cli` tool.  
Terminal window  
```  
cd matched-data-cli  
```
4. Run the following command:  
Terminal window  
```  
./matched-data-cli generate-key-pair  
```  
```  
{  
  "private_key": "uBS5eBttHrqkdY41kbZPdvYnNz8Vj0TvKIUpjB1y/GA=",  
  "public_key": "Ycig/Zr/pZmklmFUN99nr+taURlYItL91g+NcHGYpB8="  
}  
```

After generating the key pair, copy the public key value and enter it in the payload logging configuration.

## Troubleshooting macOS errors

If you are using macOS, the operating system may block the `matched-data-cli` tool, depending on your security settings.

For instructions on how to execute unsigned binaries like the `matched-data-cli` tool in macOS, refer to the [Safely open apps on your Mac ↗](https://support.apple.com/en-us/102445#openanyway) page in Apple Support.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/payload-logging/command-line/generate-key-pair/#page","headline":"Generate a key pair in the command line · Cloudflare Web Application Firewall (WAF) docs","description":"Generate a public/private key pair for payload logging encryption.","url":"https://developers.cloudflare.com/waf/managed-rules/payload-logging/command-line/generate-key-pair/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["CLI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/payload-logging/","name":"Log the payload of matched rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/managed-rules/payload-logging/command-line/","name":"Command-line operations"}},{"@type":"ListItem","position":6,"item":{"@id":"/waf/managed-rules/payload-logging/command-line/generate-key-pair/","name":"Generate a key pair"}}]}
```
