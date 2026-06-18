---
title: Register the Cloudflare One Client with minimal user interaction
description: Register the Cloudflare One Client with minimal user interaction in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Register the Cloudflare One Client with minimal user interaction

Administrators can automate Cloudflare One Client (formerly WARP) registration on managed devices and minimize the number of clicks required from an end user.

During the default Cloudflare One Client enrollment process, end users typically need to complete several steps in order to login:

1. Review Terms and Conditions in the Cloudflare One Client GUI and acknowledge your company's use of the Cloudflare One Client.
2. Select their identity provider from the Cloudflare Access login screen.
3. Complete the authentication steps required by the identity provider.
4. Interact with a browser popup requesting permission to launch the Cloudflare One Client.

This guide covers how to eliminate steps 1, 2 and 4 from your Cloudflare One Client deployment.

Service token authentication

If you are looking to eliminate all user interaction, you can [enroll devices using service tokens](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/#check-for-service-token). Because users are not required to log in to an identity provider, identity-based policies and logging will not be available on these devices.

On iOS and Android / ChromeOS, end users will still be asked questions required by their platform such as accepting notifications or installing the VPN Profile.

## Turn off onboarding screens

To skip the Terms and Conditions screens that are usually presented to users, set the [onboarding parameter](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/) to `false` in your [MDM deployment file](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/). Here is an example `mdm.xml` file:

```

<dict>

  <key>organization</key>

  <string>your-team-name</string>

  <key>onboarding</key>

  <false/>

</dict>


```

## Turn on instant authentication

If you are only using one identity provider for device enrollment, turn on **Apply instant authentication** in your [device enrollment permissions](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/#set-device-enrollment-permissions). This allow users to skip the Cloudflare Access login page and go directly to your SSO login event.

## Allow browser to launch the Cloudflare One Client

You can configure your browser to automatically launch the Cloudflare One Client application after a successful login and skip the **Open Cloudflare WARP.app** popup.

![Browser popup requesting permission to open the Cloudflare One Client](https://developers.cloudflare.com/_astro/warp-protocol-handler.DL1xwNJc_l8Qql.webp) 

_Note: Labels in this image may reflect a previous product name._

### Chromium-based browsers

Chromium-based browsers such as Google Chrome and Microsoft Edge have a policy setting called [AutoLaunchProtocolsFromOrigins ↗](https://learn.microsoft.com/en-us/DeployEdge/microsoft-edge-policies#autolaunchprotocolsfromorigins). This setting takes in two parameters: a protocol for the browser to launch and the origins that are allowed to launch it. For the browser to launch the Cloudflare One Client, you need to set the protocol to `com.cloudflare.warp` and the origin to your Cloudflare Zero Trust team domain (`https://<your-team-name>.cloudflareaccess.com`).

* [ Windows ](#tab-panel-7486)
* [ macOS ](#tab-panel-7487)

On Windows, you can configure `AutoLaunchProtocolsFromOrigins` by adding a new registry key.

To add the registry key manually:

1. Open Registry Editor as Administrator.
2. Navigate to the policies folder for your browser:  
   * Google Chrome: `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome`  
   * Microsoft Edge: `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge`  
   Note  
   You may need to create the `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Google\Chrome` folder if it does not already exist.
3. Create a new string value:  
   * **Value Name**: `AutoLaunchProtocolsFromOrigins`  
   * **Value Data**: `[{"allowed_origins": ["https://<your-team-name>.cloudflareaccess.com/"], "protocol": "com.cloudflare.warp"}]`  
Be sure to replace `<your-team-name>` with your actual Zero Trust team name.

Instead of using the Registry Editor, the registry key can also be created using a Group Policy Object (GPO), PowerShell script, or with an MDM such as [Intune](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/partners/intune/#update-mdm-parameters).

On macOS, you can configure `AutoLaunchProtocolsFromOrigins` by deploying a property list (plist) file for the browser. The exact instructions will vary depending on your [MDM](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/partners/). The general procedure is as follows:

1. Create a new plist file with the following name (case sensitive):  
   * Google Chrome: `com.google.Chrome.plist`  
   * Microsoft Edge: `com.microsoft.Edge.plist`
2. Using a text editor, add the following content to your plist:  
```  
<key>AutoLaunchProtocolsFromOrigins</key>  
<array>  
  <dict>  
    <key>allowed_origins</key>  
    <array>  
      <string>https://<your-team-name>.cloudflareaccess.com</string>  
    </array>  
    <key>protocol</key>  
    <string>com.cloudflare.warp</string>  
  </dict>  
</array>  
```  
Be sure to replace `<your-team-name>` with your actual Zero Trust team name.
3. Some MDMs require converting the `.plist` to a `.mobileconfig` before pushing it to a device. You can use a [file converter ↗](https://github.com/timsutton/mcxToProfile) or modify the following example `com.google.Chrome.mobileconfig`:  
```  
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">  
<plist version="1.0">  
<dict>  
    <key>PayloadIdentifier</key>  
    <string>com.google.chrome</string>  
    <key>PayloadRemovalDisallowed</key>  
    <true/>  
    <key>PayloadScope</key>  
    <string>System</string>  
    <key>PayloadType</key>  
    <string>Configuration</string>  
    <key>PayloadUUID</key>  
    <string>8FCBDCA7-87B3-4610-A01A-B0FE4C5B57C8</string>  
    <key>PayloadOrganization</key>  
    <string></string>  
    <key>PayloadVersion</key>  
    <integer>1</integer>  
    <key>PayloadDisplayName</key>  
    <string>Google Chrome Policy</string>  
    <key>PayloadContent</key>  
    <array>  
        <dict>  
            <key>PayloadType</key>  
            <string>com.apple.ManagedClient.preferences</string>  
            <key>PayloadVersion</key>  
            <integer>1</integer>  
            <key>PayloadIdentifier</key>  
            <string>com.normandale</string>  
            <key>PayloadUUID</key>  
            <string>8FCBDCA7-87B3-4610-A01A-B0FE4C5B57C8</string>  
            <key>PayloadEnabled</key>  
            <true/>  
            <key>PayloadDisplayName</key>  
            <string>Custom: (com.google.Chrome)</string>  
            <key>PayloadContent</key>  
            <dict>  
                <key>com.google.Chrome</key>  
                <dict>  
                    <key>Forced</key>  
                    <array>  
                        <dict>  
                            <key>mcx_preference_settings</key>  
                            <dict>  
                                <key>AutoLaunchProtocolsFromOrigins</key>  
                                <array>  
                                <dict>  
                                <key>allowed_origins</key>  
                                <array>  
                                <string>https://<your-team-name>.cloudflareaccess.com</string>  
                                </array>  
                                <key>protocol</key>  
                                <string>com.cloudflare.warp</string>  
                                </dict>  
                                </array>  
                            </dict>  
                        </dict>  
                    </array>  
                </dict>  
            </dict>  
        </dict>  
    </array>  
</dict>  
</plist>  
```
4. Upload the `.plist` or `.mobileconfig` file to your preferred MDM.
5. Deploy the configuration profile to your devices.

For more information on configuring browser policies on macOS, refer to the [Google Chrome ↗](https://support.google.com/chrome/a/answer/9020077?hl=en&ref%5Ftopic=7650028&sjid=15337530832025656704-NA) or [Microsoft Edge ↗](https://learn.microsoft.com/en-us/deployedge/configure-microsoft-edge-on-mac) documentation.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/protocol-handler/#page","headline":"Register the Cloudflare One Client with minimal user interaction · Cloudflare One docs","description":"Register the Cloudflare One Client with minimal user interaction in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/protocol-handler/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["PowerShell"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/","name":"Deploy the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/","name":"Managed deployment"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/protocol-handler/","name":"Register the Cloudflare One Client with minimal user interaction"}}]}
```
