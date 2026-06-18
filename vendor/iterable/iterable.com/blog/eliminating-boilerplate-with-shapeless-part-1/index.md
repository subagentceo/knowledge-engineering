# Eliminating Boilerplate With Shapeless: Part 1 - Iterable

## Eliminating Boilerplate With Shapeless: Part 1

**Published by**

October 9, 2018

At Scale by the Bay 2017, we presented Play-Formless, a small library for Play Framework that automatically generates type-safe Form mappings for case classes. We’ll recap our talk in this post. Beyond its use for development with Play Framework, we hope this post serves as a demonstration of how Shapeless and type-level programming can be applied to real-world problems.

### Traditional Form Mappings

Play Framework includes an elegant set of tools for handling Web forms. The `Mapping[T]` trait defines how a value should be extracted and parsed from HTTP request parameters. There are several out-of-the-box mappings for handling common data types (number, text, boolean, etc.). These mappings can be composed into mappings for more complex data types: options, tuples, and case classes.

![](https://iterable.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-31-at-6.44.32-PM.png)

The Form class combines a mapping with the user-supplied form input and exposes an interface for getting fields that can be used from within a view:

![](https://iterable.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-31-at-6.44.47-PM.png)

### Three Small Problems

The traditional approach to Form mappings relies on an inherently unsafe convention since it requires the developer to re-use the field name as a String in both the controller and the view. Also, the conversion from a tuple to a case class requires the developer to align the tuple and case class, which can break in the face of field re-orderings.

Perhaps the worst problem is that form mappings involve a lot of boilerplate: choosing String names for each field in addition to the mappings. In many cases, the appropriate mapping is obvious from the types of the fields; and the case class’s field name is used as the String field name. These are relatively small problems, but we can do better.

### Play-Formless

With Play-Formless we can generate form mappings directly from case classes. An earlier project by one of our founding engineers uses reflection to accomplish something similar. Using Shapeless we can eliminate the use of reflection, simplifying the implementation, while adding flexibility. We won’t cover the basics of Shapeless here. If you’re not familiar with Shapeless, there are many good references. Our goal is to be able to generate a form mapping with a single line of code:

![](https://iterable.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-31-at-6.45.00-PM.png)

Note that we combine the Mapping and Form into a single class SafeForm that contains the generated mappings and presents a Form-like interface that is type-safe.

Within this post (Part 1), we’ll aim for something simpler: Generating a mapping for a case class, from an explicitly provided set of mappings assigned to each field. In a later blog post (Part 2), we’ll combine this with a way of determining mappings automatically based on field type. These explicit mappings will be given as an HList record type:

![](https://iterable.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-31-at-6.45.12-PM.png)

For clarity, we’ll refer to a developer-provided explicit set of mappings as a specification. Note that the type of the specification is of the form:

![](https://iterable.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-31-at-6.45.25-PM.png)

To accomplish this using Shapeless we’ll use a well-established approach:

1.  Define an appropriate type class for mapping generation
2.  Generate a mapping for an HList from a specification which is an HList of mappings
3.  Use the HList mapping as a mapping for the case class

#### (1) MkMapping type class

![](https://iterable.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-31-at-6.45.35-PM.png)

This is a helper type class that produces a mapping based on a specification of type T. For example, an input specification could simply be an existing Play mapping instance. In that case, apply could simply be the identity function. The rest of our work involves generating implicit instances of this type class for different types T.

#### (2) Mappings for an HList record from an HList record of mappings

Our goal is to support specifications with a record type `K1 ->> Mapping[V1] :: K2 ->> Mapping[V2] :: ... :: HNil`. In other words, we want an instance of `MkMapping[T]` where `T` is an HList of mappings. The desired output type is a single mapping: `Mapping[K1 ->> V1 :: K2 ->> V2 :: ... :: HNil]`. As we’ll see later, we’ll be able to use that output mapping against a case class so long as the keys line up.

We convert each `K ->> Mapping[V]` to a `Mapping[K ->> V]` through application of the pre-existing `Mapping.transform` function that converts mappings from one type to another. We then generate an implicit instance for the HList through induction.  

The induction uses a helper class `HConsMapping` that combines two mappings, one for an element `H` and one for an HList `T`, into a new mapping for `H` pre-pended to `T`.

#### (3) Mappings for a case class, from an HList record of mappings, via LabelledGeneric

Now, we need to convert a case class into a record type. Shapeless provides a type class called `LabelledGeneric` that converts a case class into its HList record representation at type level. `LabelledGeneric` is the gateway to generic operations over case classes. The record representation is akin to a Map, existing at type level, where the “keys” are the field names and the “values” are the field types.

We’ll also use Shapeless’ `Align` type class to ensure that the case class and specification have the same fields. Instances of `Align` serve as a witness that two records have the same keys (irrespective of ordering). The `Align` witness naturally provides a function that can convert from one record type to the other. That function is exactly what we need to use `Mapping.transform` to convert the mapping for the HList into a mapping for the case class.

Putting all of the above together we get this compact but very powerful piece of code:

![](https://iterable.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-31-at-6.45.50-PM.png)

Note that while this function declares three type parameters, the caller of the function typically never specifies those type parameters. Instead, all three type parameters are inferred. Thus, adding some syntactic sugar, a caller merely needs to invoke:

![](https://iterable.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-31-at-7.05.31-PM.png)

### Conclusion

With the above, we’ve achieved our intermediate goal: The ability to define mappings for a case class—provided explicitly by the developer—in a type-safe way. In Part 2, we’ll take things further and show how to avoid the need to specify mappings explicitly in most cases. Instead we’ll derive the desired mappings from the types of the fields, and a common set of defaults.