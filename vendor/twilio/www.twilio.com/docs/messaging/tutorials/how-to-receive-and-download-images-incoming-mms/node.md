# Receive and Download Images on Incoming Media Messages with Node.js

You know how to [receive and reply to incoming SMS messages](/docs/messaging/tutorials/how-to-receive-and-reply/csharp). What if you receive an MMS message containing an image you'd like to download? Let's learn how we can grab that image and any other incoming MMS media using Node.js.

## Create MMS processing project

### Create an Express application

When Twilio receives a message for your phone number, it can make an HTTP call to a webhook that you create. The easiest way to handle HTTP requests with Node is to use Express.

Twilio expects, at the very least, for your webhook to return a `200 OK` response if everything is peachy. Often, however, you will return some [TwiML](/docs/voice/twiml) in your response as well. TwiML is just a set of XML commands telling Twilio how you'd like it to respond to your message. Rather than manually generating the XML, we'll use the `Twilio.twiml.MessagingResponse` module in the SDK to facilitate generating TwiML and the rest of the webhook plumbing.

To install the library, run:

```bash
npm install twilio
```

### Create Router

Add a new router called MessagingRouter that handles an incoming SMS request.

```js title="Express Router"
// !mark(110:117)
const express = require('express');
const Twilio = require('twilio');
const extName = require('ext-name');
const urlUtil = require('url');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const config = require('../config');

const PUBLIC_DIR = './public/mms_images';
const { twilioPhoneNumber, twilioAccountSid, twilioAuthToken } = config;
const { MessagingResponse } = Twilio.twiml;
const { NODE_ENV } = process.env;

function MessagingRouter() {
  let twilioClient;
  let images = [];

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(path.resolve(PUBLIC_DIR));
  }

  function getTwilioClient() {
    return twilioClient || new Twilio(twilioAccountSid, twilioAuthToken);
  }

  function deleteMediaItem(mediaItem) {
    const client = getTwilioClient();

    return client
      .api.accounts(twilioAccountSid)
      .messages(mediaItem.MessageSid)
      .media(mediaItem.mediaSid).remove();
  }

  async function SaveMedia(mediaItem) {
    const { mediaUrl, filename } = mediaItem;
    if (NODE_ENV !== 'test') {
      const fullPath = path.resolve(`${PUBLIC_DIR}/${filename}`);

      if (!fs.existsSync(fullPath)) {
        // Create authorization header with Account SID and Auth Token
        const authHeader = 'Basic ' + Buffer.from(`${twilioAccountSid}:${twilioAuthToken}`).toString('base64');
        const response = await fetch(mediaUrl, {
          headers: {
            'Authorization': authHeader
          }
        });
        const fileStream = fs.createWriteStream(fullPath);

        response.body.pipe(fileStream);

        deleteMediaItem(mediaItem);
      }

      images.push(filename);
    }
  }


  async function handleIncomingSMS(req, res) {
    const { body } = req;
    const { NumMedia, From: SenderNumber, MessageSid } = body;
    let saveOperations = [];
    const mediaItems = [];

    for (var i = 0; i < NumMedia; i++) {  // eslint-disable-line
      const mediaUrl = body[`MediaUrl${i}`];
      const contentType = body[`MediaContentType${i}`];
      const extension = extName.mime(contentType)[0].ext;
      const mediaSid = path.basename(urlUtil.parse(mediaUrl).pathname);
      const filename = `${mediaSid}.${extension}`;

      mediaItems.push({ mediaSid, MessageSid, mediaUrl, filename });
      saveOperations = mediaItems.map(mediaItem => SaveMedia(mediaItem));
    }

    await Promise.all(saveOperations);

    const messageBody = NumMedia === 0 ?
    'Send us an image!' :
    `Thanks for sending us ${NumMedia} file(s)`;

    const response = new MessagingResponse();
    response.message({
      from: twilioPhoneNumber,
      to: SenderNumber,
    }, messageBody);

    return res.send(response.toString()).status(200);
  }


  function getRecentImages() {
    return images;
  }

  function clearRecentImages() {
    images = [];
  }

  function fetchRecentImages(req, res) {
    res.status(200).send(getRecentImages());
    clearRecentImages();
  }

  /**
   * Initialize router and define routes.
   */
  const router = express.Router();
  router.post('/incoming', handleIncomingSMS);
  router.get('/config', (req, res) => {
    res.status(200).send({ twilioPhoneNumber });
  });
  router.get('/images', fetchRecentImages);

  return router;
}

module.exports = {
  MessagingRouter,
};
```

## Receive MMS message and images

### Get Incoming Message Details

When Twilio calls your webhook, it sends a number of parameters about the message you just received. Most of these, such as the `To` phone number, the `From` phone number, and the `Body` of the message are available as properties of the request body.

### Get URLs to the Media

Since an MMS message can have multiple attachments, Twilio will send us form variables named `MediaUrlX`, where ***X*** is a zero-based index. So, for example, the URL for the first media attachment will be in the `MediaUrl0` parameter, the second in `MediaUrl1`, and so on.

In order to handle a dynamic number of attachments, we pull the URLs out of the body request like this:

```js title="Extract Media Urls From Request Body"
// !mark(61:72)
const express = require('express');
const Twilio = require('twilio');
const extName = require('ext-name');
const urlUtil = require('url');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const config = require('../config');

const PUBLIC_DIR = './public/mms_images';
const { twilioPhoneNumber, twilioAccountSid, twilioAuthToken } = config;
const { MessagingResponse } = Twilio.twiml;
const { NODE_ENV } = process.env;

function MessagingRouter() {
  let twilioClient;
  let images = [];

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(path.resolve(PUBLIC_DIR));
  }

  function getTwilioClient() {
    return twilioClient || new Twilio(twilioAccountSid, twilioAuthToken);
  }

  function deleteMediaItem(mediaItem) {
    const client = getTwilioClient();

    return client
      .api.accounts(twilioAccountSid)
      .messages(mediaItem.MessageSid)
      .media(mediaItem.mediaSid).remove();
  }

  async function SaveMedia(mediaItem) {
    const { mediaUrl, filename } = mediaItem;
    if (NODE_ENV !== 'test') {
      const fullPath = path.resolve(`${PUBLIC_DIR}/${filename}`);

      if (!fs.existsSync(fullPath)) {
        // Create authorization header with Account SID and Auth Token
        const authHeader = 'Basic ' + Buffer.from(`${twilioAccountSid}:${twilioAuthToken}`).toString('base64');
        const response = await fetch(mediaUrl, {
          headers: {
            'Authorization': authHeader
          }
        });
        const fileStream = fs.createWriteStream(fullPath);
    if (NODE_ENV !== 'test') {
      const fullPath = path.resolve(`${PUBLIC_DIR}/${filename}`);

      if (!fs.existsSync(fullPath)) {
        const response = await fetch(mediaUrl);
        const fileStream = fs.createWriteStream(fullPath);

        response.body.pipe(fileStream);

        deleteMediaItem(mediaItem);
      }

      images.push(filename);
    }
  }


  async function handleIncomingSMS(req, res) {
    const { body } = req;
    const { NumMedia, From: SenderNumber, MessageSid } = body;
    let saveOperations = [];
    const mediaItems = [];

    for (var i = 0; i < NumMedia; i++) {  // eslint-disable-line
      const mediaUrl = body[`MediaUrl${i}`];
      const contentType = body[`MediaContentType${i}`];
      const extension = extName.mime(contentType)[0].ext;
      const mediaSid = path.basename(urlUtil.parse(mediaUrl).pathname);
      const filename = `${mediaSid}.${extension}`;

      mediaItems.push({ mediaSid, MessageSid, mediaUrl, filename });
      saveOperations = mediaItems.map(mediaItem => SaveMedia(mediaItem));
    }

    await Promise.all(saveOperations);

    const messageBody = NumMedia === 0 ?
    'Send us an image!' :
    `Thanks for sending us ${NumMedia} file(s)`;

    const response = new MessagingResponse();
    response.message({
      from: twilioPhoneNumber,
      to: SenderNumber,
    }, messageBody);

    return res.send(response.toString()).status(200);
  }


  function getRecentImages() {
    return images;
  }

  function clearRecentImages() {
    images = [];
  }

  function fetchRecentImages(req, res) {
    res.status(200).send(getRecentImages());
    clearRecentImages();
  }

  /**
   * Initialize router and define routes.
   */
  const router = express.Router();
  router.post('/incoming', handleIncomingSMS);
  router.get('/config', (req, res) => {
    res.status(200).send({ twilioPhoneNumber });
  });
  router.get('/images', fetchRecentImages);

  return router;
}

module.exports = {
  MessagingRouter,
};
```

### Determine content type of media

Attachments to MMS messages can be of many different file types. [JPG](https://en.wikipedia.org/wiki/JPEG) and [GIF](https://en.wikipedia.org/wiki/GIF) images, as well as [MP4](https://en.wikipedia.org/wiki/MPEG-4_Part_14) and [3GP](https://en.wikipedia.org/wiki/3GP_and_3G2) files, are all common. Twilio handles the determination of the file type for you and you can get the standard mime type from the `MediaContentTypeX` parameter. If you are expecting photos, then you will likely see a lot of attachments with the mime type `image/jpeg`.

```js title="Map MIME Type To File Extension"
// !mark(64)
const express = require('express');
const Twilio = require('twilio');
const extName = require('ext-name');
const urlUtil = require('url');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const config = require('../config');

const PUBLIC_DIR = './public/mms_images';
const { twilioPhoneNumber, twilioAccountSid, twilioAuthToken } = config;
const { MessagingResponse } = Twilio.twiml;
const { NODE_ENV } = process.env;

function MessagingRouter() {
  let twilioClient;
  let images = [];

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(path.resolve(PUBLIC_DIR));
  }

  function getTwilioClient() {
    return twilioClient || new Twilio(twilioAccountSid, twilioAuthToken);
  }

  function deleteMediaItem(mediaItem) {
    const client = getTwilioClient();

    return client
      .api.accounts(twilioAccountSid)
      .messages(mediaItem.MessageSid)
      .media(mediaItem.mediaSid).remove();
  }

  async function SaveMedia(mediaItem) {
    const { mediaUrl, filename } = mediaItem;
    if (NODE_ENV !== 'test') {
      const fullPath = path.resolve(`${PUBLIC_DIR}/${filename}`);

      if (!fs.existsSync(fullPath)) {
        const response = await fetch(mediaUrl);
        const fileStream = fs.createWriteStream(fullPath);

        response.body.pipe(fileStream);

        deleteMediaItem(mediaItem);
      }

      images.push(filename);
    }
  }


  async function handleIncomingSMS(req, res) {
    const { body } = req;
    const { NumMedia, From: SenderNumber, MessageSid } = body;
    let saveOperations = [];
    const mediaItems = [];

    for (var i = 0; i < NumMedia; i++) {  // eslint-disable-line
      const mediaUrl = body[`MediaUrl${i}`];
      const contentType = body[`MediaContentType${i}`];
      const extension = extName.mime(contentType)[0].ext;
      const mediaSid = path.basename(urlUtil.parse(mediaUrl).pathname);
      const filename = `${mediaSid}.${extension}`;

      mediaItems.push({ mediaSid, MessageSid, mediaUrl, filename });
      saveOperations = mediaItems.map(mediaItem => SaveMedia(mediaItem));
    }

    await Promise.all(saveOperations);

    const messageBody = NumMedia === 0 ?
    'Send us an image!' :
    `Thanks for sending us ${NumMedia} file(s)`;

    const response = new MessagingResponse();
    response.message({
      from: twilioPhoneNumber,
      to: SenderNumber,
    }, messageBody);

    return res.send(response.toString()).status(200);
  }


  function getRecentImages() {
    return images;
  }

  function clearRecentImages() {
    images = [];
  }

  function fetchRecentImages(req, res) {
    res.status(200).send(getRecentImages());
    clearRecentImages();
  }

  /**
   * Initialize router and define routes.
   */
  const router = express.Router();
  router.post('/incoming', handleIncomingSMS);
  router.get('/config', (req, res) => {
    res.status(200).send({ twilioPhoneNumber });
  });
  router.get('/images', fetchRecentImages);

  return router;
}

module.exports = {
  MessagingRouter,
};
```

## Process MMS images

### Save the Media URLs

Depending on your use case, storing the URLs of the images (or videos or whatever) may be all you need. Accessing these media files requires HTTP Basic Authentication. There are two key features to these URLs:

1. They require HTTP Basic Authentication to access.
2. They are permanent (unless you explicitly delete the media).

> \[!WARNING]
>
> **Authentication required**: Twilio enforces [HTTP Basic Authentication](/docs/glossary/what-is-basic-authentication) for all media URLs. Authenticate using an [API key](/docs/iam/api-keys) as the username and an API key secret as the password. You can also use your Account SID and Auth Token when testing locally.

If you need to display images in a browser without authentication, you should download the media files and serve them from your own server or a cloud storage service.

### Save Media to Local File System

If you want to save the media attachments to a file, then you will need to make an HTTP request to the media URL and write the response stream to a file. If you need a unique filename, you can use the last part of the media URL. For example, suppose your media URL is the following:

```bash
https://api.twilio.com/2010-04-01/Accounts/ACxxxx/Messages/MMxxxx/Media/ME27be8a708784242c0daee207ff73db67
```

You can use that last part of the URL as a unique filename and look up the corresponding file extension for the mime type.

```js title="Save Media From Url"
// !mark(36:54,64:69)
const express = require('express');
const Twilio = require('twilio');
const extName = require('ext-name');
const urlUtil = require('url');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const config = require('../config');

const PUBLIC_DIR = './public/mms_images';
const { twilioPhoneNumber, twilioAccountSid, twilioAuthToken } = config;
const { MessagingResponse } = Twilio.twiml;
const { NODE_ENV } = process.env;

function MessagingRouter() {
  let twilioClient;
  let images = [];

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(path.resolve(PUBLIC_DIR));
  }

  function getTwilioClient() {
    return twilioClient || new Twilio(twilioAccountSid, twilioAuthToken);
  }

  function deleteMediaItem(mediaItem) {
    const client = getTwilioClient();

    return client
      .api.accounts(twilioAccountSid)
      .messages(mediaItem.MessageSid)
      .media(mediaItem.mediaSid).remove();
  }

  async function SaveMedia(mediaItem) {
    const { mediaUrl, filename } = mediaItem;
    if (NODE_ENV !== 'test') {
      const fullPath = path.resolve(`${PUBLIC_DIR}/${filename}`);

      if (!fs.existsSync(fullPath)) {
        // Create authorization header with Account SID and Auth Token
        const authHeader = 'Basic ' + Buffer.from(`${twilioAccountSid}:${twilioAuthToken}`).toString('base64');
        const response = await fetch(mediaUrl, {
          headers: {
            'Authorization': authHeader
          }
        });
        const fileStream = fs.createWriteStream(fullPath);

        response.body.pipe(fileStream);

        deleteMediaItem(mediaItem);
      }

      images.push(filename);
    }
  }


  async function handleIncomingSMS(req, res) {
    const { body } = req;
    const { NumMedia, From: SenderNumber, MessageSid } = body;
    let saveOperations = [];
    const mediaItems = [];

    for (var i = 0; i < NumMedia; i++) {  // eslint-disable-line
      const mediaUrl = body[`MediaUrl${i}`];
      const contentType = body[`MediaContentType${i}`];
      const extension = extName.mime(contentType)[0].ext;
      const mediaSid = path.basename(urlUtil.parse(mediaUrl).pathname);
      const filename = `${mediaSid}.${extension}`;

      mediaItems.push({ mediaSid, MessageSid, mediaUrl, filename });
      saveOperations = mediaItems.map(mediaItem => SaveMedia(mediaItem));
    }

    await Promise.all(saveOperations);

    const messageBody = NumMedia === 0 ?
    'Send us an image!' :
    `Thanks for sending us ${NumMedia} file(s)`;

    const response = new MessagingResponse();
    response.message({
      from: twilioPhoneNumber,
      to: SenderNumber,
    }, messageBody);

    return res.send(response.toString()).status(200);
  }


  function getRecentImages() {
    return images;
  }

  function clearRecentImages() {
    images = [];
  }

  function fetchRecentImages(req, res) {
    res.status(200).send(getRecentImages());
    clearRecentImages();
  }

  /**
   * Initialize router and define routes.
   */
  const router = express.Router();
  router.post('/incoming', handleIncomingSMS);
  router.get('/config', (req, res) => {
    res.status(200).send({ twilioPhoneNumber });
  });
  router.get('/images', fetchRecentImages);

  return router;
}

module.exports = {
  MessagingRouter,
};
```

Another idea for these image files could be uploading them to a cloud storage service like [Azure Blob Storage](https://docs.microsoft.com/en-us/azure/storage/storage-dotnet-how-to-use-blobs) or [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/HLuploadFileDotNet.html). You could also save them to a database, if necessary. They're just regular files at this point. Go crazy. In this case, we are saving them to the public directory in order to serve them later.

### Delete media from Twilio

If you are downloading the attachments and no longer need them to be stored by Twilio, you can delete them. You can send an `HTTP DELETE` request to the media URL and it will be deleted, but you will need to be authenticated to do this. The [Twilio Node SDK](https://github.com/twilio/twilio-node) can help with this, as shown here:

```js title="Delete Media From Twilio Servers"
// !mark(27:34)
const express = require('express');
const Twilio = require('twilio');
const extName = require('ext-name');
const urlUtil = require('url');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const config = require('../config');

const PUBLIC_DIR = './public/mms_images';
const { twilioPhoneNumber, twilioAccountSid, twilioAuthToken } = config;
const { MessagingResponse } = Twilio.twiml;
const { NODE_ENV } = process.env;

function MessagingRouter() {
  let twilioClient;
  let images = [];

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(path.resolve(PUBLIC_DIR));
  }

  function getTwilioClient() {
    return twilioClient || new Twilio(twilioAccountSid, twilioAuthToken);
  }

  function deleteMediaItem(mediaItem) {
    const client = getTwilioClient();

    return client
      .api.accounts(twilioAccountSid)
      .messages(mediaItem.MessageSid)
      .media(mediaItem.mediaSid).remove();
  }

  async function SaveMedia(mediaItem) {
    const { mediaUrl, filename } = mediaItem;
    if (NODE_ENV !== 'test') {
      const fullPath = path.resolve(`${PUBLIC_DIR}/${filename}`);

      if (!fs.existsSync(fullPath)) {
        const response = await fetch(mediaUrl);
        const fileStream = fs.createWriteStream(fullPath);

        response.body.pipe(fileStream);

        deleteMediaItem(mediaItem);
      }

      images.push(filename);
    }
  }


  async function handleIncomingSMS(req, res) {
    const { body } = req;
    const { NumMedia, From: SenderNumber, MessageSid } = body;
    let saveOperations = [];
    const mediaItems = [];

    for (var i = 0; i < NumMedia; i++) {  // eslint-disable-line
      const mediaUrl = body[`MediaUrl${i}`];
      const contentType = body[`MediaContentType${i}`];
      const extension = extName.mime(contentType)[0].ext;
      const mediaSid = path.basename(urlUtil.parse(mediaUrl).pathname);
      const filename = `${mediaSid}.${extension}`;

      mediaItems.push({ mediaSid, MessageSid, mediaUrl, filename });
      saveOperations = mediaItems.map(mediaItem => SaveMedia(mediaItem));
    }

    await Promise.all(saveOperations);

    const messageBody = NumMedia === 0 ?
    'Send us an image!' :
    `Thanks for sending us ${NumMedia} file(s)`;

    const response = new MessagingResponse();
    response.message({
      from: twilioPhoneNumber,
      to: SenderNumber,
    }, messageBody);

    return res.send(response.toString()).status(200);
  }


  function getRecentImages() {
    return images;
  }

  function clearRecentImages() {
    images = [];
  }

  function fetchRecentImages(req, res) {
    res.status(200).send(getRecentImages());
    clearRecentImages();
  }

  /**
   * Initialize router and define routes.
   */
  const router = express.Router();
  router.post('/incoming', handleIncomingSMS);
  router.get('/config', (req, res) => {
    res.status(200).send({ twilioPhoneNumber });
  });
  router.get('/images', fetchRecentImages);

  return router;
}

module.exports = {
  MessagingRouter,
};
```

> \[!WARNING]
>
> Twilio supports HTTP Basic and Digest Authentication. Authentication allows you to password protect your TwiML URLs on your web server so that only you and Twilio can access them. Learn more about HTTP authentication and validating incoming requests [here](/docs/usage/security#http-authentication).

## What's Next?

All the code, in a complete working project, is [available on GitHub](https://github.com/TwilioDevEd/receive-mms-node). If you need to dig a bit deeper, you can head over to our API Reference and learn more about the [Twilio webhook request](/docs/messaging/twiml) and the [REST API Media resource](/docs/messaging/api/media-resource). Also, you will want to be aware of the [pricing](https://www.twilio.com/en-us/sms/pricing/us) for storage of all the media files that you keep on Twilio's servers.

[We'd love to hear](/help/contact) what you build with this.
