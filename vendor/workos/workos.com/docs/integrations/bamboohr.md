# BambooHR

## Introduction

This guide outlines how to synchronize your application's BambooHR directories.

To synchronize an organization's users and groups provisioned for your application, you'll need the following information from the organization:

- The BambooHR subdomain.
- A BambooHR API key to authenticate requests.

> Note: The BambooHR integration isn't enabled by default in the WorkOS Dashboard or Admin Portal. Please reach out to [support@workos.com](mailto:support@workos.com) or via your team's WorkOS Slack channel if you would like BambooHR enabled.

***

## (1) Create your Directory Sync Connection

Login to your WorkOS Dashboard and select "Organizations" from the left hand navigation bar.

Select the organization you'll be configuring a new Directory Sync Connection with.

Click "Manually Configure Connection".

![A screenshot showing where to find "Manually Configure Connection" for an Organization in the WorkOS Dashboard.](https://images.workoscdn.com/images/60d14679-0ff2-4b7b-9e75-82ea0ae158f5.png?auto=format\&fit=clip\&q=50)

Input the Name, and select "BambooHR" as the directory type.

Click the "Create Directory" button.

![A screenshot showing "Create Directory" details in the WorkOS Dashboard.](https://images.workoscdn.com/images/e696881c-64b9-40c4-aa8e-593913179c92.png?auto=format\&fit=clip\&q=50)

You will now see your BambooHR directory sync has created successfully with an [Endpoint](https://workos.com/docs/glossary/endpoint), as well as fields to input your subdomain and API Key from BambooHR.

***

## (2) Retrieve the details from an organization's IT contact

To generate an API key, an IT contact should log into BambooHR and click their name in the upper right-hand corner of the BambooHR console. Select "API Keys" from the list.

![A screenshot showing where to find the "API Keys" option in the BambooHR Dashboard.](https://images.workoscdn.com/images/6165e109-527d-4960-adc2-b7882262e526.png?auto=format\&fit=clip\&q=80)

Next, the IT contact should click "Add New Key".

![A screenshot showing where to find the "Add New Key" in the BambooHR Dashboard.](https://images.workoscdn.com/images/eb6b50be-6a2c-478b-aa3f-0d7b69240ddd.png?auto=format\&fit=clip\&q=80)

Give your key a descriptive name and select "Generate Key."

![A screenshot showing where to find "Generate Key" in the BambooHR Dashboard.](https://images.workoscdn.com/images/a176f1f3-10a0-4803-acd2-fbbe69fb9719.png?auto=format\&fit=clip\&q=80)

Select "Copy Key" and save this API key, which you'll upload in the next step.

![A screenshot showing where to find "Copy Key" in the BambooHR Dashboard.](https://images.workoscdn.com/images/69c5bff2-023f-4a1e-8cdf-48edc4609a29.png?auto=format\&fit=clip\&q=80)

***

## (3) Set up your Directory Sync Connection

Click "Update Directory".

There are two fields to enter, one is the API key you created in step 2.

The other is "Subdomain" which is the subdomain name of the Company's BambooHR instance.

![A screenshot showing where to find the "Update Directory" button in the WorkOS Dashboard.](https://images.workoscdn.com/images/f562e95e-faf9-4658-ac27-1d1396abcccb.png?auto=format\&fit=clip\&q=50)

***

## (4) Sync Users and Groups to Your Application

When the connection is successfully made, you will see the green "Linked" icon appear. Now, whenever your customer assigns users or groups to your application, you'll receive Dashboard updates based on changes in their directory.

A detailed guide to integrate the WorkOS API with your application can be found [here](https://workos.com/docs/directory-sync)

## Frequently Asked Questions

### How do I add BambooHR's custom fields?

For BambooHR's custom fields, please contact [support@workos.com](mailto:support@workos.com) with your directory ID and a list of the custom fields you would like to be added.

### How often do BambooHR directories perform a sync?

BambooHR directories poll every 30 minutes starting from the time of the initial sync.
