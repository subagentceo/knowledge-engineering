# Verify API

**This page provides an overview of Arkose Labs Verify API. It also describes how to use the Verify API in your application.**

**Other pages that document the Verify API are:**

* [Calling Verify API](https://developer.arkoselabs.com/docs/calling-verify-v4-api)
* [Verify Request and Response Schemas](https://developer.arkoselabs.com/docs/verify-request-and-response-schemas)
* [Verify API Response Fields and Examples](https://developer.arkoselabs.com/docs/verify-api-v4-response-fields)
* [IP Velocity Fields](https://developer.arkoselabs.com/docs/ip-velocity-fields)
* [Risk Score](https://developer.arkoselabs.com/docs/risk-score)

## Overview

The Verify API verifies a session for Arkose Bot Manager after the *Enforcement Challenge (EC)* process. For security reasons, it is always called for each session from your server-side code. Its parameters are your Arkose private key and the session token returned from the [Client API](https://developer.arkoselabs.com/docs/client-api), whether or not an EC was presented.

Verify's response indicates if the user was verified. It can be in a simple 1 or 0 format, or in a full JSON format. Your server-side code deals with handling and analyzing the response.

### Scenario 1

A user tries to sign on to a website. No EC is presented, because Arkose Bot Manager identifies the user as legitimate or low-risk and decides not to serve them an EC. You call the Verify API to validate the session token, with the verification response passed back to your server.

### Scenario 2

A user tries to sign on to a website configured with Arkose Bot Manager, which decides to serve them an EC because of potentially elevated risk. The user completes the challenge. Your server-side code calls the Verify API to inspect the user’s actions and check their response, with the verification response passed back to your server.

### Scenario 3

A user tries to sign on to a website configured with Arkose Bot Manager in detect-only mode. Arkose Bot Manager runs its detection engine. After completion, your server-side code calls the Verify API to inspect the user’s response, with the verification response passed back to your server.

## Creating Allowlists and Denylists

You can work with Arkose Labs to define *Allowlists* and *Denylists*. Essentially, Arkose takes a list of attributes and values you provide and uses them to create a custom telltale for your sessions. If an Allowlist-associated telltale is triggered, the session is validated, no matter what else happens. If a Denylist-associated telltale is triggered, the session is not validated. This happens regardless of any other telltales being triggered. 

To create an Allowlist or Denylist telltale, customers [create a Zendesk ticket](https://support.arkoselabs.com/) to put an attribute and its value or value range either as in an Allowlist or Denylist (IP values are a frequent choice for list attributes). From that, Arkose will create and set up custom telltales that your Verify API calls will use.

## Processing Verify API Responses

* Occasionally, Arkose Labs will add fields to the Verify API response to provide customers with additional enriched information about the session.
* Arkose Labs will NEVER update or delete existing response fields that may have an impact on how its customers process the response.
* Customers should account for this while integrating the API so that any new fields added are gracefully handled on their end.

## Recommendations for Handling HTTP Status Codes

### Fail-Open vs. Retry:

* **HTTP 5xx (Server Errors):** Customers can consider either fail-open for immediate user access or retrying with exponential backoff for improved verification accuracy. The choice depends on their prioritization of user experience versus potential security risks.

### Do Not Fail-Open:

* **HTTP 400 (Bad Request):** Do not fail to open HTTP 400 responses. Allowing such requests to pass could expose your system to potential abuse.