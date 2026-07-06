# Authoring Python Extensions

> **Note**: If you are new to VS Code extension authoring, you may want to read the Your First Extension tutorial first and try creating a simple Hello World extension.

The Python extension provides APIs for other extensions to work with Python environments available on the user's machine. Check out @vscode/python-extension npm module that includes types and helper utilities to access these APIs from your extension.

## Python extension template

The Python extension template helps get you started building a Visual Studio Code extension for your favorite Python tool. It could be a linter, formatter, or code analysis, or all of those together. The template will give you the basic building blocks you need to build an extension that integrates your tool into VS Code, and it already has access to the Python APIs mentioned above.

## Programming languages and frameworks

The extension template has two parts, the extension part and language server part. The extension part is written in TypeScript, and language server part is written in Python over the `pygls` (Python language server) library.

You will mostly be working on the Python part of the code when using this template. You will be integrating your tool with the extension part using the Language Server Protocol. `pygls` currently works on the version 3.16 of LSP.

The TypeScript part handles working with VS Code and its UI. The extension template comes with a few settings built-in that can be used by your tool. If you need to add new settings to support your tool, you will have to work with a bit of TypeScript. The extension template has examples for a few settings and you can also look at extensions developed by our team for some of the popular tools.

## Requirements

1.  VS Code 1.64.0 or greater
2.  Python 3.7 or greater
3.  node >= 14.19.0
4.  npm >= 8.3.0 (`npm` is installed with node, check npm version, use `npm install -g npm@8.3.0` to update)
5.  Python extension for VS Code

You should know how to create and work with Python virtual environments.

## Getting started

To get started, follow the instructions in the template README. There you will learn how to use the template to create your repository and how to install the necessary tools (for example, the nox task runner) and optional dependencies (testing support).

The README has the most up-to-date instructions and also goes into details on how to customize the extension's `package.json` placeholders (`<pythontool-module>`, `<pythontool-display-name>`, etc.).

## Features of the template

After creating your extension via the template, it will include the following extension contributions. Assume `<pytool-module>` was replaced with `mytool`, and `<pytool-display-name>` with`My Tool`:

1.  A command **My Tool: Restart Server** (command ID: `mytool.restart`).
2.  Following settings:
    *   `mytool.logLevel`
    *   `mytool.args`
    *   `mytool.path`
    *   `mytool.importStrategy`
    *   `mytool.interpreter`
    *   `mytool.showNotification`
3.  Following triggers for extension activation:
    *   On Language `python`.
    *   On File with `.py` extension found in the opened workspace.
    *   On Command `mytool.restart`.
4.  Output channel for logging **Output** > **My Tool**.

## Integrating your tool

The generated `bundled/tool/server.py` file is where you will make most of your changes. `TODO` comments in the file point out the various customization points. Also search for `TODO` comments in other locations in the template, such as other Python and Markdown files. You will want to review the LICENSE file, even if you want to keep it MIT License.

## Examples

There are several example implementations created from the template:

*   Pylint - implements linting and Code Actions on file `open`, `save`, and `close`.
*   Flake8 - implements linting and Code Actions.
*   Black Formatter - integrates the _Black_ formatter.
*   autopep8 - integrates the autopep8 formatter.
*   isort - adds Code Actions to sort imports.

You can also review the Language Server Protocol specification to better understand the `pygls` language server integration.

## Extension development

The template README goes into detail on the development cycle support included with the template. The template has commands and configurations so you can build, run, debug, and test your extension.

If you run into problems during development, there is a Troubleshooting section to help with common issues.

## Packaging and publishing

Before publishing your extension, you'll need to update the extension `package.json` fields (such as `publisher` and `license`) for your specific extension. You also want to update the auxiliary Markdown files (`CODE_OF_CONDUCT.md`, `CHANGELOG.md`, etc.).

Once your extension is ready to publish, there is a `nox` `build-package` task to create a `.vsix` file, which you can then upload to your extension management page.

If you are new to creating and publishing VS Code extensions, we recommend you follow best practices outlined in the main VS Code extension authoring topics. Here you'll find guidance to help make your extension look great on the Marketplace and how to become a verified publisher so that the users feel confident installing your extension.

7/1/2026