---
title: Troubleshooting
description: Resolve common Cloudflare Tunnel connection and configuration issues.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshooting

Use this page to diagnose and resolve common issues with Cloudflare Tunnel. Many issues are resolved by upgrading to the latest version of `cloudflared` — refer to [Update cloudflared](https://developers.cloudflare.com/tunnel/downloads/update-cloudflared/) before investigating further.

For tunnel health monitoring, logs, and metrics, refer to [Monitoring](https://developers.cloudflare.com/tunnel/monitoring/).

## Connection errors

When `cloudflared` cannot reach the Cloudflare network, it [logs](https://developers.cloudflare.com/tunnel/monitoring/#logs) specific error messages that indicate whether the issue is DNS resolution, QUIC (UDP), or TCP connectivity.

### DNS resolution failures

#### `edge discovery: error looking up Cloudflare edge IPs`

```

ERR edge discovery: error looking up Cloudflare edge IPs: the DNS query failed

    error="lookup _v2-origintunneld._tcp.argotunnel.com on 172.19.64.1:53: no such host"


```

This error means the DNS resolver configured on your machine cannot resolve the SRV records that `cloudflared` uses to discover the [Cloudflare Tunnel destination IPs](https://developers.cloudflare.com/tunnel/configuration/#firewall-rules). Common causes include corporate DNS resolvers that strip or block SRV records, and DNS resolvers that return compressed SRV records.

**To diagnose:**

On the `cloudflared` host machine, run:

Terminal window

```

dig SRV _v2-origintunneld._tcp.argotunnel.com


```

If you receive `SERVFAIL`, `NXDOMAIN`, or an empty answer, test against Cloudflare's public resolver:

Terminal window

```

dig SRV _v2-origintunneld._tcp.argotunnel.com @1.1.1.1


```

**To resolve:**

* If `1.1.1.1` returns results but your local resolver does not, configure the host to use [Cloudflare DNS (1.1.1.1)](https://developers.cloudflare.com/1.1.1.1/setup/) or another public resolver.
* If neither resolver returns results, your firewall is likely blocking outbound DNS queries (UDP port `53`). Work with your network administrator to allow DNS traffic.

#### `DNS query failed ... i/o timeout`

```

ERR edge discovery: error looking up Cloudflare edge IPs: the DNS query failed

    error="lookup _v2-origintunneld._tcp.argotunnel.com on 127.0.0.11:53:

    read udp 127.0.0.1:53467->127.0.0.11:53: i/o timeout"


```

This variant means DNS queries from `cloudflared` are being blocked or dropped entirely — the resolver never responds. This is common in container environments (Docker, Kubernetes) where the internal DNS resolver (`127.0.0.11`) is unreachable or misconfigured.

**To resolve:**

* In Docker, verify your container's DNS configuration (`/etc/resolv.conf`). You can override the resolver with `--dns 1.1.1.1` when running the container.
* In Kubernetes, verify the `kube-dns` or `CoreDNS` service is running and reachable from the pod.
* On the `cloudflared` host, verify that the resolver listed in `/etc/resolv.conf` is reachable and responding to queries.

### QUIC handshake timeout

#### `Failed to dial a quic connection`

```

ERR Failed to dial a quic connection error="failed to dial to edge with quic:

    timeout: handshake did not complete in time" connIndex=0 ip=198.41.192.227

INF Retrying connection in up to 2s connIndex=0 ip=198.41.192.227


```

This error means `cloudflared` resolved the [Cloudflare Tunnel destination IPs](https://developers.cloudflare.com/tunnel/configuration/#firewall-rules) but could not complete a QUIC handshake over UDP port `7844`. Your network or firewall is blocking outbound UDP traffic to Cloudflare.

`cloudflared` retries with exponential backoff (2, 4, 8, 16, 32, up to 64 seconds). After exhausting retries, it falls back to HTTP/2 over TCP:

```

INF Switching to fallback protocol http2 connIndex=0


```

If the fallback also fails, you will see a [TCP connection timeout](#tcp-connection-timeout) error.

**To diagnose:**

On the `cloudflared` host machine, test connectivity on port `7844`:

Terminal window

```

nc -uvz -w 3 198.41.192.227 7844


```

Replace `198.41.192.227` with the IP shown in your [error message](#failed-to-dial-a-quic-connection). If the port is closed or blocked by a firewall, the command will return `Connection refused` or time out.

**To resolve:**

* Allow outbound UDP traffic to port `7844` on your firewall or security group. Refer to the [full list of IPs and ports](https://developers.cloudflare.com/tunnel/configuration/#firewall-rules).
* If you cannot open UDP, `cloudflared` will fall back to HTTP/2 over TCP automatically. You can also force HTTP/2 by setting the `--protocol http2` [run parameter](https://developers.cloudflare.com/tunnel/configuration/#run-parameters), but QUIC is recommended for better performance.

### TCP connection timeout

#### `DialContext error: dial tcp ... i/o timeout`

```

ERR Unable to establish connection with Cloudflare edge

    error="DialContext error: dial tcp 198.41.200.43:7844: i/o timeout" connIndex=0

ERR Serve tunnel error

    error="DialContext error: dial tcp 198.41.200.43:7844: i/o timeout" connIndex=0


```

This error means `cloudflared` cannot reach Cloudflare over TCP port `7844`. If you also see the [QUIC handshake timeout](#failed-to-dial-a-quic-connection) above it, both UDP and TCP are blocked — the tunnel cannot connect at all.

**To diagnose:**

As a quick test, run:

Terminal window

```

curl -v https://region1.v2.argotunnel.com:7844


```

If the connection hangs, traffic is being dropped between your host and Cloudflare.

To test if `cloudflared` can connect on port `7844`, run:

Terminal window

```

nc -vz -w 3 198.41.200.43 7844


```

Replace `198.41.200.43` with the IP shown in your [error message](#dialcontext-error-dial-tcp--io-timeout). If the port is closed or blocked by a firewall, the command will return `Connection refused` or time out.

**To resolve:**

* Allow outbound TCP traffic to port `7844` to the [Cloudflare Tunnel IP ranges](https://developers.cloudflare.com/tunnel/configuration/#firewall-rules).
* If your environment blocks port `7844` entirely (both UDP and TCP), the tunnel cannot function. Work with your network administrator to allow outbound traffic on this port.

## I see `cloudflared service is already installed`.

If you see this error when installing a remotely-managed tunnel, ensure that no other `cloudflared` instances are running as a service on this machine. Only a single instance of `cloudflared` may run as a service on any given machine. Instead, add additional routes to your existing tunnel. Alternatively, you can run `sudo cloudflared service uninstall` to uninstall `cloudflared`.

## I see `An A, AAAA, or CNAME record with that host already exists`.

If you are unable to save your tunnel's public hostname, choose a different hostname or delete the existing DNS record. [Check the DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) for your domain from the [Cloudflare dashboard ↗](https://dash.cloudflare.com).

## Tunnel credentials file does not exist or is not a file.

If you encounter the following error when running a tunnel, double check your `config.yml` file and ensure that the `credentials-file` points to the correct location. You may need to change `/root/` to your home directory.

Terminal window

```

cloudflared tunnel run


```

```

2021-06-04T06:21:16Z INF Starting tunnel tunnelID=928655cc-7f95-43f2-8539-2aba6cf3592d

Tunnel credentials file '/root/.cloudflared/928655cc-7f95-43f2-8539-2aba6cf3592d.json' doesn't exist or is not a file


```

## My tunnel fails to authenticate.

To start using Cloudflare Tunnel, a super administrator in the Cloudflare account must first log in through `cloudflared login`. The client will launch a browser window and prompt the user to select a hostname in their Cloudflare account. Once selected, Cloudflare generates a certificate that consists of three components:

* The public key of the origin certificate for that hostname
* The private key of the origin certificate for that domain
* A token that is unique to Cloudflare Tunnel

Those three components are bundled into a single PEM file that is downloaded one time during that login flow. The host certificate is valid for the root domain and any subdomain one-level deep. Cloudflare uses that certificate file to authenticate `cloudflared` to create DNS records for your domain in Cloudflare.

The third component, the token, consists of the zone ID (for the selected domain) and an API token scoped to the user who first authenticated with the login command. When user permissions change (if that user is removed from the account or becomes an admin of another account, for example), Cloudflare rolls the user's API key. However, the certificate file downloaded through `cloudflared` retains the older API key and can cause authentication failures. The user will need to login once more through `cloudflared` to regenerate the certificate. Alternatively, the administrator can create a dedicated service user to authenticate.

## I see an error: x509: certificate signed by unknown authority.

This means the origin is using a certificate that `cloudflared` does not trust. For example, you may get this error if you are using SSL/TLS inspection in a proxy between your server and Cloudflare. To resolve:

* Add the certificate to the system certificate pool.
* Use the `--origin-ca-pool` flag and specify the path to the certificate.
* Use the `--no-tls-verify` flag to stop `cloudflared` checking the certificate for a trust chain.

## I see an error 1033 when attempting to run a tunnel.

A `1033` error indicates your tunnel is not connected to Cloudflare's network because Cloudflare's network cannot find a healthy `cloudflared` instance to receive the traffic.

First, review whether your tunnel is listed as `Active` in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) by going to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels** or run `cloudflared tunnel list`. If the tunnel is not `Active`, review the following and take the action necessary for your tunnel status:

| Status       | Meaning                                                                                                                                                                                                                                                                                                                                                               | Recommended Action                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Healthy**  | The tunnel is active and serving traffic through four connections to the Cloudflare global network.                                                                                                                                                                                                                                                                   | No action is required. Your tunnel is running correctly.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Inactive** | The tunnel has been created (via the API or dashboard) but the cloudflared connector has never been run to establish a connection.                                                                                                                                                                                                                                    | Run the tunnel as a service (recommended) or use the cloudflared tunnel run command on your origin server to connect the tunnel to Cloudflare. Refer to [substep 6 of step 1 in the Create a Tunnel dashboard guide](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/#1-create-a-tunnel) or step 4 in the [Create a Tunnel API guide](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel-api/#4-install-and-run-the-tunnel). |
| **Down**     | The tunnel was previously connected but is currently disconnected because the cloudflared process has stopped.                                                                                                                                                                                                                                                        | 1\. Ensure the cloudflared [service](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/) or process is actively running on your server.  2\. Check for server-side issues, such as the machine being powered off, an application crash, or recent network changes.                                                                                                                                                                                                                |
| **Degraded** | The cloudflared connector is running and the tunnel is serving traffic, but at least one individual connection has failed. Further degradation in [tunnel availability](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/) could risk the tunnel going down and failing to serve traffic. | 1\. Review your cloudflared [logs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/) for connection failures or error messages.  2\. Investigate local network and firewall rules to ensure they are not blocking connections to the [Cloudflare Tunnel IPs and ports](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-with-firewall/).                                                                                                       |

For more information, refer to the [comprehensive list of Cloudflare 1xxx errors](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/).

## I see a 502 Bad Gateway error when connecting to an HTTP or HTTPS application through tunnel.

A `502 Bad Gateway` error with `Unable to reach the origin service. The service may be down or it may not be responding to traffic from cloudflared` on a tunnel route means the tunnel itself is connected to the Cloudflare network, but `cloudflared` cannot reach the origin service defined in your ingress rule. Unlike [error 1033](#i-see-an-error-1033-when-attempting-to-run-a-tunnel), which indicates the tunnel is not connected to Cloudflare, a 502 error indicates the problem is between `cloudflared` and your local service.

To identify the specific cause, review your [Tunnel logs](https://developers.cloudflare.com/tunnel/monitoring/#logs) for `error`\-level messages. Common causes include:

#### Origin service is not running

If the origin service has stopped or never started, `cloudflared` logs will show an error similar to:

```

error="dial tcp [::1]:8080: connect: connection refused"


```

To resolve, verify the service is running and listening on the expected port:

Terminal window

```

curl -v http://localhost:8080


```

If the service is not running, start or restart it. You can confirm the service is listening by running `ss -tlnp | grep <PORT>` (Linux) or `lsof -iTCP -sTCP:LISTEN -nP | grep <PORT>` (macOS).

#### Origin service URL uses the wrong protocol

If the origin expects HTTPS but the tunnel route specifies `http://`, or vice versa, `cloudflared` logs will show an error similar to:

```

error="net/http: HTTP/1.x transport connection broken: malformed HTTP response \"\x15\x03\x01\x00\x02\x02\""


```

To resolve, update the service URL in your tunnel route to match the [protocol](https://developers.cloudflare.com/tunnel/routing/#supported-protocols) your origin expects. For example, change `http://localhost:8080` to `https://localhost:8080`. If you are using a locally-managed tunnel, update your ingress rule in the [configuration file](https://developers.cloudflare.com/tunnel/other-tunnel-types/local-management/configuration-file/).

#### Origin service URL points to the wrong port

If the port in your tunnel route does not match the port your service is listening on, `cloudflared` will log a `connection refused` error for that port. Double-check the service URL in your ingress rule and compare it against the port your application is bound to.

#### Origin uses a certificate that `cloudflared` does not trust

If the origin presents a TLS certificate that `cloudflared` cannot verify, the logs will show an error similar to:

```

error="x509: certificate is valid for example.com, not localhost"


```

This commonly occurs when the origin uses a self-signed certificate or when an SSL/TLS inspection proxy sits between `cloudflared` and the origin.

To resolve, use one of the following approaches:

* Set [originServerName](https://developers.cloudflare.com/tunnel/configuration/#originservername) to the hostname on the origin certificate in your tunnel route. If you are using a locally-managed tunnel, here is an example of a [configuration file](https://developers.cloudflare.com/tunnel/other-tunnel-types/local-management/configuration-file/):  
```  
ingress:  
  - hostname: app.example.com  
    service: https://localhost:443  
    originRequest:  
      originServerName: app.example.com  
```
* Provide the CA certificate using [caPool](https://developers.cloudflare.com/tunnel/configuration/#capool):  
```  
ingress:  
  - hostname: app.example.com  
    service: https://localhost:443  
    originRequest:  
      caPool: /path/to/ca-cert.pem  
```
* As a last resort, disable TLS verification with [noTLSVerify](https://developers.cloudflare.com/tunnel/configuration/#notlsverify). This is not recommended for production environments.  
```  
ingress:  
  - hostname: app.example.com  
    service: https://localhost:443  
    originRequest:  
      noTLSVerify: true  
```

## I see `ERR_TOO_MANY_REDIRECTS` when attempting to connect to an Access self-hosted app.

This error occurs when `cloudflared` does not recognize the SSL/TLS certificate presented by your origin. To resolve the issue, set the [origin server name](https://developers.cloudflare.com/tunnel/configuration/#originservername) parameter to the hostname on your origin certificate. Here is an example of a locally-managed tunnel configuration:

```

ingress:

  - hostname: test.example.com

    service: https://localhost:443

    originRequest:

      originServerName: test.example.com


```

## `cloudflared access` shows an error `websocket: bad handshake`.

This means that your `cloudflared access` client is unable to reach your `cloudflared tunnel` origin. To diagnose this, look at the `cloudflared tunnel` logs. A common root cause is that the `cloudflared tunnel` is unable to proxy to your origin (for example, because the ingress is misconfigured, the origin is down, or the origin HTTPS certificate cannot be validated by `cloudflared tunnel`). If `cloudflared tunnel` has no logs, it means Cloudflare's network is not able to route the websocket traffic to it.

There are several possible root causes behind this error:

* Your `cloudflared tunnel` is either not running or not connected to Cloudflare's network.
* WebSockets are not [enabled](https://developers.cloudflare.com/network/websockets/#enable-websockets).
* Your Cloudflare account has Universal SSL enabled but your SSL/TLS encryption mode is set to **Off (not secure)**. To resolve, go to **SSL/TLS** \> **Overview** in the Cloudflare dashboard and set your SSL/TLS encryption mode to **Flexible**, **Full**, or **Full (strict)**.
* Your requests are blocked by [Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/). To resolve, make sure you set **Definitely automated** to _Allow_ in the bot fight mode settings.
* Your SSH or RDP Access application has the [Binding Cookie](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/#binding-cookie) enabled. To disable the cookie, go to **Access controls** \> **Applications** and edit the application settings.
* One or more [Workers routes](https://developers.cloudflare.com/workers/configuration/routing/routes/) are overlapping with the tunnel hostname, and the Workers do not properly handle the traffic. To resolve, either exclude your tunnel from the Worker route by not defining a route that includes the tunnel's hostname, or update your Worker to only handle specific paths and forward all other requests to the origin (for example, by using `return fetch(req)`).

## Tunnel connections fail with SSL error.

If `cloudflared` returns error `error="remote error: tls: handshake failure"`, check to make sure the hostname in question is covered by a SSL certificate. If using a multi-level subdomain, an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) may be required as the Universal SSL will not cover more than one level of subdomain. This may surface in the browser as `ERR_SSL_VERSION_OR_CIPHER_MISMATCH`.

## Tunnel connections fail with `Too many open files` error.

If your [Cloudflare Tunnel logs](https://developers.cloudflare.com/tunnel/monitoring/#logs) return a `socket: too many open files` error, it means that `cloudflared` has exhausted the open files limit on your machine. The maximum number of open files, or file descriptors, is an operating system setting that determines how many files a process is allowed to open. To increase the open file limit, you will need to [configure ulimit settings](https://developers.cloudflare.com/tunnel/configuration/#ulimits) on the machine running `cloudflared`.

## I see `failed to sufficiently increase receive buffer size` in my cloudflared logs.

This buffer size increase is reported by the [quic-go library ↗](https://github.com/quic-go/quic-go) leveraged by [cloudflared ↗](https://github.com/cloudflare/cloudflared). You can learn more about the log message in the [quic-go repository ↗](https://github.com/quic-go/quic-go/wiki/UDP-Buffer-Sizes). This log message is generally not impactful and can be safely ignored when troubleshooting. However, if you have deployed `cloudflared` within a unique, high-bandwidth environment then buffer size can be manually overridden for testing purposes.

To set the maximum receive buffer size on Linux:

1. Create a new file under `/etc/sysctl.d/`:  
Terminal window  
```  
sudo vi 98-core-rmem-max.conf  
```
2. In the file, define the desired buffer size:  
```  
net.core.rmem_max=2500000  
```
3. Reboot the host machine running `cloudflared`.
4. To validate that these changes have taken effect, use the `grep` command:  
Terminal window  
```  
sudo sysctl -a | grep net.core.rmem_max  
```  
```  
net.core.rmem_max = 2500000  
```

## Cloudflare Tunnel is buffering my streaming response instead of streaming it live.

Proxied traffic through Cloudflare Tunnel is buffered by default unless the origin server includes the `Content-Type: text/event-stream` response header. This header tells `cloudflared` to stream data as it arrives instead of buffering the entire response.

## How do I contact support?

For the fastest possible troubleshooting, ensure your support ticket includes comprehensive details. The more context you provide, the faster your issue can be identified and resolved.

To ensure efficient resolution when [contacting support](https://developers.cloudflare.com/support/contacting-cloudflare-support/), include as much relevant detail as possible in your ticket:

* Context: Briefly describe the scenario or use case (for example, where the user was, what they were trying to do).
* Reproduction steps: Describe the steps you took to reproduce the issue during troubleshhooting.
* Timestamps: Be specific and include the exact time and time zone when the issue occurred.
* Troubleshooting attempts: Outline any troubleshooting steps or changes already attempted to resolve the issue.
* Tunnel ID and tunnel name.
* `cloudflared` version (run `cloudflared --version`).
* How the tunnel was set up (locally-managed or remotely-managed via the dashboard).
* Tunnel logs: Include the [logs from your local machine](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/#view-logs-on-your-local-machine).
* Tunnel diagnostic logs: Include [tunnel diagnostic logs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/diag-logs/).

Write a detailed ticket to resolve your issue faster

Avoid vague descriptions and include scenario, timestamps, and steps taken to troubleshoot the issue. Refer to the following example:

Acme Corp attempted to establish a tunnel connection on October 30, 2025, at approximately 3:45 PM UTC. DNS resolution and TCP connectivity tests passed, but the `cloudflared` daemon logs showed `failed to sufficiently increase receive buffer size` errors. The tunnel diagnostic logs collected at 3:50 PM UTC are attached, along with the output from the DNS and network connectivity pre-checks.

### Collect debug logs

To capture verbose output for troubleshooting:

* **Locally-managed tunnels**: Run `cloudflared` with the `--loglevel debug` flag:  
Terminal window  
```  
cloudflared tunnel --loglevel debug run  
```  
To persist logs to a file, add the `--logfile` flag:  
Terminal window  
```  
cloudflared tunnel --loglevel debug --logfile /var/log/cloudflared/cloudflared.log run  
```
* **Remotely-managed tunnels** (created via the dashboard): Configure logging in the tunnel's [run parameters](https://developers.cloudflare.com/tunnel/advanced/run-parameters/#loglevel). You can also stream logs in real time using the [remote log streaming](https://developers.cloudflare.com/tunnel/monitoring/#remote-log-streaming) feature.

Attach the debug logs when contacting support — refer to the checklist above for the full list of information to include.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/troubleshooting/#page","headline":"Troubleshooting · Cloudflare Docs","description":"Resolve common Cloudflare Tunnel connection and configuration issues.","url":"https://developers.cloudflare.com/tunnel/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":3,"item":{"@id":"/tunnel/troubleshooting/","name":"Troubleshooting"}}]}
```
