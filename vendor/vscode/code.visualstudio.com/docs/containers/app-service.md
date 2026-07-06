# Deploy a containerized app to Azure

In this guide you will learn how to:

*   Create a container image for your application.
*   Push the image to a container registry.
*   Deploy the image to Azure App Service or Azure Container Apps.

## Prerequisites

*   An Azure subscription.
*   The Container Tools and Azure App Service extensions must be installed.
*   A **web** application that produces a container image. You could also follow Create a sample ASP .NET Core application to create such application.
*   You need a Docker Hub account or an instance of Azure Container Registry (ACR).

## Create the application image

If you already have an image, skip this step and proceed to Push the image to a container registry step.

1.  Open the application folder in VS Code.
    
2.  Open Command Palette (⇧⌘P (Windows, Linux Ctrl+Shift+P)) and use **Container Images: Build Image...** command to build the image.
    
    ![Build container image](/assets/docs/containers/app-service/command-build-image.png)
    
    You can find the image name in the output of the Build Image command, the same can be found in the Images pane of the Container Explorer.
    
    ![Build image output](/assets/docs/containers/app-service/terminal-output-build-image.png)
    

## Push the image to a container registry

Before deploying the image to an App Service or a Container App, the image must be uploaded to a container registry. The image can be uploaded to either Azure Container Registry (ACR) or Docker Hub.

1.  Open the Container Explorer and select **Connect Registry...** icon under **Registries** group and follow the prompt. Choose the provider (Azure or Docker Hub) and provide the credential to connect to the registry.
    
    ![Connect to Registry](/assets/docs/containers/app-service/explorer-connect-registry.png)
    
2.  Now the registry will be visible under Registries.
    
    ![Registries](/assets/docs/containers/app-service/explorer-registries.png)
    
3.  Optionally, tag the image. In order to upload an image to a registry, the image needs to be tagged with registry name so that the `docker push` command will upload it to the right registry.
    
    *   To create a registry in Azure ACR, open the **Registries** section of the Container Explorer, sign in to Azure if not already signed in, and then right-click on the subscription you want to use, and choose **Create Registry**.
        
    *   The image built in previous section will appear in the Container Explorer under Images section. Right-click and choose **Tag...**.
        
        ![Tag image](/assets/docs/containers/app-service/explorer-tag-image.png)
        
    *   Specify the new name `<your registry or username>/<image name>:<tag>` and complete the tag action. For example, new image name for ACR named WebApp6 would be 'webapp6.azurecr.io/webapp6:latest' and for Docker Hub it would be 'myusername/webapp6:latest'.
        
4.  The image will show up in the Container Explorer under the registry that the image tag points to. Select this image and choose **Push**. If the image has not yet been tagged, you will be prompted to choose a registry to push to, and the image will be tagged based on the selection.
    
    ![Push image](/assets/docs/containers/app-service/explorer-push-image.png)
    
5.  Once the push command is completed. Refresh the registry node where the image is pushed to and the uploaded image will show up.
    
    ![Refresh registry](/assets/docs/containers/app-service/explorer-refresh-registry.png)
    

## Deploy the image to Azure

In the previous section, the image is pushed to a remote container registry. Now deploy this image to Azure App Service or Azure Container Apps.

1.  In Container Explorer, navigate to your image under Registries, right-click on the tag, and select **Deploy Image To Azure App Service...** or **Deploy Image to Azure Container Apps...**.
    
    ![Deploy to Azure App Service](/assets/docs/containers/app-service/explorer-deploy-to-app-service.png)
    
2.  When prompted, provide the values for the App Service or Container App.
    
    *   New web app name: The name must be unique across Azure.
    *   Resource group: Select an existing resource group or create a new one.
    *   App Service plan: Select an existing App Service Plan or create a new one. (An App Service Plan defines the physical resources that host the website; you can use a basic or free plan tier for this tutorial).
3.  When deployment is complete, Visual Studio Code shows a notification with the website URL.
    
    ![Deployment complete notification](/assets/docs/containers/app-service/notification-appservice-deployment.png)
    
4.  You can also see the results in the Output panel of Visual Studio Code, in the Container Tools section.
    
    ![Deployment complete output](/assets/docs/containers/app-service/output-appservice-deployment.png)
    
5.  To browse the deployed website, you can use Ctrl+click to open the URL in the Output panel. You might need to wait a little while for the app to be live in Azure. The new App Service or Container App also appears in the Azure view in Visual Studio Code, where you can right-click the website and select **Browse Website**.
    
    ![Web Application](/assets/docs/containers/app-service/webapp-homepage.png)
    

## Next steps

Read on to learn more about

*   Azure Extensions - The VS Code Marketplace has hundreds of extensions for Azure and the cloud.
*   Deploying to Azure - Learn step-by-step how to deploy your application to Azure.
*   Working with MongoDB - Create, manage, and query MongoDB databases from within VS Code.

1/17/2023