# Programmatic Language Features

Programmatic Language Features is a set of smart-editing features powered by the `vscode.languages.*` API. There are two common ways to provide a dynamic language feature in Visual Studio Code. Let's take Hover as an example:

```
vscode.languages.registerHoverProvider('javascript', {
  provideHover(document, position, token) {
    return {
      contents: ['Hover Content']
    };
  }
});
```

As you see above, the `vscode.languages.registerHoverProvider` API provides an easy way to provide hover contents to JavaScript files. After this extension gets activated, whenever you hover over some JavaScript code, VS Code queries all `HoverProvider` for JavaScript and shows the result in a Hover widget. The Language Feature Listing and illustrated gif below provides an easy way for you to locate which VS Code API / LSP Method your extension needs.

An alternative approach is to implement a Language Server that speaks Language Server Protocol. The way it works is:

*   An extension provides a Language Client and a Language Server for JavaScript.
*   The Language Client is like any other VS Code extension, running in the Node.js Extension Host context. When it gets activated, it spawns the Language Server in another process and communicates with it through Language Server Protocol.
*   You hover over JavaScript code in VS Code
*   VS Code informs the Language Client of the hover
*   The Language Client queries the Language Server for a hover result and sends it back to VS Code
*   VS Code displays the hover result in a Hover widget

The process seems more complicated, but it provides two major benefits:

*   The Language Server can be written in any language
*   The Language Server can be reused to provide smart editing features for multiple editors

For a more in-depth guide, head over to the Language Server extension guide.

* * *

## Language Features Listing

This listing includes the following items for each language feature:

*   An illustration of the language feature in VS Code
*   Related VS Code API
*   Related LSP methods

VS Code API

LSP method

`createDiagnosticCollection`

PublishDiagnostics

`registerCompletionItemProvider`

Completion & Completion Resolve

`registerInlineCompletionItemProvider`

`registerHoverProvider`

Hover

`registerSignatureHelpProvider`

SignatureHelp

`registerDefinitionProvider`

Definition

`registerTypeDefinitionProvider`

TypeDefinition

`registerImplementationProvider`

Implementation

`registerReferenceProvider`

References

`registerDocumentHighlightProvider`

DocumentHighlight

`registerDocumentSymbolProvider`

DocumentSymbol

`registerCodeActionsProvider`

CodeAction

`registerCodeLensProvider`

CodeLens & CodeLens Resolve

`registerDocumentLinkProvider`

DocumentLink & DocumentLink Resolve

`registerColorProvider`

DocumentColor & Color Presentation

`registerDocumentFormattingEditProvider`

Formatting

`registerDocumentRangeFormattingEditProvider`

RangeFormatting

`registerOnTypeFormattingEditProvider`

OnTypeFormatting

`registerRenameProvider`

Rename & Prepare Rename

`registerFoldingRangeProvider`

FoldingRange

## Provide Diagnostics

Diagnostics are a way to indicate issues with the code.

![Diagnostics indicating a misspelled method name](/assets/api/language-extensions/language-support/diagnostics.gif)

#### Language Server Protocol

Your language server sends the `textDocument/publishDiagnostics` message to the language client. The message carries an array of diagnostic items for a resource URI.

**Note**: The client does not ask the server for diagnostics. The server pushes the diagnostic information to the client.

#### Direct Implementation

```
let diagnosticCollection: vscode.DiagnosticCollection;

export function activate(ctx: vscode.ExtensionContext): void {
  ...
  ctx.subscriptions.push(getDisposable());
  diagnosticCollection = vscode.languages.createDiagnosticCollection('go');
  ctx.subscriptions.push(diagnosticCollection);
  ...
}

function onChange() {
  let uri = document.uri;
  check(uri.fsPath, goConfig).then(errors => {
    diagnosticCollection.clear();
    let diagnosticMap: Map<string, vscode.Diagnostic[]> = new Map();
    errors.forEach(error => {
      let canonicalFile = vscode.Uri.file(error.file).toString();
      let range = new vscode.Range(error.line-1, error.startColumn, error.line-1, error.endColumn);
      let diagnostics = diagnosticMap.get(canonicalFile);
      if (!diagnostics) { diagnostics = []; }
      diagnostics.push(new vscode.Diagnostic(range, error.msg, error.severity));
      diagnosticMap.set(canonicalFile, diagnostics);
    });
    diagnosticMap.forEach((diags, file) => {
      diagnosticCollection.set(vscode.Uri.parse(file), diags);
    });
  })
}
```

> **Basic**
> 
> Report diagnostics for open editors. Minimally, this needs to happen on every save. Better, diagnostics should be computed based on the un-saved contents of the editor.

> **Advanced**
> 
> Report diagnostics not only for the open editors but for all resources in the open folder, no matter whether they have ever been opened in an editor or not.

## Show Code Completion Proposals

Code completions provide context sensitive suggestions to the user.

![Code Completion prompting variable, method, and parameter names while writing code](/assets/api/language-extensions/language-support/code-completion.gif)

#### Language Server Protocol

In the response to the `initialize` method, your language server needs to announce that it provides completions and whether or not it supports the `completionItem\resolve` method to provide additional information for the computed completion items.

```
{
    ...
    "capabilities" : {
        "completionProvider" : {
            "resolveProvider": "true",
            "triggerCharacters": [ '.' ]
        }
        ...
    }
}
```

#### Direct Implementation

```
class GoCompletionItemProvider implements vscode.CompletionItemProvider {
    public provideCompletionItems(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):
        Thenable<vscode.CompletionItem[]> {
    ...
    }
}

export function activate(ctx: vscode.ExtensionContext): void {
    ...
    ctx.subscriptions.push(getDisposable());
    ctx.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(
            GO_MODE, new GoCompletionItemProvider(), '.', '\"'));
    ...
}
```

> **Basic**
> 
> You don't support resolve providers.

> **Advanced**
> 
> You support resolve providers that compute additional information for completion proposal the user selects. This information is displayed along-side the selected item.

## Show Inline Completions

Inline completions present multi-token suggestions directly in the editor (_ghost text_).

![Inline Completions suggesting code as ghost text while writing code](/assets/api/language-extensions/language-support/inline-completions.gif)

#### Direct Implementation

```
vscode.languages.registerInlineCompletionItemProvider({ language: 'javascript' }, {
    provideInlineCompletionItems(document, position, context, token) {
        const result: vscode.InlineCompletionList = {
            items: [],
            commands: [],
        };

        ...

        return result;
    }
});
```

You can explore a complete example in the inline completions sample extension.

> **Basic**
> 
> Return inline completions only for a well-known list of patterns based on the current line content, for specific languages.

> **Advanced**
> 
> Return inline completions based on content in the whole document or workspace and more complex patterns.

## Show Hovers

Hovers show information about the symbol/object that's below the mouse cursor. This is usually the type of the symbol and a description.

![Showing details about a workspace and a method when hovering over them](/assets/api/language-extensions/language-support/hovers.gif)

#### Language Server Protocol

In the response to the `initialize` method, your language server needs to announce that it provides hovers.

```
{
    ...
    "capabilities" : {
        "hoverProvider" : "true",
        ...
    }
}
```

In addition, your language server needs to respond to the `textDocument/hover` request.

#### Direct Implementation

```
class GoHoverProvider implements HoverProvider {
    public provideHover(
        document: TextDocument, position: Position, token: CancellationToken):
        Thenable<Hover> {
    ...
    }
}

export function activate(ctx: vscode.ExtensionContext): void {
    ...
    ctx.subscriptions.push(
        vscode.languages.registerHoverProvider(
            GO_MODE, new GoHoverProvider()));
    ...
}
```

> **Basic**
> 
> Show type information and include documentation if available.

> **Advanced**
> 
> Colorize method signatures in the same style you colorize the code.

## Help With Function and Method Signatures

When the user enters a function or method, display information about the function/method that is being called.

![Showing information about the getPackageInfo method including the necessary parameters](/assets/api/language-extensions/language-support/signature-help.gif)

#### Language Server Protocol

In the response to the `initialize` method, your language server needs to announce that it provides signature help.

```
{
    ...
    "capabilities" : {
        "signatureHelpProvider" : {
            "triggerCharacters": [ '(' ]
        }
        ...
    }
}
```

In addition, your language server needs to respond to the `textDocument/signatureHelp` request.

#### Direct Implementation

```
class GoSignatureHelpProvider implements SignatureHelpProvider {
    public provideSignatureHelp(
        document: TextDocument, position: Position, token: CancellationToken):
        Promise<SignatureHelp> {
    ...
    }
}

export function activate(ctx: vscode.ExtensionContext): void {
    ...
    ctx.subscriptions.push(
        vscode.languages.registerSignatureHelpProvider(
            GO_MODE, new GoSignatureHelpProvider(), '(', ','));
    ...
}
```

> **Basic**
> 
> Ensure that the signature help contains the documentation of the parameters of the function or method.

> **Advanced**
> 
> Nothing additional.

## Show Definitions of a Symbol

Allow the user to see the definition of variables/functions/methods right where the variables/functions/methods are being used.

![Right click a variable, function, or method and select "Go to Definition" to jump to the definition](/assets/api/language-extensions/language-support/goto-definition.gif)

#### Language Server Protocol

In the response to the `initialize` method, your language server needs to announce that it provides goto-definition locations.

```
{
    ...
    "capabilities" : {
        "definitionProvider" : "true"
        ...
    }
}
```

In addition, your language server needs to respond to the `textDocument/definition` request.

#### Direct Implementation

```
class GoDefinitionProvider implements vscode.DefinitionProvider {
    public provideDefinition(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):
        Thenable<vscode.Location> {
    ...
    }
}

export function activate(ctx: vscode.ExtensionContext): void {
    ...
    ctx.subscriptions.push(
        vscode.languages.registerDefinitionProvider(
            GO_MODE, new GoDefinitionProvider()));
    ...
}
```

> **Basic**
> 
> If a symbol is ambivalent, you can show multiple definitions.

> **Advanced**
> 
> Nothing additional.

## Find All References to a Symbol

Allow the user to see all the source code locations where a certain variable/function/method/symbol is being used.

![Right clicking and selecting "Find All References" to highlight all the locations where that symbol is used](/assets/api/language-extensions/language-support/find-references.gif)

#### Language Server Protocol

In the response to the `initialize` method, your language server needs to announce that it provides symbol reference locations.

```
{
    ...
    "capabilities" : {
        "referencesProvider" : "true"
        ...
    }
}
```

In addition, your language server needs to respond to the `textDocument/references` request.

#### Direct Implementation

```
class GoReferenceProvider implements vscode.ReferenceProvider {
    public provideReferences(
        document: vscode.TextDocument, position: vscode.Position,
        options: { includeDeclaration: boolean }, token: vscode.CancellationToken):
        Thenable<vscode.Location[]> {
    ...
    }
}

export function activate(ctx: vscode.ExtensionContext): void {
    ...
    ctx.subscriptions.push(
        vscode.languages.registerReferenceProvider(
            GO_MODE, new GoReferenceProvider()));
    ...
}
```

> **Basic**
> 
> Return the location (resource URI and range) for all references.

> **Advanced**
> 
> Nothing additional.

## Highlight All Occurrences of a Symbol in a Document

Allow the user to see all occurrences of a symbol in the open editor.

![Select a symbol to highlight all occurrences](/assets/api/language-extensions/language-support/document-highlights.gif)

#### Language Server Protocol

In the response to the `initialize` method, your language server needs to announce that it provides symbol document locations.

```
{
    ...
    "capabilities" : {
        "documentHighlightProvider" : "true"
        ...
    }
}
```

In addition, your language server needs to respond to the `textDocument/documentHighlight` request.

#### Direct Implementation

```
class GoDocumentHighlightProvider implements vscode.DocumentHighlightProvider {
    public provideDocumentHighlights(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):
        vscode.DocumentHighlight[] | Thenable<vscode.DocumentHighlight[]>;
    ...
    }
}

export function activate(ctx: vscode.ExtensionContext): void {
    ...
    ctx.subscriptions.push(
        vscode.languages.registerDocumentHighlightProvider(
            GO_MODE, new GoDocumentHighlightProvider()));
    ...
}
```

> **Basic**
> 
> You return the ranges in the editor's document where the references are being found.

> **Advanced**
> 
> Nothing additional.

## Show all Symbol Definitions Within a Document

Allow the user to quickly navigate to any symbol definition in the open editor.

![Navigate to a symbol definition in the open editor using @](/assets/api/language-extensions/language-support/document-symbols.gif)

#### Language Server Protocol

In the response to the `initialize` method, your language server needs to announce that it provides symbol document locations.

```
{
    ...
    "capabilities" : {
        "documentSymbolProvider" : "true"
        ...
    }
}
```

In addition, your language server needs to respond to the `textDocument/documentSymbol` request.

#### Direct Implementation

```
class GoDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
    public provideDocumentSymbols(
        document: vscode.TextDocument, token: vscode.CancellationToken):
        Thenable<vscode.SymbolInformation[]> {
    ...
    }
}

export function activate(ctx: vscode.ExtensionContext): void {
    ...
    ctx.subscriptions.push(
        vscode.languages.registerDocumentSymbolProvider(
            GO_MODE, new GoDocumentSymbolProvider()));
    ...
}
```

> **Basic**
> 
> Return all symbols in the document. Define the kinds of symbols such as variables, functions, classes, methods, etc.

> **Advanced**
> 
> Nothing additional.

## Show all Symbol Definitions in Folder

Allow the user to quickly navigate to symbol definitions anywhere in the folder (workspace) opened in VS Code.

![Navigate to symbol definitions in the workspace using #](/assets/api/language-extensions/language-support/workspace-symbols.gif)

#### Language Server Protocol

In the response to the `initialize` method, your language server needs to announce that it provides global symbol locations.

```
{
    ...
    "capabilities" : {
        "workspaceSymbolProvider" : "true"
        ...
    }
}
```

In addition, your language server needs to respond to the `workspace/symbol` request.

#### Direct Implementation

```
class GoWorkspaceSymbolProvider implements vscode.WorkspaceSymbolProvider {
    public provideWorkspaceSymbols(
        query: string, token: vscode.CancellationToken):
        Thenable<vscode.SymbolInformation[]> {
    ...
    }
}

export function activate(ctx: vscode.ExtensionContext): void {
    ...
    ctx.subscriptions.push(
        vscode.languages.registerWorkspaceSymbolProvider(
            new GoWorkspaceSymbolProvider()));
    ...
}
```

> **Basic**
> 
> Return all symbols define by the source code within the open folder. Define the kinds of symbols such as variables, functions, classes, methods, etc.

> **Advanced**
> 
> Nothing additional.

## Possible Actions on Errors or Warnings

Provide the user with possible corrective actions right next to an error or warning. If actions are available, a light bulb appears next to the error or warning. When the user clicks the light bulb, a list of available Code Actions is presented.

![Selecting a light bulb to view a list of available Code Actions](/assets/api/language-extensions/language-support/quick-fixes.gif)

#### Language Server Protocol

In the response to the `initialize` method, your language server needs to announce that it provides Code Actions.

```
{
    ...
    "capabilities" : {
        "codeActionProvider" : "true"
        ...
    }
}
```

In addition, your language server needs to respond to the `textDocument/codeAction` request.

#### Direct Implementation

```
class GoCodeActionProvider implements vscode.CodeActionProvider<vscode.CodeAction> {
    public provideCodeActions(
        document: vscode.TextDocument, range: vscode.Range | vscode.Selection,
        context: vscode.CodeActionContext, token: vscode.CancellationToken):
        Thenable<vscode.CodeAction[]> {
    ...
    }
}

export function activate(ctx: vscode.ExtensionContext): void {
    ...
    ctx.subscriptions.push(
        vscode.languages.registerCodeActionsProvider(
            GO_MODE, new GoCodeActionProvider()));
    ...
}
```

> **Basic**
> 
> Provide Code Actions for error/warning correcting actions.

> **Advanced**
> 
> In addition, provide source code manipulation actions such as refactoring. For example, **Extract Method**.

## CodeLens - Show Actionable Context Information Within Source Code

Provide the user with actionable, contextual information that is displayed interspersed with the source code.

![CodeLens providing context](/assets/api/language-extensions/language-support/code-lens.gif)

#### Language Server Protocol

In the response to the `initialize` method, your language server needs to announce that it provides CodeLens results and whether it supports the `codeLens\resolve` method to bind the CodeLens to its command.

```
{
    ...
    "capabilities" : {
        "codeLensProvider" : {
            "resolveProvider": "true"
        }
        ...
    }
}
```

In addition, your language server needs to respond to the `textDocument/codeLens` request.

#### Direct Implementation

```
class GoCodeLensProvider implements vscode.CodeLensProvider {
    public provideCodeLenses(document: TextDocument, token: CancellationToken):
        CodeLens[] | Thenable<CodeLens[]> {
    ...
    }

    public resolveCodeLens?(codeLens: CodeLens, token: CancellationToken):
         CodeLens | Thenable<CodeLens> {
    ...
    }
}

export function activate(ctx: vscode.ExtensionContext): void {
    ...
    ctx.subscriptions.push(
        vscode.languages.registerCodeLensProvider(
            GO_MODE, new GoCodeLensProvider()));
    ...
}
```

> **Basic**
> 
> Define the CodeLens results that are available for a document.

> **Advanced**
> 
> Bind the CodeLens results to a command by responding to `codeLens/resolve`.

## Show Color Decorators

Allow the user to preview and modify colors in the document.

![Showing the color picker](/assets/api/language-extensions/language-support/color-decorators.png)

#### Language Server Protocol

In the response to the `initialize` method, your language server needs to announce that it provides color information.

```
{
    ...
    "capabilities" : {
        "colorProvider" : "true"
        ...
    }
}
```

In addition, your language server needs to respond to the `textDocument/documentColor` and `textDocument/colorPresentation` requests.

#### Direct Implementation

```
class GoColorProvider implements vscode.DocumentColorProvider {
    public provideDocumentColors(
        document: vscode.TextDocument, token: vscode.CancellationToken):
        Thenable<vscode.ColorInformation[]> {
    ...
    }
    public provideColorPresentations(
        color: Color, context: { document: TextDocument, range: Range }, token: vscode.CancellationToken):
        Thenable<vscode.ColorPresentation[]> {
    ...
    }
}

export function activate(ctx: vscode.ExtensionContext): void {
    ...
    ctx.subscriptions.push(
        vscode.languages.registerColorProvider(
            GO_MODE, new GoColorProvider()));
    ...
}
```

> **Basic**
> 
> Return all color references in the document. Provide color presentations for the color formats supported (for example rgb(...), hsl(...)).

> **Advanced**
> 
> Nothing additional.

## Format Source Code in an Editor

Provide the user with support for formatting whole documents.

![Right click and select format code](/assets/api/language-extensions/language-support/format-document.gif)

#### Language Server Protocol

In the response to the `initialize` method, your language server needs to announce that it provides document formatting.

```
{
    ...
    "capabilities" : {
        "documentFormattingProvider" : "true"
        ...
    }
}
```

In addition, your language server needs to respond to the `textDocument/formatting` request.

#### Direct Implementation

```
class GoDocumentFormatter implements vscode.DocumentFormattingEditProvider {
    provideDocumentFormattingEdits(
        document: vscode.TextDocument, options: vscode.FormattingOptions, token: vscode.CancellationToken)
        : vscode.ProviderResult<vscode.TextEdit[]> {
    ...
    }
}

export function activate(ctx: vscode.ExtensionContext): void {
    ...
    ctx.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider(
            GO_MODE, new GoDocumentFormatter()));
    ...
}
```

> **Basic**
> 
> Don't provide formatting support.

> **Advanced**
> 
> You should always return the smallest possible text edits that result in the source code being formatted. This is crucial to ensure that markers such as diagnostic results are adjusted correctly and are not lost.

## Format the Selected Lines in an Editor

Provide the user with support for formatting a selected range of lines in a document.

![Select lines, right click, and select format code](/assets/api/language-extensions/language-support/format-document-range.gif)

#### Language Server Protocol

In the response to the `initialize` method, your language server needs to announce that it provides formatting support for ranges of lines.

```
{
    ...
    "capabilities" : {
        "documentRangeFormattingProvider" : "true"
        ...
    }
}
```

In addition, your language server needs to respond to the `textDocument/rangeFormatting` request.

#### Direct Implementation

```
class GoDocumentRangeFormatter implements vscode.DocumentRangeFormattingEditProvider{
    public provideDocumentRangeFormattingEdits(
        document: vscode.TextDocument, range: vscode.Range,
        options: vscode.FormattingOptions, token: vscode.CancellationToken):
        vscode.ProviderResult<vscode.TextEdit[]> {
    ...
    }
}

export function activate(ctx: vscode.ExtensionContext): void {
    ...
    ctx.subscriptions.push(
        vscode.languages.registerDocumentRangeFormattingEditProvider(
            GO_MODE, new GoDocumentRangeFormatter()));
    ...
}
```

> **Basic**
> 
> Don't provide formatting support.

> **Advanced**
> 
> You should always return the smallest possible text edits that result in the source code being formatted. This is crucial to ensure that markers such as diagnostic results are adjusted corrected and are not lost.

## Incrementally Format Code as the User Types

Provide the user with support for formatting text as they type.

**Note**: The user setting `editor.formatOnType` controls whether source code gets formatted or not as the user types.

![Visual indicators for formatting as code is typed](/assets/api/language-extensions/language-support/format-on-type.gif)

#### Language Server Protocol

In the response to the `initialize` method, your language server needs to announce that it provides formatting as the user types. It also needs to tell the client on which characters formatting should be triggered. `moreTriggerCharacters` is optional.

```
{
    ...
    "capabilities" : {
        "documentOnTypeFormattingProvider" : {
            "firstTriggerCharacter": "}",
            "moreTriggerCharacter": [";", ","]
        }
        ...
    }
}
```

In addition, your language server needs to respond to the `textDocument/onTypeFormatting` request.

#### Direct Implementation

```
class GoOnTypingFormatter implements vscode.OnTypeFormattingEditProvider{
    public provideOnTypeFormattingEdits(
        document: vscode.TextDocument, position: vscode.Position,
        ch: string, options: vscode.FormattingOptions, token: vscode.CancellationToken):
        vscode.ProviderResult<vscode.TextEdit[]> {
    ...
    }
}

export function activate(ctx: vscode.ExtensionContext): void {
    ...
    ctx.subscriptions.push(
        vscode.languages.registerOnTypeFormattingEditProvider(
            GO_MODE, new GoOnTypingFormatter()));
    ...
}
```

> **Basic**
> 
> Don't provide formatting support.

> **Advanced**
> 
> You should always return the smallest possible text edits that result in the source code being formatted. This is crucial to ensure that markers such as diagnostic results are adjusted corrected and are not lost.

## Rename Symbols

Allow the user to rename a symbol and update all references to the symbol.

![Rename a symbol and update all references to the new name](/assets/api/language-extensions/language-support/rename.gif)

#### Language Server Protocol

In the response to the `initialize` method, your language server needs to announce that it provides for renaming.

```
{
    ...
    "capabilities" : {
        "renameProvider" : "true"
        ...
    }
}
```

In addition, your language server needs to respond to the `textDocument/rename` request.

#### Direct Implementation

```
class GoRenameProvider implements vscode.RenameProvider {
    public provideRenameEdits(
        document: vscode.TextDocument, position: vscode.Position,
        newName: string, token: vscode.CancellationToken):
        Thenable<vscode.WorkspaceEdit> {
    ...
    }
}

export function activate(ctx: vscode.ExtensionContext): void {
    ...
    ctx.subscriptions.push(
        vscode.languages.registerRenameProvider(
            GO_MODE, new GoRenameProvider()));
    ...
}
```

> **Basic**
> 
> Don't provide rename support.

> **Advanced**
> 
> Return the list of all workspace edits that need to be performed, for example all edits across all files that contain references to the symbol.

7/1/2026