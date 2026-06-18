

# What is Tape Gateway?
<a name="WhatIsStorageGateway"></a>

AWS Storage Gateway connects an on-premises software appliance with cloud-based storage to provide seamless integration with data security features between your on-premises IT environment and the AWS storage infrastructure. You can use the service to store data in the Amazon Web Services Cloud for scalable and cost-effective storage that helps maintain data security.

You can deploy Storage Gateway either on-premises as a VM appliance running on VMware ESXi, KVM, or Microsoft Hyper-V hypervisor, as a hardware appliance, or in AWS as an Amazon EC2 instance. You can use gateways hosted on EC2 instances for disaster recovery, data mirroring, and providing storage for applications hosted on Amazon EC2.

To see the wide range of use cases that AWS Storage Gateway helps make possible, see [AWS Storage Gateway](https://aws.amazon.com/storagegateway). For current information about pricing, see [Pricing](https://aws.amazon.com/storagegateway/pricing) on the AWS Storage Gateway details page.

AWS Storage Gateway offers file-based (S3 File Gateway and FSx File Gateway), volume-based (Volume Gateway), and tape-based (Tape Gateway) storage solutions.

This User Guide provides information related to Tape Gateway.

Tape Gateway provides cloud-backed virtual tape storage. With Tape Gateway, you can cost-effectively and durably archive backup data in S3 Glacier Flexible Retrieval or S3 Glacier Deep Archive. Tape Gateway provides a virtual tape infrastructure that scales seamlessly with your business needs and eliminates the operational burden of provisioning, scaling, and maintaining a physical tape infrastructure.

For an architectural overview, see [How Tape Gateway works](StorageGatewayConcepts.md).

In this User Guide, you can find a Getting Started section that covers setup information common to all gateway types. You can also find Tape Gateway setup requirements, and sections that describe how to deploy, activate, configure, and manage your Tape Gateway.

The procedures in this User Guide primarily focus on performing gateway operations by using the AWS Management Console. If you want to perform these operations programmatically, see the *[AWS Storage Gateway API Reference](https://docs.aws.amazon.com/storagegateway/latest/APIReference/).* 