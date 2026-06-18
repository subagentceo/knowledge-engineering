---
title: aws-sdk-go
description: Configure aws-sdk-go (v2) to work with Cloudflare R2 object storage.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# aws-sdk-go

**Last reviewed:**  about 4 years ago 

You must [generate an Access Key](https://developers.cloudflare.com/r2/api/tokens/) before getting started. All examples will utilize `access_key_id` and `access_key_secret` variables which represent the **Access Key ID** and **Secret Access Key** values you generated.

  
This example uses version 2 of the [aws-sdk-go ↗](https://github.com/aws/aws-sdk-go-v2) package. You must pass in the R2 configuration credentials when instantiating your `S3` service client:

```

package main


import (

  "context"

  "encoding/json"

  "fmt"

  "github.com/aws/aws-sdk-go-v2/aws"

  "github.com/aws/aws-sdk-go-v2/config"

  "github.com/aws/aws-sdk-go-v2/credentials"

  "github.com/aws/aws-sdk-go-v2/service/s3"

  "log"

)


func main() {

  var bucketName = "sdk-example"

  // Provide your Cloudflare account ID

  var accountId = "<ACCOUNT_ID>"

  // Retrieve your S3 API credentials for your R2 bucket via API tokens

  // (see: https://developers.cloudflare.com/r2/api/tokens)

  var accessKeyId = "<ACCESS_KEY_ID>"

  var accessKeySecret = "<SECRET_ACCESS_KEY>"


  cfg, err := config.LoadDefaultConfig(context.TODO(),

    config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(accessKeyId, accessKeySecret, "")),

    config.WithRegion("auto"), // Required by SDK but not used by R2

  )

  if err != nil {

    log.Fatal(err)

  }


  client := s3.NewFromConfig(cfg, func(o *s3.Options) {

      o.BaseEndpoint = aws.String(fmt.Sprintf("https://%s.r2.cloudflarestorage.com", accountId))

  })


  listObjectsOutput, err := client.ListObjectsV2(context.TODO(), &s3.ListObjectsV2Input{

    Bucket: &bucketName,

  })

  if err != nil {

    log.Fatal(err)

  }


  for _, object := range listObjectsOutput.Contents {

    obj, _ := json.MarshalIndent(object, "", "\t")

    fmt.Println(string(obj))

  }


  //  {

  //    "ChecksumAlgorithm": null,

  //    "ETag": "\"eb2b891dc67b81755d2b726d9110af16\"",

  //    "Key": "ferriswasm.png",

  //    "LastModified": "2022-05-18T17:20:21.67Z",

  //    "Owner": null,

  //    "Size": 87671,

  //    "StorageClass": "STANDARD"

  //  }


  listBucketsOutput, err := client.ListBuckets(context.TODO(), &s3.ListBucketsInput{})

  if err != nil {

    log.Fatal(err)

  }


  for _, object := range listBucketsOutput.Buckets {

    obj, _ := json.MarshalIndent(object, "", "\t")

    fmt.Println(string(obj))

  }


  // {

  //     "CreationDate": "2022-05-18T17:19:59.645Z",

  //     "Name": "sdk-example"

  // }

}


```

## Generate presigned URLs

You can also generate presigned links that can be used to temporarily share public write access to a bucket.

```

presignClient := s3.NewPresignClient(client)


  presignResult, err := presignClient.PresignPutObject(context.TODO(), &s3.PutObjectInput{

    Bucket: aws.String(bucketName),

    Key:    aws.String("example.txt"),

  })


  if err != nil {

    panic("Couldn't get presigned URL for PutObject")

  }


  fmt.Printf("Presigned URL For object: %s\n", presignResult.URL)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/examples/aws/aws-sdk-go/#page","headline":"aws-sdk-go · Cloudflare R2 docs","description":"Configure aws-sdk-go (v2) to work with Cloudflare R2 object storage.","url":"https://developers.cloudflare.com/r2/examples/aws/aws-sdk-go/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/examples/aws/","name":"S3 SDKs"}},{"@type":"ListItem","position":5,"item":{"@id":"/r2/examples/aws/aws-sdk-go/","name":"aws-sdk-go"}}]}
```
