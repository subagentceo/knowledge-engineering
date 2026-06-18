

# What is Amazon EventBridge Scheduler?
<a name="what-is-scheduler"></a>

 Amazon EventBridge Scheduler is a serverless scheduler that allows you to create, run, and manage tasks from one central, managed service. Highly scalable, EventBridge Scheduler allows you to schedule millions of tasks that can invoke more than 270 AWS services and over 6,000 API operations. Without the need to provision and manage infrastructure, or integrate with multiple services, EventBridge Scheduler provides you with the ability to deliver schedules at scale and reduce maintenance costs. 

 EventBridge Scheduler delivers your tasks reliably, with built-in mechanisms that adjust your schedules based on the availability of downstream targets. With EventBridge Scheduler, you can create schedules using cron and rate expressions for recurring patterns, or configure one-time invocations. You can set up flexible time windows for delivery, define retry limits, and set the maximum retention time for failed triggers. 

**Topics**
+ [Key features of EventBridge Scheduler](#servicename-feature-overview)
+ [Accessing EventBridge Scheduler](#acessing-servicename)

## Key features of EventBridge Scheduler
<a name="servicename-feature-overview"></a>

 EventBridge Scheduler offers the following key features that you can use to configure targets and scale your schedules. 
+  **Templated targets** – EventBridge Scheduler supports templated targets to perform common API operations using Amazon SQS, Amazon SNS, Lambda, and EventBridge. With predefined targets, you can configure your schedules quickly using the EventBridge Scheduler console, the EventBridge Scheduler SDK, or the AWS CLI. 
+  **Universal targets** – EventBridge Scheduler provides a universal target parameter (UTP) that you can use to create customized triggers that target more than 270 AWS services and over 6,000 API operations on a schedule. With UTP, you can configure your customized triggers using the EventBridge Scheduler console, the EventBridge Scheduler SDK, or the AWS CLI. 
+  **Flexible time windows** – EventBridge Scheduler supports flexible time windows, allowing you to disperse your schedules and improve the reliability of your triggers for use cases that do not require precise scheduled invocation of targets. 
+  **Retries** – EventBridge Scheduler provides at-least-once event delivery to targets, meaning that at least one delivery succeeds with a response from the target. EventBridge Scheduler allows you to set the number of retries for your schedule for a failed task. EventBridge Scheduler retries failed tasks with delayed attempts to improve the reliability of your schedule and ensure targets are available. 

## Accessing EventBridge Scheduler
<a name="acessing-servicename"></a>

You can use EventBridge Scheduler via the EventBridge console, the EventBridge Scheduler SDK, the AWS CLI, or by directly using the EventBridge Scheduler API.