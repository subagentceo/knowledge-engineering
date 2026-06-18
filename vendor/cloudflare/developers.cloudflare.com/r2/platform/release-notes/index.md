---
title: Release notes
description: Latest changes and updates to Cloudflare R2 object storage.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Release notes

[ Subscribe to RSS ](https://developers.cloudflare.com/r2/platform/release-notes/index.xml)

## 2026-04-27

* You can now [empty a bucket](https://developers.cloudflare.com/r2/buckets/delete-buckets/) or [delete folders](https://developers.cloudflare.com/r2/objects/delete-objects/#delete-a-folder) directly from the R2 dashboard without writing scripts or configuring lifecycle rules.

## 2025-09-23

* Fixed a bug where you could attempt to delete objects even if they had a bucket lock rule applied on the dashboard. Previously, they would momentarily vanish from the table but reappear after a page refresh. Now, the delete action is disabled on locked objects in the dashboard.

## 2025-09-22

* We’ve updated the R2 dashboard with a cleaner look to make it easier to find what you need and take action. You can find instructions for how you can use R2 with the various API interfaces in the side panel, and easily access documentation at the bottom.

## 2025-07-03

* The CRC-64/NVME Checksum algorithm is now supported for both single and multipart objects. This also brings support for the `FULL_OBJECT` Checksum Type on Multipart Uploads. See Checksum Type Compatibility [here](https://developers.cloudflare.com/r2/api/s3/api/).

## 2024-12-03

* [Server-side Encryption with Customer-Provided Keys](https://developers.cloudflare.com/r2/examples/ssec/) is now available to all users via the Workers and S3-compatible APIs.

## 2024-11-21

* Sippy can now be enabled on buckets in [jurisdictions](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions) (e.g., EU, FedRAMP).
* Fixed an issue with Sippy where GET/HEAD requests to objects with certain special characters would result in error responses.

## 2024-11-20

* Oceania (OC) is now available as an R2 region.
* The default maximum number of buckets per account is now 1 million. If you need more than 1 million buckets, contact [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).
* Public buckets accessible via custom domain now support Smart [Tiered Cache](https://developers.cloudflare.com/r2/buckets/public-buckets/#caching).

## 2024-11-19

* R2 [bucket lifecycle command](https://developers.cloudflare.com/workers/wrangler/commands/#r2-bucket-lifecycle-add) added to Wrangler. Supports listing, adding, and removing object lifecycle rules.

## 2024-11-14

* R2 [bucket info command](https://developers.cloudflare.com/workers/wrangler/commands/r2-bucket-info) added to Wrangler. Displays location of bucket and common metrics.

## 2024-11-08

* R2 [bucket dev-url command](https://developers.cloudflare.com/workers/wrangler/commands/#r2-bucket-dev-url-enable) added to Wrangler. Supports enabling, disabling, and getting status of bucket's [r2.dev public access URL](https://developers.cloudflare.com/r2/buckets/public-buckets/#enable-managed-public-access).

## 2024-11-06

* R2 [bucket domain command](https://developers.cloudflare.com/workers/wrangler/commands/#r2-bucket-domain-add) added to Wrangler. Supports listing, adding, removing, and updating [R2 bucket custom domains](https://developers.cloudflare.com/r2/buckets/public-buckets/#custom-domains).

## 2024-11-01

* Add `minTLS` to response of [list custom domains](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/custom/methods/list/) endpoint.

## 2024-10-28

* Add [get custom domain](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/custom/methods/get/) endpoint.

## 2024-10-21

* Event notifications can now be configured for R2 buckets in [jurisdictions](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions) (e.g., EU, FedRAMP).

## 2024-09-26

* [Event notifications for R2](https://blog.cloudflare.com/builder-day-2024-announcements/#event-notifications-for-r2-is-now-ga) is now generally available. Event notifications now support higher throughput (up to 5,000 messages per second per Queue), can be configured in the dashboard and Wrangler, and support for lifecycle deletes.

## 2024-09-18

* Add the ability to set and [update minimum TLS version](https://developers.cloudflare.com/r2/buckets/public-buckets/#minimum-tls-version) for R2 bucket custom domains.

## 2024-08-26

* Added support for configuring R2 bucket custom domains via [API](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/custom/methods/create/).

## 2024-08-21

* [Sippy](https://developers.cloudflare.com/r2/data-migration/sippy/) is now generally available. Metrics for ongoing migrations can now be found in the dashboard or via the GraphQL analytics API.

## 2024-07-08

* Added migration log for [Super Slurper](https://developers.cloudflare.com/r2/data-migration/super-slurper/) to the migration summary in the dashboard.

## 2024-06-12

* [Super Slurper](https://developers.cloudflare.com/r2/data-migration/super-slurper/) now supports migrating objects up to 1TB in size.

## 2024-06-07

* Fixed an issue that prevented Sippy from copying over objects from S3 buckets with SSE set up.

## 2024-06-06

* R2 will now ignore the `x-purpose` request parameter.

## 2024-05-29

* Added support for [Infrequent Access](https://developers.cloudflare.com/r2/buckets/storage-classes/) storage class (beta).

## 2024-05-24

* Added [create temporary access tokens](https://developers.cloudflare.com/api/resources/r2/subresources/temporary%5Fcredentials/methods/create/) endpoint.

## 2024-04-03

* [Event notifications](https://developers.cloudflare.com/r2/buckets/event-notifications/) for R2 is now available as an open beta.
* Super Slurper now supports migration from [Google Cloud Storage](https://developers.cloudflare.com/r2/data-migration/super-slurper/#supported-cloud-storage-providers).

## 2024-02-20

* When an `OPTIONS` request against the public entrypoint does not include an `origin` header, an `HTTP 400` instead of an `HTTP 401` is returned.

## 2024-02-06

* The response shape of `GET /buckets/:bucket/sippy` has changed.
* The `/buckets/:bucket/sippy/validate` endpoint is exposed over APIGW to validate Sippy's configuration.
* The shape of the configuration object when modifying Sippy's configuration has changed.

## 2024-02-02

* Updated [GetBucket](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/methods/get/) endpoint: Now fetches by `bucket_name` instead of `bucket_id`.

## 2024-01-30

* Fixed a bug where the API would accept empty strings in the `AllowedHeaders` property of `PutBucketCors` actions.

## 2024-01-26

* Parts are now automatically sorted in ascending order regardless of input during `CompleteMultipartUpload`.

## 2024-01-11

* Sippy is available for Google Cloud Storage (GCS) beta.

## 2023-12-11

* The `x-id` query param for `S3 ListBuckets` action is now ignored.
* The `x-id` query param is now ignored for all S3 actions.

## 2023-10-23

* `PutBucketCors` now only accepts valid origins.

## 2023-09-01

* Fixed an issue with `ListBuckets` where the `name_contains` parameter would also search over the jurisdiction name.

## 2023-08-23

* Config Audit Logs GA.

## 2023-08-11

* Users can now complete conditional multipart publish operations. When a condition failure occurs when publishing an upload, the upload is no longer available and is treated as aborted.

## 2023-07-05

* Improved performance for ranged reads on very large files. Previously ranged reads near the end of very large files would be noticeably slower than ranged reads on smaller files. Performance should now be consistently good independent of filesize.

## 2023-06-21

* [Multipart ETags](https://developers.cloudflare.com/r2/objects/upload-objects/#etags) are now MD5 hashes.

## 2023-06-16

* Fixed a bug where calling [GetBucket](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/methods/get/) on a non-existent bucket would return a 500 instead of a 404.
* Improved S3 compatibility for ListObjectsV1, now nextmarker is only set when truncated is true.
* The R2 worker bindings now support parsing conditional headers with multiple etags. These etags can now be strong, weak or a wildcard. Previously the bindings only accepted headers containing a single strong etag.
* S3 putObject now supports sha256 and sha1 checksums. These were already supported by the R2 worker bindings.
* CopyObject in the S3 compatible api now supports Cloudflare specific headers which allow the copy operation to be conditional on the state of the destination object.

## 2023-04-01

* [GetBucket](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/methods/get/) is now available for use through the Cloudflare API.
* [Location hints](https://developers.cloudflare.com/r2/reference/data-location/) can now be set when creating a bucket, both through the S3 API, and the dashboard.

## 2023-03-16

* The ListParts API has been implemented and is available for use.
* HTTP2 is now enabled by default for new custom domains linked to R2 buckets.
* Object Lifecycles are now available for use.
* Bug fix: Requests to public buckets will now return the `Content-Encoding` header for gzip files when `Accept-Encoding: gzip` is used.

## 2023-01-27

* R2 authentication tokens created via the R2 token page are now scoped to a single account by default.

## 2022-12-07

* Fix CORS preflight requests for the S3 API, which allows using the S3 SDK in the browser.
* Passing a range header to the `get` operation in the R2 bindings API should now work as expected.

## 2022-11-30

* Requests with the header `x-amz-acl: public-read` are no longer rejected.
* Fixed issues with wildcard CORS rules and presigned URLs.
* Fixed an issue where `ListObjects` would time out during delimited listing of unicode-normalized keys.
* S3 API's `PutBucketCors` now rejects requests with unknown keys in the XML body.
* Signing additional headers no longer breaks CORS preflight requests for presigned URLs.

## 2022-11-21

* Fixed a bug in `ListObjects` where `startAfter` would skip over objects with keys that have numbers right after the `startAfter` prefix.
* Add worker bindings for multipart uploads.

## 2022-11-17

* Unconditionally return HTTP 206 on ranged requests to match behavior of other S3 compatible implementations.
* Fixed a CORS bug where `AllowedHeaders` in the CORS config were being treated case-sensitively.

## 2022-11-08

* Copying multipart objects via `CopyObject` is re-enabled.
* `UploadPartCopy` is re-enabled.

## 2022-10-28

* Multipart upload part sizes are always expected to be of the same size, but this enforcement is now done when you complete an upload instead of being done very time you upload a part.
* Fixed a performance issue where concurrent multipart part uploads would get rejected.

## 2022-10-26

* Fixed ranged reads for multipart objects with part sizes unaligned to 64KiB.

## 2022-10-19

* `HeadBucket` now sets `x-amz-bucket-region` to `auto` in the response.

## 2022-10-06

* Temporarily disabled `UploadPartCopy` while we investigate an issue.

## 2022-09-29

* Fixed a CORS issue where `Access-Control-Allow-Headers` was not being set for preflight requests.

## 2022-09-28

* Fixed a bug where CORS configuration was not being applied to S3 endpoint.
* No-longer render the `Access-Control-Expose-Headers` response header if `ExposeHeader` is not defined.
* Public buckets will no-longer return the `Content-Range` response header unless the response is partial.
* Fixed CORS rendering for the S3 `HeadObject` operation.
* Fixed a bug where no matching CORS configuration could result in a `403` response.
* Temporarily disable copying objects that were created with multipart uploads.
* Fixed a bug in the Workers bindings where an internal error was being returned for malformed ranged `.get` requests.

## 2022-09-27

* CORS preflight responses and adding CORS headers for other responses is now implemented for S3 and public buckets. Currently, the only way to configure CORS is via the S3 API.
* Fixup for bindings list truncation to work more correctly when listing keys with custom metadata that have `"` or when some keys/values contain certain multi-byte UTF-8 values.
* The S3 `GetObject` operation now only returns `Content-Range` in response to a ranged request.

## 2022-09-19

* The R2 `put()` binding options can now be given an `onlyIf` field, similar to `get()`, that performs a conditional upload.
* The R2 `delete()` binding now supports deleting multiple keys at once.
* The R2 `put()` binding now supports user-specified SHA-1, SHA-256, SHA-384, SHA-512 checksums in options.
* User-specified object checksums will now be available in the R2 `get()` and `head()` bindings response. MD5 is included by default for non-multipart uploaded objects.

## 2022-09-06

* The S3 `CopyObject` operation now includes `x-amz-version-id` and `x-amz-copy-source-version-id` in the response headers for consistency with other methods.
* The `ETag` for multipart files uploaded until shortly after Open Beta uploaded now include the number of parts as a suffix.

## 2022-08-17

* The S3 `DeleteObjects` operation no longer trims the space from around the keys before deleting. This would result in files with leading / trailing spaces not being able to be deleted. Additionally, if there was an object with the trimmed key that existed it would be deleted instead. The S3 `DeleteObject` operation was not affected by this.
* Fixed presigned URL support for the S3 `ListBuckets` and `ListObjects` operations.

## 2022-08-06

* Uploads will automatically infer the `Content-Type` based on file body if one is not explicitly set in the `PutObject` request. This functionality will come to multipart operations in the future.

## 2022-07-30

* Fixed S3 conditionals to work properly when provided the `LastModified` date of the last upload, bindings fixes will come in the next release.
* `If-Match` / `If-None-Match` headers now support arrays of ETags, Weak ETags and wildcard (`*`) as per the HTTP standard and undocumented AWS S3 behavior.

## 2022-07-21

* Added dummy implementation of the following operation that mimics the response that a basic AWS S3 bucket will return when first created: `GetBucketAcl`.

## 2022-07-20

* Added dummy implementations of the following operations that mimic the response that a basic AWS S3 bucket will return when first created:  
   * `GetBucketVersioning`  
   * `GetBucketLifecycleConfiguration`  
   * `GetBucketReplication`  
   * `GetBucketTagging`  
   * `GetObjectLockConfiguration`

## 2022-07-19

* Fixed an S3 compatibility issue for error responses with MinIO .NET SDK and any other tooling that expects no `xmlns` namespace attribute on the top-level `Error` tag.
* List continuation tokens prior to 2022-07-01 are no longer accepted and must be obtained again through a new `list` operation.
* The `list()` binding will now correctly return a smaller limit if too much data would otherwise be returned (previously would return an `Internal Error`).

## 2022-07-14

* Improvements to 500s: we now convert errors, so things that were previously concurrency problems for some operations should now be `TooMuchConcurrency` instead of `InternalError`. We've also reduced the rate of 500s through internal improvements.
* `ListMultipartUpload` correctly encodes the returned `Key` if the `encoding-type` is specified.

## 2022-07-13

* S3 XML documents sent to R2 that have an XML declaration are not rejected with `400 Bad Request` / `MalformedXML`.
* Minor S3 XML compatibility fix impacting Arq Backup on Windows only (not the Mac version). Response now contains XML declaration tag prefix and the xmlns attribute is present on all top-level tags in the response.
* Beta `ListMultipartUploads` support.

## 2022-07-06

* Support the `r2_list_honor_include` compat flag coming up in an upcoming runtime release (default behavior as of 2022-07-14 compat date). Without that compat flag/date, list will continue to function implicitly as `include: ['httpMetadata', 'customMetadata']` regardless of what you specify.
* `cf-create-bucket-if-missing` can be set on a `PutObject`/`CreateMultipartUpload` request to implicitly create the bucket if it does not exist.
* Fix S3 compatibility with MinIO client spec non-compliant XML for publishing multipart uploads. Any leading and trailing quotes in `CompleteMultipartUpload` are now optional and ignored as it seems to be the actual non-standard behavior AWS implements.

## 2022-07-01

* Unsupported search parameters to `ListObjects`/`ListObjectsV2` are now rejected with `501 Not Implemented`.
* Fixes for Listing:  
   * Fix listing behavior when the number of files within a folder exceeds the limit (you'd end up seeing a CommonPrefix for that large folder N times where N = number of children within the CommonPrefix / limit).  
   * Fix corner case where listing could cause objects with sharing the base name of a "folder" to be skipped.  
   * Fix listing over some files that shared a certain common prefix.
* `DeleteObjects` can now handle 1000 objects at a time.
* S3 `CreateBucket` request can specify `x-amz-bucket-object-lock-enabled` with a value of `false` and not have the requested rejected with a `NotImplemented`error. A value of `true` will continue to be rejected as R2 does not yet support object locks.

## 2022-06-17

* Fixed a regression for some clients when using an empty delimiter.
* Added support for S3 pre-signed URLs.

## 2022-06-16

* Fixed a regression in the S3 API `UploadPart` operation where `TooMuchConcurrency`& `NoSuchUpload` errors were being returned as `NoSuchBucket`.

## 2022-06-13

* Fixed a bug with the S3 API `ListObjectsV2` operation not returning empty folder/s as common prefixes when using delimiters.
* The S3 API `ListObjectsV2` `KeyCount` parameter now correctly returns the sum of keys and common prefixes rather than just the keys.
* Invalid cursors for list operations no longer fail with an `InternalError` and now return the appropriate error message.

## 2022-06-10

* The `ContinuationToken` field is now correctly returned in the response if provided in a S3 API `ListObjectsV2` request.
* Fixed a bug where the S3 API `AbortMultipartUpload` operation threw an error when called multiple times.

## 2022-05-27

* Fixed a bug where the S3 API's `PutObject` or the `.put()` binding could fail but still show the bucket upload as successful.
* If [conditional headers](https://datatracker.ietf.org/doc/html/rfc7232) are provided to S3 API `UploadObject` or `CreateMultipartUpload` operations, and the object exists, a `412 Precondition Failed` status code will be returned if these checks are not met.

## 2022-05-20

* Fixed a bug when `Accept-Encoding` was being used in `SignedHeaders`when sending requests to the S3 API would result in a `SignatureDoesNotMatch`response.

## 2022-05-17

* Fixed a bug where requests to the S3 API were not handling non-encoded parameters used for the authorization signature.
* Fixed a bug where requests to the S3 API where number-like keys were being parsed as numbers instead of strings.

## 2022-05-16

* Add support for S3 [virtual-hosted style paths](https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html), such as `<BUCKET>.<ACCOUNT_ID>.r2.cloudflarestorage.com` instead of path-based routing (`<ACCOUNT_ID>.r2.cloudflarestorage.com/<BUCKET>`).
* Implemented `GetBucketLocation` for compatibility with external tools, this will always return a `LocationConstraint` of `auto`.

## 2022-05-06

* S3 API `GetObject` ranges are now inclusive (`bytes=0-0` will correctly return the first byte).
* S3 API `GetObject` partial reads return the proper `206 Partial Content` response code.
* Copying from a non-existent key (or from a non-existent bucket) to another bucket now returns the proper `NoSuchKey` / `NoSuchBucket` response.
* The S3 API now returns the proper `Content-Type: application/xml` response header on relevant endpoints.
* Multipart uploads now have a `-N` suffix on the etag representing the number of parts the file was published with.
* `UploadPart` and `UploadPartCopy` now return proper error messages, such as `TooMuchConcurrency` or `NoSuchUpload`, instead of 'internal error'.
* `UploadPart` can now be sent a 0-length part.

## 2022-05-05

* When using the S3 API, an empty string and `us-east-1` will now alias to the `auto` region for compatibility with external tools.
* `GetBucketEncryption`, `PutBucketEncryption` and `DeleteBucketEncrypotion` are now supported (the only supported value currently is `AES256`).
* Unsupported operations are explicitly rejected as unimplemented rather than implicitly converting them into `ListObjectsV2`/`PutBucket`/`DeleteBucket` respectively.
* S3 API `CompleteMultipartUploads` requests are now properly escaped.

## 2022-05-03

* Pagination cursors are no longer returned when the keys in a bucket is the same as the `MaxKeys` argument.
* The S3 API `ListBuckets` operation now accepts `cf-max-keys`, `cf-start-after` and `cf-continuation-token` headers behave the same as the respective URL parameters.
* The S3 API `ListBuckets` and `ListObjects` endpoints now allow `per_page` to be 0.
* The S3 API `CopyObject` source parameter now requires a leading slash.
* The S3 API `CopyObject` operation now returns a `NoSuchBucket` error when copying to a non-existent bucket instead of an internal error.
* Enforce the requirement for `auto` in SigV4 signing and the `CreateBucket` `LocationConstraint` parameter.
* The S3 API `CreateBucket` operation now returns the proper `location` response header.

## 2022-04-14

* The S3 API now supports unchunked signed payloads.
* Fixed `.put()` for the Workers R2 bindings.
* Fixed a regression where key names were not properly decoded when using the S3 API.
* Fixed a bug where deleting an object and then another object which is a prefix of the first could result in errors.
* The S3 API `DeleteObjects` operation no longer returns an error even though an object has been deleted in some cases.
* Fixed a bug where `startAfter` and `continuationToken` were not working in list operations.
* The S3 API `ListObjects` operation now correctly renders `Prefix`, `Delimiter`, `StartAfter` and `MaxKeys` in the response.
* The S3 API `ListObjectsV2` now correctly honors the `encoding-type` parameter.
* The S3 API `PutObject` operation now works with `POST` requests for `s3cmd` compatibility.

## 2022-04-04

* The S3 API `DeleteObjects` request now properly returns a `MalformedXML`error instead of `InternalError` when provided with more than 128 keys.

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/r2/platform/release-notes/#page","headline":"Release notes · Cloudflare R2 docs","description":"Latest changes and updates to Cloudflare R2 object storage.","url":"https://developers.cloudflare.com/r2/platform/release-notes/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/platform/release-notes/","name":"Release notes"}}]}
```
