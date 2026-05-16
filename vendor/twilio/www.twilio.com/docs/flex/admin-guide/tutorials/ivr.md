# Build an IVR for Flex with Twilio Studio

## Overview

On this page, you'll learn how to route calls to agents using an [Interactive Voice Response](/docs/glossary/what-is-ivr) (IVR) menu that we will build in Twilio Studio.

> \[!NOTE]
>
> Prefer to get started by watching a video? Check out our [collection of Flex video tutorials and demos](https://www.youtube.com/playlist?list=PLqrz4nXepkz4wXHPRc1NdPEajPJ8cbNKI).

## Reduce agent workload

When conversations are routed to agents, agents can accept the conversation from their dashboards. When finished, agents enter *wrap-up time*. When that is finished, they're put back into the queue for more incoming tasks.

By default, dialing your Flex number automatically puts a call into the agent queue currently. That's not ideal in a real contact center. Usually, you'll want to add an IVR menu that plays before the call is queued and provides automated information such as business hours or location. Only callers who can't resolve their issue would then get dropped into the queue.

Next, we'll set up a small IVR to reduce the calls to our imaginary agents.

## Use Twilio Studio to build an IVR phone tree in Flex

Let's put together a phone tree using a Twilio Studio integration. We'll use this IVR to report business location and hours automatically. If a caller asks for anything else, we'll put them into the agent queue.

### Build an IVR visually with Studio

There are quite a few steps to building the IVR, but most of them are drag and drop.

1. Navigate to the [Studio section of the Twilio Console](https://www.twilio.com/console/studio/dashboard).
2. Click on the **Voice IVR** Flow to get started:

   ![Studio dashboard showing recent flows with Voice IVR highlighted.](https://docs-resources.prod.twilio.com/7f7515a14e41a2fab6b11e62edd39359cc48238765f2a0084449df7a2df9da76.png)
3. Twilio already added a *Trigger* event on Incoming Calls. As the IVR sits now, an Incoming Call will be routed directly to an Agent (that is, the behavior hasn't changed from before):

   ![IVR flow with triggers for message, call, and API leading to SendCallToAgent.](https://docs-resources.prod.twilio.com/bbaa71628ed1a75d71a936b88ee28e2ec3dc022a6e26f68b6dce96a13fc5f6fb.png)
4. Find the **Gather Input on Call** widget on the right toolbar. Click down on it and drag it onto the canvas near **Trigger**. Click on the widget to bring up the **Config** tab. Enter your call greeting followed by instructions for your three options:

   ![Studio configuration for gathering input on call with message options and settings.](https://docs-resources.prod.twilio.com/f372b43296e08aeb8e06652c27449a32d0328128f020867158321521ba6a9736.png)

   \
   Name the widget **gather\_digits** to make it easier to find on the canvas.
5. Click **Save** to save the **Gather** widget.
6. Click **Back** to go back to the Widget Library. Find the **Split Based On...** widget in the right toolbar. Drag one below the **Gather** widget from the last step.
7. In "Variable to Test", click to spawn a dropdown menu. Find the "Digits" variable associated with the **Gather** widget above and click **Save**.

   ![Config panel showing widget name split\_keys and variable gather\_digits.Digits selected.](https://docs-resources.prod.twilio.com/5c514a04717e755b450a422196cb370be7b93cf6310c346625d3faea1b13912b.png)
8. Click on your **Gather** widget again. In the "If User Pressed Keys" Transition select the **Split** widget, then click **Save**. You should see the **Trigger** widget, **Gather** widget, and the **Split** widget all connected with the **Send Call to Agent** widget disconnected.
9. Click **New** on the canvas in the **Split** widget:

   ![Flowchart showing trigger, gather\_digits, and split\_keys with conditions for user input.](https://docs-resources.prod.twilio.com/33b3d004471641911ebbe9ad5895fd93e842f5b39567cf7067648242add3fa73.png)
10. Select "Condition Matches" and enter `1`, then click **Save** to save the transition. You'll see a new transition appear on your split:

    ![Flowchart showing trigger, gather\_digits, and split\_keys with conditions for user input.](https://docs-resources.prod.twilio.com/33b3d004471641911ebbe9ad5895fd93e842f5b39567cf7067648242add3fa73.png)
11. Drag a **Say/Play** widget onto the canvas below the **Split** widget. Enter a message in "Text to Say" which lists your business hours then click **Save**. Using your mouse, click the **Split** widget transition for `1` and drag the line to the upper left bubble of your new **Say/Play** widget:

    ![Flowchart showing split\_keys and business\_hours with conditions and audio completion.](https://docs-resources.prod.twilio.com/ea21152738e4b7a012adbe2d8ea6025787bc378b833d62af1aab1dfb40b7df5e.png)
12. Repeat steps 9 through 11 except use `2` in the split and have a new **Say/Play** widget announce the location for your business.
13. From "No Condition Matches" in the **Split** widget, click and drag a transition to the upper left-hand bubble in the **Send Call to Agent** widget.\
    Optional: Clean up by dragging transitions and widgets around the canvas.\
    Your canvas should now look something like this:

    ![IVR flow for Flex Voice with options for business hours and location.](https://docs-resources.prod.twilio.com/ebc691d6f5dfe08f8204e357b7846fab2fca0c50b11b34f53c5ff8b155b4b1c2.png)
14. You're ready to go! At the top of the canvas, click **Publish**.

    ![Toolbar with publish button and revision 53 indicator.](https://docs-resources.prod.twilio.com/5d7d0c40cadf02690a9314a70834b64befbf12e562c601e2b8b6b58a9ac7dbdf.png)

Now it's the moment of truth: Call your Flex number and verify that your IVR works. You should be able to query for business hours or location. Otherwise, your call will go into the agent queue.

If one of the transitions doesn't work, carefully follow the steps again. Be mindful of widget type, transitions, and triggers.

If it works, *congratulations!* You've now automatically handled some of the most common questions facing your agents.

## What's next?

Twilio Flex is infinitely customizable, and where you go next depends on how you want to scale your contact center. Here are a few possible next steps:

* Learn how to [set up multiple call queues](/docs/flex/admin-guide/tutorials/skills-assignment) to manage multiple users and agents, assign skills to agents, and manage conversation routing with TaskRouter.
* Learn how to [customize Flex](/docs/flex/quickstart/getting-started-plugin) using React.
* Learn the fundamentals of Studio and how to [Build an IVR with Twilio Studio](/docs/studio/tutorials/how-to-build-an-ivr).
