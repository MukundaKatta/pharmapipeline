import { describe, it, expect } from "vitest";
import { Pharmapipeline } from "../src/core.js";
describe("Pharmapipeline", () => {
  it("init", () => { expect(new Pharmapipeline().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Pharmapipeline(); await c.search(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Pharmapipeline(); await c.search(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
