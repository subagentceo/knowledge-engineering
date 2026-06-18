> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Salesforce

## Overview

Connect your ElevenLabs AI agents with Salesforce CRM to access customer data, manage leads, and create opportunities. This integration enables your agents to retrieve existing customer records, create new leads and contacts, and query Salesforce objects during conversations.

## Setup

This integration uses **Salesforce OAuth 2.0 Client Credentials** for authentication. You will need to create an External Client App in Salesforce.

1. Log into your Salesforce org as an administrator
2. Go to **Setup** > **External Client App Manager**
3. Click **New External Client App**
4. Fill in the **External Client App Name** (e.g., `ElevenLabs Agents`), **API Name**, and **Contact Email**
5. Under **API (Enable OAuth Settings)**:
   * Check **Enable OAuth** and **Enable Client Credentials Flow**
   * **Callback URL**: `https://api.elevenlabs.io/oauth/callback`
   * **OAuth Start URL**: `https://api.elevenlabs.io/oauth/start`
   * **Selected OAuth Scopes**: add these scopes:
     * **Full access (full)**
     * **Perform requests on your behalf at any time (refresh\_token, offline\_access)**
     * **Manage user data via api**
6. Click **Create**
7. On the app page, open the **Settings** tab, go to **OAuth Settings**, and click **Consumer Key and Secret**
8. Copy the **Consumer Key** and **Consumer Secret** — you will need these for authentication

The Client Credentials Flow is recommended for server-to-server integrations where no user
interaction is required. Ensure your Salesforce admin has enabled this flow.

1. In your External Client App, click **Edit**
2. Check **Enable Client Credentials Flow** — a **Run As** field will appear
3. Set **Run As** to your admin user or a dedicated service account — this determines the permissions for all API calls
4. Set **Permitted Users** to **Admin approved users are pre-authorized**
5. Click **Save**

The **Run As** user determines the permissions for all API calls. Choose a user with a System Administrator profile or a custom profile that has API access and permission to the objects your agent needs (Contact, Lead, Account, etc.). The **API Enabled** permission must be checked on the user record.

Your Salesforce domain is required for API calls.

**Method 1: Check your current URL**

When logged into Salesforce, look at your browser's address bar:

* **Lightning Experience**: `https://acme.lightning.force.com/`
* **My Domain**: `https://acme.my.salesforce.com/`

**Method 2: Setup > Company Information**

Go to **Setup** > **Company Information** and look for your **My Domain** URL or Organization information.

**Method 3: Setup > Domain Management**

Go to **Setup** > **Domain Management** > **My Domain**. Your domain will be shown at the top of the page.

**Common domain formats:**

* `https://acme.my.salesforce.com` (My Domain)
* `https://acme.lightning.force.com` (Lightning)
* `https://acme.develop.my.salesforce.com` (Sandbox)

Use the full domain without a trailing slash.

In the ElevenLabs integration setup, enter your Salesforce **instance hostname** (e.g., `acme.my.salesforce.com`), **Client ID** (Consumer Key), and **Client Secret** (Consumer Secret).

## Demo video

This demo uses legacy webhook tools. If you're using the native Salesforce integration, the tools
are configured automatically — no manual webhook setup is needed.

## How it works

The agent gathers customer information and asks relevant questions to identify their business requirements and current challenges.

The agent checks for existing records using `salesforce_search_records` to find contacts, accounts, or leads. It retrieves full details with `salesforce_get_record` and uses this information to personalize the conversation.

If the customer is new, the agent collects contact information, assesses their business needs, and determines the appropriate sales process or routing.

The agent creates the appropriate record (lead, contact, or opportunity) using `salesforce_create_record`, confirms creation with the customer, and explains next steps.

```text
# Personality

You are a helpful sales assistant responsible for managing customer relationships and creating records in Salesforce using the available tools. Be friendly, professional, and consultative in your approach.

# Environment

You operate in a sales setting via voice or chat interface, where you engage with potential customers to gather information, check for existing CRM data, and create Salesforce records when necessary.

# Tone

Begin by asking about the customer's business needs and current challenges.

Then, ask relevant qualification questions to understand their requirements, one question at a time, and wait for their response before proceeding.

Once you have basic information about the customer, say you will check for any existing records in the system.

Use any existing information to personalize the conversation and avoid asking for data you already have.

When discussing opportunities, always reference them by name (e.g., "Q1 Enterprise Deal") rather than by ID.

# Goal

After checking existing records, qualify the customer by gathering:
- Company name and size
- Industry and business type
- Current challenges and pain points
- Budget and timeline information
- Decision-making authority

Once you have qualified the customer, gather the following contact details:
- Full name and job title
- Business email address (ensure it's formatted correctly)
- Phone number
- Company name and address

Read the email back to the customer to confirm accuracy.

Once all information is confirmed, explain that you will create a record in our system.

Create the appropriate record (Lead, Contact, or Opportunity) using the `salesforce_create_record` tool.

Thank the customer and explain the next steps in the sales process.

# Guardrails

- Always check for existing records before creating new ones.
- If the customer asks to proceed, do so with the existing information.
- Qualify leads appropriately based on their responses.
- Do not discuss topics outside of business solutions and sales.
- Always maintain professional communication.
- Protect customer privacy and handle data securely.

# Tools

- Call `salesforce_search_records` to look for existing contacts, accounts, or leads (always include Name fields and human-readable information in your SOQL queries).
- If found, call `salesforce_get_record` to get detailed information about the existing record.
- Use `salesforce_create_record` to generate Leads, Contacts, or Opportunities after qualification.
```

Tool authorization can be managed using Workplace Auth Connections, which handles token refresh
automatically. The tools return human-readable names and descriptions rather than technical IDs to
improve conversation quality.

## Tool configurations

Three webhook tools are available: `salesforce_search_records`, `salesforce_get_record`, and `salesforce_create_record`. Configure authorization for each using a Workplace Auth Connection.

### Authorization - Workplace OAuth2 connection

In your ElevenLabs dashboard, go to **Agents** > **Workplace Auth Connections** and click **Add Auth**.

Fill in the following fields for your Salesforce integration:

**Connection Name**: `Salesforce CRM`

**Client ID**

* Your Consumer Key from the External Client App
* Example: `3MVG9JJlvRU3L4pRiOu8pQt5xXB4xGZGm0yW...`

**Client Secret**

* Your Consumer Secret from the External Client App
* Example: `1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF...`

**Token URL**

* Your Salesforce domain's OAuth token endpoint
* Format: `https://{domain}.my.salesforce.com/services/oauth2/token`
* Example: `https://acme.my.salesforce.com/services/oauth2/token`

**Scopes (optional)**

* OAuth scopes for Salesforce API access
* Recommended: `full, api, refresh_token`
* Leave blank to use default scopes from your External Client App

**Extra Parameters (JSON)**

* Additional OAuth parameters specific to your setup
* Example for Client Credentials flow:

```json
{
  "grant_type": "client_credentials"
}
```

{' '}

Click **Create auth connection** to add your configuration.

Once the connection is successful, save it and reference it in your webhook tool configurations in the **Authentication** section.

Workplace Auth Connections handles token refresh automatically, so you do not need to manage
tokens manually.

### Webhook tool configurations

Add a Workplace Auth Connection (OAuth2) to each tool in the **Authentication** section. Use the tabs below to review each tool's configuration.

**Name:** salesforce\_search\_records
**Description:** Searches for existing records in Salesforce using SOQL queries. Always returns human-readable information including Names, not just IDs.
**Method:** GET
**URL:** `https://acme.my.salesforce.com/services/data/v58.0/query/?q={soql_query}`

**Headers:**

* **Content-Type:** `application/json`

**Query Parameters:**

* **q:** SOQL query string (e.g., "SELECT Id, Name, Email FROM Contact WHERE Email = '[example@email.com](mailto:example@email.com)'")

**Tool JSON:**

```json
{
  "type": "webhook",
  "name": "salesforce_search_records",
  "description": "Searches for existing records in Salesforce using SOQL queries. Always returns human-readable names and details, not just IDs.",
  "api_schema": {
    "url": "https://acme.my.salesforce.com/services/data/v58.0/query/",
    "method": "GET",
    "path_params_schema": [],
    "query_params_schema": [
      {
        "id": "q",
        "type": "string",
        "description": "SOQL query string to search for records. Always include Name fields and other human-readable information. Example: SELECT Id, Name, Email, Phone, Company FROM Contact WHERE Email = 'customer@example.com'. For Opportunities, include: SELECT Id, Name, StageName, Amount, CloseDate, Account.Name FROM Opportunity",
        "dynamic_variable": "",
        "constant_value": "",
        "required": true,
        "value_type": "llm_prompt"
      }
    ],
    "request_body_schema": null,
    "request_headers": [
      {
        "type": "value",
        "name": "Content-Type",
        "value": "application/json"
      }
    ]
  },
  "response_timeout_secs": 30,
  "dynamic_variables": {
    "dynamic_variable_placeholders": {}
  }
}
```

**Name:** salesforce\_get\_record
**Description:** Retrieves detailed information about a specific Salesforce record.
**Method:** GET
**URL:** `https://acme.my.salesforce.com/services/data/v58.0/sobjects/{object_type}/{record_id}`

**Headers:**

* **Content-Type:** `application/json`

**Path Parameters:**

* **object\_type:** The Salesforce object type (Contact, Lead, Account, etc.)
* **record\_id:** The unique Salesforce record ID

**Tool JSON:**

```json
{
  "type": "webhook",
  "name": "salesforce_get_record",
  "description": "Retrieves detailed information about a specific Salesforce record.",
  "api_schema": {
    "url": "https://acme.my.salesforce.com/services/data/v58.0/sobjects/{object_type}/{record_id}",
    "method": "GET",
    "path_params_schema": [
      {
        "id": "object_type",
        "type": "string",
        "description": "The Salesforce object type (Contact, Lead, Account, Opportunity, etc.)",
        "dynamic_variable": "",
        "constant_value": "",
        "required": true,
        "value_type": "llm_prompt"
      },
      {
        "id": "record_id",
        "type": "string",
        "description": "The unique Salesforce record ID obtained from search results",
        "dynamic_variable": "",
        "constant_value": "",
        "required": true,
        "value_type": "llm_prompt"
      }
    ],
    "query_params_schema": [],
    "request_body_schema": null,
    "request_headers": [
      {
        "type": "value",
        "name": "Content-Type",
        "value": "application/json"
      }
    ]
  },
  "response_timeout_secs": 30,
  "dynamic_variables": {
    "dynamic_variable_placeholders": {}
  }
}
```

**Name:** salesforce\_create\_record
**Description:** Creates a new record in Salesforce.
**Method:** POST
**URL:** `https://acme.my.salesforce.com/services/data/v58.0/sobjects/{object_type}/`

**Headers:**

* **Content-Type:** `application/json`

**Path Parameters:**

* **object\_type:** The Salesforce object type to create (Lead, Contact, Account, etc.)

**Body Parameters:**

* **Dynamic JSON object** containing the record fields and values

**Tool JSON:**

```json
{
  "type": "webhook",
  "name": "salesforce_create_record",
  "description": "Creates a new record in Salesforce (Lead, Contact, Account, Opportunity, etc.)",
  "api_schema": {
    "url": "https://acme.my.salesforce.com/services/data/v58.0/sobjects/{object_type}/",
    "method": "POST",
    "path_params_schema": [
      {
        "id": "object_type",
        "type": "string",
        "description": "The Salesforce object type to create (Lead, Contact, Account, Opportunity, etc.)",
        "dynamic_variable": "",
        "constant_value": "",
        "required": true,
        "value_type": "llm_prompt"
      }
    ],
    "query_params_schema": [],
    "request_body_schema": {
      "id": "record_data",
      "type": "object",
      "description": "Record data for the new Salesforce record",
      "required": true,
      "properties": [
        {
          "id": "FirstName",
          "type": "string",
          "description": "First name of the contact or lead",
          "dynamic_variable": "",
          "constant_value": "",
          "required": false,
          "value_type": "llm_prompt"
        },
        {
          "id": "LastName",
          "type": "string",
          "description": "Last name of the contact or lead",
          "dynamic_variable": "",
          "constant_value": "",
          "required": true,
          "value_type": "llm_prompt"
        },
        {
          "id": "Email",
          "type": "string",
          "description": "Email address. Must be properly formatted: user@domain.com",
          "dynamic_variable": "",
          "constant_value": "",
          "required": true,
          "value_type": "llm_prompt"
        },
        {
          "id": "Phone",
          "type": "string",
          "description": "Phone number of the contact or lead",
          "dynamic_variable": "",
          "constant_value": "",
          "required": false,
          "value_type": "llm_prompt"
        },
        {
          "id": "Company",
          "type": "string",
          "description": "Company name (required for Lead object)",
          "dynamic_variable": "",
          "constant_value": "",
          "required": false,
          "value_type": "llm_prompt"
        },
        {
          "id": "Title",
          "type": "string",
          "description": "Job title of the contact or lead",
          "dynamic_variable": "",
          "constant_value": "",
          "required": false,
          "value_type": "llm_prompt"
        },
        {
          "id": "Industry",
          "type": "string",
          "description": "Industry of the lead's company",
          "dynamic_variable": "",
          "constant_value": "",
          "required": false,
          "value_type": "llm_prompt"
        },
        {
          "id": "Description",
          "type": "string",
          "description": "Additional notes or description about the lead/contact",
          "dynamic_variable": "",
          "constant_value": "",
          "required": false,
          "value_type": "llm_prompt"
        }
      ]
    },
    "request_headers": [
      {
        "type": "value",
        "name": "Content-Type",
        "value": "application/json"
      }
    ]
  },
  "response_timeout_secs": 30,
  "dynamic_variables": {
    "dynamic_variable_placeholders": {}
  }
}
```

## Common Salesforce objects

| Object          | Purpose                                        | Common fields                                                |
| --------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| **Lead**        | Potential customers not yet qualified          | FirstName, LastName, Email, Phone, Company, Industry, Status |
| **Contact**     | Qualified individuals associated with accounts | FirstName, LastName, Email, Phone, AccountId, Title          |
| **Account**     | Organizations or companies                     | Name, Type, Industry, Phone, BillingAddress                  |
| **Opportunity** | Sales deals in progress                        | Name, StageName, Amount, CloseDate, AccountId                |
| **Case**        | Customer service requests                      | Subject, Description, Status, Priority, ContactId            |

## Common SOQL queries

Use these SOQL queries as starting points when customizing your agent's system prompt. All queries return human-readable information rather than technical IDs:

### Search for contacts by email

```sql
SELECT Id, Name, Email, Phone, Title, Account.Name, Account.Type FROM Contact WHERE Email = 'customer@example.com'
```

### Search for leads by email or phone

```sql
SELECT Id, Name, Email, Phone, Company, Industry, Status, LeadSource, Title FROM Lead WHERE Email = 'customer@example.com' OR Phone = '+1234567890'
```

### Search for accounts by name

```sql
SELECT Id, Name, Type, Industry, Phone, BillingCity, BillingState, Website FROM Account WHERE Name LIKE '%Company Name%'
```

### Search for recent opportunities

```sql
SELECT Id, Name, StageName, Amount, CloseDate, Account.Name, Account.Type, Owner.Name, Description FROM Opportunity WHERE CreatedDate = THIS_MONTH
```

### Search for opportunities by account

```sql
SELECT Id, Name, StageName, Amount, CloseDate, Probability, NextStep, Owner.Name FROM Opportunity WHERE Account.Name LIKE '%Company Name%'
```

## Integration testing

After setting up your External Client App and connecting the integration, test it before deploying to production:

1. **Search functionality**: Ask your agent to search for existing contacts.
2. **Record creation**: Have your agent create a new lead or contact.
3. **Data retrieval**: Verify your agent can retrieve detailed customer information.

## Security considerations

* Use HTTPS endpoints for all API calls.
* Ensure proper field-level security is configured in Salesforce.
* The Run As user's permissions determine what data the integration can access — scope them appropriately.
* Regularly audit API access and usage.

## Useful links

* [Salesforce REST API documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/)
* [SOQL query language reference](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/)
* [External Client Apps and OAuth 2.0](https://help.salesforce.com/s/articleView?id=sf.connected_app_overview.htm)
* [Salesforce security best practices](https://help.salesforce.com/s/articleView?id=sf.security_overview.htm)