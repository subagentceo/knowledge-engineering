# Many-to-many shortest paths

    
    
      
    

    
      
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

# Many-to-many shortest paths Stay organized with collections Save and categorize content based on your preferences.

Given a directed graph with non-negative edge weights, this algorithm computes a shortest path between every node in a supplied _source nodes_ set \(S\) and every node in a supplied _target nodes_ set \(T\). For each \(s \in S, t \in T\), the algorithm finds a path from \(s\) to \(t\) that minimizes the shortest-path distance, defined as the sum of the weights of the path's edges. If multiple shortest paths exist between \(s\) and \(t\) (all with the same distance), the algorithm chooses one of the paths in a deterministic way: first, it selects path(s) containing a minimal number of edges, and if there are multiple such paths, it breaks ties by picking the path that minimizes the node IDs along the reverse paths from \(t\) back to \(s\) (see this example).

## Interface specifications

The following list summarizes the expectations on the graph passed as input to this algorithm. These expectations complement the ones listed in General assumptions on input graphs.

> *   Directed graph (an undirected graph can be converted into a directed graph by replacing each undirected edge \(xy\) with two directed edges \(xy\) and \(yx\), both with the same weight as the original edge).
> *   Edge weights: Must be non-negative.

Self-loops are always ignored because they will never be part of any shortest path.

The algorithm also takes as input a list of source node IDs and target node IDs defining the source and target node sets \(S\) and \(T\). Both of these lists must be nonempty and contain valid node IDs, that is, IDs between 0 (inclusive) and the number of nodes in the graph (exclusive). The same node ID may appear in both lists (in which case the shortest path between a node and itself will be the empty path with distance 0.0).

The result contains a total of \(|S| \times |T|\) shortest path distances and the sequence of _intermediate nodes_ along each shortest path (to avoid including the IDs of \(s\) and \(t\) themselves in the path result). If no path exists between a given source and target, the algorithm returns a distance of -1.0, and the corresponding intermediate node list will be empty.

To obtain only the shortest-path distances, use this configuration parameter to suppress the computation and returning of the intermediate nodes along each path:

Name

Type

Description

`return_paths`

bool

If `true`, return for each source \(s\) and target \(t\) the intermediate nodes of the shortest path from \(s\) to \(t\).

## Algorithm

The algorithm reduces the many-to-many shortest paths computation to multiple single-source shortest path (SSSP) computations: for each source node \(s \in S\) (one at a time), the algorithm runs a parallel SSSP algorithm from \(s\) to obtain the shortest-path tree rooted at \(s\).

The SSSP algorithm is an implementation of the _\(\rho\)-stepping_ algorithm from Efficient Stepping Algorithms and Implementations for Parallel Shortest Paths (Symposium on Parallelism in Algorithms and Architectures, 2021). \(\rho\)-stepping belongs to a family of _stepping algorithms_ for parallel SSSP. These algorithms maintain a priority queue of active nodes (nodes whose distance estimates have improved but whose outgoing edges have not yet been _relaxed_, that is, used to update the distance estimates of their neighbors) and proceed in synchronous rounds. In each round, the algorithm extracts a set of nodes from the queue based on a distance threshold, and relaxes their outgoing edges in parallel.

The key idea of \(\rho\)-stepping is to choose the extraction threshold adaptively based on the size of the frontier. If the frontier contains fewer than \(\rho\) nodes, the algorithm sets the threshold so that it processes all frontier nodes. Otherwise, the algorithm uses a _sampling scheme_ to estimate a threshold such that it will extract approximately \(\rho\) nodes: it randomly samples a subset of the frontier, sorts the samples by distance, and picks the threshold from an appropriate rank in the sorted order.

## Computational complexity

The algorithm is a parallel algorithm. For a single SSSP computation, it runs in \(O(D \cdot m \cdot \log(n^2 / (m \rho)))\) work and \(O(D \cdot n \cdot \log(n) / \rho)\) depth, where \(n\) and \(m\) denote the number of nodes and edges in the input graph, respectively, and \(D\) is the depth of the shortest-path tree (the maximum number of hops in any shortest path from the source). Running the algorithm on a machine that supports high amounts of parallelism tends to lead to a smaller running time.

Since the many-to-many algorithm runs one SSSP per source node sequentially, the overall work and depth are each multiplied by \(|S|\).

The memory used by the algorithm is \(O(n + |S| \cdot |T|)\) when `return_paths` is `false`, or \(O(n + |S| \cdot |T| \cdot D)\) when `return_paths` is `true`.

## Example

Consider this directed graph consisting of 11 nodes labeled \(a\) to \(k\) (representing the integer node IDs 0 through 10 in order):

![A directed graph with eleven nodes (a-k) and weighted edges, highlighting source nodes a and e and target nodes b, d, j, and k for the shortest paths computation.](/static/spanner/docs/reference/graph-algorithms/traversal/images/shortest-paths/input_graph.svg)

Running the algorithm with \(S = \{a, e\}\) (yellow nodes) and \(T = \{b, d, j, k\}\) (blue nodes) yields these results:

*   \(a \rightarrow b\): distance = 3.5, intermediate nodes = \([]\)
*   \(a \rightarrow d\): distance = 6.5, intermediate nodes = \([b, h, c]\)
*   \(a \rightarrow j\): distance = 5.5, intermediate nodes = \([b, h]\)
*   \(a \rightarrow k\): distance = -1.0, intermediate nodes = \([]\)
*   \(e \rightarrow b\): distance = -1.0, intermediate nodes = \([]\)
*   \(e \rightarrow d\): distance = 6.5, intermediate nodes = \([f, i, h, c]\)
*   \(e \rightarrow j\): distance = 5.5, intermediate nodes = \([f, i]\)
*   \(e \rightarrow k\): distance = 4.0, intermediate nodes = \([f, i]\)

Note that:

1.  Because there is a direct edge from node \(a\) to node \(b\), the list of intermediate nodes in the shortest path is empty.
2.  Because there is no path from node \(a\) to node \(k\) (or from node \(e\) to node \(b\)), the distance is -1.0, and the list of intermediate nodes is empty.
3.  Path distances are defined by the sum of the edge weights along the path, not by the number of edges in the path (although the latter is part of the tie-breaking algorithm, as described next). For example, in determining the shortest path from node \(a\) to node \(d\), the algorithm selects the path \([a, b, h, c, d]\) of distance 6.5 over the path \([a, b, c, d]\) with distance 7.0 even though the latter path is composed of fewer edges.
4.  If there are multiple shortest paths, the algorithm chooses one deterministically. For example, there are actually 4 shortest paths in the graph from node \(e\) to node \(j\), all with length 5.5: \([e, f, i, j]\), \([e, f, i, h, j]\), \([e, g, i, j]\), and \([e, g, i, h, j]\). In determining which path to return, the algorithm considers only those paths involving the minimal number of edges. That rules out the 4-edge paths \([e, f, i, h, j]\) and \([e, g, i, h, j]\), leaving the 3-edge paths \([e, f, i, j]\) and \([e, g, i, j]\). Among these remaining paths, the algorithm breaks ties as follows. In theory, it considers the paths starting at the target node and working backwards toward the source, comparing node IDs at the same relative position within the paths. At the first difference, it chooses the path with the smaller node ID. In this case, the last and second-to-last node IDs are the same. The first difference is at the second position. Note that \(f\) and \(g\) denote nodes 5 and 6; since \(5 < 6\), the algorithm selects the path \([e, f, i, j]\). In practice, the algorithm does this efficiently without having to consider all fewest-edges shortest paths.
5.  This example does not illustrate that in the degenerate case that the same node ID appears in both \(S\) and \(T\), the shortest path distance from the node to itself will be 0.0, and the list of intermediate nodes will be empty.

## External references

*   The \(\rho\)-stepping algorithm was introduced in Efficient Stepping Algorithms and Implementations for Parallel Shortest Paths (Symposium on Parallelism in Algorithms and Architectures, 2021).

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-06-09 UTC.

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