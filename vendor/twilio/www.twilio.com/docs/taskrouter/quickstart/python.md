# TaskRouter Python Quickstart

## Overview

TaskRouter is a system for assigning tasks of any type to the people and processes that can best handle them.

As an example, imagine you are building a multi-channel sales and technical support system. Your agents possess unique skills, are based in different locations and operate on different schedules. For each incoming call, email or tweet, you need to determine the best agent to route it to while monitoring the dynamic availability of agents.

Systems of this type are difficult to build and to operate at scale; complex state data needs to be maintained, queried and updated frequently.

TaskRouter bears the burden of this complexity, allowing you to spend less time on infrastructure plumbing and more time engineering a great customer experience.

**In this Quickstart tutorial** we will build a simplified version of the example scenario in four parts. The tutorial is optimized to follow from start-to-finish:

* [Part 1: Setting up a TaskRouter Workspace](/docs/taskrouter/quickstart/python/setup)
* [Part 2: Creating Tasks and Accepting Reservations](/docs/taskrouter/quickstart/python/accept-reservations)
* [Part 3: Creating Tasks from Phone Calls using TwiML](/docs/taskrouter/quickstart/python/create-tasks)
* [Part 4: Controlling Worker Activities using TaskRouter.js](/docs/taskrouter/quickstart/python/control-workers)

**Keeping it simple:**

* We'll use just two agents to simulate our workforce
* We'll stick to a single communications channel - voice calls
* We won't discuss all of TaskRouter's capabilities. For that, check out the [reference documentation](/docs/taskrouter).

**Prerequisites**

* A working Python server
* If you are running your Python server locally (as we will in the examples), you'll need a tool such as [ngrok](https://www.ngrok.com) to allow Twilio's servers to interact with your code

**Conventions**

* Code and commands are written in `fixed width`
* When following a code sample, check for \{curly braces} - this means you need to substitute a value from your own TaskRouter account
* Supplemental information is provided in blockquotes:

[On to Part 1: Setting up a TaskRouter Workspace »](/docs/taskrouter/quickstart/python/setup)
