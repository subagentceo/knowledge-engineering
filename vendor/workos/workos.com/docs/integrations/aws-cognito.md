# AWS Cognito

## Introduction

This guide outlines the steps to make WorkOS SSO Connections available to AWS Cognito applications without requiring changes to your existing application code.

The integration works by configuring WorkOS connections as third-party [Identity Providers](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-identity-federation.html) inside a Cognito User Pool which enables users to sign in to a Cognito application leveraging all SSO integrations supported by WorkOS.

> The AWS Cognito integration is in feature preview. Reach out to [WorkOS support](mailto:support@workos.com?subject=AWS%20Cognito%20Integration) if you want early access.

***

## (1) Configure AWS IAM role

WorkOS manages the configuration of the Cognito Identity Providers by leveraging AWS role delegation. You will need to create an IAM role in your AWS account that grants permissions to the WorkOS AWS account. This is can be easily accomplished through the AWS Console.

![Create AWS IAM role](https://images.workoscdn.com/images/0a36c5ff-505e-46ba-805a-66d13c9150ed.png?auto=format\&fit=clip\&q=50)

The external ID will be provided by the WorkOS support team upon request. The AWS account ID should be `611361754156` which is the ID of a dedicated WorkOS AWS account used for Cognito integrations.

You will need to attach the following policy to the role so that the Identity Providers can be managed when the role is assumed by WorkOS.

```json language="json" title="IAM Policy"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor",
      "Effect": "Allow",
      "Action": ["cognito-idp:*"],
      "Resource": "*"
    }
  ]
}
```

Complete the creation of the role and take note of the name you provide as it will be used in the following step.

## (2) Provide AWS details to WorkOS

Once the role has been configured you will need to provide the following details from your AWS account to the WorkOS support team.

- Account ID
- Role name
- User pool ID

Once the WorkOS support team has configured your AWS details, you should see Identity Providers configured in the specified User Pool for every connection configured in WorkOS. Newly added WorkOS connections will automatically be created in the specified User Pool.

## (3) Enable Identity Providers for App Client

Now that the Identity Providers have been configured, they will need to be enabled for the App Client you wish to use the WorkOS Connections with.

From the user pool navigate to **App integration** → ***Your App Client*** → **Edit hosted UI settings** and select the newly created Identity Providers.

![App Client Identity Provider settings](https://images.workoscdn.com/images/e0f4a7c1-4131-4110-a6a3-9f5466110745.png?auto=format\&fit=clip\&q=50)

> If you do not complete this step you will receive a **Login option is not available** error from Cognito upon sign in.

## (4) Configure redirect URI

Locate the domain of the Cognito User Pool and configure the following redirect URI in the [Applications](https://dashboard.workos.com/environment/applications) section of the WorkOS Dashboard. Open your application and go to the **Redirects** tab.

```plain title="Cognito callback URI"
https://<cognito-user-pool-domain>/oauth2/idpresponse
```

## (5) Sign in with WorkOS connection

Once an Identity Provider has been created in the Cognito User Pool, you may initiate authentication by passing the `idp_identifier` query parameter to the [OAuth2 Authorize endpoint](https://docs.aws.amazon.com/cognito/latest/developerguide/authorization-endpoint.html) provided by Cognito using the details from the App Client that was previously configured with the Identity Providers.

You may pass either a WorkOS [Organization](https://workos.com/docs/reference/organization) or [Connection](https://workos.com/docs/reference/sso/connection) ID as the `idp_identifier`. Passing this query parameter will result in Cognito bypassing it's standard sign-in page and immediately redirecting the user to the appropriate sign-in page of the upstream identity provider configured in the WorkOS Connection.

Once the user is authenticated they will be redirected to your Cognito App Client redirect URL with the Cognito `code` query parameter.
