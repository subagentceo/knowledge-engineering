# Help Center API

In the Intercom React Native wrapper you can display your Help Center, show articles programmatically, filter your Help Center content and using our data methods, deeply embed your Intercom Help Center alongside your own content.

Check [here](https://www.intercom.com/help/en/articles/56660-resources-to-help-with-educating-your-customers) for more content on setting up your Help Center in Interccom.

To display the Help Center, call the following method:


```javascript
Intercom.presentSpace(Space.helpCenter);
```

> 🚧 Make sure Help Center is turned on
If you don't have Help Center enabled in your Intercom settings the method `presentHelpCenter` will fail to load. To enable your Help Center please go [here](https://app.intercom.com/a/apps/_/educate/site/settings) and click the "Turn On Help Center" button.


## Present an Article Programmatically

To present an Article, pass in an articleID from your Intercom workspace to the following method:


```javascript
Intercom.presentContent(
      IntercomContent.articleWithArticleId('123456')
);
```

## Present a filtered Help Center

You can now pass in 1 or more collection IDs to filter the Help Center. This will display the same view as calling displayHelpCenter but the collections list will only show the IDs passed in.


```javascript
Intercom.presentContent(
      IntercomContent.helpCenterCollectionsWithIds(['123','456'])
);
```

## Using the data API

You can now fetch the data directly and build your own UI. This is useful when you want to show Intercom collections alongside your other support content.

## Fetch Collections

To fetch a list of all Collections call:


```javascript
try {
  const collections = await Intercom.fetchHelpCenterCollections();
} catch (error) {
  // Handle error
}
```

A successful response will return an `HelpCenterCollectionItem[]`. An `HelpCenterCollectionItem` contains the follow values:

- **summary** - an optional string that describes the collection,
- **id** - an string to identify that collection, this can be used to fetch the sections/articles for this
- **title** - an string with the name of the collection


## Fetch the contents of a collection

To get a list of sections/articles for a collections call:


```javascript
try {
  const content = await Intercom.fetchHelpCenterCollection(collectionId);
} catch (error) {
  // Handle error
}
```

This method requires a “`collectionId`”. You can get the IDs of your collections from `fetchHelpCenterCollections` or `searchHelpCenter` methods.

A collection can have a section (a group of articles with a header) or articles without a section. A successful response will return a `HelpCenterCollectionContent` object. It contains the follow values:

- **id** - an sring representing the id of the collection
- **title** - an string with the name of the collection
- **summary** - an optional string that describes the collection
- **articles** - an array of `HelpCenterArticle` objects
- **sections** - an array of `HelpCenterSection` objects
A section is a grouping of articles with a name.


The `HelpCenterSection` model is described as:

- **title** - an string with the name of the section
- **articles** - an array of `HelpCenterArticle` objects


The `HelpCenterArticle` model can be found both inside of sections, or at the top level of the collection content (not a part of any section). The `HelpCenterArticle` model is described as:

- **articleId** - an string representing the id of the article, this can be used to display the article calling `presentArticle: articleId`
- **title**- a string, the title of the article


## Search the Help Center

To get a list of articles in the Help Center, filtered by a search term call:


```javascript
try {
  const results = await Intercom.searchHelpCenter(searchTerm);
} catch (error) {
  // Handle error
}
```

The method requires a string with a term to search. A successful response will return an `HelpCenterArticleSearchResult[]`. It contains the follow values:

- **articleId** - a string with the id of the article, this can be used to display the article calling `presentArticle: articleId`
- **title** - a string with the title of the article
- **matchingSnippet** - a string with the part of the article that matched the search string provided
- **summary** - a string with a summary of the article


## Data API error handling

Errors returned from any of the Help Center data API methods are surfaced as Promise rejections. When a data API call fails, `error.code` will be one of `901`, `902`, or `903` depending on the method called. The `error.message` will contain a description of the failure.

For the full list of error codes, see the [error codes](https://developers.intercom.com/installing-intercom/react-native/error-codes/) reference. For details on the underlying native errors, see the [iOS error codes](https://developers.intercom.com/installing-intercom/ios/error-codes/) and [Android error codes](https://developers.intercom.com/installing-intercom/android/error-codes/) pages.