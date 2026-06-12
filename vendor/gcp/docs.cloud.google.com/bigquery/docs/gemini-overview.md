# Gemini in BigQuery overview

*   Home
*   Documentation
*   Data analytics
*   BigQuery
*   Guides

Send feedback Stay organized with collections Save and categorize content based on your preferences.

# Gemini in BigQuery overview

This document describes how Gemini in BigQuery, which is part of the Gemini for Google Cloud product suite, provides AI-powered assistance to help you work with your data.

## AI assistance with Gemini in BigQuery

Gemini in BigQuery provides AI assistance to help you do the following:

*   **Explore and understand your data with data insights**. Data insights offers an automated, intuitive way to uncover patterns and perform statistical analysis by using insightful queries that are generated from the metadata of your tables. This feature is especially helpful in addressing the cold-start challenges of early data exploration. For more information, see Generate data insights in BigQuery.
*   **Discover, transform, query, and visualize data with BigQuery data canvas**. You can use natural language with Gemini in BigQuery, to find, join, and query table assets, visualize results, and seamlessly collaborate with others throughout the entire process. For more information, see Analyze with data canvas.
*   **Get assisted SQL and Python data analysis**. You can use Gemini in BigQuery to generate or suggest code in either SQL or Python, and to explain an existing SQL query. You can also use natural language queries to begin data analysis. To learn how to generate, complete, and summarize code, see the following documentation:  
    *   SQL code assist
        *   Use the SQL generation tool
        *   Prompt to generate SQL queries
        *   Generate SQL queries with Gemini Cloud Assist (Preview)
        *   Convert comments to SQL (Preview)
        *   Complete a SQL query (Preview)
        *   Explain a SQL query
    *   Python code assist
        *   Generate Python code with the code generation tool
        *   Generate Python code with Gemini Cloud Assist (Preview)
        *   Python code completion
        *   Generate BigQuery DataFrames Python code (Preview)
*   **Prepare data for analysis**. Data preparation in BigQuery gives you context aware, AI-generated transformation recommendations to cleanse data for analysis. For more information, see Prepare data with Gemini.
*   **Customize your SQL translations with translation rules**. (Preview) Create Gemini-enhanced translation rules to customize your SQL translations when using the interactive SQL translator. You can describe changes to the SQL translation output using natural language prompts or specify SQL patterns to find and replace. For more information, see Create a translation rule.

Gemini for Google Cloud doesn't use your prompts or its responses as data to train its models without your express permission. For more information about how Google uses your data, see How Gemini for Google Cloud uses your data.

As an early-stage technology, Gemini for Google Cloud products can generate output that seems plausible but is factually incorrect. We recommend that you validate all output from Gemini for Google Cloud products before you use it. For more information, see Gemini for Google Cloud and responsible AI.

For information about security, privacy and compliance, see Security, privacy, and compliance for Gemini in BigQuery.

**Note**: Gemini in BigQuery is part of Gemini for Google Cloud and doesn't support the same compliance and security offerings as BigQuery. You should only set up Gemini in BigQuery for BigQuery projects that don't require compliance offerings that aren't supported by Gemini for Google Cloud. For information about how to turn off or prevent access to Gemini in BigQuery, see Turn off Gemini in BigQuery.

## Pricing

See Gemini for Google Cloud pricing.

## Where to interact with Gemini in BigQuery

After you set up Gemini in BigQuery, you can use Gemini in BigQuery to do the following in BigQuery Studio:

*   To generate data insights, go to the **Insights** tab for a table entry, where you can identify patterns, assess quality, and run statistical analysis across your BigQuery data.
*   To use data canvas, create a data canvas or use data canvas from a table or query to explore data assets with natural language and share your canvases.
*   To use natural language to generate SQL queries or Python code, use comments in code or the SQL generation tool. You can also receive suggestions with autocomplete while typing.
*   To prepare data for analysis, in the **Create new** list, select **Data preparation**. For more information, see Open the data preparation editor in BigQuery.

## Set up Gemini in BigQuery

For detailed setup steps, see Set up Gemini in BigQuery.

## How Gemini in BigQuery uses your data

In order to provide accurate results, Gemini in BigQuery requires access to both your Customer Data and metadata in BigQuery for enhanced features. Enabling Gemini in BigQuery grants Gemini permission to access this data, which includes your tables and query history. Gemini in BigQuery doesn't use your data to train or fine-tune its models. For more information on how Gemini uses your data, see Security, privacy, and compliance for Gemini in BigQuery.

Enhanced features in Gemini in BigQuery are the following:

*   SQL generation tool
*   Prompt to generate SQL queries
*   Convert comments to SQL
*   Complete a SQL query
*   Explain a SQL query
*   Generate python code
*   Python code completion
*   Data canvas
*   Data preparation
*   Data insights

### Locations

For information about where Gemini in BigQuery processes your data, see Where Gemini in BigQuery processes your data.

## What's next

*   Learn how to set up Gemini in BigQuery.
*   Learn how to write queries with Gemini assistance.
*   Learn more about Google Cloud compliance.
*   Learn about security, privacy, and compliance for Gemini in BigQuery.
*   Learn more about how Gemini for Google Cloud uses your data

Send feedback