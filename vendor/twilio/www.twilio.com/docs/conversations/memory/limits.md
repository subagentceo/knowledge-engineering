# Conversation Memory limits

This document outlines product and API resource limits for Conversation Memory.

## Conversation Memory limits and known issues

* Conversation Memory supports up to 5 memory stores per account.
* Each memory store can contain up to 100 million profiles.

## API resource limits

The following tables display resource limits and constraints for Conversation Memory APIs.

### Memory store

| Resource limit                | Value                         | Notes               |
| ----------------------------- | ----------------------------- | ------------------- |
| Unique name                   | Alphanumeric and hyphens only | Enforced by pattern |
| Friendly name                 | 128 characters                |                     |
| Description                   | 512 characters                |                     |
| Max memory stores per account | 5                             |                     |

### Identifiers and identity resolution settings

| Resource limit              | Value          | Notes                                           |
| --------------------------- | -------------- | ----------------------------------------------- |
| Max identifier types        | 15             |                                                 |
| Max idType length           | 30 characters  | Includes alphanumeric, hyphens, and underscores |
| Max identifiers per type    | 100            |                                                 |
| Max identifier value length | 255 characters |                                                 |
| Max matching rules          | 15             |                                                 |
| Max matching rule length    | 30 characters  |                                                 |

### Trait groups

| Resource limit                     | Value                    | Notes                                    |
| ---------------------------------- | ------------------------ | ---------------------------------------- |
| Max trait groups per memory store  | 50 groups                |                                          |
| Max traits per trait group         | 95 traits                |                                          |
| Max trait group name length        | 64 characters            |                                          |
| Max trait group description length | 1024 characters          |                                          |
| Trait name                         | 64 characters            |                                          |
| Trait string value                 | 1024 characters          |                                          |
| Trait integer value                | 2147483648 to 2147483647 |                                          |
| Trait boolean value                | true/false               |                                          |
| Trait array value                  | 100 items                | Includes strings, integers, and booleans |

### Observations

| Resource limit                   | Value                       | Notes |
| -------------------------------- | --------------------------- | ----- |
| Max observation content size     | 4096 characters             |       |
| Max batch observation operations | 10 observations per request |       |
| Max source length                | 100 characters              |       |
| Max observations per profile     | 500                         |       |

### Conversation summaries

| Resource limit                         | Value           | Notes |
| -------------------------------------- | --------------- | ----- |
| Max content size                       | 4096 characters |       |
| Max source length                      | 100 characters  |       |
| Max conversation summaries per profile | 500             |       |

### Bulk

| Resource limit       | Value | Notes |
| -------------------- | ----- | ----- |
| Max profiles         | 1000  |       |
| Max trait groups     | 50    |       |
| Max traits per group | 95    |       |

### Profile import (CSV)

| Resource limit        | Value                       | Notes |
| --------------------- | --------------------------- | ----- |
| File size             | 104,857,600 bytes (100 MiB) |       |
| File name             | 255 characters              |       |
| Column mappings       | 2-100 characters            |       |
| Column name length    | 64 characters               |       |
| Import status message | 39 characters               |       |
| Upload URL token      | 2048 characters             |       |

### Lookup

| Resource limit              | Value          | Notes |
| --------------------------- | -------------- | ----- |
| Max idType length           | 30 characters  |       |
| Max value length            | 255 characters |       |
| Max normalized value result | 255 characters |       |
| Max profile results         | 100 profiles   |       |

### Recall

| Resource limit     | Value           | Notes |
| ------------------ | --------------- | ----- |
| Query text length  | 1024 characters |       |
| Max communications | 100             |       |
| Max observations   | 100             |       |
| Max summaries      | 100             |       |

### Communications

| Resource limit                   | Value                             | Notes |
| -------------------------------- | --------------------------------- | ----- |
| Communication max message body   | 8,388,608 characters              |       |
| Max participants                 | 100                               |       |
| Max participant name length      | 256 characters                    |       |
| Communication max media          | 100 items                         |       |
| Communication max messages       | 100 messages                      |       |
| Communication max segments       | 100 segments                      |       |
| Communication max media duration | 600,000 milliseconds (10 minutes) |       |

### Events

| Resource limit           | Value                     | Notes |
| ------------------------ | ------------------------- | ----- |
| Event name               | 256 characters            |       |
| Max event properties     | 10 properties             |       |
| Property value (string)  | 10,000 characters         |       |
| Property value (integer) | -2147483648 to 2147483647 |       |
| Property value (array)   | 100 items max             |       |
| Event metadata           | 99 properties             |       |
| Batch event ingestion    | 1,000 events per request  |       |
