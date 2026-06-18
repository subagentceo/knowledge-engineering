---
title: Common API calls
description: Example API requests for managing Programmable Flow Protection programs and rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Common API calls

The following sections contain example requests for common API calls. For a list of available API endpoints, refer to [Endpoints](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/programmable-flow-protection/#endpoints).

## List all programs

This example fetches all Programmable Flow Protection programs in the account.

Request

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/programmable_flow_protection/configs/programs" \

--header "Authorization: Bearer <API_TOKEN>"


```

Response

```

{

  "result": [

    {

      "id": "<PROGRAM_ID>",

      "name": "rate-limiter",

      "status": "success",

      "created_on": "<TIMESTAMP>",

      "modified_on": "<TIMESTAMP>"

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

## Upload a program

This example uploads a new eBPF program written in C. The program source code is sent as the request body with `Content-Type: text/plain`.

Request

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/programmable_flow_protection/configs/programs" \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: text/plain" \

--data-binary "@/path/to/program.c"


```

Response

```

{

  "result": {

    "id": "<PROGRAM_ID>",

    "name": "program",

    "status": "success",

    "created_on": "<TIMESTAMP>",

    "modified_on": "<TIMESTAMP>"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

If the program fails compilation or verification, the API returns a detailed error message:

Example error response

```

{

  "result": null,

  "success": false,

  "errors": [

    {

      "code": 1001,

      "message": "Program verification failed: invalid memory access at line 42"

    }

  ],

  "messages": []

}


```

## Update a program

This example updates an existing program with new source code. You can update a program even if it is currently in use by one or more rules. If the new program fails compilation or verification, the update fails and the existing program remains active.

Request

```

curl --request PATCH \

"https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/programmable_flow_protection/configs/programs/{program_id}" \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: text/plain" \

--data-binary "@/path/to/updated-program.c"


```

Response

```

{

  "result": {

    "id": "<PROGRAM_ID>",

    "name": "program",

    "status": "success",

    "created_on": "<TIMESTAMP>",

    "modified_on": "<TIMESTAMP>"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

## Delete a program

This example deletes a program. You cannot delete a program that is currently referenced by an active rule.

Request

```

curl --request DELETE \

"https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/programmable_flow_protection/configs/programs/{program_id}" \

--header "Authorization: Bearer <API_TOKEN>"


```

Response

```

{

  "result": null,

  "success": true,

  "errors": [],

  "messages": []

}


```

## List all rules

This example fetches all Programmable Flow Protection rules in the account.

Request

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/programmable_flow_protection/configs/rules" \

--header "Authorization: Bearer <API_TOKEN>"


```

Response

```

{

  "result": [

    {

      "id": "<RULE_ID>",

      "program_id": "<PROGRAM_ID>",

      "scope": "global",

      "name": "global",

      "mode": "enabled",

      "expression": "",

      "created_on": "<TIMESTAMP>",

      "modified_on": "<TIMESTAMP>"

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

## Create a rule

This example creates a Programmable Flow Protection rule with a global scope in monitoring mode.

Request

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/programmable_flow_protection/configs/rules" \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{

  "program_id": "<PROGRAM_ID>",

  "scope": "global",

  "name": "global",

  "mode": "monitoring"

}'


```

Response

```

{

  "result": {

    "id": "<RULE_ID>",

    "program_id": "<PROGRAM_ID>",

    "scope": "global",

    "name": "global",

    "mode": "monitoring",

    "expression": "",

    "created_on": "<TIMESTAMP>",

    "modified_on": "<TIMESTAMP>"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Refer to [JSON objects](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/programmable-flow-protection/json-objects/) for more information on the fields in the JSON body.

## Create a rule with regional scope

This example creates a rule scoped to the Western Europe region with an expression filter.

Request

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/programmable_flow_protection/configs/rules" \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{

  "program_id": "<PROGRAM_ID>",

  "scope": "region",

  "name": "WEUR",

  "mode": "enabled",

  "expression": "ip.dst in { 192.0.2.0/24 }"

}'


```

Response

```

{

  "result": {

    "id": "<RULE_ID>",

    "program_id": "<PROGRAM_ID>",

    "scope": "region",

    "name": "WEUR",

    "mode": "enabled",

    "expression": "ip.dst in { 192.0.2.0/24 }",

    "created_on": "<TIMESTAMP>",

    "modified_on": "<TIMESTAMP>"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Refer to [JSON objects](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/programmable-flow-protection/json-objects/) for more information on the fields in the JSON body.

## Update a rule

This example updates an existing rule. You can update the mode, scope, and expression, but not the program. To change the program, delete the rule and create a new one.

Request

```

curl --request PATCH \

"https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/programmable_flow_protection/configs/rules/{rule_id}" \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{

  "mode": "enabled"

}'


```

Response

```

{

  "result": {

    "id": "<RULE_ID>",

    "program_id": "<PROGRAM_ID>",

    "scope": "global",

    "name": "global",

    "mode": "enabled",

    "expression": "",

    "created_on": "<TIMESTAMP>",

    "modified_on": "<TIMESTAMP>"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Refer to [JSON objects](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/programmable-flow-protection/json-objects/) for more information on the fields in the JSON body.

## Delete a rule

This example deletes an existing rule.

Request

```

curl --request DELETE \

"https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/programmable_flow_protection/configs/rules/{rule_id}" \

--header "Authorization: Bearer <API_TOKEN>"


```

Response

```

{

  "result": null,

  "success": true,

  "errors": [],

  "messages": []

}


```

## Debug a program with PCAP

This example runs a program against a PCAP file for debugging. The API returns an annotated PCAP file with the program verdict for each packet.

The request body must contain the PCAP file in binary format. The API automatically detects the IP header offset based on the input PCAP. To override automatic detection, use the optional `ip_offset` query parameter to specify the number of bytes the IP header is offset by in each packet (for example, `14` for Ethernet frames).

Request

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/programmable_flow_protection/configs/programs/{program_id}/pcap" \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/vnd.tcpdump.pcap" \

--data-binary "@/path/to/input.pcap" \

--output output.pcap


```

The output PCAP file contains the same packets as the input file, but with annotations on each packet. The Packet Comment annotation may contain:

* Program return value: `CF_EBPF_PASS` or `CF_EBPF_DROP`
* `Ignored`: if the incoming packet is not UDP
* `Analytics tag`: the custom network analytics tag set by the program on this packet, if any
* `Challenge packet`: the challenge packet emitted from the program back to the client, if any

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/programmable-flow-protection/examples/#page","headline":"Common API calls · Cloudflare DDoS Protection docs","description":"Example API requests for managing Programmable Flow Protection programs and rules.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/programmable-flow-protection/examples/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/advanced-ddos-systems/","name":"Advanced DDoS systems"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/","name":"API configuration"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/programmable-flow-protection/","name":"Programmable Flow Protection"}},{"@type":"ListItem","position":6,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/programmable-flow-protection/examples/","name":"Common API calls"}}]}
```
