# The article model

## Example Article Object

### JSON

```json
{  \"id\": 1,  \"type\": \"article\",  \"workspace_id\": \"abcdef\",  \"title\": \"Default language title\",  \"description\": \"Default language description\",  \"body\": \"Default language body in html\",  \"author_id\": 1,  \"state\": \"published\",  \"created_at\": 123456,  \"updated_at\": 123456,  \"url\": \"http://intercom.test/help/en/articles/3-default-language\",  \"parent_id\": 1,  \"parent_type\": \"collection\",  \"default_locale\": \"en\",  \"translated_content\": {    \"type\": \"article_translated_content\",    \"fr\": {      \"type\": \"article_content\",      \"title\": \"French title\",      \"description\": \"French description\",   \t  \"body\": \"French body in html\",   \t  \"author_id\": 1,     \t\"state\": \"published\",     \t\"created_at\": 7891011,     \t\"updated_at\": 7891011,     \t\"url\": \"http://intercom.test/help/fr/articles/3-french-multilingual\"    }  },  \"statistics\": {      \"type\": \"article_statistics\",      \"views\": 10,      \"conversations\": 0,      \"reactions\": 8,      \"happy_reaction_percentage\": 38,      \"neutral_reaction_percentage\": 38,      \"sad_reaction_percentage\": 25  }}
```

## Example HTML Body

### HTML

```html
<h1 class=\"intercom-align-left\">Header 1</h1><h2 class=\"intercom-align-left\">Header 2</h2><h2 class=\"intercom-align-center\">Centered Header</h2><p class=\"intercom-align-left\">   <a href=\"https://intercom.com\" target=\"_blank\">Link</a></p><ul>   <li>Single-level List</li></ul><pre><code>'Pre' Code</code></pre><p class=\"intercom-align-left\"><code>Inline code</code></p><p class=\"intercom-align-left\"><b>Bold text</b></p><p class=\"intercom-align-left\"><i>Italic text</i></p><p class=\"intercom-align-center\">Centered text</p><p class=\"intercom-align-left\">Image without link:</p><div class=\"intercom-container intercom-align-left\">   <img      src=\"https://downloads.intercomcdn.com/i/o/204050460/7a140f62f8e715d1d6cf246d/Image.jpg\"      /></div><p class=\"intercom-align-left\">Image with link:</p><div class=\"intercom-container intercom-align-left\">   <a target=\"_blank\" href=\"https://intercom.com\"      ><img      src=\"https://downloads.intercomcdn.com/i/o/204049719/b41c9a81c13b8a91023df1e7/Image.jpg\"      /></a></div><p class=\"intercom-align-left\">Image with link and centered:</p><div class=\"intercom-container intercom-align-center\">   <a target=\"_blank\" href=\"https://intercom.com\"      ><img      src=\"https://downloads.intercomcdn.com/i/o/204050579/2e85d79a0d9e0c47b088f50c/Image.jpg\"      /></a></div><div class=\"intercom-container intercom-align-left\">   <a class=\"intercom-h2b-button\" target=\"_blank\" href=\"https://intercom.com\"      >Button</a      ></div><div class=\"intercom-container intercom-align-center\">   <a class=\"intercom-h2b-button\" target=\"_blank\" href=\"https://intercom.com\"      >Centered Button</a      ></div><p class=\"intercom-align-left\">Video Embed with iFrame:</p><div class=\"intercom-h2b-video\">   <iframe      src=\"https://www.youtube.com/embed/jqO8AQHj7Fw?rel=0\"      frameborder=\"0\"      webkitallowfullscreen      mozallowfullscreen      allowfullscreen      ></iframe></div><p class=\"intercom-align-left\"></p>
```

The Articles API is a central place to gather all information and take actions on your articles. Articles can live within collections and sections, or alternatively they can stand alone.

For collections and sections you should refer to the [Help Center endpoint](/docs/references/2.4/rest-api/help-center/the-collection-section-models).

### Article Object

| Key | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `article`. |
| id | String | The unique identifier for the article which is given by Intercom. |
| workspace_id | String | The id of the workspace which the article belongs to. |
| title | String | The title of the article. For multilingual articles, this will be the title of the default language's content. |
| description | String | The description of the article. For multilingual articles, this will be the description of the default language's content. |
| body | String | The body of the article in HTML. For multilingual articles, this will be the body of the default language's content.See more on what we accept in the [Supported HTML](#supported-html) table below. |
| author_id | String | The id of the author of the article. For multilingual articles, this will be the id of the author of the default language's content. Must be a teammate on the help center's workspace. |
| state | String | Whether the article is published or is a draft. For multilingual articles, this will be the state of the default language's content. |
| created_at | Timestamp | The time when the article was created. For multilingual articles, this will be the timestamp of creation of the default language's content. |
| updated_at | Timestamp | The time when the article was last updated. For multilingual articles, this will be the timestamp of last update of the default language's content. |
| url | String | The URL of the article. For multilingual articles, this will be the URL of the default language's content. |
| parent_id | String | The id of the article's parent collection or section. An article without this field stands alone. |
| parent_type | String | The type of parent, which can either be a `collection` or `section`. |
| default_locale | String | The default locale of the help center. This field is only returned for multilingual help centers. |
| translated_content | Object | An [Article Translated Content Object](#article-translated-content-object) for multilingual articles. This field is only returned for multilingual help centers. |


### Article Translated Content Object

| Key | Type | Writeable? | Description |
|  --- | --- | --- | --- |
| type | String | No | The type of object - `article_translated_content`. |
| <locale>    `ar`, `bg`, `bs`, `ca`, `cs`, `da`, `de`, `'de-form'`, `el`, `en`, `es`, `et`, `fi`, `fr`, `he`, `hr`, `hu`, `id`, `it`, `ja`, `ko`, `lt`, `lv`, `mn`, `nb`, `nl`, `pl`, `'pt-BR'`, `pt`, `ro`, `ru`, `sl`, `sr`, `sv`, `tr`, `vi`, `'zh-CN'`, `'zh-TW'` | Object | Yes | An [Article Content Object](#article-content-object) for each supported locale of the multilingual help center.  The default locale's content and information will be contained in the initial [Article Object](#article-object).  If there's no content for a locale, the value will be `nil`. |


### Article Content Object

| Key | Type | Writeable? | Description |
|  --- | --- | --- | --- |
| type | String | No | The type of object - `article_content`. |
| title | String | Yes | The title of the article. |
| description | String | Yes | The description of the article. |
| body | String | Yes | The body of the article in HTML. |
| author | String | Yes | The id of the author of the article. |
| state | String | Yes | Whether the article is `published` or is a `draft`. |
| created_at | Timestamp | No | The time when the article was created. |
| updated_at | Timestamp | No | The time when the article was last updated. |
| url | String | No | The URL of the article. |


### Article Statistics Object

| Key | Type | Writeable? | Description |
|  --- | --- | --- | --- |
| type | String | No | The type of object - `article_statistics`. |
| views | Integer | No | The number of total views the article has received. |
| conversations | Integer | No | The number of conversations started from the article. |
| reactions | Integer | No | The number of total reactions the article has received. |
| happy_reaction_percentage | Integer | No | The percentage of happy reactions the article has received against other types of reaction. |
| neutral_reaction_percentage | Integer | No | The percentage of neutral reactions the article has received against other types of reaction. |
| sad_reaction_percentage | Integer | No | The percentage of sad reactions the article has received against other types of reaction. |


### Supported HTML

The table below defines the subset of HTML accepted when [creating](/docs/references/2.4/rest-api/articles/create-an-article)  or [updating](/docs/references/2.4/rest-api/articles/update-an-article) an Article. Over time we may add support for new HTML elements and attributes, since this will not constitute a breaking change, we advise any client code to support the full HTML specification when reading article content.

Removing element support, or otherwise changing the API in a way that causes previously supported HTML to become unsupported will be considered a breaking change.

| Tag | What does it do? | Additional Details |
|  --- | --- | --- |
| `<p>` | Paragraph | All text must be placed within paragraph tags. |
| `<br>` | Line break | Supported in-line. |
| `<hr>` | Horizontal rule | NA |
| `<h1>` `<h2>` | Heading | Only these two header tags are supported. All others will be replaced with `<h2>`. |
| `<a>` | Link | An image can be placed in-between the link tags. |
| `<img>` | Image | Images will be uploaded to Intercom and we'll use an Intercom link to display these.If these fail to upload then we'll hard fail and return `400 Bad Request`. |
| `<ul>` `<ol>` `<li>` | List | Lists must contain at least one non-empty `<li>` element.`<li>` elements can contain plain text, or any other supported HTML tags, except `<table>`.If these criteria aren't met, then the article will hard fail and return `400 Bad request`. |
| `<table>` | Table | Needs to have at least one row and one cell.Can contain any other supported HTML tags, except another `<table>` within.If these criteria aren't met then it will hard fail and return `400 Bad request`. |
| `<iframe>` | Video | `src` must be for a supported video embed link.Only works for Youtube, Wistia, Vimeo, Loom, Vidyard or StreamIO. |
| `<pre>` `<code>` | Pre-formatted code |  |
| `<b>` `<strong>` | Bold |  |
| `<i>` `<em>` | Italic |  |


### Supported CSS

| Class | What does it do? | Where does it work? |
|  --- | --- | --- |
| intercom-align-center | Center Alignment | **On tag level:** Headers, Paragraphs.  **On wrapping div:** Images, Buttons. |
| intercom-h2b-button | Button | **On tag level:** Links |


### Unsupported HTML

| Tag | What does it do? | What do we do? |
|  --- | --- | --- |
| `<dl>` | Definition List | Hard fail - `400 Bad Request` |
| `<ul>` or `<ol>` | Nested lists | Hard fail - `400 Bad Request` |
| `<iframe>` | iFrame  Unsupported video | Hard fail - `400 Bad Request` |
| `<div>` `<span>` | Content division | Replace with `<p>` |
| `<h3>` to `<h6>` | Heading | Replace with `<h2>` |
| `<form>` | Form | Remove from content |
| `<input>` `<textarea>` | Input | Remove from content |
| `<script>` | Javascript Script | Remove from content |
| `<head>` `<html>` `<footer>` etc. | All other tags | Remove from content  Internals replaced with `<p>` |