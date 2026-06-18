---
title: 6 – Revert configuration
description: Sometimes, you may have to roll back configuration changes. To revert your configuration, check out the desired branch and ask Terraform to move your Cloudflare settings back in time.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# 6 – Revert configuration

Sometimes, you may have to roll back configuration changes. For example, you might want to run performance tests on a new configuration or maybe you mistyped an IP address and brought your entire site down.

To revert your configuration, check out the desired branch and ask Terraform to move your Cloudflare settings back in time. If you accidentally brought your site down, consider establishing a good strategy for peer reviewing pull requests rather than merging directly to `master` as done in the tutorials for brevity.

Note

Terraform code snippets below refer to the v5 SDK only.

## 1\. Review your configuration history

Before determining how far back to revert, review your Git history:

Terminal window

```

git log --oneline


```

```

f1a2b3c Step 5 - Add two Page Rules

d4e5f6g Step 4 - Create load balancer (LB) monitor, LB pool, and LB

a7b8c9d Step 3 - Enable TLS 1.3, automatic HTTPS rewrites, and strict SSL

e1f2g3h Step 2 - Initial Terraform v5 configuration


```

Another benefit of storing your Cloudflare configuration in Git is that you can see who made the change. You can also see who reviewed and approved the change if you peer-review pull requests.

Terminal window

```

git log


```

Check when the last change was made:

Terminal window

```

git show


```

This shows the most recent commit and what files changed.

## 2\. Scenario: Revert the Page Rules

Assume that shortly after you deployed the Page Rules when following the [Add exceptions with Page Rules](https://developers.cloudflare.com/terraform/tutorial/add-page-rules/) tutorial, you are told the URL is no longer needed, and the security setting and redirect should be dropped.

While you can always edit the config file directly and delete those entries, you can use Git to do that for you.

### Revert using Git

Use Git to create a revert commit that undoes the Page Rules changes:

Terminal window

```

git revert HEAD


```

Git will open your default editor with a commit message. Save and close to accept the default message, or customize it:

```

Revert "Add Page Rules for security and redirects"


This reverts commit f1a2b3c4d5e6f7a8b9c0d1e2f3g4h5i6j7k8l9m0.


```

## 3\. Preview the changes

Check what Terraform will do with the reverted configuration:

Terminal window

```

terraform plan


```

Expected output:

```

Plan: 0 to add, 0 to change, 2 to destroy.


Terraform will perform the following actions:


  # cloudflare_page_rule.expensive_endpoint_security will be destroyed

  # cloudflare_page_rule.legacy_redirect will be destroyed


```

As expected, Terraform will remove the two Page Rules that were added in tutorial 5.

## 4\. Apply the changes

Apply the changes to remove the Page Rules from your Cloudflare zone:

Terminal window

```

terraform apply --auto-approve


```

```

cloudflare_page_rule.expensive_endpoint_security: Destroying...

cloudflare_page_rule.legacy_redirect: Destroying...

cloudflare_page_rule.expensive_endpoint_security: Destruction complete after 1s

cloudflare_page_rule.legacy_redirect: Destruction complete after 1s


Apply complete! Resources: 0 added, 0 changed, 2 destroyed.


```

Two resources were destroyed, as expected, and you have rolled back to the previous version.

## 5\. Verify the revert

Test that the Page Rules are no longer active:

Terminal window

```

# This should now return 404 (no redirect)

curl -I https://www.example.com/old-location.php


# This should return normal response (no Under Attack mode)

curl -I https://www.example.com/expensive-db-call


```

Your configuration has been successfully reverted. The Page Rules are removed, and your zone settings are back to the previous state. Git's version control ensures you can always recover or revert changes safely.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/tutorial/revert-configuration/#page","headline":"Revert configuration · Cloudflare Terraform docs","description":"Sometimes, you may have to roll back configuration changes. To revert your configuration, check out the desired branch and ask Terraform to move your Cloudflare settings back in time.","url":"https://developers.cloudflare.com/terraform/tutorial/revert-configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/terraform/","name":"Terraform"}},{"@type":"ListItem","position":3,"item":{"@id":"/terraform/tutorial/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/terraform/tutorial/revert-configuration/","name":"6 – Revert configuration"}}]}
```
