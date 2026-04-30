import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function readDoc(path: string) {
  return readFileSync(join(root, path), "utf8");
}

describe("Sprint 2 refinement artifact", () => {
  it("captures every Sprint 2 story as TDD-ready user stories", () => {
    const refined = readDoc("backlog/refined/sprint2-R.md");

    expect(refined).toContain("Input read: `backlog/sprint/sprint2.md`");
    expect(refined).toContain("Intent: build a static GitHub Pages website");
    expect(refined).toContain("Sprint 1 Baseline");

    for (let story = 11; story <= 20; story += 1) {
      expect(refined).toContain(`## SP-${story}`);
    }

    expect(refined.match(/User story:/g)?.length).toBe(10);
    expect(refined.match(/Acceptance criteria:/g)?.length).toBe(10);
    expect(refined.match(/TDD validations:/g)?.length).toBe(10);
    expect(refined.match(/Red:/g)?.length).toBeGreaterThanOrEqual(10);
    expect(refined.match(/Green:/g)?.length).toBeGreaterThanOrEqual(10);
    expect(refined.match(/Refactor:/g)?.length).toBeGreaterThanOrEqual(10);
  });

  it("records Sprint 2 refinement memory and handoff updates", () => {
    const memories = readDoc("base/memories.md");
    const handoffs = readDoc("base/handoffs.md");

    expect(memories).toContain("2026-04-30 - Sprint 2 Refinement");
    expect(memories).toContain("backlog/refined/sprint2-R.md");
    expect(handoffs).toContain("2026-04-30 - Sprint 2 Refinement Completed");
    expect(handoffs).toContain("Status: completed for the requested Sprint 2 refinement task.");
  });
});
