# Creating Tasks and Accepting Reservations: Create a Task using the REST API

Recall the TaskRouter Task lifecycle:

***Task Created** → eligible Worker becomes available → Worker reserved → Reservation accepted → Task assigned to Worker.*

Before we create our first Task, make sure that our Worker Alice is in a non-available Activity state. Bob's Activity state won't matter right now, as we will create a Spanish language Task that he is not eligible to handle.

With your Workspace open in the [TaskRouter web portal](https://console.twilio.com/?frameUrl=%2Fconsole%2Ftaskrouter%2Fworkspaces), click 'Workers' then click to edit Alice and set her Activity to 'Offline'. Your Workers should look like this:

![Workers table showing Alice offline and unavailable, Bob idle and available.](https://docs-resources.prod.twilio.com/3ba14f9728e460d7f53d675e58d76eaf0705bddbe6af7ebab41dfe5737f58221.png)

To simulate reality, we'll create a Task using the REST API rather than the web portal. Create a PHP file called 'create-task.php' and add the code below. Replace the \{} with your Twilio AccountSid, Twilio AuthToken, WorkspaceSid, and WorkflowSid.

```php title="create-task.php"
<?php
// Get the Twilio-PHP library from twilio.com/docs/libraries/php,
// following the instructions to install it with Composer.
require_once "vendor/autoload.php";
use Twilio\Rest\Client;

// put your Twilio API credentials here
// To set up environmental variables, see https://twil.io/secure
$accountSid = getenv('TWILIO_ACCOUNT_SID');
$authToken  = getenv('TWILIO_AUTH_TOKEN');

// Set your WorkspaceSid and WorkflowSid
$workspaceSid = 'WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
$workflowSid = 'WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

// instantiate a new Twilio Rest Client
$client = new Client($accountSid, $authToken);

// create a new task
$task = $client->taskrouter
    ->workspaces($workspaceSid)
    ->tasks
    ->create(array(
      'attributes' => '{"selected_language": "es"}',
      'workflowSid' => $workflowSid,
    ));


// display a confirmation message on the screen
echo "Created a new task";
```

Alternatively, we can also create a Task using the command line utility curl, which should exist on any Mac or Linux workstation. Again, remember to replace the \{} with your matching credentials and Sids, then execute the following command at your terminal:

```shell
curl https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Tasks \
--data-urlencode Attributes='{"selected_language": "es"}' \
-d WorkflowSid={WorkflowSid} \
-u {AccountSid}:{AuthToken}
```

You can find your Twilio AccountSid and AuthToken on the [TaskRouter Getting Started page](https://www.twilio.com/console/taskrouter/getting-started) by clicking 'show API credentials'.

*If you don't have curl, you can run this request using an HTTP test tool like [Insomnia](https://insomnia.rest/) or using the Task creation dialog in the TaskRouter web portal: with your Workspace open, click 'Tasks' then 'Create Task'.*

To see our newly created Task in the TaskRouter web portal, with your Workspace open, click 'Tasks' in the main navigation. Notice that the Task has been added to the "Customer Care Requests - Spanish" Task Queue based on the Attributes we provided in the curl request. The Assignment Status is 'pending' because there is no available Worker that matches the Task Queue:

![Task list showing a pending customer care request in Spanish.](https://docs-resources.prod.twilio.com/6b9390c09467c0025bfe6064d34c368a8e2d350eac7bd6650ba9896b96f568cb.png)

## Make an Eligible Worker Available

Look again at the TaskRouter Task lifecycle:

*Task Created → **eligible Worker becomes available** → Worker reserved → Reservation accepted → Task assigned to Worker.*

The first stage - 'Task Created' - is complete. To trigger an automatic Task Reservation, the next step is to bring en eligible Worker (in this case Alice) online.

With your Workspace open in the TaskRouter web portal, click 'Workers', then click to edit Alice and set her Activity to 'Idle':

![Set Alice to Idle.](https://docs-resources.prod.twilio.com/73a74c230d5cd7aec4bbe5323be029653de41ca641c331f59ec662aca9c50e60.png)

When you hit save, Twilio will create a Reservation between Alice and our Task and you will receive a Webhook request at the Assignment Callback URL that we set up in the previous step. If you're using ngrok, open `http://localhost:4040` in your web browser to see a detailed log of the request that Twilio made to your server, including all the parameters that your server might use to determine whether to accept a Reservation:

![Ngrok request log showing POST to /assignment.php with form parameters including ReservationSid and TaskAttributes.](https://docs-resources.prod.twilio.com/db7ce420c5778649e422ef1833507c4002fc292449d9899bc8ad32c4561e7c3e.png)

We're now one step further along the Task Reservation lifecycle:

*Task Created → eligible Worker becomes available → **Worker reserved** → Reservation accepted → Task assigned to Worker.*

Time to accept the Reservation.

[Next: Accept a Reservation with the REST API »](/docs/taskrouter/quickstart/php/reservations-accept-rest)
