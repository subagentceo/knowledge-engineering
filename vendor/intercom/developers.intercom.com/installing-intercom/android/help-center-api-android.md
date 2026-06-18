# Help Center API

## Articles Help Center

You can display your Help Center, show articles programmatically, filter your Help Center content and using our data methods, deeply embed your Intercom Help Center alongside your own content.

Check [here](https://www.intercom.com/help/en/articles/56660-resources-to-help-with-educating-your-customers) for more content on setting up your Help Center in Interccom.

To display an Activity with your Help Center content, call the following method:

```Kotlin
Intercom.client().present(space = IntercomSpace.HelpCenter)
```

```Java
Intercom.client().present(IntercomSpace.HelpCenter);
```

> 🚧 Make sure Help Center is turned on
If you don't have Help Center enabled in your Intercom settings the method `displayHelpCenter` will fail to load. To enable your Help Center please go [here](https://app.intercom.com/a/apps/_/educate/site/settings) and click the "Turn On Help Center" button.


## Present an Article Programmatically

To present an Article programatically, pass in an articleID from your Intercom workspace to the following method:

```Kotlin
Intercom.client().presentContent(content = IntercomContent.Article(id = "123456"))
```

```Java
Intercom.client().presentContent(IntercomContent.Article(id = "123456"));
```

> 🚧 Make sure your article is live
An article must be ‘live’ to be used in this way. If it is in a draft or paused state, end-users will see an error if the app tries to open the content.


## Present a filtered Help Center

You can pass in 1 or more collection IDs to filter the Help Center. This will display the same Activity as calling `present(IntercomSpace.HelpCenter);` but the collections list will only show the IDs passed in.

```Kotlin
Intercom.client().presentContent(
  content = IntercomContent.HelpCenterCollections(
    ids = listOf("COLLECTION_1_ID", "COLLECTION_2_ID")
  )
)
```

```Java
Intercom.client().presentContent(
  IntercomContent.HelpCenterCollections(
    Arrays.asList("COLLECTION_1_ID", "COLLECTION_2_ID")
  )
);
```

> 🚧 Empty or invalid collection IDs
If the collection IDs are invalid or have no content, we will default to showing the complete Help Center list.


## Using the data API

From version 10.0.0 you can now fetch the data directly and build your own UI. This is useful when you want to show Intercom collections alongside your other support content.

## Fetch Collections

To fetch a list of all Collections call:

```Kotlin
Intercom.client().fetchHelpCenterCollections(collectionRequestCallback)
```

```Java
Intercom.client().fetchHelpCenterCollections(collectionRequestCallback);
```

The `CollectionRequestCallback` has three callbacks:

- **onComplete** - if the request is successful we return a list of `HelpCenterCollection` objects.
- **onError** - we return onError for any server errors or if the content isn’t found. We return the error code to the client, this would include errors like 500s, 404s, 401s.
- **onFailure** - we hit this block if we either had a connectivity issue or some unknown error


The `HelpCenterCollection` object contains the follow values:

- **summary** - an optional string that describes the collection
- **id** - a string to identify that collection, this can be used to fetch the sections/articles for this
- **title** - a string with the title of the collection


## Fetch the contents of a collection

To get a list of sections/articles for a collections call:

```Kotlin
Intercom.client().fetchHelpCenterCollection("COLLECTION_ID", collectionContentCallback)
```

```Java
Intercom.client().fetchHelpCenterCollection("COLLECTION_ID", collectionContentCallback);
```

This method requires a “COLLECTION_ID”. You can get the IDs of your collections from `fetchHelpCenterCollections` or `fetchFilteredCollections` methods.

The `CollectionContentRequestCallback` has three callbacks:

- **onComplete** - if the request is successful we return a `HelpCenterCollectionContent` object.
- **onError** - we return onError for any server errors or if the content isn’t found. We return the error code to the client, this would include errors like 500s, 404s, 401s.
- **onFailure** - we hit this block if we either had a connectivity issue or some unknown error


A collection can have a section (a group of articles with a header) or articles without a section. The `HelpCenterCollectionContent` object contains the following values:

- **id** - a string, the id of the collection
- **name** - a string with the name of the collection
- **summary** - an optional string that describes the collection
- **articles** - a list of `HelpCenterArticle` objects
- **sections** - a list of `HelpCenterSection` objects


A section is a grouping of articles with a name. The `HelpCenterSection` model is described as:

- **name** - a string, the name of the section
- **articles** - a list of `HelpCenterArticle` objects


The `HelpCenterArticle` model can be found both inside of sections, or at the top level of the collection content (not a part of any section). The `HelpCenterArticle` model is described as:

- **articleId** - a string, the id of the article, this can be used to display the article calling `displayArticle(articleId)`
- **title** - a string, the title of the article


## Search the Help Center

To get a list of articles in the Help Center, filtered by a search term call:

```Kotlin
Intercom.client().searchHelpCenter("SEARCH_TERM", searchCallback)
```

```Java
Intercom.client().searchHelpCenter("SEARCH_TERM", searchCallback);
```

The method takes a string to filter the Collections. The `SearchRequestCallback` has three callbacks:

- **onComplete** - if the request is successful we return a list of `HelpCenterArticleSearchResult` objects.
- **onError** - we return onError for any server errors or if the content isn’t found. We return the error code to the client, this would include errors like 500s, 404s, 401s.
- **onFailure** - we hit this block if we either had a connectivity issue or some unknown error


The `HelpCenterArticleSearchResult` object contains the follow values:

- **articleId** - a string, the id of the article, this can be used to display the article calling `displayArticle(articleId)`
- **title** - a string, the title of the article
- **matchingSnippet** - a string with the part of the article that matched the search string provided
- **summary** - a with a summary of the article