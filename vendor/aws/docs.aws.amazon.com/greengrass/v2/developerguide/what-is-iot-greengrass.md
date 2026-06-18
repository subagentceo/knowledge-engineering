

# What is AWS IoT Greengrass?
<a name="what-is-iot-greengrass"></a>

AWS IoT Greengrass is an open source Internet of Things (IoT) edge runtime and cloud service that helps you build, deploy and manage IoT applications on your devices. You can use AWS IoT Greengrass to build software that enables your devices to act locally on the data that they generate, run predictions based on machine learning models, and filter and aggregate device data. AWS IoT Greengrass enables your devices to collect and analyze data closer to where that data is generated, react autonomously to local events, and communicate securely with other devices on the local network. Greengrass devices can also communicate securely with AWS IoT Core and export IoT data to the AWS Cloud. You can use AWS IoT Greengrass to build edge applications using pre-built software modules, called components, that can connect your edge devices to AWS services or third-party services. You can also use AWS IoT Greengrass to package and run your software using Lambda functions, Docker containers, native operating system processes, or custom runtimes of your choice. 

The following example shows how an AWS IoT Greengrass device interacts with the AWS Cloud.

![An overview of how an AWS IoT Greengrass device interacts with the AWS Cloud.](http://docs.aws.amazon.com/greengrass/v2/developerguide/images/greengrass-overview.png)


## New features
<a name="new-features"></a>

AWS IoT Greengrass V2 introduces new features and improvements. The following includes more information about the new features offered in version 2.
+ [What's new in AWS IoT Greengrass Version 2](greengrass-v2-whats-new.md)

## For first-time users of AWS IoT Greengrass
<a name="first-time-user"></a>

If you're new to AWS IoT Greengrass, we recommend that you review the following section:
+ [How AWS IoT Greengrass works](how-it-works.md)

Next, follow the [getting started tutorial](getting-started.md) to try out the basic features of AWS IoT Greengrass. In this tutorial, you install the AWS IoT Greengrass Core software on a device, develop a Hello World component, and package that component for deployment.

## For existing users of AWS IoT Greengrass V1
<a name="existing-users"></a>

End of support notice: On October 7, 2026, AWS will end support for AWS IoT Greengrass Version 1. After October 7, 2026, you will no longer be able to access the AWS IoT Greengrass V1 console or AWS IoT Greengrass V1 resources. For more information about how to move from version 1 to version 2, see [Migrate from AWS IoT Greengrass Version 1](migrate-from-v1.md).