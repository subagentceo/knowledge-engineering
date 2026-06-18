# TaskRouter.js v1 TaskQueue: Managing a TaskQueue resource in the browser

> \[!NOTE]
>
> The following documentation is for the [JS SDK V1](https://sdk.twilio.com/js/taskrouter/releases/1.23.0/taskrouter.js). If you're working with the Twilio Flex SDK, head over to [the TaskRouter.js documentation on Github](https://twilio.github.io/twilio-taskrouter.js/index.html).

The SDK allows developers to interact with the entire TaskRouter REST API by a simple JS API.

## Adding the SDK to your application

Include the TaskRouter JS SDK in your JavaScript application as follows:

```html
<script src="https://sdk.twilio.com/js/taskrouter/v1.21/taskrouter.min.js" integrity="sha384-5fq+0qjayReAreRyHy38VpD3Gr9R2OYIzonwIkoGI4M9dhfKW6RWeRnZjfwSrpN8" crossorigin="anonymous"></script>
```

### Creating a TaskRouter TaskQueue capability token \[#capability-token]

TaskRouter uses Twilio capability tokens to delegate scoped access to TaskRouter resources to your JavaScript application.
Twilio capability tokens conform to the JSON Web Token (commonly referred to as a JWT and pronounced "jot") standard, which allow for limited-time use of credentials by a third party.
Your web server needs to generate a Twilio capability token and provide it to your JavaScript application in order to register a TaskRouter TaskQueue.

We provide three relevant helper methods to provide access capabilities:

| Capability             | Authorization                                      |
| ---------------------- | -------------------------------------------------- |
| AllowFetchSubresources | A TaskQueue can fetch any subresource (statistics) |
| AllowUpdates           | A TaskQueue can update its properties              |
| AllowDelete            | A TaskQueue can delete itself                      |

Additionally, you can utilize more granular access to particular resources beyond these capabilities. These can viewed under [Constructing JWTs](/docs/taskrouter/js-sdk-v1/workspace/constructing-jwts).

You can generate a TaskRouter capability token using any of Twilio's SDKs. You'll need to provide your Twilio AccountSid and AuthToken, the WorkspaceSid the TaskQueue belongs to and the TaskQueueSid you would like to register. For example, using our PHP SDK you can create a token and add capabilities as follows:

Creating a TaskRouter TaskQueue capability token

```js
// Download the Node helper library from twilio.com/docs/node/install
// These consts are your accountSid and authToken from https://www.twilio.com/console
const taskrouter = require('twilio').jwt.taskrouter;

const TaskRouterCapability = taskrouter.TaskRouterCapability;
const Policy = TaskRouterCapability.Policy;

// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const workspaceSid = 'WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const taskqueueSid = 'WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

const TASKROUTER_BASE_URL = 'https://taskrouter.twilio.com';
const version = 'v1';

// By default, tokens are good for one hour.
// Override this default timeout by specifiying a new value (in seconds).
// For example, to generate a token good for 8 hours:
const ttl = 28800; // 60 * 60 * 8

const capability = new TaskRouterCapability({
  accountSid: accountSid,
  authToken: authToken,
  workspaceSid: workspaceSid,
  channelId: taskqueueSid,
  ttl: ttl,
});

// Helper function to create Policy
function buildWorkspacePolicy(options) {
  options = options || {};
  const resources = options.resources || [];
  const urlComponents = [
    TASKROUTER_BASE_URL,
    version,
    'Workspaces',
    workspaceSid,
  ];

  return new Policy({
    url: urlComponents.concat(resources).join('/'),
    method: options.method || 'GET',
    allow: true,
  });
}

const allowFetchSubresources = buildWorkspacePolicy({
  resources: ['TaskQueue', taskqueueSid, '**'],
});
const allowUpdates = buildWorkspacePolicy({
  resources: ['TaskQueue', taskqueueSid],
  method: 'POST',
});

capability.addPolicy(allowFetchSubresources);
capability.addPolicy(allowUpdates);

const token = capability.toJwt();
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.jwt.taskrouter.capabilities import TaskQueueCapabilityToken

# Your Account Sid and Auth Token from twilio.com/user/account
# To set up environmental variables, see http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
workspace_sid = "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
task_queue_sid = "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

capability = TaskQueueCapabilityToken(
    account_sid=account_sid,
    auth_token=auth_token,
    workspace_sid=workspace_sid,
    task_queue_sid=task_queue_sid
)
capability.allow_fetch_subresources()
capability.allow_update_subresources()
token = capability.to_jwt()

# By default, tokens are good for one hour.
# Override this default timeout by specifiying a new value (in seconds).
# For example, to generate a token good for 8 hours:

# 60 * 60 * 8 = 28800
token = capability.to_jwt(ttl=28800)

print(token)
```

```cs
// Download the twilio-csharp library from
// https://www.twilio.com/docs/libraries/csharp#installation
using System;
using System.Collections.Generic;
using Twilio.Http;
using Twilio.Jwt.Taskrouter;

class Example
{
    static void Main(string[] args)
    {
        // Find your Account Sid and Auth Token at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        const string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");
        const string workspaceSid = "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
        const string taskQueueSid = "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

        var urls = new PolicyUrlUtils(workspaceSid, taskQueueSid);

        var allowFetchSubresources = new Policy($"{urls.TaskQueue}/**",
                                                HttpMethod.Get);

        var allowUpdates = new Policy(urls.TaskQueue, HttpMethod.Post);

        var policies = new List<Policy>
        {
            allowFetchSubresources,
            allowUpdates
        };

        // By default, tokens are good for one hour.
        // Override this default timeout by specifiying a new value (in seconds).
        // For example, to generate a token good for 8 hours:
        var capability = new TaskRouterCapability(
            accountSid,
            authToken,
            workspaceSid,
            taskQueueSid,
            policies: policies,
            expiration: DateTime.UtcNow.AddSeconds(28800) // 60 * 60 * 8
            );

        Console.WriteLine(capability.ToJwt());
    }
}


class PolicyUrlUtils
{
    const string taskRouterBaseUrl = "https://taskrouter.twilio.com";
    const string taskRouterVersion = "v1";

    readonly string _workspaceSid;
    readonly string _taskQueueSid;

    public PolicyUrlUtils(string workspaceSid, string taskQueueSid)
    {
        _workspaceSid = workspaceSid;
        _taskQueueSid = taskQueueSid;
    }

    public string TaskQueue => $"{Workspace}/TaskQueues/{_taskQueueSid}";

    string Workspace =>
        $"{taskRouterBaseUrl}/{taskRouterVersion}/Workspaces/{_workspaceSid}";
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import java.util.List;
import java.util.Arrays;

import com.twilio.http.HttpMethod;
import com.twilio.jwt.taskrouter.Policy;
import com.twilio.jwt.taskrouter.TaskRouterCapability;
import com.twilio.jwt.taskrouter.UrlUtils;

public class Example {
  // Get your Account SID and Auth Token from https://twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  private static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  private static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");
  private static final String WORKSPACE_SID = "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  private static final String TASKQUEUE_SID = "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

  public static void main(String[] args) {
    Policy allowFetchSubresources = new Policy.Builder()
        .url(UrlUtils.taskQueue(WORKSPACE_SID, TASKQUEUE_SID) + "/**")
        .build();

    Policy allowUpdates = new Policy.Builder()
        .url(UrlUtils.taskQueue(WORKSPACE_SID, TASKQUEUE_SID))
        .method(HttpMethod.POST)
        .build();

    List<Policy> policies = Arrays.asList(allowFetchSubresources, allowUpdates);

    TaskRouterCapability.Builder capabilityBuilder =
        new TaskRouterCapability.Builder(ACCOUNT_SID, AUTH_TOKEN, WORKSPACE_SID, TASKQUEUE_SID)
            .policies(policies);

    String token = capabilityBuilder.build().toJwt();

    System.out.println(token);

    // By default, tokens are good for one hour.
    // Override this default timeout by specifiying a new value (in seconds).
    // For example, to generate a token good for 8 hours:
    token = capabilityBuilder.ttl(28800).build().toJwt();

    System.out.println(token);
  }
}
```

```php
<?php
// Get the PHP helper library from https://twilio.com/docs/libraries/php
require_once '/path/to/vendor/autoload.php'; // Loads the library
use Twilio\Jwt\TaskRouter\TaskQueueCapability;

// Your Account Sid and Auth Token from twilio.com/user/account
// To set up environmental variables, see http://twil.io/secure
$accountSid = getenv('TWILIO_ACCOUNT_SID');
$authToken = getenv('TWILIO_AUTH_TOKEN');
$workspaceSid = "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
$taskQueueSid = "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

$capability = new TaskQueueCapability($accountSid, $authToken, $workspaceSid, $taskQueueSid);
$capability->allowFetchSubresources();
$capability->allowUpdates();
$token = $capability->generateToken();
// By default, tokens are good for one hour.
// Override this default timeout by specifiying a new value (in seconds).
// For example, to generate a token good for 8 hours:
$workerToken = $capability->generateToken(28800);  // 60 * 60 * 8
```

```rb
# Get twilio-ruby from twilio.com/docs/ruby/install
require 'twilio-ruby'

# Get your Account SID and Auth Token from twilio.com/console
# To set up environmental variables, see http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
workspace_sid = 'WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
taskqueue_sid = 'WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

capability = Twilio::JWT::TaskRouterCapability.new(
 (account_sid, auth_token),
  workspace_sid, taskqueue_sid
)

allow_fetch_subresources = Twilio::JWT::TaskRouterCapability::Policy.new(
  Twilio::JWT::TaskRouterCapability::TaskRouterUtils
  .all_task_queues(workspace_sid), 'GET', true
)
capability.add_policy(allow_fetch_subresources)

allow_updates = Twilio::JWT::TaskRouterCapability::Policy.new(
  Twilio::JWT::TaskRouterCapability::TaskRouterUtils
  .all_task_queues(workspace_sid), 'POST', true
)
capability.add_policy(allow_updates)

puts capability.to_s
```

Once you have generated a TaskRouter capability token, you can pass this to your front-end web application and initialize the JavaScript library as follows:

```javascript
var taskQueue = new Twilio.TaskRouter.TaskQueue(TASKQUEUE_TOKEN);
```

The library will raise a 'ready' event once it has connected to TaskRouter:

```javascript
taskQueue.on("ready", function(taskQueue) {
  console.log(taskQueue.sid)                // 'WQxxx'
  console.log(taskQueue.friendlyName)       // 'Simple FIFO Queue'
  console.log(taskQueue.targetWorkers)      // '1==1'
  console.log(taskQueue.maxReservedWorkers) // 20
});
```

See more about the methods and events exposed on this object below.

## TaskQueue API

TaskRouter.js TaskQueue exposes the following API:

* [Twilio.TaskRouter.TaskQueue](#taskroutertaskqueue)
  * [new Twilio.TaskRouter.TaskQueue()](#new-taskroutertaskqueue)
  * [Methods](#taskqueue-methods)
    * [update()](#update)
    * [delete()](#delete)
    * [updateToken()](#updatetoken)
    * [statistics](#statistics)
    * [cumulative statistics](#cumulativestatistics)
    * [real time statistics](#realtimestatistics)
    * [on()](#taskqueue-on)
  * [Events](#taskqueue-events)
    * [ready](#ready)
    * [connected](#connected)
    * [disconnected](#disconnected)
    * [token.expired](#token-expired)

## Twilio.TaskRouter.TaskQueue \[#taskroutertaskqueue]

Twilio.TaskRouter.TaskQueue is the top-level class you'll use for managing a TaskQueue.

### new Twilio.TaskRouter.TaskQueue(taskQueueToken) \[#new-taskroutertaskqueue]

Register a new Twilio.TaskRouter.TaskQueue with the capabilities provided in `taskQueueToken`.

#### Parameters

| Name           | Type    | Description                                                                                                                 |
| -------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| taskQueueToken | String  | A Twilio TaskRouter capability token. See [Creating a TaskRouter capability token](#capability-token) for more information. |
| debug          | Boolean | (optional) Whether or not the JS SDK will print event messages to the console. Defaults to true.                            |
| region         | String  | (optional) A Twilio region for websocket connections (ex. `ie1-ix`).                                                        |
| maxRetries     | Integer | (optional) The maximum of retries to attempt if a websocket request fails. Defaults to 0.                                   |

#### Sample usage

```javascript
var taskQueue = new Twilio.TaskRouter.TaskQueue(TASKQUEUE_TOKEN);
```

Turning off debugging:

```javascript
var taskQueue = new Twilio.TaskRouter.TaskQueue(TASKQUEUE_TOKEN, false);
```

### Methods \[#taskqueue-methods]

#### update(\[args...], \[resultCallback]) \[#update]

Updates a single or list of properties on a TaskQueue.

#### Parameters \[#parameters-2]

| Name           | Type           | Description                                                                                                                                                                                                                                                                                   |
| -------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| args...        | String or JSON | A single API parameter and value or a JSON object containing multiple values                                                                                                                                                                                                                  |
| resultCallback | Function       | (optional) A JavaScript Function that will be called with the result of the update. If an error occurs, the first argument passed to this function will be an Error. If the update is successful, the first argument will be null and the second argument will contain the updated TaskQueue. |

##### Single Attribute Example

```javascript
taskQueue.update("MaxReservedWorkers", "20", function(error, taskQueue) {
  if(error) {
    console.log(error.code);
    console.log(error.message);
  } else {
    console.log(taskQueue.maxReservedWorkers); // 20
  }
});
```

##### Multiple Attribute Example

```javascript
var targetWorkers = "languages HAS \"english\"";
var props = {"MaxReservedWorkers", "20", "TargetWorkers":targetWorkers};
taskQueue.update(props, function(error, workspace) {
  if(error) {
    console.log(error.code);
    console.log(error.message);
  } else {
    console.log(taskQueue.maxReservedWorkers); // "20"
    console.log(taskQueue.targetWorkers); // "languages HAS "english""
  }
});
```

#### delete(\[resultCallback]) \[#delete]

Deletes a TaskQueue

#### Parameters \[#parameters-3]

| Name           | Type     | Description                                                                                                                                                                                                                        |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| resultCallback | Function | (optional) A JavaScript Function that will be called with the result of the delete. If an error occurs, the first argument passed to this function will be an Error. If the delete is successful, the first argument will be null. |

#### Example

```javascript
taskQueue.delete(function(error) {
  if(error) {
    console.log(error.code);
    console.log(error.message);
  } else {
    console.log("taskQueue deleted");
  }
});
```

#### updateToken(taskQueueToken) \[#updatetoken]

Updates the TaskRouter capability token for the Workspace.

#### Parameters \[#parameters-4]

| Name           | Type   | Description                          |
| -------------- | ------ | ------------------------------------ |
| taskQueueToken | String | A valid TaskRouter capability token. |

##### Example \[#example-2]

```javascript
var token = refreshJWT(); // your method to retrieve a new capability token
taskQueue.updateToken(token);
```

#### statistics \[#statistics]

Retrieves the object to retrieve the statistics for a TaskQueue.

#### fetch

##### Parameters \[#parameters-5]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                                |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| params   | JSON     | (optional) A JSON object of query parameters                                                                                                                                                                                                                                                                               |
| callback | Function | A function that will be called when the statistics object is returned. If an error occurs when retrieving the list, the first parameter passed to this function will contain the Error object. If the retrieval is successful, the first parameter will be null and the second parameter will contain a statistics object. |

```javascript
var queryParams = {"Minutes":"240"}; // 4 hours
taskQueue.statistics.fetch(
    queryParams,
    function(error, statistics) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("fetched taskQueue statistics: "+JSON.stringify(statistics));
        console.log("avg task acceptance time: "+statistics.cumulative.avgTaskAcceptanceTime;
    }
);
```

#### cumulative statistics \[#cumulativestatistics]

If you only care about the cumulative stats for a TaskQueue for a given time period, you can utilize this instead of the above for a smaller payload and faster response time.

#### fetch \[#fetch-2]

##### Parameters \[#parameters-6]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                                |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| params   | JSON     | (optional) A JSON object of query parameters                                                                                                                                                                                                                                                                               |
| callback | Function | A function that will be called when the statistics object is returned. If an error occurs when retrieving the list, the first parameter passed to this function will contain the Error object. If the retrieval is successful, the first parameter will be null and the second parameter will contain a statistics object. |

```javascript
var queryParams = {"Minutes":"240"}; // 4 hours
taskQueue.cumulativeStats.fetch(
    queryParams,
    function(error, statistics) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("fetched taskQueue statistics: "+JSON.stringify(statistics));
        console.log("avg task acceptance time: "+statistics.avgTaskAcceptanceTime;
    }
);
```

#### real time statistics \[#realtimestatistics]

If you only care about the realtime stats for a TaskQueue for a given time period, you can utilize this instead of the above for a smaller payload and faster response time.

#### fetch \[#fetch-3]

##### Parameters \[#parameters-7]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                                |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| params   | JSON     | (optional) A JSON object of query parameters                                                                                                                                                                                                                                                                               |
| callback | Function | A function that will be called when the statistics object is returned. If an error occurs when retrieving the list, the first parameter passed to this function will contain the Error object. If the retrieval is successful, the first parameter will be null and the second parameter will contain a statistics object. |

```javascript
taskQueue.realtimeStats.fetch(
    function(error, statistics) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("fetched taskQueue statistics: "+JSON.stringify(statistics));
        console.log("total available workers: "+statistics.totalAvailableWorkers;
        console.log("total eligible workers: "+statistics.totalEligibleWorkers;
    }
);
```

#### on(event, callback) \[#taskqueue-on]

Attaches a listener to the specified event. See [Events](#taskqueue-events) for the complete list of supported events.

#### Parameters \[#parameters-8]

| Name     | Type     | Description                                                                               |
| -------- | -------- | ----------------------------------------------------------------------------------------- |
| event    | String   | An event name. See [Events](#taskqueue-events) for the complete list of supported events. |
| callback | Function | A function that will be called when the specified Event is raised.                        |

#### Example \[#example-3]

```javascript
taskQueue.on("ready", function(taskQueue) {
    console.log(taskQueue.friendlyName)      // My TaskQueue
});
```

## Events \[#taskqueue-events]

TaskRouter's JS library currently raises the following events to the registered TaskQueue:

* [ready](#ready)
* [token.expired](#token-expired)

### ready \[#ready]

The TaskQueue has established a connection to TaskRouter and has completed initialization.

#### Parameters \[#parameters-9]

| Name      | Type      | Description            |
| --------- | --------- | ---------------------- |
| taskQueue | TaskQueue | The created TaskQueue. |

#### Example \[#example-4]

```javascript
taskQueue.on("ready", function(taskQueue) {
    console.log(taskQueue.friendlyName)      // My TaskQueue
});
```

### connected \[#connected]

The TaskQueue has established a connection to TaskRouter.

#### Example \[#example-5]

```javascript
taskQueue.on("connected", function() {
    console.log("Websocket has connected");
});
```

### disconnected \[#disconnected]

The TaskQueue has disconnected a connection from TaskRouter.

#### Example \[#example-6]

```javascript
taskQueue.on("disconnected", function() {
    console.log("Websocket has disconnected");
});
```

### token.expired \[#token-expired]

Raised when the TaskRouter capability token used to create this TaskQueue expires.

#### Example \[#example-7]

```javascript
taskQueue.on("token.expired", function() {
    console.log("updating token");
    var token = refreshJWT(); // your method to retrieve a new capability token
    taskQueue.updateToken(token);
});
```
