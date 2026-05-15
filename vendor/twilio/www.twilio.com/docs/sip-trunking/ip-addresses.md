# IP Addresses for Elastic SIP Trunking Services

## Global media IP gateways

Global media gateway IP address ranges:

**Public Connections - Global Media IP Range**

The Public Connections Destination IP Ranges and Port Ranges are now identical across all locations:

| **Secure Media (ICE/STUN/SRTP) Edge Locations**                                                                                                                                                                       | **Protocol** | **Source IP** | **Source Port †** | **Destination IP Ranges** | **Destination Port Range** |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------- | ----------------- | ------------------------- | -------------------------- |
| sydney (**au1** )<br />sao-paulo (**br1** )<br />dublin (**ie1** )<br />frankfurt (**de1** )<br />tokyo (**jp1** )<br />singapore (**sg1** )<br />ashburn (**us1** )<br />umatilla (**us2** )<br />roaming (**gll** ) | UDP          | ANY           | ANY               | 168.86.128.0/18           | 10,000 - 60,000            |

† The SDK will select any available port from the ephemeral range. On most machines, this means the port range 1,024 to 65,535.

## Regional signaling IP gateways

Allow *all* of the following Twilio IP address ranges and ports through your firewall for SIP signaling traffic. This is important if you have Numbers in different edge locations and for resiliency purposes. For example, if North America Virginia gateways are down, then North America Oregon gateways will be used. Twilio does not guarantee which edge location the media egresses from unless you specify the `edge` parameter. This depends on which PSTN-SIP Gateway delivers the call to which Twilio edge location.

These IP addresses are provided solely for firewall configuration. Not all of these IP addresses will host active gateways at a given time. However, your SIP infrastructure should be prepared to accept signaling traffic from any of these IP addresses at all times. Avoid sending traffic directly to these IP addresses. Instead, use your configured termination fully qualified domain name (FQDN). For more information, see [SIP Trunking configuration documentation](/docs/sip-trunking#redundancy-termination-uris).

The following sections list the IP addresses for each regional gateway:

### North America Virginia gateways

Use the following IP addresses for North America Virginia gateways:

```bash
    54.172.60.0/30 (individual IP addresses below):
    54.172.60.0
    54.172.60.1
    54.172.60.2
    54.172.60.3
    Ports: 5060 (UDP/TCP), 5061 (TLS)
```

### North America Oregon gateways

Use the following IP addresses for North America Oregon gateways:

```bash
    54.244.51.0/30 which translates to:
    54.244.51.0
    54.244.51.1
    54.244.51.2
    54.244.51.3
    Ports: 5060 (UDP/TCP), 5061 (TLS)

```

### Europe Ireland gateways

Use the following IP addresses for Europe Ireland gateways:

```bash
    54.171.127.192/30 which translates to:
    54.171.127.192
    54.171.127.193
    54.171.127.194
    54.171.127.195
    Ports: 5060 (UDP/TCP), 5061 (TLS)

```

### Europe Frankfurt gateways

Use the following IP addresses for Europe Frankfurt gateways:

```bash
    35.156.191.128/30 which translates to:
    35.156.191.128
    35.156.191.129
    35.156.191.130
    35.156.191.131
    Ports: 5060 (UDP/TCP), 5061 (TLS)

```

### Asia-Pacific Tokyo gateways

Use the following IP addresses for Asia-Pacific Tokyo gateways:

```bash
    54.65.63.192/30 which translates to:
    54.65.63.192
    54.65.63.193
    54.65.63.194
    54.65.63.195
    Ports: 5060 (UDP/TCP), 5061 (TLS)

```

### Asia-Pacific Singapore gateways

Use the following IP addresses for Asia-Pacific Singapore gateways:

```bash
    54.169.127.128/30 which translates to:
    54.169.127.128
    54.169.127.129
    54.169.127.130
    54.169.127.131
    Ports: 5060 (UDP/TCP), 5061 (TLS)

```

### Asia-Pacific Sydney gateways

Use the following IP addresses for Asia-Pacific Sydney gateways:

```bash
    54.252.254.64/30 which translates to:
    54.252.254.64
    54.252.254.65
    54.252.254.66
    54.252.254.67
    Ports: 5060 (UDP/TCP), 5061 (TLS)

```

### South America São Paulo gateways

Use the following IP addresses for South America São Paulo gateways:

```bash
    177.71.206.192/30 which translates to:
    177.71.206.192
    177.71.206.193
    177.71.206.194
    177.71.206.195
    Ports: 5060 (UDP/TCP), 5061 (TLS)

```
