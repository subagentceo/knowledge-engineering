

# What is AWS Deep Learning AMIs?
<a name="what-is-dlami"></a>

AWS Deep Learning AMIs (DLAMI) provides customized machine images that you can use for deep learning in the cloud. The DLAMIs are available in most AWS Regions for a variety of Amazon Elastic Compute Cloud (Amazon EC2) instance types, from a small CPU-only instance to the latest high-powered multi-GPU instances. The DLAMIs come preconfigured with [NVIDIA CUDA](https://developer.nvidia.com/cuda-zone) and [NVIDIA cuDNN](https://developer.nvidia.com/cudnn) and the latest releases of the most popular deep learning frameworks.

## About this guide
<a name="guide-contents"></a>

The content in the can help you launch and use the DLAMIs. The guide covers several common deep learning use cases, for both training and inference. It also covers how to choose the right AMI for your purpose and the kind of instances that you might prefer.

Additionally, the DLAMIs include several tutorials that their supported frameworks provide. This guide can show you how to activate each framework and find the appropriate tutorials to get started. It also has tutorials on distributed training, debugging, using AWS Inferentia and AWS Trainium, and other key concepts. For instructions on how to set up a Jupyter notebook server to run the tutorials in your browser, see [Setting up a Jupyter Notebook server on a DLAMI instance](setup-jupyter.md).

## Prerequisites
<a name="prerequisites"></a>

To successfully run the DLAMIs, we recommend that you be familiar with command line tools and basic Python.