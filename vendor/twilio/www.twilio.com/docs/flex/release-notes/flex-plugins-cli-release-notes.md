# Flex Plugins CLI release notes

This page provides release notes for the Flex Plugins CLI and information about how to upgrade to [version 7.x](#upgrading-to-7x).

> \[!NOTE]
>
> If this page isn't what you're looking for, one of these links might help:
>
> * For information about how to use the Flex Plugins CLI, see our [Flex Plugins CLI documentation](/docs/flex/developer/plugins/cli).
> * For the release notes for Flex UI, see [Flex UI version 2.x.x](/docs/flex/release-notes/flex-ui-release-notes-for-v2xx).
> * For updates on other components of the Flex platform, see the [Twilio Changelog](https://www.twilio.com/en-us/changelog) and select the **Flex** product.

> \[!WARNING]
>
> Beginning September 10, 2024, you must use Node v18 or later with all supported versions of the Flex Plugins CLI. If you are using an older version of Node.js, please upgrade.
>
> Note that [OpenJS no longer supports Node v16](https://nodejs.org/en/blog/announcements/nodejs16-eol).

## 7.1.1

Release date May 26, 2025

### Added

* Added support for Node v22.

## 7.1.0

Release date December 13, 2024

### Fixed

* Updated `package.json` as follows:
  * Added `@twilio/flex-plugin` to `dependencies`.
  * Moved  `@twilio/flex-plugin-scripts` from `dependencies` to `devDependencies`.
* Security updates and enhancements

## 7.0.6

Release date September 24, 2024

### Fixed

* Fixed plugin deployment issues for legacy plugins migrated via the CLI.

## 7.0.5

Release date September 11, 2024

### Fixed

* Fixed warnings and errors on [`babel/plugin-proposal-private-property-in-object`](https://babeljs.io/docs/babel-plugin-transform-private-property-in-object).
* Fixed an issue that occurred when using the Flex Plugins CLI in [yarn](https://yarnpkg.com/getting-started) workspaces.

## 7.0.4

Release date August 30, 2024

### Fixed

* Fixed an issue that caused the Flex Plugins CLI v6.4.2 to be installed instead of the latest version if the installation script doesn't specify a version.

## 7.0.3

No updates.

## 7.0.2

Release date August 16, 2024

### Fixed

* Fixed a Node version compatibility issue that occurred due to a Cheerio package dependency. The Flex Plugins CLI now works correctly with supported Node versions earlier than v18.17.

## 7.0.1

Release date July 24, 2024

### Fixed

* Upgraded the Paste versions of the plugin template to fix conflict warnings.
* Fixed the "Failed to load remote plugins" issue that occurred when using the `--include-remote` flag.

## 7.0.0

Release date June 10, 2024

### Summary

The Flex Plugins CLI can now help validate your plugins against the latest Flex UI version to ensure compatibility. For details about the latest features being built on the CLI, see our [Flex Plugins CLI documentation](/docs/flex/developer/plugins/cli).

### Highlights

* Added a new command: `twilio:flex:plugins:validate`. For details, see [Validate](/docs/flex/developer/plugins/cli/reference#validate) in the [Plugins CLI reference](/docs/flex/developer/plugins/cli/reference).
* Updated the `twilio:flex:plugins:deploy` command to implicitly validate the plugin. For details, see [Deploy](/docs/flex/developer/plugins/cli/reference#deploy) in the [Plugins CLI reference](/docs/flex/developer/plugins/cli/reference).
* Integrated telemetry for all the commands.
* Fixed security vulnerabilities by upgrading Webpack Dev Server to v4.
* Enhanced the CLI version update notifier feature and added deprecation notification so that you can always be on the stable version of the CLI.
* Removed unused dependencies in `@twilio/flex-plugin-scripts` package.

### Breaking changes

* Because the `twilio:flex:plugins:deploy` command now validates plugins as part of the deployment process, version 7.0.0 and later can disrupt automated deployments, such CI/CD pipelines. When the Deploy command runs, if the validation process finds any errors, the deployment process stops to ask for input. To prevent this issue, use the `--bypass-validation` option on your Deploy command to skip plugin validation for automated deployments. For details, see [Deploy](/docs/flex/developer/plugins/cli/reference#deploy) in the [Plugins CLI reference](/docs/flex/developer/plugins/cli/reference).
* As of August 16, 2024, Node v16 is no longer supported. Plugins must be compatible with Node v18 or later.
  * This update supersedes the original release note published on June 10, 2024, which indicated that Node v14 is no longer supported and that plugins must be compatible with Node v16.x or later.

### Upgrading to 7.x

#### Upgrade using CLI

Install the Twilio CLI and the Flex Plugins extension as described in the Flex Plugins CLI overview. Then, go to the plugin directory and run the following command:
`$ twilio flex:plugins:upgrade-plugin --install`

This script automatically upgrades your plugin to the latest version.

#### Upgrade manually

To manually upgrade to version 7.x, modify your package.json:

```json
{
  "scripts": {
    "postinstall": "flex-plugin pre-script-check"
  },
  "dependencies": {
    "@twilio/flex-plugin": "7.1.0",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "prop-types": "^15.7.2",
    "@twilio-paste/core": "^15.3.1",
    "@twilio-paste/icons": "^9.2.0"
  },
  "devDependencies": {
    "@twilio/flex-plugin-scripts": "7.1.0",
    "@twilio/flex-ui": "2.10.0",
    "react-test-renderer": "17.0.2",
    "typescript": "^4"
  }
}
```

## 6.4.2

Release date August 16, 2024

### Fixed

* Fixed a Node version compatibility issue that occurred due to a Cheerio package dependency. The Flex Plugins CLI now works correctly with supported Node versions earlier than v18.17.

## 6.4.1

Release date May 15, 2024

### Fixed

* Added support for making cache setup optional for the HTTP client instance.
* Removed caching for the HTTP client instance used in `flex-plugins-api-client` to fix the CORS issue observed for some of the Flex Plugins APIs in the browser due to an unrecognized cache header.

## 6.4.0

Release date May 10, 2024

### Fixed

* Security updates.

## 6.3.3

Release date April 4, 2024

### Fixed

* Fixed an issue with loading remote plugins in localhost that began when Flex started using partitioned cookies to the store the Flex JWE token.

## 6.3.1

Release date February 8, 2024

### Fixed

* The `ECONREFUSED` error that was observed in Node versions 17 and higher is fixed.

## 6.3.0

Release date February 6, 2024

### Fixed

* The `terser-webpack-plugin` issue observed when plugin is built is fixed.
* The issue with the creation of `source-map` file is addressed.
* One critical and four high vulnerabilities in packages have been addressed.

### Upgrades

* The Twilio Serverless build API always uses the latest Node runtime version.
  Webpack is reverted to the latest stable v4 (4.47.0), as many of the dependencies that plugins use are not compatible with webpack v5 yet. Following are some of the issues identified with webpack v5:
  * `source-map` may not be loaded, depending on the operating system and Node version of the user.
  * The `twilio:flex:plugins:start` script errors appear (for example, `message.split is not a function`) depending on the operating system and Node version of the user.
  * Node core modules are not auto-polyfilled in webpack v5 for the browser.
  * Many third-party libraries, such as webpack plugins, babel plugins, eslint plugins, typescript plugins, and CRA dependencies, are not compatible with webpack v5 yet.
* Added support for Node v20.

## 6.2.3 (deprecated)

Release date October 23, 2023

### Upgrades

* Added support for serverless node18 runtime.

## 6.2.2 (deprecated)

Release date Oct 17, 2023

### Fixed

* Fixed the `global is not defined` error in the browser environment by providing a polyfill in webpack configuration.

## 6.2.1 (deprecated)

Release date October 10, 2023

### Fixed

* Fixed a bug that caused plugin local build failure when referencing SCSS/SASS files inside any component.

## 6.2.0 (deprecated)

Release date September 28, 2023

### Upgrades

* Upgraded the Flex plugin webpack to use the `webpack 5` package.

### Security upgrades

* Addressed security vulnerabilities in the following packages by upgrading their versions:
  * `latest-version@7.0.0`
  * `cheerio@^1.0.0-rc.12`

## 6.1.2 (deprecated)

Release date May 17, 2023

### Highlights

* Flex Plugin Builder scaffolds a new plugin that is compatible with Flex UI 2.x when you create a plugin using the create command. The switch to create a new Flex UI 1.x-compatible plugin is `--flexui1`.

## 6.1.1 (deprecated)

Release date April 28, 2023

### Security upgrades

* Upgraded the versions of the following packages to address security vulnerabilities:
  * `@twilio/cli-core@7.6.1`
  * `qs@6.10.3`
  * `resolve-url-loader@4.0.0`

## 6.1.0 (deprecated)

Release date April 19, 2023

### Added

* Flex Plugin Builder now supports Node v16 and Node v18.
  Note: If you encounter the error `ERR_OSSL_EVP_UNSUPPORTED`, which happens due to incompatibility between the newer version of OpenSSL and Node v18, run the following command:
  For MacOS & Linux:

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

For Windows:

```bash
set NODE_OPTIONS=--openssl-legacy-provider
```

### Fixed

* Fixed a bug in the archival process of plugin and plugin-version.

## 6.0.4 (deprecated)

Release date January 10, 2023

### Fixed

* Modified the markdown formatter syntax for italic that is used by the logger.

## 6.0.3 (deprecated)

Release date November 2, 2022

### Fixed

* Fixed an issue with using the plugin builder from behind a HTTP proxy.

## 6.0.2 (deprecated)

Release date October 19, 2022

### Fixed

* Fixed address compatibility with @oclif/core v1.19.0.

## 6.0.1 (deprecated)

Release date October 13, 2022

* Refer to [Flex Plugins CLI docs](/docs/flex/developer/plugins/cli) to stay up-to-date with the latest features being built on the CLI.
* The Plugin Flex package now uses Twilio CLI 5.0, which has upgraded the [oclif](https://github.com/oclif/oclif) package version from v1 to v2.

### Highlights

* Added Twilio CLI 5.0 and oclif v2 support.
* Removed support for Node 12.
* Added a security fix.

## Upgrading to 6.x

You can upgrade [using the CLI](#upgrade-using-cli) or [manually](#upgrade-manually).

### Upgrade using the CLI

Install the Twilio CLI and the Flex Plugins extension as described in the [Flex Plugins CLI docs](/docs/flex/developer/plugins/cli). Then, go to the plugin directory and run the following command:

```bash
$ twilio flex:plugins:upgrade-plugin --install
```

This script automatically upgrades your plugin to the latest version.

### Upgrade manually

To manually upgrade to version 6.x, modify your package.json:

```json
{
  "scripts": {
    "postinstall": "flex-plugin pre-script-check"
  },
  "dependencies": {
    "flex-plugin-scripts": "^6.0.1",
    "react": "16.5.2",
    "react-dom": "16.5.2"
  },
  "devDependencies": {
    "@twilio/flex-ui": "^1"
  }
}
```

### Breaking changes

Version 6 removes support for:

* Twilio CLI v4 and below. Make sure to upgrade to the latest version of Twilio CLI (v5) to use Flex Plugins CLI 6.x.
* Node 12. Version 6.x only supports Node 14.x. You must install and use Node 14.x (preferably the LTS version) to run Flex Plugins CLI commands. This means that your plugins also have to be compatible with Node version 14.x.

## Release notes archive

For release notes older than version 6, see [https://github.com/twilio/flex-plugin-builder/tree/main/changelog](https://github.com/twilio/flex-plugin-builder/tree/main/changelog).
