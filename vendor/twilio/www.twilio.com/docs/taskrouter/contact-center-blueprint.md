# Contact Center Blueprint

## Introduction

All sorts of contact centers are built on Twilio. From traditional single channel call centers to advanced multi-channel contact centers with high levels of customization, self service and AI built in.

This section of the API Documentation is intended to provide a *blueprint* for building a contact center - or a particular contact center feature - on Twilio. Consider this a reference architecture, intended to provide prescriptive advice and design philosophies to help you build a contact center.

You should use this blueprint in conjunction with the primary Twilio Product documentation. The Twilio API docs for each product will give the full depth of product specific functionality. This blueprint focuses on:

* Providing overall architectural advice on how to build specifically for contact center.
* How to best integrate multiple Twilio products together for your use case (many contact centers will use every single product Twilio has together).
* How to best architect your configuration and your own code for your contact center use case.
* How to integrate with other third party products which you will need in building out a contact center, from analytics to workforce management.

Note that while this blueprint is text-heavy to cover architectural concepts, this is intended to be a developer guide and contains many code examples.

## What types of Contact Centers are built on Twilio?

Across all contact center deployments built on Twilio, there are many hundreds of thousands of agents handling voice, chat, video or other interaction types. In general these deployments fall into one of the following categories:

* SaaS based Cloud Contact Centers - such as Talkdesk, Serenova, NewVoiceMedia
* Contact center feature options of a SaaS based CRM provider - such as Salesforce, Zendesk
* Enterprise or SMB contact centers built for their own use - such as ING, Capital One, Wix.com

And within each of these categories people have deployed this technology for both sales and support, both inbound and outbound.

## Using this Blueprint

You should use this blueprint in conjunction with the primary API docs. Where code examples are shown they are intended to demonstrate specific concepts. You should always use the primary product API documentation as the single source of truth for API behavior.

### Customizing sequence diagrams for your own use

This blueprint uses Web Sequence Diagrams to explain various concepts. Wherever you see a sequence diagram, the code for creating it will be listed at the bottom of the page or at the end of the section. You can take that code and paste it into [https://www.websequencediagrams.com/](https://www.websequencediagrams.com/) in order to customize for your own use.
