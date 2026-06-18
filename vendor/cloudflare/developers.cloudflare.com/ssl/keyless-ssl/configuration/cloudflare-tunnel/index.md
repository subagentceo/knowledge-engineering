---
title: Cloudflare Tunnel
description: Deploy Keyless SSL with Cloudflare Tunnel for private connectivity.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Tunnel

Through an integration with [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), you can send traffic to a key server through a secure channel and avoid exposing your key server to the public Internet.

---

## Before you begin

### Supported platforms

Keyless has been tested on `amd64` and `arm` architectures. The key server binary will likely run on all architectures that Go supports. Code support may exist for other CPUs too, but these other architectures have not been tested.

In addition to running on bare metal, the key server should run without issue in a virtualized or containerized environment. Care will need to be taken to configure ingress access to the appropriate TCP port and file system access to private keys (if using filesystem storage).

### Supported operating systems

You will need to have a supported operating system (OS) to run Keyless. Supported operating systems include:

* Ubuntu 20.04 LTS (Focal), 22.04 LTS (Jammy), 24.04 LTS (Noble)
* Debian 11 (Bullseye), 12 (Bookworm), 13 (Trixie)
* RHEL 8, 9, CentOS 8, and CentOS Stream 9
* Amazon Linux 2, 2023

We strongly recommend that you use an operating system still supported by the vendor (still receiving security updates) as your key server will have access to your private keys.

---

## 1\. Install `cloudflared` on key server

First, install `cloudflared` on your key server.

This process differs depending on whether you are using the [command line](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/) or the [Cloudflare dashboard](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/).

## 2\. Create a tunnel and add a route

Then, create a Cloudflare Tunnel.

This process differs depending on whether you are using the [command line](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/) or the [Cloudflare dashboard](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/).

During tunnel creation, go to the **CIDR** tab and enter the private IP address of your key server. You can also [add a CIDR route](https://developers.cloudflare.com/cloudflare-one/networks/routes/add-routes/#add-a-cidr-route) after creating the tunnel.

After you create the tunnel, use the Cloudflare API to [List tunnel routes](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/routes/methods/list/), saving the following values for a future step:

* `"virtual_network_id"`
* `"network"`

## 3\. Upload Keyless SSL Certificates

Before your key servers can be configured, you must next upload the corresponding SSL certificates to Cloudflare’s edge. During TLS termination, Cloudflare will present these certificates to connecting browsers and then (for non-resumed sessions) communicate with the specified key server to complete the handshake.

Upload certificates to Cloudflare with only SANs that you wish to use with Cloudflare Keyless SSL. All Keyless SSL hostnames must be [proxied](https://developers.cloudflare.com/dns/proxy-status/).

You will have to upload each certificate used with Keyless SSL.

To upload a Keyless certificate with the API, send a [POST](https://developers.cloudflare.com/api/resources/keyless%5Fcertificates/methods/create/) request that includes a `"tunnel"` object.

```

"tunnel": {

  "vnet_id": "<VIRTUAL_NETWORK_ID>",

  "private_ip": "<NETWORK>"

}


```

Note

When you receive the `network` value from the Tunnel route API, it will include a subnet mask, such as `10.0.0.1/32`. Remove the subnet mask and use the IP address (`10.0.0.1`).

## 4\. Set up and activate key server

Finally, you need to install the key server on your infrastructure, populate it with the SSL keys of the certificates you wish to use to terminate TLS at Cloudflare’s edge, and activate the key server so it can be mutually authenticated.

Note

If you plan to run Keyless SSL in a [high availability setup](https://developers.cloudflare.com/ssl/keyless-ssl/reference/high-availability/), you may need to set up additional infrastructure (load balancing and health checks).

### Install

These steps are also at the [Cloudflare package repository ↗](https://pkg.cloudflare.com/).

#### Debian/Ubuntu packages

* [ Debian 13 (Trixie) ](#tab-panel-10620)
* [ Debian 12 (Bookworm) ](#tab-panel-10621)
* [ Debian 11 (Bullseye) ](#tab-panel-10622)
* [ Ubuntu 24.04 (Noble) ](#tab-panel-10623)
* [ Ubuntu 22.04 (Jammy) ](#tab-panel-10624)
* [ Ubuntu 20.04 (Focal) ](#tab-panel-10625)

Terminal window

```

sudo mkdir -p --mode=0755 /usr/share/keyrings

curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null


echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/gokeyless trixie main' | sudo tee /etc/apt/sources.list.d/cloudflare.list


sudo apt-get update && sudo apt-get install gokeyless


```

Terminal window

```

sudo mkdir -p --mode=0755 /usr/share/keyrings

curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null


echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/gokeyless bookworm main' | sudo tee /etc/apt/sources.list.d/cloudflare.list


sudo apt-get update && sudo apt-get install gokeyless


```

Terminal window

```

sudo mkdir -p --mode=0755 /usr/share/keyrings

curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null


echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/gokeyless bullseye main' | sudo tee /etc/apt/sources.list.d/cloudflare.list


sudo apt-get update && sudo apt-get install gokeyless


```

Terminal window

```

sudo mkdir -p --mode=0755 /usr/share/keyrings

curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null


echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/gokeyless noble main' | sudo tee /etc/apt/sources.list.d/cloudflare.list


sudo apt-get update && sudo apt-get install gokeyless


```

Terminal window

```

sudo mkdir -p --mode=0755 /usr/share/keyrings

curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null


echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/gokeyless jammy main' | sudo tee /etc/apt/sources.list.d/cloudflare.list


sudo apt-get update && sudo apt-get install gokeyless


```

Terminal window

```

sudo mkdir -p --mode=0755 /usr/share/keyrings

curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null


echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/gokeyless focal main' | sudo tee /etc/apt/sources.list.d/cloudflare.list


sudo apt-get update && sudo apt-get install gokeyless


```

#### RHEL/CentOS/Amazon Linux packages

Gokeyless uses CGO for PKCS#11/HSM support, which creates glibc dependencies. Use the repository that matches your distribution.

* [ RHEL 9 / CentOS Stream 9 ](#tab-panel-10626)
* [ Amazon Linux 2023 ](#tab-panel-10627)
* [ RHEL 8 / CentOS 8 ](#tab-panel-10628)
* [ Amazon Linux 2 ](#tab-panel-10629)

Terminal window

```

sudo dnf config-manager --add-repo https://pkg.cloudflare.com/gokeyless/rpm/gokeyless.repo

sudo dnf install gokeyless


```

Terminal window

```

curl -fsSl https://pkg.cloudflare.com/gokeyless/rpm/gokeyless.repo | sudo tee /etc/yum.repos.d/gokeyless.repo

sudo yum update

sudo yum install gokeyless


```

Terminal window

```

sudo dnf config-manager --add-repo https://pkg.cloudflare.com/gokeyless/rpm-el8/gokeyless.repo

sudo dnf install gokeyless


```

Terminal window

```

curl -fsSl https://pkg.cloudflare.com/gokeyless/rpm-el8/gokeyless.repo | sudo tee /etc/yum.repos.d/gokeyless.repo

sudo yum update

sudo yum install gokeyless


```

### Configure

Add your Cloudflare account details to the configuration file located at `/etc/keyless/gokeyless.yaml`:

1. Set the hostname of the key server, for example, `keyserver.keyless.example.com`. This is also the value you entered when you uploaded your keyless certificate and is the hostname of your key server that holds the key for this certificate.
2. Set the Zone ID (found on **Overview** tab of the Cloudflare dashboard).
3. [Set the Origin CA API key](https://developers.cloudflare.com/fundamentals/api/get-started/ca-keys).

### Populate keys

Install your private keys in `/etc/keyless/keys/` and set the user and group to keyless with 400 permissions. Keys must be in PEM or DER format and have an extension of `.key`:

Terminal window

```

ls -l /etc/keyless/keys


```

```

-r-------- 1 keyless keyless 1675 Nov 18 16:44 example.com.key


```

When running multiple key servers, make sure all required keys are distributed to each key server. Customers typically will either use a configuration management tool such as Salt or Puppet to distribute keys or mount `/etc/keyless/keys` to a network location accessible only by your key servers. Keys are read on boot into memory, so a network path must be accessible during the gokeyless process start/restart.

### Activate

To activate, restart your keyless instance:

* systemd: `sudo service gokeyless restart`
* upstart/sysvinit: `sudo /etc/init.d/gokeyless restart`

If this command fails, try troubleshooting by [checking the logs](https://developers.cloudflare.com/ssl/keyless-ssl/troubleshooting/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/keyless-ssl/configuration/cloudflare-tunnel/#page","headline":"Cloudflare Tunnel setup - Keyless SSL · Cloudflare SSL/TLS docs","description":"Deploy Keyless SSL with Cloudflare Tunnel for private connectivity.","url":"https://developers.cloudflare.com/ssl/keyless-ssl/configuration/cloudflare-tunnel/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Integration"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/keyless-ssl/","name":"Keyless SSL"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/keyless-ssl/configuration/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/keyless-ssl/configuration/cloudflare-tunnel/","name":"Cloudflare Tunnel"}}]}
```
