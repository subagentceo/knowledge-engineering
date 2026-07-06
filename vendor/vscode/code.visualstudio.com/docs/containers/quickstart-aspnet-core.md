# ASP.NET Core in a container

In this guide you will learn how to:

*   Create a `Dockerfile` file describing a simple .NET Core service container.
*   Build, run, and verify the functionality of the service.
*   Debug the service running as a container.

## Prerequisites

*   Docker and the VS Code Container Tools extension must be installed as described on the overview.
*   For .NET development, install .NET SDK.
*   Microsoft C# for Visual Studio Code extension.

## Create a .NET Web API project

1.  Create a folder for the project.
    
2.  Open developer command prompt in the project folder and initialize the project:
    
    ```
    dotnet new webapi --no-https
    ```
    

## Add Docker files to the project

1.  Open the project folder in VS Code.
    
2.  Wait for the C# extension to prompt you to add required assets for build and debug, and choose **Yes**. You can also open the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)) and use the **.NET: Generate Assets for Build and Debug** command.
    
3.  Open Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)) and use **Containers: Add Docker Files to Workspace...** command:
    
    ![Add Dockerfile to a .NET project](/assets/docs/containers/quickstarts/aspnetcore-add-dotnet.png)
    
4.  Use **.NET: ASP.NET Core** when prompted for application platform.
    
5.  Choose **Windows** or **Linux** when prompted to choose the operating system.
    
    > Windows is only applicable if your Docker installation is configured to use Windows containers.
    
6.  You will be asked if you want to add Docker Compose files. We will not use Docker Compose in this tutorial, so both "Yes" and "No" answers are fine.
    
7.  Change the port for application endpoint to `5000`.
    
8.  `Dockerfile` and `.dockerignore` files are added to the workspace.
    
    The extension will also create a set of **VS Code tasks** for building and running the container (in both debug- and release configuration, four tasks in total), and a **debugging configuration** for launching the container in debug mode.
    

## Build the application

1.  Open terminal prompt (⌃` (Windows, Linux Ctrl+`)).
    
2.  Issue `dotnet build` command to build the application:
    
    ```
    PS C:\source\repos\net> dotnet build
    MSBuild version 17.4.0-preview-22470-08+6521b1591 for .NET
      Determining projects to restore...
      All projects are up-to-date for restore.
      net -> C:\source\repos\net\bin\Debug\net7.0\net.dll
    
    Build succeeded.
        0 Warning(s)
        0 Error(s)
    
    Time Elapsed 00:00:08.96
    ```
    

## Add an environment variable to the image

You can use the Container Tools extension to author Docker files. The extension provides completions and contextual help. To see these capabilities add an environment variable to your service image by following these steps:

1.  Open the `Dockerfile` file.
    
2.  Use `ENV` instruction to add an environment variable to the service container image. The instruction should be placed in the `base` stage of the `Dockerfile` (the first stage in the file). Set the `ASPNETCORE_URLS` variable to `http://*:5000`:
    
    ![Add an environment variable to Docker image](/assets/docs/containers/quickstarts/aspnetcore-intellisense-env.png)
    
    Note how the Container Tools extension lists all available Dockerfile instructions and describes the syntax.
    
    > The Container Tools extension uses the `base` stage of the `Dockerfile` to create a debug version of the container image for your service. Put the `ASPNETCORE_URLS` environment variable definition in the `base` stage to have this variable available in both debug and release versions of the container image.
    
3.  Save the `Dockerfile` file.
    

## Build the image

1.  Open the Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)) and issue **Container Images: Build Image...** command.
    
2.  Open the Container Explorer and verify that the new image is visible in the Images tree:
    
    ![Verify Docker image exists](/assets/docs/containers/quickstarts/aspnetcore-verify-image.png)
    

## Test the service container

1.  Right-click on the image built in previous step and choose **Run** or **Run Interactive**. The container should start and you should be able to see it in the "Containers" view of the Container Explorer:
    
    ![Running service container](/assets/docs/containers/quickstarts/aspnetcore-running-container.png)
    
2.  Open the web browser and navigate to http://localhost:5000/WeatherForecast. You should see weather data in JSON format, similar to following:
    
    ```
    [
        {"date":"2019-11-07T23:31:57.0527092+00:00","temperatureC":4,"temperatureF":39,"summary":"Bracing"},
        {"date":"2019-11-08T23:31:57.0539243+00:00","temperatureC":-19,"temperatureF":-2,"summary":"Freezing"},
        {"date":"2019-11-09T23:31:57.0539269+00:00","temperatureC":2,"temperatureF":35,"summary":"Freezing"},
        {"date":"2019-11-10T23:31:57.0539275+00:00","temperatureC":-4,"temperatureF":25,"summary":"Freezing"},
        {"date":"2019-11-11T23:31:57.053928+00:00","temperatureC":9,"temperatureF":48,"summary":"Bracing"}
     ]
    ```
    
    > By default Docker will assign a randomly chosen **host port** to a port exposed by a container (the **container port**). In our application the exposed (container) port is 5000. When you issue **Run** command for an image, VS Code will try to use the same port number for the host port and container port. This makes it easy to remember which port to use to communicate with the container, but it won't work if the host port is already in use.
    > 
    > If you cannot see the data from the container in your browser, make sure there are no errors reported by the `docker run` command (look at the command output in the terminal window). You can also verify which host port is using by the container by right-clicking the container in the Container Explorer and choosing **Inspect**. This will open a JSON document that describes the container in detail. Search for `PortBindings` element, for example:
    > 
    > ```
    > "PortBindings": {
    >   "5000/tcp": [
    >     {
    >       "HostIp": "",
    >       "HostPort": "5000"
    >     }
    >   ]
    > },
    > ```
    
3.  When done testing, right-click the container in the Container Explorer and choose **Stop**.
    

## Debug in container

When Docker files were added to the application, the Container Tools extension also added a **VS Code debugger configuration** for debugging the service when it is running inside a container. The extension will automatically detect the protocol and port that the service is using and point the browser to the service, but we need to tell it what URL path to use.

1.  Set a breakpoint at the beginning of the code for the `Get()` method of the `Controllers/WeatherForecastController.cs` file.
    
2.  Open `.vscode/launch.json` file and find `Containers: .NET Core Launch` debug configuration.
    
3.  Add `dockerServerReadyAction` to `Containers: .NET Core Launch` configuration:
    
    ```
    "dockerServerReadyAction": {
        "uriFormat": "%s://localhost:%s/WeatherForecast"
    }
    ```
    
4.  Make sure the configuration is selected as active:
    
    ![Selected Docker debug configuration](/assets/docs/containers/quickstarts/aspnetcore-debug-configuration.png)
    
5.  Start debugging (F5).
    
    *   The debug version of the service container builds and starts.
    *   The browser opens to request a new weather forecast.
    *   The breakpoint in the `WeatherForecastController` is hit.

You can use specific port on the host by changing the Docker run options used by `docker-run: debug` task (defined in `.vscode/tasks.json` file). For example, if you want to use the same port (5000) to expose the service, the `docker-run: debug` task definition would look like this:

```
 {
    "type": "docker-run",
    "label": "docker-run: debug",
    "dependsOn": [
        "docker-build: debug"
    ],
    "dockerRun": {
        "ports": [
            { "hostPort": 5000, "containerPort": 5000 }
        ]
    },
    "netCore": {
        "appProject": "${workspaceFolder}/netcorerest.csproj",
        "enableDebugging": true
    }
```

## Next steps

You're done! Now that your container is ready, you may want to:

*   Learn about debugging .NET in a container
*   Customize your Docker build and run tasks
*   Push your image to a container registry
*   Deploy a containerized app to Azure App Service or Azure Container Apps
*   Learn about using Docker Compose

12/13/2022