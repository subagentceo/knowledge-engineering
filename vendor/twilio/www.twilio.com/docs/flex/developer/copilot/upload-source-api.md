# Agent Copilot: Upload your knowledge sources using the API (public beta)

> \[!IMPORTANT]
>
> Agent Copilot is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Agent Copilot is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex workflows that are subject to HIPAA or PCI. However, we offer mitigation tools such as PII redaction. To learn more, see [AI data use](/docs/flex/admin-guide/setup/copilot#ai-data-use).

## Overview

This guide describes how to upload your knowledge sources to Agent Copilot using the Knowledge API.

## Step 1: Upload your knowledge sources

### Upload a file

Upload a file for Agent Copilot to reference.

```bash
curl --location 'https://knowledge.twilio.com/v1/Knowledge/Upload' \
--header 'Authorization: {Token}' \
--form 'name="purchase-details"' \
--form 'type="File"' \
--form 'file_0=@"/Users/Documents/Purchase Details.pdf"'
```

#### Response

```json
{
   "id": "aia_know_aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
   "name": "purchase-details",
   "ParentAccountSid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
   "type": "File",
   "knowledge_source_details": {
       "file_name": "Purchase Details.pdf"
   },
   "status": "QUEUED",
   "return_direct": false,
   "date_created": "2025-06-10T23:50:50.934129Z",
   "date_updated": "2025-06-10T23:50:50.934129Z",
   "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
   "url": "https://knowledge.twilio.com/v1/Knowledge/aia_know_aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
   "metadata": {}
}
```

### Upload text

Provide plain text for Agent Copilot.

```bash
curl --location 'https://knowledge.twilio.com/v1/Knowledge' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic {TOken}' \
--data '{
    "description": "Text description",
    "name": "Text source",
    "type": "Text",
    "knowledge_source_details": {
        "content":"Text source with all the details"
    }
}'
```

#### Response

```json
{
   "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
   "date_created": "2025-06-10T23:54:43Z",
   "date_updated": "2025-06-10T23:54:43Z",
   "description": "Text description",
   "embedding_model": null,
   "id": "aia_know_bbbbbbbb-cccc-dddd-eeee-ffffffffffff",
   "knowledge_source_details": {
       "content": "Text source with all the details"
   },
   "name": "Text source",
   "status": "QUEUED",
   "type": "Text",
   "url": "https://knowledge.twilio.com/v1/Knowledge/aia_know_bbbbbbbb-cccc-dddd-eeee-ffffffffffff"
}
```

### Crawl a website

Give Agent Copilot a publicly accessible URL to index information from.

```bash
curl --location 'https://knowledge.twilio.com/v1/Knowledge' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic {Token}' \
--data '{
    "description": "Web description",
    "name": "Twilio web",
    "type": "Web",
    "knowledge_source_details": {
        "source":"https://en.wikipedia.org/wiki/Twilio",
        "crawl_depth": 0,
        "crawl_period_min": 10080
    }
}'
```

#### Response

```json
{
   "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
   "date_created": "2025-06-11T00:00:10Z",
   "date_updated": "2025-06-11T00:00:10Z",
   "description": "Web description",
   "embedding_model": null,
   "id": "aia_know_cccccccc-dddd-eeee-ffff-gggggggggggg",
   "knowledge_source_details": {
       "crawl_period_min": 10080,
       "source": "https://en.wikipedia.org/wiki/Twilio"
   },
   "name": "Twilio web",
   "status": "QUEUED",
   "type": "Web",
   "url": "https://knowledge.twilio.com/v1/Knowledge/aia_know_cccccccc-dddd-eeee-ffff-gggggggggggg"
}
```

## Step 2: Add a copilot tag

1. Create a `key` called `tw_product`.

```bash
curl --location 'https://knowledge.twilio.com/v1/Knowledge/Tags' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic {Token}' \
--data '{
	"key": "tw_product",
	"twilio_tag": true,
       "allows_multiple": true
}'
```

#### Response

```json
{
   "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
   "allows_multiple": true,
   "date_created": "2025-06-12T03:22:18Z",
   "date_updated": "2025-06-12T03:22:18Z",
   "id": "aia_tags_dddddddd-eeee-ffff-aaaa-bbbbbbbbbbbb",
   "key": "tw_product",
   "twilio_tag": true,
   "url": "https://knowledge.twilio.com/v1/Tags/aia_tags_dddddddd-eeee-ffff-aaaa-bbbbbbbbbbbb"
}
```

2. Use the **id** generated from the previous step to set your **tag**\_**id** and set the tag **value** to **copilot**.

```bash
curl --location 'https://knowledge.twilio.com/v1/Knowledge/aia_know_cccccccc-dddd-eeee-ffff-gggggggggggg/Tags' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic {Token}' \
--data '{
	"value": "copilot",
       "tag_id": "{{tag_id_from_above_step}}",
       "enabled": true
}'
```

#### Response

```json
{
   "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
   "date_created": "2025-06-11T00:11:54Z",
   "date_updated": "2025-06-11T00:11:54Z",
   "enabled": true,
   "id": "aia_tgvl_eeeeeeee-ffff-aaaa-bbbb-cccccccccccc",
   "resource_id": "aia_know_cccccccc-dddd-eeee-ffff-gggggggggggg",
   "resource_type": "knowledge",
   "tag_id": "aia_tags_dddddddd-eeee-ffff-aaaa-bbbbbbbbbbbb",
   "url": "https://knowledge.twilio.com/v1/Knowledge/aia_know_cccccccc-dddd-eeee-ffff-gggggggggggg/Tags",
   "value": "copilot"
}
```

## Step 3: Check upload status

When you create a knowledge source, Twilio processes it so Agent Copilot can start using it. Knowledge sources can take a few minutes to upload and reach `completed`.

To check on the status, use the following command. The upload status can be `queued`, `processing`, `completed`, or `failed`. Make sure to wait until the upload is `completed` before you test Agent Copilot.

```bash
curl --location 'https://knowledge.twilio.com/v1/knowledges/aia_know_ffffffff-aaaa-bbbb-cccc-dddddddddddd/status' \
--header 'Authorization: Basic {Token}'
```

#### Response

```json
{
   "account_sid": null,
   "date_updated": "2025-06-12T15:40:48Z",
   "last_status": null,
   "status": "COMPLETED"
}
```

## Step 4: Turn on queues for Agent Copilot

To test how Agent Copilot is using your knowledge sources, you must have queues enabled first. To enable queues:

1. In [Twilio Console](https://console.twilio.com/), go to **Flex** > **AI features** > **Agent Copilot**.
2. Under **Access control settings**, select **Only selected queues** or **All queues**.\
   You can select up to 25 queues for **Only selected queues**. If you need more queues, you must select **All queues**.
3. Click **Save access control settings**.

## Limits

You can select up to 25 queues for **Only selected queues**. If you need more queues, you must select **All queues**.
