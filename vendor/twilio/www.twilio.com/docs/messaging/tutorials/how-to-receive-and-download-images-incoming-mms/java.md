# Receive and Download Images on Incoming Media Messages with Java

You know how to [receive and reply to incoming SMS messages](/docs/messaging/tutorials/how-to-receive-and-reply/csharp). What if you receive an MMS message containing an image you'd like to download? Let's learn how we can grab that image and any other incoming MMS media using Java.

## Create MMS processing project

When Twilio receives a message for your phone number, it can make an HTTP call to a webhook that you create. You can handle HTTP requests in Java using [Spark web framework](https://github.com/perwendel/spark).

Twilio expects, at the very least, for your webhook to return a `200 OK` response if everything is peachy. Often, however, you will return some TwiML in your response as well. TwiML is just a set of XML commands telling Twilio how you'd like it to respond to your message. Rather than manually generating the XML, we'll use the `twilio` SDK to facilitate generating TwiML and the rest of the webhook plumbing.

## Receive MMS message and images

### Get incoming message details

When Twilio calls your webhook, it sends a number of parameters about the message you just received.

Most of these, such as the To phone number, the From phone number, and the Body of the message are available as properties of the request parameter to the Spark views.

### Get number of attachments

We may receive more than one media per message, this parameter informs us how many we received. We used a custom class `parseBody` to get the value and *cast* it to an Integer, to be used in a following loop.

```java
Map<String, String> parameters = parseBody(req.body());
String numMediaStr = parameters.get("NumMedia");
int numMedia = Integer.parseInt(numMediaStr);
```

### Get URLs to the media

Since an MMS message can have multiple attachments, Twilio will send us form variables named `MediaUrlX`, where ***X*** is a zero-based index. So, for example, the URL for the first media attachment will be in the `MediaUrl0` parameter, the second in `MediaUrl1`, and so on.

In order to handle a dynamic number of attachments, we loop through all the available URLs:

```java
while (numMedia > 0) {
    numMedia = numMedia - 1;
    String mediaUrl = parameters.get(String.format("MediaUrl%d", numMedia));
}
```

### Determine content type of media

Attachments to MMS messages can be of many different file types. [JPG](https://en.wikipedia.org/wiki/JPEG) and [GIF](https://en.wikipedia.org/wiki/GIF) images as well as [MP4](https://en.wikipedia.org/wiki/MPEG-4_Part_14) and [3GP](https://en.wikipedia.org/wiki/3GP_and_3G2) files are all common. Twilio handles the determination of the file type for you and you can get the standard mime type from the `MediaContentTypeX` parameter. If you are expecting photos, then you will likely see a lot of attachments with the mime type of `image/jpeg`.

```java
while (numMedia > 0) {
    numMedia = numMedia - 1;
    String mediaUrl = parameters.get(String.format("MediaUrl%d", numMedia));
    String contentType = parameters.get(String.format("MediaContentType%d", numMedia));
}
```

## Process MMS images

### Save the media URLs

Depending on your use case, storing the URLs to the images (or videos or whatever) may be all you need. Accessing these media files requires HTTP Basic Authentication. There are two key features to these URLs:

1. They require HTTP Basic Authentication to access.
2. They are permanent (unless you explicitly delete the media, see later).

> \[!WARNING]
>
> **Authentication required**: Twilio enforces [HTTP Basic Authentication](/docs/glossary/what-is-basic-authentication) for all media URLs. Authenticate using an [API key](/docs/iam/api-keys) as the username and an API key secret as the password. You can also use your Account SID and Auth Token when testing locally.

If you need to display images in a browser without authentication, you should download the media files and serve them from your own server or a cloud storage service.

### Save media to local file system

If you want to save the media attachments to a file, then you will need to make an HTTP request to the media URL and write the response stream to a file. If you need a unique filename, you can use the last part of the media URL. For example, suppose your media URL is the following:

```bash
https://api.twilio.com/2010-04-01/Accounts/ACxxxx/Messages/MMxxxx/Media/ME27be8a708784242c0daee207ff73db67
```

You can use that last part of the URL as a unique filename. Figuring out a good extension to use is a little tricker. If you are only expecting images, you could just assume a ".jpg" extension. For a little more flexibility, you can lookup the mime type and determine a good extension to use based on that.

Here's the complete code for our controller that saves each MMS attachment to the App\_Data folder:

```java title="Saves MMS attachment with Java"
// !mark(28:76)
package com.twilio.app;

import static spark.Spark.*;

import java.util.Map;
import java.util.HashMap;
import java.io.File;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;

import org.apache.tika.mime.MimeType;
import org.apache.tika.mime.MimeTypes;

import org.apache.commons.io.FileUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.client.LaxRedirectStrategy;

import com.twilio.twiml.MessagingResponse;
import com.twilio.twiml.messaging.Body;
import com.twilio.twiml.messaging.Message;

public class App {
    public static void main(String[] args) {
        post("/sms", (req, res) -> {
            Map<String, String> parameters = parseBody(req.body());
            String numMediaStr = parameters.get("NumMedia");
            int numMedia = Integer.parseInt(numMediaStr);

            if (numMedia > 0) {
                while (numMedia > 0) {
                    numMedia = numMedia - 1;

                    // Get all info
                    String mediaUrl = parameters.get(String.format("MediaUrl%d", numMedia));
                    String contentType = parameters.get(String.format("MediaContentType%d", numMedia));
                    String fileName = mediaUrl.substring(mediaUrl.lastIndexOf("/") + 1);
                    MimeTypes allTypes = MimeTypes.getDefaultMimeTypes();
                    MimeType mimeType = allTypes.forName(contentType);
                    String fileExtension = mimeType.getExtension();
                    File file = new File(fileName + fileExtension);

                    // Download file with HTTP Basic Authentication
                    URL url = new URL(mediaUrl);
                    
                    // Get credentials from environment variables
                    String accountSid = System.getenv("TWILIO_ACCOUNT_SID");
                    String authToken = System.getenv("TWILIO_AUTH_TOKEN");
                    
                    CloseableHttpClient httpclient = HttpClients.custom()
                        .setRedirectStrategy(new LaxRedirectStrategy())
                        .build();
                    HttpGet get = new HttpGet(url.toURI());
                    
                    // Add HTTP Basic Authentication header
                    String auth = accountSid + ":" + authToken;
                    String encodedAuth = java.util.Base64.getEncoder().encodeToString(auth.getBytes());
                    get.setHeader("Authorization", "Basic " + encodedAuth);
                    
                    HttpResponse response = httpclient.execute(get);
                    InputStream source = response.getEntity().getContent();
                    FileUtils.copyInputStreamToFile(source, file);
                }
            }

            // Send message back
            String message = (numMedia > 0) ? String.format("Thanks for sending us %s file(s)!", numMedia) : "Send us an image!";
            res.type("application/xml");
            Body body = new Body
                    .Builder(message)
                    .build();
            Message sms = new Message
                    .Builder()
                    .body(body)
                    .build();
            MessagingResponse twiml = new MessagingResponse
                    .Builder()
                    .message(sms)
                    .build();
            return twiml.toXml();

        });
    }

    // Body parser help
    public static Map<String, String> parseBody(String body) throws UnsupportedEncodingException {
      String[] unparsedParams = body.split("&");
      Map<String, String> parsedParams = new HashMap<String, String>();
      for (int i = 0; i < unparsedParams.length; i++) {
        String[] param = unparsedParams[i].split("=");
        if (param.length == 2) {
          parsedParams.put(urlDecode(param[0]), urlDecode(param[1]));
        } else if (param.length == 1) {
          parsedParams.put(urlDecode(param[0]), "");
        }
      }
      return parsedParams;
    }

    public static String urlDecode(String s) throws UnsupportedEncodingException {
      return URLDecoder.decode(s, "utf-8");
    }
}
```

Another idea for these image files could be uploading them to a cloud storage service like [Azure Blob Storage](https://docs.microsoft.com/en-us/azure/storage/storage-dotnet-how-to-use-blobs) or [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/HLuploadFileDotNet.html). You could also save them to a database, if necessary. They're just regular files at this point. Go crazy.

### Delete media from Twilio

If you are downloading the attachments and no longer need them to be stored by Twilio, you can delete them by sending an `HTTP DELETE` request to the media URL. You will need to be authenticated to do this. The code sample below demonstrates how to make this request.

Delete a Media

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.message.Media;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Media.deleter("MM800f449d0399ed014aae2bcc0cc2f2ec", "ME557ce644e5ab84fa21cc21112e22c485").delete();
    }
}
```

> \[!WARNING]
>
> Twilio supports HTTP Basic and Digest Authentication. Authentication allows you to password protect your TwiML URLs on your web server so that only you and Twilio can access them. Learn more about HTTP authentication and validating incoming requests [here](/docs/usage/security#http-authentication).

## What's Next?

All the code, in a complete working project, is [available on GitHub](https://github.com/TwilioDevEd/download-mms-java). If you need to dig a bit deeper, you can head over to our [API Reference](/docs/messaging/api) and learn more about the [Twilio webhook request](/docs/messaging/twiml) and the [Media resource](/docs/messaging/api/media-resource). Also, you will want to be aware of the [pricing](https://www.twilio.com/en-us/sms/pricing/us) for storage of all the media files that you keep on Twilio's servers.

[We'd love to hear](/help/contact) what you build with this.
