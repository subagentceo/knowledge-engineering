# Fourth

## Introduction

This guide outlines how to synchronize your application's Fourth directories.

To synchronize an organization's users and groups provisioned for your application, you'll need the following information from the organization:

- Fourth Organization ID
- Fourth username and password

> Note: The Fourth integration isn't enabled by default in the WorkOS Dashboard or Admin Portal. Please reach out to [support@workos.com](mailto:support@workos.com) or via your team's WorkOS Slack channel if you would like Fourth enabled.

***

## (1) Set up your directory sync integration

Sign in into your WorkOS Dashboard and select "Organizations" from the left hand navigation bar.

Select the organization you'll be configuring a new Directory Sync connection with.

Click "Manually Configure Directory".

![A screenshot showing where to find "Manually Configure Directory" button for an organization in the WorkOS dashboard.](https://images.workoscdn.com/images/0a0fa511-08ae-4fd9-9cfc-0301b7041b3f.png?auto=format\&fit=clip\&q=50)

Input the Name, and select "Fourth" as the directory type. Click the "Create Directory" button.

![A screenshot showing "Create Directory" details in the WorkOS dashboard.](https://images.workoscdn.com/images/ba13b740-7cbf-42e5-a511-b0c5a9f384e0.png?auto=format\&fit=clip\&q=50)

You will now see your Fourth directory sync has been created successfully with an input for the Organization ID, username, and password.

## (2) Obtain and update directory details

Retrieve the Fourth Organization ID from the organization's IT contacts, as well as the username and password that will be used for authentication.

Click "Update Directory" in the WorkOS Dashboard.

![A screenshot showing where to find the "Update Directory" button in the WorkOS dashboard.](https://images.workoscdn.com/images/9c641325-3703-4c17-955e-d6b0fc898996.png?auto=format\&fit=clip\&q=50)

Enter the Organization ID, the username and the password.

***

## (3) View users and groups in your dashboard

When the connection is successfully made, you will see the green "Linked" icon appear. Now, whenever the organization assigns users or groups to your application, you'll receive Dashboard updates based on changes in their directory.

Click on the "Users" tab in the Dashboard to view synced users.

![A screenshot showing where to find the "Users" tab in the WorkOS directory.](https://images.workoscdn.com/images/0784ded9-3fcd-45f1-87cc-44bb41e2031c.png?auto=format\&fit=clip\&q=50)

***

## Frequently asked questions

### How often do Fourth directories perform a sync?

Fourth directories poll every 30 minutes starting from the time of the initial sync.
