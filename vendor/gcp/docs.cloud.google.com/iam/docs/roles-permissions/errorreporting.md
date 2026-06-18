# Error Reporting roles and permissions

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Security
*   IAM
*   Reference

Send feedback

# Error Reporting roles and permissions Stay organized with collections Save and categorize content based on your preferences.

This page lists the IAM roles and permissions for Error Reporting. To search through all roles and permissions, see the role and permission index.

## Error Reporting roles

Role

Permissions

#### Error Reporting Admin Beta

(`roles/errorreporting.admin`)

Provides full access to Error Reporting data.

Lowest-level resources where you can grant this role:

*   Project

`cloudnotifications.activities.list`

`errorreporting.*`

*   `errorreporting.applications.list`
*   `errorreporting.errorEvents.create`
*   `errorreporting.errorEvents.delete`
*   `errorreporting.errorEvents.list`
*   `errorreporting.groupMetadata.get`
*   `errorreporting.groupMetadata.update`
*   `errorreporting.groups.list`

`logging.notificationRules.*`

*   `logging.notificationRules.create`
*   `logging.notificationRules.delete`
*   `logging.notificationRules.get`
*   `logging.notificationRules.list`
*   `logging.notificationRules.update`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

`stackdriver.projects.get`

#### Error Reporting User Beta

(`roles/errorreporting.user`)

Provides the permissions to read and write Error Reporting data, except for sending new error events.

Lowest-level resources where you can grant this role:

*   Project

`cloudnotifications.activities.list`

`errorreporting.applications.list`

`errorreporting.errorEvents.delete`

`errorreporting.errorEvents.list`

`errorreporting.groupMetadata.*`

*   `errorreporting.groupMetadata.get`
*   `errorreporting.groupMetadata.update`

`errorreporting.groups.list`

`logging.notificationRules.*`

*   `logging.notificationRules.create`
*   `logging.notificationRules.delete`
*   `logging.notificationRules.get`
*   `logging.notificationRules.list`
*   `logging.notificationRules.update`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

`stackdriver.projects.get`

#### Error Reporting Viewer Beta

(`roles/errorreporting.viewer`)

Provides read-only access to Error Reporting data.

Lowest-level resources where you can grant this role:

*   Project

`cloudnotifications.activities.list`

`errorreporting.applications.list`

`errorreporting.errorEvents.list`

`errorreporting.groupMetadata.get`

`errorreporting.groups.list`

`logging.notificationRules.get`

`logging.notificationRules.list`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

`stackdriver.projects.get`

#### Error Reporting Writer Beta

(`roles/errorreporting.writer`)

Provides the permissions to send error events to Error Reporting.

Lowest-level resources where you can grant this role:

*   Service Account

`errorreporting.errorEvents.create`

## Error Reporting permissions

Permission

Included in roles

#### errorreporting.applications.list

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Error Reporting Admin (`roles/errorreporting.admin`)

Error Reporting User (`roles/errorreporting.user`)

Error Reporting Viewer (`roles/errorreporting.viewer`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Cloud Hub Operator (`roles/cloudhub.operator`)

Security Auditor (`roles/iam.securityAuditor`)

Site Reliability Engineer (`roles/iam.siteReliabilityEngineer`)

Support User (`roles/iam.supportUser`)

#### errorreporting.errorEvents.create

Owner (`roles/owner`)

Editor (`roles/editor`)

Error Reporting Admin (`roles/errorreporting.admin`)

Error Reporting Writer (`roles/errorreporting.writer`)

#### errorreporting.errorEvents.delete

Owner (`roles/owner`)

Editor (`roles/editor`)

Error Reporting Admin (`roles/errorreporting.admin`)

Error Reporting User (`roles/errorreporting.user`)

#### errorreporting.errorEvents.list

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Error Reporting Admin (`roles/errorreporting.admin`)

Error Reporting User (`roles/errorreporting.user`)

Error Reporting Viewer (`roles/errorreporting.viewer`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Cloud Hub Operator (`roles/cloudhub.operator`)

Security Auditor (`roles/iam.securityAuditor`)

Site Reliability Engineer (`roles/iam.siteReliabilityEngineer`)

Support User (`roles/iam.supportUser`)

#### errorreporting.groupMetadata.get

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Error Reporting Admin (`roles/errorreporting.admin`)

Error Reporting User (`roles/errorreporting.user`)

Error Reporting Viewer (`roles/errorreporting.viewer`)

Cloud Hub Operator (`roles/cloudhub.operator`)

Site Reliability Engineer (`roles/iam.siteReliabilityEngineer`)

Support User (`roles/iam.supportUser`)

#### errorreporting.groupMetadata.update

Owner (`roles/owner`)

Editor (`roles/editor`)

Error Reporting Admin (`roles/errorreporting.admin`)

Error Reporting User (`roles/errorreporting.user`)

#### errorreporting.groups.list

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Error Reporting Admin (`roles/errorreporting.admin`)

Error Reporting User (`roles/errorreporting.user`)

Error Reporting Viewer (`roles/errorreporting.viewer`)

Firebase Admin (`roles/firebase.admin`)

Firebase Editor (`roles/firebase.editor`)

Firebase Viewer (`roles/firebase.viewer`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Cloud Hub Operator (`roles/cloudhub.operator`)

Firebase Develop Admin (`roles/firebase.developAdmin`)

Firebase Develop Viewer (`roles/firebase.developViewer`)

Security Auditor (`roles/iam.securityAuditor`)

Site Reliability Engineer (`roles/iam.siteReliabilityEngineer`)

Support User (`roles/iam.supportUser`)

Send feedback