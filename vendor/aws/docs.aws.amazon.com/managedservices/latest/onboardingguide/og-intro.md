

# AWS Managed Services Onboarding Introduction
<a name="og-intro"></a>

Welcome to AWS Managed Services (AMS). AMS is an enterprise service that provides ongoing management of your AWS infrastructure. This guide is designed to help you get started using AMS, including how to set up a new account for AMS, set up networking and access to AMS, and validate your onboarding setup.

It is intended for IT administrators tasked with preparing for and carrying out the tasks required to onboard the AMS service to a new AWS account. Onboarding the AMS service requires special privileges to set up Active Directory trusts and complete other networking-level tasks. To get help in deciding whether to use multi-account landing zone accounts or single-account landing zone accounts, visit [Choosing single MALZ or multiple MALZs](https://docs.aws.amazon.com/managedservices/latest/userguide/malz-single-or-multi.html) .

**Important**  
This guide is divided into two parts after this introduction: One for multi-account landing zone accounts and one for single-account landing zone accounts. The onboarding is quite different for the two, please go next to the section of the guide that applies to your situation.

**Topics**
+ [Learning about AMS](#learning-about-sent)
+ [AMS key terms](key-terms.md)
+ [AMS modes](ams-modes-og.md)
+ [AMS post-account prescriptive guidance](ams-ob-prescriptive-guidance.md)
+ [What we do, what we do not do](ams-do-not-do.md)
+ [AMS egress traffic management](egress-traffic-mgmt.md)
+ [IAM user role in AMS](defaults-user-role.md)
+ [Default Access Firewall Rules](firewall-default-access-rules.md)

## Learning about AMS
<a name="learning-about-sent"></a>

To understand AMS better, refer to these [AMS User Guide](https://docs.aws.amazon.com/managedservices/latest/userguide/index.html) sections:
+ [What Is AWS Managed Services](https://docs.aws.amazon.com/managedservices/latest/userguide/what-is-sent.html) introduces the AMS service and describes the key features, operations, and interfaces as well as a typical AMS-managed network architecture. This chapter also provides information on access management including how to access your AMS-managed resources and using bastions.
+ [Key Terms](https://docs.aws.amazon.com/managedservices/latest/userguide/key-terms.html) provides definitions and explanations for AMS terminology.
+ [ Understanding AMS Defaults](https://docs.aws.amazon.com/managedservices/latest/onboardingguide/understanding-sent-defaults.html) provides the default values AMS uses, including the defaults for basic environment components, IAM and EC2, proxies, monitored metrics, logging, endpoint security (EPS), backups, and patching.
+ [Change Management](https://docs.aws.amazon.com/managedservices/latest/userguide/change-mgmt.html) provides details on how requests for change (RFCs) and change types (CTs) work and includes examples of using AMS RFCs.
+ Several additional chapters cover accessing the AWS console, the AMS CLI, using the AMS change management system, the AMS SKMS, security, service requests, incidents, monitoring, logs, EPS, backups, and patch management.

To learn more about AMS multi-account landing zone architecture, see [Multi-Account Landing Zone network architecture](https://docs.aws.amazon.com/managedservices/latest/userguide/malz-net-arch.html)

To learn more about AMS single-account landing zone architecture, see [Single-Account Landing Zone network architecture](https://docs.aws.amazon.com/managedservices/latest/userguide/ams-net-arch.html)