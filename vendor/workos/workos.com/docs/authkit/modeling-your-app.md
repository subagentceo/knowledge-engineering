# Modeling Your App

## Introduction

WorkOS has a wide suite of products to solve your business needs. This guide explains some of the common choices when it comes to modeling your integration.

WorkOS is designed to support a wide array of use cases and architectural scenarios, from simple business-to-consumer (B2C) user authentication to complex business-to-business (B2B) architectures with multiple organizations and authentication policy enforcement.

Features are designed to grow with you, allowing you get started easily and expand your security options as you onboard larger and larger enterprise customers.

Whether you are looking to add the initial authentication piece to a new application, or exploring migration from an existing vendor, you may find yourself asking:

- Does WorkOS fit into my existing architecture?
- Can I start small and later adopt more features?
- I have very specific requirements, can I still use WorkOS?

In most cases the answer is yes, and the aim of this guide is to help you understand how. We'll cover the terminology used in this space, describe some common B2C and B2B flows, and finally demonstrate some scenarios that explain how everything fits together.

## Understanding the authentication flow

Supporting Email + Password, Single Sign-On, OAuth, Magic Auth, and other authentication concerns on your own is a complex task. You'd need to understand the authentication process, as well as model your applications sign-in and signup user interfaces to account for and handle all possible routes, error states and edges cases.

There are three main ways to add WorkOS authentication to your application:

### AuthKit

A [hosted login solution](https://workos.com/docs/authkit) that provides a customizable UI and supports a wide range of authentication methods.

### Custom AuthKit UI

If you prefer to craft your own UI in your own stack, you can use the [AuthKit APIs](https://workos.com/docs/reference/authkit) directly.

### Standalone Single Sign-On (SSO)

For applications that are only interested in [SSO capabilities](https://workos.com/docs/reference/sso).

In the majority of cases we recommend using the hosted AuthKit solution.

![AuthKit authentication flow diagram](https://images.workoscdn.com/images/12d849cf-c710-493d-a189-48264d1c3ed7.png?auto=format\&fit=clip\&q=80)\[border=false]

On successful completion, AuthKit will return an authentication code to your application via your specified redirect URI, this is exchanged for the user object and used to create a session.

See the [Quick Start guide](https://workos.com/docs/authkit) for more information on how to implement this.

## Authentication methods

Prior to building your integration, it is useful to think about which authentication methods are part of your requirements. Typical consumer authentication methods include the following:

### Email + Password

The most common method of authentication, users sign up or sign in to your app with email and password. This method is enabled by default.

### OAuth

OAuth, also known as Social Login, is when a user logs in with an account belonging to a different service. Examples include logging in with your Google, Microsoft or GitHub account instead of making a new account with your app. These authentication methods can be configured from the WorkOS dashboard.

### Magic Auth

Also known as Passwordless, Magic Auth authentication works by emailing the user a unique, one-time-use 6 digit code which they then use to authenticate.

A similar technique is Magic Link, where the user can log in by clicking a link emailed to them. This method has proven to be unreliable as IT teams often employ security measures that scan user emails and programmatically click any links found in the email, invalidating the Magic Links. As such, WorkOS has deprecated Magic Links in favour of Magic Auth.

### SSO

The favored authentication method by enterprise sized companies, SSO allows an organization's users to sign in with a single ID to related, yet independent software systems.

The AuthKit APIs make the above easy to implement using your own UI, or you can use AuthKit's Hosted UI for a fully hosted experience.

## Single-tenant and multi-tenant models

You might encounter the concepts of single-tenant and multi-tenant when discussing an application's authentication model. Single-tenant and multi-tenant architectures offer different approaches to managing resources and data in software applications, especially in cloud services or Software as a Service (SaaS) environments.

![Diagram of single and multi-tenant models](https://images.workoscdn.com/images/48ef829e-6758-4606-a696-7963beb803b2.png?auto=format\&fit=clip\&q=80)\[border=false]

### Single-tenant

In the context of authentication and authorization, single-tenant refers to a software architecture where a separate instance of the software is set up for each client on separate servers or virtual machines.

Each organization is paired with its own instance of both the application and the underlying database. This approach offers full data isolation between customers, but comes at the cost of being more resource-intensive and costly. Each client's setup may require separate maintenance, updates, and support.

### Multi-tenant

Multi-tenant refers to a software architecture where a single instance of the software serves multiple customer organizations, known as tenants.

Each tenant's data is isolated and remains invisible to other tenants because the software is designed to securely handle this data across all tenants.

In the context of WorkOS, a multi-tenant application could be accomplished by the use of [Organizations](https://workos.com/docs/reference/organization) and [Organization Memberships](https://workos.com/docs/reference/authkit/organization-membership) to ensure that end-users only have access to the data they are authorized to.

By default WorkOS comes with two environments: staging and production. The former is for development and testing, the latter for live traffic. For single-tenant applications, new environments can be added to your WorkOS account to accommodate each of your users. For more information or to request new environments, please reach out to [support](mailto:support@workos.com).

## Simple B2C model

![Simple B2C model](https://images.workoscdn.com/images/55ffa6da-ec2b-4f03-881c-3f68e5a2a818.png?auto=format\&fit=clip\&q=80)\[border=false]

In a simple B2C model, all users belong to the application, users do not require assignment or management by an organization in order to perform actions or access resources. In this model your customer is also the end-user, they sign up or sign in to your app in order to use your services without being associated with an organization.

### User data in B2C models

It's common to have a single users table in your database linking to the WorkOS user (among other services), you may optionally decide to use WorkOS as the source of truth for other user information such as `firstName`, `lastName` or `email`, though this depends on your application requirements.

In this model, WorkOS's primary role is to authenticate users and store them in a simple, flat structure. This is the default model and is the simplest to implement, but as your needs grow you may find yourself needing to add additional functionality.

## B2B modeling

In contrast to the B2C example, a typical B2B model introduces the concept of Organizations.

Organizations relate a set of users and provide a structure to manage and enforce authentication methods and resource access. We can extend our previous diagram to introduce this concept.

![B2B model](https://images.workoscdn.com/images/21e07368-ab1a-460e-8dcb-499d763cbdd4.png?auto=format\&fit=clip\&q=80)\[border=false]

In this model, we have a one-to-many relationship between users and organizations, a user can belong to many organizations and an organization can have many users, this relationship is expressed by our Organization Membership table. Unlike the B2C example, the customer here is a (usually enterprise) company that has its own users, typically employees or contractors.

While you can still use all the authentication methods outlined above with B2C models, the main difference between B2C and B2B is that the latter tends to prefer SSO as its authentication method of choice.

This model starts to become incredibly powerful as we can now capture more complex scenarios. For example, we could leverage features such as domain verification and domain policies to control authentication behavior and provision members automatically.

### Domain verification and domain policies

[Domain verification](https://workos.com/docs/authkit/domain-verification) is the process of proving ownership of a specific domain, typically handled by a company's IT department. Once a domain is verified, all existing and future users with email addresses matching the domain are, by default, managed by the organization's [domain policy](https://workos.com/docs/authkit/organization-policies/domain-policy). This allows the organization to control authentication and membership behavior for these users, such as requiring these users to authenticate via SSO.

Users signing in with SSO with a verified email domain are automatically considered verified and do not need to complete the email verification process.

### Integrating SSO with the Admin Portal

When onboarding a new enterprise customer, they will likely ask to integrate their SSO connection provided by their own Identity Provider (IdP) with your application.

The Admin Portal provided by WorkOS makes this process easy to implement by providing a hosted UI that guides your user through SSO configuration.

![Admin Portal flow](https://images.workoscdn.com/images/77050e33-5dcc-480f-a0a7-3f46a6b33abf.png?auto=format\&fit=clip\&q=80)\[border=false]

With the Admin Portal, the process of configuring your customer's SSO integration is reduced to creating an Organization in WorkOS, saving relevant data in your own database and then redirecting the user to the Admin Portal to guide them through the configuration flow.

### User data in B2B models

As with B2C models, user data on the WorkOS side can be used as the source of truth, but the far more common scenario is to store user information in your own database which links to the WorkOS user.

The AuthKit and SSO products can be used independently, with the latter acting as authentication middleware which intentionally does not handle user database management for your application. If you're unsure which is best for your business, it's recommended to stick with AuthKit as it gives you the aforementioned flexibility to add and/or remove features as your needs grow.

## Example scenarios

As your application grows you may find yourself needing to add additional features to support customer needs. AuthKit is designed with this is mind. As you move upmarket and take on larger and larger customers, you can easily adopt and extend your feature set within an established architecture. The following scenarios explain some common use cases with specific feature sets.

- [SSO with contractors](https://workos.com/docs/authkit/sso-with-contractors) – Enforcing Organization SSO with external guest members.
- [Invite-only Signup](https://workos.com/docs/authkit/invite-only-signup) – An invite only application that allows existing users to invite new members.
