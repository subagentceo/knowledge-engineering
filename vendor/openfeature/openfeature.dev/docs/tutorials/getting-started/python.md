# Getting Started with the OpenFeature Python SDK

## Introduction​

This walk-through teaches you the basics of using OpenFeature with Python. You'll learn how to:

*   Install the Python SDK
*   Install and configure a provider
*   Perform basic feature flagging

## Requirements​

This walk-through assumes that:

*   You have a basic understanding of Python and Flask.
*   You have Flask 3.x and Python 3.10 or later.
*   You have Docker installed and running on the host system. The latest version of Docker can be found here.

> **NOTE:** If you don't have docker installed, check the available options to install Flagd here.

## Walk-through​

### Step 1: Create a minimal flask application​

To get started, create a new folder, bootstrap the project, and install the dependencies. This can be done by running the following commands.

```
mkdir openfeature-python-introcd openfeature-python-intropip install Flask
```

### Step 2: Create a Flask app​

Create a new file named `app.py` inside openfeature-python-intro directory and include the following code.

```
  from flask import Flask  app = Flask(__name__)  @app.route("/")  def index():      return "Flask Server"
```

### Step 3: Add the OpenFeature SDK​

Let's install the OpenFeature SDK using the following commands.

```
pip install typing-extensionspip install openfeature-sdkpip install openfeature-provider-flagd
```

Update `app.py` to import the SDK.

```
  from openfeature import api  from openfeature.contrib.provider.flagd import FlagdProvider
```

Once you've imported `OpenFeature`, a new client can be created using the `FlagdProvider`.

```
  api.set_provider(FlagdProvider())  client = api.get_client()
```

The client can now be used to get a feature flag value. In this case, we'll get a `boolean` value using the `welcome-message` flag key and fallback value, which is returned if there's abnormal behavior using the `client.get_boolean_value()` method.

```
@app.route("/")def index():    show_welcome_message = client.get_boolean_value("welcome-message", False)    if show_welcome_message:        return "Flask + OpenFeature Server"    return "Flask Server"
```

### Step 4: Run the application​

Let's start the app and see it in action, use the final code below.

```
from flask import Flaskfrom openfeature import apifrom openfeature.contrib.provider.flagd import FlagdProviderapp = Flask(__name__)api.set_provider(FlagdProvider())client = api.get_client()@app.route("/")def index():    show_welcome_message = client.get_boolean_value("welcome-message", False)    if show_welcome_message:        return "Flask + OpenFeature Server"    return "Flask Server"
```

Run the following command to start the server.

```
flask run
```

Open your favorite browser and navigate to http://127.0.0.1:5000. If all goes as planned, you should see "Flask Server".

"Why I'm I seeing that value?", you may ask. Well, it's because a provider hasn't been configured yet. Without a provider to actually evaluate flags, OpenFeature will return the default value. In the next step, you'll learn how to add a provider.

> NOTE: You should stop the app by using the keyboard short `ctrl + c` before moving on to the next step.

### Step 5: Configure a provider (flagd)​

Providers are an important concept in OpenFeature because they are responsible for the flag evaluation itself. As we saw in the previous step, OpenFeature without a provider always returns the default value. If we want to actually perform feature flagging, we'll need to register a provider.

Create a new file named `flags.flagd.json` and add the following JSON. Notice that there's a flag called `welcome-message` which matches the flag key referenced earlier. The `welcome-message` flag has `on` and `off` variants that return `true` and `false` respectively. The state property controls whether the feature flag is active or not. Finally, the defaultVariant property controls the variant that should be returned. In this case, the defaultVariant is `off`, therefore the value `false` would be returned.

```
{  "flags": {    "welcome-message": {      "variants": {        "on": true,        "off": false      },      "state": "ENABLED",      "defaultVariant": "off"    }  }}
```

> NOTE: This configuration is specific for flagd and varies across providers.

With the flagd configuration in place, start flagd service with the following docker command.

> NOTE: On Windows WSL is required both for running docker and to store the file. This is a limitation of Docker (https://github.com/docker/for-win/issues/8479)

```
docker run -p 8013:8013 -v $(pwd)/:/etc/flagd/ -it ghcr.io/open-feature/flagd:latest start --uri file:/etc/flagd/flags.flagd.json
```

Flagd can be run as a standalone binary or Kubernetes Operator as well. If you don't have docker installed, get and install the Flagd binary. With the flagd configuration in place, start flagd service with the following command.

```
flagd start -f file:flags.flagd.json
```

### Step 6: Rerun the application​

Now that everything is in place, let's start the app again.

```
flask run
```

Open your browser and navigate to http://127.0.0.1:5000 should show the same value as before. This difference is now the feature flag value can be changed at runtime!

Let's change the feature flag in our `flags.flagd.json`, making `defaultVariant` to `on`

```
{  "flags": {    "welcome-message": {      "variants": {        "on": true,        "off": false      },      "state": "ENABLED",      "defaultVariant": "off"      "defaultVariant": "on"    }  }}
```

Save the changes to `flags.flagd.json` and refresh the browser tab. You should now be greeted with `Flask + OpenFeature Server`.

## Conclusion​

This walk-through introduced you to the OpenFeature Python SDK. It covered how a provider can be configured to perform the flag evaluation and introduced basic feature flagging concepts. It also showcased how feature flags can be updated at runtime, without requiring a redeployment.