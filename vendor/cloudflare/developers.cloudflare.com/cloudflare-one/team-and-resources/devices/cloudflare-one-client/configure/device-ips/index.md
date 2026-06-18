---
title: Device IPs
description: Device IPs in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Device IPs

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Traffic and DNS mode Traffic only mode                                                                                             | All plans                                                       |

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ✅            | 2025.10.186.0          |
| macOS    | ✅            | 2025.10.186.0          |
| Linux    | ✅            | 2025.10.186.0          |
| iOS      | ❌            |                        |
| Android  | ❌            |                        |
| ChromeOS | ❌            |                        |

A device IP identifies and routes traffic to a specific device in your Zero Trust organization. When a user registers the Cloudflare One Client (formerly WARP), Cloudflare assigns a virtual IPv4 and IPv6 address to the [device registration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/device-registration/). The Cloudflare One Client uses these IP addresses to create a [virtual network interface](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#ip-traffic) on the device, which allows your private network to reach the device via [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) or [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/) on-ramps.

You can verify device IPs and, if needed, reconfigure address pools to avoid overlapping IPs with existing internal resources.

## Default device IPs

By default, Cloudflare assigns device IPs from the following address space:

* Default IPv4: `100.96.0.0/12`
* Default IPv6: `2606:4700:0cf1:1000::/64`

If your organization already uses the default IPv4 range for internal networking, or if you require more granular IP assignments for firewall policy management, you can configure custom device IPv4 subnets. You can assign different IPv4 subnets to devices based on the user's identity.

The default IPv6 range is owned by Cloudflare and therefore should not conflict with services on your private network. The device IPv6 range is not configurable.

## Create an IP subnet

Note

If your account uses [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/), custom device IP subnets require [Unified Routing (beta)](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/traffic-steering/#unified-routing-mode-beta). If your account is on Legacy routing mode, contact your account team to discuss migration and availability.

Create a custom IP subnet when the [default IPv4 range](#default-device-ips) conflicts with services on your private network.

To define a custom IPv4 subnet for device IPs:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles**.
2. Under **Device IP subnets**, select **Add new IP subnet**.
3. Enter any name for the subnet.
4. In **CIDR**, enter a valid IPv4 CIDR block from the supported private ranges:  
   * `10.0.0.0/8`  
   * `172.16.0.0/12`  
   * `192.168.0.0/16`  
   * `100.64.0.0/10`  
The configured CIDR block must be at least size `/24`.  
Avoid IP conflicts  
Ensure that the chosen CIDR block does not overlap with existing internal routes, such as local office subnets or virtual private clouds (VPCs) in AWS or GCP.
5. Select **Add subnet** to save.

Next, [assign this subnet](#assign-device-ips) to a group of devices.

## Assign device IPs

Assign [custom IP subnets](#create-an-ip-subnet) to ensure devices are provisioned within a predictable address space based on specific user identity criteria.

### Prerequisites

* [**Assign a unique IP address to each device**](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#assign-a-unique-ip-address-to-each-device) is enabled in your [general device profiles](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/).

### Create an IP profile

To assign IP subnets to your devices:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles**.
2. Under **Device IP profiles**, select **Add new IP profile**.
3. Enter a name for this group of devices (for example, `IT department`).
4. Create rules to define the users or devices that will receive these IPs. Learn more about the available [Selectors](#selectors), [Operators](#comparison-operators), and [Values](#value).
5. Choose an existing IPv4 subnet from the dropdown menu, or [create a new subnet](#create-an-ipv4-subnet).
6. Select **Assign IP address**.
7. (Optional) In the **Device IP profiles** table, change the [order of precedence](#order-of-precedence) of IP profiles.

Devices that match your rules are assigned a random IP from this address space upon registration. Only newly registered devices will receive a new IP; existing devices will not see any impact to connectivity. To assign a new IP to an existing device, you must [delete its registration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/device-registration/#delete-a-device-registration) and then [re-enroll the device](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) in your Zero Trust organization.

Organizations are currently [limited](https://developers.cloudflare.com/cloudflare-one/account-limits/#warp) to 30 custom device IP profiles per account.

### Selectors

You can configure IP profiles to match against the following selectors or criteria. Identity-based selectors are only available if the user [enrolled the device](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) by logging in to an identity provider (IdP).

#### User email

Apply a device profile based on the user's email.

| UI name    | API example value                         |
| ---------- | ----------------------------------------- |
| User email | identity.email == "user-name@company.com" |

#### User group emails

Apply a device IP profile based on an [IdP group](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/#idp-groups-in-gateway) email address of which the user is configured as a member in the IdP.

| UI name           | API example                                        |
| ----------------- | -------------------------------------------------- |
| User group emails | identity.groups.email == "contractors@company.com" |

#### User group IDs

Apply a device IP profile based on an [IdP group](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/#idp-groups-in-gateway) ID of which the user is configured as a member in the IdP.

| UI name        | API example                                  |
| -------------- | -------------------------------------------- |
| User group IDs | identity.groups.id == "12jf495bhjd7893ml09o" |

#### User group names

Apply a device IP profile based on an [IdP group](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/#idp-groups-in-gateway) name of which the user is configured as a member in the IdP.

| UI name          | API example                             |
| ---------------- | --------------------------------------- |
| User group names | identity.groups.name == "\\"finance\\"" |

#### User name

| UI name   | API example                  |
| --------- | ---------------------------- |
| User Name | identity.name == "user-name" |

#### SAML attributes

Apply a device IP profile based on an attribute name and value from a [SAML IdP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/#generic-saml-idp).

| UI name         | API example                                        |
| --------------- | -------------------------------------------------- |
| SAML Attributes | identity.saml\_attributes == "\\"group=finance\\"" |

### Comparison operators

Comparison operators determine how device IP profiles match a selector.

| Operator | Meaning                                      |
| -------- | -------------------------------------------- |
| in       | matches at least one of the defined values   |
| not in   | does not match any of the defined values     |
| is       | equals the defined value                     |
| matches  | regular expression (regex) evaluates to true |

### Value

In the **Value** field, you can input a single value when using an equality comparison operator (such as _is_) or multiple values when using a containment comparison operator (such as _in_). Additionally, you can use [regular expressions](#regular-expressions) (or regex) to specify a range of values for supported selectors.

### Regular expressions

Regular expressions are evaluated using Rust. The Rust implementation is slightly different than regex libraries used elsewhere. For more information, refer to our guide for [Wildcards](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/#wildcards). To evaluate if your regex matches, you can use [Rustexp ↗](https://rustexp.lpil.uk/).

If you want to match multiple values, you can use the pipe symbol (`|`) as an OR operator. You do not need to use an escape character (`\`) before the pipe symbol. For example, the following expression evaluates to true when the user's email domain matches either `@acme.com` or `@widgets.com`:

| Selector   | Operator | Value                   |
| ---------- | -------- | ----------------------- |
| User email | matches  | @acme.com\|@widgets.com |

In addition to regular expressions, you can use [logical operators](#logical-operators) to match multiple values.

### Logical operators

To evaluate multiple conditions in an expression, select a logical operator:

| Operator | Meaning                                       |
| -------- | --------------------------------------------- |
| And      | match all of the conditions in the expression |
| Or       | match any of the conditions in the expression |

### Order of precedence

The Cloudflare One Client checks the IP profiles from top to bottom as they appear in the Cloudflare One dashboard (lowest precedence number is checked first). The client follows the first match principle — once a device matches an IP profile, the client stops evaluating and no subsequent IP profiles can override the decision. You can rearrange the IP profiles in the Cloudflare One dashboard according to your desired order of precedence.

## Verify device IPs

### Via the dashboard

To check the virtual IP addresses assigned to a specific device registration:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices**.
2. Select your device > **View details**.  
Device filters  
The Cloudflare One dashboard defaults to showing devices that were last seen within the past year. You can select **Show filters** to change the date range or filter by the last active user.
3. Scroll down to **Users**. You will see the registrations associated with this device along with their assigned IPv4 and IPv6 addresses.

### Via the CLI

To check the device IP used by the device client's virtual network interface:

* [ Windows ](#tab-panel-7422)
* [ macOS ](#tab-panel-7423)
* [ Linux ](#tab-panel-7424)

On Windows, run `ipconfig`. When the Cloudflare One Client is turned on, you will see an adapter called `CloudflareWARP` with your device IP.

PowerShell

```

ipconfig


```

```

Windows IP Configuration


Unknown adapter CloudflareWARP:


   Connection-specific DNS Suffix  . :

   Description . . . . . . . . . . . : Cloudflare WARP Interface Tunnel

   Physical Address. . . . . . . . . :

   DHCP Enabled. . . . . . . . . . . : No

   Autoconfiguration Enabled . . . . : Yes

   IPv6 Address. . . . . . . . . . . : 2606:4700:110:8f79:145:f180:fc4:8106(Preferred)

   Link-local IPv6 Address . . . . . : fe80::83b:d647:4bed:d388%49(Preferred)

   IPv4 Address. . . . . . . . . . . : 172.16.0.2(Preferred)

   Subnet Mask . . . . . . . . . . . : 255.255.255.255

   Default Gateway . . . . . . . . . :

   DNS Servers . . . . . . . . . . . : 127.0.2.2

                                       127.0.2.3

   NetBIOS over Tcpip. . . . . . . . : Enabled


```

On macOS, run `ifconfig`. When the Cloudflare One Client is turned on, you will see a `utun` interface with your device IP.

Terminal window

```

ifconfig


```

```

<redacted>

utun3: flags=8051<UP,POINTOPOINT,RUNNING,MULTICAST> mtu 1280

  inet 172.16.0.2 --> 172.16.0.2 netmask 0xffffffff

  inet6 fe80::f6d4:88ff:fe82:6d9e%utun3 prefixlen 64 scopeid 0x17

  inet6 2606:4700:110:8c7d:7369:7526:a59b:5636 prefixlen 128

  nd6 options=201<PERFORMNUD,DAD>


```

On Linux, run `ifconfig` or `ip addr`. When the Cloudflare One Client is turned on, you will see a `utun` interface with your device IP.

Terminal window

```

ip addr


```

```

<redacted>

3: CloudflareWARP: <POINTOPOINT,MULTICAST,NOARP,UP,LOWER_UP> mtu 1280 qdisc mq state UNKNOWN group default qlen 500

    link/none

    inet 172.16.0.2/32 scope global CloudflareWARP

       valid_lft forever preferred_lft forever

    inet6 2606:4700:110:8a2e:a5f7:a8de:a1f9:919/128 scope global

       valid_lft forever preferred_lft forever

    inet6 fe80::117e:276b:8a79:c498/64 scope link stable-privacy

       valid_lft forever preferred_lft forever


```

In the example above, the device IPv4 address is `172.16.0.2`.

## View subnet usage

Monitor the consumption of your IPv4 subnets to ensure you have enough addresses for new device registrations. Devices will be unable to register if they match a subnet with no available IPs.

Use the Cloudflare One dashboard to view a high-level overview of assigned and available IPs:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles**.
2. Locate the **Device IP subnets** table.
3. The **IPs assigned** column displays the total number of IPs currently assigned to active device registrations versus the total capacity of the CIDR block.

If your subnet is approaching capacity, you can [expand your subnet](#edit-an-ip-subnet) to increase the number of available IPs. Alternatively, you can free up IPs by [deleting existing device registrations](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/device-registration/#delete-a-device-registration), particularly revoked registrations that may be consuming IP space despite the device no longer being in use.

Delete device registrations instead of revoking

[Revoking a device registration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/device-registration/#revoke-a-device-registration) does not release the virtual IPs that are assigned to the registration. Because virtual IPs are a finite resource, Cloudflare strongly advises deleting a registration rather than revoking it.

To get a list of all device registrations in a subnet (including revoked registrations), use the [Cloudflare API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/devices/subresources/registrations/methods/list/). For example, the following script fetches all device registrations and their device IPs, and outputs all registrations within the specified CIDR block.

Example script to filter registrations by IP

1. Create a new file called `filter-device-ips.py` that contains the following code:  
Python  
```  
import requests  
import ipaddress  
import json  
# --- Configuration ---  
AUTH_EMAIL = "<CLOUDFLARE_ACCOUNT_EMAIL>"  
AUTH_KEY = "<CLOUDFLARE_API_KEY>"  # Refer to https://developers.cloudflare.com/fundamentals/api/get-started/keys/. API token authentication is not currently supported for fetching device IPs.  
ACCOUNT_ID = "<CLOUDLFARE_ACCOUNT_ID"  # Refer to https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/.  
TARGET_CIDR = "100.64.0.0/10"  
# --- API request headers ---  
headers = {  
    "X-Auth-Email": AUTH_EMAIL,  
    "X-Auth-Key": AUTH_KEY,  
    "Content-Type": "application/json"  
}  
def get_all_registrations():  
    """Fetches all device registrations including revoked registrations. """  
    devices = {}  
    url = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/devices/registrations"  
    params = {"per_page": 50, "status": "all"}  
    while True:  
        response = requests.get(url, headers=headers, params=params).json()  
        if not response.get('success'):  
            print(f"Error fetching registrations: {response.get('errors')}")  
            break  
        for d in response.get('result', []):  
            # We use the ID as the key to link with IP data later  
            devices[d['id']] = d  
        cursor = response.get('result_info', {}).get('cursor')  
        if not cursor:  
            break  
        params['cursor'] = cursor  
    return devices  
def filter_by_cidr(device_map, network):  
    """Fetch device IPs and return devices that fall within the target CIDR block."""  
    matches = []  
    device_ids = list(device_map.keys())  
    # API limits IP correlation to batches of 20  
    for i in range(0, len(device_ids), 20):  
        batch = device_ids[i:i+20]  
        # Construct parameters for the IP endpoint  
        params = {f"device_ids[{idx}]": d_id for idx, d_id in enumerate(batch)}  
        url = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/teamnet/devices/ips"  
        res = requests.get(url, headers=headers, params=params).json()  
        if not res.get('success'):  
            print(f"Error fetching IPs: {res.get('errors')}")  
            continue  
        for item in res.get('result', []):  
            d_id = item.get('device_id')  
            ip_data = item.get('device_ips', {})  
            ipv4_str = ip_data.get('ipv4')  
            if ipv4_str:  
                try:  
                    if ipaddress.IPv4Address(ipv4_str) in network:  
                        if d_id in device_map:  
                            full_data = device_map[d_id]  
                            full_data['device_ips'] = ip_data  
                            matches.append(full_data)  
                except ValueError:  
                    continue  
    return matches  
if __name__ == "__main__":  
    try:  
        net = ipaddress.IPv4Network(TARGET_CIDR, strict=False)  
        print(f"[*] Fetching registrations (status=all)...")  
        all_devices = get_all_registrations()  
        print(f"[*] Found {len(all_devices)} total registrations.")  
        print(f"[*] Checking IP ranges for match...")  
        filtered_list = filter_by_cidr(all_devices, net)  
        if filtered_list:  
            print(f"\n--- Found {len(filtered_list)} Device(s) in {TARGET_CIDR} ---\n")  
            for dev in filtered_list:  
                print(json.dumps(dev, indent=2))  
                print("-" * 50)  
        else:  
            print(f"\nNo devices found within the {TARGET_CIDR} range.")  
    except Exception as e:  
        print(f"Script Error: {e}")  
```
2. In the script configuration section, input your Cloudflare API credentials and your IP subnet range.
3. Open a terminal and navigate to the script directory. To run the script, type:  
Terminal window  
```  
python3 filter-device-ips.py  
```

## Edit an IP subnet

Cloudflare does not support editing an existing IPv4 subnet definition. To assign a different IPv4 subnet to your devices:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles**.
2. Under **Device IP profiles**, find the device group associated with the old subnet and select **Edit**.
3. Select **Create new subnet IP range** to define a new subnet.
4. Select **Save**.

The new subnet will appear in the **Device IP subnets** table. You can now delete the old subnet. Devices will only get an IP from the new subnet when they [re-register](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/device-registration/#delete-a-device-registration); existing registrations will retain their [current IP](#verify-device-ips).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-ips/#page","headline":"Device IPs · Cloudflare One docs","description":"Device IPs in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-ips/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Python","REST API"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/","name":"Configure the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-ips/","name":"Device IPs"}}]}
```
