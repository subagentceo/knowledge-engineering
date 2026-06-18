# Use Pagination with Search APIs

About this tutorial
This tutorial is written in Node.js and is aimed toward developers familiar with making API requests. The estimated time to go through this guide is 10 minutes. For more information on pagination see the [pagination overview](/docs/build-an-integration/learn-more/rest-apis/pagination).

If you are using one of the search APIs such as:

- [Search Conversations](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Conversations/searchConversations/)
- [Search Contacts](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/SearchContacts/)
- [Search Tickets](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/searchTickets//)


You may want to retrieve the data in smaller chunks to make processing more manageable or for performance reasons. You can do this using [pagination](/docs/build-an-integration/learn-more/rest-apis/pagination). In this guide you will paginate over a set of contacts using Node.js.

## Create Example Contacts

In an empty `example.js` file, write a for loop that will create 51 contacts in your workspace to use as an example.

```javascript
for (let i = 0; i < 50; i++) {
    const resp = await fetch(
        `https://api.intercom.io/contacts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Intercom-Version': '2.10',
            Authorization: 'Bearer <YOUR_TOKEN_HERE>'
          },
          body: JSON.stringify({
            email: 'user_' + i + '@example.com'
          })
        }
      );
    
      const data = await resp.json();
      console.log(data.id);

}
```

Run `node example.js` in your terminal to run the script.

Now that you have some example contacts, you can delete this code from the file.

## Fetch the Contacts

Let's say that you want to get 5 contacts at a time while doing the search.

First you will declare an object called `paginationObject` that specifies the number of pages as `per_page`.

```javascript
let paginationObject = {  
  "per_page": 5
}
```

Then you can make the API call and do something with the data to verify that the correct number of responses is obtained — in this example, we are logging the contact email addresses. You can also log the `pages` object.

```javascript
const resp = await fetch(
  `https://api.intercom.io/contacts/search`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Intercom-Version': '2.10',
      Authorization: 'Bearer ' + process.env.INTERCOM_API_TOKEN
    },
    body: JSON.stringify({
      query: {
        operator: 'AND',
          value: [
            {
            field: 'created_at',
            operator: '>',
            value: '1693782000'
            }
          ]
        },
      pagination: paginationObject
    })
  }
);

const data = await resp.json();
console.log(data.pages)
console.log(data.data.map((contact) => contact.email));
```

If you refer to what the [pages object looks like in the response](/docs/build-an-integration/learn-more/rest-apis/pagination#example-list-conversations-response), you'll see that we can check to see if `next` is present. If so, it means there are more pages to come.

```json
{
  "pages": {
    "type": "pages",
    "next": {
      "page": 11,
      "starting_after": "Wy0xLCI2NWU3NGYxZWNkODRhZDY5Nzk5ODEyYWQiLDJd"
    },
    "page": 10,
    "per_page": "5",
    "total_pages": 11
  },
}
```

Next, check to see if the `pages` object has the `next` property. This indicates that there is another page to fetch. You are going to wrap this in a while loop, so set a check for when there is no more `next` property, you can break the loop and set the URL to `null`.

```javascript
if (!data.pages.next) {
  paginationObject = null;
  break;
}
```

Finally, you get the `starting_after` cursor string from the object, and add it to `paginationObject`.

```javascript
paginationObject['starting_after'] = data.pages.next.starting_after;
```

## Full Code Example

Finally, create an async function and a while loop that checks if URL exists. This will ensure the requests will continue until there is no `next` property, which means there are no more pages to fetch. Your final code should look like the below.

```javascript
async function run() {

  let paginationObject = {  
    "per_page": 5
  }

  while(paginationObject) {
    const resp = await fetch(
        `https://api.intercom.io/contacts/search`,
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Intercom-Version': '2.10',
            Authorization: 'Bearer <your-access-token>'
        },
        body: JSON.stringify({
            query: {
            operator: 'AND',
            value: [
                {
                field: 'created_at',
                operator: '>',
                value: '1693782000'
                }
            ]
            },
            pagination: paginationObject
        })
        }
    );

    const data = await resp.json();
    console.log(data.data.map((contact) => contact.email));

    if (!data.pages.next) {
        paginationObject = null;
        break;
      }
      paginationObject['starting_after'] = data.pages.next.starting_after;
  }
}

run();
```

Now run `node example.js` again to see how it works.

What did you think?
Did you find this guide useful? Let us know what you think in the feedback form below.

For more details on pagination see the [pagination overview](/docs/build-an-integration/learn-more/rest-apis/pagination) and for setting up pagination for the list APIs see the [list guide](/docs/build-an-integration/learn-more/rest-apis/pagination-cursor).