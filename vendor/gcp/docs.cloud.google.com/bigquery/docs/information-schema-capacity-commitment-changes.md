# CAPACITY_COMMITMENT_CHANGES view

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
*   Español
*   Español – América Latina
*   Français
*   Indonesia
*   Italiano
*   Português
*   Português – Brasil
*   עברית
*   中文 – 简体
*   中文 – 繁體
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

Send feedback Stay organized with collections Save and categorize content based on your preferences.

# CAPACITY_COMMITMENT_CHANGES view

The `INFORMATION_SCHEMA.CAPACITY_COMMITMENT_CHANGES` view contains a near real-time list of all changes to capacity commitments within the administration project. Each row represents a single change to a single capacity commitment. For more information, see Slot commitments.

**Note:** The view names `INFORMATION_SCHEMA.CAPACITY_COMMITMENT_CHANGES` and `INFORMATION_SCHEMA.CAPACITY_COMMITMENT_CHANGES_BY_PROJECT` are synonymous and can be used interchangeably.

## Required permission

To query the `INFORMATION_SCHEMA.CAPACITY_COMMITMENT_CHANGES` view, you need the `bigquery.capacityCommitments.list` Identity and Access Management (IAM) permission for the project. Each of the following predefined IAM roles includes the required permission:

*   `roles/bigquery.resourceAdmin`
*   `roles/bigquery.resourceEditor`
*   `roles/bigquery.resourceViewer`
*   `roles/bigquery.user`
*   `roles/bigquery.admin`

For more information about BigQuery permissions, see Access control with IAM.

## Schema

The `INFORMATION_SCHEMA.CAPACITY_COMMITMENT_CHANGES` view has the following schema:

Column name

Data type

Value

`change_timestamp`

`TIMESTAMP`

Time when the change occurred.

`project_id`

`STRING`

ID of the administration project.

`project_number`

`INTEGER`

Number of the administration project.

`capacity_commitment_id`

`STRING`

ID that uniquely identifies the capacity commitment.

`commitment_plan`

`STRING`

Commitment plan of the capacity commitment.

`state`

`STRING`

State the capacity commitment is in. Can be `PENDING` or `ACTIVE`.

`slot_count`

`INTEGER`

Slot count associated with the capacity commitment.

`action`

`STRING`

Type of event that occurred with the capacity commitment. Can be `CREATE`, `UPDATE`, or `DELETE`.

`user_email`

`STRING`

Email address of the user or subject of the workforce identity federation that made the change. `google` for changes made by Google. `NULL` if the email address is unknown.

`commitment_start_time`

`TIMESTAMP`

The start of the current commitment period. Only applicable for `ACTIVE` capacity commitments, otherwise this is `NULL`.

`commitment_end_time`

`TIMESTAMP`

The end of the current commitment period. Only applicable for `ACTIVE` capacity commitments, otherwise this is `NULL`.

`failure_status`

`RECORD`

For a `FAILED` commitment plan, provides the failure reason, otherwise this is `NULL`. `RECORD` consists of `code` and `message`.

`renewal_plan`

`STRING`

The plan this capacity commitment is converted to after `commitment_end_time` passes. After the plan is changed, the committed period is extended according to the commitment plan. Only applicable for `ANNUAL` and `TRIAL` commitments, otherwise this is `NULL`.

`edition`

`STRING`

The edition associated with this reservation. For more information about editions, see Introduction to BigQuery editions.

`is_flat_rate`

`BOOL`

Whether the commitment is associated with the legacy flat-rate capacity model or an edition. If `FALSE`, the current commitment is associated with an edition. If `TRUE`, the commitment is the legacy flat-rate capacity model.

For stability, we recommend that you explicitly list columns in your information schema queries instead of using a wildcard (`SELECT *`). Explicitly listing columns prevents queries from breaking if the underlying schema changes.

## Data retention

This view contains current capacity commitments and the deleted capacity commitments that are kept for a maximum of 41 days after which they are removed from the view.

## Scope and syntax

Queries against this view must include a region qualifier. If you don't specify a regional qualifier, metadata is retrieved from all regions. The following table explains the region scope for this view:

View name

Resource scope

Region scope

``[PROJECT_ID.]`region-REGION`.INFORMATION_SCHEMA.CAPACITY_COMMITMENT_CHANGES[_BY_PROJECT]``

Project level

`REGION`

Replace the following:

*   Optional: `PROJECT_ID`: the ID of your Google Cloud project. If not specified, the default project is used.
*   `REGION`: any dataset region name. For example, `` `region-us` ``.
    
    **Note:** You must use a region qualifier to query `INFORMATION_SCHEMA` views. The location of the query execution must match the region of the `INFORMATION_SCHEMA` view.
    

## Example

The following query displays the user who has made the latest capacity commitment update to the current project within the specified date.

SELECT
  user_email,
  change_timestamp
FROM
  `region-us`.INFORMATION_SCHEMA.CAPACITY_COMMITMENT_CHANGES
WHERE
  change_timestamp BETWEEN '2021-09-30' AND '2021-10-01'
ORDER BY
  change_timestamp DESC
LIMIT 1;

The result is similar to the following:

+--------------------------------+-------------------------+
|           user_email           |     change_timestamp    |
+--------------------------------+-------------------------+
|     222larabrown@gmail.com     | 2021-09-30 09:30:00 UTC |
+--------------------------------+-------------------------+

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-06-11 UTC.

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
*   Español
*   Español – América Latina
*   Français
*   Indonesia
*   Italiano
*   Português
*   Português – Brasil
*   עברית
*   中文 – 简体
*   中文 – 繁體
*   日本語
*   한국어