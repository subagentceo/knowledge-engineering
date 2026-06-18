# TaskRouter.js v1 Worker: Managing workers in the browser

> \[!NOTE]
>
> Want to learn how to use TaskRouter.js Worker to route tasks to a web-based application? \[Dive into the [TaskRouter Quickstart](/docs/taskrouter/quickstart).

TaskRouter's JavaScript SDK makes it easy to build web-based applications for the people that will process TaskRouter Tasks. The SDK allows developers to:

* Register an endpoint as a TaskRouter Worker
* Manage the registered Worker's Activity state
* Receive assigned Task & Reservation details
* Accept and Reject Reservations
* Call a given Worker with a Dequeue or Call instruction
* ```bash
   Complete Tasks
  ```

## How does it work?

The TaskRouter JavaScript SDK makes a WebSocket connection to TaskRouter. TaskRouter events and commands such as Task assignment, acceptance, activity changes, are communicated with this Websocket connection.

## Adding the SDK to your application

Include the TaskRouter JS SDK in your JavaScript application as follows:

```html
<script src="https://sdk.twilio.com/js/taskrouter/v1.21/taskrouter.min.js" integrity="sha384-5fq+0qjayReAreRyHy38VpD3Gr9R2OYIzonwIkoGI4M9dhfKW6RWeRnZjfwSrpN8" crossorigin="anonymous"></script>
```

### Creating a TaskRouter Worker capability token \[#capability-token]

TaskRouter uses Twilio capability tokens to delegate scoped access to TaskRouter resources to your JavaScript application.
Twilio capability tokens conform to the JSON Web Token (commonly referred to as a JWT and pronounced "jot") standard, which allow for limited-time use of credentials by a third party.
Your web server needs to generate a Twilio capability token and provide it to your JavaScript application in order to register a TaskRouter worker.

There are two capabilities you can enable today (and in most cases you'll want to use all of them in your application):

| Capability           | Authorization                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `ActivityUpdates`    | A worker can update its current Activity.                                                     |
| `ReservationUpdates` | A worker can accept or reject a reservation as well as provide a dequeue or call instruction. |

You can generate a TaskRouter capability token using any of Twilio's SDKs. You'll need to provide your Twilio `AccountSid` and `AuthToken`, along with the WorkspaceSid and WorkerSid for the Worker you would like to register. For example, using our PHP SDK you can create a token and add capabilities as follows:

Creating a TaskRouter Worker capability token

```js
// Download the Node helper library from twilio.com/docs/node/install
// These consts are your accountSid and authToken from https://www.twilio.com/console
const taskrouter = require('twilio').jwt.taskrouter;
const util = taskrouter.util;

const TaskRouterCapability = taskrouter.TaskRouterCapability;
const Policy = TaskRouterCapability.Policy;

// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const workspaceSid = 'WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const workerSid = 'WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

const TASKROUTER_BASE_URL = 'https://taskrouter.twilio.com';
const version = 'v1';

const capability = new TaskRouterCapability({
  accountSid: accountSid,
  authToken: authToken,
  workspaceSid: workspaceSid,
  channelId: workerSid,
});

// Helper function to create Policy
function buildWorkspacePolicy(options) {
  options = options || {};
  var resources = options.resources || [];
  var urlComponents = [
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

// Event Bridge Policies
const eventBridgePolicies = util.defaultEventBridgePolicies(
  accountSid,
  workerSid
);

// Worker Policies
const workerPolicies = util.defaultWorkerPolicies(
  version,
  workspaceSid,
  workerSid
);

const workspacePolicies = [
  // Workspace fetch Policy
  buildWorkspacePolicy(),
  // Workspace subresources fetch Policy
  buildWorkspacePolicy({ resources: ['**'] }),
  // Workspace Activities Update Policy
  buildWorkspacePolicy({ resources: ['Activities'], method: 'POST' }),
  // Workspace Activities Worker Reserations Policy
  buildWorkspacePolicy({
    resources: ['Workers', workerSid, 'Reservations', '**'],
    method: 'POST',
  }),
];

eventBridgePolicies
  .concat(workerPolicies)
  .concat(workspacePolicies)
  .forEach(function (policy) {
    capability.addPolicy(policy);
  });

const token = capability.toJwt();
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.jwt.taskrouter.capabilities import WorkerCapabilityToken

# Your Account Sid and Auth Token from twilio.com/user/account
# To set up environmental variables, see http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
workspace_sid = "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
worker_sid = "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

capability = WorkerCapabilityToken(
    account_sid=account_sid,
    auth_token=auth_token,
    workspace_sid=workspace_sid,
    worker_sid=worker_sid
)
capability.allow_fetch_subresources()
capability.allow_update_activities()
capability.allow_update_reservations()
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
        const string workerSid = "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

        var updateActivityFilter = new Dictionary<string, Policy.FilterRequirement>
        {
            { "ActivitySid", Policy.FilterRequirement.Required }
        };

        var urls = new PolicyUrlUtils(workspaceSid, workerSid);

        var allowActivityUpdates = new Policy(urls.Worker,
                                              HttpMethod.Post,
                                              postFilter: updateActivityFilter);
        var allowTasksUpdate = new Policy(urls.AllTasks, HttpMethod.Post);
        var allowReservationUpdate = new Policy(urls.AllReservations, HttpMethod.Post);
        var allowWorkerFetches = new Policy(urls.Worker, HttpMethod.Get);
        var allowTasksFetches = new Policy(urls.AllTasks, HttpMethod.Get );
        var allowReservationFetches = new Policy(urls.AllReservations, HttpMethod.Get);
        var allowActivityFetches = new Policy(urls.Activities, HttpMethod.Get);

        var policies = new List<Policy>
        {
            allowActivityUpdates,
            allowTasksUpdate,
            allowReservationUpdate,
            allowWorkerFetches,
            allowTasksFetches,
            allowReservationFetches
            
        };

        // By default, tokens are good for one hour.
        // Override this default timeout by specifiying a new value (in seconds).
        // For example, to generate a token good for 8 hours:        
        var capability = new TaskRouterCapability(
            accountSid,
            authToken,
            workspaceSid,
            workerSid,
            policies: policies,
            expiration: DateTime.UtcNow.AddSeconds(28800)); // 60 * 60 * 8


        Console.WriteLine(capability.ToJwt());
    }
}


class PolicyUrlUtils
{
    const string taskRouterBaseUrl = "https://taskrouter.twilio.com";
    const string taskRouterVersion = "v1";

    readonly string _workspaceSid;
    readonly string _workerSid;

    public PolicyUrlUtils(string workspaceSid, string workerSid)
    {
        _workspaceSid = workspaceSid;
        _workerSid = workerSid;
    }

    public string AllTasks => $"{Workspace}/Tasks/**";

    public string Worker => $"{Workspace}/Workers/{_workerSid}";

    public string AllReservations => $"{Worker}/Reservations/**";

    public string Workspace =>
        $"{taskRouterBaseUrl}/{taskRouterVersion}/Workspaces/{_workspaceSid}";
    
    public string Activities => $"{Workspace}/Activities";


}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.twilio.http.HttpMethod;
import com.twilio.jwt.taskrouter.*;

public class Example {
  // Get your Account SID and Auth Token from https://twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  private static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  private static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");
  private static final String WORKSPACE_SID = "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  private static final String WORKER_SID = "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

  public static void main(String[] args) {
    List<Policy> policies = PolicyUtils.defaultWorkerPolicies(WORKSPACE_SID, WORKER_SID);

    Map<String, FilterRequirement> activityUpdateFilter = new HashMap<>();
    activityUpdateFilter.put("ActivitySid", FilterRequirement.REQUIRED);

    Policy allowFetchSubresources = new Policy.Builder()
        .url(UrlUtils.workspace(WORKSPACE_SID) + "/**")
        .build();

    Policy allowActivityUpdates = new Policy.Builder()
        .url(UrlUtils.worker(WORKSPACE_SID, WORKER_SID))
        .method(HttpMethod.POST)
        .postFilter(activityUpdateFilter).build();

    Policy allowTasksUpdate = new Policy.Builder()
        .url(UrlUtils.allTasks(WORKSPACE_SID))
        .method(HttpMethod.POST)
        .build();

    Policy allowReservationUpdate = new Policy.Builder()
        .url(UrlUtils.allReservations(WORKSPACE_SID, WORKER_SID))
        .method(HttpMethod.POST)
        .build();

    policies.add(allowFetchSubresources);
    policies.add(allowActivityUpdates);
    policies.add(allowTasksUpdate);
    policies.add(allowReservationUpdate);


    TaskRouterCapability.Builder capabilityBuilder =
        new TaskRouterCapability.Builder(ACCOUNT_SID, AUTH_TOKEN, WORKSPACE_SID, WORKER_SID)
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
use Twilio\Jwt\TaskRouter\WorkerCapability;

// Your Account Sid and Auth Token from twilio.com/user/account
// To set up environmental variables, see http://twil.io/secure
$accountSid = getenv('TWILIO_ACCOUNT_SID');
$authToken = getenv('TWILIO_AUTH_TOKEN');
$workspaceSid = "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
$workerSid = "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

$capability = new WorkerCapability($accountSid, $authToken, $workspaceSid, $workerSid);
$capability->allowFetchSubresources();
$capability->allowActivityUpdates();
$capability->allowReservationUpdates();
$token = $capability->generateToken();
// By default, tokens are good for one hour.
// Override this default timeout by specifiying a new value (in seconds).
// For example, to generate a token good for 8 hours:
$token = $capability->generateToken(28800);  // 60 * 60 * 8
```

```rb
# Get twilio-ruby from twilio.com/docs/ruby/install
require 'twilio-ruby'

# Get your Account SID and Auth Token from twilio.com/console
# To set up environmental variables, see http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
workspace_sid = 'WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
worker_sid = 'WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

capability = Twilio::JWT::TaskRouterCapability.new(
 (account_sid, auth_token),
  workspace_sid, worker_sid
)

allow_fetch_subresources = Twilio::JWT::TaskRouterCapability::Policy.new(
  Twilio::JWT::TaskRouterCapability::TaskRouterUtils
  .worker(workspace_sid, worker_sid), 'GET', true
)
capability.add_policy(allow_fetch_subresources)

allow_activity_updates = Twilio::JWT::TaskRouterCapability::Policy.new(
  Twilio::JWT::TaskRouterCapability::TaskRouterUtils
  .all_activities(workspace_sid), 'POST', true
)
capability.add_policy(allow_activity_updates)

allow_reservation_updates = Twilio::JWT::TaskRouterCapability::Policy.new(
  Twilio::JWT::TaskRouterCapability::TaskRouterUtils
  .all_reservations(workspace_sid, worker_sid), 'POST', true
)
capability.add_policy(allow_reservation_updates)

Twilio::JWT::TaskRouterCapability::TaskRouterUtils
.worker_policies(workspace_sid, worker_sid).each { |worker_policy|
   capability.add_policy(worker_policy)
}

puts capability.to_s
```

Additionally, you can to define more granular access to particular resources beyond these capabilities. These can be viewed under [Constructing JWTs](/docs/taskrouter/js-sdk-v1/workspace/constructing-jwts).

Once you have generated a TaskRouter capability token, you can pass this to your front-end web application and initialize the JavaScript library as follows:

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);
```

The library will raise a `ready` event once it has connected to TaskRouter:

```javascript
worker.on("ready", function(worker) {
  console.log(worker.sid)             // 'WKxxx'
  console.log(worker.friendlyName)    // 'Worker 1'
  console.log(worker.activityName)    // 'Reserved'
  console.log(worker.available)       // false
});
```

See more about the methods and events exposed on this object below.

## Worker API

TaskRouter.js Worker exposes the following API:

* [Twilio.TaskRouter.Worker](#taskrouterworker)
  * [new Twilio.TaskRouter.Worker()](#new-taskrouterworker)
  * [Methods](#worker-methods)
    * [update()](#update)
    * [updateToken()](#updatetoken)
    * [activities.fetch()](#fetchactivities)
    * [fetchReservations()](#fetchreservations)
    * [fetchChannels()](#fetchchannels)
    * [updateTask()](#updatetask)
    * [completeTask()](#completetask)
    * [on()](#worker-on)
  * [Events](#worker-events)
    * [ready](#ready)
    * [activity.update](#worker-activity-update)
    * [attributes.update](#worker-attributes-update)
    * [capacity.update](#worker-channel-capacity-update)
    * [reservation.created](#reservation-created)
    * [reservation.accepted](#reservation-accepted)
    * [reservation.rejected](#reservation-rejected)
    * [reservation.timeout](#reservation-timeout)
    * [reservation.canceled](#reservation-canceled)
    * [reservation.rescinded](#reservation-rescinded)
    * [token.expired](#token-expired)
    * [connected](#connected)
    * [disconnected](#disconnected)
    * [error](#ws-error)
  * [Reservation Actions](#reservation-actions)
    * [reservation.accept](#reservation-accept)
    * [reservation.reject](#reservation-reject)
    * [reservation.conference](#reservation-conference)
    * [reservation.dequeue](#reservation-dequeue)
    * [reservation.call](#reservation-call)
    * [reservation.redirect](#reservation-redirect)

## Twilio.TaskRouter.Worker \[#taskrouterworker]

Twilio.TaskRouter.Worker is the top-level class you'll use for managing a Worker's activity, and receiving notifications when a Worker is assigned a task or when a Worker's Activity is changed.

### new Twilio.TaskRouter.Worker(workerToken) \[#new-taskrouterworker]

Register a new Twilio.TaskRouter.Worker with the capabilities provided in `workerToken`.

#### Parameters

| Name                    | Type    | Description                                                                                                                 |
| ----------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `workerToken`           | String  | A Twilio TaskRouter capability token. See [Creating a TaskRouter capability token](#capability-token) for more information. |
| `debug`                 | Boolean | (optional) Whether or not the JS SDK will print event messages to the console. Defaults to `true`.                          |
| `connectActivitySid`    | String  | (optional) ActivitySid to place the worker in upon the websocket connecting.                                                |
| `disconnectActivitySid` | String  | (optional) ActivitySid to place the worker in upon the websocket disconnecting.                                             |
| `closeExistingSessions` | Boolean | (optional) Whether or not to disconnect existing websockets for the same Worker upon connecting. Defaults to `false`.       |
| `region`                | String  | (optional) A Twilio region for websocket connections (for example, `ie1-ix`).                                               |
| `maxRetries`            | Integer | (optional) The maximum of retries to attempt if a websocket request fails. Defaults to `0`.                                 |

#### Sample usage

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);
```

Turning off debugging:

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN, false);
```

Adding connecting and disconnecting activities, and closing existing sessions:

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN, false, "WAxxx", "WAyyy", true);
```

### Methods \[#worker-methods]

#### update(\[args...], \[resultCallback]) \[#update]

Updates properties of a Worker. There are properties of a Worker, such as `ActiveSid`, `FriendlyName`, and more. These can be edited singly (see below) or in bulk. If you wish to change the Attributes property of a Worker, you must pass in the full JSON blob of its new Attributes.

To update the activity or reservation of a specific worker, please refer to the [Worker Resource](/docs/taskrouter/api/worker).

Updating the activity or reservation If updating the Worker's activity state, the `activity.update` event will also fire.
If updating the Worker's attributes, the `attributes.update` event will also fire.

##### Parameters \[#parameters-2]

| Name             | Type           | Description                                                                                                                                                                                                                                                                                       |
| ---------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| args...          | String or JSON | A single API parameter and value or a JSON object containing multiple values.                                                                                                                                                                                                                     |
| `resultCallback` | Function       | (optional) A JavaScript Function that will be called with the result of the update. If an error occurs, the first argument passed to this function will be an error. If the update is successful, the first argument will be null and the second argument will contain the updated Worker object. |

##### Single Attribute Example

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.update("ActivitySid", "WAxxx", function(error, worker) {
  if(error) {
    console.log(error.code);
    console.log(error.message);
  } else {
    console.log(worker.activityName); // "Offline"
  }
});
```

##### Multiple Attribute Example

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

const props = {"ActivitySid":"WAxxx", "FriendlyName":"UpdatedWorker"};

worker.update(props, function(error, worker) {
  if(error) {
    console.log(error.code);
    console.log(error.message);
  } else {
    console.log(worker.activityName); // "Offline"
  }
});
```

#### updateToken(workerToken) \[#updatetoken]

Updates the TaskRouter capability token for the Worker.

##### Parameters \[#parameters-3]

| Name          | Type   | Description                          |
| ------------- | ------ | ------------------------------------ |
| `workerToken` | String | A valid TaskRouter capability token. |

##### Example

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

const token = refreshJWT(); // your method to retrieve a new capability token
worker.updateToken(token);
```

#### activities.fetch(callback) \[#fetchactivities]

Retrieves the list of Activities configured in your TaskRouter's Workspace.

##### Parameters \[#parameters-4]

| Name       | Type     | Description                                                                                                                                                                                                                                                                                                               |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `callback` | Function | A function that will be called when the Activity list is returned. If an error occurs when retrieving the list, the first parameter passed to this function will contain the Error object. If the retrieval is successful, the first parameter will be null and the second parameter will contain an array of Activities. |

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.activities.fetch(
    function(error, activityList) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        const data = activityList.data;
        for(i=0; i<data.length; i++) {
            console.log(data[i].friendlyName);
        }
    }
);
```

#### fetchReservations(callback) \[#fetchreservations]

Retrieves the list of Reservations assigned to your Worker

##### Parameters \[#parameters-5]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                                    |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| callback | Function | A function that will be called when the Reservation list is returned. If an error occurs when retrieving the list, the first parameter passed to this function will contain the Error object. If the retrieval is successful, the first parameter will be null and the second parameter will contain an array of Reservations. |
| params   | Object   | (optional) A JSON object of query parameters                                                                                                                                                                                                                                                                                   |

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.fetchReservations(
    function(error, reservations) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        const data = reservations.data;
        for(i=0; i<data.length; i++) {
            console.log(data[i].sid);
        }
    }
);
```

The following will fetch just pending reservations:

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

const queryParams = {"ReservationStatus":"pending"};

worker.fetchReservations(
    function(error, reservations) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        const data = reservations.data;
        for(i=0; i<data.length; i++) {
            console.log(data[i].sid);
        }
    },
    queryParams
);
```

#### fetchChannels(callback) \[#fetchchannels]

Retrieves the list of Channels assigned to your Worker

To use this feature, when constructing your Worker JWT, allow your worker to fetch subresources of the given Worker.

##### Parameters \[#parameters-6]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                                   |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callback | Function | A function that will be called when the Worker Channel list is returned. If an error occurs when retrieving the list, the first parameter passed to this function will contain the Error object. If the retrieval is successful, the first parameter will be null and the second parameter will contain an Array of Channels. |

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.fetchChannels(
    function(error, channels) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        const data = channels.data;
        for(i=0; i<data.length; i++) {
            console.log(data[i].taskChannelUniqueName + " with capacity: " + data[i].configuredCapacity);
        }
    }
);
```

#### updateTask(taskSid, params, callback) \[#updatetask]

Updates a given Task with the given parameters.

##### Parameters \[#parameters-7]

| Name       | Type     | Description                                                                                                                                                                                                                                                                                                               |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `taskSid`  | String   | The given TaskSid.                                                                                                                                                                                                                                                                                                        |
| `params`   | JSON     | JSON object containing multiple values.                                                                                                                                                                                                                                                                                   |
| `callback` | Function | A function that will be called when the updated instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the update is successful, the first parameter will be null and the second parameter will contain the updated instance. |

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

const params = {"Priority":"15"};
worker.updateTask(taskSid, params,
    function(error, updatedTask) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("Updated Task Priority: "+updatedTask.priority);
    }
);
```

#### completeTask(taskSid, callback, reason) \[#completetask]

Completes a given Task with an optional `reason`.

##### Parameters \[#parameters-8]

| Name       | Type     | Description                                                                                                                                                                                                                                                                                                               |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `taskSid`  | String   | The given TaskSid.                                                                                                                                                                                                                                                                                                        |
| `callback` | Function | A function that will be called when the updated instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the update is successful, the first parameter will be null and the second parameter will contain the updated instance. |
| `reason`   | String   | (optional) The reason for completion.                                                                                                                                                                                                                                                                                     |

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.completeTask(taskSid,
    function(error, completedTask) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("Completed Task: "+completedTask.assignmentStatus);
    }
);
```

If you have the context of given Reservation, you can complete Task from the Task object itself:

##### Parameters \[#parameters-9]

| Name       | Type     | Description                                                                                                                                                                                                                                                                                                                            |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `callback` | Function | (optional) A function that will be called when the updated instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the update is successful, the first parameter will be `null` and the second parameter will contain the updated instance. |
| `reason`   | String   | (optional) The reason for completion.                                                                                                                                                                                                                                                                                                  |

```javascript
reservation.task.complete();
```

With the optional callback, this would look like the following:

```javascript
reservation.task.complete(
    function(error, completedTask) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("Completed Task: "+completedTask.assignmentStatus);
    }
);
```

#### on(event, callback) \[#worker-on]

Attaches a listener to the specified event. See [Events](#worker-events) for the complete list of supported events.

##### Parameters \[#parameters-10]

| Name       | Type     | Description                                                                            |
| ---------- | -------- | -------------------------------------------------------------------------------------- |
| `event`    | String   | An event name. See [Events](#worker-events) for the complete list of supported events. |
| `callback` | Function | A function that will be called when the specified event is raised.                     |

#### Example \[#example-2]

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.on("activity.update", function(worker) {
    console.log(worker.activityName)   // 'Reserved'
    console.log(worker.activitySid)    // 'WAxxx'
    console.log(worker.available)      // false
});
```

## Events \[#worker-events]

TaskRouter's JS library currently raises the following events to the registered Worker object:

* [ready](#ready)
* [activity.update](#worker-activity-update)
* [attributes.update](#worker-attributes-update)
* [capacity.update](#worker-channel-capacity-update)
* [reservation.created](#reservation-created)
* [reservation.accepted](#reservation-accepted)
* [reservation.rejected](#reservation-rejected)
* [reservation.timeout](#reservation-timeout)
* [reservation.canceled](#reservation-canceled)
* [reservation.rescinded](#reservation-rescinded)
* [token.expired](#token-expired)
* [connected](#connected)
* [disconnected](#disconnected)
* [error](#ws-error)

### ready \[#ready]

The Worker has established a connection to TaskRouter and has completed initialization.

#### Parameters \[#parameters-11]

| Name     | Type   | Description                                      |
| -------- | ------ | ------------------------------------------------ |
| `worker` | Worker | The Worker object for the Worker you've created. |

#### Example \[#example-3]

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.on("ready", function(worker) {
  console.log(worker.available)       // true
});
```

### activity.update \[#worker-activity-update]

The Worker's activity has changed. This event is fired any time the Worker's Activity changes, both when TaskRouter updates a Worker's Activity, and when you make a change to the Worker's Activity via Worker.js or the TaskRouter REST API.

#### Parameters \[#parameters-12]

| Name     | Type   | Description                |
| -------- | ------ | -------------------------- |
| `worker` | Worker | The updated Worker object. |

#### Example \[#example-4]

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.on("activity.update", function(worker) {
    console.log(worker.sid)             // 'WKxxx'
    console.log(worker.friendlyName)   // 'Worker 1'
    console.log(worker.activityName)   // 'Reserved'
    console.log(worker.available)       // false
});
```

### attributes.update \[#worker-attributes-update]

The Worker's attributes have been updated.

#### Parameters \[#parameters-13]

| Name     | Type   | Description                |
| -------- | ------ | -------------------------- |
| `worker` | Worker | The updated Worker object. |

#### Example \[#example-5]

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.on("attributes.update", function(worker) {
    console.log(worker.sid)             // 'WKxxx'
    console.log(worker.friendlyName)    // 'Worker 1'
    console.log(worker.activityName)    // 'Reserved'
    console.log(worker.available)       // false
});
```

### capacity.update \[#worker-channel-capacity-update]

The Worker's Capacity have been updated.

#### Parameters \[#parameters-14]

| Name      | Type          | Description                      |
| --------- | ------------- | -------------------------------- |
| `channel` | WorkerChannel | The updated WorkerChannel object |

#### Example \[#example-6]

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.on("capacity.update", function(channel) {
    console.log(channel.sid)                         // 'WCxxx'
    console.log(channel.taskChannelUniqueName)       // 'ipm'
    console.log(channel.available)                   // true
    console.log(channel.configuredCapacity)          // '3'
    console.log(channel.availableCapacityPercentage) // 66.7
    console.log(channel.assignedTasks)               // 2
});
```

### reservation.created \[#reservation-created]

The Worker has been assigned a reservation.

#### Parameters \[#parameters-15]

| Name          | Type        | Description                                                  |
| ------------- | ----------- | ------------------------------------------------------------ |
| `reservation` | Reservation | The Reservation object that has been assigned to the Worker. |

#### Example \[#example-7]

Access Task and their attributes details as you would with any other JavaScript object.

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.on("reservation.created", function(reservation) {
    console.log(reservation.task.attributes)      // {foo: 'bar', baz: 'bang' }
    console.log(reservation.task.priority)        // 1
    console.log(reservation.task.age)             // 300
    console.log(reservation.task.sid)             // WTxxx
    console.log(reservation.sid)                  // WRxxx
});
```

### reservation.accepted \[#reservation-accepted]

Raised when the Worker has accepted a Reservation.

#### Parameters \[#parameters-16]

| Name          | Type        | Description                                                    |
| ------------- | ----------- | -------------------------------------------------------------- |
| `reservation` | Reservation | The Reservation object that has been accepted for this worker. |

#### Example \[#example-8]

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.on("reservation.accepted", function(reservation) {
    console.log(reservation.task.attributes)      // {foo: 'bar', baz: 'bang' }
    console.log(reservation.task.priority)        // 1
    console.log(reservation.task.age)             // 300
    console.log(reservation.task.sid)             // WTxxx
    console.log(reservation.sid)                  // WRxxx
});
```

### reservation.rejected \[#reservation-rejected]

Raised when the Worker has rejected a Reservation.

#### Parameters \[#parameters-17]

| Name          | Type        | Description                                                    |
| ------------- | ----------- | -------------------------------------------------------------- |
| `reservation` | Reservation | The Reservation object that has been rejected for this worker. |

#### Example \[#example-9]

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.on("reservation.rejected", function(reservation) {
    console.log(reservation.task.attributes)      // {foo: 'bar', baz: 'bang' }
    console.log(reservation.task.priority)        // 1
    console.log(reservation.task.age)             // 300
    console.log(reservation.task.sid)             // WTxxx
    console.log(reservation.sid)                  // WRxxx
});
```

### reservation.timeout \[#reservation-timeout]

Raised when a pending Reservation associated with this Worker times out.

#### Parameters \[#parameters-18]

| Name          | Type        | Description                                                     |
| ------------- | ----------- | --------------------------------------------------------------- |
| `reservation` | Reservation | The Reservation object that has been timed-out for this worker. |

#### Example \[#example-10]

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.on("reservation.timeout", function(reservation) {
    console.log(reservation.task.attributes)      // {foo: 'bar', baz: 'bang' }
    console.log(reservation.task.priority)        // 1
    console.log(reservation.task.age)             // 300
    console.log(reservation.task.sid)             // WTxxx
    console.log(reservation.sid)                  // WRxxx
});
```

### reservation.canceled \[#reservation-canceled]

Raised when a pending Reservation associated with this Worker is canceled.

#### Parameters \[#parameters-19]

| Name          | Type        | Description                                                    |
| ------------- | ----------- | -------------------------------------------------------------- |
| `reservation` | Reservation | The Reservation object that has been canceled for this worker. |

#### Handling reservation being canceled

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.on("reservation.canceled", function(reservation) {
    console.log(reservation.task.attributes)      // {foo: 'bar', baz: 'bang' }
    console.log(reservation.task.priority)        // 1
    console.log(reservation.task.age)             // 300
    console.log(reservation.task.sid)             // WTxxx
    console.log(reservation.sid)                  // WRxxx
});
```

### reservation.rescinded \[#reservation-rescinded]

Raised when a pending Reservation associated with this Worker is rescinded in the case of multi-reservation.

#### Parameters \[#parameters-20]

| Name          | Type        | Description                                                     |
| ------------- | ----------- | --------------------------------------------------------------- |
| `reservation` | Reservation | The Reservation object that has been rescinded for this worker. |

#### Handling reservation being rescinded

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.on("reservation.rescinded", function(reservation) {
    console.log(reservation.task.attributes)      // {foo: 'bar', baz: 'bang' }
    console.log(reservation.task.priority)        // 1
    console.log(reservation.task.age)             // 300
    console.log(reservation.task.sid)             // WTxxx
    console.log(reservation.sid)                  // WRxxx
});
```

### token.expired \[#token-expired]

Raised when the TaskRouter capability token used to create this Worker expires.

#### Example \[#example-11]

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.on("token.expired", function() {
    console.log("updating token");
    const token = refreshJWT(); // your method to retrieve a new capability token
    worker.updateToken(token);
});
```

### connected \[#connected]

#### Example \[#example-12]

Raised when the Websocket connects.

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.on("connected", function() {
  console.log("Websocket has connected");
});
```

### disconnected \[#disconnected]

#### Example \[#example-13]

Raised when the Websocket disconnects.

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.on("disconnected", function() {
  console.log("Websocket has disconnected");
});
```

### error \[#ws-error]

Raised when the Websocket has an error.

#### Example \[#example-14]

```javascript
const worker = new Twilio.TaskRouter.Worker(WORKER_TOKEN);

worker.on("error", function(error) {
    console.log("Websocket had an error: "+ error.response + " with message: "+error.message);
});
```

## Reservation Actions \[#reservation-actions]

When a Worker receives a `reservation.created` event with a Reservation object, the reservation object contains several
actionable methods on the reservation.

* [reservation.accept](#reservation-accept)
* [reservation.reject](#reservation-reject)
* [reservation.conference](#reservation-conference)
* [reservation.dequeue](#reservation-dequeue)
* [reservation.call](#reservation-call)

### reservation.accept \[#reservation-accept]

This will accept the reservation for the worker.

This will NOT perform any telephony. If the task was enqueued using the Enqueue TwiML verb, utilize reservation.dequeue(#reservation-dequeue) to perform telephony and dequeue the call.

#### Parameters \[#parameters-21]

| Name             | Type     | Description                                                                                                                                                                                                                                                                                                           |
| ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resultCallback` | Function | (optional) A JavaScript Function that will be called with the result of accepting the reservation. If an error occurs, the first argument passed to this function will be an Error. If the update is successful, the first argument will be null and the second argument will contain the updated Reservation object. |

```javascript
reservation.accept(
    function(error, reservation) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("reservation accepted");
        for (const property in reservation) {
            console.log(property+" : "+reservation[property]);
        }
    }
);
```

If you do not care about the callback, then simply the following will do:

```javascript
reservation.accept();
```

### reservation.reject \[#reservation-reject]

This will reject the reservation for the worker.

#### Parameters \[#parameters-22]

| Name             | Type     | Description                                                                                                                                                                                                                                                                                                           |
| ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `activitySid`    | String   | (optional) The activitySid to update the worker to after rejecting the reservation.                                                                                                                                                                                                                                   |
| `resultCallback` | Function | (optional) A JavaScript Function that will be called with the result of rejecting the reservation. If an error occurs, the first argument passed to this function will be an Error. If the update is successful, the first argument will be null and the second argument will contain the updated Reservation object. |

```javascript
reservation.reject(
    function(error, reservation) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("reservation rejected");
        for (const property in reservation) {
            console.log(property+" : "+reservation[property]);
        }
    }
);
```

If you do not care about the callback, then simply the following will do:

```javascript
reservation.reject();
```

If you do not care about the callback, but want to update the worker's ActivitySid then simply the following will do:

```javascript
reservation.reject("WAxxx");
```

### reservation.conference \[#reservation-conference]

This will create a conference and puts worker and caller into conference.

This will create a conference for a task that was enqueued using the Enqueue TwiML verb.

#### Parameters \[#parameters-23]

| Name                                    | Type      | Description                                                                                                                                                                                                                                                                                                                                                                                     |   |
| --------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | - |
| `from`                                  | String    | (optional) The caller id for the call to the worker. This needs to be a verified Twilio number. If you need this to be the original callee number, please [contact Support][support]. If the `from` is not provided and the Task was created using [Enqueue verb][enqueue], then we will use the `To` number dialed by the caller as the `from` number when executing `conference` instruction. |   |
| `postWorkActivitySid`                   | String    | (optional) The activitySid to update the worker to after conference completes.                                                                                                                                                                                                                                                                                                                  |   |
| `timeout`                               | string    | (optional) The integer number of seconds that Twilio should allow the phone associated with `contact_uri` to ring before assuming there is no answer. Default is 60 seconds, the maximum is 999 seconds. You can set this to a low value, such as 15, to hangup before reaching an answering machine or voicemail.                                                                              |   |
| `to`                                    | string    | (optional) The contact URI of the Worker. A phone number or client ID. Required if the worker's attributes do not include a `contact_uri` property.                                                                                                                                                                                                                                             |   |
| `resultCallback`                        | Function  | (optional) A JavaScript Function that will be called upon the completion of the dial. If an error occurs, the first argument passed to this function will be an Error. If the call is successful, the first argument will be null and the second argument will contain the non-updated Reservation object. However, you can still utilize actions on it. See below.                             |   |
| `options`                               | object    | (optional) If you have Agent Conference enabled, you can utilize similar parameters as specified by the Participants API for the Worker Conference Leg. See [the documentation][participant-api] for the full list of parameters that can be used. You can enable Agent Conference with the [Twilio Console][agent-conference].                                                                 |   |
| `options.ConferenceStatusCallbackEvent` | String\[] | (optional) Ensure that, for the TaskRouter SDK, this parameter is a comma separated array. Refer to [the documentation][participant-api] for the full list of values that can be included in the array.                                                                                                                                                                                         |   |

If you simply wish to conference the call, then simply do the following since all parameters are optional:

```javascript
reservation.conference();
```

If you wish to hook into additional options, you can do so as follows:

```javascript
reservation.conference(
    "18004746453",
    "WAxxx",
    "30",
    "client:joey",
    function(error, reservation) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("conference initiated");
    }
);
```

If you wish to hook into [Agent Conference][agent-conference] parameters for the Worker Conference Leg, you can do so as follows:

```javascript
const options = {
    "ConferenceStatusCallback": "https://requestb.in/wzfljiwz",
    "ConferenceStatusCallbackEvent": "start,end",
    "ConferenceRecord": "true",
    "ConferenceRecordingStatusCallback": "https://requestb.in/wzfljiwz",
    "EndConferenceOnExit": "true"
}

reservation.conference(null, null, null, null, null, options);
```

If you wish to NOT utilize [Agent Conference][agent-conference] or its parameters for the Worker Conference Leg, but control your conference settings via the options parameter, that is possible as well:

```javascript
const options = {
    "From": "18004746453",
    "PostWorkActivitySid": "WAxxx",
    "Timeout": "30",
    "To": "client:joey",
    "Record":"true",
    "ConferenceStatusCallback": "https://requestb.in/wzfljiwz",
    "ConferenceStatusCallbackEvent": "start,end,join,leave"
}

reservation.conference(null, null, null, null, null, options);
```

### reservation.dequeue \[#reservation-dequeue]

This will dequeue the reservation for the worker.

**Note: This will perform telephony to dequeue a task that was enqueued using the Enqueue TwiML verb.**

**Note: A Worker's Attributes must contain a `contact_uri` attribute for the call to go through since this will be considered the `To` for the Calls API.**

#### Parameters \[#parameters-24]

| Name                        | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dequeueFrom                 | String   | (optional) The caller id for the call to the worker. This needs to be a verified Twilio number. If you need this to be the original callee number, please [contact Support][support]. If the "dequeueFrom" is not provided and the Task was created using [Enqueue verb][enqueue], then we will use the "To" number dialed by the caller as the "dequeueFrom" number when executing "dequeue" instruction.        |
| dequeuePostWorkActivitySid  | String   | (optional) The activitySid to update the worker to after dequeuing the reservation.                                                                                                                                                                                                                                                                                                                               |
| dequeueRecord               | string   | (optional) The 'record' attribute lets you record both legs of a call. Set to "record-from-answer" to record the call from answer. Default to "do-not-record" which will not record the call. The RecordingUrl will be sent with status\_callback\_url.                                                                                                                                                           |
| dequeueTimeout              | string   | (optional) The integer number of seconds that Twilio should allow the phone associated with `contact_uri` to ring before assuming there is no answer. Default is 60 seconds, the maximum is 999 seconds. Note, you could set this to a low value, such as 15, to hangup before reaching an answering machine or voicemail.                                                                                        |
| dequeueStatusCallbackUrl    | string   | (optional) A URL that Twilio will send asynchronous webhook requests to on completed call event. \*\*Note: TaskRouter sends "taskCallSid" as parameter with sid of the call that created the Task. This is very useful in the event a call to worker fails, where you could remove the original call from queue and send to voice mail or enqueue again with new workflow to route to different group of workers. |
| dequeueStatusCallbackEvents | string   | (optional) Defines which Call Progress Events are sent to the above dequeueStatusCallbackUrl. By default, we will send only the call completed event. If you wish to listen to all, simply provide "initiated,ringing,answered,completed". Any permutation of the above as long as it is comma delimited is acceptable.                                                                                           |
| dequeueTo                   | string   | (optional) The contact URI of the Worker. A phone number or client ID. Required if the worker's attributes do not include a `contact_uri` property.                                                                                                                                                                                                                                                               |
| resultCallback              | Function | (optional) A JavaScript Function that will be called with the result of dequeuing the reservation. If an error occurs, the first argument passed to this function will be an Error. If the update is successful, the first argument will be null and the second argument will contain the updated Reservation object.                                                                                             |

If you simply wish to dequeue the call, then simply the following will do since all parameters are optional:

```javascript
reservation.dequeue();
```

If you wish to hook into additional options, you can do so as follows:

```javascript
reservation.dequeue(
    "18004746453",
    "WAxxx",
    "record-from-answer",
    "30",
    "http://requestb.in/13285vq1",
    "client:joey",
    function(error, reservation) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("reservation dequeued");
    }
);
```

### reservation.call \[#reservation-call]

This will call a worker using the [Calls resource](/docs/voice/api/call-resource). To give a sense of the matchup of parameters,
an additional column is listed on the parameters to indicate which Calls API parameter each JS SDK parameter is mapping to.

**Note**: If `CallTo` is not provided, a Worker's Attributes must contain a `contact_uri` attribute for the call to go through since this will be considered the `To` for the Calls API.

#### Parameters \[#parameters-25]

| Name                  | Type     | Description                                                                                                                                                                                                                                                                                                                                                         | Calls API Parameter |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| callFrom              | String   | The caller id for the call to the worker.                                                                                                                                                                                                                                                                                                                           | From                |
| callUrl               | String   | A valid TwiML URI that is executed on the answering Worker's leg.                                                                                                                                                                                                                                                                                                   | Url                 |
| callStatusCallbackUrl | String   | (optional) A valid status callback URL.                                                                                                                                                                                                                                                                                                                             | StatusCallback      |
| callAccept            | String   | (optional) "true" or "false", accept the task before initiating call. Defaults to "false". **Needs to be a string. Eg: "true", not true**                                                                                                                                                                                                                           |                     |
| callRecord            | String   | (optional) `record-from-answer` or false. Record the call. Defaults to false.                                                                                                                                                                                                                                                                                       | Record              |
| callTo                | String   | (optional) Whom to call. If not provided, will utilize worker `contact_uri` attribute                                                                                                                                                                                                                                                                               | To                  |
| resultCallback        | Function | (optional) A JavaScript Function that will be called upon the completion of the dial. If an error occurs, the first argument passed to this function will be an Error. If the call is successful, the first argument will be null and the second argument will contain the non-updated Reservation object. However, you can still utilize actions on it. See below. |                     |

```javascript
reservation.call(
    "18004746453",
    "http://twimlbin.com/451369ae",
    "http://requestb.in/13285vq1",
    "true",
    "record-from-answer",
    "client:joey"
    function(error, reservation) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("reservation called the worker");
    }
);
```

If you do not care about the callback, then simply the following will do:

```javascript
reservation.call(
    "18004746453",
    "http://twimlbin.com/451369ae",
    "http://requestb.in/13285vq1",
    "false");
```

If you do not care about the status callback, and want to accept the reservation AFTER the call is bridged, you can do the following:

```javascript
reservation.call(
    "18004746453",
    "http://twimlbin.com/451369ae",
    null,
    null,
    null,
    null,
    function(error, reservation) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        reservation.accept();
    }
);
```

If you do not care about the callback, or the status callback, and want to accept the reservation BEFORE the call is bridged, you can do the following:

```javascript
reservation.call(
    "18004746453",
    "http://twimlbin.com/451369ae",
    null,
    "true");
```

### reservation.redirect \[#reservation-redirect]

This will redirect the active call tied to a reservation using the [Twilio Calls API](/docs/voice/api/call-resource#update-a-call-resource). To give a sense of the matchup of parameters, an additional column is listed on the parameters to indicate which Calls API parameter each JS SDK parameter is mapping to.

#### Parameters \[#parameters-26]

| Name            | Type     | Description                                                                                                                                                                                                                                                                                                                                                             | Calls API Parameter |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| redirectCallSid | String   | The Call to Redirect                                                                                                                                                                                                                                                                                                                                                    | From                |
| redirectUrl     | String   | A valid TwiML URI that is executed on the Caller's leg upon redirecting.                                                                                                                                                                                                                                                                                                | Url                 |
| redirectAccept  | String   | (optional) "true" or "false", accept the task before initiating call. Defaults to "false". **Needs to be a string. Eg: "true", not true**                                                                                                                                                                                                                               |                     |
| resultCallback  | Function | (optional) A JavaScript Function that will be called upon the completion of the redirect. If an error occurs, the first argument passed to this function will be an Error. If the call is successful, the first argument will be null and the second argument will contain the non-updated Reservation object. However, you can still utilize actions on it. See below. |                     |

```javascript
reservation.redirect(
    "CAxxxx",                //redirectCallSid
    "https://handler.twilio.com/twiml/EH621f0e21da7ce5441f6ec6aacce64069",    //redirectUrl
    "true",        //redirectAccept
    function(error, reservation) {        //resultCallback
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("reservation call was redirected");
    }
);
```

*Note:* The URL used in the example above is created using TwiML Bins which returns the following TwiML that plays "Hello from TwiML".

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
<Say>Hello from Twilio!</Say>
</Response>
```

[support]: /help/contact

[enqueue]: /docs/voice/twiml/enqueue

[participant-api]: /docs/voice/api/conference-participant-resource

[agent-conference]: /console/voice/settings/conferences
