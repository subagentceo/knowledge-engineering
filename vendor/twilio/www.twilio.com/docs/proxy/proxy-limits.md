# Proxy Limits

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

Twilio Proxy has a number of limits in place which will constrain certain elements of the system and how it is used.

The Proxy limits are enforced at the Service instance level (except for Service list limits which are enforced at the Account level). These limits are set within a Service instance scope.

## [Number Pool Limits](#number-pool-limits)

Each service can have a maximum of 5000 [Reserved](/docs/proxy/reserved-phone-numbers) numbers and 500 dynamic/non-reserved numbers.

## [Active Participants per Number](#active-participants-per-number)

We recommend, but do not enforce, a limit of 100 participants associated with a given number in active sessions at any given time. See [https://www.twilio.com/docs/proxy/phone-numbers-needed](/docs/proxy/phone-numbers-needed) for more information on proxy number management.

## [Throughput Limits](#throughput-limits)

Limits of this type will impact the number of simultaneous actions that can be performed within a Service Instance.

### [Requests Per Second](#requests-per-second)

RPS is the guaranteed Requests Per Second against a given endpoint that a Service instance will support. All Service instances have a baseline of 30 RPS per endpoint. Proxy will allow short bursts above the baseline RPS - up to 5x the baseline. If the bursts become sustained throughput, the Service will start rejecting requests.

#### [How This Works](#how-this-works)

The request limit is based on the average request rate in 5s sliding window. For example, for 30 req/s limit we allow bursts up to 150 req/s. After this, your application client request logic needs to wait until the average goes below the threshold to make any query requests again against that endpoint.

Requests that go over the RPS threshold are rejected with HTTP status code `429` Too Many Requests.

#### [When the Throughput is Exceeded](#when-the-throughput-is-exceeded)

For reliable handling of *short-term bursts* of requests towards the Proxy REST API, please make sure your backend application implements a retry logic. When your application receives HTTP status code `429` back from the Proxy service, it should repeat the request several times, using a good exponential back-off algorithm like [the one advocated by Amazon](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/).

## [Data Length/Size Limits](#data-lengthsize-limits)

Limits for user provided data in UTF-8 characters. If a payload limit is specified in bytes, we assume that the data is serialized using UTF-8 encoding where each character (e.g. emoticon) may take more than one byte.

### [Resource Property Limits](#resource-property-limits)

| Resource    | Field                   | Maximum length / Size  |
| ----------- | ----------------------- | ---------------------- |
| Service     | UniqueName              | 191 characters         |
| Service     | CallbackUrl             | 4000 characters        |
| Service     | InterceptCallbackUrl    | 4000 characters        |
| Service     | OutOfSessionCallbackUrl | 4000 characters        |
| Session     | UniqueName              | 191 characters         |
| Session     | Ttl                     | 0 \< ttl \< 2147483647 |
| Participant | FriendlyName            | 255 characters         |
| Participant | Identifier              | 191 characters         |
| Participant | ProxyIdentifier         | 255 characters         |
