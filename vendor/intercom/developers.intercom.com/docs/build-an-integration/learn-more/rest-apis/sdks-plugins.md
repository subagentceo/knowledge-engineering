# SDKs and Developer Tools

## Server-Side SDKs for the REST API

Use the SDKs in the following languages for working with the Intercom REST APIs:

- [PHP](https://github.com/intercom/intercom-php)
- [Node](https://github.com/intercom/intercom-node)
- [Ruby](https://github.com/intercom/intercom-ruby)
- [Go](https://github.com/intercom/intercom-go)
- [Java](https://github.com/intercom/intercom-java)
- [.NET](https://github.com/intercom/intercom-dotnet)


```PHP
composer require intercom/intercom-php php-http/guzzle6-adapter
```

```Node.js
yarn add intercom-client
```

```Ruby
gem "intercom-rails"
```

```Go
go get gopkg.in/intercom/intercom-go.v2
```

```Java
<dependency>
  <groupId>io.intercom</groupId>
  <artifactId>intercom-java</artifactId>
  <version>2.8.2</version>
</dependency>
```

```.NET
Install-Package Intercom.Dotnet.Client
```

## Messenger SDKs

Find all the details for installing the Intercom Messenger for [Web and Mobile](/installing-intercom) in the Installation section.

You can find the GitHub repo associated with our [Rails plugin here](https://github.com/intercom/intercom-rails).

## Intercom OpenAPI Specification

These are generated from the Intercom [OpenAPI specification](https://github.com/intercom/Intercom-OpenAPI).

Using the OpenAPI specification
We do not officially support any OpenAPI generators. There may be a siginficant amount of developer time required to utilize our OpenAPI specification with open source generator libraries.

If you see an issue directly related to our OpenAPI spec, please submit an issue [in the GitHub repo](https://github.com/intercom/Intercom-OpenAPI).