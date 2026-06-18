

# What is AWS HealthOmics?
<a name="what-is-healthomics"></a>

AWS HealthOmics is a HIPAA-eligible service that accelerates clinical diagnostic testing, drug discovery, and agriculture research by fully managing the complex infrastructure behind your bioinformatics workflows. HealthOmics supports industry-standard workflow languages (WDL, Nextflow, CWL) and seamlessly scales bioinformatics infrastructure to support data from tens of thousands of tests per day—all with predictable cost per-sample. HealthOmics handles the technical complexities like managing compute resources and maintaining workflow engines so you can focus entirely on scientific breakthroughs.

**Topics**
+ [Important notice](#important-notice)
+ [HealthOmics features](#healthomics-feature-overview)
+ [HealthOmics concepts](#concepts)
+ [Related services](#related-services)
+ [How to access HealthOmics](#acessing-healthomics)
+ [Regions and endpoints for AWS HealthOmics](#endpoints)
+ [Learn more](#healthomics-resources)

## Important notice
<a name="important-notice"></a>

HealthOmics is intended only for the transferring, storing, formatting, or displaying of data, and for the provision of infrastructure and configuration support for managing workflows. HealthOmics isn't a substitute for professional medical advice, diagnosis, or treatment, and isn't intended to cure, treat, mitigate, prevent, or diagnose any disease or health condition. You are responsible for instituting human review as part of any use of AWS HealthOmics, including in association with any third-party product intended to inform clinical decision-making.

## HealthOmics features
<a name="healthomics-feature-overview"></a>

**Primary use cases for HealthOmics:**
+ *Clinical diagnostics* – Build and scale diagnostic testing workflows with predictable costs and fully managed infrastructure that grows with your testing volume.
+ *Drug discovery* – Accelerate therapeutic research by orchestrating biological foundation models at scale, enabling rapid iteration across millions of potential candidates.
+ *Agricultural research* – Enhance crop traits like drought tolerance and pest resistance through AI-powered workflows that improve food security and agricultural productivity.

**Key benefits of HealthOmics:**
+ *Scalability* – Scale workflows across 100,000\+ concurrent vCPUs to support tens of thousands of tests daily with zero infrastructure management and predictable cost-per sample. 
+ *Focus on science, not infrastructure* – Use familiar workflow languages and APIs while AWS automatically handles infrastructure orchestration and data management behind the scenes.
+ *Maintain compliance* – Comprehensive audit trails, data provenance tracking, and HIPAA-eligible infrastructure designed for clinical workflows—all out-of-the-box—support development of solutions that meet regulatory requirements.

HealthOmics consists of three main components:
+ [HealthOmics workflows](https://docs.aws.amazon.com/omics/latest/dev/private-workflows.html) — Run bioinformatics computations on automatically provisioned and scaled infrastructure.
+ [HealthOmics storage](https://docs.aws.amazon.com/omics/latest/dev/sequence-stores.html) — Store and share petabytes of genomics data efficiently at a low cost per gigabase.
+ [HealthOmics analytics](https://docs.aws.amazon.com/omics/latest/dev/omics-analytics.html) — Prepare genomics data for multiomics and multimodal analyses.

Use these components independently or combine them for an end-to-end solution.

## HealthOmics concepts
<a name="concepts"></a>

This topic covers definitions for key concepts and terms that are specific to HealthOmics, to help you understand the terminology of HealthOmics used this guide.

**Topics**
+ [Workflows](#workflows-concepts)
+ [Storage](#sequence-store-concepts)
+ [Analytics](#variant-store-concepts)

### Workflows
<a name="workflows-concepts"></a>

With HealthOmics Workflows, you can process and analyze your genomics data.
+ *Workflow* – The overall definition of an end to end process including parameters and references to tools. Workflow definitions can be expressed as WDL, Nextflow, or CWL. Each created workflow has a unique identifier. 
+ *Run* – A single invocation of a workflow. An individual run uses your defined input data and produces an output. Each created run has a unique identifier. 
+ *Task* – The individual processes within a run. HealthOmics Workflows use these defined compute specifications to run your task. Each task has a unique identifier. 
+ *Run group* – A group of runs for which you can set the max vCPU, max duration, or max concurrent runs to help limit the compute resources used per run. You can specify and configure priorities for your runs within a run group. For example, you can specify that a high priority run will be performed before one that's lower priority, creating a priority queue. It is optional to use a Run Group, and each Run Group has a unique identifier.

### Storage
<a name="sequence-store-concepts"></a>

Data storage is separated into sequence stores, for your genomics sequences and related information, and a reference store, for all of your reference genomes. The following terms describe the implementations that are specific to HealthOmics.
+ *Sequence store* – A data store for the storage of genomics files. You can have one or more sequence stores within HealthOmics. Access permissions and AWS KMS encryption can be set on a sequence store to control who has access to the data. 
+ *Read set* – A read set is an abstraction of genomics reads, which are stored in FASTQ, BAM, or CRAM formats. Read sets can be imported into sequence stores and annotated with metadata. You can apply permissions to read sets using attribute based access control (ABAC). 
+ *Reference* – A genome reference is used with reads to identify where in a genome a specific read, or group of reads, is mapped to. These are in FASTA format and stored in the reference store. 
+ *Reference store* – A data store for the storage of reference genomes. You can have a single reference store in each account and region. 

### Analytics
<a name="variant-store-concepts"></a>

You can transform and analyze your genomics data with HealthOmics Analytics. Create a variant store or annotation store to include additional information for your queries.
+ *Variant store* – data store that stores variant data at a population scale. Variant stores support both genomic Variant Call Format (gVCF) and VCF inputs. 
+ *Annotation store* – A data store representing an annotation database, such as one from a TSV/CSV, VCF, or General Feature Format (GFF3) file. Annotation Stores are mapped to the same coordinate system as variant stores during an import. 

## Related services
<a name="related-services"></a>

The following services work with HealthOmics.
+ Amazon Elastic Container Registry – Each private workflow uses an Amazon ECR image (in a private Amazon ECR repository) to contain all executables, libraries, and scripts required to run the workflow.
+ Amazon Simple Storage Service – Amazon S3 provides file storage for Store and Workflow data. 
+ AWS Lake Formation – Lake Formation manages data access to your Analytics data stores.
+ Amazon Athena – Use Athena to perform queries on your Variant stores.
+ Amazon SageMaker AI – Use SageMaker AI to run HealthOmics tasks using Jupyter notebooks.
+ [https://docs.aws.amazon.com/codepipeline/latest/userguide/connections-github.html](https://docs.aws.amazon.com/codepipeline/latest/userguide/connections-github.html) – Use connections to connect your external code respoitories to your HealthOmics workflows.

## How to access HealthOmics
<a name="acessing-healthomics"></a>

You can access AWS HealthOmics features using the management console, CLI, SDKs or API. 
+ AWS Management Console – Provides a web interface that you can use to access HealthOmics.
+ AWS Command Line Interface (AWS CLI) – Provides commands for a broad set of AWS services, including AWS HealthOmics, and is supported on Windows, macOS, and Linux. For more information about installing the AWS CLI, see [AWS Command Line Interface]( https://aws.amazon.com/cli/). 
+ AWS SDKs – AWS provides SDKs (Software Development Kits) that consist of libraries and sample code for various programming languages and platforms (including Java, Python, Ruby, .NET, iOS, and Android). The SDKs provide a convenient way to use HealthOmics programmatically. For more information, see the [AWS SDK Developer Center](https://aws.amazon.com/developer/tools/).
+ AWS API – You can use API operations to access and manage HealthOmics programmatically. For more information, see the [HealthOmics API Reference](https://docs.aws.amazon.com/omics/latest/api/Welcome.html).
+ Kiro Power for HealthOmics – A curated and pre-packaged MCP server with steering files and agent hooks that gives the Kiro agent expertise in HealthOmics workflow creation and optimization. Download the HealthOmics Kiro Power from [Kiro Powers](https://kiro.dev/powers/).
+ Kiro IDE extension for HealthOmics – Provides syntax highlighting, code completion, and troubleshooting guidance for HealthOmics workflows, along with engine compatibility checking, performance optimization recommendations, automated run analysis with failure diagnostics, and workflow import/export capabilities. Download the extension from [Open VSX Registry](https://open-vsx.org/).

## Regions and endpoints for AWS HealthOmics
<a name="endpoints"></a>

For a full list of regions and endpoints, see the [AWS General Reference](https://docs.aws.amazon.com/general/latest/gr/healthomics-quotas.html).

In addition to the AWS regions that are active by default, there are also *Opt-in Regions* which need to be activated. To learn more about how to activate or deactivate a Region, see [Specify which AWS Regions your account can use](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-regions.html#manage-acct-regions-enable-standalone) in the AWS Account Management guide. 

## Learn more
<a name="healthomics-resources"></a>

Learn more about HealthOmics from these workshops and tutorials:
+ HealthOmics workshop – [HealthOmics end to end workshop](https://catalog.workshops.aws/amazon-omics-end-to-end/en-US)
+ AWS genomics resources – [Public Amazon ECR repositories](https://gallery.ecr.aws/aws-genomics?page=1) related to genomics
+ Python tutorials – [Jupyter notebook tutorials](https://github.com/aws-samples/amazon-omics-tutorials) on GitHub, covering HealthOmics storage, analytics, and workflows 

Become familiar with additional HealthOmics tools that AWS provides:
+ WDL linter – [HealthOmics linter for WDL](https://gallery.ecr.aws/aws-genomics/healthomics-linter)
+ Nextflow linter – [HealthOmics linter for Nextflow](https://gallery.ecr.aws/aws-genomics/linter-rules-for-nextflow)
+ HealthOmics Amazon ECR helper tool – [Amazon ECR helper tool for HealthOmics](https://github.com/aws-samples/amazon-ecr-helper-for-aws-healthomics)
+ HealthOmics tools on GitHub – [Tools for working with HealthOmics](https://github.com/awslabs/amazon-omics-tools) (Transfer manager, URI parser, Omics rerun, Run analyzer).