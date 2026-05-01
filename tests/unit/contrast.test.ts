import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CONTRAST_PAIRS,
  assertContrastPairs,
  contrastRatio,
  parseThemeTokens
} from "../../src/lib/contrast";

const root = process.cwd();

describe("theme contrast checks", () => {
  const tokensCss = readFileSync(join(root, "src/styles/tokens.css"), "utf8");
  const themes = parseThemeTokens(tokensCss);

  it("reports the token pair when contrast is too low", () => {
    expect(() =>
      assertContrastPairs(
        {
          low: {
            foreground: "#777777",
            background: "#777777",
            minimum: 4.5
          }
        },
        "fixture"
      )
    ).toThrow("fixture low");
  });

  it("keeps light and dark theme token pairs above their thresholds", () => {
    expect(() => assertContrastPairs(CONTRAST_PAIRS, "light", themes.light)).not.toThrow();
    expect(() => assertContrastPairs(CONTRAST_PAIRS, "dark", themes.dark)).not.toThrow();
  });

  it("calculates WCAG contrast ratios deterministically", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBe(21);
  });
});
