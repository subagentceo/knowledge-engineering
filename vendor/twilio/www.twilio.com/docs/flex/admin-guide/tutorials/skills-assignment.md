# Routing Part 1: Assign skills to your Flex agents

After you set up a basic Flex account, you can add task queues and configure skills for your agents. In this two-part tutorial, you'll learn how to configure skills, task queues, workflows, and Studio flows to enable skills-based routing for your Flex application.

## Define your skills

To get started, we will first configure our skills from the Flex Admin view in the Flex UI.

Log in to Flex as an administrator at [flex.twilio.com](https://flex.twilio.com) or [launch Flex from the Twilio Console](/login?g=%2Fconsole%2Fflex%2Fservice-login%3F\&t=a3e877de72abefacf853347a09c87cdb7ff15e2111e4aa32bb09c444b7d0f35a). Select the **Admin** view, then click **Skills**.

![Twilio Flex UI admin dashboard with options for managing versions, billing, and user setup.](https://docs-resources.prod.twilio.com/bd4e5812baa75aa786b8280301e504bdb15eed201a7637088e31787b91b1a2a6.png)

To create new skills, enter the name of the skill, then press **Enter** or click **Add New Skill**.

> \[!NOTE]
>
> To ensure compatibility with TaskRouter, skill names must **NOT** include spaces.

For this guide, we will create the following skills:

* CustomerService
* HR
* IT

![Form to add new skill with fields for name, level, and expressions for queue and workflow.](https://docs-resources.prod.twilio.com/f87c1826127c8f2566e0084b9a4ef6946435807fcffb8fa75b6d3c859036aa0e.png)

Copy the queue and workflow expressions, as these values will be used for [queues and skills based routing](/docs/flex/admin-guide/tutorials/queues-and-skills-based-routing).

## Assign skills to your agents

Next, assign skills to your agents using the **Flex Teams View**. A Flex user with the `supervisor` or `admin` role will be able to modify the skills for the contact center users.

To start, select **Teams View** by clicking on the People icon:

![Twilio Flex interface showing agent availability and tasks.](https://docs-resources.prod.twilio.com/05c453d3f3d205c2e0bc967c107b587dc1953deada6cc41f1e7267ac564a07d4.png)

From **Teams View**, select the Flex user you wish to update. This will display the **Agent Detail** view. From here, you can add skills to an agent's profile.

Apply the appropriate skill(s) and save the profile:

![Twilio Flex interface showing agent profile with skills selection options.](https://docs-resources.prod.twilio.com/b3f9478e09fcf891cb880fc3f86038a52677a3d111d7be12f4613018ff0fa49a.png)

Now, your agents are set up to participate in the skills-based routing of tasks. In part 2, we will cover [setting up the task queues and routing tasks](/docs/flex/admin-guide/tutorials/queues-and-skills-based-routing) to the appropriate agents.
