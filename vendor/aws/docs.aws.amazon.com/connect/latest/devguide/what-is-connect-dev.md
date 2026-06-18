

# What is the Amazon Connect Customer Developer Guide?
<a name="what-is-connect-dev"></a>

**Note**  
Amazon Connect now refers to a portfolio of agentic solutions for business functions. The legacy product is now called Amazon Connect Customer, or simply Customer. The legacy name is used interchangeably in this documentation.

The Amazon Connect Developer Guide is for software developers who build applications that integrate with Amazon Connect using its APIs, flow language, and event-driven architecture.

## Who this guide is for
<a name="who-is-this-guide-for"></a>

This guide is for developers who:
+ Build custom contact center solutions using the Amazon Connect APIs
+ Create and manage contact flows programmatically using the Connect flow language
+ Automate rules and business logic using the rules function language
+ Test contact flows using the testing language
+ Integrate Amazon Connect with other AWS services and third-party applications

If you are an administrator setting up and managing Amazon Connect through the console, see the [Amazon Connect Administrator Guide](https://docs.aws.amazon.com/connect/latest/adminguide/).

## What's in this guide
<a name="whats-in-this-guide"></a>

Programming with the Amazon Connect Customer APIs  
Best practices for calling the APIs, including throttling guidance, SDK support, and eventual consistency behavior.

Actions by resource  
A navigation reference that organizes API operations by the resource they act on.

Connect flow language  
The JSON-based language for defining contact flows programmatically, including action types, parameters, transitions, and conditions.

Rules function language  
The syntax for defining rule conditions and event triggers that automate actions in your contact center.

Testing language  
The schema for writing automated tests against your contact flows, including assertions, overrides, and simulated events.

## How to use this guide
<a name="how-to-use-this-guide"></a>

To understand best practices for integrating with the APIs, start with [Programming with the Connect Customer APIs](connect-service-api.md). To build or modify flows programmatically, refer to [Connect Customer Flow language](flow-language.md) for the JSON schema and action reference. To validate your flows before deploying them to production, use [Connect Customer testing language](testing-language.md).

For the complete API reference with request/response syntax and data types, see the [Amazon Connect API Reference](https://docs.aws.amazon.com/connect/latest/APIReference/).