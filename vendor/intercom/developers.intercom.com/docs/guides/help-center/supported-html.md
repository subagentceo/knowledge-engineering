# Allowed HTML for Articles

To provide the most flexibility possible, when [creating or updating an article](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Articles/createArticle/) you can use HTML and CSS to construct the article body. Whilst we allow a wide range of tags, we do not allow all of them. This is to ensure that we can render the article in all of our supported channels. You can find a list of supported tags below.

Over time we may add support for new HTML elements and attributes. This will not constitute a breaking change, we advise any client code to support the full HTML specification when reading article content. Removing element support, or otherwise changing the API in a way that causes previously supported HTML to become unsupported will be considered a breaking change.

## Supported HTML

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


## Supported CSS

| Class | What does it do? | Where does it work? |
|  --- | --- | --- |
| `intercom-align-center` | Center Alignment | **On tag level:** Headers, Paragraphs.**On wrapping div:** Images, Buttons. |
| `intercom-h2b-button` | Button | **On tag level:** Links |


## Unsupported HTML

| Tag | What does it do? | What do we do? |
|  --- | --- | --- |
| `<dl>` | Definition List | Hard fail - `400 Bad Request` |
| `<ul>` or `<ol>` | Nested lists | Hard fail - `400 Bad Request` |
| `<iframe>` | iFrameUnsupported video | Hard fail - `400 Bad Request` |
| `<div>` `<span>` | Content division | Replace with `<p>` |
| `<h3>` to `<h6>` | Heading | Replace with `<h2>` |
| `<form>` | Form | Remove from content |
| `<input>` `<textarea>` | Input | Remove from content |
| `<script>` | Javascript Script | Remove from content |
| `<head>` `<html>` `<footer>` etc. | All other tags | Remove from contentInternals replaced with `<p>` |