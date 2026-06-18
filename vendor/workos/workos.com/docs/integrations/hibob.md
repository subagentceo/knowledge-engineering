# HiBob

## Introduction

This guide outlines how to synchronize your application's HiBob directories.

To synchronize an organization's users and groups provisioned for your application, you'll need the enterprise IT contacts to provide you:

- A HiBob Service User ID.
- The HiBob Service User's Token.

We will provide instructions below on the process in HiBob to create a Service User and collect those parameters.

> Note: The HiBob integration isn't enabled by default in the WorkOS Dashboard or Admin Portal. Please reach out to [support@workos.com](mailto:support@workos.com) or via your team's WorkOS Slack channel if you would like HiBob enabled.

***

## (1) Set up your Directory

Login to your WorkOS dashboard and select "Organizations" from the left hand Navigation bar

Select the Organization you'd like to enable a HiBob Directory Sync connection for.

On the Organization's page click "Manually Configure Directory".

![A screenshot highlighting the "Manually Configure Directory" button in the Organization view of the WorkOS Dashboard.](https://images.workoscdn.com/images/66f8d2e8-6337-4e67-97cf-1fcf9ae0a8cb.png?auto=format\&fit=clip\&q=50)

You'll be prompted to select "HiBob" from the "Directory Type Dropdown", as well as enter the name of the directory.

Then click "Create Directory".

![A screenshot highlighting the "Create Directory" modal for creating a HiBob directory in the WorkOS Dashboard.](https://images.workoscdn.com/images/0b8c4bdb-e745-4285-a208-3463631766c0.png?auto=format\&fit=clip\&q=50)

WorkOS will create a Directory Sync Connection where you will input a "Service User ID" and an "API Token". The next step will walk you through how an organization's IT contact can generate and gather these details.

![A screenshot highlighting the "Update Directory" button in a HiBob directory in the WorkOS Dashboard.](https://images.workoscdn.com/images/f47caea6-5218-4957-b8a1-3c3512ec52f0.png?auto=format\&fit=clip\&q=50)

***

## (2) Create a Service User in HiBob

HiBob uses a system called Service Users to utilize API actions. These steps walkthrough creating a Service User and obtaining the credentials needed by WorkOS to link with HiBob successfully.

Login to HiBob and navigate to "Settings" and then selecting the "Integrations" tab.

There will be a tile called Service Users, click on that.

![A screenshot highlighting the "Integrations" tab in the HiBob dashboard.](https://images.workoscdn.com/images/e240994a-4968-40ce-a75b-e3951ce0ac81.png?auto=format\&fit=clip\&q=50)

Press on the New Service user Button

The user will be prompted to enter a name (and display name, these can be the same) for the new service user, we recommend something like "WorkOS SCIM User".

![A screenshot showing the "Create a new Service User" modal in the HiBob dashboard.](https://images.workoscdn.com/images/03b23b02-f8d2-4b33-b7f3-02db9dfaee15.png?auto=format\&fit=clip\&q=50)

HiBob will then present you with an ID and a Token, which will be populated into WorkOS, so make sure to inform the customer to provide these.

![A screenshot highlighting the "ID" and "Token" fields for a Service User in the HiBob dashboard.](https://images.workoscdn.com/images/81d6408a-0f04-4486-8864-cf9c08928d86.png?auto=format\&fit=clip\&q=50\&w=2048)

> **Important:** Service users have no permissions by default. Enterprise IT contacts must create a permission group and assign specific permissions to the service user.

To set up permissions for the service user:

1. In HiBob, create a permission group for the service user (see [HiBob's guide on creating permission groups](https://apidocs.hibob.com/docs/api-service-users#step-2-creating-a-permission-group))
2. Under the **People's data** tab in the permission group, enable the following permissions:
   - **View all employees' Root sections** (required for basic employee data: id, email, first name, last name)
   - **View all employees' Work sections** (required for title, department, site, start date, manager information)
   - **View all employees' About sections** (standard employee information)
   - **View all employees' Employment sections** (employment details)
3. Under **Access Rights**, set the permission group to **"Everyone"** to sync all active employees. To include inactive employees, use "Select by condition" and remove the "Lifecycle status equals Employed" filter
4. Assign the service user to this permission group

For more details on setting permissions, see [HiBob's permission documentation](https://apidocs.hibob.com/docs/api-service-users#step-3-set-permissions).

***

## (3) Input the HiBob Service User details in WorkOS

Back in the connection that was created in your WorkOS dashboard, enter these two fields and press "Save Directory Details."

![A screenshot highlighting the Directory Details modal of a HiBob directory in the WorkOS Dashboard.](https://images.workoscdn.com/images/8bd8dd85-864f-4712-98ac-788821b3b705.png?auto=format\&fit=clip\&q=50)

You should see the connection now displays "Linked" in green.

***

## (4) View users and groups in your dashboard

You will now see updates to the users in the directory under the "Users" tab in the HiBob Directory Sync page in WorkOS.

![A screenshot showing the "Users" view of a HiBob directory in the WorkOS Dashboard.](https://images.workoscdn.com/images/8474708e-dd99-472e-aba4-337c8463551d.png?auto=format\&fit=clip\&q=50)

***

## Frequently asked questions

### What if the directory user profiles from HiBob aren't showing all of the expected user attributes, such as the user address?

If some user attributes are not being sent along in the profile, you'll want to start by checking the permissions of the Service User you created in step 2. You can see more about accessing Service User permissions [here](https://apidocs.hibob.com/docs/api-service-users) and some relevant FAQs from HiBob [here](https://help.hibob.com/hc/en-us/articles/4409776408209#how-to-review-permission-group-changes-0-4).

### How often do HiBob directories perform a sync?

HiBob directories poll every 30 minutes starting from the time of the initial sync.
