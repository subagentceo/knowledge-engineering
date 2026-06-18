# Secure your Twilio Credentials

To secure your Twilio Account SID and Authentication token, store them in environment variables. These variables remain local to your development machine and your app can access them. Using environment variables keeps credentials separate from your code and other locations that could result in unauthorized access to Twilio.

> \[!WARNING]
>
> Never upload your credentials in plain text to a Git repository. Never write your credentials into your application code.

## macOS and Linux

To store your credentials on UNIX-like operating systems like macOS and Linux, set environment variables.

1. Create one environment variable for your account SID and one for your authentication token. Store both in a file titled `.env`.

   ```bash
   echo "export TWILIO_ACCOUNT_SID='ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'" > .env
   echo "export TWILIO_AUTH_TOKEN='your_auth_token'" >> .env
   ```
2. Execute the `.env` as a command in your existing process.

   ```bash
   source ./.env
   ```
3. Add the `.env` file to your `.gitignore` file.
   ```bash
   echo ".env" >> .gitignore
   ```

## Microsoft Windows

To store your credentials in environment variables on Microsoft Windows, you have three options: use the command prompt (`cmd.exe`), PowerShell, or the Windows UI.

## Command prompt

To set these environment variables as permanent settings, use the `setx` command through the Windows command prompt.

```cmd
setx TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
setx TWILIO_AUTH_TOKEN=your_auth_token
```

## PowerShell

To set these environment variables as permanent settings, use the `[Environment]::SetEnvironmentVariable` command through Windows PowerShell.

```powershell
[Environment]::SetEnvironmentVariable('TWILIO_ACCOUNT_SID', 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'User')
[Environment]::SetEnvironmentVariable('TWILIO_AUTH_TOKEN', 'your_auth_token', 'User')
```

## Windows UI

To set these environment variables as permanent settings, add the variables through the Systems control panel.

1. Press **Windows key** + **R**.
2. Type `sysadm.cpl` then press **OK**. This opens the Control Panel.
3. Click **System**.
4. Click **Advanced System Settings**.
5. Click the **Advanced** tab.
6. Click **Environment Variables...**. This opens the **Environment Variables** dialog box.
7. Under **User variables for \<your name>**, click **New...** This opens the **New User Variable** dialog box.
8. Type `TWILIO_ACCOUNT_SID` in the **Variable name** box.
9. Type or paste your account SID in the **Variable value** box.
10. Click **OK** to close the **New User Variable** dialog box.
11. Click **New...** again.
12. Type `TWILIO_AUTH_TOKEN` in the **Variable name** box.
13. Type or paste your authentication token in the **Variable value** box.
14. Click **OK** to close the **New User Variable** dialog box.
15. Click **OK** to close the **Environment Variables** dialog box.

## Cloud providers

Most cloud providers provide the means for securing environment variables for your application.

* [Heroku](https://devcenter.heroku.com/articles/config-vars)
* [Azure Websites](https://docs.microsoft.com/en-us/azure/app-service-web/web-sites-configure#application-settings)
* [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings#application-settings)
* [AWS](https://docs.aws.amazon.com/lambda/latest/dg/env_variables.html)
* [Dockerfile](https://docs.docker.com/engine/reference/builder/#/env)
* [Docker Run](https://docs.docker.com/engine/reference/run/#/env-environment-variables)
* [Google Cloud](https://github.com/GoogleCloudPlatform/berglas#berglas)

## Load credentials from environment variables

After you store your credentials in environment variables, access from your apps using their variable name. To display the proper code for using environment variables, choose your programming language in the following example:

Load credentials from environment variables

```js
// Download the Node helper library from twilio.com/docs/node/install
// These are your accountSid and authToken from https://www.twilio.com/console
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

// Make API calls here...
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os

from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/user/account
# To set up environmental variables, see http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)

# Make API calls here...
```

```cs
// Download the twilio-csharp library from twilio.com/docs/libraries/csharp
using System;
using Twilio;

public class Example
{
  public static void Main(string[] args)
  {
    // Find your Account SID and Auth Token at twilio.com/console
    var accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
    var authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

    TwilioClient.Init(accountSid, authToken);

    // Make API calls here...
  }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.twilio.Twilio;

public class Example {
  // Get your Account SID and Auth Token from https://twilio.com/console
  // To set up environment variables, see http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

  public static void main(String[] args) {
    Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

    // Make API calls here...
  }
}
```

```php
<?php
// Get the PHP helper library from https://twilio.com/docs/libraries/php
require_once '/path/to/vendor/autoload.php'; // Loads the library

use Twilio\Rest\Client;

// Your Account Sid and Auth Token from twilio.com/user/account
// To set up environmental variables, see http://twil.io/secure
$sid = getenv('TWILIO_ACCOUNT_SID');
$token = getenv('TWILIO_AUTH_TOKEN');

$client = new Client($sid, $token);

// Make API calls here...
```

```rb
# Get twilio-ruby from twilio.com/docs/ruby/install
require 'twilio-ruby'

# Get your Account SID and Auth Token from twilio.com/console
# To set up environmental variables, see http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

# Make API calls here...
```

```bash
curl -XGET https://api.twilio.com/[DESIRED_API_PATH] \
    -u ${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}
```
