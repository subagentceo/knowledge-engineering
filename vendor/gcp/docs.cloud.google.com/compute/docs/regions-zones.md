# Regions and zones

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   Guides

Send feedback

# Regions and zones Stay organized with collections Save and categorize content based on your preferences.

Compute Engine resources are hosted in multiple locations worldwide. These locations are composed of regions and zones.

_Regions_ are independent geographic areas that consist of _zones_. Zones and regions are logical abstractions of underlying physical resources. For more information about region-specific considerations, see Geography and regions.

Resources that live in a zone, such as Compute Engine instances or zonal disks, are referred to as zonal resources. Other resources, like static external IP addresses, are regional. Regional resources can be used by any resource in that region, regardless of zone, while zonal resources can only be used by other resources in the same zone. For example, to attach a zonal persistent disk to an instance, both resources must be in the same zone. Similarly, if you want to assign a static IP address to an instance, the instance must be in the same region as the static IP address.

Putting resources in different zones in a region reduces the risk of an infrastructure outage affecting all resources simultaneously. Putting resources in different regions provides an even higher degree of failure independence. This lets you design robust systems with resources spread across different failure domains.

Only certain resources are region- or zone-specific. Other resources, such as images, are global resources that can be used by any other resources across any location. For information on global, regional, and zonal Compute Engine resources, see Global, Regional, and Zonal Resources.

Google Cloud also offers specialized AI zones that provide high-capacity GPUs and TPUs for AI and ML workloads. These zones have unique characteristics, including specific network latency requirements and shared fate with a parent zone. For more information, see AI zones.

## Identifying a region or zone

Each region in Compute Engine contains a number of zones. Each zone name contains two parts that describe each zone in detail. The first part of the zone name is the **region** and the second part of the name describes the **zone** in the region:

*   **Region**
    
    Regions are collections of zones. Zones have high-bandwidth, low-latency network connections to other zones in the same region. In order to deploy fault-tolerant applications that have high availability, Google recommends deploying applications across multiple zones and multiple regions. This helps protect against unexpected failures of components, up to and including a single zone or region.
    
    Choose regions that make sense for your scenario. For example, if you only have customers in the US, or if you have specific needs that require your data to live in the US, it makes sense to store your resources in zones in the `us-central1` region or zones in the `us-east1` region.
    
*   **Zone**
    
    A zone is a deployment area within a region. Zones which are specialized for AI and ML workloads are called AI zones. Non-AI zones are referred to as standard zones or just zones. Depending on how widely you want to distribute your resources, create compute instances across multiple zones in multiple regions for redundancy.
    
    *   **Standard zone**
        
        A standard zone name contains two parts: the **region** and the **zone** in the region. For example, the fully qualified name for zone `a` in region `us-central1` is `us-central1-a`.
        
    *   **AI zone**
        
        AI zones follow an extended naming convention to differentiate them from non-AI zones. For an AI zone, the `<zone>` variable consists of three parts: the string ai (to identify it as an AI zone), a number (indicating its deployment group), and a letter (indicating the shared software update schedule). For example, the fully qualified name for AI zone `ai2b` in region `us-west4` is `us-west4-ai2b`. This AI zone shares its deployment rollout wave with the standard `us-west4-b` zone.
        

## Resource quotas

Certain resources, such as static IPs, images, firewall rules, and VPC networks, have defined project-wide quota limits and per-region quota limits. When you create these resources, it counts towards your total project-wide quota or your per-region quota, if applicable. If any of the affected quota limits are exceeded, you won't be able to add more resources of the same type in that project or region.

To see a comprehensive list of quotas that apply to your project, visit the Quotas page in the Google Cloud console.

For example, if your global target pools quota is 50 and you create 25 target pools in example-region-1 and 25 target pools in example-region-2, you reach your project-wide quota and won't be able to create more target pools in any region within your project until you free up space. Similarly, if you have a per-region quota of 7 reserved IP addresses, you can only reserve up to 7 IP addresses in a single region. After you reach that limit, you will either need to reserve IP addresses in a new region or release some IP addresses.

## Transparent maintenance

Google regularly maintains its infrastructure by patching systems with the latest software, performing routine tests and preventative maintenance, and generally ensuring that Google infrastructure is as fast and efficient as Google knows how to make it.

By default, all compute instances are configured so that these maintenance events are transparent to your applications and workloads. Google uses a combination of datacenter innovations, operational best practices, and live migration technology to move running virtual machine instances out of the way of maintenance that is being performed. Your instance continues to run within the same zone with no action on your part.

By default, most virtual machines are set to live migrate, but you can also set your virtual machines to stop and reboot. Some machine series support only stop and reboot for maintenance operations. The two options differ in the following ways:

*   **Live migrate**
    
    Compute Engine automatically migrates your running instance. The migration process will impact guest performance to some degree but your instance remains online throughout the migration process. The exact guest performance impact and duration depends on many factors, but it is expected most applications and workloads will not notice. For more information, see Live Migration.
    
*   **Stop and reboot**
    
    Compute Engine automatically signals your instance to shut down, waits a short time for it to shut down cleanly, and then restarts it away from the maintenance event.
    

For more information on how to set the options above for your instances, see Set VM host maintenance policy.

## Choosing a region and zone

You choose which region or zone hosts your resources, which controls where your data is stored and used. Choosing a region and zone is important for several reasons:

Handling failures

Distribute your resources across multiple zones and regions to tolerate outages. Google designs zones to minimize the risk of correlated failures caused by physical infrastructure outages like power, cooling, or networking. Thus, if a zone becomes unavailable, you can transfer traffic to another zone in the same region to keep your services running. Similarly, you can mitigate the impact of a region outage on your application by running backup services in a different region. For more information about distributing your resources and designing a robust system, see Designing resilient systems.

Decreased network latency

To decrease network latency, you might want to choose a region or zone that is close to your point of service. For example, if you mostly have customers on the East coast of the United States of America, then you might want to choose a primary region and zone that is close to that area and a backup region and zone that is also close by.

Optimized AI and ML acceleration

For workloads that require high-capacity AI accelerators, AI zones are available in select regions. These specialized zones provide GPU and TPU resources for AI and ML training and inference. You can select an AI zone to use infrastructure that is optimized for maximizing AI and ML throughput. See the AI zones section for details.

For more information about how to choose a region and zone for your Compute Engine resources, see Best practices for Compute Engine regions selection.

## Location selection tips

During compute instance creation, Compute Engine can automatically select zones for your instances based on capacity and availability using the following methods:

*   The bulk instance creation API can automatically choose the zone in which to create instances.
*   A regional managed instance group (MIG) can be configured with a target distribution shape, which can automatically create instances in zones where resources are available.
*   If you are creating an instance in the Google Cloud console and you know the machine type and region that you want but you aren't sure which zone to select, you can select **Any** and Google will choose a zone for you based on the machine type and availability.

When selecting zones yourself, here are some things to keep in mind:

*   **Communication within and across regions will incur different costs.**
    
    Generally, communication within regions will always be cheaper and faster than communication across different regions.
    
*   **Design important systems with redundancy across multiple zones or regions.**
    
    At some point in time, your instances might experience an unexpected failure. To mitigate the effects of these possible events, you should duplicate important systems in multiple zones and regions.
    
    For example, by hosting instances in zones `europe-west1-b` and `europe-west1-c`, if `europe-west1-b` fails unexpectedly, your instances in zone `europe-west1-c` will still be available. However, if you host all your instances in `europe-west1-b`, you will not be able to access any instances if `europe-west1-b` goes offline. Also, consider hosting your resources across regions. For example, to plan for continued availability of your workload in the unlikely scenario that the `europe-west1` region experiences a failure, consider deploying the workload on backup instances in the `europe-west3` region. For more tips on how to design systems for availability, see Designing resilient systems.
    

## Available regions and zones

You can use the Google Cloud console, the Google Cloud CLI, or REST to see available regions and zones. You can also get the complete list of available machine types in all regions and zones by using the `gcloud compute machine-types list` command. For example, running the following command displays all the regions and zones where you can use `c4d-standard-4` machine types.

```
gcloud compute machine-types list --filter="name=c4d-standard-4"
```

Each zone offers a variety of processors. When you create an instance in a zone, your instance uses the default processor supported in that zone. For example, if you create an instance in the `us-central1-a` zone, your instance by default uses an Intel Haswell processor, unless you specify another option.

Alternatively, you can choose your desired CPU platform. For more information, read Specifying a minimum CPU platform for VM instances.

Consider the following information about resource availability before you select the regions and zones where you create your instances:

*   Local SSD and Titanium SSD storage is available in all regions and zones for supported machine series and machine types. See About Local SSD disks to learn more.
*   GPUs and TPUs are available only in specific zones.
*   Sole-tenancy is available in regions and zones where machine series with sole-tenant node types are available.
*   Confidential VM is available only with certain machine series in specific zones.

For information about hardware and feature support for all machine series, see Machine series comparison. For example, to see which machine series support both Intel TDX and sole tenancy, in the **Choose instance properties to compare** field, select both **Confidential Computing** and **Sole tenancy**.

APAC North America South America Europe Middle East Africa A4X Max (NVIDIA GB300 Ultra Superchips) A4X (NVIDIA GB200 Superchips) {# Trailing hair space added to exclude A4X Max # } A4 (NVIDIA B200) A3 (NVIDIA H200/H100) A2 (NVIDIA A100) C4 C4A C4D C3 C3D C2 C2D E2 G4 (NVIDIA RTX PRO 6000) G2 (NVIDIA L4) H4D H3 M4 M3 M2 M1 N4A N4D N4 N2 N2D N1 T2D T2A X4 Z3 NVIDIA Grace Granite Rapids Google Axion Emerald Rapids Sapphire Rapids Ice Lake Cascade Lake Skylake AMD EPYC Turin AMD EPYC Genoa AMD EPYC Milan Ampere Altra Broadwell Haswell Sandy Bridge Ivy Bridge GPUs AMD SEV  AMD SEV-SNP Intel TDX NVIDIA Confidential Computing

Clear all

Zones

Location

Machine types

CPUs

Options

CO2 emissions

`africa-south1-a`

Johannesburg, South Africa

E2, N4 , N2 , N2D, C4 , C4A, T2D, M3

Intel Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan, Google Axion

AMD SEV 

`africa-south1-b`

Johannesburg, South Africa

E2, N4 , N2 , N2D, C4 , T2D

Intel Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan

AMD SEV 

`africa-south1-c`

Johannesburg, South Africa

E2, N4 , N2 , N2D, C4 , T2D, M3

Intel Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan

AMD SEV 

`asia-east1-a`

Changhua County, Taiwan, APAC

E2, N4 , N2 , N2D, N1, C4 , C4A, C3 , C3D, T2D, M1, C2 , C2D, G4, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

`asia-east1-b`

Changhua County, Taiwan, APAC

E2, N4 , N2 , N2D, N1, C4 , C4A, C3 , C3D, T2D, M3, M1, C2 , C2D, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan, AMD EPYC Genoa, Google Axion

GPUs, AMD SEV 

`asia-east1-c`

Changhua County, Taiwan, APAC

E2, N4 , N2 , N2D, N1, C4 , C4A, C3 , C3D, T2D, M3, M1, C2 , C2D, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, Google Axion

GPUs, AMD SEV 

`asia-east2-a`

Hong Kong, APAC

E2, N4 , N2 , N2D, N1, C4 , C3 , T2D, C2 

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan

GPUs, AMD SEV 

`asia-east2-b`

Hong Kong, APAC

E2, N2 , N2D, N1, T2D, C4 , C2 

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, AMD EPYC Milan

AMD SEV 

`asia-east2-c`

Hong Kong, APAC

E2, N4 , N2 , N2D, N1, T2D, C4 , C2 , C2D

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan

GPUs, AMD SEV 

`asia-northeast1-a`

Tokyo, Japan, APAC

E2, N4 , N2 , N2D, N1, T2D, Z3, M3, M2, M1, C2 , A2, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, AMD EPYC Milan

GPUs, AMD SEV 

`asia-northeast1-b`

Tokyo, Japan, APAC

E2, N4 , N2 , N2D, N1, C4 , C4A, C4D, C3 , T2D, Z3, M3, M2, M1, C2 , C2D, A4 , A3, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Turin, Google Axion

GPUs, AMD SEV , Intel TDX

`asia-northeast1-c`

Tokyo, Japan, APAC

E2, N4 , N2 , N2D, N1, C4 , C4A, C4D, C3 , T2D, Z3, M3, M1, C2 , A2, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

`asia-northeast2-a`

Osaka, Japan, APAC

E2, N4 , N2 , N2D, N1, C4 , C3 , T2D, M3, M1, C2 , C2D

Intel Ivy Bridge, Sandy Bridge, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan

AMD SEV 

`asia-northeast2-b`

Osaka, Japan, APAC

E2, N2 , N2D, N1, T2D, M3, M2, M1, C2 

Intel Ivy Bridge, Sandy Bridge, Broadwell, Skylake, Cascade Lake, Ice Lake, AMD EPYC Milan

AMD SEV 

`asia-northeast2-c`

Osaka, Japan, APAC

E2, N4 , N2 , N2D, N1, C4 , C3 , T2D, M3, M2, M1, C2 

Intel Ivy Bridge, Sandy Bridge, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan

AMD SEV 

`asia-northeast3-a`

Seoul, South Korea, APAC

E2, N4 , N2 , N2D, N1, C4 , C3 , M3, M2, M1, C2 , C2D, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan

GPUs, AMD SEV 

`asia-northeast3-b`

Seoul, South Korea, APAC

E2, N4 , N2 , N2D, N1, C4 , C3 , M3, M2, M1, C2 , C2D, A2, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan

GPUs, AMD SEV 

`asia-northeast3-c`

Seoul, South Korea, APAC

E2, N4 , N2 , N2D, N1, C4 , M3, C2 , C2D, A3

Intel Ivy Bridge, Sandy Bridge, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan

GPUs, AMD SEV 

`asia-south1-a`

Mumbai, India, APAC

E2, N4 , N2 , N2D, C4 , C4A, C3 , C3D, T2D, N1, M2, M1, C2 , C2D, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, Google Axion

GPUs, AMD SEV 

`asia-south1-b`

Mumbai, India, APAC

E2, N4 , N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, Z3, X4, M4, M3, M2, M1, C2 , C2D, G2, A3

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV , Intel TDX

`asia-south1-c`

Mumbai, India, APAC

E2, N4 , N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, Z3, H4D, X4, M4, M3, M1, C2 , C2D, A3, G4, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

`asia-south2-a`

Delhi, India, APAC

E2, N4 , N2 , N2D, N1, C4 , T2D, X4, M4, M3, M2, M1, C2 , C2D, G4

Intel Ivy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Turin

GPUs, AMD SEV 

`asia-south2-b`

Delhi, India, APAC

E2, N4 , N2 , N2D, N1, C4 , C3 ,T2D, M4, M3, M2, M1, C2 , C2D

Intel Ivy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan

AMD SEV 

`asia-south2-c`

Delhi, India, APAC

E2, N4 , N2 , N2D, N1, C4 , C3 , T2D, C2 , A3, G4

Intel Ivy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Turin

GPUs, AMD SEV 

`asia-southeast1-a`

Jurong West, Singapore, APAC

E2, N4 , N4A, N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, C2 , C2D, T2D, Z3, H4D, M4, M3, M2, M1, A2, G4, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV , AMD SEV-SNP, Intel TDX

`asia-southeast1-b`

Jurong West, Singapore, APAC

E2, N4 , N4A, N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, C2 , C2D, T2D, T2A, Z3, M4, M3, M2, M1, A4 , A3, G4, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Ampere Altra Arm, Google Axion

GPUs, AMD SEV , AMD SEV-SNP, Intel TDX

`asia-southeast1-c`

Jurong West, Singapore, APAC

E2, N4 , N4A, N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, T2A, Z3, M1, C2 , C2D, A2, A3, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Ampere Altra Arm, Google Axion

GPUs, AMD SEV , AMD SEV-SNP, Intel TDX

`asia-southeast2-a`

Jakarta, Indonesia, APAC

E2, N4 , N2 , N2D, N1, C4 , C3 , T2D, M1

Intel Ivy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan

GPUs, AMD SEV 

`asia-southeast2-b`

Jakarta, Indonesia, APAC

E2, N4 , N2 , N2D, N1, C4 , C4A, T2D, G4

Intel Ivy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan, Google Axion AMD EPYC Turin

GPUs, AMD SEV 

`asia-southeast2-c`

Jakarta, Indonesia, APAC

E2, N4 , N2 , N2D, N1, C4 , T2D, M1, G4

Intel Ivy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, AMD EPYC Milan, AMD EPYC Turin

GPUs, AMD SEV 

`asia-southeast3-a`

Bangkok, Thailand, APAC

N4 , C4 , C3D, M4, M3

Intel Emerald Rapids, Granite Rapids, AMD EPYC Milan

`asia-southeast3-b`

Bangkok, Thailand, APAC

N4 , C4 , C3D, M4, M3

Intel Emerald Rapids, Granite Rapids, AMD EPYC Milan

`asia-southeast3-c`

Bangkok, Thailand, APAC

N4 , C4 , C3D, M4, M3

Intel Emerald Rapids, Granite Rapids, AMD EPYC Milan

`australia-southeast1-a`

Sydney, Australia, APAC

E2, N2 , N2D, N1, C3 , T2D, C2 , M3, M2, M1

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, AMD EPYC Milan

GPUs, AMD SEV 

`australia-southeast1-b`

Sydney, Australia, APAC

E2, N4 , N2 , N2D, N1, C3 , T2D, Z3, C2 , M2, M1

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan

GPUs, AMD SEV 

`australia-southeast1-c`

Sydney, Australia, APAC

E2, N4 , N2 , N2D, N1, C4 , C4A, C3 , C3D, T2D, C2 , M3, M1, A3, Z3

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, Google Axion

GPUs, AMD SEV 

`australia-southeast2-a`

Melbourne, Australia, APAC

E2, N4 , N2 , N2D, N1, C4 , C4A, C3 , C3D, T2D

Intel Ivy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, AMD EPYC Milan, Google Axion

AMD SEV 

`australia-southeast2-b`

Melbourne, Australia, APAC

E2, N4 , N2 , N2D, N1, C4 , C4A, T2D, C3 , M3, M1

Intel Ivy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, Google Axion

`australia-southeast2-c`

Melbourne, Australia, APAC

E2, N4 , N2 , N2D, C4 , C4A, T2D, N1, M3, M1

Intel Ivy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan, Google Axion

AMD SEV 

`europe-north1-a`

Hamina, Finland, Europe

E2, N4 , N2 , N2D, N1, C4 , C4A, C3D, T2D, C2 , M3, G4

Intel Ivy Bridge, Sandy Bridge, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, AMD EPYC Milan, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-north1-b`

Hamina, Finland, Europe

E2, N4 , N2 , N2D, N1, C4A, C3 , T2D, C2 , A4 , G4

Intel Ivy Bridge, Sandy Bridge, Broadwell, Skylake, Cascade Lake, Emerald Rapids, AMD EPYC Milan, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-north1-c`

Hamina, Finland, Europe

E2, N4 , N2 , N2D, N1, T2D, C4 , C2 , M3

Intel Ivy Bridge, Sandy Bridge, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, AMD EPYC Milan

AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-north2-a`

Stockholm, Sweden, Europe

E2, N4 , C4 , C4A, C3 , C3D, Z3

Intel Ivy Bridge, Broadwell, Haswell, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, Google Axion

AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-north2-b`

Stockholm, Sweden, Europe

E2, N4 , C4 , C4A, C3 , C3D, Z3

Intel Ivy Bridge, Broadwell, Haswell, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, Google Axion

AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-north2-c`

Stockholm, Sweden, Europe

E2, N4 , C4 

Intel Ivy Bridge, Broadwell, Haswell, Cascade Lake, Ice Lake, Emerald Rapids, AMD EPYC Milan

AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-central2-a`

Warsaw, Poland, Europe

E2, N4 , N2 , N2D, N1, C4 , C4A, T2D, M4, M3, M1, C2D

Intel Ivy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan, Google Axion

AMD SEV 

`europe-central2-b`

Warsaw, Poland, Europe

E2, N2 , N2D, N1, T2D, M1, C2D

Intel Ivy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, AMD EPYC Milan

GPUs, AMD SEV 

`europe-central2-c`

Warsaw, Poland, Europe

E2, N4 , N2 , N2D, N1, C4 , T2D

Intel Ivy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, AMD EPYC Milan

GPUs, AMD SEV 

`europe-southwest1-a`

Madrid, Spain, Europe

E2, N4 , N2 , N2D, C4 , C4A, T2D, M4, M3, M2, M1

Intel Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, AMD EPYC Milan, Google Axion

AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-southwest1-b`

Madrid, Spain, Europe

E2, N4 , N2 , N2D, C4 , C4A, T2D, C2D

Intel Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan, Google Axion

AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-southwest1-c`

Madrid, Spain, Europe

E2, N4 , N2 , N2D, C4 , C4A, T2D, M4, M3, M2, M1

Intel Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, AMD EPYC Milan, Google Axion

AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-west1-b`

St. Ghislain, Belgium, Europe

E2, N4 , N4A, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, Z3, X4, M4, M3, M2, M1, C2 , C2D, A3, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-west1-c`

St. Ghislain, Belgium, Europe

E2, N4 , N4A, N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, Z3, X4, M4, M2, C2 , C2D, A3, G4, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-west1-d`

St. Ghislain, Belgium, Europe

E2, N4 , N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, Z3, M4, M3, M2, M1, C2 , C2D

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-west2-a`

London, England, Europe

E2, N4 , N4A, N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, C2 , C2D, T2D, Z3, M3, M2, M1, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-west2-b`

London, England, Europe

E2, N4 , N4A, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, C2 , C2D, T2D, Z3, M3, M2, M1, G4, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-west2-c`

London, England, Europe

E2, N4 , N4A, N2 , N2D, N1, C4 , C4A, C3 , C2 , C2D, T2D, Z3, M4, M3, M1, G4

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-west3-a`

Frankfurt, Germany, Europe

E2, N4 , N4A, N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, Z3, X4, M4, M3, M2, M1, C2 , C2D, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV , AMD SEV-SNP

`europe-west3-b`

Frankfurt, Germany, Europe

E2, N4 , N4A, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, Z3, X4, M4, M3, M2, M1, C2 , C2D, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV , AMD SEV-SNP

`europe-west3-c`

Frankfurt, Germany, Europe

E2, N4 , N4A, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, Z3, M3, M1, C2 , C2D, A3

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV , AMD SEV-SNP

`europe-west4-a`

Eemshaven, Netherlands, Europe

E2, N4 , N4A, N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, T2A, Z3, M4, M3, M2, M1, C2 , C2D, A3, A2, G4, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Ampere Altra Arm, Google Axion

GPUs, AMD SEV , AMD SEV-SNP, Intel TDX

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-west4-b`

Eemshaven, Netherlands, Europe

E2, N4 , N4A, N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, T2A, Z3, X4, M4, M3, M2, M1, H4D, H3, C2 , C2D, A4X , A4 , A3, A2, G4, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Ampere Altra Arm, Google Axion

GPUs, AMD SEV , AMD SEV-SNP, Intel TDX

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-west4-c`

Eemshaven, Netherlands, Europe

E2, N4 , N4A, N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, T2A, Z3, X4, M2, M1, H3, C2 , C2D, A3, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Ampere Altra Arm, Google Axion

GPUs, AMD SEV , AMD SEV-SNP, Intel TDX, NVIDIA Confidential Computing

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-west6-a`

Zurich, Switzerland, Europe

E2, N2 , N2D, N1, C2 , T2D

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, AMD EPYC Milan

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-west6-b`

Zurich, Switzerland, Europe

E2, N4 , N2 , N2D, N1, C4 , T2D, M3, M1, C2 , G2, Z3

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-west6-c`

Zurich, Switzerland, Europe

E2, N4 , N2 , N2D, N1, C4 , T2D, M3, M1, C2 , G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-west8-a`

Milan, Italy, Europe

E2, N4 , N2 , N2D, T2D, X4, M3, M2, M1

Intel Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan

AMD SEV 

`europe-west8-b`

Milan, Italy, Europe

E2, N4 , N2 , N2D, C4 , T2D, M2, G4

Intel Broadwell, Skylake, Cascade Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Turin

GPUs, AMD SEV 

`europe-west8-c`

Milan, Italy, Europe

E2, N4 , N2 , N2D, C4 , T2D, X4, M3, M2, M1

Intel Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan

AMD SEV 

`europe-west9-a`

Paris, France, Europe

E2, N4 , N2 , N2D, C4 , C3 , T2D, M3

Intel Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan

AMD SEV , Intel TDX

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-west9-b`

Paris, France, Europe

E2, N4 , N2 , N2D, C4 , C4D, C3 , T2D, M3, M1

Intel Broadwell, Haswell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Turin

AMD SEV , Intel TDX

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-west9-c`

Paris, France, Europe

E2, N4 , N2 , N2D, C4 , C3  T2D, M1

Intel Broadwell, Haswell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan

AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`europe-west10-a`

Berlin, Germany, Europe

E2, N2 , N2D, C3 , T2D

Intel Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, AMD EPYC Milan

AMD SEV 

`europe-west10-b`

Berlin, Germany, Europe

E2, N2 , N2D, T2D, G4

Intel Cascade Lake, Ice Lake, AMD EPYC Milan, AMD EPYC Turin

AMD SEV 

`europe-west10-c`

Berlin, Germany, Europe

E2, N2 , N2D, C4 , T2D

Intel Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, AMD EPYC Milan

AMD SEV 

`europe-west12-a`

Turin, Italy, Europe

E2, N2 , N2D, T2D, M3

Intel Broadwell, Skylake, Cascade Lake, Ice Lake, AMD EPYC Milan

AMD SEV 

`europe-west12-b`

Turin, Italy, Europe

E2, N2 , N2D, T2D, M3

Intel Broadwell, Skylake, Cascade Lake, Ice Lake, AMD EPYC Milan

AMD SEV 

`europe-west12-c`

Turin, Italy, Europe

E2, N2 , N2D, T2D

Intel Broadwell, Skylake, Cascade Lake, Emerald Rapids, AMD EPYC Milan

AMD SEV 

`me-central1-a`

Doha, Qatar, Middle East

E2, N2 , N2D, C4 , C3 , T2D

Intel Broadwell, Haswell, Ivy Bridge, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, AMD EPYC Milan

`me-central1-b`

Doha, Qatar, Middle East

E2, N4 , N2 , N2D, C4 , T2D, M3

Intel Broadwell, Haswell, Ivy Bridge, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, AMD EPYC Milan

AMD SEV 

`me-central1-c`

Doha, Qatar, Middle East

E2, N4 , N2 , N2D, C4 , C3 , T2D, M3

Intel Broadwell, Haswell, Ivy Bridge, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan

AMD SEV 

`me-central2-a`

Dammam, Saudi Arabia, Middle East

E2, N4 , N2 , N2D, C4 , C4A, C3 , C3D, T2D, C2  M3, M2, G2

Intel Broadwell, Haswell, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan, AMD EPYC Genoa, Google Axion

GPUs, AMD SEV 

`me-central2-b`

Dammam, Saudi Arabia, Middle East

E2, N2 , N2D, C3 , T2D, M3, M2, C2 

Intel Broadwell, Haswell, Ivy Bridge, Cascade Lake, Ice Lake, Sapphire Rapids, AMD EPYC Milan

AMD SEV 

`me-central2-c`

Dammam, Saudi Arabia, Middle East

E2, N4 , N2 , N2D, C4 , C3 , C3D, T2D, M4, M3, M2, C2 , G2

Intel Broadwell, Haswell, Ivy Bridge, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan

GPUs, AMD SEV 

`me-west1-a`

Tel Aviv, Israel, Middle East

E2, N4 , N2 , N2D, C4 , C3 , T2D, M3, M1, C2 , A2

Intel Broadwell, Haswell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan

GPUs, AMD SEV 

`me-west1-b`

Tel Aviv, Israel, Middle East

E2, N4 , N2 , N2D, N1GPU required, C4 , C3 , C3D, T2D, C2 

Intel Broadwell, Haswell, Ivy Bridge, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan

GPUs, AMD SEV 

`me-west1-c`

Tel Aviv, Israel, Middle East

E2, N2 , N2D, N1GPU required, C3 , T2D, M3, M1, C2 , C2D, A2

Intel Broadwell, Haswell, Ivy Bridge, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, AMD EPYC Milan

GPUs, AMD SEV 

`northamerica-northeast1-a`

Montréal, Québec, North America

E2, N4 , N2 , N2D, N1, C4A, C3 , T2D, C2 , C2D

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan, Google Axion

AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`northamerica-northeast1-b`

Montréal, Québec, North America

E2, N4 , C4 , C4A, C4D, C3 , N2 , N2D, N1, T2D, M4, M3, M2, M1, H3, C2 , G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`northamerica-northeast1-c`

Montréal, Québec, North America

E2, N2 , N2D, N1, T2D, M3, M2, M1, C2 , G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, AMD EPYC Milan

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`northamerica-northeast2-a`

Toronto, Ontario, North America

E2, N2 , N2D, N1, C4 , T2D, M3, M2, M1, G2

Intel Ivy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, AMD EPYC Milan

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`northamerica-northeast2-b`

Toronto, Ontario, North America

E2, N4 , N2 , N2D, N1, C4 , C4A, C2D, T2D, M3, M2, M1, G2

Intel Ivy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan, Google Axion

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`northamerica-northeast2-c`

Toronto, Ontario, North America

E2, N4 , N2 , N2D, N1, C4 , C2D, T2D, M4, M3, M2, A3

Intel Ivy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`northamerica-south1-a`

Queretaro, Mexico, North America

E2, N4 , C4 , C4A, C3D, Z3

Intel Ivy Bridge, Haswell, Broadwell, Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, Google Axion

AMD SEV 

`northamerica-south1-b`

Queretaro, Mexico, North America

E2, N4 , C4 , C4A, C3D, Z3

Intel Ivy Bridge, Haswell, Broadwell, Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, Google Axion

AMD SEV 

`northamerica-south1-c`

Queretaro, Mexico, North America

E2, N4 , C4 , C4A, C3D, Z3

Intel Ivy Bridge, Haswell, Broadwell, Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, Google Axion

AMD SEV 

`southamerica-east1-a`

Osasco, São Paulo, Brazil, South America

E2, N4 , N2 , N2D, N1, C4 , C3 , T2D, C2 , C2D

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`southamerica-east1-b`

Osasco, São Paulo, Brazil, South America

E2, N4 , N2 , N2D, N1, C4 , C3 , T2D, M3, M2, M1, C2 , C2D

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`southamerica-east1-c`

Osasco, São Paulo, Brazil, South America

E2, N4 , N2 , N2D, N1, C3 , T2D, M4, M3, M2, M1, C2 , C2D

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`southamerica-west1-a`

Santiago, Chile, South America

E2, N4 , N2 , N2D, C4 , C4A, C2 , T2D

Intel Broadwell, Haswell, Skylake, Cascade Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan, Google Axion

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`southamerica-west1-b`

Santiago, Chile, South America

E2, N4 , N2 , N2D, C4 , C4A, C2  T2D, M4, M3, M2, M1

Intel Broadwell, Haswell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan, Google Axion

AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`southamerica-west1-c`

Santiago, Chile, South America

E2, N4 , N2 , N2D, C4 , T2D, M4, M3, M2, M1, C2 

Intel Broadwell, Haswell, Skylake, Cascade Lake, Ice Lake, Emerald Rapids, Granite Rapids, AMD EPYC Milan

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`us-central1-a`

Council Bluffs, Iowa, North America

E2, N4 , N4A, N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, T2A, Z3, X4, M4, M3, M2, M1, H3, C2 , C2D, H4D, A4X , A3, A2, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Ampere Altra Arm, Google Axion, NVIDIA Grace

GPUs, AMD SEV , AMD SEV-SNP, Intel TDX, NVIDIA Confidential Computing

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`us-central1-b`

Council Bluffs, Iowa, North America

E2, N4 , N4D, N4A, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, T2A, Z3, M4, M3, M2, M1, C2 , C2D, A4X Max, A4X , A4 , A3, A2, G4, G2, H4D

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Ampere Altra Arm, Google Axion, NVIDIA Grace

GPUs, AMD SEV , AMD SEV-SNP, Intel TDX

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`us-central1-c`

Council Bluffs, Iowa, North America

E2, N4 , N4D, N4A, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, Z3, X4, M4, M3, M2, M1, C2 , C2D, A3, A2, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV , AMD SEV-SNP, Intel TDX

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`us-central1-f`

Council Bluffs, Iowa, North America

E2, N4 , N4D, N2 , N2D, N1, C4 , C4A, C3 , C3D, T2D, T2A, Z3, M1, C2 , C2D, A2, G4

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Ampere Altra Arm, Google Axion

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`us-east1-b`

Moncks Corner, South Carolina, North America

E2, N4 , N4A, N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, Z3, M4, M3, M1, C2 , C2D, A4 , A2, G4, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

`us-east1-c`

Moncks Corner, South Carolina, North America

E2, N4 , N4A, N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, Z3, M1, C2 , C2D, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV , Intel TDX

`us-east1-d`

Moncks Corner, South Carolina, North America

E2, N4 , N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, Z3, M4, M3, M1, C2 , C2D, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV , Intel TDX

`us-east4-a`

Ashburn, Virginia, North America

E2, N4 , N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, Z3, X4, M4, M3, M2, M1, C2 , C2D, A3, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV , Intel TDX

`us-east4-b`

Ashburn, Virginia, North America

E2, N4 , N4A, N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, Z3, M4, M3, M2, M1, C2 , C2D, A4X Max, A4X , A4 , A3, G4

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion, NVIDIA Grace

GPUs, AMD SEV 

`us-east4-c`

Ashburn, Virginia, North America

E2, N4 , N4A, N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, Z3, X4, M4, M3, M1, C2 , C2D, A3, A2, G4, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV , Intel TDX

`us-east5-a`

Columbus, Ohio, North America

E2, N4 , N4D, N2 , N2D, C4 , C4A, C4D, C3 , C3D, T2D, Z3, M4, C2 , A3, A2, G4

Intel Broadwell, Haswell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Turin, Google Axion

GPUs, AMD SEV , NVIDIA Confidential Computing

`us-east5-b`

Columbus, Ohio, North America

E2, N4 , N4D , N2 , N2D, C4 , C4A, C3 , C3D, T2D, Z3, M4, C2 , A4X Max, G4

Intel Broadwell, Haswell, Skylake, Cascade Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV , Intel TDX

`us-east5-c`

Columbus, Ohio, North America

E2, N4 , N4D , N2 , N2D, C4 , C3 , C3D, T2D, M4, Z3, C2 , A4X Max, G4

Intel Broadwell, Haswell, Skylake, Cascade Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Turin, NVIDIA Grace

GPUs, AMD SEV , Intel TDX

`us-south1-a`

Dallas, Texas, North America

E2, N4 , N2 , N2D, C4 , C4A, C3 , T2D, Z3, G4

Intel Broadwell, Haswell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`us-south1-b`

Dallas, Texas, North America

E2, N4 , N2 , N2D, C4 , C4A, C3 , T2D, A4 , A3, Z3, G4

Intel Broadwell, Haswell, Skylake, Cascade Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Turin, Google Axion

GPUs

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`us-south1-c`

Dallas, Texas, North America

E2, N2 , N2D, C3 , T2D, Z3

Intel Broadwell, Haswell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, AMD EPYC Milan

AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`us-west1-a`

The Dalles, Oregon, North America

E2, N4 , N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, Z3, M4, M3, M1, C2 , C2D, A3, G4, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin Google Axion

GPUs, AMD SEV , Intel TDX

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`us-west1-b`

The Dalles, Oregon, North America

E2, N4 , N4D, N2 , N2D, N1, C4 , C4D, C3 , C3D, T2D, Z3, C2 , C2D, M4, M3, M1, A3, A2, G4, G2

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin

GPUs, AMD SEV , Intel TDX

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`us-west1-c`

The Dalles, Oregon, North America

E2, N4 , N4A, N4D, N2 , N2D, N1, C4 , C4A, C4D, C3D, T2D, C3 , C2 , C2D, M3, A3

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

`us-west2-a`

Los Angeles, California, North America

E2, N4 , N2 , N2D, N1, C4 , C4A, C3 , C3D, T2D, C2 , C2D, Z3

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan, AMD EPYC Genoa, Google Axion

AMD SEV 

`us-west2-b`

Los Angeles, California, North America

E2, N4 , N2 , N2D, N1, C4 , C4A, C3 , C3D, T2D, M1, C2 

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, Google Axion

GPUs, AMD SEV 

`us-west2-c`

Los Angeles, California, North America

E2, N4 , N2 , N2D, N1, T2D, C4 , C4A, C3 , C3D, M1, C2 , C2D, A4 

Intel Ivy Bridge, Sandy Bridge, Haswell, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, Google Axion

GPUs, AMD SEV 

`us-west3-a`

Salt Lake City, Utah, North America

E2, N4 , N4D , N2 , N2D, N1, C4 , C3 , T2D, C2 , M3, G4

Intel Ivy Bridge, Sandy Bridge, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Turin

GPUs, AMD SEV 

`us-west3-b`

Salt Lake City, Utah, North America

E2, N4 , N2 , N2D, N1, C4 , C3 , T2D, C2 , A4 , A2

Intel Ivy Bridge, Sandy Bridge, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan

GPUs, AMD SEV 

`us-west3-c`

Salt Lake City, Utah, North America

E2, N4 , N2 , N2D, N1, C4 , C3 , T2D, C2 , C2D, A4 

Intel Ivy Bridge, Sandy Bridge, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan

GPUs, AMD SEV 

`us-west4-a`

Las Vegas, Nevada, North America

E2, N4 , N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, C2 , C2D, X4, M3, M2, M1, A3, G4, G2, H4D

Intel Ivy Bridge, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Genoa, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

`us-west4-b`

Las Vegas, Nevada, North America

E2, N4 , N4D, N2 , N2D, N1, C4 , C4A, C4D, C3 , C3D, T2D, C2 , C2D, X4, M3, M2, M1, A2

Intel Ivy Bridge, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, Granite Rapids, AMD EPYC Milan, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

`us-west4-c`

Las Vegas, Nevada, North America

E2, N4 , N4D, N2 , N2D, N1, C4A, C4 , C3 , T2D, C2 , C2D, G4, G2

Intel Ivy Bridge, Broadwell, Skylake, Cascade Lake, Ice Lake, Sapphire Rapids, Emerald Rapids, AMD EPYC Milan, AMD EPYC Turin, Google Axion

GPUs, AMD SEV 

***GPU required**: To use an N1 machine type in any of the supported `me-west1` zones, you must attach at least one NVIDIA T4 GPU to the VM.

## What's next

*   Learn more about geography and regions.
*   Learn how to view available regions and zones.
*   Learn how to change your default zone or region.
*   Learn more about the global, regional, and zonal resources.

## Try it for yourself

If you're new to Google Cloud, create an account to evaluate how Compute Engine performs in real-world scenarios. New customers also get $300 in free credits to run, test, and deploy workloads.

Try Compute Engine free

Send feedback