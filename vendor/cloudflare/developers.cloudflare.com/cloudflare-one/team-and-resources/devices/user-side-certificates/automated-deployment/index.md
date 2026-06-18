---
title: Install certificate using the Cloudflare One Client
description: Automatically deploy a root certificate on desktop devices.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Install certificate using the Cloudflare One Client

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| All modes                                                                                                                          | All plans                                                       |

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ✅            | 2024.12.554.0          |
| macOS    | ✅            | 2024.12.554.0          |
| Linux \* | ✅            | 2024.12.554.0          |
| iOS      | ❌            |                        |
| Android  | ❌            |                        |
| ChromeOS | ❌            |                        |

\* Only supported on Debian-based systems.

The [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) can automatically install a Cloudflare certificate or [custom root certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/custom-certificate/) on Windows, macOS, and Debian/Ubuntu Linux devices. On mobile devices and Red Hat-based systems, you will need to [install the certificate manually](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/manual-deployment/).

The certificate is required if you want to [apply HTTP policies to encrypted websites](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/), display custom [block pages](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/), and more.

## Install a certificate using the Cloudflare One Client

To configure the Cloudflare One Client to install a root certificate on your organization's devices:

1. (Optional) [Upload](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/custom-certificate/) a custom root certificate to Cloudflare.
2. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Management**.
3. Under **Global Cloudflare One Client settings**, turn on [**Install CA to system certificate store**](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#install-ca-to-system-certificate-store).
4. [Install](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) the Cloudflare One Client on the device.
5. [Enroll the device](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) in your Zero Trust organization.
6. (Optional) If the device is running macOS Big Sur or newer, [manually trust the certificate](#manually-trust-the-certificate).

The Cloudflare One Client will now download any [certificates set to **Available**](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/#activate-a-root-certificate). After download, the Cloudflare One Client will add the certificates to the device's system certificate store in `installed_certs/<certificate_id>.pem` and append the contents to the `installed_cert.pem` file. If you have any scripts using `installed_cert.pem`, Cloudflare recommends you set them to use the individual files in the `installed_certs/` directory instead. `installed_certs.pem` will be deprecated by 2025-06-31.

Note

It may take up to 10 minutes for newly updated settings to propagate to devices.

The Cloudflare One Client does not install certificates to individual applications. You will need to [manually add certificates](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/manual-deployment/#add-the-certificate-to-applications) to applications that rely on their own certificate store instead of the system certificate store.

## Access the installed certificate

After installing the certificate using the Cloudflare One Client, you can verify successful installation by accessing the device's system certificate store.

### macOS

To access the installed certificate in macOS:

1. Open Keychain Access.
2. In **System Keychains**, go to **System** \> **Certificates**.
3. Open your certificate. The default Cloudflare certificate name is **Gateway CA - Cloudflare Managed G1**.
4. If the certificate is trusted by all users, Keychain Access will display **This certificate is marked as trusted for all users**.

The Cloudflare One Client will also place the certificate in `/Library/Application Support/Cloudflare/installed_cert.pem` for reference by scripts or tools.

#### Manually trust the certificate

macOS Big Sur and newer do not allow the Cloudflare One Client to automatically trust the certificate. To manually trust the certificate:

1. In Keychain Access, [find and open the certificate](#macos).
2. Open **Trust**.
3. Set **When using this certificate** to _Always Trust_.
4. (Optional) Restart the device to reset connections to Zero Trust.

Alternatively, you can configure your mobile device management (MDM) to automatically trust the certificate on all of your organization's devices.

### Windows

To access the installed certificate in Windows:

1. Open the Start menu and select **Run**.
2. Enter `certlm.msc`.
3. Go to **Trusted Root Certification Authority** \> **Certificates**. The default Cloudflare certificate name is **Gateway CA - Cloudflare Managed G1**.

The Cloudflare One Client will also place the certificate in `%PROGRAMDATA%\Cloudflare\installed_cert.pem` for reference by scripts or tools.

### Debian-based Linux distributions

On Debian-based Linux distributions, the certificate is stored in `/usr/local/share/ca-certificates`. The default installed Cloudflare certificate name is `managed-warp.pem`. The Cloudflare One Client will create a symbolic link named `managed-warp.crt` to use as its root certificate. If your system is not using `managed-warp.crt`, run the following commands to update the system store:

1. Update your list of custom CA certificates.  
Terminal window  
```  
sudo update-ca-certificates  
```
2. Go to the system certificate store.  
Terminal window  
```  
cd /usr/local/share/ca-certificates  
```
3. Verify your system has both the `managed-warp.pem` file and the `managed-warp.crt` symbolic link. For example:  
Terminal window  
```  
ls -l  
```  
```  
lrwxrwxrwx 1 root root   49 Jan  3 21:46 managed-warp.crt -> /usr/local/share/ca-certificates/managed-warp.pem  
-rw-r--r-- 1 root root 1139 Jan  3 21:46 managed-warp.pem  
```

The Cloudflare One Client will also place the certificate in `/var/lib/cloudflare-warp/installed_cert.pem` for reference by scripts or tools.

## Uninstall the certificate

If the certificate was installed by the Cloudflare One Client, it is automatically removed when you turn on another certificate for inspection in Cloudflare One, turn off **Install CA to system certificate store**, or [uninstall the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/uninstall/). The Cloudflare One Client does not remove certificates that were installed manually (for example, certificates added to third-party applications).

To manually remove the certificate, refer to the instructions supplied by your operating system or the third-party application.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/automated-deployment/#page","headline":"Install certificate using the Cloudflare One Client · Cloudflare One docs","description":"Automatically deploy a root certificate on desktop devices.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/automated-deployment/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/user-side-certificates/","name":"User-side certificates"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/user-side-certificates/automated-deployment/","name":"Install certificate using the Cloudflare One Client"}}]}
```
