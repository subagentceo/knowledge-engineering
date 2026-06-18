

# What is VM Import/Export?
<a name="what-is-vmimport"></a>

VM Import/Export enables you to import virtual machine (VM) images from your existing virtualization environment to Amazon EC2, and then export them back. This enables you to migrate applications and workloads to Amazon EC2, copy your VM image catalog to Amazon EC2, or create a repository of VM images for backup and disaster recovery. For more information, see [VM Import/Export](https://aws.amazon.com/ec2/vm-import/).

For more information about how to use VM Import/Export, see [How to get started with VM Import/Export](vmimport-where-do-i-go.md).

**Topics**
+ [Benefits of VM Import/Export](#vmimport-benefits)
+ [Features of VM Import/Export](#vmimport-features)
+ [Pricing for VM Import/Export](#vmimport-pricing)
+ [Related services](#vmimport-related-services)

## Benefits of VM Import/Export
<a name="vmimport-benefits"></a>

You can use VM Import/Export to migrate applications and workloads, copy your VM image catalog, or create a disaster recovery repository for VM images.

**Migrate existing applications and workloads to Amazon EC2**  
When you migrate your VM-based applications and workloads to Amazon EC2, you preserve their software and configuration settings. When you create an AMI from your VM, you can run multiple instances based on the same imported VM. You can also use the AMI to replicate your applications and workloads around the world using AMI copy. For more information, see [Copying an AMI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/CopyingAMIs.html) in the *Amazon EC2 User Guide*.

**Import your VM image catalog to Amazon EC2**  
If you maintain a catalog of approved VM images, you can copy your image catalog to Amazon EC2 and create AMIs from the imported images. You can import your existing software, including products that you have installed such as anti-virus software, intrusion detection systems, and so on, along with your VM images. You can use the AMIs you create as your Amazon EC2 image catalog.

**Create a disaster recovery repository for VM images**  
You can import your local VM images into Amazon EC2 for backup and disaster recovery purposes. You can import your VMs and store them as AMIs. The AMIs you create will be ready to launch in Amazon EC2 when you need them. If your local environment suffers an event, you can quickly launch your instances to preserve business continuity while simultaneously exporting them to rebuild your local infrastructure.

## Features of VM Import/Export
<a name="vmimport-features"></a>

VM Import provides the following features:
+ The ability to import a VM from your virtualization environment to Amazon EC2 as an Amazon Machine Image (AMI). You can launch EC2 instances from your AMI any time.
+ The ability to import a VM from your virtualization environment to Amazon EC2 as an EC2 instance. The instance is initially in a `stopped` state. You can create an AMI from the instance.
+ The ability to export a VM that was previously imported from your virtualization environment.
+ The ability to import disks as Amazon EBS snapshots.
+ VM import supports ENA drivers for Linux. ENA support will be enabled only if the original VM has ENA and/or NVMe drivers installed. We recommend installing the latest drivers.

## Pricing for VM Import/Export
<a name="vmimport-pricing"></a>

With Amazon Web Services, you pay only for what you use. There is no additional fee to use VM Import/Export. You pay the standard fees for the Amazon Simple Storage Service (Amazon S3) bucket and EBS volumes used during the import and export processes, and for the EC2 instances that you run.

## Related services
<a name="vmimport-related-services"></a>

Consider the following services as you plan your migration to AWS:
+ **AWS Application Discovery Service** – You can use the Application Discovery Service to gather information about your data center, such as server utilization data and dependency mappings, so that you can view information about your workloads. For more information, see the [Application Discovery Service User Guide](https://docs.aws.amazon.com/application-discovery/latest/userguide/).
+ **AWS Transform MGN** – If you use VMware vSphere, Microsoft Hyper-V, or Microsoft Azure, you can use MGN to automate the migration of your virtual machines to AWS. For more information, see the [MGN User Guide](https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html).