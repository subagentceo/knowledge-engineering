# Authenticate to Cloud Storage

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Storage
*   Cloud Storage
*   Guides

Send feedback

# Authenticate to Cloud Storage Stay organized with collections Save and categorize content based on your preferences.

This document describes how to authenticate to Cloud Storage programmatically. How you authenticate to Cloud Storage depends on the interface you use to access the API and the environment where your code is running.

*   This page covers authentication that relies on OAuth 2.0 tokens. Cloud Storage requests made through the XML API support using either OAuth 2.0 tokens or signatures in a request's `Authorization` header.
*   This page covers authentication that uses RSA keys as credentials. Cloud Storage requests made through the XML API support both RSA keys and HMAC keys as credentials.

For more information about Google Cloud authentication, see the Authentication methods.

## API access

Cloud Storage supports programmatic access. You can access the API in the following ways:

*   Client libraries
*   Google Cloud CLI
*   REST

### Client libraries

The Cloud Storage client libraries provide high-level language support for authenticating to Cloud Storage programmatically. To authenticate calls to Google Cloud APIs, client libraries support Application Default Credentials (ADC); the libraries look for credentials in a set of defined locations and use those credentials to authenticate requests to the API. With ADC, you can make credentials available to your application in a variety of environments, such as local development or production, without needing to modify your application code.

### Google Cloud CLI

When you use the gcloud CLI to access Cloud Storage, you log in to the gcloud CLI with a user account, which provides the credentials used by the gcloud CLI commands.

If your organization's security policies prevent user accounts from having the required permissions, you can use service account impersonation.

For more information, see Authenticate for using the gcloud CLI. For more information about using the gcloud CLI with Cloud Storage, see the gcloud CLI reference pages.

### REST

You can authenticate to Cloud Storage APIs by using your gcloud CLI credentials or by using Application Default Credentials. For more information about authentication for REST requests, see Authenticate for using REST. For information about the types of credentials, see gcloud CLI credentials and ADC credentials.

## User credentials and ADC for Cloud Storage

One way to provide credentials to ADC is to use the gcloud CLI to insert your user credentials into a credential file. This file is placed on your local file system where ADC can find it; ADC then uses the provided user credentials to authenticate requests. This method is often used for local development.

If you use this method, you might encounter an authentication error when you try to authenticate to Cloud Storage. For more information about this error and how to address it, see User credentials not working.

## Set up authentication for Cloud Storage

How you set up authentication depends on the environment where your code is running.

The following options for setting up authentication are the most commonly used. For more options and information about authentication, see Authentication methods.

### For a local development environment

You can set up credentials for a local development environment in the following ways:

*   User credentials for client libraries or third-party tools
*   User credentials for REST requests from the command line
*   Service account impersonation

#### Client libraries or third-party tools

Set up Application Default Credentials (ADC) in your local environment:

1.  Install the Google Cloud CLI. After installation, initialize the Google Cloud CLI by running the following command:
    
    gcloud init
    
    If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
    
2.  If you're using a local shell, then create local authentication credentials for your user account:
    
    gcloud auth application-default login
    
    You don't need to do this if you're using Cloud Shell.
    
    **Note:** If the gcloud CLI prints a warning that your account doesn't have the `serviceusage.services.use` permission, then some gcloud CLI commands and client libraries might not work. Ask an administrator to grant you the Service Usage Consumer IAM role (`roles/serviceusage.serviceUsageConsumer`), then run the following command:
    
    gcloud auth application-default set-quota-project PROJECT_ID
    
    If an authentication error is returned, and you are using an external identity provider (IdP), confirm that you have signed in to the gcloud CLI with your federated identity.
    
    A sign-in screen appears. After you sign in, your credentials are stored in the local credential file used by ADC.
    

For more information about working with ADC in a local environment, see Set up ADC for a local development environment.

#### REST requests from the command line

When you make a REST request from the command line, you can use your gcloud CLI credentials by including `gcloud auth print-access-token` as part of the command that sends the request.

The following example lists service accounts for the specified project. You can use the same pattern for any REST request.

Before using any of the request data, make the following replacements:

*   PROJECT_ID: Your Google Cloud project ID.

To send your request, expand one of these options:

#### curl (Linux, macOS, or Cloud Shell)

Execute the following command:

curl -X GET \  
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \  
     -H "x-goog-user-project: PROJECT_ID" \  
     "https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts"

#### PowerShell (Windows)

Execute the following command:

$cred = gcloud auth print-access-token  
$headers = @{ "Authorization" = "Bearer $cred"; "x-goog-user-project" = "PROJECT_ID" }  
  
Invoke-WebRequest `  
    -Method GET `  
    -Headers $headers `  
    -Uri "https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts" | Select-Object -Expand Content

 

For more information about authenticating using REST and gRPC, see Authenticate for using REST. For information about the difference between your local ADC credentials and your gcloud CLI credentials, see gcloud CLI authentication configuration and ADC configuration.

#### Service account impersonation

In most cases, you can use your user credentials to authenticate from a local development environment. If that is not feasible, or if you need to test the permissions assigned to a service account, you can use service account impersonation. You must have the `iam.serviceAccounts.getAccessToken` permission, which is included in the Service Account Token Creator (`roles/iam.serviceAccountTokenCreator`) IAM role.

You can set up the gcloud CLI to use service account impersonation by using the `gcloud config set` command:

gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL

For select languages, you can use service account impersonation to create a local ADC file for use by client libraries. This approach is supported only for the Go, Java, Node.js, and Python client libraries—it is not supported for the other languages. To set up a local ADC file with service account impersonation, use the `--impersonate-service-account` flag with the `gcloud auth application-default login` command:

gcloud auth application-default login --impersonate-service-account=SERVICE_ACCT_EMAIL

For more information about service account impersonation, see Use service account impersonation.

### On Google Cloud

To authenticate a workload running on Google Cloud, you use the credentials of the service account attached to the compute resource where your code is running, such as a Compute Engine virtual machine (VM) instance. This approach is the preferred authentication method for code running on a Google Cloud compute resource.

For most services, you must attach the service account when you create the resource that will run your code; you cannot add or replace the service account later. Compute Engine is an exception—it lets you attach a service account to a VM instance at any time.

Use the gcloud CLI to create a service account and attach it to your resource:

1.  Install the Google Cloud CLI. After installation, initialize the Google Cloud CLI by running the following command:
    
    gcloud init
    
    If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
    
2.  Set up authentication:
    
    1.  Ensure that you have the Create Service Accounts IAM role (`roles/iam.serviceAccountCreator`) and the Project IAM Admin role (`roles/resourcemanager.projectIamAdmin`). Learn how to grant roles.
    2.  Create the service account:
        
        gcloud iam service-accounts create SERVICE_ACCOUNT_NAME
        
        Replace `SERVICE_ACCOUNT_NAME` with a name for the service account.
        
    3.  To provide access to your project and your resources, grant a role to the service account:
        
        gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role=ROLE
        
        Replace the following:
        
        *   `SERVICE_ACCOUNT_NAME`: the name of the service account
        *   `PROJECT_ID`: the project ID where you created the service account
        *   `ROLE`: the role to grant
        
        **Note**: The `--role` flag affects which resources the service account can access in your project. You can revoke these roles or grant additional roles later. In production environments, do not grant the Owner, Editor, or Viewer roles. Instead, grant a predefined role or custom role that meets your needs.
        
    4.  To grant another role to the service account, run the command as you did in the previous step.
    5.  Grant the required role to the principal that will attach the service account to other resources.
        
        gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:USER_EMAIL" --role=roles/iam.serviceAccountUser
        
        Replace the following:
        
        *   `SERVICE_ACCOUNT_NAME`: the name of the service account
        *   `PROJECT_ID`: the project ID where you created the service account
        *   `USER_EMAIL`: the email address for a Google Account
3.  Create the resource that will run your code, and attach the service account to that resource. For example, if you use Compute Engine:
    
    Create a Compute Engine instance. Configure the instance as follows:
    
    *   Replace `INSTANCE_NAME` with your preferred instance name.
    *   Set the `--zone` flag to the zone in which you want to create your instance.
    *   Set the `--service-account` flag to the email address for the service account that you created.
    
    gcloud compute instances create INSTANCE_NAME --zone=ZONE --service-account=SERVICE_ACCOUNT_EMAIL
    

For more information about authenticating to Google APIs, see Authentication methods.

### On-premises or on a different cloud provider

The preferred method to set up authentication from outside of Google Cloud is to use workload identity federation. For more information, see Set up ADC for on-premises or another cloud provider in the authentication documentation.

## Access control for Cloud Storage

After you authenticate to Cloud Storage, you must be authorized to access Google Cloud resources. Cloud Storage uses Identity and Access Management (IAM) for authorization.

For more information about the roles for Cloud Storage, see Overview of access control. For more information about IAM and authorization, see IAM overview.

## What's next

*   Learn about browser-based downloads using cookie authentication
*   Learn about Cloud Storage OAuth 2.0 scopes
*   Explore user account credential use cases
*   Learn about Google Cloud authentication methods.
*   See a list of authentication use cases.

Send feedback