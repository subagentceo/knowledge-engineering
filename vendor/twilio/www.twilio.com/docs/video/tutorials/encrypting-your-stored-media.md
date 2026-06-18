# Encrypting your Stored Media

> \[!NOTE]
>
> Encryption is available to Twilio Enterprise Edition and Twilio Security Edition customers. Learn more about [Editions](https://www.twilio.com/en-us/editions).

## Overview

This guide explains how to encrypt Twilio Video Recordings and Compositions.

**Note: Once you activate encryption, only you will be able to decipher.
No one at Twilio --including Twilio support-- will be able to decrypt your content.**

Use this feature when you need to ensure that your recorded media is encrypted
end-to-end, and you are willing to accept the additional work of decrypting and
post-processing your audio/video recordings yourself.

## Contents

* [Encrypted Recordings Vs Encrypted Compositions](#recordings-vs-compositions)
* [How Encryption works](#how-encryption-works)
* [Enabling Encryption in your Twilio account](#enabling-encryption-in-your-twilio-account)
  * [Step 1: Generate a RSA key pair](#step-1)
  * [Step 2: Create a Twilio Public Key resource](#step-2)
  * [Step 3: Enabling Encryption in your Account](#step-3)
    * [Enabling Encrypted Recordings](#step-3-recordings)
    * [Enabling Encrypted Compositions](#step-3-compositions)
* [Decrypting your Recordings and Compositions](#decrypting)
  * [Step 4: Decrypting using a Java utility program](#step-4)
    * [Step 4.1: Install Java Cryptography Extensions](#step-4-1)
    * [Step 4.2: Convert your private key to PKCS #8 format](#step-4-2)
    * [Step 4.3: Decrypt using the Java utility program](#step-4-3)
  * [Step 5: Decrypting using Command Line Tools](#step-5)
    * [Step 5.1: Obtain the encrypted media URL](#step-5-1)
    * [Step 5.2: Download the encrypted file and collect its headers](#step-5-2)
    * [Step 5.3: Obtain the AES encryption key and the initialization vector](#step-5-3)
    * [Step 5.4: Decrypt your media files](#step-5-4)

## Encrypted Recordings Vs Encrypted Compositions \[#recordings-vs-compositions]

Video Recordings and Video Compositions have separated encryption settings. This
means that encryption can be activated independently on them. However, composing
Recordings requires access to their raw media. As a result:

**If you encrypt your Recordings, you will not be able to compose them.**

If you need to compose your Recordings, you must store them unencrypted.
However, those Recordings are only needed temporarily: as soon as the Composition
is created they can be deleted permanently and irrevocably using Twilio's Video
Recordings API.

## How Encryption works \[#how-encryption-works]

Twilio Video uses [the standard WebRTC security architecture](https://tools.ietf.org/html/draft-ietf-rtcweb-security-arch-13) to
guarantee that the live audio/video communication is cryptographically
protected point-to-point.

When you enable Recording in your Rooms, audio/video is decrypted in memory
before being stored securely in Twilio's cloud. Once stored, you can only access the
decrypted recordings using your Twilio account credentials (your Account
SID/Token or an API Key/API Key Secret).

When you enable encryption in your Video Recordings or Compositions, Twilio adds
an additional layer of security: All the media files are encrypted as they are
written to disk using the AES 256-bit symmetric encryption algorithm. Once
encrypted, only a user who has the private key can decrypt the recordings.

Programmable Video uses an encryption mechanism provided by Amazon clients
called "envelope encryption". Here is how it works:

* First, you create a public cryptography key pair. You provide to Twilio the
  public key, but you keep the private key secret and safe.
* For each encrypted Recording or Composition, a one-time-use 256-bit envelope
  symmetric cryptographic key is generated and fed to an `AES/CBC/PKCS5Padding`
  cipher that encrypts the envelope payload (i.e the media content), and generates
  the protected file.
* The envelope symmetric key is then ciphered itself with the provided public
  key and stored as part of the envelope. After that, the symmetric key is
  discarded and cannot be recovered by Twilio never again.

Only a user with the private key can decrypt the media content as the original
AES symmetric key cannot be recovered. This mechanism guarantees that unencrypted
media files are never persisted, and that Twilio cannot decrypt the envelope
once it is generated.

## Enabling Encryption in your Twilio account \[#enabling-encryption-in-your-twilio-account]

### Step 1: Generate a RSA key pair \[#step-1]

First, generate an RSA PKCS#1 key pair. There are many different ways to do this,
but the simplest one is to use [openssl](https://www.openssl.org/). Once you have
openssl installed, you can generate a 2048 length private key with this command:

```bash
openssl genrsa -out private_key.pem 2048
```

The generated file `private_key.pem` contains your private key, which should be
similar to this:

```bash
$ cat private_key.pem

-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAtePBUk3IM45Jj8eFFrmwzjr/2seEtMknl5OD7VDBipazsq5v
.
.
.
h1icaQZp8WKxBOzVilj3DLoHJEyIrsWWMnDHazV4fxbxijpj4uwJCw==
-----END RSA PRIVATE KEY-----
```

**Note: It is your responsibility to keep your private key safe. If you loose
your private key you will *never* be able to decrypt any of the files stored
using on the corresponding public key.**

You can obtain the public key executing the following:

```bash
openssl rsa -in private_key.pem -pubout -out public_key.pem
```

The file `public_key.pem` contains the public key. It should look like this:

```bash
$ cat public_key.pem

-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtePBUk3IM45Jj8eFFrmw
.
.
.
aQIDAQAB
-----END PUBLIC KEY-----
```

In the next step, you will configure Twilio with this public key.

### Step 2: Create a Twilio Public Key resource \[#step-2]

> \[!WARNING]
>
> Twilio is launching a new Console. Some screenshots on this page may show the Legacy Console and therefore may no longer be accurate. We are working to update all screenshots to reflect the new Console experience. [Learn more about the new Console](https://www.twilio.com/blog/new-and-improved-console-now-in-general-availability).

Once you have the RSA public key, you must create a Twilio Public Key resource
that contains your public key. You can do this with the [Public Key Resource REST API](/docs/iam/credentialpublickey-resource) or, in
the [Twilio Console in the Runtime Public Keys management page](https://www.twilio.com/console/runtime/credentials/public-keys). Press
the button *Create new Public key*:

![Twilio credentials page with no public keys and a button to create a new public key.](https://docs-resources.prod.twilio.com/b795ff9586f927930a1bae5232af0647b47a65ba24a6adc0296e308ada507f49.png)

On the popup that opens, provide a friendly name for your public key. Then, copy
the content of the `public_key.pem` file generated in [step 1](#step-1) and paste
it into the PUBLIC KEY field. Press *Create* to create the Twilio Public Key:

![New Credential window with fields for Friendly Name, Type, and Public Key, plus Create and Cancel buttons.](https://docs-resources.prod.twilio.com/61d253fde054eca8b3b67a41dc8454f4d0c742dd25a77d83e777f53ad7518926.png)

The Twilio Public Key resource has an associated unique SID identifier with the
form `CRxx`. Make note of this Public Key SID because you will need it later:

![Twilio Credentials page displaying public keys, including "my-own-public-key" with SID and creation date.](https://docs-resources.prod.twilio.com/b45618e6b6b1f49716acc854383c9d7ad3cd94e642e359e95a2d11d1b0e59a74.png)

### Step 3: Enabling Encryption in your Account \[#step-3]

#### Enabling Encrypted Recordings \[#step-3-recordings]

You have two options to enable encrypted Recordings:

**Enabling Encrypted Recordings using the Twilio's Console**

* Open the Twilio's Console in your account or project.
* Navigate to [*Programmable Video > Recordings > Settings*](https://www.twilio.com/console/video/recordings/settings).
* Enable Encryption and specify the public key you uploaded in [step 2](#step-2).
* Save your settings.
* All recordings created thereafter will be encrypted.

![Recording settings page to save to S3 bucket (deactivated) and encrypt media tracks (activated) with a public key.](https://docs-resources.prod.twilio.com/6da2104f8984d20d295009b5a4d15dff9f55a4714e48a1c6e2ea87acc962ce20.png)

**Enabling Encryption using the Recording Settings API**

Check the [Recording Settings API documentation](/docs/video/api/encrypted-recordings) for detailed information on how to enable programmatically encrypted recordings.

#### Enabling Encrypted Compositions \[#step-3-compositions]

You have two options to enable encrypted Compositions:

**Enabling Encrypted Compositions using the Twilio's Console**

* Open the Twilio's Console in your account or project.
* Navigate to [*Programmable Video > Compositions > Settings*](https://www.twilio.com/console/video/compositions/settings).
* Enable Encryption and specify the public key you uploaded in [step 2](#step-2).
* Save your settings.
* All compositions created thereafter will be encrypted.

![Compositions settings with "Cryptographically Protect Compositions" activated and a "Save" button.](https://docs-resources.prod.twilio.com/e9ea1134f101c9dd2a3781c4dae17b71b52a78d6c3b45350a539a4b218cf2e0a.png)

**Enabling Encryption using the Composition Settings API**

Check the [Composition Settings API documentation](/docs/video/api/encrypted-compositions) for detailed information on how to enable programmatically encrypted compositions.

## Decrypting your Recordings and Compositions \[#decrypting]

We suggest two decrypting alternatives:

* **Alternative 1**: To use a Java utility program. See [step 4](#step-4) for instructions.
* **Alternative 2**: To do it step by step using command line tools. See [step 5](#step-5) for instructions.

### Step 4: Decrypting using a Java utility program \[#step-4]

Here we provide instructions on how to write a Java program performing the
decryption.

#### Step 4.1: Install Java Cryptography Extensions \[#step-4-1]

If you are using Oracle's JRE, and due to legal restrictions, you need to install
separately the JCE (Java Cryptography extensions). For doing so, just [download the JCE](https://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html),
decompress it and follow the instructions provided in the included `README.txt` file.

#### Step 4.2: Convert your private key to PKCS #8 format \[#step-4-2]

JCE requires your private key to be in PKCS #8 format, for converting it, you
just need to execute the following:

```bash
openssl pkcs8 -in private_key.pem -topk8 -nocrypt -out private_key_pkcs8.pem
```

In the above:

* `private_key.pem` is the filename of the private key you generated in Step 1.
* `private_key_pkcs8.pem` is the filename of your PKCS #8 private key.

#### Step 4.3: Decrypt using the Java utility program \[#step-4-3]

The Java decrypting utility can be cloned from this [GitHub project](https://github.com/twilio/twilio-recordings-decrypter). After cloning,
execute the following Maven command at its root folder:

```bash
mvn clean package
```

Once the compilation is completed, do the following:

```bash
java -jar target/twilio-media-decrypter.jar SKxx:API_SECRET SidToDecrypt private_key_pkcs8.pem decrypted-filename
```

In the above:

* Replace `SKxx` with your Twilio API Key SID.
* Replace `SK_SECRET` with the corresponding Twilio API Key Secret.
* Replace `SidToDecrypt` with the SID of the Recording (e.g. RTXXXX) or
  Composition (e.g. CJXXXX) you want to decrypt.
* `private_key_pkcs8.pem` is the filename of the PKCS #8 key you generated in
  [step 4.2](#step-4-2)
* `decrypted-filename` is the name of the file where you want to store your
  decrypted media data. You may wish to add the appropriate extension so that
  your media player recognizes it (e.g. `.mkv` for video recordings, `.mka` for
  audio recordings, `.mp4` or `.webm` for Compositions, etc.)

Remember that this Java utility is provided for tutorial purposes and is not
intended to be used in production applications.

### Step 5: Decrypting using Command Line Tools \[#step-5]

#### Step 5.1: Obtain the encrypted media URL \[#step-5-1]

You can retrieve the media data of a specific Recording or Composition by
fetching its `/Media` subresource. Any request to this resource will return a
URL where the corresponding media file can be downloaded, you just need to
do the following:

**For Recordings**

```bash
curl 'https://video.twilio.com/v1/Recordings/RTxx/Media' \
  -u 'SKxx:SK_SECRET'
```

**For Compositions**

```bash
curl 'https://video.twilio.com/v1/Compositions/CJxx/Media' \
  -u 'SKxx:SK_SECRET'
```

In the above:

* Replace `RTxx` or `CJxx` with the corresponding Recording or Composition SID.
* Replace `SKxx` with your Twilio API Key SID.
* Replace `SK_SECRET` with the corresponding Twilio API Key Secret.

In both cases, as part of the answer to the request you will receive a redirect
to a URL with the following structure:

`https://documentation-example-twilio-bucket.s3.amazonaws.com/ACxx/RTyy.mkv?X-Amz-Security-Token=zz`

We call this the *encrypted media URL*.

#### Step 5.2: Download the encrypted file and collect its headers \[#step-5-2]

Execute the following command replacing:

* `encrypted-media-url` with the *encrypted media URL* obtained in [step 5.1](#step-5-1).
* `encrypted-filename` with the filename where you want to store the encrypted data.

`wget -S encrypted-media-url -O encrypted-filename`

When a media file is cryptographically protected, a request to the encrypted
media URL returns the encrypted file, along with an initialization vector and
the encrypted one-time symmetric master key at the HTTP headers
`x-amz-meta-x-amz-iv` and `x-amz-meta-x-amz-key`. To obtain both take a look to
the output of the command above:

```bash
Resolving documentation-example-twilio-bucket.s3.amazonaws.com... 52.216.64.96
Connecting to documentation-example-twilio-bucket.s3.amazonaws.com|52.216.64.96|:443... connected.
HTTP request sent, awaiting response...
  HTTP/1.1 200 OK
  x-amz-id-2: 8x0XN6KDeLuhHLIe8fa58OdD3+xVyNgv2og/gpMOFpSqWc5JGV+aDpc7fJSCS9yGkwRtey+9lk8=
  x-amz-request-id: 5B3FBF0985E71EEC
  Date: Fri, 24 Nov 2017 14:11:30 GMT
  Last-Modified: Thu, 23 Nov 2017 16:47:17 GMT
  ETag: "d9e5869fc33019fc7fb055c0b705e105"
  x-amz-meta-x-amz-key: 0ZY1jiGSu/FlI4l1OnNFeWvWFXUOEQ2apv3/OtMFlwLO83bHlB44gbZe2SW6wOBs8UTsxC7bEnY+Gn2tdzp7ltzrKtBu7cfMzOxshABFiiJbCSBmOzUHs3OkU30Wi3Hq953SJJO+4W0DAINfhGiDlWxgIbjHegamneJ983DDpm+AyKa77jq5T+4LxJdOv5bqU4ioZKetv/OA987JZaetPVTr55uSmqr8SbsX9xmaIKjo7V6ivutwcCKWX9bvf1qxUu/ZohTmouL2MOocojNMMx5ovTX3QXLCGUwx6pOS83zqHNxmFhU2EHENCs5KNYL6GjhOwmoGyeQPS+pe8bPRFg==
  x-amz-meta-x-amz-unencrypted-content-length: 746518
  x-amz-meta-x-amz-matdesc: {}
  x-amz-meta-x-amz-iv: EmKjzVpvXC9rE6DJ00Xv7Q==
  Accept-Ranges: bytes
  Content-Type: application/octet-stream
  Content-Length: 746528
  Server: AmazonS3
Length: 746528 (729K) [application/octet-stream]
Saving to: 'encrypted-filename'

encrypted-filename               100%[=======================================================================>] 729.03K   789KB/s    in 0.9s

2017-11-24 15:11:33 (789 KB/s) - 'encrypted-filename' saved [746528/746528]
```

As you can see, both headers `x-amz-meta-x-amz-key` and `x-amz-meta-x-amz-iv`
are provided. Write down their values: you will need them.

#### Step 5.3: Obtain the AES encryption key and the initialization vector \[#step-5-3]

The encrypted envelope symmetric key in `x-amz-meta-x-amz-key` is base64-encoded.
We need first to decode it. For it, replace in, the command below, `0ZY1jiGSu ...`
with the value of the `x-amz-meta-x-amz-key` obtained in [step 5.2](#step-5-2)

```bash
base64 -D << '0ZY1jiGSu ...' >> key.bin.enc
```

Now, we can decrypt the public key. For this, and assuming the `private_key.pem`
file you created in [step 1](#step-1) is on the local folder, execute:

```bash
openssl rsautl -decrypt -inkey private_key.pem -in key.bin.enc -out key.bin
```

Now, we need to do the same steps with the initialization vector. Execute the
following replacing the value of the `x-amz-meta-x-amz-iv` you obtained
in [step 5.2](#step-5-2):

```bash
base64 -D << 'EmKjzVpvXC9rE6DJ00Xv7Q==' >> iv.bin
```

Now, the unencrypted AES key and the initialization vector are respectively in
the `key.bin` and `iv.bin` files in your local folder.

#### Step 5.4: Decrypt your media files \[#step-5-4]

Once the previous steps have been completed, you just need to execute the
following for decrypting your encrypted file:

```bash
openssl enc -d -aes-256-cbc -in encrypted-filename -out decrypted-filename -K $(hexdump -v -e '/1 "%02X"' < key.bin) -iv $(hexdump -v -e '/1 "%02X"' < iv.bin)
```

In the above:

* `encrypted-file-name` is the name of the file where you stored your encrypted
  media file in [step 5.2](#step-5-2)
* `decrypted-filename` is the name of the file where you want to store your
  decrypted media data. You may wish to add the appropriate extension so that
  your media player recognizes it (e.g. `.mkv` for video recordings, `.mka` for
  audio recordings, `.mp4` or `.webm` for Compositions, etc.)
