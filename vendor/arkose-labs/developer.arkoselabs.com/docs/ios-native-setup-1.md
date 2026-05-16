# iOS WebView Setup

> 🚧 Are you sure you want to use this instead of the iOS Mobile SDK?
>
> This page is about Arkose Labs' Webview direct integrations approach for iOS. **Note**: Rather than using this approach and having to write significant code yourself, we strongly urge you to use our  [iOS Mobile SDK](https://developer.arkoselabs.com/docs/ios-mobile-sdk). Arkose will continue to improve and add functionality to the iOS Mobile SDK that will **not** be added to the following Webview direct integration approach.

# Overview

There are two steps required to fully implement the Arkose Bot Manager:

1. Client-side implementation that allows Arkose Bot Manager to collect data necessary to classify the traffic from the client, display an Enforcement Challenge (EC) if necessary, and provide a one-time use token.

2. Server-side implementation that takes the token provided by the client-side and verifies it with the Arkose Labs Verify API. The result is a response that contains information about the session, either in a simple format or as a JSON.

Arkose Bot Manager can be implemented within a native iOS application as either a web based flow, or as a transient web view as part of a user's interaction with the application e.g. login/registration. This page's example code was written in Swift, but the overall approach would be the same if using UIKit.

An example iOS implementation XCode project is available on request through your CSM (Customer Success Manager).

## Web Based Flow

Supports applications that use an embedded web view and web content to fully handle a user performing an action such as login. Because a web view is being used to render content and deal with user interaction, the [Client-Side Instructions](https://developer.arkoselabs.com/docs/standard-setup) can be used to build the web view content needed to implement the Arkose Bot Manager.

## Transient Web View

Supports applications that implement user activity using the native iOS SDK. Where native app functionality is being used to capture user interaction e.g. login, a transient web view can be used to run the Arkose Bot Manager JavaScript API. The API will collect device and network information, share that with the decisioning engine, and display an Enforcement Challenge (EC) when necessary. The result of this interaction can then be passed back to native application logic for further processing.

## Sequence Diagram

This example sequence shows how the Arkose Labs API could be hosted within a `WKWebView`. The example shown is using the Transient Web View approach. A `WKWebView` instance is placed within the view hierarchy which deals with running the Arkose Labs API and displaying a challenge if necessary.

<Image border={false} src="https://files.readme.io/058431c-ios-workflow.png" title="ios-workflow.png" />

## Demo

When running our enforcement component, you can see the results of installing the Enforcement Challenge on iOS in this 30 seconds screen capture recording of the example project. Note that you need to click the start arrow button at the left bottom of the image for it to begin playing. [Demo](https://vimeo.com/638037440/396d76bac9).

# API Request Authentication

Arkose Labs authenticates your API requests using a private/public key pair that can be retrieved from the **Key Settings** page of the [Arkose Labs Command Center](https://developer.arkoselabs.com/docs/arkose-labs-command-center). As shown below, go to the left menubar's **Settings** entry, and then to the **Keys** sub-entry. If you do not have access to the Command Center or do not have your private and public keys, contact your Sales Rep or Sales Engineer.

<Image border={false} src="https://files.readme.io/b2eea4a-Screen_Shot_2022-02-20_at_5.23.57_PM.png" title="Screen Shot 2022-02-20 at 5.23.57 PM.png" />

The private key is needed to authenticate when using the Verify API. This private key must not be published on a client facing website, and must only be used on your server-side implementation on the Arkose Labs Verify API.

# Using WKWebView

The Arkose Labs client-side API is written in JavaScript and interacts with the browser API to collect data used as part of traffic classification. When using iOS this is supported through the use of the `WKWebView` object. This allows web content to be rendered and used within your native application.

## Setting up the WKWebView

The example code below shows how to setup the `WKWebView` object.

<Recipe slug="setting-up-the-wkwebview-for-ios" title="Setting Up the WKWebView for iOS" />

```swift
struct ALWebView: UIViewRepresentable {

  func makeUIView(context: Context) -> WKWebView {
        
        // 1
        let preferences = WKWebpagePreferences()
        preferences.allowsContentJavaScript = true 
        let configuration = WKWebViewConfiguration()
        configuration.defaultWebpagePreferences = preferences
        
        // 2
        let configuration = WKWebViewConfiguration()
        configuration.userContentController.add(context.coordinator, name: "AL_API")
        configuration.defaultWebpagePreferences = preferences

        // 3
        let webView = WKWebView(frame: CGRect.zero, configuration: configuration)
        webView.allowsBackForwardNavigationGestures = false
        webView.scrollView.isScrollEnabled = false
        
        // 4
        if let url = Bundle.main.url(forResource: "ArkoseLabsAPI", withExtension: "html", subdirectory: "") {
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        } else {
            fatalError()
        }
        
        // 5
        return webView
    }

    // 6
    func updateUIView(_ webView: WKWebView, context: Context) {
        //Empty
    }
    
    // 7
    static func dismantleUIView(_ uiView: WKWebView, coordinator: Coordinator) {
        // Must remember to remove the message handler when the view is torn down or it will leak memory
        uiView.configuration.userContentController.removeScriptMessageHandler(forName: "AL_API")
    }    
}
```

1. Make sure that JavaScript has been enabled through `WKWebPagePreferences`.

2. The preferences created in step 1 need to be attached to `WKWebViewConfiguration`, as part of a user content controller. This controller is responsible for coordinating interactions between your app’s native code and the webpage scripts e.g. the Arkose Labs API.

3. Set the initial size of the view. To hide it on screen initially, the size has been defined as zero. Navigation gestures and scrolling are also disabled.

4. Load an HTML file that contains the JavaScript and HTML content necessary to load the Arkose Labs API. This example is loading a HTML file (see the [Web Page HTML](#web-page-html) later in this page for more information) included within the project.

5. Return the web view created for use within SwiftUI.

6. When wrapping a UIKit view into a struct that uses the `UIViewRepresentable` protocol for use with Swift UI, this method is required and is called when a view is updated.

7. When a view is removed, this will also remove the script message handler that has been created. If this isn’t done then the view will leak memory.

## Creating a user content controller

Communication between a webpage JavaScript and native app code is coordinated using a `WKScriptMessageHandler.` This controller is linked to the web view in step 2 above. This code shows an example implementation of a controller. Use the appropriate code for either our enforcement and detection components.

<Recipe slug="creating-a-user-content-controller-for-ios" title="Creating a User Content Controller for iOS" />

```swift Enforcement
// 1
func makeCoordinator() -> Coordinator {
    Coordinator(self)
}

// 2
class Coordinator : NSObject, WKScriptMessageHandler {

        // 3
        var parent: ALWebView

        init(_ parent: ALWebView) {
            self.parent = parent
        }
        
        // 4
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            if message.name == "AL_API" {
                if let body = message.body as? [String: Any?] {
                    apiResponse(json: body)
                }
            }
        }
        
        // 5
        func apiResponse(json: [String : Any?]) {
            for (key, value) in json {
                if key == "onReady" {
                  // do something
                } else
                if key == "onShown" {
                  // do something
                } else
                if key == "onSuppress" {
                  // do something
                } else
                if key == "onReset" {
                  // do something
                } else
                if key == "onCompleted" {
                  // do something
                } else
                if key == "onFailed" {
                  // do something
                } else
                if key == "onError" {
                  // do something
                } else
                if key == "onResize" {
                  // do something
                } else
                if key == "onShow" {
                  // do something
                }
            }
        }
    }
```

```swift Detection
// 1
func makeCoordinator() -> Coordinator {
    Coordinator(self)
}

// 2
class Coordinator : NSObject, WKScriptMessageHandler {

        // 3
        var parent: ALWebView

        init(_ parent: ALWebView) {
            self.parent = parent
        }
        
        // 4
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            if message.name == "AL_API" {
                if let body = message.body as? [String: Any?] {
                    apiResponse(json: body)
                }
            }
        }
        
        // 5
        func apiResponse(json: [String : Any?]) {
            for (key, value) in json {
                if key == "onReady" {
                  // do something
                } else
                if key == "onSuppress" {
                  // do something
                } else
                if key == "onCompleted" {
                  // do something
                } else
                if key == "onError" {
                  // do something
                } else
                if key == "onShow" {
                  // do something
                }
            }
        }
    }
```

1. This function is added to the `ALWebView` struct and is called automatically when a new view is created. This allows us to create an instance of our `Coordinator` class, passing in a reference to `ALWebView`.

2. The `Coordinator` is a class that complies with the `WKScriptMessageHandler` protocol. This has been implemented within the `AlWebView` struct in the example project.

3. A reference to the parent of this controller, the web view, is kept so that the coordinator can communicate with the controller.

4. This function is invoked when a message is posted from the webpage JavaScript using `window.webkit.messageHandlers.AL_API.postMessage()`. Note that `AL_API' in the function name is the name defined when the controller was created. This function simply checks the controller name being passed and if the message body received is in JSON format and calls the `apiResponse\` function, otherwise no action is taken.

5. This function loops through the keys inside the JSON message and reacts based on the message received. This is a simple way to react to the Arkose Labs API function callbacks in this example.

# Web Page HTML

Below is an example of an HTML file that uses the Arkose Labs API and also makes use of the JavaScript interface setup in the above steps. Use the appropriate code depending on whether you're running our detection or enforcement components

```html Enforcement
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0"/>
        
        <!-- Setup the Arkose API 
        
    Include the Arkose Labs API in the <head> of your page. In the example below, remember to
    replace the <YOUR PUBLIC KEY> with the public key supplied to you by Arkose Labs, and 
    replace <YOUR CALLBACK> with a name that refers to a global function.
    e.g. <script src="//client-api.arkoselabs.com/v2/<YOUR_PUBLIC_KEY>/api.js" data-callback="setupDetect" ></script>
         -->
        
        <script data-callback="setupEnforcement" src="https://<company>-api.arkoselabs.com/v2/<YOUR_PUBLIC_KEY>/api.js" ></script>
        <script type="text/javascript">
                        
            // Setup the enforcement API
            function setupEnforcement(arkoseEnforcement) {
                var arkose = arkoseEnforcement.setConfig({
                    selector: '#challenge',
                    
                    // We are using 'inline' as we want the session to be created as soon as the page loads
                    mode: "inline",
                    
                    // These are the functions that can be called when the enforcement API is triggered
                    onCompleted: function(response) {
                        window.webkit.messageHandlers.AL_API.postMessage({"onCompleted" : true});
                        
                        // When a challenge has been completed, send the response from the challenge back to the native iOS code.
                        // The token from this data will then be used within the server-side verification API call to Arkose
                        window.webkit.messageHandlers.AL_API.postMessage({"sessionToken" : response.token});
                    },
                    onReady: function() {
                        window.webkit.messageHandlers.AL_API.postMessage({"onReady" : true});
                    },
                    onReset: function() {
                        window.webkit.messageHandlers.AL_API.postMessage({"onReset" : true});
                    },
                    onSuppress: function() {
                        window.webkit.messageHandlers.AL_API.postMessage({"onSuppress" : true});
                    },
                    onShown: function() {
                        window.webkit.messageHandlers.AL_API.postMessage({"onShown" : true});
                    },
                    onShow: function() {
                        window.webkit.messageHandlers.AL_API.postMessage({"onShow" : true});
                    },
                    onResize: function(response) {
                        window.webkit.messageHandlers.AL_API.postMessage({"onResize" : true});
                    },
                    onFailed: function(response) {
                        window.webkit.messageHandlers.AL_API.postMessage({"onFailed" : true});
                    },
                    onError: function(response) {
                        window.webkit.messageHandlers.AL_API.postMessage({"onError" : true});
                    }
                });
            }
        </script>
        
    </head>
    
    <body>
        <!-- This is the element into which the challenge will be rendered if necessary -->
        <div id="challenge" style="width: 100%"></div>
    </body>
        
</html>

```

```html Detection
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0"/>
        
        <!-- Setup the Arkose API -->
        <!--
    Include the Arkose Labs API in the <head> of your page. In the example below, remember to
    replace the <YOUR PUBLIC KEY> with the public key supplied to you by Arkose Labs, and 
    replace <YOUR CALLBACK> with a name that refers to a global function.
    e.g. <script src="//client-api.arkoselabs.com/v2/<YOUR_PUBLIC_KEY>/api.js" data-callback="setupDetect" ></script>
         -->
         
        <script data-callback="setupDetect" src="https://<company>-api.arkoselabs.com/v2/<YOUR_PUBLIC_KEY>/api.js" ></script>
        <script type="text/javascript">
                        
            // Setup the detect API
            function setupDetect(arkoseDetect) {
                var arkose = arkoseDetect.setConfig({
                    selector: '#detect',
                    
                    // We are using 'inline' as we want the session to be created as soon as the page loads
                    mode: "inline",
                    
                    // These are the functions that can be called when the API is triggered
                    onCompleted: function(response) {
                        window.webkit.messageHandlers.AL_API.postMessage({"onCompleted" : true});
                        
                        // When a session has been completed, send the response back to the native iOS code.
                        // The token from this data will then be used within the server-side verification API call to Arkose
                        window.webkit.messageHandlers.AL_API.postMessage({"sessionToken" : response.token});
                    },
                    onReady: function() {
                        window.webkit.messageHandlers.AL_API.postMessage({"onReady" : true});
                    },
                    onSuppress: function() {
                        window.webkit.messageHandlers.AL_API.postMessage({"onSuppress" : true});
                    },
                    onShow: function() {
                        window.webkit.messageHandlers.AL_API.postMessage({"onShow" : true});
                    },
                    onError: function(response) {
                        window.webkit.messageHandlers.AL_API.postMessage({"onError" : true});
                    }
                });
            }
        </script>
        
    </head>
    
    <body>
        <!-- This is the element into which the Arkose Platform will load the scripts for detection -->
        <div id="detect" style="width: 100%"></div>
    </body>
        
</html>
```

Within the JavaScript callback functions, a call is made to `window.webkit.messageHandlers.AL_API.postMessage()` and it’s this command that posts the data provided to the iOS app.

# Server-Side Instructions

When you have successfully set up your client-side set up you must go on to the [Server-Side Setup](https://developer.arkoselabs.com/docs/server-side-setup).