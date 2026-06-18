---
title: Get started
description: Begin onboarding with Magic Transit.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

## Scope your configuration

Magic Transit is not a self-serve product. Start by [engaging with our team ↗](https://www.cloudflare.com/network-services/products/magic-transit/) to assess your needs and implementation timeline. During this assessment, Cloudflare reviews specific requirements such as your prefix count and how fast you can go through the necessary steps to implement Magic Transit on your network.

## IPs

To use Magic Transit, you need to own a publicly routable IP address block with a minimum size of `/24`. If you do not own a `/24` address block, you can use Magic Transit with a Cloudflare-owned IP address. This option is helpful if you do not meet the `/24` prefix length requirements or want to protect a smaller network.

To protect your network with a Cloudflare IP address, contact your account manager. After you receive your IP address:

* [Create a tunnel](https://developers.cloudflare.com/learning-paths/data-center-protection/configure-tunnels-routes/configure-tunnels/).
* [Set up static routes](https://developers.cloudflare.com/learning-paths/data-center-protection/configure-tunnels-routes/configure-routes/#configure-static-routes) or [BGP peering (beta)](https://developers.cloudflare.com/learning-paths/data-center-protection/configure-tunnels-routes/configure-routes/#configure-bgp-routes).
* [Configure health checks](https://developers.cloudflare.com/magic-transit/network-health/run-endpoint-health-checks/).
* Confirm you properly configured [tunnel](https://developers.cloudflare.com/magic-transit/network-health/update-tunnel-health-checks-frequency/) and endpoint health checks.
* Update your infrastructure at your own pace to use the allocated Cloudflare IPs.

When you use a Cloudflare-owned IP space, you do not need a Letter of Agency (LOA). When using Cloudflare-leased IPs, Cloudflare automatically enables [Magic Transit Egress](https://developers.cloudflare.com/magic-transit/reference/egress/), which routes your egress traffic to Cloudflare instead of the Internet. Set up policy-based routing on your end to ensure return traffic routes properly.

## Verify router compatibility

Magic Transit relies on anycast tunnels to transmit packets from Cloudflare's global network to your origin network.

The routers at your tunnel endpoints must meet the following requirements for Magic Transit compatibility.

* Support GRE tunnels (or IPsec if GRE is not available).
* Support at least one tunnel per Internet service provider (ISP).
* Support maximum segment size (MSS) clamping.
* Support asymmetric traffic flow (for ingress-only Magic Transit).

## Draft Letter of Agency

Draft a [Letter of Agency (LOA)](https://developers.cloudflare.com/byoip/concepts/loa/) that identifies the prefixes you want to advertise and authorizes Cloudflare to announce them. Our transit providers require the LOA so they can accept the routes we advertise on your behalf.

If you are an Internet service provider (ISP) and advertising prefixes on behalf of a customer, you need an LOA for the ISP and for the customer.

If you are using a [Cloudflare IP address](#ips), you do not need to submit an LOA.

Note

The LOA must be a PDF. Transit providers may reject the LOA if it is a JPG or PNG.

### Example of a Letter of Agency

Letter of Agency template

```

[COMPANY LETTERHEAD]


LETTER OF AGENCY ("LOA")


[DATE]


To whom it may concern:


[COMPANY NAME] (the "Company") authorizes Cloudflare, Inc. with AS13335 to advertise the following IP address blocks / originating ASNs:


- - - - - - - - - - - - - - - - - - -

[Subnet & Originating ASN]

[Subnet & Originating ASN]

[Subnet & Originating ASN]

- - - - - - - - - - - - - - - - - - -


As a representative of the Company that is the owner of the aforementioned IP address blocks / originating ASNs, I hereby declare that I am authorized to sign this LOA on the Company’s behalf.


Should you have any questions please email me at [E-MAIL ADDRESS], or call: [TELEPHONE NUMBER]


Regards,


[SIGNATURE]


[NAME TYPED]

[TITLE]

[COMPANY NAME]

[COMPANY ADDRESS]

[COMPANY STAMP]


```

## Verify IRR entries

Verify that your Internet Routing Registry (IRR) entries match your corresponding origin autonomous system numbers (ASNs) to ensure Magic Transit routes traffic to the correct autonomous systems (AS). For guidance, refer to [Verify IRR entries](https://developers.cloudflare.com/byoip/concepts/irr-entries/best-practices/#verify-an-irr-entry).

If you are using a [Cloudflare IP](#ips), you do not need to verify your IRR entries.

### Optional: RPKI check for prefix validation

You can also use the Resource Public Key Infrastructure (RPKI) as an additional option to validate your prefixes. RPKI is a [security framework method ↗](https://blog.cloudflare.com/rpki/) that associates a route with an autonomous system. It uses cryptography to validate the information before being passed to the routers.

If you operate a network (ISP, cloud provider, enterprise, and others), using RPKI ensures that routers correctly recognize your IP prefixes. This prevents service disruptions and protects your brand's reputation. Without RPKI, attackers could announce your IP space, misdirect your traffic, and potentially harm your business.

To check your prefixes, you can use [Cloudflare's RPKI Portal ↗](https://rpki.cloudflare.com/?view=validator).

## Set maximum segment size

Before enabling Magic Transit, you must make sure that you set up the maximum segment size on your network. Cloudflare Magic Transit uses tunnels to deliver [packets ↗](https://www.cloudflare.com/learning/network-layer/what-is-a-packet/) from our global network to your data centers. Cloudflare encapsulates these packets adding new headers. You must account for the space consumed by these headers when configuring the maximum transmission unit (MTU) and maximum segment size (MSS) values for your network.

### MSS clamping recommendations

#### GRE tunnels as off-ramp

The MSS value depends on how your network is set up.

* **Magic Transit ingress-only traffic (DSR):**  
   * **On your edge router transit ports**: Set a TCP MSS clamp to a maximum of 1,436 bytes.  
   * **On any IPsec/GRE tunnels with third parties on your Magic Transit prefix**: Apply the MSS clamp on the internal tunnel interface (most likely on a separate firewall behind the GRE-terminating router) to reduce the current value by 24 bytes.
* **For Magic Transit ingress + egress traffic:**  
   * **On the Magic Transit GRE tunnel internal interface**: Meaning where the Magic Transit egress traffic will traverse. Your devices may do this automatically once the tunnel is configured, but it depends on your devices. Set the TCP MSS clamp to 1,436 bytes maximum.  
   * **On any IPsec/GRE tunnels with third parties on your Magic Transit prefix**: On the internal tunnel interface (most likely on a separate firewall behind the GRE-terminating router) to reduce its current value by 24 bytes.

#### IPsec tunnels

For IPsec tunnels, the value you need to specify depends on how your network is set up. The MSS clamping value is lower than for GRE tunnels because the physical interface sees IPsec-encrypted [packets ↗](https://www.cloudflare.com/learning/network-layer/what-is-a-packet/), not TCP packets, and MSS clamping does not apply to those.

* **Magic Transit ingress-only traffic (DSR):**  
   * **On your edge router transit ports**: Set the TCP MSS clamp to 1,436 bytes maximum.  
   * **On any IPsec/GRE tunnels with third parties on your Magic Transit prefix**: On the internal tunnel interface (most likely on a separate firewall behind the GRE-terminating router) to reduce its current value by 140 bytes.
* **Magic Transit ingress + egress traffic:**  
   * **On your edge router**: Apply this on your Magic Transit IPsec tunnel internal interface (that is, where the Magic Transit egress traffic will traverse). Your devices may do this automatically once the tunnel is configured, but it depends on your devices. Set the TCP MSS clamp to 1,360 bytes maximum.  
   * **On any IPsec/GRE tunnels with third parties on your Magic Transit prefix**: On the internal tunnel interface (most likely on a separate firewall behind the IPsec-terminating device in your premises) to reduce its current value by 140 bytes.

Important

Refer to your device documentation to check if it sets IPsec MSS clamping automatically. If not and you are using IPsec inside GRE, you must set MSS clamp manually.

Refer to [Maximum transmission unit and maximum segment size](https://developers.cloudflare.com/magic-transit/reference/mtu-mss/) for more details.

#### Clear Do not fragment (DF)

If you are unable to set the MSS on your physical interfaces to a value lower than 1500 bytes, you can clear the `do not fragment` bit in the IP header. When this option is enabled, Cloudflare fragments [packets ↗](https://www.cloudflare.com/learning/network-layer/what-is-a-packet/) greater than 1500 bytes, and the packets are reassembled on your infrastructure after decapsulation. In most environments, enabling this option does not have a significant impact on traffic throughput.

To enable this option for your network, contact your account team.

Refer to [Maximum transmission unit and maximum segment size](https://developers.cloudflare.com/magic-transit/reference/mtu-mss/) for more details.

## Follow router vendor guidelines

Instructions to adjust MSS by applying MSS clamps vary depending on the vendor of your router.

The following table lists several commonly used router vendors with links to MSS clamping instructions:

| Router device | URL                                                                                                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cisco         | [TCP IP Adjust MSS ↗](https://www.cisco.com/en/US/docs/ios-xml/ios/ipapp/command/ip%5Ftcp%5Fadjust-mss%5Fthrough%5Fip%5Fwccp%5Fweb-cache%5Faccelerated.html#GUID-68044D35-A53E-42C1-A7AB-9236333DA8C4) |
| Juniper       | [TCP MSS - Edit System ↗](https://www.juniper.net/documentation/en%5FUS/junos/topics/reference/configuration-statement/tcp-mss-edit-system.html)                                                       |

## BGP for Magic Transit prefix advertisement control (optional)

If you want to use [BGP for prefix advertisement control](https://developers.cloudflare.com/magic-transit/how-to/advertise-prefixes/#bgp-prefix-advertisement-control-methods), notify your account team of the IPs and ASN for your customer premises equipment (CPE) to use for the BGP peerings. You should allow around five working days for Cloudflare to add this to our Route Reflectors.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/data-center-protection/get-started/#page","headline":"Get started · Cloudflare Learning Paths","description":"Begin onboarding with Magic Transit.","url":"https://developers.cloudflare.com/learning-paths/data-center-protection/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/data-center-protection/get-started/","name":"Get started"}}]}
```
