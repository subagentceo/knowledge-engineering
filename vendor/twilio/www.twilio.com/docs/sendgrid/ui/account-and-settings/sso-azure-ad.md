# Twilio SendGrid Single Sign-On with Azure Active Directory

This guide will help you configure the Twilio SendGrid Single Sign-On (SSO) with Microsoft Azure Active Directory (AD). For additional information, such as how to edit and manage users, see the complete [Twilio SendGrid SSO documentation](/docs/sendgrid/ui/account-and-settings/sso).

Twilio SendGrid Single Sign-On (SSO) uses the widely supported [Security Assertion Markup Language (SAML 2.0)](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/auth-saml) to integrate your Twilio SendGrid user authentication with identity and access management platforms.

## Prerequisites

### Plans and pricing

Single Sign-On (SSO) is available for Twilio SendGrid Email API Pro, Premier, and Marketing Campaigns Advanced plans only. See the Twilio SendGrid [pricing page](https://sendgrid.com/pricing/) for a full list of Twilio SendGrid features available by plan.

### Terminology

Throughout this guide, you will see the following terms used to describe Azure AD, Twilio SendGrid, and their relationship to one another.

* Identity Provider (IdP): Azure is the IdP in this SAML relationship.
* Service Provider (SP): Twilio SendGrid is the SP in this SAML relationship.

## Supported features

The Twilio SendGrid SAML-based Azure integration supports the following SSO [features](https://docs.microsoft.com/en-us/azure/active-directory/develop/single-sign-on-saml-protocol):

* IdP-initiated SSO
* SP-initiated SSO
* [JIT (Just-In-Time) Provisioning](https://docs.microsoft.com/en-us/azure/active-directory/app-provisioning/isv-automatic-provisioning-multi-tenant-apps#using-saml-jit-for-provisioning)

## Configuration steps

This documentation will guide you through SSO setup using the official [Twilio SendGrid SAML integration available in the Azure AD Gallery](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/aad.twiliosendgrid?tab=Overview).

### Add an SSO Integration to your Twilio SendGrid account

To add, delete, or modify an SSO integration, [log in](https://app.sendgrid.com/login) to the top level of your Twilio SendGrid account using your administrator credentials.

1. Navigate to **Settings > SSO Settings** in the left menu. The SendGrid App will display a page with an **Add Configuration** button.

   ![Twilio SendGrid SSO settings page with an option to add configuration.](https://docs-resources.prod.twilio.com/715f00ab88e50e64b7594498a428ec12378a3a59efee108a2fa6ebd05c7f17a5.png)
2. Click **Add Configuration**. A page will load and display the configuration fields listed in the table below.
3. You will add the **Single Sign-On URL** to your Azure integration as detailed in the next section of this guide. The rest of the values are provided for reference. Note that the Single Sign-On URL and Audience URL are the same.

| **Twilio SendGrid SSO Metadata Field** | **Description**                                                                                                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                               | A friendly name for your SAML SSO configuration.                                                                                                                    |
| **Single Sign-On URL**                 | The Twilio SendGrid URL where the IdP should `POST` its SAML assertion. The Single Sign-On URL and the Audience URL are the same when using Twilio SendGrid.        |
| **Audience URL (SP Entity ID)**        | A string identifier that defines the intended audience for the SAML assertion. The Audience URL and the Single Sign-On URL are the same when using Twilio SendGrid. |
| **SP Public Key**                      | A public key used to verify that requests are coming from Twilio SendGrid.                                                                                          |
| **Default RelayState**                 | Identifies a specific SP resource that an IdP will direct the user to following successful authentication.                                                          |
| **Name ID format**                     | The format used by an IdP when identifying a user in the SAML assertion.                                                                                            |
| **Application username**               | The default username used for the Service Provider's application. This is **Email** when using Twilio SendGrid.                                                     |

![SSO configuration page with fields for IdP name, Single Sign-On URL, Audience URL, and SP Public Key.](https://docs-resources.prod.twilio.com/9b0829d20582b3cf151b14cd9d06a4f0a62c46a995f545cb045f591f17a5c236.png)

### Add the Twilio SendGrid application from the Azure AD Gallery

Once an SSO Integration is added to your Twilio SendGrid account, you can configure the Twilio SendGrid Azure integration in the Azure Portal. You will select the official integration from the [Azure AD App Gallery](https://www.microsoft.com/en-us/security/business/identity-access-management/integrated-apps-azure-ad).

1. Sign in to the [Azure Portal](https://portal.azure.com/).
2. Select **Azure Active Directory** from the list of services. If you do not see **Azure Active Directory**, try searching or go to [All services](https://portal.azure.com/#allservices).

   ![Azure portal home with services like Active Directory and tools like Azure Monitor.](https://docs-resources.prod.twilio.com/0599bceaffea4a19d1a02b584f62f9c5dbaacab1e084bd990fe8e0863b737218.jpg)
3. From the Active Directory page, go to **Enterprise applications** in the left menu.

   ![Azure AD portal showing enterprise applications menu highlighted.](https://docs-resources.prod.twilio.com/5f7782752aa612dd1246b1ec8c9edc05d6ea2abb6ee1f3b620b39be222125002.jpg)
4. A page will load where you can select **+ New application** at the top.

   ![Azure AD portal showing Enterprise applications with a highlighted 'New application' button.](https://docs-resources.prod.twilio.com/b0dce98b60967fc10a4feef0d09acc0ca954d12393a9a93e04612815ede04eba.jpg)
5. The Azure AD Gallery will load. Search for "SendGrid" and select **Twilio SendGrid** from the results.

   ![Search results for SendGrid in Azure AD Gallery showing Twilio SendGrid app.](https://docs-resources.prod.twilio.com/8c72709c89559277436dd5fd5d76a70e99d06c6746968ba97303470ca8e71fee.jpg)
6. A preview with application details will appear to the right.
7. Click **Create** at the bottom.

   ![Azure AD Gallery showing Twilio SendGrid app with SSO and provisioning details.](https://docs-resources.prod.twilio.com/b8c3f4634d3d499f2703cbb39b0d50bf756a4fbff668092ffd2fc5a254015864.jpg)
8. The Twilio SendGrid SSO application overview page will load. Select **Get started** on the **Set up single sign on** tile.

   ![Azure AD setup for single sign-on with Twilio SendGrid, highlighting user assignment and provisioning steps.](https://docs-resources.prod.twilio.com/13e806484bfb882535d1233fc372b25009db6440cf34b2fc9e7f276d3392489a.jpg)
9. The **Single sign-on** page will load. Select **SAML**.

   ![SAML tile selected for single sign-on setup in Twilio Sendgrid Azure AD.](https://docs-resources.prod.twilio.com/aca6aef67dc384d7c15d7d547564a4bbf215f0742e66c5b9b95091ebfdc29e33.jpg)
10. A page will load where you can configure the SAML values as shown in the following sections of this guide.

#### Configure the Twilio SendGrid Azure application

Once the official Twilio SendGrid application is added to your Azure Portal, you will configure it to establish the SAML relationship between Twilio SendGrid and Azure AD.

1. Retrieve the Twilio SendGrid Single Sign-on URL from the Twilio SendGrid App if you have not already done so.
2. Click the **Edit** icon in the following sections of the Azure configuration page, and modify them as outlined below. You will click **Save** after editing each section.

##### Basic SAML Configuration

Note that the value is the same for both required fields because the Single Sign-on URL and Audience URL are the same for Twilio SendGrid.

* **Identifier (Entity ID):** **The Audience URL (SP Entity ID)** provided by the Twilio SendGrid App.
* **Reply URL (Assertion Consumer Service URL):** The **Single Sign-on URL** provided by the Twilio SendGrid App.
* **Sign on URL:** This field is optional and should be left blank. If you are using [just-in-time provisioning](#just-in-time-provisioning) to create your Teammates, you must leave this field blank.

  ![Azure AD SAML configuration for Twilio SendGrid with identifier and reply URL fields.](https://docs-resources.prod.twilio.com/4bcc4d35428684e80c0600583fa7a0bc8892d06f86d02e2e13ef7f25cb195e26.jpg)

> \[!NOTE]
>
> If you have already integrated Twilio SendGrid with Azure AD manually (i.e., not using the official integration), you can enable JIT provisioning with your current integration. See the "[Manually configuring JIT provisioning](#manually-configuring-jit-provisioning)" section for instructions.

##### Attributes & Claims

The Attributes & Claims are pre-populated for you when using the official Twilio SendGrid integration. You do not need to make any changes to this section of the SAML configuration. The following information is provided for your reference.

There are three attributes used by Twilio SendGrid: the Unique User Identifier, a FirstName, and a LastName. The FirstName and LastName attributes are required only if you enable JIT provisioning. See the [JIT provisioning section of this guide](#just-in-time-provisioning) for more information.

The **Unique User Identifier**'s **Name identifier format** is set to **Email address**, and the **Source attribute** is set to **user.userprincipalname**.

![Azure AD page showing Unique User Identifier set to user.userprincipalname.](https://docs-resources.prod.twilio.com/f9bd8a9971f93cabeeb59d4ca9445d89823a13462bfdd26a35fc18089d8fb86e.jpg)

![Azure AD claim settings for LastName with user.surname as source attribute.](https://docs-resources.prod.twilio.com/fba05e643e0b57d77b4ee5bdfd738e6a2b8c87d9d1b6e8a7c5f821f97f6212a1.jpg)

The **FirstName** and **LastName** attributes have a **Name** and **Source attribute**. These attributes are set as shown below.

* **FirstName:** **user.givenname**
* **LastName:** **user.surname**

  ![SAML attributes FirstName and LastName mapped to user.givenname and user.surname.](https://docs-resources.prod.twilio.com/ee2e09cc3cd21eabfa93b21b02d1caf238cb66ccc5cf8f7d3d553a8bce8206d2.jpg)

The Unique User Identifier, FirstName, and LastName attributes are the only attributes used by Twilio SendGrid. You can optionally delete the remaining attributes that Azure AD includes during the app creation process.

![Attributes and Claims with values for FirstName, LastName, and Unique User Identifier.](https://docs-resources.prod.twilio.com/e5305dd6e79f80b91aad672200aa02916708ce40e534ced503e899b1001c9a1a.jpg)

##### SAML Signing Certificate

The **SAML Signing Certificate** section is where you will find the X509 certificate that identifies Azure assertions to Twilio SendGrid.

1. Download the Base64 encoded version of the certificate and open it in a text editor.
2. You will copy the certificate to your clipboard and add it to the Twilio SendGrid App in the next section.

##### Set up Twilio SendGrid

The set up section contains values required by Twilio SendGrid to establish a relationship with Azure AD.

1. Copy the following values from this section of the Azure SAML set up page. You will use them in the next section of this guide. Note that the **Login URL** and **Logout URL** are the same for this setup.
   * **Login URL**
   * **Azure AD Identifier**

### Complete SAML setup with Twilio SendGrid

Once you have configured the previous settings where appropriate in your Azure integration, you must add the values provided by Azure to your Twilio SendGrid SSO configuration.

1. You should have the following values from the **Set up Twilio SendGrid** section of your Azure SAML setup.
   * **Login URL**
   * **Azure AD Identifier**
2. Return to the Twilio SendGrid App.
3. From the page displaying your SendGrid SSO configuration, click **Next**.

   ![Twilio SendGrid SSO page showing SAML Issuer ID and Embed Link fields.](https://docs-resources.prod.twilio.com/c80746c4299f38cfc01096012a0f69d30fda2860b3ec8109bc3a2483154bc7f8.jpg)
4. You will now add the values you retrieved from Azure as specified below.
   * **SAML Issue ID:** The **Azure AD Identifier**. This value will be a URL.
   * **Embed Link:** The **Azure Login URL**. This is Azure AD's SAML `POST` endpoint, and it receives requests that initiate an SSO login flow.

     ![The Twilio SendGrid SSO App page with complete IdP values.](https://docs-resources.prod.twilio.com/875f536ea2e22803f122be326ecd3fc99a14f20cb35bbd1338ffb29bdba51973.jpg)
5. Click **Add Certificates** to display a menu with an **X509 Certificate** field.
6. Open the Base64 encoded X509 certificate you downloaded from Azure in a text editor and copy it to your clipboard.
7. Paste the X509 Certificate into the **X509 Certificate** field in the Twilio SendGrid App and click **Add Certificate**.

   ![Interface for adding an X509 certificate in Twilio SendGrid with certificate details.](https://docs-resources.prod.twilio.com/28832fa27676f713652f5bea4a6e50584b07fa9868765fea5746c7dffeb787c1.jpg)
8. Select **Enable SSO** to complete the configuration. You can also **Save without enabling**.

Your SSO configuration and integration with the Azure Active Directory IdP is now complete.

## Adding users to your Azure application

Once you complete your Azure configuration in the Twilio SendGrid App, you will be able to manage users. Twilio SendGrid calls these users Teammates.

### Just-in-Time provisioning

If you enable just-in-time (JIT) provisioning for your SSO configuration, you need only to assign users to the Twilio SendGrid App in Azure AD. Assigned users will be created as SSO Teammates when they log in to Twilio SendGrid for the first time.

> \[!NOTE]
>
> JIT provisioning will assign Teammates to the Twilio SendGrid parent account. It is not possible to assign JIT provisioned Teammates to Subusers.

> \[!NOTE]
>
> JIT provisioning is only possible from an IdP-initiated sign-on flow. When assigning users to your Twilio SendGrid App, you may want to instruct them to log in from your IdP the first time.

To enable JIT provisioning for your SSO configuration, you must edit the SAML configuration from the SSO settings page in the Twilio SendGrid App.

1. Edit a configuration by selecting **Settings > SSO Settings** from the left sidebar navigation. A page will load displaying all your existing IdP configurations.
2. Each configuration will have an action menu to the far right. Select this menu to display a dropdown where you can choose **Edit** or **Disable**.

   ![SSO settings page with options to edit or disable IdP configuration.](https://docs-resources.prod.twilio.com/f1f6c589e1e67ad724ea255de6224973b09cbfbed87da5656864debcf952e142.png)
3. Select **Edit** from the action menu. A page will load that allows you to modify or complete an unfinished SSO integration. In addition to the fields available during initial setup, you will have **Status** and **Just-in-Time Provisioning** toggles.

| **Twilio SendGrid SSO Metadata Field** | **Description**                                                                                                                              |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Status**                             | A toggle where you can enable or disable the SSO configuration.                                                                              |
| **Just-in-Time Provisioning**          | A toggle to enable or disable just-in-time (JIT) provisioning. When JIT is enabled, you can auto provision users with read-only permissions. |

![Edit My IdP configuration with status and just-in-time provisioning enabled.](https://docs-resources.prod.twilio.com/e54c374b88ca49b3657d8d56041ec6c2c21a76780cc806a0e7695e80de82561d.jpg)

4. Click the **Just-in-Time Provisioning** toggle so that **Enabled** is shown in blue. Then, click **Save** at the bottom of the page.

   ![Edit a Twilio SendGrid IdP configuration.](https://docs-resources.prod.twilio.com/c6c7c5ffd41646b3233656cff5c88d63bffae098386ca80cdbf9c1c38db3c1f5.jpg)

The Twilio SendGrid SAML integration supports **FirstName** and **LastName** entity attributes. You can modify the values assigned to them as an administrator in the Twilio SendGrid App.

JIT provisioned Teammates will be given a Restricted Access account with permissions that correspond to read-only access. An administrator can modify a Teammate's permissions in the Twilio SendGrid App. See the Teammates documentation for [more about Teammate scopes](/docs/sendgrid/ui/account-and-settings/teammates#configuring-permissions).

### Manually configuring JIT provisioning

> \[!WARNING]
>
> The following JIT instructions are provided as a reference for customers who have already integrated Twilio SendGrid with Azure AD manually (i.e., not using the official integration).

If you already have Twilio SendGrid configured with Azure AD using a manually created configuration, you can add JIT provisioning by editing your existing configuration in Azure.

1. Sign in to the [Azure Portal](https://portal.azure.com/).
2. Select **Azure Active Directory** from the list of services. If you do not see Azure Active Directory, try searching or go to [All services](https://portal.azure.com/#allservices).

   ![Azure portal home with services like Active Directory and tools like Azure Monitor.](https://docs-resources.prod.twilio.com/0599bceaffea4a19d1a02b584f62f9c5dbaacab1e084bd990fe8e0863b737218.jpg)
3. From the Active Directory page, go to **Enterprise applications** in the left menu.

   ![Azure AD portal showing enterprise applications menu highlighted.](https://docs-resources.prod.twilio.com/5f7782752aa612dd1246b1ec8c9edc05d6ea2abb6ee1f3b620b39be222125002.jpg)
4. You will see a list of your applications, including your Twilio SendGrid integration. Select it from the list.

   ![Twilio SendGrid app listed under Azure AD enterprise applications with filters applied.](https://docs-resources.prod.twilio.com/92d72e1f9feab12ea52070ed66fb4078702ab8f906f38dc3b4651d06e41ec4dc.jpg)
5. Your application's page will load. Select **Get started** from the **Set up single sign on** tile.

   ![Azure AD setup for single sign-on with Twilio SendGrid, highlighting user assignment and provisioning steps.](https://docs-resources.prod.twilio.com/13e806484bfb882535d1233fc372b25009db6440cf34b2fc9e7f276d3392489a.jpg)
6. The SAML configuration settings will load for the Twilio SendGrid integration. Edit the **Attributes & Claims** section as shown below.

   ![Azure SAML SSO settings with basic configuration and attributes claims for Twilio Sendgrid.](https://docs-resources.prod.twilio.com/4d8e3703ecb48d3281dd5b8720f30e5c9e4d8dbed0c457144536c5addce2d9c9.jpg)

#### Attributes & Claims \[#attributes---claims-2]

The one required attribute you must make sure is correct is the **Unique User Identifier**. The **Name identifier format** must be set to **Email address**.

7. To edit the **Unique User Identifier**, click **Edit** on the **Attributes & Claims** menu.
8. From the page that loads, click the **Unique User Identifier (Name ID)** field to load a details page.

   ![Azure AD page showing Unique User Identifier set to user.userprincipalname.](https://docs-resources.prod.twilio.com/f9bd8a9971f93cabeeb59d4ca9445d89823a13462bfdd26a35fc18089d8fb86e.jpg)
9. Verify or edit the fields as follows.

* **Name identifier format:** **Email address**
* **Source attribute:** **user.userprincipalname**

  ![Azure AD claim settings for LastName with user.surname as source attribute.](https://docs-resources.prod.twilio.com/fba05e643e0b57d77b4ee5bdfd738e6a2b8c87d9d1b6e8a7c5f821f97f6212a1.jpg)

Additional FirstName and LastName attribute statements are needed if you enable just-in-time (JIT) provisioning. For each attribute statement, you will have a **Name** and **Source attribute**. You will set up FirstName and LastName attributes as follows.

10. Click **Edit** on the **Attributes & Claims** menu.
11. From the page that loads, click **+ Add new claim** to load a configuration page.

    ![Azure portal showing options to add new claims with existing required and additional claims listed.](https://docs-resources.prod.twilio.com/a5e1ba71be1e3b91b11110908576c006b8f34a0e2b8690f6830f330e9f15cfbf.jpg)
12. Add the FirstName attribute with the following values.

* **Name:** **FirstName**
* **Namespace:** You can leave this field blank.
* **Source:** Leave **Attribute** checked.
* **Source attribute:** **user.givenname**

  ![The FirstName attribute settings.](https://docs-resources.prod.twilio.com/78da9c82bf5aeea5cc7a0f68ccc95079d1de46a11d5ff1fba0e308c74616262c.jpg)

13. Click **Save** and repeat this process to add a LastName attribute with the following values.

* **Name:** **LastName**
* **Namespace:** You can leave this field blank.
* **Source:** Leave **Attribute** checked.
* **Source attribute:** **user.surname**

  ![The LastName attribute settings.](https://docs-resources.prod.twilio.com/3f32d4e99f2d8a07ecc6b55dd7bccb9e7b2fb8776677e507786450f6e47a8543.jpg)

The Unique User Identifier, FirstName, and LastName attributes are the only attributes used by Twilio SendGrid. You can optionally delete the remaining attributes that Azure AD includes during the app creation process.

![Attributes and Claims with values for FirstName, LastName, and Unique User Identifier.](https://docs-resources.prod.twilio.com/e5305dd6e79f80b91aad672200aa02916708ce40e534ced503e899b1001c9a1a.jpg)

### Additional user management steps

You can add Twilio SendGrid SSO Teammates manually, delete Teammates, and modify Teammates' permissions in the Twilio SendGrid App. See the [user management section of the Twilio SendGrid SSO docs](/docs/sendgrid/ui/account-and-settings/sso#manage-users) for instructions.

## Support

If you are having trouble configuring Twilio SendGrid SSO, please [submit a support ticket](https://support.sendgrid.com/hc/en-us), and the Twilio SendGrid Support Team will be in touch.
