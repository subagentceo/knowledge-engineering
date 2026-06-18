---
title: Workers Logpush
description: Export encrypted AI Gateway logs to external storage using Workers Logpush.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers Logpush

AI Gateway allows you to securely export logs to an external storage location, where you can decrypt and process them. You can toggle Workers Logpush on and off in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) settings. This product is available on the Workers Paid plan. For pricing information, refer to [Pricing](https://developers.cloudflare.com/ai-gateway/reference/pricing).

This guide explains how to set up Workers Logpush for AI Gateway, generate an RSA key pair for encryption, and decrypt the logs once they are received.

You can store up to 10 million logs per gateway. If your limit is reached, new logs will stop being saved and will not be exported through Workers Logpush. To continue saving and exporting logs, you must delete older logs to free up space for new logs. Workers Logpush has a limit of 4 jobs and a maximum request size of 1 MB per log.

Note

To export logs using Workers Logpush, you must have logs turned on for the gateway.

Need a higher limit?

To request an increase to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/cuXu1QnQCrSNkkaS8). If the limit can be increased, Cloudflare will contact you with next steps.

## How logs are encrypted

We employ a hybrid encryption model efficiency and security. Initially, an AES key is generated for each log. This AES key is what actually encrypts the bulk of your data, chosen for its speed and security in handling large datasets efficiently.

Now, for securely sharing this AES key, we use RSA encryption. Here's what happens: the AES key, although lightweight, needs to be transmitted securely to the recipient. We encrypt this key with the recipient's RSA public key. This step leverages RSA's strength in secure key distribution, ensuring that only someone with the corresponding RSA private key can decrypt and use the AES key.

Once encrypted, both the AES-encrypted data and the RSA-encrypted AES key are sent together. Upon arrival, the recipient's system uses the RSA private key to decrypt the AES key. With the AES key now accessible, it is straightforward to decrypt the main data payload.

This method combines the best of both worlds: the efficiency of AES for data encryption with the secure key exchange capabilities of RSA, ensuring data integrity, confidentiality, and performance are all optimally maintained throughout the data lifecycle.

## Setting up Workers Logpush

To configure Workers Logpush for AI Gateway, follow these steps:

## 1\. Generate an RSA key pair locally

You need to generate a key pair to encrypt and decrypt the logs. This script will output your RSA privateKey and publicKey. Keep the private key secure, as it will be used to decrypt the logs. Below is a sample script to generate the keys using Node.js and OpenSSL.

* [ JavaScript ](#tab-panel-6564)
* [ OpenSSL ](#tab-panel-6565)

JavaScript

```

const crypto = require("crypto");


const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {

  modulusLength: 4096,

  publicKeyEncoding: {

    type: "spki",

    format: "pem",

  },

  privateKeyEncoding: {

    type: "pkcs8",

    format: "pem",

  },

});


console.log(publicKey);

console.log(privateKey);


```

Run the script by executing the below code on your terminal. Replace `file name` with the name of your JavaScript file.

Terminal window

```

node {file name}


```

1. Generate private key: Use the following command to generate a RSA private key:  
Terminal window  
```  
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:4096  
```
2. Generate public key: After generating the private key, you can extract the corresponding public key using:  
Terminal window  
```  
openssl rsa -pubout -in private_key.pem -out public_key.pem  
```

## 2\. Upload public key to gateway settings

Once you have generated the key pair, upload the public key to your AI Gateway settings. This key will be used to encrypt your logs. In order to enable Workers Logpush, you will need logs enabled for that gateway.

## 3\. Set up Logpush

To set up Logpush, refer to [Logpush](https://developers.cloudflare.com/logs/logpush/) documentation.

## 4\. Receive encrypted logs

After configuring Workers Logpush, logs will be sent encrypted using the public key you uploaded. To access the data, you will need to decrypt it using your private key. The logs will be sent to the object storage provider that you have selected.

## 5\. Decrypt logs

To decrypt the encrypted log bodies and metadata from AI Gateway, you can use the following Node.js script or OpenSSL:

* [ JavaScript ](#tab-panel-6566)
* [ OpenSSL ](#tab-panel-6567)

To decrypt the encrypted log bodies and metadata from AI Gateway, download the logs to a folder, in this case its named `my_log.log.gz`.

Then copy this JavaScript file into the same folder and place your private key in the top variable.

JavaScript

```

const privateKeyStr = `-----BEGIN RSA PRIVATE KEY-----

....

-----END RSA PRIVATE KEY-----`;


const crypto = require("crypto");

const privateKey = crypto.createPrivateKey(privateKeyStr);


const fs = require("fs");

const zlib = require("zlib");

const readline = require("readline");


async function importAESGCMKey(keyBuffer) {

  try {

    // Ensure the key length is valid for AES

    if ([128, 192, 256].includes(256)) {

      return await crypto.webcrypto.subtle.importKey(

        "raw",

        keyBuffer,

        {

          name: "AES-GCM",

          length: 256,

        },

        true, // Whether the key is extractable (true in this case to allow for export later if needed)

        ["encrypt", "decrypt"], // Use for encryption and decryption

      );

    } else {

      throw new Error("Invalid AES key length. Must be 128, 12, or 256 bits.");

    }

  } catch (error) {

    console.error("Failed to import key:", error);

    throw error;

  }

}


async function decryptData(encryptedData, aesKey, iv) {

  const decryptedData = await crypto.subtle.decrypt(

    { name: "AES-GCM", iv: iv },

    aesKey,

    encryptedData,

  );

  return new TextDecoder().decode(decryptedData);

}


async function decryptBase64(privateKey, data) {

  if (data.key === undefined) {

    return data;

  }


  const aesKeyBuf = crypto.privateDecrypt(

    {

      key: privateKey,

      oaepHash: "SHA256",

    },

    Buffer.from(data.key, "base64"),

  );

  const aesKey = await importAESGCMKey(aesKeyBuf);


  const decryptedData = await decryptData(

    Buffer.from(data.data, "base64"),

    aesKey,

    Buffer.from(data.iv, "base64"),

  );


  return decryptedData.toString();

}


async function run() {

  let lineReader = readline.createInterface({

    input: fs.createReadStream("my_log.log.gz").pipe(zlib.createGunzip()),

  });


  lineReader.on("line", async (line) => {

    line = JSON.parse(line);


    const { Metadata, RequestBody, ResponseBody, ...remaining } = line;


    console.log({

      ...remaining,

      Metadata: await decryptBase64(privateKey, Metadata),

      RequestBody: await decryptBase64(privateKey, RequestBody),

      ResponseBody: await decryptBase64(privateKey, ResponseBody),

    });

    console.log("--");

  });

}


run();


```

Run the script by executing the below code on your terminal. Replace `file name` with the name of your JavaScript file.

Terminal window

```

node {file name}


```

The script reads the encrypted log file `(my_log.log.gz)`, decrypts the metadata, request body, and response body, and prints the decrypted data. Ensure you replace the `privateKey` variable with your actual private RSA key that you generated in step 1.

1. Decrypt the encrypted log file using the private key.

Assuming that the logs were encrypted with the public key (for example `public_key.pem`), you can use the private key (`private_key.pem`) to decrypt the log file.

For example, if the encrypted logs are in a file named `encrypted_logs.bin`, you can decrypt it like this:

Terminal window

```

openssl rsautl -decrypt -inkey private_key.pem -in encrypted_logs.bin -out decrypted_logs.txt


```

* `-decrypt` tells OpenSSL that we want to decrypt the file.
* `-inkey private_key.pem` specifies the private key that will be used to decrypt the logs.
* `-in encrypted_logs.bin` is the encrypted log file.
* `-out decrypted_logs.txt`decrypted logs will be saved into this file.
1. View the decrypted logs Once decrypted, you can view the logs by simply running:

Terminal window

```

cat decrypted_logs.txt


```

This command will output the decrypted logs to the terminal.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/observability/logging/logpush/#page","headline":"Workers Logpush · Cloudflare AI Gateway docs","description":"Export encrypted AI Gateway logs to external storage using Workers Logpush.","url":"https://developers.cloudflare.com/ai-gateway/observability/logging/logpush/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/observability/logging/","name":"Logging"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/observability/logging/logpush/","name":"Workers Logpush"}}]}
```
