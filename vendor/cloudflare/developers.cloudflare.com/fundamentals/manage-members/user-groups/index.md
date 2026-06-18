---
title: User Groups
description: Create and manage Cloudflare User Groups to assign shared permission policies to multiple account members.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# User Groups

User Groups are a collection of [account members](https://developers.cloudflare.com/fundamentals/manage-members/) that are treated equally from an access control perspective. User Groups can be assigned permission policies, with individual members in the group receiving all permissions of the roles assigned to the User Group. If users also have individually assigned permissions, then their effective permissions are the union of all of their individual permissions, plus the permissions for all of the User Groups they are a member of.

Note

User Group permissions are inherited by each member of the group but are not currently reflected in the role field on the **Members** page. To view a member’s full set of permissions, check both:

* The **Members** page for any directly assigned policies
* The **Groups** tab to identify which groups the member belongs to, and the policies applied to those groups

Cloudflare is actively working on improving this experience to make inherited and direct permissions easier to view.

## Create a User Group manually

1. In the Cloudflare dashboard, go to the **Members** page.  
[ Go to **Members** ](https://dash.cloudflare.com/?to=/:account/members)
2. Select the **Groups** tab.
3. Select **Create a Group** and enter a name and description for your new group.
4. Select **Create group** to confirm your changes. The **Group members** tab displays.
5. Select **Add members**.
6. Select the relevant members you want to include in the group and select **Add to Group**.

### Assign a Permission Policy

With your Group created, you can now add a [Permission Policy](https://developers.cloudflare.com/fundamentals/manage-members/policies/) to your Group.

* [ Dashboard ](#tab-panel-8601)
* [ API ](#tab-panel-8602)

1. In the **Groups** tab under **Permission policies**, select **Add a Policy**.
2. Specify the scope and permissions you want applied to the members of the group.
3. Select **Create Policy** to apply it to the group.

Using the role identifiers from the previous section, you can create a permission policy for your group.

`export ADMIN_ROLE='...' # id field from admin or desired role entry from permission_groups API response`

Example request

```

$ cat <<-PAYLOAD | curl -XPUT  -H "Authorization: Bearer $AOT" -H "Content-type: application/json" --data-binary @- https://api.cloudflare.com/client/v4/accounts/$ACCT/iam/user_groups/$PUSHED_GROUP  | jq .

{

    "policies": [

        {

            "access": "allow",

            "permission_groups": [{"id": "$ADMIN_ROLE"}],

            "resource_groups": [{

                "scope": {

                    "key": "com.cloudflare.api.account.$ACCT",

                    "objects": [{"key":"*"}]

                }

            }]

        }

    ]

}

PAYLOAD


```

**Reset a policy to an empty state**

If you made a mistake while creating the group policy or need to reset the policy to an empty state, send another PUT request to the group API with an empty policy array to overwrite with your new policy.

```

$ cat <<-PAYLOAD | curl -XPUT  -H "Authorization: Bearer $AOT" -H "Content-type: application/json" --data-binary @- https://api.cloudflare.com/client/v4/accounts/$ACCT/iam/user_groups/$PUSHED_GROUP  | jq .

{

    "policies": []

}

PAYLOAD


```

## Create a User Group with SCIM

Customers with the SCIM integration configured can sync User Groups from an upstream identity provider to Cloudflare. Cloudflare's SCIM integration requires one external application per account.

Note

If you use the [Cloudflare dashboard SCIM integration](https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/), you can sync Groups from an upstream Identity Provider. This allows you to centralize user and group management at your identity provider.

Note that when managing User Groups via SCIM:

* You cannot change the name, members, or delete the group manually from the Cloudflare dashboard or API.
* The integration requires one external SCIM application per Cloudflare account.
* Cloudflare does not currently support updating user profile fields (`firstName`, `lastName`, or `email`) via SCIM. If those attributes change in your IdP, they will not be updated in Cloudflare. These values are only set during initial provisioning.

To set up a user group with SCIM, refer to the [Provisioning with SCIM guide](https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/).

### Set up permissions for User Groups

After a user group is created either manually in Cloudflare dashboard or through SCIM integration the final step is to attach permissions to it.

* [ Dashboard ](#tab-panel-8603)
* [ API ](#tab-panel-8604)

1. Go to **Manage members** \> **Members** \> **User groups**.
2. Select the user group you want to attach permissions to.
3. Select the **Permission policies** tab and select **Add policy**.
4. Choose the scope and role that you want to apply to the policy.
5. Select **Save** to apply the policy.

Before you begin, confirm the groups that were created internally or have been pushed to Cloudflare by using the command below.

**1\. Get user groups**

Example request

```

$ curl -X GET -H "Authorization: Bearer $AOT" https://api.cloudflare.com/client/v4/accounts/$ACCT/iam/user_groups | jq .


```

Example response

```

{

    "errors": [],

    "messages": [],

    "result": [

        {

            "created_on": "2025-01-24T15:31:36.759979Z",

            "id": "f234f49f66df4db8864c5189fe78c87f",

            "modified_on": "2025-01-24T15:35:50.151764Z",

            "name": "My Cool Demo Group",

            "status": "V"

        },

        {

            "created_on": "2025-01-16T20:43:01.019311Z",

            "id": "7148c1e4d9f247f5b6dcd3ef20f998f9",

            "modified_on": "2025-01-16T20:44:07.627233Z",

            "name": "My Cool Demo Group, now with policies!",

            "policies": [

                {

                    "access": "allow",

                    "created_on": "2025-01-16T20:44:07.627233Z",

                    "id": "8d82cf8c15c64e07a4bee58e00d80bca",

                    "modified_on": "2025-01-16T20:44:07.627233Z",

                    "permission_groups": [

                        {

                            "created_on": "2023-06-21T18:58:29.907496Z",

                            "id": "a1a099e3256942259bfde18c688b67d5",

                            "meta": {

                                "description": "Grants write access to Page Shield for domain",

                                "editable": "false",

                                "label": "domain_page_shield",

                                "scopes": "com.cloudflare.api.account.zone"

                            },

                            "modified_on": "2023-06-21T18:58:29.907496Z",

                            "name": "Domain Page Shield",

                            "permissions": ["dev note: snipped for length"],

                            "status": "V"

                        }

                    ],

                    "resource_groups": [

                        {

                            "created_on": "2025-01-16T20:44:07.627233Z",

                            "modified_on": "2025-01-16T20:44:07.627233Z",

                            "scope": {

                                "key": "com.cloudflare.api.account.a3324a084cd290080b563ab39c91545a",

                                "objects": [

                                    {

                                        "key": "*"

                                    }

                                ]

                            }

                        }

                    ],

                    "status": "V"

                }

            ],

            "status": "V"

        }

    ],

    "result_info": {

        "count": 2,

        "page": 1,

        "per_page": 100,

        "total_count": 2,

        "total_pages": 1

    },

    "success": true

}


```

**2\. Make a query against the resource ID**

Locate the tag of the group you pushed from the IdP and use it to make a direct query against its resource ID:

`export PUSHED_GROUP='...' # Pull this value from the "id" json field in the group list response`

Example request

```

$ curl -XGET -H "Authorization: Bearer $AOT" https://api.cloudflare.com/client/v4/accounts/$ACCT/iam/user_groups/$PUSHED_GROUP | jq .


```

The response for this should have the group name that was specified in the identity provider with no attached policies.

**3\. Review available permission groups**

Before you modify the group's policies, review the available permission groups (roles) on the account by querying its API.

Example request

```

$ curl -XGET -H "Authorization: Bearer $DEMO_AOT" https://api.cloudflare.com/client/v4/accounts/$ACCT/iam/permission_groups | jq .


```

Example response

```

{

  "result": [

    {

      "id": "1a0fc8bdeae24387b64d5b8de1ad052a",

      "name": "Administrator Read Only",

      "status": "V",

      "meta": {

        "description": "Can access the full account in read-only mode.",

        "editable": "false",

        "label": "admin_readonly",

        "scopes": "com.cloudflare.api.account"

      },

      "created_on": "2020-07-06T12:19:13.099114Z",

      "modified_on": "2020-10-13T11:18:00.208228Z"

    },

    {

      "id": "ce2c69b09baf4ca38223910a8b7e07a9",

      "name": "Administrator",

      "status": "V",

      "meta": {

        "description": "Can access the full account, except for membership management and billing.",

        "editable": "false",

        "label": "admin",

        "scopes": "com.cloudflare.api.account"

      },

      "created_on": "2020-07-06T12:19:13.099114Z",

      "modified_on": "2020-10-13T11:18:00.208228Z"

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

Note

These permission groups are from our staging environment and tags will not function in your production deployment.

## Inspect Group Members

To verify the IdP synchronized the group and user members pushed in the SCIM operation, query the Group Members API.

Example request

```

$ curl -XGET -H "Authorization: Bearer $DEMO_AOT" https://api.cloudflare.com/client/v4/accounts/$ACCT/iam/user_groups/$PUSHED_GROUP/members | jq .


```

Example response

```

{

  "result": [

    {

      "id": "a4366a09c43a0b0c4606dc5528472bb6",

      "email": "luke.skywalker@rebelalliance.net"

    },

    {

      "id": "0329c17f6c13f5202dc38d2036efb1a9",

      "email": "arya.stark@winterfell.place"

    }

  ],

  "result_info": {

    "page": 1,

    "per_page": 100,

    "total_pages": 1,

    "count": 2,

    "total_count": 2

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/manage-members/user-groups/#page","headline":"User Groups · Cloudflare Fundamentals docs","description":"Create and manage Cloudflare User Groups to assign shared permission policies to multiple account members.","url":"https://developers.cloudflare.com/fundamentals/manage-members/user-groups/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/manage-members/","name":"Members and permissions"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/manage-members/user-groups/","name":"User Groups"}}]}
```
