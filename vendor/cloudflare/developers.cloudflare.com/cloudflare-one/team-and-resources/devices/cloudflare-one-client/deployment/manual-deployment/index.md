---
title: Manual deployment
description: Manual deployment in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manual deployment

If you plan to direct your users to manually download and configure the Cloudflare One Client (formerly WARP), users will need to connect the client to your organization's Cloudflare Zero Trust instance.

## Prerequisites

* [Set device enrollment permissions](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/) to specify which users can connect.

## Windows, macOS, and Linux

### Enroll using the GUI

To enroll your device using the client GUI:

* [ Version 2026.2+ ](#tab-panel-7484)
* [ Version 2026.1 and earlier ](#tab-panel-7485)

1. [Download](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) and install the Cloudflare One Client.
2. Launch the Cloudflare One Client.
3. On the **What would you like to use the Cloudflare One Client for?** screen, select **Zero Trust security**.
4. Enter your team name.
5. Complete the authentication steps required by your organization.  
Once authenticated, you will see a Success page and a dialog prompting you to open the Cloudflare One Client.
6. Select **Open the Cloudflare One Client** to complete the registration.

1. [Download](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) and install the Cloudflare One Client.
2. Launch the Cloudflare One Client.
3. Select the Cloudflare logo in the menu bar.
4. Select the gear icon.
5. Go to **Preferences** \> **Account**.
6. Select **Login with Cloudflare Zero Trust**.
7. Enter your team name.
8. Complete the authentication steps required by your organization.  
Once authenticated, you will see a Success page and a dialog prompting you to open the Cloudflare One Client.
9. Select **Open Cloudflare WARP.app** to complete the registration.

The device is now protected by your organization's Zero Trust policies.

### Enroll using the CLI

To enroll your device using the terminal:

1. [Download ↗](https://pkg.cloudflareclient.com/) and install the Cloudflare One Client package.
2. Open a terminal window. Ensure that you are logged into the terminal as the current user and not as root.
3. Enroll into Cloudflare Zero Trust using your organization's team name:  
Terminal window  
```  
warp-cli registration new <your-team-name>  
```
4. In the browser window that opens, complete the authentication steps required by your organization.  
Once authenticated, you will see a success page and a dialog prompting you to open a link.
5. Select **Open Link**.
6. Verify the registration in the terminal:  
Terminal window  
```  
warp-cli registration show  
```

Troubleshoot missing registration

The registration process may take a few minutes to complete. If the registration continues to be missing, then manually copy the authentication token from the browser to the Cloudflare One Client:

1. On the success page, right-click and select **View Page Source**.
2. Find the HTML metadata tag that contains the token. For example, `<meta http-equiv="refresh" content"=0;url=com.cloudflare.warp://<your-team-name>.cloudflareaccess.com/auth?token=yeooilknmasdlfnlnsadfojDSFJndf_kjnasdf..." />`
3. Copy the URL field: `com.cloudflare.warp://<your-team-name>.cloudflareaccess.com/auth?token=<your-token>`
4. In the terminal, run the following command using the URL obtained in the previous step.  
Terminal window  
```  
warp-cli registration token "com.cloudflare.warp://<your-team-name>.cloudflareaccess.com/auth?token=<your-token>"  
```

If you get a `401` error, then the token has expired. Generate a new one by refreshing the web page and quickly grab the new token from the page source.

1. If you did not configure the client to [auto-connect](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#auto-connect), manually connect:  
Terminal window  
```  
warp-cli connect  
```

The device is now protected by your organization's Zero Trust policies. For more information on all available commands, run `warp-cli --help`.

## iOS, Android, and ChromeOS

### Enroll manually

1. [Download](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) and install the Cloudflare One Agent app.
2. Launch the Cloudflare One Agent app.
3. Select **Next**.
4. Review the privacy policy and select **Accept**.
5. Enter your team name.
6. Complete the authentication steps required by your organization.
7. After authenticating, select **Install VPN Profile**.
8. In the **Connection request** popup window, select **OK**.
9. If you did not enable [auto-connect ↗](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#auto-connect), manually turn on the switch to **Connected**.

The device is now protected by your organization's Zero Trust policies.

### Enroll using a URL

Feature availability

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ❌            |                        |
| macOS    | ❌            |                        |
| Linux    | ❌            |                        |
| iOS      | ✅            | 1.10                   |
| Android  | ✅            | 2.4                    |
| ChromeOS | ✅            | 2.4                    |

Administrators can provide users with a custom login URL that automatically fills in your organization's team name during device enrollment. Using a URL reduces the potential for error that comes with manual entry of the team name.

The Cloudflare One Client supports URLs accessed through a direct link or with a URL handler such as a QR code. Direct links are currently only supported in Safari and Firefox. If your default browser is Chrome (or another unsupported browser), we recommend embedding the link in a QR code.

#### Generate a login URL

To generate a URL for device enrollment:

1. Copy the following link, replacing `<your-team-name>` with your Zero Trust team name:  
```  
cf1app://oneapp.cloudflare.com/team?name=<your-team-name>  
```
2. (Optional) Use any QR code generator to embed the link in a QR code.
3. Distribute the link or QR code to users.

#### Use the login URL

To enroll a device using a login URL:

1. [Download](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) and install the Cloudflare One Agent app.
2. Go to the [login URL](#generate-a-login-url) provided by your account administrator. To use a QR code, open the QR scanner app on your device and scan the QR code.  
The Cloudflare One Agent app will open and start the onboarding flow.  
Note  
If the device is already enrolled in the account associated with this URL, Cloudflare One agent will bypass onboarding and show the **Connected** switch.
3. To complete the onboarding flow:  
a. Review the privacy policy and select **Accept**.  
b. On the **Enter team name** screen, confirm that the pre-populated team name matches your organization.  
`Already Authenticated` error  
If Cloudflare One Agent is logged in using another team name, you must first log out of that account. Go to **Settings** \> **Account** to log out, and then retry the QR code or login link.  
c. Complete the authentication steps required by your organization.  
d. After authenticating, select **Install VPN Profile**.  
e. In the **Connection request** popup window, select **OK**.
4. If you did not enable [auto-connect](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#auto-connect), manually turn on the switch to **Connected**.

The device is now protected by your organization's Zero Trust policies.

## Virtual machines

By default, virtual machines (VMs) are subject to the device client settings of the host. If you want to deploy a separate instance of the Cloudflare One Client in a VM, you must configure the VM to operate in bridged networking mode.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/#page","headline":"Manual deployment · Cloudflare One docs","description":"Manual deployment in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["CLI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/","name":"Deploy the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/","name":"Manual deployment"}}]}
```
