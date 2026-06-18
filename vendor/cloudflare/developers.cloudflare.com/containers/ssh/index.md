---
title: SSH
description: Connect to running container instances with SSH.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SSH

Anyone with write access to a Container can SSH into it with Wrangler as long as a matching public key is listed in `authorized_keys`.

SSH does not expose a publicly accessible port on the Container. The only way to connect is through Wrangler with [wrangler containers ssh](https://developers.cloudflare.com/workers/wrangler/commands/containers/#containers-ssh), which authenticates against your Cloudflare account.

## Configure SSH

SSH can be configured in your [Container's configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#containers) with the `ssh` and `authorized_keys` properties. Only the `ssh-ed25519` key type is supported.

The `ssh.enabled` property only controls whether you can SSH into a Container through Wrangler. It defaults to `true`. Set it to `false` to disable SSH access completely.

## Connect with Wrangler

To SSH into a Container with Wrangler, add an `ssh-ed25519` public key to `authorized_keys` in your Container configuration. The following example shows a basic configuration:

* [  wrangler.jsonc ](#tab-panel-7860)
* [  wrangler.toml ](#tab-panel-7861)

JSONC

```

{

  "containers": [

    {

      // other options here...

      "authorized_keys": [

        {

          "name": "<NAME>",

          "public_key": "<YOUR_PUBLIC_KEY_HERE>"

        }

      ]

    }

  ]

}


```

TOML

```

[[containers]]

[[containers.authorized_keys]]

name = "<NAME>"

public_key = "<YOUR_PUBLIC_KEY_HERE>"


```

For more information on configuring SSH, refer to [SSH configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#ssh).

Find the instance ID for your Container by running [wrangler containers instances](https://developers.cloudflare.com/workers/wrangler/commands/containers/#containers-instances) or in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/workers/containers). The instance you want to SSH into must be running. SSH will not start a stopped Container, and an active SSH connection alone will not keep a Container alive.

Once SSH is configured and the Container is running, open the SSH connection with:

Terminal window

```

wrangler containers ssh <INSTANCE_ID>


```

## Use as SSH proxy

You can use `wrangler containers ssh` as an OpenSSH `ProxyCommand`. This lets your local SSH client connect through Wrangler.

Terminal window

```

ssh -o ProxyCommand="wrangler containers ssh %h" cloudchamber@<INSTANCE_ID>


```

When used this way, Wrangler pipes standard input and output to the SSH server in the running Container. You can also pass `--stdio` to force this mode.

## Process visibility

Without the [containers\_pid\_namespace](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#use-an-isolated-pid-namespace-for-containers) compatibility flag, all processes inside the VM are visible when you connect to your Container through SSH. This flag is turned on by default for Workers with a [compatibility date](https://developers.cloudflare.com/workers/configuration/compatibility-dates/) of `2026-04-01` or later.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/ssh/#page","headline":"SSH · Cloudflare Containers docs","description":"Connect to running container instances with SSH.","url":"https://developers.cloudflare.com/containers/ssh/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/ssh/","name":"SSH"}}]}
```
