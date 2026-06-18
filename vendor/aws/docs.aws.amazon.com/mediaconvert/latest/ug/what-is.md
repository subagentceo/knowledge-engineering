

# What is AWS Elemental MediaConvert?
<a name="what-is"></a>

AWS Elemental MediaConvert is a file-based video processing service that provides scalable video processing for content owners and distributors with media libraries of any size. MediaConvert offers advanced features that enable premium content experiences, including:
+ Professional broadcast codecs that support increased bit depth and HDR content creation
+ Still graphic overlays
+ Advanced audio
+ Digital rights management (DRM)
+ Closed captioning support

MediaConvert offers support for various input formats and adaptive bitrate (ABR) packaging output formats for delivering high-quality content from a range of sources onto primary and multiscreen devices.

For simple use cases, you can set up a MediaConvert transcoding job in a few steps. For instructions, see [Getting started with MediaConvert](getting-started.md). 

 MediaConvert has the following components:

**Jobs**  
A *job* does the work of transcoding. Each job converts an input file into an output file or files. Inputs and outputs can contain one or more of video, audio, and captions, either together or in separate files. Before you begin creating jobs, make sure that you know what your input files are and what they contain. Also make sure that you know what files you would like to create as outputs and what format you would like them in.   
When you create a job, you specify the name of the file that you want to transcode, the names that you want MediaConvert to give to the finished output files, and several other settings. For more information, see [Working with jobs](working-with-jobs.md).

**Presets**  
 A *preset* is a saved group of encoding settings for a single output. You can create many common outputs by simply selecting a system preset. You can also create your own custom presets, either by duplicating and modifying an existing preset or by creating one from scratch.  
When you create a job, you can specify a preset that you want to use, or you can individually specify your encoding settings. For more information, see [Working with output presets](working-with-presets.md).

**Job templates**  
A *job template * specifies all the settings for a complete job, except for your IAM role and those settings that are likely to change for each job, such as the input file location and name, and user metadata that you might tag the job with. You create a job template by specifying all input settings other than input location and file name, and then specifying all the outputs that the job will generate. You can specify the settings for each output by choosing a preset for the output or by specifying each output setting individually. For more information, see [Working with job templates](working-with-job-templates.md).

**Queues**  
Use *queues* to manage the resources that are available to your account for parallel processing of jobs. For more information, see [Working with queues in AWS Elemental MediaConvert](working-with-queues.md). 