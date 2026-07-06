# Extension Manifest

Every Visual Studio Code extension needs a manifest file `package.json` at the root of the extension directory structure.

## Fields

Name

Required

Type

Details

`name`

Y

`string`

The name of the extension - should be all lowercase with no spaces.  
The name must be unique to the Marketplace.

`version`

Y

`string`

SemVer compatible version.

`publisher`

Y

`string`

The publisher identifier

`engines`

Y

`object`

An object containing at least the `vscode` key matching the versions of VS Code that the extension is compatible with. Cannot be `*`. For example: `^0.10.5` indicates compatibility with a minimum VS Code version of `0.10.5`.

`license`

`string`

Refer to npm's documentation. If you do have a `LICENSE` file in the root of your extension, the value for `license` should be `"SEE LICENSE IN <filename>"`.

`displayName`

`string`

The display name for the extension used in the Marketplace.  
The display name must be unique to the Marketplace.

`description`

`string`

A short description of what your extension is and does.

`categories`

`string[]`

The categories you want to use for the extensions. Allowed values: `[Programming Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, SCM Providers, Other, Extension Packs, Language Packs, Data Science, Machine Learning, Visualization, Notebooks, Education, Testing]`

`keywords`

`array`

An array of **keywords** to make it easier to find the extension. These are included with other extension **Tags** on the Marketplace. This list is currently limited to 30 keywords.

`galleryBanner`

`object`

Helps format the Marketplace header to match your icon. See details below.

`preview`

`boolean`

Sets the extension to be flagged as a Preview in the Marketplace.

`main`

`string`

The entry point to your extension.

`browser`

`string`

The entry point to your Web extension.

`contributes`

`object`

An object describing the extension's contributions.

`activationEvents`

`array`

An array of the activation events for this extension.

`badges`

`array`

Array of approved badges to display in the sidebar of the Marketplace's extension page. Each badge is an object containing 3 properties: `url` for the badge's image URL, `href` for the link users will follow when clicking the badge and `description`.

`markdown`

`string`

Controls the Markdown rendering engine used in the Marketplace. Either `github` (default) or `standard`.

`qna`

`marketplace` (default), `string`, `false`

Controls the **Q & A** link in the Marketplace. Set to `marketplace` to enable the default Marketplace Q & A site. Set to a string to provide the URL of a custom Q & A site. Set to `false` to disable Q & A altogether.

`sponsor`

`object`

Specify the location from where users can sponsor your extension. This is an object with a single property `url`, which links to a page where users can sponsor your extension.

`dependencies`

`object`

Any runtime Node.js dependencies your extensions needs. Exactly the same as npm's `dependencies`.

`devDependencies`

`object`

Any development Node.js dependencies your extension needs. Exactly the same as npm's `devDependencies`.

`extensionPack`

`array`

An array with the ids of extensions that can be installed together. The id of an extension is always `${publisher}.${name}`. For example: `vscode.csharp`.

`extensionDependencies`

`array`

An array with the ids of extensions that this extension depends on. The id of an extension is always `${publisher}.${name}`. For example: `vscode.csharp`.

`extensionKind`

`array`

An array that indicates where the extension should run in remote configurations. Values are `ui` (run locally), `workspace` (run on remote machine) or both, with the order setting the preference. For example: `[ui, workspace]` indicates the extension can run in either location but prefers to run on the local machine. See here for more details.

`scripts`

`object`

Exactly the same as npm's `scripts` but with extra VS Code specific fields such as vscode:prepublish or vscode:uninstall.

`icon`

`string`

The path to the icon of at least 128x128 pixels (256x256 for Retina screens).

`pricing`

`string`

The pricing information for the extension. Allowed values: `Free`, `Trial`. Default: `Free`. See here for more details.

`capabilities`

`object`

An object describing the extension's capabilities in limited workspaces: `untrustedWorkspaces`, `virtualWorkspaces`.

Also check npm's `package.json` reference.

## Example

Here is a complete `package.json`

```
{
  "name": "wordcount",
  "displayName": "Word Count",
  "version": "0.1.0",
  "publisher": "ms-vscode",
  "description": "Markdown Word Count Example - reports out the number of words in a Markdown file.",
  "author": {
    "name": "sean"
  },
  "categories": ["Other"],
  "icon": "images/icon.png",
  "galleryBanner": {
    "color": "#C80000",
    "theme": "dark"
  },
  "pricing": "Free",
  "activationEvents": ["onLanguage:markdown"],
  "engines": {
    "vscode": "^1.0.0"
  },
  "main": "./out/extension",
  "scripts": {
    "vscode:prepublish": "node ./node_modules/vscode/bin/compile",
    "compile": "node ./node_modules/vscode/bin/compile -watch -p ./"
  },
  "devDependencies": {
    "@types/vscode": "^0.10.x",
    "typescript": "^1.6.2"
  },
  "license": "SEE LICENSE IN LICENSE.txt",
  "bugs": {
    "url": "https://github.com/microsoft/vscode-wordcount/issues",
    "email": "sean@contoso.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/microsoft/vscode-wordcount.git"
  },
  "homepage": "https://github.com/microsoft/vscode-wordcount/blob/main/README.md"
}
```

## Marketplace Presentation Tips

Here are some tips and recommendations to make your extension look great when displayed on the VS Code Marketplace.

Always use the latest `vsce` so `npm install -g @vscode/vsce` to make sure you have it.

Have a `README.md` Markdown file in your extension's root folder and we will include the contents in the body of the extension details (on the Marketplace). You can provide relative path image links in the `README.md`.

Here are a few examples:

1.  Word Count
2.  MD Tools

Provide a good display name and description. This is important for the Marketplace and in product displays. These strings are also used for text search in VS Code and having relevant keywords will help a lot.

```
    "displayName": "Word Count",
    "description": "Markdown Word Count Example - reports out the number of words in a Markdown file.",
```

An icon and a contrasting banner color look great on the Marketplace page header. The `theme` attribute refers to the font to be used in the banner - `dark` or `light`.

```
{
  "icon": "images/icon.png",
  "galleryBanner": {
    "color": "#C80000",
    "theme": "dark"
  }
}
```

There are several optional links (`bugs`, `homepage`, `repository`) you can set and these are displayed under the **Resources** section of the Marketplace.

```
{
  "license": "SEE LICENSE IN LICENSE.txt",
  "homepage": "https://github.com/microsoft/vscode-wordcount/blob/main/README.md",
  "bugs": {
    "url": "https://github.com/microsoft/vscode-wordcount/issues",
    "email": "sean@contoso.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/microsoft/vscode-wordcount.git"
  }
}
```

Marketplace Resources link

package.json attribute

Issues

`bugs:url`

Repository

`repository:url`

Homepage

`homepage`

License

`license`

Set a `category` for your extension. Extensions in the same `category` are grouped together on the Marketplace which improves filtering and discovery.

> **Note:** Only use the values that make sense for your extension. Allowed values are `[Programming Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, SCM Providers, Other, Extension Packs, Language Packs, Data Science, Machine Learning, Visualization, Notebooks, Education, Testing]`. Use `Programming Languages` for general language features like syntax highlighting and code completions. The category `Language Packs` is reserved for display language extensions (for example, localized Bulgarian).

```
{
  "categories": ["Linters", "Programming Languages", "Other"]
}
```

### Approved Badges

Due to security concerns, we only allow badges from trusted services.

We allow badges from the following URL prefixes:

*   api.travis-ci.com
*   app.fossa.io
*   badge.buildkite.com
*   badge.fury.io
*   badgen.net
*   badges.frapsoft.com
*   badges.gitter.im
*   cdn.travis-ci.com
*   ci.appveyor.com
*   circleci.com
*   cla.opensource.microsoft.com
*   codacy.com
*   codeclimate.com
*   codecov.io
*   coveralls.io
*   david-dm.org
*   deepscan.io
*   dev.azure.com
*   docs.rs
*   flat.badgen.net
*   github.com (from Workflows only)
*   gitlab.com
*   godoc.org
*   goreportcard.com
*   img.shields.io
*   isitmaintained.com
*   marketplace.visualstudio.com
*   nodesecurity.io
*   opencollective.com
*   snyk.io
*   travis-ci.com
*   visualstudio.com
*   vsmarketplacebadges.dev

Note : Replace vsmarketplacebadge.apphb.com badge with vsmarketplacebadges.dev badge.

If you have other badges you would like to use, please open a GitHub issue and we're happy to take a look.

## Combining Extension Contributions

The `yo code` generator lets you easily package TextMate themes, colorizers and snippets and create new extensions. When the generator is run, it creates a complete standalone extension package for each option. However, it is often more convenient to have a single extension which combines multiple contributions. For example, if you are adding support for a new language, you'd like to provide users with both the language definition with colorization and also snippets and perhaps even debugging support.

To combine extension contributions, edit an existing extension manifest `package.json` and add the new contributions and associated files.

Below is an extension manifest which includes a LaTex language definition (language identifier and file extensions), colorization (`grammars`), and snippets.

```
{
  "name": "language-latex",
  "description": "LaTex Language Support",
  "version": "0.0.1",
  "publisher": "someone",
  "engines": {
    "vscode": "0.10.x"
  },
  "categories": ["Programming Languages", "Snippets"],
  "contributes": {
    "languages": [
      {
        "id": "latex",
        "aliases": ["LaTeX", "latex"],
        "extensions": [".tex"]
      }
    ],
    "grammars": [
      {
        "language": "latex",
        "scopeName": "text.tex.latex",
        "path": "./syntaxes/latex.tmLanguage.json"
      }
    ],
    "snippets": [
      {
        "language": "latex",
        "path": "./snippets/snippets.json"
      }
    ]
  }
}
```

Notice that the extension manifest `categories` attribute now includes both `Programming Languages` and `Snippets` for easy discovery and filtering on the Marketplace.

> **Tip:** Make sure your merged contributions are using the same identifiers. In the example above, all three contributions are using "latex" as the language identifier. This lets VS Code know that the colorizer (`grammars`) and snippets are for the LaTeX language and will be active when editing LaTeX files.

## Extension Packs

You can bundle separate extensions together in **Extension Packs**. An Extension Pack is a set of extensions that will be installed together. This enables easily sharing your favorite extensions with other users or creating a set of extensions for a particular scenario like PHP development to help a PHP developer get started with VS Code quickly.

An Extension Pack bundles other extensions using the `extensionPack` attribute inside the `package.json` file.

For example, here is an Extension Pack for PHP that includes a debugger and a language service:

```
{
  "extensionPack": ["xdebug.php-debug", "zobo.php-intellisense"]
}
```

When installing an Extension Pack, VS Code will now also install its extension dependencies.

Extension packs should be categorized in the `Extension Packs` Marketplace category:

```
{
  "categories": ["Extension Packs"]
}
```

To create an extension pack, you can use the `yo code` Yeoman generator and choose the **New Extension Pack** option. There is an option to seed the pack with the set of extensions you have currently installed in your VS Code instance. In this way, you can easily create an Extension Pack with your favorite extensions, publish it to the Marketplace, and share it with others.

An Extension Pack should not have any functional dependencies with its bundled extensions and the bundled extensions should be manageable independent of the pack. If an extension has a dependency on another extension, that dependency should be declared with the `extensionDependencies` attribute.

## Extension uninstall hook

If your extension has some clean up to be done when it is uninstalled from VS Code, you can register a `node` script to the uninstall hook `vscode:uninstall` under `scripts` section in extension's package.json.

```
{
  "scripts": {
    "vscode:uninstall": "node ./out/src/lifecycle"
  }
}
```

This script gets executed when the extension is completely uninstalled from VS Code which is when VS Code is restarted (shutdown and start) after the extension is uninstalled.

**Note**: Only Node.js scripts are supported.

## Useful Node modules

There are several Node.js modules available on npmjs to help with writing VS Code extensions. You can include these in your extension's `dependencies` section.

*   vscode-nls - Support for externalization and localization.
*   vscode-uri - The URI implementation used by VS Code and its extensions.
*   jsonc-parser - A scanner and fault tolerant parser to process JSON with or without comments.
*   request-light - A light weight Node.js request library with proxy support
*   vscode-extension-telemetry - Consistent telemetry reporting for VS Code extensions.
*   vscode-languageclient - Easily integrate language servers adhering to the language server protocol.

## Next steps

To learn more about VS Code extensibility model, try these topics:

*   Contribution Points - VS Code contribution points reference
*   Activation Events - VS Code activation events reference
*   Extension Marketplace - Read more about the VS Code Extension Marketplace

7/1/2026