# How we release Flex

## Overview

We're always looking to innovate and make our services better, so our APIs and features may change over time.

Changes to Twilio Flex are released in the following ways:

* Flex UI versions
* Feature releases
* Changes to system configuration and defaults

In addition, Twilio Flex relies on many of the underlying products within the Twilio platform. These products allow you to customize Twilio Flex and extend native functionality. Updates to these products may expose additional features you can adopt into your Flex deployment.

## Beta features

Twilio Flex incorporates products and features that are in pilot or beta stages. We release features in these preliminary stages to expose our latest development while we continue to improve edge case handling, scalability, and reliability. [Our API SLA](https://www.twilio.com/en-us/legal/service-level-agreement) and [our support plans](https://www.twilio.com/en-us/support-plans) don't apply to pilot or beta products and features. However, if possible, our customer support team will assist you with questions regarding the way Twilio Flex uses pilot or beta products and features.

> \[!NOTE]
>
> In 2019, the [Twilio API for WhatsApp](https://www.twilio.com/en-us/messaging/channels/whatsapp) and the [Twilio Functions & Assets API](/docs/serverless/api) are in beta. Flex has native support for WhatsApp messages without media, and developers can use the Functions & Assets API to automate the deployment and hosting of their [Flex Plugins](/docs/flex/developer/ui-and-plugins). Those products are not covered by a Twilio SLA, and questions about the use of their APIs are [handled directly by their engineering teams](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-Product-Support). But Twilio Support will address questions related to the configuration of these products with Flex - for example, updating a WhatsApp number's message handler to route through Flex.

## Twilio Flex UI versions

The Twilio Flex client libraries are our primary distribution platform for new changes to Twilio Flex. We use [semantic versioning](https://semver.org/) for these releases. All of our available versions and their release candidates are published on [NPM](https://www.npmjs.com/package/@twilio/flex-ui).

* **Major releases (1.x.x)**: Backward-incompatible changes to our APIs or dependencies. Major changes to the UI that may influence design customizations.
* **Minor releases (x.1.x)**: New features, bug fixes, and backwards-compatible dependency updates.
* **Patch releases (x.x.1)**: Security patches and critical bug fixes.

Minor versions to the Flex UI are released approximately 5 times per year. Patch versions are released on an as-needed basis if there are necessary changes that must be introduced before the next scheduled minor release. Major versions are not released on a regular schedule.

Release candidates (x.x.x-rc1) are released on an as-needed basis to enable additional testing before that version's stable release. Release candidates allow you to test new features and APIs as soon as possible. However, those features may change before the stable release. You shouldn't use release candidates in production.

### Release lifecycle

The Flex UI release lifecycle has three stages:

* **Supported**: Customer support is provided in accordance with our support plans.
* **Maintained**: Critical bug and security fixes may be introduced as patch releases.
* **End-of-life**: This version is unsupported. We recommend upgrading to a supported version.

> \[!WARNING]
>
> Alpha and beta releases of Flex UI are considered pre-GA, and we exclude these from ongoing support whenever a new version is released. Pre-GA versions move straight from *supported* to *end-of-life* when a new version is released.

#### Major versions (1.x.x)

We *support* each major release of the Flex UI until a new major version is available. When a new major version is released, we *maintain* the previous major version for at least 12 months before it is *end-of-life*.

When maintenance ends for a major version, *all* minor versions of that major version are **end-of-life** and no longer supported.

#### Minor versions (x.1.x)

We *support* the latest minor release version from the most recent major release and actively *maintain* the previous minor release for an additional 6 months from the latest minor version's release.

When the maintenance period ends for a minor version, it is *end-of-life* and no longer supported.

> \[!NOTE]
>
> Suppose the latest version is 2.2.1. That version (2.2.x) would be under active maintenance and would receive patch updates. New features and other updates will only be introduced in the next release.
>
> If the next release is a minor release (2.3.0), we maintain the previous version (2.2.1) for 6 months before that minor version is end-of-life.
>
> If the next release is a major release (3.0.0), we maintain the previous version (2.2.1) for another 12 months before the major version and all minor versions are end-of-life.

#### Patch versions (x.x.1)

We release patch versions as interim releases between minor versions to resolve issues and handle external changes. We recommend always using the latest patch version. To encourage this, we replace the previous patch version with the latest. Patches always have the same status (supported, maintained, or end-of-life) as their minor version.

#### End-of-life versions

When a version of Flex UI is end-of-life (EOL), support for that version ends. You can still install and use an end-of-life version of Flex UI but it may not operate as intended. There won't be any further code changes to end-of-life versions, including bug fixes or security updates. Check the [Flex UI minor version End-of-life reference page](/docs/flex/flex-ui-eol-reference) for EOL dates and guidance on version upgrades.

> \[!WARNING]
>
> SLAs do not apply if you encounter issues caused by running an end-of-life version of Flex UI.

End-of-life versions will be displayed on the [**Flex UI versions** page](https://console.twilio.com/us1/develop/flex/settings/ui-versions) and can be installed. You can also specify an end-of-life version in Flex UI config. All previous versions are also available via NPM.

### flex.twilio.com

Our cloud environment, flex.twilio.com, allows you to run Flex UI without building, deploying, and updating the app yourself. We recommend using the latest version. However, all minor releases from the current major release are available, as well as the last minor release of the previous major release.

By default, all accounts are configured to automatically update to new Flex UI minor releases. You can modify how your account is updated using these settings on the [**Flex UI versions** page](https://console.twilio.com/us1/develop/flex/settings/ui-versions):

* **Update minor versions**: Enabled by default for new accounts. This means that new minor versions are automatically applied to your account when they're released. You'll get advance notice in the Twilio Console notification center 7 days before your account is updated.
  * To opt out of automatic updates, disable this setting. Your account will remain on your current minor version unless you manually install a different version. Remember to manually update your Flex version regularly to receive the latest features and updates and to ensure that you remain on a supported version. You can opt in to automatic updates again later if you change your mind.
  * All accounts, regardless of this setting, continue to update to the latest patch version of the installed minor version.
  * Because new major versions may include breaking changes, we won't automatically update your Flex instance to new major versions. You control when to apply those updates.
* **Be first in line**: We roll out releases gradually over the span of a few weeks. If you opted in to automatic updates, you can enable this setting to receive new minor versions as soon as they're available. We recommend enabling this setting on accounts used for development or testing purposes so you can explore new features right away. When this option is selected, you won't get advance notice of upcoming automatic version updates, because those notifications only apply to accounts that are part of the gradual rollout process.

## UI versions and features

Each version of Flex UI includes features, APIs, and client SDKs that define the experience of your users. Major features, such as Insights and Webchat, may have versions or releases of their own. They have their own release stages (pilot, beta, GA) and are compatible with specific version ranges of Flex UI.

Many individual features are bundled as part of a new Flex UI version. Larger and more complex features may be released in phases. For example, a new feature within Flex may go through this lifecycle:

* Available for select customers to opt-in
* Enabled for all newly created accounts
* Enabled for all existing accounts

### Turning on features

When features have a phased rollout, you may be able to turn them on from the [opt-in features](https://console.twilio.com/us1/develop/flex/manage/features/ga) page. Opting in allows you to start using features that aren't automatically turned on for every account.

If a feature is in the pilot stage, we're evaluating whether the feature should be developed into a GA release. These features may not be included in future releases and may be removed without prior announcement.

We intend for all of our beta and GA features to eventually be included within Flex UI and enabled by default for all accounts. If a feature is potentially too disruptive to turn on for everyone, it may remain an opt-in feature until the next major release.

### Deprecating features

Some features within Flex UI may need to change to provide a better developer experience or meet customer needs. For features within the client libraries, we'll mark functions as deprecated. If you invoke those features, they'll execute normally and generate a warning within the JavaScript console. In most situations, a deprecated function has an alternative that we'll direct you to use. These deprecated functions are identified in our public [changelog](https://www.twilio.com/en-us/changelog) and release notes and would be removed in the following major release.

Invoking a deprecated feature outside the client libraries, such as within one of Flex's REST APIs, generates a warning event. These events are available in the [Twilio error logs](https://www.twilio.com/console/debugger/errors) and the [Monitor REST API](/docs/usage/monitor-alert).

## Configuration and defaults

When Flex is provisioned, we update your account to configure a suite of services, like TaskRouter, Phone Numbers, and Conversations. As new features are released, these features may require updates to the configuration of other Twilio products. If we identify that these changes can be applied to your account without breaking compatibility, we'll apply the updates as part of the feature release process.

If configuration or system defaults are updated when releasing new features, these are included alongside the Flex release notes. Where possible, running the Flex [system checkup](https://www.twilio.com/console/flex/checkup) can help you identify if your account configuration doesn't match what's needed to load Flex UI or use certain features.
