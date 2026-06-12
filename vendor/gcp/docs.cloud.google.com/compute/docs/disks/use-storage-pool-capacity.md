# Add disks from a Hyperdisk pool to VMs

    
    
      
    

    
      
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

# Add disks from a Hyperdisk pool to VMs Stay organized with collections Save and categorize content based on your preferences.

This document describes how to create disks in a pool.

You can create a disk in a pool and then attach the disk to a virtual machine (VM) instance, or you can create disks in the pool when you create a VM instance.

You can't move an existing disk into or out of a pool. You must create a new disk from the existing disk. To do so, see Change the type, placement, or location of a disk.

## Before you begin

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
    
    ### Go
    
    To use the Go samples on this page in a local development environment, install and initialize the gcloud CLI, and then set up Application Default Credentials with your user credentials.
    
    1.  Install the Google Cloud CLI.
        
    2.  If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
        
    3.  If you're using a local shell, then create local authentication credentials for your user account:
        
        gcloud auth application-default login
        
        You don't need to do this if you're using Cloud Shell.
        
        If an authentication error is returned, and you are using an external identity provider (IdP), confirm that you have signed in to the gcloud CLI with your federated identity.
        
    
    For more information, see Set up authentication for a local development environment.
    
    ### Java
    
    To use the Java samples on this page in a local development environment, install and initialize the gcloud CLI, and then set up Application Default Credentials with your user credentials.
    
    1.  Install the Google Cloud CLI.
        
    2.  If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
        
    3.  If you're using a local shell, then create local authentication credentials for your user account:
        
        gcloud auth application-default login
        
        You don't need to do this if you're using Cloud Shell.
        
        If an authentication error is returned, and you are using an external identity provider (IdP), confirm that you have signed in to the gcloud CLI with your federated identity.
        
    
    For more information, see Set up authentication for a local development environment.
    
    ### Node.js
    
    To use the Node.js samples on this page in a local development environment, install and initialize the gcloud CLI, and then set up Application Default Credentials with your user credentials.
    
    1.  Install the Google Cloud CLI.
        
    2.  If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
        
    3.  If you're using a local shell, then create local authentication credentials for your user account:
        
        gcloud auth application-default login
        
        You don't need to do this if you're using Cloud Shell.
        
        If an authentication error is returned, and you are using an external identity provider (IdP), confirm that you have signed in to the gcloud CLI with your federated identity.
        
    
    For more information, see Set up authentication for a local development environment.
    
    ### REST
    
    To use the REST API samples on this page in a local development environment, you use the credentials you provide to the gcloud CLI.
    
    Install the Google Cloud CLI.
    
    If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
    
    For more information, see Authenticate for using REST in the Google Cloud authentication documentation.
    

### Required roles and permissions

To get the permissions that you need to create a Hyperdisk Balanced or Hyperdisk Throughput disk in a pool, ask your administrator to grant you the following IAM roles on the project:

*   Compute Instance Admin (v1) (`roles/compute.instanceAdmin.v1`)
*   To connect to a VM instance that can run as a service account: Service Account User (v1) (`roles/iam.serviceAccountUser` role)

For more information about granting roles, see Manage access to projects, folders, and organizations.

These predefined roles contain the permissions required to create a Hyperdisk Balanced or Hyperdisk Throughput disk in a pool. To see the exact permissions that are required, expand the **Required permissions** section:

#### Required permissions

The following permissions are required to create a Hyperdisk Balanced or Hyperdisk Throughput disk in a pool:

*   To create disks in a pool and attach the disks to a VM instance:
    *   `compute.disks.create` on the project
    *   `compute.instances.attachDisk` on the VM
    *   `compute.disks.use` on the volume that you want to attach to the VM
    *   `compute.storagePools.use` on the pool you're creating disks in
*   To format and mount the attached volume: `compute.instances.setMetadata` on the VM

You might also be able to get these permissions with custom roles or other predefined roles.

For the permissions needed to create an instance, see Required permissions.

## Limitations

Limitations for adding disks to a pool:

*   You can create only Hyperdisk Balanced disks in a Hyperdisk Balanced pool, and you can create only Hyperdisk Throughput disks in a Hyperdisk Throughput pool
*   Only new disks in the same project and zone can be created in a pool.
*   Pools don't support regional disks.
*   You can't move disks in or out of a pool. To move a disk in or out of a pool, you have to recreate the disk from a snapshot. For more information, see Change the disk type.
*   To create boot disks in a pool, you must use a Hyperdisk Balanced Storage Pool or Hyperdisk Balanced Exapool.

Limitations specific to Storage Pools:

*   You can create up to 10,000 disks in a Storage Pool.

Limitations specific to Exapools:

*   You can create up to 500,000 disks in an Exapool.

## Provisioning options

Depending on the provisioning type for the pool, you can choose how to provision both the capacity and the performance of each the disk that you create in the pool.

### Provisioning disk capacity

If you're using an Exapool or an advanced capacity Storage Pool, you can create disks in the pool with a cumulative size that exceeds the provisioned capacity of the pool. The used capacity of the pool is defined by the total data in use and not by the amount of disk space that you've provisioned. You can provision disks with an aggregate capacity of up to five or 50 times the provisioned capacity of an Advanced capacity pool or Hyperdisk Exapool, respectively.

If you are creating disks in a Standard capacity pool, then you create disks in the pool until the total size of all disks in the pool reaches the pool's provisioned capacity. The disks in a pool with Standard capacity behave similarly to non-pool disks, where capacity is consumed when you create the disks.

### Provisioning performance

**Note:** If you're using a Hyperdisk Exapool, the amount of performance you can provision for disks depends on the pool's provisioned write performance.

If you're using an Exapool or an advanced capacity Storage Pool, you can create disks in the pool with a cumulative amount of IOPS and throughput that exceeds the provisioned performance of the pool. The used performance of the pool is defined by the total performance used by the disks and not by the amount of performance provisioned to each disk.

*   For Storage Pools, you can provision disks with an aggregate performance of up to 500%% of the provisioned performance of an Advanced performance pool.
    
*   For Exapools, you can provision disks with an aggregate performance of up to 50x the pool's provisioned write performance.
    

If you're creating disks in a Standard performance pool, the IOPS or throughput that you provision for a disk must be less than the available IOPS or throughput in the Hyperdisk Storage Pool. The available IOPS or throughput is the provisioned amount for the pool minus the used amount for all the disks created in the pool.

If any of the conditions in the previous paragraph aren't true, then the request to create a disk in the pool fails and the disk isn't created.

**Example**

Assume that you have a Hyperdisk Balanced Storage Pool with 100,000 provisioned IOPS.

With Standard performance provisioning:

*   You can provision up to 100,000 of aggregate IOPS when creating Hyperdisk Balanced disks in the Storage Pool.
*   You are charged for the 100,000 IOPS of Hyperdisk Balanced Storage Pool provisioned performance.
*   Like disks created outside of a storage pool, Hyperdisk Balanced disks in Standard performance Storage Pools are automatically provisioned with up to 3,000 baseline IOPS and 140 MiB/s of baseline throughput. This baseline performance isn't counted against the provisioned performance for the Storage Pool. Only when you add disks to the Storage Pool with provisioned performance that's above the baseline does it count against the provisioned performance for the Storage Pool, for example:
    
    *   A disk provisioned with 3,000 IOPS uses 0 pool IOPS and the pool still has 100,000 provisioned IOPS available for other disks.
    *   A disk provisioned with 13,000 IOPS uses 10,000 pool IOPS and the pool has 90,000 provisioned IOPS remaining that you can allocate to other disks in the Storage Pool.

With Advanced performance provisioning:

*   You can provision up to 500,000 IOPS of aggregate Hyperdisk performance when creating disks in the Storage Pool.
*   You are charged for 100,000 IOPS provisioned by the Storage Pool.
*   If you create a single disk (`Disk1`) in the Storage Pool that has 5,000 IOPS, you don't consume any IOPS from the Storage Pool provisioned IOPS. However, the amount of IOPS that you can provision to new disks created in the Storage Pool is now 495,000.
*   If `Disk1` starts to read and write data, and if it uses its maximum of 5,000 IOPS in a given minute, then 5,000 IOPS is consumed from the Storage Pool provisioned IOPS. Any other disks that you created in the same storage pool can use an aggregated maximum of 95,000 IOPS in that same minute without running into contention.

## Create disks in the pool

You can use the Google Cloud console, Google Cloud CLI, or REST to create a disk in a pool.

### Console

Using the Google Cloud console, you can create a new disk in a pool either through the **Storage pools** page or the **Disks** page.

On the **Storage pools** page:

1.  In the Google Cloud console, go to the **Storage pools** page.
    
    Go to the **Storage pools** page
    
2.  Select the tab for **Exapools** or **Storage Pools**.
    
3.  Click the name of the pool that you would like to create a disk in.
    
4.  On the **Manage storage pool** page, click **+Create New Disk**.
    
5.  In the **Add new disk** panel, enter a **Name** for the disk.
    
6.  Specify or change any values for which you don't want to use the default value.
    
7.  When finished specifying the disk properties, click **Save**.
    
8.  On the **Manage storage pool** page, you should see the new disk listed in the **Storage pool disks** section.
    

On the **Create Disk** page:

1.  In the Google Cloud console, go to **Disks** > **Create a disk** page.
    
    Go to the Create a disk page
    
2.  Enter a **Name** for the disk.
    
3.  Select the zone that contains the pool you want to create the disk in.
    
4.  For the **Disk type**, choose the disk type that matches the pool, either Hyperdisk Throughput or Hyperdisk Balanced.
    
5.  Modify the values in the **Size**, **Provisioned IOPS**, and **Provisioned Throughput** fields, as necessary.
    
6.  In the **Storage pool** section, select **Enable storage pool**, then choose the name of the pool to create the disk in. Only pool that exist in the selected zone appear in the list.
    
7.  When finished specifying the disk information, click **Create**.
    

### gcloud

To create one or more disks in a pool, use the `gcloud compute disks create` command.

gcloud compute disks create DISK_NAME \
    --zone=ZONE \
    --storage-pool=STORAGE_POOL_NAME \
    --size=SIZE \
    --type=DISK_TYPE \
    --provisioned-iops=PROVISIONED_IOPS \
    --provisioned-throughput=PROVISIONED_THROUGHPUT

Replace the following:

*   DISK_NAME: a unique name for the disk. You can provide a list of disk names specified by spaces to create multiple disks with the same attributes.
*   ZONE: the zone where the pool was created. Specify this value in region-zone format, for example `us-central1-a`.
*   STORAGE_POOL_NAME: the name of the pool to create the disk in
*   SIZE: Optional: the provisioned capacity of the new disk. The value must be a whole number followed by a size unit of GB for gibibyte, or TB for tebibyte. If no size is specified, 100 GB is used as the default value.
*   DISK_TYPE: the type of disk to create. This must match the type of the Hyperdisk Storage Pool, either `hyperdisk-balanced` or `hyperdisk-throughput`.
*   PROVISIONED_IOPS: Optional: the IOPS to provision for the disk. You can use this flag only with Hyperdisk Balanced disks.
*   PROVISIONED_THROUGHPUT: Optional: the throughput in MiB/s to provision for the disk.

### REST

To create one or more disks in a pool, construct a `POST` using the `disks.insert` method. Include the `name`, `sizeGb`, `type`, `storagePool`, `provisionedIops`, and `provisionedThroughput` properties. To create this disk as an empty and unformatted non-boot disk, don't specify a source image or a source snapshot.

POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/disks

{
    "name": "DISK_NAME",
    "description": "DESCRIPTION",
    "type": "https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/diskTypes/DISK_TYPE",
    "sizeGb": "DISK_SIZE",
    "storagePool": "STORAGE_POOL_NAME",
    "provisionedIops": "IOPS_LIMIT",
    "provisionedThroughput": "THROUGHPUT_LIMIT",
}

Replace the following:

*   PROJECT_ID: the project ID
*   ZONE: the zone in which the pool is located, for example, `us-central1-a`. This is the zone that the disk will be created in.
*   DISK_NAME: a unique name for the disk.
*   DESCRIPTION: Optional: a text string that describes the disk.
*   DISK_TYPE: the type of disk, which must match the pool type. Use either `hyperdisk-throughput` or `hyperdisk-balanced`.
*   DISK_SIZE: Optional: The size of the new disk. The value must be a whole number followed by a size unit of GB for gibibytes or TB for tebibytes. If no size is specified, 100 GB is used as the default value.
*   STORAGE_POOL_NAME: the name of the pool to create the disk in.
*   IOPS_LIMIT: Optional: the IOPS to provision for the disk. You can use this flag only with Hyperdisk Balanced disks.
*   THROUGHPUT_LIMIT: Optional: The throughput in MiB/s to provision for the disk.

### Go

```

// createDiskInStoragePool creates a new Hyperdisk in the specified storage pool.
func createDiskInStoragePool(w io.Writer, projectId, zone, diskName, storagePoolName, diskType string) error {
	// Example usage:
	//   projectID := "your_project_id"
	//   zone := "europe-central2-b"
	//   diskName := "your_disk_name"
	//   storagePoolName := "https://www.googleapis.com/compute/v1/projects/your_project_id/zones/europe-central2-b/storagePools/your_storage_pool"
	//   diskType := "zones/europe-central2-b/diskTypes/hyperdisk-balanced"

	ctx := context.Background()
	client, err := compute.NewDisksRESTClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDisksRESTClient: %v", err)
	}
	defer client.Close()

	// Create the disk resource
	disk := &computepb.Disk{
		Name:                  proto.String(diskName),
		Type:                  proto.String(diskType),
		SizeGb:                proto.Int64(50),
		Zone:                  proto.String(zone),
		StoragePool:           proto.String(storagePoolName),
		ProvisionedIops:       proto.Int64(10000),
		ProvisionedThroughput: proto.Int64(1024),
	}

	// Create the insert disk request
	req := &computepb.InsertDiskRequest{
		Project:      projectId,
		Zone:         zone,
		DiskResource: disk,
	}

	// Send the insert disk request
	op, err := client.Insert(ctx, req)
	if err != nil {
		return fmt.Errorf("Insert disk request failed: %v", err)
	}

	// Wait for the insert disk operation to complete
	if err = op.Wait(ctx); err != nil {
		return fmt.Errorf("unable to wait for the operation: %w", err)
	}

	fmt.Fprintf(w, "Disk created in storage pool: %v\n", disk.Name)
	return nil
}
```

### Java

```

import com.google.cloud.compute.v1.Disk;
import com.google.cloud.compute.v1.DisksClient;
import com.google.cloud.compute.v1.InsertDiskRequest;
import com.google.cloud.compute.v1.Operation;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateDiskInStoragePool {
  public static void main(String[] args)
          throws IOException, ExecutionException, InterruptedException, TimeoutException {
    // TODO(developer): Replace these variables before running the sample.
    // Project ID or project number of the Google Cloud project you want to use.
    String projectId = "YOUR_PROJECT_ID";
    // Name of the zone in which you want to create the disk.
    String zone = "europe-central2-b";
    // Name of the disk you want to create.
    String diskName = "YOUR_DISK_NAME";
    // Link to the storagePool you want to use. Use format :
    // https://www.googleapis.com/compute/v1/projects/%s/zones/%s/storagePools/%s"
    String storagePoolName = "YOUR_STORAGE_POOL_LINK";
    // The type of disk you want to create. This value uses the following format:
    // "zones/{zone}/diskTypes/(hyperdisk-balanced|hyperdisk-throughput)".
    // For example: "zones/us-west3-b/diskTypes/hyperdisk-balanced"
    String diskType = String.format("zones/%s/diskTypes/hyperdisk-balanced", zone);
    // Size of the new disk in gigabytes.
    long diskSizeGb = 10;
    // Optional: the IOPS to provision for the disk.
    // You can use this flag only with Hyperdisk Balanced disks.
    long provisionedIops = 3000;
    // Optional: the throughput in mebibyte (MB) per second to provision for the disk.
    long provisionedThroughput = 140;

    createDiskInStoragePool(projectId, zone, diskName, storagePoolName, diskType,
            diskSizeGb, provisionedIops, provisionedThroughput);
  }

  // Creates a hyperdisk in the storage pool
  public static Disk createDiskInStoragePool(String projectId, String zone, String diskName,
                                             String storagePoolName, String diskType,
                                             long diskSizeGb, long iops, long throughput)
          throws IOException, ExecutionException, InterruptedException, TimeoutException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests.
    try (DisksClient client = DisksClient.create()) {
      // Create a disk.
      Disk disk = Disk.newBuilder()
              .setZone(zone)
              .setName(diskName)
              .setType(diskType)
              .setSizeGb(diskSizeGb)
              .setStoragePool(storagePoolName)
              .setProvisionedIops(iops)
              .setProvisionedThroughput(throughput)
              .build();

      InsertDiskRequest request = InsertDiskRequest.newBuilder()
              .setProject(projectId)
              .setZone(zone)
              .setDiskResource(disk)
              .build();

      // Wait for the insert disk operation to complete.
      Operation operation = client.insertAsync(request).get(1, TimeUnit.MINUTES);

      if (operation.hasError()) {
        System.out.println("Disk creation failed!");
        throw new Error(operation.getError().toString());
      }

      // Wait for server update
      TimeUnit.SECONDS.sleep(10);

      Disk hyperdisk = client.get(projectId, zone, diskName);

      System.out.printf("Hyperdisk '%s' has been created successfully", hyperdisk.getName());

      return hyperdisk;
    }
  }
}
```

### Node.js

```
// Import the Compute library
const computeLib = require('@google-cloud/compute');
const compute = computeLib.protos.google.cloud.compute.v1;

// Instantiate a diskClient
const disksClient = new computeLib.DisksClient();
// Instantiate a zoneOperationsClient
const zoneOperationsClient = new computeLib.ZoneOperationsClient();

/**
 * TODO(developer): Update/uncomment these variables before running the sample.
 */
// Project ID or project number of the Google Cloud project you want to use.
const projectId = await disksClient.getProjectId();

// The zone where your VM and new disk are located.
// zone = 'us-central1-a';

// The name of the new disk
// diskName = 'disk-from-pool-name';

// The name of the storage pool
// storagePoolName = 'storage-pool-name';

// Link to the storagePool you want to use. Use format:
// https://www.googleapis.com/compute/v1/projects/{projectId}/zones/{zone}/storagePools/{storagePoolName}
const storagePool = `https://www.googleapis.com/compute/v1/projects/${projectId}/zones/${zone}/storagePools/${storagePoolName}`;
// The type of disk. This value uses the following format:
// "zones/{zone}/diskTypes/(hyperdisk-balanced|hyperdisk-extreme|hyperdisk-ml|hyperdisk-throughput)".
// For example: "zones/us-west3-b/diskTypes/hyperdisk-balanced"
const diskType = `zones/${zone}/diskTypes/hyperdisk-balanced`;
// Size of the new disk in gigabytes.
const diskSizeGb = 10;
// Optional: For Hyperdisk Balanced or Hyperdisk Extreme disks,
// this is the number of I/O operations per second (IOPS) that the disk can handle.
const provisionedIops = 3000;
// Optional: For Hyperdisk Balanced or Hyperdisk Throughput volumes,
// this is an integer that represents the throughput,
// measured in MiB per second, that the disk can handle.
const provisionedThroughput = 140;

async function callCreateComputeHyperdiskFromPool() {
  // Create a disk
  const disk = new compute.Disk({
    sizeGb: diskSizeGb,
    name: diskName,
    type: diskType,
    zone,
    storagePool,
    provisionedIops,
    provisionedThroughput,
  });

  const [response] = await disksClient.insert({
    project: projectId,
    zone,
    diskResource: disk,
  });

  let operation = response.latestResponse;

  // Wait for the create disk operation to complete.
  while (operation.status !== 'DONE') {
    [operation] = await zoneOperationsClient.wait({
      operation: operation.name,
      project: projectId,
      zone: operation.zone.split('/').pop(),
    });
  }

  console.log(`Disk: ${diskName} created.`);
}

await callCreateComputeHyperdiskFromPool();
```

Aftering creating the disk, you can attach the disk to a VM.

## Create a VM that uses disks in the pool

When you create a VM, you configure a boot disk, and you can optionally create additional data (non-boot) disks, which are automatically attached to the VM. The following sections explain how to create each type of disk in a pool as part of the VM creation process.

### Create the boot disk for a VM in a pool

To create a VM that uses a boot disk in a pool, you must first create a Hyperdisk Balanced Storage Pool or Hyperdisk Balanced Exapool. You can then create an instance using a machine type that supports Hyperdisk Balanced disks. The machine type, disk type, and pool must all be available in the zone that you choose.

### Console

1.  In the Google Cloud console, go to the **VM Instances** page.
    
    Go to VM instances
    
2.  Click **Create Instance**.
    
3.  Enter a name for the instance.
    
4.  Set the zone to the same zone where the pool is located.
    
5.  Choose a machine type that supports Hyperdisk Balanced, for example H3.
    
6.  In the **Boot disk** section, click **Change**.
    
7.  In the **Boot disk** panel, set the **Boot disk type** to Hyperdisk Balanced.
    
8.  Configure the properties for the disk.
    
9.  Expand **Show advanced configuration**.
    
10.  Under the heading **Storage pool**, select **Enable storage pool**.
     
11.  Choose the pool to create the disk in from the list.
     
12.  When finished with the disk configuration, click **Select**.
     
13.  Finish configuring the VM properties.
     
14.  Click **Create**.
     
     The console creates the VM in the specified zone, and creates the boot disk in the selected pool.
     

### gcloud

You can create the boot disk for a new VM in the pool using the `gcloud compute instances create` command and including the `storage-pool` property for the boot disk.

gcloud compute instances create VM_NAME \
    --zone=ZONE \
    --machine-type=MACHINE_TYPE \
    --create-disk=boot=yes,type=hyperdisk-balanced,size=DISK_SIZE,provisioned-throughput=THROUGHPUT, \
    provisioned-iops=IOPS,image=projects/IMAGE_PROJECT/global/images/IMAGE, \
    storage-pool=STORAGE_POOL_NAME

Replace the following:

*   VM_NAME: the name of the VM.
*   ZONE: the region and zone to create the VM in, using the format `us-central1-a`.
*   MACHINE_TYPE: the machine type of the VM, for example, `m3-ultramem-32`.
*   DISK_SIZE: the size, in GiB, of the boot disk
*   THROUGHPUT: the throughput to provision for the disk
*   IOPS: the IOPS to provision for the disk
*   IMAGE_PROJECT: the project that contains the image
*   IMAGE: specify one of the following:
    *   A specific version of the OS image—for example, `debian-12-bookworm-v20240213`.
    *   An image family, which must be formatted as `family/IMAGE_FAMILY`. This creates the instance from the most recent, non-deprecated OS image. For example, if you specify `family/debian-12`, Compute Engine creates a VM using the latest version of the OS image in the `debian-12` image family. For more information about using image families, see Image families best practices.
*   STORAGE_POOL_NAME: the name of the storage pool to create the new disk in.

### REST

You can create the boot disk for a new VM in the pool by constructing a `POST` request for the `instances.insert` method and including the `storagePool` property for the boot disk.

POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances

{
   "name": "VM_NAME",
   "machineType": "zones/ZONE/machineTypes/MACHINE_TYPE",
   "disks": [
      {
         "deviceName": "BOOT_DISK_DEVICE_NAME",
         "initializeParams": {
            "diskSizeGb": "DISK_SIZE",
            "diskType": "DISK_TYPE",
            "sourceImage": "projects/IMAGE_PROJECT/global/images/IMAGE"
            "boot": true,
            "provisionedIops": "IOPS_LIMIT",
            "provisionedThroughput": "THROUGHPUT_LIMIT",
            "storagePool": "POOL_URL"
         }
      }
   ]
}

Replace the following:

*   PROJECT_ID: the project ID
*   ZONE: the zone in which the pool is located, for example, `us-central1-a`. This is the zone that VM and boot disk are created in.
*   VM_NAME: the name of the VM.
*   MACHINE_TYPE: the machine type of the VM, for example, `m3-ultramem-32`.
*   BOOT_DISK_DEVICE_NAME: the device name for the boot disk
*   DISK_SIZE: the size, in GiB, of the boot disk
*   DISK_TYPE: the disk type, specified as a URI
*   IMAGE_PROJECT: the project that contains the image
*   IMAGE: specify one of the following:
    *   A specific version of the OS image—for example, `debian-12-bookworm-v20240213`.
    *   An image family, which must be formatted as `family/IMAGE_FAMILY`. This creates the instance from the most recent, non-deprecated OS image. For example, if you specify `family/debian-12`, Compute Engine creates a VM using the latest version of the OS image in the `debian-12` image family. For more information about using image families, see Image families best practices.
*   IOPS_LIMIT: the IOPS to provision for the disk
*   THROUGHPUT_LIMIT: the throughput to provision for the disk
*   POOL_URL: the storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. For example, the following are valid values:
    *   `https://www.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/storagePools/STORAGE_POOL_NAME`
    *   `projects/PROJECT_ID/zones/ZONE/storagePools/STORAGE_POOL_NAME`
    *   `zones/ZONE/storagePools/STORAGE_POOL_NAME`

### Create additional disks in a pool during VM creation

When creating disks in a pool during VM creation, the machine type, disk type, and pool must be available in the zone that you choose.

### Console

Use the following steps to use the console to create a new VM with additional, non-boot disks:

1.  In the Google Cloud console, go to the **VM Instances** page.
    
    Go to VM instances
    
2.  Click **Create Instance**.
    
3.  Enter a name for the VM.
    
4.  Set the zone to the same zone where the pool is located.
    
5.  Choose a machine type that supports disk type used by the pool.
    
6.  Expand the **Advanced options** section.
    
7.  Expand **Disks**.
    
8.  Click add **Add new disk**.
    
9.  In the **Add new disk** panel, enter the information for the disk. Set the **Disk type** to match the pool type.
    
10.  In the **Storage Pool** section, select **Enable storage pool**.
     
11.  In the **Select a storage pool** field, select the pool to create the disk in.
     
12.  When finished with the disk configuration, click **Save**.
     
13.  Finish configuring the VM properties.
     
14.  Click **Create**.
     
     The console creates the VM in the specified zone, and creates the non-boot disk in the selected pool.
     

### gcloud

You can create new disks in a pool during VM creation by using the `gcloud compute instances create` command and including the `storage-pool` property for the disk.

gcloud compute instances create VM_NAME \
    --zone=ZONE \
    --machine-type=MACHINE_TYPE \
    --create-disk=auto-delete=yes,boot=yes,device-name=BOOT_DISK_DEVICE_NAME,image=IMAGE_NAME, \
    size=BOOT_DISK_SIZE,type=BOOT_DISK_TYPE
    --create-disk=auto-delete=yes,boot=no,device-name=DATA_DISK_DEVICE_NAME,size=DATA_DISK_SIZE, \
    type=DATA_DISK_TYPE,provisioned-iops=IOPS,provisioned-throughput=THROUGHPUT, \
    storage_pool=STORAGE_POOL_NAME

Replace the following:

*   VM_NAME: the name of the VM.
*   ZONE: the region and zone to creat the VM in, using the format `us-central1-a`
*   MACHINE_TYPE: the machine type of the VM
*   BOOT_DISK_DEVICE_NAME: the device name for the boot disk
*   IMAGE_NAME: the name of the operating system image to install on the boot disk, for example, `debian-12-bookworm-v20240213`
*   BOOT_DISK_SIZE: the size, in GiB, of the boot disk
*   BOOT_DISK_TYPE: the disk type
*   DATA_DISK_DEVICE_NAME: the disk device name for the data disk
*   DATA_DISK_SIZE: the size of the data disk, in GiB
*   DATA_DISK_TYPE: the data disk type, either `hyperdisk-balanced` or `hyperdisk-throughput`
*   IOPS: the IOPS to provision for the disk
*   THROUGHPUT: the throughput to provision for the disk
*   STORAGE_POOL_NAME: the unique name for the pool that you want to create the disk in.

### REST

You can create new disks in a pool during VM creation by constructing a `POST` request for the `instances.insert` method and including the `storagePool` property for the additional disks.

POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances

{
   "name": "VM_NAME",
   "machineType": "zones/ZONE/machineTypes/MACHINE_TYPE",
   "disks": [
      {
        "initializeParams":{
            "sourceImage":"projects/IMAGE_PROJECT/global/images/IMAGE"
        },
        "boot":true
      },
      {
        "deviceName": "DEVICE_NAME",
        "boot":false,
        "initializeParams": {
           "diskSizeGb": "DISK_SIZE",
           "diskType": "DISK_TYPE",
           "sourceImage": "projects/IMAGE_PROJECT/global/images/IMAGE"
           "provisionedIops": "IOPS_LIMIT",
           "provisionedThroughput": "THROUGHPUT_LIMIT",
           "storagePool": "POOL_URL"
        }
      }
   ]
}

Replace the following:

*   PROJECT_ID: the project ID
*   ZONE: the zone in which the pool is located, for example, `us-central1-a`. This is the zone that VM and boot disk are created in.
*   VM_NAME: the name of the VM.
*   MACHINE_TYPE: the machine type of the VM, for example, `m3-ultramem-32`.
*   IMAGE_PROJECT: the project that contains the image
*   IMAGE: specify one of the following:
    *   A specific version of the OS image—for example, `debian-12-bookworm-v20240213`.
    *   An image family, which must be formatted as `family/IMAGE_FAMILY`. This creates the instance from the most recent, non-deprecated OS image. For example, if you specify `family/debian-12`, Compute Engine creates a VM using the latest version of the OS image in the `debian-12` image family. For more information about using image families, see Image families best practices.
*   DEVICE_NAME: the device name for the data disk
*   DISK_SIZE: the size, in GiB, of the data disk
*   DISK_TYPE: the disk type, specified as a URI
*   IOPS_LIMIT: the IOPS to provision for the disk
*   THROUGHPUT_LIMIT: the throughput to provision for the disk
*   POOL_URL: the storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. For example, the following are valid values:
    *   `https://www.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/storagePools/STORAGE_POOL_NAME`
    *   `projects/PROJECT_ID/zones/ZONE/storagePools/STORAGE_POOL_NAME`
    *   `zones/ZONE/storagePools/STORAGE_POOL_NAME`

## Use pool in an instance template

The instance templates used to create managed instance groups (MIGs) can contain the pool information. The disks created using the instance template are placed in the specified pool.

### Console

1.  In the Google Cloud console, go to the **Instance templates** page.
    
    Go to Instance templates
    
2.  Click **Create Instance Template**.
    
3.  Enter a name for the instance template.
    
4.  Choose **Regional** for the location, and in the **Region** field, choose the region where the pool is located.
    
5.  Choose a machine type that supports Hyperdisk Balanced, for example C3.
    
6.  In the **Boot disk** section, click **Change**.
    
7.  In the **Boot disk** panel, set the **Boot disk type** to Hyperdisk Balanced.
    
8.  Configure the properties for the disk.
    
9.  Expand **Show advanced configuration**.
    
10.  Under the heading **Storage pool**, select **Enable storage pool**.
     
11.  Choose the pool to create the disk in from the list.
     
12.  When finished with the disk configuration, click **Select**.
     
13.  Finish configuring the VM properties.
     
14.  Click **Create**.
     
     The template creates the VM in the specified zone, and creates the boot disk in the selected pool.
     

### gcloud

You can specify in an instance template that the book disk be created in a pool by using the `gcloud compute instance-templates create` command and including the `storage-pool` property for the boot disk.

gcloud compute instance-templates create TEMPLATE_NAME \
    --instance-template-region=REGION \
    --machine-type=MACHINE_TYPE \
    --create-disk=boot=yes,type=hyperdisk-balanced,size=DISK_SIZE,provisioned-throughput=THROUGHPUT, \
    provisioned-iops=IOPS,image=projects/IMAGE_PROJECT/global/images/IMAGE, \
    storage-pool=STORAGE_POOL_NAME

Replace the following:

*   TEMPLATE_NAME: the name of the instance template.
*   REGION: the region where you want to create the regional instance template. The region must contain the zone where the pool is located.
*   MACHINE_TYPE: the machine type to use when creating the VM, for example, `h3-standard-88`.
*   DISK_SIZE: the size, in GiB, of the disk
*   THROUGHPUT: the throughput to provision for the disk
*   IOPS: the IOPS to provision for the disk
*   IMAGE_PROJECT: the project that contains the image
*   IMAGE: specify one of the following:
    *   A specific version of the OS image—for example, `debian-12-bookworm-v20240213`.
    *   An image family, which must be formatted as `family/IMAGE_FAMILY`. This creates the instance from the most recent, non-deprecated OS image. For example, if you specify `family/debian-12`, Compute Engine creates a VM using the latest version of the OS image in the `debian-12` image family. For more information about using image families, see Image families best practices.
*   STORAGE_POOL_NAME: the name of the storage pool to create the new disk in.

### REST

You can create the boot disk for a new VM in the pool by constructing a `POST` request for the `instances.insert` method and including the `storagePool` property for the boot disk.

POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/instanceTemplates
{
   "name": "VM_NAME",
   "machineType": "zones/ZONE/machineTypes/MACHINE_TYPE",
   "disks": [
      {
         "deviceName": "BOOT_DISK_DEVICE_NAME",
         "initializeParams": {
            "diskSizeGb": "DISK_SIZE",
            "diskType": "DISK_TYPE",
            "sourceImage": "projects/IMAGE_PROJECT/global/images/IMAGE"
            "boot": true,
            "provisionedIops": "IOPS_LIMIT",
            "provisionedThroughput": "THROUGHPUT_LIMIT",
            "storagePool": "POOL_URL"
         }
      }
   ]
}

Replace the following:

*   PROJECT_ID: the project ID
*   VM_NAME: the name of the VM.
*   ZONE: the zone in which the pool is located, for example, `us-central1-a`. This is the zone that VM and boot disk are created in.
*   MACHINE_TYPE: the machine type of the VM, for example, `m3-ultramem-32`.
*   BOOT_DISK_DEVICE_NAME: the device name for the boot disk
*   DISK_SIZE: the size, in GiB, of the boot disk
*   DISK_TYPE: the disk type, specified as a URI
*   IMAGE_PROJECT: the project that contains the image
*   IMAGE: specify one of the following:
    *   A specific version of the OS image—for example, `debian-12-bookworm-v20240213`.
    *   An image family, which must be formatted as `family/IMAGE_FAMILY`. This creates the instance from the most recent, non-deprecated OS image. For example, if you specify `family/debian-12`, Compute Engine creates an instance using the latest version of the OS image in the `debian-12` image family. For more information about using image families, see Image families best practices.
*   IOPS_LIMIT: the IOPS to provision for the disk
*   THROUGHPUT_LIMIT: the throughput to provision for the disk
*   POOL_URL: the storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. For example, the following are valid values:
    *   `https://www.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/storagePools/STORAGE_POOL_NAME`
    *   `projects/PROJECT_ID/zones/ZONE/storagePools/STORAGE_POOL_NAME`
    *   `zones/ZONE/storagePools/STORAGE_POOL_NAME`

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