# Artifact Analysis roles and permissions

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Security
*   IAM
*   Reference

Send feedback

# Artifact Analysis roles and permissions Stay organized with collections Save and categorize content based on your preferences.

This page lists the IAM roles and permissions for Artifact Analysis. To search through all roles and permissions, see the role and permission index.

## Artifact Analysis roles

Role

Permissions

#### Container Analysis Admin

(`roles/containeranalysis.admin`)

Access to all Container Analysis resources.

`containeranalysis.notes.attachOccurrence`

`containeranalysis.notes.create`

`containeranalysis.notes.delete`

`containeranalysis.notes.get`

`containeranalysis.notes.getIamPolicy`

`containeranalysis.notes.list`

`containeranalysis.notes.setIamPolicy`

`containeranalysis.notes.update`

`containeranalysis.occurrences.*`

*   `containeranalysis.occurrences.create`
*   `containeranalysis.occurrences.delete`
*   `containeranalysis.occurrences.get`
*   `containeranalysis.occurrences.getIamPolicy`
*   `containeranalysis.occurrences.list`
*   `containeranalysis.occurrences.setIamPolicy`
*   `containeranalysis.occurrences.update`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

#### Container Analysis Editor

(`roles/containeranalysis.editor`)

Editor role for Container Analysis

`containeranalysis.notes.attachOccurrence`

`containeranalysis.notes.create`

`containeranalysis.notes.delete`

`containeranalysis.notes.get`

`containeranalysis.notes.getIamPolicy`

`containeranalysis.notes.list`

`containeranalysis.notes.listOccurrences`

`containeranalysis.notes.update`

`containeranalysis.occurrences.create`

`containeranalysis.occurrences.delete`

`containeranalysis.occurrences.get`

`containeranalysis.occurrences.getIamPolicy`

`containeranalysis.occurrences.list`

`containeranalysis.occurrences.update`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

#### Container Analysis Viewer

(`roles/containeranalysis.viewer`)

Viewer role for Container Analysis

`containeranalysis.notes.get`

`containeranalysis.notes.getIamPolicy`

`containeranalysis.notes.list`

`containeranalysis.occurrences.get`

`containeranalysis.occurrences.getIamPolicy`

`containeranalysis.occurrences.list`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

#### Container Analysis Notes Attacher

(`roles/containeranalysis.notes.attacher`)

Can attach Container Analysis Occurrences to Notes.

`containeranalysis.notes.attachOccurrence`

`containeranalysis.notes.get`

#### Container Analysis Notes Editor

(`roles/containeranalysis.notes.editor`)

Can edit Container Analysis Notes.

`containeranalysis.notes.attachOccurrence`

`containeranalysis.notes.create`

`containeranalysis.notes.delete`

`containeranalysis.notes.get`

`containeranalysis.notes.list`

`containeranalysis.notes.update`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

#### Container Analysis Occurrences for Notes Viewer

(`roles/containeranalysis.notes.occurrences.viewer`)

Can view all Container Analysis Occurrences attached to a Note.

`containeranalysis.notes.get`

`containeranalysis.notes.listOccurrences`

#### Container Analysis Notes Viewer

(`roles/containeranalysis.notes.viewer`)

Can view Container Analysis Notes.

`containeranalysis.notes.get`

`containeranalysis.notes.list`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

#### Container Analysis Occurrences Editor

(`roles/containeranalysis.occurrences.editor`)

Can edit Container Analysis Occurrences.

`containeranalysis.occurrences.create`

`containeranalysis.occurrences.delete`

`containeranalysis.occurrences.get`

`containeranalysis.occurrences.list`

`containeranalysis.occurrences.update`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

#### Container Analysis Occurrences Viewer

(`roles/containeranalysis.occurrences.viewer`)

Can view Container Analysis Occurrences.

`containeranalysis.occurrences.get`

`containeranalysis.occurrences.list`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

### Service agent roles

Service agent roles should only be granted to service agents.

Role

Permissions

#### Container Analysis Service Agent

(`roles/containeranalysis.ServiceAgent`)

Gives Container Analysis API the access it needs to function

**Warning:** Do not grant service agent roles to any principals except service agents.

`artifactregistry.attachments.get`

`artifactregistry.attachments.list`

`artifactregistry.dockerimages.*`

*   `artifactregistry.dockerimages.get`
*   `artifactregistry.dockerimages.list`

`artifactregistry.files.download`

`artifactregistry.files.get`

`artifactregistry.files.list`

`artifactregistry.locations.*`

*   `artifactregistry.locations.get`
*   `artifactregistry.locations.list`

`artifactregistry.mavenartifacts.*`

*   `artifactregistry.mavenartifacts.get`
*   `artifactregistry.mavenartifacts.list`

`artifactregistry.npmpackages.*`

*   `artifactregistry.npmpackages.get`
*   `artifactregistry.npmpackages.list`

`artifactregistry.packages.get`

`artifactregistry.packages.list`

`artifactregistry.projectconfigs.get`

`artifactregistry.projectsettings.get`

`artifactregistry.pythonpackages.*`

*   `artifactregistry.pythonpackages.get`
*   `artifactregistry.pythonpackages.list`

`artifactregistry.repositories.downloadArtifacts`

`artifactregistry.repositories.exportArtifacts`

`artifactregistry.repositories.get`

`artifactregistry.repositories.list`

`artifactregistry.repositories.listEffectiveTags`

`artifactregistry.repositories.listTagBindings`

`artifactregistry.repositories.readViaVirtualRepository`

`artifactregistry.rules.get`

`artifactregistry.rules.list`

`artifactregistry.tags.get`

`artifactregistry.tags.list`

`artifactregistry.versions.get`

`artifactregistry.versions.list`

`containeranalysis.notes.list`

`containeranalysis.occurrences.create`

`containeranalysis.occurrences.delete`

`containeranalysis.occurrences.get`

`containeranalysis.occurrences.list`

`containeranalysis.occurrences.update`

`pubsub.messageTransforms.validate`

`pubsub.schemas.attach`

`pubsub.schemas.commit`

`pubsub.schemas.create`

`pubsub.schemas.delete`

`pubsub.schemas.get`

`pubsub.schemas.list`

`pubsub.schemas.listRevisions`

`pubsub.schemas.rollback`

`pubsub.schemas.validate`

`pubsub.snapshots.create`

`pubsub.snapshots.delete`

`pubsub.snapshots.get`

`pubsub.snapshots.list`

`pubsub.snapshots.listEffectiveTags`

`pubsub.snapshots.listTagBindings`

`pubsub.snapshots.seek`

`pubsub.snapshots.update`

`pubsub.subscriptions.consume`

`pubsub.subscriptions.create`

`pubsub.subscriptions.delete`

`pubsub.subscriptions.get`

`pubsub.subscriptions.list`

`pubsub.subscriptions.listEffectiveTags`

`pubsub.subscriptions.listTagBindings`

`pubsub.subscriptions.update`

`pubsub.topics.attachSubscription`

`pubsub.topics.create`

`pubsub.topics.delete`

`pubsub.topics.detachSubscription`

`pubsub.topics.get`

`pubsub.topics.list`

`pubsub.topics.listEffectiveTags`

`pubsub.topics.listTagBindings`

`pubsub.topics.publish`

`pubsub.topics.update`

`pubsub.topics.updateTag`

`resourcemanager.projects.get`

`resourcemanager.projects.list`

`serviceusage.consumerpolicy.analyze`

`serviceusage.consumerpolicy.get`

`serviceusage.effectivepolicy.get`

`serviceusage.groups.*`

*   `serviceusage.groups.list`
*   `serviceusage.groups.listExpandedMembers`
*   `serviceusage.groups.listMembers`

`serviceusage.quotas.get`

`serviceusage.services.get`

`serviceusage.services.list`

`serviceusage.values.test`

`storage.objects.get`

`storage.objects.list`

## Artifact Analysis permissions

Permission

Included in roles

#### containeranalysis.notes.attachOccurrence

Owner (`roles/owner`)

Editor (`roles/editor`)

Container Analysis Admin (`roles/containeranalysis.admin`)

Container Analysis Editor (`roles/containeranalysis.editor`)

Container Analysis Notes Attacher (`roles/containeranalysis.notes.attacher`)

Container Analysis Notes Editor (`roles/containeranalysis.notes.editor`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Cloud Build Service Agent (`roles/cloudbuild.serviceAgent`)
*   Compliance Scanning Service Agent (`roles/compliancescanning.serviceAgent`)
*   Cloud OS Config Service Agent (`roles/osconfig.serviceAgent`)

#### containeranalysis.notes.create

Owner (`roles/owner`)

Editor (`roles/editor`)

Container Analysis Admin (`roles/containeranalysis.admin`)

Container Analysis Editor (`roles/containeranalysis.editor`)

Container Analysis Notes Editor (`roles/containeranalysis.notes.editor`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Cloud Build Service Agent (`roles/cloudbuild.serviceAgent`)
*   Compliance Scanning Service Agent (`roles/compliancescanning.serviceAgent`)
*   Cloud OS Config Service Agent (`roles/osconfig.serviceAgent`)

#### containeranalysis.notes.delete

Owner (`roles/owner`)

Editor (`roles/editor`)

Container Analysis Admin (`roles/containeranalysis.admin`)

Container Analysis Editor (`roles/containeranalysis.editor`)

Container Analysis Notes Editor (`roles/containeranalysis.notes.editor`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Cloud Build Service Agent (`roles/cloudbuild.serviceAgent`)
*   Compliance Scanning Service Agent (`roles/compliancescanning.serviceAgent`)
*   Cloud OS Config Service Agent (`roles/osconfig.serviceAgent`)

#### containeranalysis.notes.get

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Container Analysis Admin (`roles/containeranalysis.admin`)

Container Analysis Editor (`roles/containeranalysis.editor`)

Container Analysis Viewer (`roles/containeranalysis.viewer`)

Container Analysis Notes Attacher (`roles/containeranalysis.notes.attacher`)

Container Analysis Notes Editor (`roles/containeranalysis.notes.editor`)

Container Analysis Occurrences for Notes Viewer (`roles/containeranalysis.notes.occurrences.viewer`)

Container Analysis Notes Viewer (`roles/containeranalysis.notes.viewer`)

Support User (`roles/iam.supportUser`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Binary Authorization Service Agent (`roles/binaryauthorization.serviceAgent`)
*   Cloud Build Service Agent (`roles/cloudbuild.serviceAgent`)
*   Compliance Scanning Service Agent (`roles/compliancescanning.serviceAgent`)
*   Cloud OS Config Service Agent (`roles/osconfig.serviceAgent`)

#### containeranalysis.notes.getIamPolicy

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Container Analysis Admin (`roles/containeranalysis.admin`)

Container Analysis Editor (`roles/containeranalysis.editor`)

Container Analysis Viewer (`roles/containeranalysis.viewer`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

#### containeranalysis.notes.list

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Container Analysis Admin (`roles/containeranalysis.admin`)

Container Analysis Editor (`roles/containeranalysis.editor`)

Container Analysis Viewer (`roles/containeranalysis.viewer`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Container Analysis Notes Editor (`roles/containeranalysis.notes.editor`)

Container Analysis Notes Viewer (`roles/containeranalysis.notes.viewer`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Binary Authorization Service Agent (`roles/binaryauthorization.serviceAgent`)
*   Cloud Build Service Agent (`roles/cloudbuild.serviceAgent`)
*   Compliance Scanning Service Agent (`roles/compliancescanning.serviceAgent`)
*   Container Analysis Service Agent (`roles/containeranalysis.ServiceAgent`)
*   Container Scanner Service Agent (`roles/containerscanning.ServiceAgent`)
*   Cloud OS Config Service Agent (`roles/osconfig.serviceAgent`)

#### containeranalysis.notes.listOccurrences

Owner (`roles/owner`)

Editor (`roles/editor`)

Container Analysis Editor (`roles/containeranalysis.editor`)

Container Analysis Occurrences for Notes Viewer (`roles/containeranalysis.notes.occurrences.viewer`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Binary Authorization Service Agent (`roles/binaryauthorization.serviceAgent`)

#### containeranalysis.notes.setIamPolicy

Owner (`roles/owner`)

Container Analysis Admin (`roles/containeranalysis.admin`)

Security Admin (`roles/iam.securityAdmin`)

#### containeranalysis.notes.update

Owner (`roles/owner`)

Editor (`roles/editor`)

Container Analysis Admin (`roles/containeranalysis.admin`)

Container Analysis Editor (`roles/containeranalysis.editor`)

Container Analysis Notes Editor (`roles/containeranalysis.notes.editor`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Cloud Build Service Agent (`roles/cloudbuild.serviceAgent`)
*   Compliance Scanning Service Agent (`roles/compliancescanning.serviceAgent`)
*   Cloud OS Config Service Agent (`roles/osconfig.serviceAgent`)

#### containeranalysis.occurrences.create

Owner (`roles/owner`)

Editor (`roles/editor`)

Cloud Build Service Account (`roles/cloudbuild.builds.builder`)

Container Analysis Admin (`roles/containeranalysis.admin`)

Container Analysis Editor (`roles/containeranalysis.editor`)

Composer Worker (`roles/composer.worker`)

Container Analysis Occurrences Editor (`roles/containeranalysis.occurrences.editor`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Cloud Build Service Agent (`roles/cloudbuild.serviceAgent`)
*   Compliance Scanning Service Agent (`roles/compliancescanning.serviceAgent`)
*   Container Analysis Service Agent (`roles/containeranalysis.ServiceAgent`)
*   Container Scanner Service Agent (`roles/containerscanning.ServiceAgent`)
*   Cloud OS Config Service Agent (`roles/osconfig.serviceAgent`)

#### containeranalysis.occurrences.delete

Owner (`roles/owner`)

Editor (`roles/editor`)

Cloud Build Service Account (`roles/cloudbuild.builds.builder`)

Container Analysis Admin (`roles/containeranalysis.admin`)

Container Analysis Editor (`roles/containeranalysis.editor`)

Composer Worker (`roles/composer.worker`)

Container Analysis Occurrences Editor (`roles/containeranalysis.occurrences.editor`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Cloud Build Service Agent (`roles/cloudbuild.serviceAgent`)
*   Compliance Scanning Service Agent (`roles/compliancescanning.serviceAgent`)
*   Container Analysis Service Agent (`roles/containeranalysis.ServiceAgent`)
*   Container Scanner Service Agent (`roles/containerscanning.ServiceAgent`)
*   Cloud OS Config Service Agent (`roles/osconfig.serviceAgent`)

#### containeranalysis.occurrences.get

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Cloud Build Service Account (`roles/cloudbuild.builds.builder`)

Container Analysis Admin (`roles/containeranalysis.admin`)

Container Analysis Editor (`roles/containeranalysis.editor`)

Container Analysis Viewer (`roles/containeranalysis.viewer`)

Composer Worker (`roles/composer.worker`)

Container Analysis Occurrences Editor (`roles/containeranalysis.occurrences.editor`)

Container Analysis Occurrences Viewer (`roles/containeranalysis.occurrences.viewer`)

Developer Connect Insights Config Agent (`roles/developerconnect.insightsAgent`)

Support User (`roles/iam.supportUser`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Binary Authorization Service Agent (`roles/binaryauthorization.serviceAgent`)
*   Cloud Build Service Agent (`roles/cloudbuild.serviceAgent`)
*   Compliance Scanning Service Agent (`roles/compliancescanning.serviceAgent`)
*   Container Analysis Service Agent (`roles/containeranalysis.ServiceAgent`)
*   Container Scanner Service Agent (`roles/containerscanning.ServiceAgent`)
*   Cloud OS Config Service Agent (`roles/osconfig.serviceAgent`)

#### containeranalysis.occurrences.getIamPolicy

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Container Analysis Admin (`roles/containeranalysis.admin`)

Container Analysis Editor (`roles/containeranalysis.editor`)

Container Analysis Viewer (`roles/containeranalysis.viewer`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

#### containeranalysis.occurrences.list

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Cloud Build Service Account (`roles/cloudbuild.builds.builder`)

Container Analysis Admin (`roles/containeranalysis.admin`)

Container Analysis Editor (`roles/containeranalysis.editor`)

Container Analysis Viewer (`roles/containeranalysis.viewer`)

Security Admin (`roles/iam.securityAdmin`)

Security Reviewer (`roles/iam.securityReviewer`)

Composer Worker (`roles/composer.worker`)

Container Analysis Occurrences Editor (`roles/containeranalysis.occurrences.editor`)

Container Analysis Occurrences Viewer (`roles/containeranalysis.occurrences.viewer`)

Developer Connect Insights Config Agent (`roles/developerconnect.insightsAgent`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Binary Authorization Service Agent (`roles/binaryauthorization.serviceAgent`)
*   Cloud Build Service Agent (`roles/cloudbuild.serviceAgent`)
*   Compliance Scanning Service Agent (`roles/compliancescanning.serviceAgent`)
*   Container Analysis Service Agent (`roles/containeranalysis.ServiceAgent`)
*   Container Scanner Service Agent (`roles/containerscanning.ServiceAgent`)
*   Cloud OS Config Service Agent (`roles/osconfig.serviceAgent`)

#### containeranalysis.occurrences.setIamPolicy

Owner (`roles/owner`)

Container Analysis Admin (`roles/containeranalysis.admin`)

Security Admin (`roles/iam.securityAdmin`)

#### containeranalysis.occurrences.update

Owner (`roles/owner`)

Editor (`roles/editor`)

Cloud Build Service Account (`roles/cloudbuild.builds.builder`)

Container Analysis Admin (`roles/containeranalysis.admin`)

Container Analysis Editor (`roles/containeranalysis.editor`)

Composer Worker (`roles/composer.worker`)

Container Analysis Occurrences Editor (`roles/containeranalysis.occurrences.editor`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Cloud Build Service Agent (`roles/cloudbuild.serviceAgent`)
*   Compliance Scanning Service Agent (`roles/compliancescanning.serviceAgent`)
*   Container Analysis Service Agent (`roles/containeranalysis.ServiceAgent`)
*   Container Scanner Service Agent (`roles/containerscanning.ServiceAgent`)
*   Cloud OS Config Service Agent (`roles/osconfig.serviceAgent`)

Send feedback