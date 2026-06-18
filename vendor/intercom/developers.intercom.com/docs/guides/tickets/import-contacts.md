# Import Contacts with the Intercom API

If you’re switching to Intercom from a different provider or starting out with a brand new workspace (welcome!) you likely need a way to import your users.

There are a few options for transferring your contact data that include:

- Using an [app](https://www.intercom.com/app-store), like these ones from [Mailchimp](https://www.intercom.com/help/en/articles/296-import-your-mailchimp-contacts) or [Mixpanel](https://www.intercom.com/help/en/articles/299-import-your-mixpanel-contacts)
- Exporting your contacts as a CSV and [uploading via the UI](https://www.intercom.com/help/en/articles/177-import-your-user-data-into-intercom#h_21779f9531)
- Using your previous provider’s APIs to read the data and save as a JSON file or transfer directly using Intercom APIs
- Exporting your contacts as a .xlsx, or JSON file and using the file for import with with Intercom APIs


In this tutorial you will import contacts into your Intercom app using example data from a JSON file. When complete, you should see the list of contacts in your Intercom workspace, along with a [custom data attribute](https://www.intercom.com/help/en/articles/179-send-custom-user-attributes-to-intercom) you will set on the contact.

About this tutorial
This tutorial is written in Node.js and is aimed toward developers familiar with making API requests. The code samples are a starting point, but very large imports will require modifications. Note that development workspaces are [limited to 20 users/leads](/docs/build-an-integration/getting-started#step-1-create-an-intercom-workspace).

## What are contacts?

In Intercom, your contacts are your customers or end-users of your product. Contacts can either be a **user** or a **lead**. A lead is a person who hasn’t yet signed up for your product (or sometimes, a user who’s not logged in). If someone starts a conversation with you in the Intercom Messenger, they are automatically saved as a lead. A user is a signed-up, logged-in user of your product.

You can find a full list of [Intercom defined terms here](https://www.intercom.com/help/en/articles/410-the-intercom-glossary).

## The Contacts and Data Attributes APIs

You will use two Intercom APIs to create data for this tutorial.

`POST /contacts` is used to [create a contact](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/CreateContact/), an end-user for your Intercom app. The only required parameter for creating a contact is `email`

`POST /data_attributes` is used to [create a custom attribute](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Data-Attributes/createDataAttribute/) for your contacts. You can create an attribute in the UI as well but for this tutorial you will create one using the API. The request requires `name`, `model`, and `data_type`.

This tutorial is set up to read data from a JSON file: use this dummy data provided or try using your own data. If you can access your data from another application with their API, you may modify the code to transfer the data directly.

## Prerequisites

- An Intercom workspace and Intercom app. Create both by following [this guide](https://developers.intercom.com/docs/build-an-integration/getting-started/)
- Node.js [v16.0 or higher](https://nodejs.org/en/download)


## Step 1: Set up your project

Create and navigate to a new directory where you will save your data in the JSON file and the import script.

```
mkdir import_contacts
cd import_contacts
```

Then create a new Node.js project and install the dependencies: [dotenv](https://www.npmjs.com/package/dotenv?activeTab=readme) for reading your Intercom Access Token and [node-fetch](https://www.npmjs.com/package/node-fetch) for using the Fetch API for your calls to Intercom.

```
npm init
npm install dotenv node-fetch
```

The setup guide should have prompted you to create a project file called `index.js`. Create files for the contact dummy data and the `.env` file. Make sure to also add `"type": "module"` to your `package.json` file.

```
touch contacts.json
touch .env
```

Find your Intercom Access Token from the [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub) under the Authentication section and paste it in the `.env` file.

`INTERCOM_TOKEN=”XXXXX"`

Next you will add the contacts data to `contacts.json`

## Step 2: The contacts data

This is a small data set to use as an example. If you utilize another platform’s API to export data, be sure to check the rate limits and pagination methods. Intercom’s rate limits are [provided here](https://developers.intercom.com/docs/references/rest-api/errors/rate-limiting/): At present, the default rate limit is 10,000 API calls per minute per app.

Open up `contacts.json` and paste in the following data.

```json
{
   "contacts": [
       {
           "id": 14637613035933,
           "name": "Sarah M",
           "email": "sarahm@example.com",
           "company_id": "15257600000029",
           "custom_attributes": {
               "pronouns": "She/Her"
           },
           “role”: “user”
       },
       {
           "id": 14637613035934,
           "name": "Ajay P",
           "email": "ajayp@example.com",
           "company_id": "15283600000067",
           "custom_attributes": {
               "pronouns": "He/Him"
           },
           “role”: “lead”
       },
       {
           "id": 14637613035935,
           "name": "Huong N",
           "email": "huongn@example.com",
           "company_id": "15257600000029",
           "custom_attributes": {
               "pronouns": "They/Them"
           },
           “role”: “user”
       },
       {
           "id": 14637613035936,
           "name": "Jan G",
           "email": "jang@example.com",
           "company_id": "15259370000094",
           "custom_attributes": {
               "pronouns": "He/They"
           },
           “role”: “lead”
       },
       {
           "id": 14637613035937,
           "name": "Amina R",
           "email": "aminar@example.com",
           "company_id": "15357600000026",
           "custom_attributes": {
               "pronouns": "She/Her"
           },
           “role”: “user”
       }
   ]
}
```

While the only required parameter for creating a contact is email, in a real case you would probably want to import as much data as possible about a contact. In this data set you have:

- `name`: The name of the contact
- `id`: The ID provisioned for the contact by the previous provider
- `email`: The email of the contact
- `company_id`: The ID of the company provisioned for the contact by a previous provider
- `custom_attributes`: These can be any additional attributes you want to add to a contact object. For this example we will look at how to add an attribute for a contact’s pronouns
- `role`: Defines if the contact is a user or a lead.


Next you will create the data attribute for pronouns to add to the contacts.

## Step 3: Create the data attribute

Open up `index.js` and paste in the below code.

```javascript
import fetch from "node-fetch";
import dotenv from "dotenv";
import contactData from "./contacts.json" assert { type: "json" };
dotenv.config();

async function createContactAttribute() {
  // Make a HTTP POST request to Intercom to create a data attribute
  // name, model, and data type are required fields, description is optional
  const response = await fetch(`https://api.intercom.io/data_attributes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Intercom-Version": "2.10",
      Authorization: `Bearer ${process.env.INTERCOM_TOKEN}`,
    },
    body: JSON.stringify({
      name: "pronouns",
      model: "contact",
      data_type: "string",
      description: "The pronouns of the contact.",
    }),
  });

  // If a successful 200 OK response, log that the attribute was created
  if (response.ok) {
    console.log("Data attribute created.");
  }
}

// Make the call so the function will run
createContactAttribute();
```

Here you begin by importing the `contacts.json` file as the variable `contactData`, then defining a function to [create a data attribute](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Data-Attributes/createDataAttribute/) for contacts.

You need to provide your Intercom Access Token in the authorization headers, and for this tutorial we are using version 2.10 of the API.

Since the data will be a string, you will provide that for the `data_type` and a brief description of what the attribute is.

Run the file in your terminal using the command `node index.js`. If successful, you will see `pronouns` in the list of attribute names in [Settings > People data](https://app.intercom.com/a/apps/_/settings/people-data) in your workspace.

## Step 4: Create the contacts

Now you can create the contacts with the new data attribute. Delete the `createContactAttribute()` code and replace it with the below.

```javascript
async function createContact() {
  // Create an array with the contacts example data
  let contacts = contactData.contacts;

  // Loop over the array to get each contact object
  for (let i = 0; i < contacts.length; i++) {
    try {
      // Make a HTTP POST request to Intercom to create the contact
      // Email is the only required field to create a contact
      const response = await fetch(`https://api.intercom.io/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Intercom-Version": "2.10",
          Authorization: `Bearer ${process.env.INTERCOM_TOKEN}`,
        },
        body: JSON.stringify({
          name: contacts[i].name,
          email: contacts[i].email,
          external_id: contacts[i].id,
          custom_attributes: contacts[i].custom_attributes,
        }),
      });
      // If the response is not a 200 OK, log the error
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      // If the response is successful log that the user has been created
      console.log("New contact created.");
    } catch (error) {
      console.log(error);
    }
  }
}

// Call the function to make the API call
createContact();
```

For large sets of contacts you may want to run the imports in batches if you are concerned about rate limiting. Batch sizes will depend on the size of your contact list and other API calls you are making within your Intercom app. If you hit the limit, you will see a `429 Error` in the response status in your terminal Read more about [how you can handle rate limits here](/docs/references/2.10/rest-api/errors/rate-limiting#how-can-i-handle-rate-limits).

To create the contacts, you will loop over the array of contacts in the `contactData` object. For each contact you are providing the `name`, `email`, `external_id`, and `pronouns` attribute from your custom attributes.

You will not use the `external_id` in this tutorial, but it may be helpful for you in the future if you are taking actions like importing tickets. To connect contacts with [tickets](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/ticket/) or [companies](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Companies/company/), you need to have the Intercom provisioned ID which is only accessible once the contact has been created in Intercom. You can find the contact using the [search contacts API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/SearchContacts/) using the `external_id` as a parameter.

Run `node index.js` again. You should see logged statements in the terminal when the contacts are created.

No duplicate contacts
If you attempt to create a contact that has already been created in your Intercom app, you will get a `409 Conflict` response. You can get the contact's Intercom ID using the [get a contact API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/ShowContact/) and [update the contact](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/UpdateContact/) if needed.

Now if you go to your Intercom Inbox under [People > All Users](https://app.intercom.com/a/apps/_/users/segments/all-users) you should see the contacts. They may take a few minutes to populate.

## Conclusion

In this tutorial you imported contact user and lead data from a JSON file using the Intercom APIs. If you want to try importing data from a spreadsheet, check out the [SheetJS library](https://www.npmjs.com/package/xlsx).

If you’re transferring your contacts using another platform’s APIs, there may be a difference in mapping or cases that weren’t covered in this tutorial. Check the provider’s documentation, and you can always refer to the [Intercom contacts API reference](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/contact/) for more details on how to create or update a contact.

Let us know how it’s going for you and drop a note in the messenger in the bottom right or leave us some feedback at the bottom of this page.

## Next steps

- [Import tickets](/docs/guides/tickets/import-tickets) into Intercom
- Set up a [webhook for contacts](/docs/webhooks/setting-up-webhooks)
- Create a ticket [using the API](/docs/guides/tickets/create-a-ticket)