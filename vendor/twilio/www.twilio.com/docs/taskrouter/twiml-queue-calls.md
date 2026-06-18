# Queueing Twilio calls with TaskRouter

## Introduction

**Want to use TaskRouter and TwiML to implement call routing? [Try the TaskRouter Quickstart for an easy introduction][quickstart].**

Twilio's programmable voice `<Queue>` noun provides a simple mechanism to park calls on hold and place them in a named First-In, First-Out queue. By combining `<Queue>` with TaskRouter, `<Queue>` can be extended with richer routing models. Additionally, TaskRouter's agent availability model and Task reservation/acceptance flow can automatically push relevant work to agents as they become available.

## How it works

**Not familiar with TwiML voice applications? [Take a moment to check out Twilio's TwiML API here.][twiml-intro]**

### Call Queue Default Limits

Voice tasks or calls are limited to `100` by default per queue.

#### Update the Call Queue Limit for Flex

To find the call queue that corresponds with your **Flex Task Assignment** workflow, [list your account's queue resources](https://www.twilio.com/console/api-explorer/voice/queues/read) filtered by `FriendlyName`, or your workflow Sid (prefixed by `WW`). For example:

```bash
curl 'https://api.twilio.com/2010-04-01/Accounts/ACxxx/Queues.json' -X GET \
--data-urlencode 'FriendlyName=WWyyy' \
-u ACxxx:[AuthToken]
```

Using a Queue Sid (prefixed by `QU`) from the [Programmable Voice API](/docs/voice) response, you can change the maximum number of calls for ***that*** queue by [updating the queue resource](https://www.twilio.com/console/api-explorer/voice/queues/update) and specifying a different `MaxSize`. For example:

```bash
curl 'https://api.twilio.com/2010-04-01/Accounts/ACxxx/Queues/QUzzz.json' -X POST \
--data-urlencode 'FriendlyName=WWyyy' \
--data-urlencode 'MaxSize=200' \
-u ACxxx:[AuthToken]
```

### Basic Call Flow

Using TaskRouter with TwiML calls follows the basic flow:

1. An incoming or outgoing Twilio voice phone call generates a webhook to your application server.
2. Your application server generates a TwiML document containing `<Enqueue>` with attributes indicating which TaskRouter WorkflowSid should control call routing, and any Task attributes you would like to attach to the call.
3. The call itself is placed on hold. TaskRouter executes a Workflow to find an eligible Worker to handle the call.
4. If the caller hangs up before being assigned to a worker, the Task is automatically canceled.
5. When a Worker is identified to handle the call, TaskRouter reserves the Worker and generates a webhook to your application.
6. [Your application responds][handling-assignment-callbacks] specifying how the call should be bridged to the selected Worker, and optionally specifies the Activity to assign to the Worker once they have finished handling the call (for example "Wrapping up").
7. Once the call is bridged to the Worker, the Task is marked as 'accepted'.
8. When the call disconnects, the Worker is transitioned to the activity specified by your assignment instruction response.

### Using `<Enqueue>` to route calls with TaskRouter

Below are some example TwiML documents that take advantage of TaskRouter for automatic call distribution.

#### Example #1: Simple TaskRouter Enqueue

To use Enqueue with TaskRouter, specify WorkflowSid when you generate the `<Enqueue>` statement in your TwiML document. Omit the named queue in the element body. The following example TwiML document will create a task in the provided Workflow and then put the caller into the default hold music:

[twiml-intro]: /docs/voice/twiml

[quickstart]: /docs/taskrouter/quickstart

Simple TaskRouter Enqueue

```js
// Download the Node helper library from twilio.com/docs/node/install
// These consts are your accountSid and authToken from https://www.twilio.com/console
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const express = require('express');
const app = express();

app.post('/enqueue_call', (request, response) => {
  const resp = new VoiceResponse();
  resp.enqueue({ workflowSid: 'WW0123456789abcdef0123456789abcdef' });

  response.setHeader('Content-Type', 'application/xml');
  response.write(resp.toString());
  response.end();
});

app.listen(8080);
```

```py
# Download the Python helper library from twilio.com/docs/python/install
from flask import Flask
from twilio.twiml.voice_response import VoiceResponse

app = Flask(__name__)


@app.route("/enqueue_call", methods=['GET', 'POST'])
def enqueue_call():
    resp = VoiceResponse()
    resp.enqueue(None, workflowSid="WW0123456789abcdef0123456789abcdef")

    return str(resp)
```

```cs
// Download the twilio-csharp library from
// https://www.twilio.com/docs/libraries/csharp#installation
using System;
using System.Net;
using Twilio.TwiML;

class Example
{
    public static HttpListenerResponse SendResponse(HttpListenerContext ctx)
    {
        HttpListenerRequest request = ctx.Request;
        HttpListenerResponse response = ctx.Response;

        response.StatusCode = (int)HttpStatusCode.OK;
        response.ContentType = "text/xml";

        var twiml = new VoiceResponse();
        twiml.Enqueue ("Sales", workflowSid: "WW0123456789abcdef0123456789abcdef");
        response.StatusDescription = twiml.ToString();
        return response;
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.twilio.twiml.voice.Enqueue;
import com.twilio.twiml.TwiMLException;
import com.twilio.twiml.VoiceResponse;


public class Example extends HttpServlet {

  @Override
  public void service(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Enqueue enqueue =
        new Enqueue.Builder().workflowSid("WW0123456789abcdef0123456789abcdef").build();

    VoiceResponse twiml = new VoiceResponse.Builder().enqueue(enqueue).build();

    response.setContentType("application/xml");
    try {
      response.getWriter().print(twiml.toXml());
    } catch (TwiMLException e) {
      e.printStackTrace();
    }
  }
}
```

```php
<?php
// Download the library and copy into the folder containing this file.
require_once '/path/to/vendor/autoload.php'; // Loads the library

use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$response->enqueue(null, ['workflowSid' => 'WW0123456789abcdef0123456789abcdef']);
print $response;
?>

<!-- alternatively -->

<?php
$workflowSid = "WW0123456789abcdef0123456789abcdef";

header('Content-Type: application/xml');
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
?>
<Response>
    <Enqueue workflowSid="<?php echo $workflowSid ?>"/>
</Response>
```

```rb
# Get twilio-ruby from twilio.com/docs/ruby/install
require 'twilio-ruby'
require 'sinatra'

set :port, 8080

post '/enqueue_call' do
  Twilio::TwiML::Response.new do |r|
    r.Enqueue workflowSid: 'WW0123456789abcdef0123456789abcdef'
  end.text
end
```

A task will be created in this Workflow with the call's standard parameters as attributes (call\_sid, account\_sid, to, from, etc).

#### Example #2: Attaching data to a call using Task

You may optionally also include a `<Task>` noun element to add additional attributes to the Task. `<Task>` must contain a valid JSON object as its body for the attributes of the Task. For example:

Attaching data to a call using Task

```js
// Download the Node helper library from twilio.com/docs/node/install
// These consts are your accountSid and authToken from https://www.twilio.com/console
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const express = require('express');
const app = express();

app.post('/enqueue_call', (request, response) => {
  const resp = new VoiceResponse();

  const json = { account_number: '12345abcdef' };

  resp.enqueue('Friendly Name').task({}, JSON.stringify(json));

  response.setHeader('Content-Type', 'application/xml');
  response.write(resp.toString());
  response.end();
});

app.listen(8080);
```

```py
# Download the Python helper library from twilio.com/docs/python/install
from flask import Flask
from twilio.twiml.voice_response import VoiceResponse, Enqueue

app = Flask(__name__)


@app.route("/enqueue_call", methods=['GET', 'POST'])
def enqueue_call():

    workflow_sid = 'WW0123456789abcdef0123456789abcdef'

    resp = VoiceResponse()

    e = Enqueue(None, workflowSid=workflow_sid)
    e.task('{"account_number":"12345abcdef"}')

    resp.append(e)

    return str(resp)
```

```cs
// Download the twilio-csharp library from
// https://www.twilio.com/docs/libraries/csharp#installation
using System;
using System.Net;
using Twilio.TwiML;
using Twilio.TwiML.Voice;

class Example
{
    public static void SendResponse(HttpListenerContext ctx)
    {
        HttpListenerRequest request = ctx.Request;
        HttpListenerResponse response = ctx.Response;

        response.StatusCode = (int)HttpStatusCode.OK;
        response.ContentType = "text/xml";

        // Generate TwiML
        var twiml = new VoiceResponse();
        var enqueue = new Enqueue(workflowSid: "WW0123456789abcdef0123456789abcdef");
        enqueue.Task("{\"account_number\": \"12345abcdef\"}");
        twiml.Append(enqueue);

        // Write the output and close the stream
        byte[] buffer = Encoding.UTF8.GetBytes(twiml.ToString());
        response.ContentLength64 = buffer.Length;
        response.OutputStream.Write(buffer,0, buffer.Length);
        response.OutputStream.Close();
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.twilio.twiml.voice.Enqueue;
import com.twilio.twiml.voice.Task;
import com.twilio.twiml.TwiMLException;
import com.twilio.twiml.VoiceResponse;


public class Example extends HttpServlet {

  @Override
  public void service(HttpServletRequest request, HttpServletResponse response) throws IOException {

    Task task = new Task.Builder("{\"account_number\":\"12345abcdef\"}").build();

    Enqueue enqueue =
        new Enqueue.Builder()
        .task(task).workflowSid("WW0123456789abcdef0123456789abcdef").build();

    VoiceResponse twiml = new VoiceResponse.Builder().enqueue(enqueue).build();

    response.setContentType("application/xml");
    try {
      response.getWriter().print(twiml.toXml());
    } catch (TwiMLException e) {
      e.printStackTrace();
    }
  }
}
```

```php
<?php
// Download the library and copy into the folder containing this file.
require_once '/path/to/vendor/autoload.php'; // Loads the library

use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$response->enqueue(null, ["workflowSid" => "WW0123456789abcdef0123456789abcdef"])
    ->task("{'account_number':'12345abcdef'}");
print $response;
?>

<!-- alternatively -->

<?php
$workflowSid = "WW0123456789abcdef0123456789abcdef";

header('Content-Type: application/xml');
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";

?>
<Response>
    <Enqueue workflowSid="<?php echo $workflowSid ?>">
        <Task>{"account_number": "12345abcdef"}</Task>
    </Enqueue>
</Response>
```

```rb
# Get twilio-ruby from twilio.com/docs/ruby/install
require 'twilio-ruby'
require 'sinatra'

set :port, 8080

post '/enqueue_call' do

  attributes = '{"account_number": "12345abcdef"}'

  Twilio::TwiML::VoiceResponse.new do |response|
    response.enqueue(workflowSid: 'WW0123456789abcdef0123456789abcdef') do |e|
      e.task(attributes)
    end
  end.to_s
end
```

#### Example #3: Attaching priority and timeout to a call using Task

You may optionally provide priority and/or timeout for a Task. This example provides a dynamic priority and timeout to a task as a property of the `<Task>` noun element. Priority and Timeout both must be valid integers. For example:

Attaching priority and timeout to a call using Task

```js
// Download the Node helper library from twilio.com/docs/node/install
// These consts are your accountSid and authToken from https://www.twilio.com/console
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const express = require('express');
const app = express();

app.post('/enqueue_call', (request, response) => {
  const resp = new VoiceResponse();

  const json = { account_number: '12345abcdef' };

  resp
    .enqueue({
      workflowSid: 'WW0123456789abcdef0123456789abcdef',
    })
    .task(
      {
        priority: '5',
        timeout: '200',
      },
      JSON.stringify(json)
    );

  response.setHeader('Content-Type', 'application/xml');
  response.write(resp.toString());
  response.end();
});

app.listen(8080);
```

```py
# Download the Python helper library from twilio.com/docs/python/install
from flask import Flask
from twilio.twiml.voice_response import VoiceResponse

app = Flask(__name__)


@app.route("/enqueue_call", methods=['GET', 'POST'])
def enqueue_call():
    # workflow_sid = 'WW0123456789abcdef0123456789abcdef'

    resp = VoiceResponse()
    # TODO waiting for https://github.com/twilio/twilio-python/issues/283

    # with resp.enqueue(None, workflowSid=workflow_sid) as e:
    # e.task('{"account_number":"12345abcdef"}', priority = 5, timeout = 200)

    return str(resp)
```

```cs
// Download the twilio-csharp library from
// https://www.twilio.com/docs/libraries/csharp#installation
using System;
using System.Net;
using Twilio.TwiML;
using Twilio.Rest.Taskrouter.V1.Workspace;

class Example
{
    public static HttpListenerResponse SendResponse(HttpListenerContext ctx)
    {
        HttpListenerRequest request = ctx.Request;
        HttpListenerResponse response = ctx.Response;

        response.StatusCode = (int)HttpStatusCode.OK;
        response.ContentType = "text/xml";

        var twiml = new VoiceResponse();

        var task = TaskResource.Create("WS0123456789abcdef0123456789abcdef"
            workflowSid: "WW0123456789abcdef0123456789abcdef",
            attributes: "{\"account_number\":\"12345abcdef\"}", priority: "5",
            timeout: "200");

        // alternatively
        twiml.Enqueue(
            "{\"account_number\":\"12345abcdef\"}",
            workflowSid: "WW0123456789abcdef0123456789abcdef");

        response.StatusDescription = twiml.ToString();
        return response;
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.twilio.twiml.voice.Enqueue;
import com.twilio.twiml.Task;
import com.twilio.twiml.TwiMLException;
import com.twilio.twiml.VoiceResponse;


public class Example extends HttpServlet {

  @Override
  public void service(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Task task = new Task.Builder()
        .data("{\"account_number\":\"12345abcdef\"}")
        .priority(5)
        .timeout(200)
        .build();

    Enqueue enqueue =
        new Enqueue.Builder().task(task)
        .workflowSid("WW0123456789abcdef0123456789abcdef").build();

    VoiceResponse twiml = new VoiceResponse.Builder().enqueue(enqueue).build();

    response.setContentType("application/xml");
    try {
      response.getWriter().print(twiml.toXml());
    } catch (TwiMLException e) {
      e.printStackTrace();
    }
  }
}
```

```php
<?php
// Download the library and copy into the folder containing this file.
require_once '/path/to/vendor/autoload.php'; // Loads the library

use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$response->enqueue(null, ['workflowSid' => 'WW0123456789abcdef0123456789abcdef'])
    ->task(
        "{'account_number':'12345abcdef'}",
        ['priority' => 5, 'timeout' => 200]
    );

print $response;
?>

<!-- alternatively -->

<?php
$workflowSid = "WW0123456789abcdef0123456789abcdef";

header('Content-Type: application/xml');
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";

?>
<Response>
    <Enqueue workflowSid="<?php echo $workflowSid ?>">
        <Task priority="5" , timeout="200">{"account_number": "12345abcdef"}</Task>
    </Enqueue>
</Response>
```

```rb
# Get twilio-ruby from twilio.com/docs/ruby/install
require 'twilio-ruby'
require 'sinatra'

set :port, 8080

post '/enqueue_call' do
  attributes = '{"account_number":"12345abcdef"}'

  Twilio::TwiML::Response.new do |r|
    r.Enqueue workflowSid: 'WW0123456789abcdef0123456789abcdef' do |e|
      e.Task attributes, priority: 5, timeout: 200
    end
  end.text
end
```

#### Example #4: Specifying custom hold music and post-call treatment

This example uses the `waitUrl` property to provide custom hold music to the caller, and the `action` property to specify a post-call survey application that will be executed after the Worker and caller disconnect from one another.
[More information about the action property can be found here.][enqueue-docs]

[enqueue-docs]: /docs/voice/twiml/enqueue#attributes-action

Specifying custom hold music and post-call treatment

```js
// Download the Node helper library from twilio.com/docs/node/install
// These consts are your accountSid and authToken from https://www.twilio.com/console
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const express = require('express');
const app = express();

app.post('/enqueue_call', (request, response) => {
  const resp = new VoiceResponse();

  const json = { account_number: '12345abcdef' };

  resp
    .enqueue({
      workflowSid: 'WW0123456789abcdef0123456789abcdef',
      waitUrl: '/hold_music.php',
      action: '/post_bridge_survey.php',
    })
    .task({}, JSON.stringify(json));

  response.setHeader('Content-Type', 'application/xml');
  response.write(resp.toString());
  response.end();
});

app.listen(8080);
```

```py
# Download the Python helper library from twilio.com/docs/python/install
from flask import Flask
from twilio.twiml.voice_response import VoiceResponse

app = Flask(__name__)


@app.route("/enqueue_call", methods=['GET', 'POST'])
def enqueue_call():
    # workflow_sid = 'WW0123456789abcdef0123456789abcdef'

    resp = VoiceResponse()
    # TODO waiting for https://github.com/twilio/twilio-python/issues/283

    # with resp.enqueue(None, workflowSid=workflow_sid,
    # waitUrl="/hold_music.php", action="/post_bridge_survey.php") as e:
    # e.task('{"account_number":"12345abcdef"}')

    return str(resp)
```

```cs
// Download the twilio-csharp library from
// https://www.twilio.com/docs/libraries/csharp#installation
using System;
using System.Net;
using Twilio.TwiML;
using Twilio.Rest.Taskrouter.V1.Workspace;

class Example
{
    public static HttpListenerResponse SendResponse(HttpListenerContext ctx)
    {
        HttpListenerRequest request = ctx.Request;
        HttpListenerResponse response = ctx.Response;

        response.StatusCode = (int)HttpStatusCode.OK;
        response.ContentType = "text/xml";

        var twiml = new VoiceResponse();

        twiml.Enqueue("{\"account_number\":\"12345abcdef\"}",
            "/post_bridge_survey", waitUrl: "/hold_music",
            workflowSid: "WW0123456789abcdef0123456789abcdef");

        response.StatusDescription = twiml.ToString();
        return response;
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.twilio.twiml.voice.Enqueue;
import com.twilio.twiml.Task;
import com.twilio.twiml.TwiMLException;
import com.twilio.twiml.VoiceResponse;


public class Example extends HttpServlet {

  @Override
  public void service(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Task task = new Task.Builder()
        .data("{\"account_number\":\"12345abcdef\"}")
        .build();

    Enqueue enqueue = new Enqueue.Builder()
        .task(task)
        .workflowSid("WW0123456789abcdef0123456789abcdef")
        .waitUrl("/hold_music.php")
        .action("/post_bridge_survey.php")
        .build();

    VoiceResponse twiml = new VoiceResponse.Builder().enqueue(enqueue).build();

    response.setContentType("application/xml");
    try {
      response.getWriter().print(twiml.toXml());
    } catch (TwiMLException e) {
      e.printStackTrace();
    }
  }
}
```

```php
<?php
// Download the library and copy into the folder containing this file.
require_once '/path/to/vendor/autoload.php'; // Loads the library

use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$response->enqueue(
    null,
    ['workflowSid' => 'WW0123456789abcdef0123456789abcdef',
        'waitUrl' => '/hold_music.php',
        'action' => '/post_bridge_survey.php']
)->task("{'account_number':'12345abcdef'}");

print $response;
?>

<!-- alternatively -->

<?php
$workflowSid = "WW0123456789abcdef0123456789abcdef";

header('Content-Type: application/xml');
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
?>
<Response>
    <Enqueue workflowSid="<?php echo $workflowSid ?>" , waitUrl="/hold_music.php" ,
             action="/post_bridge_survey.php">
        <Task>{"account_number": "12345abcdef"}</Task>
    </Enqueue>
</Response>
```

```rb
# Get twilio-ruby from twilio.com/docs/ruby/install
require 'twilio-ruby'
require 'sinatra'

set :port, 8080

post '/enqueue_call' do
  attributes = '{"account_number":"12345abcdef"}'
  workflow_sid = 'WW0123456789abcdef0123456789abcdef'
  wait_url = '/hold_music.php'
  action = '/post_bridge_survey.php'
  Twilio::TwiML::Response.new do |r|
    r.Enqueue workflow_sid: workflow_sid,
              wait_url: wait_url,
              action: action do |e|
      e.Task attributes
    end
  end.text
end
```

Note: `TaskAttributes` is legacy as of 8/15/15, but is still supported as a verb instead of `Task`.

### Handling TaskRouter's Assignment Callback for voice calls: Bridging a call to a Worker

Once a Worker has been reserved to handle a call, your application will receive an HTTP request at the AssignmentCallbackURL specified by the WorkflowSid you used in the `<Enqueue>` statement. Your application can respond with one of the following examples to control how the call is actually bridged to the Worker. [Read about other options for handling the Assignment Callback here.][handling-assignment-callbacks]

### Automatically bridging call to Worker

The 'dequeue' instruction removes the call from hold and bridges it to the selected Worker. To use the 'dequeue' instruction, your application should reply to the Assignment Callback request with a JSON document containing the following fields:

```json
{
  "instruction": "dequeue",
  "to": "{the Worker's phone number, sip uri, or client uri. Required.}",
  "from": "{the caller ID that you want to send to the Worker. Required.}",
  "post_work_activity_sid": "{the ActivitySid that should be assigned to the Worker after the call ends. Optional.}"
}
```

More about these fields:

* `instruction` specifies the assignment activity to perform. Use 'dequeue' to dequeue a call to a Worker. For a full list of assignment instructions, [read about handling assignment callbacks here.][handling-assignment-callbacks]
* `to` specifies the Worker recipient's phone number.
* `from` specifies the caller ID that should be sent when extending the call to the Worker.
* `post_work_activity_sid` specifies the ActivitySid that you want to assign to the Worker after the call completes. Use this to transition your worker to a status that makes sense for their after-call, work for example "Wrapping up".

#### Linked Call Tracking

Upon issuing a Dequeue Instruction, TaskRouter will update the TaskAttributes of the Task with a `worker_call_sid` to denote the CallSid that is being created for the outgoing call to a given worker.

The TaskAttributes of the Task will then contain both the `call_sid` and `worker_call_sid`. Any event thereafter relating to the Task, such as `task.completed`, will have this information as well.

If you need Linked Call Tracking, consider listening to or querying for `task.completed` [events][events] that will have this information.

#### Bridging call after executing additional application logic

Sometimes you may want your application to perform additional actions before bridging the call to the selected Worker. TaskRouter and TwiML have a few additional points of integration that make this possible. Here's how it typically works:

1. Your application `<Enqueue>`s a call using TwiML, as described above. TaskRouter will reserve a Worker to handle the call and make an AssignmentCallback HTTP request to your application.
2. Your application should respond to the request with an HTTP 200 response and an empty body. This tells TaskRouter you are processing the request, but not yet ready to accept the Reservation.
3. Your application uses information from the AssignmentCallback request to perform some action, such as updating a CRM record.
4. If the action you performed fails, or if the result is not your desired behavior, your application should tell TaskRouter to reject the Reservation.
5. Once your application receives confirmation that the CRM update is complete, it makes a `POST` request to Twilio's `/Calls` REST API to place a call to the Worker's phone.
6. When the Worker answers the call, Twilio makes an HTTP request to your application. Your application returns a TwiML document that `<Dial>`s `<Queue>` with the Tasks' `reservationSid`. For example:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Queue reservationSid="WR0123456789abcdef0123456789abcdef"/>
  </Dial>
</Response>
```

Upon execution of this TwiML document, the Worker and the call will be bridged, and the pending Reservation will be marked as 'accepted'.

**Note: If you plan to execute additional logic before bridging the waiting call with the Worker, make sure you set an appropriately high Task Reservation Timeout on your Workflow. The default is 120 seconds, which should be sufficient for most operations.**

#### Providing additional parameters when `<Dial>`ing a ReservationSid

This example will accept the reservation and bridge to the task's call as in the previous example. When the call completes, the worker will be moved to the provided activity state ("wrapping up" for example).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Queue
      reservationSid="WR0123456789abcdef0123456789abcdef"
      postWorkActivitySid="WA0123456789abcdef0123456789abcdef"/>
  </Dial>
</Response>
```

## Important Restrictions and Considerations

When combining TwiML and TaskRouter, there are a few important behaviors that you should know about.

### TwiML will manage updates to associated TaskRouter Tasks

When using `<Enqueue>` and `<Dial><Queue reservationSid="..."></Dial>` to create and manage Tasks, Twilio will keep the Task's lifecycle updated. For example, if the call disconnects before being answered by a Worker, TaskRouter will cancel the associated Task. Because of this linking, we recommend you do not modify the state of a Task that is linked to a waiting Twilio call.

Using the TaskRouter REST API to modify a Task's attributes can interfere with Twilio's ability to manage the Task's lifecycle. Additionally, Dial->Queue is responsible for accepting the reservation provided. If the reservation has been accepted already, either via the TaskRouter REST API or via an assignment instruction, the dequeue attempt will fail with an error.

### Task attributes linking Tasks to calls

Each Task generated from TwiML contains a "call\_sid" attribute, as well as the other standard Twilio call attributes ("to", "from", etc.).

Here is the full list of attributes,

```json
{
  "from_country": "",
  "called": "",
  "to_country": "",
  "to_city": "",
  "to_state": "",
  "caller_country": "",
  "call_status" : "",
  "call_sid" : "",
  "account_sid" : "",
  "from_zip" : "",
  "from" : "",
  "direction" : "",
  "called_zip" : "",
  "caller_state" : "",
  "to_zip" : "",
  "called_country" : "",
  "from_city" : "",
  "called_city" : "",
  "caller_zip" : "",
  "api_version" : "",
  "called_state" : "",
  "from_state" : "",
  "caller" : "",
  "caller_city" : "",
  "to" : ""
}
```

### Modifications to the Twilio Queues list

When you use TaskRouter with `<Enqueue>`, TaskRouter will dynamically create voice Queues to hold your Tasks, using the provided WorkflowSid as a friendly name. These queues are used internally by the TaskRouter system to park the calls on hold. Modifying these queues or their members using the REST API may lead to unpredictable or undesirable results which prevent calls from being properly bridged.

[handling-assignment-callbacks]: /docs/taskrouter/handle-assignment-callbacks

[events]: /docs/taskrouter/api/event
