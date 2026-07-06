# Spring Boot in Visual Studio Code

Visual Studio Code is an ideal lightweight development environment for Spring Boot application developers and there are several useful VS Code extensions including:

*   Spring Boot Tools
*   Spring Initializr
*   Spring Boot Dashboard

We recommend installing the Spring Boot Extension Pack that includes all of the extensions above.

If you run into any issues when using the features below, you can contact us by opening an issue.

## Prerequisites

To develop a Spring Boot application in Visual Studio Code, you need to install the following:

*   Java Development Kit (JDK)
*   Extension Pack for Java
*   Spring Boot Extension Pack

Install the Extension Pack for Java

Install the Spring Boot Extension Pack

> **Note**: More information about how to get started can be found at Getting Started with Java tutorial.

To help get you started with Java Spring Boot development, you can use the Java Spring profile template that includes useful extensions, settings, and Java Spring Boot code snippets.

## Create the project

The Spring Initializr extension allows you to search for dependencies and generate new Spring Boot projects.

To install, launch VS Code and from the Extensions view (⇧⌘X (Windows, Linux Ctrl+Shift+X)), search for `vscode-spring-initializr`.

Once you have the extension installed, open the **Command Palette** (⇧⌘P (Windows, Linux Ctrl+Shift+P)) and type `Spring Initializr` to start generating a Maven or Gradle project and then follow the wizard.

## Edit the project

The Spring Initializr extension allows you to add dependencies after generating a new Spring Boot project.

Navigate to your `pom.xml` file and right-click to select **Add starters...**. A dropdown will show the dependencies you already have beginning with a `√` . You can search for other dependencies you want to add to your project. Or you can click on the existing dependencies to remove them.

## Develop the application

The Spring Boot Tools extension includes rich language support for working with Spring Boot `application.properties`, `application.yml`, and `.java` files.

The extension supports the following features:

*   Quickly navigate to a Spring element in your workspace
*   Smart code completion for Spring specific components
*   Quick access to running Spring apps
*   Live application information
*   Code templates

Similar code completion and validation features are also available for `.properties` and `.yml` files.

To learn how to use these features, you can visit this detailed usage guide.

Below is an example showing live application information.

## Run the application

In addition to using F5 to run your application, there's the Spring Boot Dashboard extension, which lets you view and manage all available Spring Boot projects in your workspace as well as quickly start, stop, or debug your project.

## Next steps

*   Java Spring profile template - Create a new profile with a curated set of extensions, settings, and snippets.
*   To deploy your web app, see Java Web Apps with VS Code.
*   To containerize a web app and deploy as a Docker container, check out Docker in VS Code.
*   To learn more about Java debugging features, see Running and debugging Java.

12/22/2021