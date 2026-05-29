# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
#   "python-dotenv>=1.0",
# ]
# ///
# Multi-turn conversation helpers, system prompts, and temperature.
# Source: "Multi-Turn Conversations", "System Prompts", "Temperature"
#   — projects/courses/building-with-the-claude-api__1p.txt
# The API is stateless: maintain the message list yourself and resend the ENTIRE history each call.

from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic()
model = "claude-sonnet-4-5"


def add_user_message(messages, text):
    messages.append({"role": "user", "content": text})


def add_assistant_message(messages, text):
    messages.append({"role": "assistant", "content": text})


def chat(messages, system=None, temperature=1.0):
    params = {
        "model": model,
        "max_tokens": 1000,
        "messages": messages,
        "temperature": temperature,
    }
    # Add the system key only when a prompt is provided, so None cleanly omits the parameter.
    if system:
        params["system"] = system

    message = client.messages.create(**params)
    return message.content[0].text


if __name__ == "__main__":
    messages = []
    add_user_message(messages, "What is the capital of France?")
    answer = chat(
        messages,
        system="You are a patient geography tutor.",
        temperature=0,  # near-0 for factual consistency; near-1 for creative output
    )
    add_assistant_message(messages, answer)
    print(answer)
