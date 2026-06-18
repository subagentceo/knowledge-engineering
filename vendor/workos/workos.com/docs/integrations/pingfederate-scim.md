# PingFederate SCIM

## Introduction

The PingFederate SCIM Connector can be used to enable a directory sync connection with WorkOS. Follow the steps below to set up this integration.

To synchronize an organization's users and groups provisioned for your application, you'll need two pieces of information:

- An [Endpoint](https://workos.com/docs/glossary/endpoint) that PingFederate will make requests to
- A [Bearer Token](https://workos.com/docs/glossary/bearer-token) for PingFederate to authenticate it's endpoint requests

After completing step 1 below, both of these are available in your Endpoint's Settings in the [WorkOS Dashboard](https://dashboard.workos.com/).

> The rest of the steps after the first will need to be carried out by the organization when configuring your application in their PingFederate instance.

***

## (1) Set up your directory in the WorkOS Dashboard

Login to your WorkOS Dashboard and select "Organizations" from the left hand navigation bar.

Select the organization you'll be configuring a new Directory Sync with.

Click "Add Directory".

![A screenshot showing where to add a directory in the WorkOS dashboard.](https://images.workoscdn.com/images/1bb63451-a696-4f69-9707-fa46e0b17f36.png?auto=format\&fit=clip\&q=50)

Select "PingFederate" from the dropdown, and give the connection a descriptive name. Click "Create Directory".

![A screenshot showing where to select PingFederate SCIM v2.0 as the Directory Provider in the WorkOS dashboard.](https://images.workoscdn.com/images/8809c25e-da19-4cca-8947-b92a4105e67c.png?auto=format\&fit=clip\&q=50)

Save the Endpoint and Bearer Token, you'll need those in the next section when you configure the SCIM Connector application in PingFederate.

![A screenshot showing where to locate the Endpoint and Bearer Token in the WorkOS dashboard.](https://images.workoscdn.com/images/5de04f00-938d-4b1e-bced-fa342cdb1f6c.png?auto=format\&fit=clip\&q=50)

> We have support for custom labeled URLs for Directory Sync endpoints. [Contact us](mailto:support@workos.com) for more info!

***

## (2) Install the SCIM Connector in PingFederate

This step will take place in PingFederate. First, download and install the SCIM Connector [following the setup guide from PingFederate](https://docs.pingidentity.com/bundle/pingfederate-scim-connector/page/ulk1563995050657.html).

Next, deploy the SCIM Connector files to your PingFederate directory following [the provider's documentation](https://docs.pingidentity.com/bundle/pingfederate-scim-connector/page/dcn1563995073633.html).

Finally, enable provisioning in PingFederate using [the documentation from PingFederate](https://docs.pingidentity.com/r/en-us/pingfederate-112/help_spconnectionconfigtasklet_saasprovisioningstate).

Once that setup has been completed, continue on to step 3.

***

## (3) Select or create your PingFederate SCIM Connector Application

Log in as an admin to your PingFederate instance, and select "Applications" → "SP Connections".

![A screenshot showing where to locate the SP Connections area in PingFederate.](https://images.workoscdn.com/images/a3c7e38f-7184-460e-8405-9d9f7c7883df.png?auto=format\&fit=clip\&q=50)

Select "Create Connection".

![A screenshot showing where to create a connection in PingFederate.](https://images.workoscdn.com/images/a5f103e4-f3b5-4808-ac9f-22ad33b3dc35.png?auto=format\&fit=clip\&q=50)

On the Connection Template page, select "Use a Template for this Connection" and then select "SCIM Connector" from the dropdown list. If you don't see the SCIM Connector option, go back to the [Install SCIM Connector in PingFederate step](https://workos.com/docs/integrations/pingfederate-scim/2-install-the-scim-connector-in-pingfederate). Click "Next".

![A screenshot showing how to select the SCIM Connector template in PingFederate.](https://images.workoscdn.com/images/f3f55f2e-6a1c-4727-9c15-5e76abe9dfe7.png?auto=format\&fit=clip\&q=50)

On the Connection Type page, make sure Outbound Provisioning is checked with the SCIM Connector Type. Click "Next".

![A screenshot showing where to configure outbound provisioning in PingFederate.](https://images.workoscdn.com/images/68968637-291d-472b-84fa-eb095ddcf13f.png?auto=format\&fit=clip\&q=50)

On the General Info page, give this connection a descriptive name, and click "Next".

![A screenshot showing where to give the connection a name in PingFederate.](https://images.workoscdn.com/images/08096d8a-ad68-4682-bbb8-9449b9e57780.png?auto=format\&fit=clip\&q=50)

***

## (4) Configure Outbound Provisioning for your PingFederate application

On the Outbound Provisioning page, select the "Configure Provisioning" button.

![A screenshot showing where to click "Configure Provisioning" in PingFederate.](https://images.workoscdn.com/images/c390a6e3-bf41-4507-8b31-7d0798cfbbb1.png?auto=format\&fit=clip\&q=50)

On the Target page, paste in the Endpoint from your WorkOS Directory Sync Connection in the SCIM URL field. Make sure SCIM Version is set as `2.0` and the Authentication Method is set as `OAuth 2 Bearer Token`. Paste in the Bearer Token from your WorkOS Directory Sync Connection in the Access Token field. Select "Next".

![A screenshot showing where to input provisioning settings in PingFederate.](https://images.workoscdn.com/images/8c8fdbb5-5ebe-4a40-90b8-8c5820ba2eac.png?auto=format\&fit=clip\&q=50)

On the Manage Channels page, select "Create".

![A screenshot showing where to create a channel in PingFederate.](https://images.workoscdn.com/images/a38da71d-4d75-4a43-a1a8-859988ad5cac.png?auto=format\&fit=clip\&q=50)

On the Channel Info page, add a descriptive name and click "Next".

![A screenshot showing where to configure the channel name in PingFederate.](https://images.workoscdn.com/images/18896d5c-4499-4f1b-a989-be530b0a3dda.png?auto=format\&fit=clip\&q=50)

Select an "Active Data Store" from the dropdown menu. In this example, This example uses a PingDirectory LDAP instance, but this may be different depending on the type of data store used in each case. Please refer to the [PingFederate documentation](https://docs.pingidentity.com/bundle/pingfederate-103/page/vbe1564003005413.html) for specific settings on your type of data store. Click "Next".

![A screenshot showing where to configure the channel source in PingFederate.](https://images.workoscdn.com/images/b7c8af75-69e0-49dd-a094-1ef29c005043.png?auto=format\&fit=clip\&q=50)

On the Source Settings page, make any modifications needed for your data store. In this example, the default values for the LDAP data store did not need to be modified, so the default settings were used. After configuring the source settings specific to your use case, click "Next" to go to the Source Location page.

![A screenshot showing where to configure the source settings in PingFederate.](https://images.workoscdn.com/images/dc7af973-ceae-449a-831e-f9dd9065a719.png?auto=format\&fit=clip\&q=50)

On the Source Location page, input a Base DN and either a Group DB or Filter for the Users. This tells your application where to look for the users to sync from your active data store. The setup used in each case may be different depending on the type of data store being used and which users and groups are to be provisioned. Please reference [PingFederate documentation](https://docs.pingidentity.com/bundle/pingfederate-103/page/jqa1564003005539.html) for specific steps. When this is complete, click "Next".

![A screenshot showing where to configure the source location in PingFederate.](https://images.workoscdn.com/images/fa42db05-c78f-459c-ba6b-49ca4df104bd.png?auto=format\&fit=clip\&q=50)

***

## (5) Configure attribute mapping in PingFederate

On the Attribute Mapping page, configure the mapping of attributes in the data store to the SCIM attributes. The exact configuration will depend on the specific setup in each unique situation. For this PingDirectory LDAP example, the default settings are used. When finished, Click "Next".

![A screenshot showing where to configure attribute mapping in PingFederate.](https://images.workoscdn.com/images/081f7d7c-b0fa-4595-adbf-ca6d0270bf8e.png?auto=format\&fit=clip\&q=50)

On the Activation & Summary page, check that the settings are complete, then toggle the "Channel Status" to "Active" and select "Done".

![A screenshot showing where to check the settings and set the channel status to active in PingFederate.](https://images.workoscdn.com/images/36d37973-301d-4b36-b408-8e5dd16cc6ec.png?auto=format\&fit=clip\&q=50)

You are directed back to the Manage Channels page, where you can select "Done".

![A screenshot showing where to finish the channel setup in PingFederate.](https://images.workoscdn.com/images/67eabbed-36f4-4e95-8312-210f2cb24b65.png?auto=format\&fit=clip\&q=50)

You're then directed to the Outbound Provisioning page, where you can select "Next".

![A screenshot showing where to finish the outbound provisioning setup in PingFederate.](https://images.workoscdn.com/images/8a60ece6-4ac2-4db9-993e-4aa70ac912c8.png?auto=format\&fit=clip\&q=50)

***

## (6) Activate the SP Connection in PingFederate

On the Activation & Summary page, turn on provisioning with the toggle at the top, and then select "Save".

![A screenshot showing where to activate the PingFederate app.](https://images.workoscdn.com/images/cc0c979a-1444-4e8b-bd7e-925d3a834333.png?auto=format\&fit=clip\&q=50)

You'll now see your SCIM application listed in the SP Connections page.

![A screenshot showing where to view the completed app in PingFederate.](https://images.workoscdn.com/images/88f2b484-d308-45ac-8e5f-64239a40e2be.png?auto=format\&fit=clip\&q=50)

The provisioning will automatically begin when the connection is activated through outbound requests from Ping Federate. It may take a few minutes for this process to start. Once it is synced, you'll see a Linked status in the Directory settings in the WorkOS Dashboard.

![A screenshot showing a linked PingFederate SCIM connection in the WorkOS dashboard.](https://images.workoscdn.com/images/70241625-42f1-4a02-ba0e-5fe9f4e843eb.png?auto=format\&fit=clip\&q=50)

A detailed guide to integrate the WorkOS API with your application can be found [here](https://workos.com/docs/directory-sync)
