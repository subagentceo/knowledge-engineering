# How to call Twilio Functions from a Flex plugin

This is a guide on how to securely call a Twilio Function from a Flex Plugin. This tutorial builds off of the Plugin from the [Plugin Development Quickstart](/docs/flex/quickstart/getting-started-plugin).

Flex provides some common SDK endpoints that you can use, but it doesn't make every Twilio API available to you. Fortunately, you can use Twilio Functions to decide exactly which Twilio APIs you need, make requests to them, and return the results to Flex.

This tutorial requires that you have an existing Flex Plugin. You'll write a Twilio Function that gets the cumulative statistics of all workers in a workspace and passes that data to your Flex Plugin.

> \[!WARNING]
>
> Currently, Flex Plugins can only make `application/x-www-form-urlencoded` requests to Twilio Functions. Nested objects are not supported.

## Creating a Twilio Function

First, you'll need to write a Twilio Function. The Function below returns cumulative statistics from a TaskRouter Workspace using the [NodeJS SDK](https://github.com/twilio/twilio-node).

Head over to [Twilio Functions Console](https://www.twilio.com/console/functions/overview/services) page. You can create a new Service, or use an existing Service that you already have. Add a Function, and paste the following code into it:

```javascript
exports.handler = function(context, event, callback) {
  // Add the NodeJS SDK by calling context.getTwilioClient()
  const client = context.getTwilioClient();

  // Create a custom Twilio Response
  // Set the CORS headers to allow Flex to make an HTTP request to the Twilio Function
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Use the NodeJS SDK to make an API call.
  // Note how you are passing the workspace SID using a key from the event parameter.
  client.taskrouter.v1
    .workspaces(event.WorkspaceSid)
    .workers()
    .cumulativeStatistics()
    .fetch()
    .then(data => {
        response.appendHeader('Content-Type', 'application/json');
        response.setBody(data);
        // Return a success response using the callback function.
        callback(null, response);
    })
    .catch(err => {
        response.appendHeader('Content-Type', 'plain/text');
        response.setBody(err.message);
        response.setStatusCode(500);
        // If there's an error, send an error response
        // Keep using the response object for CORS purposes
        callback(null, response);
    });
};

```

Name your Function something meaningful like *Cumulative Report* and give it the URI of */cumulative*. Before saving, make sure the checkbox *Check for valid Twilio signature* is *unchecked*; we'll come back on how to secure your Function later on. Now save your Function and wait for it to deploy.

![Twilio function code for cumulative statistics with Node.js helper library and CORS headers.](https://docs-resources.prod.twilio.com/123e275da61724ec8771ab9fe2ec8ba3f0cf294d0091876c517d318b96ecd940.png)

## Configure and Test Your Function

Visit the [Functions Configuration Page](https://www.twilio.com/console/runtime/functions/configure) and ensure that the *Enable ACCOUNT\_SID and AUTH\_TOKEN* option is *checked*. Enabling this checkbox allows `context.getTwilioClient();` to generate a new Twilio client using your account credentials. Save the page.

Now, try testing your Function. Your domain will be a hyphenated string of random words and numbers and can be found at the top of the Function Editor. You can find your Workspace SID by visiting [TaskRouter Workspaces](https://www.twilio.com/console/taskrouter/workspaces) page.

Visit the Function URL using the browser of your choice. Add the query parameter `?WorkspaceSid=WSxxx` and the browser should make a `GET` request to your Function. For example, visiting

`https://YOUR_DOMAIN.twil.io/cumulative?WorkspaceSid=WSxxx`

should yield:

```javascript
{
  ...
  "activityDurations": [{
    "avg": 900,
    "min": 900,
    "max": 900,
    "friendly_name": "Available",
    "sid": "WAxxx",
    "total": 900
  }, 
  ...
  ]
  "reservationsCreated": 0,
  "reservationsAccepted": 0,
  "reservationsRejected": 0,
  "reservationsTimedOut": 0,
  "reservationsCanceled": 0,
  "reservationsRescinded": 0
  ...
}
```

## Call your Function from a Flex Plugin

To get this data into Flex, you'll need to modify your Plugin code using the [Plugin Builder](https://github.com/twilio/flex-plugin-builder). In your text editor of choice, open the folder that contains your Plugin.

> \[!NOTE]
>
> To learn how to build your first Plugin, see the [Twilio Flex Quickstart (Advanced): Getting Started with React Plugin Development](/docs/flex/quickstart/getting-started-plugin).

Somewhere in your Plugin, you'll need to make a call to your Function. You can use the native [fetch Web API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to make a request to your function.

For our Plugin, we're going to change the `GET` request to a `POST` request. Even though we're ultimately going to retrieve data about our TaskRouter Workspace, the Plugin is invoking a Function, not retrieving the data directly. Given that we might want to send a lot of data at some point, using a `POST` request scales better, as well. Finally, `POST` request bodies are easier to work with than query parameters.

For a Plugin called `YourPlugin`, here's what `YourPlugin.js` might look like:

```javascript
import { FlexPlugin } from 'flex-plugin';
import React from 'react';

const PLUGIN_NAME = 'YourPlugin';

export default class YourPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */

  init(flex, manager) {
    // Describe the body of your request
    const body = { WorkspaceSid: 'WSxxx' };

    // Set up the HTTP options for your request
    const options = {
      method: 'POST',
      body: new URLSearchParams(body),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    };

    // Make the network request using the Fetch API
    fetch('https://YOUR_DOMAIN.twil.io/cumulative', options)
      .then(resp => resp.json())
      .then(data => console.log(data));
  }
}

```

When you run your Plugin, you should see the API response logged to the browser console!

## Securing your Twilio Function

Your Function currently is publicly accessible, so anyone on the internet can invoke it! No need to fear, though: you can secure it by using the [JSON Web Token](https://jwt.io/) (JWT) from your Flex instance and then validating the token inside your Function.

Update the `fetch` code to also include the JWT in the request body:

```javascript
import { FlexPlugin } from 'flex-plugin';
import React from 'react';

const PLUGIN_NAME = 'YourPlugin';

export default class YourPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */

  init(flex, manager) {
    // Add the Token using the Flex manager
    const body = {
      WorkspaceSid: 'WSxxx',
      Token: manager.store.getState().flex.session.ssoTokenPayload.token
    };

    const options = {
      method: 'POST',
      body: new URLSearchParams(body),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    };

    fetch('https://YOUR_DOMAIN.twil.io/cumulative', options)
    .then(resp => resp.json())
    .then(data => console.log(data));
  }
}

```

Note the only thing changed here is the addition of the `Token` key to the `body` parameter.

Now, you can update your Function so that it can verify this token. Visit the [Functions Configuration](https://www.twilio.com/console/runtime/functions/configure) page, and scroll to the bottom of the page. Visit the [twilio-flex-token-validator package](https://www.npmjs.com/package/twilio-flex-token-validator) page on the npm registry to find the current version of the package. Once you know the version, add `twilio-flex-token-validator` and its current version to your `Dependencies`. Save the page.

Return to your cumulative Function and import `functionValidator` from the `twilio-flex-token-validator` module. Then, wrap your Function with it:

```javascript
const TokenValidator = require('twilio-flex-token-validator').functionValidator;

exports.handler = TokenValidator(function(context, event, callback) {
    // Add the NodeJS SDK by calling context.getTwilioClient()
  const client = context.getTwilioClient();

  // Create a custom Twilio Response
  // Set the CORS headers to allow Flex to make an HTTP request to the Twilio Function
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Use the NodeJS SDK to make an API call.
  // Note how you are passing the workspace SID using a key from the event parameter.
  client.taskrouter.v1
    .workspaces(event.WorkspaceSid)
    .workers()
    .cumulativeStatistics()
    .fetch()
    .then(data => {
        response.appendHeader('Content-Type', 'application/json');
        response.setBody(data);
        // Return a success response using the callback function.
        callback(null, response);
    })
    .catch(err => {
        response.appendHeader('Content-Type', 'plain/text');
        response.setBody(err.message);
        response.setStatusCode(500);
        // If there's an error, send an error response
        // Keep using the response object for CORS purposes
        callback(null, response);
    });
});
```

The `TokenValidator` reads the `Token` parameter and validates it. If the token is invalid, the validator will respond with a 403. If the token is valid, then your code will execute.

Congratulations, you now have a secure Function that you can invoke from your Flex Plugin!
