# Set up your Python and Flask development environment

In this guide, you'll set up your Python and Flask development environment to build Twilio applications. You'll install Python, create virtual environments, install Flask and the Twilio SDK, and set up ngrok for webhook testing.

**Time to complete**: 30 minutes

## Prerequisites

This tutorial requires the following tools and understanding:

* Administrative access to your computer to install software
* A stable internet connection for downloading packages and dependencies
* Basic familiarity with using the command line or terminal
* A [Twilio account][] (free tier available)
* A [Twilio phone number][] (free trial numbers available)
* [Python 3.9 or later][]
* [ngrok][]

## Set up Python

Consult the [README][] for the latest supported Python version.

To check your Python version, open a terminal and run:

```bash
$ python --version
Python 3.9.0
```

On some systems, you might need to use `python3` instead of `python`:

```bash
$ python3 --version
Python 3.11.5
```

> \[!NOTE]
>
> On macOS, the `python` command might refer to Python 2, and `python3` refers to Python 3. Use `python3` when working with Python 3 on macOS.

## Install a text editor or IDE

Before you can start your Python project, you'll need an editor or integrated development environment (IDE) to write your code.

If you already have a code-writing tool of choice, you can use it for developing your Python application. If you're looking for something new, you might consider trying out a few options:

* [Visual Studio Code][] is another text editor that's free, easy to set up, and available on all platforms.
* [PyCharm][] is a fully integrated development environment (IDE) for Python. It takes longer to set up but comes with more helpful tools already installed.
* [Vim][] is a perennial favorite text editor among advanced users.

If you're new to programming, consider giving Sublime Text and PyCharm a try before you settle on your favorite.

## Create and activate a virtual environment

Virtual environments are useful because they keep each Python project's packages separate. This helps avoid problems when different projects need different versions of the same package. It also makes your code more reliable when developing and deploying.
Follow these steps to create and activate a virtual environment:

1. Create the `venv` module from the standard library.
2. Use the appropriate command to create a new virtual environment named `myproject`. On some systems, you might need to use `python3` instead of `python`:

   ```bash
   # Python 3.7+ (using python or python3 depending on your system)
   $ python -m venv myproject

   # Or
   $ python3 -m venv myproject
   ```
3. Activate the virtual environment using the following commands, depending on your operating system:

   ```bash
   # Activate the virtual environment (macOS and Linux)
   $ source myproject/bin/activate

   # Activate the virtual environment (Windows)
   $ myproject\Scripts\activate
   ```

## Install Flask and the Twilio Python SDK

You're almost ready to start writing your Flask web application. First, you need to install the Flask library and the Twilio Python SDK in your virtual environment.

1. Ensure your virtual environment is active.
2. Install Flask and the Twilio library using `pip`:

   ```bash
   $ pip install Flask-Twilio
   ```

   **Note**: If you're using Python 3 outside of a virtual environment, you might need to use `pip3` instead of `pip`.
3. After installing your dependencies, you might want to keep track of and control which versions you're using. Pip allows you to "freeze" your dependencies and record the versions in a file called `requirements.txt`. Create a requirements file with this command:

   ```bash
   $ pip freeze > requirements.txt
   ```

## Create a simple Flask application

You can test that your development environment is configured correctly by creating a simple Flask application. Follow these steps:

1. Create a new file named `app.py` and copy the following code into it:

   ```python
   from flask import Flask
   app = Flask(__name__)

   @app.route("/")
   def hello():
       return "Hello World!"

   if __name__ == "__main__":
       app.run()
   ```
2. Run your new Flask application with the command:

   ```bash
   cd myproject
   $ python app.py
   ```

   **Note**: On macOS and some Linux systems, you might need to use `python3` instead of `python`:

   ```bash
   cd myproject
   $ python3 app.py
   ```
3. Open `http://localhost:5000` in your browser. This will display the "Hello World!" response.

Most Twilio services use [webhooks][] to communicate with your application. When Twilio receives an incoming phone call, for example, it reaches out to a URL in your application for instructions on how to handle the call.

If you're using a virtual machine for your development environment, such as Vagrant, you might not be able to see your Flask application at the localhost hostname.

## Install ngrok

When you're building your Flask app locally, it's only accessible from your own computer. That means Twilio can't reach it from the internet to send requests or data.

ngrok is a helpful tool to solve this problem. Once started, it provides a unique URL on the `ngrok.io` domain which will forward incoming requests to your local development environment.

Once downloaded, make sure your Flask application is running, and then start ngrok using this command:

````bash
ngrok http 5000

Output resembles the following:

```bash
# !mark(7:8)
ngrok by @inconshreveable

Tunnel Status  online
Version        3.x.x
Region         us
Web Interface  http://127.0.0.1:4040
Forwarding     http://<random_subdomain>.ngrok.io -> http://localhost:5000
Forwarding     http://<random_subdomain>.ngrok.io -> http://localhost:5000

Connections    ttl     opn     rt1     rt5     p50     p90
               0       0       0.00    0.00    0.00    0.00
````

You should see a `Forwarding` line in your ngrok terminal output:

```bash
Forwarding http://<random_subdomain>.ngrok.io -> http://localhost:5000
```

Look at the `Forwarding` line to see your unique ngrok domain name (for example, `aaf29606.ngrok.io`), and then open that URL in your browser.

If everything's working correctly, your Flask application's `Hello World!` message will be displayed at your new ngrok URL.

Anytime you're working on your Twilio application and need a URL for a webhook, ngrok will be needed to get a publicly accessible URL like this one.

## Next steps

You've learned about `ngrok`, `pip`, and virtual environments, and now you're ready to build your Flask application. Learn more with the following resources:

### Twilio

* [SMS developer quickstart][]
* [WhatsApp Business Platform with Twilio quickstart][]
* [Programmable Voice quickstart][]
* [Email API Quickstart for Python][]

### Flask

* [Flask documentation][]
* [Full Stack Python - Flask][]

[Email API Quickstart for Python]: /docs/sendgrid/for-developers/sending-email/quickstart-python

[Flask documentation]: http://flask.pocoo.org/docs/latest

[Full Stack Python - Flask]: https://www.fullstackpython.com/flask.html

[ngrok]: https://ngrok.com/download

[Programmable Voice quickstart]: /docs/voice/quickstart/server

[PyCharm]: https://www.jetbrains.com/pycharm

[Python 3.9 or later]: https://www.python.org/downloads

[README]: https://www.twilio.com/docs/libraries/reference/twilio-python/9.7.1/README.html

[SMS developer quickstart]: /docs/messaging/quickstart

[Twilio account]: https://www.twilio.com/try-twilio

[Twilio phone number]: https://www.twilio.com/console/phone-numbers/incoming

[Vim]: https://www.vim.org

[Visual Studio Code]: https://code.visualstudio.com

[webhooks]: /docs/glossary/what-is-a-webhook

[WhatsApp Business Platform with Twilio quickstart]: /docs/whatsapp/quickstart
