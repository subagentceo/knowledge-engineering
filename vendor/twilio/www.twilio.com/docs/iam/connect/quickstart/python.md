# Twilio Connect Python Quickstart

## Overview

Twilio Connect allows developers to obtain authorization to make
calls, send text messages, purchase phone numbers, read access logs and perform
other API functions on behalf of another Twilio account holder.

As an example, imagine you want to access the Twilio account of a user of
your web application to provide in-depth analytics of their Twilio account
activity. In this quickstart we'll solve this problem by creating your first
Twilio Connect App, placing the "Connect" button on your website so users can
authorize your app to access their Twilio account data and make API requests
against their account.

## Create your first Twilio Connect app

To create your first Connect App, log in to the Twilio Console and go to **Settings** > **Connect applications**. Click **Create a new connect app** and fill in the top section with the name of your application and your company information.

Next, assign an Authorize URL to your Connect application. The Authorize
URL is the URL that Twilio will redirect the user's browser to after they have
authorized your application to access their Twilio account. Later on in the
quickstart we'll demonstrate how the Authorize URL is used.

Lastly, select the access rights your Connect app requires on the user's
account. For this example we will access call logs for analytics, so
we'll choose "Read all account data".

Here's what our sample Connect application looks like:

![Rossum app settings with endpoints and permissions, including a possum .](https://docs-resources.prod.twilio.com/7e3c81234f34067cf6ef1e797c0eeaaa7bae9929fe0c031f456f9e9049df4437.png)

Click **Save** and you're done!

## Place the Connect button on your website

![Twilio logo with red Connect button.](https://docs-resources.prod.twilio.com/c20cb3f374cb994eae7967ddb213e8f08fdce6380bfd173c0c05abfce0882dd4.png)

The Connect button is where your customers will start the process of
authorizing your Connect App to access their Twilio account.

To get the Connect button code, click **Generate connect button HTML** on your
Connect App details page. Copy the generated code and paste it into the HTML
of your website where you would like the button to appear.

## Test the Authorization workflow

With the Twilio Connect button now on your website, browse to the page
where you placed the HTML and click the Connect button. Verify that the
information displayed on the authorization screen is correct.

After completing the app authorization process, you are redirected to the
Authorize URL you specified when creating your Connect App. Appended to that
URL is an Account Sid URL parameter with a value that looks like this:

```bash
http://www.example.com/twilio/authorize?AccountSid=AC12345
   Your Connect App's Authorize URL       Customer's SID

```

Your application should extract the AccountSid value from the URL and
associate it with the user's account within your application. After extracting
the AccountSid, we recommend that you redirect the user to another page within
your app so the AccountSid isn't hanging around. Let's show an example using
Python.

> \[!WARNING]
>
> This tutorial assumes you can run **Flask** on a server available over the Internet, and that you have the **twilio-python** library installed. If not, see [our guide to setting up your local development environment](/docs/usage/tutorials/how-to-set-up-your-python-and-flask-development-environment).

```python
from flask import Flask, redirect, request
    app = Flask(__name__)
    @app.route('/authorize-callback', methods=['GET', 'POST'])
    def authorize_callback():
        account_sid = request.values.get('AccountSid', None)

        # Here you need to add code that will store 
        # the account sid in your database, so you can find it later. 

        # Finally redirect
        return redirect('http://example.com/myapp')

    if __name__ == "__main__":
        app.run(debug=True)
```

## Make an authorized request

With the user's Account Sid in hand you can now request data from their
account via the Twilio REST API. A request to retrieve data from a user's
account is nearly identical to a request made against your own account, with
one key difference. Instead of authenticating with your own AccountSid, you
authenticate with the Account Sid retrieved during the authorization process
and your account's Auth Token.

Here is a request to retrieve call logs from an account using the
[Python SDK](https://github.com/twilio/twilio-python). Pay special attention to line 4 where the customer's Account Sid is specified instead of your own:

```python
from twilio.rest import Client

# The customer's AccountSid
account = "ACXXXXXXXXXXXXXXXXX"

# Your own AuthToken
token = "YYYYYYYYYYYYYYYYYY"

client = Client(account, token)

# Request the call logs for the customer's account, and print them.
for call in client.api.account.calls.list(limit=100):
    print("Call sid " + call.sid + ": " + str(call.duration) + " seconds.")
```

## You're Done! Now What?

Retrieving call logs on behalf of your customers is just the
start of what you can accomplish with Twilio Connect. Visit
the [complete Connect documentation](/docs/iam/connect) and [best
practices](/docs/iam/connect#best-practices) to learn more about how to integrate
Connect's additional capabilities into your applications.
