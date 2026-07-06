# Working with C#

The C# support in Visual Studio Code is optimized for cross-platform .NET development (see working with .NET and VS Code for another relevant article). Our focus with VS Code is to be a great editor for cross-platform C# development by providing a rich C# editing experience, AI-powered development, solution management, and integrated testing experiences

![C# language within VS Code](/assets/docs/languages/csharp/csharp-hero.png)

VS Code supports debugging of C# applications running on either .NET or Mono.

For detailed instructions on:

*   .NET debugging - see the C# Dev Kit debugging documentation.
*   Mono debugging - see the Mono Debug extension's README.

## Installing C# support

C# language support is provided with the C# Dev Kit extension. You can install it from within VS Code by searching for 'C# Dev Kit' in the **Extensions** view (⇧⌘X (Windows, Linux Ctrl+Shift+X)) or if you already have a project with C# files, VS Code will prompt you to install the extension as soon as you open a C# file.

For more information about the C# Dev Kit extension, see the C# documentation.

## C# Dev Kit

Visual Studio Code uses the power of Roslyn and C# Dev Kit to offer an enhanced C# experience. We offer support for:

*   .NET projects
*   MSBuild projects
*   C# scripts (CSX)

Supported .NET project types include:

*   ASP.NET Core App
*   ASP.NET Core Web API
*   ASP.NET Core MVC Web App
*   Blazor Web App
*   Blazor Server App
*   Blazor WebAssembly App
*   Console App

And more.

To find a full list of supported project types within VS Code, open the **Command Palette** and search for **.NET: New Project..**. This will display a full list of supported project types.

![Supported Projects](/assets/docs/languages/csharp/newproject.png)

When you open a Workspace that contains .NET solution files or project files, the Solution Explorer will automatically appear. If you have a single solution file (.sln file) in the workspace, the Solution Explorer will detect that file and automatically load it after the workspace is loaded. For more information on managing your C# projects in VS Code, look at the documentation on Project Management.

## Editing Evolved

There is a lot to discover with C# and the editor, such as format on type, IntelliSense, the rename-refactoring, etc.

![Right-click Menu](/assets/docs/languages/csharp/editingevolved.png)

For more information on the C# Dev Kit editing features, go to the Navigate and Edit documentation. For a full description of VS Code editing features, go to the Basic Editing and Code Navigation documentation.

Here are a few highlights...

## IntelliSense

IntelliSense just works: hit ⌃Space (Windows, Linux Ctrl+Space) at any time to get context specific suggestions.

![IntelliSense](/assets/docs/languages/csharp/intellisense.png)

## Enhance completions with AI

GitHub Copilot is an AI-powered code completion tool that helps you write code faster and smarter. You can use the GitHub Copilot extension in VS Code to generate code, or to learn from the code it generates.

![GitHub Copilot extension in the VS Code Marketplace](/assets/docs/languages/csharp/copilot-extension.png)

GitHub Copilot provides suggestions for numerous languages and a wide variety of frameworks, and it works especially well for Python, JavaScript, TypeScript, Ruby, Go, C# and C++.

You can learn more about how to get started with Copilot in the Copilot documentation.

## Snippets for C#

For information on snippets in C# Dev Kit, go to the Navigate and Edit documentation. There are also several built-in snippets included in VS Code that will come up as you type or you can press ⌃Space (Windows, Linux Ctrl+Space) (Trigger Suggest) and we will give you a context specific list of suggestions.

![Snippets](/assets/docs/languages/csharp/snippet.png)

> **Tip:** You can add in your own User Defined Snippets for C#. Take a look at User Defined Snippets to find out how.

## Search for Symbols

There are also features outside the editor. One is the ability to search for symbols from wherever you are. Hit ⌘T (Windows, Linux Ctrl+T), start typing, and see a list of matching C# symbols. Select one and you'll be taken straight to its code location.

![Symbols](/assets/docs/languages/csharp/symbols.png)

## CodeLens

Another cool feature is the ability to see the number of references to a method directly above the method. Click on the reference info to see the references in the Peek view. This reference information updates as you type.

> **Note:** Methods defined in `object`, such as `equals` and `hashCode` do not get reference information due to performance reasons.

![CodeLens](/assets/docs/languages/csharp/codelens.png)

> **Tip:** You can turn off references information displayed in CodeLens with the editor.codeLens Open in VS Code Open in VS Code Insiders setting.

## Find References/Peek Definition

You can click on the references of an object to find the locations of its use in place without losing context. This same experience works in reverse where you can Peek the definition of an object and see it inline without leaving your location. For information on Peek Definition in C# Dev Kit, go to the Navigate and Edit documentation.

![Peek](/assets/docs/languages/csharp/peek.png)

## Quick Fixes / Suggestions

There are some basic quick fixes supported in VS Code. You will see a lightbulb and clicking on it, or pressing ⌘. (Windows, Linux Ctrl+.) provides you with a simple list of fixes/suggestions.

![Quick fix](/assets/docs/languages/csharp/lightbulb.png)

## Testing

The extension supports the following test frameworks:

*   XUnit
*   NUnit
*   MSTest

The C# Dev Kit extension provides the following features:

*   Run/Debug tests cases
*   View test report
*   View tests in Testing Explorer

For more information, go to our Testing documentation for C# Dev Kit.

## Next steps

Read on to find out about:

*   C# Dev Kit documentation
*   .NET Development - get up and running with cross-platform .NET
*   Basic Editing - Learn about the powerful VS Code editor.
*   Tasks - Use tasks to build your project and more.
*   Debugging - Find out how to use the debugger with your project.
*   Unity development - Learn about using VS Code with your Unity projects.

7/1/2026