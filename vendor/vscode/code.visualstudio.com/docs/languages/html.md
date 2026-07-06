# HTML in Visual Studio Code

Visual Studio Code provides basic support for HTML programming out of the box. There is syntax highlighting, smart completions with IntelliSense, and customizable formatting. VS Code also includes great Emmet support.

## IntelliSense

As you type in HTML, we offer suggestions via HTML IntelliSense. In the image below, you can see a suggested HTML element closure `</div>` as well as a context specific list of suggested elements.

![HTML IntelliSense](/assets/docs/languages/html/htmlintellisense.png)

Document symbols are also available for HTML, allowing you to quickly navigate to DOM nodes by id and class name.

You can also work with embedded CSS and JavaScript. However, note that script and style includes from other files are not followed, the language support only looks at the content of the HTML file.

You can trigger suggestions at any time by pressing ⌃Space (Windows, Linux Ctrl+Space).

You can also control which built-in code completion providers are active. Override these in your user or workspace settings if you prefer not to see the corresponding suggestions.

```
// Configures if the built-in HTML language suggests HTML5 tags, properties and values.
"html.suggest.html5": true
```

## Close tags

Tag elements are automatically closed when `>` of the opening tag is typed.

![HTML Close1](/assets/docs/languages/html/auto-close1.gif)

The matching closing tag is inserted when `/` of the closing tag is entered.

![HTML Close2](/assets/docs/languages/html/auto-close2.gif)

You can turn off autoclosing tags with the following setting:

```
"html.autoClosingTags": false
```

## Auto update tags

When modifying a tag, the linked editing feature automatically updates the matching closing tag. The feature is optional and can be enabled by setting:

```
"editor.linkedEditing": true
```

## Color picker

The VS Code color picker UI is now available in HTML style sections.

![color picker in HTML](/assets/docs/languages/html/color-picker-html.png)

It supports configuration of hue, saturation and opacity for the color that is picked up from the editor. It also provides the ability to trigger between different color modes by clicking on the color string at the top of the picker. The picker appears on a hover when you are over a color definition.

## Hover

Move the mouse over HTML tags or embedded styles and JavaScript to get more information on the symbol under the cursor.

![HTML Hover](/assets/docs/languages/html/htmlhover.png)

## Validation

The HTML language support performs validation on all embedded JavaScript and CSS.

You can turn that validation off with the following settings:

```
// Configures if the built-in HTML language support validates embedded scripts.
"html.validate.scripts": true,

// Configures if the built-in HTML language support validates embedded styles.
"html.validate.styles": true
```

## Folding

You can fold regions of source code using the folding icons on the gutter between line numbers and line start. Folding regions are available for all HTML elements for multiline comments in the source code.

Additionally you can use the following region markers to define a folding region: `<!-- #region -->` and `<!-- #endregion -->`

If you prefer to switch to indentation based folding for HTML use:

```
"[html]": {
    "editor.foldingStrategy": "indentation"
},
```

## Preview HTML files in the Integrated Browser

You can preview HTML files in the Integrated Browser inside VS Code.

To open an HTML file in the Integrated Browser, right-click the file in the File Explorer or the editor tab and select **Open in Integrated Browser**. You can also select the **Show Preview** icon in the editor title bar when an HTML file is active.

As you modify the HTML file, the preview updates in real time to reflect your changes.

## Formatting

To improve the formatting of your HTML source code, you can use the **Format Document** command ⇧⌥F (Windows Shift+Alt+F, Linux Ctrl+Shift+I) to format the entire file or **Format Selection** ⌘K ⌘F (Windows, Linux Ctrl+K Ctrl+F) to just format the selected text.

The HTML formatter is based on js-beautify. The formatting options offered by that library are surfaced in the VS Code settings:

*   html.format.wrapLineLength Open in VS Code Open in VS Code Insiders : Maximum amount of characters per line.
*   html.format.unformatted Open in VS Code Open in VS Code Insiders : List of tags that shouldn't be reformatted.
*   html.format.contentUnformatted Open in VS Code Open in VS Code Insiders : List of tags, comma separated, where the content shouldn't be reformatted.
*   html.format.extraLiners Open in VS Code Open in VS Code Insiders : List of tags that should have an extra newline before them.
*   html.format.preserveNewLines Open in VS Code Open in VS Code Insiders : Whether existing line breaks before elements should be preserved.
*   html.format.maxPreserveNewLines Open in VS Code Open in VS Code Insiders : Maximum number of line breaks to be preserved in one chunk.
*   html.format.indentInnerHtml Open in VS Code Open in VS Code Insiders : Indent `<head>` and `<body>` sections.
*   html.format.wrapAttributes Open in VS Code Open in VS Code Insiders : Wrapping strategy for attributes:
    *   `auto`: Wrap when the line length is exceeded
    *   `force`: Wrap all attributes, except first
    *   `force-aligned`: Wrap all attributes, except first, and align attributes
    *   `force-expand-multiline`: Wrap all attributes
    *   `aligned-multiple`: Wrap when line length is exceeded, align attributes vertically
    *   `preserve`: Preserve wrapping of attributes
    *   `preserve-aligned`: Preserve wrapping of attributes but align
*   html.format.wrapAttributesIndentSize Open in VS Code Open in VS Code Insiders : Alignment size when using `force aligned` and `aligned multiple` in html.format.wrapAttributes Open in VS Code Open in VS Code Insiders or `null` to use the default indent size.
*   html.format.templating Open in VS Code Open in VS Code Insiders : Honor django, erb, handlebars and php templating language tags.
*   html.format.unformattedContentDelimiter Open in VS Code Open in VS Code Insiders : Keep text content together between this string.

Tip

The formatter doesn't format the tags listed in the html.format.unformatted Open in VS Code Open in VS Code Insiders and html.format.contentUnformatted Open in VS Code Open in VS Code Insiders settings. Embedded JavaScript is formatted unless 'script' tags are excluded.

The Marketplace has several alternative formatters to choose from. If you want to use a different formatter, define `"html.format.enable": false` in your settings to turn off the built-in formatter.

## Emmet snippets

VS Code supports Emmet snippet expansion. Emmet abbreviations are listed along with other suggestions and snippets in the editor auto-completion list.

![Emmet HTML support built-in](/assets/docs/languages/html/emmetsnippet.gif)

Tip

See the HTML section of the Emmet cheat sheet for valid abbreviations.

If you'd like to use HTML Emmet abbreviations with other languages, you can associate one of the Emmet modes (such as `css`, `html`) with other languages with the emmet.includeLanguages Open in VS Code Open in VS Code Insiders setting. The setting takes a language identifier and associates it with the language ID of an Emmet supported mode.

For example, to use Emmet HTML abbreviations inside JavaScript:

```
{
  "emmet.includeLanguages": {
    "javascript": "html"
  }
}
```

We also support User Defined Snippets.

## HTML custom data

You can extend VS Code's HTML support through a declarative custom data format. By setting html.customData Open in VS Code Open in VS Code Insiders to a list of JSON files following the custom data format, you can enhance VS Code's understanding of new HTML tags, attributes and attribute values. VS Code will then offer language support such as completion & hover information for the provided tags, attributes and attribute values.

You can read more about using custom data in the vscode-custom-data repository.

## HTML extensions

Install an extension to add more functionality. Go to the **Extensions** view (⇧⌘X (Windows, Linux Ctrl+Shift+X)) and type 'html' to see a list of relevant extensions to help with creating and editing HTML.

Tip

Select an extension tile above to read the description and reviews to decide which extension is best for you. See more in the Marketplace.

## Next steps

Read on to find out about:

*   CSS, SCSS, and Less - VS Code has first class support for CSS including Less and SCSS.
*   Emmet - Learn about VS Code's powerful built-in Emmet support.
*   Emmet official documentation - Emmet, the essential toolkit for web-developers.

7/1/2026