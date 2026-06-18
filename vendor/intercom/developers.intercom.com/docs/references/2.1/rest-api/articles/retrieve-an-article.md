# Retrieve an article

## Example Request & Response (Multilingual Help Center)

```curl
$ curl https://api.intercom.io/articles/<id> \\\n-X GET \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'\n-H 'Content-Type: application/json' -d
```

```http
HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"type\": \"article\",\n  \"workspace_id\": \"abcdef\",\n  \"title\": \"New title\",\n  \"description\": \"English description\",\n  \"body': \"<p>This is the body in html</p>\",\n  \"author_id\": 1,\n  \"state\": \"published\",\n  \"created_at\": 7891011,\n  \"updated_at\": 7892022,\n  \"url\": \"http://intercom.test/help/en/articles/3-thanks-for-everything\",\n  \"parent_id\": 1,\n  \"parent_type\": \"collection\",\n  \"default_locale\": \"en\",\n  \"translated_content\": {\n    \"type\": \"article_translated_content\",\n    \"fr\": {\n      \"type\": \"article_content\",\n      \"title\": \"Allez les verts\",\n      \"description\": \"French description\",\n     \t\"body\": \"<p>French body in html</p>\",\n     \t\"author_id\": 1,\n     \t\"state\": \"published\",\n     \t\"created_at\": 7891011,\n     \t\"updated_at\": 7891011,\n     \t\"url\": \"http://intercom.test/help/fr/articles/3-allez-les-verts\"\n    },\n    \"es\": {\n      \"title\": \"Nuevo título\",\n      \"description\": nil,\n     \t\"body\": <p>Spanish body in html</p>,\n     \t\"author_id\": 1,\n     \t\"state\": \"published\",\n     \t\"created_at\": 7892022,\n     \t\"updated_at\": 7892022,\n     \t\"url\": \"http://intercom.test/help/fr/articles/3-allez-les-verts\"\n    }\n  },\n  \"statistics\": {\n      \"type\": \"article_statistics\",\n      \"views\": 10,\n      \"conversations\": 0,\n      \"reactions\": 8,\n      \"happy_reaction_percentage\": 38,\n      \"neutral_reaction_percentage\": 38,\n      \"sad_reaction_percentage\": 25\n  }  \n}
```

You can fetch the details of a single article by making a GET request to `https://api.intercom.io/articles/<id>`.

### Request Path Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the article which is given by Intercom. |


### Response

This will return an [Article model](/docs/references/2.1/rest-api/articles/the-article-model).