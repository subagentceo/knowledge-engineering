-   [](/)
-   Introduction

On this page

# Welcome to OpenFeature

OpenFeature is an open specification that provides a vendor-agnostic, community-driven API for feature flagging that works with your favorite feature flag management tool.

## What are feature flags?[​](#what-are-feature-flags "Direct link to What are feature flags?")

In the most basic case, you can think of a feature flag as an if/else statement that can be controlled at runtime. Feature flags allow application behavior to be altered without the deployment of new code.

This capability serves a variety of purposes. You can reduce the need for long-running feature branches. You can hide work-in-progress functionality from end users, while still exposing it for internal testing. You can perform canary releases - rolling out a new feature to an initially small subset of users. You can perform A/B testing. You can safely degrade parts of a production system that are experiencing an outage. You can restrict access to specific product functionality based on user-characteristics such as geography or IP address, for usability, compliance or licensing reasons.

Feature flags are _dynamic_; they are evaluated at runtime. Many of the use cases just described also require feature flags to be _context-aware_ - a flagging decision must take into account things like which user is making a web request. What's more, the configuration behind flagging decisions also needs to be dynamic to support use cases like canary releases where you gradually roll a feature out to more users without having to redeploy or restart anything.

Given all these requirements (along with others such as an admin UI, audit trails, environment management, and more) it's clear that full use of feature flags requires a feature flagging system - typically a stand-alone feature-flagging service along with a client library which interacts with that service.

![](/assets/images/ff-service-9bfd5d029bfcd0ebbea6c6cab79b6a14.png)

_A typical feature-flagging system_

## What is OpenFeature?[​](#what-is-openfeature "Direct link to What is OpenFeature?")

OpenFeature provides a shared, standardized feature flagging client - an _SDK_ - which can be plugged into various 3rd-party feature flagging _providers_. Whether you're using an open-source system or a commercial product, whether it's self-hosted or cloud-hosted, OpenFeature provides a consistent, unified API for developers to use feature flagging in their applications.

![](/assets/images/of-architecture-a49b167df4037d936bd6623907d84de1.png)

_OpenFeature integrated with a hypothetical "Flags-R-us" flag management system_

To accomplish this, the OpenFeature SDK defines a number of flexible abstractions.