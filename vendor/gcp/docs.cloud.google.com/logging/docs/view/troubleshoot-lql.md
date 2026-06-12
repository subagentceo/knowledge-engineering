# Troubleshoot Logging query language

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Observability
*   Cloud Logging
*   Guides

Send feedback

# Troubleshoot Logging query language Stay organized with collections Save and categorize content based on your preferences.

This document explains common issues that you might encounter when using the Logging query language.

### Syntax issues

If you have problems with your queries' expressions, check the following:

*   Your query obeys the syntax rules, with matched parentheses and quotation marks.
    
*   Your log entry field names are correctly spelled.
    
*   Boolean operations are in uppercase letters (`AND`, `OR`, `NOT`).
    
*   Ensure that you're using `NULL_VALUE` to represent JSON null values.
    
*   Boolean expressions as global restrictions or as the right-hand side of comparisons should be parenthesized for clarity. For example, the following two queries look the same, but are not:
    
    insertId = "ABC-1" OR "ABC-2"  -- ERROR!?
    insertId = ("ABC-1" OR "ABC-2")
    
*   Unquoted text must not contain any special characters. When in doubt, add double quotation marks. For example, in the following, the first comparison is illegal because of the embedded substring operator (`:`). The comparison must be written with quotation marks:
    
    insertId = abc:def  -- ILLEGAL!
    insertId = "abc:def"
    
    **Note:** If you use the search bar and if you don't wrap the search terms in double quotes, then the `SEARCH` function is used. The `SEARCH` function performs a search along token boundaries. For example, if you enter `world` in the search bar, then Logging runs the query `SEARCH("world")`. The previous query matches `world` but it doesn't match `worlds`.
    
*   The Google Cloud CLI requires the query to be in double quotes. To use double quotes for escaping special characters using the `gcloud logging` command, wrap the entire query with single quotes instead:
    
    gcloud logging read 'resource.type=gce_instance AND jsonPayload.message="Stopped Unattended Upgrades Shutdown."'
    gcloud logging read 'timestamp>="2020-06-17T21:00:00Z"'
    
*   When you are filtering on a field that is associated with the `Any` message type, the `value` field is automatically traversed. Therefore, don't include `value` in the query.
    
    For example, the `Status` field in an `AuditLog` message has a `details` field that is of type `google.protobuf.Any`. To query the `details` field, omit the `value` field when specifying the filter:
    
    *   Do
        
        protoPayload.status.**details.**conditionNotMet.userVisibleMessage =~ "Specified reservation.*"
        
    *   Don't
        
        protoPayload.status.**details.value.**conditionNotMet.userVisibleMessage =~ "Specified reservation.*"
        

Send feedback