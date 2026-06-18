---
title: Zero Trust GitLab SSH &amp; HTTP
description: Learn how to add Zero Trust rules to a self-hosted instance of GitLab. This tutorial walks you through deploying GitLab in DigitalOcean.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Zero Trust GitLab SSH & HTTP

**Last reviewed:**  over 5 years ago 

You can use Cloudflare Access to add Zero Trust rules to a self-hosted instance of GitLab. Combined with Cloudflare Tunnel, users can connect through HTTP and SSH and authenticate with your team's identity provider.

**This walkthrough covers how to:**

* Deploy an instance of GitLab
* Lock down all inbound connections to that instance and use Cloudflare Tunnel to set outbound connections to Cloudflare
* Build policies with Cloudflare Access to control who can reach GitLab
* Connect over HTTP and SSH through Cloudflare

**Time to complete:**

1 hour

---

## Deploying GitLab

This section walks through deploying GitLab in DigitalOcean. If you have already deployed GitLab, you can skip this section.

Create a Droplet that has 16 GB of RAM and 6 CPUs. This should make it possible to support 500 users, based on [GitLab's resource recommendations ↗](https://docs.gitlab.com/ee/install/requirements.html).

![Create Droplet](https://developers.cloudflare.com/_astro/create-droplet.5w9w-Z20_Z1VnfVG.webp) 

GitLab will provide an external IP that is exposed to the Internet (for now). You will need to connect to the deployed server using this external IP for the initial configuration. You can secure connections to the IP by [adding SSH keys ↗](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2) to your DigitalOcean account.

This example uses a macOS machine to configure the Droplet. Copy the IP address assigned to the machine from DigitalOcean.

![Machine IP](https://developers.cloudflare.com/_astro/show-ip.BX4xqubr_8H1My.webp) 

Open Terminal and run the following command, replacing the IP address with the IP assigned by DigitalOcean.

Terminal window

```

ssh root@134.209.124.123


```

Next, install GitLab. This example uses the [Ubuntu package ↗](https://about.gitlab.com/install/#ubuntu) and the steps in the GitLab documentation, with a few exceptions called out below.

Run the following commands to begin.

Terminal window

```

sudo apt-get update


sudo apt-get install -y curl openssh-server ca-certificates

curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh | sudo bash


```

The commands above download the GitLab software to this machine. You must now install it. This is the first place this tutorial will diverge from the operations in the GitLab documentation. The next step in the GitLab-provided tutorial sets an external hostname. Instead, you can just install the software.

Terminal window

```

sudo apt-get install gitlab-ee


```

After a minute or so, GitLab will be installed.

![Install GitLab](https://developers.cloudflare.com/_astro/install-gitlab.COTmg1AD_2wx6Wb.webp) 

However, the application is not running yet. You can check to see what ports are listening to confirm by using `ss`.

Terminal window

```

sudo ss -lntup


```

The result should be only the services currently active on the machine:

Terminal window

```

sudo ss -lntup


```

```

Netid   State    Recv-Q   Send-Q     Local Address:Port     Peer Address:Port   Process

udp     UNCONN   0        0                      *:9094                *:*

tcp     LISTEN   0        128              0.0.0.0:22            0.0.0.0:*       users:(("sshd",pid=29,fd=3))

tcp     LISTEN   0        128                 [::]:22               [::]:*       users:(("sshd",pid=29,fd=4))


```

To start GitLab, run the software's reconfigure command.

Terminal window

```

sudo gitlab-ctl reconfigure


```

GitLab will launch its component services. Once complete, confirm that GitLab is running and listening on both ports 22 and 80.

![GitLab Services](https://developers.cloudflare.com/_astro/gitlab-services.DWHydQAd_1zXwjJ.webp) 

Terminal window

```

sudo ss -lntup


```

```

Netid   State    Recv-Q   Send-Q     Local Address:Port     Peer Address:Port   Process

udp     UNCONN   0        0                      *:9094                *:*

tcp     LISTEN   0        4096           127.0.0.1:9236          0.0.0.0:*

tcp     LISTEN   0        4096           127.0.0.1:8150          0.0.0.0:*

tcp     LISTEN   0        128              0.0.0.0:22            0.0.0.0:*       users:(("sshd",pid=29,fd=3))

tcp     LISTEN   0        4096           127.0.0.1:8151          0.0.0.0:*

tcp     LISTEN   0        4096           127.0.0.1:3000          0.0.0.0:*

tcp     LISTEN   0        4096           127.0.0.1:8153          0.0.0.0:*

tcp     LISTEN   0        4096           127.0.0.1:8154          0.0.0.0:*

tcp     LISTEN   0        4096           127.0.0.1:8155          0.0.0.0:*

tcp     LISTEN   0        511              0.0.0.0:8060          0.0.0.0:*       users:(("nginx",pid=324,fd=8))

tcp     LISTEN   0        4096           127.0.0.1:9121          0.0.0.0:*

tcp     LISTEN   0        4096           127.0.0.1:9090          0.0.0.0:*

tcp     LISTEN   0        4096           127.0.0.1:9187          0.0.0.0:*

tcp     LISTEN   0        4096           127.0.0.1:9093          0.0.0.0:*

tcp     LISTEN   0        4096           127.0.0.1:9229          0.0.0.0:*

tcp     LISTEN   0        1024           127.0.0.1:8080          0.0.0.0:*

tcp     LISTEN   0        511              0.0.0.0:80            0.0.0.0:*       users:(("nginx",pid=324,fd=7))

tcp     LISTEN   0        4096           127.0.0.1:9168          0.0.0.0:*

tcp     LISTEN   0        4096           127.0.0.1:8082          0.0.0.0:*

tcp     LISTEN   0        128                 [::]:22               [::]:*       users:(("sshd",pid=29,fd=4))

tcp     LISTEN   0        4096                   *:9094                *:*


```

Users connect to GitLab over SSH (port 22 here) and HTTP for the web app (port 80). In the next step, you will make it possible for users to try both through Cloudflare Access. I'll leave this running and head over to the Cloudflare dashboard.

## Securing GitLab with Zero Trust rules

### Building Zero Trust policies

You can use Cloudflare Access to build Zero Trust rules to determine who can connect to both the web application of GitLab (HTTP) and who can connect over SSH.

When a user makes a request to a site protected by Access, that request hits Cloudflare's network first. Access can then check if the user is allowed to reach the application. When integrated with Cloudflare Tunnel, the Zero Trust architecture looks like this:

![GitLab Services](https://developers.cloudflare.com/_astro/teams-diagram.DZV8IyTp_ZaozQs.webp) 

To determine who can reach the application, Cloudflare Access relies on integration with identity providers like Okta, Microsoft Entra ID, or Google to issue the identity cards that get checked at the door. While a VPN allows users free range on a private network unless someone builds an active rule to stop them, Access enforces that identity check on every request (and at any granularity configured).

For GitLab, start by building two policies. Users will connect to GitLab in a couple of methods: in the web app and over SSH. Create policies to secure a subdomain for each. First, the web app.

Before you build the rule, you'll need to follow [these instructions](https://developers.cloudflare.com/cloudflare-one/setup/) to set up Cloudflare Access in your account.

Once enabled, go to the **Applications** page in Zero Trust. Select **Create new application**.

Select **Self-hosted and private**.

![Self Hosted](https://developers.cloudflare.com/_astro/policy.V6-L7e37_Z1O2Ag1.webp) 

You will be prompted to add a subdomain that will represent the resource. This must be a subdomain of a domain in your Cloudflare account. You will need separate subdomains for the web application and SSH flows.

This example uses `gitlab.widgetcorp.tech` for the web application and `gitlab-ssh.widgetcorp.tech` for SSH connectivity.

You can decide which identity providers will be allowed to authenticate. By default, all configured providers are allowed. Add rules to determine who can reach the site.

Select **Create** to publish the application. Repeat these steps for the second application, `gitlab-ssh.widgetcorp.tech`.

## Cloudflare Tunnel

Cloudflare Tunnel creates a secure, outbound-only, connection between this machine and Cloudflare's network. With an outbound-only model, you can prevent any direct access to this machine and lock down any externally exposed points of ingress. And with that, no open firewall ports.

Cloudflare Tunnel is made possible through a lightweight daemon from Cloudflare called `cloudflared`. Download and install `cloudflared` on the DigitalOcean machine by following the instructions listed on the [Downloads](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/) page.

Once installed, authenticate the instance of `cloudflared` with the following command.

Terminal window

```

cloudflared login


```

The command will print a URL that you must visit to login with your Cloudflare account.

Choose a website that you have added into your account.

Once you select one of the sites in your account, Cloudflare will download a certificate file to authenticate this instance of `cloudflared`. You can now use `cloudflared` to control Cloudflare Tunnel connections in your Cloudflare account.

![Download Cert](https://developers.cloudflare.com/_astro/cert-download.CzGYlCAx_Z1IrUwf.webp) 

### Connecting to Cloudflare

You can now connect GitLab to Cloudflare using Cloudflare Tunnel.

1. Create a new Tunnel by running the following command.

Terminal window

```

cloudflared tunnel create gitlab


```

`cloudflared` will generate a unique ID for this Tunnel, for example `6ff42ae2-765d-4adf-8112-31c55c1551ef`. You can use this Tunnel both for SSH and HTTP traffic.

1. You will need to configure Cloudflare Tunnel to proxy traffic to both destinations. The configuration below will take traffic bound for the DNS record that will be created for the web app and the DNS record to represent SSH traffic to the right port.

You use the text editor of your choice to edit the configuration file. The example relies on `Vi`.

Terminal window

```

vim ~/.cloudflared/config.yml


```

1. Configure the Tunnel to serve traffic.

```

tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef

credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json


ingress:

  - hostname: gitlab.widgetcorp.tech

    service: http://localhost:80

  - hostname: gitlab-ssh.widgetcorp.tech

    service: ssh://localhost:22

  # Catch-all rule, which just responds with 404 if traffic doesn't match any of

  # the earlier rules

  - service: http_status:404


```

![Self Hosted](https://developers.cloudflare.com/_astro/config-file.C9yhlhb3_fa9dL.webp) 
1. You can test that the configuration file is set correctly with the following command:

Terminal window

```

cloudflared tunnel ingress validate


```

`cloudflared` should indicate the Tunnel is okay. You can now begin running the Tunnel.

Terminal window

```

cloudflared tunnel run


```

![Tunnel Run](https://developers.cloudflare.com/_astro/tunnel-run.0yb8I0dS_Z12fkE.webp) 

Note

This command should be run as a `systemd` service for long-term use; if it terminates, GitLab will be unavailable.

### Configure DNS records

You can now create DNS records for GitLab in the Cloudflare dashboard. Remember, you will still need two records - one for the web application and one for SSH traffic.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to the **DNS Records** page for your domain.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Select **Add record**. Choose `CNAME` as the record type.
3. In the **Name** field, input `gitlab`.
4. In the **Target** field, input the ID of the Tunnel created followed by `cfargotunnel.com`. In this example, that value is:

```

6ff42ae2-765d-4adf-8112-31c55c1551ef.cfargotunnel.com


```

1. Select **Save**.
2. Repeat the process again by creating a second `CNAME` record, with the same **Target**, but input `gitlab-ssh` for the **Name**. Both records should then appear, pointing to the same Tunnel. The ingress rules defined in the configuration file above will direct traffic to the appropriate port.
![View DNS](https://developers.cloudflare.com/_astro/view-dns.D18Ri4DU_128DTe.webp) 

### Connecting to the web application

You can now test the end-to-end configuration for the web application. Visit the subdomain created for the web application. Cloudflare Access will prompt you to authenticate. Login with your provider.

Once authenticated, you should see the GitLab web application.

![GitLab Web](https://developers.cloudflare.com/_astro/gitlab-web.Jd4Y_aFN_Z27DDoX.webp) 

Register your own account and create a Blank project to test SSH in the next step.

![Blank Project](https://developers.cloudflare.com/_astro/blank-project.fZ_spCg9_86YyE.webp) 

GitLab will create a new project and repository.

Note

To pull or push code, you must also add an SSH key to your profile in GitLab.

### Configuring SSH

To push and pull code over SSH, you will need to install `cloudflared` on the client machine as well. This example uses a macOS laptop. On macOS, you can install `cloudflared` with the following command.

Terminal window

```

brew install cloudflared


```

While you need to install `cloudflared`, you do not need to wrap your SSH commands in any unique way. Instead, you will need to make a one-time change to your SSH configuration file.

Terminal window

```

vim /Users/samrhea/.ssh/config


```

Input the following values; replacing `gitlab-ssh.widgetcorp.tech` with the hostname you created.

```

Host gitlab-ssh.widgetcorp.tech

  ProxyCommand /usr/local/bin/cloudflared access ssh --hostname %h


```

You can now test the SSH flow by attempting to clone the project created earlier.

Terminal window

```

git clone git@gitlab-ssh.widgetcorp.tech:samrhea/demo


```

`cloudflared` will prompt you to login with my identity provider and, once successful, issue a token to your device to allow you to authenticate.

![GitLab Clone](https://developers.cloudflare.com/_astro/git-clone.JvUcJ24A_60TIt.webp) 

### Lock down exposed ports

You can now configure your DigitalOcean firewall with a single rule, block any inbound traffic, to prevent direct access.

![Set Rules](https://developers.cloudflare.com/_astro/disable-ingress.DuP5QaLx_Z1NcTV3.webp) 

Cloudflare Tunnel will continue to run outbound-only connections and I can avoid this machine getting caught up in a crypto mining operation, or something worse.

## View logs

You can also view logs of the events that are allowed and blocked. Open the `Access` page of the `Logs` section in Zero Trust.

## Troubleshooting

If you are using Git Large File Storage (LFS), note that Git LFS is not automatically supported by `cloudflared`. To access repositories protected by Cloudflare Access, you need to authenticate manually by running:

Terminal window

```

cloudflared access login <your-git-access-url>


```

Replace `<your-git-access-url>` with the Cloudflare Access-protected URL.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/gitlab/#page","headline":"Zero Trust GitLab SSH & HTTP · Cloudflare One docs","description":"Learn how to add Zero Trust rules to a self-hosted instance of GitLab. This tutorial walks you through deploying GitLab in DigitalOcean.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/gitlab/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSH"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/gitlab/","name":"Zero Trust GitLab SSH & HTTP"}}]}
```
