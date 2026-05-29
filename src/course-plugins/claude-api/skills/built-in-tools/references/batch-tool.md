# Batch tool (force parallel tool calls)

Claude *can* emit multiple tool-use blocks in one message but rarely does, leading to slow sequential calls. A batch tool fixes this: its schema takes an `invocations` list (each = tool name + arguments). Claude calls the batch tool once with the array; your `run_batch` iterates invocations, JSON-parses each one's args, calls `run_tool` per item, and returns a `batch_output` list. One request-response cycle instead of many.
