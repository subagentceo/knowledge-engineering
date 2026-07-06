# Overview of the Extensions SDK


> [!IMPORTANT]
>
> New submissions to the Docker Extensions Marketplace are paused while Docker reviews Marketplace security. You can still update existing extensions, and private Marketplace extensions are unaffected. Contact extensions@docker.com if you have additional questions.

The resources in this section help you create your own Docker extension.

The Docker CLI tool provides a set of commands to help you build and publish your extension, packaged as a 
specially formatted Docker image.

At the root of the image filesystem is a `metadata.json` file which describes the content of the extension. 
It's a fundamental element of a Docker extension.

An extension can contain a UI part and backend parts that run either on the host or in the Desktop virtual machine.
For further information, see [Architecture](/extensions/extensions-sdk/architecture/).

You distribute extensions through Docker Hub. However, you can develop them locally without the need to push 
the extension to Docker Hub. See [Extensions distribution](/extensions/extensions-sdk/extensions/DISTRIBUTION/) for further details.





> Already built an extension?
>
> Let us know about your experience using the [feedback form](https://survey.alchemer.com/s3/7184948/Publishers-Feedback-Form).





