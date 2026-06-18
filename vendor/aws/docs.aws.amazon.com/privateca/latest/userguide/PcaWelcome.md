

# What is AWS Private CA?
<a name="PcaWelcome"></a>

AWS Private CA enables creation of private certificate authority (CA) hierarchies, including root and subordinate CAs, without the investment and maintenance costs of operating an on-premises CA. Your private CAs can issue end-entity X.509 certificates useful in scenarios including:
+ Creating encrypted TLS communication channels 
+ Authenticating users, computers, API endpoints, and IoT devices
+ Cryptographically signing code
+ Implementing Online Certificate Status Protocol (OCSP) for obtaining certificate revocation status

AWS Private CA operations can be accessed from the AWS Management Console, using the AWS Private CA API, or using the AWS CLI.

**Topics**
+ [Regional availability for AWS Private Certificate Authority](#PcaRegions)
+ [Services integrated with AWS Private Certificate Authority](#PcaIntegratedServices)
+ [Supported cryptographic algorithms in AWS Private Certificate Authority](#supported-algorithms)
+ [RFC 5280 compliance in AWS Private Certificate Authority](#RFC-compliance)
+ [Pricing for AWS Private Certificate Authority](#PcaPricing)
+ [Terms and concepts for AWS Private CA](PcaTerms.md)

## Regional availability for AWS Private Certificate Authority
<a name="PcaRegions"></a>

 

Like most AWS resources, private certificate authorities (CAs) are Regional resources. To use private CAs in more than one Region, you must create your CAs in those Regions. You cannot copy private CAs between Regions. Visit [AWS Regions and Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html#pca_region) in the *AWS General Reference* or the [AWS Region Table](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/) to see the Regional availability for AWS Private CA. 

**Note**  
ACM is currently available in some regions that AWS Private CA is not.

## Services integrated with AWS Private Certificate Authority
<a name="PcaIntegratedServices"></a>

If you use AWS Certificate Manager to request a private certificate, you can associate that certificate with any service that is integrated with ACM. This applies both to certificates chained to a AWS Private CA root and to certificates chained to an external root. For more information, see [Integrated Services](https://docs.aws.amazon.com/acm/latest/userguide/acm-services.html) in the AWS Certificate Manager User Guide. 

You can also integrate private CAs into Amazon Elastic Kubernetes Service to provide certificate issuance inside a Kubernetes cluster. For more information, see [Secure Kubernetes with AWS Private Certificate Authority](PcaKubernetes.md).

**Note**  
Amazon Elastic Kubernetes Service is not an ACM integrated service.

If you use the AWS Private CA API or AWS CLI to issue a certificate or to export a private certificate from ACM, you can install the certificate anywhere you want. 

## Supported cryptographic algorithms in AWS Private Certificate Authority
<a name="supported-algorithms"></a>

AWS Private CA supports the following cryptographic algorithms for private key generation and certificate signing. 


**Supported algorithm**  

| Private key algorithms | Signing algorithms | 
| --- | --- | 
| ML\_DSA\_44<br />ML\_DSA\_65<br />ML\_DSA\_87<br />RSA\_2048 <br />RSA\_3072 <br />RSA\_4096<br />EC\_prime256v1<br />EC\_secp384r1<br />EC\_secp521r1<br />SM2 (China Regions only) | ML\_DSA\_44<br />ML\_DSA\_65<br />ML\_DSA\_87<br />SHA256WITHRSASHA384WITHRSA<br />SHA512WITHRSA<br />SHA256WITHECDSA<br />SHA384WITHECDSA<br />SHA512WITHECDSA<br />SM3WITHSM2 | 

This list applies only to certificates issued directly by AWS Private CA through its console, API, or command line. When AWS Certificate Manager issues certificates using a CA from AWS Private CA, it supports some but not all of these algorithms. For more information, see [Request a Private Certificate](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-private.html) in the AWS Certificate Manager User Guide.

**Note**  
For RSA or ECDSA, the specified signing algorithm family must match the key algorithm family of the CA's private key.  
For ML-DSA, the hash function is defined as part of the algorithm itself. There is no option to select a different hash function with ML-DSA. To maintain backward compatibility with the APIs, the same value is used for key algorithm and signing algorithm.

## RFC 5280 compliance in AWS Private Certificate Authority
<a name="RFC-compliance"></a>

AWS Private CA does not enforce certain constraints defined in [RFC 5280](https://datatracker.ietf.org/doc/html/rfc5280). The reverse situation is also true: Certain additional constraints appropriate to a private CA are enforced.

**Enforced**
+ [Not After date](https://datatracker.ietf.org/doc/html/rfc5280#section-4.1.2.5). In conformity with [RFC 5280](https://datatracker.ietf.org/doc/html/rfc5280), AWS Private CA prevents the issuance of certificates bearing a `Not After` date later than the `Not After` date of the issuing CA's certificate.
+ [Basic constraints](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.9). AWS Private CA enforces basic constraints and path length in imported CA certificates. 

  Basic constraints indicate whether or not the resource identified by the certificate is a CA and can issue certificates. CA certificates imported to AWS Private CA must include the basic constraints extension, and the extension must be marked `critical`. In addition to the `critical` flag, `CA=true` must be set. AWS Private CA enforces basic constraints by failing with a validation exception for the following reasons:
  + The extension is not included in the CA certificate.
  + The extension is not marked `critical`.

  Path length ([pathLenConstraint](PcaTerms.md#terms-pathlength)) determines how many subordinate CAs may exist downstream from the imported CA certificate. AWS Private CA enforces path length by failing with a validation exception for the following reasons:
  + Importing a CA certificate would violate the path length constraint in the CA certificate or in any CA certificate in the chain.
  + Issuing a certificate would violate a path length constraint.
+ [Name constraints](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.10) indicate a name space within which all subject names in subsequent certificates in a certification path must be located. Restrictions apply to the subject distinguished name and subject alternative names.

**Not enforced**
+ [Certificate policies](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.4). Certificate policies regulate the conditions under which a CA issue certificates.
+ [Inhibit anyPolicy](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.14). Used in certificates issued to CAs.
+ [Issuer Alternative Name](https://datatracker.ietf.org/doc/html/rfc5280#section-section-4.2.1.7). Allows additional identities to be associated with the issuer of the CA certificate.
+ [Policy Constraints](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.11). These constraints limit a CA's capacity to issue subordinate CA certificates.
+ [Policy Mappings](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.5). Used in CA certificates. Lists one or more pairs of OIDs; each pair includes an issuerDomainPolicy and a subjectDomainPolicy.
+ [Subject Directory Attributes](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.8). Used to convey identification attributes of the subject.
+ [Subject Information Access](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.2.2). How to access information and services for the subject of the certificate in which the extension appears.
+ [Subject Key Identifier (SKI)](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.2) and [Authority Key Identifier (AKI)](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.1). The RFC requires a CA certificate to contain the SKI extension. Certificates issued by the CA must contain an AKI extension matching the CA certificate's SKI. AWS does not enforce these requirements. If your CA Certificate does not contain an SKI, the issued end-entity or subordinate CA certificate AKI will be the SHA-1 hash of the issuer public key instead.
+ [SubjectPublicKeyInfo](https://datatracker.ietf.org/doc/html/rfc5280#section-4.1) and [Subject Alternative Name (SAN)](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.6). When issuing a certificate, AWS Private CA copies the SubjectPublicKeyInfo and SAN extensions from the provided CSR without performing validation.

## Pricing for AWS Private Certificate Authority
<a name="PcaPricing"></a>

Your account is charged a monthly price for each private CA starting from the time that you create it. You are also charged for each certificate that you issue. This charge includes certificates that you export from ACM and certificates that you create from the AWS Private CA API or AWS Private CA CLI. You are not charged for a private CA after it has been deleted. However, if you restore a private CA, you are charged for the time between deletion and restoration. Private certificates whose private key you cannot access are free. These include certificates that are used with [Integrated Services](https://docs.aws.amazon.com/acm/latest/userguide/acm-services.html) such as Elastic Load Balancing, CloudFront, and API Gateway. 

For the latest AWS Private CA pricing information, see [AWS Private Certificate Authority Pricing](https://aws.amazon.com/private-ca/pricing/). You can also use the [AWS pricing calculator](https://calculator.aws/#/createCalculator/certificateManager) to estimate costs. 