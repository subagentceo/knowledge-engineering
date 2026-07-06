# Azure Extensions

You can use Azure directly from Visual Studio Code through a range of extensions. The Azure Tools extension pack contains various extensions designed to deploy your application to Azure within minutes.

![app service](/assets/docs/azure/extensions/azure-tools.png)

## Which extension should I use?

The table below describes the various extensions available in the Azure Tools extension pack for VS Code and highlights common use cases.

Type of Developer

Description

When to use

Fullstack developer

Developers who work on both frontend and backend aspects of apps.

If you're building a web app with both frontend and backend components, use these extensions to deploy and manage the entire stack on Azure.  
  
**Azure Container Apps** creates or manages containerized apps that handle different parts of your stack.  
**Azure Functions** creates serverless functions to handle backend tasks and integrate with frontend apps.  
**Azure App Service** deploys complete web solutions, including dynamic backend services, APIs, and server-side logic.

Backend developer

Developers who build microservices architectures and use containers to encapsulate/manage individual microservices.

When developing microservices, backend logic, or APIs for your application, these tools provide the ability to scale effortlessly without managing infrastructure.  
  
**Azure Container Apps** handles server-side logic, APIs, and microservices.  
**Azure Functions** handles server-side logic and APIs.  
**Azure Container Apps** deploys and manages containerized backend services.  
**Azure Functions** allows you to build scalable, event-driven backend services without the need to manage any infrastructure.  
**Azure App Service** allows you to deploy RESTful APIs, microservices, and other backend components.

DevOps Engineer

Engineers who are responsible for setting up or maintaining CI/CD pipelines and managing cloud infrastructure.

Use these extensions when setting up CI/CD pipelines or automating deployment processes for scalable applications.  
  
**Azure Container Apps** automates the deployment and scaling of containerized applications.  
**Azure Functions** automates the deployment of serverless functions and integrates them into a broader DevOps workflow.  
**Azure App Service** integrates code repositories with automated deployment processes and monitors application performance and logs.  
**Azure Static Web Apps** automates the deployment process and ensures seamless integration with GitHub Actions or Azure DevOps.

Frontend developer

Developers who specialize in building user interfaces using frameworks and libraries like React, Angular, Vue.js, or plain HTML/CSS/JavaScript.

These extensions are perfect for deploying and managing static websites or single-page applications, with integrations for automatic deployments from GitHub or Azure DevOps.  
  
**Azure Static Web Apps**, **Azure App Service**, **Azure Storage**, and **Azure Functions** offer a streamlined workflow for developing, previewing, and deploying static websites and single-page applications.

Enterprise Developer

Developers who work on large-scale apps, services for businesses, and who build Software as a Service (SaaS) apps.

When building enterprise-level applications or SaaS products, these tools help ensure scalability and reliability for business-critical services.  
  
**Azure Container Apps**, **Azure Functions**, **Azure App Service:** Use these extensions to deploy, scale, and monitor mission-critical applications.  
Use containers to create scalable, multi-tenant services, and automate various backend processes.

API developer

Developers who create and manage APIs for various clients and apps.

For building RESTful or serverless APIs, these extensions streamline the process of deployment and scaling.  
  
**Azure Functions** or **Azure Container Apps** are options for building and deploying serverless APIs.  
**Azure Storage** fulfills your API data storage requirements with options like blobs, queues, tables, and files. It also allows for uploading and downloading data.

Data engineer

Engineers who process and analyze data streams.

When working with large-scale data streams, these tools help create scalable environments for real-time data processing and analysis.  
  
Deploy data processing and machine learning models in containers using **Azure Container Apps**, creating scalable and reproducible environments for your data-driven applications.  
**Azure Functions** let you trigger data workflows, perform ETL tasks, and react to real-time data changes.

## Visual Studio Code Marketplace

There are many VS Code extensions on the Marketplace that make it easy to build and host applications on Azure.

> **Tip:** Click on an extension tile above to read the description and reviews in the Marketplace.

## Next steps

*   Azure Tools Getting Started - Learn how to get started quickly.
*   Azure Architecture Center - Guidance for architecting solutions on Azure using established patterns and practices
*   VS Code Getting Started

02/1/2024