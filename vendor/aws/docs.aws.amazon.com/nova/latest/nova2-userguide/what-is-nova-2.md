

# What is Amazon Nova 2?
<a name="what-is-nova-2"></a>

Amazon Nova provides multimodal foundation models that process text, images, video, documents and speech. With support for up to 1 million tokens of context and advanced reasoning capabilities, Amazon Nova 2 models enable you to build sophisticated AI applications that understand complex inputs and generate accurate responses.

You can build interactive chatbots, analyze documents and videos, create AI agents with extended reasoning and develop voice-enabled applications.

## Key concepts
<a name="key-concepts"></a>

Before you learn about Amazon Nova models, familiarize yourself with the following core concepts:

**Foundation models**  
Pre-trained AI systems available in different sizes and capabilities that you access through an API.

**Inference**  
The process of sending a request to a model and receiving a generated response.

**Reasoning**  
Extended thinking capability that allows models to break down complex problems and show their step-by-step analysis before providing answers.

**Multimodal**  
The ability to process and understand multiple input types together: text, images, video and documents in a single request.

**RAG (Retrieval-Augmented Generation)**  
A technique that combines model responses with your own data sources to provide more accurate, contextual answers.

## Amazon Nova models
<a name="model-families"></a>

Amazon Nova 2 includes the following models, each optimized for different use cases:


| Model | Input modalities | Output modalities | Use cases | 
| --- |--- |--- |--- |
| Nova 2 Lite | Text, images, video, documents | Text | High-volume applications prioritizing speed and cost efficiency | 
| Nova 2 Sonic | Speech, text | Speech, text | Voice-enabled applications with fast response times | 
| Nova Multimodal Embeddings | Text, images, documents, video, audio | Embeddings | Semantic search, recommendation systems and similarity matching | 

All models support up to 1 million tokens of context and can generate up to 65,536 tokens in a single response. Models with reasoning capabilities can perform extended thinking to solve complex problems step by step.

## What can you build?
<a name="what-can-you-build"></a>

The following are examples of what you can build with Amazon Nova:
+ **Intelligent document assistant** - Process large documents with up to 1 million tokens of context to answer questions and extract insights (with RAG)
+ **Complex reasoning applications** - Solve multi-step problems with extended thinking that shows the model's step-by-step analysis (or with reasoning)
+ **Video analysis pipeline** - Extract insights, generate summaries and identify key moments in video content at scale (Nova 2 Lite)
+ **Voice-enabled AI agent** - Build conversational agents that understand speech input and respond with natural language (Nova 2 Sonic)

## Benefits
<a name="benefits"></a>

Amazon Nova provides the following benefits:

**Multimodal understanding**  
Process text, images, video, documents and speech in a single request. Amazon Nova models understand relationships across different input types.

**Extended context**  
Support for up to 1 million tokens allows you to process entire codebases, lengthy documents, or extended conversations without losing context.

**Advanced reasoning**  
Models with reasoning capabilities break down complex problems and show step-by-step analysis, improving accuracy for multi-step tasks.

**Flexible deployment**  
Access models through Amazon Bedrock with no infrastructure to manage, or customize models through fine-tuning and reinforcement learning.

**Built-in tools**  
Use web grounding to access real-time information and code interpreter to execute Python code without external integrations.

## How Amazon Nova works
<a name="how-it-works"></a>

Amazon Nova models are foundation models that you access through Amazon Bedrock. The basic workflow is:

1. Your application sends a request to Amazon Bedrock with your input and configuration parameters.

1. The Amazon Nova model processes your input, applying reasoning if configured.

1. The model generates a response and returns it to your application.

You can enhance responses by using RAG to incorporate your data, enabling built-in tools, or customizing models through fine-tuning.

## Pricing
<a name="pricing"></a>

Amazon Nova pricing is based on input and output tokens processed. Different models have different pricing tiers:
+ Nova 2 Lite - Optimized for cost-effective, high-volume processing
+ Nova 2 Sonic - Balanced pricing for voice-enabled applications

For current pricing information, see [Amazon Bedrock Pricing](https://aws.amazon.com/bedrock/pricing/).

## Next steps
<a name="next-steps"></a>
+ To learn about new features in Amazon Nova 2, see [What's new in Amazon Nova 2](whats-new.md).
+ To start using Amazon Nova, see [Getting started with Amazon Nova 2](getting-started-nova-2.md).
+ To learn about core inference capabilities, see [Core inference](core-inference.md).
+ To customize models for your use case, see [Customizing Amazon Nova models on SageMaker AI](nova-model.md).