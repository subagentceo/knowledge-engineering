

# Welcome
<a name="Welcome"></a>

AWS Diagnostic Tools provides an HTTP endpoint to self diagnose common troubleshooting issues with AWS Services.

 The AWS Diagnostic Tools includes several diagnostic tools you can run to diagnose various AWS services. The service includes a set of APIs designed to streamline and manage diagnostic processes. These APIs enable a range of actions: `GetTool` and `ListTools` provide information about the diagnostic tools available within the service. `StartExecution` initiates a diagnostic process, termed an `Execution`. Post-execution, `GetExecution` and `GetExecutionOutput` allow users to retrieve details and results of these Executions, respectively. For organizational efficiency, Executions can be tagged or untagged using `TagResource` and `UntagResource`. Additionally, ListExecutions offers a view of all Executions, and `ListTagsForResource` aids in viewing tags associated with a specific resource. Altogether, these APIs facilitate robust and efficient diagnostic operations within the DT service. 

This document was last published on June 17, 2026. 