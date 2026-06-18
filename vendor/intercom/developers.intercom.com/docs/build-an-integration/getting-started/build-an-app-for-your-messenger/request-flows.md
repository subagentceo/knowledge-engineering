# Set up request flows

## Configure Flow

This is an optional request flow that you can implement if your Messenger App requires configuration before displaying it to an end user. You can implement the `configure-flow` by specifying a `configure_url` when setting up your app within Developer Hub.  Then, an HTTP `POST` will be made to that URL when a teammate selects your app.

This request allows you to respond with an updated [canvas](/docs/references/preview/canvas-kit/responseobjects/canvas) which the teammate can interact with to help construct the app. Or, you can return a result object containing [card creation options](/docs/references/preview/canvas-kit/requestobjects/card-creation-options) which indicates the configuration is now complete.

Once a result object is sent, the collected information will be posted to the `initialize-url` URL.

## Example Configure Flow

![Configure Flow](/assets/53b0fe2-281c8ab-configure_flow.0e3e40f4c7277a890f985cec7356193af65235fc48f64f32540847fd1bef213d.71a4f21c.png)

```json
# This is the initial POST request which Intercom will send to your configure-card URL.

{
  "workspace_id": /* string id_code of the app using the card */,
  "admin": /* Admin object of admin who is performing configuration */,
  "context": /* Context object */
}

# You can then decide which of the two responses you would like to send; a canvas or results object.
```

```json
# This object will be used to render a configuration UI inside the inserter or home screen configuration.

{
  "canvas": /* Canvas object */
}

# Taking an action in this UI will result in a further request to the configure URL with the following payload.

{
  "workspace_id": /* string id_code of the app using the card */,
  "admin": /* Admin object of admin who is performing configuration */,
  "current_canvas": /* Canvas object */,
  "component_id": /* component_id, component which triggered action */,
  "input_values": {
    "<component_id>" : /* value entered in component */,
    ...
  },
  "context": /* Context object */
}

# As with the initial request, this may be responded to with either another canvas or a configuration result.
```

```json
# To finish configuration the developer responds with a results object indicating the computed configuration options.

{
  "results": {
    /* set of key-value pairs */
  }
}

# These results will then be posted to the initialize-url as card creation options.
```

## Initialize Flow

Teammates can add a card instance of your Messenger App to conversations, to the homescreen, to a Message or to Workflows. When they do, the framework sends a HTTP `POST` to your webservice via the `initialize_url` you provided. This asks you what the initial [canvas](/docs/references/preview/canvas-kit/responseobjects/canvas) for your new card should look like.

If you have implemented the [configure flow](#configure-flow) then a teammate will have entered some configuration options. These are known as [card creation options](/docs/references/preview/canvas-kit/requestobjects/card-creation-options).

We gather those card creation options from the teammate, and send them to you as part of the payload of the **initialize-card** request. You return back a [canvas](/docs/references/preview/canvas-kit/responseobjects/canvas) containing the initial UI for the new card.

What if I have no configure flow?
Remember, the `configure flow` is optional, so if you haven't specified a `configure_url` then the framework will just start with the `initialize flow` when the teammate adds the app to the conversati.

## Example Initialize Flow

![Initialize flow](/assets/cc7a368-initialize_flow.7365cd10e6109d0caeef0c58c45ddbf239895c15bf3391b6ae9d6d8d9869f268.71a4f21c.png)

```json
# When a card is being added, Intercom POSTs a request to the Messenger app's initialize_url with the card creation parameters gathered from the teammate. The payload is in the following form:

{
  "card_creation_options": {
    /* set of key-value pairs */
  },
  "workspace_id": /* string id_code of the app using the card */,
  "context": /* Context object */
}
```

```json
# The developer returns a response in the following format.

{
  "canvas": /* Canvas object */
}
```

## Submit Flow

When an end user clicks a button or submits text to an input field on a card, the framework fires a HTTP POST to the `submit_url` you have provided. The purpose of this request is to tell you a user took an action on the card, and ask how it should be updated.

This request also gives you a chance to trigger any actions you want in your own code, like adding a user's email to your own database or scheduling a calendar event.

The payload contains information about the end user: the action they took, what values they had filled into each input field, and the card's [current canvas](/docs/references/preview/canvas-kit/requestobjects/current-canvas). In the response, you return back a [new canvas object](/docs/references/preview/canvas-kit/responseobjects/canvas), containing the updated UI for the card.

### App Completion Tracking (optional)

App completion events will help you understand how your customers are using your app and will add more value to it, making it possible for bots to know when to continue with their flows.

You can optionally add an [event object](/docs/references/preview/canvas-kit/responseobjects/event) to your submit flow response to tell us if your Messenger app has completed its purpose. For example, an email collector app completes when the end-user submits their email address.

## Example Submit Flow

![Submit flow](/assets/46542b4-submit_flow.75938fc861d978b23d591eef9acae6e9671b7f9fb9295a8ec23fb4594290036f.71a4f21c.png)

```json
# When an end-user triggers a submit action on a card, Intercom POSTs a request to the messenger-app's `submit_url` with the following payload.

{
  "workspace_id": /* string id_code of the app using the card */,
  "current_canvas": /* Canvas object */,
  "component_id": /* component_id */,
  "input_values": {
      "<component_id>" : /* value entered in component */,
    ...
  },
  "user": /* User object of end-user who triggered action */,
  "context": {
    "location": /* "conversation"/"home" */,
    "conversation_id": /* conversation_id */ //Only needed if location == conversation
  }
}
```

```json
# The developer returns a response in the following format.

{
  "canvas": /* Canvas object */,
  "event": {
    "type": "completed"
  }, // App Completion Tracking (optional)
}

# The card which triggered the request is updated with the new canvas from the response.

# The app completion event is recorded by Intercom.
```

## Live Canvas Flow

The `live canvas` is an optional extension of the [canvas object](/docs/canvas-kit#live-canvas-optional) which enables developers to provide up-to-date information in a `card`.

It can be implemented  by simply returning a `content_url` in a `canvas` object.

Whenever the card containing that `canvas` object is rendered in the Messenger, a `POST` request will be sent to that content URL.

This enables a developer to provide a live (rather than the regular static) version of a `canvas`.

No interaction required
Note that no user interaction is required for the `POST` request to be triggered. It will occur whenever the card is viewed in a conversation. The live canvas can also be rendered in a teammate inbox.

### Why would I need a live canvas?

You can usually realize similar functionality to a `live canvas` by requiring a user interaction.

Think of a webinar booking app as an example scenario. You may have a button a user can click on to show them the availability and times for the next webinar.

However, in some cases this is not ideal. If you had an app that showed the current health status of your product or platform for example.

Ideally, you would like this to show the current state without requiring a user to manually trigger a status refresh. You would use a `live canvas` to do this.

As a result, whenever a user opens up their conversation with the health status card they will always get the latest state (which is hopefully green), and they will not need to instigate any action to do so.

## Example Live Canvas Flow

![Live canvas flow](/assets/ef28b8a-live_canvas_flow.5e93639bd70781067f8f244c5aa69401084e653a56328f8dd2f9cdff10fb3724.71a4f21c.png)

## Objects in the Live Canvas Flow

Please see the [canvas object](/docs/canvas-kit#live-canvas-optional) for more details on how to implement this flow and the expected response from your webservice.