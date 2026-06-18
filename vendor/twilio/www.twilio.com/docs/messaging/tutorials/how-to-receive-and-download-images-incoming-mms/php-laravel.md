# Receive and Download Images on Incoming Media Messages with PHP and Laravel

You know how to [receive and reply to incoming SMS messages](/docs/messaging/tutorials/how-to-receive-and-reply/csharp). What if you receive an MMS message containing an image you'd like to download? Let's learn how we can grab that image and any other incoming MMS media using PHP and Laravel.

## Create MMS processing project

### Create a Laravel application

When Twilio receives a message for your phone number, it can make an HTTP call to a webhook that you create. The easiest way to handle HTTP requests with PHP is to use Laravel or a similar framework.

Twilio expects, at the very least, for your webhook to return a `200 OK` response if everything is peachy. Often, however, you will return some [TwiML](/docs/voice/twiml) in your response as well. TwiML is just a set of XML commands telling Twilio how you'd like it to respond to your message. Rather than manually generating the XML, we'll use the `Twilio\Twiml` module in the SDK to facilitate generating TwiML and the rest of the webhook plumbing.

To install the library, run:

```bash
composer install twilio/sdk
```

### Create Controller

Add a new controller called MessagingController that handles an incoming SMS request.

```php title="Laravel API Controller"
// !mark(1:43)
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\MMSMedia;
use App\Services\MediaMessageService\IMediaMessageService;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Magyarjeti\MimeTypes\MimeTypeConverter;
use Twilio\Rest\Client;
use Twilio\Twiml;

class MessagingController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Messaging Controller
    |--------------------------------------------------------------------------
    |
    | This controller receives messages from Twilio and makes the media available
    | via the /images url.
    */

    protected $twilio;
    protected $accountSid;
    protected $twilioNumber;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->accountSid = env('TWILIO_ACCOUNT_SID');
        $this->twilioNumber = env('TWILIO_NUMBER');
        $authToken = env('TWILIO_AUTH_TOKEN');

        $this->twilio = new Client($this->accountSid, $authToken);
    }

    public function handleIncomingSMS(Request $request, IMediaMessageService $mediaService)
    {
        $converter = new MimeTypeConverter;
        $NumMedia = (int)$request->input('NumMedia');
        $FromNumber = $request->input('From');
        $MessageSid = $request->input('MessageSid');

        for ($i=0; $i < $NumMedia; $i++) {
            $mediaUrl = $request->input("MediaUrl$i");
            $MIMEType = $request->input("MediaContentType$i");
            $fileExtension = $converter->toExtension($MIMEType);
            $mediaSid = basename($mediaUrl);

            $media = $mediaService->getMediaContent($mediaUrl);

            $filename = "$mediaSid.$fileExtension";

            $mediaData = compact('mediaSid', 'MessageSid', 'mediaUrl', 'media', 'filename', 'MIMEType');
            $mmsMedia = new MMSMedia($mediaData);
            $mmsMedia->save();
        }

        $response = new Twiml();
        $messageBody = $NumMedia == 0 ? 'Send us an image!' : "Thanks for the $NumMedia images.";
        $message = $response->message([
          'from' => $request->input('To'),
          'to' => $FromNumber
        ]);
        $message->body($messageBody);

        return (string)$response;
    }

    public function deleteMediaFromTwilio($mediaItem)
    {
        return $this->twilio->api->accounts($this->accountSid)
            ->messages($mediaItem['MessageSid'])
            ->media($mediaItem['mediaSid'])
            ->delete();
    }

    public function allMedia()
    {
        $mediaItems = MMSMedia::all();
        return $mediaItems;
    }

    public function getMediaFile($filename, Response $response)
    {
        $media = MMSMedia::where('filename', $filename)->firstOrFail();
        $fileContents = $media['media'];
        $MessageSid = $media['MessageSid'];
        $mediaSid = $media['mediaSid'];
        $MIMEType = $media['MIMEType'];

        $media->delete();
        $this->deleteMediaFromTwilio(compact('mediaSid', 'MessageSid'));

        return response($fileContents, 200)
            ->header('Content-Type', $MIMEType);
    }

    public function config()
    {
        return ['twilioNumber' => $this->twilioNumber];
    }
}
```

## Receive MMS message and images

### Get incoming message details

When Twilio calls your webhook, it sends a number of parameters about the message you just received. Most of these, such as the `To` phone number, the `From` phone number, and the `Body` of the message are available as properties of the request body.

### Get URLs to the Media

Since an MMS message can have multiple attachments, Twilio will send us form variables named `MediaUrlX`, where ***X*** is a zero-based index. So, for example, the URL for the first media attachment will be in the `MediaUrl0` parameter, the second in `MediaUrl1`, and so on.

In order to handle a dynamic number of attachments, we pull the URLs out of the body request like this:

```php title="Extract Media Urls From Request Body"
// !mark(42:61)
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\MMSMedia;
use App\Services\MediaMessageService\IMediaMessageService;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Magyarjeti\MimeTypes\MimeTypeConverter;
use Twilio\Rest\Client;
use Twilio\Twiml;

class MessagingController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Messaging Controller
    |--------------------------------------------------------------------------
    |
    | This controller receives messages from Twilio and makes the media available
    | via the /images url.
    */

    protected $twilio;
    protected $accountSid;
    protected $twilioNumber;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->accountSid = env('TWILIO_ACCOUNT_SID');
        $this->twilioNumber = env('TWILIO_NUMBER');
        $authToken = env('TWILIO_AUTH_TOKEN');

        $this->twilio = new Client($this->accountSid, $authToken);
    }

    public function handleIncomingSMS(Request $request, IMediaMessageService $mediaService)
    {
        $converter = new MimeTypeConverter;
        $NumMedia = (int)$request->input('NumMedia');
        $FromNumber = $request->input('From');
        $MessageSid = $request->input('MessageSid');

        for ($i=0; $i < $NumMedia; $i++) {
            $mediaUrl = $request->input("MediaUrl$i");
            $MIMEType = $request->input("MediaContentType$i");
            $fileExtension = $converter->toExtension($MIMEType);
            $mediaSid = basename($mediaUrl);

            $media = $mediaService->getMediaContent($mediaUrl);

            $filename = "$mediaSid.$fileExtension";

            $mediaData = compact('mediaSid', 'MessageSid', 'mediaUrl', 'media', 'filename', 'MIMEType');
            $mmsMedia = new MMSMedia($mediaData);
            $mmsMedia->save();
        }

        $response = new Twiml();
        $messageBody = $NumMedia == 0 ? 'Send us an image!' : "Thanks for the $NumMedia images.";
        $message = $response->message([
          'from' => $request->input('To'),
          'to' => $FromNumber
        ]);
        $message->body($messageBody);

        return (string)$response;
    }

    public function deleteMediaFromTwilio($mediaItem)
    {
        return $this->twilio->api->accounts($this->accountSid)
            ->messages($mediaItem['MessageSid'])
            ->media($mediaItem['mediaSid'])
            ->delete();
    }

    public function allMedia()
    {
        $mediaItems = MMSMedia::all();
        return $mediaItems;
    }

    public function getMediaFile($filename, Response $response)
    {
        $media = MMSMedia::where('filename', $filename)->firstOrFail();
        $fileContents = $media['media'];
        $MessageSid = $media['MessageSid'];
        $mediaSid = $media['mediaSid'];
        $MIMEType = $media['MIMEType'];

        $media->delete();
        $this->deleteMediaFromTwilio(compact('mediaSid', 'MessageSid'));

        return response($fileContents, 200)
            ->header('Content-Type', $MIMEType);
    }

    public function config()
    {
        return ['twilioNumber' => $this->twilioNumber];
    }
}
```

### Determine content type of media

Attachments to MMS messages can be of many different file types. [JPG](https://en.wikipedia.org/wiki/JPEG) and [GIF](https://en.wikipedia.org/wiki/GIF) images, as well as [MP4](https://en.wikipedia.org/wiki/MPEG-4_Part_14) and [3GP](https://en.wikipedia.org/wiki/3GP_and_3G2) files, are all common. Twilio handles the determination of the file type for you and you can get the standard mime type from the `MediaContentTypeX` parameter. If you are expecting photos, then you will likely see a lot of attachments with the mime type `image/jpeg`.

```php title="Map MIME Type To File Extension"
// !mark(51:52)
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\MMSMedia;
use App\Services\MediaMessageService\IMediaMessageService;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Magyarjeti\MimeTypes\MimeTypeConverter;
use Twilio\Rest\Client;
use Twilio\Twiml;

class MessagingController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Messaging Controller
    |--------------------------------------------------------------------------
    |
    | This controller receives messages from Twilio and makes the media available
    | via the /images url.
    */

    protected $twilio;
    protected $accountSid;
    protected $twilioNumber;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->accountSid = env('TWILIO_ACCOUNT_SID');
        $this->twilioNumber = env('TWILIO_NUMBER');
        $authToken = env('TWILIO_AUTH_TOKEN');

        $this->twilio = new Client($this->accountSid, $authToken);
    }

    public function handleIncomingSMS(Request $request, IMediaMessageService $mediaService)
    {
        $converter = new MimeTypeConverter;
        $NumMedia = (int)$request->input('NumMedia');
        $FromNumber = $request->input('From');
        $MessageSid = $request->input('MessageSid');

        for ($i=0; $i < $NumMedia; $i++) {
            $mediaUrl = $request->input("MediaUrl$i");
            $MIMEType = $request->input("MediaContentType$i");
            $fileExtension = $converter->toExtension($MIMEType);
            $mediaSid = basename($mediaUrl);

            $media = $mediaService->getMediaContent($mediaUrl);

            $filename = "$mediaSid.$fileExtension";

            $mediaData = compact('mediaSid', 'MessageSid', 'mediaUrl', 'media', 'filename', 'MIMEType');
            $mmsMedia = new MMSMedia($mediaData);
            $mmsMedia->save();
        }

        $response = new Twiml();
        $messageBody = $NumMedia == 0 ? 'Send us an image!' : "Thanks for the $NumMedia images.";
        $message = $response->message([
          'from' => $request->input('To'),
          'to' => $FromNumber
        ]);
        $message->body($messageBody);

        return (string)$response;
    }

    public function deleteMediaFromTwilio($mediaItem)
    {
        return $this->twilio->api->accounts($this->accountSid)
            ->messages($mediaItem['MessageSid'])
            ->media($mediaItem['mediaSid'])
            ->delete();
    }

    public function allMedia()
    {
        $mediaItems = MMSMedia::all();
        return $mediaItems;
    }

    public function getMediaFile($filename, Response $response)
    {
        $media = MMSMedia::where('filename', $filename)->firstOrFail();
        $fileContents = $media['media'];
        $MessageSid = $media['MessageSid'];
        $mediaSid = $media['mediaSid'];
        $MIMEType = $media['MIMEType'];

        $media->delete();
        $this->deleteMediaFromTwilio(compact('mediaSid', 'MessageSid'));

        return response($fileContents, 200)
            ->header('Content-Type', $MIMEType);
    }

    public function config()
    {
        return ['twilioNumber' => $this->twilioNumber];
    }
}
```

## Process MMS images

### Save the Media URLs

Depending on your use case, storing the URLs of the images (or videos or whatever) may be all you need. Accessing these media files requires HTTP Basic Authentication. There are two key features to these URLs:

1. They require HTTP Basic Authentication to access.
2. They are permanent (unless you explicitly delete the media).

> \[!WARNING]
>
> Twilio enforces [HTTP Basic Authentication](/docs/glossary/what-is-basic-authentication) for all media URLs. Authenticate using an [API key](/docs/iam/api-keys) as the username and an API key secret as the password. You can also use your Account SID and Auth Token when testing locally.

If you need to display images in a browser without authentication, you should download the media files and serve them from your own server or a cloud storage service.

> \[!NOTE]
>
> **For PHP implementations**: If you're using a media service abstraction like `IMediaMessageService`, make sure to update your `getMediaContent()` method to include HTTP Basic Authentication when making requests to media URLs.

### Save media to local file system

If you want to save the media attachments to a file, then you will need to make an HTTP request to the media URL and write the response stream to a file. If you need a unique filename, you can use the last part of the media URL. For example, suppose your media URL is the following:

```bash
https://api.twilio.com/2010-04-01/Accounts/ACxxxx/Messages/MMxxxx/Media/ME27be8a708784242c0daee207ff73db67
```

You can use that last part of the URL as a unique filename and look up the corresponding file extension for the mime type.

```php title="Save Media From Url"
// !mark(55:60)
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\MMSMedia;
use App\Services\MediaMessageService\IMediaMessageService;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Magyarjeti\MimeTypes\MimeTypeConverter;
use Twilio\Rest\Client;
use Twilio\Twiml;

class MessagingController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Messaging Controller
    |--------------------------------------------------------------------------
    |
    | This controller receives messages from Twilio and makes the media available
    | via the /images url.
    */

    protected $twilio;
    protected $accountSid;
    protected $twilioNumber;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->accountSid = env('TWILIO_ACCOUNT_SID');
        $this->twilioNumber = env('TWILIO_NUMBER');
        $authToken = env('TWILIO_AUTH_TOKEN');

        $this->twilio = new Client($this->accountSid, $authToken);
    }

    public function handleIncomingSMS(Request $request, IMediaMessageService $mediaService)
    {
        $converter = new MimeTypeConverter;
        $NumMedia = (int)$request->input('NumMedia');
        $FromNumber = $request->input('From');
        $MessageSid = $request->input('MessageSid');

        for ($i=0; $i < $NumMedia; $i++) {
            $mediaUrl = $request->input("MediaUrl$i");
            $MIMEType = $request->input("MediaContentType$i");
            $fileExtension = $converter->toExtension($MIMEType);
            $mediaSid = basename($mediaUrl);

            $media = $mediaService->getMediaContent($mediaUrl);

            $filename = "$mediaSid.$fileExtension";

            $mediaData = compact('mediaSid', 'MessageSid', 'mediaUrl', 'media', 'filename', 'MIMEType');
            $mmsMedia = new MMSMedia($mediaData);
            $mmsMedia->save();
        }

        $response = new Twiml();
        $messageBody = $NumMedia == 0 ? 'Send us an image!' : "Thanks for the $NumMedia images.";
        $message = $response->message([
          'from' => $request->input('To'),
          'to' => $FromNumber
        ]);
        $message->body($messageBody);

        return (string)$response;
    }

    public function deleteMediaFromTwilio($mediaItem)
    {
        return $this->twilio->api->accounts($this->accountSid)
            ->messages($mediaItem['MessageSid'])
            ->media($mediaItem['mediaSid'])
            ->delete();
    }

    public function allMedia()
    {
        $mediaItems = MMSMedia::all();
        return $mediaItems;
    }

    public function getMediaFile($filename, Response $response)
    {
        $media = MMSMedia::where('filename', $filename)->firstOrFail();
        $fileContents = $media['media'];
        $MessageSid = $media['MessageSid'];
        $mediaSid = $media['mediaSid'];
        $MIMEType = $media['MIMEType'];

        $media->delete();
        $this->deleteMediaFromTwilio(compact('mediaSid', 'MessageSid'));

        return response($fileContents, 200)
            ->header('Content-Type', $MIMEType);
    }

    public function config()
    {
        return ['twilioNumber' => $this->twilioNumber];
    }
}
```

Another idea for these image files could be uploading them to a cloud storage service like [Azure Blob Storage](https://docs.microsoft.com/en-us/azure/storage/storage-dotnet-how-to-use-blobs) or [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/HLuploadFileDotNet.html). You could also save them to a database, if necessary. They're just regular files at this point. Go crazy. In this case, we are saving them to the database in order to retrieve them later.

### Delete media from Twilio

If you are downloading the attachments and no longer need them to be stored by Twilio, you can delete them. You can send an `HTTP DELETE` request to the media URL, and it will be deleted, but you will need to be authenticated to do this. The [Twilio PHP SDK](https://github.com/twilio/twilio-php) can help with this operation, as shown here:

```php title="Delete Media From Twilio Servers"
// !mark(55:60,74:80)
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\MMSMedia;
use App\Services\MediaMessageService\IMediaMessageService;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Magyarjeti\MimeTypes\MimeTypeConverter;
use Twilio\Rest\Client;
use Twilio\Twiml;

class MessagingController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Messaging Controller
    |--------------------------------------------------------------------------
    |
    | This controller receives messages from Twilio and makes the media available
    | via the /images url.
    */

    protected $twilio;
    protected $accountSid;
    protected $twilioNumber;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->accountSid = env('TWILIO_ACCOUNT_SID');
        $this->twilioNumber = env('TWILIO_NUMBER');
        $authToken = env('TWILIO_AUTH_TOKEN');

        $this->twilio = new Client($this->accountSid, $authToken);
    }

    public function handleIncomingSMS(Request $request, IMediaMessageService $mediaService)
    {
        $converter = new MimeTypeConverter;
        $NumMedia = (int)$request->input('NumMedia');
        $FromNumber = $request->input('From');
        $MessageSid = $request->input('MessageSid');

        for ($i=0; $i < $NumMedia; $i++) {
            $mediaUrl = $request->input("MediaUrl$i");
            $MIMEType = $request->input("MediaContentType$i");
            $fileExtension = $converter->toExtension($MIMEType);
            $mediaSid = basename($mediaUrl);

            $media = $mediaService->getMediaContent($mediaUrl);

            $filename = "$mediaSid.$fileExtension";

            $mediaData = compact('mediaSid', 'MessageSid', 'mediaUrl', 'media', 'filename', 'MIMEType');
            $mmsMedia = new MMSMedia($mediaData);
            $mmsMedia->save();
        }

        $response = new Twiml();
        $messageBody = $NumMedia == 0 ? 'Send us an image!' : "Thanks for the $NumMedia images.";
        $message = $response->message([
          'from' => $request->input('To'),
          'to' => $FromNumber
        ]);
        $message->body($messageBody);

        return (string)$response;
    }

    public function deleteMediaFromTwilio($mediaItem)
    {
        return $this->twilio->api->accounts($this->accountSid)
            ->messages($mediaItem['MessageSid'])
            ->media($mediaItem['mediaSid'])
            ->delete();
    }

    public function allMedia()
    {
        $mediaItems = MMSMedia::all();
        return $mediaItems;
    }

    public function getMediaFile($filename, Response $response)
    {
        $media = MMSMedia::where('filename', $filename)->firstOrFail();
        $fileContents = $media['media'];
        $MessageSid = $media['MessageSid'];
        $mediaSid = $media['mediaSid'];
        $MIMEType = $media['MIMEType'];

        $media->delete();
        $this->deleteMediaFromTwilio(compact('mediaSid', 'MessageSid'));

        return response($fileContents, 200)
            ->header('Content-Type', $MIMEType);
    }

    public function config()
    {
        return ['twilioNumber' => $this->twilioNumber];
    }
}
```

> \[!WARNING]
>
> Twilio supports HTTP Basic and Digest Authentication. Authentication allows you to password protect your TwiML URLs on your web server so that only you and Twilio can access them. Learn more about HTTP authentication and validating incoming requests [here](/docs/usage/security#http-authentication).

## What's Next?

All the code, in a complete working project, is [available on GitHub](https://github.com/TwilioDevEd/receive-mms-laravel). If you need to dig a bit deeper, you can head over to our API Reference and learn more about the [Twilio webhook request](/docs/messaging/twiml) and the [REST API Media resource](/docs/messaging/api/media-resource). Also, you will want to be aware of the [pricing](https://www.twilio.com/en-us/sms/pricing/us) for storage of all the media files that you keep on Twilio's servers. For MMS media files, [Storage, Unlimited free media storage](https://www.twilio.com/en-us/messaging/channels/mms).

[We'd love to hear](/help/contact) what you build with this.
