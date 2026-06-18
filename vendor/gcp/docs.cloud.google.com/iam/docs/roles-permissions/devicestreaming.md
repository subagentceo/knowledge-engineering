# Device Streaming API roles and permissions

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Security
*   IAM
*   Reference

Send feedback

# Device Streaming API roles and permissions Stay organized with collections Save and categorize content based on your preferences.

This page lists the IAM roles and permissions for Device Streaming API. To search through all roles and permissions, see the role and permission index.

## Device Streaming API roles

Role

Permissions

#### Device Streaming Admin

(`roles/devicestreaming.admin`)

Administrator owning access to Direct Access

`cloudtestservice.environmentcatalog.get`

`devicestreaming.*`

*   `devicestreaming.deviceSessions.cancel`
*   `devicestreaming.deviceSessions.create`
*   `devicestreaming.deviceSessions.get`
*   `devicestreaming.deviceSessions.list`
*   `devicestreaming.deviceSessions.update`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

#### Device Streaming Viewer

(`roles/devicestreaming.viewer`)

Viewer, able to see what device streaming sessions exist

`cloudtestservice.environmentcatalog.get`

`devicestreaming.deviceSessions.get`

`devicestreaming.deviceSessions.list`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

## Device Streaming API permissions

Permission

Included in roles

#### devicestreaming.deviceSessions.cancel

Owner (`roles/owner`)

Editor (`roles/editor`)

Device Streaming Admin (`roles/devicestreaming.admin`)

Firebase Test Lab Direct Access Admin (`roles/cloudtestservice.directAccessAdmin`)

#### devicestreaming.deviceSessions.create

Owner (`roles/owner`)

Editor (`roles/editor`)

Device Streaming Admin (`roles/devicestreaming.admin`)

Firebase Test Lab Direct Access Admin (`roles/cloudtestservice.directAccessAdmin`)

#### devicestreaming.deviceSessions.get

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Device Streaming Admin (`roles/devicestreaming.admin`)

Device Streaming Viewer (`roles/devicestreaming.viewer`)

Firebase Test Lab Direct Access Admin (`roles/cloudtestservice.directAccessAdmin`)

Firebase Test Lab Direct Access Viewer (`roles/cloudtestservice.directAccessViewer`)

Support User (`roles/iam.supportUser`)

#### devicestreaming.deviceSessions.list

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Device Streaming Admin (`roles/devicestreaming.admin`)

Device Streaming Viewer (`roles/devicestreaming.viewer`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Firebase Test Lab Direct Access Admin (`roles/cloudtestservice.directAccessAdmin`)

Firebase Test Lab Direct Access Viewer (`roles/cloudtestservice.directAccessViewer`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

#### devicestreaming.deviceSessions.update

Owner (`roles/owner`)

Editor (`roles/editor`)

Device Streaming Admin (`roles/devicestreaming.admin`)

Firebase Test Lab Direct Access Admin (`roles/cloudtestservice.directAccessAdmin`)

Send feedback