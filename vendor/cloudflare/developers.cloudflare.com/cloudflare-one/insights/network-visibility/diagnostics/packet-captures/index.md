---
title: Packet captures
description: Request, monitor, and download packet captures to diagnose network issues.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Packet captures

Packet captures record network traffic flowing through Cloudflare's network so you can analyze individual packets for troubleshooting or security investigations. The output is contained within one or more files in PCAP format, which you can open in tools like [Wireshark ↗](https://www.wireshark.org/).

There are two capture types:

* **Sample** captures query historical traffic data that has already passed through Cloudflare's network. They complete immediately and can be downloaded directly from the API, or from the Cloudflare dashboard.
* **Full** captures actively monitor for new traffic matching your filters and write the complete packet data to a cloud storage bucket you own. Before starting a full capture, you must first [configure a bucket](https://developers.cloudflare.com/cloudflare-one/insights/network-visibility/diagnostics/buckets/).

Note

Packet captures are available for Cloudflare Advanced Network Firewall users. For access, contact your account team.

## Send a packet capture request

Currently, when a packet capture is requested, packets flowing through Cloudflare's global network via the Magic Transit system are captured. The default API field for this is `"system": "magic-transit"`, both for the request and response.

Note

For help determining which data center to select for a packet capture, go to [https://cloudflare.com/cdn-cgi/trace ↗](https://cloudflare.com/cdn-cgi/trace) and refer to the `colo` field. Note some data centers can be regional such as `ORD` while other names may be more specific like `ord02`. Either of these names can be used for this same field.

### Packet capture limits

**Sample and full**

* `time_limit`: The minimum value is `1` second and maximum value is `300` seconds.
* `packet_limit`: The minimum value is `1` packet and maximum value is `10000` packets.

**Full**

* `byte_limit`: The minimum value is `1` byte and maximum value is `1000000000` bytes (1 GB).

* [ Dashboard ](#tab-panel-7202)
* [ API ](#tab-panel-7203)

1. In the Cloudflare dashboard, go to the **Network health** page.  
[ Go to **Network health** ](https://dash.cloudflare.com/?to=/:account/networking-insights/health)
2. Go to the **Diagnostics** tab.
3. In **Network packet captures**, select **Start a capture**.
4. Choose the type of capture you want to perform, and select **Next**.
5. Fill out the required fields to begin the capture and then select **Start**.

The **Network packet captures** page displays a list of captures.

The PCAPs API needs both `system` and `type` to be specified to start a capture. A PCAP's `system` is the product or logical subsystem where packets are captured, and a PCAP's `type` is how the captured packets are built into a PCAP file.

Currently, you can only send one collect request per minute for sample PCAPs, and you can only have one running or pending full PCAP at a time.

Full PCAP

For full PCAP requests, refer to the required parameters listed at [Create full PCAP requests](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/pcaps/methods/create/). Note that full packet captures require two more parameters than sample packets.

The full PCAP request endpoint also contains optional fields you can use to limit the amount of packets captured. Both full and sample packet requests contain an optional `filter_v1` parameter you can use to filter packets by IPv4 Source address, for example. For a full list of the filter options, refer to the [API reference](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/pcaps/methods/create/).

Leave `filter_v1` empty to collect all packets without any filtering.

Full PCAP example request

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/pcaps \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "filter_v1": {},

  "time_limit": 300,

  "packet_limit": 10000,

  "byte_limit": 100000000,

  "type": "full",

  "colo": "ORD",

  "system": "magic-transit",

  "destination_conf": "${BUCKET}"

}'


```

While the collection is in progress, the response returns the `status` field as `pending`. You must wait for the PCAP collection to complete before downloading the file. When the PCAP is ready to download, the status changes to `success`.

Full PCAP example response

```

{

  "result": {

    "id": "7d7c88382f0b4d5daa9587aa45a1a877",

    "submitted": "2022-06-02T18:38:22.269047Z",

    "filter_v1": {},

    "time_limit": 300,

    "status": "pending",

    "type": "full",

    "system": "magic-transit",

    "packet_limit": 10000,

    "byte_limit": 100000000,

    "colo": "ORD",

    "destination_conf": "gs://<bucket-name>" // Ensure you use a bucket that you created and registered in the Cloudflare dashboard

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Sample PCAP

To create a sample PCAP request, send a JSON body with the required parameter listed at [Create sample PCAP request](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/pcaps/methods/create/).

Note

The API uses `"type": "simple"` for sample captures. Use `simple` as the type value in your API requests.

Leave `filter_v1` empty to collect all packets without any filtering.

Sample PCAP example request

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/pcaps \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "filter_v1": {

    "source_address": "1.2.3.4",

    "source_port": 123,

    "destination_address": "5.6.7.8",

    "destination_port": 80,

    "protocol": 6

  },

  "time_limit": 300,

  "packet_limit": 10000,

  "type": "simple",

  "system": "magic-transit"

}'


```

The response is a JSON body that contains the details of the job running to build the packet capture. The response contains a unique identifier for the packet capture request along with the details sent in the request.

Sample PCAP example response

```

{

  "result": {

    "id": "6d1f0aac13cd40e3900d29f5dd0e8a2b",

    "submitted": "2021-12-20T17:29:20.641845Z",

    "filter_v1": {

      "source_address": "1.2.3.4",

      "source_port": 123,

      "destination_address": "5.6.7.8",

      "destination_port": 80,

      "protocol": 6

    },

    "time_limit": 60,

    "status": "pending",

    "packets_remaining": 0,

    "type": "simple",

    "system": "magic-transit"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

## Check packet capture status

* [ Dashboard ](#tab-panel-7198)
* [ API ](#tab-panel-7199)

1. In the Cloudflare dashboard, go to [Network health ↗](https://dash.cloudflare.com/?to=/:account/networking-insights/health).
2. Go to the **Diagnostics** tab.
3. Locate your capture under **Network packet captures**.

To check the status of a running job, send a request to the endpoint and specify the PCAP identifier. The PCAP identifier is received in the response of a collect request as shown in the previous step.

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/pcaps/{pcap_id} \

--header 'X-Auth-Email: <EMAIL>' \

--header 'X-Auth-Key: <API_KEY>'


```

The response will be similar to the one received when requesting a PCAP collection.

Sample PCAP example result

```

{

  "result": {

    "id": "6d1f0aac13cd40e3900d29f5dd0e8a2b",

    "submitted": "2021-12-20T17:29:20.641845Z",

    "filter_v1": {

      "source_address": "1.2.3.4",

      "source_port": 123,

      "destination_address": "5.6.7.8",

      "destination_port": 80,

      "protocol": 6

    },

    "time_limit": 120,

    "status": "success",

    "packets_remaining": 0,

    "type": "simple",

    "system": "magic-transit"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

The capture status displays one of the following options:

* **Complete** (API: `success`): The capture is done and ready for download.
* **In progress** (API: `pending`): Packets have been captured but the PCAP file is still being assembled.
* **Failure**: The capture failed. For full captures, verify that your bucket is correctly configured and that Cloudflare has write access to it. For sample captures, verify your filter configuration.

## Download packet captures

After your request finishes processing, you can download your packet captures.

* [ Dashboard ](#tab-panel-7200)
* [ API ](#tab-panel-7201)

1. In the [Cloudflare One ↗](https://one.dash.cloudflare.com) dashboard, go to **Network visibility** \> **Diagnostics**.
2. In **Packet captures**, select **Start a capture**.
3. Locate your packet capture you want to download, and select **Download**.

Packet captures are available to download when the **Status** displays **Success**.

Full captures can produce multiple PCAP files per capture because the capture can run across multiple machines at the data center. To merge these into a single file for analysis, refer to [Wireshark's mergecap documentation ↗](https://www.wireshark.org/docs/man-pages/mergecap.html).

**Full PCAPs**

To obtain full PCAPs, download the files from the bucket specified in `destination_conf` after the PCAP's status is `success`. You may find multiple files named `pcap_<pcap_id>.pcap` per capture as captures can occur across multiple machines.

**Sample PCAPs**

Once the sample PCAP collection is complete, you can download the PCAP by specifying the PCAP identifier used earlier.

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/pcaps/{pcap_id}/download \

--header 'X-Auth-Email: <EMAIL>' \

--header 'X-Auth-Key: <API_KEY>' \

--output download.pcap


```

## List packet captures

* [ Dashboard ](#tab-panel-7204)
* [ API ](#tab-panel-7205)

1. In the Cloudflare dashboard, go to the **Network health** page.  
[ Go to **Network health** ](https://dash.cloudflare.com/?to=/:account/networking-insights/health)
2. Go to the **Diagnostics** tab.

The list of packet captures associated with your account displays under **Network packet captures**.

To view a list of sent requests, use the following command:

List request example

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/pcaps \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

The response returns an array that includes up to 50 sent requests, which includes completed and ongoing requests.

List response example

```

{

  "result": [

    {

      "id": "43adab5adeca4dab9c51f4b7f70f2ec3",

      "submitted": "2021-12-15T03:04:09.277394Z",

      "filter_v1": {},

      "time_limit": 120,

      "status": "success",

      "packets_remaining": 0,

      "type": "simple",

      "system": "magic-transit"

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/network-visibility/diagnostics/packet-captures/#page","headline":"Packet captures · Cloudflare One docs","description":"Request, monitor, and download packet captures to diagnose network issues.","url":"https://developers.cloudflare.com/cloudflare-one/insights/network-visibility/diagnostics/packet-captures/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/network-visibility/","name":"Network visibility"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/network-visibility/diagnostics/","name":"Diagnostics"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/insights/network-visibility/diagnostics/packet-captures/","name":"Packet captures"}}]}
```
