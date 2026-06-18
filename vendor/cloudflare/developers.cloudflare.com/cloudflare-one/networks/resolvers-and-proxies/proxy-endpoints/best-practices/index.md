---
title: PAC file best practices
description: PAC file best practices in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# PAC file best practices

A PAC file is a text file that specifies which traffic should redirect to the proxy server. When a browser makes a web request, it consults the PAC file's `FindProxyForURL()` function, which evaluates the request and returns routing instructions, such as a direct connection, proxy server, or failover sequence.

## PAC file format

The default Cloudflare PAC file follows a standard format:

default-pac.js

```

function FindProxyForURL(url, host) {

  // No proxy for private (RFC 1918) IP addresses (intranet sites)

  if (

    isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||

    isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") ||

    isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0")

  ) {

    return "DIRECT";

  }


  // No proxy for localhost

  if (isInNet(dnsResolve(host), "127.0.0.0", "255.0.0.0")) {

    return "DIRECT";

  }


  // Proxy all

  return "HTTPS 3ele0ss56t.proxy.cloudflare-gateway.com:443";

}


```

You can [customize the PAC file ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy%5Fservers%5Fand%5Ftunneling/Proxy%5FAuto-Configuration%5FPAC%5Ffile) and host it somewhere your browser can access.

### Formatting considerations

* Make sure the directive used for the endpoint is `HTTPS` and not `PROXY`. For example:  
   * Correct: `return "HTTPS your-subdomain.proxy.cloudflare-gateway.com:443";`  
   * Incorrect: `return "PROXY your-subdomain.proxy.cloudflare-gateway.com:443";`
* You must use a PAC file instead of configuring the endpoint directly in the proxy configuration of the browser. Modern browsers do not support HTTPS proxies without PAC files.
* Use a plain text editor such as VS Code to avoid extra characters.
* If you are using PAC files for public Internet browsing (instead of only internal services), refer to [Common bypass rules](#common-bypass-rules) for domains you may need to exclude from the proxy to prevent website functionality issues.

## PAC file template with identity provider bypass

When using [authorization endpoints](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#authorization-endpoint), you must bypass your identity provider (IdP) domains in the PAC file. This prevents authentication loops where the browser tries to authenticate with the proxy before it can reach the IdP to authenticate.

The following example PAC file is a comprehensive template that includes common IdP bypass rules. Replace the placeholder values with your configuration:

pac-idp-template.js

```

function FindProxyForURL(url, host) {

  // *** Identity Provider Bypass ***

  // CRITICAL: Bypass your IdP to prevent authentication loops

  // Uncomment and configure the section for your IdP:


  // Okta

  // if (host === "your-domain.okta.com" || shExpMatch(host, "*.oktacdn.com")) {

  //   return "DIRECT";

  // }


  // Microsoft Entra ID (Azure AD)

  // if (

  //   host === "login.microsoftonline.com" ||

  //   host === "aadcdn.msauth.net" ||

  //   host === "aadcdn.msftauth.net"

  // ) {

  //   return "DIRECT";

  // }


  // Google Workspace

  // if (

  //   host === "accounts.google.com" ||

  //   shExpMatch(host, "*.gstatic.com")

  // ) {

  //   return "DIRECT";

  // }


  // GitHub

  // if (shExpMatch(host, "*.github.com")) {

  //   return "DIRECT";

  // }


  // *** Private Networks ***

  // Bypass private RFC 1918 IP addresses

  if (

    isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||

    isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") ||

    isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0")

  ) {

    return "DIRECT";

  }


  // Bypass localhost

  if (isInNet(dnsResolve(host), "127.0.0.0", "255.0.0.0")) {

    return "DIRECT";

  }


  // Bypass plain hostnames (no dots)

  if (isPlainHostName(host)) {

    return "DIRECT";

  }


  // Bypass .local domains

  if (shExpMatch(host, "*.local")) {

    return "DIRECT";

  }


  // *** Cloudflare Access Logout ***

  // Optional: Redirect logout requests to your Access logout page

  // if (shExpMatch(url, "*logout*")) {

  //   return "HTTPS your-team-name.cloudflareaccess.com/cdn-cgi/access/logout";

  // }


  // *** Proxy all other traffic ***

  return "HTTPS your-subdomain.proxy.cloudflare-gateway.com:443";

}


```

IdP bypass requirement

When using authorization endpoints, you must configure IdP bypass for your identity provider. Without this, your users will be unable to authenticate and encounter errors when trying to use the proxy.

## Performance optimization

Browsers evaluate PAC files for every request. Optimizing PAC file performance is critical to avoid delays and issues in web browsing for your users.

### Cache DNS results in variables

When performing DNS resolution with `dnsResolve()`, store the result in a variable to reuse it across multiple checks. This avoids redundant DNS lookups:

JavaScript

```

function FindProxyForURL(url, host) {

  // Resolve once and reuse

  var hostIP = dnsResolve(host);


  if (isInNet(hostIP, "10.0.0.0", "255.0.0.0")) {

    return "DIRECT";

  }


  // Reuse hostIP for additional checks

  if (isInNet(hostIP, "172.16.0.0", "255.240.0.0")) {

    return "DIRECT";

  }


  return "HTTPS proxy.example.com:443";

}


```

### Check for plain hostnames first

NetBIOS names (hostnames without periods) are typically internal and should bypass the proxy. Check for these first:

JavaScript

```

if (isPlainHostName(host)) return "DIRECT";


```

## Advanced techniques

### Case sensitivity handling

JavaScript is case-sensitive. Convert hostnames to lowercase for consistent matching:

JavaScript

```

function FindProxyForURL(url, host) {

  // Normalize to lowercase

  host = host.toLowerCase();

  url = url.toLowerCase();


  if (shExpMatch(host, "*.example.com")) {

    return "DIRECT";

  }


  return "HTTPS proxy.cloudflare-gateway.com:443";

}


```

## Common bypass rules

When using PAC files for public Internet browsing (not just internal services), you may need to bypass the proxy for certain domains to prevent website functionality issues. The following are common scenarios where your proxy may interfere with traffic.

Optional rules

These bypass rules are optional and depend on your organization's security requirements. Evaluate each bypass rule against your security policies before implementation. You can also use [HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) to selectively filter traffic from these domains while still routing them through the proxy.

### Font and static asset providers

Font APIs and static asset providers should typically bypass the proxy to prevent rendering issues:

JavaScript

```

// Bypass font providers

if (

  shExpMatch(host, "*.googleapis.com") ||

  shExpMatch(host, "*.gstatic.com") ||

  shExpMatch(host, "fonts.adobe.com")

) {

  return "DIRECT";

}


```

### Streaming and media services

Video streaming and large media downloads may perform better with direct connections:

JavaScript

```

// Bypass streaming services

if (

  shExpMatch(host, "*.netflix.com") ||

  shExpMatch(host, "*.youtube.com") ||

  shExpMatch(host, "*.googlevideo.com")

) {

  return "DIRECT";

}


```

### Apps with certificate pinning

When HTTPS inspection is enabled, applications and services that use certificate pinning reject the Cloudflare-injected certificate and fail to load when routed through the proxy. Bypass these domains in your PAC file:

JavaScript

```

// Bypass certificate-pinned apps

if (

  shExpMatch(host, "*.example-bank.com") ||

  shExpMatch(host, "*.example-pinned-app.com")

) {

  return "DIRECT";

}


```

[Do Not Inspect (DNI) policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#do-not-inspect) will not prevent certificate pinning errors on these connections — bypassing certificate-pinned apps in the PAC file is required.

## Test PAC files

### Test with expected websites

Before deploying your PAC file to all users in your organization, test it with the websites and applications your users commonly access. This helps ensure:

* Internal resources are accessible and not incorrectly routed through the proxy
* External websites are properly filtered through Gateway
* Performance is acceptable for typical usage patterns

Tip

Create a test list of representative domains and verify the PAC file routes them correctly.

### Validate syntax

PAC files use JavaScript syntax. A single syntax error (such as a missing closing parenthesis `)` or bracket `]`) will cause the entire PAC file to fail. Use a JavaScript-aware text editor to find and fix syntax errors before deployment.

## Troubleshoot configurations

### Debug PAC file routing decisions

If you have an issue with proxy routing, most browsers provide debugging tools to verify PAC file behavior:

Chromium-based browsers (Chrome, Edge, Brave)

1. In your browser, go to `chrome://net-export/` (or `edge://net-export/`).
2. Select **Start Logging to Disk**.
3. Go to the website you want to test with the affected browser.
4. Select **Stop Logging**.
5. Open the downloaded file with [netlog-viewer ↗](https://netlog-viewer.appspot.com/).
6. Search for your domain to see proxy resolution decisions.

Firefox

1. In Firefox, go to **Tools** \> **Browser Tools** \> **Browser Console**.
2. Go to the website you want to test with the affected browser.
3. Look for messages related to proxy resolution.

You can also test PAC file logic directly in the console by copying your `FindProxyForURL` function and calling it with test URLs. For example:

TODO

Safari

1. In Safari, go to **Safari** \> **Settings**, then select **Advanced**.
2. Turn on **Show Develop menu in menu bar**.
3. Select **Develop** \> **Show Web Inspector**.
4. Go to the **Network** tab.
5. Look at the request details to verify proxy usage.

### Browsing on a device using a PAC file is slow

Excessive DNS lookups in the PAC file can cause delays. Review your PAC file and minimize the use of `dnsResolve()`, `isInNet()`, and `isResolvable()` functions.

### Browser caches PAC files incorrectly

When you update a PAC file, browsers may continue to use a cached version, causing unexpected behavior. Clear your browser cache and restart the browser after updating the PAC file to ensure the browser uses the latest version.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/best-practices/#page","headline":"PAC file best practices · Cloudflare One docs","description":"PAC file best practices in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/best-practices/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/resolvers-and-proxies/","name":"Resolvers and proxies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/","name":"Proxy endpoints"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/best-practices/","name":"PAC file best practices"}}]}
```
