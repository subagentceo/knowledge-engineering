# Editing Python in Visual Studio Code

Visual Studio Code is a powerful editing tool for Python source code. The editor includes various features to help you be productive when writing code. For more information about editing in Visual Studio Code, see Basic Editing and Code Navigation.

In this overview, we will describe the specific editing features provided by the Python extension, including steps on how to customize these features via user and workspace settings.

## Autocomplete and IntelliSense

IntelliSense is a general term for code editing features that relate to code completion. Take a moment to look at the example below. When **print** is typed, notice how IntelliSense populates auto-completion options. The user is also given a list of options when they begin to type the variable named **greeting**.

![Hello World Example for IntelliSense](/assets/docs/python/editing/hello-world.gif)

Autocomplete and IntelliSense are provided for all files within the current working folder. They're also available for Python packages that are installed in standard locations.

Pylance is the default language server for Python in VS Code, and is installed alongside the Python extension to provide IntelliSense features.

Pylance is based on Microsoft’s Pyright static type checking tool, leveraging type stubs (`.pyi` files) and lazy type inferencing to provide a highly-performant development experience.

For more on IntelliSense generally, see IntelliSense.

> **Tip**: Check out the IntelliCode extension for VS Code. IntelliCode provides a set of AI-assisted capabilities for IntelliSense in Python, such as inferring the most relevant auto-completions based on the current code context. For more information, see the IntelliCode for VS Code FAQ.

### Customize IntelliSense behavior

Enabling the full set of IntelliSense features by default could end up making your development experience feel slower, so the Python extension enables a minimum set of features that allow you to be productive while still having a performant experience. However, you can customize the behavior of the analysis engine to your liking through multiple settings.

### Enable Auto Imports

Pylance offers auto import suggestions for modules in your workspace and for packages you installed in your environment. As you type in the editor, you might get completion suggestions. When you accept the suggestion, auto import automatically adds the corresponding import statement to your file.

You can enable auto imports by setting `python.analysis.autoImportCompletions` to `true` in your settings. By default, auto imports are disabled.

![Completion with auto import displayed on the suggestion list](/assets/docs/python/editing/auto-import-suggestion.png)

### Enable IntelliSense for custom package locations

To enable IntelliSense for packages that are installed in non-standard locations, add those locations to the `python.analysis.extraPaths` collection in your `settings.json` file (the default collection is empty). For example, you might have Google App Engine installed in custom locations, specified in `app.yaml` if you use Flask. In this case, you'd specify those locations as follows:

**Windows:**

```
"python.analysis.extraPaths": [
    "C:/Program Files (x86)/Google/google_appengine",
    "C:/Program Files (x86)/Google/google_appengine/lib/flask-0.12"]
```

**macOS/Linux:**

```
"python.analysis.extraPaths": [
    "~/.local/lib/Google/google_appengine",
    "~/.local/lib/Google/google_appengine/lib/flask-0.12" ]
```

For the full list of available IntelliSense controls, you can reference the Python extension code analysis settings and autocomplete settings.

You can also customize the general behavior of autocomplete and IntelliSense, even disable the features completely. You can learn more in Customizing IntelliSense.

## Enhance completions with AI

GitHub Copilot is an AI-powered code completion tool that helps you write code faster and smarter. You can use the GitHub Copilot extension in VS Code to generate code, or to learn from the code it generates.

![GitHub Copilot extension in the VS Code Marketplace](/assets/docs/python/editing/copilot-extension.png)

GitHub Copilot provides suggestions for numerous languages and a wide variety of frameworks, and it works especially well for Python, JavaScript, TypeScript, Ruby, Go, C# and C++.

You can learn more about how to get started with Copilot in the Copilot documentation.

## Navigation

While editing, you can right-click different identifiers to take advantage of several convenient commands

*   **Go to Definition** (F12) jumps from your code into the code that defines an object. This command is helpful when you're working with libraries.
    
*   **Peek Definition** (⌥F12 (Windows Alt+F12, Linux Ctrl+Shift+F10)), is similar, but displays the definition directly in the editor (making space in the editor window to avoid obscuring any code). Press Escape to close the Peek window or use the **x** in the upper right corner.
    
*   **Go to Declaration** jumps to the point at which the variable or other object is declared in your code.
    
*   **Peek Declaration** is similar, but displays the declaration directly in the editor. Again, use Escape or the **x** in the upper right corner to close the Peek window.
    

## Quick Fixes

### Add import

When using Pylance, the add import Quick Fix enables you to quickly complete import statements for modules that are installed in your environment. As you start typing a package name in the editor, a Code Action is available to automatically complete the line of source code. Hover over the text (marked with a squiggle) and select the Code Action light bulb. You can then select from the list of potential imports.

![Add import code action](/assets/docs/python/editing/quickFix.png)

This Code Action also recognizes some of the popular abbreviations for the following common Python packages: `numpy` as np, `tensorflow` as tf, `pandas` as pd, `matplotlib.pyplot` as plt, `matplotlib` as mpl, `math` as m, `scipi.io` as spio, and `scipy` as sp, `panel` as pn, and `holoviews` as hv.

![Common package abbreviations](/assets/docs/python/editing/packageAbbreviations.gif)

The import suggestions list displays the top 3 high-confidence import options, prioritized based on: most recently used imports, symbols from the same module, symbols from the standard library, symbols from user modules, symbols from third-party packages, and finally sorting by module and symbol name.

### Search for additional import matches

By default, the add import Quick Fix only shows 3 high-confidence import options. If they don't list what you are looking for, you can use the Pylance **Search for additional import matches** Quick Fix for missing import errors. This Quick Fix displays a quick pick menu that enables you to search for import options that prefix-match the missing import symbol.

![Search for additional import matches Code Action](/assets/docs/python/editing/search-imports-code-action.gif)

### Change spelling

Pylance displays the **Change spelling** Quick Fix on unresolved variables or missing imports diagnostics when they are likely caused by typos. This Code Action suggests the correct spelling of the symbol, based on the closest matches found in the workspace.

![Change spelling code action on missing import due to a typo](/assets/docs/python/editing/change-spelling-code-action.gif)

> **Note**: For user symbols, these Quick Fixes will suggest the imports only from the files where they are defined. Import suggestions from files where the user symbols are external/imported aren't supported.
> 
> Also note that for symbols coming from installed packages (typically located under the `site-packages` folder of your Python environment), only those defined in the package's root folder, such as in its `__init__.py` file, are suggested by these Quick Fixes. You can customize this behavior for specific packages through the `python.analysis.packageIndexDepths` setting, but please note it may impact Pylance's performance.

## Refactorings

The Python extension adds the following refactoring functionalities via the Pylance extension: **Extract Variable**, **Extract Method**, **Rename Module**, **Move Symbol** and **Implement All Inherited Abstract Classes**. It also supports extensions that implement additional refactoring features, such as **Sort Imports**.

### Extract Variable

Extracts all similar occurrences of the selected text within the current scope, and replaces it with a new variable.

You can invoke this command by selecting the line of code you wish to extract as a variable. Then select the light-bulb that is displayed next to it.

![Refactoring a variable](/assets/docs/python/editing/refactorExtractVar.gif)

### Extract Method

Extracts all similar occurrences of the selected expression or block within the current scope, and replaces it with a method call.

You can invoke this command by selecting the lines of code you wish to extract as a method. Then select the light-bulb that is displayed next to it.

![Refactoring code into a method](/assets/docs/python/editing/refactorExtractMethod.gif)

### Rename Module

After a Python file/module is renamed, Pylance can find all instances that may need to be updated and provide you with a preview of all the changes.

To customize which references need to be updated, you can toggle the checkboxes at the line or from the file level in **Refactor Preview**. Once you've made your selections, you can select **Apply Refactoring** or **Discard Refactoring**.

![Renaming a module](/assets/docs/python/editing/refactorRenameModule.gif)

### Move Symbol

The Pylance extension offers two Code Actions to simplify the process of moving symbols to different files:

*   **Move symbol to...**: displays a file picker to select the destination file for the symbol to be moved to.
*   **Move symbol to new file**: creates a new file with the symbol name, located in the same directory as the source file where the Code Action was invoked.

You can access these Code Actions by hovering over the symbol you want to move, then selecting the light bulb that appears next to the desired action. Alternatively, you can right-click on the symbol and select **Refactor...** from the context menu.

![Move Symbol refactoring options](/assets/docs/python/editing/move-symbol.gif)

### Implement All Inherited Abstract Classes

In Python, abstract classes serve as "blueprints" for other classes and help build modular, reusable code by promoting clear structure and requirements for subclasses to adhere to. To define an abstract class in Python, you can create a class that inherits from the `ABC` class in the `abc` module, and annotate its methods with the `@abstractmethod` decorator. Then, you can create new classes that inherit from this abstract class, and define an implementation for the base methods.

Pylance offers a Code Action to simplify the process of creating these classes. When you define a new class that inherits from an abstract one, you can now use the **Implement all inherited abstract classes** Code Action to automatically implement all abstract methods and properties from the parent class:

![Implement inherited abstract classes](/assets/docs/python/editing/implement-inherited-abstract-classes.gif)

### Sort Imports

The Python extension supports extensions such as isort and Ruff that implement the **Sort Imports** functionality. This command consolidates specific imports from the same module into a single `import` statement, and organizes `import` statements in alphabetical order.

You can invoke this by installing an extension that supports sorting imports, then opening the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)) and running **Organize Imports**.

> **Tip**: you can assign a keyboard shortcut to the `editor.action.organizeImports` command.

![Sorting import statements](/assets/docs/python/editing/sortImports.gif)

## Troubleshooting

For help with common IntelliSense and Python editing issues, check the table below:

Problem

Cause

Solution

Pylance is only offering top-level symbol options when adding imports.

By default, only top-level modules are indexed (depth=1).  
For example, you may see `import matplotlib` as a suggestion, but not `import matplotlib.pyplot` by default.

Try increasing the depth to which Pylance can index your installed libraries through the `python.analysis.packageIndexDepths`. Check code analysis settings.

Pylance is not automatically adding missing imports

The auto import completion setting may be disabled.

Check the Enable Auto Imports section.

Auto imports are enabled but Pylance is not automatically importing symbols defined in other files in the workspace.

User defined symbols (those not coming from installed packages or libraries) are only automatically imported if they have already been used in files opened in the editor.  
Otherwise, they will only be available through the add imports Quick Fix.

Use the add imports Quick Fix, or make sure to open the relevant files in your workspace first.

Pylance seems slow or is consuming too much memory when working on a large workspace.

Pylance analysis is done on all files present in a given workspace.

If there are subfolders you know can be excluded from Pylance's analysis, you can add their paths to the `python.analysis.exclude` setting. Alternatively, you can try setting `python.analysis.indexing` to `false` to disable Pylance's indexer (**Note**: this will also impact the experience of completions and auto imports. Learn more about indexing in code analysis settings).

You are unable to install a custom module into your Python project.

The custom module is located in a non-standard location (not installed using pip).

Add the location to the `python.autoComplete.extraPaths` setting and restart VS Code.

### Pylance Diagnostics

Pylance by default provides diagnostics for Python files in the Problems panel.

The list below are some of the most common diagnostics provided by Pylance and how to fix them.

#### importResolveSourceFailure

This error occurs when Pylance is able to find type stubs for the imported package, but is unable find the package itself. This can happen when the package you are trying to import is not installed in the selected Python environment.

**How to fix it**

*   If the package is already installed in a different interpreter or kernel, select the correct interpreter.
*   If the package is not installed, you can install it by running the following command in an activated terminal: `python -m pip install {package_name}`.

#### importResolveFailure

This error happens when Pylance is unable to find the package or module you're importing, nor its type stubs.

**How to fix it**

*   If you are importing a module, make sure it exists in your workspace or in a location that is included in the `python.autoComplete.extraPaths` setting.
*   If you are importing a package that is not installed, you can install it by running the following command in an activated terminal: `python -m pip install {package_name}`.
*   If you are importing a package that is already installed in a different interpreter or kernel, select the correct interpreter.
*   If you are working with an editable install and it is currently set up to use import hooks, consider switching to using `.pth` files that only contain file paths instead, to enhance compatibility and ensure smoother import behavior. Learn more in the Pyright documentation.

#### importCycleDetected

This error occurs when Pylance detects a circular dependency between two or more modules.

**How to fix it**

Try to reorder your import statements to break the circular dependency.

* * *

The severity of Pylance's diagnostics can be customized through the `python.analysis.diagnosticSeverityOverrides` setting. Check the settings reference for more information.

## Next steps

*   Linting - Enable, configure, and apply various Python linters.
*   Debugging - Learn to debug Python both locally and remotely.
*   Testing - Configure test environments and discover, run, and debug tests.
*   Basic Editing - Learn about the powerful VS Code editor.
*   Code Navigation - Move quickly through your source code.
*   IntelliSense - Learn about IntelliSense features.
*   Jupyter Support - Learn how to get started with Jupyter Notebooks.
*   Python Extension Template - Create an extension to integrate your favorite Python tools.

02/04/2026