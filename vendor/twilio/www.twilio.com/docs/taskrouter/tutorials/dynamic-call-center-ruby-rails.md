# Dynamic Call Center with Ruby and Rails

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

In this Ruby on Rails application, this step will be executed in the initialization phase every time you run the app.

A [Workspace](/docs/taskrouter/api/workspace) is the container element for any TaskRouter application. The elements are:

* [Tasks](/docs/taskrouter/api/task) - Represents a customer trying to contact an agent
* [Workers](/docs/taskrouter/api/worker) - The agents responsible for handling Tasks
* [Task Queues](/docs/taskrouter/api/task-queue) - Holds Tasks to be consumed by a set of Workers
* [Workflows](/docs/taskrouter/api/workflow) - Responsible for placing Tasks into Task Queues
* [Activities](/docs/taskrouter/api/activity) - Possible states of a Worker. Eg: idle, offline, busy

We'll use a `TaskRouterClient` provided in the twilio-ruby gem to create and configure the workspace.

```rb title="Create, Setup and Configure the Workspace" description="lib/workspace_config.rb"
# !mark(23:34,40:47)
class WorkspaceConfig
  WORKSPACE_NAME          = 'Rails Workspace'.freeze
  WORKFLOW_NAME           = 'Sales'.freeze
  WORKFLOW_TIMEOUT        = ENV['WORKFLOW_TIMEOUT'].freeze
  QUEUE_TIMEOUT           = ENV['QUEUE_TIMEOUT'].freeze
  ASSIGNMENT_CALLBACK_URL = ENV['ASSIGNMENT_CALLBACK_URL'].freeze
  EVENT_CALLBACK_URL      = ENV['EVENT_CALLBACK_URL'].freeze
  BOB_NUMBER              = ENV['BOB_NUMBER'].freeze
  ALICE_NUMBER            = ENV['ALICE_NUMBER'].freeze

  def self.setup
    puts 'Configuring workspace, please wait ...'
    new.setup
    puts 'Workspace ready!'
  end

  def initialize
    @account_sid = ENV['TWILIO_ACCOUNT_SID']
    @auth_token  = ENV['TWILIO_AUTH_TOKEN']
    @client      = taskrouter_client
  end

  def setup
    @workspace_sid = create_workspace
    @client = taskrouter_client
    WorkspaceInfo.instance.workers = create_workers
    workflow_sid = create_workflow.sid
    WorkspaceInfo.instance.workflow_sid = workflow_sid
    idle_activity_sid = activity_by_name('Idle').sid
    WorkspaceInfo.instance.post_work_activity_sid = idle_activity_sid
    WorkspaceInfo.instance.idle_activity_sid = idle_activity_sid
    WorkspaceInfo.instance.offline_activity_sid = activity_by_name('Offline').sid
    WorkspaceInfo.instance.workspace_sid = @workspace_sid
  end

  private

  attr_reader :client, :account_sid, :auth_token

  def taskrouter_client
    client_instance = Twilio::REST::Client.new(
      account_sid,
      auth_token
    )

    client_instance.taskrouter.v1
  end

  def create_workspace
    workspace = client.workspaces.list(friendly_name: WORKSPACE_NAME).first
    workspace.delete unless workspace.nil?

    workspace = client.workspaces.create(
      friendly_name: WORKSPACE_NAME,
      event_callback_url: EVENT_CALLBACK_URL
    )

    workspace.sid
  end

  def create_workers
    bob_attributes = "{\"products\": [\"ProgrammableSMS\"], \"contact_uri\": \"#{BOB_NUMBER}\"}"
    alice_attributes = "{\"products\": [\"ProgrammableVoice\"], \"contact_uri\": \"#{ALICE_NUMBER}\"}"

    bob   = create_worker('Bob', bob_attributes)
    alice = create_worker('Alice', alice_attributes)

    {
      BOB_NUMBER   => { sid: bob.sid,   name: 'Bob' },
      ALICE_NUMBER => { sid: alice.sid, name: 'Alice' }
    }
  end

  def create_worker(name, attributes)
    client.workspaces(@workspace_sid).workers.create(
      friendly_name: name,
      attributes:    attributes,
      activity_sid:  activity_by_name('Idle').sid
    )
  end

  def activity_by_name(name)
    client.workspaces(@workspace_sid).activities.list(friendly_name: name).first
  end

  def create_task_queues
    reservation_activity_sid = activity_by_name('Reserved').sid
    assignment_activity_sid  = activity_by_name('Busy').sid

    voice_queue = create_task_queue('Voice', reservation_activity_sid,
                                    assignment_activity_sid,
                                    "products HAS 'ProgrammableVoice'")

    sms_queue = create_task_queue('SMS', reservation_activity_sid,
                                  assignment_activity_sid,
                                  "products HAS 'ProgrammableSMS'")

    all_queue = create_task_queue('All', reservation_activity_sid,
                                  assignment_activity_sid, '1==1')

    { voice: voice_queue, sms: sms_queue, all: all_queue }
  end

  def create_task_queue(name, reservation_sid, assignment_sid, target_workers)
    client.workspaces(@workspace_sid).task_queues.create(
      friendly_name: name,
      reservation_activity_sid: reservation_sid,
      assignment_activity_sid: assignment_sid,
      target_workers: target_workers
    )
  end

  def create_workflow
    queues = create_task_queues
    config = workflow_config(queues)

    client.workspaces(@workspace_sid).workflows.create(
      configuration: config.to_json,
      friendly_name: WORKFLOW_NAME,
      assignment_callback_url: ASSIGNMENT_CALLBACK_URL,
      fallback_assignment_callback_url: ASSIGNMENT_CALLBACK_URL,
      task_reservation_timeout: WORKFLOW_TIMEOUT
    )
  end

  def workspace_sid
    @workspace_sid || 'no_workspace_yet'
  end

  def workflow_config(queues)
    default_target = default_rule_target(queues[:all].sid)

    {
      task_routing: {
        filters: [
          {
            expression: 'selected_product=="ProgrammableVoice"',
            targets: [
              rule_target(queues[:voice].sid),
              default_target
            ]
          },
          {
            expression: 'selected_product=="ProgrammableSMS"',
            targets: [
              rule_target(queues[:sms].sid),
              default_target
            ]
          }
        ],
        default_filter: default_target
      }
    }
  end

  def rule_target(sid)
    { queue: sid, priority: 5, timeout: QUEUE_TIMEOUT }
  end

  def default_rule_target(sid)
    {
      queue: sid,
      priority: 1,
      timeout: QUEUE_TIMEOUT,
      expression: '1==1'
    }
  end
end
```

Now let's look in more detail at all the steps, starting with the creation of the workspace itself.

## Create a Workspace

Before creating a workspace, we need to delete any others with the same `friendly_name` as the one we are trying to create. In order to create a workspace we need to provide a `friendly_name` and a `callback_url` where a requests will be made every time an event is triggered in our workspace.

```rb title="See how to create a new workspace" description="lib/workspace_config.rb"
# !mark(49:59)
class WorkspaceConfig
  WORKSPACE_NAME          = 'Rails Workspace'.freeze
  WORKFLOW_NAME           = 'Sales'.freeze
  WORKFLOW_TIMEOUT        = ENV['WORKFLOW_TIMEOUT'].freeze
  QUEUE_TIMEOUT           = ENV['QUEUE_TIMEOUT'].freeze
  ASSIGNMENT_CALLBACK_URL = ENV['ASSIGNMENT_CALLBACK_URL'].freeze
  EVENT_CALLBACK_URL      = ENV['EVENT_CALLBACK_URL'].freeze
  BOB_NUMBER              = ENV['BOB_NUMBER'].freeze
  ALICE_NUMBER            = ENV['ALICE_NUMBER'].freeze

  def self.setup
    puts 'Configuring workspace, please wait ...'
    new.setup
    puts 'Workspace ready!'
  end

  def initialize
    @account_sid = ENV['TWILIO_ACCOUNT_SID']
    @auth_token  = ENV['TWILIO_AUTH_TOKEN']
    @client      = taskrouter_client
  end

  def setup
    @workspace_sid = create_workspace
    @client = taskrouter_client
    WorkspaceInfo.instance.workers = create_workers
    workflow_sid = create_workflow.sid
    WorkspaceInfo.instance.workflow_sid = workflow_sid
    idle_activity_sid = activity_by_name('Idle').sid
    WorkspaceInfo.instance.post_work_activity_sid = idle_activity_sid
    WorkspaceInfo.instance.idle_activity_sid = idle_activity_sid
    WorkspaceInfo.instance.offline_activity_sid = activity_by_name('Offline').sid
    WorkspaceInfo.instance.workspace_sid = @workspace_sid
  end

  private

  attr_reader :client, :account_sid, :auth_token

  def taskrouter_client
    client_instance = Twilio::REST::Client.new(
      account_sid,
      auth_token
    )

    client_instance.taskrouter.v1
  end

  def create_workspace
    workspace = client.workspaces.list(friendly_name: WORKSPACE_NAME).first
    workspace.delete unless workspace.nil?

    workspace = client.workspaces.create(
      friendly_name: WORKSPACE_NAME,
      event_callback_url: EVENT_CALLBACK_URL
    )

    workspace.sid
  end

  def create_workers
    bob_attributes = "{\"products\": [\"ProgrammableSMS\"], \"contact_uri\": \"#{BOB_NUMBER}\"}"
    alice_attributes = "{\"products\": [\"ProgrammableVoice\"], \"contact_uri\": \"#{ALICE_NUMBER}\"}"

    bob   = create_worker('Bob', bob_attributes)
    alice = create_worker('Alice', alice_attributes)

    {
      BOB_NUMBER   => { sid: bob.sid,   name: 'Bob' },
      ALICE_NUMBER => { sid: alice.sid, name: 'Alice' }
    }
  end

  def create_worker(name, attributes)
    client.workspaces(@workspace_sid).workers.create(
      friendly_name: name,
      attributes:    attributes,
      activity_sid:  activity_by_name('Idle').sid
    )
  end

  def activity_by_name(name)
    client.workspaces(@workspace_sid).activities.list(friendly_name: name).first
  end

  def create_task_queues
    reservation_activity_sid = activity_by_name('Reserved').sid
    assignment_activity_sid  = activity_by_name('Busy').sid

    voice_queue = create_task_queue('Voice', reservation_activity_sid,
                                    assignment_activity_sid,
                                    "products HAS 'ProgrammableVoice'")

    sms_queue = create_task_queue('SMS', reservation_activity_sid,
                                  assignment_activity_sid,
                                  "products HAS 'ProgrammableSMS'")

    all_queue = create_task_queue('All', reservation_activity_sid,
                                  assignment_activity_sid, '1==1')

    { voice: voice_queue, sms: sms_queue, all: all_queue }
  end

  def create_task_queue(name, reservation_sid, assignment_sid, target_workers)
    client.workspaces(@workspace_sid).task_queues.create(
      friendly_name: name,
      reservation_activity_sid: reservation_sid,
      assignment_activity_sid: assignment_sid,
      target_workers: target_workers
    )
  end

  def create_workflow
    queues = create_task_queues
    config = workflow_config(queues)

    client.workspaces(@workspace_sid).workflows.create(
      configuration: config.to_json,
      friendly_name: WORKFLOW_NAME,
      assignment_callback_url: ASSIGNMENT_CALLBACK_URL,
      fallback_assignment_callback_url: ASSIGNMENT_CALLBACK_URL,
      task_reservation_timeout: WORKFLOW_TIMEOUT
    )
  end

  def workspace_sid
    @workspace_sid || 'no_workspace_yet'
  end

  def workflow_config(queues)
    default_target = default_rule_target(queues[:all].sid)

    {
      task_routing: {
        filters: [
          {
            expression: 'selected_product=="ProgrammableVoice"',
            targets: [
              rule_target(queues[:voice].sid),
              default_target
            ]
          },
          {
            expression: 'selected_product=="ProgrammableSMS"',
            targets: [
              rule_target(queues[:sms].sid),
              default_target
            ]
          }
        ],
        default_filter: default_target
      }
    }
  end

  def rule_target(sid)
    { queue: sid, priority: 5, timeout: QUEUE_TIMEOUT }
  end

  def default_rule_target(sid)
    {
      queue: sid,
      priority: 1,
      timeout: QUEUE_TIMEOUT,
      expression: '1==1'
    }
  end
end
```

We have a brand new workspace, now we need workers. Let's create them on the next step.

## Create the Workers

We'll create two workers: Bob and Alice. They each have two attributes: `contact_uri` a phone number and `products`, a list of products each worker is specialized in. We also need to specify an `activity_sid` and a name for each worker. The selected activity will define the status of the worker.

A set of [default activities](/docs/taskrouter/api/activity#configuring-default-activities-for-worker-state-transitions) is created with your workspace. We use the `Idle` activity to make a worker available for incoming calls.

```rb title="Create Workers" description="lib/workspace_config.rb"
# !mark(61:80)
class WorkspaceConfig
  WORKSPACE_NAME          = 'Rails Workspace'.freeze
  WORKFLOW_NAME           = 'Sales'.freeze
  WORKFLOW_TIMEOUT        = ENV['WORKFLOW_TIMEOUT'].freeze
  QUEUE_TIMEOUT           = ENV['QUEUE_TIMEOUT'].freeze
  ASSIGNMENT_CALLBACK_URL = ENV['ASSIGNMENT_CALLBACK_URL'].freeze
  EVENT_CALLBACK_URL      = ENV['EVENT_CALLBACK_URL'].freeze
  BOB_NUMBER              = ENV['BOB_NUMBER'].freeze
  ALICE_NUMBER            = ENV['ALICE_NUMBER'].freeze

  def self.setup
    puts 'Configuring workspace, please wait ...'
    new.setup
    puts 'Workspace ready!'
  end

  def initialize
    @account_sid = ENV['TWILIO_ACCOUNT_SID']
    @auth_token  = ENV['TWILIO_AUTH_TOKEN']
    @client      = taskrouter_client
  end

  def setup
    @workspace_sid = create_workspace
    @client = taskrouter_client
    WorkspaceInfo.instance.workers = create_workers
    workflow_sid = create_workflow.sid
    WorkspaceInfo.instance.workflow_sid = workflow_sid
    idle_activity_sid = activity_by_name('Idle').sid
    WorkspaceInfo.instance.post_work_activity_sid = idle_activity_sid
    WorkspaceInfo.instance.idle_activity_sid = idle_activity_sid
    WorkspaceInfo.instance.offline_activity_sid = activity_by_name('Offline').sid
    WorkspaceInfo.instance.workspace_sid = @workspace_sid
  end

  private

  attr_reader :client, :account_sid, :auth_token

  def taskrouter_client
    client_instance = Twilio::REST::Client.new(
      account_sid,
      auth_token
    )

    client_instance.taskrouter.v1
  end

  def create_workspace
    workspace = client.workspaces.list(friendly_name: WORKSPACE_NAME).first
    workspace.delete unless workspace.nil?

    workspace = client.workspaces.create(
      friendly_name: WORKSPACE_NAME,
      event_callback_url: EVENT_CALLBACK_URL
    )

    workspace.sid
  end

  def create_workers
    bob_attributes = "{\"products\": [\"ProgrammableSMS\"], \"contact_uri\": \"#{BOB_NUMBER}\"}"
    alice_attributes = "{\"products\": [\"ProgrammableVoice\"], \"contact_uri\": \"#{ALICE_NUMBER}\"}"

    bob   = create_worker('Bob', bob_attributes)
    alice = create_worker('Alice', alice_attributes)

    {
      BOB_NUMBER   => { sid: bob.sid,   name: 'Bob' },
      ALICE_NUMBER => { sid: alice.sid, name: 'Alice' }
    }
  end

  def create_worker(name, attributes)
    client.workspaces(@workspace_sid).workers.create(
      friendly_name: name,
      attributes:    attributes,
      activity_sid:  activity_by_name('Idle').sid
    )
  end

  def activity_by_name(name)
    client.workspaces(@workspace_sid).activities.list(friendly_name: name).first
  end

  def create_task_queues
    reservation_activity_sid = activity_by_name('Reserved').sid
    assignment_activity_sid  = activity_by_name('Busy').sid

    voice_queue = create_task_queue('Voice', reservation_activity_sid,
                                    assignment_activity_sid,
                                    "products HAS 'ProgrammableVoice'")

    sms_queue = create_task_queue('SMS', reservation_activity_sid,
                                  assignment_activity_sid,
                                  "products HAS 'ProgrammableSMS'")

    all_queue = create_task_queue('All', reservation_activity_sid,
                                  assignment_activity_sid, '1==1')

    { voice: voice_queue, sms: sms_queue, all: all_queue }
  end

  def create_task_queue(name, reservation_sid, assignment_sid, target_workers)
    client.workspaces(@workspace_sid).task_queues.create(
      friendly_name: name,
      reservation_activity_sid: reservation_sid,
      assignment_activity_sid: assignment_sid,
      target_workers: target_workers
    )
  end

  def create_workflow
    queues = create_task_queues
    config = workflow_config(queues)

    client.workspaces(@workspace_sid).workflows.create(
      configuration: config.to_json,
      friendly_name: WORKFLOW_NAME,
      assignment_callback_url: ASSIGNMENT_CALLBACK_URL,
      fallback_assignment_callback_url: ASSIGNMENT_CALLBACK_URL,
      task_reservation_timeout: WORKFLOW_TIMEOUT
    )
  end

  def workspace_sid
    @workspace_sid || 'no_workspace_yet'
  end

  def workflow_config(queues)
    default_target = default_rule_target(queues[:all].sid)

    {
      task_routing: {
        filters: [
          {
            expression: 'selected_product=="ProgrammableVoice"',
            targets: [
              rule_target(queues[:voice].sid),
              default_target
            ]
          },
          {
            expression: 'selected_product=="ProgrammableSMS"',
            targets: [
              rule_target(queues[:sms].sid),
              default_target
            ]
          }
        ],
        default_filter: default_target
      }
    }
  end

  def rule_target(sid)
    { queue: sid, priority: 5, timeout: QUEUE_TIMEOUT }
  end

  def default_rule_target(sid)
    {
      queue: sid,
      priority: 1,
      timeout: QUEUE_TIMEOUT,
      expression: '1==1'
    }
  end
end
```

After creating our workers, let's set up the Task Queues.

## Create the Task Queues

Next, we set up the Task Queues. Each with a `friendly_name` and a `targetWorkers`, which is an [expression](/docs/taskrouter/api/task-queue#target-workers) to match Workers. Our Task Queues are:

1. `SMS` - Will target Workers specialized in Programmable SMS, such as Bob, using the expression `"products HAS \"ProgrammableSMS\""`.
2. `Voice` - Will do the same for Programmable Voice Workers, such as Alice, using the expression `"products HAS \"ProgrammableVoice\""`.
3. `All` - This queue targets all users and can be used when there are no specialist around for the chosen product. We can use the `"1==1"` expression here.

```rb title="Create Task Queues" description="lib/workspace_config.rb"
# !mark(86:111)
class WorkspaceConfig
  WORKSPACE_NAME          = 'Rails Workspace'.freeze
  WORKFLOW_NAME           = 'Sales'.freeze
  WORKFLOW_TIMEOUT        = ENV['WORKFLOW_TIMEOUT'].freeze
  QUEUE_TIMEOUT           = ENV['QUEUE_TIMEOUT'].freeze
  ASSIGNMENT_CALLBACK_URL = ENV['ASSIGNMENT_CALLBACK_URL'].freeze
  EVENT_CALLBACK_URL      = ENV['EVENT_CALLBACK_URL'].freeze
  BOB_NUMBER              = ENV['BOB_NUMBER'].freeze
  ALICE_NUMBER            = ENV['ALICE_NUMBER'].freeze

  def self.setup
    puts 'Configuring workspace, please wait ...'
    new.setup
    puts 'Workspace ready!'
  end

  def initialize
    @account_sid = ENV['TWILIO_ACCOUNT_SID']
    @auth_token  = ENV['TWILIO_AUTH_TOKEN']
    @client      = taskrouter_client
  end

  def setup
    @workspace_sid = create_workspace
    @client = taskrouter_client
    WorkspaceInfo.instance.workers = create_workers
    workflow_sid = create_workflow.sid
    WorkspaceInfo.instance.workflow_sid = workflow_sid
    idle_activity_sid = activity_by_name('Idle').sid
    WorkspaceInfo.instance.post_work_activity_sid = idle_activity_sid
    WorkspaceInfo.instance.idle_activity_sid = idle_activity_sid
    WorkspaceInfo.instance.offline_activity_sid = activity_by_name('Offline').sid
    WorkspaceInfo.instance.workspace_sid = @workspace_sid
  end

  private

  attr_reader :client, :account_sid, :auth_token

  def taskrouter_client
    client_instance = Twilio::REST::Client.new(
      account_sid,
      auth_token
    )

    client_instance.taskrouter.v1
  end

  def create_workspace
    workspace = client.workspaces.list(friendly_name: WORKSPACE_NAME).first
    workspace.delete unless workspace.nil?

    workspace = client.workspaces.create(
      friendly_name: WORKSPACE_NAME,
      event_callback_url: EVENT_CALLBACK_URL
    )

    workspace.sid
  end

  def create_workers
    bob_attributes = "{\"products\": [\"ProgrammableSMS\"], \"contact_uri\": \"#{BOB_NUMBER}\"}"
    alice_attributes = "{\"products\": [\"ProgrammableVoice\"], \"contact_uri\": \"#{ALICE_NUMBER}\"}"

    bob   = create_worker('Bob', bob_attributes)
    alice = create_worker('Alice', alice_attributes)

    {
      BOB_NUMBER   => { sid: bob.sid,   name: 'Bob' },
      ALICE_NUMBER => { sid: alice.sid, name: 'Alice' }
    }
  end

  def create_worker(name, attributes)
    client.workspaces(@workspace_sid).workers.create(
      friendly_name: name,
      attributes:    attributes,
      activity_sid:  activity_by_name('Idle').sid
    )
  end

  def activity_by_name(name)
    client.workspaces(@workspace_sid).activities.list(friendly_name: name).first
  end

  def create_task_queues
    reservation_activity_sid = activity_by_name('Reserved').sid
    assignment_activity_sid  = activity_by_name('Busy').sid

    voice_queue = create_task_queue('Voice', reservation_activity_sid,
                                    assignment_activity_sid,
                                    "products HAS 'ProgrammableVoice'")

    sms_queue = create_task_queue('SMS', reservation_activity_sid,
                                  assignment_activity_sid,
                                  "products HAS 'ProgrammableSMS'")

    all_queue = create_task_queue('All', reservation_activity_sid,
                                  assignment_activity_sid, '1==1')

    { voice: voice_queue, sms: sms_queue, all: all_queue }
  end

  def create_task_queue(name, reservation_sid, assignment_sid, target_workers)
    client.workspaces(@workspace_sid).task_queues.create(
      friendly_name: name,
      reservation_activity_sid: reservation_sid,
      assignment_activity_sid: assignment_sid,
      target_workers: target_workers
    )
  end

  def create_workflow
    queues = create_task_queues
    config = workflow_config(queues)

    client.workspaces(@workspace_sid).workflows.create(
      configuration: config.to_json,
      friendly_name: WORKFLOW_NAME,
      assignment_callback_url: ASSIGNMENT_CALLBACK_URL,
      fallback_assignment_callback_url: ASSIGNMENT_CALLBACK_URL,
      task_reservation_timeout: WORKFLOW_TIMEOUT
    )
  end

  def workspace_sid
    @workspace_sid || 'no_workspace_yet'
  end

  def workflow_config(queues)
    default_target = default_rule_target(queues[:all].sid)

    {
      task_routing: {
        filters: [
          {
            expression: 'selected_product=="ProgrammableVoice"',
            targets: [
              rule_target(queues[:voice].sid),
              default_target
            ]
          },
          {
            expression: 'selected_product=="ProgrammableSMS"',
            targets: [
              rule_target(queues[:sms].sid),
              default_target
            ]
          }
        ],
        default_filter: default_target
      }
    }
  end

  def rule_target(sid)
    { queue: sid, priority: 5, timeout: QUEUE_TIMEOUT }
  end

  def default_rule_target(sid)
    {
      queue: sid,
      priority: 1,
      timeout: QUEUE_TIMEOUT,
      expression: '1==1'
    }
  end
end
```

We have a Workspace, Workers and Task Queues... what's left? A Workflow. Let's see how to create one next!

## Create a Workflow

Finally, we create the Workflow using the following parameters:

1. `friendly_name` as the name of a Workflow.
2. `assignment_callback_url` and `fallback_assignment_callback_url` as the public URL where a request will be made when this Workflow assigns a Task to a Worker. We will learn how to implement it on the next steps.
3. `task_reservation_timeout` as the maximum time we want to wait until a Worker is available for handling a Task.
4. `configuration` which is a set of rules for placing Tasks into Task Queues. The routing configuration will take a Task's attribute and match this with Task Queues. This application's Workflow rules are defined as:

   * `"selected_product==\ "ProgrammableSMS\""` expression for `SMS` Task Queue. This expression will match any Task with `ProgrammableSMS` as the `selected_product` attribute.
   * `"selected_product==\ "ProgrammableVoice\""` expression for `Voice` Task Queue.

```rb title="Create a Workflow" description="lib/workspace_config.rb"
# !mark(113:154)
class WorkspaceConfig
  WORKSPACE_NAME          = 'Rails Workspace'.freeze
  WORKFLOW_NAME           = 'Sales'.freeze
  WORKFLOW_TIMEOUT        = ENV['WORKFLOW_TIMEOUT'].freeze
  QUEUE_TIMEOUT           = ENV['QUEUE_TIMEOUT'].freeze
  ASSIGNMENT_CALLBACK_URL = ENV['ASSIGNMENT_CALLBACK_URL'].freeze
  EVENT_CALLBACK_URL      = ENV['EVENT_CALLBACK_URL'].freeze
  BOB_NUMBER              = ENV['BOB_NUMBER'].freeze
  ALICE_NUMBER            = ENV['ALICE_NUMBER'].freeze

  def self.setup
    puts 'Configuring workspace, please wait ...'
    new.setup
    puts 'Workspace ready!'
  end

  def initialize
    @account_sid = ENV['TWILIO_ACCOUNT_SID']
    @auth_token  = ENV['TWILIO_AUTH_TOKEN']
    @client      = taskrouter_client
  end

  def setup
    @workspace_sid = create_workspace
    @client = taskrouter_client
    WorkspaceInfo.instance.workers = create_workers
    workflow_sid = create_workflow.sid
    WorkspaceInfo.instance.workflow_sid = workflow_sid
    idle_activity_sid = activity_by_name('Idle').sid
    WorkspaceInfo.instance.post_work_activity_sid = idle_activity_sid
    WorkspaceInfo.instance.idle_activity_sid = idle_activity_sid
    WorkspaceInfo.instance.offline_activity_sid = activity_by_name('Offline').sid
    WorkspaceInfo.instance.workspace_sid = @workspace_sid
  end

  private

  attr_reader :client, :account_sid, :auth_token

  def taskrouter_client
    client_instance = Twilio::REST::Client.new(
      account_sid,
      auth_token
    )

    client_instance.taskrouter.v1
  end

  def create_workspace
    workspace = client.workspaces.list(friendly_name: WORKSPACE_NAME).first
    workspace.delete unless workspace.nil?

    workspace = client.workspaces.create(
      friendly_name: WORKSPACE_NAME,
      event_callback_url: EVENT_CALLBACK_URL
    )

    workspace.sid
  end

  def create_workers
    bob_attributes = "{\"products\": [\"ProgrammableSMS\"], \"contact_uri\": \"#{BOB_NUMBER}\"}"
    alice_attributes = "{\"products\": [\"ProgrammableVoice\"], \"contact_uri\": \"#{ALICE_NUMBER}\"}"

    bob   = create_worker('Bob', bob_attributes)
    alice = create_worker('Alice', alice_attributes)

    {
      BOB_NUMBER   => { sid: bob.sid,   name: 'Bob' },
      ALICE_NUMBER => { sid: alice.sid, name: 'Alice' }
    }
  end

  def create_worker(name, attributes)
    client.workspaces(@workspace_sid).workers.create(
      friendly_name: name,
      attributes:    attributes,
      activity_sid:  activity_by_name('Idle').sid
    )
  end

  def activity_by_name(name)
    client.workspaces(@workspace_sid).activities.list(friendly_name: name).first
  end

  def create_task_queues
    reservation_activity_sid = activity_by_name('Reserved').sid
    assignment_activity_sid  = activity_by_name('Busy').sid

    voice_queue = create_task_queue('Voice', reservation_activity_sid,
                                    assignment_activity_sid,
                                    "products HAS 'ProgrammableVoice'")

    sms_queue = create_task_queue('SMS', reservation_activity_sid,
                                  assignment_activity_sid,
                                  "products HAS 'ProgrammableSMS'")

    all_queue = create_task_queue('All', reservation_activity_sid,
                                  assignment_activity_sid, '1==1')

    { voice: voice_queue, sms: sms_queue, all: all_queue }
  end

  def create_task_queue(name, reservation_sid, assignment_sid, target_workers)
    client.workspaces(@workspace_sid).task_queues.create(
      friendly_name: name,
      reservation_activity_sid: reservation_sid,
      assignment_activity_sid: assignment_sid,
      target_workers: target_workers
    )
  end

  def create_workflow
    queues = create_task_queues
    config = workflow_config(queues)

    client.workspaces(@workspace_sid).workflows.create(
      configuration: config.to_json,
      friendly_name: WORKFLOW_NAME,
      assignment_callback_url: ASSIGNMENT_CALLBACK_URL,
      fallback_assignment_callback_url: ASSIGNMENT_CALLBACK_URL,
      task_reservation_timeout: WORKFLOW_TIMEOUT
    )
  end

  def workspace_sid
    @workspace_sid || 'no_workspace_yet'
  end

  def workflow_config(queues)
    default_target = default_rule_target(queues[:all].sid)

    {
      task_routing: {
        filters: [
          {
            expression: 'selected_product=="ProgrammableVoice"',
            targets: [
              rule_target(queues[:voice].sid),
              default_target
            ]
          },
          {
            expression: 'selected_product=="ProgrammableSMS"',
            targets: [
              rule_target(queues[:sms].sid),
              default_target
            ]
          }
        ],
        default_filter: default_target
      }
    }
  end

  def rule_target(sid)
    { queue: sid, priority: 5, timeout: QUEUE_TIMEOUT }
  end

  def default_rule_target(sid)
    {
      queue: sid,
      priority: 1,
      timeout: QUEUE_TIMEOUT,
      expression: '1==1'
    }
  end
end
```

Our workspace is completely setup. Now it's time to see how we use it to route calls.

## Handle Twilio's Request

Right after receiving a call, Twilio will send a request to the URL specified on the [number's configuration](/console/phone-numbers/incoming).

The endpoint will then process the request and generate a TwiML response. We'll use the [Say](/docs/voice/twiml/say) verb to give the user product alternatives, and a key they can press in order to select one. The [Gather](/docs/voice/twiml/gather) verb allows us to capture the user's key press.

```rb title="Handle Incoming Call" description="lib/twiml_generator.rb"
# !mark(2:13)
module TwimlGenerator
  def self.generate_gather_product(callback_url)
    response = Twilio::TwiML::VoiceResponse.new
    gather = Twilio::TwiML::Gather.new(num_digits: 1,
                                       action: callback_url,
                                       method: 'POST')
    gather.say 'Welcome to the Twilio support line!'
    gather.say 'To get specialized help with programmable voice press 1, '\
      'or press 2 for programmable SMS'

    response.append(gather)
    response.to_s
  end

  def self.generate_task_enqueue(selected_product)
    enqueue = Twilio::TwiML::Enqueue.new(nil, workflow_sid: WorkspaceInfo.instance.workflow_sid)
    enqueue.task "{\"selected_product\": \"#{selected_product}\"}"

    response = Twilio::TwiML::VoiceResponse.new
    response.append(enqueue)
    response.to_s
  end

  def self.generate_confirm_message(status)
    response = Twilio::TwiML::MessagingResponse.new
    response.message(body: "Your status has changed to #{status}")
    response.to_s
  end
end
```

We just asked the caller to choose a product, next we will use their choice to create the appropriate Task.

## Create a Task

This is the endpoint set as the `action` URL on the `Gather` verb on the previous step. A request is made to this endpoint when the user presses a key during the call. This request has a `Digits` parameter that holds the pressed keys. A `Task` will be created based on the pressed digit with the `selected_product` as an attribute. The Workflow will take this Task's attributes and match them with the [configured expressions](/docs/taskrouter/expression-syntax) in order to find a Task Queue for this Task, so an appropriate available Worker can be assigned to handle it.

We use the [`Enqueue` verb](/docs/voice/twiml/enqueue) with a `WorkflowSid` attribute to [integrate with TaskRouter](/docs/taskrouter/twiml-queue-calls#using-enqueue-to-route-calls-with-taskrouter). Then the voice call will be put on hold while TaskRouter tries to find an available Worker to handle this Task.

```rb title="Create a Task" description="lib/twiml_generator.rb"
# !mark(15:22)
module TwimlGenerator
  def self.generate_gather_product(callback_url)
    response = Twilio::TwiML::VoiceResponse.new
    gather = Twilio::TwiML::Gather.new(num_digits: 1,
                                       action: callback_url,
                                       method: 'POST')
    gather.say 'Welcome to the Twilio support line!'
    gather.say 'To get specialized help with programmable voice press 1, '\
      'or press 2 for programmable SMS'

    response.append(gather)
    response.to_s
  end

  def self.generate_task_enqueue(selected_product)
    enqueue = Twilio::TwiML::Enqueue.new(nil, workflow_sid: WorkspaceInfo.instance.workflow_sid)
    enqueue.task "{\"selected_product\": \"#{selected_product}\"}"

    response = Twilio::TwiML::VoiceResponse.new
    response.append(enqueue)
    response.to_s
  end

  def self.generate_confirm_message(status)
    response = Twilio::TwiML::MessagingResponse.new
    response.message(body: "Your status has changed to #{status}")
    response.to_s
  end
end
```

After sending a Task to Twilio, let's see how we tell TaskRouter which Worker to use to execute that task.

## Assign a Worker

When TaskRouter selects a Worker, it does the following:

1. The Task's Assignment Status is set to 'reserved'.
2. A [Reservation instance](/docs/taskrouter/api/reservations) is generated, linking the Task to the selected Worker.
3. At the same time the Reservation is created, a `POST` request is made to the Workflow's AssignmentCallbackURL, which was configured using the [WorkspaceConfig](https://github.com/TwilioDevEd/task-router-rails/blob/4aee99759a0b9dfbf6a0f70c430587db96b63229/lib/workspace_config.rb#L127) class when the application is initialized. This request includes the full details of the Task, the selected Worker, and the Reservation.

Handling this [Assignment Callback](/docs/taskrouter/handle-assignment-callbacks) is a key component of building a TaskRouter application as we can instruct how the Worker will handle a Task. We could send a text, email, push notifications or make a call.

Since we created this Task during a voice call with an `Enqueue` verb, let's [instruct TaskRouter to dequeue](/docs/taskrouter/handle-assignment-callbacks#dequeue-call) the call and dial a Worker. If we do not specify a `to` parameter with a phone number, TaskRouter will pick the Worker's `contact_uri` attribute.

We also send a `post_work_activity_sid` which will tell TaskRouter which [Activity](/docs/taskrouter/quickstart/ruby/setup-understanding-activities) to assign this worker after the call ends.

```rb title="Assign a Worker" description="app/controllers/callback_controller.rb"
# !mark(4:11)
class CallbackController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def assignment
    instruction = {
      instruction: 'dequeue',
      post_work_activity_sid: WorkspaceInfo.instance.post_work_activity_sid
    }

    render json: instruction
  end

  def events
    event_type = params[:EventType]

    if ['workflow.timeout', 'task.canceled'].include?(event_type)
      task_attributes = JSON.parse(params[:TaskAttributes])

      MissedCall.create(
        selected_product: task_attributes['selected_product'],
        phone_number: task_attributes['from']
      )

      redirect_to_voicemail(task_attributes['call_sid']) if event_type == 'workflow.timeout'
    elsif event_type == 'worker.activity.update' &&
          params[:WorkerActivityName] == 'Offline'

      worker_attributes = JSON.parse(params[:WorkerAttributes])
      notify_offline_status(worker_attributes['contact_uri'])
    end

    render nothing: true
  end

  private

  def redirect_to_voicemail(call_sid)
    email         = ENV['MISSED_CALLS_EMAIL_ADDRESS']
    message       = 'Sorry, All agents are busy. Please leave a message. We\'ll call you as soon as possible'
    url_message   = { Message: message }.to_query
    redirect_url  =
      "https://twimlets.com/voicemail?Email=#{email}&#{url_message}"

    client.calls(call_sid).update(url: redirect_url)
  end

  def notify_offline_status(phone_number)
    message = 'Your status has changed to Offline. Reply with '\
              '"On" to get back Online'
    client.messages.create(
      to: phone_number,
      from: ENV['TWILIO_NUMBER'],
      body: message
    )
  end

  def client
    Twilio::REST::Client.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])
  end
end
```

Now that our Tasks are routed properly, let's deal with missed calls in the next step.

## Collect Missed Calls

This endpoint will be called after each [TaskRouter Event](/docs/taskrouter/api/event/reference#event-types) is triggered. In our application, we are trying to collect missed calls, so we would like to handle the `workflow.timeout` event. This event is triggered when the Task waits more than the limit set on Workflow Configuration-- or rather when no worker is available.

Here we use TwilioRestClient to route this call to a [Voicemail Twimlet](/labs/twimlets/voicemail). Twimlets are tiny web applications for voice. This one will generate a `TwiML` response using `Say` verb and record a message using `Record` verb. The recorded message will then be transcribed and sent to the email address configured.

Note that we are also listening for `task.canceled`. This is triggered when the customer hangs up before being assigned to an agent, therefore canceling the task. Capturing this event allows us to collect the information from the customers that hang up before the Workflow times out.

```rb title="Collect Missed Calls" description="app/controllers/callback_controller.rb"
# !mark(13:33,37:46)
class CallbackController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def assignment
    instruction = {
      instruction: 'dequeue',
      post_work_activity_sid: WorkspaceInfo.instance.post_work_activity_sid
    }

    render json: instruction
  end

  def events
    event_type = params[:EventType]

    if ['workflow.timeout', 'task.canceled'].include?(event_type)
      task_attributes = JSON.parse(params[:TaskAttributes])

      MissedCall.create(
        selected_product: task_attributes['selected_product'],
        phone_number: task_attributes['from']
      )

      redirect_to_voicemail(task_attributes['call_sid']) if event_type == 'workflow.timeout'
    elsif event_type == 'worker.activity.update' &&
          params[:WorkerActivityName] == 'Offline'

      worker_attributes = JSON.parse(params[:WorkerAttributes])
      notify_offline_status(worker_attributes['contact_uri'])
    end

    render nothing: true
  end

  private

  def redirect_to_voicemail(call_sid)
    email         = ENV['MISSED_CALLS_EMAIL_ADDRESS']
    message       = 'Sorry, All agents are busy. Please leave a message. We\'ll call you as soon as possible'
    url_message   = { Message: message }.to_query
    redirect_url  =
      "https://twimlets.com/voicemail?Email=#{email}&#{url_message}"

    client.calls(call_sid).update(url: redirect_url)
  end

  def notify_offline_status(phone_number)
    message = 'Your status has changed to Offline. Reply with '\
              '"On" to get back Online'
    client.messages.create(
      to: phone_number,
      from: ENV['TWILIO_NUMBER'],
      body: message
    )
  end

  def client
    Twilio::REST::Client.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])
  end
end
```

See how to allow Workers change their availability status

## Change a Worker's Activity

We have created this endpoint, so a worker can send an SMS message to the support line with the command "On" or "Off" to change their availability status.

This is important as a worker's activity will change to `Offline` when they miss a call. When this happens, they receive an SMS letting them know that their activity has changed, and that they can reply with the `On` command to make themselves available for incoming calls again.

```rb title="Handle Message to update the Worker Status" description="app/controllers/message_controller.rb"
# !mark(4:24)
class MessageController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def incoming
    command     = params['Body'].downcase
    from_number = params['From']

    if command == 'off'
      status = 'Offline'
      activity_sid = WorkspaceInfo.instance.offline_activity_sid
    else
      status = 'Idle'
      activity_sid = WorkspaceInfo.instance.idle_activity_sid
    end

    worker_sid = WorkspaceInfo.instance.workers[from_number][:sid]
    client
      .workspaces(WorkspaceInfo.instance.workspace_sid)
      .workers(worker_sid)
      .fetch
      .update(activity_sid: activity_sid)

    render xml: TwimlGenerator.generate_confirm_message(status)
  end

  private

  def client
    client_instance = Twilio::REST::Client.new(
      ENV['TWILIO_ACCOUNT_SID'],
      ENV['TWILIO_AUTH_TOKEN']
    )

    client_instance.taskrouter.v1
  end
end
```

Congratulations! You finished this tutorial. As you can see, using Twilio's TaskRouter is quite simple.

## Where to Next?

If you're a Ruby developer working with Twilio, you might also enjoy these tutorials:

**[Voice JavaScript SDK Quickstart](/docs/voice/sdks/javascript/get-started)**

Learn how to use Twilio JavaScript Voice SDK to make browser-to-phone and browser-to-browser calls with ease.

**[ETA-Notifications](https://www.twilio.com/blog/eta-notifications-with-ruby-and-rails)**

Learn how to implement ETA Notifications using Ruby on Rails and Twilio.
