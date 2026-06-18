# Setting up OAuth

If you are building a public integration that will have access to **other peoples'** Intercom data you are required to set up OAuth. This guide will walk you through the process.

- [Setting up OAuth](#setting-up-oauth)
  - [Provide the initial information](#provide-the-initial-information)
  - [Redirect URLs](#redirect-urls)
  - [Permissions](#permissions)
    - [People & conversation data](#people--conversation-data)
    - [Workspace data](#workspace-data)
  - [Get the authorization code](#get-the-authorization-code)
  - [Trade your authorization code for an Access Token](#trade-your-authorization-code-for-an-access-token)
  - [Use your token](#use-your-token)
  - [Example Ruby Code](#example-ruby-code)
  - [Trade your authorization code for an access token](#trade-your-authorization-code-for-an-access-token-1)


After you complete these steps, you'll be able to use your access token to execute the actions authorized by an Intercom customer.

Public vs. Private app authentication
If you are building a private app that only needs to access the data from your paid Intercom workspace, you can use [Access Tokens](/docs/build-an-integration/learn-more/authentication#access-tokens) and do not need to set up OAuth. See the [authentication guide](/docs/build-an-integration/learn-more/authentication) for more details.

## Provide the initial information

Each development workspace automatically gives you the option to use OAuth. To start, tick the **Use OAuth** option on your Authentication page in the Developer Hub.

![OAuth_blurred](/assets/af3fea5-oauth_blurred.ac6db608703f5d588d5a172a95582770ee07bc317d590a9c1cc96b22ba783496.71a4f21c.png)

You'll now have two sections to fill out:

## Redirect URLs

This is the URL which we POST to when your user has authorized your app to access their information. In other words, it's the URL that Intercom will use to send the authorization code for your user.

> ❗️ Redirect URLs must use HTTPS
The redirect will need to communicate over a [TLS/SSL](https://developer.mozilla.org/en-US/docs/Glossary/TLS) connection, so the URL will need to be over HTTPS.


![Callback blurred](/assets/2731fa1-callback_blurred.367d683cf42fc3dc41b963b5dba9d71bc5720e706b1fec4efc44b53ef4f54c96.71a4f21c.png)

Multiple Redirect URLs
You can provide multiple URLs by selecting the **Add redirect URL** option after specifying your initial one. The first will always be the default.

> After approval, you can choose which URL to use when you're initiating the OAuth flow via the `redirect_uri` parameter. This means you can include testing as well as production URLs here.


## Permissions

Permissions let you specify exactly how your application needs to access an Intercom user's account.

You should only specify the scopes you definitely need for your use case. It's best practice as these will go up for review when you [submit your app for review](/docs/publish-to-the-app-store/review-publish-your-app).

> 🚧 Scopes automatically being selected
If your app utilizes Canvas Kit, certain permissions are required by default due to the data your app will have access to. The following scopes will be automatically selected and cannot be deselected:
- Read and list users and companies
- Read conversations
- Read admins
- Gather App data



The following permissions can be selected via checkboxes on your Authorization page:

### People & conversation data

| Standard scopes | Description |
|  --- | --- |
| Read and list users and companies | List and view all segments, users, companies, and tags |
| Read and write users | List all users and execute bulk actions |
| Write users and companies | Create and update users, companies, and tags |
| Read one user and one company | List and view a single user and company |
| Read tags | List all tags |
| Write tags | Create, update, use and delete tags |
| Read conversations | View conversations |
| Write conversations | Reply to, mark as read and close conversations |
| Read events | List all events belonging to a user |
| Write events | Ability to submit events (i.e. user activity) |
| Read counts | Count users and companies with specified criteria |
| Write data attributes | Create and update custom data attributes |
| Export message data | Export engagement data for messages |
| Export content data | Export engagement data for content |
| Read content data | Create and update custom data attributes |
| Read tickets | View tickets |
| Write tickets | Create tickets |
| Read and write custom object instances | Create, read, update and delete custom object instances |
| Read status of jobs | Read status of jobs enqueued via the API |


### Workspace data

| Extended scopes | Description |
|  --- | --- |
| Read admins | List and view all admins |
| Read one admin | View a single admin |
| Update admins | Update away mode for admins |
| Read admin activity logs | List and view all admins and their activity |
| Read data when entered into the app | Gather data via Intercom Apps |
| Read and List news items and newsfeeds | List and view all News items and Newsfeeds |
| Read and Write news items and newsfeeds | Read, Update and Create news items and newsfeeds |
| Read and List articles | List and view all articles |
| Read and Write Articles | Read, Update and Create articles |
| Create phone call redirects | Create phone call redirects |
| Read and list news items and newsfeeds | List and view all News items and Newsfeeds |
| Read and write news items and newsfeeds | Read, update and create news items and newsfeeds |
| Read and write AI content | Create and update AI content |
| Read data connectors | Access data connectors, execution results and execution webhooks |
| Read and write data connectors | Configure data connectors and read execution results and execution webhooks |


Selecting webhook topics
**Webhook topics are related to corresponding permission scopes**. For example, if you need to setup a webhook to trigger when a **user/lead is created** then you will need to select the "**Read and write users**" permission scopes. You will then be able to setup the webhook topics for your app which will fire for each workspace it is installed on. Checkout our docs on [setting up webhooks](/docs/webhooks/setting-up-webhooks) for more detailed information on how to enable webhooks for your app.

## Get the authorization code

You'll first need your `client_id` and `client_secret`. These can be found on the Basic Information page for your app in the Developer Hub.

![Basic information](/assets/8065163-06_-_basic_information.8f9bd9bcf2a55d3640f7b6e6a027beeed981c4584b4e673cbb6f5cb25894eb7a.71a4f21c.png)

To get the Authorization Code, you will need to redirect your user to the following URL:

```http
https://app.intercom.com/oauth?client_id=___&state=___
```

- `client_id`: Your app's Client ID (see above)
- `state`: A random session specific string which we will return in the callback to allow you to identify the session and mitigate [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) attacks


Your user will be presented with the permissions that your app is requesting. Once the user approves this request, they are redirected back via the Redirect URLs which you provided earlier.

The request to your Redirect URL will have 2 URL parameters: `code` and `state`. For example:

```
https://yourapp.com/callback?code=___&state=___
```

- `code`: This is the Authorization Code you will use to retrieve an Access Token
- `state`: This should be the same as the `state` string you passed to the Authorization Code endpoint above


## Trade your authorization code for an Access Token

We can now exchange the `code` for the Access Token with a POST request to:

```
https://api.intercom.io/auth/eagle/token
```

with the following parameters in the body:

- `code`: The Authorization Code received above
- `client_id`: Your app's Client ID from the Developer Hub (see above)
- `client_secret`: Your app's Client secret from the Developer Hub (see above)


A successful request will receive a response with the following parameters in the body of the response:

- `token_type`: Always 'Bearer'
- `token`: The Access Token
- `access_token`: A duplicate of the Access Token above


```json
{
  "token_type": "Bearer",
  "token": "dG9rOjBiM...",
  "access_token": "dG9rOjBiM..."
}
```

Confirm code value
The code value in the redirect URL may contain a `=` at the end which needs to be included.

Please double check the code value provided in the token exchange POST request if you get a `401` response with error message `Unauthorized Code`.

## Use your token

Now that we have the authorized token, we can use this to execute some action on behalf of our user.

For example, to retrieve the admin and app information associated with the Access Token:

```Shell
curl --request GET \
     --url 'https://api.intercom.io/me' \
     --header 'accept: application/json' \
     --header 'authorization: Bearer <ACCESS_TOKEN>'
```

```Javascript
// npm install api --save

const sdk = require('api')('@intercom-api-reference/v2.8#132bo2vleh7syud');

sdk.auth('<ACCESS_TOKEN>');
sdk.identifyAdmin({'intercom-version': '2.8'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
```

```Python
import requests

url = "https://api.intercom.io/me"

headers = {
    "accept": "application/json",
    "authorization": "Bearer <ACCESS_TOKEN>"
}

response = requests.get(url, headers=headers)

print(response.text)
```

```ruby
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.intercom.io/me")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["accept"] = 'application/json'
request["Intercom-Version"] = '2.8'
request["authorization"] = 'Bearer <ACCESS_TOKEN>'

response = http.request(request)
puts response.read_body
```

```php
// composer require guzzlehttp/guzzle
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.intercom.io/me', [
  'headers' => [
    'Intercom-Version' => '2.8',
    'accept' => 'application/json',
    'authorization' => 'Bearer <ACCESS_TOKEN>',
  ],
]);

echo $response->getBody();
```

An example, successful response would be:

```json
{
  "type": "admin",
  "id": "2633609",
  "email": "hermione.granger@awesomecorp.io",
  "name": "Hermione Granger",
  "email_verified": true,
  "app": {
    "type": "app",
    "id_code": "drzzt019",
    "name": "Hogwarts workspace",
    "created_at": 1661876617,
    "secure": true,
    "identity_verification": true,
    "timezone": "Europe/Edinburgh",
    "region": "US"
  },
  "avatar": {
    "type": "avatar",
    "image_url": "https://static.intercomassets.com/avatars/56395503/square_128/5449623-166556.jpg"
  },
  "has_inbox_seat": true
}
```

[**Find out more about how to use the token through this link.**](/docs/build-an-integration/learn-more/authentication#how-to-use-the-token)

Use OmniAuth instead
We have added support for Intercom to number of OAuth libraries. It makes the setup process much easier, so it is a good way to setup OAuth for your app:

> [For Rails apps, use Intercom strategy for OmniAuth.](https://github.com/intercom/omniauth-intercom)
[For Node.js apps, use Intercom Strategy for Passport.](https://github.com/intercom/passport-intercom)
[For PHP apps, use Intercom Provider for PHP League's OAuth 2.0.](https://github.com/intercom/oauth2-intercom)
[For GO apps, use GOTH library.](https://github.com/markbates/goth)
To prevent user impersonation, check that `user.RawData["email_verified"]` is set to `true` in the response.


## Example Ruby Code

Intercom provides some Ruby sample code that you can use to allow the user to authorize MyApp's request via a "Connect with Intercom" button.

Firstly, you will need to generate a Self Signed Certificate and a Private Key if you don't have SSL setup on your site. You can do so like so:

```shell
openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout pkey.pem -out cert.crt
```

Now you can use this very simple Sinatra setup with one of your publicly available endpoints to test the OAuth flow:

```javascript
<a href="https://app.intercom.com/oauth?client_id=<XXXXXXXXXXXX>&state=example"><img src="https://static.intercomassets.com/assets/oauth/primary-7edb2ebce84c088063f4b86049747c3a.png" srcset="https://static.intercomassets.com/assets/oauth/primary-7edb2ebce84c088063f4b86049747c3a.png 1x, https://static.intercomassets.com/assets/oauth/primary@2x-0d69ca2141dfdfa0535634610be80994.png 2x, https://static.intercomassets.com/assets/oauth/primary@3x-788ed3c44d63a6aec3927285e920f542.png 3x"/></a>
```

```ruby
#!/usr/bin/env ruby
#
# This code snippet shows how to enable SSL in Sinatra+Thin.
#

require 'sinatra'
require 'thin'
require 'json'
require 'slim'

class MyThinBackend < ::Thin::Backends::TcpServer
  def initialize(host, port, options)
    super(host, port)
    @ssl = true
    @ssl_options = options
  end
end

configure do
  set :environment, :production
  set :bind, '0.0.0.0'
  # set :port, 443
  set :server, "thin"
  class << settings
    def server_settings
      {
          :backend          => MyThinBackend,
          :private_key_file => File.dirname(__FILE__) + "/pkey.pem",
          :cert_chain_file  => File.dirname(__FILE__) + "/cert.crt",
          :verify_peer      => false
      }
    end
  end
end

get '/' do
  File.read('intercom.html')
end

get '/home' do
  "Welcome Back"
end

get '/callback' do
  code = params[:code]
  state = params[:state]
  puts "CODE: #{code}"
  puts "STATE:#{state}"
  redirect '/home'
end
```

[The full code example can be found here.](https://github.com/intercom/oauth-setup-tutorial) You can copy the Intercom JS to a file, and reference it in a page where a user can click through to provide authorization. Then you will need to have a route for the Redirect URL you provided.

When you run your server and click through to authorize the user, you should see something similar outputted on the terminal:

```ruby
> ruby ssl_server.rb
== Sinatra (v1.4.7) has taken the stage on 4567 for production with backup from Thin
Thin web server (v1.6.4 codename Gob Bluth)
Maximum connections set to 1024
Listening on 0.0.0.0:4567, CTRL+C to stop
[05/May/2016:10:15:44 +0000] "GET / HTTP/1.1" 200 512 0.0036
CODE: XXXXXXXXXXXXXXXXXXXXXXXXX
STATE:example
89.101.228.226 - - [05/May/2016:10:15:49 +0000] "GET /callback?code=XXXXXXXXXXXXXXXXXX&state=example HTTP/1.1" 302 - 0.0008
[05/May/2016:10:15:49 +0000] "GET /home HTTP/1.1" 200 12 0.0005
```

## Trade your authorization code for an access token

We can now exchange the code for the Access Token with a POST request to the Intercom Eagle endpoint.

For the simplified purposes of understanding the flow, add the following code to you callback route:

```ruby
# We can do a Post now to get the access token
  uri = URI.parse("https://api.intercom.io/auth/eagle/token")
  response = Net::HTTP.post_form(uri, {"code" => params[:code],
                                       "client_id" => "XXXXXXXXXXXX",
                                       "client_secret" => "YYYYYYYYYYYYY"})

  # Break Up the response and print out the Access Token
  rsp = JSON.parse(response.body)
  puts "ACCESS TOKEN: #{rsp["token"]}"
```

```ruby
#!/usr/bin/env ruby
#
# This code snippet shows how to enable SSL in Sinatra+Thin.
#

require 'sinatra'
require 'thin'
require 'json'
require 'slim'
require 'json'
require "net/http"
require "uri"

class MyThinBackend < ::Thin::Backends::TcpServer
  def initialize(host, port, options)
    super(host, port)
    @ssl = true
    @ssl_options = options
  end
end

configure do
  set :environment, :production
  set :bind, '0.0.0.0'
  #:set :port, 443
  set :server, "thin"
  class << settings
    def server_settings
      {
          :backend          => MyThinBackend,
          :private_key_file => File.dirname(__FILE__) + "/pkey.pem",
          :cert_chain_file  => File.dirname(__FILE__) + "/cert.crt",
          :verify_peer      => false
      }
    end
  end
end

get '/' do
  File.read('intercom.html')
end

get '/home' do
  "Welcome Back"
end

get '/callback' do
  #Get the Code passed back to our redirect callback
  @code = params[:code]
  @state = params[:state]
  puts "CODE: #{@code}"
  puts "STATE:#{@state}"

  #We can do a Post now to get the access token
  uri = URI.parse("https://api.intercom.io/auth/eagle/token")
  response = Net::HTTP.post_form(uri, {"code" => params[:code],
                                       "client_id" => "XXXXXXXXXXXXX",
                                       "client_secret" => "YYYYYYYYYYYY"})

  #Break Up the response and print out the Access Token
  rsp = JSON.parse(response.body)
  puts "ACCESS TOKEN: #{rsp["token"]}"
  redirect '/home'
end

post '/callback' do
 push = JSON.parse(request.body.read)
 puts "I got some JSON: #{push.inspect}"
end
```

When you run your server and click through to authorize the user, you should now also see the "Access Token" output on the terminal:

```ruby
ruby ssl_server.rb
== Sinatra (v1.4.7) has taken the stage on 4567 for production with backup from Thin
Thin web server (v1.6.4 codename Gob Bluth)
Maximum connections set to 1024
Listening on 0.0.0.0:4567, CTRL+C to stop
[05/May/2016:10:45:32 +0000] "GET / HTTP/1.1" 200 512 0.0041
CODE: XXXXXXXXXXXXXXXXXXXXX
STATE:example
ACCESS TOKEN: YYYYYYYYYYYYYYYYYYYYYYYYYY
[05/May/2016:10:45:36 +0000] "GET /callback?code=XXXXXXXXXXXXXXXXXXXX&state=example HTTP/1.1" 302 - 0.7180
[05/May/2016:10:45:36 +0000] "GET /home HTTP/1.1" 200 12 0.0004
```