# Edge API Request Parameters

# Overview

This document outlines how to make POST requests to the Arkose Labs **Edge API**, including endpoint structure, required headers, and request body format.

## API Access Methods

Edge API can be accessed via a direct HTTP request.

**Request URL format:**

```
https://client-api.arkoselabs.com/api/edge/v1/<public_key>
```

**Example using curl:**

```
curl https://client-api.arkoselabs.com/api/edge/v1/<public_key> \
    -H "Content-Type: application/json" \
    -d '{"private_key": "<private_key>", "ip_address": "1.2.3.4","workflow": "login"}'
```

## Request Body Parameters

**Note**: In addition to the required `private_key` and `ip_address`, **at least one additional field** (such as OS, platform, JA3/JA4 fingerprints, TLS details, or full headers) **must be included** in the API request.
These signals allow our systems to perform better analysis and provide effective recommendations. Requests missing these additional fields will be rejected with an error.

<Table align={["left","left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Fields
      </th>

      <th>
        Sub-Fields
      </th>

      <th>
        Type
      </th>

      <th>
        Required
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `private_key`
      </td>

      <td />

      <td>
        string
      </td>

      <td>
        **Yes**
      </td>

      <td>
        The private key issued by Arkose Labs along with the public key used for the client-side API.
      </td>
    </tr>

    <tr>
      <td>
        `ip_address`
      </td>

      <td />

      <td>
        string
      </td>

      <td>
        **Yes**
      </td>

      <td>
        IP address of the client making the request.
      </td>
    </tr>

    <tr>
      <td>
        `workflow`
      </td>

      <td />

      <td>
        string
      </td>

      <td>
        No
      </td>

      <td>
        Indicates in which user flow the Edge API is integrated (e.g., login, payment).
        This field **only** accepts alphabetic characters; spaces, numbers and special characters are NOT allowed
      </td>
    </tr>

    <tr>
      <td>
        `os`
      </td>

      <td />

      <td>
        string
      </td>

      <td>
        No
      </td>

      <td>
        Operating system name (e.g., "OS X", "Windows").
      </td>
    </tr>

    <tr>
      <td>
        `os_version`
      </td>

      <td />

      <td>
        string
      </td>

      <td>
        No
      </td>

      <td>
        Version of the OS (e.g., "10.15").
      </td>
    </tr>

    <tr>
      <td>
        `platform`
      </td>

      <td />

      <td>
        string
      </td>

      <td>
        No
      </td>

      <td>
        Platform (e.g., "MacIntel", "Win32").
      </td>
    </tr>

    <tr>
      <td>
        `ja3`
      </td>

      <td />

      <td>
        string
      </td>

      <td>
        No
      </td>

      <td>
        JA3 fingerprint of the TLS Client Hello.
      </td>
    </tr>

    <tr>
      <td>
        `ja4`
      </td>

      <td />

      <td>
        string
      </td>

      <td>
        No
      </td>

      <td>
        JA4 fingerprint (includes more TLS details).
      </td>
    </tr>

    <tr>
      <td>
        `email_address`
      </td>

      <td />

      <td>
        string
      </td>

      <td>
        No
      </td>

      <td>
        Email address from the request, if applicable.
      </td>
    </tr>

    <tr>
      <td>
        `headers`
      </td>

      <td />

      <td>
        object
      </td>

      <td>
        No
      </td>

      <td>
        HTTP headers from the client request (key-value pairs).
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `headers.additionalProperties`
      </td>

      <td>
        string
      </td>

      <td>
        No
      </td>

      <td>
        Additional properties for headers.
      </td>
    </tr>

    <tr>
      <td>
        `request`
      </td>

      <td />

      <td>
        object
      </td>

      <td>
        No
      </td>

      <td>
        Request details.
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `request.method`
      </td>

      <td>
        string
      </td>

      <td>
        No
      </td>

      <td>
        HTTP method used by the client (e.g., GET, POST).
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `request.url`
      </td>

      <td>
        string
      </td>

      <td>
        No
      </td>

      <td>
        Originating/Use case URL.
      </td>
    </tr>

    <tr>
      <td>
        `tls`
      </td>

      <td />

      <td>
        object
      </td>

      <td>
        No
      </td>

      <td>
        TLS details.
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `tls.cipher`
      </td>

      <td>
        string
      </td>

      <td>
        No
      </td>

      <td>
        TLS cipher suite used (e.g., "TLS\_ECDHE\_RSA\_WITH\_AES\_256\_GCM\_SHA384").
      </td>
    </tr>

    <tr>
      <td />

      <td>
        `tls.protocol`
      </td>

      <td>
        string
      </td>

      <td>
        No
      </td>

      <td>
        TLS protocol version (e.g., "TLSv1.3").
      </td>
    </tr>
  </tbody>
</Table>

## Request Schema with Example

The POST request should include a JSON body structure as shown below:

```json Request Schema
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "The edge-api request body schema",
  "type": "object",
  "properties": {
    "private_key": {
      "type": "string"
    },
    "ip_address": {
      "type": "string"
    },
    "workflow": {
      "type": "string"
    },
    "os": {
      "type": "string"
    },
    "os_version": {
      "type": "string"
    },
    "platform": {
      "type": "string"
    },
    "ja3": {
      "type": "string"
    },
    "ja4": {
      "type": "string"
    },
    "email_address": {
      "type": "string"
    },
    "headers": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    },
    "request": {
      "type": "object",
      "properties": {
        "method": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      }
    },
    "tls": {
      "type": "object",
      "properties": {
        "cipher": {
          "type": "string"
        },
        "protocol": {
          "type": "string"
        }
      }
    }
  },
  "required": [
    "private_key",
    "ip_address",
		"workflow"
  ]
}
```

```json Request Example
{
  "private_key": "B4DFA9BC-XXXX-XXXX-XXXX-D24DD4C8C27D",
  "ip_address": "11.22.33.44",
  "os": "OS X",
  "os_version": "10.15",
  "platform": "MacIntel",
  "ja3": "e7d705a3286e19ea42f587b344ee6865",
  "ja4": "t13d1516h2_8daaf6152771a5b3",
  "email_address": "something@myemail.com",
  "workflow": "login",
  "headers": {
    "Accept": "*/*",
    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie": "sessionid=abc123; user_preference=something; visitcount=42; auth_token=xyzsometoken",
    "Origin": "https://test-cases.arkoselabs.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "Referer": "https://test-cases.arkoselabs.com/",
    "Sec-Ch-Ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
    "SEC-CH-UA-MOBILE": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
  },
  "request": {
    "method": "POST",
    "url": "https://sample-website.com/sample-path"
  },
  "tls": {
    "cipher": "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
    "protocol": "TLSv1.3"
  }
}


```