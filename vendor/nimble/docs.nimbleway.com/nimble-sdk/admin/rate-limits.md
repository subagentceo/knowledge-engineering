> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Rate Limits

> Technical specifications, rate limits, and API constraints

Understanding API limitations and specifications helps you optimize performance, plan capacity, and avoid throttling. This guide covers rate limits, driver capabilities, request constraints, and best practices.

## Overview

Nimble's API implements tiered specifications based on:

* **Driver selection**: Different drivers have different rate limits
* **Request complexity**: Complex operations may have additional constraints
* **Resource usage**: Fair usage policies ensure platform stability

## Drivers

Nimble offers different drivers optimized for various use cases:

| **Driver** | **Description**                 | **Best For**                   |
| ---------- | ------------------------------- | ------------------------------ |
| `vx6`      | HTTP requests without rendering | Static pages, simple HTML      |
| `vx8`      | JavaScript rendering            | Dynamic content, AJAX          |
| `vx10`     | Stealth browser mode            | Protected sites, complex sites |

<Note>
  Each driver has different pricing and rate limits. Higher-tier drivers cost more per request.
</Note>

## Rate Limits

### Default rate limits by driver

All accounts have the following default rate limits:

| **Driver**           | **Rate Limit**     |
| -------------------- | ------------------ |
| `vx6`, `vx8`, `vx10` | 83 QPS (5,000 QPM) |

<Callout icon="headset" iconType="solid" color="#d87dff">
  **Need higher limits?** Reach out to your CS or open a via a [Support Ticket](https://portal.usepylon.com/nimble) to discuss custom rate limits based on your requirements.
</Callout>

### Agent generation

Custom agent generation has a separate daily limit:

| **Endpoint**                  | **Limit**                          |
| ----------------------------- | ---------------------------------- |
| `POST /v1/agents/generations` | 100 generations per customer / day |

This limit applies across all generation methods (API, CLI, SDK, and the Agent Builder skill). It covers both new agent creation and refinement via `from_agent`. See [Agent Creation](/nimble-sdk/agentic/agent-creation) for details.

### Response headers

Every response includes metadata headers:

```
ratelimit-limit: 20
ratelimit-remaining: 15
x-task-id: 8e8cfde8-345b-42b8-b3e2-0c61eb11e00f
```

Use these headers to:

* Monitor rate limit usage
* Track request IDs for debugging
* Optimize driver selection
* Measure performance

### Handling rate limits

When you exceed rate limits, the API returns a 429 status code:

```json theme={"system"}
{
  "status": "failed",
  "msg": "Rate limit exceeded"
}
```

**Best practices:**

* Implement exponential backoff on 429 responses
* Use the `retry_after` value to schedule next request
* Monitor rate limit headers in responses
* Batch requests when possible
* Use lower-tier drivers when sufficient

## HTTP status codes

### Success codes

| Code    | Status | Description                                          |
| :------ | :----- | :--------------------------------------------------- |
| **200** | OK     | Request succeeded and data was returned successfully |

### Client error codes

| Code    | Status            | Description                                                      |
| :------ | :---------------- | :--------------------------------------------------------------- |
| **400** | Bad Request       | Invalid URL, malformed parameters, or missing required fields    |
| **401** | Unauthorized      | Account doesn't exist, invalid API key, or missing credentials   |
| **402** | Payment Required  | No budget, limit reached, trial expired, or trial quota finished |
| **403** | Forbidden         | Account blocked or not activated                                 |
| **429** | Too Many Requests | Rate limit exceeded for your plan                                |

### Server error codes

| Code    | Status                | Description                             |
| :------ | :-------------------- | :-------------------------------------- |
| **500** | Internal Server Error | Unexpected server-side error occurred   |
| **501** | Not Implemented       | Proxy service encountered an error      |
| **555** | Request Timeout       | Request exceeded maximum execution time |

<Note>
  Nimble automatically retries failed requests before returning a final failure status (500)
</Note>

## Blocked Domains

The following domains are blocked across all Web APIs and Proxy services. Requests targeting these domains will be rejected.

<Accordion title="View blocked domain list">
  * `*.paypal.com`
  * `account.sonyentertainmentnetwork.com`
  * `acopic.click`
  * `adskpak.com`
  * `amctheatres.com`
  * `andromedabee.com`
  * `antliabee.co.uk`
  * `api.groupon.com`
  * `api.stripe.com`
  * `api.tyrads.com`
  * `apusbee.co.uk`
  * `auth.api.sonyentertainmentnetwork.com`
  * `bellarmine.click`
  * `caixa.gov.br`
  * `callofduty.com`
  * `canal-plus.com`
  * `clubmium.com`
  * `clubmium.net`
  * `couponcabin.com`
  * `crunchyroll.com`
  * `dazn.com`
  * `directv.com`
  * `ea.com`
  * `epicgames.com`
  * `fustian.click`
  * `gomobile.it`
  * `googlecm.hit.gemius.pl`
  * `hbo.com`
  * `hitspro.net`
  * `honeyga.in`
  * `honeygain.com`
  * `honeygain.money`
  * `hotstar.com`
  * `iplogger.org`
  * `kayak.com`
  * `mojang.com`
  * `mte.gov.br`
  * `music-box.mobi`
  * `mybip.it`
  * `myy.io`
  * `native.np.ac.playstation.net`
  * `networkcontroller.net`
  * `ocmey.com`
  * `onevanilla.com`
  * `ordo.link`
  * `pagseguro.com`
  * `paypal.com`
  * `playstation.com`
  * `playstation.net`
  * `plex.tv`
  * `powerbrowsing.online`
  * `revenuevelocity.eu`
  * `roblox.com`
  * `runescape.com`
  * `seasyvendas.com`
  * `sky.com`
  * `sport4life.mobi`
  * `spotify.com`
  * `ssfcu.com`
  * `steamcommunity.com`
  * `steampowered.com`
  * `torrentdownloads.me`
  * `ttvnw.net`
  * `tyrads.com`
  * `tyrrewards.com`
  * `ubi.com`
  * `ubisoft.com`
  * `unrealengine.com`
  * `usps.com`
  * `valuedopinions.com`
  * `vrv.co`
  * `wellsfargo.com`
  * `www.ltv-mob.com`
  * `yogini.top`
  * `zelator.in`
</Accordion>
