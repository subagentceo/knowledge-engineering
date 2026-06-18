# Email API Quickstart: How to Send Email with Python

In this quickstart, you'll learn how to send your first email using the [Twilio SendGrid Mail Send API](/docs/sendgrid/api-reference/mail-send/mail-send) and [Python](https://www.python.org/).

## Prerequisites

Be sure to perform the following prerequisites to complete this tutorial. You can skip ahead if you've already completed these tasks.

1. Sign up for a SendGrid account.
2. Enable Two-factor authentication.
3. Create and store a SendGrid API Key with **Mail Send** > **Full Access** permissions.
4. Complete Domain Authentication.
5. Install Python.

[Skip the prerequisites](#starting-project)

### Sign up for a SendGrid account

When you sign up for a [SendGrid account](https://signup.sendgrid.com/), you can start a [free trial](/docs/sendgrid/ui/account-and-settings/upgrading-your-plan#free-trial)that allows you to send up to 100 emails per day for 60 days. After the 60-day trial period ends, you'll need to [upgrade your plan](/docs/sendgrid/ui/account-and-settings/upgrading-your-plan) to continue sending emails. For more plan options, see [SendGrid pricing](https://sendgrid.com/pricing/).

### Enable Two-factor authentication

Twilio SendGrid requires customers to enable Two-factor authentication (2FA). You can enable 2FA with SMS or by using the [Authy](https://authy.com/) app. See the [2FA section of our authentication documentation](/docs/sendgrid/for-developers/sending-email/authentication#two-factor-authentication) for instructions.

### Create and store a SendGrid API key

Unlike a username and password — credentials that allow access to your full account — an API key is authorized to perform a limited scope of actions. If your API key is compromised, you can also cycle it (delete and create another) without changing your other account credentials.

Visit our [API Key documentation](/docs/sendgrid/ui/account-and-settings/api-keys) for instructions on creating an API key and [storing an API key in an environment variable](/docs/sendgrid/ui/account-and-settings/api-keys#storing-an-api-key-in-an-environment-variable). To complete this tutorial, you can create a Restricted Access API key with **Mail Send** > **Full Access** permissions only, which will allow you to send email and schedule emails to be sent later. You can edit the permissions assigned to an API key later to work with additional services.

Once your API key is assigned to an environment variable — this quickstart uses `SENDGRID_API_KEY` — you can proceed to the next step.

```shell
export SENDGRID_API_KEY=<Your API Key>
```

### Verify your Sender Identity

To ensure our customers maintain the best possible sender reputations and to uphold legitimate sending behavior, we require customers to verify their [Sender Identities](/docs/sendgrid/for-developers/sending-email/sender-identity/) by completing [Domain Authentication](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication/). A Sender Identity represents your 'From' email address—the address your recipients see as the sender of your emails.

> \[!NOTE]
>
> To get started sending emails with the Python, you may be able to skip Domain Authentication and begin by completing [Single Sender Verification](/docs/sendgrid/ui/sending-email/sender-verification). Single Sender Verification is recommended for testing only. Some email providers have [DMARC](/docs/sendgrid/glossary/dmarc) policies that restrict email from being delivered using their domains. For the best experience, please complete Domain Authentication. Domain Authentication is also required to upgrade from a free account.

### Python

Before installing Python and sending emails, you can see if you already have a version on your machine.

> \[!NOTE]
>
> The Twilio SendGrid Python SDK supports Python 2.7, 3.5, 3.6, 3.7, and 3.8.

#### Python version check

Check your Python version by opening your terminal (also known as a command line or console) and typing the following command.

```shell
python --version
```

If you have Python installed, the terminal should print something like the following output.

```shell
Python 3.8.5
```

> \[!NOTE]
>
> Though the SendGrid SDK supports Python back to version 2.7, we recommend using a 3.x version now that Python 2 has reached end-of-life status.
>
> It is possible to have multiple versions of Python on your computer. Some operating systems come with a version of Python already installed. If you run `python --version` and receive `Python 2.7.x` after installing Python 3, try running `python3 --version` to see which 3.x version of Python you have installed. This tutorial will use the `python` command, assuming you are working with Python 3. If you have not set up Python 3 in a virtual environment, you may need to run the command `python3` instead.
>
> For more about running multiple versions of Python, see ["Virtual Environments and Packages"](https://docs.python.org/3/tutorial/venv.html) in the Python documentation.

#### Install Python

If you do not already have a version of Python installed, visit the [Python website](https://www.python.org/downloads) to download and install a version appropriate for your operating system.

## Starting the project \[#starting-project]

Using a [Twilio SendGrid SDK](https://github.com/sendgrid/sendgrid-python) is the fastest way to deliver your first email.

Start by creating a project folder for this app. You can name the project anything you like. We use `sg_quickstart` in the following examples.

```shell
mkdir sg_quickstart
```

Next, navigate into the sg\_quickstart directory where you will complete the rest of the tutorial.

```shell
cd sg_quickstart
```

### Initialize your project

The [pip](https://pypi.org/project/pip/) package manager was included when you installed Python. You can use pip to install the Twilio SendGrid SDK and save it as a project dependency. If you want to verify that pip is installed, you can type the following into the terminal.

```shell
pip --version
```

The terminal should print something like the following output.

```shell
pip 20.1.1 from /usr/locallib/python3.8/site-packages/pip (python 3.8)
```

> \[!NOTE]
>
> If you do not have a version of pip installed, you can download and install it using the [pip installation instructions on python.org](https://packaging.python.org/tutorials/installing-packages/).

### Install the SDK

To install the Twilio SendGrid SDK, type the following command into the terminal.

```shell
pip install sendgrid
```

The terminal should print something like.

```shell
Collecting sendgrid
  Using cached sendgrid-6.4.6-py3-none-any.whl (73 kB)
Requirement already satisfied: python-http-client>=3.2.1 in /usr/local/lib/python3.8/site-packages (from sendgrid) (3.3.1)
Requirement already satisfied: starkbank-ecdsa>=1.0.0 in /usr/local/lib/python3.8/site-packages (from sendgrid) (1.0.0)
Installing collected packages: sendgrid
Successfully installed sendgrid-6.4.6
```

## How to send an API email with Python

You're now ready to write some code and send emails with Python. First, create a file in your project directory. You can use `app.py`.

### Complete code block

The following Python block contains all the code needed to successfully deliver a message with the SendGrid Mail Send API. You can copy this code, modify the `from_email` and `to_email` variables, and run the code if you like. We'll break down each piece of this code in the following sections.

```python
import sendgrid
import os
from sendgrid.helpers.mail import Mail, Email, To, Content

sg = sendgrid.SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
from_email = Email("test@example.com")  # Change to your verified sender
to_email = To("test@example.com")  # Change to your recipient
subject = "Sending with SendGrid is Fun"
content = Content("text/plain", "and easy to do anywhere, even with Python")
mail = Mail(from_email, to_email, subject, content)

# Get a JSON-ready representation of the Mail object
mail_json = mail.get()

# Send an HTTP POST request to /mail/send
response = sg.client.mail.send.post(request_body=mail_json)
print(response.status_code)
print(response.headers)
```

### Build your API call

Your API call must have the following components:

* A host (the host for Web API v3 requests is always `https://api.sendgrid.com/v3/`)
* An API key passed in an Authorization Header
* A request (when submitting data to a resource via `POST` or `PUT`, you must submit your request body in JSON format)

In your `app.py` file, import the SendGrid SDK. The library will handle setting the Host, `https://api.sendgrid.com/v3/`, for you.

```python
import sendgrid
```

Next, use the API key you set up earlier. Remember, the API key is stored in an environment variable, so you can use the `os.environ.get()` method to access it. This means we also need to import Python's os library.

```python
import os
```

Assign the key to a variable named `sg` using the SDK's `SendGridAPIClient()` method. The SDK will pass your key to the v3 API in an Authorization header using Bearer token authentication.

```python
sg = sendgrid.SendGridAPIClient(api_key = os.environ.get('SENDGRID_API_KEY'))
```

Now you're ready to set up the `from_email`, `to_email`, `subject`, and message body `content`. These values are passed to the API in a ["personalizations"](/docs/sendgrid/for-developers/sending-email/personalizations/) object when using the v3 Mail Send API. You can assign each of these values to variables, and the SendGrid library will handle creating a personalizations object for you.

First, import the library's `Mail`, `Email`, `To`, and `Content` classes.

```python
from sendgrid.helpers.mail import Mail, Email, To, Content
```

With the helpers imported, define and assign values for `from_email`, `to_email`, `subject`, and `content` variables. Assigning an email address like `from_email = "sender@example.com"` will work. However, the constructors imported in the previous step allow you to pass data to them to be sure your final message is formatted properly. Be sure to assign the `to_email` to an address with an inbox you can access.

Note that the `Content()` helper takes two arguments: the content type and the content itself. You have two options for the content type: `text/plain` or `text/html`. The second parameter will take the plain text or HTML content you wish to send.

```python
from_email = Email("test@example.com")  # Change to your verified sender
to_email = To("test@example.com")  # Change to your recipient
subject = "Sending with SendGrid is Fun"
content = Content("text/plain", "and easy to do anywhere, even with Python")
```

To properly construct the message, pass each of the previous variables into the SendGrid library's Mail constructor. You can assign this to a variable named `mail`. You can then use the Mail constructor's `get()` method to get a JSON-ready representation of the Mail object.

```python
mail = Mail(from_email, to_email, subject, content)

# Get a JSON-ready representation of the Mail object
mail_json = mail.get()
```

Lastly, you need to make a request to the SendGrid Mail Send API to deliver your message.

The SDK uses SendGrid's [python-http-client](https://github.com/sendgrid/python-http-client) library to construct the request URL by chaining together portions of your desired path. The path to the SendGrid v3 Mail Send endpoint is `https://api.sendgrid.com/v3/mail/send`. The SDK sets the client for you, so the `https://api.sendgrid.com/v3` portion is taken care of by typing `sg.client`. The next parts of the path are `/mail` and `/send`. You can chain the words `mail` and `send` onto `client` to build the rest of the URL.

With the URL built, python-http-client then allows you to chain on the type of HTTP request you wish to make with a method matching the name of the HTTP verb appropriate for your desired endpoint. To send a message, you should make an HTTP `POST` request, so you can use `post()`. The `post()` method takes a `request_body`, which you should set to the JSON version of your message (remember, this JSON-ready version is stored in the `mail_json` variable). You can assign this full call to a variable named `response` and print the response status code and headers.

```python
# Send an HTTP POST request to /mail/send
response = sg.client.mail.send.post(request_body=mail_json)
print(response.status_code)
print(response.headers)
```

With all this code in place, you can run your `app.py` file with Python to send the email.

```shell
python app.py
```

If you receive a [`202` status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202) printed to the console, your message was sent successfully. Check the inbox of the `"to_email"` address, and you should see your demo message.

If you don't see the email, you may need to check your spam folder.

### Troubleshooting

If you receive an error message, you can reference our [response message documentation](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/responses#status-codes) for clues about what may have gone wrong.

#### API Response messages

All responses are returned in JSON format. We specify this by sending the `Content-Type` header. The Web API v3 provides a selection of [response codes](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/responses#status-codes), [content-type headers](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/responses#content-type-header), and [pagination](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/responses#pagination) options to help you interpret the responses to your API requests.

> \[!NOTE]
>
> Get additional onboarding support to send better emails with Python. Save time, increase the quality of your sending, and feel confident you are set up for long-term success with [SendGrid Onboarding Services](https://sendgrid.com/marketing/onboarding-services-request/?utm_source=docs).

## Next Steps

This is just the beginning of what you can do with our APIs. To learn more, check the resources below.

* [API Reference](/docs/sendgrid/api-reference/)
* [Sending Email with Dynamic Transactional Templates](/docs/sendgrid/ui/sending-email/how-to-send-an-email-with-dynamic-templates)
* [Getting Started with the Event Webhook](/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook/)
* [The Email Activity Feed](/docs/sendgrid/ui/analytics-and-reporting/email-activity-feed/)
* [Sender Authentication](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication/)
* [Twilio SendGrid SDK for Python](https://github.com/sendgrid/sendgrid-python)
