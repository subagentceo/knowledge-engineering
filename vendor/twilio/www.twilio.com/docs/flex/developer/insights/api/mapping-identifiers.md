# Mapping Global Identifiers to Workspace Identifiers

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

You can identify Flex Insights (also known as WFO) objects such as reports, metrics, and dashboards, using two types of identifiers:

## Workspace Identifier

Also called "object id", URI or local identifier, is a numeric identifier, associated with each object, which is usually displayed in the format /gdc/md/\{workspace\_id}/obj/5308 or 5308.

* The Workspace Identifier is local to each Flex Insights workspace, and can't be externally modified.
* Any object created in a workspace causes this number to increase by 1.

## Global Identifiers

Also called external identifiers or identifiers. There are two distinct categories:

* For the Data Model objects (attributes, facts, etc) the identifier has the following format *"attributes.conversation.ivr\_path"*.
* For the UI objects (reports, metrics, dashboards) the format is a 12 character long alphanumeric, for example, *"b08a2c8ca8f4"*.

An object's Global Identifier can be manipulated under certain conditions, but Flex Insights ensures that the identifier is unique within each individual workspace.

Twilio uses the Global Identifier to ensure that the set of built-in objects with the same Global Identifier have the same definition across all Flex Insights workspaces. Workspace Identifiers, on the other hand, are used to identify specific objects within a workspace.

Here's an example where two reports have different Workspace Identifiers across two Flex Insights workspaces, but the same Global Identifier is the same. Company A and Company B both want to use Q and A Reports. In their individual Flex Insights instances, Company A and B would see the same global identifier (i.e., abPBFm6ZgjV4), but different Workspace Identifiers (e.g., 4309 for Company A, and 51684 for Company B.)

![Comparison of distribution and global identifiers for WFM Q and A reports in Flex Insights Workspaces A and B.](https://docs-resources.prod.twilio.com/b7d89a8e41db3d64e35959ebabacd00aa7ef753a440c9fff14bca57f8878e1e1.png)

All the Flex Insights API requests must use the Workspace Identifier, so Flex Insights provides APIs for translating back and forth between Workspace Identifiers and Global Identifiers. This allows you to map your objects to their Global Identifiers using their Workspace Identifier.

## Prerequisites

Before you can start the mapping between the Global Identifier and the Workspace Identifier, you need the following:

* a [provisioned Flex Insights Workspace](https://help.twilio.com/articles/360010705874-Getting-Started-with-Flex-Insights)
* the credentials of a user with access to the Flex Insights Workspace
* The Global Identifier of the object you want to map to a Workspace Identifier
* REST API client support for cookies that are used to pass authentication tokens

## API Authentication

Ensure that you are authenticated against the Flex Insights API by having a valid TT (*temporary token*). The procedure is detailed at [API Authentication](/docs/flex/developer/insights/api/general-usage)

## Obtaining the Workspace Id and Global Identifier

You will need:

**Workspace ID**: Log in to the [Analytics Portal](https://analytics.ytica.com/) and check the URL in the browser address bar. For example:

![Navigation bar with options: Dashboards, Reports, KPIs, Analyze, Manage.](https://docs-resources.prod.twilio.com/dc83ebfc6d40e0d8f8c001c460ccd3c8f1e02bd3e75c6a8f965db85235f9ed4a.png)

The workspace ID is the string appearing between the #s=/gdc/projects/ segment and the vertical bar. In this case, the workspace ID is `z2nxqtb1r6weuly0iivexz6hu5dathua`.

**Object Global Identifier:** This will most likely be provided by you in some document, external documentation or by Expert Services. The expected format is `abJBDYXwfBG1`.

## Mapping the Identifiers

Now you have everything you need to start mapping your identifiers!

Map Global Identifier to Workspace Identifier

```bash
curl -X POST https://analytics.ytica.com/gdc/md/{WORKSPACE_ID}/identifiers \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: GDCAuthTT=XXXXX-XXXXX-XXXXX' \
  -d '{"identifierToUri": [ "GLOBAL_IDENTIFIER" ] }'
```

```json
{ "identifiers": 
  [
    {
      "identifier": "{global_identifier}",
      "uri": "/gdc/md/{workspace_id}/obj/{workspace_identifier}"
    }
  ]
}
```

By parsing the response JSON, you can get the Workspace Identifier at `identifiers[0]` ▸ `uri`

Multiple identifiers can be mapped in one API call since the identifiers are passed as a JSON list. A list of mappings is returned as a response.

Map Multiple Global Identifiers to Workspace Identifiers

```bash
curl -X POST https://analytics.ytica.com/gdc/md/{WORKSPACE_ID}/identifiers \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: GDCAuthTT=XXXXX-XXXXX-XXXXX' \
  -d '{ "identifierToUri": [
          "GLOBAL_IDENTIFIER_1",
          "GLOBAL_IDENTIFIER_2"
        ]
      }'
```

```json
{ "identifiers": 
  [
    {
      "identifier": "{global_identifier_1}",
      "uri": "/gdc/md/{workspace_id}/obj/{workspace_identifier_1}"
    },
    {
      "identifier": "{global_identifier_2}",
      "uri": "/gdc/md/{workspace_id}/obj/{workspace_identifier_2}"
    }
  ]
}
```

If you want to map the Workspace Identifier to the Global Identifier, you can call the same API with the parameter `uriToIdentifier` instead of `identifierToUri` and provide a list of Workspace Identifiers.

Map a Global Identifier to a Workspace Identifier

```bash
curl -X POST https://analytics.ytica.com/gdc/md/{WORKSPACE_ID}/identifiers \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: GDCAuthTT=XXXXX-XXXXX-XXXXX' \
  -d '{ "uriToIdentifier": [ "WORKSPACE_IDENTIFIER" ] }'
```

```json
{ "identifiers": 
  [
    {
      "identifier": "{global_identifier}",
      "uri": "/gdc/md/{workspace_id}/obj/{workspace_identifier}"
    }
  ]
}
```

Once you get the Workspace Identifier, it is safe to assume that for each Flex Insights workspace, the Workspace Identifier will never change.

The Workspace Identifier can be used in any API call (for example, [exporting raw data](/docs/flex/developer/insights/api/export-data).)
