# Integrate the Mindful platform With Flex

This implementation guide will step you through the integration between Flex and Mindful platform. With this integration, you can respect your customers' time and give them control by letting them choose when they'll receive a call. Whether it's two minutes or two hours, your customers will appreciate spending less time waiting on hold.

Mindful offers two types of callback, Customer-First or Agent-First. These callback experience options are selectable per queue. A Customer-First callback calls the customer back first and ensures they are ready for their callback. If they are not ready, Mindful handles disconnects or voicemail and will attempt to contact them again (if configured). If they are ready, the callback will connect the customer to an agent. Agent-First callback calls the agent first, and once connected, the customer is called.

## Background on callbacks

![Flowchart explaining callback process: customer calls, chooses callback, order queued, receives callback.](https://docs-resources.prod.twilio.com/790db4ad23c20cf9187bc332cacb2a33678486d3b7c85cfeb36c3e8e168c2887.png)

When your queues are full and your agents are swamped, new inbound calls are going to have longer hold times. This can lead to abandoned calls, poor customer experience, increased service costs (as you deal with repeat attempts by a customer), and fewer opportunities to help and engage with your customers.

One of the best ways to reduce hold time is to give callers an option to skip it altogether. With Mindful, you can offer customers the option to call them back at a more convenient time. This works great for contact centers that have peaks and valleys in their contact volume; you take the contact volume that arrives during your peak volume time and you handle it when your staff isn't as busy.

> \[!WARNING]
>
> This guide has two primary sections:
>
> 1. Setting up the connection with Mindful
> 2. Demonstrating two example call flows that incorporate callbacks.
>
> The example call flows are a guide, and you should adapt them to fit your desired customer experience. Similarly, the sample code provided is a guide and doesn't incorporate standard techniques like error handling. These should be refined based on your needs before integrating into a live environment.

## Set up connectivity with Mindful

Here is a high-level overview of the connectivity with Mindful:

![VHT Mindful Callback integration with Twilio Flex via SIP and HTTPS.](https://docs-resources.prod.twilio.com/fddcc9bdb1a61808f9018896bf9b193f787978e5952cbcf8bc61c6de6783cf2e.png)

You will need to set up a SIP Domain and SIP Trunk which will be used to transfer calls to Mindful, as well as a dedicated phone number, which will be used for the Callbacks.

Follow these steps to establish connectivity with Mindful:

### Step 1: Provision phone numbers in Twilio

In Twilio Console, go to [Active Phone Numbers](https://twilio.com/console/phone-numbers/incoming).

This solution relies on two phone numbers, one for incoming calls from your customers and one for incoming calls from Mindful. These numbers will route to separate Studio Flows which will be configured later on in this document. Don't forget to update the routing of these phone numbers after you have completed the Studio Flows.

![List of phone numbers with associated workflows and services for Flex integration.](https://docs-resources.prod.twilio.com/0fa9b9d479eb186ab16ba25f23815436c3e1c781d0fffacbbaa9a60ca99a0dce.jpg)

### Step 2: Set up an IP access control list

1. Open the IP Access Control Lists page in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/voice/sip-domains/ip-access-control-lists) or the [legacy Console](https://www.twilio.com/console/voice/sip/ip-acls).
2. Create a new ACL with the following addresses:

`54.165.17.177/32 - VHT SIP Proxy
54.145.183.157/32 - VHT SIP Proxy
54.87.8.161/32 - VHT RTP Proxy
3.223.253.119/32 - VHT RTP Proxy`

![VHT properties with IP address ranges and friendly names for RTP and SIP proxies.](https://docs-resources.prod.twilio.com/76469291beb6fa8a92cd1b6b163246c347b877063bcb0273a4cbd2472bf16e2a.png)

### Step 3: Create a SIP Domain

1. Open the SIP Domains page in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/voice/sip-domains/sip-domains) or the [legacy Console](https://www.twilio.com/console/voice/sip/endpoints).
2. Create a new SIP Domain

**Hint:** Use the IP access control list defined in step 1

![SIP Domain configuration with fields for Friendly Name, SIP URI, and Voice Authentication settings.](https://docs-resources.prod.twilio.com/1a52da8cedb77c3fe199e65f0d766ce3dde9d85c4bdca4c3b3939da34adee056.png)

In this example, incoming calls to this SIP domain route to a Studio flow, which is configured later in this document. You can also use other options, such as a Function that returns TwiML.

### Step 4: Provision a new Call Target

1. In Mindful, go to Call Targets, Add New CT; or click [here](https://callback.mindful.cx/#/call_targets/new).
2. Change the Telephony Type to SIP.
3. For the Call Center Phone Number, enter the phone number which you use for the return calls from Mindful.
4. For Callback CID, enter the Twilio phone numbers callers are calling. This will be used as the caller ID when returning the callback.

![Dial settings with options for telephony type, call center phone number, and custom callback failover.](https://docs-resources.prod.twilio.com/127d4d611f8bddf521f3e8308fbb1d6a3a3d14f0c4f18e14291b43dd24aea652.jpg)

5. Go to the Metadata tab.
6. Add a metadata item called x-user-to-user with the following settings:

![Metadata settings with SIP Header type, max length 60, terminator #, and add or remove options.](https://docs-resources.prod.twilio.com/b33f002bec4d28796cf591bffd130e22e35ae37ea97a40c1631fdeb4eccbd45d.png)

### Step 5: In Mindful, provision a new phone number

1. Go to [Phone Numbers](https://callback.mindful.cx/#/phone_numbers/assigned).
2. Provision a new phone number and assign it to the Call Target configured in step 4.

![Phone number assigned to Twilio Flex with delete option.](https://docs-resources.prod.twilio.com/49bf71e397debb63ab0661683c7587717fbf415bd60306c4070eab38a4c42cb8.jpg)

## Use case: Offer a callback before the caller enters a task queue

Before sending an incoming call to a TaskRouter task queue, call a Function that uses the TaskRouter Statistics API to determine the Estimated Wait Time. If this is above a threshold, you can offer the caller the option of a callback instead of sending the call to a queue.

> \[!NOTE]
>
> * When quoting the estimated wait time prior to offering a callback, it is a best practice to set an upper limit for the amount of time that can be quoted. For example, if the wait time exceeds 10 minutes, you might choose to say "...more than 10 minutes from now" rather than quoting an exact time.
> * We recommend setting a minimum offer threshold based on the current estimated wait time to ensure that callback offers are not made when wait times are very low. You may also wish to check agent availability prior to offering a callback.

The TaskRouter Statistics API doesn't provide a true Estimated Wait Time, but there are multiple ways to calculate it. This example uses the `AvgTaskAcceptanceTime` value that is available in TaskRouter for the previous five minutes.

![Flowchart showing TaskRouter API process for handling incoming messages and calls with decision nodes for wait time and offers.](https://docs-resources.prod.twilio.com/f61b91ee83293cea57127bae51f9a939291196e1179196614bca3d5e4075d504.png)

In diagram above, the Estimated Wait Time is obtained by using Studio's Run Function widget (in the diagram called `check_average_wait_time`) and invoking a Function with following code:

```javascript
/**
 * Function to read avgTaskAcceptanceTime statistics from TaskRouter's cumulative statistics.
 * https://www.twilio.com/docs/taskrouter/api/taskqueue-statistics#taskqueue-cumulative-statistics
 *
 * It returns JSON object with following fields:
 * - avgTaskAcceptanceTime - number of seconds
 *
 *
 * Expected variables from context:
 * - Queue_Estimated_Wait_Time - initial value of 0, used by script to cache value of average task acceptance time
 * - Queue_Estimated_Wait_Time_Last_Updated - initial value of 0, used by script to cache timestamp of last update of
 * - Queue_Update_Interval - average time update interval in milliseconds, initial value of 60000
 * - Workspace_SID
 * - Task_Queue_SID
 * - Service_SID
 * - Environment_SID
 * - VAR_QEWTLU_SID - SID of variable Queue_Estimated_Wait_Time_Last_Updated
 * - VAR_QEWT_SID - SID of variable Queue_Estimated_Wait_Time
 *
 * Following twilio-cli calls are useful for setting up environment variables for this script:
 *
 * twilio api:taskrouter:v1:workspaces:list
 *
 * twilio api:taskrouter:v1:workspaces:task-queues:list \
 *     --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *
 * twilio api:serverless:v1:services:list
 *
 * twilio api:serverless:v1:services:environments:list \
 *     --service-sid ZSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *
 * twilio api:serverless:v1:services:environments:variables:list \
 *     --service-sid ZSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
 *     --environment-sid ZEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 */

exports.handler = function (context, event, callback) {

    const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST');
    response.appendHeader('Content-Type', 'application/json');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

    get_wait_time(context, event, callback).then(value => {
        response.setBody({
                             'avgTaskAcceptanceTime': value
                         });
        return callback(null, response);
    })

}

async function get_wait_time(context, event, callback) {
    const client = context.getTwilioClient();

    let current_timestamp = new Date().getTime();

    if ((current_timestamp - context.Queue_Estimated_Wait_Time_Last_Updated) > context.Queue_Update_Interval) {

        let average_task_acceptance_time = await get_queue_cumulative_statistics(client, context.Workspace_SID, context.Task_Queue_SID, 'avgTaskAcceptanceTime');

        context.Queue_Estimated_Wait_Time = parseInt(average_task_acceptance_time);

        await client.serverless.services(context.Service_SID)
            .environments(context.Environment_SID)
            .variables(context.VAR_QEWT_SID)
            .update({
                        key: 'Queue_Estimated_Wait_Time',
                        value: average_task_acceptance_time
                    });
        await client.serverless.services(context.Service_SID)
            .environments(context.Environment_SID)
            .variables(context.VAR_QEWTLU_SID)
            .update({
                        key: 'Queue_Estimated_Wait_Time_Last_Updated',
                        value: current_timestamp
                    });

    }

    return context.Queue_Estimated_Wait_Time;
}

async function get_queue_cumulative_statistics(twilio_client, workspace_sid, task_queue_sid, stat_name) {
    return twilio_client.taskrouter.workspaces(workspace_sid)
        .taskQueues(task_queue_sid)
        .cumulativeStatistics()
        .fetch()
        .then(stats => {
            return (stats[stat_name]);
        });
}
```

> \[!NOTE]
>
> If you receive the following error during execution, go to service dependencies and update the *twilio* library's version (e.g., to \*) and redeploy.
>
> ```javascript
> UnhandledPromiseRejectionWarning: Unhandled promise rejection: TypeError: 
> Cannot read property 'services' of undefined at get_wait_time
> (/var/task/handlers/ZN016166710a27ef5a1f9efa721c2809e2.js:40:33) at
> processTicksAndRejections (internal/process/task_queues.js:97:5)
> ```

If the Estimated Wait is greater than 120 seconds, the call is transferred to Mindful via the SIP trunk. Otherwise, the call is sent to Flex via a TaskRouter task queue.

The toolstep named `transfer_to_vht` defines the SIP endpoint to which Flex transfers the call. This is the phone number that you set up above in step 5, in the following format: `sip:+1xxxxxxxxxx@sip-callback.mindful.cx:5566?x-user-to-user={{trigger.call.From}}`

Flex also sends Mindful the caller's phone number through the user-to-user SIP Header.

## Use case: Offer a callback while the customer is on hold in a task queue

In this example, the incoming call reaches the TaskRouter task queue in the Studio Flow.

![Studio Flow showing task routing from incoming message to Flex with configuration panel open.](https://docs-resources.prod.twilio.com/550d0768702419db9bb70e9601d55e5632f9a62e3509f02de0644e66528411ed.jpg)

The average wait time check is performed in the widget Send to Flex (`send_to_flex1` in the diagram above) by using the Hold Music TwiML URL parameter. Instead of pointing to actual Hold Music TwiML, you can point to a custom Function called `hold_treatment()`, which in turn calls another custom function `transfer_to_vht()`.

> \[!NOTE]
>
> Careful planning and consideration should be given to taking a caller out of a task queue to receive a callback. The take-rate is lower when users are offered callbacks in-queue instead of before they enter the queue.

Code for `hold_treatment`:

```javascript
/**
 * This function expects the same environment variables as the wait_time.js
 *
 * Expected variables from context:
 * - Queue_Estimated_Wait_Time - initial value of 0, used by script to cache value of average task acceptance time
 * - Queue_Estimated_Wait_Time_Last_Updated - initial value of 0, used by script to cache timestamp of last update of
 * Queue_Estimated_Wait_Time
 * - Queue_Update_Interval - average time update interval in milliseconds, initial value of 60000
 * - Workspace_SID
 * - Task_Queue_SID
 * - Service_SID
 * - Environment_SID
 * - VAR_QEWTLU_SID - SID of variable Queue_Estimated_Wait_Time_Last_Updated
 * - VAR_QEWT_SID - SID of variable Queue_Estimated_Wait_Time
 */
exports.handler = function(context, event, callback) {
    let twiml = new Twilio.twiml.VoiceResponse();

    get_wait_time(context).then(avg_wait_time => {
        let action_url = "https://" + context.DOMAIN_NAME + '/' + 'transfer_to_vht';
        if (avg_wait_time > 120) {
            twiml.gather({action: action_url})
                .say(`Your call will be routed to an agent in approximately ${avg_wait_time / 60} minutes. Press 1 if you want to be called back`);
        }
        return callback(null, twiml);
    });

};
```

Code for `transfer_to_vht`:

```javascript
exports.handler = function(context, event, callback) {
    let response = new Twilio.twiml.VoiceResponse();

    let gathered_digits = 0;
    if (event['Digits']) {
        gathered_digits = parseInt(event['Digits']);
    }
    if (gathered_digits && (gathered_digits === 1)) {
        // leave Flex queue and continue with next node connected to Task completed
        response.leave();
    }

    return callback(null, response);

};
```

When the Estimated Wait Time exceeds the threshold, in this case, 120 seconds, the function returns `<Leave>` TwiML which returns control back to Studio and continues with the next widget.

On the `Task Created` condition, Studio will use the `Connect Call To` widget and redirect to Mindful.

## Route the return call

The last step of this Implementation Guide is to route the return calls from Mindful straight to Flex, but with a higher priority. This should be used as a followup for either of the two scenarios above.

You can do this with the following Studio Flow:

![Flowchart showing call routing with set\_UUI and send\_to\_flex\_1 configuration details.](https://docs-resources.prod.twilio.com/c87018520ed86bf2fc15c927fd703f978f2f8050250c7a22311f1a1fbf922039.png)

This Flow will grab the Sip Header `x-user-to-user` and set that as an attribute to the TaskRouter task. It also changes the Priority from a default value of 0 to 5, to give these incoming calls a higher priority. Depending on your organization's TaskRouter setup, you may need to change this value to one that is appropriately ranked.

Once you've connected all of your Studio Flows to the appropriate phone numbers, your callback solution should be ready to go. Well done - your customers will thank you for saving them from those long hold times!
