---
title: Validate the Access token with FastAPI
description: This tutorial covers how to validate that the Access JWT is on requests made to FastAPI apps. The code is written in Python.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Validate the Access token with FastAPI

**Last reviewed:**  about 3 years ago 

This tutorial covers how to validate that the [Access JWT](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/) is on requests made to FastAPI apps.

**Time to complete:** 15 minutes

## Prerequisites

* A [self-hosted Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) for your FastAPI app
* The [AUD tag](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/#get-your-aud-tag) for your Access application

## 1\. Create a validation function

1. In your FastAPI project, create a new file called `cloudflare.py` that contains the following code:

Python

```

from fastapi import Request, HTTPException


# The Application Audience (AUD) tag for your application

POLICY_AUD = "XXXXX"


# Your CF Access team domain

TEAM_DOMAIN = "https://<your-team-name>.cloudflareaccess.com"

CERTS_URL = "{}/cdn-cgi/access/certs".format(TEAM_DOMAIN)


async def validate_cloudflare(request: Request):

    """

    Validate that the request is authenticated by Cloudflare Access.

    """

    if verify_token(request) != True:

        raise HTTPException(status_code=400, detail="Not authenticated properly!")


def _get_public_keys():

    """

    Returns:

        List of RSA public keys usable by PyJWT.

    """

    r = requests.get(CERTS_URL)

    public_keys = []

    jwk_set = r.json()

    for key_dict in jwk_set["keys"]:

        public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(key_dict))

        public_keys.append(public_key)

    return public_keys


def verify_token(request):

    """

    Verify the token in the request.

    """

    token = ""


    if "CF_Authorization" in request.cookies:

        token = request.cookies["CF_Authorization"]

    else:

        raise HTTPException(status_code=400, detail="missing required cf authorization token")


    keys = _get_public_keys()


    # Loop through the keys since we can't pass the key set to the decoder

    valid_token = False

    for key in keys:

        try:

            # decode returns the claims that has the email when needed

            jwt.decode(token, key=key, audience=POLICY_AUD, algorithms=["RS256"])

            valid_token = True

            break

        except:

            raise HTTPException(status_code=400, detail="Error decoding token")

    if not valid_token:

        raise HTTPException(status_code=400, detail="Invalid token")


    return True


```

## 2\. Use the validation function in your app

You can now add the validation function as a dependency in your FastAPI app. One way to do this is by creating an [APIRouter instance ↗](https://fastapi.tiangolo.com/tutorial/bigger-applications/#another-module-with-apirouter). The following example executes the validation function on each request made to paths that start with `/admin`:

Python

```

from fastapi import APIRouter, Depends, HTTPException

from cloudflare import validate_cloudflare


router = APIRouter(

    prefix="/admin",

    tags=["admin"],

    dependencies=[Depends(validate_cloudflare)]

    responses={404: {"description": "Not found"}},

)


@router.get("/")

async def root():

    return {"message": "Hello World"}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/fastapi/#page","headline":"Validate the Access token with FastAPI · Cloudflare One docs","description":"This tutorial covers how to validate that the Access JWT is on requests made to FastAPI apps. The code is written in Python.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/fastapi/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/fastapi/","name":"Validate the Access token with FastAPI"}}]}
```
