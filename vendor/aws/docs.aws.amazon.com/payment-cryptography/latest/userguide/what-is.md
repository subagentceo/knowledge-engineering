

# What is AWS Payment Cryptography?
<a name="what-is"></a>

AWS Payment Cryptography is a managed AWS service that provides access to cryptographic functions and key management used in payment processing in accordance with payment card industry (PCI) standards without the need for you to procure dedicated payment HSM instances. AWS Payment Cryptography provides customers performing payment functions such as acquirers, payment facilitators, networks, switches, processors, and banks with the ability to move their payment cryptographic operations closer to applications in the cloud and minimize dependencies on auxiliary data centers or colocation facilities containing dedicated payment HSMs. 

 The service is designed to meet applicable industry rules including PCI PIN, PCI P2PE, and PCI DSS, and the service leverages hardware that it is [PCI PTS HSM V3 and FIPS 140-2 Level 3 certified](cryptographic-details-internalops.md). It is designed to support low latency and [high levels of up-time and resilience](https://aws.amazon.com/payment-cryptography/sla/?did=sla_card&trk=sla_card). AWS Payment Cryptography is fully elastic and eliminates many of the operational requirements of on premises HSMs, such as the need to provision hardware, securely manage key material, and to maintain emergency backups in secure facilities. AWS Payment Cryptography also provides you with the option to share keys with your partners electronically, eliminating the need to share paper clear text components.

 You can use the [AWS Payment Cryptography Control Plane API](https://docs.aws.amazon.com/payment-cryptography/latest/APIReference/Welcome.html) to create and manage keys.

You can use the [AWS Payment Cryptography Data Plane API](https://docs.aws.amazon.com/payment-cryptography/latest/DataAPIReference/Welcome.html) to use encryption keys for payment-related transaction processing and associated cryptographic operations. 

AWS Payment Cryptography provides important features that you can use to manage your keys: 
+ Create and manage symmetric and asymmetric AWS Payment Cryptography keys, including TDES, AES, and RSA keys and specify their intended purpose such as for CVV generation or DUKPT key derivation.
+ Automatically store your AWS Payment Cryptography keys securely, protected by hardware security modules (HSMs) while enforcing key separation between use cases.
+  Create, delete, list, and update aliases, which are "friendly names" that can be used to access or control access to your AWS Payment Cryptography keys. 
+  Tag your AWS Payment Cryptography keys for identification, grouping, automation, access control, and cost tracking. 
+  Import and export symmetric keys between AWS Payment Cryptography and your HSM (or 3rd parties) using Key Encryption Keys (KEK) following TR-31(Interoperable Secure Key Exchange Key Block Specification). 
+  Import and export symmetric Key Encryption Keys (KEK) between AWS Payment Cryptography and other systems using asymmetric key pairs following by using electronic means such as TR-34 (Method For Distribution Of Symmetric Keys Using Asymmetric Techniques). 

You can use your AWS Payment Cryptography keys in cryptographic operations, such as:
+  Encrypt, decrypt, and re-encrypt data with symmetric or asymmetric AWS Payment Cryptography keys. 
+  Securely translate sensitive data (such as cardholder pins) between encryption keys without exposing the clear text in accordance with PCI PIN rules. 
+  Generate or validate cardholder data such as CVV, CVV2 or ARQC. 
+  Generate and validate cardholder pins. 
+  Generate or validate MAC signatures. 

## Related services
<a name="w2aab7c25"></a>

**[AWS Key Management Service](https://aws.amazon.com/kms/)**  
AWS Key Management Service (AWS KMS) is a managed service that makes it easy for you to create and control the cryptographic keys that are used to protect your data. AWS KMS uses hardware security modules (HSMs) to protect and validate your AWS KMS keys.

**[AWS CloudHSM](https://aws.amazon.com/cloudhsm/)**  
AWS CloudHSM provides customers with dedicated general purpose HSM instances in the AWS Cloud. AWS CloudHSM can provide a variety of cryptographic functions such as creating keys, data signing or encrypting and decrypting data. 

## For more information
<a name="w2aab7c27"></a>
+ To learn about the terms and concepts used in AWS Payment Cryptography, see [AWS Payment Cryptography Concepts](concepts.md).
+ For information about the AWS Payment Cryptography Control Plane API, see [AWS Payment Cryptography Control Plane API Reference](https://docs.aws.amazon.com/payment-cryptography/latest/APIReference/Welcome.html).
+ For information about the AWS Payment Cryptography Data Plane API, see [AWS Payment Cryptography Data Plane API Reference](https://docs.aws.amazon.com/payment-cryptography/latest/DataAPIReference/Welcome.html).
+ For detailed technical information about how AWS Payment Cryptography uses cryptography and secures AWS Payment Cryptography keys, see [Cryptographic details](cryptographic-details.md).