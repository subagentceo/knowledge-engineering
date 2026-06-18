# Use Pagination with List APIs

About this tutorial
This tutorial is written in Node.js and is aimed toward developers familiar with making API requests. The estimated time to go through this guide is 10 minutes. For more information on pagination see the [pagination overview](/docs/build-an-integration/learn-more/rest-apis/pagination).

If you are using one of the list APIs such as:

- [List Conversations](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Conversations/listConversations/)
- [List Admins](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Admins/listAdmins/)
- [List Contacts](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/ListContacts/)
- [List Companies](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Companies/listAllCompanies/)
- [List Articles](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Articles/listArticles/)


You may want to retrieve the data in smaller chunks to make processing more manageable or for performance reasons. You can do this using [pagination](/docs/build-an-integration/learn-more/rest-apis/pagination). In this guide you will paginate over a list of contacts using Node.js.

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
            Authorization: 'Bearer <your-access-token>'
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

Let's say that you want to fetch 5 contacts at a time.

First you declare the url with the number of pages.

```javascript
let url = 'https://api.intercom.io/contacts?per_page=5'
```

Then you can make the API call and do something with the data to verify that the correct number of responses is obtained — in this example, we are logging the contact email addresses. You can also log the `pages` object.

```javascript
const resp = await fetch(
    url,
    {
      method: 'GET',
      headers: {
      'Intercom-Version': '2.10',
      Authorization: 'Bearer <your-access-token>'
    }
  });

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
      "starting_after": "Wy0xLCI2NWU3NGYyYmY2ZGFhMTcwNTA1NTE1MGYiLDld"
    },
    "page": 10,
    "per_page": "5",
    "total_pages": 11
  },
}
```

Next, check to see if the `pages` object has the `next` property. This indicates that there is another page to fetch. You are going to wrap this in a while loop. When there is no more `next` property, you can break the loop and set the URL to `null`.

```javascript
  if (!data.pages.next) {
    url = null;
    break;
  }
```

Finally, you get the `starting_after` cursor string from the object, and pass it into the URL.

```javascript
url = url + `&starting_after=${data.pages.next.starting_after}`;
```

## Full Code Example

Finally, create an async function and a while loop that checks if URL exists. This will ensure the requests will continue until there is no `next` property, which means there are no more pages to fetch. Your final code should look like the below.

```javascript
async function run() {  
  let url = 'https://api.intercom.io/contacts?per_page=5'
    
  while(url) {
    const resp = await fetch(
    url,
    {
      method: 'GET',
      headers: {
      'Intercom-Version': '2.10',
      Authorization: 'Bearer <your-access-token>'
    }
  });

  const data = await resp.json();
  console.log(data.data.map((contact) => contact.email));
        
  if (!data.pages.next) {
    url = null;
    break;
  }
  
  url = url + `&starting_after=${data.pages.next.starting_after}`; 
  }
}

run();
```

Now run `node example.js` again to see how it works.

What did you think?
Did you find this guide useful? Let us know what you think in the feedback form below.

For more details on pagination see the [pagination overview](/docs/build-an-integration/learn-more/rest-apis/pagination) and for setting up pagination for search and sorting see the [search and sorting guide](/docs/build-an-integration/learn-more/rest-apis/pagination-sorting-search).