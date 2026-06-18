# Rippling SCIM

import { DocsAccordionHydrator } from "../../../components/docs-accordion-hydrator";
import { DocsAccordion } from "../../../components/docs-accordion";

## Introduction

This guide outlines how to synchronize your application's Rippling directories using SCIM.

To synchronize an organization's users and groups provisioned for your application, you'll need to provide the organization with two pieces of information:

- An [Endpoint](https://workos.com/docs/glossary/endpoint) that Rippling will make requests to.
- A [Bearer Token](https://workos.com/docs/glossary/bearer-token) for Rippling to authenticate its endpoint requests.

Both of these are available in your Endpoint's Settings in the [WorkOS Dashboard](https://dashboard.workos.com).

> Steps 2, 3, and 4 below will need to be carried out by the organization when configuring your application in their Rippling instance.

***

## (1) Set up your Directory Sync endpoint

Login to your WorkOS Dashboard and select "Organizations" from the left hand navigation bar.

Select the organization you'll be configuring a new Directory Sync for.

Under "Actions" click "Add Directory".

![A screenshot showing where to click "Add Directory" in the WorkOS dashboard.](https://images.workoscdn.com/images/0f13d97a-b2a8-4263-ad11-e8e7633f3ae5.png?auto=format\&fit=clip\&q=50)

Select "Rippling" from the dropdown, and enter the organization name.

Then, click "Create Directory."

![A screenshot showing where to name and create a Rippling Directory in the WorkOS dashboard.](https://images.workoscdn.com/images/83cd8619-6ccd-4d49-9a69-5c0cd04dd8d6.png?auto=format\&fit=clip\&q=50)

Your Rippling directory sync has now been created successfully with an Endpoint and Bearer Token.

![A screenshot showing where to locate the Rippling directory details in the WorkOS dashboard.](https://images.workoscdn.com/images/98b1e1f1-b601-4df0-97bc-cfa824a7559e.png?auto=format\&fit=clip\&q=50)

> We have support for custom URLs for Directory Sync endpoints. [Contact us](mailto:support@workos.com) for more info!

***

## (2) Create your Rippling application

Log in to the Rippling admin dashboard and select the "Custom App" option in the menu under the "Identity Management" category.

![A screenshot showing where to select the "Custom App" option in the "Identity Management" menu in Rippling.](https://images.workoscdn.com/images/2851bbb9-a486-4e51-90c1-6265959cb336.png?auto=format\&fit=clip\&q=50)

Select "Create New App" in the Custom App page.

![A screenshot showing where to select "Create New App" in Rippling.](https://images.workoscdn.com/images/bd2b1fba-2433-4fc2-b20b-7a0ca712dd20.png?auto=format\&fit=clip\&q=50)

Fill out the application's name, select categories, upload an image for the logo, and check the "User Management via SCIM" box. Click "Continue" and the next page will populate more option fields regarding SCIM setup.

![A screenshot showing where to fill in the name, categories, logo, and type of custom app in Rippling.](https://images.workoscdn.com/images/74bf5e11-239e-4cf4-b3ce-af819d3c7b95.png?auto=format\&fit=clip\&q=50)

## (3) Configure your integration

Set the SCIM version to 2.0.

Fill in the endpoint into the "SCIM Base URL" field.

![A screenshot showing where to set the SCIM version and "SCIM Base URL" in Rippling.](https://images.workoscdn.com/images/a4fce113-4383-42b4-9d46-eac1e2ec6941.png?auto=format\&fit=clip\&q=50)

Set the SCIM authorization method to "Bearer Token" in the "SCIM Authorization Method" dropdown list. Check off features for groups, pagination, delete groups and PATCH groups.

![A screenshot showing the SCIM authorization method and configuration options in Rippling.](https://images.workoscdn.com/images/9c9c19cc-0836-4aa9-90e0-fb42d751594b.png?auto=format\&fit=clip\&q=50)

Add SCIM attributes `externalId`, `emails.primary`, `name.givenName`, `name.familyName` to the "Supported SCIM Attributes" input box. If you have additional custom attributes, add the appropriate corresponding Rippling values of the custom attributes. Click "Continue" to move to the next step.

![A screenshot showing the "Supported SCIM Attributes" field in Rippling.](https://images.workoscdn.com/images/566a60cf-044e-423e-b1ee-d1cbee96440b.png?auto=format\&fit=clip\&q=50)

Rippling will then prompt you to install the app. Click "Install now" and proceed through the next step. Then, copy and paste the Bearer Token into the "Bearer Token" field and click "Continue".

![A screenshot showing where to enter the Bearer Token in Rippling.](https://images.workoscdn.com/images/bb2ce893-3c9e-4d97-a7f8-4e0bb7128843.png?auto=format\&fit=clip\&q=50)

## (4) Assign users and groups to your application

After entering the Bearer Token, the following two pages "App Access Rules" and "Provision Time", can be filled out by your own preference. You should then arrive at the "Account Matching" page.

In order for your users and groups to be synced, you will need to assign them to your Rippling Application. Match the Rippling users to the account, or create a new application account for the user(s).

![A screenshot showing where to match Rippling users to an account in Rippling.](https://images.workoscdn.com/images/c95d76d4-721a-4626-9ee7-6e33c124bf91.png?auto=format\&fit=clip\&q=50)

Create groups for the application as needed.

![A screenshot showing where to create a group in Rippling.](https://images.workoscdn.com/images/49677af7-9dce-48cb-b32b-94df728644f0.png?auto=format\&fit=clip\&q=50)

Name the group.

![A screenshot showing where to name a group in Rippling.](https://images.workoscdn.com/images/073ca80c-42c2-4f65-abd2-50e8af89dd2b.png?auto=format\&fit=clip\&q=50)

Assign Rippling users/groups to the newly created application group.

![A screenshot showing where to assign users and groups to a newly created application in Rippling.](https://images.workoscdn.com/images/aa94731f-f5c3-4517-818f-383a64924dc3.png?auto=format\&fit=clip\&q=50)

Make sure all attributes previously added are enabled, and that their cadence is set to "On user creation and updates". Then, click "Save" and "Continue" to finish setup.

![A screenshot showing where to ensure that all attributes are enabled in Rippling.](https://images.workoscdn.com/images/aa067d8d-b62f-459d-b640-e577a2050b67.png?auto=format\&fit=clip\&q=50)

In your WorkOS dashboard, you should now see the users and groups synced over.

![A screenshot showing a successfully synced user from Rippling in the WorkOS dashboard.](https://images.workoscdn.com/images/c38e1ba8-90e3-4cf0-a008-443f8c77f6a2.png?auto=format\&fit=clip\&q=50)

A detailed guide to integrate the WorkOS API with your application can be found [here](https://workos.com/docs/directory-sync)

## Frequently asked questions

### Can I add additional custom fields to this SCIM integration?

Yes, however Rippling allows only a limited set of custom fields in SCIM applications.

<DocsAccordion.Header as="h4">Available custom fields</DocsAccordion.Header>

- `addresses.home.country`
- `addresses.home.formatted`
- `addresses.home.locality`
- `addresses.home.postalCode`
- `addresses.home.region`
- `addresses.home.streetAddress`
- `addresses.work.country`
- `addresses.work.formatted`
- `addresses.work.locality`
- `addresses.work.postalCode`
- `addresses.work.region`
- `addresses.work.streetAddress`
- `department`
- `displayName`
- `emails.primary`
- `employeeNumber`
- `externalId`
- `manager.displayName`
- `manager.email`
- `manager.managerId`
- `name.familyName`
- `name.formatted`
- `name.givenName`
- `phoneNumbers.mobile`
- `phoneNumbers.work`
- `photos.photo`
- `title`
- `userType`
