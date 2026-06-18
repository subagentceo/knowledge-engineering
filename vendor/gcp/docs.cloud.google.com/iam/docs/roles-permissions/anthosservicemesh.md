# Cloud Service Mesh roles and permissions

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Security
*   IAM
*   Reference

Send feedback

# Cloud Service Mesh roles and permissions Stay organized with collections Save and categorize content based on your preferences.

This page lists the IAM roles and permissions for Cloud Service Mesh. To search through all roles and permissions, see the role and permission index.

## Cloud Service Mesh roles

Role

Permissions

#### Mesh Config Admin Beta

(`roles/meshconfig.admin`)

Full access to all mesh configuration resources

`meshconfig.projects.init`

#### Mesh Config Viewer Beta

(`roles/meshconfig.viewer`)

Read access to mesh configuration

#### Trafficdirector Admin Beta

(`roles/trafficdirector.admin`)

Admin role for trafficdirector

`resourcemanager.projects.get`

`resourcemanager.projects.list`

`trafficdirector.*`

*   `trafficdirector.networks.getConfigs`
*   `trafficdirector.networks.reportMetrics`

#### Trafficdirector Viewer Beta

(`roles/trafficdirector.viewer`)

Viewer role for trafficdirector

`resourcemanager.projects.get`

`resourcemanager.projects.list`

`trafficdirector.networks.getConfigs`

#### Traffic Director Client Beta

(`roles/trafficdirector.client`)

Fetch service configurations and report metrics.

`trafficdirector.*`

*   `trafficdirector.networks.getConfigs`
*   `trafficdirector.networks.reportMetrics`

### Service agent roles

Service agent roles should only be granted to service agents.

Role

Permissions

#### Anthos Service Mesh Service Agent

(`roles/anthosservicemesh.serviceAgent`)

Gives the Anthos Service Mesh service agent access to Cloud Platform resources.

**Warning:** Do not grant service agent roles to any principals except service agents.

`compute.backendServices.create`

`compute.backendServices.delete`

`compute.backendServices.get`

`compute.backendServices.list`

`compute.backendServices.update`

`compute.backendServices.use`

`compute.firewalls.create`

`compute.firewalls.delete`

`compute.firewalls.get`

`compute.firewalls.update`

`compute.globalNetworkEndpointGroups.attachNetworkEndpoints`

`compute.globalNetworkEndpointGroups.create`

`compute.globalNetworkEndpointGroups.delete`

`compute.globalNetworkEndpointGroups.detachNetworkEndpoints`

`compute.globalNetworkEndpointGroups.get`

`compute.globalNetworkEndpointGroups.list`

`compute.globalNetworkEndpointGroups.use`

`compute.globalOperations.get`

`compute.healthChecks.create`

`compute.healthChecks.delete`

`compute.healthChecks.get`

`compute.healthChecks.list`

`compute.healthChecks.update`

`compute.healthChecks.use`

`compute.healthChecks.useReadOnly`

`compute.instances.use`

`compute.networkEndpointGroups.attachNetworkEndpoints`

`compute.networkEndpointGroups.create`

`compute.networkEndpointGroups.delete`

`compute.networkEndpointGroups.detachNetworkEndpoints`

`compute.networkEndpointGroups.get`

`compute.networkEndpointGroups.list`

`compute.networkEndpointGroups.use`

`compute.networks.updatePolicy`

`compute.regionNetworkEndpointGroups.attachNetworkEndpoints`

`compute.regionNetworkEndpointGroups.create`

`compute.regionNetworkEndpointGroups.delete`

`compute.regionNetworkEndpointGroups.detachNetworkEndpoints`

`compute.regionNetworkEndpointGroups.get`

`compute.regionNetworkEndpointGroups.list`

`compute.regionNetworkEndpointGroups.use`

`compute.regions.list`

`compute.zones.list`

`container.backendConfigs.*`

*   `container.backendConfigs.create`
*   `container.backendConfigs.delete`
*   `container.backendConfigs.get`
*   `container.backendConfigs.list`
*   `container.backendConfigs.update`

`container.clusterRoleBindings.*`

*   `container.clusterRoleBindings.create`
*   `container.clusterRoleBindings.delete`
*   `container.clusterRoleBindings.get`
*   `container.clusterRoleBindings.list`
*   `container.clusterRoleBindings.update`

`container.clusterRoles.*`

*   `container.clusterRoles.bind`
*   `container.clusterRoles.create`
*   `container.clusterRoles.delete`
*   `container.clusterRoles.escalate`
*   `container.clusterRoles.get`
*   `container.clusterRoles.list`
*   `container.clusterRoles.update`

`container.clusters.connect`

`container.clusters.get`

`container.clusters.update`

`container.configMaps.*`

*   `container.configMaps.create`
*   `container.configMaps.delete`
*   `container.configMaps.get`
*   `container.configMaps.list`
*   `container.configMaps.update`

`container.customResourceDefinitions.create`

`container.customResourceDefinitions.get`

`container.customResourceDefinitions.list`

`container.customResourceDefinitions.update`

`container.daemonSets.create`

`container.daemonSets.delete`

`container.daemonSets.get`

`container.daemonSets.getStatus`

`container.daemonSets.list`

`container.daemonSets.update`

`container.deployments.get`

`container.deployments.list`

`container.events.get`

`container.events.list`

`container.jobs.create`

`container.jobs.delete`

`container.jobs.get`

`container.jobs.list`

`container.jobs.update`

`container.mutatingWebhookConfigurations.create`

`container.mutatingWebhookConfigurations.get`

`container.mutatingWebhookConfigurations.list`

`container.mutatingWebhookConfigurations.update`

`container.namespaces.create`

`container.namespaces.get`

`container.namespaces.list`

`container.operations.get`

`container.pods.get`

`container.pods.list`

`container.secrets.*`

*   `container.secrets.create`
*   `container.secrets.delete`
*   `container.secrets.get`
*   `container.secrets.list`
*   `container.secrets.update`

`container.serviceAccounts.create`

`container.serviceAccounts.delete`

`container.serviceAccounts.get`

`container.serviceAccounts.list`

`container.serviceAccounts.update`

`container.services.get`

`container.services.list`

`container.thirdPartyObjects.create`

`container.thirdPartyObjects.get`

`container.thirdPartyObjects.list`

`container.thirdPartyObjects.update`

`container.validatingWebhookConfigurations.*`

*   `container.validatingWebhookConfigurations.create`
*   `container.validatingWebhookConfigurations.delete`
*   `container.validatingWebhookConfigurations.get`
*   `container.validatingWebhookConfigurations.list`
*   `container.validatingWebhookConfigurations.update`

`gkehub.features.get`

`gkehub.gateway.delete`

`gkehub.gateway.generateCredentials`

`gkehub.gateway.get`

`gkehub.gateway.patch`

`gkehub.gateway.post`

`gkehub.gateway.put`

`gkehub.locations.*`

*   `gkehub.locations.get`
*   `gkehub.locations.list`

`gkehub.memberships.get`

`gkehub.memberships.list`

`logging.logEntries.create`

`meshconfig.projects.init`

`monitoring.metricDescriptors.create`

`monitoring.metricDescriptors.get`

`monitoring.metricDescriptors.list`

`monitoring.monitoredResourceDescriptors.*`

*   `monitoring.monitoredResourceDescriptors.get`
*   `monitoring.monitoredResourceDescriptors.list`

`monitoring.timeSeries.create`

`networksecurity.authorizationPolicies.create`

`networksecurity.authorizationPolicies.delete`

`networksecurity.authorizationPolicies.get`

`networksecurity.authorizationPolicies.list`

`networksecurity.authorizationPolicies.update`

`networksecurity.authorizationPolicies.use`

`networksecurity.clientTlsPolicies.create`

`networksecurity.clientTlsPolicies.delete`

`networksecurity.clientTlsPolicies.get`

`networksecurity.clientTlsPolicies.list`

`networksecurity.clientTlsPolicies.update`

`networksecurity.clientTlsPolicies.use`

`networksecurity.operations.*`

*   `networksecurity.operations.cancel`
*   `networksecurity.operations.delete`
*   `networksecurity.operations.get`
*   `networksecurity.operations.list`

`networksecurity.serverTlsPolicies.create`

`networksecurity.serverTlsPolicies.delete`

`networksecurity.serverTlsPolicies.get`

`networksecurity.serverTlsPolicies.list`

`networksecurity.serverTlsPolicies.update`

`networksecurity.serverTlsPolicies.use`

`networkservices.endpointPolicies.*`

*   `networkservices.endpointPolicies.create`
*   `networkservices.endpointPolicies.delete`
*   `networkservices.endpointPolicies.get`
*   `networkservices.endpointPolicies.list`
*   `networkservices.endpointPolicies.update`

`networkservices.gateways.create`

`networkservices.gateways.delete`

`networkservices.gateways.get`

`networkservices.gateways.list`

`networkservices.gateways.update`

`networkservices.gateways.use`

`networkservices.grpcRoutes.*`

*   `networkservices.grpcRoutes.create`
*   `networkservices.grpcRoutes.delete`
*   `networkservices.grpcRoutes.get`
*   `networkservices.grpcRoutes.list`
*   `networkservices.grpcRoutes.update`

`networkservices.httpFilters.create`

`networkservices.httpFilters.delete`

`networkservices.httpFilters.get`

`networkservices.httpFilters.list`

`networkservices.httpFilters.update`

`networkservices.httpRoutes.*`

*   `networkservices.httpRoutes.create`
*   `networkservices.httpRoutes.delete`
*   `networkservices.httpRoutes.get`
*   `networkservices.httpRoutes.list`
*   `networkservices.httpRoutes.update`

`networkservices.meshes.create`

`networkservices.meshes.delete`

`networkservices.meshes.get`

`networkservices.meshes.list`

`networkservices.meshes.update`

`networkservices.meshes.use`

`networkservices.operations.*`

*   `networkservices.operations.cancel`
*   `networkservices.operations.delete`
*   `networkservices.operations.get`
*   `networkservices.operations.list`

`networkservices.serviceLbPolicies.*`

*   `networkservices.serviceLbPolicies.create`
*   `networkservices.serviceLbPolicies.delete`
*   `networkservices.serviceLbPolicies.get`
*   `networkservices.serviceLbPolicies.list`
*   `networkservices.serviceLbPolicies.update`

`networkservices.tcpRoutes.*`

*   `networkservices.tcpRoutes.create`
*   `networkservices.tcpRoutes.delete`
*   `networkservices.tcpRoutes.get`
*   `networkservices.tcpRoutes.list`
*   `networkservices.tcpRoutes.update`

`networkservices.tlsRoutes.*`

*   `networkservices.tlsRoutes.create`
*   `networkservices.tlsRoutes.delete`
*   `networkservices.tlsRoutes.get`
*   `networkservices.tlsRoutes.list`
*   `networkservices.tlsRoutes.update`

`orgpolicy.policy.get`

`resourcemanager.projects.get`

`serviceusage.consumerpolicy.analyze`

`serviceusage.consumerpolicy.get`

`serviceusage.effectivepolicy.get`

`serviceusage.groups.*`

*   `serviceusage.groups.list`
*   `serviceusage.groups.listExpandedMembers`
*   `serviceusage.groups.listMembers`

`serviceusage.services.get`

`serviceusage.services.use`

`serviceusage.values.test`

`trafficdirector.*`

*   `trafficdirector.networks.getConfigs`
*   `trafficdirector.networks.reportMetrics`

`workloadcertificate.locations.*`

*   `workloadcertificate.locations.get`
*   `workloadcertificate.locations.list`

`workloadcertificate.operations.get`

`workloadcertificate.workloadCertificateFeature.get`

`workloadcertificate.workloadRegistrations.create`

`workloadcertificate.workloadRegistrations.get`

`workloadcertificate.workloadRegistrations.list`

#### Mesh Config Service Agent

(`roles/meshconfig.serviceAgent`)

Apply mesh configuration

**Warning:** Do not grant service agent roles to any principals except service agents.

`compute.backendServices.create`

`compute.backendServices.delete`

`compute.backendServices.get`

`compute.backendServices.list`

`compute.backendServices.setSecurityPolicy`

`compute.backendServices.update`

`compute.backendServices.use`

`compute.firewalls.create`

`compute.firewalls.delete`

`compute.firewalls.get`

`compute.firewalls.list`

`compute.firewalls.update`

`compute.globalForwardingRules.create`

`compute.globalForwardingRules.delete`

`compute.globalForwardingRules.get`

`compute.globalForwardingRules.list`

`compute.globalForwardingRules.setLabels`

`compute.globalForwardingRules.setTarget`

`compute.globalOperations.get`

`compute.globalOperations.list`

`compute.healthChecks.create`

`compute.healthChecks.delete`

`compute.healthChecks.get`

`compute.healthChecks.list`

`compute.healthChecks.update`

`compute.healthChecks.use`

`compute.healthChecks.useReadOnly`

`compute.networkEndpointGroups.get`

`compute.networkEndpointGroups.list`

`compute.networkEndpointGroups.use`

`compute.networks.get`

`compute.networks.updatePolicy`

`compute.networks.use`

`compute.regionTargetTcpProxies.create`

`compute.regionTargetTcpProxies.delete`

`compute.regionTargetTcpProxies.get`

`compute.regionTargetTcpProxies.list`

`compute.regionTargetTcpProxies.use`

`compute.subnetworks.use`

`compute.targetHttpProxies.create`

`compute.targetHttpProxies.delete`

`compute.targetHttpProxies.get`

`compute.targetHttpProxies.list`

`compute.targetHttpProxies.setUrlMap`

`compute.targetHttpProxies.use`

`compute.targetHttpsProxies.create`

`compute.targetHttpsProxies.delete`

`compute.targetHttpsProxies.get`

`compute.targetHttpsProxies.list`

`compute.targetHttpsProxies.setSslCertificates`

`compute.targetHttpsProxies.setSslPolicy`

`compute.targetHttpsProxies.setUrlMap`

`compute.targetHttpsProxies.use`

`compute.targetSslProxies.create`

`compute.targetSslProxies.delete`

`compute.targetSslProxies.get`

`compute.targetSslProxies.list`

`compute.targetSslProxies.setBackendService`

`compute.targetSslProxies.setProxyHeader`

`compute.targetSslProxies.setSslCertificates`

`compute.targetSslProxies.use`

`compute.targetTcpProxies.create`

`compute.targetTcpProxies.delete`

`compute.targetTcpProxies.get`

`compute.targetTcpProxies.list`

`compute.targetTcpProxies.update`

`compute.targetTcpProxies.use`

`compute.urlMaps.create`

`compute.urlMaps.delete`

`compute.urlMaps.get`

`compute.urlMaps.invalidateCache`

`compute.urlMaps.list`

`compute.urlMaps.update`

`compute.urlMaps.use`

`compute.urlMaps.validate`

`networksecurity.clientTlsPolicies.create`

`networksecurity.clientTlsPolicies.delete`

`networksecurity.clientTlsPolicies.get`

`networksecurity.clientTlsPolicies.list`

`networksecurity.clientTlsPolicies.update`

`networksecurity.serverTlsPolicies.create`

`networksecurity.serverTlsPolicies.delete`

`networksecurity.serverTlsPolicies.get`

`networksecurity.serverTlsPolicies.list`

`networksecurity.serverTlsPolicies.update`

`networkservices.httpFilters.create`

`networkservices.httpFilters.delete`

`networkservices.httpFilters.get`

`networkservices.httpFilters.list`

`networkservices.httpFilters.update`

`networkservices.httpfilters.create`

`networkservices.httpfilters.delete`

`networkservices.httpfilters.get`

`networkservices.httpfilters.list`

`networkservices.httpfilters.update`

#### Mesh Data Plane Service Agent

(`roles/meshdataplane.serviceAgent`)

Run user-space Istio components

**Warning:** Do not grant service agent roles to any principals except service agents.

`cloudtrace.traces.patch`

`compute.forwardingRules.get`

`compute.globalForwardingRules.get`

`logging.logEntries.create`

`logging.logEntries.route`

`monitoring.metricDescriptors.create`

`monitoring.metricDescriptors.get`

`monitoring.metricDescriptors.list`

`monitoring.monitoredResourceDescriptors.*`

*   `monitoring.monitoredResourceDescriptors.get`
*   `monitoring.monitoredResourceDescriptors.list`

`monitoring.timeSeries.create`

`serviceusage.services.use`

`telemetry.traces.write`

## Cloud Service Mesh permissions

Permission

Included in roles

#### meshconfig.projects.init

Owner (`roles/owner`)

Editor (`roles/editor`)

Mesh Config Admin (`roles/meshconfig.admin`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Anthos Service Mesh Service Agent (`roles/anthosservicemesh.serviceAgent`)
*   KRM API Hosting AnthosApiEndpoint Service Agent (`roles/krmapihosting.anthosApiEndpointServiceAgent`)

#### trafficdirector.networks.getConfigs

Owner (`roles/owner`)

Editor (`roles/editor`)

Viewer (`roles/viewer`)

Compute Network Admin (`roles/compute.networkAdmin`)

Compute Network Viewer (`roles/compute.networkViewer`)

Trafficdirector Admin (`roles/trafficdirector.admin`)

Trafficdirector Viewer (`roles/trafficdirector.viewer`)

Infrastructure Administrator (`roles/iam.infrastructureAdmin`)

Network Administrator (`roles/iam.networkAdmin`)

Security Auditor (`roles/iam.securityAuditor`)

Support User (`roles/iam.supportUser`)

Traffic Director Client (`roles/trafficdirector.client`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Anthos Service Mesh Service Agent (`roles/anthosservicemesh.serviceAgent`)
*   Cloud TPU V2 API Service Agent (`roles/cloudtpu.serviceAgent`)
*   Cloud Composer API Service Agent (`roles/composer.serviceAgent`)
*   Kubernetes Engine Default Node Service Agent (`roles/container.defaultNodeServiceAgent`)
*   Kubernetes Engine Service Agent (`roles/container.serviceAgent`)
*   Cloud Dataflow Service Agent (`roles/dataflow.serviceAgent`)
*   Cloud Data Fusion API Service Agent (`roles/datafusion.serviceAgent`)
*   Mesh Managed Control Plane Service Agent (`roles/meshcontrolplane.serviceAgent`)

#### trafficdirector.networks.reportMetrics

Owner (`roles/owner`)

Editor (`roles/editor`)

Compute Network Admin (`roles/compute.networkAdmin`)

Compute Network Viewer (`roles/compute.networkViewer`)

Trafficdirector Admin (`roles/trafficdirector.admin`)

Infrastructure Administrator (`roles/iam.infrastructureAdmin`)

Network Administrator (`roles/iam.networkAdmin`)

Security Auditor (`roles/iam.securityAuditor`)

Traffic Director Client (`roles/trafficdirector.client`)

Service agent roles

**Warning:** Don't grant service agent roles to any principals except service agents.

*   Anthos Service Mesh Service Agent (`roles/anthosservicemesh.serviceAgent`)
*   Cloud TPU V2 API Service Agent (`roles/cloudtpu.serviceAgent`)
*   Cloud Composer API Service Agent (`roles/composer.serviceAgent`)
*   Kubernetes Engine Default Node Service Agent (`roles/container.defaultNodeServiceAgent`)
*   Kubernetes Engine Service Agent (`roles/container.serviceAgent`)
*   Cloud Dataflow Service Agent (`roles/dataflow.serviceAgent`)
*   Cloud Data Fusion API Service Agent (`roles/datafusion.serviceAgent`)
*   Mesh Managed Control Plane Service Agent (`roles/meshcontrolplane.serviceAgent`)

Send feedback