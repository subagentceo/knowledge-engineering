# Working with Application Servers in VS Code

Visual Studio Code is a code editor-centric development tool, so it doesn't come with any embedded application server. For most servers, you will need to deploy them using the command line, and then use the appropriate debugger configuration if you want to attach to it.

On the other hand, we know that for certain Java workloads, server integration is very useful. With Visual Studio Code, you can find third party extensions for popular application servers, for example Tomcat, Jetty, and Open Liberty, which are helpful when working with those servers locally.

For Spring Boot Dashboard, see Spring Boot in Visual Studio Code.

If you run into any issues when using the features below, you can contact us by entering an issue.

## Community Server Connectors

The Community Server Connectors extension is published by Red Hat. It provides a Remote Server Protocol-based server connector, which can start, stop, publish to, and otherwise control community runtimes and servers like Apache Felix, Karaf, and Tomcat.

## Other Servers

The Open Liberty Tools extension lets you run your application on Open Liberty, allowing you to deploy, test, and debug your application from Visual Studio Code.

The Server Connector extension by Red Hat allows you to start, stop, and deploy to a Red Hat server and runtime products like WildFly, JBoss EAP, Minishift, CDK.

Extension Pack for MicroProfile provides tools for creating MicroProfile projects to develop and deploy to runtimes such as Open Liberty, Quarkus, and Payara.

12/142021