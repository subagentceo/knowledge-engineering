# MCP Tools Reference: bigquerydatatransfer.googleapis.com

    
    
      
    

    
      
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

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/products/bigquery-color.svg)

*   BigQuery

Start free

Overview Guides Reference Samples Resources ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/vab7d3990237361b4739a5005ec80b0af3ee973650a028ed684c6b12bd1dc988a/clouddocs/images/lockup_full_color.svg)

*   Technology areas
    
    *   More
    
    *   Overview
    *   Guides
    *   Reference
    *   Samples
    *   Resources
*   Cross-product tools
    *   More
*   Console

*   Quotas and limits
    
*   Quotas and limits reference
*   Troubleshoot quota and limit errors
*   BigQuery command-line tool
    
*   bq command-line tool reference
*   SQL in BigQuery
    
*   GoogleSQL reference
    
    *   Query syntax
    *   Pipe syntax
    *   General reference
        
        *   Data types
        *   Lexical structure and syntax
        *   Conversion rules
        *   Format elements
        *   Collation
        *   Text analysis
        
    *   Expressions
        
        *   Function calls
        *   Aggregate function calls
        *   Window function calls
        *   Operators
        *   Conditional expressions
        *   Subqueries
        
    *   Functions
        
        *   All functions
        *   AEAD encryption functions
            
            *   Overview
            *   AEAD.DECRYPT_BYTES
            *   AEAD.DECRYPT_STRING
            *   AEAD.ENCRYPT
            *   DETERMINISTIC_DECRYPT_BYTES
            *   DETERMINISTIC_DECRYPT_STRING
            *   DETERMINISTIC_ENCRYPT
            *   KEYS.ADD_KEY_FROM_RAW_BYTES
            *   KEYS.KEYSET_CHAIN
            *   KEYS.KEYSET_FROM_JSON
            *   KEYS.KEYSET_LENGTH
            *   KEYS.KEYSET_TO_JSON
            *   KEYS.NEW_KEYSET
            *   KEYS.NEW_WRAPPED_KEYSET
            *   KEYS.REWRAP_KEYSET
            *   KEYS.ROTATE_KEYSET
            *   KEYS.ROTATE_WRAPPED_KEYSET
            
        *   Aggregate functions
            
            *   Overview
            *   AGG
            *   ANY_VALUE
            *   ARRAY_AGG
            *   ARRAY_CONCAT_AGG
            *   AVG
            *   BIT_AND
            *   BIT_OR
            *   BIT_XOR
            *   COUNT
            *   COUNTIF
            *   GROUPING
            *   LOGICAL_AND
            *   LOGICAL_OR
            *   MAX
            *   MAX_BY
            *   MIN
            *   MIN_BY
            *   STRING_AGG
            *   SUM
            
        *   Approximate aggregate functions
            
            *   Overview
            *   APPROX_COUNT_DISTINCT
            *   APPROX_QUANTILES
            *   APPROX_TOP_COUNT
            *   APPROX_TOP_SUM
            
        *   Array functions
            
            *   Overview
            *   ARRAY
            *   ARRAY_CONCAT
            *   ARRAY_FIRST
            *   ARRAY_LAST
            *   ARRAY_LENGTH
            *   ARRAY_REVERSE
            *   ARRAY_SLICE
            *   ARRAY_TO_STRING
            *   GENERATE_ARRAY
            *   GENERATE_DATE_ARRAY
            *   GENERATE_TIMESTAMP_ARRAY
            
        *   Bit functions
            
            *   Overview
            *   BIT_COUNT
            
        *   Conversion functions
            
            *   Overview
            *   CAST
            *   PARSE_BIGNUMERIC
            *   PARSE_NUMERIC
            *   SAFE_CAST
            
        *   Date functions
            
            *   Overview
            *   CURRENT_DATE
            *   DATE
            *   DATE_ADD
            *   DATE_DIFF
            *   DATE_FROM_UNIX_DATE
            *   DATE_SUB
            *   DATE_TRUNC
            *   EXTRACT (date)
            *   FORMAT_DATE
            *   LAST_DAY (date)
            *   PARSE_DATE
            *   UNIX_DATE
            
        *   Datetime functions
            
            *   Overview
            *   CURRENT_DATETIME
            *   DATETIME
            *   DATETIME_ADD
            *   DATETIME_DIFF
            *   DATETIME_SUB
            *   DATETIME_TRUNC
            *   EXTRACT (datetime)
            *   FORMAT_DATETIME
            *   LAST_DAY (datetime)
            *   PARSE_DATETIME
            
        *   Debugging functions
            
            *   Overview
            *   ERROR
            
        *   Differentially private aggregate functions
            
            *   Overview
            *   AVG (DIFFERENTIAL_PRIVACY)
            *   COUNT (DIFFERENTIAL_PRIVACY)
            *   PERCENTILE_CONT (DIFFERENTIAL_PRIVACY)
            *   SUM (DIFFERENTIAL_PRIVACY)
            
        *   Federated query functions
            
            *   Overview
            *   EXTERNAL_QUERY
            
        *   DLP encryption functions
            
            *   Overview
            *   DLP_DETERMINISTIC_ENCRYPT
            *   DLP_DETERMINISTIC_DECRYPT
            *   DLP_KEY_CHAIN
            
        *   Geography functions
            
            *   Overview
            *   ST_ANGLE
            *   ST_AREA
            *   ST_ASBINARY
            *   ST_ASGEOJSON
            *   ST_ASTEXT
            *   ST_AZIMUTH
            *   ST_BOUNDARY
            *   ST_BOUNDINGBOX
            *   ST_BUFFER
            *   ST_BUFFERWITHTOLERANCE
            *   ST_CENTROID
            *   ST_CENTROID_AGG
            *   ST_CLOSESTPOINT
            *   ST_CLUSTERDBSCAN
            *   ST_CONTAINS
            *   ST_CONVEXHULL
            *   ST_COVEREDBY
            *   ST_COVERS
            *   ST_DIFFERENCE
            *   ST_DIMENSION
            *   ST_DISJOINT
            *   ST_DISTANCE
            *   ST_DUMP
            *   ST_DWITHIN
            *   ST_ENDPOINT
            *   ST_EQUALS
            *   ST_EXTENT
            *   ST_EXTERIORRING
            *   ST_GEOGFROM
            *   ST_GEOGFROMGEOJSON
            *   ST_GEOGFROMTEXT
            *   ST_GEOGFROMWKB
            *   ST_GEOGPOINT
            *   ST_GEOGPOINTFROMGEOHASH
            *   ST_GEOHASH
            *   ST_GEOMETRYTYPE
            *   ST_HAUSDORFFDISTANCE
            *   ST_HAUSDORFFDWITHIN
            *   ST_INTERIORRINGS
            *   ST_INTERSECTION
            *   ST_INTERSECTS
            *   ST_INTERSECTSBOX
            *   ST_ISCLOSED
            *   ST_ISCOLLECTION
            *   ST_ISEMPTY
            *   ST_ISRING
            *   ST_LENGTH
            *   ST_LINEINTERPOLATEPOINT
            *   ST_LINELOCATEPOINT
            *   ST_LINESUBSTRING
            *   ST_MAKELINE
            *   ST_MAKEPOLYGON
            *   ST_MAKEPOLYGONORIENTED
            *   ST_MAXDISTANCE
            *   ST_NPOINTS
            *   ST_NUMGEOMETRIES
            *   ST_NUMPOINTS
            *   ST_PERIMETER
            *   ST_POINTN
            *   ST_REGIONSTATS
            *   ST_SIMPLIFY
            *   ST_SNAPTOGRID
            *   ST_STARTPOINT
            *   ST_TOUCHES
            *   ST_UNION
            *   ST_UNION_AGG
            *   ST_WITHIN
            *   ST_X
            *   ST_Y
            *   S2_CELLIDFROMPOINT
            *   S2_COVERINGCELLIDS
            
        *   Hash functions
            
            *   Overview
            *   FARM_FINGERPRINT
            *   MD5
            *   SHA1
            *   SHA256
            *   SHA512
            
        *   HyperLogLog++ functions
            
            *   Overview
            *   HLL_COUNT.EXTRACT
            *   HLL_COUNT.INIT
            *   HLL_COUNT.MERGE
            *   HLL_COUNT.MERGE_PARTIAL
            
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
            *   FLOAT64
            *   INT64
            *   JSON_ARRAY
            *   JSON_ARRAY_APPEND
            *   JSON_ARRAY_INSERT
            *   JSON_EXTRACT
            *   JSON_EXTRACT_ARRAY
            *   JSON_EXTRACT_SCALAR
            *   JSON_EXTRACT_STRING_ARRAY
            *   JSON_FLATTEN
            *   JSON_KEYS
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
            *   STRING (JSON)
            *   TO_JSON
            *   TO_JSON_STRING
            
        *   KLL functions
            
            *   Overview
            *   KLL_QUANTILES.EXTRACT_INT64
            *   KLL_QUANTILES.EXTRACT_FLOAT64
            *   KLL_QUANTILES.EXTRACT_POINT_INT64
            *   KLL_QUANTILES.EXTRACT_POINT_FLOAT64
            *   KLL_QUANTILES.INIT_INT64
            *   KLL_QUANTILES.INIT_FLOAT64
            *   KLL_QUANTILES.MERGE_INT64
            *   KLL_QUANTILES.MERGE_FLOAT64
            *   KLL_QUANTILES.MERGE_PARTIAL
            *   KLL_QUANTILES.MERGE_POINT_INT64
            *   KLL_QUANTILES.MERGE_POINT_FLOAT64
            
        *   Mathematical functions
            
            *   Overview
            *   ABS
            *   ACOS
            *   ACOSH
            *   ASIN
            *   ASINH
            *   ATAN
            *   ATAN2
            *   ATANH
            *   CBRT
            *   CEIL
            *   CEILING
            *   COS
            *   COSH
            *   COSINE_DISTANCE
            *   COT
            *   COTH
            *   CSC
            *   CSCH
            *   DIV
            *   EXP
            *   EUCLIDEAN_DISTANCE
            *   FLOOR
            *   GREATEST
            *   IS_INF
            *   IS_NAN
            *   LEAST
            *   LN
            *   LOG
            *   LOG10
            *   MOD
            *   POW
            *   POWER
            *   RAND
            *   RANGE
            *   RANGE_BUCKET
            *   ROUND
            *   SAFE_ADD
            *   SAFE_DIVIDE
            *   SAFE_MULTIPLY
            *   SAFE_NEGATE
            *   SAFE_SUBTRACT
            *   SEC
            *   SECH
            *   SIGN
            *   SIN
            *   SINH
            *   SQRT
            *   TAN
            *   TANH
            *   TRUNC
            
        *   Navigation functions
            
            *   Overview
            *   FIRST_VALUE
            *   LAG
            *   LAST_VALUE
            *   LEAD
            *   NTH_VALUE
            *   PERCENTILE_CONT
            *   PERCENTILE_DISC
            
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
            
        *   Numbering functions
            
            *   Overview
            *   CUME_DIST
            *   DENSE_RANK
            *   NTILE
            *   PERCENT_RANK
            *   RANK
            *   ROW_NUMBER
            
        *   ObjectRef functions
            
            *   Overview
            *   OBJ.FETCH_METADATA
            *   OBJ.GET_ACCESS_URL
            *   OBJ.GET_READ_URL
            *   OBJ.MAKE_REF
            
        *   Range functions
            
            *   Overview
            *   GENERATE_RANGE_ARRAY
            *   RANGE
            *   RANGE_CONTAINS
            *   RANGE_END
            *   RANGE_INTERSECT
            *   RANGE_OVERLAPS
            *   RANGE_SESSIONIZE
            *   RANGE_START
            
        *   Search functions
            
            *   Overview
            *   SEARCH
            *   VECTOR_SEARCH
            
        *   Security functions
            
            *   Overview
            *   SESSION_USER
            
        *   Statistical aggregate functions
            
            *   Overview
            *   CORR
            *   COVAR_POP
            *   COVAR_SAMP
            *   STDDEV
            *   STDDEV_POP
            *   STDDEV_SAMP
            *   VAR_POP
            *   VAR_SAMP
            *   VARIANCE
            
        *   String functions
            
            *   Overview
            *   ASCII
            *   BYTE_LENGTH
            *   CHAR_LENGTH
            *   CHARACTER_LENGTH
            *   CHR
            *   CODE_POINTS_TO_BYTES
            *   CODE_POINTS_TO_STRING
            *   COLLATE
            *   CONCAT
            *   CONTAINS_SUBSTR
            *   EDIT_DISTANCE
            *   ENDS_WITH
            *   FORMAT
            *   FROM_BASE32
            *   FROM_BASE64
            *   FROM_HEX
            *   INITCAP
            *   INSTR
            *   LEFT
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
            *   REGEXP_INSTR
            *   REGEXP_REPLACE
            *   REGEXP_SUBSTR
            *   REPEAT
            *   REPLACE
            *   REVERSE
            *   RIGHT
            *   RPAD
            *   RTRIM
            *   SAFE_CONVERT_BYTES_TO_STRING
            *   SOUNDEX
            *   SPLIT
            *   STARTS_WITH
            *   STRPOS
            *   SUBSTR
            *   SUBSTRING
            *   TO_BASE32
            *   TO_BASE64
            *   TO_CODE_POINTS
            *   TO_HEX
            *   TRANSLATE
            *   TRIM
            *   UNICODE
            *   UPPER
            
        *   Table functions (built-in)
            
            *   Overview
            *   EXTERNAL_OBJECT_TRANSFORM
            
        *   Text analysis functions
            
            *   Overview
            *   BAG_OF_WORDS
            *   TEXT_ANALYZE
            *   TF_IDF
            
        *   Time functions
            
            *   Overview
            *   CURRENT_TIME
            *   EXTRACT (time)
            *   FORMAT_TIME
            *   PARSE_TIME
            *   TIME
            *   TIME_ADD
            *   TIME_DIFF
            *   TIME_SUB
            *   TIME_TRUNC
            
        *   Time series functions
            
            *   Overview
            *   APPENDS
            *   CHANGES
            *   DATE_BUCKET
            *   DATETIME_BUCKET
            *   GAP_FILL
            *   TIMESTAMP_BUCKET
            
        *   Timestamp functions
            
            *   Overview
            *   CURRENT_TIMESTAMP
            *   EXTRACT (timestamp)
            *   FORMAT_TIMESTAMP
            *   PARSE_TIMESTAMP
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
            *   TYPEOF
            
        *   Vector index functions
            
            *   Overview
            *   VECTOR_INDEX.STATISTICS
            
        *   Window functions
        
    *   Statements
        
        *   Data definition language (DDL)
        *   Data manipulation language (DML)
        *   Data control language (DCL)
        *   Procedural language
        *   Export statements
        *   Load statements
        *   Debugging statements
        
    
*   BigQuery ML SQL reference
    
    *   Creating and training models
        
        *   CREATE MODEL statement overview
        *   Regression and classification
            
            *   Linear and logistic regression
            *   Boosted trees
            *   Random forest
            *   Deep neural networks
            *   Wide-and-deep networks
            *   AutoML models
            
        *   Clustering
            
            *   K-means
            
        *   Dimensionality reduction
            
            *   Principal component analysis
            *   Autoencoder
            
        *   Recommendation
            
            *   Matrix factorization
            
        *   Time series forecasting
            
            *   Univariate forecasting with ARIMA_PLUS models
            *   Multivariate forecasting with ARIMA_PLUS_XREG models
            
        *   Importing models
            
            *   Open Neural Network Exchange (ONNX)
            *   TensorFlow
            *   TensorFlow Lite
            *   XGBoost
            
        *   Remote models
            
            *   Foundation models
                
                *   Agent Platform LLMs as MaaS
                *   Agent Platform embedding models as MaaS
                *   Self-deployed open models
                *   Fine-tuned Gemini models
                
            *   Cloud AI services
            *   Custom models deployed to Agent Platform
            
        *   Transform-only
        
    *   Feature engineering
        
        *   ML.TRANSFORM
        *   ML.FEATURE_INFO
        *   General functions
            
            *   ML.IMPUTER
            
        *   Numerical functions
            
            *   ML.BUCKETIZE
            *   ML.MAX_ABS_SCALER
            *   ML.MIN_MAX_SCALER
            *   ML.NORMALIZER
            *   ML.POLYNOMIAL_EXPAND
            *   ML.QUANTILE_BUCKETIZE
            *   ML.ROBUST_SCALER
            *   ML.STANDARD_SCALER
            
        *   Categorical functions
            
            *   ML.FEATURE_CROSS
            *   ML.HASH_BUCKETIZE
            *   ML.LABEL_ENCODER
            *   ML.MULTI_HOT_ENCODER
            *   ML.ONE_HOT_ENCODER
            
        *   Text functions
            
            *   ML.NGRAMS
            *   ML.BAG_OF_WORDS
            *   ML.TF_IDF
            
        *   Image functions
            
            *   ML.CONVERT_COLOR_SPACE
            *   ML.CONVERT_IMAGE_TYPE
            *   ML.DECODE_IMAGE
            *   ML.RESIZE_IMAGE
            
        *   Point-in-time lookup functions
            
            *   ML.FEATURES_AT_TIME
            *   ML.ENTITY_FEATURES_AT_TIME
            
        
    *   Augmented analytics
        
        *   AI.KEY_DRIVERS
        *   ML.SEASONALITY
        *   ML.TREND
        *   Contribution analysis
        *   ML.GET_INSIGHTS
        *   ML.CORRELATION
        
    *   Hyperparameter tuning functions
        
        *   ML.TRIAL_INFO
        
    *   Evaluation functions
        
        *   ML.EVALUATE
        *   ML.ROC_CURVE
        *   ML.CONFUSION_MATRIX
        *   ML.ARIMA_EVALUATE
        *   ML.TRAINING_INFO
        *   ML.RECONSTRUCTION_LOSS
        *   ML.HOLIDAY_INFO
        
    *   Inference functions
        
        *   ML.PREDICT
        *   ML.FORECAST
        *   ML.RECOMMEND
        *   ML.DETECT_ANOMALIES
        
    *   Generative AI functions
        
        *   General-purpose
            
            *   AI.GENERATE
            *   AI.GENERATE_BOOL
            *   AI.GENERATE_DOUBLE
            *   AI.GENERATE_INT
            *   AI.GENERATE_TABLE
            *   AI.GENERATE_TEXT
            *   ML.GENERATE_TEXT
            
        *   Managed
            
            *   AI.IF
            *   AI.SCORE
            *   AI.CLASSIFY
            *   AI.AGG
            
        *   Embedding generation and semantic search
            
            *   AI.EMBED
            *   AI.SIMILARITY
            *   AI.SEARCH
            *   VECTOR_SEARCH
            *   AI.GENERATE_EMBEDDING
            *   ML.GENERATE_EMBEDDING
            
        *   Forecasting and anomaly detection
            
            *   AI.FORECAST
            *   AI.DETECT_ANOMALIES
            *   AI.EVALUATE
            
        
    *   AI utility functions
        
        *   AI.COUNT_TOKENS
        
    *   Cloud API AI functions
        
        *   ML.UNDERSTAND_TEXT
        *   ML.TRANSLATE
        *   ML.PROCESS_DOCUMENT
        *   ML.TRANSCRIBE
        *   ML.ANNOTATE_IMAGE
        
    *   AI Explanation functions
        
        *   ML.EXPLAIN_PREDICT
        *   ML.EXPLAIN_FORECAST
        *   ML.GLOBAL_EXPLAIN
        *   ML.FEATURE_IMPORTANCE
        *   ML.ADVANCED_WEIGHTS
        
    *   Model weights functions
        
        *   ML.WEIGHTS
        *   ML.CENTROIDS
        *   ML.PRINCIPAL_COMPONENTS
        *   ML.PRINCIPAL_COMPONENT_INFO
        *   ML.ARIMA_COEFFICIENTS
        
    *   Model monitoring functions
        
        *   ML.DESCRIBE_DATA
        *   ML.VALIDATE_DATA_DRIFT
        *   ML.VALIDATE_DATA_SKEW
        *   ML.TFDV_DESCRIBE
        *   ML.TFDV_VALIDATE
        
    *   Math utility functions
        
        *   ML.DISTANCE
        *   ML.LP_NORM
        
    *   Model management statements
        
        *   EXPORT MODEL statement
        *   ALTER MODEL statement
        *   DROP MODEL statement
        
    
*   INFORMATION SCHEMA views
    
    *   Introduction
    *   Access control
        
        *   OBJECT_PRIVILEGES view
        
    *   BI Engine
        
        *   BI_CAPACITIES
        *   BI_CAPACITY_CHANGES
        
    *   Configurations
        
        *   EFFECTIVE_PROJECT_OPTIONS view
        *   ORGANIZATION_OPTIONS view
        *   ORGANIZATION_OPTIONS_CHANGES view
        *   PROJECT_OPTIONS view
        *   PROJECT_OPTIONS_CHANGES view
        
    *   Datasets
        
        *   SCHEMATA view
        *   SCHEMATA_LINKS view
        *   SCHEMATA_OPTIONS view
        *   SHARED_DATASET_USAGE view
        *   SCHEMATA_REPLICAS view
        *   SCHEMATA_REPLICAS_BY_FAILOVER_RESERVATION view
        
    *   Graphs
        
        *   PROPERTY_GRAPHS view
        
    *   Jobs
        
        *   JOBS view
        *   JOBS_BY_USER view
        *   JOBS_BY_FOLDER view
        *   JOBS_BY_ORGANIZATION view
        
    *   Jobs by timeslice
        
        *   JOBS_TIMELINE view
        *   JOBS_TIMELINE_BY_USER view
        *   JOBS_TIMELINE_BY_FOLDER view
        *   JOBS_TIMELINE_BY_ORGANIZATION view
        
    *   Recommendations and insights
        
        *   INSIGHTS view
        *   RECOMMENDATIONS view
        *   RECOMMENDATIONS_BY_ORGANIZATION view
        
    *   Reservations
        
        *   ASSIGNMENTS view
        *   ASSIGNMENT_CHANGES view
        *   CAPACITY_COMMITMENTS view
        *   CAPACITY_COMMITMENT_CHANGES view
        *   RESERVATIONS view
        *   RESERVATION_CHANGES view
        *   RESERVATIONS_TIMELINE view
        
    *   Routines
        
        *   PARAMETERS view
        *   ROUTINES view
        *   ROUTINE_OPTIONS view
        
    *   Search indexes
        
        *   SEARCH_INDEXES view
        *   SEARCH_INDEX_COLUMNS view
        *   SEARCH_INDEX_COLUMN_OPTIONS view
        *   SEARCH_INDEX_OPTIONS view
        *   SEARCH_INDEXES_BY_ORGANIZATION view
        
    *   Sessions
        
        *   SESSIONS_BY_PROJECT view
        *   SESSIONS_BY_USER view
        
    *   Streaming
        
        *   STREAMING_TIMELINE view
        *   STREAMING_TIMELINE_BY_FOLDER view
        *   STREAMING_TIMELINE_BY_ORGANIZATION view
        
    *   Tables
        
        *   COLUMNS view
        *   COLUMN_FIELD_PATHS view
        *   CONSTRAINT_COLUMN_USAGE view
        *   KEY_COLUMN_USAGE view
        *   PARTITIONS view
        *   TABLES view
        *   TABLE_OPTIONS view
        *   TABLE_CONSTRAINTS view
        *   TABLE_SNAPSHOTS view
        *   TABLE_STORAGE view
        *   TABLE_STORAGE_BY_FOLDER view
        *   TABLE_STORAGE_BY_ORGANIZATION view
        *   TABLE_STORAGE_USAGE_TIMELINE view
        *   TABLE_STORAGE_USAGE_TIMELINE_BY_FOLDER view
        *   TABLE_STORAGE_USAGE_TIMELINE_BY_ORGANIZATION view
        
    *   Vector indexes
        
        *   VECTOR_INDEXES view
        *   VECTOR_INDEX_COLUMNS view
        *   VECTOR_INDEX_OPTIONS view
        
    *   Views
        
        *   VIEWS view
        *   MATERIALIZED_VIEWS view
        
    *   Write API
        
        *   WRITE_API_TIMELINE view
        *   WRITE_API_TIMELINE_BY_FOLDER view
        *   WRITE_API_TIMELINE_BY_ORGANIZATION view
        
    
*   Legacy SQL reference
    
    *   Legacy SQL feature availability
    *   Migrating to GoogleSQL
    *   Functions and operators
    *   Data types
    *   Querying nested and repeated fields
    *   User-defined functions
    *   Table decorators
    
*   GQL in BigQuery
    
*   Overview
*   BigQuery Graph and ISO standards
*   Schema statements
    
    *   Overview
    *   CREATE PROPERTY GRAPH statement
    *   DROP PROPERTY GRAPH statement
    
*   Query statements
    
    *   Overview
    *   GQL syntax
    *   Graph clause
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
    
*   Graphs within SQL
    
    *   Overview
    *   GRAPH_EXPAND TVF
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
    *   Logical operators
    *   ALL_DIFFERENT predicate
    *   IS DESTINATION predicate
    *   IS SOURCE predicate
    *   SAME predicate
    
*   Functions
    
    *   Overview
    *   DESTINATION_NODE_ID function
    *   EDGES function
    *   ELEMENT_ID function
    *   IS_FIRST function
    *   LABELS function
    *   NODES function
    *   PATH_FIRST function
    *   PATH_LAST function
    *   PATH_LENGTH function
    *   SOURCE_NODE_ID function
    
*   Conditional expressions
    
    *   Overview
    
*   BigQuery Migration Service
    
*   Migration source reference
    
    *   Amazon Redshift
        
        *   Migration overview
        *   Migrate Amazon Redshift schema and data
        *   Migrate Amazon Redshift schema and data when using a VPC
        *   SQL translation reference
        
    *   Apache Hadoop and Hive
        
        *   Migrate Apache Hive schema and data
        *   Extract metadata from Apache Hive
        *   Migrate permissions from Hadoop
        *   Schedule a Hive Metastore tables transfer
        *   Apache Hive SQL translation reference
        
    *   IBM Netezza
        
        *   Migrate from IBM Netezza
        *   SQL translation reference
        
    *   Oracle
        
        *   Migration guide
        *   SQL translation reference
        
    *   Snowflake
        
        *   Introduction
        *   Schedule a Snowflake transfer
        *   Schema detection and mapping
        *   Configure private connectivity
        *   Configure network policies for Snowflake transfers
        *   Set up incremental transfers
        *   Tutorials
        *   SQL translation reference
        
    *   Teradata
        
        *   Introduction
        *   Migration overview
        *   Migrate Teradata schema and data
        *   Migration tutorial
        *   SQL translation reference
        
    
*   Migrate metadata to Lakehouse Iceberg REST catalog tables
*   BigQuery Data Transfer Service
    
*   Transfer source reference
    
    *   Introduction
    *   Amazon S3
        
        *   Introduction
        *   Schedule transfers
        *   Transfer runtime parameters
        
    *   Azure Blob Storage
        
        *   Introduction
        *   Schedule transfers
        *   Transfer runtime parameters
        
    *   Campaign Manager
        
        *   Schedule transfers
        *   Report transformation
        
    *   Cloud Storage
        
        *   Introduction
        *   Schedule transfers
        *   Transfer runtime parameters
        
    *   Comparison Shopping Service Center
        
        *   Introduction
        *   Schedule transfers
        *   Transfer report schema
        
    *   Display & Video 360
        
        *   Schedule transfers
        *   Report transformation
        
    *   Facebook Ads
        
        *   Schedule transfers
        *   Report transformation
        
    *   Google Ad Manager
        
        *   Schedule transfers
        *   Report transformation
        
    *   Google Ads
        
        *   Schedule transfers
        *   Report transformation
        
    *   Google Analytics 4
        
        *   Schedule transfers
        *   Report transformation
        
    *   Google Merchant Center
        
        *   Introduction
        *   Schedule transfers
        *   Query your data
        *   Migration guides
            
            *   Best sellers
            *   Price competitiveness
            
        *   Transfer report schema
            
            *   Best Sellers table
            *   Local Inventories table
            *   Performance table
            *   Price Competitiveness table
            *   Price Insights table
            *   Product Targeting table
            *   Products table
            *   Regional Inventories table
            
        
    *   Google Play
        
        *   Schedule transfers
        *   Transfer report transformation
        
    *   Hive Metastore
        
        *   Schedule transfers
        
    *   HubSpot
        
        *   Schedule transfers
        
    *   Klaviyo
        
        *   Schedule transfers
        *   Data model reference
        
    *   Mailchimp
        
        *   Schedule transfers
        
    *   Microsoft SQL Server
        
        *   Schedule transfers
        
    *   MySQL
        
        *   Schedule transfers
        
    *   Oracle
        
        *   Schedule transfers
        
    *   PayPal
        
        *   Schedule transfers
        
    *   PostgreSQL
        
        *   Schedule transfers
        
    *   Salesforce
        
        *   Schedule transfers
        
    *   Salesforce Marketing Cloud
        
        *   Schedule transfers
        
    *   Search Ads 360
        
        *   Schedule transfers
        *   Transfer report transformation
        *   Migration guide
        
    *   ServiceNow
        
        *   Schedule transfers
        
    *   Shopify
        
        *   Schedule transfers
        
    *   Stripe
        
        *   Schedule transfers
        
    *   YouTube channel
        
        *   Schedule transfers
        *   Transfer report transformation
        
    *   YouTube content owner
        
        *   Schedule transfers
        *   Transfer report transformation
        
    
*   BigQuery DataFrames Python API
    
*   BigQuery DataFrames
*   BigQuery APIs
    
*   BigQuery API reference
    
    *   BigQuery APIs and libraries overview
    *   BigQuery API reference
        
        *   BigQuery client libraries
        *   BigQuery REST API
        *   REST reference (v2)
            
            *   REST Resources
                
            *   datasets
                
                *   Overview
                *   delete
                *   get
                *   insert
                *   list
                *   patch
                *   undelete
                *   update
                
            *   jobs
                
                *   Overview
                *   cancel
                *   delete
                *   get
                *   getQueryResults
                *   insert
                *   list
                *   query
                
            *   models
                
                *   Overview
                *   delete
                *   get
                *   list
                *   patch
                
            *   projects
                
                *   Overview
                *   getServiceAccount
                *   list
                
            *   routines
                
                *   Overview
                *   delete
                *   get
                *   getIamPolicy
                *   insert
                *   list
                *   setIamPolicy
                *   testIamPermissions
                *   update
                
            *   rowAccessPolicies
                
                *   Overview
                *   batchDelete
                *   delete
                *   get
                *   getIamPolicy
                *   insert
                *   list
                *   testIamPermissions
                *   update
                
            *   tabledata
                
                *   Overview
                *   insertAll
                *   list
                
            *   tables
                
                *   Overview
                *   delete
                *   get
                *   getIamPolicy
                *   insert
                *   list
                *   patch
                *   setIamPolicy
                *   testIamPermissions
                *   update
                
            *   Types
                
            *   ConnectionProperty
            *   DataFormatOptions
            *   DatasetAccessEntry
            *   DmlStats
            *   EncryptionConfiguration
            *   ErrorProto
            *   GetPolicyOptions
            *   Job
            *   JobCreationReason
            *   JobReference
            *   Policy
            *   ProjectReference
            *   QueryParameter
            *   RoundingMode
            *   SessionInfo
            *   StandardSqlDataType
            *   StandardSqlField
            *   TableReference
            *   TargetType
            *   TestIamPermissionsResponse
            *   UpdateMode
            
        *   API uploads
        
    *   BigQuery Data Policy API reference
        
        *   Data Policy REST reference
        *   v1
            
            *   REST Resources
                
            *   projects.locations.dataPolicies
                
                *   Overview
                *   create
                *   delete
                *   get
                *   getIamPolicy
                *   list
                *   patch
                *   rename
                *   setIamPolicy
                *   testIamPermissions
                
            
        *   v1beta1
            
            *   REST Resources
                
            *   projects.locations.dataPolicies
                
                *   Overview
                *   create
                *   delete
                *   get
                *   getIamPolicy
                *   list
                *   patch
                *   setIamPolicy
                *   testIamPermissions
                
            
        *   v2
            
            *   REST Resources
                
            *   projects.locations.dataPolicies
                
                *   Overview
                *   addGrantees
                *   create
                *   delete
                *   get
                *   getIamPolicy
                *   list
                *   patch
                *   removeGrantees
                *   setIamPolicy
                *   testIamPermissions
                
            
        *   v2beta1
            
            *   REST Resources
                
            *   projects.locations.dataPolicies
                
                *   Overview
                *   addGrantees
                *   create
                *   delete
                *   get
                *   getIamPolicy
                *   list
                *   patch
                *   removeGrantees
                *   setIamPolicy
                *   testIamPermissions
                
            
        
    *   BigQuery Connections API reference
        
        *   BigQuery Connection client libraries
        *   BigQuery Connection REST API
        *   RPC reference
            
            *   Overview
            *   google.cloud.bigquery.connection.v1
            *   google.cloud.bigquery.connection.v1beta1
            *   google.iam.v1
            *   google.type
            
        *   REST reference (v1)
            
            *   REST Resources
                
            *   projects.locations.connections
                
                *   Overview
                *   create
                *   delete
                *   get
                *   getIamPolicy
                *   list
                *   patch
                *   setIamPolicy
                *   testIamPermissions
                
            
        *   REST reference (v1beta1)
            
            *   REST Resources
                
            *   projects.locations.connections
                
                *   Overview
                *   create
                *   delete
                *   get
                *   getIamPolicy
                *   list
                *   patch
                *   setIamPolicy
                *   testIamPermissions
                *   updateCredential
                
            
        *   Types
            
        *   AuditConfig
        *   Binding
        *   GetIamPolicyRequest
        *   LogType
        *   Policy
        *   SetIamPolicyRequest
        *   TestIamPermissionsRequest
        *   TestIamPermissionsResponse
        
    *   BigQuery Migration API reference
        
        *   BigQuery Migration client libraries
        *   BigQuery Migration REST API
        *   REST reference (v2)
            
            *   REST Resources
                
            *   projects.locations.workflows
                
                *   Overview
                *   create
                *   delete
                *   get
                *   list
                *   start
                
            *   projects.locations.workflows.subtasks
                
                *   Overview
                *   get
                *   list
                
            *   Types
                
            *   ResourceErrorDetail
            *   TimeSeries
            
        *   REST reference (v2alpha)
            
            *   REST Resources
                
            *   projects.locations.workflows
                
                *   Overview
                *   create
                *   delete
                *   get
                *   list
                *   start
                
            *   projects.locations.workflows.subtasks
                
                *   Overview
                *   get
                *   list
                
            *   Types
                
            *   ResourceErrorDetail
            *   TimeSeries
            
        *   Types
            
        *   Distribution
        *   ErrorInfo
        *   MetricKind
        *   ResourceInfo
        *   ValueType
        *   RPC reference
            
            *   Overview
            *   google.api
            *   google.cloud.bigquery.migration.tasks.assessment.v2alpha
            *   google.cloud.bigquery.migration.tasks.translation.v2alpha
            *   google.cloud.bigquery.migration.v2
            *   google.cloud.bigquery.migration.v2alpha
            *   google.rpc
            
        
    *   BigQuery Storage API reference
        
        *   Storage API client libraries
        *   RPC reference
            
            *   Overview
            *   google.cloud.bigquery.storage.v1
            *   google.cloud.bigquery.storage.v1beta1
            *   google.cloud.bigquery.storage.v1beta2
            *   google.rpc
            
        
    *   BigQuery Reservation API reference
        
        *   BigQuery Reservation API client libraries
        *   BigQuery Reservation REST API
        *   RPC reference
            
            *   Overview
            *   google.cloud.bigquery.reservation.v1
            *   google.iam.v1
            *   google.rpc
            *   google.type
            
        *   REST reference (v1)
            
            *   REST Resources
                
            *   projects.locations
                
                *   Overview
                *   getBiReservation
                *   searchAllAssignments
                *   searchAssignments
                *   updateBiReservation
                
            *   projects.locations.capacityCommitments
                
                *   Overview
                *   create
                *   delete
                *   get
                *   list
                *   merge
                *   patch
                *   split
                
            *   projects.locations.reservationGroups
                
                *   Overview
                *   create
                *   delete
                *   get
                *   list
                
            *   projects.locations.reservations
                
                *   Overview
                *   create
                *   delete
                *   failoverReservation
                *   get
                *   getIamPolicy
                *   list
                *   patch
                *   setIamPolicy
                *   testIamPermissions
                
            *   projects.locations.reservations.assignments
                
                *   Overview
                *   create
                *   delete
                *   getIamPolicy
                *   list
                *   move
                *   patch
                *   setIamPolicy
                *   testIamPermissions
                
            *   Types
                
            *   BiReservation
            *   Edition
            *   GetPolicyOptions
            *   Policy
            *   Status
            *   TestIamPermissionsResponse
            
        *   Types
            
        *   Status
        
    *   BigQuery Analytics Hub API reference
        
        *   Analytics Hub client libraries
        *   Analytics Hub REST API
        *   REST reference (v1)
            
            *   REST Resources
                
            *   organizations.locations.dataExchanges
                
                *   Overview
                *   list
                
            *   projects.locations.dataExchanges
                
                *   Overview
                *   create
                *   delete
                *   get
                *   getIamPolicy
                *   list
                *   listSubscriptions
                *   patch
                *   setIamPolicy
                *   subscribe
                *   testIamPermissions
                
            *   projects.locations.dataExchanges.listings
                
                *   Overview
                *   create
                *   delete
                *   get
                *   getIamPolicy
                *   list
                *   listSubscriptions
                *   patch
                *   setIamPolicy
                *   subscribe
                *   testIamPermissions
                
            *   projects.locations.dataExchanges.queryTemplates
                
                *   Overview
                *   approve
                *   create
                *   delete
                *   get
                *   list
                *   patch
                *   submit
                
            *   projects.locations.subscriptions
                
                *   Overview
                *   delete
                *   get
                *   getIamPolicy
                *   list
                *   refresh
                *   revoke
                *   setIamPolicy
                
            *   Types
                
            *   DiscoveryType
            *   ListSharedResourceSubscriptionsResponse
            *   Operation
            
        *   REST reference (v1beta1)
            
            *   REST Resources
                
            *   organizations.locations.dataExchanges
                
                *   Overview
                *   list
                
            *   projects.locations.dataExchanges
                
                *   Overview
                *   create
                *   delete
                *   get
                *   getIamPolicy
                *   list
                *   patch
                *   setIamPolicy
                *   testIamPermissions
                
            *   projects.locations.dataExchanges.listings
                
                *   Overview
                *   create
                *   delete
                *   get
                *   getIamPolicy
                *   list
                *   patch
                *   setIamPolicy
                *   subscribe
                *   testIamPermissions
                
            
        *   Types
            
        *   AttributeContext
        *   AuditConfig
        *   Binding
        *   DestinationDataset
        *   FederatedAttributeStatus
        *   GetIamPolicyRequest
        *   GetResourceInfoRequest
        *   LogType
        *   MonitoredResource
        *   OperationMetadata
        *   Policy
        *   RefreshSubscriptionResponse
        *   ResourceInfo
        *   SetIamPolicyRequest
        *   SharedResourceType
        *   State
        *   SubscribeDataExchangeResponse
        *   Subscription
        *   TestIamPermissionsRequest
        *   TestIamPermissionsResponse
        
    *   BigQuery Data Transfer Service API reference
        
        *   BigQuery Data Transfer Service client libraries
        *   BigQuery Data Transfer Service REST API
        *   REST reference
            
            *   REST Resources
                
            *   projects
                
                *   Overview
                *   enrollDataSources
                
            *   projects.dataSources
                
                *   Overview
                *   checkValidCreds
                *   get
                *   list
                
            *   projects.locations
                
                *   Overview
                *   enrollDataSources
                *   get
                *   list
                *   unenrollDataSources
                
            *   projects.locations.dataSources
                
                *   Overview
                *   checkValidCreds
                *   get
                *   list
                
            *   projects.locations.transferConfigs
                
                *   Overview
                *   create
                *   delete
                *   get
                *   list
                *   patch
                *   scheduleRuns
                *   startManualRuns
                
            *   projects.locations.transferConfigs.runs
                
                *   Overview
                *   delete
                *   get
                *   list
                
            *   projects.locations.transferConfigs.runs.transferLogs
                
                *   Overview
                *   list
                
            *   projects.locations.transferConfigs.transferResources
                
                *   Overview
                *   get
                *   list
                
            *   projects.transferConfigs
                
                *   Overview
                *   create
                *   delete
                *   get
                *   list
                *   patch
                *   scheduleRuns
                *   startManualRuns
                
            *   projects.transferConfigs.runs
                
                *   Overview
                *   delete
                *   get
                *   list
                
            *   projects.transferConfigs.runs.transferLogs
                
                *   Overview
                *   list
                
            *   projects.transferConfigs.transferResources
                
                *   Overview
                *   get
                *   list
                
            *   Types
                
            *   CheckValidCredsResponse
            *   Code
            *   EmailPreferences
            *   ListDataSourcesResponse
            *   ListTransferConfigsResponse
            *   ListTransferLogsResponse
            *   ListTransferResourcesResponse
            *   ListTransferRunsResponse
            *   RunAttempt
            *   ScheduleTransferRunsResponse
            *   StartManualTransferRunsResponse
            *   Status
            *   TimeRange
            *   TransferState
            
        *   RPC reference
            
            *   Overview
            *   google.cloud.bigquery.datatransfer.v1
            *   google.cloud.location
            *   google.rpc
            
        
    *   API performance tips
    
*   BigQuery MCP reference
    
*   BigQuery MCP reference
    
    *   Overview
    *   Tools
        
        *   list_dataset_ids
        *   get_dataset_info
        *   list_table_ids
        *   get_table_info
        *   execute_sql_readonly
        *   execute_sql
        
    
*   BigQuery Data Transfer Service MCP reference
    
    *   Overview
    *   Tools
        
        *   list_data_sources
        *   get_data_source
        *   create_transfer_config
        *   get_transfer_config
        *   list_transfer_configs
        *   start_manual_transfer_runs
        *   list_transfer_runs
        *   get_transfer_run
        *   check_valid_creds
        
    
*   BigQuery Migration MCP reference
    
    *   Overview
    *   Tools
        
        *   translate_query
        *   get_translation
        *   explain_translation
        *   generate_ddl_suggestion
        *   fetch_ddl_suggestion
        
    
*   BigQuery routines
    
*   System procedures reference
*   System variables reference
*   BigQuery audit logging
    
*   BigQuery Connection API audit logging
*   BigQuery Reservation API audit logging
*   BigQuery audit logging reference
    
    *   Overview
    *   Types
        
    *   AuditData
    *   AuditLogConfig.LogType
    *   BigQueryAuditMetadata
    *   BigQueryAuditMetadata.AccessChange.Action
    *   BigQueryAuditMetadata.AnalyticsHubSubscribeListing.Reason
    *   BigQueryAuditMetadata.ConnectionChange.Reason
    *   BigQueryAuditMetadata.CreateDisposition
    *   BigQueryAuditMetadata.DatasetChange.Reason
    *   BigQueryAuditMetadata.DatasetCreation.Reason
    *   BigQueryAuditMetadata.DatasetDeletion.Reason
    *   BigQueryAuditMetadata.JobConfig.Query.Priority
    *   BigQueryAuditMetadata.JobConfig.Type
    *   BigQueryAuditMetadata.JobDeletion.Reason
    *   BigQueryAuditMetadata.JobInsertion.Reason
    *   BigQueryAuditMetadata.JobState
    *   BigQueryAuditMetadata.ModelCreation.Reason
    *   BigQueryAuditMetadata.ModelDataChange.Reason
    *   BigQueryAuditMetadata.ModelDataRead.Reason
    *   BigQueryAuditMetadata.ModelDeletion.Reason
    *   BigQueryAuditMetadata.ModelMetadataChange.Reason
    *   BigQueryAuditMetadata.OperationType
    *   BigQueryAuditMetadata.QueryStatementType
    *   BigQueryAuditMetadata.RoutineChange.Reason
    *   BigQueryAuditMetadata.RoutineCreation.Reason
    *   BigQueryAuditMetadata.RoutineDeletion.Reason
    *   BigQueryAuditMetadata.SearchIndexChange.Reason
    *   BigQueryAuditMetadata.SearchIndexCreation.Reason
    *   BigQueryAuditMetadata.SearchIndexDeletion.Reason
    *   BigQueryAuditMetadata.TableChange.Reason
    *   BigQueryAuditMetadata.TableCreation.Reason
    *   BigQueryAuditMetadata.TableDataChange.Reason
    *   BigQueryAuditMetadata.TableDataRead.Reason
    *   BigQueryAuditMetadata.TableDeletion.Reason
    *   BigQueryAuditMetadata.UnlinkDataset.Reason
    *   BigQueryAuditMetadata.VectorIndexChange.Reason
    *   BigQueryAuditMetadata.VectorIndexCreation.Reason
    *   BigQueryAuditMetadata.VectorIndexDeletion.Reason
    *   BigQueryAuditMetadata.WriteDisposition
    *   BindingDelta.Action
    *   DatasetAccessEntry
    *   DatasetAccessEntry.TargetType
    *   Expr
    *   JoinRestrictionPolicy.JoinCondition
    *   Policy
    *   RoutineReference
    *   Status
    *   TableReference
    

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
*   Data analytics
*   BigQuery
*   Reference

Send feedback

# MCP Tools Reference: bigquerydatatransfer.googleapis.com Stay organized with collections Save and categorize content based on your preferences.

## Tool: create_transfer_config

Create a transfer configuration.

To create a transfer configuration, do the following:

*   Provide the `required_fields`.
*   Specify how often you want your transfer to run by specifying `schedule_options`
*   Provide the `optional_fields`.
*   If you want to use a service account to create this transfer, provide a `service_account_name`.
*   Check that you have valid credentials by calling `check_valid_creds`:
    
    *   If you do not have valid credentials, do the following:
    *   Find your `client_id` and `data_source_scopes` from your data source definition.
    *   Authorize your data source by navigating to the following link:
    
    ```
    https://bigquery.cloud.google.com/datatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=version_info&client_id=CLIENT_ID&scope=DATA_SOURCE_1%20DATA_SOURCE_2
            
    ```
            
    *   Provide the `version_info`.
    *   If you have valid credentials, then `version_info` is not required.

The following sample demonstrate how to use `curl` to invoke the `create_transfer_config` MCP tool.

Curl Request

                  
curl --location 'https://bigquerydatatransfer.googleapis.com/mcp' \
--header 'content-type: application/json' \
--header 'accept: application/json, text/event-stream' \
--data '{
  "method": "tools/call",
  "params": {
    "name": "create_transfer_config",
    "arguments": {
      // provide these details according to the tool's MCP specification
    }
  },
  "jsonrpc": "2.0",
  "id": 1
}'
                

## Input Schema

Request for creating a transfer configuration.

The only supported data sources are:

*   Campaign Manager (`data_source_id`: `dcm_dt`)
*   Cloud Storage (`data_source_id`: `google_cloud_storage`)
*   Comparison Shopping Service (CSS) Center (`data_source_id`: `css_center`)
*   Dataset Copies (`data_source_id`: `cross_region_copy`)
*   Display & Video 360 (`data_source_id`: `displayvideo`)
*   Google Ad Manager (`data_source_id`: `dfp_dt`)
*   Google Ads (`data_source_id`: `google_ads`)
*   Google Analytics 4 (`data_source_id`: `ga4`)
*   Google Merchant Center (`data_source_id`: `merchant_center`)
*   Google Play (`data_source_id`: `play`)
*   Scheduled Queries (`data_source_id`: `scheduled_query`)
*   Search Ads 360 (`data_source_id`: `search_ads`)
*   YouTube Channel (`data_source_id`: `youtube_channel`)
*   YouTube Content Owner (`data_source_id`: `youtube_content_owner`)

### CreateTransferConfigRequest

JSON representation

{
  "dataSource": enum (`DataSource`),
  "projectId": string,
  "location": string,
  "displayName": string,
  "destinationDatasetId": string,
  "params": {
    object
  },
  "scheduleOptions": {
    object (`ScheduleOptionsV2`)
  },
  "notificationPubsubTopic": string,
  "emailPreferences": {
    object (`EmailPreferences`)
  },

  // Union field `authorization` can be only one of the following:
  "versionInfo": string,
  "serviceAccountName": string
  // End of list of possible types for union field `authorization`.
}

 

Fields

`dataSource`

``enum (`DataSource`)``

Required. Data source.

`projectId`

`string`

Required. Project ID or project number of the transfer config.

`location`

`string`

Required. Location of the transfer config. If specified location and location of the destination bigquery dataset do not match - the request will fail.

`displayName`

`string`

Required. Display name of the transfer config.

`destinationDatasetId`

`string`

Required. Destination dataset ID of the transfer config where data will be loaded.

`params`

``object (`Struct` format)``

Required. Data source parameters for the transfer config.

`scheduleOptions`

``object (`ScheduleOptionsV2`)``

Optional. Schedule options for the transfer config. If not specified, the transfer config will be created with its default schedule defined in the data source definition.

`notificationPubsubTopic`

`string`

Pub/Sub topic where notifications will be sent after transfer runs associated with this transfer config finish.

The format for specifying a pubsub topic is: `projects/{project_id}/topics/{topic_id}`

`emailPreferences`

``object (`EmailPreferences`)``

Email notifications will be sent according to these preferences to the email address of the user who owns this transfer config.

Union field `authorization`. Authorization for the transfer config. `authorization` can be only one of the following:

`versionInfo`

`string`

This is required only if new credentials are needed, as indicated by `CheckValidCreds`. In order to obtain version info, make a request to the following URL:

https://bigquery.cloud.google.com/datatransfer/oauthz/auth?redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=version_info&client_id=client_id&scope=data_source_scopes

*   The client_id is the OAuth client_id of the data source as returned by GetDataSource method.
*   data_source_scopes are the scopes returned by GetDataSource method.

Note that this should not be set when `service_account_name` is used to create the transfer config.

`serviceAccountName`

`string`

Optional service account email. If this field is set, the transfer config will be created with this service account's credentials. It requires that the requesting user calling this API has permissions to act as this service account.

### Struct

JSON representation

{
  "fields": {
    string: value,
    ...
  }
}

 

Fields

`fields`

``map (key: string, value: value (`Value` format))``

Unordered map of dynamically typed values.

An object containing a list of `"key": value` pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`.

### FieldsEntry

JSON representation

{
  "key": string,
  "value": value
}

 

Fields

`key`

`string`

`value`

``value (`Value` format)``

### Value

JSON representation

{

  // Union field `kind` can be only one of the following:
  "nullValue": null,
  "numberValue": number,
  "stringValue": string,
  "boolValue": boolean,
  "structValue": {
    object
  },
  "listValue": array
  // End of list of possible types for union field `kind`.
}

 

Fields

Union field `kind`. The kind of value. `kind` can be only one of the following:

`nullValue`

`null`

Represents a JSON `null`.

`numberValue`

`number`

Represents a JSON number. Must not be `NaN`, `Infinity` or `-Infinity`, since those are not supported in JSON. This also cannot represent large Int64 values, since JSON format generally does not support them in its number type.

`stringValue`

`string`

Represents a JSON string.

`boolValue`

`boolean`

Represents a JSON boolean (`true` or `false` literal in JSON).

`structValue`

``object (`Struct` format)``

Represents a JSON object.

`listValue`

``array (`ListValue` format)``

Represents a JSON array.

### ListValue

JSON representation

{
  "values": [
    value
  ]
}

 

Fields

`values[]`

``value (`Value` format)``

Repeated field of dynamically typed values.

### ScheduleOptionsV2

JSON representation

{

  // Union field `schedule` can be only one of the following:
  "timeBasedSchedule": {
    object (`TimeBasedSchedule`)
  },
  "manualSchedule": {
    object (`ManualSchedule`)
  },
  "eventDrivenSchedule": {
    object (`EventDrivenSchedule`)
  }
  // End of list of possible types for union field `schedule`.
}

 

Fields

Union field `schedule`. Data transfer schedules. `schedule` can be only one of the following:

`timeBasedSchedule`

``object (`TimeBasedSchedule`)``

Time based transfer schedule options. This is the default schedule option.

`manualSchedule`

``object (`ManualSchedule`)``

Manual transfer schedule. If set, the transfer run will not be auto-scheduled by the system, unless the client invokes StartManualTransferRuns. This is equivalent to disable_auto_scheduling = true.

`eventDrivenSchedule`

``object (`EventDrivenSchedule`)``

Event driven transfer schedule options. If set, the transfer will be scheduled upon events arrial.

### TimeBasedSchedule

JSON representation

{
  "schedule": string,
  "startTime": string,
  "endTime": string
}

 

Fields

`schedule`

`string`

Data transfer schedule. If the data source does not support a custom schedule, this should be empty. If it is empty, the default value for the data source will be used. The specified times are in UTC. Examples of valid format: `1st,3rd monday of month 15:30`, `every wed,fri of jan,jun 13:15`, and `first sunday of quarter 00:00`. See more explanation about the format here: https://cloud.google.com/appengine/docs/flexible/python/scheduling-jobs-with-cron-yaml#the_schedule_format

NOTE: The minimum interval time between recurring transfers depends on the data source; refer to the documentation for your data source.

`startTime`

``string (`Timestamp` format)``

Specifies time to start scheduling transfer runs. The first run will be scheduled at or after the start time according to a recurrence pattern defined in the schedule string. The start time can be changed at any moment.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`endTime`

``string (`Timestamp` format)``

Defines time to stop scheduling transfer runs. A transfer run cannot be scheduled at or after the end time. The end time can be changed at any moment.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

### Timestamp

JSON representation

{
  "seconds": string,
  "nanos": integer
}

 

Fields

`seconds`

`string (int64 format)`

Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. Must be between -62135596800 and 253402300799 inclusive (which corresponds to 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z).

`nanos`

`integer`

Non-negative fractions of a second at nanosecond resolution. This field is the nanosecond portion of the duration, not an alternative to seconds. Negative second values with fractions must still have non-negative nanos values that count forward in time. Must be between 0 and 999,999,999 inclusive.

### EventDrivenSchedule

JSON representation

{

  // Union field `eventStream` can be only one of the following:
  "pubsubSubscription": string
  // End of list of possible types for union field `eventStream`.
}

 

Fields

Union field `eventStream`. The event stream which specifies the Event-driven transfer options. Event-driven transfers listen to an event stream to transfer data. `eventStream` can be only one of the following:

`pubsubSubscription`

`string`

Pub/Sub subscription name used to receive events. Only Google Cloud Storage data source support this option. Format: projects/{project}/subscriptions/{subscription}

### EmailPreferences

JSON representation

{
  "enableFailureEmail": boolean
}

 

Fields

`enableFailureEmail`

`boolean`

If true, email notifications will be sent on transfer run failures.

## Output Schema

Represents a data transfer configuration. A transfer configuration contains all metadata needed to perform a data transfer. For example, `destination_dataset_id` specifies where data should be stored. When a new transfer configuration is created, the specified `destination_dataset_id` is created when needed and shared with the appropriate data source service account.

### TransferConfig

JSON representation

{
  "name": string,
  "displayName": string,
  "dataSourceId": string,
  "params": {
    object
  },
  "schedule": string,
  "scheduleOptions": {
    object (`ScheduleOptions`)
  },
  "scheduleOptionsV2": {
    object (`ScheduleOptionsV2`)
  },
  "dataRefreshWindowDays": integer,
  "disabled": boolean,
  "updateTime": string,
  "nextRunTime": string,
  "state": enum (`TransferState`),
  "userId": string,
  "datasetRegion": string,
  "notificationPubsubTopic": string,
  "emailPreferences": {
    object (`EmailPreferences`)
  },
  "encryptionConfiguration": {
    object (`EncryptionConfiguration`)
  },
  "error": {
    object (`Status`)
  },
  "managedTableType": enum (`ManagedTableType`),

  // Union field `destination` can be only one of the following:
  "destinationDatasetId": string
  // End of list of possible types for union field `destination`.

  // Union field `_owner_info` can be only one of the following:
  "ownerInfo": {
    object (`UserInfo`)
  }
  // End of list of possible types for union field `_owner_info`.
}

 

Fields

`name`

`string`

Identifier. The resource name of the transfer config. Transfer config names have the form either `projects/{project_id}/locations/{region}/transferConfigs/{config_id}` or `projects/{project_id}/transferConfigs/{config_id}`, where `config_id` is usually a UUID, even though it is not guaranteed or required. The name is ignored when creating a transfer config.

`displayName`

`string`

User specified display name for the data transfer.

`dataSourceId`

`string`

Data source ID. This cannot be changed once data transfer is created. The full list of available data source IDs can be returned through an API call: https://cloud.google.com/bigquery-transfer/docs/reference/datatransfer/rest/v1/projects.locations.dataSources/list

`params`

``object (`Struct` format)``

Parameters specific to each data source. For more information see the bq tab in the 'Setting up a data transfer' section for each data source. For example the parameters for Cloud Storage transfers are listed here: https://cloud.google.com/bigquery-transfer/docs/cloud-storage-transfer#bq

`schedule`

`string`

Data transfer schedule. If the data source does not support a custom schedule, this should be empty. If it is empty, the default value for the data source will be used. The specified times are in UTC. Examples of valid format: `1st,3rd monday of month 15:30`, `every wed,fri of jan,jun 13:15`, and `first sunday of quarter 00:00`. See more explanation about the format here: https://cloud.google.com/appengine/docs/flexible/python/scheduling-jobs-with-cron-yaml#the_schedule_format

NOTE: The minimum interval time between recurring transfers depends on the data source; refer to the documentation for your data source.

`scheduleOptions`

``object (`ScheduleOptions`)``

Options customizing the data transfer schedule.

`scheduleOptionsV2`

``object (`ScheduleOptionsV2`)``

Options customizing different types of data transfer schedule. This field replaces "schedule" and "schedule_options" fields. ScheduleOptionsV2 cannot be used together with ScheduleOptions/Schedule.

`dataRefreshWindowDays`

`integer`

The number of days to look back to automatically refresh the data. For example, if `data_refresh_window_days = 10`, then every day BigQuery reingests data for [today-10, today-1], rather than ingesting data for just [today-1]. Only valid if the data source supports the feature. Set the value to 0 to use the default value.

`disabled`

`boolean`

Is this config disabled. When set to true, no runs will be scheduled for this transfer config.

`updateTime`

``string (`Timestamp` format)``

Output only. Data transfer modification time. Ignored by server on input.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`nextRunTime`

``string (`Timestamp` format)``

Output only. Next time when data transfer will run.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`state`

``enum (`TransferState`)``

Output only. State of the most recently updated transfer run.

`userId`

`string (int64 format)`

Deprecated. Unique ID of the user on whose behalf transfer is done.

`datasetRegion`

`string`

Output only. Region in which BigQuery dataset is located.

`notificationPubsubTopic`

`string`

Pub/Sub topic where notifications will be sent after transfer runs associated with this transfer config finish.

The format for specifying a pubsub topic is: `projects/{project_id}/topics/{topic_id}`

`emailPreferences`

``object (`EmailPreferences`)``

Email notifications will be sent according to these preferences to the email address of the user who owns this transfer config.

`encryptionConfiguration`

``object (`EncryptionConfiguration`)``

The encryption configuration part. Currently, it is only used for the optional KMS key name. The BigQuery service account of your project must be granted permissions to use the key. Read methods will return the key name applied in effect. Write methods will apply the key if it is present, or otherwise try to apply project default keys if it is absent.

`error`

``object (`Status`)``

Output only. Error code with detailed information about reason of the latest config failure.

`managedTableType`

``enum (`ManagedTableType`)``

The classification of the destination table.

Union field `destination`. The destination of the transfer config. `destination` can be only one of the following:

`destinationDatasetId`

`string`

The BigQuery target dataset id.

Union field `_owner_info`.

`_owner_info` can be only one of the following:

`ownerInfo`

``object (`UserInfo`)``

Output only. Information about the user whose credentials are used to transfer data. Populated only for `transferConfigs.get` requests. In case the user information is not available, this field will not be populated.

### Struct

JSON representation

{
  "fields": {
    string: value,
    ...
  }
}

 

Fields

`fields`

``map (key: string, value: value (`Value` format))``

Unordered map of dynamically typed values.

An object containing a list of `"key": value` pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`.

### FieldsEntry

JSON representation

{
  "key": string,
  "value": value
}

 

Fields

`key`

`string`

`value`

``value (`Value` format)``

### Value

JSON representation

{

  // Union field `kind` can be only one of the following:
  "nullValue": null,
  "numberValue": number,
  "stringValue": string,
  "boolValue": boolean,
  "structValue": {
    object
  },
  "listValue": array
  // End of list of possible types for union field `kind`.
}

 

Fields

Union field `kind`. The kind of value. `kind` can be only one of the following:

`nullValue`

`null`

Represents a JSON `null`.

`numberValue`

`number`

Represents a JSON number. Must not be `NaN`, `Infinity` or `-Infinity`, since those are not supported in JSON. This also cannot represent large Int64 values, since JSON format generally does not support them in its number type.

`stringValue`

`string`

Represents a JSON string.

`boolValue`

`boolean`

Represents a JSON boolean (`true` or `false` literal in JSON).

`structValue`

``object (`Struct` format)``

Represents a JSON object.

`listValue`

``array (`ListValue` format)``

Represents a JSON array.

### ListValue

JSON representation

{
  "values": [
    value
  ]
}

 

Fields

`values[]`

``value (`Value` format)``

Repeated field of dynamically typed values.

### ScheduleOptions

JSON representation

{
  "disableAutoScheduling": boolean,
  "startTime": string,
  "endTime": string
}

 

Fields

`disableAutoScheduling`

`boolean`

If true, automatic scheduling of data transfer runs for this configuration will be disabled. The runs can be started on ad-hoc basis using StartManualTransferRuns API. When automatic scheduling is disabled, the TransferConfig.schedule field will be ignored.

`startTime`

``string (`Timestamp` format)``

Specifies time to start scheduling transfer runs. The first run will be scheduled at or after the start time according to a recurrence pattern defined in the schedule string. The start time can be changed at any moment. The time when a data transfer can be triggered manually is not limited by this option.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`endTime`

``string (`Timestamp` format)``

Defines time to stop scheduling transfer runs. A transfer run cannot be scheduled at or after the end time. The end time can be changed at any moment. The time when a data transfer can be triggered manually is not limited by this option.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

### Timestamp

JSON representation

{
  "seconds": string,
  "nanos": integer
}

 

Fields

`seconds`

`string (int64 format)`

Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. Must be between -62135596800 and 253402300799 inclusive (which corresponds to 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z).

`nanos`

`integer`

Non-negative fractions of a second at nanosecond resolution. This field is the nanosecond portion of the duration, not an alternative to seconds. Negative second values with fractions must still have non-negative nanos values that count forward in time. Must be between 0 and 999,999,999 inclusive.

### ScheduleOptionsV2

JSON representation

{

  // Union field `schedule` can be only one of the following:
  "timeBasedSchedule": {
    object (`TimeBasedSchedule`)
  },
  "manualSchedule": {
    object (`ManualSchedule`)
  },
  "eventDrivenSchedule": {
    object (`EventDrivenSchedule`)
  }
  // End of list of possible types for union field `schedule`.
}

 

Fields

Union field `schedule`. Data transfer schedules. `schedule` can be only one of the following:

`timeBasedSchedule`

``object (`TimeBasedSchedule`)``

Time based transfer schedule options. This is the default schedule option.

`manualSchedule`

``object (`ManualSchedule`)``

Manual transfer schedule. If set, the transfer run will not be auto-scheduled by the system, unless the client invokes StartManualTransferRuns. This is equivalent to disable_auto_scheduling = true.

`eventDrivenSchedule`

``object (`EventDrivenSchedule`)``

Event driven transfer schedule options. If set, the transfer will be scheduled upon events arrial.

### TimeBasedSchedule

JSON representation

{
  "schedule": string,
  "startTime": string,
  "endTime": string
}

 

Fields

`schedule`

`string`

Data transfer schedule. If the data source does not support a custom schedule, this should be empty. If it is empty, the default value for the data source will be used. The specified times are in UTC. Examples of valid format: `1st,3rd monday of month 15:30`, `every wed,fri of jan,jun 13:15`, and `first sunday of quarter 00:00`. See more explanation about the format here: https://cloud.google.com/appengine/docs/flexible/python/scheduling-jobs-with-cron-yaml#the_schedule_format

NOTE: The minimum interval time between recurring transfers depends on the data source; refer to the documentation for your data source.

`startTime`

``string (`Timestamp` format)``

Specifies time to start scheduling transfer runs. The first run will be scheduled at or after the start time according to a recurrence pattern defined in the schedule string. The start time can be changed at any moment.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`endTime`

``string (`Timestamp` format)``

Defines time to stop scheduling transfer runs. A transfer run cannot be scheduled at or after the end time. The end time can be changed at any moment.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

### EventDrivenSchedule

JSON representation

{

  // Union field `eventStream` can be only one of the following:
  "pubsubSubscription": string
  // End of list of possible types for union field `eventStream`.
}

 

Fields

Union field `eventStream`. The event stream which specifies the Event-driven transfer options. Event-driven transfers listen to an event stream to transfer data. `eventStream` can be only one of the following:

`pubsubSubscription`

`string`

Pub/Sub subscription name used to receive events. Only Google Cloud Storage data source support this option. Format: projects/{project}/subscriptions/{subscription}

### EmailPreferences

JSON representation

{
  "enableFailureEmail": boolean
}

 

Fields

`enableFailureEmail`

`boolean`

If true, email notifications will be sent on transfer run failures.

### UserInfo

JSON representation

{

  // Union field `_email` can be only one of the following:
  "email": string
  // End of list of possible types for union field `_email`.
}

 

Fields

Union field `_email`.

`_email` can be only one of the following:

`email`

`string`

E-mail address of the user.

### EncryptionConfiguration

JSON representation

{
  "kmsKeyName": string
}

 

Fields

`kmsKeyName`

`string`

The name of the KMS key used for encrypting BigQuery data.

### StringValue

JSON representation

{
  "value": string
}

 

Fields

`value`

`string`

The string value.

### Status

JSON representation

{
  "code": integer,
  "message": string,
  "details": [
    {
      "@type": string,
      field1: ...,
      ...
    }
  ]
}

 

Fields

`code`

`integer`

The status code, which should be an enum value of `google.rpc.Code`.

`message`

`string`

A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the `google.rpc.Status.details` field, or localized by the client.

`details[]`

`object`

A list of messages that carry the error details. There is a common set of message types for APIs to use.

An object containing fields of an arbitrary type. An additional field `"@type"` contains a URI identifying the type. Example: `{ "id": 1234, "@type": "types.example.com/standard/id" }`.

### Any

JSON representation

{
  "typeUrl": string,
  "value": string
}

 

Fields

`typeUrl`

`string`

Identifies the type of the serialized Protobuf message with a URI reference consisting of a prefix ending in a slash and the fully-qualified type name.

Example: type.googleapis.com/google.protobuf.StringValue

This string must contain at least one `/` character, and the content after the last `/` must be the fully-qualified name of the type in canonical form, without a leading dot. Do not write a scheme on these URI references so that clients do not attempt to contact them.

The prefix is arbitrary and Protobuf implementations are expected to simply strip off everything up to and including the last `/` to identify the type. `type.googleapis.com/` is a common default prefix that some legacy implementations require. This prefix does not indicate the origin of the type, and URIs containing it are not expected to respond to any requests.

All type URL strings must be legal URI references with the additional restriction (for the text format) that the content of the reference must consist only of alphanumeric characters, percent-encoded escapes, and characters in the following set (not including the outer backticks): `/-.~_!$&()*+,;=`. Despite our allowing percent encodings, implementations should not unescape them to prevent confusion with existing parsers. For example, `type.googleapis.com%2FFoo` should be rejected.

In the original design of `Any`, the possibility of launching a type resolution service at these type URLs was considered but Protobuf never implemented one and considers contacting these URLs to be problematic and a potential security issue. Do not attempt to contact type URLs.

`value`

`string (bytes format)`

Holds a Protobuf serialization of the type described by type_url.

A base64-encoded string.

### Tool Annotations

Destructive Hint: ❌ | Idempotent Hint: ❌ | Read Only Hint: ❌ | Open World Hint: ❌

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-03-25 UTC.

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