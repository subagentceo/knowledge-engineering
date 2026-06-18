

# Welcome
<a name="Welcome"></a>

This AWS CodeConnections API Reference provides descriptions and usage examples of the operations and data types for the AWS CodeConnections API. You can use the connections API to work with connections and installations.

 *Connections* are configurations that you use to connect AWS resources to external code repositories. Each connection is a resource that can be given to services such as CodePipeline to connect to a third-party repository such as Bitbucket. For example, you can add the connection in CodePipeline so that it triggers your pipeline when a code change is made to your third-party code repository. Each connection is named and associated with a unique ARN that is used to reference the connection.

When you create a connection, the console initiates a third-party connection handshake. *Installations* are the apps that are used to conduct this handshake. For example, the installation for the Bitbucket provider type is the Bitbucket app. When you create a connection, you can choose an existing installation or create one.

When you want to create a connection to an installed provider type such as GitHub Enterprise Server, you create a *host* for your connections.

You can work with connections by calling:
+  [CreateConnection](API_CreateConnection.md), which creates a uniquely named connection that can be referenced by services such as CodePipeline.
+  [DeleteConnection](API_DeleteConnection.md), which deletes the specified connection.
+  [GetConnection](API_GetConnection.md), which returns information about the connection, including the connection status.
+  [ListConnections](API_ListConnections.md), which lists the connections associated with your account.

You can work with hosts by calling:
+  [CreateHost](API_CreateHost.md), which creates a host that represents the infrastructure where your provider is installed.
+  [DeleteHost](API_DeleteHost.md), which deletes the specified host.
+  [GetHost](API_GetHost.md), which returns information about the host, including the setup status.
+  [ListHosts](API_ListHosts.md), which lists the hosts associated with your account.

You can work with tags in AWS CodeConnections by calling the following:
+  [ListTagsForResource](API_ListTagsForResource.md), which gets information about AWS tags for a specified Amazon Resource Name (ARN) in AWS CodeConnections.
+  [TagResource](API_TagResource.md), which adds or updates tags for a resource in AWS CodeConnections.
+  [UntagResource](API_UntagResource.md), which removes tags for a resource in AWS CodeConnections.

For information about how to use AWS CodeConnections, see the [Developer Tools User Guide](https://docs.aws.amazon.com/dtconsole/latest/userguide/welcome-connections.html).

This document was last published on June 17, 2026. 