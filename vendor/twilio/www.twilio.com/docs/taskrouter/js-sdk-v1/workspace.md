# TaskRouter.js v1 Workspace: Managing resources in the browser

The SDK allows developers to interact with the entire TaskRouter REST API by a simple JS API.

## Adding the SDK to your application

Include the TaskRouter JS SDK in your JavaScript application as follows:

```html
<script src="https://sdk.twilio.com/js/taskrouter/v1.21/taskrouter.min.js" integrity="sha384-5fq+0qjayReAreRyHy38VpD3Gr9R2OYIzonwIkoGI4M9dhfKW6RWeRnZjfwSrpN8" crossorigin="anonymous"></script>
```

### Creating a TaskRouter Workspace capability token \[#capability-token]

TaskRouter uses Twilio capability tokens to delegate scoped access to TaskRouter resources to your JavaScript application.
Twilio capability tokens conform to the JSON Web Token (JWT) standard, which allow for limited-time use of credentials by a third party.
Your web server needs to generate a Twilio capability token and provide it to your JavaScript application in order to register a TaskRouter Workspace.

We provide five helper methods to provide access capabilities (Note: These are not currently available in the Node.js library):

| Capability               | Authorization                                     |
| ------------------------ | ------------------------------------------------- |
| AllowFetchSubresources   | A workspace can fetch any subresource             |
| AllowUpdates             | A workspace can update its properties             |
| AllowUpdatesSubresources | A workspace can update itself and any subresource |
| AllowDelete              | A workspace can delete itself                     |
| AllowDeleteSubresources  | A workspace can delete itself and any subresource |

Additionally, you can utilize more granular access to particular resources beyond these capabilities. These can viewed under [Constructing JWTs][constructing-jwts].

You can generate a TaskRouter capability token using any of Twilio's SDKs. You'll need to provide your Twilio AccountSid and AuthToken, along with the WorkspaceSid for the Workspace you would like to register. For example, using our PHP SDK you can create a token and add capabilities as follows:

[constructing-jwts]: /docs/taskrouter/js-sdk/workspace/constructing-jwts

Creating a TaskRouter Workspace capability token

```js
// This snippets constructs the same policy list as seen here:
// https://www.twilio.com/docs/api/taskrouter/constructing-jwts as a base

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
  channelId: workspaceSid,
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

// Event Bridge Policies
const eventBridgePolicies = util.defaultEventBridgePolicies(
  accountSid,
  workspaceSid
);

const workspacePolicies = [
  // Workspace Policy
  buildWorkspacePolicy(),
  // Workspace subresources fetch Policy
  buildWorkspacePolicy({ resources: ['**'] }),
  // Workspace resources update Policy
  buildWorkspacePolicy({ resources: ['**'], method: 'POST' }),
  // Workspace resources delete Policy
  buildWorkspacePolicy({ resources: ['**'], method: 'DELETE' }),
];

eventBridgePolicies.concat(workspacePolicies).forEach((policy) => {
  capability.addPolicy(policy);
});

const token = capability.toJwt();
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.jwt.taskrouter.capabilities import WorkspaceCapabilityToken

# Your Account Sid and Auth Token from twilio.com/user/account
# To set up environmental variables, see http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
workspace_sid = "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

capability = WorkspaceCapabilityToken(
    account_sid=account_sid,
    auth_token=auth_token,
    workspace_sid=workspace_sid
)

capability.allow_fetch_subresources()
capability.allow_update_subresources()
capability.allow_delete_subresources()

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

        var urls = new PolicyUrlUtils(workspaceSid);

        var allowFetchSubresources = new Policy($"{urls.Workspace}/**", HttpMethod.Get);
        var allowUpdatesSubresources = new Policy($"{urls.Workspace}/**", HttpMethod.Post);
        var allowDeleteSubresources = new Policy($"{urls.Workspace}/**", HttpMethod.Delete);


        var policies = new List<Policy>
        {
            allowFetchSubresources,
            allowUpdatesSubresources,
            allowUpdatesSubresources
        };

        // By default, tokens are good for one hour.
        // Override this default timeout by specifiying a new value (in seconds).
        // For example, to generate a token good for 8 hours:
        var capability = new TaskRouterCapability(
            accountSid,
            authToken,
            workspaceSid,
            null,
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

    public PolicyUrlUtils(string workspaceSid)
    {
        _workspaceSid = workspaceSid;
    }

    public string Workspace =>
        $"{taskRouterBaseUrl}/{taskRouterVersion}/Workspaces/{_workspaceSid}";
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import java.util.List;
import java.util.ArrayList;

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

  public static void main(String[] args) {
    Policy allowFetchSubresources = new Policy.Builder()
        .url(UrlUtils.workspace(WORKSPACE_SID) + "/**")
        .build();

    Policy allowUpdatesSubresources = new Policy.Builder()
        .url(UrlUtils.workspace(WORKSPACE_SID) + "/**")
        .method(HttpMethod.POST)
        .build();

    Policy allowDeleteSubresources = new Policy.Builder()
        .url(UrlUtils.workspace(WORKSPACE_SID) + "/**")
        .method(HttpMethod.DELETE)
        .build();


    List<Policy> policies = Arrays.asList(allowFetchSubresources, allowUpdatesSubresources,
        allowDeleteSubresources);


    TaskRouterCapability.Builder capabilityBuilder =
        new TaskRouterCapability.Builder(ACCOUNT_SID, AUTH_TOKEN, WORKSPACE_SID, WORKSPACE_SID)
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
use Twilio\Jwt\TaskRouter\WorkspaceCapability;

// Your Account Sid and Auth Token from twilio.com/user/account
// To set up environmental variables, see http://twil.io/secure
$accountSid = getenv('TWILIO_ACCOUNT_SID');
$authToken = getenv('TWILIO_AUTH_TOKEN');
$workspaceSid = "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

$capability = new WorkspaceCapability($accountSid, $authToken, $workspaceSid);
$capability->allowFetchSubresources();
$capability->allowUpdatesSubresources();
$capability->allowDeleteSubresources();
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

capability = Twilio::JWT::TaskRouterCapability.new(
 (account_sid, auth_token), workspace_sid, workspace_sid
)

allow_fetch_subresources = Twilio::JWT::TaskRouterCapability::Policy.new(
  Twilio::JWT::TaskRouterCapability::TaskRouterUtils.all_workspaces,
  'GET',
  true
)
capability.add_policy(allow_fetch_subresources)

allow_updates_subresources = Twilio::JWT::TaskRouterCapability::Policy.new(
  Twilio::JWT::TaskRouterCapability::TaskRouterUtils.all_workspaces,
  'POST',
  true
)
capability.add_policy(allow_updates_subresources)

allow_delete_subresources = Twilio::JWT::TaskRouterCapability::Policy.new(
  Twilio::JWT::TaskRouterCapability::TaskRouterUtils.all_workspaces,
  'DELETE',
  true
)
capability.add_policy(allow_delete_subresources)

puts capability.to_s
```

Once you have generated a TaskRouter capability token, you can pass this to your front-end web application and initialize the JavaScript library as follows:

```javascript
var workspace = new Twilio.TaskRouter.Workspace(WORKSPACE_TOKEN);
```

The library will raise a 'ready' event once it has connected to TaskRouter:

```javascript
workspace.on("ready", function(workspace) {
  console.log(workspace.sid) // 'WSxxx'
  console.log(workspace.friendlyName) // 'Workspace 1'
  console.log(workspace.prioritizeQueueOrder) // 'FIFO'
  console.log(workspace.defaultActivityName) // 'Offline'
});
```

See more about the methods and events exposed on this object below.

## Workspace API

TaskRouter.js Workspace exposes the following API:

* [Twilio.TaskRouter.Workspace](#taskrouterworkspace)
  * [new Twilio.TaskRouter.Workspace()](#new-taskrouterworkspace)
  * [Methods](#workspace-methods)
    * [update()](#update)
    * [delete()](#delete)
    * [updateToken()](#updatetoken)
    * [activities](#activities)
    * [workflows](#workflows)
    * [taskqueues](#taskqueues)
    * [workers](#workers)
    * [tasks](#tasks)
    * [statistics](#statistics)
    * [cumulative statistics](/docs/taskrouter/api/taskqueue-statistics#taskqueue-cumulative-statistics)
    * [real time statistics](/docs/taskrouter/api/taskqueue-statistics#bulk-retrieval-of-taskqueue-realtime-statistics)
    * [on()](#workspace-on)
  * [Events](#workspace-events)
    * [ready](#ready)
    * [connected](#connected)
    * [disconnected](#disconnected)
    * [token.expired](#token-expired)

## Twilio.TaskRouter.Workspace \[#taskrouterworkspace]

Twilio.TaskRouter.Workspace is the top-level class you'll use for managing a workspace.

### new Twilio.TaskRouter.Workspace(workspaceToken) \[#new-taskrouterworkspace]

Register a new Twilio.TaskRouter.Workspace with the capabilities provided in `workspaceToken`.

#### Parameters

| Name           | Type    | Description                                                                                                                 |
| -------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| workspaceToken | String  | A Twilio TaskRouter capability token. See [Creating a TaskRouter capability token](#capability-token) for more information. |
| debug          | Boolean | (optional) Whether or not the JS SDK will print event messages to the console. Defaults to true.                            |
| region         | String  | (optional) A Twilio region for websocket connections (ex. `ie1-ix`).                                                        |
| maxRetries     | Integer | (optional) The maximum of retries to attempt if a websocket request fails. Defaults to 0.                                   |

#### Sample usage

```javascript
var workspace = new Twilio.TaskRouter.Workspace(WORKSPACE_TOKEN);
```

Turning off debugging:

```javascript
var workspace = new Twilio.TaskRouter.Workspace(WORKSPACE_TOKEN, false);
```

### Methods \[#workspace-methods]

#### update(\[args...], \[resultCallback]) \[#update]

Updates a single or list of properties on a workspace.

#### Parameters \[#parameters-2]

| Name           | Type           | Description                                                                                                                                                                                                                                                                                          |
| -------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| args...        | String or JSON | A single API parameter and value or a JSON object containing multiple values                                                                                                                                                                                                                         |
| resultCallback | Function       | (optional) A JavaScript Function that will be called with the result of the update. If an error occurs, the first argument passed to this function will be an Error. If the update is successful, the first argument will be null and the second argument will contain the updated Workspace object. |

##### Single Attribute Example

```javascript
workspace.update("EventCallbackUrl", "http://requestb.in/1kmw9im1", function(error, workspace) {
  if(error) {
    console.log(error.code);
    console.log(error.message);
  } else {
    console.log(workspace.eventCallbackUrl); // "http://requestb.in/1kmw9im1"
  }
});
```

##### Multiple Attribute Example

```javascript
var props = {"EventCallbackUrl", "http://requestb.in/1kmw9im1", "TimeoutActivitySid":"WAxxx"};
workspace.update(props, function(error, workspace) {
  if(error) {
    console.log(error.code);
    console.log(error.message);
  } else {
    console.log(workspace.eventCallbackUrl);   // "http://requestb.in/1kmw9im1"
    console.log(workspace.timeoutActivitySid); // "WAxxx"
  }
});
```

#### delete(\[resultCallback]) \[#delete]

Deletes a workspace

#### Parameters \[#parameters-3]

| Name           | Type     | Description                                                                                                                                                                                                                        |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| resultCallback | Function | (optional) A JavaScript Function that will be called with the result of the delete. If an error occurs, the first argument passed to this function will be an Error. If the delete is successful, the first argument will be null. |

##### Example

```javascript
workspace.delete(function(error) {
  if(error) {
    console.log(error.code);
    console.log(error.message);
  } else {
    console.log("workspace deleted");
  }
});
```

#### updateToken(workspaceToken) \[#updatetoken]

Updates the TaskRouter capability token for the Workspace.

#### Parameters \[#parameters-4]

| Name           | Type   | Description                          |
| -------------- | ------ | ------------------------------------ |
| workspaceToken | String | A valid TaskRouter capability token. |

##### Example \[#example-2]

```javascript
var token = refreshJWT(); // your method to retrieve a new capability token
workspace.updateToken(token);
```

#### activities \[#activities]

Retrieves the object to retrieve the list of activities, create a new activity, fetch, update or delete a specific activity.

#### fetch

##### Parameters \[#parameters-5]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                         |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sid      | String   | (optional) SID to fetch                                                                                                                                                                                                                                                                                             |
| params   | JSON     | (optional) A JSON object of query parameters                                                                                                                                                                                                                                                                        |
| callback | Function | A function that will be called when the Activity list is returned. If an error occurs when retrieving the list, the first parameter passed to this function will contain the Error object. If the retrieval is successful, the first parameter will be null and the second parameter will contain an activity list. |

```javascript
workspace.activities.fetch(
    function(error, activityList) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("Parsing response");
        var data = activityList.data;
        for(i=0; i<data.length; i++) {
            console.log(data[i].friendlyName);
        }
    }
);
```

##### Fetching a specific Activity

```javascript
workspace.activities.fetch("WAxxx",
    function(error, activity) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log(activity.friendlyName);
    }
);
```

#### create

##### Parameters \[#parameters-6]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                               |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| params   | JSON     | An object containing multiple values                                                                                                                                                                                                                                                                                      |
| callback | Function | A function that will be called when the created instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the create is successful, the first parameter will be null and the second parameter will contain the created instance. |

```javascript
var params = {"FriendlyName":"Activity1", "Available":"true"};
workspace.activities.create(
    params,
    function(error, activity) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("FriendlyName: "+activity.friendlyName);
    }
);
```

#### update

You can update an Activity resource in two manners:

* Updating on an Instance Resource
* Updating on the List Resource passing a specific SID

#### Instance Resource Parameters

| Name     | Type           | Description                                                                                                                                                                                                                                                                                                               |
| -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| args...  | String or JSON | A single API parameter and value or a JSON object containing multiple values                                                                                                                                                                                                                                              |
| callback | Function       | A function that will be called when the updated instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the update is successful, the first parameter will be null and the second parameter will contain the updated instance. |

```javascript
workspace.activities.fetch(
    function(error, activityList) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        var data = activityList.data;
        for(i=0; i<data.length; i++) {
            var activity = data[i];
            activity.update("WAxxx", "FriendlyName", "NewFriendlyName",
              function(error, activity) {
                if(error) {
                  console.log(error.code);
                  console.log(error.message);
                  return;
                }
                console.log("FriendlyName: "+activity.friendlyName);
              }
            );
        }
    }
);
```

#### List Resource Parameters

| Name     | Type           | Description                                                                                                                                                                                                                                                                                                               |
| -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sid      | String         | SID to update                                                                                                                                                                                                                                                                                                             |
| args...  | String or JSON | A single API parameter and value or a JSON object containing multiple values                                                                                                                                                                                                                                              |
| callback | Function       | A function that will be called when the updated instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the update is successful, the first parameter will be null and the second parameter will contain the updated instance. |

```javascript
workspace.activities.update("WAxxx", "FriendlyName", "NewFriendlyName",
    function(error, activity) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("FriendlyName: "+activity.friendlyName);
    }
);
```

#### delete

You can delete an Activity resource in two manners:

* Deleting on an Instance Resource
* Deleting on the List Resource passing a specific SID

#### Instance Resource Parameters \[#instance-resource-parameters-2]

| Name           | Type     | Description                                                                                                                                                                                                                        |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| resultCallback | Function | (optional) A JavaScript Function that will be called with the result of the delete. If an error occurs, the first argument passed to this function will be an Error. If the delete is successful, the first argument will be null. |

```javascript
workspace.activities.fetch(
    function(error, activityList) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        var data = activityList.data;
        for(i=0; i<data.length; i++) {
            var activity = data[i];
            activity.delete(function(error) {
                if(error) {
                    console.log(error.code);
                    console.log(error.message);
                    return;
                }
                console.log("Activity deleted");
            });
        }
    }
);
```

#### List Resource Parameters \[#list-resource-parameters-2]

| Name           | Type     | Description                                                                                                                                                                                                                        |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sid            | String   | SID to delete                                                                                                                                                                                                                      |
| resultCallback | Function | (optional) A JavaScript Function that will be called with the result of the delete. If an error occurs, the first argument passed to this function will be an Error. If the delete is successful, the first argument will be null. |

```javascript
workspace.activities.delete("WAxxx"
    function(error) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("Activity deleted");
    }
);
```

#### workflows \[#workflows]

Retrieves the object to retrieve the list of workflows, create a new workflow, fetch, update or delete a specific workflow.

#### fetch \[#fetch-2]

##### Parameters \[#parameters-7]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                        |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| sid      | String   | (optional) SID to fetch                                                                                                                                                                                                                                                                                            |
| params   | JSON     | (optional) A JSON object of query parameters                                                                                                                                                                                                                                                                       |
| callback | Function | A function that will be called when the workflow list is returned. If an error occurs when retrieving the list, the first parameter passed to this function will contain the Error object. If the retrieval is successful, the first parameter will be null and the second parameter will contain a workflow list. |

```javascript
workspace.workflows.fetch(
    function(error, workflowList) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("Parsing response");
        var data = workflowList.data;
        for(i=0; i<data.length; i++) {
            console.log(data[i].friendlyName);
        }
    }
);
```

##### Fetching a specific Workflow

```javascript
workspace.workflows.fetch("WWxxx",
    function(error, workflow) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log(workflow.friendlyName);
    }
);
```

#### create \[#create-2]

##### Parameters \[#parameters-8]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                               |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| params   | JSON     | An object containing multiple values                                                                                                                                                                                                                                                                                      |
| callback | Function | A function that will be called when the created instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the create is successful, the first parameter will be null and the second parameter will contain the created instance. |

```javascript
var workflowConfig = {"task_routing":{"default_filter":{"task_queue_sid":"WQxxx"}}};
var params = {"FriendlyName":"Workflow1", "AssignmentCallbackUrl":"http://requestb.in/1kmw9im1", "Configuration":workflowConfig};
workspace.workflows.create(
    params,
    function(error, workflow) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("FriendlyName: "+workflow.friendlyName);
    }
);
```

#### update \[#update-2]

You can update a Workflow resource in two manners:

* Updating on an Instance Resource
* Updating on the List Resource passing a specific SID

#### Instance Resource Parameters \[#instance-resource-parameters-3]

| Name     | Type           | Description                                                                                                                                                                                                                                                                                                               |
| -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| args...  | String or JSON | A single API parameter and value or a JSON object containing multiple values                                                                                                                                                                                                                                              |
| callback | Function       | A function that will be called when the updated instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the update is successful, the first parameter will be null and the second parameter will contain the updated instance. |

```javascript
workspace.workflows.fetch(
    function(error, workflowList) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        var data = workflowList.data;
        for(i=0; i<data.length; i++) {
            var workflow = data[i];
            workflow.update("WWxxx", "TaskReservationTimeout", "300",
                function(error, workflow) {
                    if(error) {
                        console.log(error.code);
                        console.log(error.message);
                        return;
                    }
                    console.log("TaskReservationTimeout: "+workflow.taskReservationTimeout);
                }
            );
        }
    }
);
```

#### List Resource Parameters \[#list-resource-parameters-3]

| Name     | Type           | Description                                                                                                                                                                                                                                                                                                               |
| -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sid      | String         | SID to update                                                                                                                                                                                                                                                                                                             |
| args...  | String or JSON | A single API parameter and value or a JSON object containing multiple values                                                                                                                                                                                                                                              |
| callback | Function       | A function that will be called when the updated instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the update is successful, the first parameter will be null and the second parameter will contain the updated instance. |

```javascript
workspace.workflows.update("WWxxx", "TaskReservationTimeout", "300",
    function(error, workflow) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("TaskReservationTimeout: "+workflow.taskReservationTimeout);
    }
);
```

#### delete \[#delete-2]

You can delete a Workflow resource in two manners:

* Deleting on an Instance Resource
* Deleting on the List Resource passing a specific SID

#### Instance Resource Parameters \[#instance-resource-parameters-4]

| Name           | Type     | Description                                                                                                                                                                                                                        |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| resultCallback | Function | (optional) A JavaScript Function that will be called with the result of the delete. If an error occurs, the first argument passed to this function will be an Error. If the delete is successful, the first argument will be null. |

```javascript
workspace.workflows.fetch(
    function(error, workflowList) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        var data = workflowList.data;
        for(i=0; i<data.length; i++) {
            var workflow = data[i];
            workflow.delete(function(error) {
                if(error) {
                  console.log(error.code);
                  console.log(error.message);
                  return;
                }
                console.log("Workflow deleted");
              }
            );
        }
    }
);
```

#### List Resource Parameters \[#list-resource-parameters-4]

| Name           | Type     | Description                                                                                                                                                                                                                        |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sid            | String   | SID to delete                                                                                                                                                                                                                      |
| resultCallback | Function | (optional) A JavaScript Function that will be called with the result of the delete. If an error occurs, the first argument passed to this function will be an Error. If the delete is successful, the first argument will be null. |

```javascript
workspace.workflows.delete("WWxxx"
    function(error) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("Workflow deleted");
    }
);
```

#### statistics

Retrieves the object to retrieve the statistics for a workflow.

#### fetch \[#fetch-3]

##### Parameters \[#parameters-9]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                                |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| params   | JSON     | (optional) A JSON object of query parameters                                                                                                                                                                                                                                                                               |
| callback | Function | A function that will be called when the statistics object is returned. If an error occurs when retrieving the list, the first parameter passed to this function will contain the Error object. If the retrieval is successful, the first parameter will be null and the second parameter will contain a statistics object. |

```javascript
var queryParams = {"Minutes":"240"};
workflow.statistics.fetch(
    queryParams,
    function(error, statistics) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("fetched workflow statistics: "+JSON.stringify(statistics));
    }
);
```

Cumulative Stats:

```javascript
var queryParams = {"Minutes":"240"};
workflow.cumulativeStats.fetch(
    queryParams,
    function(error, statistics) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("fetched workflow statistics: "+JSON.stringify(statistics));
    }
);
```

RealTime Stats:

```javascript
workflow.realtimeStats.fetch(
    function(error, statistics) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("fetched workflow statistics: "+JSON.stringify(statistics));
    }
);
```

#### taskqueues \[#taskqueues]

Retrieves the object to retrieve the list of taskqueues, create a new taskqueue, fetch, update or delete a specific taskqueue.

#### fetch \[#fetch-4]

##### Parameters \[#parameters-10]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                          |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sid      | String   | (optional) SID to fetch                                                                                                                                                                                                                                                                                              |
| params   | JSON     | (optional) A JSON object of query parameters                                                                                                                                                                                                                                                                         |
| callback | Function | A function that will be called when the taskqueue list is returned. If an error occurs when retrieving the list, the first parameter passed to this function will contain the Error object. If the retrieval is successful, the first parameter will be null and the second parameter will contain a taskqueue list. |

```javascript
workspace.taskqueues.fetch(
    function(error, taskQueueList) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("Parsing response");
        var data = taskQueueList.data;
        for(i=0; i<data.length; i++) {
            console.log(data[i].friendlyName);
        }
    }
);
```

##### Fetching a specific TaskQueue

```javascript
workspace.taskqueues.fetch("WQxxx",
    function(error, taskQueue) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log(taskQueue.friendlyName);
    }
);
```

#### create \[#create-3]

##### Parameters \[#parameters-11]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                               |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| params   | JSON     | An object containing multiple values                                                                                                                                                                                                                                                                                      |
| callback | Function | A function that will be called when the created instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the create is successful, the first parameter will be null and the second parameter will contain the created instance. |

```javascript
var params = {"FriendlyName":"TaskQueue1", "ReservationActivitySid":"WAxxx", "AssignmentActivitySid":"WAxxx", "TargetWorkers":"1==1"};
workspace.taskqueues.create(
    params,
    function(error, taskQueue) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("FriendlyName: "+taskQueue.friendlyName);
    }
);
```

#### update \[#update-3]

You can update a TaskQueue resource in two manners:

* Updating on an Instance Resource
* Updating on the List Resource passing a specific SID

#### Instance Resource Parameters \[#instance-resource-parameters-5]

| Name     | Type           | Description                                                                                                                                                                                                                                                                                                               |
| -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| args...  | String or JSON | A single API parameter and value or a JSON object containing multiple values                                                                                                                                                                                                                                              |
| callback | Function       | A function that will be called when the updated instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the update is successful, the first parameter will be null and the second parameter will contain the updated instance. |

```javascript
workspace.taskqueues.fetch(
    function(error, taskQueueList) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        var data = taskQueueList.data;
        for(i=0; i<data.length; i++) {
            var taskqueue = data[i];
            taskqueue.update("WWxxx", "MaxReservedWorkers", "20",
              function(error, taskqueue) {
                if(error) {
                  console.log(error.code);
                  console.log(error.message);
                  return;
                }
                console.log("MaxReservedWorkers: "+taskqueue.maxReservedWorkers);
              }
            );
        }
    }
);
```

#### List Resource Parameters \[#list-resource-parameters-5]

| Name     | Type           | Description                                                                                                                                                                                                                                                                                                               |
| -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sid      | String         | SID to update                                                                                                                                                                                                                                                                                                             |
| args...  | String or JSON | A single API parameter and value or a JSON object containing multiple values                                                                                                                                                                                                                                              |
| callback | Function       | A function that will be called when the updated instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the update is successful, the first parameter will be null and the second parameter will contain the updated instance. |

```javascript
workspace.taskqueues.update("WQxxx", "MaxReservedWorkers", "20",
    function(error, taskqueue) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("MaxReservedWorkers: "+taskqueue.maxReservedWorkers);
    }
);
```

#### delete \[#delete-3]

You can delete a TaskQueue resource in two manners:

* Deleting on an Instance Resource
* Deleting on the List Resource passing a specific SID

#### Instance Resource Parameters \[#instance-resource-parameters-6]

| Name           | Type     | Description                                                                                                                                                                                                                        |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| resultCallback | Function | (optional) A JavaScript Function that will be called with the result of the delete. If an error occurs, the first argument passed to this function will be an Error. If the delete is successful, the first argument will be null. |

```javascript
workspace.taskqueues.fetch(
    function(error, taskQueueList) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        var data = taskQueueList.data;
        for(i=0; i<data.length; i++) {
            var taskqueue = data[i];
            taskqueue.delete(function(error) {
                if(error) {
                  console.log(error.code);
                  console.log(error.message);
                  return;
                }
                console.log("TaskQueue deleted");
              }
            );
        }
    }
);
```

#### List Resource Parameters \[#list-resource-parameters-6]

| Name           | Type     | Description                                                                                                                                                                                                                        |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sid            | String   | SID to delete                                                                                                                                                                                                                      |
| resultCallback | Function | (optional) A JavaScript Function that will be called with the result of the delete. If an error occurs, the first argument passed to this function will be an Error. If the delete is successful, the first argument will be null. |

```javascript
workspace.taskqueues.delete("WQxxx"
    function(error) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("TaskQueue deleted");
    }
);
```

#### statistics \[#statistics-2]

Retrieves the object to retrieve the statistics for a taskqueue.

#### fetch \[#fetch-5]

##### Parameters \[#parameters-12]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                                |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| params   | JSON     | (optional) A JSON object of query parameters                                                                                                                                                                                                                                                                               |
| callback | Function | A function that will be called when the statistics object is returned. If an error occurs when retrieving the list, the first parameter passed to this function will contain the Error object. If the retrieval is successful, the first parameter will be null and the second parameter will contain a statistics object. |

List of TaskQueues:

```javascript
var queryParams = {"Minutes":"240"};
workspace.taskqueues.statistics.fetch(
    queryParams,
    function(error, statistics) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("fetched taskqueues statistics: "+JSON.stringify(statistics));
    }
);
```

Single TaskQueue:

```javascript
var queryParams = {"Minutes":"240"};
taskqueue.statistics.fetch(
    queryParams,
    function(error, statistics) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("fetched taskqueue statistics: "+JSON.stringify(statistics));
    }
);
```

Note: Replace `statistics` with `cumulativestats` or `realtimestats` if you only care about cumulative or real time stats for faster response times and a smaller payload.

Cumulative Stats:

```javascript
taskqueue.cumulativeStats.fetch(
    function(error, statistics) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("fetched taskqueue statistics: "+JSON.stringify(statistics));
        console.log("avg task acceptance time: "+statistics.avgTaskAcceptanceTime;
    }
);
```

RealTime Stats:

```javascript
var queryParams = {"Minutes":"240"};
taskqueue.realtimeStats.fetch(
    queryParams,
    function(error, statistics) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("fetched taskqueue statistics: "+JSON.stringify(statistics));
        console.log("total available workers: "+statistics.totalAvailableWorkers;
    }
);
```

#### workers \[#workers]

Retrieves the object to retrieve the list of workers, create a new worker, fetch, update or delete a specific worker.

#### fetch \[#fetch-6]

##### Parameters \[#parameters-13]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                    |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sid      | String   | (optional) SID to fetch                                                                                                                                                                                                                                                                                        |
| params   | JSON     | (optional) A JSON object of query parameters                                                                                                                                                                                                                                                                   |
| callback | Function | A function that will be called when the worker list is returned. If an error occurs when retrieving the list, the first parameter passed to this function will contain the Error object. If the retrieval is successful, the first parameter will be null and the second parameter will contain a worker list. |

```javascript
workspace.workers.fetch(
    function(error, workerList) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("Parsing response");
        var data = workerList.data;
        for(i=0; i<data.length; i++) {
            console.log(data[i].friendlyName);
        }
    }
);
```

##### Fetching a specific Worker

```javascript
workspace.workers.fetch("WKxxx",
    function(error, worker) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log(worker.friendlyName);
    }
);
```

#### create \[#create-4]

##### Parameters \[#parameters-14]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                               |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| params   | JSON     | An object containing multiple values                                                                                                                                                                                                                                                                                      |
| callback | Function | A function that will be called when the created instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the create is successful, the first parameter will be null and the second parameter will contain the created instance. |

```javascript
var params = {"FriendlyName":"Worker1"};
workspace.workers.create(
    params,
    function(error, worker) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("FriendlyName: "+worker.friendlyName);
    }
);
```

#### update \[#update-4]

You can update a Worker resource in two manners:

* Updating on an Instance Resource
* Updating on the List Resource passing a specific SID

#### Instance Resource Parameters \[#instance-resource-parameters-7]

| Name     | Type           | Description                                                                                                                                                                                                                                                                                                               |
| -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| args...  | String or JSON | A single API parameter and value or a JSON object containing multiple values                                                                                                                                                                                                                                              |
| callback | Function       | A function that will be called when the updated instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the update is successful, the first parameter will be null and the second parameter will contain the updated instance. |

```javascript
workspace.workers.fetch(
    function(error, workerList) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        var data = workerList.data;
        for(i=0; i<data.length; i++) {
            var worker = data[i];
            worker.update("WKxxx", "ActivitySid", "WAxxx",
              function(error, worker) {
                if(error) {
                  console.log(error.code);
                  console.log(error.message);
                  return;
                }
                console.log("FriendlyName: "+worker.friendlyName);
              }
            );
        }
    }
);
```

#### List Resource Parameters \[#list-resource-parameters-7]

| Name     | Type           | Description                                                                                                                                                                                                                                                                                                               |
| -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sid      | String         | SID to update                                                                                                                                                                                                                                                                                                             |
| args...  | String or JSON | A single API parameter and value or a JSON object containing multiple values                                                                                                                                                                                                                                              |
| callback | Function       | A function that will be called when the updated instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the update is successful, the first parameter will be null and the second parameter will contain the updated instance. |

```javascript
workspace.workers.update("WKxxx", "ActivitySid", "WAxxx",
    function(error, worker) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("FriendlyName: "+worker.friendlyName);
    }
);
```

#### delete \[#delete-4]

You can delete a Worker resource in two manners:

* Deleting on an Instance Resource
* Deleting on the List Resource passing a specific SID

#### Instance Resource Parameters \[#instance-resource-parameters-8]

| Name           | Type     | Description                                                                                                                                                                                                                        |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| resultCallback | Function | (optional) A JavaScript Function that will be called with the result of the delete. If an error occurs, the first argument passed to this function will be an Error. If the delete is successful, the first argument will be null. |

```javascript
workspace.workers.fetch(
    function(error, workerList) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        var data = workerList.data;
        for(i=0; i<data.length; i++) {
            var worker = data[i];
            worker.delete(function(error) {
                if(error) {
                  console.log(error.code);
                  console.log(error.message);
                  return;
                }
                console.log("Worker deleted");
              }
            );
        }
    }
);
```

#### List Resource Parameters \[#list-resource-parameters-8]

| Name           | Type     | Description                                                                                                                                                                                                                        |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sid            | String   | SID to delete                                                                                                                                                                                                                      |
| resultCallback | Function | (optional) A JavaScript Function that will be called with the result of the delete. If an error occurs, the first argument passed to this function will be an Error. If the delete is successful, the first argument will be null. |

```javascript
workspace.workers.delete("WKxxx"
    function(error) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("Worker deleted");
    }
);
```

#### statistics \[#statistics-3]

Retrieves the object to retrieve the statistics for a worker.

#### fetch \[#fetch-7]

##### Parameters \[#parameters-15]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                                |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| params   | JSON     | (optional) A JSON object of query parameters                                                                                                                                                                                                                                                                               |
| callback | Function | A function that will be called when the statistics object is returned. If an error occurs when retrieving the list, the first parameter passed to this function will contain the Error object. If the retrieval is successful, the first parameter will be null and the second parameter will contain a statistics object. |

List of Workers:

```javascript
var queryParams = {"Minutes":"240"};
workspace.workers.statistics.fetch(
    queryParams,
    function(error, statistics) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("fetched workers statistics: "+JSON.stringify(statistics));
    }
);
```

List of Workers Cumulative Stats:

```javascript
var queryParams = {"Minutes":"240"};
workspace.workers.cumulativeStats.fetch(
    queryParams,
    function(error, statistics) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("fetched workers statistics: "+JSON.stringify(statistics));
    }
);
```

List of Workers RealTime Stats:

```javascript
workspace.workers.realtimeStats.fetch(
    function(error, statistics) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("fetched workers statistics: "+JSON.stringify(statistics));
    }
);
```

Single Worker:

```javascript
var queryParams = {"Minutes":"240"};
worker.statistics.fetch(
    queryParams,
    function(error, statistics) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("fetched worker statistics: "+JSON.stringify(statistics));
    }
);
```

#### tasks \[#tasks]

Retrieves the object to retrieve the list of tasks, create a new task, fetch, update or delete a specific task.

#### fetch \[#fetch-8]

##### Parameters \[#parameters-16]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sid      | String   | (optional) SID to fetch                                                                                                                                                                                                                                                                                    |
| params   | JSON     | (optional) A JSON object of query parameters                                                                                                                                                                                                                                                               |
| callback | Function | A function that will be called when the task list is returned. If an error occurs when retrieving the list, the first parameter passed to this function will contain the Error object. If the retrieval is successful, the first parameter will be null and the second parameter will contain a task list. |

```javascript
workspace.tasks.fetch(
    function(error, taskList) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("Parsing response");
        var data = taskList.data;
        for(i=0; i<data.length; i++) {
            console.log(JSON.stringify(data[i].attributes));
        }
    }
);
```

##### Fetching a specific Task

```javascript
workspace.tasks.fetch("WTxxx",
    function(error, task) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log(JSON.stringify(task.attributes));
    }
);
```

#### create \[#create-5]

##### Parameters \[#parameters-17]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                               |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| params   | JSON     | An object containing multiple values                                                                                                                                                                                                                                                                                      |
| callback | Function | A function that will be called when the created instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the create is successful, the first parameter will be null and the second parameter will contain the created instance. |

```javascript
var attributes = "{\"Ticket\":\"Gold\"}";
var params = {"WorkflowSid":"WWxxx", "Attributes":attributes};
workspace.tasks.create(
    params,
    function(error, task) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("TaskSid: "+task.sid);
    }
);
```

#### update \[#update-5]

You can update a Task resource in two manners:

* Updating on an Instance Resource
* Updating on the List Resource passing a specific SID

#### Instance Resource Parameters \[#instance-resource-parameters-9]

| Name     | Type           | Description                                                                                                                                                                                                                                                                                                               |
| -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| args...  | String or JSON | A single API parameter and value or a JSON object containing multiple values                                                                                                                                                                                                                                              |
| callback | Function       | A function that will be called when the updated instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the update is successful, the first parameter will be null and the second parameter will contain the updated instance. |

```javascript
workspace.tasks.fetch(
    function(error, taskList) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        var data = taskList.data;
        var cancelAttrs = {"AssignmentStatus":"canceled", "Reason":"waiting"}
        for(i=0; i<data.length; i++) {
            var task = data[i];
            task.update("WTxxx", cancelAttrs,
              function(error, task) {
                if(error) {
                  console.log(error.code);
                  console.log(error.message);
                  return;
                }
                console.log("Attributes: "+JSON.stringify(task.attributes));
              }
            );
        }
    }
);
```

#### List Resource Parameters \[#list-resource-parameters-9]

| Name     | Type           | Description                                                                                                                                                                                                                                                                                                               |
| -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sid      | String         | SID to update                                                                                                                                                                                                                                                                                                             |
| args...  | String or JSON | A single API parameter and value or a JSON object containing multiple values                                                                                                                                                                                                                                              |
| callback | Function       | A function that will be called when the updated instance is returned. If an error occurs when updating the instance, the first parameter passed to this function will contain the Error object. If the update is successful, the first parameter will be null and the second parameter will contain the updated instance. |

```javascript
var cancelAttrs = {"AssignmentStatus":"canceled", "Reason":"waiting"}
workspace.tasks.update("WTxxx", cancelAttrs,
    function(error, task) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("Attributes: "+JSON.stringify(task.attributes));
    }
);
```

#### delete \[#delete-5]

You can delete a Task resource in two manners:

* Deleting on an Instance Resource
* Deleting on the List Resource passing a specific SID

#### Instance Resource Parameters \[#instance-resource-parameters-10]

| Name           | Type     | Description                                                                                                                                                                                                                        |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| resultCallback | Function | (optional) A JavaScript Function that will be called with the result of the delete. If an error occurs, the first argument passed to this function will be an Error. If the delete is successful, the first argument will be null. |

```javascript
workspace.tasks.fetch(
    function(error, taskList) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        var data = taskList.data;
        for(i=0; i<data.length; i++) {
            var task = data[i];
            task.delete(function(error) {
                if(error) {
                  console.log(error.code);
                  console.log(error.message);
                  return;
                }
                console.log("Task deleted");
              }
            );
        }
    }
);
```

#### List Resource Parameters \[#list-resource-parameters-10]

| Name           | Type     | Description                                                                                                                                                                                                                        |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sid            | String   | SID to delete                                                                                                                                                                                                                      |
| resultCallback | Function | (optional) A JavaScript Function that will be called with the result of the delete. If an error occurs, the first argument passed to this function will be an Error. If the delete is successful, the first argument will be null. |

```javascript
workspace.tasks.delete("WTxxx"
    function(error) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("task deleted");
    }
);
```

#### statistics \[#statistics]

Retrieves the object to retrieve the statistics for a workspace.

#### fetch \[#fetch-9]

##### Parameters \[#parameters-18]

| Name     | Type     | Description                                                                                                                                                                                                                                                                                                                |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| params   | JSON     | (optional) A JSON object of query parameters                                                                                                                                                                                                                                                                               |
| callback | Function | A function that will be called when the statistics object is returned. If an error occurs when retrieving the list, the first parameter passed to this function will contain the Error object. If the retrieval is successful, the first parameter will be null and the second parameter will contain a statistics object. |

```javascript
var queryParams = {"Minutes":"240"};
workspace.statistics.fetch(
    queryParams,
    function(error, statistics) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("fetched workspace statistics: "+JSON.stringify(statistics));
    }
);
```

Cumulative Stats:

```javascript
var queryParams = {"Minutes":"240"};
workspace.cumulativeStats.fetch(
    queryParams,
    function(error, statistics) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("fetched workspace statistics: "+JSON.stringify(statistics));
    }
);
```

RealTime Stats:

```javascript
var queryParams = {};
workspace.realtimeStats.fetch(
    queryParams,
    function(error, statistics) {
        if(error) {
            console.log(error.code);
            console.log(error.message);
            return;
        }
        console.log("fetched workspace statistics: "+JSON.stringify(statistics));
    }
);
```

#### on(event, callback) \[#workspace-on]

Attaches a listener to the specified event. See [Events](#workspace-events) for the complete list of supported events.

#### Parameters \[#parameters-19]

| Name     | Type     | Description                                                                               |
| -------- | -------- | ----------------------------------------------------------------------------------------- |
| event    | String   | An event name. See [Events](#workspace-events) for the complete list of supported events. |
| callback | Function | A function that will be called when the specified Event is raised.                        |

#### Example \[#example-3]

```javascript
workspace.on("ready", function(workspace) {
  console.log(workspace.friendlyName)      // MyWorkspace
});
```

## Events \[#workspace-events]

TaskRouter's JS library currently raises the following events to the registered Workspace object:

* [ready](#ready)
* [token.expired](#token-expired)

### ready \[#ready]

The Workspace has established a connection to TaskRouter and has completed initialization.

#### Parameters \[#parameters-20]

| Name      | Type      | Description                                            |
| --------- | --------- | ------------------------------------------------------ |
| workspace | Workspace | The Workspace object for the Workspace you've created. |

#### Example \[#example-4]

```javascript
workspace.on("ready", function(workspace) {
  console.log(workspace.friendlyName)      // MyWorkspace
});
```

### connected \[#connected]

The Workspace has established a connection to TaskRouter.

#### Example \[#example-5]

```javascript
workspace.on("connected", function() {
    console.log("Websocket has connected");
});
```

### disconnected \[#disconnected]

The Workspace has disconnected from TaskRouter.

#### Example \[#example-6]

```javascript
workspace.on("disconnected", function() {
    console.log("Websocket has disconnected");
});
```

### token.expired \[#token-expired]

Raised when the TaskRouter capability token used to create this Workspace expires.

#### Example \[#example-7]

```javascript
workspace.on("token.expired", function() {
    console.log("updating token");
    var token = refreshJWT(); // your method to retrieve a new capability token
    workspace.updateToken(token);
});
```
