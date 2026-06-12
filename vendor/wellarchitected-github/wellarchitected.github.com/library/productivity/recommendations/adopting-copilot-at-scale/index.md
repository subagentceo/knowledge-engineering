# Adopting GitHub Copilot at Scale

Libraries

Overview

Recommendations

Adopting GitHub Copilot at Scale

# Adopting GitHub Copilot at Scale

Greg Mohler·@callmegreg

July 22, 2024

## Scenario overview

Congratulations, you made the decision to adopt GitHub Copilot! But now what? Rolling out any technology to thousands of users can be a daunting task. After all, adopting GitHub Copilot doesn’t just mean a new tool, it means a new way of working.

A few key strategies can help you maximize the benefits from your investment in GitHub Copilot, leading to a more productive and fulfilled team.

## Key design strategies and checklist

1.  Create a plan that includes the weeks leading up to and weeks following your GitHub Copilot launch
2.  Use multiple communication channels and repeat the message often
3.  Attain executive sponsorship and support
4.  Prepare for both instructor-led and on-demand GitHub Copilot enablement
5.  Build an internal GitHub Copilot community
6.  Measure GitHub Copilot adoption, activity, and impact
7.  Continuously gather feedback and improve your GitHub Copilot program

## Assumptions and preconditions

1.  GitHub Enterprise Cloud (GHEC)
2.  Either GitHub Copilot Enterprise or GitHub Copilot Business (GitHub Copilot plans)

## Recommended deployment

### Plan your GitHub Copilot launch

It’s important to plan your GitHub Copilot launch carefully. Ensure that your plan has a dedicated individual accountable for its execution and includes elements related to technical administration, learning & development, and communication.

An example GitHub Copilot launch plan should include the following minimum elements:

#### Pre-launch

*   Set up GitHub Copilot policies for your Enterprise and/or Organization(s)
*   Establish a user onboarding process that enables self-service access to GitHub Copilot to reduce manual overhead
*   Communicate the launch date of GitHub Copilot to your organization
*   Create a channel of communication for technical challenges and feedback
*   Define time-bound Key Performance Indicators (KPIs) for GitHub Copilot adoption and activity metrics
*   Idenitfy a set of GitHub Copilot Champions to help drive adoption and provide feedback

#### Launch week (week 0)

*   Communicate the opportunity, benefits, and availability of GitHub Copilot to your organization
*   Provide on-demand training and resources for users to get started with GitHub Copilot

#### Post-launch (weeks 1-4)

*   Deploy an internal GitHub Copilot community (or “Expert Hub”) to share best practices, success stories, and helpful resources
*   Hold a series of instructor-led GitHub Copilot enablement sessions, including workshops, hackathons, and webinars
*   Send reminder emails, messages, and newsletters to encourage GitHub Copilot adoption

#### Post-launch (weeks 5-8)

*   Monitor GitHub Copilot adoption and activity metrics
*   Develop a GitHub Copilot reporting mechanism to track KPIs and derive meaningful insights about GitHub Copilot by using the Copilot Usage API and Copilot User Management API
*   Build on your GitHub Copilot Expert Hub with advanced training and resources specific to your organization
*   Gather feedback from users and iterate on your GitHub Copilot program

### Communicate early and often

Communication is key to a successful GitHub Copilot rollout. Use multiple channels to communicate the benefits of GitHub Copilot to your organization, including email, chat, internal documentation forums, town halls, and newsletters. Repeat the message often to ensure that users are aware of the opportunity and benefits of GitHub Copilot.

### Executive sponsorship

Driving GitHub Copilot adoption is most effective when backed with executive sponsorship and support. Engage with your organization’s leadership to secure their buy-in for your GitHub Copilot program. Executive sponsorship will help drive awareness, adoption, and accountability for GitHub Copilot usage across your organization.

### Prepare instructor-led and on-demand GitHub Copilot enablement

Instructor-led training is invaluable as it allows users to ask questions and receive immediate feedback as they are learning about GitHub Copilot. Instructor-led training can be delivered through interactive workshops, guided hackathons, and large-format webinars.

However, it is impractical to expect every user across large organizations to be able to join a live session. On-demand resources, like internal documentation, training modules, and video tutorials, can help users get started with GitHub Copilot at their own pace.

GitHub offers many free resources to help users get started with GitHub Copilot:

*   GitHub Copilot Fundamentals Course via Microsoft Learn
*   GitHub Copilot Learning Pathway
*   GitHub Copilot Youtube Playlist
*   GitHub Copilot Blog Posts
*   GitHub Copilot Quickstart Documentation

To best prepare your existing team and future hires, consider offering a mix of instructor-led and on-demand Copilot enablement resources.

### Build an internal GitHub Copilot community (or “Expert Hub”)

Building an internal GitHub Copilot community can help users share best practices, success stories, and helpful resources. An internal GitHub Copilot community can also help users connect with others who are using GitHub Copilot in similar ways, and can provide a forum for users to ask questions and share feedback.

A devoted GitHub repository or organization, along with GitHub native features like GitHub Discussions, can be used to denote answers to frequently asked questions, foster collaboration, and collect innovative ideas from your GitHub Copilot community.

Be sure to include other helpful resources for your GitHub Copilot community, such as:

*   Guidance on how to procure a GitHub Copilot license
*   On-demand training resources
*   GitHub Copilot documentation
*   A feedback channel to your GitHub administration team

### Measure GitHub Copilot adoption, activity, and impact

At its core, GitHub Copilot saves users time while coding. In order for GitHub Copilot to drive downstream impacts, the time saved needs to be spent towards a business objective (e.g. improving velocity, improving quality, learning & development, etc.).

See the article Measuring Impact for GenAI Adoption for a detailed, tiered approach to measuring Copilot’s impact.

### Continuously gather feedback and improve your GitHub Copilot program

Use surveys, focus groups, and feedback channels to collect feedback from users about their GitHub Copilot experience. Analyze this feedback to identify areas for improvement and make data-driven decisions to maximize the benefits of GitHub Copilot for your organization.

## Additional solution detail and trade-offs to consider

### Assigning licenses

GitHub Copilot licenses can be assigned in a few different ways, each with their own benefits and trade-offs. You can assign licenses to:

1.  All individuals in an organization
2.  Specific individuals in an organization
3.  Specific teams in an organization
4.  Specific teams in an enterprise

While assigning licenses out of a single organization can simplify license management, it restricts the granularity of Copilot telemetry data from the Copilot Usage API endpoint for organizations. If you would like to track GitHub Copilot usage across your GitHub Organizations, consider assigning licenses to specific teams or individuals in those organizations.

ℹ️

When a user receives a seat from multiple organizations in the same enterprise, GitHub takes care of deduplicating these seats before billing for the user.

### Setting up a self-serve process for licenses

When you’ve enabled GitHub Copilot in an organization or enterprise, you can set up a self-serve workflow to allow users to request licenses. This allows you to allocate licenses to people who want them, and means people can get started with Copilot quickly. For examples of license automation, see Setting up a self-serve process for GitHub Copilot licenses and Reminding inactive users to use their GitHub Copilot license.

### Automating license revocation

While automation can help manage costs associated with stale GitHub Copilot licenses, it can also lead to unintended consequences. For example, if licenses are revoked after a short window of inactivity, active users may be disrupted by their license revocation after spending some time on non-coding tasks. To avoid this, consider implementing a process that notifies users before their license is revoked, giving them time to renew it.

## Seeking further assistance

### GitHub Support

Visit the GitHub Support Portal for a comprehensive collection of articles, tutorials, and guides on using GitHub features and services.

Can’t find what you’re looking for? You can contact GitHub Support by opening a ticket.

### GitHub Expert Services

GitHub’s Expert Services Team is here to help you architect, implement, and optimize a solution that meets your unique needs. Contact us to learn more about how we can help you.

### GitHub Partners

GitHub partners with the world’s leading technology and service providers to help our customers achieve their end-to-end business objectives. Find a GitHub Partner that can help you with your specific needs here.

### GitHub Community

Join the GitHub Community Forum to ask questions, share knowledge, and connect with other GitHub users. It’s a great place to get advice and solutions from experienced users.

## Related links

### GitHub Documentation

For more details about GitHub’s features and services, check out GitHub Documentation.

Last updated on July 22, 2024

Engineering System Metrics