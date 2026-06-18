# Dynamic Call Center with C# and ASP.NET MVC

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

In this ASP.NET MVC application this step will be executed in the `Application_Start` event every time you run the app.

A [Workspace](/docs/taskrouter/api/workspace) is the container element for any TaskRouter application. The elements are:

* [Tasks](/docs/taskrouter/api/task) - Represents a customer trying to contact an agent
* [Workers](/docs/taskrouter/api/worker) - The agents responsible for handling Tasks
* [Task Queues](/docs/taskrouter/api/task-queue) - Holds Tasks to be consumed by a set of Workers
* [Workflows](/docs/taskrouter/api/workflow) - Responsible for placing Tasks into Task Queues
* [Activities](/docs/taskrouter/api/activity) - Possible states of a Worker. Eg: idle, offline, busy

We'll use a `TaskRouterClient` provided in the [twilio-csharp](https://github.com/twilio/twilio-csharp) SDK to create and configure the workspace.

```cs title="Create, Setup and Configure the Workspace" description="TaskRouter.Web/App_Start/WorkspaceConfig.cs"
// !mark(62:67,69:82)
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Helpers;
using TaskRouter.Web.Infrastructure;
using Twilio;
using Twilio.Rest.Taskrouter.V1;
using Twilio.Rest.Taskrouter.V1.Workspace;

namespace TaskRouter.Web
{
    public class WorkspaceConfig
    {
        private readonly Config _config;

        private const string VoiceQueue = "VoiceQueue";
        private const string SmsQueue = "SMSQueue";
        private const string AllQueue = "AllQueue";

        public static void RegisterWorkspace()
        {
            new WorkspaceConfig().Register();
        }

        public WorkspaceConfig():this(new Config())
        {
        }

        public WorkspaceConfig(Config config)
        {
            TwilioClient.Init(config.AccountSID, config.AuthToken);
            _config = config;

        }

        public WorkspaceConfig(Type workspaceResource):this()
        {
        }

        public virtual ActivityResource GetActivityByFriendlyName(string workspaceSid, string friendlyName)
        {
            return ActivityResource.Read(workspaceSid, friendlyName).First();
        }

        public virtual ActivityResource CreateActivityWithFriendlyName(string workspaceSid, string friendlyName)
        {
            return ActivityResource.Create(workspaceSid, friendlyName);
        }

        public virtual WorkspaceResource GetWorkspaceByFriendlyName(string friendlyName)
        {
            return WorkspaceResource.Read(friendlyName).FirstOrDefault();
        }

        public virtual WorkspaceResource CreateWorkspace(string friendlyName, Uri eventCallbackUrl)
        {
            return WorkspaceResource.Create(friendlyName, eventCallbackUrl);
        }

        public virtual bool DeleteWorkspace(string workspaceSid)
        {
            return WorkspaceResource.Delete(workspaceSid);
        }

        public virtual WorkerResource CreateWorker(string workspaceSid, string bob, string activitySid, string attributes)
        {
            return WorkerResource.Create(workspaceSid, bob, activitySid, attributes);
        }

        public void Register()
        {
            var workspace = DeleteAndCreateWorkspace(
                "Twilio Workspace", new Uri(new Uri(_config.HostUrl), "/callback/events").AbsoluteUri);
            var workspaceSid = workspace.Sid;

            var assignmentActivity = GetActivityByFriendlyName(workspaceSid, "Unavailable");
            var idleActivity = GetActivityByFriendlyName(workspaceSid, "Available");
            var reservationActivity = CreateActivityWithFriendlyName(workspaceSid, "Reserved");
            var offlineActivity = GetActivityByFriendlyName(workspaceSid, "Offline");

            var workers = CreateWorkers(workspaceSid, idleActivity);
            var taskQueues = CreateTaskQueues(workspaceSid, assignmentActivity, reservationActivity);
            var workflow = CreateWorkflow(workspaceSid, taskQueues);

            Singleton.Instance.WorkspaceSid = workspaceSid;
            Singleton.Instance.WorkflowSid = workflow.Sid;
            Singleton.Instance.Workers = workers;
            Singleton.Instance.PostWorkActivitySid = idleActivity.Sid;
            Singleton.Instance.IdleActivitySid = idleActivity.Sid;
            Singleton.Instance.OfflineActivitySid = offlineActivity.Sid;
        }

        public virtual WorkspaceResource DeleteAndCreateWorkspace(string friendlyName, string eventCallbackUrl) {
            var workspace = GetWorkspaceByFriendlyName(friendlyName);
            if (workspace != null)
            {
                DeleteWorkspace(workspace.Sid);
            }

            return CreateWorkspace(friendlyName, new Uri(eventCallbackUrl));
        }

        private IDictionary<string, string> CreateWorkers(string workspaceSid, ActivityResource activity)
        {
            var attributesForBob = new
            {
                products = new List<object>()
                {
                    "ProgrammableSMS"
                },
                contact_uri = _config.AgentForProgrammableSMS
            };

            var bobWorker = CreateWorker(workspaceSid, "Bob", activity.Sid, Json.Encode(attributesForBob));

            var attributesForAlice = new
            {
                products = new List<object>()
                {
                    "ProgrammableVoice"
                },
                contact_uri = _config.AgentForProgrammableVoice
            };

            var alice = CreateWorker(workspaceSid, "Alice", activity.Sid, Json.Encode(attributesForAlice));

            return new Dictionary<string, string>
            {
                { _config.AgentForProgrammableSMS, bobWorker.Sid },
                { _config.AgentForProgrammableVoice, alice.Sid },
            };
        }

        public virtual TaskQueueResource CreateTaskQueue(
            string workspaceSid, string friendlyName,
            string assignmentActivitySid, string reservationActivitySid, string targetWorkers)
        {
            var queue = TaskQueueResource.Create(
                workspaceSid,
                friendlyName: friendlyName,
                assignmentActivitySid: assignmentActivitySid,
                reservationActivitySid: reservationActivitySid
            );

            TaskQueueResource.Update(
                workspaceSid,
                queue.Sid,
                friendlyName,
                targetWorkers,
                assignmentActivitySid,
                reservationActivitySid,
                1);

            return queue;
        }

        private IDictionary<string, TaskQueueResource> CreateTaskQueues(
            string workspaceSid, ActivityResource assignmentActivity, ActivityResource reservationActivity)
        {

            var voiceQueue = CreateTaskQueue(
                workspaceSid, "Voice",
                assignmentActivity.Sid, reservationActivity.Sid, "products HAS 'ProgrammableVoice'");

            var smsQueue = CreateTaskQueue(
                workspaceSid, "SMS",
                assignmentActivity.Sid, reservationActivity.Sid, "products HAS 'ProgrammableSMS'");

            var allQueue = CreateTaskQueue(
                workspaceSid, "All",
                assignmentActivity.Sid, reservationActivity.Sid, "1 == 1");

            return new Dictionary<string, TaskQueueResource> {
                { VoiceQueue, voiceQueue },
                { SmsQueue, smsQueue },
                { AllQueue, allQueue }
            };
        }

        public virtual WorkflowResource CreateWorkflow(string workspaceSid, IDictionary<string, TaskQueueResource> taskQueues)
        {
            var voiceQueue = taskQueues[VoiceQueue];
            var smsQueue = taskQueues[SmsQueue];
            var allQueue = taskQueues[AllQueue];

            var voiceFilter = new {
                friendlyName = "Voice",
                expression = "selected_product==\"ProgrammableVoice\"",
                targets = new List<object>() {
                    new { queue = voiceQueue.Sid, Priority = "5", Timeout = "30" },
                    new { queue = allQueue.Sid, Expression = "1==1", Priority = "1", Timeout = "30" }
                }
            };

            var smsFilter = new {
                friendlyName = "SMS",
                expression = "selected_product==\"ProgrammableSMS\"",
                targets = new List<object>() {
                    new { queue = smsQueue.Sid, Priority = "5", Timeout = "30" },
                    new { queue = allQueue.Sid, Expression = "1==1", Priority = "1", Timeout = "30" }
                }
            };

            var workflowConfiguration = new
            {
                task_routing = new
                {
                    filters = new List<object>()
                    {
                        voiceFilter,
                        smsFilter
                    },
                    default_filter = new
                    {
                        queue = allQueue.Sid,
                        expression = "1==1",
                        priority = "1",
                        timeout = "30"
                    }
                }
            };

            // Call REST API
            return WorkflowResource.Create(
                workspaceSid,
                "Tech Support",
                Json.Encode(workflowConfiguration),
                new Uri($"{_config.HostUrl}/callback/assignment"),
                new Uri($"{_config.HostUrl}/callback/assignment"),
                15);
        }
    }
}
```

Now let's look in more detail at all the steps, starting with the creation of the workspace itself.

## Create a Workspace

Before [creating a workspace](/docs/taskrouter/api/workspace#create-a-workspace-resource), we need to delete any others with the same `friendlyName` as the one we are trying to create. In order to create a workspace we need to provide a `friendlyName` and a `eventCallbackUrl` where a requests will be made every time an event is triggered in our workspace.

```cs title="Create Workspace" description="TaskRouter.Web/App_Start/WorkspaceConfig.cs"
// !mark(84:92)
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Helpers;
using TaskRouter.Web.Infrastructure;
using Twilio;
using Twilio.Rest.Taskrouter.V1;
using Twilio.Rest.Taskrouter.V1.Workspace;

namespace TaskRouter.Web
{
    public class WorkspaceConfig
    {
        private readonly Config _config;

        private const string VoiceQueue = "VoiceQueue";
        private const string SmsQueue = "SMSQueue";
        private const string AllQueue = "AllQueue";

        public static void RegisterWorkspace()
        {
            new WorkspaceConfig().Register();
        }

        public WorkspaceConfig():this(new Config())
        {
        }

        public WorkspaceConfig(Config config)
        {
            TwilioClient.Init(config.AccountSID, config.AuthToken);
            _config = config;

        }

        public WorkspaceConfig(Type workspaceResource):this()
        {
        }

        public virtual ActivityResource GetActivityByFriendlyName(string workspaceSid, string friendlyName)
        {
            return ActivityResource.Read(workspaceSid, friendlyName).First();
        }

        public virtual ActivityResource CreateActivityWithFriendlyName(string workspaceSid, string friendlyName)
        {
            return ActivityResource.Create(workspaceSid, friendlyName);
        }

        public virtual WorkspaceResource GetWorkspaceByFriendlyName(string friendlyName)
        {
            return WorkspaceResource.Read(friendlyName).FirstOrDefault();
        }

        public virtual WorkspaceResource CreateWorkspace(string friendlyName, Uri eventCallbackUrl)
        {
            return WorkspaceResource.Create(friendlyName, eventCallbackUrl);
        }

        public virtual bool DeleteWorkspace(string workspaceSid)
        {
            return WorkspaceResource.Delete(workspaceSid);
        }

        public virtual WorkerResource CreateWorker(string workspaceSid, string bob, string activitySid, string attributes)
        {
            return WorkerResource.Create(workspaceSid, bob, activitySid, attributes);
        }

        public void Register()
        {
            var workspace = DeleteAndCreateWorkspace(
                "Twilio Workspace", new Uri(new Uri(_config.HostUrl), "/callback/events").AbsoluteUri);
            var workspaceSid = workspace.Sid;

            var assignmentActivity = GetActivityByFriendlyName(workspaceSid, "Unavailable");
            var idleActivity = GetActivityByFriendlyName(workspaceSid, "Available");
            var reservationActivity = CreateActivityWithFriendlyName(workspaceSid, "Reserved");
            var offlineActivity = GetActivityByFriendlyName(workspaceSid, "Offline");

            var workers = CreateWorkers(workspaceSid, idleActivity);
            var taskQueues = CreateTaskQueues(workspaceSid, assignmentActivity, reservationActivity);
            var workflow = CreateWorkflow(workspaceSid, taskQueues);

            Singleton.Instance.WorkspaceSid = workspaceSid;
            Singleton.Instance.WorkflowSid = workflow.Sid;
            Singleton.Instance.Workers = workers;
            Singleton.Instance.PostWorkActivitySid = idleActivity.Sid;
            Singleton.Instance.IdleActivitySid = idleActivity.Sid;
            Singleton.Instance.OfflineActivitySid = offlineActivity.Sid;
        }

        public virtual WorkspaceResource DeleteAndCreateWorkspace(string friendlyName, string eventCallbackUrl) {
            var workspace = GetWorkspaceByFriendlyName(friendlyName);
            if (workspace != null)
            {
                DeleteWorkspace(workspace.Sid);
            }

            return CreateWorkspace(friendlyName, new Uri(eventCallbackUrl));
        }

        private IDictionary<string, string> CreateWorkers(string workspaceSid, ActivityResource activity)
        {
            var attributesForBob = new
            {
                products = new List<object>()
                {
                    "ProgrammableSMS"
                },
                contact_uri = _config.AgentForProgrammableSMS
            };

            var bobWorker = CreateWorker(workspaceSid, "Bob", activity.Sid, Json.Encode(attributesForBob));

            var attributesForAlice = new
            {
                products = new List<object>()
                {
                    "ProgrammableVoice"
                },
                contact_uri = _config.AgentForProgrammableVoice
            };

            var alice = CreateWorker(workspaceSid, "Alice", activity.Sid, Json.Encode(attributesForAlice));

            return new Dictionary<string, string>
            {
                { _config.AgentForProgrammableSMS, bobWorker.Sid },
                { _config.AgentForProgrammableVoice, alice.Sid },
            };
        }

        public virtual TaskQueueResource CreateTaskQueue(
            string workspaceSid, string friendlyName,
            string assignmentActivitySid, string reservationActivitySid, string targetWorkers)
        {
            var queue = TaskQueueResource.Create(
                workspaceSid,
                friendlyName: friendlyName,
                assignmentActivitySid: assignmentActivitySid,
                reservationActivitySid: reservationActivitySid
            );

            TaskQueueResource.Update(
                workspaceSid,
                queue.Sid,
                friendlyName,
                targetWorkers,
                assignmentActivitySid,
                reservationActivitySid,
                1);

            return queue;
        }

        private IDictionary<string, TaskQueueResource> CreateTaskQueues(
            string workspaceSid, ActivityResource assignmentActivity, ActivityResource reservationActivity)
        {

            var voiceQueue = CreateTaskQueue(
                workspaceSid, "Voice",
                assignmentActivity.Sid, reservationActivity.Sid, "products HAS 'ProgrammableVoice'");

            var smsQueue = CreateTaskQueue(
                workspaceSid, "SMS",
                assignmentActivity.Sid, reservationActivity.Sid, "products HAS 'ProgrammableSMS'");

            var allQueue = CreateTaskQueue(
                workspaceSid, "All",
                assignmentActivity.Sid, reservationActivity.Sid, "1 == 1");

            return new Dictionary<string, TaskQueueResource> {
                { VoiceQueue, voiceQueue },
                { SmsQueue, smsQueue },
                { AllQueue, allQueue }
            };
        }

        public virtual WorkflowResource CreateWorkflow(string workspaceSid, IDictionary<string, TaskQueueResource> taskQueues)
        {
            var voiceQueue = taskQueues[VoiceQueue];
            var smsQueue = taskQueues[SmsQueue];
            var allQueue = taskQueues[AllQueue];

            var voiceFilter = new {
                friendlyName = "Voice",
                expression = "selected_product==\"ProgrammableVoice\"",
                targets = new List<object>() {
                    new { queue = voiceQueue.Sid, Priority = "5", Timeout = "30" },
                    new { queue = allQueue.Sid, Expression = "1==1", Priority = "1", Timeout = "30" }
                }
            };

            var smsFilter = new {
                friendlyName = "SMS",
                expression = "selected_product==\"ProgrammableSMS\"",
                targets = new List<object>() {
                    new { queue = smsQueue.Sid, Priority = "5", Timeout = "30" },
                    new { queue = allQueue.Sid, Expression = "1==1", Priority = "1", Timeout = "30" }
                }
            };

            var workflowConfiguration = new
            {
                task_routing = new
                {
                    filters = new List<object>()
                    {
                        voiceFilter,
                        smsFilter
                    },
                    default_filter = new
                    {
                        queue = allQueue.Sid,
                        expression = "1==1",
                        priority = "1",
                        timeout = "30"
                    }
                }
            };

            // Call REST API
            return WorkflowResource.Create(
                workspaceSid,
                "Tech Support",
                Json.Encode(workflowConfiguration),
                new Uri($"{_config.HostUrl}/callback/assignment"),
                new Uri($"{_config.HostUrl}/callback/assignment"),
                15);
        }
    }
}
```

We have a brand new workspace, now we need workers. Let's create them on the next step.

## Create the Workers

We'll create two workers: Bob and Alice. They each have two attributes: `contact_uri` a phone number and `products`, a list of products each worker is specialized in. We also need to specify an `activity.Sid` and a name for each worker. The selected activity will define the status of the worker.

A set of [default activities](/docs/taskrouter/api/activity) is created with your workspace. We use the `Idle` activity to make a worker available for incoming calls.

```cs title="Create Workers" description="TaskRouter.Web/App_Start/WorkspaceConfig.cs"
// !mark(94:123)
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Helpers;
using TaskRouter.Web.Infrastructure;
using Twilio;
using Twilio.Rest.Taskrouter.V1;
using Twilio.Rest.Taskrouter.V1.Workspace;

namespace TaskRouter.Web
{
    public class WorkspaceConfig
    {
        private readonly Config _config;

        private const string VoiceQueue = "VoiceQueue";
        private const string SmsQueue = "SMSQueue";
        private const string AllQueue = "AllQueue";

        public static void RegisterWorkspace()
        {
            new WorkspaceConfig().Register();
        }

        public WorkspaceConfig():this(new Config())
        {
        }

        public WorkspaceConfig(Config config)
        {
            TwilioClient.Init(config.AccountSID, config.AuthToken);
            _config = config;

        }

        public WorkspaceConfig(Type workspaceResource):this()
        {
        }

        public virtual ActivityResource GetActivityByFriendlyName(string workspaceSid, string friendlyName)
        {
            return ActivityResource.Read(workspaceSid, friendlyName).First();
        }

        public virtual ActivityResource CreateActivityWithFriendlyName(string workspaceSid, string friendlyName)
        {
            return ActivityResource.Create(workspaceSid, friendlyName);
        }

        public virtual WorkspaceResource GetWorkspaceByFriendlyName(string friendlyName)
        {
            return WorkspaceResource.Read(friendlyName).FirstOrDefault();
        }

        public virtual WorkspaceResource CreateWorkspace(string friendlyName, Uri eventCallbackUrl)
        {
            return WorkspaceResource.Create(friendlyName, eventCallbackUrl);
        }

        public virtual bool DeleteWorkspace(string workspaceSid)
        {
            return WorkspaceResource.Delete(workspaceSid);
        }

        public virtual WorkerResource CreateWorker(string workspaceSid, string bob, string activitySid, string attributes)
        {
            return WorkerResource.Create(workspaceSid, bob, activitySid, attributes);
        }

        public void Register()
        {
            var workspace = DeleteAndCreateWorkspace(
                "Twilio Workspace", new Uri(new Uri(_config.HostUrl), "/callback/events").AbsoluteUri);
            var workspaceSid = workspace.Sid;

            var assignmentActivity = GetActivityByFriendlyName(workspaceSid, "Unavailable");
            var idleActivity = GetActivityByFriendlyName(workspaceSid, "Available");
            var reservationActivity = CreateActivityWithFriendlyName(workspaceSid, "Reserved");
            var offlineActivity = GetActivityByFriendlyName(workspaceSid, "Offline");

            var workers = CreateWorkers(workspaceSid, idleActivity);
            var taskQueues = CreateTaskQueues(workspaceSid, assignmentActivity, reservationActivity);
            var workflow = CreateWorkflow(workspaceSid, taskQueues);

            Singleton.Instance.WorkspaceSid = workspaceSid;
            Singleton.Instance.WorkflowSid = workflow.Sid;
            Singleton.Instance.Workers = workers;
            Singleton.Instance.PostWorkActivitySid = idleActivity.Sid;
            Singleton.Instance.IdleActivitySid = idleActivity.Sid;
            Singleton.Instance.OfflineActivitySid = offlineActivity.Sid;
        }

        public virtual WorkspaceResource DeleteAndCreateWorkspace(string friendlyName, string eventCallbackUrl) {
            var workspace = GetWorkspaceByFriendlyName(friendlyName);
            if (workspace != null)
            {
                DeleteWorkspace(workspace.Sid);
            }

            return CreateWorkspace(friendlyName, new Uri(eventCallbackUrl));
        }

        private IDictionary<string, string> CreateWorkers(string workspaceSid, ActivityResource activity)
        {
            var attributesForBob = new
            {
                products = new List<object>()
                {
                    "ProgrammableSMS"
                },
                contact_uri = _config.AgentForProgrammableSMS
            };

            var bobWorker = CreateWorker(workspaceSid, "Bob", activity.Sid, Json.Encode(attributesForBob));

            var attributesForAlice = new
            {
                products = new List<object>()
                {
                    "ProgrammableVoice"
                },
                contact_uri = _config.AgentForProgrammableVoice
            };

            var alice = CreateWorker(workspaceSid, "Alice", activity.Sid, Json.Encode(attributesForAlice));

            return new Dictionary<string, string>
            {
                { _config.AgentForProgrammableSMS, bobWorker.Sid },
                { _config.AgentForProgrammableVoice, alice.Sid },
            };
        }

        public virtual TaskQueueResource CreateTaskQueue(
            string workspaceSid, string friendlyName,
            string assignmentActivitySid, string reservationActivitySid, string targetWorkers)
        {
            var queue = TaskQueueResource.Create(
                workspaceSid,
                friendlyName: friendlyName,
                assignmentActivitySid: assignmentActivitySid,
                reservationActivitySid: reservationActivitySid
            );

            TaskQueueResource.Update(
                workspaceSid,
                queue.Sid,
                friendlyName,
                targetWorkers,
                assignmentActivitySid,
                reservationActivitySid,
                1);

            return queue;
        }

        private IDictionary<string, TaskQueueResource> CreateTaskQueues(
            string workspaceSid, ActivityResource assignmentActivity, ActivityResource reservationActivity)
        {

            var voiceQueue = CreateTaskQueue(
                workspaceSid, "Voice",
                assignmentActivity.Sid, reservationActivity.Sid, "products HAS 'ProgrammableVoice'");

            var smsQueue = CreateTaskQueue(
                workspaceSid, "SMS",
                assignmentActivity.Sid, reservationActivity.Sid, "products HAS 'ProgrammableSMS'");

            var allQueue = CreateTaskQueue(
                workspaceSid, "All",
                assignmentActivity.Sid, reservationActivity.Sid, "1 == 1");

            return new Dictionary<string, TaskQueueResource> {
                { VoiceQueue, voiceQueue },
                { SmsQueue, smsQueue },
                { AllQueue, allQueue }
            };
        }

        public virtual WorkflowResource CreateWorkflow(string workspaceSid, IDictionary<string, TaskQueueResource> taskQueues)
        {
            var voiceQueue = taskQueues[VoiceQueue];
            var smsQueue = taskQueues[SmsQueue];
            var allQueue = taskQueues[AllQueue];

            var voiceFilter = new {
                friendlyName = "Voice",
                expression = "selected_product==\"ProgrammableVoice\"",
                targets = new List<object>() {
                    new { queue = voiceQueue.Sid, Priority = "5", Timeout = "30" },
                    new { queue = allQueue.Sid, Expression = "1==1", Priority = "1", Timeout = "30" }
                }
            };

            var smsFilter = new {
                friendlyName = "SMS",
                expression = "selected_product==\"ProgrammableSMS\"",
                targets = new List<object>() {
                    new { queue = smsQueue.Sid, Priority = "5", Timeout = "30" },
                    new { queue = allQueue.Sid, Expression = "1==1", Priority = "1", Timeout = "30" }
                }
            };

            var workflowConfiguration = new
            {
                task_routing = new
                {
                    filters = new List<object>()
                    {
                        voiceFilter,
                        smsFilter
                    },
                    default_filter = new
                    {
                        queue = allQueue.Sid,
                        expression = "1==1",
                        priority = "1",
                        timeout = "30"
                    }
                }
            };

            // Call REST API
            return WorkflowResource.Create(
                workspaceSid,
                "Tech Support",
                Json.Encode(workflowConfiguration),
                new Uri($"{_config.HostUrl}/callback/assignment"),
                new Uri($"{_config.HostUrl}/callback/assignment"),
                15);
        }
    }
}
```

After creating our workers, let's set up the Task Queues.

## Create the Task Queues

Next, we set up the Task Queues. Each with a `friendlyName` and a `targetWorkers`, which is an [expression](/docs/taskrouter/api/task-queue) to match Workers. Our Task Queues are:

1. `SMS` - Will target Workers specialized in Programmable SMS, such as Bob, using the expression `"products HAS \"ProgrammableSMS\""`.
2. `Voice` - Will do the same for Programmable Voice Workers, such as Alice, using the expression `"products HAS \"ProgrammableVoice\""`.

```cs title="Create Task Queues" description="TaskRouter.Web/App_Start/WorkspaceConfig.cs"
// !mark(125:165)
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Helpers;
using TaskRouter.Web.Infrastructure;
using Twilio;
using Twilio.Rest.Taskrouter.V1;
using Twilio.Rest.Taskrouter.V1.Workspace;

namespace TaskRouter.Web
{
    public class WorkspaceConfig
    {
        private readonly Config _config;

        private const string VoiceQueue = "VoiceQueue";
        private const string SmsQueue = "SMSQueue";
        private const string AllQueue = "AllQueue";

        public static void RegisterWorkspace()
        {
            new WorkspaceConfig().Register();
        }

        public WorkspaceConfig():this(new Config())
        {
        }

        public WorkspaceConfig(Config config)
        {
            TwilioClient.Init(config.AccountSID, config.AuthToken);
            _config = config;

        }

        public WorkspaceConfig(Type workspaceResource):this()
        {
        }

        public virtual ActivityResource GetActivityByFriendlyName(string workspaceSid, string friendlyName)
        {
            return ActivityResource.Read(workspaceSid, friendlyName).First();
        }

        public virtual ActivityResource CreateActivityWithFriendlyName(string workspaceSid, string friendlyName)
        {
            return ActivityResource.Create(workspaceSid, friendlyName);
        }

        public virtual WorkspaceResource GetWorkspaceByFriendlyName(string friendlyName)
        {
            return WorkspaceResource.Read(friendlyName).FirstOrDefault();
        }

        public virtual WorkspaceResource CreateWorkspace(string friendlyName, Uri eventCallbackUrl)
        {
            return WorkspaceResource.Create(friendlyName, eventCallbackUrl);
        }

        public virtual bool DeleteWorkspace(string workspaceSid)
        {
            return WorkspaceResource.Delete(workspaceSid);
        }

        public virtual WorkerResource CreateWorker(string workspaceSid, string bob, string activitySid, string attributes)
        {
            return WorkerResource.Create(workspaceSid, bob, activitySid, attributes);
        }

        public void Register()
        {
            var workspace = DeleteAndCreateWorkspace(
                "Twilio Workspace", new Uri(new Uri(_config.HostUrl), "/callback/events").AbsoluteUri);
            var workspaceSid = workspace.Sid;

            var assignmentActivity = GetActivityByFriendlyName(workspaceSid, "Unavailable");
            var idleActivity = GetActivityByFriendlyName(workspaceSid, "Available");
            var reservationActivity = CreateActivityWithFriendlyName(workspaceSid, "Reserved");
            var offlineActivity = GetActivityByFriendlyName(workspaceSid, "Offline");

            var workers = CreateWorkers(workspaceSid, idleActivity);
            var taskQueues = CreateTaskQueues(workspaceSid, assignmentActivity, reservationActivity);
            var workflow = CreateWorkflow(workspaceSid, taskQueues);

            Singleton.Instance.WorkspaceSid = workspaceSid;
            Singleton.Instance.WorkflowSid = workflow.Sid;
            Singleton.Instance.Workers = workers;
            Singleton.Instance.PostWorkActivitySid = idleActivity.Sid;
            Singleton.Instance.IdleActivitySid = idleActivity.Sid;
            Singleton.Instance.OfflineActivitySid = offlineActivity.Sid;
        }

        public virtual WorkspaceResource DeleteAndCreateWorkspace(string friendlyName, string eventCallbackUrl) {
            var workspace = GetWorkspaceByFriendlyName(friendlyName);
            if (workspace != null)
            {
                DeleteWorkspace(workspace.Sid);
            }

            return CreateWorkspace(friendlyName, new Uri(eventCallbackUrl));
        }

        private IDictionary<string, string> CreateWorkers(string workspaceSid, ActivityResource activity)
        {
            var attributesForBob = new
            {
                products = new List<object>()
                {
                    "ProgrammableSMS"
                },
                contact_uri = _config.AgentForProgrammableSMS
            };

            var bobWorker = CreateWorker(workspaceSid, "Bob", activity.Sid, Json.Encode(attributesForBob));

            var attributesForAlice = new
            {
                products = new List<object>()
                {
                    "ProgrammableVoice"
                },
                contact_uri = _config.AgentForProgrammableVoice
            };

            var alice = CreateWorker(workspaceSid, "Alice", activity.Sid, Json.Encode(attributesForAlice));

            return new Dictionary<string, string>
            {
                { _config.AgentForProgrammableSMS, bobWorker.Sid },
                { _config.AgentForProgrammableVoice, alice.Sid },
            };
        }

        public virtual TaskQueueResource CreateTaskQueue(
            string workspaceSid, string friendlyName,
            string assignmentActivitySid, string reservationActivitySid, string targetWorkers)
        {
            var queue = TaskQueueResource.Create(
                workspaceSid,
                friendlyName: friendlyName,
                assignmentActivitySid: assignmentActivitySid,
                reservationActivitySid: reservationActivitySid
            );

            TaskQueueResource.Update(
                workspaceSid,
                queue.Sid,
                friendlyName,
                targetWorkers,
                assignmentActivitySid,
                reservationActivitySid,
                1);

            return queue;
        }

        private IDictionary<string, TaskQueueResource> CreateTaskQueues(
            string workspaceSid, ActivityResource assignmentActivity, ActivityResource reservationActivity)
        {

            var voiceQueue = CreateTaskQueue(
                workspaceSid, "Voice",
                assignmentActivity.Sid, reservationActivity.Sid, "products HAS 'ProgrammableVoice'");

            var smsQueue = CreateTaskQueue(
                workspaceSid, "SMS",
                assignmentActivity.Sid, reservationActivity.Sid, "products HAS 'ProgrammableSMS'");

            var allQueue = CreateTaskQueue(
                workspaceSid, "All",
                assignmentActivity.Sid, reservationActivity.Sid, "1 == 1");

            return new Dictionary<string, TaskQueueResource> {
                { VoiceQueue, voiceQueue },
                { SmsQueue, smsQueue },
                { AllQueue, allQueue }
            };
        }

        public virtual WorkflowResource CreateWorkflow(string workspaceSid, IDictionary<string, TaskQueueResource> taskQueues)
        {
            var voiceQueue = taskQueues[VoiceQueue];
            var smsQueue = taskQueues[SmsQueue];
            var allQueue = taskQueues[AllQueue];

            var voiceFilter = new {
                friendlyName = "Voice",
                expression = "selected_product==\"ProgrammableVoice\"",
                targets = new List<object>() {
                    new { queue = voiceQueue.Sid, Priority = "5", Timeout = "30" },
                    new { queue = allQueue.Sid, Expression = "1==1", Priority = "1", Timeout = "30" }
                }
            };

            var smsFilter = new {
                friendlyName = "SMS",
                expression = "selected_product==\"ProgrammableSMS\"",
                targets = new List<object>() {
                    new { queue = smsQueue.Sid, Priority = "5", Timeout = "30" },
                    new { queue = allQueue.Sid, Expression = "1==1", Priority = "1", Timeout = "30" }
                }
            };

            var workflowConfiguration = new
            {
                task_routing = new
                {
                    filters = new List<object>()
                    {
                        voiceFilter,
                        smsFilter
                    },
                    default_filter = new
                    {
                        queue = allQueue.Sid,
                        expression = "1==1",
                        priority = "1",
                        timeout = "30"
                    }
                }
            };

            // Call REST API
            return WorkflowResource.Create(
                workspaceSid,
                "Tech Support",
                Json.Encode(workflowConfiguration),
                new Uri($"{_config.HostUrl}/callback/assignment"),
                new Uri($"{_config.HostUrl}/callback/assignment"),
                15);
        }
    }
}
```

We have a Workspace, Workers and Task Queues... what's left? A Workflow. Let's see how to create one next!

## Create a Workflow

Finally, we create the Workflow using the following parameters:

1. `friendlyName` as the name of a Workflow.
2. `assignmentCallbackUrl` and `fallbackAssignmentCallbackUrl` as the public URL where a request will be made when this Workflow assigns a Task to a Worker. We will learn how to implement it on the next steps.
3. `Timeout` as the maximum time we want to wait until a Worker is available for handling a Task.
4. `workflowConfiguration` which is a set of rules for placing Tasks into Task Queues. The routing configuration will take a Task's attribute and match this with Task Queues. This application's Workflow rules are defined as:

   * `"selected_product==\ "ProgrammableSMS\""` expression for `SMS` Task Queue. This expression will match any Task with `ProgrammableSMS` as the `selected_product` attribute.
   * `"selected_product==\ "ProgrammableVoice\""` expression for `Voice` Task Queue.

```cs title="Create a Workflow" description="TaskRouter.Web/App_Start/WorkspaceConfig.cs"
// !mark(167:208)
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Helpers;
using TaskRouter.Web.Infrastructure;
using Twilio;
using Twilio.Rest.Taskrouter.V1;
using Twilio.Rest.Taskrouter.V1.Workspace;

namespace TaskRouter.Web
{
    public class WorkspaceConfig
    {
        private readonly Config _config;

        private const string VoiceQueue = "VoiceQueue";
        private const string SmsQueue = "SMSQueue";
        private const string AllQueue = "AllQueue";

        public static void RegisterWorkspace()
        {
            new WorkspaceConfig().Register();
        }

        public WorkspaceConfig():this(new Config())
        {
        }

        public WorkspaceConfig(Config config)
        {
            TwilioClient.Init(config.AccountSID, config.AuthToken);
            _config = config;

        }

        public WorkspaceConfig(Type workspaceResource):this()
        {
        }

        public virtual ActivityResource GetActivityByFriendlyName(string workspaceSid, string friendlyName)
        {
            return ActivityResource.Read(workspaceSid, friendlyName).First();
        }

        public virtual ActivityResource CreateActivityWithFriendlyName(string workspaceSid, string friendlyName)
        {
            return ActivityResource.Create(workspaceSid, friendlyName);
        }

        public virtual WorkspaceResource GetWorkspaceByFriendlyName(string friendlyName)
        {
            return WorkspaceResource.Read(friendlyName).FirstOrDefault();
        }

        public virtual WorkspaceResource CreateWorkspace(string friendlyName, Uri eventCallbackUrl)
        {
            return WorkspaceResource.Create(friendlyName, eventCallbackUrl);
        }

        public virtual bool DeleteWorkspace(string workspaceSid)
        {
            return WorkspaceResource.Delete(workspaceSid);
        }

        public virtual WorkerResource CreateWorker(string workspaceSid, string bob, string activitySid, string attributes)
        {
            return WorkerResource.Create(workspaceSid, bob, activitySid, attributes);
        }

        public void Register()
        {
            var workspace = DeleteAndCreateWorkspace(
                "Twilio Workspace", new Uri(new Uri(_config.HostUrl), "/callback/events").AbsoluteUri);
            var workspaceSid = workspace.Sid;

            var assignmentActivity = GetActivityByFriendlyName(workspaceSid, "Unavailable");
            var idleActivity = GetActivityByFriendlyName(workspaceSid, "Available");
            var reservationActivity = CreateActivityWithFriendlyName(workspaceSid, "Reserved");
            var offlineActivity = GetActivityByFriendlyName(workspaceSid, "Offline");

            var workers = CreateWorkers(workspaceSid, idleActivity);
            var taskQueues = CreateTaskQueues(workspaceSid, assignmentActivity, reservationActivity);
            var workflow = CreateWorkflow(workspaceSid, taskQueues);

            Singleton.Instance.WorkspaceSid = workspaceSid;
            Singleton.Instance.WorkflowSid = workflow.Sid;
            Singleton.Instance.Workers = workers;
            Singleton.Instance.PostWorkActivitySid = idleActivity.Sid;
            Singleton.Instance.IdleActivitySid = idleActivity.Sid;
            Singleton.Instance.OfflineActivitySid = offlineActivity.Sid;
        }

        public virtual WorkspaceResource DeleteAndCreateWorkspace(string friendlyName, string eventCallbackUrl) {
            var workspace = GetWorkspaceByFriendlyName(friendlyName);
            if (workspace != null)
            {
                DeleteWorkspace(workspace.Sid);
            }

            return CreateWorkspace(friendlyName, new Uri(eventCallbackUrl));
        }

        private IDictionary<string, string> CreateWorkers(string workspaceSid, ActivityResource activity)
        {
            var attributesForBob = new
            {
                products = new List<object>()
                {
                    "ProgrammableSMS"
                },
                contact_uri = _config.AgentForProgrammableSMS
            };

            var bobWorker = CreateWorker(workspaceSid, "Bob", activity.Sid, Json.Encode(attributesForBob));

            var attributesForAlice = new
            {
                products = new List<object>()
                {
                    "ProgrammableVoice"
                },
                contact_uri = _config.AgentForProgrammableVoice
            };

            var alice = CreateWorker(workspaceSid, "Alice", activity.Sid, Json.Encode(attributesForAlice));

            return new Dictionary<string, string>
            {
                { _config.AgentForProgrammableSMS, bobWorker.Sid },
                { _config.AgentForProgrammableVoice, alice.Sid },
            };
        }

        public virtual TaskQueueResource CreateTaskQueue(
            string workspaceSid, string friendlyName,
            string assignmentActivitySid, string reservationActivitySid, string targetWorkers)
        {
            var queue = TaskQueueResource.Create(
                workspaceSid,
                friendlyName: friendlyName,
                assignmentActivitySid: assignmentActivitySid,
                reservationActivitySid: reservationActivitySid
            );

            TaskQueueResource.Update(
                workspaceSid,
                queue.Sid,
                friendlyName,
                targetWorkers,
                assignmentActivitySid,
                reservationActivitySid,
                1);

            return queue;
        }

        private IDictionary<string, TaskQueueResource> CreateTaskQueues(
            string workspaceSid, ActivityResource assignmentActivity, ActivityResource reservationActivity)
        {

            var voiceQueue = CreateTaskQueue(
                workspaceSid, "Voice",
                assignmentActivity.Sid, reservationActivity.Sid, "products HAS 'ProgrammableVoice'");

            var smsQueue = CreateTaskQueue(
                workspaceSid, "SMS",
                assignmentActivity.Sid, reservationActivity.Sid, "products HAS 'ProgrammableSMS'");

            var allQueue = CreateTaskQueue(
                workspaceSid, "All",
                assignmentActivity.Sid, reservationActivity.Sid, "1 == 1");

            return new Dictionary<string, TaskQueueResource> {
                { VoiceQueue, voiceQueue },
                { SmsQueue, smsQueue },
                { AllQueue, allQueue }
            };
        }

        public virtual WorkflowResource CreateWorkflow(string workspaceSid, IDictionary<string, TaskQueueResource> taskQueues)
        {
            var voiceQueue = taskQueues[VoiceQueue];
            var smsQueue = taskQueues[SmsQueue];
            var allQueue = taskQueues[AllQueue];

            var voiceFilter = new {
                friendlyName = "Voice",
                expression = "selected_product==\"ProgrammableVoice\"",
                targets = new List<object>() {
                    new { queue = voiceQueue.Sid, Priority = "5", Timeout = "30" },
                    new { queue = allQueue.Sid, Expression = "1==1", Priority = "1", Timeout = "30" }
                }
            };

            var smsFilter = new {
                friendlyName = "SMS",
                expression = "selected_product==\"ProgrammableSMS\"",
                targets = new List<object>() {
                    new { queue = smsQueue.Sid, Priority = "5", Timeout = "30" },
                    new { queue = allQueue.Sid, Expression = "1==1", Priority = "1", Timeout = "30" }
                }
            };

            var workflowConfiguration = new
            {
                task_routing = new
                {
                    filters = new List<object>()
                    {
                        voiceFilter,
                        smsFilter
                    },
                    default_filter = new
                    {
                        queue = allQueue.Sid,
                        expression = "1==1",
                        priority = "1",
                        timeout = "30"
                    }
                }
            };

            // Call REST API
            return WorkflowResource.Create(
                workspaceSid,
                "Tech Support",
                Json.Encode(workflowConfiguration),
                new Uri($"{_config.HostUrl}/callback/assignment"),
                new Uri($"{_config.HostUrl}/callback/assignment"),
                15);
        }
    }
}
```

Our workspace is completely setup. Now it's time to see how we use it to route calls.

## Handle Twilio's Request

Right after receiving a call, Twilio will send a request to the URL specified on the [number's configuration](/console/phone-numbers/incoming).

The endpoint will then process the request and generate a TwiML response. We'll use the [Say](/docs/voice/twiml/say) verb to give the user product alternatives, and a key they can press in order to select one. The [Gather](/docs/voice/twiml/gather) verb allows us to capture the user's key press.

```cs title="Handling Twilio's Requests" description="TaskRouter.Web/Controllers/CallController.cs"
// !mark(24:33)
using System.Web.Mvc;
using TaskRouter.Web.Infrastructure;
using TaskRouter.Web.Models;
using TaskRouter.Web.Services;
using Twilio.AspNet.Mvc;
using Twilio.TwiML;

namespace TaskRouter.Web.Controllers
{
    public class CallController : TwilioController
    {
        private readonly IMissedCallsService _service;

        public CallController()
        {
            _service = new MissedCallsService(new TaskRouterDbContext());
        }

        public CallController(IMissedCallsService service)
        {
            _service = service;
        }

        [HttpPost]
        public ActionResult Incoming()
        {
            var response = new VoiceResponse();
            var gather = new Gather(numDigits: 1, action: "/call/enqueue", method: "POST");
            gather.Say("For Programmable SMS, press one. For Voice, press any other key.");
            response.Gather(gather);

            return TwiML(response);
        }

        [HttpPost]
        public ActionResult Enqueue(string digits)
        {
            var selectedProduct = digits == "1" ? "ProgrammableSMS" : "ProgrammableVoice";
            var response = new VoiceResponse();

            response.Enqueue(
                selectedProduct,
                workflowSid: Singleton.Instance.WorkflowSid);

            return TwiML(response);
        }


    }
}
```

We just asked the caller to choose a product, next we will use their choice to create the appropriate Task.

## Create a Task

This is the endpoint set as the `action` URL on the `Gather` verb on the previous step. A request is made to this endpoint when the user presses a key during the call. This request has a `Digits` parameter that holds the pressed keys. A `Task` will be created based on the pressed digit with the `selected_product` as an attribute. The Workflow will take this Task's attributes and match them with the [configured expressions](/docs/taskrouter/expression-syntax) in order to find a Task Queue for this Task, so an appropriate available Worker can be assigned to handle it.

We use the [`Enqueue` verb](/docs/voice/twiml/enqueue) with a `WorkflowSid` attribute to [integrate with TaskRouter](/docs/taskrouter/twiml-queue-calls). Then the voice call will be put on hold while TaskRouter tries to find an available Worker to handle this Task.

```cs title="Create a Task" description="TaskRouter.Web/Controllers/CallController.cs"
// !mark(35:46)
using System.Web.Mvc;
using TaskRouter.Web.Infrastructure;
using TaskRouter.Web.Models;
using TaskRouter.Web.Services;
using Twilio.AspNet.Mvc;
using Twilio.TwiML;

namespace TaskRouter.Web.Controllers
{
    public class CallController : TwilioController
    {
        private readonly IMissedCallsService _service;

        public CallController()
        {
            _service = new MissedCallsService(new TaskRouterDbContext());
        }

        public CallController(IMissedCallsService service)
        {
            _service = service;
        }

        [HttpPost]
        public ActionResult Incoming()
        {
            var response = new VoiceResponse();
            var gather = new Gather(numDigits: 1, action: "/call/enqueue", method: "POST");
            gather.Say("For Programmable SMS, press one. For Voice, press any other key.");
            response.Gather(gather);

            return TwiML(response);
        }

        [HttpPost]
        public ActionResult Enqueue(string digits)
        {
            var selectedProduct = digits == "1" ? "ProgrammableSMS" : "ProgrammableVoice";
            var response = new VoiceResponse();

            response.Enqueue(
                selectedProduct,
                workflowSid: Singleton.Instance.WorkflowSid);

            return TwiML(response);
        }


    }
}
```

After sending a Task to Twilio, let's see how we tell TaskRouter which Worker to use to execute that task.

## Assign a Worker

When TaskRouter selects a Worker, it does the following:

1. The Task's Assignment Status is set to 'reserved'.
2. A [Reservation instance](/docs/taskrouter/api/reservations) is generated, linking the Task to the selected Worker.
3. At the same time the Reservation is created, a `POST` request is made to the Workflow's AssignmentCallbackURL, which was configured using the [WorkspaceConfig](https://github.com/TwilioDevEd/task-router-csharp/blob/master/TaskRouter.Web/App_Start/WorkspaceConfig.cs) class when the application is initialized. This request includes the full details of the Task, the selected Worker, and the Reservation.

Handling this [Assignment Callback](/docs/taskrouter/handle-assignment-callbacks) is a key component of building a TaskRouter application as we can instruct how the Worker will handle a Task. We could send a text, email, push notifications or make a call.

Since we created this Task during a voice call with an `Enqueue` verb, let's [instruct TaskRouter to dequeue](/docs/taskrouter/handle-assignment-callbacks#dequeue-call) the call and dial a Worker. If we do not specify a `to` parameter with a phone number, TaskRouter will pick the Worker's `contact_uri` attribute.

We also send a `post_work_activity_sid` which will tell TaskRouter which [Activity](/docs/taskrouter/quickstart/csharp/setup-understanding-activities) to assign this worker after the call ends.

```cs title="Assign a Worker" description="TaskRouter.Web/Controllers/CallbackController.cs"
// !mark(35:45)
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using TaskRouter.Web.Infrastructure;
using TaskRouter.Web.Models;
using TaskRouter.Web.Services;
using Twilio;
using Twilio.AspNet.Mvc;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace TaskRouter.Web.Controllers
{
    public class CallbackController : TwilioController
    {
        private readonly IMissedCallsService _service;

        public CallbackController()
        {
            _service = new MissedCallsService(new TaskRouterDbContext());

            if (Config.ENV != "test")
            {
                TwilioClient.Init(Config.AccountSID, Config.AuthToken);
            }
        }

        public CallbackController(IMissedCallsService service)
        {
            _service = service;
        }

        [HttpPost]
        public ActionResult Assignment()
        {
            var response = new
            {
                instruction = "dequeue",
                post_work_activity_sid = Singleton.Instance.PostWorkActivitySid
            };

            return new JsonResult() { Data = response };
        }

        [HttpPost]
        public async Task<ActionResult> Events(
            string eventType, string taskAttributes, string workerSid, string workerActivityName, string workerAttributes)
        {
            if (IsEventTimeoutOrCanceled(eventType))
            {
                await CreateMissedCallAndRedirectToVoiceMail(taskAttributes);
            }

            if (HasWorkerChangedToOffline(eventType, workerActivityName))
            {
                SendMessageToWorker(workerSid, workerAttributes);
            }

            return new EmptyResult();
        }


        private bool IsEventTimeoutOrCanceled(string eventType)
        {
            var desiredEvents = new string[] { "workflow.timeout", "task.canceled" };
            return desiredEvents.Any(e => e == eventType);
        }

        private bool HasWorkerChangedToOffline(string eventType, string workerActivityName)
        {
            return eventType == "worker.activity.update" && workerActivityName == "Offline";
        }

        private async Task CreateMissedCallAndRedirectToVoiceMail(string taskAttributes)
        {
            dynamic attributes = JsonConvert.DeserializeObject(taskAttributes);
            var missedCall = new MissedCall
            {
                PhoneNumber = attributes.from,
                Product = attributes.selected_product,
                CreatedAt = DateTime.Now
            };

            await _service.CreateAsync(missedCall);
            string voiceSid = attributes.call_sid;
            VoiceMail(voiceSid);
        }

        private void SendMessageToWorker(string workerSid, string workerAttributes)
        {
            const string message = "You went offline. To make yourself available reply with \"on\"";

            dynamic attributes = JsonConvert.DeserializeObject(workerAttributes);
            string workerPhoneNumber = attributes.contact_uri;

            MessageResource.Create(
                to: new PhoneNumber(Config.TwilioNumber),
                from: new PhoneNumber(workerPhoneNumber),
                body: message
            );
        }

        private void VoiceMail(string callSid)
        {
            var msg = "Sorry, All agents are busy. Please leave a message. We will call you as soon as possible";
            var routeUrl = "https://twimlets.com/voicemail?Email=" + Config.VoiceMail + "&Message=" + Url.Encode(msg);
            CallResource.Update(callSid, url: new Uri(routeUrl));
        }
    }
}
```

Now that our Tasks are routed properly, let's deal with missed calls in the next step.

## Collect Missed Calls

This endpoint will be called after each [TaskRouter Event](/docs/taskrouter/api/event) is triggered. In our application, we are trying to collect missed calls, so we would like to handle the `workflow.timeout` event. This event is triggered when the Task waits more than the limit set on Workflow Configuration-- or rather when no worker is available.

Here we use `TwilioRestClient` to route this call to a [Voicemail Twimlet](https://www.twilio.com/labs/twimlets/voicemail). Twimlets are tiny web applications for voice. This one will generate a `TwiML` response using `Say` verb and record a message using `Record` verb. The recorded message will then be transcribed and sent to the email address configured.

Note that we are also listening for `task.canceled`. This is triggered when the customer hangs up before being assigned to an agent, therefore canceling the task. Capturing this event allows us to collect the information from the customers that hang up before the Workflow times out.

```cs title="Collect Missed Calls" description="TaskRouter.Web/Controllers/CallbackController.cs"
// !mark(47:62,70:83,95:101)
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using TaskRouter.Web.Infrastructure;
using TaskRouter.Web.Models;
using TaskRouter.Web.Services;
using Twilio;
using Twilio.AspNet.Mvc;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace TaskRouter.Web.Controllers
{
    public class CallbackController : TwilioController
    {
        private readonly IMissedCallsService _service;

        public CallbackController()
        {
            _service = new MissedCallsService(new TaskRouterDbContext());

            if (Config.ENV != "test")
            {
                TwilioClient.Init(Config.AccountSID, Config.AuthToken);
            }
        }

        public CallbackController(IMissedCallsService service)
        {
            _service = service;
        }

        [HttpPost]
        public ActionResult Assignment()
        {
            var response = new
            {
                instruction = "dequeue",
                post_work_activity_sid = Singleton.Instance.PostWorkActivitySid
            };

            return new JsonResult() { Data = response };
        }

        [HttpPost]
        public async Task<ActionResult> Events(
            string eventType, string taskAttributes, string workerSid, string workerActivityName, string workerAttributes)
        {
            if (IsEventTimeoutOrCanceled(eventType))
            {
                await CreateMissedCallAndRedirectToVoiceMail(taskAttributes);
            }

            if (HasWorkerChangedToOffline(eventType, workerActivityName))
            {
                SendMessageToWorker(workerSid, workerAttributes);
            }

            return new EmptyResult();
        }


        private bool IsEventTimeoutOrCanceled(string eventType)
        {
            var desiredEvents = new string[] { "workflow.timeout", "task.canceled" };
            return desiredEvents.Any(e => e == eventType);
        }

        private bool HasWorkerChangedToOffline(string eventType, string workerActivityName)
        {
            return eventType == "worker.activity.update" && workerActivityName == "Offline";
        }

        private async Task CreateMissedCallAndRedirectToVoiceMail(string taskAttributes)
        {
            dynamic attributes = JsonConvert.DeserializeObject(taskAttributes);
            var missedCall = new MissedCall
            {
                PhoneNumber = attributes.from,
                Product = attributes.selected_product,
                CreatedAt = DateTime.Now
            };

            await _service.CreateAsync(missedCall);
            string voiceSid = attributes.call_sid;
            VoiceMail(voiceSid);
        }

        private void SendMessageToWorker(string workerSid, string workerAttributes)
        {
            const string message = "You went offline. To make yourself available reply with \"on\"";

            dynamic attributes = JsonConvert.DeserializeObject(workerAttributes);
            string workerPhoneNumber = attributes.contact_uri;

            MessageResource.Create(
                to: new PhoneNumber(Config.TwilioNumber),
                from: new PhoneNumber(workerPhoneNumber),
                body: message
            );
        }

        private void VoiceMail(string callSid)
        {
            var msg = "Sorry, All agents are busy. Please leave a message. We will call you as soon as possible";
            var routeUrl = "https://twimlets.com/voicemail?Email=" + Config.VoiceMail + "&Message=" + Url.Encode(msg);
            CallResource.Update(callSid, url: new Uri(routeUrl));
        }
    }
}
```

Most of the features of our application are implemented. The last piece is allowing the Workers to change their availability status. Let's see how to do that next.

## Change a Worker's Activity

We have created this endpoint, so a worker can send an SMS message to the support line with the command "On" or "Off" to change their availability status.

This is important as a worker's activity will change to `Offline` when they miss a call. When this happens, they receive an SMS letting them know that their activity has changed, and that they can reply with the `On` command to make themselves available for incoming calls again.

```cs title="Changing a Worker's Activity" description="TaskRouter.Web/Controllers/MessageController.cs"
// !mark(35:59)
using System;
using System.Web.Mvc;
using TaskRouter.Web.Infrastructure;
using Twilio;
using Twilio.AspNet.Mvc;
using Twilio.Rest.Taskrouter.V1.Workspace;
using Twilio.TwiML;

namespace TaskRouter.Web.Controllers
{
    public class MessageController : TwilioController
    {
        private const string On = "on";
        private const string Off = "off";

        public MessageController()
        {
            if (Config.ENV != "test")
            {
                TwilioClient.Init(Config.AccountSID, Config.AuthToken);
            }
        }

        public virtual WorkerResource FetchWorker(string workspaceSid, string workerSid)
        {
            return WorkerResource.Fetch(workspaceSid, workerSid);
        }

        public virtual WorkerResource UpdateWorker(string pathWorkspaceSid, string pathSid, string activitySid = null,
            string attributes = null, string friendlyName = null)
        {
            return WorkerResource.Update(pathWorkspaceSid, pathSid, activitySid, attributes, friendlyName);
        }

        [HttpPost]
        public ActionResult Incoming(string from, string body)
        {
            var workspaceSid = Singleton.Instance.WorkspaceSid;
            var workerSid = Singleton.Instance.Workers[from];
            var idleActivitySid = Singleton.Instance.IdleActivitySid;
            var offlineActivitySid = Singleton.Instance.OfflineActivitySid;
            var message = "Unrecognized command, reply with \"on\" to activate your worker or \"off\" otherwise";

            var worker = FetchWorker(workspaceSid, workerSid);

            if (body.Equals(On, StringComparison.InvariantCultureIgnoreCase))
            {
                UpdateWorker(workspaceSid, workerSid, idleActivitySid, worker.Attributes, worker.FriendlyName);
                message = "Your worker is online";
            }

            if (body.Equals(Off, StringComparison.InvariantCultureIgnoreCase))
            {
                UpdateWorker(workspaceSid, workerSid, offlineActivitySid, worker.Attributes, worker.FriendlyName);
                message = "Your worker is offline";
            }

            return TwiML(new MessagingResponse().Message(message));
        }
    }
}
```

Congratulations! You finished this tutorial. As you can see, using Twilio's TaskRouter is quite simple.

## Where to Next?

If you're a .NET developer working with Twilio, you might also enjoy these tutorials:

**[Voice JavaScript SDK Quickstart](/docs/voice/sdks/javascript/get-started)**

Learn how to use Twilio Voice SDK to make browser-to-phone and browser-to-browser calls with ease.

**[ETA-Notifications](https://www.twilio.com/blog/eta-notifications-csharp-mvc)**

Learn how to implement ETA Notifications using ASP.NET MVC and Twilio.
