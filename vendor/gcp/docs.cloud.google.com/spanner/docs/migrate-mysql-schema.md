# Migrate a schema from MySQL

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Spanner
*   Guides

Send feedback

# Migrate a schema from MySQL Stay organized with collections Save and categorize content based on your preferences.

This page shows how to migrate your MySQL schema to Spanner schema. We recommend using the Spanner migration tool for building a Spanner schema from an existing MySQL schema. The tool maps most of the MySQL data types to Spanner types, and highlight choices and provide suggestions to avoid potential migration issues.

## Data type comparison

Map the following list of MySQL data types to their Spanner equivalent:

MySQL data type

Spanner equivalent

Notes

`INTEGER`, `INT`, `BIGINT`, `MEDIUMINT`, `SMALLINT`, `TINYINT`

`INT64`

`TINYINT`, `BOOL`, `BOOLEAN`,

`BOOLEAN`

`TINYINT(1)` values are used to represent boolean values of 'true' (nonzero) or 'false' (0).

`BIT`

`BOOLEAN`, `INT64`

`CHAR`, `VARCHAR`, `TINYTEXT`, `TEXT`, `MEDIUMTEXT`, `LONGTEXT`

`STRING`

Spanner uses Unicode UTF8 strings throughout and doesn't have configurable collations.  
`VARCHAR` supports a maximum length of 65,535 bytes, while Spanner supports up to 2,621,440 characters.

`FLOAT`

`FLOAT32`

`DOUBLE`

`FLOAT64`

`DECIMAL`, `NUMERIC`

`NUMERIC`

In MySQL, the `NUMERIC` and `DECIMAL` data types support up to a total 65 digits of precision and scale, as defined in the column declaration. The Spanner `NUMERIC` data type supports up to 38 digits of precision and 9 decimal digits of scale.  
If you require greater precision, see Store arbitrary precision numeric data for alternative mechanisms.

`BINARY`, `VARBINARY`, `TINYBLOB`, `BLOB`, `MEDIUMBLOB`, `LONGBLOB`

`BYTES`

Small objects (less than 10 MiB) can be stored as `BYTES`. Consider using alternative Google Cloud offerings such as Cloud Storage to store larger objects.

`DATE`

`DATE`

Both Spanner and MySQL use the '`yyyy-mm-dd`' format for dates, so no transformation is necessary. SQL functions are provided to convert dates to a formatted string.

`DATETIME`, `TIMESTAMP`

`TIMESTAMP`

Spanner stores time independent of time zone. If you need to store a time zone, you must use a separate `STRING` column. SQL functions are provided to convert timestamps to a formatted string using time zones.

`TEXT`, `TINYTEXT`, `ENUM`

`STRING`

Small `TEXT` values (less than 10 MiB) can be stored as `STRING`. Consider using alternative Google Cloud offerings such as Cloud Storage to support larger `TEXT` values.

`ENUM`

`STRING`

Validation of `ENUM` values must be performed in the application.

`SET`

`ARRAY<STRING>`

Validation of `SET` element values must be performed in the application.

`LONGBLOB`, `MEDIUMBLOB`

`BYTES` or `STRING` containing URI to object.

Small objects (less than 10 MiB) can be stored as `BYTES`. Consider using alternative Google Cloud offerings such as Cloud Storage to store larger objects.

`LONGTEXT`, `MEDIUMTEXT`

`STRING` (either containing data or URI to external object)

Small objects (less than 2,621,440 characters) can be stored as `STRING`. Consider using alternative Google Cloud offerings such as Cloud Storage to store larger objects.

`JSON`

`JSON`

Small JSON strings (less than 2,621,440 characters) can be stored as `JSON`. Consider using alternative Google Cloud offerings such as Cloud Storage to store larger objects.

`GEOMETRY`, `POINT`, `LINESTRING`, `POLYGON`, `MULTIPOINT`, `MULTIPOLYGON`, `GEOMETRYCOLLECTION`

`STRING`, `ARRAY`

Spanner doesn't support geospatial data types. You must store this data using standard data types, and implement any searching or filtering logic in the application.

In many cases, multiple MySQL types map into a single Spanner type. This is because MySQL has a set of types for the same concept that have different length limits, and in Spanner there is one overall type that has a single, relatively large limit.

Consider the following examples:

*   MySQL has `TEXT`, `TINYTEXT`, `MEDIUMTEXT`, `LONGTEXT`. In Spanner, there is a single type `STRING` with a character-length parameter that can be set to any value up to 2,621,440 characters.
    
*   MySQL has `INTEGER`, `INT`, `BIGINT`, `MEDIUMINT`, `SMALLINT` and `TINYINT`. Spanner has a single type `INT64` that stores 8-byte signed integer values. The main difference is that Spanner's `INT64` consumes more storage than `MEDIUMINT`, `SMALLINT` and `TINYINT`. In addition, `INT64` doesn't capture the range limitations of `MEDIUMINT`, `SMALLINT` and `TINYINT`, although these can be enforced by adding `CHECK` constraints.
    

Spanner doesn't support geospatial types. You can store values of these types by encoding them as strings, bytes, or arrays. Any filtering, operations, and functions must be performed at the application level.

## Queries

Spanner uses the ANSI 2011 dialect of SQL with extensions, and has many functions and operators to help translate and aggregate your data. Any SQL queries using MySQL-specific dialect, functions, and types need to be converted to be compatible with Spanner.

Although Spanner doesn't support structured data as column definitions, you can use structured data in SQL queries using `ARRAY<>` and `STRUCT<>` types. For example, you can write a query that returns all Albums for an artist using an `ARRAY` of `STRUCT`s (taking advantage of the pre-joined data). For more information see the Subqueries section of the documentation.

You can run SQL queries on the Spanner Studio page in the Google Cloud console. In general, queries that perform full table scans on large tables are very expensive, and should be used sparingly. For more information on optimizing SQL queries, see the SQL best practices documentation.

## Stored procedures and triggers

Spanner doesn't support running user code at the database level. As part of the schema migration, move the stored procedures and business logic triggers that you implemented at the MySQL database-level into your application.

## Sequences

Spanner recommends using UUID Version 4 as the default method to generate primary key values. The `GENERATE_UUID()` function returns UUID Version 4 values represented as `STRING` type.

If you need to generate integer values, Spanner supports bit-reversed positive sequences, which produce values that distribute evenly across the positive 64-bit number space. You can use these numbers to avoid hot spotting issues.

For more information, see primary key default value strategies.

## What's next

*   Use SMT to migrate schema from MySQL.

Send feedback