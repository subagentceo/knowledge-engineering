

# Welcome
<a name="Welcome"></a>

 AWS Transfer Family offers fully managed support for the transfer of files over SFTP, AS2, FTPS, FTP, and web browser-based transfers directly into and out of AWS storage services.

File transfer protocols are used in data exchange workflows across different industries such as financial services, healthcare, advertising, and retail, among others. AWS Transfer Family simplifies the migration of file transfer workflows to AWS.

To use the AWS Transfer Family service, you instantiate a server in the AWS Region of your choice. You can create the server, list available servers, and update and delete servers. The server is the entity that requests file operations from AWS Transfer Family. Servers have a number of important properties. The server is a named instance as identified by a system assigned `ServerId` identifier. You can optionally assign a hostname, or even a custom hostname to a server. The service bills for any instantiated servers (even ones `OFFLINE`), and for the amount of data transferred.

Users must be known to the server that requests file operations. A user as identified by their username is assigned to a server. Usernames are used to authenticate requests. A server can have only one authentication method: `AWS_DIRECTORY_SERVICE`, `SERVICE_MANAGED`, `AWS_LAMBDA`, or `API_GATEWAY`.

 AWS Transfer Family also supports web applications that provide browser-based file transfer capabilities. Web applications can be configured with VPC endpoints to enable secure, private connectivity within your Virtual Private Cloud (VPC). This allows you to control network access and route traffic through your VPC infrastructure while maintaining the managed benefits of AWS Transfer Family.

This API interface reference for AWS Transfer Family contains documentation for a programming interface that you can use to manage AWS Transfer Family. The reference structure is as follows:
+ For the alphabetical list of API actions, see [Actions](API_Operations.md).
+ For the alphabetical list of data types, see [Data Types](API_Types.md).
+ For a list of common query parameters, see [Common Parameters](CommonParameters.md).
+ For descriptions of the error codes, see [Common Error Types](CommonErrors.md).

**Note**  
Rather than actually running a command, you can use the `--generate-cli-skeleton` parameter with any API call to generate and display a parameter template. You can then use the generated template to customize and use as input on a later command. For details, see [Generate and use a parameter skeleton file](https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-skeleton.html#cli-usage-skeleton-generate).

This document was last published on June 17, 2026. 