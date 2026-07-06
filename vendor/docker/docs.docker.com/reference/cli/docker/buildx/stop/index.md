# docker buildx stop

**Description:** Stop builder instance

**Usage:** `docker buildx stop [NAME]`










## Description

Stops the specified or current builder. This does not prevent buildx build to
restart the builder. The implementation of stop depends on the driver.




## Examples

### Override the configured builder instance (--builder) {#builder}

Same as [`buildx --builder`](/reference/cli/docker/buildx/#builder).



