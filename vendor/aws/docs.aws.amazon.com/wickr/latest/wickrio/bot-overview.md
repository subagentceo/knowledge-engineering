

This guide provides documentation for Wickr IO Integrations. If you're using AWS Wickr, see [AWS Wickr Administration Guide](https://docs.aws.amazon.com/wickr/latest/adminguide/what-is-wickr.html).

# What are AWS Wickr bots?
<a name="bot-overview"></a>

AWS Wickr bots are powerful tools that enable external services and workflows to communicate seamlessly with AWS Wickr users. These bots function as standard users within the AWS Wickr ecosystem, allowing administrators to apply consistent security controls while enabling end-users to interact through messaging. Bots can send and receive messages, handle file attachments, manage rooms and groups, and add interactive UI elements for enhanced user engagement.

Implemented using either a Node.js native library or REST API, AWS Wickr bots offer versatile integration capabilities. They can manage webhooks, interact with file repositories, leverage AWS services like Rekognition for image analysis, bridge communications with platforms such as Slack, Discord, or any Matrix-compatible endpoint, integrate with AI and LLMs, broadcast messages, and even gather location data for mapping purposes. The Matrix integration capability is particularly valuable for organizations requiring federated communication across different platforms while maintaining security protocols.

Use cases for AWS Wickr bots are diverse, ranging from mass communication and emergency notifications to AI-powered chatbots and cross-platform messaging solutions. For instance, enterprises can use bots to automate compliance processes, manage file systems, or create custom integrations with their existing tools. A prime example of AWS Wickr bots in action is showcased in the "Operation Recovery" case study, where bots played a crucial role in coordinating life-saving efforts during critical scenarios.

By leveraging AWS Wickr bots, organizations can extend the platform's capabilities, streamline workflows, and create tailored solutions that meet their specific communication and integration needs, all while maintaining the robust security framework inherent to AWS Wickr. The following sections provide detailed information about getting started with bots and the available integrations. Please note that setting up and configuring bots requires developer involvement and familiarity with command-line operations.

## AWS Wickr bot capabilities
<a name="feature-overview"></a>

 AWS Wickr bots can do the following: 
+  Send and receive messages 
+  Send and receive file attachments 
+  Create and manage AWS Wickr rooms and groups 
+  Add UI elements for user interaction 

**Important**  
AWS Wickr bots cannot initiate or join calls at this time.

 AWS Wickr bots utilize either Node.js code via a native library or a REST API to control what the bot can do. Examples of what bots can do are: 
+  Webhooks 
+  Manage a file repository 
+  Send images or video to AWS Recognition for analysis 
+  Send and receive messages on another platform, like Slack, Discord, or a Matrix compatible endpoint 
+  Interact with Generative AI and LLMs 
+  Broadcast messages or file to any number of AWS Wickr users within your network 
+  Gather user locations to build a map view 