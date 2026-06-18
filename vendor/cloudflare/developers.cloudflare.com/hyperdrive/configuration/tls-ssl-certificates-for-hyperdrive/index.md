---
title: SSL/TLS certificates
description: Configure SSL/TLS server and client certificates for secure Hyperdrive database connections.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SSL/TLS certificates

Hyperdrive provides additional ways to secure connectivity to your database. Hyperdrive supports:

1. **Server certificates** for TLS (SSL) modes such as `verify-ca`/`VERIFY_CA` and `verify-full`/`VERIFY_IDENTITY` for increased security. When configured, Hyperdrive will verify that the certificates have been signed by the expected certificate authority (CA) to avoid man-in-the-middle attacks.
2. **Client certificates** for Hyperdrive to authenticate itself to your database with credentials beyond username/password. To properly use client certificates, your database must be configured to verify the client certificates provided by a client, such as Hyperdrive, to allow access to the database.

Hyperdrive can be configured to use only server certificates, only client certificates, or both depending on your security requirements and database configurations.

## Server certificates (TLS/SSL modes)

Hyperdrive supports common encryption TLS/SSL modes to connect to your database. The mode names differ between PostgreSQL and MySQL:

| PostgreSQL        | MySQL              | Description                                                                                                                                                                                                        |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| require (default) | REQUIRED (default) | TLS is required for encrypted connectivity and server certificates are validated (based on WebPKI).                                                                                                                |
| verify-ca         | VERIFY\_CA         | Hyperdrive will verify that the database server is trustworthy by verifying that the certificates of the server have been signed by the expected root certificate authority or intermediate certificate authority. |
| verify-full       | VERIFY\_IDENTITY   | In addition to verify-ca/VERIFY\_CA checks, Hyperdrive requires the database hostname to match a Subject Alternative Name (SAN) or Common Name (CN) on the certificate.                                            |

By default, all Hyperdrive configurations are encrypted with SSL/TLS (`require`/`REQUIRED`). This requires your database to be configured to accept encrypted connections (with SSL/TLS).

You can configure Hyperdrive to use `verify-ca`/`VERIFY_CA` and `verify-full`/`VERIFY_IDENTITY` for a more stringent security configuration, which provide additional verification checks of the server's certificates. This helps guard against man-in-the-middle attacks.

To configure Hyperdrive to verify the certificates of the server, you must provide Hyperdrive with the certificate of the root certificate authority (CA) or an intermediate certificate which has been used to sign the certificate of your database.

### Step 1: Upload the root certificate authority (CA) certificate

Using Wrangler, you can upload your root certificate authority (CA) certificate:

Terminal window

```

# requires Wrangler 4.9.0 or greater

npx wrangler cert upload certificate-authority --ca-cert \<ROUTE_TO_CA_PEM_FILE\>.pem --name \<CUSTOM_NAME_FOR_CA_CERT\>


---


Uploading CA Certificate tmp-cert...

Success! Uploaded CA Certificate <CUSTOM_NAME_FOR_CA_CERT>

ID: <YOUR_ID_FOR_THE_CA_CERTIFICATE>

...


```

Note

You must use the CA certificate bundle that is for your specific region. You cannot use a CA certificate bundle that contains more than one CA certificate, such as a global bundle of CA certificates containing each region's certificate.

### Step 2: Create your Hyperdrive configuration using the CA certificate and the SSL mode

Once your CA certificate has been created, you can create a Hyperdrive configuration with the newly created certificates using either the dashboard or Wrangler. You must also specify the SSL mode to use (`verify-ca`/`verify-full` for PostgreSQL or `VERIFY_CA`/`VERIFY_IDENTITY` for MySQL).

* [ Wrangler ](#tab-panel-8666)
* [ Dashboard ](#tab-panel-8667)

Using Wrangler, enter the following command in your terminal to create a Hyperdrive configuration with the CA certificate and SSL mode:

Terminal window

```

# PostgreSQL with verify-full

npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name" --ca-certificate-id <YOUR_CA_CERT_ID> --sslmode verify-full


# MySQL with VERIFY_IDENTITY

npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="mysql://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name" --ca-certificate-id <YOUR_CA_CERT_ID> --sslmode VERIFY_IDENTITY


```

From the dashboard, follow these steps to create a Hyperdrive configuration with server certificates:

1. In the Cloudflare dashboard, go to the **Hyperdrive** page.  
[ Go to **Hyperdrive** ](https://dash.cloudflare.com/?to=/:account/workers/hyperdrive)
2. Select **Create configuration**.
3. Select **Server certificates**.
4. Specify a SSL mode of **Verify CA** or **Verify full**.
5. Select the SSL certificate of the certificate authority (CA) of your database that you have previously uploaded with Wrangler.

When creating the Hyperdrive configuration, Hyperdrive will attempt to connect to the database with the provided credentials. If the command provides successful results, you have properly configured your Hyperdrive configuration to verify the certificates provided by your database server.

Note

Hyperdrive will attempt to connect to your database with the provided credentials to verify they are correct before creating a configuration. If you encounter an error when attempting to connect, refer to Hyperdrive's [troubleshooting documentation](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug possible causes.

## Client certificates

Your database can be configured to verify a certificate provided by the client (in this case, Hyperdrive). This serves as an additional factor to authenticate clients (in addition to the username and password). Refer to the [PostgreSQL ↗](https://www.postgresql.org/docs/current/libpq-ssl.html#LIBPQ-SSL-CLIENTCERT) or [MySQL ↗](https://dev.mysql.com/doc/refman/8.0/en/using-encrypted-connections.html) documentation for more details.

For the database server to be able to verify the client certificates, Hyperdrive must be configured to provide a certificate file (`client-cert.pem`) and a private key with which the certificate was generated (`private-key.pem`).

### Step 1: Upload your client certificates (mTLS certificates)

Upload your client certificates to be used by Hyperdrive using Wrangler:

Terminal window

```

# requires Wrangler 4.9.0 or greater

npx wrangler cert upload mtls-certificate --cert client-cert.pem --key client-key.pem --name <CUSTOM_NAME_FOR_CLIENT_CERTIFICATE>


---


Uploading client certificate <CUSTOM_NAME_FOR_CLIENT_CERTIFICATE>...

Success! Uploaded client certificate <CUSTOM_NAME_FOR_CLIENT_CERTIFICATE>

ID: <YOUR_ID_FOR_THE_CLIENT_CERTIFICATE_PAIR>

...


```

### Step 2: Create a Hyperdrive configuration

You can now create a Hyperdrive configuration using the newly created client certificate bundle using the dashboard or Wrangler.

* [ Wrangler ](#tab-panel-8668)
* [ Dashboard ](#tab-panel-8669)

Using Wrangler, enter the following command in your terminal to create a Hyperdrive configuration with the client certificate pair:

Terminal window

```

# PostgreSQL

npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name" --mtls-certificate-id <YOUR_CLIENT_CERT_PAIR_ID>


# MySQL

npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="mysql://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name" --mtls-certificate-id <YOUR_CLIENT_CERT_PAIR_ID>


```

From the dashboard, follow these steps to create a Hyperdrive configuration with server certificates:

1. In the Cloudflare dashboard, go to the **Hyperdrive** page.  
[ Go to **Hyperdrive** ](https://dash.cloudflare.com/?to=/:account/workers/hyperdrive)
2. Select **Create configuration**.
3. Select **Client certificates**.
4. Select the SSL client certificate and private key pair for Hyperdrive to use during the connection setup with your database server.

When Hyperdrive connects to your database, it will provide a client certificate signed with the private key to the database server. This allows the database server to confirm that the client, in this case Hyperdrive, has both the private key and the client certificate. By using client certificates, you can add an additional authentication layer for your database to ensure that only Hyperdrive can connect to it.

Note

Hyperdrive will attempt to connect to your database with the provided credentials to verify they are correct before creating a configuration. If you encounter an error when attempting to connect, refer to Hyperdrive's [troubleshooting documentation](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug possible causes.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/configuration/tls-ssl-certificates-for-hyperdrive/#page","headline":"SSL/TLS certificates · Cloudflare Hyperdrive docs","description":"Configure SSL/TLS server and client certificates for secure Hyperdrive database connections.","url":"https://developers.cloudflare.com/hyperdrive/configuration/tls-ssl-certificates-for-hyperdrive/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/hyperdrive/","name":"Hyperdrive"}},{"@type":"ListItem","position":3,"item":{"@id":"/hyperdrive/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/hyperdrive/configuration/tls-ssl-certificates-for-hyperdrive/","name":"SSL/TLS certificates"}}]}
```
