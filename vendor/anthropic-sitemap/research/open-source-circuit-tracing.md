# Open-sourcing circuit tracing tools

Interpretability

# Open-sourcing circuit tracing tools

May 29, 2025

![A hand-drawn image of three hands adjusting a neural network](/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fb2e4a8eb1a382e7c6c44119fbf04c0fd0c2bf415-2881x1621.png&w=3840&q=75)

In our recent interpretability research, we introduced a new method to trace the thoughts of a large language model. Today, we’re open-sourcing the method so that anyone can build on our research.

Our approach is to generate _attribution graphs_, which (partially) reveal the steps a model took internally to decide on a particular output. The open-source library we’re releasing supports the generation of attribution graphs on popular open-weights models—and a frontend hosted by Neuronpedia lets you explore the graphs interactively.

This project was led by participants in our Anthropic Fellows program, in collaboration with Decode Research.

![](/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fe370dd79d6246cc1afc45e0b7b872b6d392801cf-3790x1748.png&w=3840&q=75)

An overview of the interactive graph explorer UI on Neuronpedia.

To get started, you can visit the Neuronpedia interface to generate and view your own attribution graphs for prompts of your choosing. For more sophisticated usage and research, you can view the code repository. This release enables researchers to:

1.  **Trace circuits** on supported models, by generating their own attribution graphs;
2.  **Visualize, annotate, and share** graphs in an interactive frontend;
3.  **Test** **hypotheses** by modifying feature values and observing how model outputs change.

We’ve already used these tools to study interesting behaviors like multi-step reasoning and multilingual representations in Gemma-2-2b and Llama-3.2-1b—see our demo notebook for examples and analysis. We also invite the community to help us find additional interesting circuits—as inspiration, we provide additional attribution graphs that we haven’t yet analyzed in the demo notebook and on Neuronpedia.

Our CEO Dario Amodei wrote recently about the urgency of interpretability research: at present, our understanding of the inner workings of AI lags far behind the progress we’re making in AI capabilities. By open-sourcing these tools, we're hoping to make it easier for the broader community to study what’s going on inside language models. We’re looking forward to seeing applications of these tools to understand model behaviors—as well as extensions that improve the tools themselves.

_The open-source-circuit-finding library was developed by Anthropic Fellows Michael Hanna and Mateusz Piotrowski with mentorship from Emmanuel Ameisen and Jack Lindsey. The Neuronpedia integration was implemented by Decode Research (Neuronpedia lead: Johnny Lin; Science lead/director: Curt Tigges). Our Gemma graphs are based on transcoders trained as part of the GemmaScope project. For questions or feedback, please open an issue on GitHub._

## Related content

### Coding agents in the social sciences

Results from a survey of 1,260 social scientists about AI and coding agent use.

Read more

### Project Glasswing: An initial update

An early update on what we've learned from Project Glasswing.

Read more

### 2028: Two scenarios for global AI leadership

Our views on the AI competition between the US and China.

Read more
