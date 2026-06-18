# How To Make REST API Requests in PowerShell

In this quick guide, we'll walk through the utilities necessary to make an HTTP request to Twilio's API, which is secured with HTTP basic authentication. We go over `Invoke-WebRequest` and finish by sending an outgoing SMS message.

[PowerShell](https://msdn.microsoft.com/en-us/powershell/mt173057.aspx) allows developers to write command line scripts using the full power of the .NET framework. However, some tasks you may be used to performing in \*nix environments, [like making an authenticated HTTP request with curl](/docs/messaging/quickstart), are not as straightforward.

```powershell
# Pull in Twilio account info, previously set as environment variables
$sid = $env:TWILIO_ACCOUNT_SID
$token = $env:TWILIO_AUTH_TOKEN
$number = $env:TWILIO_NUMBER

# Twilio API endpoint and POST params
$url = "https://api.twilio.com/2010-04-01/Accounts/$sid/Messages.json"
$params = @{ To = "+15558675309"; From = $number; Body = "Hello from PowerShell" }

# Create a credential object for HTTP basic auth
$p = $token | ConvertTo-SecureString -asPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential($sid, $p)

# Make API request, selecting JSON properties from the response
Invoke-WebRequest $url -Method Post -Credential $credential -Body $params -UseBasicParsing |
ConvertFrom-Json | Select sid, body
```

Let's break down the moving parts of this script.

## Export System Environment Variables

The first bit you'll need to do is export your Twilio account credentials and phone number, which you'll need to [send an outbound SMS](/docs/messaging/quickstart). Your account SID and auth token can be found [on your Console dashboard](/console), and you can use one of your existing phone numbers (or buy one to use) [in the console as well](/console/phone-numbers/incoming).

There are a number of ways to configure system environment variables on Windows, but you can set user-level environment variables in PowerShell with the following commands. Replace the strings below with the relevant values from your account.

```powershell
[Environment]::SetEnvironmentVariable("TWILIO_ACCOUNT_SID", "your_account_sid", "User")
[Environment]::SetEnvironmentVariable("TWILIO_AUTH_TOKEN", "your_auth_token", "User")
[Environment]::SetEnvironmentVariable("TWILIO_NUMBER", "+16518675309", "User")
```

In the example script at the beginning of the article, we access these variables through the `$env` variable.

```powershell
# Pull in Twilio account info, previously set as environment variables
$sid = $env:TWILIO_ACCOUNT_SID
$token = $env:TWILIO_AUTH_TOKEN
$number = $env:TWILIO_NUMBER
```

## Configure REST API Endpoint and Credentials

After exporting our Twilio account info, we need to configure a URL for the API endpoint we want to hit.

```powershell
$url = "https://api.twilio.com/2010-04-01/Accounts/$sid/Messages.json"
```

We substitute a variable that holds our account SID, which is also necessary for the API URL. We append the `.json` extension to the URL to get the response back in JSON format.

Next, we create a [hash table](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_hash_tables?view=powershell-6#creating-hash-tables) with the `POST` parameters we need to [send with our request](/docs/messaging/quickstart).

```powershell
$params = @{ To = "+15558675309"; From = $number; Body = "Hello from PowerShell" }
```

What are those parameters for?

* `To`: The phone number you want to send the SMS to
* `From`: A Twilio-powered [phone number](/console/phone-numbers/incoming) the SMS message will come from
* `Body`: The actual text of the outbound message

Now comes a slightly wonky bit we need to do to pass our HTTP basic auth credentials to Twilio in this API request. We need to create a [PSCredential](https://msdn.microsoft.com/en-us/library/system.management.automation.pscredential\(v=vs.85\).aspx) to pass into the `Invoke-WebRequest` command.

```powershell
$p = $token | ConvertTo-SecureString -asPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential($sid, $p)
```

## Make an Authenticated API Request in PowerShell

Now that we have all our configuration ready, we use the [`Invoke-WebRequest`](https://technet.microsoft.com/en-us/library/hh849901.aspx) command to actually send the SMS. Don't forget the `-UseBasicParsing` option to prevent creating a DOM from the results, and to avoid errors on systems without Internet Explorer installed (server core, and Windows 10 systems only running Edge browsers).

We also use the [`ConvertFrom-Json`](https://technet.microsoft.com/en-us/library/hh849898.aspx) command to parse the JSON response from the Twilio API, and [`Select`](https://technet.microsoft.com/en-us/library/hh849895.aspx) command to extract properties from the resulting object.

```powershell
Invoke-WebRequest $url -Method Post -Credential $credential -Body $params -UseBasicParsing |
ConvertFrom-Json | Select sid, body
```

And there we have it! Let's run that whole thing back one more time.

```powershell
# Pull in Twilio account info, previously set as environment variables
$sid = $env:TWILIO_ACCOUNT_SID
$token = $env:TWILIO_AUTH_TOKEN
$number = $env:TWILIO_NUMBER

# Twilio API endpoint and POST params
$url = "https://api.twilio.com/2010-04-01/Accounts/$sid/Messages.json"
$params = @{ To = "+15558675309"; From = $number; Body = "Hello from PowerShell" }

# Create a credential object for HTTP basic auth
$p = $token | ConvertTo-SecureString -asPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential($sid, $p)

# Make API request, selecting JSON properties from the response
Invoke-WebRequest $url -Method Post -Credential $credential -Body $params -UseBasicParsing |
ConvertFrom-Json | Select sid, body
```

## PowerShell Text Messages, Oh My

With this code, we can make a REST API request, authenticated with HTTP basic, from PowerShell scripts. If you've run it, you've seen the interesting conclusion - a nice outgoing text message without leaving the comfort of PS.

Want to try something more complex? Try [Twilio's Documentation](/docs) landing page to see our extensive collection of guides, tutorials, and quickstarts.
