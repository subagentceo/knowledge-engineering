# Create an article

## Example Request & Response (Multilingual Help Center)

```curl
$ curl https://api.intercom.io/articles \\-X POST \\-H 'Authorization:Bearer <Your access token>' \\-H 'Accept:application/json'-H 'Content-Type: application/json' -d{  \"title\": \"Thanks for everything\",  \"description\": \"English description\",  \"body\": \"<p>This is the body in html</p>\",  \"author_id\": 1,  \"state\": \"published\",  \"parent_id\": 1,  \"parent_type\": \"collection\",  \"translated_content\": {    \"fr\": {      \"title\": \"Allez les verts\",      \"description\": \"French description\",      \"body\": \"<p>French body in html</p>\",      \"author_id\": 1,      \"state\": \"published\"    }  }}
```

```http
HTTP/1.1 200 OK{  \"id\": 1,  \"type\": \"article\",  \"workspace_id\": \"abcdef\",  \"title\": \"Thanks for everything\",  \"description\": \"English description\",  \"body': \"<p>This is the body in html</p>\",  \"author_id\": 1,  \"state\": \"published\",  \"created_at\": 7891011,  \"updated_at\": 7891011,  \"url\": \"http://intercom.test/help/en/articles/3-thanks-for-everything\",  \"parent_id\": 1,  \"parent_type\": \"collection\",  \"default_locale\": \"en\",  \"translated_content\": {    \"type\": \"article_translated_content\",    \"fr\": {      \"type\": \"article_content\",      \"title\": \"Allez les verts\",      \"description\": \"French description\",     \t\"body\": \"<p>French body in html</p>\",     \t\"author_id\": 1,     \t\"state\": \"published\",     \t\"created_at\": 7891011,     \t\"updated_at\": 7891011,     \t\"url\": \"http://intercom.test/help/fr/articles/3-allez-les-verts\"    }  },  \"statistics\": {      \"type\": \"article_statistics\",      \"views\": 0,      \"conversations\": 0,      \"reactions\": 0,      \"happy_reaction_percentage\": 0,      \"neutral_reaction_percentage\": 0,      \"sad_reaction_percentage\": 0  }}
```

You can create a new article by making a POST request to `https://api.intercom.io/articles`.

### Request Body Parameters

| Key | Type | Required? | Description |
|  --- | --- | --- | --- |
| title | String | Yes | The title of the article.  For multilingual articles, this will be the title of the default language's content. |
| description | String | No | The description of the article.  For multilingual articles, this will be the description of the default language's content. |
| body | String | No | The body of the article in HTML.  For multilingual articles, this will be the body of the default language's content. |
| author_id | String | Yes | The id of the author of the article.  For multilingual articles, this will be the id of the author of the default language's content. Must be a teammate on the help center's workspace. |
| state | String | No | Whether the article will be `published` or will be a `draft`.  Defaults to `draft`.  For multilingual articles, this will be the state of the default language's content. |
| parent_id | String | No | The id of the article's parent collection or section. An article without this field stands alone. |
| parent_type | String | No | The type of parent, which can either be a `collection` or `section`. |
| translated_content | Object | No | An [Article Translated Content Object](#article-translated-content-object) whereby you can specify multiple multilingual articles to be created. |


### Response

This will return an [Article object](/docs/references/2.1/rest-api/articles/the-article-model) of the article you just created.