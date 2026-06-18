# Create an article

## Example Request & Response (Multilingual Help Center)

```curl
$ curl https://api.intercom.io/articles \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'\n-H 'Content-Type: application/json' -d\n\n{\n  \"title\": \"Thanks for everything\",\n  \"description\": \"English description\",\n  \"body\": \"<p>This is the body in html</p>\",\n  \"author_id\": 1,\n  \"state\": \"published\",\n  \"parent_id\": 1,\n  \"parent_type\": \"collection\",\n  \"translated_content\": {\n    \"fr\": {\n      \"title\": \"Allez les verts\",\n      \"description\": \"French description\",\n      \"body\": \"<p>French body in html</p>\",\n      \"author_id\": 1,\n      \"state\": \"published\"\n    }\n  }\n}
```

```http
HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"type\": \"article\",\n  \"workspace_id\": \"abcdef\",\n  \"title\": \"Thanks for everything\",\n  \"description\": \"English description\",\n  \"body': \"<p>This is the body in html</p>\",\n  \"author_id\": 1,\n  \"state\": \"published\",\n  \"created_at\": 7891011,\n  \"updated_at\": 7891011,\n  \"url\": \"http://intercom.test/help/en/articles/3-thanks-for-everything\",\n  \"parent_id\": 1,\n  \"parent_type\": \"collection\",\n  \"default_locale\": \"en\",\n  \"translated_content\": {\n    \"type\": \"article_translated_content\",\n    \"fr\": {\n      \"type\": \"article_content\",\n      \"title\": \"Allez les verts\",\n      \"description\": \"French description\",\n     \t\"body\": \"<p>French body in html</p>\",\n     \t\"author_id\": 1,\n     \t\"state\": \"published\",\n     \t\"created_at\": 7891011,\n     \t\"updated_at\": 7891011,\n     \t\"url\": \"http://intercom.test/help/fr/articles/3-allez-les-verts\"\n    }\n  },\n  \"statistics\": {\n      \"type\": \"article_statistics\",\n      \"views\": 0,\n      \"conversations\": 0,\n      \"reactions\": 0,\n      \"happy_reaction_percentage\": 0,\n      \"neutral_reaction_percentage\": 0,\n      \"sad_reaction_percentage\": 0\n  }\n}
```

You can create a new article by making a POST request to `https://api.intercom.io/articles`.

### Request Body Parameters

| Key | Type | Required? | Description |
|  --- | --- | --- | --- |
| title | String | Yes | The title of the article. For multilingual articles, this will be the title of the default language's content. |
| description | String | No | The description of the article. For multilingual articles, this will be the description of the default language's content. |
| body | String | No | The body of the article in HTML. For multilingual articles, this will be the body of the default language's content. |
| author_id | String | Yes | The id of the author of the article. For multilingual articles, this will be the id of the author of the default language's content. Must be a teammate on the help center's workspace. |
| state | String | No | Whether the article will be `published` or will be a `draft`.Defaults to `draft`.For multilingual articles, this will be the state of the default language's content. |
| parent_id | String | No | The id of the article's parent collection or section. An article without this field stands alone. |
| parent_type | String | No | The type of parent, which can either be a `collection` or `section`. |
| translated_content | Object | No | An [Article Translated Content Object](#section-article-translated-content-object) whereby you can specify multiple multilingual articles to be created. |


### Response

This will return an [Article model](/docs/references/2.4/rest-api/articles/the-article-model) of the article you just created.