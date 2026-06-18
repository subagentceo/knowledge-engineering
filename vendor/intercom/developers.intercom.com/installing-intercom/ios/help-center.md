# Help Center

## Articles

From version 10.0.0 of the iOS SDK you can display your Help Center, show articles programmatically, filter your Help Center content and using our data methods, deeply embed your Intercom Help Center alongside your own content.

Check [here](https://www.intercom.com/help/en/articles/56660-resources-to-help-with-educating-your-customers) for more content on setting up your Help Center in Interccom.

To display a ViewController with your Help Center content, call the following method:

```objectivec
[Intercom presentHelpCenter];
```

```swift
Intercom.presentHelpCenter()
```

If you don't have Help Center enabled in your Intercom settings the method `presentHelpCenter` will fail to load. To enable your Help Center please go [here](https://app.intercom.com/a/apps/_/articles/site/settings/_) and click the "Turn On Help Center" button.

### Present an Article Programmatically

From version 8.1.0 of the iOS SDK you can programmatically present an Article. To present an Article, pass in an `articleID` from your Intercom workspace to the following method:

```objectivec
[Intercom presentArticle:@"123456"];
```

```swift
Intercom.presentArticle(“123456”)
```

Make sure the article is live
An article must be ‘live’ to be used in this way. If it is in a draft or paused state, end-users will see an error if the app tries to open the content.

## Collections

### Present a filtered Help Center

From version 10.0.0 of the iOS SDK you can now pass in 1 or more collection IDs to filter the Help Center. This will display the same ViewController as calling presentHelpCenter but the collections list will only show the IDs passed in.

```objectivec
[Intercom presentHelpCenterCollections:@[@"COLLECTION_1_ID", @"COLLECTION_2_ID"]];
```

```swift
Intercom.presentHelpCenterCollections(["COLLECTION_1_ID", "COLLECTION_2_ID"])
```

If the collection IDs are invalid or have no content, we will default to showing the complete Help Center list.

### Fetch Collections

To fetch a list of all Collections call:

```objectivec
[Intercom fetchHelpCenterCollectionsWithCompletion: completionBlock];
```

```swift
Intercom.fetchHelpCenterCollections(completion: completionBlock)
```

A successful response will return an Array of `ICMHelpCenterCollection` objects. An `ICMHelpCenterCollection` contains the follow values:

| Name | Type | Description |
|  --- | --- | --- |
| summary | NSString | A string that describes the collection |
| collectionId | NSString | An identifier for that collection, this can be used to fetch the sections/articles for this |
| title | NSString | The name of the collection |


### Fetch the contents of a collection

To get a list of sections/articles for a collections call:

```objectivec
[Intercom fetchHelpCenterCollection:@"COLLECTION_ID" withCompletion: completionBlock];
```

```swift
Intercom.fetchHelpCenterCollection("COLLECTION_ID", completion: completionBlock)
```

This method requires a `COLLECTION_ID`. You can get the IDs of your collections from `fetchHelpCenterCollections` or `searchHelpCenter` methods.

A collection can have a section (a group of articles with a header) or articles without a section. A successful response will return a `ICMHelpCenterCollectionContent` object. It contains the follow values:

| Name | Type | Description |
|  --- | --- | --- |
| collectionId | NSString | The ID for that collection |
| title | NSString | The name of the collection |
| summary | NSString | A string that describes the collection |
| articles | NSArray | An array of `ICMHelpCenterArticle` objects |
| sections | NSArray | An array of `ICMHelpCenterSection` objects |


A section is a grouping of articles with a name. The `ICMHelpCenterSection` model is described as:

| Name | Type | Description |
|  --- | --- | --- |
| title | NSString | The name of the section |
| articles | NSArray | An array of `ICMHelpCenterArticle` objects |


The `ICMHelpCenterArticle` model can be found both inside of sections, or at the top level of the collection content (not a part of any section). The `ICMHelpCenterArticle` model is described as:

| Name | Type | Description |
|  --- | --- | --- |
| articleId | NSString | The ID for that article, this can be used to display the article calling `presentArticle: articleId` |
| title | NSString | The title of the article |


### Search the Help Center

To get a list of articles in the Help Center, filtered by a search term call:

```objectivec
[Intercom searchHelpCenter:@"SEARCH_TERM" withCompletion: completionBlock];
```

```swift
Intercom.searchHelpCenter("SEARCH_TERM", completion: completionBlock)
```

The method requires an NSString with a term to search. A successful response will return an NSArray of `ICMHelpCenterArticleSearchResult` objects. It contains the follow values:

| Name | Type | Description |
|  --- | --- | --- |
| articleId | NSString | The ID for that article, this can be used to display the article calling `presentArticle: articleId` |
| title | NSString | The title of the article |
| matchingSnippet | NSString | The part of the article that matched the search string provided |
| summary | NSString | A summary of the article |


Errors returned from any of the methods come back in the `ICMHelpCenterDataError` object. The error can have the following types:

| Name | Description |
|  --- | --- |
| notFound | A 404, the content does not exist or has been removed |
| serverError | There was a server error, this covers most unsuccessful response codes. The code is returned in the log. |
| missingUserIdentity | you need to have registered a user to use any of the Intercom Help Center methods. |
| missingAppIdentity | you need to have set your app_id and api_key before calling any of the Help Center methods |
| invalidResponseObject | the server returned a 200 but the response could not be modelled by the Intercom SDK |
| unknownError | an unknown error type has occurred |