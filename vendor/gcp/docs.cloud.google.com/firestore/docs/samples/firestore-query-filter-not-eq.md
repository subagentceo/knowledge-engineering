# Query a Firestore collection with a not eq filter

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Firestore
*   Samples

# Query a Firestore collection with a not eq filter Stay organized with collections Save and categorize content based on your preferences.

Query a Firestore collection with a not eq filter

## Explore further

For detailed documentation that includes this code sample, see the following:

*   Query and filter data

## Code sample

### Java

To authenticate to Firestore, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
CollectionReference citiesRef = db.collection("cities");

Query query = citiesRef.whereNotEqualTo("capital", false);
```

### Node.js

To authenticate to Firestore, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
const capitalNotFalseRes = await citiesRef.where('capital', '!=', false).get();
```

### PHP

To authenticate to Firestore, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
$stateQuery = $citiesRef->where('capital', '!=', false);
```

### Ruby

To authenticate to Firestore, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
cities_ref = firestore.col collection_path
query = cities_ref.where "capital", "!=", false
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.