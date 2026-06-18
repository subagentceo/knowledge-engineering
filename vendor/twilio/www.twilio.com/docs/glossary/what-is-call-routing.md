# What is Call Routing?

*Call routing* refers to the procedure of sending voice calls to a specific queue based on predetermined criteria. A call routing system is also known as an *automatic call distributor (ACD)*.

## From Call Routing to Task Routing

Since traditional models of customer service were based on phone support as the primary method of contact between customers and companies, the procedure of sending calls to the right agent became known as *call routing*. However, modern agents interact with customers through a variety of channels. The [*call center*](/docs/glossary/what-is-a-call-center) has evolved into the [*contact center*](/docs/glossary/what-is-a-contact-center).

Today, [SMS](https://www.twilio.com/en-us/messaging/channels/sms) messages, [chat](https://www.twilio.com/en-us/messaging/conversations-api) and [messaging](https://www.twilio.com/en-us/messaging) requests, support tickets, leads, or even machine data are routed based on pre-set attributes, such as skills required by the agent, time zone or language preferences, and priority of the task. This process is often referred to as [*attribute-based routing*](/docs/glossary/what-is-attribute-based-routing), which matches tasks to the people or processes that can best handle them.

## Benefits of Call Routing

When there's a queue of customers waiting on the line, most businesses agree: getting those customers connected to the right agent as quickly as possible is a high priority.

Call routing allows businesses to connect their customers to the right agent faster. Attribute-based routing assesses the needs and context of each caller and connects them to the most qualified agent available with the skills to address those needs. Priority-based routing lets businesses elevate the most important callers to the front of the queue.

Intelligent call routing (or *task routing*) isn't just beneficial for customers. It also increases agent productivity by ensuring that agents are working on the right task at the right time, instead of prioritizing less urgent tasks or working on tasks that they aren't suited for.

## Call Routing and the Customer Experience

Call routing helps customers not only have their needs met quickly, but also have an overall better experience. By anticipating customer needs and automating actions where possible, call routing creates a more personalized and efficient customer experience—which has a direct impact on a business's bottom line.

[Consumer research](https://www.twilio.com/en-us/messaging/conversations-api) shows that 67% of customers will give more business to a company as a result of positive communication experiences. But after a poor communication experience, 38% of customers will switch to a competitor or cancel orders or services, 66% will tell a friend about their experience, and 41% will stop doing business with the company altogether.

## IVR Routing

In cases where human agents aren't necessary, call routing enables virtual assistants and [interactive voice response (IVR) systems](/docs/glossary/what-is-ivr) to provide instant help. In fact, [Gartner](https://www.gartner.com/smarterwithgartner/gartner-predicts-a-virtual-world-of-exponential-change/) predicts that customer preferences for independence and self-service automation will likely rise to 85% by 2020.

An IVR system with custom-built menus can expedite incoming calls, accurately route callers, or even schedule a callback, reducing both the cost and the time to resolution.

Because [customers prefer self-help](https://www.slideshare.net/stevenvanbelleghem/the-self-serving-economy/8) features over waiting on hold for human contact, implementing an IVR system makes good business sense. This is especially true since IVR-handled calls can [cost 100 times less](https://qz.com/147216/how-to-make-the-modern-customer-contact-center-efficient-and-profitable/) than those involving a live agent. Equipped with intelligent call routing, IVR systems can reduce operating costs while increasing customer satisfaction.

## Twilio TaskRouter

[Twilio TaskRouter](/docs/taskrouter) is an example of an attribute-based routing API, for calls as well as other channels of communication, such as [SMS messages](/docs/glossary/what-is-an-sms-short-message-service), or interactions from any other system such as a [CRM](/docs/glossary/what-is-customer-relationship-management). TaskRouter dynamically routes incoming tasks to the agents that can best handle them based on applied attributes, such as skills required by the agent and priority of the task.

### How TaskRouter Works

![TaskRouter workflow: business event, application adds task, workflow evaluates, task queue reserves, worker performs task.](https://docs-resources.prod.twilio.com/6f7c04544a447f845ba67ae9d93614865667ac0426f3451a55c2e5caf3297ab4.png)

Twilio chose TaskRouter as the routing engine for the contact center application platform [Twilio Flex](https://www.twilio.com/en-us/flex), which can handle thousands of agents in one instance, because of its powerful ability to dynamically filter workers, optimize and prioritize tasks, and strategize for workers taking tasks on multiple channels concurrently. TaskRouter is at the very heart of every Twilio contact center deployment.

## More Resources

* [Using TaskRouter with Twilio Flex](https://www.twilio.com/blog/using-taskrouter-twilio-flex)
* [Twilio.com/taskrouter](/docs/taskrouter)
* [Everything You Ever Wanted to Know About TaskRouter](/docs/taskrouter)
* [Read the docs](/docs/flex/developer/routing)
