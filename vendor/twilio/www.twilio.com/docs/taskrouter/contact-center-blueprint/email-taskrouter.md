# Using Email and TaskRouter Together

You can easily add Email as a channel to your contact center, by combining a REST based third party email service with TaskRouter. You may also want to use Twilio Chat to provide threading for multi-email conversations. This will use the following products:

* Programmable Chat - for the container of the overall conversation, and for easily updating/rendering the conversation inside the agent UI.
* TaskRouter - for routing each SMS conversation to the best agent.
* Email - we recommend a REST based email API service like [SendGrid](https://sendgrid.com/). However, any email platform can be used as long as you have the ability to create a Task when an email arrives. Twilio customers have built this with tools such as [Office 365](https://products.office.com/en-US/) or [Front](https://frontapp.com/) as well.

This page outlines the best practice of how to use these products together for this Contact Center use case.

Note also that if you are also building webchat or SMS as a channel for your customers, most of the agent work done for these channels is applicable to Email (or vice versa).

## Orchestrating Email and TaskRouter

The flow diagram below shows our recommended way of using Email and TaskRouter together.

Note that the chat room should be created first, before the task. This is because otherwise in times of low traffic the task might be assigned to an agent before the chat room has been created. Once the chat room is created, it can be associated with the new task as an attribute.

![Sequence diagram showing 2-way email integration with TaskRouter, detailing customer, email API, app, Twilio, and agent interactions.](https://docs-resources.prod.twilio.com/a1adeb5e5b2ae391f850734c3ec8dca0978f15c731437eb485e8dcc7328d78e3.png)
