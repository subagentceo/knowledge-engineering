

As of November 7, 2025, you can't create new repository associations in Amazon CodeGuru Reviewer. To learn about services with capabilities similar to CodeGuru Reviewer, see [Amazon CodeGuru Reviewer availability change](https://docs.aws.amazon.com/codeguru/latest/reviewer-ug/codeguru-reviewer-availability-change.html).

# What is Amazon CodeGuru Reviewer?
<a name="welcome"></a>

Amazon CodeGuru Reviewer is a service that uses program analysis and machine learning to detect potential defects that are difficult for developers to find and offers suggestions for improving your Java and Python code. This service has been released for general availability in several [Regions](https://docs.aws.amazon.com//general/latest/gr/codeguru-reviewer.html).

By proactively detecting code defects, CodeGuru Reviewer can provide guidelines for addressing them and implementing best practices to improve the overall quality and maintainability of your code base during the code review stage. For more information, see [How Amazon CodeGuru Reviewer works](how-codeguru-reviewer-works.md).

## What kind of recommendations does CodeGuru Reviewer provide?
<a name="welcome-recommendations"></a>

CodeGuru Reviewer doesn't flag syntactical mistakes, as these are relatively easy to find. Instead, CodeGuru Reviewer identifies more complex problems and suggests improvements related to recommendation types such as resource leak prevention or security analysis. Within each type are several detectors that CodeGuru Reviewer uses to analyze your code. For information about these detectors, see the [Amazon CodeGuru Reviewer Detector Library](https://docs.aws.amazon.com/codeguru/detector-library/index.html).

CodeGuru Reviewer also integrates with AWS Secrets Manager to use a secrets detector that finds unprotected secrets in your code. For more information, see [Secrets detection](recommendations.md#secrets-detection).

## What languages and repositories can I use with CodeGuru Reviewer?
<a name="welcome-repositories"></a>

CodeGuru Reviewer is designed to work with Java and Python code repositories in the following source providers:
+ [AWS CodeCommit](https://docs.aws.amazon.com//codecommit/latest/userguide/welcome.html)
+ Bitbucket
+ GitHub
+ GitHub Enterprise Cloud
+ GitHub Enterprise Server
+ Amazon S3
**Note**  
S3 repositories are only supported through GitHub Actions. For more information, see [Create code reviews with GitHub Actions](working-with-cicd.md).

If you use any of these source providers, you can integrate with CodeGuru Reviewer with just a few steps. After you associate a repository with CodeGuru Reviewer, you can [interact with recommendations in the CodeGuru Reviewer console](https://docs.aws.amazon.com//codeguru/latest/reviewer-ug/give-feedback-from-code-review-details.html). For incremental code reviews, you can also [see recommendations directly from inside pull requests](https://docs.aws.amazon.com//codeguru/latest/reviewer-ug/provide-feedback.html#provide-feedback-in-pull-requests) in your repository.

## Accessing CodeGuru Reviewer
<a name="accessing_reviewer"></a>

You can access CodeGuru Reviewer using any of the following methods:
+ **Amazon CodeGuru Reviewer console** – [https://console.aws.amazon.com/codeguru/reviewer/](https://console.aws.amazon.com/codeguru/reviewer/)
+ **AWS CLI** – For more information, see [Getting started with the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) in the *AWS Command Line Interface User Guide*.
+ **CodeGuru Reviewer API** – For more information, see the [Amazon CodeGuru Reviewer API Reference](https://docs.aws.amazon.com/codeguru/latest/reviewer-api/Welcome.html).
+ **AWS SDKs** – For more information, see [Tools to Build on AWS](https://aws.amazon.com/developer/tools).