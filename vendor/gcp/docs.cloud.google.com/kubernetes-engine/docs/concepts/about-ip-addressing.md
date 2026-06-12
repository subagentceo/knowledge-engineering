# Understand IP addressing in GKE

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Google Kubernetes Engine (GKE)
*   GKE networking
*   Guides

Send feedback

# Understand IP addressing in GKE Stay organized with collections Save and categorize content based on your preferences.

Autopilot Standard

To build scalable and secure Google Kubernetes Engine (GKE) clusters, you must effectively manage IP addressing. This document gives you a comprehensive overview of how GKE uses IP addresses for cluster communication, the supported networking models, and best practices for effective IP address management.

This document is for Cloud architects and Networking specialists who design and architect the network for their organization. For more information about common roles and example tasks within Google Cloud, see Common GKE Enterprise user roles and tasks.

Before proceeding, make sure you are familiar with the following concepts:

*   **Basic networking:** including IP addresses, CIDR, firewalls, and Network Address Translation (NAT).
*   **Core Kubernetes components:** such as clusters, nodes, Pods, and Services.

### How IP addresses connect GKE components

GKE builds upon the Kubernetes networking model, which requires that each component to have a distinct IP address for communication. The following sections describe how GKE assigns and uses IP addresses for core cluster components:

*   **Nodes**: GKE assigns each node, which is a Compute Engine VM instance, an internal IP address from the primary IP address range of the subnet associated with its node pool. This IP address enables communication between the node and the Kubernetes control plane. Nodes can also have an external IP address for outbound internet access.
    
*   **Pods**: following the Kubernetes "IP-per-Pod" model, GKE assigns each Pod a unique IP address from a Pod CIDR range allocated to the node. In GKE, the VPC network natively routes Pod IP addresses. This built-in routability enables direct communication between Pods—even across different nodes—without requiring Network Address Translation (NAT). All containers within a single Pod share the same IP address and can communicate over `localhost`.
    
*   **Services**: GKE assigns each Kubernetes Service a stable, virtual IP address (the `ClusterIP`) from a dedicated secondary IP address range. This `ClusterIP` provides a single, reliable endpoint for a group of Pods. When you send traffic to the `ClusterIP`, GKE automatically load balances it to a healthy Pod within that Service.
    
*   **Control plane**: in private clusters, the control plane resides within a Google-managed tenant project and uses its own internal IP address range. This tenant project connects to your VPC network, enabling secure communication between the control plane and the nodes in your cluster's VPC network. This connection typically uses Private Service Connect.
    
*   **Load balancers**: to expose applications to the internet or within your VPC network, you can configure GKE to use Google Cloud load balancers. External load balancers use public IP addresses. Internal load balancers use internal IP addresses from your VPC network's primary subnet range.
    

The following table summarizes how GKE assigns IP addresses to cluster components:

Component

How IP addresses are assigned

**Node**

GKE assigns an internal IP address to each node. GKE allocates this IP address from the primary IP address range of the subnet associated with the node's node pool. This subnet can be either the cluster's default subnet or an additional subnet.

**Pod**

GKE assigns each Pod a unique IP address from the Pod CIDR range allocated to its node.

**Service (ClusterIP)**

GKE assigns each Service a stable virtual IP address (`ClusterIP`) from a dedicated secondary IP address range within the cluster's VPC network.

**Control plane**

In private clusters, the GKE control plane has its own internal IP address range within a Google-managed tenant project. This tenant project connects to your VPC network, typically by using Private Service Connect.

**Load balancer**

External load balancers use public IP addresses. Internal load balancers use internal IP addresses from the primary IP address range of the cluster's subnet.

### Kubernetes IP addressing and GKE implementation

To effectively use GKE, you must understand the differences between the abstract Kubernetes networking model and how GKE implements this model on Google Cloud.

*   **Kubernetes IP addressing model**: the open-source Kubernetes project specifies that each Pod receives a unique IP address. All Pod IP addresses can communicate directly without Network Address Translation (NAT). This approach helps ensure a flat network space where Pods can reach each other by using their assigned IP addresses.
    
*   **GKE IP addressing implementation**: GKE implements the Kubernetes IP addressing model on Google Cloud by integrating with VPC-native networking. When you create a Pod, GKE allocates its IP address from a **VPC alias IP address range**. This makes each Pod's IP address natively routable within your entire VPC network. This enables direct communication not only between Pods but also with other Google Cloud resources, such as Compute Engine instances and Cloud SQL databases. Similarly, GKE manages Kubernetes `Service` IP addresses (such as `ClusterIP`s) within the VPC network. When you create `LoadBalancer` Services for external exposure, GKE provisions Google Cloud Load Balancers. These load balancers use public or internal IP addresses from your VPC network. GKE uses Google Cloud's robust IP addressing and networking infrastructure to implement Kubernetes IP-based networking concepts in a scalable and secure manner.
    

### GKE networking model: VPC-native clusters

GKE implements the Kubernetes networking model by using VPC-native networking, which is a core Google Cloud capability.

This model uses alias IP address ranges. In a VPC-native cluster, Kubernetes configures Pod IP addresses as alias IP address ranges on the node's virtual network interface.

This implementation offers several key advantages:

*   **VPC-native routability:** Pod IP addresses are directly routable within your VPC network. This simplifies network design and enables direct, low-latency communication between your Pods and other Google Cloud resources, such as Compute Engine instances and Cloud SQL instances.
*   **Conserve route quota:** by using alias IP addresses for Pods, GKE doesn't create custom static routes for each node. This conserves your VPC route quota, a significant improvement over legacy routes-based clusters, and is important for large-scale deployments.
*   **Enhance security:** VPC-native routability lets you apply VPC-native firewall rules directly to your Pod traffic, enhancing network-level security.

VPC-native is the default and recommended networking mode for all GKE clusters.

### Why effective IP address management is critical

To ensure your cluster can scale and maintain application health, you must plan your IP address space effectively:

*   **Ensure scalability**: plan your node, Pod, and Service IP address ranges effectively to prevent IP address exhaustion and allow your cluster to scale without requiring disruptive network rearchitecture.
*   **Guarantee reliability**: avoid overlapping IP address ranges between your GKE cluster and other networks, such as on-premises environments connected through Cloud VPN. Overlapping ranges can lead to routing conflicts, unpredictable behavior, and service disruptions.
*   **Strengthen security**: manage IP addresses effectively to strengthen network security. Define Kubernetes Network Policies to control traffic flow between Pods and configure firewall rules for workload isolation at the network level.

### Choose an IP addressing model for your cluster

GKE supports several network stack configurations to meet your networking requirements, including IPv4-only, dual-stack (IPv4 and IPv6), and upcoming IPv6-only options.

#### IPv4-only (single stack)

This is the standard and most common configuration, where all cluster components use IPv4 addresses. Even within an IPv4-only model, GKE provides flexibility:

*   **RFC 1918 private IP addresses**: Use RFC 1918 private IP address ranges (for example, `10.0.0.0/8`) for your cluster.
*   **Privately used public IP addresses (PUPIs)**: if your organization lacks sufficient private IP address space, you can use public IP address ranges for internal use within your VPC network. When you use PUPIs, you must configure the IP masquerade agent. This agent performs Source Network Address Translation (SNAT) on outbound traffic from Pods. Without SNAT, return traffic to a Pod that uses a PUPI is routed over the public internet and fails. The IP Masquerade Agent prevents this by changing the source IP address of outbound packets from the Pod's PUPI to the node's internal IP address. This approach helps ensure that return traffic is correctly routed back to the node and then forwarded to the original Pod.

#### Dual stack (IPv4 and IPv6)

A dual-stack cluster uses both IPv4 and IPv6 protocols. GKE assigns both an IPv4 and an IPv6 address to nodes, Pods, and Services in a dual-stack cluster. This model is ideal for:

*   Facilitating a gradual transition to IPv6.
*   Ensuring compatibility with both IPv6-ready workloads and existing IPv4-only clients and services.

You can enable dual-stack networking when you create a cluster, or you can update an existing single-stack cluster to dual-stack.

### What's next

*   To learn more about the benefits of GKE's default networking mode, see About VPC-native clusters.
*   To get started, learn how to create a VPC-native cluster.
*   For guidance on sizing your cluster's IP address ranges, see IP address range planning for VPC-native clusters.
*   For help with common issues, see troubleshoot the IP Masquerade Agent.

Send feedback