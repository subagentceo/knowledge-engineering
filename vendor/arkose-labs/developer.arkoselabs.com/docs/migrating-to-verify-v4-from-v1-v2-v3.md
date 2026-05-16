# Migrating to Verify v4 from v1, v2, v3

## Purpose

This page explains how to migrate from previous Arkose Labs Verify API versions to Verify API v4.

In summary, key differences between v4 and all previous versions are:

* v4 has a different request endpoint.

* v4’s response has a significant number of new fields not returned in earlier versions.

* v4 has several optional features, such as risk score and ip velocity information.

* v4’s response body structure is different from all other versions.

* v4 accepts only `POST` requests.

## Key v4 Differences From Previous Versions

## From v3

* Verify’s request endpoint changes from `/api/v3/verify/` to `/api/v4/verify/`.

* Many new response fields and expanded detection data and techniques.

* Significant changes to the Verify response body format:

  * v3’s response body has a flat structure. All response fields (e.g. `solved`, `user_ip`, `session`) are in the root of the returned JSON data.

  * v4’s response body has nested fields containing data and other nested fields. The top level fields are; `session_details`, `fingerprint` and `ip_intelligence`. Other fields may be present based on customer key configuration.

  * Because of this, some data is returned in different locations by v4. For example, in v4 the `solved` field is under the `session_details` field.

* Unlike with v1 and v2, v4 handles errors the same way and with the same codes as v3. No changes are needed.

## From v2

* Verify’s request endpoint changes from `/api/v2/verify/` to `/api/v4/verify/`.

* Many new response fields and expanded detection data and techniques.

* Significant changes to the Verify response body format:

  * v2’s response body has a flat structure. All response fields (e.g. `solved`, `user_ip`, `session`) are in the root of the returned JSON data.

  * v4’s response body has nested fields containing data and other nested fields. The top level fields are; `session_details`, `fingerprint` and `ip_intelligence`. Other fields may be present based on customer key configuration.

  * Because of this, some data is returned in different locations by v4. For example, in v4 the `solved` field is under the `session_details` field.

* v2 responses always contain an HTTP status code `200`, even if the server request failed. v4 returns non-`200` status codes for failed server requests.

  * Customers that monitor Verify responses status code will likely see more errors, but, this does not necessarily mean more failed requests.

## From v1

* Verify’s request endpoint changes from `/fc/v` to `/api/v4/verify/`.

* Many new response fields and expanded detection data and techniques.

* Significant changes to the Verify response body format:

  * v1’s response body has a flat structure. All response fields (e.g. `solved`, `user_ip, session`) are in the root of the returned JSON data.

  * v4’s response body has nested fields containing data and other nested fields. The top level fields are; `session_details`, `fingerprint` and `ip_intelligence`. Other fields may be present based on customer key configuration.

  * Because of this, some data is returned in different locations by v4. For example, in v4 the `solved` field is under the `session_details` field.

* v1 responses always contain an HTTP status code `200`, even if the server request failed. v4 returns non-`200` status codes for failed server requests.

  * Customers that monitor Verify responses status code will likely see more errors, but, this does not necessarily mean more failed requests.

## Prerequisite

If you are still using the generic Verify endpoint (`https://verify-api.arkoselabs.com/`), you need to switch to having a custom endpoint (`https://<company>-verify.arkoselabs.com/`). You are not required to use your company’s name; you can use a product name or any word not already in use by someone else.

To switch over, talk to your CSM about obtaining your custom Verify endpoint. You will need to change your code to send Verify API requests to the new endpoint.

## Migration Process

**IMPORTANT:*Arkose strongly recommends migrating and testing your development keys first, then migrating your production keys.***

1. Regardless of which version, v1, v2, or v3 you are updating from, follow the Verify v4 server side setup guide in the Arkose developer documentation:  [Server-Side Instructions](https://developer.arkoselabs.com/docs/server-side-instructions-v4)

2. Ensure any references to `verify-api.arkoselabs.com` are now `<company>-verify.arkoselabs.com` (whatever your custom Verify endpoint is).

3. If you have not already done so, check that your code that processes v4 responses gracefully handles encountering unknown fields and their values. Arkose Labs reserves the right to add new fields to the v4 Response Schema. However, we will not delete fields or significantly change the return values for existing fields.

4. If your code does not gracefully handle unknown to it v4 response fields, rewrite it so that it does. This way it will be able to handle any new, additional, fields without breaking until you can write code to specifically handle them.

5. If you have been using Data Exchange, make all data fields for it of type String. For example, instead of `timestamp: 1111111111`, do `timestamp: '1111111111'`.

6. Read up on these new to v4 features in the documentation and decide which you want to use. Then rewrite your code to use them.

   1. Session details.

      1. `game_number_limit_reached`

      2. `telltale_list`

      3. `user_language_shown`

   2. Integrated IP Intelligence response fields (shown in the response documentation as a separate section).

   3. Enriched Fingerprint information response fields (shown in the response documentation as a separate section).

      1. Browser characteristics

      2. Device characteristics

      3. User preferences

   4. Optional Risk Score response fields.

   5. Optional IP Velocity response fields.

## Post Migration: Testing

To confirm a successful migration to Verify v4, perform these basic tests.

## A Successful Verify Test

Load/run your page/application which integrates with the Arkose Platform. You should complete the workflow successfully, which may include solving an Enforcement Challenge if presented, and then verifying that session by sending the Verify API request to the v4 endpoint. Upon completion, confirm:

* The Verify response had a `200` HTTP status code.

* The Verify response body had the v4 structure as described in [Server-Side Instructions](https://developer.arkoselabs.com/docs/server-side-instructions-v4).

* Your code that parsed and processed the Verify response body did so successfully; e.g. there were no errors, warnings, or other unexpected behavior.

## An Unsuccessful Verify Test

Perform a test where Verify fails to verify a session. The easiest way is to send a Verify request with either an incorrect verification token value or an incorrect private key value as part of the Verify request payload. For example, configure your system with an incorrect Arkose Labs private key value, and then run it as usual to send a Verify API request to the Verify endpoint. Upon completion, confirm:

* The Verify response had a `400` HTTP status code.

* The Verify response body had the error structure seen under “Failed EC with error message” in our docs: [Server-Side Instructions](https://developer.arkoselabs.com/docs/server-side-instructions-v4)

* Your code successfully parsed and processed the Verify response body, despite the Verify endpoint returning an error, e.g. your code did not have its own errors, warnings, or other unexpected behavior when dealing with a Verify error.

## Post Migration: Monitoring

When you have migrated to Verify v4 and are running production traffic through it, consider the following when monitoring your system:

* **Latency**: If you have Verify request latency monitoring in place, you can check that latency is stable. Initially, depending on your previous implementation, you may see significant latency improvements

* **Errors**: At first, post-migration, check that your error rate has not significantly increased. **Note**: when migrating from either v1 or v2, **you should expect more non-200 HTTP status code response errors**. v1 and v2 **only** return HTTP status code `200`, even for failed verify attempts.