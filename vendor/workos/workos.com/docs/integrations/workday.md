# Workday

## Introduction

This guide outlines how to synchronize your application's Workday directories.

To synchronize an organization's users and groups provisioned for your application, you'll need the following information from the organization:

- The Workday Custom Report JSON endpoint
- The Workday Custom Group Report JSON endpoint
- Username for accessing the Custom Report endpoint
- Password for accessing the Custom Report endpoint

> Note: The Workday integration isn't enabled by default in the WorkOS Dashboard or Admin Portal. Please reach out to [support@workos.com](mailto:support@workos.com) or via your team's WorkOS Slack channel if you would like Workday enabled.

***

## (1) Create an Integration System User

It's recommended that the organization creates an Integration System User within Workday. The Integration System User will be used to access Custom Reports.

![A screenshot of the "Create Integration System User" form in the Workday Dashboard.](https://images.workoscdn.com/images/24b0561d-cd74-46a1-939e-3c76ead90c89.png?auto=format\&fit=clip\&q=50)

> If you've finished the setup, and everything works as expected but fields are missing from the Report, ensure that the user created has access to access to the fields.

![A screenshot showing user access to a report in the Workday Dashboard.](https://images.workoscdn.com/images/7e3e33f1-3724-4ff9-a4b6-ad2ac475ccb3.png?auto=format\&fit=clip\&q=50)

***

## (2) Create a Security Group

Create a new security group in Workday. Set the Type of Tenanted Security Group to Integration System Security Group (Unconstrained). Then add a name for the Security Group and select OK.

![A screenshot showing the "Create Security Group" form in the Workday Dashboard.](https://images.workoscdn.com/images/5e24e9d0-fba3-4e1d-8782-67c6491b3652.png?auto=format\&fit=clip\&q=50)

Next, for Integration System Users, add the integration system user you created in the previous step, and select OK.

![A screenshot showing where to add the Integration System User in the Workday Dashboard.](https://images.workoscdn.com/images/5483b3eb-3995-48b6-8718-a4eb07ccf681.png?auto=format\&fit=clip\&q=50)

***

## (3) Add domain security policies to the Security Group

Next, you'll need to add domain security policies to the newly created security group. You can access this on the Security Group Settings → Maintain Domain Permissions for Security Group page.

![A screenshot showing where to find the "Maintain Domain Permissions for Security Group" option in the Workday Dashboard.](https://images.workoscdn.com/images/592f1450-d6d4-4a47-adef-6d1ce9007f4a.png?auto=format\&fit=clip\&q=50\&w=2048)

You'll need to permit the following domain security policies to have "Get" access under Integration Permissions:

- Person Data: Work Contact Information
- Workday Accounts
- Worker Data: Active and Terminated Workers
- Worker Data: All Positions
- Worker Data: Business Title on Worker Profile
- Worker Data: Current Staffing Information
- Worker Data: Public Worker Reports
- Worker Data: Workers

![A screenshot showing Integration Permissions in the Workday Dashboard.](https://images.workoscdn.com/images/32f4bae2-9ef0-4a7b-a27e-6c28268298d6.png?auto=format\&fit=clip\&q=50)

To activate these new security settings, you need to go to the Activate Pending Security Policy Changes page and click OK.

![A screenshot showing the Activate Pending Security Policy Changes page in the Workday Dashboard.](https://images.workoscdn.com/images/2c708837-b39d-454f-90b0-acfe377d4ad5.png?auto=format\&fit=clip\&q=50)

Then, select the Confirm checkbox to finish activating.

![A screenshot showing where to confirm the Active Pending Security Policy Changes in the Workday Dashboard.](https://images.workoscdn.com/images/664f3905-d9e6-4390-b210-1e7eaffa25c2.png?auto=format\&fit=clip\&q=50)

***

## (4) Create and Populate Custom Reports

You will need to create two Custom Reports. The first Custom Report will be used for syncing User information. The second report will be used for syncing Group information.

When creating the report, make sure to select the Advanced report type and to have the Enable as Web Service box checked.

![A screenshot showing the "Create Custom Report" page in the Workday Dashboard.](https://images.workoscdn.com/images/8fa8ffb7-e377-4289-a130-3719646dea8a.png?auto=format\&fit=clip\&q=50)

You need to add information for certain fields to the report. You can do this by directly adding columns to the report for the attributes in Workday with column heading names specified as follows:

| Field | Status | Description |
| --- | --- | --- |
| `employee_id` | Required | A unique ID representing the user |
| `first_name` | Required | The first name of the user |
| `last_name` | Required | The last name of the user |
| `primary_work_email` | Required | The primary work email for the user |
| `user_name` | Optional | A unique human readable user name |
| `job_title` | Optional | The job title of the user |
| `group_name` | Optional | The name of the primary group the user belongs to |
| `employee_type` | Optional | The type of employee |
| `employment_start_date` | Optional | The date the user started working |
| `display_name` | Optional | The display name of the user |
| `department_name` | Optional | The name of the department the user belongs to |
| `manager_name` | Optional | The name of the user's manager |
| `manager_email` | Optional | The email of the user's manager |
| `manager_id` | Optional | The identifier of the user's manager from the directory provider |
| `division_name` | Optional | The name of the division the user belongs to |
| `cost_center_name` | Optional | The name of the cost center the user belongs to |
| `work_address_street` | Optional | Work street address |
| `work_address_locality` | Optional | Work city |
| `work_address_region` | Optional | Work state |
| `work_address_postal_code` | Optional | Work postal/zip code |
| `work_address_country` | Optional | Work country |

![A screenshot showing an example of Custom User Report in the Workday Dashboard.](https://images.workoscdn.com/images/d3d4bb22-b4c8-467a-a3b4-bd0e6b4d2aea.png?auto=format\&fit=clip\&q=50)
Along the same lines as the User Report, WorkOS looks for the following information in the Group Report:

| Field | Status | Description |
| --- | --- | --- |
| `group_name` | Required | The name of the group. |

***

## (5) Add an authorized user

If an Integration System User was created, the organization will want to have that user added as an authorized user. This can be found under the **Share** tab from within a Report.

![A screenshot showing the "Share" tab in the Workday Dashboard.](https://images.workoscdn.com/images/8794da9c-89ca-4b84-842b-3f3fe6648d39.png?auto=format\&fit=clip\&q=50)

***

## (6) Get the RaaS endpoint

Now that the Report itself is setup and access to it had been configured, the organization will need to get the RaaS endpoint. The page with the endpoints can be found under **Actions → Web Service → View URLs**.

![A screenshot showing where to find the view URLs option in the Workday Dashboard.](https://images.workoscdn.com/images/d212438c-951b-464f-aa42-2bebd0e2bdf2.png?auto=format\&fit=clip\&q=50)

Once on the URLs page, the one that WorkOS will need is listed under the **JSON** section.

![A screenshot showing the View URLs Web Service page in the Workday Dashboard.](https://images.workoscdn.com/images/8698f25c-22bc-48ee-82c7-5fa885b20215.png?auto=format\&fit=clip\&q=50)

***

## (7) Create your Directory Sync Connection

Login to your WorkOS Dashboard and select "Organizations" from the left hand navigation bar.

Select the organization you'll be configuring a new Directory Sync Connection with.

Click "Add Directory".

![A screenshot showing where to find the "Add Directory" button in the WorkOS Dashboard.](https://images.workoscdn.com/images/6244ae58-85a4-4c14-b6c0-c12bca04408e.png?auto=format\&fit=clip\&q=50)

Select "Workday" as the directory type, and then input the Company Name.

Click the "Create Directory" button.

![A screenshot showing the "Create Directory" button in the WorkOS Dashboard.](https://images.workoscdn.com/images/27e9b01f-52e6-433b-af33-38eb3961dc70.png?auto=format\&fit=clip\&q=50)

***

## (8) Setup your Directory Sync Connection

Click "Update Directory" to input the organization's Custom Report JSON endpoints, username and password.

![A screenshot showing where to find the "Update Directory" button in the WorkOS Dashboard.](https://images.workoscdn.com/images/0c51f74e-8705-4193-93db-126a61bb367c.png?auto=format\&fit=clip\&q=50)

Then, click "Save Directory Details".

***

## (9) View users and groups in your dashboard

Now, whenever the organization assigns users or groups to your application, you'll receive Dashboard updates based on changes in their directory.

A detailed guide to integrate the WorkOS API with your application can be found [here](https://workos.com/docs/directory-sync)

## Frequently asked questions

### How often does the Workday directory perform a sync?

The Workday directory polls in every 30 minutes starting from the time of the initial sync.
