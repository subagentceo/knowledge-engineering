# Manage telemetry in enterprise environments

VS Code collects telemetry data to help understand how the product is used and to improve it. Organizations can centrally manage telemetry settings to control what data is collected across their development teams.

This article covers how IT admins can configure telemetry through enterprise policies.

## Telemetry-related policies

VS Code provides the following policies for managing telemetry:

Policy

Description

VS Code setting

Available since

`TelemetryLevel`

Specify the telemetry data level

telemetry.telemetryLevel Open in VS Code Open in VS Code Insiders This setting is managed at the organization level. Contact your administrator to change it.ORG

1.99

`EnableFeedback`

Configure feedback mechanisms (issue reporter and surveys)

telemetry.feedback.enabled Open in VS Code Open in VS Code Insiders This setting is managed at the organization level. Contact your administrator to change it.ORG

1.99

Learn how to deploy policies to your organization's devices.

## Configure telemetry level

The `TelemetryLevel` policy controls VS Code telemetry, first-party extension telemetry, and participating third-party extension telemetry.

Note

Some third-party extensions might not respect this setting. Consult the specific extension's documentation to learn about its telemetry reporting.

### Telemetry level options

Value

Crash reports

Error telemetry

Usage data

`all`

✓

✓

✓

`error`

✓

✓

-

`crash`

✓

-

-

`off`

-

-

-

**Data types:**

*   **Crash reports** - Diagnostic information when VS Code crashes
*   **Error telemetry** - Information about errors that don't crash the application
*   **Usage data** - Information about feature usage and performance

### Disable telemetry

To disable all telemetry across your organization, set the `TelemetryLevel` policy to `off`:

**Policy value**:

```
off
```

Important

Setting telemetry to `off` or `error` disables A/B experimentation. This might delay the rollout of new features to your users until they are generally available.

### Enable error telemetry only

To collect only crash reports and error telemetry while disabling usage data, set the `TelemetryLevel` policy to `error`:

**Policy value**:

```
error
```

## Configure feedback mechanisms

The `EnableFeedback` policy controls whether users can access feedback mechanisms in VS Code, such as the issue reporter and surveys.

To disable feedback mechanisms, set the `EnableFeedback` policy to `false`:

**Policy value**:

```
false
```

## Extension telemetry

VS Code extensions might collect their own telemetry data. The telemetry.telemetryLevel Open in VS Code Open in VS Code Insiders This setting is managed at the organization level. Contact your administrator to change it.ORG setting affects first-party Microsoft extensions and participating third-party extensions. However, some extensions might not respect this setting and might have their own telemetry configuration.

Review the documentation of extensions used in your organization to understand their telemetry practices.

## OpenTelemetry support for agent interactions

Copilot Chat in VS Code can export traces, metrics, and events via OpenTelemetry (OTel) to give you real-time visibility into agent interactions, LLM calls, tool execution, and token usage. You can use this telemetry data with any OTel-compatible backend.

Learn more about how to Monitor agent interactions with OpenTelemetry.

## GDPR compliance

VS Code is designed to be GDPR compliant. When users disable telemetry, VS Code stops sending telemetry data going forward. For more information about GDPR and VS Code, see the telemetry documentation.

## Related resources

*   Enterprise policies reference - Complete list of enterprise policies
*   Telemetry in VS Code - Learn about telemetry data collection
*   Privacy statement - Microsoft privacy statement

7/1/2026