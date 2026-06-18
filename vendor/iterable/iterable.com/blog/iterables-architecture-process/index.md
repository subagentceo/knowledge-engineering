# Iterable's Architecture Process - Iterable

## Iterable’s Architecture Process

**Published by**

June 16, 2021

![](https://iterable.com/wp-content/uploads/2026/04/061621_Iterable-Architecture-Process_768x512.png)

Software architecture is a very abstract thing. When we build bridges or buildings or dams, there are standards for types, structure, and contents of the various design artifacts. Licensed and certified architects are responsible for generating those designs, and the designs go through various levels of sign-off before we break ground on the new project.

The deliverables are well understood and failure to meet the standards put forth by the industry can have catastrophic consequences. However, in the abstract world of software architecture, such standards are much harder to come by. Different organizations adopt different architectural practices (or sometimes, none at all).

The truth is, building software can progress just fine in the absence of a person whose title is “architect”, but this does not mean that no one has architected the software. It’s just that the problem was simple enough or the developers had enough experience to know how to make the right architectural decisions.

Iterable recently celebrated its eighth birthday, and we have seen over the course of this very exciting journey an ever-evolving approach to architectural process.

In the early days when I first joined the company in 2016 (at that point, it was already three years old), we used to have a weekly all-hands where all 35 or so employees would stand in a circle and give an update on what they had gotten done that week. At that point in time, our purpose was clear and our application and our company were small enough that everyone was on the same page about what needed to be done and how it needed to be done.

Today, Iterable has over 400 employees and the days of the all-company standup are long gone. The application has also grown over the years, not only in the functionality that it offers but also in the scale at which it needs to operate. As we have grown we have also needed to evolve our architectural process to address the complexities we face today and the one’s we anticipate in the future. Today’s blog post will go into a bit of detail about how we have evolved our process to meet these challenges.

### The Job Title of “Architect”

Even though we have determined that architectural processes are important, one thing that the Engineering Management explicitly chose not to do was to add the title of “Architect” to our career path. The thinking here is that architecture is a role that everyone in engineering plays at one point or another.

It is a role and a process, but it’s not actually a job in and of itself. For any given design, we have found that that all of our engineers can bring a lot to the table as do those outside of engineering—our Customer Success people, Product owners, and Sales and Solutions folks—who are closer to the product and the customer. The goal of our process is to leverage that experience in the most efficient way possible across the entire engineering organization.

### The Architectural Support Group (ASG)

Sometimes this type of mentorship and transfer of information happens organically, but now that our workplace is more distributed it is also good to have a slightly more formal structure in place to help catalyze these conversations. To that end, we now have a weekly meeting at Iterable—one hour every Thursday afternoon—where we discuss some particular topic.

While my job title is not “architect,” one of my main areas of focus is to set up and run this meeting every week. We want the meeting to be as lightweight and informal as possible, but it’s still good to impose some level of structure so that we can get the most out of our one hour of time together.

### Who Presents?

For our ASG meetings, we generally have a topic and presenter worked out ahead of time. I have a slide template that I offer to the presenter if they need some guidance on the structure and content of the meetings, but if they already have some information pulled together or if slides just aren’t the right medium to convey the information, the presenter is free to structure things as he or she sees fit.

The presenter could be a someone who is relatively new to the company or a seasoned veteran; could be anyone from the junior ranks up to senior staff; could be from the mobile team or from our SRE team. The breadth of topics that we talk about from one week to the next is one of my favorite things about the meeting, as it’s not only a great opportunity for anyone to practice their presentation skills, but it’s a great opportunity for everyone to learn more about an area with which they are less familiar.

### Who Attends?

This is the interesting part, and one of the few happy consequences of COVID. We convene in a conference room of infinite size (well, Zoom is not infinite, but we haven’t hit the limit yet!), where people can come and go as they please without disrupting the conversation. Of course, we have the usual suspects there every week—the staff and senior staff engineers whose knowledge and experience are what makes the ASG tick.

But we also have members of the Product team, the SE’s and Solutions Architects, and the Customer Success team in regular attendance, and input from those not in engineering has proven to be one of the most valuable aspects of the meeting! Having the Voice of the Customer present in architectural discussions is immensely valuable in that it keeps us on track to make sure that we are solving the right problems in a way that will work for our customer-facing folks.

### What are the Outcomes?

Outcomes are really the most important part of this whole thing. While it’s great to have an hour that is set aside for talking through technical issues and learning about new areas of the application, the most important part of a meeting like this is the followup. We need to make sure that the meeting is providing value and driving the desired results. Sometimes, an hour isn’t enough to get to the bottom of a particularly thorny issue, but it may take the whole hour just to get the shape and the nuances of the problem.

An important part of my job is to make sure that part of the conversation deals with timeframes and next steps. We need to understand if the issue is a near term thing or if this is more of a long term concern. We need to understand if there is an operational issue that is a ticking time bomb in the system.

And most importantly, we need to understand if, by the end of the meeting, we have arrived at a sort of “architectural conclusion”. If the presenter came with a problem that they were stuck on, we can’t send that person away empty handed. Best case, someone in the room was able to offer some insight or tangible next steps to research to solve the problem.

But when that is not the case we need to acknowledge it, and to continue to work through the design. Sometimes the right next step is to step back from the problem and make sure we’re thinking about it in the right way. Sometimes there are ambiguities about the problem that are preventing us from coming up with an adequate solution.

When this is the case, we have another process that kicks in called the Architectural Quantification Framework (or AQF). This is a new thing that we have just started this quarter, so I don’t have many proof points for it as yet (perhaps another blog post in the near future!).

The idea is that we when we have run into a problem where we aren’t able to determine next steps for over the course of an hour, we need to step back from the problem and make sure that we understand everything about the problem:

*   Is there some customer expectation here that we are not fulfilling?
*   What did the customer expect to have happen?
*   What actually happened?
*   Should the customer have expected this to work the way they thought it would?

Or, if it’s a new feature, we may have to ask a different set of questions:

*   How would the customer expect this to work?
*   How are we packaging and selling this feature?
*   When is feature scheduled to ship?

By reviewing the hour long conversation that was brought to ASG and also adding mixing in some additional diligence on the “problem around the problem,” hopefully we are able to gain still more insight on the tradeoffs in front of us and the potential solutions to the problem.

### Conclusion

The ASG process at Iterable has become an important part of how we solve technical problems at the architectural level. It has also become an important educational tool for the team and a way for us to all come together, wherever we may be, for at least one hour per week to discuss the most challenging problems that face our rapidly growing business.