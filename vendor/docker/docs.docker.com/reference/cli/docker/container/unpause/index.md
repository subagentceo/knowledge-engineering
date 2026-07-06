# docker container unpause

**Description:** Unpause all processes within one or more containers

**Usage:** `docker container unpause CONTAINER [CONTAINER...]`

**Aliases:** `docker unpause`








## Description

The `docker unpause` command un-suspends all processes in the specified containers.
On Linux, it does this using the freezer cgroup.

See the
[freezer cgroup documentation](https://www.kernel.org/doc/Documentation/cgroup-v1/freezer-subsystem.txt)
for further details.




## Examples

```console
$ docker unpause my_container
my_container
```



