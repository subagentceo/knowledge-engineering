# Receive and Download Images on Incoming Media Messages with C\#

You know how to [receive and reply to incoming SMS messages](/docs/messaging/tutorials/how-to-receive-and-reply/csharp). What if you receive an MMS message containing an image you'd like to download? Let's learn how we can grab that image and any other incoming MMS media using C#.

## Create MMS processing project

### Create an ASP.NET MVC Project

When Twilio receives a message for your phone number, it can make an HTTP call to a webhook that you create. The easiest way to handle HTTP requests in .NET is to use ASP.NET MVC. You may have an existing ASP.NET MVC project already, or you can create a new, blank project. Just be sure to include the MVC references when going through the project wizard. If you need help creating a new ASP.NET MVC project, [check out our mini-guide](/docs/usage/tutorials/how-to-set-up-your-csharp-and-asp-net-mvc-development-environment) on the topic.

Twilio expects, at the very least, for your webhook to return a `200 OK` response if everything is peachy. Often, however, you will return some [TwiML](/docs/voice/twiml) in your response as well. TwiML is just a set of XML commands telling Twilio how you'd like it to respond to your message. Rather than manually generating the XML, we'll use the `Twilio.AspNet.Mvc` SDK to facilitate generating TwiML and the rest of the webhook plumbing.

To install the library, open up the Package Manager Console and run the following command:

```bash
Install Twilio.AspNet.Mvc Package
```

### Create Controller

Add a new controller called MmsController (again, [check out our mini-guide](/docs/usage/tutorials/how-to-set-up-your-csharp-and-asp-net-mvc-development-environment) if you are unsure of how to do this). We'll have this class inherit from TwilioController to give us a little easier syntax for returning TwiML. Here's a controller that receives a message and sends a "hello world" reply message.

```cs title="C# Hello World SMS Webhook"
using System.Web.Mvc;
using Twilio.AspNet.Common;
using Twilio.AspNet.Mvc;
using Twilio.TwiML;

namespace DownloadMmsImages.Controllers
{
    public class MmsController : TwilioController
    {
        [HttpPost]
        public TwiMLResult Index(SmsRequest request)
        {
            var response = new MessagingResponse();
            response.Message("Hello world!");
            return TwiML(response);
        }
    }
}
```

## Receive MMS Message and Images

### Get Incoming Message Details

When Twilio calls your webhook, it sends a number of parameters about the message you just received. Most of these, such as the To phone number, the From phone number, and the Body of the message are available as properties of the request parameter to our action method (type SmsRequest). However, one parameter it doesn't have is NumMedia. Thankfully, we can have ASP.NET MVC map this parameter for us by adding it to our action method's signature like so:

```csharp
public TwiMLResult Index(SmsRequest request, int numMedia)
```

### Get URLs to the Media

Since an MMS message can have multiple attachments, Twilio will send us form variables named `MediaUrlX`, where ***X*** is a zero-based index. So, for example, the URL for the first media attachment will be in the `MediaUrl0` parameter, the second in `MediaUrl1`, and so on.

In order to handle a dynamic number of attachments, we pull the URLs out of the ASP.NET `Request.Form` collection like this:

```csharp
for (var i = 0; i < numMedia; i++)
{
    var mediaUrl = Request.Form[$"MediaUrl{i}"];
}
```

### Determine Content Type of Media

Attachments to MMS messages can be of many different file types. [JPG](https://en.wikipedia.org/wiki/JPEG) and [GIF](https://en.wikipedia.org/wiki/GIF) images as well as [MP4](https://en.wikipedia.org/wiki/MPEG-4_Part_14) and [3GP](https://en.wikipedia.org/wiki/3GP_and_3G2) files are all common. Twilio handles the determination of the file type for you and you can get the standard mime type from the `MediaContentTypeX` parameter. If you are expecting photos, then you will likely see a lot of attachments with the mime type of `image/jpeg`.

```csharp
for (var i = 0; i < numMedia; i++)
{
    var mediaUrl = Request.Form[$"MediaUrl{i}"];
    var contentType = Request.Form[$"MediaContentType{i}"];
}
```

## Process MMS Images

### Save the Media URLs

Depending on your use case, storing the URLs to the images (or videos or whatever) may be all you need. There's two key features to these URLs that make them very pliable for your use in your apps:

1. They are publicly accessible without any need for authentication to facilitate sharing.
2. They are permanent (unless you explicitly delete the media, see later).

For example, if you are building a browser-based app that needs to display the images, all you need to do is drop an `<img src="twilio url to your image">` tag into the page. If this works for you, then perhaps all you need is to store the URL in a database character field.

### Save media to local file system

If you want to save the media attachments to a file, then you will need to make an HTTP request to the media URL and write the response stream to a file. If you need a unique filename, you can use the last part of the media URL. For example, suppose your media URL is the following:

```bash
https://api.twilio.com/2010-04-01/Accounts/ACxxxx/Messages/MMxxxx/Media/ME27be8a708784242c0daee207ff73db67
```

You can use that last part of the URL as a unique filename. Figuring out a good extension to use is a little trickier. If you are only expecting images, you could just assume a ".jpg" extension. For a little more flexibility, you can look up the mime type and determine a good extension to use based on that.

Here's the complete code for our controller that saves each MMS attachment to the App\_Data folder:

```cs title="Process MMS Media with C#"
using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Mvc;
using Microsoft.Win32;
using Twilio.AspNet.Common;
using Twilio.AspNet.Mvc;
using Twilio.TwiML;
using Task = System.Threading.Tasks.Task;

namespace DownloadMmsImages.Controllers
{
    public class MmsController : TwilioController
    {
        private const string SavePath = "~/App_Data/";

        [HttpPost]
        public async Task<TwiMLResult> Index(SmsRequest request, int numMedia)
        {
            for (var i = 0; i < numMedia; i++)
            {
                var mediaUrl = Request.Form[$"MediaUrl{i}"];
                Trace.WriteLine(mediaUrl);
                var contentType = Request.Form[$"MediaContentType{i}"];

                var filePath = GetMediaFileName(mediaUrl, contentType);
                await DownloadUrlToFileAsync(mediaUrl, filePath);
            }

            var response = new MessagingResponse();
            var body = numMedia == 0 ? "Send us an image!" :
                $"Thanks for sending us {numMedia} file(s)!";
            response.Message(body);
            return TwiML(response);
        }

        private string GetMediaFileName(string mediaUrl,
            string contentType)
        {
            return Server.MapPath(
                // e.g. ~/App_Data/MExxxx.jpg
                SavePath +
                Path.GetFileName(mediaUrl) +
                GetDefaultExtension(contentType)
            );
        }

        private static async Task DownloadUrlToFileAsync(string mediaUrl,
            string filePath)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(mediaUrl);
                var httpStream = await response.Content.ReadAsStreamAsync();
                using (var fileStream = System.IO.File.Create(filePath))
                {
                    await httpStream.CopyToAsync(fileStream);
                    await fileStream.FlushAsync();
                }
            }
        }

        public static string GetDefaultExtension(string mimeType)
        {
            // NOTE: This implementation is Windows specific (uses Registry)
            // Platform independent way might be to download a known list of
            // mime type mappings like: http://bit.ly/2gJYKO0
            var key = Registry.ClassesRoot.OpenSubKey(
                @"MIME\Database\Content Type\" + mimeType, false);
            var ext = key?.GetValue("Extension", null)?.ToString();
            return ext ?? ".bin";
        }
    }
}
```

Notice we have made our controller action [async](https://msdn.microsoft.com/en-us/library/hh156513.aspx?f=255\&MSPPError=-2147217396). This is highly recommended since we will be making a network request that could take a little time. Doing this asynchronously means that we won't block other requests from being handled while the file downloads.

Another idea for these image files could be uploading them to a cloud storage service like [Azure Blob Storage](https://docs.microsoft.com/en-us/azure/storage/storage-dotnet-how-to-use-blobs) or [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/HLuploadFileDotNet.html). You could also save them to a database, if necessary. They're just regular files at this point. Go crazy.

### Delete media from Twilio

If you are downloading the attachments and no longer need them to be stored by Twilio, you can delete them. You can send an `HTTP DELETE` request to the media URL and it will be deleted, but you will need to be authenticated to do this; the [Twilio C# SDK](https://github.com/twilio/twilio-csharp) can help accomplish this.

Delete a Media

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Message;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await MediaResource.DeleteAsync(
            pathMessageSid: "MM800f449d0399ed014aae2bcc0cc2f2ec",
            pathSid: "ME557ce644e5ab84fa21cc21112e22c485");
    }
}
```

> \[!WARNING]
>
> Twilio supports HTTP Basic and Digest Authentication. Authentication allows you to password protect your TwiML URLs on your web server so that only you and Twilio can access them. Learn more about HTTP authentication and validating incoming requests [here](/docs/usage/security#http-authentication).

## What's Next?

All the code, in a complete working project, is [available on GitHub](https://github.com/TwilioDevEd/twilio-samples-csharp/tree/master/DownloadMmsImages). If you need to dig a bit deeper, you can head over to our API Reference and learn more about the [Twilio webhook request](/docs/messaging/twiml) and the [REST API Media resource](/docs/messaging/api/media-resource). Also, you will want to be aware of the [pricing](https://www.twilio.com/en-us/sms/pricing/us) for storage of all the media files that you keep on Twilio's servers.

[We'd love to hear](/help/contact) what you build with this.
