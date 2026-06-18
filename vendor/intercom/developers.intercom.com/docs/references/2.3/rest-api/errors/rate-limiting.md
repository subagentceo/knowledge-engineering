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

## How can I handle rate limits?

To prevent hitting the rate limits, here are a few options for handling within your code.

### Use the header information

You can find the number of requests allowed in your current window in the Intercom headers, or if you are using the [Intercom Ruby SDK](https://github.com/intercom/intercom-ruby#rate-limiting) you can call your client's `rate_limit_details` which returns a Hash with information about your app's rate limit.

You can use the remaining number of requests allowed in your current window and when this is below a certain value you can rest until your rate limit is reset.

In the example below the app is restricted to a rate limit of 5 just to show the output returned — note that we’ve also shown what information is available in the Intercom client and the response for your current rate limits using the Ruby SDK.

```ruby
require 'intercom'
require 'stringio'

intercom = Intercom::Client.new(token: ENV['YOUR_TOKEN'])

retries = 0
max_retries = 3
backoff_factor = 2

for num in 0..20
  begin
    puts("Request Number #{num+1}")
    email = 'contact' + num.to_s + '@example.com'
    name = 'Mrs ' + num.to_s + "Example"
    # Make a HTTP POST request to Intercom to create/update a user
    response = intercom.contacts.create(:email => email, :name => name, :signed_up_at => Time.now.to_i)
    # These are the headers we have access to when making requests
    puts("Rate Limit: #{intercom.rate_limit_details[:limit]} \n")
    puts("Remaining: #{intercom.rate_limit_details[:remaining]} \n")
    puts("Reset Time: #{intercom.rate_limit_details[:reset_at]} \n")

    # Check when request limit is under a certain number
    if not intercom.rate_limit_details[:remaining].nil? and intercom.rate_limit_details[:remaining] < 2
      sleep_time = intercom.rate_limit_details[:reset_at].to_i - Time.now.to_i
      puts("Waiting for #{sleep_time} seconds to allow for rate limit to be reset")
      sleep sleep_time
    end
  rescue => error
    raise("Received a general error so exiting: #{error}")
  end
end
```

The output from the above code is below. You would not need to output all of this data, but this should offer an example of what to expect and how you might approach implementing a rest until the limit is reset.

```
Request Number 1
Rate Limit:
Remaining:
Reset Time:
Request Number 2
Rate Limit: 5
Remaining: 5
Reset Time: 2023-12-08 15:19:51 +0000 
Request Number 3
Rate Limit: 5
Remaining: 4
Reset Time: 2023-12-08 15:19:51 +0000 
Request Number 4
Rate Limit: 5
Remaining: 3
Reset Time: 2023-12-08 15:19:51 +0000 
Request Number 5
Rate Limit: 5
Remaining: 2
Reset Time: 2023-12-08 15:19:51 +0000 
Request Number 6
Rate Limit: 5
Remaining: 1
Reset Time: 2023-12-08 15:19:51 +0000 
Waiting for 38 seconds to allow for rate limit to be reset
Request Number 7
Rate Limit: 5
Remaining: 5
Reset Time: 2023-12-08 15:19:51 +0000 
Request Number 8
Rate Limit: 5
Remaining: 4
Reset Time: 2023-12-08 15:19:51 +0000 
Request Number 9
Rate Limit: 5
Remaining: 3
Reset Time: 2023-12-08 15:19:51 +0000 
Request Number 10
Rate Limit: 5
Remaining: 2
Reset Time: 2023-12-08 15:19:51 +0000 
Request Number 11
Rate Limit: 5
Remaining: 1
Reset Time: 2016-11-16 16:15:00 +0000
Waiting for 58 seconds to allow for rate limit to be reset
```

### Use randomization

While the reset option is one way to deal with rate limiting, you may want more granular control over your rate limit handling. For example, you might have a specific retry timeframe that you want to follow and not wait for the minute window to pass for your entire rate limit to be reset.

If you want more control over your rate limiting handling then you can check for the specific rate limit error returned and use some form of randomization in the backoff calculation.

You could change the retry code above to look like this to achieve some randomization:

```ruby
require 'intercom'
require 'stringio'

intercom = Intercom::Client.new(token: ENV['YOUR_TOKEN'])

retries = 0
max_retries = 3
backoff_factor = 2

for num in 0..20
  begin
    puts("Request Number #{num+1}")
    email = 'contact' + num.to_s + '@example.com'
    name = 'Mrs ' + num.to_s + "Example"
    # Make a HTTP POST request to Intercom to create/update a user
    response = intercom.contacts.create(:email => email, :name => name, :signed_up_at => Time.now.to_i)
  rescue Intercom::RateLimitExceeded => error
    #At this point we know we have encountered a limit
    #So lets try for a few times and backoff a little in each case
    puts("Error Msg: #{error.inspect} \n")
    puts("http_code: #{error.http_code[:http_code]}\n" )
    puts("http_code: #{error.http_code[:application_error_code]}\n" )
    if retries <= max_retries
      # Lets try it a few more times
      retries += 1
      # Set a range from num of retries to backoff and randomly sample from that
      # You can pick any range you like here, this is just an example
      backoff = rand(retries..(backoff_factor * retries))
      puts("Backoff for #{backoff} seconds")
      sleep backoff
    else
      # Rasing error here so you can perform some action based on this event
      raise("No longer retrying since we have retried #{retries} times.\n"\
              "The error returned was: '#{error.message}'")
    end
  rescue => error
    raise("Received a general error so exiting: #{error}")
  end
end
```

After running this code, your output would look like this:

```
Request Number 1
Request Number 2
Request Number 3
Request Number 4
Request Number 5
Request Number 6
Request Number 7
Error Msg: #<Intercom::RateLimitExceeded: More than 5 requests received in 1 minute>
http_code: 429
http_code: rate_limit_exceeded
Backoff for 2 seconds
Request Number 8
Error Msg: #<Intercom::RateLimitExceeded: More than 5 requests received in 1 minute>
http_code: 429
http_code: rate_limit_exceeded
Backoff for 3 seconds
Request Number 9
Error Msg: #<Intercom::RateLimitExceeded: More than 5 requests received in 1 minute>
http_code: 429
http_code: rate_limit_exceeded
Backoff for 3 seconds
Request Number 10
Error Msg: #<Intercom::RateLimitExceeded: More than 5 requests received in 1 minute>
http_code: 429
http_code: rate_limit_exceeded
Backoff for 6 seconds
Request Number 11
Error Msg: #<Intercom::RateLimitExceeded: More than 5 requests received in 1 minute>
http_code: 429
http_code: rate_limit_exceeded
advanced_throttle.rb:32:in `rescue in block in <main>': No longer retrying since we have retried 4 times. (RuntimeError)
The error returned was: 'More than 5 requests received in 1 minute'
	from advanced_throttle.rb:9:in `block in <main>'
	from advanced_throttle.rb:8:in `each'
	from advanced_throttle.rb:8:in `<main>'
```

### Use a library for exponential backoff

To prevent having to implement your own backoff forumlas, you can use a library that will handle this for you. Some examples include:

- [retry](https://www.npmjs.com/package/retry) for Node.js
- [backoff](https://pypi.org/project/backoff/) for Python
- [retries](https://github.com/ooyala/retries), a RubyGem which will be used for the below example


With retries, all you specify the number of retries you want and it will handle the rest.

```ruby
require 'intercom'
require 'stringio'
require 'retries'

intercom = Intercom::Client.new(token: ENV['YOUR_TOKEN'])

max_retries = 3

for num in 0..20
  handler = Proc.new do |exception, attempt_number, total_delay|
    puts "Handler saw a #{exception.class}; retry attempt #{attempt_number}; #{total_delay} seconds have passed."
  end
  with_retries(:max_tries => max_retries, :handler => handler, :rescue => [Intercom::RateLimitExceeded]) do |attempt|
    puts("Request Number #{num+1}")
    # You can check for the max retry number and raise an error so you can take some action based on this event
    if attempt >= max_retries
      raise("No longer retrying since we have retried #{attempt} time.\n"\
    "The error returned was: '#{Intercom::RateLimitExceeded}'")
    end
    puts("Request Number #{num+1}")
    email = 'contact' + num.to_s + '@example.com'
    name = 'Mrs ' + num.to_s + "Example"
    # Make a HTTP POST request to Intercom to create/update a user
    response = intercom.contacts.create(:email => email, :name => name, :signed_up_at => Time.now.to_i)
  end
end
```

The is what the output of the above example looks like using retries:

```
Request Number 1
Request Number 2
Request Number 3
Request Number 4
Request Number 5
Request Number 6
Handler saw a Intercom::RateLimitExceeded; retry attempt 1; 0.328696139 seconds have passed.
Request Number 6
Handler saw a Intercom::RateLimitExceeded; retry attempt 2; 1.194656588 seconds have passed.
Request Number 6
throttle_retries.rb:14:in `block (2 levels) in <main>': No longer retrying since we have retried 3 times. (RuntimeError)
The error returned was: 'Intercom::RateLimitExceeded'
	from /home/ec2-user/.rvm/gems/ruby-2.3.0/gems/retries-0.0.5/lib/retries.rb:46:in `with_retries'
	from throttle_retries.rb:11:in `block in <main>'
	from throttle_retries.rb:7:in `each'
	from throttle_retries.rb:7:in `<main>'
[ec2-user@ip-10-0-2-162 ~]$
```