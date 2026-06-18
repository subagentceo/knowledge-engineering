# Access People HR

## Introduction

This guide outlines how to synchronize your application's Access People HR directories.

To synchronize an organization's users and groups provisioned for your application, you'll need the following information from the organization:

- Access People HR API key

> Note: The Access People HR integration isn't enabled by default in the WorkOS Dashboard or Admin Portal. Please reach out to [support@workos.com](mailto:support@workos.com) or via your team's WorkOS Slack channel if you would like Access People HR enabled.

***

## (1) Create an API Key

The organization will need to create an API key for you. First, they'll need to log in to their Access People HR admin dashboard and select to the "Settings" page from the side bar menu. Then, select "API" from the Settings side bar menu. On the API Key Management page, select the plus sign to add a new API Key.

![A screenshot showing where to find the plus sign in the Access People HR Dashboard.](https://images.workoscdn.com/images/9cbff13f-9ea3-442a-90ae-7c135e14e07b.png?auto=format\&fit=clip\&q=50)

In the API Key Generator, give the API Key a descriptive name. Under "Application", select "Employee".

![A screenshot showing where the "Employee" option is location in the Access People HR Dashboard.](https://images.workoscdn.com/images/02f54969-422c-4f17-9c34-559bd419cf3e.png?auto=format\&fit=clip\&q=50)

On the Select Permissions page, check only "Get All Employee Detail" and then select "Save".

![A screenshot showing where to select the "Get All Employee Detail" permission is located in the Access People HR Dashboard.](https://images.workoscdn.com/images/7387653b-7d30-4733-96e4-033004396449.png?auto=format\&fit=clip\&q=50)

On the API Key Generator page, select "Save".

![A screenshot showing the API Key Generator page in the Access People HR Dashboard.](https://images.workoscdn.com/images/c58ba765-8015-4776-8fe0-6260de530d52.png?auto=format\&fit=clip\&q=50)

Copy and save the API key – this will be used in Step 3.

![A screenshot showing the copy icon in the Access People HR Dashboard.](https://images.workoscdn.com/images/a8248b85-173a-4f6b-812f-f58b9abfc9f1.png?auto=format\&fit=clip\&q=50)

***

## (2) Create your Directory Sync Connection

Login to your WorkOS dashboard and select "Organizations" from the left hand Navigation bar

Select the Organization you'd like to enable an Access People HR Directory Sync connection for.

On the Organization's page click "Manually Configure Directory".

![A screenshot showing where to find "Manually Configure Directory" for an Organization in the WorkOS Dashboard.](https://images.workoscdn.com/images/ed383bc9-e626-4d2c-bbfd-78dbe8bbc5d4.png?auto=format\&fit=clip\&q=50)

Select "Access People HR" as the Directory Provider, and then provide a descriptive name for the connection. Select "Create Directory".

![A screenshot showing Create Directory details in the WorkOS Dashboard.](https://images.workoscdn.com/images/cc5dde6b-4eda-4af7-bcb9-3ec958e6bc79.png?auto=format\&fit=clip\&q=50)

***

## (3) Setup your Directory Sync Connection

In the directory details section, select "Update Directory".

![A screenshot showing where to find "Update Directory" in the WorkOS Dashboard.](https://images.workoscdn.com/images/b0b0e10f-59ab-43da-b348-52b5d53bd299.png?auto=format\&fit=clip\&q=50)

Enter your API Key from Step 1, and select "Save Directory Details".

![A screenshot showing where to enter your API Key in the WorkOS Dashboard.](https://images.workoscdn.com/images/31881779-5153-4193-a5bd-316b9684650b.png?auto=format\&fit=clip\&q=50)

***

## (4) Sync Users and Groups to Your Application

Now, you should see users and groups synced over from Access People HR.

Departments from Access People HR are synced as groups in WorkOS. All users are synced, but only those marked as "ACTIVE" or "LEAVER\_MARKED" have a state of active.

***

## Frequently asked questions

### How often do Access People HR directories perform a sync?

Access People HR directories poll every 30 minutes starting from the time of the initial sync.
