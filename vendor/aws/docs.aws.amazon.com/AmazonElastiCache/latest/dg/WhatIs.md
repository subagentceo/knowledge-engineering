

# What is Amazon ElastiCache?
<a name="WhatIs"></a>

Welcome to the *Amazon ElastiCache User Guide*. Amazon ElastiCache is a web service that makes it easy to set up, manage, and scale a distributed in-memory data store or cache environment in the cloud. It provides a high-performance, scalable, and cost-effective caching solution. At the same time, it helps remove the complexity associated with deploying and managing a distributed cache environment.

You can operate Amazon ElastiCache in two formats. You can get started with a serverless cache or create a node-based cluster. 

**Note**  
Amazon ElastiCache works with the Valkey, Memcached, and Redis OSS engines. If you're unsure which engine you want to use, see [Comparing node-based Valkey, Memcached, and Redis OSS clusters](SelectEngine.md) in this guide. 

## Serverless caching
<a name="WhatIs.Overview"></a>

ElastiCache offers serverless caching, which simplifies adding and operating a cache for your application. ElastiCache Serverless enables you to create a highly available cache in under a minute, and eliminates the need to provision instances or configure nodes or clusters. Developers can create a Serverless cache by specifying the cache name using the ElastiCache console, SDK or CLI. 

ElastiCache Serverless also removes the need to plan and manage caching capacity. ElastiCache constantly monitors the cache’s memory, compute, and network bandwidth used by your application, and scales to meet the needs of your application. ElastiCache offers a simple endpoint experience for developers, by abstracting the underlying cache infrastructure and cluster design. ElastiCache manages hardware provisioning, monitoring, node replacements, and software patching automatically and transparently, so that you can focus on application development, rather than operating the cache. 

ElastiCache Serverless is compatible with Valkey 7.2, Memcached 1.6.22 and above, and Redis OSS 7.1 and above.

## Creating a node-based cluster
<a name="WhatIs.Overview.cluster"></a>

If you need fine-grained control over your ElastiCache cluster, you can choose to create a node-based Valkey, Memcached, or Redis OSS cluster. ElastiCache enables you to create a node-based cluster by choosing the node-type, number of nodes, and node placement across AWS Availability Zones for your cluster. Since ElastiCache is a fully-managed service, it automatically manages hardware provisioning, monitoring, node replacements, and software patching for your cluster. 

Creating a node-based cluster offers greater flexibility and control over your clusters. For example, you can choose to operate a cluster with single-AZ availability or multi-AZ availability depending on your needs. You can also choose to run Valkey, Memcached, or Redis OSS in cluster mode enabling horizontal scaling, or without cluster mode for just scaling vertically. When creating a node-based cluster, you are responsible for choosing the type and number of nodes correctly to ensure that your cache has enough capacity as required by your application. You can also choose when to apply new software patches to your Valkey or Redis OSS cluster. 

When creating a node-based cluster you can choose from multiple supported versions of Valkey, Memcached and Redis OSS. For more information about supported engine versions see [Engine versions and upgrading in ElastiCache](engine-versions.md).