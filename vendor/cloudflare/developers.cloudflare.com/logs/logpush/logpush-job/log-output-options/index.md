---
title: Log Output Options
description: Customize Logpush log output format and fields.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Log Output Options

Jobs in Logpush now have a new key, **output\_options**, which replaces **logpull\_options** and allows for more flexible formatting. You can modify **output\_options** via the API.

## Replace logpull\_options

Previously, Logpush jobs could be customized by specifying the list of fields, sampling rate, and timestamp format in **logpull\_options** as [URL-encoded parameters](https://developers.cloudflare.com/logs/logpush/logpush-job/api-configuration/#options). For example:

```

{

  "id": <JOB_ID>,

  "dataset": "http_requests",

  "enabled": false,

  "name": "<DOMAIN_NAME>",

  "logpull_options": "fields=ClientIP,EdgeStartTimestamp,RayID&sample=0.1&timestamps=rfc3339",

  "destination_conf": "s3://<BUCKET_PATH>?region=us-west-2"

}


```

We have replaced this with **output\_options** as it is used for both Logpull and Logpush.

```

{

  "id": <JOB_ID>,

  "dataset": "http_requests",

  "enabled": false,

  "name": "<DOMAIN_NAME>",

  "output_options": {

    "field_names": ["ClientIP", "EdgeStartTimestamp", "RayID"],

    "sample_rate": 0.1,

    "timestamp_format": "rfc3339"

  },

  "destination_conf": "s3://<BUCKET_PATH>?region=us-west-2"

}


```

Updates replace output\_options in full

When you update a Logpush job via `PUT /accounts/{account_id}/logpush/jobs/{job_id}` or `PUT /zones/{zone_id}/logpush/jobs/{job_id}`, the **output\_options** object is replaced entirely. Any field that was previously set but omitted from the update payload is reset to its default value. For example, if the existing job sets `timestamp_format: "rfc3339"` and your update only includes `field_names`, the job will revert to the default `timestamp_format` (`unixnano` for API-created jobs). Always include the complete **output\_options** object you want applied when updating a job.

## Output types

By default Logpush outputs each record as a single line of JSON (also known as `ndjson`).

With **output\_options** you can switch to CSV or single JSON object, further customize prefixes, suffixes, delimiters, or provide your own record template (in a stripped-down version of Go [text/template ↗](https://pkg.go.dev/text/template) syntax).

The **output\_options** object has the following settings:

* **field\_names**: array of strings. For the moment, there is no option to add all fields at once, you need to specify the fields names.
* **output\_type**: string to specify output type, such as `ndjson` or `csv` (default `ndjson`). This sets default values for the rest of the settings depending on the chosen output type. Some formatting rules (like string quoting) are different between output types.
* **batch\_prefix**: string to be prepended before each batch.
* **batch\_suffix**: string to be appended after each batch.
* **record\_prefix**: string to be prepended before each record.
* **record\_suffix**: string to be appended after each record.
* **record\_template**: string to use as template for each record instead of the default comma-separated list. All fields used in the template must be present in **field\_names** as well, otherwise they will end up as `null`. Format as a Go text/template without any standard functions (like conditionals, loops, sub-templates, etc.). The template can only consist of these three types of tokens:  
   * Action: this is either a `{{ .Field }}` or a `{{ "constant text" }}`.  
   * Text: this is just constant text in-between the `{{ actions }}`.  
   * Comment: the `{{/* comments */}}` are silently dropped.
* **record\_delimiter**: string to be inserted in-between the records as separator.
* **field\_delimiter**: string to join fields. Will be ignored when **record\_template** is set.
* **timestamp\_format**: string to specify the format for timestamps. Supported values are:  
   * `unixnano` — nanoseconds unit  
   * `unix` — seconds unit  
   * `rfc3339` — seconds unit, for example: `2024-02-17T23:52:01Z`  
   * `rfc3339ms` — milliseconds unit, for example: `2024-02-17T23:52:01.123Z`  
   * `rfc3339ns` — nanoseconds unit, for example: `2024-02-17T23:52:01.123456789Z`  
Default timestamp formats apply unless explicitly set. The dashboard defaults to `rfc3339` and the API defaults to `unixnano`.
* **sample\_rate**: floating number to specify sampling rate (default 1.0: no sampling). Sampling is applied on top of filtering, and regardless of the current sample\_interval of the data.
* **CVE-2021-44228**: bool, default false. If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.

## Examples

Specifying **field\_names** and **output\_type** will result in the remaining options being configured as below for the specified **output\_type**:

### ndjson

Default output\_options for `ndjson`

```

{

  "record_prefix": "{",

  "record_suffix": "}\n",

  "field_delimiter": ","

}


```

Example output\_options

```

"output_options": {

  "field_names": ["ClientIP", "EdgeStartTimestamp", "RayID"],

  "output_type": "ndjson"

}


```

Example output

```

{"ClientIP":"89.163.242.206","EdgeStartTimestamp":1506702504433000200,"RayID":"3a6050bcbe121a87"}

{"ClientIP":"89.163.242.207","EdgeStartTimestamp":1506702504433000300,"RayID":"3a6050bcbe121a88"}

{"ClientIP":"89.163.242.208","EdgeStartTimestamp":1506702504433000400,"RayID":"3a6050bcbe121a89"}


```

* `ndjson` with different field names:

Example output\_options

```

"output_options": {

  "field_names": ["ClientIP", "EdgeStartTimestamp", "RayID"],

  "output_type": "ndjson",

  "record_template": "\"client-ip\":{{.ClientIP}},\"timestamp\":{{.EdgeStartTimestamp}},\"ray-id\":{{.RayID}}"

}


```

Example output

```

{"client-ip":"89.163.242.206","timestamp":1506702504433000200,"ray-id":"3a6050bcbe121a87"}

{"client-ip":"89.163.242.207","timestamp":1506702504433000300,"ray-id":"3a6050bcbe121a88"}

{"client-ip":"89.163.242.208","timestamp":1506702504433000400,"ray-id":"3a6050bcbe121a89"}


```

Literal with double curly-braces `({{}})`, that is, `"double{{curly}}braces"`, can be inserted following go text/template convention, that is, `"{{`doublecurlybraces`}}"`.

### csv

Default output\_options for CSV

```

{

  "record_suffix": "\n",

  "field_delimiter": ","

}


```

Example output\_options

```

"output_options": {

  "field_names": ["ClientIP", "EdgeStartTimestamp", "RayID"],

  "output_type": "csv"

}


```

Example output

```

"89.163.242.206",1506702504433000200,"3a6050bcbe121a87"

"89.163.242.207",1506702504433000300,"3a6050bcbe121a88"

"89.163.242.208",1506702504433000400,"3a6050bcbe121a89"


```

### csv/json variants

Based on above, other formats similar to csv or json are also supported:

* csv with header:

Example output\_options

```

"output_options": {

  "field_names": ["ClientIP", "EdgeStartTimestamp", "RayID"],

  "output_type": "csv",

  "batch_prefix": "ClientIP,EdgeStartTimestamp,RayID\n"

}


```

Example output

```

ClientIP,EdgeStartTimestamp,RayID

"89.163.242.206",1506702504433000200,"3a6050bcbe121a87"

"89.163.242.207",1506702504433000300,"3a6050bcbe121a88"

"89.163.242.208",1506702504433000400,"3a6050bcbe121a89"


```

* tsv with header:

Example output\_options

```

"output_options": {

  "field_names": ["ClientIP", "EdgeStartTimestamp", "RayID"],

  "output_type": "csv",

  "batch_prefix": "ClientIP\tEdgeStartTimestamp\tRayID\n",

  "field_delimiter": "\t"

}


```

Example output

```

ClientIP EdgeStartTimestamp  RayID

"89.163.242.206"    1506702504433000200 "3a6050bcbe121a87"

"89.163.242.207"    1506702504433000300 "3a6050bcbe121a88"

"89.163.242.208"    1506702504433000400 "3a6050bcbe121a89"


```

* json with nested object:

Example output\_options

```

"output_options": {

  "field_names": ["ClientIP", "EdgeStartTimestamp", "RayID"],

  "output_type": "ndjson",

  "batch_prefix": "{\"events\":[",

  "batch_suffix": "\n]}\n",

  "record_prefix": "\n  {\"info\":{",

  "record_suffix": "}}",

  "record_delimiter": ","

}


```

Example output

```

{

  "events": [

    {

      "info": {

        "ClientIP": "89.163.242.206",

        "EdgeStartTimestamp": 1506702504433000200,

        "RayID": "3a6050bcbe121a87"

      }

    },

    {

      "info": {

        "ClientIP": "89.163.242.207",

        "EdgeStartTimestamp": 1506702504433000300,

        "RayID": "3a6050bcbe121a88"

      }

    },

    {

      "info": {

        "ClientIP": "89.163.242.208",

        "EdgeStartTimestamp": 1506702504433000400,

        "RayID": "3a6050bcbe121a89"

      }

    }

  ]

}


```

## How to migrate

In order to migrate your jobs from using **logpull\_options** to the new **output\_options**, take these steps:

1. Change the `&fields=ClientIP,EdgeStartTimestamp,RayID` parameter to an array in `output_options.field_names`.
2. Change the `&sample=0.1` parameter to `output_options.sample_rate`.
3. Change the `&timestamps=rfc3339` parameter to `output_options.timestamp_format`.
4. Change the `&CVE-2021-44228=true` parameter to `output_options.CVE-2021-44228`.

For example, if logpull\_options are `fields=ClientIP,EdgeStartTimestamp,RayID&sample=0.1&timestamps=rfc3339&CVE-2021-44228=true`, the output\_options would be:

```

"output_options": {

  "field_names": ["ClientIP", "EdgeStartTimestamp", "RayID"],

  "sample_rate": 0.1,

  "timestamp_format": "rfc3339",

  "CVE-2021-44228": true

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/#page","headline":"Log Output Options · Cloudflare Logs docs","description":"Customize Logpush log output format and fields.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/log-output-options/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/log-output-options/","name":"Log Output Options"}}]}
```
