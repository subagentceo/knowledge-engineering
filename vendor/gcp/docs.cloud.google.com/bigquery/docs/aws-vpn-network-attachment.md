# Set up the AWS-Google Cloud VPN and network attachment

*   Home
*   Documentation
*   Data analytics
*   BigQuery
*   Guides

Send feedback Stay organized with collections Save and categorize content based on your preferences.

# Set up the AWS-Google Cloud VPN and network attachment

This document provides detailed steps for setting up a VPN connection between Amazon Web Services (AWS) and Google Cloud. The goal is to establish a reliable and security-enhanced connection between the two cloud environments.

## Before you begin

Ensure that you have the following:

*   Access to AWS and Google Cloud accounts with appropriate permissions.
*   Existing Virtual Private Clouds in both AWS and Google Cloud.

## Set up networking on AWS

1.  Create a virtual private gateway that is attached to the VPC where your database is deployed. For detailed instructions, see Create an AWS Direct Connect virtual private gateway in the AWS documentation.
2.  Create a customer gateway using the public IP address of your Google Cloud VPN gateway. For detailed instructions, see Create a customer gateway in the AWS documentation.
3.  Create the VPN connection using the virtual private gateway and customer gateway that you created earlier. For detailed instructions, see Get started with AWS Client VPN and How do I establish an encrypted connection over an AWS Direct Connect connection? in the AWS documentation.
4.  Add routes to direct traffic to the Google Cloud IP ranges using the VPN connection. For detailed instructions, see Configure route tables and Configure routing in the AWS documentation.

## Set up networking on Google Cloud

The setup on Google Cloud requires creating the VPN gateway and VPN tunnels, configuring the routes, and creating the Google Cloud network attachment.

### Create the VPN gateway

**Note:** The following steps describe how to create a Classic VPN. You can create a high-availability (HA) VPN instead if it fits your use case. For more information, see Create an HA VPN gateway to a peer VPN gateway.

1.  In the Google Cloud console, go to the **Cloud VPN gateways** page.
    
    Go to Cloud VPN gateways
    
2.  Click **Create VPN gateway**.
    
3.  Select the **Classic VPN** option button.
    
4.  Provide a VPN gateway name.
    
5.  Select an existing VPC network in which to create the VPN gateway and tunnel.
    
6.  Select the region.
    
7.  For **IP address**, create or choose an existing regional external IP address.
    
8.  Provide a tunnel name.
    
9.  For **Remote peer IP address**, enter the AWS VPN gateway public IP address.
    
10.  Specify options for **IKE version** and **IKE pre-shared key**.
     
11.  Specify the routing options as required to direct traffic to the AWS IP ranges.
     
12.  Click **Create**.
     

For more information, see Create a gateway and tunnel.

### Create the network attachment

1.  In the Google Cloud console, go to the **Network attachments** page.
    
    Go to Network attachments
    
2.  Click add **Create network attachment**.
    
3.  Provide a name for the network attachment.
    
4.  For **Network**, select the appropriate VPC network.
    
5.  For **Region**, choose where your VPN gateway is located.
    
6.  For **Subnetwork**, select the VPN tunnel that you created earlier.
    
7.  Click **Create network attachment**.
    

For more information, see Create network attachments.

## Test the VPN connection

1.  Deploy the instances in both the AWS and Google Cloud VPC environments.
2.  To verify connectivity, attempt to ping or connect to instances across the VPN.
3.  Ensure the security groups and firewall rules allow for traffic through the VPN.

## Troubleshoot

If you are having issues setting up your network attachment, do the following:

*   Ensure the VPN connections are up and running in both the AWS and Google Cloud consoles.
*   Check the VPN logs for errors or dropped packets.
*   Verify that the routing tables in both AWS and Google Cloud are correctly configured.
*   Ensure that the necessary ports are open in both the AWS security groups and the Google Cloud firewall rules.

Send feedback