# Dynamic Call Center with PHP and Laravel

In this tutorial we will show how to automate the routing of calls from customers to your support agents. Customers will be able to select a product and wait while TaskRouter tries to contact a product specialist for the best support experience. If no one is available, our application will save the customer's number and selected product so an agent can call them back later on.

This is what the application does at a high level:

1. Configure a workspace using the Twilio [TaskRouter REST API](/docs/taskrouter/api).
2. Listen for incoming calls and let the user select a product with the dial pad.
3. Create a Task with the selected product and let TaskRouter handle it.
4. Store missed calls so agents can return the call to customers.

## Configure the Workspace

In order to instruct TaskRouter to handle the Tasks, we need to configure a Workspace. We can do this in the [TaskRouter Console](https://console.twilio.com/?frameUrl=%2Fconsole%2Ftaskrouter%2Fworkspaces) or programmatically using the [TaskRouter REST API](/docs/taskrouter/api).

A [Workspace](/docs/taskrouter/api/workspace) is the container element for any TaskRouter application. The elements are:

* [Tasks](/docs/taskrouter/api/task) - Represents a customer trying to contact an agent.
* [Workers](/docs/taskrouter/api/worker) - The agents responsible for handling Tasks.
* [Task Queues](/docs/taskrouter/api/task-queue) - Holds Tasks to be consumed by a set of Workers.
* [Workflows](/docs/taskrouter/api/workflow) - Responsible for placing Tasks into Task Queues.
* [Activities](/docs/taskrouter/api/activity) - Possible states of a Worker, e.g. Idle, Offline, Busy.

```json title="Workspace Configuration" description="resources/workspace.json"
{
  "name": "Twilio Workspace",
  "event_callback": "%(host)s/events",
  "workers": [
    {
      "name": "Bob",
      "attributes": {
        "products": [
          "ProgrammableSMS"
        ],
        "contact_uri": "%(bob_phone)s"
      }
    },
    {
      "name": "Alice",
      "attributes": {
        "products": [
          "ProgrammableVoice"
        ],
        "contact_uri": "%(alice_phone)s"
      }
    }
  ],
  "activities": [
    {
      "name": "Offline",
      "availability": "false"
    },
    {
      "name": "Idle",
      "availability": "true"
    },
    {
      "name": "Busy",
      "availability": "false"
    },
    {
      "name": "Reserved",
      "availability": "false"
    }
  ],
  "task_queues": [
    {
      "name": "Default",
      "targetWorkers": "1==1"
    },
    {
      "name": "SMS",
      "targetWorkers": "products HAS \"ProgrammableSMS\""
    },
    {
      "name": "Voice",
      "targetWorkers": "products HAS \"ProgrammableVoice\""
    }
  ],
  "workflow": {
    "name": "Sales",
    "callback": "%(host)s/assignment",
    "timeout": "15"
  }
}
```

In order to build a client for this API, we need as system variables a `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` which you can find on [Twilio Console](/console). The artisan command `workspace:create` creates a `Twilio\Rest\Client`, which is provided by the [Twilio PHP library](https://www.twilio.com/docs/libraries/reference/twilio-php/). This client is used by [WorkspaceFacade](https://github.com/TwilioDevEd/task-router-laravel/blob/master/app/TaskRouter/WorkspaceFacade.php) which encapsulates all logic related to the creation of a Task Router workflow.

Let's take a look at that command next.

## The CreateWorkspace Artisan Command

In this application the [Artisan command](https://laravel.com/docs/4.2/commands#introduction) `workspace:create` is used to orchestrate calls to our `WorkspaceFacade` class in order to build a Workspace from scratch. `CreateWorkspace` is the PHP class behind the Artisan command. It uses data provided by `workspace.json` and expects 3 arguments:

1. `host` - A public URL to which Twilio can send requests. This can be either a cloud service or [ngrok](https://ngrok.com/), which can expose a local application to the internet.
2. `bob_phone` - The telephone number of Bob, the Programmable SMS specialist.
3. `alice_phone` - Same for Alice, the Programmable Voice specialist.

The function `createWorkspaceConfig` is used to load the configuration of the workspace from `workspace.json`.

```php title="CreateWorkspace Artisan Command" description="app/Console/Commands/CreateWorkspace.php"
// !mark(15:23,43:65,71)
<?php

namespace App\Console\Commands;

use App\TaskRouter\WorkspaceFacade;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use TaskRouter_Services_Twilio;
use Twilio\Rest\Client;
use Twilio\Rest\Taskrouter;
use WorkflowRuleTarget;

class CreateWorkspace extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'workspace:create
                            {host : Server hostname in Internet}
                            {bob_phone : Phone of the first agent (Bob)}
                            {alice_phone : Phone of the secondary agent (Alice)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates a Twilio workspace for 2 call agents';

    private $_twilioClient;

    /**
     * Create a new command instance.
     */
    public function __construct(Client $twilioClient)
    {
        parent::__construct();
        $this->_twilioClient = $twilioClient;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("Create workspace.");
        $this->line("- Server: \t{$this->argument('host')}");
        $this->line("- Bob phone: \t{$this->argument('bob_phone')}");
        $this->line("- Alice phone: \t{$this->argument('alice_phone')}");

        //Get the configuration
        $workspaceConfig = $this->createWorkspaceConfig();

        //Create the workspace
        $params = array();
        $params['friendlyName'] = $workspaceConfig->name;
        $params['eventCallbackUrl'] = $workspaceConfig->event_callback;
        $workspace = WorkspaceFacade::createNewWorkspace(
            $this->_twilioClient->taskrouter,
            $params
        );
        $this->addWorkersToWorkspace($workspace, $workspaceConfig);
        $this->addTaskQueuesToWorkspace($workspace, $workspaceConfig);
        $workflow = $this->addWorkflowToWorkspace($workspace, $workspaceConfig);

        $this->printSuccessAndInstructions($workspace, $workflow);
    }

    /**
     * Get the json configuration of the Workspace
     *
     * @return mixed
     */
    function createWorkspaceConfig()
    {
        $fileContent = File::get("resources/workspace.json");
        $interpolatedContent = sprintfn($fileContent, $this->argument());
        return json_decode($interpolatedContent);
    }

    /**
     * Add workers to workspace
     *
     * @param $workspace WorkspaceFacade
     * @param $workspaceConfig string with Json
     */
    function addWorkersToWorkspace($workspace, $workspaceConfig)
    {
        $this->line("Add Workers.");
        $idleActivity = $workspace->findActivityByName("Idle")
        or die("The activity 'Idle' was not found. Workers cannot be added.");
        foreach ($workspaceConfig->workers as $workerJson) {
            $params = array();
            $params['friendlyName'] = $workerJson->name;
            $params['activitySid'] = $idleActivity->sid;
            $params['attributes'] = json_encode($workerJson->attributes);
            $workspace->addWorker($params);
        }
    }

    /**
     * Add the Task Queues to the workspace
     *
     * @param $workspace WorkspaceFacade
     * @param $workspaceConfig string with Json
     */
    function addTaskQueuesToWorkspace($workspace, $workspaceConfig)
    {
        $this->line("Add Task Queues.");
        $reservedActivity = $workspace->findActivityByName("Reserved");
        $assignmentActivity = $workspace->findActivityByName("Busy");
        foreach ($workspaceConfig->task_queues as $taskQueueJson) {
            $params = array();
            $params['friendlyName'] = $taskQueueJson->name;
            $params['targetWorkers'] = $taskQueueJson->targetWorkers;
            $params['reservationActivitySid'] = $reservedActivity->sid;
            $params['assignmentActivitySid'] = $assignmentActivity->sid;
            $workspace->addTaskQueue($params);
        }
    }

    /**
     * Create and configure the workflow to use in the workspace
     *
     * @param $workspace WorkspaceFacade
     * @param $workspaceConfig string with Json
     *
     * @return object with added workflow
     */
    function addWorkflowToWorkspace($workspace, $workspaceConfig)
    {
        $this->line("Add Worflow.");
        $workflowJson = $workspaceConfig->workflow;
        $params = array();
        $params['friendlyName'] = $workflowJson->name;
        $params['assignmentCallbackUrl'] = $workflowJson->callback;
        $params['taskReservationTimeout'] = $workflowJson->timeout;
        $params['configuration'] = $this->createWorkFlowJsonConfig(
            $workspace,
            $workflowJson
        );
        return $workspace->addWorkflow($params);
    }

    /**
     * Create the workflow configuration in json format
     *
     * @param $workspace
     * @param $workspaceConfig
     *
     * @return string configuration of workflow in json format
     */
    function createWorkFlowJsonConfig($workspace, $workspaceConfig)
    {
        $params = array();
        $defaultTaskQueue = $workspace->findTaskQueueByName("Default") or die(
            "The 'Default' task queue was not found. The Workflow cannot be created."
        );
        $smsTaskQueue = $workspace->findTaskQueueByName("SMS") or die(
            "The 'SMS' task queue was not found. The Workflow cannot be created."
        );
        $voiceTaskQueue = $workspace->findTaskQueueByName("Voice") or die(
            "The 'Voice' task queue was not found. The Workflow cannot be created."
        );

        $params["default_task_queue_sid"] = $defaultTaskQueue->sid;
        $params["sms_task_queue_sid"] = $smsTaskQueue->sid;
        $params["voice_task_queue_sid"] = $voiceTaskQueue->sid;

        $fileContent = File::get("resources/workflow.json");
        $interpolatedContent = sprintfn($fileContent, $params);
        return $interpolatedContent;
    }

    /**
     * Prints the message indicating the workspace was successfully created and
     * shows the commands to export the workspace variables into the environment.
     *
     * @param $workspace
     * @param $workflow
     */
    function printSuccessAndInstructions($workspace, $workflow)
    {
        $idleActivity = $workspace->findActivityByName("Idle")
        or die("Somehow the activity 'Idle' was not found.");
        $successMsg = "Workspace \"{$workspace->friendlyName}\"" .
            " was created successfully.";
        $this->printTitle($successMsg);
        $this->line(
            "The following variables will be set automatically."
        );
        $encondedWorkersPhone = http_build_query($workspace->getWorkerPhones());
        $envVars = [
            "WORKFLOW_SID" => $workflow->sid,
            "POST_WORK_ACTIVITY_SID" => $idleActivity->sid,
            "WORKSPACE_SID" => $workspace->sid,
            "PHONE_TO_WORKER" => $encondedWorkersPhone
        ];
        updateEnv($envVars);
        foreach ($envVars as $key => $value) {
            $this->warn("export $key=$value");
        }
    }

    /**
     * Prints a text separated up and doNwn by a token based line, usually "*"
     */
    function printTitle($text)
    {
        $lineLength = strlen($text) + 2;
        $this->line(str_repeat("*", $lineLength));
        $this->line(" $text ");
        $this->line(str_repeat("*", $lineLength));
    }
}
```

Now let's look in more detail at all the steps, starting with the creation of the workspace itself.

## Create a Workspace

Before creating a workspace, we need to delete any others with the same `friendlyName` as identifier. In order to create a workspace we need to provide a `friendlyName`, and a `eventCallbackUrl` which contains a URL to be called every time an event is triggered in the workspace.

```php title="Create Workspace" description="app/TaskRouter/WorkspaceFacade.php"
// !mark(20:35)
<?php

namespace App\TaskRouter;

use Twilio\Rest\Taskrouter\V1\Workspace;


class WorkspaceFacade
{
    private $_taskRouterClient;

    private $_workspace;

    private $_activities;

    public function __construct($taskRouterClient, $workspace)
    {
        $this->_taskRouterClient = $taskRouterClient;
        $this->_workspace = $workspace;
    }

    public static function createNewWorkspace($taskRouterClient, $params)
    {
        $workspaceName = $params["friendlyName"];
        $existingWorkspace = $taskRouterClient->workspaces->read(
            array(
                "friendlyName" => $workspaceName
            )
        );
        if ($existingWorkspace) {
            $existingWorkspace[0]->delete();
        }

        $workspace = $taskRouterClient->workspaces
            ->create($workspaceName, $params);
        return new WorkspaceFacade($taskRouterClient, $workspace);
    }

    public static function createBySid($taskRouterClient, $workspaceSid)
    {
        $workspace = $taskRouterClient->workspaces($workspaceSid);
        return new WorkspaceFacade($taskRouterClient, $workspace);
    }

    /**
     * Magic getter to lazy load subresources
     *
     * @param string $property Subresource to return
     *
     * @return \Twilio\ListResource The requested subresource
     *
     * @throws \Twilio\Exceptions\TwilioException For unknown subresources
     */
    public function __get($property)
    {
        return $this->_workspace->$property;
    }

    /**
     * Gets an activity instance by its friendly name
     *
     * @param $activityName Friendly name of the activity to search for
     *
     * @return ActivityInstance of the activity found or null
     */
    function findActivityByName($activityName)
    {
        $this->cacheActivitiesByName();
        return $this->_activities[$activityName];
    }

    /**
     * Caches the activities in an associative array which links friendlyName with
     * its ActivityInstance
     */
    protected function cacheActivitiesByName()
    {
        if (!$this->_activities) {
            $this->_activities = array();
            foreach ($this->_workspace->activities->read() as $activity) {
                $this->_activities[$activity->friendlyName] = $activity;
            }
        }
    }

    /**
     * Looks for a worker by its SID
     *
     * @param $sid string with the Worker SID
     *
     * @return mixed worker found or null
     */
    function findWorkerBySid($sid)
    {
        return $this->_workspace->workers($sid);
    }

    /**
     * Returns an associative array with
     *
     * @return mixed array with the relation phone -> workerSid
     */
    function getWorkerPhones()
    {
        $worker_phones = array();
        foreach ($this->_workspace->workers->read() as $worker) {
            $workerAttribs = json_decode($worker->attributes);
            $worker_phones[$workerAttribs->contact_uri] = $worker->sid;
        }
        return $worker_phones;
    }

    /**
     * Looks for a Task Queue by its friendly name
     *
     * @param $taskQueueName string with the friendly name of the task queue to
     * search for
     *
     * @return the activity found or null
     */
    function findTaskQueueByName($taskQueueName)
    {
        $result = $this->_workspace->taskQueues->read(
            array(
                "friendlyName" => $taskQueueName
            )
        );
        if ($result) {
            return $result[0];
        }
    }

    function updateWorkerActivity($worker, $activitySid)
    {
        $worker->update(['activitySid' => $activitySid]);
    }

    /**
     * Adds workers to the workspace
     *
     * @param $params mixed with the attributes to define the new Worker in the
     * workspace
     *
     * @return Workspace\WorkerInstance|Null
     */
    function addWorker($params)
    {
        return $this->_workspace->workers->create($params['friendlyName'], $params);
    }

    /**
     * Adds a Task Queue to the workspace
     *
     * @param $params mixed with attributes to define the new Task Queue in the
     * workspace
     *
     * @return Workspace\TaskQueueInstance|Null
     */
    function addTaskQueue($params)
    {
        return $this->_workspace->taskQueues->create(
            $params['friendlyName'],
            $params['reservationActivitySid'],
            $params['assignmentActivitySid'],
            $params
        );
    }


    /**
     * Adds a workflow to the workspace
     *
     * @param $params mixed with attributes to define the new Workflow in the
     * workspace
     *
     * @return Workspace\WorkflowInstance|Null
     */
    function addWorkFlow($params)
    {
        return $this->_workspace->workflows->create(
            $params["friendlyName"],
            $params["configuration"],
            $params
        );
    }

}
```

We have a brand new workspace, now we need workers. Let's create them on the next step.

## Create the Workers

We'll create two workers: Bob and Alice. They each have two attributes: `contact_uri`, a phone number, and `products`, a list of products each worker is specialized in. We also need to specify an `activity_sid` and a name for each worker. The selected activity will define the status of the worker.

```php title="Create Workers" description="app/Console/Commands/CreateWorkspace.php"
// !mark(85:103)
<?php

namespace App\Console\Commands;

use App\TaskRouter\WorkspaceFacade;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use TaskRouter_Services_Twilio;
use Twilio\Rest\Client;
use Twilio\Rest\Taskrouter;
use WorkflowRuleTarget;

class CreateWorkspace extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'workspace:create
                            {host : Server hostname in Internet}
                            {bob_phone : Phone of the first agent (Bob)}
                            {alice_phone : Phone of the secondary agent (Alice)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates a Twilio workspace for 2 call agents';

    private $_twilioClient;

    /**
     * Create a new command instance.
     */
    public function __construct(Client $twilioClient)
    {
        parent::__construct();
        $this->_twilioClient = $twilioClient;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("Create workspace.");
        $this->line("- Server: \t{$this->argument('host')}");
        $this->line("- Bob phone: \t{$this->argument('bob_phone')}");
        $this->line("- Alice phone: \t{$this->argument('alice_phone')}");

        //Get the configuration
        $workspaceConfig = $this->createWorkspaceConfig();

        //Create the workspace
        $params = array();
        $params['friendlyName'] = $workspaceConfig->name;
        $params['eventCallbackUrl'] = $workspaceConfig->event_callback;
        $workspace = WorkspaceFacade::createNewWorkspace(
            $this->_twilioClient->taskrouter,
            $params
        );
        $this->addWorkersToWorkspace($workspace, $workspaceConfig);
        $this->addTaskQueuesToWorkspace($workspace, $workspaceConfig);
        $workflow = $this->addWorkflowToWorkspace($workspace, $workspaceConfig);

        $this->printSuccessAndInstructions($workspace, $workflow);
    }

    /**
     * Get the json configuration of the Workspace
     *
     * @return mixed
     */
    function createWorkspaceConfig()
    {
        $fileContent = File::get("resources/workspace.json");
        $interpolatedContent = sprintfn($fileContent, $this->argument());
        return json_decode($interpolatedContent);
    }

    /**
     * Add workers to workspace
     *
     * @param $workspace WorkspaceFacade
     * @param $workspaceConfig string with Json
     */
    function addWorkersToWorkspace($workspace, $workspaceConfig)
    {
        $this->line("Add Workers.");
        $idleActivity = $workspace->findActivityByName("Idle")
        or die("The activity 'Idle' was not found. Workers cannot be added.");
        foreach ($workspaceConfig->workers as $workerJson) {
            $params = array();
            $params['friendlyName'] = $workerJson->name;
            $params['activitySid'] = $idleActivity->sid;
            $params['attributes'] = json_encode($workerJson->attributes);
            $workspace->addWorker($params);
        }
    }

    /**
     * Add the Task Queues to the workspace
     *
     * @param $workspace WorkspaceFacade
     * @param $workspaceConfig string with Json
     */
    function addTaskQueuesToWorkspace($workspace, $workspaceConfig)
    {
        $this->line("Add Task Queues.");
        $reservedActivity = $workspace->findActivityByName("Reserved");
        $assignmentActivity = $workspace->findActivityByName("Busy");
        foreach ($workspaceConfig->task_queues as $taskQueueJson) {
            $params = array();
            $params['friendlyName'] = $taskQueueJson->name;
            $params['targetWorkers'] = $taskQueueJson->targetWorkers;
            $params['reservationActivitySid'] = $reservedActivity->sid;
            $params['assignmentActivitySid'] = $assignmentActivity->sid;
            $workspace->addTaskQueue($params);
        }
    }

    /**
     * Create and configure the workflow to use in the workspace
     *
     * @param $workspace WorkspaceFacade
     * @param $workspaceConfig string with Json
     *
     * @return object with added workflow
     */
    function addWorkflowToWorkspace($workspace, $workspaceConfig)
    {
        $this->line("Add Worflow.");
        $workflowJson = $workspaceConfig->workflow;
        $params = array();
        $params['friendlyName'] = $workflowJson->name;
        $params['assignmentCallbackUrl'] = $workflowJson->callback;
        $params['taskReservationTimeout'] = $workflowJson->timeout;
        $params['configuration'] = $this->createWorkFlowJsonConfig(
            $workspace,
            $workflowJson
        );
        return $workspace->addWorkflow($params);
    }

    /**
     * Create the workflow configuration in json format
     *
     * @param $workspace
     * @param $workspaceConfig
     *
     * @return string configuration of workflow in json format
     */
    function createWorkFlowJsonConfig($workspace, $workspaceConfig)
    {
        $params = array();
        $defaultTaskQueue = $workspace->findTaskQueueByName("Default") or die(
            "The 'Default' task queue was not found. The Workflow cannot be created."
        );
        $smsTaskQueue = $workspace->findTaskQueueByName("SMS") or die(
            "The 'SMS' task queue was not found. The Workflow cannot be created."
        );
        $voiceTaskQueue = $workspace->findTaskQueueByName("Voice") or die(
            "The 'Voice' task queue was not found. The Workflow cannot be created."
        );

        $params["default_task_queue_sid"] = $defaultTaskQueue->sid;
        $params["sms_task_queue_sid"] = $smsTaskQueue->sid;
        $params["voice_task_queue_sid"] = $voiceTaskQueue->sid;

        $fileContent = File::get("resources/workflow.json");
        $interpolatedContent = sprintfn($fileContent, $params);
        return $interpolatedContent;
    }

    /**
     * Prints the message indicating the workspace was successfully created and
     * shows the commands to export the workspace variables into the environment.
     *
     * @param $workspace
     * @param $workflow
     */
    function printSuccessAndInstructions($workspace, $workflow)
    {
        $idleActivity = $workspace->findActivityByName("Idle")
        or die("Somehow the activity 'Idle' was not found.");
        $successMsg = "Workspace \"{$workspace->friendlyName}\"" .
            " was created successfully.";
        $this->printTitle($successMsg);
        $this->line(
            "The following variables will be set automatically."
        );
        $encondedWorkersPhone = http_build_query($workspace->getWorkerPhones());
        $envVars = [
            "WORKFLOW_SID" => $workflow->sid,
            "POST_WORK_ACTIVITY_SID" => $idleActivity->sid,
            "WORKSPACE_SID" => $workspace->sid,
            "PHONE_TO_WORKER" => $encondedWorkersPhone
        ];
        updateEnv($envVars);
        foreach ($envVars as $key => $value) {
            $this->warn("export $key=$value");
        }
    }

    /**
     * Prints a text separated up and doNwn by a token based line, usually "*"
     */
    function printTitle($text)
    {
        $lineLength = strlen($text) + 2;
        $this->line(str_repeat("*", $lineLength));
        $this->line(" $text ");
        $this->line(str_repeat("*", $lineLength));
    }
}
```

After creating our workers, let's set up the Task Queues.

## Create the Task Queues

Next, we set up the Task Queues. Each with a name and a `targetWorkers` property, which is an [expression](/docs/taskrouter/api/task-queue) to match Workers. Our Task Queues are:

1. `SMS` - Will target Workers specialized in Programmable SMS, such as Bob, using the expression `"products HAS \"ProgrammableSMS\""`.
2. `Voice` - Will do the same for Programmable Voice Workers, such as Alice, using the expression `"products HAS \"ProgrammableVoice\""`.
3. `All` - This queue targets all users and can be used when there are no specialist around for the chosen product. We can use the `"1==1"` expression here.

```php title="Create Task Queues" description="app/Console/Commands/CreateWorkspace.php"
// !mark(105:124)
<?php

namespace App\Console\Commands;

use App\TaskRouter\WorkspaceFacade;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use TaskRouter_Services_Twilio;
use Twilio\Rest\Client;
use Twilio\Rest\Taskrouter;
use WorkflowRuleTarget;

class CreateWorkspace extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'workspace:create
                            {host : Server hostname in Internet}
                            {bob_phone : Phone of the first agent (Bob)}
                            {alice_phone : Phone of the secondary agent (Alice)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates a Twilio workspace for 2 call agents';

    private $_twilioClient;

    /**
     * Create a new command instance.
     */
    public function __construct(Client $twilioClient)
    {
        parent::__construct();
        $this->_twilioClient = $twilioClient;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("Create workspace.");
        $this->line("- Server: \t{$this->argument('host')}");
        $this->line("- Bob phone: \t{$this->argument('bob_phone')}");
        $this->line("- Alice phone: \t{$this->argument('alice_phone')}");

        //Get the configuration
        $workspaceConfig = $this->createWorkspaceConfig();

        //Create the workspace
        $params = array();
        $params['friendlyName'] = $workspaceConfig->name;
        $params['eventCallbackUrl'] = $workspaceConfig->event_callback;
        $workspace = WorkspaceFacade::createNewWorkspace(
            $this->_twilioClient->taskrouter,
            $params
        );
        $this->addWorkersToWorkspace($workspace, $workspaceConfig);
        $this->addTaskQueuesToWorkspace($workspace, $workspaceConfig);
        $workflow = $this->addWorkflowToWorkspace($workspace, $workspaceConfig);

        $this->printSuccessAndInstructions($workspace, $workflow);
    }

    /**
     * Get the json configuration of the Workspace
     *
     * @return mixed
     */
    function createWorkspaceConfig()
    {
        $fileContent = File::get("resources/workspace.json");
        $interpolatedContent = sprintfn($fileContent, $this->argument());
        return json_decode($interpolatedContent);
    }

    /**
     * Add workers to workspace
     *
     * @param $workspace WorkspaceFacade
     * @param $workspaceConfig string with Json
     */
    function addWorkersToWorkspace($workspace, $workspaceConfig)
    {
        $this->line("Add Workers.");
        $idleActivity = $workspace->findActivityByName("Idle")
        or die("The activity 'Idle' was not found. Workers cannot be added.");
        foreach ($workspaceConfig->workers as $workerJson) {
            $params = array();
            $params['friendlyName'] = $workerJson->name;
            $params['activitySid'] = $idleActivity->sid;
            $params['attributes'] = json_encode($workerJson->attributes);
            $workspace->addWorker($params);
        }
    }

    /**
     * Add the Task Queues to the workspace
     *
     * @param $workspace WorkspaceFacade
     * @param $workspaceConfig string with Json
     */
    function addTaskQueuesToWorkspace($workspace, $workspaceConfig)
    {
        $this->line("Add Task Queues.");
        $reservedActivity = $workspace->findActivityByName("Reserved");
        $assignmentActivity = $workspace->findActivityByName("Busy");
        foreach ($workspaceConfig->task_queues as $taskQueueJson) {
            $params = array();
            $params['friendlyName'] = $taskQueueJson->name;
            $params['targetWorkers'] = $taskQueueJson->targetWorkers;
            $params['reservationActivitySid'] = $reservedActivity->sid;
            $params['assignmentActivitySid'] = $assignmentActivity->sid;
            $workspace->addTaskQueue($params);
        }
    }

    /**
     * Create and configure the workflow to use in the workspace
     *
     * @param $workspace WorkspaceFacade
     * @param $workspaceConfig string with Json
     *
     * @return object with added workflow
     */
    function addWorkflowToWorkspace($workspace, $workspaceConfig)
    {
        $this->line("Add Worflow.");
        $workflowJson = $workspaceConfig->workflow;
        $params = array();
        $params['friendlyName'] = $workflowJson->name;
        $params['assignmentCallbackUrl'] = $workflowJson->callback;
        $params['taskReservationTimeout'] = $workflowJson->timeout;
        $params['configuration'] = $this->createWorkFlowJsonConfig(
            $workspace,
            $workflowJson
        );
        return $workspace->addWorkflow($params);
    }

    /**
     * Create the workflow configuration in json format
     *
     * @param $workspace
     * @param $workspaceConfig
     *
     * @return string configuration of workflow in json format
     */
    function createWorkFlowJsonConfig($workspace, $workspaceConfig)
    {
        $params = array();
        $defaultTaskQueue = $workspace->findTaskQueueByName("Default") or die(
            "The 'Default' task queue was not found. The Workflow cannot be created."
        );
        $smsTaskQueue = $workspace->findTaskQueueByName("SMS") or die(
            "The 'SMS' task queue was not found. The Workflow cannot be created."
        );
        $voiceTaskQueue = $workspace->findTaskQueueByName("Voice") or die(
            "The 'Voice' task queue was not found. The Workflow cannot be created."
        );

        $params["default_task_queue_sid"] = $defaultTaskQueue->sid;
        $params["sms_task_queue_sid"] = $smsTaskQueue->sid;
        $params["voice_task_queue_sid"] = $voiceTaskQueue->sid;

        $fileContent = File::get("resources/workflow.json");
        $interpolatedContent = sprintfn($fileContent, $params);
        return $interpolatedContent;
    }

    /**
     * Prints the message indicating the workspace was successfully created and
     * shows the commands to export the workspace variables into the environment.
     *
     * @param $workspace
     * @param $workflow
     */
    function printSuccessAndInstructions($workspace, $workflow)
    {
        $idleActivity = $workspace->findActivityByName("Idle")
        or die("Somehow the activity 'Idle' was not found.");
        $successMsg = "Workspace \"{$workspace->friendlyName}\"" .
            " was created successfully.";
        $this->printTitle($successMsg);
        $this->line(
            "The following variables will be set automatically."
        );
        $encondedWorkersPhone = http_build_query($workspace->getWorkerPhones());
        $envVars = [
            "WORKFLOW_SID" => $workflow->sid,
            "POST_WORK_ACTIVITY_SID" => $idleActivity->sid,
            "WORKSPACE_SID" => $workspace->sid,
            "PHONE_TO_WORKER" => $encondedWorkersPhone
        ];
        updateEnv($envVars);
        foreach ($envVars as $key => $value) {
            $this->warn("export $key=$value");
        }
    }

    /**
     * Prints a text separated up and doNwn by a token based line, usually "*"
     */
    function printTitle($text)
    {
        $lineLength = strlen($text) + 2;
        $this->line(str_repeat("*", $lineLength));
        $this->line(" $text ");
        $this->line(str_repeat("*", $lineLength));
    }
}
```

We have a Workspace, Workers and Task Queues... what's left? A Workflow. Let's see how to create one next!

## Create a Workflow

Finally, we set up the Workflow using the following parameters:

1. `friendlyName` as the name of a Workflow.
2. `assignmentCallbackUrl` as the public URL where a request will be made when this Workflow assigns a Task to a Worker. We will learn how to implement it on the next steps.
3. `taskReservationTimeout` as the maximum time we want to wait until a Worker handles a Task.
4. `configuration` which is a set of rules for placing Task into Task Queues. The routing configuration will take a Task's attribute and match this with Task Queues. This application's Workflow rules are defined as:

   * `selected_product=="ProgrammableSMS"` expression for `SMS` Task Queue. This expression will match any Task with `ProgrammableSMS` as the `selected_product` attribute.
   * `selected_product=="ProgrammableVoice` expression for `Voice` Task Queue.

```php title="Create a Workflow" description="app/Console/Commands/CreateWorkspace.php"
// !mark(126:147)
<?php

namespace App\Console\Commands;

use App\TaskRouter\WorkspaceFacade;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use TaskRouter_Services_Twilio;
use Twilio\Rest\Client;
use Twilio\Rest\Taskrouter;
use WorkflowRuleTarget;

class CreateWorkspace extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'workspace:create
                            {host : Server hostname in Internet}
                            {bob_phone : Phone of the first agent (Bob)}
                            {alice_phone : Phone of the secondary agent (Alice)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates a Twilio workspace for 2 call agents';

    private $_twilioClient;

    /**
     * Create a new command instance.
     */
    public function __construct(Client $twilioClient)
    {
        parent::__construct();
        $this->_twilioClient = $twilioClient;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("Create workspace.");
        $this->line("- Server: \t{$this->argument('host')}");
        $this->line("- Bob phone: \t{$this->argument('bob_phone')}");
        $this->line("- Alice phone: \t{$this->argument('alice_phone')}");

        //Get the configuration
        $workspaceConfig = $this->createWorkspaceConfig();

        //Create the workspace
        $params = array();
        $params['friendlyName'] = $workspaceConfig->name;
        $params['eventCallbackUrl'] = $workspaceConfig->event_callback;
        $workspace = WorkspaceFacade::createNewWorkspace(
            $this->_twilioClient->taskrouter,
            $params
        );
        $this->addWorkersToWorkspace($workspace, $workspaceConfig);
        $this->addTaskQueuesToWorkspace($workspace, $workspaceConfig);
        $workflow = $this->addWorkflowToWorkspace($workspace, $workspaceConfig);

        $this->printSuccessAndInstructions($workspace, $workflow);
    }

    /**
     * Get the json configuration of the Workspace
     *
     * @return mixed
     */
    function createWorkspaceConfig()
    {
        $fileContent = File::get("resources/workspace.json");
        $interpolatedContent = sprintfn($fileContent, $this->argument());
        return json_decode($interpolatedContent);
    }

    /**
     * Add workers to workspace
     *
     * @param $workspace WorkspaceFacade
     * @param $workspaceConfig string with Json
     */
    function addWorkersToWorkspace($workspace, $workspaceConfig)
    {
        $this->line("Add Workers.");
        $idleActivity = $workspace->findActivityByName("Idle")
        or die("The activity 'Idle' was not found. Workers cannot be added.");
        foreach ($workspaceConfig->workers as $workerJson) {
            $params = array();
            $params['friendlyName'] = $workerJson->name;
            $params['activitySid'] = $idleActivity->sid;
            $params['attributes'] = json_encode($workerJson->attributes);
            $workspace->addWorker($params);
        }
    }

    /**
     * Add the Task Queues to the workspace
     *
     * @param $workspace WorkspaceFacade
     * @param $workspaceConfig string with Json
     */
    function addTaskQueuesToWorkspace($workspace, $workspaceConfig)
    {
        $this->line("Add Task Queues.");
        $reservedActivity = $workspace->findActivityByName("Reserved");
        $assignmentActivity = $workspace->findActivityByName("Busy");
        foreach ($workspaceConfig->task_queues as $taskQueueJson) {
            $params = array();
            $params['friendlyName'] = $taskQueueJson->name;
            $params['targetWorkers'] = $taskQueueJson->targetWorkers;
            $params['reservationActivitySid'] = $reservedActivity->sid;
            $params['assignmentActivitySid'] = $assignmentActivity->sid;
            $workspace->addTaskQueue($params);
        }
    }

    /**
     * Create and configure the workflow to use in the workspace
     *
     * @param $workspace WorkspaceFacade
     * @param $workspaceConfig string with Json
     *
     * @return object with added workflow
     */
    function addWorkflowToWorkspace($workspace, $workspaceConfig)
    {
        $this->line("Add Worflow.");
        $workflowJson = $workspaceConfig->workflow;
        $params = array();
        $params['friendlyName'] = $workflowJson->name;
        $params['assignmentCallbackUrl'] = $workflowJson->callback;
        $params['taskReservationTimeout'] = $workflowJson->timeout;
        $params['configuration'] = $this->createWorkFlowJsonConfig(
            $workspace,
            $workflowJson
        );
        return $workspace->addWorkflow($params);
    }

    /**
     * Create the workflow configuration in json format
     *
     * @param $workspace
     * @param $workspaceConfig
     *
     * @return string configuration of workflow in json format
     */
    function createWorkFlowJsonConfig($workspace, $workspaceConfig)
    {
        $params = array();
        $defaultTaskQueue = $workspace->findTaskQueueByName("Default") or die(
            "The 'Default' task queue was not found. The Workflow cannot be created."
        );
        $smsTaskQueue = $workspace->findTaskQueueByName("SMS") or die(
            "The 'SMS' task queue was not found. The Workflow cannot be created."
        );
        $voiceTaskQueue = $workspace->findTaskQueueByName("Voice") or die(
            "The 'Voice' task queue was not found. The Workflow cannot be created."
        );

        $params["default_task_queue_sid"] = $defaultTaskQueue->sid;
        $params["sms_task_queue_sid"] = $smsTaskQueue->sid;
        $params["voice_task_queue_sid"] = $voiceTaskQueue->sid;

        $fileContent = File::get("resources/workflow.json");
        $interpolatedContent = sprintfn($fileContent, $params);
        return $interpolatedContent;
    }

    /**
     * Prints the message indicating the workspace was successfully created and
     * shows the commands to export the workspace variables into the environment.
     *
     * @param $workspace
     * @param $workflow
     */
    function printSuccessAndInstructions($workspace, $workflow)
    {
        $idleActivity = $workspace->findActivityByName("Idle")
        or die("Somehow the activity 'Idle' was not found.");
        $successMsg = "Workspace \"{$workspace->friendlyName}\"" .
            " was created successfully.";
        $this->printTitle($successMsg);
        $this->line(
            "The following variables will be set automatically."
        );
        $encondedWorkersPhone = http_build_query($workspace->getWorkerPhones());
        $envVars = [
            "WORKFLOW_SID" => $workflow->sid,
            "POST_WORK_ACTIVITY_SID" => $idleActivity->sid,
            "WORKSPACE_SID" => $workspace->sid,
            "PHONE_TO_WORKER" => $encondedWorkersPhone
        ];
        updateEnv($envVars);
        foreach ($envVars as $key => $value) {
            $this->warn("export $key=$value");
        }
    }

    /**
     * Prints a text separated up and doNwn by a token based line, usually "*"
     */
    function printTitle($text)
    {
        $lineLength = strlen($text) + 2;
        $this->line(str_repeat("*", $lineLength));
        $this->line(" $text ");
        $this->line(str_repeat("*", $lineLength));
    }
}
```

Our workspace is completely setup. Now it's time to see how we use it to route calls.

## Handle Twilio's Request

Right after receiving a call, Twilio will send a request to the URL specified on the [number's configuration](/console/phone-numbers/incoming).

The endpoint will then process the request and generate a TwiML response. We'll use the [Say](/docs/voice/twiml/say) verb to give the user product alternatives, and a key they can press in order to select one. The [Gather](/docs/voice/twiml/gather) verb allows us to capture the user's key press.

```php title="Handle Incoming Call" description="app/Http/Controllers/IncomingCallController.php"
// !mark(8:33)
<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Twilio\Twiml;

/**
 * Class IncomingCallController
 *
 * @package App\Http\Controllers
 */
class IncomingCallController extends Controller
{

    public function respondToUser()
    {
        $response = new Twiml();

        $params = array();
        $params['action'] = '/call/enqueue';
        $params['numDigits'] = 1;
        $params['timeout'] = 10;
        $params['method'] = "POST";

        $params = $response->gather($params);
        $params->say(
            'For Programmable SMS, press one. For Voice, press any other key.'
        );

        return response($response)->header('Content-Type', 'text/xml');
    }
}
```

We just asked the caller to choose a product, next we will use their choice to create the appropriate Task.

## Create a Task

This is the endpoint set as the `action` URL on the `Gather` verb on the previous step. A request is made to this endpoint when the user presses a key during the call. This request has a `Digits` parameter that holds the pressed keys. A `Task` will be created based on the pressed digit with the `selected_product` as an attribute. The Workflow will take this Task's attributes and match them with the [configured expressions](/docs/taskrouter/expression-syntax) in order to find a corresponding Task Queue, so an appropriate available Worker can be assigned to handle it.

We use the [`Enqueue` verb](/docs/voice/twiml/enqueue) with a `workflowSid` attribute to [integrate with TaskRouter](/docs/taskrouter/twiml-queue-calls#using-enqueue-to-route-calls-with-taskrouter). Then the voice call will be put on hold while TaskRouter tries to find an available Worker to handle this Task.

```php title="Create a Task" description="app/Http/Controllers/EnqueueCallController.php"
// !mark(9:47)
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\Twiml;


/**
 * Class EnqueueCallController
 *
 * @package App\Http\Controllers
 */
class EnqueueCallController extends Controller
{

    public function enqueueCall(Request $request)
    {
        $workflowSid = config('services.twilio')['workflowSid']
        or die("WORKFLOW_SID is not set in the system environment");

        $selectProductInstruction = new \StdClass();
        $selectProductInstruction->selected_product
            = $this->_getSelectedProduct($request);

        $response = new Twiml();
        $enqueue = $response->enqueue(['workflowSid' => $workflowSid]);
        $enqueue->task(json_encode($selectProductInstruction));

        return response($response)->header('Content-Type', 'text/xml');
    }

    /**
     * Gets the wanted product upon the user's input
     *
     * @param $request Request of the user
     *
     * @return string selected product: "ProgrammableSMS" or "ProgrammableVoice"
     */
    private function _getSelectedProduct($request)
    {
        return $request->input("Digits") == 1
            ? "ProgrammableSMS"
            : "ProgrammableVoice";
    }
}
```

After sending a Task to Twilio, let's see how we tell TaskRouter which Worker to use to execute that task.

## Assign a Worker

When TaskRouter selects a Worker, it does the following:

1. The Task's Assignment Status is set to `reserved`.
2. A [Reservation instance](/docs/taskrouter/api/reservations) is generated, linking the Task to the selected Worker.
3. At the same time the Reservation is created, a `POST` request is made to the Workflow's AssignmentCallbackURL, which was configured using the Artisan command [`workspace:create`](https://github.com/TwilioDevEd/task-router-laravel/blob/master/app/Console/Commands/CreateWorkspace.php). This request includes the full details of the Task, the selected Worker, and the Reservation.

Handling this [Assignment Callback](/docs/taskrouter/handle-assignment-callbacks) is a key component of building a TaskRouter application as we can instruct how the Worker will handle a Task. We could send a text, email, push notifications or make a call.

Since we created this Task during a voice call with an `Enqueue` verb, let's [instruct TaskRouter to dequeue](/docs/taskrouter/handle-assignment-callbacks#dequeue-call) the call and dial a Worker. If we do not specify a `to` parameter with a phone number, TaskRouter will pick the Worker's `contact_uri` attribute.

We also send a `post_work_activity_sid` which will tell TaskRouter which [Activity](/docs/taskrouter/quickstart/ruby/setup-understanding-activities) to assign this worker after the call ends.

```php title="Assign a Worker" description="app/Http/Controllers/CallbackController.php"
// !mark(18:32)
<?php

namespace App\Http\Controllers;

use App\Exceptions\TaskRouterException;
use App\MissedCall;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Twilio\Rest\Client;

/**
 * Class CallbackController Handles callbacks
 *
 * @package App\Http\Controllers
 */
class CallbackController extends Controller
{
    /**
     * Callback endpoint for Task assignments
     */
    public function assignTask()
    {
        $dequeueInstructionModel = new \stdClass;
        $dequeueInstructionModel->instruction = "dequeue";
        $dequeueInstructionModel->post_work_activity_sid
            = config('services.twilio')['postWorkActivitySid'];

        $dequeueInstructionJson = json_encode($dequeueInstructionModel);

        return response($dequeueInstructionJson)
            ->header('Content-Type', 'application/json');
    }

    /**
     * Events callback for missed calls
     *
     * @param $request Request with the input data
     * @param $twilioClient Client of the Twilio Rest Api
     */
    public function handleEvent(Request $request, Client $twilioClient)
    {
        $missedCallEvents = config('services.twilio')['missedCallEvents'];

        $eventTypeName = $request->input("EventType");

        if (in_array($eventTypeName, $missedCallEvents)) {
            $taskAttr = $this->parseAttributes("TaskAttributes", $request);
            if (!empty($taskAttr)) {
                $this->addMissingCall($taskAttr);

                $message = config('services.twilio')["leaveMessage"];
                return $this->redirectToVoiceMail(
                    $twilioClient, $taskAttr->call_sid, $message
                );
            }
        } else if ('worker.activity.update' === $eventTypeName) {
            $workerActivityName = $request->input("WorkerActivityName");
            if ($workerActivityName === "Offline") {
                $workerAttr = $this->parseAttributes("WorkerAttributes", $request);
                $this->notifyOfflineStatusToWorker(
                    $workerAttr->contact_uri, $twilioClient
                );
            }
        }
    }

    protected function parseAttributes($name, $request)
    {
        $attrJson = $request->input($name);
        return json_decode($attrJson);
    }

    protected function addMissingCall($task)
    {
        $missedCall = new MissedCall(
            [
            "selected_product" => $task->selected_product,
            "phone_number" => $task->from
            ]
        );
        $missedCall->save();
        Log::info("New missed call added: $missedCall");
    }

    protected function redirectToVoiceMail($twilioClient, $callSid, $message)
    {
        $missedCallsEmail = config('services.twilio')['missedCallsEmail']
            or die("MISSED_CALLS_EMAIL_ADDRESS is not set in the environment");

        $call = $twilioClient->calls->getContext($callSid);
        if (!$call) {
            throw new TaskRouterException("The specified call does not exist");
        }

        $encodedMsg = urlencode($message);
        $twimletUrl = "https://twimlets.com/voicemail?Email=$missedCallsEmail" .
            "&Message=$encodedMsg";
        $call->update(["url" => $twimletUrl, "method" => "POST"]);
    }

    protected function notifyOfflineStatusToWorker($workerPhone, $twilioClient)
    {
        $twilioNumber = config('services.twilio')['number']
        or die("TWILIO_NUMBER is not set in the system environment");

        $params = [
            "from" => $twilioNumber,
            "body" => config('services.twilio')["offlineMessage"]
        ];

        $twilioClient->account->messages->create(
            $workerPhone,
            $params
        );
    }

}
```

Now that our Tasks are routed properly, let's deal with missed calls in the next step.

## Collect Missed Calls

This endpoint will be called after each [TaskRouter Event](/docs/taskrouter/api/event) is triggered. In our application, we are trying to collect missed calls, so we would like to handle the `workflow.timeout` event. This event is triggered when the Task waits more than the limit set on Workflow Configuration-- or rather when no worker is available.

Here we use TwilioRestClient to route this call to a [Voicemail Twimlet](https://www.twilio.com/labs/twimlets/voicemail). Twimlets are tiny web applications for voice. This one will generate a `TwiML` response using `Say` verb and record a message using `Record` verb. The recorded message will then be transcribed and sent to the email address configured.

We are also listening for `task.canceled`. This is triggered when the customer hangs up before being assigned to an agent, therefore canceling the task. Capturing this event allows us to collect the information from the customers that hang up before the Workflow times out.

```php title="Collect Missed Calls" description="app/Http/Controllers/CallbackController.php"
// !mark(34:65,73:99)
<?php

namespace App\Http\Controllers;

use App\Exceptions\TaskRouterException;
use App\MissedCall;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Twilio\Rest\Client;

/**
 * Class CallbackController Handles callbacks
 *
 * @package App\Http\Controllers
 */
class CallbackController extends Controller
{
    /**
     * Callback endpoint for Task assignments
     */
    public function assignTask()
    {
        $dequeueInstructionModel = new \stdClass;
        $dequeueInstructionModel->instruction = "dequeue";
        $dequeueInstructionModel->post_work_activity_sid
            = config('services.twilio')['postWorkActivitySid'];

        $dequeueInstructionJson = json_encode($dequeueInstructionModel);

        return response($dequeueInstructionJson)
            ->header('Content-Type', 'application/json');
    }

    /**
     * Events callback for missed calls
     *
     * @param $request Request with the input data
     * @param $twilioClient Client of the Twilio Rest Api
     */
    public function handleEvent(Request $request, Client $twilioClient)
    {
        $missedCallEvents = config('services.twilio')['missedCallEvents'];

        $eventTypeName = $request->input("EventType");

        if (in_array($eventTypeName, $missedCallEvents)) {
            $taskAttr = $this->parseAttributes("TaskAttributes", $request);
            if (!empty($taskAttr)) {
                $this->addMissingCall($taskAttr);

                $message = config('services.twilio')["leaveMessage"];
                return $this->redirectToVoiceMail(
                    $twilioClient, $taskAttr->call_sid, $message
                );
            }
        } else if ('worker.activity.update' === $eventTypeName) {
            $workerActivityName = $request->input("WorkerActivityName");
            if ($workerActivityName === "Offline") {
                $workerAttr = $this->parseAttributes("WorkerAttributes", $request);
                $this->notifyOfflineStatusToWorker(
                    $workerAttr->contact_uri, $twilioClient
                );
            }
        }
    }

    protected function parseAttributes($name, $request)
    {
        $attrJson = $request->input($name);
        return json_decode($attrJson);
    }

    protected function addMissingCall($task)
    {
        $missedCall = new MissedCall(
            [
            "selected_product" => $task->selected_product,
            "phone_number" => $task->from
            ]
        );
        $missedCall->save();
        Log::info("New missed call added: $missedCall");
    }

    protected function redirectToVoiceMail($twilioClient, $callSid, $message)
    {
        $missedCallsEmail = config('services.twilio')['missedCallsEmail']
            or die("MISSED_CALLS_EMAIL_ADDRESS is not set in the environment");

        $call = $twilioClient->calls->getContext($callSid);
        if (!$call) {
            throw new TaskRouterException("The specified call does not exist");
        }

        $encodedMsg = urlencode($message);
        $twimletUrl = "https://twimlets.com/voicemail?Email=$missedCallsEmail" .
            "&Message=$encodedMsg";
        $call->update(["url" => $twimletUrl, "method" => "POST"]);
    }

    protected function notifyOfflineStatusToWorker($workerPhone, $twilioClient)
    {
        $twilioNumber = config('services.twilio')['number']
        or die("TWILIO_NUMBER is not set in the system environment");

        $params = [
            "from" => $twilioNumber,
            "body" => config('services.twilio')["offlineMessage"]
        ];

        $twilioClient->account->messages->create(
            $workerPhone,
            $params
        );
    }

}
```

Most of the features of our application are implemented. The last piece is allowing the Workers to change their availability status. Let's see how to do that next.

## Change a Worker's Activity

We have created this endpoint, so a worker can send an SMS message to the support line with the command "On" or "Off" to change their availability status.

This is important as a worker's activity will change to `Offline` when they miss a call. When this happens, they receive an SMS letting them know that their activity has changed, and that they can reply with the `On` command to make themselves available for incoming calls again.

```php title="Update Worker Status" description="app/Http/Controllers/MessageController.php"
// !mark(10:50)
<?php

namespace App\Http\Controllers;

use App\Exceptions\TaskRouterException;
use Illuminate\Http\Request;
use App\TaskRouter\WorkspaceFacade;
use Twilio\Twiml;

class MessageController extends Controller
{

    public function handleIncomingMessage(
        Request $request, WorkspaceFacade $workspace
    ) {
        $cmd = strtolower($request->input("Body"));
        $fromNumber = $request->input("From");
        $newWorkerStatus = ($cmd === "off") ? "Offline" : "Idle";

        $response = new Twiml();

        try {
            $worker = $this->getWorkerByPhone($fromNumber, $workspace);
            $this->updateWorkerStatus($worker, $newWorkerStatus, $workspace);

            $response->sms("Your status has changed to {$newWorkerStatus}");

        } catch (TaskRouterException $e) {
            $response->sms($e->getMessage());
        }

        return response($response)->header('Content-Type', 'text/xml');
    }

    function updateWorkerStatus($worker, $status, $workspace)
    {
        $wantedActivity = $workspace->findActivityByName($status);
        $workspace->updateWorkerActivity($worker, $wantedActivity->sid);
    }

    protected function getWorkerByPhone($phone, $workspace)
    {
        $phoneToWorkerStr = config('services.twilio')['phoneToWorker'];
        parse_str($phoneToWorkerStr, $phoneToWorkerArray);
        if (empty($phoneToWorkerArray[$phone])) {
            throw new TaskRouterException("You are not a valid worker");
        }
        return $workspace->findWorkerBySid($phoneToWorkerArray[$phone]);
    }
}
```

Congratulations! You finished this tutorial. As you can see, using Twilio's TaskRouter is quite simple.

## Where to next?

If you're a PHP developer working with Twilio, you might also enjoy these tutorials:

**[Automated-Survey](https://www.twilio.com/blog/automated-survey-php-laravel)**

Instantly collect structured data from your users with a survey conducted over a call or SMS text messages. Let's get started!

**[ETA-Notifications](https://www.twilio.com/blog/eta-notifications-php-laravel)**

Learn how to implement ETA Notifications using Laravel and Twilio.
