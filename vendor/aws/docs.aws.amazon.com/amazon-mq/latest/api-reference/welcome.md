

# Welcome
<a name="welcome"></a>

Welcome to the Amazon MQ REST API reference. In this guide, you can find descriptions of REST resources, example requests, HTTP methods, schemas, parameters, and the errors that the service returns.

Amazon MQ is a managed message broker service for [Apache ActiveMQ](http://activemq.apache.org/) and [RabbitMQ](https://www.rabbitmq.com/) that makes it easy to set up and operate message brokers in the cloud. A message broker allows software applications and components to communicate using various programming languages, operating systems, and formal messaging protocols. Amazon MQ works with your existing applications and services without the need to manage, operate, or maintain your own messaging system.

**Topics**
+ [Example REST Request](#rest-reference-example)
+ [Example REST Response](#rest-reference-example)

**Additional Information**
+ [Amazon MQ Product Page](http://aws.amazon.com/amazon-mq/)
+ *[Amazon MQ Developer Guide](https://docs.aws.amazon.com/amazon-mq/latest/developer-guide/)*
+ [Amazon MQ in the *AWS CLI Command Reference*](https://docs.aws.amazon.com/cli/latest/reference/mq/index.html)
+ [Regions and Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html#amazon-mq_region)

This document was last published on July 7, 2021

## Example REST Request
<a name="rest-reference-example"></a>

The following is an example of an Amazon MQ REST request (and its headers) which creates a new Amazon MQ for ActiveMQ broker:

```
POST /v1/brokers HTTP/1.1
Content-Type: application/json
X-Amz-Date: 20171123T214525Z
Authorization: AWS4-HMAC-SHA256 Credential=AKIAIOSFODNN7EXAMPLE/20171128/us-east-2/mq/aws4_request, SignedHeaders=content-length;content-type;host;x-amz-date, Signature=a12bc34567defg89h0ij1234kl56m789no01p2q345r6s789tu01v2w3x4567890
Host: mq.us-east-2.amazonaws.com
Cache-Control: no-cache

{
    "brokerName": "MyActiveMQBroker",
    "hostInstanceType": "mq.m5.large",    
    "engineType": "ActiveMQ",    
    "engineVersion": "5.15.8",
    "logs": {
        "general": true,
        "audit": false
    },
    "deploymentMode": "ACTIVE_STANDBY_MULTI_AZ",
    "publiclyAccessible": true,    
    "subnetIds": [
        "subnet-12a3b45c",
        "subnet-67d8e90f"
    ],
    "securityGroups": [
        "sg-a1b234cd",
        "sg-e5f678gh"
    ],
    "autoMinorVersionUpgrade": true,
    "users": [{
        "password": "MyPassword456",
        "groups": [
            "admins"
        ],
        "consoleAccess": true,
        "username": "jane.doe"
    }]
}
```

The following is an example of an Amazon MQ REST request (and its headers) which creates a new Amazon MQ for RabbitMQ broker:

```
POST /v1/brokers HTTP/1.1
Content-Type: application/json
X-Amz-Date: 20171123T214525Z
Authorization: AWS4-HMAC-SHA256 Credential=AKIAIOSFODNN7EXAMPLE/20171128/us-east-2/mq/aws4_request, SignedHeaders=content-length;content-type;host;x-amz-date, Signature=a12bc34567defg89h0ij1234kl56m789no01p2q345r6s789tu01v2w3x4567890
Host: mq.us-east-2.amazonaws.com
Cache-Control: no-cache

{
    "brokerName": "MyRabbitMQBroker",
    "hostInstanceType": "mq.m5.large",    
    "engineType": "RabbitMQ",    
    "engineVersion": "3.8.6",
    "logs": {
        "general": true
    },
    "deploymentMode": "CLUSTER_MULTI_AZ",
    "publiclyAccessible": true,    
    "subnetIds": [
        "subnet-15a3b47c",
        "subnet-69d8n90j"
    ],
    "autoMinorVersionUpgrade": true,
    "users": [{
        "password": "MyPassword456",
        "groups": [
            "admins"
        ],
        "consoleAccess": true,
        "username": "jane.doe"
    }]
}
```

## Example REST Response
<a name="rest-reference-example"></a>

The following is an example of an Amazon MQ REST response (and its headers) which acknowledges the creation of the new broker:

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 250
Connection: keep-alive
Date: Wed, 28 Nov 2017 12:00:00 GMT
X-Amzn-RequestId: a12bc345-67de-89f0-g12h-345ij6k7l89m
X-Amzn-Trace-Id: sampled=1;root=1-2345a67b-c8defg901hijk2lf3m4nopqr
X-Cache: Miss from cloudfront
Via: 1.1 ab123456cd789ef012g34567890h1i23.cloudfront.net (CloudFront)
X-Amz-Cf-Id: ABCa1D6b2-EcF3dG7e456_fGIgh7JKLMijNO_PQ8RSTUVWX-Y9k0ZA==

{
    "brokerId" : "b-1234a5b6-78cd-901e-2fgh-3i45j6k178l9",
    "brokerArn": "arn:aws:mq:us-east-2:123456789012:broker:MyBroker:b-1234a5b6-78cd-901e-2fgh-3i45j6k178l9"
}
```