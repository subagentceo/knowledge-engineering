# Method: projects.instances.databases.getIamPolicy

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

Skip to main content

 ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/vab7d3990237361b4739a5005ec80b0af3ee973650a028ed684c6b12bd1dc988a/clouddocs/images/lockup_full_color.svg)

Technology areas

close

*   AI and ML
    
*   Application development
    
*   Application hosting
    
*   Compute
    
*   Data analytics and pipelines
    
*   Databases
    
*   Distributed, hybrid, and multicloud
    
*   Industry solutions
    
*   Migration
    
*   Networking
    
*   Observability and monitoring
    
*   Security
    
*   Storage
    

Cross-product tools

close

*   Access and resources management
    
*   Costs and usage management
    
*   Infrastructure as code
    
*   SDK, languages, frameworks, and tools
    

/

Console

*   English
*   Deutsch
*   Español – América Latina
*   Français
*   Português – Brasil
*   中文 – 简体
*   日本語
*   한국어

Sign in

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/products/spanner-color.svg)

*   Spanner

Start free

Overview Guides Reference Samples Support Resources ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/vab7d3990237361b4739a5005ec80b0af3ee973650a028ed684c6b12bd1dc988a/clouddocs/images/lockup_full_color.svg)

*   Technology areas
    
    *   More
    
    *   Overview
    *   Guides
    *   Reference
    *   Samples
    *   Support
    *   Resources
*   Cross-product tools
    *   More
*   Console

*   Spanner
    
*   All APIs & references
*   Overview of APIs and client libraries
*   Client libraries and drivers
    
*   Client libraries
    
    *   Overview
    *   C++ reference
    *   C# reference
    *   Go reference
    *   Java reference
    *   Node.js reference
    *   PHP reference
    *   Python reference
    *   Ruby reference
    
*   Drivers
    
    *   Overview of drivers
    *   JDBC drivers
        
        *   Overview
        *   Connect JDBC to a GoogleSQL-dialect database
        *   Connect JDBC to a PostgreSQL-dialect database
        *   Session management commands
            
            *   For GoogleSQL-dialect databases
            *   For PostgreSQL-dialect databases
            
        *   Spanner JDBC driver
        
    *   R2DBC driver
    *   Go database/sql driver
    *   pgx driver for Golang
    *   ADO.NET driver
    *   psycopg2 driver for Python
    *   psycopg3 driver for Python
    *   node-postgres driver for Node.js
    
*   Spanner APIs
    
*   REST reference
    
    *   Overview
    *   Standard API parameters
    *   Global and regional service endpoints
    *   v1
        
        *   REST Resources
            
        *   projects.instanceConfigOperations
            
            *   Overview
            *   list
            
        *   projects.instanceConfigs
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   projects.instanceConfigs.operations
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   list
            
        *   projects.instances
            
            *   Overview
            *   create
            *   delete
            *   get
            *   getIamPolicy
            *   list
            *   move
            *   patch
            *   setIamPolicy
            *   testIamPermissions
            
        *   projects.instances.backupOperations
            
            *   Overview
            *   list
            
        *   projects.instances.backups
            
            *   Overview
            *   copy
            *   create
            *   delete
            *   get
            *   getIamPolicy
            *   list
            *   patch
            *   setIamPolicy
            *   testIamPermissions
            
        *   projects.instances.backups.operations
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   list
            
        *   projects.instances.databaseOperations
            
            *   Overview
            *   list
            
        *   projects.instances.databases
            
            *   Overview
            *   addSplitPoints
            *   changequorum
            *   create
            *   dropDatabase
            *   get
            *   getDdl
            *   getIamPolicy
            *   list
            *   patch
            *   restore
            *   setIamPolicy
            *   testIamPermissions
            *   updateDdl
            
        *   projects.instances.databases.backupSchedules
            
            *   Overview
            *   create
            *   delete
            *   get
            *   getIamPolicy
            *   list
            *   patch
            *   setIamPolicy
            *   testIamPermissions
            
        *   projects.instances.databases.databaseRoles
            
            *   Overview
            *   list
            *   testIamPermissions
            
        *   projects.instances.databases.operations
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   list
            
        *   projects.instances.databases.sessions
            
            *   Overview
            *   adaptMessage
            *   adapter
            *   batchCreate
            *   batchWrite
            *   beginTransaction
            *   commit
            *   create
            *   delete
            *   executeBatchDml
            *   executeSql
            *   executeStreamingSql
            *   get
            *   list
            *   partitionQuery
            *   partitionRead
            *   read
            *   rollback
            *   streamingRead
            
        *   projects.instances.instancePartitionOperations
            
            *   Overview
            *   list
            
        *   projects.instances.instancePartitions
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   projects.instances.instancePartitions.operations
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   list
            
        *   projects.instances.operations
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   list
            
        *   Types
            
        *   AutoscalingConfig
        *   ChangeQuorumMetadata
        *   Code
        *   CompactDatabaseMetadata
        *   CopyBackupMetadata
        *   CreateBackupMetadata
        *   CreateDatabaseMetadata
        *   CreateInstanceConfigMetadata
        *   CreateInstanceMetadata
        *   CreateInstancePartitionMetadata
        *   DatabaseDialect
        *   DdlStatementActionInfo
        *   DirectedReadOptions
        *   Edition
        *   EncryptionInfo
        *   ErrorInfo
        *   FulfillmentPeriod
        *   GetPolicyOptions
        *   Help
        *   KeySet
        *   ListOperationsResponse
        *   MoveInstanceMetadata
        *   MoveInstanceResponse
        *   MultiplexedSessionPrecommitToken
        *   Mutation
        *   OperationProgress
        *   OptimizeRestoredDatabaseMetadata
        *   PartialResultSet
        *   PartitionOptions
        *   PartitionResponse
        *   Policy
        *   QueryMode
        *   QueryOptions
        *   ReplicaSelection
        *   RequestOptions
        *   RestoreDatabaseMetadata
        *   ResultSet
        *   ResultSetMetadata
        *   ResultSetStats
        *   Status
        *   StructType
        *   TestIamPermissionsResponse
        *   Transaction
        *   TransactionOptions
        *   TransactionSelector
        *   Type
        *   UpdateDatabaseDdlMetadata
        *   UpdateDatabaseMetadata
        *   UpdateInstanceConfigMetadata
        *   UpdateInstanceMetadata
        *   UpdateInstancePartitionMetadata
        *   WaitOperationRequest
        
    
*   RPC reference
    
    *   Overview
    *   google.iam.v1
    *   google.longrunning
    *   google.rpc
    *   google.spanner.adapter.v1
    *   google.spanner.admin.database.v1
    *   google.spanner.admin.instance.v1
    *   google.spanner.v1
    *   google.type
    
*   MCP reference
    
    *   Overview
    *   Spanner server
        
        *   Overview
        *   Tools
            
            *   get_instance
            *   list_instances
            *   list_configs
            *   get_config
            *   create_instance
            *   update_instance
            *   create_database
            *   get_database_ddl
            *   list_databases
            *   create_session
            *   execute_sql
            *   execute_sql_readonly
            *   commit
            *   update_database_schema
            *   get_operation
            
        
    *   Database insights server
        
        *   Overview
        *   Tools
            
            *   get_system_metrics
            
        
    
*   SQL in Spanner
    
*   SQL syntax quick reference
*   Dialect parity between GoogleSQL and PostgreSQL
*   GoogleSQL
    
    *   General reference
        
        *   Overview of GoogleSQL
        *   Data types
        *   Lexical structure and syntax
        *   Conversion rules
        *   Collation
        *   Format elements
        *   Function volatility
        *   Stored procedures
        
    *   Expressions
        
        *   Function calls
        *   Aggregate function calls
        *   Operators
        *   Conditional expressions
        *   Subqueries
        
    *   Query syntax
    *   Functions
        
        *   All functions
        *   Aggregate functions
            
            *   Overview
            *   ANY_VALUE
            *   ARRAY_AGG
            *   ARRAY_CONCAT_AGG
            *   AVG
            *   BIT_AND
            *   BIT_OR
            *   BIT_XOR
            *   COUNT
            *   COUNTIF
            *   LOGICAL_AND
            *   LOGICAL_OR
            *   MAX
            *   MIN
            *   STRING_AGG
            *   SUM
            
        *   Array functions
            
            *   Overview
            *   ARRAY
            *   ARRAY_CONCAT
            *   ARRAY_FILTER
            *   ARRAY_FIRST
            *   ARRAY_INCLUDES
            *   ARRAY_INCLUDES_ALL
            *   ARRAY_INCLUDES_ANY
            *   ARRAY_IS_DISTINCT
            *   ARRAY_LAST
            *   ARRAY_LENGTH
            *   ARRAY_MAX
            *   ARRAY_MIN
            *   ARRAY_REVERSE
            *   ARRAY_SLICE
            *   ARRAY_TO_STRING
            *   ARRAY_TRANSFORM
            *   GENERATE_ARRAY
            *   GENERATE_DATE_ARRAY
            *   JSON_ARRAY
            *   JSON_QUERY_ARRAY
            *   JSON_VALUE_ARRAY
            
        *   Bit functions
            
            *   Overview
            *   BIT_COUNT
            *   BIT_REVERSE
            
        *   Compression functions
            
            *   Overview
            *   ZSTD_COMPRESS
            *   ZSTD_DECOMPRESS_TO_BYTES
            *   ZSTD_DECOMPRESS_TO_STRING
            
        *   Conversion functions
            
            *   Overview
            *   CAST
            *   SAFE_CAST
            
        *   Date functions
            
            *   Overview
            *   ADDDATE
            *   CURRENT_DATE
            *   DATE
            *   DATE_ADD
            *   DATE_DIFF
            *   DATE_FROM_UNIX_DATE
            *   DATE_SUB
            *   DATE_TRUNC
            *   EXTRACT (date)
            *   FORMAT_DATE
            *   PARSE_DATE
            *   SUBDATE
            *   UNIX_DATE
            
        *   Debugging functions
            
            *   Overview
            *   ERROR
            
        *   Graph functions
            
            *   Overview
            *   DESTINATION_NODE_ID
            *   EDGES
            *   ELEMENT_DEFINITION_NAME
            *   ELEMENT_ID
            *   IS_ACYCLIC
            *   IS_FIRST
            *   IS_TRAIL
            *   LABELS
            *   NODES
            *   PATH
            *   PATH_FIRST
            *   PATH_LAST
            *   PATH_LENGTH
            *   PROPERTY_NAMES
            *   SOURCE_NODE_ID
            
        *   Hash functions
            
            *   Overview
            *   FARM_FINGERPRINT
            *   SHA1
            *   SHA256
            *   SHA512
            
        *   Interval functions
            
            *   Overview
            *   EXTRACT (interval)
            *   JUSTIFY_DAYS
            *   JUSTIFY_HOURS
            *   JUSTIFY_INTERVAL
            *   MAKE_INTERVAL
            
        *   JSON functions
            
            *   Overview
            *   BOOL
            *   BOOL_ARRAY
            *   FLOAT64
            *   FLOAT64_ARRAY
            *   FLOAT32
            *   FLOAT32_ARRAY
            *   INT64
            *   INT64_ARRAY
            *   JSON_ARRAY
            *   JSON_ARRAY_APPEND
            *   JSON_ARRAY_INSERT
            *   JSON_CONTAINS
            *   JSON_OBJECT
            *   JSON_QUERY
            *   JSON_QUERY_ARRAY
            *   JSON_REMOVE
            *   JSON_SET
            *   JSON_STRIP_NULLS
            *   JSON_TYPE
            *   JSON_VALUE
            *   JSON_VALUE_ARRAY
            *   LAX_BOOL
            *   LAX_FLOAT64
            *   LAX_INT64
            *   LAX_STRING
            *   PARSE_JSON
            *   SAFE_TO_JSON
            *   STRING (JSON)
            *   STRING_ARRAY
            *   TO_JSON
            *   TO_JSON_STRING
            
        *   Machine learning and AI functions
            
            *   Overview
            *   AI.CLASSIFY
            *   AI.IF
            *   AI.SCORE
            *   ML.PREDICT
            
        *   Mathematical functions
            
            *   Overview
            *   ABS
            *   ACOS
            *   ACOSH
            *   APPROX_COSINE_DISTANCE
            *   APPROX_DOT_PRODUCT
            *   APPROX_EUCLIDEAN_DISTANCE
            *   ASIN
            *   ASINH
            *   ATAN
            *   ATAN2
            *   ATANH
            *   CEIL
            *   CEILING
            *   COS
            *   COSH
            *   COSINE_DISTANCE
            *   DIV
            *   DOT_PRODUCT
            *   EXP
            *   EUCLIDEAN_DISTANCE
            *   FLOOR
            *   GREATEST
            *   IEEE_DIVIDE
            *   IS_INF
            *   IS_NAN
            *   LEAST
            *   LN
            *   LOG
            *   LOG10
            *   MOD
            *   POW
            *   POWER
            *   ROUND
            *   SAFE_ADD
            *   SAFE_DIVIDE
            *   SAFE_MULTIPLY
            *   SAFE_NEGATE
            *   SAFE_SUBTRACT
            *   SIGN
            *   SIN
            *   SINH
            *   SQRT
            *   TAN
            *   TANH
            *   TRUNC
            
        *   Net functions
            
            *   Overview
            *   NET.HOST
            *   NET.IP_FROM_STRING
            *   NET.IP_NET_MASK
            *   NET.IP_TO_STRING
            *   NET.IP_TRUNC
            *   NET.IPV4_FROM_INT64
            *   NET.IPV4_TO_INT64
            *   NET.PUBLIC_SUFFIX
            *   NET.REG_DOMAIN
            *   NET.SAFE_IP_FROM_STRING
            
        *   Protocol buffer functions
            
            *   Overview
            *   REPLACE_FIELDS
            
        *   Search functions
            
            *   Overview
            *   DEBUG_TOKENLIST
            *   SCORE
            *   SCORE_NGRAMS
            *   SEARCH
            *   SEARCH_NGRAMS
            *   SEARCH_SUBSTRING
            *   SNIPPET
            *   TOKEN
            *   TOKENIZE_BOOL
            *   TOKENIZE_FULLTEXT
            *   TOKENIZE_JSON
            *   TOKENIZE_NGRAMS
            *   TOKENIZE_NUMBER
            *   TOKENIZE_SUBSTRING
            *   TOKENLIST_CONCAT
            
        *   Sequence functions
            
            *   Overview
            *   GET_INTERNAL_SEQUENCE_STATE
            *   GET_NEXT_SEQUENCE_VALUE
            
        *   Statistical aggregate functions
            
            *   Overview
            *   STDDEV
            *   STDDEV_SAMP
            *   VAR_SAMP
            *   VARIANCE
            
        *   String functions
            
            *   Overview
            *   BYTE_LENGTH
            *   CHAR_LENGTH
            *   CHARACTER_LENGTH
            *   CODE_POINTS_TO_BYTES
            *   CODE_POINTS_TO_STRING
            *   CONCAT
            *   ENDS_WITH
            *   FORMAT
            *   FROM_BASE32
            *   FROM_BASE64
            *   FROM_HEX
            *   LCASE
            *   LENGTH
            *   LOWER
            *   LPAD
            *   LTRIM
            *   NORMALIZE
            *   NORMALIZE_AND_CASEFOLD
            *   OCTET_LENGTH
            *   REGEXP_CONTAINS
            *   REGEXP_EXTRACT
            *   REGEXP_EXTRACT_ALL
            *   REGEXP_REPLACE
            *   REPEAT
            *   REPLACE
            *   REVERSE
            *   RPAD
            *   RTRIM
            *   SAFE_CONVERT_BYTES_TO_STRING
            *   SOUNDEX
            *   SPLIT
            *   SPLIT_SUBSTR
            *   STARTS_WITH
            *   STRPOS
            *   SUBSTR
            *   SUBSTRING
            *   TO_BASE32
            *   TO_BASE64
            *   TO_CODE_POINTS
            *   TO_HEX
            *   TRIM
            *   UPPER
            *   UCASE
            
        *   Timestamp functions
            
            *   Overview
            *   CURRENT_TIMESTAMP
            *   EXTRACT (timestamp)
            *   FORMAT_TIMESTAMP
            *   PARSE_TIMESTAMP
            *   PENDING_COMMIT_TIMESTAMP
            *   STRING (timestamp)
            *   TIMESTAMP
            *   TIMESTAMP_ADD
            *   TIMESTAMP_DIFF
            *   TIMESTAMP_MICROS
            *   TIMESTAMP_MILLIS
            *   TIMESTAMP_SECONDS
            *   TIMESTAMP_SUB
            *   TIMESTAMP_TRUNC
            *   UNIX_MICROS
            *   UNIX_MILLIS
            *   UNIX_SECONDS
            
        *   Utility functions
            
            *   Overview
            *   GENERATE_UUID
            
        
    *   MySQL functions
        
        *   All MySQL functions
        *   Date and time functions
            
            *   Overview
            *   DATE_FORMAT
            *   DAY
            *   DAYNAME
            *   DAYOFMONTH
            *   DAYOFWEEK
            *   DAYOFYEAR
            *   FROM_DAYS
            *   FROM_UNIXTIME
            *   HOUR
            *   MAKEDATE
            *   MICROSECOND
            *   MINUTE
            *   MONTH
            *   MONTHNAME
            *   PERIOD_ADD
            *   PERIOD_DIFF
            *   QUARTER
            *   SECOND
            *   STR_TO_DATE
            *   SYSDATE
            *   TIME
            *   TO_DAYS
            *   TO_SECONDS
            *   UNIX_TIMESTAMP
            *   UTC_DATE
            *   UTC_TIMESTAMP
            *   WEEK
            *   WEEKDAY
            *   WEEKOFYEAR
            *   YEAR
            
        *   Encryption and compression functions
            
            *   Overview
            *   SHA2
            
        *   JSON functions
            
            *   Overview
            *   JSON_QUOTE
            *   JSON_UNQUOTE
            
        *   Numeric functions
            
            *   Overview
            *   DEGREES
            *   LOG2
            *   PI
            *   RADIANS
            *   TRUNCATE
            
        *   String functions
            
            *   Overview
            *   BIT_LENGTH
            *   CHAR
            *   CONCAT_WS
            *   HEX
            *   INSERT
            *   LOCATE
            *   MID
            *   OCT
            *   ORD
            *   POSITION
            *   QUOTE
            *   REGEXP_LIKE
            *   REGEXP_SUBSTR
            *   SPACE
            *   STRCMP
            *   SUBSTRING_INDEX
            *   UNHEX
            
        *   Timestamp functions
            
            *   Overview
            *   DATEDIFF
            *   LOCALTIME
            *   LOCALTIMESTAMP
            *   NOW
            
        *   Utility functions
            
            *   Overview
            *   BIN_TO_UUID
            *   INET_ATON
            *   INET_NTOA
            *   INET6_ATON
            *   INET6_NTOA
            *   IS_IPV4
            *   IS_IPV4_COMPAT
            *   IS_IPV4_MAPPED
            *   IS_IPV6
            *   IS_UUID
            *   UUID
            *   UUID_TO_BIN
            
        
    *   Statements
        
        *   DDL (Data Definition Language)
        *   DML (Data Manipulation Language)
        *   Procedural language
        
    
*   PostgreSQL
    
    *   Overview of PostgreSQL
    *   Lexical structure and syntax
    *   Data definition (DDL)
    *   Data manipulation (DML)
    *   Query syntax
    *   Subqueries
    *   Data types
    *   Functions
    *   Operators
    *   Stored procedures
    *   PostgreSQL system catalog tables
    *   PostgreSQL system catalog views
    *   Known issues in the PostgreSQL interface
    
*   Information schema
    
    *   For GoogleSQL databases
    *   For PostgreSQL databases
    
*   Query execution operators
    
    *   Overview
    *   Leaf operators
    *   Unary operators
    *   Binary operators
    *   N-ary operators
    *   Distributed operators
    *   Scalar subqueries
    *   Array subqueries
    *   Struct constructor
    
*   GQL in Spanner
    
*   Overview
*   Spanner Graph and ISO standards
*   Schema statements
    
    *   Overview
    *   CREATE PROPERTY GRAPH statement
    *   DROP PROPERTY GRAPH statement
    
*   Query statements
    
    *   Overview
    *   GQL syntax
    *   Graph clause
    *   CALL statement
    *   FILTER statement
    *   FOR statement
    *   LET statement
    *   LIMIT statement
    *   MATCH statement
    *   NEXT statement
    *   OFFSET statement
    *   ORDER BY statement
    *   RETURN statement
    *   SKIP statement
    *   WITH statement
    *   Graph hints
    
*   GQL within SQL
    
    *   Overview
    *   GRAPH_TABLE operator
    
*   Patterns
    
    *   Overview
    *   Graph pattern
    *   Element pattern
    *   Subpath pattern
    *   Quantified path pattern
    *   Label expression
    *   Path search prefix
    *   Path mode
    
*   Subqueries
    
    *   Overview
    *   ARRAY subquery
    *   EXISTS subquery
    *   IN subquery
    *   VALUE subquery
    
*   Data types
    
    *   Overview
    *   Graph element type
    *   Graph path type
    
*   Operators
    
    *   Overview
    *   Concatenation operator
    *   Logical operators
    *   ALL_DIFFERENT predicate
    *   IS DESTINATION predicate
    *   IS SOURCE predicate
    *   PROPERTY_EXISTS predicate
    *   SAME predicate
    
*   Functions
    
    *   Overview
    *   DESTINATION_NODE_ID function
    *   EDGES function
    *   ELEMENT_DEFINITION_NAME function
    *   ELEMENT_ID function
    *   IS_ACYCLIC function
    *   IS_FIRST function
    *   IS_TRAIL function
    *   LABELS function
    *   NODES function
    *   PATH function
    *   PATH_FIRST function
    *   PATH_LAST function
    *   PATH_LENGTH function
    *   PROPERTY_NAMES function
    *   SOURCE_NODE_ID function
    
*   Conditional expressions
    
    *   Overview
    
*   Graph algorithms
    
*   Overview
*   Input graph assumptions
*   Computational model
*   Algorithms
    
    *   Clustering
        
        *   Clique aggregator
        *   Connected components
        *   Correlation clustering
        *   Label propagation
        *   Modularity clustering
        
    *   Node centrality
        
        *   Betweenness centrality
        *   Closeness centrality
        *   PageRank
        
    *   Node similarity
        
        *   Pairwise node similarity
        
    *   Graph traversal
        
        *   Shortest paths
        
    
*   Glossary
*   CLIs
    
*   gcloud command-line tool
*   psql command-line tool

*   AI and ML
*   Application development
*   Application hosting
*   Compute
*   Data analytics and pipelines
*   Databases
*   Distributed, hybrid, and multicloud
*   Industry solutions
*   Migration
*   Networking
*   Observability and monitoring
*   Security
*   Storage

*   Access and resources management
*   Costs and usage management
*   Infrastructure as code
*   SDK, languages, frameworks, and tools

*   Home
*   Documentation
*   Databases
*   Spanner
*   Reference

Send feedback

# Method: projects.instances.databases.getIamPolicy Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
    *   JSON representation
*   Response body
*   Authorization scopes
*   Try it!

Gets the access control policy for a database or backup resource. Returns an empty policy if a database or backup exists but does not have a policy set.

Authorization requires `spanner.databases.getIamPolicy` permission on `resource`. For backups, authorization requires `spanner.backups.getIamPolicy` permission on `resource`. For backup schedules, authorization requires `spanner.backupSchedules.getIamPolicy` permission on `resource`.

### HTTP request

Choose a location:

global europe-west8 me-central2 us-central1 us-central2 us-east1 us-east4 us-east5 us-south1 us-west1 us-west2 us-west3 us-west4 us-west8 us-east7

  
`POST https://spanner.googleapis.com/v1/{resource=projects/*/instances/*/databases/*}:getIamPolicy`

The URLs use gRPC Transcoding syntax.

### Path parameters

 

Parameters

`resource`

`string`

REQUIRED: The Cloud Spanner resource for which the policy is being retrieved. The format is `projects/<project ID>/instances/<instance ID>` for instance resources and `projects/<project ID>/instances/<instance ID>/databases/<database ID>` for database resources.

### Request body

The request body contains data with the following structure:

JSON representation

{
  "options": {
    object (`GetPolicyOptions`)
  }
}

 

Fields

`options`

``object (`GetPolicyOptions`)``

OPTIONAL: A `GetPolicyOptions` object for specifying options to `databases.getIamPolicy`.

### Response body

If successful, the response body contains an instance of `Policy`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/spanner.admin`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-12-12 UTC.

*   ### Products and pricing
    
    *   See all products
    *   Google Cloud pricing
    *   Google Cloud Marketplace
    *   Contact sales
*   ### Support
    
    *   Community forums
    *   Support
    *   Release Notes
    *   System status
*   ### Resources
    
    *   GitHub
    *   Getting Started with Google Cloud
    *   Code samples
    *   Cloud Architecture Center
    *   Training and Certification
*   ### Engage
    
    *   Blog
    *   Events
    *   X (Twitter)
    *   Google Cloud on YouTube
    *   Google Cloud Tech on YouTube

*   About Google
*   Privacy
*   Site terms
*   Google Cloud terms
*   Manage cookies
*   Our third decade of climate action: join us
*   Sign up for the Google Cloud newsletter Subscribe

*   English
*   Deutsch
*   Español – América Latina
*   Français
*   Português – Brasil
*   中文 – 简体
*   日本語
*   한국어