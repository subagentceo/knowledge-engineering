---
title: System requirements
description: System requirements for running cloudflared.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# System requirements

`cloudflared` is lightweight enough to run on a Raspberry Pi or a data center server. Tunnel throughput is primarily limited by the number of ports configured in system software, not hardware.

## Baseline recommendations

Run a `cloudflared` [replica](https://developers.cloudflare.com/tunnel/configuration/#replicas-and-high-availability) on two dedicated hosts per location with a minimum of 4 GB RAM and 4 CPU cores. Allocate 50,000 ports per host.

## Port configuration

* [ Linux ](#tab-panel-10988)
* [ Windows ](#tab-panel-10989)

To increase the number of ports available to `cloudflared` on Linux:

If your machine has a `/etc/sysctl.d/` directory:

Terminal window

```

echo 'net.ipv4.ip_local_port_range = 11000 60999' | sudo tee -a /etc/sysctl.d/99-cloudflared.conf

sudo sysctl -p /etc/sysctl.d/99-cloudflared.conf


```

Otherwise:

Terminal window

```

echo 'net.ipv4.ip_local_port_range = 11000 60999' | sudo tee -a /etc/sysctl.conf

sudo sysctl -p /etc/sysctl.conf


```

To increase the number of ports available to `cloudflared` on Windows, set the [dynamic port range ↗](https://learn.microsoft.com/en-us/troubleshoot/windows-client/networking/tcp-ip-port-exhaustion-troubleshooting) for TCP and UDP:

```

netsh int ipv4 set dynamicport tcp start=11000 num=50000

netsh int ipv4 set dynamicport udp start=11000 num=50000

netsh int ipv6 set dynamicport tcp start=11000 num=50000

netsh int ipv6 set dynamicport udp start=11000 num=50000


```

## ulimits (Linux and macOS)

On Linux and macOS, `ulimit` settings determine the system resources available to a logged-in user. We recommend configuring the following ulimits on the `cloudflared` server:

| ulimit | Description                                      | Value    |
| ------ | ------------------------------------------------ | -------- |
| \-n    | Maximum number of open files or file descriptors | ≥ 70,000 |

To view your current ulimits, open a terminal and run:

Terminal window

```

ulimit -a


```

To set the open files `ulimit`:

Terminal window

```

ulimit -n 70000


```

The command above sets the open files limit only for the current terminal session and will not persist after a reboot or new login. To apply this limit permanently, configure it using the persistent method appropriate for your operating system.

## Capacity calculator

To estimate tunnel capacity requirements for your deployment:

1. Use the [metrics endpoint](https://developers.cloudflare.com/tunnel/monitoring/#cloudflared-metrics) to measure `cloudflared_tcp_total_sessions` and `cloudflared_udp_total_sessions`.
2. Compute the average **TCP requests per second** by dividing `cloudflared_tcp_total_sessions` by total time.
3. Compute the average **Non-DNS UDP requests per second** by dividing `cloudflared_udp_total_sessions` by total time.
4. Input **TCP requests per second** and **Non-DNS UDP requests per second** into the calculator below. (You can leave **Private DNS requests per second** as `0` unless you are using the tunnel for [private network access](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/system-requirements/).)

System configuration 

Available ports per host   

Number of cloudflared replicas   

DNS UDP session timeout (in seconds)   

Average non-DNS UDP session timeout (seconds)   

Metrics 

TCP requests per second   

Non-DNS UDP requests per second   

Private DNS requests per second   

Result 

Percent capacity per replica   

Percent capacity across all replicas   

Maximum DNS requests per minute across all replicas   

This calculator is for informational purposes only and all results are estimates. 

To increase tunnel capacity, add identical hosts running `cloudflared` replicas.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/downloads/system-requirements/#page","headline":"System requirements · Cloudflare Docs","description":"System requirements for running cloudflared.","url":"https://developers.cloudflare.com/tunnel/downloads/system-requirements/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":3,"item":{"@id":"/tunnel/downloads/","name":"Downloads"}},{"@type":"ListItem","position":4,"item":{"@id":"/tunnel/downloads/system-requirements/","name":"System requirements"}}]}
```
