# Manage accounts and credentials on Windows VMs

    
    
      
    

    
      
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

# Manage accounts and credentials on Windows VMs Stay organized with collections Save and categorize content based on your preferences.

Windows

By default, Windows virtual machine (VM) instances authenticate by using a username and a password instead of by using SSH. If you don't enable SSH for Windows, you must generate new credentials before connecting to the VM. This document describes how to generate credentials and manage accounts on Windows VMs.

You can also use this process to generate new credentials if you no longer have the original credentials. If you use this process to generate new credentials for existing users, any data that is encrypted with the current credentials, such as encrypted files or stored passwords, might not be retained.

**Caution:** If the VM is running an Active Directory domain controller, generating new credentials can cause the password of an existing domain user to be reset or a new domain user to be created. To prevent credential generation, disable the account manager.

## Accounts disabled by default

The following accounts are built-in to Windows Server and are disabled by default:

*   `Administrator`
*   `Guest`
*   `DefaultAccount`
*   `WDAGUtilityAccount`

For these accounts, the Windows guest agent can reset the credentials. Resetting the credentials won't do the following:

*   Enable a disabled built-in account
*   Set additional policies so that the user can sign in to the VM

The built-in accounts are not guaranteed to have the default names because the local security policy, which is used by many organizations, can rename the accounts. If the accounts were renamed, you can use the original names.

**Caution:** For credential management features to work correctly, you must use English for key account and group names, such as `Administrator` and `Administrators`. The system relies on these specific English names to identify and manage credentials. Using non-English names for these accounts or groups can cause actions such as generating or resetting passwords to fail.

## Before you begin

*   Create a Windows Server VM.
*   Ensure that the instance is online and ready.
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
    

### Required roles

To get the permissions that you need to generate credentials for Windows Server VMs, ask your administrator to grant you the following IAM roles:

*   Compute Instance Admin (v1) (`roles/compute.instanceAdmin.v1`) on the VM or project
*   If your VM uses a service account: Service Account User (`roles/iam.serviceAccountUser`) on the service account or project
    

For more information about granting roles, see Manage access to projects, folders, and organizations.

You might also be able to get the required permissions through custom roles or other predefined roles.

## Generate credentials

Generate credentials for Windows Server VMs by using the Google Cloud console or the Google Cloud CLI.

**Note:** Before you can generate credentials for VMs that you imported to Compute Engine, you must enable the COM4 port in the Windows Device Manager.

### Console

1.  Go to the **VM instances** page.
    
    Go to VM instances
    
2.  Click the Windows Server VM to change the password on.
    
3.  On the **VM instance details** page, in **Remote access**, click **Set Windows password**.
    
4.  In the **Username** field, enter the username to change the password for, or enter a new username to create a new user.
    
5.  Click **Set**.
    

### gcloud

1.  Run the following `gcloud compute reset-windows-password` command:
    
    gcloud compute reset-windows-password VM_NAME
    
    Replace `VM_NAME` with the name of the VM to change the password for.
    
2.  Review the information in the confirmation prompt:
    
    This command creates an account and sets an initial password for the
    user [username] if the account does not already exist.
    If the account already exists, resetting the password can cause the
    LOSS OF ENCRYPTED DATA secured with the current password, including
    files and stored passwords.
    
    For more information, see:
    https://cloud.google.com/compute/docs/operating-systems/windows#reset
    
    Would you like to set or reset the password for [username] (Y/n)?
    
3.  After confirming the previous prompt, review the confirmation of new credentials, which appears as follows:
    
    Resetting and retrieving password for [username] on [instance-name]
    Updated [https://www.googleapis.com/compute/v1/projects/project-name/zones/zone/instances/instance-name].
    ip_address: ip-address
    password:   password
    username:   username
    
4.  You can now connect to the instance by using the new credentials.
    

## Change your password

After you connect to your Windows Server VM, you can use the Windows Command Prompt or the Windows user interface to change your password.

### Command Prompt

Use the `net user` command to change the password.

### Windows Server 2016

1.  After the desktop finishes loading, click the **Start** menu icon.
    
2.  Click **Control Panel**.
    
3.  Under the **User Accounts** icon, click either **Change Account Type** or **Add or remove user accounts**.
    
4.  Select the account that you want to modify.
    
5.  Click **Change the password**.
    
6.  Enter your current password and your new password.
    
7.  Click **Change password** to save your changes.
    

### Windows Server 2019

1.  After the desktop finishes loading, click the **Start** menu icon.
    
2.  Click **Settings**.
    
3.  Click **Accounts**.
    
4.  Click **Sign-in options**.
    
5.  Under **Password**, click **Change**.
    
6.  Enter your current password and click **Next**.
    
7.  Enter your new password in the **New password** field and enter it again in the **Re-enter password** field.
    
8.  Enter a **Password hint**, and click **Next**.
    
9.  Click **Finish**.
    

### Windows Server 2022

1.  After the desktop finishes loading, click the **Start** menu icon.
    
2.  Click **Settings**.
    
3.  Click **Accounts**.
    
4.  Click **Sign-in options**.
    
5.  Click **Password** and click **Change**.
    
6.  Enter your current password and click **Next**.
    
7.  Enter your new password in the **New password** field and enter it again in the **Confirm password** field.
    
8.  Enter a **Password hint**, and click **Next**.
    
9.  Click **Finish**.
    

## Create a local user account

### Command Prompt

Use the `net user` to create a new user.

Example:

   net user USERNAME PASSWORD /add
   

Replace `USERNAME` with your username and `PASSWORD` with your password of choice.

### Windows Server 2016

1.  After the desktop finishes loading, click the **Start** menu icon.
    
2.  Click **Control Panel**.
    
3.  Under the **User Accounts** icon, click either **Change Account Type** or **Add or remove user accounts**.
    
4.  Click **Add a user account**.
    
5.  Set the username, password and password hint, then click **Next**.
    
6.  After an account is created click **Finish**.
    

### Windows Server 2019

1.  After the desktop finishes loading, click the **Start** menu icon.
    
2.  Click **Settings**.
    
3.  Click **Accounts**.
    
4.  Click **Other users**, then **Add someone else on this PC**.
    
5.  Skip all the Microsoft account related steps and click **Add a user without a Microsoft account**.
    
6.  Set the username, password and password hint, then click **Next**.
    

### Windows Server 2022

1.  After the desktop finishes loading, click the **Start** menu icon.
    
2.  Click **Settings**.
    
3.  Click **Accounts**.
    
4.  Click **Other users**, then **Add someone else on this PC**.
    
5.  Skip all the Microsoft account related steps and click **Add a user without a Microsoft account**.
    
6.  Set the username, password and password hint, then click **Next**.
    

## Grant local users Administrator privileges

Adding a local account to the Administrator group will give you administrative privileges on your Windows VM. See more information on `Local Accounts`.

**Caution:** For credential management features to work correctly, you must use English for key account and group names, such as `Administrator` and `Administrators`. The system relies on these specific English names to identify and manage credentials. Using non-English names for these accounts or groups can cause actions such as generating or resetting passwords to fail.

### Command Prompt

Use the `net localgroup` to add a user to the Administrator group.

Example:

   net localgroup administrators USERNAME /add
   

Replace `USERNAME` with the username of choice.

**Note:** Replace `/add` with `/delete` if you want to remove a user from the local administrator group.

### Windows Server 2016

1.  After the desktop finishes loading, click the **Start** menu icon.
    
2.  Click **Control Panel**.
    
3.  Under the **User Accounts** icon, click either **Change Account Type** or **Add or remove user accounts**.
    
4.  Select the account that you want to change.
    
5.  Click **Change the account type**.
    
6.  Select **Administrator** and confirm by clicking **Change Account Type**.
    

### Windows Server 2019

1.  After the desktop finishes loading, click the **Start** menu icon.
    
2.  Click **Settings**.
    
3.  Click **Accounts**.
    
4.  Click **Other users** then click the account that you want to change.
    
5.  Click **Change account type**.
    
6.  From the drop-down, select the **Administrator** account type and click **OK**.
    

### Windows Server 2022

1.  After the desktop finishes loading, click the **Start** menu icon.
    
2.  Click **Settings**.
    
3.  Click **Accounts**.
    
4.  Click **Other users** then click the account that you want to change.
    
5.  Click **Change account type**.
    
6.  From the drop-down, select the **Administrator** account type and click **OK**.
    

## What's next

*   Troubleshoot Windows VMs
*   Connect to a Windows instance
*   Automate Windows password generation

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