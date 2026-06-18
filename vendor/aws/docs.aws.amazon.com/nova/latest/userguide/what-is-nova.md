

# What is Amazon Nova?
<a name="what-is-nova"></a>

**Note**  
This documentation is for Amazon Nova Version 1. Amazon Nova 2 is now available with new models and enhanced capabilities. New features and documentation updates are published in the Amazon Nova 2 User Guide. For information about what's new in Amazon Nova 2, visit [What's new in Amazon Nova 2](https://docs.aws.amazon.com/nova/latest/nova2-userguide/whats-new.html).

Amazon Nova foundation models deliver frontier intelligence and industry-leading price-performance. Organizations can build and scale generative AI applications with Amazon Nova that are safe, reliable, and cost-effective. Amazon Nova accelerates AI innovation across modalities and use cases - including text, image, video, speech, API calling, and agentic AI. To start building with Amazon Nova, you must access the models through an API using Amazon Bedrock.

## Amazon Nova model categories
<a name="nova-model-categories"></a>

Amazon Nova delivers powerful foundation models across three categories: understanding, creative, and speech capabilities.


| Model | Category | Description | Use cases | Regions | 
| --- |--- |--- |--- |--- |
| Amazon Nova Premier | Understanding | Most capable multimodal model for complex tasks and best teacher for distilling custom models for cost-effective applications. Comprehends diverse inputs including text, images, video, documents, and code. | Interactive chat interfaces, Retrieval-Augmented Generation (RAG) systems, agentic applications, video analysis, UI workflow automation | US East (N. Virginia)1, AWS GovCloud (US-West) | 
| Amazon Nova Pro | Understanding | Highly capable multimodal model with best combination of accuracy, speed, and cost for a wide range of tasks. Comprehends diverse inputs including text, images, video, documents, and code. | Interactive chat interfaces, Retrieval-Augmented Generation (RAG) systems, agentic applications, video analysis, UI workflow automation | US East (N. Virginia)1, Asia Pacific (Sydney)1, Europe (London)1, AWS GovCloud (US-West) | 
| Amazon Nova Lite | Understanding | Very low cost multimodal model with lightning fast processing for image, video, and text inputs. Comprehends diverse inputs including text, images, video, documents, and code. | Interactive chat interfaces, Retrieval-Augmented Generation (RAG) systems, agentic applications, video analysis, UI workflow automation | US East (N. Virginia)1, Asia Pacific (Sydney)1, Europe (London)1, AWS GovCloud (US-West) | 
| Amazon Nova Micro | Understanding | Text-only model that delivers the lowest latency responses at very low cost. | Interactive chat interfaces, Retrieval-Augmented Generation (RAG) systems, agentic applications | US East (N. Virginia)1, Asia Pacific (Sydney)1, Europe (London)1, AWS GovCloud (US-West) | 
| Amazon Nova Canvas | Creative | High-quality image generation model with customization and control. Transforms text and image inputs into professional-grade images. | Media, entertainment, retail, marketing, advertising, customizable visual content generation | US East (N. Virginia), Europe (Ireland), and Asia Pacific (Tokyo) | 
| Amazon Nova Reel | Creative | Video generation model designed to democratize creative content generation. Transforms text and image inputs into professional-grade videos. | Media, entertainment, retail, marketing, advertising, customizable visual content generation | US East (N. Virginia), Europe (Ireland), and Asia Pacific (Tokyo) | 
| Amazon Nova Sonic | Speech | Foundation model for conversational speech understanding and generation in five languages (English (US, UK), French, Italian, German, and Spanish). Accepts speech as input and provides speech with text transcriptions as output. Features bidirectional streaming API capabilities for real-time, low-latency multi-turn conversations. | Virtual assistants, customer service solutions, interactive voice experiences, real-time voice interactions | US East (N. Virginia), Europe (Stockholm), and Asia Pacific (Tokyo) | 

*1You can access this model in additional regions through cross-region inference: US East (Ohio), US West (Oregon), Europe (Stockholm), Europe (Ireland), Europe (Frankfurt), Europe (Paris), Asia Pacific (Tokyo), Asia Pacific (Singapore), Asia Pacific (Sydney), Asia Pacific (Seoul), and Asia Pacific (Mumbai). To learn more, see [Improve resilience with cross-region inference](https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html).*

For full model and region support information in Amazon Bedrock, see [Supported foundation models in Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html).

## Model specifications
<a name="model-specifications"></a>

The following tables provide detailed specifications for each Amazon Nova model family.

### Understanding model specifications
<a name="understanding-model-specs"></a>


|  | Amazon Nova Premier | Amazon Nova Pro | Amazon Nova Lite | Amazon Nova Micro | 
| --- |--- |--- |--- |--- |
| Model ID | amazon.nova-premier-v1:0 | amazon.nova-pro-v1:0 | amazon.nova-lite-v1:0 | amazon.nova-micro-v1:0 | 
| Inference Profile ID | us.amazon.nova-premier-v1:0 | us.amazon.nova-pro-v1:0 | us.amazon.nova-lite-v1:0 | us.amazon.nova-micro-v1:0 | 
| Input modalities | Text, Image, Video | Text, Image, Video | Text, Image, Video | Text | 
| Output Modalities | Text | Text | Text | Text | 
| Context Window | 1M | 300k | 300k | 128k | 
| Max Output Tokens | 10K | 10k | 10k | 10k | 
| Supported Languages | 200\+1 | 200\+1 | 200\+1 | 200\+1 | 
| Regions | US East (N. Virginia)2 | US East (N. Virginia)2, Asia Pacific (Tokyo)2, Asia Pacific (Sydney)2, Europe (London)2, AWS GovCloud (US-West) | US East (N. Virginia)2, Asia Pacific (Tokyo)2, Asia Pacific (Sydney)2, Europe (London)2, AWS GovCloud (US-West) | US East (N. Virginia)2, Asia Pacific (Tokyo)2, Asia Pacific (Sydney)2, Europe (London)2, AWS GovCloud (US-West) | 
| Document Support | PDF, CSV, DOC, DOCX, XLS, XLSX, HTML, TXT, MD | PDF, CSV, DOC, DOCX, XLS, XLSX, HTML, TXT, MD | PDF, CSV, DOC, DOCX, XLS, XLSX, HTML, TXT, MD | No | 
| Converse API | Yes | Yes | Yes | Yes | 
| InvokeAPI | Yes | Yes | Yes | Yes | 
| Streaming | Yes | Yes | Yes | Yes | 
| Batch Inference | Yes | Yes | Yes | Yes | 
| Fine Tuning | No | Yes | Yes | Yes | 
| Provisioned Throughput | No | Yes | Yes | Yes | 
| Bedrock Knowledge Bases | Yes | Yes | Yes | Yes | 
| Bedrock Agents | Yes | Yes | Yes | Yes | 
| Bedrock Guardrails | Yes (text only) | Yes (text only) | Yes (text only) | Yes | 
| Bedrock Evaluations | Yes (text only) | Yes (text only) | Yes (text only) | Yes | 
| Bedrock Prompt flows | Yes | Yes | Yes | Yes | 
| Bedrock Studio | Yes | Yes | Yes | Yes | 
| Bedrock Model Distillation | *Teacher to*: Pro, Lite, and Micro | *Teacher to*: Lite and Micro<br />*Student of*: Premier | *Student of*: Premier and Pro | *Student of*: Premier and Pro | 

*1Optimized for these 15 languages: English, German, Spanish, French, Italian, Japanese, Korean, Arabic, Simplified Chinese, Russian, Hindi, Portuguese, Dutch, Turkish, and Hebrew.*

*2You can access this model in the US East (Ohio), US West (Oregon), Europe (Stockholm), Europe (Ireland), Europe (Frankfurt), Europe (Paris), Asia Pacific (Tokyo), Asia Pacific (Singapore), Asia Pacific (Sydney), Asia Pacific (Seoul), and Asia Pacific (Mumbai) regions through cross-region inference. Cross-region inference allows you to seamlessly manage unplanned traffic bursts by utilizing compute across different AWS Regions. With cross-region inference, you can distribute traffic across multiple AWS Regions. To learn more about cross-region inference, see [Supported Regions and models for inference profiles](https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-support.html) and [Improve resilience with cross-region inference](https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html) in the Amazon Bedrock User Guide.*

### Creative and speech model specifications
<a name="creative-speech-model-specs"></a>


|  | Amazon Nova Canvas | Amazon Nova Reel | Amazon Nova Sonic | 
| --- |--- |--- |--- |
| Model ID | amazon.nova-canvas-v1:0 | amazon.nova-reel-v1:1 | amazon.nova-sonic-v1:0 | 
| Input Modalities | Text, Image | Text, Image | Speech | 
| Output Modalities | Image | Video | Speech with transcription and text responses | 
| Max Prompt Length | 1024 characters |  |  | 
| Input Context Window |  | 512 characters | 300K context | 
| Output Resolution (generation tasks) | 4.19 million pixels (that is, 2048x2048, 2816x1536) | 1280x720, 24 frames per second |  | 
| Max Output Resolution (editing tasks) | Must meet all of the following:  4096 pixels on its longest side   Aspect ratio between 1:4 and 4:1   Total pixel count of 4.19 million or smaller   |  |  | 
| Max Connection Duration |  |  | 8 minutes connection timeout, with max 20 concurrent connections per customer.1 | 
| Supported Input Types | PNG, JPEG | PNG, JPEG |  | 
| Supported Languages | English | English | English (US, UK), French, Italian, German, and Spanish2 | 
| Regions | US East (N. Virginia), Europe (Ireland), and Asia Pacific (Tokyo) | US East (N. Virginia), Europe (Ireland), and Asia Pacific (Tokyo) | US East (N. Virginia), Europe (Stockholm), and Asia Pacific (Tokyo) | 
| Asynchronous Invoke Model API | No | Yes |  | 
| Invoke Model API | Yes | No |  | 
| Bidirectional Stream API Support |  |  | Yes | 
| Bedrock Knowledge Bases |  |  | Supported through tool use (function calling) | 

*1By default, the connection limit is 8 minutes, however you can renew the connection and continue the conversation by providing the previous conversation's history.*

*2For a list of supported voices, see [Voices available for Amazon Nova Sonic](https://docs.aws.amazon.com/nova/latest/userguide/available-voices.html).*