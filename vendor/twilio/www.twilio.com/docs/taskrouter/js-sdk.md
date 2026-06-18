# TaskRouter.js v2: Integrating TaskRouter with your browser-based applications

## Overview

TaskRouter SDK v2 is the current generation of the TaskRouter SDK, designed to offer enhanced interaction with the TaskRouter REST API.

TaskRouter SDK v2 uses a modern tech stack, which provides:

* Faster response times
* Better scalability to accommodate growing needs
* Enhanced security measures
* Seamless integrations

You can use TaskRouter SDK v2 with a standalone TaskRouter setup or the comprehensive capabilities of Flex. TaskRouter SDK v2 is designed to provide full functionality in either scenario.

## Supported objects

* **Workspace**: The foundational environment where all operations occur, including tasks, workers, and task queues.
* **Worker**: Workers represent individual agents or resources. They can manage tasks, interact with supervisors, and handle transfer scenarios.
* **Transfers**: This new module manages incoming and outgoing transfers for smoother agent and task transitions.
* **TaskQueue**: The holding area for tasks until they are assigned to workers.
* **Task**: Individual units of work or assignments that workers handle. Tasks can now be created, modified, or transitioned between states more effectively.
* **Supervisor**: An added functionality that provides oversight of worker activities, tasks, and transfer scenarios, providing managerial control and intervention.
* **Reservation**: This object allows for detailed tracking and management of reserved tasks for specific workers.
* **OutgoingTransfer**: Specific object to manage tasks or communications being transferred out to other entities or channels.
* **IncomingTransfer**: Tailored for tasks or communications incoming from different entities or channels, ensuring that they're queued or handled appropriately.
* **Channel**: Represents various mediums or pathways through which tasks can arrive or be dispatched, such as voice, chat, or email.
* **Activity**: Keeping track of the status or state of workers - be it available, busy, on break, or any custom states.

## Additional resources

You can find the latest version of the TaskRouter SDK v2 documentation in the [TaskRouter.js documentation on Github](https://twilio.github.io/twilio-taskrouter.js/index.html).
