# Cezanne HR

## Introduction

This guide outlines how to synchronize your application's Cezanne HR directories.

To synchronize an organization's users and groups provisioned for your application, you'll need the following information from the organization:

- Cezanne HR Client ID
- Cezanne HR Client Secret

> Note: The Cezanne HR integration isn't enabled by default in the WorkOS Dashboard or Admin Portal. Please reach out to [support@workos.com](mailto:support@workos.com) or via your team's WorkOS Slack channel if you would like Cezanne HR enabled.

***

## (1) Set up your Directory Sync Connection

Login to your WorkOS Dashboard and select "Organizations" from the left hand navigation bar.

Select the organization you'll be configuring a new Directory Sync Connection with.

Click "Manually Configure Connection".

![A screenshot showing where to find "Manually Configure Directory" button for an organization in the WorkOS dashboard.](https://images.workoscdn.com/images/e65f54ae-6010-4492-a838-8583dc614e50.png?auto=format\&fit=clip\&q=50)

Input the Name, and select "Cezanne HR" as the directory type.

Click the "Create Directory" button.

![A screenshot showing "Create Directory" details in the WorkOS dashboard.](https://images.workoscdn.com/images/1217ac5a-6d04-4783-8ce5-b005c14aa005.png?auto=format\&fit=clip\&q=50)

You will now see your Cezanne HR directory sync has created successfully with an input for the Client ID and Client Secret

***

## (2) Obtain a Cezanne HR Client ID and Client Secret

To obtain these credentials, you will need to request a new API Application from the Cezanne HR Support Team.

***

## (3) Enter the details in the Directory's detail page

Click "Update Directory".

There are two fields to enter, the Client ID and Client Secret that Cezanne support provided for you.

![A screenshot showing where to find the "Update Directory" button in the WorkOS dashboard.](https://images.workoscdn.com/images/1b94ab4a-b001-47ea-a89f-548011881ff0.png?auto=format\&fit=clip\&q=50)

***

## (4) Sync Users and Groups to Your Application

When the connection is successfully made, you will see the green "Linked" icon appear. Now, whenever the organization assigns users or groups to your application, you'll receive Dashboard updates based on changes in their directory.

Click on the "Users" tab in the Dashboard to view synced users.

![A screenshot showing where to find the "Users" tab in the WorkOS directory.](https://images.workoscdn.com/images/ed0393d9-84de-416b-8410-b5596e091d67.png?auto=format\&fit=clip\&q=50)

A detailed guide to integrate the WorkOS API with your application can be found [here](https://workos.com/docs/directory-sync)

## Frequently asked questions

### How often do Cezanne HR directories perform a sync?

Cezanne HR directories poll every 30 minutes starting from the time of the initial sync.
