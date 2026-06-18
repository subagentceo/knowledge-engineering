# Update a Firestore document field (async)

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Firestore
*   Samples

# Update a Firestore document field (async) Stay organized with collections Save and categorize content based on your preferences.

Update a Firestore document field (async).

## Explore further

For detailed documentation that includes this code sample, see the following:

*   Add and update data

## Code sample

### Python

To authenticate to Firestore, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
city_ref = db.collection("cities").document("DC")

# Set the capital field
await city_ref.update({"capital": True})
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.