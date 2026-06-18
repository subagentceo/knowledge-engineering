---
title: SSH proxy and command logs (legacy)
description: SSH proxy and command logs (legacy) in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SSH proxy and command logs (legacy)

Legacy feature — not recommended for new deployments

This SSH proxy and command logging method is deprecated. For new deployments, use [Access for Infrastructure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/) to manage SSH sessions and log SSH commands.

Cloudflare One supports SSH proxying and command logging using Secure Web Gateway and the Cloudflare One Client.

You can create network policies to manage and monitor SSH access to your applications. When a device connects to your origin server over SSH, a session log will be generated showing which user connected, the session duration, and optionally a full replay of all commands run during the session.

## Prerequisites

* [Install the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/set-up/) on end-user devices.
* [Install the Cloudflare root certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) on end-user devices.

## 1\. Ensure Unix usernames match user SSO identities

Cloudflare Gateway will take the identity from a token and, using short-lived certificates, authorize the user on the target infrastructure.

The simplest setup is one where a user's Unix username matches their email address prefix. Issued short-lived certificates will be valid for the user's email address prefix. For example, if a user in your Okta or GSuite organization is registered as `jdoe@example.com`, they would log in to the SSH server as `jdoe`.

For testing purposes, you can run the following command to generate a Unix user on the machine:

Terminal window

```

sudo adduser jdoe


```

Advanced setup: Differing usernames

SSH certificates include one or more `principals` in their signature which indicate the Unix usernames the certificate is allowed to log in as. Cloudflare Access will always set the principal to the user's email address prefix. For example, when `jdoe@example.com` tries to connect, Access issues a short-lived certificate authorized for the principal `jdoe`.

By default, SSH servers authenticate the Unix username against the principals listed in the user's certificate. You can configure your SSH server to accept principals that do not match the Unix username.

Note

If you would like to use short-lived certificates with the browser-based terminal, the user's email address prefix needs to matches their Unix username.

**Username matches a different email**

To allow `jdoe@example.com` to log in as the user `johndoe`, add the following to the server's `/etc/ssh/sshd_config`:

```

Match user johndoe

  AuthorizedPrincipalsCommand /bin/echo 'jdoe'

  AuthorizedPrincipalsCommandUser nobody


```

This tells the SSH server that, when someone tries to authenticate as the user `johndoe`, check their certificate for the principal `jdoe`. This would allow the user `jdoe@example.com` to sign into the server with a command such as:

Terminal window

```

ssh johndoe@server


```

**Username matches multiple emails**

To allow multiple email addresses to log in as `vmuser`, add the following to the server's `/etc/ssh/sshd_config`:

```

Match user vmuser

  AuthorizedPrincipalsFile /etc/ssh/vmusers-list.txt


```

This tells the SSH server to load a list of principles from a file. Then, in `/etc/ssh/vmusers-list.txt`, list the email prefixes that can log in as `vmuser`, one per line:

```

jdoe

bwayne

robin


```

**Username matches all users**

To allow any Access user to log in as `vmuser`, add the following command to the server's `/etc/ssh/sshd_config`:

```

Match user vmuser

  AuthorizedPrincipalsCommand /bin/bash -c "echo '%t %k' | ssh-keygen -L -f - | grep -A1 Principals"

  AuthorizedPrincipalsCommandUser nobody


```

This command takes the certificate presented by the user and authorizes whatever principal is listed on it.

**Allow all users**

To allow any Access user to log in with any username, add the following to the server's `/etc/ssh/sshd_config`:

```

AuthorizedPrincipalsCommand /bin/bash -c "echo '%t %k' | ssh-keygen -L -f - | grep -A1 Principals"

AuthorizedPrincipalsCommandUser nobody


```

Since this will put the security of your server entirely dependent on your Access configuration, make sure your [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/) are correctly configured.

## 2\. Generate a Gateway SSH proxy CA

Instead of traditional SSH keys, Gateway uses short-lived certificates to authenticate traffic between Cloudflare and your origin.

Note

Other short-lived CAs, such as those used to [secure SSH servers behind Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/short-lived-certificates-legacy/), are incompatible with the Gateway SSH proxy. For SSH logging to work, you must create a new CA using the `gateway_ca` API endpoint.

To generate a Gateway SSH proxy CA and get its public key:

* [ Dashboard ](#tab-panel-7688)
* [ API ](#tab-panel-7689)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Service credentials** \> **SSH**.
2. Select **Add a certificate**.
3. Under **SSH with Access for Infrastructure**, select **Generate SSH CA**. A new row will appear in the short-lived certificates table called **SSH with Access for Infrastructure**.
4. Select the **SSH with Access for Infrastructure** certificate.
5. Copy its **CA public key**. You can return to copy this public key at any time.

1. [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:  
| Type    | Item                 | Permission |  
| ------- | -------------------- | ---------- |  
| Account | Access: SSH Auditing | Edit       |
2. If you have not yet generated a Cloudflare SSH CA, make a `POST` request to the Cloudflare API:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: SSH Auditing Write`

Add a new SSH Certificate Authority (CA)

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/gateway_ca" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

1. If you have already created a Cloudflare SSH CA or receive the error message `access.api.error.gateway_ca_already_exists`, make a `GET` request instead:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: SSH Auditing Write`
* `Access: SSH Auditing Read`

List SSH Certificate Authorities (CA)

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/gateway_ca" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

1. Copy the `public_key` value returned in the response.

## 3\. Save the public key

1. Use the following command to change directories to the SSH configuration directory on the remote target machine:  
Terminal window  
```  
cd /etc/ssh  
```
2. Once there, you can use the following command to both generate the file and open a text editor to input/paste the public key.  
Terminal window  
```  
vim ca.pub  
```
3. In the `ca.pub` file, paste the public key without any modifications.  
ca.pub  
```  
ecdsa-sha2-nistp256 <redacted> open-ssh-ca@cloudflareaccess.org  
```  
The `ca.pub` file can hold multiple keys, listed one per line. Empty lines and comments starting with `#` are also allowed.
4. Save the `ca.pub` file. In some systems, you may need to use the following command to force the file to save depending on your permissions:  
Terminal window  
```  
:w !sudo tee %  
:q!  
```

## 4\. Modify your `sshd_config` file

Configure your SSH server to trust the Cloudflare SSH CA by updating the `sshd_config` file on the remote target machine.

1. While in the `/etc/ssh` directory on the remote machine, open the `sshd_config` file.  
Terminal window  
```  
 sudo vim /etc/ssh/sshd_config  
```
2. Press `i` to enter insert mode, then add the following lines at the top of the file, above all other directives:  
```  
PubkeyAuthentication yes  
TrustedUserCAKeys /etc/ssh/ca.pub  
```  
Be aware of your include statements  
If there are any include statements below these lines, the configurations in those files will not take precedence.
3. Press `esc` and then type `:x` and press `Enter` to save and exit.

## 5\. Check your SSH port number

Cloudflare's SSH proxy only works with servers running on the default port 22\. Open the `sshd_config` file and verify that no other `Port` values are specified.

Terminal window

```

cat /etc/ssh/sshd_config


```

## 6\. Restart your SSH server

Once you have modified your `sshd` configuration, reload the SSH service on the remote machine for the changes to take effect.

* [ Debian/Ubuntu ](#tab-panel-7686)
* [ CentOS/RHEL ](#tab-panel-7687)

For Debian/Ubuntu:

Terminal window

```

sudo systemctl reload ssh


```

For CentOS/RHEL 7 and newer:

Terminal window

```

sudo systemctl reload sshd


```

## 7\. Create an Audit SSH policy

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies**.
2. In the **Network** tab, select **Add a network policy**.
3. Name the policy and specify the [Destination IP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/#destination-ip) for your origin server.  
You can enter either a public or private IP. To use a private IP, refer to [Connect private networks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/).
4. Add any other conditions to your policy. If a user does not meet the criteria, they will be blocked by default.
5. In the **Action** dropdown, select _Audit SSH_.
6. (Optional) Enable **SSH Command Logging**. If you have not already uploaded an SSH encryption public key, follow the steps in [Configure SSH Command Logging](#optional-configure-ssh-command-logging).
7. Save the policy.

## 8\. Connect as a user

Users can use any SSH client to connect to the target resource, as long as they are logged into the Cloudflare One Client on their device. Cloudflare One will authenticate, proxy, and optionally encrypt and record all SSH traffic through Gateway.

Users must specify their desired username to connect with as part of the SSH command:

Terminal window

```

ssh <username>@<hostname>


```

Note

If the target resource is already in a user's `.ssh/known_hosts` file, the user must first remove existing SSH keys before attempting to connect:

Terminal window

```

ssh-keygen -R <targetIP or hostname>


```

## (Optional) Configure SSH Command Logging

To log SSH commands, you will need to generate an HPKE key pair and upload the public key to Cloudflare.

1. [Download ↗](https://github.com/cloudflare/ssh-log-cli/releases/latest/) the Cloudflare `ssh-log-cli` utility.
2. Using the `ssh-log-cli` utility, generate a public and private key pair.  
Terminal window  
```  
./ssh-log-cli generate-key-pair -o sshkey  
ls  
```  
```  
README.md    ssh-log-cli    sshkey    sshkey.pub  
```  
This command outputs two files, an `sshkey.pub` public key and a matching `sshkey` private key.
3. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Traffic settings**.
4. In **SSH log encryption public key**, paste the contents of `sshkey.pub` and select **Save**. Note that this a different public key from the `ca.pub` file you used to configure the SSH server.

All proxied SSH commands are immediately encrypted using this public key. The matching private key is required to view logs.

## View SSH Logs

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights** \>**Logs** \> **SSH command logs**.
2. If you enabled the **SSH Command Logging** feature, you can **Download** a session's command log.
3. To decrypt the log, follow the instructions in the [SSH Logging CLI repository ↗](https://github.com/cloudflare/ssh-log-cli/). In the following example, `sshkey` is the private key that matches the public key uploaded to Cloudflare.  
Terminal window  
```  
./ssh-log-cli decrypt -i sshlog -k sshkey  
```  
This command outputs a `sshlog-decrypted.zip` file with the decrypted logs.

## Limitations

SSH Command Logging does not support SFTP since it cannot be inspected and logged.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/ssh-logging/#page","headline":"SSH proxy and command logs (legacy) · Cloudflare One docs","description":"SSH proxy and command logs (legacy) in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/ssh-logging/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSH"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/network-policies/","name":"Network policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/network-policies/ssh-logging/","name":"SSH proxy and command logs (legacy)"}}]}
```
