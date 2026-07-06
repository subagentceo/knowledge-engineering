# Functions


HCL functions are great for when you need to manipulate values in your build
configuration in more complex ways than just concatenation or interpolation.

## Standard library

Bake ships with built-in support for the [standard library functions](/build/bake/stdlib/).

The following example shows the `add` function:

```hcl {title=docker-bake.hcl}
variable "TAG" {
  default = "latest"
}

group "default" {
  targets = ["webapp"]
}

target "webapp" {
  args = {
    buildno = "${add(123, 1)}"
  }
}
```

```console
$ docker buildx bake --print webapp
```

```json
{
  "group": {
    "default": {
      "targets": ["webapp"]
    }
  },
  "target": {
    "webapp": {
      "context": ".",
      "dockerfile": "Dockerfile",
      "args": {
        "buildno": "124"
      }
    }
  }
}
```

## User-defined functions

You can create [user-defined functions](https://github.com/hashicorp/hcl/tree/main/ext/userfunc)
that do just what you want, if the built-in standard library functions don't
meet your needs.

The following example defines an `increment` function.

```hcl {title=docker-bake.hcl}
function "increment" {
  params = [number]
  result = number + 1
}

group "default" {
  targets = ["webapp"]
}

target "webapp" {
  args = {
    buildno = "${increment(123)}"
  }
}
```

```console
$ docker buildx bake --print webapp
```

```json
{
  "group": {
    "default": {
      "targets": ["webapp"]
    }
  },
  "target": {
    "webapp": {
      "context": ".",
      "dockerfile": "Dockerfile",
      "args": {
        "buildno": "124"
      }
    }
  }
}
```

## Variables in functions

You can make references to [variables](/build/bake/variables) and standard library
functions inside your functions.

The following example uses a global variable (`REPO`) in a custom function.

```hcl {title=docker-bake.hcl}
# docker-bake.hcl
variable "REPO" {
  default = "user/repo"
}

function "tag" {
  params = [tag]
  result = ["${REPO}:${tag}"]
}

target "webapp" {
  tags = tag("v1")
}
```

Printing the Bake file with the `--print` flag shows that the `tag` function
uses the value of `REPO` to set the prefix of the tag.

```console
$ docker buildx bake --print webapp
```

```json
{
  "group": {
    "default": {
      "targets": ["webapp"]
    }
  },
  "target": {
    "webapp": {
      "context": ".",
      "dockerfile": "Dockerfile",
      "tags": ["user/repo:v1"]
    }
  }
}
```

