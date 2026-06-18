# Dynamic Call Center with Java and Servlets

In this tutorial we will show how to automate the routing of calls from customers to your support agents. Customers will be able to select a product and wait while TaskRouter tries to contact a product specialist for the best support experience. If no one is available, our application will save the customer's number and selected product so an agent can call them back later on.

## This is what the application does at a high level

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

```json title="Configuring the Workspace" description="/src/main/resources/workspace.json"
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
        "contact_uri": "%(bob_number)s"
      }
    },
    {
      "name": "Alice",
      "attributes": {
        "products": [
          "ProgrammableVoice"
        ],
        "contact_uri": "%(alice_number)s"
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
    "timeout": "15",
    "routingConfiguration": [
      {
        "expression": "selected_product==\"ProgrammableSMS\"",
        "targetTaskQueue": "SMS"
      },
      {
        "expression": "selected_product==\"ProgrammableVoice\"",
        "targetTaskQueue": "Voice"
      }
    ]
  }
}
```

In order to build a client for this API, we need as system variables a `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` which you can find on [Twilio Console](/console). The class `TwilioAppSettings` creates a `TwilioTaskRouterClient`, which is provided by the [Twilio Java library](https://www.twilio.com/docs/libraries/reference/twilio-java/). This client is used by WorkspaceFacade which encapsulates all logic related to the `Workspace` class.

Let's take a look at a Gradle task that will handle the Workspace setup for us.

## The CreateWorkspace Gradle Task

In this application the [Gradle task](https://docs.gradle.org/current/userguide/more_about_tasks.html) `createWorkspace` is used to orchestrate calls to our `WorkspaceFacade` class in order to handle a Workspace. `CreateWorkspaceTask` is the java main class behind the Gradle task. It uses data provided by `workspace.json` and expects 3 arguments in the following order:

1. `hostname` - A public URL to which Twilio can send requests. This can be either a cloud service or [ngrok](https://ngrok.com/), which can expose a local application to the internet.
2. `bobPhone` - The telephone number of Bob, the Programmable SMS specialist.
3. `alicePhone` - Same for Alice, the Programmable Voice specialist.

The function `createWorkspaceConfig` is used to load the configuration of the workspace from `workspace.json`.

```java title="CreateWorkspace Gradle Task" description="src/main/java/com/twilio/taskrouter/application/CreateWorkspaceTask.java"
// !mark(49:74,77:78,194:217)
package com.twilio.taskrouter.application;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.twilio.rest.taskrouter.v1.workspace.Activity;
import com.twilio.rest.taskrouter.v1.workspace.TaskQueue;
import com.twilio.rest.taskrouter.v1.workspace.Workflow;
import com.twilio.taskrouter.WorkflowRule;
import com.twilio.taskrouter.WorkflowRuleTarget;
import com.twilio.taskrouter.domain.common.TwilioAppSettings;
import com.twilio.taskrouter.domain.common.Utils;
import com.twilio.taskrouter.domain.error.TaskRouterException;
import com.twilio.taskrouter.domain.model.WorkspaceFacade;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.text.StrSubstitutor;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonReader;
import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import static java.lang.System.exit;

//import org.apache.commons.lang3.StringUtils;
//import org.apache.commons.lang3.text.StrSubstitutor;

/**
 * Creates a workspace
 */
class CreateWorkspaceTask {

  private static final Logger LOG = Logger.getLogger(CreateWorkspaceTask.class.getName());

  public static void main(String[] args) {

    System.out.println("Creating workspace...");
    if (args.length < 3) {
      System.out.println("You must specify 3 parameters:");
      System.out.println("- Server hostname. E.g, <hash>.ngrok.com");
      System.out.println("- Phone of the first agent (Bob)");
      System.out.println("- Phone of the secondary agent (Alice)");
      exit(1);
    }

    String hostname = args[0];
    String bobPhone = args[1];
    String alicePhone = args[2];
    System.out.println(String.format("Server: %s\nBob phone: %s\nAlice phone: %s\n",
      hostname, bobPhone, alicePhone));

    //Get the configuration
    JsonObject workspaceConfig = createWorkspaceConfig(args);

    //Get or Create the Workspace
    Injector injector = Guice.createInjector();
    final TwilioAppSettings twilioSettings = injector.getInstance(TwilioAppSettings.class);

    String workspaceName = workspaceConfig.getString("name");
    Map<String, String> workspaceParams = new HashMap<>();
    workspaceParams.put("FriendlyName", workspaceName);
    workspaceParams.put("EventCallbackUrl", workspaceConfig.getString("event_callback"));

    try {
      WorkspaceFacade workspaceFacade = WorkspaceFacade
        .create(twilioSettings.getTwilioRestClient(), workspaceParams);

      addWorkersToWorkspace(workspaceFacade, workspaceConfig);
      addTaskQueuesToWorkspace(workspaceFacade, workspaceConfig);
      Workflow workflow = addWorkflowToWorkspace(workspaceFacade, workspaceConfig);

      printSuccessAndExportVariables(workspaceFacade, workflow, twilioSettings);
    } catch (TaskRouterException e) {
      LOG.severe(e.getMessage());
      exit(1);
    }
  }

  public static void addWorkersToWorkspace(WorkspaceFacade workspaceFacade,
                                           JsonObject workspaceJsonConfig) {
    JsonArray workersJson = workspaceJsonConfig.getJsonArray("workers");
    Activity idleActivity = workspaceFacade.getIdleActivity();

    workersJson.getValuesAs(JsonObject.class).forEach(workerJson -> {
      Map<String, String> workerParams = new HashMap<>();
      workerParams.put("FriendlyName", workerJson.getString("name"));
      workerParams.put("ActivitySid", idleActivity.getSid());
      workerParams.put("Attributes", workerJson.getJsonObject("attributes").toString());

      try {
        workspaceFacade.addWorker(workerParams);
      } catch (TaskRouterException e) {
        LOG.warning(e.getMessage());
      }
    });
  }

  public static void addTaskQueuesToWorkspace(WorkspaceFacade workspaceFacade,
                                              JsonObject workspaceJsonConfig) {
    JsonArray taskQueuesJson = workspaceJsonConfig.getJsonArray("task_queues");
    Activity reservationActivity = workspaceFacade.findActivityByName("Reserved").orElseThrow(() ->
      new TaskRouterException("The activity for reservations 'Reserved' was not found. "
        + "TaskQueues cannot be added."));
    Activity assignmentActivity = workspaceFacade.findActivityByName("Busy").orElseThrow(() ->
      new TaskRouterException("The activity for assignments 'Busy' was not found. "
        + "TaskQueues cannot be added."));
    taskQueuesJson.getValuesAs(JsonObject.class).forEach(taskQueueJson -> {
      Map<String, String> taskQueueParams = new HashMap<>();
      taskQueueParams.put("FriendlyName", taskQueueJson.getString("name"));
      taskQueueParams.put("TargetWorkers", taskQueueJson.getString("targetWorkers"));
      taskQueueParams.put("ReservationActivitySid", reservationActivity.getSid());
      taskQueueParams.put("AssignmentActivitySid", assignmentActivity.getSid());

      try {
        workspaceFacade.addTaskQueue(taskQueueParams);
      } catch (TaskRouterException e) {
        LOG.warning(e.getMessage());
      }
    });
  }

  public static Workflow addWorkflowToWorkspace(WorkspaceFacade workspaceFacade,
                                                JsonObject workspaceConfig) {
    JsonObject workflowJson = workspaceConfig.getJsonObject("workflow");
    String workflowName = workflowJson.getString("name");
    return workspaceFacade.findWorkflowByName(workflowName)
      .orElseGet(() -> {
        Map<String, String> workflowParams = new HashMap<>();
        workflowParams.put("FriendlyName", workflowName);
        workflowParams.put("AssignmentCallbackUrl", workflowJson.getString("callback"));
        workflowParams.put("FallbackAssignmentCallbackUrl", workflowJson.getString("callback"));
        workflowParams.put("TaskReservationTimeout", workflowJson.getString("timeout"));

        String workflowConfigJson = createWorkFlowJsonConfig(workspaceFacade, workflowJson);
        workflowParams.put("Configuration", workflowConfigJson);

        return workspaceFacade.addWorkflow(workflowParams);
      });
  }

  public static void printSuccessAndExportVariables(WorkspaceFacade workspaceFacade,
                                                    Workflow workflow,
                                                    TwilioAppSettings twilioSettings) {
    Activity idleActivity = workspaceFacade.getIdleActivity();

    Properties workspaceParams = new Properties();
    workspaceParams.put("account.sid", twilioSettings.getTwilioAccountSid());
    workspaceParams.put("auth.token", twilioSettings.getTwilioAuthToken());
    workspaceParams.put("workspace.sid", workspaceFacade.getSid());
    workspaceParams.put("workflow.sid", workflow.getSid());
    workspaceParams.put("postWorkActivity.sid", idleActivity.getSid());
    workspaceParams.put("email", twilioSettings.getEmail());
    workspaceParams.put("phoneNumber", twilioSettings.getPhoneNumber().toString());

    File workspacePropertiesFile = new File(TwilioAppSettings.WORKSPACE_PROPERTIES_FILE_PATH);

    try {
      Utils.saveProperties(workspaceParams,
        workspacePropertiesFile,
        "Properties for last created Twilio TaskRouter workspace");
    } catch (IOException e) {
      LOG.severe("Could not save workspace.properties with current configuration");
      exit(1);
    }

    String successMsg = String.format("Workspace '%s' was created successfully.",
      workspaceFacade.getFriendlyName());
    final int lineLength = successMsg.length() + 2;

    System.out.println(StringUtils.repeat("#", lineLength));
    System.out.println(String.format(" %s ", successMsg));
    System.out.println(StringUtils.repeat("#", lineLength));
    System.out.println("The following variables were registered:");
    System.out.println("\n");
    workspaceParams.entrySet().stream().forEach(propertyEntry -> {
      System.out.println(String.format("%s=%s", propertyEntry.getKey(), propertyEntry.getValue()));
    });
    System.out.println("\n");
    System.out.println(StringUtils.repeat("#", lineLength));
  }

  public static JsonObject createWorkspaceConfig(String[] args) {
    final String configFileName = "workspace.json";

    Optional<URL> url =
      Optional.ofNullable(CreateWorkspaceTask.class.getResource(File.separator + configFileName));
    return url.map(u -> {
      try {
        File workspaceConfigJsonFile = new File(u.toURI());
        String jsonContent = Utils.readFileContent(workspaceConfigJsonFile);
        String parsedContent = parseWorkspaceJsonContent(jsonContent, args);

        try (JsonReader jsonReader = Json.createReader(new StringReader(parsedContent))) {
          return jsonReader.readObject();
        }
      } catch (URISyntaxException e) {
        throw new TaskRouterException(String.format("Wrong uri to find %s: %s",
          configFileName, e.getMessage()));
      } catch (IOException e) {
        throw new TaskRouterException(String.format("Error while reading %s: %s",
          configFileName, e.getMessage()));
      }
    }).orElseThrow(
      () -> new TaskRouterException("There's no valid configuration in " + configFileName));
  }

  private static String parseWorkspaceJsonContent(final String unparsedContent,
                                                  final String... args) {
    Map<String, String> values = new HashMap<>();
    values.put("host", args[0]);
    values.put("bob_number", args[1]);
    values.put("alice_number", args[2]);

    StrSubstitutor strSubstitutor = new StrSubstitutor(values, "%(", ")s");
    return strSubstitutor.replace(unparsedContent);
  }

  public static String createWorkFlowJsonConfig(WorkspaceFacade workspaceFacade,
                                                JsonObject workflowJson) {
    try {
      JsonArray routingConfigRules = workflowJson.getJsonArray("routingConfiguration");
      TaskQueue defaultQueue = workspaceFacade.findTaskQueueByName("Default")
        .orElseThrow(() -> new TaskRouterException("Default queue not found"));
      WorkflowRuleTarget defaultRuleTarget = new WorkflowRuleTarget.Builder(defaultQueue.getSid())
        .expression("1=1")
        .priority(1)
        .timeout(30)
        .build();

      List<WorkflowRule> rules = routingConfigRules.getValuesAs(JsonObject.class).stream()
        .map(ruleJson -> {
          String ruleQueueName = ruleJson.getString("targetTaskQueue");
          TaskQueue ruleQueue = workspaceFacade.findTaskQueueByName(ruleQueueName).orElseThrow(
            () -> new TaskRouterException(String.format("%s queue not found", ruleQueueName)));

          WorkflowRuleTarget queueRuleTarget = new WorkflowRuleTarget.Builder(ruleQueue.getSid())
            .priority(5)
            .timeout(30)
            .build();

          List<WorkflowRuleTarget> ruleTargets = Arrays.asList(queueRuleTarget, defaultRuleTarget);

          return new WorkflowRule.Builder(ruleJson.getString("expression"), ruleTargets).build();
        }).collect(Collectors.toList());

      com.twilio.taskrouter.Workflow config;
      config = new com.twilio.taskrouter.Workflow(rules, defaultRuleTarget);
      return config.toJson();
    } catch (Exception ex) {
      throw new TaskRouterException("Error while creating workflow json configuration", ex);
    }
  }
}
```

Now let's look in more detail at all the steps, starting with the creation of the workspace itself.

## Create a Workspace

Before creating a workspace, we need to delete any others with the same `FriendlyName` as identifier. In order to create a workspace we need to provide a `FriendlyName`, and a `EventCallbackUrl` which contains a URL to be called every time an event is triggered in the workspace.

```java title="Create Workspace" description="src/main/java/com/twilio/taskrouter/domain/model/WorkspaceFacade.java"
// !mark(46:63)
package com.twilio.taskrouter.domain.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.twilio.base.ResourceSet;
import com.twilio.http.TwilioRestClient;
import com.twilio.rest.taskrouter.v1.Workspace;
import com.twilio.rest.taskrouter.v1.WorkspaceCreator;
import com.twilio.rest.taskrouter.v1.WorkspaceDeleter;
import com.twilio.rest.taskrouter.v1.WorkspaceFetcher;
import com.twilio.rest.taskrouter.v1.WorkspaceReader;
import com.twilio.rest.taskrouter.v1.workspace.Activity;
import com.twilio.rest.taskrouter.v1.workspace.ActivityReader;
import com.twilio.rest.taskrouter.v1.workspace.TaskQueue;
import com.twilio.rest.taskrouter.v1.workspace.TaskQueueCreator;
import com.twilio.rest.taskrouter.v1.workspace.TaskQueueReader;
import com.twilio.rest.taskrouter.v1.workspace.Worker;
import com.twilio.rest.taskrouter.v1.workspace.WorkerCreator;
import com.twilio.rest.taskrouter.v1.workspace.WorkerReader;
import com.twilio.rest.taskrouter.v1.workspace.WorkerUpdater;
import com.twilio.rest.taskrouter.v1.workspace.Workflow;
import com.twilio.rest.taskrouter.v1.workspace.WorkflowCreator;
import com.twilio.rest.taskrouter.v1.workspace.WorkflowReader;
import com.twilio.taskrouter.domain.error.TaskRouterException;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.StreamSupport;

public class WorkspaceFacade {

  private final TwilioRestClient client;

  private final Workspace workspace;

  private Activity idleActivity;

  private Map<String, Worker> phoneToWorker;

  public WorkspaceFacade(TwilioRestClient client, Workspace workspace) {
    this.client = client;
    this.workspace = workspace;
  }

  public static WorkspaceFacade create(TwilioRestClient client,
                                       Map<String, String> params) {
    String workspaceName = params.get("FriendlyName");
    String eventCallbackUrl = params.get("EventCallbackUrl");

    ResourceSet<Workspace> execute = new WorkspaceReader()
      .setFriendlyName(workspaceName)
      .read(client);
    StreamSupport.stream(execute.spliterator(), false)
      .findFirst()
      .ifPresent(workspace -> new WorkspaceDeleter(workspace.getSid()).delete(client));

    Workspace workspace = new WorkspaceCreator(workspaceName)
      .setEventCallbackUrl(eventCallbackUrl)
      .create(client);

    return new WorkspaceFacade(client, workspace);
  }

  public static Optional<WorkspaceFacade> findBySid(String workspaceSid,
                                                    TwilioRestClient client) {
    Workspace workspace = new WorkspaceFetcher(workspaceSid).fetch(client);
    return Optional.of(new WorkspaceFacade(client, workspace));
  }

  public String getFriendlyName() {
    return workspace.getFriendlyName();
  }

  public String getSid() {
    return workspace.getSid();
  }

  public Worker addWorker(Map<String, String> workerParams) {
    return new WorkerCreator(workspace.getSid(), workerParams.get("FriendlyName"))
      .setActivitySid(workerParams.get("ActivitySid"))
      .setAttributes(workerParams.get("Attributes"))
      .create(client);
  }

  public void addTaskQueue(Map<String, String> taskQueueParams) {
    new TaskQueueCreator(this.workspace.getSid(),
      taskQueueParams.get("FriendlyName"),
      taskQueueParams.get("ReservationActivitySid"),
      taskQueueParams.get("AssignmentActivitySid"))
      .create(client);
  }

  public Workflow addWorkflow(Map<String, String> workflowParams) {
    return new WorkflowCreator(workspace.getSid(),
      workflowParams.get("FriendlyName"),
      workflowParams.get("Configuration"))
      .setAssignmentCallbackUrl(workflowParams.get("AssignmentCallbackUrl"))
      .setFallbackAssignmentCallbackUrl(workflowParams.get("FallbackAssignmentCallbackUrl"))
      .setTaskReservationTimeout(Integer.valueOf(workflowParams.get("TaskReservationTimeout")))
      .create(client);
  }

  public Optional<Activity> findActivityByName(String activityName) {
    return StreamSupport.stream(new ActivityReader(this.workspace.getSid())
      .setFriendlyName(activityName)
      .read(client).spliterator(), false
    ).findFirst();
  }

  public Optional<TaskQueue> findTaskQueueByName(String queueName) {
    return StreamSupport.stream(new TaskQueueReader(this.workspace.getSid())
      .setFriendlyName(queueName)
      .read(client).spliterator(), false
    ).findFirst();
  }

  public Optional<Workflow> findWorkflowByName(String workflowName) {
    return StreamSupport.stream(new WorkflowReader(this.workspace.getSid())
      .setFriendlyName(workflowName)
      .read(client).spliterator(), false
    ).findFirst();
  }

  public Optional<Worker> findWorkerByPhone(String workerPhone) {
    return Optional.ofNullable(getPhoneToWorker().get(workerPhone));
  }

  public Map<String, Worker> getPhoneToWorker() {
    if (phoneToWorker == null) {
      phoneToWorker = new HashMap<>();
      StreamSupport.stream(
        new WorkerReader(this.workspace.getSid()).read(client).spliterator(), false
      ).forEach(worker -> {
        try {
          HashMap<String, Object> attributes = new ObjectMapper()
            .readValue(worker.getAttributes(), HashMap.class);
          phoneToWorker.put(attributes.get("contact_uri").toString(), worker);
        } catch (IOException e) {
          throw new TaskRouterException(
            String.format("'%s' has a malformed json attributes", worker.getFriendlyName()));
        }
      });
    }
    return phoneToWorker;
  }

  public Activity getIdleActivity() {
    if (idleActivity == null) {
      idleActivity = findActivityByName("Idle").get();
    }
    return idleActivity;
  }

  public void updateWorkerStatus(Worker worker, String activityFriendlyName) {
    Activity activity = findActivityByName(activityFriendlyName).orElseThrow(() ->
      new TaskRouterException(
        String.format("The activity '%s' doesn't exist in the workspace", activityFriendlyName)
      )
    );

    new WorkerUpdater(workspace.getSid(), worker.getSid())
      .setActivitySid(activity.getSid())
      .update(client);
  }
}
```

We have a brand new workspace, now we need workers. Let's create them on the next step.

## Create the Workers

We'll create two workers: Bob and Alice. They each have two attributes: `contact_uri` a phone number and `products`, a list of products each worker is specialized in. We also need to specify an `activity_sid` and a name for each worker. The selected activity will define the status of the worker.

```java title="Create Workers" description="Creating the Workers"
// !mark(64:65,80,91:108)
package com.twilio.taskrouter.application;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.twilio.rest.taskrouter.v1.workspace.Activity;
import com.twilio.rest.taskrouter.v1.workspace.TaskQueue;
import com.twilio.rest.taskrouter.v1.workspace.Workflow;
import com.twilio.taskrouter.WorkflowRule;
import com.twilio.taskrouter.WorkflowRuleTarget;
import com.twilio.taskrouter.domain.common.TwilioAppSettings;
import com.twilio.taskrouter.domain.common.Utils;
import com.twilio.taskrouter.domain.error.TaskRouterException;
import com.twilio.taskrouter.domain.model.WorkspaceFacade;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.text.StrSubstitutor;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonReader;
import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import static java.lang.System.exit;

//import org.apache.commons.lang3.StringUtils;
//import org.apache.commons.lang3.text.StrSubstitutor;

/**
 * Creates a workspace
 */
class CreateWorkspaceTask {

  private static final Logger LOG = Logger.getLogger(CreateWorkspaceTask.class.getName());

  public static void main(String[] args) {

    System.out.println("Creating workspace...");
    if (args.length < 3) {
      System.out.println("You must specify 3 parameters:");
      System.out.println("- Server hostname. E.g, <hash>.ngrok.com");
      System.out.println("- Phone of the first agent (Bob)");
      System.out.println("- Phone of the secondary agent (Alice)");
      exit(1);
    }

    String hostname = args[0];
    String bobPhone = args[1];
    String alicePhone = args[2];
    System.out.println(String.format("Server: %s\nBob phone: %s\nAlice phone: %s\n",
      hostname, bobPhone, alicePhone));

    //Get the configuration
    JsonObject workspaceConfig = createWorkspaceConfig(args);

    //Get or Create the Workspace
    Injector injector = Guice.createInjector();
    final TwilioAppSettings twilioSettings = injector.getInstance(TwilioAppSettings.class);

    String workspaceName = workspaceConfig.getString("name");
    Map<String, String> workspaceParams = new HashMap<>();
    workspaceParams.put("FriendlyName", workspaceName);
    workspaceParams.put("EventCallbackUrl", workspaceConfig.getString("event_callback"));

    try {
      WorkspaceFacade workspaceFacade = WorkspaceFacade
        .create(twilioSettings.getTwilioRestClient(), workspaceParams);

      addWorkersToWorkspace(workspaceFacade, workspaceConfig);
      addTaskQueuesToWorkspace(workspaceFacade, workspaceConfig);
      Workflow workflow = addWorkflowToWorkspace(workspaceFacade, workspaceConfig);

      printSuccessAndExportVariables(workspaceFacade, workflow, twilioSettings);
    } catch (TaskRouterException e) {
      LOG.severe(e.getMessage());
      exit(1);
    }
  }

  public static void addWorkersToWorkspace(WorkspaceFacade workspaceFacade,
                                           JsonObject workspaceJsonConfig) {
    JsonArray workersJson = workspaceJsonConfig.getJsonArray("workers");
    Activity idleActivity = workspaceFacade.getIdleActivity();

    workersJson.getValuesAs(JsonObject.class).forEach(workerJson -> {
      Map<String, String> workerParams = new HashMap<>();
      workerParams.put("FriendlyName", workerJson.getString("name"));
      workerParams.put("ActivitySid", idleActivity.getSid());
      workerParams.put("Attributes", workerJson.getJsonObject("attributes").toString());

      try {
        workspaceFacade.addWorker(workerParams);
      } catch (TaskRouterException e) {
        LOG.warning(e.getMessage());
      }
    });
  }

  public static void addTaskQueuesToWorkspace(WorkspaceFacade workspaceFacade,
                                              JsonObject workspaceJsonConfig) {
    JsonArray taskQueuesJson = workspaceJsonConfig.getJsonArray("task_queues");
    Activity reservationActivity = workspaceFacade.findActivityByName("Reserved").orElseThrow(() ->
      new TaskRouterException("The activity for reservations 'Reserved' was not found. "
        + "TaskQueues cannot be added."));
    Activity assignmentActivity = workspaceFacade.findActivityByName("Busy").orElseThrow(() ->
      new TaskRouterException("The activity for assignments 'Busy' was not found. "
        + "TaskQueues cannot be added."));
    taskQueuesJson.getValuesAs(JsonObject.class).forEach(taskQueueJson -> {
      Map<String, String> taskQueueParams = new HashMap<>();
      taskQueueParams.put("FriendlyName", taskQueueJson.getString("name"));
      taskQueueParams.put("TargetWorkers", taskQueueJson.getString("targetWorkers"));
      taskQueueParams.put("ReservationActivitySid", reservationActivity.getSid());
      taskQueueParams.put("AssignmentActivitySid", assignmentActivity.getSid());

      try {
        workspaceFacade.addTaskQueue(taskQueueParams);
      } catch (TaskRouterException e) {
        LOG.warning(e.getMessage());
      }
    });
  }

  public static Workflow addWorkflowToWorkspace(WorkspaceFacade workspaceFacade,
                                                JsonObject workspaceConfig) {
    JsonObject workflowJson = workspaceConfig.getJsonObject("workflow");
    String workflowName = workflowJson.getString("name");
    return workspaceFacade.findWorkflowByName(workflowName)
      .orElseGet(() -> {
        Map<String, String> workflowParams = new HashMap<>();
        workflowParams.put("FriendlyName", workflowName);
        workflowParams.put("AssignmentCallbackUrl", workflowJson.getString("callback"));
        workflowParams.put("FallbackAssignmentCallbackUrl", workflowJson.getString("callback"));
        workflowParams.put("TaskReservationTimeout", workflowJson.getString("timeout"));

        String workflowConfigJson = createWorkFlowJsonConfig(workspaceFacade, workflowJson);
        workflowParams.put("Configuration", workflowConfigJson);

        return workspaceFacade.addWorkflow(workflowParams);
      });
  }

  public static void printSuccessAndExportVariables(WorkspaceFacade workspaceFacade,
                                                    Workflow workflow,
                                                    TwilioAppSettings twilioSettings) {
    Activity idleActivity = workspaceFacade.getIdleActivity();

    Properties workspaceParams = new Properties();
    workspaceParams.put("account.sid", twilioSettings.getTwilioAccountSid());
    workspaceParams.put("auth.token", twilioSettings.getTwilioAuthToken());
    workspaceParams.put("workspace.sid", workspaceFacade.getSid());
    workspaceParams.put("workflow.sid", workflow.getSid());
    workspaceParams.put("postWorkActivity.sid", idleActivity.getSid());
    workspaceParams.put("email", twilioSettings.getEmail());
    workspaceParams.put("phoneNumber", twilioSettings.getPhoneNumber().toString());

    File workspacePropertiesFile = new File(TwilioAppSettings.WORKSPACE_PROPERTIES_FILE_PATH);

    try {
      Utils.saveProperties(workspaceParams,
        workspacePropertiesFile,
        "Properties for last created Twilio TaskRouter workspace");
    } catch (IOException e) {
      LOG.severe("Could not save workspace.properties with current configuration");
      exit(1);
    }

    String successMsg = String.format("Workspace '%s' was created successfully.",
      workspaceFacade.getFriendlyName());
    final int lineLength = successMsg.length() + 2;

    System.out.println(StringUtils.repeat("#", lineLength));
    System.out.println(String.format(" %s ", successMsg));
    System.out.println(StringUtils.repeat("#", lineLength));
    System.out.println("The following variables were registered:");
    System.out.println("\n");
    workspaceParams.entrySet().stream().forEach(propertyEntry -> {
      System.out.println(String.format("%s=%s", propertyEntry.getKey(), propertyEntry.getValue()));
    });
    System.out.println("\n");
    System.out.println(StringUtils.repeat("#", lineLength));
  }

  public static JsonObject createWorkspaceConfig(String[] args) {
    final String configFileName = "workspace.json";

    Optional<URL> url =
      Optional.ofNullable(CreateWorkspaceTask.class.getResource(File.separator + configFileName));
    return url.map(u -> {
      try {
        File workspaceConfigJsonFile = new File(u.toURI());
        String jsonContent = Utils.readFileContent(workspaceConfigJsonFile);
        String parsedContent = parseWorkspaceJsonContent(jsonContent, args);

        try (JsonReader jsonReader = Json.createReader(new StringReader(parsedContent))) {
          return jsonReader.readObject();
        }
      } catch (URISyntaxException e) {
        throw new TaskRouterException(String.format("Wrong uri to find %s: %s",
          configFileName, e.getMessage()));
      } catch (IOException e) {
        throw new TaskRouterException(String.format("Error while reading %s: %s",
          configFileName, e.getMessage()));
      }
    }).orElseThrow(
      () -> new TaskRouterException("There's no valid configuration in " + configFileName));
  }

  private static String parseWorkspaceJsonContent(final String unparsedContent,
                                                  final String... args) {
    Map<String, String> values = new HashMap<>();
    values.put("host", args[0]);
    values.put("bob_number", args[1]);
    values.put("alice_number", args[2]);

    StrSubstitutor strSubstitutor = new StrSubstitutor(values, "%(", ")s");
    return strSubstitutor.replace(unparsedContent);
  }

  public static String createWorkFlowJsonConfig(WorkspaceFacade workspaceFacade,
                                                JsonObject workflowJson) {
    try {
      JsonArray routingConfigRules = workflowJson.getJsonArray("routingConfiguration");
      TaskQueue defaultQueue = workspaceFacade.findTaskQueueByName("Default")
        .orElseThrow(() -> new TaskRouterException("Default queue not found"));
      WorkflowRuleTarget defaultRuleTarget = new WorkflowRuleTarget.Builder(defaultQueue.getSid())
        .expression("1=1")
        .priority(1)
        .timeout(30)
        .build();

      List<WorkflowRule> rules = routingConfigRules.getValuesAs(JsonObject.class).stream()
        .map(ruleJson -> {
          String ruleQueueName = ruleJson.getString("targetTaskQueue");
          TaskQueue ruleQueue = workspaceFacade.findTaskQueueByName(ruleQueueName).orElseThrow(
            () -> new TaskRouterException(String.format("%s queue not found", ruleQueueName)));

          WorkflowRuleTarget queueRuleTarget = new WorkflowRuleTarget.Builder(ruleQueue.getSid())
            .priority(5)
            .timeout(30)
            .build();

          List<WorkflowRuleTarget> ruleTargets = Arrays.asList(queueRuleTarget, defaultRuleTarget);

          return new WorkflowRule.Builder(ruleJson.getString("expression"), ruleTargets).build();
        }).collect(Collectors.toList());

      com.twilio.taskrouter.Workflow config;
      config = new com.twilio.taskrouter.Workflow(rules, defaultRuleTarget);
      return config.toJson();
    } catch (Exception ex) {
      throw new TaskRouterException("Error while creating workflow json configuration", ex);
    }
  }
}
```

After creating our workers, let's set up the Task Queues.

## Create the Task Queues

Next, we set up the Task Queues. Each with a name and a `TargetWorkers` property, which is an [expression](/docs/taskrouter/api/task-queue) to match Workers. Our Task Queues are:

1. `SMS` - Will target Workers specialized in Programmable SMS, such as Bob, using the expression `"products HAS \"ProgrammableSMS\""`.
2. `Voice` - Will do the same for Programmable Voice Workers, such as Alice, using the expression `"products HAS \"ProgrammableVoice\""`.
3. `All` - This queue targets all users and can be used when there are no specialist around for the chosen product. We can use the `"1==1"` expression here.

```java title="Create Task Queues" description="Creating the Task Queues"
// !mark(81,110:132)
package com.twilio.taskrouter.application;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.twilio.rest.taskrouter.v1.workspace.Activity;
import com.twilio.rest.taskrouter.v1.workspace.TaskQueue;
import com.twilio.rest.taskrouter.v1.workspace.Workflow;
import com.twilio.taskrouter.WorkflowRule;
import com.twilio.taskrouter.WorkflowRuleTarget;
import com.twilio.taskrouter.domain.common.TwilioAppSettings;
import com.twilio.taskrouter.domain.common.Utils;
import com.twilio.taskrouter.domain.error.TaskRouterException;
import com.twilio.taskrouter.domain.model.WorkspaceFacade;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.text.StrSubstitutor;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonReader;
import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import static java.lang.System.exit;

//import org.apache.commons.lang3.StringUtils;
//import org.apache.commons.lang3.text.StrSubstitutor;

/**
 * Creates a workspace
 */
class CreateWorkspaceTask {

  private static final Logger LOG = Logger.getLogger(CreateWorkspaceTask.class.getName());

  public static void main(String[] args) {

    System.out.println("Creating workspace...");
    if (args.length < 3) {
      System.out.println("You must specify 3 parameters:");
      System.out.println("- Server hostname. E.g, <hash>.ngrok.com");
      System.out.println("- Phone of the first agent (Bob)");
      System.out.println("- Phone of the secondary agent (Alice)");
      exit(1);
    }

    String hostname = args[0];
    String bobPhone = args[1];
    String alicePhone = args[2];
    System.out.println(String.format("Server: %s\nBob phone: %s\nAlice phone: %s\n",
      hostname, bobPhone, alicePhone));

    //Get the configuration
    JsonObject workspaceConfig = createWorkspaceConfig(args);

    //Get or Create the Workspace
    Injector injector = Guice.createInjector();
    final TwilioAppSettings twilioSettings = injector.getInstance(TwilioAppSettings.class);

    String workspaceName = workspaceConfig.getString("name");
    Map<String, String> workspaceParams = new HashMap<>();
    workspaceParams.put("FriendlyName", workspaceName);
    workspaceParams.put("EventCallbackUrl", workspaceConfig.getString("event_callback"));

    try {
      WorkspaceFacade workspaceFacade = WorkspaceFacade
        .create(twilioSettings.getTwilioRestClient(), workspaceParams);

      addWorkersToWorkspace(workspaceFacade, workspaceConfig);
      addTaskQueuesToWorkspace(workspaceFacade, workspaceConfig);
      Workflow workflow = addWorkflowToWorkspace(workspaceFacade, workspaceConfig);

      printSuccessAndExportVariables(workspaceFacade, workflow, twilioSettings);
    } catch (TaskRouterException e) {
      LOG.severe(e.getMessage());
      exit(1);
    }
  }

  public static void addWorkersToWorkspace(WorkspaceFacade workspaceFacade,
                                           JsonObject workspaceJsonConfig) {
    JsonArray workersJson = workspaceJsonConfig.getJsonArray("workers");
    Activity idleActivity = workspaceFacade.getIdleActivity();

    workersJson.getValuesAs(JsonObject.class).forEach(workerJson -> {
      Map<String, String> workerParams = new HashMap<>();
      workerParams.put("FriendlyName", workerJson.getString("name"));
      workerParams.put("ActivitySid", idleActivity.getSid());
      workerParams.put("Attributes", workerJson.getJsonObject("attributes").toString());

      try {
        workspaceFacade.addWorker(workerParams);
      } catch (TaskRouterException e) {
        LOG.warning(e.getMessage());
      }
    });
  }

  public static void addTaskQueuesToWorkspace(WorkspaceFacade workspaceFacade,
                                              JsonObject workspaceJsonConfig) {
    JsonArray taskQueuesJson = workspaceJsonConfig.getJsonArray("task_queues");
    Activity reservationActivity = workspaceFacade.findActivityByName("Reserved").orElseThrow(() ->
      new TaskRouterException("The activity for reservations 'Reserved' was not found. "
        + "TaskQueues cannot be added."));
    Activity assignmentActivity = workspaceFacade.findActivityByName("Busy").orElseThrow(() ->
      new TaskRouterException("The activity for assignments 'Busy' was not found. "
        + "TaskQueues cannot be added."));
    taskQueuesJson.getValuesAs(JsonObject.class).forEach(taskQueueJson -> {
      Map<String, String> taskQueueParams = new HashMap<>();
      taskQueueParams.put("FriendlyName", taskQueueJson.getString("name"));
      taskQueueParams.put("TargetWorkers", taskQueueJson.getString("targetWorkers"));
      taskQueueParams.put("ReservationActivitySid", reservationActivity.getSid());
      taskQueueParams.put("AssignmentActivitySid", assignmentActivity.getSid());

      try {
        workspaceFacade.addTaskQueue(taskQueueParams);
      } catch (TaskRouterException e) {
        LOG.warning(e.getMessage());
      }
    });
  }

  public static Workflow addWorkflowToWorkspace(WorkspaceFacade workspaceFacade,
                                                JsonObject workspaceConfig) {
    JsonObject workflowJson = workspaceConfig.getJsonObject("workflow");
    String workflowName = workflowJson.getString("name");
    return workspaceFacade.findWorkflowByName(workflowName)
      .orElseGet(() -> {
        Map<String, String> workflowParams = new HashMap<>();
        workflowParams.put("FriendlyName", workflowName);
        workflowParams.put("AssignmentCallbackUrl", workflowJson.getString("callback"));
        workflowParams.put("FallbackAssignmentCallbackUrl", workflowJson.getString("callback"));
        workflowParams.put("TaskReservationTimeout", workflowJson.getString("timeout"));

        String workflowConfigJson = createWorkFlowJsonConfig(workspaceFacade, workflowJson);
        workflowParams.put("Configuration", workflowConfigJson);

        return workspaceFacade.addWorkflow(workflowParams);
      });
  }

  public static void printSuccessAndExportVariables(WorkspaceFacade workspaceFacade,
                                                    Workflow workflow,
                                                    TwilioAppSettings twilioSettings) {
    Activity idleActivity = workspaceFacade.getIdleActivity();

    Properties workspaceParams = new Properties();
    workspaceParams.put("account.sid", twilioSettings.getTwilioAccountSid());
    workspaceParams.put("auth.token", twilioSettings.getTwilioAuthToken());
    workspaceParams.put("workspace.sid", workspaceFacade.getSid());
    workspaceParams.put("workflow.sid", workflow.getSid());
    workspaceParams.put("postWorkActivity.sid", idleActivity.getSid());
    workspaceParams.put("email", twilioSettings.getEmail());
    workspaceParams.put("phoneNumber", twilioSettings.getPhoneNumber().toString());

    File workspacePropertiesFile = new File(TwilioAppSettings.WORKSPACE_PROPERTIES_FILE_PATH);

    try {
      Utils.saveProperties(workspaceParams,
        workspacePropertiesFile,
        "Properties for last created Twilio TaskRouter workspace");
    } catch (IOException e) {
      LOG.severe("Could not save workspace.properties with current configuration");
      exit(1);
    }

    String successMsg = String.format("Workspace '%s' was created successfully.",
      workspaceFacade.getFriendlyName());
    final int lineLength = successMsg.length() + 2;

    System.out.println(StringUtils.repeat("#", lineLength));
    System.out.println(String.format(" %s ", successMsg));
    System.out.println(StringUtils.repeat("#", lineLength));
    System.out.println("The following variables were registered:");
    System.out.println("\n");
    workspaceParams.entrySet().stream().forEach(propertyEntry -> {
      System.out.println(String.format("%s=%s", propertyEntry.getKey(), propertyEntry.getValue()));
    });
    System.out.println("\n");
    System.out.println(StringUtils.repeat("#", lineLength));
  }

  public static JsonObject createWorkspaceConfig(String[] args) {
    final String configFileName = "workspace.json";

    Optional<URL> url =
      Optional.ofNullable(CreateWorkspaceTask.class.getResource(File.separator + configFileName));
    return url.map(u -> {
      try {
        File workspaceConfigJsonFile = new File(u.toURI());
        String jsonContent = Utils.readFileContent(workspaceConfigJsonFile);
        String parsedContent = parseWorkspaceJsonContent(jsonContent, args);

        try (JsonReader jsonReader = Json.createReader(new StringReader(parsedContent))) {
          return jsonReader.readObject();
        }
      } catch (URISyntaxException e) {
        throw new TaskRouterException(String.format("Wrong uri to find %s: %s",
          configFileName, e.getMessage()));
      } catch (IOException e) {
        throw new TaskRouterException(String.format("Error while reading %s: %s",
          configFileName, e.getMessage()));
      }
    }).orElseThrow(
      () -> new TaskRouterException("There's no valid configuration in " + configFileName));
  }

  private static String parseWorkspaceJsonContent(final String unparsedContent,
                                                  final String... args) {
    Map<String, String> values = new HashMap<>();
    values.put("host", args[0]);
    values.put("bob_number", args[1]);
    values.put("alice_number", args[2]);

    StrSubstitutor strSubstitutor = new StrSubstitutor(values, "%(", ")s");
    return strSubstitutor.replace(unparsedContent);
  }

  public static String createWorkFlowJsonConfig(WorkspaceFacade workspaceFacade,
                                                JsonObject workflowJson) {
    try {
      JsonArray routingConfigRules = workflowJson.getJsonArray("routingConfiguration");
      TaskQueue defaultQueue = workspaceFacade.findTaskQueueByName("Default")
        .orElseThrow(() -> new TaskRouterException("Default queue not found"));
      WorkflowRuleTarget defaultRuleTarget = new WorkflowRuleTarget.Builder(defaultQueue.getSid())
        .expression("1=1")
        .priority(1)
        .timeout(30)
        .build();

      List<WorkflowRule> rules = routingConfigRules.getValuesAs(JsonObject.class).stream()
        .map(ruleJson -> {
          String ruleQueueName = ruleJson.getString("targetTaskQueue");
          TaskQueue ruleQueue = workspaceFacade.findTaskQueueByName(ruleQueueName).orElseThrow(
            () -> new TaskRouterException(String.format("%s queue not found", ruleQueueName)));

          WorkflowRuleTarget queueRuleTarget = new WorkflowRuleTarget.Builder(ruleQueue.getSid())
            .priority(5)
            .timeout(30)
            .build();

          List<WorkflowRuleTarget> ruleTargets = Arrays.asList(queueRuleTarget, defaultRuleTarget);

          return new WorkflowRule.Builder(ruleJson.getString("expression"), ruleTargets).build();
        }).collect(Collectors.toList());

      com.twilio.taskrouter.Workflow config;
      config = new com.twilio.taskrouter.Workflow(rules, defaultRuleTarget);
      return config.toJson();
    } catch (Exception ex) {
      throw new TaskRouterException("Error while creating workflow json configuration", ex);
    }
  }
}
```

We have a Workspace, Workers and Task Queues... what's left? A Workflow. Let's see how to create one next!

## Create a Workflow

Finally, we set up the Workflow using the following parameters:

1. `FriendlyName` as the name of a Workflow.
2. `AssignmentCallbackUrl` as the public URL where a request will be made when this Workflow assigns a Task to a Worker. We will learn how to implement it on the next steps.
3. `TaskReservationTimeout` as the maximum time we want to wait until a Worker handles a Task.
4. `configuration` which is a set of rules for placing Task into Task Queues. The routing configuration will take a Task's attribute and match this with Task Queues. This application's Workflow rules are defined as:

   * `selected_product=="ProgrammableSMS"` expression for `SMS` Task Queue. This expression will match any Task with `ProgrammableSMS` as the `selected_product` attribute.
   * `selected_product=="ProgrammableVoice` expression for `Voice` Task Queue.

```java title="Create a Workflow" description="Creating a Workflow"
// !mark(82,134:151)
package com.twilio.taskrouter.application;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.twilio.rest.taskrouter.v1.workspace.Activity;
import com.twilio.rest.taskrouter.v1.workspace.TaskQueue;
import com.twilio.rest.taskrouter.v1.workspace.Workflow;
import com.twilio.taskrouter.WorkflowRule;
import com.twilio.taskrouter.WorkflowRuleTarget;
import com.twilio.taskrouter.domain.common.TwilioAppSettings;
import com.twilio.taskrouter.domain.common.Utils;
import com.twilio.taskrouter.domain.error.TaskRouterException;
import com.twilio.taskrouter.domain.model.WorkspaceFacade;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.text.StrSubstitutor;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonReader;
import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import static java.lang.System.exit;

//import org.apache.commons.lang3.StringUtils;
//import org.apache.commons.lang3.text.StrSubstitutor;

/**
 * Creates a workspace
 */
class CreateWorkspaceTask {

  private static final Logger LOG = Logger.getLogger(CreateWorkspaceTask.class.getName());

  public static void main(String[] args) {

    System.out.println("Creating workspace...");
    if (args.length < 3) {
      System.out.println("You must specify 3 parameters:");
      System.out.println("- Server hostname. E.g, <hash>.ngrok.com");
      System.out.println("- Phone of the first agent (Bob)");
      System.out.println("- Phone of the secondary agent (Alice)");
      exit(1);
    }

    String hostname = args[0];
    String bobPhone = args[1];
    String alicePhone = args[2];
    System.out.println(String.format("Server: %s\nBob phone: %s\nAlice phone: %s\n",
      hostname, bobPhone, alicePhone));

    //Get the configuration
    JsonObject workspaceConfig = createWorkspaceConfig(args);

    //Get or Create the Workspace
    Injector injector = Guice.createInjector();
    final TwilioAppSettings twilioSettings = injector.getInstance(TwilioAppSettings.class);

    String workspaceName = workspaceConfig.getString("name");
    Map<String, String> workspaceParams = new HashMap<>();
    workspaceParams.put("FriendlyName", workspaceName);
    workspaceParams.put("EventCallbackUrl", workspaceConfig.getString("event_callback"));

    try {
      WorkspaceFacade workspaceFacade = WorkspaceFacade
        .create(twilioSettings.getTwilioRestClient(), workspaceParams);

      addWorkersToWorkspace(workspaceFacade, workspaceConfig);
      addTaskQueuesToWorkspace(workspaceFacade, workspaceConfig);
      Workflow workflow = addWorkflowToWorkspace(workspaceFacade, workspaceConfig);

      printSuccessAndExportVariables(workspaceFacade, workflow, twilioSettings);
    } catch (TaskRouterException e) {
      LOG.severe(e.getMessage());
      exit(1);
    }
  }

  public static void addWorkersToWorkspace(WorkspaceFacade workspaceFacade,
                                           JsonObject workspaceJsonConfig) {
    JsonArray workersJson = workspaceJsonConfig.getJsonArray("workers");
    Activity idleActivity = workspaceFacade.getIdleActivity();

    workersJson.getValuesAs(JsonObject.class).forEach(workerJson -> {
      Map<String, String> workerParams = new HashMap<>();
      workerParams.put("FriendlyName", workerJson.getString("name"));
      workerParams.put("ActivitySid", idleActivity.getSid());
      workerParams.put("Attributes", workerJson.getJsonObject("attributes").toString());

      try {
        workspaceFacade.addWorker(workerParams);
      } catch (TaskRouterException e) {
        LOG.warning(e.getMessage());
      }
    });
  }

  public static void addTaskQueuesToWorkspace(WorkspaceFacade workspaceFacade,
                                              JsonObject workspaceJsonConfig) {
    JsonArray taskQueuesJson = workspaceJsonConfig.getJsonArray("task_queues");
    Activity reservationActivity = workspaceFacade.findActivityByName("Reserved").orElseThrow(() ->
      new TaskRouterException("The activity for reservations 'Reserved' was not found. "
        + "TaskQueues cannot be added."));
    Activity assignmentActivity = workspaceFacade.findActivityByName("Busy").orElseThrow(() ->
      new TaskRouterException("The activity for assignments 'Busy' was not found. "
        + "TaskQueues cannot be added."));
    taskQueuesJson.getValuesAs(JsonObject.class).forEach(taskQueueJson -> {
      Map<String, String> taskQueueParams = new HashMap<>();
      taskQueueParams.put("FriendlyName", taskQueueJson.getString("name"));
      taskQueueParams.put("TargetWorkers", taskQueueJson.getString("targetWorkers"));
      taskQueueParams.put("ReservationActivitySid", reservationActivity.getSid());
      taskQueueParams.put("AssignmentActivitySid", assignmentActivity.getSid());

      try {
        workspaceFacade.addTaskQueue(taskQueueParams);
      } catch (TaskRouterException e) {
        LOG.warning(e.getMessage());
      }
    });
  }

  public static Workflow addWorkflowToWorkspace(WorkspaceFacade workspaceFacade,
                                                JsonObject workspaceConfig) {
    JsonObject workflowJson = workspaceConfig.getJsonObject("workflow");
    String workflowName = workflowJson.getString("name");
    return workspaceFacade.findWorkflowByName(workflowName)
      .orElseGet(() -> {
        Map<String, String> workflowParams = new HashMap<>();
        workflowParams.put("FriendlyName", workflowName);
        workflowParams.put("AssignmentCallbackUrl", workflowJson.getString("callback"));
        workflowParams.put("FallbackAssignmentCallbackUrl", workflowJson.getString("callback"));
        workflowParams.put("TaskReservationTimeout", workflowJson.getString("timeout"));

        String workflowConfigJson = createWorkFlowJsonConfig(workspaceFacade, workflowJson);
        workflowParams.put("Configuration", workflowConfigJson);

        return workspaceFacade.addWorkflow(workflowParams);
      });
  }

  public static void printSuccessAndExportVariables(WorkspaceFacade workspaceFacade,
                                                    Workflow workflow,
                                                    TwilioAppSettings twilioSettings) {
    Activity idleActivity = workspaceFacade.getIdleActivity();

    Properties workspaceParams = new Properties();
    workspaceParams.put("account.sid", twilioSettings.getTwilioAccountSid());
    workspaceParams.put("auth.token", twilioSettings.getTwilioAuthToken());
    workspaceParams.put("workspace.sid", workspaceFacade.getSid());
    workspaceParams.put("workflow.sid", workflow.getSid());
    workspaceParams.put("postWorkActivity.sid", idleActivity.getSid());
    workspaceParams.put("email", twilioSettings.getEmail());
    workspaceParams.put("phoneNumber", twilioSettings.getPhoneNumber().toString());

    File workspacePropertiesFile = new File(TwilioAppSettings.WORKSPACE_PROPERTIES_FILE_PATH);

    try {
      Utils.saveProperties(workspaceParams,
        workspacePropertiesFile,
        "Properties for last created Twilio TaskRouter workspace");
    } catch (IOException e) {
      LOG.severe("Could not save workspace.properties with current configuration");
      exit(1);
    }

    String successMsg = String.format("Workspace '%s' was created successfully.",
      workspaceFacade.getFriendlyName());
    final int lineLength = successMsg.length() + 2;

    System.out.println(StringUtils.repeat("#", lineLength));
    System.out.println(String.format(" %s ", successMsg));
    System.out.println(StringUtils.repeat("#", lineLength));
    System.out.println("The following variables were registered:");
    System.out.println("\n");
    workspaceParams.entrySet().stream().forEach(propertyEntry -> {
      System.out.println(String.format("%s=%s", propertyEntry.getKey(), propertyEntry.getValue()));
    });
    System.out.println("\n");
    System.out.println(StringUtils.repeat("#", lineLength));
  }

  public static JsonObject createWorkspaceConfig(String[] args) {
    final String configFileName = "workspace.json";

    Optional<URL> url =
      Optional.ofNullable(CreateWorkspaceTask.class.getResource(File.separator + configFileName));
    return url.map(u -> {
      try {
        File workspaceConfigJsonFile = new File(u.toURI());
        String jsonContent = Utils.readFileContent(workspaceConfigJsonFile);
        String parsedContent = parseWorkspaceJsonContent(jsonContent, args);

        try (JsonReader jsonReader = Json.createReader(new StringReader(parsedContent))) {
          return jsonReader.readObject();
        }
      } catch (URISyntaxException e) {
        throw new TaskRouterException(String.format("Wrong uri to find %s: %s",
          configFileName, e.getMessage()));
      } catch (IOException e) {
        throw new TaskRouterException(String.format("Error while reading %s: %s",
          configFileName, e.getMessage()));
      }
    }).orElseThrow(
      () -> new TaskRouterException("There's no valid configuration in " + configFileName));
  }

  private static String parseWorkspaceJsonContent(final String unparsedContent,
                                                  final String... args) {
    Map<String, String> values = new HashMap<>();
    values.put("host", args[0]);
    values.put("bob_number", args[1]);
    values.put("alice_number", args[2]);

    StrSubstitutor strSubstitutor = new StrSubstitutor(values, "%(", ")s");
    return strSubstitutor.replace(unparsedContent);
  }

  public static String createWorkFlowJsonConfig(WorkspaceFacade workspaceFacade,
                                                JsonObject workflowJson) {
    try {
      JsonArray routingConfigRules = workflowJson.getJsonArray("routingConfiguration");
      TaskQueue defaultQueue = workspaceFacade.findTaskQueueByName("Default")
        .orElseThrow(() -> new TaskRouterException("Default queue not found"));
      WorkflowRuleTarget defaultRuleTarget = new WorkflowRuleTarget.Builder(defaultQueue.getSid())
        .expression("1=1")
        .priority(1)
        .timeout(30)
        .build();

      List<WorkflowRule> rules = routingConfigRules.getValuesAs(JsonObject.class).stream()
        .map(ruleJson -> {
          String ruleQueueName = ruleJson.getString("targetTaskQueue");
          TaskQueue ruleQueue = workspaceFacade.findTaskQueueByName(ruleQueueName).orElseThrow(
            () -> new TaskRouterException(String.format("%s queue not found", ruleQueueName)));

          WorkflowRuleTarget queueRuleTarget = new WorkflowRuleTarget.Builder(ruleQueue.getSid())
            .priority(5)
            .timeout(30)
            .build();

          List<WorkflowRuleTarget> ruleTargets = Arrays.asList(queueRuleTarget, defaultRuleTarget);

          return new WorkflowRule.Builder(ruleJson.getString("expression"), ruleTargets).build();
        }).collect(Collectors.toList());

      com.twilio.taskrouter.Workflow config;
      config = new com.twilio.taskrouter.Workflow(rules, defaultRuleTarget);
      return config.toJson();
    } catch (Exception ex) {
      throw new TaskRouterException("Error while creating workflow json configuration", ex);
    }
  }
}
```

Our workspace is completely setup. Now it's time to see how we use it to route calls.

## Handle Twilio's Request

Right after receiving a call, Twilio will send a request to the URL specified on the [number's configuration](/console/phone-numbers/incoming).

The endpoint will then process the request and generate a TwiML response. We'll use the [Say](/docs/voice/twiml/say) verb to give the user product alternatives, and a key they can press in order to select one. The [Gather](/docs/voice/twiml/gather) verb allows us to capture the user's key press.

```java title="Handle Incoming Call" description="src/main/java/com/twilio/taskrouter/application/servlet/IncomingCallServlet.java"
// !mark(23:52)
package com.twilio.taskrouter.application.servlet;


import com.twilio.twiml.Gather;
import com.twilio.twiml.Method;
import com.twilio.twiml.Say;
import com.twilio.twiml.TwiMLException;
import com.twilio.twiml.VoiceResponse;

import javax.inject.Singleton;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Returns TwiML instructions to TwilioAppSettings's POST requests
 */
@Singleton
public class IncomingCallServlet extends HttpServlet {

  private static final Logger LOG = Logger.getLogger(IncomingCallServlet.class.getName());

  @Override
  public void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
    IOException {
    try {
      final VoiceResponse twimlResponse = new VoiceResponse.Builder()
        .gather(new Gather.Builder()
          .action("/call/enqueue")
          .numDigits(1)
          .timeout(10)
          .method(Method.POST)
          .say(new Say
            .Builder("For Programmable SMS, press one. For Voice, press any other key.")
            .build()
          )
          .build()
        ).build();

      resp.setContentType("application/xml");
      resp.getWriter().print(twimlResponse.toXml());
    } catch (TwiMLException e) {
      LOG.log(Level.SEVERE, "Unexpected error while creating incoming call response", e);
      throw new RuntimeException(e);
    }
  }

}
```

We just asked the caller to choose a product, next we will use their choice to create the appropriate Task.

## Create a Task

This is the endpoint set as the `action` URL on the `Gather` verb on the previous step. A request is made to this endpoint when the user presses a key during the call. This request has a `Digits` parameter that holds the pressed keys. A `Task` will be created based on the pressed digit with the `selected_product` as an attribute. The Workflow will take this Task's attributes and make a match with the [configured expressions](/docs/taskrouter/expression-syntax) in order to find a corresponding Task Queue, so an appropriate available Worker can be assigned to handle it.

We use the [`Enqueue` verb](/docs/voice/twiml/enqueue) with a `workflowSid` attribute to [integrate with TaskRouter](/docs/taskrouter/twiml-queue-calls#using-enqueue-to-route-calls-with-taskrouter). Then the voice call will be put on hold while TaskRouter tries to find an available Worker to handle this Task.

```java title="Create a Task" description="src/main/java/com/twilio/taskrouter/application/servlet/EnqueueServlet.java"
// !mark(26:62)
package com.twilio.taskrouter.application.servlet;

import com.twilio.taskrouter.domain.common.TwilioAppSettings;
import com.twilio.twiml.EnqueueTask;
import com.twilio.twiml.Task;
import com.twilio.twiml.TwiMLException;
import com.twilio.twiml.VoiceResponse;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

import static java.lang.String.format;

/**
 * Selects a product by creating a Task on the TaskRouter Workflow
 */
@Singleton
public class EnqueueServlet extends HttpServlet {

  private static final Logger LOG = Logger.getLogger(EnqueueServlet.class.getName());

  private final String workflowSid;

  @Inject
  public EnqueueServlet(TwilioAppSettings twilioSettings) {
    this.workflowSid = twilioSettings.getWorkflowSid();
  }

  @Override
  public void doPost(HttpServletRequest req, HttpServletResponse resp)
    throws ServletException, IOException {

    String selectedProduct = getSelectedProduct(req);
    Task task = new Task.Builder()
      .data(format("{\"selected_product\": \"%s\"}", selectedProduct))
      .build();

    EnqueueTask enqueueTask = new EnqueueTask.Builder(task).workflowSid(workflowSid).build();

    VoiceResponse voiceResponse = new VoiceResponse.Builder().enqueue(enqueueTask).build();
    resp.setContentType("application/xml");
    try {
      resp.getWriter().print(voiceResponse.toXml());
    } catch (TwiMLException e) {
      LOG.log(Level.SEVERE, e.getMessage(), e);
      throw new RuntimeException(e);
    }
  }

  private String getSelectedProduct(HttpServletRequest request) {
    return Optional.ofNullable(request.getParameter("Digits"))
      .filter(x -> x.equals("1")).map((first) -> "ProgrammableSMS").orElse("ProgrammableVoice");
  }
}
```

After sending a Task to Twilio, let's see how we tell TaskRouter which Worker to use to execute that task.

## Assign a Worker

When TaskRouter selects a Worker, it does the following:

1. The Task's Assignment Status is set to `reserved`
2. A [Reservation instance](/docs/taskrouter/api/reservations) is generated, linking the Task to the selected Worker
3. At the same time the Reservation is created, a `POST` request is made to the Workflow's AssignmentCallbackURL, which was configured using the Gradle task [`createWorkspace`](https://github.com/TwilioDevEd/task-router-servlets/blob/master/src/main/java/com/twilio/taskrouter/application/CreateWorkspaceTask.java)

This request includes the full details of the Task, the selected Worker, and the Reservation.

Handling this [Assignment Callback](/docs/taskrouter/handle-assignment-callbacks) is a key component of building a TaskRouter application as we can instruct how the Worker will handle a Task. We could send a text, email, push notifications or make a call.

Since we created this Task during a voice call with an `Enqueue` verb, lets [instruct TaskRouter to dequeue](/docs/taskrouter/handle-assignment-callbacks#dequeue-call) the call and dial a Worker. If we do not specify a `to` parameter with a phone number, TaskRouter will pick the Worker's `contact_uri` attribute.

We also send a `post_work_activity_sid` which will tell TaskRouter which [Activity](/docs/taskrouter/quickstart/ruby/setup-understanding-activities) to assign this worker after the call ends.

```java title="Assign a Worker" description="src/main/java/com/twilio/taskrouter/application/servlet/AssignmentServlet.java"
// !mark(18:36)
package com.twilio.taskrouter.application.servlet;

import com.twilio.taskrouter.domain.common.TwilioAppSettings;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.json.Json;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet for Task assignments
 */
@Singleton
public class AssignmentServlet extends HttpServlet {

  private final String dequeueInstruction;

  @Inject
  public AssignmentServlet(TwilioAppSettings twilioAppSettings) {
    dequeueInstruction = Json.createObjectBuilder()
      .add("instruction", "dequeue")
      .add("post_work_activity_sid", twilioAppSettings.getPostWorkActivitySid())
      .build().toString();
  }

  @Override
  public void doPost(HttpServletRequest req, HttpServletResponse resp)
    throws ServletException, IOException {
    resp.setContentType("application/json");
    resp.getWriter().print(dequeueInstruction);
  }
}
```

Now that our Tasks are routed properly, let's deal with missed calls in the next step.

## Collect Missed Calls

This endpoint will be called after each [TaskRouter Event](/docs/taskrouter/api/event) is triggered. In our application, we are trying to collect missed calls, so we would like to handle the `workflow.timeout` event. This event is triggered when the Task waits more than the limit set on Workflow Configuration-- or rather when no worker is available.

Here we use TwilioRestClient to route this call to a [Voicemail Twimlet](/labs/twimlets/voicemail). Twimlets are tiny web applications for voice. This one will generate a `TwiML` response using `Say` verb and record a message using `Record` verb. The recorded message will then be transcribed and sent to the email address configured.

We are also listening for `task.canceled`. This is triggered when the customer hangs up before being assigned to an agent, therefore canceling the task. Capturing this event allows us to collect the information from the customers that hang up before the Workflow times out.

```java title="Collect Missed Calls" description="src/main/java/com/twilio/taskrouter/application/servlet/EventsServlet.java"
// !mark(49:98)
package com.twilio.taskrouter.application.servlet;

import com.google.inject.persist.Transactional;
import com.twilio.rest.api.v2010.account.MessageCreator;
import com.twilio.taskrouter.domain.common.TwilioAppSettings;
import com.twilio.taskrouter.domain.model.MissedCall;
import com.twilio.taskrouter.domain.repository.MissedCallRepository;
import com.twilio.type.PhoneNumber;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.json.Json;
import javax.json.JsonObject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.StringReader;
import java.util.Optional;
import java.util.logging.Logger;

/**
 * Servlet for Events callback for missed calls
 */
@Singleton
public class EventsServlet extends HttpServlet {

  private static final String LEAVE_MSG = "Sorry, All agents are busy. Please leave a message. "
    + "We will call you as soon as possible";

  private static final String OFFLINE_MSG = "Your status has changed to Offline. "
    + "Reply with \"On\" to get back Online";

  private static final Logger LOG = Logger.getLogger(EventsServlet.class.getName());

  private final TwilioAppSettings twilioSettings;

  private final MissedCallRepository missedCallRepository;

  @Inject
  public EventsServlet(TwilioAppSettings twilioSettings,
                       MissedCallRepository missedCallRepository) {
    this.twilioSettings = twilioSettings;
    this.missedCallRepository = missedCallRepository;
  }

  @Override
  public void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
    IOException {
    Optional.ofNullable(req.getParameter("EventType"))
      .ifPresent(eventName -> {
        switch (eventName) {
          case "workflow.timeout":
          case "task.canceled":
            parseAttributes("TaskAttributes", req)
              .ifPresent(this::addMissingCallAndLeaveMessage);
            break;
          case "worker.activity.update":
            Optional.ofNullable(req.getParameter("WorkerActivityName"))
              .filter("Offline"::equals)
              .ifPresent(offlineEvent -> {
                parseAttributes("WorkerAttributes", req)
                  .ifPresent(this::notifyOfflineStatusToWorker);
              });
            break;
          default:
        }
      });
  }

  private Optional<JsonObject> parseAttributes(String parameter, HttpServletRequest request) {
    return Optional.ofNullable(request.getParameter(parameter))
      .map(jsonRequest -> Json.createReader(new StringReader(jsonRequest)).readObject());
  }

  @Transactional
  private void addMissingCallAndLeaveMessage(JsonObject taskAttributesJson) {
    String phoneNumber = taskAttributesJson.getString("from");
    String selectedProduct = taskAttributesJson.getString("selected_product");

    MissedCall missedCall = new MissedCall(phoneNumber, selectedProduct);
    missedCallRepository.add(missedCall);
    LOG.info("Added Missing Call: " + missedCall);

    String callSid = taskAttributesJson.getString("call_sid");
    twilioSettings.redirectToVoiceMail(callSid, LEAVE_MSG);
  }

  private void notifyOfflineStatusToWorker(JsonObject workerAttributesJson) {
    String workerPhone = workerAttributesJson.getString("contact_uri");
    new MessageCreator(
      new PhoneNumber(workerPhone),
      new PhoneNumber(twilioSettings.getPhoneNumber().toString()),
      OFFLINE_MSG
    ).create();

  }

}
```

Most of the features of our application are implemented. The last piece is allowing the Workers to change their availability status. Let's see how to do that next.

## Change a Worker's Activity

We have created this endpoint, so a worker can send an SMS message to the support line with the command "On" or "Off" to change their availability status.

This is important as a worker's activity will change to `Offline` when they miss a call. When this happens, they receive an SMS letting them know that their activity has changed, and that they can reply with the `On` command to make themselves available for incoming calls again.

```java title="Change a Worker's Activity" description="src/main/java/com/twilio/taskrouter/application/servlet/MessageServlet.java"
// !mark(24:63)
package com.twilio.taskrouter.application.servlet;

import com.google.inject.Singleton;
import com.twilio.taskrouter.domain.model.WorkspaceFacade;
import com.twilio.twiml.Sms;
import com.twilio.twiml.TwiMLException;
import com.twilio.twiml.VoiceResponse;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Handles the messages sent by workers for activate/deactivate
 * themselves for receiving calls from users
 */
@Singleton
public class MessageServlet extends HttpServlet {

  private static final Logger LOG = Logger.getLogger(MessageServlet.class.getName());

  private final WorkspaceFacade workspace;

  @Inject
  public MessageServlet(WorkspaceFacade workspace) {
    this.workspace = workspace;
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp)
    throws ServletException, IOException {
    final VoiceResponse twimlResponse;
    final String newStatus = getNewWorkerStatus(req);
    final String workerPhone = req.getParameter("From");

    try {
      Sms responseSms = workspace.findWorkerByPhone(workerPhone).map(worker -> {
        workspace.updateWorkerStatus(worker, newStatus);
        return new Sms.Builder(String.format("Your status has changed to %s", newStatus)).build();
      }).orElseGet(() -> new Sms.Builder("You are not a valid worker").build());

      twimlResponse = new VoiceResponse.Builder().sms(responseSms).build();
      resp.setContentType("application/xml");
      resp.getWriter().print(twimlResponse.toXml());

    } catch (TwiMLException e) {
      LOG.log(Level.SEVERE, "Error while providing answer to a workers' sms", e);
    }

  }

  private String getNewWorkerStatus(HttpServletRequest request) {
    return Optional.ofNullable(request.getParameter("Body"))
      .filter(x -> x.equals("off")).map((first) -> "Offline").orElse("Idle");
  }

}
```

Congratulations! You finished this tutorial. As you can see, using Twilio's TaskRouter is quite simple.

## Where to Next?

If you're a Java developer working with Twilio, you might enjoy these other tutorials:

**[Click to Call](/docs/voice/sdks/javascript/get-started)**

An example application implementing Click to Call using Twilio.

**[Automated-Survey](https://www.twilio.com/blog/automated-survey-java-servlets)**

Instantly collect structured data from your users with a survey conducted over a call or SMS text messages.
