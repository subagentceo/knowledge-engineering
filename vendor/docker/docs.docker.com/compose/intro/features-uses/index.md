# Why use Compose?


## Key benefits of Docker Compose

Using Docker Compose offers several benefits that streamline the development, deployment, and management of containerized applications:

- Simplified control: Define and manage multi-container apps in one YAML file, streamlining orchestration and replication.

- Efficient collaboration: Shareable YAML files support smooth collaboration between developers and operations, improving workflows and issue resolution, leading to increased overall efficiency.

- Rapid application development: Compose caches the configuration used to create a container. When you restart a service that has not changed, Compose reuses the existing containers. Reusing containers means that you can make changes to your environment quickly.

- Portability across environments: Compose supports variables in the Compose file. You can use these variables to customize your composition for different environments, or different users.

## Common use cases of Docker Compose

Compose can be used in many different ways. Some common use cases are outlined
below.

### Development environments

When you're developing software, the ability to run an application in an
isolated environment and interact with it is crucial. The Compose command
line tool can be used to create the environment and interact with it.

The [Compose file](/reference/compose-file/) provides a way to document and configure
all of the application's service dependencies (databases, queues, caches,
web service APIs, etc). Using the Compose command line tool you can create
and start one or more containers for each dependency with a single command
(`docker compose up`).

Together, these features provide a convenient way for you to get
started on a project. Compose can reduce a multi-page "developer getting
started guide" to a single machine-readable Compose file and a few commands.

### Automated testing environments

An important part of any Continuous Deployment or Continuous Integration process
is the automated test suite. Automated end-to-end testing requires an
environment in which to run tests. Compose provides a convenient way to create
and destroy isolated testing environments for your test suite. By defining the full environment in a [Compose file](/reference/compose-file/), you can create and destroy these environments in just a few commands:

```console
$ docker compose up -d
$ ./run_tests
$ docker compose down
```

### Single host deployments

Compose supports production deployments on single hosts. You can use
Compose to deploy applications to remote Docker hosts and manage
production-specific configurations.

For details on using production-oriented features, see
[Compose in production](/compose/how-tos/production/).

## What's next?

- [Learn about the history of Compose](/compose/intro/features-uses/history/)
- [Understand how Compose works](/compose/intro/features-uses/compose-application-model/)
- [Try the Quickstart guide](/compose/gettingstarted/)

