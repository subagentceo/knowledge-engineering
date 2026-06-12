> ## Documentation Index
> Fetch the complete documentation index at: https://confidence-auth-testing.mintlify.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction to Confidence Identity & Access Management

Confidence implements a Fine-Grained Authorization (FGA) model that lets you
control who can see, create, and edit resources in Confidence.

Every list of resources that you can see throughout Confidence is automatically filtered by the current permissions.
This level of granular control ensures that sensitive information is only accessible to those who need it,
while still allowing for collaboration and experimentation within teams.
With Confidence, users can confidently explore and use resources without worrying about unauthorized access or accidental changes.

This video gives a quick overview of the central concepts and how to work with access management in Confidence in 3 minutes and 21 seconds.

<iframe className="w-full aspect-video rounded-xl" src="https://www.youtube.com/embed/IeuyyzkMpgI?si=hcYUCV3VnWq3w6HH" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />

## Key Concepts

Key concepts for the Identity & Access Management (IAM) system in Confidence are:

* [**Users**](./users) - A user is a person who has access to the Confidence workspace.
* [**Groups**](./groups) - A group is a collection of users (and service accounts).
* [**Roles**](./roles) - A role is a set of permissions that can be assigned to a user or a group.
* [**Policies**](./policies) - A policy gives a user or a group one or several roles.

You can grant a user or a group permission to a resource in three ways:

1. Through a [policy](./policies) that gives the user or the group permission to all resources of a certain type
2. By making the users or group the [owner](./roles#owner) of a resource (typically done when creating a resource)
3. Share a specific resource with a user or a group by selecting **Permissions** on the resource page

<Note>
  Manage the access for everyone on a resource by clicking 'Permissions' on the resource page and set the general access.
</Note>

## Get Started With Access Management

### Default Settings

Your Confidence workspace comes with:

* Predefined roles (full list in [roles documentation](./roles#predefined-roles)):
  * `Creator`: Creators have no general read and edit privileges, but can create any resource. They are the owners of the resources they create, and can edit them.
  * `Reader`: Can read everything
  * `Editor`: Can create, read, and edit everything
* A group called `Everyone` that all users belong to. You cannot remove this group.
* A policy giving the group `Everyone` the roles of `Creator` and `Reader`. This makes it possible for anyone to create any type of resource in Confidence, for example a flag, an A/B test, or a metric, and to see resources others have created. You can edit or remove this policy if you have the role `IAM Admin` or `Admin`.

When you create a resource, including instances of A/B tests and rollouts:

* The group `Everyone` has the role `Reader` by default. You can change this to `Editor`.
* The creator selects an owner, who gets the role of `Owner`. The owner, by extension, receives also the role of `Editor` for that resource.

### When to Use Policies versus Manual Permissions

A policy gives a group or a user a certain role that implies they can do
specific things, often for a specific type of resource. For example, you can
have a policy that gives the group 'Team A' the role of `Flags Editor` which
allows all users in 'Team A' to edit any feature flag. A manual permission gives
a user or a group read or edit rights for a particular instance of a resource.

Policies control permissions globally. When you give a user or group a role via a
policy, that group has that role for all resources that the role governs.
Returning to the example, if 'Team A' gets the role of `Flags Editor`, this
team can edit *all flags* regardless of flag ownership and manual permissions
set on individual instances of flags.

<Tip>
  Don't create policies that give groups or users `Editor` roles.
  Permission to edit is often better to handle at the resource level.
  `Reader` and `Creator` roles are often good to give via policies.
</Tip>

If you want to limit who can take certain actions on specific instances, make
sure that there are no policies for the roles that govern that action. For
example, if you want to limit who can edit an experiment on each experiment
itself, there must be no policy giving the role `Editor` to any
user or group. If you have a central experimentation team,
add an `Experiment Editor` role to the group of that team.

### Handle New Users and Users Without Groups

Use a policy on the group `Everyone` to set the ground rules for what everybody
can do. By default, Confidence has a policy that gives the group `Everyone` the roles of `Creator` and `Reader`.

Make sure to have a policy for the `Everyone` group in place, to handle users
that have no direct or indirect ownership. Confidence comes with a policy that
configures everyone to be a `Creator` by default. Change this under **Admin >
Policies**.

Learn more about the concepts of Confidence Identity & Access Management:

## Related Resources

<CardGroup cols={2}>
  <Card title="Users" href="/docs/iam/users">
    Manage user access
  </Card>

  <Card title="Groups" href="/docs/iam/groups">
    Organize users into groups
  </Card>

  <Card title="Roles" href="/docs/iam/roles">
    Understand predefined and custom roles
  </Card>

  <Card title="Policies" href="/docs/iam/policies">
    Grant permissions to users and groups
  </Card>
</CardGroup>
