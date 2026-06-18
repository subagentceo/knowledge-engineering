# Google Cloud Managed Lustre roles and permissions

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Security
*   IAM
*   Reference

Send feedback

# Google Cloud Managed Lustre roles and permissions Stay organized with collections Save and categorize content based on your preferences.

This page lists the IAM roles and permissions for Google Cloud Managed Lustre. To search through all roles and permissions, see the role and permission index.

## Google Cloud Managed Lustre roles

Role

Permissions

#### Google Cloud Managed Lustre Admin

(`roles/lustre.admin`)

Full access to Google Cloud Managed Lustre resources.

`lustre.*`

*   `lustre.instances.create`
*   `lustre.instances.delete`
*   `lustre.instances.exportData`
*   `lustre.instances.get`
*   `lustre.instances.importData`
*   `lustre.instances.list`
*   `lustre.instances.rescheduleMaintenance`
*   `lustre.instances.update`
*   `lustre.locations.get`
*   `lustre.locations.list`
*   `lustre.operations.cancel`
*   `lustre.operations.delete`
*   `lustre.operations.get`
*   `lustre.operations.list`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

#### Google Cloud Managed Lustre Viewer

(`roles/lustre.viewer`)

Readonly access to Google Cloud Managed Lustre resources.

`lustre.instances.get`

`lustre.instances.list`

`lustre.locations.*`

*   `lustre.locations.get`
*   `lustre.locations.list`

`lustre.operations.get`

`lustre.operations.list`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

## Google Cloud Managed Lustre permissions

Permission

Included in roles

#### lustre.instances.create

Owner (`roles/owner`)

Editor (`roles/editor`)

Google Cloud Managed Lustre Admin (`roles/lustre.admin`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Kubernetes Engine Service Agent (`roles/container.serviceAgent`)
*   Cluster Director Service Agent (`roles/hypercomputecluster.serviceAgent`)

#### lustre.instances.delete

Owner (`roles/owner`)

Editor (`roles/editor`)

Google Cloud Managed Lustre Admin (`roles/lustre.admin`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Kubernetes Engine Service Agent (`roles/container.serviceAgent`)
*   Cluster Director Service Agent (`roles/hypercomputecluster.serviceAgent`)

#### lustre.instances.exportData

Owner (`roles/owner`)

Editor (`roles/editor`)

Google Cloud Managed Lustre Admin (`roles/lustre.admin`)

#### lustre.instances.get

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Google Cloud Managed Lustre Admin (`roles/lustre.admin`)

Google Cloud Managed Lustre Viewer (`roles/lustre.viewer`)

Support User (`roles/iam.supportUser`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Kubernetes Engine Service Agent (`roles/container.serviceAgent`)
*   Cluster Director Service Agent (`roles/hypercomputecluster.serviceAgent`)

#### lustre.instances.importData

Owner (`roles/owner`)

Editor (`roles/editor`)

Google Cloud Managed Lustre Admin (`roles/lustre.admin`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Kubernetes Engine Service Agent (`roles/container.serviceAgent`)

#### lustre.instances.list

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Google Cloud Managed Lustre Admin (`roles/lustre.admin`)

Google Cloud Managed Lustre Viewer (`roles/lustre.viewer`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Kubernetes Engine Service Agent (`roles/container.serviceAgent`)
*   Cluster Director Service Agent (`roles/hypercomputecluster.serviceAgent`)

#### lustre.instances.rescheduleMaintenance

Owner (`roles/owner`)

Editor (`roles/editor`)

Google Cloud Managed Lustre Admin (`roles/lustre.admin`)

#### lustre.instances.update

Owner (`roles/owner`)

Editor (`roles/editor`)

Google Cloud Managed Lustre Admin (`roles/lustre.admin`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Kubernetes Engine Service Agent (`roles/container.serviceAgent`)
*   Cluster Director Service Agent (`roles/hypercomputecluster.serviceAgent`)

#### lustre.locations.get

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Google Cloud Managed Lustre Admin (`roles/lustre.admin`)

Google Cloud Managed Lustre Viewer (`roles/lustre.viewer`)

Support User (`roles/iam.supportUser`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Kubernetes Engine Service Agent (`roles/container.serviceAgent`)
*   Cluster Director Service Agent (`roles/hypercomputecluster.serviceAgent`)

#### lustre.locations.list

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Google Cloud Managed Lustre Admin (`roles/lustre.admin`)

Google Cloud Managed Lustre Viewer (`roles/lustre.viewer`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Kubernetes Engine Service Agent (`roles/container.serviceAgent`)
*   Cluster Director Service Agent (`roles/hypercomputecluster.serviceAgent`)

#### lustre.operations.cancel

Owner (`roles/owner`)

Editor (`roles/editor`)

Google Cloud Managed Lustre Admin (`roles/lustre.admin`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Kubernetes Engine Service Agent (`roles/container.serviceAgent`)

#### lustre.operations.delete

Owner (`roles/owner`)

Editor (`roles/editor`)

Google Cloud Managed Lustre Admin (`roles/lustre.admin`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Kubernetes Engine Service Agent (`roles/container.serviceAgent`)

#### lustre.operations.get

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Google Cloud Managed Lustre Admin (`roles/lustre.admin`)

Google Cloud Managed Lustre Viewer (`roles/lustre.viewer`)

Support User (`roles/iam.supportUser`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Kubernetes Engine Service Agent (`roles/container.serviceAgent`)
*   Cluster Director Service Agent (`roles/hypercomputecluster.serviceAgent`)

#### lustre.operations.list

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Google Cloud Managed Lustre Admin (`roles/lustre.admin`)

Google Cloud Managed Lustre Viewer (`roles/lustre.viewer`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Kubernetes Engine Service Agent (`roles/container.serviceAgent`)
*   Cluster Director Service Agent (`roles/hypercomputecluster.serviceAgent`)

Send feedback