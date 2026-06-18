# Dynamic Call Center with Node.js and Express

In this tutorial we will show how to automate the routing of calls from customers to your support agents. In this example customers would select a product, then be connected to a specialist for that product. If no one is available our customer's number will be saved so that our agent can call them back.

## This is what the application does at a high level

* Configure a workspace using the Twilio [TaskRouter REST API](/docs/taskrouter/api).
* Listen for incoming calls and let the user select a product with the dial pad.
* Create a Task with the selected product and let TaskRouter handle it.
* Store missed calls so agents can return the call to customers.
* Redirect users to a voice mail when no one answers the call.
* Allow agents to change their status (Available/Offline) via SMS.

## Configure the Workspace

In order to instruct TaskRouter to handle the Tasks, we need to configure a Workspace. We can do this in the [TaskRouter Console](https://console.twilio.com/?frameUrl=%2Fconsole%2Ftaskrouter%2Fworkspaces) or programmatically using the [TaskRouter REST API](/docs/taskrouter/api).

In this Node.js application we'll do this setup when we start up the app.

A [Workspace](/docs/taskrouter/api/workspace) is the container element for any TaskRouter application. The elements are:

* [Tasks](/docs/taskrouter/api/task) - Represents a customer trying to contact an agent
* [Workers](/docs/taskrouter/api/worker) - The agents responsible for handling Tasks
* [Task Queues](/docs/taskrouter/api/task-queue) - Holds Tasks to be consumed by a set of Workers
* [Workflows](/docs/taskrouter/api/workflow) - Responsible for placing Tasks into Task Queues
* [Activities](/docs/taskrouter/api/activity) - Possible states of a Worker. Eg: idle, offline, busy

In order to build a client for this API, we need a `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` which you can find on [Twilio Console](/console). The function `initClient` configures and returns a TaskRouterClient, which is provided by the [Twilio Node.js library](/docs/libraries/reference/twilio-node/).

```js title="Create, Setup and Configure the Workspace" description="lib/workspace.js"
// !mark(6:11,14:127)
'use strict';

var twilio = require('twilio');
var find = require('lodash/find');
var map = require('lodash/map');
var difference = require('lodash/difference');
var WORKSPACE_NAME = 'TaskRouter Node Workspace';
var HOST = process.env.HOST;
var EVENT_CALLBACK = `${HOST}/events`;
var ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
var AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

module.exports = function() {
  function initClient(existingWorkspaceSid) {
    if (!existingWorkspaceSid) {
      this.client = twilio(ACCOUNT_SID, AUTH_TOKEN).taskrouter.v1.workspaces;
    } else {
      this.client = twilio(ACCOUNT_SID, AUTH_TOKEN)
      .taskrouter.v1.workspaces(existingWorkspaceSid);
    }
  }

  function createWorker(opts) {
    var ctx = this;

    return this.client.activities.list({friendlyName: 'Idle'})
    .then(function(idleActivity) {
      return ctx.client.workers.create({
        friendlyName: opts.name,
        attributes: JSON.stringify({
          'products': opts.products,
          'contact_uri': opts.phoneNumber,
        }),
        activitySid: idleActivity.sid,
      });
    });
  }

  function createWorkflow() {
    var ctx = this;
    var config = this.createWorkflowConfig();

    return ctx.client.workflows
      .create({
        friendlyName: 'Sales',
        assignmentCallbackUrl: HOST + '/call/assignment',
        fallbackAssignmentCallbackUrl: HOST + '/call/assignment',
        taskReservationTimeout: 15,
        configuration: config,
      })
      .then(function(workflow) {
        return ctx.client.activities.list()
          .then(function(activities) {
            var idleActivity = find(activities, {friendlyName: 'Idle'});
            var offlineActivity = find(activities, {friendlyName: 'Offline'});

            return {
              workflowSid: workflow.sid,
              activities: {
                idle: idleActivity.sid,
                offline: offlineActivity.sid,
              },
              workspaceSid: ctx.client._solution.sid,
            };
          });
      });
  }

  function createTaskQueues() {
    var ctx = this;
    return this.client.activities.list()
      .then(function(activities) {
        var busyActivity = find(activities, {friendlyName: 'Busy'});
        var reservedActivity = find(activities, {friendlyName: 'Reserved'});

        return Promise.all([
          ctx.client.taskQueues.create({
            friendlyName: 'SMS',
            targetWorkers: 'products HAS "ProgrammableSMS"',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
          ctx.client.taskQueues.create({
            friendlyName: 'Voice',
            targetWorkers: 'products HAS "ProgrammableVoice"',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
          ctx.client.taskQueues.create({
            friendlyName: 'Default',
            targetWorkers: '1==1',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
        ])
        .then(function(queues) {
          ctx.queues = queues;
        });
      });
  }

  function createWorkers() {
    var ctx = this;

    return Promise.all([
      ctx.createWorker({
        name: 'Bob',
        phoneNumber: process.env.BOB_NUMBER,
        products: ['ProgrammableSMS'],
      }),
      ctx.createWorker({
        name: 'Alice',
        phoneNumber: process.env.ALICE_NUMBER,
        products: ['ProgrammableVoice'],
      })
    ])
    .then(function(workers) {
      var bobWorker = workers[0];
      var aliceWorker = workers[1];
      var workerInfo = {};

      workerInfo[process.env.ALICE_NUMBER] = aliceWorker.sid;
      workerInfo[process.env.BOB_NUMBER] = bobWorker.sid;

      return workerInfo;
    });
  }

  function createWorkflowActivities() {
    var ctx = this;
    var activityNames = ['Idle', 'Busy', 'Offline', 'Reserved'];

    return ctx.client.activities.list()
      .then(function(activities) {
        var existingActivities = map(activities, 'friendlyName');

        var missingActivities = difference(activityNames, existingActivities);

        var newActivities = map(missingActivities, function(friendlyName) {
          return ctx.client.activities
            .create({
              friendlyName: friendlyName,
              available: 'true'
            });
        });

        return Promise.all(newActivities);
      })
      .then(function() {
        return ctx.client.activities.list();
      });
  }

  function createWorkflowConfig() {
    var queues = this.queues;

    if (!queues) {
      throw new Error('Queues must be initialized.');
    }

    var defaultTarget = {
      queue: find(queues, {friendlyName: 'Default'}).sid,
      timeout: 30,
      priority: 1,
    };

    var smsTarget = {
      queue: find(queues, {friendlyName: 'SMS'}).sid,
      timeout: 30,
      priority: 5,
    };

    var voiceTarget = {
      queue: find(queues, {friendlyName: 'Voice'}).sid,
      timeout: 30,
      priority: 5,
    };

    var rules = [
      {
        expression: 'selected_product=="ProgrammableSMS"',
        targets: [smsTarget, defaultTarget],
        timeout: 30,
      },
      {
        expression: 'selected_product=="ProgrammableVoice"',
        targets: [voiceTarget, defaultTarget],
        timeout: 30,
      },
    ];

    var config = {
      task_routing: {
        filters: rules,
        default_filter: defaultTarget,
      },
    };

    return JSON.stringify(config);
  }

  function setup() {
    var ctx = this;

    ctx.initClient();

    return this.initWorkspace()
      .then(createWorkflowActivities.bind(ctx))
      .then(createTaskQueues.bind(ctx))
      .then(createWorkflow.bind(ctx))
      .then(function(workspaceInfo) {
        return ctx.createWorkers()
        .then(function(workerInfo) {
          return [workerInfo, workspaceInfo];
        });
      });
  }

  function findByFriendlyName(friendlyName) {
    var client = this.client;

    return client.list()
      .then(function (data) {
        return find(data, {friendlyName: friendlyName});
      });
  }

  function deleteByFriendlyName(friendlyName) {
    var ctx = this;

    return this.findByFriendlyName(friendlyName)
      .then(function(workspace) {
        if (workspace.remove) {
          return workspace.remove();
        }
      });
  }

  function createWorkspace() {
    return this.client.create({
      friendlyName: WORKSPACE_NAME,
      EVENT_CALLBACKUrl: EVENT_CALLBACK,
    });
  }

  function initWorkspace() {
    var ctx = this;
    var client = this.client;

    return ctx.findByFriendlyName(WORKSPACE_NAME)
      .then(function(workspace) {
        var newWorkspace;

        if (workspace) {
         newWorkspace = ctx.deleteByFriendlyName(WORKSPACE_NAME)
                   .then(createWorkspace.bind(ctx));
        } else {
         newWorkspace = ctx.createWorkspace();
        }

        return newWorkspace;
      })
      .then(function(workspace) {
        ctx.initClient(workspace.sid);

        return workspace;
      });
  }

  return {
    createTaskQueues: createTaskQueues,
    createWorker: createWorker,
    createWorkers: createWorkers,
    createWorkflow: createWorkflow,
    createWorkflowActivities: createWorkflowActivities,
    createWorkflowConfig: createWorkflowConfig,
    createWorkspace: createWorkspace,
    deleteByFriendlyName: deleteByFriendlyName,
    findByFriendlyName: findByFriendlyName,
    initClient: initClient,
    initWorkspace: initWorkspace,
    setup: setup,
  };
};
```

Now let's look in more detail at all the steps, starting with the creation of the workspace itself.

## Create a Workspace

Before creating a workspace, we need to delete any others with the same `friendlyName` as the one we are trying to create. In order to create a workspace we need to provide a `friendlyName` and a `eventCallbackUrl` where a request will be made every time an event is triggered in our workspace.

```js title="Create Workspace" description="lib/workspace.js"
// !mark(246:268)
'use strict';

var twilio = require('twilio');
var find = require('lodash/find');
var map = require('lodash/map');
var difference = require('lodash/difference');
var WORKSPACE_NAME = 'TaskRouter Node Workspace';
var HOST = process.env.HOST;
var EVENT_CALLBACK = `${HOST}/events`;
var ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
var AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

module.exports = function() {
  function initClient(existingWorkspaceSid) {
    if (!existingWorkspaceSid) {
      this.client = twilio(ACCOUNT_SID, AUTH_TOKEN).taskrouter.v1.workspaces;
    } else {
      this.client = twilio(ACCOUNT_SID, AUTH_TOKEN)
      .taskrouter.v1.workspaces(existingWorkspaceSid);
    }
  }

  function createWorker(opts) {
    var ctx = this;

    return this.client.activities.list({friendlyName: 'Idle'})
    .then(function(idleActivity) {
      return ctx.client.workers.create({
        friendlyName: opts.name,
        attributes: JSON.stringify({
          'products': opts.products,
          'contact_uri': opts.phoneNumber,
        }),
        activitySid: idleActivity.sid,
      });
    });
  }

  function createWorkflow() {
    var ctx = this;
    var config = this.createWorkflowConfig();

    return ctx.client.workflows
      .create({
        friendlyName: 'Sales',
        assignmentCallbackUrl: HOST + '/call/assignment',
        fallbackAssignmentCallbackUrl: HOST + '/call/assignment',
        taskReservationTimeout: 15,
        configuration: config,
      })
      .then(function(workflow) {
        return ctx.client.activities.list()
          .then(function(activities) {
            var idleActivity = find(activities, {friendlyName: 'Idle'});
            var offlineActivity = find(activities, {friendlyName: 'Offline'});

            return {
              workflowSid: workflow.sid,
              activities: {
                idle: idleActivity.sid,
                offline: offlineActivity.sid,
              },
              workspaceSid: ctx.client._solution.sid,
            };
          });
      });
  }

  function createTaskQueues() {
    var ctx = this;
    return this.client.activities.list()
      .then(function(activities) {
        var busyActivity = find(activities, {friendlyName: 'Busy'});
        var reservedActivity = find(activities, {friendlyName: 'Reserved'});

        return Promise.all([
          ctx.client.taskQueues.create({
            friendlyName: 'SMS',
            targetWorkers: 'products HAS "ProgrammableSMS"',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
          ctx.client.taskQueues.create({
            friendlyName: 'Voice',
            targetWorkers: 'products HAS "ProgrammableVoice"',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
          ctx.client.taskQueues.create({
            friendlyName: 'Default',
            targetWorkers: '1==1',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
        ])
        .then(function(queues) {
          ctx.queues = queues;
        });
      });
  }

  function createWorkers() {
    var ctx = this;

    return Promise.all([
      ctx.createWorker({
        name: 'Bob',
        phoneNumber: process.env.BOB_NUMBER,
        products: ['ProgrammableSMS'],
      }),
      ctx.createWorker({
        name: 'Alice',
        phoneNumber: process.env.ALICE_NUMBER,
        products: ['ProgrammableVoice'],
      })
    ])
    .then(function(workers) {
      var bobWorker = workers[0];
      var aliceWorker = workers[1];
      var workerInfo = {};

      workerInfo[process.env.ALICE_NUMBER] = aliceWorker.sid;
      workerInfo[process.env.BOB_NUMBER] = bobWorker.sid;

      return workerInfo;
    });
  }

  function createWorkflowActivities() {
    var ctx = this;
    var activityNames = ['Idle', 'Busy', 'Offline', 'Reserved'];

    return ctx.client.activities.list()
      .then(function(activities) {
        var existingActivities = map(activities, 'friendlyName');

        var missingActivities = difference(activityNames, existingActivities);

        var newActivities = map(missingActivities, function(friendlyName) {
          return ctx.client.activities
            .create({
              friendlyName: friendlyName,
              available: 'true'
            });
        });

        return Promise.all(newActivities);
      })
      .then(function() {
        return ctx.client.activities.list();
      });
  }

  function createWorkflowConfig() {
    var queues = this.queues;

    if (!queues) {
      throw new Error('Queues must be initialized.');
    }

    var defaultTarget = {
      queue: find(queues, {friendlyName: 'Default'}).sid,
      timeout: 30,
      priority: 1,
    };

    var smsTarget = {
      queue: find(queues, {friendlyName: 'SMS'}).sid,
      timeout: 30,
      priority: 5,
    };

    var voiceTarget = {
      queue: find(queues, {friendlyName: 'Voice'}).sid,
      timeout: 30,
      priority: 5,
    };

    var rules = [
      {
        expression: 'selected_product=="ProgrammableSMS"',
        targets: [smsTarget, defaultTarget],
        timeout: 30,
      },
      {
        expression: 'selected_product=="ProgrammableVoice"',
        targets: [voiceTarget, defaultTarget],
        timeout: 30,
      },
    ];

    var config = {
      task_routing: {
        filters: rules,
        default_filter: defaultTarget,
      },
    };

    return JSON.stringify(config);
  }

  function setup() {
    var ctx = this;

    ctx.initClient();

    return this.initWorkspace()
      .then(createWorkflowActivities.bind(ctx))
      .then(createTaskQueues.bind(ctx))
      .then(createWorkflow.bind(ctx))
      .then(function(workspaceInfo) {
        return ctx.createWorkers()
        .then(function(workerInfo) {
          return [workerInfo, workspaceInfo];
        });
      });
  }

  function findByFriendlyName(friendlyName) {
    var client = this.client;

    return client.list()
      .then(function (data) {
        return find(data, {friendlyName: friendlyName});
      });
  }

  function deleteByFriendlyName(friendlyName) {
    var ctx = this;

    return this.findByFriendlyName(friendlyName)
      .then(function(workspace) {
        if (workspace.remove) {
          return workspace.remove();
        }
      });
  }

  function createWorkspace() {
    return this.client.create({
      friendlyName: WORKSPACE_NAME,
      EVENT_CALLBACKUrl: EVENT_CALLBACK,
    });
  }

  function initWorkspace() {
    var ctx = this;
    var client = this.client;

    return ctx.findByFriendlyName(WORKSPACE_NAME)
      .then(function(workspace) {
        var newWorkspace;

        if (workspace) {
         newWorkspace = ctx.deleteByFriendlyName(WORKSPACE_NAME)
                   .then(createWorkspace.bind(ctx));
        } else {
         newWorkspace = ctx.createWorkspace();
        }

        return newWorkspace;
      })
      .then(function(workspace) {
        ctx.initClient(workspace.sid);

        return workspace;
      });
  }

  return {
    createTaskQueues: createTaskQueues,
    createWorker: createWorker,
    createWorkers: createWorkers,
    createWorkflow: createWorkflow,
    createWorkflowActivities: createWorkflowActivities,
    createWorkflowConfig: createWorkflowConfig,
    createWorkspace: createWorkspace,
    deleteByFriendlyName: deleteByFriendlyName,
    findByFriendlyName: findByFriendlyName,
    initClient: initClient,
    initWorkspace: initWorkspace,
    setup: setup,
  };
};
```

We have a brand new workspace, now we need workers. Let's create them on the next step.

## Create the Workers

We'll create two workers: Bob and Alice. They each have two attributes: `contact_uri` a phone number and `products`, a list of products each worker is specialized in. We also need to specify an `activitySid` and a name for each worker. The selected activity will define the status of the worker.

A set of [default activities](/docs/taskrouter/api/activity) is created with your workspace. We use the `Idle` activity to make a worker available for incoming calls.

```js title="Create Workers" description="lib/workspace.js"
// !mark(23:37)
'use strict';

var twilio = require('twilio');
var find = require('lodash/find');
var map = require('lodash/map');
var difference = require('lodash/difference');
var WORKSPACE_NAME = 'TaskRouter Node Workspace';
var HOST = process.env.HOST;
var EVENT_CALLBACK = `${HOST}/events`;
var ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
var AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

module.exports = function() {
  function initClient(existingWorkspaceSid) {
    if (!existingWorkspaceSid) {
      this.client = twilio(ACCOUNT_SID, AUTH_TOKEN).taskrouter.v1.workspaces;
    } else {
      this.client = twilio(ACCOUNT_SID, AUTH_TOKEN)
      .taskrouter.v1.workspaces(existingWorkspaceSid);
    }
  }

  function createWorker(opts) {
    var ctx = this;

    return this.client.activities.list({friendlyName: 'Idle'})
    .then(function(idleActivity) {
      return ctx.client.workers.create({
        friendlyName: opts.name,
        attributes: JSON.stringify({
          'products': opts.products,
          'contact_uri': opts.phoneNumber,
        }),
        activitySid: idleActivity.sid,
      });
    });
  }

  function createWorkflow() {
    var ctx = this;
    var config = this.createWorkflowConfig();

    return ctx.client.workflows
      .create({
        friendlyName: 'Sales',
        assignmentCallbackUrl: HOST + '/call/assignment',
        fallbackAssignmentCallbackUrl: HOST + '/call/assignment',
        taskReservationTimeout: 15,
        configuration: config,
      })
      .then(function(workflow) {
        return ctx.client.activities.list()
          .then(function(activities) {
            var idleActivity = find(activities, {friendlyName: 'Idle'});
            var offlineActivity = find(activities, {friendlyName: 'Offline'});

            return {
              workflowSid: workflow.sid,
              activities: {
                idle: idleActivity.sid,
                offline: offlineActivity.sid,
              },
              workspaceSid: ctx.client._solution.sid,
            };
          });
      });
  }

  function createTaskQueues() {
    var ctx = this;
    return this.client.activities.list()
      .then(function(activities) {
        var busyActivity = find(activities, {friendlyName: 'Busy'});
        var reservedActivity = find(activities, {friendlyName: 'Reserved'});

        return Promise.all([
          ctx.client.taskQueues.create({
            friendlyName: 'SMS',
            targetWorkers: 'products HAS "ProgrammableSMS"',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
          ctx.client.taskQueues.create({
            friendlyName: 'Voice',
            targetWorkers: 'products HAS "ProgrammableVoice"',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
          ctx.client.taskQueues.create({
            friendlyName: 'Default',
            targetWorkers: '1==1',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
        ])
        .then(function(queues) {
          ctx.queues = queues;
        });
      });
  }

  function createWorkers() {
    var ctx = this;

    return Promise.all([
      ctx.createWorker({
        name: 'Bob',
        phoneNumber: process.env.BOB_NUMBER,
        products: ['ProgrammableSMS'],
      }),
      ctx.createWorker({
        name: 'Alice',
        phoneNumber: process.env.ALICE_NUMBER,
        products: ['ProgrammableVoice'],
      })
    ])
    .then(function(workers) {
      var bobWorker = workers[0];
      var aliceWorker = workers[1];
      var workerInfo = {};

      workerInfo[process.env.ALICE_NUMBER] = aliceWorker.sid;
      workerInfo[process.env.BOB_NUMBER] = bobWorker.sid;

      return workerInfo;
    });
  }

  function createWorkflowActivities() {
    var ctx = this;
    var activityNames = ['Idle', 'Busy', 'Offline', 'Reserved'];

    return ctx.client.activities.list()
      .then(function(activities) {
        var existingActivities = map(activities, 'friendlyName');

        var missingActivities = difference(activityNames, existingActivities);

        var newActivities = map(missingActivities, function(friendlyName) {
          return ctx.client.activities
            .create({
              friendlyName: friendlyName,
              available: 'true'
            });
        });

        return Promise.all(newActivities);
      })
      .then(function() {
        return ctx.client.activities.list();
      });
  }

  function createWorkflowConfig() {
    var queues = this.queues;

    if (!queues) {
      throw new Error('Queues must be initialized.');
    }

    var defaultTarget = {
      queue: find(queues, {friendlyName: 'Default'}).sid,
      timeout: 30,
      priority: 1,
    };

    var smsTarget = {
      queue: find(queues, {friendlyName: 'SMS'}).sid,
      timeout: 30,
      priority: 5,
    };

    var voiceTarget = {
      queue: find(queues, {friendlyName: 'Voice'}).sid,
      timeout: 30,
      priority: 5,
    };

    var rules = [
      {
        expression: 'selected_product=="ProgrammableSMS"',
        targets: [smsTarget, defaultTarget],
        timeout: 30,
      },
      {
        expression: 'selected_product=="ProgrammableVoice"',
        targets: [voiceTarget, defaultTarget],
        timeout: 30,
      },
    ];

    var config = {
      task_routing: {
        filters: rules,
        default_filter: defaultTarget,
      },
    };

    return JSON.stringify(config);
  }

  function setup() {
    var ctx = this;

    ctx.initClient();

    return this.initWorkspace()
      .then(createWorkflowActivities.bind(ctx))
      .then(createTaskQueues.bind(ctx))
      .then(createWorkflow.bind(ctx))
      .then(function(workspaceInfo) {
        return ctx.createWorkers()
        .then(function(workerInfo) {
          return [workerInfo, workspaceInfo];
        });
      });
  }

  function findByFriendlyName(friendlyName) {
    var client = this.client;

    return client.list()
      .then(function (data) {
        return find(data, {friendlyName: friendlyName});
      });
  }

  function deleteByFriendlyName(friendlyName) {
    var ctx = this;

    return this.findByFriendlyName(friendlyName)
      .then(function(workspace) {
        if (workspace.remove) {
          return workspace.remove();
        }
      });
  }

  function createWorkspace() {
    return this.client.create({
      friendlyName: WORKSPACE_NAME,
      EVENT_CALLBACKUrl: EVENT_CALLBACK,
    });
  }

  function initWorkspace() {
    var ctx = this;
    var client = this.client;

    return ctx.findByFriendlyName(WORKSPACE_NAME)
      .then(function(workspace) {
        var newWorkspace;

        if (workspace) {
         newWorkspace = ctx.deleteByFriendlyName(WORKSPACE_NAME)
                   .then(createWorkspace.bind(ctx));
        } else {
         newWorkspace = ctx.createWorkspace();
        }

        return newWorkspace;
      })
      .then(function(workspace) {
        ctx.initClient(workspace.sid);

        return workspace;
      });
  }

  return {
    createTaskQueues: createTaskQueues,
    createWorker: createWorker,
    createWorkers: createWorkers,
    createWorkflow: createWorkflow,
    createWorkflowActivities: createWorkflowActivities,
    createWorkflowConfig: createWorkflowConfig,
    createWorkspace: createWorkspace,
    deleteByFriendlyName: deleteByFriendlyName,
    findByFriendlyName: findByFriendlyName,
    initClient: initClient,
    initWorkspace: initWorkspace,
    setup: setup,
  };
};
```

After creating our workers, let's set up the Task Queues.

## Create the Task Queues

Next, we set up the Task Queues. Each with a `friendlyName` and a `targetWorkers`, which is an [expression](/docs/taskrouter/api/task-queue) to match Workers. Our Task Queues are:

1. `SMS` - Will target Workers specialized in Programmable SMS, such as Bob, using the expression `'"ProgrammableSMS" in products'`.
2. `Voice` - Will do the same for Programmable Voice Workers, such as Alice, using the expression `'"ProgrammableVoice" in products'`.
3. `Default` - This queue targets all users and can be used when there are no specialist around for the chosen product. We can use the `"1==1"` expression here.

```js title="Create Task Queues" description="lib/workspace.js"
// !mark(69:100)
'use strict';

var twilio = require('twilio');
var find = require('lodash/find');
var map = require('lodash/map');
var difference = require('lodash/difference');
var WORKSPACE_NAME = 'TaskRouter Node Workspace';
var HOST = process.env.HOST;
var EVENT_CALLBACK = `${HOST}/events`;
var ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
var AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

module.exports = function() {
  function initClient(existingWorkspaceSid) {
    if (!existingWorkspaceSid) {
      this.client = twilio(ACCOUNT_SID, AUTH_TOKEN).taskrouter.v1.workspaces;
    } else {
      this.client = twilio(ACCOUNT_SID, AUTH_TOKEN)
      .taskrouter.v1.workspaces(existingWorkspaceSid);
    }
  }

  function createWorker(opts) {
    var ctx = this;

    return this.client.activities.list({friendlyName: 'Idle'})
    .then(function(idleActivity) {
      return ctx.client.workers.create({
        friendlyName: opts.name,
        attributes: JSON.stringify({
          'products': opts.products,
          'contact_uri': opts.phoneNumber,
        }),
        activitySid: idleActivity.sid,
      });
    });
  }

  function createWorkflow() {
    var ctx = this;
    var config = this.createWorkflowConfig();

    return ctx.client.workflows
      .create({
        friendlyName: 'Sales',
        assignmentCallbackUrl: HOST + '/call/assignment',
        fallbackAssignmentCallbackUrl: HOST + '/call/assignment',
        taskReservationTimeout: 15,
        configuration: config,
      })
      .then(function(workflow) {
        return ctx.client.activities.list()
          .then(function(activities) {
            var idleActivity = find(activities, {friendlyName: 'Idle'});
            var offlineActivity = find(activities, {friendlyName: 'Offline'});

            return {
              workflowSid: workflow.sid,
              activities: {
                idle: idleActivity.sid,
                offline: offlineActivity.sid,
              },
              workspaceSid: ctx.client._solution.sid,
            };
          });
      });
  }

  function createTaskQueues() {
    var ctx = this;
    return this.client.activities.list()
      .then(function(activities) {
        var busyActivity = find(activities, {friendlyName: 'Busy'});
        var reservedActivity = find(activities, {friendlyName: 'Reserved'});

        return Promise.all([
          ctx.client.taskQueues.create({
            friendlyName: 'SMS',
            targetWorkers: 'products HAS "ProgrammableSMS"',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
          ctx.client.taskQueues.create({
            friendlyName: 'Voice',
            targetWorkers: 'products HAS "ProgrammableVoice"',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
          ctx.client.taskQueues.create({
            friendlyName: 'Default',
            targetWorkers: '1==1',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
        ])
        .then(function(queues) {
          ctx.queues = queues;
        });
      });
  }

  function createWorkers() {
    var ctx = this;

    return Promise.all([
      ctx.createWorker({
        name: 'Bob',
        phoneNumber: process.env.BOB_NUMBER,
        products: ['ProgrammableSMS'],
      }),
      ctx.createWorker({
        name: 'Alice',
        phoneNumber: process.env.ALICE_NUMBER,
        products: ['ProgrammableVoice'],
      })
    ])
    .then(function(workers) {
      var bobWorker = workers[0];
      var aliceWorker = workers[1];
      var workerInfo = {};

      workerInfo[process.env.ALICE_NUMBER] = aliceWorker.sid;
      workerInfo[process.env.BOB_NUMBER] = bobWorker.sid;

      return workerInfo;
    });
  }

  function createWorkflowActivities() {
    var ctx = this;
    var activityNames = ['Idle', 'Busy', 'Offline', 'Reserved'];

    return ctx.client.activities.list()
      .then(function(activities) {
        var existingActivities = map(activities, 'friendlyName');

        var missingActivities = difference(activityNames, existingActivities);

        var newActivities = map(missingActivities, function(friendlyName) {
          return ctx.client.activities
            .create({
              friendlyName: friendlyName,
              available: 'true'
            });
        });

        return Promise.all(newActivities);
      })
      .then(function() {
        return ctx.client.activities.list();
      });
  }

  function createWorkflowConfig() {
    var queues = this.queues;

    if (!queues) {
      throw new Error('Queues must be initialized.');
    }

    var defaultTarget = {
      queue: find(queues, {friendlyName: 'Default'}).sid,
      timeout: 30,
      priority: 1,
    };

    var smsTarget = {
      queue: find(queues, {friendlyName: 'SMS'}).sid,
      timeout: 30,
      priority: 5,
    };

    var voiceTarget = {
      queue: find(queues, {friendlyName: 'Voice'}).sid,
      timeout: 30,
      priority: 5,
    };

    var rules = [
      {
        expression: 'selected_product=="ProgrammableSMS"',
        targets: [smsTarget, defaultTarget],
        timeout: 30,
      },
      {
        expression: 'selected_product=="ProgrammableVoice"',
        targets: [voiceTarget, defaultTarget],
        timeout: 30,
      },
    ];

    var config = {
      task_routing: {
        filters: rules,
        default_filter: defaultTarget,
      },
    };

    return JSON.stringify(config);
  }

  function setup() {
    var ctx = this;

    ctx.initClient();

    return this.initWorkspace()
      .then(createWorkflowActivities.bind(ctx))
      .then(createTaskQueues.bind(ctx))
      .then(createWorkflow.bind(ctx))
      .then(function(workspaceInfo) {
        return ctx.createWorkers()
        .then(function(workerInfo) {
          return [workerInfo, workspaceInfo];
        });
      });
  }

  function findByFriendlyName(friendlyName) {
    var client = this.client;

    return client.list()
      .then(function (data) {
        return find(data, {friendlyName: friendlyName});
      });
  }

  function deleteByFriendlyName(friendlyName) {
    var ctx = this;

    return this.findByFriendlyName(friendlyName)
      .then(function(workspace) {
        if (workspace.remove) {
          return workspace.remove();
        }
      });
  }

  function createWorkspace() {
    return this.client.create({
      friendlyName: WORKSPACE_NAME,
      EVENT_CALLBACKUrl: EVENT_CALLBACK,
    });
  }

  function initWorkspace() {
    var ctx = this;
    var client = this.client;

    return ctx.findByFriendlyName(WORKSPACE_NAME)
      .then(function(workspace) {
        var newWorkspace;

        if (workspace) {
         newWorkspace = ctx.deleteByFriendlyName(WORKSPACE_NAME)
                   .then(createWorkspace.bind(ctx));
        } else {
         newWorkspace = ctx.createWorkspace();
        }

        return newWorkspace;
      })
      .then(function(workspace) {
        ctx.initClient(workspace.sid);

        return workspace;
      });
  }

  return {
    createTaskQueues: createTaskQueues,
    createWorker: createWorker,
    createWorkers: createWorkers,
    createWorkflow: createWorkflow,
    createWorkflowActivities: createWorkflowActivities,
    createWorkflowConfig: createWorkflowConfig,
    createWorkspace: createWorkspace,
    deleteByFriendlyName: deleteByFriendlyName,
    findByFriendlyName: findByFriendlyName,
    initClient: initClient,
    initWorkspace: initWorkspace,
    setup: setup,
  };
};
```

We have a Workspace, Workers and Task Queues... what's left? A Workflow. Let's see how to create one next!

## Create a Workflow

Finally, we create the Workflow using the following parameters:

1. `friendlyName` as the name of a Workflow.
2. `assignmentCallbackUrl` and `fallbackAssignmentCallbackUrl` as the public URL where a request will be made when this Workflow assigns a Task to a Worker. We will learn how to implement it on the next steps.
3. `taskReservationTimeout` as the maximum time we want to wait until a Worker is available for handling a Task.
4. `configuration` which is a set of rules for placing Tasks into Task Queues. The routing configuration will take a Task's attribute and match this with Task Queues. This application's Workflow rules are defined as:

   * `"selected_product==\ "ProgrammableSMS\""` expression for `SMS` Task Queue. This expression will match any Task with `ProgrammableSMS` as the `selected_product` attribute.
   * `"selected_product==\ "ProgrammableVoice\""` expression for `Voice` Task Queue.

```js title="Create a Workflow" description="lib/workspace.js"
// !mark(129:200)
'use strict';

var twilio = require('twilio');
var find = require('lodash/find');
var map = require('lodash/map');
var difference = require('lodash/difference');
var WORKSPACE_NAME = 'TaskRouter Node Workspace';
var HOST = process.env.HOST;
var EVENT_CALLBACK = `${HOST}/events`;
var ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
var AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

module.exports = function() {
  function initClient(existingWorkspaceSid) {
    if (!existingWorkspaceSid) {
      this.client = twilio(ACCOUNT_SID, AUTH_TOKEN).taskrouter.v1.workspaces;
    } else {
      this.client = twilio(ACCOUNT_SID, AUTH_TOKEN)
      .taskrouter.v1.workspaces(existingWorkspaceSid);
    }
  }

  function createWorker(opts) {
    var ctx = this;

    return this.client.activities.list({friendlyName: 'Idle'})
    .then(function(idleActivity) {
      return ctx.client.workers.create({
        friendlyName: opts.name,
        attributes: JSON.stringify({
          'products': opts.products,
          'contact_uri': opts.phoneNumber,
        }),
        activitySid: idleActivity.sid,
      });
    });
  }

  function createWorkflow() {
    var ctx = this;
    var config = this.createWorkflowConfig();

    return ctx.client.workflows
      .create({
        friendlyName: 'Sales',
        assignmentCallbackUrl: HOST + '/call/assignment',
        fallbackAssignmentCallbackUrl: HOST + '/call/assignment',
        taskReservationTimeout: 15,
        configuration: config,
      })
      .then(function(workflow) {
        return ctx.client.activities.list()
          .then(function(activities) {
            var idleActivity = find(activities, {friendlyName: 'Idle'});
            var offlineActivity = find(activities, {friendlyName: 'Offline'});

            return {
              workflowSid: workflow.sid,
              activities: {
                idle: idleActivity.sid,
                offline: offlineActivity.sid,
              },
              workspaceSid: ctx.client._solution.sid,
            };
          });
      });
  }

  function createTaskQueues() {
    var ctx = this;
    return this.client.activities.list()
      .then(function(activities) {
        var busyActivity = find(activities, {friendlyName: 'Busy'});
        var reservedActivity = find(activities, {friendlyName: 'Reserved'});

        return Promise.all([
          ctx.client.taskQueues.create({
            friendlyName: 'SMS',
            targetWorkers: 'products HAS "ProgrammableSMS"',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
          ctx.client.taskQueues.create({
            friendlyName: 'Voice',
            targetWorkers: 'products HAS "ProgrammableVoice"',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
          ctx.client.taskQueues.create({
            friendlyName: 'Default',
            targetWorkers: '1==1',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
        ])
        .then(function(queues) {
          ctx.queues = queues;
        });
      });
  }

  function createWorkers() {
    var ctx = this;

    return Promise.all([
      ctx.createWorker({
        name: 'Bob',
        phoneNumber: process.env.BOB_NUMBER,
        products: ['ProgrammableSMS'],
      }),
      ctx.createWorker({
        name: 'Alice',
        phoneNumber: process.env.ALICE_NUMBER,
        products: ['ProgrammableVoice'],
      })
    ])
    .then(function(workers) {
      var bobWorker = workers[0];
      var aliceWorker = workers[1];
      var workerInfo = {};

      workerInfo[process.env.ALICE_NUMBER] = aliceWorker.sid;
      workerInfo[process.env.BOB_NUMBER] = bobWorker.sid;

      return workerInfo;
    });
  }

  function createWorkflowActivities() {
    var ctx = this;
    var activityNames = ['Idle', 'Busy', 'Offline', 'Reserved'];

    return ctx.client.activities.list()
      .then(function(activities) {
        var existingActivities = map(activities, 'friendlyName');

        var missingActivities = difference(activityNames, existingActivities);

        var newActivities = map(missingActivities, function(friendlyName) {
          return ctx.client.activities
            .create({
              friendlyName: friendlyName,
              available: 'true'
            });
        });

        return Promise.all(newActivities);
      })
      .then(function() {
        return ctx.client.activities.list();
      });
  }

  function createWorkflowConfig() {
    var queues = this.queues;

    if (!queues) {
      throw new Error('Queues must be initialized.');
    }

    var defaultTarget = {
      queue: find(queues, {friendlyName: 'Default'}).sid,
      timeout: 30,
      priority: 1,
    };

    var smsTarget = {
      queue: find(queues, {friendlyName: 'SMS'}).sid,
      timeout: 30,
      priority: 5,
    };

    var voiceTarget = {
      queue: find(queues, {friendlyName: 'Voice'}).sid,
      timeout: 30,
      priority: 5,
    };

    var rules = [
      {
        expression: 'selected_product=="ProgrammableSMS"',
        targets: [smsTarget, defaultTarget],
        timeout: 30,
      },
      {
        expression: 'selected_product=="ProgrammableVoice"',
        targets: [voiceTarget, defaultTarget],
        timeout: 30,
      },
    ];

    var config = {
      task_routing: {
        filters: rules,
        default_filter: defaultTarget,
      },
    };

    return JSON.stringify(config);
  }

  function setup() {
    var ctx = this;

    ctx.initClient();

    return this.initWorkspace()
      .then(createWorkflowActivities.bind(ctx))
      .then(createTaskQueues.bind(ctx))
      .then(createWorkflow.bind(ctx))
      .then(function(workspaceInfo) {
        return ctx.createWorkers()
        .then(function(workerInfo) {
          return [workerInfo, workspaceInfo];
        });
      });
  }

  function findByFriendlyName(friendlyName) {
    var client = this.client;

    return client.list()
      .then(function (data) {
        return find(data, {friendlyName: friendlyName});
      });
  }

  function deleteByFriendlyName(friendlyName) {
    var ctx = this;

    return this.findByFriendlyName(friendlyName)
      .then(function(workspace) {
        if (workspace.remove) {
          return workspace.remove();
        }
      });
  }

  function createWorkspace() {
    return this.client.create({
      friendlyName: WORKSPACE_NAME,
      EVENT_CALLBACKUrl: EVENT_CALLBACK,
    });
  }

  function initWorkspace() {
    var ctx = this;
    var client = this.client;

    return ctx.findByFriendlyName(WORKSPACE_NAME)
      .then(function(workspace) {
        var newWorkspace;

        if (workspace) {
         newWorkspace = ctx.deleteByFriendlyName(WORKSPACE_NAME)
                   .then(createWorkspace.bind(ctx));
        } else {
         newWorkspace = ctx.createWorkspace();
        }

        return newWorkspace;
      })
      .then(function(workspace) {
        ctx.initClient(workspace.sid);

        return workspace;
      });
  }

  return {
    createTaskQueues: createTaskQueues,
    createWorker: createWorker,
    createWorkers: createWorkers,
    createWorkflow: createWorkflow,
    createWorkflowActivities: createWorkflowActivities,
    createWorkflowConfig: createWorkflowConfig,
    createWorkspace: createWorkspace,
    deleteByFriendlyName: deleteByFriendlyName,
    findByFriendlyName: findByFriendlyName,
    initClient: initClient,
    initWorkspace: initWorkspace,
    setup: setup,
  };
};
```

Our workspace is completely setup. Now it's time to see how we use it to route calls.

## Handle Twilio's Request

Right after receiving a call, Twilio will send a request to the URL specified on the [number's configuration](/console/phone-numbers/incoming).

The endpoint will then process the request and generate a TwiML response. We'll use the [Say](/docs/voice/twiml/say) verb to give the user product alternatives they can select by pressing a key. The [Gather](/docs/voice/twiml/gather) verb allows us to capture the user's key press.

```js title="Handling Twilio's Requests" description="routes/call.js"
// !mark(7:19)
'use strict';

var express = require('express'),
    router = express.Router(),
    VoiceResponse = require('twilio/lib/twiml/VoiceResponse');

module.exports = function (app) {
  // POST /call/incoming
  router.post('/incoming/', function (req, res) {
    var twimlResponse = new VoiceResponse();
    var gather = twimlResponse.gather({
      numDigits: 1,
      action: '/call/enqueue',
      method: 'POST'
    });
    gather.say('For Programmable SMS, press one. For Voice, press any other key.');
    res.type('text/xml');
    res.send(twimlResponse.toString());
  });

  // POST /call/enqueue
  router.post('/enqueue/', function (req, res) {
    var pressedKey = req.body.Digits;
    var twimlResponse = new VoiceResponse();
    var selectedProduct = (pressedKey === '1') ? 'ProgrammableSMS' : 'ProgrammableVoice';
    var enqueue = twimlResponse.enqueueTask(
      {workflowSid: app.get('workspaceInfo').workflowSid}
    );
    enqueue.task({}, JSON.stringify({selected_product: selectedProduct}));

    res.type('text/xml');
    res.send(twimlResponse.toString());
  });

  // POST /call/assignment
  router.post('/assignment/', function (req, res) {
    res.type('application/json');
    res.send({
      instruction: "dequeue",
      post_work_activity_sid: app.get('workspaceInfo').activities.idle
    });
  });

  return router;
};
```

We just asked the caller to choose a product, next we will use their choice to create the appropriate Task.

## Create a Task

This is the endpoint set as the `action` URL on the `Gather` verb on the previous step. A request is made to this endpoint when the user presses a key during the call. This request has a `Digits` parameter that holds the pressed keys. A `Task` will be created based on the pressed digit with the `selected_product` as an attribute. The Workflow will take this Task's attributes and match with the [configured expressions](/docs/taskrouter/expression-syntax) in order to find a Task Queue for this Task, so an appropriate available Worker can be assigned to handle it.

We use the [`Enqueue` verb](/docs/voice/twiml/enqueue) with a `WorkflowSid` attribute to [integrate with TaskRouter](/docs/taskrouter/twiml-queue-calls#using-enqueue-to-route-calls-with-taskrouter). Then the voice call will be put on hold while TaskRouter tries to find an available Worker to handle this Task.

```js title="Create a Task" description="routes/call.js"
// !mark(21:33)
'use strict';

var express = require('express'),
    router = express.Router(),
    VoiceResponse = require('twilio/lib/twiml/VoiceResponse');

module.exports = function (app) {
  // POST /call/incoming
  router.post('/incoming/', function (req, res) {
    var twimlResponse = new VoiceResponse();
    var gather = twimlResponse.gather({
      numDigits: 1,
      action: '/call/enqueue',
      method: 'POST'
    });
    gather.say('For Programmable SMS, press one. For Voice, press any other key.');
    res.type('text/xml');
    res.send(twimlResponse.toString());
  });

  // POST /call/enqueue
  router.post('/enqueue/', function (req, res) {
    var pressedKey = req.body.Digits;
    var twimlResponse = new VoiceResponse();
    var selectedProduct = (pressedKey === '1') ? 'ProgrammableSMS' : 'ProgrammableVoice';
    var enqueue = twimlResponse.enqueueTask(
      {workflowSid: app.get('workspaceInfo').workflowSid}
    );
    enqueue.task({}, JSON.stringify({selected_product: selectedProduct}));

    res.type('text/xml');
    res.send(twimlResponse.toString());
  });

  // POST /call/assignment
  router.post('/assignment/', function (req, res) {
    res.type('application/json');
    res.send({
      instruction: "dequeue",
      post_work_activity_sid: app.get('workspaceInfo').activities.idle
    });
  });

  return router;
};
```

After sending a Task to Twilio, let's see how we tell TaskRouter which Worker to use to execute that task.

## Assign a Worker

When TaskRouter selects a Worker, it does the following:

1. The Task's Assignment Status is set to 'reserved'.
2. A [Reservation instance](/docs/taskrouter/api/reservations) is generated, linking the Task to the selected Worker.
3. At the same time the Reservation is created, a `POST` request is made to the Workflow's AssignmentCallbackURL, which was configured while creating the Workflow. This request includes the full details of the Task, the selected Worker, and the Reservation.

Handling this [Assignment Callback](/docs/taskrouter/handle-assignment-callbacks) is a key component of building a TaskRouter application as we can instruct how the Worker will handle a Task. We could send a text, email, push notifications or make a call.

Since we created this Task during a voice call with an `Enqueue` verb, lets [instruct TaskRouter to dequeue](/docs/taskrouter/handle-assignment-callbacks#dequeue-call) the call and dial a Worker. If we do not specify a `to` parameter with a phone number, TaskRouter will pick the Worker's `contact_uri` attribute.

We also send a `post_work_activity_sid` which will tell TaskRouter which Activity to assign this worker after the call ends.

```js title="Assign a Worker" description="routes/call.js"
// !mark(35:42)
'use strict';

var express = require('express'),
    router = express.Router(),
    VoiceResponse = require('twilio/lib/twiml/VoiceResponse');

module.exports = function (app) {
  // POST /call/incoming
  router.post('/incoming/', function (req, res) {
    var twimlResponse = new VoiceResponse();
    var gather = twimlResponse.gather({
      numDigits: 1,
      action: '/call/enqueue',
      method: 'POST'
    });
    gather.say('For Programmable SMS, press one. For Voice, press any other key.');
    res.type('text/xml');
    res.send(twimlResponse.toString());
  });

  // POST /call/enqueue
  router.post('/enqueue/', function (req, res) {
    var pressedKey = req.body.Digits;
    var twimlResponse = new VoiceResponse();
    var selectedProduct = (pressedKey === '1') ? 'ProgrammableSMS' : 'ProgrammableVoice';
    var enqueue = twimlResponse.enqueueTask(
      {workflowSid: app.get('workspaceInfo').workflowSid}
    );
    enqueue.task({}, JSON.stringify({selected_product: selectedProduct}));

    res.type('text/xml');
    res.send(twimlResponse.toString());
  });

  // POST /call/assignment
  router.post('/assignment/', function (req, res) {
    res.type('application/json');
    res.send({
      instruction: "dequeue",
      post_work_activity_sid: app.get('workspaceInfo').activities.idle
    });
  });

  return router;
};
```

Now that our Tasks are routed properly, let's deal with missed calls in the next step.

## Collect Missed Calls

This endpoint will be called after each [TaskRouter Event](/docs/taskrouter/api/event) is triggered. In our application, we are trying to collect missed calls, so we would like to handle the `workflow.timeout` event. This event is triggered when the Task waits more than the limit set on the Workflow Configuration-- or rather when no worker is available.

Here we use TwilioRestClient to route this call to a [Voicemail Twimlet](/labs/twimlets/voicemail). Twimlets are tiny web applications for voice. This one will generate a `TwiML` response using `Say` verb and record a message using `Record` verb. The recorded message will then be transcribed and sent to the email address configured.

Note that we are also listening for `task.canceled`. This is triggered when the customer hangs up before being assigned to an agent, therefore canceling the task. Capturing this event allows us to collect the information from the customers that hang up before the Workflow times out.

```js title="Collect Missed Calls" description="routes/events.js"
// !mark(10:69)
'use strict';

var express = require('express'),
  MissedCall = require('../models/missed-call'),
  util = require('util'),
  querystring = require('querystring'),
  router = express.Router(),
  Q = require('q');

// POST /events
router.post('/', function (req, res) {
  var eventType = req.body.EventType;
  var taskAttributes = (req.body.TaskAttributes)? JSON.parse(req.body.TaskAttributes) : {};

  function saveMissedCall(){
    return MissedCall.create({
      selectedProduct: taskAttributes.selected_product,
      phoneNumber: taskAttributes.from
    });
  }

  var eventHandler = {
    'task.canceled': saveMissedCall,
    'workflow.timeout': function() {
      return saveMissedCall().then(voicemail(taskAttributes.call_sid));
    },
    'worker.activity.update': function(){
      var workerAttributes = JSON.parse(req.body.WorkerAttributes);
      if (req.body.WorkerActivityName === 'Offline') {
        notifyOfflineStatus(workerAttributes.contact_uri);
      }
      return Q.resolve({});
    },
    'default': function() { return Q.resolve({}); }
  };

  (eventHandler[eventType] || eventHandler['default'])().then(function () {
    res.json({});
  });
});

function voicemail (callSid){
  var client = buildClient(),
      query = querystring.stringify({
        Message: 'Sorry, All agents are busy. Please leave a message. We\'ll call you as soon as possible',
        Email: process.env.MISSED_CALLS_EMAIL_ADDRESS}),
      voicemailUrl = util.format("https://twimlets.com/voicemail?%s", query);

  client.calls(callSid).update({
    method: 'POST',
    url: voicemailUrl
  });
}

function notifyOfflineStatus(phone_number) {
  var client = buildClient(),
      message = 'Your status has changed to Offline. Reply with "On" to get back Online';
  client.sendMessage({
    to: phone_number,
    from: process.env.TWILIO_NUMBER,
    body: message
  });
}

function buildClient() {
  var accountSid = process.env.TWILIO_ACCOUNT_SID,
      authToken = process.env.TWILIO_AUTH_TOKEN;
  return require('twilio')(accountSid, authToken);
}

module.exports = router;
```

Most of the features of our application are implemented. The last piece is allowing the Workers to change their availability status. Let's see how to do that next.

## Change a Worker's Activity

We have created this endpoint, so a worker can send an SMS message to the support line with the command "On" or "Off" to change their availability status.

This is important as a worker's activity will change to `Offline` when they miss a call. When this happens, they receive an SMS letting them know that their activity has changed, and that they can reply with the `On` command to make themselves available for incoming calls again.

```js title="Handle Message to update the Worker Status" description="routes/sms.js"
// !mark(8:25)
'use strict';

var express = require('express'),
    router = express.Router(),
    twimlGenerator = require('../lib/twiml-generator');

module.exports = function (app) {
  // POST /sms/incoming
  router.post('/incoming/', function (req, res) {
    var targetActivity = (req.body.Body.toLowerCase() === "on")? "idle":"offline";
    var activitySid = app.get('workspaceInfo').activities[targetActivity];
    changeWorkerActivitySid(req.body.From, activitySid);
    res.type('text/xml');
    res.send(twimlGenerator.generateConfirmMessage(targetActivity));
  });

  function changeWorkerActivitySid(workerNumber, activitySid){
    var accountSid = process.env.TWILIO_ACCOUNT_SID,
        authToken = process.env.TWILIO_AUTH_TOKEN,
        workspaceSid = app.get('workspaceInfo').workspaceSid,
        workerSid = app.get('workerInfo')[workerNumber],
        twilio = require('twilio'),
        client = new twilio.TaskRouterClient(accountSid, authToken, workspaceSid);
    client.workspace.workers(workerSid).update({activitySid: activitySid});
  }
  return router;
};
```

Congratulations! You finished this tutorial. As you can see, using Twilio's TaskRouter is quite simple.

## Where to Next?

If you're a Node.js/Express developer working with Twilio, you might enjoy these other tutorials:

**[Warm-Transfer](/blog/warm-transfer-nodejs-express)**

Have you ever been disconnected from a support call while being transferred to another support agent? Warm transfer eliminates this problem. Using Twilio powered warm transfers your agents will have the ability to conference in another agent in realtime.

**[Automated-Survey](https://www.twilio.com/blog/automated-survey-nodejs-express)**

Instantly collect structured data from your users with a survey conducted over a call or SMS text messages.
