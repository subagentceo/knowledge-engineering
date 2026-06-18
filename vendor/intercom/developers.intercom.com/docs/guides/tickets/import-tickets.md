# Import Tickets

If you’re switching to Intercom [from a different provider](https://www.intercom.com/blog/switching-to-new-customer-service-platform/), you’re probably thinking through steps you’d need to take in order to migrate your ticket data.

Transferring your data from another system into Intercom can be done using a third-party provider, but in some cases you might want to handle the migration yourself. Utilizing the Intercom APIs to import your data is an option if you:

- Want to save on costs
- Require flexibility due to the customizations or complexity your previous setup
- Have a developer who can handle the migration


In this tutorial, you will import [ticket types](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Ticket-Types/listTicketTypes/), and [tickets](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/ticket/) data into your Intercom Workspace. When working successfully you should see the test ticket types and tickets in your Intercom app.

About this tutorial
This tutorial is written in Node.js and is aimed toward developers familiar with making API requests. The code samples are a starting point, but very large migrations will require modifications. It will help to set up some contacts to use — do that using [this guide](/docs/guides/tickets/import-contacts).

## Ticket Types and Tickets APIs

You will use three of the Intercom APIs to read and create data for this tutorial.

`POST /tickettypes` is used to [create ticket types](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Ticket-Types/createTicketType/). You can create these with any names of your choosing. `ticket_type_id` is required to create a ticket using the API.

`POST /contacts/search` is used to [find a contact](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/SearchContacts/) within your Intercom app. An object containing an Intercom ID for a contact is required to create a ticket.

`POST /tickets` is used to [create a new ticket](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/createTicket/).

This example assumes that you have exported your existing ticket data into a JSON file, but you can try adapting it to your own data. If your data is stored in an application with its own API, you can modify your code to transfer the data directly, or if you exported it to a spreadsheet you can try refactoring the code to handle spreadsheet imports.

## Prerequisites

- An Intercom workspace and Intercom app. Create both by following [this guide](https://developers.intercom.com/docs/build-an-integration/getting-started/)
- A list of contacts available in your workspace. [Follow this guide](/docs/guides/tickets/import-contacts) to set up example contacts
- Node.js [v16.0 or higher](https://nodejs.org/en/download)


## Step 1: Set up your project

Create and navigate to a new directory where you will save your data in the JSON file and the import script.

```
mkdir import_tickets
cd import_tickets
```

Create a new Node.js project and install the dependencies: [dotenv](https://www.npmjs.com/package/dotenv?activeTab=readme) for reading your Intercom Access Token and [node-fetch](https://www.npmjs.com/package/node-fetch) for using the Fetch API for your calls to Intercom.

```
npm init
npm install dotenv node-fetch
```

The setup guide should have prompted you to create a project file called `index.js`. Create files for the tickets dummy data and the `.env` file. Make sure to also add `"type": "module"` to your `package.json` file.

```
touch contacts.json
touch .env
```

Find your Intercom Access Token from the [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub) under the Authentication section and paste it in the `.env` file.

`INTERCOM_TOKEN=”XXXXX"`

Next let’s take a look at the example tickets data.

## Step 2: The ticket data

This is a small data set to use for the tutorial. If you are migrating tickets using another platform’s API you will want to check the rate limits and pagination methods. Intercom’s rate limits are [provided here](https://developers.intercom.com/docs/references/rest-api/errors/rate-limiting/): At present, the default rate limit is 10,000 API calls per minute per app.

Open up `tickets.json` and paste in the following data.

```json
{
  "tickets": [
    {
      "id": 220,
      "created_at": 1672831080,
      "type": "other",
      "subject": "help",
      "description": "please contact me",
      "status": "pending",
      "requester_id": 14637613035935
    },
    {
      "id": 221,
      "created_at": 1677928680,
      "type": "account",
      "subject": "I have a question about my account",
      "description": "I can't login",
      "status": "open",
      "requester_id": 14637613035934
    },
    {
      "id": 222,
      "created_at": 1678101480,
      "type": "bug",
      "subject": "There is something broken on your website",
      "description": "The submit button is broken on the page.",
      "status": "open",
      "requester_id": 14637613035935
    },
    {
      "id": 223,
      "created_at": 1686046680,
      "type": "feature request",
      "subject": "Please add this endpoint",
      "description": "Can you add an endpoint to this API? It would help me a lot.",
      "status": "pending",
      "requester_id": 14637613035936
    },
    {
      "id": 224,
      "created_at": 1701861488,
      "type": "bug",
      "subject": "How do I create a new contact?",
      "description": "I keep getting an error when I try.",
      "status": "solved",
      "requester_id": 14637613035937
    },
    {
      "id": 225,
      "created_at": 1696587480,
      "type": "bug",
      "subject": "Can't delete a conversation",
      "description": "Can't figure out how to delete a conversation",
      "status": "open",
      "requester_id": 14637613035936
    }
  ]
}
```

While your data structure and field names may differ, the key fields you will need for the import are:

- `subject`: The value of the subject field, which maps to `_default_title` in Intercom.
- `description`: The description of the issue, which maps to `_default_description` in Intercom.
- `requester_id`: The ID from your previous system that is assigned to the contact who made the request as `external_id` in Intercom. This may be useful to you in looking up the contact within Intercom if you do not have the Intercom assigned contact ID available in your data.
- `type`: The category the ticket falls under, Which you will define in the next step using the Ticket Types API with values of `bug`, `feature request`, `account`, and `other`.


This example includes `created_at` since you may want a record of when the ticket was first created in another system; if you do not provide one, the value will default to a timestamp of the time of import into Intercom.

You may want to show the current status, or state of the ticket. In the Intercom API, `ticket_state` refers to the state the ticket is currently in, with the options of "submitted" "in_progress" "waiting_on_customer" "on_hold" and "resolved". Since the options in the dummy data are slightly different, you will need to map them to the Intercom options.

## Step 3: Create the ticket types

If you’ve followed the [create a ticket](/docs/guides/tickets/create-a-ticket) tutorial you may already be familiar with the ticket type API — you’ll use it in this step to create the ticket types.

Open up `index.js` and paste in the following code

```javascript
import fetch from "node-fetch";
import dotenv from "dotenv";
import ticketsData from "./tickets.json" assert { type: "json" };
dotenv.config();

const intercomHeaders = {
  "Content-Type": "application/json",
  "Intercom-Version": "Preview",
  Authorization: `Bearer ${process.env.INTERCOM_TOKEN}`,
};

// Create the empty object to hold the ticket type IDs
let TICKET_TYPES = {};

async function createTicketTypes() {
  // Create an array of the ticket types you want to create
  let ticketTypesList = ["bug", "feature request", "account", "other"];

  // Loop over the list of ticket types
  for (let i = 0; i < ticketTypesList.length; i++) {
    // Make a HTTP POST request to Intercom to create the ticket type
    try {
      let ticketTypeName = ticketTypesList[i];
      const response = await fetch(`https://api.intercom.io/ticket_types`, {
        method: "POST",
        headers: intercomHeaders,
        body: JSON.stringify({
          name: ticketTypeName,
          category: "Customer",
        }),
      });

      // Get the response data as a JSON object
      const data = await response.json();
      // From the JSON object get the ID of the ticket type
      // add it to the ticket types object
      TICKET_TYPES[ticketTypeName] = data.id;
    } catch (error) {
      console.log(error);
    }
  }
  // If the request succeeds log that the ticket type has been created
  console.log("Ticket types created.");
}
```

First you are importing the `tickets.json` file as an object called `ticketsData`, and then set the headers you will use for the API calls with the Intercom Access Token as the bearer token. We’re using the Preview version of the API so we have features available such as setting the `created_at` parameter on the tickets.

You will declare an empty object to map the IDs of the ticket types after you create them; this is because the data you are ingesting has the type as a string and does not have the ID. You could use the [list all ticket types API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Ticket-Types/listTicketTypes/) to look up the ID that way, but for the sake of this tutorial you may use an object to store them upon creation.

Next you create a function to create the ticket types and define a list of the types to create. You will iterate through that list and make a `POST` request to the API with the name of the ticket type. You will define the category as “Customer” since we will assume that all of these are customer-created tickets. The other options available are "Back-office" and "Tracker".

## Step 4: Create the function to import tickets

Below the code you added in the previous step, paste in the following function.

```javascript
async function importTickets() {
  // Create an array for the tickets objects from the JSON file
  let tickets = ticketsData.tickets;

  // Loop over the array of tickets objects
  for (let i = 0; i < tickets.length; i++) {
    try {
      // Get the stored ticket type ID
      let ticketType = tickets[i].type;
      // Get the mapped ticket status
      let ticketStatus = tickets[i].status;
      // Create a HTTP POST request to the Intercom API to create a ticket
      // Required fields are ticket_type_id and contacts
      const response = await fetch(`https://api.intercom.io/tickets`, {
        method: "POST",
        headers: intercomHeaders,
        body: JSON.stringify({
          ticket_type_id: ticketType,
          contacts: [{ id: tickets[i].requester_id }],
          ticket_attributes: {
            _default_title_: tickets[i].subject,
            _default_description_: tickets[i].description,
          },
          ticket_state: ticketStatus,
          created_at: tickets[i].created_at,
        }),
      });
      // If the response is not a 200 OK log the response
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      // If the response is 200 OK log that the ticket has been created
      console.log("Ticket created.");
    } catch (error) {
      console.log(error);
    }
  }
}
```

In this code you are first getting the array of individual ticket objects from `tickets.json` and setting them as a variable called `tickets`. You then use this variable to loop through the array and make a `POST` request to the Tickets API to create a new Intercom ticket using the data. If you refer back to step 2, you’ll recall there are few mappings that we need to handle between the example data and the parameters of the Intercom API.

First let’s look at `ticket_type_id`. When pulling from the data, the name of the ticket type is provided as a string, but the API needs the ID value as a string. Since you stored the ID values in the `TICKET_TYPES` object, you can use that to get the related ID. Change this line in the request body to

```javascript
ticket_type_id: TICKET_TYPES[ticketType];
```

We will assume the `requester_id` pulled from the previous system has been saved as `external_id` in the Intercom contact object, however you cannot use the `external_id` to create the ticket — you must use the Intercom provisioned ID that was assigned when the contact was created in Intercom. You can get this using the [search contacts API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/SearchContacts/).

Create a new function in the file called `getContactsByExternalId()`. This function will take the `external_id` and will return the Intercom contact ID as a variable called `contactId`.

```javascript
async function getContactByExternalId(external_id) {
  try {
    // Make a HTTP POST request to Intercom to find a contact by external_id
    const response = await fetch(`https://api.intercom.io/contacts/search`, {
      method: "POST",
      headers: intercomHeaders,
      body: JSON.stringify({
        query: {
          operator: "AND",
          value: [
            {
              field: "external_id",
              operator: "=",
              value: external_id.toString(),
            },
          ],
        },
      }),
    });
    // Get the response as a JSON object
    const contact = await response.json();
    // Create the contactId with the ID returned in the response
    const contactId = contact.data[0].id;
    // If the response is sucessful return the contactId
    if (response.ok) {
      return contactId;
    }
  } catch (error) {
    console.log(error);
  }
}
```

Now, back in `importTickets()` below the try statement, paste the below line to call the `getContactByExternalId()` function as pass in the `requester_id` and set the value to `contactId`.

```javascript
let contactId = await getContactByExternalId(tickets[i].requester_id);
```

Then you can change the `id` value in the contacts object of the request body to be `contactId`

```javascript
id: contactId;
```

The final mapping required before you may run the migration is to update the ticket states to be compatible with the Intercom options. At the top of the file, create a global variable with the mappings. This is an example of what it could look like, but you may change it depending on what your data looks like.

```javascript
const TICKET_STATES = {
  pending: "in_progress",
  open: "submitted",
  solved: "resolved",
};
```

Get and set the Intercom state by changing `ticket_state` parameter in the body to the below.

```javascript
ticket_state: TICKET_STATES[ticketStatus];
```

## Step 5: Suppress contact notifications

In order to ensure that you do not notify contacts when you create the historical tickets, you will want to turn off email notifications.

To turn off email notifications completely you can use the option in [Settings > Email > Email notifications](https://app.intercom.com/a/apps/_/settings/email-notifications). If you'd like to explore other options for pausing notifications, you can see [this article](https://www.intercom.com/help/en/articles/3527623-sending-email-notifications-without-conversation-content-or-history).

Don't forget to revert the setting after you have completed the import.

## Step 6: Run the migration

For many tickets you may want to run the imports in batches if you are concerned about rate limiting. Batch sizes will depend on the size of your list and other API calls you are making within your Intercom app. If you hit the limit, you will see a `429 Error` in the response status in your terminal Read more about [how you can handle rate limits here](/docs/references/2.10/rest-api/errors/rate-limiting#how-can-i-handle-rate-limits).

Finally, add in a `main()` function to call the `createTicketTypes()` function first, and the `importTickets()` function second. Your completed file should look like this:

```javascript
import fetch from "node-fetch";
import dotenv from "dotenv";
import ticketsData from "./tickets.json" assert { type: "json" };
dotenv.config();

const intercomHeaders = {
  "Content-Type": "application/json",
  "Intercom-Version": "Preview",
  Authorization: `Bearer ${process.env.INTERCOM_TOKEN}`,
};

let TICKET_TYPES = {};

const TICKET_STATES = {
  pending: "in_progress",
  open: "submitted",
  solved: "resolved",
};

// Run the two functions sequentially
async function main() {
  const dataAttributes = await createTicketTypes();
  const tickets = await importTickets();
}

async function createTicketTypes() {
  // Create an array of the ticket types you want to create
  let ticketTypesList = ["bug", "feature request", "account", "other"];

  // Loop over the list of ticket types
  for (let i = 0; i < ticketTypesList.length; i++) {
    // Make a HTTP POST request to Intercom to create the ticket type
    try {
      let ticketTypeName = ticketTypesList[i];
      const response = await fetch(`https://api.intercom.io/ticket_types`, {
        method: "POST",
        headers: intercomHeaders,
        body: JSON.stringify({
          name: ticketTypeName,
          category: "Customer",
        }),
      });

      // Get the response data as a JSON object
      const data = await response.json();
      // From the JSON object get the ID of the ticket type
      // add it to the ticket types object
      TICKET_TYPES[ticketTypeName] = data.id;
    } catch (error) {
      console.log(error);
    }
  }
  // If the request succeeds log that the ticket type has been created
  console.log("Ticket types created.");
}

async function getContactByExternalId(external_id) {
  try {
    // Make a HTTP POST request to Intercom to find a contact by external_id
    const response = await fetch(`https://api.intercom.io/contacts/search`, {
      method: "POST",
      headers: intercomHeaders,
      body: JSON.stringify({
        query: {
          operator: "AND",
          value: [
            {
              field: "external_id",
              operator: "=",
              value: external_id.toString(),
            },
          ],
        },
      }),
    });
    // Get the response as a JSON object
    const contact = await response.json();
    // Create the contactId with the ID returned in the response
    const contactId = contact.data[0].id;
    // If the response is sucessful return the contactId
    if (response.ok) {
      return contactId;
    }
  } catch (error) {
    console.log(error);
  }
}

async function importTickets() {
  // Create an array for the tickets objects from the JSON file
  let tickets = ticketsData.tickets;

  // Loop over the array of tickets objects
  for (let i = 0; i < tickets.length; i++) {
    try {
      // Get the stored ticket type ID
      let ticketType = tickets[i].type;
      // Get the mapped ticket status
      let ticketStatus = tickets[i].status;
      // Get the Intercom contact ID
      let contactId = await getContactByExternalId(tickets[i].requester_id);
      // Create a HTTP POST request to the Intercom API to create a ticket
      // Required fields are ticket_type_id and contacts
      const response = await fetch(`https://api.intercom.io/tickets`, {
        method: "POST",
        headers: intercomHeaders,
        body: JSON.stringify({
          ticket_type_id: ticketType,
          contacts: [{ id: contactId }],
          ticket_attributes: {
            _default_title_: tickets[i].subject,
            _default_description_: tickets[i].description,
          },
          ticket_state: TICKET_STATES[ticketStatus],
          created_at: tickets[i].created_at,
        }),
      });
      // If the response is not a 200 OK log the response
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      // If the response is 200 OK log that the ticket has been created
      console.log("Ticket created.");
    } catch (error) {
      console.log(error);
    }
  }
}

// Call the main function to run the script
main();
```

When you’re ready you can run the migration in your terminal using the command `node index.js`

You should see notifications in your terminal as the tickets are created. You can always remove the print statement if you’d rather not receive these. Once you go to your Intercom Inbox, you should see the tickets populated — they may take a few minutes to appear. You can also find your newly created ticket types under [Settings > ticket data](https://app.intercom.com/a/apps/_/settings/ticket-data).

## Conclusion

In this tutorial you created ticket types and imported ticket data using the Intercom APIs.

This guide covers the basics of how you might migrate your tickets into Intercom, but it doesn’t address more complex cases. Refer to the documentation from your previous provider and Intercom documentation for details about additional parameters and mappings.

Feel free to contact us using the messenger in the bottom right to let us know what solutions you come up with and leave us some feedback at the bottom of this page.

## Next steps

- Set up a [ticket webhook](/docs/references/2.9/webhooks/webhook-models)
- Build a [custom ticket web form](/docs/guides/tickets/build-a-ticket-form)
- Build an [integration](/docs/guides/tickets/build-a-ticketing-app) with GitHub issues