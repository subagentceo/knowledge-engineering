# Assigning Tasks to Workers: Handling Assignment Callbacks

When TaskRouter selects a Worker to handle a Task it makes an HTTP request to your application server. Handling this Assignment Callback is a key component of building a TaskRouter application.

## Assignment callback overview

When TaskRouter selects a Worker, it does the following:

1. The Task's Assignment Status is set to 'reserved'.
2. A [Reservation instance][reservations] is generated, linking the Task to the selected Worker, and TaskRouter starts a configurable task reservation timer (defaults to 120 seconds).
3. At the same time the Reservation is created, a webhook `POST` request is made to the Workflow's AssignmentCallbackURL. This callback includes the [full details of the Task, the selected Worker, and the Reservation.](#assignment-callback-parameters)
4. If you're using [TaskRouter's JavaScript library](/docs/taskrouter/js-sdk), the selected Worker will receive a WebSocket notification that they have been reserved for a Task containing the full Task details.
5. An Event Callback is made to the Workspace's EventCallbackURL. This callback includes the full details of the Task, the selected Worker and the Reservation, and serves the purpose of logging changes in your TaskRouter environment.

The Reservation has a Status of 'pending' until it is either accepted (confirming the Worker has received the Task), rejected (indicating the Worker explicitly denied the Task), or timed out (when no response was received within the configured timeframe).

To complete the assignment process, your application must do two things:

1. Deliver the Task to the Worker
2. Acknowledge that the task been accepted or rejected.

Let's step through the options for fulfilling these responsibilities in your application.

### Task assignment callback parameters \[#assignment-callback-parameters]

The Assignment Callback `HTTP POST` request made to your application server includes the following parameters.

| Parameter        | Description                                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| Timestamp        | The date/time the task assignment was made                                                                      |
| AccountSid       | The Twilio AccountSid                                                                                           |
| WorkspaceSid     | The ID of the Workspace of this worker and task                                                                 |
| WorkflowSid      | The ID of the Workflow responsible for routing this Task                                                        |
| TaskQueueSid     | The ID of the Queue this task was in when it was assigned                                                       |
| WorkerSid        | The ID of the Worker that has been assigned the task                                                            |
| WorkerAttributes | JSON attributes describing the worker. For example: `{ 'agent_id':'123456', 'phone':'+1558675309' }`            |
| TaskSid          | The ID of the task that is being assigned                                                                       |
| TaskAttributes   | The JSON attributes attached to the task. For example `{ "type":"support_request", "account_number":"1234567"}` |
| TaskAge          | The age of the task upon assignment                                                                             |
| TaskPriority     | The priority of the task upon assignment                                                                        |
| ReservationSid   | The ID of the reservation that matches a task to a worker                                                       |

### Responding to the Assignment Callback \[#respond-to-assignment]

Your application can respond to an Assignment Callback in one of the following ways:

1. [Perform an arbitrary action, manually accepting or rejecting the reservation](#manual-accept)
2. [Immediately accept the Task Reservation.](#immediate-accept)
3. [Immediately reject the Task Reservation.](#immediate-reject)
4. [Dequeue a waiting call from a TwiML Queue](#dequeue-call)
5. [Initiate a new outbound phone call](#initiating-call)
6. [Redirect an active phone call to a new TwiML document](#redirecting-call)

**Note: Any errors while executing Assignment Instructions (#2-6) will show up in the Account Portal under Monitor -> Alerts.**

If you wish to respond with an instruction, the `Content-Type` header must be "application/json" and the body a valid JSON object which contains, at a minimum, an "instruction" key. Your application can respond to the Assignment Callback in any of the following ways:

**Important: If Your application doesn't respond within 5 seconds with a `200 OK` HTTP response code and `Content-Type` header of "application/json", TaskRouter will not process the Assignment Instruction response and will initiate a new webhook to FallbackAssignmentCallbackUrl.**

#### Manually accepting or rejecting a reservation \[#manual-accept]

When TaskRouter reserves a Worker to handle a Task, it's common that your application may need to take some asynchronous action before accepting or rejecting the assignment. For example, you may need to prompt a user to confirm they are able to process the Task, modify a database or CRM record, or perform some other action.

If this is the model your application needs to use, respond to the Assignment Callback with a `200 OK` HTTP response code. You can then take whatever action is required when your application receives the Assignment Callback HTTP request, and then accept or reject the reservation by posting `ReservationStatus=accepted` or `ReservationStatus=rejected` to the Reservation resource provided in the Assignment Callback parameters sent to your application. [See Task Reservation subresource for more details.][reservations]

#### Immediately accepting a reservation \[#immediate-accept]

If you want your application to immediately accept TaskRouter's Worker selection and perform no further actions, you can reply with the following:

```json
{
  "instruction": "accept"
}
```

This will consider the Task "accepted" by the worker. This indicates TaskRouter has completed processing and will perform no further operations for this particular Task.

### Immediately rejecting a reservation \[#immediate-reject]

Like `"instruction":"accept"`, `"instruction":"reject"` updates the reservation, causing the task to be rejected and placed back into the queue. The reserved worker's state is updated to the activity provided in the `activity_sid` parameter. We recommend to set this activity to an "unavailable" activity, to avoid having the Task immediately reassigned to the worker.

| Property      | Required? | Description                                                                                                                        |
| ------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| instruction   | Yes       | Set to "reject" for this operation.                                                                                                |
| activity\_sid | Yes       | The ActivitySid you would like to set for the Reserved Worker. If no ActivitySid is provided, worker remains in the same activity. |

An example "reject" JSON response:

```json
{
  "instruction": "reject",
  "activity_sid": "WA12345678"
}
```

### Dequeue a call from a TwiML queue \[#dequeue-call]

Use the `"instruction":"dequeue"` response [in combination with the Enqueue and Dial TwiML Voice verbs][twiml-integration]. When using the Enqueue verb, a Task is created and the voice call is put on hold. On assignment, if a dequeue instruction is returned, the Task Router will make an outgoing call to the phone number passed. When the call is answered, the Task will be removed from hold and it will be bridged to the agent.

#### Linked Call Tracking \[#dequeue-linked-call-tracking]

Upon issuing a Dequeue Instruction, TaskRouter will update the TaskAttributes of the Task with a `worker_call_sid` to denote the CallSid that is being created for the outgoing call to a given worker.

The TaskAttributes of the Task will then contain both the `call_sid` and `worker_call_sid`. Any event thereafter relating to the Task, such as `task.completed`, will have this information as well.

If you need Linked Call Tracking, consider listening to or querying for `task.completed` [events][events] that will have this information.

**Notice: The 'dequeue' assignment instruction will only work with Tasks created via the Enqueue verb. [Read more about TaskRouter and TwiML integration here.][twiml-integration]**

| Property                  | Required? | Description                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| instruction               | Yes       | Set to "dequeue" for this operation.                                                                                                                                                                                                                                                                                                                                                                               |
| to                        | No        | The contact URI of the Worker. A phone number or client ID. Required if the worker's attributes do not include a `contact_uri` property.                                                                                                                                                                                                                                                                           |
| from                      | No        | The caller ID for the call to the worker. This needs to be a Twilio number or a [verified outgoing caller ID](/docs/voice/api/outgoing-caller-ids) from your account. If `from` is missing and the Task was created using the [Enqueue verb][enqueue], then we will use the `to` number dialed by the caller as the `from` number when executing the Dequeue instruction.                                          |
| post\_work\_activity\_sid | No        | The activity sid to move the worker to after the call ends.                                                                                                                                                                                                                                                                                                                                                        |
| record                    | No        | Lets you record both legs of a call. Set to `record-from-answer` to record the call from answer. By default, this is set to `do-not-record` which will not record the call. The RecordingUrl will be sent with status\_callback\_url.                                                                                                                                                                              |
| timeout                   | No        | The integer number of seconds that Twilio should allow the phone associated with `contact_uri` to ring before assuming there is no answer. Default is 60 seconds, the maximum is 999 seconds. For SIP calls, the maximum is 600 seconds. Note, you could set this to a low value, such as 15, to hangup before reaching an answering machine or voicemail.                                                         |
| status\_callback\_url     | No        | A URL that Twilio will send asynchronous webhook `GET` requests on **completed** call events. \*\*Note: TaskRouter sends "taskCallSid" as parameter with sid of the call that created the Task. This is very useful in the event a call to worker fails, where you could remove the original call from queue and send to voice mail or enqueue again with new workflow to route to different group of workers.     |
| status\_callback\_events  | No        | TaskRouter generates webhook event to status\_callback\_url when worker's call completes. To receive webhooks on either "initiated", "ringing" and "answered" call progress events use this attribute and provide comma separated list of events. For example, "status\_callback\_events=answered,completed" will generate webhook events when the worker answers the call and when call disconnects respectively. |

Example "dequeue" JSON response:

```json
{
  "instruction": "dequeue",
  "to": "+14151112222",
  "from": "+18001231234",
  "post_work_activity_sid": "WA0123456789abcdef0123456789abcdef"
}
```

If a 'to' property is not specified, Twilio will dequeue the call to the worker's `contact_uri` attribute. If both are provided, the "to" property in the assignment instruction will take precedence over the worker's `contact_uri` attribute.

An example of a "dequeue" assignment instruction that utilizes a worker's `contact_uri` attribute:

```json
{
  "instruction": "dequeue",
  "from": "+18001231234",
  "post_work_activity_sid": "WA0123456789abcdef0123456789abcdef"
}
```

Worker Attributes:

```json
{
  "contact_uri":"+14151112222"
}
```

Note: If you're utilizing SIP, your Worker Attributes would look like the following:

```json
{
  "contact_uri":"sip:someone@somedomain.com"
}
```

### Initiating a phone call \[#initiating-call]

The `"instruction":"call"` response initiates an outgoing voice call from Twilio in response to a Task assignment. This is useful if the Task represents a request for a callback from someone on your team, or some work item that should result in an outbound call. You can set the 'accept' parameter to 'true' to mark the Reservation as 'accepted' when initiating the call. If you set it to 'false' to leave the Reservation in a pending state, you will need to manually accept or reject the reservation at some later point.

The `"instruction":"call"` can be used in scenarios where a custom message needs to be played to agents receiving the call before connecting them to customers.

Upon issuing a Call Instruction, TaskRouter will update the TaskAttributes of the Task with a `worker_call_sid` to denote the CallSid that is being created for the outgoing call to a given worker.

An `"instruction":"call"` JSON response may include the following parameters:

| Property              | Required? | Description                                                                                                                                                                                                                                                                                                     |
| --------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instruction           | Yes       | Set to "call" for this operation.                                                                                                                                                                                                                                                                               |
| to                    | No        | The contact URI of the Worker. A phone number or client ID. Required if the worker's attributes do not include a `contact_uri` property.                                                                                                                                                                        |
| from                  | Yes       | The caller ID to use when placing the outbound call.                                                                                                                                                                                                                                                            |
| url                   | Yes       | A valid TwiML URI that is executed on the answering Worker's leg.                                                                                                                                                                                                                                               |
| accept                | No        | If set to "true", the reservation will be accepted (just like the accept instruction), otherwise, it is your application's responsibility to accept or reject the task at a later point. Defaults to false.                                                                                                     |
| record                | No        | The 'record' attribute lets you record both legs of a call. Set to "record-from-answer" to record the call from answer. Default to "do-not-record" which will not record the call. The RecordingUrl will be sent with status\_callback\_url.                                                                    |
| timeout               | No        | The integer number of seconds that Twilio should allow the phone associated with `contact_uri` to ring before assuming there is no answer. Default is 60 seconds, the maximum is 999 seconds. Note, you could set this to a low value, such as 15, to hangup before reaching an answering machine or voicemail. |
| status\_callback\_url | No        | A valid status callback URL.                                                                                                                                                                                                                                                                                    |

An example "call" JSON response:

```json
{
  "instruction": "call",
  "to": "joey",
  "from": "+15558675309",
  "url": "http://example.com/agent_answer",
  "status_callback_url":
    "http://example.com/agent_answer_status_callback"
}
```

This example would initiate an outgoing call from Twilio to the Twilio Voice SDK identity `client:joey`, using `+15558675309` as the caller ID. When the agent answers, Twilio would execute TwiML returned from `http://example.com/agent_answer`. Once the agent call is complete, Twilio would make a final HTTP request to `http://example.com/agent_answer_status_callback`.

If a 'to' property is not specified, Twilio will initiate an outgoing call to the worker's `contact_uri` attribute. If both are provided, the "to" property in the assignment instruction will take precedence over the worker's `contact_uri` attribute.

An example of a "call" assignment instruction that utilizes a worker's `contact_uri` attribute:

```json
{
  "instruction": "call",
  "from": "+15558675309",
  "url": "http://example.com/agent_answer",
  "status_callback_url":
    "http://example.com/agent_answer_status_callback"
}
```

Worker Attributes:

```json
{
  "contact_uri":"client:joey"
}
```

Use `"instruction":"call"` response [in combination with the Enqueue and Dial TwiML Voice verbs][twiml-integration] for any case that custom TwiML is required on the Worker call's end before being bridged.
If the Task was Enqueued using the Enqueue TwiML verb, the above `http://example.com/agent_answer` TwiML callback could look like the following:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="woman">You are now connecting with a customer</Say>
    <Dial record="true">
        <Queue reservationSid="YourReservationSid"/>
    </Dial>
</Response>
```

This will generate a message to be played to the Worker, and then Dequeue the Call to bridge to the worker and record the call.

### Redirect a call to a new TwiML document \[#redirecting-call]

The `"instruction":"redirect"` accepts the posted reservation and redirects the provided live call (identified by its callSid) to a new TwiML URL. This is useful for directing the Task's call to a new IVR, conference, or some other TwiML scenario where directly bridging to the worker is not desirable.
Use `"instruction":"redirect"` response [in combination with the Enqueue and Dial TwiML Voice verbs][twiml-integration] for any case that custom TwiML is required on the Task call's end.

| Property    | Required? | Description                                                                                                                                                              |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| instruction | Yes       | Set to "redirect" for this operation.                                                                                                                                    |
| call\_sid   | Yes       | The Twilio call sid of the call which was parked in the queue(via enqueue for example).                                                                                  |
| url         | Yes       | A valid TwiML URI to redirect the call to.                                                                                                                               |
| accept      | No        | Boolean. If true, the reservation will be accepted, otherwise, it is your application's responsibility to accept or reject the task at a later point. Defaults to false. |

An example 'redirect' JSON response

```json
{
  "instruction": "redirect",
  "call_sid": "CA123456789",
  "url": "http://example.com/assignment_redirect",
}
```

The example response above accepts the reservation and redirects the call with CallSid CA12346789 using the TwiML document retrieved from `http://example.com/assignment_redirect`, which could Dial a Twilio Voice SDK device:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Client>joey</Client>
    </Dial>
</Response>
```

This could also dial into a new conference based on the ReservationSid in which you could bridge a Worker or several Workers (for example: in an escalation scenario):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="woman">Thank you for your patience. You are now connecting with an agent</Say>
    <Dial>
        <Conference endConferenceOnExit="true">YourReservationSid</Conference>
    </Dial>
</Response>
```

### Another scenario to use redirect

Using the call instruction it was possible to provide a custom message to an agent before the call is being bridged. However if we want the same experience to be available to the customer i.e. play some custom message to the customer before bridging the call with an agent, we could use `"instruction":"redirect"`.

The basic flow would be as follows:

1. Dial the worker in a Conference name by the ReservationSid. This can be done on assignment call back.
2. Utilize Redirect Assignment Instruction to transfer the customer from a Queue to a Conference named by the ReservationSid.

[twiml-integration]: /docs/taskrouter/twiml-queue-calls

[reservations]: /docs/taskrouter/api/reservations

[enqueue]: /docs/voice/twiml/enqueue

[events]: /docs/taskrouter/api/event
