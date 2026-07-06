# Part two: Publish


This section describes how to make your extension available and more visible, so users can discover it and install it with a single click.

## Release your extension

After you have developed your extension and tested it locally, you are ready to release the extension and make it available for others to install and use (either internally with your team, or more publicly).

Releasing your extension consists of:

- Providing information about your extension: description, screenshots, etc. so users can decide to install your extension
- [Validating](/extensions/extensions-sdk/extensions/validate/) that the extension is built in the right format and includes the required information
- Making the extension image available on [Docker Hub](https://hub.docker.com/)

See [Package and release your extension](/extensions/extensions-sdk/extensions/DISTRIBUTION/) for more details about the release process.

## Promote your extension

Once your extension is available on Docker Hub, users who have access to the extension image can install it using the Docker CLI.

### Use a share extension link

You can also [generate a share URL](/extensions/extensions-sdk/extensions/share/) in order to share your extension within your team, or promote your extension on the internet. The share link lets users view the extension description and screenshots.

### Publish your extension in the Marketplace

You can publish your extension in the Extensions Marketplace to make it more discoverable. You must [submit your extension](/extensions/extensions-sdk/extensions/publish/) if you want to have it published in the Marketplace.

## What happens next

### New releases

Once you have released your extension, you can push a new release just by pushing a new version of the extension image, with an incremented tag (still using `semver` conventions).
Extensions published in the Marketplace benefit from update notifications to all Desktop users that have installed the extension. For more details, see [new releases and updates](/extensions/extensions-sdk/extensions/DISTRIBUTION/#new-releases-and-updates).

### Extension support and user feedback

In addition to providing a description of your extension's features and screenshots, you should also specify additional URLs using [extension labels](/extensions/extensions-sdk/extensions/labels/). This direct users to your website for reporting bugs and feedback, and accessing documentation and support.





> Already built an extension?
>
> Let us know about your experience using the [feedback form](https://survey.alchemer.com/s3/7184948/Publishers-Feedback-Form).



