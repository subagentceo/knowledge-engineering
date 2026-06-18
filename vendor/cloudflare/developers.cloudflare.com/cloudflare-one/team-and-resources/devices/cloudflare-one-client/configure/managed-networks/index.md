---
title: Managed networks
description: Managed networks in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Managed networks

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| All modes                                                                                                                          | All plans                                                       |

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ✅            | 2025.1.861.0           |
| macOS    | ✅            | 2025.1.861.0           |
| Linux    | ✅            | 2025.1.861.0           |
| iOS      | ✅            | 1.0                    |
| Android  | ✅            | 1.0                    |
| ChromeOS | ✅            | 1.0                    |

The Cloudflare One Client (formerly WARP) allows you to selectively apply specific [device profiles](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) and device client settings when a device connects to a known network location, such as an office. To detect which network a device is on, the Cloudflare One Client connects to a TLS endpoint that you host on that network and validates its certificate. If the certificate matches, the device is on your managed network and receives the corresponding [device profile](#4-configure-device-profile) (if one has been configured for that network).

On this page, you will learn how to:

* Create a TLS endpoint on your trusted network.
* Configure the TLS endpoint in Zero Trust to set up a managed network.
* Apply the appropriate device profile to a device when the Cloudflare One Client detects it is on your managed network.

## Requirements

* The Cloudflare One Client scans for managed networks when the operating system's default route changes, the SSID of the active Wi-Fi connection changes, or the DNS servers of the default interface change. To minimize performance impact, reuse the same TLS endpoint across multiple locations unless you require distinct settings profiles for each location.
* Ensure that the device can only reach one managed network at any given time. If multiple managed networks are configured and reachable, there is no way to determine which settings profile the device will receive.

## Managed network detection logic

When you configure a managed network, the Cloudflare One Client uses the TLS endpoint to determine whether the device is on that network.

The time it takes to apply the correct device profile depends on how quickly the TLS endpoint responds.

If the TLS endpoint times out after 5 seconds, the Cloudflare One Client will determine that the device is not on a managed network and will apply the default device profile. The Cloudflare One Client only retries detection if a non-timeout error occurs. A timeout triggers fallback to the default device profile without further retries.

## 1\. Choose a TLS endpoint

A TLS endpoint is a host on your network that serves a TLS certificate. The TLS endpoint acts like a network location beacon — when a device connects to a network, the Cloudflare One Client on the device detects the TLS endpoint and validates the TLS certificate against the SHA-256 fingerprint (if specified) or against the local certificate store to check that it is signed by a public certificate authority.

The TLS certificate can be hosted by any device on your network. However, the endpoint must be inaccessible to users outside of the network location. The Cloudflare One Client will automatically exclude the managed network endpoint from all device profiles to ensure that users cannot connect to this endpoint over Cloudflare Tunnel. We recommend choosing a host that is physically in the office which remote users do not need to access, such as a printer.

### Create a new TLS endpoint

If you do not already have a TLS endpoint on your network, you can set one up as follows:

1. Generate a TLS certificate:  
Terminal window  
```  
openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes -keyout key.pem -out cert.pem -subj "/CN=example.com" -addext "subjectAltName=DNS:example.com"  
```  
The command will output a certificate in PEM format and its private key. Store these files in a secure place.  
Note  
The Cloudflare One Client requires certificates to include `CN` and `subjectAltName` metadata. You can use `example.com` or any other domain.
2. Configure an HTTPS server on your network to use this certificate and key. The example below demonstrates how to serve the TLS certificate from an nginx container in Docker:  
a. Create an nginx configuration file called `nginx.conf`:  
nginx.conf  
```  
events {  
worker_connections  1024;  
}  
http {  
    server {  
      listen              443 ssl;  
      ssl_certificate     /certs/cert.pem;  
      ssl_certificate_key /certs/key.pem;  
      location / {  
            return 200;  
      }  
    }  
}  
```  
If needed, replace `/certs/cert.pem` and `/certs/key.pem` with the locations of your certificate and key.  
b. Add the nginx image to your Docker compose file:  
docker-compose.yml  
```  
services:  
  nginx:  
    image: nginx:latest  
    ports:  
      - 3333:443  
    volumes:  
      - ./nginx.conf:/etc/nginx/nginx.conf:ro  
      - ./certs:/certs:ro  
```  
If needed, replace `./nginx.conf` and `./certs` with the locations of your nginx configuration file and certificate.  
c. Start the server:  
Terminal window  
```  
docker compose up -d  
```
3. To test that the TLS server is working, run a curl command from the end user's device:  
Terminal window  
```  
curl --verbose --insecure https://<private-server-IP>:3333/  
```  
You need to pass the `--insecure` option because we are using a self-signed certificate. If the device is connected to the network, the request should return a `200` status code.

Windows IIS

To create a TLS endpoint using Windows Internet Information Services (IIS) Manager:

1. Run Powershell as administrator.
2. Generate a self-signed certificate:  
PowerShell  
```  
New-SelfSignedCertificate -CertStoreLocation Cert:\LocalMachine\My -DnsName "office-name.example.internal" -FriendlyName "Cloudflare Managed Network Certificate" -NotAfter (Get-Date).AddYears(10)  
```  
```  
  PSParentPath: Microsoft.PowerShell.Security\Certificate::LocalMachine\My  
Thumbprint                                Subject  
----------                                -------  
0660C4FCD15F69C49BD080FEEA4136B3D302B41B  CN=office-name.example.internal  
```
3. Extract the certificate's SHA-256 fingerprint:  
PowerShell  
```  
[System.BitConverter]::ToString([System.Security.Cryptography.SHA256]::Create().ComputeHash((Get-ChildItem Cert:\LocalMachine\My | Where-Object { $_.FriendlyName -eq "Cloudflare Managed Network Certificate" }).RawData)) -replace "-", ""  
```  
```  
DD4F4806C57A5BBAF1AA5B080F0541DA75DB468D0A1FE731310149500CCD8662  
```  
You will need the SHA-256 fingerprint to [configure the managed network in Zero Trust](#3-add-managed-network-to-zero-trust). Do not use the default SHA-1 thumbprint generated by the `New-SelfSignedCertificate` command.
4. Open IIS Manager.
5. In the **Connections** pane, right-click the **Sites** node and select **Add Website**.
6. In **Site name**, enter any name for the TLS server (for example, `Managed Network Server`).
7. In **Physical path**, enter any directory that contains a `.htm` or `html` file, such as `C:\inetpub\wwwroot`. Cloudflare does not validate the content within the directory.
8. Under **Binding**, configure the following fields:  
   * **Type**: _https_  
   * **IP address**: _All Unassigned_  
   * **Port**: `443`  
   * **Host name**: Enter the certificate's Common Name (CN). The CN of our example certificate is `office-name.example.internal`.  
   * **Require Server Name Indication**: Enabled  
   * **SSL certificate**: Select the name of your TLS certificate. Our example certificate is called `Cloudflare Managed Network Certificate`.
9. To test that the TLS server is working, run a curl command from the end user's device:  
Terminal window  
```  
curl --verbose --insecure --resolve office-name.example.internal:443:<private-server-IP> https://office-name.example.internal  
```  
You need to pass the `--insecure` option because we are using a self-signed certificate. The `--resolve` option allows you to connect to the server's private IP but also pass the hostname to the server for SNI and certificate validation. If the device is connected to the network, the request should return your directory's default homepage (`C:\inetpub\wwwroot\iisstart.htm`).

### Supported cipher suites

The Cloudflare One Client establishes a TLS connection using [Rustls ↗](https://github.com/rustls/rustls). Make sure your TLS endpoint accepts one of the [cipher suites supported by Rustls ↗](https://docs.rs/rustls/0.21.10/src/rustls/suites.rs.html#125-143).

## 2\. Extract the SHA-256 fingerprint

The SHA-256 fingerprint is only required if your TLS endpoint uses a self-signed certificate.

* [ Local certificate ](#tab-panel-7432)
* [ Remote server ](#tab-panel-7433)

To obtain the SHA-256 fingerprint of a local certificate:

Terminal window

```

openssl x509 -noout -fingerprint -sha256 -inform pem -in cert.pem | tr -d :


```

The output will look something like:

```

SHA256 Fingerprint=DD4F4806C57A5BBAF1AA5B080F0541DA75DB468D0A1FE731310149500CCD8662


```

To test connectivity and obtain the SHA-256 fingerprint of a remote server:

Terminal window

```

openssl s_client -connect <private-server-IP>:443 < /dev/null 2> /dev/null | openssl x509 -noout -fingerprint -sha256 | tr -d :


```

The output will look something like:

```

SHA256 Fingerprint=DD4F4806C57A5BBAF1AA5B080F0541DA75DB468D0A1FE731310149500CCD8662


```

## 3\. Add managed network to Cloudflare One

* [ Dashboard ](#tab-panel-7428)
* [ Terraform (v5) ](#tab-panel-7429)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles**.
2. Select **Managed networks** and select **Add new managed network**.
3. Name your network location.
4. In **Host and Port**, enter the private IP address and port number of your [TLS endpoint](#create-a-new-tls-endpoint) (for example, `192.168.185.198:3333`).  
Note  
We recommend using the private IP of your managed network endpoint and not a hostname to prevent issues related to DNS lookups resolving the incorrect IP.
5. (Optional) In **TLS Cert SHA-256**, enter the [SHA-256 fingerprint](#2-extract-the-sha-256-fingerprint) of the TLS certificate. This field is only needed for self-signed certificates. If a TLS fingerprint is not supplied, the Cloudflare One Client validates the certificate against the local certificate store and checks that it is signed by a public certificate authority.
6. Select **Save**.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. Add a managed network using the [cloudflare\_zero\_trust\_device\_managed\_network ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fmanaged%5Fnetwork) resource:  
```  
resource "cloudflare_zero_trust_device_managed_networks" "office" {  
  account_id = var.cloudflare_account_id  
  name       = "Office managed network"  
  type       = "tls"  
  config = {  
    tls_sockaddr = "192.168.185.198:3333"  
    sha256       = "DD4F4806C57A5BBAF1AA5B080F0541DA75DB468D0A1FE731310149500CCD8662"  
  }  
}  
```

The Cloudflare One Client will automatically exclude the TLS endpoint from all device profiles if it is specified as a private IP address. This exclusion prevents remote users from accessing the endpoint through the WARP tunnel on any port. If the TLS endpoint is specified as a hostname instead of a private IP, the Cloudflare One Client will not automatically exclude it.

Split Tunnels in Include mode

If a device profile uses [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) in **Include** mode, ensure that your Split Tunnel entries do not contain the TLS endpoint IP address; otherwise the Cloudflare One Client will exclude the entire Split Tunnel entry from the tunnel. For example, if you are currently including `10.0.0.0/8` but your TLS endpoint is on `10.0.0.1`, use our [IP subtraction calculator](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#add-a-route) to remove `10.0.0.1` from `10.0.0.0/8`.

## 4\. Configure device profile

* [ Dashboard ](#tab-panel-7430)
* [ Terraform (v5) ](#tab-panel-7431)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles** \> **General profiles**.
2. Create a [new profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) or edit an existing profile.
3. To apply this profile whenever a device connects to your network, add the following rule:  
| Selector        | Operator | Value          |  
| --------------- | -------- | -------------- |  
| Managed network | is       | <NETWORK-NAME> |
4. Save the profile.

In [cloudflare\_zero\_trust\_device\_custom\_profile ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fcustom%5Fprofile), configure a `match` expression using the `network` selector. For example, the following device profile will match all devices connected a specific managed network:

```

resource "cloudflare_zero_trust_device_custom_profile" "office" {

  account_id            = var.cloudflare_account_id

  name                  = "Office"

  description           = "Devices connected to the office network"

  precedence            = 1

  service_mode_v2       = {mode = "warp"}


  match = trimspace(replace(<<-EOT

    network == "${cloudflare_zero_trust_device_managed_networks.office.name}"

  EOT

  , "\n", " "))

}


```

Managed networks are now enabled. Every time a device in your organization connects to a network (for example, when waking up the device or changing Wi-Fi networks), the Cloudflare One Client will determine its network location and apply the corresponding settings profile.

## 5\. Verify managed network

To check if the Cloudflare One Client detects the network location:

1. Connect the Cloudflare One Client.
2. Disconnect and reconnect to the network.
3. Open a terminal and run `warp-cli debug alternate-network`.

## Related resources

* [Device profiles](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) \- How to create and manage the device profiles you apply via managed networks.
* [Device client settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/) \- Defines how the Cloudflare One Client behaves and what users can do.
* [Cloudflare One Client troubleshooting guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/troubleshooting-guide/) \- Troubleshoot common Cloudflare One Client issues.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/managed-networks/#page","headline":"Managed networks · Cloudflare One docs","description":"Managed networks in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/managed-networks/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS","PowerShell"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/","name":"Configure the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/managed-networks/","name":"Managed networks"}}]}
```
