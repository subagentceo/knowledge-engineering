# Closer Examination of Apollo GraphQL Caching - Iterable

## Closer Examination of Apollo GraphQL Caching

**Published by**

February 8, 2022

![](https://iterable.com/wp-content/uploads/2026/04/020722_Apollo_GraphQL_768x512.png)

One of the most exciting (and on occasion, frustrating) parts of frontend development is the ever-changing standard of modern practices, frameworks, and tools. In this case, GraphQL was the thing looming over the horizon—a new framework that was becoming widely adopted in the web development world. Given its popularity, we were excited to incorporate it into our application.

There are many articles and resources that detail the benefits of adopting GraphQL. Here at Iterable, we were excited about being able to specify the information a page needed and fetch this as a singular request, rather than having to make a hodgepodge of various REST API calls. 

To send and receive responses from GraphQL queries on our React frontend, we use Apollo Client. As mentioned in the documentation, one of the advantages of Apollo Client is its declarative approach to data fetching. 

> “Apollo Client takes care of the request cycle from start to finish, including tracking loading and error states for you. There’s no middleware to set up or boilerplate to write before making your first request, nor do you need to worry about transforming and caching the response. All you have to do is describe the data your component needs and let Apollo Client do the heavy lifting.”

### Iterable’s Use Case

The page in this particular use case contains a paginated table displaying a list of items. Users can also place items in folders, so the table row contents are either folders or items.

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-08-at-2.32.47-PM.png)

To fetch the data for the table, here’s a simplified version of the query we are using:

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-08-at-2.32.59-PM.png)

The query takes in some page info information, such as folder destination ID and maximum number of items. Our backend implementation uses these variables in the GraphQL query to then return the desired data we want to display in the table.

Then, to access this returned data, simply use the “useQuery” hook in the page component. It looks something like this:

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-08-at-2.33.17-PM.png)

“folderQueryData” is then passed to and displayed in the table component. So far, so good.

Problems began to arise however when we started using the query on other parts of the page, albeit with different variables passed in. The first use of the query is for the table, as explained above, and the second is a modal pop-up. In these two places, calls were made to fetch a list of items via the “fetchItemsQuery” call, but with different information passed into the query variables since we wanted the table and modal to display different quantities of items.

For instance, the “info” parameter for the query made from the table component would contain a limit of 10 if we want the table to only display 10 items at a time:

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-08-at-2.33.30-PM.png)

While the “info” parameter for the query made for the modal would contain a different number for the limit:

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-08-at-2.33.41-PM.png)

After implementing the modal functionality, we discovered a flickering issue when the modal would be open.

Examination of the network tab revealed that the queries for the modal and component were constantly being fired and overwriting each other in the cache, leading to infinite graphql calls being made and conflicting display information being passed into the presentational components.

### Why Did This Happen?

According to the documentation, Apollo caching is determined by the query response. The cache generates a cache ID for each identifiable object in the response data by concatenating the object’s typename and ID fields. Since the landing page of the table is at the root folder (with a specific root ID such as “0”) and the modal for folder creation also queries at the root folder level, these query results were identified by the cache as the same—both with a typename of “folder” and an ID of “0.”

As a result, in the cache, the incoming response was compared to the existing one in the cache. Since the cache ID’s were the same, this would override the previous call’s response.

From Apollo: 

> Whenever an incoming object has the same cache ID as an existing cached object, the fields of those objects are merged:  
> • If the incoming object and the existing object share any fields, the incoming object overwrites the cached values for those fields.

This accurately reflects the flickering issue we were seeing. The incoming response would overwrite (not be concatenated with) each other since they had the same cache object ID, and these changes would in turn cause the page to continuously re-render its display since the information it was receiving from the cache would change.

### Solutions

There are several potential solutions to this issue. The simplest, which we implemented, was adding a “no-cache” policy to one of the queries.

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-08-at-2.33.52-PM.png)

This policy allowed the query to go directly to the backend to grab the available data without reading or writing it to the cache, and therefore having no effect on the other query (which had the default caching policy.) In our use case, this was a perfect one-liner solution since we have a known maximum number of results allowed for the query on the page.

Disabling the cache was a suitable solution for us due to an imposed ceiling on the data size and infrequent calling of the query. If the data fetched was larger or more performance-intensive, here’s some other approaches we’ve found that could work: 

*   Customizing the cache ID generation policy to be more specific to the query
*   Changing how you read/write to the cache locally