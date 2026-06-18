---
title: Application check
description: Application check in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Application check

The Application Check device posture attribute checks that a specific application process is running on a device. You can create multiple application checks for each operating system you need to run it on, or if you need to check for multiple applications.

## Prerequisites

* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device. For a list of supported modes and operating systems, refer to [Cloudflare One Client Checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/).

## Configure an application check

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Posture checks**.
2. Go to **Cloudflare One Client checks** and select **Add a check**.
3. Select **Application Check**.
4. You will be prompted for the following information:  
   1. **Name**: Enter a unique name for this device posture check.  
   2. **Operating system**: Select your operating system.  
   3. **Application path**: Enter the file path for the executable that will be running (for example, `C:\Program Files\myfolder\myfile.exe`).  
   Environment variables  
   File paths can include environment variables to account for differences across devices. Environment variables are resolved in the context of the Cloudflare One Client daemon, not the logged-in user. Only variables available to the daemon process at runtime will work.  
         * **Windows**: Use `%VAR%` syntax. For example, `%PROGRAMFILES%\myfolder\myfile.exe`.  
         * **macOS/Linux**: Use `${VAR}` syntax. For example, `${RUNTIME_DIRECTORY}/myfolder/myfile`.  
Note  
   * Be sure to enter the binary file path, not the application launch path. When checking for an application on macOS, a common mistake is to enter `/Applications/ApplicationName.app`. This will not work as `ApplicationName.app` is a folder. The executable file that will be running is located within the folder, for example `ApplicationName.app/Contents/MacOS/ApplicationName`.  
   * Some applications change their file path after an update. Ensure that the application is always in a stable location or use environment variables.
5. **Signing certificate thumbprint (recommended)**: Enter the [thumbprint of the publishing certificate](#determine-the-signing-thumbprint) used to sign the binary. Adding this information will enable the check to ensure that the application was signed by the expected software developer.
6. **SHA-256 (optional)**: Enter the [SHA-256 value](#determine-the-sha-256-value) of the binary. This is used to ensure the integrity of the binary file on the device.
7. Select **Save**.

Next, go to **Insights** \> **Logs** \> **Posture logs** and verify that the application check is returning the expected results.

## Determine the signing thumbprint

The process to determine the signing thumbprint of an application varies depending on the operating system. This is how you would look up the signing thumbprint of the Cloudflare One Client application on macOS and Windows.

Note

When setting up new device posture checks, we recommend first testing them without setting certificate thumbprint or SHA256 checksum values.

### macOS

1. Create a directory.  
Terminal window  
```  
~/Desktop $ mkdir tmp  
~/Desktop $ cd tmp  
```
2. Run the following command to extract certificates for the Cloudflare One Client application:  
Terminal window  
```  
~/Desktop/tmp $ codesign -d --extract-certificates "/Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP"  
Executable=/Applications/Cloudflare WARP.app/Contents/Resources/CloudflareWARP  
```
3. Next, run the following command to extract the SHA1 thumbprint:  
Terminal window  
```  
~/Desktop/tmp $ openssl x509 -inform DER -in codesign0 -fingerprint -sha1 -noout | tr -d :  
SHA1 Fingerprint=FE2C359D79D4CEAE6BDF7EFB507326C6B4E2436E  
```

### Windows

1. Open a PowerShell window.
2. Use the `Get-AuthenticodeSignature` command to find the thumbprint. For example:  
PowerShell  
```  
Get-AuthenticodeSignature -FilePath c:\myfile.exe  
```

## Determine the SHA-256 value

The SHA-256 value almost always changes between versions of a file/application.

### macOS

1. Open a Terminal window.
2. Use the `shasum` command to find the SHA256 value of the file. For example:  
Terminal window  
```  
shasum -a 256 myfile  
```

### Windows

1. Open a PowerShell window.
2. Use the `get-filehash` command to find the SHA256 value of the file. For example:  
PowerShell  
```  
get-filehash -path "C:\myfile.exe" -Algorithm SHA256 | format-list  
```

## How WARP checks for an application

Learn how the Cloudflare One Client determines if an application is running on various systems.

### macOS

To get the list of active processes, run the following command:

Terminal window

```

ps -eo comm | xargs -I {} which "{}" | sort | uniq | xargs -I {} realpath "{}"


```

The application path must appear in the output for the check to pass.

### Linux

The Cloudflare One Client gets the list of running binaries by following the soft links in `/proc/<pid>/exe`. To view all active processes and their soft links:

Terminal window

```

ps -eo pid | awk '{print "/proc/"$1"/exe"}' | xargs readlink -f | awk '{print $1}' | sort | uniq


```

The application path must appear in the `/proc/<pid>/exe` output for the check to pass.

### Windows

To get the list of active processes, run the following command:

PowerShell

```

Get-Process | Select-Object ProcessName, Path | Format-Table -AutoSize


```

The application path must appear in the output for the check to pass.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/application-check/#page","headline":"Application check · Cloudflare One docs","description":"Application check in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/application-check/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Posture"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/","name":"Posture checks"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/","name":"Cloudflare One Client checks"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/application-check/","name":"Application check"}}]}
```
