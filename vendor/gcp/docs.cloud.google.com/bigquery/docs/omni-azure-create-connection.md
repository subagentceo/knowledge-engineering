# Connect to Blob Storage

*   Home
*   Documentation
*   Data analytics
*   BigQuery
*   Guides

Send feedback Stay organized with collections Save and categorize content based on your preferences.

# Connect to Blob Storage

As a BigQuery administrator, you can create a connection to let data analysts access data stored in Azure Blob Storage.

BigQuery Omni accesses Blob Storage data through connections. BigQuery Omni supports Azure workload identity federation. BigQuery Omni support of Azure workload identity federation lets you grant access for an Azure application in your tenant to a Google service account. There are no application client secrets to be managed by you or Google.

After you create a BigQuery Azure connection, you can either query the Blob Storage data or export query results to Blob Storage.

## Before you begin

*   Ensure that you have created the following resources:
    
    *   A Google Cloud project with BigQuery Connection API enabled.
        
    *   If you are on the capacity-based pricing model, then ensure that you have enabled BigQuery Reservation API for your project. For information about pricing, see BigQuery Omni pricing.
        
    *   An Azure tenant with an Azure subscription.
        
    *   An Azure Storage account that meets the following specifications:
        
        *   It's a general-purpose V2 account or a Blob Storage account.
            
        *   It uses a hierarchical namespace. For more information, see Create a storage account to use with Azure Data Lake Storage Gen2.
            
        *   Data is populated in one of the supported formats.
            
        *   Data is in the `azure-eastus2` region.
            

## Required roles

*   To get the permissions that you need to create a connection to access Azure Blob Storage data, ask your administrator to grant you the BigQuery Connection Admin (`roles/bigquery.connectionAdmin`) IAM role on the project. For more information about granting roles, see Manage access to projects, folders, and organizations.
    
    You might also be able to get the required permissions through custom roles or other predefined roles.
    
*   Ensure that you have the following Azure IAM permissions on your tenant:
    *   `Application.ReadWrite.All`
    *   `AppRoleAssignment.ReadWrite.All`

## Quotas

For more information about quotas, see BigQuery Connection API.

## Create an Azure connection

To create an Azure connection, follow these steps:

1.  Create an application in your Azure tenant.
2.  Create the BigQuery Azure connection.
3.  Add a federated credential.
4.  Assign a role to BigQuery Azure AD applications.

For more information about using federated identity credentials to access data in Azure, see Workload identity federation.

### Create an application in your Azure tenant

To create an application in your Azure tenant, follow these steps:

### Azure Portal

1.  In the Azure portal, go to **App registrations**, and then click **New registration**.
    
2.  For **Name**, enter a name for your application.
    
3.  For **Supported account types**, select **Accounts in this organizational directory only**.
    
4.  To register the new application, click **Register**.
    
5.  Make a note of the **Application (client) ID**. You need to provide this ID when you create the connection.
    
    ![Azure portal for creating applications](/static/bigquery/images/omni-azure-federated-identity-subject-id.png)
    

### Terraform

Add the following to your Terraform configuration file:

  data "azuread_client_config" "current" {}

  resource "azuread_application" "example" {
    display_name = "bigquery-omni-connector"
    owners       = [data.azuread_client_config.current.object_id]
  }

  resource "azuread_service_principal" "example" {
    client_id                    = azuread_application.example.client_id
    app_role_assignment_required = false
    owners                       = [data.azuread_client_config.current.object_id]
  }

For more information, see how to register an application in Azure.

### Create a connection

### Console

1.  In the Google Cloud console, go to the **BigQuery** page.
    
    Go to BigQuery
    
2.  In the **Explorer** pane, click add **Add data**.
    
    The **Add data** dialog opens.
    
3.  In the **Filter By** pane, in the **Data Source Type** section, select **Databases**.
    
    Alternatively, in the **Search for data sources** field, you can enter `Azure`.
    
4.  In the **Featured data sources** section, click **Azure Blob Storage**.
    
5.  Click the **Azure Blob Storage Omni: BigQuery Federation** solution card.
    
6.  In the **Create table** dialog, in the **Connection ID** field, select **Create a new ABS connection**.
    
7.  In the **External data source** pane, enter the following information:
    
    *   For **Connection type**, select **BigLake on Azure (via BigQuery Omni)**.
    *   For **Connection ID**, enter an identifier for the connection resource. You can use letters, numbers, dashes, and underscores.
    *   Select the location where you want to create the connection.
    *   Optional: For **Friendly name**, enter a user-friendly name for the connection, such as `My connection resource`. The friendly name can be any value that helps you identify the connection resource if you need to modify it later.
    *   Optional: For **Description**, enter a description for the connection resource.
    *   For **Azure tenant id**, enter the Azure tenant ID, which is also referred to as the Directory (tenant) ID.
    *   Enable the **Use federated identity** checkbox and then enter the Azure federated application (client) ID.
        
        To learn how to get Azure IDs, see Create an application in your Azure tenant.
        
8.  Click **Create connection**.
    
9.  Click **Go to connection**.
    
10.  In the **Connection info** section, note the value of **BigQuery Google identity**, which is the service account ID. This ID is for the Google Cloud service account that you authorize to access your application.
     

### Terraform

  resource "google_bigquery_connection" "connection" {
    connection_id = "omni-azure-connection"
    location      = "azure-eastus2"
    description   = "created by terraform"

    azure {
      customer_tenant_id              = "TENANT_ID"
      federated_application_client_id = azuread_application.example.client_id
    }
  }

Replace `TENANT_ID` with the tenant ID of the Azure directory that contains the Blob Storage account.

### bq

Use the `bq mk` command. To get the output in JSON format, use the `--format=json` parameter.

bq mk --connection --connection_type='Azure' \
  --tenant_id=TENANT_ID \
  --location=AZURE_LOCATION \
  --federated_azure=true \
  --federated_app_client_id=APP_ID \
  CONNECTION_ID

Replace the following:

*   `TENANT_ID`: the tenant ID of the Azure directory that contains the Azure Storage account.
*   `AZURE_LOCATION`: the Azure region where your Azure Storage data is located. BigQuery Omni supports the `azure-eastus2` region.
*   `APP_ID`: the Azure Application (client) ID. To learn how to get this ID, see Create application in Azure tenant.
*   `CONNECTION_ID`: the name of the connection.

The output is similar to the following:

Connection CONNECTION_ID successfully created
Please add the following identity to your Azure application APP_ID
Identity: SUBJECT_ID

This output includes the following values:

*   `APP_ID`: the ID of the application that you created.
    
*   `SUBJECT_ID`: the ID of the Google Cloud service account that the user authorizes to access their application. This value is required when you create a federated credential in Azure.
    

Note the `APP_ID` and the `SUBJECT_ID` values for use in the next steps.

**Note:** To override the default project, use the `--project_id=PROJECT_ID` parameter. Replace `PROJECT_ID` with the ID of your Google Cloud project.

Next, add a federated credential for your application.

### Add a federated credential

To create a federated credential, follow these steps:

### Azure Portal

1.  In the Azure portal, go to **App registrations**, and then click your application.
    
2.  Select **Certificates & secrets > Federated credentials > Add credentials**. Then, do the following:
    
    1.  From the **Federated credential scenario** list, select **Other issuer**.
        
    2.  For **Issuer**, enter `https://accounts.google.com`.
        
    3.  For **Subject identifier**, enter the **BigQuery Google identity** of the Google Cloud service account that you got when you created the connection.
        
    4.  For **Name**, enter a name for the credential.
        
    5.  Click **Add**.
        

### Terraform

Add the following to your Terraform configuration file:

  resource "azuread_application_federated_identity_credential" "example" {
    application_id = azuread_application.example.id
    display_name   = "omni-federated-credential"
    description    = "BigQuery Omni federated credential"
    audiences      = ["api://AzureADTokenExchange"]
    issuer         = "https://accounts.google.com"
    subject        = google_bigquery_connection.connection.azure[0].identity
  }

For more information, see Configure an app to trust an external identity provider.

### Assign a role to BigQuery's Azure applications

To assign a role to BigQuery's Azure application, use the Azure Portal, the Azure PowerShell, or the Microsoft Management REST API:

### Azure Portal

You can perform role assignments in the Azure Portal by logging in as a user with the `Microsoft.Authorization/roleAssignments/write` permission. The role assignment lets the BigQuery Azure connection access the Azure Storage data as specified in the roles policy.

To add role assignments using the Azure Portal, follow these steps:

1.  From your Azure Storage account, enter `IAM` in the search bar.
    
2.  Click **Access Control (IAM)**.
    
3.  Click **Add** and select **Add role assignments**.
    
4.  To provide read-only access, select the **Storage Blob Data Reader** role. To provide read-write access, select the **Storage Blob Data Contributor** role.
    
5.  Set **Assign access to** to **User, group, or service principal**.
    
6.  Click **Select members**.
    
7.  In the **Select** field, enter the Azure application name that you gave when you created the application in the Azure tenant.
    
8.  Click **Save**.
    

For more information, see Assign Azure roles using the Azure portal.

### Terraform

Add the following to your Terraform configuration file:

  resource "azurerm_role_assignment" "data_role" {
    scope                = data.azurerm_storage_account.example.id
    # Read permission for Omni on the storage account
    role_definition_name = "Storage Blob Data Reader"
    principal_id         = azuread_service_principal.example.id
  }

### Azure PowerShell

To add a role assignment for a service principal at a resource scope, you can use the `New-AzRoleAssignment` command:

  New-AzRoleAssignment`
   -SignInName APP_NAME`
   -RoleDefinitionName ROLE_NAME`
   -ResourceName RESOURCE_NAME`
   -ResourceType RESOURCE_TYPE`
   -ParentResource PARENT_RESOURCE`
   -ResourceGroupName RESOURCE_GROUP_NAME

Replace the following:

*   `APP_NAME`: the application name.
*   `ROLE_NAME`: the role name you want to assign.
*   `RESOURCE_NAME`: the resource name.
*   `RESOURCE_TYPE`: the resource type.
*   `PARENT_RESOURCE`: the parent resource.
*   `RESOURCE_GROUP_NAME`: the resource group name.

For more information about using Azure PowerShell to add a new service principal, see the Assign Azure roles using Azure PowerShell.

### Azure CLI

To add a role assignment for a service principal at a resource scope, you can use the Azure command-line tool. You must have the `Microsoft.Authorization/roleAssignments/write` permission for the storage account to grant roles.

To assign a role, such as the **Storage Blob Data Reader** role, to the service principal, run the `az role assignment create` command:

  az role assignment create --role "Storage Blob Data Reader" \
    --assignee-object-id ${SP_ID} \
    --assignee-principal-type ServicePrincipal \
    --scope   subscriptions/SUBSCRIPTION_ID/resourcegroups/RESOURCE_GROUP_NAME/providers/Microsoft.Storage/storageAccounts/STORAGE_ACCOUNT_NAME

Replace the following:

*   `SP_ID`: the service principal ID. This service principal is for the application that you created. To get the service principal for a federated connection, see Service principal object.
*   `STORAGE_ACCOUNT_NAME`: the storage account name.
*   `RESOURCE_GROUP_NAME`: the resource group name.
*   `SUBSCRIPTION_ID`: the subscription ID.

For more information, see Assign Azure roles using Azure CLI.

### Microsoft REST API

To add role assignments for a service principal, you can send an HTTP request to Microsoft Management.

To call the Microsoft Graph REST API, retrieve an OAuth token for an application. For more information, see Get access without a user. The application that called the Microsoft Graph REST API must have the `Application.ReadWrite.All` application permission.

To generate an OAuth token, run the following command:

  export TOKEN=$(curl -X POST \
    https://login.microsoftonline.com/TENANT_ID/oauth2/token \
    -H 'cache-control: no-cache' \
    -H 'content-type: application/x-www-form-urlencoded' \
    --data-urlencode "grant_type=client_credentials" \
    --data-urlencode "resource=https://graph.microsoft.com/" \
    --data-urlencode "client_id=CLIENT_ID" \
    --data-urlencode "client_secret=CLIENT_SECRET" \
  | jq --raw-output '.access_token')

Replace the following:

*   `TENANT_ID`: the tenant ID matching the ID of the Azure directory that contains the Azure Storage account.
*   `CLIENT_ID`: the Azure client ID.
*   `CLIENT_SECRET`: the Azure client secret.

Get the ID of the Azure built-in roles that you want to assign to the service principal.

These are some common roles:

*   Storage Blob Data Contributor: `ba92f5b4-2d11-453d-a403-e96b0029c9fe`
*   Storage Blob Data Reader: `2a2b9908-6ea1-4ae2-8e65-a410df84e7d1`

To assign a role to the service principal, call the Microsoft Graph REST API to the Azure Resource Management REST API:

  export ROLE_ASSIGNMENT_ID=$(uuidgen)
  curl -X PUT \
'https://management.azure.com/subscriptions/SUBSCRIPTION_ID/resourcegroups/RESOURCE_GROUP_NAME/providers/Microsoft.Storage/storageAccounts/STORAGE_ACCOUNT_NAME/providers/Microsoft.Authorization/roleAssignments/ROLE_ASSIGNMENT_ID?api-version=2018-01-01-preview' \
    -H "authorization: Bearer ${TOKEN?}" \
    -H 'cache-control: no-cache' \
    -H 'content-type: application/json' \
    -d '{
        "properties": {
            "roleDefinitionId": "subscriptions/SUBSCRIPTION_ID/resourcegroups/RESOURCE_GROUP_NAME/providers/Microsoft.Storage/storageAccounts/STORAGE_ACCOUNT_NAME/providers/Microsoft.Authorization/roleDefinitions/ROLE_ID",
            "principalId": "SP_ID"
        }
    }'

Replace the following:

*   `ROLE_ASSIGNMENT_ID`: the role ID.
*   `SP_ID`: the service principal ID. This service principal is for the application that you created. To get the service principal for a federated connection, see Service principal object.
*   `SUBSCRIPTION_ID`: the subscription ID.
*   `RESOURCE_GROUP_NAME`: the resource group name.
*   `STORAGE_ACCOUNT_NAME`: the storage account name.
*   `SUBSCRIPTION_ID`: the subscription ID.

The connection is now ready to use. However, there might be a propagation delay for a role assignment in Azure. If you are not able to use the connection due to permission issues, then retry after some time.

**Caution:** When you delete the connection, the Google identity used to access the Azure application is deleted. The application in the Azure tenant is not deleted.

## Share connections with users

You can grant the following roles to let users query data and manage connections:

*   `roles/bigquery.connectionUser`: enables users to use connections to connect with external data sources and run queries on them.
    
*   `roles/bigquery.connectionAdmin`: enables users to manage connections.
    

For more information about IAM roles and permissions in BigQuery, see Predefined roles and permissions.

Select one of the following options:

### Console

1.  Go to the **BigQuery** page.
    
    Go to BigQuery
    
    Connections are listed in your project, in a group called **Connections**.
    
2.  In the left pane, click explore **Explorer**:
    
    ![Highlighted button for the Explorer pane.](/static/bigquery/images/explorer-tab.png)
    
    If you don't see the left pane, click last_page **Expand left pane** to open the pane.
    
3.  Click your project, click **Connections**, and then select a connection.
    
4.  In the **Details** pane, click **Share** to share a connection. Then do the following:
    
    1.  In the **Connection permissions** dialog, share the connection with other principals by adding or editing principals.
        
    2.  Click **Save**.
        

### bq

You cannot share a connection with the bq command-line tool. To share a connection, use the Google Cloud console or the BigQuery Connections API method to share a connection.

### API

Use the `projects.locations.connections.setIAM` method in the BigQuery Connections REST API reference section, and supply an instance of the `policy` resource.

### Java

Before trying this sample, follow the Java setup instructions in the BigQuery quickstart using client libraries. For more information, see the BigQuery Java API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
import com.google.api.resourcenames.ResourceName;
import com.google.cloud.bigquery.connection.v1.ConnectionName;
import com.google.cloud.bigqueryconnection.v1.ConnectionServiceClient;
import com.google.iam.v1.Binding;
import com.google.iam.v1.Policy;
import com.google.iam.v1.SetIamPolicyRequest;
import java.io.IOException;

// Sample to share connections
public class ShareConnection {

  public static void main(String[] args) throws IOException {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "MY_PROJECT_ID";
    String location = "MY_LOCATION";
    String connectionId = "MY_CONNECTION_ID";
    shareConnection(projectId, location, connectionId);
  }

  static void shareConnection(String projectId, String location, String connectionId)
      throws IOException {
    try (ConnectionServiceClient client = ConnectionServiceClient.create()) {
      ResourceName resource = ConnectionName.of(projectId, location, connectionId);
      Binding binding =
          Binding.newBuilder()
              .addMembers("group:example-analyst-group@google.com")
              .setRole("roles/bigquery.connectionUser")
              .build();
      Policy policy = Policy.newBuilder().addBindings(binding).build();
      SetIamPolicyRequest request =
          SetIamPolicyRequest.newBuilder()
              .setResource(resource.toString())
              .setPolicy(policy)
              .build();
      client.setIamPolicy(request);
      System.out.println("Connection shared successfully");
    }
  }
}
```

## What's next

*   Learn about different connection types.
*   Learn about managing connections.
*   Learn more about BigQuery Omni.
*   Learn about BigLake tables.
*   Learn how to query Blob Storage data.
*   Learn how to export query results to Blob Storage.

Send feedback