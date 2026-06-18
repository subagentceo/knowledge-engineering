# Build an App using Sheets

About this tutorial
This tutorial is written in Node.js but can be adapted for any programming language of your choice. The estimated time to complete this tutorial is 30 minutes. You can find the full example code on [Replit](https://replit.com/@IntercomDevs/Build-a-Messenger-App-using-Sheets?v=1).

## Overview

This tutorial will walk you through building a scheduling app for the Intercom Messenger using [Canvas Kit sheets](/docs/canvas-kit#sheets--optional). Sheets allow you to utilize an iframe within your Messenger app to create a customized experience and use your own styling.

At the end of this tutorial you will have a working example Messenger app in your workspace that can be used by users, visitors and leads.

![what your finished sheets app will look like](/assets/messenger_sheets_intro.feb6141ad541e255623017acf52d562bd5d11a2e767b73aa6d44031fb21ccc54.71a4f21c.png)

Sheets in the Messenger
Sheets can only be used for Messenger apps and are not usable for building Inbox apps.

## Getting started

To complete this tutorial you need:

- An Intercom workspace. You can use your paid workspace, or a free Intercom [development workspace](https://app.intercom.com/admins/sign_up/developer)
- A free [Replit account](https://replit.com/signup)


This is the full sample server code of what you will build:

```javascript
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "frame-src 'self' https://intercom-sheets.com",
  );
  res.setHeader("X-Requested-With", "XMLHttpRequest");
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname)));

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const initialCanvas = {
  canvas: {
    content: {
      components: [
        {
          type: "text",
          id: "book-meeting",
          text: "Book a Meeting",
          align: "center",
          style: "header",
        },
        {
          type: "button",
          label: "See dates",
          style: "primary",
          id: "submit_button",
          action: {
            type: "sheet",
            url: "https://your-replit-url.replit.app/sheet",
          },
        },
      ],
    },
  },
};

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Send the first canvas which will display a button
app.post("/initialize", (req, res) => {
  res.send(initialCanvas);
});

// Handle submit actions (required webhook, returns the current canvas)
app.post("/submit", (req, res) => {
  res.send({ canvas: req.body.current_canvas });
});

/*
When this endpoint is called, it will decode and verify the user, then display the sheet in the iFrame.
*/
app.post("/sheet", (req, res) => {
  const jsonParsed = JSON.parse(req.body.intercom_data);
  
  const encodedUser = jsonParsed.user;

  console.log(encodedUser);

  let decodedUser = decodeUser(encodedUser);

  console.log(decodedUser);

  res.sendFile(path.join(__dirname, "public", "sheet.html"));
});

/*
When this endpoint is called from within the sheet, it will:
- close the sheet
- gather the user-submitted data
- display the final canvas you would like to show the user

You could also take the user data and pass it from here to perform other actions.
*/
app.post("/submit-sheet", (req, res) => {
  // you can get data about the contact, company, and sheet from the request
  console.log(req.body);

  const chosenDate = new Date(req.body.sheet_values.date);

  // Extract the date part in YYYY-MM-DD format
  const displayDate = chosenDate.toISOString().split("T")[0];

  const finalCanvas = {
    canvas: {
      content: {
        components: [
          {
            type: "text",
            id: "closing",
            text: "Thanks! Your meeting is booked for " + displayDate,
            align: "center",
            style: "header",
          },
        ],
      },
    },
  };

  res.send(finalCanvas);
});

/*
This function can be used to decode the user object, which will allow you to verify the identity of the user.
*/
function decodeUser(encodedUser) {
  const masterkey = process.env["CLIENT_SECRET"];

  // base64 decoding
  const bData = Buffer.from(encodedUser, "base64");

  // convert data to buffers
  const ivlen = 12;
  const iv = bData.slice(0, ivlen);

  const taglen = 16;
  const tag = bData.slice(bData.length - taglen, bData.length);

  const cipherLen = bData.length - taglen;
  const cipherText = bData.slice(ivlen, cipherLen);

  let hash = crypto.createHash("sha256").update(masterkey);
  let key = Buffer.from(hash.digest("binary"), "binary"); //buffer from binary string.

  // AES 256 GCM Mode
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);

  // encrypt the given text
  let decrypted = decipher.update(cipherText, "binary", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
```

Running the code
If you'd rather run the code in your own IDE you can, but you will need to use a tool like [ngrok](https://ngrok.com/) to expose the endpoints and provide them in the Intercom.

### Set up

Create a new app in your workspace by going to the [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub) and clicking New app.

In the Replit template, click Use template to make your own copy.

Once your app is created, click on "Basic information" in the Developer Hub sidebar. This is where you will find your Client secret. You will use this to decrypt the encrypted user object before you open the sheet, so you can verify the request comes from a legitimate Intercom user.

![create a new app](/assets/messenger_sheets_client_secret.0cefe8b043fc34e12d12434d58b8f9f19adc9a4a9d45fdd9f0a112232d9d2d5d.71a4f21c.png)

Add this [as a secret](https://docs.replit.com/replit-workspace/workspace-features/secrets#add-secrets) in your Replit with the name `CLIENT_SECRET`.

### The app code

In your Replit copy open up `index.html`. This includes JavaScript that adds the Messenger to the page and displays the endpoints you will need.

The `sheets.html` file includes the code for the datepicker that will display in the iframe.

The server code for running your application is in `index.js`.

We're using [Express](https://expressjs.com/) as the framework and have set that up along with:

- [body-parser](https://www.npmjs.com/package/body-parser) to be able to parse the request bodies.
- [cors](https://www.npmjs.com/package/cors) to enable Cross-Origin Requests.
- [crypto](https://nodejs.org/api/crypto.html#crypto) to use for decoding the user object.


Install these by running `npm install` in the Replit console.

## The initialize request

First look at `initialCanvas`:

```javascript
const initialCanvas = {
  canvas: {
    content: {
      components: [
        {
          type: "text",
          id: "book-meeting",
          text: "Book a Meeting",
          align: "center",
          style: "header",
        },
        {
          type: "button",
          label: "See dates",
          style: "primary",
          id: "submit_button",
          action: {
            type: "sheet",
            url: "https://your-replit-url.replit.app/sheet",
          },
        },
      ],
    },
  },
};
```

This is a [Canvas object](https://developers.intercom.com/docs/references/canvas-kit/responseobjects/canvas/), which defines what will display to the user when they first see the Messenger app. In this example it contains a content object with a component that displays a button.

When the `/initialize` endpoint is fired it will send the `initialCanvas` object, which will kick off the [Canvas Kit flow](/docs/build-an-integration/getting-started/build-an-app-for-your-messenger/request-flows#initialize-flow).

```javascript
app.post("/initialize", (req, res) => {
  res.send(initialCanvas);
});
```

### The sheet endpoint

The submit button contains an [action](https://developers.intercom.com/docs/references/canvas-kit/actioncomponents/sheets-action):

```javascript
action: {
  type: "sheet",
  url: "https://your-replit-url.replit.app/sheet",
}
```

This calls the endpoint that opens the sheet. You will need to replace `https://your-replit-url.replit.app` with your own Replit URL. Make sure to keep the `/sheet` path at the end of the URL.

The Replit link
If you are using the free version of Replit you will first need to run the code and then copy the link from the webview or display on the main page of the app in order to get the link. Even though Replit provides a `REPLIT_DEV_DOMAIN` as an environment variable, they sometimes add additional characters after it in the URL.

For easier usage you may want to use a [custom domain](https://docs.replit.com/cloud-services/deployments/custom-domains) or instead run your app using [ngrok](https://ngrok.com/).

## Set up the webhooks

To see how it works, set up the webhooks and run the app.

### Add the Messenger

In `index.html` starting on line 49 you should see the script that will start the Intercom Messenger.

Replace `YOUR-WORKSPACE-ID` with your own workspace ID. You can grab it from the URL of your Intercom workspace `https://app.intercom.com/a/apps/YOUR-WORKSPACE-ID`.

Workspace ID and App ID
You may see references to "Workspace ID" and "App ID". These are the same values.

Click "Run" at the top of your Replit editor. If you view the webview or open it in a new tab, you should see a list of your endpoints and the Messenger in the bottom right.

![successfully running app with Messenger](/assets/messenger_sheets_index.66e73f89c0de75642266952e231679fb929f712bb34dddeb981e52d424d3d819.71a4f21c.png)

### Add the webhooks

Back in your Developer Hub, in the Canvas Kit page click "For users, leads, and visitors."

You will see checkboxes and URL fields. Add the following webhook URLs, replacing `https://your-replit-url.replit.app` with your actual Replit URL:

| Webhook | URL |
|  --- | --- |
| Initialize | `https://your-replit-url.replit.app/initialize` |
| Submit | `https://your-replit-url.replit.app/submit` |
| Submit Sheet | `https://your-replit-url.replit.app/submit-sheet` |


Make sure to check the boxes for each webhook you add.

![add submit and initialize endpoints](/assets/messenger_sheets_developer_hub.b56f5a57b6dee477dcb8539a847012a7a3c990ed9d55b29b916ac78148679917.71a4f21c.png)

Hit the save button and the toggle near the title should switch to "On."

Cannot POST / error?
If you see a "Cannot POST /" error, double-check that your webhook URLs include the correct paths (`/initialize`, `/submit`, `/submit-sheet`). Using just your base URL without a path will cause this error.

### Add the app to your home screen

You have the option to send the app in a message, conversation, or to place it on the Messenger home screen. For easy testing, add it to the home screen.

Go back to your Intercom workspace to [Messenger & Omnichannel > Messenger manage settings](https://app.intercom.com/a/apps/_/messenger/web?section=layout-and-spaces&tab=content). Under "Customize Home with apps," click the "Add an app" button at the bottom and choose your app.

![Messenger app preview](/assets/messenger_sheets_add_to_messenger.138c9bba48fe68dc1553696bb167ffa9af68cfc5ef442f4b9fc8354c15e7af0d.71a4f21c.png)

Now if you go back to your Replit webview, the app should display on the Messenger home screen when you open the Messenger.

Problems adding your app to the Messenger?
If you can see your app is running but you get an error when trying to add it to the Messenger, your URLs may be incorrect.

## The sheet

Open up the Messenger in your webview and click "See dates".

Back in your console, you should see two logged items: a long encoded string, and a human-readable user object. When the `/sheet` endpoint is called, you are also calling a function called `decodeUser()` that decrypts the user object so you can validate that the request is coming from a logged-in Intercom user.

```javascript
app.post("/sheet", (req, res) => {
  const jsonParsed = JSON.parse(req.body.intercom_data);
  const encodedUser = jsonParsed.user;

  console.log(encodedUser);

  let decodedUser = decodeUser(encodedUser);

  console.log(decodedUser);

  res.sendFile(path.join(__dirname, "public", "sheet.html"));
});
```

Then, it will send the sheet file to display.

In order for your sheet to display properly, you need to ensure that you have set the correct headers, including adding intercom-sheets.com to the content security policy, and allowing enable requests made using XMLHTTPRequest.

This is set on line 14 of `index.js`

```javascript
  res.setHeader(
    "Content-Security-Policy",
    "frame-src 'self' https://intercom-sheets.com",
  );
  res.setHeader("X-Requested-With", "XMLHttpRequest");
```

More on CORS
For more information on Cross-Origin Resource Sharing (CORS) see [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

You also need to ensure you have added the Messenger sheets library. This is done on line 6 of `sheet.html`

`<script src="https://s3.amazonaws.com/intercom-sheets.com/messenger-sheet-library.latest.js"></script>`

Once this is added, you can include anything you want in this HTML file. For this example app, we'll add the [easepick datepicker](https://easepick.com/packages/bundle.html) using the methods the developer has included in the documentation.

You will also need to add a button to handle submitting the data.

`<button id="book">Book Meeting</button>`

For the event handler that handles the button click, You must include the `submitSheet()` method from the library to close the sheet and trigger a request to the `submit-sheet` webhook.

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("book");

  submitButton.addEventListener("click", () => {
    const submittedDate = picker.options.date;

    INTERCOM_MESSENGER_SHEET_LIBRARY.submitSheet({
      date: submittedDate,
    });
  });
});
```

For this, you will pass the date chosen back to the server so that you can use it in the final canvas to display back to the user. Choose a date to submit and close the sheet.

### Submitting the sheet

Once the `submit-sheet` endpoint is called, back in your console you should see the logged request body. This should include information about the contact, the current canvas object, and the date that was submitted as a value in `submitSheet()`.

```json
{
  workspace_id: 'YOUR-WORKSPACE-ID',
  workspace_region: 'US',
  customer: {
    type: 'user',
    ...
  },
  contact: {
    type: 'contact',
    ...
  },
  context: {
    locale: 'en',
    ...
  },
  current_canvas: { content: { components: [Array] } },
  sheet_values: { date: '2024-07-30T23:00:00.000Z' }
}
```

You can then convert the date to a more readable format, and create a new canvas object to send back to the customer. This will then take them back to their Messenger home to display the final canvas.

```javascript
  const finalCanvas = {
    canvas: {
      content: {
        components: [
          {
            type: "text",
            id: "closing",
            text: "Thanks! Your meeting is booked for " + displayDate,
            align: "center",
            style: "header",
          },
        ],
      },
    },
  };
```

Once you're back to the Messenger home, it should look like this:

![The Messenger app showing the final canvas](/assets/messenger_sheets_final_date.a519a964145d0302a52001a5bec51d1a0c2b87b46e4af40488dbec3ae5554fce.71a4f21c.png)

## Conclusion

In this tutorial you created an app with Canvas Kit sheets to display your own custom code in an iFrame.

![Intercom sheets app](/assets/messenger_sheets_intro.feb6141ad541e255623017acf52d562bd5d11a2e767b73aa6d44031fb21ccc54.71a4f21c.png)

While we only tested out adding it to the Messenger home, you can also try out sending your app to customers via Messenger or email from your help desk. Your app should already be installed in your workspace, so you may click command+K or the shortcuts icon from within a conversation to send the app.

![The Messenger app showing the final canvas](/assets/messenger_sheets_in_app.4d128a2653a77f301edcb02fe7146ebd96ee098c9a8f139092aa723637021cd4.71a4f21c.png)

Feedback and questions
How did it go? Send any feedback in the form at the bottom, and you can always contact us with questions via the Messenger in the bottom right.

## Next steps

Deploy with Replit
If you're ready to deploy your app you can do so right from Replit. However, Replit test accounts are free, but deployments are a premium feature. You can see the costs on the [Replit pricing page](https://replit.com/pricing).

- [Learn more](/docs/canvas-kit#sheets--optional) about Canvas Kit from the reference docs
- Read about [Sheets flows](/docs/build-an-integration/getting-started/build-an-app-for-your-messenger/sheets-flow)
- [Build an app](/docs/build-an-integration/getting-started/build-an-app-for-your-messenger) with Messenger components