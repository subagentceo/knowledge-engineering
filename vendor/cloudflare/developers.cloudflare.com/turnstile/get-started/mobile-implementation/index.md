---
title: Mobile implementation
description: Implement Turnstile in native mobile applications.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Mobile implementation

Turnstile requires a browser environment because it runs JavaScript challenges in the visitor's browser. On mobile devices, Turnstile works in mobile browsers without additional configuration.

For native mobile applications, Turnstile does not run natively. Instead, you use a WebView — a browser component embedded inside your native app — to load a webpage that contains the Turnstile widget.

---

## WebView integration

A WebView embeds a browser engine within your native application, enabling you to show web pages, forms, and JavaScript-powered content like Turnstile widgets.

### Requirements

For Turnstile to function properly in WebView, the following requirements must be met.

#### JavaScript support

* JavaScript execution must be enabled.
* DOM storage API must be available.
* Standard web APIs must be accessible.

#### Network access

* Access to `challenges.cloudflare.com`
* Support for both HTTP and HTTPS connections.
* Allow connections to `about:blank` and `about:srcdoc`

#### Environment consistency

* Consistent User Agent throughout the session
* Stable device and browser characteristics
* No modification to core browser behavior

### Platform-specific implementation

#### Android WebView

```

WebView webView = findViewById(R.id.webview);

WebSettings webSettings = webView.getSettings();


// Required: Enable JavaScript

webSettings.setJavaScriptEnabled(true);


// Required: Enable DOM storage

webSettings.setDomStorageEnabled(true);


// Recommended: Enable other web features

webSettings.setLoadWithOverviewMode(true);

webSettings.setUseWideViewPort(true);

webSettings.setAllowFileAccess(true);

webSettings.setAllowContentAccess(true);


// Load your web content with Turnstile

webView.loadUrl("https://yoursite.com/protected-form");


```

#### iOS WKWebView (Swift)

Swift

```

import WebKit


class ViewController: UIViewController {

    @IBOutlet weak var webView: WKWebView!


    override func viewDidLoad() {

        super.viewDidLoad()


        // Configure WebView

        let configuration = WKWebViewConfiguration()

        configuration.preferences.javaScriptEnabled = true


        // Load your web content with Turnstile

        if let url = URL(string: "https://yoursite.com/protected-form") {

            webView.load(URLRequest(url: url))

        }

    }

}


```

#### React Native WebView

JavaScript

```

import { WebView } from "react-native-webview";


export default function App() {

  return (

    <WebView

      source={{ uri: "https://yoursite.com/protected-form" }}

      javaScriptEnabled={true}

      domStorageEnabled={true}

      allowsInlineMediaPlayback={true}

      mediaPlaybackRequiresUserAction={false}

    />

  );

}


```

#### Flutter WebView

Dart

```

import 'package:flutter_inappwebview/flutter_inappwebview.dart';


class WebViewScreen extends StatelessWidget {

  @override

  Widget build(BuildContext context) {

    return InAppWebView(

      initialUrlRequest: URLRequest(

        url: Uri.parse('https://yoursite.com/protected-form')

      ),

      initialOptions: InAppWebViewGroupOptions(

        crossPlatform: InAppWebViewOptions(

          javaScriptEnabled: true,

          useShouldOverrideUrlLoading: false,

        ),

        android: AndroidInAppWebViewOptions(

          domStorageEnabled: true,

        ),

        ios: IOSInAppWebViewOptions(

          allowsInlineMediaPlayback: true,

        ),

      ),

    );

  }

}


```

---

## Common implementation issues

### User Agent consistency

Changing the User Agent during a session causes Turnstile challenges to fail because the system relies on consistent browser characteristics to validate the visitor's authenticity. When the User Agent changes mid-session, Turnstile treats this as a potential security risk and rejects the challenge.

```

// Android - Set consistent User Agent

webSettings.setUserAgentString(webSettings.getUserAgentString());


```

Swift

```

// iOS - Maintain default User Agent

webView.customUserAgent = webView.value(forKey: "userAgent") as? String


```

### Content Security Policy (CSP)

Strict [Content Security Policy](https://developers.cloudflare.com/turnstile/reference/content-security-policy/) settings can prevent Turnstile from loading the necessary scripts and making required network connections. This happens when CSP headers or meta tags block access to the domains and resources that Turnstile needs to function properly.

```

<meta

  http-equiv="Content-Security-Policy"

  content="

  default-src 'self';

  script-src 'self' challenges.cloudflare.com 'unsafe-inline';

  connect-src 'self' challenges.cloudflare.com;

  frame-src 'self' challenges.cloudflare.com;

"

/>


```

### Domain configuration

WebView security restrictions can prevent access to the domains that Turnstile requires for proper operation. Some WebViews are configured to only allow specific domains or block certain types of connections, which can interfere with Turnstile's ability to load challenges and communicate with Cloudflare's servers.

To resolve this, configure your WebView's allowed origins to include all domains that Turnstile needs:

* `challenges.cloudflare.com`
* `about:blank`
* `about:srcdoc`
* Your own domain(s)

The exact configuration method varies by platform, but the principle is to explicitly allow network access for these domains.

### Cookie and storage issues

Cookies and local storage not persisting between sessions can cause Turnstile to fail because it relies on these mechanisms to maintain state and track visitor behavior. This commonly occurs when WebView storage settings are too restrictive or when the app clears storage between sessions. Ensure that your WebView is configured to properly handle cookies and local storage.

```

// Android - Enable cookies

CookieManager.getInstance().setAcceptCookie(true);

CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);


```

Swift

```

// iOS - Configure cookie storage

webView.configuration.websiteDataStore = WKWebsiteDataStore.default()


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/get-started/mobile-implementation/#page","headline":"Mobile implementation · Cloudflare Turnstile docs","description":"Implement Turnstile in native mobile applications.","url":"https://developers.cloudflare.com/turnstile/get-started/mobile-implementation/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["iOS","Android"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/get-started/mobile-implementation/","name":"Mobile implementation"}}]}
```
