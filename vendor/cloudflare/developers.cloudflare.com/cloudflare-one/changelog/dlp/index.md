---
title: Data Loss Prevention
description: Review recent changes to Cloudflare DLP.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Data Loss Prevention

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/dlp.xml) 

## 2026-06-11

  
**Define custom topics for AI prompt protection**   

You can now define custom topics for AI prompt protection. Predefined [AI prompt topics](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#ai-prompt-topics) cover common content and intent categories such as PII, source code, and jailbreak attempts. Custom topics let you detect unique or proprietary concepts that are not included in predefined categories.

You describe a custom topic in natural language, and Cloudflare DLP detects whether a prompt matches that topic based on context rather than specific keywords. For example, a topic that describes confidential merger discussions matches a prompt that paraphrases the deal, even when the prompt never uses the word merger or names the companies involved. To detect literal values such as internal codenames or product identifiers, use a [custom wordlist or pattern entry](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#custom-wordlist-datasets) instead.

Custom topics run through the same [application granular controls](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#granular-controls) path as predefined AI prompt topics. Custom topics are available for ChatGPT, Google Gemini, Perplexity, and Claude.

#### Create a custom AI prompt topic

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Data loss prevention** \> **Detection entries**.
2. Select **AI prompt topics**, then select **Custom Prompt Topic**.
3. Describe the topic in natural language. Be specific about the concept you want to detect. For example, describe unreleased product roadmap details or confidential customer contract terms.
4. Add this detection entry to an existing DLP profile, or [create a new DLP profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/#build-a-custom-profile).
5. Use the profile in a Gateway HTTP policy to log or block prompts that match the topic.

Note

Write the description as a concept to classify, not a list of keywords. For example, describe "internal financial forecasts and unreleased revenue figures" rather than listing specific document names.

For more information, refer to [AI prompt topics](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#ai-prompt-topics).

## 2026-04-30

  
**Classify sensitive content with Data Classification**   

Cloudflare DLP now includes **Data Classification**, which lets administrators organize and label sensitive content using labels, templates, and reusable data classes.

With Data Classification, administrators can define labels such as sensitivity schemas and levels, and data tag groups and tags. Administrators can also build from Cloudflare-managed templates and create reusable data classes that combine detection entries, other data classes, sensitivity levels, and data tags.

You can then use those classifications in custom DLP profiles to identify the severity of sensitive content, understand where it exists, and apply that logic consistently across DLP profiles.

For more information, refer to [Data Classification](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/).

## 2026-04-30

  
**New predefined detection entries are available**   

Cloudflare DLP now includes new predefined detection entries.

The expanded catalog includes detections for specific credential types, webhooks, addresses, tax identifiers, national IDs, financial data, and crypto wallets.

Examples include `GitHub PAT`, `OpenAI API Key`, `Slack Webhook`, `Discord Webhook`, `US Physical Address`, and `Bitcoin Wallet`.

For the full list, refer to [Predefined detection entries](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/predefined-detection-entries/).

## 2026-04-28

  
**Create and manage DLP detection entries outside of profiles**   

You can now create, view, and manage DLP detection entries outside of profiles.

Detection entries are no longer hidden inside individual profiles. Administrators can manage detection entries directly from the **Detection entries** section and use them in custom DLP profiles.

For more information, refer to [Configure detection entries](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/).

## 2026-04-28

  
**Detect PII records with a new predefined DLP profile**   

Cloudflare DLP now includes a new predefined profile designed to detect PII records that contain multiple types of personal data: **Personally Identifiable Information (PII) Record**.

Most predefined and custom DLP profiles match when any enabled detection entry matches. The **Personally Identifiable Information (PII) Record** profile is different. It only matches when at least three unique detection entries are found in close proximity, which reduces false positives from standalone values that may not represent a real PII record.

Detection entries included in the profile:

* AU Passport Number
* American Express Card Number
* Diners Club Card Number
* US Driver's License Number
* Email Address
* Full Name
* US Mailing Address
* Mastercard Card Number
* US Individual Tax Identification Number (ITIN)
* US Passport Number
* US Phone Number
* Union Pay Card Number
* United States SSN Numeric Detection
* Visa Card Number

For more information, refer to [predefined DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/).

## 2026-04-14

  
**DLP account-level settings**   

**Account-level DLP settings are now available** in Cloudflare One. You can now configure advanced DLP settings at the account level, including OCR, AI context analysis, and payload masking. This provides consistent enforcement across all DLP profiles and simplifies configuration management.

Key changes:

* **Consistent enforcement**: Settings configured at the account level apply to all DLP profiles
* **Simplified migration**: Settings enabled on any profile are automatically migrated to account level
* **Deprecation notice**: Profile-level advanced settings will be deprecated in a future release

**Migration details:**

During the migration period, if a setting is enabled on any profile, it will automatically be enabled at the account level. This means profiles that previously had a setting disabled may now have it enabled if another profile in the account had it enabled.

Settings are evaluated using OR logic - a setting is enabled if it is turned on at either the account level or the profile level. However, profile-level settings cannot be enabled when the account-level setting is off.

For more details, refer to the [DLP settings documentation](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-settings/).

## 2026-04-14

  
**Detect Cloudflare API tokens with DLP**   

The **Credentials and Secrets** DLP profile now includes three new predefined entries for detecting Cloudflare API credentials:

| Entry name                         | Token prefix | Detects                   |
| ---------------------------------- | ------------ | ------------------------- |
| Cloudflare User API Key            | cfk\_        | User-scoped API keys      |
| Cloudflare User API Token          | cfut\_       | User-scoped API tokens    |
| Cloudflare Account Owned API Token | cfat\_       | Account-scoped API tokens |

These detections target the new [Cloudflare API credential format](https://developers.cloudflare.com/fundamentals/api/get-started/token-formats/), which uses a structured prefix and a CRC32 checksum suffix. The identifiable prefix makes it possible to detect leaked credentials with high confidence and low false positive rates — no surrounding context such as `Authorization: Bearer` headers is required.

Credentials generated before this format change will not be matched by these entries.

#### How to enable Cloudflare API token detections

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **DLP** \> **DLP Profiles**.
2. Select the **Credentials and Secrets** profile.
3. Turn on one or more of the new Cloudflare API token entries.
4. Use the profile in a Gateway HTTP policy to log or block traffic containing these credentials.

Example policy:

| Selector    | Operator | Value                     | Action |
| ----------- | -------- | ------------------------- | ------ |
| DLP Profile | in       | _Credentials and Secrets_ | Block  |

You can also enable individual entries to scope detection to specific credential types — for example, enabling **Account Owned API Token** detection without enabling **User API Key** detection.

For more information, refer to [predefined DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/).

## 2026-04-14

  
**Configure how sensitive data appears in DLP payload logs**   

You can now configure how sensitive data matches are displayed in your DLP payload match logs — giving your incident response team the context they need to validate alerts without compromising your security posture.

To get started, go to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), select **Zero Trust** \> **Data loss prevention** \> **DLP settings** and find the **Payload log masking** card.

Previously, all DLP payload logs used a single masking mode that obscured matched data entirely and hid the original character count, making it difficult to distinguish true positives from false positives. This update introduces three options:

* **Full Mask (default):** Masks the match while preserving character count and visual formatting (for example, `***-**-****` for a Social Security Number). This is an improvement over the previous default, which did not preserve character count.
* **Partial Mask:** Reveals 25% of the matched content while masking the remainder (for example, `***-**-6789`).
* **Clear Text:** Stores the full, unmasked violation for deep investigation (for example, `123-45-6789`).

**Important:** The masking level you select is applied at detection time, before the payload is encrypted. This means the chosen format is what your team will see after decrypting the log with your private key — the existing encryption workflow is unchanged.

**Applies to all enabled detections:** When a masking level other than Full Mask is selected, it applies to all sensitive data matches found within a payload window — not just the match that triggered the policy. Any data matched by your enabled DLP detection entries will be masked at the selected level.

For more information, refer to [DLP logging options](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#log-the-payload-of-matched-rules).

## 2026-03-26

  
**Streaming ZIP file scanning removes per-file size limits**   

DLP now processes ZIP files using a streaming handler that scans archive contents element-by-element as data arrives. This removes previous file size limitations and improves memory efficiency when scanning large archives.

Microsoft Office documents (DOCX, XLSX, PPTX) also benefit from this improvement, as they use ZIP as a container format.

This improvement is automatic — no configuration changes are required.

## 2026-03-25

  
**Detect and sanitize HAR files**   

HTTP Archive (HAR) files are used by engineering and support teams to capture and share web traffic logs for troubleshooting. However, these files routinely contain highly sensitive data — including session cookies, authorization headers, and other credentials — that can pose a significant risk if uploaded to third-party services without being reviewed or cleaned first.

Gateway now includes a predefined DLP profile called **Unsanitized HAR** that detects HAR files in HTTP traffic. You can use this profile in a Gateway HTTP policy to either block HAR file uploads entirely or redirect users to a sanitization tool before allowing the upload to proceed.

#### How to configure a HAR file policy

In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall Policies** \> **HTTP** and create a new HTTP policy using the **DLP Profile** selector:

| Selector    | Operator | Value             | Action |
| ----------- | -------- | ----------------- | ------ |
| DLP Profile | in       | _Unsanitized HAR_ |        |

Then choose one of the following actions:

* **Block**: Prevents the upload of any HAR file that has not been sanitized by Cloudflare's sanitizer. Use this for strict environments where HAR file sharing must be disallowed entirely.
* **Block** with **Gateway Redirect**: Intercepts the upload and redirects the user to `https://har-sanitizer.pages.dev/`, where they can sanitize the file. Once sanitized, the user can re-upload the clean file and proceed with their workflow.

#### Sanitized HAR recognition

HAR files processed by the Cloudflare HAR sanitizer receive a tamper-evident sanitized marker. DLP recognizes this marker and will not re-trigger the policy on a file that has already been sanitized and has not been modified since. If a previously sanitized file is edited, it will be treated as unsanitized and flagged again.

#### Visibility in Gateway logs

Gateway logs will reflect whether a detected HAR file was classified as **Unsanitized** or **Sanitized**, giving your security team full visibility into HAR file activity across your organization.

For more information, refer to [predefined DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/).

## 2025-10-01

  
**Expanded File Type Controls for Executables and Disk Images**   

You can now enhance your security posture by blocking additional application installer and disk image file types with Cloudflare Gateway. Preventing the download of unauthorized software packages is a critical step in securing endpoints from malware and unwanted applications.

We have expanded Gateway's file type controls to include:

* Apple Disk Image (dmg)
* Microsoft Software Installer (msix, appx)
* Apple Software Package (pkg)

You can find these new options within the [_Upload File Types_ and _Download File Types_ selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#download-and-upload-file-types) when creating or editing an HTTP policy. The file types are categorized as follows:

* **System**: _Apple Disk Image (dmg)_
* **Executable**: _Microsoft Software Installer (msix)_, _Microsoft Software Installer (appx)_, _Apple Software Package (pkg)_

To ensure these file types are blocked effectively, please note the following behaviors:

* DMG: Due to their file structure, DMG files are blocked at the very end of the transfer. A user's download may appear to progress but will fail at the last moment, preventing the browser from saving the file.
* MSIX: To comprehensively block Microsoft Software Installers, you should also include the file type _Unscannable_. MSIX files larger than 100 MB are identified as Unscannable ZIP files during inspection.

To get started, go to your HTTP policies in Zero Trust. For a full list of file types, refer to [supported file types](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#supported-file-types).

## 2025-09-25

  
**Refine DLP Scans with New Body Phase Selector**   

You can now more precisely control your HTTP DLP policies by specifying whether to scan the request or response body, helping to reduce false positives and target specific data flows.

In the Gateway HTTP policy builder, you will find a new selector called _Body Phase_. This allows you to define the direction of traffic the DLP engine will inspect:

* _Request Body_: Scans data sent from a user's machine to an upstream service. This is ideal for monitoring data uploads, form submissions, or other user-initiated data exfiltration attempts.
* _Response Body_: Scans data sent to a user's machine from an upstream service. Use this to inspect file downloads and website content for sensitive data.

For example, consider a policy that blocks Social Security Numbers (SSNs). Previously, this policy might trigger when a user visits a website that contains example SSNs in its content (the response body). Now, by setting the **Body Phase** to _Request Body_, the policy will only trigger if the user attempts to upload or submit an SSN, ignoring the content of the web page itself.

All policies without this selector will continue to scan both request and response bodies to ensure continued protection.

For more information, refer to [Gateway HTTP policy selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#body-phase).

## 2025-08-25

  
**New DLP topic based detection entries for AI prompt protection**   

You now have access to a comprehensive suite of capabilities to secure your organization's use of generative AI. AI prompt protection introduces four key features that work together to provide deep visibility and granular control.

1. **Prompt Detection for AI Applications**

DLP can now natively detect and inspect user prompts submitted to popular AI applications, including **Google Gemini**, **ChatGPT**, **Claude**, and **Perplexity**.

1. **Prompt Analysis and Topic Classification**

Our DLP engine performs deep analysis on each prompt, applying [topic classification](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#ai-prompt-topics). These topics are grouped into two evaluation categories:

* **Content:** PII, Source Code, Credentials and Secrets, Financial Information, and Customer Data.
* **Intent:** Jailbreak attempts, requests for malicious code, or attempts to extract PII.

To help you apply these topics quickly, we have also released five new predefined profiles (for example, AI Prompt: AI Security, AI Prompt: PII) that bundle these new topics.

![DLP](https://developers.cloudflare.com/_astro/ai-prompt-detection-entry.4QmdkAuv_Z14HtSJ.webp) 
1. **Granular Guardrails**  
You can now build guardrails using Gateway HTTP policies with [application granular controls](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#granular-controls). Apply a DLP profile containing an [AI prompt topic detection](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#ai-prompt-topics) to individual AI applications (for example, `ChatGPT`) and specific user actions (for example, `SendPrompt`) to block sensitive prompts.  
![DLP](https://developers.cloudflare.com/_astro/ai-prompt-policy.CF3H2rbK_2muoEC.webp)
2. **Full Prompt Logging**  
To aid in incident investigation, an optional setting in your Gateway policy allows you to [capture prompt logs](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#log-generative-ai-prompt-content) to store the full interaction of prompts that trigger a policy match. To make investigations easier, logs can be filtered by `conversation_id`, allowing you to reconstruct the full context of an interaction that led to a policy violation.  
![DLP](https://developers.cloudflare.com/_astro/ai-prompt-log.ywQDc5qN_2v6nax.webp)

AI prompt protection is now available in open beta. To learn more about it, read the [blog ↗](https://blog.cloudflare.com/ai-prompt-protection/#closing-the-loop-logging) or refer to [AI prompt topics](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#ai-prompt-topics).

## 2025-07-17

  
**New detection entry type: Document Matching for DLP**   

You can now create [document-based](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#document-entries) detection entries in DLP by uploading example documents. Cloudflare will encrypt your documents and create a unique fingerprint of the file. This fingerprint is then used to identify similar documents or snippets within your organization's traffic and stored files.

![DLP](https://developers.cloudflare.com/_astro/document-match.CcN8pGgR_Z1e3PDm.webp) 

**Key features and benefits:**

* **Upload documents, forms, or templates:** Easily upload .docx and .txt files (up to 10 MB) that contain sensitive information you want to protect.
* **Granular control with similarity percentage:** Define a minimum similarity percentage (0-100%) that a document must meet to trigger a detection, reducing false positives.
* **Comprehensive coverage:** Apply these document-based detection entries in:  
   * **Gateway policies:** To inspect network traffic for sensitive documents as they are uploaded or shared.  
   * **CASB (Cloud Access Security Broker):** To scan files stored in cloud applications for sensitive documents at rest.
* **Identify sensitive data:** This new detection entry type is ideal for identifying sensitive data within completed forms, templates, or even small snippets of a larger document, helping you prevent data exfiltration and ensure compliance.

Once uploaded and processed, you can add this new document entry into a DLP profile and policies to enhance your data protection strategy.

## 2025-06-23

  
**Data Security Analytics in the Zero Trust dashboard**   

Zero Trust now includes **Data security analytics**, providing you with unprecedented visibility into your organization sensitive data.

The new dashboard includes:

* **Sensitive Data Movement Over Time:**  
   * See patterns and trends in how sensitive data moves across your environment. This helps understand where data is flowing and identify common paths.
* **Sensitive Data at Rest in SaaS & Cloud:**  
   * View an inventory of sensitive data stored within your corporate SaaS applications (for example, Google Drive, Microsoft 365) and cloud accounts (such as AWS S3).
* **DLP Policy Activity:**  
   * Identify which of your Data Loss Prevention (DLP) policies are being triggered most often.  
   * See which specific users are responsible for triggering DLP policies.
![Data Security Analytics](https://developers.cloudflare.com/_astro/cf1-data-security-analytics-v1.BGl6fYXl_H3N0P.webp) 

To access the new dashboard, log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/) and go to **Insights** on the sidebar.

## 2025-05-12

  
**Case Sensitive Custom Word Lists**   

You can now configure [custom word lists](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#custom-wordlist-datasets) to enforce case sensitivity. This setting supports flexibility where needed and aims to reduce false positives where letter casing is critical.

![dlp](https://developers.cloudflare.com/_astro/case-sesitive-cwl.MPuOc_3r_220dca.webp) 

## 2025-05-07

  
**Send forensic copies to storage without DLP profiles**   

You can now [send DLP forensic copies](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#send-dlp-forensic-copies-to-logpush-destination) to third-party storage for any HTTP policy with an `Allow` or `Block` action, without needing to include a DLP profile. This change increases flexibility for data handling and forensic investigation use cases.

By default, Gateway will send all matched HTTP requests to your configured DLP Forensic Copy jobs.

![DLP](https://developers.cloudflare.com/_astro/forensic-copies-for-all.fxeFrCY4_Z1rCUy9.webp) 

## 2025-04-14

  
**New predefined detection entry for ICD-11**   

You now have access to the World Health Organization (WHO) 2025 edition of the [International Classification of Diseases 11th Revision (ICD-11) ↗](https://www.who.int/news/item/14-02-2025-who-releases-2025-update-to-the-international-classification-of-diseases-%28icd-11%29) as a predefined detection entry. The new dataset can be found in the [Health Information](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/#health-information) predefined profile.

ICD-10 dataset remains available for use.

## 2025-02-03

  
**Block files that are password-protected, compressed, or otherwise unscannable.**   

Gateway HTTP policies can now block files that are password-protected, compressed, or otherwise unscannable.

These unscannable files are now matched with the [Download and Upload File Types traffic selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#download-and-upload-file-types) for HTTP policies:

* Password-protected Microsoft Office document
* Password-protected PDF
* Password-protected ZIP archive
* Unscannable ZIP archive

To get started inspecting and modifying behavior based on these and other rules, refer to [HTTP filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/http/).

## 2025-01-20

  
**Detect source code leaks with Data Loss Prevention**   

You can now detect source code leaks with Data Loss Prevention (DLP) with predefined checks against common programming languages.

The following programming languages are validated with natural language processing (NLP).

* C
* C++
* C#
* Go
* Haskell
* Java
* JavaScript
* Lua
* Python
* R
* Rust
* Swift

DLP also supports confidence level for [source code profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/#source-code).

For more details, refer to [DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/).

## 2025-01-15

**Payload log match visibility**

When viewing decrypted payload log matches, DLP now provides more context by listing multiple DLP matches and the matching DLP profile.

## 2024-11-25

**Profile confidence levels**

DLP profiles now support setting a [confidence level](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/advanced-settings/#confidence-levels) to choose how tolerant its detections are to false positives based on the context of the detection. The higher a profile's confidence level is, the less false positives will be allowed. Confidence levels include Low, Medium, or High. DLP profile confidence levels supersede [context analysis](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/advanced-settings/#context-analysis).

## 2024-11-01

**Send entire HTTP requests to a Logpush destination**

In addition to [logging the payload](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#log-the-payload-of-matched-rules) from HTTP requests that matched a DLP policy in Cloudflare Logs, Enterprise users can now configure a [Logpush job](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/logging-options/#send-dlp-forensic-copies-to-logpush-destination) to send the entire HTTP request that triggered a DLP match to a storage destination. This allows long-term storage of full requests for use in forensic investigation.

## 2024-09-03

**Exact Data Match multi-entry upload support**

You can now upload files with [multiple columns of data](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#upload-a-new-exact-data-match-dataset) as Exact Data Match datasets. DLP can use each column as a separate existing detection entry.

## 2024-05-23

**Data-at-rest DLP for Box and Dropbox**

You can now scan your [Box](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/box/#data-loss-prevention-optional) and [Dropbox](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/dropbox/#data-loss-prevention-optional) files for DLP matches.

## 2024-04-16

**Optical character recognition**

DLP can now [detect sensitive data](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/advanced-settings/#optical-character-recognition-ocr) in jpeg, jpg, and png files. This helps companies prevent the leak of sensitive data in images, such as screenshots.

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/cloudflare-one/changelog/dlp/#page","headline":"DLP Changelog · Cloudflare One docs","description":"Review recent changes to Cloudflare DLP.","url":"https://developers.cloudflare.com/cloudflare-one/changelog/dlp/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/changelog/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/changelog/dlp/","name":"Data Loss Prevention"}}]}
```
