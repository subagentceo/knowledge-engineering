# Interconnect

Twilio offers numerous cloud-based communication products and APIs that can be consumed by developers to build applications and tools to communicate with their end-users and enhance their user experience.

To accomplish this requires a network connection to Twilio. This can be routed over the open Internet or via a secure, private connection.

The open Internet, although convenient, by definition has only a "best effort" service delivery with no quality or service guarantee. It also lacks security—traffic can be intercepted and is subject to eavesdropping—which means that it's not the right option for customers and organizations with quality of service (QoS) and bandwidth requirements, or stringent security requirements.

Twilio Interconnect is an alternative to the open Internet that provides private connections between your network and Twilio. It offers the best performance and data throughput, and the lowest latency. Since your data never touches the public Internet, it also provides the best security, and can guarantee quality from end-to-end.

## Choose the product that is right for you

There are several reasons why Interconnect is the preferred method of connecting to Twilio. High availability, guaranteed data throughput, quality of service, and enterprise-grade security are just a few of the reasons to use Twilio Interconnect. If you need highly consistent connectivity between your communication infrastructure and Twilio, then Twilio Interconnect is the right choice. Likewise if you have policies (internal or external) that preclude you from sending traffic across the open Internet — for example, HIPAA, PCI, or GDPR.

Twilio Interconnect has several flavors to accommodate various use cases:

* [Cross Connect](/docs/interconnect/crossconnect) allows you to set up a dedicated, physical fiber interconnection with Twilio.
* [Third-Party Exchange](/docs/interconnect/third-party-exchange) is a way of having a private connection through a third-party provider that Twilio has an exchange agreement with.
* [VPN](/docs/interconnect/virtual-private-network) is the best option if you want to quickly try something out and play with some ideas, or if you have no presence in any of our or our partners' data centers and wish to have a secure connection to us.

## Compatible Twilio products

* Programmable Voice (including SIP Interface and Mobile and JavaScript Voice SDKs)
* Programmable SMS
* Elastic SIP Trunking
* Verify

## Interconnect region's IP details

### North America

#### US East Coast (Virginia)

* **Data Center:** Equinix DC1

  * **Address:** 21711 Filigree Ct, Ashburn, VA 20147
* **Twilio Edge Location ID:** ashburn-ix (`us1-ix`)

  * **BGP Prefix:** `208.78.112.0/25`, `168.86.128.0/18 le 24`
  * **VPN (Policy Based) Encryption Domain:** `208.78.112.0/25`, `168.86.160.0/21`

#### US West Coast (San Jose)

* **Data Center:** Equinix SV1

  * **Address:** 11 Great Oaks Boulevard, San Jose, CA 95119
* **Twilio Edge Location ID:** san-jose-ix (`us2-ix`)

  * **BGP Prefix:** `67.213.136.0/25`, `168.86.128.0/18 le 24`
  * **VPN (Policy Based) Encryption Domain:** `67.213.136.0/25`, `168.86.168.0/22`

### South America

#### Sao Paulo (Brazil)

* **Data Center:** Equinix SP4

  * **Address:** Avenida Ceci, 1900, Tambore. Barueri, São Paulo, Brazil, 06460 120
* **Twilio Edge Location ID:** sau-paulo-ix (`br1-ix`)

  * **BGP Prefix:** `159.183.255.0/24`, `159.183.255.64/26`, `168.86.175.0/24 le 24`
  * **VPN (Policy Based) Encryption Domain:** `159.183.255.0/24`, `168.86.175.0/24`

### Europe

#### Ireland (over Interconnect exchange in London)

* **Data Center:** Equinix LD8

  * **Address:** 6/7 Harbour Exchange Square, London E14 9GE, United Kingdom
* **Twilio Edge Location ID:** london-ix (`ie1-ix`)

  * **BGP Prefix:** `185.187.132.0/25`, `185.187.133.0/24`, `168.86.128.0/18 le 24`
  * **VPN (Policy Based) Encryption Domain:** `185.187.132.0/25`, `185.187.133.0/24`, `168.86.173.0/24`

#### Frankfurt

* **Data Center:** Equinix FR4

  * **Address:** Lärchenstrasse 110 Frankfurt 65933 Germany
* **Twilio Edge Location ID:** frankfurt-ix (`de1-ix`)

  * **BGP Prefix:** `185.194.136.0/25`, `168.86.128.0/18 le 24`
  * **VPN (Policy Based) Encryption Domain:** `185.194.136.0/25`, `168.86.174.0/24`

### APAC

#### Singapore

* **Data Center:** Equinix SG3

  * **Address:** 26A Ayer Rajah Crescent, 139963, Singapore
* **Twilio Edge Location ID:** singapore (`sg1-ix)`

  * **BGP Prefix:** `103.75.151.0/25`, `168.86.128.0/18 le 24`
  * **VPN (Policy Based) Encryption Domain:** `103.75.151.0/25`, `168.86.176.0/24`

#### Tokyo

* **Data Center:** Equinix TY6

  * **Address:** 2-2-43(A), Higashi-Shinagawa, Shinagawa-ku, Tokyo, Japan 140 0002
* **Twilio Edge Location ID:** tokyo-ix (`jp1-ix`)

  * **BGP Prefix:** `103.144.142.0/25`, `168.86.128.0/18 le 24`
  * **VPN (Policy Based) Encryption Domain:** `103.144.142.0/25`, `168.86.177.0/24`

#### Sydney

* **Data Center:** Equinix SY3

  * **Address:** 47 Bourke Road, Sydney, Australia, NSW 2015, Sydney, Australia
* **Twilio Edge Location ID:** `sydney-ix (au1-ix)`

  * **BGP Prefix:** `103.146.214.0/25`, `168.86.128.0/18 le 24`
  * **VPN (Policy Based) Encryption Domain:** `103.146.214.0/25`, `168.86.172.0/24`

## Twilio Exchange locations

Each Twilio region has dedicated equipment to offer secure interconnect services as listed in the table below. Once you choose your Exchange location and the desired bandwidth, Twilio will provision the required bandwidth for your connections at Twilio Interconnect locations selected by you. See connection bandwidth and location options listed below.

> \[!NOTE]
>
> For high availability, we strongly recommend connecting to **at least two** of our geographically redundant Twilio Exchange locations.
>
> For example, you can select a 100Mbps connection in Ashburn, Virginia and a 100Mbps connection in San Jose, California to create redundant connections to Twilio on both coasts of the United States. Similarly, for Europe and Asia Pacific, our exchanges in London, Frankfurt, Singapore, Tokyo, and Sydney can be used to accomplish redundancy in those regions.

| **Location**              | **10Mbps** | **100Mbps** | **500Mbps** | **1Gbps** |
| ------------------------- | ---------- | ----------- | ----------- | --------- |
| US — Ashburn, Virginia    | ✅          | ✅           | 🚫          | ✅         |
| US — San Jose, California | ✅          | ✅           | 🚫          | ✅         |
| BR — Sao Paulo            | ✅          | ✅           | ✅           | ✅         |
| UK — London               | ✅          | ✅           | ✅           | ✅         |
| Germany — Frankfurt       | ✅          | ✅           | ✅           | ✅         |
| Singapore                 | ✅          | ✅           | ✅           | ✅         |
| Japan — Tokyo             | ✅          | ✅           | ✅           | ✅         |
| Australia — Sydney        | ✅          | ✅           | ✅           | ✅         |

🚫 - Not Available

## IP Addresses

Your border devices (e.g., IP-PBX, SIP-PRI IAD, Session Border Controller (SBC), NAT gateway, etc.) will need to be assigned IPv4 addresses that are a part of one or more CIDR blocks (globally addressable) that your provider will announce to Twilio (your "IP Routes").

> \[!WARNING]
>
> Your IP routes must be globally unique ("public IPs") rather than [RFC 1918](https://tools.ietf.org/html/rfc1918) address ranges. In other words, your IP routes have to be **outside** **of the follow ranges** :
>
> `10.0.0.0 - 10.255.255.255`
>
> `172.16.0.0 - 172.31.255.255`
>
> `192.168.0.0 - 192.168.255.255`

All services accessed over Twilio Interconnect will initiate from Twilio's IP routes. You will see them announced via BGP. You must allow **all** of Twilio IP routes on your firewall.

> \[!WARNING]
>
> You will need to add Twilio's IP routes to the access control allow list on your firewall to allow your and Twilio's platform elements to talk to each other freely without being blocked by the firewall or other security rules.
