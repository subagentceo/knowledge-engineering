

# What is Amazon Cognito?
<a name="what-is-amazon-cognito"></a>

Amazon Cognito is an identity platform for web and mobile apps. It’s a user directory, an authentication server, and an authorization service for OAuth 2.0 access tokens and AWS credentials. With Amazon Cognito, you can authenticate and authorize users from the built-in user directory, from your enterprise directory, and from consumer identity providers like Google and Facebook.

**Topics**
+ [User pools](#what-is-amazon-cognito-user-pools)
+ [Identity pools](#what-is-amazon-cognito-identity-pools)
+ [Features of Amazon Cognito](#what-is-amazon-cognito-features)
+ [Amazon Cognito user pools and identity pools comparison](#what-is-amazon-cognito-features-comparison)
+ [Getting started with Amazon Cognito](#getting-started-overview)
+ [Regional availability](#getting-started-regional-availability)
+ [Pricing for Amazon Cognito](#pricing-for-amazon-cognito)
+ [Common Amazon Cognito terms and concepts](cognito-terms.md)
+ [Getting started with AWS](cognito-getting-started-account-iam.md)

The two components that follow make up Amazon Cognito. They operate independently or in tandem, based on your access needs for your users.

## User pools
<a name="what-is-amazon-cognito-user-pools"></a>

![Authentication flow diagram showing user sign-in through Cognito user pool with identity provider and app interactions.](http://docs.aws.amazon.com/cognito/latest/developerguide/images/user-pools-overview.png)


Create a user pool when you want to authenticate and authorize users to your app or API. User pools are a user directory with both self-service and administrator-driven user creation, management, and authentication. Your user pool can be an independent directory and OIDC identity provider (IdP), and an intermediate service provider (SP) to third-party providers of workforce and customer identities. You can provide single sign-on (SSO) in your app for your organization's workforce identities in SAML 2.0 and OIDC IdPs with user pools. You can also provide SSO in your app for your organization's customer identities in the public OAuth 2.0 identity stores Amazon, Google, Apple and Facebook. For more information about customer identity and access management (CIAM), see [What is CIAM?](https://aws.amazon.com/what-is/ciam/).

User pools don’t require integration with an identity pool. From a user pool, you can issue authenticated JSON web tokens (JWTs) directly to an app, a web server, or an API.

## Identity pools
<a name="what-is-amazon-cognito-identity-pools"></a>

![Sequence diagram showing authentication flow between app, identity pool, user pool, and STS.](http://docs.aws.amazon.com/cognito/latest/developerguide/images/identity-pools-overview.png)


Set up an Amazon Cognito identity pool when you want to authorize authenticated or anonymous users to access your AWS resources. An identity pool issues AWS credentials for your app to serve resources to users. You can authenticate users with a trusted identity provider, like a user pool or a SAML 2.0 service. It can also optionally issue credentials for guest users. Identity pools use both role-based and attribute-based access control to manage your users’ authorization to access your AWS resources.

Identity pools don’t require integration with a user pool. An identity pool can accept authenticated claims directly from both workforce and consumer identity providers.

**An Amazon Cognito user pool and identity pool used together**

In the diagram that begins this topic, you use Amazon Cognito to authenticate your user and then grant them access to an AWS service.

1. Your app user signs in through a user pool and receives OAuth 2.0 tokens.

1. Your app exchanges a user pool token with an identity pool for temporary AWS credentials that you can use with AWS APIs and the AWS Command Line Interface (AWS CLI).

1. Your app assigns the credentials session to your user, and delivers authorized access to AWS services like Amazon S3 and Amazon DynamoDB.

For more examples that use identity pools and user pools, see [Common Amazon Cognito scenarios](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-scenarios.html).

In Amazon Cognito, the *security of the cloud* obligation of the [shared responsibility model](https://aws.amazon.com/compliance/shared-responsibility-model/) is compliant with SOC 1-3, PCI DSS, ISO 27001, and is HIPAA-BAA eligible. You can design your *security in the cloud* in Amazon Cognito to be compliant with SOC1-3, ISO 27001, and HIPAA-BAA, but not PCI DSS. For more information, see [AWS services in scope](http://aws.amazon.com/compliance/services-in-scope/). See also [Regional data considerations](https://docs.aws.amazon.com/cognito/latest/developerguide/security-cognito-regional-data-considerations.html).

## Features of Amazon Cognito
<a name="what-is-amazon-cognito-features"></a>

### User pools
<a name="what-is-amazon-cognito-features-user-pools"></a>

An Amazon Cognito user pool is a user directory. With a user pool, your users can sign in to your web or mobile app through Amazon Cognito, or federate through a third-party IdP. Federated and local users have a user profile in your user pool. 

Local users are those who signed up or you created directly in your user pool. You can manage and customize these user profiles in the AWS Management Console, an AWS SDK, or the AWS Command Line Interface (AWS CLI). 

Amazon Cognito user pools accept tokens and assertions from third-party IdPs, and collect the user attributes into a JWT that it issues to your app. You can standardize your app on one set of JWTs while Amazon Cognito handles the interactions with IdPs, mapping their claims to a central token format.

An Amazon Cognito user pool can be a standalone IdP. Amazon Cognito draws from the OpenID Connect (OIDC) standard to generate JWTs for authentication and authorization. When you sign in local users, your user pool is authoritative for those users. You have access to the following features when you authenticate local users.
+ Implement your own web front-end that calls the Amazon Cognito user pools API to authenticate, authorize, and manage your users.
+ Set up multi-factor authentication (MFA) for your users. Amazon Cognito supports time-based one-time password (TOTP) and SMS message MFA.
+ Secure against access from user accounts that are under malicious control.
+ Create your own custom multi-step authentication flows.
+ Look up users in another directory and migrate them to Amazon Cognito.

An Amazon Cognito user pool can also fulfill a dual role as a service provider (SP) to your IdPs, and an IdP to your app. Amazon Cognito user pools can connect to consumer IdPs like Facebook and Google, or workforce IdPs like Okta and Active Directory Federation Services (ADFS).

With the OAuth 2.0 and OpenID Connect (OIDC) tokens that an Amazon Cognito user pool issues, you can
+ Accept an ID token in your app that authenticates a user, and provides the information that you need to set up the user’s profile
+ Accept an access token in your API with the OIDC scopes that authorize your users’ API calls.
+ Retrieve AWS credentials from an Amazon Cognito identity pool.


| 
| 
| Feature | Description | 
| --- |--- |
| OIDC identity provider | Issue ID tokens to authenticate users | 
| Authorization server | Issue access tokens to authorize user access to APIs | 
| SAML 2.0 service provider | Transform SAML assertions into ID and access tokens | 
| OIDC relying party | Transform OIDC tokens into ID and access tokens | 
| Social provider relying party | Transform ID tokens from Apple, Facebook, Amazon, or Google to your own ID and access tokens | 
| Authentication frontend service | Sign up, manage, and authenticate users with managed login | 
| API support for your own UI | Create, manage and authenticate users through authentication API requests in supported AWS SDKs¹ | 
| Multi-factor authentication | Use SMS messages, TOTPs, or your user's device as an additional authentication factor¹ | 
| Security monitoring & response | Secure against malicious activity and insecure passwords¹ | 
| Customize authentication flows | Build your own authentication mechanism, or add custom steps to existing flows² | 
| Groups | Create logical groupings of users, and a hierarchy of IAM role claims when you pass tokens to identity pools | 
| Customize tokens | Customize your ID and access tokens with new, modified, and suppressed claims | 
| Customize user attributes | Assign values to user attributes and add your own custom attributes | 

¹ Feature is unavailable to federated users.

² Feature is unavailable to federated and managed login users.

For more information about user pools, see [Getting started with user pools](getting-started-user-pools.md) and the [Amazon Cognito user pools API reference](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/).

### Identity pools
<a name="what-is-amazon-cognito-features-identity-pools"></a>

An identity pool is a collection of unique identifiers, or identities, that you assign to your users or guests and authorize to receive temporary AWS credentials. When you present proof of authentication to an identity pool in the form of the trusted claims from a SAML 2.0, OpenID Connect (OIDC), or OAuth 2.0 social identity provider (IdP), you associate your user with an identity in the identity pool. The token that your identity pool creates for the identity can retrieve temporary session credentials from AWS Security Token Service (AWS STS).

To complement authenticated identities, you can also configure an identity pool to authorize AWS access without IdP authentication. You can offer custom proof of authentication with [Developer-authenticated identities](developer-authenticated-identities.md). You can also grant temporary AWS credentials to guest users, with [unauthenticated identities](identity-pools.md#authenticated-and-unauthenticated-identities).

With identity pools, you have two ways to integrate with IAM policies in your AWS account. You can use these two features together or individually.

**Role-based access control**  
When your user passes claims to your identity pool, Amazon Cognito chooses the IAM role that it requests. To customize the role’s permissions to your needs, you apply IAM policies to each role. For example, if your user demonstrates that they are in the marketing department, they receive credentials for a role with policies tailored to marketing department access needs. Amazon Cognito can request a default role, a role based on rules that query your user’s claims, or a role based on your user’s group membership in a user pool. You can also configure the role trust policy so that IAM trusts only your identity pool to generate temporary sessions.

**Attributes for access control**  
Your identity pool reads attributes from your user’s claims, and maps them to principal tags in your user’s temporary session. You can then configure your IAM resource-based policies to allow or deny access to resources based on IAM principals that carry the session tags from your identity pool. For example, if your user demonstrates that they are in the marketing department, AWS STS tags their session `Department: marketing`. Your Amazon S3 bucket permits read operations based on an [aws:PrincipalTag](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-principaltag) condition that requires a value of `marketing` for the `Department` tag.


| 
| 
| Feature | Description | 
| --- |--- |
| Amazon Cognito user pool relying party | Exchange an ID token from your user pool for web identity credentials from AWS STS | 
| SAML 2.0 service provider | Exchange SAML assertions for web identity credentials from AWS STS | 
| OIDC relying party | Exchange OIDC tokens for web identity credentials from AWS STS | 
| Social provider relying party | Exchange OAuth tokens from Amazon, Facebook, Google, Apple, and Twitter for web identity credentials from AWS STS | 
| Custom relying party | With AWS credentials, exchange claims in any format for web identity credentials from AWS STS | 
| Unauthenticated access | Issue limited-access web identity credentials from AWS STS without authentication | 
| Role-based access control | Choose an IAM role for your authenticated user based on their claims, and configure your roles to only be assumed in the context of your identity pool | 
| Attribute-based access control | Convert claims into principal tags for your AWS STS temporary session, and use IAM policies to filter resource access based on principal tags | 

For more information about identity pools, see [Getting started with Amazon Cognito identity pools](getting-started-with-identity-pools.md) and the [Amazon Cognito identity pools API reference](https://docs.aws.amazon.com/cognitoidentity/latest/APIReference/).



## Amazon Cognito user pools and identity pools comparison
<a name="what-is-amazon-cognito-features-comparison"></a>


| 
| 
| Feature | Description | User pools | Identity pools | 
| --- |--- |--- |--- |
| OIDC identity provider | Issue OIDC ID tokens to authenticate app users | ✓ |  | 
| User directory | Store user profiles for authentication | ✓ |  | 
| Authorize API access | Issue access tokens to authorize user access to APIs (including user profile self-service API operations), databases, and other resources that accept OAuth scopes | ✓ |  | 
| IAM web identity authorization | Generate tokens that you can exchange with AWS STS for temporary AWS credentials |  | ✓ | 
| SAML 2.0 service provider & OIDC identity provider | Issue customized OIDC tokens based on claims from a SAML 2.0 identity provider | ✓ |  | 
| OIDC relying party & OIDC identity provider | Issue customized OIDC tokens based on claims from an OIDC identity provider | ✓ |  | 
| OAuth 2.0 relying party & OIDC identity provider | Issue customized OIDC tokens based on scopes from OAuth 2.0 social providers like Apple and Google | ✓ |  | 
| SAML 2.0 service provider & credentials broker | Issue temporary AWS credentials based on claims from a SAML 2.0 identity provider |  | ✓ | 
| OIDC relying party & credentials broker | Issue temporary AWS credentials based on claims from an OIDC identity provider |  | ✓ | 
| Social provider relying party & credentials broker | Issue temporary AWS credentials based on JSON web tokens from developer applications with social providers like Apple and Google |  | ✓ | 
| Amazon Cognito user pool relying party & credentials broker | Issue temporary AWS credentials based on JSON web tokens from Amazon Cognito user pools |  | ✓ | 
| Custom relying party & credentials broker | Issue temporary AWS credentials to arbitrary identities, authorized by developer IAM credentials |  | ✓ | 
| Authentication frontend service | Sign up, manage, and authenticate users with managed login | ✓ |  | 
| API support for your own authentication UI | Create, manage and authenticate users through API requests in supported AWS SDKs¹ | ✓ |  | 
| MFA | Use SMS messages, TOTPs, or your user's device as an additional authentication factor¹ | ✓ |  | 
| Security monitoring & response | Protect against malicious activity and insecure passwords¹ | ✓ |  | 
| Customize authentication flows | Build your own authentication mechanism, or add custom steps to existing flows¹ | ✓ |  | 
| User groups | Create logical groupings of users, and a hierarchy of IAM role claims when you pass tokens to identity pools | ✓ |  | 
| Customize tokens | Customize your ID and access tokens with new, modified, and suppressed claims and scopes | ✓ |  | 
| AWS WAF web ACLs | Monitor and control requests to your authentication front end with AWS WAF | ✓ |  | 
| Customize user attributes | Assign values to user attributes and add your own custom attributes | ✓ |  | 
| Unauthenticated access | Issue limited-access web identity credentials from AWS STS without authentication |  | ✓ | 
| Role-based access control | Choose an IAM role for your authenticated user based on their claims, and configure your role trust to limit access to web identity users |  | ✓ | 
| Attribute-based access control | Transform user claims into principal tags for your AWS STS temporary session, and use IAM policies to filter resource access based on principal tags |  | ✓ | 

¹ Feature is not available to federated users.

## Getting started with Amazon Cognito
<a name="getting-started-overview"></a>

For example user pool applications, see [Getting started with user pools](getting-started-user-pools.md).

For an introduction to identity pools, see [Getting started with Amazon Cognito identity pools](getting-started-with-identity-pools.md).

For links to guided setup experiences with user pools and identity pools, see [Guided setup options for Amazon Cognito](cognito-guided-setup.md).

To get started with an AWS SDK, see [AWS Developer Tools](https://aws.amazon.com/products/developer-tools). For developer resources specific to Amazon Cognito, see [Amazon Cognito developer resources](https://aws.amazon.com/cognito/dev-resources/).

To use Amazon Cognito, you need an AWS account. For more information, see [Getting started with AWS](cognito-getting-started-account-iam.md).

## Regional availability
<a name="getting-started-regional-availability"></a>

Amazon Cognito is available in multiple AWS Regions worldwide. In each Region, Amazon Cognito is distributed across multiple Availability Zones. These Availability Zones are physically isolated from each other, but are united by private, low-latency, high-throughput, and highly redundant network connections. These Availability Zones enable AWS to provide services, including Amazon Cognito, with very high levels of availability and redundancy, while also minimizing latency.

To see if Amazon Cognito is currently available in any AWS Region, see [AWS Services by Region](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).

To learn about regional API service endpoints, see [AWS regions and endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html##cognito_identity_region) in the *Amazon Web Services General Reference*.

To learn more about the number of Availability Zones that are available in each Region, see [AWS global infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/).

## Pricing for Amazon Cognito
<a name="pricing-for-amazon-cognito"></a>

For information about Amazon Cognito pricing, see [Amazon Cognito pricing](https://aws.amazon.com/cognito/pricing/).