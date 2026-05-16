# Arkose on Fastly - Reference Architecture

# Overview

Fastly is a content delivery network that operates proxy servers around the world to accelerate web traffic and provide other value-added services. Fastly can also integrate with 3rd party services such as Arkose Labs.

This document describes the workflow and implementation with Fastly. The logic to verify the Arkose Labs token when handling a call to a protected endpoint would normally be handled by the web servers of Arkose Labs’ customers. When customers use Fastly to accelerate their traffic, the logic can be offloaded to the CDN. This not only helps streamline the integration of new customers or new endpoints but also shifts malicious traffic to the CDN layer, saving the customer’s web server bandwidth for legitimate traffic. When Arkose Bot Manager is integrated with Fastly, the CDN layer will take care of the following steps:

* If the `arkosesessiontoken` header is missing from the request to the protected endpoint, block the request and respond to the client `Invalid or Missing Arkose Session Token`

* Otherwise:

  * Forward the request to Arkose Labs’ verify API

  * Process the response from the Arkose Labs API and decide whether to block the request (solved=false) or forward it to the origin web server (solved=true)

# Workflow

## Exchange workflow without Fastly

1. The client loads a page (for example login form) with an endpoint protected with Arkose Bot Manager(the login request). The page returned by the origin web server includes tags for the Arkose Labs JavaScript API

2. The client parses the content of the HTML page and loads the page assets including the Arkose Labs JavaScript

3. The JavaScript runs on the client-side. It collects various client characteristics, or a fingerprint, and sends it to the Arkose Labs server. The Arkose Labs server creates a session, evaluates the fingerprint, and if a threat is found a signal will be sent back to the client indicating that a challenge must be shown. The challenge type and difficulty depend on the threat and pressure applied on the threat signature

4. Several messages are sent to the Arkose Labs server while the user interacts with the challenge. The user interactions are defined as events, such as game loaded or user clicked verify

5. The user triggers a request to the protected endpoint, by clicking **Verify** (user clicked verify event ). The Arkose Labs token is sent along with the request. The customer origin web server extracts the token and makes an API call to the Arkose Labs server to get a classification (human or bot). If the Arkose Labs API returns **solved=false**, the client-side code rejects/denies the request. The same action is taken when the token is missing from the request. Otherwise, if **solved=true** is returned, it proceeds with the request.

In this model, the Arkose Labs customer must make two changes to integrate with Arkose Bot Manager:

1. Add the necessary code to the pages hosting the protecting endpoint to collect telemetry and fingerprint

2. Update their back-end logic to make an API call to Arkose labs to verify the token on the protected requests

<Image border={false} src="https://files.readme.io/521ec1f-Arkose-with-CDN.png" title="Arkose-with-CDN.png" />

# Exchange workflow with Fastly

Steps 1 to 4 of the exchange workflow with the CDN layer is the same as previously described. The main change is step 5 with regards to handling failed and successful verification. The workflow diagrams below show the altered behavior in the case of a failed and successful verifications:

## Failed to verify

1. The user triggers a request to the protected endpoint by clicking the **Verify** button

2. The Arkose Labs token is sent along with the request. The Fastly proxy server extracts the token and makes an API call to the Arkose Labs server to get the request classification (human or bot). If the Arkose Labs API returns **solved=false**, or if the token is missing,  the CDN layer will reject/deny the request

<Image border={false} src="https://files.readme.io/4a58e5b-Arkose-Fastly-Fail-v3.png" title="Arkose-Fastly-Fail-v3.png" />

## Successful Verify

1. The user triggers a request to the protected endpoint by clicking the **Verify** button

2. The Arkose Labs token is sent along with the request. The Fastly proxy server extracts the token and makes an API call to the Arkose Labs server to get the request classification (human or bot). If the Arkose Labs API returns **solved=true**, the CDN layer will allow the request to proceed to the customer origin web server.

<Image border={false} src="https://files.readme.io/9680886-Arkose-Fastly-Succeed-v3.png" title="Arkose-Fastly-Succeed-v3.png" />

# Integrations steps

This integration consists of two parts:

1. Arkose Labs client-side JavaScript additions

2. The server-side Arkose Labs verification check done through Fastly within Varnish Configuration Language (VCL) settings.

## Client-Side Setup

In order to use Arkose Bot Manager, some JavaScript additions need to be made to the page you want to protect, such as your Login or Registration page. Documentation for the client-side additions can be found in the Arkose Labs standard integration guides:

[Standard Setup](https://developer.arkoselabs.com/docs/standard-setup)

These guides walk through the JavaScript additions. When grabbing the Arkose Labs session token as part of the submission to the server-side, the token must be set as a request header called `arkosesessiontoken`. Here’s what the header and its value would look like:

```http
arkosesessiontoken: 35460485f134e4a89.4456731002|r=us-west-2|metabgclr=#ffffff|guitextcolor=#000000|metaiconclr=#757575|meta=3|pk=3707C1C9-9840-4A83-9015-6CD5C29F7BE1|at=40|ag=101|cdn_url=https://cdn.arkoselabs.com/fc|lurl=https://audio-us-west-2.arkoselabs.com|surl=https://client-api.arkoselabs.com
```

On requests to the protected endpoints, the Fastly proxy servers will extract the `arkosesessiontoken` and make a call to the Arkose verify API. When the header is missing, the Fastly server will generate an error.

The following code is an example of a basic login page that invokes the Arkose Labs detection and enforcement process on the submit button and passes the `arkosesessiontoken` header as a header:

```html
<html>
<head>
   <!--
    Include the Arkose Labs API in the <head> of your page. In the example below, remember to
    replace <company> with your company's personalized Client API URL name, and replace <YOUR PUBLIC KEY> with the public key supplied to you by Arkose Labs.
    e.g. <script src="//client-api.arkoselabs.com/v2/<YOUR PUBLIC KEY>/api.js" data-callback="setupEnforcement" ></script>
  -->
  <script src="//<company>-api.arkoselabs.com/v2/<YOUR_PUBLIC_KEY>/api.js" data-callback="setupEnforcement" ></script>
</head>
<body>

<!--
  The trigger element can exist anywhere in your page and can be added to the DOM at any time.
-->
  <h1>Test web site with Fastly integration</h1>
  <br/>
  <form method="post" id='loginForm' target="_self" action="./login.php">
    <input id=username type="text">
    <input id=password type="text">
    <input id="arkoseID" name="arkoseID" type="hidden" value="">
    <input type="submit" id="submit-id" onclick="return false;">
  </form>

<!--
  To configure the enforcement place a script tag just before the closing <body> tag and define the
  callback as a global function.
-->
<script>
 
  /*
    This global function will be invoked when the API is ready. Ensure the name is the same name
    that is defined on the attribute `data-callback` in the script tag that loads the api for your
    public key.
  */
  function setupEnforcement(myEnforcement) {
    myEnforcement.setConfig({
      selector: '#submit-id',
      onCompleted: function(response) {
        console.log(response.token);
        var xhttp = new XMLHttpRequest();
        var jsondata = JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
          });
        xhttp.open("POST", './login.php');
        xhttp.setRequestHeader('arkosesessiontoken', response.token);
        xhttp.send(jsondata);
		document.getElementById("loginForm").reset();
      }
    });
  }

</script>
</body>
</html>
```

# Server-Side Setup (Fastly)

## Overview

The server-side setup consists of three VCL modules:

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        VCL
      </th>

      <th>
        Purpose
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        init
      </td>

      <td>
        This VCL defines the Arkose Labs verify API backend.
      </td>
    </tr>

    <tr>
      <td>
        recv
      </td>

      <td>
        This VCL includes:

        * The definition of the protected endpoints and their associated private keys

        * The logic to make a preflight request to the Arkose Labs verify API on protected endpoints when the  session token is present in the request.

        * The logic to forward the request to the origin web server after the token has been successfully validated.

        * Set the error based on the evaluation of the arkose Labs verify API response
      </td>
    </tr>

    <tr>
      <td>
        fetch
      </td>

      <td>
        This VCL evaluates HTTP response codes when attempting to contact the Arkose Labs verify API and set an error codes when a 3xx, 4xx or 5xx is returned.
      </td>
    </tr>

    <tr>
      <td>
        error
      </td>

      <td>
        This VCL handles the error code and custom (synthetic) response. It also handles CORS headers responses.
      </td>
    </tr>

    <tr>
      <td>
        deliver
      </td>

      <td>
        This VCL evaluates the response from the Arkose Labs verify API, in particular the value in the “Arkose-Verify” header.
      </td>
    </tr>
  </tbody>
</Table>

These modules are available in the Arkose Labs public Github repository: [Arkose Labs](https://github.com/ArkoseLabs).

The 5 VCL snippets will need to be added to the Fastly configuration, with the relevant code to support the Arkose Labs integration.

<Callout icon="📘" theme="info">
  Before updating your Fastly configuration, please contact Fastly support to add the following 2 settings in the relevant service configuration to make the preflight request work properly on POST requests:

  `pragma optional_param fix_unsent_body_drain true;`\
  `pragma optional_param no_body_if_bereq_is_get_or_head true;`
</Callout>

The overall architecture looks like the following diagram:

<Image border={false} src="https://files.readme.io/943be3b-Arkose_On_Fastly_Reference_Developer_Guide.png" title="Arkose On Fastly Reference Developer Guide.png" />

## Fastly VCL Subroutines

To start the integration, go to the Fastly portal, select the configuration that supports the endpoint you want to protect, and clone the latest version. Select **VCL Snippet** and create add the following into your configuration.

The **vcl\_init subroutine** is executed first. It contains the Arkose Labs verify API backend definition.

```text
# Start of init.vcl for Arkose Labs-0.1 
backend Arkose_Labs {
    .between_bytes_timeout = 1s;
    .connect_timeout = 1s;
    .dynamic = true;
    .first_byte_timeout = 1s;
    .host = "verify-api.arkoselabs.com";
    .host_header = "<company>-verify.arkoselabs.com";
    .max_connections = 200;
    .port = "443";
    .ssl = true;
    .probe = {
        .dummy = true;
        .initial = 5;
        .request = "HEAD / HTTP/1.1"  "Host: verify-api.arkoselabs.com" "Connection: close";
        .threshold = 1;
        .timeout = 2s;
        .window = 5;
      }
}
# End of init.vcl for Arkose Labs-0.1
```

The **vcl\_recv subroutine** is executed by the Fastly proxy server at the request stage or as a result of a restart. The snippet between lines 10 and 15 defines the requests in scope and their associated private key. Please update the conditions in line 10 and the private key in line 11 to reflect your use case. If you have one private key for each use case, you must duplicate this snippet for each use case and update the conditions and the private key accordingly.

```text
# Start of recv.vcl for Arkose Labs-0.1 
# General conditions to execute the snippet
declare local var.url STRING;
declare local var.host STRING;
declare local var.method STRING;
declare local var.private_key STRING;

# Update the condition below to match the URL proteced with Arkose Labs adn the associated private key
if (req.http.host == "<YOUR_URL>" && req.url == "/login" && req.method == "POST"){
    set var.private_key = "<YOUR_PRIVATE_KEY>";
    set var.host = req.http.host;
    set var.url = req.url;
    set var.method = req.method;
}

if (req.restarts == 0 && req.method != "FASTLYPURGE") {
    # Update the condition below to match the URL proteced with Arkose Labs
    if (req.http.host == var.host && req.url == var.url && req.method == var.method){
        unset req.http.arkoseFail;
        if (req.method == "OPTIONS") {
            error 200 "OK";
        }
        if (!req.http.arkosesessiontoken){
            error 900 "Arkose Token Missing";
        } else {
            set req.backend = Arkose_Labs;
            set req.http.host = "verify-api.arkoselabs.com";
            set req.http.x-arkose-settings-url = urlencode(req.url);
            set req.http.x-arkose-settings-method = urlencode(req.method);
            set req.method = "GET";
            set req.url = "/api/v4/verify/";
            set req.http.Arkose-Private-Key = var.private_key;
            set req.http.Arkose-Session-Token = req.http.arkosesessiontoken;
            return(pass);
        }
        
    }
}

if (req.restarts == 1) {
    if (req.http.Arkose-Result == "token_invalid") {
        error 901 "Arkose Token Invalid";
    } 
    if (req.http.Arkose-Result == "denied_access") {
        error 902 "Access Denied";
    }
    if (req.http.x-arkose-settings-method) {
        set req.url = urldecode(req.http.x-arkose-settings-url);
        set req.method = urldecode(req.http.x-arkose-settings-method);
        # After a restart, clustering is disabled. This re-enables it.
        set req.http.fastly-force-shield = "1";
        unset req.http.x-arkose-settings-url;
        unset req.http.x-arkose-settings-method;
        unset req.http.arkose-private-key;
        unset req.http.arkosesessiontoken;
        unset req.http.arkose-session-token;
    }
  return(pass);
}
# End of recv.vcl for Arkose Labs-0.1
```

The **vcl\_fetch subroutine** is executed just after the headers of a syntactically correct backend response have been received. It watches for unexpected HTTP response code when communicating with the Arkose Labs backend.

```text
# Start of fetch.vcl for Arkose Labs-0.1 
# Look for error conditions communicating with the Arkose Labs verify API
if (req.backend == Arkose_Labs){ 
  if (http_status_matches(beresp.status, "500,502,503,504")) {
    set req.http.Arkose-Result = "service_unavailable";
    restart;
  }
  if (http_status_matches(beresp.status, "400,401,402,403")) {
    set req.http.Arkose-Result = "service_access_denied";
    restart;
  }
  if (http_status_matches(beresp.status, "300,301,302,303,307")) {
    set req.http.Arkose-Result = "service_redirect";
    restart;
  }
}
# Start of fetch.vcl for Arkose Labs-0.1
```

The **vcl\_error** subroutine handles the logic for when the Arkose Labs verification check does not pass, or when the Arkose Labs token is not passed in the original request. It also ensures the correct sets of cross-origin resource sharing (CORS) headers are served back to the client to ensure cross-domain request compliance.

```text
# Start of error.vcl for Arkose Labs-0.1 
# CORS handling - OPTIONS call
if (req.method == "OPTIONS") {
  set obj.http.Access-Control-Allow-Origin = "*";
  set obj.http.Access-Control-Allow-Headers = "arkosesessiontoken";
  set obj.http.Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, HEAD, OPTIONS";
  return(deliver);
} else {
    if (obj.status >= 900 ) {
        set obj.response = "OK";
        set obj.http.Cache-Control = "private, no-store";
        set obj.http.Access-Control-Allow-Origin = "*";
        set obj.http.Access-Control-Allow-Headers = "arkosesessiontoken";
        set obj.http.Content-Type = "application/json";
        
        # The arksosesessiontoken header was missing from the client request
        if (obj.status == 900 ) {
            synthetic "Missing Arkose Session Token";
        }
        # The verify API returned "solved=false"
        if (obj.status == 901 ) {
            synthetic "Invalid Arkose Session Token";
        }
        # The verify API returned "solved=false"
        if (obj.status == 902 ) {
            synthetic "Access denied returned";
        }
        return(deliver);       
    } 
}
# End of error.vcl for Arkose Labs-0.1
```

The **vcl\_deliver subroutine** is executed by the proxy at the response stage before the first byte is served to the client. The custom code below contains logic to check if the Arkose Labs verification step has occurred or not, and updates the origin based on whether a successful verification check has occurred.

```text
# Start of deliver.vcl for Arkose Labs-0.1 
# This VCL evaluates the response from the Arkose Labs verify API
if (req.backend == Arkose_Labs && req.restarts == 0) {
    if (std.strstr(resp.http.Arkose-Verify, "solved=true")) {
        set req.http.Arkose-Result = "token_valid";
        restart;
    }
    if (std.strstr(resp.http.Arkose-Verify, "solved=false")) {
        set req.http.Arkose-Result = "token_invalid";
        restart;
    }
    if (std.strstr(resp.http.Arkose-Verify, "error=DENIED ACCESS")) {
        set req.http.Arkose-Result = "denied_access";
        restart;
    } else {
        set req.http.Arkose-Result = "other_failure";
        restart;
    }
}
# End of deliver.vcl for Arkose Labs-0.1
```

## Error code and events

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Event Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Blocking event
      </td>

      <td>
        The following will trigger an error. A synthetic response will be served to the client. The content of the response can be customized.

        * `Missing Arkose Session Token` (900 error): the `arkosesessiontoken` header was missing from the request

        * `Invalid Arkose Session Token` (901 error): the token is not valid

        * `Access denied returned` (902 error): the verify API returned an error.
      </td>
    </tr>

    <tr>
      <td>
        Non-blocking events
      </td>

      <td>
        The other condition relates to detect issues that can be caused by transient communication issues or the verify API being unstable. For those cases, the request should be passed to the origin web server (fail open). The result of the evaluation process will be passed to the origin in the `Arkose-Result` header:

        * `token_valid`: The token was successfully validated

        * `service_unavailable`: The request to the verify API caused a 5xx response code

        * service\_access\_denied\`: The request to the verify API caused a 4xx response code

        * `service_redirect`: The request to the verify API caused a 3xx response code

        * `other_failure`: an unknown error occurred
      </td>
    </tr>
  </tbody>
</Table>

For further assistance setting up the Arkose Labs verification process on Fastly, please contact your Arkose Labs or Fastly services representative.