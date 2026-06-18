# Receive and Download Images on Incoming Media Messages with Python and Django

You know how to [receive and reply to incoming SMS messages](/docs/messaging/tutorials/how-to-receive-and-reply/python). What if you receive an MMS message containing an image you'd like to download? Let's learn how we can grab that image and any other incoming MMS media using Django.

## Create MMS processing project

### Create a Django application

When Twilio receives a message for your phone number, it can make an HTTP call to a webhook that you create.

Twilio expects, at the very least, for your webhook to return a `200 OK` response if everything is peachy. Often, however, you will return some [TwiML](/docs/voice/twiml) in your response as well. TwiML is just a set of XML commands telling Twilio how you'd like it to respond to your message. Rather than manually generating the XML, we'll use the `twilio.twiml.messaging_response` module in the SDK to facilitate generating TwiML and the rest of the webhook plumbing.

To install the library, run:

```bash
pip install twilio
```

### Create Router

Add a new route in your urls.py file that handles incoming SMS requests.

```py title="Handle Incoming SMS Routes - Django"
# !mark(9:12)
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^config/$', views.config, name='config'),
    url(r'^images/$', views.get_all_media, name='images'),
    url(r'^images/(?P<filename>[0-9A-Za-z\.]{0,50})$', views.handle_delete_media_file, name='delete_image'),
    url(r'^incoming/$', views.handle_incoming_message, name='incoming'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```

## Receive MMS message and images

### Get Incoming Message Details

When Twilio calls your webhook, it sends a number of parameters about the message you just received. Most of these, such as the `To` phone number, the `From` phone number, and the `Body` of the message are available as properties of the request body.

### Get URLs to the Media

Since an MMS message can have multiple attachments, Twilio will send us form variables named `MediaUrlX`, where ***X*** is a zero-based index. So, for example, the URL for the first media attachment will be in the `MediaUrl0` parameter, the second in `MediaUrl1`, and so on.

In order to handle a dynamic number of attachments, we pull the URLs out of the request body like this:

```py title="Handle Incoming SMS Views - Django"
# !mark(46:56)
import os
import sys
import logging
import mimetypes
import requests

from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from core.receive_mms import *


logger = logging.getLogger(__name__)


def index(request):
    return render(request, 'receive_mms/index.html')


def config(_):
    return JsonResponse({'twilioPhoneNumber': os.getenv('TWILIO_NUMBER', '')})


# /images/
def get_all_media(_):
    return JsonResponse({'data': fetch_all_media()})


# /images/:filename
@csrf_exempt
def handle_delete_media_file(_, filename=None):
    try:
        media_content, mime_type = delete_media_file(filename)
        return HttpResponse(media_content, content_type=mime_type)
    except MMSMedia.DoesNotExist as err:
        logger.error(err)
        return JsonResponse({
            'status': False,
            'message': 'Could not find any media file with name: {}'.format(filename)
          }, status=404)


# /incoming/
@csrf_exempt
def handle_incoming_message(request):
    message_sid = request.POST.get('MessageSid', '')
    from_number = request.POST.get('From', '')
    num_media = int(request.POST.get('NumMedia', 0))

    media_files = [(request.POST.get("MediaUrl{}".format(i), ''),
                    request.POST.get("MediaContentType{}".format(i), ''))
                   for i in range(0, num_media)]

    response = reply_with_twiml_message(message_sid, from_number, num_media, media_files)
    return HttpResponse(response, content_type='application/xml')
```

### Determine content type of media

Attachments to MMS messages can be of many different file types. [JPG](https://en.wikipedia.org/wiki/JPEG) and [GIF](https://en.wikipedia.org/wiki/GIF) images as well as [MP4](https://en.wikipedia.org/wiki/MPEG-4_Part_14) and [3GP](https://en.wikipedia.org/wiki/3GP_and_3G2) files are all common. Twilio handles the determination of the file type for you and you can get the standard mime type from the `MediaContentTypeX` parameter. If you are expecting photos, then you will likely see a lot of attachments with the mime type `image/jpeg`.

```py title="Map MIME Type To File Extension"
# !mark(21)
import os
import mimetypes
import requests

from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
from core.models import MMSMedia

# Python 2 and 3: alternative 4
try:
    from urllib.parse import urlparse
except ImportError:
    from urlparse import urlparse


def reply_with_twiml_message(message_sid, from_number, num_media, media_files):
    if not from_number or not message_sid:
        raise Exception('Please provide a From Number and a Message Sid')

    account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    auth_token = os.getenv('TWILIO_AUTH_TOKEN')

    for (media_url, mime_type) in media_files:
        file_extension = mimetypes.guess_extension(mime_type)
        media_sid = os.path.basename(urlparse(media_url).path)
        # Fetch media with HTTP Basic Authentication
        content = requests.get(media_url, auth=(account_sid, auth_token)).text
        filename = '{sid}{ext}'.format(sid=media_sid, ext=file_extension)

        mms_media = MMSMedia(
            filename=filename,
            mime_type=mime_type,
            media_sid=media_sid,
            message_sid=message_sid,
            media_url=media_url,
            content=content)
        mms_media.save()

    response = MessagingResponse()
    message = 'Send us an image!' if not num_media else 'Thanks for the {} images.'.format(num_media)
    response.message(body=message, to=from_number, from_=os.getenv('TWILIO_NUMBER'))
    return response


def delete_media_file(filename=None):
    m = MMSMedia.objects.get(filename=filename)
    _twilio_client().api.messages(m.message_sid) \
        .media(m.media_sid) \
        .delete()
    m.delete()

    return m.content, m.mime_type


def fetch_all_media():
    return map(lambda mms: mms.filename, MMSMedia.objects.all())


def _twilio_client():
    account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    auth_token = os.getenv('TWILIO_AUTH_TOKEN')

    return Client(account_sid, auth_token)
```

## Process MMS images

### Save the media URLs

Depending on your use case, storing the URLs of the images (or videos or whatever) may be all you need. Accessing these media files requires HTTP Basic Authentication. There are two key features to these URLs:

1. They require HTTP Basic Authentication to access.
2. They are permanent (unless you explicitly delete the media).

> \[!WARNING]
>
> Twilio enforces [HTTP Basic Authentication](/docs/glossary/what-is-basic-authentication) for all media URLs. Authenticate using an [API key](/docs/iam/api-keys) as the username and an API key secret as the password. You can also use your Account SID and Auth Token when testing locally.

If you need to display images in a browser without authentication, you should download the media files and serve them from your own server or a cloud storage service.

### Save media to local file system

If you want to save the media attachments to a file, then you will need to make an HTTP request to the media URL and write the response stream to a file. If you need a unique filename, you can use the last part of the media URL. For example, suppose your media URL is the following:

```bash
https://api.twilio.com/2010-04-01/Accounts/ACxxxx/Messages/MMxxxx/Media/ME27be8a708784242c0daee207ff73db67
```

You can use that last part of the URL as a unique filename and look up the corresponding file extension for the mime type.

```py title="Handle Incoming SMS Endpoints - Django"
# !mark(20:34)
import os
import mimetypes
import requests

from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
from core.models import MMSMedia

# Python 2 and 3: alternative 4
try:
    from urllib.parse import urlparse
except ImportError:
    from urlparse import urlparse


def reply_with_twiml_message(message_sid, from_number, num_media, media_files):
    if not from_number or not message_sid:
        raise Exception('Please provide a From Number and a Message Sid')

    account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    auth_token = os.getenv('TWILIO_AUTH_TOKEN')

    for (media_url, mime_type) in media_files:
        file_extension = mimetypes.guess_extension(mime_type)
        media_sid = os.path.basename(urlparse(media_url).path)
        # Fetch media with HTTP Basic Authentication
        content = requests.get(media_url, auth=(account_sid, auth_token)).text
        filename = '{sid}{ext}'.format(sid=media_sid, ext=file_extension)

        mms_media = MMSMedia(
            filename=filename,
            mime_type=mime_type,
            media_sid=media_sid,
            message_sid=message_sid,
            media_url=media_url,
            content=content)
        mms_media.save()

    response = MessagingResponse()
    message = 'Send us an image!' if not num_media else 'Thanks for the {} images.'.format(num_media)
    response.message(body=message, to=from_number, from_=os.getenv('TWILIO_NUMBER'))
    return response


def delete_media_file(filename=None):
    m = MMSMedia.objects.get(filename=filename)
    _twilio_client().api.messages(m.message_sid) \
        .media(m.media_sid) \
        .delete()
    m.delete()

    return m.content, m.mime_type


def fetch_all_media():
    return map(lambda mms: mms.filename, MMSMedia.objects.all())


def _twilio_client():
    account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    auth_token = os.getenv('TWILIO_AUTH_TOKEN')

    return Client(account_sid, auth_token)
```

Another idea for these image files could be uploading them to a cloud storage service like [Azure Blob Storage](https://docs.microsoft.com/en-us/azure/storage/storage-dotnet-how-to-use-blobs) or [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/HLuploadFileDotNet.html). You could also save them to a database, if necessary. They're just regular files at this point - let your DevOps creativity run free! In this case, we are saving them to the public directory in order to serve them later.

### Delete media from Twilio

If you are downloading the attachments and no longer need them to be stored by Twilio, you can delete them by sending an `HTTP DELETE` request to the media URL. You will need to be authenticated to do this. The code below demonstrates how to make this request.

```py title="Delete Media From Twilio Servers"
# !mark(41:48)
import os
import mimetypes
import requests

from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
from core.models import MMSMedia

# Python 2 and 3: alternative 4
try:
    from urllib.parse import urlparse
except ImportError:
    from urlparse import urlparse


def reply_with_twiml_message(message_sid, from_number, num_media, media_files):
    if not from_number or not message_sid:
        raise Exception('Please provide a From Number and a Message Sid')

    for (media_url, mime_type) in media_files:
        file_extension = mimetypes.guess_extension(mime_type)
        media_sid = os.path.basename(urlparse(media_url).path)
        content = requests.get(media_url).text
        filename = '{sid}{ext}'.format(sid=media_sid, ext=file_extension)

        mms_media = MMSMedia(
            filename=filename,
            mime_type=mime_type,
            media_sid=media_sid,
            message_sid=message_sid,
            media_url=media_url,
            content=content)
        mms_media.save()

    response = MessagingResponse()
    message = 'Send us an image!' if not num_media else 'Thanks for the {} images.'.format(num_media)
    response.message(body=message, to=from_number, from_=os.getenv('TWILIO_NUMBER'))
    return response


def delete_media_file(filename=None):
    m = MMSMedia.objects.get(filename=filename)
    _twilio_client().api.messages(m.message_sid) \
        .media(m.media_sid) \
        .delete()
    m.delete()

    return m.content, m.mime_type


def fetch_all_media():
    return map(lambda mms: mms.filename, MMSMedia.objects.all())


def _twilio_client():
    account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    auth_token = os.getenv('TWILIO_AUTH_TOKEN')

    return Client(account_sid, auth_token)
```

> \[!WARNING]
>
> Twilio supports HTTP Basic and Digest Authentication. Authentication allows you to password protect your TwiML URLs on your web server so that only you and Twilio can access them. Learn more about HTTP authentication and validating incoming requests [here](/docs/usage/security#http-authentication).

## What's Next?

All the code, in a complete working project, is [available on GitHub](https://github.com/TwilioDevEd/receive-mms-node). If you need to dig a bit deeper, you can head over to our API Reference and learn more about the [Twilio webhook request](/docs/messaging/twiml) and the [REST API Media resource](/docs/messaging/api/media-resource). Also, you will want to be aware of the [pricing](https://www.twilio.com/en-us/sms/pricing/us) for storage of all the media files that you keep on Twilio's servers.

[We'd love to hear](/help/contact) what you build with this.
