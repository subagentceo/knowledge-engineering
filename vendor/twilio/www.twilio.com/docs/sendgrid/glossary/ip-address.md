# IP Address

*Internet standard*. A unique numerical address that identifies a virtual location on the internet.

An Internet Protocol (IP) Address comes in one of two versions: version 4 ([IPv4][ipv4]) and version 6 ([IPv6][ipv6]).

## IPv4 addresses

The common understanding of an IP address, this presents as four groups of up to three decimal digits, each separated with a dot. This creates a 32-bit number.

```text {title="Example of an IPv4 address"}
192.0.2.130
```

### Ranges of IPv4 addresses: CIDR notation

You can express IPv4 address ranges in [Classless Inter-Domain Routing (CIDR) notation][CIDR]. IPv4 CIDR notation presents as an IP address followed with a forward slash and one decimal integer. This integer, the *block*, counts the number of consecutive leading `1` bits in the network mask. This limits the range to a certain number of IP addresses.

```text {title="Example of an IPv4 address CIDR block"}
192.0.2.130/32 = 192.0.2.130
```

Interpret this as the IP address `192.0.2.130` with a network mask of 32 consecutive number `1`, or `255.255.255.255`. This masks out all other IP addresses but itself, a single internet host.

```text {title="Example of an IPv4 address CIDR block"}
192.0.2.130/31 = 192.0.2.130, 192.0.2.131
```

Interpret this as the IP address `192.0.2.130` with a network mask of 31 consecutive number `1`, or `255.255.255.254`. This masks out all other IP addresses but itself and one other IP address.

## IPv6 addresses

Introduced to fix the limited address space of IPv4, IPv6 addresses contain up to eight groups of four hexadecimal digits separated with colons.

```text {title="Example of an IPv6 address"}
2001:db8:3333:4444:5555:6666:7777:8888 
```

### Ranges of IPv6 addresses: CIDR notation

You can express IPv6 address ranges in CIDR notation as well. IPv6 CIDR notation presents as an IP address followed with a forward slash and one decimal integer equal to the prefix size in bits.

```text {title="Example of an IPv4 address CIDR block"}
2001:db8:1234::/48 = 2001:db8:1234:0000:0000:0000:0000:0000 to 2001:db8:1234:ffff:ffff:ffff:ffff:ffff
```

## IP address use in email

Sent emails include IP addresses in the headers. These IP addresses act as a return address for a given email message. Recipient inbox providers use your IP address as one of your reputation indicators.

Twilio SendGrid allows you to use a shared IP address or a dedicated IP address. If you send high volumes of email or want greater control over your reputation, use a dedicated IP address. To determines reputation of senders on shared IP addresses, inbox providers use the performance of all the senders sharing that IP address.

## Additional resources

* [SendGrid Email Infrastructure Guide](https://www.twilio.com/en-us/resource-center/the-email-infrastructure-guide-build-it-or-buy-it)
* [Configure Reverse DNS](/docs/sendgrid/ui/account-and-settings/how-to-set-up-reverse-dns/)

[ipv4]: https://en.wikipedia.org/wiki/IPv4

[ipv6]: https://en.wikipedia.org/wiki/IPv6_address

[CIDR]: https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing
