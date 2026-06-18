---
title: Manage Logpush with Python
description: Create and manage Logpush jobs using Python.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage Logpush with Python

You can manage your Cloudflare Logpush service using Python. In the script below you can find example requests to create a job, retrieve job details, update job settings, and delete a Logpush job.

Note

The examples below are for zone-scoped datasets. Account-scoped datasets should use `<ACCOUNT_ID>` instead of `<ZONE_ID>`.

Python

```

import json

import requests


url = "https://api.cloudflare.com/client/v4/"


x_auth_email = "<EMAIL>"

x_auth_key = "<API_KEY>"


zone_id = "<ZONE_ID>"

destination_conf = "s3://<BUCKET_NAME>/logs?region=us-west-1"


logpush_url = url + "/zones/%s/logpush" % zone_id


headers = {

  'X-Auth-Email': <EMAIL>,

  'X-Auth-Key': <API_KEY>,

  'Content-Type': 'application/json'

}


# Create job

r = requests.post(logpush_url + "/jobs", headers=headers, data=json.dumps({"destination_conf":destination_conf}))

print(r.status_code, r.text)

assert r.status_code == 201

assert r.json()["result"]["enabled"] == False


# Keep id of the new job

id = r.json()["result"]["id"]


# Get job

r = requests.get(logpush_url + "/jobs/%s" % id, headers=headers)

print(r.status_code, r.text)

assert r.status_code == 200


# Get all jobs for a zone

r = requests.get(logpush_url + "/jobs", headers=headers)

print(r.status_code, r.text)

assert r.status_code == 200

assert len(r.json()["result"]) > 0


# Update job

r = requests.put(logpush_url + "/jobs/%s" % id, headers=headers, data=json.dumps({"enabled":True}))

print(r.status_code, r.text)

assert r.status_code == 200

assert r.json()["result"]["enabled"] == True


# Delete job

r = requests.delete(logpush_url + "/jobs/%s" % id, headers=headers)

print(r.status_code, r.text)

assert r.status_code == 200


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/examples/example-logpush-python/#page","headline":"Manage Logpush with Python · Cloudflare Logs docs","description":"Create and manage Logpush jobs using Python.","url":"https://developers.cloudflare.com/logs/logpush/examples/example-logpush-python/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/examples/","name":"Logpush examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/examples/example-logpush-python/","name":"Manage Logpush with Python"}}]}
```
