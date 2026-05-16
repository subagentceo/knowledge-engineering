# Arkose on Microsoft Entra - Integration Setup

# Overview

Microsoft Entra partners with Arkose Labs to deliver comprehensive protection against malicious online activities, securing account registration process. This integrated approach ensures that Arkose Labs filters out fraudulent and automated traffic before it can interact with your applications, while Microsoft Entra handles the secure authentication of legitimate users. When suspicious activity is detected, users encounter Arkose Labs' challenge mechanisms that effectively thwart both automated bots and coordinated human attack networks. These security measures are designed to preserve user experience by only activating during suspicious circumstances, ensuring minimal disruption to genuine authentication workflows.

## The Challenge

* Digital platforms face relentless attacks from cybercriminals seeking to create fraudulent profiles for malicious activities including financial fraud, spam campaigns, and platform abuse.
* Attack methodologies continue to evolve in sophistication, prompting organizations across industries to seek advanced defensive solutions for their security arsenals.
* Modern enterprises must strike a delicate balance between implementing robust security protocols and maintaining frictionless experiences for legitimate users.

## How the Integration Works

* Arkose Labs acts as the first line of defense. It analyzes incoming traffic patterns using advanced telemetry to identify suspicious behavior.
* When threats are detected, the system deploys targeted challenges. These puzzles are simple for real users but impossible for bots to solve efficiently.
* Legitimate users pass through to Microsoft Entra seamlessly. The identity platform then handles secure authentication and access verification.

### Advanced Threat Protection

* Modern attacks use both automated bots and coordinated human networks. Traditional security measures often fail against these evolving tactics.
* The Arkose Labs solution specifically targets scalability weaknesses in attack operations. Fraudsters cannot economically solve challenges across large-scale campaigns.
* Microsoft Entra provides the authentication backbone. It ensures verified users receive appropriate access rights and permissions.

### User Experience Benefits

* Security challenges only appear during suspicious activity. Most legitimate users never encounter additional authentication steps.
* The integration operates within existing Microsoft Entra authentication flows. No reverse proxies or additional infrastructure requirements are needed.
* Organizations can deploy this protection across multiple platforms. Mobile apps and websites receive consistent security coverage without configuration changes.

### Fraud Prevention Capabilities

* The system effectively prevents fake account creation used for spam and abuse.
* Real users experience minimal friction during normal login processes. Enhanced security operates transparently in the background.
* Arkose Labs guarantees their challenges remain unsolvable at scale. This commitment is backed by independent service level agreements.

## How to Configure

### Step 1: Creating an Arkose account

1. Load Arkose Bot Manager website: [Arkose Bot Manager](https://www.arkoselabs.com/arkose-bot-manager/).
2. Click **Talk To Our Experts** button contact and register an Arkose Bot Manager account.
3. Login to [Arkose Command Center](https://portal.arkoselabs.com/) to obtain the following details.
   * Public key
   * Private key

### Step 2: Creating a Service Integration

1. Log in to your Microsoft Entra account.
2. Navigate and select the **Service Integrations** section in the side navigation panel.
3. After the page loads, click **Get started** button in the **Sign-up protection (Preview)** section.

   ![](https://files.readme.io/fefe86a2a5e2a3ca7a79ae66ed243942645f8cb17f0a9c2d72018db632b07bb4-image.png)
4. Provide a name for the policy in the Policy Setup page, ensure that **Fraud protection at sign-up** is selected and then select **Next**.

   ![](https://files.readme.io/916b3ef4d0a298936d628d47b46c3a9ee012c3f9cb3d4354e8de89d693cdbf2d-image.png)
5. Select Arkose Labs in the Sign-up provider screen and then select **Next**.

   ![](https://files.readme.io/979019afba118d8d7227e07c0711139296d452626871d3ddec038645667947ce-image.png)
6. In the **Sign-up provider configuration** page, select **Create new** in the **Configure Arkose fraud protection** step.

   ![](https://files.readme.io/517a1588b5680ccb58f5e8b6557dbe352f128b4c22e6f8bcc1472a325b6f1507-image.png)
7. Add the following parameters for the Arkose Bot Manager configuration and select Next.

   | Variable           | Description                                                                                 | Sample                               |
   | :----------------- | :------------------------------------------------------------------------------------------ | :----------------------------------- |
   | Configuration name | A configuration name                                                                        | Arkose Config for Sign-up page       |
   | Public key         | Arkose public key obtained through [Arkose Command Center](https://portal.arkoselabs.com/)  | XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX |
   | Private key        | Arkose private key obtained through [Arkose Command Center](https://portal.arkoselabs.com/) | XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX |
   | Client Subdomain   | A customer specific subdomain to use for the verify call. For example `companyname-api`     | \<companyname>-api                   |
   | Verify Subdomain   | A customer specific subdomain to use for the verify call. For example `companyname-verify`  | \<companyname>-verify                |
8. In the **Apps to protect** page, select the App(s) you want Arkose Bot Manager to protect and then select **Next**.

   ![](https://files.readme.io/8e8089c1a6438127174356438c0db0e8f407214bdf0491bf055765fea133768d-image.png)
9. Confirm that the protection policy configured is correct in the **Summary and completion** page, and select **Create Policy** to complete the step.

   ![](https://files.readme.io/c11bbca11ce1c95a18077ee086052e42323abfa2b9ed8e51b19e97558f7e2416-image.png)

### Step 3: Validate Arkose Bot Manager protection in application Quickstart

1. Navigate and select the **App registrations** section in the side navigation panel.
2. In the **App registrations** page, select the application you had configured for the Arkose Fraud Protection policy in the list.
3. In the application details page, navigate and select **Quickstart** section.
4. Customize the sign up experience by following the steps on the page and **try out** the sign up page with Arkose Bot Manager protection.
5. Confirm and complete the steps.