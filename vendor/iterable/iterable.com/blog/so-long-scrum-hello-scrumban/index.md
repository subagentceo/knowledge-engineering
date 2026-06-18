# So Long Scrum. Hello Scrumban. - Iterable

## So Long Scrum. Hello Scrumban.

**Published by**

March 12, 2019

![](https://iterable.com/wp-content/uploads/2026/04/031219_So-Long-Scrum_768x512.png)

Over the past five years I’ve used Scrum with several teams at multiple companies. It was a big improvement on the waterfall processes it replaced, but there were always some nagging issues. Recently my team switched to Scrumban, a Scrum-Kanban hybrid. Here’s why we switched, and how it’s worked for us.

### A Batch Process in a Real-Time World

The Iterable app runs on the cloud and we release continuously. Using Scrum in a CI/CD world has always felt awkward. With continuous delivery there is no “potentially shippable product” at the end of the sprint—in fact, by the end of the sprint, most of your work has already shipped. With no potentially shippable product, there is little reason to force-fit the team’s work to sprint boundaries.

Scrum also brings unnecessary pain around “unplanned” work. Mike Tyson summed this up well when he said, “Everybody has a plan until they get punched in the mouth.” Scrum treats unplanned work as a dirty word, but I disagree!

We put herculean effort into CI/CD automation so we can release fast. We can find a bug in the morning and fix it that afternoon, so why would I use a planning process that discourages this? You can work around this in your Scrum team by under-committing during sprint planning and pulling in items as they come up, but if you’re routinely changing your sprint commit then that’s not really Scrum anymore.

These two issues tell us that Scrum is not the best fit for a CI/CD world. So what is?

### Enter Kanban

Kanban was developed for just-in-time manufacturing. It lends itself well to a CI/CD-based software development environment, where work can be released real-time, as it’s completed. Pure Kanban puts less emphasis on up-front planning and focuses on high throughput while limiting the amount of work in progress at any given time.

Work (Jira tickets in our case) progresses through a number of steps from “Ready for Work” to “Done,” and if too many tickets wind up in the same step (usually it’s “Awaiting Code Review”), then we’ve hit a bottleneck and we can quickly tackle it and get the pipeline moving again.

Where Kanban falls short is planning, and that’s where _Scrumban_ comes in. We’d like to have just enough planning to steer the ship, but not such strict planning that we mindlessly crash into any rocks we didn’t see before setting our course. We add in an ordered backlog of upcoming work, and have a weekly 90-minute planning meeting to discuss priorities for the week and move tickets from “Backlog” to “Selected for development.”

This weekly plan has some important differences from a Scrum sprint. Unlike a sprint, we don’t try to force everything into the one-week boundary. We know that if someone plans to pick up two tickets that take three days each, one of those tickets will roll over to next week.

We also accept that unplanned work may come up during the week, and so we might adjust the plan as we go. In Scrum, that means we fell short of our commitment. For us, it means we worked on the most valuable items every day, even if some of them came up after planning—usually production bugs or urgent customer requests.

At the end of each week, we have a review and retrospective meeting, again borrowed from Scrum. We discuss what we’ve completed, share demos, walk through code, talk about what is going well, and what is not. Each week we also look at the number of tickets completed, as a stand-in for story points and velocity.

Mercifully, we do not have to figure out how to count story points for something we “almost finished” (do the story points count to this sprint’s velocity or next?)—we only count the completed tickets and so long as we’re on track, it all averages out in the end.

### Nuts and Bolts

#### The Backlog

Iterable uses Jira across engineering, and, being good team players, we follow this standard. We created a Kanban project in Jira and enabled the backlog (in the board setup screen, under “Columns,” drag the “Backlog” status into the “Kanban Backlog” column like this) and enabled the “Epics panel” (a simple toggle on that same screen).

We modified the card layout to include the date the ticket was created and the components. Here’s how the backlog looks:

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-9.52.32-AM.png)

#### Day-to-day Work

We tweaked the default workflow so that we have five columns: “Selected for Development,” “In Progress,” “In Review,” “Awaiting Deployment,” and “Done.” We use the Jira git plugin which automatically moves an issue to “In Review” when a PR is opened, and to “Awaiting Deployment” once it is merged. Unfortunately, we still trigger deployments manually, and once a developer has done this deployment they move the ticket to “Done.”

We modified the card layout here to include the components. Here’s our daily working board:

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-9.52.57-AM.png)

#### Tickets and Planning

We are not strict around issue format and we don’t create Scrum-like stories. We do group tickets for large projects into epics, but most of the time we just use components.

While we track tickets and development work in Jira, most of our planning is actually recorded in a running Quip document. Each week we add a new section, and our agenda is always: “1. Review current state, last week’s progress,” “2. Upcoming items,” and “3. Plan for this week”.

Here’s our human-friendly planning document from a few weeks ago:

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-9.53.10-AM.png)

When reviewing last week’s work we create a Jira release, which gathers all the completed tickets and removes them from the board. We might share some details of completed work and discuss anything that is rolling over to this week as needed. If there were non-Jira items from the previous week such as, “remember to fill out the survey for the offsite,” we’ll check in to make sure we did it.

“Upcoming items” is a placeholder for reminders. Most of this is entered during the previous week, so by the time we sit down for planning, it is a list of things we need to remember for the coming week. It typically has things like, “Bulk event endpoint—promised to a customer by end of Feb,” (so we remember to add this to the plan for this week) or “Jemiah on PTO next week” (so we remember to plan accordingly).

Finally, under the plan for this week, we list out the broad strokes of what each engineer is working on. Items with dev work, like “Continue ingestion format changes,” would have detailed tickets tracked in Jira. Other items like “Talk to Wayne about API” are just reminders-not tracked in Jira.

### What’s Next?

The Agile Manifesto tells us “respond to change.” When Scrum replaced waterfall, changing release cycles from months to weeks was a huge step forward. Now, with CI/CD becoming the norm, it’s time for engineering organizations to respond again. We’ve taken a first step, and as with any Agile process we will continue to review, react, and refine as we go. Now I encourage you to take the plunge, try it out, and see if Scrumban is right for you!