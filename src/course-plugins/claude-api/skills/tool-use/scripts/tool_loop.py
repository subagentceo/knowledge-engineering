# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
#   "python-dotenv>=1.0",
# ]
# ///
# Multi-turn tool loop: run_conversation / run_tools / run_tool / text_from_message.
# Source: "Handling Message Blocks", "Sending Tool Results",
#   "Multi-Turn Conversations with Tools", "Implementing Multiple Turns", "Using Multiple Tools"
#   — projects/courses/building-with-the-claude-api__1p.txt
#
# The API is stateless, so append the ENTIRE response.content (all blocks) to messages.
# Loop until Claude stops requesting tools: stop_reason == "tool_use" means it wants a tool.

import json
from dotenv import load_dotenv
from anthropic import Anthropic
from tool_functions import get_current_datetime, get_current_datetime_schema

load_dotenv()

client = Anthropic()
model = "claude-sonnet-4-5"

tools = [get_current_datetime_schema]


def run_tool(tool_name, tool_input):
    # Dispatcher: match tool_name to the function with if-statements; scalable as you add tools.
    if tool_name == "get_current_datetime":
        return get_current_datetime(**tool_input)
    raise ValueError(f"unknown tool: {tool_name}")


def run_tools(message):
    # Filter content for tool_use blocks, run each, return a list of tool-result blocks.
    tool_results = []
    for block in message.content:
        if block.type == "tool_use":
            try:
                output = run_tool(block.name, block.input)
                is_error = False
            except Exception as e:
                output = str(e)
                is_error = True
            tool_results.append(
                {
                    "type": "tool_result",
                    "tool_use_id": block.id,  # must match the tool_use block's id
                    "content": json.dumps(output),
                    "is_error": is_error,
                }
            )
    return tool_results


def text_from_message(message):
    return "\n".join(block.text for block in message.content if block.type == "text")


def run_conversation(messages):
    while True:
        message = client.messages.create(
            model=model, max_tokens=1000, messages=messages, tools=tools
        )
        # Append the entire response.content (all blocks).
        messages.append({"role": "assistant", "content": message.content})

        if message.stop_reason != "tool_use":
            return text_from_message(message)

        # The tool-result block goes in a USER message.
        tool_results = run_tools(message)
        messages.append({"role": "user", "content": tool_results})


if __name__ == "__main__":
    msgs = [{"role": "user", "content": "What is the current date and time?"}]
    print(run_conversation(msgs))
