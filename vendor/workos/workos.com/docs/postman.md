# WorkOS Postman collection

## Introduction

Postman is a popular API development tool that allows users to easily test API endpoints. The [WorkOS API collection](https://www.postman.com/workos/workspace/workos-public/collection/25188762-79ce1172-4741-4f1d-a486-64380f9a599f?ctx=documentation) is a set of pre-configured requests specific to the WorkOS API, meant to help developers to quickly get started testing the WorkOS API endpoints.

The [environment template](https://www.postman.com/workos/workspace/workos-public/environment/25188762-b99e7518-d907-4aa0-82d2-a199157a53c7) supports this collection, and allows variables to be abstracted away from the individual requests. The environment template makes it easier to manage and re-use common variables across the collection's requests.

## Configuring Postman

There are several ways to use this collection. You can create a fork, or you can export/import the collection and environment.

### Creating a fork

The preferred and simplest way to get started using the WorkOS API collection is to create a fork of the collection and environment.

To create a fork of the collection, first sign in to your Postman account. Then navigate to the WorkOS API collection. Hover over the name of the collection and click the three dots, then click "Create a fork".

![A screenshot showing how to fork a collection in Postman](https://images.workoscdn.com/images/a3d67b02-a824-4f27-b055-c06eaf5a7e94.png?auto=format\&fit=clip\&q=50)

Select your fork label and workspace, then click the "Fork collection" button.

![A screenshot showing the fork collection details page in Postman.](https://images.workoscdn.com/images/c9074bd3-8ab8-4864-9b68-56c6a858a17e.png?auto=format\&fit=clip\&q=50)

You will now see the WorkOS API collection appear in your workspace's collection tab.

To fork the WorkOS environment template, the same process is used. Navigate to the environments tab of the WorkOS Public workspace. Hover over the WorkOS environment template, click the three dots, and then click "Create a fork". Select your fork label and workspace, then click the "Fork environment" button.

### Exporting the collection and environment

Another way to use the WorkOS API collection is to import the collection and environment into your workspace. Using this approach allows you to share the collection as a JSON file to easily share it with others.

To export the collection, navigate to the collection tab in the WorkOS workspace, then hover over the WorkOS API collection name and click on the three dots. Click export to download the collection as a JSON file.

![A screenshot showing the export option in Postman.](https://images.workoscdn.com/images/54aed639-6c8f-467e-baa6-53099c36fe35.png?auto=format\&fit=clip\&q=50)

Navigate to your workspace's collections tab and click on the import button.

![A screenshot showing where to find the import button in Postman.](https://images.workoscdn.com/images/802d9d45-c258-4548-9f88-7d04f2d260c2.png?auto=format\&fit=clip\&q=50)

Select the JSON file that was downloaded in the previous step and then click import. You will now see the collection available to use and edit in the collection tab.

The environment can be exported from the WorkOS workspace and imported to your personal workspace using these same steps.

Navigate to the collection tab in your workspace and select the environment. This allows the collection to reference the environment variables.

## Environment variables

The WorkOS API collection makes use of environment variables. All environment variables that are used in the WorkOS API collection are defined in the environment tab in Postman.

![A screenshot showing the environments tab in Postman.](https://images.workoscdn.com/images/bd26c85b-8d66-478c-909b-f5ee01ffaffd.png?auto=format\&fit=clip\&q=50)

To get started, you will need to obtain the `api_key` and `client_id` values from your WorkOS dashboard and enter them in the environment template.

You can find your API key and the client ID on the [API Keys](https://dashboard.workos.com/api-keys) page in the WorkOS dashboard.

There are also several other environment variables in the template which will need to be replaced with various IDs and values in the course of making API calls. These values are defined in the variable descriptions.

## Sending requests to the WorkOS API

The WorkOS collection sends data in several ways. Some requests use values directly in the URL, some requests use query parameters, and some requests send data in the body of the request. Each call will indicate where there are values present with a green dot.

The "Get A Directory User" request for instance uses the `api_key` environment variable in the authorization tab of the request, and the `base_url` and `directory_user_id` values in the URL of the request.

![A screenshot showing the Get a Directory User request in Postman.](https://images.workoscdn.com/images/76d3df52-cf4e-467a-a898-df62a920a800.png?auto=format\&fit=clip\&q=50)

The "Generate a Portal Link" request uses the `base_url` and `api_key` variables in the same way that the Get A Directory User call does, but also sends the name of the Organization and intent in the body of the request as x-www-form-urlencoded data.

![A screenshot showing the Generate a Portal Link request in Postman.](https://images.workoscdn.com/images/c2ae7131-dc79-49ee-aac1-724d3de42c48.png?auto=format\&fit=clip\&q=50)

To send a request, first select the WorkOS environment template so the collection has access to its variables.

![A screenshot showing where to select the Environment in Postman.](https://images.workoscdn.com/images/fea5d174-0fea-400b-b498-3753c85c5eeb.png?auto=format\&fit=clip\&q=50)

Finally, ensure all the values are defined where they are needed for the particular request and then click send.

## Debugging requests

Postman provides a developer console if you need to debug any requests. Navigate to a request and click on the console button to view the details of the requests you send.

![A screenshot showing the developer console in Postman.](https://images.workoscdn.com/images/9dafe4a0-5a9a-46d3-bee9-ba01d5b25724.png?auto=format\&fit=clip\&q=50)

If you have any questions while using the WorkOS API collection, please reach out to our team at [support@workos.com](mailto:support@workos.com).
