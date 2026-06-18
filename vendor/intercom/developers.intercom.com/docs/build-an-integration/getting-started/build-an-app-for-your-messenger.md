# Build a Messenger App

About this tutorial
This tutorial is written in Node.js but can be adapted for any programming language of your choice. The estimated time to complete this tutorial is 15 minutes. You can find the full example code on [Replit](https://replit.com/@IntercomDevs/Build-a-Messenger-App?v=1).

## Overview

This tutorial will walk you through building a CSAT/feedback collection app for the Intercom Messenger using [Canvas Kit](/docs/canvas-kit). By the end, you will have a working example Messenger app in your workspace that can be used by users, visitors and leads.

![what your finished app will look like](/assets/messenger_app_final.ce58ea6d4552145373f7c1d0fe7f854be728c70fdaa62387bbcb267482e253ca.71a4f21c.png)

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
  These objects define the canvases that will display in your app, including textareas, inputs, and buttons.
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
          id: "feedback",
          text: "Leave us some feedback:",
          align: "center",
          style: "header",
        },
        {
          type: "textarea",
          id: "description",
          label: "Description",
          placeholder: "",
        },
        {
          type: "single-select",
          id: "csat",
          label: "How would you rate your satisfaction with our product?",
          options: [
            {
              type: "option",
              id: "dissatisfied",
              text: "Dissatisfied"
            },
            {
              type: "option",
              id: "neutral",
              text: "Neutral"
            },
            {
              type: "option",
              id: "satisfied",
              text: "satisfied"
            }
          ]
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


const finalCanvas = {
  canvas: {
    content: {
      components: [
        {
          type: "text",
          id: "thanks",
          text: "Thanks for letting us know!",
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

app.get("/", (response) => {
  response.sendFile(path.join(__dirname, "index.html"));
});

/*
  This is an endpoint that Intercom will POST HTTP request when the card needs to be 
  initialized.
  
  This can happen when your teammate inserts the app into a conversation composer, 
  Messenger home settings or User Message.
  
  Learn more: https://developers.intercom.com/docs/build-an-integration/getting- 
  started/build-an-app-for-your-messenger/request-flows/#initialize-flow
*/
app.post("/initialize", (request, response) => {
  response.send(initialCanvas);
});

/*
  When a submit action is taken in a canvas component, it will hit this endpoint.

  You can use this endpoint as many times as needed within a flow. You will need 
  to set up the conditions that will show it the required canvas object based on a 
  user/contact's actions.

  In this example, if a user has clicked the initial submit button, it will show 
  them the final thank you canvas. If they click the refresh button to submit 
  another, it will show the initial canvas once again to repeat the process.
*/
app.post("/submit", (request, response) => {
  if (request.body.component_id == "submit_button") {
    response.send(finalCanvas);
  } else {
    response.send(initialCanvas);
  }
});
```

Running the code
If you'd rather run the code in your own IDE you can do so, but you will need a way to access publicly exposed endpoints to provide in the Intercom developer hub for configuration, and will need to install the Messenger on your own page.

## Create an Intercom app

Create a new app in your workspace by going to the [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub) and clicking New app.

![create a new app](/assets/make_app_messenger.424beb93765618f894d51b79ea0a739406c6f9afa866e2ce865696037301cd7e.71a4f21c.png)

Once your app is created, click on "Canvas Kit" in the sidebar. This is where you'll configure the endpoints for your app later in the guide.

## The initialize request

Open up the Replit template. There's some code in `index.html` for setting up the Messenger and logging the endpoints and server code that will be used for your Canvas Kit webhooks in `index.js`

We're using [Express](https://expressjs.com/) as the framework and have set that up along with [body-parser](https://www.npmjs.com/package/body-parser) to be able to parse the request bodies.

First look at `initialCanvas`:

```javascript
const initialCanvas = {
  canvas: {
    content: {
      components: [
        {
          type: "text",
          id: "feedback",
          text: "Leave us some feedback:",
          align: "center",
          style: "header",
        },
        {
          type: "textarea",
          id: "description",
          label: "Description",
          placeholder: "",
        },
        {
          type: "single-select",
          id: "csat",
          label: "How would you rate your satisfaction with our product?",
          options: [
            {
              type: "option",
              id: "dissatisfied",
              text: "Dissatisfied"
            },
            {
              type: "option",
              id: "neutral",
              text: "Neutral"
            },
            {
              type: "option",
              id: "satisfied",
              text: "satisfied"
            }
          ]
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

This is a [Canvas object](https://developers.intercom.com/docs/references/canvas-kit/responseobjects/canvas/), which defines what will display to the user when they first see the Messenger app. In this example it contains a content object with components that display text with an input asking for feedback, and a submit button.

If you look at `/initialize` in the same file, you will see that when this endpoint is hit, it will send the `initialCanvas` object, which will kick off the flow. You can read more about this process in the [Canvas Kit docs](/docs/build-an-integration/getting-started/build-an-app-for-your-messenger/request-flows#initialize-flow) and find a full list of display objects in the [reference docs](https://developers.intercom.com/docs/references/canvas-kit/responseobjects/canvas/).

```javascript
app.post("/initialize", (request, response) => {
  response.send(initialCanvas);
});
```

## Set up the initialize and submit webhooks

You'll also notice there is a `submit` endpoint. Before we dive into what that's doing, let's provide the initialize and submit webhooks to the Intercom app you just created and so you can test out displaying the app in the Messenger.

### Add the Messenger

In `index.html` starting on line 49 you should see the script that will start the Intercom Messenger.

Replace `YOUR-WORKSPACE-ID` with your own workspace ID. You can grab it from the URL of your Intercom workspace `https://app.intercom.com/a/apps/YOUR-WORKSPACE-ID`.

Workspace ID and App ID
You may see references to "Workspace ID" and "App ID". These are the same values.

Click "Run" at the top of your Replit editor. If you view the webview or open it in a new tab, you should see a list of your endpoints and the Messenger in the bottom right.

![successfully running app with Messenger](/assets/replit_webview_messenger_initialize.db383c7653913fa2951245afdd9c34e30b8e08f1b9f0a3ed16d7754943264f6b.71a4f21c.png)

### Add the webhooks

Back in your developer hub, in the Canvas Kit page click "For users, leads, and visitors."

There is a list of options of where you can display your Messenger app: for now, click "Place on the Messenger home screen" and add the endpoints that are showing in the Replit webview.

Make sure that the endpoints match, i.e. that `/submit` is in the Submit flow form input and that `/initialize` is in the Initialize flow input; we've shortened them in the example image to show the intended behavior.

![add submit and initialize endpoints](/assets/messenger_initialize_and_submit_webhooks.53369c7e16e82ccdc36a8cbfe304b48d25bbb893f15a735237b074332f73c837.71a4f21c.png)

You will notice there are options for a [Configure flow](/docs/build-an-integration/getting-started/build-an-app-for-your-messenger/request-flows#configure-flow) webhook URL and a [Submit Sheet flow](/docs/build-an-integration/getting-started/build-an-app-for-your-messenger/sheets-flow#submit-sheet-flow) webhook URL. We won't cover these in this tutorial, but you can find out more information on how to set them up [from the docs](/docs/build-an-integration/getting-started/build-an-app-for-your-messenger/messenger-apps-lifecycle).

Hit the save button and the toggle near the title should switch to "On."

### Add the app to your home screen

Since we selected "Place on the Messenger home screen," there is one more set up step to make sure that the app is available in the intended place.

Go back to your Intercom workspace to [Messenger & Omnichannel > Messenger manage settings](https://app.intercom.com/a/apps/_/messenger/web?section=layout-and-spaces&tab=content).

Under "Customize Home with apps," click the "Add an app" button at the bottom and choose your app. Once it's added, you should see a preview of what it will look like in the Messenger on the right.

![Messenger app preview](/assets/messenger_app_preview.0265bd13f8b1026ceaf10329639ee39c49b29278e3772eda876101c74e1ea59c.71a4f21c.png)

Now if you go back to your Replit webview, the app should display on the Messenger home screen when you open the Messenger.

Problems adding your app to the Messenger?
If you can see your app is running but you get an error when trying to add it to the Messenger, your URLs may be incorrect.

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

This means that when clicked, it will trigger a [submit request](/docs/canvas-kit#submit-request) and hit the submit endpoint. You can call the submit request as many times as you would like in a user's session with your app.

Take a look at the `finalCanvas` object. This is intended to display after a user has submitted their feedback and rating on the `initialCanvas` of the app.

```javascript
const finalCanvas = {
  canvas: {
    content: {
      components: [
        {
          type: "text",
          id: "thanks",
          text: "Thanks for letting us know!",
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
```

You'll notice that the `id` values of each button components are unique: These values are sent in the request as a value called `component_id`. You can use this value to take different actions within the `submit` request.

Now in your `submit` endpoint, you can check the `component_id` of the request. If it's the `submit_button` from the initial canvas, you can send the final canvas.

However, if the `component_id` is `refresh_button`, or anything else, you can send the user back to the start of the flow by showing the initial canvas again.

```javascript
app.post("/submit", (request, response) => {
  console.log(request.body.component_id)
  if (request.body.component_id == "submit_button") {
    response.send(finalCanvas);
  } else {
    response.send(initialCanvas);
  }
});
```

If you want to see the value of `component_id` you can use a log statement to see it in your terminal.

You can use the conditions in the `submit` request to make as many customizations as you would like.

## Try it out

Now go back to your Messenger and test out the app. You should be able to submit feedback in the form and hit the "Submit another" button to return to the start.

![The Messenger app showing the final canvas](/assets/messenger_app_final_canvas.0e11b4cfebc2b8b6a1ceb8b28232e3ddbb2f55069e0fadea02a8eca00ddc8f0d.71a4f21c.png)

In this tutorial you created your first app for the Intercom Messenger using Canvas Kit. While Inbox apps and Messenger apps [appear to different audiences](/docs/canvas-kit#locations--types), you can also build them so that they work together.

Feedback and questions
How did it go? Send any feedback in the form at the bottom, and you can always contact us with questions via the Messenger in the bottom right.

## Next steps

Deploy with Replit
If you're ready to deploy your app you can do so right from Replit. However, Replit test accounts are free, but deployments are a premium feature. You can see the costs on the [Replit pricing page](https://replit.com/pricing).

- [Learn more](/docs/build-an-integration/canvas-kit) about Canvas Kit from the reference docs
- Check out the other [interactive](https://developers.intercom.com/docs/references/canvas-kit/interactivecomponents/button/) and [presentation](https://developers.intercom.com/docs/references/canvas-kit/presentationcomponents/data-table/) components available for Messenger apps
- [Build an app](/docs/build-an-integration/getting-started/build-an-app-for-your-inbox) for your Inbox
- [Install](/docs/build-an-integration/learn-more/authentication/installing-uninstalling-apps) your app