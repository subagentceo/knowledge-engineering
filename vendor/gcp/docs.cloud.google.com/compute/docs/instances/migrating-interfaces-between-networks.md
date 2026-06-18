# Migrating a VM between networks

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   Guides

Send feedback

# Migrating a VM between networks Stay organized with collections Save and categorize content based on your preferences.

This page describes how to migrate a VM instance from one network to another. In the case of a VM that is connected to more than one network using multiple network interfaces, this process updates one of the interfaces and leaves the rest in place.

The following migrations are supported:

*   From legacy network to a VPC network in the same project
*   From one VPC network to another VPC network in the same project
*   From one subnet of a VPC network to another subnet of the same network
*   From a service project network to the shared network of a Shared VPC host project

In all cases, the VM stays in the region and zone where it was before. Only the attached network changes.

## Before you begin

*   Read the Virtual Private Cloud documentation.
*   If you haven't already, set up authentication. Authentication verifies your identity for access to Google Cloud services and APIs. To run code or samples from a local development environment, you can authenticate to Compute Engine by selecting one of the following options:
    
    Select the tab for how you plan to use the samples on this page:
    
    ### Console
    
    When you use the Google Cloud console to access Google Cloud services and APIs, you don't need to set up authentication.
    
    ### gcloud
    
    1.  Install the Google Cloud CLI. After installation, initialize the Google Cloud CLI by running the following command:
        
        gcloud init
        
        If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
        
        **Note:** If you installed the gcloud CLI previously, make sure you have the latest version by running `gcloud components update`.
        
    2.  Set a default region and zone.
    
    ### REST
    
    To use the REST API samples on this page in a local development environment, you use the credentials you provide to the gcloud CLI.
    
    Install the Google Cloud CLI.
    
    If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
    
    For more information, see Authenticate for using REST in the Google Cloud authentication documentation.
    

## Requirements

Before you migrate a VM, it must meet the following requirements:

*   The VM uses only IPv4 addresses.
*   The VM must be stopped. To ensure that the guest OS in the VM can cleanly shut down before the stop operation completes, you can optionally enable graceful shutdown in the VM.
*   The VM mustn't be part of an instance group or a network endpoint group (NEG). The following conditions apply:
    *   If the VM is part of an unmanaged instance group or NEG, then you must remove the VM from the group before migrating it.
    *   If the VM is part of a managed instance group (MIG), then the VM can't be migrated. Instead, create a new MIG using an instance template with different VM properties.
    *   You can move instances in target pools without removing them first. The target pool expands to cover both networks.

## Limitations

*   You cannot migrate a VM interface to a legacy network.
*   The MAC address allocated to the network interface will change during the migration. This could have an impact on services tightly coupled with MAC addresses such as third-party license agreement.
*   If you are migrating the VM to a network or subnet with a different IP range, the internal IP address of your instance must change. If you are migrating to a subnet with the same IP range, you can keep the old IP address, as long as it is not already in use at the destination, by specifying it during the migration.
*   If the target subnet does not have the same IP range as the source, then the IP address of the interface changes to match the new subnet range.
*   You can keep the VM's existing external IP address in the new location. To do this, you must have the `compute.subnetworks.useExternalIp` permission on the target network, and the target network cannot have external IP addresses disabled by the constraints/compute.vmExternalIpAccess constraint.

## Migrating a VM

Before you migrate a VM, review the requirements and limitations.

Google recommends that you create any necessary firewall rules, routes, load balancers, and other network infrastructure resources in the new network before migrating your VMs. Doing so can shorten the time that your VMs are offline.

**Important:** Migrating a VM can take several minutes. After you start migrating a VM, don't interrupt the process or modify any resources that Compute Engine is migrating.

To migrate a VM, select one of the following options:

### Console

1.  In the Google Cloud console, go to the **VM instances** page.
    
    Go to VM instances
    
2.  Click the VM instance name to open the details page.
    
3.  If the VM is running, click stop **Stop** to stop the VM. If there is no **Stop** option, click more_vert **More actions >** stop **Stop**.
    
4.  After the VM stops, click **Edit** edit.
    
5.  Under **Network interfaces**, click the interface you want to move.
    
6.  In the **Network** field of the interface, select the new network for the interface.
    
7.  In the **Subnetwork** field of the interface, select the new subnet for the interface.
    
8.  In the **Internal IP address** field, specify **Automatic** if you want the system to allocate an IP address from the subnet range or **Custom** if you want to specify an unused one yourself.
    
9.  Click **Done** to close the network interface edit panel.
    
10.  Click **Save**.
     
11.  After the VM finishes saving, click **Start** start.
     
12.  If a confirmation dialog appears, click **Start**.
     

### gcloud

1.  Stop the VM
    
    gcloud compute instances stop INSTANCE_NAME \
        --zone=ZONE_NAME
    
    where
    
    *   INSTANCE_NAME is the name of the VM instance.
    *   ZONE_NAME is the name of the zone containing the instance.
2.  Migrate the VM
    
    gcloud compute instances network-interfaces update INSTANCE_NAME \
        --zone=ZONE_NAME \
        --network-interface=NIC \
        --network=NETWORK_NAME \
        --subnetwork=SUBNET_NAME
    
    where
    
    *   INSTANCE_NAME is the name of the VM instance.
    *   ZONE_NAME is the name of the zone containing the instance.
    *   NIC is the name of the interface you are updating. In a single-interface VM, the NIC is `nic0`.
    *   NETWORK_NAME is the target network name. If you are migrating the VM from a service project network to the host project network, you must use a fully qualified name for the target network: `projects/HOST_PROJECT_ID/global/networks/NETWORK_NAME`
    *   SUBNET_NAME is the target subnet name. This subnet must be in the same region as the VM. If you are migrating the VM from a service project network to the host project network, you must use a fully qualified name for the subnet: `projects/HOST_PROJECT_ID/regions/REGION/subnetworks/SUBNET_NAME`
3.  Start the VM
    
    Migration might take a few minutes, so wait before trying to start the VM in the new location.
    
    gcloud compute instances start INSTANCE_NAME \
        --zone=ZONE_NAME
    
    where
    
    *   INSTANCE_NAME is the name of the VM instance.
    *   ZONE_NAME is the name of the zone containing the instance.

### REST

1.  Stop the VM
    
    POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE_NAME/instances/INSTANCE_NAME/stop
    
    where
    
    *   PROJECT_ID is your project ID.
    *   INSTANCE_NAME is the name of the VM instance.
    *   ZONE_NAME is the name of the zone containing the instance.
2.  View details for the instance.
    
    GET https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE_NAME/instances/INSTANCE_NAME
    
    where
    
    *   PROJECT_ID is your project ID.
    *   ZONE_NAME is the name of the zone containing the instance.
    *   INSTANCE_NAME is the name of the VM instance.
3.  Find the fingerprint for the interface.
    
    You need the fingerprint to update the network interface.
    
    Examine the output of the command and find the `networkInterfaces` field contents. Find the item with the name of the interface you would like to update (in a single-interface VM, the name is `nic0`). Copy the string in the `fingerprint` field in this item for use in the next step.
    
4.  Migrate the VM
    
    PATCH https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE_NAME/instances/INSTANCE_NAME/updateNetworkInterface?networkInterface=NIC
    {
      "network": NETWORK_NAME,
      "subnetwork": SUBNET_NAME,
      "networkIP": IP_ADDRESS,
      "name": NIC,
      "fingerprint": FINGERPRINT
    }
    
    *   PROJECT_ID is your project ID.
    *   ZONE_NAME is the name of the zone containing the instance.
    *   INSTANCE_NAME is the name of the VM instance.
    *   NIC is the name of the interface you are updating. In a single-interface VM, the NIC is `nic0`.
    *   NETWORK_NAME is the target network name. If you are migrating the VM from a service project network to the host project network, you must use a fully qualified name for the target network: `projects/HOST_PROJECT_ID/global/networks/NETWORK_NAME`
    *   SUBNET_NAME is the target subnet name. This subnet must be in the same region as the VM. If you are migrating the VM from a service project network to the host project network, you must use a fully qualified name for the subnet: `projects/HOST_PROJECT_ID/regions/REGION/subnetworks/SUBNET_NAME`
    *   IP_ADDRESS is the internal IP address you want the instance to have in the new location. If you omit this field, the interface is assigned one automatically.
    *   FINGERPRINT is the fingerprint you got in the previous step.
5.  Start the VM
    
    POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE_NAME/instances/INSTANCE_NAME/start
    
    where
    
    *   PROJECT_ID is your project ID.
    *   INSTANCE_NAME is the name of the VM instance.
    *   ZONE_NAME is the name of the zone containing the instance.

## What's next

*   Learn how to move an instance to another zone.
*   Learn about live migration.
*   Check a VM's status.

Send feedback