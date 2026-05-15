# Routing Part 2: Set Up Queues and Skills-based Routing

In part 1 of this tutorial series, you learned how to [set up skills in the Flex UI and assign them to your agents](/docs/flex/admin-guide/tutorials/skills-assignment). In this tutorial, we will cover how to create Task Queues, Workflows, and Studio Flows to enable skills-based routing for your contact center.

## Create a Task Queue

You can create [Task Queues](/docs/flex/admin-guide/core-concepts/routing#task-queues) with the [Twilio Console](https://www.twilio.com/console/) or the [API](/docs/taskrouter/api/task-queue#creating-taskqueues). This tutorial will focus on using the Console for queue creation:

1. In the Twilio Console, navigate to TaskRouter. Select TaskRouter from the left nav or use the "Jump to" search box in the upper right corner of the screen.

   ![Twilio console showing TaskRouter navigation and project info with account SID and auth token.](https://docs-resources.prod.twilio.com/d440aa1d393af8f9dd3eca7e81f59fa040be39675c6e31e5874435b29500d044.png)
2. From the TaskRouter dashboard, navigate to **Workspaces** **>** **Flex Task Assignment**. This is where your Flex routing configuration is managed.
3. Next, we will create two new Task Queues. These will be the queues used to separate CustomerService, HR and IT. By default, Flex comes with a single queue: the "Everyone" queue.
4. To create our additional queues, select **TaskQueues** from the **Flex Task Assignment** menu:

   ![Task queues overview showing eligible workers and recent workers offline.](https://docs-resources.prod.twilio.com/bb209f244057acd739da16fcdd70a67c4a534c8386a05cb2aa6e45b5c7c68a0b.png)

   1. Create new Task Queues for each Queue by pressing **plus ('+')** at the top of the page:
   2. Enter a **TaskQueue Name**, set **Max Reserved Workers** to `1`, and provide the appropriate **Queue Expression**.
   3. Create two queues: one for CustomerService and one for EmployeeService.

      ![CustomerService task queue properties with offline activity and FIFO task order.](https://docs-resources.prod.twilio.com/ee8020566c7408cf2432c5f493eb5b5df86f9bda85937f5e5902c8a85f21f29f.png)

      * **First Task Queue Name:** CustomerService **Queue Expression:** routing.skills HAS "CustomerService"
      * **Second Task Queue Name:** EmployeeService **Queue Expression:** routing.skills HAS "HR" OR routing.skills HAS "IT"

      You should then see two additional queues on your account's TaskQueues page.

      ![Task Queues list with columns for task queue name, total tasks, max reserve workers, and target worker expression.](https://docs-resources.prod.twilio.com/6f7b40879ab9016191de83b1fff804820f1a7ae39345ad283820f855777ef9c8.png)

## Create your Workflows

**[Workflows](/docs/flex/admin-guide/core-concepts/routing#workflows)** are used to deliver **[Tasks](/docs/flex/admin-guide/core-concepts/routing#tasks)** to the appropriate Task Queue. The TaskRouter Workflow is where you can use powerful expressions to create skills and attribute-based routing strategies. For this example, we will create a queue strategy for CustomerService and a skills-based routing strategy for EmployeeService.

See the [TaskRouter Workflow Docs](/docs/taskrouter/workflow-configuration) to learn more about Workflow Expressions.

1. Select **Workflows** from the Flex Task Assignment menu:
2. Create a new Workflow for the CustomerService queue. Click **plus ('+')** at the top of the page to add a new Workflow.
3. Enter "Transfer to CustomerService" as the **Workflow Name** and set the **Task Reservation Timeout** to 20 seconds. **Task Reservation Timeout** is the amount of wait time in seconds for TaskRouter to wait for a specific [worker](/docs/flex/admin-guide/core-concepts/routing#workers) (or agent) to accept an incoming task, before moving on to the next qualified agents. By default, it is set to 120 seconds.
4. Now add a **Filter** to the Workflow. Set the filter name to 'CustomerService', and select 'CustomerService' as the **Queue**.

   ![Workflow setup for transferring tasks to CustomerService with a 20-second reservation timeout.](https://docs-resources.prod.twilio.com/36139d5a3d1bccb2b30f19c5e4bf2c9ab39e73112ac2792860e676c8ac06bb86.png)
5. Next, we will create another Workflow for EmployeeService. Name the workflow **Transfer to EmployeeService** and set the Task Reservation Timeout to 20 seconds. For this Workflow, we will create two filters: one for HR and one for IT.

   * **First Filter**

     * **Name:** HR
     * **Matching Tasks: "HR" IN skillsNeeded**
     * **Task Queue:** EmployeeService
     * **Expression:** worker.routing.skills HAS "HR"
     * **Priority:** 100 (This optional field can be used to prioritize calls. We will set a priority to ensure HR tasks are answered before IT tasks.)
   * **Second Filter**

     * **Name:** IT
     * **Matching Tasks: "IT" IN skillsNeeded**
     * **Task Queue:** EmployeeService
     * **Expression:** worker.routing.skills HAS "IT"
   * **Default Queue:** EmployeeService

If you did everything correctly, it should look like this:

![HR filter with task queue EmployeeService and priority 100.](https://docs-resources.prod.twilio.com/9ca049498a14819381f28fdcdfe8c1ff9daab9f7c9d697890824a1466a89bcc4.png)

![HR workflow with IT skill filter, matching workers by longest idle time.](https://docs-resources.prod.twilio.com/9e9737c1b710b8953540127484153447415b6ce727d16522e453887fb8f3b02f.png)

For more details on how to use expressions with TaskRouter, visit [Using TaskRouter Expressions](/docs/taskrouter/expression-syntax).

## Set up Studio Flows

With our Task Queues defined, we will now build out two Studio Flows for voice routing. In this tutorial, we'll only cover Voice Studio Flows but these same concepts apply for other channels such as SMS.

Navigate to [Studio](https://www.twilio.com/console/studio/dashboard) in the Console. On this page, you will see three default Studio Flows. Locate the **Voice IVR** flow and click Duplicate Flow.

![Studio Dashboard showing recent flows with options to duplicate or delete each flow.](https://docs-resources.prod.twilio.com/f29571dbdae1e973ad2f71722b8c5be6ef55d2010e73dafb6f493ad7bee2c417.png)

The new flow "Copy of Voice IVR" will open.

### CustomerService Voice IVR

Let's change this name by clicking on the Trigger widget. On the widget configuration, change the **Flow Name** to "CustomerService Voice IVR".

![Studio flow showing trigger for incoming message, call, and REST API with SendCallToAgent step.](https://docs-resources.prod.twilio.com/22709d0807ce02d77eeafcce1f3654fc48a4eb1db595a54173e57c09337c3705.png)

Select the **SendCallToAgent** widget and configure the widget to use the **Transfer to CustomerService** Workflow.

![Studio flow showing SendCallToAgent widget transferring to CustomerService workflow.](https://docs-resources.prod.twilio.com/27781ebd438dadb314e2a2770b9150540189937335524adc7537e9fb40a237f4.png)

Click **Save** on the widget Config and **Publish** the Studio Flow.

This basic flow delivers all incoming calls directly to the **CustomerService** queue.

> \[!NOTE]
>
> To properly route incoming calls, remember to associate your Flex phone number with your desired Studio Flow.

You can use the various tools in the [widget library](/docs/studio/widget-library) to build out a more personalized inbound call flow. You could explore the [HTTP Request](/docs/studio/widget-library/http-request) widget for doing REST API calls, try the [Say/Play](/docs/studio/widget-library/sayplay) widget to play audio files, or recreate text-to-speech prompts.

**EmployeeService Voice IVR**

For now, let's return to the main Studio screen and repeat the steps to create a Studio Flow for EmployeeService. This time, we will add a basic menu to determine if the caller needs to speak to HR or IT.

![Flowchart showing call routing: press 1 for HR, press 2 for IT, with tasks sent to respective agents.](https://docs-resources.prod.twilio.com/94b0d1360fc72ef4a40b027c77aa4babc1128073850842de3a6f54e8ee26b991.png)

* **Trigger:** Set the Flow Name to "EmployeeService Voice IVR".
* **Gather\_EmployeeMenu:** Add a Gather widget prompting the caller to "enter 1 for HR or 2 for IT".
* **Split\_EmployeeMenu:** Add a Split widget to evaluate the digits. This widget should evaluate the digits output from the Gather\_EmployeeMenu widget. Add a transition for both "equals to 1" and "equals to 2" conditions.
* Duplicate the SendCallToAgent widget; name one of them HR\_SendCallToAgent and the other IT\_SendCallToAgent.
* **HR\_SendCalltoAgent:** Set the Workflow to Transfer to EmployeeService. In the attributes section, add a new property to the JSON object: "skillsNeeded":"HR"

  * **Attributes:**

    ```json
    {
      "type": "inbound",
      "name": "{{trigger.call.From}}",
      "skillsNeeded": "HR"
    }
    ```

  **IT\_SendCalltoAgent:** Set the Workflow to Transfer to EmployeeService. In the attributes section, add a new property to the JSON object. "skillsNeeded":"IT"

  * **Attributes:**

    ```json
    { "type": "inbound", "name": "{{trigger.call.From}}", "skillsNeeded": "IT" }
    ```
* Click **Save** and **Publish** to save and publish your changes.

In this section, we've built a Voice IVR with Twilio Studio to get you started. At this point, callers will be able to dial in and use '1' and '2' to route into the HR and IT queues, respectively. However, we're barely scraping the surface with Studio to highlight the queues and routing. We encourage you to play with Studio and add additional functionality.

Check out these great resources for building more with Studio:

* [Twilio Support: Getting Started with Twilio Studio](https://help.twilio.com/hc/en-us/articles/115015961327-Getting-Started-with-Twilio-Studio)
* [Blog: Introducing Twilio Studio, the Fastest Way to Build With Twilio](https://www.twilio.com/blog/introducing-twilio-studio.html)

## Test Your Queues and Skills Routing

Now that everything is configured, you can start testing.

**Step 1:** Navigate to the [Phone Numbers](https://www.twilio.com/console/phone-numbers/incoming) page in the Console and click on the number associated with your Flex instance.

**Step 2:** Scroll down to the "Voice" section and update the incoming call trigger with the Studio Flow that you created. Select "CustomerService Voice IVR" to test the "CustomerService Voice IVR" Studio Flow. Otherwise, select "EmployeeService Voice IVR".

**Step 3:** Click **Save**.

**Step 4:** [Place a few test calls](/docs/flex/admin-guide/setup/voice/test#answer-voice-calls-in-flex) into your new Flex phone numbers. You can verify that the call was routed correctly by viewing the [Real-Time Queues View](/docs/flex/end-user-guide/real-time-reporting/real-time-queues-view) or by clicking the **Info** tab on the Agent Desktop.

![Task info tab showing task type, priority, queue, and customer context details.](https://docs-resources.prod.twilio.com/7cce10fb6dc0893de9b3b1ea5fffacd6ba6d04f7b1e90e163043aae62483ee8f.png)

If you are not seeing the calls route to the correct queues, review your Queue Expression and Workflow expressions. Make sure these match up with what was displayed when you set up the skills. Also ensure that your Flex number is associated with the right Studio Flow.

## Summary

You have now enhanced your basic call center with two queues, and have added skills-based routing to route inbound calls to qualified agents. We hope this got your creative juices flowing for ways you can implement your contact center business processes with the combination of Studio and TaskRouter.
