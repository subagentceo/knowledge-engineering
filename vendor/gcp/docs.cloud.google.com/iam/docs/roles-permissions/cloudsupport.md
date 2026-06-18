# Google Cloud Support roles and permissions

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Security
*   IAM
*   Reference

Send feedback

# Google Cloud Support roles and permissions Stay organized with collections Save and categorize content based on your preferences.

This page lists the IAM roles and permissions for Google Cloud Support. To search through all roles and permissions, see the role and permission index.

## Google Cloud Support roles

Role

Permissions

#### Support Account Administrator

(`roles/cloudsupport.admin`)

Allows management of a support account without giving access to support cases. See the Cloud Support documentation for more information.

Lowest-level resources where you can grant this role:

*   Organization

`cloudsupport.accounts.*`

*   `cloudsupport.accounts.create`
*   `cloudsupport.accounts.delete`
*   `cloudsupport.accounts.get`
*   `cloudsupport.accounts.getIamPolicy`
*   `cloudsupport.accounts.getUserRoles`
*   `cloudsupport.accounts.list`
*   `cloudsupport.accounts.purchase`
*   `cloudsupport.accounts.setIamPolicy`
*   `cloudsupport.accounts.update`
*   `cloudsupport.accounts.updateUserRoles`

`cloudsupport.operations.get`

`cloudsupport.properties.get`

`resourcemanager.organizations.get`

#### Support Account Viewer

(`roles/cloudsupport.viewer`)

Read-only access to details of a support account. This does not allow viewing cases. See the Cloud Support documentation for more information.

Lowest-level resources where you can grant this role:

*   Organization

`cloudsupport.accounts.get`

`cloudsupport.accounts.getUserRoles`

`cloudsupport.accounts.list`

`cloudsupport.properties.get`

#### Advisory Support Editor

(`roles/cloudsupport.advisorySupportEditor`)

Full read-write access to advisory support cases applicable for GCP Customer Care.

`cloudasset.assets.searchAllResources`

`cloudsupport.properties.get`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

#### Advisory Support Viewer

(`roles/cloudsupport.advisorySupportViewer`)

Read-only access to advisory support cases applicable for GCP Customer Care.

`cloudsupport.properties.get`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

#### Tech Support Editor

(`roles/cloudsupport.techSupportEditor`)

Full read-write access to technical support cases (applicable for GCP Customer Care and Maps support). See the Cloud Support documentation for more information.

`billing.resourceAssociations.list`

`cloudasset.assets.searchAllResources`

`cloudsupport.properties.get`

`cloudsupport.techCases.*`

*   `cloudsupport.techCases.create`
*   `cloudsupport.techCases.escalate`
*   `cloudsupport.techCases.get`
*   `cloudsupport.techCases.list`
*   `cloudsupport.techCases.update`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

#### Tech Support Viewer

(`roles/cloudsupport.techSupportViewer`)

Read-only access to technical support cases (applicable for GCP Customer Care and Maps support). See the Cloud Support documentation for more information.

`cloudsupport.properties.get`

`cloudsupport.techCases.get`

`cloudsupport.techCases.list`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

## Google Cloud Support permissions

Permission

Included in roles

#### cloudsupport.accounts.create

Owner (`roles/owner`)

Support Account Administrator (`roles/cloudsupport.admin`)

#### cloudsupport.accounts.delete

Owner (`roles/owner`)

Support Account Administrator (`roles/cloudsupport.admin`)

#### cloudsupport.accounts.get

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Support Account Administrator (`roles/cloudsupport.admin`)

Support Account Viewer (`roles/cloudsupport.viewer`)

Support User (`roles/iam.supportUser`)

#### cloudsupport.accounts.getIamPolicy

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Support Account Administrator (`roles/cloudsupport.admin`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

#### cloudsupport.accounts.getUserRoles

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Support Account Administrator (`roles/cloudsupport.admin`)

Support Account Viewer (`roles/cloudsupport.viewer`)

Support User (`roles/iam.supportUser`)

#### cloudsupport.accounts.list

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Support Account Administrator (`roles/cloudsupport.admin`)

Support Account Viewer (`roles/cloudsupport.viewer`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

#### cloudsupport.accounts.purchase

Owner (`roles/owner`)

Support Account Administrator (`roles/cloudsupport.admin`)

#### cloudsupport.accounts.setIamPolicy

Owner (`roles/owner`)

Support Account Administrator (`roles/cloudsupport.admin`)

Security Admin (`roles/iam.securityAdmin`)

#### cloudsupport.accounts.update

Owner (`roles/owner`)

Editor (`roles/editor`)

Support Account Administrator (`roles/cloudsupport.admin`)

#### cloudsupport.accounts.updateUserRoles

Owner (`roles/owner`)

Editor (`roles/editor`)

Support Account Administrator (`roles/cloudsupport.admin`)

#### cloudsupport.operations.get

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Support Account Administrator (`roles/cloudsupport.admin`)

Support User (`roles/iam.supportUser`)

#### cloudsupport.properties.get

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Billing Account Administrator (`roles/billing.admin`)

Support Account Administrator (`roles/cloudsupport.admin`)

Support Account Viewer (`roles/cloudsupport.viewer`)

Cloud Hub Operator (`roles/cloudhub.operator`)

Advisory Support Editor (`roles/cloudsupport.advisorySupportEditor`)

Advisory Support Viewer (`roles/cloudsupport.advisorySupportViewer`)

Tech Support Editor (`roles/cloudsupport.techSupportEditor`)

Tech Support Viewer (`roles/cloudsupport.techSupportViewer`)

Support User (`roles/iam.supportUser`)

#### cloudsupport.techCases.create

Owner (`roles/owner`)

Editor (`roles/editor`)

Billing Account Administrator (`roles/billing.admin`)

Tech Support Editor (`roles/cloudsupport.techSupportEditor`)

Support User (`roles/iam.supportUser`)

#### cloudsupport.techCases.escalate

Owner (`roles/owner`)

Editor (`roles/editor`)

Billing Account Administrator (`roles/billing.admin`)

Tech Support Editor (`roles/cloudsupport.techSupportEditor`)

Support User (`roles/iam.supportUser`)

#### cloudsupport.techCases.get

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Billing Account Administrator (`roles/billing.admin`)

Cloud Hub Operator (`roles/cloudhub.operator`)

Tech Support Editor (`roles/cloudsupport.techSupportEditor`)

Tech Support Viewer (`roles/cloudsupport.techSupportViewer`)

Support User (`roles/iam.supportUser`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Cloud Controls Partner Support Case Service Agent (`roles/cloudcontrolspartner.supportCaseServiceAgent`)

#### cloudsupport.techCases.list

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Billing Account Administrator (`roles/billing.admin`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Cloud Hub Operator (`roles/cloudhub.operator`)

Tech Support Editor (`roles/cloudsupport.techSupportEditor`)

Tech Support Viewer (`roles/cloudsupport.techSupportViewer`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

#### cloudsupport.techCases.update

Owner (`roles/owner`)

Editor (`roles/editor`)

Billing Account Administrator (`roles/billing.admin`)

Tech Support Editor (`roles/cloudsupport.techSupportEditor`)

Support User (`roles/iam.supportUser`)

Send feedback