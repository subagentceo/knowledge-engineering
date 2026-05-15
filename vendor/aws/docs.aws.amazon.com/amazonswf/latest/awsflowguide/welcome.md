

# What is the AWS Flow Framework for Java?
<a name="welcome"></a>

With the AWS Flow Framework, you can focus on implementing your workflow logic. Behind the scenes, the framework uses the scheduling, routing, and state management capabilities of Amazon SWF to manage your workflow's execution and make it scalable, reliable, and auditable. AWS Flow Framework-based workflows are highly concurrent. The workflows can be distributed across multiple components, which can run as separate processes on separate computers and be scaled independently. The application can continue to progress if any of its components are running, making it highly fault tolerant.

## What's in this Guide?
<a name="guide-to-guide"></a>

This guide has information about how to install, set up, and use the AWS Flow Framework to build Amazon SWF applications.

[Getting Started with the AWS Flow Framework for Java](getting-started.md)  
If you are just starting out with the AWS Flow Framework for Java, read the [Getting Started with the AWS Flow Framework for Java](getting-started.md) section. It will guide you through downloading and installing the AWS Flow Framework for Java, how to set up your development environment, and lead you through a simple example of creating a workflow.

[Understanding AWS Flow Framework for Java](concepts.md)  
Introduces basic Amazon SWF and AWS Flow Framework concepts, describing the basic structure of a AWS Flow Framework application and how data is exchanged between parts of a distributed workflow.

[AWS Flow Framework for Java Programming Guide](features.md)  
This chapter provides basic programming guidance for developing workflow applications with the AWS Flow Framework for Java, including how to register activity and workflow types, implement workflow clients, create child workflows, handle errors, and more.

[Understanding a Task in AWS Flow Framework for Java](details.md)  
This chapter provides a more in-depth look at the way the AWS Flow Framework for Java works, providing you with additional information about the order of execution of asynchronous workflows and a logical step-through of a standard workflow execution.

[Troubleshooting and debugging tips for AWS Flow Framework for Java](troubleshooting.md)  
This chapter provides information about common errors that you can use to troubleshoot your workflows, or that you can use to learn to *avoid common errors*.

[AWS Flow Framework for Java Reference](reference.md)  
This chapter is a reference to the Annotations, Exceptions and Packages that the AWS Flow Framework for Java adds to the SDK for Java.