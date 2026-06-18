# TaskRouter: PHP quickstart

## Overview

TaskRouter is a system for assigning tasks of any type to the people and processes that can best handle them.

As an example, imagine you are building a multichannel sales and technical support system. Your agents possess unique skills, are based in different locations and operate on different schedules. For each incoming call, email or message, you need to determine the best agent to route it to while monitoring the dynamic availability of agents.

Systems of this type are difficult to build and to operate at scale; complex state data needs to be maintained, queried and updated frequently.

TaskRouter bears the burden of this complexity, allowing you to spend less time on infrastructure plumbing and more time engineering a great customer experience.

This quickstart tutorial explains how to build a simplified version of the example scenario in four parts. The tutorial is optimized to follow from start-to-finish:

* [Part 1: Setting up a TaskRouter Workspace](/docs/taskrouter/quickstart/php/setup)
* [Part 2: Creating Tasks and Accepting Reservations](/docs/taskrouter/quickstart/php/accept-reservations)
* [Part 3: Creating Tasks from Phone Calls using TwiML](/docs/taskrouter/quickstart/php/create-tasks)
* [Part 4: Controlling Worker Activities using TaskRouter.js](/docs/taskrouter/quickstart/php/control-workers)

To avoid added complexity, this tutorial uses two workers to simulate a workforce, and it involves only one communications channel, voice.

In addition, this tutorial doesn't cover all of TaskRouter's capabilities.

## Prerequisites

To complete this tutorial, you must have:

* A working PHP server (PHP version 5.4 or higher)
* If you're running your PHP server locally (as shown in the examples), you'll also need a tool like [ngrok](https://www.ngrok.com) to allow Twilio's servers to interact with your code

## Tips

* When following a code sample, check for \{curly braces}, If you see these, you'll need to substitute a value from your own TaskRouter account
* Supplemental information is provided in blockquotes

[Continue with Part 1: Setting up a TaskRouter Workspace »](/docs/taskrouter/quickstart/php/setup)
