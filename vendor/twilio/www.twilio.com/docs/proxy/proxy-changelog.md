# Proxy Changelog

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

## 2020.11.11

For Proxy services created on or after October, 5th 2020, Proxy no longer inserts a '1' when calling or messaging Mexico numbers as it is no longer required by mobile operators in Mexico. For Proxy services created prior to October 5th 2020, Proxy continues to insert the '1' to avoid unforeseen breaking changes. Customers encountering problems reaching Mexican numbers should contact Twilio support to modify the Proxy service behavior. For more information, please see [Proxy Behavior in Mexico](/docs/proxy/understanding-phone-number-management#proxy-behavior-in-mexico).

Support for reaching Argentina numbers is now available. Customers using Argentinian numbers need to contact Twilio support to enable this support. Please see [Proxy Behavior in Argentina](/docs/proxy/understanding-phone-number-management#proxy-behavior-in-argentina) for more information

## 2020.10.26

Added a ProxyRespectSmsStopFilterFlag account flag. If this flag is on, Proxy will use the SMS STOP Filtering flag as the basis for determining whether to forward or drop opt-in/opt-out words. See [https://www.twilio.com/docs/proxy/opt-out-keywords](/docs/proxy/opt-out-keywords) for more information.

## 2020.10.22

Change certain debugger events to Warning instead of Error. Improved debugger message bodies.

## 2020.09.28

All `POST` and `DELETE` endpoints are now rate limited. These endpoints will return an HTTP 429 response when requests are throttled. We recommend retrying with a backoff when receiving this response.

## 2020.09.15

Proxy now performs case-insensitive matching of the opt-out keywords: `STOP`, `UNSUBSCRIBE`, `END`, `CANCEL`, `QUIT`, `STOPALL`, `ARRETT`, `ARRET`, `ARRETE`, and `UNSTOP`. When a match occurs, Proxy blocks the matching message and sends a debugger notification. Previously, Proxy performed an uppercase compare of the opt-out keywords.

**Note** Proxy will continue to emit a debugger notification whenever one of these messages is blocked.

Proxy now forwards the opt-in keywords `START`, `YES`, and `DEBUT` regardless of case. Previously, Proxy did not forward messages that contained opt-in keywords in uppercase.

## 2020.09.10

Changed default behavior for Participant Create, Session Create (with participants) and Session Re-open requests to be rejected if the request would result in multiple Participants with the same Identifier/ProxyIdentifier pair being active in multiple Sessions. At the same time, we have added an AllowParticipantConflict account flag which is enabled by default for all accounts identified as currently encountering any of these scenarios. These customers may opt-in to having these problematic requests rejected by requesting that this account flag be turned off. Alternatively, they may provide a FailOnParticipantConflict=True parameter on a per-request basis to simulate the account flag being turned off while they make any needed modifications to their error-handling.\
Problematic Participant Create and Session Create (with Participants) requests will be rejected with 409 Conflict (Twilio error code 80623) and can be retried.

Problematic Session Update (re-open) requests will be rejected with 400 Bad Request (Twilio error code 80604).

## 2020.09.02

Send Debugger Notification for CallToMessageOnlySessionRejected (80911) and MessageToVoiceOnlySessionRejected (80910) conditions.

## 2020.08.21

Status Callbacks include MediaUrls when sending an MMS.

## 2020.08.21

Intercept Callbacks include MediaUrls when sending an MMS.

## 2020.08.06

Added FailOnParticipantConflict parameter to Session create/update and Participant create endpoints, and debugger notifications regarding possible duplicate Participant creation.

Currently, use cases that involve re-opening closed sessions, or simultaneously adding the same person to multiple Sessions around the same time, can result in multiple active Participants having the same Identifier/ProxyIdentifier pair. This can cause calls and messages to be routed incorrectly. Providing the FailOnParticipantConflict=true parameter (recommended) for the specified endpoints allows Proxy to reject requests that would result in this condition. Calling code should handle 400 (Twilio error code 80604) on Session update, Session create, and Participant create. It should also handle 409 (Twilio error code 80623) from the Session and Participant create endpoints.

If the FailOnParticipantConflict parameter is not provided (or is False), Proxy will send new debugger notifications (codes 80801 and 80802) when it encounters these scenarios, but it will allow the request to proceed for some period of time. However, in a future release, Proxy will begin rejecting these requests.

In addition to providing protection against creating invalid Participants, opting into allowing Proxy to reject these requests will enable transitioning your Service to use a more efficient Participant creation logic, thus reducing latency.

## 2020.07.20

Internal change to allow creating a Service with the same name as a recently deleted Service. Previously, this could fail with a NonUniqueServiceName error (80602).

## 2020.07.13

Internal change to allow creating a Session with the same name as a recently deleted Session. Previously, this could fail with a NonUniqueSessionName error (80603).

## 2020.07.09

Reverted case-insensitive matching as it affected certain deployments. Proxy will only match stop/start messages that are capitalized.

## 2020.07.08

Bug Fix: Fix for handling of STOP/START messages. Messages matching standard unsubscribe/resubscribe message list (case-insensitive match) will not be forwarded. A MessageMatchedStopWord (80901) warning will be emitted to the Debugger.

## 2019.11.18

Sessions Retention policy: Sessions that are closed for 90 days will be deleted. Related Participants and Interactions will also be deleted. These will not be queryable from the API or Proxy Console. It's recommended to retrieve relevant data within 90 days of the Session having been Closed and save it outside of Twilio.

## 2019.08.13

Turned on rate-limits (30 requests per second) on `GET` endpoints.

## 2019.07.11

Added limitation of 5000 reserved phone numbers and 500 unreserved phone numbers per proxy service.

## 2019.06.06

A maximum of 100 records will be returned per page for all "list" endpoints.

## 2019.05.21

Added validation of callback URLs to prevent misconfiguration. Callback URLs cannot be Proxy URLs.

## 2019.04.18

Added `in_use` count to the phone number instance resource. This is the number of active sessions associated with the number.

## 2019.04.17

Bug Fix: Process auto-create payload from out-of-session callback if `Content-type` is `application/json` regardless of charset specified.

## 2019.04.15

Emit debugger event for Out Of Session Callback responses that are not a 200 level status code.

## 2019.01.29

Bug Fix: Allow inbound calls from callers whose Country information cannot be determined.

## 2019.01.24

Bug Fixes:

* Past DateExpiry values not allowed on Session create.
* If both DateExpiry and Session status in-progress specified on Session update, specified DateExpiry not dropped.
