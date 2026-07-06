# Build Tools

This document is an overview of how to build your C# projects and solutions in the C# tools for Visual Studio Code. It covers the features provided by the C# Dev Kit extension.

## Building a solution

When a solution is loaded, the C# Dev Kit extension provides several tasks that operate on the solution and the projects contained in it. In addition to the ability to right-click and build on any solution or project in the Solution Explorer, you can build your entire solution using the `.NET: Build` command:

![Choosing the .NET:Build command](/assets/docs/csharp/build-tools/net-build-command.gif)

You can also build your solution using the Tasks feature of Visual Studio Code. C# Dev Kit integrates with the Task system and registers several tasks under the `dotnet` grouping. Here's what that looks like:

![Showing the  task grouping here](/assets/docs/csharp/build-tools/show-dotnet-tasks.gif)

The `build` task builds the open solution via the dotnet build command, and the `clean` task cleans all solution outputs via the dotnet clean command.

You can also `watch` specific projects with these tasks. Watching a project means looking at the project's files and rebuilding the project whenever those change. This is the same as running the dotnet watch command against the project directly, only integrated into your editor.

## Managing project files

The project file is an extensible XML document that describes how your project should build. You can learn more about .NET Project files in the .NET project SDKs documentation, but in general you modify your build by adding Properties (XML elements with inner values) and Items (XML elements with attributes).

To add editor features like code completion for properties and items, syntax highlighting, and tooltips for common project properties, you can install the MSBuild project tools extension. Note that this extension is a community project and is not directly supported by Microsoft.

6/6/2023