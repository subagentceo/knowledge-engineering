# Felt Maps

Felt is a modern GIS platform for creating, analyzing, and sharing interactive maps. The Felt MCP server lets Claude run geospatial analysis end-to-end: query connected databases and storage (Databricks, Snowflake, BigQuery, PostgreSQL, S3) with spatial SQL, build and style map layers with Felt Style Language (FSL), upload files, manage annotations like pins and polygons, share maps, and tap into Felt's curated library of public datasets covering boundaries, demographics, infrastructure, and climate.

You can use Felt Maps to:

**Style a layer by an attribute:**  
"Map all electric transmission lines in the US and color them by voltage."

**Pull in live data from a URL:**  
"Map the live USGS earthquake feed for the past day, sized by magnitude."

**Add a raster layer:**  
"Map what crops are planted across the US."

**Upload your own data:**  
"Here's a CSV of our customer addresses — map them and color the pins by revenue."

**Query a connected database with spatial filters:**  
"From our PostgreSQL data source, map agricultural fields within 25 miles of Champaign, IL, colored by yield."

**Run a spatial join in your data warehouse:**  
"From our Databricks source, map the count of public bike-share stations per London borough using a spatial join."