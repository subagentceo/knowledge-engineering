

# What is Multi-party approval?
<a name="what-is"></a>

**Security through approval**

Multi-party approval is a capability of [AWS Organizations](https://aws.amazon.com/organizations) that allows you to protect a predefined list of operations through a distributed approval process. Use Multi-party approval to establish approval workflows and transform security processes into team-based decisions.

![Multi-party approval process with Requester, Administrator, and Approvers roles and their functions.](http://docs.aws.amazon.com/mpa/latest/userguide/images/personas.png)


*Figure 1: Diagram depicting the job functions for Multi-party approval.*


| Requester | Administrator | Approver | 
| --- | --- | --- | 
|  [See the AWS documentation website for more details](http://docs.aws.amazon.com/mpa/latest/userguide/what-is.html) |  [See the AWS documentation website for more details](http://docs.aws.amazon.com/mpa/latest/userguide/what-is.html)  |  [See the AWS documentation website for more details](http://docs.aws.amazon.com/mpa/latest/userguide/what-is.html)  | 

## Example scenario: Protect logically air-gapped vaults
<a name="mpa-example"></a>

You can use Multi-party approval with AWS Backup. AWS Backup offers logically air-gapped vaults, which are backup vaults with increased security features. For more information, see [Logically air-gapped vault](https://docs.aws.amazon.com/aws-backup/latest/devguide/logicallyairgappedvault.html) in the *AWS Backup Developer Guide*.

When a logically air-gapped vault is protected with Multi-party approval, a request to create a restore access backup vault must go through an [approval session](mpa-concepts.md#mpa-session). This means that the `CreateRestoreAccessVault` operation will require team approval before it can be executed. In Figure 2, this is represented with `CreateRestoreAccessVault` as the requested operation in the dotted box in a pending approval state. The approval session for the requested operation takes place in the [approval portal](mpa-concepts.md#mpa-portal).

If the access request is approved, AWS Backup creates a restore access backup vault in the requester's account. This restore access backup vault is the requester's connection to the logically air-gapped vault. In Figure 2, this is represented with the requested operation in the dotted box moving from pending approval to approved.

For more information, see [How Multi-party approval works](how-it-works.md). To get started, see [Set up Multi-party approval](setting-up.md).

![Workflow diagram showing request approval process between AWS Management Console and Approval Portal.](http://docs.aws.amazon.com/mpa/latest/userguide/images/how-it-works.png)


*Figure 2: Diagram depicting how Multi-party approval works. You can also use the AWS CLI & AWS SDKs instead of the AWS Management Console.*

## When to use Multi-party approval
<a name="mpa-benefits"></a>

------
#### [ When Multi-party approval is beneficial ]
+ You need to align with the Zero Trust principle of "never trust, always verify"
+ You need to make sure that the right humans have access to the right things in the right way
+ You need distributed decision-making for sensitive or critical operations
+ You need to protect against unintended operations on sensitive or critical resources
+ You need formal reviews and approvals for auditing or compliance reasons

------
#### [ When Multi-party approval might not be the best choice ]
+ For standalone AWS accounts that don't use AWS Organizations and IAM Identity Center
+ For operations that require immediate execution without delay
+ For scenarios where the overhead of managing approval teams and workflows isn't justified by the risk

------

## What operations are currently supported with Multi-party approval
<a name="mpa-integrations-supported"></a>


| AWS service | Benefits of using with Multi-party approval | Protected operation | Learn more | 
| --- | --- | --- | --- | 
| [AWS Backup](https://aws.amazon.com/backup) | An an AWS Backup customer, you can use Multi-party approval to grant approval capabilities of some operations to a group of trusted individuals who can collaboratively approve access to a logically air-gapped vault from a separately-created recovery account in the case of suspected malicious activity that may compromise use of the primary account. | [https://docs.aws.amazon.com/aws-backup/latest/devguide/API_CreateRestoreAccessBackupVault.html](https://docs.aws.amazon.com/aws-backup/latest/devguide/API_CreateRestoreAccessBackupVault.html)<br />[https://docs.aws.amazon.com/aws-backup/latest/devguide/API_AssociateBackupVaultMpaApprovalTeam.html](https://docs.aws.amazon.com/aws-backup/latest/devguide/API_AssociateBackupVaultMpaApprovalTeam.html)<br />[https://docs.aws.amazon.com/aws-backup/latest/devguide/API_DisassociateBackupVaultMpaApprovalTeam.html](https://docs.aws.amazon.com/aws-backup/latest/devguide/API_DisassociateBackupVaultMpaApprovalTeam.html)<br />[https://docs.aws.amazon.com/aws-backup/latest/devguide/API_RevokeRestoreAccessBackupVault.html](https://docs.aws.amazon.com/aws-backup/latest/devguide/API_RevokeRestoreAccessBackupVault.html) | For more information, see [Multi-party approval for logically air-gapped vaults](https://docs.aws.amazon.com/aws-backup/latest/devguide/multipartyapproval.html) in the AWS Backup Developer Guide. | 
| [AWS Payment Cryptography](https://aws.amazon.com/payment-cryptography) | As an AWS Payment Cryptography customer, you can use Multi-party approval to protect the import of root certificate public keys, which establish the trust anchor for subsequent key imports and exports using asymmetric key exchange such as TR-34. Requiring multi-party approval for this operation helps ensure that no single individual can unilaterally establish or change the root of trust for your AWS Payment Cryptography keys. | [https://docs.aws.amazon.com/payment-cryptography/latest/APIReference/API_ImportKey.html](https://docs.aws.amazon.com/payment-cryptography/latest/APIReference/API_ImportKey.html) (with `RootCertificatePublicKey` key material)<br />[https://docs.aws.amazon.com/payment-cryptography/latest/APIReference/API_AssociateMpaTeam.html](https://docs.aws.amazon.com/payment-cryptography/latest/APIReference/API_AssociateMpaTeam.html)<br />[https://docs.aws.amazon.com/payment-cryptography/latest/APIReference/API_DisassociateMpaTeam.html](https://docs.aws.amazon.com/payment-cryptography/latest/APIReference/API_DisassociateMpaTeam.html) | For more information, see [Multi-party approval for AWS Payment Cryptography](https://docs.aws.amazon.com/payment-cryptography/latest/userguide/mpa.html) in the AWS Payment Cryptography User Guide. | 

## Required services
<a name="mpa-integrations-required"></a>

Multi-party approval requires [AWS Organizations](https://aws.amazon.com/organizations) and [AWS IAM Identity Center](https://aws.amazon.com/iam/identity-center).