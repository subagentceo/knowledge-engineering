# Privileged Bases in the Transformer Residual Stream

InterpretabilityResearch

# Privileged Bases in the Transformer Residual Stream

Mar 16, 2023

Read Paper

## Abstract

Our mathematical theories of the Transformer architecture suggest that individual coordinates in the residual stream should have no special significance (that is, the basis directions should be in some sense "arbitrary" and no more likely to encode information than random directions). Recent work has shown that this observation is false in practice. We investigate this phenomenon and provisionally conclude that the per-dimension normalizers in the Adam optimizer are to blame for the effect.  
  
We explore two other obvious sources of basis dependency in a Transformer: Layer normalization, and finite-precision floating-point calculations. We confidently rule these out as being the source of the observed basis-alignment.

## Related content

### Agentic coding and persistent returns to expertise

Read more

### Paving the way for agents in biology

Read more

### Measuring LLMs’ impact on N-day exploits

In cybersecurity, a large fraction of real-world harm comes from N-days: vulnerabilities that have already been publicly disclosed, but only patched on some devices. In this post, we evaluate how much large language models can accelerate and automate the process of developing N-day exploits.

Read more