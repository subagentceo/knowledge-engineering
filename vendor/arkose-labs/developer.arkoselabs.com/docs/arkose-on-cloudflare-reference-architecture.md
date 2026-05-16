# Arkose on Cloudflare - Reference Architecture

# Overview

This document describes the workflow and implementation with Cloudflare. The logic to verify the Arkose Labs token when handling a call to a protected endpoint would normally be handled by the web servers of Arkose Labs’ customers. When customers use Cloudflare to accelerate their traffic, the logic can be offloaded to the CDN. This not only helps streamline the integration of new customers or new endpoints but also shifts malicious traffic to the CDN layer, saving the customer’s web server bandwidth for legitimate traffic. When Arkose Bot Manager is integrated with Cloudflare, the CDN layer will take care of the following steps:

* If the `arkosesessiontoken` header is missing from the request to the protected endpoint, block the request and respond to the client Invalid or `Missing Arkose Session Token`
* Otherwise:
  * Forward the request to Arkose Labs’ verify API
  * Process the response from the Arkose Labs API and decide whether to block the request (`solved`=false) or forward it to the origin web server (`solved`=true)

## Workflow

<Image align="center" alt="Workflow Diagram - Verification Flow in CloudFlare" border={false} caption="Workflow Diagram - Verification Flow in Cloudflare" src="https://files.readme.io/ce9529d-image.png" />

## Integration Steps

This integration consists of two parts:

1. Add and configure Arkose client side javascript.
2. Configure and deploy the verification Cloudflare worker.

### Client-Side Setup

In order to use Arkose Bot Manager, some JavaScript additions needs to be made to the page you want to protect, such as your Login or Registration page. Documentation for the client-side additions can be found in the Arkose Labs standard integration guides:

* [Standard Setup](https://developer.arkoselabs.com/docs/standard-setup)

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
  <h1>Test web site with Cloudflare integration</h1>
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
 
 <!--
    This global function will be invoked when the API is ready. Ensure the name is the same name
    that is defined on the attribute `data-callback` in the script tag that loads the api for your
    public key.
 -->
  
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

### Server-Side Setup

Please ensure you have a Cloudflare Account with Cloudflare Workers features enabled. For information on Cloudflare workers please visit: [https://developers.cloudflare.com/workers/get-started/quickstarts/](https://developers.cloudflare.com/workers/get-started/quickstarts/) )

Before deploying the Cloud worker javascript, please remember to make the follow changes:

* Update the `ARKOSE_API_SECRET` with your private key.
* Update `pathname` to match the path name you intend to protect.
* Update the Verify API `https://<company>-verify.arkoselabs.com/api/v4/verify/`  with the API provided to you by Arkose Labs. *Remember to replace`<company>` with your company's personalized Client API URL name.*

```javascript
const ARKOSE_API_SECRET = globalThis.ARKOSE_API_SECRET;

// Modify config according to your use case
const CONFIG = {
  triggers: [
    {
      route: {
        method: "POST", // HTTP method of the matched request
        pathname: "/signup", // pathname of the matched request
      }
    },
    {
      route: {
        method: "GET",
        pathname: "/",
      }
    },
  ],
  timeout: 2000, // Arkose api timeout
  scrubbedHeaders: ["cookie", "authorization"], // headers to filter out
  denyResponse: function (request, data) {
    return new Response(null, { status: 403, statusText: "denied" });
  },
  extractSessionToken: function (formData, headers) {
    // here we get request token from the form data
    if (formData) {
      return formData.get("arkose_session_token");
    }
    // but if token is sent differently eg in headers you can replace this line with
    // return headers.get("Arkose-Session-Token");
  }
    return user;
  },
};

class InvalidsessionTokenError extends Error {
  constructor(message) {
    super(message);

    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name;

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Return prefiltered request headers
 * @param {Headers} requestHeaders
 */
function scrubHeaders(requestHeaders) {
  const headersObject = Object.fromEntries(requestHeaders);

  return Object.keys(headersObject).reduce((accumulator, headerKey) => {
    const isScrubbed = CONFIG.scrubbedHeaders.includes(headerKey.toLowerCase());
    return {
      ...accumulator,
      [headerKey]: isScrubbed ? true : headersObject[headerKey],
    };
  }, {});
}

/**
 * Return timeout promise on the base of the promise
 * @param {number} ms
 * @param {Promise} promise
 */
async function timeout(ms, promise) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Arkose Api Timeout"));
    }, ms);

    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((reason) => {
        clearTimeout(timer);
        reject(reason);
      });
  });
}

/**
 * Return the result of the POST /filter call to Verify API
 * @param {Object} trigger
 * @param {Request} request
 */
async function performRequest(trigger, request) {
  const clonedRequest = await request.clone();
  let formData;
  try {
    formData = await clonedRequest.formData();
  } catch {}

  const sessionToken = CONFIG.extractSessionToken(formData, request.headers);
  if (!sessionToken) {
    return {solved: false};
  }

  const requestBody = {
    private_key: ARKOSE_API_SECRET,
    session_token: sessionToken
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await timeout(
      CONFIG.timeout,
      fetch(`https://<company>-verify.arkoselabs.com/api/v4/verify/`, requestOptions)
    );
    if (response.status === 201) {
      return await response.json();
    } else {
      throw "arkose error";
    }
  } catch (err) {
    throw err;
  }
}

/**
 * Return matched action or undefined
 * @param {Request} request
 */
function findMatchingRoute(request) {
  const requestUrl = new URL(request.url);
  for (const trigger of CONFIG.triggers) {
    if (
      requestUrl.pathname === trigger.route.pathname &&
      request.method === trigger.route.method
    ) {
      return trigger;
    }
  }
}

/**
 * Process the received request
 * @param {Request} request
 */
async function handleRequest(request) {
  try {
    const trigger = findMatchingRoute(request);

    if (!trigger) {
      // returns the original fetch promise
      return fetch(request);
    }

    const arkoseResponse = await performRequest(trigger, request);

    if (arkoseResponse && arkoseResponse.solved == false) {
      // defined what to do when deny happens
      return CONFIG.denyResponse(request, arkoseResponse);
    }

    // returns the original fetch promise
    return fetch(request);
  } catch (err) {
    if (err instanceof InvalidsessionTokenError) {
      // Deny attempt. Likely a bad actor
      return CONFIG.denyResponse(request, null);
    } else {
      // just pass the original fetch promise in case of any other error
      return fetch(request);
    }
  }
}

addEventListener("fetch", (event) => {
  if (!ARKOSE_API_SECRET) {
    throw new Error("ARKOSE_API_SECRET not provided");
  }
  event.respondWith(handleRequest(event.request));
});
```