# Go in Visual Studio Code

Using the Go extension for Visual Studio Code, you get features like IntelliSense, code navigation, symbol search, testing, debugging, and many more that will help you in Go development.

![Go extension banner](/assets/docs/languages/go/go-extension.png)

You can install the Go extension from the VS Code Marketplace.

Watch "Getting started with VS Code Go" for an explanation of how to build your first Go application using VS Code Go.

This article describes only a subset of the features the Go extension provides. See the extension's documentation for the full, up-to-date list of supported features.

## IntelliSense

![IntelliSense](/assets/docs/languages/go/completion-signature-help.gif)

IntelliSense features are provided by the Go language server, gopls, maintained by the Go team. You can configure the behavior of `gopls` using the `gopls` settings.

### Semantic syntax highlighting

For better syntax highlighting than the default TextMate-based syntax highlighting, we recommend enabling semantic highlighting by turning on Gopls' `ui.semanticTokens` setting.

```
"gopls": { "ui.semanticTokens": true }
```

### Auto completions

As you type in a Go file, you can see IntelliSense providing you with suggested completions. This even works for members in current, imported, and not yet imported packages. Just type any package name followed by `.`, and you will get suggestions for the corresponding package members.

> **Tip**: Use ⌃Space (Windows, Linux Ctrl+Space) to trigger the suggestions manually.

### Hover information

Hovering on any variable, function, or struct will give you information on that item such as documentation, signature, etc.

### Signature help

When you open the `(` while calling a function, a pop-up provides signature help for the function. As you keep typing the parameters, the hint (underline) moves to the next parameter.

> **Tip**: Use ⇧⌘Space (Windows, Linux Ctrl+Shift+Space) to manually trigger the signature help when the cursor is inside the `()` in the function call.

## Code navigation

Code Navigation features are available in the context menu in the editor.

*   **Go to Definition** F12 - Go to the source code of the type definition.
*   **Go to Type Definition** - Go to the type that defines a symbol.
*   **Peek Definition** ⌥F12 (Windows Alt+F12, Linux Ctrl+Shift+F10) - Bring up a Peek window with the type definition.
*   **Go to References** ⇧F12 (Windows, Linux Shift+F12) - Show all references for the type.
*   **Show Call Hierarchy** ⇧⌥H (Windows, Linux Shift+Alt+H) - Show all calls from or to a function.
*   **Go to Implementations** ⌘F12 (Windows, Linux Ctrl+F12) - Bring up a Peek window with the list of all implementations of an interface (if triggered with an interface type symbol), or interfaces a type implements (if triggered with a concrete type symbol).
*   **Find All Implementations** - Show all implementation of an interface (if triggered with an interface type symbol), or interfaces a type implements (if triggered with a concrete type symbol).

You can navigate via symbol search using the **Go to Symbol** commands from the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)).

*   **Go to Symbol in File** - ⇧⌘O (Windows, Linux Ctrl+Shift+O)
*   **Go to Symbol in Workspace** - ⌘T (Windows, Linux Ctrl+T)

You can also navigate back and forth between a Go file and its test implementation using the **Go: Toggle Test File** command.

## Build and diagnose

The Go language server (`gopls`) detects build and vet errors found on the workspace. The errors and warnings from running any/all of the above will be shown red/green squiggly lines in the editor. These diagnostics also show up in the **Problems** panel (**View** > **Problems**).

You can add additional lint checks using the `go.lintOnSave` setting and configuring your choice of linting tool (`staticcheck`, `golangci-lint`, or `revive`) using the `go.lintTool` setting.

## Formatting

You can format your Go file using ⇧⌥F (Windows Shift+Alt+F, Linux Ctrl+Shift+I) or by running the **Format Document** command from the Command Palette or the context menu in the editor.

By default, formatting is run when you save your Go file. You can disable this behavior by setting editor.formatOnSave Open in VS Code Open in VS Code Insiders to `false` for the `[go]` language identifier. You can change this using your JSON setting files.

```
"[go]": {
        "editor.formatOnSave": false
}
```

When you have multiple formatters activated for Go files, you can select the Go extension as the default formatter.

```
"[go]": {
    "editor.defaultFormatter": "golang.go"
}
```

Formatting is provided by `gopls`. If you want `gofumpt`-style formatting, you can configure `gopls` to use `gofumpt`.

```
"gopls": {
    "formatting.gofumpt": true
}
```

## Test

The VS Code Test UI and editor CodeLens elements allow users to easily run tests, benchmarks, profiles for a given function, file, package, or workspace.

Alternatively, the same functionality is available through a set of commands:

*   **Go: Test Function At Cursor**
*   **Go: Test File**
*   **Go: Test Package**
*   **Go: Test All Packages in Workspace**

There are many test-related commands that you can explore by typing "Go: test" in the Command Palette.

![Test Commands](/assets/docs/languages/go/testcommands.png)

The first three above can be used to generate test skeletons for the functions in the current package, file, or at the cursor using `gotests`. The last few can be used to run tests in the current package, file, or at the cursor using `go test`. There is also a command for getting test coverage.

You can configure the extension to run tests and compute test coverage using:

*   `go.testOnSave`
*   `go.coverOnSave`
*   `go.testFlags`

## Import packages

The extension organizes imports, and removes unused imports by default. For different behavior, you can override per-language default settings following these instructions.

Run the command **Go: Add Import** to get a list of packages that can be imported to your Go file. Choose one and it will get added in the import block of your Go file.

## Refactoring

Select the area for refactoring (for example variable, function body, etc.). Click on the Code Action light bulb icon that appears in the selected area, or select **Refactoring...** or **Rename Symbol** (F2) from the VS Code context menu.

## Debugging

The Go extension lets you debug Go code by utilizing the Delve debugger.

Read Debug Go programs in VS Code for setup steps, supported features, configurations, information on remote debugging and a troubleshooting guide. For general debugging features such as inspecting variables, setting breakpoints, and other activities that aren't language-dependent, review VS Code debugging.

Some features unique to Go are:

*   Local & remote debugging
*   Data inspection using Delve's expression syntax
*   Dynamic configuration change and inspection options with `dlv` command from DEBUG CONSOLE
*   Ability to hide/show system goroutines (use `hideSystemGoroutines` configuration)
*   Disassembly view support (right-click your source code and select **Open Disassembly View**)
*   Experimental function call, core inspection, Mozilla `rr` support

## Next steps

This has been a brief overview showing the Go extension features within VS Code. For more information, see the details provided in the Go extension README.

To stay up to date on the latest features/bug fixes for the Go extension, see the CHANGELOG.

If you have any issues or feature requests, feel free to log them in the Go extension vscode-go repo.

If you'd like to learn more about VS Code, try these topics:

*   Basic Editing - A quick introduction to the basics of the VS Code editor.
*   Install an Extension - Learn about other extensions are available in the Marketplace.
*   Code Navigation - Move quickly through your source code.

7/1/2026