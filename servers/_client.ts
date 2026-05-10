// servers/_client.ts
//
// AUTO-GENERATED placeholder for the codemode runtime's tool dispatcher.
//
// In Phase 6.B (codemode wiring in src/agent/run.ts), this is replaced
// at runtime by @cloudflare/codemode's DynamicWorkerExecutor — the
// generated wrappers all call into the same callMCPTool symbol.
//
// In Phase 6.A this is a stub that throws. The wrappers compile and
// can be type-checked, but invoking one without the codemode runtime
// raises a clear error.
export async function callMCPTool(qualifiedName: string, input: Record<string, unknown>): Promise<unknown> {
  throw new Error(
    `callMCPTool stub: tried to invoke ${qualifiedName} (input keys: ${Object.keys(input).join(",")}) without a runtime. ` +
    `Phase 6.B wires @cloudflare/codemode's DynamicWorkerExecutor as the dispatcher.`
  );
}
