# Building a Modern Quality Program from the Ground Up - Iterable

## Building a Modern Quality Program from the Ground Up

**Published by**

May 4, 2021

![](https://iterable.com/wp-content/uploads/2026/04/050421_Modern-Quality-Program_768x512.png)

If you review job boards for QA Manager or QA Tech Lead roles, you will find an increasing number of companies looking to create or “build a Quality Engineering” program. Talking to some of the engineering leadership at these companies, you often hear conflicting requirements and asks for this role (_Automation Architect, Quality Program Manager, Testing Coach, Quality Agile Leadership, our first Quality Engineer, etc… this list goes on forever_). This is because building a Quality Engineering from scratch these days is a completely different experience than that of Quality Programs from the last decade.

Gone are the days where companies will hire a horde of testing specialists who act as a safety net, waiting for code to be tossed over the proverbial wall by developers to perform validation before a release can happen.

Nowadays, a modern Quality Program is significantly smaller and more specialized. They rely on technology, push a concept of “Quality Culture,” and are pseudo Quality Program Managers to ensure that engineering organizations successfully deliver value to their customers.

So, to understand why this change has happened, I’ll be exploring why the old Quality Programs of yore no longer make sense, how newer modern Quality Programs address these shortcomings, and what tips and tricks I have found immensely useful in building a Modern Quality Program from the ground up.

### Why Software Companies Moved Away from QA

Why have software companies moved away from QA Departments to dedicated QA Engineers? With modern software development practices, traditional QA departments are quickly becoming obsolete.

Startups are on the rise. The number of tech startups have increased by 47% since 2007. In startups, especially in their infancy, the most important goal is to find product market fit.

Engineering is tasked with solving this and delivering at high velocity. Quality often takes a back seat until the company matures. At this point, engineering teams often learn to operate without a dedicated QA Program.

Code is deployed frequently. Facebook’s motto was famously “Move Fast and Break Things.” Software companies around the world have adopted the concept of constant code deploys based on the idea that mature tooling allows developers to get code quickly out to customers for instant feedback, and quick fixes.

This is a stark change from when companies had long cycles before they cut a release, and therefore needed multiple validation steps before the product was safe for consumption.

Shipping a defect isn’t as significant. In many startups, the impact of releasing a defect is low—especially when compared to the need to ship features at high velocity.

Unless your software company deals with medical history for patients, sensitive financial information, or some financial penalty if a product doesn’t meet SLA, the cost of a defect is not as significant.

Automation and tooling has matured. Improved tooling and the maturity of deployment pipelines has created the expectation that developers begin to test their own code earlier in the development lifecycle (shift-left testing). As a result, engineering leaders now sometimes question the need and value for testers near the end of the deployment lifecycle.

### Build a Modern Quality Engineering Program

Modern Quality Engineering Programs address many of the shortcomings mentioned above and tackle some of the more complex problems that can’t be solved by automation or a mature deployment process.

Here are my keys to building a modern Quality Engineering Program:

#### Be the customer advocate.

Automation testing does a great job of answering the question of“ Did I build the product right?”, but it does not answer, “Did I build the right product?” Modern Quality Engineering Programs drive processes that collect customer usage data and incorporate them into testing and release validation.

#### Build it bespoke.

It’s essential to understand what your engineering organization excels at and where it needs to improve. Good programs are agile at adapting to Quality needs, and adjust day to day operations to serve the engineering team. For example, your engineering organization may have a very mature automation framework, but the governance of certain processes is weak. You may find yourself spending more time fixing these processes than coding.

#### Coach on Quality.

It’s highly unlikely that you will have a large team of testers. Instead, each Quality Engineer should be a specialist who partners closely with development teams to build and maintain the right testing frameworks. A Quality Engineer may build out the framework and libraries, but have the developers build the test cases for their own features. Quality Engineers may also be driving forward testing in gaps of coverage (see shift-right testing paradigm).

#### Audit Engineering Decisions through Data Driven Process.

In early 2014, Facebook changed their famous motto to “Move Fast with Stable Infra.” They “…realized over time is that it wasn’t helping us to move faster because we had to slow down to fix these bugs and it wasn’t improving our speed.” An engineering organization can easily find itself going down the wrong path. It’s important for a Quality Program to constantly audit the health and quality of an engineering organization through data to determine if the initial hypothesis is correct. Sometimes a catchy mantra isn’t enough, and a little more thoughtfulness will actually increase developer velocity.

### Tips and Tricks for Building It Fast and Right

#### Find the value in every decision.

For every decision—whether it’s a new process or new tool—it’s important to define the value add for your customers or engineers. Industry best practices and vendor recommendations may not fit your team.

#### Establish KPIs.

It’s impossible to quantify improvement without good data. Know the metrics and KPIs you’re measured by, and create hypotheses for improvements based on them. After a few cycles, analyze your data. Did you make the impact you’d hoped? If not, adjust and repeat.

#### Ask uncomfortable questions.

Just because things have always been a certain way, doesn’t mean it’s the only way or the right way. Part of the Quality mindset is asking “why.” If you think something can be improved upon, be ready to bring a solution to the table and drive the discussion forward.

#### Take on low-hanging fruit.

In the beginning, you may want to take on a big moonshot project but be bogged down with smaller cleanup tasks. Worry not. You’re driving improvement and creating value. Eventually, your momentum will carry you through to your larger goals.

#### Reach outside of engineering.

It’s important to understand the challenges faced by stakeholders outside of engineering: customer service engineers, solution engineers, account executives, marketing teams, etc. Learn their stories. They’ll help you build and steer the right programs. Also, share the initiatives that Quality is running to delight customers. This will help build confidence in engineering and strengthen your company’s overall ability to serve its customers.

These are a few of the high level points to building a Modern Quality Engineering program. If you remember nothing else, remember to build a bespoke Quality Program for your company and customers. No two programs will ever look the same. The needs of your engineers and customers will vary.

I would love to hear feedback or stories from your journey. You can reach me at jeff.sing@iterable.com.