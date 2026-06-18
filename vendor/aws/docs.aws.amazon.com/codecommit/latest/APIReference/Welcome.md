

# Welcome
<a name="Welcome"></a>

This is the * AWS CodeCommit API Reference*. This reference provides descriptions of the operations and data types for AWS CodeCommit API along with usage examples.

You can use the AWS CodeCommit API to work with the following objects:

Repositories, by calling the following:
+  [BatchGetRepositories](API_BatchGetRepositories.md), which returns information about one or more repositories associated with your AWS account.
+  [CreateRepository](API_CreateRepository.md), which creates an AWS CodeCommit repository.
+  [DeleteRepository](API_DeleteRepository.md), which deletes an AWS CodeCommit repository.
+  [GetRepository](API_GetRepository.md), which returns information about a specified repository.
+  [ListRepositories](API_ListRepositories.md), which lists all AWS CodeCommit repositories associated with your AWS account.
+  [UpdateRepositoryDescription](API_UpdateRepositoryDescription.md), which sets or updates the description of the repository.
+  [UpdateRepositoryEncryptionKey](API_UpdateRepositoryEncryptionKey.md), which updates the AWS Key Management Service encryption key used to encrypt and decrypt a repository.
+  [UpdateRepositoryName](API_UpdateRepositoryName.md), which changes the name of the repository. If you change the name of a repository, no other users of that repository can access it until you send them the new HTTPS or SSH URL to use.

Branches, by calling the following:
+  [CreateBranch](API_CreateBranch.md), which creates a branch in a specified repository.
+  [DeleteBranch](API_DeleteBranch.md), which deletes the specified branch in a repository unless it is the default branch.
+  [GetBranch](API_GetBranch.md), which returns information about a specified branch.
+  [ListBranches](API_ListBranches.md), which lists all branches for a specified repository.
+  [UpdateDefaultBranch](API_UpdateDefaultBranch.md), which changes the default branch for a repository.

Files, by calling the following:
+  [DeleteFile](API_DeleteFile.md), which deletes the content of a specified file from a specified branch.
+  [GetBlob](API_GetBlob.md), which returns the base-64 encoded content of an individual Git blob object in a repository.
+  [GetFile](API_GetFile.md), which returns the base-64 encoded content of a specified file.
+  [GetFolder](API_GetFolder.md), which returns the contents of a specified folder or directory.
+  [ListFileCommitHistory](API_ListFileCommitHistory.md), which retrieves a list of commits and changes to a specified file. 
+  [PutFile](API_PutFile.md), which adds or modifies a single file in a specified repository and branch.

Commits, by calling the following:
+  [BatchGetCommits](API_BatchGetCommits.md), which returns information about one or more commits in a repository.
+  [CreateCommit](API_CreateCommit.md), which creates a commit for changes to a repository.
+  [GetCommit](API_GetCommit.md), which returns information about a commit, including commit messages and author and committer information.
+  [GetDifferences](API_GetDifferences.md), which returns information about the differences in a valid commit specifier (such as a branch, tag, HEAD, commit ID, or other fully qualified reference).

Merges, by calling the following:
+  [BatchDescribeMergeConflicts](API_BatchDescribeMergeConflicts.md), which returns information about conflicts in a merge between commits in a repository.
+  [CreateUnreferencedMergeCommit](API_CreateUnreferencedMergeCommit.md), which creates an unreferenced commit between two branches or commits for the purpose of comparing them and identifying any potential conflicts.
+  [DescribeMergeConflicts](API_DescribeMergeConflicts.md), which returns information about merge conflicts between the base, source, and destination versions of a file in a potential merge.
+  [GetMergeCommit](API_GetMergeCommit.md), which returns information about the merge between a source and destination commit. 
+  [GetMergeConflicts](API_GetMergeConflicts.md), which returns information about merge conflicts between the source and destination branch in a pull request.
+  [GetMergeOptions](API_GetMergeOptions.md), which returns information about the available merge options between two branches or commit specifiers.
+  [MergeBranchesByFastForward](API_MergeBranchesByFastForward.md), which merges two branches using the fast-forward merge option.
+  [MergeBranchesBySquash](API_MergeBranchesBySquash.md), which merges two branches using the squash merge option.
+  [MergeBranchesByThreeWay](API_MergeBranchesByThreeWay.md), which merges two branches using the three-way merge option.

Pull requests, by calling the following:
+  [CreatePullRequest](API_CreatePullRequest.md), which creates a pull request in a specified repository.
+  [CreatePullRequestApprovalRule](API_CreatePullRequestApprovalRule.md), which creates an approval rule for a specified pull request.
+  [DeletePullRequestApprovalRule](API_DeletePullRequestApprovalRule.md), which deletes an approval rule for a specified pull request.
+  [DescribePullRequestEvents](API_DescribePullRequestEvents.md), which returns information about one or more pull request events.
+  [EvaluatePullRequestApprovalRules](API_EvaluatePullRequestApprovalRules.md), which evaluates whether a pull request has met all the conditions specified in its associated approval rules.
+  [GetCommentsForPullRequest](API_GetCommentsForPullRequest.md), which returns information about comments on a specified pull request.
+  [GetPullRequest](API_GetPullRequest.md), which returns information about a specified pull request.
+  [GetPullRequestApprovalStates](API_GetPullRequestApprovalStates.md), which returns information about the approval states for a specified pull request.
+  [GetPullRequestOverrideState](API_GetPullRequestOverrideState.md), which returns information about whether approval rules have been set aside (overriden) for a pull request, and if so, the Amazon Resource Name (ARN) of the user or identity that overrode the rules and their requirements for the pull request.
+  [ListPullRequests](API_ListPullRequests.md), which lists all pull requests for a repository.
+  [MergePullRequestByFastForward](API_MergePullRequestByFastForward.md), which merges the source destination branch of a pull request into the specified destination branch for that pull request using the fast-forward merge option.
+  [MergePullRequestBySquash](API_MergePullRequestBySquash.md), which merges the source destination branch of a pull request into the specified destination branch for that pull request using the squash merge option.
+  [MergePullRequestByThreeWay](API_MergePullRequestByThreeWay.md), which merges the source destination branch of a pull request into the specified destination branch for that pull request using the three-way merge option.
+  [OverridePullRequestApprovalRules](API_OverridePullRequestApprovalRules.md), which sets aside all approval rule requirements for a pull request.
+  [PostCommentForPullRequest](API_PostCommentForPullRequest.md), which posts a comment to a pull request at the specified line, file, or request.
+  [UpdatePullRequestApprovalRuleContent](API_UpdatePullRequestApprovalRuleContent.md), which updates the structure of an approval rule for a pull request.
+  [UpdatePullRequestApprovalState](API_UpdatePullRequestApprovalState.md), which updates the state of an approval on a pull request.
+  [UpdatePullRequestDescription](API_UpdatePullRequestDescription.md), which updates the description of a pull request.
+  [UpdatePullRequestStatus](API_UpdatePullRequestStatus.md), which updates the status of a pull request.
+  [UpdatePullRequestTitle](API_UpdatePullRequestTitle.md), which updates the title of a pull request.

Approval rule templates, by calling the following:
+  [AssociateApprovalRuleTemplateWithRepository](API_AssociateApprovalRuleTemplateWithRepository.md), which associates a template with a specified repository. After the template is associated with a repository, AWS CodeCommit creates approval rules that match the template conditions on every pull request created in the specified repository.
+  [BatchAssociateApprovalRuleTemplateWithRepositories](API_BatchAssociateApprovalRuleTemplateWithRepositories.md), which associates a template with one or more specified repositories. After the template is associated with a repository, AWS CodeCommit creates approval rules that match the template conditions on every pull request created in the specified repositories.
+  [BatchDisassociateApprovalRuleTemplateFromRepositories](API_BatchDisassociateApprovalRuleTemplateFromRepositories.md), which removes the association between a template and specified repositories so that approval rules based on the template are not automatically created when pull requests are created in those repositories.
+  [CreateApprovalRuleTemplate](API_CreateApprovalRuleTemplate.md), which creates a template for approval rules that can then be associated with one or more repositories in your AWS account.
+  [DeleteApprovalRuleTemplate](API_DeleteApprovalRuleTemplate.md), which deletes the specified template. It does not remove approval rules on pull requests already created with the template.
+  [DisassociateApprovalRuleTemplateFromRepository](API_DisassociateApprovalRuleTemplateFromRepository.md), which removes the association between a template and a repository so that approval rules based on the template are not automatically created when pull requests are created in the specified repository.
+  [GetApprovalRuleTemplate](API_GetApprovalRuleTemplate.md), which returns information about an approval rule template.
+  [ListApprovalRuleTemplates](API_ListApprovalRuleTemplates.md), which lists all approval rule templates in the AWS Region in your AWS account.
+  [ListAssociatedApprovalRuleTemplatesForRepository](API_ListAssociatedApprovalRuleTemplatesForRepository.md), which lists all approval rule templates that are associated with a specified repository.
+  [ListRepositoriesForApprovalRuleTemplate](API_ListRepositoriesForApprovalRuleTemplate.md), which lists all repositories associated with the specified approval rule template.
+  [UpdateApprovalRuleTemplateDescription](API_UpdateApprovalRuleTemplateDescription.md), which updates the description of an approval rule template.
+  [UpdateApprovalRuleTemplateName](API_UpdateApprovalRuleTemplateName.md), which updates the name of an approval rule template.
+  [UpdateApprovalRuleTemplateContent](API_UpdateApprovalRuleTemplateContent.md), which updates the content of an approval rule template.

Comments in a repository, by calling the following:
+  [DeleteCommentContent](API_DeleteCommentContent.md), which deletes the content of a comment on a commit in a repository.
+  [GetComment](API_GetComment.md), which returns information about a comment on a commit.
+  [GetCommentReactions](API_GetCommentReactions.md), which returns information about emoji reactions to comments.
+  [GetCommentsForComparedCommit](API_GetCommentsForComparedCommit.md), which returns information about comments on the comparison between two commit specifiers in a repository.
+  [PostCommentForComparedCommit](API_PostCommentForComparedCommit.md), which creates a comment on the comparison between two commit specifiers in a repository.
+  [PostCommentReply](API_PostCommentReply.md), which creates a reply to a comment.
+  [PutCommentReaction](API_PutCommentReaction.md), which creates or updates an emoji reaction to a comment.
+  [UpdateComment](API_UpdateComment.md), which updates the content of a comment on a commit in a repository.

Tags used to tag resources in AWS CodeCommit (not Git tags), by calling the following:
+  [ListTagsForResource](API_ListTagsForResource.md), which gets information about AWStags for a specified Amazon Resource Name (ARN) in AWS CodeCommit.
+  [TagResource](API_TagResource.md), which adds or updates tags for a resource in AWS CodeCommit.
+  [UntagResource](API_UntagResource.md), which removes tags for a resource in AWS CodeCommit.

Triggers, by calling the following:
+  [GetRepositoryTriggers](API_GetRepositoryTriggers.md), which returns information about triggers configured for a repository.
+  [PutRepositoryTriggers](API_PutRepositoryTriggers.md), which replaces all triggers for a repository and can be used to create or delete triggers.
+  [TestRepositoryTriggers](API_TestRepositoryTriggers.md), which tests the functionality of a repository trigger by sending data to the trigger target.

For information about how to use AWS CodeCommit, see the [AWS CodeCommit User Guide](https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html).

This document was last published on June 17, 2026. 