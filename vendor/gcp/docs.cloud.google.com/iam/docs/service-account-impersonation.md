# Service account impersonation

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Security
*   IAM
*   Guides

Send feedback

# Service account impersonation Stay organized with collections Save and categorize content based on your preferences.

When an authenticated principal, such as a user or another service account, authenticates as a service account to gain the service account's permissions, it's called _impersonating_ the service account. Impersonating a service account lets an authenticated principal access whatever the service account can access. Only authenticated principals with the appropriate permissions can impersonate service accounts.

Impersonation is useful when you want to change a user's permissions without changing your Identity and Access Management (IAM) policies. For example, you can use impersonation to temporarily grant a user elevated access, or to test whether a specific set of permissions is sufficient for a task. You can also use impersonation to locally develop applications that can only run as a service account, or to authenticate applications that run outside of Google Cloud.

Google Cloud service account impersonation is similar to Amazon Web Services (AWS) Security Token Service API methods like `AssumeRole`.

## How service account impersonation works

Service account impersonation always involves two identities: an authenticated principal, and the service account that the principal impersonates. To impersonate the service account, the authenticated principal gets a token for the service account, then uses that token to authenticate as the service account.

There are multiple ways to impersonate a service account:

*   Set the `--impersonate-service-account` flag or the `impersonate-service-account` property when running a Google Cloud CLI command. When you run a gcloud CLI command with this setting, gcloud CLI creates short-lived credentials for the service account, then runs the command with those credentials.
    
    You can also use the `--impersonate-service-account` flag when setting up your Application Default Credentials file. This setup enables client libraries that support impersonation to automatically impersonate the service account.
    
*   Create short-lived credentials using the Service Account Credentials API, then use those credentials to authenticate an API request.
    
    Short-lived credentials have a limited lifetime, with durations of just a few hours or shorter, and are not automatically refreshed. They create less risk than long-lived credentials, such as service account keys.
    
*   Use a credential configuration file to configure an external application to impersonate a service account. This option is only available for applications that use Workload Identity Federation.
    
    When an application uses a credential configuration file to access Google Cloud, it first uses its environment-specific credentials to get a short-lived credential for a designated service account. Then, it uses that short-lived credential to authenticate to Google Cloud.
    

If a principal accesses resources while impersonating a service account, most audit logs include both their identity and the identity of the service account they're impersonating. For more information, see Interpreting audit logs.

When you use the Google Cloud console, you always authenticate with your user credentials; you can't impersonate a service account to access resources in the Google Cloud console.

### Authentication without impersonation

There are several ways for a workload or user to authenticate as a service account _without_ impersonating the service account:

*   A workload uses an attached service account to authenticate to Google APIs. In this case, the attached service account acts as the workload's identity, and is the only authenticated identity involved in the request.
    
    To learn about how workloads authenticate to Google Cloud, see Identities for workloads.
    
*   A principal uses a service account key to authenticate as a service account. Using a service account key to authenticate as a service account only involves one authenticated identity: the service account's. Because there is only one identity involved, using a key isn't service account impersonation.
    
    **Note:** Service account keys are a security risk if not managed correctly. You should choose a more secure alternative to service account keys whenever possible. If you must authenticate with a service account key, you are responsible for the security of the private key and for other operations described by Best practices for managing service account keys. If you are prevented from creating a service account key, service account key creation might be disabled for your organization. For more information, see Managing secure-by-default organization resources.
    
    If you acquired the service account key from an external source, you must validate it before use. For more information, see Security requirements for externally sourced credentials.
    

In these cases, the audit logs record only the identity of the service account. They don't record any other identities—for example, the identities of the users who executed code on the workload, or the identities of the people who used the service account key to authenticate. As a result, using service account keys or giving developers permission to execute code on privileged resources—for example, an SSH session to a VM instance—can create privilege-escalation and non-repudiation risks.

### Required permissions

To impersonate a service account, you need the `iam.serviceAccounts.getAccessToken` permission. This permission is in roles like the Service Account Token Creator role (`roles/iam.serviceAccountTokenCreator`).

For more information about roles required for impersonation, see Roles for service account authentication.

## Use cases for service account impersonation

Service account impersonation is useful when you need to do tasks like the following:

*   Grant a user temporary elevated access
*   Test whether a specific set of permissions is sufficient for a task
*   Locally develop applications that can only run as a service account
*   Authenticate external applications

### Grant temporary elevated access

In some cases, you might want to let a user access specific resources temporarily. For example, you might want to give someone additional access so that they can resolve an incident, or let someone access sensitive data for a limited time after they've logged a justification.

Service account impersonation is one of the ways that you can give users this temporary elevated access. To use a service account for temporary elevated access, you first grant it the IAM roles that you want to temporarily give to users. Then, you let users impersonate the service account, either by giving them permission to impersonate the service account or by using a token broker to issue a short-lived credential for the service account.

To learn more about methods for giving users temporary elevated access, see Temporary elevated access overview.

### Test permissions

In some cases, you might want to check whether a specific set of permissions is sufficient for a task. For example, you might want to confirm that a service account can still run an application if you remove certain excess permissions. Or, you might be helping a user to troubleshoot a task and want to verify that they can run a certain command with their current IAM roles.

You can use service account impersonation to test a specific set of permissions. First, create a service account and grant it one or more IAM roles with the permissions that you want to test. Then, impersonate the service account and attempt the task. This method lets you test permissions without needing to create test user accounts or modify your own IAM permissions.

To learn how to impersonate service accounts, see Use service account impersonation.

### Develop applications locally

When developing applications locally, you can typically authenticate using your user credentials. However, in some situations, that might not be possible—for example, if you want to authenticate to a service that requires a token with a custom audience, which users typically can't configure. In these cases, you need to authenticate as a service account instead of authenticating with your user credentials.

For these situations, we recommend using service account impersonation. Using service account impersonation lets you avoid using service account keys, which create additional security risk.

To learn how to impersonate service accounts to develop applications, see Service account impersonation.

### Authenticate external applications

To access Google Cloud resources, applications running outside of Google Cloud need to authenticate to Google Cloud. One way to authenticate these applications is to use service account impersonation.

To let your application impersonate a service account, you first need to set up Workload Identity Federation, which provides an authenticated identity for your application. Then, you can use a credential configuration file to configure your application to impersonate a service account.

Although it's possible to use service account keys to authenticate external applications, we strongly recommend against it. Service account keys create additional security risk, and should be avoided when possible.

## What's next

*   Find out how to use service account impersonation.
*   Learn more about temporary elevated access.
*   Create short-lived credentials to impersonate a service account.
*   Get best practices for working with service accounts.

Send feedback