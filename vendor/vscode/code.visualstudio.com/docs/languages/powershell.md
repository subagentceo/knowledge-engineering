# PowerShell in Visual Studio Code

PowerShell is a task-based command-line shell and scripting language built on .NET that provides a powerful toolset for administrators on any platform.

The Microsoft PowerShell extension for Visual Studio Code (VS Code) provides rich language support and capabilities such as syntax completions, definition tracking, and linting for PowerShell. The extension should work everywhere VS Code is supported using PowerShell 7+ currently supported versions.

Support for Windows PowerShell 5.1 is provided on a best effort basis. .NET Framework 4.8 or higher is required.

VS Code Remote Development Environments, including GitHub Codespaces and VS Code Server are supported.

Important

Visual Studio Code for the Web is only supported for limited functionality such as basic syntax highlighting, as the PowerShell engine can't run in this environment.

We actively test the following configurations:

*   **Windows Server 2022** with Windows PowerShell 5.1 and PowerShell 7+
*   **macOS 14.7** with PowerShell 7+
*   **Ubuntu 24.04** with PowerShell 7+

On Windows, we also test with and without Constrained Language Mode enabled.

## Installing the PowerShell extension

The PowerShell extension can be installed from the Visual Studio Code Marketplace by clicking the Install Button. You can also install the PowerShell extension from within VS Code by opening the **Extensions** view with keyboard shortcut ⇧⌘X (Windows, Linux Ctrl+Shift+X), typing _PowerShell_, and selecting the PowerShell extension:

![PowerShell extension](/assets/docs/languages/powershell/PowerShellExtension.png)

## Major features

*   Syntax highlighting
*   Advanced built-in code snippets
*   IntelliSense for cmdlets and more
*   Problems reported by PowerShell Script Analyzer
*   Go to Definition of cmdlets, variables, classes and more
*   Find References of cmdlets, variables, classes and more
*   Document and Workspace Symbol Navigation
*   Symbol-based Outline View
*   Run selected PowerShell code in current terminal using F8
*   Launch online help for the symbol under the cursor using Ctrl + F1
*   PowerShell Debugger integration
*   An Extension Terminal that can interact with the debugger (try `Set-PSBreakpoint`!)
*   PowerShell ISE theme available in the theme picker
*   Also try ISE mode using ⇧⌘P (Windows, Linux Ctrl+Shift+P) then search for "Enable ISE Mode"

### Debugging

The PowerShell extension uses the built-in debugging interface of VS Code to allow for debugging of PowerShell scripts and modules. For more information about debugging PowerShell, see Using VS Code.

### Multi-version support

You can configure the PowerShell extension to use any supported version of PowerShell installed on your machine by following these instructions.

Or run the **PowerShell: Show Session Menu** command from the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)).

### CodeLens support

CodeLenses are a VS Code feature to provide actionable, contextual information that's displayed within the source code.

CodeLens features include:

*   Pester **Run tests** and **Debug tests**.
    
    ![Pester CodeLens Integration](/assets/docs/languages/powershell/pesterCodeLens.png)
    
*   Pester symbol support
    
    ![CodeLens Pester Symbol Support](/assets/docs/languages/powershell/codeLensPesterSymbol.gif)
    
*   Function, variable, class, and other symbol references
    
    CodeLens reference support shows the number of times a symbol is referenced within your code and allows you to jump to specific references.
    
    ![CodeLens Function Reference Support](/assets/docs/languages/powershell/codeLensFuncRef.gif)
    

### PSScriptAnalyzer integration

PSScriptAnalyzer is a PowerShell module that provides a static source code checker for modules and scripts. **PSScriptAnalyzer** has rules that verify the quality of PowerShell code. These rules are based on PowerShell best practices identified by the PowerShell Team and the community. **PSScriptAnalyzer** generates diagnostic records (errors and warnings) to inform users about potential code defects and suggests possible solutions for improvements.

The PowerShell extension includes **PSScriptAnalyzer** by default, and automatically performs analysis on PowerShell script files you edit in VS Code.

**PSScriptAnalyzer** comes with a collection of built-in rules that check various aspects of PowerShell source code such as presence of uninitialized variables, usage of **PSCredential** type, usage of `Invoke-Expression`, and others. The module also allows you to include or exclude specific rules.

To disable **PSScriptAnalyzer**, open your settings (⌘, (Windows, Linux Ctrl+,)), browse **Extensions**, select the **PowerShell** extension, and deselect the checkbox for **Script Analysis: Enable** (`powershell.scriptAnalysis.enable`).

![PSScriptAnalyzer Settings](/assets/docs/languages/powershell/pssaExtensionSetting.png)

**PSScriptAnalyzer** also provides code formatting. You can invoke automatic document formatting with the **Format Document** command or the (⇧⌥F (Windows Shift+Alt+F, Linux Ctrl+Shift+I)) keyboard shortcut.

### Pester integration

Pester is a framework for running unit tests to execute and Windows PowerShell 5.1 comes with **Pester** 3.40 preinstalled. To update **Pester** or to install the latest version on other platforms, follow the Pester installation instructions.

## PowerShell extension settings

You can customize VS Code settings from the **File** > **Preferences** > **Settings** menu item.

You can also select the gear icon located in the lower left corner of the Activity Bar.

![codeGear](/assets/docs/languages/powershell/codeGear.png)

You can also use the keyboard shortcut ⌘, (Windows, Linux Ctrl+,) to open your settings. You can still open the `settings.json` file using **Preferences: Open User Settings (JSON)** command from the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)) or by changing the default settings editor with the `"workbench.settings.editor"` setting.

Go to User and Workspace settings for more information on configuring VS Code settings.

### Types.ps1xml and Format.ps1xml files

PowerShell `.ps1xml` files are used to extend the type system and define output formatting. For more information on these files, see the official PowerShell documentation on Types.ps1xml and Format.ps1xml. You can get IntelliSense features when authoring `.ps1xml` files by installing the XML extension by Red Hat. After installing, add this configuration to your user settings:

```
"xml.fileAssociations": [
  {
    "systemId": "https://raw.githubusercontent.com/PowerShell/PowerShell/master/src/Schemas/Format.xsd",
    "pattern": "**/*.Format.ps1xml"
  },
  {
    "systemId": "https://raw.githubusercontent.com/PowerShell/PowerShell/master/src/Schemas/Types.xsd",
    "pattern": "**/*.Types.ps1xml"
  }
]
```

This configuration tells the XML extension to use the official XML schemas from the PowerShell repository for all `.ps1xml` files. Configuring these schemas enables the following features in `ps1xml` files:

*   Syntax error reporting
*   Schema validation
*   Tag and attribute completion
*   Autoclose tags
*   Symbol highlighting
*   Document folding
*   Document symbols and outline
*   Renaming support
*   Document formatting

## Example scripts

Example scripts are included with the extension and can be found at the following path.

`~/.vscode/extensions/ms-vscode.PowerShell-<version>/examples`

To open or view the examples in VS Code, run the following from your PowerShell command prompt:

```
code (Get-ChildItem ~\.vscode\extensions\ms-vscode.PowerShell-*\examples)[-1]
```

You can also open the examples from the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)) with the **PowerShell: Open Examples Folder** command.

![Open PowerShell Examples](/assets/docs/languages/powershell/pwshExamples.png)

## Additional resources

There are more detailed articles in the PowerShell documentation. Start with Using VS Code.

Check out the troubleshooting guide for answers to common questions.

For more information on debugging, check out the _Hey, Scripting Guy!_ two-part blog post series written by @keithHill on debugging with the PowerShell extension:

*   Debugging PowerShell script in Visual Studio Code - Part 1
*   Debugging PowerShell script in Visual Studio Code - Part 2

## Testing new features and providing feedback

We would encourage you to try the _pre-release_ version whenever possible. When a _Pre-Release_ is available, it can be installed from the marketplace using the **Switch to Pre-Release Version** button. You can switch back to the stable version of the extension by using the **Switch to Release Version** button that will appear. You can also downgrade to other versions of the extension using the arrow next to the **Uninstall** button and choosing **Install Another Version...**.

![Screenshot showing the button to switch to a pre-release version.](/assets/docs/languages/powershell/prerelease-switch.png)

If you find a bug, open an issue and revert to the stable version while we fix it.

7/1/2026