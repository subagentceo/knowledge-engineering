

# What is Amazon Simple Workflow Service?
<a name="welcome"></a>

With Amazon Simple Workflow Service (Amazon SWF) you can build, run, and scale background jobs that have parallel or sequential steps. You can coordinate work across distributed components and track the state of tasks.

 In Amazon SWF, a *task* represents a logical unit of work that is performed by a component of your application. Coordinating tasks across includes managing inter-task dependencies, scheduling, and concurrency in the flow of your application. With Amazon SWF, you can control and coordinate tasks without worrying about underlying complexities, such as tracking progress and maintaining task state.

When using Amazon SWF, you implement *workers* to perform tasks. Workers can run either on cloud infrastructure, such as Amazon Elastic Compute Cloud (Amazon EC2), or on your own premises. You can create tasks that are long-running, or that may fail, time out, or require restarts—or that may complete with varying throughput and latency. Amazon SWF stores tasks and assigns them to workers when they are ready, tracks progress, and maintains state, including details of task completion. 

To coordinate tasks, you write a program that gets the latest task state from Amazon SWF and uses that state to initiate subsequent tasks. Amazon SWF maintains an application's execution state durably, so your application is resilient to individual component failures. With Amazon SWF, you can build, deploy, scale, and modify application components independently.

**Other AWS workflow services**  
For most use cases, we recommend considering AWS Step Functions for your workflow and orchestration needs.  
With Step Functions, you can create workflows, also called *state machines*, to build distributed applications, automate processes, orchestrate microservices, and create data and machine learning pipelines. In the Step Functions' console or AWS toolkit in VS Code, you can use the graphical Workflow Studio to visualize, edit, test, and debug your application’s workflow.   
For more technical information, see the [AWS Step Functions Developer Guide](https://docs.aws.amazon.com/step-functions/latest/dg/). 