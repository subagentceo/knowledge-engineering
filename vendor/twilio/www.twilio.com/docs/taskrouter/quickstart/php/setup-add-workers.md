# Setting up a TaskRouter Workspace: Add and Configure Workers

Workers represent the people or processes that perform Tasks. In our example, Workers represent human agents handling incoming voice calls. We plan to intelligently route calls by matching the language skills of our Workers to the language requirements of incoming callers. Specifically, both of our Workers will be capable of handling requests in English, but only one in Spanish.

With your Workspace open in the [TaskRouter console](https://www.twilio.com/console/taskrouter/workspaces), click 'Workers' then 'Create Worker'.

## Worker #1

Our first Worker, Alice, will be capable of both English and Spanish language Tasks.

Worker attributes are described using JSON. Add a "languages" field to Alice's Attributes object and set its value to an array as below.

**Alice's Worker Attributes Expression:** `{"languages": ["en","es"]}`

![Create Worker form with fields for name, workspace, activity, and attributes.](https://docs-resources.prod.twilio.com/82b6e9d5771dd82024fbfa65deb262a680177f1431e3c8aab4a48946ecff4cc1.png)

## Worker #2

Rinse and repeat. Create another Worker named Bob who is exclusively capable of handling Tasks in English.

**Bob's Worker Attributes Expression:** `{"languages": ["en"]}`

![Bob's Worker Details.](https://docs-resources.prod.twilio.com/ab2187fe843b1233208347335a2eb5626ac594c764d6955e628a5239bda6c85d.png)

Excellent. We now have two Workers with attributes that reflect their respective skills.

[Next: Add Task Queues »](/docs/taskrouter/quickstart/php/setup-add-task-queues)
