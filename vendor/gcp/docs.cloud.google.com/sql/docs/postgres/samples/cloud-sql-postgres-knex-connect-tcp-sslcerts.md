# Create a TCP connection with SSL certificates by using Node.js

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Cloud SQL
*   PostgreSQL
*   Samples

# Create a TCP connection with SSL certificates by using Node.js Stay organized with collections Save and categorize content based on your preferences.

Open a TCP connection to Cloud SQL for PostgreSQL by using the Node.js knex module with SSL (Secure Sockets Layer) certificates.

## Code sample

### Node.js

To authenticate to Cloud SQL for PostgreSQL, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
const Knex = require('knex');
const fs = require('fs');

// createTcpPool initializes a TCP connection pool for a Cloud SQL
// instance of Postgres.
const createTcpPool = async config => {
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  const dbConfig = {
    client: 'pg',
    connection: {
      host: process.env.INSTANCE_HOST, // e.g. '127.0.0.1'
      port: process.env.DB_PORT, // e.g. '5432'
      user: process.env.DB_USER, // e.g. 'my-user'
      password: process.env.DB_PASS, // e.g. 'my-user-password'
      database: process.env.DB_NAME, // e.g. 'my-database'
    },
    // ... Specify additional properties here.
    ...config,
  };

  // (OPTIONAL) Configure SSL certificates
  // For deployments that connect directly to a Cloud SQL instance without
  // using the Cloud SQL Proxy, configuring SSL certificates will ensure the
  // connection is encrypted.
  if (process.env.DB_ROOT_CERT) {
    dbConfig.connection.ssl = {
      rejectUnauthorized: false,
      ca: fs.readFileSync(process.env.DB_ROOT_CERT), // e.g., '/path/to/my/server-ca.pem'
      key: fs.readFileSync(process.env.DB_KEY), // e.g. '/path/to/my/client-key.pem'
      cert: fs.readFileSync(process.env.DB_CERT), // e.g. '/path/to/my/client-cert.pem'
    };
  }
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.