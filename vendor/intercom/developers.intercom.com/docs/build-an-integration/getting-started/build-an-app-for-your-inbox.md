# Build an Inbox App

About this tutorial
This tutorial is written in Node.js but can be adapted for any programming language of your choice. The estimated time to complete this tutorial is 15 minutes. You can find the full code on [Replit](https://replit.com/@IntercomDevs/Build-an-Inbox-App?v=1).

## Overview

This tutorial will help you build an app that collects data about a contact in your Inbox using [Canvas Kit](/docs/canvas-kit). By the end, you will have a working example of an Inbox app that can be used by teammates in your Intercom workspace.

![what your finished app will look like](/assets/inbox_app_final.7ffa15bf9a3d5f53a5fb1385a0f897dfba63dcf849a912d4394f38c8ca3f9274.71a4f21c.png)

## Getting started

To complete this tutorial you need:

- An Intercom workspace. You can use your paid workspace, or a free Intercom [development workspace](https://app.intercom.com/admins/sign_up/developer)
- A free [Replit account](https://replit.com/signup)


This is the full sample code of what you will build:


```javascript
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname)));

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

/*
  This object defines the canvas that will display when your app initializes.
  It includes test, checkboxese, and a button.
  
  More information on these can be found in the reference docs.
  Canvas docs: https://developers.intercom.com/docs/references/canvas-kit/responseobjects/canvas/
  Components docs: https://developers.intercom.com/docs/references/canvas-kit/interactivecomponents/button/
*/

const initialCanvas = {
  canvas: {
    content: {
      components: [
        {
          type: "text",
          id: "department",
          text: "This contact works in:",
          align: "center",
          style: "header",
        },
        {
          type: "checkbox",
          id: "departmentChoice",
          label: "",
          options: [
            {
              type: "option",
              id: "sales",
              text: "Sales",
            },
            {
              type: "option",
              id: "operations",
              text: "Operations",
            },
            {
              type: "option",
              id: "engineering",
              text: "Engineering",
            },
          ],
        },
        {
          type: "button",
          label: "Submit",
          style: "primary",
          id: "submit_button",
          action: {
            type: "submit",
          },
        },
      ],
    },
  },
};

app.get("/", (response) => {
  response.sendFile(path.join(__dirname, "index.html"));
});

/*
  This is an endpoint that Intercom will POST HTTP request when a teammate inserts 
  the app into the inbox, or a new conversation is viewed.
*/
app.post("/initialize", (request, response) => {
  response.send(initialCanvas);
});

/*
  When a submit action is taken in a canvas component, it will hit this endpoint.

  You can use this endpoint as many times as needed within a flow. You will need 
  to set up the conditions that will show it the required canvas object based on a 
  teammate's actions.

  In this example, if a user has clicked the initial submit button, it will show
  them the final submission canvas. If they click the refresh button to submit 
  another, it will show the initial canvas once again to repeat the process.
*/
app.post("/submit", (request, response) => {
  if (request.body.component_id == "submit_button") {
    let department = request.body.input_values.departmentChoice;

    let finalCanvas = {
      canvas: {
        content: {
          components: [
            {
              type: "text",
              id: "thanks",
              text: "You chose: " + department,
              align: "center",
              style: "header",
            },
            {
              type: "button",
              label: "Submit another",
              style: "primary",
              id: "refresh_button",
              action: {
                type: "submit",
              },
            },
          ],
        },
      },
    };
    response.send(finalCanvas);
  } else {
    response.send(initialCanvas);
  }
});
```

## Create an Intercom App

Create a new app in your workspace by going to the [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub) and clicking New app.

![create a new app](/assets/inbox_quickstart.bcbb2434b0e4d53745d4f78db5e2cbde07cfeb99afda766873f1ece7430b1ca3.71a4f21c.png)

Once your app is created, click on "Canvas Kit" in the sidebar. This is where you'll configure the endpoints for your app later in the guide.

## The initialize request

Open up the Replit template. There's some code in `index.html` for setting up the Messenger and logging the endpoints and server code that will be used for your Canvas Kit webhooks in `index.js`

Adding the Messenger
This tutorial is for Inbox apps. However, you will need a conversation in your Inbox to test your app — setting up the Messenger will allow you to create this test conversation.

We're using [Express](https://expressjs.com/) as the framework and have set that up along with [body-parser](https://www.npmjs.com/package/body-parser) to be able to parse the request bodies.

First look at `initialCanvas`:


```javascript
const initialCanvas = {
  canvas: {
    content: {
      components: [
        {
          type: "text",
          id: "department",
          text: "This contact works in:",
          align: "center",
          style: "header",
        },
        {
          type: "checkbox",
          id: "departmentChoice",
          label: "",
          options: [
            {
              type: "option",
              id: "sales",
              text: "Sales",
            },
            {
              type: "option",
              id: "operations",
              text: "Operations",
            },
            {
              type: "option",
              id: "engineering",
              text: "Engineering",
            },
          ],
        },
        {
          type: "button",
          label: "Submit",
          style: "primary",
          id: "submit_button",
          action: {
            type: "submit",
          },
        },
      ],
    },
  },
};
```

This is a [Canvas object](https://developers.intercom.com/docs/references/canvas-kit/responseobjects/canvas/), which defines what will display to the teammate in the Inbox app. In this example it contains a content object with components that display text with list a checkboxes, and a submit button.

If you look at `/initialize` in the same file, you will see that when this endpoint is hit, it will send the `initialCanvas` object whenever the app is added to the Inbox, or when a teammate views a conversation with the app added to the Inbox.


```javascript
app.post("/initialize", (request, response) => {
  response.send(initialCanvas);
});
```

## Set up the webhooks

You'll also notice there is a `submit` endpoint. Before we dive into what that's doing, let's provide the initialize and submit webhooks to the Intercom app you just created and so you can test out displaying the app in the Inbox.

### Add the Messenger

In `index.html` starting on line 37 you should see the script that will start the Intercom Messenger.

Replace `YOUR-WORKSPACE-ID` with your own workspace ID. You can grab it from the URL of your Intercom workspace `https://app.intercom.com/a/apps/YOUR-WORKSPACE-ID`.

Workspace ID and App ID
You may see references to "Workspace ID" and "App ID". These are the same values.

Click "Run" at the top of your Replit editor. If you view the webview or open it in a new tab, you should see a list of your endpoints and the Messenger in the bottom right.

![successfully running app with Messenger](/assets/webview_inbox_app.c515bcd4dd13b8fe0fb24ffbf08380b46dc76879e8eb91f9f89df5152c5e328d.71a4f21c.png)

### Add the webhooks

Back in your developer hub, in the Canvas Kit page click "For teammates."

Check the box that says "Add to conversation details", then paste in the endpoints.

Make sure that the endpoints match, i.e. that `/submit` is in the Submit flow form input and that `/initialize` is in the Initialize flow input; we've shortened them in the example image below to show the intended behavior.

![add submit and initialize endpoints](/assets/developer_hub_canvas_kit_inbox.989139ce53269eb1d5deda397cb2017b5123d471d951bf8f6482de32c7598336.71a4f21c.png)

Hit the save button and the toggle near the title should switch to "On."

## Create a conversation

In order to add the app in the Inbox, we need to have an active conversation in our workspace. Since we installed the Messenger in the front-end of the Replit app, you can send a message there.

Once you have sent a message, you should see it appear in your Inbox under [all conversations](https://app.intercom.com/a/inbox/_/inbox/shared/all/conversation/). If it's your first time setting up your workspace, follow the prompts to add your Inbox seat.

## Add your app to the Inbox

From your [Inbox](https://app.intercom.com/a/apps/_/inbox) with your conversation open, choose **Edit Apps** from the bottom right hand side panel, and pin the app that you created.

![Your Inbox apps](/assets/add_inbox_app.3947c2efd34c7d033f79fd28a89370cedf741bbf5a16e3874e4f3f757120607c.71a4f21c.png)

Now you should see your app in your sidebar. When you click to expand it, you should see the checkbox form.

![Your new app](/assets/inbox_app_final.7ffa15bf9a3d5f53a5fb1385a0f897dfba63dcf849a912d4394f38c8ca3f9274.71a4f21c.png)

Problems adding your app to the Inbox?
If you can see your app is running but you get an error when trying to add it to Inbox, your URLs may be incorrect.

## The submit request

The button on our initial canvas object has a [submit action](https://developers.intercom.com/docs/references/canvas-kit/actioncomponents/submit-action/):


```javascript
{
  type: "button",
  label: "Submit",
  style: "primary",
  id: "submit_button",
  action: {
    type: "submit",
  },
}
```

This means that when clicked, it will trigger a [submit request](/docs/canvas-kit#submit-request) and hit the submit endpoint. You can call the submit request as many times as you would like in a teammate's session with your app.

After the initial canvas displays and the button is clicked, we've set it up so that it will go to the submit endpoint.


```javascript
app.post("/submit", (request, response) => {
  if (request.body.component_id == "submit_button") {
    let department = request.body.input_values.departmentChoice;

    let finalCanvas = {
      canvas: {
        content: {
          components: [
            {
              type: "text",
              id: "thanks",
              text: "You chose: " + department,
              align: "center",
              style: "header",
            },
            {
              type: "button",
              label: "Submit another",
              style: "primary",
              id: "refresh_button",
              action: {
                type: "submit",
              },
            },
          ],
        },
      },
    };
    response.send(finalCanvas);
  } else {
    response.send(initialCanvas);
  }
});
```

You'll notice that the `id` values of each button components are unique: These values are sent in the request as a value called `component_id`. You can use this value to take different actions within the `submit` request.

In your `submit` endpoint, you can check the `component_id` of the request. If it's the `submit_button` from the initial canvas, you can send the final canvas. The final canvas will get the teammate's selection from the body of the request using the `input_values` that you set in the inital canvas components. You can then display that back to the teammate.

However, if the `component_id` is `refresh_button`, or anything else, you can send the user back to the start of the flow by showing the initial canvas again.

You can use the conditions in the `submit` request to make as many customizations as you would like.

## Try it out

Now go back to your Inbox and test out the app. You should be able to choose any checkbox to submit, and then click the "Submit another" button to return to the start.

![The Inbox app showing the final canvas](/assets/final_inbox_canvas.63c64c797f6508be2e67109601a7562da9b5a7e9fa511bc70bfe711cbe152ec6.71a4f21c.png)

In this tutorial you created your first app for the Intercom Messenger using Canvas Kit. While Inbox apps and Messenger apps [appear to different audiences](/docs/canvas-kit#locations--types), you can also build them so that they work together.

Feedback and questions
How did it go? Send any feedback in the form at the bottom, and you can always contact us with questions via the Messenger in the bottom right.

## Next steps

Deploy with Replit
If you're ready to deploy your app you can do so right from Replit. However, Replit test accounts are free, but deployments are a premium feature. You can see the costs on the [Replit pricing page](https://replit.com/pricing).

- [Learn more](/docs/canvas-kit) about Canvas Kit from the reference docs
- Check out the other [interactive](https://developers.intercom.com/docs/references/canvas-kit/interactivecomponents/button/) and [presentation](https://developers.intercom.com/docs/references/canvas-kit/presentationcomponents/data-table/) components available for Inbox apps
- [Build an app](/docs/build-an-integration/getting-started/build-an-app-for-your-messenger) for your Messenger
- [Install](/docs/build-an-integration/learn-more/authentication/installing-uninstalling-apps) your app