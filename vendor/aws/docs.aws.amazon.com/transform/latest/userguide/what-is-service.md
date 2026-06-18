

# What is AWS Transform?
<a name="what-is-service"></a>

AWS Transform is a service that helps you accelerate and simplify the transformation of infrastructure, applications, and code with an agentic AI experience. It provides specialized tools to streamline modernization and migration efforts across various workloads.

With AWS Transform, you can:
+ Modernize and migrate IBM z/OS and Fujitsu GS21 to AWS
+ Migrate VMware workloads to Amazon EC2
+ Modernize .NET applications to Linux-ready cross-platform .NET
+ Assess workloads for migration readiness

AWS Transform helps you offload labor-intensive, complex transformation tasks across the discovery, planning, and execution phases to AI agents with expertise in languages, frameworks, and infrastructure. This approach allows your teams to focus on innovation while it efficiently transforms complex, large-scale projects through a unified web experience.

There are no additional charge to use AWS Transform.

## Terminology
<a name="transform-app-terminology-roles"></a>

Within this section, italics indicate an official term within the definition of a different term.

**Account connection**  
Account in this context is a generalized reference to a customer-owned container or security boundary for resources in AWS or remote service, for example, an AWS account or GitHub account.

**Artifact**  
An output deliverable produced by AWS Transform.

**Administrator**  
Administrators can read and mutate everything in the workspace. They can begin chats with AWS Transform, start and stop jobs, and upload/download artifacts. Administrators can interact with running jobs for human-in-the-loop (HITL) actions, and can approve critical HITL actions such as merging to main, performing graph decomposition, or deploying code to production environments. Administrators can mutate [workspaces](#glossary_workspace), [connectors](#glossary_connector), and users.

**Agent**  
A task-specific service that executes a specific transformation type. For example, VMware migrations.

**Approver**  
Approvers have permissions similar to Administrators except that they do not have permissions to mutate workspaces, connectors, or users. Approvers cannot mutate [workspaces](#glossary_workspace), [connectors](#glossary_connector), or users.

**Asset**  
Input for a transformation [job](#glossary_job). For example, customer's source code, server, database, network. Assets are accessed via a [connector](#glossary_connector).

**Collaborator request**  
A *task* in which AWS Transform is asking a human to do something.

**Connector**  
Connectors are asset providers that allow access to customer-owned resources in a system external to AWS Transform.  
When you set up a connector, the administrator of the account to which you are connecting must accept the connection. In order to accept the connection, they must have permissions given in [the connector acceptor policy](security_iam_id-based-policy-examples.md#id-based-policy-examples-admin-connector).  
The following two accounts must either be identical, or in the same AWS Organizations organization:  
+ The account from which the AWS Transform administrator enables the service.
+ The account that will be on the receiving end of your transformation. This account must be assigned an IAM role that allows it to use a [connector](#glossary_connector).

**Contributor**  
Contributors can read everything in the workspace. They can begin chats with AWS Transform, start and stop jobs, upload or download artifacts, and interact with running [jobs](#glossary_job) for HITL actions. However, they cannot perform critical HITL actions such as merging to main, performing graph decomposition, or deploying code to production environments. Contributors also cannot mutate [workspaces](#glossary_workspace), [connectors](#glossary_connector), or users.

**Objective**  
A user-defined end state that AWS Transform works to reach. Users write this, and then AWS Transform converts the objective into a series of tasks that it perform in concert with users when required.

**Job**  
A long-running process (weeks/months\+) that AWS Transform is working on in order to fulfill an [objective](#glossary_objective) defined by a user. Made up of multiple [tasks](#glossary_task) and [collaborator requests](#glossary_collaborator-request).

**Plan**  
A list of [tasks](#glossary_task) that AWS Transform undertakes (with help from human users) in pursuit of an [objective](#glossary_objective).

**Reader**  
Readers can view the status and outcomes of AWS Transform jobs, but cannot make any changes. They can read everything in the [workspace](#glossary_workspace), download artifacts, view [jobs](#glossary_job), and view human-in-the-loop (HITL) actions. However, readers cannot perform mutating actions in AWS Transform.

**Task**  
An individual unit of work that is part of a [job](#glossary_job).

**Worklog**  
A log of what actions AWS Transform and users have performed as part of a [job](#glossary_job).

**Workspace**  
A AWS Transform resource that contains other resources like [connectors](#glossary_connector) and [jobs](#glossary_job). A [workspace](#glossary_workspace) serves as a permissions boundary.