# Rate Limiting

```curl
# Example with the default rate limit of 1000

HTTP/1.1 200 OK
Content-Type: application/json
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 100
X-RateLimit-Reset: 1487332510

# After another request:
HTTP/1.1 200 OK
Content-Type: application/json
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1487332510

# After window resets
HTTP/1.1 200 OK
Content-Type: application/json
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 100
X-RateLimit-Reset: 1487332520

# If you make more than the allowed requests
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1487332520
```

```ruby
intercom.rate_limit_details
#=> {:limit=>1000, :remaining=>999, :reset_at=>2019-08-05 14:59:00 +0100}
```

API Rate Limits are in place to protect Intercom from API traffic spikes that could put our databases at risk. We therefore measure the amount of requests sent to the API in order to throttle these when they surpass the amount allowed. We will respond with `'429 Too Many Requests'` and the following headers:

| Header Name | Header Description |
|  --- | --- |
| X-RateLimit-Limit | Maximum number of requests allowed for the app. |
| X-RateLimit-Remaining | Number of requests left in the current time. |
| X-RateLimit-Reset | Time when the number of requests will be reset to the maximum limit.  Shown as [UNIX timestamp](http://en.wikipedia.org/wiki/Unix_time). |


What about Canvas Kit requests?
Rate Limits only apply to calls to the REST API, not to any webhook requests that are sent as part of the Canvas Kit capabilities.

## What is the default amount of requests?

Every app will have default rate limits. The amount we rate limit them by is different for apps which are privately built for your own usage, or for apps that are publicly installed by third-parties.

### Private

Private apps have a default rate limit of **10,000 API calls per minute per app** and **25,000 API calls per minute per workspace**. This means that if a workspace has multiple private apps installed, every one contributes towards total number of requests.

### Public

Public apps have a default rate limit of **10,000 API calls per minute for each app** and **25,000 API calls per minute per workspace**. This means that if a workspace has multiple public apps installed, each one has its own separate request limit without contributing to the others.

Higher rate limits
If you require higher rate limits than the defaults, you can contact us using the messenger in the bottom right.

## When does the amount of requests reset?

Although the permitted limit of requests lasts for 1 minute, we evenly **distribute this into 10 second windows**. This means that every 10 seconds, the amount of permitted requests resets. For example, a default rate limit of 1000 per minute means that you can send a maximum of 166 operations per 10 second period (1000/6).
Public apps have a default rate limit of **1000 API calls per minute for each app**. This means that if a workspace has multiple public apps installed, each one has it's own separate 1000 request limit without contributing to the others.

## When does the amount of requests reset?

Although the permitted limit of requests lasts for 1 minute, we evenly **distribute this into 10 second windows**. This means that every 10 seconds, the amount of permitted requests resets. For example, a default rate limit of 1000 per minute means that you can send a maximum of 166 operations per 10 second period (1000/6).