

# What is Amazon Transcribe?
<a name="what-is"></a>

Amazon Transcribe is an automatic speech recognition service that uses machine learning models to convert audio to text. You can use Amazon Transcribe as a standalone transcription service or to add speech-to-text capabilities to any application.

With Amazon Transcribe, you can improve accuracy for your specific use case with language customization, filter content to ensure customer privacy or audience-appropriate language, analyze content in multi-channel audio, partition the speech of individual speakers, and more.

You can transcribe media in real time (streaming) or you can transcribe media files located in an Amazon S3 bucket (batch). To see which languages are supported for each type of transcription, refer to the [Supported languages and language-specific features](supported-languages.md) table.

**Topics**
+ [Amazon Transcribe and HIPAA eligibility](#transcribe-hippa)
+ [Pricing](#transcribe-pricing)
+ [Region availability and quotas](#tsc-regions)

For a short video tour of Amazon Transcribe, see:

[![AWS Videos](http://img.youtube.com/vi/zD8NMw4T1TI/0.jpg)](http://www.youtube.com/watch?v=zD8NMw4T1TI)


To learn more, see [How Amazon Transcribe works](how-it-works.md) and [Getting started with Amazon Transcribe](getting-started.md).

**Tip**  
Information on the **Amazon Transcribe API** is located in the [API Reference](https://docs.aws.amazon.com/transcribe/latest/APIReference/Welcome.html).

## Amazon Transcribe and HIPAA eligibility
<a name="transcribe-hippa"></a>

Amazon Transcribe is covered under AWS’s HIPAA eligibility and BAA which requires BAA customers to encrypt all PHI at rest and in transit when in use. Automatic PHI identification is available at no additional charge and in all regions where Amazon Transcribe operates. For more information, refer to [ HIPAA eligibility and BAA](https://aws.amazon.com/compliance/hipaa-compliance/).

## Pricing
<a name="transcribe-pricing"></a>

Amazon Transcribe is a pay-as-you-go service; pricing is based on seconds of transcribed audio, billed on a monthly basis.

Usage is billed in one-second increments, with a minimum per request charge of 15 seconds. Note that additional charges apply for features such as PII content redaction and custom language models.

For cost information for each AWS Region, refer to [Amazon Transcribe Pricing](https://aws.amazon.com/transcribe/pricing/).

## Region availability and quotas
<a name="tsc-regions"></a>

Amazon Transcribe is supported in the following AWS Regions:


| **Region** | **Transcription type** | 
| --- | --- | 
| af-south-1 (Cape Town) | batch, streaming | 
| ap-east-1 (Hong Kong) | batch | 
| ap-northeast-1 (Tokyo) | batch, streaming | 
| ap-northeast-2 (Seoul) | batch, streaming | 
| ap-south-1 (Mumbai) | batch, streaming | 
| ap-southeast-1 (Singapore) | batch, streaming | 
| ap-southeast-2 (Sydney) | batch, streaming | 
| ap-southeast-5 (Malaysia) | streaming | 
| ap-southeast-7 (Thailand) | streaming | 
| ca-central-1 (Canada, Central) | batch, streaming | 
| eu-central-1 (Frankfurt) | batch, streaming | 
| eu-central-2 (Zurich) | batch, streaming | 
| eu-north-1 (Stockholm) | batch | 
| eu-west-1 (Ireland) | batch, streaming | 
| eu-west-2 (London) | batch, streaming | 
| eu-west-3 (Paris) | batch | 
| me-south-1 (Bahrain) | batch | 
| mx-central-1 (Mexico) | streaming | 
| sa-east-1 (São Paulo) | batch, streaming | 
| us-east-1 (N. Virginia) | batch, streaming | 
| us-east-2 (Ohio) | batch, streaming | 
| us-gov-east-1 (GovCloud, US-East) | batch, streaming | 
| us-gov-west-1 (GovCloud, US-West) | batch, streaming | 
| us-west-1 (San Francisco) | batch | 
| us-west-2 (Oregon) | batch, streaming | 

**Important**  
Region support differs for Amazon Transcribe, [Amazon Transcribe Medical](transcribe-medical.md#med-regions), and [Call Analytics](call-analytics.md#tca-regions).

To get the endpoints for each supported Region, see [Service endpoints](https://docs.aws.amazon.com/general/latest/gr/transcribe.html#transcribe_region) in the *AWS General Reference*.

For a list of quotas that pertain to your transcriptions, refer to the [Service quotas](https://docs.aws.amazon.com/general/latest/gr/transcribe.html#limits-amazon-transcribe) in the *AWS General Reference*. Some quotas can be changed upon request. If the **Adjustable** column contains '**Yes**', you can request an increase. To do so, select the provided link.