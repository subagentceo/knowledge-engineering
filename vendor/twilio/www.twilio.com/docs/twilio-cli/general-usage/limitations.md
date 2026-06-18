# CLI Limitations

Here are some limitations to keep in mind while using the CLI:

* The default timeout for Twilio API requests is 30 seconds.
* When listing resources, only the first 50 records will be displayed by default. Use the `--limit` flag to modify this behavior.
  * You can filter these results based on date, to, from, etc. to further limit the results.
  * Pass the `--help` or `-h` flag to the command for details on which fields you may filter by.
