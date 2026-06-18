# Using JSON Web Tokens for Increased Security - Iterable

## Using JSON Web Tokens for Increased Security

**Published by**

January 14, 2021

![](https://iterable.com/wp-content/uploads/2026/04/011421_JWT-Increased-Security_768x512.png)

JSON Web Tokens (“JWT”) are a widely used alternative to session cookies and other types of tokens used in requests or transactions between parties and have been gaining in popularity since their introduction many years ago. Recently Iterable added support for the use of JSON Web Tokens when authenticating API calls, for increased security especially in a mobile context. Let’s examine in detail what they are, where they came from, and why you might want to use them in your application.

### What are JSON Web Tokens?

JSON Web Tokens (pronounced “jot”) are of course tokens—strings of characters that have certain characteristics. As you might expect by their name, these tokens contain JSON payloads, but also, each JWT carries its own signature with it.

The JSON payload part of the token makes certain claims (more on that later) and the signature part is easily verifiable and unforgeable. JWTs have been referred to as portable units of identity and self-encoded access tokens. A key property of JWTs is that in order to validate each JWT-containing request, you need only look at the token provided within the request—no need to contact a third-party service or keep the token in memory between requests. This is because they transmit their own authentication code in the token itself.

### A Brief History of JWT

Many years ago, some dedicated researchers recognized that since JSON was widely being used to transport data throughout the internet, it would be quite useful and more secure to define a standard signing mechanism for it. The oldest version of a specification for signed JSON that I found online was from September 2010 – JSON Simple Sign 1.0 draft 01. One of the authors of that document listed three original goals for this proposal:

*   Encryption Support
*   Algorithm Flexibility
*   Simplicity

This evolved into a JSON Web Token Internet-Draft (working document of the IETF) in July of 2011, which was in turn formalized in May 2015 as the open standard defined in the IETF document RFC 7519, and has been implemented extensively since then.

### JWT in Detail

A JWT is an encoded text string which is made up of three parts separated by dots. The three parts are the Header, the Payload, and the Signature, i.e. _[Header].[Payload].[Signature]._

#### The Header

The header typically consists of JSON specifying the signing algorithm and the token type, e.g.:

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-1.35.14-PM.png)

This JSON is then Base64Url encoded to form the first part of the JWT.

There are a couple of things to note about this. First, the header is _encoded_, not _encrypted_. The purpose of encoding strings is to improve data usability, so encoding algorithms are reversible by anyone, using publicly available schemes. Therefore, anyone who accesses your JWT can easily read the contents of the header. Next, Base64Url is a variant of Base64 encoding that is safe for use in URLs, since sometimes JWTs may be transmitted as parameters in URLs.

#### The Payload

The payload contains JSON specifying the claims (interesting user data) that are part of this token.

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-1.35.25-PM.png)

This JSON is also Base64Url encoded to form the second part of the JWT. There are three types of claims that can be included in the payload. **Registered** claims are predefined in the specification and have specific meanings. The handling of the non-time-based claims is application-specific. All time-based claims are expressed in seconds since the epoch. Some examples:

*   **aud** – audience
*   **sub** – subject
*   **iss** – issuer
*   **exp** – expiration time
*   **iat** – issued at
*   **nbf** – not before

**Private** claims are ad hoc values that are defined by the users (i.e. producers and consumers) of the JWT in order to share information, and typically contain identifying data for the user being referenced in the associated request.

**Public** claims are either given collision-resistant names (via a namespace prefix) or defined in a claims registry. Since the payload is encoded and not encrypted, any contained user data is not confidential and thus no sensitive data should be included (especially passwords!).

#### The Signature

The signature is used to validate that the data in the JWT has not been tampered with, so the signature does not contain JSON. Instead, it is created by taking the encoded header and the encoded payload and a secret password and hashing that using the algorithm that was specified in the header’s JSON.

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-1.35.40-PM.png)

Two common hashing algorithms in JWT are HMAC using SHA-256 (specified as HS256 in the JWT header JSON), and RSASSA PKCS1 v1.5 using SHA-256 (specified as RS256). RS256 provides somewhat stronger security because HS256 uses shared secrets (the same secret string is used to both sign and validate the JWT), while RS256 uses a public/private key pair (the JWT is signed using the private key and validated using the public key).

### Validating the JWT

To validate the JWT, simply extract the first 2 parts (header plus payload) from the token and then run the appropriate hash function on it, using either the shared secret or the public key, and then finally encode that result and compare it to the last part of the token that was passed.

Even if it matches, you are not quite done yet.

You must then validate all the claims that were passed in the payload. You should check all the time-based claims. Has it expired? Is it not valid yet? Using the issued at claim, you can even calculate the age of the JWT and reject it if it is too old according to your application’s needs. Finally, you should check any user information and confirm that it references a valid user of your application.

### Why Use JWT?

The following are some properties of JWT that make it an attractive token choice for many systems:

*   **Standard-Based** – RFC 7519
*   **Stateless** – Like HTTP, JWT is stateless. It is not necessary to keep the tokens in memory between requests.
*   **Self-Contained** – Since the tokens are self-contained and self-validating, nothing needs to be stored in a database or looked up.
*   **Good Performance** – In practice, JWTs can and are used at internet scale since as we have seen above, token parsing and validation are efficient operations.
*   **Portable** – Since JWTs are homogenous and not tied to any particular type of system, they are portable. A single token can be used with multiple backends.
*   **Mobile Friendly** – It is not necessary to use cookies when implementing JWT (if you opt to store the token, you can do it however you want). That, and the other above points, make JWT a good choice for mobile systems.
*   **Built-in Token Expiration** – Simply specify the exp claim in the payload of the JWT.
*   **Easy to Debug** – JWTs can be inspected during implementation and testing.
*   **Decentralized** – Your authentication server can be decoupled from your application server. The user can login to your auth server, get a JWT, and then use that to make calls to your application server.

### Why You Might Not Want to Use JWT

Not everybody is a JWT fan. Several articles bemoaning the use of JWT are just an internet search away. Here are some reasons why using JWT might not be appropriate for all systems:

*   **Reducing Database Lookups is Not Useful** – If your system is already hitting the database on every request, reducing lookups would not be helpful.
*   **Larger Tokens** – Since they include a signature, JWT are longer than some other types of tokens and the additional overhead may be detrimental for some systems.
*   **Desire for Opaque Tokens** – There are many who feel that tokens should be used and not examined.
*   **Difficult to Revoke** – Once a JWT is distributed, it is difficult to unexpectedly revoke it, since you cannot just update a database table row. For example, revoking might be necessary if the user’s account has been suspended.

### Examples of Practical Applications

JWTs are used to verify that a user is who they say they are, and to grant or deny rights to access resources.

Some systems use JWTs to **Authenticate API Requests**. In one common scenario, the API user first provides credentials on a login page, which returns the JWT once those credentials are validated. The payload in the returned JWT will contain user information, possibly user permissions, and any other claims that are important for the application.

Then, that JWT is passed in subsequent API calls as the `Authorization: Bearer` token (though it can also be sent in the POST body or as part of the URL). In the Iterable use case, our customers (developers of a mobile app) generate a JWT for each mobile app user, that is passed to the Iterable Mobile SDK which uses the JWT when making API calls to Iterable.

Some systems use JWTs for **Authorization**. Access to resources and operations can be controlled via claims in the JWT payload. For example, administrator access might be enabled by passing the `{“admin”:true}` claim.

**Single Sign-on (SSO) Systems**, which authenticate a single credential across multiple systems within one organization, widely use JWTs as access tokens. **Federated Identity Systems**, which offer single access to many applications across multiple enterprises, make use of different types of tokens via the OAuth 2.0 open standard. Though OAuth 2.0 does not specify a particular token format, JWT is a good match for some of these tokens and indeed many popular platforms use JWT for their OAuth 2.0 tokens. OpenID Connect (OIDC), which is built on top of OAuth 2.0, defines how to authenticate users and explicitly specifies JWT for some of its token parts, the ID token in particular.

### In Summary

Since being defined, JWT has continued to gain in popularity and usage. It has found its way into all major web frameworks, support for its use is widely implemented and it is an integral part of both OAuth 2.0 and OIDC. If you are considering using JWT for your system, make sure you keep the following best practices in mind:

*   Use an Appropriately Strong Hashing Algorithm
*   Always Perform All Validations – signature and payload
*   Pick Strong Keys – long and random
*   Use Different Keys for Different Systems
*   Specify Short Expiration Times – via the exp claim

Happy JWT-ing!