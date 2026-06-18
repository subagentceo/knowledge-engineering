# Portal link

A portal link is a temporary endpoint to initiate an Admin Portal session. It expires five minutes after issuance.

```url title="Example Portal Link URL"
https://setup.workos.com?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Generate a Portal Link

Generate a Portal Link scoped to an Organization.

#### Request

#### Response

### /portal/generate_link

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `return_url` | string | No | The URL to go to when an admin clicks on your logo in the Admin Portal. If not specified, the return URL configured on the [Redirects](https://dashboard.workos.com/redirects) page will be used. |
| `success_url` | string | No | The URL to redirect the admin to when they finish setup. If not specified, the success URL configured on the [Redirects](https://dashboard.workos.com/redirects) page will be used. |
| `organization` | string | Yes | An [Organization](/reference/organization) identifier. |
| `intent` | "sso" \| "dsync" \| "audit_logs" \| ... | No | The intent of the Admin Portal. `sso` - Launch Admin Portal for creating SSO connections `dsync` - Launch Admin Portal for creating Directory Sync connections `audit_logs` - Launch Admin Portal for viewing Audit Logs `log_streams` - Launch Admin Portal for creating Log Streams `domain_verification` - Launch Admin Portal for Domain Verification `certificate_renewal` - Launch Admin Portal for renewing SAML Certificates `bring_your_own_key` - Launch Admin Portal for configuring Bring Your Own Key |
| `intent_options` | object | No | Options to configure the Admin Portal based on the intent. |
| `it_contact_emails` | string[] | No | The email addresses of the IT contacts to grant access to the Admin Portal for the given organization. Accepts up to 20 emails. |