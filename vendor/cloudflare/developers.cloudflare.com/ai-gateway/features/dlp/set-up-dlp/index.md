---
title: Set up Data Loss Prevention (DLP)
description: Enable and configure DLP policies on your AI Gateway to scan prompts and responses for sensitive data.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up Data Loss Prevention (DLP)

Add Data Loss Prevention (DLP) to any AI Gateway to start scanning AI prompts and responses for sensitive data.

## Prerequisites

* An existing [AI Gateway](https://developers.cloudflare.com/ai-gateway/get-started/)

## Enable DLP for AI Gateway

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **AI** \> **AI Gateway**.
3. Select a gateway where you want to enable DLP.
4. Go to the **Firewall** tab.
5. Toggle **Data Loss Prevention (DLP)** to **On**.

## Add DLP policies

After enabling DLP, you can create policies to define how sensitive data should be handled:

1. Under the DLP section, click **Add Policy**.
2. Configure the following fields for each policy:  
   * **Policy ID**: Enter a unique name for this policy (e.g., "Block-PII-Requests")  
   * **DLP Profiles**: Select the DLP profiles to check against. AI requests/responses will be checked against each of the selected profiles. Available profiles include:  
         * **Financial Information** \- Credit cards, bank accounts, routing numbers  
         * **Personal Identifiable Information (PII)** \- Names, addresses, phone numbers  
         * **Government Identifiers** \- SSNs, passport numbers, driver's licenses  
         * **Healthcare Information** \- Medical record numbers, patient data  
         * **Custom Profiles** \- Organization-specific data patterns  
   Note  
   DLP profiles can be created and managed in the [Zero Trust DLP dashboard](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/).  
   * **Action**: Choose the action to take when any of the selected profiles match:  
         * **Flag** \- Record the detection for audit purposes without blocking  
         * **Block** \- Prevent the request/response from proceeding  
   * **Check**: Select what to scan:  
         * **Request** \- Scan user prompts sent to AI providers  
         * **Response** \- Scan AI model responses before returning to users  
         * **Both** \- Scan both requests and responses
3. Click **Save** to save your policy configuration.

## Manage DLP policies

You can create multiple DLP policies with different configurations:

* **Add multiple policies**: Click **Add Policy** to create additional policies with different profile combinations or actions
* **Enable/disable policies**: Use the toggle next to each policy to individually enable or disable them without deleting the configuration
* **Edit policies**: Click on any existing policy to modify its settings
* **Save changes**: Always click **Save** after making any changes to apply them

## Test your configuration

After configuring DLP settings:

1. Make a test AI request through your gateway that contains sample sensitive data.
2. Check the **AI Gateway Logs** to verify DLP scanning is working.
3. Review the detection results and adjust profiles or actions as needed.

## Monitor DLP events

### Viewing DLP logs in AI Gateway

DLP events are integrated into your AI Gateway logs. When a DLP policy matches, the log entry includes details about the match alongside standard log fields like provider, model, tokens, and cost.

1. Go to **AI** \> **AI Gateway** \> your gateway > **Logs**.
2. Select any log entry to view detailed information. For requests where DLP policies were triggered, the log entry includes additional DLP fields:

| Field                | Description                                                           |
| -------------------- | --------------------------------------------------------------------- |
| DLP Action           | The action taken by the DLP policy: FLAG or BLOCK                     |
| DLP Policies Matched | The IDs of the DLP policies that matched                              |
| DLP Profiles Matched | The IDs of the DLP profiles that triggered within each matched policy |
| DLP Entries Matched  | The specific detection entry IDs that matched within each profile     |
| DLP Check            | Whether the match occurred in the REQUEST, RESPONSE, or both          |

### DLP fields in the Logs API

When you retrieve logs through the [Logs API](https://developers.cloudflare.com/api/resources/ai%5Fgateway/subresources/logs/methods/list/), log entries for requests where DLP policies matched include DLP-specific fields in the response. These fields contain the same match data surfaced in the dashboard and in the `cf-aig-dlp` response header, including the action taken, matched policy IDs, matched profile IDs, and entry IDs.

For more information on log fields, refer to the [Logging documentation](https://developers.cloudflare.com/ai-gateway/observability/logging/).

### Filter DLP events

To view only DLP-related requests:

1. On the **Logs** tab, select **Add Filter**.
2. Select **DLP Action** from the filter options.
3. Choose to filter by:  
   * **FLAG** \- Show only requests where sensitive data was flagged  
   * **BLOCK** \- Show only requests that were blocked due to DLP policies

## Error handling

When DLP policies are triggered, your application will receive additional information through response headers and error codes.

### DLP response header

When a request matches DLP policies (whether flagged or blocked), an additional `cf-aig-dlp` header is returned containing detailed information about the match:

#### Header schema

```

{

  "findings": [

    {

      "profile": {

        "context": {},

        "entry_ids": ["string"],

        "profile_id": "string"

      },

      "policy_ids": ["string"],

      "check": "REQUEST" | "RESPONSE"

    }

  ],

  "action": "BLOCK" | "FLAG"

}


```

#### Example header value

```

{

  "findings": [

    {

      "profile": {

        "context": {},

        "entry_ids": [

          "a1b2c3d4-e5f6-7890-abcd-ef1234567890",

          "f7e8d9c0-b1a2-3456-789a-bcdef0123456"

        ],

        "profile_id": "12345678-90ab-cdef-1234-567890abcdef"

      },

      "policy_ids": ["block_financial_data"],

      "check": "REQUEST"

    }

  ],

  "action": "BLOCK"

}


```

Use this header to programmatically detect which DLP profiles and entries were matched, which policies triggered, and whether the match occurred in the request or response.

### Error codes for blocked requests

When DLP blocks a request, your application will receive structured error responses:

* **Request blocked by DLP**  
   * `"code": 2029`  
   * `"message": "Request content blocked due to DLP policy violations"`
* **Response blocked by DLP**  
   * `"code": 2030`  
   * `"message": "Response content blocked due to DLP policy violations"`

Handle these errors in your application:

JavaScript

```

try {

  const res = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {

    prompt: userInput

  }, {

    gateway: {id: 'your-gateway-id'}

  })

  return Response.json(res)

} catch (e) {

  if ((e as Error).message.includes('2029')) {

    return new Response('Request contains sensitive data and cannot be processed.')

  }

  if ((e as Error).message.includes('2030')) {

    return new Response('AI response was blocked due to sensitive content.')

  }

  return new Response('AI request failed')

}


```

## Best practices

* **Start with flagging**: Begin with "Flag" actions to understand what data is being detected before implementing blocking
* **Tune confidence levels**: Adjust detection sensitivity based on your false positive tolerance
* **Use appropriate profiles**: Select DLP profiles that match your data protection requirements
* **Monitor regularly**: Review DLP events to ensure policies are working as expected
* **Test thoroughly**: Validate DLP behavior with sample sensitive data before production deployment

## Troubleshooting

For general AI Gateway troubleshooting, refer to [Troubleshooting](https://developers.cloudflare.com/ai-gateway/reference/troubleshooting/).

### DLP not triggering

* Verify DLP toggle is enabled for your gateway
* Ensure selected DLP profiles are appropriate for your test data
* Confirm confidence levels aren't set too high

### Unexpected blocking

* Review DLP logs to see which profiles triggered
* Consider lowering confidence levels for problematic profiles
* Test with different sample data to understand detection patterns
* Adjust profile selections if needed

For additional support with DLP configuration, refer to the [Cloudflare Data Loss Prevention documentation](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) or contact your Cloudflare support team.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/features/dlp/set-up-dlp/#page","headline":"Set up Data Loss Prevention (DLP) · Cloudflare AI Gateway docs","description":"Enable and configure DLP policies on your AI Gateway to scan prompts and responses for sensitive data.","url":"https://developers.cloudflare.com/ai-gateway/features/dlp/set-up-dlp/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/features/dlp/","name":"Data Loss Prevention (DLP)"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/features/dlp/set-up-dlp/","name":"Set up Data Loss Prevention (DLP)"}}]}
```
