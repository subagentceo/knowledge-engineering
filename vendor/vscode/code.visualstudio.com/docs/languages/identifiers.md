# Language Identifiers

In Visual Studio Code, each language mode has a unique specific language identifier. That identifier is rarely seen by the user except in the settings, for example, when associating file extensions to a language:

```
    "files.associations": {
        "*.myphp": "php"
    }
```

Note that casing matters for exact identifier matching ('Markdown' != 'markdown')

The language identifier becomes essential for VS Code extension developers when adding new language capabilities or when replacing a language support.

Every language defines its _id_ through the `languages` configuration point in the extension's `package.json` file:

```
    "languages": [{
        "id": "java",
        "extensions": [ ".java", ".jav" ],
        "aliases": [ "Java", "java" ]
    }]
```

Language supports are added using the language identifier:

```
    "grammars": [{
        "language": "groovy",
        "scopeName": "source.groovy",
        "path": "./syntaxes/Groovy.tmLanguage.json"
    }],
    "snippets": [{
        "language": "groovy",
        "path": "./snippets/groovy.json"
    }]
```

```
languages.registerCompletionItemProvider('php', new PHPCompletionItemProvider(), '.', '$');
```

## New identifier guidelines

When defining a new language identifier, use the following guidelines:

*   Use the lowercased programming language name.
*   Search for other extensions in the Marketplace to find out if a language identifier has already been used.

## Known language identifiers

The following table lists known language identifiers:

Language

Identifier

Agent

`chatagent`

Batch

`bat`

BibTeX

`bibtex`

Binary

`code-text-binary`

C

`c`

C#

`csharp`

C++

`cpp`

Clojure

`clojure`

Code Snippets

`snippets`

CoffeeScript

`coffeescript`

Compose

`dockercompose`

CSS

`css`

CUDA C++

`cuda-cpp`

Dart

`dart`

Diff

`diff`

Docker

`dockerfile`

Dotenv

`dotenv`

F#

`fsharp`

Git Commit Message

`git-commit`

Git Rebase Message

`git-rebase`

Go

`go`

Groovy

`groovy`

Handlebars

`handlebars`

HLSL

`hlsl`

HTML

`html`

Ignore

`ignore`

Ini

`ini`

Instructions

`instructions`

Java

`java`

JavaScript

`javascript`

JavaScript JSX

`javascriptreact`

JSON

`json`

JSON Lines

`jsonl`

JSON with Comments

`jsonc`

Julia

`julia`

Julia Markdown

`juliamarkdown`

LaTeX

`latex`

Less

`less`

Log

`log`

Lua

`lua`

Makefile

`makefile`

Markdown

`markdown`

MS SQL

`sql`

Objective-C

`objective-c`

Objective-C++

`objective-cpp`

Perl

`perl`

PHP

`php`

Plain Text

`plaintext`

PowerShell

`powershell`

Prompt

`prompt`

Properties

`properties`

Pug

`jade`

Python

`python`

R

`r`

Raku

`raku`

Razor

`razor`

reStructuredText

`restructuredtext`

Ruby

`ruby`

Rust

`rust`

SCSS

`scss`

Search Result

`search-result`

ShaderLab

`shaderlab`

Shell Script

`shellscript`

Skill

`skill`

Swift

`swift`

TeX

`tex`

TypeScript

`typescript`

TypeScript JSX

`typescriptreact`

Visual Basic

`vb`

WebAssembly Text Format

`wat`

XML

`xml`

XSL

`xsl`

YAML

`yaml`

7/1/2026