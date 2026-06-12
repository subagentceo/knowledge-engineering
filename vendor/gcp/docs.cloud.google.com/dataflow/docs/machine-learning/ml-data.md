# Dataflow ML in ML workflows

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   Cloud Dataflow
*   Dataflow ML

Send feedback

# Dataflow ML in ML workflows Stay organized with collections Save and categorize content based on your preferences.

To orchestrate complex machine learning workflows, you can create frameworks that include data pre- and post-processing steps. You might need to pre-process data before you can use it to train your model or to post-process data to transform the output of your model.

ML workflows often contain many steps that together form a pipeline. To build your machine learning pipeline, you can use one of the following methods.

*   Use an orchestration framework that has a built-in integration with Apache Beam and the Dataflow runner, such as TensorFlow Extended (TFX) or Kubeflow Pipelines (KFP). This option is the least complex.
*   Build a custom component in a Dataflow template and then call the template from your ML pipeline. The call contains your Apache Beam code.
*   Build a custom component to use in your ML pipeline and put the Python code directly in the component. You define a custom Apache Beam pipeline and use the Dataflow runner within the custom component. This option is the most complex and requires you to manage pipeline dependencies.

After you create your machine learning pipeline, you can use an orchestrator to chain together the components to create an end-to-end machine learning workflow. To orchestrate the components, you can use a managed service, such as Gemini Enterprise Agent Platform Pipelines.

## Use ML accelerators

For machine learning workflows that involve computationally intensive data processing, such as inference with large models, you can use accelerators with Dataflow workers. Dataflow supports using both GPUs and TPUs.

### GPUs

You can use NVIDIA GPUs with Dataflow jobs to accelerate processing. Dataflow supports various NVIDIA GPU types, including the T4, L4, A100, H100, and V100. To use GPUs, you need to configure your pipeline with a custom container image that has the necessary GPU drivers and libraries installed.

For detailed information on using GPUs with Dataflow, see Dataflow support for GPUs.

### TPUs

Dataflow also supports Cloud TPUs, which are Google's custom-designed AI accelerators optimized for large AI models. TPUs can be a good choice for accelerating inference workloads on frameworks like PyTorch, JAX, and TensorFlow. Dataflow supports single-host TPU configurations, where each worker manages one or more TPU devices.

For more information, see Dataflow support for TPUs.

## Workflow orchestration

Workflow orchestration use cases are described in the following sections.

*   I want to use Dataflow with Gemini Enterprise Agent Platform Pipelines
*   I want to use Dataflow with KFP
*   I want to use Dataflow with TFX

Both TFX and Kubeflow Pipelines (KFP) use Apache Beam components.

### I want to use Dataflow with Agent Platform Pipelines

Agent Platform Pipelines help you to automate, monitor, and govern your ML systems by orchestrating your ML workflows in a serverless manner. You can use Agent Platform Pipelines to orchestrate workflow directed acyclic graphs (DAGs) defined by either TFX or KFP and to automatically track your ML artifacts using Vertex ML Metadata. To learn how to incorporate Dataflow with TFX and KFP, use the information in the following sections.

*   Kubeflow Pipelines
*   TFX pipeline

### I want to use Dataflow with Kubeflow Pipelines

Kubeflow is an ML toolkit dedicated to making deployments of ML workflows on Kubernetes easier to use, portable, and scalable. Kubeflow Pipelines are reusable end-to-end ML workflows built using the Kubeflow Pipelines SDK.

The Kubeflow Pipelines SDK aims to provide end-to-end orchestration and to facilitate experimentation and reuse. With KFP, you can experiment with orchestration techniques and manage your tests, and you can reuse components and pipelines to create multiple end-to-end solutions without starting over each time.

When using Dataflow with KFP, you can use the `DataflowPythonJobOP` operator or the `DataflowFlexTemplateJobOp` operator. You can also build a fully custom component. We recommend using the `DataflowPythonJobOP` operator.

If you want to build a fully custom component, see the Dataflow components page in the Gemini Enterprise Agent Platform documentation.

### I want to use Dataflow with TFX

TFX pipeline components are built on TFX libraries, and the data processing libraries use Apache Beam directly. For example, TensorFlow Transform translates the user's calls to Apache Beam. Therefore, you can use Apache Beam and Dataflow with TFX pipelines without needing to do extra configuration work. To use TFX with Dataflow, when you build your TFX pipeline, use the Dataflow runner. For more information, see the following resources:

*   Apache Beam and TFX
*   TensorFlow Extended (TFX): Using Apache Beam for large scale data processing

Send feedback