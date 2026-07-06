# Markdown Extension

Markdown extensions allow you to extend and enhance Visual Studio Code's built-in Markdown preview. This includes changing the look of the preview or adding support for new Markdown syntax.

## Changing the look of the Markdown preview with CSS

Extensions can contribute CSS to change the look or layout of the Markdown preview. Stylesheets are registered using the `markdown.previewStyles` Contribution Point in the extension's `package.json`:

```
"contributes": {
    "markdown.previewStyles": [
        "./style.css"
    ]
}
```

`"markdown.previewStyles"` is a list of files relative to the extension's root folder.

Contributed styles are added after the built-in Markdown preview styles but before a user's `"markdown.styles"`.

The Markdown Preview GitHub Styling extension is a good example that demonstrates using a stylesheet to make the Markdown preview look like GitHub's rendered Markdown. You can review the extension's source code on GitHub.

## Adding support for new syntax with markdown-it plugins

The VS Code Markdown preview supports the CommonMark specification. Extensions can add support for additional Markdown syntax by contributing a markdown-it plugin.

To contribute a markdown-it plugin, first add a `"markdown.markdownItPlugins"` contribution in your extension's `package.json`:

```
"contributes": {
    "markdown.markdownItPlugins": true
}
```

Then, in the extension's main `activation` function, return an object with a function named `extendMarkdownIt`. This function takes the current markdown-it instance and must return a new markdown-it instance:

```
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  return {
    extendMarkdownIt(md: any) {
      return md.use(require('markdown-it-emoji'));
    }
  };
}
```

To contribute multiple markdown-it plugins, return multiple `use` statements chained together:

```
return md.use(require('markdown-it-emoji')).use(require('markdown-it-hashtag'));
```

Extensions that contribute markdown-it plugins are activated lazily, when a Markdown preview is shown for the first time.

The markdown-emoji extension demonstrates using a markdown-it plugin to add emoji support to the markdown preview. You can review the Emoji extension's source code on GitHub.

You may also want to review:

*   Guidelines for markdown-it plugin developers
*   Existing markdown-it plugins

## Adding advanced functionality with scripts

For advanced functionality, extensions may contribute scripts that are executed inside of the Markdown preview.

```
"contributes": {
    "markdown.previewScripts": [
        "./main.js"
    ]
}
```

Contributed scripts are loaded asynchronously and reloaded on every content change.

The Markdown Preview Mermaid Support extension demonstrates using scripts to add Mermaid diagrams and flowchart support to the markdown preview. You can review the Mermaid extension's source code on GitHub.

7/1/2026