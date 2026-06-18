

# Welcome
<a name="Welcome"></a>

This guide provides detailed information on the Amazon Transcribe API, including operations, request and response syntax, data types, and error codes. For more information about Amazon Transcribe, refer to the [Amazon Transcribe Developer Guide](https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html).

The Amazon Transcribe API reference is separated into the following sections:
+ [Actions](API_Operations.md)
+ [Data Types](API_Types.md)
+ [Common Error Types](CommonErrors.md)
+ [Common Parameters](CommonParameters.md)

If you're transcribing a media file located in an Amazon S3 bucket, you're performing a *batch transcription* and must use the operations and data types listed in the **Amazon Transcribe Service** section.

If you're transcribing a real-time media stream, you're performing a *streaming transcription* and must use the operations and data types listed in the **Amazon Transcribe Streaming Service** section.

Amazon Transcribe supports the following SDKs:


| Batch transcriptions | Streaming transcriptions | 
| --- | --- | 
| [AWS Command Line Interface (CLI)](https://docs.aws.amazon.com/cli/latest/reference/transcribe/index.html#cli-aws-transcribe) | The CLI is not supported for streaming. | 
| [C\+\+](https://sdk.amazonaws.com/cpp/api/LATEST/namespace_aws_1_1_transcribe_service.html) | [C\+\+](https://github.com/aws/aws-sdk-cpp/tree/master/aws-cpp-sdk-transcribestreaming) | 
| [Go](https://docs.aws.amazon.com/sdk-for-go/api/service/transcribeservice/) | [Go](https://docs.aws.amazon.com/sdk-for-go/api/service/transcribestreamingservice/) | 
| [Java V2](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/services/transcribe/TranscribeClient.html) | [Java V2](https://github.com/aws/aws-sdk-java-v2/tree/master/services/transcribestreaming) | 
| [JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/TranscribeService.html) | [JavaScript V3](https://github.com/aws/aws-sdk-js-v3/tree/master/clients/client-transcribe-streaming) | 
| [PHP V3](https://docs.aws.amazon.com/aws-sdk-php/v3/api/namespace-Aws.TranscribeService.html) | [PHP V3](https://github.com/aws/aws-sdk-php/releases/tag/3.172.4) | 
| [Python Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/transcribe.html) | [Python Streaming SDK for Amazon Transcribe](https://github.com/awslabs/amazon-transcribe-streaming-sdk) | 
| [Ruby V3](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/TranscribeService.html) | [Ruby V3](https://github.com/aws/aws-sdk-ruby/tree/version-3/gems/aws-sdk-transcribestreamingservice) | 
| [.NET](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/TranscribeService/NTranscribeService.html) | .NET is not supported for streaming. | 

All operations and actions listed in this guide function equally across all supported SDKs.

## Amazon Transcribe Service
<a name="Welcome_Amazon_Transcribe_Service"></a>

Amazon Transcribe offers three main types of batch transcription: **Standard**, **Medical**, and **Call Analytics**.
+  **Standard transcriptions** are the most common option. Refer to [StartTranscriptionJob](API_StartTranscriptionJob.md) for details.
+  **Medical transcriptions** are tailored to medical professionals and incorporate medical terms. A common use case for this service is transcribing doctor-patient dialogue into after-visit notes. Refer to [StartMedicalTranscriptionJob](API_StartMedicalTranscriptionJob.md) for details.
+  **Call Analytics transcriptions** are designed for use with call center audio on two different channels; if you're looking for insight into customer service calls, use this option. Refer to [StartCallAnalyticsJob](API_StartCallAnalyticsJob.md) for details.

## Amazon Transcribe Streaming Service
<a name="Welcome_Amazon_Transcribe_Streaming_Service"></a>

Amazon Transcribe streaming offers four main types of real-time transcription: **Standard**, **Medical**, **Call Analytics**, and **Health Scribe**.
+  **Standard transcriptions** are the most common option. Refer to [StartStreamTranscription](API_streaming_StartStreamTranscription.md) for details.
+  **Medical transcriptions** are tailored to medical professionals and incorporate medical terms. A common use case for this service is transcribing doctor-patient dialogue in real time, so doctors can focus on their patient instead of taking notes. Refer to [StartMedicalStreamTranscription](API_streaming_StartMedicalStreamTranscription.md) for details.
+  **Call Analytics transcriptions** are designed for use with call center audio on two different channels; if you're looking for insight into customer service calls, use this option. Refer to [StartCallAnalyticsStreamTranscription](API_streaming_StartCallAnalyticsStreamTranscription.md) for details.
+  **HealthScribe transcriptions** are designed to automatically create clinical notes from patient-clinician conversations using generative AI. Refer to [here] for details.