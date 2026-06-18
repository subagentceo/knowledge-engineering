---
title: Getting started
description: Learn how to enable the R2 Data Catalog on your bucket, load sample data, and run your first query.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Getting started

This guide will instruct you through:

* Creating your first [R2 bucket](https://developers.cloudflare.com/r2/buckets/) and enabling its [data catalog](https://developers.cloudflare.com/r2/data-catalog/).
* Creating an [API token](https://developers.cloudflare.com/r2/api/tokens/) needed for query engines to authenticate with your data catalog.
* Using [PyIceberg ↗](https://py.iceberg.apache.org/) to create your first Iceberg table in a [marimo ↗](https://marimo.io/) Python notebook.
* Using [PyIceberg ↗](https://py.iceberg.apache.org/) to load sample data into your table and query it.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1\. Create an R2 bucket and enable the data catalog

* [ Wrangler CLI ](#tab-panel-9743)
* [ Dashboard ](#tab-panel-9744)

1. If not already logged in, run:  
Terminal window  
```  
npx wrangler login  
```
2. Create an R2 bucket:  
Terminal window  
```  
npx wrangler r2 bucket create r2-data-catalog-tutorial  
```
3. Enable the catalog on your bucket:  
Terminal window  
```  
npx wrangler r2 bucket catalog enable r2-data-catalog-tutorial  
```  
When you run this command, take note of the **Warehouse** and **Catalog URI**. You will need these later.

1. In the Cloudflare dashboard, go to the **R2 Data Catalog** page.  
[ Go to **R2 Data Catalog** ](https://dash.cloudflare.com/?to=/:account/data-catalog/overview)
2. Select **Create catalog**.
3. Enter the bucket name `r2-data-catalog-tutorial`. Since this bucket does not exist yet, the wizard will create it for you. Optionally choose a location hint.
4. Enter the bucket name `r2-data-catalog-tutorial`. The wizard creates the bucket automatically if it does not already exist. Optionally choose a location hint.
5. Review the configuration and select **Create catalog**.
6. Once created, the catalog detail page displays your **Catalog URI** and **Warehouse name**. Note these values for later.

## 2\. Create an API token

Iceberg clients (including [PyIceberg ↗](https://py.iceberg.apache.org/)) must authenticate to the catalog with an [R2 API token](https://developers.cloudflare.com/r2/api/tokens/) that has both R2 and catalog permissions.

1. In the Cloudflare dashboard, go to the **R2 object storage** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select **Manage API tokens**.
3. Select **Create API token**.
4. Select the **R2 Token** text to edit your API token name.
5. Under **Permissions**, choose the **Admin Read & Write** permission.
6. Select **Create API Token**.
7. Note the **Token value**.

## 3\. Install uv

You need to install a Python package manager. In this guide, use [uv ↗](https://docs.astral.sh/uv/). If you do not already have uv installed, follow the [installing uv guide ↗](https://docs.astral.sh/uv/getting-started/installation/).

## 4\. Install marimo and set up your project with uv

We will use [marimo ↗](https://github.com/marimo-team/marimo) as a Python notebook.

1. Create a directory where our notebook will be stored:  
Terminal window  
```  
mkdir r2-data-catalog-notebook  
```
2. Change into our new directory:  
Terminal window  
```  
cd r2-data-catalog-notebook  
```
3. Initialize a new uv project (this creates a `.venv` and a `pyproject.toml`):  
```  
uv init  
```
4. Add marimo and required dependencies:  
Python  
```  
uv add marimo pyiceberg pyarrow pandas  
```

## 5\. Create a Python notebook to interact with the data warehouse

1. Create a file called `r2-data-catalog-tutorial.py`.
2. Paste the following code snippet into your `r2-data-catalog-tutorial.py` file:  
Python  
```  
import marimo  
__generated_with = "0.11.31"  
app = marimo.App(width="medium")  
@app.cell  
def _():  
    import marimo as mo  
    return (mo,)  
@app.cell  
def _():  
    import pandas  
    import pyarrow as pa  
    import pyarrow.compute as pc  
    import pyarrow.parquet as pq  
    from pyiceberg.catalog.rest import RestCatalog  
    # Define catalog connection details (replace variables)  
    WAREHOUSE = "<WAREHOUSE>"  
    TOKEN = "<TOKEN>"  
    CATALOG_URI = "<CATALOG_URI>"  
    # Connect to R2 Data Catalog  
    catalog = RestCatalog(  
        name="my_catalog",  
        warehouse=WAREHOUSE,  
        uri=CATALOG_URI,  
        token=TOKEN,  
    )  
    return (  
        CATALOG_URI,  
        RestCatalog,  
        TOKEN,  
        WAREHOUSE,  
        catalog,  
        pa,  
        pandas,  
        pc,  
        pq,  
    )  
@app.cell  
def _(catalog):  
    # Create default namespace if needed  
    catalog.create_namespace_if_not_exists("default")  
    return  
@app.cell  
def _(pa):  
    # Create simple PyArrow table  
    df = pa.table({  
        "id": [1, 2, 3],  
        "name": ["Alice", "Bob", "Charlie"],  
        "score": [80.0, 92.5, 88.0],  
    })  
    return (df,)  
@app.cell  
def _(catalog, df):  
    # Create or load Iceberg table  
    test_table = ("default", "people")  
    if not catalog.table_exists(test_table):  
        print(f"Creating table: {test_table}")  
        table = catalog.create_table(  
            test_table,  
            schema=df.schema,  
        )  
    else:  
        table = catalog.load_table(test_table)  
    return table, test_table  
@app.cell  
def _(df, table):  
    # Append data  
    table.append(df)  
    return  
@app.cell  
def _(table):  
    print("Table contents:")  
    scanned = table.scan().to_arrow()  
    print(scanned.to_pandas())  
    return (scanned,)  
@app.cell  
def _():  
    # Optional cleanup. To run uncomment and run cell  
    # print(f"Deleting table: {test_table}")  
    # catalog.drop_table(test_table)  
    # print("Table dropped.")  
    return  
if __name__ == "__main__":  
    app.run()  
```
3. Replace the `CATALOG_URI`, `WAREHOUSE`, and `TOKEN` variables with your values from sections **1** and **2** respectively.
4. Launch the notebook editor in your browser:  
```  
uv run marimo edit r2-data-catalog-tutorial.py  
```  
Once your notebook connects to the catalog, the catalog along with its namespaces and tables will appear in the Datasources panel in marimo.

In the Python notebook above, you:

1. Connect to your catalog.
2. Create the `default` namespace.
3. Create a simple PyArrow table.
4. Create (or load) the `people` table in the `default` namespace.
5. Append sample data to the table.
6. Print the contents of the table.
7. (Optional) Drop the `people` table we created for this tutorial.

## Learn more

[ Managing catalogs ](https://developers.cloudflare.com/r2/data-catalog/manage-catalogs/) Enable or disable R2 Data Catalog on your bucket, retrieve configuration details, and authenticate your Iceberg engine. 

[ Connect to Iceberg engines ](https://developers.cloudflare.com/r2/data-catalog/config-examples/) Find detailed setup instructions for Apache Spark and other common query engines. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/data-catalog/get-started/#page","headline":"Getting started · Cloudflare R2 docs","description":"Learn how to enable the R2 Data Catalog on your bucket, load sample data, and run your first query.","url":"https://developers.cloudflare.com/r2/data-catalog/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/data-catalog/","name":"R2 Data Catalog"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/data-catalog/get-started/","name":"Getting started"}}]}
```
