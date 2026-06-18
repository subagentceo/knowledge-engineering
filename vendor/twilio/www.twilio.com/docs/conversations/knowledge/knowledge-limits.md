# Enterprise Knowledge limits

This page outlines product and API resource limits for Knowledge.

## Knowledge product limits

The following displays Enterprise Knowledge limits and known issues.

* Enterprise Knowledge supports up to five knowledge bases.
* Each knowledge base can contain up to ten knowledge sources.

## API resource limits

This section displays API resource limits and constraints for Knowledge APIs.

### Knowledge bases

| Resource limit               | Value                        | Notes                                                                                                                                                                                                                                                          |
| ---------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Knowledge base friendly name | 128 characters               |                                                                                                                                                                                                                                                                |
| Description                  | 1023 characters              |                                                                                                                                                                                                                                                                |
| Metadata                     | 1023 characters              |                                                                                                                                                                                                                                                                |
| Content size                 | 1,048,576 characters (\~1MB) | Only applies to text source types.                                                                                                                                                                                                                             |
| URL length                   | 2048 characters              | Only applies to web crawling source types.                                                                                                                                                                                                                     |
| Max chunk results            | 20 chunks                    | Conversation Memory ranks all possible pieces of information (chunks) from a knowledge source by semantic similarity. This means that Conversation Memory will only select the top 20 most relevant chunks to pass to the LLM.                                 |
| Max chunk size               | 65,536 characters (\~64KB)   |                                                                                                                                                                                                                                                                |
| Chunking properties          | 100 max items                | Key-value pairs that are stored alongside raw text from a knowledge source and its vector. For example, a source\_file could be a key and the associated value could be the pdf (for example, Annual\_Report\_2025.pdf) where the information was pulled from. |
| Import max file size         | 16,777,216 bytes (16 MiB)    | Only applies to file upload source types.                                                                                                                                                                                                                      |
| Import file name max length  | 256 characters.              | Only applies to file upload source types.                                                                                                                                                                                                                      |
