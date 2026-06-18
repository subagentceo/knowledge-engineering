# Ordering Workers

By default, the reservation of Workers in a given TaskQueue is ordered by duration a Worker is unoccupied. Without an order\_by expression, the Worker who has waited the longest without a Task will be the first reserved. **An order\_by expression allows you to designate an ordering for the Workers of a given TaskQueue based upon comparison of Workers' attributes.**

The main building block of an order\_by expression is an order\_by clause, which is composed of:

1. an integer value in a Worker's JSON Attributes, nested or otherwise, and
2. a direction for ordering, with "ASC" representing ascending and "DESC" representing descending.

An order\_by expression may be composed of any number of order\_by clauses. If several Workers have the same resolved value for the first order\_by criterion, the second order\_by clause will break the tie by comparing the next attribute. For example, let's think about a Workspace with the following:

* TaskQueue with order\_by expression `"worker.finance ASC, worker.support ASC"`
* Worker Alice, with attributes `{finance = 10, support = 8}`
* Worker Bob, with attributes `{finance = 10, support = 5}`

Alice and Bob are first compared using the first order\_by clause, `"worker.finance_level ASC"`, which results in a tie because their finance attributes are equal. To break the tie, the two Workers are next compared using the next order\_by clause, `"worker.support_level ASC"`. Bob's support level, 5, is less than Alice's support level, and the sort direction is ascending. When a new Task is created and enters this TaskQueue, the workers are ordered \{Bob, Alice}, and Bob is reserved to handle the new Task.

What happens if a worker doesn't have a particular skill? Workers without a given skill are ordered after those that have a skill when there is a tie, regardless of whether "ASC" or "DESC" sort direction is selected. For example, given a Workspace containing:

* TaskQueue with order\_by expression `"worker.finance ASC, worker.support ASC"`
* Worker Alice, with attributes `{finance = 10, support = 8}`
* Worker Bob, with attributes `{finance = 10}`

Alice and Bob are first compared using the first order\_by clause, `"worker.finance_level ASC"`, which results in a tie because their finance attributes are equal. To break the tie, the two Workers are next compared using the next order\_by clause, `"worker.support_level ASC"`. Bob does not have the support attribute and will therefore appear in the queue after Alice. When a new Task is created and enters this TaskQueue, the workers are ordered \{Alice, Bob}, and Alice is reserved to handle the new Task.

If ordering is attempted on a non-integer attribute, then the expression is ignored.

For workers that are equal, for all supplied ordering clauses, the longest time since last task assignment is used as a final ordering condition.

```json
{
   "task_routing":{
      "filters":[
         {
            "filter_friendly_name":"Sales filter",
            "expression":"type == 'Sales'",
            "targets":[
               {
                  "expression":"task.subSection = worker.specializedSubField",
                  "order_by":"worker.english_level ASC",
                  "priority":"1",
                  "queue":"WQ3935a4f744a241c1356c09310c2398e6"
               },
               {
                  "priority":"1",
                  "queue":"WQ787b271950e0f7687ec432221e672ffa"
               }
            ]
         }
      ]
   }
}
```
