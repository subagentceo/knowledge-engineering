# Working with MongoDB

Visual Studio Code has great support for working with MongoDB databases, whether your own instance or with Azure DocumentDB (with MongoDB compatibility). With the DocumentDB for VS Code extension, you can create, manage, and query MongoDB databases from within VS Code.

## Install the extension

MongoDB support for VS Code is provided by the DocumentDB for VS Code extension. To install the DocumentDB for VS Code extension, open the Extensions view by pressing ⇧⌘X (Windows, Linux Ctrl+Shift+X) and search for 'DocumentDB' to filter the results. Select the **DocumentDB for VS Code** extension.

![Select DocumentDB for VS Code](/assets/docs/azure/documentdb/install-documentdb-extension.png)

## Connect to MongoDB

Once you've installed the DocumentDB for VS Code extension, you'll notice there is a new **DocumentDB** logo in the Activity Bar view. Select the DocumentDB logo and you'll see the Explorer.

![DocumentDB explorer](/assets/docs/azure/documentdb/documentdb-explorer.png)

To connect to a MongoDB-compatible database:

1.  Select **Add New Connection** in the DocumentDB Connection view
    
2.  Next, choose to connect with a connection string or use Service Discovery options:
    
    *   Select **Connection String**, and then enter the connection string in the connection string Quick Pick.
        
        ![Database Connection setup](/assets/docs/azure/documentdb/attach-via-connection-string.png)
        
    *   Select **Service Discovery**, choose your provider, and then select **Save & Connect**.
        
        ![Database Connection setup](/assets/docs/azure/documentdb/attach-via-service-discovery.png)
        

> **Note**: If you're not already signed in to Azure in VS Code, you'll be prompted to do so. This is required to use Service Discovery.

Once connected, you can work with the MongoDB server, managing MongoDB Databases, Collections, and Documents.

You can expand databases to view their collections in JSON/ Table/ Tree view with their schema and indexes.

![manage mongodb database](/assets/docs/azure/documentdb/manage-database.png)

You can also attach a MongoDB shell to the active connection, simply by right-clicking on the connection itself and selecting **Launch Shell**.

![MongoDB Connection](/assets/docs/azure/documentdb/launch-shell.jpeg)

> **Note**: Make sure the MongoDB shell (`mongo` or `mongosh`) is installed and is on your path. In the extension's settings, you can choose which shell you are using.

## Using Scrapbook

The **DocumentDB Scrapbook** is one of the most powerful features of this extension. It allows you to write, run, and save MongoDB commands directly within a VS Code editor, helping you prototype queries and scripts

### Create a New Scrapbook

1.  In the DocumentDB Explorer, right-click the desired collection.
    
2.  From the menu, click **DocumentDB Scrapbook** and select **New DocumentDB Scrapbook**.
    

![launch documentdb scrapbook](/assets/docs/azure/documentdb/create-scrapbook.png)

In a scrapbook, you can reference MongoDB entities and commands and you get rich IntelliSense as you type. Scrapbooks are useful for prototyping database operations and queries. Execute selected lines in the scrapbook queries with **Run Command**.

![Run scrapbook queries](/assets/docs/azure/documentdb/run-scrapbook.png)

## MongoDB on Azure DocumentDB

You can easily create a managed MongoDB cluster on Azure for **Free** with Azure DocumentDB.

## Next steps

*   Index Advisor - Learn how to optimize your MongoDB performance with Index Advisor.
*   Azure Extensions - The Visual Studio Marketplace has hundreds of VS Code extensions for Azure and the cloud.
*   Deploying to Azure - Learn step-by-step how to deploy your application to Azure.
*   Working with Docker - Put your application in a Docker container for easy reuse and deployment.

11/1/2025