# Security bulletins

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

Skip to main content

 ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/v8b2f8e7f8a7704cc38c0519ef05e8f889c427cc26f7c8f743e84df2a01b1dee7/clouddocs/images/lockup_full_color.svg)

Technology areas

close

*   AI and ML
    
*   Application development
    
*   Application hosting
    
*   Compute
    
*   Data analytics and pipelines
    
*   Databases
    
*   Distributed, hybrid, and multicloud
    
*   Industry solutions
    
*   Migration
    
*   Networking
    
*   Observability and monitoring
    
*   Security
    
*   Storage
    

Cross-product tools

close

*   Access and resources management
    
*   Costs and usage management
    
*   Infrastructure as code
    
*   SDK, languages, frameworks, and tools
    

/

Console

*   English
*   Deutsch
*   Español
*   Español – América Latina
*   Français
*   Indonesia
*   Italiano
*   Português
*   Português – Brasil
*   עברית
*   中文 – 简体
*   中文 – 繁體
*   日本語
*   한국어

Sign in

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/products/compute-engine-color.svg)

*   Compute Engine

Start free

Overview Guides APIs & Reference Samples Resources ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/v8b2f8e7f8a7704cc38c0519ef05e8f889c427cc26f7c8f743e84df2a01b1dee7/clouddocs/images/lockup_full_color.svg)

*   Technology areas
    
    *   More
    
    *   Overview
    *   Guides
    *   APIs & Reference
    *   Samples
    *   Resources
*   Cross-product tools
    *   More
*   Console

*   Compute Engine
    
*   All resources
*   Pricing
    
*   Pricing details
    
    *   VM instances pricing
    *   Spot VMs pricing
    *   Networking pricing
    *   Sole-tenant nodes pricing
    *   GPUs pricing
    *   Disks and images pricing
    *   Confidential VM pricing
    *   VM Manager pricing
    *   Cloud TPU pricing
    
*   Pricing announcements
    
    *   Announcement of upcoming pricing changes for persistent disk snapshots
    *   Announcement of upcoming pricing changes for custom machine types
    
*   Pricing calculator
*   Quotas and limits
    
*   Overview
*   Allocation quotas
*   Rate quotas
*   Concurrent operations quotas
*   OS Login quotas
*   Release notes
    
*   Latest
*   Guest environment
*   Archived
*   Videos and samples
    
*   Videos and samples
*   Support
    
*   Security bulletins
*   Known issues
*   Frequently asked questions
*   Billing questions
*   Get support
*   Report abuse
*   Compute Engine for Google Ad Manager
*   End of Support and Deprecations
    
*   End of Support (EOS)
    
    *   CentOS
        
        *   CentOS end of support guidance
        *   Centos 8 end of support
        *   CentOS 6 end of support
        
    *   NVIDIA K80 end of support
    *   NVIDIA P100 end of support
    *   RHEL end of support
    *   Ubuntu LTS end of support
    *   Windows end of support
    
*   Deprecations
    
    *   Feature deprecations
    *   Serial console server SSH key endpoint deprecation
    *   OS Login POSIX group support deprecation
    *   Global serial console gateway deprecation
    *   Compute Engine container startup agent deprecation
    *   CloudEndure deprecation
    *   Activity logs deprecation
    *   Legacy metadata server endpoints deprecation
    
*   Service level agreement
    
*   Compute Engine service level agreement

*   AI and ML
*   Application development
*   Application hosting
*   Compute
*   Data analytics and pipelines
*   Databases
*   Distributed, hybrid, and multicloud
*   Industry solutions
*   Migration
*   Networking
*   Observability and monitoring
*   Security
*   Storage

*   Access and resources management
*   Costs and usage management
*   Infrastructure as code
*   SDK, languages, frameworks, and tools

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   Resources

Send feedback

# Security bulletins Stay organized with collections Save and categorize content based on your preferences.

From time to time, we might release security bulletins related to Compute Engine. All security bulletins for Compute Engine are described here.

Use this XML feed to subscribe to Compute Engine security bulletins. ![Subscribe](/static/docs/images/feed-icon.png) 

## GCP-2026-036

**Published:** 2026-06-09

### Description

Description

Severity

Notes

ARM has announced CVE-2025-10263, an architectural issue affecting some Arm cores which lets an attacker bypass translation stages or GPT protections under certain conditions. This vulnerability lets an attacker at a lower exception level to write to memory that is owned by a higher exception level, thereby escalating privileges. This issue does not affect memory reads.

While Google has secured the infrastructure against VM-to-VM and VM-to-hypervisor attacks, you must obtain Guest OS-level patches from your OS vendors. These updates are essential for defending against threats within the Guest environment, such as process-to-process or process-to-kernel attacks.

Guest mitigations for Container-Optimized OS are in progress, and will be added to the COS release notes after they are ready.

#### What should I do?

This vulnerability affects several Arm core families used in Google Cloud, including Neoverse V1, V2, and N1, affecting C4A, T2A, A4X, and A4X Max. If you run workloads on affected Arm-based instances, then you must upgrade your guest OS images to the safe versions as they become available.

You must work with your distro vendors to patch your guest operating system regarding CVE-2025-10263.

High

CVE-2025-10263

## GCP-2026-032

**Published:** 2026-05-12

### Description

Description

Severity

Notes

AMD has identified a hardware-level vulnerability in **Zen 2 microarchitecture processors** (including EPYC and Ryzen series) involving potential corruption within the **micro-operation (OP) cache.** Under specific conditions, this issue (AMD-SN-7052 / CVE-2025-54518) could lead to security boundary bypasses or unauthorized data access.  
We have deployed fixes across Google infrastructure to mitigate these issues.

High

CVE-2025-54518

## GCP-2026-031

**Published:** 2026-05-12

### Description

Description

Severity

Notes

Researchers discovered a vulnerability in AMD firmware that, due to missing protection, could allow a malicious hypervisor to execute arbitrary code on the AMD Secure Processor (ASP). This allows for the escalation of Memory Mapped I/O (MMIO) read and write permissions, which compromises the confidentiality and integrity of SEV-SNP guests. Google has applied a mitigation that prevents these issues.

#### What should I do?

No customer action is needed. Mitigations have already been applied to Confidential VM instances with AMD SEV-SNP.

#### What vulnerabilities are being addressed?

For more information, see AMD advisory AMD-SB-3030.

Medium

*   CVE-2025-61971
*   CVE-2025-61972
*   CVE-2024-36315

## GCP-2026-021

**Published:** 2026-04-14

### Description

Description

Severity

Notes

AMD reported a vulnerability in its firmware that could have allowed a malicious hypervisor to direct the IOMMU to write into the guest memory of AMD SEV-SNP enabled instances, compromising guest data integrity. Google rolled out a mitigation to vulnerable Confidential VM instances with AMD SEV-SNP enabled.

#### What should I do?

No customer action is needed. The mitigation has already been applied to Confidential VM instances with AMD SEV-SNP enabled.

For more information, see AMD advisory AMD-SB-3016.

Medium

CVE-2023-20585

## GCP-2026-019

**Published:** 2026-04-14

### Description

Description

Severity

Notes

Researchers discovered a vulnerability in AMD firmware that could allow a malicious hypervisor to alter BIOS settings and Memory Mapped I/O (MMIO) routing configurations, compromising the confidentiality and integrity of Confidential VMs with AMD SEV-SNP guests.

Google implemented the mitigation that prevents this issue.

#### What should I do?

No customer action is needed. Mitigations have already been applied to Confidential VM instances with AMD SEV-SNP.

#### What vulnerabilities are being addressed?

For more information, see AMD advisory AMD-SB-3034.

Medium

CVE-2025-54510

## GCP-2026-015

**Published:** 2026-03-27

### Description

Description

Severity

Notes

A vulnerability was discovered in the Linux kernel that can lead to a privilege escalation on Container-Optimized OS nodes.

#### What should I do?

We recommend upgrading your Container-Optimized OS (COS) node to `cos-125-19216-220-57`, which includes a fix for this vulnerability. For upgrade instructions, see one of the following:

*   If you manage Container-Optimized OS VMs directly, then you should recreate your VMs by using the updated images. For more information, see Creating a VM from a public image.
*   If you use Container-Optimized OS through a managed service (such as GKE, Dataflow, or Cloud SQL), then refer to the specific upgrade instructions for that service.

**Note:** Fixes are in progress for Container-Optimized OS milestones 117 and 121.

#### What vulnerabilities are being addressed?

The CrackArmor vulnerability in AppArmor, CVE-2026-23268, allows unprivileged users to bypass kernel protections, escalate to root, and break local container isolation.

High

CVE-2026-23268

## GCP-2026-004

**Published:** 2026-01-14

### Description

Description

Severity

Notes

The CPP RCTX instruction on select Arm processors can be used by an attacker with privileged access to the guest kernel to inhibit TLB invalidations from taking effect. This allows the attacker to potentially read sensitive data that they are not authorized to access.

The vulnerability impacts the following Compute Engine Arm VMs: C4A, A4X.

#### What should I do?

No customer action is required. Mitigations have already been applied to the Google Cloud Arm server fleet.

#### What vulnerabilities are being addressed?

For more information, please refer to CVE-2025-0647.

Medium

CVE-2025-0647

## GCP-2025-058

**Published:** 2025-10-20

### Description

Description

Severity

Notes

A flaw has been discovered in the RDSEED instruction in AMD Zen 5 processors (Turin). This instruction is used to generate cryptographic random numbers. Under certain system load conditions, the 16- and 32-bit versions of RDSEED can silently fail, which could compromise applications relying on random number generation. Customers using the 64-bit version of RDSEED are unaffected.

#### What should I do?

AMD is investigating the vulnerability.

It's important to note that the 64-bit Linux kernel uses the safe 64-bit version of the RDSEED instruction, and that feeds the random numbers obtained from `/dev/[u]random`. Those random numbers are not impacted by this vulnerability.

If you have application code that synthesizes random numbers itself using the RDSEED instruction, be aware that the 16-bit and 32-bit versions of the instruction are insecure. The 64-bit version of the instruction is safe.

#### What vulnerabilites are being addressed?

This vulnerability allows an attacker to cause RDSEED to silently fail, potentially compromising random number generation in applications.

High

CVE-2025-62626

## GCP-2025-044

**Published:** 2025-08-12

### Description

Description

Severity

Notes

Intel has notified Google of two new security vulnerabilities.

CVE-2025-21090: This vulnerability affects the following Intel processors:

*   Sapphire Rapids: C3, Z3, H3, A3, v5p VM Families
*   Emerald Rapids: N4, C4, M4, A3 Ultra, A4 VM Families
*   Granite Rapids: N4, C4 VM Family

CVE-2025-22840: This vulnerability affects the following Intel processor:

*   Granite Rapids: N4, C4 VM Family

#### What should I do?

No customer action is required for either vulnerability. Google will proactively update your systems during your standard and planned maintenance windows. At this time, no evidence of exploitation has been found or reported to Google.

#### What vulnerabilities are being addressed?

The vulnerability, CVE-2025-21090, allows an unprivileged actor utilizing the AMX CPU instruction, in conjunction with the AVX CPU instruction, to render the host machine inoperative.

The vulnerability, CVE-2025-22840, allows an unprivileged actor utilizing the prefetchit CPU instruction to load memory content it would otherwise not have access to, potentially leading to remote code execution.

Medium

*   CVE-2025-21090
*   CVE-2025-22840

## GCP-2025-042

**Published:** 2025-08-11

### Description

Description

Severity

Notes

Researchers discovered a security vulnerability in specific Intel CPUs, including those based on the Skylake, Broadwell, and Haswell microarchitectures. This vulnerability allows an attacker to potentially read sensitive data directly from the CPU's L1 cache that they are not authorized to access.

This vulnerability was initially disclosed in CVE-2018-3646 in 2018. Upon discovery of this vulnerability, Google immediately implemented mitigations that addressed the known risks. Communication regarding the vulnerability and the initial fixes were published at that time. Since then we have been researching the residual risk and working with the upstream Linux community to remediate this risk.

Recently we worked with security researchers from academia to evaluate the state of the art of CPU security mitigations, and potential attack techniques not considered back in 2018.

Google has applied fixes to the affected assets, including Google Cloud, to mitigate the issue.

#### What should I do?

No customer action is required. Mitigations have already been applied to the Google server fleet.

#### What vulnerabilities are being addressed?

For more information, see Intel advisory INTEL-SA-00161 and CVE-2018-3646.

High

CVE-2018-3646

## GCP-2025-031

**Published:** 2025-06-10

### Description

Description

Severity

Notes

The Trusted Computing Group (TCG) reported a Trusted Platform Module (TPM) software vulnerability, which affects Shielded VMs using virtual TPM (vTPM). This vulnerability lets an authenticated local attacker read sensitive vTPM data or impact vTPM availability.

vTPM access is usually privileged. However, some configurations may allow broader vTPM access.

#### What should I do?

No customer action is required. Google will proactively update your systems during your standard and planned maintenance windows. However, you can limit vTPM access to administrative (root) users; this action helps reduce risk to your Shielded VMs.

#### What vulnerabilities are being addressed?

Vulnerability CVE-2025-2884 lets a local attacker that has vTPM interface access send malicious commands. These commands exploit a mismatch, which reads out-of-bounds (OOB) vTPM memory. This action can expose sensitive data.

High

CVE-2025-2884

## GCP-2025-025

**Published:** 2025-05-13

### Description

Description

Severity

Notes

Intel has notified Google about a new side channel vulnerability affecting the following Intel processors: CascadeLake, Ice Lake XeonSP, Ice Lake XeonD, Sapphire Rapids and Emerald Rapids.

Google has applied fixes to the affected assets, including Google Cloud, to ensure customers are protected. At this time, no evidence of exploitation has been found or reported to Google.

#### What should I do?

No customer action is required. Fixes have already been applied to the Google server fleet to protect customers.

#### What vulnerabilities are being addressed?

CVE-2024-45332. For more information, see Intel advisory INTEL-SA-01247.

#### We're here to help

If you have any questions or require assistance, please contact Cloud Customer Care and reference issue number 417536835.

High

CVE-2024-45332

## GCP-2025-024

**Published:** 2025-05-12

**Updated:** 2025-05-13

### Description

Description

Severity

Notes

**2025-05-13 Update:** If you have any questions or require assistance, please contact Cloud Customer Care and reference issue number 417458390.

* * *

Intel has notified Google about a new speculative execution vulnerability affecting Intel Cascade Lake processors and Intel Ice Lake processors.

Google has applied fixes to the affected assets, including Google Cloud, to ensure customers are protected. At this time, no evidence of exploitation has been found or reported to Google.

#### What should I do?

No customer action is required. Mitigations have already been applied to the Google server fleet.

Further mitigations from Intel Original Equipment Manufacturers (OEMs) and other operating system partners will be deployed as soon as they become available to mitigate the same-mode Indirect Target Selection (ITS) vulnerability.

After the operating system mitigations have been applied, customers with long-running 3rd generation or later VMs may experience some unintended performance degradation

#### What vulnerabilities are being addressed?

CVE-2024-28956. For more information, see Intel security advisory INTEL-SA-01153.

High

CVE-2024-28956

## GCP-2024-040

**Published:** 2024-07-01  
**Updated:** 2024-08-20  

Description

Severity

Notes

**Updated: 2024-08-20**

**Critical**

**CVE-2024-6387**

**2024-08-20: Include patches for TPUs.** Apply updates from Linux distributions as they become available. Please refer to guidance from Linux distributions. If you are using TPUs, please update to one of the following patched versions:

*   tpu-ubuntu2204-base
*   v2-alpha-tpuv5
*   v2-alpha-tpuv5-lite

A vulnerability (CVE-2024-6387) has been discovered in OpenSSH. Successful exploitation of this vulnerability allows a remote, unauthenticated attacker to execute arbitrary code as root on the target machine.  
  
All Compute Engine VMs that use a glibc-based Linux distribution and have OpenSSH exposed are recommended to be analyzed for the vulnerable versions.

#### What should I do?

1.  Apply updates from Linux distributions as they become available. Please refer to guidance from Linux distributions. For Google's Container-Optimized OS, please update to one of the following patched versions:
    *   cos-113-18244-85-49
    *   cos-109-17800-218-69
    *   cos-105-17412-370-67
    *   cos-101-17162-463-55If you are using Container-Optimized OS through a Google managed service (e.g. GKE), please refer to that service's security bulletin for patch availability.
2.  If updating is not possible, consider turning OpenSSH off until it can be patched. The default network is pre-populated with a `default-allow-ssh` firewall rule to allow ssh access from the public Internet. To remove this access, customers can:
    
    1.  Optionally create rules to allow any SSH access you need from trusted networks to GKE nodes or other Compute Engine VMs in the project; then
    2.  Disable the default firewall rule with the following command:
        
        gcloud compute firewall-rules update default-allow-ssh --disabled --project=$PROJECT
              
    
    If you have created any other firewall rules that may allow SSH through TCP on port 22, disable them, or limit the source IPs to trusted networks.  
      
    Verify that you can no longer ssh to your VMs from the Internet. This firewall configuration mitigates the vulnerability.
3.  If OpenSSH needs to be left on, you can also execute a configuration update which eliminates the race case condition for the exploit. This is a runtime mitigation. To apply the changes in the sshd config, this script will restart the sshd service.
    
    #!/bin/bash
    set -e
    
    SSHD_CONFIG_FILE=/etc/ssh/sshd_config
    # -c: count the matches
    # -q: don't print to console
    # -i: sshd_config keywords are case insensitive.
    if [[ "$(grep -ci '^LoginGraceTime' $SSHD_CONFIG_FILE)" -eq 0 ]]; then
        echo "LoginGraceTime 0" >> "$SSHD_CONFIG_FILE"
        echo "Set the LoginGraceTime to 0 in $SSHD_CONFIG_FILE"
    else
        sed -i 's/^LoginGraceTime.*$/LoginGraceTime 0/' /etc/ssh/sshd_config
        echo "Changed the LoginGraceTime to 0 in $SSHD_CONFIG_FILE"
    fi
    # Restart the sshd service to apply the new config.
    systemctl restart sshd
        
4.  Finally, monitor for any unusual network activity involving SSH servers.

Critical

CVE-2024-6387

## GCP-2024-021

**Published:** 2024-04-03  

Description

Severity

Notes

Compute Engine is not affected by CVE-2024-3094, which affects versions 5.6.0 and 5.6.1 of the xz-utils package in the liblzma library, and could lead to compromise of the OpenSSH utility.

#### What should I do?

Public images supported and offered by Compute Engine are not affected by this CVE. If you use Compute Engine public images for your VMs, no action is required.

You could be at risk if you created a custom image that used versions 5.6.0 and 5.6.1 of xz-utils package, such as the following operating systems:

*   Fedora 41 and Fedora Rawhide
*   Debian testing/unstable
*   openSUSE tumbleweed

To mitigate this risk, stop any VMs that use these operating systems or others that could have used affected operating systems. If you have VMs built from custom images of other operating systems, check with your OS vendor to see if your VMs are affected.

#### What vulnerabilities are being addressed?

CVE-2024-3094

Medium

CVE-2024-3094

## GCP-2024-001

**Published:** 2024-01-09  

Description

Severity

Notes

Several vulnerabilities were discovered in the TianoCore EDK II UEFI firmware. This firmware is used in Google Compute Engine VMs. If exploited, the vulnerabilities could allow a bypass of secure boot, which would provide false measurements in the secure boot process, including when used in Shielded VMs.

#### What should I do?

No action is required. Google has patched this vulnerability across Compute Engine and all VMs are protected from this vulnerability.

#### What vulnerabilities are addressed by this patch?

The patch mitigated the following vulnerabilities:

*   CVE-2022-36763
*   CVE-2022-36764
*   CVE-2022-36765

Medium

*   CVE-2022-36763
*   CVE-2022-36764
*   CVE-2022-36765

## GCP-2023-44

**Published:** 2023-11-15  

Description

Severity

Notes

On November 14, AMD disclosed multiple vulnerabilities that impact various AMD server CPUs. Specifically, the vulnerabilities impact EPYC Server CPUs leveraging Zen core generation 2 "Rome," gen 3 "Milan," and gen 4 "Genoa."

Google has applied fixes to affected assets, including Google Cloud, to ensure customers are protected. At this time, no evidence of exploitation has been found or reported to Google.

#### What should I do?

No customer action is required.

Fixes have already been applied to the Google server fleet for Google Cloud, including Google Compute Engine.

#### What vulnerabilities are addressed by this patch?

The patch mitigated the following vulnerabilities:

*   CVE-2022-23820
*   CVE-2021-46774
*   CVE-2023-20533
*   CVE-2023-20519
*   CVE-2023-20592
*   CVE-2023-20566
*   CVE-2023-20521
*   CVE-2021-46766
*   CVE-2022-23830
*   CVE-2023-20526
*   CVE-2021-26345

For more information, see AMD's security advisory AMD-SN-3005: "AMD INVD Instruction Security Notice", also published as CacheWarp, and AMD-SN-3002: "AMD Server Vulnerabilities – November 2023".

Medium

*   CVE-2022-23820
*   CVE-2021-46774
*   CVE-2023-20533
*   CVE-2023-20519
*   CVE-2023-20592
*   CVE-2023-20566
*   CVE-2022-23830
*   CVE-2023-20526
*   CVE-2021-26345

## GCP-2023-004

**Published:** 2023-04-26  

Description

Severity

Notes

Two vulnerabilities (CVE-2023-1017 and CVE-2023-1018) were discovered in Trusted Platform Module (TPM) 2.0.

The vulnerabilities could have allowed a sophisticated attacker to exploit a 2-byte out of bounds read/write on certain Compute Engine VMs.

#### What should I do?

A patch was automatically applied to all vulnerable VMs. No customer action is required.

#### What vulnerabilities are addressed by this patch?

The patch mitigated the following vulnerabilities:

##### CVE-2023-1017

With CVE-2023-2017, a buffer overrun could be triggered in the vTPM parameter decryption routine. A local attacker running on a vulnerable VM could use this to trigger a denial-of-service or possibly execute arbitrary code in the vTPM context.

##### CVE-2023-1018

With CVE-2023-2018, an out-of-bounds read existed in the vTPM parameter decryption routine. A local attacker running on a vulnerable VM could use this to indirectly leak limited data from the vTPM context.

Medium

*   CVE-2023-1017
*   CVE-2023-1018

## GCP-2021-026

**Published:** 2021-12-14  

Description

Severity

Notes

The Apache Log4j utility is a commonly used component for logging requests. On December 9, 2021, a vulnerability was reported that could allow a system running Apache Log4j version 2.14.1 or below to be compromised and allow an attacker to execute arbitrary code.

On December 10, 2021, NIST published a critical Common Vulnerabilities and Exposure alert, CVE-2021-44228. More specifically, Java Naming Directory Interface (JNDI) features used in configuration, log messages, and parameters don't protect against attacker controlled LDAP and other JNDI related endpoints. An attacker who can control log messages or log message parameters can execute arbitrary code loaded from remote servers when message lookup substitution is enabled.

#### What should I do?

*   **M4CE v4.x:** The Migrate for Compute Engine (M4CE) Team has provided a new version on 13 December, 2021. Project managers are required to replace the existing deployment with the new version including in-cloud M4CE Manager and M4CE "on premises" backend. See the How to Guide for details on version 4.11 deploy details.
*   **M2VMs v5.x:** M2VMs v5.0 and above has been fixed and no action is required.

Critical

*   CVE-2021-44228

## GCP-2021-001

**Published:** 2021-01-28  

Description

Severity

Notes

A vulnerability was recently discovered in the Linux utility `sudo`, described in CVE-2021-3156, that might allow an attacker with unprivileged local shell access on a system with `sudo` installed to escalate their privileges to root on the system.

#### Compute Engine impact

The underlying infrastructure that runs Compute Engine is not impacted by this vulnerability. Compute Engine VMs running Linux should consider updating their guest operating system. For example, if you use a Container-Optimized OS, we recommend you update to one of the following images: cos-85-13310-1209-7, cos-81-12871-1245-6, cos-dev-89-16091-0-0, or later.

None

*   CVE-2021-3156

## Date published: 2020-08-27

Description

Severity

Notes

Eclypsium has disclosed the following CVE: CVE-2020-10713.

#### Vulnerabilities

In response to the initial vulnerability report, additional scrutiny was applied to the GRUB2 code and the following additional vulnerabilities were discovered by Canonical:

*   CVE-2020-14308
*   CVE-2020-14309
*   CVE-2020-14310
*   CVE-2020-14311
*   CVE-2020-15705
*   CVE-2020-15706
*   CVE-2020-15707

These vulnerabilities, collectively referred to as BootHole, allow unsigned binaries to be loaded by attackers with administrative privileges, thus disabling secure boot enforcement.

#### Compute Engine impact

The host infrastructure that runs Compute Engine is protected against known attacks.

Compute Engine customers who use secure boot are encouraged to update the guest operating systems on their instances to prevent the possibility of exploitation within their guest environments. For details, refer to your Guest OS Vendor's recommended mitigation.

#### Patched images and vendor resources

We will provide links to patch information from each operating system vendor here as they become available. Earlier versions of these public images don't contain these patches and don't mitigate potential attacks:

*   Project `centos-cloud`: CentOS patch information
    *   `centos-7-v20200811`
    *   `centos-8-v20200811`
*   Project `cos-cloud`:
    
    *   `cos-77-12371-1072-0`
    *   `cos-81-12871-1185-0`
    *   `cos-rc-85-13310-1028-0`
    *   `cos-dev-86-15103-0-0`
    
    If you are using COS through a managed service (e.g. GKE), please follow the guidance for that service to apply updates.
    
*   Project `debian-cloud`: DSA-4753
    *   `debian-10-buster-v20200805`
*   Project `coreos-cloud`:
    *   `coreos-alpha-2163-2-1-v20190617`
    *   `coreos-beta-2135-3-1-v20190617`
    *   `coreos-stable-2079-6-0-v20190617`
*   Project `rhel-cloud/rhel-sap-cloud:` Red Hat Vulnerability Response
    *   `rhel-7-v20200811`
    *   `rhel-7-4-sap-v20200811`
    *   `rhel-7-6-sap-v20200811`
    *   `rhel-7-7-sap-v20200811`
    *   `rhel-8-v20200811`
*   Project `suse-cloud/suse-sap-cloud:`: SUSE KB
    *   `sles-12-sp5-v20200813`
    *   `sles-15-sp2-v20200804`
    *   `sles-12-sp4-sap-v20200804`
    *   `sles-12-sp5-sap-v20200813`
    *   `sles-15-sap-v20200803`
    *   `sles-15-sp1-sap-v20200803`
    *   `Sles-15-sp2-sap-v20200804`
*   Project `ubuntu-os-cloud`: Ubuntu Wiki
    *   `ubuntu-1604-xenial-v20200729`
    *   `ubuntu-1804-bionic-v20200729`
    *   `ubuntu-2004-focal-v20200729`

High

*   CVE-2020-10713
*   CVE-2020-14308
*   CVE-2020-14309
*   CVE-2020-14310
*   CVE-2020-14311
*   CVE-2020-15705
*   CVE-2020-15706
*   CVE-2020-15707

## Date published: 2020-06-19

Description

Severity

Notes

VMs that have OS Login enabled might be susceptible to privilege escalation vulnerabilities. These vulnerabilities gives users that are granted OS Login permissions (but not given administrator access) the ability to escalate to root access in the VM.

#### Vulnerabilities

The following three vulnerabilities, which are due to overly permissive default group memberships, were identified for Compute Engine images:

*   CVE-2020-8903: by using the `adm` user, you can take advantage of the DHCP XID to obtain administrative privileges.
*   CVE-2020-8907: by using the `docker` user, you can mount and modify the host OS file system to obtain administrative privileges.
*   CVE-2020-8933: by using the `lxd` user, you can attach host OS file systems and obtain administrative privileges.

#### Patched images and fixes

All Compute Engine public images created after `v20200506` are patched.

If you need to fix this issue without updating to a later version of your image, you can edit the `/etc/security/group.conf` file and remove the `adm`, `lxd` and `docker` users from the default OS Login entry.

High

*   CVE-2020-8903
*   CVE-2020-8907
*   CVE-2020-8933

## Date published: 2020-01-21

Description

Severity

Notes

Microsoft disclosed the following vulnerability:

*   CVE-2020-0601— This vulnerability is also known as the Windows Crypto API Spoofing Vulnerability and could be exploited to make malicious executables appear trusted or allow the attacker to conduct man-in-the-middle attacks and decrypt confidential information on user connections to the affected software.

#### Compute Engine impact

The underlying infrastructure that runs Compute Engine is not impacted by this vulnerability. Unless you are running Windows Server in your Compute Engine virtual machine, no further action is required. Customers using Compute Engine VMs running Windows Server should ensure their instances have the latest Windows patch.

#### Patched images and vendor resources

Earlier versions of the public Windows images don't contain the following patches and don't mitigate potential attacks:

*   Projects `windows-cloud` and `windows-sql-cloud`
    *   All Windows Server and SQL Server public images starting from v20200114

Medium

*   CVE-2020-0601

## Date published: 2019-11-12

Description

Severity

Notes

Intel has disclosed the following CVEs:

*   CVE-2019-11135— This CVE is also known as TSX Async Abort (TAA). TAA provides another avenue for data exfiltration using the same microarchitectural data structures that were exploited by Microarchitectural Data Sampling (MDS).
*   CVE-2018-12207— This CVE is also known as "Machine Check Error on Page Size Change." This is a Denial of Service (DoS) vulnerability affecting virtual machine hosts allowing a malicious guest to crash an unprotected host.

#### Compute Engine impact

##### CVE-2019-11135

The host infrastructure that runs Compute Engine isolates customer workloads. Unless you are running untrusted code inside N2, C2, or M2 VMs, no further action is required.

N2, C2, or M2 customers running untrusted code in their own multi-tenant services within Compute Engine virtual machines should stop and start their VMs in order to ensure they have the latest security mitigations. A reboot, without a stop/start, is not sufficient. This guidance assumes you have already applied previously released updates covering the MDS vulnerability. If not, please follow the instructions to apply the appropriate updates.

For customers running N1 machine types, no action is required, as this vulnerability does not represent new exposure beyond the previously disclosed MDS vulnerabilities.

##### CVE-2018-12207

The host infrastructure that runs Compute Engine is protected from this vulnerability. No further action is required.

Medium

*   CVE-2019-11135
*   CVE-2018-12207

## Date published: 2019-06-18

**last updated: 2019-06-25 T 6:30 PST**

Description

Severity

Notes

Netflix has recently disclosed three TCP vulnerabilities in Linux kernels:

*   CVE-2019-11477
*   CVE-2019-11478
*   CVE-2019-11479

These CVEs are collectively referred to as NFLX-2019-001.

#### Compute Engine impact

The infrastructure that hosts Compute Engine is protected from this vulnerability.

Compute Engine VMs running unpatched Linux operating systems that send/receive untrusted network traffic are vulnerable to this DoS attack. Consider updating these VM instances as soon as patches are available for their operating systems.

Load balancers that close TCP connections have been patched against this vulnerability. Compute Engine instances that receive only untrusted traffic through these load balancers are not vulnerable. This includes HTTP Load Balancers, SSL Proxy Load Balancers, and TCP Proxy Load Balancers.

Network load balancers and internal load balancers don't close TCP connections. Unpatched Compute Engine instances that receive untrusted traffic through these load balancers are vulnerable.

#### Patched images and vendor resources

We will provide links to patch information from each operating system vendor here as they become available, including the status for each CVE. Earlier versions of these public images don't contain these patches and don't mitigate potential attacks:

*   Project `debian-cloud`:
    *   `debian-9-stretch-v20190618`
*   Project `centos-cloud`:
    *   `centos-6-v20190619`
    *   `centos-7-v20190619`
*   Project `cos-cloud`:
    *   `cos-dev-77-12293-0-0`
    *   `cos-beta-76-12239-21-0`
    *   `cos-stable-75-12105-77-0`
    *   `cos-73-11647-217-0`
    *   `cos-69-10895-277-0`
*   Project `coreos-cloud`:
    *   `coreos-alpha-2163-2-1-v20190617`
    *   `coreos-beta-2135-3-1-v20190617`
    *   `coreos-stable-2079-6-0-v20190617`
*   Project `rhel-cloud`:
    *   `rhel-6-v20190618`
    *   `rhel-7-v20190618`
    *   `rhel-8-v20190618`
*   Project `rhel-sap-cloud`:
    *   `rhel-7-4-sap-v20190618`
    *   `rhel-7-6-sap-v20190618`
*   Project `suse-cloud`:
    *   `sles-12-sp4-v20190617`
    *   `sles-15-v20190617`
*   Project `suse-sap-cloud`:
    *   `sles-12-sp1-sap-v20190617`
    *   `sles-12-sp2-sap-v20190617`
    *   `sles-12-sp3-sap-v20190617`
    *   `sles-12-sp4-sap-v20190617`
    *   `sles-15-sap-v20190617`
*   Project `ubuntu-cloud`:
    *   `ubuntu-1604-xenial-v20190617`
    *   `ubuntu-1804-bionic-v20190617`
    *   `ubuntu-1810-cosmic-v20190618`
    *   `ubuntu-1904-disco-v20190619`
    *   `ubuntu-minimal-1604-xenial-v20190618`
    *   `ubuntu-minimal-1804-bionic-v20190617`
    *   `ubuntu-minimal-1810-cosmic-v20190618`
    *   `ubuntu-minimal-1904-disco-v20190618`

Medium

*   CVE-2019-11477
*   CVE-2019-11478
*   CVE-2019-11479

## Date published: 2019-05-14

**last updated: 2019-05-20 T 17:00 PST**

Description

Severity

Notes

Intel has disclosed the following CVEs:

*   CVE-2018-12126
*   CVE-2018-12127
*   CVE-2018-12130
*   CVE-2019-11091

These CVEs are collectively referred to as Microarchitectural Data Sampling (MDS). These vulnerabilities potentially allow data to be exposed using the interaction of speculative execution with microarchitectural state.

#### Compute Engine impact

**The host infrastructure that runs Compute Engine isolates customer workloads from each other. Unless you are running untrusted code inside your VMs, no further action is required.**

For customers running untrusted code in their own multi-tenant services within Compute Engine virtual machines, refer to your Guest OS Vendor's recommended mitigation, which might include using Intel's microcode mitigation features. We have deployed guest pass-through access to the new flush functionality. The following is a summary of mitigation steps available for common guest images.

#### Patched images and vendor resources

We will provide links to patch information from each operating system vendor here as they become available, including status for each CVE. Use these images to recreate VM instances. Earlier versions of these public images don't contain these patches and don't mitigate potential attacks:

*   Project `centos-cloud`: CESA-2019:1169, CESA-2019:1168

*   `centos-6-v20190515`
*   `centos-7-v20190515`

*   Project `coreos-cloud`: MDS mitigations for CoreOS Container Linux

*   `coreos-stable-2079-4-0-v20190515`
*   `coreos-beta-2107-3-0-v20190515`
*   `coreos-alpha-2135-1-0-v20190515`

*   Project `cos-cloud`

*   `cos-69-10895-242-0`
*   `cos-73-11647-182-0`

*   Project `debian-cloud`: DSA-4444

*   `debian-9-stretch-v20190514`

*   Project `rhel-cloud`: Red Hat MDS Knowledge Article

*   `rhel-6-v20190515`
*   `rhel-7-v20190517`
*   `rhel-8-v20190515`

*   Project `rhel-sap-cloud`: Red Hat MDS Knowledge Article

*   `rhel-7-4-sap-v20190515`
*   `rhel-7-6-sap-v20190517`

*   Project `suse-cloud`: SUSE MDS KB

*   `sles-12-sp4-v20190520`
*   `sles-15-v20190520`

*   Project `suse-sap-cloud`

*   `sles-12-sp4-sap-v20190520`
*   `sles-15-sap-v20190520`

*   Project `ubuntu-os-cloud`: Ubuntu MDS Wiki

*   `ubuntu-1404-trusty-v20190514`
*   `ubuntu-1604-xenial-v20190514`
*   `ubuntu-1804-bionic-v20190514`
*   `ubuntu-1810-cosmic-v20190514`
*   `ubuntu-1904-disco-v20190514`
*   `ubuntu-minimal-1604-xenial-v20190514`
*   `ubuntu-minimal-1804-bionic-v20190514`
*   `ubuntu-minimal-1810-cosmic-v20190514`
*   `ubuntu-minimal-1904-disco-v20190514`

*   Projects `windows-cloud` and `windows-sql-cloud`: Microsoft ADV190013

*   All Windows Server and SQL Server public images with version number `v20190514`.

*   Project `gce-uefi-images`

*   `centos-7-v20190515`
*   `cos-69-10895-242-0`
*   `cos-73-11647-182-0`
*   `rhel-7-v20190517`
*   `ubuntu-1804-bionic-v20190514`
*   All Windows Server public images with version number `v20190514`.

#### Container-Optimized OS

If you are using Container Optimized OS (COS) as your Guest OS and you are running untrusted, multi-tenant workloads in your virtual machine, we recommend that you:

1.  Disable Hyper-Threading by setting `nosmt` on the kernel command-line.  
    
    On existing COS VMs, you can modify the `grub.cfg` as follows to set the `nosmt` option and then reboot the system:
    
    # Run as root:
    dir="$(mktemp -d)"
    mount /dev/sda12 "${dir}"
    sed -i -e "s|cros_efi|cros_efi nosmt|g" "${dir}/efi/boot/grub.cfg"
    umount "${dir}"
    rmdir "${dir}"
    
    reboot
    
    For convenience, you can run the script below to achieve the same result as running the commands earlier. We recommend making this script part of your cloud-config, startup scripts or instance templates, to ensure that new VMs use this new parameter. An example cloud-config that runs this script is below.
    
    **Warning:** This command will result in an immediate reboot of the instance when run for the first time. Subsequent runs of the command on an instance with Hyper-Threading already disabled will have no effect.
    
    # Run as root
    /bin/bash <(curl -s https://storage.googleapis.com/cos-tools/scripts/disable_smt.sh)
    
    To include this as part of your cloud-config:
    
    #cloud-config
    
    bootcmd:
    - /bin/bash -c "/bin/bash <(curl -s https://storage.googleapis.com/cos-tools/scripts/disable_smt.sh)"
    
    To confirm if Hyper-Threading is disabled on your instance, look at the output of `/sys/devices/system/cpu/smt/active` and `/sys/devices/system/cpu/smt/control` files. If it returns `0` for `active` and `off` for `control`, Hyper-Threading is disabled:
    
    cat /sys/devices/system/cpu/smt/active
    cat /sys/devices/system/cpu/smt/control
    
    **Note:** If you have enabled UEFI Secure Boot on your instance, you will need to re-create your instance with UEFI Secure Boot disabled, run the above command with UEFI Secure Boot disabled, and then enable UEFI Secure Boot on your new instance.
    
2.  Use new version of COS image  
    
    In addition to disabling Hyper-Threading as described above, you should also re-create your instances with the updated images listed above or newer versions (when available) of Container-Optimized OS images to get fully protected from the vulnerability.
    

Medium

*   CVE-2018-12126
*   CVE-2018-12127
*   CVE-2018-12130
*   CVE-2019-11091

## Date published: 2018-08-14

**last updated: 2018-08-20 T 17:00 PST**

Description

Severity

Notes

#### Description

Intel has disclosed the following CVEs:

*   CVE-2018-3615 (for SGX)
*   CVE-2018-3620 (for operating systems and SMT)
*   CVE-2018-3646 (for virtualization)

These CVEs are collectively referred to as "L1 Terminal Fault (L1TF)".

These L1TF vulnerabilities exploit speculative execution by attacking the configuration of processor-level data structures. "L1" refers to the Level-1 Data cache (L1D), a small on-core resource used to accelerate memory access.

Read the Google Cloud blog post for more details on these vulnerabilities and Compute Engine's mitigations.

#### Compute Engine impact

The host infrastructure that runs Compute Engine and isolates customer workloads from each other is protected against known attacks.

Compute Engine customers are encouraged to update their images to prevent the possibility of indirect exploitation within their guest environments. This is particularly important for customers running their own multi-tenant services on Compute Engine virtual machines.

Compute Engine customers can update the guest operating systems on their instances using one of the following options:

*   Use patched public images to recreate existing VM instances.
*   On existing instances, install patches provided by the operating system vendor and reboot the patched instances.

#### Patched images and vendor resources

We will provide links to patch information from each operating system vendor here as they become available, including status for both CVEs. Use these images to recreate VM instances. Earlier versions of these public images don't contain these patches and don't mitigate potential attacks:

*   Project `centos-cloud`:
    *   `centos-7-v20180815`
    *   `centos-6-v20180815`
*   Project `coreos-cloud`:
    *   `coreos-stable-1800-7-0-v20180816`
    *   `coreos-beta-1855-2-0-v20180816`
    *   `coreos-alpha-1871-0-0-v20180816`
*   Project `cos-cloud`:
    *   `cos-stable-66-10452-110-0`
    *   `cos-stable-67-10575-66-0`
    *   `cos-beta-68-10718-81-0`
    *   `cos-dev-69-10895-23-0`
*   Project `debian-cloud`:
    *   `debian-9-stretch-v20180820`
*   Project `rhel-cloud`:
    *   `rhel-7-v20180814`
    *   `rhel-6-v20180814`
*   Project `rhel-sap-cloud`:
    *   `rhel-7-sap-apps-v20180814`
    *   `rhel-7-sap-hana-v20180814`
*   Project `suse-cloud`:
    *   `sles-15-v20180816`
    *   `sles-12-sp3-v20180814`
    *   `sles-11-sp4-v20180816`
*   Project `suse-sap-cloud`:
    *   `sles-15-sap-v20180816`
    *   `sles-12-sp3-sap-v20180814`
    *   `sles-12-sp2-sap-v20180816`
*   Project `ubuntu-os-cloud`:
    *   `ubuntu-1804-bionic-v20180814`
    *   `ubuntu-1604-xenial-v20180814`
    *   `ubuntu-1404-trusty-v20180814`
    *   `ubuntu-minimal-1804-bionic-v20180814`
    *   `ubuntu-minimal-1604-xenial-v20180814`
*   Projects `windows-cloud` `gce-uefi-images` and `windows-sql-cloud`:
    *   All Windows Server and SQL Server public images with version number `-v201800814` and later include patches.

High

*   CVE-2018-3615
*   CVE-2018-3620
*   CVE-2018-3646

## Date published: 2018-08-06

**last updated: 2018-09-05 T 17:00 PST**

Description

Severity

Notes

#### 2018-09-05 Update

CVE-2018-5391 was disclosed on 2018-08-14 by US-CERT. As with CVE-2018-5390, this is a kernel-level networking vulnerability that increases the effectiveness of denial of service (DoS) attacks against vulnerable systems. The main difference is that CVE-2018-5391 is exploitable over IP connections. We updated this bulletin to cover both vulnerabilities.

#### Description

CVE-2018-5390 ("SegmentSmack") describes a kernel-level networking vulnerability that increases the effectiveness of denial of service (DoS) attacks against vulnerable systems over TCP connections.

CVE-2018-5391 ("FragmentSmack") describes a kernel-level networking vulnerability that increases the effectiveness of denial of service (DoS) attacks against vulnerable systems over IP connections.

#### Compute Engine impact

The host infrastructure that runs Compute Engine VMs is not at risk. The network infrastructure that handles traffic to and from Compute Engine VMs is protected against this vulnerability. Compute Engine VMs that only send/receive untrusted network traffic using HTTP(S), SSL, or TCP Load Balancers are protected against this vulnerability.

Compute Engine VMs running unpatched operating systems that send/receive untrusted network traffic directly, or using Network Load Balancers, are vulnerable to this DoS attack.

Consider updating your VM instances as soon as patches are available for their operating systems.

Compute Engine customers can update the guest operating systems on their instances using one of the following options:

*   Use patched public images to recreate existing VM instances. See the list of patched public images below.
*   On existing instances, install patches provided by the operating system vendor and reboot the patched instances.

#### Patched images and vendor resources

We will provide links to patch information from each operating system vendor here as they become available.

*   Project `centos-cloud` (CVE-2018-5390 only):
    *   `centos-7-v20180815`
    *   `centos-6-v20180815`
*   Project `coreos-cloud` (CVE-2018-5390 and CVE-2018-5391):
    *   `coreos-stable-1800-7-0-v20180816`
    *   `coreos-beta-1855-2-0-v20180816`
    *   `coreos-alpha-1871-0-0-v20180816`
*   Project `cos-cloud` (CVE-2018-5390 and CVE-2018-5391):
    *   `cos-stable-65-10323-98-0`
    *   `cos-stable-66-10452-109-0`
    *   `cos-stable-67-10575-65-0`
    *   `cos-beta-68-10718-76-0`
    *   `cos-dev-69-10895-16-0`
*   Project `debian-cloud` (CVE-2018-5390 and CVE-2018-5391):
    *   `debian-9-stretch-v20180814`
*   Project `rhel-cloud` (CVE-2018-5390 only):
    *   `rhel-7-v20180814`
    *   `rhel-6-v20180814`
*   Project `suse-cloud` (CVE-2018-5390 and CVE-2018-5391):
    *   `sles-15-v20180816`
    *   `sles-12-sp3-v20180814`
*   Project `suse-sap-cloud` (CVE-2018-5390 and CVE-2018-5391):
    *   `sles-15-sap-v20180816`
    *   `sles-12-sp3-sap-v20180814`
    *   `sles-12-sp2-sap-v20180816`
*   Project `ubuntu-os-cloud` (CVE-2018-5390 and CVE-2018-5391):
    *   `ubuntu-1804-bionic-v20180814`
    *   `ubuntu-1604-xenial-v20180814`
    *   `ubuntu-1404-trusty-v20180814`
    *   `ubuntu-minimal-1804-bionic-v20180814`
    *   `ubuntu-minimal-1604-xenial-v20180814`

High

*   CVE-2018-5390
*   CVE-2018-5391

## Date published: 2018-01-03

**last updated: 2018-05-21 T 15:00 PST**

Description

Severity

Notes

#### 2018-05-21 Update

CVE-2018-3640 and CVE-2018-3639, Variants 3a and 4 respectively, were disclosed by Intel. As with the first three variants of Spectre and Meltdown, the infrastructure that runs Compute Engine VM instances is protected and customer VM instances are isolated and protected from one another. Additionally, Compute Engine plans to deploy Intel's microcode patches to our infrastructure, which will allow customers who run untrusted or multi-tenant workloads within a single VM instance to enable additional intra-VM mitigations when those mitigations are provided by operating system vendors and providers. Compute Engine will deploy the microcode patches once Intel has certified them and after Compute Engine has tested and qualified the patches for our production environment. We will provide more detailed timelines and updates on this page as they become available.

#### Description

These CVEs are variants of a new class of attack that exploit the speculative execution technology available in many processors. This class of attack can allow for unauthorized read-only access to memory data under various circumstances.

Compute Engine used VM Live Migration technology to perform host system and hypervisor updates with no user impact, no forced maintenance windows, and no mass reboots required. However, all guest operating systems and versions must be patched to protect against this new class of attack regardless of where those systems run.

Read the Project Zero blog post for complete technical details on this attack method. Read the Google Security blog post for complete details on Google's mitigations including all product-specific information.

#### Compute Engine impact

The infrastructure that runs Compute Engine and isolates customer VM instances from each other is protected against known attacks. Our mitigations prevent unauthorized access to our host systems from applications running inside VM instances. These mitigations also prevent unauthorized access between VM instances running on the same host system.

To prevent unauthorized access within your virtual machine instances, you must update the guest operating systems on those instances using one of the following options:

*   Use patched public images to recreate your existing VM instances. See the list of patched public images below.
*   On your existing instances, install patches provided by the operating system vendor for your distribution and reboot the patched instances. See the links to patch information from each operating system vendor below.

#### Patched images and vendor resources

**Note:** Patched images might not include fixes for all of the CVEs listed in this security bulletin notice. Additionally, different images might include different methods for preventing these types of attacks. Check with your operating system vendor to confirm which CVEs they address in their patches and what prevention methods they use.

*   Project `cos-cloud`: Includes patches that prevent Variant 2 (CVE-2017-5715) and Variant 3 (CVE-2017-5754) attacks. Google used Retpoline in these images to mitigate Variant 2 attacks.
    *   `cos-stable-63-10032-71-0` or image family `cos-stable`
*   Project `centos-cloud`: CentOS patch information
    *   `centos-7-v20180104` or image family `centos-7`
    *   `centos-6-v20180104` or image family `centos-6`
*   Project `coreos-cloud`: CoreOS patch information
    *   `coreos-stable-1576-5-0-v20180105` or image family `coreos-stable`
    *   `coreos-beta-1632-1-0-v20180105` or image family `coreos-beta`
    *   `coreos-alpha-1649-0-0-v20180105` or image family `coreos-alpha`
*   Project `debian-cloud`: Debian patch information
    *   `debian-9-stretch-v20180105` or image family `debian-9`
    *   `debian-8-jessie-v20180109` or image family `debian-8`
*   Project `rhel-cloud`: RHEL patch information
    *   `rhel-7-v20180104` or image family `rhel-7`
    *   `rhel-6-v20180104` or image family `rhel-6`
*   Project `suse-cloud`: SUSE patch information
    *   `sles-12-sp3-v20180104` or image family `sles-12`
    *   `sles-11-sp4-v20180104` or image family `sles-11`
*   Project `suse-sap-cloud`: SUSE patch information
    *   `sles-12-sp3-sap-v20180104` or image family `sles-12-sp3-sap`
    *   `sles-12-sp2-sap-v20180104` or image family `sles-12-sp2-sap`
*   Project `ubuntu-os-cloud`: Ubuntu patch information
    *   `ubuntu-1710-artful-v20180109` or image family `ubuntu-1710`
    *   `ubuntu-1604-xenial-v20180109` or image family `ubuntu-1604-lts`
    *   `ubuntu-1404-trusty-v20180110` or image family `ubuntu-1404-lts`
*   Projects `windows-cloud` and `windows-sql-cloud`:
    *   All Windows Server and SQL Server public images with version number `-v20180109` and later include patches. However, you must follow the recommended actions provided by Microsoft in the Windows Server guidance support bulletin to enable and verify these mitigations on both your existing instances and newly-created instances.

Use these images to recreate your VM instances. Earlier versions of these public images don't contain these patches and don't mitigate potential attacks.

#### Patches from hardware vendors

NVIDIA provides patched drivers to mitigate potential attacks against systems that have NVIDIA® driver software installed. To learn which driver versions are patched, read the NVIDIA GPU Display Driver Security Updates security bulletin from NVIDIA.

#### Revision history:

*   2018-05-21 T 14:00 PST: Added information about 2 new variants disclosed on May 21, 2018.
*   2018-01-10 T 15:00 PST: Added information about patched Windows Server and SQL Server public images.
*   2018-01-10 T 10:15 PST: Added several Ubuntu images to the list of patched public images.
*   2018-01-10 T 09:50 PST: Added guidance for patches from hardware vendors.
*   2018-01-03 to 2018-01-09: Made several revisions to the list of patched public images.

High

*   CVE-2017-5753
*   CVE-2017-5715
*   CVE-2017-5754
*   CVE-2018-3640
*   CVE-2018-3639

## Date published: 2017-10-02

Description

Severity

Notes

Dnsmasq provides functionality for serving DNS, DHCP, router advertisements, and network boot. This software is commonly installed in systems as varied as desktop Linux distributions (like Ubuntu), home routers, and IoT devices. Dnsmasq is widely used both on the open Internet and internally in private networks.

Google discovered seven distinct issues over the course of our regular internal security assessments. After we determined the severity of these issues, we worked to investigate their impact and exploitability and then produced internal proofs of concept for each of them. We also worked with the maintainer of Dnsmasq, Simon Kelly, to produce appropriate patches and mitigate the issue.

During our review, the team found three potential remote code executions, one information leak, and three denial of service vulnerabilities affecting the latest version at the project git server as of September 5th 2017.

These patches are upstreamed and are committed to the project's Git repository.

#### Compute Engine impact

By default, Dnsmasq is only installed in images that use NetworkManager and is inactive by default. The following Compute Engine public images have Dnsmasq installed:

*   Ubuntu 16.04, 16.10, 17.04
*   CentOS 7
*   RHEL 7

However, other images might have Dnsmasq installed as a dependency for other packages. We recommend that you update your Debian, Ubuntu, CentOS, RHEL, SLES, and OpenSuse instances to use the latest operating system image. CoreOS and Container-Optimized OS are not affected. Windows images are also unaffected.

For instances running Debian and Ubuntu, you can perform an update by running the following commands in your instance:

sudo apt-get -y update

sudo apt-get -y dist-upgrade

For Red Hat Enterprise Linux and CentOS instances, run:

sudo yum -y upgrade

For SLES and OpenSUSE images, run:

sudo zypper up

As an alternative to running the manual update commands, you can recreate VM instances using the image families of the respective operating system.

High

*   CVE-2017-14491
*   CVE-2017-14492
*   CVE-2017-14493
*   CVE-2017-14494
*   CVE-2017-14495
*   CVE-2017-14496
*   CVE-2017-13704

## Date published: 2016-10-26

Description

Severity

Notes

CVE-2016-5195 is a race condition in the way Linux kernel's memory subsystem handled breakage of the read-only private mappings COW situation on write access.

An unprivileged local user could use this flaw to gain write access to otherwise read-only memory mappings and thus increase their privileges on the system.

For more information see the Dirty COW FAQ.

#### Compute Engine impact

All Linux distributions and versions on Compute Engine are affected. Most instances will automatically download and install a newer kernel. However, a reboot is required to patch your running system.

New or re-created instances based on the following Compute Engine images have patched kernels installed already.

*   `centos-6-v20161026`
*   `centos-7-v20161025`
*   `coreos-alpha-1192-2-0-v20161021`
*   `coreos-beta-1185-2-0-v20161021`
*   `coreos-stable-1122-3-0-v20161021`
*   `debian-8-jessie-v20161020`
*   `rhel-6-v20161026`
*   `rhel-7-v20161024`
*   `sles-11-sp4-v20161021`
*   `sles-12-sp1-v20161021`
*   `ubuntu-1204-precise-v20161020`
*   `ubuntu-1404-trusty-v20161020`
*   `ubuntu-1604-xenial-v20161020`
*   `ubuntu-1610-yakkety-v20161020`

High

CVE-2016-5195

## Date published: 2016-02-16

**Last updated: 2016-02-22**

Description

Severity

Notes

CVE-2015-7547 is a vulnerability where the glibc DNS client side resolver makes software vulnerable to a stack-based buffer overflow when using the `getaddrinfo()` library function. An attacker can take advantage of software using the function to exploit this vulnerability with attacker-controlled domain names, attacker-controlled DNS servers, or through a man-in-the-middle attack.

For more details, see the Google Security blog postor the Common Vulnerabilities and Exposures (CVE) database.

#### Compute Engine impact

**Update (2016-02-22):**

You can now recreate your instances using the following CoreOS, SLES, and OpenSUSE images:

*   `coreos-alpha-962-0-0-v20160218`
*   `coreos-beta-899-7-0-v20160218`
*   `coreos-stable-835-13-0-v20160218`
*   `opensuse-13-2-v20160222`
*   `opensuse-leap-42-1-v20160222`
*   `sles-11-sp4-v20160222`
*   `sles-12-sp1-v20160222`

**Update (2016-02-17):**

You can now perform an update on Ubuntu 12.04 LTS, Ubuntu 14.04 LTS, and Ubuntu 15.10 instances by running the following commands:

1.  `user@my-instance:~$ sudo apt-get -y update`
2.  `user@my-instance:~$ sudo apt-get -y dist-upgrade`
3.  `user@my-instance:~$ sudo reboot`

As an alternative to running the manual update commands, you can now recreate their instances with the following new images:

*   `backports-debian-7-wheezy-v20160216`
*   `centos-6-v20160216`
*   `centos-7-v20160216`
*   `debian-7-wheezy-v20160216`
*   `debian-8-jessie-v20160216`
*   `rhel-6-v20160216`
*   `rhel-7-v20160216`
*   `ubuntu-1204-precise-v20160217a`
*   `ubuntu-1404-trusty-v20160217a`
*   `ubuntu-1510-wily-v20160217`

We are not aware of any methods that can exploit this vulnerability through Compute Engine's DNS resolvers with the default glibc configuration. We recommend you patch your virtual machine instances as soon as possible, since, as with any new vulnerability, new exploit methods might be discovered over time. If you have enabled edns0 (disabled by default), you should disable it until your instances are patched.

**Original bulletin:**

Your Linux distribution might be vulnerable. Compute Engine customers will need to update the OS images of their instances to eliminate this vulnerability if they are running a Linux OS.

For instances running Debian, you can perform an update by running the following commands in your instance:

1.  `user@my-instance:~$ sudo apt-get -y update`
2.  `user@my-instance:~$ sudo apt-get -y dist-upgrade`
3.  `user@my-instance:~$ sudo reboot`

We also recommend installing UnattendedUpgrades for your Debian instances.

For Red Hat Enterprise Linux instances:

*   `user@my-instance:~$ sudo yum -y upgrade`
*   `user@my-instance:~$ sudo reboot`

We will continue to update this bulletin as other operating system maintainers publish patches for this vulnerability and as Compute Engine releases updated OS images.

High

CVE-2015-7547

## Date published: 2015-03-19

Description

Severity

Notes

CVE-2015-1427 is a vulnerability where the Groovy scripting engine in Elasticsearch before version 1.3.8 and any 1.4.x versions before 1.4.3, allows remote attackers to bypass the sandbox protection mechanism and execute arbitrary shell commands.

For more details, see the National Vulnerability Database (NVD) or the Common Vulnerabilities and Exposures (CVE) database.

#### Compute Engine impact

If you are running Elasticsearch on your Compute Engine instances, you should upgrade your Elasticsearch version to 1.4.3 or higher. If you have already upgraded your Elasticsearch software, you are protected from this vulnerability.

If you have not upgraded Elasticsearch 1.4.3 or higher, you can perform a rolling upgrade.

If you deployed Elasticsearch using Click-to-deploy in the Google Cloud console, you can delete the deployment to remove instances running Elasticsearch.

The Google Cloud team is working on a fix in order to deploy an updated version of Elasticsearch. However, the fix is not yet available for the Click-to-deploy feature in the Google Cloud console.

High

CVE-2015-1427

## Date published: 2015-01-29

Description

Severity

Notes

CVE-2015-0235 (Ghost) is a vulnerability in the glibc library.

App Engine, Cloud Storage, BigQuery, and Cloud SQL customers don't need to take any actions. Google servers have been updated and are protected from this vulnerability.

Customers of Compute Engine may need to update their OS images.

#### Compute Engine impact

Your Linux distribution may be vulnerable. Compute Engine customers will need to update the OS images of their instances to eliminate this vulnerability if they are running Debian 7, Debian 7 backports, Ubuntu 12.04 LTS, Red Hat Enterprise Linux, CentOS, or SUSE Linux Enterprise Server 11 SP3.

This vulnerability does not affect Ubuntu 14.04 LTS, Ubuntu 14.10, or SUSE Linux Enterprise Server 12.

We recommend that you upgrade your Linux distributions. For instances running Debian 7, Debian 7 backports, or Ubuntu 12.04 LTS, you can perform an update by running the following commands in your instance:

1.  `user@my-instance:~$ sudo apt-get update`
2.  `user@my-instance:~$ sudo apt-get -y upgrade`
3.  `user@my-instance:~$ sudo reboot`

For Red Hat Enterprise Linux or CentOS instances:

1.  `user@my-instance:~$ sudo yum -y upgrade`
2.  `user@my-instance:~$ sudo reboot`

For SUSE Linux Enterprise Server 11 SP3 instances:

1.  `user@my-instance:~$ sudo zypper --non-interactive up`
2.  `user@my-instance:~$ sudo reboot`

As an alternative to running the manual update commands above, users can now recreate their instances with the following new images:

*   `debian-7-wheezy-v20150127`
*   `backports-debian-7-wheezy-v20150127`
*   `centos-6-v20150127`
*   `centos-7-v20150127`
*   `rhel-6-v20150127`
*   `rhel-7-v20150127`
*   `sles-11-sp3-v20150127`
*   `ubuntu-1204-precise-v20150127`

#### Google Managed VM impact

Managed VM users using `gcloud preview app deploy` must update their base docker containers with `gcloud preview app setup-managed-vms` and redeploy each of their running apps using `gcloud preview app deploy`. Users that deploy with `appcfg` don't need to do anything and will be upgraded automatically.

High

CVE-2015-0235

## Date published: 2014-10-15

**Last updated: 2014-10-17**

Description

Severity

Notes

CVE-2014-3566 (aka POODLE) is a vulnerability in the design of SSL version 3.0. This vulnerability allows the plaintext of secure connections to be calculated by a network attacker. For details, see our blog post on the vulnerability.

App Engine, Cloud Storage, BigQuery, and Cloud SQL customers don't need to take any actions. Google servers have been updated and are protected from this vulnerability. Customers of Compute Engine need to update their OS images.

#### Compute Engine impact

**Updated (2014-10-17):**

You may be vulnerable if you are using SSLv3. Compute Engine customers will need to update the OS images of their instances to eliminate this vulnerability.

We recommend that you upgrade your Linux distributions. For instances running Debian, you can perform an update by running the following commands in your instance:

user@my-instance:~$ sudo apt-get update
user@my-instance:~$ sudo apt-get -y upgrade
user@my-instance:~$ sudo reboot

For CentOS instances:

user@my-instance:~$ sudo yum -y upgrade
user@my-instance:~$ sudo reboot

As an alternative to running the manual update commands above, users can now recreate their instances with the following new images to recreate your instances:

*   `centos-6-v20141016`
*   `centos-7-v20141016`
*   `debian-7-wheezy-v20141017`
*   `backports-debian-7-wheezy-v20141017`

We will update the bulletin for RHEL and SLES images after we have the images. In the meantime, RHEL users can consult Red Hat directly for more information.

**Original bulletin:**

Compute Engine customers will need to update the OS images of their instances to eliminate this vulnerability. We will update this security bulletin with instructions once new OS images are available.

Medium

CVE-2014-3566

## Date published: 2014-09-24

**last updated: 2014-09-29**

Description

Severity

Notes

There is a bug in bash (CVE-2014-6271) that allows remote code execution based on parsing of any attacker-controlled environment variables. The most likely vector of exploitation is using malicious HTTP requests made to CGI scripts exposed on a web server. For more information, see the bug description.

The bash bugs have been mitigated for Google Cloud products except for Compute Engine guest OS images dated before 20140926. Please see below for steps to mitigate the bugs for your Compute Engine images.

#### Compute Engine impact

This bug may affect virtually all websites that use CGI scripts. In addition, it will likely affect web sites that rely on PHP, Perl, Python, SSI, Java, C++, and similar servlets that will ever invoke shell commands using calls such as `popen`, `system`, `shell_exec`, or similar APIs. It may also affect systems that attempt to allow controlled login access to restricted users using mechanisms such as SSH command limitation or the bash restricted shell.

**Update (2014-09-29):**

As an alternative to running the manual update commands below, users can now recreate their instances with images that mitigate additional vulnerabilities related to the bash security bug, including CVE-2014-7169, CVE-2014-6277, CVE-2014-6278, CVE-2014-7186, and CVE-2014-7187. Use the following new images to recreate your instances:

*   `centos-6-v20140926`
*   `centos-7-v20140926`
*   `debian-7-wheezy-v20140926`
*   `backports-debian-7-wheezy-v20140926`
*   `rhel-6-v20140926`

**Update (2014-09-25):**

Users can now choose to recreate their instances instead of performing a manual update. To recreate your instances, use the following new images which contains fixes to this security bug:

*   `backports-debian-7-wheezy-v20140924`
*   `debian-7-wheezy-v20140924`
*   `rhel-6-v20140924`
*   `centos-6-v20140924`
*   `centos-7-v20140924`

For RHEL and SUSE images, you can also manually perform updates by running the following commands on your instances:

# RHEL instances
user@my-instance:~$ sudo yum -y upgrade

# SUSE instances
user@my-instance:~$ sudo zypper --non-interactive up

**Original bulletin:**

We recommend that you upgrade your Linux distributions. For instances running Debian, you can perform an update by running the following commands in your instance:

user@my-instance:~$ sudo apt-get update
user@my-instance:~$ sudo apt-get -y upgrade

For CentOS instances:

user@my-instance:~$ sudo yum -y upgrade

For detailed information, review the announcement for the respective Linux distribution:

*   Original patches: http://ftp.gnu.org/gnu/bash/ (see the last entry in *-patches for the appropriate version)
*   Debian: [SECURITY] [DSA 3032-1] bash security update
*   RHEL:
    *   RHSA-2014:1293-01
    *   RHSA-2014:1294-01
*   CentOS 5: [CentOS-announce] CESA-2014:1293
*   CentOS 6: [CentOS-announce] CESA-2014:1293
*   CentOS 7: [CentOS-announce] CESA-2014:1293

High

CVE-2014-7169, CVE-2014-6271, CVE-2014-6277, CVE-2014-6278 CVE-2014-7186, CVE-2014-7187

## Date published: 2014-07-25

Description

Severity

Notes

Elasticsearch Logstash is vulnerable to OS command injection that can allow unauthorized modification and disclosure of data. An attacker can send crafted events to any of Logstash's data sources, allowing the attacker to execute commands with the permissions of the Logstash process.

#### Compute Engine impact

This vulnerability affects all Compute Engine instances running versions of Elasticsearch Logstash before 1.4.2 with zabbix or nagios_nsca outputs enabled. To prevent attack, you can either:

*   Upgrade to Logstash 1.4.2
*   Apply the patch for versions 1.3.x
*   Disable the `zabbix` and `nagios_nsca` outputs.

Read more on the Logstash blog.

Elasticsearch also recommends using a firewall to prevent remote access by untrusted IPs.

High

CVE-2014-4326

## Date published: 2014-06-18

Description

Severity

Notes

We would like to take a moment to respond to any possible concerns that customers have about the security of Docker containers when running on Google Cloud. This includes customers using our App Engine extensions that support Docker Containers, container optimized virtual machines, or the Open Source Kubernetes scheduler.

Docker has done a great job of responding to the issue and you can see their blog response here. Note that, as they say in their response, the issue revealed applies only to Docker 0.11, an older, pre-production, version.

While the world is thinking about container security, we would like to point out that in Google Cloud, Linux application container based solutions (specifically Docker containers) run in full virtual machines (Compute Engine). While we support the efforts of the Docker community to harden the Linux application container stack, we recognize that the technology is new, and the surface area large. It is our belief that, for now, full hypervisors (virtual machines) provide a more compact and defensible surface area. Virtual machines were designed from the beginning to isolate malicious workloads and to minimize the likelihood and impact of a code bug.

Our customers can rest assured that a full hypervisor boundary exists between them and any third party, potentially malicious code. Should we reach a point where we consider the Linux application container stack robust enough to support multi-tenant workloads, we will let the community know. For now, the Linux application container does not replace the virtual machine. It is a way to get a lot more out of it.

Low

Docker blog post

## Date published: 2014-06-05

**Last updated: 2014-06-09**

Description

Severity

Notes

OpenSSL has an issue where the `ChangeCipherSpec` messages are not correctly bound into the handshake state machine. This allows them to be injected early into the handshake. An attacker using a carefully crafted handshake can force the use of weak keying material in OpenSSL SSL/TLS clients and servers. This can be exploited by a person-in-the-middle (PITM) attack where the attacker can decrypt and modify traffic from the attacked client and server.

This issue is identified as CVE-2014-0224. The OpenSSL team has fixed the issue and alerted the OpenSSL community to update OpenSSL.

#### Compute Engine impact

This vulnerability affects all Compute Engine instances which use OpenSSL, including Debian, CentOS, Red Hat Enterprise Linux, and SUSE Linux Enterprise Server. You can update your instances by recreating them with new images, or by manually updating packages on your instances.

**Update (2014-06-09):** To update your instances running SUSE Linux Enterprise Server with new images, recreate your instances using the following image versions or higher:

*   `sles-11-sp3-v20140609`

**Original post:**

To update Debian and CentOS instances using new images, recreate your instances using any of the following image versions or higher:

*   `debian-7-wheezy-v20140605`
*   `backports-debian-7-wheezy-v20140605`
*   `centos-6-v20140605`
*   `rhel-6-v20140605`

To manually update OpenSSL on your instances, run the following commands to update the appropriate packages. For instances running CentOS and RHEL, you can update OpenSSL by running these commands in your instance:

user@my-instance:~$ sudo yum -y update
user@my-instance:~$ sudo reboot

For instances running Debian, you can update OpenSSL by running the following commands in your instance:

user@my-instance:~$ sudo apt-get update
user@my-instance:~$ sudo apt-get -y upgrade
user@my-instance:~$ sudo reboot

For instances running SUSE Linux Enterprise Server, you can ensure OpenSSL is up to date by running these commands in the instance:

user@my-instance:~$ sudo zypper --non-interactive up
user@my-instance:~$ sudo reboot

Medium

CVE-2014-0224

## Date published: 2014-04-08

Description

Severity

Notes

The (1) TLS and (2) DTLS implementations in OpenSSL 1.0.1 before 1.0.1g don't properly handle Heartbeat Extension packets, which allows remote attackers to obtain sensitive information from process memory using crafted packets that trigger a buffer over-read, as demonstrated by reading private keys, related to `d1_both.c` and `t1_lib.c`, also known as the Heartbleed bug.

#### Compute Engine impact

This vulnerability affects all Compute Engine Debian, RHEL, and CentOS instances that don't have the most updated version of OpenSSL. You can update your instances by recreating them with new images, or by manually updating packages on your instances.

To update your instances using new images, recreate your instances using any of the following image versions or higher:

*   `debian-7-wheezy-v20140408`
*   `backports-debian-7-wheezy-v20140408`
*   `centos-6-v20140408`
*   `rhel-6-v20140408`

To manually update OpenSSL on your instances, run the following commands to update the appropriate packages. For instances running CentOS and RHEL, you can ensure OpenSSL is up to date by running these commands in the instance:

user@my-instance:~$ sudo yum update
user@my-instance:~$ sudo reboot

For instances running Debian, you can update OpenSSL by running the following commands in your instance:

user@my-instance:~$ sudo apt-get update
user@my-instance:~$ sudo apt-get upgrade
user@my-instance:~$ sudo reboot

Instances running SUSE Linux are not affected.

**Update on April 14, 2014:** In light of new research on extracting keys using the Heartbleed bug, Compute Engine is recommending that Compute Engine customers create new keys for any affected SSL services.

Medium

CVE-2014-0160

## Date published: 2013-06-07

Description

Severity

Notes

**Note:** This vulnerability is only applicable for kernels, which have been deprecated and removed since API version v1.

Format string vulnerability in the `b43_request_firmware` function in `drivers/net/wireless/b43/main.c` in the Broadcom B43 wireless driver in the Linux kernel through 3.9.4 allows local users to gain privileges by leveraging root access and including format string specifiers in an `fwpostfix` modprobe parameter, leading to improper construction of an error message.

#### Compute Engine impact

This vulnerability affects all Compute Engine kernels earlier than `gcg-3.3.8-201305291443`. In response, Compute Engine has deprecated all earlier kernels and recommends that users update their instances and images to use Compute Engine kernel `gce-v20130603`. `gce-v20130603` contains kernel `gcg-3.3.8-201305291443`, which has the patch for this vulnerability.

To find out what kernel version your instance is using:

1.  Connect to your instance using ssh
2.  Run `uname -r`

Medium

CVE-2013-2852

## Date published: 2013-06-07

Description

Severity

Notes

**Note:** This vulnerability is only applicable for kernels, which have been deprecated and removed since API version v1.

Format string vulnerability in the register_disk function in `block/genhd.c` in the Linux kernel through 3.9.4 allows local users to gain privileges by leveraging root access and writing format string specifiers to `/sys/module/md_mod/parameters/new_array` in order to create a crafted `/dev/md` device name.

#### Compute Engine Impact

This vulnerability affects all Compute Engine kernels earlier than `gcg-3.3.8-201305291443`. In response, Compute Engine has deprecated all earlier kernels and recommends that users update their instances and images to use Compute Engine kernel `gce-v20130603`. `gce-v20130603` contains kernel `gcg-3.3.8-201305291443`, which has the patch for this vulnerability.

To find out what kernel version your instance is using:

1.  Connect to your instance using ssh
2.  Run `uname -r`

Medium

CVE-2013-2851

## Date published: 2013-05-14

Description

Severity

Notes

**Note:** This vulnerability is only applicable for kernels, which have been deprecated and removed since API version v1.

The perf_swevent_init function in `kernel/events/core.c` in the Linux kernel before 3.8.9 uses an incorrect `integer` data type, which allows local users to gain privileges using a crafted `perf_event_open` system call.

#### Compute Engine impact

This vulnerability affects all Compute Engine kernels earlier than `gcg-3.3.8-201305211623`. In response, Compute Engine has deprecated all earlier kernels and recommends that users update their instances and images to use Compute Engine kernel `gce-v20130521`. `gce-v20130521` contains kernel `gcg-3.3.8-201305211623`, which has the patch for this vulnerability.

To find out what kernel version your instance is using:

1.  Connect to your instance using ssh
2.  Run `uname -r`

High

CVE-2013-2094

## Date published: 2013-02-18

Description

Severity

Notes

**Note:** This vulnerability is only applicable for kernels, which have been deprecated and removed since API version v1.

Race condition in the ptrace functionality in the Linux kernel before 3.7.5 allows local users to gain privileges using a `PTRACE_SETREGS ptrace` system call in a crafted application.

#### Compute Engine impact

This vulnerability affects Compute Engine kernels `2.6.x-gcg-_<date>_`. In response, Compute Engine has deprecated 2.6.x kernels and recommends that users update their instances and images to use Compute Engine kernel `gce-v20130225`. `gce-v20130225` contains kernel `3.3.8-gcg-201302081521`, which has the patch for this vulnerability.

To find out what kernel version your instance is using:

1.  Connect to your instance using ssh
2.  Run `uname -r`

Medium

CVE-2013-0871

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-06-11 UTC.

*   ### Products and pricing
    
    *   See all products
    *   Google Cloud pricing
    *   Google Cloud Marketplace
    *   Contact sales
*   ### Support
    
    *   Community forums
    *   Support
    *   Release Notes
    *   System status
*   ### Resources
    
    *   GitHub
    *   Getting Started with Google Cloud
    *   Code samples
    *   Cloud Architecture Center
    *   Training and Certification
*   ### Engage
    
    *   Blog
    *   Events
    *   X (Twitter)
    *   Google Cloud on YouTube
    *   Google Cloud Tech on YouTube

*   About Google
*   Privacy
*   Site terms
*   Google Cloud terms
*   Manage cookies
*   Our third decade of climate action: join us
*   Sign up for the Google Cloud newsletter Subscribe

*   English
*   Deutsch
*   Español
*   Español – América Latina
*   Français
*   Indonesia
*   Italiano
*   Português
*   Português – Brasil
*   עברית
*   中文 – 简体
*   中文 – 繁體
*   日本語
*   한국어