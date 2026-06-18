# Contain: Immediate Countermeasures

The Contain phase focuses on limiting immediate impact and preventing further unauthorized activity. The goal is to quickly restrict threat actor access to your accounts and services once fraud has been confirmed.

After validating the type of fraud in the Validate phase, begin the steps in this section as soon as possible.

> \[!NOTE]
>
> If Twilio has notified you of suspicious activity and provided a specific remediation workflow through the Twilio Console, follow the instructions provided to accelerate containment. Otherwise, proceed with the steps outlined below.

## How to proceed \[#how-to-proceed]

* For **attacks using your account**, where you are a victim of ATO, follow the steps in the [ATO - Account Sanitization](#ato-account-sanitization) section.
* For **attacks on your account**, which typically involve AIT or a smishing/vishing-style attack, follow the steps in the [Anomalous Traffic - Control Remediation](#anomalous-traffic-control-remediation) section.
* In situations where you may be **subject to both**, prioritize the completion of account sanitization steps before moving on to AIT control remediation.

## ATO - Account Sanitization \[#ato-account-sanitization]

If you've confirmed an Account Takeover (ATO), begin these containment steps immediately. The goal of this section is to remove unauthorized access and restore account integrity.

As you work through this process, keep the following in mind:

* **Complete every step:** Each step in this section is required to reactivate your account. Missing a step (such as leaving compromised API keys active or failing to re-promote an Auth Token after reactivation) may lead to a second ATO.
* **Account Reactivation:** If your account was suspended as part of the response, all required containment steps must be completed before your account can be reactivated.

This phase focuses on short-term containment steps to immediately cut off unauthorized access to your account. Completing these steps helps reduce the immediate risk of further impact.

To further minimize the likelihood of recurring ATOs, it's important to implement longer-term safeguards. After completing the actions in this phase, follow the steps outlined in the [Diagnose](/docs/usage/fraud-response-guide/diagnose) phase to identify root causes and put preventative measures in place.

For repeat ATO incidents, Twilio may require a completed [Root Cause Analysis (RCA)](/docs/usage/fraud-response-guide/example-rca-summary-request-form) before affected accounts can be reactivated.

The sections below provide step-by-step guidance for performing account sanitation actions in the Twilio Console.

### 1. Rotate Auth Token \[#rotate-auth-token]

The [Auth Token](https://help.twilio.com/articles/223136027-Auth-Tokens-and-How-to-Change-Them) provides administrative-level programmatic access to your entire Twilio account. There is only one Auth Token per account. If your Auth Token is compromised, your entire Twilio account is compromised.

> \[!WARNING]
>
> Rotating your Auth Token is a destructive action. Any applications currently using these credentials will immediately stop working until you update them with the new one.

1. Log in to your **Twilio Console**.
2. On the main **Account Dashboard**, find the **Account Info** section.
3. You will see your `Account SID` and your `Auth Token` (the token is hidden by default).
4. Towards the bottom of the Account Info section, click the **Go to account settings** button.
5. If prompted, enter your verification code in the box titled **Verification code required for access**. Then click **Verify**.
6. In the left-hand column, under **Keys & Credentials**, click **API keys & tokens**.
7. Scroll down to the section called **Auth Tokens**. In the box called **Live credentials**, click **Request a secondary token**.
8. In the pop-up box, click **Request token**.
9. Your new Auth Token will be displayed as **Secondary token**. **Copy this new token immediately** and store it securely (like in a password manager).
10. Update and test all your applications and scripts with this new secondary Auth Token.
11. When testing is complete with the new token, promote your secondary token to primary by clicking **Promote to primary**.
12. A prompt will display, stating that promoting the secondary token to primary will delete the existing primary token and that all future API calls using this token will fail. Check **I acknowledge the impact of this action** and then click **Promote token**.
13. (Optional) If you have subaccounts that were impacted, you will need to rotate their Auth Tokens as well. In the top-left corner, click the **Account Selection** dropdown (it usually shows your current account name).
14. Click **View Subaccounts**. You will see a table listing all your subaccounts.
15. Under **Account Name**, click on the account for which you would like to rotate its Auth Token.
16. Follow steps 2-12 to rotate the Auth Token. To switch to another account in your organization, follow steps 13-15.

If you need to rotate Auth Tokens programmatically, use the Twilio API to [create](https://www.twilio.com/docs/iam/api/secondary_authtoken#create-a-secondaryauthtoken-resource), [delete](https://www.twilio.com/docs/iam/api/secondary_authtoken#delete-a-secondaryauthtoken-resource), and [promote](https://www.twilio.com/docs/iam/api/authtoken#update-an-authtokenpromotion-resource) secondary Auth Tokens for one or more accounts/subaccounts. Extend these API calls into a script that can rotate secrets across many accounts at once and much faster than what can be done via the Twilio Console.

### 2. Delete API keys \[#delete-api-keys]

[API Keys](https://www.twilio.com/docs/iam/api/api-keys) are a more secure way to grant programmatic access to your account, as their permissions can be scoped down appropriately. The following is how to remove an API key that may be compromised.
**You will not be able to create new API keys while your account is under ATO suspension.**

> \[!WARNING]
>
> Deleting API keys is a destructive action. Any applications currently using these credentials will immediately stop working until you update them with new ones.

1. Log in to your Twilio Console.
2. On the main Account Dashboard, find the **Account Info** section.
3. You will see your `Account SID` and your `Auth Token` (the token is hidden by default).
4. At the bottom of the Account Info section, click **Go to API Keys**.
5. You will see a list of your existing API Keys.
6. Find the API Key you want to delete (you can identify it by its **Friendly Name** or **SID**).
7. Click on the **Friendly Name** or **SID** of the key to open its details.
8. At the bottom of the page, click the red **Delete this API Key** button.
9. A confirmation pop-up will appear. Click **Delete this API key** to confirm deletion.

In the case of an ATO, follow this procedure for all API keys in the affected account(s). To accelerate this process, you can also rotate API keys programmatically by using the Twilio API to [create](https://www.twilio.com/docs/iam/api-keys/key-resource-v2010#create-an-api-key) and [delete](https://www.twilio.com/docs/iam/api-keys/key-resource-v2010#delete-an-api-key) API keys for one or more accounts/subaccounts.

### 3. Enable Two-Factor Authentication (2FA) \[#enable-two-factor-authentication]

This adds an extra layer of security to your console login by enforcing a verification code as a second factor. If this is in place already, move on to step 4.

1. Log in to your **Twilio Console**.
2. In the top-right corner, click on your **profile icon/name**.
3. Select **User Settings** from the dropdown menu.
4. On the User Settings page, find the **Two-Factor Authentication (2FA)** section.
5. Click **Set up 2FA**.
6. Choose your verification method:
   * **Authenticator App** (Recommended): Use an app like Google Authenticator or Authy. You'll scan a QR code with your phone.
   * **SMS**: Receive a verification code via text message.
7. Follow the on-screen prompts to scan the QR code with your phone or enter your phone number.
8. Enter the 6-digit code provided by your app or SMS to verify.
9. **Important**: Twilio will provide you with **backup codes**. **Save these codes** somewhere safe (like a password manager). If you lose access to your 2FA device, these codes will be your only way to log in.
10. 2FA is now active. The next time you log in, you will be prompted for your password and a code from your chosen 2FA method.

### 4. Make GitHub and other repositories private \[#make-repositories-private]

If you haven't already, follow the instructions [here](https://help.twilio.com/articles/360021347073-Proactive-Steps-for-Customers-Experiencing-Account-Takeover) for how to check whether any credentials have been exposed on GitHub. If your review indicates that your credentials were publicly exposed, follow the steps below to make the affected GitHub repository private and ensure it's no longer publicly accessible.

> \[!WARNING]
>
> All public access to your repository will be revoked. Only you and any collaborators you explicitly add will be able to see or pull from the repository. Any public forks of your repository will not be made private. They will be detached and become part of a separate network, and the fork owners will retain their copy.

1. Navigate to the main page of the repository you want to make private on [GitHub.com](https://github.com).
2. On the repository's main page, click the **Settings** tab near the top of the page.
3. Scroll down to the bottom of the **General** settings page to the red **Danger Zone** section.
4. In the Danger Zone section, find the **Change repository visibility** option and click the **Change visibility** button.
5. A drop-down option will appear. Select **Change to private**.
6. A popup will appear. Confirm the name of your repository and click **I want to make this repository private**.
7. Another popup will appear. Review the list of effects. Click the **I have read and understand these effects** button.
8. Review the final warning and confirm your choice by clicking **Make this repository private**.
9. Go back to your main GitHub profile page by clicking your profile icon in the top-right and selecting **Repositories**. Find the repository in your list. It will now have a **Private** label (vs. **Public**) next to its name.

For the latest and most authoritative source information on setting repository visibility, review the following public docs:

* [GitHub - Setting repository visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility)
* [Azure Repos](https://learn.microsoft.com/en-us/azure/devops/repos/)
* [Bitbucket Cloud](https://support.atlassian.com/bitbucket-cloud/docs/make-a-repo-private-or-public/)
* [AWS CodeCommit](https://docs.aws.amazon.com/codecommit/)

## Anomalous Traffic (AIT, Vishing/Smishing) - Control Remediation \[#anomalous-traffic-control-remediation]

> \[!WARNING]
>
> If the anomalous traffic event you are experiencing includes indicators of an ATO, **stop here** and follow the steps in the [ATO - Account Sanitization](#ato-account-sanitization) section first. Failure to do so will most likely result in a reoccurrence of fraudulent activity.

If you've confirmed you are subject to activity such as AIT or vishing/smishing, begin these containment steps immediately. The goal is to prevent further fraudulent calls and messages by cutting off all abuse of your services. This includes blocking threat actors from using features like OTP verification services or promo forms to generate unwanted voice calls or texts to suspicious numbers.

### 1. Restrict Geographic Permissions \[#restrict-geographic-permissions]

Twilio can prevent your application from dialing a premium rate number at the network level if the country is disabled.

1. Log in to your **Twilio Console**.
2. For [Programmable Voice](https://help.twilio.com/articles/223180228-International-Voice-Dialing-Geographic-Permissions-Geo-Permissions-and-How-They-Work):
   * On the left-hand side, navigate to **Voice > Settings > Geo permissions**.
3. For [Programmable SMS](https://www.twilio.com/docs/messaging/guides/sms-geo-permissions):
   * On the left-hand side, navigate to **Messaging > Settings > Geo permissions**.
4. Uncheck all countries in which you do not do business, and ensure only the specific countries you serve are checked. You may also want to verify that common fraud destinations (Latvia, Lithuania, Maldives, Somalia, Sierra Leone, etc.) are unchecked.
5. For [Verify](https://www.twilio.com/docs/verify/preventing-toll-fraud/verify-geo-permissions) for SMS and Voice channels (if you are using Twilio Verify):
   * On the left-hand side, navigate to **Verify > Settings > Geo permissions**.
   * You can choose to disable all traffic, allow all traffic, or monitor all traffic for blocking fraud (SMS only). Apply to individual countries or all countries within a continent.
6. Click **Save geographic permissions** when you are finished making your changes.

Your application should now receive an error when it tries to reach numbers being used by the threat actor and you will stop paying for these calls and/or messages.

### 2. Enable Twilio Fraud Protection (SMS only) \[#enable-twilio-fraud-protection]

If you are using Twilio Verify to support OTP, enable Fraud Guard to automatically detect and block abnormal traffic patterns to high-risk destinations:

1. Log in to your **Twilio Console**.
2. On the left-hand side, navigate to **Verify > Services**.
3. Select the affected Verify service.
4. Click the **SMS & RCS** tab and in the **Fraud Guard** section, click **Standard Protection** or **Max Protection**.
5. Click **Save**.

If you built your own 2FA with OTP using Programmable SMS:

1. Log in to your **Twilio Console**.
2. On the left-hand side, navigate to **Messaging > Settings > General**.
3. Under **SMS Pumping Protection**, select **Enabled** and click **Save**.

By enabling SMS Pumping Protection, Twilio will automatically monitor and block fraudulent SMS pumping attempts on your account. For the US and Canada, SMS Pumping Protection is provided at no additional cost, therefore you may not find a line item in the **Features** section of their SMS Pricing pages.

### Suspend Impacted Subaccounts \[#suspend-impacted-subaccounts]

If a specific subaccount in your organization is the one being impacted (and Twilio did not suspend the account on your behalf), follow this section to temporarily suspend all activity in that account without closing it.

> \[!NOTE]
>
> The Twilio Console may only show a **Close Subaccount** button. To suspend (pause) without deleting, you must use the API. To access this capability via the command line interface, you must have the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) installed and authenticated.

1. Log in to the **Twilio Console**.
2. In the top-left corner, click the **Account Selection** dropdown (it usually shows your current account name).
3. Click **View Subaccounts**. You will see a table listing all your subaccounts.
4. Locate the subaccount under the **Account Name** column. The `Account SID` (starting with `AC...`) will be listed in the column next to it. Copy the **Account SID**.
5. Open a terminal window and enter the following command (replacing `<SUBACCOUNT_SID_HERE>` with the copied Account SID from step 4):

```bash
twilio api:core:accounts:update --sid <SUBACCOUNT_SID_HERE> --status suspended
```

The status indicator next to the subaccount should now be orange/red and read **Suspended**. All API calls using that subaccount's credentials will now fail with a `401 Unauthorized` response. If you would like to reactivate your account after the investigation has concluded, enter the following:

```bash
twilio api:core:accounts:update --sid <SUBACCOUNT_SID_HERE> --status active
```

This section mainly details short-term containment, with the goal being to cut off threat actor access as soon as possible. For guidance on mid- and long-term containment and remediation, refer to the section [Define Preventive and Corrective Actions](/docs/usage/fraud-response-guide/diagnose#define-preventive-and-corrective-actions) in the [Diagnose](/docs/usage/fraud-response-guide/diagnose) phase.
