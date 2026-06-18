# Using TaskRouter Expressions

TaskRouter uses a SQL-like expression syntax for [binding Workers to TaskQueues](/docs/taskrouter/api/task-queue) and [filtering Tasks into TaskQueues in a Workflow configuration](/docs/taskrouter/workflow-configuration). Expressions are composed of constants, JSON keys, as well as logical and comparison operators.

For example, a TaskQueue TargetWorkers expression looks like:

```text
(skills HAS 'support') AND (languages HAS 'english')
```

And a Workflow filter expression looks like:

```text
customer_value == 'Gold' AND type == 'ticket'
```

## Expression Structure

Expressions are made up of simple comparisons of constants and/or JSON keys, grouped together by parenthesis and logical operators.

Examples:

* `1 == 1`
* `0 != 1`
* `"apple" != "orange"`
* `key > 1`
* `object.param != "apple"`
* `language IN ["en", "es"]`
* `(condition_a == true) OR (condition_b == true)`
* `(language == "en" OR language == "fr") AND skill_rating >= 5.1`

Hyphens are not supported in TaskRouter expressions.

### Constants

There are 3 types of constants supported:

* Strings, represented as single or double quoted blocks of text. `"string"` or `'string'`.
* Numbers, represented as integers or floating point numbers. `1`, `1.0`, `1.00`, `3.141529`
* Booleans, represented as unquoted `true` or `false`.

Constants can be the left or right values of a comparison operator.

### References

References to JSON object keys can also exist in the expression. These are resolved against the JSON document (Worker or Task attributes), and the value from the JSON is substituted. Keys are used as unquoted strings, using dot notation to reference sub-properties and square brackets to reference array indices. If the document does not contain the requested key, it resolves to NULL.

Given the Task attributes:

```json
{
    "string_const": "foo",
    "object": {
        "array": ["a","b","c"],
        "attr": "bar"
    }
}
```

The following are valid keys in a Workflow configuration, and would resolve as follows:

* `string_const` - a string that resolves to `"foo"`
* `object.array` - an array that resolves to `["a","b","c"]`
* `object.array[2]` - a string that resolves to `"c"`
* `object.attr` - a string that resolves to `"bar"`

### Comparison Operators

Comparison operators compare two constants and return `true` or `false`. Comparisons between different types should be avoided. Scalar operators can compare two scalar values (i.e. not arrays). Array operators can have Arrays as one side of the operation.

Valid scalar operators are:

* `> greater than`
* `>= greater than or equal to`
* `== equals`
* `!= does not equal`
* `<= less than or equal to`
* `< less than`
* `CONTAINS` - does the scalar value on the left contain the scalar value on the right.

Valid array operators are:

* `HAS` - does Array on the left contain the value on the right
* `IN` - does the scalar value on the left exist in the array on the right.
* `NOT IN` - does the scalar value on the left not exist in the array on the right.

Using scalar operators on Arrays results in `false`. Using array operators on two scalar values also returns `false`.

### Logical Operators

Compares the results of sub-expressions to the left and right and return `true` or `false` based on the operand. Parenthesis can be used to group sub-expressions.

Valid logical Operators

* `AND` - if both the left and right subexpressions are true, resolves to `true`; otherwise `false`
* `OR` - if one or both of the left or right subexpressions are true, resolves to `true`; otherwise `false`

## Queue, Matching Tasks, and Matching Workers Expressions

Expressions are used in three primary places to manage the assignment of Tasks to Workers:

1. The definition of a TaskQueue

   * Evaluates against all Workers in a Workspace
2. A Workflow filter to find matching Tasks (`filter:` in a Workflow configuration JSON)

   * Evaluates against a single Task processing through a Workflow
3. A routing step expression to match Workers to a Task (`target.expression:` in a Workflow configuration JSON)

   * Evaluates against a single Task and all Workers in the routing step's queue
   * All attributes must be prefixed by `task.` or `worker.`
   * The expression can target workers by matching task attributes to worker attributes. It can also include the following worker fields: `sid`, `friendly_name`, `activity_sid`, or `activity_name`.
