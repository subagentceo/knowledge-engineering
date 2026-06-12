# Cloud Storage FUSE configuration file

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Storage
*   Cloud Storage
*   Reference

Send feedback

# Cloud Storage FUSE configuration file Stay organized with collections Save and categorize content based on your preferences.

This document describes how to use a Cloud Storage FUSE configuration file to configure the behavior of Cloud Storage FUSE in a persistent manner. To use the configuration file, specify the path to the configuration file in the `--config-file` option when you run the `gcsfuse` command.

The Cloud Storage FUSE configuration file is a YAML file that uses the following format and fields. Behavior controlled by the configuration file fields can also be set using the Cloud Storage FUSE CLI.

**Note:** For specific high-performance machine types, some fields are automatically set to specific values by default to maximize performance. Values that are manually set at the time of mount will override these defaults. For more information, see Automated configuration values for high-performance machine types.

## Cloud Storage FUSE configuration file format and fields

The following YAML configuration example shows the format and fields available in Cloud Storage FUSE.

app-name: "APP_NAME"
logging:
  file-path: "FILE_PATH"
  format: FORMAT
  severity: SEVERITY
  log-rotate:
    max-file-size-mb: MAX_FILE_SIZE
    backup-file-count: BACKUP_FILE_COUNT
    compress: COMPRESS
cache-dir: "CACHE_DIR"
file-cache:
  max-size-mb: MAX_SIZE
  cache-file-for-range-read: CACHE_FILE_FOR_RANGE_READ
  enable-parallel-downloads: ENABLE_PARALLEL_DOWNLOADS
  exclude-regex: EXCLUDE_REGEX
  include-regex: INCLUDE_REGEX
  parallel-downloads-per-file: PARALLEL_DOWNLOADS_PER_FILE
  max-parallel-downloads: MAX_PARALLEL_DOWNLOADS
  download-chunk-size-mb: DOWNLOAD_CHUNK_SIZE
metadata-cache:
  negative-ttl-secs: ENABLE_NEGATIVE_TTL_SECS
  stat-cache-max-size-mb: STAT_CACHE_MAX_SIZE
  ttl-secs: TTL_SECS
  enable-metadata-prefetch: ENABLE_METADATA_PREFETCH
  metadata-prefetch-entries-limit: METADATA_PREFETCH_ENTRIES_LIMIT
  metadata-prefetch-max-workers: METADATA_PREFETCH_MAX_WORKERS
only-dir: "ONLY_DIR"
gcs-auth:
  anonymous-access: ANONYMOUS_ACCESS
  key-file: "KEY_FILE"
  reuse-token-from-url: REUSE_TOKEN_FROM_URL
  token-url: "TOKEN_URL"
gcs-connection:
  billing-project: "BILLING_PROJECT"
  client-protocol: CLIENT_PROTOCOL
  custom-endpoint: "CUSTOM_ENDPOINT"
  http-client-timeout: HTTP_CLIENT_TIMEOUT
  limit-bytes-per-sec: "LIMIT_BYTES_PER_SEC"
  limit-ops-per-sec: "LIMIT_OPS_PER_SEC"
  max-conns-per-host: MAX_CONNS_PER_HOST
  max-idle-conns-per-host: MAX_IDLE_CONNS_PER_HOST
  sequential-read-size-mb: SEQUENTIAL_READ_SIZE
implicit-dirs: IMPLICIT_DIRS
file-system:
  kernel-list-cache-ttl-secs: KERNEL_LIST_CACHE_TTL_SECS
  ignore-interrupts: IGNORE_INTERRUPTS
  dir-mode: "DIR_MODE"
  file-mode: "FILE_MODE"
  fuse-options: FUSE_OPTIONS
  gid: GID
  rename-dir-limit: RENAME_DIR_LIMIT
  temp-dir: "TEMP_DIR"
  uid: UID
foreground: FOREGROUND
gcs-retries:
  max-retry-attempts: MAX_RETRY_ATTEMPTS
  max-retry-sleep: MAX_RETRY_SLEEP
  multiplier: "MULTIPLIER"
metrics:
  cloud-metrics-export-interval-secs: CLOUD_METRICS_EXPORT_INTERVAL
  prometheus-port: PROMETHEUS_PORT
debug:
  log-mutex: LOG_MUTEX
  exit-on-invariant-violation: EXIT_ON_INVARIANT_VIOLATION
write:
  enable-streaming-writes: STREAMING_WRITES
  global-max-blocks: MAXIMUM_GLOBAL_BLOCKS
read:
  enable-buffered-read: ENABLE_BUFFERED_READ
  global-max-blocks: MAXIMUM_GLOBAL_READ_BLOCKS
profile: PROFILE

## Cloud Storage FUSE configuration file fields

The following table describes the fields you can specify in your Cloud Storage FUSE configuration file. Unless stated otherwise, all fields are optional.

Field

Description

Valid value

Default value

### app-name

The application name of the mount.

String value, for example: `"my-bucket-mount"`.

""

### file-path

The path to the log file where logs will be written. If this field is unspecified, the logs are routed to `stdout` when Cloud Storage FUSE runs in foreground mode and to `syslogs` when Cloud Storage FUSE runs in background mode.

String value, for example: `"/var/log"`.

""

### format

Specifies the format of the log file.

*   `text`
*   `json`

`json`

### severity

The severity level you want Cloud Storage FUSE to generate logs for. The severity levels are ordered from lowest severity to highest severity. For example, when you specify `warning`, Cloud Storage FUSE generates logs for warnings and errors. Generally, we recommend using the `info` severity level.

**Note:** If you specify `--debug_mutex` as part of your command, the severity level is automatically set to `trace` and overrides `log-severity`.

**Note:** Using either the `trace` or `debug` severity levels when file caching is enabled can result in performance degradation due to logging overhead and should only be used temporarily such as during troubleshooting.

*   `off`: disables all logging.
*   `error`: contains messages about serious issues that prevent Cloud Storage FUSE from completing an operation, or indicate a failure such as mount failures, permission errors, and critical input/output (I/O) errors.
*   `warning`: contains messages indicating potential issues that aren't critical but can lead to issues if not addressed. Potential issues include non-fatal connection issues, deprecation warnings, resource contention that might cause slight performance degradation, and retries for transient failures. This severity level also includes information provided in the `error` severity level.
*   `info`: contains logging information such as startup and shutdown messages, or information about successful mount operations, progress updates, and configuration settings. This severity level also includes information about the `warning` and `error` severity levels.
*   `debug`: contains logging information such as startup and shutdown messages, or information about successful mount operations, progress updates, and configuration settings. This severity level also includes the information provided in the `info`, `warning`, and `error` severity levels.
*   `trace`: contains granular details about each Cloud Storage FUSE operation and function call, outlining the `gcsfuse` interaction with the kernel FUSE driver and Cloud Storage. This severity level also includes the details provided in `debug`, `info`, `warning`, and `error` severity levels.

`info`

### max-file-size-mb

The maximum size in megabytes (MB) that log files can reach before being rotated.

Integer. The minimum value is `1`.

`512`

### backup-file-count

The maximum number of rotated log files to retain, excluding the active file that logs are written to.

*   Integer
*   `0`: Retains all rotated log files

`10`

### compress

Specifies whether rotated log files are compressed using `gzip`.

Boolean value: `true`, `false`

`true`

### cache-dir

Enables the file cache and specifies the directory for storing file cache data.

**Note**: The Cloud Storage FUSE CSI driver for Google Kubernetes Engine uses a different method to enable file caching. To learn how to enable file caching on Google Kubernetes Engine, see File caching in Cloud Storage FUSE.

A path, for example: `"/tmp/gcsfuse-cache-path"`. An empty value indicates this field is disabled. This field is disabled by default.

### max-size-mb

Specifies the maximum size in MiB that the file cache can use and lets you limit the total capacity the file cache can use within its mounted directory.

**Note**: Before you set the `file-cache:max-size-mb` field, you must first specify the `cache-dir` field. For Compute Engine VMs (including standalone Cloud Storage FUSE or non-Google Kubernetes Engine based deployments), enabling `cache-dir` automatically sets `file-cache:max-size-mb` to `-1`.

*   Integer
*   `-1`: Specifies the use of the cache's entire available capacity in the directory you specify for `cache-dir`. This is the default only if `cache-dir` is passed.
*   `0`: Disables the file cache.

`-1`

### cache-file-for-range-read

Determines whether the full object should be downloaded asynchronously and stored in the Cloud Storage FUSE cache directory when the first read is completed from a non-zero offset. This field should be set to `true` if you plan to perform several random reads or partial reads.

**Note**: If you perform a partial read starting at offset `0`, Cloud Storage FUSE asynchronously downloads and caches the full object.

Boolean value: `true`, `false`

`false`

### enable-parallel-downloads

Accelerates reads of large files by using the file cache directory as a prefetch buffer using multiple workers to download multiple parts of a file in parallel.

Parallel downloads are automatically enabled when you enable file caching. To learn more about file caching, see Use Cloud Storage FUSE file caching.

To learn more about parallel downloads and how to configure supporting properties, Parallel downloads.

Boolean value: `true`, `false`.

`true`

### exclude-regex

A regular expression that specifies files to exclude from caching. If a file matches this regular expression, it isn't cached, even if it also matches `include-regex`. The regular expression is matched against file paths in the format `bucket_name/object_key`. For more information, see Control cacheability at file granularity using regular expressions.

String value representing a regular expression.

`""`

### include-regex

A regular expression that specifies files to include in caching. If this field is used, only files matching this regular expression are cached. The regular expression is matched against file paths in the format `bucket_name/object_key`. For more information, see Control cacheability at file granularity using regular expressions.

String value representing a regular expression.

`""`

### parallel-downloads-per-file

Specifies the number of maximum goroutines to spawn per file to download the object from Cloud Storage into the file cache.

Integer

`16`

### max-parallel-downloads

The maximum number of goroutines that can be spawned at any given time across all the download jobs of files.

*   Integer
*   `-1`: Specifies unlimited parallel downloads.
*   `0`: Disables parallel downloads. Can only be used if `--enable-parallel-downloads` is not passed or is passed as `false`.

Twice the number of CPU cores on your machine or `16`, whichever is higher.

### download-chunk-size-mb

Specifies the size of each read request in MiB that each goroutine makes to Cloud Storage when downloading the object into the file cache.

Integer

`200`

### stat-cache-max-size-mb

The maximum size memory that the stat cache can use, in MiB. The stat cache is always entirely kept in memory.

*   Integer. We recommend the following:

*   `34` if your workload involves up to 20,000 files.
*   If your workload is larger than 20,000 files, increase the size by values of 10 for every additional 6,000 files, where the stat cache uses an average of 1,720 bytes per file.

*   `-1`: Sets no limit, where the stat cache use as much memory as needed.
*   `0`: Disables the stat cache.

`34`

### negative-ttl-secs

Defines the time to live (TTL) in seconds of negative stat cache entries, which store results for non-existent files in the cache.

*   Integer representing seconds, for example: `10` (10 seconds).
*   `0`: Disables negative stat caching.
*   `-1`: Allows unlimited negative stat caching and disables a TTL expiration.

`5`

### ttl-secs

Defines the time to live (TTL) in seconds of cached metadata entries.

*   Integer representing seconds, for example: `30` (30 seconds).
*   `-1`: Bypass TTL expiration and serve files from the cache whenever they're available.
*   `0`: Use the most up-to-date file. Using this value issues a `Get` metadata call to make sure that the object generation for the file in the cache matches what's stored in Cloud Storage.

`60`

### enable-metadata-prefetch

Enables background prefetching of metadata for objects within a directory for a cache miss. This option performs a batch update to the metadata cache, significantly reducing latency for subsequent lookups of files in the directory.

Boolean value: `true`, `false`.

`false`

### metadata-prefetch-entries-limit

Specifies the maximum metadata entries to prefetch per directory. Values specifying more than 5000 metadata entries results in multiple sequential Cloud Storage `Objects: list` calls, as each individual call is limited to 5000 results.

Integer between `-1` and `2147483647`. Set to `-1` to prefetch all entries.

`5000`

### metadata-prefetch-max-workers

The maximum number of concurrent background workers allowed to perform metadata prefetching across all directories.

Integer between `-1` and `2147483647`. Set to `-1` for unlimited workers.

`10`

### only-dir

Mounts only a specific directory within a bucket.

A path, for example: `"/etc/gcsfuse.yaml"`.

### anonymous-access

Disables authentication for requests. This field should be set if you're using a custom endpoint that doesn't support authentication. This field should also be set if you're using Cloud Storage FUSE with public buckets.

Boolean value: `true`, `false`

`false`

### key-file

Specifies an absolute path to the credential JSON key file for authenticating requests to Cloud Storage. By default, Cloud Storage FUSE uses Application Default Credentials to authenticate requests.

A URL.

When this field is not set, Application Default Credentials are used.

### reuse-token-from-url

Specifies whether to reuse the token acquired from `--token-url`.

Boolean value: `true`, `false`

`true`

### token-url

Specifies a URL for getting an access token when the `--key-file` is absent.

A URL.

### billing-project

Specifies a project to use for billing when the mounted bucket is accessed. This field is often required when mounting a bucket enabled with Requester Pays.

String value representing a "project ID".

""

### client-protocol

Specifies the protocol used for communicating with the Cloud Storage backend.

*   `http1` for HTTP/1.1
*   `http2` for HTTP/2
*   `grpc` for gRPC. To use gRPC with Cloud Storage FUSE, we recommend using Cloud Storage FUSE versions 2.10.0 or later.

`http1`

### custom-endpoint

Specifies an alternative custom endpoint for fetching data. The custom endpoint must support the equivalent resources and operations as the Cloud Storage JSON endpoint, `storage.UNIVERSE_DOMAIN_NAME:443`. If a custom endpoint isn't specified, Cloud Storage FUSE uses the global Cloud Storage JSON API endpoint, `storage.googleapis.com:443`. If authentication isn't supported on the custom endpoint you specify, set the `anonymous-access` field to `true` to bypass authentication.

An endpoint, for example: `storage.googleapis.com:443`.

### http-client-timeout

Specifies how long the Cloud Storage FUSE HTTP client can wait to get a response from the server before timing out.

Duration, for example: `1h10m10s` for 1 hour, 10 minutes, and 10 seconds. `0s` specifies no timeout.

`0s`, which specifies no timeout

### limit-bytes-per-sec

Specifies the bandwidth limit at which Cloud Storage FUSE can read data from Cloud Storage, measured over a 30-second window.

`"-1"`, which specifies no limit.

### limit-ops-per-sec

Specifies a limit for operations performed per second, measured over a 30-second window.

Floating point number. `-1` specifies no limit.

`"-1"`

### max-conns-per-host

Specifies the maximum number of TCP connections allowed per server. This becomes effective when `--client-protocol` is set to `http1`.

`0`

### max-idle-conns-per-host

Specifies the maximum number of idle connections allowed per server. This becomes effective when `--client-protocol` is set to `http1`.

Integer between `0` and `2147483647`. `0` specifies no limit on TCP connections.

`0`

### sequential-read-size-mb

Specifies the chunk size of the data to be downloaded from Cloud Storage, in megabytes (MB).

Integer between `1` and `1024`.

`200`

### implicit-dirs

Implicitly includes folders and managed folders. See Files and directories in the Cloud Storage FUSE GitHub documentation for more information.

Boolean value: `true`, `false`

`false`

### kernel-list-cache-ttl-secs

Enables the list cache and defines the time to live (TTL) in seconds of cached list entries. The list cache is kept in memory in the page cache, which is controlled by the kernel based on available memory.

**Note**: Recommended for read-only mounts to avoid consistency issues. For more information, see the performance tuning best practices for list caching.

*   Integer representing seconds, for example: `10` (10 seconds).
*   `0`: Disables list caching.
*   `-1`: Bypasses entry expiration and always returns the list response from the cache when it's available.

`0`

### ignore-interrupts

Instructs Cloud Storage FUSE to ignore system interrupt signals, like SIGINT triggered by `Control+C`. This prevents signals from terminating in-flight operations.

Boolean value: `true`, `false`.

`true`

### dir-mode

Permissions bits for directories, in octal.

Integer between `000` and `777` (inclusive).

`"755"`

### file-mode

Specifies permissions bits for files, in octal.

Integer between `000` and `777` (inclusive).

`"644"`

### fuse-options

Specifies additional system-specific mount options.

### gid

Specifies the Group Identifier (GID) owner of all inodes.

*   Integer representing a GID.
*   `-1`: The GID of the caller is used.

`-1`

### rename-dir-limit

Allows the renaming of directories containing fewer descendants than the specified limit.

Integer between `0` and `2147483647`.

`0`

### temp-dir

Specifies a path to the temporary directory where writes are staged prior to being uploaded to Cloud Storage.

A string path, for example: `"/mnt/ssd/example-user-gcsfuse-temp-dir"`.

`"/tmp"`

### uid

Specifies the User Identifier (UID) owner of all inodes.

*   Integer representing a UID.
*   `-1`: The UID of the caller is used.

`-1`

### foreground

Runs the `gcsfuse` command in the foreground.

Boolean value: `true`, `false`

`false`

### max-retry-attempts

Specifies the maximum number of times an operation is retried if the operation fails, preventing endless retry loops.

*   Integer representing the maximum number of retry attempts, for example: `10`.
*   `0`: Allows unlimited retry attempts.

`0`

### max-retry-sleep

Specifies the maximum duration that Cloud Storage FUSE is allowed to sleep in a retry loop with exponential backoff. Once the backoff duration exceeds the specified maximum duration, the retry continues with the specified maximum duration.

Duration, for example: `1h5m50s` (1 hour, 5 minutes, and 50 seconds) or `60s` (60 seconds).

`30s`

### multiplier

Specifies the multiplier for exponential backoff between consecutive retries.

Floating-point number

`"2"`

### cloud-metrics-export-interval-secs

Exports metrics to Cloud Monitoring with the specified interval.

**Note**: Using this field requires additional setup. For more information, see Set up the Cloud Monitoring exporter.

Integer representing a value in seconds, for example: `10` (10 seconds). `0` specifies no exporting.

`0`

### prometheus-port

Exposes Prometheus metrics endpoint on the specified port and `/metrics` path.

**Note**: Using this field requires additional setup. For more information, see Set up the Prometheus exporter.

Integer representing the port you want to specify.

`0`

### log-mutex

Prints debug messages when a mutex is held too long. If this field is specified, the severity level of logs is automatically set to `trace`, which includes trace logs, debug logs, info logs, warning logs, and error logs.

Boolean value: `true`, `false`.

`false`

### exit-on-invariant-violation

Exits the program when internal variant violations are detected.

Boolean value: `true`, `false`.

`false`

### enable-streaming-writes

Controls the write path flow so that data is uploaded directly to Cloud Storage as its written instead of fully staging the write locally and uploading it upon `close()` or `fsync()`. For more information about streaming writes, see Reads/Writes in the Cloud Storage FUSE GitHub documentation.

Boolean value: `true`, `false`.

`true`

### write:global-max-blocks

Specifies the maximum number of data chunks available for streaming writes across all files. Each file uses one 32 MiB data chunk by default.

*   Integer
*   `0`: disables streaming writes.
*   `-1`: sets the value to unlimited chunks.

*   Default value for low-specification machines with limited resources: `4`
*   Default value for high-specification machines with a large amount of resources: `1600`

### enable-buffered-read

Specifies asynchronous prefetching of parts of a Cloud Storage object into an in-memory buffer, allowing subsequent reads to be served from the buffer instead of requiring network calls.

Boolean value: `true`, `false`

`false`

### read:global-max-blocks

Specifies the maximum number of blocks available for buffered reads across all file handles.

**Note**: Using this field requires enabling the `enabled-buffered-read` field. For more information, see the `enable-buffered-read` field.

*   Integer
*   `0`: disables buffered reads.
*   `-1`: sets the value to unlimited blocks.

`40`

### profile

Applies a predefined, optimized set of Cloud Storage FUSE configurations for caching, threading, and buffer sizes to help you achieve high performance for a specific workload type, such as training, serving, and checkpointing. To learn more about each predefined configuration based on your workload type, see Profile-based configurations for AI/ML workloads.

*   A string, for example, `"aiml-checkpointing"`.
*   `"aiml-training"`: optimizes performance for high throughput reads of large datasets and prevents Cloud GPUs and Cloud TPU hardware from waiting for data.
*   `aiml-checkpointing`: optimizes performance for high throughput writes for large files by drastically reducing the time it takes to save multi-gigabyte checkpoints, minimizing training pauses.
*   `aiml-serving`: optimizes performance for serving workloads by streamlining data access and applying caching mechanisms.

`""`

Back to top

Send feedback