# Metadata

Connect exposes several metadata endpoints in order to be compatible with a wide array of clients that support discovery and automatic configuration.

### OAuth Authorization Server

This endpoint provides [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749)-compatible OAuth Authorization Server metadata.

Model Context Protocol (MCP) clients that support the latest version of the specification use this endpoint. [Read more here](https://workos.com/docs/authkit/mcp) about how to use AuthKit as an authorization server for an MCP server.

#### Request

#### Response

### OpenID configuration

This discovery endpoint provides the standard configuration for OpenID clients to interact with WorkOS Connect.

#### Request

#### Response