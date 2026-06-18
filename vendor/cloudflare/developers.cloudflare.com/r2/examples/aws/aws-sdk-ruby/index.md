---
title: aws-sdk-ruby
description: Configure the AWS SDK for Ruby to work with Cloudflare R2 object storage.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# aws-sdk-ruby

**Last reviewed:**  about 4 years ago 

You must [generate an Access Key](https://developers.cloudflare.com/r2/api/tokens/) before getting started. All examples will utilize `access_key_id` and `access_key_secret` variables which represent the **Access Key ID** and **Secret Access Key** values you generated.

  
Many Ruby projects also store these credentials in environment variables instead.

Add the following dependency to your `Gemfile`:

```

gem "aws-sdk-s3"


```

Then you can use Ruby to operate on R2 buckets:

```

require "aws-sdk-s3"


@r2 = Aws::S3::Client.new(

  # Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)

  access_key_id: "#{ACCESS_KEY_ID}",

  secret_access_key: "#{SECRET_ACCESS_KEY}",

  # Provide your Cloudflare account ID

  endpoint: "https://#{ACCOUNT_ID}.r2.cloudflarestorage.com",

  region: "auto", # Required by SDK but not used by R2

)


# List all buckets on your account

puts @r2.list_buckets


#=> {

#=>   :buckets => [{

#=>     :name => "your-bucket",

#=>     :creation_date => "…",

#=>   }],

#=>   :owner => {

#=>     :display_name => "…",

#=>     :id => "…"

#=>   }

#=> }


# List the first 20 items in a bucket

puts @r2.list_objects(bucket:"your-bucket", max_keys:20)


#=> {

#=>   :is_truncated => false,

#=>   :marker => nil,

#=>   :next_marker => nil,

#=>   :name => "your-bucket",

#=>   :prefix => nil,

#=>   :delimiter =>nil,

#=>   :max_keys => 20,

#=>   :common_prefixes => [],

#=>   :encoding_type => nil

#=>   :contents => [

#=>     …,

#=>     …,

#=>     …,

#=>   ]

#=> }


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/examples/aws/aws-sdk-ruby/#page","headline":"aws-sdk-ruby · Cloudflare R2 docs","description":"Configure the AWS SDK for Ruby to work with Cloudflare R2 object storage.","url":"https://developers.cloudflare.com/r2/examples/aws/aws-sdk-ruby/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/examples/aws/","name":"S3 SDKs"}},{"@type":"ListItem","position":5,"item":{"@id":"/r2/examples/aws/aws-sdk-ruby/","name":"aws-sdk-ruby"}}]}
```
