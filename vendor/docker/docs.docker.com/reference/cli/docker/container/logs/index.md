# docker container logs

**Description:** Fetch the logs of a container

**Usage:** `docker container logs [OPTIONS] CONTAINER`

**Aliases:** `docker logs`








## Description

The `docker logs` command batch-retrieves logs present at the time of execution.

For more information about selecting and configuring logging drivers, refer to
[Configure logging drivers](/engine/logging/configure/).


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--details` |  |  Show extra details provided to logs |
| `-f`, `--follow` |  |  Follow log output |
| `--since` |  |  Show logs since timestamp (e.g. `2013-01-02T13:23:37Z`) or relative (e.g. `42m` for 42 minutes)<br> |
| `-n`, `--tail` | `all` |  Number of lines to show from the end of the logs |
| `-t`, `--timestamps` |  |  Show timestamps |
| `--until` |  | API 1.35+ Show logs before a timestamp (e.g. `2013-01-02T13:23:37Z`) or relative (e.g. `42m` for 42 minutes)<br> |



## Examples

### Stream log output  (-f, --follow) {#follow}

The `docker logs --follow` command will continue streaming the new output from
the container's `STDOUT` and `STDERR`.

### Retrieve the last logs (-n, --tail) {#tail}

Passing a negative number or a non-integer to `--tail` is invalid and the
value is set to `all` in that case.


### Retrieve logs with timestamps (-t, --timestamps) {#timestamps}

The `docker logs --timestamps` command will add an [RFC3339Nano timestamp](https://pkg.go.dev/time#RFC3339Nano)
, for example `2014-09-16T06:17:46.000000000Z`, to each
log entry. To ensure that the timestamps are aligned the
nano-second part of the timestamp will be padded with zero when necessary.

### Retrieve logs with additional attributes (--details) {#details}

The `docker logs --details` command will add on extra attributes, such as
environment variables and labels, provided to `--log-opt` when creating the
container.

### Retrieve logs generated since a specific point in time (--since) {#since}

The `--since` option shows only the container logs generated after
a given date. You can specify the date as an RFC 3339 date, a UNIX
timestamp, or a Go duration string (e.g. `1m30s`, `3h`). Besides RFC3339 date
format you may also use RFC3339Nano, `2006-01-02T15:04:05`,
`2006-01-02T15:04:05.999999999`, `2006-01-02T07:00`, and `2006-01-02`. The local
timezone on the client will be used if you do not provide either a `Z` or a
`+-00:00` timezone offset at the end of the timestamp. When providing Unix
timestamps enter seconds[.nanoseconds], where seconds is the number of seconds
that have elapsed since January 1, 1970 (midnight UTC/GMT), not counting leap
seconds (aka Unix epoch or Unix time), and the optional .nanoseconds field is a
fraction of a second no more than nine digits long. You can combine the
`--since` option with either or both of the `--follow` or `--tail` options.


### Retrieve logs until a specific point in time (--until) {#until}

In order to retrieve logs before a specific point in time, run:

```console
$ docker run --name test -d busybox sh -c "while true; do $(echo date); sleep 1; done"
$ date
Tue 14 Nov 2017 16:40:00 CET
$ docker logs -f --until=2s test
Tue 14 Nov 2017 16:40:00 CET
Tue 14 Nov 2017 16:40:01 CET
Tue 14 Nov 2017 16:40:02 CET
```



