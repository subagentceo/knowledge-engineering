# Create an AI Agent report

About this tutorial
This tutorial is written in Node.js and is aimed toward developers familiar with making API requests. The estimated time to complete it is 20 minutes. Find the code to get started on [Replit](https://replit.com/@IntercomDevs/Create-an-AI-Agent-Report?v=1).

## Overview

With the AI Agent additions to the [Conversations API](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Conversations/conversation/), you can send all the conversations metadata to your data warehouse and use BI and visualization tools to create reports and gain insights into your AI Agent's performance.

In this tutorial, you will export conversations data into a Google Sheet and create your own Fin AI Agent report in Looker Studio.

![The Example Looker Studio Report](/assets/ai_agent_reporting.b87c3ef3d3e839c0dc676d78bdfed4f28387ca78f9b1e4964f8f606348832950.71a4f21c.png)

## Getting started

To complete this tutorial you need:

- An Intercom workspace. You can use your paid workspace, or a free Intercom [development workspace](https://app.intercom.com/admins/sign_up/developer)
- A free [Replit account](https://replit.com/signup)
- A Google Workspace with access to [Sheets](https://www.google.co.uk/sheets/about/) and [Looker Studio](https://developers.google.com/looker-studio)


## Set up the GET endpoint to retrieve conversations data

Open up [Replit](https://replit.com/@IntercomDevs/Create-an-AI-Agent-Report?v=1) and click "Use Template".

This is the full sample code:

```javascript
import express from "express";
import fetch from "node-fetch";

const app = express();

// Don't forget to add your token as a secret
const INTERCOM_TOKEN = process.env.INTERCOM_TOKEN;

app.listen(3000, () => {
  console.log("Express server initialized");
});

app.get("/", async (req, res) => {
  try {
    const source_type = await fetchAllConversationsData();
    res.json(source_type);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

// Sets the resting time for the rate limit check
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/* A function that checks the rate limit remaining provided in the response header. If there are only 20 requests remaining, sleep for 10s

You can log response.headers.get('X-RateLimit-Remaining') to see how many requests are remaining */
const checkRateLimit = async (response) => {
  if (response.headers.get("X-RateLimit-Remaining") < 20) {
    console.log("sleeping for 10s");
    await sleep(10);
  }
};

/*
Function that searches conversations in batches of 10, filtering out fin_preview or workflow_preview sources.

We are using the Search Conversations API in Preview.

Docs here: https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Conversations/searchConversations/
*/
async function fetchConversationsData(params) {
  try {
    const response = await fetch(
      `https://api.intercom.io/conversations/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Intercom-Version": "Preview",
          Authorization: `Bearer ${INTERCOM_TOKEN}`,
        },
        body: JSON.stringify({
          query: {
            operator: "AND",
            value: [
              {
                field: "ai_agent.source_type",
                operator: "!=",
                value: "fin_preview",
              },
              {
                field: "ai_agent.source_type",
                operator: "!=",
                value: "workflow_preview",
              },
            ],
          },
          pagination: params,
        }),
      }
    );

    const conversations = await response.json();
    console.log(conversations);

    // Check the rate limit to make sure we won't hit it
    await checkRateLimit(response);

    // If still under the limit return the list of conversations objects
    return conversations;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow to handle it in the caller
  }
}

/*
Specify the initial parameters of 10 conversations per page
You can adjust this value to your needs
For more information on pagination for Search APIs see: https://developers.intercom.com/docs/build-an-integration/learn-more/rest-apis/pagination-sorting-search/
*/
async function fetchAllConversationsData() {
  let params = { per_page: 10 };
  let conversationsMetadata = [];

  // While there are more pages of data, fetch and process each page
  while (params) {
    // Call the function to fetch the batch of 5 conversations
    const conversations = await fetchConversationsData(params);

    // Get all of the conversation parts and format all of the conversations in the batch
    const allConversations = await Promise.all(
      conversations.conversations.map((conversation) => {
        conversationsMetadata.push(createObject(conversation));
      })
    );

    // If there are no more pages, set the params to null and exit the loop
    if (!conversations.pages.next) {
      return conversationsMetadata;
    }

    // If there are more pages, update the params to fetch the next page
    params.starting_after = conversations.pages.next.starting_after; // Update the startingAfter value for the next request with the given pointer
  }
}

// Format the object with the data needed to send to the spreadsheet
function createObject(conversation) {
  let obj = {
    id: conversation.id,
    created_at: conversation.created_at,
    language: conversation.custom_attributes.Language,
    ai_agent_participated: conversation.ai_agent_participated ? 1 : 0,
    content_sources:
      conversation.ai_agent_participated &&
      conversation.ai_agent.content_sources &&
      conversation.ai_agent.content_sources.total_count > 0
        ? conversation.ai_agent.content_sources.content_sources[0].title
        : null,
    last_answer_type: conversation.ai_agent_participated
      ? conversation.ai_agent.last_answer_type
      : null,
    rating: conversation.ai_agent_participated
      ? conversation.ai_agent.rating
      : null,
    rating_remark: conversation.ai_agent_participated
      ? conversation.ai_agent.rating_remark
      : null,
    resolution_state: conversation.ai_agent_participated
      ? conversation.ai_agent.resolution_state
      : null,
    source_type: conversation.ai_agent_participated
      ? conversation.ai_agent.source_type
      : null,
    source_title: conversation.ai_agent_participated
      ? conversation.ai_agent.source_title
      : null,
  };
  return obj;
}
```

Running the code
If you'd rather run the code in your own IDE you can do so, but you will need a way to access publicly exposed endpoint to provide in Google Apps Script.

In the code, you are using the [Search Conversations](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Conversations/searchConversations/) endpoint to get conversations that do not have a source of `fin_preview` or `workflow_preview`. This is because you can [preview and test Fin AI Agent](https://www.intercom.com/help/en/articles/7837514-add-your-support-content-for-fin-ai-agent#h_3bd76bb9da) in the Intercom UI, but these instances should not be included in reports.

Once you have the data, you'll create a new object for each conversation with the relevant AI Agent data included, so they can be sent to the Google Sheet.

Grab your Intercom Access Token and add it to your Replit secrets as `INTERCOM_TOKEN`. Hit "Run" at the top of Replit. You should see the data populated in the webview: copy the Dev URL from the Webview or Networking tab.

## Create the Google Sheet and populate the data

Make a copy of this [example Google Sheet](https://docs.google.com/spreadsheets/d/1auRLCukrvi342ilSVwXb_LwWlq6VwOkhKP4b8F7g474/edit?usp=sharing) and keep the associated attached Apps Script file, which contains the code that will allow you to populate the sheet from the data returned in the Replit endpoint.

You will see that the fields defined in your conversation object have been provided as headers in the top of the sheet.

Click on Extensions > Apps Script. You should see the following code:

```javascript
function myFunction() {
  // Fetch the data from your Node app
  const response = UrlFetchApp.fetch("your-replit-link-here/metadata");
  const jsonText = response.getContentText();
  const jsonData = JSON.parse(jsonText);

  let allValues = [];

  // Get the data and format it into the associated columns
  for (let i = 0; i < jsonData.length; i++) {
    let values = [
      jsonData[i].id,
      jsonData[i].created_at,
      jsonData[i].language,
      jsonData[i].ai_agent_participated,
      jsonData[i].content_sources,
      jsonData[i].last_answer_type,
      jsonData[i].rating,
      jsonData[i].rating_remark,
      jsonData[i].resolution_state,
      jsonData[i].source_type,
      jsonData[i].source_title,
    ];
    // Add the list of values to the empty list
    allValues.push(values);
  }
  Logger.log(allValues);
  writeToSheet(allValues);
}

// A function that will write the data to the sheet
function writeToSheet(data) {
  // Open the spreadsheet by its ID or name. Replace 'Sheet1' with your actual sheet name
  const sheet = SpreadsheetApp.getActiveSheet();

  // Get the last row of the sheet that is populated
  const lastRow = sheet.getLastRow();

  // Ensure the sheet isn't null
  if (sheet !== null) {
    // Determine the range you need to write to
    // Here, we start writing from row 2, column 1
    const range = sheet.getRange(lastRow + 1, 1, data.length, data[0].length);

    // Set the values to the range
    range.setValues(data);
  } else {
    Logger.log("Sheet not found");
  }
}
```

On line 2, replace `your-replit-link-here` with the link you copied from Replit in the last step.

Now when you run this code, you will be able to get your conversations data from the endpoint, and format it in a list of lists that can be written to your sheet, by defining the range to write it within and setting the values from each conversation.

Click the "Run" button, which will then prompt you to give permissions to write data to the sheet.

After you have set up your permissions, you should see the functions running in the Execution log. Once complete, your spreadsheet should be populated with data.

![The populated spreadsheet](/assets/populated_sheet.4d02dcc24c3f82d966501a35af2090a9fd0038134dfe3a0fa42303f16bcd05bc.71a4f21c.png)

The Google Sheets API
A fast way to utilize the Google Sheets API for this tutorial is by using Apps Script. In production, you would want to set up Google OAuth to write data to your sheet: you can find details on setting it up in the [Google Sheets developer documentation](https://developers.google.com/sheets/api/guides/concepts). Also be mindful of the sharing permissions on the Google Sheet and the sensitivity of the data you are inputting.

## Build your report in Looker Studio

To build the report, first [sign in to Looker Studio](https://lookerstudio.google.com/). Make a [copy of this report](https://lookerstudio.google.com/reporting/953dc8f9-520a-4bdf-9ebc-cb0ab7e6cafb) and choose your own data source — the Google sheet — from the dropdown.

For this example you will set up:

- Number of conversations where AI Agent participated (Scorecard)
- Fin involvement percentage (Scorecard)
- Customer Satisfaction (CSAT) rating (Scorecard)
- Routed to team rate (Scorecard)
- AI Answer resolution rate (Scorecard)
- Rating remarks (Table)
- Content sources (Chart)
- Conversation ratings (Chart)


Fin AI Agent Reports
You can find a full list of how the metrics in the Fin AI Agent Report provided in Intercom are calculated [in our help center article](https://www.intercom.com/help/en/articles/7837533-fin-ai-agent-report).

You may notice at the moment for some items in the report, they are not using the correct fields. You will need to create new fields with required calculations. Go to Resource > Manage added data sources and under Actions click Edit.

#### Customer Satisfaction (CSAT) rating

Click Add a field > Add calculated field and name the field "CSAT". In the forumla box, add:

`COUNT(CASE WHEN rating >= 4 THEN 1 ELSE NULL END) / COUNT(rating)`

This will help to calculate the percentage of conversations that are rated a 4 or 5 by the customer. Click save, then hit the back arrow to All Fields. Change the Type of CSAT to Percent so it can be visualized as a percent in your report.

![Update the type](/assets/change_type.f900d9529da08dbf463018842de55c5eb0a0af6ebc6b8ca5cf0d397f645e880d.71a4f21c.png)

#### Fin involvement percentage

Follow the same process. In the formula box add:

`SUM(ai_agent_participated) / Record Count`

#### Resolution rate

In the formula box add:

```
COUNT(CASE WHEN resolution_state = "confirmed_resolution" or resolution_state = "assumed_resolution" THEN 1 ELSE NULL END) / COUNT(CASE WHEN last_answer_type = "ai_answer" THEN 1 ELSE NULL END)
```

#### Routed to team rate

In the formula box add:

```
COUNT(CASE WHEN resolution_state = "routed_to_team" THEN 1 ELSE NULL END) / COUNT(CASE WHEN last_answer_type = "ai_answer" THEN 1 ELSE NULL END)
```

When you are done, click Done and close data sources. Now back in your report, you can click into a chart item, and within the setup panel choose the new associated field from the Metric dropdown.

When complete, your report should look similar to this:

![Your final report](/assets/ai_agent_reporting.b87c3ef3d3e839c0dc676d78bdfed4f28387ca78f9b1e4964f8f606348832950.71a4f21c.png)

## Next steps

In this tutorial you built a report with your AI Agent metadata. You can create additional fields and charts that are bespoke to your team's needs or try out adding ones that are associated with the Intercom Fin AI Agent reports.

Feedback and questions
How did it go? Send any feedback in the form at the bottom, and you can always contact us with questions via the Messenger in the bottom right.

- Read more about [report definitions](https://www.intercom.com/help/en/articles/7837533-fin-ai-agent-report) in the Fin AI Agent report
- Create [additional reports](/docs/build-an-integration/learn-more/rest-apis/build-your-own-reports) using the Intercom API
- See the [Conversations API](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Conversations/conversation/) reference documentation