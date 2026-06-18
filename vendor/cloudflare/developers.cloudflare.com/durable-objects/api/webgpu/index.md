---
title: WebGPU
description: Use the WebGPU API for GPU access from within Durable Objects in local development.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# WebGPU

Warning

The WebGPU API is only available in local development. You cannot deploy Durable Objects to Cloudflare that rely on the WebGPU API. See [Workers AI](https://developers.cloudflare.com/workers-ai/) for information on running machine learning models on the GPUs in Cloudflare's global network.

The [WebGPU API ↗](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU%5FAPI) allows you to use the GPU directly from JavaScript.

The WebGPU API is only accessible from within [Durable Objects](https://developers.cloudflare.com/durable-objects/). You cannot use the WebGPU API from within Workers.

To use the WebGPU API in local development, enable the `experimental` and `webgpu` [compatibility flags](https://developers.cloudflare.com/workers/configuration/compatibility-flags/) in the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) of your Durable Object.

```

compatibility_flags = ["experimental", "webgpu"]


```

The following subset of the WebGPU API is available from within Durable Objects:

| API                                                                                                                            | Supported? | Notes |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------- | ----- |
| [navigator.gpu ↗](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/gpu)                                              | ✅          |       |
| [GPU.requestAdapter ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPU/requestAdapter)                                    | ✅          |       |
| [GPUAdapterInfo ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUAdapterInfo)                                            | ✅          |       |
| [GPUAdapter ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUAdapter)                                                    | ✅          |       |
| [GPUBindGroupLayout ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUBindGroupLayout)                                    | ✅          |       |
| [GPUBindGroup ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUBindGroup)                                                | ✅          |       |
| [GPUBuffer ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUBuffer)                                                      | ✅          |       |
| [GPUCommandBuffer ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUCommandBuffer)                                        | ✅          |       |
| [GPUCommandEncoder ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUCommandEncoder)                                      | ✅          |       |
| [GPUComputePassEncoder ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUComputePassEncoder)                              | ✅          |       |
| [GPUComputePipeline ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUComputePipeline)                                    | ✅          |       |
| [GPUComputePipelineError ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUPipelineError)                                 | ✅          |       |
| [GPUDevice ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUDevice)                                                      | ✅          |       |
| [GPUOutOfMemoryError ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUOutOfMemoryError)                                  | ✅          |       |
| [GPUValidationError ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUValidationError)                                    | ✅          |       |
| [GPUInternalError ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUInternalError)                                        | ✅          |       |
| [GPUDeviceLostInfo ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUDeviceLostInfo)                                      | ✅          |       |
| [GPUPipelineLayout ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUPipelineLayout)                                      | ✅          |       |
| [GPUQuerySet ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUQuerySet)                                                  | ✅          |       |
| [GPUQueue ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUQueue)                                                        | ✅          |       |
| [GPUSampler ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUSampler)                                                    | ✅          |       |
| [GPUCompilationMessage ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUCompilationMessage)                              | ✅          |       |
| [GPUShaderModule ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUShaderModule)                                          | ✅          |       |
| [GPUSupportedFeatures ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUSupportedFeatures)                                | ✅          |       |
| [GPUSupportedLimits ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUSupportedLimits)                                    | ✅          |       |
| [GPUMapMode ↗](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU%5FAPI#reading%5Fthe%5Fresults%5Fback%5Fto%5Fjavascript) | ✅          |       |
| [GPUShaderStage ↗](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU%5FAPI#create%5Fa%5Fbind%5Fgroup%5Flayout)           | ✅          |       |
| [GPUUncapturedErrorEvent ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUUncapturedErrorEvent)                          | ✅          |       |

The following subset of the WebGPU API is not yet supported:

| API                                                                                                             | Supported? | Notes |
| --------------------------------------------------------------------------------------------------------------- | ---------- | ----- |
| [GPU.getPreferredCanvasFormat ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPU/getPreferredCanvasFormat) |            |       |
| [GPURenderBundle ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPURenderBundle)                           |            |       |
| [GPURenderBundleEncoder ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPURenderBundleEncoder)             |            |       |
| [GPURenderPassEncoder ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPURenderPassEncoder)                 |            |       |
| [GPURenderPipeline ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPURenderPipeline)                       |            |       |
| [GPUShaderModule ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUShaderModule)                           |            |       |
| [GPUTexture ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUTexture)                                     |            |       |
| [GPUTextureView ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUTextureView)                             |            |       |
| [GPUExternalTexture ↗](https://developer.mozilla.org/en-US/docs/Web/API/GPUExternalTexture)                     |            |       |

## Examples

* [workers-wonnx ↗](https://github.com/cloudflare/workers-wonnx/) — Image classification, running on a GPU via the WebGPU API, using the [wonnx ↗](https://github.com/webonnx/wonnx) model inference runtime.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/api/webgpu/#page","headline":"WebGPU · Cloudflare Durable Objects docs","description":"Use the WebGPU API for GPU access from within Durable Objects in local development.","url":"https://developers.cloudflare.com/durable-objects/api/webgpu/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/api/","name":"Workers Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/api/webgpu/","name":"WebGPU"}}]}
```
