# Dynamic call center with Python and Django

This tutorial explains how to automate call routing from customers to your support agents. In this example, customers select a product and are then connected to a specialist for that product. If no one is available, the customer's number is saved so that an agent can call them back.

When complete, your application does the following:

* Configures a Workspace using the Twilio [TaskRouter REST API](/docs/taskrouter/api).
* Listens for incoming calls and lets the user select a product with the dial pad.
* Creates a Task with the selected product and lets TaskRouter handle it.
* Stores missed calls so agents can return the call to customers.
* Redirects users to a voice mail when no one answers the call.
* Allows agents to change their status (Available/Offline) via SMS.

## Configure the Workspace

For TaskRouter to handle the Tasks, you need to configure a Workspace. You can do this in the [TaskRouter Console](https://console.twilio.com/?frameUrl=%2Fconsole%2Ftaskrouter%2Fworkspaces) or programmatically using the [TaskRouter REST API](/docs/taskrouter/api).

Your Django application will do this setup when the app starts.

A [Workspace](/docs/taskrouter/api/workspace) is the container element for any TaskRouter application. The elements are:

* [Tasks](/docs/taskrouter/api/task): Represents a customer trying to contact an agent
* [Workers](/docs/taskrouter/api/worker): The agents responsible for handling Tasks
* [Task Queues](/docs/taskrouter/api/task-queue): Holds Tasks to be consumed by a set of Workers
* [Workflows](/docs/taskrouter/api/workflow): Responsible for placing Tasks into Task Queues
* [Activities](/docs/taskrouter/api/activity): Possible states of a Worker. For example, idle, offline, or busy

In order to build a client for this API, you need a `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` which you can find in [Twilio Console](/console). The function `build_client` configures and returns a TwilioTaskRouterClient, which is provided by the Twilio Python library.

```py title="Create, Setup and Configure the Workspace" description="task_router/workspace.py"
# !mark(16:19,42:50)
import json

from django.conf import settings
from twilio.rest import Client

HOST = settings.HOST
ALICE_NUMBER = settings.ALICE_NUMBER
BOB_NUMBER = settings.BOB_NUMBER
WORKSPACE_NAME = 'Twilio Workspace'


def first(items):
    return items[0] if items else None


def build_client():
    account_sid = settings.TWILIO_ACCOUNT_SID
    auth_token = settings.TWILIO_AUTH_TOKEN
    return Client(account_sid, auth_token)


CACHE = {}


def activities_dict(client, workspace_sid):
    activities = client.taskrouter.workspaces(workspace_sid)\
                                  .activities.list()

    return {activity.friendly_name: activity for activity in activities}


class WorkspaceInfo:

    def __init__(self, workspace, workflow, activities, workers):
        self.workflow_sid = workflow.sid
        self.workspace_sid = workspace.sid
        self.activities = activities
        self.post_work_activity_sid = activities['Available'].sid
        self.workers = workers


def setup():
    client = build_client()
    if 'WORKSPACE_INFO' not in CACHE:
        workspace = create_workspace(client)
        activities = activities_dict(client, workspace.sid)
        workers = create_workers(client, workspace, activities)
        queues = create_task_queues(client, workspace, activities)
        workflow = create_workflow(client, workspace, queues)
        CACHE['WORKSPACE_INFO'] = WorkspaceInfo(workspace, workflow, activities, workers)
    return CACHE['WORKSPACE_INFO']


def create_workspace(client):
    try:
        workspace = first(client.taskrouter.workspaces.list(friendly_name=WORKSPACE_NAME))
        client.taskrouter.workspaces(workspace.sid).delete()
    except Exception:
        pass

    events_callback = HOST + '/events/'

    return client.taskrouter.workspaces.create(
            friendly_name=WORKSPACE_NAME,
            event_callback_url=events_callback,
            template=None)


def create_workers(client, workspace, activities):
    alice_attributes = {
        "products": ["ProgrammableVoice"],
        "contact_uri": ALICE_NUMBER
    }

    alice = client.taskrouter.workspaces(workspace.sid)\
                  .workers.create(friendly_name='Alice',
                                  attributes=json.dumps(alice_attributes))

    bob_attributes = {
        "products": ["ProgrammableSMS"],
        "contact_uri": BOB_NUMBER
    }

    bob = client.taskrouter.workspaces(workspace.sid)\
                .workers.create(friendly_name='Bob',
                                attributes=json.dumps(bob_attributes))

    return {BOB_NUMBER: bob.sid, ALICE_NUMBER: alice.sid}


def create_task_queues(client, workspace, activities):
    default_queue = client.taskrouter.workspaces(workspace.sid).task_queues\
                    .create(friendly_name='Default',
                            assignment_activity_sid=activities['Unavailable'].sid,
                            target_workers='1==1')

    sms_queue = client.taskrouter.workspaces(workspace.sid).task_queues\
                      .create(friendly_name='SMS',
                              assignment_activity_sid=activities['Unavailable'].sid,
                              target_workers='"ProgrammableSMS" in products')

    voice_queue = client.taskrouter.workspaces(workspace.sid).task_queues\
                        .create(friendly_name='Voice',
                                assignment_activity_sid=activities['Unavailable'].sid,
                                target_workers='"ProgrammableVoice" in products')

    return {'sms': sms_queue, 'voice': voice_queue, 'default': default_queue}


def create_workflow(client, workspace, queues):
    defaultTarget = {
        'queue': queues['sms'].sid,
        'priority': 5,
        'timeout': 30
    }

    smsTarget = {
        'queue': queues['sms'].sid,
        'priority': 5,
        'timeout': 30
    }

    voiceTarget = {
        'queue': queues['voice'].sid,
        'priority': 5,
        'timeout': 30
    }

    default_filter = {
        'filter_friendly_name': 'Default Filter',
        'queue': queues['default'].sid,
        'Expression': '1==1',
        'priority': 1,
        'timeout': 30
    }

    voiceFilter = {
        'filter_friendly_name': 'Voice Filter',
        'expression': 'selected_product=="ProgrammableVoice"',
        'targets': [voiceTarget, defaultTarget]
    }

    smsFilter = {
        'filter_friendly_name': 'SMS Filter',
        'expression': 'selected_product=="ProgrammableSMS"',
        'targets': [smsTarget, defaultTarget]
    }

    config = {
        'task_routing': {
            'filters': [voiceFilter, smsFilter],
            'default_filter': default_filter
        }
    }

    callback_url = HOST + '/assignment/'

    return client.taskrouter.workspaces(workspace.sid)\
                 .workflows.create(friendly_name='Sales',
                                   assignment_callback_url=callback_url,
                                   fallback_assignment_callback_url=callback_url,
                                   task_reservation_timeout=15,
                                   configuration=json.dumps(config))
```

## Create a Workspace

Before creating a workspace, you need to delete any others with the same `friendly_name` as the one you're trying to create. To create a workspace, you need to provide a `friendly_name` and a `event_callback_url` where a requests will be made every time an event is triggered in your workspace.

```py title="Create Workspace" description="task_router/workspace.py"
# !mark(54:66)
import json

from django.conf import settings
from twilio.rest import Client

HOST = settings.HOST
ALICE_NUMBER = settings.ALICE_NUMBER
BOB_NUMBER = settings.BOB_NUMBER
WORKSPACE_NAME = 'Twilio Workspace'


def first(items):
    return items[0] if items else None


def build_client():
    account_sid = settings.TWILIO_ACCOUNT_SID
    auth_token = settings.TWILIO_AUTH_TOKEN
    return Client(account_sid, auth_token)


CACHE = {}


def activities_dict(client, workspace_sid):
    activities = client.taskrouter.workspaces(workspace_sid)\
                                  .activities.list()

    return {activity.friendly_name: activity for activity in activities}


class WorkspaceInfo:

    def __init__(self, workspace, workflow, activities, workers):
        self.workflow_sid = workflow.sid
        self.workspace_sid = workspace.sid
        self.activities = activities
        self.post_work_activity_sid = activities['Available'].sid
        self.workers = workers


def setup():
    client = build_client()
    if 'WORKSPACE_INFO' not in CACHE:
        workspace = create_workspace(client)
        activities = activities_dict(client, workspace.sid)
        workers = create_workers(client, workspace, activities)
        queues = create_task_queues(client, workspace, activities)
        workflow = create_workflow(client, workspace, queues)
        CACHE['WORKSPACE_INFO'] = WorkspaceInfo(workspace, workflow, activities, workers)
    return CACHE['WORKSPACE_INFO']


def create_workspace(client):
    try:
        workspace = first(client.taskrouter.workspaces.list(friendly_name=WORKSPACE_NAME))
        client.taskrouter.workspaces(workspace.sid).delete()
    except Exception:
        pass

    events_callback = HOST + '/events/'

    return client.taskrouter.workspaces.create(
            friendly_name=WORKSPACE_NAME,
            event_callback_url=events_callback,
            template=None)


def create_workers(client, workspace, activities):
    alice_attributes = {
        "products": ["ProgrammableVoice"],
        "contact_uri": ALICE_NUMBER
    }

    alice = client.taskrouter.workspaces(workspace.sid)\
                  .workers.create(friendly_name='Alice',
                                  attributes=json.dumps(alice_attributes))

    bob_attributes = {
        "products": ["ProgrammableSMS"],
        "contact_uri": BOB_NUMBER
    }

    bob = client.taskrouter.workspaces(workspace.sid)\
                .workers.create(friendly_name='Bob',
                                attributes=json.dumps(bob_attributes))

    return {BOB_NUMBER: bob.sid, ALICE_NUMBER: alice.sid}


def create_task_queues(client, workspace, activities):
    default_queue = client.taskrouter.workspaces(workspace.sid).task_queues\
                    .create(friendly_name='Default',
                            assignment_activity_sid=activities['Unavailable'].sid,
                            target_workers='1==1')

    sms_queue = client.taskrouter.workspaces(workspace.sid).task_queues\
                      .create(friendly_name='SMS',
                              assignment_activity_sid=activities['Unavailable'].sid,
                              target_workers='"ProgrammableSMS" in products')

    voice_queue = client.taskrouter.workspaces(workspace.sid).task_queues\
                        .create(friendly_name='Voice',
                                assignment_activity_sid=activities['Unavailable'].sid,
                                target_workers='"ProgrammableVoice" in products')

    return {'sms': sms_queue, 'voice': voice_queue, 'default': default_queue}


def create_workflow(client, workspace, queues):
    defaultTarget = {
        'queue': queues['sms'].sid,
        'priority': 5,
        'timeout': 30
    }

    smsTarget = {
        'queue': queues['sms'].sid,
        'priority': 5,
        'timeout': 30
    }

    voiceTarget = {
        'queue': queues['voice'].sid,
        'priority': 5,
        'timeout': 30
    }

    default_filter = {
        'filter_friendly_name': 'Default Filter',
        'queue': queues['default'].sid,
        'Expression': '1==1',
        'priority': 1,
        'timeout': 30
    }

    voiceFilter = {
        'filter_friendly_name': 'Voice Filter',
        'expression': 'selected_product=="ProgrammableVoice"',
        'targets': [voiceTarget, defaultTarget]
    }

    smsFilter = {
        'filter_friendly_name': 'SMS Filter',
        'expression': 'selected_product=="ProgrammableSMS"',
        'targets': [smsTarget, defaultTarget]
    }

    config = {
        'task_routing': {
            'filters': [voiceFilter, smsFilter],
            'default_filter': default_filter
        }
    }

    callback_url = HOST + '/assignment/'

    return client.taskrouter.workspaces(workspace.sid)\
                 .workflows.create(friendly_name='Sales',
                                   assignment_callback_url=callback_url,
                                   fallback_assignment_callback_url=callback_url,
                                   task_reservation_timeout=15,
                                   configuration=json.dumps(config))
```

In the next step, you'll create workers for your new Workspace.

## Create the Workers

You'll create two workers: Bob and Alice. They each have two attributes: `contact_uri`, which is a phone number, and `products`, a list of products each worker specializes in. You also need to specify an `activity_sid` and a name for each worker. The selected activity defines the status of the worker.

A set of [default activities](/docs/taskrouter/api/activity#configuring-default-activities-for-worker-state-transitions) is created with your workspace. Use the `Idle` activity to make a worker available for incoming calls.

```py title="Create Workers" description="task_router/workspace.py"
# !mark(69:88)
import json

from django.conf import settings
from twilio.rest import Client

HOST = settings.HOST
ALICE_NUMBER = settings.ALICE_NUMBER
BOB_NUMBER = settings.BOB_NUMBER
WORKSPACE_NAME = 'Twilio Workspace'


def first(items):
    return items[0] if items else None


def build_client():
    account_sid = settings.TWILIO_ACCOUNT_SID
    auth_token = settings.TWILIO_AUTH_TOKEN
    return Client(account_sid, auth_token)


CACHE = {}


def activities_dict(client, workspace_sid):
    activities = client.taskrouter.workspaces(workspace_sid)\
                                  .activities.list()

    return {activity.friendly_name: activity for activity in activities}


class WorkspaceInfo:

    def __init__(self, workspace, workflow, activities, workers):
        self.workflow_sid = workflow.sid
        self.workspace_sid = workspace.sid
        self.activities = activities
        self.post_work_activity_sid = activities['Available'].sid
        self.workers = workers


def setup():
    client = build_client()
    if 'WORKSPACE_INFO' not in CACHE:
        workspace = create_workspace(client)
        activities = activities_dict(client, workspace.sid)
        workers = create_workers(client, workspace, activities)
        queues = create_task_queues(client, workspace, activities)
        workflow = create_workflow(client, workspace, queues)
        CACHE['WORKSPACE_INFO'] = WorkspaceInfo(workspace, workflow, activities, workers)
    return CACHE['WORKSPACE_INFO']


def create_workspace(client):
    try:
        workspace = first(client.taskrouter.workspaces.list(friendly_name=WORKSPACE_NAME))
        client.taskrouter.workspaces(workspace.sid).delete()
    except Exception:
        pass

    events_callback = HOST + '/events/'

    return client.taskrouter.workspaces.create(
            friendly_name=WORKSPACE_NAME,
            event_callback_url=events_callback,
            template=None)


def create_workers(client, workspace, activities):
    alice_attributes = {
        "products": ["ProgrammableVoice"],
        "contact_uri": ALICE_NUMBER
    }

    alice = client.taskrouter.workspaces(workspace.sid)\
                  .workers.create(friendly_name='Alice',
                                  attributes=json.dumps(alice_attributes))

    bob_attributes = {
        "products": ["ProgrammableSMS"],
        "contact_uri": BOB_NUMBER
    }

    bob = client.taskrouter.workspaces(workspace.sid)\
                .workers.create(friendly_name='Bob',
                                attributes=json.dumps(bob_attributes))

    return {BOB_NUMBER: bob.sid, ALICE_NUMBER: alice.sid}


def create_task_queues(client, workspace, activities):
    default_queue = client.taskrouter.workspaces(workspace.sid).task_queues\
                    .create(friendly_name='Default',
                            assignment_activity_sid=activities['Unavailable'].sid,
                            target_workers='1==1')

    sms_queue = client.taskrouter.workspaces(workspace.sid).task_queues\
                      .create(friendly_name='SMS',
                              assignment_activity_sid=activities['Unavailable'].sid,
                              target_workers='"ProgrammableSMS" in products')

    voice_queue = client.taskrouter.workspaces(workspace.sid).task_queues\
                        .create(friendly_name='Voice',
                                assignment_activity_sid=activities['Unavailable'].sid,
                                target_workers='"ProgrammableVoice" in products')

    return {'sms': sms_queue, 'voice': voice_queue, 'default': default_queue}


def create_workflow(client, workspace, queues):
    defaultTarget = {
        'queue': queues['sms'].sid,
        'priority': 5,
        'timeout': 30
    }

    smsTarget = {
        'queue': queues['sms'].sid,
        'priority': 5,
        'timeout': 30
    }

    voiceTarget = {
        'queue': queues['voice'].sid,
        'priority': 5,
        'timeout': 30
    }

    default_filter = {
        'filter_friendly_name': 'Default Filter',
        'queue': queues['default'].sid,
        'Expression': '1==1',
        'priority': 1,
        'timeout': 30
    }

    voiceFilter = {
        'filter_friendly_name': 'Voice Filter',
        'expression': 'selected_product=="ProgrammableVoice"',
        'targets': [voiceTarget, defaultTarget]
    }

    smsFilter = {
        'filter_friendly_name': 'SMS Filter',
        'expression': 'selected_product=="ProgrammableSMS"',
        'targets': [smsTarget, defaultTarget]
    }

    config = {
        'task_routing': {
            'filters': [voiceFilter, smsFilter],
            'default_filter': default_filter
        }
    }

    callback_url = HOST + '/assignment/'

    return client.taskrouter.workspaces(workspace.sid)\
                 .workflows.create(friendly_name='Sales',
                                   assignment_callback_url=callback_url,
                                   fallback_assignment_callback_url=callback_url,
                                   task_reservation_timeout=15,
                                   configuration=json.dumps(config))
```

After creating your workers, set up the Task Queues.

## Create the Task Queues

Each Task Queue needs a `friendly_name` and a `targetWorkers`, which is an [expression](/docs/taskrouter/api/task-queue#target-workers) to match Workers. Use these Task Queues:

* `SMS`: Targets Workers specialized in Programmable SMS, like Bob, using the expression `'"ProgrammableSMS" in products'`.
* `Voice`: Targets Workers specialized in Programmable Voice, like Alice, using the expression `'"ProgrammableVoice" in products'`.
* `Default`: Targets all users and can be used when there's no specialist for the chosen product. You can use the `"1==1"` expression here.

```py title="Create Task Queues" description="task_router/workspace.py"
# !mark(91:107)
import json

from django.conf import settings
from twilio.rest import Client

HOST = settings.HOST
ALICE_NUMBER = settings.ALICE_NUMBER
BOB_NUMBER = settings.BOB_NUMBER
WORKSPACE_NAME = 'Twilio Workspace'


def first(items):
    return items[0] if items else None


def build_client():
    account_sid = settings.TWILIO_ACCOUNT_SID
    auth_token = settings.TWILIO_AUTH_TOKEN
    return Client(account_sid, auth_token)


CACHE = {}


def activities_dict(client, workspace_sid):
    activities = client.taskrouter.workspaces(workspace_sid)\
                                  .activities.list()

    return {activity.friendly_name: activity for activity in activities}


class WorkspaceInfo:

    def __init__(self, workspace, workflow, activities, workers):
        self.workflow_sid = workflow.sid
        self.workspace_sid = workspace.sid
        self.activities = activities
        self.post_work_activity_sid = activities['Available'].sid
        self.workers = workers


def setup():
    client = build_client()
    if 'WORKSPACE_INFO' not in CACHE:
        workspace = create_workspace(client)
        activities = activities_dict(client, workspace.sid)
        workers = create_workers(client, workspace, activities)
        queues = create_task_queues(client, workspace, activities)
        workflow = create_workflow(client, workspace, queues)
        CACHE['WORKSPACE_INFO'] = WorkspaceInfo(workspace, workflow, activities, workers)
    return CACHE['WORKSPACE_INFO']


def create_workspace(client):
    try:
        workspace = first(client.taskrouter.workspaces.list(friendly_name=WORKSPACE_NAME))
        client.taskrouter.workspaces(workspace.sid).delete()
    except Exception:
        pass

    events_callback = HOST + '/events/'

    return client.taskrouter.workspaces.create(
            friendly_name=WORKSPACE_NAME,
            event_callback_url=events_callback,
            template=None)


def create_workers(client, workspace, activities):
    alice_attributes = {
        "products": ["ProgrammableVoice"],
        "contact_uri": ALICE_NUMBER
    }

    alice = client.taskrouter.workspaces(workspace.sid)\
                  .workers.create(friendly_name='Alice',
                                  attributes=json.dumps(alice_attributes))

    bob_attributes = {
        "products": ["ProgrammableSMS"],
        "contact_uri": BOB_NUMBER
    }

    bob = client.taskrouter.workspaces(workspace.sid)\
                .workers.create(friendly_name='Bob',
                                attributes=json.dumps(bob_attributes))

    return {BOB_NUMBER: bob.sid, ALICE_NUMBER: alice.sid}


def create_task_queues(client, workspace, activities):
    default_queue = client.taskrouter.workspaces(workspace.sid).task_queues\
                    .create(friendly_name='Default',
                            assignment_activity_sid=activities['Unavailable'].sid,
                            target_workers='1==1')

    sms_queue = client.taskrouter.workspaces(workspace.sid).task_queues\
                      .create(friendly_name='SMS',
                              assignment_activity_sid=activities['Unavailable'].sid,
                              target_workers='"ProgrammableSMS" in products')

    voice_queue = client.taskrouter.workspaces(workspace.sid).task_queues\
                        .create(friendly_name='Voice',
                                assignment_activity_sid=activities['Unavailable'].sid,
                                target_workers='"ProgrammableVoice" in products')

    return {'sms': sms_queue, 'voice': voice_queue, 'default': default_queue}


def create_workflow(client, workspace, queues):
    defaultTarget = {
        'queue': queues['sms'].sid,
        'priority': 5,
        'timeout': 30
    }

    smsTarget = {
        'queue': queues['sms'].sid,
        'priority': 5,
        'timeout': 30
    }

    voiceTarget = {
        'queue': queues['voice'].sid,
        'priority': 5,
        'timeout': 30
    }

    default_filter = {
        'filter_friendly_name': 'Default Filter',
        'queue': queues['default'].sid,
        'Expression': '1==1',
        'priority': 1,
        'timeout': 30
    }

    voiceFilter = {
        'filter_friendly_name': 'Voice Filter',
        'expression': 'selected_product=="ProgrammableVoice"',
        'targets': [voiceTarget, defaultTarget]
    }

    smsFilter = {
        'filter_friendly_name': 'SMS Filter',
        'expression': 'selected_product=="ProgrammableSMS"',
        'targets': [smsTarget, defaultTarget]
    }

    config = {
        'task_routing': {
            'filters': [voiceFilter, smsFilter],
            'default_filter': default_filter
        }
    }

    callback_url = HOST + '/assignment/'

    return client.taskrouter.workspaces(workspace.sid)\
                 .workflows.create(friendly_name='Sales',
                                   assignment_callback_url=callback_url,
                                   fallback_assignment_callback_url=callback_url,
                                   task_reservation_timeout=15,
                                   configuration=json.dumps(config))
```

The last remaining step is to create a Workflow.

## Create a Workflow

Use the following parameters:

* `friendly_name`: The name of a Workflow.
* `assignment_callback_url` and `fallback_assignment_callback_url`: The public URL where a request is made when this Workflow assigns a Task to a Worker. You'll learn how to implement this URL in the next steps.
* `task_reservation_timeout`: The maximum time you want to wait until a Worker is available for handling a Task.
* `configuration`: A set of rules for placing Tasks into Task Queues. The routing configuration takes a Task attribute and matches it with Task Queues. This application's Workflow rules are defined as:
  * `"selected_product==\ "ProgrammableSMS\""` expression for `SMS` Task Queue. This expression matches any Task with `ProgrammableSMS` as the `selected_product` attribute.
  * `"selected_product==\ "ProgrammableVoice\""` expression for `Voice` Task Queue.

```py title="Create a Workflow" description="task_router/workspace.py"
# !mark(110:163)
import json

from django.conf import settings
from twilio.rest import Client

HOST = settings.HOST
ALICE_NUMBER = settings.ALICE_NUMBER
BOB_NUMBER = settings.BOB_NUMBER
WORKSPACE_NAME = 'Twilio Workspace'


def first(items):
    return items[0] if items else None


def build_client():
    account_sid = settings.TWILIO_ACCOUNT_SID
    auth_token = settings.TWILIO_AUTH_TOKEN
    return Client(account_sid, auth_token)


CACHE = {}


def activities_dict(client, workspace_sid):
    activities = client.taskrouter.workspaces(workspace_sid)\
                                  .activities.list()

    return {activity.friendly_name: activity for activity in activities}


class WorkspaceInfo:

    def __init__(self, workspace, workflow, activities, workers):
        self.workflow_sid = workflow.sid
        self.workspace_sid = workspace.sid
        self.activities = activities
        self.post_work_activity_sid = activities['Available'].sid
        self.workers = workers


def setup():
    client = build_client()
    if 'WORKSPACE_INFO' not in CACHE:
        workspace = create_workspace(client)
        activities = activities_dict(client, workspace.sid)
        workers = create_workers(client, workspace, activities)
        queues = create_task_queues(client, workspace, activities)
        workflow = create_workflow(client, workspace, queues)
        CACHE['WORKSPACE_INFO'] = WorkspaceInfo(workspace, workflow, activities, workers)
    return CACHE['WORKSPACE_INFO']


def create_workspace(client):
    try:
        workspace = first(client.taskrouter.workspaces.list(friendly_name=WORKSPACE_NAME))
        client.taskrouter.workspaces(workspace.sid).delete()
    except Exception:
        pass

    events_callback = HOST + '/events/'

    return client.taskrouter.workspaces.create(
            friendly_name=WORKSPACE_NAME,
            event_callback_url=events_callback,
            template=None)


def create_workers(client, workspace, activities):
    alice_attributes = {
        "products": ["ProgrammableVoice"],
        "contact_uri": ALICE_NUMBER
    }

    alice = client.taskrouter.workspaces(workspace.sid)\
                  .workers.create(friendly_name='Alice',
                                  attributes=json.dumps(alice_attributes))

    bob_attributes = {
        "products": ["ProgrammableSMS"],
        "contact_uri": BOB_NUMBER
    }

    bob = client.taskrouter.workspaces(workspace.sid)\
                .workers.create(friendly_name='Bob',
                                attributes=json.dumps(bob_attributes))

    return {BOB_NUMBER: bob.sid, ALICE_NUMBER: alice.sid}


def create_task_queues(client, workspace, activities):
    default_queue = client.taskrouter.workspaces(workspace.sid).task_queues\
                    .create(friendly_name='Default',
                            assignment_activity_sid=activities['Unavailable'].sid,
                            target_workers='1==1')

    sms_queue = client.taskrouter.workspaces(workspace.sid).task_queues\
                      .create(friendly_name='SMS',
                              assignment_activity_sid=activities['Unavailable'].sid,
                              target_workers='"ProgrammableSMS" in products')

    voice_queue = client.taskrouter.workspaces(workspace.sid).task_queues\
                        .create(friendly_name='Voice',
                                assignment_activity_sid=activities['Unavailable'].sid,
                                target_workers='"ProgrammableVoice" in products')

    return {'sms': sms_queue, 'voice': voice_queue, 'default': default_queue}


def create_workflow(client, workspace, queues):
    defaultTarget = {
        'queue': queues['sms'].sid,
        'priority': 5,
        'timeout': 30
    }

    smsTarget = {
        'queue': queues['sms'].sid,
        'priority': 5,
        'timeout': 30
    }

    voiceTarget = {
        'queue': queues['voice'].sid,
        'priority': 5,
        'timeout': 30
    }

    default_filter = {
        'filter_friendly_name': 'Default Filter',
        'queue': queues['default'].sid,
        'Expression': '1==1',
        'priority': 1,
        'timeout': 30
    }

    voiceFilter = {
        'filter_friendly_name': 'Voice Filter',
        'expression': 'selected_product=="ProgrammableVoice"',
        'targets': [voiceTarget, defaultTarget]
    }

    smsFilter = {
        'filter_friendly_name': 'SMS Filter',
        'expression': 'selected_product=="ProgrammableSMS"',
        'targets': [smsTarget, defaultTarget]
    }

    config = {
        'task_routing': {
            'filters': [voiceFilter, smsFilter],
            'default_filter': default_filter
        }
    }

    callback_url = HOST + '/assignment/'

    return client.taskrouter.workspaces(workspace.sid)\
                 .workflows.create(friendly_name='Sales',
                                   assignment_callback_url=callback_url,
                                   fallback_assignment_callback_url=callback_url,
                                   task_reservation_timeout=15,
                                   configuration=json.dumps(config))
```

Now that your workspace is completely set up, learn how you can use it to route calls.

## Handle Twilio's request

Right after receiving a call, Twilio sends a request to the URL specified on the [number's configuration](/console/phone-numbers/incoming).

The endpoint then processes the request and generates a TwiML response. We'll use the [Say](/docs/voice/twiml/say) verb to give the user product alternatives, and a key they can press to select one. The [Gather](/docs/voice/twiml/gather) verb allows you to capture the user's key press.

```py title="Handling Twilio's Requests" description="task_router/views.py"
# !mark(54:61)
import json
from urllib.parse import quote_plus

from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
from twilio.twiml.voice_response import VoiceResponse

from . import sms_sender, workspace
from .models import MissedCall

if not getattr(settings, 'TESTING', False):
    WORKSPACE_INFO = workspace.setup()
else:
    WORKSPACE_INFO = None

ACCOUNT_SID = settings.TWILIO_ACCOUNT_SID
AUTH_TOKEN = settings.TWILIO_AUTH_TOKEN
TWILIO_NUMBER = settings.TWILIO_NUMBER
EMAIL = settings.MISSED_CALLS_EMAIL_ADDRESS


def root(request):
    """ Renders a missed calls list, with product and phone number """
    missed_calls = MissedCall.objects.order_by('-created')
    return render(request, 'index.html', {
        'missed_calls': missed_calls
    })


@csrf_exempt
def incoming_sms(request):
    """ Changes worker activity and returns a confirmation """
    client = Client(ACCOUNT_SID, AUTH_TOKEN)
    activity = 'Available' if request.POST['Body'].lower().strip() == 'on' else 'Offline'
    activity_sid = WORKSPACE_INFO.activities[activity].sid
    worker_sid = WORKSPACE_INFO.workers[request.POST['From']]
    workspace_sid = WORKSPACE_INFO.workspace_sid

    client.workspaces(workspace_sid)\
          .workers(worker_sid)\
          .update(activity_sid=activity_sid)

    resp = MessagingResponse()
    message = 'Your status has changed to ' + activity
    resp.message(message)
    return HttpResponse(resp)


@csrf_exempt
def incoming_call(request):
    """ Returns TwiML instructions to Twilio's POST requests """
    resp = VoiceResponse()
    gather = resp.gather(numDigits=1, action=reverse('enqueue'), method="POST")
    gather.say("For Programmable SMS, press one. For Voice, press any other key.")

    return HttpResponse(resp)


@csrf_exempt
def enqueue(request):
    """ Parses a selected product, creating a Task on Task Router Workflow """
    resp = VoiceResponse()
    digits = request.POST['Digits']
    selected_product = 'ProgrammableSMS' if digits == '1' else 'ProgrammableVoice'
    task = {'selected_product': selected_product}

    enqueue = resp.enqueue(None, workflowSid=WORKSPACE_INFO.workflow_sid)
    enqueue.task(json.dumps(task))

    return HttpResponse(resp)


@csrf_exempt
def assignment(request):
    """ Task assignment """
    response = {'instruction': 'dequeue',
                'post_work_activity_sid': WORKSPACE_INFO.post_work_activity_sid}
    return JsonResponse(response)


@csrf_exempt
def events(request):
    """ Events callback for missed calls """
    POST = request.POST
    event_type = POST.get('EventType')
    task_events = ['workflow.timeout', 'task.canceled']
    worker_event = 'worker.activity.update'

    if event_type in task_events:
        task_attributes = json.loads(POST['TaskAttributes'])
        _save_missed_call(task_attributes)
        if event_type == 'workflow.timeout':
            _voicemail(task_attributes['call_sid'])
    elif event_type == worker_event and POST['WorkerActivityName'] == 'Offline':
        message = 'Your status has changed to Offline. Reply with '\
            '"On" to get back Online'
        worker_number = json.loads(POST['WorkerAttributes'])['contact_uri']
        sms_sender.send(to=worker_number, from_=TWILIO_NUMBER, body=message)

    return HttpResponse('')


def _voicemail(call_sid):
    msg = 'Sorry, All agents are busy. Please leave a message. We will call you as soon as possible'
    route_url = 'https://twimlets.com/voicemail?Email=' + EMAIL + '&Message=' + quote_plus(msg)
    route_call(call_sid, route_url)


def route_call(call_sid, route_url):
    client = Client(ACCOUNT_SID, AUTH_TOKEN)
    client.api.calls(call_sid).update(url=route_url)


def _save_missed_call(task_attributes):
    MissedCall.objects.create(
            phone_number=task_attributes['from'],
            selected_product=task_attributes['selected_product'])


# Only used by the tests in order to patch requests before any call is made
def setup_workspace():
    global WORKSPACE_INFO
    WORKSPACE_INFO = workspace.setup()
```

You just asked the caller to choose a product, next you'll use their choice to create the appropriate Task.

## [TwiML™ Voice: \<Enqueue>](/docs/voice/twiml/enqueue)Create a Task

This is the endpoint set as the `action` URL on the `Gather` verb on the previous step. A request is made to this endpoint when the user presses a key during the call. This request has a `Digits` parameter that holds the pressed keys. A `Task` is created based on the pressed digit with the `selected_product` as an attribute. The Workflow takes this Task's attributes and matches with the [configured expressions](/docs/taskrouter/expression-syntax) in order to find a Task Queue for this Task, so an appropriate available Worker can be assigned to handle it.

Use the [`Enqueue` verb](/docs/voice/twiml/enqueue) with a `WorkflowSid` attribute to [integrate with TaskRouter](/docs/taskrouter/twiml-queue-calls#using-enqueue-to-route-calls-with-taskrouter). Then the voice call is put on hold while TaskRouter tries to find an available Worker to handle this Task.

```py title="Create a Task" description="task_router/views.py"
# !mark(64:75)
import json
from urllib.parse import quote_plus

from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
from twilio.twiml.voice_response import VoiceResponse

from . import sms_sender, workspace
from .models import MissedCall

if not getattr(settings, 'TESTING', False):
    WORKSPACE_INFO = workspace.setup()
else:
    WORKSPACE_INFO = None

ACCOUNT_SID = settings.TWILIO_ACCOUNT_SID
AUTH_TOKEN = settings.TWILIO_AUTH_TOKEN
TWILIO_NUMBER = settings.TWILIO_NUMBER
EMAIL = settings.MISSED_CALLS_EMAIL_ADDRESS


def root(request):
    """ Renders a missed calls list, with product and phone number """
    missed_calls = MissedCall.objects.order_by('-created')
    return render(request, 'index.html', {
        'missed_calls': missed_calls
    })


@csrf_exempt
def incoming_sms(request):
    """ Changes worker activity and returns a confirmation """
    client = Client(ACCOUNT_SID, AUTH_TOKEN)
    activity = 'Available' if request.POST['Body'].lower().strip() == 'on' else 'Offline'
    activity_sid = WORKSPACE_INFO.activities[activity].sid
    worker_sid = WORKSPACE_INFO.workers[request.POST['From']]
    workspace_sid = WORKSPACE_INFO.workspace_sid

    client.workspaces(workspace_sid)\
          .workers(worker_sid)\
          .update(activity_sid=activity_sid)

    resp = MessagingResponse()
    message = 'Your status has changed to ' + activity
    resp.message(message)
    return HttpResponse(resp)


@csrf_exempt
def incoming_call(request):
    """ Returns TwiML instructions to Twilio's POST requests """
    resp = VoiceResponse()
    gather = resp.gather(numDigits=1, action=reverse('enqueue'), method="POST")
    gather.say("For Programmable SMS, press one. For Voice, press any other key.")

    return HttpResponse(resp)


@csrf_exempt
def enqueue(request):
    """ Parses a selected product, creating a Task on Task Router Workflow """
    resp = VoiceResponse()
    digits = request.POST['Digits']
    selected_product = 'ProgrammableSMS' if digits == '1' else 'ProgrammableVoice'
    task = {'selected_product': selected_product}

    enqueue = resp.enqueue(None, workflowSid=WORKSPACE_INFO.workflow_sid)
    enqueue.task(json.dumps(task))

    return HttpResponse(resp)


@csrf_exempt
def assignment(request):
    """ Task assignment """
    response = {'instruction': 'dequeue',
                'post_work_activity_sid': WORKSPACE_INFO.post_work_activity_sid}
    return JsonResponse(response)


@csrf_exempt
def events(request):
    """ Events callback for missed calls """
    POST = request.POST
    event_type = POST.get('EventType')
    task_events = ['workflow.timeout', 'task.canceled']
    worker_event = 'worker.activity.update'

    if event_type in task_events:
        task_attributes = json.loads(POST['TaskAttributes'])
        _save_missed_call(task_attributes)
        if event_type == 'workflow.timeout':
            _voicemail(task_attributes['call_sid'])
    elif event_type == worker_event and POST['WorkerActivityName'] == 'Offline':
        message = 'Your status has changed to Offline. Reply with '\
            '"On" to get back Online'
        worker_number = json.loads(POST['WorkerAttributes'])['contact_uri']
        sms_sender.send(to=worker_number, from_=TWILIO_NUMBER, body=message)

    return HttpResponse('')


def _voicemail(call_sid):
    msg = 'Sorry, All agents are busy. Please leave a message. We will call you as soon as possible'
    route_url = 'https://twimlets.com/voicemail?Email=' + EMAIL + '&Message=' + quote_plus(msg)
    route_call(call_sid, route_url)


def route_call(call_sid, route_url):
    client = Client(ACCOUNT_SID, AUTH_TOKEN)
    client.api.calls(call_sid).update(url=route_url)


def _save_missed_call(task_attributes):
    MissedCall.objects.create(
            phone_number=task_attributes['from'],
            selected_product=task_attributes['selected_product'])


# Only used by the tests in order to patch requests before any call is made
def setup_workspace():
    global WORKSPACE_INFO
    WORKSPACE_INFO = workspace.setup()
```

After sending a Task to Twilio, you can tell TaskRouter which Worker to use to execute that task.

## Assign a Worker

When TaskRouter selects a Worker, it does the following:

1. Sets the Task's Assignment Status to 'reserved'.
2. Generates a [Reservation instance](/docs/taskrouter/api/reservations) that links the Task to the selected Worker.
3. At the same time it creates a Reservation, it makes a `POST` request to the Workflow's AssignmentCallbackURL, which you configured while creating the Workflow. This request includes the full details of the Task, the selected Worker, and the Reservation.

Handling this [Assignment Callback](/docs/taskrouter/handle-assignment-callbacks) is a key component of building a TaskRouter application because you can configure how the Worker handles a Task. You could send a text, email, push notification, or make a call.

Since you created this Task during a voice call with an `Enqueue` verb, let's [instruct TaskRouter to dequeue](/docs/taskrouter/handle-assignment-callbacks#dequeue-call) the call and dial a Worker. If you don't specify a `to` parameter with a phone number, TaskRouter picks the Worker's `contact_uri` attribute.

You can also send a `post_work_activity_sid`, which tells TaskRouter which [Activity](/docs/taskrouter/quickstart/python/setup-understanding-activities) to assign this worker after the call ends.

```py title="Assign a Worker" description="task_router/views.py"
# !mark(78:83)
import json
from urllib.parse import quote_plus

from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
from twilio.twiml.voice_response import VoiceResponse

from . import sms_sender, workspace
from .models import MissedCall

if not getattr(settings, 'TESTING', False):
    WORKSPACE_INFO = workspace.setup()
else:
    WORKSPACE_INFO = None

ACCOUNT_SID = settings.TWILIO_ACCOUNT_SID
AUTH_TOKEN = settings.TWILIO_AUTH_TOKEN
TWILIO_NUMBER = settings.TWILIO_NUMBER
EMAIL = settings.MISSED_CALLS_EMAIL_ADDRESS


def root(request):
    """ Renders a missed calls list, with product and phone number """
    missed_calls = MissedCall.objects.order_by('-created')
    return render(request, 'index.html', {
        'missed_calls': missed_calls
    })


@csrf_exempt
def incoming_sms(request):
    """ Changes worker activity and returns a confirmation """
    client = Client(ACCOUNT_SID, AUTH_TOKEN)
    activity = 'Available' if request.POST['Body'].lower().strip() == 'on' else 'Offline'
    activity_sid = WORKSPACE_INFO.activities[activity].sid
    worker_sid = WORKSPACE_INFO.workers[request.POST['From']]
    workspace_sid = WORKSPACE_INFO.workspace_sid

    client.workspaces(workspace_sid)\
          .workers(worker_sid)\
          .update(activity_sid=activity_sid)

    resp = MessagingResponse()
    message = 'Your status has changed to ' + activity
    resp.message(message)
    return HttpResponse(resp)


@csrf_exempt
def incoming_call(request):
    """ Returns TwiML instructions to Twilio's POST requests """
    resp = VoiceResponse()
    gather = resp.gather(numDigits=1, action=reverse('enqueue'), method="POST")
    gather.say("For Programmable SMS, press one. For Voice, press any other key.")

    return HttpResponse(resp)


@csrf_exempt
def enqueue(request):
    """ Parses a selected product, creating a Task on Task Router Workflow """
    resp = VoiceResponse()
    digits = request.POST['Digits']
    selected_product = 'ProgrammableSMS' if digits == '1' else 'ProgrammableVoice'
    task = {'selected_product': selected_product}

    enqueue = resp.enqueue(None, workflowSid=WORKSPACE_INFO.workflow_sid)
    enqueue.task(json.dumps(task))

    return HttpResponse(resp)


@csrf_exempt
def assignment(request):
    """ Task assignment """
    response = {'instruction': 'dequeue',
                'post_work_activity_sid': WORKSPACE_INFO.post_work_activity_sid}
    return JsonResponse(response)


@csrf_exempt
def events(request):
    """ Events callback for missed calls """
    POST = request.POST
    event_type = POST.get('EventType')
    task_events = ['workflow.timeout', 'task.canceled']
    worker_event = 'worker.activity.update'

    if event_type in task_events:
        task_attributes = json.loads(POST['TaskAttributes'])
        _save_missed_call(task_attributes)
        if event_type == 'workflow.timeout':
            _voicemail(task_attributes['call_sid'])
    elif event_type == worker_event and POST['WorkerActivityName'] == 'Offline':
        message = 'Your status has changed to Offline. Reply with '\
            '"On" to get back Online'
        worker_number = json.loads(POST['WorkerAttributes'])['contact_uri']
        sms_sender.send(to=worker_number, from_=TWILIO_NUMBER, body=message)

    return HttpResponse('')


def _voicemail(call_sid):
    msg = 'Sorry, All agents are busy. Please leave a message. We will call you as soon as possible'
    route_url = 'https://twimlets.com/voicemail?Email=' + EMAIL + '&Message=' + quote_plus(msg)
    route_call(call_sid, route_url)


def route_call(call_sid, route_url):
    client = Client(ACCOUNT_SID, AUTH_TOKEN)
    client.api.calls(call_sid).update(url=route_url)


def _save_missed_call(task_attributes):
    MissedCall.objects.create(
            phone_number=task_attributes['from'],
            selected_product=task_attributes['selected_product'])


# Only used by the tests in order to patch requests before any call is made
def setup_workspace():
    global WORKSPACE_INFO
    WORKSPACE_INFO = workspace.setup()
```

Now that TaskRouter can route your Tasks properly, set up a process for handling missed calls.

## Collect missed calls

This endpoint is called after each [TaskRouter Event](/docs/taskrouter/api/event/reference#event-types) is triggered. In your application, you're trying to collect missed calls, so you want to handle the `workflow.timeout` event. This event is triggered when the Task waits more than the limit set on Workflow configuration--or rather when no worker is available.

Here you'll use TwilioRestClient to route this call to a [Voicemail Twimlet](https://www.twilio.com/labs/twimlets/voicemail). Twimlets are tiny web applications for voice. This one generates a `TwiML` response using `Say` verb and record a message using `Record` verb. The recorded message is then be transcribed and sent to the email address configured.

Note that the following code also listens for `task.canceled`. This is triggered when the customer hangs up before being assigned to an agent, therefore canceling the task. Capturing this event allows you to collect information from customers who hang up before the Workflow times out.

```py title="Collect Missed Calls" description="task_router/views.py"
# !mark(86:122)
import json
from urllib.parse import quote_plus

from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
from twilio.twiml.voice_response import VoiceResponse

from . import sms_sender, workspace
from .models import MissedCall

if not getattr(settings, 'TESTING', False):
    WORKSPACE_INFO = workspace.setup()
else:
    WORKSPACE_INFO = None

ACCOUNT_SID = settings.TWILIO_ACCOUNT_SID
AUTH_TOKEN = settings.TWILIO_AUTH_TOKEN
TWILIO_NUMBER = settings.TWILIO_NUMBER
EMAIL = settings.MISSED_CALLS_EMAIL_ADDRESS


def root(request):
    """ Renders a missed calls list, with product and phone number """
    missed_calls = MissedCall.objects.order_by('-created')
    return render(request, 'index.html', {
        'missed_calls': missed_calls
    })


@csrf_exempt
def incoming_sms(request):
    """ Changes worker activity and returns a confirmation """
    client = Client(ACCOUNT_SID, AUTH_TOKEN)
    activity = 'Available' if request.POST['Body'].lower().strip() == 'on' else 'Offline'
    activity_sid = WORKSPACE_INFO.activities[activity].sid
    worker_sid = WORKSPACE_INFO.workers[request.POST['From']]
    workspace_sid = WORKSPACE_INFO.workspace_sid

    client.workspaces(workspace_sid)\
          .workers(worker_sid)\
          .update(activity_sid=activity_sid)

    resp = MessagingResponse()
    message = 'Your status has changed to ' + activity
    resp.message(message)
    return HttpResponse(resp)


@csrf_exempt
def incoming_call(request):
    """ Returns TwiML instructions to Twilio's POST requests """
    resp = VoiceResponse()
    gather = resp.gather(numDigits=1, action=reverse('enqueue'), method="POST")
    gather.say("For Programmable SMS, press one. For Voice, press any other key.")

    return HttpResponse(resp)


@csrf_exempt
def enqueue(request):
    """ Parses a selected product, creating a Task on Task Router Workflow """
    resp = VoiceResponse()
    digits = request.POST['Digits']
    selected_product = 'ProgrammableSMS' if digits == '1' else 'ProgrammableVoice'
    task = {'selected_product': selected_product}

    enqueue = resp.enqueue(None, workflowSid=WORKSPACE_INFO.workflow_sid)
    enqueue.task(json.dumps(task))

    return HttpResponse(resp)


@csrf_exempt
def assignment(request):
    """ Task assignment """
    response = {'instruction': 'dequeue',
                'post_work_activity_sid': WORKSPACE_INFO.post_work_activity_sid}
    return JsonResponse(response)


@csrf_exempt
def events(request):
    """ Events callback for missed calls """
    POST = request.POST
    event_type = POST.get('EventType')
    task_events = ['workflow.timeout', 'task.canceled']
    worker_event = 'worker.activity.update'

    if event_type in task_events:
        task_attributes = json.loads(POST['TaskAttributes'])
        _save_missed_call(task_attributes)
        if event_type == 'workflow.timeout':
            _voicemail(task_attributes['call_sid'])
    elif event_type == worker_event and POST['WorkerActivityName'] == 'Offline':
        message = 'Your status has changed to Offline. Reply with '\
            '"On" to get back Online'
        worker_number = json.loads(POST['WorkerAttributes'])['contact_uri']
        sms_sender.send(to=worker_number, from_=TWILIO_NUMBER, body=message)

    return HttpResponse('')


def _voicemail(call_sid):
    msg = 'Sorry, All agents are busy. Please leave a message. We will call you as soon as possible'
    route_url = 'https://twimlets.com/voicemail?Email=' + EMAIL + '&Message=' + quote_plus(msg)
    route_call(call_sid, route_url)


def route_call(call_sid, route_url):
    client = Client(ACCOUNT_SID, AUTH_TOKEN)
    client.api.calls(call_sid).update(url=route_url)


def _save_missed_call(task_attributes):
    MissedCall.objects.create(
            phone_number=task_attributes['from'],
            selected_product=task_attributes['selected_product'])


# Only used by the tests in order to patch requests before any call is made
def setup_workspace():
    global WORKSPACE_INFO
    WORKSPACE_INFO = workspace.setup()
```

You've now implemented most of the necessary features of your application. The last piece is to allow Workers to change their availability status.

## Change a Worker's Activity

You've created this endpoint so a worker can send an SMS message to the support line with the command "On" or "Off" to change their availability status.

This is important because a worker's activity changes to `Offline` when they miss a call. When this happens, they receive an SMS letting them know that their activity has changed, and that they can reply with the `On` command to make themselves available for incoming calls again.

```py title="Changing a Worker's Activity" description="task_router/views.py"
# !mark(35:51)
import json
from urllib.parse import quote_plus

from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
from twilio.twiml.voice_response import VoiceResponse

from . import sms_sender, workspace
from .models import MissedCall

if not getattr(settings, 'TESTING', False):
    WORKSPACE_INFO = workspace.setup()
else:
    WORKSPACE_INFO = None

ACCOUNT_SID = settings.TWILIO_ACCOUNT_SID
AUTH_TOKEN = settings.TWILIO_AUTH_TOKEN
TWILIO_NUMBER = settings.TWILIO_NUMBER
EMAIL = settings.MISSED_CALLS_EMAIL_ADDRESS


def root(request):
    """ Renders a missed calls list, with product and phone number """
    missed_calls = MissedCall.objects.order_by('-created')
    return render(request, 'index.html', {
        'missed_calls': missed_calls
    })


@csrf_exempt
def incoming_sms(request):
    """ Changes worker activity and returns a confirmation """
    client = Client(ACCOUNT_SID, AUTH_TOKEN)
    activity = 'Available' if request.POST['Body'].lower().strip() == 'on' else 'Offline'
    activity_sid = WORKSPACE_INFO.activities[activity].sid
    worker_sid = WORKSPACE_INFO.workers[request.POST['From']]
    workspace_sid = WORKSPACE_INFO.workspace_sid

    client.workspaces(workspace_sid)\
          .workers(worker_sid)\
          .update(activity_sid=activity_sid)

    resp = MessagingResponse()
    message = 'Your status has changed to ' + activity
    resp.message(message)
    return HttpResponse(resp)


@csrf_exempt
def incoming_call(request):
    """ Returns TwiML instructions to Twilio's POST requests """
    resp = VoiceResponse()
    gather = resp.gather(numDigits=1, action=reverse('enqueue'), method="POST")
    gather.say("For Programmable SMS, press one. For Voice, press any other key.")

    return HttpResponse(resp)


@csrf_exempt
def enqueue(request):
    """ Parses a selected product, creating a Task on Task Router Workflow """
    resp = VoiceResponse()
    digits = request.POST['Digits']
    selected_product = 'ProgrammableSMS' if digits == '1' else 'ProgrammableVoice'
    task = {'selected_product': selected_product}

    enqueue = resp.enqueue(None, workflowSid=WORKSPACE_INFO.workflow_sid)
    enqueue.task(json.dumps(task))

    return HttpResponse(resp)


@csrf_exempt
def assignment(request):
    """ Task assignment """
    response = {'instruction': 'dequeue',
                'post_work_activity_sid': WORKSPACE_INFO.post_work_activity_sid}
    return JsonResponse(response)


@csrf_exempt
def events(request):
    """ Events callback for missed calls """
    POST = request.POST
    event_type = POST.get('EventType')
    task_events = ['workflow.timeout', 'task.canceled']
    worker_event = 'worker.activity.update'

    if event_type in task_events:
        task_attributes = json.loads(POST['TaskAttributes'])
        _save_missed_call(task_attributes)
        if event_type == 'workflow.timeout':
            _voicemail(task_attributes['call_sid'])
    elif event_type == worker_event and POST['WorkerActivityName'] == 'Offline':
        message = 'Your status has changed to Offline. Reply with '\
            '"On" to get back Online'
        worker_number = json.loads(POST['WorkerAttributes'])['contact_uri']
        sms_sender.send(to=worker_number, from_=TWILIO_NUMBER, body=message)

    return HttpResponse('')


def _voicemail(call_sid):
    msg = 'Sorry, All agents are busy. Please leave a message. We will call you as soon as possible'
    route_url = 'https://twimlets.com/voicemail?Email=' + EMAIL + '&Message=' + quote_plus(msg)
    route_call(call_sid, route_url)


def route_call(call_sid, route_url):
    client = Client(ACCOUNT_SID, AUTH_TOKEN)
    client.api.calls(call_sid).update(url=route_url)


def _save_missed_call(task_attributes):
    MissedCall.objects.create(
            phone_number=task_attributes['from'],
            selected_product=task_attributes['selected_product'])


# Only used by the tests in order to patch requests before any call is made
def setup_workspace():
    global WORKSPACE_INFO
    WORKSPACE_INFO = workspace.setup()
```

## What's next

Congratulations! You finished this tutorial. If you're a Python developer working with Twilio, you might enjoy these other tutorials:

* [Appointment-Reminders](/docs/messaging/tutorials/appointment-reminders/python-django): Automate the process of reaching out to your customers prior to an upcoming appointment.
* [**Automated-Survey-Django**](https://www.twilio.com/blog/automated-survey-python-django): Instantly collect structured data from your users with a survey conducted over a call or SMS text messages.
