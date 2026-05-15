---
title: "PowerShell"
description: "Learn how to set up Sentry's PowerShell SDK for error monitoring and performance tracking."
url: https://docs.sentry.io/platforms/powershell/
---

# PowerShell | Sentry for PowerShell

On this page, we get you up and running with Sentry's PowerShell SDK. The PowerShell Sentry SDK is tested to work with:

* PowerShell 7.4+ on Windows, macOS, and Linux
* Windows PowerShell 5.1

The PowerShell SDK is based on the Sentry .NET SDK. You can refer to the [.NET SDK docs](https://docs.sentry.io/platforms/dotnet/configuration.md) for the documentation of advanced features you don't find here.

## [Install](https://docs.sentry.io/platforms/powershell.md#install)

Sentry captures data by using an SDK within your application’s runtime.

Install our PowerShell SDK using [PowerShellGet](https://learn.microsoft.com/en-us/powershell/gallery/powershellget/install-powershellget):

```powershell
Install-Module -Name Sentry -Scope CurrentUser -Repository PSGallery -Force
```

## [Configure](https://docs.sentry.io/platforms/powershell.md#configure)

Configuration should happen as early as possible in your application's lifecycle.

Once this is done, Sentry's PowerShell SDK can be used to capture errors.

```powershell
# You may need to import the module if you've just installed it.
Import-Module Sentry

Start-Sentry {
    # You can set it in the SENTRY_DSN environment variable, or you can set it in code here.
    $_.Dsn = '___PUBLIC_DSN___'

    # If you'd like to include data that potentially includes PII, such as Machine Name
    $_.SendDefaultPii = $true
}
```

## [Verify](https://docs.sentry.io/platforms/powershell.md#verify)

This snippet includes an intentional error, so you can test that everything is working as soon as you set it up.

```powershell
try
{
    throw 'Test error'
}
catch
{
    $_ | Out-Sentry
}
```

Learn more about manually capturing an error or message in our [Usage documentation](https://docs.sentry.io/platforms/powershell/usage.md).

To view and resolve the recorded error, log into [sentry.io](https://sentry.io) and select your project. Clicking on the error's title will open a page where you can see detailed information and mark it as resolved.

## Topics

- [Configuration](https://docs.sentry.io/platforms/powershell/configuration.md)
- [Usage](https://docs.sentry.io/platforms/powershell/usage.md)
- [Enriching Events](https://docs.sentry.io/platforms/powershell/enriching-events.md)
- [Data Management](https://docs.sentry.io/platforms/powershell/data-management.md)
- [Tracing](https://docs.sentry.io/platforms/powershell/tracing.md)
- [Troubleshooting](https://docs.sentry.io/platforms/powershell/troubleshooting.md)
