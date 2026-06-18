

# What is AWS DataSync?
<a name="what-is-datasync"></a>

AWS DataSync is a secure, reliable, high‐speed file transfer service that helps you quickly and easily transfer your file or object data to, from, and between AWS storage services.

**On-premises storage transfers**  
DataSync works with the following on-premises storage systems:
+ [Network File System (NFS)](create-nfs-location.md)
+ [Server Message Block (SMB)](create-smb-location.md)
+ [Hadoop Distributed File Systems (HDFS)](create-hdfs-location.md)
+ [Object storage](create-object-location.md)

**AWS storage transfers**  
DataSync works with the following AWS storage services:
+ [Amazon S3](create-s3-location.md)
+ [Amazon EFS](create-efs-location.md)
+ [Amazon FSx for Windows File Server](create-fsx-location.md)
+ [Amazon FSx for Lustre](create-lustre-location.md)
+ [Amazon FSx for OpenZFS](create-openzfs-location.md)
+ [Amazon FSx for NetApp ONTAP](create-ontap-location.md)

**Other cloud storage transfers**  
DataSync works with the following storage services in other clouds:
+ [Google Cloud Storage](tutorial_transfer-google-cloud-storage.md)
+ [Microsoft Azure Blob Storage](creating-azure-blob-location.md)
+ [Microsoft Azure Files](transferring-azure-files.md)
+ [Wasabi Cloud Storage](creating-other-cloud-object-location.md)
+ [DigitalOcean Spaces](creating-other-cloud-object-location.md)
+ [Oracle Cloud Infrastructure Object Storage](creating-other-cloud-object-location.md)
+ [Cloudflare R2 Storage](creating-other-cloud-object-location.md)
+ [Backblaze B2 Cloud Storage](creating-other-cloud-object-location.md)
+ [NAVER Cloud Object Storage](creating-other-cloud-object-location.md)
+ [Alibaba Cloud Object Storage Service](creating-other-cloud-object-location.md)
+ [IBM Cloud Object Storage](creating-other-cloud-object-location.md)
+ [Seagate Lyve Cloud](creating-other-cloud-object-location.md)

## Use cases
<a name="use-cases"></a>

These are some of the main use cases for DataSync:
+ **Migrate data** – Transfer active datasets rapidly over the network into AWS storage services. DataSync includes automatic encryption and data integrity validation to help make sure that your data arrives securely, intact, and ready to use.
+ **Archive cold data** – Move cold data stored in on-premises storage directly to durable and secure long-term storage classes such as S3 Glacier Flexible Retrieval or S3 Glacier Deep Archive. Doing so can free up on-premises storage capacity and help you shut down legacy systems. 
+ **Replicate data** – Copy data into most Amazon S3 storage classes, choosing the most cost-effective one for your needs. You can also send data to Amazon EFS or Amazon FSx for a standby file system.
+ **Transfer data for timely in-cloud processing** – Transfer data in or out of AWS for processing. This approach can speed up critical hybrid cloud workflows across many industries. These include machine learning in the life-sciences industry, video production in media and entertainment, big-data analytics in financial services, and seismic research in the oil and gas industry.

## Benefits
<a name="benefits"></a>

By using DataSync, you can get the following benefits:
+ **Automate data movement** – DataSync makes it easier to transfer data over the network between storage systems and services. DataSync automates both the management of data-transfer processes and the infrastructure required for high performance and secure data transfers.
+ **Transfer data securely** – DataSync provides end-to-end security, including encryption and data integrity validation, to help ensure that your data arrives securely, intact, and ready to use. DataSync accesses your AWS storage through built-in AWS security mechanisms, such as AWS Identity and Access Management (IAM) roles. It also supports virtual private cloud (VPC) endpoints, giving you the option to transfer data without traversing the public internet and further increasing the security of data copied online.
+ **Move data faster** – DataSync uses a purpose-built network protocol and a parallel, multi-threaded architecture to accelerate your transfers. This approach speeds up migrations, recurring data-processing workflows for analytics and machine learning, and data-protection processes.

## Additional resources
<a name="first-time-user"></a>

We recommend that you read the following:
+ [DataSync resources](https://aws.amazon.com/datasync/resources/) – Includes blogs, videos, and other training materials
+ [AWS re:Post](https://repost.aws/) – See the latest discussion around DataSync
+ [AWS DataSync pricing](https://aws.amazon.com/datasync/pricing)