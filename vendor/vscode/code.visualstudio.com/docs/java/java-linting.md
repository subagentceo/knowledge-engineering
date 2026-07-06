# Java formatting and linting

Language Support for Java™ by Red Hat also provides formatting settings. You can export an Eclipse formatter file and then use it for your project in VS Code.

In addition, there are also the Checkstyle for Java and SonarLint extensions, which provide features for live linting and code analysis.

## Formatter

You can use **Format Document** command to format a Java file. If you didn't specify a formatter profile before, the Java file will be formatted using default settings.

### Applying formatter settings

You can easily apply formatter settings from an existing formatter profile in Eclipse scheme. For example, if you want to apply Google Style for your Java project, then you can set the following property in `settings.json`:

```
"java.format.settings.url": "https://raw.githubusercontent.com/google/styleguide/gh-pages/eclipse-java-google-style.xml",
```

The property can be set to a URL or a local file path. If the formatter XML file contains more than one profile, you can specify the profile name:

```
"java.format.settings.profile": "GoogleStyle",
```

After setting the formatter profile, the **Format Document** command will use the specific profile to format your Java files.

### Editing formatter settings

The Extension Pack for Java provides an editor to help users edit an existing formatter profile. You can open the editor with the command **Java: Open Java Formatter Settings with Preview**. In the editor, you can change the formatter settings and preview the effects. After saving the current editor, the changes will be saved to the formatter profile.

> Note: the formatter settings editor supports only local formatter profile. If your workspace contains a remote formatter profile, it will guide you to download it in `.vscode` folder.

When editing settings in the editor, you can preview the changes' effects in the right **Preview** panel.

You can also undo and redo changes.

## SonarLint

SonarLint is an easy-to-use extension that helps you find and fix bugs and security issues as you code. The extension runs in the background and, just like a spell checker, highlights source code issues that pose a quality or security concern. The extension not only tells you what the issue is but also provides in-context guidance on why it's harmful and how to fix it, with examples. The extension supports over 500+ Java rules and includes several Quick Fixes to automatically fix certain quality issues.

### Code analysis on the fly

Issues are highlighted directly in the editor with hovers to provide detailed explanations.

Issues found in the opened file can also be reviewed through the Problems panel of VS Code. When applicable, secondary code locations are mentioned so you can understand where the issue originates from (for example, the code path that led to a bug).

### Rule documentation and remediation guidance

For any issues detected, SonarLint provides full documentation about the rule that was violated, and the best coding practice it relates to. This allows you to understand why an issue is raised, and how to fix it.

### Enabling more quality and security rules

By default, SonarLint provides a wide array of rules to detect bugs and vulnerabilities. More checks can be enabled through the **SonarLint Rules** view.

For more details about the SonarLint for VS Code extension, visit the SonarLint website.

## Checkstyle

With the Checkstyle for Java extension, you can use either existing `checkstyle` configurations (Google's or Sun's Check) or your own customized files for your project. When editing a Java file, the extension will check the file format and provide Quick Fixes if possible on the fly.

Set Checkstyle configuration file using the **Checkstyle: Set the Checkstyle Configuration File** command and select the Checkstyle file from the dropdown.

The Checkstyle for Java extension supports live linting.

And batch check.

The Problems panel will open when you click the Checkstyle status icon in the Status bar.

### Set Checkstyle configuration file

To set the configuration file, right-click the `.xml` file and select **Set the Checkstyle Configuration File**.

![Set Checkstyle configuration file](/assets/docs/java/java-linting/set_config.png)

You can also trigger the command **Checkstyle: Set Checkstyle Configuration File** to choose the configuration file in the File Explorer. The extension looks for a `checkstyle.xml` file in your workspace to make Checkstyle configuration easier. You will also see the two built-in configurations:

*   **Google's Check**
*   **Sun's Check**

The command **Checkstyle: Set the Checkstyle Configuration** detects potential **Checkstyle** configuration files and lists them. You can also provide a configuration file by directly writing a URL in the input box.

You can also set the Checkstyle version by using the command **Checkstyle: Set the Checkstyle Version**.

The command will:

*   List the latest Checkstyle version from the main repo.
*   List all the downloaded versions.
*   List all the supported versions.
*   Mark the currently used version with a check symbol.

In addition, you can also bring any 3rd-party modules for Checkstyle by configuring its path. For example, after using the configuration below, you can add `<module name="SingleBreakOrContinueCheck"/>` or `<module name="com.github.sevntu.checkstyle.checks.naming.SingleBreakOrContinueCheck"/>` to `checkstyle.xml` to use those checks.

```
"java.checkstyle.modules": [ "${workspaceFolder}/src/main/resources/sevntu-checks-1.35.0.jar" ]
```

### Check the style and fix the violations

When editing a Java file, the extension will check the file format and provide Quick Fixes if possible. You can click the lightbulb button in the editor to show the available Quick Fixes.

![Fix style violation](/assets/docs/java/java-linting/quick_fix.png)

For more details about Checkstyle for Java, visit its GitHub Repository.

12/12/2021