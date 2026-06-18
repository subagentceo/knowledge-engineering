# WriteResult

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Firestore
*   Reference

Send feedback

# WriteResult Stay organized with collections Save and categorize content based on your preferences.

The result of applying a write.

JSON representation

{
  "updateTime": string,
  "transformResults": [
    {
      object (`Value`)
    }
  ]
}

 

Fields

`updateTime`

``string (`Timestamp` format)``

The last update time of the document after applying the write. Not set after a `delete`.

If the write did not actually change the document, this will be the previous updateTime.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`transformResults[]`

``object (`Value`)``

The results of applying each `DocumentTransform.FieldTransform`, in the same order.

Send feedback