# Troubleshooting SSH errors

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

Skip to main content

 ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/vab7d3990237361b4739a5005ec80b0af3ee973650a028ed684c6b12bd1dc988a/clouddocs/images/lockup_full_color.svg)

Technology areas

close

*   AI and ML
    
*   Application development
    
*   Application hosting
    
*   Compute
    
*   Data analytics and pipelines
    
*   Databases
    
*   Distributed, hybrid, and multicloud
    
*   Industry solutions
    
*   Migration
    
*   Networking
    
*   Observability and monitoring
    
*   Security
    
*   Storage
    

Cross-product tools

close

*   Access and resources management
    
*   Costs and usage management
    
*   Infrastructure as code
    
*   SDK, languages, frameworks, and tools
    

/

Console

*   English
*   Deutsch
*   Español
*   Español – América Latina
*   Français
*   Indonesia
*   Italiano
*   Português
*   Português – Brasil
*   עברית
*   中文 – 简体
*   中文 – 繁體
*   日本語
*   한국어

Sign in

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/products/compute-engine-color.svg)

*   Compute Engine

Start free

Overview Guides APIs & Reference Samples Resources ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/vab7d3990237361b4739a5005ec80b0af3ee973650a028ed684c6b12bd1dc988a/clouddocs/images/lockup_full_color.svg)

*   Technology areas
    
    *   More
    
    *   Overview
    *   Guides
    *   APIs & Reference
    *   Samples
    *   Resources
*   Cross-product tools
    *   More
*   Console

*   Discover
    
*   Product overview
*   Compute Engine instances
*   Instance groups
*   Compute Engine machine resources
    
    *   Machine resource guide
    *   Machine type families
        
        *   General-purpose machines
        *   Storage-optimized machines
        *   Compute-optimized machines
        *   Memory-optimized machines
        *   Accelerator-optimized machines
            
            *   GPU machines
            *   TPU machines
            
        *   Benchmark VM scores
        
    *   CPU platforms
    *   Accelerators on Google Cloud
        
        *   GPUs
            
            *   About GPUs
            *   GPU machine types
            
        *   TPUs
            
            *   About TPUs
            *   TPU resources in Compute Engine
            
        
    *   Arm VMs
    *   Bare metal instances
    
*   Regions and zones
    
    *   About regions and zones
    *   Accelerator locations
        
        *   GPU locations
        *   TPU locations
        *   About AI zones
        
    *   Global, regional, and zonal resources
    
*   Get started
    
*   Plan and prepare
    
    *   Work with regions and zones
        
        *   View available regions and zones
        *   Manage access to AI zones
        *   Change the default region or zone
        
    *   Review VM deployment options
        
        *   Choose a deployment strategy
        *   About VM provisioning models
        *   About VM tenancy
        *   Design resilient systems
        
    *   Networking overview for VMs
    *   Images and operating systems
        
        *   OS images
            
            *   About OS images
            *   Operating system details
            *   OS image lifecycle
            *   Support policy
            
        *   Premium operating systems
            
            *   RHEL FAQ
            *   SLES FAQ
            *   Ubuntu Pro FAQ
            *   Microsoft Licensing on Google Cloud
            *   Microsoft licenses FAQ
            
        *   License Manager
            
            *   About License Manager
            *   Use License Manager for Microsoft Office
            *   View audit logs
            
        
    *   Access control
        
        *   Access control overview
        *   Manage access to Compute Engine resources
        *   Organization policies
            
            *   Overview
            *   Managed constraints
            *   Custom constraints
            
        *   IAM roles and permissions
        *   Service accounts
        
    *   Name resources
    
*   Quickstarts
    
    *   Create a Linux VM
    *   Create a Windows Server VM
    *   Create a managed instance group
    *   Create a TPU instance
    
*   Create instances
    
*   Instance creation overview
*   Create an instance
    
    *   Create and start an instance
    *   Create with a customized machine configuration
        
        *   Create with a custom hostname
        *   Create with a custom machine type
        *   Specify a minimum CPU platform for an instance
        *   Create with attached GPUs
            
            *   About GPU instances
            *   Create overview
            *   Create an A3 Ultra or A4 instance
            *   Create an A3 instance with GPUDirect enabled
            *   Create an A3 High or A2 instance
            *   Create a G2 or G4 instance
            *   Create an N1 instance that has attached GPUs
            *   Install drivers
                
                *   Install GPU drivers
                *   Install drivers for NVIDIA RTX Virtual Workstations (vWS)
                *   Drivers for NVIDIA RTX Virtual Workstations (vWS)
                
            
        *   Create with attached TPUs
        
    *   Create with a customized OS configuration
        
        *   Create from a public image
        *   Create from a custom image
        *   Create from a shared image
        *   Create using a RHEL BYOS image
        
    *   Create with a customized networking configuration
        
        *   Create in a specific subnet
        *   Create with multiple network interfaces
        *   Create with IPv6 addresses
        *   Create an instance that uses Cloud RDMA
        
    *   Create with a customized observability configuration
        
        *   Create an instance for Ops Agent monitoring and logging
        *   Enable virtual displays on an instance
        
    *   Create with a customized security configuration
        
        *   Create an instance that uses a user-managed service account
        
    *   Create using an existing configuration
        
        *   Create using an instance template
        *   Create an instance similar to an existing instance
        
    *   Create using alternative provisioning models
        
        *   Create a Flex-start VM
            
            *   About Flex-start VMs
            *   Create a Flex-start VM
            
        *   Create a Spot VM
            
            *   About Spot VMs
            *   Create and use Spot VMs
            
        *   Create a reservation-bound VM
            
            *   About reservation-bound VMs
            *   Create a reservation-bound VM
            
        
    *   Create an instance that can be preempted
        
        *   About preemptible VMs
        *   Create and use preemptible VMs
        
    *   Create instances for specific workload types
        
        *   Create a Google-configured, workload-optimized instance
        *   Create an HPC-ready instance
        *   Create and manage a Windows Server instance
        *   Create a SQL Server instance
        
    
*   Create custom images
    
    *   Requirements to build custom images
    *   Create custom images
    *   Create custom Windows BYOL base images
    *   Create custom Windows Server images
    
*   Create and manage instance templates
    
    *   About instance templates
    *   Create instance templates
    *   Deterministic instance templates
    *   Get, list, and delete instance templates
    
*   Create multiple VMs
    
    *   Create a managed instance group (MIG)
        
        *   Basic scenarios for creating MIGs
        *   Create a MIG in a single zone
        *   Create a MIG in multiple zones in a region
        *   Create a MIG with multiple machine types
        *   Create a MIG from an existing VM
        *   Create a MIG with autoscaling
        *   Create a MIG with Flex-start VMs
        *   Create a MIG with preemptible VMs
        *   Create a MIG that adds GPU VMs all at once
        *   Create a MIG with stateful configuration
        
    *   Create a MIG with TPU VMs
        
        *   Overview of MIGs with TPU VMs
        *   Create single-host TPU slices
        *   Create a multi-host TPU slice
        
    *   Bulk creation of VMs
        
        *   About bulk creation of VMs
        *   Create VMs in bulk
        *   Create GPU VMs in bulk
        *   Configure instance flexibility for VMs created in bulk
            
            *   Instance flexibility for VMs created in bulk
            *   Create VMs in bulk with instance flexibility
            
        
    *   Create HPC clusters with enhanced cluster management capabilities
        
        *   Overview of HPC cluster creation with H4D machine series
        *   Reserve capacity through your account team
        *   View reserved capacity for H4D instances
        *   Create an H4D Slurm cluster with enhanced management capabilities
        *   Bulk create HPC-optimized instances that use RDMA with enhanced management capabilities
        *   Create a HPC MIG with H4D machine series
        *   Examples for creating MIGs with H4D machine series
            
            *   Create a MIG with H4D machine types and flex-start
            *   Create a MIG for HPC workloads with reservation-bound consumption
            
        
    
*   Create sole-tenant VMs
    
    *   Sole-tenancy overview
    *   Create sole-tenant node templates
    *   Create sole-tenant node groups
    *   Provision a sole-tenant VM
    *   Advanced maintenance control for sole-tenant nodes
    *   Sole-tenancy best practices
    *   Sole-tenancy accounting FAQ
    
*   Create a virtual workstation
    
    *   About creating virtual workstations
    *   Create a virtual Linux workstation
    *   Create a virtual Windows workstation
    *   Create a virtual Linux workstation with an attached GPU
    *   Create a virtual Windows workstation with an attached GPU
    
*   Use nested virtualization
    
    *   About nested virtualization
    *   Manage the nested virtualization constraint
    *   Enable nested virtualization
    *   Create nested VMs
    
*   Manage VM boot disks
    
    *   Detach and reattach a boot disk
    *   Create a customized boot disk
    
*   Migrate VMs
    
*   Choose a migration path
*   Bring your own licenses
*   Import disks and images
    
    *   Prerequisites for importing and exporting VM images
    *   Automatic import
        
        *   Import virtual disks
        *   Import virtual appliances
        
    *   Manual import
        
        *   Manually import boot disks
        *   Manually configure imported disks
        *   Create a persistent disk image from an ISO file
        
    
*   Move a VM within Google Cloud
    
    *   Move a VM between zones
    *   Migrate a VM between networks
    *   Copy VMs between projects
    
*   Move an existing VM to a new VM
*   Connect to VMs
    
*   Connect to a VM
    
    *   About SSH connections
    *   Linux VMs
        
        *   Connect to VMs
        *   SSH-in-browser
        *   Connect through internal IP addresses
            
            *   Connection options for internal-only VMs
            *   Connect using IAP
            *   Connect using a bastion host
            *   Connect using Cloud VPN
            
        *   Connect as the root user
        *   Connect using service accounts
        *   Configure apps to use SSH
        *   Best practices
            
            *   Securely connect to VMs
            
        
    *   Windows VMs
        
        *   Connect to Windows VMs using RDP
        *   Connect to a Windows VM's SAC
        *   Connect to Windows VMs using SSH
        *   Connect to Windows VMs using PowerShell
        
    
*   Manage access to VMs
    
    *   Linux VMs
        
        *   Choose an access management method
        *   About OS Login
        *   Set up OS Login
        *   Set up OS Login to require SSH certificates
        *   Enable security keys with OS Login
        *   Manage OS Login in an organization
        *   Monitor OS Login audit logs
        
    *   Windows VMs
        
        *   Manage accounts and credentials on Windows VMs
        *   Automate Windows password generation
        
    *   Manually manage SSH keys
        
        *   Create SSH keys
        *   Add SSH keys to VMs
        *   Restrict SSH keys from VMs
        
    *   Best practices for securing SSH access
        
        *   Overview
        *   Control network access
        *   Control SSH login access
        *   Protect SSH credentials
        *   Audit SSH access
        
    *   Manage tags for resources
    
*   Transfer files to or from a VM
    
    *   Transfer files to Linux VMs
    *   Transfer files to Windows VMs
    
*   IP addresses
*   Internal DNS
    
    *   Overview of internal DNS
    *   Access VMs using internal DNS names
    *   Use zonal DNS
        
        *   Overview of zonal DNS
        *   Set zonal DNS as the default
        *   Migrate to zonal DNS
        *   Monitor DNS failure rates
        
    
*   Create a PTR record for a VM
*   Verify VM identity
*   Manage storage
    
*   Choose a disk type
*   Disk types
    
    *   About Hyperdisk
        
        *   Hyperdisk overview
        *   Choose a Hyperdisk type
            
            *   Hyperdisk Balanced
            *   Hyperdisk Balanced High Availability
            *   Hyperdisk Extreme
            *   Hyperdisk ML
            *   Hyperdisk Throughput
            
        
    *   About Persistent Disk
    *   Extreme Persistent Disk
    *   About Local SSD
    
*   Use pools to manage capacity and performance
    
    *   About Hyperdisk pools
    *   Choose a Hyperdisk pool type
        
        *   Hyperdisk Storage Pools
        *   Hyperdisk Exapools
        
    *   Create a Hyperdisk pool
    *   Manage Hyperdisk pools
    
*   Add disks to VMs
    
    *   Create a VM with Local SSD disks
    *   Create a VM with additional non-boot disks
    *   Create a new Hyperdisk
    *   Create a new Persistent Disk
    *   Add disks from a storage pool to VMs
    *   Share a disk between VMs
    *   Attach a disk to a VM
    *   Mount in-memory RAM disks
    
*   Configure disks
    
    *   Format and mount a non-boot disk on Linux
    *   Format and prepare a non-boot disk on Windows
    *   Access disks attached to a VM
        
        *   Best practice: Use persistent device names
        *   Symbolic links to disks
        
    *   Transfer data to disks attached to a VM
        
        *   Transfer files to Linux VMs
        *   Transfer files to Windows VMs
        
    
*   View disk details
*   Encrypt disks
    
    *   About disk encryption
    *   Encrypt disks with customer-supplied encryption keys
    *   Help protect resources by using Cloud KMS keys
    
*   Modify disks
    
    *   Modify a Hyperdisk
    *   Change the disk type
    *   Increase the size of a Persistent Disk
    *   Modify a Persistent Disk
    
*   Evaluate disk performance
    
    *   Hyperdisk performance overview
    *   Hyperdisk performance and size limits
    *   Persistent Disk performance overview
    *   Review disk performance
        
        *   Review disk performance metrics
        *   Analyze provisioned IOPS and throughput
        
    *   Benchmark disk performance
        
        *   Benchmark Hyperdisk performance
        *   Benchmark Persistent Disk performance on a Linux VM
        *   Benchmark Persistent Disk performance on a Windows VM
        *   Benchmark Local SSD performance
        
    
*   Make disks highly available
    
    *   Replicate disks across regions
        
        *   About Asynchronous Replication
        *   Configure replication
        *   Manage replication
        *   Failover and failback disks
        *   Manage asynchronous disks
        *   Manage consistency groups
        *   Review performance metrics
        
    *   Cross-zonal synchronous disk replication
        
        *   About regional disks
        *   Build high availability services using regional disks
        *   Design considerations for resilient workloads with regional disks
        *   Create and manage regional disks
        *   Manage failures for regional disks
        
    
*   Back up and restore
    
*   Data protection options
*   Configure the default backup setting
*   Back up VMs
    
    *   Use machine images
        
        *   About machine images
        *   Create machine images
        *   Import machine images from virtual appliances
        
    *   Use Backup and DR backup plans
        
        *   About backup plans
        *   Apply backup plans to new instances
        *   Apply or change backup plans for existing instances
        
    
*   Back up disks
    
    *   Back up disks in place
        
        *   About instant snapshots
        *   Create and manage instant snapshots
        *   Copy an instant snapshot to a different location
        
    *   Back up a disk for disaster recovery
        
        *   About disk snapshots
        *   Best practices for disk snapshots
        *   Set default storage location for globally scoped snapshots
        *   Set creation and restore locations for regionally scoped snapshots
        *   Create disk snapshots
        *   Manage disk snapshots
        *   Create application consistent snapshots
            
            *   Create Linux application consistent snapshots
            *   Create a Windows disk snapshot (VSS snapshots)
            
        
    *   Schedule disk backups
        
        *   About snapshot schedules
        *   Create snapshot schedules
        *   Manage snapshot schedules
        *   Configure alerts for snapshot schedules
        
    *   Duplicate a disk with clones
    
*   Restore from a backup
    
    *   Create VMs from machine images
    *   Restore from a standard snapshot
    *   Restore from instant snapshots
    
*   Recover a VM with a corrupted or full disk
*   Manage VMs
    
*   Basic operations and lifecycle
    
    *   VM instance lifecycle
    *   Schedule VM operations
        
        *   Schedule a VM to start and stop
        *   Limit the run time of a VM
        
    *   View VM properties
        
        *   Check that a VM is running
        *   View a list of VMs
        *   View the details of a VM
        *   View the UUID of a VM
        *   View the topology of a VM
        *   View the source image of a VM
        *   View referrers to VMs
        *   View network configuration of a VM
        *   View the number of visible CPU cores in a VM
        
    *   Stop or suspend a VM
        
        *   Stop or suspend VMs overview
        *   Stop or restart a VM
        *   Increase or decrease VM shutdown time
            
            *   Increase shutdown time
                
                *   Graceful shutdown overview
                *   Enable graceful shutdown
                *   View graceful shutdown
                *   Disable graceful shutdown
                
            *   Decrease shutdown time
            
        *   Suspend or resume a VM
        *   Reset a VM
        
    *   Update VM details
        
        *   Rename a VM
        *   Update VM properties
        *   Edit the machine type of a VM
        *   Add or remove GPUs
        *   Change the attached service account
        *   Update the physical location of a VM
            
            *   About placement policies
            *   Create and apply spread placement policies to VMs
            *   View placement policies
            *   Remove or delete placement policies
            
        *   Update network configuration for instances
            
            *   Configure static external IP addresses
            *   Configure static internal IP addresses
            *   Configure IPv6 for instances and instance templates
            *   Update network interfaces
            
        
    *   Delete VMs
        
        *   Delete a VM
        *   Prevent accidental VM deletion
        
    
*   Update VM tenancy
*   Manage multiple VMs
    
    *   Manage groups of VMs
        
        *   Work with managed VMs in a MIG
        *   View info about MIGs and managed instances
        *   Add or remove VMs in a MIG
        *   Limit the run time of VMs in a MIG
        *   Add instances all at once in a MIG
            
            *   Overview
            *   Bulk creation of instances in a MIG
                
                *   About bulk mode
                *   Create a MIG that uses the bulk mode
                *   View or cancel bulk creation of instances
                
            *   Resize request
                
                *   About resize requests
                *   Create resize requests
                *   View, cancel, or delete resize requests
                
            
        *   Define the physical location of VMs
            
            *   About workload policies
            *   Create workload policies
            *   View workload policies
            *   Remove or delete workload policies
            
        *   Configure instance flexibility in a MIG
            
            *   About instance flexibility
            *   Add instance flexibility
            *   View instance flexibility
            *   Change or remove instance flexibility
            
        *   Distribute VMs across zones in a regional MIG
            
            *   About regional MIGs
            *   About target distribution shape
            *   Set a target distribution for VMs across zones
            *   Disable and reenable proactive instance redistribution
            *   Manually rebalance a regional MIG
            *   Simulate a zone outage for a regional MIG
            
        *   Work with suspended and stopped VMs in a MIG
            
            *   Overview
            *   Manually suspend or stop VMs in a MIG
            *   Accelerate scale out with suspended and stopped VMs
            
        *   Apply new VM configurations in a MIG
            
            *   About applying new VM configurations to VMs in a MIG
            *   Automatically apply VM configuration updates
            *   Selectively apply VM configuration updates
            *   Apply configuration updates during repairs
            *   Override instance template properties with an all-instances configuration
            *   Perform one-click OS image upgrades
            
        *   Maintain high availability during VM failures
            
            *   About repairing VMs for high availability
            *   Repair a VM when an application fails
                
                *   Set up an application-based health check and autohealing
                *   Monitor VM health state changes
                *   Disable and enable health state change logs
                
            *   Repair a VM in an alternate zone
            *   Turn off repairs in a MIG
            
        *   Support a stateful workload with a MIG
            
            *   About stateful MIGs
            *   Configure stateful MIGs
                
                *   Configure a stateful MIG
                *   Configure stateful Persistent Disk volumes
                *   Configure stateful metadata
                *   Configure stateful IP addresses
                *   Apply, view, and remove stateful configuration
                
            *   How stateful MIGs work
            *   How operations affect preserved state
            
        *   Group VMs together
            
            *   Migrate an existing workload to a stateful managed instance group
            *   Group unmanaged VMs together
            
        *   Delete a MIG
        
    *   Manage HPC clusters with enhanced cluster management capabilities
        
        *   Enhanced HPC cluster management capabilities
        *   View H4D cluster topology
        *   Manage host events across reservations
        *   Manage host events across VMs
        *   Report faulty host with H4D machines
        
    
*   Host maintenance events
    
    *   About host events
    *   Live migration process
    *   Set the host maintenance policy
    *   Query metadata server for notices
    *   Simulate a host maintenance event
    *   Handle GPU host maintenance events
    *   Monitor and plan for a host maintenance event
    *   Manually start host maintenance
    
*   Manage metadata
    
    *   About VM metadata
    *   Predefined metadata keys
    *   Set and remove custom metadata
    *   View and query VM metadata
    *   Set and query guest attributes
    
*   Securing VMs
    
    *   About Shielded VMs
    *   Microsoft Secure Boot certificates expiration guide
        
        *   Overview
        *   Update KEK and db certificates
        
    *   About Confidential VMs
    *   Protect resources with VPC Service Controls
    *   Monitor security risks with Security Command Center
    
*   Manage operating systems
    
*   Guest environment
    
    *   About the guest environment
    *   Install the guest environment
    *   Guest agent
        
        *   About the guest agent
        *   Guest agent functionality
        *   Configure the guest agent
        
    
*   Manage operating systems using VM Manager
*   Manage OS images
    
    *   Image management best practices
    *   Image families best practices
    *   Access Red Hat Knowledgebase
    *   Manage access to custom images
    *   Set up trusted image policies
    *   Export a custom image to Cloud Storage
    *   Set image versions in an image family
    *   Deprecate a custom image
    *   Delete a custom image
    
*   Manage OS packages
*   Manage licenses
    
    *   About licenses
    *   Manage licenses
    *   License changes and restrictions
    *   Switch between PAYG and BYOS
    *   Switch Windows Server from BYOL to PAYG
    *   Update licenses after an OS upgrade
    *   Append RHEL ELS licenses
    *   Upgrade from Ubuntu to Ubuntu Pro
    
*   Manage VM extensions
    
    *   About VM Extension Manager
    *   Global VM extension policies
    *   Zonal VM extension policies
    *   Install VM extensions by using extension policies
    *   Manage VM extensions by using extension policies
    *   View VM extension logs
    
*   Use startup scripts
    
    *   Startup scripts overview
    *   Use startup scripts on Linux VMs
    *   Use startup scripts on Windows VMs
    
*   Run shutdown scripts
*   Configure time synchronization
    
    *   Time synchronization overview
    *   Configure network time protocol (NTP)
    *   Configure accurate time
    
*   Enable the virtual random number generator (Virtio RNG)
*   Deploy workloads
    
*   Set up authentication for workloads
    
    *   Choose a workload authentication method
    *   Authenticate workloads to Google Cloud API using service accounts
    *   Authenticate workloads to other workloads over mTLS
    
*   Agent for Compute Workloads overview
*   Web servers
    
    *   Deploy an Apache server
    *   Deploy an IIS server
    *   Deploy a Flask server by using Terraform
    
*   Applications
    
    *   Interactive: Build a to-do app with MongoDB
    *   Deploy an ASP.NET application
    *   Set up Joomla
    *   Set up LAMP
    *   Perform blue/green deployments using Cloud Build
    *   Send email from a VM
        
        *   About sending email
        *   Send email with SendGrid
        *   Send email with Mailgun
        *   Send email with Mailjet
        
    
*   Databases
    
    *   MySQL
        
        *   MySQL on Compute Engine
        *   Install MySQL on Compute Engine
        *   Configure MySQL on Compute Engine
        *   Set up client access with a private IP address
        *   Cloning a MySQL database on Compute Engine
        *   Architectures for high availability of MySQL clusters on Compute Engine
        *   Deploying a highly available MySQL 5.6 cluster with DRBD on Compute Engine
        
    *   PostgreSQL
        
        *   Set up PostgreSQL on Compute Engine
        *   Set up a PostgreSQL data disk
        *   Set up PostgreSQL with hot standby
        
    *   SQL Server
        
        *   Best practices for SQL Server VMs
        *   Create
            
            *   Create a high-performance SQL Server VM
            *   Add a SQL Server license to an existing Linux server
            *   Add a SQL Server license to an existing Windows server
            *   Configure SQL Server on Google Cloud using Google Cloud NetApp Volumes
                
                *   Use file storage to configure SQL Server failover cluster instance
                *   Use block storage to configure SQL Server Always On availability groups
                
            
        *   Configure
            
            *   Set up AlwaysOn availability groups using an internal load balancer
            *   Set up AlwaysOn availability groups using a distributed network name
            *   Set up a failover cluster VM that uses S2D
            *   Set up a failover cluster VM with multi-writer disks
            *   Set up a SQL Server cluster on Linux with Always On availability groups and Pacemaker
            
        *   Migrate
            
            *   Migrate a SQL Server database from AWS EC2 to Compute Engine
            *   Migrate a SQL Server database from Windows to Linux
            
        *   Disaster recovery
            
            *   Disaster recovery for Microsoft SQL Server
            *   Disaster recovery for Microsoft SQL server on Persistent disk
            *   Disaster recovery for Microsoft SQL server on Hyperdisk
            *   Deploying Microsoft SQL Server for multi-regional disaster recovery
            *   Back up SQL Server databases to a Google Cloud Storage bucket
            *   Back up SQL Server databases using instant snapshots
            
        *   Cloning a Microsoft SQL Server database on Compute Engine
        *   Load test SQL Server using HammerDB
        
    *   Redis
        
        *   Deployment Options for Redis on Google Cloud
        
    
*   Containers
    
    *   Containers on Compute Engine
    *   Deploy containers on VMs and managed instance groups
    *   Configure options to run your container
    *   Transition from the container startup agent
        
        *   Prepare for the shutdown of the container startup agent
        *   Prevent the creation of VMs that use the container metadata
        *   Migrate containers that were deployed on VMs during VM creation
        
    *   OpenShift workloads
        
        *   OpenShift on Google Cloud overview
        *   Plan for OpenShift on Google Cloud
        *   Overview of Cluster Services for OpenShift
        *   Built-in integrations for OpenShift
        *   Best practices for high availability with OpenShift
        *   Disaster recovery for OpenShift on Google Cloud
        *   Disaster recovery strategies for active-passive and active-inactive setups with OpenShift
        
    
*   Microsoft Windows
    
    *   Windows workloads
    *   Best practices for Windows Server VMs
    *   Setting up Active Directory
    *   Best practices for running Active Directory on Google Cloud
    *   Deploy Microsoft SharePoint Server on Compute Engine
    *   Deploying Microsoft Exchange Server 2016 on Compute Engine
    *   Windows Server
        
        *   Perform an in-place upgrade of Windows Server
        *   Run Windows Server failover clustering
        
    
*   IBM Spectrum Symphony
    
    *   Integrate IBM Spectrum Symphony with Google Cloud
    *   Install the Compute Engine Symphony provider
    *   Install the Google Kubernetes Symphony provider
    *   Troubleshoot IBM Spectrum Symphony
    
*   Others
    
    *   Load testing
        
        *   Distributed load testing using Kubernetes
        *   SSH port forwarding and load testing
        
    *   Analytics
        
        *   Monte Carlo methods using Apache Spark
        
    *   Machine learning
        
        *   Run TensorFlow inference workloads with TensorRT5 and NVIDIA T4 GPU
        
    
*   Monitor
    
*   Monitor logs
    
    *   View audit logs
    *   View usage reports
    *   View Compute Engine operations
    *   Migrate from activity logs to audit logs
    *   View activity logs
    
*   Monitor resources
    
    *   Monitor VM and sole-tenant node usage
    *   Observe and monitor VMs
    *   Monitor GPU performance
        
        *   Monitor GPU performance on Linux VMs
        *   Monitor GPU performance on Windows VMs
        
    *   Monitor disks
        
        *   Monitor disk health
        *   Monitor the replica states of regional disks
        *   Monitor disks
        *   List of metrics for Pools
        *   Monitor Pools
        
    *   Monitor reservations
    
*   Organize resources using labels
*   Scale
    
*   Autoscale groups of VMs
    
    *   About autoscaling groups of VMs
    *   Create and manage autoscalers
        
        *   Scale based on CPU utilization
        *   Scale based on predictions
        *   Scale based on load balancing serving capacity
        *   Scale based on Monitoring metrics
        *   Scale based on schedules
        *   Use an autoscaling policy with multiple signals
        *   Manage autoscalers
        
    *   Understand autoscaler decisions
    *   View autoscaler logs
    
*   Autoscale node groups
*   Reserve VM capacity
    
    *   Choose a reservation type
    *   Sharing reservations
        
        *   Best practices for shared reservations
        *   Allow a project to share reservations
        
    *   On-demand reservations
        
        *   About on-demand reservations
        *   Create an on-demand reservation
            
            *   For a single project
            *   For multiple projects
            
        *   Combine an on-demand reservation with a CUD
        *   Modify an on-demand reservation
        *   Delete an on-demand reservation
        
    *   Future reservations
        
        *   About future reservations
        *   Create a reservation request
            
            *   For a single project
            *   For multiple projects
            
        *   Modify a reservation request
        *   Delete a reservation request
        
    *   Future reservations in calendar mode
        
        *   About future reservations in calendar mode
        *   Create a reservation request in calendar mode
        
    *   View reservations or reservation requests
    *   Consume a reservation
    *   Prevent VMs from consuming reservations
    
*   Load balancing
    
    *   About load balancing and scaling
    *   Add an instance group to a load balancer
    *   Request routing to a multi-region external HTTPS load balancer
    *   Cross-region load balancing for Microsoft IIS backends
    *   Set up Internal TCP/UDP Load Balancing
    
*   Build reliable and scalable applications
    
    *   Use autohealing for highly available applications
    *   Use load balancing for highly available applications
    *   Use autoscaling for highly scalable applications
    *   Globally autoscale a web service on Compute Engine
    *   Patterns for scalable and resilient applications
    *   Patterns for using floating IP addresses on Compute Engine
    
*   Optimize
    
*   Resource utilization
    
    *   Use recommendations to manage resources
        
        *   Apply machine type recommendations to VMs
        *   Configure machine type recommendations
        *   Apply machine type recommendations to MIGs
        *   View and apply idle resources recommendations
        *   View and understand VM insights
        *   View and understand MIG insights
        *   Manage idle VM recommendations
            
            *   Idle VM recommendations overview
            *   View and apply idle VM recommendations
            *   Configure idle VM recommendations
            
        *   Manage reservation recommendations
            
            *   Reservation recommendations overview
            *   View and apply idle reservation recommendations
            *   View and apply underutilized reservation recommendations
            *   Configure idle reservation recommendations
            *   Configure underutilized reservation recommendations
            
        
    *   Overcommit CPUs on sole-tenant VMs
    *   Manual live migration
        
        *   About manual live migration
        *   Manually live migrate VMs
        
    *   Share sole-tenant node groups
    *   Next generation dynamic resource management
    
*   Cost savings
    
    *   Get discounts for committed usage
        
        *   About commitments and committed use discounts (CUDs)
        *   Resource-based CUDs
        *   Manage resource-based commitments
            
            *   Renew commitments automatically
            *   Extend commitment terms
            *   Merge and split commitments
            *   Upgrade commitments
            
        *   Share resource-based CUDs across projects
        
    *   Get discounts for sustained usage
    
*   Disk performance
    
    *   Optimize Hyperdisk performance
    *   Optimize Persistent Disk performance
    *   Optimize Local SSD performance
    
*   Workload performance
    
    *   Set the number of threads per core
    *   Customize the number of visible CPU cores
    *   Analyze the CPU performance using the PMU
        
        *   PMU overview
        *   Enable the PMU in VMs
        *   Manage the PMU in VMs
        
    
*   Network performance
    
    *   Network bandwidth
    *   Use Google Virtual NIC
    *   Use IRDMA network driver
    *   Use IDPF network interface
    *   Configure a VM with higher bandwidth
    *   Reduce latency by using compact placement policies
    *   Optimize TCP network communication
        
        *   Optimize TCP network performance
        *   Optimize TCP network resiliency
        
    *   Benchmark higher bandwidth VMs
    *   Optimize app latency with load balancing
    *   Use DPDK to improve network performance
    *   Network performance and GPU VMs
        
        *   Networking and GPU machines
        *   Use higher network bandwidth
        *   Patterns for using multiple host NICs
        
    
*   Troubleshoot
    
*   General tips
*   Troubleshoot connectivity
    
    *   Troubleshoot RDP
    *   Troubleshoot SSH
    *   Troubleshoot OS Login
    
*   Troubleshoot VMs
    
    *   Troubleshoot VM operations
        
        *   Troubleshoot VM creation
        *   Troubleshoot resource availability errors
        *   Troubleshoot bulk API VM creation
        *   Troubleshoot VM reboots and shutdowns
        *   Troubleshoot VM suspension
        *   Troubleshoot VM updates
        
    *   Troubleshoot unresponsive VMs
        
        *   Troubleshoot VM startup
        *   Troubleshoot fstab errors
        *   Troubleshoot kernel panic
        *   Collecting core dumps
        *   Rescue an inaccessible VM
        *   Troubleshoot CPU bus locks
        *   Troubleshoot CPU soft lockups
        
    *   Troubleshoot VM configurations
        
        *   Troubleshoot Arm VMs
        *   Troubleshoot GPU VMs
            
            *   Troubleshoot NVIDIA GPU errors
            *   Generate a NVIDIA bug report for Blackwell GPUs
            
        *   Troubleshoot nested virtualization
        *   Troubleshoot using VM screenshots
        *   Troubleshoot sole-tenant nodes
        *   Troubleshoot VM performance issues
        *   Troubleshoot sudoers files
        
    *   Troubleshoot Windows VMs
        
        *   Troubleshoot Windows VMs
        *   Collecting diagnostic information
        
    *   Troubleshoot using the serial console
        
        *   Troubleshoot using the serial console
        *   Viewing serial port output
        
    
*   Troubleshoot instance groups
    
    *   Troubleshoot managed instance groups (MIGs)
    
*   Troubleshoot OS management
    
    *   Troubleshoot licenses
    *   Troubleshoot image import and export
    *   Troubleshooting SLES pay-as-you-go registration
    *   Troubleshooting Ubuntu Pro Registration
    
*   Troubleshoot metadata server
    
    *   Troubleshoot metadata server
    
*   Troubleshoot networking issues
    
    *   Troubleshoot common networking issues
    *   Troubleshoot network drivers
    *   Troubleshoot VM performance issues
    
*   Troubleshoot storage
    
    *   Troubleshoot disk creation
    *   Troubleshoot full disks and disk resizing
    *   Troubleshoot disk encryption
    *   Troubleshoot NVMe disks
    *   Troubleshoot instant snapshots
    *   Troubleshoot standard snapshots
    
*   Troubleshoot reservations and commitments
    
    *   Troubleshoot reservation creation
    *   Troubleshoot reservation consumption
    *   Troubleshooting reservation monitoring
    *   Troubleshoot reservation updates
    *   Troubleshoot future reservation creation and updates
    *   Troubleshoot automatic commitment renewal
    
*   Troubleshoot quota errors
    
    *   Troubleshoot concurrent operation quota errors
    
*   Troubleshoot workload authentication
    
    *   Troubleshoot default service accounts
    *   Troubleshoot workload to workload authentication
    

*   AI and ML
*   Application development
*   Application hosting
*   Compute
*   Data analytics and pipelines
*   Databases
*   Distributed, hybrid, and multicloud
*   Industry solutions
*   Migration
*   Networking
*   Observability and monitoring
*   Security
*   Storage

*   Access and resources management
*   Costs and usage management
*   Infrastructure as code
*   SDK, languages, frameworks, and tools

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   Guides

Send feedback

# Troubleshooting SSH errors Stay organized with collections Save and categorize content based on your preferences.

Linux Windows

This document describes common errors that you may run into when connecting to virtual machine (VM) instances using SSH, ways to resolve errors, and methods for diagnosing failed SSH connections.

## SSH troubleshooting tool

Use the SSH troubleshooting tool to help determine why an SSH connection failed. The troubleshooting tool performs the following tests to check for the cause of failed SSH connections:

*   **User permissions tests:** Checks if you have the required IAM permissions to connect to the VM using SSH.
*   **Network connectivity tests:** Checks if the VM is connected to the network.
*   **VM instance status tests:** Checks the VM's CPU status to see if the VM is running.
*   **VPC settings tests:** Checks the default SSH port.

### Run the troubleshooting tool

You can use the Google Cloud console or the Google Cloud CLI to check for networking problems and user permission errors that might cause SSH connections to fail.

#### Permissions required for this task

To perform this task, you must have the following permissions:

*   `networkmanagement.connectivitytests.create` on the VM
*   `networkmanagement.connectivitytests.delete` on the VM
*   `networkmanagement.connectivitytests.get` on the VM

If you are missing any of the preceding permissions, the troubleshooting tool skips network connectivity tests.

### Console

After an SSH connection fails, you have the option to **Retry** the connection, or **Troubleshoot** the connection using the SSH-in-browser troubleshooting tool.

To run the troubleshooting tool, click **Troubleshoot**.

![Launch SSH troubleshooting tool.](/static/compute/docs/troubleshooting/ssh-troubleshoot.png)

### gcloud

Run the troubleshooting tool by using the `gcloud compute ssh` command:

gcloud compute ssh VM_NAME --troubleshoot [--tunnel-through-iap]

Replace `VM_NAME` with the name of the VM that you can't connect to.

Use the `--tunnel-through-iap` flag if you are troubleshooting connectivity through Identity-Aware Proxy for TCP forwarding.

The tool prompts you to provide permission to perform the troubleshooting tests.

### Review the results

After running the troubleshooting tool, do the following:

1.  Review the test results to understand why the VM's SSH connection isn't working.
2.  Resolve SSH connections by performing the remediation steps provided by the tool.
3.  Try reconnecting to the VM.
    
    If the connection isn't successful, try manually troubleshooting by doing the following:
    
    *   Debug issues using the serial console
    *   Ensure the VM is booting normally

## Common SSH errors

The following are examples of common errors you might encounter when you use SSH to connect to Compute Engine VMs.

### SSH-in-Browser errors

#### Unauthorized Error 401

The following error might occur when you connect to your VM using the SSH-in-browser from the Google Cloud console:

Unauthorized
Error 401

This error occurs if your user is part of an organization that is managed from within Google Workspace and there is an active restriction in the Workspace policy that prevents users from accessing SSH-in-browser and the serial console within Google Cloud.

To resolve this issue, have a Google Workspace admin do the following:

1.  Confirm that Google Cloud is enabled for the organization.
    
    If Google Cloud is disabled, enable it and retry the connection.
    
2.  Confirm that services that aren't controlled individually are enabled.
    
    If these services are disabled, enable them and retry the connection.
    

If the problem persists after enabling Google Cloud settings in Google Workspace, do the following:

1.  Capture the network traffic in an HTTP Archive Format (HAR) file starting from when you start the SSH-in-Browser SSH connection.
    
2.  Create a Cloud Customer Care case and attach the HAR file.
    

#### Could Not Connect, Retrying...

The following error might occur when you start an SSH session:

Could not connect, retrying ...

![Could not connect, retrying](/static/compute/docs/troubleshooting/ssh_in_browser_could_not_connect.png)

To resolve this issue, do the following:

1.  After the VM has finished booting, retry the connection. If the connection is not successful, verify that the VM did not boot in emergency mode by running the following command:
    
    gcloud compute instances get-serial-port-output VM_NAME \
    | grep "emergency mode"
    
    If the VM boots in emergency mode, troubleshoot the VM startup process to identify where the boot process is failing.
    
2.  Verify that the`google-guest-agent.service` service is running, by running the following command in the serial console.
    
    systemctl status google-guest-agent.service
    
    If the service is disabled, enable and start the service, by running the following commands:
    
    systemctl enable google-guest-agent.service
    systemctl start google-guest-agent.service
    
3.  Verify that the Linux Google Agent scripts are installed and running. For more information, see Determining Google Agent Status. If the Linux Google Agent is not installed, re-install it.
    
4.  Verify that you have the required roles to connect to the VM. If your VM uses OS Login, see Assign OS Login IAM role. If the VM doesn't use OS Login, you need the compute instance admin role or the service account user role (if the VM is set up to run as a service account). The roles are needed to update the instance or project SSH keys-metadata.
    
5.  Verify that there is a firewall rule that allows SSH access by running the following command:
    
    gcloud compute firewall-rules list | grep "tcp:22"
    
6.  Verify that there is a default route to the Internet (or to the bastion host). For more information, see Checking routes.
    
7.  Make sure that the root volume is not out of disk space. For more information, see Troubleshooting full disks and disk resizing.
    
8.  Make sure the VM has not run out of memory, by running the following command:
    
    gcloud compute instances get-serial-port-output instance-name \
    | grep "Out of memory: Kill process" - e "Kill process" -e "Memory cgroup out of memory" -e "oom"
    
    If the VM is out of memory, connect to serial console to troubleshoot.
    

### Linux errors

#### Permission denied (publickey)

The following error might occur when you connect to your VM:

USERNAME@VM_EXTERNAL_IP: Permission denied (publickey).

This error can occur for several reasons. The following are some of the most common causes of this error:

*   **You used an SSH key stored in metadata to connect to a VM that has OS Login enabled.** If OS Login is enabled on your project, your VM doesn't accept SSH keys that are stored in metadata. If you aren't sure if OS Login is enabled, see Checking if OS Login is configured.
    
    To resolve this issue, try one of the following:
    
    *   Connect to your VM using the Google Cloud console or the Google Cloud CLI. For more information, see Connecting to VMs.
    *   Add your SSH keys to OS Login. For more information, see Add keys to VMs that use OS Login.
    *   Disable OS Login. For more information, see Disabling OS Login.
*   **You used an SSH key stored in an OS Login profile to connect to a VM that doesn't have OS Login enabled.** If you disable OS Login, your VM doesn't accept SSH keys that were stored in your OS Login profile. If you aren't sure if OS Login is enabled, see Checking if OS Login is configured.
    
    To resolve this issue, try one of the following:
    
    *   Connect to your VM using the Google Cloud console or the Google Cloud CLI. For more information, see Connecting to VMs.
    *   Enable OS Login. For more information, see Enabling OS Login.
    *   Add your SSH keys to metadata. For more information, see Add SSH keys to VMs that use metadata-based SSH keys.
*   **The VM has OS Login enabled, but you don't have sufficient IAM permissions to use OS Login.** To connect to a VM that has OS Login enabled, you must have the permissions required for OS Login. If you aren't sure if OS Login is enabled, see Checking if OS Login is configured.
    
    To resolve this issue, grant the required OS Login IAM roles.
    
*   **Your key expired and Compute Engine deleted your `~/.ssh/authorized_keys` file.** If you manually added SSH keys to your VM and then connected to your VM using the Google Cloud console, Compute Engine created a new key pair for your connection. After the new key pair expired, Compute Engine deleted your `~/.ssh/authorized_keys` file in the VM, which included your manually added SSH key.
    
    To resolve this issue, try one of the following:
    
    *   Connect to your VM using the Google Cloud console or the Google Cloud CLI. For more information, see Connecting to VMs.
    *   Re-add your SSH key to metadata. For more information, see Add SSH keys to VMs that use metadata-based SSH keys.
*   **You connected using a third-party tool and your SSH command is misconfigured.** If you connect using the `ssh` command but don't specify a path to your private key or you specify an incorrect path to your private key, your VM refuses your connection.
    
    To resolve this issue, try one of the following:
    
    *   Run the following command:  
        
        ssh -i PATH_TO_PRIVATE_KEY USERNAME@EXTERNAL_IP
          
        Replace the following:
        *   `PATH_TO_PRIVATE_KEY`: the path to your private SSH key file.
        *   `USERNAME`: the username of the user connecting to the instance. If you manage your SSH keys in metadata, the username is what you specified when you created the SSH key. For OS Login accounts, the username is defined in your Google profile.
        *   `EXTERNAL_IP`: The external IP address for your VM.
    *   Connect to your VM using the Google Cloud console or the Google Cloud CLI. When you use these tools to connect, Compute Engine manages key creation for you. For more information, see Connecting to VMs.
*   **Your VM's guest environment is not running.** If this is the first time that you are connecting to your VM and the guest environment is not running, then the VM might refuse your SSH connection request.
    
    To resolve this issue, do the following:
    
    1.  Restart the VM.
    2.  In the Google Cloud console, inspect the system startup logs in the serial port output to determine if the guest environment is running. For more information, see Validating the guest environment.
    3.  If the guest environment is not running, manually install the guest environment by cloning VM's boot disk and using a startup script.
*   **The OpenSSH Daemon (`sshd`) isn't running or configured properly.** The `sshd` provides secure remote access to the system via SSH protocol. If it's misconfigured or not running, you can't connect to your VM via SSH.
    
    **Note:** To troubleshoot the issue with `sshd`, you need to connect to the VM's serial console as the root user.
    
    To resolve this issue, try one or more of the following:
    
    *   Review the user guide for your operating system to ensure that your `sshd_config` is set up correctly.
        
    *   Ensure the you have the required ownership and permission settings for the following:
        
        *   `$HOME` and `$HOME/.ssh` directories
        *   `$HOME/.ssh/authorized_keys` file
        
        ### Ownership
        
        The guest environment stores authorized SSH public keys in the `$HOME/.ssh/authorized_keys` file. The owner of the `$HOME` and `$HOME/.ssh` directories and the `$HOME/.ssh/authorized_keys` file must be the same as the user connecting to the VM.
        
        ### Permissions
        
        The guest environment requires the following Linux permissions:
        
        Path
        
        Permissions
        
        `/home`
        
        `0755`
        
        `$HOME`
        
        `0700` or `0750` or `0755` *
        
        `$HOME/.ssh`
        
        `0700`
        
        `$HOME/.ssh/authorized_keys`
        
        `0600`
        
        * To find out which of the options is the correct default permission for your `$HOME` directory, refer to the official documentation for your specific Linux distribution.
        
        * * *
        
        Alternatively, you can create a new VM based on the same image and check its default permissions for `$HOME`.
        
        To learn how to change permissions and ownership, read about `chmod` and `chown`.
        
    *   Restart the `sshd` by running the following command:
        
        ```
        systemctl restart sshd.service
        ```
        
        Check if there are any errors in the status by running the following command:
        
        ```
        systemctl status sshd.service
        ```
        
        The status output may contain information such as the exit code, the reason for the failure, etc. You can use these details for further troubleshooting.
        
    
*   **The VM's boot disk is full.** When an SSH connection is established, the guest environment adds the session's public SSH key to the `~/.ssh/authorized_keys` file. If the disk is full, the connection fails.
    
    To resolve this issue, do one or more of the following:
    
    *   Confirm the boot disk is full by debugging with the serial console to identify `no space left errors`.
    *   Resize the disk.
    *   If you know which files are using the disk space, create a startup script that deletes unnecessary files and frees space. After the VM starts and you connect to it, delete the `startup-script` metadata.
*   **The permissions or ownership on `$HOME`, `$HOME/.ssh`, or `$HOME/.ssh/authorized_keys` is wrong.**
    
    ### Ownership
    
    The guest environment stores authorized SSH public keys in the `$HOME/.ssh/authorized_keys` file. The owner of the `$HOME` and `$HOME/.ssh` directories and the `$HOME/.ssh/authorized_keys` file must be the same as the user connecting to the VM.
    
    ### Permissions
    
    The guest environment requires the following Linux permissions:
    
    Path
    
    Permissions
    
    `/home`
    
    `0755`
    
    `$HOME`
    
    `0700` or `0750` or `0755` *
    
    `$HOME/.ssh`
    
    `0700`
    
    `$HOME/.ssh/authorized_keys`
    
    `0600`
    
    * To find out which of the options is the correct default permission for your `$HOME` directory, refer to the official documentation for your specific Linux distribution.
    
    * * *
    
    Alternatively, you can create a new VM based on the same image and check its default permissions for `$HOME`.
    
    To learn how to change permissions and ownership, read about `chmod` and `chown`.
    

#### Connection failed

The following errors might occur when you connect to your VM from the Google Cloud console, the gcloud CLI, a bastion host or a local client:

*   The Google Cloud console:
    
    Connection Failed
    
    We are unable to connect to the VM on port 22.
    
*   The gcloud CLI:
    
    ERROR: (gcloud.compute.ssh) [/usr/bin/ssh] exited with return code [255].
    
*   A bastion host or a local client:
    
    port 22: Connection timed out.
    
    port 22: Connection refused
    

These errors can occur for several reasons. The following are some of the most common causes of the errors:

*   **The VM is booting up and `sshd` is not running yet.** You can't connect to a VM before it is running.
    
    To resolve this issue, wait until the VM has finished booting and try to connect again.
    
*   **`sshd` is running on a custom port.** If you configured `sshd` to run on a port other than port 22, you won't be able to connect to your VM.
    
    To resolve this issue, create a custom firewall rule allowing `tcp` traffic on the port that your `sshd` is running on using the following command:
    
    gcloud compute firewall-rules create FIREWALL_NAME \
      --allow tcp:PORT_NUMBER
    
    For more information about creating custom firewall rules, see Creating firewall rules.
    
*   **The SSH firewall rule is missing or doesn't allow traffic from IAP or the public internet.** SSH connections are refused if firewall rules don't allow connections from IAP or TCP ingress traffic for IP range `0.0.0.0/0`.
    
    To resolve this issue, do one of the following:
    
    *   If you use Identity-Aware Proxy (IAP) for TCP forwarding, update your custom firewall rule to accept traffic from IAP, then check your IAM permissions.
        
        1.  Update your custom firewall rule to allow traffic from `35.235.240.0/20`, the IP address range that IAP uses for TCP forwarding. For more information, see Create a firewall rule.
        2.  Grant permissions to use IAP TCP forwarding, if you haven't already done so.
    *   If you don't use IAP update your custom firewall rule to allow ingress SSH traffic.
        
        1.  Update your custom firewall rule to Allow ingress ssh connections to VMs.
*   **The SSH connection failed after you upgraded the VM's kernel.** A VM might experience a kernel panic after a kernel update, causing the VM to become inaccessible.
    
    To resolve this issue, do the following:
    
    1.  Mount the disk to another VM.
    2.  Update the `grub.cfg` file to use the previous version of the kernel.
    3.  Attach the disk to the unresponsive VM.
    4.  Verify that the status of the VM is `RUNNING` by using the `gcloud compute instances describe` command.
    5.  Reinstall the kernel.
    6.  Restart the VM.
    
    Alternatively, if you created a snapshot of the boot disk before upgrading the VM, use the snapshot to create a VM.
    
*   **The OpenSSH Daemon (`sshd`) isn't running or configured properly.** The `sshd` provides secure remote access to the system via SSH protocol. If it's misconfigured or not running, you can't connect to your VM via SSH.
    
    **Note:** To troubleshoot the issue with `sshd`, you need to connect to the VM's serial console as the root user.
    
    To resolve this issue, try one or more of the following:
    
    *   Review the user guide for your operating system to ensure that your `sshd_config` is set up correctly.
        
    *   Ensure the you have the required ownership and permission settings for the following:
        
        *   `$HOME` and `$HOME/.ssh` directories
        *   `$HOME/.ssh/authorized_keys` file
        
        ### Ownership
        
        The guest environment stores authorized SSH public keys in the `$HOME/.ssh/authorized_keys` file. The owner of the `$HOME` and `$HOME/.ssh` directories and the `$HOME/.ssh/authorized_keys` file must be the same as the user connecting to the VM.
        
        ### Permissions
        
        The guest environment requires the following Linux permissions:
        
        Path
        
        Permissions
        
        `/home`
        
        `0755`
        
        `$HOME`
        
        `0700` or `0750` or `0755` *
        
        `$HOME/.ssh`
        
        `0700`
        
        `$HOME/.ssh/authorized_keys`
        
        `0600`
        
        * To find out which of the options is the correct default permission for your `$HOME` directory, refer to the official documentation for your specific Linux distribution.
        
        * * *
        
        Alternatively, you can create a new VM based on the same image and check its default permissions for `$HOME`.
        
        To learn how to change permissions and ownership, read about `chmod` and `chown`.
        
    *   Restart the `sshd` by running the following command:
        
        ```
        systemctl restart sshd.service
        ```
        
        Check if there are any errors in the status by running the following command:
        
        ```
        systemctl status sshd.service
        ```
        
        The status output may contain information such as the exit code, the reason for the failure, etc. You can use these details for further troubleshooting.
        
    
*   **The VM isn't booting and you can't connect using SSH or the serial console.** If the VM is inaccessible, then your OS might be corrupted. If the boot disk doesn't boot, you can diagnose the issue. If you want to recover the corrupted VM and retrieve data, see Recovering a corrupted VM or a full boot disk.
    
*   **The VM is booting in maintenance mode.** When booting in maintenance mode, the VM doesn't accept SSH connections, but you can connect to the VM's serial console and log in as the root user.
    
    To resolve this issue, do the following:
    
    1.  If you haven't set a root password for the VM, use a metadata startup script to run the following command during boot:
        
        echo 'root:NEW_PASSWORD' | chpasswd
        
        Replace NEW_PASSWORD with a password of your choice.
        
    2.  Restart the VM.
        
    3.  Connect to the VM's serial console and log in as the root user.
        

#### Unexpected error

The following error might occur when you try to connect to a Linux VM:

Connection Failed
You cannot connect to the VM instance because of an unexpected error. Wait a few moments and then try again.

This issue can occur for several reasons. The following are some common causes of the error:

*   **The OpenSSH Daemon (`sshd`) isn't running or configured properly.** The `sshd` provides secure remote access to the system via SSH protocol. If it's misconfigured or not running, you can't connect to your VM via SSH.
    
    **Note:** To troubleshoot the issue with `sshd`, you need to connect to the VM's serial console as the root user.
    
    To resolve this issue, try one or more of the following:
    
    *   Review the user guide for your operating system to ensure that your `sshd_config` is set up correctly.
        
    *   Ensure the you have the required ownership and permission settings for the following:
        
        *   `$HOME` and `$HOME/.ssh` directories
        *   `$HOME/.ssh/authorized_keys` file
        
        ### Ownership
        
        The guest environment stores authorized SSH public keys in the `$HOME/.ssh/authorized_keys` file. The owner of the `$HOME` and `$HOME/.ssh` directories and the `$HOME/.ssh/authorized_keys` file must be the same as the user connecting to the VM.
        
        ### Permissions
        
        The guest environment requires the following Linux permissions:
        
        Path
        
        Permissions
        
        `/home`
        
        `0755`
        
        `$HOME`
        
        `0700` or `0750` or `0755` *
        
        `$HOME/.ssh`
        
        `0700`
        
        `$HOME/.ssh/authorized_keys`
        
        `0600`
        
        * To find out which of the options is the correct default permission for your `$HOME` directory, refer to the official documentation for your specific Linux distribution.
        
        * * *
        
        Alternatively, you can create a new VM based on the same image and check its default permissions for `$HOME`.
        
        To learn how to change permissions and ownership, read about `chmod` and `chown`.
        
    *   Restart the `sshd` by running the following command:
        
        ```
        systemctl restart sshd.service
        ```
        
        Check if there are any errors in the status by running the following command:
        
        ```
        systemctl status sshd.service
        ```
        
        The status output may contain information such as the exit code, the reason for the failure, etc. You can use these details for further troubleshooting.
        
*   **Unknown SSH daemon issue**. To diagnose an unknown SSH daemon issue, check the serial console logs for errors.
    
    Depending on the output of the serial console logs, try to rescue the VM and fix the SSH daemon related issues by doing the following:
    
    1.  Attach the disk to another Linux VM.
    2.  Connect to the VM that has the mounted disk.
    3.  Mount the disk inside OS to a directory MOUNT_DIR inside VM..
    4.  View the SSH-related logs, `/var/log/secure` or `/var/log/auth.log` for any issues/errors. If you see any issues that you can fix, attempt to fix them. Otherwise, create a support case and attach the logs.
    5.  Unmount the disk from the OS using `umount` command:
        
        cd ~/
        umount /mnt
        
    6.  Detach the disk from the VM.
        
    7.  Attach the disk to the original VM.
        
    8.  Start the VM.
        

#### Failed to connect to backend

The following errors might occur when you connect to your VM from the Google Cloud console or the gcloud CLI:

*   The Google Cloud console:
    
    -- Connection via Cloud Identity-Aware Proxy Failed
    
    -- Code: 4003
    
    -- Reason: failed to connect to backend
    
*   The gcloud CLI:
    
    ERROR: (gcloud.compute.start-iap-tunnel) Error while connecting [4003: 'failed to connect to backend'].
    

These errors occur when you try to use SSH to connect to a VM that doesn't have a public IP address and for which you haven't configured Identity-Aware Proxy on port 22.

To resolve this issue Create a firewall rule on port 22 that allows ingress traffic from Identity-Aware Proxy.

#### Host key does not match

The following error might occur when you connect to your VM:

Host key for server IP_ADDRESS does not match

This error occurs when the host key in the `~/.ssh/known_hosts` file doesn't match the VM's host key.

To resolve this issue, delete the host key from the `~/.ssh/known_hosts` file, then retry the connection.

#### Metadata value is too large

The following error might occur when you try to add a new SSH key to metadata:

ERROR:"Value for field 'metadata.items[X].value' is too large: maximum size 262144 character(s); actual size NUMBER_OF_CHARACTERS."

Metadata values have a maximum limit of 256 KB. To mitigate this limitation, do one of the following:

*   Delete expired or duplicated SSH keys from project or instance metadata. For more information, see Update metadata on a running VM.
*   Use OS Login.

#### No supported authentication methods available

The following error might occur when you connect to a VM:

No supported authentication methods available (server sent: publickey,gssapi-keyex,gssapi-with-mic)

This error most commonly occurs due to an outdated SSH client. Older SSH clients might lack support for the ECDSA key types and SHA-2 hashing algorithms required by newer VMs.

For example, this error occurs if you try to connect to a Red Hat Enterprise Linux (RHEL) VM using a version of PuTTY older than 0.75.

To resolve this error, update your SSH client to the most recent stable version. After you have updated your SSH client, retry your SSH connection.

#### Connection failures due to custom client-side SSH configuration

Custom settings can unintentionally override the default behaviors expected by `gcloud compute ssh` or standard SSH clients when connecting to Compute Engine instances. This file is typically located at `~/.ssh/config` on Linux and macOS.

The following are symptoms of this issue:

*   You are unable to use SSH to connect to your VM due to errors like `Permission denied (publickey)`, even though the instance is running and your IAM permissions are correct.
*   Other users can connect to the VM.
*   You can connect from a different client machine that doesn't have the same custom SSH configuration.

To diagnose the issue, do the following:

1.  To check your local SSH configuration file, examine the contents of your `~/.ssh/config` file. Look for any `Host` sections that match your VM's hostname or IP address, or global settings (without a `Host` line) that might apply. Check for the following:
    
    *   `PubkeyAcceptedKeyTypes`: if this directive is present, it might restrict the types of public keys allowed, potentially excluding those used by Compute Engine.
    *   `IdentityFile`: this directive might force the use of an incorrect or non-existent private key.
    *   `ProxyCommand`: a proxy might be interfering with the connection.
    *   Other non-standard options like `KexAlgorithms`, `Ciphers` or `HostKeyAlgorithms`.
2.  To test the connection with a verbose output and detailed debugging information, use the `gcloud compute ssh` command with the `--verbosity=debug` and `--ssh-flag="-vv"` options:
    
    ```
    gcloud compute ssh INSTANCE_NAME --zone=ZONE --project=PROJECT_ID --verbosity=debug --ssh-flag="-vv"
    ```
    
    Replace the following:
    
    *   `INSTANCE_NAME`: the name of the instance you want to connect to.
    *   `ZONE`: the zone where the instance is located.
    *   `PROJECT_ID`: the ID of the project containing the instance.
    
    Review the output for messages that indicate key exchange problems, authentication failures, or unexpected key types being offered by the client.
    

To resolve connection failures caused by custom configurations, do the following:

1.  To check if your `~/.ssh/config` is the cause, ignore the local configuration file by using the `-F none` flag. This test is the most reliable way to isolate the issue.
    
    *   For the gcloud CLI:
        
        ```
        gcloud compute ssh INSTANCE_NAME --zone=ZONE --project=PROJECT_ID --ssh-flag="-F none"
        ```
        
    *   For standard `ssh`:
        
        ```
        ssh -F none USERNAME@EXTERNAL_IP
        ```
        
    
    Replace the following:
    
    *   `USERNAME`: your SSH username.
    *   `EXTERNAL_IP`: the external IP address of your VM instance.
    
    If you can connect successfully, the problem lies within your `~/.ssh/config` file.
    

If the tests above confirm that the issue is in your configuration file, follow these steps to fix the problem:

1.  Before you make any changes, create Create a backup of your configuration file.
    
    ```
    cp ~/.ssh/config ~/.ssh/config.bak
    ```
    
2.  To identify the conflicting line. Edit ~/.ssh/config and comment out (by using `#` symbol) any custom settings you suspect are causing the issue. Test the connection after each change to identify the specific line.
    
3.  To ,modify or remove settings, comment out the lines to revert to the client's default supported key types. For example, if `PubkeyAcceptedKeyTypes` is causing the failure, comment it out.
    

**Best practices for client-side configuration:**

*   **Avoid restrictive global settings:** apply specific settings only to the hosts that require the changes, rather than using broad `Host *` sections.
*   **Document changes:** use comments within your config file to explain why specific custom settings were added.
*   **Use `-F none` for testing:** when troubleshooting, you can use `-F none` to rule out all client-side configuration conflicts.

### Windows errors

**Preview — SSH for Windows**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms. Pre-GA features are available "as is" and might have limited support. For more information, see the launch stage descriptions.

#### Permission denied, please try again

The following error might occur when you connect to your VM:

USERNAME@compute.INSTANCE_ID's password:
Permission denied, please try again.

This error indicates the user trying to connect to the VM doesn't exist on the VM. The following are some of the most common causes of this error:

*   **Your version of gcloud CLI is out of date**
    
    If gcloud CLI is out of date, you may be attempting to connect using a username that is not configured. To resolve this issue, update the gcloud CLI.
    
*   **You tried to connect to a Windows VM that doesn't have SSH enabled.**
    
    To resolve this error, set the `enable-windows-ssh` key to `TRUE` in project or instance metadata. For more information about setting medata, see Set custom metadata.
    

#### Permission denied (publickey,keyboard-interactive)

The following error might occur when you connect to a VM that doesn't have SSH enabled:

Permission denied (publickey,keyboard-interactive).

To resolve this error, set the `enable-windows-ssh` key to `TRUE` in project or instance metadata. For more information about setting medata, see Set custom metadata.

#### Could not SSH into the instance

The following error might occur when you connect to your VM from the gcloud CLI:

ERROR: (gcloud.compute.ssh) Could not SSH into the instance.
It is possible that your SSH key has not propagated to the instance yet.
Try running this command again.  If you still cannot connect, verify that the firewall and instance are set to accept ssh traffic.

This error can occur for several reasons. The following are some of the most common causes of the errors:

*   **You tried to connect to a Windows VM that doesn't have SSH installed.**
    
    To resolve this issue, follow the instructions to Enable SSH for Windows on a running VM.
    
*   **The OpenSSH Server (`sshd`) isn't running or isn't configured properly.** The `sshd` provides secure remote access to the system via SSH protocol. If it's misconfigured or not running, you can't connect to your VM via SSH.
    
    To resolve this issue, review OpenSSH Server configuration for Windows Server and Windows to ensure that `sshd` is set up correctly.
    

#### Connection timed out

Timed out SSH connections might be caused by one of the following:

*   **The VM hasn't finished booting.** Allow a short time for the VM to boot.
    
    To resolve this issue, wait until the VM has finished booting and try to connect again.
    
*   **The SSH package isn't installed.** Windows VMs require you to install the `google-compute-engine-ssh` package before you can connect using SSH.
    
    To resolve this issue, install the SSH package.
    

## Diagnose failed SSH connections

The following sections describe steps you can take to diagnose the cause of failed SSH connections and the steps you can take to fix your connections.

Before you diagnose failed SSH connections, complete the following steps:

*   Install or update to the latest version of the Google Cloud CLI.
*   Run connectivity tests.
*   If you are using a custom Linux image that isn't running the guest environment, Install the Linux guest environment.
*   If you use OS Login, view Troubleshooting OS Login.

### Diagnosis methods for Linux and Windows VMs

#### Test connectivity

You might not be able to SSH to a VM instance because of connectivity issues linked to firewalls, network connection, or the user account. Follow the steps in this section to identify any connectivity issues.

##### Check your firewall rules

Compute Engine provisions each project with a default set of firewall rules that permit SSH traffic. If you are unable to access your instance, use the `gcloud compute` command-line tool to check your list of firewalls and ensure that the `default-allow-ssh` rule is present.

On your local workstation, run the following command:

gcloud compute firewall-rules list

If the firewall rule is missing, add it back:

gcloud compute firewall-rules create default-allow-ssh \
    --allow tcp:22

To view all data associated with the `default-allow-ssh` firewall rule in your project, use the `gcloud compute firewall-rules describe` command:

gcloud compute firewall-rules describe default-allow-ssh \
    --project=project-id

For more information about firewall rules, see Firewall rules in Google Cloud.

##### Test the network connection

To determine whether the network connection is working, test the TCP handshake:

1.  Obtain the external `natIP` for your VM:
    
    gcloud compute instances describe VM_NAME \
        --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
    
    Replace `VM_NAME` with the name of the VM you can't connect to.
    
    **Note:** The IP address may vary if you are using IAP to access the instance via the internal IP address. Also, if the IP address is internal, the instance is accessible from inside the VPC network only.
    
2.  Test the network connection to your VM from your workstation:
    
    ### Linux, Windows 2019/2022, and macOS
    
    curl -vso /dev/null --connect-timeout 5 EXTERNAL_IP:PORT_NUMBER
    
    Replace the following:
    
    *   `EXTERNAL_IP`: the external IP address you obtained in the previous step
    *   `PORT_NUMBER`: the port number
    
    If the TCP handshake is successful, the output is similar to the following:
    
    Expire in 0 ms for 6 (transfer 0x558b3289ffb0)
    Expire in 5000 ms for 2 (transfer 0x558b3289ffb0)
    Trying 192.168.0.4...
    TCP_NODELAY set
    Expire in 200 ms for 4 (transfer 0x558b3289ffb0)
    Connected to 192.168.0.4 (192.168.0.4) port 443 (#0)
    > GET / HTTP/1.1
    > Host: 192.168.0.4:443
    > User-Agent: curl/7.64.0
    > Accept: */*
    >
    Empty reply from server
    Connection #0 to host 192.168.0.4 left intact
    
    The `Connected to` line indicates a successful TCP handshake.
    
    ### Windows 2012 and 2016
    
    PS C:> New-Object System.Net.Sockets.TcpClient('EXTERNAL_IP',PORT_NUMBER)
    
    Replace the following:
    
    *   `EXTERNAL_IP`: the external IP you obtained in the previous step
    *   `PORT_NUMBER`: the port number
    
    If the TCP handshake is successful, the output is similar to the following:
    
    Available           : 0
    Client              : System.Net.Sockets.Socket
    Connected           : True
    ExclusiveAddressUse : False
    ReceiveBufferSize   : 131072
    SendBufferSize      : 131072
    ReceiveTimeout      : 0
    SendTimeout         : 0
    LingerState         : System.Net.Sockets.LingerOption
    NoDelay             : False
    
    The `Connected: True` line indicates a successful TCP handshake.
    

If the TCP handshake completes successfully, a software firewall rule is not blocking the connection, the OS is correctly forwarding packets, and a server is listening on the destination port. If the TCP handshake completes successfully but the VM doesn't accept SSH connections, the issue might be with that the `sshd` daemon is misconfigured or not running properly. Review the user guide for your operating system to ensure that your `sshd_config` is set up correctly.

To run connectivity tests for analyzing the VPC network path configuration between two VMs and check whether the programmed configuration should allow the traffic, see Check for misconfigured firewall rules in Google Cloud.

##### Connect as a different user

The issue that prevents you from logging in might be limited to your user account. For example, the permissions on the `~/.ssh/authorized_keys` file on the instance might not be set correctly for the user.

Try logging in as a different user with the gcloud CLI by specifying `ANOTHER_USERNAME` with the SSH request. The gcloud CLI updates the project's metadata to add the new user and allow SSH access.

gcloud compute ssh ANOTHER_USERNAME@VM_NAME

Replace the following:

*   `ANOTHER_USERNAME` is a username other than your own username
*   `VM_NAME` is the name of the VM you want to connect to

#### Debug issues using the serial console

We recommend that you review the logs from the serial console for connection errors. You can access the serial console as the root user from your local workstation by using a browser. This approach is useful when you cannot log in with SSH, or if the instance has no connection to the network. The serial console remains accessible in both of these situations.

To log into the VM's serial console and troubleshoot problems with the VM, follow these steps::

1.  Enable interactive access to the VM's serial console.
    
2.  For Linux VMs, modify the root password, add the following startup script to your VM:
    
    echo root:PASSWORD | chpasswd
    
    Replace PASSWORD with a password of your choice.
    
3.  Use the serial console to connect to your VM.
    
4.  For Linux VMs, after you're done debugging all the errors, disable the root account login:
    
    sudo passwd -l root
    

### Diagnosis methods for Linux VMs

#### Inspect the VM instance without shutting it down

You might have an instance that you cannot connect to that continues to correctly serve production traffic. In this case, you might want to inspect the disk without interrupting the instance.

To inspect and troubleshoot the disk:

1.  Back up your boot disk by creating a snapshot of the disk.
2.  Create a regular persistent disk from that snapshot.
3.  Create a temporary instance.
4.  Attach and mount the regular persistent disk to your new temporary instance.

This procedure creates an isolated network that only allows SSH connections. This setup prevents any unintended consequences of the cloned instance interfering with your production services.

1.  Create a new VPC network to host your cloned instance:
    
    gcloud compute networks create debug-network
    
    Replace `NETWORK_NAME` with the name you want to call your new network.
    
2.  Add a firewall rule to allow SSH connections to the network:
    
    gcloud compute firewall-rules create debug-network-allow-ssh \
       --network debug-network \
       --allow tcp:22
    
3.  Create a snapshot of the boot disk.
    
    gcloud compute disks snapshot BOOT_DISK_NAME \
       --snapshot-names debug-disk-snapshot
    
    Replace `BOOT_DISK_NAME` with the name of the boot disk.
    
4.  Create a new disk with the snapshot you just created:
    
    gcloud compute disks create example-disk-debugging \
       --source-snapshot debug-disk-snapshot
    
5.  Create a new debugging instance without an external IP address:
    
    gcloud compute instances create debugger \
       --network debug-network \
       --no-address
    
6.  Attach the debugging disk to the instance:
    
    gcloud compute instances attach-disk debugger \
       --disk example-disk-debugging
    
7.  Follow the instructions to Connect to a VM using a bastion host.
    
8.  After you have logged into the debugger instance, troubleshoot the instance. For example, you can look at the instance logs:
    
    sudo su -
    
    mkdir /mnt/VM_NAME
    
    mount /dev/disk/by-id/scsi-0Google_PersistentDisk_example-disk-debugging /mnt/VM_NAME
    
    cd /mnt/VM_NAME/var/log
    
    # Identify the issue preventing ssh from working
    ls
    
    Replace `VM_NAME` with the name of the VM you can't connect to.
    

#### Use a startup script

If none of the preceding helped, you can create a startup script to collect information right after the instance starts. Follow the instructions for running a startup script.

Afterward, you also need to reset your instance before the metadata takes effect by using `gcloud compute instances reset`.

Alternatively, you can also recreate your instance by running a diagnostic startup script:

1.  Run `gcloud compute instances delete` with the `--keep-disks` flag.
    
    gcloud compute instances delete VM_NAME \
       --keep-disks boot
    
    Replace `VM_NAME` with the name of the VM you can't connect to.
    
2.  Add a new instance with the same disk and specify your startup script.
    
    gcloud compute instances create NEW_VM_NAME \
       --disk name=BOOT_DISK_NAME,boot=yes \
       --metadata startup-script-url URL
    
    Replace the following:
    
    *   `NEW_VM_NAME` is the name of the new VM you're creating
    *   `BOOT_DISK_NAME` is the name of the boot disk from the VM you can't connect to
    *   `URL` is the Cloud Storage URL to the script, in either `gs://BUCKET/FILE` or `https://storage.googleapis.com/BUCKET/FILE` format.

#### Use your disk on a new instance

If you still need to recover data from your persistent boot disk, you can detach the boot disk and then attach that disk as a secondary disk on a new instance.

1.  Delete the VM you can't connect to and keep its boot disk:
    
    gcloud compute instances delete VM_NAME \
       --keep-disks=boot 
    
    Replace `VM_NAME` with the name of the VM you can't connect to.
    
2.  Create a new VM with your old VM's boot disk. Specify the name of the boot disk of the VM you just deleted.
    
3.  Connect to your new VM using SSH:
    
    gcloud compute ssh NEW_VM_NAME
    
    Replace `NEW_VM_NAME` with the name of your new VM.
    

#### Check whether or not the VM boot disk is full

Your VM might become inaccessible if its boot disk is full. This scenario can be difficult to troubleshoot as it's not always obvious when the VM connectivity issue is due to a full boot disk. For more information about this scenario, see Troubleshooting a VM that is inaccessible due to a full boot disk.

### Diagnosis methods for Windows VMs

**Preview — SSH for Windows**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms. Pre-GA features are available "as is" and might have limited support. For more information, see the launch stage descriptions.

#### Reset SSH metadata

If you can't connect to a Windows VM using SSH, try unsetting the `enable-windows-ssh` metadata key and re-enabling SSH for Windows.

1.  Set the `enable-windows-ssh` metadata key to `FALSE`. For information about how to set metadata, see Set custom metadata.
    
    Wait a few seconds for the change to take place.
    
2.  Re-enable SSH for Windows
    
3.  Reconnect to the VM.
    

#### Connect to the VM using RDP

If you can't diagnose and resolve the cause of failed SSH connections to your Windows VM, connect using RDP.

After you establish a connection to the VM, review the OpenSSH logs.

## What's Next?

*   Learn how SSH connections to Linux VMs work on Compute Engine.

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-06-11 UTC.

*   ### Products and pricing
    
    *   See all products
    *   Google Cloud pricing
    *   Google Cloud Marketplace
    *   Contact sales
*   ### Support
    
    *   Community forums
    *   Support
    *   Release Notes
    *   System status
*   ### Resources
    
    *   GitHub
    *   Getting Started with Google Cloud
    *   Code samples
    *   Cloud Architecture Center
    *   Training and Certification
*   ### Engage
    
    *   Blog
    *   Events
    *   X (Twitter)
    *   Google Cloud on YouTube
    *   Google Cloud Tech on YouTube

*   About Google
*   Privacy
*   Site terms
*   Google Cloud terms
*   Manage cookies
*   Our third decade of climate action: join us
*   Sign up for the Google Cloud newsletter Subscribe

*   English
*   Deutsch
*   Español
*   Español – América Latina
*   Français
*   Indonesia
*   Italiano
*   Português
*   Português – Brasil
*   עברית
*   中文 – 简体
*   中文 – 繁體
*   日本語
*   한국어