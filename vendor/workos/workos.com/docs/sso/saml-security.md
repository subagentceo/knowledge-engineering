# SAML Security Considerations

SAML requests and responses each have their own unique confidentiality and integrity features.
To use [SAML](https://workos.com/docs/glossary/saml) with WorkOS, the only requirement is that the Identity Provider ([IdP](https://workos.com/docs/glossary/idp)) signs the assertions within the SAML authentication response.

However, you may have customers that have stricter configuration requirements or you may simply want to raise the security bar by following recommendations.
This document details what security features are available, how they can benefit you, your customer and their identity provider.

The parties involved in a SAML authentication request and response flow are:

- Identity Provider
- Service Provider ([SP](https://workos.com/docs/glossary/sp))
- User Agent, i.e. a browser

***

## SAML Binding Methods

WorkOS uses the HTTP Redirect binding to transmit SAML authentication requests from the SP to the IdP, and the HTTP POST binding to receive SAML responses from the IdP back to the SP:

- Redirect binding sends the request via HTTP GET, with the SAML message included in the URL.
- POST binding delivers the response via HTTP POST, with the SAML message in the form body.

***

## SP to IdP security features

The SAML authentication request is a way for the SP to request confirmation that the user they're presented with is who they're claiming to be.
It is relayed to the IdP via the user agent.

![SAML authentication request options](https://images.workoscdn.com/images/dc5df10c-50dc-4bb0-bede-26d16b197f20.png?auto=format\&fit=clip\&q=80)

### SAML request signing

To address the opportunity to spoof or tamper with a SAML request to the IdP, the IdP may require that all SP's sign the request.
To accommodate this there needs to be a pre-existing relationship between the SP and IdP where a key-pair is shared.
The IdP holds the public key (for verifying the request) and the SP holds the private key (for signing the request).

WorkOS recommends SAML request signing, this is especially important in cases where HTTPS is terminated or interrupted prior to reaching the IdP.

All of our requests embed the `<IssueInstant>` timestamp to allow the IdP to reject stale requests, however to mitigate tamper of this value request signing must be used.\
(See [SAML 2.0 Security Considerations](https://docs.oasis-open.org/security/saml/v2.0/saml-sec-consider-2.0-os.pdf) sections 5.2.1.2, 6.5.1 for more detail).

| Supported by WorkOS | Enabled by default | Usage recommendation              |
| ------------------- | ------------------ | --------------------------------- |
| Yes                 | No                 | Use with any IdP that supports it |

WorkOS supports SAML request signing for all compatible connection types. Please [contact WorkOS support](mailto:support@workos.com) to enable it.

***

## IdP to SP security features

The SAML response is an XML document provided by an IdP containing details about a user so that an SP can authenticate them.
It is relayed to the SP via the user agent.

![SAML authentication response options](https://images.workoscdn.com/images/f888365e-fa7d-4c1e-a76d-a19777e6cbb2.png?auto=format\&fit=clip\&q=80)

For reference in understanding the following features, below is a simplified hierarchy of the XML elements in a SAML Response:

```xml title="SAML response"
<Response>
  <Assertion>
    <AttributeStatement>
      <Attribute>
        <AttributeValue>...</AttributeValue>
      </Attribute>
    </AttributeStatement>
  </Assertion>
</Response>
```

### Signed response assertions

This is **required** by WorkOS for all SAML connections. It is a core requirement for SAML IdPs to implement as of SAML 2.0 (see [SAML 2.0 Profiles](https://docs.oasis-open.org/security/saml/v2.0/saml-profiles-2.0-os.pdf) section 4.1.3.5).

| Supported by WorkOS | Enabled by default | Usage recommendation                    |
| ------------------- | ------------------ | --------------------------------------- |
| Yes                 | Yes                | All WorkOS SAML connections must use it |

Signed response assertions are enabled in the setup steps when you [create a SAML connection](https://workos.com/docs/integrations/saml).

### Signed response message envelope

This is the complete signature over the SAML response payload.
In combination with an assertion signature it will provide additional integrity protection and is recommended by WorkOS (For details on threats addressed see [SAML Security Considerations](https://docs.oasis-open.org/security/saml/v2.0/saml-sec-consider-2.0-os.pdf) sections 7.1.1.6, 7.1.1.7).

| Supported by WorkOS | Enabled by default | Usage recommendation              |
| ------------------- | ------------------ | --------------------------------- |
| Yes                 | No                 | Use with any IdP that supports it |

Please [contact WorkOS support](mailto:support@workos.com) to enable signed response message envelope.

### Encrypted response assertion

The SAML assertions in the SAML response may contain sensitive data, and therefore there is an option to encrypt them to preserve confidentiality.

This feature is recommended in scenarios where the SAML response travels through HTTPS termination, so that accidental logging of sensitive data can be mitigated.

| Supported by WorkOS | Enabled by default | Usage recommendation              |
| ------------------- | ------------------ | --------------------------------- |
| Yes                 | No                 | Use with any IdP that supports it |

Please [contact WorkOS support](mailto:support@workos.com) to enable encrypted response assertion.

### Encrypted response attributes

The attribute statement is a sub-element of the assertion, some or all of the attributes in the statement can be encrypted as part of the SAML authentication protocol.

| Supported by WorkOS | Enabled by default | Usage recommendation                 |
| ------------------- | ------------------ | ------------------------------------ |
| No                  | No                 | Use **encrypted assertions** instead |

WorkOS does not currently support encrypted response attributes. It is recommended to use assertion encryption to envelope all the attributes if confidentiality is required.

## Implementing SSO with WorkOS

This document offers guidance to integrate Single Sign-On with our standalone API into your existing auth stack. You might also want to look at [AuthKit](https://workos.com/docs/authkit), a complete authentication platform that leverages Single Sign-On functionality out of the box, following best practices.
