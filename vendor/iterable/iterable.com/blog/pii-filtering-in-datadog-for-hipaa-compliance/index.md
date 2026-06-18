# PII Filtering in DataDog for HIPAA Compliance - Iterable

## PII Filtering in DataDog for HIPAA Compliance

**Published by**

August 30, 2021

![](https://iterable.com/wp-content/uploads/2026/04/083021_PII-Filtering_768x512.png)

HIPAA, or Health Insurance Portability and Accountability Act, requires companies to employ safeguards for your medical information. Imagine if your online order for drug prescriptions or medical supplies was leaked onto the Internet! Consumers want companies to be responsible stewards of medical information.

For Iterable to serve the medical industry, HIPAA compliance is a must. To become HIPAA compliant, Iterable needs to sign Business Associate Agreements (BAAs) with any vendor to whom we send Personally Identifiable Information (PII), such as email and IP addresses. BAAs ensure that our partners also employ the appropriate safeguards for PII handling. If any vendor refuses to sign, then Iterable cannot send PII to the vendor.

DataDog, the APM vendor Iterable uses, is essential for how Iterable operates. DataDog provides metrics and graphs that show the health of the Iterable service and help pinpoint any performance problems that arise. At the time, DataDog could not sign a BAA with Iterable. So this means Iterable could not send any PIIs to DataDog. Any PIIs sent over to DataDog would become a security incident in which Iterable would need to quickly cease sending the PIIs and request DataDog to erase the data on their end, one way or another.

I was to lead the effort to strip all PIIs sent to DataDog to fulfill our contractual obligation for a new customer.

### The Scope

Iterable sends spans to DataDog. The span consists of timing info, tags, and child spans. See the following example:

![](https://iterable.com/wp-content/uploads/2021/08/Screen-Shot-2022-02-02-at-8.33.15-PM.png)

The tags contain any info that Iterable sends, some of which may include PIIs. So the scope boiled down to ensuring no PIIs remained in tags for HIPAA customers.

Tags were created in roughly 2 groups of ways. The first group looked like the following.

![](https://iterable.com/wp-content/uploads/2021/08/Screen-Shot-2022-02-02-at-8.33.26-PM.png)

`setTags` called `setTag` underneath. So far so good, the structure was very predictable.

The second group looked like this.

![](https://iterable.com/wp-content/uploads/2021/08/Screen-Shot-2022-02-02-at-8.33.39-PM.png)

`trace.setError(msg)` contained the following line:

![](https://iterable.com/wp-content/uploads/2021/08/Screen-Shot-2022-02-02-at-8.33.50-PM.png)

So again, it would be a matter of not passing PII in `msg` to DataDog for HIPAA customers.

`trace.setError(exception)` boiled down to the following:

![](https://iterable.com/wp-content/uploads/2021/08/Screen-Shot-2022-02-02-at-8.33.59-PM.png)

So 3 tags were set in this case. The exception could be a third party one for which Iterable had no control. So the exception message was also something that Iterable cannot control. How would developers validate all the possible messages?

In addition, there were some engineering requirements. PII filtering should be simple and mostly automatic. That way, developers largely didn’t have to think about it, making development easy and safe.

Moreover, spans were used everywhere in the code base, including latency-sensitive services like API. Thus, the performance overhead must be minimal.

In conclusion, there are three major requirements for this project:

1.  No PIIs can remain in tags from spans for HIPAA customers.
2.  PII filtering should be simple and mostly automatic.
3.  Performance overhead must be minimal.

### The Solutions

Our team had a tight deadline to complete this work before the customer signed their contract. There were a number of creative solutions that we experimented with before we found the right approach. Let’s look at how the project unfolded.

#### Automatic Hashing

Some tags with PIIs, such as emails, are important for debugging but cannot be sent to DataDog. Hashing was an acceptable solution to hide PII because deriving the original string from hashes is difficult. Yet, hashes are easy to derive from the original string, allowing an engineer to debug what happened to a particular recipient.

To automatically hash tags containing PII, an engineer created a new class, `Sha256`. Such tags would take a `Sha256` type, which once created contained only the SHA-256 of the original String. This made it fool-proof for such tags to always contain a SHA-256 hash.

#### Other Attempts

Then another engineer created a `TraceFilter` class to obfuscate PIIs within a tag. He created regular expressions to search for email username or domain within a string. The problem, however, was that the solution was kind of complicated, so it was hard to validate the correctness. What happens when there are two or more email addresses in the tag? When the consequences are security incidents, a complicated solution would not do. The PR was closed.

In another PR, the same engineer gave different `TraceTag`s different types. And each type implements a method for writing its tag content. A type without PII would just write its value into the tag. A type with PII would obfuscate somehow. After a call for review to all the engineers went out, there were so many comments that no one could agree on exactly what to do, and no one approved the PR. That PR also ended up getting scrapped.

#### A Nuclear Solution

With only a month left before the deadline, my manager and I came up with a PII Kill Switch, a global feature flag, to fulfill the requirement. Turning on the feature flag would redact all trace tags and exception messages. This would ensure that no PII would ever get sent to DataDog. Then I could slowly allow more PIIs from non-HIPAA customers to be sent to DataDog.

As PII Kill Switch was going to be a feature flag, trace creation would have a dependency on this feature flag, which would be stored in the database. Since trace creation code has no dependency on any data store, this change required injecting a new dependency to create traces.

Originally, the code looks like

![](https://iterable.com/wp-content/uploads/2021/08/Screen-Shot-2022-02-02-at-8.34.11-PM.png)

For this PR, I created a `traceFactory` to create the top-level traces, which would pass down whether the kill switch is on or off. So I can have something like

![](https://iterable.com/wp-content/uploads/2021/08/Screen-Shot-2022-02-02-at-8.34.22-PM.png)

Note that this is not the only way to deal with the new dependency. Another way would be to simply inject a `TraceService` into every method of `TraceUtils` as an implicit argument. But at the time, the above method of injecting dependency seemed more natural. The result, however, is over 1,000 added or changed lines!

When I later had a chance to go over the PR at our Architecture Support Group (ASG), the changes were considered too extensive. And the PR also removed potentially too much info as all traces with PIIs would be affected, not just for the new customer!

#### The Quick Fix

An alternative solution is proposed that would require far fewer changes. First, the new customer can be hard-coded. This means no new dependency injected. So the change is minimal. This would help us make the deadline coming in one week! Then a subsequent solution will be introduced afterward to allow additional customers to be HIPAA compliant in a more general way.

The new hard-coding solution also introduced a way to filter out PII. Many traces contain `org.id` (organization id), though many only have `project.id` (project ID). And a minority has neither.

In Iterable, a customer (an org) can have multiple projects, and each project belongs to an org. So for the first pass with the hard-coded solution, the decision on whether a trace can contain PII involves checking whether a trace and its ancestors has an `org.id` tag.

If an `org.id` tag is found, the `org.id` is checked against the hard-coded org ID. If the org ID matches the hard-coded org ID, PII is prohibited.

Any tag that may have PII simply has its content replaced with `redacted`. If no `org.id` tag is found, then assume the worst case and redact potential PII. Otherwise, keep the tag content. As for exceptions, the old exception handling code was copied from the old to the new PR.

As a result of the smaller scope of changes, the PR was submitted and approved in a few days, and the contract was fulfilled. On the day of the contractual obligation, the engineers responsible for making Iterable HIPAA compliant had a short party with our CEO to celebrate the success!

### Follow-Ups

Next, work commenced to generalize to arbitrary orgs. A new column, `data_policy`, is added to the organizations table in the database, taking the possible values `Unrestricted` and `HIPAA`, encoded as enums in Scala. This allows different values for `data_policy` in the future. To ensure database access would introduce minimal overhead, a refreshing cache is used.

The in-memory cache would fetch the list of all orgs with `data_policy` value of `HIPAA` initially and periodically fetch the whole list again. And the cache then atomically swaps out the whole list by switching references. From the perspective of a client of the cache, the value is always in memory. Thus, the refreshing cache minimizes the performance hit from using the database.

A new dependency, `TraceService`, is introduced and injected into every method of `TraceUtils` as an implicit argument. This `TraceService` has a dependency on the refreshing cache to figure out which orgs require HIPAA compliance. Coincidentally, Iterable already uses trace for structure logging called event stream, so everywhere traces are used, `eventStreamer` is injected as a dependency.

So a quick change is made by replacing `eventStreamer` with `traceService` and making `eventStreamer` a member of `traceService`. This search-and-replace changed about 300 lines in about 20 minutes. All these changes effectively take about another week or so to finish, well within the deadline for the next customer to be HIPAA compliant.

Eventually, a few more optimizations were made. A way to whitelist exceptions whose messages don’t contain PII is added. A whitelist exception simply needs to extend `ThrowableWithoutPii` for its exception message to be sent to DataDog even for traces potentially from HIPAA customers.

### Conclusion

So far, we’ve seen no security incidents from injecting PII into trace tags.

Recently, we decided that we actually wanted to avoid sending any PII to DataDog. And it took only a one-line change to make this work. We simply flipped the PII policy calculation to always return `PiiProhibited`, a win for modularity.

Eventually, a similar refactoring to `TraceFactory` and another refactoring to group trace tags by types were rewritten and merged by an architect. Looking back, I wished I had taken a more iterative approach using smaller PRs, with refactorings submitted separately from implementations. Even though it is additional effort to create multiple PRs, they would be approved more quickly, resulting in a much faster time to deploy.

In the end, there are no security incidents from injecting PII into trace tags for HIPAA customers. I attribute our success to choosing simpler solutions. The idea of filtering trace content is overly complicated and makes it hard to guarantee accuracy, and so we discarded the idea. Having PII filtering that the developer doesn’t have to think about is a big win both for developer productivity and for security.