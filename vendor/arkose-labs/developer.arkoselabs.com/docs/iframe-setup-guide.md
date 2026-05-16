# Iframe Setup Guide

This page shows details about how to set up and use the Arkose Bot Manager in the context of an iframe.

<Callout icon="📘" theme="info">
  Please note that Arkose Bot Manager can host the domain/iframe for use by a customer. Please contact your CSM (Customer Success Manager) or SE for additional information.
</Callout>

> 📘 `iframe-auth` to be deprecated.
>
> Previous uses of `iframe-auth` in URLs have been changed to use `iframe`.

# How to Use the iframe

The code below shows a full example of how to load the hosted Arkose Bot Manager iframe in lightbox mode.

Before implementation, please reach out to your CSM, as you will need to set up any required public keys to use a hosted iframe template with lightbox mode enabled.

Once setup the customer can then use the hosted iframe url that we provide to them in their implementation.

## Example Implementation

This example shows an event listener added to a button that will open load the hosted Arkose Bot Manager iframe in lightbox mode when clicked.

```html Enforcement
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hosted Iframe Example</title>
    <style>
      #arkoseFrame {
        width: 0px;
        height: 0px;
        display: none;
        border: none;
      }
      #arkoseFrame.open {
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    </style>
    <script>
      document.addEventListener('DOMContentLoaded', function(event) { 
        document.getElementById('openButton').addEventListener('click', () => {
            openArkoseIframe();
          })
      });

      // Function used to trigger the Arkose Enforcement Challenge to open
      var openArkoseIframe = function () {
        // Select the required Arkose hosted iframe
        var iframe = document.getElementById('arkoseFrame');
        // The message object to send to the hosted iframe when we want the challenge to open
        // Replace <YOUR_PUBLIC_KEY> with the public key that has been setup for your account
        var message = {
          publicKey: '<YOUR_PUBLIC_KEY>',
          eventId: 'challenge-open',
        }
        // Sends the message to the hosted iframe
        iframe.contentWindow.postMessage(JSON.stringify(message), '*');
      }

      window.addEventListener('message', function(event) {
        if (!event.data || typeof event.data === 'object') return;
        var json_parsed_event = JSON.parse(event.data);
        var arkoseIframe = document.getElementById('arkoseFrame');

        switch (json_parsed_event.eventId) {
          case 'challenge-loaded':
            document.getElementById('openButton').removeAttribute('disabled');
            break;
          case "challenge-suppressed":
            break;
          case 'challenge-complete':
            console.log(json_parsed_event.payload.sessionToken);
            break;
          case 'challenge-show':
            // Add classname to the iframe to make the iframe lightbox visible
            arkoseIframe.classList.add('open');
            break;
          case "challenge-shown":
            break;
          case 'challenge-hide':
            // Remove classname from the iframe to hide the iframe again
            arkoseIframe.classList.remove('open');
            break;
        }
      });
    </script>
  </head>
  <body>
    <!-- Replace <YOUR_PUBLIC_KEY> with the public key that has been setup for your account -->
    <iframe id="arkoseFrame" src="https://iframe.arkoselabs.com/<YOUR_PUBLIC_KEY>/lightbox.html"></iframe>
    <button id="openButton" disabled>Open Lightbox</button>
  </body>
</html>

```

```html Detection
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Identity Page</title>
    <style>
        iframe {
            width: 0px;
            height: 0px;
            border: 0 !important;
            overflow-y: hidden;
        }
    </style>
    <script>
        window.addEventListener("message", function (event) {
            try {
              var json_parsed_event = JSON.parse(event.data)
  
              switch (json_parsed_event.eventId) {
                  case "challenge-loaded":
                      document.getElementById("arkoseFrame").style.height = json_parsed_event.payload.frameHeight;
                      document.getElementById("arkoseFrame").style.width = json_parsed_event.payload.frameWidth;
                      break;
                  case "challenge-suppressed":
                      break;
                  case "challenge-complete":
                      alert(json_parsed_event.payload.sessionToken)
                      break;
              }
            } catch (e) {
              // Ignore errors on JSON parsing message events that aren't specific to Arkose Labs
            }
        });
    </script>
</head>

<body>
    <!-- Replace <YOUR_PUBLIC_KEY> with the public key that has been setup for your account -->
    <iframe id="arkoseFrame" src="https://iframe.arkoselabs.com/<YOUR_PUBLIC_KEY>/index.html">
    </iframe>
</body>

</html>
```

### CSS Required

For lightbox mode to work, you need to either add CSS or dynamically update style properties on the hosted iframe DOM element.

The default CSS for the iframe should hide the iframe completely, in our example above we are setting both the `height` and `width` to `0` and `display` to `none` to ensure the iframe is not visible unless lightbox mode is activated.

With this we have a CSS class setup that is appended to the iframe when we want to trigger lightbox mode. This class sets the `height` and `width` of the iframe to `100%`, makes the iframe visible, and positions the iframe on top of the current page. These styles are required to make lightbox mode work correctly.

***

## Inline Mode

<Callout icon="🚧" theme="warn">
  Inline mode for our Enforcement Challenge is not a recommended integration approach as it is not a standard integration but there are use cases that may be applicable to you.
</Callout>

The code below shows a full example of how to load the hosted Arkose Bot Manager iframe.

```html
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Identity Page</title>
    <style>
        iframe {
            width: 0px;
            height: 0px;
            border: 0 !important;
            overflow-y: hidden;
        }
    </style>
    <script>
        window.addEventListener("message", function (event) {
            try {
              var json_parsed_event = JSON.parse(event.data)
  
              switch (json_parsed_event.eventId) {
                  case "challenge-loaded":
                      document.getElementById("arkoseFrame").style.height = json_parsed_event.payload.frameHeight;
                      document.getElementById("arkoseFrame").style.width = json_parsed_event.payload.frameWidth;
                      break;
                  case "challenge-suppressed":
                      break;
                  case "challenge-complete":
                      alert(json_parsed_event.payload.sessionToken)
                      break;
                  case "challenge-shown":
                      console.log("Challenge Shown");
                      console.log(json_parsed_event.payload);
                      break;
                  case "challenge-iframeSize":
                      document.getElementById("arkoseFrame").style.height = json_parsed_event.payload.frameHeight;
                      document.getElementById("arkoseFrame").style.width = json_parsed_event.payload.frameWidth;
                      break;
              }
            } catch (error) {
              // Ignore errors on JSON parsing message events that aren't specific to Arkose Labs
            }
        });
    </script>
</head>

<body>
    <!-- Replace <YOUR_PUBLIC_KEY> with the public key that has been setup for your account -->
    <iframe id="arkoseFrame" src="https://iframe.arkoselabs.com/<YOUR_PUBLIC_KEY>/index.html">
    </iframe>
</body>

</html>
```

***

# Iframe Events Schema

The message object comes through the `postMessage` as a string and needs to be JSON parsed beforehand. It has the following top-level structure:

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Field
      </th>

      <th>
        Type
      </th>

      <th>
        Required
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `eventId`
      </td>

      <td>
        String
      </td>

      <td>
        Yes
      </td>

      <td>
        Unique identifier for the event type.
      </td>
    </tr>

    <tr>
      <td>
        `publicKey`
      </td>

      <td>
        String
      </td>

      <td>
        No
      </td>

      <td>
        Public key used by the hosted iframe.

        This field is only omitted when `eventId` is `challenge-error` and `payload.error` is `SRI_ERROR` or `SCRIPT_ERROR`.
      </td>
    </tr>

    <tr>
      <td>
        `payload`
      </td>

      <td>
        Object
      </td>

      <td>
        Yes
      </td>

      <td>
        Event-specific data payload.
      </td>
    </tr>
  </tbody>
</Table>

### Example Message Structure

```javascript
{
  "eventId": "challenge-complete",
  "publicKey": "<YOUR_PUBLIC_KEY>",
  "payload": {
    // Event-specific payload data
  }
}
```

## Iframe Event Types

The iframe events are listed below. Please note the appropriate name and description depends on whether you are using our enforcement or detection components.

| Event                  | Type  | Description (Enforcement)                                                                                      | Description (Detection)                             |
| :--------------------- | :---- | :------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| `challenge-loaded`     | event | Challenge has finished loading.                                                                                | Detection has finished loading.                     |
| `challenge-suppressed` | event | Challenge will not be presented to the user (Good User Case).                                                  | Detection is running and analyzing the user intent. |
| `challenge-complete`   | event | Challenge solved / user is validated as good.                                                                  | Detection is complete.                              |
| `challenge-shown`      | event | Challenge is presented to the user.                                                                            | Not applicable.                                     |
| `challenge-iframeSize` | event | Height and Width of the content within the iframe (For Dynamic Styling).                                       | Not applicable.                                     |
| `challenge-failed`     | event | When a challenge is failed more than a configured number of tries. Defaults to no limit value for the trigger. | Not applicable.                                     |
| `challenge-error`      | event | Challenge has encountered an error.                                                                            | Detection or Challenge has encountered an error.    |
| `challenge-warning`    | event | Challenge has encountered a warning.                                                                           | Detection or Challenge has encountered a warning.   |
| `challenge-show`       | event | Before Challenge is presented to the user, only applicable in lightbox mode.                                   | Not applicable.                                     |
| `challenge-hide`       | event | After Challenge has been closed or hidden, only applicable in lightbox mode.                                   | After Detection is completed.                       |

## Iframe Payload Schema

The structure of the `payload` object varies depending on the `eventId` value.

<Table align={["left","left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Event Id
      </th>

      <th>
        Payload Field
      </th>

      <th>
        Type
      </th>

      <th>
        Required
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `challenge-complete`
      </td>

      <td>
        sessionToken
      </td>

      <td>
        String
      </td>

      <td>
        Yes
      </td>

      <td>
        Arkose session token.
      </td>
    </tr>

    <tr>
      <td>
        `challenge-error`
      </td>

      <td>
        error
      </td>

      <td>
        String | Object
      </td>

      <td>
        Yes
      </td>

      <td>
        For errors related to Arkose Script loading in the hosted iframe (including load failures and SRI validation failures, if applicable), the `error` field will be an error code string with the value `SCRIPT_ERROR` or `SRI_ERROR`.\
        For all other errors, it will be an object containing detailed error information (see next six entries).
      </td>
    </tr>

    <tr>
      <td />

      <td>
        error.error
      </td>

      <td>
        String
      </td>

      <td>
        Yes
      </td>

      <td>
        An error code string representing the error that occurred at any point in a session when an internal Arkose API error occurs.
      </td>
    </tr>

    <tr>
      <td />

      <td>
        error.source
      </td>

      <td>
        String
      </td>

      <td>
        No
      </td>

      <td>
        The source of the error.
      </td>
    </tr>

    <tr>
      <td />

      <td>
        error.status
      </td>

      <td>
        Number
      </td>

      <td>
        No
      </td>

      <td>
        The status code of the error.
      </td>
    </tr>

    <tr>
      <td />

      <td>
        error.requestId
      </td>

      <td>
        String
      </td>

      <td>
        No
      </td>

      <td>
        A unique identifier of the session setup request.
      </td>
    </tr>

    <tr>
      <td />

      <td>
        error.name
      </td>

      <td>
        String
      </td>

      <td>
        No
      </td>

      <td>
        The name of the error.
      </td>
    </tr>

    <tr>
      <td />

      <td>
        error.msg
      </td>

      <td>
        String
      </td>

      <td>
        No
      </td>

      <td>
        The error message.
      </td>
    </tr>

    <tr>
      <td>
        `challenge-failed`
      </td>

      <td>
        sessionToken
      </td>

      <td>
        String
      </td>

      <td>
        Yes
      </td>

      <td>
        Arkose session token.
      </td>
    </tr>

    <tr>
      <td>
        `challenge-hide`
      </td>

      <td>
        sessionToken
      </td>

      <td>
        Null
      </td>

      <td>
        Yes
      </td>

      <td>
        \-
      </td>
    </tr>

    <tr>
      <td>
        `challenge-loaded`
      </td>

      <td>
        sessionToken
      </td>

      <td>
        Null
      </td>

      <td>
        Yes
      </td>

      <td>
        \-
      </td>
    </tr>

    <tr>
      <td>
        `challenge-iframeSize`
      </td>

      <td>
        frameHeight
      </td>

      <td>
        Number
      </td>

      <td>
        Yes
      </td>

      <td>
        The height of the challenge frame in pixels.
      </td>
    </tr>

    <tr>
      <td />

      <td>
        frameWidth
      </td>

      <td>
        Number
      </td>

      <td>
        Yes
      </td>

      <td>
        The width of the challenge frame in pixels.
      </td>
    </tr>

    <tr>
      <td>
        `challenge-show`
      </td>

      <td>
        Nil
      </td>

      <td>
        N/A
      </td>

      <td>
        N/A
      </td>

      <td>
        An empty object.
      </td>
    </tr>

    <tr>
      <td>
        `challenge-shown`
      </td>

      <td>
        sessionToken
      </td>

      <td>
        String | Null
      </td>

      <td>
        Yes
      </td>

      <td>
        Arkose session token.\
        The value is `null` only when the hosted iframe is in lightbox mode or used by Microsoft controller.
      </td>
    </tr>

    <tr>
      <td>
        `challenge-suppressed`
      </td>

      <td>
        sessionToken
      </td>

      <td>
        String
      </td>

      <td>
        Yes
      </td>

      <td>
        Arkose session token.
      </td>
    </tr>

    <tr>
      <td>
        `challenge-warning`
      </td>

      <td>
        warning
      </td>

      <td>
        Object
      </td>

      <td>
        Yes
      </td>

      <td>
        An object containing information about the warning.
      </td>
    </tr>

    <tr>
      <td />

      <td>
        warning.error
      </td>

      <td>
        String
      </td>

      <td>
        Yes
      </td>

      <td>
        A string representing the warning sent from the challenge.
      </td>
    </tr>

    <tr>
      <td />

      <td>
        warning.source
      </td>

      <td>
        String
      </td>

      <td>
        No
      </td>

      <td>
        The source of the warning.
      </td>
    </tr>
  </tbody>
</Table>

<br />

# URL Reference

This is a breakdown of the URL which needs to be loaded in the iframe:

* **Domain**: [https://iframe.arkoselabs.com](https://iframe.arkoselabs.com)
* **Path Options**:
  * **public key**: In the examples above this is placeholder \<YOUR\_PUBLIC\_KEY>. Replace this with the public key Arkose Labs gives you.
* **URL Params**:
  * **mkt**: This is the parameter for passing in a language code. For a list of our supported language codes see [Supported Languages](https://developer.arkoselabs.com/docs/supported-languages-1).

<Callout icon="📘" theme="info">
  Please note that Arkose Labs can host the iframe for merchants.
</Callout>

# Hosting your Own iframe

Although Arkose Labs generally hosts customer iframes, customers may choose to host their own iframe.

## Creating the Iframe Page and Domain

When using this solution:

* A separate domain must be set up.
* A page with the Arkose Bot Manager code must be hosted from it.

## Creating the Domain

Create and host the domain using your standard process. An example domain name is  `<https://iframe.arkoselabs.com`>.

## Creating the Hosted Page

The following is example code that could be used to load the Arkose Bot Manager iframe. Please see our [Client-Side Instructions](https://developer.arkoselabs.com/docs/standard-setup) for more information on the Arkose Bot Manager implementation. Please select the code view for either our enforcement and detection components, depending on which one you are using.

<Callout icon="📘" theme="info">
  Please note that some accessibility tools (e.g. Windows narrator) will use the words in the `title` section as spoken text for this iframe. Update the title to comply with your branding strategy.
</Callout>

```html Enforcement
<html>

<head>
    <meta charset="utf-8">
    <title>Authentication</title>
    <script>

        function getAllUrlParams(url) {
            // get query string from url (optional) or window
            var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

            // we'll store the parameters here
            var obj = {};

            // if query string exists
            if (queryString) {

                // stuff after # is not part of query string, so get rid of it
                queryString = queryString.split('#')[0];

                // split our query string into its component parts
                var arr = queryString.split('&');

                for (var i = 0; i < arr.length; i++) {
                    // separate the keys and the values
                    var a = arr[i].split('=');

                    // set parameter name and value (use 'true' if empty)
                    var paramName = a[0];
                    var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

                    // (optional) keep case consistent
                    paramName = paramName.toLowerCase();
                    if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

                    // if the paramName ends with square brackets, e.g. colors[] or colors[2]
                    if (paramName.match(/\[(\d+)?\]$/)) {

                        // create key if it doesn't exist
                        var key = paramName.replace(/\[(\d+)?\]/, '');
                        if (!obj[key]) obj[key] = [];

                        // if it's an indexed array e.g. colors[2]
                        if (paramName.match(/\[\d+\]$/)) {
                            // get the index value and add the entry at the appropriate position
                            var index = /\[(\d+)\]/.exec(paramName)[1];
                            obj[key][index] = paramValue;
                        } else {
                            // otherwise add the value to the end of the array
                            obj[key].push(paramValue);
                        }
                    } else {
                        // we're dealing with a string
                        if (!obj[paramName]) {
                            // if it doesn't exist, create property
                            obj[paramName] = paramValue;
                        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                            // if property does exist and it's a string, convert it to an array
                            obj[paramName] = [obj[paramName]];
                            obj[paramName].push(paramValue);
                        } else {
                            // otherwise add the property
                            obj[paramName].push(paramValue);
                        }
                    }
                }
            }
            return obj;
        }

        // Setup Arkose Script
        var pathArray = window.location.pathname.split('/')

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//client-api.arkoselabs.com/v2/' + pathArray[1] + '/api.js'
        script.setAttribute('data-callback', 'setupEnforcement');

        document.getElementsByTagName('head')[0].appendChild(script);

        // Let this function run on a set interval. It will review the Arkose Content that loads and send the page sizing for the iframe to the parent
        var interval = setInterval(function () {
            frameHeight = document.getElementById("fc-iframe-wrap").offsetHeight;
            frameWidth = document.getElementById("fc-iframe-wrap").offsetWidth;
            parent.postMessage(JSON.stringify({
                eventId: "challenge-iframeSize",
                payload: {
                    frameHeight: frameHeight,
                    frameWidth: frameWidth
                }
            }), "*")
        }, 3000);

        function setupEnforcement(myEnforcement) {
            var params = getAllUrlParams(window.location.href);

            myEnforcement.setConfig({
                selector: '#arkose',
                styleTheme: params.theme,
                language: params.mkt,
                mode: 'inline',
                onCompleted: function (response) {
                    parent.postMessage(JSON.stringify({
                        eventId: "challenge-complete",
                        payload: {
                            sessionToken: response.token
                        }
                    }), "*")
                },
                onReady: function (response) {
                    parent.postMessage(JSON.stringify({
                        eventId: "challenge-loaded",
                    }), "*")
                },
                onSuppress: function (response) {
                    parent.postMessage(JSON.stringify({
                        eventId: "challenge-suppressed",
                    }), "*")
                },
                onShown: function (response) {
                    parent.postMessage(JSON.stringify({
                        eventId: "challenge-shown",
                    }), "*");
                },
                onFailed: function (response) {
                    parent.postMessage(JSON.stringify({
                        eventId: "challenge-failed",
                        payload: {
                            sessionToken: response.token
                        }
                    }), "*");
                },
                onError: function (response) {
                    parent.postMessage(JSON.stringify({
                        eventId: "challenge-error",
                        payload: {
                            error: response.error
                        }
                    }), "*");
                },
                onResize: function (response) {
                  var defaultHeight = 450;
                  var defaultWidth = 400;
                  var height = response && response.height ? response.height : defaultHeight;
                  var width = response && response.width ? response.width : defaultWidth;
                  try {
                    if (typeof height === 'string') {
                      height = height.replace('px', '');
                      height = parseInt(height, 10);
                      if (isNaN(height)) {
                        height = defaultHeight;
                      }
                    }
                    if (typeof width === 'string') {
                      width = width.replace('px', '');
                      width = parseInt(width, 10);
                      if (isNaN(width)) {
                        width = defaultWidth;
                      }
                    }
                  } catch (e) {
                    height = defaultHeight;
                    width = defaultWidth;
                  }
                    parent.postMessage(JSON.stringify({
                      eventId: "challenge-iframeSize",
                      payload: {
                        frameHeight: height,
                        frameWidth: width
                      }
                    }), "*")
                }
            });
        }

    </script>
</head>

<body style="margin: 0px">
    <div id="arkose">
    </div>
</body>

</html>

```

```html Detection
<html>

<head>
    <meta charset="utf-8">
    <title>Authentication</title>
    <script>

        function getAllUrlParams(url) {
            // get query string from url (optional) or window
            var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

            // we'll store the parameters here
            var obj = {};

            // if query string exists
            if (queryString) {

                // stuff after # is not part of query string, so get rid of it
                queryString = queryString.split('#')[0];

                // split our query string into its component parts
                var arr = queryString.split('&');

                for (var i = 0; i < arr.length; i++) {
                    // separate the keys and the values
                    var a = arr[i].split('=');

                    // set parameter name and value (use 'true' if empty)
                    var paramName = a[0];
                    var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

                    // (optional) keep case consistent
                    paramName = paramName.toLowerCase();
                    if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

                    // if the paramName ends with square brackets, e.g. colors[] or colors[2]
                    if (paramName.match(/\[(\d+)?\]$/)) {

                        // create key if it doesn't exist
                        var key = paramName.replace(/\[(\d+)?\]/, '');
                        if (!obj[key]) obj[key] = [];

                        // if it's an indexed array e.g. colors[2]
                        if (paramName.match(/\[\d+\]$/)) {
                            // get the index value and add the entry at the appropriate position
                            var index = /\[(\d+)\]/.exec(paramName)[1];
                            obj[key][index] = paramValue;
                        } else {
                            // otherwise add the value to the end of the array
                            obj[key].push(paramValue);
                        }
                    } else {
                        // we're dealing with a string
                        if (!obj[paramName]) {
                            // if it doesn't exist, create property
                            obj[paramName] = paramValue;
                        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                            // if property does exist and it's a string, convert it to an array
                            obj[paramName] = [obj[paramName]];
                            obj[paramName].push(paramValue);
                        } else {
                            // otherwise add the property
                            obj[paramName].push(paramValue);
                        }
                    }
                }
            }
            return obj;
        }

        // Setup Arkose Script
        var pathArray = window.location.pathname.split('/')

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//client-api.arkoselabs.com/v2/' + pathArray[1] + '/api.js'
        script.setAttribute('data-callback', 'setupDetect');

        document.getElementsByTagName('head')[0].appendChild(script);

        function setupDetect(myDetect) {
            var params = getAllUrlParams(window.location.href);

            myDetect.setConfig({
                selector: '#arkose',
                styleTheme: params.theme,
                language: params.mkt,
                mode: 'inline',
                onCompleted: function (response) {
                    parent.postMessage(JSON.stringify({
                        eventId: "challenge-complete",
                        payload: {
                            sessionToken: response.token
                        }
                    }), "*")
                },
                onReady: function (response) {
                    parent.postMessage(JSON.stringify({
                        eventId: "challenge-loaded",
                    }), "*")
                },
                onSuppress: function (response) {
                    parent.postMessage(JSON.stringify({
                        eventId: "challenge-suppressed",
                    }), "*")
                },
                onError: function (response) {
                    parent.postMessage(JSON.stringify({
                        eventId: "challenge-error",
                        payload: {
                            error: response.error
                        }
                    }), "*");
                }
            });
        }

    </script>
</head>

<body style="margin: 0px">
    <div id="arkose">
    </div>
</body>

</html>
```

Please note the following regarding the above sample code:

`getAllUrlParams`  - A reference function for parsing url parameters if you need to pass any important information through the iframe. An example of important information is language code. See the [URL reference section](#url-reference) later in this page for more information about URL parameters.

`parent.postMessage` - Pass event data back to the parent domain. For example, passing back the session token to submit to the server-side.

`challenge-iframeSize` - Not applicable for detection component. This runs on an interval for dynamic resizing of the iframe on the parent element. This data can also be parsed and passed through as part of the Arkose Bot Manager loaded event.

## Important Styling

There are a couple styles that will need to be added in order to make the challenge fully accessible and responsive to zooms/smaller screens when the implementation shows the challenge in a Modal fashion. The following code snippet displays the required styles/setup.

```html
<div class="arkose-modal-wrapper" style="display: flex; flex-direction: column;">
  <div class="arkose-iframe-holder" style="overflow: auto;">
    <iframe title="Arkose Challenge" src="{{hosted iframe url}}">
  </div>
</div>
```

The parent wrapper, `arkose-modal-wrapper`, will need to have `display: flex` and `flex-direction: column `applied to allow the child div to grow within. To `arkose-iframe-holder`, `overflow: auto` is needed to allow for scrolling.

## Accessibility

Due to the nature of iframes, the out of the box accessibility of Arkose’s Challenge can be impacted. This is because iframes cannot hi-jack the focus of the parent page. It is recommended that focus is manually set on the `Challenge Loaded` event. Example code:

```javascript
<script>
  window.addEventListener('message', function(event) {
    var eventData = JSON.parse(event.data);
    
    if (eventData.eventId === 'challenge-loaded') {
      var iframe = document.getElementById('arkoseFrame');
      if(iframe) iframe.focus();
    }
  })
</script>
<body>
  <iframe src="https://iframe.arkoselabs.com/<YOUR_PUBLIC_KEY>/index.html" id="arkoseFrame"></iframe>
</body>
```

<br />