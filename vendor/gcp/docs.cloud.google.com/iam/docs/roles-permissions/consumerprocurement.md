# Cloud Commerce Consumer Procurement roles and permissions

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Security
*   IAM
*   Reference

Send feedback

# Cloud Commerce Consumer Procurement roles and permissions Stay organized with collections Save and categorize content based on your preferences.

This page lists the IAM roles and permissions for Cloud Commerce Consumer Procurement. To search through all roles and permissions, see the role and permission index.

## Cloud Commerce Consumer Procurement roles

Role

Permissions

#### Consumer Procurement Entitlement Manager

(`roles/consumerprocurement.entitlementManager`)

Allows managing entitlements and enabling, disabling, and inspecting service states for a consumer project.

`commerceoffercatalog.offers.get`

`consumerprocurement.consents.check`

`consumerprocurement.consents.grant`

`consumerprocurement.consents.list`

`consumerprocurement.consents.revoke`

`consumerprocurement.entitlements.*`

*   `consumerprocurement.entitlements.get`
*   `consumerprocurement.entitlements.list`

`consumerprocurement.freeTrials.*`

*   `consumerprocurement.freeTrials.create`
*   `consumerprocurement.freeTrials.get`
*   `consumerprocurement.freeTrials.list`

`orgpolicy.policy.get`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

`serviceusage.consumerpolicy.*`

*   `serviceusage.consumerpolicy.analyze`
*   `serviceusage.consumerpolicy.get`
*   `serviceusage.consumerpolicy.update`

`serviceusage.effectivepolicy.get`

`serviceusage.groups.*`

*   `serviceusage.groups.list`
*   `serviceusage.groups.listExpandedMembers`
*   `serviceusage.groups.listMembers`

`serviceusage.operations.get`

`serviceusage.services.disable`

`serviceusage.services.enable`

`serviceusage.services.get`

`serviceusage.services.list`

`serviceusage.values.test`

#### Consumer Procurement Entitlement Viewer

(`roles/consumerprocurement.entitlementViewer`)

Allows inspecting entitlements and service states for a consumer project.

`commerceoffercatalog.offers.get`

`consumerprocurement.consents.check`

`consumerprocurement.consents.list`

`consumerprocurement.entitlements.*`

*   `consumerprocurement.entitlements.get`
*   `consumerprocurement.entitlements.list`

`consumerprocurement.freeTrials.get`

`consumerprocurement.freeTrials.list`

`orgpolicy.policy.get`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

`serviceusage.consumerpolicy.analyze`

`serviceusage.consumerpolicy.get`

`serviceusage.effectivepolicy.get`

`serviceusage.groups.*`

*   `serviceusage.groups.list`
*   `serviceusage.groups.listExpandedMembers`
*   `serviceusage.groups.listMembers`

`serviceusage.services.get`

`serviceusage.services.list`

`serviceusage.values.test`

#### Consumer Procurement Events Viewer

(`roles/consumerprocurement.eventsViewer`)

Allows viewing key events for an offer

`consumerprocurement.events.*`

*   `consumerprocurement.events.get`
*   `consumerprocurement.events.list`

#### Consumer Procurement License Pool Editor

(`roles/consumerprocurement.licensePoolEditor`)

Allows managing license pools and license assignments.

`consumerprocurement.licensePools.*`

*   `consumerprocurement.licensePools.assign`
*   `consumerprocurement.licensePools.enumerateLicensedUsers`
*   `consumerprocurement.licensePools.get`
*   `consumerprocurement.licensePools.unassign`
*   `consumerprocurement.licensePools.update`

#### Consumer Procurement License Pool Viewer

(`roles/consumerprocurement.licensePoolViewer`)

Allows viewing license pools and license assignments.

`consumerprocurement.licensePools.enumerateLicensedUsers`

`consumerprocurement.licensePools.get`

#### Consumer Procurement Order Administrator

(`roles/consumerprocurement.orderAdmin`)

Allows managing purchases.

`billing.accounts.get`

`billing.accounts.getIamPolicy`

`billing.accounts.list`

`billing.accounts.redeemPromotion`

`billing.credits.list`

`billing.resourceAssociations.create`

`commerceoffercatalog.*`

*   `commerceoffercatalog.agreements.get`
*   `commerceoffercatalog.agreements.list`
*   `commerceoffercatalog.documents.get`
*   `commerceoffercatalog.documents.list`
*   `commerceoffercatalog.offers.get`

`consumerprocurement.accounts.*`

*   `consumerprocurement.accounts.create`
*   `consumerprocurement.accounts.delete`
*   `consumerprocurement.accounts.get`
*   `consumerprocurement.accounts.list`

`consumerprocurement.consents.check`

`consumerprocurement.consents.grant`

`consumerprocurement.consents.list`

`consumerprocurement.consents.revoke`

`consumerprocurement.events.*`

*   `consumerprocurement.events.get`
*   `consumerprocurement.events.list`

`consumerprocurement.licensePools.*`

*   `consumerprocurement.licensePools.assign`
*   `consumerprocurement.licensePools.enumerateLicensedUsers`
*   `consumerprocurement.licensePools.get`
*   `consumerprocurement.licensePools.unassign`
*   `consumerprocurement.licensePools.update`

`consumerprocurement.orderAttributions.*`

*   `consumerprocurement.orderAttributions.get`
*   `consumerprocurement.orderAttributions.list`
*   `consumerprocurement.orderAttributions.update`

`consumerprocurement.orders.*`

*   `consumerprocurement.orders.cancel`
*   `consumerprocurement.orders.get`
*   `consumerprocurement.orders.list`
*   `consumerprocurement.orders.modify`
*   `consumerprocurement.orders.place`

`discoveryengine.billingAccountLicenseConfigs.*`

*   `discoveryengine.billingAccountLicenseConfigs.distribute`
*   `discoveryengine.billingAccountLicenseConfigs.get`
*   `discoveryengine.billingAccountLicenseConfigs.list`
*   `discoveryengine.billingAccountLicenseConfigs.retract`

#### Consumer Procurement Order Viewer

(`roles/consumerprocurement.orderViewer`)

Allows inspecting purchases.

`billing.accounts.get`

`billing.accounts.getIamPolicy`

`billing.accounts.list`

`billing.credits.list`

`commerceoffercatalog.*`

*   `commerceoffercatalog.agreements.get`
*   `commerceoffercatalog.agreements.list`
*   `commerceoffercatalog.documents.get`
*   `commerceoffercatalog.documents.list`
*   `commerceoffercatalog.offers.get`

`consumerprocurement.accounts.get`

`consumerprocurement.accounts.list`

`consumerprocurement.consents.check`

`consumerprocurement.consents.list`

`consumerprocurement.licensePools.enumerateLicensedUsers`

`consumerprocurement.licensePools.get`

`consumerprocurement.orderAttributions.get`

`consumerprocurement.orderAttributions.list`

`consumerprocurement.orders.get`

`consumerprocurement.orders.list`

`discoveryengine.billingAccountLicenseConfigs.get`

`discoveryengine.billingAccountLicenseConfigs.list`

#### Consumer Procurement Administrator

(`roles/consumerprocurement.procurementAdmin`)

Allows managing purchases, consents at both billing account and project level.

`billing.accounts.get`

`billing.accounts.getIamPolicy`

`billing.accounts.list`

`billing.accounts.redeemPromotion`

`billing.credits.list`

`billing.resourceAssociations.create`

`commerceoffercatalog.*`

*   `commerceoffercatalog.agreements.get`
*   `commerceoffercatalog.agreements.list`
*   `commerceoffercatalog.documents.get`
*   `commerceoffercatalog.documents.list`
*   `commerceoffercatalog.offers.get`

`consumerprocurement.*`

*   `consumerprocurement.accounts.create`
*   `consumerprocurement.accounts.delete`
*   `consumerprocurement.accounts.get`
*   `consumerprocurement.accounts.list`
*   `consumerprocurement.consents.allowProjectGrant`
*   `consumerprocurement.consents.check`
*   `consumerprocurement.consents.grant`
*   `consumerprocurement.consents.list`
*   `consumerprocurement.consents.revoke`
*   `consumerprocurement.entitlements.get`
*   `consumerprocurement.entitlements.list`
*   `consumerprocurement.events.get`
*   `consumerprocurement.events.list`
*   `consumerprocurement.freeTrials.create`
*   `consumerprocurement.freeTrials.get`
*   `consumerprocurement.freeTrials.list`
*   `consumerprocurement.licensePools.assign`
*   `consumerprocurement.licensePools.enumerateLicensedUsers`
*   `consumerprocurement.licensePools.get`
*   `consumerprocurement.licensePools.unassign`
*   `consumerprocurement.licensePools.update`
*   `consumerprocurement.orderAttributions.get`
*   `consumerprocurement.orderAttributions.list`
*   `consumerprocurement.orderAttributions.update`
*   `consumerprocurement.orders.cancel`
*   `consumerprocurement.orders.get`
*   `consumerprocurement.orders.list`
*   `consumerprocurement.orders.modify`
*   `consumerprocurement.orders.place`

`discoveryengine.billingAccountLicenseConfigs.*`

*   `discoveryengine.billingAccountLicenseConfigs.distribute`
*   `discoveryengine.billingAccountLicenseConfigs.get`
*   `discoveryengine.billingAccountLicenseConfigs.list`
*   `discoveryengine.billingAccountLicenseConfigs.retract`

`orgpolicy.policy.get`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

`serviceusage.consumerpolicy.*`

*   `serviceusage.consumerpolicy.analyze`
*   `serviceusage.consumerpolicy.get`
*   `serviceusage.consumerpolicy.update`

`serviceusage.effectivepolicy.get`

`serviceusage.groups.*`

*   `serviceusage.groups.list`
*   `serviceusage.groups.listExpandedMembers`
*   `serviceusage.groups.listMembers`

`serviceusage.operations.get`

`serviceusage.services.disable`

`serviceusage.services.enable`

`serviceusage.services.get`

`serviceusage.services.list`

`serviceusage.values.test`

#### Consumer Procurement Viewer

(`roles/consumerprocurement.procurementViewer`)

Allows inspecting purchases, consents and entitlements and service states for a consumer project.

`billing.accounts.get`

`billing.accounts.getIamPolicy`

`billing.accounts.list`

`billing.credits.list`

`commerceoffercatalog.*`

*   `commerceoffercatalog.agreements.get`
*   `commerceoffercatalog.agreements.list`
*   `commerceoffercatalog.documents.get`
*   `commerceoffercatalog.documents.list`
*   `commerceoffercatalog.offers.get`

`consumerprocurement.accounts.get`

`consumerprocurement.accounts.list`

`consumerprocurement.consents.check`

`consumerprocurement.consents.list`

`consumerprocurement.entitlements.*`

*   `consumerprocurement.entitlements.get`
*   `consumerprocurement.entitlements.list`

`consumerprocurement.freeTrials.get`

`consumerprocurement.freeTrials.list`

`consumerprocurement.licensePools.enumerateLicensedUsers`

`consumerprocurement.licensePools.get`

`consumerprocurement.orderAttributions.get`

`consumerprocurement.orderAttributions.list`

`consumerprocurement.orders.get`

`consumerprocurement.orders.list`

`discoveryengine.billingAccountLicenseConfigs.get`

`discoveryengine.billingAccountLicenseConfigs.list`

`orgpolicy.policy.get`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

`serviceusage.consumerpolicy.analyze`

`serviceusage.consumerpolicy.get`

`serviceusage.effectivepolicy.get`

`serviceusage.groups.*`

*   `serviceusage.groups.list`
*   `serviceusage.groups.listExpandedMembers`
*   `serviceusage.groups.listMembers`

`serviceusage.services.get`

`serviceusage.services.list`

`serviceusage.values.test`

## Cloud Commerce Consumer Procurement permissions

Permission

Included in roles

#### consumerprocurement.accounts.create

Owner (`roles/owner`)

Editor (`roles/editor`)

Billing Account Administrator (`roles/billing.admin`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

#### consumerprocurement.accounts.delete

Owner (`roles/owner`)

Editor (`roles/editor`)

Billing Account Administrator (`roles/billing.admin`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

#### consumerprocurement.accounts.get

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Billing Account Administrator (`roles/billing.admin`)

Billing Account Viewer (`roles/billing.viewer`)

Account Hierarchy Manager (`roles/billing.linkAdmin`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Order Viewer (`roles/consumerprocurement.orderViewer`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

Consumer Procurement Viewer (`roles/consumerprocurement.procurementViewer`)

Support User (`roles/iam.supportUser`)

#### consumerprocurement.accounts.list

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Billing Account Administrator (`roles/billing.admin`)

Billing Account Viewer (`roles/billing.viewer`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Account Hierarchy Manager (`roles/billing.linkAdmin`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Order Viewer (`roles/consumerprocurement.orderViewer`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

Consumer Procurement Viewer (`roles/consumerprocurement.procurementViewer`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

#### consumerprocurement.consents.allowProjectGrant

Owner (`roles/owner`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

#### consumerprocurement.consents.check

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Billing Account Administrator (`roles/billing.admin`)

Billing Account Viewer (`roles/billing.viewer`)

Account Hierarchy Manager (`roles/billing.linkAdmin`)

Consumer Procurement Entitlement Manager (`roles/consumerprocurement.entitlementManager`)

Consumer Procurement Entitlement Viewer (`roles/consumerprocurement.entitlementViewer`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Order Viewer (`roles/consumerprocurement.orderViewer`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

Consumer Procurement Viewer (`roles/consumerprocurement.procurementViewer`)

Support User (`roles/iam.supportUser`)

#### consumerprocurement.consents.grant

Owner (`roles/owner`)

Editor (`roles/editor`)

Billing Account Administrator (`roles/billing.admin`)

Consumer Procurement Entitlement Manager (`roles/consumerprocurement.entitlementManager`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

#### consumerprocurement.consents.list

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Billing Account Administrator (`roles/billing.admin`)

Billing Account Viewer (`roles/billing.viewer`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Account Hierarchy Manager (`roles/billing.linkAdmin`)

Consumer Procurement Entitlement Manager (`roles/consumerprocurement.entitlementManager`)

Consumer Procurement Entitlement Viewer (`roles/consumerprocurement.entitlementViewer`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Order Viewer (`roles/consumerprocurement.orderViewer`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

Consumer Procurement Viewer (`roles/consumerprocurement.procurementViewer`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

#### consumerprocurement.consents.revoke

Owner (`roles/owner`)

Editor (`roles/editor`)

Billing Account Administrator (`roles/billing.admin`)

Consumer Procurement Entitlement Manager (`roles/consumerprocurement.entitlementManager`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

#### consumerprocurement.entitlements.get

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Commerce Organization Governance Admin (`roles/commerceorggovernance.admin`)

Commerce Organization Governance Viewer (`roles/commerceorggovernance.viewer`)

Discovery Engine Admin (`roles/discoveryengine.admin`)

Governed Marketplace User (`roles/commerceorggovernance.user`)

Consumer Procurement Entitlement Manager (`roles/consumerprocurement.entitlementManager`)

Consumer Procurement Entitlement Viewer (`roles/consumerprocurement.entitlementViewer`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

Consumer Procurement Viewer (`roles/consumerprocurement.procurementViewer`)

Gemini Enterprise Admin (`roles/discoveryengine.agentspaceAdmin`)

Support User (`roles/iam.supportUser`)

#### consumerprocurement.entitlements.list

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Commerce Organization Governance Admin (`roles/commerceorggovernance.admin`)

Commerce Organization Governance Viewer (`roles/commerceorggovernance.viewer`)

Discovery Engine Admin (`roles/discoveryengine.admin`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Governed Marketplace User (`roles/commerceorggovernance.user`)

Consumer Procurement Entitlement Manager (`roles/consumerprocurement.entitlementManager`)

Consumer Procurement Entitlement Viewer (`roles/consumerprocurement.entitlementViewer`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

Consumer Procurement Viewer (`roles/consumerprocurement.procurementViewer`)

Gemini Enterprise Admin (`roles/discoveryengine.agentspaceAdmin`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Discovery Engine Service Agent (`roles/discoveryengine.serviceAgent`)

#### consumerprocurement.events.get

Owner (`roles/owner`)

Billing Account Administrator (`roles/billing.admin`)

Consumer Procurement Events Viewer (`roles/consumerprocurement.eventsViewer`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

#### consumerprocurement.events.list

Owner (`roles/owner`)

Billing Account Administrator (`roles/billing.admin`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Consumer Procurement Events Viewer (`roles/consumerprocurement.eventsViewer`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

Security Auditor (`roles/iam.securityAuditor`)

#### consumerprocurement.freeTrials.create

Owner (`roles/owner`)

Editor (`roles/editor`)

Consumer Procurement Entitlement Manager (`roles/consumerprocurement.entitlementManager`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

#### consumerprocurement.freeTrials.get

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Consumer Procurement Entitlement Manager (`roles/consumerprocurement.entitlementManager`)

Consumer Procurement Entitlement Viewer (`roles/consumerprocurement.entitlementViewer`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

Consumer Procurement Viewer (`roles/consumerprocurement.procurementViewer`)

Support User (`roles/iam.supportUser`)

#### consumerprocurement.freeTrials.list

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Consumer Procurement Entitlement Manager (`roles/consumerprocurement.entitlementManager`)

Consumer Procurement Entitlement Viewer (`roles/consumerprocurement.entitlementViewer`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

Consumer Procurement Viewer (`roles/consumerprocurement.procurementViewer`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

#### consumerprocurement.licensePools.assign

Owner (`roles/owner`)

Editor (`roles/editor`)

Billing Account Administrator (`roles/billing.admin`)

Consumer Procurement License Pool Editor (`roles/consumerprocurement.licensePoolEditor`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

#### consumerprocurement.licensePools.enumerateLicensedUsers

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Billing Account Administrator (`roles/billing.admin`)

Consumer Procurement License Pool Editor (`roles/consumerprocurement.licensePoolEditor`)

Consumer Procurement License Pool Viewer (`roles/consumerprocurement.licensePoolViewer`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Order Viewer (`roles/consumerprocurement.orderViewer`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

Consumer Procurement Viewer (`roles/consumerprocurement.procurementViewer`)

Support User (`roles/iam.supportUser`)

#### consumerprocurement.licensePools.get

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Billing Account Administrator (`roles/billing.admin`)

Consumer Procurement License Pool Editor (`roles/consumerprocurement.licensePoolEditor`)

Consumer Procurement License Pool Viewer (`roles/consumerprocurement.licensePoolViewer`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Order Viewer (`roles/consumerprocurement.orderViewer`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

Consumer Procurement Viewer (`roles/consumerprocurement.procurementViewer`)

Support User (`roles/iam.supportUser`)

#### consumerprocurement.licensePools.unassign

Owner (`roles/owner`)

Editor (`roles/editor`)

Billing Account Administrator (`roles/billing.admin`)

Consumer Procurement License Pool Editor (`roles/consumerprocurement.licensePoolEditor`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

#### consumerprocurement.licensePools.update

Owner (`roles/owner`)

Editor (`roles/editor`)

Billing Account Administrator (`roles/billing.admin`)

Consumer Procurement License Pool Editor (`roles/consumerprocurement.licensePoolEditor`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

#### consumerprocurement.orderAttributions.get

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Billing Account Administrator (`roles/billing.admin`)

Billing Account Viewer (`roles/billing.viewer`)

Account Hierarchy Manager (`roles/billing.linkAdmin`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Order Viewer (`roles/consumerprocurement.orderViewer`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

Consumer Procurement Viewer (`roles/consumerprocurement.procurementViewer`)

Support User (`roles/iam.supportUser`)

#### consumerprocurement.orderAttributions.list

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Billing Account Administrator (`roles/billing.admin`)

Billing Account Viewer (`roles/billing.viewer`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Account Hierarchy Manager (`roles/billing.linkAdmin`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Order Viewer (`roles/consumerprocurement.orderViewer`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

Consumer Procurement Viewer (`roles/consumerprocurement.procurementViewer`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

#### consumerprocurement.orderAttributions.update

Owner (`roles/owner`)

Editor (`roles/editor`)

Billing Account Administrator (`roles/billing.admin`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

#### consumerprocurement.orders.cancel

Owner (`roles/owner`)

Editor (`roles/editor`)

Billing Account Administrator (`roles/billing.admin`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

#### consumerprocurement.orders.get

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Billing Account Administrator (`roles/billing.admin`)

Billing Account Viewer (`roles/billing.viewer`)

Account Hierarchy Manager (`roles/billing.linkAdmin`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Order Viewer (`roles/consumerprocurement.orderViewer`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

Consumer Procurement Viewer (`roles/consumerprocurement.procurementViewer`)

Support User (`roles/iam.supportUser`)

#### consumerprocurement.orders.list

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Billing Account Administrator (`roles/billing.admin`)

Billing Account Viewer (`roles/billing.viewer`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Account Hierarchy Manager (`roles/billing.linkAdmin`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Order Viewer (`roles/consumerprocurement.orderViewer`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

Consumer Procurement Viewer (`roles/consumerprocurement.procurementViewer`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

#### consumerprocurement.orders.modify

Owner (`roles/owner`)

Editor (`roles/editor`)

Billing Account Administrator (`roles/billing.admin`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

#### consumerprocurement.orders.place

Owner (`roles/owner`)

Editor (`roles/editor`)

Billing Account Administrator (`roles/billing.admin`)

Consumer Procurement Order Administrator (`roles/consumerprocurement.orderAdmin`)

Consumer Procurement Administrator (`roles/consumerprocurement.procurementAdmin`)

Send feedback