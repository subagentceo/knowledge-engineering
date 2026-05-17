# Authorizing GitHub Apps

You can authorize a GitHub App to retrieve information about your GitHub account and to make changes on your behalf.

## About authorizing GitHub Apps

Applications that are not owned by you, your organization, or GitHub Marketplace may need to verify your GitHub identity or interact with GitHub on your behalf. These applications can request authorization for a GitHub App to perform these actions. If an application requests authorization, it will redirect you to a GitHub page prompting you to authorize the app.

When authorizing the GitHub App, you should ensure you trust the application owner and review the information that the application wants to access. During authorization, you'll be prompted to grant the GitHub App permission to do all of the following:

* Verify your GitHub identity: When authorized, the GitHub App will be able to retrieve your public GitHub profile. The app may also be able to retrieve some private account information. During the authorization process, GitHub will tell you which account information the GitHub App will be able to access.
* Know which resources you can access: When authorized, the GitHub App will be able to determine which resources you can access that the app can also access. The app may use this, for example, so that it can show you an appropriate list of repositories.
* Act on your behalf: When authorized, the application may perform tasks on GitHub on your behalf. This might include creating an issue or commenting on a pull request. For more information, see [About GitHub Apps acting on your behalf](#about-github-apps-acting-on-your-behalf).

You can review and revoke your authorization at any time. For more information, see [Reviewing and revoking authorization of GitHub Apps](/en/apps/using-github-apps/reviewing-your-authorized-integrations).

## About GitHub Apps acting on your behalf

Once you authorize a GitHub App, the app can act on your behalf. The situations in which a GitHub App acts on your behalf vary according to the purpose of the GitHub App and the context in which it is being used. For example, an integrated development environment (IDE) may use a GitHub App to interact on your behalf in order to push changes you have authored through the IDE back to repositories on GitHub.

The GitHub App can only do things that both you and the app have permission to do. For example, if you have write access to a repository but the GitHub App only has read access, then the app can only read the contents of the repository even when it is acting on your behalf. Similarly, if you have access to repositories `A` and `B`, and the GitHub App has access to repositories `B` and `C`, then the app can only access repository `B` when acting on your behalf. For more information about the permissions granted to a GitHub App, see [Difference between authorization and installation](#difference-between-authorization-and-installation).

When an app acts on your behalf, it will attribute the activity to you in conjunction with the app. For example, if the app posts a comment on your behalf, the GitHub UI will show your profile picture along with the app's identicon badge as the author of the issue.

![Screenshot of a comment that has a user avatar with an overlaid app identicon badge. The avatar is highlighted with an orange outline.](/assets/images/help/apps/github-app-acting-on-your-behalf.png)

Similarly, if the activity triggers a corresponding entry in the audit logs and security logs, the logs will list you as the actor but will state that the "programmatic\_access\_type" is "GitHub App user-to-server token".

## Difference between authorization and installation

When you **install** a GitHub App on your account or organization, you grant the app permission to access the organization and repository resources that it requested. You also specify which repositories the app can access. During the installation process, the GitHub App will indicate which repository and organization permissions you are granting. For more information about what different permissions enable a GitHub App to do, see [Choosing permissions for a GitHub App](/en/apps/creating-github-apps/setting-up-a-github-app/choosing-permissions-for-a-github-app).

For example, you might grant the GitHub App permission to read repository metadata and write issues, and you might grant the GitHub App access to all of your repositories.

![Screenshot of the page to install a GitHub App. The app requests read access to metadata and write access to issues.](/assets/images/github-apps/install-app.png)

When you **authorize** a GitHub App, you grant the app access to your GitHub account, based on the account permissions the app requested. During the authorization process, the app will indicate which resources the app can access on your account. When you authorize a GitHub App, you also grant the app permission to act on your behalf.

For example, you might grant the GitHub App permission to read your email addresses and write gists.

![Screenshot of the page to authorize a GitHub App. The app is requesting read access to email and write access to gists.](/assets/images/github-apps/authorize-app.png)

You can install a GitHub App without authorizing the app. Similarly, you can authorize the app without installing the app.

For more information about installation, see [Installing a GitHub App from a third party](/en/apps/using-github-apps/installing-a-github-app-from-a-third-party), [Installing a GitHub App from GitHub Marketplace for your personal account](/en/apps/using-github-apps/installing-an-app-in-your-personal-account) and [Installing a GitHub App from GitHub Marketplace for your organizations](/en/apps/using-github-apps/installing-an-app-in-your-organization).