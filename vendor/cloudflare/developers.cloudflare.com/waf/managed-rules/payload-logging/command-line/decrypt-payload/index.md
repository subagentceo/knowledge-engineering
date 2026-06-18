---
title: Decrypt the payload content
description: Decrypt matched rule payloads using the command-line tool.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Decrypt the payload content

Use the `matched-data-cli` tool to decrypt a payload in the command line.

1. [Download ↗](https://github.com/cloudflare/matched-data-cli/releases) the `matched-data-cli` tool for your platform from the **Releases** page on GitHub, under **Assets**.
2. Extract the content of the downloaded `.tar.gz` file to a local folder.
3. Open a command line window and change to the local folder containing the `matched-data-cli` binary.  
Terminal window  
```  
cd matched-data-cli  
```
4. Create two files: one with your private key and another one with the encrypted payload:  
Terminal window  
```  
printf "<PRIVATE_KEY>" > private_key.txt && chmod 400 private_key.txt  
printf "<ENCRYPTED_PAYLOAD>" > encrypted_payload.txt  
```  
Replace `<PRIVATE_KEY>` with your private key and `<ENCRYPTED_PAYLOAD>` with the encrypted payload.  
Note: The first `printf` command will make your private key visible in your command history.
5. Run the following command to decrypt the payload:  
Terminal window  
```  
decrypt -k private_key.txt encrypted_payload.txt  
```

Note

If you are using macOS and you get an error when running the `matched-data-cli` tool, refer to [Troubleshooting macOS errors](https://developers.cloudflare.com/waf/managed-rules/payload-logging/command-line/generate-key-pair/#troubleshooting-macos-errors).

## Example

The following example creates two files — one with the private key and another one with the encrypted payload — and runs the `matched-data-cli` tool to decrypt the payload in the `encrypted_payload.txt` file:

Terminal window

```

~ cd matched-data-cli


printf "uBS5eBttHrqkdY41kbZPdvYnNz8Vj0TvKIUpjB1y/GA=" > private_key.txt && chmod 400 private_key.txt


printf "AzTY6FHajXYXuDMUte82wrd+1n5CEHPoydYiyd3FMg5IEQAAAAAAAAA0lOhGXBclw8pWU5jbbYuepSIJN5JohTtZekLliJBlVWk=" > encrypted_payload.txt


decrypt -k private_key.txt encrypted_payload.txt


```

```

test matched data


```

Encryption formats

The format of the encrypted payload can change over time. The `matched-data-cli` tool returns an error if it cannot decrypt a new encryption format.

To fix this error, [download ↗](https://github.com/cloudflare/matched-data-cli/releases) a newer version of the tool from GitHub and try again.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/payload-logging/command-line/decrypt-payload/#page","headline":"Decrypt the payload content in the command line · Cloudflare Web Application Firewall (WAF) docs","description":"Decrypt matched rule payloads using the command-line tool.","url":"https://developers.cloudflare.com/waf/managed-rules/payload-logging/command-line/decrypt-payload/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["CLI","Logging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/payload-logging/","name":"Log the payload of matched rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/managed-rules/payload-logging/command-line/","name":"Command-line operations"}},{"@type":"ListItem","position":6,"item":{"@id":"/waf/managed-rules/payload-logging/command-line/decrypt-payload/","name":"Decrypt the payload content"}}]}
```
