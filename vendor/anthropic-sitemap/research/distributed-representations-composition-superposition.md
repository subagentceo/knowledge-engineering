InterpretabilityResearch

# Distributed Representations: Composition & Superposition

May 4, 2023

[Read Paper](https://transformer-circuits.pub/2023/superposition-composition/index.html)

## Abstract

Distributed representations are a classic idea in both neuroscience and connectionist approaches to AI. We're often asked how our work on superposition relates to it. Since publishing our [original paper](https://transformer-circuits.pub/2022/toy_model/index.html) on superposition, we've had more time to reflect on the relationship between the topics and discuss it with people, and wanted to expand on our [earlier discussion](https://transformer-circuits.pub/2022/toy_model/index.html#related-codes) in the related work section and share a few thoughts. (We care a lot about superposition and the structure of distributed representations because decomposing representations into independent components [is necessary to escape the curse of dimensionality](https://transformer-circuits.pub/2022/mech-interp-essay/index.html) and understand neural networks.)  
  
It seems to us that "distributed representations" might be understood as containing two different ideas, which we'll call "composition" and "superposition". 1 These two different notions of distributed representations have very different properties in terms of generalization and what functions can be linearly computed from them. And while a representation can use both, there's a trade-off that puts them fundamentally in tension! 2  
  
To make this concrete, we'll consider a few potential ways neurons might represent shapes of different colors. These lovely examples are borrowed from [Thorpe (1989)](https://persee.fr/doc/intel_0769-4113_1989_num_8_2_873), who created them to demonstrate various possibilities between the idea of a "local code" and a "distributed code" in neuroscience. Thorpe provides four example codes – "local", "semi-local", "semi-distributed", and "high-distributed". These might traditionally be seen as being on a spectrum between being "local" and "distributed". We'll consider these examples again and offer an alternative view in which the examples instead vary on two different dimensions of superposition and composition.  
  
Following Thorpe, this note will focus on examples where neurons have binary activations. This significantly simplifies the space of possibilities, but it's still a rich enough space to have interesting questions

[](https://twitter.com/intent/tweet?text=https://www.anthropic.com/research/distributed-representations-composition-superposition)[](https://www.linkedin.com/shareArticle?mini=true&url=https://www.anthropic.com/research/distributed-representations-composition-superposition)

## Related content

### 2028: Two scenarios for global AI leadership

Our views on the AI competition between the US and China.

[Read more](/research/2028-ai-leadership)

### Teaching Claude why

New research on how we've reduced agentic misalignment.

[Read more](/research/teaching-claude-why)

### Natural Language Autoencoders: Turning Claude’s thoughts into text

AI models like Claude talk in words but think in numbers. In this study we train Claude to translate its thoughts into human-readable text.

[Read more](/research/natural-language-autoencoders)