# Custom Plugins Dashboard

The **Custom Plugins Dashboard** enables admins to manage their custom plugins, view the history of custom plugin releases, and rollback to prior deployments. This provides visibility and control of your plugin's version outside of a developer's command line interface.

> \[!WARNING]
>
> The **Custom Plugins Dashboard** allows you to manage plugins that have been deployed through the Plugins [API](/docs/flex/developer/plugins/api) or [CLI](/docs/flex/developer/plugins/cli). While the **Custom Plugins Dashboard** displays all your legacy plugins, they [must be migrated](/docs/flex/developer/plugins/migrate) to use this new interface.

## Navigate to the Custom Plugins Dashboard

You can access the [Custom Plugins Dashboard](https://flex.twilio.com/admin/plugins/custom) by logging in as a Flex Admin. Click **Plugins** in the Admin dashboard.

## Stage Custom Plugin Changes

![Manage Plugins dashboard showing plugin-sample-two enabled with version 1.2.0 validated.](https://docs-resources.prod.twilio.com/fec08299e5e58a07a9749bbf3857ab42714ba0673532b3aee62bd5684704051d.png)

The dashboard displays all of the custom plugins that have been deployed to your Flex. Each custom plugin is displayed with its current status: whether the plugin is enabled, the version that is live, and whether the plugin has been [validated](/docs/flex/developer/plugins/cli/deploy-and-release).

If your plugins appear as **Validated**, it means that validation has been run for that version of your plugin. However, it does not mean that all issues have been addressed. A plugin with warnings still appears as **Validated**.

If you see **Not validated** next to any of your plugins, it means that validation has not been run for that plugin version. Not validated status doesn't affect the behavior of that plugin. However, we recommend re-deploying your plugin using the latest version of the Flex Plugins CLI, which automatically validates your plugin and provides recommendations to improve the compatibility of your plugin with future Flex UI releases. For more details, see [Validating a plugin](/docs/flex/developer/plugins/cli/deploy-and-release).

As you make changes to your custom plugin configuration, Flex will stage your changes in a "*pending release*".

**Change a Custom Plugin Version**

Click on the custom plugin you'd like to modify. A panel will display detailed information about each version of the custom plugin. Select a new version and click "Save". This will stage the new version of the custom plugin for your next release.

**Enable/Disable a Plugin**

The **Status** option on each custom plugin identifies whether the custom plugin is active for your users. Click the row of the custom plugin to enable or disable the selected plugin and stage the change for your next release.

## Release your new Custom Plugin Configuration

Once you've selected the correct versions and enabled each custom plugin you want, it's time to create a release and roll out your updates to agents.

Click **Pending Release**, then give the release a name and a description that you can use to remind yourself of what you changed. When you're ready, click **Release** and confirm the release.

The dashboard will update to reflect your changes. Your agents will receive an updated experience the next time they load Flex or refresh their browser's active page.

## Roll back a Release

![Manage Plugins page showing Plugin Sample 2 with redeploy button.](https://docs-resources.prod.twilio.com/ecd54b50c6bc3437abb4fb7aed680f575b52f27cb9a5371d10d244f64ef29d26.png)

Flex keeps track of all the custom plugin updates you release to your agents. To roll back to a prior release, navigate to the "*Releases*" tab on the Custom Plugin Dashboard. Each section within the "*Releases"* tab contains details about the custom plugin configuration that was live for your agents. This will include any description you provided during the release that explains the update.

On a prior release, click the "*Redeploy*" button. You'll see a preview of the changes that will be made to your active plugin configuration. If you're comfortable with the changes, click "*Confirm*" to redeploy your prior custom plugin configuration. Your agents will receive an updated experience the next time they load Flex or refresh their browser's active page.

## Managing Legacy Custom Plugins

Legacy custom plugins were deployed using the previous methods of `npm run deploy` in the Plugin Builder or dragging-and-dropping plugins into Twilio Assets. They can be identified via the `flex-plugin` dependency within their `package.json`. The Custom Plugins Dashboard displays all active legacy custom plugins alongside plugins that are managed by the Plugins API.

Legacy custom plugins cannot be managed via the Plugins Dashboard until they have been migrated to use the Plugins API. That will allow you to manage the version of the custom plugin or disable/enable the custom plugin for your agents.

If you see custom plugins tagged as **Duplicate**, this may indicate you have not completed the migration of a legacy custom plugin. Refer to our [migration guide](/docs/flex/developer/plugins/migrate#4-remove-legacy-plugins) to remove legacy custom plugin assets and complete your migration.

![Plugin-yelp marked as legacy and duplicate, enabled version 1.0.1, last updated July 27, 2020.](https://docs-resources.prod.twilio.com/48f46f23d0e9bf842010e6de975a64949a6504d659721061e2242c80d5b33756.png)
