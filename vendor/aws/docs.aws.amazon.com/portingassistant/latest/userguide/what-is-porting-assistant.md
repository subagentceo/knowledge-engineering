

AWS .NET Modernization Tools Porting Assistant (PA) for .NET, AWS App2Container (A2C), AWS Toolkit for .NET Refactoring (TR), and AWS Microservice Extractor (ME) for .NET is no longer be open to new customers. If you would like to use the service, sign up prior to November 7, 2025. Alternatively use [AWS Transform](https://aws.amazon.com/transform/), which is an agentic AI service developed to accelerate enterprise modernization of .NET.

# What is Porting Assistant for .NET?
<a name="what-is-porting-assistant"></a>

Porting Assistant for .NET is a tool that helps you to port your existing .NET applications running on Windows Server to .NET Core on Linux. Porting Assistant for .NET scans .NET projects in an application portfolio, analyzes source code and package dependencies, and generates an assessment report that highlights incompatible APIs and packages (NuGet and Microsoft Core). Porting Assistant for .NET offers replacement suggestions for incompatible packages and APIs, where applicable. It also notifies you if the application is using unsupported components that cannot be easily replaced with .NET Core on Linux. The detailed compatibility assessment makes it possible for you to prioritize applications from your portfolio based on the complexity and effort involved in the porting process. When you select an application, Porting Assistant for .NET jumpstarts the porting process by converting the .NET project reference files to their .NET Core equivalent with the updated package information and versioning. Developers can use the updated project files as a starting point to make source code changes. The Porting Assistant for .NET suggestion engine for API and package replacements improves over time as it learns more about the usage patterns and frequency of missing packages and APIs.

A command line console application is included in the Porting Assistant for .NET download package. You can use the command line to assess and port solutions and projects. For more information about how to use the command line console application, see [Assess a new solution using the Porting Assistant CLI console application](porting-assistant-assessment-tool.md#porting-assistant-cli-job) and [Port a solution using the Porting Assistant CLI console application](porting-assistant-port.md#porting-assistant-port-cli). 

The Porting Assistant for .NET Visual Studio IDE extension makes it possible to use Porting Assistant for .NET functionality seamlessly from within Visual Studio. For more information about the extensions, see [Porting Assistant for .NET Visual Studio IDE extension](porting-assistant-vs-ide.md).

**Topics**
+ [Features of Porting Assistant for .NET](#porting-assistant-features)
+ [Supported versions](#porting-assistant-versions)
+ [Concepts](#porting-assistant-concepts)
+ [How to get started with Porting Assistant for .NET](#porting-assistant-how-to-get-started)
+ [Accessing Porting Assistant for .NET](#porting-assistant-accessing)
+ [Pricing for Porting Assistant for .NET](#porting-assistant-pricing)

## Features of Porting Assistant for .NET
<a name="porting-assistant-features"></a>

Porting Assistant for .NET provides the following features:

**Compatibility assessment**  
Porting Assistant for .NET scans your .NET framework projects and generates a compatibility assessment report by analyzing source code and packages (NuGet and Microsoft Core). It identifies incompatible APIs and their source, and provides known replacements, if available. This assessment can help you to identify and prioritize appropriate applications for .NET Core porting.

**Porting assistance**  
If the latest version of a package is compatible with .NET Core, Porting Assistant for .NET upgrades the package to its latest compatible version and changes relevant project reference files to a .NET Core-compatible format. Porting Assistant for .NET doesn’t eliminate the need to make source code changes. However, it reduces the undifferentiated heavy-lifting required to begin refactoring source code.

**Continuous improvement**  
The Porting Assistant for .NET API replacement engine, powered by the AWS Cloud, continuously learns and improves as the tool is used. The learning capability of the tool results in increasingly better ways to port applications to .NET Core.

## Supported versions
<a name="porting-assistant-versions"></a>

Porting Assistant for .NET supports assessment and conversion of C\# and VB.NET applications running on Windows Server 2016 and later.
+ Supported .NET Framework source versions: .NET Framework 3.5 and later 
**Note**  
Within the source projects, only .csproj files are supported. MS Build conditional constructs and other conditional or nested clauses in .csproj files are not supported. Only NuGet version strings that conform to SemVer are supported. Version strings that use wildcards or variable names are not supported.
+ Supported .NET Core target platform versions: 
  + .NET 7.0 on Linux
  + .NET 6.0 on Linux
  + .NET 5.0 on Linux
  + .NET Core 3.1 on Linux
+ Supported Operating Systems: Windows 10 or Windows Server 2016 and later

## Concepts
<a name="porting-assistant-concepts"></a>

The following terminology and concepts are central to your understanding and use of Porting Assistant for .NET.

**Solution/solution file**  
A solution or solution file is a collection of projects (`csproj`) packaged by Visual Studio with the extension `.sln`. Using a solution file makes it easier to assess large projects with many projects as opposed to analyzing individual binaries and then aggregating information. 

**`csproj`/project**  
Each project is identified by Visual Studio with a `.csproj` file. All of the project configuration is contained in the `.xml` file.

**Internal NuGet**  
Some users have an internal NuGet hosting service, similar to nuget.org, that is accessible only within their local network.

## How to get started with Porting Assistant for .NET
<a name="porting-assistant-how-to-get-started"></a>

After you have [downloaded](porting-assistant-install.md) and configured Porting Assistant for .NET, you can start the compatibility assessment in the **Application-level assessment** mode. You can select a local source-code folder and associated solution (.sln) file to start an assessment for this particular .NET framework application.

After starting the assessment job, it may take a few minutes to generate the assessment report. When the job is complete, you can select **View Details** to view the full compatibility report for the application. This compatibility report is the starting point for your .NET refactoring efforts and enables you to estimate the complexity of your application and the effort involved in porting it to .NET Core.

## Accessing Porting Assistant for .NET
<a name="porting-assistant-accessing"></a>

Porting Assistant for .NET is offered as a standalone tool that you download and install on your developer workstation or as a Visual Studio IDE extension. Using the standalone tool, you can specify the solution files for your .NET applications to start an assessment task. You can view and analyze the assessment report using a UI console and can optionally download it for sharing and offline analysis. When you use the IDE extension, you can perform assessments and porting from within your IDE, with guidance as you make source code changes. 

## Pricing for Porting Assistant for .NET
<a name="porting-assistant-pricing"></a>

Porting Assistant for .NET is available for use at no cost. 