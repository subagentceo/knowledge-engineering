# Narrowing Union Types With Typescript Predicates and Assertions - Iterable

## Narrowing Union Types With Typescript Predicates and Assertions

**Published by**

May 26, 2021

![](https://iterable.com/wp-content/uploads/2026/04/052621_Narrowing-union-types_768x512.png)

Imagine making an API request to an endpoint that provides data organized into folders. Requesting the data from a specific folder would return items that the folder contains as well as additional folders nested directly under the folder in question.

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-5.25.34-PM.png)

A folder navigation UI would need to split apart the `Folders` from the `Items` in order to render properly. This could easily be solved in a component by using `filter` to get rid of the undesired items at the point of use but at the cost of iterating the set for each use.

Also, what if I needed to split other kinds of arrays? For example, what if I had a list of users with an `isActive` property, and I wanted to split those into `[activeUsers, inactiveUsers]`? The underlying problem is pretty general so a small utility function would help here.

**Problem:** Given an array of two kinds of things (`T` and `U`), let’s split them apart and return each subsection of the array in a tuple (`[T[], U[]]`).

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-5.25.46-PM.png)

The functions works, but the compiler can’t actually tell if the `splitFn` is narrowing the types correctly so it complains. There are two primary ways to provide it additional context.

### Solution 1: Type Assertions

The most obvious solution is just to tell the compiler what’s happening via a type assertion. These assertions are done using the `as` keyword.

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-5.25.59-PM.png)

Generally, type assertions are discouraged as they can easily reduce the effectiveness of the compiler by overriding it erroneously. That’s true here as well: providing a `splitFn` that doesn’t accurately or exhaustively split the types will cause problems downstream.

### Solution 2: Type Predicates

In programming, a “predicate” is a function with a single parameter that returns either `true` or `false`. Typescript uses predicates to narrow types. It’s annotated with a special return description using the `is` keyword.

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-5.26.19-PM.png)

The `splitFn` above is already functioning as predicate, so updating the type definition will clear the error and narrow the type for the compiler.

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-5.26.28-PM.png)

This clears the error as well, but there are a couple of caveats:

**Caveat 1:** This approach makes more sense when splitting apart an array into two strongly differentiated subtypes represented in the type system. In the second example (the active users) the following works, but the predicate function has a hard time describing the intent when narrowing within a type:

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-5.26.39-PM.png)

Here it would probably be better to create `ActiveUser` and `InactiveUser` types. However, certain subgroupings resist type descriptions. There’s no easy way that I know of to break apart a list of users into `newUsers` and `oldUsers` where the differentiator is a test for if an `accountCreated` timestamp happens before or after a specific time.

**Caveat 2:** While the type safety here is stronger than in solution 1, there’s still no guarantee that the predicate is error-free in its differentiation logic. A poorly constructed predicate function could still result in compiler errors downstream if it fails to accurately differentiate between the types.

### Conclusion

As neither of these two approaches guarantees type safety, I haven’t arrived at a strong conclusion for recommending use. I’ve opted for using type assertions given that it feels more like idiomatic Javascript to me and there’s less pressure to create new types just to satisfy the compiler when operating on single-type arrays. In less generalized utilities, I’d probably opt for predicates. Which style do you use?