

# What is Amazon Mechanical Turk?
<a name="WhatIs"></a>

Amazon Mechanical Turk (Mechanical Turk) is a crowdsourcing marketplace that connects you with an on-demand, scalable, human workforce to complete tasks. Using Mechanical Turk, you can programmatically direct tasks to the Mechanical Turk marketplace, where they can be completed by workers around the world. Mechanical Turk allows you to access the intelligence, skills, and insights of a global workforce for tasks as varied as data categorization, moderation, data collection and analysis, behavioral studies, and image annotation.

Mechanical Turk is built around the concept of *microtasks,* which are small, atomic tasks that workers can complete in their web browser. When you submit work to Mechanical Turk, you typically start by breaking it into smaller tasks on which workers can work independently. In this way, a project involving categorizing 10,000 images becomes 10,000 individual microtasks that workers can complete. By breaking tasks down atomically, hundreds of workers can work on portions of your project at the same time, which increases how quickly the work can be completed. In addition, you can specify that each task be completed by multiple workers to allow you to check for quality or identify biases in subjective questions.

**Important**  
If you do not add a CORS configuration to the Amazon S3 buckets that contain your image input data, HITs that you create using those input images will fail. To learn more, see [CORS configuration requirement](MturkCorsConfig.md).

Use this guide to learn how you can interact with Mechanical Turk programatically. We recommend you begin by reading the following topics. To get started quickly with Mechanical Turk, see [Get Started with Amazon Mechanical Turk](GetStartedMturk.md).

**Topics**
+ [The Amazon Mechanical Turk marketplace](IntroMarketplace.md)
+ [Creating tasks that work well on Amazon Mechanical Turk](IntroTaskWorkWellMturk.md)
+ [Amazon Mechanical Turk core concepts](IntroCoreConcepts.md)
+ [Amazon Mechanical Turk best practices](IntroBestPractices.md)
+ [Frequently asked questions](IntroFAQ.md)