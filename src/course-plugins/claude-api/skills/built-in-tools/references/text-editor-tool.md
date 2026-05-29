# Text editor tool

Built-in tool for file operations (view, string-replace, create, etc.). It is the only tool whose JSON schema is built into Claude — you send a minimal schema **stub** (name + a version-specific `type` string, which differs across model versions) and Claude expands it internally. You must still implement the actual filesystem operations (Claude provides the protocol, not the file access). Lets Claude act as a software engineer out of the box.
