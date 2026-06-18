

# What is the Amazon MWAA migration guide?
<a name="about-mwaa-migration"></a>

 Amazon Managed Workflows for Apache Airflow is a managed orchestration service for [Apache Airflow](https://airflow.apache.org/) that allows you to operate data pipelines in the cloud at scale. Amazon MWAA manages the provisioning and ongoing maintenance of Apache Airflow so you no longer need to worry about patching, scaling, or securing instances. 

 Amazon MWAA automatically scales the compute resources that execute tasks to provide consistent performance on demand. Amazon MWAA secures your data by default. Your workloads run in your own isolated and secure cloud environment using Amazon Virtual Private Cloud. This ensures that data is automatically encrypted using AWS Key Management Service. 

 Use this guide to migrate your self-managed Apache Airflow workflows to Amazon MWAA, or upgrade an existing Amazon MWAA environment to a new Apache Airflow version. The migration tutorial describes how you can create, or clone a new Amazon MWAA environment, migrate your workflow resources, and transfer your workflow metadata and logs to your new environment. 

 Before you attempt the migration tutorial, we recommend reviewing the following topics. 
+  [Explore Amazon MWAA network architecture](mwaa-architecture.md) 
+  [Key considerations for migrating to a new MWAA environment](key-considerations.md) 