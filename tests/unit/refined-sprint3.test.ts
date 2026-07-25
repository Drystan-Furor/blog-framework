import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function readDoc(path: string) {
  return readFileSync(join(root, path), "utf8");
}

describe("Sprint 3 refinement artifact", () => {
  it("captures every Sprint 3 story as TDD-ready user stories", () => {
    const refined = readDoc("backlog/refined/sprint3-R.md");

    expect(refined).toContain("Input read: `backlog/sprint/sprint3.md`");
    expect(refined).toContain("Intent: build a static GitHub Pages website");
    expect(refined).toContain("Sprint 1 and Sprint 2 Baseline");

    for (let story = 21; story <= 30; story += 1) {
      expect(refined).toContain(`## SP-${story}`);
    }

    expect(refined.match(/User story:/g)?.length).toBe(10);
    expect(refined.match(/Acceptance criteria:/g)?.length).toBe(10);
    expect(refined.match(/TDD validations:/g)?.length).toBe(10);
    expect(refined.match(/Red:/g)?.length).toBeGreaterThanOrEqual(10);
    expect(refined.match(/Green:/g)?.length).toBeGreaterThanOrEqual(10);
    expect(refined.match(/Refactor:/g)?.length).toBeGreaterThanOrEqual(10);
  });

  it("records Sprint 3 refinement memory and handoff updates", () => {
    const memories = readDoc("base/memories.md");
    const handoffs = readDoc("base/handoffs.md");

    expect(memories).toContain("2026-05-01 - Sprint 3 Refinement");
    expect(memories).toContain("backlog/refined/sprint3-R.md");
    expect(handoffs).toContain("2026-05-01 - Sprint 3 Refinement Completed");
    expect(handoffs).toContain("Status: completed for the requested Sprint 3 refinement task.");
  });
});
