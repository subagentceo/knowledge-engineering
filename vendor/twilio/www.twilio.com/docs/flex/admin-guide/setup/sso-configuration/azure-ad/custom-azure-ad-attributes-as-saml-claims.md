# Pass custom Entra ID attributes as Twilio Flex SAML claims

To use Microsoft Entra ID extension properties as SAML claims in Twilio Flex, you need to [customize claims using a policy](https://learn.microsoft.com/en-us/entra/identity-platform/reference-claims-customization) that you create with Microsoft Graph API or PowerShell. This is because you can't add extension properties as claims using the Microsoft Entra ID admin center interface. Follow the Graph API example in this document to learn how you can:

* Create an Entra ID extension property.
* Create a claims mapping policy.
* Pass the property as a custom attribute for your Flex users.

## Open Microsoft Graph Explorer

1. Open and log in to your [Microsoft Entra ID admin center](https://entra.microsoft.com).
2. In a separate tab, open the [Microsoft Graph API Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer), click **Sign in to Graph Explorer**, and then select your Entra administrator account to use for Graph Explorer.
   ![Graph Explorer authentication page with sign-in prompt for personal data access.](https://docs-resources.prod.twilio.com/69c3c9949604b5ef446ad8da642753254617cfe3d9da82312aae94c331aa10f5.png)
3. Make sure to [consent to the following permissions requirements](https://docs.microsoft.com/en-us/graph/graph-explorer/graph-explorer-features#consent-to-permissions):
   ![Microsoft Graph API permissions with consented status for Directory Access, Read, and ReadWrite.](https://docs-resources.prod.twilio.com/6d46d54b762333470074b6a818469d5a9164530948f70f14be3e424cba5e28bb.png)

## Gather supporting IDs

You'll need to retrieve these IDs for use in the next steps:

* Service Principal Entity ID
* Application Entity ID

Click the respective tab for detailed instructions:

## Service Principal Entity ID

Run the following Graph Explorer query to retrieve your Service Principal Entity ID. Make sure to:

* Replace with a portion of your enterprise application name on the URL field. For example, if your app name is *Twilio Flex*, you can enter `displayname:flex` as the `$search` query parameter value.
* Click the **Request headers** tab to add the key-value pair.

#### Example request

```bash
HTTP method: GET
API version: v1.0
Endpoint URL: https://graph.microsoft.com/v1.0/servicePrincipals?$search="displayName:<Your_App_Name>"
Request header key: ConsistencyLevel
Request header value: eventual
```

* Click **Run query** and in the JSON response, look for the array object whose `appDisplayName` value matches your enterprise application name.
* Copy the `id` value and paste it somewhere you can reference it.

#### Example response

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#servicePrincipals",
  "value": [
      {
          "id": "cdxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          "deletedDateTime": null,
          "accountEnabled": true,
          "alternativeNames": [],
          "appDisplayName": "Twilio Flex testing",
          "appDescription": null,
          "appId": "xxx",
          "applicationTemplateId": "xxx",
          "appOwnerOrganizationId": "xxx",
          "appRoleAssignmentRequired": true,
          "createdDateTime": "2021-11-24T18:17:10Z",
          "description": null,
          "disabledByMicrosoftStatus": null,
          "displayName": "Twilio Flex testing",
          "homepage": "https://account.activedirectory.windowsazure.com:444/applications/default.aspx?metadata=customappsso|ISV9.1|primary|z",
          "loginUrl": null,
          "logoutUrl": null,
          "notes": null,
          "notificationEmailAddresses": [
              "user@userdomain.onmicrosoft.com"
          ],
          "preferredSingleSignOnMode": "saml",
          "preferredTokenSigningKeyThumbprint": "xxxx",
          "replyUrls": [
              "https://iam.twilio.com/v1/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/saml2/"
          ],
          "servicePrincipalNames": [
              "https://iam.twilio.com/v1/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/saml2/metadata",
              "xxx"
          ],
          "servicePrincipalType": "Application",
          "signInAudience": "EntraIDMyOrg",
          "tags": [
              "WindowsEntraIDCustomSingleSignOnApplication",
              "WindowsEntraIDIntegratedApp"
          ],
          "tokenEncryptionKeyId": null,
          "resourceSpecificApplicationPermissions": [],
          "verifiedPublisher": {
              "displayName": null,
              "verifiedPublisherId": null,
              "addedDateTime": null
          },
          "addIns": [],
          "appRoles": [
              {
                  "allowedMemberTypes": [
                      "User"
                  ],
                  "description": "admin",
                  "displayName": "Admin",
                  "id": "yyy",
                  "isEnabled": true,
                  "origin": "Application",
                  "value": "admin"
              },
              {
                  "allowedMemberTypes": [
                      "User"
                  ],
                  "description": "supervisor",
                  "displayName": "Supervisor",
                  "id": "zzz",
                  "isEnabled": true,
                  "origin": "Application",
                  "value": "supervisor"
              },
              {
                  "allowedMemberTypes": [
                      "User"
                  ],
                  "description": "agent",
                  "displayName": "Agent",
                  "id": "aaa",
                  "isEnabled": true,
                  "origin": "Application",
                  "value": "agent"
              },
              {
                  "allowedMemberTypes": [
                      "User"
                  ],
                  "description": "msiam_access",
                  "displayName": "msiam_access",
                  "id": "bbb",
                  "isEnabled": true,
                  "origin": "Application",
                  "value": null
              }
          ],
          "info": {
              "logoUrl": null,
              "marketingUrl": null,
              "privacyStatementUrl": null,
              "supportUrl": null,
              "termsOfServiceUrl": null
          },
          "keyCredentials": [
              {
                  "customKeyIdentifier": "xxx",
                  "displayName": "CN=Microsoft Entra Federated SSO Certificate",
                  "endDateTime": "2024-11-24T18:24:49Z",
                  "key": null,
                  "keyId": "xxx",
                  "startDateTime": "2021-11-24T18:24:49Z",
                  "type": "AsymmetricX509Cert",
                  "usage": "Verify"
              },
              {
                  "customKeyIdentifier": "xxx",
                  "displayName": "CN=Microsoft Entra Federated SSO Certificate",
                  "endDateTime": "2024-11-24T18:24:49Z",
                  "key": null,
                  "keyId": "xxx",
                  "startDateTime": "2021-11-24T18:24:49Z",
                  "type": "AsymmetricX509Cert",
                  "usage": "Sign"
              }
          ],
          "oauth2PermissionScopes": [
              {
                  "adminConsentDescription": "Allow the application to access Twilio Flex testing on behalf of the signed-in user.",
                  "adminConsentDisplayName": "Access Twilio Flex testing",
                  "id": "xxx",
                  "isEnabled": true,
                  "type": "User",
                  "userConsentDescription": "Allow the application to access Twilio Flex testing on your behalf.",
                  "userConsentDisplayName": "Access Twilio Flex testing",
                  "value": "user_impersonation"
              }
          ],
          "passwordCredentials": [
              {
                  "customKeyIdentifier": "xxx",
                  "displayName": "CN=Microsoft Entra Federated SSO Certificate",
                  "endDateTime": "2024-11-24T18:24:49Z",
                  "hint": null,
                  "keyId": "xxx",
                  "secretText": null,
                  "startDateTime": "2021-11-24T18:24:49Z"
              }
          ],
          "samlSingleSignOnSettings": {
              "relayState": ""
          }
      }
  ]
}
```

## Application Entity ID

Run the following Graph Explorer query to retrieve your Application Entity ID. Make sure to:

* In the URL field, replace `<Your_App_Name>` with a portion of your Enterprise app name on the URL field. For example, if your app name is *Twilio Flex*, you can enter `displayname:flex` as the `$search` query parameter value.
* Click the **Request headers** tab to add the key-value pair.

#### Example request \[#example-request-2]

```bash
HTTP method: GET
API version: v1.0
Endpoint URL: https://graph.microsoft.com/v1.0/applications

```

* Click **Run query** and in the JSON response, look for the array object whose `displayName` value matches your enterprise application name.
* Copy the `id` value and paste it somewhere you can reference it.

#### Example response \[#example-response-2]

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#applications",
  "value": [
      {
          "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          "deletedDateTime": null,
          "appId": "xxx",
          "applicationTemplateId": "xxx",
          "disabledByMicrosoftStatus": null,
          "createdDateTime": "2021-10-28T15:46:08Z",
          "displayName": "Flex 2",
          "description": null,
          "groupMembershipClaims": null,
          "identifierUris": [],
          "isDeviceOnlyAuthSupported": null,
          "isFallbackPublicClient": false,
          "notes": null,
          "publisherDomain": "usertwilio.onmicrosoft.com",
          "signInAudience": "EntraIDMyOrg",
          "tags": [],
          "tokenEncryptionKeyId": null,
          "defaultRedirectUri": null,
          "certification": null,
          "optionalClaims": null,
          "addIns": [],
          "api": {
              "acceptMappedClaims": null,
              "knownClientApplications": [],
              "requestedAccessTokenVersion": null,
              "oauth2PermissionScopes": [
                  {
                      "adminConsentDescription": "Allow the application to access Flex 2 on behalf of the signed-in user.",
                      "adminConsentDisplayName": "Access Flex 2",
                      "id": "xxx",
                      "isEnabled": true,
                      "type": "User",
                      "userConsentDescription": "Allow the application to access Flex 2 on your behalf.",
                      "userConsentDisplayName": "Access Flex 2",
                      "value": "user_impersonation"
                  }
              ],
              "preAuthorizedApplications": []
          },
          "appRoles": [
              {
                  "allowedMemberTypes": [
                      "User"
                  ],
                  "description": "User",
                  "displayName": "User",
                  "id": "18d14569-c3bd-439b-9a66-3a2aee01d14f",
                  "isEnabled": true,
                  "origin": "Application",
                  "value": null
              },
              {
                  "allowedMemberTypes": [
                      "User"
                  ],
                  "description": "msiam_access",
                  "displayName": "msiam_access",
                  "id": "xxx",
                  "isEnabled": true,
                  "origin": "Application",
                  "value": null
              }
          ],
          "info": {
              "logoUrl": null,
              "marketingUrl": null,
              "privacyStatementUrl": null,
              "supportUrl": null,
              "termsOfServiceUrl": null
          },
          "keyCredentials": [],
          "parentalControlSettings": {
              "countriesBlockedForMinors": [],
              "legalAgeGroupRule": "Allow"
          },
          "passwordCredentials": [],
          "publicClient": {
              "redirectUris": []
          },
          "requiredResourceAccess": [],
          "verifiedPublisher": {
              "displayName": null,
              "verifiedPublisherId": null,
              "addedDateTime": null
          },
          "web": {
              "homePageUrl": "https://account.activedirectory.windowsazure.com:444/applications/default.aspx?metadata=customappsso|ISV9.1|primary|z",
              "logoutUrl": null,
              "redirectUris": [],
              "implicitGrantSettings": {
                  "enableAccessTokenIssuance": false,
                  "enableIdTokenIssuance": true
              }
          },
          "spa": {
              "redirectUris": []
          }
      },
      {
          "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          "deletedDateTime": null,
          "appId": "xxx",
          "applicationTemplateId": "xxx",
          "disabledByMicrosoftStatus": null,
          "createdDateTime": "2021-11-24T18:17:09Z",
          "displayName": "Twilio Flex",
          "description": null,
          "groupMembershipClaims": null,
          "identifierUris": [
              "https://iam.twilio.com/v1/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/saml2/metadata"
          ],
          "isDeviceOnlyAuthSupported": null,
          "isFallbackPublicClient": false,
          "notes": null,
          "publisherDomain": "mbermudeztwilio.onmicrosoft.com",
          "signInAudience": "EntraIDMyOrg",
          "tags": [],
          "tokenEncryptionKeyId": null,
          "defaultRedirectUri": null,
          "certification": null,
          "optionalClaims": null,
          "addIns": [],
          "api": {
              "acceptMappedClaims": null,
              "knownClientApplications": [],
              "requestedAccessTokenVersion": null,
              "oauth2PermissionScopes": [
                  {
                      "adminConsentDescription": "Allow the application to access Twilio Flex on behalf of the signed-in user.",
                      "adminConsentDisplayName": "Access Twilio Flex",
                      "id": "xxx",
                      "isEnabled": true,
                      "type": "User",
                      "userConsentDescription": "Allow the application to access Twilio Flex on your behalf.",
                      "userConsentDisplayName": "Access Twilio Flex",
                      "value": "user_impersonation"
                  }
              ],
              "preAuthorizedApplications": []
          }
          ...
      }
  ]
}
```

## Create Entra ID extension property

In this section, you'll create an extended (custom) property for the enterprise application that you can then populate for your target Flex users.

Run the following Graph Explorer query. Make sure to:

* In the URL field, replace `<Application_Entity_ID>` with the application entity ID you noted earlier.
* Click the **Request body** tab to add the JSON in the Request body field. Replace `<Property_Name>` with the name you want to use for the extension.

### Example request \[#example-request-3]

```bash
HTTP method: POST
API version: v1.0
Endpoint URL: https://graph.microsoft.com/v1.0/applications/<Application_Entity_ID>/extensionProperties
Request body: 
{
    "name": "<Property_Name>",
    "dataType": "String",
    "targetObjects": ["User"]
}
```

Click **Run query** and in the JSON response, copy and paste the `name` value of the new extension property for reference in later steps. It will be in the format `extension\_\<App\_ID>\_\<Property\_Name>`.

### Example response \[#example-response-3]

```json
{
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#applications('xxx')/extensionProperties/$entity",
    "id": "xxx",
    "deletedDateTime": null,
    "appDisplayName": "Twilio Flex testing",
    "dataType": "String",
    "isSyncedFromOnPremises": false,
    "name": "extension_xxx_language",
    "targetObjects": [
        "User"
    ]
}
```

## Populate extension property on Entra ID user

Now that you've created an extension property created, add it to a user.

Run the following Graph Explorer query. Make sure to:

* In the URL field, you can pass either the user ID or the user principal name (UPN). Replace `<ID \| UserPrincipalName>` with either the object ID or the UPN of the Entra ID user you want to update.
* Click the **Request body** tab to add the JSON in the Request body field.

  * Replace `<extension_<App_ID>_<Property_Name>` with the name of the extension property created in the previous step.
  * Replace "My Custom Value" with the value you want to assign to this property.

### Example request \[#example-request-4]

```bash
HTTP method: PATCH
API version: v1.0
Endpoint URL: https://graph.microsoft.com/v1.0/users/<ID | UserPrincipalName>
Request body: 
{
"extension_<App_ID>_<Property_Name>": "My Custom Value"
}


```

Click **Run query**.

### Example response \[#example-response-4]

```json
204 {}
```

To confirm the user was updated successfully, run the following query.

### Example request \[#example-request-5]

```bash
HTTP method: GET
API version: beta
Endpoint URL: https://graph.microsoft.com/beta/users/<ID | UserPrincipalName>

```

In the JSON response, you should see the new extension property and assigned value in the user's properties.

### Example response \[#example-response-5]

```json
{
  "@odata.context": "https://graph.microsoft.com/beta/$metadata#users/$entity",
  "id": "xxxx",
  "deletedDateTime": null,
  "accountEnabled": true,
  "ageGroup": null,
  "businessPhones": [],
  "city": null,
  "createdDateTime": "2021-11-19T06:55:28Z",
  "creationType": null,
  "companyName": null,
  "consentProvidedForMinor": null,
  "country": null,
  "department": null,
  "displayName": "Test User",
  "employeeId": null,
  "employeeHireDate": null,
  "employeeType": null,
  "faxNumber": null,
  "givenName": "Test",
  "imAddresses": [],
  "infoCatalogs": [],
  "isManagementRestricted": null,
  "isResourceAccount": null,
  "jobTitle": null,
  "legalAgeGroupClassification": null,
  "mail": null,
  "mailNickname": "testuser",
  "mobilePhone": null,
  "onPremisesDistinguishedName": null,
  "officeLocation": null,
  "onPremisesDomainName": null,
  "onPremisesImmutableId": null,
  "onPremisesLastSyncDateTime": null,
  "onPremisesSecurityIdentifier": null,
  "onPremisesSamAccountName": null,
  "onPremisesSyncEnabled": null,
  "onPremisesUserPrincipalName": null,
  "otherMails": [],
  "passwordPolicies": null,
  "postalCode": null,
  "preferredDataLocation": null,
  "preferredLanguage": null,
  "proxyAddresses": [],
  "refreshTokensValidFromDateTime": "2021-11-24T19:10:02Z",
  "showInAddressList": null,
  "signInSessionsValidFromDateTime": "2021-11-24T19:10:02Z",
  "state": null,
  "streetAddress": null,
  "surname": "User",
  "usageLocation": null,
  "userPrincipalName": "testuser@admintwilio.onmicrosoft.com",
  "externalUserState": null,
  "externalUserStateChangeDateTime": null,
  "userType": "Member",
  "extension_xxx_language": "Russian",
  "employeeOrgData": null,
  "passwordProfile": null,
  "assignedLicenses": [],
  "assignedPlans": [],
  "deviceKeys": [],
  "identities": [
      {
          "signInType": "userPrincipalName",
          "issuer": "admintwilio.onmicrosoft.com",
          "issuerAssignedId": "testuser@admintwilio.onmicrosoft.com"
      }
  ],
  "onPremisesExtensionAttributes": {
      "extensionAttribute1": null,
      "extensionAttribute2": null,
      "extensionAttribute3": null,
      "extensionAttribute4": null,
      "extensionAttribute5": null,
      "extensionAttribute6": null,
      "extensionAttribute7": null,
      "extensionAttribute8": null,
      "extensionAttribute9": null,
      "extensionAttribute10": null,
      "extensionAttribute11": null,
      "extensionAttribute12": null,
      "extensionAttribute13": null,
      "extensionAttribute14": null,
      "extensionAttribute15": null
  },
  "onPremisesProvisioningErrors": [],
  "provisionedPlans": []
}

```

> \[!WARNING]
>
> If you don't change the API version to `beta`, you'll only get a handful of user properties instead of the full list.

## Create a claims mapping policy

You can now create a claims mapping policy. For an example claim definition and a walkthrough of its key configuration properties, see [Example claims policy definition](#example-claims-policy-definition).

Run the following Graph Explorer query. Make sure to:

* Click the **Request body** tab and enter the JSON in the Request body field. Make the following changes:

  * Replace the `<Claim_Policy_Name>` with the name you want to use for this policy.
  * Replace the example escaped and minified JSON with your claims policy definition. On your definition, make sure to:
    * Update `ExtensionID` and `SamlClaimType` with your values.
    * Minify and escape the JSON. There are various helpful online tools for [minifying](https://jsonformatter.org/) the JSON and [escaping](https://codebeautify.org/json-escape-unescape) it.

### Example request \[#example-request-6]

```bash
HTTP method: POST
API version: v1.0
Endpoint URL: https://graph.microsoft.com/v1.0/policies/claimsMappingPolicies
Request body: 
{
    "definition": [
        "{\"ClaimsMappingPolicy\":{\"Version\":1,\"IncludeBasicClaimSet\":\"true\",\"ClaimsSchema\":[{\"Source\":\"user\",\"ID\":\"userprincipalname\",\"SamlClaimType\":\"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier\"},{\"Source\":\"user\",\"ID\":\"displayname\",\"SamlClaimType\":\"full_name\"},{\"Source\":\"user\",\"ID\":\"assignedroles\",\"SamlClaimType\":\"roles\"},{\"Source\":\"user\",\"ID\":\"mail\",\"SamlClaimType\":\"email\"},{\"Source\":\"user\",\"ExtensionID\":\"extension_<App_ID>_<Property_Name>\",\"SamlClaimType\":\"<Claim_Attribute_Name>\"}]}}"
    ],
    "displayName": "<Claim_Policy_Name>",
    "isOrganizationDefault": false
}
```

Click **Run query**. In the JSON response, copy the claims mapping policy `id` value and paste it somewhere you can reference it.

### Example response \[#example-response-6]

```json
201 Created
{
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#policies/claimsMappingPolicies/$entity",
    "id": "xxx",
    "deletedDateTime": null,
    "definition": [
        "{\"ClaimsMappingPolicy\":{\"Version\":1,\"IncludeBasicClaimSet\":\"true\",\"ClaimsSchema\":[{\"Source\":\"user\",\"ID\":\"userprincipalname\",\"SamlClaimType\":\"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier\"},{\"Source\":\"user\",\"ID\":\"displayname\",\"SamlClaimType\":\"full_name\"},{\"Source\":\"user\",\"ID\":\"assignedroles\",\"SamlClaimType\":\"roles\"},{\"Source\":\"user\",\"ID\":\"mail\",\"SamlClaimType\":\"email\"},{\"Source\":\"user\",\"ExtensionID\":\"extension_xxx_exampleproperty\",\"SamlClaimType\":\"exampleclaimattribute\"}]}}"
    ],
    "displayName": "Example Claim Policy Name",
    "isOrganizationDefault": false
}
```

### Assign claims mapping policy to application

Finally, assign the claims mapping policy you just created to your enterprise application.

> \[!CAUTION]
>
> Once you assign a claims mapping policy to an enterprise application using Graph API or PowerShell, you can no longer manage SAML claims in the Entra ID admin center. Accessing the SAML claims configuration page in the Entra ID admin center will result in the following error message:
>
> "This configuration was overwritten by a claim mapping policy created via Graph/PowerShell."

Run the following Graph Explorer query. Make sure to:

* Replace `<Service_Principal_Entity_ID>` with your previously retrieved Service Principal Entity ID from the [Gather supporting IDs](#gather-supporting-ids) section.
* Click the **Request body** tab to add the JSON in the Request body field.

  * Replace `<Claims_Mapping_Policy_ID>` with the ID you noted previously.

#### Example request \[#example-request-7]

```bash
HTTP method: POST
API version: v1.0
Endpoint URL: https://graph.microsoft.com/v1.0/servicePrincipals/<Service_Principal_Entity_ID>/claimsMappingPolicies/$ref
Request body:
{
    "@odata.id": "https://graph.microsoft.com/v1.0/policies/claimsMappingPolicies/<Claims_Mapping_Policy_ID>"
}

```

* Click **Run query** and in the JSON response, look for the array object whose `appDisplayName` value matches your enterprise application name.
* Copy the `id` value and paste it somewhere you can reference it.

#### Example response \[#example-response-7]

```json
204 {}
```

## Test new claims mapping policy

You can now log in to Flex and test the new claims mapping policy.

1. Navigate to the Flex Console [**Single sign-on (SSO)** page](https://console.twilio.com/us1/develop/flex/users-and-access/single-sign-on).
2. When redirected to Entra ID for authentication, log in with the Entra user account you assigned the extension property to previously in this guide.
3. After logging in and the Flex UI has loaded, check the TaskRouter worker attributes in the Twilio Console ( **TaskRouter** > **Workspace** > **Workers**).

   If you see all the expected attributes you've defined in the claims mapping policy, you've successfully configured your custom claims.

   If any attributes are missing, examine the SAML response payload after authenticating to Entra ID. Ensure all the attributes are included, they have values, and that the `Name` parameter is correct for each of them.

   If the `Name` parameter on an attribute includes the namespace, it will be ignored. Double check your claims mapping policy definition and ensure the `SamlClaimType` is defined without a namespace for each claim you want to be captured as a TaskRouter worker attribute.

### Unassign claims mapping policy from application

If you no longer need or want to pass custom extension properties as SAML claims and you'd like to manage claims in the Entra ID admin center, or you want to assign a different claims mapping policy to your Enterprise application, you will need to unassign the current claims mapping policy from the application.

Run the following Graph Explorer query. Make sure to:

* In the URL field, replace `<Service_Principal_Entity_ID>` with your previously retrieved Service Principal Entity ID from the [Gather supporting IDs](#gather-supporting-ids) section.

#### Example request \[#example-request-8]

```bash
HTTP method: DELETE
API version: v1.0
Endpoint URL: https://graph.microsoft.com/v1.0/servicePrincipals/<Service_Principal_Entity_ID>/claimsMappingPolicies/<Claims_Mapping_Policy_ID>/$ref

```

Click **Run query**.

#### Example response \[#example-response-8]

```json
204 {}
```

To verify there are no claims mapping policies assigned to your application, run the following query using the same Service Principal Entity ID.

#### Example request \[#example-request-9]

```bash
HTTP method: GET
API version: 1.0
Endpoint URL: https://graph.microsoft.com/v1.0/servicePrincipals/<Service_Principal_Entity_ID>/claimsMappingPolicies

```

In the JSON response, the `value` property should now show an empty array.

### Example claims policy definition

This example provides an example definition and some key configuration properties for the claim definition JSON object in [Create a claims mapping policy](#create-a-claims-mapping-policy).

> \[!WARNING]
>
> This example shows an unminified and unescaped claims policy definition. When creating a claims policy in Graph Explorer, you need to minify and escape the JSON object before adding it to the "definition" array. This removes traces of offending characters that could prevent parsing.

```json
{
  "ClaimsMappingPolicy": {
    "Version": 1,
    "IncludeBasicClaimSet": "true",
    "ClaimsSchema": [
      {
        "Source": "user",
        "ID": "userprincipalname",
        "SamlClaimType": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      },
      {
        "Source": "user",
        "ID": "displayname",
        "SamlClaimType": "full_name"
      },
      {
        "Source": "user",
        "ID": "assignedroles",
        "SamlClaimType": "roles"
      },
      {
        "Source": "user",
        "ID": "mail",
        "SamlClaimType": "email"
      },      {
        "Source": "user",
        "ExtensionID": "extension__",
        "SamlClaimType": ""
      }
    ]
  }
}

}
```

The following key properties appear in the example definition:

* `IncludeBasicClaimSet`: Controls whether all claims in the basic claim set are included in the token generated by applications using this policy. For more details, see [Entra's documentation](https://learn.microsoft.com/en-us/graph/api/serviceprincipal-put-claimspolicy?view=graph-rest-beta\&tabs=http#request-body).
* `ClaimsSchema`: Make sure to include the required attributes for Flex: `email`, `full_name`, and `roles`. In the claims schema of our example definition, each item includes the following attributes:
  * `Source`: The source AD object. In this example, all of the claims we're passing are coming from the "user" object.
  * `ID`: For standard AD user properties, "ID" is the key and the value is the targeted user property. For example, to pass the display name of a user, you can use `{ "Source": "user", "ID": "displayname" }`, which tells the policy to use the \`user.displayname property for this claim.
  * `ExtensionID`: For extension properties, like the one you created earlier in this guide, "ExtensionID" is the key and the value is the extension property in the format `extension\_\<App\_ID>\_\<Property\_Name>`.
  * `SamlClaimType`: The value that will be passed in the "name" parameter of the claim attribute. This value is what Flex uses to populate the TaskRouter worker attribute. For Flex to process it as a worker attribute, it must be the name only, not preceded by a namespace. For example, to populate the "team\_id" TaskRouter worker attribute with a custom extension property, use `{ "Source": "user", "ExtensionID": "extension_<App_ID>_<Property_Name>", "SamlClaimType": "team_id" }`, which tells the policy to pass a claim attribute with Name="team\_id" populated with the value contained in `user.extension\_\<App\_ID>\_\<Property\_Name>`.
