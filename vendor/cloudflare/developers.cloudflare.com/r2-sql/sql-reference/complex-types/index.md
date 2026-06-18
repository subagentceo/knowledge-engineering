---
title: Complex types
description: Reference for querying struct, array, and map column types in R2 SQL.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2-sql/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Complex types

R2 SQL supports querying struct, array, and map column types stored in Iceberg tables. This page covers access patterns, supported functions, and examples for each type.

---

## Structs

Struct columns contain named fields. Access fields using bracket notation or the `get_field()` function.

### Bracket notation

```

SELECT pricing['price'] AS price,

       pricing['discount_percent'] AS discount

FROM my_namespace.products

LIMIT 5


```

### get\_field function

```

SELECT get_field(pricing, 'price') AS price,

       get_field(pricing, 'discount_percent') AS discount

FROM my_namespace.products

LIMIT 5


```

### Struct fields in WHERE

```

SELECT customer_id, pricing['price'] AS price

FROM my_namespace.products

WHERE pricing['price'] > 50

LIMIT 10


```

### Struct fields in ORDER BY

```

SELECT customer_id, pricing['price'] AS price

FROM my_namespace.products

WHERE pricing['price'] IS NOT NULL

ORDER BY pricing['price'] DESC

LIMIT 10


```

### Struct fields in GROUP BY

```

SELECT platforms['windows'] AS windows_support,

       COUNT(*) AS product_count,

       AVG(pricing['price']) AS avg_price

FROM my_namespace.products

WHERE pricing['price'] IS NOT NULL

GROUP BY platforms['windows']


```

### Creating structs inline

```

-- named_struct creates a struct with named fields

SELECT named_struct('id', customer_id, 'amount', total_amount) AS info

FROM my_namespace.sales_data

WHERE total_amount IS NOT NULL

LIMIT 1


-- struct creates a struct with positional fields

SELECT struct(customer_id, total_amount, region) AS info

FROM my_namespace.sales_data

WHERE total_amount IS NOT NULL

LIMIT 1


```

---

## Arrays

Array columns contain ordered lists of values. Array indexing is **1-based**.

### Index access

```

SELECT customer_id, tags[1] AS first_tag, tags[2] AS second_tag

FROM my_namespace.products

LIMIT 5


```

### Create arrays

#### make\_array

Creates an array from a list of values.

```

SELECT make_array(1, 2, 3) AS nums

FROM my_namespace.sales_data

LIMIT 1


```

#### string\_to\_array

Splits a string into an array by a delimiter.

```

SELECT string_to_array(categories, ',') AS cat_array

FROM my_namespace.products

WHERE categories IS NOT NULL

LIMIT 5


```

#### range

Generates an array of integers from start (inclusive) to stop (exclusive).

```

SELECT range(0, 5) AS nums

FROM my_namespace.sales_data

LIMIT 1


```

#### generate\_series

Generates an array of integers from start to stop (inclusive).

```

SELECT generate_series(1, 5) AS nums

FROM my_namespace.sales_data

LIMIT 1


```

### Inspect arrays

#### array\_length

Returns the number of elements in an array.

```

SELECT customer_id, array_length(tags) AS tag_count

FROM my_namespace.products

LIMIT 5


```

#### cardinality

Returns the total number of elements in an array. Alias for `array_length`.

```

SELECT customer_id, cardinality(tags) AS tag_count

FROM my_namespace.products

LIMIT 5


```

#### empty

Returns true if an array has zero elements.

```

SELECT customer_id, empty(tags) AS has_no_tags

FROM my_namespace.products

LIMIT 5


```

#### array\_ndims

Returns the number of dimensions of an array.

```

SELECT array_ndims(make_array(1, 2, 3)) AS ndims

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_dims

Returns the dimensions of an array.

```

SELECT array_dims(make_array(1, 2, 3)) AS dims

FROM my_namespace.sales_data

LIMIT 1


```

### Search arrays

#### array\_has

Returns true if an array contains a value.

```

SELECT customer_id, array_has(tags, 'premium') AS is_premium

FROM my_namespace.products

LIMIT 5


```

#### array\_has\_all

Returns true if the first array contains all elements of the second.

```

SELECT array_has_all(make_array(1, 2, 3, 4), make_array(2, 3)) AS has_all

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_has\_any

Returns true if the first array contains any element of the second.

```

SELECT array_has_any(make_array(1, 2, 3), make_array(3, 4, 5)) AS has_any

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_position

Returns the position of the first occurrence of a value (1-indexed). Returns 0 if not found.

```

SELECT array_position(make_array('a', 'b', 'c', 'b'), 'b') AS pos

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_positions

Returns all positions of a value as an array.

```

SELECT array_positions(make_array(1, 2, 1, 3, 1), 1) AS positions

FROM my_namespace.sales_data

LIMIT 1


```

### Transform arrays

#### array\_sort

Sorts array elements.

```

SELECT array_sort(make_array(3, 1, 2)) AS sorted

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_reverse

Reverses the order of array elements.

```

SELECT array_reverse(make_array(1, 2, 3)) AS reversed

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_distinct

Removes duplicate elements from an array.

```

SELECT array_distinct(make_array(1, 2, 2, 3, 3, 3)) AS unique_vals

FROM my_namespace.sales_data

LIMIT 1


```

#### flatten

Flattens a nested array by one level.

```

SELECT flatten(make_array(make_array(1, 2), make_array(3, 4))) AS flat

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_slice

Returns a slice of an array from a start index to an end index (both inclusive, 1-indexed).

```

SELECT array_slice(make_array(10, 20, 30, 40, 50), 2, 4) AS sliced

FROM my_namespace.sales_data

LIMIT 1


```

### Modify arrays

#### array\_append

Appends a value to the end of an array.

```

SELECT array_append(make_array(1, 2, 3), 4) AS appended

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_prepend

Prepends a value to the beginning of an array.

```

SELECT array_prepend(0, make_array(1, 2, 3)) AS prepended

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_concat

Concatenates two or more arrays.

```

SELECT array_concat(make_array(1, 2), make_array(3, 4)) AS merged

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_remove

Removes the first occurrence of a value from an array.

```

SELECT array_remove(make_array(1, 2, 3, 2), 2) AS result

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_remove\_all

Removes all occurrences of a value from an array.

```

SELECT array_remove_all(make_array(1, 2, 3, 2, 2), 2) AS result

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_remove\_n

Removes the first _n_ occurrences of a value from an array.

```

SELECT array_remove_n(make_array(1, 2, 2, 2, 3), 2, 2) AS result

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_replace

Replaces the first occurrence of a value in an array.

```

SELECT array_replace(make_array(1, 2, 3), 2, 99) AS result

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_replace\_n

Replaces the first _n_ occurrences of a value in an array.

```

SELECT array_replace_n(make_array(1, 2, 2, 2, 3), 2, 99, 2) AS result

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_replace\_all

Replaces all occurrences of a value in an array.

```

SELECT array_replace_all(make_array(1, 2, 3, 2), 2, 99) AS result

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_pop\_back

Removes the last element from an array.

```

SELECT array_pop_back(make_array(1, 2, 3)) AS result

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_pop\_front

Removes the first element from an array.

```

SELECT array_pop_front(make_array(1, 2, 3)) AS result

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_repeat

Repeats a value a given number of times as an array.

```

SELECT array_repeat(region, 3) AS repeated

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_resize

Resizes an array to a given length, filling with a default value.

```

SELECT array_resize(make_array(1, 2), 5, 0) AS resized

FROM my_namespace.sales_data

LIMIT 1


```

### Set operations on arrays

#### array\_intersect

Returns elements common to both arrays.

```

SELECT array_intersect(make_array(1, 2, 3), make_array(2, 3, 4)) AS common

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_union

Returns all unique elements from both arrays.

```

SELECT array_union(make_array(1, 2, 3), make_array(3, 4, 5)) AS merged

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_except

Returns elements in the first array that are not in the second.

```

SELECT array_except(make_array(1, 2, 3, 4), make_array(2, 4)) AS diff

FROM my_namespace.sales_data

LIMIT 1


```

### Aggregate array values

#### array\_max

Returns the maximum value in an array.

```

SELECT customer_id, array_max(scores) AS max_score

FROM my_namespace.products

LIMIT 5


```

#### array\_min

Returns the minimum value in an array.

```

SELECT customer_id, array_min(scores) AS min_score

FROM my_namespace.products

LIMIT 5


```

#### array\_any\_value

Returns the first non-NULL value in an array.

```

SELECT array_any_value(make_array(NULL, 42, NULL)) AS first_val

FROM my_namespace.sales_data

LIMIT 1


```

#### array\_element

Returns the element at a given index (1-indexed). Equivalent to bracket-notation access (`arr[idx]`).

```

SELECT array_element(make_array(10, 20, 30), 2) AS second_val

FROM my_namespace.sales_data

LIMIT 1


```

### Convert arrays

#### array\_to\_string

Joins array elements into a string with a separator.

```

SELECT customer_id, array_to_string(tags, ', ') AS tag_list

FROM my_namespace.products

LIMIT 5


```

---

## Maps

Map columns store key-value pairs. Use `map_keys`, `map_values`, and `map_extract` to query them.

### map\_keys

Returns all keys from a map as an array.

```

SELECT map_keys(metadata) AS keys

FROM my_namespace.products

LIMIT 5


```

### map\_values

Returns all values from a map as an array.

```

SELECT map_values(metadata) AS vals

FROM my_namespace.products

LIMIT 5


```

### map\_extract

Returns the value for a specific key.

```

SELECT map_extract(metadata, 'source') AS source,

       map_extract(metadata, 'store_name') AS store

FROM my_namespace.products

LIMIT 5


```

### Creating maps inline

```

SELECT map(make_array('a', 'b'), make_array(1, 2)) AS m

FROM my_namespace.sales_data

LIMIT 1


```

---

## Complete function index

### Struct functions

| Function                    | Description                          |
| --------------------------- | ------------------------------------ |
| struct\_col\['field'\]      | Bracket notation field access        |
| get\_field(struct, 'field') | Function-based field access          |
| named\_struct(k1, v1, ...)  | Create struct with named fields      |
| struct(v1, v2, ...)         | Create struct with positional fields |

### Array functions

| Function                            | Description                              |
| ----------------------------------- | ---------------------------------------- |
| make\_array(v1, v2, ...)            | Create array from values                 |
| string\_to\_array(str, delim)       | Split string into array                  |
| range(start, stop)                  | Generate integer range (exclusive stop)  |
| generate\_series(start, stop)       | Generate integer series (inclusive stop) |
| array\_length(arr)                  | Number of elements                       |
| cardinality(arr)                    | Number of elements                       |
| empty(arr)                          | True if empty                            |
| array\_ndims(arr)                   | Number of dimensions                     |
| array\_dims(arr)                    | Dimension information                    |
| array\_has(arr, val)                | Contains check                           |
| array\_has\_all(arr, arr2)          | Contains all check                       |
| array\_has\_any(arr, arr2)          | Contains any check                       |
| array\_position(arr, val)           | First position of value                  |
| array\_positions(arr, val)          | All positions of value                   |
| array\_sort(arr)                    | Sort elements                            |
| array\_reverse(arr)                 | Reverse order                            |
| array\_distinct(arr)                | Remove duplicates                        |
| flatten(arr)                        | Flatten one level                        |
| array\_slice(arr, start, end)       | Extract sub-array                        |
| array\_append(arr, val)             | Append to end                            |
| array\_prepend(val, arr)            | Prepend to start                         |
| array\_concat(arr1, arr2)           | Concatenate arrays                       |
| array\_remove(arr, val)             | Remove first occurrence                  |
| array\_remove\_all(arr, val)        | Remove all occurrences                   |
| array\_remove\_n(arr, val, n)       | Remove first _n_ occurrences             |
| array\_replace(arr, old, new)       | Replace first occurrence                 |
| array\_replace\_n(arr, old, new, n) | Replace first _n_ occurrences            |
| array\_replace\_all(arr, old, new)  | Replace all occurrences                  |
| array\_pop\_back(arr)               | Remove last element                      |
| array\_pop\_front(arr)              | Remove first element                     |
| array\_repeat(val, n)               | Repeat value _n_ times                   |
| array\_resize(arr, size, default)   | Resize with default fill                 |
| array\_intersect(arr1, arr2)        | Common elements                          |
| array\_union(arr1, arr2)            | Union of elements                        |
| array\_except(arr1, arr2)           | Difference of elements                   |
| array\_max(arr)                     | Maximum value                            |
| array\_min(arr)                     | Minimum value                            |
| array\_any\_value(arr)              | First non-NULL value                     |
| array\_to\_string(arr, delim)       | Join elements as string                  |
| array\_element(arr, idx)            | Element at index                         |

### Map functions

| Function                  | Description                          |
| ------------------------- | ------------------------------------ |
| map(keys\_arr, vals\_arr) | Create map from key and value arrays |
| map\_keys(map)            | All keys as array                    |
| map\_values(map)          | All values as array                  |
| map\_extract(map, key)    | Value for a specific key             |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2-sql/sql-reference/complex-types/#page","headline":"Complex types · R2 SQL docs","description":"Reference for querying struct, array, and map column types in R2 SQL.","url":"https://developers.cloudflare.com/r2-sql/sql-reference/complex-types/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SQL"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2-sql/","name":"R2 SQL"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2-sql/sql-reference/","name":"SQL reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2-sql/sql-reference/complex-types/","name":"Complex types"}}]}
```
