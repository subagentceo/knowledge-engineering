

# Welcome
<a name="Welcome"></a>

 AWS B2B Data Interchange automates the transformation between Electronic Data Interchange (EDI) documents and JSON or XML formats, to simplify your downstream data integrations.
+  *Inbound EDI*: the AWS customer receives an EDI file from their trading partner. AWS B2B Data Interchange converts this EDI file into a JSON or XML file with a service-defined structure. A mapping template provided by the customer, in JSONata or XSLT format, is optionally applied to this file to produce a JSON or XML file with the structure the customer requires.
+  *Outbound EDI*: the AWS customer has a JSON or XML file containing data that they wish to use in an EDI file. A mapping template, provided by the customer (in either JSONata or XSLT format) is applied to this file to generate a JSON or XML file in the service-defined structure. This file is then converted to an EDI file.

Businesses use EDI documents to exchange transactional data with trading partners, such as suppliers and end customers, using standardized formats such as X12, EDIFACT, or HL7v2. Currently, AWS B2B Data Interchange only supports X12 to JSON or XML conversions.

The following sections document the AWS B2B Data Interchange API service calls, data types, parameters, and errors.

**Note**  
Rather than actually running a command in the AWS Command Line Interface, you can use the `--generate-cli-skeleton` parameter with any API call to generate and display a parameter template. You can then use the generated template to customize and use as input on a later command. For details, see [Generate and use a parameter skeleton file](https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-skeleton.html#cli-usage-skeleton-generate).

 **New features** 

EDI splitting  
 AWS B2B Data Interchange now supports splitting of inbound X12 EDI documents that contain multiple transactions into individually processed single-transaction documents. Splitting increases the maximum supported file size for multi-transaction EDI documents from 150MB to 5GB and enables independent processing of each transaction, even when trading partners send them batched in a single EDI file. To use EDI splitting, configure the `advancedOptions` parameter when creating or updating a transformer, or specify split options in the `TestParsing` API call.

New partnership configurations  
 AWS B2B Data Interchange has enhanced partnership configuration with new options for acknowledgments, format configuration, and control numbers:  
+  *Acknowledgment Configuration*: Configure how functional (997/999) and technical (TA1) acknowledgments are handled for your partnerships.
+  *Format Configuration*: Customize X12 outbound EDI documents with options for wrap settings, and ISA/GS headers time and date formats.
+  *Control Number Management*: Set starting values for interchange, functional group, and transaction set control numbers to ensure proper sequencing and tracking of your EDI transactions.
To use these partnership enhancements, specify the appropriate configuration parameters when creating or updating partnerships using the `CreatePartnership` or `UpdatePartnership` API operations. For acknowledgments, use the `acknowledgmentConfiguration` parameter to define how functional and technical acknowledgments should be processed. For format customization, use the `formatOptions` parameter to specify wrap settings and date/time formats. To manage control numbers, use the `controlNumbers` parameter to set starting values for each level of your EDI documents.

New EventBridge events  
 AWS B2B Data Interchange now emits additional EventBridge events to help you monitor and respond to EDI processing activities. New events include "Split Transformation Completed" and "Split Transformation Failed" to track the status of split file processing.

This document was last published on June 17, 2026. 