// Minimal ambient declaration for wink-bm25-text-search v3.
// The package ships no .d.ts; this shim satisfies noImplicitAny.
// @cite https://www.npmjs.com/package/wink-bm25-text-search

declare module "wink-bm25-text-search" {
  interface BM25Engine {
    defineConfig(cfg: { fldWeights: Record<string, number> }): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    definePrepTasks(tasks: Array<(input: any) => any>): void;
    addDoc(doc: Record<string, string>, id: string): void;
    consolidate(): void;
    search(query: string): Array<[string, number]>;
  }
  function BM25(): BM25Engine;
  export default BM25;
}
