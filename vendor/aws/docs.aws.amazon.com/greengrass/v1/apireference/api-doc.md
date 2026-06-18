

End of support notice: On October 7th, 2026, AWS will discontinue support for AWS IoT Greengrass Version 1. After October 7th, 2026, you will no longer be able to access the AWS IoT Greengrass V1 resources. For more information, please visit [Migrate from AWS IoT Greengrass Version 1](https://docs.aws.amazon.com/greengrass/v2/developerguide/migrate-from-v1.html).

# Greengrass V1 API
<a name="api-doc"></a>

 AWS IoT Greengrass provides a resource-based API that uses Hypertext Application Language (HAL). HAL provides a standard way for expressing the resources and relationships of an API as hyperlinks. Using HAL, you use HTTP methods (GET, PUT, POST, DELETE) to submit requests and receive information about the API in the response. Applications can use the information returned to explore the functionality of the API. For more information about HAL, see the [JSON Hypertext Application Language](https://www.ietf.org/archive/id/draft-kelly-json-hal-11.html) draft. 

 To request a HAL response from AWS IoT Greengrass, specify application/hal\+json for the accept request header. 

For more information about how AWS IoT Greengrass works, see the [https://docs.aws.amazon.com/greengrass/latest/developerguide/what-is-gg.html](https://docs.aws.amazon.com/greengrass/latest/developerguide/what-is-gg.html).

**Topics**
+ [Actions](api-actions.md)
+ [Endpoints](api-endpoints.md)
+ [Parameters](api-parameters.md)
+ [Definitions](api-definitions.md)