# Configure your Trunk using Twilio Interconnect

[Twilio Interconnect](/docs/interconnect) allows you to connect your SIP infrastructure using a private connection (e.g. MPLS, cross-connect) to a Twilio Elastic SIP Trunk.

## Configure your Trunk using Twilio Interconnect

### Termination settings for Twilio Interconnect \[#TerminationURI-tnx]

To connect over Twilio Interconnect, point your communications infrastructure to the following localized Termination SIP URIs:

| Termination SIP URI                      | Interconnect Exchange               |
| :--------------------------------------- | :---------------------------------- |
| `{example}.pstn.ashburn-ix.twilio.com`   | Ashburn, Virginia, United States    |
| `{example}.pstn.san-jose-ix.twilio.com`  | San Jose, California, United States |
| `{example}.pstn.london-ix.twilio.com`    | London, United Kingdom              |
| `{example}.pstn.frankfurt-ix.twilio.com` | Frankfurt, Germany                  |
| `{example}.pstn.singapore-ix.twilio.com` | Singapore                           |
| `{example}.pstn.tokyo-ix.twilio.com`     | Tokyo, Japan                        |
| `{example}.pstn.sydney-ix.twilio.com`    | Sydney, Australia                   |
| `{example}.pstn.sao-paulo-ix.twilio.com` | São Paulo, Brazil                   |

> \[!NOTE]
>
> If you are looking for a list of [legacy Interconnect localized URIs](/docs/global-infrastructure/localized-uris/interconnect-termination-uris#legacy-termination-uris), visit here. eg: `{example}.pstn.ie1-ix.twilio.com`

### Origination settings for Twilio Interconnect \[#OriginationURI-tnx]

Configure your origination SIP URI, which identifies the network element entry point into your communications infrastructure (e.g. IP-PBX, SBC). To ensure your calls go over your private connection include the `edge` parameter in the URI with the value of the Twilio [Interconnect Edge Location](/docs/global-infrastructure/edge-locations#private-interconnect) where your private connection is configured, for example:

* `sip:172.56.42.132;edge={EDGE_LOCATION}`
* `sip:mysbc.com;edge={EDGE_LOCATION}`

Note: without the \{}, for example:

* `sip:172.56.42.132;edge=ashburn-ix`
* `sip:mysbc.com;edge=ashburn-ix`

You may also use the deprecated `tnx` parameter in the URI with the SID value of the desired Twilio Interconnect connection, however, it is preferred that you use the `edge` parameter as documented above. An example of using the `tnx` parameter:

* `sip:172.56.42.132;tnx={TNX_SID}`
* `sip:mysbc.com;tnx={TNX_SID}`

You can use [multiple origination URIs](/docs/sip-trunking#multiple-orig-uris) for failover where you can have a primary URI send traffic over Twilio Interconnect, and a secondary URI send traffic over the public internet in the case of failure.

**Interconnect Connections - Global Media IP Range**

The Interconnect Connections Destination IP Ranges and Port Ranges are now identical across all locations:

| **Secure Media (ICE/STUN/SRTP) Edge Locations**                                                                                                                                                                                                                 | **Protocol** | **Source IP** | **Source Port †** | **Destination IP Ranges** | **Destination Port Range** |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------- | ----------------- | ------------------------- | -------------------------- |
| sydney-ix (**au1-ix**)<br />sao-paulo-ix (**br1-ix**)<br />london-ix (**ie1-ix**)<br />frankfurt-ix (**de1-ix**)<br />tokyo-ix (**jp1-ix**)<br />singapore-ix (**sg1-ix**)<br />ashburn-ix (**us1-ix**)<br />san-jose-ix (**us2-ix**)<br />roaming (**gll-ix**) | UDP          | ANY           | ANY               | 168.86.128.0/18           | 10,000 - 60,000            |

† The SDK will select any available port from the ephemeral range. On most machines, this means the port range 1,024 to 65,535.

### Signalling IP Addresses using Twilio Interconnect \[#IP-addresses-tnx]

We strongly encourage you to allow all of Twilio's following IP address ranges and ports on your firewall for SIP signalling traffic. This is important if you have Numbers in different regions and for resilience purposes (e.g. if North America Virginia gateways are down, then North America Oregon gateways will be used).

#### North America Virginia Interconnect Gateways

```bash
    208.78.112.64
    208.78.112.65
    208.78.112.66
    Ports: 5060 (UDP/TCP), 5061 (TLS)

```

#### North America San Jose Interconnect Gateways

```bash
    67.213.136.64
    67.213.136.65
    67.213.136.66
    Ports: 5060 (UDP/TCP), 5061 (TLS)

```

#### Europe London Interconnect Gateways

```bash
    185.187.132.68
    185.187.132.69
    185.187.132.70
    Ports: 5060 (UDP/TCP), 5061 (TLS)

```

#### Europe Frankfurt Interconnect Gateways

```bash
    185.194.136.64
    185.194.136.65
    185.194.136.66
    Ports: 5060 (UDP/TCP), 5061 (TLS)

```

#### Asia Pacific Singapore Interconnect Gateways

```bash
    103.75.151.68
    103.75.151.69
    103.75.151.70
    Ports: 5060 (UDP/TCP), 5061 (TLS)

```

#### Asia Pacific Tokyo Interconnect Gateways

```bash
    103.144.142.68
    103.144.142.69
    103.144.142.70
    Ports: 5060 (UDP/TCP), 5061 (TLS)

```

#### Asia Pacific Sydney Interconnect Gateways

```bash
    103.146.214.68
    103.146.214.69
    103.146.214.70
    Ports: 5060 (UDP/TCP), 5061 (TLS)

```

#### South America São Paulo Interconnect Gateways

```bash
    159.183.255.68
    159.183.255.69
    159.183.255.70
    Ports: 5060 (UDP/TCP), 5061 (TLS)
```
