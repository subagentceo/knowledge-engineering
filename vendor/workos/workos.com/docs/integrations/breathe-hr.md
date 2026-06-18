# Breathe HR

## Introduction

This guide outlines how to synchronize your application's Breathe HR directories.

To synchronize an organization's users and groups provisioned for your application, you'll need the following information from the organization:

- Breathe HR API key

> Note: The Breathe HR integration isn't enabled by default in the WorkOS Dashboard or Admin Portal. Please reach out to [support@workos.com](mailto:support@workos.com) or via your team's WorkOS Slack channel if you would like Breathe HR enabled.

***

## (1) Create an API Key

The organization will need to create an API key for you. An API key can be generated from the Admin Settings menu.

![A screenshot showing where to select "Settings" in the Breathe HR dashboard.](https://images.workoscdn.com/images/3defb6ef-fe7d-458f-8639-d0410fc11f51.png)

Under "Integrations", select "API Setup".

![A screenshot showing where to select "API Setup" in the Breathe HR dashboard settings.](https://images.workoscdn.com/images/d6c8d0e9-1d71-428e-b368-4bcd5240432c.png)

Next, select "Enable API".

![A screenshot showing where to select "Enable API" on the "API Setup" page in the Breathe HR dashboard.](https://images.workoscdn.com/images/890c4a8e-4217-433f-b67f-037dda40a7c5.png)

Verify that you'd like to enable the API to access user information.

![A screenshot showing to mark the checkbox denoting "I understand and want to continue" in the "Warning" modal in the Breathe HR dashboard.](https://images.workoscdn.com/images/e6623c61-c520-4636-a029-c91fb2b5a33f.png)

Save the production API key – this will be used in the next step.

![A screenshot showing where to select the production API key in the "API Setup" section of the Breathe HR dashboard.](https://images.workoscdn.com/images/d66a8ba2-bcf6-44bf-a714-e08164cdf632.png)

***

## (2) Create your Directory Sync Connection

Login to your WorkOS dashboard and select "Organizations" from the left hand Navigation bar

Select the Organization you'd like to enable a Breathe HR Directory Sync connection for.

On the Organization's page click "Add Directory".

![A screenshot showing where to select "Add Directory" in the WorkOS dashboard.](https://images.workoscdn.com/images/f6bdcf89-cfc4-46e6-a67c-d2f428e6052a.png)

Select "Breathe HR" as the Directory Provider, and then provide a descriptive name for the connection. Select "Create Directory".

![A screenshot showing the configuration of the "Create Directory" modal to create a Breathe HR Directory in the WorkOS dashboard.](https://images.workoscdn.com/images/32c361da-6bf7-428b-84c0-5b1f27db5c51.png)

***

## (3) Set up your Directory Sync Connection

Click "Update Directory" on the Directory details page.

![A screenshot showing where to select "Update Directory" in the WorkOS dashboard.](https://images.workoscdn.com/images/d2f1bfb0-f119-4582-8c6c-83e11bbbbd87.png)

Input the Breathe HR API key and click "Save Directory Details".

![A screenshot showing the input of the Breathe HR API key into the "Directory Details" modal in the WorkOS dashboard.](https://images.workoscdn.com/images/12ede429-9f2b-4cff-8e30-00e2b3594a85.png)

***

## (4) Sync Users and Groups to Your Application

Now, you should see users and groups synced over from Breathe HR.

Departments from Breathe HR are synced as groups in WorkOS. All users are synced, but only those marked as "Current employee" or "Pending leaver" are active.

![A screenshot showing a successfully linked Breathe HR Directory in the WorkOS dashboard.](https://images.workoscdn.com/images/26b9a26a-1abc-4517-9251-104da59f7251.png)

A detailed guide to integrate the WorkOS API with your application can be found [here](https://workos.com/docs/directory-sync)

## Frequently asked questions

### How often do Breathe HR directories perform a sync?

Breathe HR directories poll every 30 minutes starting from the time of the initial sync.
