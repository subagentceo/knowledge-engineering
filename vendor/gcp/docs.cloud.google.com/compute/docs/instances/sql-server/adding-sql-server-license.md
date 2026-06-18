# Add a SQL Server license to an existing Windows server

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   Guides

Send feedback

# Add a SQL Server license to an existing Windows server Stay organized with collections Save and categorize content based on your preferences.

Windows

Compute Engine lets you install SQL Server on Windows instances and use pay-as-you-go (PAYG) licenses. This document describes how you can perform the following:

1.  Add SQL Server license metadata to a boot disk
2.  Obtain SQL Server media and install SQL Server
3.  Apply a SQL server product key to a Compute Engine instance

## Billing

After adding a license string to the Windows instance's boot disk, you are billed according to the pricing of SQL Server images.

## Limitations

*   You can only add PAYG licenses for the following editions of SQL Server:
    
    *   SQL Server Web edition
    *   SQL Server Standard edition
    *   SQL Server Enterprise edition

## Add a SQL Server license

SQL Server license metadata on a boot disk allows Google Cloud to accurately track, bill, and report on SQL Server license usage. This metadata is required when using PAYG SQL Server licenses. Add a SQL Server license to an existing boot disk using the following procedure:

**Caution:** After you add a license to an instance, the license is bound to the instance and you cannot remove the license from the instance.

1.  Identify the license you want to add to an instance. For SQL Server, the license needs to match both the version and edition you want to run. For the list of valid SQL Server license strings, see the **License strings** tab in the operating system details for SQL Server document.
    
2.  Stop the instance:
    
    gcloud compute instances stop VM_NAME
    
    Replace `VM_NAME` with the name of the instance to stop.
    
3.  Identify the boot disk:
    
    gcloud compute instances describe VM_NAME
    
    Replace `VM_NAME` with the name of the instance.
    
4.  Verify that the output is similar to the following:
    
    ```
    disks:
    - autoDelete: true
      boot: true
      deviceName: BOOT_DISK_NAME
      diskSizeGb: '20'
      guestOsFeatures:
      - type: UEFI_COMPATIBLE
      index: 0
      interface: SCSI
      kind: compute#attachedDisk
      licenses:
      - BOOT_DISK_LICENSE_STRING
      mode: READ_WRITE
      source: https://www.googleapis.com/compute/v1/projects/PROJECT_NAME/zones/ZONE/disks/BOOT_DISK_NAME
      type: PERSISTENT
    ```
    
5.  Detach the boot disk:
    
    gcloud compute instances detach-disk VM_NAME --disk=BOOT_DISK_NAME
    
    Replace the following:
    
    *   `VM_NAME`: the name of the instance
    *   `BOOT_DISK_NAME`: the name of the boot disk
6.  Clone the boot disk and add the additional license:
    
    gcloud compute disks create CLONED_BOOT_DISK_NAME \
      --licenses=SQL_SERVER_LICENSE \
      --source-disk=BOOT_DISK_NAME \
      --source-disk-zone=BOOT_DISK_ZONE \
      --zone=CLONED_BOOT_DISK_ZONE
    
    Replace the following:
    
    *   `CLONED_BOOT_DISK_NAME`: the name you want to give the cloned book disk
    *   `SQL_SERVER_LICENSE`: the SQL Server license you want to add to the boot disk. For information on SQL Server licenses, see the License tab in section SQL Server on Windows
    *   `BOOT_DISK_NAME`: the name of the source boot disk that you want to clone
    *   `BOOT_DISK_ZONE`: the zone of the source boot disk
    *   `CLONED_BOOT_DISK_ZONE`: the zone in which you want to create the cloned boot disk
7.  Verify that the new disk has the correct license:
    
    gcloud compute disks describe CLONED_BOOT_DISK_NAME \
      --zone=CLONED_BOOT_DISK_ZONE
    
    Replace the following:
    
    *   `CLONED_BOOT_DISK_NAME`: the name of the cloned book disk
    *   `CLONED_BOOT_DISK_ZONE`: the zone of the cloned boot disk
8.  Attach the new disk as the boot disk for the instance:
    
    gcloud compute instances attach-disk VM_NAME \
      --disk=CLONED_BOOT_DISK_NAME
      --boot
    
    Replace the following:
    
    *   `VM_NAME`: the name of the instance to which you want to attach the cloned boot disk
    *   `CLONED_BOOT_DISK_NAME`: the name of the cloned book disk
9.  Verify that the instance's boot disk is the new cloned disk with SQL Server licensing.
    
    gcloud compute instances describe VM_NAME
    
    Replace `VM_NAME` with the name of the instance.
    
10.  Start the instance.
     
     gcloud compute instances start VM_NAME
     
     Replace `VM_NAME` with the name of the instance.
     
11.  (Optional) When you are sure that you don't want to revert back to the earlier boot disk, you can delete the disk.
     
     gcloud compute disks delete BOOT_DISK_NAME \
       --zone=BOOT_DISK_ZONE
     
     Replace the following:
     
     *   `BOOT_DISK_NAME`: the name of the boot disk that you want to delete
     *   `BOOT_DISK_ZONE`: the zone of the boot disk

## Obtain the SQL Server media and install SQL Server

To obtain the SQL Server installation media and copy it to a Compute Engine instance boot disk, do the following:

1.  Create a new disk containing the SQL Server installation media using any version of SQL server (for example, 2019 Enterprise):
    
    gcloud compute disks create SQL_SERVER_MEDIA_DISK_NAME \
      --image-family=sql-ent-2019-win-2022 \
      --image-project=windows-sql-cloud \
      --zone=SQL_SERVER_ZONE
    
    Replace the following:
    
    *   `SQL_SERVER_MEDIA_DISK_NAME`: the name of the SQL Server media disk that you want to create
    *   `SQL_SERVER_ZONE`: the zone in which you want to create the SQL Server media disk
2.  Attach the disk to any existing Compute Engine instance:
    
    gcloud compute instances attach-disk VM_INSTANCE_NAME \
      --disk=SQL_SERVER_MEDIA_DISK_NAME
      --zone=SQL_SERVER_ZONE
    
    Replace the following:
    
    *   `VM_INSTANCE_NAME`: the name of the instance to which you want to attach the SQL Server media disk
    *   `SQL_SERVER_MEDIA_DISK_NAME`: the name of the SQL Server media disk
    *   `SQL_SERVER_ZONE`: the zone of the instance
    
    After the SQL Server media disk is attached to an instance, on your Windows machine, open the **Disk Management** page to see if the disk has a drive letter assigned to it. If not, right-click on the disk and select **Online** to bring it online. The SQL Server media disk is now the `D:` drive on the **Disk Management** page and in Windows Explorer.
    
3.  Verify that the boot disk of your instance has at least 5 GB of free disk space and copy the SQL Server media to your boot disk:
    
    robocopy /mir d:\sql_server_install\ c:\sql_server_install
    
4.  Detach the SQL Server media disk from the instance:
    
    gcloud compute instances detach-disk VM_INSTANCE_NAME \
      --disk=SQL_SERVER_MEDIA_DISK_NAME
    
    Replace the following:
    
    *   `VM_INSTANCE_NAME`: the name of the instance you from which you want to detach the SQL Server media disk
    *   `SQL_SERVER_MEDIA_DISK_NAME`: the name of the SQL Server media disk that you want to detach from the instance

For more information, see Microsoft SQL Server installation guide.

## Apply a SQL server product key to a Compute Engine instance

In order to upgrade the SQL Server installation media, you must obtain and apply a product key to the Compute Engine instance on which the SQL Server is installed. To obtain the product key and upgrade the SQL Server installation media, do the following:

1.  Obtain the product key from the SQL Server installation media:
    
    C:\> type C:\sql_server_install\x64\DefaultSetup.ini
    
2.  Connect to the instance on which the SQL Server is installed using Remote Desktop and sign in using your domain user.
    
3.  Right-click the **Start** button (or press **Win+X**) and select **Run**.
    
4.  Confirm the elevation prompt by clicking **Yes**.
    
5.  Start the SQL Server setup:
    
    & c:\sql_server_install\setup.exe
    

## What's next

*   Learn about licenses
    
*   View the SQL Server tutorials
    
*   View the supported editions of SQL Server
    

Send feedback