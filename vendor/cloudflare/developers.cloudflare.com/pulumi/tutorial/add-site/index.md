---
title: Add a site
description: This tutorial uses Pulumi infrastructure as code (IaC) to familiarize yourself with the resource management lifecycle.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pulumi/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add a site

**Last reviewed:**  almost 2 years ago 

In this tutorial, you will follow step-by-step instructions to bring an existing site to Cloudflare using Pulumi infrastructure as code (IaC) to familiarize yourself with the resource management lifecycle. In particular, you will create a Zone and a DNS record to resolve your newly added site. This tutorial adopts the IaC principle to complete the steps listed in the [Add site tutorial](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).

Note

You will provision resources that qualify under free tier offerings for both Pulumi Cloud and Cloudflare.

## Before you begin

Ensure you have:

* A Cloudflare account and API Token with permission to edit the resources in this tutorial. If you need to, sign up for a [Cloudflare account ↗](https://www.cloudflare.com/sign-up) before continuing. Your token must have:  
   * `Zone-Zone-Edit` permission  
   * `Zone-DNS-Edit` permission  
   * `include-All zones from an account-<your account>` zone resource
* A Pulumi Cloud account. You can sign up for an [always-free individual tier ↗](https://app.pulumi.com/signup).
* The [Pulumi CLI](https://developers.cloudflare.com/pulumi/installing/) is installed on your machine.
* A [Pulumi-supported programming language ↗](https://github.com/pulumi/pulumi?tab=readme-ov-file#languages) is configured. (TypeScript, JavaScript, Python, Go, .NET, Java, or use YAML)
* A domain name. You may use `example.com` to complete the tutorial.

## 1\. Initialize your project

A Pulumi project is a collection of files in a dedicated folder that describes the infrastructure you want to create. The Pulumi project folder is identified by the required `Pulumi.yaml` file. You will use the Pulumi CLI to create and configure a new project.

### a. Create a directory

Use a new and empty directory for this tutorial.

Terminal window

```

mkdir addsite-cloudflare

cd addsite-cloudflare


```

### b. Login to Pulumi Cloud

[Pulumi Cloud ↗](https://www.pulumi.com/product/pulumi-cloud/) is a hosted service that provides a secure and scalable platform for managing your infrastructure as code. You will use it to store your Pulumi backend configurations.

At the prompt, press Enter to log into your Pulumi Cloud account via the browser. Alternatively, you may provide a [Pulumi Cloud access token ↗](https://www.pulumi.com/docs/pulumi-cloud/access-management/access-tokens/).

Terminal window

```

pulumi login


```

### c. Create a new program

A Pulumi program is code written in a [supported programming language ↗](https://github.com/pulumi/pulumi?tab=readme-ov-file#languages) that defines infrastructure resources.

To create a program, select your language of choice and run the `pulumi` command:

* [  JavaScript ](#tab-panel-9497)
* [  TypeScript ](#tab-panel-9498)
* [  Python ](#tab-panel-9499)
* [ go ](#tab-panel-9500)
* [ Java ](#tab-panel-9501)
* [ .NET ](#tab-panel-9502)
* [ YAML ](#tab-panel-9503)

Terminal window

```

pulumi new javascript --name addsite-cloudflare --yes

# wait a few seconds while the project is initialized


```

Terminal window

```

pulumi new typescript --name addsite-cloudflare --yes

# wait a few seconds while the project is initialized


```

Terminal window

```

pulumi new python --name addsite-cloudflare --yes

# wait a few seconds while the project is initialized


```

Terminal window

```

pulumi new go --name addsite-cloudflare --yes

# wait a few seconds while the project is initialized


```

Terminal window

```

pulumi new java --name addsite-cloudflare --yes

# wait a few seconds while the project is initialized


```

Terminal window

```

pulumi new csharp --name addsite-cloudflare --yes

# wait a few seconds while the project is initialized


```

Terminal window

```

pulumi new yaml --name addsite-cloudflare --yes


```

### d. Create a stack

A Pulumi [stack ↗](https://www.pulumi.com/docs/concepts/stack/) is an instance of a Pulumi program. Stacks are independently configurable and may represent different environments (development, staging, production) or feature branches. For this tutorial, you'll use the `dev` stack.

To instantiate your `dev` stack, run:

Terminal window

```

pulumi up --yes

# wait a few seconds for the stack to be instantiated.


```

You have not defined any resources at this point, so you'll have an empty stack.

### e. Save your settings

In this step, you will store your settings in a Pulumi [ESC Environment ↗](https://www.pulumi.com/docs/esc/environments/), a YAML file containing configurations and secrets. These can be accessed in several ways, including a Pulumi program. All ESC Environments securely reside in your Pulumi Cloud account and can be fully managed via the Pulumi CLI. For this tutorial, you will store the following values:

* Your Cloudflare [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
* A valid Cloudflare API [token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).
* A domain. For instance, `example.com`.

Terminal window

```

# Define an ESC Environment name

E=cloudflare/my-dev-env


# Create a new Pulumi ESC Environment

pulumi config env init --env $E --yes


```

```

Creating environment cloudflare/my-dev-env for stack dev...


```

Terminal window

```

# Replace abc123 with your Cloudflare Account ID

pulumi env set $E --plaintext pulumiConfig.accountId abc123


# Replace API_TOKEN with your Cloudflare API Token

pulumi env set $E --secret  pulumiConfig.cloudflare:apiToken API_TOKEN


# Replace example.com with your registered domain, or leave as is

pulumi env set $E --plaintext pulumiConfig.domain example.com


```

### f. Install the Cloudflare package

You need to install the Cloudflare package for your language of choice in order to define Cloudflare resources in your Pulumi program.

Install the Cloudflare package by running the following command:

* [  JavaScript ](#tab-panel-9504)
* [  TypeScript ](#tab-panel-9505)
* [  Python ](#tab-panel-9506)
* [ go ](#tab-panel-9507)
* [ Java ](#tab-panel-9508)
* [ .NET ](#tab-panel-9509)
* [ YAML ](#tab-panel-9510)

Terminal window

```

npm install @pulumi/cloudflare


```

```

added 1 package ...


```

Terminal window

```

npm install @pulumi/cloudflare


```

```

added 1 package ...


```

Terminal window

```

echo "pulumi_cloudflare>=5.38,<6.0.0" >> requirements.txt

source venv/bin/activate

pip install -r requirements.txt


```

```

...Collecting pulumi-cloudflare...


```

Terminal window

```

go get github.com/pulumi/pulumi-cloudflare/sdk/v3/go/cloudflare


```

```

go: downloading github.com/pulumi/pulumi-cloudflare ...


```

Below are Apache Maven instructions. For other Java project managers such as Gradle, see the official [Maven repository ↗](https://central.sonatype.com/artifact/com.pulumi/cloudflare/overview)

1. Open your `pom.xml` file.
2. Add the Pulumi Cloudflare dependency inside the `<dependencies>` section.

```

<dependency>

    <groupId>com.pulumi</groupId>

    <artifactId>cloudflare</artifactId>

    <version>5.38.0</version>

</dependency>


```

1. Run:

Terminal window

```

mvn clean install


```

```

...[INFO] BUILD SUCCESS...


```

Terminal window

```

dotnet add package Pulumi.Cloudflare


```

```

...

info : Adding PackageReference for package 'Pulumi.Cloudflare' into project

...


```

There are no dependencies to download for YAML. Skip ahead.

## 2\. Define Cloudflare resources in code

With the Cloudflare package installed, you can now define any [supported Cloudflare resource ↗](https://www.pulumi.com/registry/packages/cloudflare/) in your Pulumi program. You'll define a Zone, and a DNS Record next.

### a. Add a Zone

A domain, or site, is known as a Zone in Cloudflare. In Pulumi, the [Zone resource ↗](https://www.pulumi.com/registry/packages/cloudflare/api-docs/zone/) represents a Cloudflare Zone.

Replace the contents of your entrypoint file with the following:

* [  JavaScript ](#tab-panel-9511)
* [  TypeScript ](#tab-panel-9512)
* [  Python ](#tab-panel-9513)
* [ go ](#tab-panel-9514)
* [ Java ](#tab-panel-9515)
* [ .NET ](#tab-panel-9516)
* [ YAML ](#tab-panel-9517)

**Filename: `index.js`**

JavaScript

```

"use strict";

const pulumi = require("@pulumi/pulumi");

const cloudflare = require("@pulumi/cloudflare");


const config = new pulumi.Config();

const accountId = config.require("accountId");

const domain = config.require("domain");


// Create a Cloudflare resource (Zone)

const zone = new cloudflare.Zone("my-zone", {

  zone: domain,

  accountId: accountId,

  plan: "free",

  jumpStart: true,

});


exports.zoneId = zone.id;

exports.nameservers = zone.nameServers;

exports.status = zone.status;


```

**Filename: `index.ts`**

TypeScript

```

import * as pulumi from "@pulumi/pulumi";

import * as cloudflare from "@pulumi/cloudflare";


const config = new pulumi.Config();

const accountId = config.require("accountId");

const domain = config.require("domain");


// Create a Cloudflare resource (Zone)

const zone = new cloudflare.Zone("my-zone", {

  zone: domain,

  accountId: accountId,

  plan: "free",

  jumpStart: true,

});


export const zoneId = zone.id;

export const nameservers = zone.nameServers;

export const status = zone.status;


```

**Filename: `__main__.py`**

Python

```

import pulumi

import pulumi_cloudflare as cloudflare


account_id = pulumi.Config().require("accountId")

domain = pulumi.Config().require("domain")


# Create a Cloudflare resource (Zone)

zone = cloudflare.Zone("my-zone",

    zone=domain,

    account_id=account_id,

    plan="free",

    jump_start=True)


pulumi.export("zoneId", zone.id)

pulumi.export('nameservers', zone.name_servers)

pulumi.export('status', zone.status)


```

**Filename: `main.go`**

```

package main


import (

    "github.com/pulumi/pulumi/sdk/v3/go/pulumi"

    cloudflare "github.com/pulumi/pulumi-cloudflare/sdk/v3/go/cloudflare"

)


func main() {

    pulumi.Run(func(ctx *pulumi.Context) error {

        domain, _ := ctx.GetConfig("domain")


        // Create a Cloudflare resource (Zone)

        zone, err := cloudflare.NewZone(ctx, "my-zone", &cloudflare.ZoneArgs{

            Zone:      pulumi.String(domain),

            Plan:      pulumi.String("free"),

            JumpStart: pulumi.Bool(true),

        })

        if err != nil {

            return err

        }


        ctx.Export("zoneId", zone.ID())

        ctx.Export("nameservers", zone.NameServers)

        ctx.Export("status", zone.Status)

        return nil

    })

}


```

**Filename: `src/main/java/myproject/App.java`**

```

package myproject;


import com.pulumi.Pulumi;

import com.pulumi.Context;

import com.pulumi.cloudflare.ZoneArgs;

import com.pulumi.cloudflare.Zone;


public class App {

    public static void main(String[] args) {

        Pulumi.run(ctx -> {

            var config = ctx.config();


            String accountId = config.require("accountId");

            String domain = config.require("domain");


            var zone = new Zone("my-zone", ZoneArgs.builder()

                .zone(domain)

                .accountId(accountId)

                .plan("free")

                .jumpStart(true)

                .build());


            ctx.export("zoneId", zone.id());

            ctx.export("nameservers", zone.nameServers());

            ctx.export("status", zone.status());

        });

    }

}


```

**Filename: `Program.cs`**

```

using System.Threading.Tasks;

using System.Collections.Immutable;

using Pulumi;

using Pulumi.Cloudflare;


class Program

{

    static Task<int> Main() => Deployment.RunAsync<MyStack>();


    class MyStack : Stack

    {

        public MyStack()

        {

            var config = new Pulumi.Config();

            var accountId = config.Require("accountId");

            var domain = config.Require("domain");


            var zone = new Zone("my-zone", new ZoneArgs

            {

                ZoneName = domain,

                AccountId = accountId,

                Plan = "free",

                JumpStart = true

            });


            this.ZoneId = zone.Id;

            this.Nameservers = zone.NameServers;

            this.Status = zone.Status;

        }


        [Output]

        public Output<string> ZoneId { get; set; }

        public Output<ImmutableArray<string>> Nameservers { get; set; }

        public Output<string> Status { get; set; }

    }

}


```

**Filename: `Pulumi.yaml`**

YAML

```

name: addsite-cloudflare

runtime: yaml

resources:

  myZone:

    type: cloudflare:Zone

    properties:

      zone: ${domain}

      accountId: ${accountId}

      plan: "free"

      jumpStart: true


outputs:

  zoneId: ${myZone.id}

  nameservers: ${exampleZone.nameServers}

  status: ${exampleZone.status}


```

Notice that the code also outputs several properties from the Zone resource, such as the `zoneId`, `nameservers`, and `status`, so that they can easily be accessed in subsequent steps.

### b. Add a DNS Record

You will now add a DNS [Record resource ↗](https://www.pulumi.com/registry/packages/cloudflare/api-docs/record/) to test previously configured Zone.

Add the following code snippet to your entrypoint file **after** the Zone resource definition:

* [  JavaScript ](#tab-panel-9518)
* [  TypeScript ](#tab-panel-9519)
* [  Python ](#tab-panel-9520)
* [ go ](#tab-panel-9521)
* [ Java ](#tab-panel-9522)
* [ .NET ](#tab-panel-9523)
* [ YAML ](#tab-panel-9524)

**Filename: `index.js`**

JavaScript

```

const record = new cloudflare.Record("my-record", {

  zoneId: zone.id,

  name: domain,

  content: "192.0.2.1",

  type: "A",

  proxied: true,

});


```

**Filename: `index.ts`**

TypeScript

```

const record = new cloudflare.Record("my-record", {

  zoneId: zone.id,

  name: domain,

  content: "192.0.2.1",

  type: "A",

  proxied: true,

});


```

**Filename: `__main__.py`**

Python

```

record = cloudflare.Record("my-record",

    zone_id=zone.id,

    name=domain,

    content="192.0.2.1",

    type="A",

    proxied=True

)


```

**Filename: `main.go`**

```

    _, err = cloudflare.NewRecord(ctx, "my-record", &cloudflare.RecordArgs{

      ZoneId:  zone.ID(),

      Name:    pulumi.String(domain),

      Content:   pulumi.String("192.0.2.1"),

      Type:    pulumi.String("A"),

      Proxied: pulumi.Bool(true),

    })

    if err != nil {

      return err

    }


```

**Filename: `src/main/java/myproject/App.java`**

```

// Add imports

import com.pulumi.cloudflare.Record;

import com.pulumi.cloudflare.RecordArgs;


// Below the Zone resource, add

new Record("my-record", RecordArgs.builder()

.zoneId(zone.id())

.name(domain)

.content("192.0.2.1")

.type("A")

.proxied(true)

.build());


```

**Filename: `Program.cs`**

```

new Record("my-record", new RecordArgs

{

    ZoneId = zone.Id,

    Name = domain,

    Content = "192.0.2.1",

    Type = "A",

    Proxied = true

});


```

**Filename: `Pulumi.yaml`**

YAML

```

myRecord:

  type: cloudflare:Record

  properties:

    zoneId: ${myZone.id}

    name: ${domain}

    content: 192.0.2.1

    type: A

    proxied: true


```

## 3\. Deploy your changes

Now that you have defined your resources, you can deploy the changes using the Pulumi CLI so that they are reflected in your Cloudflare account.

To deploy the changes, run:

Terminal window

```

pulumi up --yes


```

```

wait for the dev stack to become ready


```

## 4\. Configure your DNS provider

Note

This process makes Cloudflare your authoritative DNS provider, allowing your DNS queries and web traffic to be served from and protected by the Cloudflare network.

[Learn more about pending domains](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/)

Note

If your site is `example.com`, skip ahead to [Test your site](#5-test-your-site).

### a. Obtain your nameservers

Once you have added a domain to Cloudflare, that domain will receive two assigned authoritative nameservers.

To retrieve the assigned `nameservers`, run:

Terminal window

```

pulumi stack output


```

### b. Update your registrar

Update the nameservers at your registrar to activate Cloudflare services for your domain. The instructions are registrar-specific. You may be able to find guidance under [this consolidated list of common registrars](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/#34-update-your-registrar).

Warning

Registrars take up to 24 hours to process nameserver changes.

### c. Check your domain status

Once successfully registered, your domain `status` will change to `active`.

Terminal window

```

pulumi stack output


```

## 5\. Test your site

You will run two `nslookup` commands against the Cloudflare-assigned nameservers.

To test your site, run:

Terminal window

```

DOMAIN=$(pulumi config get domain)

NS1=$(pulumi stack output nameservers | jq '.[0]' -r)

NS2=$(pulumi stack output nameservers | jq '.[1]' -r)

nslookup $DOMAIN $NS1

nslookup $DOMAIN $NS2


```

For .NET, use `Nameservers` as the Output.

Confirm your response returns the IP address(es) for your site.

Note

You will not receive a valid response if you use `example.com` as your site.

## 6\. Clean up

In this last step, you will remove the resources and stack used throughout the tutorial.

### a. Delete the resources

Terminal window

```

pulumi destroy --yes


```

### b. Remove the stack

Terminal window

```

pulumi stack rm dev


```

## Next steps

You have incrementally defined Cloudflare resources needed to add a site to Cloudflare. You declare the resources in your programming language of choice and let Pulumi handle the rest.

To deploy a serverless app with Pulumi, follow the [Deploy a Worker tutorial](https://developers.cloudflare.com/pulumi/tutorial/hello-world/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pulumi/tutorial/add-site/#page","headline":"Add a site · Pulumi docs","description":"This tutorial uses Pulumi infrastructure as code (IaC) to familiarize yourself with the resource management lifecycle.","url":"https://developers.cloudflare.com/pulumi/tutorial/add-site/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript","TypeScript","Python","Go","Java",".NET","YAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pulumi/","name":"Pulumi"}},{"@type":"ListItem","position":3,"item":{"@id":"/pulumi/tutorial/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/pulumi/tutorial/add-site/","name":"Add a site"}}]}
```
