---
title: Web Crypto
description: A set of low-level functions for common cryptographic tasks.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Web Crypto

## Background

The Web Crypto API provides a set of low-level functions for common cryptographic tasks. The Workers runtime implements the full surface of this API, but with some differences in the [supported algorithms](#supported-algorithms) compared to those implemented in most browsers.

Performing cryptographic operations using the Web Crypto API is significantly faster than performing them purely in JavaScript. If you want to perform CPU-intensive cryptographic operations, you should consider using the Web Crypto API.

The Web Crypto API is implemented through the `SubtleCrypto` interface, accessible via the global `crypto.subtle` binding. A simple example of calculating a digest (also known as a hash) is:

JavaScript

```

const myText = new TextEncoder().encode('Hello world!');


const myDigest = await crypto.subtle.digest(

  {

    name: 'SHA-256',

  },

  myText // The data you want to hash as an ArrayBuffer

);


console.log(new Uint8Array(myDigest));


```

Some common uses include [signing requests](https://developers.cloudflare.com/workers/examples/signing-requests/).

Warning

The Web Crypto API differs significantly from the [Node.js Crypto API](https://developers.cloudflare.com/workers/runtime-apis/nodejs/crypto/). If you are working with code that relies on the Node.js Crypto API, you can use it by enabling the [nodejs\_compat compatibility flag](https://developers.cloudflare.com/workers/runtime-apis/nodejs/).

---

## Constructors

* `crypto.DigestStream(algorithm)` DigestStream  
   * A non-standard extension to the `crypto` API that supports generating a hash digest from streaming data. The `DigestStream` itself is a [WritableStream](https://developers.cloudflare.com/workers/runtime-apis/streams/writablestream/) that does not retain the data written into it. Instead, it generates a hash digest automatically when the flow of data has ended.

### Parameters

* `algorithm`string | object  
   * Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#Syntax).

### Usage

* [  JavaScript ](#tab-panel-12071)
* [  TypeScript ](#tab-panel-12072)

JavaScript

```

export default {

  async fetch(req) {

    // Fetch from origin

    const res = await fetch(req);


    // We need to read the body twice so we `tee` it (get two instances)

    const [bodyOne, bodyTwo] = res.body.tee();

    // Make a new response so we can set the headers (responses from `fetch` are immutable)

    const newRes = new Response(bodyOne, res);

    // Create a SHA-256 digest stream and pipe the body into it

    const digestStream = new crypto.DigestStream("SHA-256");

    bodyTwo.pipeTo(digestStream);

    // Get the final result

    const digest = await digestStream.digest;

    // Turn it into a hex string

    const hexString = [...new Uint8Array(digest)]

      .map(b => b.toString(16).padStart(2, '0'))

      .join('')

    // Set a header with the SHA-256 hash and return the response

    newRes.headers.set("x-content-digest", `SHA-256=${hexString}`);

    return newRes;

  }

}


```

TypeScript

```

export default {

  async fetch(req): Promise<Response> {

    // Fetch from origin

    const res = await fetch(req);


    // We need to read the body twice so we `tee` it (get two instances)

    const [bodyOne, bodyTwo] = res.body.tee();

    // Make a new response so we can set the headers (responses from `fetch` are immutable)

    const newRes = new Response(bodyOne, res);

    // Create a SHA-256 digest stream and pipe the body into it

    const digestStream = new crypto.DigestStream("SHA-256");

    bodyTwo.pipeTo(digestStream);

    // Get the final result

    const digest = await digestStream.digest;

    // Turn it into a hex string

    const hexString = [...new Uint8Array(digest)]

      .map(b => b.toString(16).padStart(2, '0'))

      .join('')

    // Set a header with the SHA-256 hash and return the response

    newRes.headers.set("x-content-digest", `SHA-256=${hexString}`);

    return newRes;

  }

} satisfies ExportedHandler;


```

## Methods

* `crypto.randomUUID()` : string  
   * Generates a new random (version 4) UUID as defined in [RFC 4122 ↗](https://www.rfc-editor.org/rfc/rfc4122.txt).
* `crypto.getRandomValues(bufferArrayBufferView)` : ArrayBufferView  
   * Fills the passed `ArrayBufferView` with cryptographically sound random values and returns the `buffer`.

### Parameters

* `buffer`ArrayBufferView  
   * Must be an Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | BigInt64Array | BigUint64Array.

## SubtleCrypto Methods

These methods are all accessed via [crypto.subtle ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto#Methods), which is also documented in detail on MDN.

### encrypt

* `encrypt(algorithm, key, data)` : Promise<ArrayBuffer>  
   * Returns a Promise that fulfills with the encrypted data corresponding to the clear text, algorithm, and key given as parameters.

#### Parameters

* `algorithm`object  
   * Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#Syntax).
* `key`CryptoKey
* `data`BufferSource

### decrypt

* `decrypt(algorithm, key, data)` : Promise<ArrayBuffer>  
   * Returns a Promise that fulfills with the clear data corresponding to the ciphertext, algorithm, and key given as parameters.

#### Parameters

* `algorithm`object  
   * Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt#Syntax).
* `key`CryptoKey
* `data`BufferSource

### sign

* `sign(algorithm, key, data)` : Promise<ArrayBuffer>  
   * Returns a Promise that fulfills with the signature corresponding to the text, algorithm, and key given as parameters.

#### Parameters

* `algorithm`string | object  
   * Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign#Syntax).
* `key`CryptoKey
* `data`ArrayBuffer

### verify

* `verify(algorithm, key, signature, data)` : Promise<boolean>  
   * Returns a Promise that fulfills with a Boolean value indicating if the signature given as a parameter matches the text, algorithm, and key that are also given as parameters.

#### Parameters

* `algorithm`string | object  
   * Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify#Syntax).
* `key`CryptoKey
* `signature`ArrayBuffer
* `data`ArrayBuffer

### digest

* `digest(algorithm, data)` : Promise<ArrayBuffer>  
   * Returns a Promise that fulfills with a digest generated from the algorithm and text given as parameters.

#### Parameters

* `algorithm`string | object  
   * Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#Syntax).
* `data`ArrayBuffer

### generateKey

* `generateKey(algorithm, extractable, keyUsages)` : Promise<CryptoKey> | Promise<CryptoKeyPair>  
   * Returns a Promise that fulfills with a newly-generated `CryptoKey`, for symmetrical algorithms, or a `CryptoKeyPair`, containing two newly generated keys, for asymmetrical algorithms. For example, to generate a new AES-GCM key:  
JavaScript  
```  
let keyPair = await crypto.subtle.generateKey(  
  {  
    name: 'AES-GCM',  
    length: 256,  
  },  
  true,  
  ['encrypt', 'decrypt']  
);  
```

#### Parameters

* `algorithm`object  
   * Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey#Syntax).
* `extractable`bool
* `keyUsages`Array  
   * An Array of strings indicating the [possible usages of the new key ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey#Syntax).

### deriveKey

* `deriveKey(algorithm, baseKey, derivedKeyAlgorithm, extractable, keyUsages)` : Promise<CryptoKey>  
   * Returns a Promise that fulfills with a newly generated `CryptoKey` derived from the base key and specific algorithm given as parameters.

#### Parameters

* `algorithm`object  
   * Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#Syntax).
* `baseKeyCryptoKey`
* `derivedKeyAlgorithmobject`  
   * Defines the algorithm the derived key will be used for in [an algorithm-specific format ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#Syntax).
* `extractablebool`
* `keyUsagesArray`  
   * An Array of strings indicating the [possible usages of the new key ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#Syntax)

### deriveBits

* `deriveBits(algorithm, baseKey, length)` : Promise<ArrayBuffer>  
   * Returns a Promise that fulfills with a newly generated buffer of pseudo-random bits derived from the base key and specific algorithm given as parameters. It returns a Promise which will be fulfilled with an `ArrayBuffer` containing the derived bits. This method is very similar to `deriveKey()`, except that `deriveKey()` returns a `CryptoKey` object rather than an `ArrayBuffer`. Essentially, `deriveKey()` is composed of `deriveBits()` followed by `importKey()`.

#### Parameters

* `algorithm`object  
   * Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveBits#Syntax).
* `baseKey`CryptoKey
* `length`int  
   * Length of the bit string to derive.

### importKey

* `importKey(format, keyData, algorithm, extractable, keyUsages)` : Promise<CryptoKey>  
   * Transform a key from some external, portable format into a `CryptoKey` for use with the Web Crypto API.

#### Parameters

* `format`string  
   * Describes [the format of the key to be imported ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#Syntax).
* `keyData`ArrayBuffer
* `algorithm`object  
   * Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#Syntax).
* `extractable`bool
* `keyUsages`Array  
   * An Array of strings indicating the [possible usages of the new key ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#Syntax)

### exportKey

* `exportKey(formatstring, keyCryptoKey)` : Promise<ArrayBuffer>  
   * Transform a `CryptoKey` into a portable format, if the `CryptoKey` is `extractable`.

#### Parameters

* `format`string  
   * Describes the [format in which the key will be exported ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey#Syntax).
* `key`CryptoKey

### wrapKey

* `wrapKey(format, key, wrappingKey, wrapAlgo)` : Promise<ArrayBuffer>  
   * Transform a `CryptoKey` into a portable format, and then encrypt it with another key. This renders the `CryptoKey` suitable for storage or transmission in untrusted environments.

#### Parameters

* `format`string  
   * Describes the [format in which the key will be exported ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/wrapKey#Syntax) before being encrypted.
* `key`CryptoKey
* `wrappingKey`CryptoKey
* `wrapAlgo`object  
   * Describes the algorithm to be used to encrypt the exported key, including any required parameters, in [an algorithm-specific format ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/wrapKey#Syntax).

### unwrapKey

* `unwrapKey(format, key, unwrappingKey, unwrapAlgo,  
 unwrappedKeyAlgo, extractable, keyUsages)` : Promise<CryptoKey>  
   * Transform a key that was wrapped by `wrapKey()` back into a `CryptoKey`.

#### Parameters

* `format`string  
   * Described the [data format of the key to be unwrapped ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax).
* `key`CryptoKey
* `unwrappingKey`CryptoKey
* `unwrapAlgo`object  
   * Describes the algorithm that was used to encrypt the wrapped key, [in an algorithm-specific format ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax).
* `unwrappedKeyAlgo`object  
   * Describes the key to be unwrapped, [in an algorithm-specific format ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax).
* `extractable`bool
* `keyUsages`Array  
   * An Array of strings indicating the [possible usages of the new key ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax)

### timingSafeEqual

* `timingSafeEqual(a, b)` : bool  
   * Compare two buffers in a way that is resistant to timing attacks. This is a non-standard extension to the Web Crypto API.

#### Parameters

* `a`ArrayBuffer | TypedArray
* `b`ArrayBuffer | TypedArray

### Supported algorithms

Workers implements all operations of the [WebCrypto standard ↗](https://www.w3.org/TR/WebCryptoAPI/), as shown in the following table.

A checkmark (✓) indicates that this feature is believed to be fully supported according to the spec.  
An x (✘) indicates that this feature is part of the specification but not implemented.  
If a feature only implements the operation partially, details are listed.

| Algorithm                    | sign()verify() | encrypt()decrypt() | digest() | deriveBits()deriveKey() | generateKey() | wrapKey()unwrapKey() | exportKey() | importKey() |
| ---------------------------- | -------------- | ------------------ | -------- | ----------------------- | ------------- | -------------------- | ----------- | ----------- |
| RSASSA PKCS1 v1.5            | ✓              | ✓                  | ✓        | ✓                       |               |                      |             |             |
| RSA PSS                      | ✓              | ✓                  | ✓        | ✓                       |               |                      |             |             |
| RSA OAEP                     | ✓              | ✓                  | ✓        | ✓                       | ✓             |                      |             |             |
| ECDSA                        | ✓              | ✓                  | ✓        | ✓                       |               |                      |             |             |
| ECDH                         | ✓              | ✓                  | ✓        | ✓                       |               |                      |             |             |
| Ed25519[1](#footnote-1)      | ✓              | ✓                  | ✓        | ✓                       |               |                      |             |             |
| X25519[1](#footnote-1)       | ✓              | ✓                  | ✓        | ✓                       |               |                      |             |             |
| NODE ED25519[2](#footnote-2) | ✓              | ✓                  | ✓        | ✓                       |               |                      |             |             |
| AES CTR                      | ✓              | ✓                  | ✓        | ✓                       | ✓             |                      |             |             |
| AES CBC                      | ✓              | ✓                  | ✓        | ✓                       | ✓             |                      |             |             |
| AES GCM                      | ✓              | ✓                  | ✓        | ✓                       | ✓             |                      |             |             |
| AES KW                       | ✓              | ✓                  | ✓        | ✓                       |               |                      |             |             |
| HMAC                         | ✓              | ✓                  | ✓        | ✓                       |               |                      |             |             |
| SHA 1                        | ✓              |                    |          |                         |               |                      |             |             |
| SHA 256                      | ✓              |                    |          |                         |               |                      |             |             |
| SHA 384                      | ✓              |                    |          |                         |               |                      |             |             |
| SHA 512                      | ✓              |                    |          |                         |               |                      |             |             |
| MD5[3](#footnote-3)          | ✓              |                    |          |                         |               |                      |             |             |
| HKDF                         | ✓              | ✓                  |          |                         |               |                      |             |             |
| PBKDF2                       | ✓              | ✓                  |          |                         |               |                      |             |             |

**Footnotes:**

1. Algorithms as specified in the [Secure Curves API ↗](https://wicg.github.io/webcrypto-secure-curves).
2. Legacy non-standard EdDSA is supported for the Ed25519 curve in addition to the Secure Curves version. Since this algorithm is non-standard, note the following while using it:  
   * Use `NODE-ED25519` as the algorithm and `namedCurve` parameters.  
   * Unlike NodeJS, Cloudflare will not support raw import of private keys.  
   * The algorithm implementation may change over time. While Cloudflare cannot guarantee it at this time, Cloudflare will strive to maintain backward compatibility and compatibility with NodeJS's behavior. Any notable compatibility notes will be communicated in release notes and via this developer documentation.
3. MD5 is not part of the WebCrypto standard but is supported in Cloudflare Workers for interacting with legacy systems that require MD5\. MD5 is considered a weak algorithm. Do not rely upon MD5 for security.

---

## Related resources

* [SubtleCrypto documentation on MDN ↗](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)
* [SubtleCrypto documentation as part of the W3C Web Crypto API specification ↗](https://www.w3.org/TR/WebCryptoAPI//#subtlecrypto-interface)
* [Example: signing requests](https://developers.cloudflare.com/workers/examples/signing-requests/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/web-crypto/#page","headline":"Web Crypto · Cloudflare Workers docs","description":"A set of low-level functions for common cryptographic tasks.","url":"https://developers.cloudflare.com/workers/runtime-apis/web-crypto/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/web-crypto/","name":"Web Crypto"}}]}
```
