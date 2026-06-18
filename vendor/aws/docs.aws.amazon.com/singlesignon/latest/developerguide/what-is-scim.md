

# What is the IAM Identity Center SCIM implementation?
<a name="what-is-scim"></a>

This reference guide helps software developers build custom integrations to provision (synchronize) users and groups into AWS IAM Identity Center using the System for Cross-domain Identity Management (SCIM) v2.0 protocol. This guide will also be useful to IT administrators who need to understand or debug an existing SCIM implementation.

**Note**  
IAM Identity Center uses the `sso` and `identitystore` API namespaces. 

The IAM Identity Center SCIM implementation is based on SCIM RFCs 7642 ([https://tools.ietf.org/html/rfc7642](https://tools.ietf.org/html/rfc7642)), 7643 ([https://tools.ietf.org/html/rfc7643](https://tools.ietf.org/html/rfc7643)), and 7644 ([https://tools.ietf.org/html/rfc7644](https://tools.ietf.org/html/rfc7644)), and the interoperability requirements laid out in the March 2020 draft of the FastFed Basic SCIM Profile 1.0 ([https://openid.net/specs/fastfed-scim-1_0-02.html#rfc.section.4](https://openid.net/specs/fastfed-scim-1_0-02.html#rfc.section.4)). Any differences between these documents and the current implementation in IAM Identity Center are described in the [Supported API operations](supported-apis.md) section of this guide.

The following sections contain examples of API requests and responses currently supported in the IAM Identity Center SCIM implementation, along with important notes and constraints to consider in your design.

Before you begin, we recommend that you first review [Considerations for using automatic provisioning](https://docs.aws.amazon.com/singlesignon/latest/userguide/provision-automatically.html#auto-provisioning-considerations) in the *IAM Identity Center User Guide*. That topic instructs you how to use SCIM to enable automatic provisioning in IAM Identity Center. You will need to follow those instructions to retrieve your SCIM endpoint and access token.