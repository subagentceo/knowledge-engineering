# How to use ngrok with Windows and Visual Studio to test webhooks

Let's take a look at how a Windows developer building ASP.NET web apps can put ngrok to work. **[ngrok](https://ngrok.com/)** makes your local development machine securely accessible from the public Internet. Want to give your client a preview of the site you're working on? Do you need to debug a [webhook](https://en.wikipedia.org/wiki/Webhook) for [Twilio](/docs/usage/tutorials/how-to-set-up-your-csharp-and-asp-net-mvc-development-environment), [GitHub](https://developer.github.com/webhooks/), or another API provider? Use ngrok to get a public URL for your local web application.

## The ngrok express lane: ngrok Extensions for Visual Studio

The quickest way to get started with ngrok and Visual Studio is to use an [open source extension for Visual Studio](https://visualstudiogallery.msdn.microsoft.com/56a642ed-a5e0-4044-8735-740d36912c5e) that will start ngrok for any web applications that are part of the currently open solution. It will figure out the ports for you and fire up the necessary tunnels for your app(s).

![Visual Studio Tools menu with 'Start ngrok Tunnel' highlighted.](https://docs-resources.prod.twilio.com/f1bbb10f720857443516a3db668ce83309bc97681071d373df71e7fff13dd1e7.png)

Choose "Start ngrok Tunnel" from the Visual Studio "Tools" menu, ngrok will start, and you'll see your app's new public URL.

![Ngrok session online, forwarding to localhost:58821.](https://docs-resources.prod.twilio.com/7e1b064184ad6a4dc4240a5eee8a0f52309685014208658dfe8f57fd13fa97b3.png)

Here, ngrok gave us the URL of **[https://a9f03915.ngrok.io](https://a9f03915.ngrok.io)**. Make sure you've started your application in Visual Studio and then try to open that URL in your browser. It should load the app from your local development machine. Now, you have a URL you can give to anyone or use in a webhook configuration (like in the [Twilio console](/console)), and it will hit the app running on your machine. You can set breakpoints in your code and do pretty much anything you're used to when running your app locally.

You can leave ngrok running while you are working on your app. If you stop your app, ngrok can continue to run and will resume serving traffic to your app when you restart your app. If you do shut down ngrok, then you will be given a *new* URL when it restarts. This means if you've configured a webhook with your ngrok URL, you will need to update it each time you restart ngrok.

> \[!WARNING]
>
> Make sure your project is configured to *not* use SSL. ngrok cannot tunnel to an SSL-enabled host. In Visual Studio, make sure your "Enable SSL" option is turned *off* in the Debug tab of the App Properties.

## Installing ngrok on Windows

When you use the [Visual Studio extension](https://visualstudiogallery.msdn.microsoft.com/56a642ed-a5e0-4044-8735-740d36912c5e), it will automatically download and install ngrok for you. However, if you aren't using Visual Studio, you will need to install ngrok yourself.

### Use the Chocolatey Package Manager

If you use the [Chocolatey package manager](https://chocolatey.org/) (highly recommended), installation simply requires the following command from an elevated command prompt:

```sh
choco install ngrok.portable
```

This will install ngrok in your PATH so you can run it from any directory.

### Install Manually

Installing ngrok manually involves a few more steps:

1. [Download the ngrok ZIP file](https://ngrok.com/download)
2. Unzip the ngrok.exe file
3. Place the ngrok.exe in a folder of your choosing
4. Make sure the folder is in your [PATH environment variable](https://superuser.com/questions/284342/what-are-path-and-other-environment-variables-and-how-can-i-set-or-use-them)

### Test Your Installation

To test that ngrok is installed properly, open a *new* command window (command prompt or PowerShell) and run the following:

```sh
ngrok version
```

It should print a string like "ngrok version 2.x.x". If you get something like "'ngrok' is not recognized" it probably means you don't have the folder containing ngrok.exe in your PATH environment variable. You may also need to open a new command window.

Once you've got ngrok installed, it's time to make use of it with your Visual Studio projects.

## Using ngrok manually with a Visual Studio hosted ASP.NET application

### Starting ngrok from the command line

When you host an ASP.NET application with Visual Studio, it usually uses IIS Express but may use other web server software depending on what version of Visual Studio you are using and how you have your application configured. Regardless of the setup, there is one, easy command you need to run to create a new public tunnel to your app:

```sh
ngrok http -host-header="localhost:[port]" [port]
```

In order to know what port on which your app is running, run the app from Visual Studio. It will launch a web browser with your new app and you will see the URL in the address bar:

![Visual Studio browser showing localhost port 58821.](https://docs-resources.prod.twilio.com/c9eb842d53342fff5849dda247f32a447ab0328a6c26fd1f2e043394a96cb86b.png)

In this example, the port number is 58821, but you will find that Visual Studio assigns a random port number to each new ASP.NET project you create. Thankfully, it remains the same for the specific project you are working on.

For this example, then, the ngrok command would be:

```sh
ngrok http -host-header="localhost:58821" 58821
```

ngrok will start, and you'll see your app's new public URL.

![Ngrok session online, forwarding to localhost:58821.](https://docs-resources.prod.twilio.com/7e1b064184ad6a4dc4240a5eee8a0f52309685014208658dfe8f57fd13fa97b3.png)

Here, ngrok gave us the URL of **[https://a9f03915.ngrok.io](https://a9f03915.ngrok.io)**. Make sure you've started your application in Visual Studio and then try to open that URL in your browser. It should load the app from your local development machine. Now, you have a URL you can give to anyone or use in a webhook configuration (like in the [Twilio console](/console)), and it will hit the app running on your machine. You can set breakpoints in your code and do pretty much anything you're used to when running your app locally.

You can leave ngrok running while you are working on your app. If you stop your app, ngrok can continue to run and will resume serving traffic to your app when you restart your app. If you do shut down ngrok, then you will be given a *new* URL when it restarts. This means if you've configured a webhook with your ngrok URL, you will need to update it each time you restart ngrok.

## Use the same ngrok domain every time

ngrok offers [paid plans](https://ngrok.com/product#pricing) that let you use custom domains such as "my-cool-app.ngrok.io". You can use the domain each time you start up ngrok, so there's no need to update webhook configurations. When you get a paid plan, you'll be [given an authtoken](https://dashboard.ngrok.com/get-started) that you need to install. You only need to run the command once:

```sh
ngrok authtoken [yourtoken]
```

Then, [reserve your domain name](https://dashboard.ngrok.com/reserved) and add the **-subdomain** argument to the command line:

```sh
ngrok http -host-header="localhost:58821" -subdomain my-cool-app 58821
```

Now, you can use **[https://my-cool-app.ngrok.io](https://my-cool-app.ngrok.io)** consistently to access your development environment.

> \[!NOTE]
>
> If you are using the [Visual Studio extension](https://visualstudiogallery.msdn.microsoft.com/56a642ed-a5e0-4044-8735-740d36912c5e), specify the subdomain you would like it to use in the **appSettings** section of your **web.config** file like so:
>
> ```xml
> <?xml version="1.0" encoding="utf-8"?>
> <configuration>
>   <appSettings>
>     <add key="ngrok-subdomain" value="my-cool-app"/>
>     ... more appSettings omitted ...
>   </appSettings>
>   ... more config omitted ...
> </configuration>
> ```

## Troubleshooting

Sometimes things can go wrong and when you can't seem to get your ngrok tunnel working, here are some things to try or consider:

1. Is your app running? Not only does the tunnel need to be running, but your app also needs to be running in order to respond to requests.
2. Did you start ngrok with the correct port number? Make sure the port that ngrok is forwarding traffic to matches the port that your application is listening on.
3. Have you tried running ngrok manually? If you are using the Visual Studio extension and are having trouble, try running ngrok manually from the command line following the instructions in this guide. If you can get it working that way, please [submit that feedback](https://marketplace.visualstudio.com/items?itemName=DavidProthero.NgrokExtensions#qna) so we can improve the Visual Studio extension.
4. Make sure your project is configured to *not* use SSL. ngrok cannot tunnel to an SSL-enabled host. In Visual Studio, make sure your "Enable SSL" option is turned *off* in the Debug tab of the App Properties.
5. Is your computer a company-managed machine? In some cases, computers managed by your company's IT department may be locked down to prevent external tunneling software from working correctly. If this is the case, you could ask for an exception or you may need to use a public web host like [Microsoft Azure](https://azure.microsoft.com/) to host your application publicly.

## Advanced ngrok tips and tricks

### Get ngrok host name

Perhaps you have some C# code that looks at the **Request** object to try to figure out the hostname to use in an absolute URL. You might be doing something to insert a fully qualified URL into an email or maybe you're using [the Twilio API](/docs/phone-numbers/api/incomingphonenumber-resource#update-an-incomingphonenumber-resource) to provision a phone number with a webhook URL to receive phone calls (that's a great idea, pat yourself on the back for thinking of that).

Regardless of the reason why, usually in ASP.NET when you want the hostname, you use the `Url.Host` on the current request:

```csharp
var myHostName = Request.Url.Host;
```

You probably combine that with `Url.Port` to make sure you're on the right port since your local development environment isn't on a default port:

```csharp
var myHostNameWithPort = Request.Url.Host + ":" + Request.Url.Port;
```

So, if you open "http://localhost:1234/Home", you will get "localhost:1234". What if you are running your app through ngrok? Perhaps unexpectedly, the above code will *still* return "localhost:1234" even though you accessed the page with an ngrok URL like "[https://foo123.ngrok.io/Home](https://foo123.ngrok.io/Home)". This is because in order to get Visual Studio (and the IIS Express web server under the hood) to allow requests into your local environment, we had to instruct ngrok to rewrite the host header. Thankfully, there's an easy way around this because ngrok will pass us a **X-Original-Host** header that we can use.

Here's a C# function that will use the `X-Original-Host` if it is present, otherwise it will use the `Url` property like before:

```csharp
public static string GetDomainAndPort(HttpRequestBase request)
{
    if (request.Headers["X-Original-Host"] != null)
    {
        // Assume default port for protocol (http=80, https=443)
        return request.Headers["X-Original-Host"];
    }

    // Leave off port if it's the default 80/443
    if (request.Url.Port == 80 || request.Url.Port == 443)
    {
        return request.Url.Host;
    }
    return request.Url.Host + ":" + request.Url.Port;
}
```

### Get SSL status

If you're building a full URL, you probably want to know if you should prefix it with "http" or "https". ngrok supports both, so you could just default to https and be safe. If you want to know which protocol the user actually used, then you can check the **X-Forwarded-Proto** header:

```csharp
public static string GetProtocol(HttpRequestBase request)
{
    if (request.Headers["X-Forwarded-Proto"] != null)
    {
        return request.Headers["X-Forwarded-Proto"];
    }

    return request.IsSecureConnection ? "https" : "http";
}
```

**X-Forwarded-Proto** is a fairly common header for front-end proxy servers, so the code is reusable whether you're running with ngrok in development or behind an [AWS Elastic Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/x-forwarded-headers.html#x-forwarded-proto) in production.

### Get client IP address

The other common header that is passed by proxies like ngrok is **X-Forwarded-For**. This header is used to provide the original IP address of the client making the HTTP request. If you only use the typical **UserHostAddress** property of the current request object, then you will always get the IP address of the proxy server (in our case, one of ngrok's servers). Here's the correct way to detect the IP address of the client whether a proxy is in the mix or not:

```csharp
public static string GetIpAddress(HttpRequestBase request)
{
    return request.Headers["X-Forwarded-For"]
           ?? request.UserHostAddress;
}
```

Putting those three functions together, here's an example of how you might call them from a controller:

```csharp
public class TestController : Controller
{
    // GET: Test
    public ActionResult Index()
    {
        var html = "<html><body><pre>\n" +
           "Your Protocol: " + ProxyHelper.GetProtocol(Request) + "\n" +
           "Your Domain:Port: " + ProxyHelper.GetDomainAndPort(Request) + "\n" +
           "Your IP Address: " + ProxyHelper.GetIpAddress(Request) + "\n" +
           "</pre></body></html>";
        return Content(html);
    }
}
```

## Conclusion

ngrok is a fantastic tool for debugging webhooks and for web development in general. Hopefully, this guide has provided you with the skills you need to make ngrok work harmoniously with Visual Studio.
