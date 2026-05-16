# Create a Fin AI Integration with Slack

About this tutorial
This tutorial is written in Node.js and is aimed toward developers familiar with webhooks and making API requests. The estimated time to complete it is 20 minutes. Find the code to get started on [Replit](https://replit.com/@IntercomDevs/Integrate-Fin-AI-Agent-with-Slack?v=1).

## Overview

With the new Operator Replied [Conversations Webhook](https://developers.intercom.com/docs/references/preview/webhooks/webhook-models#conversation-topics:~:text=conversation.operator.replied), you can relay messages sent by Fin into other apps and services.

In this tutorial, you will set up your own integration between Fin AI Agent with Slack using Intercom's APIs and webhooks, which will allow users to message Fin directly from Slack and receive AI-powered responses in the same thread.

![An example of the end-result conversation thread with Fin replies](/assets/slack_with_fin.8719e57d7580e82a739c12b9f2ced7b824a2e9edfffb3fbb301c042019addfcb.71a4f21c.png)

## Getting started

To complete this tutorial you need:

- An Intercom workspace. You can use your paid workspace, or a free Intercom [development workspace](https://app.intercom.com/admins/sign_up/developer)
- A free [Replit account](https://replit.com/signup)
- A free [Slack app](https://api.slack.com/quickstart).


About Fin AI Agent
Fin AI is a paid product, but trials are available. See the [pricing page](https://www.intercom.com/pricing) or click the Messenger in the bottom right to find out more about Fin pricing.

To get started, open up [Replit](https://replit.com/@IntercomDevs/Integrate-Fin-AI-Agent-with-Slack?v=1) and click "Remix Template".

This is the full sample code:


```javascript
import axios from "axios";
import express from "express";
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;
app.use(bodyParser.json());

const SLACK_TOKEN = process.env.SLACK_BOT_TOKEN;
const INTERCOM_TOKEN = process.env.INTERCOM_ACCESS_TOKEN;
const SLACK_BOT_USER_ID = process.env.SLACK_BOT_USER_ID;

const db = new sqlite3.Database(join(__dirname, "conversations.db"));

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slack_thread_ts TEXT UNIQUE NOT NULL,
      slack_channel_id TEXT NOT NULL,
      intercom_conversation_id TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS processed_webhooks (
      webhook_id TEXT PRIMARY KEY,
      processed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// 1️⃣ Listen for new Slack messages
app.post("/slack-events", async (req, res) => {
  console.log("Received Slack request:", JSON.stringify(req.body, null, 2));

  const { event, challenge } = req.body;

  if (challenge) {
    console.log("✅ Handling Slack verification challenge");
    return res.status(200).json({ challenge });
  }

  console.log("USER== ", event.user);
  // Ignore messages from our bot
  if (event.user === SLACK_BOT_USER_ID) {
    console.log("⚠️ Ignoring message from our bot");
    return res.status(200).send("Ignored bot message");
  }

  // Only process new messages, not thread replies
  if (event && event.type === "message" && !event.subtype && !event.thread_ts) {
    // Use this to set up the initial message
    const slackThreadTs = event.ts;
    const slackChannelId = event.channel;
    const slackUserId = event.user;
    const slackMessage = event.text;

    try {
      const contactId = await setUpContact(slackUserId);
      // Create new Intercom conversation
      const intercomResponse = await axios.post(
        "https://api.intercom.io/conversations",
        {
          from: { type: "user", id: contactId },
          body: slackMessage,
          message_type: "inapp",
        },
        {
          headers: {
            Authorization: `Bearer ${INTERCOM_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );

      const intercomConversationId = intercomResponse.data.conversation_id;

      // Use a transaction to ensure atomicity
      await new Promise((resolve, reject) => {
        db.run("BEGIN TRANSACTION");
        db.run(
          `INSERT INTO conversations (slack_thread_ts, slack_channel_id, intercom_conversation_id) 
           VALUES (?, ?, ?)`,
          [slackThreadTs, slackChannelId, intercomConversationId],
          (err) => {
            if (err) {
              db.run("ROLLBACK");
              reject(err);
            } else {
              db.run("COMMIT");
              resolve();
            }
          },
        );
      });

      console.log(
        `✅ Intercom conversation created: ${intercomConversationId}`,
      );
      return res.status(200).send("OK");
    } catch (error) {
      console.error(
        "❌ Error creating Intercom conversation:",
        error.response?.data || error,
      );
      return res.status(500).send("Error creating Intercom conversation");
    }
  } // Handle thread replies
  else if (
    event &&
    event.type === "message" &&
    !event.subtype &&
    event.thread_ts
  ) {
    const slackThreadTs = event.thread_ts;
    const slackMessage = event.text;
    const slackUserId = event.user;

    try {
      // First, retrieve existing conversation from database
      db.get(
        `SELECT intercom_conversation_id FROM conversations WHERE slack_thread_ts = ?`,
        [slackThreadTs],
        async (err, row) => {
          if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).send("Database error");
          }

          if (!row) {
            console.warn("⚠️ No matching conversation found in database.");
            return res.status(404).send("Conversation not found");
          }

          const intercomConversationId = row.intercom_conversation_id;

          // Get or create the contact to reply from correct user context
          const contactId = await setUpContact(slackUserId);

          // Send reply to existing Intercom conversation
          await axios.post(
            `https://api.intercom.io/conversations/${intercomConversationId}/reply`,
            {
              message_type: "comment",
              type: "user",
              body: slackMessage,
              intercom_user_id: contactId,
            },
            {
              headers: {
                Authorization: `Bearer ${INTERCOM_TOKEN}`,
                "Content-Type": "application/json",
              },
            },
          );

          console.log(
            `✅ Reply added to Intercom conversation: ${intercomConversationId}`,
          );

          return res.status(200).send("Reply sent to Intercom");
        },
      );
    } catch (error) {
      console.error(
        "❌ Error replying to Intercom conversation:",
        error.response?.data || error,
      );
      return res.status(500).send("Error replying to Intercom conversation");
    }
  }
});

// 2️⃣ Listen for Intercom replies
app.post("/intercom-webhook", async (req, res) => {
  try {
    console.log(
      "📝 Received Intercom webhook payload:",
      JSON.stringify(req.body, null, 2),
    );

    if (
      req.body.type === "notification_event" &&
      req.body.data?.item?.type === "ping"
    ) {
      console.log("✅ Intercom Webhook Test Request Received");
      return res
        .status(200)
        .json({ message: "Webhook test received successfully" });
    }

    const webhookId = req.body.id;
    console.log("Processing webhook ID:", webhookId);

    if (!webhookId) {
      console.log("⚠️ No webhook ID found in payload");
      return res.status(400).json({ error: "Missing webhook ID" });
    }

    // Use a transaction for the entire webhook processing
    try {
      await new Promise((resolve, reject) => {
        db.run("BEGIN TRANSACTION");

        // Check and mark as processed in the same transaction
        db.get(
          "SELECT webhook_id FROM processed_webhooks WHERE webhook_id = ?",
          [webhookId],
          async (err, row) => {
            if (err) {
              db.run("ROLLBACK");
              reject(err);
              return;
            }

            if (row) {
              db.run("COMMIT");
              resolve();
              return res
                .status(200)
                .json({ message: "Webhook already processed" });
            }

            // Mark as processed before processing
            db.run(
              "INSERT INTO processed_webhooks (webhook_id) VALUES (?)",
              [webhookId],
              (err) => {
                if (err) {
                  db.run("ROLLBACK");
                  reject(err);
                  return;
                }
                db.run("COMMIT");
                resolve();
              },
            );
          },
        );
      });

      const conversation = req.body.data?.item;
      if (!conversation) {
        return res.status(400).json({ error: "No conversation found" });
      }

      const conversationPart =
        conversation.conversation_parts?.conversation_parts[0];
      if (!conversationPart) {
        return res.status(400).json({ error: "No conversation part found" });
      }

      const message = conversationPart.body || "No message content";
      const intercomConversationId = conversation.id;

      // Add debug logging
      console.log("Looking up conversation with ID:", intercomConversationId);

      // Get Slack details from database
      const slackDetails = await new Promise((resolve, reject) => {
        db.get(
          `SELECT slack_thread_ts, slack_channel_id 
           FROM conversations 
           WHERE intercom_conversation_id = ?`,
          [intercomConversationId],
          (err, row) => {
            if (err) reject(err);
            else resolve(row);
          },
        );
      });

      if (!slackDetails) {
        console.error(
          "❌ Error retrieving Slack details: No matching conversation found",
        );
        return res
          .status(400)
          .json({ error: "Conversation mapping not found" });
      }

      // Add debug logging
      console.log("Found Slack details:", {
        channel: slackDetails.slack_channel_id,
        thread_ts: slackDetails.slack_thread_ts,
        message: message,
      });

      // Now send to Slack
      const slackResponse = await axios.post(
        "https://slack.com/api/chat.postMessage",
        {
          channel: slackDetails.slack_channel_id,
          thread_ts: slackDetails.slack_thread_ts,
          text: formatFullMessageForSlack(message),
          mrkdwn: true,
        },
        {
          'Content-Type': 'application/json',
          headers: { Authorization: `Bearer ${SLACK_TOKEN}` },
        },
      );

      // Log Slack's response
      console.log(
        "Slack API Response:",
        JSON.stringify(slackResponse.data, null, 2),
      );

      if (!slackResponse.data.ok) {
        throw new Error(`Slack API Error: ${slackResponse.data.error}`);
      }

      console.log("✅ Reply sent to Slack thread");
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error(
        "❌ Error processing Intercom webhook:",
        error.response?.data || error,
      );
      return res.status(500).json({ error: "Failed to process webhook" });
    }
  } catch (error) {
    console.error(
      "❌ Error processing Intercom webhook:",
      error.response?.data || error,
    );
    return res.status(500).json({ error: "Failed to process webhook" });
  }
});

// Helper function to get contact by external ID
async function getContactByExternalId(externalId) {
  try {
    const response = await axios.get(
      `https://api.intercom.io/contacts/find_by_external_id/${externalId}`,
      {
        headers: {
          Authorization: `Bearer ${INTERCOM_TOKEN}`,
          Accept: "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // Contact does not exist
    }
    throw error; // Other errors
  }
}

// Helper function to create contact
async function createContact(externalId, email, name) {
  const payload = {
    external_id: externalId,
    email: email,
    name: name,
  };

  const response = await axios.post(
    `https://api.intercom.io/contacts`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${INTERCOM_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );

  return response.data;
}

// Usage example:
async function setUpContact(slackUserId) {
  let userInfo = await getSlackUserInfo(slackUserId);

  try {
    const externalId = slackUserId;
    const email = userInfo.email;
    const name = userInfo.name;

    let contact = await getOrCreateContact(externalId, email, name);
    return contact.id;
  } catch (err) {
    console.error("Error handling contact:", err.response?.data || err.message);
  }
}

// Main function: Get or create contact
async function getOrCreateContact(externalId, email, name) {
  let contact = await getContactByExternalId(externalId);

  if (contact) {
    console.log("Contact already exists:");
  } else {
    console.log("Contact not found. Creating contact...");
    contact = await createContact(externalId, email, name);
    console.log("New contact created:");
  }

  return contact;
}

// Fetch Slack user details
async function getSlackUserInfo(userId) {
  try {
    const response = await axios.get("https://slack.com/api/users.info", {
      params: {
        user: userId,
      },
      headers: {
        Authorization: `Bearer ${SLACK_TOKEN}`,
      },
    });

    if (!response.data.ok) {
      throw new Error(response.data.error);
    }

    const user = response.data.user;
    const name = user.real_name || user.profile.display_name || user.name;
    const email = user.profile.email;

    return { name, email };
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    throw error;
  }
}

function formatFullMessageForSlack(htmlContent) {
  // First, extract the sources section if it exists
  const sourcesMatch = htmlContent.match(/\nSources:.*$/s);
  let sourcesSection = "";
  let mainContent = htmlContent;

  if (sourcesMatch) {
    sourcesSection = sourcesMatch[0];
    mainContent = htmlContent.replace(/\nSources:.*$/s, "");
  }

  // Process main content (remove HTML tags)
  let cleaned = mainContent
    .replace(/<p>/g, "\n")
    .replace(/<\/p>/g, "\n")
    .replace(/<br>/g, "\n")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<[^>]+>/g, "") // Remove remaining HTML tags
    .replace(/\n\s*\n/g, "\n") // Remove multiple newlines
    .trim();

  // Format numbered lists
  cleaned = cleaned.replace(/(\d+\.)\s*/g, "\n$1 ");

  // Remove any remaining HTML entities from main content
  cleaned = cleaned
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  // Process sources section to preserve hyperlinks
  if (sourcesSection) {
    // Convert HTML links to Slack markdown format
    sourcesSection = sourcesSection.replace(
      /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/g,
      "<$1|$2>",
    );
    // Remove other HTML tags but keep the links
    sourcesSection = sourcesSection.replace(/<[^a][^>]*>/g, "");
    // Add the processed sources section back
    cleaned += "\n" + sourcesSection;
  }

  return cleaned.trim();
}

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
```

Running the code
If you'd rather run the code in your own IDE you can do so, but you will need a way to access the publicly exposed endpoints to provide to the Intercom and Slack apps.

## Set up your Intercom app

First [create an Intercom app](https://developers.intercom.com/docs/build-an-integration/getting-started#step-2-create-an-app), in your Developer Hub, then grab your Intercom Access Token and add it to your Replit secrets as `INTERCOM_TOKEN`.

Over in Replit, hit "Run" at the top of the page. Don't worry if you don't see anything in the webview since this is only a back-end app: copy the Dev URL from the Webview or Networking tab.

Back in your Intercom Developer Hub, under API Version select "Preview" from the dropdown and click save.

Choose Webhooks from the sidebar and then paste in your unique Replit link where the app is running, plus the endpoint where you want to listen for Intercom events. It should look something like this:

`https://abc123000-your-url.spock.replit.dev/intercom-webhook`

From the topics dropdown, choose `conversation.operator.replied` and click save. You should see a green banner on the top of the screen indicating the test ping to your endpoint was successful. If you navigate back to your console in Replit, you should also see the below logged output:


```
📝 Received Intercom webhook payload: {
  "type": "notification_event",
  "app_id": "hfegwpea",
  "data": {
    "type": "notification_event_data",
    "item": {
      "type": "ping",
      "message": "This is a ping notification test message."
    }
  },
  "links": {},
  "id": null,
  "topic": "ping",
  "delivery_status": null,
  "delivery_attempts": 1,
  "delivered_at": 0,
  "first_sent_at": 1746085368,
  "created_at": 1746085368,
  "self": null
}
✅ Intercom Webhook Test Request Received
```

## Set up the Slack app

Go to [Your apps](https://api.slack.com/apps) and click "Create New App". Select the choice From a manifest, and edit the below manifest to add your own app details, and most importantly add your own Slack events endpoint in the `request_url` field, similarly to what you did previously for the Intercom endpoint.


```json
{
    "display_information": {
        "name": "Intercom Slack Tutorial",
        "description": "Your app description",
        "background_color": "#2e2a2e",
        "long_description": "Use this manifest along with the detailed tutorial on setting up the Intercom Slack integration, available in the Intercom developer documentation. :) Happy coding and integrating!"
    },
    "features": {
        "bot_user": {
            "display_name": "Intercom Slack [Your App Name Here]",
            "always_online": false
        }
    },
    "oauth_config": {
        "scopes": {
            "bot": [
                "app_mentions:read",
                "channels:history",
                "channels:read",
                "chat:write",
                "chat:write.public",
                "users:read",
                "users:read.email",
                "users.profile:read"
            ]
        }
    },
    "settings": {
        "event_subscriptions": {
            "request_url": "https://abc123000-your-url.spock.replit.dev/slack-events",
            "bot_events": [
                "message.channels"
            ]
        },
        "org_deploy_enabled": false,
        "socket_mode_enabled": false,
        "token_rotation_enabled": false
    }
}
```

Now you have a Slack app that will have the required OAuth scopes in order for your app to work, primarily to write within the chat and to read a user. It will also send any events for those topics to the `request_url` that you set.

From Basic Information grab the Slack signing secret and immediately add it to your secrets as `SLACK_SIGNING_SECRET`.

Next go to Install App and follow the prompts to install the app into your workspace. You should now have a bot token that looks something like `xoxb-00000`. Copy the bot token and immediately add it to your secrets as `SLACK_BOT_TOKEN`.

The last step is to add the App to the Slack channel where you would like for Fin to reply. Go to the channel and navigate to More Actions >  Settngs > Integrations and click "Add an App". The app should now be available and ready to use in the channel.

Now in your Replit console you should see something similar to the below logged:


```json
Received Slack request: {
  "token": "Kvhw9BaC8Gs1ay1YeeoFxtkO",
  "team_id": "T0804AJR0FK",
  "context_team_id": "T0804AJR0FK",
  "context_enterprise_id": null,
  "api_app_id": "A08QEG57H37",
  "event": {
    "subtype": "channel_join",
    "user": "U08QKLP20QK",
    "text": "<@U08QKLP20QK> has joined the channel",
    "inviter": "U07V5KTT090",
    "type": "message",
    "ts": "1746086456.776639",
    "channel": "C084VRR9WHL",
    "event_ts": "1746086456.776639",
    "channel_type": "channel"
  },
  "type": "event_callback",
  "event_id": "Ev08Q2BTMXB9",
  "event_time": 1746086456,
  "authorizations": [
    {
      "enterprise_id": null,
      "team_id": "T0804AJR0FK",
      "user_id": "U08QKLP20QK",
      "is_bot": true,
      "is_enterprise_install": false
    }
  ],
  "is_ext_shared_channel": false,
  "event_context": "4-eyJldCI6Im1lc3NhZ2UiLCJ0aWQiOiJUMDgwNEFKUjBGSyIsImFpZCI6IkEwOFFFRzU3SDM3IiwiY2lkIjoiQzA4NFZSUjlXSEwifQ"
}
```

Grab the `user_id` value and add it to your secrets as `SLACK_BOT_USER_ID`. Don't forget this step! If you do, the app won't be able to check for bot replies and it will send every message that's incoming — you can see where we check for this on line 53.

## Create an Intercom Workflow with Fin

If you haven't set up Fin in your workspace, you can configure it in just a few steps by using a Workflow.

In your Intercom Workspace, go to [workflows](https://app.intercom.com/a/apps/_/automation/workflows-overview) and click "New workflow". Choose Create From Scratch > Start of conversation > When a customer sends their first message.

In the first widget on the screen, click in and under Audience choose Add audience rule > Created via API and set it to true. This will ensure that conversations created via the API, like you are setting up in this app, will enter this workflow.

![Set up the Created via API Audience](/assets/fin_workflow_trigger.90535d74196491d3f938dea5066da85e078cc66792ae5bd0944a2396e41f0c18.71a4f21c.png)

Next, choose Let Fin Answer in the A Path of the workflow. Provide the path that you want to incorporate for when a customer says they want to talk to a person, then hit save and set live. Your workflow should look something like the below.

![Your final Fin-first workflow ](/assets/fin_workflow_canvas.3974c5ae0b425165d87ad54fa71a2f7e137a2348cd238034ddd8f050b8fd6a69.71a4f21c.png)

## Test out the app

You can try out the app by sending your first message in the Slack channel. There are detailed logs that you can follow along with to see what is happening.

Logs in the console
The logs in the code to display data in the console are only for debugging and educational purposes: they can be removed at any point.

When working correctly, the in-Slack experience should look like the below:

![An example of the end-result conversation thread with Fin replies](/assets/slack_with_fin.8719e57d7580e82a739c12b9f2ced7b824a2e9edfffb3fbb301c042019addfcb.71a4f21c.png)

If your app isn't working
If you are not seeing conversations created in Intercom or messages relayed into Slack, check the endpoint that you set up to ensure they are correct. You may also want to check that you are subscribed to the correct topic in the Intercom webhooks page — you should see a green "On" icon next to it in the list.

Here's a brief overview of what is happening in the code

### Creating a database to track threads

Here you are creating a database to track incoming requests so that it is possible to match them in the Slack threads. You alternatively could do this using custom data attributes, with `slack_thread_ts` and `slack_channel_id` as conversation attributes.


```
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slack_thread_ts TEXT UNIQUE NOT NULL,
      slack_channel_id TEXT NOT NULL,
      intercom_conversation_id TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS processed_webhooks (
      webhook_id TEXT PRIMARY KEY,
      processed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});
```

### Handling Slack events

When a message comes in from Slack, you need to relay it to Intercom in order to create the conversation, or create the reply. Note that the conversation endpoints for create and reply slightly differ, which is why they are handled differently.


```js
app.post("/slack-events", async (req, res) => {
  console.log("Received Slack request:", JSON.stringify(req.body, null, 2));

  const { event, challenge } = req.body;

  if (challenge) {
    console.log("✅ Handling Slack verification challenge");
    return res.status(200).json({ challenge });
  }

  // Ignore messages from our bot
  if (event.user === SLACK_BOT_USER_ID) {
    console.log("⚠️ Ignoring message from our bot");
    return res.status(200).send("Ignored bot message");
```

You will also need to add the thread to the database on the first call.


```js
await new Promise((resolve, reject) => {
  db.run("BEGIN TRANSACTION");
  db.run(
    `INSERT INTO conversations (slack_thread_ts, slack_channel_id, intercom_conversation_id) 
      VALUES (?, ?, ?)`,
    [slackThreadTs, slackChannelId, intercomConversationId],
    (err) => {
      if (err) {
        db.run("ROLLBACK");
        reject(err);
      } else {
        db.run("COMMIT");
        resolve();
      }
    },
  );
});
```

### Create or get contact details

You might notice here we call a function to try and get or create the Intercom contact using the Slack User ID.
For this example, we'll assume that you've saved the Slack User ID as an Intercom External Contact ID.


```js
    try {
      const contactId = await setUpContact(slackUserId);
      // Create new Intercom conversation
      const intercomResponse = await axios.post(
        "https://api.intercom.io/conversations",
        {
          from: { type: "user", id: contactId },
          body: slackMessage,
          message_type: "inapp",
        },
        {
          headers: {
            Authorization: `Bearer ${INTERCOM_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );
```

Using this pattern, you can use the Intercom [get contact by external ID endpoint](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/showcontactbyexternalid) along with the Slack [users.info](https://api.slack.com/methods/users.info) method to get the contact details and match it in both systems.


```js
// Set up the contact
async function setUpContact(slackUserId) {
  let userInfo = await getSlackUserInfo(slackUserId);

  try {
    const externalId = slackUserId;
    const email = userInfo.email;
    const name = userInfo.name;

    let contact = await getOrCreateContact(externalId, email, name);
    return contact.id;
  } catch (err) {
    console.error("Error handling contact:", err.response?.data || err.message);
  }
}

// Main function: Get or create contact
async function getOrCreateContact(externalId, email, name) {
  let contact = await getContactByExternalId(externalId);

  if (contact) {
    console.log("Contact already exists:");
  } else {
    console.log("Contact not found. Creating contact...");
    contact = await createContact(externalId, email, name);
    console.log("New contact created:");
  }

  return contact;
}

// Fetch Slack user details
async function getSlackUserInfo(userId) {
  try {
    const response = await axios.get("https://slack.com/api/users.info", {
      params: {
        user: userId,
      },
      headers: {
        Authorization: `Bearer ${SLACK_TOKEN}`,
      },
    });

    if (!response.data.ok) {
      throw new Error(response.data.error);
    }

    const user = response.data.user;
    const name = user.real_name || user.profile.display_name || user.name;
    const email = user.profile.email;

    return { name, email };
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    throw error;
  }
}
```

### Handling Intercom events

The Intercom endpoint is waiting for the Operator replies to come through and handling them accordingly. It's checking to find the webhook ID in the database, and then passing the Fin reply into the Slack API. You also have a function that will strip out the HTML formatting from the response body in the message so that it will appear nicely in the Slack message.


```js
// 2️⃣ Listen for Intercom replies
app.post("/intercom-webhook", async (req, res) => {
  try {
    console.log(
      "📝 Received Intercom webhook payload:",
      JSON.stringify(req.body, null, 2),
    );

    if (
      req.body.type === "notification_event" &&
      req.body.data?.item?.type === "ping"
    ) {
      console.log("✅ Intercom Webhook Test Request Received");
      return res
        .status(200)
        .json({ message: "Webhook test received successfully" });
    }

    const webhookId = req.body.id;
```

## Next steps

In this tutorial, you've successfully set up an integration where user messages from Slack channels create Intercom conversations routed to Fin. Fin generates AI-powered responses, which are posted back into the original Slack thread.

Next, you can set up the app to also include admin replies and handle them similarly, if a teammate were to respond back in the same conversation — you could do this by incorporating the `from_ai_agent` and `is_ai_answer` attributes from the [author object](https://developers.intercom.com/docs/references/preview/changelog#ai-agent-and-ai-answer-attributes-available-in-author).

The webhook payload contains these  fields to identify AI-generated responses:


```js
// Example of a conversation part in the webhook payload
{
  type: 'conversation_part',
  id: '12311',
  part_type: 'comment', // or 'quick_reply'
  body: 'This is a response from Fin',
  created_at: 1742578283,
  updated_at: 1742578283,
  author: {
    id: '7172395',
    type: 'bot',
    name: 'Fin',
    email: 'operator+hfegwpea@intercom.io',
    workflow_name: 'Renew Subscription',
    from_ai_agent: true,     // Indicates response came from an AI agent
    is_ai_answer: true       // Indicates this is a final answer from Fin
  }
}
```

You can use these fields to handle AI and non-AI responses differently:


```js
// Check if the response is from Fin AI
if (conversationPart.author && conversationPart.author.from_ai_agent) {
  console.log("Received response from Fin AI");
  
  // Check if this is a final answer
  if (conversationPart.author.is_ai_answer) {
    console.log("This is a final answer from Fin");
  }
}
```

You will also need to subscribe to the Admin replied webhook topic in order to access Admin replies.

You also might want to handle quick reply buttons used in workflows by utilizing the [quick reply objects in the API and webhook payloads](https://developers.intercom.com/docs/references/preview/changelog#send-quick-replies-via-the-api). Here's how you could approach formatting the Intercom-defined quick reply button values in Slack.


```js
// Enhanced webhook handling for quick replies
app.post("/intercom-webhook", async (req, res) => {
  try {
    // ... existing code ...
    
    const conversationPart = conversation.conversation_parts?.conversation_parts[0];
    if (!conversationPart) {
      return res.status(400).json({ error: "No conversation part found" });
    }
    
    // Check the part type
    const isQuickReply = conversationPart.part_type === 'quick_reply';
    const isFinResponse = conversationPart.author?.from_ai_agent === true;
    const isFinalAnswer = conversationPart.author?.is_ai_answer === true;
    
    let message = conversationPart.body || "No message content";
    let blocks = [];
    
    // Handle quick replies by converting them to Slack buttons
    if (isQuickReply) {
      // Quick reply buttons would be mapped to Slack Block Kit buttons
      blocks = [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Please select an option:"
          }
        },
        {
          type: "actions",
          elements: [
            // Example buttons - you would extract these from the webhook payload
            {
              type: "button",
              text: {
                type: "plain_text",
                text: conversationPart.metadata.quick_reply_options[0].text
              },
              value: conversationPart.metadata.quick_reply_options[0].uuid
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: conversationPart.metadata.quick_reply_options[1].text
              },
              value: conversationPart.metadata.quick_reply_options[1].uuid
            }
          ]
        }
      ];
    }
    
    // Send to Slack with appropriate formatting
    const slackResponse = await axios.post(
      "https://slack.com/api/chat.postMessage",
      {
        channel: row.slack_channel_id,
        thread_ts: row.slack_thread_ts,
        text: message,
        blocks: isQuickReply ? blocks : undefined,
        // Add additional metadata that might be useful for the client
        metadata: {
          is_fin_response: isFinResponse,
          is_final_answer: isFinalAnswer
        }
      },
      {
        headers: { Authorization: `Bearer ${SLACK_TOKEN}` }
      }
    );
    
    // ... rest of the code ...
  } catch (error) {
    // ... error handling ...
  }
});
```

Feedback and questions
How did it go? Send any feedback in the form at the bottom, and you can always contact us with questions via the Messenger in the bottom right.

- Read more about [webhooks](https://developers.intercom.com/docs/webhooks)
- See the [Conversations API](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Conversations/conversation/) reference documentation
- Check out the [Slack documentation](https://api.slack.com/web) for more ideas on enhancements