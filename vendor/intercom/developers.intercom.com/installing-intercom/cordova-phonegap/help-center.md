# Help Center

In the Intercom Cordova wrapper you can display your Help Center, show articles programmatically, filter your Help Center content and using our data methods, deeply embed your Intercom Help Center alongside your own content.

Check [here](https://www.intercom.com/help/en/articles/56644-customize-your-help-center) for more content on setting up your Help Center in Intercom.

To display the Help Center, call the following method:

```javascript
intercom.presentSpace(intercom.space.HelpCenter);
```

> 🚧 Make sure Help Center is turned on
If you don't have Help Center enabled in your Intercom settings the method `intercom.presentSpace(intercom.space.HelpCenter)` will fail to load. To enable your Help Center please go [here](https://app.intercom.com/a/apps/_/articles/site/settings/_) and click the "Turn On Help Center" button.


## Present an Article Programmatically

To present an Article, pass in an articleID from your Intercom workspace to the following method:

```javascript
var article = intercomContent.articleWithArticleId("5678")
intercom.presentContent(article)
```

## Present a filtered Help Center

You can now pass in 1 or more collection IDs to filter the Help Center. This will display the same view as calling `intercom.presentSpace(intercom.space.HelpCenter)` but the collections list will only show the IDs passed in.

```javascript
var helpCenterCollections = intercomContent.helpCenterCollectionsWithIds(["23434", "7676"])
intercom.presentContent(helpCenterCollections)
```

## Using the data API

You can now fetch the data directly and build your own UI. This is useful when you want to show Intercom collections alongside your other support content.

## Fetch Collections

To fetch a list of all Collections call:

```javascript
intercom.fetchHelpCenterCollections()
```

A successful response will return a list of Help Center Collection objects which contains the following values:

- **summary** - an optional string that describes the collection,
- **id** - an string to identify that collection, this can be used to fetch the sections/articles for this
- **title** - an string with the name of the collection


## Fetch the contents of a collection

To get a list of sections/articles for a collections call:

```javascript
intercom.fetchHelpCenterCollection(collectionId)
```

This method requires a “`collectionId`”. You can get the IDs of your collections from `fetchHelpCenterCollections` or `searchHelpCenter` methods.

A collection can have a section (a group of articles with a header) or articles without a section. A successful response will return a Help Center Collection Content object. It contains the follow values:

- **id** - an sring representing the id of the collection
- **title** - an string with the name of the collection
- **summary** - an optional string that describes the collection
- **articles** - an array of Help Center Article objects
- **sections** - an array of Help Center Section  objects
A section is a grouping of articles with a name.


The Help Center Section model is described as:

- **title** - an string with the name of the section
- **articles** - an array of Help Center Article objects


The Help Center Article model can be found both inside of sections, or at the top level of the collection content (not a part of any section). The Help Center Article model is described as:

- **articleId** - an string representing the id of the article, this can be used to display the article calling `intercom.presentContent(intercomContent.articleWithArticleId("articleID"))`
- **title**- a string, the title of the article


## Search the Help Center

To get a list of articles in the Help Center, filtered by a search term call:

```javascript
intercom.searchHelpCenter("searchTerm")
```

The method requires an NSString with a term to search. A successful response will return an Help Center Article searchresult object. It contains the follow values:

- **articleId** - an string with the id of the article, this can be used to display the article calling `intercom.presentContent(intercomContent.articleWithArticleId("articleID"))`
- **title** - a string with the title of the article
- **matchingSnippet** - an string with the part of the article that matched the search string provided
- **summary** - an string with a summary of the article