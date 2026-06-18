

# HealthOmics API Reference
<a name="Welcome"></a>

This document provides detailed information about the AWS HealthOmics API actions and their parameters.

For information about the IAM access control permissions you need to use this API, see [Using IAM identity policies to manage permissions](https://docs.aws.amazon.com/omics/latest/dev/security_iam_id-based-policy-examples.html).

You can use [AWS SDKs](https://aws.amazon.com/tools/#sdk) to access HealthOmics APIs using your favorite programming language. The SDKs automatically perform useful tasks for you, such as:
+ Cryptographically sign your service requests
+ Retry requests
+ Handle error responses

The following resources provide additional information about the HealthOmics API.
+ *Amazon Web Services General Reference*
  + [Service quotas and endpoints for HealthOmics](https://docs.aws.amazon.com/general/latest/gr/healthomics-quotas.html).
+ *AWS Command Line Interface*
  + [ HealthOmics CLI commands](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/omics/index.html).
+ Quotas for HealthOmics API operations
  + See [API quotas](https://docs.aws.amazon.com/omics/latest/dev/api-quotas.html) in the *HealthOmics User Guide*.

**Topics**
+ [HealthOmics service endpoints](#api-endpoints)
+ [HealthOmics operations for storage, workflows, and analytics](#api-methods)
+ [Actions](API_Operations.md)
+ [Data Types](API_Types.md)
+ [Common Parameters](CommonParameters.md)
+ [Common Error Types](CommonErrors.md)

## HealthOmics service endpoints
<a name="api-endpoints"></a>

The *Amazon Web Services General Reference* lists the HealthOmics service endpoints for each region. See [Service quotas and endpoints for HealthOmics](https://docs.aws.amazon.com/general/latest/gr/healthomics-quotas.html). For each region, HealthOmics provides separate API endpoints for storage API operations, analytics API operations, and workflow API operations. The endpoints take the following format:

```
      storage-omics.{{region}}.amazonaws.com
      analytics-omics.{{region}}.amazonaws.com
      workflows-omics.{{region}}.amazonaws.com
   
   Examples:   
      storage-omics.us-east-1.amazonaws.com
      analytics-omics.eu-west-1.amazonaws.com
      workflows-omics.ap-southeast-1.amazonaws.com
```

## HealthOmics operations for storage, workflows, and analytics
<a name="api-methods"></a>

To identify the API operations that apply to storage, analytics, and workflows, see the following tables. 


| Storage API operation | 
| --- | 
| CreateSequenceStore, CreateReferenceStore, DeleteSequenceStore, DeleteReferenceStore | 
| BatchDeleteReadSet, DeleteReference | 
| CreateMultipartReadSetUpload, CompleteMultipartReadSetUpload, AbortMultipartReadSetUpload | 
| GetReference | 
| UploadReadSetPart | 
| GetReadSet | 
| GetSequenceStore, ListSequenceStores | 
| GetReadSetMetadata, ListReadSets | 
| StartReadSetImportJob, GetReadSetImportJob, ListReadSetImportJobs | 
| StartReadSetExportJob, GetReadSetExportJob, ListReadSetExportJobs | 
| ListReferenceStores | 
| StartReferencetImportJob, GetReferenceImportJob, ListReferenceImportJobs | 
| ListReferences, GetReferenceMetadata | 
| StartReadsetActivationJob | 
| ListReadsetActivationJobs, GetReadSetActivationJob | 
| ListMultipartReadSetUploads, ListReadSetUploadParts | 
| TagResource, UntagResource, ListTagsForResource | 


| Workflow API operation | 
| --- | 
| StartRun | 
| CreateWorkflow | 
| CancelRun, DeleteRun, GetRun, GetRunTask, ListRunTasks, ListRuns | 
| CreateRunGroup, DeleteRunGroup, GetRunGroup, ListRunGroups, UpdateRunGroup  | 
| CreateRunCache, UpdateRunCache, DeleteRunCache, GetRunCache, ListRunCaches | 
| DeleteWorkflow, GetWorkflow, ListWorkflows, UpdateWorkflow | 


| Analytics API operation | 
| --- | 
| CreateVariantStore, DeleteVariantStore, GetVariantStore, ListVariantStores, UpdateVariantStore | 
| StartVariantImportJob, CancelVariantImportJob, GetVariantImportJob, ListVariantImportJobs | 
| CreateAnnotationStore, DeleteAnnotationStore, GetAnnotationStore, ListAnnotationStores, UpdateAnnotationStore | 
| StartAnnotationImportJob, ListAnnotationImportJobs, GetAnnotationImportJob, CancelAnnotationImportJob | 