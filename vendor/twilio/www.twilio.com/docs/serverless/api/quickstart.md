# Quickstart

Like the Console UI and the [Serverless Toolkit][], create and manage your Services, Functions, and Assets with the Serverless API. This API lets you create custom Build and Deployment automations that suit your specific needs.

> \[!WARNING]
>
> This API can't access classic Functions and Assets. Nor can the classic Functions and Assets interface access API-generated Functions and Assets.

## Deploying a single Function

1. Create a [Service][] that contains your Environments.
   The value of the `uniqueName` parameter becomes part of your [hostname][] for your Function.

   **For example**: A Service with the unique name `Hoot` creates a hostname of `https://hoot-3234.twil.io`.

   #### View the Create Service example

   Create a Service

   ```js
   // Download the helper library from https://www.twilio.com/docs/node/install
   const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   const accountSid = process.env.TWILIO_ACCOUNT_SID;
   const authToken = process.env.TWILIO_AUTH_TOKEN;
   const client = twilio(accountSid, authToken);

   async function createService() {
     const service = await client.serverless.v1.services.create({
       friendlyName: "testing",
       includeCredentials: true,
       uniqueName: "demo",
     });

     console.log(service.sid);
   }

   createService();
   ```

   ```python
   # Download the helper library from https://www.twilio.com/docs/python/install
   import os
   from twilio.rest import Client

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = os.environ["TWILIO_ACCOUNT_SID"]
   auth_token = os.environ["TWILIO_AUTH_TOKEN"]
   client = Client(account_sid, auth_token)

   service = client.serverless.v1.services.create(
       unique_name="demo", friendly_name="testing", include_credentials=True
   )

   print(service.sid)
   ```

   ```csharp
   // Install the C# / .NET helper library from twilio.com/docs/csharp/install

   using System;
   using Twilio;
   using Twilio.Rest.Serverless.V1;
   using System.Threading.Tasks;

   class Program {
       public static async Task Main(string[] args) {
           // Find your Account SID and Auth Token at twilio.com/console
           // and set the environment variables. See http://twil.io/secure
           string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
           string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

           TwilioClient.Init(accountSid, authToken);

           var service = await ServiceResource.CreateAsync(
               uniqueName: "demo", friendlyName: "testing", includeCredentials: true);

           Console.WriteLine(service.Sid);
       }
   }
   ```

   ```java
   // Install the Java helper library from twilio.com/docs/java/install

   import com.twilio.Twilio;
   import com.twilio.rest.serverless.v1.Service;

   public class Example {
       // Find your Account SID and Auth Token at twilio.com/console
       // and set the environment variables. See http://twil.io/secure
       public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
       public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

       public static void main(String[] args) {
           Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
           Service service = Service.creator("demo", "testing").setIncludeCredentials(true).create();

           System.out.println(service.getSid());
       }
   }
   ```

   ```go
   // Download the helper library from https://www.twilio.com/docs/go/install
   package main

   import (
   	"fmt"
   	"github.com/twilio/twilio-go"
   	serverless "github.com/twilio/twilio-go/rest/serverless/v1"
   	"os"
   )

   func main() {
   	// Find your Account SID and Auth Token at twilio.com/console
   	// and set the environment variables. See http://twil.io/secure
   	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
   	client := twilio.NewRestClient()

   	params := &serverless.CreateServiceParams{}
   	params.SetUniqueName("demo")
   	params.SetFriendlyName("testing")
   	params.SetIncludeCredentials(true)

   	resp, err := client.ServerlessV1.CreateService(params)
   	if err != nil {
   		fmt.Println(err.Error())
   		os.Exit(1)
   	} else {
   		if resp.Sid != nil {
   			fmt.Println(*resp.Sid)
   		} else {
   			fmt.Println(resp.Sid)
   		}
   	}
   }
   ```

   ```php
   <?php

   // Update the path below to your autoload.php,
   // see https://getcomposer.org/doc/01-basic-usage.md
   require_once "/path/to/vendor/autoload.php";

   use Twilio\Rest\Client;

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   $sid = getenv("TWILIO_ACCOUNT_SID");
   $token = getenv("TWILIO_AUTH_TOKEN");
   $twilio = new Client($sid, $token);

   $service = $twilio->serverless->v1->services->create(
       "demo", // UniqueName
       "testing", // FriendlyName
       ["includeCredentials" => true]
   );

   print $service->sid;
   ```

   ```ruby
   # Download the helper library from https://www.twilio.com/docs/ruby/install
   require 'twilio-ruby'

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = ENV['TWILIO_ACCOUNT_SID']
   auth_token = ENV['TWILIO_AUTH_TOKEN']
   @client = Twilio::REST::Client.new(account_sid, auth_token)

   service = @client
             .serverless
             .v1
             .services
             .create(
               unique_name: 'demo',
               friendly_name: 'testing',
               include_credentials: true
             )

   puts service.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:serverless:v1:services:create \
      --unique-name demo \
      --friendly-name testing \
      --include-credentials
   ```

   ```bash
   curl -X POST "https://serverless.twilio.com/v1/Services" \
   --data-urlencode "UniqueName=demo" \
   --data-urlencode "FriendlyName=testing" \
   --data-urlencode "IncludeCredentials=true" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "sid": "ZS00000000000000000000000000000000",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "friendly_name": "testing",
     "unique_name": "demo",
     "include_credentials": true,
     "ui_editable": false,
     "domain_base": "service-unique-1234",
     "date_created": "2018-11-10T20:00:00Z",
     "date_updated": "2018-11-10T20:00:00Z",
     "url": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000",
     "links": {
       "environments": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Environments",
       "functions": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Functions",
       "assets": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Assets",
       "builds": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Builds"
     }
   }
   ```

   The response contains a Service SID, in the format `ZSXX..XX`.
2. Create an [Environment][] using the Service SID.

   #### View the Create Environment example

   Create an Environment

   ```js
   // Download the helper library from https://www.twilio.com/docs/node/install
   const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   const accountSid = process.env.TWILIO_ACCOUNT_SID;
   const authToken = process.env.TWILIO_AUTH_TOKEN;
   const client = twilio(accountSid, authToken);

   async function createEnvironment() {
     const environment = await client.serverless.v1
       .services("ZS00000000000000000000000000000000")
       .environments.create({
         domainSuffix: "dev",
         uniqueName: "dev-Environment",
       });

     console.log(environment.sid);
   }

   createEnvironment();
   ```

   ```python
   # Download the helper library from https://www.twilio.com/docs/python/install
   import os
   from twilio.rest import Client

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = os.environ["TWILIO_ACCOUNT_SID"]
   auth_token = os.environ["TWILIO_AUTH_TOKEN"]
   client = Client(account_sid, auth_token)

   environment = client.serverless.v1.services(
       "ZS00000000000000000000000000000000"
   ).environments.create(unique_name="dev-Environment", domain_suffix="dev")

   print(environment.sid)
   ```

   ```csharp
   // Install the C# / .NET helper library from twilio.com/docs/csharp/install

   using System;
   using Twilio;
   using Twilio.Rest.Serverless.V1.Service;
   using System.Threading.Tasks;

   class Program {
       public static async Task Main(string[] args) {
           // Find your Account SID and Auth Token at twilio.com/console
           // and set the environment variables. See http://twil.io/secure
           string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
           string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

           TwilioClient.Init(accountSid, authToken);

           var environment = await EnvironmentResource.CreateAsync(
               uniqueName: "dev-Environment",
               domainSuffix: "dev",
               pathServiceSid: "ZS00000000000000000000000000000000");

           Console.WriteLine(environment.Sid);
       }
   }
   ```

   ```java
   // Install the Java helper library from twilio.com/docs/java/install

   import com.twilio.Twilio;
   import com.twilio.rest.serverless.v1.service.Environment;

   public class Example {
       // Find your Account SID and Auth Token at twilio.com/console
       // and set the environment variables. See http://twil.io/secure
       public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
       public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

       public static void main(String[] args) {
           Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
           Environment environment = Environment.creator("ZS00000000000000000000000000000000", "dev-Environment")
                                         .setDomainSuffix("dev")
                                         .create();

           System.out.println(environment.getSid());
       }
   }
   ```

   ```go
   // Download the helper library from https://www.twilio.com/docs/go/install
   package main

   import (
   	"fmt"
   	"github.com/twilio/twilio-go"
   	serverless "github.com/twilio/twilio-go/rest/serverless/v1"
   	"os"
   )

   func main() {
   	// Find your Account SID and Auth Token at twilio.com/console
   	// and set the environment variables. See http://twil.io/secure
   	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
   	client := twilio.NewRestClient()

   	params := &serverless.CreateEnvironmentParams{}
   	params.SetUniqueName("dev-Environment")
   	params.SetDomainSuffix("dev")

   	resp, err := client.ServerlessV1.CreateEnvironment("ZS00000000000000000000000000000000",
   		params)
   	if err != nil {
   		fmt.Println(err.Error())
   		os.Exit(1)
   	} else {
   		if resp.Sid != nil {
   			fmt.Println(*resp.Sid)
   		} else {
   			fmt.Println(resp.Sid)
   		}
   	}
   }
   ```

   ```php
   <?php

   // Update the path below to your autoload.php,
   // see https://getcomposer.org/doc/01-basic-usage.md
   require_once "/path/to/vendor/autoload.php";

   use Twilio\Rest\Client;

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   $sid = getenv("TWILIO_ACCOUNT_SID");
   $token = getenv("TWILIO_AUTH_TOKEN");
   $twilio = new Client($sid, $token);

   $environment = $twilio->serverless->v1
       ->services("ZS00000000000000000000000000000000")
       ->environments->create(
           "dev-Environment", // UniqueName
           ["domainSuffix" => "dev"]
       );

   print $environment->sid;
   ```

   ```ruby
   # Download the helper library from https://www.twilio.com/docs/ruby/install
   require 'twilio-ruby'

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = ENV['TWILIO_ACCOUNT_SID']
   auth_token = ENV['TWILIO_AUTH_TOKEN']
   @client = Twilio::REST::Client.new(account_sid, auth_token)

   environment = @client
                 .serverless
                 .v1
                 .services('ZS00000000000000000000000000000000')
                 .environments
                 .create(
                   unique_name: 'dev-Environment',
                   domain_suffix: 'dev'
                 )

   puts environment.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:serverless:v1:services:environments:create \
      --service-sid ZS00000000000000000000000000000000 \
      --unique-name dev-Environment \
      --domain-suffix dev
   ```

   ```bash
   curl -X POST "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Environments" \
   --data-urlencode "UniqueName=dev-Environment" \
   --data-urlencode "DomainSuffix=dev" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "sid": "ZE00000000000000000000000000000000",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "service_sid": "ZS00000000000000000000000000000000",
     "build_sid": null,
     "unique_name": "dev-Environment",
     "domain_suffix": "dev",
     "domain_name": "foobar-1234-stage.twil.io",
     "date_created": "2018-11-10T20:00:00Z",
     "date_updated": "2018-11-10T20:00:00Z",
     "url": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Environments/ZE00000000000000000000000000000000",
     "links": {
       "variables": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Environments/ZE00000000000000000000000000000000/Variables",
       "deployments": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Environments/ZE00000000000000000000000000000000/Deployments",
       "logs": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Environments/ZE00000000000000000000000000000000/Logs"
     }
   }
   ```

   * The request returns an empty Environment as a hostname like `demo-X4HX-dev.twil.io`.
   * To view the hostname, fetch the Environment for your Environment using the `ZEXX..XX` SID.

     #### View the Fetch Environment Hostname example

     Fetch Environment Hostname

     ```js
     // Download the helper library from https://www.twilio.com/docs/node/install
     const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

     // Find your Account SID and Auth Token at twilio.com/console
     // and set the environment variables. See http://twil.io/secure
     const accountSid = process.env.TWILIO_ACCOUNT_SID;
     const authToken = process.env.TWILIO_AUTH_TOKEN;
     const client = twilio(accountSid, authToken);

     async function fetchEnvironment() {
       const environment = await client.serverless.v1
         .services("ZS00000000000000000000000000000000")
         .environments("ZE00000000000000000000000000000000")
         .fetch();

       console.log(environment.domainName);
     }

     fetchEnvironment();
     ```

     ```python
     # Download the helper library from https://www.twilio.com/docs/python/install
     import os
     from twilio.rest import Client

     # Find your Account SID and Auth Token at twilio.com/console
     # and set the environment variables. See http://twil.io/secure
     account_sid = os.environ["TWILIO_ACCOUNT_SID"]
     auth_token = os.environ["TWILIO_AUTH_TOKEN"]
     client = Client(account_sid, auth_token)

     environment = (
         client.serverless.v1.services("ZS00000000000000000000000000000000")
         .environments("ZE00000000000000000000000000000000")
         .fetch()
     )

     print(environment.domain_name)
     ```

     ```csharp
     // Install the C# / .NET helper library from twilio.com/docs/csharp/install

     using System;
     using Twilio;
     using Twilio.Rest.Serverless.V1.Service;
     using System.Threading.Tasks;

     class Program {
         public static async Task Main(string[] args) {
             // Find your Account SID and Auth Token at twilio.com/console
             // and set the environment variables. See http://twil.io/secure
             string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
             string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

             TwilioClient.Init(accountSid, authToken);

             var environment = await EnvironmentResource.FetchAsync(
                 pathServiceSid: "ZS00000000000000000000000000000000",
                 pathSid: "ZE00000000000000000000000000000000");

             Console.WriteLine(environment.DomainName);
         }
     }
     ```

     ```java
     // Install the Java helper library from twilio.com/docs/java/install

     import com.twilio.Twilio;
     import com.twilio.rest.serverless.v1.service.Environment;

     public class Example {
         // Find your Account SID and Auth Token at twilio.com/console
         // and set the environment variables. See http://twil.io/secure
         public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
         public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

         public static void main(String[] args) {
             Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
             Environment environment =
                 Environment.fetcher("ZS00000000000000000000000000000000", "ZE00000000000000000000000000000000").fetch();

             System.out.println(environment.getDomainName());
         }
     }
     ```

     ```go
     // Download the helper library from https://www.twilio.com/docs/go/install
     package main

     import (
     	"fmt"
     	"github.com/twilio/twilio-go"
     	"os"
     )

     func main() {
     	// Find your Account SID and Auth Token at twilio.com/console
     	// and set the environment variables. See http://twil.io/secure
     	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
     	client := twilio.NewRestClient()

     	resp, err := client.ServerlessV1.FetchEnvironment("ZS00000000000000000000000000000000",
     		"ZE00000000000000000000000000000000")
     	if err != nil {
     		fmt.Println(err.Error())
     		os.Exit(1)
     	} else {
     		if resp.DomainName != nil {
     			fmt.Println(*resp.DomainName)
     		} else {
     			fmt.Println(resp.DomainName)
     		}
     	}
     }
     ```

     ```php
     <?php

     // Update the path below to your autoload.php,
     // see https://getcomposer.org/doc/01-basic-usage.md
     require_once "/path/to/vendor/autoload.php";

     use Twilio\Rest\Client;

     // Find your Account SID and Auth Token at twilio.com/console
     // and set the environment variables. See http://twil.io/secure
     $sid = getenv("TWILIO_ACCOUNT_SID");
     $token = getenv("TWILIO_AUTH_TOKEN");
     $twilio = new Client($sid, $token);

     $environment = $twilio->serverless->v1
         ->services("ZS00000000000000000000000000000000")
         ->environments("ZE00000000000000000000000000000000")
         ->fetch();

     print $environment->domainName;
     ```

     ```ruby
     # Download the helper library from https://www.twilio.com/docs/ruby/install
     require 'twilio-ruby'

     # Find your Account SID and Auth Token at twilio.com/console
     # and set the environment variables. See http://twil.io/secure
     account_sid = ENV['TWILIO_ACCOUNT_SID']
     auth_token = ENV['TWILIO_AUTH_TOKEN']
     @client = Twilio::REST::Client.new(account_sid, auth_token)

     environment = @client
                   .serverless
                   .v1
                   .services('ZS00000000000000000000000000000000')
                   .environments('ZE00000000000000000000000000000000')
                   .fetch

     puts environment.domain_name
     ```

     ```bash
     # Install the twilio-cli from https://twil.io/cli

     twilio api:serverless:v1:services:environments:fetch \
        --service-sid ZS00000000000000000000000000000000 \
        --sid ZE00000000000000000000000000000000
     ```

     ```bash
     curl -X GET "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Environments/ZE00000000000000000000000000000000" \
     -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
     ```

     ```json
     {
       "sid": "ZE00000000000000000000000000000000",
       "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
       "service_sid": "ZS00000000000000000000000000000000",
       "build_sid": "ZB00000000000000000000000000000000",
       "unique_name": "testing-environment",
       "domain_suffix": "testing",
       "domain_name": "foobar-1234-testing.twil.io",
       "date_created": "2018-11-10T20:00:00Z",
       "date_updated": "2018-11-10T20:00:00Z",
       "url": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Environments/ZE00000000000000000000000000000000",
       "links": {
         "variables": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Environments/ZE00000000000000000000000000000000/Variables",
         "deployments": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Environments/ZE00000000000000000000000000000000/Deployments",
         "logs": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Environments/ZE00000000000000000000000000000000/Logs"
       }
     }
     ```
3. Create a [Function][] with a `FriendlyName` parameter.

   * The response includes a Function SID in the format `ZHxxx`.
   * Save this SID. To create the first [version][funcversion] of this Function, you need this SID.

   #### View the Create Function example

   Create a Function

   ```js
   // Download the helper library from https://www.twilio.com/docs/node/install
   const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   const accountSid = process.env.TWILIO_ACCOUNT_SID;
   const authToken = process.env.TWILIO_AUTH_TOKEN;
   const client = twilio(accountSid, authToken);

   async function createFunction() {
     const func = await client.serverless.v1
       .services("ZS00000000000000000000000000000000")
       .functions.create({ friendlyName: "firstfunc" });

     console.log(func.sid);
   }

   createFunction();
   ```

   ```python
   # Download the helper library from https://www.twilio.com/docs/python/install
   import os
   from twilio.rest import Client

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = os.environ["TWILIO_ACCOUNT_SID"]
   auth_token = os.environ["TWILIO_AUTH_TOKEN"]
   client = Client(account_sid, auth_token)

   function = client.serverless.v1.services(
       "ZS00000000000000000000000000000000"
   ).functions.create(friendly_name="firstfunc")

   print(function.sid)
   ```

   ```csharp
   // Install the C# / .NET helper library from twilio.com/docs/csharp/install

   using System;
   using Twilio;
   using Twilio.Rest.Serverless.V1.Service;
   using System.Threading.Tasks;

   class Program {
       public static async Task Main(string[] args) {
           // Find your Account SID and Auth Token at twilio.com/console
           // and set the environment variables. See http://twil.io/secure
           string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
           string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

           TwilioClient.Init(accountSid, authToken);

           var function = await FunctionResource.CreateAsync(
               friendlyName: "firstfunc", pathServiceSid: "ZS00000000000000000000000000000000");

           Console.WriteLine(function.Sid);
       }
   }
   ```

   ```java
   // Install the Java helper library from twilio.com/docs/java/install

   import com.twilio.Twilio;
   import com.twilio.rest.serverless.v1.service.Function;

   public class Example {
       // Find your Account SID and Auth Token at twilio.com/console
       // and set the environment variables. See http://twil.io/secure
       public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
       public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

       public static void main(String[] args) {
           Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
           Function function = Function.creator("ZS00000000000000000000000000000000", "firstfunc").create();

           System.out.println(function.getSid());
       }
   }
   ```

   ```go
   // Download the helper library from https://www.twilio.com/docs/go/install
   package main

   import (
   	"fmt"
   	"github.com/twilio/twilio-go"
   	serverless "github.com/twilio/twilio-go/rest/serverless/v1"
   	"os"
   )

   func main() {
   	// Find your Account SID and Auth Token at twilio.com/console
   	// and set the environment variables. See http://twil.io/secure
   	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
   	client := twilio.NewRestClient()

   	params := &serverless.CreateFunctionParams{}
   	params.SetFriendlyName("firstfunc")

   	resp, err := client.ServerlessV1.CreateFunction("ZS00000000000000000000000000000000",
   		params)
   	if err != nil {
   		fmt.Println(err.Error())
   		os.Exit(1)
   	} else {
   		if resp.Sid != nil {
   			fmt.Println(*resp.Sid)
   		} else {
   			fmt.Println(resp.Sid)
   		}
   	}
   }
   ```

   ```php
   <?php

   // Update the path below to your autoload.php,
   // see https://getcomposer.org/doc/01-basic-usage.md
   require_once "/path/to/vendor/autoload.php";

   use Twilio\Rest\Client;

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   $sid = getenv("TWILIO_ACCOUNT_SID");
   $token = getenv("TWILIO_AUTH_TOKEN");
   $twilio = new Client($sid, $token);

   $function = $twilio->serverless->v1
       ->services("ZS00000000000000000000000000000000")
       ->functions->create(
           "firstfunc" // FriendlyName
       );

   print $function->sid;
   ```

   ```ruby
   # Download the helper library from https://www.twilio.com/docs/ruby/install
   require 'twilio-ruby'

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = ENV['TWILIO_ACCOUNT_SID']
   auth_token = ENV['TWILIO_AUTH_TOKEN']
   @client = Twilio::REST::Client.new(account_sid, auth_token)

   function = @client
              .serverless
              .v1
              .services('ZS00000000000000000000000000000000')
              .functions
              .create(friendly_name: 'firstfunc')

   puts function.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:serverless:v1:services:functions:create \
      --service-sid ZS00000000000000000000000000000000 \
      --friendly-name firstfunc
   ```

   ```bash
   curl -X POST "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Functions" \
   --data-urlencode "FriendlyName=firstfunc" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "sid": "ZH00000000000000000000000000000000",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "service_sid": "ZS00000000000000000000000000000000",
     "friendly_name": "firstfunc",
     "date_created": "2018-11-10T20:00:00Z",
     "date_updated": "2018-11-10T20:00:00Z",
     "url": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Functions/ZH00000000000000000000000000000000",
     "links": {
       "function_versions": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Functions/ZH00000000000000000000000000000000/Versions"
     }
   }
   ```
4. Write the code for your Function and save it as `firstfunc.js`.

   #### View the example Function code

   The following example randomly determines whether Thanos spares the universe:

   ```javascript
   exports.handler = (context, event, callback) => {
     const sparedByThanos = Math.random() > 0.5;

     callback(null, {
       sparedByThanos,
       quote: 'You should have gone for the head.'
     });
   };
   ```
5. Create the first version of your Function using a `POST` request.

   * [Function or Asset versions](#code-upload-your-function-code) define the path, Visibility ([public, protected, or private][funcAssetVis]), and file content.
   * Replace `ZSXX..XX` with your Service SID and `ZHXX..XX` with your Function SID.
   * The response returns a Version SID (`ZNXX..XX`).

   #### View the Upload Function example

   Upload your Function code

   ```js
   const fs = require('fs');
   // Before running this code, install "form-data" and "axios" using `npm install form-data axios`
   const FormData = require('form-data');
   const axios = require('axios');

   // Provision API Keys at twilio.com/console/runtime/api-keys
   // and set the environment variables. See https://twil.io/secure
   const apiKey = process.env.TWILIO_API_KEY;
   const apiSecret = process.env.TWILIO_API_SECRET;

   const serviceSid = 'ZSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
   const functionSid = 'ZHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

   const serviceUrl = `https://serverless-upload.twilio.com/v1/Services/${serviceSid}`;
   const uploadUrl = `${serviceUrl}/Functions/${functionSid}/Versions`;

   const form = new FormData();
   form.append('Path', '/thanos');
   form.append('Visibility', 'public');
   form.append('Content', fs.createReadStream('firstfunc.js'), {
     contentType: 'application/javascript',
   });

   // Create a new Function Version
   axios
     .post(uploadUrl, form, {
       auth: {
         username: apiKey,
         password: apiSecret,
       },
       headers: form.getHeaders(),
     })
     .then((response) => {
       const newVersionSid = response.data.sid;
       console.log(newVersionSid);
     });
   ```

   ```py
   import os
   import requests
   import json

   # Provision API Keys at twilio.com/console/runtime/api-keys
   # and set the environment variables. See https://twil.io/secure
   api_key = os.environ['TWILIO_API_KEY']
   api_secret = os.environ['TWILIO_API_SECRET']

   service_sid = 'ZSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
   function_sid = 'ZHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

   service_url = f'https://serverless-upload.twilio.com/v1/Services/{service_sid}'
   upload_url = f'{service_url}/Functions/{function_sid}/Versions'

   file_contents = open('firstfunc.js', 'rb')

   # Create a new Function Version
   response = requests.post(
       upload_url,
       auth=(api_key, api_secret),
       files={
           'Content': ('firstfunc.js', file_contents, 'application/javascript')
       },
       data={
           'Path': '/thanos',
           'Visibility': 'public',
       },
   )

   new_version_sid = json.loads(response.text).get("sid")
   print(new_version_sid)
   ```

   ```java
   import java.io.File;

   import kong.unirest.HttpResponse;
   import kong.unirest.JsonNode;
   import kong.unirest.Unirest;
   import kong.unirest.json.JSONObject;

   public class UploadFunctionExample {
     public static void main(String[] args) {
       // Provision API Keys at twilio.com/console/runtime/api-keys
       // and set the environment variables. See https://twil.io/secure
       String TWILIO_API_KEY = System.getenv("TWILIO_API_KEY");
       String TWILIO_API_SECRET = System.getenv("TWILIO_API_SECRET");

       String service_sid = "ZSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
       String function_sid = "ZHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

       String service_url = "https://serverless-upload.twilio.com/v1/Services/" + service_sid;
       String upload_url = service_url + "/Functions/" + function_sid + "/Versions";

       HttpResponse<JsonNode> response = Unirest.post(upload_url)
           .basicAuth(TWILIO_API_KEY, TWILIO_API_SECRET)
           .field("Content", new File("firstfunc.js"), "application/javascript")
           .field("Path", "/thanos")
           .field("Visibility", "public")
           .charset(null)
           .asJson();

       JSONObject function_version = response.getBody().getObject();
       String function_version_sid = function_version.get("sid").toString();
       System.out.println(function_version_sid);
     }
   }
   ```

   ```php
   <?php

   # Provision API Keys at twilio.com/console/runtime/api-keys
   # and set the environment variables. See https://twil.io/secure
   $api_key = getenv("TWILIO_API_KEY");
   $api_secret = getenv("TWILIO_API_SECRET");

   $service_sid = "ZSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
   $function_sid = "ZHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

   $curl = curl_init();

   curl_setopt_array($curl, array(
     CURLOPT_URL => "https://serverless-upload.twilio.com/v1/Services/${service_sid}" .
       "/Functions/${function_sid}/Versions",
     CURLOPT_POST => true,
     CURLOPT_POSTFIELDS => array(
       'Content' => new CURLFile(
         'firstfunc.js',
         'application/javascript',
         'firstfunc.js'
       ),
       'Path' => '/thanos',
       'Visibility' => 'public'
     ),
     CURLOPT_USERPWD => $api_key . ":" . $api_secret,
     CURLOPT_RETURNTRANSFER => true
   ));

   # Create a new Function Version
   $response = curl_exec($curl);
   curl_close($curl);

   $data = json_decode($response);
   echo $data->sid;
   ```

   ```rb
   require 'uri'
   require 'http'
   require 'json'

   # Provision API Keys at twilio.com/console/runtime/api-keys
   # and set the environment variables. See https://twil.io/secure
   api_key = ENV['TWILIO_API_KEY']
   api_secret = ENV['TWILIO_API_SECRET']

   service_sid = 'ZSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
   function_sid = 'ZHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

   service_url = "https://serverless-upload.twilio.com/v1/Services/#{service_sid}"
   upload_url = URI("#{service_url}/Functions/#{function_sid}/Versions")

   response = HTTP
              .basic_auth(user: api_key, pass: api_secret)
              .post(upload_url, form: {
                      'Content' => HTTP::FormData::File.new(
                        'firstfunc.js',
                        content_type: 'application/javascript',
                        filename: 'firstfunc.js'
                      ),
                      'Path' => '/thanos',
                      'Visibility' => 'public'
                    })

   data = response.parse
   puts data['sid']
   ```

   ```bash
   curl -X POST "https://serverless-upload.twilio.com/v1/Services/ZSxxx/Functions/ZHxxx/Versions" \
   -F "Content=@firstfunc.js; type=application/javascript" \
   -F "Path=/thanos" \
   -F "Visibility=public" \
   -u "TWILIO_API_KEY:TWILIO_API_SECRET"
   ```
6. To compile your Function and Asset versions into a single, deployable package, create a [Build][].

   * Twilio stores this Build on your behalf.
   * The response returns a `status` property.

   #### View the Create Build without dependencies example

   Create a Build

   ```js
   // Download the helper library from https://www.twilio.com/docs/node/install
   const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   const accountSid = process.env.TWILIO_ACCOUNT_SID;
   const authToken = process.env.TWILIO_AUTH_TOKEN;
   const client = twilio(accountSid, authToken);

   async function createBuild() {
     const build = await client.serverless.v1
       .services("ZS00000000000000000000000000000000")
       .builds.create({
         functionVersions: ["ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
       });

     console.log(build.sid);
   }

   createBuild();
   ```

   ```python
   # Download the helper library from https://www.twilio.com/docs/python/install
   import os
   from twilio.rest import Client

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = os.environ["TWILIO_ACCOUNT_SID"]
   auth_token = os.environ["TWILIO_AUTH_TOKEN"]
   client = Client(account_sid, auth_token)

   build = client.serverless.v1.services(
       "ZS00000000000000000000000000000000"
   ).builds.create(function_versions=["ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"])

   print(build.sid)
   ```

   ```csharp
   // Install the C# / .NET helper library from twilio.com/docs/csharp/install

   using System;
   using Twilio;
   using Twilio.Rest.Serverless.V1.Service;
   using System.Threading.Tasks;
   using System.Collections.Generic;

   class Program {
       public static async Task Main(string[] args) {
           // Find your Account SID and Auth Token at twilio.com/console
           // and set the environment variables. See http://twil.io/secure
           string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
           string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

           TwilioClient.Init(accountSid, authToken);

           var build = await BuildResource.CreateAsync(
               functionVersions: new List<string> { "ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
               pathServiceSid: "ZS00000000000000000000000000000000");

           Console.WriteLine(build.Sid);
       }
   }
   ```

   ```java
   // Install the Java helper library from twilio.com/docs/java/install

   import java.util.Arrays;
   import com.twilio.Twilio;
   import com.twilio.rest.serverless.v1.service.Build;

   public class Example {
       // Find your Account SID and Auth Token at twilio.com/console
       // and set the environment variables. See http://twil.io/secure
       public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
       public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

       public static void main(String[] args) {
           Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
           Build build = Build.creator("ZS00000000000000000000000000000000")
                             .setFunctionVersions(Arrays.asList("ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"))
                             .create();

           System.out.println(build.getSid());
       }
   }
   ```

   ```go
   // Download the helper library from https://www.twilio.com/docs/go/install
   package main

   import (
   	"fmt"
   	"github.com/twilio/twilio-go"
   	serverless "github.com/twilio/twilio-go/rest/serverless/v1"
   	"os"
   )

   func main() {
   	// Find your Account SID and Auth Token at twilio.com/console
   	// and set the environment variables. See http://twil.io/secure
   	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
   	client := twilio.NewRestClient()

   	params := &serverless.CreateBuildParams{}
   	params.SetFunctionVersions([]string{
   		"ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
   	})

   	resp, err := client.ServerlessV1.CreateBuild("ZS00000000000000000000000000000000",
   		params)
   	if err != nil {
   		fmt.Println(err.Error())
   		os.Exit(1)
   	} else {
   		if resp.Sid != nil {
   			fmt.Println(*resp.Sid)
   		} else {
   			fmt.Println(resp.Sid)
   		}
   	}
   }
   ```

   ```php
   <?php

   // Update the path below to your autoload.php,
   // see https://getcomposer.org/doc/01-basic-usage.md
   require_once "/path/to/vendor/autoload.php";

   use Twilio\Rest\Client;

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   $sid = getenv("TWILIO_ACCOUNT_SID");
   $token = getenv("TWILIO_AUTH_TOKEN");
   $twilio = new Client($sid, $token);

   $build = $twilio->serverless->v1
       ->services("ZS00000000000000000000000000000000")
       ->builds->create([
           "functionVersions" => ["ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
       ]);

   print $build->sid;
   ```

   ```ruby
   # Download the helper library from https://www.twilio.com/docs/ruby/install
   require 'twilio-ruby'

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = ENV['TWILIO_ACCOUNT_SID']
   auth_token = ENV['TWILIO_AUTH_TOKEN']
   @client = Twilio::REST::Client.new(account_sid, auth_token)

   build = @client
           .serverless
           .v1
           .services('ZS00000000000000000000000000000000')
           .builds
           .create(
             function_versions: [
               'ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
             ]
           )

   puts build.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:serverless:v1:services:builds:create \
      --service-sid ZS00000000000000000000000000000000 \
      --function-versions ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

   ```bash
   curl -X POST "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Builds" \
   --data-urlencode "FunctionVersions=ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "sid": "ZB00000000000000000000000000000000",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "service_sid": "ZS00000000000000000000000000000000",
     "asset_versions": [
       {
         "sid": "ZN00000000000000000000000000000000",
         "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
         "service_sid": "ZS00000000000000000000000000000000",
         "asset_sid": "ZH00000000000000000000000000000000",
         "date_created": "2018-11-10T20:00:00Z",
         "path": "/asset-path",
         "visibility": "PUBLIC"
       }
     ],
     "function_versions": [
       "ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
     ],
     "dependencies": [
       {
         "name": "twilio",
         "version": "3.29.2"
       },
       {
         "name": "@twilio/runtime-handler",
         "version": "1.0.1"
       }
     ],
     "runtime": "node22",
     "status": "building",
     "date_created": "2018-11-10T20:00:00Z",
     "date_updated": "2018-11-10T20:00:00Z",
     "url": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Builds/ZB00000000000000000000000000000000",
     "links": {
       "build_status": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Builds/ZB00000000000000000000000000000000/Status"
     }
   }
   ```

   #### View the Create Build with dependencies example

   When you create a Build, specify dependencies that your code requires. Provide the `Dependencies` parameter as a JSON-stringified array of package `name` and `version` pairs.

   Create a Build with dependencies

   ```js
   // Download the helper library from https://www.twilio.com/docs/node/install
   const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   const accountSid = process.env.TWILIO_ACCOUNT_SID;
   const authToken = process.env.TWILIO_AUTH_TOKEN;
   const client = twilio(accountSid, authToken);

   async function createBuild() {
     const build = await client.serverless.v1
       .services("ZS00000000000000000000000000000000")
       .builds.create({
         dependencies: JSON.stringify([{ name: "randomcolor", version: "0.5.4" }]),
         functionVersions: ["ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
       });

     console.log(build.sid);
   }

   createBuild();
   ```

   ```python
   # Download the helper library from https://www.twilio.com/docs/python/install
   import os
   from twilio.rest import Client
   import json

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = os.environ["TWILIO_ACCOUNT_SID"]
   auth_token = os.environ["TWILIO_AUTH_TOKEN"]
   client = Client(account_sid, auth_token)

   build = client.serverless.v1.services(
       "ZS00000000000000000000000000000000"
   ).builds.create(
       function_versions=["ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
       dependencies=json.dumps([{"name": "randomcolor", "version": "0.5.4"}]),
   )

   print(build.sid)
   ```

   ```csharp
   // Install the C# / .NET helper library from twilio.com/docs/csharp/install

   using System;
   using Twilio;
   using Twilio.Rest.Serverless.V1.Service;
   using System.Threading.Tasks;
   using System.Collections.Generic;
   using Newtonsoft.Json;

   class Program {
       public static async Task Main(string[] args) {
           // Find your Account SID and Auth Token at twilio.com/console
           // and set the environment variables. See http://twil.io/secure
           string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
           string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

           TwilioClient.Init(accountSid, authToken);

           var build = await BuildResource.CreateAsync(
               functionVersions: new List<string> { "ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
               dependencies: JsonConvert.SerializeObject(
                   new List<Object> { new Dictionary<string, Object>() {
                       { "name", "randomcolor" }, { "version", "0.5.4" }
                   } },
                   Formatting.Indented),
               pathServiceSid: "ZS00000000000000000000000000000000");

           Console.WriteLine(build.Sid);
       }
   }
   ```

   ```java
   // Install the Java helper library from twilio.com/docs/java/install

   import java.util.Arrays;
   import java.util.HashMap;
   import com.twilio.Twilio;
   import com.twilio.rest.serverless.v1.service.Build;
   import org.json.JSONObject;

   public class Example {
       // Find your Account SID and Auth Token at twilio.com/console
       // and set the environment variables. See http://twil.io/secure
       public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
       public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

       public static void main(String[] args) {
           Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
           Build build = Build.creator("ZS00000000000000000000000000000000")
                             .setFunctionVersions(Arrays.asList("ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"))
                             .setDependencies(new JSONObject(Arrays.asList(new HashMap<String, Object>() {
                                 {
                                     put("name", "randomcolor");
                                     put("version", "0.5.4");
                                 }
                             })).toString())
                             .create();

           System.out.println(build.getSid());
       }
   }
   ```

   ```go
   // Download the helper library from https://www.twilio.com/docs/go/install
   package main

   import (
   	"encoding/json"
   	"fmt"
   	"github.com/twilio/twilio-go"
   	serverless "github.com/twilio/twilio-go/rest/serverless/v1"
   	"os"
   )

   func main() {
   	// Find your Account SID and Auth Token at twilio.com/console
   	// and set the environment variables. See http://twil.io/secure
   	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
   	client := twilio.NewRestClient()

   	Dependencies, DependenciesError := json.Marshal([]interface{}{
   		map[string]interface{}{
   			"name":    "randomcolor",
   			"version": "0.5.4",
   		},
   	})

   	if DependenciesError != nil {
   		fmt.Println(DependenciesError)
   		os.Exit(1)
   	}

   	params := &serverless.CreateBuildParams{}
   	params.SetFunctionVersions([]string{
   		"ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
   	})
   	params.SetDependencies(string(Dependencies))

   	resp, err := client.ServerlessV1.CreateBuild("ZS00000000000000000000000000000000",
   		params)
   	if err != nil {
   		fmt.Println(err.Error())
   		os.Exit(1)
   	} else {
   		if resp.Sid != nil {
   			fmt.Println(*resp.Sid)
   		} else {
   			fmt.Println(resp.Sid)
   		}
   	}
   }
   ```

   ```php
   <?php

   // Update the path below to your autoload.php,
   // see https://getcomposer.org/doc/01-basic-usage.md
   require_once "/path/to/vendor/autoload.php";

   use Twilio\Rest\Client;

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   $sid = getenv("TWILIO_ACCOUNT_SID");
   $token = getenv("TWILIO_AUTH_TOKEN");
   $twilio = new Client($sid, $token);

   $build = $twilio->serverless->v1
       ->services("ZS00000000000000000000000000000000")
       ->builds->create([
           "functionVersions" => ["ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
           "dependencies" => json_encode([
               [
                   "name" => "randomcolor",
                   "version" => "0.5.4",
               ],
           ]),
       ]);

   print $build->sid;
   ```

   ```ruby
   # Download the helper library from https://www.twilio.com/docs/ruby/install
   require 'twilio-ruby'

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = ENV['TWILIO_ACCOUNT_SID']
   auth_token = ENV['TWILIO_AUTH_TOKEN']
   @client = Twilio::REST::Client.new(account_sid, auth_token)

   build = @client
           .serverless
           .v1
           .services('ZS00000000000000000000000000000000')
           .builds
           .create(
             function_versions: [
               'ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
             ],
             dependencies: [
                 {
                   'name' => 'randomcolor',
                   'version' => '0.5.4'
                 }
               ].to_json
           )

   puts build.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:serverless:v1:services:builds:create \
      --service-sid ZS00000000000000000000000000000000 \
      --function-versions ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
      --dependencies "[{\"name\": \"randomcolor\", \"version\": \"0.5.4\"}]"
   ```

   ```bash
   DEPENDENCIES_OBJ=$(cat << EOF
   {
     "0": {
       "name": "randomcolor",
       "version": "0.5.4"
     }
   }
   EOF
   )
   curl -X POST "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Builds" \
   --data-urlencode "FunctionVersions=ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
   --data-urlencode "Dependencies=$DEPENDENCIES_OBJ" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "sid": "ZB00000000000000000000000000000000",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "service_sid": "ZS00000000000000000000000000000000",
     "asset_versions": [
       {
         "sid": "ZN00000000000000000000000000000000",
         "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
         "service_sid": "ZS00000000000000000000000000000000",
         "asset_sid": "ZH00000000000000000000000000000000",
         "date_created": "2018-11-10T20:00:00Z",
         "path": "/asset-path",
         "visibility": "PUBLIC"
       }
     ],
     "function_versions": [
       "ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
     ],
     "dependencies": "[{\"name\": \"randomcolor\", \"version\": \"0.5.4\"}]",
     "runtime": "node22",
     "status": "building",
     "date_created": "2018-11-10T20:00:00Z",
     "date_updated": "2018-11-10T20:00:00Z",
     "url": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Builds/ZB00000000000000000000000000000000",
     "links": {
       "build_status": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Builds/ZB00000000000000000000000000000000/Status"
     }
   }
   ```
7. To check the status of the Build, repeat sending the following `GET` request until `"status": "completed"`.

   #### View the Fetch Build example

   Fetch a Build to check its status

   ```js
   // Download the helper library from https://www.twilio.com/docs/node/install
   const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   const accountSid = process.env.TWILIO_ACCOUNT_SID;
   const authToken = process.env.TWILIO_AUTH_TOKEN;
   const client = twilio(accountSid, authToken);

   async function fetchBuild() {
     const build = await client.serverless.v1
       .services("ZS00000000000000000000000000000000")
       .builds("ZB00000000000000000000000000000000")
       .fetch();

     console.log(build.status);
   }

   fetchBuild();
   ```

   ```python
   # Download the helper library from https://www.twilio.com/docs/python/install
   import os
   from twilio.rest import Client

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = os.environ["TWILIO_ACCOUNT_SID"]
   auth_token = os.environ["TWILIO_AUTH_TOKEN"]
   client = Client(account_sid, auth_token)

   build = (
       client.serverless.v1.services("ZS00000000000000000000000000000000")
       .builds("ZB00000000000000000000000000000000")
       .fetch()
   )

   print(build.status)
   ```

   ```csharp
   // Install the C# / .NET helper library from twilio.com/docs/csharp/install

   using System;
   using Twilio;
   using Twilio.Rest.Serverless.V1.Service;
   using System.Threading.Tasks;

   class Program {
       public static async Task Main(string[] args) {
           // Find your Account SID and Auth Token at twilio.com/console
           // and set the environment variables. See http://twil.io/secure
           string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
           string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

           TwilioClient.Init(accountSid, authToken);

           var build = await BuildResource.FetchAsync(
               pathServiceSid: "ZS00000000000000000000000000000000",
               pathSid: "ZB00000000000000000000000000000000");

           Console.WriteLine(build.Status);
       }
   }
   ```

   ```java
   // Install the Java helper library from twilio.com/docs/java/install

   import com.twilio.Twilio;
   import com.twilio.rest.serverless.v1.service.Build;

   public class Example {
       // Find your Account SID and Auth Token at twilio.com/console
       // and set the environment variables. See http://twil.io/secure
       public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
       public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

       public static void main(String[] args) {
           Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
           Build build = Build.fetcher("ZS00000000000000000000000000000000", "ZB00000000000000000000000000000000").fetch();

           System.out.println(build.getStatus());
       }
   }
   ```

   ```go
   // Download the helper library from https://www.twilio.com/docs/go/install
   package main

   import (
   	"fmt"
   	"github.com/twilio/twilio-go"
   	"os"
   )

   func main() {
   	// Find your Account SID and Auth Token at twilio.com/console
   	// and set the environment variables. See http://twil.io/secure
   	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
   	client := twilio.NewRestClient()

   	resp, err := client.ServerlessV1.FetchBuild("ZS00000000000000000000000000000000",
   		"ZB00000000000000000000000000000000")
   	if err != nil {
   		fmt.Println(err.Error())
   		os.Exit(1)
   	} else {
   		if resp.Status != nil {
   			fmt.Println(resp.Status)
   		} else {
   			fmt.Println(resp.Status)
   		}
   	}
   }
   ```

   ```php
   <?php

   // Update the path below to your autoload.php,
   // see https://getcomposer.org/doc/01-basic-usage.md
   require_once "/path/to/vendor/autoload.php";

   use Twilio\Rest\Client;

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   $sid = getenv("TWILIO_ACCOUNT_SID");
   $token = getenv("TWILIO_AUTH_TOKEN");
   $twilio = new Client($sid, $token);

   $build = $twilio->serverless->v1
       ->services("ZS00000000000000000000000000000000")
       ->builds("ZB00000000000000000000000000000000")
       ->fetch();

   print $build->status;
   ```

   ```ruby
   # Download the helper library from https://www.twilio.com/docs/ruby/install
   require 'twilio-ruby'

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = ENV['TWILIO_ACCOUNT_SID']
   auth_token = ENV['TWILIO_AUTH_TOKEN']
   @client = Twilio::REST::Client.new(account_sid, auth_token)

   build = @client
           .serverless
           .v1
           .services('ZS00000000000000000000000000000000')
           .builds('ZB00000000000000000000000000000000')
           .fetch

   puts build.status
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:serverless:v1:services:builds:fetch \
      --service-sid ZS00000000000000000000000000000000 \
      --sid ZB00000000000000000000000000000000
   ```

   ```bash
   curl -X GET "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Builds/ZB00000000000000000000000000000000" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "sid": "ZB00000000000000000000000000000000",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "service_sid": "ZS00000000000000000000000000000000",
     "asset_versions": [
       {
         "sid": "ZN00000000000000000000000000000000",
         "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
         "service_sid": "ZS00000000000000000000000000000000",
         "asset_sid": "ZH00000000000000000000000000000000",
         "date_created": "2018-11-10T20:00:00Z",
         "path": "/asset-path",
         "visibility": "PUBLIC"
       }
     ],
     "function_versions": [
       {
         "sid": "ZN00000000000000000000000000000001",
         "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
         "service_sid": "ZS00000000000000000000000000000000",
         "function_sid": "ZH00000000000000000000000000000001",
         "date_created": "2018-11-10T20:00:00Z",
         "path": "/function-path",
         "visibility": "PUBLIC"
       }
     ],
     "dependencies": [
       {
         "name": "twilio",
         "version": "3.29.2"
       },
       {
         "name": "@twilio/runtime-handler",
         "version": "1.0.1"
       }
     ],
     "runtime": "node22",
     "status": "building",
     "date_created": "2018-11-10T20:00:00Z",
     "date_updated": "2018-11-10T20:00:00Z",
     "url": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Builds/ZB00000000000000000000000000000000",
     "links": {
       "build_status": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Builds/ZB00000000000000000000000000000000/Status"
     }
   }
   ```
8. Associate the Build with the Environment you created. Twilio calls this association a [Deployment][].

   #### View the Create Deployment example

   Create a Deployment

   ```js
   // Download the helper library from https://www.twilio.com/docs/node/install
   const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   const accountSid = process.env.TWILIO_ACCOUNT_SID;
   const authToken = process.env.TWILIO_AUTH_TOKEN;
   const client = twilio(accountSid, authToken);

   async function createDeployment() {
     const deployment = await client.serverless.v1
       .services("ZS00000000000000000000000000000000")
       .environments("ZE00000000000000000000000000000000")
       .deployments.create({ buildSid: "ZBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" });

     console.log(deployment.sid);
   }

   createDeployment();
   ```

   ```python
   # Download the helper library from https://www.twilio.com/docs/python/install
   import os
   from twilio.rest import Client

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = os.environ["TWILIO_ACCOUNT_SID"]
   auth_token = os.environ["TWILIO_AUTH_TOKEN"]
   client = Client(account_sid, auth_token)

   deployment = (
       client.serverless.v1.services("ZS00000000000000000000000000000000")
       .environments("ZE00000000000000000000000000000000")
       .deployments.create(build_sid="ZBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
   )

   print(deployment.sid)
   ```

   ```csharp
   // Install the C# / .NET helper library from twilio.com/docs/csharp/install

   using System;
   using Twilio;
   using Twilio.Rest.Serverless.V1.Service.Environment;
   using System.Threading.Tasks;

   class Program {
       public static async Task Main(string[] args) {
           // Find your Account SID and Auth Token at twilio.com/console
           // and set the environment variables. See http://twil.io/secure
           string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
           string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

           TwilioClient.Init(accountSid, authToken);

           var deployment = await DeploymentResource.CreateAsync(
               buildSid: "ZBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
               pathServiceSid: "ZS00000000000000000000000000000000",
               pathEnvironmentSid: "ZE00000000000000000000000000000000");

           Console.WriteLine(deployment.Sid);
       }
   }
   ```

   ```java
   // Install the Java helper library from twilio.com/docs/java/install

   import com.twilio.Twilio;
   import com.twilio.rest.serverless.v1.service.environment.Deployment;

   public class Example {
       // Find your Account SID and Auth Token at twilio.com/console
       // and set the environment variables. See http://twil.io/secure
       public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
       public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

       public static void main(String[] args) {
           Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
           Deployment deployment =
               Deployment.creator("ZS00000000000000000000000000000000", "ZE00000000000000000000000000000000")
                   .setBuildSid("ZBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                   .create();

           System.out.println(deployment.getSid());
       }
   }
   ```

   ```go
   // Download the helper library from https://www.twilio.com/docs/go/install
   package main

   import (
   	"fmt"
   	"github.com/twilio/twilio-go"
   	serverless "github.com/twilio/twilio-go/rest/serverless/v1"
   	"os"
   )

   func main() {
   	// Find your Account SID and Auth Token at twilio.com/console
   	// and set the environment variables. See http://twil.io/secure
   	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
   	client := twilio.NewRestClient()

   	params := &serverless.CreateDeploymentParams{}
   	params.SetBuildSid("ZBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

   	resp, err := client.ServerlessV1.CreateDeployment("ZS00000000000000000000000000000000",
   		"ZE00000000000000000000000000000000",
   		params)
   	if err != nil {
   		fmt.Println(err.Error())
   		os.Exit(1)
   	} else {
   		if resp.Sid != nil {
   			fmt.Println(*resp.Sid)
   		} else {
   			fmt.Println(resp.Sid)
   		}
   	}
   }
   ```

   ```php
   <?php

   // Update the path below to your autoload.php,
   // see https://getcomposer.org/doc/01-basic-usage.md
   require_once "/path/to/vendor/autoload.php";

   use Twilio\Rest\Client;

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   $sid = getenv("TWILIO_ACCOUNT_SID");
   $token = getenv("TWILIO_AUTH_TOKEN");
   $twilio = new Client($sid, $token);

   $deployment = $twilio->serverless->v1
       ->services("ZS00000000000000000000000000000000")
       ->environments("ZE00000000000000000000000000000000")
       ->deployments->create(["buildSid" => "ZBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"]);

   print $deployment->sid;
   ```

   ```ruby
   # Download the helper library from https://www.twilio.com/docs/ruby/install
   require 'twilio-ruby'

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = ENV['TWILIO_ACCOUNT_SID']
   auth_token = ENV['TWILIO_AUTH_TOKEN']
   @client = Twilio::REST::Client.new(account_sid, auth_token)

   deployment = @client
                .serverless
                .v1
                .services('ZS00000000000000000000000000000000')
                .environments('ZE00000000000000000000000000000000')
                .deployments
                .create(build_sid: 'ZBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')

   puts deployment.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:serverless:v1:services:environments:deployments:create \
      --service-sid ZS00000000000000000000000000000000 \
      --environment-sid ZE00000000000000000000000000000000 \
      --build-sid ZBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

   ```bash
   curl -X POST "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Environments/ZE00000000000000000000000000000000/Deployments" \
   --data-urlencode "BuildSid=ZBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "sid": "ZD00000000000000000000000000000000",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "service_sid": "ZS00000000000000000000000000000000",
     "environment_sid": "ZE00000000000000000000000000000000",
     "build_sid": "ZBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     "date_created": "2018-11-10T20:00:00Z",
     "date_updated": "2018-11-10T20:00:00Z",
     "url": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Environments/ZE00000000000000000000000000000000/Deployments/ZD00000000000000000000000000000000"
   }
   ```

   After the Deployment completes, your Function goes live.
9. To access your function, go to a URL that resembles `https://demo-X4HX-dev.twil.io/thanos`.
   Replace `demo-X4HX-dev.twil.io` with your Environment's hostname.

## Handle Asset uploads

Upload Assets by following the same pattern you used for Functions:

1. Create an `Asset`.
2. Create the `Asset Version` with a `POST` request to `serverless-uploads.twilio.com`.
3. When you create the Build, include the `AssetVersion` SIDs, any `FunctionVersions`, and dependencies.

   #### View the example

   Create a Build with a Function and an Asset

   ```js
   // Download the helper library from https://www.twilio.com/docs/node/install
   const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   const accountSid = process.env.TWILIO_ACCOUNT_SID;
   const authToken = process.env.TWILIO_AUTH_TOKEN;
   const client = twilio(accountSid, authToken);

   async function createBuild() {
     const build = await client.serverless.v1
       .services("ZS00000000000000000000000000000000")
       .builds.create({
         assetVersions: ["ZNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
         functionVersions: ["ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
       });

     console.log(build.sid);
   }

   createBuild();
   ```

   ```python
   # Download the helper library from https://www.twilio.com/docs/python/install
   import os
   from twilio.rest import Client

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = os.environ["TWILIO_ACCOUNT_SID"]
   auth_token = os.environ["TWILIO_AUTH_TOKEN"]
   client = Client(account_sid, auth_token)

   build = client.serverless.v1.services(
       "ZS00000000000000000000000000000000"
   ).builds.create(
       function_versions=["ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
       asset_versions=["ZNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
   )

   print(build.sid)
   ```

   ```csharp
   // Install the C# / .NET helper library from twilio.com/docs/csharp/install

   using System;
   using Twilio;
   using Twilio.Rest.Serverless.V1.Service;
   using System.Threading.Tasks;
   using System.Collections.Generic;

   class Program {
       public static async Task Main(string[] args) {
           // Find your Account SID and Auth Token at twilio.com/console
           // and set the environment variables. See http://twil.io/secure
           string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
           string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

           TwilioClient.Init(accountSid, authToken);

           var build = await BuildResource.CreateAsync(
               functionVersions: new List<string> { "ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
               assetVersions: new List<string> { "ZNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" },
               pathServiceSid: "ZS00000000000000000000000000000000");

           Console.WriteLine(build.Sid);
       }
   }
   ```

   ```java
   // Install the Java helper library from twilio.com/docs/java/install

   import java.util.Arrays;
   import com.twilio.Twilio;
   import com.twilio.rest.serverless.v1.service.Build;

   public class Example {
       // Find your Account SID and Auth Token at twilio.com/console
       // and set the environment variables. See http://twil.io/secure
       public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
       public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

       public static void main(String[] args) {
           Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
           Build build = Build.creator("ZS00000000000000000000000000000000")
                             .setFunctionVersions(Arrays.asList("ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"))
                             .setAssetVersions(Arrays.asList("ZNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"))
                             .create();

           System.out.println(build.getSid());
       }
   }
   ```

   ```go
   // Download the helper library from https://www.twilio.com/docs/go/install
   package main

   import (
   	"fmt"
   	"github.com/twilio/twilio-go"
   	serverless "github.com/twilio/twilio-go/rest/serverless/v1"
   	"os"
   )

   func main() {
   	// Find your Account SID and Auth Token at twilio.com/console
   	// and set the environment variables. See http://twil.io/secure
   	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
   	client := twilio.NewRestClient()

   	params := &serverless.CreateBuildParams{}
   	params.SetFunctionVersions([]string{
   		"ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
   	})
   	params.SetAssetVersions([]string{
   		"ZNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
   	})

   	resp, err := client.ServerlessV1.CreateBuild("ZS00000000000000000000000000000000",
   		params)
   	if err != nil {
   		fmt.Println(err.Error())
   		os.Exit(1)
   	} else {
   		if resp.Sid != nil {
   			fmt.Println(*resp.Sid)
   		} else {
   			fmt.Println(resp.Sid)
   		}
   	}
   }
   ```

   ```php
   <?php

   // Update the path below to your autoload.php,
   // see https://getcomposer.org/doc/01-basic-usage.md
   require_once "/path/to/vendor/autoload.php";

   use Twilio\Rest\Client;

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   $sid = getenv("TWILIO_ACCOUNT_SID");
   $token = getenv("TWILIO_AUTH_TOKEN");
   $twilio = new Client($sid, $token);

   $build = $twilio->serverless->v1
       ->services("ZS00000000000000000000000000000000")
       ->builds->create([
           "functionVersions" => ["ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
           "assetVersions" => ["ZNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
       ]);

   print $build->sid;
   ```

   ```ruby
   # Download the helper library from https://www.twilio.com/docs/ruby/install
   require 'twilio-ruby'

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = ENV['TWILIO_ACCOUNT_SID']
   auth_token = ENV['TWILIO_AUTH_TOKEN']
   @client = Twilio::REST::Client.new(account_sid, auth_token)

   build = @client
           .serverless
           .v1
           .services('ZS00000000000000000000000000000000')
           .builds
           .create(
             function_versions: [
               'ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
             ],
             asset_versions: [
               'ZNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
             ]
           )

   puts build.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:serverless:v1:services:builds:create \
      --service-sid ZS00000000000000000000000000000000 \
      --function-versions ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
      --asset-versions ZNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
   ```

   ```bash
   curl -X POST "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Builds" \
   --data-urlencode "FunctionVersions=ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
   --data-urlencode "AssetVersions=ZNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "sid": "ZB00000000000000000000000000000000",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "service_sid": "ZS00000000000000000000000000000000",
     "asset_versions": [
       "ZNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
     ],
     "function_versions": [
       "ZNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
     ],
     "dependencies": [
       {
         "name": "twilio",
         "version": "3.29.2"
       },
       {
         "name": "@twilio/runtime-handler",
         "version": "1.0.1"
       }
     ],
     "runtime": "node22",
     "status": "building",
     "date_created": "2018-11-10T20:00:00Z",
     "date_updated": "2018-11-10T20:00:00Z",
     "url": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Builds/ZB00000000000000000000000000000000",
     "links": {
       "build_status": "https://serverless.twilio.com/v1/Services/ZS00000000000000000000000000000000/Builds/ZB00000000000000000000000000000000/Status"
     }
   }
   ```

## Next steps

To learn more about Twilio Functions, see the API reference for all Serverless resources. Consider [Variables][var]. These let you define conditional values for a given Environment.

* [Service][]
* [Environment][]
* [Function][]
* [Function Version][funcversion]
* [Asset][]
* [Asset Version][]
* [Variable][var]
* [Build][]
* [Deployment][]

[Asset Version]: /docs/serverless/api/resource/asset-version

[Asset]: /docs/serverless/api/resource/asset

[Build]: /docs/serverless/api/resource/build

[Deployment]: /docs/serverless/api/resource/deployment

[hostname]: /docs/serverless/api#understanding-domains

[Environment]: /docs/serverless/api/resource/environment

[funcVersion]: /docs/serverless/api/resource/function-version

[Function]: /docs/serverless/api/resource/function

[Serverless Toolkit]: /docs/labs/serverless-toolkit/getting-started

[Service]: /docs/serverless/api/resource/service

[var]: /docs/serverless/api/resource/variable

[funcAssetVis]: /docs/serverless/functions-assets/visibility
