# Flex UI and Flex Plugins

> \[!WARNING]
>
> For Customers building HIPAA-compliant workflows with Flex UI, Customers are responsible for ensuring that in the case that PHI will be exposed through Flex UI, that only those that are authorized to access PHI have access to Flex. In some scenarios, PHI may be available to be downloaded by an Agent to their workstation from Flex UI. It is the responsibility of the customer to ensure that those with access have proper training on HIPAA prior to being given access. To learn more about building for HIPAA compliance, please visit the latest requirements [here](https://docs-resources.prod.twilio.com/documents/architecting-for-HIPAA.pdf).

## Flex UI programmability

The Flex UI allows developers to build a custom user experience and custom behaviors for the Flex agents and supervisors. You can leverage a set of [client-side public interfaces](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/) to customize the look and feel, alter the behavior, and [introduce additional features](/docs/flex/solutions-library) to the out-of-the-box experience.

The Flex UI provides a wider range of programmable capabilities:

* Configure the UI or manipulate default properties for standard Flex components
* Customize themes and styles
* Control localization and templates
* Add, replace, or remove components
* Manage UI actions by listening, intercepting, and manipulating UI events
* Customize agent desktop notifications using the Notifications Framework
* Alter the behavior and appearance of native channels and define custom ones with the Task Channel Definitions API
* Mix in Task or Theme context to your custom components
* Use the Flex Manager object to access and control underlying SDKs

You can find a detailed description of all the Flex UI programmable interfaces in our [API Docs](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/) and a collection of developer guides with examples of how to use them.

> \[!NOTE]
>
> You can see which version of the Flex UI you are currently using on the [Flex Overview](https://console.twilio.com/us1/develop/flex/overview?frameUrl=%2Fconsole%2Fflex%2Foverview%3Fx-target-region%3Dus1) page in the Twilio Console.

## Flex Plugins

> \[!WARNING]
>
> For Customers building HIPAA-compliant workflows with Flex Plugins, Customers are responsible for ensuring that any plugin developed and used are done so in a HIPAA compliant manner. This also includes not inserting PHI into error messages that may be collected by Flex (or any other third party services) for debugging and/or troubleshooting purposes. Twilio cannot guarantee plugins developed by a third-party, regardless of whether they are an official partner of Twilio or not, are HIPAA compliant. Plugins developed by Twilio Professional Services must not be assumed were developed with HIPAA considerations. It is the responsibility of the customer that wishes to use such plugins to ensure they are developed and used in a HIPAA compliant manner. To learn more about building for HIPAA compliance, please visit the latest requirements [here](https://docs-resources.prod.twilio.com/documents/architecting-for-HIPAA.pdf).

Flex Plugins are the recommended way of customizing the Flex UI. Plugins have access to all of the frontend APIs: [adding and replacing components](/docs/flex/developer/ui/work-with-components-and-props), using the [Actions Framework](/docs/flex/developer/ui/use-ui-actions), triggering [notifications](/docs/flex/developer/ui/work-with-notifications), and more. They also provide a few additional benefits:

* Plugins can be applied to any running Flex instance. This lets you use the same plugins across projects that simulate **dev/stage/prod** environments, and it's also the preferred path for any partner integration.
* It decouples the customizations from individual `flex-ui` versions. As new versions are released, the plugins do not need to be rebuilt and redeployed.
* It allows for modular development. Plugins can be scoped to particular pages, personas, or functions to help separate concerns.

Flex provides the following tools to help you build and manage your Plugins:

* The [Flex Plugin Library](/docs/flex/developer/plugins/plugin-library) is a collection of readymade plugins that can be installed in a few clicks.
* The [Flex Plugins CLI](/docs/flex/developer/plugins/cli) is an interface for developing, testing, and releasing plugins.
* The [Flex Custom Plugins Dashboard](/docs/flex/developer/plugins/dashboard) enables admins to manage their custom plugins, view the history of custom plugin releases, and roll back to prior deployments.
* The [Flex Plugins API](/docs/flex/developer/plugins/api) powers the CLI and the Dashboard.

## Next steps

* Install plugins from the [Flex Plugin Library](/docs/flex/developer/plugins/plugin-library).
* [Create your first plugin](/docs/flex/quickstart/getting-started-plugin) using our quickstart guide.
* View sample solutions in the [Solutions Library](/docs/flex/solutions-library).
* Build your customizations using the [Flex UI APIs](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/), [Actions Framework](/docs/flex/developer/ui/use-ui-actions), and [creating custom components](/docs/flex/developer/ui/creating-styling-custom-components).
* [Deploy your plugins](/docs/flex/developer/plugins/cli/deploy-and-release) to your agents, and [keep your development environment up-to-date](/docs/flex/developer/plugins/updating).
